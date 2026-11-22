/** Calendrier : année choisie, formulaires, données envoyées et cible d'un événement. Fonctions sans effet (UIX-06c, lot 4). */
import { ANNEE_VIDE, EVENEMENT_VIDE, PERIODE_VIDE, hhmm } from './constantes.js';

/** Garde l'année affichée si elle existe encore ; sinon l'année active, sinon la première. */
export const anneeChoisie = (liste, courante) =>
  liste.some((a) => a.id_annee === courante) ? courante : ((liste.find((a) => a.active) || liste[0])?.id_annee ?? null);

export const formulaireAnnee = (annee) =>
  annee ? { libelle: annee.libelle, date_debut: annee.date_debut, date_fin: annee.date_fin, active: annee.active } : ANNEE_VIDE;

/** Un nouveau semestre prend S2 quand S1 existe déjà. */
export const formulairePeriode = (periode, annee) =>
  periode
    ? { code: periode.code, libelle: periode.libelle || '', date_debut: periode.date_debut, date_fin: periode.date_fin, nb_semaines: periode.nb_semaines }
    : { ...PERIODE_VIDE, code: annee?.periodes?.some((p) => p.code === 'S1') ? 'S2' : 'S1' };

export const donneesPeriode = (form) => ({ ...form, nb_semaines: Number(form.nb_semaines), libelle: form.libelle || null });

/** Un nouvel événement commence au premier jour de l'année affichée. */
export const formulaireEvenement = (evenement, annee) =>
  evenement
    ? {
        ...EVENEMENT_VIDE,
        ...evenement,
        description: evenement.description || '',
        id_cible: evenement.id_cible ?? '',
        niveau: evenement.niveau || '',
        heure_debut: hhmm(evenement.heure_debut),
        heure_fin: hhmm(evenement.heure_fin),
      }
    : { ...EVENEMENT_VIDE, date_debut: annee?.date_debut || '', date_fin: annee?.date_debut || '' };

/** La cible n'existe que hors de l'établissement entier ; le niveau, que pour la portée « niveau ». */
export const donneesEvenement = (form) => ({
  titre: form.titre,
  description: form.description || null,
  date_debut: form.date_debut,
  date_fin: form.date_fin,
  type_evenement: form.type_evenement,
  bloque_affectations: form.bloque_affectations,
  portee: form.portee,
  id_cible: form.portee === 'etablissement' ? null : Number(form.id_cible) || null,
  niveau: form.portee === 'niveau' ? form.niveau : null,
  heure_debut: form.heure_debut || null,
  heure_fin: form.heure_fin || null,
});

export const datesAConfirmer = (evenements) => evenements.filter((e) => !e.date_confirmee);

const SOURCES = { campus: ['campus', 'id_campus'], filiere: ['filieres', 'id_filiere'], niveau: ['filieres', 'id_filiere'], groupe: ['groupes', 'id_groupe'] };

/** Nom de la cible d'un événement, ou null pour tout l'établissement ; « #id » si la cible n'est plus dans les listes. */
export function nomCible(evenement, cibles) {
  if (evenement.portee === 'etablissement') return null;
  const [liste, cle] = SOURCES[evenement.portee] || [];
  const cible = (cibles[liste] || []).find((c) => c[cle] === evenement.id_cible);
  const nom = cible?.nom || cible?.nom_filiere || cible?.nom_groupe || `#${evenement.id_cible}`;
  return evenement.portee === 'niveau' ? `${nom} · ${evenement.niveau}` : nom;
}
