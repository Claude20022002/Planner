// VIT-07 : quatre pages, les phrases du plan, la carte de prêt retirée, le menu Fonctions.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, FONCTIONS, BARRE, NAVIGATION, chemin } from '../src/i18n/langues.js';

const DOSSIER = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n');
const charger = (langue, page) => JSON.parse(fs.readFileSync(path.join(DOSSIER, langue, `${page}.json`), 'utf8'));
const chaines = (valeur) => (typeof valeur === 'string' ? [valeur] : Object.values(valeur).flatMap(chaines));
const tout = (langue, page) => chaines(charger(langue, page)).join('\n');

const PAGES_NOUVELLES = ['quiz-et-jeux', 'bibliotheque', 'cours-et-annonces', 'application'];

const PHRASES = [
  'Créer, projeter, jouer.',
  'L\'enseignant prépare le quiz. Le lien s\'ouvre dans un navigateur, sur un ordinateur de l\'école ou ailleurs. Un code ou un QR code mène au même lien.',
  'Dix façons de poser une question.',
  'Choix unique, choix multiple, vrai ou faux, réponse courte, nombre, texte à trous, association, ordre, zone sur une image, réponse libre.',
  'Une question peut porter une image, un son ou une vidéo.',
  'À son rythme, chacun ouvre le quiz par le lien, le code ou le QR code.',
  'En direct, la classe répond ensemble. Une réponse fausse ne rapporte rien. Une réponse juste rapporte davantage si elle arrive tôt. Le serveur chronomètre.',
  'Quand l\'école active l\'IA, elle propose des questions. L\'enseignant les relit avant de les ouvrir aux étudiants. Sans clé d\'IA, la fonction est éteinte.',
  'Dix simulations, trente défis.',
  'Tri Cyber, Nœuds Réseaux, Labo des seuils, Pilote des stocks, Sprint Agile, Robot Route, Requête Parfaite, Ordonnanceur CPU, Budget ERP, Labo Big-O. Chaque simulation a trois défis.',
  'Un terminal Linux sert à s\'exercer aux commandes.',
  'En individuel, chacun joue sur son téléphone. En collectif, le terminal Linux est projeté au tableau : l\'enseignant y tape une commande, ou choisit celle qu\'un étudiant envoie.',
  'La bibliothèque des documents de l\'école.',
  'Les documents sont rangés par filière et par module.',
  'Un document est un cours, un examen, un TD, un TP, un exercice ou un article.',
  'Un dépôt attend une relecture avant d\'être visible.',
  'On le télécharge et on le note.',
  'Les étudiants y laissent un avis de stage, une idée de projet, et consultent les événements.',
  'Un module peut proposer des vidéos.',
  'Des suggestions sont proposées quand l\'IA est disponible.',
  'Les supports de la classe, et les nouvelles de l\'école.',
  'L\'enseignant dépose un document ou un lien dans une section.',
  'L\'étudiant voit les supports publiés de ses cours.',
  'Les sondages de la classe s\'ouvrent quand l\'établissement les active. Une question, de deux à six choix.',
  'Une annonce s\'adresse à une classe, un groupe ou une filière. L\'e-mail est facultatif.',
  'L\'emploi du temps, l\'appel, les jeux et la bibliothèque, sur le téléphone.',
  'Cinq onglets : le tableau, la semaine, le scanner, la bibliothèque, le compte.',
  'Le scanner enregistre la présence et rejoint un quiz ou un jeu.',
];

test('les quatre pages ont une adresse, et le menu Fonctions suit le plan', () => {
  assert.equal(chemin('fr', 'quizEtJeux'), '/fr/quiz-et-jeux/');
  assert.equal(chemin('en', 'bibliotheque'), '/en/bibliotheque/');
  assert.equal(chemin('ar', 'coursEtAnnonces'), '/ar/cours-et-annonces/');
  assert.equal(chemin('fr', 'application'), '/fr/application/');
  assert.equal(chemin('fr', 'bibliothequeJeux'), '/fr/bibliotheque-des-jeux/');
  assert.equal(FONCTIONS.includes('bibliothequeJeux'), false);
  assert.equal(NAVIGATION.includes('bibliothequeJeux'), false);
  assert.deepEqual(FONCTIONS, ['emploiDuTemps', 'enClasse', 'quizEtJeux', 'coursEtAnnonces', 'bibliotheque', 'application', 'etablissement']);
  assert.deepEqual(BARRE, ['solutions', 'securite', 'bientot']);
  assert.equal(NAVIGATION[0], 'solutions');
  assert.deepEqual(NAVIGATION, ['solutions', ...FONCTIONS, 'securite', 'bientot']);
  for (const cle of [...FONCTIONS, ...BARRE, 'fonctions']) assert.ok(cle === 'fonctions' || cle in PAGES, cle);
  assert.equal(charger('fr', 'commun').navigation.fonctions, 'Fonctions');
});

test('Bientôt garde le même nombre de cartes, sans le prêt de livres', () => {
  const fr = charger('fr', 'bientot');
  const en = charger('en', 'bientot');
  const ar = charger('ar', 'bientot');
  assert.equal(fr.ecole.cartes.length, 8);
  assert.equal(en.ecole.cartes.length, fr.ecole.cartes.length);
  assert.equal(ar.ecole.cartes.length, fr.ecole.cartes.length);
  const textes = `${tout('fr', 'bientot')}\n${tout('en', 'bientot')}`;
  assert.equal(textes.includes('prêts de livres'), false);
  assert.equal(textes.includes('Book loans'), false);
});

test('chaque phrase du plan est écrite en français', () => {
  const site = PAGES_NOUVELLES.map((page) => tout('fr', page)).join('\n');
  for (const phrase of PHRASES) assert.ok(site.includes(phrase), phrase);
});

test('l\'appel à la main, la plateforme nationale, et pas de magasin', () => {
  const enClasse = tout('fr', 'en-classe');
  const solutions = tout('fr', 'solutions');
  const bientot = tout('fr', 'bientot');
  const application = tout('fr', 'application');
  assert.ok(enClasse.includes('Il peut aussi noter chacun à la main : présent, en retard ou absent.'));
  assert.equal(enClasse.includes('Aucune liste à cocher à la main'), false);
  assert.ok(solutions.includes('Export vers la plateforme nationale'));
  assert.ok(bientot.includes('Au Maroc, Massar en est un exemple.'));
  assert.equal(solutions.includes('Export Massar'), false);
  assert.equal(bientot.includes('Export Massar'), false);
  assert.equal(application.includes('magasin'), false);
});

test('les pages nouvelles n\'écrivent pas le nom de l\'école pilote', () => {
  for (const langue of ['fr', 'en', 'ar']) {
    for (const page of [...PAGES_NOUVELLES, 'bibliotheque-des-jeux', 'commun']) {
      assert.equal(/HESTIM|hestim\.ma/i.test(tout(langue, page)), false, `${langue}/${page}`);
    }
  }
});

const RESUMES = [
  ['Tri Cyber', 'Classer quatre incidents de sécurité par criticité selon portée, sensibilité des données et statut de confinement.'],
  ['Nœuds Réseaux', 'Connecter 4 équipements sur 3 switchs en respectant capacité, segmentation et isolation.'],
  ['Labo des seuils', 'Régler un seuil de détection et comparer les faux positifs, les défauts manqués et le coût des erreurs.'],
  ['Pilote des stocks', 'Planifier trois jours de réapprovisionnement sans rupture, en respectant capacité et budget.'],
  ['Sprint Agile', 'Sélectionner des éléments du backlog en respectant capacité, dépendances, obligations et valeur minimale.'],
  ['Robot Route', 'Programmer un trajet, éviter les obstacles et vérifier chaque déplacement dans une grille simulée.'],
  ['Requête Parfaite', 'Remettre dans le bon ordre les clauses d\u2019une requête SQL à partir de fragments mélangés.'],
  ['Ordonnanceur CPU', 'Choisir l\u2019ordre d\u2019exécution de 4 processus pour respecter les échéances et minimiser le temps de rotation moyen.'],
  ['Budget ERP', 'Allouer des quantités sur 4 postes de coût pour rester dans le budget tout en couvrant un minimum et un coût unitaire.'],
  ['Labo Big-O', 'Reconnaître la classe de complexité (O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)) de vrais motifs de boucles et de récursions.'],
];

test('Quiz et jeux mène aux dix résumés du catalogue, hors du menu', () => {
  assert.equal(charger('fr', 'quiz-et-jeux').jeux.lien, 'Voir les dix jeux');
  assert.equal(charger('en', 'quiz-et-jeux').jeux.lien, 'See the ten games');
  const jeux = charger('fr', 'bibliotheque-des-jeux');
  assert.deepEqual(jeux.jeux.cartes.map((c) => [c.titre, c.texte]), RESUMES);
  assert.equal(charger('en', 'bibliotheque-des-jeux').jeux.cartes.length, 10);
  assert.equal(charger('ar', 'bibliotheque-des-jeux').jeux.cartes.length, 10);
});
