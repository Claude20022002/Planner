/**
 * Planche d'aperçu des logos (style du logo Planner depuis VIT-09d) et des icônes de shared/icones/
 * (VIT-09a) : écrit apercu.html, à ouvrir en local pour la relecture du chef. Ni publiée, ni commitée
 * (.gitignore).
 *   node shared/icones/generer-apercu.mjs
 * Chaque logo à 24, 32 (dessin simplifié), 48 et 96 px (dessin détaillé), sur les fonds blanc,
 * gris-fond et ecran de la charte. Puis chaque icône vivante dans un bouton « icone-vivante », à
 * survoler ou à atteindre au clavier, sur fond clair et sur fond sombre.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOGOS, MODULES_ILLUSTRES, CLASSE_PORTEUR, ICONES_VIVANTES, fichierLogo } from './index.js';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const jetons = JSON.parse(fs.readFileSync(path.join(ICI, '..', 'charte', 'jetons.json'), 'utf8'));
const c = (nom) => jetons.familles.couleurs[nom].valeur;

// Libellés de relecture de la planche locale.
const LIBELLES = {
  planning: 'Emploi du temps',
  presences: 'Présences',
  cours: 'Espace de cours',
  activites: 'Quiz et jeux',
  bibliotheque: 'Bibliothèque',
  annonces: 'Annonces et messages',
  vacataires: 'Vacataires et heures',
  evaluations: 'Évaluations, crédits et jurys',
  inscriptions: 'Inscriptions',
  documents: 'Documents vérifiables',
  stages: 'Stages',
  frais: 'Frais et caisse',
  formation: 'Formation et financeurs',
  familles: 'Vie scolaire et familles',
  etat: 'Échanges avec l’État',
  paiements: 'Paiements en ligne',
  pilotage: 'Pilotage',
  pedagogie: 'Enseignements',
  personnes: 'Personnes',
  etablissement: 'Établissement',
};

const FONDS = [['blanc', c('blanc')], ['gris-fond', c('gris-fond')], ['ecran', c('ecran')]];
const TAILLES = [24, 32, 48, 96];

const ligne = (id) => FONDS.map(([nom, fond]) => `
    <div class="fond" style="background:${fond}" title="${nom}">
      ${TAILLES.map((t) => `<img src="${fichierLogo(id, t)}" width="${t}" height="${t}" alt="${id}, ${t} px">`).join('\n      ')}
    </div>`).join('');

/** Une icône vivante telle qu'elle sera posée : le SVG en ligne, sans son commentaire */
const icone = (nom) => fs.readFileSync(path.join(ICI, 'vivantes', `${nom}.svg`), 'utf8').replace(/<!--[\s\S]*?-->\n?/g, '');
const boutons = () => ICONES_VIVANTES
  .map((nom) => `<button type="button" class="${CLASSE_PORTEUR}" data-icone="${nom}">${icone(nom)}<span>${nom}</span></button>`)
  .join('\n    ');

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Aperçu des logos</title>
<link rel="stylesheet" href="vivantes/vivantes.css">
<style>
  body { margin: 0; padding: 32px; font: 15px/1.4 system-ui, sans-serif; color: ${c('encre')}; background: ${c('blanc')}; }
  h1 { font-size: 22px; margin: 0 0 4px; } h1.suite { margin-top: 32px; } p { margin: 0 0 24px; color: ${c('gris-texte')}; }
  .logo { display: grid; grid-template-columns: 140px repeat(3, auto); gap: 12px; align-items: center; margin-block-end: 16px; }
  .fond { display: flex; gap: 20px; align-items: center; padding: 16px 20px; border-radius: 16px; }
  .ensemble { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin: 16px 0 24px; }
  .ensemble figure { display: grid; justify-items: center; align-content: start; padding: 12px; text-align: center; background: ${c('gris-fond')}; border-radius: 12px; }
  .ensemble img { width: 64px; height: 64px; }
  details > summary { width: fit-content; font-weight: 600; cursor: pointer; padding: 8px 0; }
  details[open] > summary { margin-bottom: 12px; }
  .illustrations { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr)); }
  figure { margin: 0; } figure img { display: block; width: 100%; height: auto; border-radius: 12px; }
  figcaption { margin-block-start: 6px; font-weight: 600; }
  @media (max-width: 1180px) {
    .logo { grid-template-columns: 1fr; }
    .fond { flex-wrap: wrap; }
    body { padding: 16px; }
  }
  .nom { font-weight: 600; }
  .icones { display: flex; flex-wrap: wrap; gap: 10px; padding: 20px; border-radius: 16px; margin-block-end: 16px; }
  .icones.sombre { background: ${c('ecran')}; }
  button { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 999px; font: inherit; cursor: pointer; }
  .clair button { border: 1px solid ${c('gris-trait')}; background: ${c('blanc')}; color: ${c('bleu')}; }
  .sombre button { border: 1px solid ${c('trait-fort')}; background: transparent; color: ${c('bleu-clair')}; }
  button:focus-visible { outline: 3px solid ${c('bleu')}; outline-offset: 2px; }
</style></head>
<body>
  <h1>Logos des applications</h1>
  <section class="ensemble" aria-label="Les vingt logos">
    ${Object.keys(LOGOS).map((id) => `<figure><img src="${fichierLogo(id, 64)}" width="64" height="64" alt=""><figcaption>${LIBELLES[id]}</figcaption></figure>`).join('\n    ')}
  </section>
  <details>
  <summary>Comparer les logos à 24, 32, 48 et 96 px sur trois fonds</summary>
  ${Object.keys(LOGOS).map((id) => `<div class="logo"><span class="nom">${LIBELLES[id]}</span>${ligne(id)}\n  </div>`).join('\n  ')}
  </details>
  <h1 class="suite" id="illustrations">Illustrations des modules</h1>
  <section class="illustrations">
    ${MODULES_ILLUSTRES.map((id) => `<figure><img src="images/${id}.webp" width="512" height="512" alt=""><figcaption>${LIBELLES[id]}</figcaption></figure>`).join('\n    ')}
  </section>
  <h1 class="suite">Icônes vivantes</h1>
  <p>Survoler un bouton, ou l'atteindre avec Tab : l'icône s'anime une fois. Rien ne bouge si le système demande moins de mouvement.</p>
  <div class="icones clair">
    ${boutons()}
  </div>
  <div class="icones sombre">
    ${boutons()}
  </div>
</body></html>
`;

fs.writeFileSync(path.join(ICI, 'apercu.html'), html);
console.log(`Aperçu écrit : shared/icones/apercu.html (${Object.keys(LOGOS).length} logos, ${ICONES_VIVANTES.length} icônes vivantes).`);
