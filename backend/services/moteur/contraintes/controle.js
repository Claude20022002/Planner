import { GABARITS, INSISTANCES, INSISTANCE_PAR_DEFAUT, JOURS, TYPES_DE_CIBLE, natureAdmise, natureParDefaut } from "./gabarits.js";

/**
 * Contrôle d'une contrainte déclarée (MOT-13, § 4.4 de la conception) : champs du modèle, cibles,
 * nature, insistance, bornes légales, plage dans la grille. Fonctions pures : l'existence des
 * cibles en base est vérifiée à part (cibles.js). Chaque refus a un code stable et une phrase qui
 * dit quoi corriger.
 */

const HEURE = /^([01]\d|2[0-3]):[0-5]\d$/;

// Règle du catalogue que borne un plafond d'heures, selon sa cible
const REGLE_DU_PLAFOND = { enseignant: "ENS.CHARGE.MAX_H_JOUR", groupe: "HOR.REGLE.MAX_H_JOUR_GROUPE" };

const entierPositif = (v) => Number.isInteger(v) && v > 0;
const minutes = (h) => {
    const [a, b] = h.split(":").map(Number);
    return a * 60 + b;
};

/** Forme normale : nature et insistance par défaut, identifiants en nombre (le rythme reste un texte). */
export const normaliserContrainte = (c) => {
    const nature = c.nature ?? natureParDefaut(c.gabarit);
    return {
        gabarit: c.gabarit,
        nature,
        insistance: nature === "souhait" ? c.insistance ?? INSISTANCE_PAR_DEFAUT : c.insistance ?? null,
        cibles: Array.isArray(c.cibles) ? c.cibles.map((x) => ({ type: x?.type, id: x?.type === "rythme" || x?.type === "ecole" ? x?.id ?? null : x?.id === undefined || x?.id === null ? null : Number(x.id) })) : c.cibles,
        parametres: c.parametres && typeof c.parametres === "object" ? c.parametres : {},
    };
};

const controlerCibles = (c, g, refus) => {
    if (!Array.isArray(c.cibles) || !c.cibles.length) return refus("cibles", "cibles_vides", "Choisissez au moins une cible : l'école, un groupe, une matière…");
    const vues = new Set();
    for (const x of c.cibles) {
        if (!TYPES_DE_CIBLE.includes(x.type)) refus("cibles", "cible_invalide", `« ${x.type} » n'est pas un type de cible.`);
        else if (!g.cibles.includes(x.type)) refus("cibles", "cible_interdite", `Ce modèle ne s'applique pas à une cible « ${x.type} ».`);
        else if (x.type === "ecole" ? x.id !== null : x.type === "rythme" ? typeof x.id !== "string" || !x.id : !entierPositif(x.id)) refus("cibles", "cible_invalide", `La cible « ${x.type} » a un identifiant invalide.`);
        const cle = `${x.type}:${x.id}`;
        if (vues.has(cle)) refus("cibles", "doublon", "Une cible figure deux fois.");
        vues.add(cle);
    }
    const types = new Set(c.cibles.map((x) => x.type));
    if (types.has("ecole") && c.cibles.length > 1) refus("cibles", "cibles_incompatibles", "« Toute l'école » ne se combine pas avec une autre cible.");
    if (types.has("salle") && types.size > 1) refus("cibles", "cibles_incompatibles", "Une salle ne se combine pas avec une autre sorte de cible : déclarez une contrainte à part.");
};

const CHAMPS = {
    jours: (v) => Array.isArray(v) && v.length > 0 && v.every((j) => JOURS.includes(j)) && new Set(v).size === v.length,
    heure: (v) => typeof v === "string" && HEURE.test(v),
    choix: (v, d) => d.valeurs.includes(v),
    entier: (v, d) => Number.isInteger(v) && v >= d.min && v <= d.max,
    matieres: (v) => Array.isArray(v) && v.length > 0 && v.every(entierPositif) && new Set(v).size === v.length,
};

const MESSAGES = {
    jours: "Choisissez au moins un jour, sans doublon (lundi à dimanche).",
    heure: "Une heure s'écrit HH:MM, par exemple 08:30.",
    choix: (d) => `Valeurs admises : ${d.valeurs.join(", ")}.`,
    entier: (d) => `Un nombre entier de ${d.min} à ${d.max}.`,
    matieres: "Choisissez au moins une matière, sans doublon.",
};

const controlerChamps = (c, g, refus) => {
    for (const cle of Object.keys(c.parametres)) if (!g.champs[cle]) refus(cle, "champ_inconnu", `Ce modèle n'a pas de champ « ${cle} ».`);
    for (const [cle, d] of Object.entries(g.champs)) {
        const v = c.parametres[cle];
        if (v === undefined || v === null) {
            if (d.obligatoire) refus(cle, "champ_manquant", `Le champ « ${cle} » est à remplir.`);
            continue;
        }
        if (!CHAMPS[d.type](v, d)) refus(cle, d.type === "choix" ? "hors_liste" : "champ_invalide", typeof MESSAGES[d.type] === "function" ? MESSAGES[d.type](d) : MESSAGES[d.type]);
    }
    const p = c.parametres;
    if (HEURE.test(p.debut ?? "") && HEURE.test(p.fin ?? "") && p.debut >= p.fin) refus("fin", "plage_inversee", "L'heure de fin doit venir après l'heure de début.");
    if (Array.isArray(p.matieres_a) && Array.isArray(p.matieres_b) && p.matieres_a.some((m) => p.matieres_b.includes(m))) refus("matieres_b", "matieres_communes", "Une même matière ne peut pas être des deux côtés.");
};

const controlerNature = (c, refus) => {
    if (!natureAdmise(c.gabarit, c.nature, c.parametres)) {
        const quand = { plafond_par_jour: " (seulement pour un plafond d'heures)", ensemble_ou_separe: " (seulement pour « en même temps »)" }[c.gabarit] ?? "";
        refus("nature", "nature_interdite", `Ce modèle n'admet pas la nature « ${c.nature} »${quand}.`);
    }
    if (c.nature === "impossible" && c.insistance !== null) refus("insistance", "insistance_interdite", "Une impossibilité n'a pas d'insistance : elle est toujours tenue.");
    if (c.nature === "souhait" && !Object.hasOwn(INSISTANCES, c.insistance)) refus("insistance", "hors_liste", `Insistances admises : ${Object.keys(INSISTANCES).join(", ")}.`);
};

/**
 * Bornes légales : un plafond d'heures ne dépasse jamais ce que le catalogue borne pour la même règle
 * (plafond légal, plafond de la semaine…). Les valeurs en vigueur sont celles de l'école.
 */
const controlerBornes = (c, { valeurs, dependances = [], nomDe = (id) => id }, refus) => {
    if (c.gabarit !== "plafond_par_jour" || c.parametres.quoi !== "heures" || !valeurs) return;
    const enMinutes = c.parametres.seuil * 60;
    for (const type of new Set(c.cibles.map((x) => x.type))) {
        const regle = REGLE_DU_PLAFOND[type];
        if (!regle) continue;
        for (const d of dependances.filter((x) => x.type === "borne" && x.de === regle && x.op === "<=")) {
            const limite = valeurs.get(d.vers);
            if (Number.isFinite(limite) && enMinutes > limite) refus("seuil", "borne_depassee", `Le plafond dépasse « ${nomDe(d.vers)} » (${limite / 60} h).`);
        }
    }
};

/** La plage touche-t-elle au moins un créneau de la grille ? Sinon, la contrainte ne fait rien. */
const plageSansEffet = (c, creneaux) => {
    if (!["plage_interdite", "plage_a_eviter"].includes(c.gabarit) || !creneaux?.length) return false;
    const { jours, debut, fin } = c.parametres;
    const rangs = new Set(jours.map((j) => JOURS.indexOf(j) + 1));
    return !creneaux.some((x) => rangs.has(x.jour) && x.debut < minutes(fin) && x.fin > minutes(debut));
};

/**
 * @param {object} brute la contrainte telle que reçue
 * @param {object} [contexte] valeurs (Map des valeurs en vigueur), dependances, nomDe(id),
 *   creneaux ([{ jour: 1..7, debut, fin }] en minutes) pour l'avertissement « sans effet »
 * @returns {{ contrainte, violations: object[], avertissements: object[] }}
 */
export const controlerContrainte = (brute, contexte = {}) => {
    const violations = [];
    const avertissements = [];
    const refus = (champ, code, message) => violations.push({ champ, code, message });
    const g = GABARITS[brute?.gabarit];
    if (!g) {
        refus("gabarit", "gabarit_inconnu", `Aucun modèle « ${brute?.gabarit} ». Modèles : ${Object.keys(GABARITS).join(", ")}.`);
        return { contrainte: brute, violations, avertissements };
    }
    const c = normaliserContrainte(brute);
    controlerCibles(c, g, refus);
    controlerChamps(c, g, refus);
    controlerNature(c, refus);
    if (!violations.length) controlerBornes(c, contexte, refus);
    if (!violations.length && plageSansEffet(c, contexte.creneaux)) {
        avertissements.push({ champ: "jours", code: "plage_sans_effet", message: "Aucun cours n'est prévu sur cette plage dans la grille : cette contrainte est sans effet." });
    }
    return { contrainte: c, violations, avertissements };
};

export { minutes as minutesDe };
