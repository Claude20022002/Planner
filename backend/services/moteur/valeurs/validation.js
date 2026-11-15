import { ErreurMetier } from "../../planning/enseignements.js";
import { dateDesContraintes } from "../contraintes/avantGeneration.js";
import { leCatalogue, lireFaits, lireLignes } from "./lecture.js";
import { resoudreTout } from "./resolution.js";

/**
 * Validation des valeurs du catalogue avant le calcul (MOT-03) : `requiert`, `borne` et `exclut`,
 * avec un nom français et une correction (EP-4). Fonctions pures, sauf l'appel qui lit MOT-01.
 * Les liaisons dont un bout est encore `absent` / `solveur` / `base` / `plan` ne bloquent pas :
 * ces données ne vivent pas dans les versions MOT-01 (MOT-13 Q16, collecte MOT-05).
 */

const HORS_MOT01 = new Set(["absent", "solveur", "base", "plan"]);
const OPS = { "<=": "au plus", ">=": "au moins", "=": "égal à", "!=": "différent de" };

const renseigne = (v) => v !== null && v !== undefined;

const compare = (a, op, b) => {
    if (op === "<=") return a <= b;
    if (op === ">=") return a >= b;
    if (op === "=") return a === b;
    if (op === "!=") return a !== b;
    return [a].flat().includes(b);
};

const nomDe = (parId, id) => parId.get(id)?.nom ?? id;

const aEvaluer = (p, valeurs, actives, resultats) => {
    if (!p || HORS_MOT01.has(p.etat)) return false;
    if (p.role === "regle") return actives.includes(p.id) && (resultats.get(p.id)?.origine ?? "catalogue") !== "catalogue";
    return renseigne(valeurs.get(p.id));
};

const correctionBorne = (op, nomA, nomB) => {
    if (op === "<=") return `Abaissez ${nomA} ou relevez ${nomB}.`;
    if (op === ">=") return `Relevez ${nomA} ou abaissez ${nomB}.`;
    if (op === "=") return `Rendez ${nomA} égal à ${nomB}.`;
    return `Changez ${nomA} ou ${nomB}.`;
};

const refus = (code, d, message) => ({ code, cle: d.de, de: d.de, vers: d.vers, message });

/**
 * @param {object} o parametres, dependances, valeurs (Map), actives (ids de règles), resultats (Map MOT-01)
 * @returns {{ code: string, cle: string, de: string, vers: string, message: string }[]}
 */
export const validerValeurs = ({ parametres, dependances, valeurs, actives = [], resultats = new Map() }) => {
    const parId = new Map(parametres.map((p) => [p.id, p]));
    const erreurs = [];
    for (const d of dependances) {
        const a = parId.get(d.de);
        const b = parId.get(d.vers);
        const va = valeurs.get(d.de);
        const vb = valeurs.get(d.vers);
        const nomA = nomDe(parId, d.de);
        const nomB = nomDe(parId, d.vers);
        if (d.type === "requiert" && aEvaluer(a, valeurs, actives, resultats) && !HORS_MOT01.has(b?.etat) && !renseigne(vb)) {
            erreurs.push(refus("requiert_manquant", d, `${nomA} ne peut pas être évalué : il manque ${nomB}. Renseignez ${nomB} avant de lancer le calcul.`));
        }
        if (d.type === "borne" && renseigne(va) && renseigne(vb) && !compare(va, d.op, vb)) {
            const op = OPS[d.op] ?? d.op;
            erreurs.push(refus("borne_depassee", d, `${nomA} (${va}) doit être ${op} ${nomB} (${vb}). ${correctionBorne(d.op, nomA, nomB)}`));
        }
        if (d.type === "exclut" && va === true && vb === true) {
            erreurs.push(refus("exclusion_mutuelle", d, `${nomA} et ${nomB} ne peuvent pas être actifs ensemble. Désactivez l'un des deux.`));
        }
    }
    return erreurs;
};

/** Cibles MOT-01 présentes dans le problème Timefold : l'établissement, puis les individus. */
export const ciblesDuProbleme = (probleme) => {
    const cibles = [{}];
    const vus = new Set(["|"]);
    const ajouter = (portee, id) => {
        if (id === undefined || id === null || id === "") return;
        const k = `${portee}|${id}`;
        if (vus.has(k)) return;
        vus.add(k);
        cibles.push({ [portee]: String(id) });
    };
    for (const l of probleme.lecons ?? []) {
        for (const id of l.enseignants ?? []) ajouter("enseignant", id);
        for (const id of l.groupesDirects ?? []) ajouter("groupe", id);
        if (l.salle?.id) ajouter("salle", l.salle.id);
        if (l.coursId) ajouter("matiere", l.coursId);
    }
    for (const s of probleme.salles ?? []) ajouter("salle", s.id);
    return cibles;
};

/** La génération refusée : le message nomme le premier refus, `refus` les donne tous. */
export class ErreurValidation extends ErreurMetier {
    constructor(liste) {
        const autres = liste.length > 1 ? ` Et ${liste.length - 1} autre${liste.length > 2 ? "s" : ""} refus, dans le rapport.` : "";
        super(`${liste[0].message}${autres}`, 400, "VALEURS_INVALIDES");
        this.refus = liste;
    }
}

/** Refuse la génération si les valeurs MOT-01 violent le catalogue. */
export const exigerValeursCoherentes = async ({ probleme, periode }) => {
    const date = dateDesContraintes(periode);
    const { parametres, profils, dependances } = leCatalogue();
    const [lignes, faits] = await Promise.all([lireLignes(), lireFaits()]);
    const vus = new Set();
    const refus = [];
    for (const cible of ciblesDuProbleme(probleme)) {
        const resolu = resoudreTout({ parametres, profils, dependances, lignes, date, cible, faits });
        for (const r of validerValeurs({ parametres, dependances, ...resolu })) {
            const k = `${r.code}|${r.de}|${r.vers}|${r.cle}`;
            if (vus.has(k)) continue;
            vus.add(k);
            refus.push(r);
        }
    }
    if (refus.length) throw new ErreurValidation(refus);
};
