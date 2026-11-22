import { lignes } from './charte/index.js';

/**
 * Couleur de ligne des filières (web et mobile), tirée de la charte (shared/charte).
 * Depuis UIX-10d, plus aucun jeton d'avant la charte : design-tokens.json est retiré, le web et le
 * mobile lisent shared/charte pour tout le reste.
 */

const LIGNES = ['ligne-1', 'ligne-2', 'ligne-3', 'ligne-4', 'ligne-5', 'ligne-6'].map((nom) => lignes[nom]);

export const tokens = Object.freeze({ lines: LIGNES, lineUnknown: lignes['ligne-inconnue'] });

/**
 * Couleur de ligne stable d'une filière (même code → même couleur sur tous les écrans).
 * Hors orange, rouge et vert, réservés aux statuts.
 * @param {string|number|undefined} key - code ou identifiant de filière
 */
export const lineColor = (key) => {
  if (key === undefined || key === null || key === '') return tokens.lineUnknown;
  const text = String(key);
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return tokens.lines[hash % tokens.lines.length];
};
