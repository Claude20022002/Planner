import { ErreurMetier } from "../../planning/enseignements.js";
import { aujourdhui } from "../valeurs/lecture.js";
import { contexteDuControle } from "./cibles.js";
import { lireContraintesEnVigueur } from "./enVigueur.js";
import { phraseDe } from "./phrases.js";
import { controlerPlace } from "./place.js";

/**
 * Contrôle de place juste avant le calcul (MOT-13a) : des plages interdites qui ne laissent pas
 * assez de créneaux arrêtent la génération, avec un message qui nomme les contraintes en cause.
 * Le calcul ne lit pas encore les contraintes déclarées : c'est MOT-13b.
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
    const contexte = await contexteDuControle(probleme.lecons, toutes);
    const avecPhrases = toutes.map((c) => ({ ...c, phrase: phraseDe(c, contexte.noms) }));
    const manques = controlerPlace({ lecons: probleme.lecons, creneaux: probleme.creneaux, salles: probleme.salles, voeux: probleme.voeux, contraintes: avecPhrases, contexte });
    return manques.map((m) => ({
        ...m,
        contraintes: m.contraintes.map((i) => avecPhrases[i].id_contrainte).filter(Boolean),
        contraintes_en_plus: m.contraintes.map((i) => avecPhrases[i].en_plus).filter((x) => x !== undefined),
    }));
};

/** Refuse la génération si les contraintes en vigueur ne laissent pas assez de place. */
export const exigerAssezDePlace = async ({ probleme, periode }) => {
    const manques = await manquesDePlace({ probleme, date: dateDesContraintes(periode) });
    if (manques.length) throw new ErreurPlace(manques);
};
