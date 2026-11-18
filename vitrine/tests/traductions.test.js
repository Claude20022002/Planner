// Tests des traductions du site vitrine : fusion avec le français, lecture des clés, et même forme
// de dictionnaire dans les trois langues (un texte ajouté en français doit exister partout).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fusionner, lire, forme } from '../src/i18n/traduire.js';
import { LANGUES, LANGUE_SECOURS, chemin, direction } from '../src/i18n/langues.js';

const DOSSIER = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n');
const charger = (langue, page) => JSON.parse(fs.readFileSync(path.join(DOSSIER, langue, page), 'utf8'));
const pages = fs.readdirSync(path.join(DOSSIER, LANGUE_SECOURS)).filter((f) => f.endsWith('.json'));

test('un texte vide ou absent prend le texte français', () => {
  const secours = { a: 'A', b: { c: 'C' }, l: ['x', 'y'] };
  assert.deepEqual(fusionner(secours, { a: '', b: {}, l: ['', 'Y'] }), { a: 'A', b: { c: 'C' }, l: ['x', 'Y'] });
  assert.deepEqual(fusionner(secours, undefined), secours);
});

test('un texte traduit remplace le français', () => {
  assert.deepEqual(fusionner({ a: 'A' }, { a: 'Ä' }), { a: 'Ä' });
});

test('une clé absente casse le build au lieu d’afficher un vide', () => {
  assert.equal(lire({ a: { b: 'ok' } }, 'a.b'), 'ok');
  assert.throws(() => lire({ a: {} }, 'a.z'), /Texte manquant : a\.z/);
});

for (const page of pages) {
  for (const langue of LANGUES.filter((l) => l !== LANGUE_SECOURS)) {
    test(`${langue}/${page} a les mêmes clés que ${LANGUE_SECOURS}/${page}`, () => {
      assert.deepEqual(forme(charger(langue, page)), forme(charger(LANGUE_SECOURS, page)));
    });
  }
}

test('les chemins et le sens d’écriture', () => {
  assert.equal(chemin('fr'), '/fr/');
  assert.equal(chemin('en', 'securite'), '/en/securite/');
  assert.equal(chemin('fr', 'accueil', 'contact'), '/fr/#contact');
  assert.throws(() => chemin('fr', 'inconnue'));
  assert.equal(direction('ar'), 'rtl');
  assert.equal(direction('fr'), 'ltr');
});
