/**
 * Phrase du bilan d'appel. Chaque nombre prend sa forme.
 * En français, zéro et un sont au singulier (règle i18next, comme accorder).
 * L'anglais garde l'adjectif, le même au singulier et au pluriel.
 */

/** @param {Function} t - traducteur i18next */
export const texteBilanAppel = (t, { presents, absents, retards = 0 }) => {
  const lignePresents = t('appel.nbPresents', { count: presents });
  const ligneAbsents = t('appel.nbAbsents', { count: absents });
  if (retards > 0) {
    return t('appel.bilanRetards', { presents: lignePresents, retards, absents: ligneAbsents });
  }
  return t('appel.bilan', { presents: lignePresents, absents: ligneAbsents });
};
