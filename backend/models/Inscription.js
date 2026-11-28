import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { ETATS_INSCRIPTION } from "../../shared/vieScolaire.js";

/**
 * L'inscription d'une personne pour une année (VSC-02, Q-6 ; VSC-01 § 4).
 *
 * `Appartenir` reste le seul lien aux groupes : l'inscription dit l'année, le niveau et l'état.
 * Une ligne par année, reliée à celle de l'année précédente : l'historique n'a pas besoin d'archive.
 */
const Inscription = sequelize.define(
    "Inscription",
    {
        id_inscription: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_personne: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Personnes", key: "id_personne" },
            onDelete: "CASCADE",
        },
        id_annee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "AnneesUniversitaires", key: "id_annee" },
            onDelete: "RESTRICT",
        },
        niveau: { type: DataTypes.STRING(60), allowNull: false },
        etat: { type: DataTypes.ENUM(...ETATS_INSCRIPTION), allowNull: false, defaultValue: "demandee" },
        date_entree: { type: DataTypes.DATEONLY, allowNull: true },
        date_sortie: { type: DataTypes.DATEONLY, allowNull: true },
        // Réinscription : le lien vers l'année précédente, unique pour n'avoir qu'un successeur
        id_inscription_precedente: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
            references: { model: "Inscriptions", key: "id_inscription" },
            onDelete: "SET NULL",
        },
    },
    {
        tableName: "Inscriptions",
        freezeTableName: true,
        indexes: [{ unique: true, name: "inscriptions_personne_annee", fields: ["id_personne", "id_annee"] }],
    }
);

export default Inscription;
