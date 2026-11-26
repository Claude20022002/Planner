/** Régression : la coquille et l'état vide n'importent plus la bibliothèque d'animation. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dossier = dirname(fileURLToPath(import.meta.url));
const fichiers = [
  join(dossier, '../layouts/DashboardLayout.jsx'),
  join(dossier, 'MenuApplication.jsx'),
  join(dossier, 'IconeApplication.jsx'),
  join(dossier, '../../design-system/components/EmptyState.jsx'),
];
const interdit = /motion\/react|icones\//;

for (const fichier of fichiers) {
  test(`${fichier.split(/[/\\]/).at(-1)} ne charge pas l'animation`, () => {
    const texte = readFileSync(fichier, 'utf8');
    assert.equal(interdit.test(texte), false);
  });
}
