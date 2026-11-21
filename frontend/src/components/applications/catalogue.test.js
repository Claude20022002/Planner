/** Régression : aucune entrée perdue, alias cohérents et recherche traduite sans mutation. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construireApplications, trouverApplication, filtrerApplications } from './catalogue.js';
import fr from '../../i18n/applications.fr.js';
import en from '../../i18n/applications.en.js';
import frGeneral from '../../i18n/fr.js';
import enGeneral from '../../i18n/en.js';
const entree = (key, path, aussi) => ({ key, path, aussi });
const sections = [{ items: [
  entree('nav.dashboard', '/dashboard/admin'),
  entree('nav.timetables', '/gestion/emplois-du-temps', ['/gestion/affectations']),
  entree('nav.courses', '/gestion/cours'), entree('nav.students', '/gestion/etudiants'),
  entree('nav.myClasses', '/mes-classes'), entree('nav.myQuizzes', '/studio-quiz'),
  entree('nav.announcements', '/annonces'), entree('nav.library', '/biblio/documents'),
  entree('nav.identity', '/gestion/identite'),
] }];
const catalogue = construireApplications(sections);
const t = (langue) => (cle) => {
  const dictionnaire = cle.startsWith('applications.') ? { applications: langue } : (langue === fr ? frGeneral : enGeneral);
  return cle.split('.').reduce((v, k) => v?.[k], dictionnaire) ?? '';
};
test('toutes les rubriques restent atteignables une seule fois', () => {
  assert.deepEqual(catalogue.flatMap((a) => a.rubriques.map((r) => r.path)).sort(), sections[0].items.map((r) => r.path).sort());
});
test('les permissions ne sont pas élargies par le catalogue', () => {
  const etudiant = construireApplications([{ items: [entree('nav.timetable', '/emploi-du-temps/etudiant'), entree('nav.takeQuiz', '/quiz')] }]);
  assert.deepEqual(etudiant.map((a) => a.id), ['planning', 'activites']);
  assert.equal(trouverApplication(etudiant, '/gestion/utilisateurs'), undefined);
});
test('les alias et sous-pages retrouvent leur application', () => {
  assert.equal(trouverApplication(catalogue, '/gestion/affectations?mois=01').id, 'planning');
  assert.equal(trouverApplication(catalogue, '/mes-classes/12/4').id, 'pedagogie');
  assert.equal(trouverApplication(catalogue, '/studio-quiz/42').id, 'activites');
  assert.equal(trouverApplication(catalogue, '/mes-classes-inconnues'), undefined);
});
test('les routes communes inconnues gardent le repli du menu', () => {
  assert.equal(trouverApplication(catalogue, '/parametres'), undefined);
  assert.equal(trouverApplication(catalogue, '/applications'), undefined);
});
test('la recherche ignore accents et casse et cherche aussi les rubriques', () => {
  assert.deepEqual(filtrerApplications(catalogue, '  ETUDIANTS ', t(fr)).map((a) => a.id), ['personnes']);
  assert.deepEqual(filtrerApplications(catalogue, 'matieres', t(fr))[0].rubriques.map((r) => r.path), ['/gestion/cours', '/mes-classes']);
});
test('la recherche utilise la langue courante', () => {
  assert.equal(filtrerApplications(catalogue, 'timetable', t(en))[0].id, 'planning');
  assert.equal(filtrerApplications(catalogue, 'timetable', t(fr)).length, 0);
});
test('les mots se combinent, recherche vide et aucun résultat', () => {
  assert.equal(filtrerApplications(catalogue, 'etablissement configuration', t(fr))[0].id, 'etablissement');
  assert.equal(filtrerApplications(catalogue, 'impossible', t(fr)).length, 0);
  assert.deepEqual(filtrerApplications(catalogue, ' ', t(fr)), catalogue);
});
test('ni classement ni recherche ne modifient la navigation', () => {
  const initial = JSON.stringify(sections);
  filtrerApplications(catalogue, 'matiere', t(fr));
  construireApplications(sections);
  assert.equal(JSON.stringify(sections), initial);
});
