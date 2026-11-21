# VSC-01 · Q-20 · Impact d’une adresse absente sur le compte

Inventaire sur `main` à `e82f0bf4`. La recherche repère `email`, les alias, les projections Sequelize et les
lectures côté client. Les routes, appels indirects et exemples de parcours sont à relire avec les responsables
des lots lors de la revue. Les actions décrites dans ce document sont des exigences pour les futures PR.

## Serveur

| Fichier sous `backend/` | Lecture ou écriture actuelle | Contrôle du futur lot |
|---|---|---|
| `models/Users.js` | Adresse obligatoire et unique | Autoriser une adresse nulle pour le mode scolaire, vérifier les collisions de connexion et préserver les comptes historiques. |
| `controllers/authController.js` | Recherche du compte par adresse, identité de session, demande et envoi de réinitialisation | Résoudre l’école avant la recherche de l’identifiant scolaire. Préserver la connexion par adresse et la réponse générique. Pour une adresse absente, prévoir la récupération administrée et vérifier les consommateurs du jeton. |
| `middleware/rateLimiterMiddleware.js` | Clé de limitation par adresse normalisée | Couvrir les deux modes dans l’école courante et préserver les limites existantes. |
| `middleware/validationMiddleware.js` | Adresse exigée à la création et contrôlée à la modification | Appliquer les règles par mode de compte, avec une adresse facultative validée lorsqu’elle est fournie. |
| `controllers/etudiantController.js` | Import obligatoire, recherche de doublon, rattachement ou création | Dédupliquer dans l’école avec la clé retenue et tester un import répété sans adresse. |
| `controllers/userController.js` | Création, édition, import, contrôle d’unicité et invitation | Adapter les validations de création et les contrôles sur une adresse nouvelle. Vérifier la procédure d’activation scolaire. |
| `controllers/enseignantController.js` | Adresse obligatoire pour l’import enseignant et la déduplication | Préserver le contrat de l’import enseignant. Tester un conflit avec un compte existant. |
| `controllers/filiereController.js` | Adresse du responsable de filière incluse dans la réponse | Maintenir le contrat d’administration existant et tester les listes. |
| `routes/appartenirRoutes.js` | Projection d’adresse pour le membre du groupe | Afficher et exporter le membre même si son adresse manque. |
| `services/comptes.js` | Envoi d’invitation à l’adresse du compte | Prévoir une remise par l’école dans le mode scolaire. Couvrir les échecs et les invitations déjà émises. |
| `services/desactivation/anonymisation.js` | Remplace l’adresse par une valeur technique d’anonymisation | Faire relire le chemin d’anonymisation avec les lots ADM et juridiques. Vérifier la compatibilité des anciens comptes anonymisés. |
| `services/desactivation/programmation.js` | Adresse de préavis | Traiter explicitement l’absence de canal et poursuivre la désactivation prévue. |
| `services/journalSecurite.js`, `models/JournalSecurite.js` | Copie de l’adresse, projection pour l’acteur du journal | Préserver la recherche et l’identification autorisées, limiter les données et tester le rendu d’une adresse manquante. |
| `services/mfa.js` | Libellé du compte TOTP fondé sur l’adresse | Vérifier le comportement sans adresse avec ADM, sur un compte autorisé à utiliser ce mode. |
| `utils/jetons.js`, `utils/passwordHelper.js` | Contrat du jeton et filtre de mot de passe d’après les attributs du compte | Vérifier les consommateurs du jeton. Couvrir la règle de mot de passe sans adresse et faire relire le traitement de l’identifiant scolaire. |
| `utils/validationHelper.js`, `utils/sendEmail.js` | Validation d’adresse et transport générique | L’appelant vérifie le canal disponible. Tester que les comptes sans adresse ne provoquent ni erreur du lot ni envoi. |
| `services/annonces/annonces.js` | Déjà protégé par un test d’absence avant le courriel | Tester qu’un destinataire sans adresse garde ses autres canaux autorisés. |
| `services/calendrier/envoiEdt.js` | Déjà protégé sur les destinataires étudiants | Tester le bon destinataire dans deux écoles et l’absence d’envoi quand le canal manque. |
| `utils/notificationHelper.js` | Présence de l’adresse vérifiée avant les envois par rôle | Vérifier les trois cas de rôle et les autres canaux concernés. |
| `services/planning/enseignants.js`, `services/planning/suivi.js` | Projection d’adresse de personnel, dont export des vacataires | Préserver les réponses et l’export du personnel. |
| `services/planning/reportDecision.js` | Adresse des administrateurs, déjà vérifiée avant envoi | Couvrir le maintien de la notification d’administration. |
| `services/planning/reservations.js` | Adresse projetée pour le demandeur | Tester les écrans qui affichent le demandeur sans adresse. |
| `services/presences/changementTelephone.js` | Projection de l’étudiant avec repli explicite vers `null` | Tester la demande et son rendu sans adresse. |
| `services/oidc/provider.js`, `routes/oidcRoutes.js` | Projection OIDC et dérivation du nom à partir de l’adresse | Gérer la capacité du client OIDC avant activation scolaire, notamment la construction du nom et du sujet par école. |
| `services/quiz/devoirs.js` | Dérivation du nom depuis l’adresse et requêtes ClassQuiz | Vérifier que le parcours actif accepte l’identité du compte. Garder le contrat ClassQuiz sur son périmètre existant. |
| `services/quiz/lancement.js`, `services/quiz/mesQuiz.js`, `services/quiz/parties.js` | Adresse dans les requêtes signées, les métadonnées et la recherche d’enseignant | Préserver l’intégration existante et tester que l’activation scolaire reste dans le périmètre de ses modules autorisés. |
| `services/studio/importClassQuiz.js` | Recherche et transfert des quiz d’un enseignant par adresse | Préserver la migration historique. Tester la sélection des enseignants. |
| `services/studio/sessions.js` | Détail et export CSV d’une tentative d’élève | Garder l’identification de la tentative avec une colonne adresse vide et protéger l’export. |

`services/planning/monEmploiDuTemps.js` précise que le courriel de l’enseignant est exclu de la réponse. Le
contact d’établissement dans `services/etablissement/identite.js`, l’état de supervision et les routes de
supervision relèvent de l’école ou de l’état du service. Leur vocabulaire inclut le courriel.

## Site, mobile, exploitation

| Fichier | Contrôle du futur lot |
|---|---|
| `frontend/src/pages/Connexion.jsx`, `frontend/src/contexts/AuthContext.jsx`, `frontend/src/services/api.js` | Saisie, envoi et lecture de l’identité scolaire. Préserver le parcours par adresse. |
| `frontend/src/pages/ForgotPassword.jsx`, `frontend/src/pages/Parametres.jsx` | Expliquer la récupération par l’école quand elle s’applique. Vérifier l’affichage des informations de compte. |
| `frontend/src/components/comptes/{FormulaireCompteDialog.jsx,FormulairesComptes.jsx,ListeComptes.jsx,useComptes.js}` | Création, recherche, édition et import/export pour les deux modes. |
| `frontend/src/components/etudiants/{FormulaireEtudiant.jsx,ListeEtudiants.jsx,fiche.js,useEtudiants.js}` | Rendu du dossier et import/export avec adresse absente et identifiant scolaire. |
| `frontend/src/components/enseignants/{FormulairesEnseignant.jsx,ListeEnseignants.jsx,fiche.js,useEnseignants.js}` | Conserver les exigences des fiches enseignants. |
| `frontend/src/components/layouts/PiedDuMenu.jsx`, `frontend/src/components/presences/DemandesTelephone.jsx` | Vérifier le rendu du menu de compte et des demandes sans adresse. |
| `frontend/src/pages/Annonces.jsx`, `frontend/src/pages/gestion/JournalSecurite.jsx` | Compter les envois réellement destinés à une adresse et afficher un acteur sans adresse. |
| `frontend/src/pages/gestion/IdentiteEcole.jsx` | L’adresse de contact de l’école suit son propre contrat. |
| `frontend/src/utils/{exportColumns.js,exportExcel.js,fileImport.js}` | S’assurer que les cellules vides sont supportées au bon profil et que la réimportation utilise la clé retenue. |
| `mobile/src/app/connexion.jsx`, `mobile/src/auth/AuthContext.jsx`, `mobile/src/app/(onglets)/compte.jsx` | Adapter la connexion et le compte. Vérifier les sessions existantes et le rendu sans adresse. |
| `deploy/vps/mots-de-passe-demo.mjs`, `deploy/vps/noms-marocains.mjs` | Garder le comportement du jeu de démonstration historique et de ses outils d’exploitation. |

Les migrations déjà appliquées sont des références historiques. La migration future vérifie d’abord les appels
compatibles et les index sur une base neuve et une base existante. Les jeux de tests doivent ajouter un compte
scolaire synthétique, conserver les cas historiques par adresse et exercer web, mobile, import, export, MFA et OIDC
selon le périmètre autorisé. Les consommateurs indirects sont à vérifier par les parcours avant activation.

## Contrats indirects à relire

| Contrat | Observation sur la base de départ | Preuve attendue dans le lot |
|---|---|---|
| Session Planner et connexion StudyLib | `authController.js` place l’adresse dans l’identité. Le jeton signé par `utils/jetons.js` sert aussi à StudyLib, dont la consommation effective est hors de ce dépôt. | Vérifier connexion, renouvellement et lecture de session sur le site et le mobile. Faire confirmer par le responsable de StudyLib le traitement de la revendication pour les écoles où la bibliothèque est active. |
| ClassQuiz | Le fournisseur OIDC construit le nom de connexion à partir de l’adresse et limite l’accès par rôle. Les appels directs de quiz ont leurs propres usages de l’adresse. | Distinguer la recette OIDC de la recette des parcours élève ClassQuiz. Vérifier le contrat de chaque intégration activée et les parcours historiques des comptes par adresse. |
| Anonymisation | `services/desactivation/anonymisation.js` efface l’identité dans `Users` et remplace le numéro dans `Etudiant`. Les noms déplacés dans le dossier et l’identifiant scolaire étendent le périmètre à examiner. | Faire relire par ADM et VSC le traitement de l’identité dans les deux modèles et vérifier la conservation des liens historiques selon la décision du lot. |

## Critères transversaux

- L’identifiant de connexion scolaire est interprété dans l’école courante. La règle de normalisation et
  l’unicité font partie du contrat à valider pour la migration.
- Le secret initial est remis selon le flux de l’école. Le renouvellement et la récupération administrée
  doivent être tracés sans conserver le secret en clair.
- Une adresse manquante se représente par une valeur absente dans les contrats lorsqu’ils la publient.
  L’absence de canal ne change ni les droits ni l’inscription.
- La vérification sur deux écoles couvre la connexion, les consultations de dossier et la notification.
