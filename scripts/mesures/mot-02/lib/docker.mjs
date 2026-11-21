// Exécute les seuls conteneurs du banc sur un contexte Docker local explicitement fixé.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
const executer = promisify(execFile);
/** Exécute une commande sans shell et borne sa sortie. */
export async function commande(programme, argumentsCommande, options = {}) {
    const { fusionnerStderr = false, ...execution } = options;
    const { stdout, stderr } = await executer(programme, argumentsCommande,
        { maxBuffer: 16 * 1024 * 1024, windowsHide: true, ...execution });
    return (fusionnerStderr ? stdout + stderr : stdout).trim();
}
/** Fixe un contexte local ; DOCKER_HOST n'est jamais utilisé implicitement. */
export async function dockerLocal() {
    const contexte = await commande('docker', ['context', 'show']);
    const hote = await commande('docker', ['context', 'inspect', contexte, '--format', '{{.Endpoints.docker.Host}}']);
    if (!/^(npipe:\/\/|unix:\/\/)/.test(hote)) throw new Error('Docker distant interdit pour MOT-02');
    const docker = (argumentsCommande, options) => commande('docker', ['--context', contexte, ...argumentsCommande], options);
    const info = JSON.parse(await docker(['info', '--format', '{{json .}}']));
    if (info.OSType !== 'linux' || info.NCPU < 2 || info.MemTotal < 2 * 1024 ** 3) throw new Error('Ressources Docker locales insuffisantes');
    return { docker, informations: { systeme: info.OSType, cpu: info.NCPU, memoireOctets: info.MemTotal } };
}
/** Construit un contexte extrait du commit indiqué, sans modifier solver/ ni les branches voisines. */
export async function construire(docker, revision, racineLocale, depot) {
    const commit = await commande('git', ['rev-parse', '--verify', `${revision}^{commit}`], { cwd: depot });
    const dossier = path.join(racineLocale, 'sources', commit);
    await mkdir(dossier, { recursive: true });
    const archive = path.join(dossier, 'source.tar');
    await commande('git', ['archive', '--format=tar', `--output=${archive}`, commit, 'solver'], { cwd: depot });
    await commande('tar', ['-xf', archive, '-C', dossier]);
    const etiquette = `planner-mot02:${commit.slice(0, 12)}`;
    await docker(['build', '-t', etiquette, path.join(dossier, 'solver')]);
    const image = await docker(['image', 'inspect', etiquette, '--format', '{{.Id}}']);
    return { revision: commit, image, etiquette };
}
/** Refuse de supprimer une ressource dont le label de session ne correspond pas. */
export async function retirer(docker, nom, session) {
    const proprietaire = await docker(['inspect', nom, '--format', '{{index .Config.Labels "planner.mot02.session"}}']);
    if (proprietaire !== session) throw new Error('Conteneur étranger : retrait refusé');
    await docker(['rm', '-f', nom]);
}
/** Convertit les compteurs cgroup v2 sans assimiler une valeur manquante à zéro. */
export function lireCompteurs(texte) {
    const lignes = texte.trim().split(/\r?\n/);
    const entier = (valeur) => /^\d+$/.test(valeur ?? '') ? Number(valeur) : null;
    const compteurs = Object.fromEntries(lignes.slice(2).map((ligne) => ligne.split(/\s+/)));
    return { memoireOctets: entier(lignes[0]), picCgroupOctets: entier(lignes[1]),
        cacheOctets: entier(compteurs.file), cpuMicrosecondes: entier(compteurs.usage_usec) };
}
/** Lit usage, pic natif, cache et CPU directement dans le cgroup du conteneur dédié. */
export async function sonder(docker, nom) {
    try {
        return lireCompteurs(await docker(['exec', nom, 'cat', '/sys/fs/cgroup/memory.current',
            '/sys/fs/cgroup/memory.peak', '/sys/fs/cgroup/memory.stat', '/sys/fs/cgroup/cpu.stat'], { timeout: 4000 }));
    } catch {
        return { memoireOctets: null, picCgroupOctets: null, cacheOctets: null,
            cpuMicrosecondes: null, erreur: 'Compteurs cgroup indisponibles' };
    }
}
/** Vérifie les limites appliquées plutôt que celles seulement demandées. */
export async function verifierLimites(docker, nom, profil) {
    const limites = JSON.parse(await docker(['inspect', nom, '--format', '{{json .HostConfig}}']));
    if (limites.Memory !== profil.memoireOctets || limites.MemorySwap !== profil.memoireOctets
        || limites.NanoCpus !== profil.cpu * 1e9) throw new Error('Limites Docker effectives incorrectes');
    return { memoireOctets: limites.Memory, memoireEtEchangeOctets: limites.MemorySwap, cpu: limites.NanoCpus / 1e9 };
}
