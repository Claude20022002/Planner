import { createContext, createElement, useCallback, useContext, useMemo, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { couleurs as c, sombre as s, statuts as st, panneau as pn, rayons as r } from '../../shared/charte/index.js';
import { lineColor } from '../../shared/tokens.js';
import { contraste, melanger, nuancesMarque } from '../../shared/couleurs.js';

/**
 * Thèmes de l'application, tirés de la charte (shared/charte, UIX-10d) : un clair, un sombre.
 * Les clés gardent leurs noms d'avant la charte, pour que les écrans ne changent pas :
 *  - cadre, surCadre, bordCadre : la barre de titre, sur la surface du thème (réponse 2 d'UIX-10d) ;
 *  - accent, surAccent : l'action, bleu de la charte ou couleur de l'école (marque.js) ;
 *  - bord : bord des champs et des commandes (3:1) ; filet : séparateurs décoratifs ;
 *  - volet : les volets de l'heure, sombres dans les deux modes (réponse 3) ;
 *  - capitales : casse normale ; capitalesVolet : les capitales du Tableau (réponse 1).
 * La préférence retenue sur l'appareil est le mode (automatique, clair, sombre).
 */

const POLICES = {
  panneau: 'Inter_600SemiBold', panneauGras: 'Inter_700Bold', panneauMoyen: 'Inter_500Medium',
  texte: 'Inter_400Regular', texteGras: 'Inter_600SemiBold',
};

const px = (rem) => Math.round(parseFloat(rem) * 16);
// Proposition 5 : 8 px pour les commandes, 12 px pour les cartes, 20 px pour les feuilles
const RAYONS = { xs: px(r['rayon-commande']), sm: px(r['rayon-commande']), md: px(r['rayon-petit']), lg: px(r.rayon) };

const rgb = (hexa) => [1, 3, 5].map((i) => parseInt(hexa.slice(i, i + 2), 16)).join(', ');
const filetSombre = melanger(s['surface-sombre'], s['texte-sombre'], 0.16);

/** Texte le plus lisible sur une couleur d'action : blanc, ou le fond sombre de la charte */
export const texteSurAction = (fond) => (contraste(fond, c.blanc) >= contraste(fond, c.ecran) ? c.blanc : c.ecran);

/** Scène des jeux (décor Kenney teinté) : nuances de la couleur principale, bleu nuit par défaut */
export const sceneDe = (principale) => {
  const n = nuancesMarque({ couleur_principale: principale, couleur_accent: principale });
  return {
    ciel: n.navy, collines: n.navyDeep, nuages: melanger(n.navy, c.blanc, 0.15), arbres: n.navyDeep,
    texte: c.blanc, texteAttenue: melanger(n.navy, c.blanc, 0.8),
  };
};

// Fond « ecran » (plan, § 4.2) : plus sombre que la carte du sombre, les volets s'en détachent dans les deux modes
const VOLET = { fond: c.ecran, lettre: s['texte-sombre'], charniere: pn['panneau-charniere'] };
const commun = { polices: POLICES, capitales: 'none', capitalesVolet: 'uppercase', espacement: 0, rayons: RAYONS };

export const THEMES = {
  clair: {
    ...commun,
    id: 'clair',
    sombre: false,
    barreStatut: 'dark', // texte de la barre d'état, lisible sur la barre de titre claire
    couleurs: {
      fond: c['gris-fond'], cellule: c.blanc, filet: c['gris-trait'], bord: c['trait-fort'],
      lettre: c.encre, lettreAttenuee: c['gris-texte'],
      cadre: c.blanc, surCadre: c.encre, bordCadre: c['gris-trait'],
      accent: c['bleu-nuit'], surAccent: texteSurAction(c['bleu-nuit']),
      enCours: st['statut-confirme'], reporte: st['statut-reporte'], annule: st['statut-annule'],
    },
    volet: { ...VOLET },
    statuts: {
      planifie: st['statut-planifie'], confirme: st['statut-confirme'], reporte: st['statut-reporte'],
      a_reprogrammer: st['statut-reporte'], annule: st['statut-annule'], realise: st['statut-realise'],
    },
    // Verre dépoli (barre d'onglets, feuilles) : teinte du flou, couleur du voile, liseré
    verre: { teinte: 'light', rgb: rgb(c.blanc), bord: `rgba(${rgb(c.encre)}, 0.10)` },
    scene: sceneDe(c['bleu-nuit']),
  },
  sombre: {
    ...commun,
    id: 'sombre',
    sombre: true,
    barreStatut: 'light',
    couleurs: {
      fond: c.ecran, cellule: s['surface-sombre'], filet: filetSombre, bord: c['trait-fort'],
      lettre: s['texte-sombre'], lettreAttenuee: s['texte-sombre-second'],
      cadre: s['surface-sombre'], surCadre: s['texte-sombre'], bordCadre: filetSombre,
      accent: c['bleu-clair'], surAccent: texteSurAction(c['bleu-clair']),
      enCours: pn['lampe-en-cours'], reporte: pn['lampe-retard'], annule: pn['lampe-annule'],
    },
    volet: { ...VOLET },
    statuts: {
      planifie: s['texte-sombre'], confirme: pn['lampe-en-cours'], reporte: pn['lampe-retard'],
      a_reprogrammer: pn['lampe-retard'], annule: pn['lampe-annule'], realise: s['texte-sombre-second'],
    },
    verre: { teinte: 'dark', rgb: rgb(c.ecran), bord: 'rgba(255, 255, 255, 0.10)' },
    scene: sceneDe(c['bleu-nuit']),
  },
};

export const MODES = ['automatique', 'clair', 'sombre'];
const PREFERENCE_DEFAUT = { mode: 'automatique' };
const CLE_THEME = 'hestim.theme';

/** Thème pour une préférence et l'apparence du téléphone ; apparence inconnue : le sombre (réponse 4) */
export const themePour = ({ mode }, schemaSysteme) => {
  const sombre = mode === 'automatique' ? schemaSysteme !== 'light' : mode === 'sombre';
  return THEMES[sombre ? 'sombre' : 'clair'];
};

const valide = (p) => Boolean(p) && MODES.includes(p.mode);

const ThemeContext = createContext({ theme: THEMES.sombre, preference: PREFERENCE_DEFAUT, changer: () => {} });

/** Reprend le mode choisi sur cet appareil ; la famille d'avant la charte est ignorée */
export const restaurerTheme = async () => {
  try {
    const lu = JSON.parse((await AsyncStorage.getItem(CLE_THEME)) || 'null');
    return valide(lu) ? { mode: lu.mode } : PREFERENCE_DEFAUT;
  } catch {
    return PREFERENCE_DEFAUT;
  }
};

export function ThemeProvider({ preferenceInitiale = PREFERENCE_DEFAUT, children }) {
  const schema = useColorScheme();
  const [preference, setPreference] = useState(preferenceInitiale);

  const changer = useCallback((modif) => {
    setPreference((avant) => {
      const suivante = { mode: modif?.mode ?? avant.mode };
      if (!valide(suivante)) return avant;
      AsyncStorage.setItem(CLE_THEME, JSON.stringify(suivante)).catch(() => {});
      return suivante;
    });
  }, []);

  const valeur = useMemo(() => ({ theme: themePour(preference, schema), preference, changer }), [preference, schema, changer]);
  return createElement(ThemeContext.Provider, { value: valeur }, children);
}

/** Thème courant : { couleurs, polices, capitales, capitalesVolet, espacement, rayons, volet, statuts, scene, verre, sombre, barreStatut } */
export const useTheme = () => useContext(ThemeContext).theme;

/** Préférence de mode et de quoi la changer (écran Compte) */
export const usePreferenceTheme = () => { const { preference, changer } = useContext(ThemeContext); return { preference, changer }; };

/** Feuille de styles qui suit le thème : `const useStyles = creerStyles((t) => ({ … }))` ; une par thème, créée une fois */
export const creerStyles = (fabrique) => {
  const parTheme = new Map();
  return () => {
    const theme = useTheme();
    if (!parTheme.has(theme.id)) parTheme.set(theme.id, StyleSheet.create(fabrique(theme)));
    return parTheme.get(theme.id);
  };
};

/** Espacement des lettres : nul avec Inter en casse normale */
export const espace = (theme, valeur) => valeur * theme.espacement;

/** Couleur d'un statut de séance dans le thème courant */
export const couleurStatut = (theme, statut) => theme.statuts[statut] ?? theme.couleurs.lettre;

export { lineColor };

export const DECALAGE_VOLET_MS = parseFloat(pn['pas-volet']);

/** Zone tactile minimale (accessibilité) */
export const CIBLE_TACTILE = 48;
