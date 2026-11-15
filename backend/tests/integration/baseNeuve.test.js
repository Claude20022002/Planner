import { jest } from "@jest/globals";
import { Sequelize } from "sequelize";
import sequelize from "../../config/db.js";
import { resetDatabase, closeDatabase } from "./helpers/testApp.js";
import { migrateurPour } from "../../migrations/migrator.js";
import { installerEcolePilote } from "../../demo/ecolePilote.js";
import { identite, identitePublique, oublierIdentite } from "../../services/etablissement/identite.js";

/**
 * PLA-03 : une base neuve ne contient rien de l'école d'origine. Les migrations 0003 (campus) et
 * 0055 (identité) ne lui donnent ses données que si la base a déjà des comptes, comme la 0057.
 * La base d'origine est rejouée ici sur une seconde base : migrations jusqu'à 0002, des lignes
 * comme l'ancien serveur en créait, puis le reste des migrations.
 */

const BASE_REPRISE = "hestim_reprise_test";
const AVANT_LES_CAMPUS = "0002-remove-multitenant.js";
const NEUTRE = { nom: "Planner", nom_court: "Planner", couleur_principale: "#1D4ED8", couleur_accent: "#0E7490", modele_edt: "planner" };

jest.setTimeout(180000);

let reprise;

const lignes = async (connexion, sql) => (await connexion.query(sql))[0];

/** Noms des tables qui ont au moins une ligne. */
const tablesRemplies = async (connexion) => {
    const tables = await lignes(connexion, "SELECT TABLE_NAME AS nom FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()");
    const remplies = [];
    for (const { nom } of tables) {
        const [{ n }] = await lignes(connexion, `SELECT COUNT(*) AS n FROM \`${nom}\``);
        if (Number(n)) remplies.push(nom);
    }
    return remplies.sort();
};

/** Une base au schéma d'avant la migration 0003, remplie par `remplir`, puis migrée jusqu'au bout. */
const baseAncienne = async (remplir) => {
    if (reprise) await reprise.close();
    await sequelize.query(`DROP DATABASE IF EXISTS \`${BASE_REPRISE}\``);
    await sequelize.query(`CREATE DATABASE \`${BASE_REPRISE}\``);
    const { username, password } = sequelize.config;
    reprise = new Sequelize(BASE_REPRISE, username, password, { ...sequelize.options, logging: false });
    await migrateurPour(reprise).up({ to: AVANT_LES_CAMPUS });
    await remplir(reprise);
    await migrateurPour(reprise).up();
    return reprise;
};

const salle = (connexion, nom, batiment) =>
    connexion.query("INSERT INTO Salles (nom_salle, type_salle, capacite, batiment, createdAt, updatedAt) VALUES (?, 'Salle de cours', 30, ?, NOW(), NOW())", { replacements: [nom, batiment] });

const compte = (connexion) =>
    connexion.query("INSERT INTO Users (nom, prenom, email, role, password_hash, createdAt, updatedAt) VALUES ('Nom', 'Prenom', 'admin@ecole.test', 'admin', 'x', NOW(), NOW())");

const campus = (connexion) => lignes(connexion, "SELECT code, nom FROM Campus ORDER BY code");

afterAll(async () => {
    if (reprise) await reprise.close();
    await sequelize.query(`DROP DATABASE IF EXISTS \`${BASE_REPRISE}\``);
    await closeDatabase();
});

describe("Base neuve (aucun compte)", () => {
    beforeAll(() => resetDatabase({ neuve: true }));

    test("seuls l'historique des migrations et la ligne d'identité ont des lignes", async () => {
        expect(await tablesRemplies(sequelize)).toEqual(["ConfigurationEtablissement", "SequelizeMeta"]);
    });

    test("aucun campus, aucun trajet, aucune salle", async () => {
        for (const table of ["Campus", "TrajetsCampus", "Salles"]) {
            const [{ n }] = await lignes(sequelize, `SELECT COUNT(*) AS n FROM ${table}`);
            expect(Number(n)).toBe(0);
        }
    });

    test("l'identité est neutre, sans logo, et ClassQuiz est éteint", async () => {
        const [identite] = await lignes(sequelize, "SELECT * FROM ConfigurationEtablissement");
        expect(identite).toMatchObject({ id: 1, ...NEUTRE, logo: null, logo_type: null, logo_maj_le: null, expediteur_nom: null, adresse_reponse: null });
        expect(Number(identite.classquiz_actif)).toBe(0);
    });
});

describe("Jeu de démonstration sur une base neuve", () => {
    beforeAll(() => resetDatabase({ neuve: true }));

    test("il apporte ses deux campus et son identité, et se relance sans rien doubler", async () => {
        await installerEcolePilote();
        await installerEcolePilote();
        expect(await campus(sequelize)).toEqual([
            { code: "G", nom: "Gandhi" },
            { code: "ST", nom: "Stendhal" },
        ]);
        expect(await identite()).toMatchObject({ nom_court: "HESTIM", modele_edt: "hestim", couleur_principale: "#001861" });
        expect((await identitePublique()).logo.version).toEqual(expect.any(Number));
    });

    test("il ne remplace pas une identité que l'école a déjà réglée", async () => {
        await sequelize.query("UPDATE ConfigurationEtablissement SET nom = 'École Alpha', nom_court = 'ALPHA' WHERE id = 1");
        oublierIdentite();
        await installerEcolePilote();
        expect((await identite()).nom_court).toBe("ALPHA");
    });
});

describe("Base d'origine (des comptes avant la migration 0003)", () => {
    let base;
    beforeAll(async () => {
        base = await baseAncienne(async (connexion) => {
            await compte(connexion);
            await salle(connexion, "S01", "Gandhi");
            await salle(connexion, "S02", "Stendhal");
            await salle(connexion, "S03", "Bloc C");
        });
    });

    test("garde ses deux campus, et en reçoit un pour chaque autre bâtiment", async () => {
        expect(await campus(base)).toEqual([
            { code: "BLOCC", nom: "Bloc C" },
            { code: "G", nom: "Gandhi" },
            { code: "ST", nom: "Stendhal" },
        ]);
    });

    test("chaque salle est rattachée au campus de son ancien bâtiment", async () => {
        const salles = await lignes(base, "SELECT s.nom_salle, c.code FROM Salles s JOIN Campus c ON c.id_campus = s.id_campus ORDER BY s.nom_salle");
        expect(salles).toEqual([
            { nom_salle: "S01", code: "G" },
            { nom_salle: "S02", code: "ST" },
            { nom_salle: "S03", code: "BLOCC" },
        ]);
    });

    test("garde son identité, son logo et ClassQuiz", async () => {
        const [identite] = await lignes(base, "SELECT nom_court, couleur_principale, modele_edt, logo_type, classquiz_actif, logo IS NOT NULL AS a_un_logo FROM ConfigurationEtablissement");
        expect(identite).toMatchObject({ nom_court: "HESTIM", couleur_principale: "#001861", modele_edt: "hestim", logo_type: "image/png" });
        expect(Number(identite.a_un_logo)).toBe(1);
        expect(Number(identite.classquiz_actif)).toBe(1);
    });
});

describe("Base sans compte qui a déjà des salles", () => {
    test("aucune salle n'est perdue : seul le campus de son bâtiment est créé, avec l'identité neutre", async () => {
        const base = await baseAncienne((connexion) => salle(connexion, "S03", "Bloc C"));
        expect(await campus(base)).toEqual([{ code: "BLOCC", nom: "Bloc C" }]);
        const [{ n }] = await lignes(base, "SELECT COUNT(*) AS n FROM Salles s JOIN Campus c ON c.id_campus = s.id_campus");
        expect(Number(n)).toBe(1);
        const [identite] = await lignes(base, "SELECT nom, nom_court, couleur_principale, couleur_accent, modele_edt FROM ConfigurationEtablissement");
        expect(identite).toEqual(NEUTRE);
    });
});
