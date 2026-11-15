import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

/**
 * Contrainte déclarée par l'école dans une version de paramètres (MOT-13). Une ligne de retrait n'a
 * pas de modèle : elle dit seulement quelle contrainte elle retire (retire_id).
 */
const ContrainteDeclaree = sequelize.define(
    "ContrainteDeclaree",
    {
        id_contrainte: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_version: { type: DataTypes.INTEGER, allowNull: false },
        gabarit: { type: DataTypes.STRING(40), allowNull: true },
        cibles: { type: DataTypes.JSON, allowNull: true },
        parametres: { type: DataTypes.JSON, allowNull: true },
        nature: { type: DataTypes.ENUM("impossible", "souhait"), allowNull: true },
        insistance: { type: DataTypes.ENUM("peu", "normal", "beaucoup", "indispensable"), allowNull: true },
        retire_id: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
        tableName: "ContraintesDeclarees",
        freezeTableName: true,
        timestamps: false,
    }
);

export default ContrainteDeclaree;
