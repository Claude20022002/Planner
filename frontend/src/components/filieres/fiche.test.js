/** Vérifie la saisie des champs facultatifs d’une filière. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { entierOuNull } from './fiche.js';

test('les champs absents et les entiers renseignés restent distincts', () => {
  for (const vide of ['', null, undefined]) assert.equal(entierOuNull(vide), null);
  assert.equal(entierOuNull('2'), 2);
  assert.equal(entierOuNull('0'), 0);
});
