// Extrait les compteurs moteur des journaux et produit un rapport sans métadonnées du poste.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { resumer } from './lib/validation.mjs';
import { serialiser } from './generer-superieur.mjs';

/** Extrait uniquement les compteurs observés, sans reconstruire une mesure absente. */
export function analyserJournal(journal) {
    const fin = journal.split(/\r?\n/).filter((ligne) => ligne.includes('Solving ended:')).at(-1) ?? '';
    const nombre = (motif, texte = fin) => { const valeur = motif.exec(texte)?.[1]; return valeur === undefined ? null : Number(valeur); };
    const construction = journal.split(/\r?\n/).filter((ligne) => /Construction Heuristic phase .*ended:/.test(ligne)).at(-1) ?? '';
    return { tempsMoteurMs: nombre(/time spent \((\d+)\)/),
        evaluationsParSeconde: nombre(/(?:move evaluation|score calculation) speed \((\d+)\/sec\)/),
        mode: /environment mode \(([^)]+)\)/.exec(fin)?.[1] ?? null,
        etapesConstruction: nombre(/step total \((\d+)\)/, construction),
        constructionInterrompue: /terminated early|may not be fully initialized/.test(journal),
        scoreFinal: /best score \(([^)]+)\)/.exec(fin)?.[1] ?? null };
}

/** Conserve tous les passages mesurés, ainsi que les échecs et la provenance des images. */
export async function extraire(dossier) {
    const fichiers = (await readdir(dossier)).filter((nom) => nom.endsWith('-resultat.json')).sort();
    const passages = [];
    for (const fichier of fichiers) {
        const brut = JSON.parse(await readFile(path.join(dossier, fichier), 'utf8'));
        if (brut.chauffe || brut.fumee) continue;
        const journal = await readFile(path.join(dossier, `${brut.indice}-moteur.log`), 'utf8').catch(() => '');
        const derniere = brut.observations?.at(-1)?.reponse;
        const cpu = (brut.observations ?? []).map((o) => o.cpuMicrosecondes).filter(Number.isFinite);
        passages.push({ revision: brut.revision, image: brut.image, profil: brut.profil, indice: brut.indice,
            problemeSha256: brut.problemeSha256, requeteSha256: brut.requeteSha256,
            dureeDemandeeSecondes: brut.dureeDemandeeSecondes,
            demarrageMs: brut.demarrageMs, dureeMs: brut.dureeMs,
            premiereFaisableObserveeMs: brut.premiereFaisableObserveeMs,
            controle: brut.controle, erreur: brut.erreur ?? null, erreurNettoyage: brut.erreurNettoyage ?? null,
            score: derniere?.score ?? null, dur: derniere?.dur ?? null, moyen: derniere?.moyen ?? null,
            souple: derniere?.souple ?? null, violations: derniere?.violations ?? null,
            memoireMaxEchantillonneeOctets: brut.memoireMaxEchantillonneeOctets,
            picCgroupOctets: brut.picCgroupOctets, sondesMemoireManquantes: brut.sondesMemoireManquantes,
            cpuObserveMicrosecondes: cpu.length > 1 ? cpu.at(-1) - cpu[0] : null,
            moteur: analyserJournal(journal), conteneur: brut.conteneur ?? null });
    }
    return { version: 1, designation: 'jeu supérieur simplifié',
        avertissement: 'EP-10 applicative non démontrée par ce banc',
        passages, synthese: resumer(passages) };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const [dossier, destination] = process.argv.slice(2);
    if (!dossier || !destination) throw new Error('Usage : node extraire-resultats.mjs dossier-local destination.json');
    extraire(dossier).then((resultat) => writeFile(destination, serialiser(resultat)))
        .catch((erreur) => { console.error(erreur.message); process.exitCode = 1; });
}
