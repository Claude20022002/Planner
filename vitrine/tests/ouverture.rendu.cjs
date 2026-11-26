// VIT-23 : première section des pages, sur le site construit (dist/). Un seul h1 ; l'illustration attendue, avec ses dimensions et un
// texte de remplacement vide, servie par le site ; aucune image sur les pages qui n'en ont pas ; le relief ; la ligne des rôles.
// Lancer après `npm run build`, depuis vitrine/ : node --test tests/*.rendu.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const DIST = resolve(__dirname, '../dist');
const page = (adresse) => readFileSync(resolve(DIST, '.' + adresse, 'index.html'), 'utf8');
/** La première section du contenu : de la fin de l'en-tête du site à la fin de la première <section> */
const ouverture = (html) => {
  const debut = html.indexOf('<section', html.indexOf('</header>'));
  return html.slice(debut, html.indexOf('</section>', debut));
};

// Adresse → image attendue (plan § 4.3), ou null pour une page seulement resserrée
const ATTENDU = {
  '': 'planning',
  'applications/emploi-du-temps/': 'planning',
  'applications/presences/': 'presences',
  'applications/espace-de-cours/': 'cours',
  'applications/quiz-et-jeux/': 'activites',
  'applications/annonces-et-messages/': 'annonces',
  'bibliotheque-des-jeux/': 'activites',
  'direction/': 'presences',
  'scolarite/': 'planning',
  'enseignants/': 'activites',
  'etudiants/': 'cours',
  'solutions/': 'planning',
  'securite/': null,
  'comparer/': null,
  'bientot/': null,
  'mentions-legales/': null,
  'confidentialite/': null,
};

test('le site est construit', () => assert.ok(existsSync(DIST), 'lancer npm run build'));

for (const langue of ['fr', 'en']) {
  for (const [adresse, image] of Object.entries(ATTENDU)) {
    test(`${langue} · /${adresse} : un h1 dans l'ouverture, ${image ? `l'image ${image}` : 'sans image'}`, () => {
      const html = page(`/${langue}/${adresse}`);
      assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
      const section = ouverture(html);
      assert.match(section, /<h1[\s>]/);
      const imgs = section.match(/<img\b[^>]*>/g) || [];
      if (!image) return assert.equal(imgs.length, 0);
      assert.equal(imgs.length, 1);
      const img = imgs[0];
      assert.match(img, new RegExp(`src="/_astro/${image}\\.[^"]+\\.webp"`));
      assert.match(img, /width="512"/);
      assert.match(img, /height="512"/);
      assert.match(img, /alt=""/);
      assert.ok(existsSync(resolve(DIST, '.' + img.match(/src="([^"]+)"/)[1])), 'image absente de dist/');
    });
  }

  test(`${langue} · le relief de l'accueil et de Sécurité est un seul passage coloré du h1`, () => {
    for (const adresse of ['', 'securite/']) {
      const h1 = ouverture(page(`/${langue}/${adresse}`)).match(/<h1[\s\S]*?<\/h1>/)[0];
      assert.equal((h1.match(/class="relief[^"]*"/g) || []).length, 1, adresse);
    }
  });

  test(`${langue} · l'accueil : « Planner » en surtitre et quatre liens de rôle`, () => {
    const section = ouverture(page(`/${langue}/`));
    assert.match(section, /class="surtitre"[^>]*>Planner</);
    const roles = section.slice(section.indexOf('class="roles'));
    for (const role of ['direction', 'scolarite', 'enseignants', 'etudiants']) assert.match(roles, new RegExp(`href="/${langue}/${role}/"`));
  });
}
