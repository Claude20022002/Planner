// Vérifie les réponses Nginx et la navigation Chromium avec le site compilé.
const assert = require('node:assert/strict');
const { readdirSync } = require('node:fs');
const { join, relative, sep } = require('node:path');
const { chromium } = require('playwright-core');

const origine = new URL(process.argv[2]).origin;
const fichiers = readdirSync('dist', { recursive: true, withFileTypes: true })
  .filter((entree) => entree.isFile())
  .map(({ parentPath, name }) => {
    const chemin = relative('dist', join(parentPath, name));
    return '/' + chemin.split(sep).map(encodeURIComponent).join('/');
  });

const directives = [
  "default-src 'none'", "script-src-attr 'none'", "img-src 'self'", "media-src 'self'",
  "frame-ancestors 'none'", "object-src 'none'", "form-action 'none'",
];

async function verifierReponse(chemin, statut, options = {}) {
  const reponse = await fetch(origine + chemin, {
    redirect: 'manual',
    ...options,
    headers: { 'X-Forwarded-Proto': 'https', ...options.headers },
  });
  assert.equal(reponse.status, statut, chemin);
  assert.equal(reponse.headers.get('x-robots-tag'), 'noindex', chemin);
  assert.equal(reponse.headers.get('strict-transport-security'), 'max-age=31536000', chemin);
  assert.equal(reponse.headers.get('x-content-type-options'), 'nosniff', chemin);
  assert.equal(reponse.headers.get('referrer-policy'), 'no-referrer', chemin);
  const csp = reponse.headers.get('content-security-policy').split('; ');
  for (const directive of directives) assert.ok(csp.includes(directive), chemin + ' · ' + directive);
  assert.doesNotMatch(csp.join(' '), /'unsafe-inline'|'unsafe-eval'/, chemin);
  return reponse;
}

async function verifierHttp() {
  const simple = await fetch(origine + '/', { redirect: 'manual' });
  assert.equal(simple.headers.get('strict-transport-security'), null);
  await simple.body.cancel();

  for (const chemin of ['/', '/fr/', '/en/', '/fr/index.html']) {
    const reponse = await verifierReponse(chemin, 200, { method: 'HEAD' });
    assert.match(reponse.headers.get('content-type'), /^text\/html/);
    if (chemin !== '/') assert.match(reponse.headers.get('content-security-policy'), /script-src [^;]*'sha256-/);
  }
  const redirection = await verifierReponse('/fr', 301, { method: 'HEAD' });
  assert.equal(redirection.headers.get('location'), '/fr/');
  for (const chemin of ['/adresse-inconnue/', '/adresse-inconnue', '/_astro/', '/ar/']) {
    await verifierReponse(chemin, 404, { method: 'HEAD' });
  }

  const robots = await verifierReponse('/robots.txt', 200);
  assert.match(robots.headers.get('content-type'), /^text\/plain/);
  assert.match(await robots.text(), /^User-agent: \*\r?\nAllow: \/\s*$/);

  const types = {
    avif: 'image/avif', webp: 'image/webp', svg: 'image/svg+xml',
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webm: 'video/webm', mp4: 'video/mp4',
  };
  const medias = fichiers.filter((chemin) => types[chemin.split('.').at(-1)]);
  assert.ok(medias.length > 0, 'Fichiers statiques attendus');
  for (const chemin of medias) {
    const extension = chemin.split('.').at(-1);
    const reponse = await verifierReponse(chemin, 200, { method: 'HEAD' });
    assert.equal(reponse.headers.get('content-type'), types[extension], chemin);
    const empreinte = /^\/_astro\/[^/]+\.[\w-]{8,}\.[a-z0-9]+$/.test(chemin);
    assert.equal(reponse.headers.get('cache-control'),
      empreinte ? 'public, max-age=31536000, immutable' : 'public, no-cache', chemin);
    const etag = reponse.headers.get('etag');
    assert.ok(etag, chemin);
    await verifierReponse(chemin, 304, { method: 'HEAD', headers: { 'If-None-Match': etag } });
    if (types[extension].startsWith('video/')) {
      const partielle = await verifierReponse(chemin, 206, { headers: { Range: 'bytes=0-15' } });
      assert.match(partielle.headers.get('content-range'), /^bytes 0-15\//, chemin);
      assert.equal((await partielle.arrayBuffer()).byteLength, 16, chemin);
    }
  }
  const ressource = fichiers.find((chemin) => /^\/_astro\/[^/]+\.[\w-]{8,}\.js$/.test(chemin));
  assert.ok(ressource, 'Script Astro versionné attendu');
  const script = await verifierReponse(ressource, 200, { method: 'HEAD' });
  assert.equal(script.headers.get('cache-control'), 'public, max-age=31536000, immutable');
  console.log(`HTTP : routes, en-têtes, robots.txt, script versionné et ${medias.length} ressources image/vidéo.`);
}

async function verifierNavigateur() {
  const navigateur = await chromium.launch({ channel: 'chrome' });
  try {
    const contexte = await navigateur.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
    const incidents = [];
    await contexte.addInitScript(() => {
      window.refusCsp = [];
      document.addEventListener('securitypolicyviolation', ({ effectiveDirective, blockedURI }) => {
        window.refusCsp.push(effectiveDirective + ' · ' + blockedURI);
      });
    });
    await contexte.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (url.origin === origine) return route.continue();
      incidents.push(url.href);
      return route.abort();
    });
    const page = await contexte.newPage();
    page.on('pageerror', (erreur) => incidents.push(erreur.message));
    const pages = fichiers.filter((chemin) => chemin.endsWith('.html'))
      .map((chemin) => chemin.replace(/index\.html$/, ''));
    let videos = 0;
    for (const chemin of pages) {
      // Une page de renvoi d'Astro (meta refresh) quitte la page : statut et noindex, puis on attend sa cible.
      const renvoi = (await (await fetch(origine + chemin)).text()).match(/http-equiv="refresh" content="\d+;url=([^"]+)"/);
      const reponse = await page.goto(origine + chemin, { waitUntil: 'load' });
      assert.equal(reponse.status(), 200, chemin);
      assert.equal(reponse.headers()['x-robots-tag'], 'noindex', chemin);
      if (chemin === '/' || renvoi) {
        await page.waitForURL(origine + (renvoi ? renvoi[1] : '/fr/'));
        continue;
      }
      await page.evaluate(() => Promise.all([...document.images].map((image) => {
        image.loading = 'eager';
        return image.decode();
      })));
      assert.deepEqual(await page.evaluate(() => window.refusCsp), [], chemin);
      assert.deepEqual(incidents, [], chemin);
      if (chemin === '/fr/') {
        const menu = page.locator('.menu-bouton');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        await page.waitForFunction(() => window.__animations === true);
        await page.locator('[data-apparition]').first().scrollIntoViewIfNeeded();
        await page.waitForFunction(() => document.querySelector('[data-apparition][data-vu="oui"]'));
      }
      if (await page.locator('[data-video]').count()) {
        // La vidéo de l'accueil démarre au clic lorsque le mouvement est réduit.
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.reload({ waitUntil: 'load' });
        for (const lecteur of await page.locator('[data-video]').all()) {
          await lecteur.locator('[data-commande]').click();
          const video = await lecteur.locator('video').elementHandle();
          await page.waitForFunction((element) => element.currentTime > 0, video, { timeout: 15000 });
          videos++;
        }
        await page.emulateMedia({ reducedMotion: 'no-preference' });
      }
      assert.deepEqual(await page.evaluate(() => window.refusCsp), [], chemin);
      assert.deepEqual(incidents, [], chemin);
    }
    console.log(`Chromium : ${pages.length} pages, menu mobile, animations et ${videos} vidéos lues.`);
  } finally {
    await navigateur.close();
  }
}

(async () => {
  await verifierHttp();
  await verifierNavigateur();
})().catch((erreur) => {
  console.error(erreur);
  process.exitCode = 1;
});
