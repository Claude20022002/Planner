// Contrôle d'accessibilité (axe-core, de frontend) des pages nouvelles de VIT-20, à 390 et 1440 px, menu Applications fermé puis
// ouvert, comparatif de l'accueil hydraté. Aucune violation tolérée. Lancer après npm run build dans vitrine.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { readFile } = require('node:fs/promises');
const { resolve, extname, sep } = require('node:path');
const requireFrontend = createRequire(resolve(__dirname, '../../frontend/package.json'));
const { chromium } = requireFrontend('playwright');
const axe = requireFrontend('axe-core');

const racine = resolve(__dirname, '../dist');
const origine = 'http://vitrine.test';
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};
const PAGES = ['/fr/', '/en/', '/fr/applications/', '/fr/socle/', '/fr/applications/emploi-du-temps/', '/fr/applications/presences/',
  '/fr/applications/espace-de-cours/', '/fr/applications/quiz-et-jeux/', '/en/applications/annonces-et-messages/'];

async function servir(route) {
  const url = new URL(route.request().url());
  const fichier = resolve(racine, '.' + url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
  if (url.origin !== origine || !fichier.startsWith(racine + sep)) return route.abort();
  await route.fulfill({ body: await readFile(fichier), contentType: types[extname(fichier)] });
}

const violations = (page) => page.evaluate(async (source) => {
  window.eval(source);
  const { violations: v } = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] });
  return v.map((x) => `${x.id} (${x.nodes.length}) ${x.nodes[0].target.join(' ')}`);
}, axe.source);

test('axe-core ne relève aucune violation', async (t) => {
  const navigateur = await chromium.launch();
  t.after(() => navigateur.close());
  for (const largeur of [390, 1440]) {
    for (const adresse of PAGES) {
      await t.test(`${largeur} px · ${adresse}`, async () => {
        const page = await navigateur.newPage({ viewport: { width: largeur, height: 900 }, reducedMotion: 'reduce' });
        try {
          await page.route('**/*', servir);
          await page.goto(origine + adresse);
          if (adresse.length === 4) {
            await page.locator('#pourquoi').scrollIntoViewIfNeeded();
            await page.getByRole('tab').first().waitFor();
          }
          assert.deepEqual(await violations(page), [], 'menus fermés');
          if (largeur < 1024) await page.locator('.menu-bouton').click();
          await page.locator('.entete summary', { hasText: /^(Applications|Apps)$/ }).click();
          assert.deepEqual(await violations(page), [], 'menu Applications ouvert');
        } finally {
          await page.close();
        }
      });
    }
  }
});
