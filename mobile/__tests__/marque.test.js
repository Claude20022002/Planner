jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

import { contraste } from '../../shared/couleurs.js';

/**
 * Couleurs de l'école sur les thèmes de la charte (UIX-10d) : la couleur principale devient
 * l'action des deux thèmes, au contraste voulu ; une couleur invalide ne change rien.
 * Chaque test recharge les modules : appliquerMarque modifie les thèmes en place.
 */

const charger = () => {
  let modules;
  jest.isolateModules(() => {
    modules = { theme: require('../src/theme'), marque: require('../src/marque') };
  });
  return modules;
};

describe("Couleurs de l'école", () => {
  test("la couleur principale devient l'action des deux thèmes, lisible", () => {
    const { theme: { THEMES }, marque: { appliquerMarque } } = charger();
    // Couleurs fictives, valides contre le blanc (principale 4,5:1, accent 3:1)
    appliquerMarque({ couleur_principale: '#6B1E3A', couleur_accent: '#B5520F' });
    expect(THEMES.clair.couleurs.accent).toBe('#6B1E3A');
    // En sombre, la couleur est rapprochée du texte jusqu'à 5,5:1 sur la cellule
    expect(THEMES.sombre.couleurs.accent).not.toBe('#6B1E3A');
    for (const { couleurs: c } of Object.values(THEMES)) {
      expect(contraste(c.accent, c.cellule)).toBeGreaterThanOrEqual(4.5);
      expect(contraste(c.surAccent, c.accent)).toBeGreaterThanOrEqual(4.5);
      // La barre de titre reste sur la surface (réponse 2)
      expect(c.cadre).toBe(c.cellule);
    }
    expect(contraste(THEMES.sombre.couleurs.accent, THEMES.sombre.couleurs.cellule)).toBeGreaterThanOrEqual(5.5);
    expect(THEMES.clair.scene.ciel).toBe('#6B1E3A');
  });

  test('une couleur invalide ou illisible ne change rien', () => {
    const { theme: { THEMES }, marque: { appliquerMarque } } = charger();
    const avant = JSON.stringify(THEMES);
    appliquerMarque({ couleur_principale: 'bleu', couleur_accent: '#B5520F' });
    appliquerMarque({ couleur_principale: '#F5F5F5', couleur_accent: '#B5520F' });
    appliquerMarque();
    expect(JSON.stringify(THEMES)).toBe(avant);
  });
});
