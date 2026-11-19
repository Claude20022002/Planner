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

test('les autres pages ne passent pas de lien à la grille partagée', () => {
  const racine = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
  const grille = fs.readFileSync(path.join(racine, 'components', 'fonctions', 'GrilleCartes.astro'), 'utf8');
  assert.match(grille, /carte\.href \?/);
  assert.match(grille, /<div class="carte">/);
  const pages = fs.readdirSync(path.join(racine, 'pages', '[lang]')).filter((nom) => nom.endsWith('.astro'));
  for (const nom of pages) {
    const source = fs.readFileSync(path.join(racine, 'pages', '[lang]', nom), 'utf8');
    const balises = source.match(/<GrilleCartes[\s\S]*?\/>/g) ?? [];
    for (const balise of balises) assert.equal(balise.includes('href'), false, nom);
  }
  const roles = new Set(['direction', 'scolarite', 'enseignants', 'etudiants']);
  for (const fichier of fs.readdirSync(path.join(racine, 'i18n', 'fr'))) {
    if (!fichier.endsWith('.json') || roles.has(fichier.replace('.json', ''))) continue;
    const visite = (noeud) => {
      if (Array.isArray(noeud)) return noeud.forEach(visite);
      if (noeud && typeof noeud === 'object') {
        if ('titre' in noeud && 'texte' in noeud) assert.equal('href' in noeud, false, fichier);
        Object.values(noeud).forEach(visite);
      }
    };
    visite(charger('fr', fichier.replace('.json', '')));
  }
});

test('Direction recopie la phrase de l\'établissement, sans prix', () => {
  const page = charger('fr', 'direction');
  assert.equal(page.entete.titre, charger('fr', 'etablissement').entete.titre);
  assert.equal(page.entete.accroche, charger('fr', 'etablissement').entete.accroche);
  assert.equal(page.cartes.some((carte) => carte.page === 'emploiDuTemps'), true);
  assert.equal(/MAD|prix|tarif/i.test(JSON.stringify(page)), false);
});
