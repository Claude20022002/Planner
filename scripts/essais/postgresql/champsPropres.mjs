// Essai PostgreSQL (Q-30), critère 3 : champs propres rangés en JSON, même banc sur les deux moteurs.
// 5 000 personnes fictives, 30 champs propres ; mesure du filtre et du tri sur un champ propre, sans
// index (95e centile, seuil 50 ms), et de l'écriture de 1 000 lignes importées validées (seuil 2 s).
// Lancement (depuis la racine du dossier de travail) :
//   node scripts/essais/postgresql/champsPropres.mjs mysql
//   node scripts/essais/postgresql/champsPropres.mjs postgres
// Jamais fusionné : banc jetable de la branche etude/essai-postgresql. Aucune donnée réelle.
import { createRequire } from "node:module";
import { performance } from "node:perf_hooks";

const require = createRequire(new URL("../../../backend/package.json", import.meta.url));
const { Sequelize } = require("sequelize");

const MOTEURS = {
    mysql: { dialect: "mysql", port: 3307, username: "root", base: "essai_champs" },
    postgres: { dialect: "postgres", port: 5433, username: "postgres", base: "essai_champs" },
};
const PERSONNES = 5000;
const CHAMPS = 30;
const REPETITIONS = 200;

/** Définitions déclarées : un type par champ, en tournant sur cinq types saisissables. */
const TYPES = ["texte", "nombre", "date", "booleen", "liste"];
const definitions = Array.from({ length: CHAMPS }, (_, i) => ({
    code: `c${String(i + 1).padStart(2, "0")}`,
    type: TYPES[i % TYPES.length],
    valeurs: ["oui", "non", "en_attente", "a_verifier"],
}));

/** Générateur déterministe : mêmes données sur les deux moteurs. */
let graine = 42;
const hasard = () => ((graine = (graine * 1103515245 + 12345) % 2147483648) / 2147483648);

const valeurPour = (def) => {
    if (def.type === "texte") return `t${Math.floor(hasard() * 500)}`;
    if (def.type === "nombre") return Math.floor(hasard() * 1000);
    if (def.type === "date") return `2026-${String(1 + Math.floor(hasard() * 12)).padStart(2, "0")}-15`;
    if (def.type === "booleen") return hasard() < 0.5;
    return def.valeurs[Math.floor(hasard() * def.valeurs.length)];
};

/** Contrôle d'une ligne contre les définitions, comme le ferait le service à l'import. */
const valider = (champs) => {
    for (const def of definitions) {
        const v = champs[def.code];
        if (v === undefined) continue;
        const ok =
            (def.type === "texte" && typeof v === "string" && v.length <= 200) ||
            (def.type === "nombre" && Number.isFinite(v)) ||
            (def.type === "date" && /^\d{4}-\d{2}-\d{2}$/.test(v)) ||
            (def.type === "booleen" && typeof v === "boolean") ||
            (def.type === "liste" && def.valeurs.includes(v));
        if (!ok) throw new Error(`Champ ${def.code} invalide`);
    }
};

const personne = (i) => ({
    nom: `Nom${i}`,
    prenom: `Prenom${i}`,
    champs: Object.fromEntries(definitions.map((d) => [d.code, valeurPour(d)])),
});

const centile = (valeurs, p) => {
    const tri = [...valeurs].sort((a, b) => a - b);
    return tri[Math.min(tri.length - 1, Math.ceil((p / 100) * tri.length) - 1)];
};

const preparer = async (moteur) => {
    const c = MOTEURS[moteur];
    const admin = new Sequelize(c.dialect === "postgres" ? "postgres" : "", c.username, "test_root", {
        host: "127.0.0.1", port: c.port, dialect: c.dialect, logging: false,
    });
    if (c.dialect === "postgres") {
        await admin.query(`DROP DATABASE IF EXISTS ${c.base}`);
        await admin.query(`CREATE DATABASE ${c.base}`);
    } else {
        await admin.query(`DROP DATABASE IF EXISTS ${c.base}`);
        await admin.query(`CREATE DATABASE ${c.base} CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`);
    }
    await admin.close();
    const db = new Sequelize(c.base, c.username, "test_root", {
        host: "127.0.0.1", port: c.port, dialect: c.dialect, logging: false,
    });
    const typeJson = c.dialect === "postgres" ? "JSONB" : "JSON";
    const id = c.dialect === "postgres" ? "id SERIAL PRIMARY KEY" : "id INT AUTO_INCREMENT PRIMARY KEY";
    await db.query(`CREATE TABLE personnes (${id}, nom VARCHAR(100) NOT NULL, prenom VARCHAR(100) NOT NULL, champs ${typeJson} NOT NULL)`);
    return db;
};

/** Écrit des lignes par paquets de 500, dans une transaction ; rend la durée en ms. */
const inserer = async (db, moteur, lignes) => {
    const debut = performance.now();
    await db.transaction(async (transaction) => {
        for (let i = 0; i < lignes.length; i += 500) {
            const paquet = lignes.slice(i, i + 500);
            const marques = paquet.map(() => (moteur === "postgres" ? "(?, ?, ?::jsonb)" : "(?, ?, ?)")).join(", ");
            const valeurs = paquet.flatMap((l) => [l.nom, l.prenom, JSON.stringify(l.champs)]);
            await db.query(`INSERT INTO personnes (nom, prenom, champs) VALUES ${marques}`, { replacements: valeurs, transaction });
        }
    });
    return performance.now() - debut;
};

/** Filtre sur un champ liste, tri sur un champ nombre, 50 premières lignes. */
const requete = (moteur) =>
    moteur === "postgres"
        ? "SELECT id, nom, prenom FROM personnes WHERE champs->>'c05' = ? ORDER BY (champs->>'c02')::int, id LIMIT 50"
        : "SELECT id, nom, prenom FROM personnes WHERE champs->>'$.c05' = ? ORDER BY CAST(champs->>'$.c02' AS SIGNED), id LIMIT 50";

const mesurer = async (moteur) => {
    graine = 42;
    const db = await preparer(moteur);
    await inserer(db, moteur, Array.from({ length: PERSONNES }, (_, i) => personne(i)));

    const durees = [];
    for (let i = 0; i < REPETITIONS; i++) {
        const debut = performance.now();
        await db.query(requete(moteur), { replacements: [definitions[4].valeurs[i % 4]] });
        durees.push(performance.now() - debut);
    }

    const importees = Array.from({ length: 1000 }, (_, i) => personne(PERSONNES + i));
    const debutImport = performance.now();
    importees.forEach((l) => valider(l.champs));
    const validation = performance.now() - debutImport;
    const ecriture = await inserer(db, moteur, importees);
    await db.close();

    const p95 = centile(durees, 95);
    const total = validation + ecriture;
    console.log(JSON.stringify({
        moteur,
        personnes: PERSONNES,
        champs: CHAMPS,
        filtre_tri_ms: { p50: +centile(durees, 50).toFixed(2), p95: +p95.toFixed(2), seuil: 50, tenu: p95 < 50 },
        import_1000_ms: { validation: +validation.toFixed(1), ecriture: +ecriture.toFixed(1), total: +total.toFixed(1), seuil: 2000, tenu: total < 2000 },
    }));
};

const moteur = process.argv[2];
if (!MOTEURS[moteur]) {
    console.error("Usage : node champsPropres.mjs mysql|postgres");
    process.exit(2);
}
await mesurer(moteur);
