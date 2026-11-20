import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { DEVISE_PAR_DEFAUT, STATUTS_OFFRE_STAGE } from "../../shared/offresStage.js";

/**
 * Offre de stage ou d'alternance (STA-01, espace Carrière) : l'école publie une offre pour une
 * filière (ou pour toutes, administration seule), l'étudiant la consulte et partage le lien.
 *
 * Le statut mène la vie de l'offre : brouillon (invisible pour un étudiant), publiée (lisible par
 * tous, lien public), close (retirée, le lien public répond 404). Le jeton de partage est un secret
 * de 128 bits posé à la première publication, jamais l'identifiant numérique.
 */
const OffreStage = sequelize.define(
    "OffreStage",
    {
        id_offre_stage: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        titre: { type: DataTypes.STRING(150), allowNull: false },
        entreprise: { type: DataTypes.STRING(150), allowNull: false },
        ville: { type: DataTypes.STRING(100), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        id_filiere: { type: DataTypes.INTEGER, allowNull: true },
        niveau: { type: DataTypes.STRING(50), allowNull: true },
        debut: { type: DataTypes.DATEONLY, allowNull: true },
        fin: { type: DataTypes.DATEONLY, allowNull: true },
        // Le prix affiché : montant mensuel brut, tel qu'il est saisi, jamais recalculé
        gratification: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        devise: { type: DataTypes.CHAR(3), allowNull: false, defaultValue: DEVISE_PAR_DEFAUT },
        lien_candidature: { type: DataTypes.STRING(500), allowNull: true },
        contact_email: { type: DataTypes.STRING(190), allowNull: true },
        statut: { type: DataTypes.ENUM(...STATUTS_OFFRE_STAGE), allowNull: false, defaultValue: "brouillon" },
        jeton_partage: { type: DataTypes.CHAR(32), allowNull: true, unique: true },
        publiee_le: { type: DataTypes.DATE, allowNull: true },
        id_user_auteur: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "OffresStage", freezeTableName: true }
);

export default OffreStage;
