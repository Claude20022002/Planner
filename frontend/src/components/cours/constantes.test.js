/** Couvre la correspondance des filtres et le traitement des champs numériques facultatifs. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { nombreOuNull, periodeDe } from './constantes.js';

test('le semestre est classé par parité', () => {
  assert.equal(periodeDe('S3'), 'S1');
  assert.equal(periodeDe('S10'), 'S2');
});

test('une valeur numérique omise reste facultative et zéro est conservé', () => {
  assert.equal(nombreOuNull(''), null);
  assert.equal(nombreOuNull(undefined), null);
  assert.equal(nombreOuNull('0'), 0);
});
