// Régressions des contrats du banc : entrées, témoin, scores, échecs et collecte.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { generer, serialiser, empreinte } from '../generer-superieur.mjs';
import { verifierEntree, verifierReponse, verifierTemoin, resumer } from '../lib/validation.mjs';
import { lireCompteurs } from '../lib/docker.mjs';
import { observer } from '../lib/observation.mjs';
const configuration = JSON.parse(await readFile(new URL('../configurations/superieur.json', import.meta.url), 'utf8'));
const { probleme, temoin } = generer({ ...configuration, groupes: 4 });
const finale = () => ({ statut: 'NOT_SOLVING', score: '0hard/-12soft', dur: 0, souple: -12,
    lecons: structuredClone(temoin), violations: [] });

test('20 000 étudiants : tailles, bornes, génération stable et témoin faisable', () => {
    const jeu = generer(configuration);
    assert.equal(jeu.manifeste.etudiants, 20000);
    assert.equal(jeu.probleme.lecons.length, 4800);
    assert.equal(jeu.probleme.ressources.filter((r) => r.nature === 'ENSEIGNANT').length, 800);
    assert.equal(jeu.probleme.salles.length, 400);
    verifierEntree(jeu.probleme);
    assert.equal(verifierTemoin(jeu.probleme, jeu.temoin), true);
    assert.equal(empreinte(serialiser(jeu.probleme)), generer(configuration).manifeste.problemeSha256);
    assert.ok(jeu.probleme.lecons.every((l) => !l.creneau && !l.salle && !l.epinglee));
});

test('les JSON versionnés restent exactement ceux du générateur', async () => {
    const jeu = generer(configuration);
    for (const [nom, valeur] of Object.entries(jeu)) {
        assert.equal(await readFile(new URL(`../jeux/superieur-${nom}.json`, import.meta.url), 'utf8'), serialiser(valeur));
    }
});

test('entrée épinglée, doublon, taille excessive : refus', () => {
    for (const changer of [
        (p) => { p.lecons[0].epinglee = true; },
        (p) => { p.lecons[1].id = p.lecons[0].id; },
        (p) => { p.lecons = Array.from({ length: 5001 }, (_, n) => ({ id: String(n) })); },
    ]) {
        const p = structuredClone(probleme); changer(p);
        assert.throws(() => verifierEntree(p));
    }
});

test('le témoin ne peut masquer une collision ou une salle incompatible', () => {
    const collision = structuredClone(temoin);
    collision[1].creneauId = collision[0].creneauId;
    assert.throws(() => verifierTemoin(probleme, collision), /Collision/);
    const p = structuredClone(probleme); p.salles[0].capacite = 1;
    assert.throws(() => verifierTemoin(p, temoin), /incompatible/);
});

test('une réponse finale complète et initialisée est reconnue', () => {
    assert.equal(verifierReponse(probleme, finale(), { finale: true }).faisable, true);
});

test('score dur ou moyen négatif : réponse valide mais non faisable', () => {
    const dur = finale(); Object.assign(dur, { dur: -1, score: '-1hard/-12soft' });
    assert.equal(verifierReponse(probleme, dur).valide, true);
    assert.equal(verifierReponse(probleme, dur).faisable, false);
    const moyen = finale(); Object.assign(moyen, { moyen: -1, score: '0hard/-1medium/-12soft' });
    assert.equal(verifierReponse(probleme, moyen).valide, true);
    assert.equal(verifierReponse(probleme, moyen).faisable, false);
});

test('un score nul ne valide pas des affectations absentes, inconnues ou dupliquées', () => {
    for (const changer of [
        (r) => r.lecons.pop(),
        (r) => { r.lecons[0].salleId = null; },
        (r) => { r.lecons[0].creneauId = 999; },
        (r) => { r.lecons[1] = r.lecons[0]; },
        (r) => { r.lecons[0].id = 'inconnue'; },
    ]) {
        const r = finale(); changer(r);
        assert.equal(verifierReponse(probleme, r).faisable, false);
    }
});

test('score absent, non initialisé, incohérent ou analyse absente : refus', () => {
    for (const changer of [
        (r) => delete r.score,
        (r) => { r.score = '-4init/0hard/-12soft'; },
        (r) => { r.dur = 1; },
        (r) => delete r.violations,
        (r) => { r.statut = 'SOLVING_ACTIVE'; },
    ]) {
        const r = finale(); changer(r);
        assert.equal(verifierReponse(probleme, r, { finale: true }).valide, false);
    }
});

test('mémoire : octets, cache, pic natif et CPU ; absence différente de zéro', () => {
    assert.deepEqual(lireCompteurs('1000\n1200\nfile 200\nusage_usec 400\n'),
        { memoireOctets: 1000, picCgroupOctets: 1200, cacheOctets: 200, cpuMicrosecondes: 400 });
    assert.equal(lireCompteurs('').memoireOctets, null);
    assert.equal(lireCompteurs('0\n0\n').memoireOctets, 0);
});

function horloge() {
    let temps = 0;
    return { maintenant: () => temps, pause: async (ms) => { temps += ms; } };
}
const sonde = async () => ({ memoireOctets: 100, picCgroupOctets: 110 });
test('observation : premier faisable observé et arrêt anticipé conservés', async () => {
    let lectures = 0;
    const api = async (chemin) => chemin === '/timetables' ? { id: 'essai' }
        : ++lectures === 1 ? { ...finale(), statut: 'SOLVING_ACTIVE' } : finale();
    const r = await observer(probleme, api, sonde, { ...horloge(), intervalleMs: 1000 });
    assert.equal(r.erreur, null);
    assert.equal(r.dureeMs, 1000);
    assert.equal(r.premiereFaisableObserveeMs, 0);
    assert.equal(r.controle.faisable, true);
    assert.equal(r.picCgroupOctets, 110);
});

test('observation : score nul incomplet ne devient jamais faisable', async () => {
    const api = async (chemin) => chemin === '/timetables' ? { id: 'essai' } : { ...finale(), lecons: [] };
    const r = await observer(probleme, api, sonde, horloge());
    assert.match(r.erreur, /absente/);
    assert.equal(r.premiereFaisableObserveeMs, null);
});

test('garde : arrêt demandé et résultat incomplet conservé', async () => {
    let arrets = 0;
    const api = async (chemin, options) => {
        if (options?.methode === 'DELETE') { arrets++; return {}; }
        return chemin === '/timetables' ? { id: 'essai' } : { ...finale(), statut: 'SOLVING_ACTIVE' };
    };
    const r = await observer(probleme, api, sonde, { ...horloge(), gardeMs: 2000 });
    assert.match(r.erreur, /Garde/);
    assert.equal(arrets, 1);
    assert.equal(r.controle, null);
});

test('HTTP et échec moteur restent des échecs', async () => {
    const apiErreur = async () => { throw new Error('HTTP 400'); };
    const r = await observer(probleme, apiErreur, sonde, horloge());
    assert.equal(r.erreur, 'HTTP 400');
    const apiMoteur = async (chemin) => chemin === '/timetables' ? { id: 'essai' } : { statut: 'ECHEC' };
    const e = await observer(probleme, apiMoteur, sonde, horloge());
    assert.equal(e.erreur, 'Échec moteur');
});

test('synthèse : chauffe exclue, échecs gardés, profils et versions séparés', () => {
    const bon = { revision: 'a', profil: 'vps', problemeSha256: 'x', dureeMs: 20,
        controle: { faisable: true } };
    const groupes = resumer([{ ...bon, chauffe: true }, bon, { ...bon, dureeMs: 40 },
        { ...bon, dureeMs: 30 }, { ...bon, profil: 'general' }, { ...bon, revision: 'b', erreur: 'OOM' }]);
    assert.equal(groupes.length, 3);
    assert.equal(groupes[0].dureeMedianeMs, 30);
    assert.equal(groupes[0].conformeSolveur, true);
    assert.equal(groupes[1].conformeSolveur, false);
    assert.equal(groupes[2].echecs, 1);
});

// Une attente fondée sur AbortSignal.timeout ne garde pas, seule, le processus en vie.
test('la garde empêche une sortie silencieuse avant la fin des attentes non référencées', async () => {
    const { execFile } = await import('node:child_process');
    const { promisify } = await import('node:util');
    const module = new URL('../lib/observation.mjs', import.meta.url).href;
    const code = `import { garderProcessus } from ${JSON.stringify(module)};
        garderProcessus(() => new Promise((fin) => AbortSignal.timeout(30).addEventListener('abort', fin)))
            .then(() => console.log('termine'));`;
    const { stdout } = await promisify(execFile)(process.execPath, ['--input-type=module', '-e', code],
        { timeout: 3000, windowsHide: true });
    assert.equal(stdout.trim(), 'termine');
});

test('nettoyage : un label étranger interdit toute suppression', async () => {
    const { retirer, verifierLimites } = await import('../lib/docker.mjs');
    const appels = [];
    const docker = async (argumentsCommande) => { appels.push(argumentsCommande); return 'autre-session'; };
    await assert.rejects(retirer(docker, 'conteneur', 'ma-session'), /étranger/);
    assert.equal(appels.length, 1);
    const profil = { memoireOctets: 640 * 1024 ** 2, cpu: 1.5 };
    const mauvais = async () => JSON.stringify({ Memory: profil.memoireOctets, MemorySwap: -1, NanoCpus: 1.5e9 });
    await assert.rejects(verifierLimites(mauvais, 'conteneur', profil), /effectives/);
});

// Les débits ne sont pas déduits du simple temps d'arrêt.
test('journaux : vitesse, phase, score et mode sont extraits ou laissés indisponibles', async () => {
    const { analyserJournal } = await import('../extraire-resultats.mjs');
    const journal = 'Construction Heuristic phase (0) ended: time spent (60032), step total (349).\n'
        + 'Solving ended: time spent (60096), best score (-4450init/0hard/0soft), '
        + 'move evaluation speed (70025/sec), environment mode (REPRODUCIBLE).';
    assert.deepEqual(analyserJournal(journal), { tempsMoteurMs: 60096,
        evaluationsParSeconde: 70025, mode: 'REPRODUCIBLE', etapesConstruction: 349,
        constructionInterrompue: false, scoreFinal: '-4450init/0hard/0soft' });
    assert.equal(analyserJournal('').evaluationsParSeconde, null);
});
