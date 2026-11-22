jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { contraste } from '../../shared/couleurs.js';
import { couleurs as charte } from '../../shared/charte/index.js';
import { MODES, THEMES, restaurerTheme, themePour } from '../src/theme';

/**
 * Thèmes de la charte (UIX-10d) : un clair et un sombre aux mêmes clés, des textes lisibles
 * (WCAG AA) sur chaque fond, et une préférence d'avant la charte qui garde son mode.
 */

describe('Thèmes de la charte', () => {
  beforeEach(() => AsyncStorage.clear());

  test('le mode choisit le thème ; automatique suit le téléphone, apparence inconnue : le sombre', () => {
    expect(themePour({ mode: 'automatique' }, 'dark').id).toBe('sombre');
    expect(themePour({ mode: 'automatique' }, 'light').id).toBe('clair');
    // Réponse 4 : un ancien Android qui ne donne pas son apparence garde le sombre
    expect(themePour({ mode: 'automatique' }, null).id).toBe('sombre');
    expect(themePour({ mode: 'clair' }, 'dark').id).toBe('clair');
    expect(themePour({ mode: 'sombre' }, 'light').id).toBe('sombre');
  });

  test('sans choix enregistré : automatique', async () => {
    await expect(restaurerTheme()).resolves.toEqual({ mode: 'automatique' });
  });

  test("une préférence d'avant la charte garde son mode, sa famille est ignorée (réponse 5 d'UIX-10)", async () => {
    await AsyncStorage.setItem('hestim.theme', JSON.stringify({ famille: 'studylib', mode: 'clair' }));
    await expect(restaurerTheme()).resolves.toEqual({ mode: 'clair' });
    expect(themePour(await restaurerTheme(), 'dark').id).toBe('clair');
  });

  test('une préférence abîmée donne automatique', async () => {
    await AsyncStorage.setItem('hestim.theme', '{ pas du json');
    await expect(restaurerTheme()).resolves.toEqual({ mode: 'automatique' });
    await AsyncStorage.setItem('hestim.theme', JSON.stringify({ mode: 'violet' }));
    await expect(restaurerTheme()).resolves.toEqual({ mode: 'automatique' });
  });

  test('deux thèmes aux mêmes clés, Inter seule, casse normale hors du Tableau', () => {
    expect(Object.keys(THEMES).sort()).toEqual(['clair', 'sombre']);
    expect(MODES).toEqual(['automatique', 'clair', 'sombre']);
    for (const groupe of ['couleurs', 'polices', 'rayons', 'volet', 'statuts', 'scene', 'verre']) {
      expect(Object.keys(THEMES.clair[groupe]).sort()).toEqual(Object.keys(THEMES.sombre[groupe]).sort());
    }
    for (const theme of Object.values(THEMES)) {
      for (const police of Object.values(theme.polices)) expect(police).toMatch(/^Inter_/);
      expect(theme.capitales).toBe('none');
      expect(theme.capitalesVolet).toBe('uppercase');
    }
  });

  test('arrondis de la charte : 8 px les commandes, 12 px les cartes, 20 px les feuilles', () => {
    expect(THEMES.clair.rayons).toEqual({ xs: 8, sm: 8, md: 12, lg: 20 });
  });

  test("sans couleurs d'école : l'action est le bleu de la charte, la barre de titre est sur la surface", () => {
    expect(THEMES.clair.couleurs.accent).toBe(charte['bleu-nuit']);
    expect(THEMES.sombre.couleurs.accent).toBe(charte['bleu-clair']);
    for (const { couleurs: c } of Object.values(THEMES)) expect(c.cadre).toBe(c.cellule);
    // Réponse 3 : les volets de l'heure restent sombres dans les deux modes
    expect(THEMES.clair.volet).toEqual(THEMES.sombre.volet);
  });

  test.each(Object.keys(THEMES))('%s : textes lisibles (WCAG AA) et commandes à 3:1', (id) => {
    const { couleurs: c, statuts, scene, volet } = THEMES[id];
    for (const fond of [c.fond, c.cellule]) {
      expect(contraste(c.lettre, fond)).toBeGreaterThanOrEqual(4.5);
      expect(contraste(c.lettreAttenuee, fond)).toBeGreaterThanOrEqual(4.5);
      // Bord des champs et des commandes (WCAG 1.4.11)
      expect(contraste(c.bord, fond)).toBeGreaterThanOrEqual(3);
      // Statuts écrits sur le sol et dans les cartes
      for (const couleur of [...Object.values(statuts), c.enCours, c.reporte, c.annule]) {
        expect(contraste(couleur, fond)).toBeGreaterThanOrEqual(4.5);
      }
    }
    expect(contraste(c.surCadre, c.cadre)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(c.surAccent, c.accent)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(c.accent, c.cellule)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(volet.lettre, volet.fond)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(scene.texte, scene.ciel)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(scene.texteAttenue, scene.ciel)).toBeGreaterThanOrEqual(4.5);
  });
});
