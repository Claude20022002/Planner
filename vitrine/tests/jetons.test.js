// Contraste AA des paires de couleurs du site vitrine (EP-11), lues dans src/styles/jetons.css :
// un jeton changé (par exemple aux valeurs exactes des SVG du chef) est revérifié à chaque test.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const css = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'styles', 'jetons.css'), 'utf8');
const jetons = Object.fromEntries([...css.matchAll(/--([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], m[2]]));

const luminance = (hex) => {
  const [r, v, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * v + 0.0722 * b;
};
const contraste = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

// [texte, fond] : toutes les paires employées par le site pour du texte
const PAIRES = [
  ['encre', 'blanc'], ['encre', 'gris-fond'], ['gris-texte', 'blanc'], ['gris-texte', 'gris-fond'],
  ['bleu', 'blanc'], ['bleu', 'gris-fond'], ['blanc', 'bleu'], ['blanc', 'bleu-profond'],
  ['blanc', 'bleu-nuit'], ['bleu-clair', 'bleu-nuit'], ['bleu-pale', 'bleu-nuit'], ['bleu-nuit', 'blanc'],
  ['bleu-nuit', 'bleu-clair'], ['blanc', 'ecran'], ['bleu-clair', 'ecran'],
];

for (const [texte, fond] of PAIRES) {
  test(`${texte} sur ${fond} : contraste AA (4,5:1)`, () => {
    assert.ok(jetons[texte] && jetons[fond], `jeton absent : ${texte} ou ${fond}`);
    assert.ok(contraste(jetons[texte], jetons[fond]) >= 4.5, `${jetons[texte]} sur ${jetons[fond]}`);
  });
}
