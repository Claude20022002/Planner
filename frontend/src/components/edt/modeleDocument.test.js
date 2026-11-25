/** EDT-04 : le document et son aide suivent le modèle réglé par l'école, le neutre par défaut. */
import assert from 'node:assert/strict';
import test from 'node:test';
import { estOfficiel, libellesDocument } from './modeleDocument.js';

test('seul « hestim » garde le document officiel', () => {
  const officiel = libellesDocument('hestim');
  assert.deepEqual(officiel, { cleAnnee: 'monthly.year', cleAide: 'monthly.help', codeVisible: true });
  assert.equal(estOfficiel('hestim'), true);
  assert.equal(estOfficiel('planner'), false);
});

test('modèle neutre, absent ou inconnu : année scolaire, aide neutre, pas de ligne de code', () => {
  for (const modele of ['planner', undefined, null, '', 'autre']) {
    assert.deepEqual(libellesDocument(modele), { cleAnnee: 'monthly.anneeScolaire', cleAide: 'monthly.aideNeutre', codeVisible: false });
  }
  assert.equal(estOfficiel(undefined), false);
});
