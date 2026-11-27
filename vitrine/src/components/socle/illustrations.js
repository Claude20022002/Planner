// Illustrations des ouvertures (VIT-23, plan § 4.2) : quelle image de shared/icones/images/ (VIT-09c) pour quel module.
// Les identifiants des images ne sont pas ceux des logos (espaceDeCours : logo « pedagogie », image « cours »).
// Fichier sans import.meta.glob, pour que les tests le lisent ; OuverturePage.astro pose l'image.

/** Côté de l'image source, en px (512 × 512, shared/icones/README.md) */
export const TAILLE_ILLUSTRATION = 512;

/** Clé du module (donnees/modules.js) → identifiant de l'image (MODULES_ILLUSTRES de shared/icones/index.js) */
export const IMAGE_DU_MODULE = Object.freeze({
  emploiDuTemps: 'planning',
  presences: 'presences',
  espaceDeCours: 'cours',
  quizEtJeux: 'activites',
  annoncesEtMessages: 'annonces',
});

/** Page sans module propre → image reprise d'un module (plan § 4.3, retenu par le coordinateur le 26 nov.) ; les autres pages n'en ont pas */
export const IMAGE_DE_PAGE = Object.freeze({
  direction: 'presences',
  scolarite: 'planning',
  enseignants: 'activites',
  etudiants: 'cours',
  solutions: 'planning',
  'bibliotheque-des-jeux': 'activites',
});

/** Chemin de l'image dans le dépôt, relatif à ce dossier (clé de import.meta.glob) */
export const cheminIllustration = (id) => `../../../../shared/icones/images/${id}.webp`;
