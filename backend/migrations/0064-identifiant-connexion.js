/**
 * L'identifiant de connexion (VSC-03, décision Q-20) : chaque compte se connecte avec un identifiant
 * donné par l'école ; l'adresse e-mail devient facultative. Aucune adresse n'est inventée.
 *
 * Trois temps, dans cet ordre, pour qu'aucune ligne ne soit perdue :
 *   1. la colonne naît facultative ;
 *   2. la reprise donne à chaque compte son adresse actuelle comme identifiant (valeur réelle, unique
 *      par construction, puisque `email` est déjà unique) ;
 *   3. la colonne devient obligatoire et unique, l'adresse devient facultative (l'index unique de
 *      `email` reste : MySQL accepte plusieurs valeurs nulles).
 *
 * La descente refuse de s'exécuter si un compte n'a plus d'adresse : elle ne fabrique pas d'adresse.
 */

export const up = async ({ queryInterface }) => {
    const { DataTypes } = await import("sequelize");
    await queryInterface.addColumn("Users", "identifiant", {
        type: DataTypes.STRING(255),
        allowNull: true,
    });

    await queryInterface.sequelize.query(
        "UPDATE Users SET identifiant = TRIM(email) WHERE identifiant IS NULL AND email IS NOT NULL"
    );

    const [restants] = await queryInterface.sequelize.query(
        "SELECT COUNT(*) AS total FROM Users WHERE identifiant IS NULL"
    );
    if (Number(restants[0].total) > 0) {
        throw new Error("0064 : des comptes n'ont ni identifiant ni adresse ; la migration s'arrête plutôt que d'en inventer");
    }

    await queryInterface.changeColumn("Users", "identifiant", {
        type: DataTypes.STRING(255),
        allowNull: false,
    });
    await queryInterface.addIndex("Users", ["identifiant"], {
        unique: true,
        name: "users_identifiant_unique",
    });
    await queryInterface.changeColumn("Users", "email", {
        type: DataTypes.STRING(255),
        allowNull: true,
    });

    // Le journal de sécurité garde l'identifiant (Q-6) ; l'adresse ne le remplace plus.
    await queryInterface.addColumn("JournalSecurite", "identifiant", {
        type: DataTypes.STRING(255),
        allowNull: true,
    });
    await queryInterface.sequelize.query(
        "UPDATE JournalSecurite SET identifiant = email WHERE identifiant IS NULL AND email IS NOT NULL"
    );
};

export const down = async ({ queryInterface }) => {
    const { DataTypes } = await import("sequelize");
    const [sansAdresse] = await queryInterface.sequelize.query(
        "SELECT COUNT(*) AS total FROM Users WHERE email IS NULL"
    );
    if (Number(sansAdresse[0].total) > 0) {
        throw new Error(
            "0064 (descente) : des comptes n'ont pas d'adresse ; remettez-leur une adresse avant de retirer l'identifiant"
        );
    }

    await queryInterface.changeColumn("Users", "email", {
        type: DataTypes.STRING(255),
        allowNull: false,
    });
    await queryInterface.removeIndex("Users", "users_identifiant_unique");
    await queryInterface.removeColumn("Users", "identifiant");
    await queryInterface.removeColumn("JournalSecurite", "identifiant");
};
