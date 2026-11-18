// Essai PostgreSQL (Q-30), critères 4 et 5.
// 4 : une migration de trois instructions échoue à la deuxième ; que reste-t-il dans la base ?
// 5 : contrainte d'exclusion partielle (PostgreSQL) contre deux séances actives non forcées dans la
//     même salle sur des plages qui se chevauchent, toutes grilles confondues ; le forçage passe.
// Lancement : node scripts/essais/postgresql/migrationEtExclusion.mjs
// Jamais fusionné : banc jetable de la branche etude/essai-postgresql. Aucune donnée réelle.
import { createRequire } from "node:module";

const require = createRequire(new URL("../../../backend/package.json", import.meta.url));
const { Sequelize, DataTypes } = require("sequelize");

const cnx = (dialect, port, username, base) =>
    new Sequelize(base, username, "test_root", { host: "127.0.0.1", port, dialect, logging: false });

const essai = async (fn) => {
    try {
        await fn();
        return "accepté";
    } catch (e) {
        return `refusé (${String(e.parent?.message ?? e.message).slice(0, 70)})`;
    }
};

// ---------- Critère 4 : migration interrompue ----------
/** La « migration » : ajoute une colonne, en ajoute une seconde de même nom (échec), puis un index. */
const migration = async (qi, transaction) => {
    await qi.addColumn("seances_essai", "salle_secours", { type: DataTypes.INTEGER, allowNull: true }, { transaction });
    await qi.addColumn("seances_essai", "salle_secours", { type: DataTypes.INTEGER, allowNull: true }, { transaction });
    await qi.addIndex("seances_essai", ["salle_secours"], { transaction });
};

const critere4 = async (db, nom) => {
    await db.query("DROP TABLE IF EXISTS seances_essai");
    await db.query("CREATE TABLE seances_essai (id INTEGER PRIMARY KEY, titre VARCHAR(50))");
    const qi = db.getQueryInterface();
    let erreur = null;
    try {
        await db.transaction((transaction) => migration(qi, transaction));
    } catch (e) {
        erreur = String(e.parent?.message ?? e.message).slice(0, 70);
    }
    const colonnes = Object.keys(await qi.describeTable("seances_essai"));
    return { moteur: nom, erreur, colonnes_apres_echec: colonnes, base_intacte: !colonnes.includes("salle_secours") };
};

// ---------- Critère 5 : exclusion partielle ----------
const critere5 = async (pg) => {
    await pg.query("CREATE EXTENSION IF NOT EXISTS btree_gist");
    await pg.query("DROP TABLE IF EXISTS seances_excl");
    // Plage horaire et indicateur « forcée » portés par la séance : aujourd'hui, l'heure est dans
    // Creneau et le forçage dans HistoriqueAffectation ; la contrainte demanderait les deux sur la séance.
    await pg.query(`CREATE TABLE seances_excl (
        id SERIAL PRIMARY KEY, id_salle INTEGER NOT NULL, plage TSRANGE NOT NULL,
        statut VARCHAR(20) NOT NULL, forcee BOOLEAN NOT NULL DEFAULT FALSE,
        EXCLUDE USING gist (id_salle WITH =, plage WITH &&)
            WHERE (statut IN ('planifie', 'confirme') AND NOT forcee))`);
    const ins = (salle, debut, fin, statut = "planifie", forcee = false) =>
        pg.query("INSERT INTO seances_excl (id_salle, plage, statut, forcee) VALUES (?, tsrange(?, ?), ?, ?)", {
            replacements: [salle, debut, fin, statut, forcee],
        });
    const r = {};
    r.premiere_seance = await essai(() => ins(1, "2027-01-04 08:30", "2027-01-04 10:00"));
    // Grille d'un autre rythme : 09:00-10:30 chevauche 08:30-10:00 sans partager de créneau
    r.chevauchement_autre_grille = await essai(() => ins(1, "2027-01-04 09:00", "2027-01-04 10:30"));
    r.bout_a_bout = await essai(() => ins(1, "2027-01-04 10:00", "2027-01-04 11:30"));
    r.autre_salle = await essai(() => ins(2, "2027-01-04 09:00", "2027-01-04 10:30"));
    r.chevauchement_force = await essai(() => ins(1, "2027-01-04 09:15", "2027-01-04 09:45", "planifie", true));
    r.chevauchement_annulee = await essai(() => ins(1, "2027-01-04 09:15", "2027-01-04 09:45", "annule"));
    // Deux transactions simultanées qui visent la même plage : la base n'en laisse passer qu'une
    const course = await Promise.allSettled([
        pg.transaction((t) => pg.query("INSERT INTO seances_excl (id_salle, plage, statut) VALUES (3, tsrange('2027-01-05 08:30', '2027-01-05 10:00'), 'planifie')", { transaction: t })),
        pg.transaction((t) => pg.query("INSERT INTO seances_excl (id_salle, plage, statut) VALUES (3, tsrange('2027-01-05 09:00', '2027-01-05 10:30'), 'planifie')", { transaction: t })),
    ]);
    r.deux_transactions_simultanees = course.map((c) => c.status === "fulfilled" ? "acceptée" : "refusée").join(", ");
    return r;
};

const my = cnx("mysql", 3307, "root", "");
await my.query("CREATE DATABASE IF NOT EXISTS essai_migration");
await my.close();
const myDb = cnx("mysql", 3307, "root", "essai_migration");
const pgAdmin = cnx("postgres", 5433, "postgres", "postgres");
await pgAdmin.query("DROP DATABASE IF EXISTS essai_migration");
await pgAdmin.query("CREATE DATABASE essai_migration");
await pgAdmin.close();
const pgDb = cnx("postgres", 5433, "postgres", "essai_migration");

console.log(JSON.stringify({
    critere4: [await critere4(myDb, "mysql 8.4"), await critere4(pgDb, "postgres 18")],
    critere5_postgres: await critere5(pgDb),
}, null, 2));
await myDb.close();
await pgDb.close();
