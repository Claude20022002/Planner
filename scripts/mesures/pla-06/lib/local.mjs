/**
 * Exécution locale du banc : commandes sans shell, photos Docker ciblées, groupe hôte cgroup v2.
 * Les dépendances sont injectables pour tester les arrêts sans Docker ni serveur.
 */
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { RACINE } from "./config.mjs";
import { PROJET, verifierGroupe, verifierMemoire, verifierPhotos } from "./protection.mjs";

const executer = promisify(execFile);
export const commande = async (programme, args) => (await executer(programme, args, { cwd: RACINE, timeout: 30_000, maxBuffer: 4 * 1024 ** 2 })).stdout;
export const compose = (args, env = {}) => executer("docker", ["compose", "--project-name", PROJET, "-f", "docker-compose.mesure.yml", "--env-file", ".local/mesure.env", ...args], {
    cwd: RACINE, env: { ...process.env, ...env }, timeout: 30 * 60_000, maxBuffer: 16 * 1024 ** 2,
});

/** Chemin du groupe de contrôle du pilote, sans lire ni modifier les autres groupes. */
export function groupeHote() {
    const ligne = readFileSync("/proc/self/cgroup", "utf8").trim();
    if (!ligne.startsWith("0::/")) throw new Error("cgroup v2 requis");
    const chemin = resolve("/sys/fs/cgroup", "." + ligne.slice(3));
    if (!chemin.startsWith("/sys/fs/cgroup/")) throw new Error("groupe hôte dédié requis");
    verifierGroupe({
        memoire: readFileSync(join(chemin, "memory.max"), "utf8").trim(),
        echange: readFileSync(join(chemin, "memory.swap.max"), "utf8").trim(),
        cpu: readFileSync(join(chemin, "cpu.max"), "utf8"),
    });
    return chemin;
}

/** Photo restreinte : ne lit ni variables d'environnement ni secrets des services existants. */
export async function photo(ids) {
    if (!Array.isArray(ids) || !ids.length || ids.some((id) => !/^[a-f0-9]{64}$/.test(id))) throw new Error("identifiants protégés invalides");
    const format = '{"id":{{json .Id}},"debut":{{json .State.StartedAt}},"etat":{{json .State.Status}},"redemarrages":{{.RestartCount}},"oom":{{.State.OOMKilled}},"sante":{{if .State.Health}}{{json .State.Health.Status}}{{else}}"absente"{{end}}}';
    return (await commande("docker", ["inspect", "--format", format, ...ids])).trim().split("\n").map(JSON.parse);
}

/** État des conteneurs présents avant mesure, à conserver seulement dans .local/. */
export async function photoInitiale() {
    const ids = (await commande("docker", ["ps", "-q", "--no-trunc", "--filter", "label!=com.docker.compose.project=" + PROJET])).trim().split("\n").filter(Boolean);
    const etat = await photo(ids);
    verifierPhotos(etat, etat);
    return etat;
}

/** Vérifie une observation complète ; une erreur de lecture déclenche le même arrêt qu'un incident. */
export async function observer(avant, groupe, fichier) {
    const memoire = verifierMemoire(readFileSync("/proc/meminfo", "utf8"), readFileSync("/proc/vmstat", "utf8"));
    const apres = await photo(avant.map((c) => c.id));
    verifierPhotos(avant, apres);
    const ligne = {
        t: new Date().toISOString(), ...memoire,
        groupe_memoire: Number(readFileSync(join(groupe, "memory.current"), "utf8")),
        groupe_cpu: readFileSync(join(groupe, "cpu.stat"), "utf8"),
        services: await commande("docker", ["stats", "--no-stream", "--format", "{{json .}}", ...avant.map((c) => c.id)]),
    };
    appendFileSync(fichier, JSON.stringify(ligne) + "\n");
    return ligne;
}

/** Surveillance sans recouvrement : vérifie toutes les 5 s et rend l'incident au pilote. */
export function surveiller({ controle, arreter, delai = 5000, immediat = true }) {
    let timer, fin = false;
    let enCours = Promise.resolve();
    const tour = () => {
        const debut = performance.now();
        enCours = (async () => {
            try { await controle(); }
            catch (erreur) { fin = true; await arreter(erreur); }
            if (!fin) timer = setTimeout(tour, Math.max(0, delai - (performance.now() - debut)));
        })();
    };
    if (immediat) tour(); else timer = setTimeout(tour, delai);
    return async () => { fin = true; clearTimeout(timer); await enCours; };
}

/** Lance Node dans le groupe du pilote ; SIGTERM puis SIGKILL bornent l'arrêt d'une charge. */
export function lancerNode(script, args, journal) {
    const enfant = spawn(process.execPath, [join(RACINE, script), ...args], { cwd: RACINE, stdio: ["ignore", journal, journal] });
    const fin = new Promise((resoudre) => {
        enfant.once("error", () => resoudre(1));
        enfant.once("exit", (code, signal) => resoudre(signal ? 1 : code ?? 1));
    });
    return {
        fin,
        async arreter() {
            if (enfant.exitCode !== null || enfant.signalCode) return;
            enfant.kill("SIGTERM");
            const t = setTimeout(() => enfant.kill("SIGKILL"), 5000);
            await fin; clearTimeout(t);
        },
    };
}
