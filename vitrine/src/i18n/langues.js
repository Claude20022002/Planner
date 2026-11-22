// Langues et adresses du site vitrine : les trois langues construites, celles qu'on montre, le sens
// d'écriture, et le chemin de chaque page. L'arabe est construit dès le départ, montré après UIX-04.

import { moduleDe } from '../donnees/modules.js';

/** Langues construites, dans l'ordre du sélecteur */
export const LANGUES = ['fr', 'en', 'ar'];

/** Langues dont les textes sont complets : seules elles figurent au sélecteur et sont indexées */
export const LANGUES_PUBLIEES = ['fr', 'en'];

/** Langue de secours d'un texte manquant */
export const LANGUE_SECOURS = 'fr';

/** Pages du site : clé (aussi clé de navigation dans commun.json) → segment d'adresse */
export const PAGES = {
  accueil: '',
  fonctionnalites: 'fonctionnalites',
  faq: 'faq',
  solutions: 'solutions',
  bibliothequeJeux: 'bibliotheque-des-jeux',
  securite: 'securite',
  bientot: 'bientot',
  comparer: 'comparer',
  direction: 'direction',
  scolarite: 'scolarite',
  enseignants: 'enseignants',
  etudiants: 'etudiants',
  applications: 'applications',
  socle: 'socle',
};

/** Préfixe de la clé de page d'un module : `module.emploiDuTemps` → /<langue>/applications/emploi-du-temps/ (VIT-20) */
export const PREFIXE_MODULE = 'module.';

/** Clé de page d'un module, à passer à `chemin` et au gabarit */
export const pageModule = (cle) => `${PREFIXE_MODULE}${cle}`;

/** Page et ancre du contact et du bouton « Demander une démonstration » : la page Contact (VIT-16) les changera ici seulement */
export const CONTACT = { page: 'accueil', ancre: 'contact' };

/** Pages par rôle, dans l'ordre du menu « Établissements » */
export const ROLES = ['direction', 'scolarite', 'enseignants', 'etudiants'];

/** Pages du menu « Ressources » (VIT-20, § 4.2), dans l'ordre. Le centre d'aide (VIT-03) s'y ajoutera. */
export const RESSOURCES = ['faq', 'comparer', 'securite', 'bientot', 'fonctionnalites'];

/** Sens d'écriture d'une langue */
export const direction = (langue) => (langue === 'ar' ? 'rtl' : 'ltr');

/** Vrai si la langue est montrée et indexée */
export const estPubliee = (langue) => LANGUES_PUBLIEES.includes(langue);

/** Chemins statiques Astro : seules les langues publiées sont construites (l'arabe reste en JSON pour UIX-04). */
export const cheminsLangues = () => LANGUES_PUBLIEES.map((lang) => ({ params: { lang } }));

/** Chemin d'une page dans une langue, avec un ancrage facultatif : chemin('en', 'securite') → /en/securite/ */
export const chemin = (langue, page = 'accueil', ancre = '') => {
  const module = page.startsWith(PREFIXE_MODULE) ? moduleDe(page.slice(PREFIXE_MODULE.length)) : null;
  if (module && !module.segment) throw new Error(`Module sans page : ${module.cle}`);
  const segment = module ? `applications/${module.segment}` : PAGES[page];
  if (segment === undefined) throw new Error(`Page inconnue : ${page}`);
  return `/${langue}/${segment ? `${segment}/` : ''}${ancre ? `#${ancre}` : ''}`;
};

/** Chemin du contact et du bouton de démonstration : cheminContact('fr') → /fr/#contact */
export const cheminContact = (langue) => chemin(langue, CONTACT.page, CONTACT.ancre);
