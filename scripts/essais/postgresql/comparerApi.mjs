// Essai PostgreSQL (Q-30), critère 9 (suite) : l'application rend-elle les mêmes réponses sur l'école
// fictive convertie ? Interroge des routes en lecture avec le compte d'administration fictif du jeu de
// démonstration (seed.js), et écrit les réponses dans un fichier JSON par moteur, à comparer ensuite.
// Lancement : node scripts/essais/postgresql/comparerApi.mjs mysql|postgres <fichier de sortie>
//             node scripts/essais/postgresql/comparerApi.mjs comparer <fichier mysql> <fichier postgres>
// Jamais fusionné : banc jetable de la branche etude/essai-postgresql. Aucune donnée réelle.
import fs from "node:fs";
import { createRequire } from "node:module";

const ROUTES = [
    "/api/campus", "/api/filieres", "/api/groupes", "/api/salles", "/api/cours", "/api/composantes",
    "/api/enseignants", "/api/etudiants", "/api/users", "/api/creneaux", "/api/enseignements",
    "/api/evenements", "/api/parametres-planning", "/api/moteur/valeurs", "/api/statistiques/dashboard",
];

/** Trie les clés et les listes pour comparer sans dépendre de l'ordre de lecture. */
const normaliser = (v) => {
    if (Array.isArray(v)) return v.map(normaliser).map((x) => JSON.stringify(x)).sort().map((x) => JSON.parse(x));
    if (v && typeof v === "object") return Object.fromEntries(Object.keys(v).sort().map((k) => [k, normaliser(v[k])]));
    return v;
};

/** Premier chemin où deux valeurs diffèrent. */
const ecart = (a, b, chemin = "") => {
    if (JSON.stringify(a) === JSON.stringify(b)) return null;
    if (a && b && typeof a === "object" && typeof b === "object") {
        for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
            const e = ecart(a[k], b[k], `${chemin}/${k}`);
            if (e) return e;
        }
    }
    return { chemin, mysql: JSON.stringify(a)?.slice(0, 80), postgres: JSON.stringify(b)?.slice(0, 80) };
};

const [mode, sortie, autre] = process.argv.slice(2);
if (mode === "comparer") {
    const a = JSON.parse(fs.readFileSync(sortie, "utf8"));
    const b = JSON.parse(fs.readFileSync(autre, "utf8"));
    const lignes = ROUTES.map((r) => {
        const e = ecart(a[r], b[r]);
        return { route: r, statut: `${a[r]?.statut} / ${b[r]?.statut}`, identique: !e, premier_ecart: e };
    });
    console.log(JSON.stringify(lignes, null, 2));
    process.exit(0);
}

const moteurs = {
    mysql: { DB_DIALECT: "mysql", DB_PORT: "3307", DB_USER: "root" },
    postgres: { DB_DIALECT: "postgres", DB_PORT: "5433", DB_USER: "postgres" },
};
Object.assign(process.env, moteurs[mode], { DB_HOST: "127.0.0.1", DB_PASSWORD: "test_root", DB_NAME: "essai_ecole" });
await import(new URL("../../../backend/tests/integration/setupEnv.js", import.meta.url));
// La garde des tests refuse toute base dont le nom ne finit pas par _test : ici, aucune remise à zéro
const require = createRequire(new URL("../../../backend/package.json", import.meta.url));
const request = require("supertest");
const { default: app } = await import(new URL("../../../backend/app.js", import.meta.url));
const { default: sequelize } = await import(new URL("../../../backend/config/db.js", import.meta.url));

const agent = request.agent(app);
const connexion = await agent.post("/api/auth/login").send({ email: "admin@hestim.ma", password: "password123" });
if (connexion.status !== 200) throw new Error(`Connexion impossible : ${connexion.status}`);
const resultats = {};
for (const route of ROUTES) {
    const r = await agent.get(route);
    resultats[route] = { statut: r.status, corps: normaliser(r.body) };
}
fs.writeFileSync(sortie, JSON.stringify(resultats));
console.log(`${mode} : ${ROUTES.length} routes lues, statuts ${[...new Set(Object.values(resultats).map((x) => x.statut))].join(", ")}`);
await sequelize.close();
process.exit(0);
