/** One persistent attempt/solution state per player and simulation challenge. */
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const JeuEtatDefi = sequelize.define('JeuEtatDefi', {
    id_jeu_etat_defi: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_user: { type: DataTypes.INTEGER, allowNull: false },
    code_jeu: { type: DataTypes.STRING(40), allowNull: false },
    id_defi: { type: DataTypes.STRING(60), allowNull: false },
    echecs: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    solution_vue_le: { type: DataTypes.DATE, allowNull: true },
}, {
    tableName: 'JeuxEtatsDefis', freezeTableName: true,
    indexes: [{ unique: true, fields: ['id_user', 'code_jeu', 'id_defi'], name: 'jeux_etats_joueur_defi' }],
});

export default JeuEtatDefi;
