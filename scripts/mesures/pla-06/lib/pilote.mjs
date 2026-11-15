/**
 * Orchestration locale protégée : installation, préparation ou série, dans une fenêtre confirmée.
 * Toute sortie, y compris un incident de surveillance, arrête exclusivement les conteneurs du banc.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync, openSync, closeSync } from "node:fs";
import { join } from "node:path";
import { LOCAL, RESULTATS } from "./config.mjs";
import { compose, commande, observer, surveiller, photo, lancerNode } from "./local.mjs";
import { verifierPhotos, raisonsInvalidite, champsLinux, PROJET, verifierCompose } from "./protection.mjs";
import { mesurerSerie } from "./serie-locale.mjs";

/** Arrête même les conteneurs ponctuels de préparation, repérés exclusivement par leur projet. */
export async function arreterProjet() {
    const ids = (await commande("docker", ["ps", "-q", "--no-trunc", "--filter", "label=com.docker.compose.project=" + PROJET])).trim().split("\n").filter(Boolean);
    if (ids.length) await commande("docker", ["stop", "--time", "5", ...ids]);
}

/** Exécute une action avec gardes dès avant la première création de conteneur. */
export async function piloter(action, args, avant, groupe) {
    const index = args.indexOf("--nom");
    const nom = index >= 0 ? args[index + 1] : action + "-" + Date.now();
    if (!/^[\w-]+$/.test(nom ?? "")) throw new Error("--nom invalide");
    const dossier = join(RESULTATS, nom);
    if (existsSync(dossier)) throw new Error("nom déjà utilisé : résultats conservés, choisir un nouveau nom");
    mkdirSync(dossier, { recursive: true });
    const bilan = { nom, action, debut: new Date().toISOString(), valide: false, raisons: [] };
    const fichier = join(dossier, "serie.json");
    const sauver = () => writeFileSync(fichier, JSON.stringify(bilan, null, 2));
    sauver(); // Une interruption brutale laisse un résultat explicitement invalide.
    let incident, stopSurveillance, releves, charge, pages, cpuDepart;
    const enfants = [];
    const journaux = [];
    const noterIncident = (erreur) => {
        if (!incident) { incident = erreur; bilan.raisons.push(erreur.message); sauver(); }
    };
    const arret = async (erreur) => {
        noterIncident(erreur);
        await Promise.allSettled(enfants.map((e) => e.arreter()));
        try { await arreterProjet(); } catch { bilan.raisons.push("arrêt Docker non confirmé"); sauver(); }
    };
    const signal = () => { void arret(new Error("arrêt manuel demandé")); };
    process.on("SIGINT", signal); process.on("SIGTERM", signal);
    const controle = async () => {
        if (existsSync(join(LOCAL, "ARRET"))) throw new Error("arrêt manuel n8n demandé");
        const ligne = await observer(avant, groupe, join(dossier, "protection.jsonl"));
        if (pages === undefined) pages = ligne.pages;
        if (ligne.pages > pages) throw new Error("mémoire d'échange active");
        const cpu = champsLinux(ligne.groupe_cpu);
        cpuDepart ??= cpu.nr_throttled;
        if (!Number.isFinite(cpuDepart)) throw new Error("compteurs CPU du groupe absents");
        if (action === "serie" && bilan.charge_en_cours && cpu.nr_throttled > cpuDepart) bilan.generateur_limite = true;
        cpuDepart = cpu.nr_throttled;
        // Détecter OOM, arrêt ou recréation d'un conteneur du banc pendant une action.
        const ids = (await commande("docker", ["ps", "-aq", "--no-trunc", "--filter", "label=com.docker.compose.project=" + PROJET])).trim().split("\n").filter(Boolean);
        if (ids.length) {
            const etats = await photo(ids);
            if (etats.some((c) => c.oom || c.redemarrages > 0)) throw new Error("OOM ou redémarrage d'un conteneur de mesure");
        }
    };
    const executer = async (argsCompose, env = {}) => {
        if (incident) throw incident;
        const r = await compose(argsCompose, env);
        if (incident) throw incident;
        return r;
    };
    const lancer = (script, options, fichierJournal) => {
        const fd = openSync(join(dossier, fichierJournal), "a"); journaux.push(fd);
        const e = lancerNode(script, options, fd); enfants.push(e); return e;
    };
    try {
        const photoAvant = await photo(avant.map((c) => c.id));
        verifierPhotos(avant, photoAvant);
        writeFileSync(join(dossier, "photo-avant.json"), JSON.stringify({ t: new Date().toISOString(), conteneurs: photoAvant }, null, 2));
        await controle();
        stopSurveillance = surveiller({ controle, arreter: arret });
        await arreterProjet();
        const configuration = JSON.parse((await executer(["--profile", "installer", "config", "--format", "json"])).stdout);
        verifierCompose(configuration);
        // Aucun téléchargement implicite non borné dans le démon Docker pendant une fenêtre.
        await commande("docker", ["image", "inspect", "mysql:8.4.13", "node:22-bookworm-slim", "--format", "{{.Id}}"]);
        const contexte = { args, nom, dossier, executer, lancer, bilan, echouer: arret, mesurerCpu: () => champsLinux(readFileSync(join(groupe, "cpu.stat"), "utf8")), verifier: () => { if (incident) throw incident; } };
        if (action === "verifier-gardes") {
            // Test injecté sans consommer la mémoire de l'hôte, et sans lancer de conteneur.
            await arret(new Error("essai volontaire de la voie d'arrêt"));
            if (bilan.raisons[0] !== "essai volontaire de la voie d'arrêt") throw new Error("garde non exercée");
            bilan.garde_exercee = true;
        } else if (action === "installer") {
            await executer(["--profile", "installer", "run", "--rm", "--no-deps", "--pull", "never", "installer"]);
            bilan.terminee = true;
        } else if (action === "preparer") {
            const n = args.includes("--ecoles") ? args[args.indexOf("--ecoles") + 1] : "200";
            if (!/^\d+$/.test(n) || Number(n) < 2 || Number(n) > 200) throw new Error("--ecoles : entier de 2 à 200");
            await executer(["up", "-d", "--wait", "--pull", "never", "mysql"]);
            await executer(["run", "--rm", "--no-deps", "--pull", "never", "banc", "node", "/banc/preparer.mjs", "bases", "--ecoles", n]);
            bilan.terminee = true;
        } else {
            ({ releves, charge } = await mesurerSerie(contexte));
            bilan.terminee = true;
        }
    } catch (erreur) { noterIncident(erreur); process.exitCode = 1; }
    finally {
        if (stopSurveillance) await stopSurveillance();
        await Promise.allSettled(enfants.map((e) => e.arreter()));
        try {
            await arreterProjet();
            const photoApres = await photo(avant.map((c) => c.id));
            writeFileSync(join(dossier, "photo-apres.json"), JSON.stringify({ t: new Date().toISOString(), conteneurs: photoApres }, null, 2));
            verifierPhotos(avant, photoApres);
            bilan.photos_ok = true;
        } catch (erreur) { noterIncident(erreur); }
        for (const fd of journaux) closeSync(fd);
        process.off("SIGINT", signal); process.off("SIGTERM", signal);
        bilan.fin = new Date().toISOString();
        if (action === "serie") {
            const lire = (nomFichier) => {
                try { return JSON.parse(readFileSync(join(dossier, nomFichier), "utf8")); } catch { return null; }
            };
            if (bilan.generateur_limite) bilan.raisons.push("groupe du générateur limité par le quota CPU : capacité non concluante");
            bilan.raisons = raisonsInvalidite(bilan, lire("charge.json"), lire("releves-resume.json"));
        }
        sauver();
        console.log("Bilan conservé localement ; contrôle manuel n8n après action requis.");
        if (incident) process.exitCode = 1;
    }
}
