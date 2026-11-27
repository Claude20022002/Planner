import { Creneau, ParametrePlanning, TrajetCampus } from "../../../models/index.js";

/**
 * services/planning/referentiel.js tel qu'il était avant la bascule d'ADM-02 (commit a6681a1f^), figé
 * pour le test « problème envoyé au solveur identique avant et après la bascule »
 * (repriseParametres.test.js) : les paramètres de planification se lisaient dans la table
 * ParametresPlanning, sinon valeur par défaut. Ne sert qu'à ce test ; ne pas faire évoluer.
 */

// config/parametresPlanning.js à la même date : valeurs par défaut et descriptions
const PARAMETRES_PLANNING = {
    max_heures_jour_groupe: { defaut: 8, description: "Nombre maximal d'heures de cours par jour pour un groupe" },
    max_heures_jour_enseignant: { defaut: 8, description: "Nombre maximal d'heures de cours par jour pour un enseignant" },
    duree_seance_defaut_minutes: { defaut: 90, description: "Durée d'une séance par défaut (minutes)" },
    ratio_capacite_examen: { defaut: 0.5, description: "Part de la capacité d'une salle utilisable en examen (si non renseignée sur la salle)" },
    surveillants_par_salle: { defaut: 2, description: "Nombre minimal de surveillants par salle d'examen" },
    trajet_inter_campus_defaut_minutes: { defaut: 30, description: "Temps de trajet entre deux campus quand aucun trajet n'est renseigné" },
};

export const recalculerRangs = async ({ jour_semaine, regime, variante }, transaction) => {
    const creneaux = await Creneau.findAll({ where: { jour_semaine, regime, variante }, order: [["heure_debut", "ASC"], ["heure_fin", "ASC"]], transaction });
    for (const [index, creneau] of creneaux.entries()) {
        if (creneau.rang !== index + 1) await creneau.update({ rang: index + 1 }, { transaction });
    }
};

export const lireParametres = async () => {
    const lignes = await ParametrePlanning.findAll();
    const enBase = new Map(lignes.map((ligne) => [ligne.cle, ligne.valeur]));
    return Object.fromEntries(
        Object.entries(PARAMETRES_PLANNING).map(([cle, { defaut, description }]) => [cle, { valeur: enBase.has(cle) ? enBase.get(cle) : defaut, defaut, description, modifie: enBase.has(cle) }])
    );
};

export const lireParametre = async (cle) => {
    const ligne = await ParametrePlanning.findByPk(cle);
    return ligne ? ligne.valeur : PARAMETRES_PLANNING[cle]?.defaut;
};

export const paireCampus = (idA, idB) => {
    const [a, b] = [Number(idA), Number(idB)].sort((x, y) => x - y);
    return { id_campus_a: a, id_campus_b: b };
};

export const minutesTrajet = async (idCampusDepart, idCampusArrivee) => {
    if (Number(idCampusDepart) === Number(idCampusArrivee)) return 0;
    const trajet = await TrajetCampus.findOne({ where: paireCampus(idCampusDepart, idCampusArrivee) });
    return trajet ? trajet.minutes : lireParametre("trajet_inter_campus_defaut_minutes");
};
