// Accès aux textes du site vitrine : charge les dictionnaires src/i18n/<langue>/<page>.json au build
// et rend une fonction t(cle). Un texte vide dans une langue prend celui du français.
import { LANGUE_SECOURS } from './langues.js';
import { fusionner, lire } from './traduire.js';

const fichiers = import.meta.glob('./*/*.json', { eager: true, import: 'default' });

const dictionnaire = (langue, page) => fichiers[`./${langue}/${page}.json`];

/** Rend t(cle) pour une page (« commun », « accueil »…) dans une langue */
export const traductions = (langue, page) => {
  const secours = dictionnaire(LANGUE_SECOURS, page);
  if (!secours) throw new Error(`Dictionnaire absent : ${LANGUE_SECOURS}/${page}.json`);
  const textes = fusionner(secours, dictionnaire(langue, page));
  return (cle) => lire(textes, cle);
};
