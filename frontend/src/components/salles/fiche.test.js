/** Vérifie le passage salle ↔ formulaire ↔ envoi, les contrôles locaux, le filtre et l'étage des salles. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { SALLE_VIDE, cleEtage, donneesSalle, erreursSalle, filtrerSalles, formulaireDepuisSalle } from './fiche.js';

const salle = {
  id_salle: 7,
  nom_salle: 'N-101',
  type_salle: 'Salle TD',
  id_campus: 2,
  capacite: 30,
  capacite_examen: null,
  etage: 0,
  equipements: ['Vidéoprojecteur'],
  reservable_par: 'enseignants',
  disponible: false,
  campus: { code: 'N', nom: 'Campus Nord' },
};

test('une salle nouvelle part du campus par défaut, une salle existante garde ses champs', () => {
  assert.deepEqual(formulaireDepuisSalle(null, 3), { ...SALLE_VIDE, id_campus: 3 });
  const form = formulaireDepuisSalle(salle);
  assert.equal(form.capacite_examen, '');
  assert.equal(form.etage, 0);
  assert.equal(form.reservable_par, 'enseignants');
  assert.equal(form.disponible, false);
});

test('les champs requis et la capacité sont contrôlés avant l’envoi', () => {
  assert.deepEqual(erreursSalle({ ...SALLE_VIDE, nom_salle: '  ' }), {
    nom_salle: 'required',
    type_salle: 'required',
    id_campus: 'required',
    capacite: 'capacityInvalid',
  });
  assert.deepEqual(erreursSalle(formulaireDepuisSalle(salle)), {});
});

test('la capacité d’examen ne dépasse jamais la capacité', () => {
  const form = { ...formulaireDepuisSalle(salle), capacite_examen: '31' };
  assert.deepEqual(erreursSalle(form), { capacite_examen: 'examTooHigh' });
  assert.deepEqual(erreursSalle({ ...form, capacite_examen: '30' }), {});
});

test('l’envoi convertit les nombres et garde vides les champs facultatifs', () => {
  const data = donneesSalle({ ...formulaireDepuisSalle(salle), nom_salle: ' N-101 ', etage: '', capacite: '30', id_campus: '2' });
  assert.equal(data.nom_salle, 'N-101');
  assert.equal(data.capacite, 30);
  assert.equal(data.id_campus, 2);
  assert.equal(data.capacite_examen, null);
  assert.equal(data.etage, null);
  assert.equal(donneesSalle({ ...formulaireDepuisSalle(salle), etage: '-1' }).etage, -1);
});

test('le filtre combine le campus et la recherche, équipements compris', () => {
  const autre = { ...salle, id_salle: 8, nom_salle: 'S-Amphi', equipements: [], campus: { code: 'S', nom: 'Campus Sud' } };
  assert.deepEqual(filtrerSalles([salle, autre], 'tous', ''), [salle, autre]);
  assert.deepEqual(filtrerSalles([salle, autre], 'S', ''), [autre]);
  assert.deepEqual(filtrerSalles([salle, autre], 'tous', 'vidéo'), [salle]);
  assert.deepEqual(filtrerSalles([salle, autre], 'S', 'vidéo'), []);
});

test('l’étage distingue rez-de-chaussée, sous-sol, étage et absence', () => {
  assert.equal(cleEtage(null), null);
  assert.equal(cleEtage(undefined), null);
  assert.deepEqual(cleEtage(0), ['groundFloor', {}]);
  assert.deepEqual(cleEtage(-2), ['basement', {}]);
  assert.deepEqual(cleEtage(3), ['floorN', { n: 3 }]);
});
