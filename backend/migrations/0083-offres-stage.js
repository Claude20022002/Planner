/**
 * Offres de stage (STA-01, espace Carrière) : l'école publie, l'étudiant consulte.
 *  - une offre appartient à une filière (facultative pour l'administration), à un niveau et à des
 *    dates de stage facultatifs ;
 *  - le prix (gratification) est un montant mensuel brut en dirhams ou dans la devise de l'offre,
 *    affiché tel quel — Planner n'est pas comptable de l'école ici ;
 *  - le statut mène la vie de l'offre (brouillon, publiée, close) et le jeton de partage (32
 *    caractères hexadécimaux) ouvre la fiche publique, sans compte.
 */
export const up = async ({ queryInterface }) => {
    const { DataTypes } = await import("sequelize");

    await queryInterface.createTable("OffresStage", {
        id_offre_stage: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        titre: { type: DataTypes.STRING(150), allowNull: false },
        entreprise: { type: DataTypes.STRING(150), allowNull: false },
        ville: { type: DataTypes.STRING(100), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        // Une filière supprimée laisse l'offre : elle reste lisible, sans filière
        id_filiere: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "Filiere", key: "id_filiere" },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        },
        niveau: { type: DataTypes.STRING(50), allowNull: true },
        debut: { type: DataTypes.DATEONLY, allowNull: true },
        fin: { type: DataTypes.DATEONLY, allowNull: true },
        gratification: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        devise: { type: DataTypes.CHAR(3), allowNull: false, defaultValue: "MAD" },
        lien_candidature: { type: DataTypes.STRING(500), allowNull: true },
        contact_email: { type: DataTypes.STRING(190), allowNull: true },
        statut: { type: DataTypes.ENUM("brouillon", "publiee", "close"), allowNull: false, defaultValue: "brouillon" },
        jeton_partage: { type: DataTypes.CHAR(32), allowNull: true },
        publiee_le: { type: DataTypes.DATE, allowNull: true },
        id_user_auteur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Users", key: "id_user" },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
    });

    await queryInterface.addIndex("OffresStage", ["statut"]);
    await queryInterface.addIndex("OffresStage", ["id_filiere", "niveau"]);
    await queryInterface.addIndex("OffresStage", ["jeton_partage"], { unique: true, name: "offres_stage_jeton_partage" });
};

export const down = async ({ queryInterface }) => {
    await queryInterface.dropTable("OffresStage");
};
