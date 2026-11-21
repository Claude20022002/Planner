/** Dégradés des icônes du lanceur, lisibles avec des tracés blancs. */
const teintes = {
  planning: ['oklch(0.53 0.19 258)', 'oklch(0.35 0.14 270)'],
  pedagogie: ['oklch(0.52 0.11 198)', 'oklch(0.36 0.09 218)'],
  personnes: ['oklch(0.55 0.14 294)', 'oklch(0.39 0.13 284)'],
  etablissement: ['oklch(0.49 0.08 251)', 'oklch(0.34 0.07 258)'],
  annonces: ['oklch(0.55 0.13 42)', 'oklch(0.38 0.12 27)'],
  activites: ['oklch(0.54 0.16 342)', 'oklch(0.38 0.13 319)'],
  bibliotheque: ['oklch(0.51 0.11 162)', 'oklch(0.36 0.09 176)'],
};

export const DEGRADES_APPLICATIONS = Object.fromEntries(
  Object.entries(teintes).map(([id, [clair, sombre]]) => [id, 'linear-gradient(155deg, ' + clair + ', ' + sombre + ')']),
);
