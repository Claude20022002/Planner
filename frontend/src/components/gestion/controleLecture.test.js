/** Régressions de la garde de lecture employée par les quatre écrans. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { creerControleLecture } from './controleLecture.js';

test('une réponse lente devient périmée dès le changement de filtre', async () => {
  const controle = creerControleLecture();
  const ancienne = controle.commencer();
  const ancienneReponse = Promise.withResolvers();
  const resultats = [];
  const attente = ancienneReponse.promise.then((lignes) => {
    if (ancienne()) resultats.push(...lignes);
  });

  controle.invalider();
  const recente = controle.commencer();
  if (recente()) resultats.push('filière active');
  ancienneReponse.resolve(['ancienne filière']);
  await attente;

  assert.deepEqual(resultats, ['filière active']);
});

test('une nouvelle lecture invalide la précédente et une fermeture invalide les deux', () => {
  const controle = creerControleLecture();
  const premiere = controle.commencer();
  const seconde = controle.commencer();

  assert.equal(premiere(), false);
  assert.equal(seconde(), true);
  controle.invalider();
  assert.equal(seconde(), false);
});
