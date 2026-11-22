/** Vérifie l'année choisie, les formulaires, les données envoyées et la cible lisible d'un événement du calendrier. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { ANNEE_VIDE } from './constantes.js';
import {
  anneeChoisie,
  datesAConfirmer,
  donneesEvenement,
  donneesPeriode,
  formulaireAnnee,
  formulaireEvenement,
  formulairePeriode,
  nomCible,
} from './calendrier.js';

const annees = [
  { id_annee: 1, libelle: '2025-2026', active: false },
  { id_annee: 2, libelle: '2026-2027', active: true },
];

test('l’année affichée reste choisie ; sinon l’année active, sinon la première, sinon aucune', () => {
  assert.equal(anneeChoisie(annees, 1), 1);
  assert.equal(anneeChoisie(annees, 9), 2);
  assert.equal(anneeChoisie([{ id_annee: 4, active: false }], null), 4);
  assert.equal(anneeChoisie([], 1), null);
});

test('les formulaires d’année et de semestre reprennent l’existant ; un nouveau semestre prend S2 après S1', () => {
  assert.deepEqual(formulaireAnnee(null), ANNEE_VIDE);
  const annee = { libelle: '2026-2027', date_debut: '2026-09-01', date_fin: '2027-07-15', active: true, periodes: [{ code: 'S1' }] };
  assert.deepEqual(formulaireAnnee(annee), { libelle: '2026-2027', date_debut: '2026-09-01', date_fin: '2027-07-15', active: true });
  assert.equal(formulairePeriode(null, annee).code, 'S2');
  assert.equal(formulairePeriode(null, { periodes: [] }).code, 'S1');
  const periode = { code: 'S2', libelle: null, date_debut: '2027-02-01', date_fin: '2027-06-30', nb_semaines: 15, id_periode: 3 };
  assert.deepEqual(formulairePeriode(periode, annee), { code: 'S2', libelle: '', date_debut: '2027-02-01', date_fin: '2027-06-30', nb_semaines: 15 });
  assert.deepEqual(donneesPeriode({ code: 'S1', libelle: '', nb_semaines: '16' }), { code: 'S1', libelle: null, nb_semaines: 16 });
});

test('un événement : heures sur cinq caractères, date de l’année par défaut, cible et niveau seulement s’il le faut', () => {
  assert.equal(formulaireEvenement(null, { date_debut: '2026-09-01' }).date_fin, '2026-09-01');
  const lu = formulaireEvenement({ titre: 'Examens', id_cible: null, heure_debut: '08:30:00', heure_fin: null, description: null }, null);
  assert.deepEqual([lu.id_cible, lu.heure_debut, lu.heure_fin, lu.description], ['', '08:30', '', '']);
  const commun = { titre: 'T', date_debut: '2026-10-01', date_fin: '2026-10-02', type_evenement: 'autre', bloque_affectations: true };
  const etablissement = donneesEvenement({ ...commun, portee: 'etablissement', id_cible: '4', niveau: 'L3', description: '', heure_debut: '', heure_fin: '' });
  assert.deepEqual([etablissement.id_cible, etablissement.niveau, etablissement.description, etablissement.heure_debut], [null, null, null, null]);
  const niveau = donneesEvenement({ ...commun, portee: 'niveau', id_cible: '4', niveau: 'L3', heure_debut: '10:00', heure_fin: '12:00' });
  assert.deepEqual([niveau.id_cible, niveau.niveau, niveau.heure_fin], [4, 'L3', '12:00']);
});

test('la cible se lit dans les listes, « #id » si elle a disparu ; seules les dates non confirmées restent à confirmer', () => {
  const cibles = { campus: [{ id_campus: 1, nom: 'Campus Nord' }], filieres: [{ id_filiere: 2, nom_filiere: 'Informatique' }], groupes: [] };
  assert.equal(nomCible({ portee: 'etablissement' }, cibles), null);
  assert.equal(nomCible({ portee: 'campus', id_cible: 1 }, cibles), 'Campus Nord');
  assert.equal(nomCible({ portee: 'niveau', id_cible: 2, niveau: 'L3' }, cibles), 'Informatique · L3');
  assert.equal(nomCible({ portee: 'groupe', id_cible: 7 }, cibles), '#7');
  assert.deepEqual(
    datesAConfirmer([
      { id: 1, date_confirmee: true },
      { id: 2, date_confirmee: false },
    ]).map((e) => e.id),
    [2],
  );
});
