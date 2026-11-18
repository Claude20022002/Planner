/** Vérifie l’ordre de l’arbre et le lien parent repris sur téléphone. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { aplatir, ENFANT_DE } from './fiche.js';

test('une promotion conserve ses descendants et leur profondeur', () => {
  const arbre = [{ id_groupe: 1, type_groupe: 'promotion', sous_groupes: [
    { id_groupe: 2, id_groupe_parent: 1, type_groupe: 'td', sous_groupes: [
      { id_groupe: 3, id_groupe_parent: 2, type_groupe: 'tp' },
    ] },
  ] }];
  assert.deepEqual(aplatir(arbre).map(({ id_groupe, id_groupe_parent, profondeur }) =>
    [id_groupe, id_groupe_parent, profondeur]), [[1, undefined, 0], [2, 1, 1], [3, 2, 2]]);
  assert.deepEqual(aplatir([]), []);
  assert.equal(ENFANT_DE.promotion, 'td');
  assert.equal(ENFANT_DE.td, 'tp');
  assert.equal(ENFANT_DE.tp, undefined);
});
