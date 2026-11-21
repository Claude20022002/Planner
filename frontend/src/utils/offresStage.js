/**
 * Affichage d'une offre de stage (STA-01) : dates, période, prix et lien de partage.
 * Les règles de saisie viennent de shared/offresStage.js, lues aussi par le serveur et par l'application ;
 * ce fichier ne fait que mettre en forme ce que le serveur renvoie.
 */
import { formaterMontant, lienAutorise } from '../../../shared/offresStage.js';

const DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** « 2026-09-01 » → « 01/09/2026 » ; une date déjà au format du serveur, sans fuseau ni langue. */
export const dateCourte = (valeur) => {
  const trouvee = DATE.exec(String(valeur ?? ''));
  return trouvee ? `${trouvee[3]}/${trouvee[2]}/${trouvee[1]}` : null;
};

/**
 * Période d'une offre, sans texte : `{ type: 'periode' | 'debut' | 'fin' | null, debut?, fin? }`.
 * La page choisit la phrase à écrire (offresStage.periode, aPartirDu, jusquAu).
 */
export const periodeDe = (offre) => {
  const debut = dateCourte(offre?.debut);
  const fin = dateCourte(offre?.fin);
  if (debut && fin) return { type: 'periode', debut, fin };
  if (debut) return { type: 'debut', debut };
  if (fin) return { type: 'fin', fin };
  return { type: null };
};

/** « 1 500 MAD » ou null : le montant est affiché tel que saisi, Planner ne calcule pas de paie. */
export const prixAffiche = (offre) => formaterMontant(offre?.gratification, offre?.devise);

/** Fiche publique d'une offre publiée : /offres-stage/p/<jeton>, jamais l'identifiant numérique. */
export const lienPartage = (jeton, origine = typeof window === 'undefined' ? '' : window.location.origin) =>
  jeton ? `${origine}/offres-stage/p/${jeton}` : null;

/** Le lien de candidature n'est suivi que s'il est en http(s) : même règle que le serveur. */
export const lienCandidature = (offre) => {
  const lien = offre?.lien_candidature;
  return lien && lienAutorise(lien) ? lien : null;
};
