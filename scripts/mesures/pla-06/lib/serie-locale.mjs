/**
 * Déroulé de mesure sur le serveur unique : santé, migrations dans le conteneur existant,
 * relevés, charge locale et repos. Le pilote extérieur assure surveillance et arrêt.
 */
import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { requete, attendre } from "./http.mjs";

const BANC = "http://127.0.0.1:5099";
const option = (args, nom, defaut) => args.includes("--" + nom) ? args[args.indexOf("--" + nom) + 1] : defaut;

/** Refuse tout réglage dépassant les limites validées avant de lancer le banc. */
export function optionsSerie(args) {
    const simples = new Set(["--migrations", "--rampe", "--fenetre-confirmee", "--temoin-verifie"]);
    const valeurs = new Set(["--nom", "--reglage", "--mysql-memoire", "--innodb", "--mode", "--taches", "--ecoles-banc", "--repos", "--ecoles", "--utilisateurs", "--intervalle", "--duree", "--chauffe", "--froides"]);
    for (let i = 0; i < args.length; i++) {
        if (simples.has(args[i])) continue;
        if (!valeurs.has(args[i]) || !args[i + 1] || args[i + 1].startsWith("--")) throw new Error("option inconnue ou sans valeur : " + args[i]);
        i++;
    }
    for (const [cle, defaut, minimum, entier] of [["ecoles", 20, 1, true], ["utilisateurs", 50, 1, true], ["intervalle", 30, 0.001, false], ["duree", 600, 1, false], ["chauffe", 120, 0, false], ["froides", 10, 0, true]]) {
        const n = Number(option(args, cle, defaut));
        if (!Number.isFinite(n) || n < minimum || (entier && !Number.isInteger(n))) throw new Error("option de charge invalide : " + cle);
    }
    const reglage = option(args, "reglage", "production");
    const memoire = option(args, "mysql-memoire", "2g");
    const innodb = option(args, "innodb", memoire === "1g" ? "512m" : "1g");
    const mode = option(args, "mode", "a");
    const taches = option(args, "taches", "oui");
    const ecoles = option(args, "ecoles-banc", "200");
    const repos = Number(option(args, "repos", "900"));
    if (!["defaut", "production", "ajuste"].includes(reglage)) throw new Error("--reglage invalide");
    if (!["1g", "2g"].includes(memoire) || !["512m", "1g"].includes(innodb)) throw new Error("paliers mémoire : 1g/512m ou 2g/1g");
    if (memoire === "1g" && innodb !== "512m") throw new Error("tampon trop grand pour le palier 1g");
    if (!["a", "b"].includes(mode) || !["oui", "non"].includes(taches)) throw new Error("mode ou tâches invalide");
    if (!/^\d+$/.test(ecoles) || Number(ecoles) < 2 || Number(ecoles) > 200 || !Number.isFinite(repos) || repos < 0) throw new Error("écoles ou repos invalide");
    return {
        MESURE_REGLAGE: reglage, MESURE_MYSQL_MEMOIRE: memoire, MESURE_INNODB_POOL: innodb.toUpperCase(),
        MESURE_MODE: mode, MESURE_TACHES: taches, MESURE_ECOLES: ecoles,
    };
}

/** Joue une série sans SSH ni SCP, avec contrôles avant chaque phase et attente interruptible. */
export async function mesurerSerie({ args, nom, dossier, executer, lancer, bilan, verifier, echouer, mesurerCpu }) {
    const env = optionsSerie(args);
    bilan.variables = env;
    if (Number(option(args, "ecoles", 20)) > Number(env.MESURE_ECOLES)) throw new Error("plus d'écoles actives que de bases du banc");
    bilan.essai = Number(env.MESURE_ECOLES) < 200 || Number(option(args, "ecoles", 20)) < 20 || Number(option(args, "utilisateurs", 50)) < 50 || Number(option(args, "duree", 600)) < 600 || Number(option(args, "chauffe", 120)) < 120 || Number(option(args, "repos", 900)) < 900;
    await executer(["up", "-d", "--pull", "never", "mysql", "banc"], env);
    const debut = Date.now();
    while (true) {
        verifier();
        const r = await requete(BANC, { chemin: "/banc/sante", lireCorps: true });
        if (r.statut === 200) { bilan.sante = r.corps; break; }
        if (Date.now() - debut > 30 * 60_000) throw new Error("banc indisponible après 30 min");
        await attendre(2000);
    }
    const attendus = { defaut: [151, 4000], production: [60, 400], ajuste: [300, 4000] };
    const [connexions, tables] = attendus[env.MESURE_REGLAGE];
    const mysql = bilan.sante.mysql;
    const tampon = env.MESURE_INNODB_POOL === "512M" ? 512 * 1024 ** 2 : 1024 ** 3;
    if (mysql?.max_connections !== connexions || mysql?.table_open_cache !== tables || mysql?.innodb_buffer_pool_size !== tampon) throw new Error("réglage MySQL réellement appliqué différent de la demande");
    // Exec partage le conteneur Node limité : ne pas créer un second conteneur de 1 Gio.
    if (args.includes("--migrations")) await executer(["exec", "-T", "banc", "node", "/banc/migrer-tout.mjs", "--serie", nom, "--ecoles", env.MESURE_ECOLES], env);
    const releves = lancer("releves.mjs", ["--serie", nom, "--banc", BANC], "releves.log");
    let finRelevesAttendue = false;
    void releves.fin.then(() => { if (!finRelevesAttendue) return echouer(new Error("relevés arrêtés avant la fin de la série")); });
    const propres = new Set(["--nom", "--reglage", "--mysql-memoire", "--innodb", "--mode", "--taches", "--repos", "--ecoles-banc"]);
    const optionsCharge = args.filter((a, i) => !["--migrations", "--fenetre-confirmee", "--temoin-verifie"].includes(a) && !propres.has(a) && !propres.has(args[i - 1]));
    const quotaAvant = mesurerCpu();
    bilan.charge_en_cours = true;
    const charge = lancer("charge.mjs", ["--banc", BANC, "--serie", nom, ...optionsCharge], "charge.log");
    bilan.code_charge = await charge.fin;
    bilan.charge_en_cours = false;
    if (mesurerCpu().nr_throttled > quotaAvant.nr_throttled) bilan.generateur_limite = true;
    verifier();
    if (bilan.code_charge !== 0) throw new Error("charge en échec ; voir le journal local");
    const finRepos = Date.now() + Number(option(args, "repos", "900")) * 1000;
    while (Date.now() < finRepos) { verifier(); await attendre(Math.min(1000, finRepos - Date.now())); }
    finRelevesAttendue = true;
    await releves.arreter();
    const journal = (await executer(["logs", "--no-color", "banc"], env)).stdout;
    writeFileSync(join(dossier, "banc.log"), journal);
    return { releves, charge };
}
