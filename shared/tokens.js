import anciens from './design-tokens.json';
import { lignes, statuts } from './charte/index.js';

/**
 * Jetons partagés lus par le mobile, et couleur de ligne des filières (web et mobile).
 * Depuis UIX-10b, les statuts et les lignes viennent de la charte (shared/charte), aux mêmes valeurs.
 * brand, board, radius et flapStepMs restent ceux d'avant la charte, gelés pour le mobile jusqu'à
 * UIX-10d (design-tokens.json) : le web ne les lit plus, il lit shared/charte.
 */

const LIGNES = ['ligne-1', 'ligne-2', 'ligne-3', 'ligne-4', 'ligne-5', 'ligne-6'].map((nom) => lignes[nom]);

// Couleur d'un statut sur l'ancien panneau noir du mobile ; texte et fond des écrans clairs : charte
const statut = (key, cle, board) => ({
  key, board, bureau: statuts[`statut-${cle}`], bureauBg: statuts[`statut-${cle}-fond`],
});
const b = anciens.board;

export const tokens = Object.freeze({
  ...anciens,
  status: {
    planifie: statut('planifie', 'planifie', b.onTime),
    confirme: statut('confirme', 'confirme', b.live),
    reporte: statut('reporte', 'reporte', b.delayed),
    a_reprogrammer: statut('a_reprogrammer', 'reporte', b.delayed),
    annule: statut('annule', 'annule', b.cancelled),
    realise: statut('realise', 'realise', b.letterDim),
  },
  lines: LIGNES,
  lineUnknown: lignes['ligne-inconnue'],
});

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
