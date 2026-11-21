/**
 * Entrée Quiz du sélecteur (shared/espaces.js, QJE-01) : Planner, jamais ClassQuiz.
 * Lancé par `npm run test:unit`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { adresseEspace } from '../../../../shared/espaces.js';

const URL = 'https://quiz.exemple.test';

test('l\'enseignant ouvre Activités, avec ou sans ClassQuiz', () => {
  assert.equal(adresseEspace('quiz', { role: 'enseignant' }), '/jeux');
  assert.equal(adresseEspace('quiz', { role: 'enseignant', urlQuiz: URL }), '/jeux');
  assert.equal(adresseEspace('quiz', { role: 'enseignant', urlQuiz: null }), '/jeux');
});

test('l\'étudiant ouvre /quiz, pas le site ClassQuiz', () => {
  assert.equal(adresseEspace('quiz', { role: 'etudiant' }), '/quiz');
  assert.equal(adresseEspace('quiz', { role: 'etudiant', urlQuiz: URL }), '/quiz');
});

test('l\'administration et les autres rôles n\'ont pas l\'entrée', () => {
  assert.equal(adresseEspace('quiz', { role: 'admin', urlQuiz: URL }), null);
  assert.equal(adresseEspace('quiz', { role: 'parent', urlQuiz: URL }), null);
  assert.equal(adresseEspace('quiz', {}), null);
});

test('aucune adresse de Quiz ne contient /play', () => {
  for (const role of ['enseignant', 'etudiant', 'admin', 'parent', undefined]) {
    const adresse = adresseEspace('quiz', { role, urlQuiz: `${URL}/` });
    assert.equal(typeof adresse === 'string' && adresse.includes('/play'), false);
  }
});

test('les autres espaces gardent leur chemin', () => {
  assert.equal(adresseEspace('planner', { role: 'etudiant' }), '/tableau');
  assert.equal(adresseEspace('bibliotheque', { role: 'enseignant' }), '/biblio/documents');
});
