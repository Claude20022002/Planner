// VIT-10 : quatre pages par rôle, hors du menu Fonctions, phrases déjà publiées.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONCTIONS, NAVIGATION, ROLES, chemin } from '../src/i18n/langues.js';

const DOSSIER = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n');
const charger = (langue, page) => JSON.parse(fs.readFileSync(path.join(DOSSIER, langue, `${page}.json`), 'utf8'));

test('les quatre rôles ont une adresse et restent hors du menu Fonctions', () => {
  assert.deepEqual(ROLES, ['direction', 'scolarite', 'enseignants', 'etudiants']);
  assert.equal(chemin('fr', 'direction'), '/fr/direction/');
  assert.equal(chemin('en', 'scolarite'), '/en/scolarite/');
  assert.equal(chemin('ar', 'enseignants'), '/ar/enseignants/');
  assert.equal(chemin('fr', 'etudiants'), '/fr/etudiants/');
  for (const role of ROLES) {
    assert.equal(FONCTIONS.includes(role), false, role);
    assert.equal(NAVIGATION.includes(role), false, role);
  }
  assert.equal(NAVIGATION[0], 'solutions');
});

test('Direction recopie la phrase de l\'établissement, sans prix', () => {
  const page = charger('fr', 'direction');
  assert.equal(page.entete.titre, charger('fr', 'etablissement').entete.titre);
  assert.equal(page.entete.accroche, charger('fr', 'etablissement').entete.accroche);
  assert.equal(page.cartes.some((carte) => carte.page === 'emploiDuTemps'), true);
  assert.equal(/MAD|prix|tarif/i.test(JSON.stringify(page)), false);
});
