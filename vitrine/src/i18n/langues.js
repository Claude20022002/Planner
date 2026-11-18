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
  etablissement: 'etablissement',
  securite: 'securite',
  bientot: 'bientot',
};

/** Pages montrées dans la navigation, dans l'ordre */
export const NAVIGATION = ['solutions', 'emploiDuTemps', 'enClasse', 'etablissement', 'securite', 'bientot'];

/** Sens d'écriture d'une langue */
export const direction = (langue) => (langue === 'ar' ? 'rtl' : 'ltr');

/** Vrai si la langue est montrée et indexée */
export const estPubliee = (langue) => LANGUES_PUBLIEES.includes(langue);

/** Chemin d'une page dans une langue, avec un ancrage facultatif : chemin('en', 'securite') → /en/securite/ */
export const chemin = (langue, page = 'accueil', ancre = '') => {
  const segment = PAGES[page];
  if (segment === undefined) throw new Error(`Page inconnue : ${page}`);
  return `/${langue}/${segment ? `${segment}/` : ''}${ancre ? `#${ancre}` : ''}`;
};
