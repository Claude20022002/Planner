/**
 * Planche de comparaison de VIT-09d : pour chaque application, le logo actuel (shared/icones/modules/),
 * la série A (tuile bleu nuit commune) et la série B (teinte de l'application), à 24, 48 et 96 px, sur
 * fond clair et sur fond sombre de la charte. Vérifie d'abord chaque SVG des deux séries (viewBox carré,
 * ni texte, ni police, ni image, ni script, ni dégradé, identifiants préfixés, 4 Ko au plus, couleurs de
 * sa série seulement) et s'arrête sur la première faute. Sans dépendance. La page n'est pas commitée :
 *   node shared/icones/essais/style-planner/generer-planche.mjs [fichier de sortie .html]
 * Sortie par défaut : planche-vit-09d.html dans le dossier temporaire du système.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOGOS, fichierLogo } from '../../index.js';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const ICONES = path.join(ICI, '..', '..');
const CHARTE = path.join(ICONES, '..', 'charte');
const jetons = JSON.parse(fs.readFileSync(path.join(CHARTE, 'jetons.json'), 'utf8')).familles;
const couleur = (nom) => jetons.couleurs[nom].valeur;
const POIDS_MAX = 4 * 1024;

/** Couleurs permises pour un logo d'une série (série A : celles du logo Planner ; B : teinte de l'app) */
export function couleursPermises(serie, id) {
  if (serie === 'a') return ['#17395C', '#2A679F', '#21507C', '#8FB4DE', '#A6CAEE', '#FFFFFF'];
  const app = jetons.applications;
  return [app[`app-${id}`].valeur, app[`app-${id}-fonce`].valeur, '#8FB4DE', '#A6CAEE', '#FFFFFF']
    .map((c) => c.toUpperCase());
}

/** Les fautes d'un SVG de la série serie (a ou b) pour l'application id ; tableau vide si aucune */
export function fautes(svg, serie, id) {
  const liste = [];
  const octets = Buffer.byteLength(svg, 'utf8');
  if (octets > POIDS_MAX) liste.push(`${octets} octets (plus de 4 Ko)`);
  const vue = svg.match(/viewBox="([^"]+)"/);
  const [, , l, h] = vue ? vue[1].trim().split(/[\s,]+/).map(Number) : [];
  if (!vue || !(l > 0) || l !== h) liste.push('viewBox absent ou pas carré');
  for (const balise of ['text', 'tspan', 'image', 'script', 'style', 'font', 'foreignObject', 'linearGradient', 'radialGradient', 'filter', 'use']) {
    if (new RegExp(`<${balise}[\\s>/]`, 'i').test(svg)) liste.push(`balise <${balise}> interdite`);
  }
  if (/font-family|@font-face|href=/i.test(svg)) liste.push('police ou lien externe');
  for (const [, ident] of svg.matchAll(/\sid="([^"]+)"/g)) {
    if (!ident.startsWith(`vit09d-${serie}-${id}-`)) liste.push(`identifiant non préfixé : ${ident}`);
  }
  const permises = new Set(couleursPermises(serie, id));
  for (const c of svg.match(/#[0-9A-F]{3,8}\b/gi) ?? []) {
    if (!permises.has(c.toUpperCase())) liste.push(`couleur hors de la série ${serie.toUpperCase()} : ${c}`);
  }
  for (const [, attr, valeur] of svg.matchAll(/\s(fill|stroke)="([^"]+)"/g)) {
    if (valeur !== 'none' && !valeur.startsWith('#')) liste.push(`${attr} non hexadécimal : ${valeur}`);
  }
  return liste;
}

const lire = (fichier) => (fs.existsSync(fichier) ? fs.readFileSync(fichier, 'utf8') : null);
const enDonnee = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

/** Lit et vérifie les deux séries ; lève une erreur à la première faute */
function chargerSeries() {
  const series = { a: {}, b: {} };
  for (const serie of Object.keys(series)) {
    for (const id of Object.keys(LOGOS)) {
      const svg = lire(path.join(ICI, `serie-${serie}`, `${id}.svg`));
      if (svg === null) continue;
      const liste = fautes(svg, serie, id);
      if (liste.length) throw new Error(`serie-${serie}/${id}.svg : ${liste.join(' ; ')}`);
      series[serie][id] = svg;
    }
  }
  return series;
}

const TAILLES = [24, 48, 96];
const FONDS = [['clair', couleur('blanc')], ['sombre', couleur('ecran')]];

const cellules = (svgs, nom) => TAILLES.map((t) => (svgs[t]
  ? `<img src="${enDonnee(svgs[t])}" width="${t}" height="${t}" alt="" data-taille="${t}">`
  : `<span class="vide" style="width:${t}px;height:${t}px">—</span>`)).join('')
  + `<em>${nom}</em>`;

function ligne(id, series) {
  const actuel = Object.fromEntries(TAILLES.map((t) => [t, lire(path.join(ICONES, fichierLogo(id, t)))]));
  const a = Object.fromEntries(TAILLES.map((t) => [t, series.a[id]]));
  const b = Object.fromEntries(TAILLES.map((t) => [t, series.b[id]]));
  const bandes = FONDS.map(([nom, fond]) => `<div class="bande ${nom}" style="background:${fond}">
      <div class="groupe">${cellules(actuel, 'actuel')}</div>
      <div class="groupe">${cellules(a, 'série A')}</div>
      <div class="groupe">${cellules(b, 'série B')}</div>
    </div>`).join('');
  return `<section><h2>${id}</h2>${bandes}</section>`;
}

/** La page complète de la planche, pour les identifiants donnés (par défaut : ceux d'au moins une série) */
export function planche(series, ids) {
  const icone = lire(path.join(CHARTE, 'logos-officiels', 'planner-variante-4-icone-app.svg'))
    .replace(/viewBox="[^"]+"/, 'viewBox="360 335 692 700"');
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>VIT-09d · planche</title>
<style>
  body { margin: 0; padding: 20px; font: 13px system-ui, sans-serif; color: ${couleur('encre')}; background: ${couleur('gris-fond')}; }
  header { display: flex; gap: 16px; align-items: center; margin-bottom: 16px; }
  h1 { font-size: 18px; margin: 0; } h2 { font-size: 14px; margin: 14px 0 6px; font-family: monospace; }
  .bande { display: flex; gap: 28px; padding: 12px 16px; border-radius: 12px; margin-bottom: 4px; }
  .groupe { display: flex; gap: 12px; align-items: center; }
  .groupe em { font-style: normal; font-size: 11px; width: 52px; }
  .sombre em { color: ${jetons.sombre['texte-sombre-second'].valeur}; }
  .vide { display: inline-grid; place-items: center; color: ${couleur('gris-texte')}; border: 1px dashed ${couleur('trait-fort')}; border-radius: 6px; }
</style></head><body>
<header><img src="${enDonnee(icone)}" width="96" height="96" alt="Icône Planner, pour référence">
<div><h1>VIT-09d · logos dans le style du logo Planner</h1>
<p>Par application : actuel (24 px en dessin simplifié), série A (tuile bleu nuit commune), série B (teinte de l'application), à 24, 48 et 96 px, sur fond clair puis sombre.</p></div></header>
${ids.map((id) => ligne(id, series)).join('\n')}
</body></html>`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const series = chargerSeries();
  const ids = Object.keys(LOGOS).filter((id) => series.a[id] || series.b[id]);
  const sortie = path.resolve(process.argv[2] ?? path.join(os.tmpdir(), 'planche-vit-09d.html'));
  fs.writeFileSync(sortie, planche(series, ids));
  console.log(`${ids.length} application(s), ${Object.keys(series.a).length} + ${Object.keys(series.b).length} logos vérifiés.`);
  console.log(`Planche : ${sortie}`);
}
