// Recette du comparatif « Pourquoi Planner » de l'accueil (VIT-20, lot C), avec Chromium de frontend : onglets au clavier,
// mode « Critère », mouvement réduit, tableau de repli sans JavaScript. Lancer après npm run build dans vitrine.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { readFile } = require('node:fs/promises');
const { resolve, extname, sep } = require('node:path');
const { chromium } = createRequire(resolve(__dirname, '../../frontend/package.json'))('playwright');

const racine = resolve(__dirname, '../dist');
const origine = 'http://vitrine.test';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

async function servir(route) {
  const url = new URL(route.request().url());
  const fichier = resolve(racine, '.' + url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
  if (url.origin !== origine || !fichier.startsWith(racine + sep)) return route.abort();
  await route.fulfill({ body: await readFile(fichier), contentType: types[extname(fichier)] });
}

test('le comparatif interactif et son repli', async (t) => {
  const navigateur = await chromium.launch();
  t.after(() => navigateur.close());
  const ouvrir = async (options) => {
    const page = await navigateur.newPage(options);
    page.setDefaultTimeout(5000);
    await page.route('**/*', servir);
    await page.goto(origine + '/fr/');
    return page;
  };

  for (const largeur of [390, 768, 1440]) {
    for (const mouvement of ['reduce', 'no-preference']) {
      await t.test(`${largeur} px, mouvement ${mouvement}`, async () => {
        const page = await ouvrir({ viewport: { width: largeur, height: 900 }, reducedMotion: mouvement });
        try {
          await page.locator('#pourquoi').scrollIntoViewIfNeeded();
          const onglets = page.getByRole('tab');
          await onglets.first().waitFor();
          assert.equal(await onglets.count(), 5);
          assert.equal(await page.locator('#pourquoi table.tableau').count(), 0, 'le tableau de repli cède la place');
          assert.equal(await onglets.first().getAttribute('aria-selected'), 'true');
          await onglets.first().focus();
          await page.keyboard.press('ArrowRight');
          assert.equal(await onglets.nth(1).getAttribute('aria-selected'), 'true');
          assert.ok(await onglets.nth(1).evaluate((n) => n === document.activeElement));
          assert.equal(await page.getByRole('tabpanel').locator('tbody tr').count(), 5);
          assert.match(await page.getByRole('tabpanel').locator('h3').textContent(), /^Planner · ERP généraliste$/);
          assert.equal(await page.locator('#pourquoi [aria-live]').count(), 1, 'aria-live sur le titre seulement');
          if (mouvement === 'reduce') {
            const etat = await page.locator('#pourquoi tbody tr').first().evaluate((n) => ({ opacite: getComputedStyle(n).opacity, anims: n.getAnimations().length }));
            assert.deepEqual(etat, { opacite: '1', anims: 0 });
          } else {
            await page.waitForTimeout(700);
            assert.equal(await page.locator('#pourquoi tbody tr').last().evaluate((n) => getComputedStyle(n).opacity), '1');
          }
          await page.keyboard.press('End');
          assert.equal(await onglets.last().getAttribute('aria-selected'), 'true');
          const choix = page.locator('#pourquoi select');
          await choix.selectOption({ index: 2 });
          assert.equal(await page.locator('#pourquoi dl .case').count(), 5);
          assert.equal(await page.getByRole('tabpanel').locator('h3').textContent(), await choix.locator('option:checked').textContent());
          await page.keyboard.press('Home');
          assert.equal(await onglets.first().getAttribute('aria-selected'), 'true');
        } finally {
          await page.close();
        }
      });
    }
    await t.test(`${largeur} px, sans JavaScript : le tableau (ou les cartes) de repli est visible`, async () => {
      const page = await ouvrir({ viewport: { width: largeur, height: 900 }, javaScriptEnabled: false });
      try {
        assert.equal(await page.getByRole('tab').count(), 0);
        const visible = largeur >= 768 ? '#pourquoi table.tableau' : '#pourquoi ul.cartes';
        assert.ok(await page.locator(visible).first().isVisible());
      } finally {
        await page.close();
      }
    });
  }
});
