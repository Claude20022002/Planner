/**
 * Charte de la vidéo de l'accueil (VIT-08) : les jetons de shared/charte/jetons.json, la même source
 * que le CSS du site, et le mouvement du site (vitrine/src/components/socle/animations.js) converti
 * en images. Les couleurs ne sont jamais écrites ici : un changement de la charte change la vidéo.
 * N'importe rien de ../theme.ts, qui est l'ancienne charte des compositions d'octobre.
 */
import { Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import jetons from "../../../../../shared/charte/jetons.json";

type Famille = keyof typeof jetons.familles;
const valeur = (famille: Famille, nom: string): string =>
  (jetons.familles[famille] as Record<string, { valeur: unknown }>)[nom].valeur as string;

/** Version des jetons, reprise dans l'empreinte du rendu (une vidéo rendue avec d'autres couleurs est périmée). */
export const VERSION_CHARTE = jetons.version;

export const C = {
  bleuNuit: valeur("couleurs", "bleu-nuit"),
  bleu: valeur("couleurs", "bleu"),
  bleuProfond: valeur("couleurs", "bleu-profond"),
  bleuClair: valeur("couleurs", "bleu-clair"),
  bleuPale: valeur("couleurs", "bleu-pale"),
  blanc: valeur("couleurs", "blanc"),
  encre: valeur("couleurs", "encre"),
  grisFond: valeur("couleurs", "gris-fond"),
  grisTexte: valeur("couleurs", "gris-texte"),
  grisTrait: valeur("couleurs", "gris-trait"),
  ecran: valeur("couleurs", "ecran"),
  // Accent du quiz et des jeux seulement, jamais du texte sur blanc (rôle du jeton)
  jeu: valeur("couleurs", "jeu"),
  surfaceSombre: valeur("sombre", "surface-sombre"),
  texteSombre: valeur("sombre", "texte-sombre"),
  texteSombreSecond: valeur("sombre", "texte-sombre-second"),
} as const;

// Seule famille de la charte. Chargée au rendu, sur le poste : le site, lui, ne charge rien d'ailleurs.
const inter = loadFont("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin", "latin-ext"] });
export const POLICE = inter.fontFamily;

/**
 * La vidéo fait 1920 px de large ; le site est dessiné pour un écran d'environ 1280 px. Les rayons et
 * les ombres de la charte sont agrandis de ce facteur, pour garder les mêmes proportions.
 */
export const ECHELLE = 1.5;

/** « 1.25rem » → 30 (px, à l'échelle de la vidéo) ; « 999px » reste 999. */
const enPx = (texte: string) => {
  const n = parseFloat(texte);
  return texte.endsWith("rem") ? n * 16 * ECHELLE : n;
};

export const RAYON = {
  petit: enPx(valeur("rayons", "rayon-petit")),
  normal: enPx(valeur("rayons", "rayon")),
  grand: enPx(valeur("rayons", "rayon-grand")),
  pilule: enPx(valeur("rayons", "rayon-pilule")),
} as const;

/** Agrandit chaque longueur en px d'une ombre de la charte ; les couleurs restent telles quelles. */
const agrandirOmbre = (ombre: string) =>
  ombre.replace(/(-?\d+(?:\.\d+)?)px/g, (_, n: string) => `${Number(n) * ECHELLE}px`);

export const OMBRE = {
  carte: agrandirOmbre(valeur("ombres", "ombre-carte")),
  appareil: agrandirOmbre(valeur("ombres", "ombre-appareil")),
} as const;

/** La courbe de toutes les transitions du site, pour interpolate(). */
const [x1, y1, x2, y2] = jetons.familles.mouvement["courbe-tableau"].valeur as number[];
export const COURBE = Easing.bezier(x1, y1, x2, y2);

export const IPS = 30;

/** Mouvements du site (animations.js), en secondes : apparition au défilement, tour des aiguilles. */
export const MOUVEMENT = {
  apparition: 0.9,
  glissement: 28 * ECHELLE,
  aiguilles: 2.4,
} as const;

/**
 * Tailles du texte à l'écran. Plus grandes que sur le site : la vidéo est aussi lue sur un téléphone,
 * réduite à 390 px de large ; un titre de 104 px y fait encore 21 px.
 */
export const TEXTE = {
  titre: 104,
  ligne: 52,
  legende: 34,
  interligneTitre: Number(valeur("typographie", "interligne-titre")),
  interligneTexte: 1.3,
} as const;
