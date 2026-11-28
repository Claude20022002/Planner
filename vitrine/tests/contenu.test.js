// VIT-07 : quatre pages, les phrases du plan, la carte de prêt retirée, le menu Fonctions.
// VIT-18 : les phrases exactes validées le 19 nov., et le test de garde (aucun pays, la formule de l'IA).
// VIT-18b : le test de garde refuse aussi les superlatifs (décision N4 du chef, 21 nov.).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, RESSOURCES, chemin, pageModule } from '../src/i18n/langues.js';

const DOSSIER = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'i18n');
const charger = (langue, page) => JSON.parse(fs.readFileSync(path.join(DOSSIER, langue, `${page}.json`), 'utf8'));
const chaines = (valeur) => (typeof valeur === 'string' ? [valeur] : Object.values(valeur).flatMap(chaines));
const tout = (langue, page) => chaines(charger(langue, page)).join('\n');

const PAGES_NOUVELLES = ['quiz-et-jeux', 'cours-et-annonces', 'application'];

const PHRASES = [
  'Créer, projeter, jouer.',
  'L\'enseignant prépare le quiz. Le lien s\'ouvre dans un navigateur, sur un ordinateur de l\'école ou ailleurs. Un code ou un QR code mène au même lien.',
  'Dix façons de poser une question.',
  'Choix unique, choix multiple, vrai ou faux, réponse courte, nombre, texte à trous, association, ordre, zone sur une image, réponse libre.',
  'Une question peut porter une image, un son ou une vidéo.',
  'À son rythme, chacun ouvre le quiz par le lien, le code ou le QR code.',
  'En direct, la classe répond ensemble. Une réponse fausse ne rapporte rien. Une réponse juste rapporte davantage si elle arrive tôt. Le serveur chronomètre.',
  'Quand l\'IA est activée pour votre école, elle propose des questions. L\'enseignant les relit avant de les ouvrir aux étudiants. Sinon, la fonction reste éteinte.',
  'Dix simulations, trente défis.',
  'Tri Cyber, Nœuds Réseaux, Labo des seuils, Pilote des stocks, Sprint Agile, Robot Route, Requête Parfaite, Ordonnanceur CPU, Budget ERP, Labo Big-O. Chaque simulation a trois défis.',
  'Un terminal Linux sert à s\'exercer aux commandes.',
  'En collectif, le terminal Linux est projeté au tableau : l\'enseignant y tape une commande, ou choisit celle qu\'un étudiant envoie. En individuel, chacun joue sur son téléphone ou sur un ordinateur.',
  'Les supports de la classe, et les nouvelles de l\'école.',
  'L\'enseignant publie un lien dans une section. Dépôt de documents : Bientôt.',
  'L\'étudiant voit les liens publiés de ses cours.',
  'Les sondages de la classe s\'ouvrent quand l\'établissement les active. Une question, de deux à six choix.',
  'Une annonce s\'adresse à une classe, un groupe ou une filière. L\'e-mail est facultatif.',
  'Les onglets.',
  'Le scanner enregistre la présence et rejoint un quiz ou un jeu.',
];

test('les pages de module ont une adresse, et la barre suit le plan de VIT-20', () => {
  assert.equal(chemin('fr', pageModule('quizEtJeux')), '/fr/applications/quiz-et-jeux/');
  assert.equal(chemin('ar', pageModule('espaceDeCours')), '/ar/applications/espace-de-cours/');
  assert.equal(chemin('fr', 'socle'), '/fr/socle/');
  assert.equal(chemin('fr', 'bibliothequeJeux'), '/fr/bibliotheque-des-jeux/');
  assert.deepEqual(RESSOURCES, ['faq', 'comparer', 'securite', 'bientot', 'fonctionnalites']);
  for (const cle of RESSOURCES) assert.ok(cle in PAGES, cle);
  assert.equal(charger('fr', 'commun').navigation.applications, 'Applications');
});

test('Bientôt ne présente pas de prêt de livres', () => {
  assert.equal(tout('fr', 'bientot').includes('prêts de livres'), false);
  assert.equal(tout('en', 'bientot').includes('Book loans'), false);
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
  assert.ok(enClasse.includes('Au début de la séance, l\'enseignant coche chaque étudiant : présent, en retard ou absent.'));
  assert.equal(enClasse.includes('Aucune liste à cocher à la main'), false);
  assert.ok(solutions.includes('Export vers la plateforme nationale'));
  assert.equal(bientot.includes('Massar'), false);
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

const ORDRE_SITE = [
  'big-o-lab', 'quete-sql', 'cpu-process', 'robot-route',
  'topo-reseau', 'tri-cyber', 'threshold-lab',
  'budget-erp', 'sprint-agile', 'stock-pilot',
];

const codesJeux = (langue) => charger(langue, 'bibliotheque-des-jeux').jeux.groupes
  .flatMap((groupe) => groupe.cartes.map((carte) => carte.code));

test('Quiz et jeux mène à la bibliothèque, hors du menu', () => {
  assert.equal(charger('fr', 'quiz-et-jeux').jeux.lien, 'Voir les dix jeux');
  assert.equal(charger('en', 'quiz-et-jeux').jeux.lien, 'See the ten games');
});

test('QJE-15 : l\'ordre français du tableau, sans le terminal, les trois langues ont les mêmes codes', () => {
  const fr = charger('fr', 'bibliotheque-des-jeux');
  assert.deepEqual(codesJeux('fr'), ORDRE_SITE);
  assert.deepEqual(codesJeux('en'), ORDRE_SITE);
  assert.deepEqual(codesJeux('ar'), ORDRE_SITE);
  assert.equal(codesJeux('fr').includes('terminal-linux'), false);
  assert.deepEqual(fr.jeux.groupes.map((groupe) => groupe.domaine), [
    'informatique', 'reseaux-cybersecurite', 'intelligence-artificielle', 'gestion-logistique',
  ]);
  assert.ok(fr.jeux.groupes.every((groupe) => groupe.cycle === 'superieur'));
  const accroches = Object.fromEntries(fr.jeux.groupes.flatMap((groupe) => groupe.cartes.map((carte) => [carte.code, carte.accroche])));
  assert.equal(accroches['big-o-lab'], 'Devine : à quelle vitesse ce programme grandit ?');
  assert.equal(accroches['stock-pilot'], 'Tiens trois jours sans une seule rupture.');
  for (const accroche of Object.values(accroches)) assert.ok(accroche.length <= 60, accroche);
  const anglais = charger('en', 'bibliotheque-des-jeux');
  for (const carte of anglais.jeux.groupes.flatMap((groupe) => groupe.cartes)) assert.ok(carte.accroche.length <= 60);
  assert.equal(anglais.cycles.superieur, 'Higher education');
  assert.equal(anglais.domaines.informatique, 'Computer science');
  const arabe = charger('ar', 'bibliotheque-des-jeux');
  assert.notEqual(arabe.cycles.superieur, fr.cycles.superieur);
  assert.notEqual(arabe.domaines.informatique, fr.domaines.informatique);
  assert.notEqual(arabe.jeux.groupes[0].cartes[0].accroche, accroches['big-o-lab']);
});

// VIT-18 : les phrases validées par le chef le 19 nov. (plan docs/conception/vitrine/vit-18-textes-exacts.md, § 3)
const PHRASES_EXACTES = [
  ['accueil', 'Pour l\'enseignement supérieur et la formation professionnelle, Planner calcule l\'emploi du temps et accompagne chaque séance. Le collège et le lycée arrivent bientôt.'],
  ['accueil', 'Quand une séance ne trouve pas sa place, Planner dit ce qui la bloque, et où le corriger.'],
  ['accueil', 'L\'enseignant coche chaque étudiant : présent, en retard ou absent. S\'il le veut, il affiche un QR code, que les étudiants scannent avec l\'application Planner. Le code change toutes les 30 secondes.'],
  ['accueil', 'Dix types de questions, avec images, sons et vidéos. Six se jouent en direct, les dix à son rythme.'],
  ['accueil', 'Quand l\'IA est activée pour votre école, elle ne reçoit jamais de données d\'élève, et l\'enseignant relit ce qu\'elle propose.'],
  ['emploi-du-temps', 'Planner nomme la règle qui la bloque, ou ce qui manque : un créneau, une salle, un enseignant.'],
  ['en-classe', 'À la main, sur la liste de la séance : les étudiants n\'ont besoin ni de téléphone, ni d\'écran projeté.'],
  ['quiz-et-jeux', 'Dix jeux d\'informatique et de gestion : Tri Cyber'],
  ['securite', 'Quand l\'IA est activée pour votre école, elle ne reçoit jamais de données d\'élève'],
  ['solutions', 'Pour l\'université, la grande école et les formations techniques supérieures'],
  ['solutions', 'Un emploi du temps calculé, que vous ajustez.'],
  ['bientot', 'La semaine déjà consultée se lit dès aujourd\'hui sans réseau.'],
];

test('VIT-18 : les phrases validées sont écrites en français', () => {
  for (const [page, phrase] of PHRASES_EXACTES) assert.ok(tout('fr', page).includes(phrase), `${page} : ${phrase}`);
});

// Test de garde (VIT-18, décisions D2 et D3 du chef) : aucun pays nommé, et la seule formule de l'IA.
const INTERDITS = /Maroc|Morocco|Massar|\bBTS\b|\bLMD\b|l['’]école active l['’]IA|the school turns (AI on|on AI)|quand l['’]IA est disponible|when AI is available/i;
// Aucune exception : la phrase de la vidéo a été refaite par VIT-08 (#232), le texte du film suit la même règle.
const fichiersDe = (langue) => fs.readdirSync(path.join(DOSSIER, langue)).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
const aPlat = (valeur, cle = '') => (typeof valeur === 'string' ? [[cle, valeur]]
  : Object.entries(valeur).flatMap(([k, v]) => aPlat(v, cle ? `${cle}.${k}` : k)));

test('VIT-18 : aucun pays nommé, et l\'IA « activée pour votre école », en français et en anglais', () => {
  for (const langue of ['fr', 'en']) {
    for (const fichier of fichiersDe(langue)) {
      for (const [cle, texte] of aPlat(charger(langue, fichier))) {
        assert.doesNotMatch(texte, INTERDITS, `${langue}/${fichier}:${cle}`);
      }
    }
  }
});

// VIT-18b (N4, M15) : aucune première place revendiquée. Formes voisines et « leader » : réponses 2 et 3 du plan
// docs/conception/vitrine/vit-18b-superlatifs.md. Les limites de mot laissent passer « seulement », « Leaderboard ».
const SUPERLATIFS = new RegExp([
  String.raw`\bn[°º]\s?1\b`, String.raw`\bnuméro (1|un)\b`, String.raw`#\s?1\b`,
  String.raw`\b(le|la) seule?\b`, String.raw`\bles seule?s\b`, String.raw`\b(le|la|les) meilleure?s?\b`,
  String.raw`\bleader\b`, String.raw`\bleaders du marché`, String.raw`\bmarket leaders?\b`,
  String.raw`\bnumber one\b`, String.raw`\bno\.?\s?1\b`, String.raw`\bthe only\b`, String.raw`\bthe best\b`,
].join('|'), 'i');

const SUPERLATIFS_REFUSES = [
  'Le n° 1 de la gestion scolaire', 'Le n°1', 'Le nº 1', 'N° 1 au pays', 'Le numéro 1', 'Le numéro un',
  'La solution #1', 'La solution # 1', 'Le seul outil', 'La seule plateforme', 'Les seuls', 'Les seules',
  'Le meilleur outil', 'La meilleure semaine possible', 'Les meilleurs', 'Les meilleures', 'Le leader des ERP',
  'Les leaders du marché', 'The number one platform', 'No. 1 for schools', 'No 1', 'The only tool',
  'The best possible week', 'A leader in education', 'Market leaders', 'The market leader',
];
const PHRASES_PERMISES = [
  'School leaders', 'The school\'s key figures, for its leaders.', 'Leaderboard', 'Assemble seulement',
  'Un téléphone ne pointe qu\'un seul étudiant.', 'Choix unique', 'Salle n° 12', 'Question #10',
  'Planner looks for the week that best fits your rules', 'la semaine qui respecte le mieux vos règles',
];

test('VIT-18b : la règle refuse chaque superlatif de N4 et laisse passer les mots ordinaires', () => {
  for (const phrase of SUPERLATIFS_REFUSES) assert.match(phrase, SUPERLATIFS, phrase);
  for (const phrase of PHRASES_PERMISES) assert.doesNotMatch(phrase, SUPERLATIFS, phrase);
});

test('VIT-18b : aucun superlatif, en français et en anglais', () => {
  for (const langue of ['fr', 'en']) {
    for (const fichier of fichiersDe(langue)) {
      for (const [cle, texte] of aPlat(charger(langue, fichier))) {
        assert.doesNotMatch(texte, SUPERLATIFS, `${langue}/${fichier}:${cle}`);
      }
    }
  }
});

test('VIT-18b : la phrase du calcul validée le 21 nov., en français et en anglais', () => {
  assert.equal(charger('fr', 'emploi-du-temps').calcul.texte,
    'Planner cherche la semaine qui respecte le mieux vos règles : les règles strictes sont toujours tenues, les règles souples autant que possible.');
  assert.equal(charger('en', 'emploi-du-temps').calcul.texte,
    'Planner looks for the week that best fits your rules: hard rules are always kept, soft rules as far as possible.');
});
