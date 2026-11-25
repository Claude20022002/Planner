import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { SEXES } from "../../shared/vieScolaire.js";

/**
 * Une personne de l'école (VSC-02, Q-14) : l'état civil, séparé du compte.
 *
 * `id_user` est facultatif : un élève de primaire, un responsable qui n'a pas d'adresse, existent
 * dans le dossier sans pouvoir se connecter (Q-20). L'identifiant de connexion viendra au lot
 * suivant ; il ne change rien ici.
 */
const Personne = sequelize.define(
    "Personne",
    {
        id_personne: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nom: { type: DataTypes.STRING(100), allowNull: false },
        prenom: { type: DataTypes.STRING(100), allowNull: false },
        date_naissance: { type: DataTypes.DATEONLY, allowNull: true },
        sexe: { type: DataTypes.ENUM(...SEXES), allowNull: true },
        lieu_naissance: { type: DataTypes.STRING(120), allowNull: true },
        telephone: { type: DataTypes.STRING(30), allowNull: true },
        email_contact: { type: DataTypes.STRING(190), allowNull: true },
        // Code Massar (CNE) : facultatif, unique quand il est renseigné
        cne: { type: DataTypes.STRING(20), allowNull: true, unique: true },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
            references: { model: "Users", key: "id_user" },
            onDelete: "SET NULL",
        },
    },
    { tableName: "Personnes", freezeTableName: true }
);

export default Personne;
