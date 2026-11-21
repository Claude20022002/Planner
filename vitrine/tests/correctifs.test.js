// VIT-17 : correctifs techniques du site (lot A de l'expertise).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { videoPeutPartirSeule } from '../src/components/accueil/videoAutoplay.js';
import { LANGUES_PUBLIEES, cheminsLangues } from '../src/i18n/langues.js';

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(RACINE, 'src');
const LIRE = (fichier) => fs.readFileSync(path.join(SRC, fichier), 'utf8');

test('C6 : le menu se replie avant le rendu du contenu', () => {
  const enTete = LIRE(path.join('components', 'socle', 'EnTete.astro'));
  assert.match(enTete, /<script is:inline>[\s\S]*repliable[\s\S]*<\/script>/);
});

test('C9 : la vidéo ne part pas seule sur mobile ni en connexion lente', () => {
  assert.equal(videoPeutPartirSeule({ mobile: true }), false);
  assert.equal(videoPeutPartirSeule({ effectiveType: 'slow-2g' }), false);
  assert.equal(videoPeutPartirSeule({ effectiveType: '2g' }), false);
  assert.equal(videoPeutPartirSeule({ effectiveType: '3g' }), false);
  assert.equal(videoPeutPartirSeule({ effectiveType: '4g', mobile: false }), true);
  assert.equal(videoPeutPartirSeule({ reduit: true }), false);
  assert.equal(videoPeutPartirSeule({ economie: true }), false);
  const video = LIRE(path.join('components', 'accueil', 'video.js'));
  assert.match(video, /max-width: 48rem/);
  assert.match(LIRE(path.join('components', 'accueil', 'Video.astro')), /data-lire-mobile/);
  const fr = JSON.parse(fs.readFileSync(path.join(SRC, 'i18n', 'fr', 'accueil.json'), 'utf8'));
  const en = JSON.parse(fs.readFileSync(path.join(SRC, 'i18n', 'en', 'accueil.json'), 'utf8'));
  const ar = JSON.parse(fs.readFileSync(path.join(SRC, 'i18n', 'ar', 'accueil.json'), 'utf8'));
  assert.equal(fr.video.commandes.lireMobile, 'Lire la vidéo');
  assert.equal(en.video.commandes.lireMobile, 'Play the video');
  assert.equal(ar.video.commandes.lireMobile, '');
});

test('les pages ne construisent que les langues publiées', () => {
  assert.deepEqual(cheminsLangues().map((c) => c.params.lang), LANGUES_PUBLIEES);
  const pages = fs.readdirSync(path.join(SRC, 'pages', '[lang]'));
  assert.ok(pages.includes('comparer.astro'));
  for (const nom of pages) {
    if (!nom.endsWith('.astro')) continue;
    const source = fs.readFileSync(path.join(SRC, 'pages', '[lang]', nom), 'utf8');
    assert.match(source, /getStaticPaths = cheminsLangues/, nom);
    assert.equal(source.includes('LANGUES.map'), false, nom);
  }
  // En CI, les tests précèdent le build : dist/ n'existe pas encore.
  // Après un build local, l'absence de dist/ar/ est exigée.
  const dist = path.join(RACINE, 'dist');
  if (!fs.existsSync(dist)) return;
  assert.equal(fs.existsSync(path.join(dist, 'ar')), false);
  assert.equal(fs.existsSync(path.join(dist, 'fr', 'index.html')), true);
  assert.equal(fs.existsSync(path.join(dist, 'fr', 'comparer', 'index.html')), true);
});

test('Open Graph et site Astro sont configurés', () => {
  const gabarit = LIRE(path.join('components', 'socle', 'Gabarit.astro'));
  assert.match(gabarit, /property="og:title"/);
  assert.match(gabarit, /twitter:card/);
  const config = fs.readFileSync(path.join(RACINE, 'astro.config.mjs'), 'utf8');
  assert.match(config, /site:\s*'https:\/\/vitrine\.finadmintech\.fr'/);
});

test('GrilleCartes centre une rangée incomplète et deux colonnes pour deux cartes', () => {
  const grille = LIRE(path.join('components', 'fonctions', 'GrilleCartes.astro'));
  assert.match(grille, /nth-child\(2\):last-child/);
  assert.match(grille, /3n\+1/);
});

test('le README cite les logos officiels du chef', () => {
  const readme = fs.readFileSync(path.join(RACINE, 'README.md'), 'utf8');
  assert.match(readme, /logos officiels du chef \(18 nov\.\), version web/);
});