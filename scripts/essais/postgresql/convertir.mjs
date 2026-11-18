// Essai PostgreSQL (Q-30), critère 9 : convertit la base d'une école fictive de MySQL vers PostgreSQL.
// Source : base MySQL `essai_ecole` (migrations + seed.js, données fictives). Cible : base PostgreSQL
// `essai_ecole`, schéma tiré des modèles (plus la table sans modèle et les 12 unicités des migrations).
// Copie table par table, clés étrangères suspendues le temps de la copie, puis remise des séquences
// et comparaison des comptes de lignes.
// Lancement : node scripts/essais/postgresql/convertir.mjs
// Jamais fusionné : banc jetable de la branche etude/essai-postgresql. Aucune donnée réelle.
import { createRequire } from "node:module";
import { performance } from "node:perf_hooks";

Object.assign(process.env, {
    DB_DIALECT: "postgres", DB_HOST: "127.0.0.1", DB_PORT: "5433", DB_USER: "postgres",
    DB_PASSWORD: "test_root", DB_NAME: "essai_ecole",
});
const require = createRequire(new URL("../../../backend/package.json", import.meta.url));
const { Sequelize, QueryTypes } = require("sequelize");

const admin = new Sequelize("postgres", "postgres", "test_root", { host: "127.0.0.1", port: 5433, dialect: "postgres", logging: false });
await admin.query("DROP DATABASE IF EXISTS essai_ecole");
await admin.query("CREATE DATABASE essai_ecole");
await admin.close();

const debut = performance.now();
const { schemaDepuisModeles } = await import(new URL("../../../backend/tests/integration/helpers/schemaPostgres.js", import.meta.url));
const { default: pg } = await import(new URL("../../../backend/config/db.js", import.meta.url));
await schemaDepuisModeles();

const my = new Sequelize("essai_ecole", "root", "test_root", { host: "127.0.0.1", port: 3307, dialect: "mysql", logging: false });
const tables = (await my.query("SELECT TABLE_NAME AS t FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'essai_ecole' AND TABLE_NAME <> 'SequelizeMeta'", { type: QueryTypes.SELECT })).map((r) => r.t);

/** Types des colonnes côté PostgreSQL, pour convertir booléens et JSON venus de MySQL. */
const typesPg = async (table) => {
    const lignes = await pg.query("SELECT column_name AS c, data_type AS t FROM information_schema.columns WHERE table_schema = 'public' AND table_name = ?", { replacements: [table], type: QueryTypes.SELECT });
    return Object.fromEntries(lignes.map((l) => [l.c, l.t]));
};
const convertir = (valeur, type) => {
    if (valeur === null || valeur === undefined) return valeur;
    if (type === "boolean") return Boolean(Number(valeur));
    if (type === "json" || type === "jsonb") return typeof valeur === "string" ? valeur : JSON.stringify(valeur);
    return valeur;
};

const rapport = [];
await pg.transaction(async (transaction) => {
    // Clés étrangères suspendues pour cette transaction : l'ordre des tables n'importe plus
    await pg.query("SET LOCAL session_replication_role = replica", { transaction });
    for (const table of tables) {
        const lignes = await my.query(`SELECT * FROM \`${table}\``, { type: QueryTypes.SELECT });
        const types = await typesPg(table);
        const manquantes = lignes.length ? Object.keys(lignes[0]).filter((c) => !(c in types)) : [];
        const cibles = lignes.map((l) => Object.fromEntries(Object.entries(l).filter(([c]) => c in types).map(([c, v]) => [c, convertir(v, types[c])])));
        for (let i = 0; i < cibles.length; i += 500) {
            await pg.getQueryInterface().bulkInsert(table, cibles.slice(i, i + 500), { transaction });
        }
        rapport.push({ table, lignes: lignes.length, colonnes_sans_cible: manquantes });
    }
});

// Séquences remises après la plus grande clé copiée
const series = await pg.query("SELECT table_name AS t, column_name AS c FROM information_schema.columns WHERE table_schema = 'public' AND column_default LIKE 'nextval%'", { type: QueryTypes.SELECT });
for (const { t, c } of series) {
    await pg.query(`SELECT setval(pg_get_serial_sequence('"${t}"', '${c}'), COALESCE((SELECT MAX("${c}") FROM "${t}"), 0) + 1, false)`);
}
const duree = ((performance.now() - debut) / 1000).toFixed(1);

const ecarts = [];
for (const { table, lignes } of rapport) {
    const [{ n }] = await pg.query(`SELECT COUNT(*) AS n FROM "${table}"`, { type: QueryTypes.SELECT });
    if (Number(n) !== lignes) ecarts.push({ table, mysql: lignes, postgres: Number(n) });
}
const total = rapport.reduce((s, r) => s + r.lignes, 0);
console.log(JSON.stringify({
    tables: rapport.length,
    lignes: total,
    duree_s: Number(duree),
    ecarts_de_comptes: ecarts,
    colonnes_sans_cible: rapport.filter((r) => r.colonnes_sans_cible.length).map((r) => `${r.table}: ${r.colonnes_sans_cible.join(", ")}`),
}, null, 2));
await my.close();
await pg.close();
