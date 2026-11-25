/**
 * Modèle du document « Emploi du temps du mois » (EDT-04) : l'école le règle dans le panneau
 * « Identité et marque ». `hestim` garde le document officiel de l'école d'origine ; tout le reste
 * (`planner`, absent, inconnu) donne le document neutre, qui n'écrit aucun mot du supérieur.
 */
export const estOfficiel = (modele) => modele === 'hestim';

/**
 * Libellés du document selon le modèle : clé du titre d'année, clé de l'aide avant impression, et
 * visibilité de la ligne de code de la classe (« 4A | IIIA (S7) » n'existe qu'au format officiel).
 * L'aide du format officiel est `monthly.help`, le texte déjà écrit pour l'école d'origine.
 */
export const libellesDocument = (modele) => (estOfficiel(modele)
  ? { cleAnnee: 'monthly.year', cleAide: 'monthly.help', codeVisible: true }
  : { cleAnnee: 'monthly.anneeScolaire', cleAide: 'monthly.aideNeutre', codeVisible: false });
