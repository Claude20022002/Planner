// VIT-21 : les seules mentions de la Bibliothèque concernent son nom ou les jeux.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { entreeBientot } from '../src/components/catalogue/registre.js';
import entrees from '../src/donnees/fonctionnalites.json' with { type: 'json' };

const dictionnaire = (langue, fichier = '') => new URL('../src/i18n/' + langue + '/' + fichier, import.meta.url);
const lire = (langue, fichier) => JSON.parse(readFileSync(dictionnaire(langue, fichier), 'utf8'));
const mentionsPermises = {
  'bibliotheque-des-jeux.json': ['meta.titre'],
  'commun.json': ['navigation.bibliotheque'],
  'fonctionnalites.json': ['applications.bibliotheque'],
  'modules.json': ['noms.bibliotheque'],
};

function verifierMentions(noeud, exceptions, chemin = '') {
  if (typeof noeud === 'string') {
    assert.doesNotMatch(noeud, /studylib/i, chemin);
    if (!exceptions.includes(chemin)) assert.doesNotMatch(noeud, /\b(?:bibliothèque|library)\b/i, chemin);
    return;
  }
  if (noeud && typeof noeud === 'object') {
    for (const [cle, valeur] of Object.entries(noeud)) {
      verifierMentions(valeur, exceptions, chemin ? chemin + '.' + cle : cle);
    }
  }
}

for (const langue of ['fr', 'en']) {
  test(langue + ' : la Bibliothèque n’est mentionnée qu’aux emplacements visés', () => {
    for (const fichier of readdirSync(dictionnaire(langue)).filter((nom) => nom.endsWith('.json'))) {
      verifierMentions(lire(langue, fichier), mentionsPermises[fichier] ?? []);
    }
  });

  test(langue + ' : l’Espace de cours présente les liens et annonce les dépôts à venir', () => {
    const bientot = langue === 'fr' ? 'Dépôt de documents : Bientôt.' : 'Document uploads: coming soon.';
    const cours = lire(langue, 'cours-et-annonces.json');
    const enseignants = lire(langue, 'enseignants.json');
    const etudiants = lire(langue, 'etudiants.json');
    const video = lire(langue, 'accueil.json').video;
    const supports = entrees.find((entree) => entree.id === 'supports');
    assert.ok(cours.entete.accroche.endsWith(bientot));
    assert.equal(enseignants.cartes[1].texte, cours.entete.accroche);
    assert.equal(enseignants.passage.lignes[2].avec, cours.entete.accroche);
    assert.equal(etudiants.faq.questions[1].reponse, cours.supports.texte);
    assert.ok(supports.description[langue].endsWith(bientot));
    assert.equal(video.scenes[6].lignes.length, 1);
    assert.equal(video.illustrations.mobile.onglets.length, 4);
    assert.equal(video.illustrations.cours.bibliotheque, undefined);
  });
}

test('le registre annonce chaque entrée de la Bibliothèque comme Bientôt', () => {
  const bibliotheque = entrees.filter((entree) => entree.module === 'bibliotheque');
  assert.ok(bibliotheque.length > 0);
  for (const entree of bibliotheque) assert.equal(entreeBientot(entree), true, entree.id);
});

test('les dictionnaires retirés ne sont présents dans aucune langue', () => {
  for (const langue of ['fr', 'en', 'ar']) {
    assert.equal(existsSync(dictionnaire(langue, 'bibliotheque.json')), false);
    assert.equal(lire(langue, 'application.json').meta.description, undefined);
    assert.equal(lire(langue, 'en-classe.json').aussi, undefined);
  }
});
