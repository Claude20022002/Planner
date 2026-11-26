// Tests du registre des 17 modules (VIT-20, lot R0) : effectif, catégories, état, noms dans les langues publiées,
// logos présents, adresses. Les pages de module existent : tests/applications.test.js (lot B).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES, MODULES, SOCLE, modulesDeCategorie, modulesDisponibles, moduleDe } from '../src/donnees/modules.js';
import { ADRESSE_APPLICATION } from '../src/donnees/site.js';
import { LANGUES, LANGUES_PUBLIEES, chemin, cheminContact, pageModule } from '../src/i18n/langues.js';

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const lire = (langue, page) => JSON.parse(fs.readFileSync(path.join(RACINE, 'vitrine/src/i18n', langue, `${page}.json`), 'utf8'));

test('17 modules, quatre catégories, cinq modules disponibles', () => {
  assert.equal(MODULES.length, 17);
  assert.deepEqual(CATEGORIES, ['organiser', 'enseigner', 'gerer', 'communiquer']);
  assert.deepEqual(modulesDisponibles().map((m) => m.cle), ['emploiDuTemps', 'presences', 'espaceDeCours', 'quizEtJeux', 'annoncesEtMessages']);
  assert.equal(new Set(MODULES.map((m) => m.cle)).size, 17);
  assert.deepEqual(MODULES.map((m) => m.numero).sort((a, b) => a - b), Array.from({ length: 17 }, (_, i) => i + 1));
});

test('chaque module a une catégorie connue, et chaque catégorie contient des modules', () => {
  for (const module of MODULES) assert.ok(CATEGORIES.includes(module.categorie), module.cle);
  assert.deepEqual(CATEGORIES.map((c) => modulesDeCategorie(c).length), [4, 6, 5, 2]);
});

test('un module disponible a une adresse, un module « Bientôt » n\'en a pas', () => {
  for (const module of MODULES) {
    if (module.etat === 'disponible') assert.match(module.segment, /^[a-z]+(-[a-z]+)*$/, module.cle);
    else assert.deepEqual([module.etat, module.segment], ['bientot', null], module.cle);
  }
  assert.equal(chemin('fr', pageModule('presences')), '/fr/applications/presences/');
  assert.equal(chemin('en', pageModule('quizEtJeux'), 'x'), '/en/applications/quiz-et-jeux/#x');
  assert.throws(() => chemin('fr', pageModule('pilotage')), /sans page/);
  assert.throws(() => moduleDe('inconnu'));
});

test('chaque module a son nom en français et en anglais, et l\'arabe garde les clés vides', () => {
  for (const langue of LANGUES_PUBLIEES) {
    const noms = lire(langue, 'modules').noms;
    for (const module of MODULES) assert.ok(noms[module.cle]?.trim(), `${langue}/${module.cle}`);
  }
  assert.deepEqual(Object.keys(lire('ar', 'modules').noms), Object.keys(lire('fr', 'modules').noms));
  assert.ok(LANGUES.includes('ar'));
});

test('les libellés du § 4.7 sont dans commun.json, dans les langues publiées', () => {
  for (const langue of LANGUES_PUBLIEES) {
    const c = lire(langue, 'commun');
    for (const cle of ['applications', 'etablissements', 'demonstration', 'seConnecter', 'toutesLesApplications', 'voirLesApplications', 'unBesoin',
      'toutesLesFonctionnalites', 'apercu', 'fonctionnalites']) assert.ok(c.navigation[cle], `${langue}/${cle}`);
    for (const cle of SOCLE.concat('titre')) assert.ok(c.socle[cle], `${langue}/socle.${cle}`);
    for (const cle of CATEGORIES) assert.ok(c.categories[cle], `${langue}/categories.${cle}`);
    assert.ok(c.pourQui.titre && c.equipement.titre);
  }
});

test('les 17 modules utilisent les SVG officiels de la série B', () => {
  const logos = {
    emploiDuTemps: 'planning',
    presences: 'presences',
    espaceDeCours: 'cours',
    quizEtJeux: 'activites',
    bibliotheque: 'bibliotheque',
    annoncesEtMessages: 'annonces',
    vacatairesEtHeures: 'vacataires',
    evaluations: 'evaluations',
    inscriptions: 'inscriptions',
    documentsVerifiables: 'documents',
    stages: 'stages',
    fraisEtCaisse: 'frais',
    formationEtFinanceurs: 'formation',
    vieScolaire: 'familles',
    paiementsEnLigne: 'paiements',
    echangesAvecEtat: 'etat',
    pilotage: 'pilotage',
  };
  assert.deepEqual(Object.fromEntries(MODULES.map(({ cle, logo }) => [cle, logo])), logos);
  for (const [cle, logo] of Object.entries(logos)) {
    assert.ok(fs.existsSync(path.join(RACINE, 'shared/icones/modules', `${logo}.svg`)), cle);
  }
});

test('le helper garde une place réservée au cadre et au rayon de la série B', async () => {
  const { createServer } = await import('vite');
  const serveur = await createServer({
    root: path.join(RACINE, 'vitrine'),
    configFile: false,
    server: { middlewareMode: true, watch: null },
    appType: 'custom',
  });
  try {
    const { logoModule } = await serveur.ssrLoadModule('/src/components/applications/logos.js');
    const svg = logoModule({ logo: null });
    assert.match(svg, /viewBox="0 0 96 96"/);
    assert.match(svg, /<rect x="4" y="4" width="88" height="88" rx="19\.5"/);
  } finally {
    await serveur.close();
  }
});

test('l\'adresse de l\'application est vide tant qu\'elle n\'est pas décidée, et le contact mène à l\'accueil', () => {
  assert.equal(ADRESSE_APPLICATION, '');
  assert.equal(cheminContact('fr'), '/fr/#contact');
});
