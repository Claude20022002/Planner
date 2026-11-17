import sequelize from "../../../config/db.js";
import { ConfigurationEtablissement } from "../../../models/index.js";

/**
 * Essai PostgreSQL (Q-30, branche etude/essai-postgresql, jamais fusionnée) : reconstruit la base
 * de test PostgreSQL depuis les modèles (sequelize.sync), puisque les 62 migrations sont écrites
 * pour MySQL. Critère 2 du plan : l'écart entre ce schéma et celui des migrations est relevé à part.
 */

/** Vrai quand la base de test est PostgreSQL. */
export const estPostgres = () => sequelize.getDialect() === "postgres";

/** Identité neutre d'une base neuve, recopiée de la migration 0055 (NEUTRE). */
const NEUTRE = {
    nom: "Planner",
    nom_court: "Planner",
    couleur_principale: "#1D4ED8",
    couleur_accent: "#0E7490",
    logo: null,
    logo_type: null,
    logo_maj_le: null,
    modele_edt: "planner",
};

/** Unicités présentes après les migrations MySQL et absentes d'un schéma tiré des modèles (relevé du 17 nov.). */
const UNICITES_DES_MIGRATIONS = [
    ["DevoirsRendus", ["id_devoir", "id_user"]],
    ["EnvoisEdt", ["id_groupe", "mois"]],
    ["JeuxModules", ["code_jeu", "id_cours"]],
    ["JeuxProgressions", ["id_user", "code_jeu", "id_defi"]],
    ["JoueursDirect", ["id_session", "id_user"]],
    ["ParticipationsJeu", ["id_session_jeu", "id_user"]],
    ["Presences", ["id_affectation", "appareil"]],
    ["Presences", ["id_affectation", "id_user"]],
    ["QuizResultats", ["id_quiz_partie", "pseudo"]],
    ["ReponsesDirect", ["id_session", "index_question", "id_user"]],
    ["Surveillances", ["id_session", "id_user"]],
    ["VersionsParametres", ["annule_version"]],
];

/** Vide le schéma public, recrée toutes les tables depuis les modèles, puis l'identité neutre. */
export const reconstruirePostgres = async () => {
    await sequelize.query("DROP SCHEMA IF EXISTS public CASCADE");
    await sequelize.query("CREATE SCHEMA public");
    await sequelize.sync();
    // CompteursDebit n'a pas de modèle : sa migration (createTable, addIndex) est portable telle quelle
    const { up } = await import("../../../migrations/0037-compteurs-debit.js");
    await up({ queryInterface: sequelize.getQueryInterface() });
    // Critère 2 : 12 unicités métier ne sont déclarées que dans les migrations, pas dans les modèles
    const qi = sequelize.getQueryInterface();
    for (const [table, champs] of UNICITES_DES_MIGRATIONS) await qi.addIndex(table, champs, { unique: true });
    await ConfigurationEtablissement.create({ id: 1, ...NEUTRE });
};
