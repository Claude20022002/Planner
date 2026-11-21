// Recette du build statique, avec Chromium de frontend. Lancer après npm run build dans vitrine.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { readFile } = require('node:fs/promises');
const { resolve, extname, sep } = require('node:path');
const { chromium } = createRequire(resolve(__dirname, '../../frontend/package.json'))('playwright');
const registre = require('../src/donnees/fonctionnalites.json');

const racine = resolve(__dirname, '../dist');
const origine = 'http://vitrine.test';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

/** Répond avec les fichiers du build, sans dépendre d'un serveur. */
async function servir(route) {
  const url = new URL(route.request().url());
  const fichier = resolve(racine, '.' + url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
  if (url.origin !== origine || !fichier.startsWith(racine + sep)) return route.abort();
  await route.fulfill({ body: await readFile(fichier), contentType: types[extname(fichier)] });
}

test('le menu de production fonctionne au clavier et au toucher avec ou sans JavaScript', async (t) => {
  const navigateur = await chromium.launch();
  t.after(() => navigateur.close());
  for (const largeur of [390, 768, 1440]) {
    for (const scripts of [false, true]) {
      await t.test(`${largeur} px, JavaScript ${scripts}`, async () => {
        const page = await navigateur.newPage({ javaScriptEnabled: scripts, hasTouch: true,
          viewport: { width: largeur, height: 800 }, reducedMotion: 'reduce' });
        try {
          page.setDefaultTimeout(5000);
          await page.route('**/*', servir);
          await page.goto(origine + '/fr/faq/');
          if (scripts && largeur < 1024) await page.locator('.menu-bouton').tap();
          const bouton = page.getByRole('button', { name: 'Fonctions', exact: true });
          await bouton.focus();
          await page.keyboard.press('Enter');
          const panneau = page.locator('#menu-fonctions');
          assert.ok(await panneau.isVisible());
          await page.keyboard.press('Tab');
          assert.equal(await page.locator(':focus').getAttribute('href'), '/fr/fonctionnalites/');
          for (const section of await panneau.locator('section').all()) {
            const cle = (await section.locator('h2').getAttribute('id')).slice('menu-'.length);
            const attendu = registre.filter((f) => f.categorie === cle).length;
            assert.equal(await section.locator('li').count(), attendu);
            assert.equal(await section.locator('h2 span').textContent(), '(' + attendu + ')');
          }
          assert.equal(await panneau.locator('section li').count(), registre.length);
          const index = panneau.locator('.index');
          assert.equal(await index.isVisible(), largeur >= 1024);
          if (largeur >= 1024) {
            const lien = index.getByRole('link').last();
            await lien.click();
            assert.equal('#' + await page.locator(':focus').getAttribute('id'), await lien.getAttribute('href'));
          }
          await page.keyboard.press('Escape');
          assert.equal(await panneau.isVisible(), false);
          assert.ok(await bouton.evaluate((noeud) => noeud === document.activeElement));
          await bouton.tap();
          await panneau.getByRole('button', { name: 'Fermer' }).tap();
          assert.equal(await panneau.isVisible(), false);
          await bouton.tap();
          await panneau.getByRole('link', { name: 'Toutes les fonctionnalités' }).click();
          assert.equal(new URL(page.url()).pathname, '/fr/fonctionnalites/');
          assert.equal(await page.locator('.catalogue li:visible').count(), registre.length);
          assert.equal(await page.locator('#filtre').isVisible(), scripts);
        } finally {
          await page.unrouteAll({ behavior: 'wait' });
          await page.close();
        }
      });
    }
  }
});
