/**
 * Mode de la page de l'appel (M-1) : hors délai, à venir ou annulée, la page reste en lecture,
 * sans saisie ni « Terminer » (relecture du coordinateur). Lancé par `npm run test:unit`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { modeDeLaPage } from './modeAppel.js';

test('un appel existant : terminé, il s’affiche ; ouvert, il continue', () => {
  assert.equal(modeDeLaPage({ appel: { ouvert: false } }, null), 'ferme');
  assert.equal(modeDeLaPage({ appel: { ouvert: true } }, null), 'ouvrir');
});

test('sans appel : le jour même, l’appel ordinaire ; dans le délai, la saisie après coup', () => {
  assert.equal(modeDeLaPage({ appel: null }, { mode: 'jour' }), 'ouvrir');
  assert.equal(modeDeLaPage({ appel: null }, { mode: 'apres_coup', saisie_possible_jusqu_au: '2026-11-27' }), 'apres_coup');
});

test('hors délai, à venir, annulée, ou état inconnu : la page reste en lecture', () => {
  for (const mode of ['hors_delai', 'a_venir', 'annulee', 'autre']) assert.equal(modeDeLaPage({ appel: null }, { mode }), 'lecture', mode);
  assert.equal(modeDeLaPage({ appel: null }, null), 'lecture');
});
