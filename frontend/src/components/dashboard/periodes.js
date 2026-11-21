/**
 * Périodes du tableau de bord de l'administration (UIX-11) : chaque chiffre dit la sienne.
 * Fonctions pures, à l'heure du navigateur comme le panneau des séances (`toLocalISODate`).
 *
 * « Cette semaine » va du lundi au dimanche qui contiennent aujourd'hui (réponse 6 du plan). Le jour
 * de début n'est écrit qu'ici, en paramètre : un réglage par école (PLA-13) s'y branchera sans
 * rien recoder ailleurs (EP-5).
 */
import { toLocalISODate } from '../../../../shared/session.js';

/** Premier jour de la semaine, numéroté comme Date.getDay (dimanche = 0, lundi = 1). */
export const PREMIER_JOUR_SEMAINE = 1;

/** Le jour civil local décalé de `n` jours (négatif : avant), sans passer par les millisecondes (heure d'été). */
const decaler = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);

/** Aujourd'hui et les `n` jours suivants : { debut, fin } au format AAAA-MM-JJ (panneau des séances). */
export const joursSuivants = (n, maintenant = new Date()) => ({
  debut: toLocalISODate(maintenant),
  fin: toLocalISODate(decaler(maintenant, n)),
});

/** Les `n` prochains jours, aujourd'hui compris : { debut, fin } (examens à venir). */
export const prochainsJours = (n, maintenant = new Date()) => joursSuivants(n - 1, maintenant);

/** La semaine qui contient aujourd'hui, du premier jour au septième : { debut, fin }. */
export const semaineEnCours = (maintenant = new Date(), premierJour = PREMIER_JOUR_SEMAINE) => {
  const ecart = (maintenant.getDay() - premierJour + 7) % 7;
  const debut = decaler(maintenant, -ecart);
  return { debut: toLocalISODate(debut), fin: toLocalISODate(decaler(debut, 6)) };
};

/** Le mois en cours, au format AAAA-MM (paramètre `mois` des routes du suivi et de l'usage). */
export const moisEnCours = (maintenant = new Date()) => toLocalISODate(maintenant).slice(0, 7);

/**
 * La période en cours, comme la page Suivi : une période d'une année active qui contient aujourd'hui,
 * sinon la première période d'une année active, sinon aucune (null). `annees` est la réponse de
 * GET /calendrier/annees ; la période rendue porte le libellé de son année.
 */
export const periodeEnCours = (annees = [], jour = toLocalISODate()) => {
  const actives = annees
    .filter((a) => a.active)
    .flatMap((a) => (a.periodes ?? []).map((p) => ({ ...p, libelle_annee: a.libelle })));
  return actives.find((p) => p.date_debut <= jour && jour <= p.date_fin) ?? actives[0] ?? null;
};

/** Nom d'une période pour l'écran : son libellé, sinon son code, suivi de l'année (« S1 · 2026-2027 »). */
export const nomPeriode = (periode) =>
  periode ? [periode.libelle || periode.code, periode.libelle_annee].filter(Boolean).join(' · ') : '';
