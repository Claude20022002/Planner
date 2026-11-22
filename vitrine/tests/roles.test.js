// VIT-10 : quatre pages par rôle, hors du menu Fonctions, phrases déjà publiées.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, ROLES, chemin } from '../src/i18n/langues.js';

const DOSSIER = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n');
const charger = (langue, page) => JSON.parse(fs.readFileSync(path.join(DOSSIER, langue, `${page}.json`), 'utf8'));
const descriptionSecuriteSansFin = (langue) => {
  const description = charger(langue, 'securite').meta.description;
  const fin = langue === 'fr' ? ' : ' : ': ';
  const i = description.indexOf(fin);
  const debut = (i === -1 ? description : description.slice(0, i)).trim();
  return debut.endsWith('.') ? debut : `${debut}.`;
};

test('les quatre rôles ont une adresse et sont des pages du menu Établissements', () => {
  assert.deepEqual(ROLES, ['direction', 'scolarite', 'enseignants', 'etudiants']);
  assert.equal(chemin('fr', 'direction'), '/fr/direction/');
  assert.equal(chemin('en', 'scolarite'), '/en/scolarite/');
  assert.equal(chemin('ar', 'enseignants'), '/ar/enseignants/');
  assert.equal(chemin('fr', 'etudiants'), '/fr/etudiants/');
  for (const role of ROLES) {
    assert.ok(role in PAGES, role);
  }
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

test('les lignes « avec » et la FAQ recopient des phrases déjà visées', () => {
  const etab = charger('fr', 'etablissement');
  const emploi = charger('fr', 'emploi-du-temps');
  const enClasse = charger('fr', 'en-classe');
  const cours = charger('fr', 'cours-et-annonces');
  const quiz = charger('fr', 'quiz-et-jeux');
  const biblio = charger('fr', 'bibliotheque');
  const premiere = (texte) => texte.slice(0, texte.indexOf('. ') + 1);
  const lien = quiz.entete.accroche.split('. ').slice(1).join('. ');
  const plan = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'docs', 'conception', 'vitrine', 'vit-11-catalogue-faq.md'), 'utf8');
  const vise = (n) => plan.split('\n').find((ligne) => ligne.startsWith(`| ${n} |`)).match(/«([^»]+)»/)[1].trim();
  const avec = (page) => charger('fr', page).passage.lignes.map((ligne) => ligne.avec);
  assert.deepEqual(avec('direction'), [
    etab.statistiques.texte,
    etab.quotidien.cartes[1].texte,
    premiere(emploi.refus.texte),
    etab.quotidien.cartes[0].texte,
    emploi.suite.cartes[0].texte,
  ]);
  assert.deepEqual(avec('scolarite'), [
    emploi.entete.accroche,
    etab.quotidien.cartes[3].texte,
    emploi.suite.cartes[2].texte,
    emploi.suite.cartes[3].texte,
    emploi.suite.cartes[0].texte,
  ]);
  assert.deepEqual(avec('enseignants'), [
    enClasse.appel.points[0], // l'appel à la main, devenu le premier point (VIT-18)
    enClasse.quiz.texte,
    cours.entete.accroche,
    cours.supports.cartes[0].texte,
    vise(8),
  ]);
  assert.deepEqual(avec('etudiants'), [
    cours.supports.texte,
    biblio.entete.accroche,
    vise(7),
    lien,
    cours.annonces.cartes[0].texte,
  ]);
  const reponses = (page) => charger('fr', page).faq.questions.map((question) => question.reponse);
  assert.deepEqual(reponses('direction'), [vise(4), vise(5), vise(6), vise(10)]);
  assert.deepEqual(reponses('scolarite').slice(0, 1), [vise(6)]);
  assert.equal(reponses('scolarite')[1], premiere(emploi.refus.texte));
  assert.equal(reponses('enseignants')[0], vise(8));
  assert.equal(reponses('enseignants')[2], lien);
  assert.equal(reponses('etudiants')[0], vise(7));
  for (const page of ['direction', 'scolarite', 'enseignants', 'etudiants']) {
    assert.equal(charger('fr', page).passage.lignes.length, 5, page);
    assert.equal(/MAD|prix|tarif/i.test(JSON.stringify(charger('fr', page))), false, page);
  }
  const faq = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'fonctions', 'FaqRole.astro'), 'utf8');
  assert.match(faq, /<details>/);
  assert.match(faq, /FAQPage/);
  assert.match(faq, /question\.reponse/);
});

test('Direction recopie la phrase de l\'établissement, sans prix', () => {
  const page = charger('fr', 'direction');
  assert.equal(page.entete.titre, charger('fr', 'etablissement').entete.titre);
  assert.equal(page.entete.accroche, charger('fr', 'etablissement').entete.accroche);
  assert.equal(page.cartes.some((carte) => carte.page === 'module.emploiDuTemps'), true);
  assert.equal(/MAD|prix|tarif/i.test(JSON.stringify(page)), false);
});

test('Direction et Scolarité recopient la carte Sécurité sans la fin de meta.description (C8)', () => {
  for (const langue of ['fr', 'en']) {
    const attendu = descriptionSecuriteSansFin(langue);
    for (const page of ['direction', 'scolarite']) {
      const carte = charger(langue, page).cartes.find((c) => c.page === 'securite');
      assert.equal(carte.texte, attendu, `${langue} · ${page}`);
      assert.equal(/Cette page ne dit|This page only describes/i.test(carte.texte), false);
    }
  }
});

test('les boutons des pages par rôle sont dans l\'ouverture (C8)', () => {
  const enTete = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'fonctions', 'EnTetePage.astro'), 'utf8');
  const pageRole = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'fonctions', 'PageRole.astro'), 'utf8');
  assert.match(enTete, /slot name="actions"/);
  assert.match(pageRole, /slot="actions"/);
  assert.equal(pageRole.includes('id="actions"'), false);
});
