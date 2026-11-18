/**
 * Paramètres de planification modifiables par l'administration.
 * La base (table ParametresPlanning) ne stocke que les valeurs modifiées : sans ligne,
 * c'est la valeur par défaut ci-dessous qui s'applique. Les valeurs inconnues de
 * l'école (trajet entre campus…) sont des hypothèses à confirmer.
 * La pause du vendredi et le samedi après-midi sont devenus des contraintes déclarées de l'école
 * (MOT-13b, migration 0081) : leurs anciennes lignes restent en base, et ne sont plus lues.
 */

const entier = (min, max) => (v) => Number.isInteger(v) && v >= min && v <= max;

export const PARAMETRES_PLANNING = {
    max_heures_jour_groupe: {
        defaut: 8,
        valider: entier(1, 12),
        description: "Nombre maximal d'heures de cours par jour pour un groupe",
    },
    max_heures_jour_enseignant: {
        defaut: 8,
        valider: entier(1, 12),
        description: "Nombre maximal d'heures de cours par jour pour un enseignant",
    },
    duree_seance_defaut_minutes: {
        defaut: 90,
        valider: entier(30, 300),
        description: "Durée d'une séance par défaut (minutes)",
    },
    ratio_capacite_examen: {
        defaut: 0.5,
        valider: (v) => typeof v === "number" && v > 0 && v <= 1,
        description: "Part de la capacité d'une salle utilisable en examen (si non renseignée sur la salle)",
    },
    surveillants_par_salle: {
        defaut: 2,
        valider: entier(1, 6),
        description: "Nombre minimal de surveillants par salle d'examen",
    },
    trajet_inter_campus_defaut_minutes: {
        defaut: 30,
        valider: entier(0, 240),
        description: "Temps de trajet entre deux campus quand aucun trajet n'est renseigné",
    },
};

export const estParametreConnu = (cle) => Object.hasOwn(PARAMETRES_PLANNING, cle);
