/**
 * Couleurs de l'école (D-21, lot ME-11) posées sur les jetons du web, une fois au démarrage et
 * avant le premier affichage (main.jsx). Les écrans lisent ds.brand, ds.colors… au moment de
 * s'afficher : ils prennent les couleurs de l'école sans changer une ligne. Le cadre du panneau passe
 * par une variable CSS, posée par ThemeContext. Le menu reste sur la surface du thème (UIX-10b).
 * Sans couleurs valides, les jetons gardent celles de la charte (bleu nuit et bleu vif).
 */
import { ds } from './tokens';
import { melanger, nuancesMarque, verifierCouleur } from '../../../shared/couleurs.js';

/** Pose les couleurs de l'école sur les jetons. Sans couleurs valides, les jetons restent tels quels. */
export const appliquerMarque = ({ couleur_principale: principale, couleur_accent: accent } = {}) => {
  // Une copie ancienne ou abîmée dans le navigateur ne doit jamais rendre le site illisible
  if (verifierCouleur(principale, 'principale').valide && verifierCouleur(accent, 'accent').valide) {
    const n = nuancesMarque({ couleur_principale: principale, couleur_accent: accent });
    Object.assign(ds.brand, { navy: n.navy, navyDeep: n.navyDeep, navySoft: n.navySoft, navyNight: n.navyNight, navyLight: n.navyLight, orange: n.orange });
    Object.assign(ds.colors.brand, { primary: n.navy, hover: n.navyDeep, soft: n.navySoft });
    Object.assign(ds.colors.info, { text: n.navy, bg: n.navySoft, border: melanger(n.navy, '#FFFFFF', 0.75) });
    ds.boardBrut.frame = n.frame;
    ds.document.marine = n.navy;
  }
  // Barre du navigateur : couleur de l'école, sinon bleu nuit de la charte (index.html porte l'ancienne valeur)
  if (typeof document !== 'undefined') {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', ds.brand.navy);
  }
};
