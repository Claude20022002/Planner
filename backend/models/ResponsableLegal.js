import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

/**
 * Le rôle de responsable légal, porté par une personne (VSC-02, Q-4).
 *
 * Table à part et non un rôle dans `Users` : un responsable existe sans compte (Q-20), et une même
 * personne peut être élève d'un côté et parent d'un autre élève (question 2 du plan).
 */
const ResponsableLegal = sequelize.define(
    "ResponsableLegal",
    {
        id_responsable: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_personne: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: { model: "Personnes", key: "id_personne" },
            onDelete: "CASCADE",
        },
        profession: { type: DataTypes.STRING(120), allowNull: true },
        // Compte de connexion du responsable : facultatif, un par personne
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
            references: { model: "Users", key: "id_user" },
            onDelete: "SET NULL",
        },
    },
    { tableName: "ResponsablesLegaux", freezeTableName: true }
);

export default ResponsableLegal;
