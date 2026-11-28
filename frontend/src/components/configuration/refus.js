/**
 * Refus de la configuration dans la langue de la personne (EP-4, R-7) : le texte vient du code stable
 * du serveur ; sa phrase `message`, en français, sert de repli pour un code que l'écran ne connaît pas.
 * Fonctions pures.
 */

// Plusieurs codes du serveur disent la même chose à l'école
const FAMILLES = {
    droit_insuffisant: 'non_modifiable',
    portee_interdite: 'non_modifiable',
    type_invalide: 'mal_forme',
    ligne_vide: 'mal_forme',
    doublon: 'mal_forme',
    parametre_inconnu: 'mal_forme',
    cible_invalide: 'mal_forme',
    forme_invalide: 'mal_forme',
};

/** Le refus porté par une erreur de l'API : { code, message, violations }. */
export const refusDeLErreur = (erreur) => {
    const donnees = erreur?.response?.data ?? {};
    return { code: donnees.code ?? null, message: donnees.message ?? erreur?.message ?? '', violations: donnees.violations ?? [] };
};

/**
 * Le texte d'un refus (violation ou erreur).
 * @param {object} refus { code, message, id_version? }
 * @param {Function} t traduction
 * @param {object} [o] bornes : { min, max } déjà lisibles, pour hors_bornes
 */
export const texteDuRefus = (refus, t, { bornes } = {}) => {
    const code = FAMILLES[refus?.code] ?? refus?.code;
    const repli = refus?.message || t('configuration.refus.inconnu');
    // Sans bornes lisibles, la phrase du serveur dit mieux les bornes qu'un texte à trous
    if (!code || (code === 'hors_bornes' && !bornes)) return repli;
    return t(`configuration.refus.${code}`, { version: refus.id_version, ...bornes, defaultValue: repli });
};
