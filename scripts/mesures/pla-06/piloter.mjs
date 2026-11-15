/**
 * Entrée serveur PLA-06. Vérifie le groupe hôte, le verrou exclusif et les photos de n8n.
 * Le chef utilise lancer.sh ; ce fichier ne commande aucun serveur distant.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync, openSync, closeSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { LOCAL, RESULTATS, initialiserSecrets } from "./lib/config.mjs";
import { groupeHote, photo, photoInitiale, compose, commande } from "./lib/local.mjs";
import { verifierPhotos, raisonsInvalidite } from "./lib/protection.mjs";

const [action, ...args] = process.argv.slice(2);
const autorisees = ["initialiser", "configurer-sonde", "photo", "installer", "preparer", "serie", "confirmer", "nettoyer", "verifier-gardes"];
if (!autorisees.includes(action)) throw new Error("action : " + autorisees.join(", "));
const groupe = groupeHote();
const contexteDocker = (await commande("docker", ["context", "inspect", "--format", "{{.Endpoints.docker.Host}}"])).trim();
if (process.env.DOCKER_HOST || process.env.DOCKER_CONTEXT || contexteDocker !== "unix:///var/run/docker.sock") throw new Error("Docker doit utiliser le socket local du serveur, sans surcharge de contexte");
mkdirSync(LOCAL, { recursive: true });
const verrou = join(LOCAL, "verrou");
const fd = openSync(verrou, "wx"); closeSync(fd);
try {
    if (action === "initialiser") { initialiserSecrets(); } else if (action === "configurer-sonde") {
        const { configurerSonde } = await import("./configurer-sonde.mjs");
        await configurerSonde();
    } else if (action === "photo") {
        const chemin = join(LOCAL, "proteges.json");
        if (existsSync(chemin)) throw new Error("photo déjà présente ; conserver et examiner l'ancienne photo avant de la renouveler");
        writeFileSync(chemin, JSON.stringify(await photoInitiale(), null, 2), { mode: 0o600 });
        console.log("Photo conservée localement ; vérifier qu'elle couvre tous les services à protéger.");
    } else {
        const avant = JSON.parse(readFileSync(join(LOCAL, "proteges.json"), "utf8"));
        verifierPhotos(avant, await photo(avant.map((c) => c.id)));
        if (action === "confirmer") {
            if (!args.includes("--temoin-apres-verifie")) throw new Error("contrôle manuel n8n après série requis");
            const nom = args[args.indexOf("--nom") + 1];
            if (!args.includes("--nom") || !/^[\w-]+$/.test(nom)) throw new Error("--nom requis");
            const chemin = join(RESULTATS, nom);
            const lire = (n) => JSON.parse(readFileSync(join(chemin, n), "utf8"));
            const bilan = lire("serie.json");
            bilan.temoin_apres = true;
            bilan.raisons = bilan.raisons.filter((r) => r !== "contrôle manuel n8n après la série attendu");
            bilan.raisons = raisonsInvalidite(bilan, lire("charge.json"), lire("releves-resume.json"));
            bilan.valide = bilan.raisons.length === 0;
            writeFileSync(join(chemin, "serie.json"), JSON.stringify(bilan, null, 2));
            console.log(bilan.valide ? "Série valide après contrôle manuel." : "Série invalide : " + bilan.raisons.join(" ; "));
            if (!bilan.valide) process.exitCode = 1;
        } else if (action === "nettoyer") {
            await compose(["down", "--volumes", "--remove-orphans"]);
            verifierPhotos(avant, await photo(avant.map((c) => c.id)));
            console.log("Projet et volumes supprimés. Conserver les résultats, puis effacer les secrets localement après contrôle.");
        } else {
            if (!args.includes("--fenetre-confirmee") || !args.includes("--temoin-verifie")) throw new Error("créneau et témoin n8n doivent être confirmés par le chef");
            const { piloter } = await import("./lib/pilote.mjs");
            await piloter(action, args, avant, groupe);
        }
    }
} finally { unlinkSync(verrou); }
