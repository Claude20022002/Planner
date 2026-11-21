// Extrait les vingt observations, contrôle leurs empreintes et compare les passages libres.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { analyserJournal } from './extraire-resultats.mjs';
import { empreinte, serialiser } from './generer-superieur.mjs';
import { genererCampus, tailles } from './generer-campus.mjs';
import { verifierTemoin } from './lib/validation.mjs';

function distribution(nombres) {
    const tries = [...nombres].sort((a, b) => a - b);
    return { min: tries[0], mediane: tries[1], max: tries[2] };
}

/** Compare seulement deux séries ayant chacune leurs trois solutions complètes et faisables. */
export function comparer(avant, apres) {
    if ([avant, apres].some((serie) => serie.length !== 3 || serie.some((p) => !p.faisable))) {
        return { verdict: 'indéterminé' };
    }
    const ref = distribution(avant.map((p) => p.souple));
    const actuel = distribution(apres.map((p) => p.souple));
    const ecartPoints = actuel.mediane - ref.mediane;
    const variationPourCent = ref.mediane === 0 ? null : 100 * ecartPoints / Math.abs(ref.mediane);
    const alerte = variationPourCent === null ? ecartPoints < 0 : variationPourCent < -10;
    return { reference: ref, actuelle: actuel, ecartPoints, variationPourCent, verdict: alerte ? 'alerte' : 'conforme' };
}

async function lirePassage(dossier, taille, etape, version, jeu, image) {
    const indice = [taille, etape, version].join('-');
    const lire = (suffixe) => readFile(path.join(dossier, indice + suffixe), 'utf8');
    const brut = JSON.parse(await lire('-resultat.json'));
    const fixe = etape === 'fixe', chauffe = etape === 'chauffe';
    const requete = await lire('-requete.json');
    if (brut.indice !== indice || brut.revision !== image.revision || brut.image !== image.image
        || brut.requeteSha256 !== empreinte(requete) || brut.chauffe !== (fixe || chauffe)
        || brut.fumee !== fixe || brut.dureeDemandeeSecondes !== (fixe ? 5 : chauffe ? 60 : 600)
        || (!fixe && brut.problemeSha256 !== jeu.manifeste.problemeSha256)) throw new Error('Provenance incohérente : ' + indice);
    const attendu = structuredClone(jeu.probleme);
    attendu.dureeSecondes = brut.dureeDemandeeSecondes;
    if (fixe) {
        const places = new Map(jeu.temoin.map((p) => [p.id, p]));
        for (const l of attendu.lecons) {
            const p = places.get(l.id);
            Object.assign(l, { epinglee: true, creneau: { id: p.creneauId }, salle: { id: p.salleId } });
        }
    }
    if (serialiser(attendu) !== requete) throw new Error('Requête différente du jeu annoncé : ' + indice);
    const reponse = brut.observations?.at(-1)?.reponse;
    let anomalie = brut.erreur ?? brut.erreurNettoyage ?? null;
    const complet = Boolean(brut.controle?.valide && reponse?.statut === 'NOT_SOLVING');
    if (complet && reponse.dur === 0 && (version === 'avant' || reponse.moyen === 0)) {
        try { verifierTemoin(jeu.probleme, reponse.lecons); }
        catch (e) { anomalie ??= e.message; }
    }
    const faisable = complet && !anomalie && brut.controle.faisable && (version === 'avant' || reponse.moyen === 0);
    const conforme = faisable && brut.conteneur?.oom === false && brut.dureeMs < 600000;
    const journal = await lire('-moteur.log');
    const phase = (nom) => Number(journal.match(new RegExp(nom + ' phase .*?ended: time spent \\((\\d+)\\)'))?.[1]) || null;
    const constructionMs = phase('Construction Heuristic'), finRecherche = phase('Local Search');
    const violations = reponse?.violations ?? null;
    const somme = violations?.reduce((total, v) => total + v.souple, 0);
    return { indice, conforme, faisable, anomalie, dureeMs: brut.dureeMs, score: reponse?.score ?? null,
        dur: reponse?.dur ?? null, moyen: reponse?.moyen ?? null, souple: reponse?.souple ?? null,
        soupleParSeance: faisable ? reponse.souple / jeu.manifeste.seances : null,
        recompensesNettesNonListees: faisable && somme != null ? reponse.souple - somme : null,
        violations, leconsNonAffectees: brut.controle?.nonAffectees ?? null,
        picCgroupOctets: brut.picCgroupOctets, oom: brut.conteneur?.oom ?? null,
        sondesManquantes: brut.sondesMemoireManquantes, requeteSha256: brut.requeteSha256, limites: brut.limites,
        constructionMs, rechercheLocaleMs: finRecherche && constructionMs ? finRecherche - constructionMs : null,
        evaluationsParSeconde: analyserJournal(journal).evaluationsParSeconde };
}

async function extraireCampus(dossier) {
    const provenance = JSON.parse(await readFile(path.join(dossier, 'provenance.json'), 'utf8'));
    const jeux = [];
    for (const taille of tailles) {
        const jeu = genererCampus(taille);
        const versions = {};
        for (const [version, image] of Object.entries(provenance.images)) {
            const lire = (phase) => lirePassage(dossier, taille, phase, version, jeu, image);
            const fixe = await lire('fixe'), chauffe = await lire('chauffe'), mesures = [];
            for (const n of ['1', '2', '3']) mesures.push(await lire(n));
            versions[version] = { fixe, chauffe, mesures };
        }
        jeux.push({ taille, seances: jeu.manifeste.seances, problemeSha256: jeu.manifeste.problemeSha256,
            comparaison: comparer(versions.avant.mesures, versions.apres.mesures), versions });
    }
    return { provenance, jeux };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    if (!process.argv[2]) throw new Error('Indiquer le dossier local de la série campus.');
    const resultat = await extraireCampus(process.argv[2]);
    const sortie = fileURLToPath(new URL('./jeux/resultats-campus.json', import.meta.url));
    await writeFile(sortie, serialiser(resultat));
}
