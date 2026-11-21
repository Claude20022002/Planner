/** Grille horaire : jours affichés, rangs, recherche d'un créneau, chevauchement et contrôle des heures. Fonctions sans effet. */
export const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
export const REGIMES = ['initiale', 'continue', 'executive'];
export const VARIANTES = ['normale', 'ramadan'];

/** « 08:30 » ou « 08:30:00 » → minutes depuis minuit. */
export const enMinutes = (heure) => {
  const [h, m] = String(heure).split(':').map(Number);
  return h * 60 + m;
};

/** Lundi → samedi, plus le dimanche s'il porte des créneaux. */
export const joursAffiches = (creneaux) => JOURS.filter((jour) => jour !== 'dimanche' || creneaux.some((c) => c.jour_semaine === 'dimanche'));

/** Rangs 1 → rang le plus haut de la grille. */
export const rangs = (creneaux) =>
  Array.from({ length: Math.max(0, ...creneaux.map((c) => c.rang || 0)) }, (_, i) => i + 1);

/** Trouve le créneau d'un jour et d'un rang. */
export const indexer = (creneaux) => {
  const index = new Map(creneaux.map((c) => [`${c.jour_semaine}-${c.rang}`, c]));
  return (jour, rang) => index.get(`${jour}-${rang}`);
};

/** Un créneau commence avant la fin du créneau de rang précédent, le même jour. */
export const chevauchePrecedent = (creneau, cellule) => {
  const precedent = cellule(creneau.jour_semaine, creneau.rang - 1);
  return Boolean(precedent) && enMinutes(creneau.heure_debut) < enMinutes(precedent.heure_fin);
};

/** Les deux heures sont saisies et la fin vient après le début. */
export const finApresDebut = ({ heure_debut: debut, heure_fin: fin }) => Boolean(debut && fin) && enMinutes(fin) > enMinutes(debut);
