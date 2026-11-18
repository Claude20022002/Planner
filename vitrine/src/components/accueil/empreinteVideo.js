// Empreinte de la vidéo de l'accueil (VIT-08) : tout ce que la vidéo lit hors de son projet Remotion.
// Le script de rendu (docs/presentation/video/scripts/rendre-accueil.mjs) l'écrit dans
// public/videos/empreinte.json ; le test du site la recalcule et échoue si elle a changé : une vidéo
// dont les textes, les couleurs ou le logo ne sont plus à jour ne part pas en ligne.
// Outil de Node seulement (construction et tests) : aucun composant ne l'importe.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

/** Langues rendues ; l'arabe viendra après UIX-04 */
export const LANGUES_VIDEO = ['fr', 'en'];

const MO = 1024 * 1024;

/**
 * Les fichiers rendus d'une langue et leur poids maximal (plan, § 5 et question 7) : le MP4 en 720p
 * lu par défaut, le WebM en 1080p pour les grands écrans, l'image fixe d'attente.
 */
export const fichiersVideo = (langue) => ({
  mp4: { nom: `planner-${langue}-720.mp4`, max: 6 * MO },
  webm: { nom: `planner-${langue}-1080.webm`, max: 8 * MO },
  image: { nom: `planner-${langue}.webp`, max: 60 * 1024 },
});

/** Langue de la vidéo montrée sur une page : la sienne si elle est rendue, sinon le français */
export const langueVideo = (langue) => (LANGUES_VIDEO.includes(langue) ? langue : 'fr');

/**
 * Les clés de accueil.json que la vidéo affiche : ses scènes et ses écrans, et les illustrations du
 * site qu'elle reprend. Pas le titre de la section ni ses boutons, qui sont sur la page.
 */
export const CLES_VIDEO = ['video.scenes', 'video.illustrations', 'emploi.illustration', 'appel.illustration', 'quiz.illustration', 'report.etapes'];

/** Les fichiers du site que la vidéo dessine : le logo animé et l'icône des en-têtes d'écran */
export const LOGOS_VIDEO = ['public/logo/planner-horloge.svg', 'public/logo/planner-icone.svg'];

const lireCle = (objet, cle) => cle.split('.').reduce((valeur, morceau) => valeur?.[morceau], objet);

/** Fins de ligne ramenées à LF : la même empreinte sous Windows et dans la CI */
const texteNormal = (fichier) => fs.readFileSync(fichier, 'utf8').replace(/\r\n/g, '\n');

/**
 * Calcule l'empreinte à partir du dossier du site (vitrine/) et de la racine du dépôt.
 * Rend { empreinte, charte } : l'empreinte en hexadécimal court, et la version des jetons.
 */
export const calculerEmpreinte = (dossierSite) => {
  const racine = path.resolve(dossierSite, '..');
  const jetons = JSON.parse(texteNormal(path.join(racine, 'shared', 'charte', 'jetons.json')));
  const hachage = createHash('sha256');

  for (const langue of LANGUES_VIDEO) {
    const textes = JSON.parse(texteNormal(path.join(dossierSite, 'src', 'i18n', langue, 'accueil.json')));
    for (const cle of CLES_VIDEO) hachage.update(`${langue}:${cle}:${JSON.stringify(lireCle(textes, cle) ?? null)}\n`);
  }
  hachage.update(`charte:${jetons.version}\n`);
  for (const logo of LOGOS_VIDEO) hachage.update(`${logo}:${texteNormal(path.join(dossierSite, logo))}\n`);

  return { empreinte: hachage.digest('hex').slice(0, 16), charte: jetons.version };
};
