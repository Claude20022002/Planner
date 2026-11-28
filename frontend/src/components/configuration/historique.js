/**
 * Historique des versions des réglages, à l'écran (ADM-02b) : état, actions permises, libellé, auteur,
 * date. En base, une version annulée reste « appliquee » avec `annulee_par` ; `statut: "annulee"` est un
 * brouillon abandonné. Une date seule s'affiche sans fuseau (le jour de l'école, tel quel). Fonctions pures.
 */
import { localeEcran } from '../../utils/dates.js';

/** État : brouillon, appliquee, prevue (date d'effet à venir), abandonnee, annulee. */
export const etatDe = (v, aujourdhui) => {
    if (v.statut === 'brouillon') return 'brouillon';
    if (v.statut === 'annulee') return 'abandonnee';
    if (v.annulee_par) return 'annulee';
    return aujourdhui && v.date_effet > aujourdhui ? 'prevue' : 'appliquee';
};

/** Teinte de la pastille d'état (StateChip). */
export const TEINTES = { brouillon: 'warning', appliquee: 'success', prevue: 'info', abandonnee: 'neutral', annulee: 'neutral' };

/** Ce qu'on peut faire d'une version : annuler une version appliquée ou prévue, abandonner un brouillon. */
export const actionsDe = (v, aujourdhui) => {
    const etat = etatDe(v, aujourdhui);
    return { annuler: etat === 'appliquee' || etat === 'prevue', abandonner: etat === 'brouillon' };
};

/** Libellé : celui d'une annulation est composé par l'écran, dans la langue de la personne. */
export const libelleDe = (v, t) => (v.annule_version ? t('configuration.historique.annulationDe', { n: v.annule_version }) : v.libelle?.trim() || t('configuration.historique.sansLibelle'));

/** Auteur ; une version sans auteur vient de Planner (reprise automatique). */
export const auteurDe = (v, t) => v.auteur?.nom?.trim() || t('configuration.historique.sansAuteur');

/** Les changements d'une version, en mots (« 1 réglage · 2 contraintes ajoutées »). */
export const compteDe = (v, t) =>
    [
        ['reglages', v.nb_reglages],
        ['contraintes', v.nb_contraintes],
        ['retraits', v.nb_retraits],
    ]
        .filter(([, n]) => n > 0)
        .map(([cle, n]) => t(`configuration.historique.${cle}`, { count: n }))
        .join(' · ') || '—';

/** Une date AAAA-MM-JJ, lisible dans la langue de la personne, sans passer par le fuseau du navigateur. */
export const dateLisible = (jour, langue) =>
    /^\d{4}-\d{2}-\d{2}$/.test(jour ?? '') ? new Intl.DateTimeFormat(localeEcran(langue), { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${jour}T00:00:00Z`)) : '';
