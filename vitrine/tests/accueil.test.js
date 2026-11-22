// Tests du lot C de VIT-20 (sources) : ordre des sections de l'accueil, sections retirées, îlot du comparatif (chargé à la demande,
// onglets accessibles, mouvement réduit respecté, aucune dépendance nouvelle). Le rendu : tests/accueil.rendu.cjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VITRINE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const lire = (fichier) => fs.readFileSync(path.join(VITRINE, fichier), 'utf8');

test('l\'accueil assemble les sept sections dans l\'ordre du plan (§ 4.3)', () => {
  const page = lire('src/pages/[lang]/index.astro');
  const ordre = ['<Ouverture', '<Applications', '<Video', '<EmploiDuTemps', '<Appel', '<Donnees', '<Pourquoi', '<ParType', '<Contact'];
  const places = ordre.map((balise) => page.indexOf(balise));
  assert.ok(places.every((p) => p > 0), 'une section manque');
  assert.deepEqual([...places].sort((a, b) => a - b), places);
  for (const retiree of ['QuizJeux', 'Report', 'Bientot']) assert.equal(page.includes(`<${retiree}`), false, retiree);
});

test('les sections retirées de l\'accueil ne servent plus : leurs fichiers sont supprimés, sauf Report (page Emploi du temps)', () => {
  for (const fichier of ['QuizJeux', 'Bientot']) assert.equal(fs.existsSync(path.join(VITRINE, `src/components/accueil/${fichier}.astro`)), false, fichier);
  assert.match(lire('src/pages/[lang]/applications/emploi-du-temps.astro'), /<Report /);
});

test('l\'îlot du comparatif se charge quand la section devient visible, avec le tableau de repli en enfants', () => {
  const pourquoi = lire('src/components/accueil/Pourquoi.astro');
  assert.match(pourquoi, /<ComparatifInteractif client:visible/);
  assert.match(pourquoi, /<TableauComparatif[^>]*court/);
  assert.equal(pourquoi.includes('client:load'), false);
});

test('l\'îlot : onglets accessibles, titre en aria-live seul, mouvement réduit respecté, sans boucle', () => {
  const ilot = lire('src/components/accueil/ComparatifInteractif.jsx');
  for (const attribut of ['role="tablist"', 'role="tab"', 'role="tabpanel"', 'aria-selected', 'aria-controls', 'aria-labelledby']) assert.ok(ilot.includes(attribut), attribut);
  assert.equal((ilot.match(/aria-live="polite"/g) || []).length, 2, 'seulement sur le titre de la colonne ou du critère');
  assert.match(ilot, /prefers-reduced-motion: reduce/);
  assert.match(ilot, /ArrowRight/);
  assert.match(ilot, /ArrowLeft/);
  assert.equal(/repeat\s*:|Infinity|setInterval/.test(ilot), false);
  assert.ok(ilot.split('\n').length <= 150);
});

test('aucune dépendance nouvelle : package.json garde ses trois dépendances', () => {
  const paquet = JSON.parse(lire('package.json'));
  assert.deepEqual(Object.keys(paquet.dependencies).sort(), ['@fontsource-variable/inter', 'lucide-react', 'motion']);
});
