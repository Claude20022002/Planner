// Essai PostgreSQL (Q-30), critère 6 : collations. Compare MySQL (utf8mb4_0900_ai_ci, par défaut)
// et PostgreSQL (collation par défaut, puis collation ICU non déterministe) sur ce dont Planner
// dépend : connexion par adresse sans tenir compte de la casse (authController.js, l. 178, cherche
// l'adresse telle quelle), unicité de l'identifiant, recherche d'un nom sans accent, en français et en arabe.
// Lancement : node scripts/essais/postgresql/collations.mjs
// Jamais fusionné : banc jetable de la branche etude/essai-postgresql. Noms fictifs.
import { createRequire } from "node:module";

const require = createRequire(new URL("../../../backend/package.json", import.meta.url));
const { Sequelize } = require("sequelize");

const connexion = (dialect, port, username, base) =>
    new Sequelize(base, username, "test_root", { host: "127.0.0.1", port, dialect, logging: false });

/** Exécute une requête et rend « oui », « non » ou l'erreur courte. */
const essai = async (fn) => {
    try {
        return await fn();
    } catch (e) {
        return `erreur : ${String(e.parent?.message ?? e.message).slice(0, 80)}`;
    }
};

const cas = async (db, table) => {
    await db.query(`INSERT INTO ${table} (identifiant, nom) VALUES ('Ali.Benali@exemple.test', 'Élodie'), ('x', 'مُحَمَّد')`);
    const [connexionCasse] = await db.query(`SELECT COUNT(*) AS n FROM ${table} WHERE identifiant = 'ali.benali@exemple.test'`);
    const unicite = await essai(async () => {
        await db.query(`INSERT INTO ${table} (identifiant, nom) VALUES ('ALI.BENALI@EXEMPLE.TEST', 'Doublon')`);
        return "doublon accepté";
    });
    const accents = await essai(async () => {
        const [r] = await db.query(`SELECT COUNT(*) AS n FROM ${table} WHERE nom = 'elodie'`);
        return Number(r[0].n) ? "trouvé" : "non trouvé";
    });
    const like = await essai(async () => {
        const [r] = await db.query(`SELECT COUNT(*) AS n FROM ${table} WHERE nom LIKE 'elo%'`);
        return Number(r[0].n) ? "trouvé" : "non trouvé";
    });
    const arabe = await essai(async () => {
        const [r] = await db.query(`SELECT COUNT(*) AS n FROM ${table} WHERE nom = 'محمد'`);
        return Number(r[0].n) ? "trouvé (sans voyelles)" : "non trouvé (voyelles comptées)";
    });
    return {
        connexion_sans_casse: Number(connexionCasse[0].n) ? "trouvé" : "non trouvé",
        unicite_sans_casse: unicite.startsWith("erreur") ? "refusé" : unicite,
        nom_sans_accent: accents,
        like_sans_accent: like,
        arabe_sans_voyelles: arabe,
    };
};

const resultats = {};

const my = connexion("mysql", 3307, "root", "");
await my.query("DROP DATABASE IF EXISTS essai_collations");
await my.query("CREATE DATABASE essai_collations CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci");
await my.query("CREATE TABLE essai_collations.t (identifiant VARCHAR(190) UNIQUE, nom VARCHAR(100))");
resultats["mysql utf8mb4_0900_ai_ci"] = await cas(my, "essai_collations.t");
await my.query("CREATE TABLE essai_collations.u (identifiant VARCHAR(190) UNIQUE, nom VARCHAR(100)) COLLATE utf8mb4_unicode_ci");
resultats["mysql utf8mb4_unicode_ci (schéma initial)"] = await cas(my, "essai_collations.u");
await my.close();

const pgAdmin = connexion("postgres", 5433, "postgres", "postgres");
await pgAdmin.query("DROP DATABASE IF EXISTS essai_collations");
await pgAdmin.query("CREATE DATABASE essai_collations");
await pgAdmin.close();
const pg = connexion("postgres", 5433, "postgres", "essai_collations");
await pg.query("CREATE TABLE t (identifiant VARCHAR(190) UNIQUE, nom VARCHAR(100))");
resultats["postgres par défaut"] = await cas(pg, "t");
await pg.query("CREATE COLLATION IF NOT EXISTS sans_casse_accent (provider = icu, locale = 'und-u-ks-level1', deterministic = false)");
await pg.query("CREATE TABLE u (identifiant VARCHAR(190) COLLATE sans_casse_accent UNIQUE, nom VARCHAR(100) COLLATE sans_casse_accent)");
resultats["postgres ICU non déterministe (niveau 1)"] = await cas(pg, "u");
await pg.close();

console.log(JSON.stringify(resultats, null, 2));
