/**
 * Textes de la vidéo de l'accueil : ceux de vitrine/src/i18n/<langue>/accueil.json, la même source que
 * la page et sa transcription (VIT-08). La vidéo n'écrit aucune phrase elle-même. L'arabe viendra
 * après UIX-04 ; d'ici là la page arabe montre la vidéo française.
 *
 * En français, chaque texte reçoit la typographie de l'écran : une espace insécable avant « ? ! : ; »
 * et après « « », et un trait d'union insécable dans « celle-ci », pour qu'aucun signe ne parte seul
 * à la ligne. La page, elle, garde ses textes tels quels.
 */
import fr from "../../../../../vitrine/src/i18n/fr/accueil.json";
import en from "../../../../../vitrine/src/i18n/en/accueil.json";

export type Langue = "fr" | "en";
export type Textes = typeof fr;

const typographie = (texte: string) =>
  texte
    .replace(/ ([?!:;»])/g, " $1")
    .replace(/« /g, "« ")
    .replace(/-(ci|là)\b/g, "‑$1");

const appliquer = <T,>(valeur: T, f: (texte: string) => string): T => {
  if (typeof valeur === "string") return f(valeur) as T;
  if (Array.isArray(valeur)) return valeur.map((v) => appliquer(v, f)) as T;
  if (valeur && typeof valeur === "object") {
    return Object.fromEntries(Object.entries(valeur).map(([cle, v]) => [cle, appliquer(v, f)])) as T;
  }
  return valeur;
};

const TEXTES: Record<Langue, Textes> = { fr: appliquer(fr, typographie), en };

export const textes = (langue: Langue): Textes => TEXTES[langue];
