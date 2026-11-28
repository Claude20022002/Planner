/**
 * Élèves et familles (VSC-02, migrations 0062) : la personne, son rôle de responsable légal et le
 * lien de famille.
 *
 * La personne porte l'état civil et un compte **facultatif** (`id_user`) : un élève de primaire et
 * un parent sans adresse existent dans le dossier sans pouvoir se connecter (Q-20, Q-14). Le lien
 * de famille dit quel lien et qui est titulaire ; l'unicité du titulaire est tenue par le service,
 * MySQL n'ayant pas d'index partiel.
 *
 * Aucune donnée reprise : les élèves d'aujourd'hui restent dans `Users` et `Etudiants` tant que la
 * migration 0065 ne les relie pas. Cette migration ne touche aucune table existante.
 */

export const up = async ({ queryInterface }) => {
    const { DataTypes } = await import("sequelize");

    await queryInterface.createTable("Personnes", {
        id_personne: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nom: { type: DataTypes.STRING(100), allowNull: false },
        prenom: { type: DataTypes.STRING(100), allowNull: false },
        date_naissance: { type: DataTypes.DATEONLY, allowNull: true },
        sexe: { type: DataTypes.ENUM("F", "M", "autre"), allowNull: true },
        lieu_naissance: { type: DataTypes.STRING(120), allowNull: true },
        telephone: { type: DataTypes.STRING(30), allowNull: true },
        email_contact: { type: DataTypes.STRING(190), allowNull: true },
        cne: { type: DataTypes.STRING(20), allowNull: true, unique: true },
        // « SET NULL » : supprimer un compte ne supprime pas la personne du dossier
        id_user: { type: DataTypes.INTEGER, allowNull: true, unique: true, references: { model: "Users", key: "id_user" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
    await queryInterface.addIndex("Personnes", ["nom", "prenom"], { name: "personnes_nom_prenom" });

    await queryInterface.createTable("ResponsablesLegaux", {
        id_responsable: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_personne: { type: DataTypes.INTEGER, allowNull: false, unique: true, references: { model: "Personnes", key: "id_personne" }, onDelete: "CASCADE", onUpdate: "CASCADE" },
        profession: { type: DataTypes.STRING(120), allowNull: true },
        id_user: { type: DataTypes.INTEGER, allowNull: true, unique: true, references: { model: "Users", key: "id_user" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
    });

    await queryInterface.createTable("LiensFamille", {
        id_personne: { type: DataTypes.INTEGER, primaryKey: true, references: { model: "Personnes", key: "id_personne" }, onDelete: "CASCADE", onUpdate: "CASCADE" },
        id_responsable: { type: DataTypes.INTEGER, primaryKey: true, references: { model: "ResponsablesLegaux", key: "id_responsable" }, onDelete: "CASCADE", onUpdate: "CASCADE" },
        lien: { type: DataTypes.ENUM("pere", "mere", "tuteur", "autre"), allowNull: false },
        titulaire: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    });
    // Lecture par responsable : « mes enfants »
    await queryInterface.addIndex("LiensFamille", ["id_responsable"], { name: "liens_famille_responsable" });
};

export const down = async ({ queryInterface }) => {
    await queryInterface.dropTable("LiensFamille");
    await queryInterface.dropTable("ResponsablesLegaux");
    await queryInterface.dropTable("Personnes");
};
