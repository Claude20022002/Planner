// VIT-14 et VIT-14b : le comparatif par approche. Forme du tableau, textes français identiques aux plans
// validés, aucun produit nommé, aucun prix, aucun chiffre inventé, et chaque source d'une case Planner présente.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LIGNES, LIGNES_ACCUEIL, COLONNES, DATE, SOURCES, dateEcrite } from '../src/components/comparer/comparatif.js';
import { PAGES, chemin } from '../src/i18n/langues.js';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(ICI, '..', '..');
const charger = (langue) => JSON.parse(fs.readFileSync(path.join(ICI, '..', 'src', 'i18n', langue, 'comparer.json'), 'utf8'));
const chaines = (valeur) => (typeof valeur === 'string' ? [valeur] : Object.values(valeur).flatMap(chaines));
const plan = (nom) => fs.readFileSync(path.join(RACINE, 'docs', 'conception', 'vitrine', nom), 'utf8');
const PLANS = ['vit-14-comparatif.md', 'vit-14b-criteres.md'].map(plan);

/** Cases Planner qui parlent du QR code : seules à porter un nombre (« 30 secondes ») */
const AVEC_TRENTE = ['appel', 'appelProtege'];

/** Noms relevés dans les études de marché (docs/etude-marche/) : aucun ne doit paraître sur le site */
const PRODUITS = [
  'Odoo', 'OpenEduCat', 'Fedena', 'Classter', 'Skoolly', 'iLimo', 'Eduzaas', 'Scoliance', 'Schoolz', 'Caisso',
  'aSc', 'Moodle', 'Pronote', 'EduPage', 'Massar', 'Excel', 'WhatsApp', 'Telegram', 'Google', 'Microsoft',
  'Kolonell', 'Novacole', 'Kanda', 'Lakoli', 'Zeraki', 'Smartschool', 'Acadelta', 'SchoolApp', 'Minassa',
  'Tayssir', 'Koolskools', 'TelmidTICE', 'Canvas', 'Blackboard', 'Index Éducation', 'EcoleDirecte',
];

for (const langue of ['fr', 'en']) {
  const d = charger(langue);

  test(`${langue} : cinq colonnes et neuf lignes, un mot et un texte par case`, () => {
    assert.equal(LIGNES.length, 9);
    assert.equal(d.approches.length, COLONNES);
    assert.equal(d.approches[0], 'Planner');
    assert.deepEqual(Object.keys(d.lignes), LIGNES);
    for (const cle of LIGNES) {
      assert.ok(d.lignes[cle].critere, cle);
      assert.equal(d.lignes[cle].cases.length, COLONNES, cle);
      for (const c of d.lignes[cle].cases) assert.ok(c.mot && c.texte, cle);
    }
  });

  test(`${langue} : aucun produit nommé`, () => {
    const tout = chaines(d).join('\n');
    for (const nom of PRODUITS) assert.doesNotMatch(tout, new RegExp(`\\b${nom}\\b`), nom);
  });

  test(`${langue} : aucun prix, et aucun chiffre hors des 30 secondes du QR code`, () => {
    const tout = chaines(d).join('\n');
    assert.doesNotMatch(tout, /[€$£]|\bMAD\b|\bDH\b|dirham|euro|dollar|USD/i);
    const qr = AVEC_TRENTE.map((cle) => d.lignes[cle].cases[0].texte);
    for (const texte of qr) assert.deepEqual(texte.match(/\d+/g), ['30']);
    const reste = chaines(d).filter((s) => !qr.includes(s)).join('\n');
    assert.doesNotMatch(reste, /\d/);
  });
}

test('le français reprend mot pour mot les textes des plans validés', () => {
  const textes = chaines(charger('fr')).map((s) => s.replace('{date}', '[date]'));
  for (const s of textes) assert.ok(PLANS.some((p) => p.includes(s)), `absent des plans : ${s}`);
  for (const p of PLANS) assert.match(p, /\| Validé \| \*\*Validé par Claude20022002/);
});

test('VIT-14b : les deux critères à leur place, et l’accroche à huit critères', () => {
  assert.equal(LIGNES[LIGNES.indexOf('appel') + 1], 'appelProtege');
  assert.equal(LIGNES[LIGNES.indexOf('sansTelephone') + 1], 'sansReseau');
  assert.equal(LIGNES.includes('bilan'), false);
  assert.equal(LIGNES.length - 1, 8);
  assert.match(charger('fr').entete.accroche, /huit critères/);
  assert.match(charger('en').entete.accroche, /eight criteria/);
});

test('l’accueil montre les critères 1, 2, 4 et 6, puis la ligne « Bientôt »', () => {
  assert.deepEqual(LIGNES_ACCUEIL, ['calcul', 'refus', 'appel', 'sansTelephone', 'bientot']);
  for (const cle of LIGNES_ACCUEIL) assert.ok(LIGNES.includes(cle), cle);
  assert.equal(charger('fr').lignes.sansTelephone.cases[0].mot, 'En grande partie');
  assert.equal(charger('fr').lignes.bientot.cases[0].mot, 'Bientôt');
});

test('chaque case Planner a des sources, et chaque source existe dans le dépôt', () => {
  assert.deepEqual(Object.keys(SOURCES), LIGNES);
  for (const [cle, fichiers] of Object.entries(SOURCES)) {
    assert.ok(fichiers.length > 0, cle);
    for (const f of fichiers) assert.ok(fs.existsSync(path.join(RACINE, f)), `${cle} : ${f}`);
  }
});

test('la date de la méthode, et l’adresse de la page', () => {
  assert.match(DATE, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(dateEcrite('fr'), '19 novembre 2026');
  assert.equal(dateEcrite('en'), 'November 19, 2026');
  assert.equal(PAGES.comparer, 'comparer');
  assert.equal(chemin('en', 'comparer'), '/en/comparer/');
});
