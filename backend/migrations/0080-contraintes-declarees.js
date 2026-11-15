/**
 * Contraintes déclarées par l'école (MOT-13, docs/conception/moteur-planification/mot-13-contraintes-declarees.md).
 * Une contrainte vit dans une version de paramètres (lot MP-1) et en suit le cycle : brouillon,
 * appliquée, annulée. Une contrainte appliquée ne change jamais (I-D5) : une version plus récente la
 * retire (ligne avec retire_id, sans modèle) et en ajoute une autre. La table est créée vide, dans
 * une base neuve comme dans une base qui a déjà des données : aucune donnée d'école n'est écrite.
 */

export const up = async ({ queryInterface }) => {
    const { DataTypes } = await import("sequelize");
    await queryInterface.createTable("ContraintesDeclarees", {
        id_contrainte: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_version: { type: DataTypes.INTEGER, allowNull: false, references: { model: "VersionsParametres", key: "id_version" }, onDelete: "CASCADE" },
        // Vide pour une ligne de retrait
        gabarit: { type: DataTypes.STRING(40), allowNull: true },
        cibles: { type: DataTypes.JSON, allowNull: true },
        parametres: { type: DataTypes.JSON, allowNull: true },
        nature: { type: DataTypes.ENUM("impossible", "souhait"), allowNull: true },
        insistance: { type: DataTypes.ENUM("peu", "normal", "beaucoup", "indispensable"), allowNull: true },
        retire_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: "ContraintesDeclarees", key: "id_contrainte" } },
    });
    await queryInterface.addIndex("ContraintesDeclarees", ["id_version"], { name: "contraintes_declarees_version" });
};

export const down = async ({ queryInterface }) => {
    await queryInterface.dropTable("ContraintesDeclarees");
};
