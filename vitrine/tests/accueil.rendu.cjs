// Tests du lot C de VIT-20 sur le site construit : ordre des sections, grille de 17 tuiles, tableau de repli présent sans
// JavaScript, îlot chargé à la demande. Lancer après `npm run build`.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const page = (adresse) => readFileSync(resolve(__dirname, '../dist', '.' + adresse, 'index.html'), 'utf8');
const corps = (html) => html.slice(html.indexOf('</header>'), html.indexOf('<footer'));

for (const langue of ['fr', 'en']) {
  test(`${langue} · l'accueil suit l'ordre du plan`, () => {
    const html = corps(page(`/${langue}/`));
    const ids = ['ouverture-titre', 'applications', 'presentation', 'emploi', 'appel', 'donnees', 'pourquoi', 'types', 'contact'];
    const places = ids.map((id) => html.indexOf(`id="${id}`));
    assert.ok(places.every((p) => p > 0), ids.filter((id, i) => places[i] < 0).join(', '));
    assert.deepEqual([...places].sort((a, b) => a - b), places);
    for (const retire of ['id="quiz"', 'id="report"', 'id="bientot"']) assert.equal(html.includes(retire), false, retire);
  });

  test(`${langue} · la grille de l'accueil : 17 tuiles, 5 liens, 12 grisées`, () => {
    const html = page(`/${langue}/`);
    const section = html.slice(html.indexOf('id="applications"'), html.indexOf('id="presentation"'));
    const tuiles = section.match(/<(a|div) [^>]*class="[^"]*tuile[^"]*"[^>]*>/g) || [];
    assert.equal(tuiles.length, 17);
    assert.equal(tuiles.filter((b) => b.startsWith('<a ')).length, 5);
    assert.equal(tuiles.filter((b) => b.startsWith('<div') && /grisee/.test(b) && !/href=/.test(b)).length, 12);
  });

  test(`${langue} · sans JavaScript, le tableau de repli du comparatif est dans la page, l'îlot se charge à la visibilité`, () => {
    const html = page(`/${langue}/`);
    const section = html.slice(html.indexOf('id="pourquoi"'), html.indexOf('id="types"'));
    assert.match(section, /<table[^>]*class="[^"]*tableau[^"]*court/);
    assert.match(section, /<astro-island[^>]*client="visible"/);
    assert.equal((section.match(/<tr[ >]/g) || []).length, 6, 'cinq critères et l\'en-tête');
  });
}
