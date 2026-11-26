// Logos des modules (VIT-09a, shared/icones/modules) lus au build, en SVG inline : la CSP du site n'admet ni image
// externe ni data:. Un module sans logo prend la place réservée (VIT-09c la remplit sans toucher aux composants).

const fichiers = import.meta.glob('../../../../shared/icones/modules/*.svg', { query: '?raw', import: 'default', eager: true });

/** Place réservée : une tuile neutre de la même taille que les logos (96 × 96) */
const PLACE_RESERVEE =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" aria-hidden="true"><rect x="4" y="4" width="88" height="88" rx="22" fill="#D9E0E8"/></svg>';

/** SVG d'un module : son logo s'il en a un (clé de shared/icones/modules), sinon la place réservée */
export const logoModule = (module) => {
  if (!module.logo) return PLACE_RESERVEE;
  const svg = fichiers[`../../../../shared/icones/modules/${module.logo}.svg`];
  if (!svg) throw new Error(`Logo absent : shared/icones/modules/${module.logo}.svg`);
  return svg.replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
};
