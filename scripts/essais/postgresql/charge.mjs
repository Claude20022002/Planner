// Essai PostgreSQL (Q-30), critère 7 : charge de lecture sur 10 écoles, pour relever la mémoire.
// Chaque école a son pool de 5 connexions (défaut de Sequelize, une instance par école comme D-03).
// Rythme : 33 lectures par seconde au total pendant la durée donnée (repris de PLA-06, P-17).
// Lancement : node scripts/essais/postgresql/charge.mjs mysql|postgres <port> <durée en s>
// Jamais fusionné : banc jetable de la branche etude/essai-postgresql. Aucune donnée réelle.
import { createRequire } from "node:module";
import { performance } from "node:perf_hooks";

const require = createRequire(new URL("../../../backend/package.json", import.meta.url));
const { Sequelize } = require("sequelize");

const [moteur, port, duree] = [process.argv[2], Number(process.argv[3]), Number(process.argv[4] ?? 120)];
const pg = moteur === "postgres";
const q = (n) => (pg ? `"${n}"` : `\`${n}\``);
const ECOLES = Array.from({ length: 10 }, (_, i) => `ecole_${String(i + 1).padStart(2, "0")}`);

/** Lectures typiques : élèves d'un groupe avec leur filière, liste des groupes, enseignants, salles. */
const REQUETES = [
    `SELECT u.${q("nom")}, u.${q("prenom")}, e.${q("numero_etudiant")}, g.${q("nom_groupe")}, f.${q("nom_filiere")}
       FROM ${q("Appartenir")} a JOIN ${q("Users")} u ON u.${q("id_user")} = a.${q("id_user_etudiant")}
       JOIN ${q("Etudiants")} e ON e.${q("id_user")} = u.${q("id_user")}
       JOIN ${q("Groupes")} g ON g.${q("id_groupe")} = a.${q("id_groupe")}
       JOIN ${q("Filiere")} f ON f.${q("id_filiere")} = g.${q("id_filiere")}
      WHERE g.${q("id_groupe")} = ?`,
    `SELECT g.*, (SELECT COUNT(*) FROM ${q("Appartenir")} a WHERE a.${q("id_groupe")} = g.${q("id_groupe")}) AS effectif FROM ${q("Groupes")} g`,
    `SELECT u.${q("id_user")}, u.${q("nom")}, en.* FROM ${q("Users")} u JOIN ${q("Enseignants")} en ON en.${q("id_user")} = u.${q("id_user")} ORDER BY u.${q("nom")}`,
    `SELECT s.*, c.${q("nom")} AS campus FROM ${q("Salles")} s LEFT JOIN ${q("Campus")} c ON c.${q("id_campus")} = s.${q("id_campus")}`,
];

const pools = ECOLES.map((b) => new Sequelize(b, pg ? "postgres" : "root", "test_root", {
    host: "127.0.0.1", port, dialect: moteur, logging: false, pool: { max: 5 },
}));
const groupes = await Promise.all(pools.map(async (p) => (await p.query(`SELECT ${q("id_groupe")} AS id FROM ${q("Groupes")}`))[0].map((r) => r.id)));

const durees = [];
let erreurs = 0;
const fin = Date.now() + duree * 1000;
let n = 0;
while (Date.now() < fin) {
    const i = n % ECOLES.length;
    const sql = REQUETES[n % REQUETES.length];
    const g = groupes[i][n % groupes[i].length];
    const debut = performance.now();
    pools[i].query(sql, { replacements: [g] })
        .then(() => durees.push(performance.now() - debut))
        .catch(() => { erreurs += 1; });
    n += 1;
    await new Promise((r) => setTimeout(r, 30)); // environ 33 lectures par seconde
}
await new Promise((r) => setTimeout(r, 2000));
durees.sort((a, b) => a - b);
console.log(JSON.stringify({ moteur, lectures: durees.length, erreurs, p95_ms: +durees[Math.floor(durees.length * 0.95)].toFixed(1) }));
await Promise.all(pools.map((p) => p.close()));
