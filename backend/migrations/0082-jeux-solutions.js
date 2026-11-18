/** Persist simulation attempts and solution viewing without changing existing successes. */
export const up = async ({ queryInterface }) => {
    const { DataTypes } = await import('sequelize');
    await queryInterface.createTable('JeuxEtatsDefis', {
        id_jeu_etat_defi: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        id_user: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id_user' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        code_jeu: { type: DataTypes.STRING(40), allowNull: false },
        id_defi: { type: DataTypes.STRING(60), allowNull: false },
        echecs: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        solution_vue_le: { type: DataTypes.DATE, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
    await queryInterface.addIndex('JeuxEtatsDefis', ['id_user', 'code_jeu', 'id_defi'], { unique: true, name: 'jeux_etats_joueur_defi' });
    await queryInterface.addColumn('JeuxProgressions', 'avec_solution', { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false });
};

/** Revert only the additive schema introduced here. */
export const down = async ({ queryInterface }) => {
    await queryInterface.removeColumn('JeuxProgressions', 'avec_solution');
    await queryInterface.dropTable('JeuxEtatsDefis');
};
