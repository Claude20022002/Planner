/**
 * Rendu de la vidéo de l'accueil du site (VIT-08, plan : docs/conception/vitrine/
 * vit-08-video-presentation.md, § 5). Pour chaque langue : MP4 H.264 en 720p (le fichier lu par
 * défaut, question 7 du plan), WebM VP9 en 1080p (grands écrans), et l'image fixe d'attente en
 * WebP. Vérifie le poids de chaque fichier, puis écrit empreinte.json
 * (vitrine/src/components/accueil/empreinteVideo.js).
 *
 *   node scripts/rendre-accueil.mjs               aperçu, dans out/accueil/ (hors du dépôt)
 *   node scripts/rendre-accueil.mjs --site        rendu final, dans vitrine/public/videos/
 *   node scripts/rendre-accueil.mjs --langues=fr  une langue seulement
 *
 * Le rendu final ne se fait qu'une fois, après l'arrivée des SVG officiels (décision du chef,
 * 18 nov., question 4 du plan) : chaque rendu commité reste pour toujours dans l'historique.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGUES_VIDEO, calculerEmpreinte } from '../../../../vitrine/src/components/accueil/empreinteVideo.js';

const PROJET = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.resolve(PROJET, '..', '..', '..', 'vitrine');
const CLI = path.join(PROJET, 'node_modules', '@remotion', 'cli', 'remotion-cli.js');

const ECHELLE_720 = '0.6667'; // 1920 → 1280
const IMAGE_FIXE = 16 * 30; // 0:16, la semaine remplie et son avis (plan, § 5)
const MO = 1024 * 1024;

/** Les fichiers d'une langue : nom, arguments de rendu, poids maximal (plan, § 5) */
const fichiers = (langue) => [
  { nom: `planner-${langue}-1080.webm`, args: ['render', '--codec=vp9', '--crf=40'], max: 8 * MO },
  { nom: `planner-${langue}-720.mp4`, args: ['render', '--codec=h264', '--crf=28', '--pixel-format=yuv420p', `--scale=${ECHELLE_720}`], max: 6 * MO },
  { nom: `planner-${langue}.webp`, args: ['still', `--frame=${IMAGE_FIXE}`, '--image-format=webp', '--jpeg-quality=80', `--scale=${ECHELLE_720}`], max: 60 * 1024 },
];

const options = process.argv.slice(2);
const versSite = options.includes('--site');
const langues = (options.find((o) => o.startsWith('--langues='))?.split('=')[1].split(',') ?? LANGUES_VIDEO).filter(Boolean);
const inconnues = langues.filter((l) => !LANGUES_VIDEO.includes(l));
if (inconnues.length) throw new Error(`Langue non prévue : ${inconnues.join(', ')} (prévues : ${LANGUES_VIDEO.join(', ')})`);
// L'empreinte couvre toutes les langues : un rendu final partiel laisserait une langue périmée sous une empreinte juste
if (versSite && langues.length !== LANGUES_VIDEO.length) throw new Error('Le rendu final (--site) se fait dans toutes les langues à la fois');

const sortie = versSite ? path.join(SITE, 'public', 'videos') : path.join(PROJET, 'out', 'accueil');
const paquet = path.join(PROJET, 'out', '.paquet-accueil');
fs.mkdirSync(sortie, { recursive: true });

const remotion = (args) => {
  const resultat = spawnSync(process.execPath, [CLI, ...args, '--log=error'], { cwd: PROJET, stdio: 'inherit' });
  if (resultat.status !== 0) throw new Error(`Échec : remotion ${args.join(' ')}`);
};

// Un seul paquet pour tous les rendus
console.log('Préparation du paquet…');
remotion(['bundle', `--out-dir=${paquet}`]);

const poids = {};
const tropLourds = [];
for (const langue of langues) {
  for (const { nom, args, max } of fichiers(langue)) {
    const cible = path.join(sortie, nom);
    console.log(`Rendu de ${nom}…`);
    const [commande, ...reste] = args;
    remotion([commande, paquet, `Accueil-${langue}`, cible, ...reste]);
    poids[nom] = fs.statSync(cible).size;
    if (poids[nom] > max) tropLourds.push(`${nom} : ${(poids[nom] / MO).toFixed(2)} Mo pour ${(max / MO).toFixed(2)} Mo au plus`);
  }
}

const { empreinte, charte } = calculerEmpreinte(SITE);
const fichierEmpreinte = path.join(sortie, 'empreinte.json');
const precedente = fs.existsSync(fichierEmpreinte) ? JSON.parse(fs.readFileSync(fichierEmpreinte, 'utf8')) : { poids: {} };
const tout = { ...precedente.poids, ...poids };
fs.writeFileSync(
  fichierEmpreinte,
  `${JSON.stringify({ empreinte, charte, langues: [...new Set([...(precedente.langues ?? []), ...langues])].sort(), poids: Object.fromEntries(Object.entries(tout).sort()) }, null, 2)}\n`,
);

console.log(`\nFichiers dans ${sortie}`);
for (const [nom, octets] of Object.entries(poids)) console.log(`  ${nom.padEnd(26)} ${(octets / MO).toFixed(2).padStart(6)} Mo`);
console.log(`Empreinte ${empreinte} (charte, version ${charte})`);
if (tropLourds.length) {
  console.error(`\nTrop lourd :\n  ${tropLourds.join('\n  ')}`);
  process.exit(1);
}
