// Tests de la bibliothèque d'icônes partagée (VIT-09a, style du logo Planner depuis VIT-09d) : chaque logo
// pose sa tuile en aplat au gabarit commun, n'emploie que les couleurs de son application, le blanc et le
// bleu clair, sans dégradé ni renvoi interne, reste léger et sans script ; chaque icône vivante
// suit la grille de Lucide, prend la couleur du texte et a son animation, coupée en mouvement réduit.
//   node --test shared/icones/icones.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { APPLICATIONS, MODULES_ILLUSTRES, ICONES_VIVANTES, LOGOS, fichierLogo } from './index.js';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const lire = (relatif) => fs.readFileSync(path.join(ICI, relatif), 'utf8');
const jetons = JSON.parse(fs.readFileSync(path.join(ICI, '..', 'charte', 'jetons.json'), 'utf8'));
const ton = (famille, nom) => jetons.familles[famille][nom].valeur.toUpperCase();
// Couleurs permises d'un logo (VIT-09d) : sa teinte, son ton foncé, le blanc et le bleu clair de la charte.
const couleursDuLogo = (id) => new Set([
  ton('applications', LOGOS[id].teinte), ton('applications', LOGOS[id].fonce), ton('couleurs', 'blanc'), ton('couleurs', 'bleu-clair'),
]);
const DESSINS = Object.keys(LOGOS).flatMap((id) => [[id, LOGOS[id].detaille, 3 * 1024], [id, LOGOS[id].petit, 1.5 * 1024]]);

test('la grille garde ses sept applications et chaque logo a ses deux jetons', () => {
  assert.deepEqual(APPLICATIONS, ['planning', 'pedagogie', 'personnes', 'etablissement', 'annonces', 'activites', 'bibliotheque']);
  assert.equal(Object.keys(LOGOS).length, 20);
  for (const id of Object.keys(LOGOS)) {
    assert.ok(jetons.familles.applications[LOGOS[id].teinte], `${id} : teinte`);
    assert.ok(jetons.familles.applications[LOGOS[id].fonce], `${id} : ton foncé`);
  }
  assert.equal(fichierLogo('planning', 24), 'modules/planning-petit.svg');
  assert.equal(fichierLogo('planning', 32), 'modules/planning-petit.svg');
  assert.equal(fichierLogo('planning', 48), 'modules/planning.svg');
});

test('chaque module illustré possède un logo et un WebP dans le budget de la page détaillée', () => {
  assert.equal(new Set(MODULES_ILLUSTRES).size, 17);
  const attendus = MODULES_ILLUSTRES.map((id) => `${id}.webp`).sort();
  assert.deepEqual(fs.readdirSync(path.join(ICI, 'images')).sort(), attendus);
  for (const id of MODULES_ILLUSTRES) {
    assert.ok(LOGOS[id], id);
    const image = fs.readFileSync(path.join(ICI, 'images', `${id}.webp`));
    assert.equal(image.toString('ascii', 0, 4), 'RIFF', id);
    assert.equal(image.toString('ascii', 8, 12), 'WEBP', id);
    assert.equal(image.readUInt32LE(4) + 8, image.length, id);
    assert.ok(image.length <= 20_000, `${id} : ${image.length} octets`);
  }
});

// Angle de teinte HSL d'un ton de départ de la charte, en degrés sur le cercle.
function teinte(hex) {
  const [r, v, b] = hex.slice(1).match(/../g).map((canal) => parseInt(canal, 16));
  const haut = Math.max(r, v, b);
  const ecart = haut - Math.min(r, v, b);
  assert.ok(ecart > 0, `Teinte indéfinie pour ${hex}`);
  let secteur;
  if (haut === r) secteur = (v - b) / ecart;
  else if (haut === v) secteur = (b - r) / ecart + 2;
  else secteur = (r - v) / ecart + 4;
  return (60 * secteur + 360) % 360;
}

test('les nouvelles tuiles gardent au moins 14 degrés avec chaque autre ton de départ', () => {
  const tons = Object.entries(jetons.familles.applications)
    .filter(([nom]) => !nom.endsWith('-fonce'))
    .map(([nom, jeton]) => [nom.slice(4), teinte(jeton.valeur)]);
  for (const [id, angle] of tons.filter(([nom]) => !APPLICATIONS.includes(nom))) {
    for (const [autre, voisin] of tons) {
      if (id === autre) continue;
      const distance = Math.abs(angle - voisin);
      assert.ok(Math.min(distance, 360 - distance) >= 14, `${id} et ${autre} trop proches`);
    }
  }
});

test('chaque logo : tuile en aplat au gabarit commun, couleurs de son application seulement (ton foncé permis), sans dégradé ni jaune', () => {
  for (const [id, fichier] of DESSINS) {
    const svg = lire(fichier);
    const teinte = ton('applications', LOGOS[id].teinte);
    assert.match(svg, new RegExp(`<rect x="4" y="4" width="88" height="88" rx="19.5" fill="${teinte}"/>`), `${fichier} : tuile`);
    assert.doesNotMatch(svg, /Gradient|stop-color/, `${fichier} : dégradé`);
    assert.ok(!svg.toUpperCase().includes(ton('couleurs', 'jeu')), `${fichier} : jaune jeu`);
    const permises = couleursDuLogo(id);
    for (const couleur of svg.match(/#[0-9A-F]{3,8}\b/gi) ?? []) {
      assert.ok(permises.has(couleur.toUpperCase()), `${fichier} : ${couleur} hors de ses couleurs`);
    }
    assert.doesNotMatch(svg, /\b(rgb|hsl|oklch)\(/, `${fichier} : couleur hors des jetons`);
  }
});

test('chaque logo : aucun renvoi interne, identifiants éventuels préfixés et uniques (le site les incorpore)', () => {
  const vus = new Set();
  for (const [id, fichier] of DESSINS) {
    const svg = lire(fichier);
    assert.doesNotMatch(svg, /url\(#|href="#/, `${fichier} : renvoi interne`);
    for (const [, ident] of svg.matchAll(/\bid="([^"]+)"/g)) {
      assert.ok(ident.startsWith(`vit-${id}-`), `${fichier} : ${ident}`);
      assert.ok(!vus.has(ident), `${ident} en double`);
      vus.add(ident);
    }
  }
});

test('chaque logo : carré de 96, léger, sans script ni lien externe', () => {
  for (const [, fichier, max] of DESSINS) {
    const svg = lire(fichier);
    assert.match(svg, /viewBox="0 0 96 96"/, fichier);
    assert.ok(Buffer.byteLength(svg) <= max, `${fichier} : ${Buffer.byteLength(svg)} octets`);
    assert.doesNotMatch(svg, /<script|\son[a-z]+=|href="http|<image|<text/i, fichier);
  }
});

test('chaque icône vivante : grille de 24, couleur du texte, décorative, légère', () => {
  for (const nom of ICONES_VIVANTES) {
    const svg = lire(`vivantes/${nom}.svg`);
    assert.match(svg, /viewBox="0 0 24 24"/, nom);
    assert.match(svg, /stroke="currentColor"/, nom);
    assert.match(svg, new RegExp(`class="iv iv-${nom}"`), nom);
    assert.match(svg, /aria-hidden="true"/, nom);
    assert.doesNotMatch(svg, /#[0-9A-F]{3,6}\b|<script|\son[a-z]+=/i, nom);
    assert.ok(Buffer.byteLength(svg) <= 1024, `${nom} : ${Buffer.byteLength(svg)} octets`);
  }
});

test('chaque icône vivante a son animation, et le mouvement réduit les coupe toutes', () => {
  const css = lire('vivantes/vivantes.css');
  for (const nom of ICONES_VIVANTES) assert.ok(css.includes(`.iv-${nom}`), `${nom} : pas de règle`);
  assert.match(css, /\.icone-vivante:is\(:hover, :focus-visible\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.iv, \.iv \* \{ animation: none !important;/);
  assert.ok(fs.existsSync(path.join(ICI, 'LICENSE-lucide')), 'mention de licence de Lucide');
});
