/**
 * Brouillon de la page « Configuration » (ADM-02b) : les changements tenus par l'écran jusqu'à
 * « Appliquer », jamais gardés dans le navigateur ni envoyés au serveur avant l'aperçu.
 * `tour` change quand les champs doivent reprendre leur valeur (tout effacer, retirer, revenir au départ).
 * `regles`, `contraintes` et `retirer` restent vides en 02b : l'onglet des règles (02c) les remplira.
 * Fonctions pures.
 */

export const BROUILLON_VIDE = { reglages: {}, regles: {}, contraintes: [], retirer: [], tour: 0 };

/** Pose une valeur (unité stockée) ; une valeur égale à celle en vigueur sort du brouillon. */
export const poserReglage = (b, id, valeur, enVigueur) => {
    const { [id]: _ancienne, ...reste } = b.reglages;
    return { ...b, reglages: valeur === enVigueur ? reste : { ...reste, [id]: { valeur } } };
};

/** Revenir à la valeur de départ : la ligne de l'école est retirée, le profil s'applique de nouveau. */
export const revenirAuDepart = (b, id) => ({ ...b, reglages: { ...b.reglages, [id]: { retiree: true } }, tour: b.tour + 1 });

/** Retire un réglage du brouillon ; `remettre` rend au champ la valeur en vigueur. */
export const retirerReglage = (b, id, { remettre = false } = {}) => {
    const { [id]: _retire, ...reste } = b.reglages;
    return { ...b, reglages: reste, tour: remettre ? b.tour + 1 : b.tour };
};

/** Vide le brouillon. */
export const viderBrouillon = (b) => ({ ...BROUILLON_VIDE, tour: b.tour + 1 });

/** Nombre de changements. */
export const compter = (b) => Object.keys(b.reglages).length + Object.keys(b.regles).length + b.contraintes.length + b.retirer.length;

/** Corps envoyé à l'aperçu et à « Appliquer » (POST /api/moteur/versions/apercu et /versions). */
export const corpsDe = (b, { date_effet, base, libelle }) => ({
    ...(libelle?.trim() ? { libelle: libelle.trim() } : {}),
    date_effet,
    base,
    lignes: Object.entries(b.reglages).map(([cle, c]) => (c.retiree ? { cle, retiree: true } : { cle, valeur: c.valeur })),
    regles: Object.entries(b.regles).map(([id, choix]) => ({ id, choix })),
    contraintes: b.contraintes,
    retirer: b.retirer,
});

/** Réducteur de useBrouillon. */
export const reduireBrouillon = (b, action) => {
    switch (action.type) {
        case 'poser':
            return poserReglage(b, action.id, action.valeur, action.enVigueur);
        case 'revenir':
            return revenirAuDepart(b, action.id);
        case 'retirer':
            return retirerReglage(b, action.id, { remettre: action.remettre });
        case 'vider':
            return viderBrouillon(b);
        default:
            return b;
    }
};
