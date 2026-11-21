/** Vérifie le formulaire des campus, leurs paires et la durée de trajet acceptée. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPUS_VIDE, donneesCampus, dureeValide, formulaireDepuisCampus, minutesEnregistrees, minutesSaisies, pairesDe } from './fiche.js';

test('le formulaire reprend un campus existant et envoie une adresse vide comme nulle', () => {
  assert.deepEqual(formulaireDepuisCampus(null), CAMPUS_VIDE);
  const form = formulaireDepuisCampus({ code: 'N', nom: 'Campus Nord', adresse: null, actif: false });
  assert.deepEqual(form, { code: 'N', nom: 'Campus Nord', adresse: '', actif: false });
  assert.deepEqual(donneesCampus({ ...form, code: ' N ', nom: ' Nord ', adresse: '  ' }), {
    code: 'N',
    nom: 'Nord',
    adresse: null,
    actif: false,
  });
});

test('chaque paire de campus apparaît une fois, le plus petit identifiant d’abord', () => {
  const campus = [{ id_campus: 3 }, { id_campus: 1 }, { id_campus: 2 }];
  assert.deepEqual(
    pairesDe(campus).map((p) => p.cle),
    ['1-3', '2-3', '1-2'],
  );
  assert.deepEqual(pairesDe([{ id_campus: 1 }]), []);
});

test('les temps enregistrés se retrouvent par paire', () => {
  const trajets = [{ id_campus_a: 1, id_campus_b: 2, minutes: 25 }];
  assert.deepEqual(minutesSaisies(trajets), { '1-2': '25' });
  assert.equal(minutesEnregistrees(trajets).get('1-2'), 25);
  assert.deepEqual(minutesSaisies(undefined), {});
});

test('une durée de trajet est un entier entre 0 et 240 minutes', () => {
  for (const bonne of [0, 30, 240]) assert.equal(dureeValide(bonne), true);
  for (const mauvaise of [-1, 241, 12.5, Number.NaN]) assert.equal(dureeValide(mauvaise), false);
});
