import { contraste, melanger, verifierCouleur } from '../../shared/couleurs.js';
import { sceneDe, texteSurAction, THEMES } from './theme';

/**
 * Couleurs de l'école (D-21) posées sur les deux thèmes de la charte, au lancement et avant le
 * premier écran (app/_layout.jsx) : la couleur principale devient l'action (onglet actif, boutons,
 * sélection), ajustée jusqu'au contraste voulu, et teinte la scène des jeux. Même règle que le
 * web (frontend/src/design-system/jetonsInterface.js). Sans couleurs : la charte en repli.
 */

// Une marge en sombre garde le contraste pendant l'apparition des feuilles (comme le web)
const MINIMUM = { clair: 4.5, sombre: 5.5 };

/** Couleur d'action lisible sur la cellule d'un thème : l'école, rapprochée du texte s'il le faut */
export const actionLisible = (couleur, theme) => {
  const { cellule, lettre } = theme.couleurs;
  let action = couleur;
  for (let i = 0; i < 20 && contraste(action, cellule) < MINIMUM[theme.id]; i += 1) action = melanger(action, lettre, 0.15);
  return action;
};

export const appliquerMarque = ({ couleur_principale: principale, couleur_accent: accent } = {}) => {
  // Une copie ancienne ou abîmée ne doit jamais rendre l'application illisible
  if (!verifierCouleur(principale, 'principale').valide || !verifierCouleur(accent, 'accent').valide) return;

  for (const theme of Object.values(THEMES)) {
    const action = actionLisible(principale, theme);
    Object.assign(theme.couleurs, { accent: action, surAccent: texteSurAction(action) });
    Object.assign(theme.scene, sceneDe(principale));
  }
};
