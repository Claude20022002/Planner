/**
 * Bibliothèque reconstruite dans Planner (BIB-05, docs/conception/bibliotheque/bib-05-modele-stockage.md, § 8).
 * Trois tables neuves, rien d'autre ne change :
 *  - DocumentsBibliotheque : un document, son `uid` stable (D-15, l'UUID de StudyLib à la reprise),
 *    son cours, son statut de modération, sa portée (école ou classe) et la clé de son fichier dans
 *    le seau, sous le préfixe de l'école (le fichier lui-même est dans MinIO, jamais en base) ;
 *  - NotesDocuments : une note de 1 à 5 par compte et par document ;
 *  - TelechargementsDocuments : qui a téléchargé quoi et quand, sans IP ni navigateur (réponse 9).
 * Pas de clé étrangère depuis SupportsCours.id_document : ses valeurs désignent des documents de
 * StudyLib qui n'arrivent qu'avec la reprise (BIB-08).
 * Retour arrière : les trois tables sont retirées.
 */
export const up = async ({ queryInterface }) => {
    const { DataTypes } = await import("sequelize");
    const lien = (model, key, onDelete) => ({ references: { model, key }, onDelete, onUpdate: "CASCADE" });
    const dates = { createdAt: { type: DataTypes.DATE, allowNull: false }, updatedAt: { type: DataTypes.DATE, allowNull: false } };

    await queryInterface.createTable("DocumentsBibliotheque", {
        id_document: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        uid: { type: DataTypes.CHAR(36), allowNull: false, unique: true },
        id_cours: { type: DataTypes.INTEGER, allowNull: false, ...lien("Cours", "id_cours", "RESTRICT") },
        id_user_auteur: { type: DataTypes.INTEGER, allowNull: true, ...lien("Users", "id_user", "SET NULL") },
        type: { type: DataTypes.STRING(10), allowNull: false },
        titre: { type: DataTypes.STRING(200), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        annee_concernee: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: true },
        statut: { type: DataTypes.STRING(12), allowNull: false, defaultValue: "en_attente" },
        portee: { type: DataTypes.STRING(8), allowNull: false, defaultValue: "ecole" },
        cle_fichier: { type: DataTypes.STRING(500), allowNull: false },
        nom_fichier: { type: DataTypes.STRING(200), allowNull: false },
        type_mime: { type: DataTypes.STRING(120), allowNull: false },
        taille: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        empreinte_sha256: { type: DataTypes.CHAR(64), allowNull: false },
        origine: { type: DataTypes.STRING(191), allowNull: true, unique: true },
        telechargements: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        nombre_notes: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        note_moyenne: { type: DataTypes.DECIMAL(2, 1), allowNull: false, defaultValue: 0 },
        id_user_moderateur: { type: DataTypes.INTEGER, allowNull: true, ...lien("Users", "id_user", "SET NULL") },
        modere_le: { type: DataTypes.DATE, allowNull: true },
        motif_refus: { type: DataTypes.STRING(500), allowNull: true },
        ...dates,
    });
    await queryInterface.addIndex("DocumentsBibliotheque", ["id_cours", "type"], { name: "documents_bibliotheque_cours_type" });
    await queryInterface.addIndex("DocumentsBibliotheque", ["statut", "portee"], { name: "documents_bibliotheque_statut_portee" });
    await queryInterface.addIndex("DocumentsBibliotheque", ["id_user_auteur"], { name: "documents_bibliotheque_auteur" });

    await queryInterface.createTable("NotesDocuments", {
        id_note: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        id_document: { type: DataTypes.INTEGER, allowNull: false, ...lien("DocumentsBibliotheque", "id_document", "CASCADE") },
        id_user: { type: DataTypes.INTEGER, allowNull: false, ...lien("Users", "id_user", "CASCADE") },
        note: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
        ...dates,
    });
    await queryInterface.addIndex("NotesDocuments", ["id_user", "id_document"], { unique: true, name: "notes_documents_compte_document" });
    await queryInterface.addIndex("NotesDocuments", ["id_document"], { name: "notes_documents_document" });

    await queryInterface.createTable("TelechargementsDocuments", {
        id_telechargement: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        id_document: { type: DataTypes.INTEGER, allowNull: false, ...lien("DocumentsBibliotheque", "id_document", "CASCADE") },
        id_user: { type: DataTypes.INTEGER, allowNull: true, ...lien("Users", "id_user", "SET NULL") },
        createdAt: { type: DataTypes.DATE, allowNull: false },
    });
    await queryInterface.addIndex("TelechargementsDocuments", ["id_document"], { name: "telechargements_documents_document" });
    await queryInterface.addIndex("TelechargementsDocuments", ["createdAt"], { name: "telechargements_documents_date" });
};

/** Retire les trois tables, dans l'ordre inverse de leurs liens. */
export const down = async ({ queryInterface }) => {
    await queryInterface.dropTable("TelechargementsDocuments");
    await queryInterface.dropTable("NotesDocuments");
    await queryInterface.dropTable("DocumentsBibliotheque");
};
