/** Vérifie les contrastes réellement utilisés, y compris avec une marque d'école en mode sombre. */
import assert from 'node:assert/strict';
import test from 'node:test';
import { contraste } from '../../../shared/couleurs.js';
import { jetonsInterface, variablesMenu } from './jetonsInterface.js';

for (const mode of ['light', 'dark']) {
  for (const couleur of [null, '#001861', '#1D4ED8', '#137D3F', '#7E2259', '#FFFFFF', 'invalide']) {
    test('interface : contrastes AA en ' + mode + ' avec ' + couleur, () => {
      const j = jetonsInterface(mode, { couleur_principale: couleur });
      for (const fond of [j.fond, j.papier, j.entete]) {
        assert.ok(contraste(j.texte, fond) >= 4.5, 'texte sur ' + fond);
        assert.ok(contraste(j.secondaire, fond) >= 4.5, 'texte secondaire sur ' + fond);
      }
      assert.ok(contraste(j.action, j.papier) >= (mode === 'dark' ? 5.5 : 4.5), 'action lisible');
      assert.ok(contraste(j.action, j.surAction) >= 4.5, 'libellé du bouton');
      assert.ok(contraste(j.focus, j.papier) >= 3, 'focus visible');
      assert.ok(contraste(j.bord, j.papier) >= 3, 'bord des champs (WCAG 1.4.11)');
    });
  }
}

test('interface : sans couleur d\'école, l\'action est le bleu nuit de la charte (clair) et le bleu clair (sombre)', () => {
  assert.equal(jetonsInterface('light').action, '#17395C');
  assert.equal(jetonsInterface('dark').action, '#A6CAEE');
});

test('interface : le menu est sur la surface du thème, pas sur la couleur de l\'école', () => {
  const j = jetonsInterface('light', { couleur_principale: '#7E2259' });
  assert.equal(variablesMenu(j)['--nav-fond'], j.papier);
  assert.equal(variablesMenu(j)['--nav-letter'], j.texte);
});
