// Langues et adresses du site vitrine : les trois langues construites, celles qu'on montre, le sens
// d'écriture, et le chemin de chaque page. L'arabe est construit dès le départ, montré après UIX-04.

/** Langues construites, dans l'ordre du sélecteur */
export const LANGUES = ['fr', 'en', 'ar'];

/** Langues dont les textes sont complets : seules elles figurent au sélecteur et sont indexées */
export const LANGUES_PUBLIEES = ['fr', 'en'];

/** Langue de secours d'un texte manquant */
export const LANGUE_SECOURS = 'fr';

/** Pages du site : clé (aussi clé de navigation dans commun.json) → segment d'adresse */
export const PAGES = {
  accueil: '',
  solutions: 'solutions',
  emploiDuTemps: 'emploi-du-temps',
  enClasse: 'en-classe',
  quizEtJeux: 'quiz-et-jeux',
  bibliothequeJeux: 'bibliotheque-des-jeux',
  coursEtAnnonces: 'cours-et-annonces',
  bibliotheque: 'bibliotheque',
  application: 'application',
  etablissement: 'etablissement',
  securite: 'securite',
  bientot: 'bientot',
  comparer: 'comparer',
  direction: 'direction',
  scolarite: 'scolarite',
  enseignants: 'enseignants',
  etudiants: 'etudiants',
};

/** Pages par rôle, dans l'ordre du menu « Solutions ». Hors du menu « Fonctions ». */
export const ROLES = ['direction', 'scolarite', 'enseignants', 'etudiants'];

/** Pages de fonction, dans l'ordre du menu « Fonctions » */
export const FONCTIONS = ['emploiDuTemps', 'enClasse', 'quizEtJeux', 'coursEtAnnonces', 'bibliotheque', 'application', 'etablissement'];

/** Liens de la barre : Solutions, puis le menu Fonctions, puis ces deux pages */
export const BARRE = ['solutions', 'securite', 'bientot'];

/** Pages du pied de page, dans l'ordre. « Solutions » reste en tête (test de la page Solutions). */
export const NAVIGATION = ['solutions', ...FONCTIONS, 'securite', 'bientot'];

/** Sens d'écriture d'une langue */
export const direction = (langue) => (langue === 'ar' ? 'rtl' : 'ltr');

/** Vrai si la langue est montrée et indexée */
export const estPubliee = (langue) => LANGUES_PUBLIEES.includes(langue);

/** Chemins statiques Astro : seules les langues publiées sont construites (l'arabe reste en JSON pour UIX-04). */
export const cheminsLangues = () => LANGUES_PUBLIEES.map((lang) => ({ params: { lang } }));

/** Chemin d'une page dans une langue, avec un ancrage facultatif : chemin('en', 'securite') → /en/securite/ */
export const chemin = (langue, page = 'accueil', ancre = '') => {
  const segment = PAGES[page];
  if (segment === undefined) throw new Error(`Page inconnue : ${page}`);
  return `/${langue}/${segment ? `${segment}/` : ''}${ancre ? `#${ancre}` : ''}`;
};
