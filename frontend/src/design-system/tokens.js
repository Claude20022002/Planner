/**
 * Jetons du web (`ds`), tirés de la charte (shared/charte, UIX-10b). Les noms d'avant la charte sont
 * gardés pour que les écrans ne changent pas : seules les valeurs changent.
 *   - brand : couleurs de l'école, ou de la charte en repli (bleu nuit et bleu vif) ; design-system/marque.js
 *     y pose celles de l'école au démarrage. « orange » reste le nom de l'accent ;
 *   - board : le panneau des départs, sombre dans les deux modes (fond « ecran ») ;
 *   - nav : le menu, sur la surface du thème (variables posées par ThemeContext).
 */
import {
  couleurs as c, sombre as s, statuts as st, panneau as pn, rayons, ombres, mouvement, typographie,
} from '../../../shared/charte/index.js';
import { lineColor, tokens as partages } from '../../../shared/tokens.js';
import { melanger, nuancesMarque } from '../../../shared/couleurs.js';
import { SURFACES } from './jetonsInterface.js';

const n = nuancesMarque({ couleur_principale: c['bleu-nuit'], couleur_accent: c['bleu-vif'] });
const brand = {
  navy: n.navy, navyDeep: n.navyDeep, navySoft: n.navySoft, navyNight: c['bleu-clair'], navyLight: n.navyLight,
  orange: n.orange, red: st['statut-annule'], green: st['statut-confirme'],
};

const PANNEAU = {
  ground: c.ecran, frame: c['bleu-nuit'], cell: s['surface-sombre'], cellHinge: pn['panneau-charniere'],
  seam: pn['panneau-joint'], letter: s['texte-sombre'], letterDim: s['texte-sombre-second'], onTime: s['texte-sombre'],
  live: pn['lampe-en-cours'], delayed: pn['lampe-retard'], cancelled: pn['lampe-annule'], titre: c.blanc,
};

// Menu, en clair par défaut ; ThemeContext redéfinit les variables selon le mode (jetonsInterface.variablesMenu)
const l = SURFACES.light;
const NAV = {
  fond: l.papier, letter: l.texte, letterSoft: l.secondaire, letterDim: l.secondaire, icon: l.secondaire,
  selection: melanger(l.action, l.papier, 0.9), survol: l.entete, filet: l.filet, bordBouton: l.bord,
  boutonActif: melanger(l.action, l.papier, 0.9),
};

// Le panneau et le menu passent par des variables CSS, pour suivre la couleur de l'école et le mode
const parVariables = (prefixe, valeurs) => Object.fromEntries(Object.entries(valeurs).map(([cle, valeur]) => [cle, `var(--${prefixe}-${cle}, ${valeur})`]));

const etat = (texte, fond) => ({ text: texte, bg: fond, border: melanger(texte, c.blanc, 0.6) });
const statut = (key, cle, board) => ({ key, board, bureau: st[`statut-${cle}`], bureauBg: st[`statut-${cle}-fond`] });
const px = (rem) => Math.round(parseFloat(rem) * 16);

export const ds = {
  brand,

  colors: {
    bg: { app: l.fond, surface: l.papier, subtle: l.entete, elevated: l.papier },
    text: { primary: l.texte, secondary: l.secondaire, muted: l.secondaire },
    border: { default: l.filet, strong: l.bord },
    // Action : le bleu nuit de la charte, ou la couleur de l'école
    brand: { primary: brand.navy, hover: brand.navyDeep, soft: brand.navySoft },
    success: etat(st['statut-confirme'], st['statut-confirme-fond']),
    warning: etat(st['statut-reporte'], st['statut-reporte-fond']),
    danger: etat(st['statut-annule'], st['statut-annule-fond']),
    info: { text: brand.navy, bg: brand.navySoft, border: melanger(brand.navy, c.blanc, 0.75) },
  },

  board: parVariables('board', PANNEAU),
  // Valeurs brutes, là où une couleur calculée est nécessaire (thème MUI, aperçu de la marque)
  boardBrut: PANNEAU,

  // Blanc pur : surfaces posées sur le panneau (cadre du logo, avatar)
  white: c.blanc,

  nav: parVariables('nav', NAV),
  navBrut: NAV,

  // Emploi du temps officiel imprimé (EDT du mois) : couleurs du document papier de l'école, distinctes
  // de celles de l'écran ; hors de la charte (plan d'UIX-10, § 11). « marine » prend la couleur de l'école.
  document: {
    fond: '#FFFFFF',
    encre: '#000000',
    rouge: '#C00000',
    marine: '#001861',
    orange: '#F8CBAD',
    orangeTexte: '#843C0C',
    vide: '#F2F2F2',
    evenement: '#DDEBF7',
    bord: '#7F7F7F',
  },

  status: {
    planifie: statut('planifie', 'planifie', PANNEAU.onTime),
    confirme: statut('confirme', 'confirme', PANNEAU.live),
    reporte: statut('reporte', 'reporte', PANNEAU.delayed),
    a_reprogrammer: statut('a_reprogrammer', 'reporte', PANNEAU.delayed),
    annule: statut('annule', 'annule', PANNEAU.cancelled),
    realise: statut('realise', 'realise', PANNEAU.letterDim),
  },

  // Couleur de ligne par filière ; orange, rouge et vert sont réservés aux statuts
  lines: partages.lines,
  lineUnknown: partages.lineUnknown,

  font: {
    // Une seule famille, Inter ; le panneau l'écrit en capitales à chiffres tabulaires
    board: typographie.police,
    body: typographie.police,
    // Terminal des jeux : un terminal se lit à chasse fixe
    mono: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", Consolas, "Liberation Mono", monospace',
  },

  // Commandes (puces, boutons, champs) 8 px ; cartes et panneaux 12 px ; dialogues 20 px (réponse 3 d'UIX-10b)
  radius: {
    xs: px(rayons['rayon-commande']),
    sm: px(rayons['rayon-commande']),
    md: px(rayons['rayon-petit']),
    lg: px(rayons['rayon-petit']),
    dialogue: px(rayons.rayon),
  },

  shadow: {
    card: ombres['ombre-carte'],
    popover: ombres['ombre-appareil'],
  },

  motion: {
    fast: parseFloat(mouvement['duree-rapide']) / 1000,
    normal: parseFloat(mouvement.duree) / 1000,
    slow: parseFloat(mouvement['duree-lente']) / 1000,
    ease: mouvement['courbe-tableau'],
    flapStepMs: parseFloat(mouvement['pas-volet']), // décalage entre deux caractères dans la cascade des volets
  },
};

// Couleur de ligne stable d'une filière : partagée avec le mobile
export { lineColor };
