import { JOURS } from "./gabarits.js";
import { aUnEffet } from "./compilation.js";
import { heureLisible } from "./phrases.js";

/**
 * Bilan d'une génération, contrainte par contrainte (MOT-13b, mot-13b-solveur.md § 4.4) :
 * respectée, non respectée N fois (avec au plus 5 exemples lisibles), ou sans effet. Il relit les
 * leçons placées par le solveur avec les mêmes contraintes compilées, et refait les calculs de
 * CalculsDeclares.java, écrits ici en JavaScript. Il ne dépend pas de ScoreAnalysis (payant en 2.x) :
 * c'est le premier morceau de l'évaluateur indépendant de MOT-04. Fonction pure.
 * Un test de concordance lit le même fichier que le test Java (concordance-declarees.json).
 */

/** Deux séances « à la suite » : 30 min ou moins entre la fin de l'une et le début de l'autre. */
const PAUSE_COURTE = 30;
const EXEMPLES_MAX = 5;

/** Leçons placées : le créneau, la fin réelle (deux créneaux), les créneaux occupés. */
export const placer = ({ placements, probleme }) => {
    const creneaux = new Map(probleme.creneaux.map((c) => [c.id, c]));
    const lecons = new Map(probleme.lecons.map((l) => [l.id, l]));
    const placees = new Map();
    for (const p of placements) {
        const c = creneaux.get(p.creneauId);
        if (!c) continue;
        const deux = (lecons.get(p.id)?.longueur ?? 1) === 2;
        placees.set(p.id, {
            id: p.id,
            jour: c.jour,
            debut: c.debut,
            fin: deux && c.finAvecSuivant ? c.finAvecSuivant : c.fin,
            occupes: deux && c.suivantId ? [c.id, c.suivantId] : [c.id],
            salleId: p.salleId ?? null,
            epinglee: Boolean(lecons.get(p.id)?.epinglee),
        });
    }
    return placees;
};

const chevauche = (x, y) => x.jour === y.jour && x.debut < y.fin && y.debut < x.fin;
const ecart = (x, y) => Math.max(y.debut - x.fin, x.debut - y.fin);

/** Plafond : excès d'une journée, comme CalculsDeclares.excesPlafond. */
export const excesPlafond = (quoi, seuil, journee) => {
    if (quoi === "SEANCES") return Math.max(0, journee.length - seuil);
    if (quoi === "HEURES") {
        const minutes = journee.reduce((t, l) => t + l.fin - l.debut, 0);
        return minutes > seuil * 60 ? Math.ceil((minutes - seuil * 60) / 60) : 0;
    }
    let exces = 0;
    let suite = 0;
    let finPrecedente = -Infinity;
    for (const l of [...journee].sort((x, y) => x.debut - y.debut)) {
        suite = suite > 0 && l.debut - finPrecedente <= PAUSE_COURTE ? suite + 1 : 1;
        if (suite > seuil) exces += 1;
        finPrecedente = Math.max(finPrecedente, l.fin);
    }
    return exces;
};

const parJour = (lecons) => {
    const jours = new Map();
    for (const l of lecons) jours.set(l.jour, [...(jours.get(l.jour) ?? []), l]);
    return [...jours].sort(([a], [b]) => a - b);
};

const posees = (ids, placees) => ids.map((id) => placees.get(id)).filter(Boolean);

/**
 * Occurrences d'une contrainte compilée sur les leçons placées, et les cas en cause.
 * @returns {{ fois: number, cas: { lecons: string[], jour: number, debut?: number, detail?: string }[] }}
 */
export const occurrences = (k, placees) => {
    const cas = [];
    let fois = 0;
    const noter = (n, c) => {
        fois += n;
        cas.push(c);
    };
    if (k.famille === "PLAGE") {
        const vises = new Set(k.creneaux);
        const salles = new Set(k.salles);
        const lecons = salles.size ? [...placees.values()].filter((l) => !l.epinglee && salles.has(l.salleId)) : posees(k.lecons, placees);
        for (const l of lecons) {
            const n = l.occupes.filter((c) => vises.has(c)).length;
            if (n) noter(n, { lecons: [l.id], jour: l.jour, debut: l.debut });
        }
        return { fois, cas };
    }
    k.paquets.forEach((p) => {
        const a = posees(p.a, placees);
        if (k.famille === "PLAFOND") {
            for (const [jour, journee] of parJour(a)) {
                const n = excesPlafond(k.quoi, k.seuil, journee);
                if (n) noter(n, { lecons: journee.map((l) => l.id), jour, detail: k.quoi });
            }
        } else if (k.famille === "REPARTITION") {
            for (let i = 0; i < a.length; i += 1) {
                for (let j = i + 1; j < a.length; j += 1) {
                    if (Math.abs(a[i].jour - a[j].jour) < k.ecart) noter(1, { lecons: [a[i].id, a[j].id], jour: a[i].jour });
                }
            }
        } else {
            const b = posees(p.b, placees);
            if (k.relation === "EN_MEME_TEMPS") {
                for (const [cote, autre] of [[a, b], [b, a]]) {
                    for (const x of cote) if (!autre.some((y) => y.jour === x.jour && y.debut === x.debut)) noter(1, { lecons: [x.id], jour: x.jour, debut: x.debut });
                }
            } else {
                for (const x of a) {
                    for (const y of b) {
                        if (x === y || x.jour !== y.jour) continue;
                        if (k.relation === "JAMAIS_LE_MEME_JOUR" || (!chevauche(x, y) && ecart(x, y) <= PAUSE_COURTE)) noter(1, { lecons: [x.id, y.id], jour: x.jour });
                    }
                }
            }
        }
    });
    return { fois, cas };
};

const QUANTITE = { SEANCES: "trop de séances", HEURES: "trop d'heures", SEANCES_A_LA_SUITE: "trop de séances à la suite" };

/** « Français (6e A), mardi 8 h 30 et Anglais (6e A), mardi 10 h : trop de séances ». */
const exemple = (c, libelles) => {
    const jour = JOURS[c.jour - 1];
    const heure = c.debut === undefined ? "" : ` ${heureLisible(`${Math.floor(c.debut / 60)}:${String(c.debut % 60).padStart(2, "0")}`)}`;
    const qui = [...new Set(c.lecons.map((id) => libelles.get(id) ?? id))].join(", ");
    return `${qui}, ${jour}${heure}${c.detail ? ` : ${QUANTITE[c.detail]}` : ""}`;
};

/**
 * @param {object} o
 * @param {object[]} o.compilees contraintes compilées (compilation.js)
 * @param {object[]} o.contraintes contraintes en vigueur, avec leur phrase
 * @param {object[]} o.placements leçons rendues par le solveur ({ id, creneauId, salleId })
 * @param {object} o.probleme le problème envoyé (lecons pour les longueurs, creneaux)
 * @param {Map<string,string>} [o.libelles] « Français (6e A) » par identifiant de leçon
 * @returns {object[]} une ligne par contrainte : id_contrainte, phrase, nature, insistance, etat, fois, exemples
 */
export const bilanDesContraintes = ({ compilees, contraintes = [], placements, probleme, libelles = new Map() }) => {
    const placees = placer({ placements, probleme });
    const parId = new Map(contraintes.map((c) => [c.id_contrainte, c]));
    return compilees.map((k) => {
        const c = parId.get(k.id) ?? {};
        const { fois, cas } = aUnEffet(k) ? occurrences(k, placees) : { fois: 0, cas: [] };
        return {
            id_contrainte: k.id,
            phrase: c.phrase ?? null,
            nature: c.nature ?? null,
            insistance: c.insistance ?? null,
            etat: !aUnEffet(k) ? "sans_effet" : fois ? "non_respectee" : "respectee",
            fois,
            exemples: cas.slice(0, EXEMPLES_MAX).map((x) => exemple(x, libelles)),
        };
    });
};
