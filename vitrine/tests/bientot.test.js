// Correspondance entre le catalogue des modules, les textes visés et les dictionnaires de « Bientôt ».
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MODULES } from '../src/donnees/modules.js';

const charger = (langue) => JSON.parse(readFileSync(new URL('../src/i18n/' + langue + '/bientot.json', import.meta.url)));
const modulesBientot = MODULES.filter(({ etat }) => etat === 'bientot');
const plan = readFileSync(new URL('../../docs/conception/vitrine/vit-22-bientot-modules.md', import.meta.url), 'utf8');
const phrasesVisees = new Map([...plan.matchAll(/^\| (\d+|M) \| [^|\n]+ \| [^|\n]+ \| ([^|\n]+) \| ([^|\n]+) \|/gm)]
  .map(([, numero, fr, en]) => [numero, { fr: fr.trim(), en: en.trim() }]));

for (const langue of ['fr', 'en']) {
  test(langue + ' · une phrase visée par module en préparation', () => {
    const textes = charger(langue);
    assert.equal(modulesBientot.length, 12);
    for (const { cle, numero } of modulesBientot) {
      assert.equal(textes.modules[cle], phrasesVisees.get(String(numero))[langue], cle);
    }
    for (const [cle, phrase] of Object.entries(textes.modules)) {
      assert.ok(MODULES.some((module) => module.cle === cle), cle);
      assert.equal(typeof phrase, 'string', cle);
    }
    assert.equal(textes.meta.description, phrasesVisees.get('M')[langue]);
  });
}

test('ar · mêmes clés dans les trois langues, avec des textes vides en arabe', () => {
  const structure = (valeur) => (typeof valeur === 'string' ? '' : Array.isArray(valeur) ? valeur.map(structure)
    : Object.fromEntries(Object.entries(valeur).map(([cle, contenu]) => [cle, structure(contenu)])));
  const fr = structure(charger('fr'));
  assert.deepEqual(structure(charger('en')), fr);
  assert.deepEqual(charger('ar'), fr);
});
