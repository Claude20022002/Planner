/** Sélection des SVG intacts et proportions du kit mosaïque approuvé. */
export const estSansEcole = (identite) =>
  !identite.logo && !identite.couleur_principale && identite.nom === 'Planner' && identite.nom_court === 'Planner';

/** Mot seul chez une école ; logo complet pour Planner générique. */
export const fichierMarque = (sansEcole, sombre) => '/marque/' + (sansEcole
  ? 'planner-horizontal' + (sombre ? '-fonce' : '') + '.svg'
  : 'planner-mot' + (sombre ? '-blanc' : '') + '.svg');

/** Le tracé des capitales occupe 100 des 108 unités du SVG mot. */
export const hauteurMot = (hauteurEcole) => hauteurEcole * 0.4 * 108 / 100;
