import { ligneesDe } from "../../planning/groupes.js";
import { lireNoms } from "./cibles.js";
import { minutesDe } from "./controle.js";
import { lireContraintesEnVigueur } from "./enVigueur.js";
import { citation, phraseDe } from "./phrases.js";
import { concerne } from "./place.js";

/**
 * Plages déclarées qui touchent une séance saisie à la main (MOT-13b, réponse 18). Elles remplacent
 * les anciens réglages « pause du vendredi » et « samedi après-midi », repris par la migration 0081 :
 * une plage interdite bloque la séance, une plage à éviter n'est qu'un avertissement. Toutes les
 * plages en vigueur à la date de la séance comptent, avec la même règle de cible que la génération
 * (concerne de place.js ; une plage de salle vise la salle de la séance).
 */

const PLAGES = ["plage_interdite", "plage_a_eviter"];

const MESSAGES = {
    plage_interdite: (phrase) => `Cette séance tombe sur une plage interdite par l'école : ${citation(phrase)}.`,
    plage_a_eviter: (phrase) => `Cette séance tombe sur une plage que l'école préfère éviter : ${citation(phrase)}. C'est un avertissement : vous pouvez la garder.`,
};

const sansCache = (cle, charger) => charger();

/**
 * @param {object} s la séance : date, jour (« vendredi »), creneau (heures effectives), regime,
 *   idCours, idFiliere (de la matière), feuilles (groupes les plus fins), enseignants, idSalle
 * @param {object} [o] lu (lecture mise en cache par la passe de validation), transaction
 * @returns {Promise<{ code, bloquant, message, id_contrainte }[]>}
 */
export const plagesDeLaSeance = async (s, { lu = sansCache, transaction } = {}) => {
    const enVigueur = await lu(`plages|${s.date}`, () => lireContraintesEnVigueur(s.date, { transaction }));
    const debut = minutesDe(String(s.creneau.heure_debut).slice(0, 5));
    const fin = minutesDe(String(s.creneau.heure_fin).slice(0, 5));
    const touchees = enVigueur.filter(
        (k) => PLAGES.includes(k.gabarit) && k.parametres.jours.includes(s.jour) && debut < minutesDe(k.parametres.fin) && minutesDe(k.parametres.debut) < fin
    );
    if (!touchees.length) return [];

    const groupes = [...new Set(touchees.flatMap((k) => k.cibles.filter((x) => x.type === "groupe").map((x) => x.id)))];
    const feuillesDuGroupe = new Map(
        await Promise.all(groupes.map(async (g) => [g, new Set((await lu(`lignees|${g}`, () => ligneesDe(g, transaction))).map((l) => l.feuille))]))
    );
    const contexte = { filiereDuCours: new Map([[s.idCours, s.idFiliere]]), feuillesDuGroupe };
    const lecon = { regime: s.regime, coursId: s.idCours, feuilles: s.feuilles, enseignants: s.enseignants };
    const visees = touchees.filter((k) => {
        const salles = k.cibles.filter((x) => x.type === "salle").map((x) => x.id);
        return salles.length ? salles.includes(s.idSalle) : concerne(k, lecon, contexte);
    });
    if (!visees.length) return [];

    const noms = await lu(`plagesNoms|${visees.map((k) => k.id_contrainte).join(",")}`, () => lireNoms(visees, { transaction }));
    return visees.map((k) => ({
        code: k.gabarit,
        bloquant: k.gabarit === "plage_interdite",
        message: MESSAGES[k.gabarit](phraseDe(k, noms)),
        id_contrainte: k.id_contrainte,
    }));
};
