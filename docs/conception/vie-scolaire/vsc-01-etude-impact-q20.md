# VSC-01 · Étude d'impact de Q-20 — le compte de l'élève

| | |
|---|---|
| Module | [VSC](../../plan/modules/VSC-vie-scolaire.md) · lot VSC-01 |
| Branche | `doc/vsc-01-modele-donnees-scolaire` |
| Rédigé par | Qoder (agent), le 2026-11-25 |
| **Validé** | en attente (même signature que [la conception](vsc-01-modele-donnees-scolaire.md)) |
| Source mesurée | `origin/main` 561fad19, 25 novembre 2026 |

## 1. La décision, et ce qu'elle impose

Q-20, tranchée dans [decisions.md](../../plan/decisions.md) (ligne 159) :

> un **identifiant donné par l'école**, adresse facultative, mot de passe initial remis par l'école (ou par le parent) ; pas d'adresse factice. Étude d'impact sur chaque fichier qui lit `Users.email` (connexion, réinitialisation, notifications, import)

Quatre conséquences, et rien de plus :

1. `Users.identifiant` devient **obligatoire et unique** ; c'est lui qui sert à se connecter.
2. `Users.email` devient **facultatif** ; l'index d'unicité reste (MySQL accepte plusieurs valeurs nulles).
3. Aucune adresse n'est inventée : ni `prenom.nom@ecole.ma`, ni adresse jetable, ni chaîne vide déguisée.
4. Chaque lecture de `Users.email` tombe dans une des trois classes ci-dessous ; aucune n'est laissée à l'interprétation.

## 2. Comment l'inventaire a été fait

Recherche de `.email` dans `backend`, `frontend/src` et `mobile/src`, hors `node_modules` et `dist` :

- **182 lectures** dans **65 fichiers** ;
- **44 fichiers de production**, **21 fichiers de test**.

Le motif attrape `.email` sur n'importe quel objet : la colonne « sert » dit, après lecture, s'il s'agit du compte (`Users`), d'un formulaire, ou d'une adresse professionnelle d'enseignant (qui reste inchangée). C'est un état daté : il se relit après chaque lot qui touche à `Users`.

## 3. Les trois classes

| Classe | Signification | Fichiers | Lectures |
|---|---|---|---|
| **A. Lire l'identifiant** | l'adresse ne peut pas y être facultative : connexion, jeton, journal, limitation de débit, invitation | 14 | 40 |
| **B. Tolérer l'absence** | l'affichage, l'export, la notification : l'identifiant prend la place, l'adresse s'ajoute si elle existe | 18 | 43 |
| **C. Inchangé** | adresse professionnelle du personnel, amorce de démonstration | 12 | 38 |
| **D. Tests à adapter** | fixtures et assertions qui passent par l'adresse | 21 | 61 |
| **Total** | | **65** | **182** |

## 4. Fichiers de production

### 4.1 Classe A — doivent lire l'identifiant

| Fichier | Lectures | Ce que la lecture sert aujourd'hui | Effet de Q-20 |
|---|---|---|---|
| `backend/services/oidc/provider.js` | 3 | jeton OIDC : `email`, et `preferred_username: user.email.split("@")[0]` | **plante si l'adresse est nulle** ; l'identifiant devient `preferred_username` |
| `backend/controllers/authController.js` | 2 | identité de session (`role, email, nom, prenom`), envoi du lien de réinitialisation | l'identité expose `identifiant` ; le lien ne part que si l'adresse existe |
| `backend/middleware/rateLimiterMiddleware.js` | 1 | clé de limitation : `compte:${req.body.email}` | clé sur `identifiant` ; sinon la clé devient nulle et la limitation est perdue |
| `backend/utils/passwordHelper.js` | 1 | refus d'un mot de passe contenant `email.split("@")[0]` | refus sur l'identifiant et le nom |
| `backend/services/mfa.js` | 1 | compte du QR d'authentification : `user.email` | l'identifiant, sinon deux enfants partagent le même compte TOTP |
| `backend/services/journalSecurite.js` | 1 | journalise `user?.email ?? email` | journalise l'identifiant, l'adresse seulement si présente |
| `backend/services/comptes.js` | 2 | invitation par courriel `to: user.email` | invitation ignorée proprement quand l'adresse manque ; mot de passe initial remis par l'école |
| `backend/services/desactivation/programmation.js` | 1 | préavis de désactivation par courriel | même garde |
| `backend/controllers/userController.js` | 9 | création et modification d'un compte : `findOne where email`, `email: userData.email` | identifiant obligatoire, adresse facultative ; unicité sur l'identifiant |
| `frontend/src/pages/Connexion.jsx` | 1 | champ unique, libellé « email », `autoComplete="username"` | libellé « identifiant ou adresse » |
| `mobile/src/app/connexion.jsx` | 2 | même champ dans l'application | même libellé |
| `frontend/src/pages/ForgotPassword.jsx` | 1 | réinitialisation demandée par adresse | par identifiant ou adresse ; si le compte n'a pas d'adresse, message « demandez à l'école » |
| `backend/controllers/etudiantController.js` | 9 | `if (!etudiantData.email \|\| …)` refuse la création | **blocage direct de Q-20** : exige l'identifiant, accepte l'absence d'adresse |
| `frontend/src/pages/Parametres.jsx` | 6 | profil : `yup.string().email().required()` | adresse facultative, format vérifié seulement si saisie |

### 4.2 Classe B — doivent tolérer l'absence

| Fichier | Lectures | Ce que la lecture sert aujourd'hui | Effet de Q-20 |
|---|---|---|---|
| `backend/utils/notificationHelper.js` | 6 | courriel à l'enseignant, à l'utilisateur, à l'administrateur, déjà gardé par `if (x.email)` | aucune casse ; à couvrir par un test C5-2 |
| `backend/services/calendrier/envoiEdt.js` | 2 | envoi de l'emploi du temps, `if (!e.email) continue` | aucune casse |
| `backend/services/annonces/annonces.js` | 2 | envoi d'une annonce, `if (!d.email) continue` | aucune casse |
| `backend/services/planning/reportDecision.js` | 2 | décision de report à l'administrateur | aucune casse |
| `backend/services/presences/changementTelephone.js` | 1 | notification : `email: d.etudiant?.email ?? null` | l'identifiant en plus |
| `backend/services/studio/sessions.js` | 2 | export d'une session de jeu : `c.etudiant?.email` | colonne identifiant, adresse si présente |
| `frontend/src/utils/exportColumns.js` | 3 | colonnes exportées (`r.user?.email`) | colonne « identifiant » + colonne « adresse » |
| `frontend/src/utils/exportExcel.js` | 3 | mêmes colonnes, second export | idem |
| `frontend/src/utils/fileImport.js` | 6 | valide l'adresse **si elle est saisie** | déjà conforme ; accepter une colonne identifiant en plus |
| `frontend/src/components/etudiants/useEtudiants.js` | 4 | import : normalise l'adresse, appariement des erreurs par adresse | appariement par identifiant, sinon par numéro de ligne |
| `frontend/src/components/etudiants/FormulaireEtudiant.jsx` | 1 | affiche `{user.email}` | `user.identifiant` quand l'adresse manque |
| `frontend/src/components/etudiants/ListeEtudiants.jsx` | 1 | colonne « email » du tableau | colonne « identifiant » |
| `frontend/src/components/layouts/PiedDuMenu.jsx` | 1 | `{user?.email}` dans le menu | identifiant, adresse en second |
| `mobile/src/app/(onglets)/compte.jsx` | 1 | `{utilisateur?.email}` | identifiant, adresse si présente |
| `frontend/src/components/presences/DemandesTelephone.jsx` | 1 | `{d.etudiant?.email}` | identifiant |
| `frontend/src/pages/gestion/JournalSecurite.jsx` | 4 | colonne « email » du journal | colonne « identifiant », adresse si présente |
| `frontend/src/pages/Annonces.jsx` | 1 | libellé du champ de formulaire | libellé « adresse (facultative) » |
| `frontend/src/components/comptes/useComptes.js` | 2 | liste et recherche des comptes | recherche aussi sur l'identifiant |

### 4.3 Classe C — inchangés

| Fichier | Lectures | Pourquoi inchangé |
|---|---|---|
| `backend/controllers/enseignantController.js` | 8 | le personnel garde une adresse professionnelle obligatoire |
| `frontend/src/components/enseignants/useEnseignants.js` | 3 | liste, recherche, appariement des erreurs d'import du personnel |
| `frontend/src/components/enseignants/ListeEnseignants.jsx` | 1 | affichage du personnel |
| `frontend/src/components/enseignants/FormulairesEnseignant.jsx` | 1 | affichage du personnel |
| `frontend/src/components/comptes/FormulaireCompteDialog.jsx` | 3 | formulaire des comptes du personnel et de la direction |
| `frontend/src/components/comptes/FormulairesComptes.jsx` | 1 | idem |
| `backend/seed.js` | 7 | amorce de démonstration, adresses fictives assumées |
| `backend/services/planning/suivi.js` | 1 | export des heures des vacataires |
| `backend/services/quiz/devoirs.js` | 4 | passerelle ClassQuiz, signée avec l'adresse de l'enseignant |
| `backend/services/quiz/lancement.js` | 2 | idem |
| `backend/services/quiz/mesQuiz.js` | 2 | idem |
| `backend/services/studio/importClassQuiz.js` | 5 | idem ; l'appariement se fait sur l'adresse de l'enseignant |

Ces fichiers restent lisibles tels quels, mais deux d'entre eux portent un piège à noter ici : `devoirs.js` et `importClassQuiz.js` dérivent un nom d'utilisateur de `email.split("@")[0]`. Tant qu'ils ne servent qu'au personnel, rien ne casse ; le jour où un élève y entre, il faudra passer à l'identifiant.

## 5. Fichiers de test à adapter (21)

| Fichier | Lectures | Ce qu'il faudra changer |
|---|---|---|
| `backend/tests/integration/auth.test.js` | 10 | connexion par identifiant, connexion par adresse conservée, échec explicite sans identifiant |
| `backend/tests/integration/sso.test.js` | 7 | jeton OIDC : `preferred_username` = identifiant, `email` absente |
| `backend/tests/integration/importClassQuiz.test.js` | 6 | fixtures enseignant inchangées |
| `backend/tests/integration/quiz.test.js` | 4 | fixtures élève : identifiant sans adresse |
| `backend/tests/integration/journalSecurite.test.js` | 4 | le journal porte l'identifiant |
| `backend/tests/integration/mesQuiz.test.js` | 4 | fixtures enseignant |
| `backend/tests/integration/passerelle.test.js` | 3 | signature ClassQuiz par adresse d'enseignant |
| `backend/tests/integration/mfa.test.js` | 3 | compte TOTP = identifiant |
| `backend/tests/integration/users.test.js` | 2 | création sans adresse acceptée |
| `backend/tests/integration/reservations.test.js` | 2 | participants créés sans adresse |
| `backend/tests/integration/desactivation.test.js` | 2 | préavis sans adresse |
| `backend/tests/integration/devoirs.test.js` | 2 | fixtures enseignant |
| `backend/tests/integration/contexteEtablissement.test.js` | 2 | contexte d'école inchangé |
| `backend/tests/integration/helpers/testApp.js` | 2 | fabrique de comptes : identifiant obligatoire |
| `backend/tests/integration/changementTelephone.test.js` | 2 | fixtures élève |
| `backend/tests/integration/presences.test.js` | 1 | fixtures élève |
| `backend/tests/integration/studioQuiz.test.js` | 1 | fixtures |
| `backend/tests/integration/quizLancement.test.js` | 1 | fixtures |
| `backend/tests/integration/classQuizEteint.test.js` | 1 | fixtures |
| `backend/tests/integration/push.test.js` | 1 | fixtures |
| `backend/tests/integration/quizIa.test.js` | 1 | fixtures |

Aucun de ces tests ne doit être supprimé : ceux qui passent aujourd'hui par l'adresse passent demain par l'identifiant, et **au moins un** garde la connexion par adresse pour prouver qu'elle marche encore.

## 6. La migration, en trois temps

| Temps | Migration | Contenu | Ce qui doit rester vrai |
|---|---|---|---|
| 1. Étendre | 0064 | `Users.identifiant` `VARCHAR(64)` **nullable** + index unique ; reprise : les comptes existants reçoivent leur adresse comme identifiant (valeur réelle, pas inventée) | aucune ligne perdue, connexion par adresse toujours possible |
| 2. Basculer | (même lot) | `identifiant` devient obligatoire ; la connexion accepte identifiant **ou** adresse ; `email` devient nullable ; les lectures de § 4.1 passent à l'identifiant | 537 tests backend verts, parcours de démonstration vert |
| 3. Contracter | (jamais dans ce lot) | retrait des lectures d'adresse devenues inutiles, retrait de `Etudiant.id_user` | seulement quand aucun écran ne lit l'ancien champ |

Points techniques vérifiés dans le code :

- MySQL accepte plusieurs `NULL` dans un index `UNIQUE` : `Users.email` peut rester unique et facultatif sans doublon possible ;
- `Users` retire déjà `password_hash` et le secret MFA de toute sérialisation (`defaultScope` et `toJSON`) : ajouter `identifiant` ne change pas cette garde, mais il faut décider s'il doit sortir en JSON — **oui pour l'élève et le parent, oui pour la direction, non dans les journaux publics** ;
- les notifications gardent leur garde `if (!x.email)` : rien à ajouter, un test suffit.

## 7. Règles à vérifier

| Règle | Test |
|---|---|
| un élève se crée sans adresse, avec un identifiant | création puis connexion par identifiant seul |
| un compte sans adresse ne reçoit aucun courriel et ne casse rien | annonce, emploi du temps, préavis, réinitialisation |
| deux comptes ne peuvent pas partager un identifiant | doublon refusé |
| aucune adresse factice n'est créée | base de démonstration : aucune adresse dérivée du nom |
| la connexion par adresse marche encore | test existant conservé |
| le QR de double authentification porte l'identifiant | `mfa.test.js` |

## 8. Ce qui reste à décider

| Question | Qui répond | Quand |
|---|---|---|
| L'identifiant est-il unique par école ou sur toute la plateforme ? (une base par école, D-01 ; un compte plateforme, D-05) | chef de projet, avec PLA-01 | avant 0064 |
| Qui fabrique l'identifiant : l'école, ou le produit à partir du nom et de l'année ? | scolarité | avant 0064 |
| Le parent sans adresse reçoit-il ses accès par courrier remis à l'école, ou par SMS ? | chef de projet | avant VSC-02 |
| L'adresse d'un élève mineur est-elle celle du responsable par défaut, ou jamais reprise ? | juriste, CNDP | avant toute donnée réelle |
