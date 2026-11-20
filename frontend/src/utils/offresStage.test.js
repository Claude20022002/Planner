/**
 * Affichage des offres de stage (STA-01). Lancé par `npm run test:unit`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dateCourte, lienCandidature, lienPartage, periodeDe, prixAffiche } from './offresStage.js';

test('une date du serveur se lit en JJ/MM/AAAA, sans dépendre du fuseau', () => {
  assert.equal(dateCourte('2026-09-01'), '01/09/2026');
  assert.equal(dateCourte('2026-12-31'), '31/12/2026');
  // Valeur d'une colonne DATE venue en ISO complet, ou vide : pas de date affichée
  assert.equal(dateCourte('2026-09-01T00:00:00.000Z'), null);
  assert.equal(dateCourte(null), null);
  assert.equal(dateCourte(undefined), null);
});

test('la période d’une offre distingue les deux bornes, le début seul et la fin seule', () => {
  assert.deepEqual(periodeDe({ debut: '2026-09-01', fin: '2026-12-31' }), { type: 'periode', debut: '01/09/2026', fin: '31/12/2026' });
  assert.deepEqual(periodeDe({ debut: '2026-09-01', fin: null }), { type: 'debut', debut: '01/09/2026' });
  assert.deepEqual(periodeDe({ debut: null, fin: '2026-12-31' }), { type: 'fin', fin: '31/12/2026' });
  assert.deepEqual(periodeDe({}), { type: null });
  assert.deepEqual(periodeDe(null), { type: null });
});

test('le prix est celui saisi, dans sa devise, ou rien', () => {
  assert.equal(prixAffiche({ gratification: '1500.00', devise: 'MAD' }), '1\u202F500 MAD');
  assert.equal(prixAffiche({ gratification: 1500.5, devise: 'EUR' }), '1\u202F500,50 EUR');
  assert.equal(prixAffiche({ gratification: 0, devise: 'MAD' }), '0 MAD');
  assert.equal(prixAffiche({ gratification: null, devise: 'MAD' }), null);
  assert.equal(prixAffiche({}), null);
});

test('le lien de partage passe par le jeton, et reste vide sans jeton', () => {
  const jeton = 'a'.repeat(32);
  assert.equal(lienPartage(jeton, 'https://planner.hestim.ma'), `https://planner.hestim.ma/offres-stage/p/${jeton}`);
  assert.equal(lienPartage(null, 'https://planner.hestim.ma'), null);
});

test('un lien de candidature non http(s) n’est pas proposé', () => {
  assert.equal(lienCandidature({ lien_candidature: 'https://exemple.ma/stage' }), 'https://exemple.ma/stage');
  assert.equal(lienCandidature({ lien_candidature: 'http://exemple.ma/stage' }), 'http://exemple.ma/stage');
  assert.equal(lienCandidature({ lien_candidature: 'javascript:alert(1)' }), null);
  assert.equal(lienCandidature({ lien_candidature: 'exemple.ma/stage' }), null);
  assert.equal(lienCandidature({}), null);
});
