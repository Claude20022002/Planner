import { filtrerOffres, formaterMontant, lienAutorise } from '../../../shared/offresStage.js';

/**
 * Offres de stage (STA-01, espace Carrière) côté application : mise en forme et filtres.
 * Les règles viennent de shared/offresStage.js, comme pour le site et le serveur.
 */

const DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** « 2026-09-01 » → « 01/09/2026 », ou null. */
export const dateOffre = (valeur) => {
  const trouvee = DATE.exec(String(valeur ?? ''));
  return trouvee ? `${trouvee[3]}/${trouvee[2]}/${trouvee[1]}` : null;
};

/** Prix tel que saisi, « 1 500 MAD », ou null. */
export const prixOffre = (offre) => formaterMontant(offre?.gratification, offre?.devise);

/** Période sans texte : { type: 'periode' | 'debut' | 'fin' | null, debut?, fin? }. */
export const periodeOffre = (offre) => {
  const debut = dateOffre(offre?.debut);
  const fin = dateOffre(offre?.fin);
  if (debut && fin) return { type: 'periode', debut, fin };
  if (debut) return { type: 'debut', debut };
  if (fin) return { type: 'fin', fin };
  return { type: null };
};

/** Filières présentes dans la liste, sans doublon : [{ id, nom }]. */
export const filieresDesOffres = (offres) => {
  const vues = new Map();
  (offres ?? []).forEach((offre) => {
    if (offre.id_filiere && offre.filiere && !vues.has(offre.id_filiere)) vues.set(offre.id_filiere, offre.filiere);
  });
  return [...vues].map(([id, nom]) => ({ id, nom })).sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
};

/** Recherche (titre, entreprise, ville) et filière : mêmes règles que le site. */
export const offresFiltrees = (offres, { recherche = '', idFiliere = null } = {}) => filtrerOffres(offres, { recherche, id_filiere: idFiliere });

/** Le lien de candidature n'est proposé que s'il est en http(s) : même règle que le serveur. */
export const lienCandidature = (offre) => {
  const lien = offre?.lien_candidature;
  return lien && lienAutorise(lien) ? lien : null;
};
