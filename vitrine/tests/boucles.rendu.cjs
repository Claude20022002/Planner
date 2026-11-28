// Vérifie les adresses et le budget des boucles VIT-25 dans le HTML de la vitrine construite.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFile, stat } = require('node:fs/promises');
const { resolve } = require('node:path');

const racine = resolve(__dirname, '../dist');
const modules = {
  presences: { fichier: 'appel-manuel', avant: 'appel' },
  'emploi-du-temps': { fichier: 'fiche-seance', avant: 'calcul' },
};

test('les deux pages chargent une seule boucle de leur module et de leur langue', async () => {
  for (const langue of ['fr', 'en']) {
    for (const [module, { fichier, avant }] of Object.entries(modules)) {
      const html = await readFile(resolve(racine, langue, 'applications', module, 'index.html'), 'utf8');
      const racineMedia = '/videos/boucles/' + module + '/' + fichier + '-' + langue;
      const index = html.indexOf('id="demonstration-module"');
      assert.ok(index > html.indexOf('id="page-titre"'));
      assert.ok(index < html.indexOf('id="' + avant + '"'));
      assert.equal((html.match(/data-boucle(?=\s|>)/g) || []).length, 1);
      assert.ok(html.includes('data-fichier="' + racineMedia + '.mp4"'));
      assert.match(html, /<video[^>]*\bmuted\b[^>]*\bloop\b[^>]*\bplaysinline\b[^>]*\bpreload="none"[^>]*>/);
      assert.doesNotMatch(html, /<video[^>]+\bsrc=/);
      assert.ok(html.includes('src="' + racineMedia + '.webp"'));
      assert.ok((await stat(racine + racineMedia + '.mp4')).size <= 300_000);
      assert.ok((await stat(racine + racineMedia + '.webp')).size <= 20_000);
    }
  }
});
