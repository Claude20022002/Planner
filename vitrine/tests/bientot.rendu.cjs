// Contrôle des cartes, des badges et des liens dans les pages « Bientôt » construites par Astro.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const catalogue = import('../src/donnees/modules.js');
const texte = (html) => html.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&apos;', "'");

for (const langue of ['fr', 'en']) {
  test(langue + ' · 12 modules en quatre catégories, avec badge et sans lien', async () => {
    const { CATEGORIES, modulesDeCategorie } = await catalogue;
    const { noms } = require('../src/i18n/' + langue + '/modules.json');
    const { categories } = require('../src/i18n/' + langue + '/commun.json');
    const { badge, modules, aussi } = require('../src/i18n/' + langue + '/bientot.json');
    const html = readFileSync(resolve(__dirname, '../dist', langue, 'bientot/index.html'), 'utf8');
    const sections = [...html.matchAll(/<section id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)];
    const grilles = sections.filter(([, id]) => CATEGORIES.includes(id) || id === 'aussi');
    assert.deepEqual(grilles.map(([, id]) => id), [...CATEGORIES, 'aussi']);

    let total = 0;
    for (const [, categorie, contenu] of grilles.slice(0, -1)) {
      const attendus = modulesDeCategorie(categorie).filter(({ etat }) => etat === 'bientot');
      const cartes = [...contenu.matchAll(/<li(?:\s[^>]*)?>([\s\S]*?)<\/li>/g)];
      assert.deepEqual(cartes.map(([, carte]) => texte(carte.match(/<h3[^>]*>([^<]+)<\/h3>/)[1])),
        attendus.map(({ cle }) => noms[cle]));
      assert.ok([...contenu.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].some(([, titre]) => texte(titre) === categories[categorie]));
      for (const [i, [, carte]] of cartes.entries()) {
        assert.doesNotMatch(carte, /<a\b/);
        assert.equal(texte(carte.match(/<span class="badge[^"]*"[^>]*>([^<]+)<\/span>/)[1]), badge);
        assert.equal(texte(carte.match(/<p[^>]*>([^<]+)<\/p>/)[1]), modules[attendus[i].cle]);
      }
      total += cartes.length;
    }
    assert.equal(total, 12);
    const contenuAussi = grilles.at(-1)[2];
    assert.deepEqual([...contenuAussi.matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)].map(([, titre]) => texte(titre)),
      aussi.cartes.map(({ titre }) => titre));
  });
}
