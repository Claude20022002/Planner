/**
 * Inscriptions (VSC-02, migration 0063) : une personne, une année, un niveau, un état.
 *
 * `Appartenir` reste le seul lien aux groupes (VSC-01, Q-6) : cette table ne dit pas dans quelle
 * classe l'élève est assis, seulement qu'il est inscrit pour l'année. Deux index portent les règles
 * que le code ne doit pas avoir à rattraper : une inscription par personne et par année, et un seul
 * successeur pour une réinscription.
 *
 * Aucune ligne créée d'office : une base existante reçoit une table vide.
 */

export const up = async ({ queryInterface }) => {
    const { DataTypes } = await import("sequelize");

    await queryInterface.createTable("Inscriptions", {
        id_inscription: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_personne: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Personnes", key: "id_personne" }, onDelete: "CASCADE", onUpdate: "CASCADE" },
        // « RESTRICT » : on ne supprime pas une année qui porte des inscriptions
        id_annee: { type: DataTypes.INTEGER, allowNull: false, references: { model: "AnneesUniversitaires", key: "id_annee" }, onDelete: "RESTRICT", onUpdate: "CASCADE" },
        niveau: { type: DataTypes.STRING(60), allowNull: false },
        etat: { type: DataTypes.ENUM("demandee", "engagee", "confirmee", "inscrite", "radiee", "passante"), allowNull: false, defaultValue: "demandee" },
        date_entree: { type: DataTypes.DATEONLY, allowNull: true },
        date_sortie: { type: DataTypes.DATEONLY, allowNull: true },
        id_inscription_precedente: { type: DataTypes.INTEGER, allowNull: true, unique: true, references: { model: "Inscriptions", key: "id_inscription" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
    await queryInterface.addIndex("Inscriptions", ["id_personne", "id_annee"], { name: "inscriptions_personne_annee", unique: true });
    await queryInterface.addIndex("Inscriptions", ["id_annee", "etat"], { name: "inscriptions_annee_etat" });
};

export const down = async ({ queryInterface }) => {
    await queryInterface.dropTable("Inscriptions");
};
