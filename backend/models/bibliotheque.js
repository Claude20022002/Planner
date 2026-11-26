import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

/**
 * Modèles de la Bibliothèque reconstruite (migration 0087, BIB-05 ;
 * docs/conception/bibliotheque/bib-05-modele-stockage.md, § 8). Réunis ici pour ne pas allonger
 * models/definitions.js, qui les réexporte avec leurs relations. Le fichier d'un document est dans
 * MinIO (services/bibliotheque/stockage.js) ; la base n'en garde que la clé, le nom, le type et le poids.
 */

const options = (tableName, extra = {}) => ({ tableName, freezeTableName: true, ...extra });

export const TYPES_DOCUMENT = ["cours", "td", "tp", "examen", "exercice", "article"];
export const STATUTS_DOCUMENT = ["en_attente", "publie", "refuse"];
// « ecole » : dans la Bibliothèque ; « classe » : déposé depuis l'espace de cours, absent de la Bibliothèque
export const PORTEES_DOCUMENT = ["ecole", "classe"];
export const FORME_UID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Un document : son `uid` est le seul identifiant que l'API expose (D-15). */
export const DocumentBibliotheque = sequelize.define(
    "DocumentBibliotheque",
    {
        id_document: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        // Toute version d'UUID : ceux de StudyLib (Laravel) sont gardés tels quels à la reprise
        uid: { type: DataTypes.CHAR(36), allowNull: false, unique: true, validate: { is: FORME_UID } },
        id_cours: { type: DataTypes.INTEGER, allowNull: false },
        id_user_auteur: { type: DataTypes.INTEGER, allowNull: true },
        type: { type: DataTypes.STRING(10), allowNull: false, validate: { isIn: [TYPES_DOCUMENT] } },
        titre: { type: DataTypes.STRING(200), allowNull: false, validate: { notEmpty: true, len: [1, 200] } },
        description: { type: DataTypes.TEXT, allowNull: true },
        annee_concernee: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: true, validate: { min: 2000, max: 2100 } },
        statut: { type: DataTypes.STRING(12), allowNull: false, defaultValue: "en_attente", validate: { isIn: [STATUTS_DOCUMENT] } },
        portee: { type: DataTypes.STRING(8), allowNull: false, defaultValue: "ecole", validate: { isIn: [PORTEES_DOCUMENT] } },
        cle_fichier: { type: DataTypes.STRING(500), allowNull: false },
        nom_fichier: { type: DataTypes.STRING(200), allowNull: false },
        type_mime: { type: DataTypes.STRING(120), allowNull: false },
        taille: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        empreinte_sha256: { type: DataTypes.CHAR(64), allowNull: false, validate: { is: /^[0-9a-f]{64}$/ } },
        // « studylib:<uuid> » (reprise, BIB-08) ou « import:<référence> » (BIB-11) : un import rejoué ne double rien
        origine: { type: DataTypes.STRING(191), allowNull: true, unique: true },
        telechargements: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        nombre_notes: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        note_moyenne: { type: DataTypes.DECIMAL(2, 1), allowNull: false, defaultValue: 0 },
        id_user_moderateur: { type: DataTypes.INTEGER, allowNull: true },
        modere_le: { type: DataTypes.DATE, allowNull: true },
        motif_refus: { type: DataTypes.STRING(500), allowNull: true },
    },
    options("DocumentsBibliotheque")
);

/** La note d'un compte sur un document, de 1 à 5 ; une seule par compte et par document. */
export const NoteDocument = sequelize.define(
    "NoteDocument",
    {
        id_note: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        id_document: { type: DataTypes.INTEGER, allowNull: false },
        id_user: { type: DataTypes.INTEGER, allowNull: false },
        note: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, validate: { isInt: true, min: 1, max: 5 } },
    },
    options("NotesDocuments")
);

/** Un téléchargement : le compte et la date, sans IP ni navigateur (réponse 9 du plan). */
export const TelechargementDocument = sequelize.define(
    "TelechargementDocument",
    {
        id_telechargement: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        id_document: { type: DataTypes.INTEGER, allowNull: false },
        id_user: { type: DataTypes.INTEGER, allowNull: true },
    },
    options("TelechargementsDocuments", { updatedAt: false })
);

/** Relations de la Bibliothèque, appelées par models/definitions.js. */
export const relierBibliotheque = ({ Users, Cours }) => {
    DocumentBibliotheque.belongsTo(Cours, { foreignKey: "id_cours", as: "cours", targetKey: "id_cours" });
    DocumentBibliotheque.belongsTo(Users, { foreignKey: "id_user_auteur", as: "auteur", targetKey: "id_user" });
    DocumentBibliotheque.belongsTo(Users, { foreignKey: "id_user_moderateur", as: "moderateur", targetKey: "id_user" });
    DocumentBibliotheque.hasMany(NoteDocument, { foreignKey: "id_document", as: "notes", onDelete: "CASCADE" });
    DocumentBibliotheque.hasMany(TelechargementDocument, { foreignKey: "id_document", as: "journal", onDelete: "CASCADE" });
    NoteDocument.belongsTo(DocumentBibliotheque, { foreignKey: "id_document", as: "document" });
    NoteDocument.belongsTo(Users, { foreignKey: "id_user", as: "compte", targetKey: "id_user" });
    TelechargementDocument.belongsTo(DocumentBibliotheque, { foreignKey: "id_document", as: "document" });
    TelechargementDocument.belongsTo(Users, { foreignKey: "id_user", as: "compte", targetKey: "id_user" });
};
