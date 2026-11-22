/**
 * Liste d'appel imprimable (M-1) : l'en-tête de la séance, une ligne par attendu dans l'ordre des
 * noms, trois cases ; les noms échappés ; aucun format de papier imposé, aucune couleur (précision A).
 * Lancé par `npm run test:unit`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fr from '../../i18n/fr.js';
import en from '../../i18n/en.js';
import { echapper, feuilleAppelHtml, ordreDeLaFeuille } from './feuilleAppel.js';

const CLES = ['titre', 'matiere', 'groupe', 'date', 'horaire', 'salle', 'enseignant', 'numero', 'nom', 'prenom', 'present', 'retard', 'absent', 'motif', 'pied', 'imprimeLe', 'aucun'];
const feuilleDe = (dico) => dico.translation?.appel?.feuille ?? dico.appel?.feuille;
const seance = { cours: 'Algorithmique', groupe: 'L1 A', date: '2026-11-20', heure_debut: '08:30', heure_fin: '10:00', salle: 'B12' };
const etudiants = [
  { nom: 'Tazi', prenom: 'Imane' },
  { nom: 'Alami', prenom: 'Yassine' },
  { nom: 'Bennani', prenom: 'Salma' },
];

const page = (autres = {}) => feuilleAppelHtml({ ecole: 'École de démonstration', seance, etudiants, enseignant: 'Nadia Amrani', textes: feuilleDe(fr), locale: 'fr-FR', imprimeLe: '22/11/2026', ...autres });

test("l'en-tête de la séance et une ligne par attendu, dans l'ordre des noms", () => {
  const html = page();
  for (const attendu of ['Liste d’appel', 'École de démonstration', 'Algorithmique', 'L1 A', 'vendredi 20 novembre 2026', '08:30 – 10:00', 'B12', 'Nadia Amrani', 'Imprimée le 22/11/2026']) assert.ok(html.includes(attendu), attendu);
  const ordre = ['Alami', 'Bennani', 'Tazi'].map((nom) => html.indexOf(`<td>${nom}</td>`));
  assert.ok(ordre.every((pos) => pos > 0) && ordre[0] < ordre[1] && ordre[1] < ordre[2]);
  // Trois cases par ligne
  assert.equal(html.match(/class="case"/g).length, etudiants.length * 3);
  assert.deepEqual(ordreDeLaFeuille(etudiants).map((e) => e.nom), ['Alami', 'Bennani', 'Tazi']);
});

test("un nom saisi par l'école ne devient jamais du code dans la page", () => {
  const html = page({ etudiants: [{ nom: '<script>alert(1)</script>', prenom: 'A&B "C"' }] });
  assert.ok(!html.includes('<script>alert(1)</script>'));
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(html.includes('A&amp;B &quot;C&quot;'));
  assert.equal(echapper(null), '');
});

test("sans enseignant connu (l'administration imprime), une ligne à remplir ; sans attendu, un message", () => {
  assert.ok(page({ enseignant: null }).includes('Enseignant :</span> ______'));
  assert.ok(page({ etudiants: [] }).includes('Aucun étudiant attendu à cette séance.'));
});

test('aucun format de papier imposé, aucune couleur dans les cases (précision A)', () => {
  const html = page();
  assert.ok(!/@page\s*{[^}]*size/.test(html));
  assert.ok(!/(background|color)\s*:\s*(?!#000|#fff)#[0-9a-f]{3,6}/i.test(html));
});

test('les textes de la feuille existent en français et en anglais', () => {
  for (const dico of [fr, en]) for (const cle of CLES) assert.ok(feuilleDe(dico)?.[cle], cle);
  const anglais = feuilleAppelHtml({ ecole: 'Demo school', seance, etudiants, enseignant: null, textes: feuilleDe(en), locale: 'en-GB', imprimeLe: '22/11/2026' });
  assert.match(anglais, /Friday,? 20 November 2026/);
  assert.ok(anglais.includes('Roll-call sheet'));
});
