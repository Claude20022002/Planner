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

test('le comparatif est un composant Astro avec un script du navigateur : ni React, ni client:visible, le repli est dans la page', () => {
  const pourquoi = lire('src/components/accueil/Pourquoi.astro');
  assert.match(pourquoi, /<ComparatifInteractif langue/);
  assert.equal(/client:/.test(pourquoi), false);
  const composant = lire('src/components/accueil/ComparatifInteractif.astro');
  assert.match(composant, /<TableauComparatif[^>]*court/);
  assert.match(composant, /<CartesComparatif[^>]*court/);
  assert.match(composant, /<script>/);
  assert.equal(fs.existsSync(path.join(VITRINE, 'src/components/accueil/ComparatifInteractif.jsx')), false);
  assert.equal(/from 'react'|client:|\.jsx/.test(composant), false);
});

test('le comparatif : onglets accessibles, titre en aria-live seul, mouvement réduit respecté, animate de motion, sans boucle', () => {
  const composant = lire('src/components/accueil/ComparatifInteractif.astro');
  for (const attribut of ['role="tablist"', 'role="tab"', 'role="tabpanel"', 'aria-selected', 'aria-controls', 'aria-labelledby']) {
    assert.ok(composant.includes(attribut), attribut);
  }
  assert.equal((composant.match(/aria-live="polite"/g) || []).length, 1, 'seulement sur le titre');
  assert.match(composant, /prefers-reduced-motion: reduce/);
  assert.match(composant, /if \(!reduit\) animate\(/);
  assert.match(composant, /import \{ animate, stagger \} from 'motion'/);
  for (const touche of ['ArrowRight', 'ArrowLeft', 'Home', 'End']) assert.ok(composant.includes(touche), touche);
  assert.equal(/repeat\s*:|Infinity|setInterval/.test(composant), false);
  assert.ok(composant.split('\n').length <= 150);
});

test('aucune dépendance nouvelle : package.json garde ses trois dépendances', () => {
  const paquet = JSON.parse(lire('package.json'));
  assert.deepEqual(Object.keys(paquet.dependencies).sort(), ['@fontsource-variable/inter', 'lucide-react', 'motion']);
});
