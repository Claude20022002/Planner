/**
 * Index de la bibliothèque d'icônes partagée (VIT-09a) : les logos des sept applications et les
 * icônes vivantes des commandes. Source unique pour le site (VIT-09b) et l'application (UIX-10b).
 * Les fichiers sont dans modules/ et vivantes/ ; ce module ne donne que leurs chemins, relatifs à
 * shared/icones/, et les jetons de couleur de chaque logo (shared/charte/jetons.json, famille
 * « applications »). Les noms affichés restent ceux des traductions de chaque site.
 */

/** Les applications, dans l'ordre de la grille (frontend/src/i18n/applications.fr.js) */
export const APPLICATIONS = ['planning', 'pedagogie', 'personnes', 'etablissement', 'annonces', 'activites', 'bibliotheque'];

/** Au-dessous de cette taille (px), le dessin simplifié remplace le dessin détaillé */
export const TAILLE_PETIT_MAX = 32;

/** Logo d'une application : ses deux dessins et ses deux tons */
export const LOGOS = Object.freeze(Object.fromEntries([...APPLICATIONS, 'presences'].map((id) => [id, Object.freeze({
  id,
  detaille: `modules/${id}.svg`,
  petit: `modules/${id}-petit.svg`,
  teinte: `app-${id}`,
  fonce: `app-${id}-fonce`,
})])));

/** Le fichier du logo à poser pour une taille affichée en px */
export const fichierLogo = (id, taille) => (taille <= TAILLE_PETIT_MAX ? LOGOS[id].petit : LOGOS[id].detaille);

/** Les icônes vivantes : vivantes/<nom>.svg, animées par vivantes/vivantes.css */
export const ICONES_VIVANTES = Object.freeze([
  'fleche-droite', 'fleche-bas', 'chevron-droit', 'chevron-bas', 'menu', 'lien-externe',
  'envoyer', 'telecharger', 'lecture', 'pause', 'revoir', 'langue',
]);

/** La classe que porte le bouton ou le lien dont l'icône s'anime */
export const CLASSE_PORTEUR = 'icone-vivante';
