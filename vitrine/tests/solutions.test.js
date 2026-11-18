// Tests de la page « Solutions » (VIT-05, préparation) : adresse et place dans la navigation, un
// point « Aujourd'hui » et un point « Bientôt » au moins par type, des liens vers des pages qui
// existent, et aucun prix dans les textes (vente gelée, décision du chef du 18 nov.).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGUES, LANGUES_PUBLIEES, NAVIGATION, PAGES, chemin } from '../src/i18n/langues.js';
import { TYPES } from '../src/components/solutions/types.js';

const DOSSIER = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n');
const charger = (langue) => JSON.parse(fs.readFileSync(path.join(DOSSIER, langue, 'solutions.json'), 'utf8'));

/** Toutes les chaînes d'un dictionnaire, à plat */
const chaines = (valeur) => (typeof valeur === 'string' ? [valeur] : Object.values(valeur).flatMap(chaines));

test('la page a son adresse, et « Solutions » ouvre la navigation', () => {
  assert.equal(chemin('fr', 'solutions'), '/fr/solutions/');
  assert.equal(chemin('ar', 'solutions'), '/ar/solutions/');
  assert.equal(NAVIGATION[0], 'solutions');
});

test('les trois types, dans l’ordre du plan, avec des ancres distinctes', () => {
  assert.deepEqual(TYPES.map((type) => type.cle), ['collegeLycee', 'superieur', 'formation']);
  assert.equal(new Set(TYPES.map((type) => type.ancre)).size, TYPES.length);
});

test('chaque point « Aujourd’hui » renvoie à une page qui existe', () => {
  for (const type of TYPES) {
    for (const page of type.pages) assert.ok(page in PAGES && page !== 'solutions', `${type.cle} → ${page}`);
  }
});

for (const langue of LANGUES_PUBLIEES) {
  test(`${langue} : chaque type a au moins un point « Aujourd’hui », un point « Bientôt », et un lien par point`, () => {
    const textes = charger(langue);
    assert.deepEqual(Object.keys(textes.types), TYPES.map((type) => type.cle));
    for (const type of TYPES) {
      const { aujourdhui, bientot } = textes.types[type.cle];
      assert.ok(aujourdhui.length > 0 && bientot.length > 0, type.cle);
      assert.equal(aujourdhui.length, type.pages.length, `${type.cle} : un lien par point`);
      for (const point of [...aujourdhui, ...bientot]) assert.ok(point.titre && point.texte, type.cle);
    }
  });
}

for (const langue of LANGUES) {
  test(`${langue} : aucun prix sur la page`, () => {
    const prix = /\d+\s*(MAD|DH|€|\$)|\b(MAD|DH)\b|€|\bprix\b|\bprice|\btarif|\bpricing\b|درهم/i;
    for (const texte of chaines(charger(langue))) assert.doesNotMatch(texte, prix);
  });
}
