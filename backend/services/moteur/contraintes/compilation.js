import { JOURS, poidsDe } from "./gabarits.js";
import { minutesDe } from "./controle.js";
import { concerne } from "./place.js";

/**
 * Compilation des contraintes déclarées pour le solveur (MOT-13b, mot-13b-solveur.md § 4.2).
 * Le solveur ne connaît ni les filières, ni les rythmes, ni les matières par leur nom : chaque
 * contrainte devient une liste explicite de séances (ou de salles), de créneaux et de paquets, dans
 * l'une des quatre familles PLAGE, PLAFOND, REPARTITION et ENSEMBLE. Fonction pure.
 * Seules les séances à placer sont visées : une séance épinglée ne bouge pas, et la saisie manuelle
 * contrôle déjà les plages (plagesDeLaSeance.js).
 */

/** Une séance qui commence à 12 h 30 ou après est l'après-midi, comme dans probleme.js. */
export const APRES_MIDI = 12 * 60 + 30;

/** Niveau du score : impossibilité → DUR, souhait indispensable → MOYEN, autre souhait → SOUPLE. */
export const niveauDe = (c) => (c.nature === "impossible" ? "DUR" : c.insistance === "indispensable" ? "MOYEN" : "SOUPLE");

const rangsDe = (jours) => new Set(jours.map((j) => JOURS.indexOf(j) + 1));

/** Créneaux de la grille qui touchent la plage (jours, de début à fin). */
const creneauxDeLaPlage = (p, creneaux) => {
    const rangs = rangsDe(p.jours);
    const debut = minutesDe(p.debut);
    const fin = minutesDe(p.fin);
    return creneaux.filter((c) => rangs.has(c.jour) && c.debut < fin && c.fin > debut).map((c) => c.id);
};

/** Créneaux à éviter pour un moment de la journée : l'après-midi, le matin, ou le dernier rang de chaque jour. */
const creneauxHorsDuMoment = (moment, creneaux) => {
    if (moment === "matin") return creneaux.filter((c) => c.debut >= APRES_MIDI).map((c) => c.id);
    if (moment === "apres_midi") return creneaux.filter((c) => c.debut < APRES_MIDI).map((c) => c.id);
    const dernier = new Map();
    for (const c of creneaux) {
        const cle = `${c.regime}|${c.jour}`;
        if (!dernier.has(cle) || c.rang > dernier.get(cle).rang) dernier.set(cle, c);
    }
    return [...dernier.values()].map((c) => c.id);
};

/** Paquets sans doublon : deux feuilles qui suivent les mêmes séances ne comptent qu'une fois. */
const sansDoublon = (paquets) => {
    const vus = new Map();
    for (const p of paquets) {
        const cle = `${[...p.a].sort().join(",")}|${[...(p.b ?? [])].sort().join(",")}`;
        if (!vus.has(cle)) vus.set(cle, p);
    }
    return [...vus.values()];
};

/** Un paquet par feuille : les séances que suivent les mêmes élèves. */
const parFeuille = (lecons) => {
    const feuilles = [...new Set(lecons.flatMap((l) => l.feuilles))].sort((x, y) => x - y);
    return feuilles.map((f) => lecons.filter((l) => l.feuilles.includes(f)));
};

const PLAFOND = (k, visees) => {
    const enseignants = k.cibles.filter((x) => x.type === "enseignant").map((x) => x.id);
    const groupes = enseignants.length ? enseignants.map((e) => visees.filter((l) => l.enseignants.includes(e))) : parFeuille(visees);
    return {
        famille: "PLAFOND",
        quoi: k.parametres.quoi.toUpperCase(),
        seuil: k.parametres.seuil,
        paquets: sansDoublon(groupes.filter((g) => g.length).map((g) => ({ a: g.map((l) => l.id) }))),
    };
};

const REPARTITION = (k, visees) => {
    const paquets = [];
    for (const feuille of parFeuille(visees)) {
        for (const cours of [...new Set(feuille.map((l) => l.coursId))]) {
            const memes = feuille.filter((l) => l.coursId === cours);
            if (memes.length > 1) paquets.push({ a: memes.map((l) => l.id) });
        }
    }
    return { famille: "REPARTITION", ecart: k.parametres.ecart_jours, paquets: sansDoublon(paquets) };
};

/** Un paquet par groupe visé, ou par classe (groupe racine) ; seuls comptent ceux qui ont les deux côtés. */
const ENSEMBLE = (k, visees, ctx) => {
    const a = new Set(k.parametres.matieres_a);
    const b = new Set(k.parametres.matieres_b);
    const groupesVises = k.cibles.filter((x) => x.type === "groupe").map((x) => x.id);
    const ensembles = groupesVises.length
        ? groupesVises.map((g) => visees.filter((l) => l.feuilles.some((f) => ctx.feuillesDuGroupe.get(g)?.has(f))))
        : [...new Set(visees.flatMap((l) => l.feuilles.map((f) => ctx.racineDuGroupe.get(f) ?? f)))]
              .sort((x, y) => x - y)
              .map((r) => visees.filter((l) => l.feuilles.some((f) => (ctx.racineDuGroupe.get(f) ?? f) === r)));
    const paquets = ensembles
        .map((s) => ({ a: s.filter((l) => a.has(l.coursId)).map((l) => l.id), b: s.filter((l) => b.has(l.coursId)).map((l) => l.id) }))
        .filter((p) => p.a.length && p.b.length);
    return { famille: "ENSEMBLE", relation: k.parametres.relation.toUpperCase(), paquets: sansDoublon(paquets) };
};

const PLAGE = (k, visees, ctx, creneaux) => {
    const salles = k.cibles.filter((x) => x.type === "salle").map((x) => x.id);
    const vers = k.gabarit === "moment_de_la_journee" ? creneauxHorsDuMoment(k.parametres.moment, creneaux) : creneauxDeLaPlage(k.parametres, creneaux);
    return { famille: "PLAGE", lecons: salles.length ? [] : visees.map((l) => l.id), salles, creneaux: vers };
};

const FAMILLES = { plage_interdite: PLAGE, plage_a_eviter: PLAGE, moment_de_la_journee: PLAGE, plafond_par_jour: PLAFOND, repartition: REPARTITION, ensemble_ou_separe: ENSEMBLE };

/** Une contrainte compilée vise-t-elle quelque chose ? Sinon, elle ne coûte rien et le bilan la dit « sans effet ». */
export const aUnEffet = (k) =>
    k.famille === "PLAGE" ? k.creneaux.length > 0 && (k.lecons.length > 0 || k.salles.length > 0) : k.paquets.length > 0;

/**
 * @param {object} o
 * @param {object[]} o.contraintes contraintes en vigueur, normalisées ({ id_contrainte, gabarit, cibles, parametres, nature, insistance })
 * @param {object} o.probleme le problème construit (probleme.js) : lecons, creneaux
 * @param {object} o.contexte filiereDuCours, feuillesDuGroupe (cibles.js), racineDuGroupe (feuille → classe)
 * @returns {object[]} une contrainte compilée par contrainte déclarée, au format du solveur (ContrainteDeclaree.java)
 */
export const compilerContraintes = ({ contraintes, probleme, contexte }) => {
    const aPlacer = probleme.lecons.filter((l) => !l.epinglee);
    return contraintes
        .filter((c) => FAMILLES[c.gabarit])
        .map((c) => {
            const visees = aPlacer.filter((l) => concerne(c, l, contexte));
            const niveau = niveauDe(c);
            return {
                id: c.id_contrainte,
                niveau,
                ...(niveau === "SOUPLE" ? { poids: poidsDe(c) } : {}),
                ...FAMILLES[c.gabarit](c, visees, contexte, probleme.creneaux),
            };
        });
};
