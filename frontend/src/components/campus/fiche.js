/** Campus : formulaire, données envoyées, paires de campus et temps de trajet. Fonctions sans effet. */
export const CAMPUS_VIDE = { code: '', nom: '', adresse: '', actif: true };

export const formulaireDepuisCampus = (campus) =>
  campus ? { code: campus.code, nom: campus.nom, adresse: campus.adresse || '', actif: campus.actif } : CAMPUS_VIDE;

/** Mêmes conversions qu'avant UIX-06c : code et nom sans espaces autour, adresse vide envoyée nulle. */
export const donneesCampus = (form) => ({ ...form, code: form.code.trim(), nom: form.nom.trim(), adresse: form.adresse.trim() || null });

const clePaire = (idA, idB) => `${idA}-${idB}`;

/** Toutes les paires de campus (a < b), pour la table des temps de trajet. */
export const pairesDe = (campus) => {
  const paires = [];
  for (let i = 0; i < campus.length; i += 1) {
    for (let j = i + 1; j < campus.length; j += 1) {
      const [a, b] = [campus[i], campus[j]].sort((x, y) => x.id_campus - y.id_campus);
      paires.push({ a, b, cle: clePaire(a.id_campus, b.id_campus) });
    }
  }
  return paires;
};

/** Temps enregistrés, par paire : en texte pour les champs, en nombre pour l'état « Renseigné ». */
export const minutesSaisies = (trajets) =>
  Object.fromEntries((trajets || []).map((tr) => [clePaire(tr.id_campus_a, tr.id_campus_b), String(tr.minutes)]));
export const minutesEnregistrees = (trajets) => new Map((trajets || []).map((tr) => [clePaire(tr.id_campus_a, tr.id_campus_b), tr.minutes]));

/** Une durée de trajet est un nombre entier de minutes entre 0 et 240. */
export const dureeValide = (valeur) => Number.isInteger(valeur) && valeur >= 0 && valeur <= 240;
