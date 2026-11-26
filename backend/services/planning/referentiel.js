import { Creneau, TrajetCampus } from "../../models/index.js";
import { PARAMETRES_PLANNING } from "../../config/parametresPlanning.js";
import { ANCIENS_PARAMETRES } from "../moteur/valeurs/anciensParametres.js";
import { lireALEcole } from "../moteur/valeurs/valeursDeLEcole.js";

/**
 * Recalcule le rang (position dans la journée) des créneaux d'une grille :
 * même jour, même régime, même variante, triés par heure de début.
 */
export const recalculerRangs = async ({ jour_semaine, regime, variante }, transaction) => {
    const creneaux = await Creneau.findAll({
        where: { jour_semaine, regime, variante },
        order: [["heure_debut", "ASC"], ["heure_fin", "ASC"]],
        transaction,
    });
    for (const [index, creneau] of creneaux.entries()) {
        if (creneau.rang !== index + 1) {
            await creneau.update({ rang: index + 1 }, { transaction });
        }
    }
};

/**
 * Paramètres de planification. Depuis ADM-02 (bascule), ils se lisent dans les réglages du moteur (MP-1),
 * à la portée de l'école et à la date du jour à l'école : une seule source, que le panneau de
 * configuration écrit. La forme et les unités ne changent pas pour les appelants (génération, saisie
 * manuelle, examens, salles, campus). La table ParametresPlanning n'est plus lue.
 */
const lireAnciens = async (cles) => {
    const { resultats } = await lireALEcole(cles.map((cle) => ANCIENS_PARAMETRES[cle].id));
    return Object.fromEntries(
        cles.map((cle) => {
            const { id, revenir } = ANCIENS_PARAMETRES[cle];
            const { defaut: ancienDefaut, description } = PARAMETRES_PLANNING[cle];
            const r = resultats.get(id);
            const lire = (v) => (v === null || v === undefined ? ancienDefaut : revenir(v));
            return [cle, { valeur: lire(r.valeur), defaut: lire(r.valeur_du_profil), description, modifie: r.origine === "etablissement" }];
        })
    );
};

/** Paramètres de planification : valeur en vigueur à l'école, valeur de départ, description. */
export const lireParametres = () => lireAnciens(Object.keys(PARAMETRES_PLANNING));

/** Un paramètre de planification, dans son ancienne unité ; undefined s'il n'existe pas. */
export const lireParametre = async (cle) => (PARAMETRES_PLANNING[cle] ? (await lireAnciens([cle]))[cle].valeur : undefined);

/** Paire de campus rangée (a < b) : une seule ligne de trajet par paire. */
export const paireCampus = (idA, idB) => {
    const [a, b] = [Number(idA), Number(idB)].sort((x, y) => x - y);
    return { id_campus_a: a, id_campus_b: b };
};

/** Minutes nécessaires pour passer d'un campus à un autre (0 sur le même campus). */
export const minutesTrajet = async (idCampusDepart, idCampusArrivee) => {
    if (Number(idCampusDepart) === Number(idCampusArrivee)) return 0;
    const trajet = await TrajetCampus.findOne({ where: paireCampus(idCampusDepart, idCampusArrivee) });
    return trajet ? trajet.minutes : lireParametre("trajet_inter_campus_defaut_minutes");
};
