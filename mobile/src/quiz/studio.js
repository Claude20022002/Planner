/**
 * Quiz du Studio diffusés par l'enseignant : leur QR est l'adresse …/quiz/code/<code> du site
 * (le même format de code que les jeux lancés en classe). L'application n'en garde que le code et
 * ouvre ce chemin sur la plateforme, déjà connectée : jamais l'adresse lue telle quelle.
 */

import { ecranDuQuiz } from './direct';

const MOTIF = /\/quiz\/code\/([A-Z0-9]{6})(?:[?#]|$)/;

/** Code du quiz lu dans un QR, ou null si le QR n'en est pas un (appel, jeu, partie ClassQuiz) */
export const codeQuizScanne = (texte) => (typeof texte === 'string' ? MOTIF.exec(texte)?.[1] ?? null : null);

/** Chemin du site qui ouvre ce quiz pour l'étudiant */
export const cheminQuiz = (code) => `/quiz/code/${code}`;

export function codeQuizSaisi(texte) {
  const code = texte.trim().toUpperCase();
  return /^[A-Z0-9]{6}$/.test(code) ? code : null;
}

export function destinationQuiz(accueil, code) {
  const ecran = ecranDuQuiz(accueil);
  if (ecran) return { ecran };
  if (accueil?.mode === 'rythme' && accueil.id_session) return { web: cheminQuiz(code) };
  return null;
}
