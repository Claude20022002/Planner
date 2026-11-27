// Les 17 modules vendables du site (étude 15, validés par le chef le 21 nov., Bibliothèque à l'étape 3 le 22 nov.),
// leur catégorie, leur état et leur adresse : le seul fichier à changer quand un module devient disponible.
// Plan : docs/conception/vitrine/vit-20-structure-du-site.md (§ 4.2 et § 5). Les noms sont dans i18n/<langue>/modules.json.

/** Catégories du menu « Applications », dans l'ordre d'affichage */
export const CATEGORIES = ['organiser', 'enseigner', 'gerer', 'communiquer'];

/**
 * Les modules, dans l'ordre de l'étude 15 (numero), sauf Paiements en ligne avant
 * Échanges avec l'État comme dans le menu du § 4.2. `etat` : « disponible » (une page) ou « bientot » (tuile grisée,
 * sans lien). `segment` : fin de l'adresse /<langue>/applications/<segment>/ d'un module disponible.
 * `logo` : nom du SVG officiel dans shared/icones/modules.
 */
export const MODULES = [
  { cle: 'emploiDuTemps', numero: 1, categorie: 'organiser', etat: 'disponible', segment: 'emploi-du-temps', logo: 'planning' },
  { cle: 'presences', numero: 2, categorie: 'organiser', etat: 'disponible', segment: 'presences', logo: 'presences' },
  { cle: 'espaceDeCours', numero: 3, categorie: 'enseigner', etat: 'disponible', segment: 'espace-de-cours', logo: 'cours' },
  { cle: 'quizEtJeux', numero: 4, categorie: 'enseigner', etat: 'disponible', segment: 'quiz-et-jeux', logo: 'activites' },
  { cle: 'bibliotheque', numero: 5, categorie: 'enseigner', etat: 'bientot', segment: null, logo: 'bibliotheque' },
  { cle: 'annoncesEtMessages', numero: 6, categorie: 'communiquer', etat: 'disponible', segment: 'annonces-et-messages', logo: 'annonces' },
  { cle: 'vacatairesEtHeures', numero: 7, categorie: 'organiser', etat: 'bientot', segment: null, logo: 'vacataires' },
  { cle: 'evaluations', numero: 8, categorie: 'enseigner', etat: 'bientot', segment: null, logo: 'evaluations' },
  { cle: 'inscriptions', numero: 9, categorie: 'gerer', etat: 'bientot', segment: null, logo: 'inscriptions' },
  { cle: 'documentsVerifiables', numero: 10, categorie: 'gerer', etat: 'bientot', segment: null, logo: 'documents' },
  { cle: 'stages', numero: 11, categorie: 'enseigner', etat: 'bientot', segment: null, logo: 'stages' },
  { cle: 'fraisEtCaisse', numero: 12, categorie: 'gerer', etat: 'bientot', segment: null, logo: 'frais' },
  { cle: 'formationEtFinanceurs', numero: 13, categorie: 'enseigner', etat: 'bientot', segment: null, logo: 'formation' },
  { cle: 'vieScolaire', numero: 14, categorie: 'communiquer', etat: 'bientot', segment: null, logo: 'familles' },
  { cle: 'paiementsEnLigne', numero: 16, categorie: 'gerer', etat: 'bientot', segment: null, logo: 'paiements' },
  { cle: 'echangesAvecEtat', numero: 15, categorie: 'gerer', etat: 'bientot', segment: null, logo: 'etat' },
  { cle: 'pilotage', numero: 17, categorie: 'organiser', etat: 'bientot', segment: null, logo: 'pilotage' },
];

/** Ce que contient le socle « Inclus dans tout abonnement » (page /socle/), dans l'ordre */
export const SOCLE = ['etablissement', 'personnes', 'webMobile', 'securite'];

/** Vrai si le module a sa page */
export const estDisponible = (module) => module.etat === 'disponible';

/** Les modules d'une catégorie, dans l'ordre de l'étude 15 */
export const modulesDeCategorie = (categorie) => MODULES.filter((module) => module.categorie === categorie);

/** Les modules disponibles, dans l'ordre de l'étude 15 */
export const modulesDisponibles = () => MODULES.filter(estDisponible);

/** Un module par sa clé ; lève une erreur si elle est inconnue */
export const moduleDe = (cle) => {
  const module = MODULES.find((m) => m.cle === cle);
  if (!module) throw new Error(`Module inconnu : ${cle}`);
  return module;
};
