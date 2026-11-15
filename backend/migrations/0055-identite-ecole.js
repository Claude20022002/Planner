/**
 * Identité et marque de l'école (plan multi-établissements, D-21, lots ME-1 et ME-11) : une table
 * d'une seule ligne, dans la base de l'école, que son administration règle depuis le panneau de
 * configuration. Elle remplace le nom « HESTIM » écrit en dur dans les courriels, l'agenda, les PDF
 * et les écrans, et le logo copié à cinq endroits du site.
 *
 * Une base qui a déjà des comptes (celle de l'école d'origine) reçoit l'identité actuelle de HESTIM,
 * logo compris (copie de frontend/public/HESTIM.png dans backend/assets/ecole) : rien ne change
 * pour elle au déploiement. Une base neuve reçoit une ligne neutre, sans logo, que l'école règle
 * dans le panneau (PLA-03, même règle que la migration 0057).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const LOGO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "assets", "ecole", "logo-hestim.png");

// Figée ici : une migration ne dépend pas d'un fichier qui évoluera (voir services/etablissement/identite.js)
const NEUTRE = { nom: "Planner", nom_court: "Planner", couleur_principale: "#1D4ED8", couleur_accent: "#0E7490", logo: null, logo_type: null, logo_maj_le: null, modele_edt: "planner" };

export const up = async ({ queryInterface }) => {
    const { DataTypes } = await import("sequelize");
    await queryInterface.createTable("ConfigurationEtablissement", {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        nom: { type: DataTypes.STRING(150), allowNull: false },
        nom_court: { type: DataTypes.STRING(30), allowNull: false },
        couleur_principale: { type: DataTypes.CHAR(7), allowNull: false },
        couleur_accent: { type: DataTypes.CHAR(7), allowNull: false },
        logo: { type: DataTypes.BLOB("medium"), allowNull: true },
        logo_type: { type: DataTypes.STRING(30), allowNull: true },
        logo_maj_le: { type: DataTypes.DATE, allowNull: true },
        expediteur_nom: { type: DataTypes.STRING(100), allowNull: true },
        adresse_reponse: { type: DataTypes.STRING(255), allowNull: true },
        modele_edt: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "planner" },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
    const maintenant = new Date();
    const [[{ comptes }]] = await queryInterface.sequelize.query("SELECT COUNT(*) AS comptes FROM Users");
    const identite = Number(comptes)
        ? {
              nom: "HESTIM Engineering & Business School",
              nom_court: "HESTIM",
              // Couleurs relevées sur le logo officiel (shared/design-tokens.json, brand.navy et brand.orange)
              couleur_principale: "#001861",
              couleur_accent: "#F26322",
              logo: fs.existsSync(LOGO) ? fs.readFileSync(LOGO) : null,
              logo_type: fs.existsSync(LOGO) ? "image/png" : null,
              logo_maj_le: fs.existsSync(LOGO) ? maintenant : null,
              // Le format de l'EDT du mois de HESTIM (calqué sur son EDT officiel d'octobre 2026)
              modele_edt: "hestim",
          }
        : NEUTRE;
    await queryInterface.bulkInsert("ConfigurationEtablissement", [{ id: 1, ...identite, expediteur_nom: null, adresse_reponse: null, createdAt: maintenant, updatedAt: maintenant }]);
};

export const down = async ({ queryInterface }) => {
    await queryInterface.dropTable("ConfigurationEtablissement");
};
