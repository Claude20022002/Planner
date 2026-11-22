// Tests du lot B de VIT-20 (sources, sans build) : une page par module disponible et pour le socle, registre rangé par module,
// anciennes adresses qui redirigent, liens des pages par type et par rôle. Le rendu est vérifié par tests/applications.rendu.cjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../astro.config.mjs';
import entrees from '../src/donnees/fonctionnalites.json' with { type: 'json' };
import { CLES_REGISTRE, lienEntree, entreeBientot } from '../src/components/catalogue/registre.js';
import { MODULES, modulesDisponibles } from '../src/donnees/modules.js';
import { TYPES } from '../src/components/solutions/types.js';
import { LANGUES_PUBLIEES, ROLES, chemin, pageModule } from '../src/i18n/langues.js';

const VITRINE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = path.join(VITRINE, 'src', 'pages', '[lang]');
const lire = (langue, page) => JSON.parse(fs.readFileSync(path.join(VITRINE, 'src', 'i18n', langue, `${page}.json`), 'utf8'));

test('chaque module disponible a sa page, et chaque page de applications/ est celle d\'un module disponible', () => {
  const segments = modulesDisponibles().map((module) => module.segment).sort();
  const fichiers = fs.readdirSync(path.join(PAGES, 'applications')).map((f) => f.replace('.astro', '')).filter((f) => f !== 'index').sort();
  assert.deepEqual(fichiers, segments);
  assert.ok(fs.existsSync(path.join(PAGES, 'applications', 'index.astro')));
  assert.ok(fs.existsSync(path.join(PAGES, 'socle.astro')));
});

test('les pages de fonction d\'avant sont supprimées', () => {
  for (const page of ['emploi-du-temps', 'en-classe', 'cours-et-annonces', 'quiz-et-jeux', 'etablissement', 'application', 'bibliotheque']) {
    assert.equal(fs.existsSync(path.join(PAGES, `${page}.astro`)), false, page);
  }
});

test('chaque entrée du registre a un module connu, et aucune n\'a plus de champ page', () => {
  for (const entree of entrees) {
    assert.ok(CLES_REGISTRE.includes(entree.module), entree.id);
    assert.equal('page' in entree, false, entree.id);
  }
  assert.equal(CLES_REGISTRE.length, 18);
});

test('une entrée d\'un module « Bientôt » porte le badge, et mène à « Toutes les applications »', () => {
  const biblio = entrees.find((entree) => entree.module === 'bibliotheque');
  assert.equal(entreeBientot(biblio), true);
  assert.equal(lienEntree('fr', biblio), '/fr/applications/');
  const appel = entrees.find((entree) => entree.id === 'appel');
  assert.equal(entreeBientot(appel), false);
  assert.equal(lienEntree('fr', appel), '/fr/applications/presences/');
  assert.equal(lienEntree('en', entrees.find((entree) => entree.id === 'comptes')), '/en/socle/');
});

test('chaque ancienne adresse redirige vers la bonne page, dans chaque langue publiée', () => {
  const attendu = {
    'emploi-du-temps': 'applications/emploi-du-temps/', 'en-classe': 'applications/presences/', 'cours-et-annonces': 'applications/espace-de-cours/',
    'quiz-et-jeux': 'applications/quiz-et-jeux/', etablissement: 'socle/', application: 'socle/', bibliotheque: 'applications/',
  };
  for (const langue of LANGUES_PUBLIEES) {
    for (const [ancien, nouveau] of Object.entries(attendu)) assert.equal(config.redirects[`/${langue}/${ancien}/`], `/${langue}/${nouveau}`, ancien);
  }
  assert.equal(Object.keys(config.redirects).length, 7 * LANGUES_PUBLIEES.length);
});

test('les pages par type et par rôle mènent à des pages qui existent', () => {
  const cibles = [...TYPES.flatMap((type) => type.pages), ...ROLES.flatMap((role) => lire('fr', role).cartes.map((carte) => carte.page))];
  for (const cible of cibles) assert.doesNotThrow(() => chemin('fr', cible), cible);
  for (const cible of cibles.filter((c) => c.startsWith('module.'))) {
    assert.equal(MODULES.find((m) => pageModule(m.cle) === cible)?.etat, 'disponible', cible);
  }
  for (const role of ROLES) {
    assert.deepEqual(lire('en', role).cartes.map((c) => c.page), lire('fr', role).cartes.map((c) => c.page), role);
  }
});

test('aucun lien du site ne vise plus une page de fonction supprimée', () => {
  const anciens = /chemin\(\s*\w+,\s*'(enClasse|coursEtAnnonces|bibliotheque|application|etablissement)'/;
  const lister = (dossier) => fs.readdirSync(dossier, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? lister(path.join(dossier, e.name)) : [path.join(dossier, e.name)]));
  for (const fichier of lister(path.join(VITRINE, 'src')).filter((f) => /\.(astro|js)$/.test(f))) {
    assert.doesNotMatch(fs.readFileSync(fichier, 'utf8'), anciens, path.relative(VITRINE, fichier));
  }
});
