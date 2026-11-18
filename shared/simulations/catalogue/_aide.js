/** Helpers partagés par les fichiers de catalogue des simulations originales. */

/** Texte bilingue { fr, en } ; aucune chaîne en dur ailleurs dans le catalogue. */
export const texte = (fr, en) => ({ fr, en });

/** School-neutral discipline and challenge levels; these are not academic grades. */
export const curriculum = (fr, en) => ({ discipline: texte(fr, en), niveaux: [1, 2, 3] });
