// Tests de la bibliothèque d'icônes partagée (VIT-09a) : chaque logo n'emploie que des couleurs de la
// charte, a des identifiants préfixés et uniques, reste léger et sans script ; chaque icône vivante
// suit la grille de Lucide, prend la couleur du texte et a son animation, coupée en mouvement réduit.
//   node --test shared/icones/icones.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { APPLICATIONS, ICONES_VIVANTES, LOGOS, fichierLogo } from './index.js';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const lire = (relatif) => fs.readFileSync(path.join(ICI, relatif), 'utf8');
const jetons = JSON.parse(fs.readFileSync(path.join(ICI, '..', 'charte', 'jetons.json'), 'utf8'));
const COULEURS_CHARTE = new Set(Object.values(jetons.familles)
  .flatMap((famille) => Object.values(famille).map((j) => j.valeur))
  .filter((v) => typeof v === 'string' && /^#[0-9A-F]{6}$/i.test(v))
  .map((v) => v.toUpperCase()));
const DESSINS = Object.keys(LOGOS).flatMap((id) => [[id, LOGOS[id].detaille, 3 * 1024], [id, LOGOS[id].petit, 1.5 * 1024]]);

test('les logos sont ceux des sept applications, avec leurs jetons dans la charte', () => {
  assert.deepEqual(APPLICATIONS, ['planning', 'pedagogie', 'personnes', 'etablissement', 'annonces', 'activites', 'bibliotheque']);
  for (const id of APPLICATIONS) {
    assert.ok(jetons.familles.applications[LOGOS[id].teinte], `${id} : teinte`);
    assert.ok(jetons.familles.applications[LOGOS[id].fonce], `${id} : ton foncé`);
  }
  assert.equal(fichierLogo('planning', 24), 'modules/planning-petit.svg');
  assert.equal(fichierLogo('planning', 32), 'modules/planning-petit.svg');
  assert.equal(fichierLogo('planning', 48), 'modules/planning.svg');
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

test('chaque logo : couleurs de la charte seulement', () => {
  for (const [, fichier] of DESSINS) {
    const couleurs = lire(fichier).match(/#[0-9A-F]{6}\b/gi) ?? [];
    assert.ok(couleurs.length > 0, fichier);
    for (const couleur of couleurs) assert.ok(COULEURS_CHARTE.has(couleur.toUpperCase()), `${fichier} : ${couleur} hors de la charte`);
    assert.doesNotMatch(lire(fichier), /\b(rgb|hsl|oklch)\(/, `${fichier} : couleur hors des jetons`);
  }
});

test('chaque logo : identifiants préfixés par son application, uniques sur toute la bibliothèque', () => {
  const vus = new Set();
  for (const [id, fichier] of DESSINS) {
    for (const [, ident] of lire(fichier).matchAll(/\bid="([^"]+)"/g)) {
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
