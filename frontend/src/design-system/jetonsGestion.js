/** Surfaces et états du pilote web ; les couleurs de l’école restent prioritaires. */
import { contraste, melanger, verifierCouleur } from '../../../shared/couleurs.js';

export const POLICE_GESTION = 'Inter, Segoe UI, system-ui, sans-serif';
export const SURFACES_GESTION = {
  light: { fond: '#F6F7F9', papier: '#FDFDFE', texte: '#202C3D', secondaire: '#526174', filet: '#D5DBE3', entete: '#EDF0F4', action: '#334155', focus: '#1D4ED8' },
  dark: { fond: '#141B25', papier: '#1D2633', texte: '#EDF1F7', secondaire: '#B0BECE', filet: '#435065', entete: '#252F3E', action: '#CBD5E1', focus: '#93C5FD' },
};

/** Nuances d’action accessibles, sans changer les valeurs persistées de l’école. */
export const jetonsGestion = (mode, identite = {}) => {
  const sombre = mode === 'dark';
  const j = { ...SURFACES_GESTION[sombre ? 'dark' : 'light'] };
  const couleur = identite.couleur_principale;
  if (verifierCouleur(couleur, 'principale').valide) {
    j.action = couleur;
    // Une marge en sombre conserve le contraste pendant l’apparition des dialogues.
    const minimum = sombre ? 5.5 : 4.5;
    for (let i = 0; i < 20 && contraste(j.action, j.papier) < minimum; i += 1) {
      j.action = melanger(j.action, sombre ? '#EDF1F7' : '#202C3D', 0.15);
    }
  }
  j.surAction = contraste(j.action, j.papier) > contraste(j.action, j.texte) ? j.papier : j.texte;
  j.selection = melanger(j.action, j.papier, 0.9);
  return j;
};
