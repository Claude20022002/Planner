# Expertise du site vitrine : ses promesses et ses objectifs

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session ouverte par le chef le 18 novembre 2026 au soir, [fiche de mission](../plan/missions/expertise-site-vitrine.md) |
| Regard | directeur de création, expert produit et conversion, expert en accessibilité |
| Objet | le site `vitrine/` **tel qu'il est sur `origin/main` au commit `9b3fcb25`** (18 nov., après la fusion de #216 et #219) : 16 pages en français, les mêmes en anglais et en arabe, 49 pages construites |
| Références | `AGENTS.md`, plan du site [vit-vitrine.md](../conception/vitrine/vit-vitrine.md), [feuille de route](../plan/feuille-de-route.md), [arguments marketing](02-arguments-marketing.md). EP-13, EP-18, EP-5 généralisée, les décisions des 17 et 18 nov., le relevé `11-chemins-site-openeducat.md` et les fiches VIT-09 à VIT-16 sont lus sur `doc/coordination-equipe` (PR #211), **pas encore fusionnée** |
| Aucun code modifié | le site est construit et mesuré en local ; les captures restent hors du dépôt |

## 0. Le verdict

Le site est **honnête, propre et accessible**. Presque toutes ses phrases ont une source dans le code, ce qui est rare pour un site de logiciel. axe-core ne relève aucune violation et Lighthouse donne 100 en accessibilité sur chaque page.

Mais **il ne vend pas encore**, pour trois raisons :

- **il ne mène nulle part** : les 51 boutons « Nous contacter » des pages françaises arrivent sur une section qui dit « Le formulaire de contact arrive bientôt ». Il n'y a ni adresse, ni téléphone, ni formulaire ;
- **il ne prouve rien** : aucune capture du produit, quatre dessins pour seize pages, et onze pages sans aucune image ;
- **il ne dit pas pourquoi choisir Planner** : il décrit des fonctions, sans comparatif, sans « avant → avec », et sans parler des écoles peu équipées, alors que c'est le premier point où Planner dit plus qu'OpenEduCat.

| Axe | Note | En une phrase |
|---|---|---|
| Objectifs | **4/10** | On comprend en 30 s ce que fait Planner. En 3 min, on ne peut rien faire : aucun contact possible |
| Promesses | **7/10** | Presque tout est vrai et sourcé ; six phrases exagèrent ou restent floues, et des points forts réels ne sont pas dits |
| Règles du chef | **7/10** | Aucun prix, aucun nom d'école, rien chargé d'ailleurs, 09-08 absente. EP-18 n'est pas racontée ; le Maroc, le BTS et le LMD sont nommés |
| Design | **5/10** | Charte v2 et logos officiels bien posés, belle typographie. Peu de preuves visuelles, des pages minces et des grilles à trous |
| Qualité mesurée | **8/10** | Accessibilité, bonnes pratiques et SEO à 100. Un saut de mise en page de 330 px sur téléphone fait tomber la performance à 79 sur sept pages |
| Positionnement | **3/10** | Un directeur ne trouve ni la raison de choisir Planner, ni une preuve, ni un moyen d'écrire |

Les dix corrections les plus utiles sont au § 9. Les quatre premières suffisent à rendre le site présentable à un directeur.

## 1. Méthode

```powershell
git worktree add "..\travaux-planner\expertise-site" -b etude/expertise-site-vitrine origin/main
cd ..\travaux-planner\expertise-site\vitrine
npm ci ; $env:ASTRO_TELEMETRY_DISABLED = "1"
npm run build        # 49 pages, sans erreur
npm run test:unit    # 76 tests, 76 verts
npx astro preview --port 4331 --host 127.0.0.1
```

Outils installés dans un dossier temporaire, hors du dépôt : Lighthouse 12.8.2, axe-core 4.10.3 (la version déjà acceptée pour le frontend), Playwright 1.56.1 avec le Chrome du poste.

| Mesure | Comment | Volume |
|---|---|---|
| axe-core | règles `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`, après un défilement complet (pour que toutes les apparitions aient joué) | 16 pages × 3 langues × 3 largeurs = **144 passages** |
| Captures pleine page | 390 × 844, 768 × 900, 1440 × 900 | 144 captures, relues tranche par tranche |
| Débordement horizontal | `scrollWidth - innerWidth` | 144 mesures |
| Poids | octets de chaque réponse, page chargée puis défilée | 48 pages |
| Lighthouse | profil mobile par défaut (Moto G simulé : 150 ms de latence, 1,6 Mb/s, processeur ralenti 4 fois) sur les 16 pages françaises, l'accueil arabe et la racine ; profil ordinateur sur l'accueil | 19 rapports |
| Promesses | chaque texte de `vitrine/src/i18n/fr/*.json` lu, puis cherché dans `backend/`, `frontend/`, `mobile/` et `shared/` | 17 fichiers de texte |

Un piège évité, à noter pour les prochaines mesures : le port 4329 était déjà pris par une ancienne prévisualisation d'un autre dossier, et Astro a choisi un autre port sans erreur. La première série mesurait donc un ancien site. Elle a été jetée, puis refaite sur le bon port.

## 2. Les objectifs : 4/10

Le plan du site (§ 1) veut un site **au contenu d'OpenEduCat dans le style d'apple.com** : une idée par section, de grands titres, des visuels soignés du produit et des animations sobres. La feuille de route en fait l'étape 1, avec dix conditions de mise en ligne.

### Le test des 30 secondes, puis des 3 minutes

| Visiteur | Ce qu'il doit comprendre en 30 s | Ce qu'il comprend | Ce qu'il doit pouvoir faire en 3 min | Ce qu'il peut faire |
|---|---|---|---|---|
| **Directeur d'école** | ce que Planner fait, pour quel type d'école, et pourquoi c'est mieux que ce qu'il a | « l'emploi du temps calculé, puis la classe » : clair. Pour qui : flou. Le titre de l'ouverture est le seul mot « Planner » (`accueil.json`, `ouverture.titre`), et rien ne dit que le calcul vaut aujourd'hui pour le supérieur et pas encore pour le collège | demander une démonstration | **rien**. « Nous contacter » mène à `/fr/#contact`, qui renvoie à un formulaire « bientôt » (`accueil.json`, `contact.texte`) |
| **Scolarité** | le calcul, les refus expliqués, les reports, les exports | bien servi par la page Emploi du temps, la plus aboutie du site | voir le produit sur un vrai écran | quatre dessins, aucune capture ; la page « Scolarité » recopie le titre de la page Emploi du temps |
| **Enseignant** | l'appel, les quiz, les jeux, sans complication | oui, mais l'appel est raconté d'abord par le QR code et le téléphone de l'étudiant | savoir si ça marche dans sa salle (un seul écran, des élèves sans téléphone, peu de réseau) | la réponse n'est écrite nulle part en clair (§ 4, EP-18) |

### Ce que le site couvre du plan

| Exigence du plan ou de la feuille de route | État sur `main` | Preuve |
|---|---|---|
| Une idée par section, grands titres, sections claires et sombres en alternance | **tenue** | captures 1440 px ; jetons `--titre-geant` 48 à 96 px (`src/styles/jetons.css`, ligne 23) |
| Visuels du produit soignés, sur ordinateur et sur téléphone | **non tenue** : quatre dessins en code, aucune capture | `IllustrationSemaine`, `IllustrationAppel`, `IllustrationQuiz`, `IllustrationStatistiques` ; 11 pages sur 16 n'ont aucune illustration (§ 5) |
| Animations sobres, aucune au mouvement réduit | **tenue** | `src/components/socle/Gabarit.astro`, script en ligne : le contenu reste visible sans script |
| Toutes les applications présentées (condition 5) | **en partie** : les pages existent, mais l'accueil ne montre ni la Bibliothèque, ni Cours et annonces, ni l'application mobile, sauf dans la vidéo | `src/pages/[lang]/index.astro` |
| Vidéo de présentation (condition 6) | **tenue**, avec transcription et commandes accessibles | `src/components/accueil/Video.astro` |
| Contact | **une section vide** | `src/components/accueil/Contact.astro` |

## 3. Les promesses : 7/10

Chaque phrase française a été confrontée au code. **La règle « on ne promet que ce qui existe » est presque partout tenue.** C'est le principal atout du site.

### Ce qui est tenu, avec sa source

| Promesse (fichier · clé) | Source dans le code |
|---|---|
| Salles et capacité, vacataires et disponibilités, CM/TD/TP par groupe, trajets entre campus (`emploi-du-temps.json` · `calcul.points`) | `backend/services/generation/timefold/probleme.js` ; `models/TrajetCampus.js` ; raison `trajet_campus` dans `rapport.js`, ligne 24 |
| Les contraintes nommées quand elles empêchent le calcul (`refus.texte`) | `backend/services/moteur/contraintes/avantGeneration.js` (`ErreurPlace`) ; bilan par contrainte dans `bilan.js` |
| Versions réactivables (`suite.cartes.0`) | `backend/services/generation/SnapshotService.js`, `activateSnapshot` |
| Visible seulement une fois publié (`suite.cartes.1`) | `backend/services/calendrier/versionPubliee.js` |
| Export PDF, agenda abonné, envoi par courriel (`suite.cartes.3` à `5`) | `frontend/src/components/emploi-du-temps/TimetableExportMenu.jsx` (jsPDF) ; `models/AbonnementCalendrier.js` ; `services/calendrier/envoiEdt.js` |
| QR code renouvelé toutes les 30 s, appel à la main (`accueil.json` · `video.scenes.3`) | `backend/services/presences/appel.js`, lignes 10 à 16 |
| Dix types de questions, images, sons et vidéos, points selon la justesse et la rapidité, chronométrés par le serveur (`quiz-et-jeux.json` · `studio`) | `shared/quiz/studio/types.js`, lignes 32 et suivantes ; `services/studio/medias.js` ; `services/studio/directJoueur.js`, ligne 68 |
| Dix simulations, trois défis chacune (`bibliotheque-des-jeux.json`) | `shared/simulations/catalogue/`, dix fichiers |
| Sondages anonymes, 2 à 6 choix, activés par l'école (`cours-et-annonces.json`) | `backend/services/cours/sondages.js`, lignes 13 et 23 ; `ConfigurationEtablissement.sondages_actifs` |
| Annonce à une classe, un groupe ou une filière, e-mail facultatif | `models/Annonce.js` (`portee`, `envoyer_email` à `false` par défaut) |
| Cinq onglets du mobile (`application.json`) | `mobile/src/app/(onglets)/_layout.jsx`, lignes 67 à 84 |
| Occupation des salles, charge des enseignants, import CSV, couleurs de l'école (`etablissement.json`) | `controllers/statistiquesController.js` (`getOccupationSalles`, `getChargeEnseignants`) ; `frontend/src/components/common/ImportCsvDialog.jsx` ; `models/ConfigurationEtablissement.js` |
| Double authentification obligatoire pour l'administration, possible pour les enseignants, codes de secours ; journal de sécurité ; comptes anonymisés (`securite.json`) | `backend/services/mfa.js`, lignes 11 à 32 ; `services/journalSecurite.js` ; `services/desactivation/anonymisation.js` |
| Un seul compte pour Planner, la bibliothèque et les jeux | `backend/controllers/authController.js`, ligne 25 (connexion unique vers StudyLib) |
| Aucun cookie, aucune mesure d'audience, rien d'un autre site (`securite.json` · `site`) | vérifié sur `dist/` : la seule adresse externe est l'espace de noms SVG `http://www.w3.org/2000/svg` |

La page Bibliothèque décrit StudyLib, dont le code n'est pas dans ce dépôt. Elle n'a pas été vérifiée ici.

### Ce qui exagère ou reste flou

| # | Phrase (fichier · clé) | Ce que dit le code | Verdict |
|---|---|---|---|
| P1 | « L'emploi du temps de votre établissement, calculé selon vos règles » (`accueil.json` · `ouverture.accroche`) | la page Solutions dit elle-même que le calcul d'un collège ou d'un lycée « est en préparation » (`solutions.json` · `types.collegeLycee.texte`) | **exagérée** pour un collège : l'ouverture promet ce que la page Solutions retire |
| P2 | « Quand une séance ne trouve pas sa place, Planner dit quelle règle la bloque » (`accueil.json` · `emploi.refus`) | vrai pour les contraintes déclarées et les dates sautées. Mais quand la semaine type ne trouve pas de place, le message dit seulement « n'a pas trouvé de place sans conflit pour N modules » (`rapport.js`, lignes 59 à 61), et une raison inconnue devient « une règle de planification » (ligne 27) | **un peu exagérée** : « le plus souvent » serait exact |
| P3 | « Dix types de questions […] des quiz en direct ou en devoir » (`accueil.json` · `quiz.texte`, `video.scenes.4`) | quatre types ne se posent pas en direct : réponse rédigée, zone sur image, association, texte à trous (`services/studio/direct.js`, ligne 57) | **floue** : le lecteur comprend que les dix marchent en direct |
| P4 | « Des jeux pour réviser » (`accueil.json` · `quiz.titre`) ; « jeux pour réviser » (`en-classe.json` · `meta.description`) | les dix jeux portent tous sur l'informatique et la gestion : SQL, réseaux, ordonnanceur, complexité, ERP, stocks… (`shared/simulations/catalogue/`) | **floue** : un collège ou un lycée y lira « réviser ses cours ». Il faut dire les domaines |
| P5 | « Quand l'école active l'IA » (`accueil.json` · `donnees.points.2`, `securite.json`, `quiz-et-jeux.json`) | **aucun réglage de l'école** n'allume l'IA. Elle dépend de la variable `IA_CLE` du serveur (`backend/services/ia/client.js`, lignes 7 et 25), réglée par l'exploitant | **floue** : c'est la formule voulue par le chef, mais l'école ne peut pas l'activer elle-même (question 2, § 10) |
| P6 | « Des sessions qui changent, un planning qui suit » (`solutions.json` · `types.formation.titre`) | aucune notion de session de formation, ni d'entrée permanente, dans le code ; le calcul se fait par période | **floue** : le titre promet plus que le texte qui le suit |

Deux écarts plus petits :

- l'appel est dessiné sur un **téléphone**, alors que le texte dit que l'enseignant **projette** le code (`accueil.json` · `appel.illustration.label`, puis `appel.texte`) ;
- « Les étudiants le scannent avec leur téléphone » ne dit pas que le scan passe **seulement par l'application** (`appel.js`, ligne 18).

### Ce que le site ne dit pas, alors que le code le permet

- **L'anti-fraude de l'appel** : un compte lié à un téléphone, un téléphone par étudiant et par séance, une vérification surprise au choix de l'enseignant (`appel.js`, lignes 18 à 24). Pour un directeur, c'est un argument fort.
- **Le bilan de chaque contrainte après le calcul** : respectée, non respectée N fois avec des exemples, ou sans effet (`moteur/contraintes/bilan.js`). C'est la preuve de « chaque refus a sa raison ».
- **L'emploi du temps imprimé** : le PDF existe, et c'est le chemin sans écran ni téléphone d'EP-18.
- **Les annonces à tout l'établissement, à un campus ou à un niveau**, pas seulement à une classe (`Annonce.portee`).

## 4. Les règles du chef : 7/10

| Règle | État | Preuve |
|---|---|---|
| Aucun prix | **tenue** | aucun prix ni « tarif » dans `src/i18n/fr` et `en` |
| Aucun nom d'école | **tenue** | aucune occurrence d'un nom d'école dans les textes |
| Rien chargé d'ailleurs (EP-13) | **tenue** | `dist/` ; Inter servie par le site (`_astro/inter-*.woff2`) |
| La loi 09-08 jamais nommée | **tenue** | aucune occurrence de « 09-08 » ni de « CNDP » |
| L'IA écrite « quand l'école active l'IA » | **tenue sur trois pages, pas sur la quatrième** | `bibliotheque.json` · `documents.cartes.5` : « quand l'IA est disponible ». Voir aussi P5 |
| EP-5 généralisée : aucun pays supposé | **en partie** | « Au Maroc, Massar en est un exemple » (`solutions.json` · `types.collegeLycee.bientot.3`, `bientot.json` · `aussi.cartes.4`) : le seul pays nommé du site. « BTS » (`solutions.json` · `types.superieur.texte`) et « crédits du LMD » (`bientot.json` · `ecole.cartes.0`) sont des systèmes de quelques pays. En anglais, « BTS programmes » ne veut rien dire |
| EP-18 : ni téléphone, ni wifi, ni écran comme seul chemin | **tenue dans les faits, pas dans le récit** | voir ci-dessous |

**EP-18, en détail.** Le site ne fait jamais du téléphone le seul chemin : l'appel à la main est écrit partout, et le quiz s'ouvre « sur un ordinateur de l'école ». Mais :

- l'accueil et la page En classe **commencent** l'appel par « L'enseignant projette un QR code. Les étudiants le scannent avec leur téléphone », et le dessin montre un QR code. Le chemin à la main vient en second, introduit par « aussi » (`accueil.json` · `appel.texte` ; `en-classe.json` · `appel.texte`) ;
- les jeux : « En individuel, chacun joue sur son téléphone » (`quiz-et-jeux.json` · `jeux.cartes.1`) ;
- **peu ou pas de connexion** : rien n'est dit, et la vidéo de l'accueil charge **1,5 Mo** dès que la moitié de son cadre est visible sur un téléphone. Elle ne s'arrête que si le navigateur déclare l'économie de données ou le mouvement réduit (`src/components/accueil/video.js`, lignes 14 à 16). Un débit faible ne suffit pas à l'arrêter ;
- **un seul écran ou du papier** : le PDF imprimé n'est pas présenté comme une solution.

C'est pourtant l'argument que le relevé d'OpenEduCat (§ 5) désigne comme le premier différenciateur.

## 5. Le design : 5/10

### Ce qui est réussi

- **La charte v2 est exacte** : `--bleu-nuit` #17395C, `--bleu` #2A679F, `--bleu-profond` #21507C, `--bleu-clair` #A6CAEE (`jetons.css`, lignes 7 à 10). Les deux logos sont les SVG officiels (`public/logo/`, commit `8c5a8211`).
- **La typographie est bien réglée** : titres de 48 à 96 px, interligne de 1,05, texte de 17 px, accroches de 19 à 21 px. L'esprit « une idée, un grand titre » est là.
- **La page Emploi du temps** est la meilleure du site : elle a un rythme, un dessin, un avis de refus mis en scène et six cartes utiles.
- **L'en-tête marche sans JavaScript** : menus en `details`, menu du téléphone déplié par défaut (`EnTete.astro`, lignes 2 à 5). C'est aussi la cause du défaut mesuré au § 6.
- **Les trois largeurs** : aucun débordement horizontal sur les 144 captures.

### Ce qui manque ou déçoit

| Constat | Où | Preuve |
|---|---|---|
| **Pas une seule capture du produit.** Le style Apple repose sur l'objet montré. Ici, quatre dessins servent à tout, et le même téléphone de quiz revient trois fois | tout le site | `IllustrationQuiz` utilisée 3 fois, `IllustrationAppel` 2 fois, `IllustrationSemaine` 2 fois |
| **Onze pages sur seize sans aucune image** | Application, Bibliothèque, Bibliothèque des jeux, Bientôt, Cours et annonces, Direction, Enseignants, Étudiants, Scolarité, Sécurité, Solutions | `src/pages/[lang]/*.astro` |
| **L'ouverture de l'accueil** : un logo, le mot « Planner » en titre principal, une phrase, deux boutons. La promesse n'est pas dans le titre | accueil | `<h1>Planner</h1>` dans `dist/fr/index.html` |
| **La vidéo s'ouvre sur un cadre blanc** presque vide (un petit logo sur fond blanc) au moment où elle part : l'image fixe soignée (`planner-fr.webp`) disparaît pour la première image du film | accueil, 390 et 1440 px | captures `fr-accueil-*` |
| **Pages minces** : « Cinq onglets. » suivi d'**une seule** carte (Scanner) ; Cours et annonces : deux cartes ; Bibliothèque : six lignes de texte | Application, Cours et annonces, Bibliothèque | `application.json` · `onglets.cartes` (une entrée) |
| **Grilles à trous** : deux cartes dans une grille de trois colonnes, ou une seule carte centrée | Quiz et jeux, Application | capture `fr-quiz-et-jeux-1440` |
| **Pages par rôle** : un grand vide entre l'accroche et les deux boutons, qui sont dans une section à part ; trois cartes qui recopient les accroches d'autres pages, dont une phrase sur le site lui-même (« Cette page ne dit que ce que Planner fait déjà… ») présentée comme une fonction | Direction, Scolarité, Enseignants, Étudiants | `PageRole.astro`, lignes 28 à 33 ; `direction.json` · `cartes.2.texte` |
| **Titres trop longs** pour le style choisi : « L'emploi du temps, l'appel, les jeux et la bibliothèque, sur le téléphone. » occupe six lignes à 96 px | Application | capture `fr-application-1440` |
| **Longueur de l'accueil** : 10 076 px à 390 px, soit douze écrans, sans sommaire ni raccourci vers les rôles | accueil | mesure Playwright |

### Les illustrations qui manquent, page par page

| Page | Ce qui la servirait |
|---|---|
| Accueil | la grille des apps (VIT-09) ; une capture du calcul en cours et de son bilan |
| Emploi du temps | une capture du bilan des contraintes après le calcul |
| En classe | la liste d'appel à la main, avant le QR code |
| Quiz et jeux | le Studio en édition ; un jeu projeté au tableau |
| Bibliothèque, Cours et annonces | l'espace d'une classe avec ses sections ; une annonce |
| Application | les cinq onglets, un écran chacun |
| Établissement | le tableau d'occupation des salles ; une session d'examen |
| Sécurité | l'écran de double authentification ; le journal de sécurité |
| Solutions | une image par type d'établissement, sans photo d'école réelle |
| Pages par rôle | la journée type du rôle, en trois écrans |
| Bientôt | aucune, c'est la règle |

## 6. La qualité mesurée : 8/10

### Lighthouse (profil mobile, sauf mention)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | TBT | CLS | Transféré |
|---|---|---|---|---|---|---|---|---|
| Accueil | **79** | 100 | 100 | 100 | 1,5 s | 180 ms | **0,375** | 130 Ko |
| Accueil (ordinateur) | 100 | 100 | 100 | 100 | 0,4 s | 0 ms | 0,003 | 130 Ko |
| Emploi du temps | **80** | 100 | 100 | 100 | 1,4 s | 130 ms | **0,399** | 84 Ko |
| En classe | 100 | 100 | 100 | 100 | 1,4 s | 0 ms | 0 | 84 Ko |
| Quiz et jeux | 100 | 100 | 100 | 100 | 1,4 s | 30 ms | 0 | 83 Ko |
| Bibliothèque des jeux | 100 | 100 | 100 | 100 | 1,4 s | 40 ms | 0,031 | 82 Ko |
| Bibliothèque | **79** | 100 | 100 | 100 | 1,4 s | 180 ms | **0,375** | 82 Ko |
| Cours et annonces | 100 | 100 | 100 | 100 | 1,4 s | 0 ms | 0 | 81 Ko |
| Application | **79** | 100 | 100 | 100 | 1,4 s | 200 ms | **0,375** | 81 Ko |
| Établissement | 96 | 100 | 100 | 100 | 1,4 s | 220 ms | 0 | 83 Ko |
| Sécurité | 100 | 100 | 100 | 100 | 1,4 s | 10 ms | 0,026 | 82 Ko |
| Bientôt | **81** | 100 | 100 | 100 | 1,4 s | 90 ms | **0,375** | 83 Ko |
| Solutions | 87 | 100 | 100 | 100 | 1,5 s | 510 ms | 0 | 83 Ko |
| Direction | **82** | 100 | 100 | 100 | 1,4 s | 50 ms | **0,375** | 81 Ko |
| Scolarité | 100 | 100 | 100 | 100 | 1,4 s | 40 ms | 0,024 | 81 Ko |
| Enseignants | **79** | 100 | 100 | 100 | 1,5 s | 170 ms | **0,375** | 81 Ko |
| Étudiants | 100 | 100 | 100 | 100 | 1,4 s | 0 ms | 0,019 | 82 Ko |
| Accueil arabe | 99 | 100 | 100 | 63 | 1,6 s | 0 ms | 0,037 | 130 Ko |
| Racine `/` (redirection) | 81 | 100 | 96 | 100 | 1,7 s | 50 ms | 0,375 | 132 Ko |

Le SEO de 63 sur l'arabe est voulu : la page porte `noindex` tant que l'arabe n'est pas publié.

**L'objectif du plan** (§ 8 : performance, accessibilité et SEO au-dessus de 90 sur l'accueil) **n'est pas atteint en performance sur téléphone** (79). L'objectif d'EP-17 (affichage en moins de 2 s sur un téléphone d'entrée de gamme simulé) est tenu : LCP de 1,4 à 1,7 s.

**La cause du CLS est unique, et elle est démontrée.** Sur téléphone, la navigation s'affiche en entier sous la barre tant que le script de l'en-tête n'a pas tourné, puis se replie quand il ajoute la classe `repliable` (`EnTete.astro`, lignes 98 à 104, et règle de la ligne 141). Ce script est un module, exécuté après le premier rendu. Mesure à 390 px : le `<main>` commence à **383 px** sans JavaScript, puis à **53 px** avec, soit **330 px de saut** sur un écran de 844 px. Lighthouse le relève sur sept pages sur seize. Les autres y échappent selon l'ordre d'exécution : le défaut existe partout.

Les autres remarques de Lighthouse sont mineures : deux feuilles de style bloquent le rendu (environ 300 ms à gagner), et l'image fixe de la vidéo peut perdre 30 Ko.

### axe-core

**0 violation sur 144 passages** (16 pages × 3 langues × 3 largeurs), règles WCAG 2.0 à 2.2 A et AA et bonnes pratiques comprises. Lien d'évitement, titres uniques par page (un seul `h1` sur chacune), menus au clavier, Échap qui ferme les menus : rien à redire.

Une limite qu'axe ne voit pas : **les pages `/ar/` sont construites avec le texte français**, en `lang="ar"` et `dir="rtl"`. La ponctuation se place du mauvais côté (« .en classe », « .et demie ») et un lecteur d'écran lirait du français avec une voix arabe (WCAG 3.1.1). Les pages sont en `noindex` et aucun lien ne les propose, mais elles seront en ligne avec le reste du dossier `dist/`.

### Le poids, pour EP-18

| Page | Transféré (Lighthouse) | Décodé, page défilée (Playwright) |
|---|---|---|
| Une page de fonction | 81 à 84 Ko | 148 à 172 Ko |
| Accueil sans la vidéo | 130 Ko | 238 Ko |
| Accueil avec la vidéo, téléphone | — | **1 777 Ko** (MP4 720p : 1 539 Ko) |
| Accueil avec la vidéo, écran ≥ 1280 px | — | jusqu'à **3,5 Mo** de plus (WebM 1080p) |

Les pages sont très légères : moins d'une seconde sur une connexion de 1,6 Mb/s. La vidéo multiplie le poids de l'accueil par 14 sur téléphone, sans que la personne l'ait demandée.

### Le référencement, avant la mise en ligne

Pas de `robots.txt`, pas de plan du site, pas de balises Open Graph. Le `noindex` du sous-domaine est prévu par VIT-06. Mais **sans Open Graph, un lien vers le site partagé sur WhatsApp ou par courriel s'affiche sans image ni résumé**, alors que c'est ainsi que le site circulera d'abord.

## 7. Le positionnement face à OpenEduCat : 3/10

### Ce que Planner dit de plus

- **Le calcul sous contraintes, avec la raison du refus**, mis en scène sur l'accueil et sur sa page. OpenEduCat en fait une ligne parmi dix dans ses comparatifs.
- **L'honnêteté** : une page Bientôt sans date, une page Sécurité qui ne dit que ce qui existe, « Ce site ne vous suit pas ». Aucune page d'OpenEduCat ne le fait.
- **Le report de séance suivi de bout en bout**, raconté en quatre étapes.

### Ce que Planner dit de moins

| Chez OpenEduCat | Chez Planner sur `main` | Mission |
|---|---|---|
| Contact : délai de réponse, canaux par sujet, « ce qui se passe ensuite » | une section vide | VIT-16 |
| Une page par module, 73 au total | sept pages par app, dont trois minces | VIT-11, VIT-15 |
| Pages par rôle avec « avant → avec » et FAQ | quatre pages qui renvoient vers d'autres pages | VIT-10b |
| Comparatifs | rien | VIT-14 |
| Études de cas, témoignages | rien, et c'est juste : aucun client publiable | plus tard |
| FAQ | rien | VIT-11 |
| Démonstration | « arrive bientôt » | VIT-16 |

### Un directeur comprend-il pourquoi choisir Planner ?

**Non.** Il comprend ce que Planner fait, mais pas en quoi c'est mieux que son tableur, son ERP ou son logiciel de vie scolaire. Il ne voit aucune preuve, et ne peut pas écrire. Il ne sait pas non plus si son école est visée : le vocabulaire (étudiants, TD, TP, semestre, campus) parle au supérieur, alors que le menu « Solutions » met le collège en premier.

Les trois arguments que le relevé d'OpenEduCat retient (§ 5) sont **absents ou cachés** :

1. le refus expliqué : présent, c'est le seul ;
2. **tous les contextes** (sans wifi, sans écran, sans téléphone de l'élève) : jamais raconté ;
3. **aucun pays supposé** : contredit par Massar, le BTS et le LMD.

## 8. Les missions en cours comblent-elles les manques ?

| Manque relevé | Mission | Le comble ? |
|---|---|---|
| Contact vide | VIT-16 | **oui**, si le chef donne un canal publiable. La fiche place VIT-16 après VIT-12, dans la même session |
| Aucune preuve visuelle, onze pages sans image, ouverture faible, grille des apps | VIT-09 (et VIT-09a, #222, pour les logos) | **oui**. C'est la mission la plus lourde, et elle passe en dernier |
| Pages par rôle minces | VIT-10b | **en partie** : la fiche ajoute « avant → avec » et la FAQ, mais ne demande ni de retirer la phrase sur le site des cartes, ni de rapprocher les boutons de l'ouverture |
| Pas de « pourquoi Planner » | VIT-14 (#224, plan) | **oui** |
| Fonctions par type d'établissement | VIT-13 | **oui** ; elle peut aussi régler P1 |
| Une page par module, bloc « selon votre équipement » | VIT-15 | **oui pour les pages de module**, pas pour l'accueil ni la page En classe |
| FAQ, catalogue | VIT-11 | **oui** |
| Mentions légales | VIT-12 (#223) | **oui** |

**Hors de toute mission :**

1. le saut de mise en page du menu sur téléphone (§ 6) ;
2. la vidéo qui charge 1,5 Mo sans être demandée sur une connexion lente (EP-18) ;
3. la relecture des six phrases P1 à P6, de la formule de l'IA sur la page Bibliothèque, et des mentions du Maroc, du BTS et du LMD ;
4. le récit EP-18 sur l'accueil et la page En classe, où l'appel commence par le QR code ;
5. les pages `/ar/` en français, construites et mises en ligne avec le reste ;
6. les balises Open Graph ;
7. le `README.md` de `vitrine/`, qui parle encore de « logos redessinés » (ligne 28) alors que les SVG officiels sont en place.

## 9. Les dix corrections les plus utiles, rangées par effet attendu

| Rang | Correction | Fichiers | Mission | Taille |
|---|---|---|---|---|
| 1 | **Un vrai chemin de contact** : au moins un canal publiable dans la section Contact et sur une page `/contact/`, avec « ce qui se passe ensuite ». Sans lui, toutes les autres corrections ne servent à rien | `src/components/accueil/Contact.astro`, `accueil.json` (`contact`), `EnTete.astro` | VIT-16 (canal à donner par le chef, question 1) | S |
| 2 | **Une ouverture qui vend** : un titre qui dit la promesse (et non le seul mot « Planner »), le type d'école servi aujourd'hui, et des liens vers les quatre rôles | `src/components/accueil/Ouverture.astro`, `accueil.json` (`ouverture`) | VIT-09 (« première section améliorée ») | S |
| 3 | **Des preuves** : des captures réelles sur le jeu de démonstration neutre (calcul et bilan des contraintes, appel à la main, Studio, espace de cours), et une image sur chacune des onze pages qui n'en ont pas | `src/components/*/Illustration*.astro`, pages | VIT-09 | M |
| 4 | **« Pourquoi Planner »** : le comparatif par approche sur l'accueil et sur `/comparer/`, avec le refus expliqué, l'anti-fraude de l'appel, tous les contextes et aucun envoi caché | nouvelle section de l'accueil, page `/comparer/` | VIT-14 | M |
| 5 | **Raconter EP-18** : l'appel commence par la liste à la main, le QR code devient une option ; un quiz projeté sur un seul écran ; l'emploi du temps imprimé ; le bloc « selon votre équipement » | `accueil.json` (`appel`), `en-classe.json` (`appel`), `quiz-et-jeux.json` (`jeux.cartes.1`), `IllustrationAppel.astro` | VIT-15 pour les modules ; **nouvelle** pour l'accueil et En classe | S |
| 6 | **Supprimer le saut de 330 px du menu sur téléphone** : poser la classe qui replie le menu dans un script en ligne de l'en-tête de page, avant le premier rendu, au lieu du module. Attendu : performance mobile de 79 à environ 100 sur sept pages, et objectif du plan tenu | `src/components/socle/EnTete.astro`, `Gabarit.astro` | **nouvelle** (ou dans le code de VIT-06, #221) | S |
| 7 | **Rendre les six phrases exactes** (P1 à P6), la formule de l'IA sur la page Bibliothèque, et retirer les suppositions de pays (Massar en exemple, BTS, LMD), avec la validation du chef phrase par phrase | `accueil.json`, `en-classe.json`, `quiz-et-jeux.json`, `solutions.json`, `bientot.json`, `bibliotheque.json` (fr, en) | **nouvelle** (relecture des textes) | S |
| 8 | **Pages par rôle écrites pour le rôle** : ses tâches, « avant → avec », la FAQ ; retirer la phrase sur le site des cartes ; rapprocher les boutons de l'accroche | `PageRole.astro`, `direction.json`, `scolarite.json`, `enseignants.json`, `etudiants.json` | VIT-10b (à élargir de deux points) | S |
| 9 | **La vidéo ne part pas seule sur une connexion lente** : la lancer seulement sur demande quand `navigator.connection.effectiveType` vaut `2g` ou `3g`, ou sur tout téléphone ; garder l'image fixe tant qu'elle ne joue pas | `src/components/accueil/video.js`, lignes 14 à 16 | **nouvelle** (suite de VIT-08) | S |
| 10 | **Étoffer les pages minces et combler les grilles** : Application (une carte par onglet), Cours et annonces, Bibliothèque ; aucune grille à moitié vide | `application.json`, `cours-et-annonces.json`, `bibliotheque.json`, `GrilleCartes.astro` | VIT-09 et VIT-15 | M |

Trois points plus petits, à prendre au passage : ne construire `/ar/` que lorsque l'arabe est rempli (ou rendre `lang="fr"` aux textes non traduits) ; ajouter les balises Open Graph avant VIT-06 ; mettre à jour `vitrine/README.md` (ligne 28).

## 10. Questions au chef

| N° | Question | Proposition |
|---|---|---|
| 1 | Quel canal de contact peut être publié **dès la mise en ligne**, avant le formulaire de VIT-02 ? | une adresse e-mail dédiée au site, dans la section Contact, avec « réponse sous deux jours ouvrés » si tu peux la tenir |
| 2 | L'IA s'allume par la clé `IA_CLE` du serveur, pas par un réglage de l'école. Faut-il garder « quand l'école active l'IA » ? | écrire « quand l'IA est activée pour votre école » maintenant, et noter un interrupteur par école comme fonction à venir |
| 3 | EP-5 : faut-il retirer « Au Maroc, Massar en est un exemple », « BTS » et « crédits du LMD » ? | retirer l'exemple marocain ; « BTS » devient « les formations techniques supérieures » ; « avec les crédits » sans nommer de système |
| 4 | Le site doit-il dire franchement que le calcul de l'emploi du temps sert **aujourd'hui** le supérieur et la formation, et pas encore le collège et le lycée ? | oui : l'ouverture le dit en une ligne, et le collège passe après le supérieur dans le menu « Solutions » tant que son calcul est « bientôt » |

## 11. Ce qui n'a pas été fait

- Le site avec les PR ouvertes (#221 à #224) n'a pas été mesuré : la fiche le prévoit seulement à la demande du chef.
- La page Bibliothèque n'a pas été confrontée au code de StudyLib, qui n'est pas dans ce dépôt.
- Aucun essai sur un vrai téléphone d'entrée de gamme : les chiffres viennent de la simulation de Lighthouse.
- Aucun lecteur d'écran réel : axe-core et la lecture du code seulement.
