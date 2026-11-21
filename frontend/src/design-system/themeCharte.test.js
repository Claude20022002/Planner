/** Thème unique de la charte (UIX-10b) : casse normale, Inter, arrondis 8 / 12 / 20, choix de famille retiré. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { construireTheme, stylesGlobaux } from './themeCharte.js';
import { ds } from './tokens.js';

const lire = (chemin) => fs.readFileSync(new URL(chemin, import.meta.url), 'utf8');

test('thème : Inter partout, boutons, onglets et puces sans capitales, sans Barlow', () => {
  for (const mode of ['light', 'dark']) {
    const theme = construireTheme(mode, 'fr');
    assert.match(theme.typography.fontFamily, /^'Inter Variable', Inter/);
    assert.equal(theme.typography.button.textTransform, 'none');
    assert.equal(theme.typography.overline.textTransform, 'none');
    for (const composant of ['MuiTab', 'MuiChip', 'MuiToggleButton']) {
      assert.equal(theme.components[composant].styleOverrides.root.textTransform, 'none', composant);
    }
    assert.doesNotMatch(JSON.stringify(theme.typography) + ds.font.board + ds.font.body, /Barlow/);
  }
});

test('thème : arrondis 8 px (commandes), 12 px (cartes), 20 px (dialogues) ; cibles de 44 px', () => {
  const { components, shape } = construireTheme('light', 'fr');
  assert.equal(shape.borderRadius, 8);
  assert.equal(components.MuiButton.styleOverrides.root.borderRadius, 8);
  assert.equal(components.MuiOutlinedInput.styleOverrides.root.borderRadius, 8);
  assert.equal(components.MuiCard.styleOverrides.root.borderRadius, 12);
  assert.equal(components.MuiDialog.styleOverrides.paper.borderRadius, 20);
  assert.equal(components.MuiButton.styleOverrides.sizeSmall.minHeight, 44);
  assert.equal(components.MuiIconButton.styleOverrides.root.minHeight, 44);
});

test('thème : surfaces de la charte, couleur de l\'école en action, sombre sur « ecran »', () => {
  const clair = construireTheme('light', 'fr');
  assert.equal(clair.palette.background.default, '#F2F5F9');
  assert.equal(clair.palette.primary.main, '#17395C');
  assert.equal(construireTheme('light', 'fr', { couleur_principale: '#7E2259' }).palette.primary.main, '#7E2259');
  const sombre = construireTheme('dark', 'fr');
  assert.equal(sombre.palette.background.default, '#0F1A2B');
  assert.equal(sombre.palette.background.paper, '#172338');
});

test('menu sur la surface du thème, en clair et en sombre ; cadre du panneau à la couleur de l\'école', () => {
  assert.equal(stylesGlobaux('light')[':root']['--nav-fond'], '#FFFFFF');
  assert.equal(stylesGlobaux('dark')[':root']['--nav-fond'], '#172338');
  assert.equal(stylesGlobaux('light')[':root']['--board-frame'], ds.boardBrut.frame);
  assert.equal(ds.boardBrut.ground, '#0F1A2B');
});

// Régression d'UIX-10b : le choix de famille Planner / StudyLib est retiré ; une préférence encore
// enregistrée (« themeFamille ») n'est plus lue, et les Paramètres n'offrent plus que clair et sombre
test('choix de famille retiré : « themeFamille » n\'est plus lu, plus de bouton StudyLib', () => {
  assert.doesNotMatch(lire('../contexts/ThemeContext.jsx'), /getItem\(['"]themeFamille/);
  const apparence = lire('../components/parametres/Apparence.jsx');
  assert.doesNotMatch(apparence, /studylib|famille/i);
  assert.equal(construireTheme('light', 'fr', {}, 'studylib').palette.primary.main, construireTheme('light', 'fr').palette.primary.main);
});
