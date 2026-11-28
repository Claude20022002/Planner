import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { LIENS_FAMILLE } from "../../shared/vieScolaire.js";

/**
 * Le lien entre un élève et un responsable (VSC-02) : quel lien, et qui reçoit les courriers.
 *
 * Un enfant peut avoir plusieurs responsables ; **un seul** est titulaire à un instant donné. La
 * règle est tenue par le service, faute d'index partiel en MySQL (test C5-titulaire).
 */
const LienFamille = sequelize.define(
    "LienFamille",
    {
        id_personne: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: { model: "Personnes", key: "id_personne" },
            onDelete: "CASCADE",
        },
        id_responsable: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: { model: "ResponsablesLegaux", key: "id_responsable" },
            onDelete: "CASCADE",
        },
        lien: { type: DataTypes.ENUM(...LIENS_FAMILLE), allowNull: false },
        titulaire: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { tableName: "LiensFamille", freezeTableName: true, timestamps: false }
);

export default LienFamille;
