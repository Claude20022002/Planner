// Pilote séquentiellement les images et passages MOT-02 ; n'utilise aucun service applicatif existant.
import { randomBytes, randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { dockerLocal, construire, retirer, sonder, verifierLimites } from './lib/docker.mjs';
import { appeler, attendreSante, observer, garderProcessus } from './lib/observation.mjs';
import { verifierEntree, verifierTemoin, resumer } from './lib/validation.mjs';
import { empreinte, serialiser } from './generer-superieur.mjs';
const dossier = path.dirname(fileURLToPath(import.meta.url));
const depot = path.resolve(dossier, '../../..');
const local = path.join(dossier, '.local');
const profils = { vps: { cpu: 1.5, memoireOctets: 640 * 1024 ** 2 },
    general: { cpu: 2, memoireOctets: 1024 ** 3 } };

/** Un conteneur neuf, une requête et des fichiers locaux préservés même en cas d'échec. */
async function passage(docker, image, probleme, { session, profil, indice, chauffe, fumee, sortie }) {
    const nom = `planner-mot02-${session}-${indice}`;
    const jeton = randomBytes(32).toString('hex');
    const limites = profils[profil];
    const resultat = { session, revision: image.revision, image: image.image, profil,
        indice, chauffe, fumee, problemeSha256: empreinte(serialiser(probleme)), debutUtc: new Date().toISOString() };
    let cree = false;
    try {
        const debut = performance.now();
        await docker(['create', '--name', nom, '--label', `planner.mot02.session=${session}`,
            '--memory', String(limites.memoireOctets), '--memory-swap', String(limites.memoireOctets),
            '--cpus', String(limites.cpu), '-p', '127.0.0.1::8080', '-e', 'SOLVER_TOKEN',
            '-e', 'JAVA_OPTS=-XX:MaxRAMPercentage=70', '-e', 'SOLVER_CALCULS_SIMULTANES_MAX=1', image.image],
        { env: { ...process.env, SOLVER_TOKEN: jeton } });
        cree = true;
        resultat.limites = await verifierLimites(docker, nom, limites);
        await docker(['start', nom]);
        const port = await docker(['port', nom, '8080/tcp']);
        if (!/^127\.0\.0\.1:\d+$/.test(port)) throw new Error('Port du conteneur inattendu');
        const base = `http://${port}`;
        await attendreSante(base, jeton);
        resultat.demarrageMs = performance.now() - debut;
        const demande = { ...probleme, dureeSecondes: fumee ? 5 : chauffe ? 60 : 600 };
        resultat.requeteSha256 = empreinte(serialiser(demande));
        resultat.dureeDemandeeSecondes = demande.dureeSecondes;
        await writeFile(path.join(sortie, `${indice}-requete.json`), serialiser(demande));
        Object.assign(resultat, await observer(demande, (chemin, options) => appeler(base, jeton, chemin, options),
            () => sonder(docker, nom), { gardeMs: fumee ? 35000 : 660000 }));
        const etat = JSON.parse(await docker(['inspect', nom, '--format', '{{json .State}}']));
        resultat.conteneur = { oom: etat.OOMKilled, codeSortie: etat.ExitCode, actif: etat.Running };
        if (etat.OOMKilled || !etat.Running) resultat.erreur ??= 'Conteneur interrompu';
    } catch (erreur) { resultat.erreur = erreur.message; }
    finally {
        if (cree) {
            try {
                const etatFinal = JSON.parse(await docker(['inspect', nom, '--format', '{{json .State}}']));
                resultat.conteneur = { oom: etatFinal.OOMKilled, codeSortie: etatFinal.ExitCode, actif: etatFinal.Running };
            } catch { resultat.etatConteneurIndisponible = true; }
            try { await writeFile(path.join(sortie, `${indice}-moteur.log`), await docker(['logs', nom], { fusionnerStderr: true })); }
            catch { resultat.journauxIndisponibles = true; }
            try { await retirer(docker, nom, session); }
            catch (erreur) { resultat.erreurNettoyage = erreur.message; }
        }
        await writeFile(path.join(sortie, `${indice}-resultat.json`), serialiser(resultat));
    }
    return resultat;
}

/** Commandes : construire [avant|apres], fumee, serie [avant|apres|comparaison] [vps|general]. */
async function principal() {
    const [action, choix = 'apres', profil = 'vps'] = process.argv.slice(2);
    if (!['construire', 'fumee', 'serie'].includes(action) || !['avant', 'apres', 'comparaison'].includes(choix) || !profils[profil]) {
        throw new Error('Usage : node mesurer.mjs construire|fumee|serie [avant|apres|comparaison] [vps|general]');
    }
    await mkdir(local, { recursive: true });
    const { docker, informations } = await dockerLocal();
    const revisions = { avant: 'd8d892bc57ea71f2827ebad3a42e94da10b1f46b',
        apres: '38f2f90f16e317ffdd083fab8ba166289754ef7b' };
    const versions = choix === 'comparaison' ? ['avant', 'apres'] : [choix];
    if (action === 'construire') {
        for (const version of versions) {
            console.log(`Construction ${version} (${revisions[version].slice(0, 8)})`);
            console.log(JSON.stringify(await construire(docker, revisions[version], local, depot)));
        }
        return;
    }
    const probleme = JSON.parse(await readFile(path.join(dossier, 'jeux/superieur-probleme.json'), 'utf8'));
    const temoin = JSON.parse(await readFile(path.join(dossier, 'jeux/superieur-temoin.json'), 'utf8'));
    const manifeste = JSON.parse(await readFile(path.join(dossier, 'jeux/superieur-manifeste.json'), 'utf8'));
    if (empreinte(serialiser(probleme)) !== manifeste.problemeSha256) throw new Error('Empreinte du jeu différente du manifeste');
    verifierEntree(probleme);
    verifierTemoin(probleme, temoin);
    const session = randomUUID().slice(0, 8);
    const sortie = path.join(local, `serie-${Date.now()}-${session}`);
    await mkdir(sortie);
    const passages = [];
    await writeFile(path.join(sortie, 'machine-locale.json'), serialiser(informations));
    console.log(`Résultats locaux : ${sortie}`);
    for (const version of versions) {
        const revision = revisions[version];
        const etiquette = `planner-mot02:${revision.slice(0, 12)}`;
        const image = { revision, etiquette, image: await docker(['image', 'inspect', etiquette, '--format', '{{.Id}}']) };
        for (let n = 0; n < (action === 'fumee' ? 1 : 4); n++) {
            const indice = `${version}-${n}`;
            console.log(`Passage ${indice} (${n === 0 ? 'chauffe' : 'mesuré'})`);
            const resultat = await passage(docker, image, probleme,
                { session, profil, indice, chauffe: n === 0, fumee: action === 'fumee', sortie });
            passages.push(resultat);
            console.log(JSON.stringify({ indice, dureeMs: resultat.dureeMs, erreur: resultat.erreur,
                controle: resultat.controle, picCgroupOctets: resultat.picCgroupOctets }));
            await writeFile(path.join(sortie, 'synthese.json'), serialiser(resumer(passages)));
        }
    }
    if (passages.some((p) => p.erreur || p.erreurNettoyage)) process.exitCode = 1;
}
garderProcessus(principal).catch((erreur) => { console.error(erreur.message); process.exitCode = 1; });
