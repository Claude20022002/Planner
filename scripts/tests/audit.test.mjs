// Tests de scripts/audit.mjs (plan fix-audit-dependances, § 4) : vert avec l'exception de picomatch, rouge sans elle,
// rouge après l'expiration, rouge dès qu'une version hors de la plage de l'avis est publiée. Sans réseau.
// Lancement : node --test scripts/tests/audit.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { evaluer, dansPlage, avisDuRapport, defautsException, FICHIER_EXCEPTIONS } from '../audit.mjs';

const PICOMATCH = {
  source: 1247710,
  name: 'picomatch',
  dependency: 'picomatch',
  title: 'picomatch vulnerable to ReDoS through single-branch repeated extglobs',
  url: 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf',
  severity: 'high',
  range: '<=4.0.7',
};

// Forme du rapport de « npm audit --omit=dev --json » sur backend/ le 18 nov. 2026, réduite
const rapport = (...ajouts) => ({
  vulnerabilities: {
    fdir: { name: 'fdir', severity: 'high', via: ['picomatch'] },
    picomatch: { name: 'picomatch', severity: 'high', via: [PICOMATCH], fixAvailable: { name: 'umzug', version: '3.8.2' } },
    tinyglobby: { name: 'tinyglobby', severity: 'high', via: ['fdir', 'picomatch'] },
    umzug: { name: 'umzug', severity: 'high', via: ['tinyglobby'] },
    ...Object.fromEntries(ajouts.map((v) => [v.name, { name: v.name, severity: v.severity, via: [v] }])),
  },
});

const EXCEPTION = {
  dossier: 'backend',
  avis: 'GHSA-fc5q-39xc-vjpf',
  paquet: 'picomatch',
  chemin: 'umzug > tinyglobby > picomatch',
  raison: 'motif constant',
  revue: '2026-11-18',
  expire: '2026-12-18',
};

const cas = (changements = {}) => ({
  rapport: rapport(),
  exceptions: [EXCEPTION],
  dossier: 'backend',
  aujourdhui: '2026-11-18',
  dernieresVersions: { picomatch: '4.0.7' },
  ...changements,
});

test("vert avec l'exception de picomatch, tant que la dernière version reste touchée", () => {
  const { erreurs, notes } = evaluer(cas());
  assert.deepEqual(erreurs, []);
  assert.ok(notes.some((n) => n.includes('exception tenue jusqu\'au 2026-12-18')));
});

test("rouge si l'on retire l'exception de picomatch", () => {
  const { erreurs } = evaluer(cas({ exceptions: [] }));
  assert.equal(erreurs.length, 1);
  assert.match(erreurs[0], /faille high non listée : GHSA-fc5q-39xc-vjpf/);
});

test("une exception d'un autre dossier ne couvre pas la faille", () => {
  const { erreurs } = evaluer(cas({ exceptions: [{ ...EXCEPTION, dossier: 'vitrine' }] }));
  assert.match(erreurs[0], /non listée/);
});

test("rouge dès le lendemain de l'expiration, vert le jour même", () => {
  assert.deepEqual(evaluer(cas({ aujourdhui: '2026-12-18' })).erreurs, []);
  const { erreurs } = evaluer(cas({ aujourdhui: '2026-12-19' }));
  assert.equal(erreurs.length, 1);
  assert.match(erreurs[0], /expirée le 2026-12-18/);
});

test('rouge quand une exception expirée ne correspond plus à aucune faille', () => {
  const { erreurs } = evaluer(cas({ rapport: { vulnerabilities: {} }, aujourdhui: '2027-01-01' }));
  assert.match(erreurs[0], /expirée/);
});

test("rouge dès qu'une version hors de la plage de l'avis est publiée, même si npm propose un autre « correctif »", () => {
  const { erreurs } = evaluer(cas({ dernieresVersions: { picomatch: '4.0.8' } }));
  assert.equal(erreurs.length, 1);
  assert.match(erreurs[0], /picomatch 4\.0\.8 est publiée, hors de la plage « <=4\.0\.7 »/);
});

test('rouge si la dernière version publiée est inconnue (npm view en échec)', () => {
  const { erreurs } = evaluer(cas({ dernieresVersions: {} }));
  assert.match(erreurs[0], /dernière version publiée de picomatch inconnue/);
});

test('une faille moyenne est affichée sans bloquer ; une nouvelle faille haute bloque', () => {
  const moyenne = { source: 1, name: 'qs', title: 'qs', url: 'https://github.com/advisories/GHSA-aaaa-bbbb-cccc', severity: 'moderate', range: '<6.17.1' };
  const haute = { source: 2, name: 'autre', title: 'autre', url: 'https://github.com/advisories/GHSA-dddd-eeee-ffff', severity: 'critical', range: '<2.0.0' };
  assert.deepEqual(evaluer(cas({ rapport: rapport(moyenne) })).erreurs, []);
  const { erreurs } = evaluer(cas({ rapport: rapport(haute) }));
  assert.equal(erreurs.length, 1);
  assert.match(erreurs[0], /faille critical non listée : GHSA-dddd-eeee-ffff/);
});

test('une exception de plus de 30 jours, ou mal écrite, fait échouer', () => {
  assert.match(evaluer(cas({ exceptions: [{ ...EXCEPTION, expire: '2026-12-19' }] })).erreurs[0], /31 jours/);
  assert.match(evaluer(cas({ exceptions: [{ ...EXCEPTION, raison: '' }] })).erreurs[0], /champ « raison » manquant/);
  assert.match(evaluer(cas({ exceptions: [{ ...EXCEPTION, expire: '18/12/2026' }] })).erreurs[0], /AAAA-MM-JJ/);
});

test('une exception sans faille correspondante est signalée, sans bloquer', () => {
  const { erreurs, notes } = evaluer(cas({ rapport: { vulnerabilities: {} } }));
  assert.deepEqual(erreurs, []);
  assert.ok(notes.some((n) => n.includes('à retirer')));
});

test('chaque avis est compté une fois, à son paquet, et pas aux paquets qui en héritent', () => {
  assert.deepEqual(avisDuRapport(rapport()), [
    { avis: 'GHSA-fc5q-39xc-vjpf', paquet: 'picomatch', plage: '<=4.0.7', gravite: 'high', titre: PICOMATCH.title },
  ]);
});

test('plages des avis', () => {
  assert.equal(dansPlage('4.0.7', '<=4.0.7'), true);
  assert.equal(dansPlage('4.0.8', '<=4.0.7'), false);
  assert.equal(dansPlage('2.3.1', '>=2.0.0 <2.3.2 || >=4.0.0 <4.0.8'), true);
  assert.equal(dansPlage('3.0.0', '>=2.0.0 <2.3.2 || >=4.0.0 <4.0.8'), false);
  assert.equal(dansPlage('4.0.7', '>=2.0.0 <2.3.2 || >=4.0.0 <4.0.8'), true);
  assert.equal(dansPlage('1.0.0', '*'), true);
  assert.equal(dansPlage('v6.17.1', '<6.17.1'), false);
  assert.throws(() => dansPlage('4.0.7', '^4.0.0'), /plage illisible/);
  assert.throws(() => dansPlage('latest', '<=4.0.7'), /version illisible/);
});

test('deploy/audit-exceptions.json : chaque exception est complète et couvre 30 jours au plus', () => {
  const { exceptions } = JSON.parse(fs.readFileSync(FICHIER_EXCEPTIONS, 'utf8'));
  assert.ok(Array.isArray(exceptions) && exceptions.length > 0);
  for (const e of exceptions) assert.deepEqual(defautsException(e), [], `${e.avis} (${e.dossier})`);
});
