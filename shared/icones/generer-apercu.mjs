/**
 * Planche d'aperçu des logos et des icônes de shared/icones/ (VIT-09a) : écrit apercu.html, à ouvrir
 * en local pour la relecture du chef. Ni publiée, ni commitée (.gitignore).
 *   node shared/icones/generer-apercu.mjs
 * Chaque logo à 24, 32 (dessin simplifié), 48 et 96 px (dessin détaillé), sur les fonds blanc,
 * gris-fond et ecran de la charte. Les icônes vivantes s'ajoutent à l'étape 5.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const jetons = JSON.parse(fs.readFileSync(path.join(ICI, '..', 'charte', 'jetons.json'), 'utf8'));
const c = (nom) => jetons.familles.couleurs[nom].valeur;

/** Logos présents dans modules/ : chaque <id>.svg avec son <id>-petit.svg */
const logos = fs.readdirSync(path.join(ICI, 'modules'))
  .filter((f) => f.endsWith('.svg') && !f.endsWith('-petit.svg'))
  .map((f) => f.replace('.svg', ''));

const FONDS = [['blanc', c('blanc')], ['gris-fond', c('gris-fond')], ['ecran', c('ecran')]];
const TAILLES = [24, 32, 48, 96];
const fichier = (id, taille) => `modules/${id}${taille <= 32 ? '-petit' : ''}.svg`;

const ligne = (id) => FONDS.map(([nom, fond]) => `
    <div class="fond" style="background:${fond}" title="${nom}">
      ${TAILLES.map((t) => `<img src="${fichier(id, t)}" width="${t}" height="${t}" alt="${id}, ${t} px">`).join('\n      ')}
    </div>`).join('');

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Aperçu des logos</title>
<style>
  body { margin: 0; padding: 32px; font: 15px/1.4 system-ui, sans-serif; color: ${c('encre')}; background: ${c('blanc')}; }
  h1 { font-size: 22px; margin: 0 0 4px; } p { margin: 0 0 24px; color: ${c('gris-texte')}; }
  .logo { display: grid; grid-template-columns: 140px repeat(3, auto); gap: 12px; align-items: center; margin-block-end: 16px; }
  .fond { display: flex; gap: 20px; align-items: center; padding: 16px 20px; border-radius: 16px; }
  .nom { font-weight: 600; }
</style></head>
<body>
  <h1>Logos des applications</h1>
  <p>24 et 32 px : dessin simplifié ; 48 et 96 px : dessin détaillé. Fonds : blanc, gris-fond, ecran (sombre).</p>
  ${logos.map((id) => `<div class="logo"><span class="nom">${id}</span>${ligne(id)}\n  </div>`).join('\n  ')}
</body></html>
`;

fs.writeFileSync(path.join(ICI, 'apercu.html'), html);
console.log(`Aperçu écrit : shared/icones/apercu.html (${logos.length} logo${logos.length > 1 ? 's' : ''}).`);
