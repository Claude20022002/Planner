/**
 * Modèles de contrainte (MOT-13, docs/conception/moteur-planification/mot-13-contraintes-declarees.md).
 * L'école ne règle jamais les 498 paramètres du catalogue : elle remplit l'un de ces six modèles
 * (qui, quand, combien, avec quelle insistance), et ce remplissage est une « contrainte déclarée ».
 * Ce fichier est une donnée : les codes sont stables (le site traduit par code), et chaque modèle cite
 * les règles du catalogue dont il est l'instance (un test vérifie qu'elles existent).
 * « tenu » dit si le calcul tient déjà le modèle : faux pour tous jusqu'à MOT-13b (ce qui est montré est tenu).
 */

/** Jours dans l'ordre de la grille ; le rang (1 à 7) est celui que le solveur reçoit. */
export const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

/** Types de cible. Niveau et cycle viendront avec VSC-01 (question 15). */
export const TYPES_DE_CIBLE = ["ecole", "rythme", "filiere", "groupe", "matiere", "enseignant", "salle"];

export const NATURES = ["impossible", "souhait"];

/**
 * Insistance d'un souhait : multiplicateur du poids de départ du modèle. « Indispensable » n'a pas de
 * multiplicateur : il passe sur un niveau de score à part en 13b (question 9).
 */
export const INSISTANCES = { peu: 1, normal: 3, beaucoup: 10, indispensable: null };
export const INSISTANCE_PAR_DEFAUT = "normal";

const PLAGE = {
    jours: { type: "jours", obligatoire: true },
    debut: { type: "heure", obligatoire: true },
    fin: { type: "heure", obligatoire: true },
};

export const GABARITS = {
    plage_interdite: {
        nom: "Plage interdite",
        description: "Aucun cours pour ces cibles sur cette plage, chaque semaine.",
        natures: ["impossible"],
        cibles: ["ecole", "rythme", "filiere", "groupe", "salle", "matiere"],
        champs: PLAGE,
        poids: null,
        tenu: false,
        regles: ["HOR.REGLE.PLAGES_RESTREINTES", "SAL.REGLE.INDISPONIBLE", "HOR.REGLE.HEURES_AUTORISEES"],
    },
    plage_a_eviter: {
        nom: "Plage à éviter",
        description: "Le calcul évite cette plage pour ces cibles, autant qu'il le peut.",
        natures: ["souhait"],
        cibles: ["ecole", "rythme", "filiere", "groupe", "salle", "matiere"],
        champs: PLAGE,
        poids: 10,
        tenu: false,
        regles: ["HOR.REGLE.PLAGES_RESTREINTES", "HOR.REGLE.COURS_TARDIFS", "HOR.REGLE.COURS_TOT"],
    },
    moment_de_la_journee: {
        nom: "Moment de la journée",
        description: "Placer ces cours plutôt le matin, plutôt l'après-midi, ou loin de la fin de journée.",
        natures: ["souhait"],
        cibles: ["matiere", "groupe"],
        champs: { moment: { type: "choix", valeurs: ["matin", "apres_midi", "pas_en_fin_de_journee"], obligatoire: true } },
        poids: 10,
        tenu: false,
        regles: ["MAT.REGLE.MATIN", "MAT.REGLE.PAS_FIN_JOURNEE", "PED.COGN.FONDAMENTAUX_MATIN"],
    },
    plafond_par_jour: {
        nom: "Plafond par jour",
        description: "Pas plus d'heures, de séances, ou de séances à la suite dans une même journée.",
        // Une impossibilité seulement pour les heures : une règle stricte du catalogue la couvre déjà
        natures: ["souhait", "impossible"],
        cibles: ["groupe", "enseignant", "matiere"],
        champs: {
            quoi: { type: "choix", valeurs: ["heures", "seances", "seances_a_la_suite"], obligatoire: true },
            seuil: { type: "entier", min: 1, max: 16, obligatoire: true },
        },
        poids: 10,
        tenu: false,
        regles: ["MAT.REGLE.MAX_PAR_JOUR", "MAT.REGLE.CONSECUTIVES_MAX", "ENS.CHARGE.MAX_CONSECUTIVES", "HOR.REGLE.MAX_CONSECUTIVES", "PED.ORG.MATIERES_PAR_JOUR", "ENS.CHARGE.MAX_CLASSES_JOUR"],
    },
    repartition: {
        nom: "Répartition dans la semaine",
        description: "Les séances d'une matière sur des jours différents, avec un écart minimal en jours.",
        natures: ["souhait"],
        cibles: ["matiere", "groupe"],
        champs: { ecart_jours: { type: "entier", min: 1, max: 3, obligatoire: true } },
        poids: 10,
        tenu: false,
        regles: ["MAT.REGLE.JOURS_DIFFERENTS", "MAT.REGLE.ESPACEMENT", "MAT.REGLE.ECART_MIN", "HOR.REGLE.EQUILIBRE_SEMAINE"],
    },
    ensemble_ou_separe: {
        nom: "Ensemble ou séparé",
        description: "Deux listes de matières en même temps, jamais le même jour, ou jamais à la suite.",
        // Une impossibilité seulement pour « en même temps » : l'alignement des groupes de langue
        natures: ["souhait", "impossible"],
        cibles: ["ecole", "filiere", "groupe"],
        champs: {
            matieres_a: { type: "matieres", obligatoire: true },
            matieres_b: { type: "matieres", obligatoire: true },
            relation: { type: "choix", valeurs: ["en_meme_temps", "jamais_le_meme_jour", "jamais_a_la_suite"], obligatoire: true },
        },
        poids: 10,
        tenu: false,
        regles: ["MAT.REGLE.ALIGNEMENT", "MAT.REGLE.INCOMPATIBLES", "MAT.REGLE.REGROUPEMENT", "PED.COGN.DIFFICILES_SUIVIES"],
    },
};

/** Le modèle admet-il cette nature, avec ces champs ? */
export const natureAdmise = (code, nature, parametres = {}) => {
    const g = GABARITS[code];
    if (!g?.natures.includes(nature)) return false;
    if (nature !== "impossible") return true;
    if (code === "plafond_par_jour") return parametres.quoi === "heures";
    if (code === "ensemble_ou_separe") return parametres.relation === "en_meme_temps";
    return true;
};

/** Nature par défaut : la première admise par le modèle. */
export const natureParDefaut = (code) => GABARITS[code]?.natures[0] ?? null;

/** Poids d'un souhait dans le calcul (13b) : poids de départ × insistance ; null si indispensable ou impossible. */
export const poidsDe = ({ gabarit, nature, insistance }) => {
    if (nature === "impossible") return null;
    const facteur = INSISTANCES[insistance ?? INSISTANCE_PAR_DEFAUT];
    return facteur ? GABARITS[gabarit].poids * facteur : null;
};

/** Description publique des modèles, pour l'écran (GET /api/moteur/gabarits). */
export const decrireGabarits = () =>
    Object.entries(GABARITS).map(([code, g]) => ({
        code,
        nom: g.nom,
        description: g.description,
        natures: g.natures,
        cibles: g.cibles,
        champs: Object.entries(g.champs).map(([cle, c]) => ({ cle, ...c })),
        insistances: g.natures.includes("souhait") ? Object.keys(INSISTANCES) : [],
        regles: g.regles,
        tenu: g.tenu,
    }));
