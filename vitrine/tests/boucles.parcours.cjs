// Recette des boucles VIT-25 sur le site statique construit.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { resolve, extname, sep } = require('node:path');
const requireFrontend = createRequire(resolve(__dirname, '../../frontend/package.json'));
const { chromium } = requireFrontend('playwright');

const racine = resolve(__dirname, '../dist');
const origine = 'http://vitrine.test';
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp4': 'video/mp4',
};
async function servir(route) {
  const url = new URL(route.request().url());
  const fichier = resolve(racine, '.' + url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
  if (url.origin !== origine || !fichier.startsWith(racine + sep)) return route.abort();
  await route.fulfill({ path: fichier, contentType: types[extname(fichier)] });
}

test('lecture protégée, lecture à la demande et pause durable', async (t) => {
  const navigateur = await chromium.launch();
  t.after(() => navigateur.close());
  const url = origine + '/fr/applications/presences/';
  const videoChargee = (page) => page.waitForFunction(() => {
    const video = document.querySelector('[data-boucle] video');
    return !video.paused && video.currentTime > 0.2;
  });

  const cas = [
    { nom: 'téléphone', page: { width: 390, height: 850 } },
    { nom: 'mouvement réduit', reduit: true },
    { nom: 'économie de données', connexion: { saveData: true } },
    { nom: 'connexion lente', connexion: { effectiveType: '3g' } },
  ];
  for (const { nom, page: viewport = { width: 1440, height: 900 }, reduit, connexion } of cas) {
    await t.test(nom, async () => {
      const page = await navigateur.newPage({ viewport, reducedMotion: reduit ? 'reduce' : 'no-preference' });
      try {
        const requetes = [];
        page.on('request', (r) => { if (r.url().endsWith('.mp4')) requetes.push(r.url()); });
        if (connexion) {
          await page.addInitScript((valeur) => Object.defineProperty(navigator, 'connection', { value: valeur }), connexion);
        }
        await page.route('**/*', servir);
        await page.goto(url);
        const figure = page.locator('[data-boucle]');
        await figure.scrollIntoViewIfNeeded();
        const video = figure.locator('video');
        const bouton = figure.getByRole('button', { name: 'Lire l’animation' });
        await bouton.waitFor();
        assert.equal(await video.getAttribute('src'), null);
        assert.deepEqual(requetes, []);
        await bouton.focus();
        await page.keyboard.press('Enter');
        await videoChargee(page);
        assert.equal(requetes.length, 1);
        const dimensions = await video.evaluate((v) => [v.duration, v.videoWidth, v.videoHeight, v.muted]);
        assert.deepEqual(dimensions, [5.5, 960, 600, true]);
        await page.emulateMedia({ media: 'print' });
        assert.equal(await video.isVisible(), false);
        assert.equal(await figure.getByRole('img').isVisible(), true);
      } finally {
        await page.close();
      }
    });
  }

  await t.test('grand écran', async () => {
    const page = await navigateur.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await page.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { effectiveType: '4g' } }));
      await page.route('**/*', servir);
      await page.goto(origine + '/en/applications/emploi-du-temps/');
      const figure = page.locator('[data-boucle]');
      await figure.locator('video').scrollIntoViewIfNeeded();
      await videoChargee(page);
      await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
      await page.waitForFunction(() => document.querySelector('[data-boucle] video').paused);
      await figure.locator('[data-ecran]').scrollIntoViewIfNeeded();
      await videoChargee(page);
      await figure.getByRole('button', { name: 'Pause', exact: true }).click();
      await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
      await figure.locator('[data-ecran]').scrollIntoViewIfNeeded();
      await figure.getByRole('button', { name: 'Play the animation' }).waitFor();
      assert.equal(await figure.locator('video').evaluate((v) => v.paused), true);
    } finally {
      await page.close();
    }
  });

  await t.test('sans JavaScript', async () => {
    const page = await navigateur.newPage({ javaScriptEnabled: false });
    try {
      await page.route('**/*', servir);
      await page.goto(url);
      const figure = page.locator('[data-boucle]');
      assert.equal(await figure.getByRole('img').isVisible(), true);
      assert.equal(await figure.locator('button').isVisible(), false);
      assert.equal(await figure.locator('video').getAttribute('src'), null);
    } finally {
      await page.close();
    }
  });
});
