/** Vérifie les contrastes réellement utilisés, y compris avec une marque d’école en mode sombre. */
import assert from 'node:assert/strict';
import test from 'node:test';
import { contraste } from '../../../shared/couleurs.js';
import { jetonsGestion } from './jetonsGestion.js';

for (const mode of ['light', 'dark']) {
  for (const couleur of [null, '#001861', '#137D3F', '#7E2259', '#FFFFFF', 'invalide']) {
    test('gestion : contrastes AA en ' + mode + ' avec ' + couleur, () => {
      const j = jetonsGestion(mode, { couleur_principale: couleur });
      for (const fond of [j.fond, j.papier, j.entete]) {
        assert.ok(contraste(j.texte, fond) >= 4.5, 'texte sur ' + fond);
        assert.ok(contraste(j.secondaire, fond) >= 4.5, 'texte secondaire sur ' + fond);
      }
      assert.ok(contraste(j.action, j.papier) >= 4.5, 'action lisible');
      assert.ok(contraste(j.action, j.surAction) >= 4.5, 'libellé du bouton');
      assert.ok(contraste(j.focus, j.papier) >= 3, 'focus visible');
    });
  }
}
