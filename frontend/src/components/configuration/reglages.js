/**
 * Les cinq réglages de l'école à l'écran (ADM-02b) : unité de saisie, valeur lisible, contrôle local.
 * Aucune liste recopiée : l'identifiant, l'unité, les bornes et le pas viennent de GET /api/moteur/reglages.
 * Une saisie en heures se stocke en minutes. Fonctions pures.
 */

const FACTEUR = { heure: 60 };
const facteur = (r) => FACTEUR[r.unite] ?? 1;

/** Clé de texte d'un identifiant du catalogue : les points sépareraient les niveaux de la traduction. */
export const cleTexte = (id) => String(id).replaceAll('.', '_');

/** Texte du champ pour une valeur stockée. */
export const versSaisie = (r, valeur) => (valeur === null || valeur === undefined ? '' : String(valeur / facteur(r)));

/** Valeur stockée d'une saisie ; null si ce n'est pas un nombre entier positif ou nul. */
export const depuisSaisie = (r, saisie) => {
    const texte = String(saisie ?? '').trim();
    return /^\d+$/.test(texte) ? Number(texte) * facteur(r) : null;
};

/** Valeur lisible, avec son unité traduite (« 6 h », « 45 min », « 90 % », « 2 »). */
export const valeurLisible = (r, valeur, t) => {
    if (valeur === null || valeur === undefined) return '—';
    const nombre = valeur / facteur(r);
    return r.unite === 'nombre' || !r.unite ? String(nombre) : `${nombre} ${t(`configuration.unites.${r.unite}`)}`;
};

/** Refus local d'une saisie (avant l'aperçu), par les bornes reçues ; null si elle est permise. */
export const controlerSaisie = (r, saisie) => {
    const valeur = depuisSaisie(r, saisie);
    if (valeur === null) return { code: 'saisie_invalide' };
    if (valeur < r.min || valeur > r.max || valeur % r.pas !== 0) return { code: 'hors_bornes' };
    return null;
};
