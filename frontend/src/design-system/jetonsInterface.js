/**
 * Surfaces, texte, filets, action et focus de toutes les pages, en clair et en sombre, tirés de la
 * charte (shared/charte, UIX-10b). La couleur principale de l'école remplace l'action, ajustée
 * jusqu'au contraste voulu ; ses valeurs enregistrées ne changent pas.
 */
import { couleurs as c, sombre as s } from '../../../shared/charte/index.js';
import { contraste, melanger, verifierCouleur } from '../../../shared/couleurs.js';

export const POLICE = "'Inter Variable', Inter, system-ui, sans-serif";

// filet : séparateurs décoratifs ; bord : champs et commandes (WCAG 1.4.11, 3:1) ; entete : en-têtes de tableau, survol
export const SURFACES = {
  light: {
    fond: c['gris-fond'], papier: c.blanc, texte: c.encre, secondaire: c['gris-texte'], filet: c['gris-trait'],
    bord: c['trait-fort'], entete: c['gris-fond'], action: c['bleu-nuit'], focus: c.bleu,
  },
  dark: {
    fond: c.ecran, papier: s['surface-sombre'], texte: s['texte-sombre'], secondaire: s['texte-sombre-second'],
    filet: melanger(s['surface-sombre'], s['texte-sombre'], 0.16), bord: c['trait-fort'],
    entete: melanger(s['surface-sombre'], s['texte-sombre'], 0.06), action: c['bleu-clair'], focus: s['focus-sombre'],
  },
};

/** Jetons de l'interface pour un mode (« light » ou « dark ») et l'identité de l'école. */
export const jetonsInterface = (mode, identite = {}) => {
  const sombre = mode === 'dark';
  const j = { ...SURFACES[sombre ? 'dark' : 'light'] };
  const couleur = identite.couleur_principale;
  if (verifierCouleur(couleur, 'principale').valide) {
    j.action = couleur;
    // Une marge en sombre conserve le contraste pendant l'apparition des dialogues.
    const minimum = sombre ? 5.5 : 4.5;
    for (let i = 0; i < 20 && contraste(j.action, j.papier) < minimum; i += 1) {
      j.action = melanger(j.action, j.texte, 0.15);
    }
  }
  j.surAction = contraste(j.action, j.papier) > contraste(j.action, j.texte) ? j.papier : j.texte;
  j.selection = melanger(j.action, j.papier, 0.9);
  return j;
};

/** Variables CSS du menu (réponse 2 d'UIX-10b : surface claire en clair, sombre en sombre). */
export const variablesMenu = (j) => ({
  '--nav-fond': j.papier, '--nav-letter': j.texte, '--nav-letterSoft': j.secondaire, '--nav-letterDim': j.secondaire,
  '--nav-icon': j.secondaire, '--nav-selection': j.selection, '--nav-survol': j.entete, '--nav-filet': j.filet,
  '--nav-bordBouton': j.bord, '--nav-boutonActif': j.selection,
});
