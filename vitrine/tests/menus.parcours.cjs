// Recette des trois méga-menus de la barre (VIT-20, lot A), avec Chromium de frontend : clavier, toucher, avec et sans JavaScript,
// à 390, 768 et 1440 px. Lancer après npm run build dans vitrine : node --test tests/*.parcours.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { readFile } = require('node:fs/promises');
const { resolve, extname, sep } = require('node:path');
const { chromium } = createRequire(resolve(__dirname, '../../frontend/package.json'))('playwright');

const racine = resolve(__dirname, '../dist');
const origine = 'http://vitrine.test';
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

/** Répond avec les fichiers du build, sans dépendre d'un serveur. */
async function servir(route) {
  const url = new URL(route.request().url());
  const fichier = resolve(racine, '.' + url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
  if (url.origin !== origine || !fichier.startsWith(racine + sep)) return route.abort();
  await route.fulfill({ body: await readFile(fichier), contentType: types[extname(fichier)] });
}

test('les menus de la barre fonctionnent au clavier et au toucher, avec ou sans JavaScript', async (t) => {
  const navigateur = await chromium.launch();
  t.after(() => navigateur.close());
  for (const largeur of [390, 768, 1440]) {
    for (const scripts of [false, true]) {
      await t.test(`${largeur} px, JavaScript ${scripts}`, async () => {
        const page = await navigateur.newPage({
          javaScriptEnabled: scripts, hasTouch: true, viewport: { width: largeur, height: 900 }, reducedMotion: 'reduce',
        });
        try {
          page.setDefaultTimeout(5000);
          await page.route('**/*', servir);
          await page.goto(origine + '/fr/faq/');
          if (scripts && largeur < 1024) await page.locator('.menu-bouton').tap();
          const resume = (nom) => page.locator('.entete summary', { hasText: new RegExp(`^${nom}$`) });
          const applications = resume('Applications');
          // clavier : Entrée ouvre, le panneau montre 17 tuiles dont 5 liens ; les tuiles grisées n'entrent pas dans l'ordre de tabulation
          await applications.focus();
          await page.keyboard.press('Enter');
          const panneau = page.locator('.entete details[open] .panneau');
          assert.ok(await panneau.isVisible());
          assert.equal(await panneau.locator('.tuile').count(), 17);
          assert.equal(await panneau.locator('a.tuile').count(), 5);
          assert.equal(await panneau.locator('div.tuile[href], div.tuile[role], div.tuile[tabindex]').count(), 0);
          await page.keyboard.press('Tab');
          assert.match(await page.locator(':focus').getAttribute('href'), /^\/fr\/applications\/emploi-du-temps\/$/);
          assert.ok(await panneau.getByText('Inclus dans tout abonnement').first().isVisible());
          // Échap ferme et rend le focus au titre (avec JavaScript) ; sans JavaScript, Entrée referme
          if (scripts) {
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('.entete details[open]').count(), 0);
            assert.ok(await applications.evaluate((n) => n === document.activeElement));
          } else {
            await applications.focus();
            await page.keyboard.press('Enter');
            assert.equal(await page.locator('.entete details[open]').count(), 0);
          }
          // toucher : ouvre Établissements, et un seul menu reste ouvert avec JavaScript
          await resume('Établissements').tap();
          assert.equal(await page.locator('.entete details[open]').count(), 1);
          assert.ok(await page.getByRole('link', { name: 'Enseignement supérieur' }).first().isVisible());
          await resume('Ressources').tap();
          assert.equal(await page.locator('.entete details[open]').count(), scripts ? 1 : 2);
          assert.ok(await page.locator('.entete details[open] a[href="/fr/comparer/"]').first().isVisible());
          // un lien de module mène à sa page
          await applications.tap();
          await page.locator('.entete a.tuile', { hasText: 'Présences' }).first().tap();
          await page.waitForURL('**/fr/applications/presences/');
          assert.equal(await page.locator('h1').textContent(), 'Présences');
          assert.equal(await page.locator('.entete a', { hasText: 'Se connecter' }).count(), 0);
        } finally {
          await page.unrouteAll({ behavior: 'wait' });
          await page.close();
        }
      });
    }
  }
});
