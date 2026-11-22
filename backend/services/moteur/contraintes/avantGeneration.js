import { Groupe } from "../../../models/index.js";
import { ErreurMetier } from "../../planning/enseignements.js";
import { aujourdhui } from "../valeurs/lecture.js";
import { contexteDuControle } from "./cibles.js";
import { compilerContraintes } from "./compilation.js";
import { lireContraintesEnVigueur } from "./enVigueur.js";
import { cleDeNom, phraseDe } from "./phrases.js";
import { controlerPlace } from "./place.js";

/**
 * Les contraintes déclarées juste avant le calcul (MOT-13a et 13b) : des plages interdites qui ne
 * laissent pas assez de créneaux arrêtent la génération, avec un message qui nomme les contraintes
 * en cause ; sinon, les contraintes en vigueur sont compilées pour le solveur (compilation.js), avec
 * leur phrase et le libellé de chaque séance, pour le bilan (bilan.js).
 */

/** La génération refusée : le message nomme le premier manque, `refus` les donne tous. */
export class ErreurPlace extends ErreurMetier {
    constructor(refus) {
        const autres = refus.length > 1 ? ` Et ${refus.length - 1} autre${refus.length > 2 ? "s" : ""} manque${refus.length > 2 ? "s" : ""}, dans le rapport.` : "";
        super(`${refus[0].message}${autres}`, 400, "PLACE_INSUFFISANTE");
        this.refus = refus;
    }
}

/** Les contraintes qui comptent pour une période : celles en vigueur à son début, ou aujourd'hui si elle a commencé. */
export const dateDesContraintes = (periode) => {
    const jour = aujourdhui();
    return periode.date_debut > jour ? periode.date_debut : jour;
};

/** Contexte et phrases, puis les manques de place, chacun avec les numéros des contraintes en cause. */
const lireEtControler = async ({ probleme, toutes }) => {
    const contexte = await contexteDuControle(probleme.lecons, toutes);
    const avecPhrases = toutes.map((c) => ({ ...c, phrase: phraseDe(c, contexte.noms) }));
    const manques = controlerPlace({ lecons: probleme.lecons, creneaux: probleme.creneaux, salles: probleme.salles, voeux: probleme.voeux, contraintes: avecPhrases, contexte });
    return {
        contexte,
        avecPhrases,
        manques: manques.map((m) => ({
            ...m,
            contraintes: m.contraintes.map((i) => avecPhrases[i].id_contrainte).filter(Boolean),
            contraintes_en_plus: m.contraintes.map((i) => avecPhrases[i].en_plus).filter((x) => x !== undefined),
        })),
    };
};

/**
 * Contrôle de place sur un problème construit (probleme.js).
 * @param {object} o probleme (lecons, creneaux, salles, voeux), date (AAAA-MM-JJ), contraintesEnPlus
 *   (contraintes normalisées pas encore enregistrées, pour la vérification à blanc)
 * @returns {Promise<object[]>} les manques ; chacun cite les numéros des contraintes enregistrées en cause,
 *   et la position (index) de celles en plus
 */
export const manquesDePlace = async ({ probleme, date, contraintesEnPlus = [] }) => {
    const enregistrees = await lireContraintesEnVigueur(date);
    const toutes = [...enregistrees, ...contraintesEnPlus.map((c, index) => ({ ...c, en_plus: index }))];
    if (!toutes.some((c) => c.gabarit === "plage_interdite")) return [];
    return (await lireEtControler({ probleme, toutes })).manques;
};

/** Classe (groupe racine) et nom de chaque groupe de l'école. */
const lireClasses = async () => {
    const groupes = await Groupe.findAll({ attributes: ["id_groupe", "id_groupe_parent", "nom_groupe"] });
    const parent = new Map(groupes.map((g) => [g.id_groupe, g.id_groupe_parent]));
    const racine = (id) => {
        let r = id;
        for (let n = 0; parent.get(r) && n < 20; n += 1) r = parent.get(r);
        return r;
    };
    return { racineDuGroupe: new Map(groupes.map((g) => [g.id_groupe, racine(g.id_groupe)])), noms: new Map(groupes.map((g) => [g.id_groupe, g.nom_groupe])) };
};

/** « Français (6e A) » pour chaque séance, dans les exemples du bilan. */
const libellesDes = (lecons, nomsDesCibles, nomsDesGroupes) =>
    new Map(
        lecons.map((l) => {
            const matiere = nomsDesCibles.get(cleDeNom("matiere", l.coursId)) ?? `matière ${l.coursId}`;
            const groupe = nomsDesGroupes.get(l.groupesDirects?.[0]);
            return [l.id, groupe ? `${matiere} (${groupe})` : matiere];
        })
    );

/**
 * Juste avant le calcul : refuse la génération si les plages interdites ne laissent pas assez de
 * place, sinon compile les contraintes en vigueur pour le solveur.
 * @returns {Promise<{ contraintes: object[], compilees: object[], libelles: Map<string,string> }>}
 */
export const preparerContraintes = async ({ probleme, periode }) => {
    const toutes = await lireContraintesEnVigueur(dateDesContraintes(periode));
    if (!toutes.length) return { contraintes: [], compilees: [], libelles: new Map() };
    const { contexte, avecPhrases, manques } = await lireEtControler({ probleme, toutes });
    if (manques.length) throw new ErreurPlace(manques);
    const classes = await lireClasses();
    const compilees = compilerContraintes({ contraintes: avecPhrases, probleme, contexte: { ...contexte, racineDuGroupe: classes.racineDuGroupe } });
    return { contraintes: avecPhrases, compilees, libelles: libellesDes(probleme.lecons, contexte.noms, classes.noms) };
};
