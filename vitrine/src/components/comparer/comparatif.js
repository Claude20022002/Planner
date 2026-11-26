// Structure du comparatif (VIT-14) : ordre des lignes, lignes montrées sur l'accueil, date de la
// méthode et source de chaque case Planner dans le dépôt. Les textes sont dans i18n/<langue>/comparer.json.
// Plans validés : docs/conception/vitrine/vit-14-comparatif.md (§ 4) et vit-14b-criteres.md (§ 3 et § 4).
// Les sources ne sont pas montrées sur le site (réponse 7) : tests/comparer.test.js vérifie que chaque fichier existe.

/** Lignes du tableau, dans l'ordre : huit critères, puis ce que Planner n'a pas encore */
export const LIGNES = ['calcul', 'refus', 'report', 'appel', 'appelProtege', 'compte', 'sansTelephone', 'sansReseau', 'bientot'];

/** Lignes du tableau court de l'accueil (réponse 4 et § 4 bis) */
export const LIGNES_ACCUEIL = ['calcul', 'refus', 'appel', 'sansTelephone', 'bientot'];

/** Nombre de colonnes : Planner, puis les quatre approches */
export const COLONNES = 5;

/** Date de la méthode : celle de la dernière validation par le chef (VIT-14b), à changer quand les sources sont revérifiées */
export const DATE = '2026-11-19';

/** Fichiers qui prouvent chaque case Planner, depuis la racine du dépôt */
export const SOURCES = {
  calcul: [
    'backend/services/generation/timefold/generation.js',
    'solver/src/main/java/ma/hestim/solver/contraintes/ContraintesEmploiDuTemps.java',
    'solver/src/main/java/ma/hestim/solver/contraintes/PreferencesEmploiDuTemps.java',
  ],
  refus: [
    'backend/services/generation/timefold/probleme.js',
    'backend/services/generation/timefold/deploiement.js',
    'backend/services/generation/timefold/avertissements.js',
    'backend/services/planning/seances.js',
    'backend/services/moteur/contraintes/bilan.js',
  ],
  report: [
    'backend/controllers/demandeReportController.js',
    'backend/services/planning/reports.js',
    'backend/services/planning/reportDecision.js',
    'backend/services/planning/seances.js',
  ],
  appel: [
    'backend/services/presences/appel.js',
    'backend/services/presences/statuts.js',
    'frontend/src/pages/Appel.jsx',
    'frontend/src/components/appel/LigneAppel.jsx',
    'mobile/src/app/scanner.jsx',
  ],
  appelProtege: [
    'backend/services/presences/appel.js',
    'backend/services/presences/appareil.js',
  ],
  compte: [
    'frontend/src/i18n/applications.fr.js',
    'frontend/src/pages/jeux/SessionJeu.jsx',
    'shared/quiz/studio/direct.js',
  ],
  sansTelephone: [
    'frontend/src/pages/Appel.jsx',
    'backend/services/jeux/sessions.js',
    'shared/jeux/catalogue.js',
    'frontend/src/components/emploi-du-temps/TimetableExportMenu.jsx',
    'frontend/src/App.jsx',
    'frontend/src/components/layouts/navigation.jsx',
    'shared/quiz/studio/direct.js',
  ],
  sansReseau: [
    'mobile/src/cache.js',
    'mobile/src/app/(onglets)/semaine.jsx',
    'mobile/src/app/(onglets)/index.jsx',
    'mobile/src/auth/AuthContext.jsx',
  ],
  bientot: [
    'vitrine/src/i18n/fr/bientot.json',
    'docs/plan/suivi.md',
  ],
};

/** Date de la méthode écrite dans la langue de la page (le français pour une langue non publiée) */
export const dateEcrite = (langue) =>
  new Intl.DateTimeFormat(langue, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${DATE}T12:00:00Z`));
