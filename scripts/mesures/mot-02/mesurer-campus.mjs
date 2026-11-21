// Compare deux révisions sur le supérieur, avec un témoin épinglé avant les passages libres.
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dockerLocal, commande, construire } from './lib/docker.mjs';
import { garderProcessus } from './lib/observation.mjs';
import { verifierTemoin } from './lib/validation.mjs';
import { passage } from './mesurer.mjs';
import { genererCampus, tailles } from './generer-campus.mjs';
import { serialiser } from './generer-superieur.mjs';

const dossier = path.dirname(fileURLToPath(import.meta.url));
const depot = path.resolve(dossier, '../../..');
const local = path.join(dossier, '.local');
const revisions = { avant: 'ab2620a40b377856bd0dfeaec1effc7ebe07029c',
    apres: '53561918462fd6ee286ea2ed4fabef4754a83347' };

async function executer() {
    const { docker, informations } = await dockerLocal();
    await mkdir(local, { recursive: true });
    if (process.argv[2] === 'construire') {
        for (const revision of Object.values(revisions)) await construire(docker, revision, local, depot);
        return;
    }
    if (process.argv[2] !== 'serie') throw new Error('Usage : mesurer-campus.mjs construire|serie');
    const session = randomUUID().slice(0, 8);
    const sortie = path.join(local, 'campus-' + Date.now() + '-' + session);
    await mkdir(sortie);
    console.log(sortie);
    await writeFile(path.join(sortie, 'machine-locale.json'), serialiser(informations));
    const images = {};
    for (const [version, revision] of Object.entries(revisions)) {
        const etiquette = 'planner-mot02:' + revision.slice(0, 12);
        images[version] = { revision, image: await docker(['image', 'inspect', etiquette, '--format', '{{.Id}}']) };
    }
    const arbreSolveur = (revision) => commande('git', ['rev-parse', revision + ':solver'], { cwd: depot });
    const arbres = { fusion182: await arbreSolveur('d0359925'), apres: await arbreSolveur(revisions.apres) };
    await writeFile(path.join(sortie, 'provenance.json'), serialiser({ images, arbres }));
    for (const taille of tailles) {
        const jeu = genererCampus(taille);
        for (const [nom, objet] of Object.entries(jeu)) {
            const f = path.join(dossier, 'jeux', 'campus-' + taille + '-' + nom + '.json');
            if (await readFile(f, 'utf8') !== serialiser(objet)) throw new Error('Jeu à régénérer : ' + f);
        }
        const fixe = structuredClone(jeu.probleme);
        const places = new Map(jeu.temoin.map((p) => [p.id, p]));
        for (const l of fixe.lecons) {
            const p = places.get(l.id);
            Object.assign(l, { epinglee: true, creneau: { id: p.creneauId }, salle: { id: p.salleId } });
        }
        let reference;
        for (const phase of ['fixe', 'chauffe', '1', '2', '3']) {
            for (const [version, image] of Object.entries(images)) {
                const indice = [taille, phase, version].join('-');
                const fige = phase === 'fixe';
                const resultat = await passage(docker, image, fige ? fixe : jeu.probleme, {
                    session, profil: 'vps', indice, chauffe: phase === 'chauffe' || fige, fumee: fige, sortie });
                const final = resultat.observations?.at(-1)?.reponse;
                console.log(indice, resultat.erreur ?? final?.score, resultat.dureeMs);
                if (resultat.erreurNettoyage) throw new Error(resultat.erreurNettoyage);
                if (fige) {
                    if (resultat.erreur || !resultat.controle?.faisable) throw new Error('Témoin refusé : ' + indice);
                    if (final.lecons.some((l) => places.get(l.id).creneauId !== l.creneauId
                        || places.get(l.id).salleId !== l.salleId)) throw new Error('Témoin déplacé');
                    if (version === 'avant') reference = final.souple;
                    else if (reference !== final.souple) throw new Error('Score du témoin différent entre versions');
                } else if (resultat.controle?.faisable) {
                    verifierTemoin(jeu.probleme, final.lecons);
                }
            }
        }
    }
}
garderProcessus(executer).catch((e) => { console.error(e.message); process.exitCode = 1; });
