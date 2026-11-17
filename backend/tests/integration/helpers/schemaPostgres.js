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

/** Vide le schéma public, recrée toutes les tables depuis les modèles, puis l'identité neutre. */
export const reconstruirePostgres = async () => {
    await sequelize.query("DROP SCHEMA IF EXISTS public CASCADE");
    await sequelize.query("CREATE SCHEMA public");
    await sequelize.sync();
    await ConfigurationEtablissement.create({ id: 1, ...NEUTRE });
};
