/** Vérifie les jours, les rangs, le chevauchement et le contrôle des heures d'une grille horaire. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { chevauchePrecedent, enMinutes, finApresDebut, indexer, joursAffiches, rangs } from './grille.js';

const grille = [
  { jour_semaine: 'lundi', rang: 1, heure_debut: '08:30:00', heure_fin: '10:00:00' },
  { jour_semaine: 'lundi', rang: 2, heure_debut: '09:45:00', heure_fin: '11:15:00' },
  { jour_semaine: 'mardi', rang: 3, heure_debut: '13:00:00', heure_fin: '14:30:00' },
];

test('les heures se lisent en minutes, secondes ou non', () => {
  assert.equal(enMinutes('08:30'), 510);
  assert.equal(enMinutes('08:30:00'), 510);
});

test('le dimanche n’apparaît que s’il porte un créneau', () => {
  assert.equal(joursAffiches(grille).includes('dimanche'), false);
  assert.equal(joursAffiches([...grille, { jour_semaine: 'dimanche', rang: 1 }]).at(-1), 'dimanche');
});

test('les rangs vont de 1 au plus haut, même avec des trous', () => {
  assert.deepEqual(rangs(grille), [1, 2, 3]);
  assert.deepEqual(rangs([]), []);
});

test('un créneau qui commence avant la fin du précédent chevauche', () => {
  const cellule = indexer(grille);
  assert.equal(cellule('mardi', 3), grille[2]);
  assert.equal(cellule('mardi', 1), undefined);
  assert.equal(chevauchePrecedent(grille[1], cellule), true);
  assert.equal(chevauchePrecedent(grille[0], cellule), false);
  assert.equal(chevauchePrecedent(grille[2], cellule), false);
});

test('la fin doit suivre le début, les deux heures saisies', () => {
  assert.equal(finApresDebut({ heure_debut: '08:00', heure_fin: '09:00' }), true);
  assert.equal(finApresDebut({ heure_debut: '09:00', heure_fin: '09:00' }), false);
  assert.equal(finApresDebut({ heure_debut: '', heure_fin: '09:00' }), false);
});
