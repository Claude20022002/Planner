// Textes, états et preuves du bloc d'équipement, dans l'ordre S1, S2, S3 (plan VIT-20d).

/** Trois contextes par module disponible, avec la clé de traduction et les sources dans le dépôt. */
export const EQUIPEMENT = {
  emploiDuTemps: [
    {
      contexte: 's1', texte: 'modules.emploiDuTemps.s1', etat: 'en partie',
      sources: [
        'mobile/src/cache.js',
        'mobile/src/app/(onglets)/semaine.jsx',
        'vitrine/src/i18n/fr/bientot.json',
      ],
    },
    {
      contexte: 's2', texte: 'modules.emploiDuTemps.s2', etat: 'marche',
      sources: [
        'frontend/src/utils/exportEmploiDuTemps.js',
        'frontend/src/components/generation/useImpressionClasses.js',
      ],
    },
    {
      contexte: 's3', texte: 'modules.emploiDuTemps.s3', etat: 'en partie',
      sources: [
        'frontend/src/utils/exportEmploiDuTemps.js',
        'backend/services/push.js',
        'backend/services/calendrier/envoiEdt.js',
      ],
    },
  ],
  presences: [
    {
      contexte: 's1', texte: 'modules.presences.s1', etat: 'non',
      sources: [
        'frontend/src/pages/Appel.jsx',
        'backend/services/presences/statuts.js',
      ],
    },
    {
      contexte: 's2', texte: 'modules.presences.s2', etat: 'marche',
      sources: [
        'frontend/src/pages/Appel.jsx',
        'frontend/src/pages/AppelProjection.jsx',
      ],
    },
    {
      contexte: 's3', texte: 'modules.presences.s3', etat: 'marche',
      sources: [
        'backend/services/presences/statuts.js',
        'backend/routes/presenceRoutes.js',
        'frontend/src/pages/Presence.jsx',
      ],
    },
  ],
  espaceDeCours: [
    {
      contexte: 's1', texte: 'modules.espaceDeCours.s1', etat: 'non',
      sources: [
        'backend/services/cours/supports.js',
        'frontend/src/components/espaceCours/SondagesOuverts.jsx',
        'backend/services/cours/studylib.js',
        'docs/plan/modules/BIB-bibliotheque.md',
      ],
    },
    {
      contexte: 's2', texte: 'modules.espaceDeCours.s2', etat: 'marche',
      sources: [
        'frontend/src/pages/EspaceClasse.jsx',
        'frontend/src/components/espaceCours/LigneSupport.jsx',
        'frontend/src/components/espaceCours/SondagesOuverts.jsx',
      ],
    },
    {
      contexte: 's3', texte: 'modules.espaceDeCours.s3', etat: 'marche',
      sources: [
        'frontend/src/pages/EspaceClasse.jsx',
        'backend/routes/espaceCoursRoutes.js',
        'backend/services/cours/sondages.js',
      ],
    },
  ],
  quizEtJeux: [
    {
      contexte: 's1', texte: 'modules.quizEtJeux.s1', etat: 'en partie',
      sources: [
        'backend/services/studio/tentatives.js',
        'backend/services/studio/directJoueur.js',
        'backend/services/jeux/sessions.js',
      ],
    },
    {
      contexte: 's2', texte: 'modules.quizEtJeux.s2', etat: 'marche',
      sources: [
        'backend/services/studio/sessions.js',
        'frontend/src/pages/studio/DirectProjection.jsx',
      ],
    },
    {
      contexte: 's3', texte: 'modules.quizEtJeux.s3', etat: 'en partie',
      sources: [
        'backend/services/studio/directJoueur.js',
        'backend/services/jeux/sessions.js',
        'shared/jeux/catalogue.js',
      ],
    },
  ],
  annoncesEtMessages: [
    {
      contexte: 's1', texte: 'modules.annoncesEtMessages.s1', etat: 'en partie',
      sources: [
        'frontend/src/pages/Annonces.jsx',
        'mobile/src/cache.js',
        'vitrine/src/i18n/fr/bientot.json',
      ],
    },
    {
      contexte: 's2', texte: 'modules.annoncesEtMessages.s2', etat: 'non',
      sources: [
        'frontend/src/pages/Annonces.jsx',
      ],
    },
    {
      contexte: 's3', texte: 'modules.annoncesEtMessages.s3', etat: 'non',
      sources: [
        'backend/services/annonces/annonces.js',
        'backend/services/push.js',
      ],
    },
  ],
};
