# Product

<!-- impeccable:product-schema 1 -->

## Platform

Le site (ordinateur) et l'application mobile Android (Expo ; iOS n'est pas encore construit) : deux clients du même serveur. Une installation sert **plusieurs écoles** ; chacune a sa base, et l'école se déduit de l'adresse et du jeton, jamais du corps de la requête (D-01 à D-03). Rien du produit n'est propre à une école : nom, nom court, couleurs, logo, expéditeur des courriels et modèle du document imprimé sont des données que l'administration règle (D-21).

## Users

- **Administration de l'école (rôle `admin`)** : le référentiel (filières ou niveaux, groupes emboîtés, cours et composantes CM, TD, TP, enseignants, étudiants et imports CSV), le calendrier (fériés, ramadan, examens), les salles et campus, les grilles horaires, la génération automatique, la publication du mois, les imprévus et reports, les réservations, les examens et surveillances, le suivi du réalisé et le visa des séances, les comptes, l'identité de l'école. Sur **ordinateur**, en séances longues, avec beaucoup de données à parcourir.
- **Responsable de filière** (un enseignant à qui l'administration confie une ou plusieurs filières) : prépare le semestre de ses filières — maquette, groupes, services des enseignants, revue des conflits — et publie leur emploi du temps. Même besoin de densité que l'administration, mais borné à son périmètre : hors de ses filières, le serveur répond 404.
- **Enseignant (rôle `enseignant`)** : son emploi du temps et son service, ses disponibilités et ses vœux, ses demandes de report, l'appel par QR code qu'il projette, l'espace de cours de ses classes (supports, dates d'ouverture, lien de visio, sondages), le Studio quiz, les jeux proposés à ses classes. Surtout sur **mobile**, entre deux cours.
- **Étudiant (rôle `etudiant`)** : sa prochaine séance, sa semaine et son mois (PDF au format de l'école), les notifications des changements (report, annulation, changement de salle), l'appel en scannant le QR code, les supports de cours, la Bibliothèque, les quiz et les jeux. Presque exclusivement sur **mobile**.
- **Pas encore pris en charge** : les élèves sans compte et leurs familles (module vie scolaire), les notes et bulletins, les frais. Le produit ne les connaît pas encore et ne fait pas semblant.

Le jury du projet PACTE n'est pas un utilisateur du produit : c'est le cadre d'origine, cité dans « Evidence on Hand ».

## Product Purpose

Planner est la plateforme de gestion scolaire qui commence par l'emploi du temps. Elle réunit les données pédagogiques d'une école, empêche les conflits d'horaire (salle, enseignant, groupe, disponibilité, trajet entre campus), génère les emplois du temps sous contraintes et fait vivre chaque séance : appel, supports, quiz, jeux.

Né d'un projet d'école évalué (cahier des charges PACTE), le produit vise maintenant **toute école** : du supérieur au primaire, et la formation professionnelle. Le cahier des charges reste la preuve de ce qui est démontré, pas l'identité du produit.

Ce qui compte comme réussite aujourd'hui :

- l'emploi du temps est généré, publié, et personne n'apprend un changement par hasard ;
- toutes les règles de l'école (salles, disponibilités, campus, heures) sont vérifiées au moment de la saisie, avec le refus expliqué ;
- une école se met en route **sans consultant** : elle règle son identité, son calendrier, ses grilles, son référentiel ;
- le produit ne nomme aucune école dans son code : il s'installe chez n'importe qui.

## Positioning

Face aux suites génériques (Pronote, Hyperplanning, WebUntis, Celcat), Planner se distingue par ce qui manque aux autres :

- **la génération** par solveur de contraintes (Timefold), puis le déploiement sur la période en sautant les dates bloquées ;
- **le refus expliqué** : une règle enfreinte renvoie la liste des violations, et l'administration peut forcer en justifiant, avec trace ;
- **la mise en route sans consultant** : campus, grilles, profils de génération et vocabulaire sont des données de l'école ;
- **une base par école** sur une même installation, sans qu'une école voie l'autre ;
- **le neutre** : aucun nom d'école dans le code, contrôle en intégration continue.

## Operating Context

- Ce que l'école fournit : ses créneaux (matin, après-midi, vendredi décalé), ses campus et ses salles, ses filières ou niveaux, ses groupes, ses années et périodes, et le format de son document d'emploi du temps.
- **Planner ne connaît ni les bâtiments ni les noms** (décision du 4 novembre 2026) : un campus est une donnée de l'école, pas une structure du produit. La seule école que le dépôt connaisse est l'école pilote de démonstration, à titre d'exemple.
- Le document mensuel suit un **modèle réglé par l'école** (EDT-04) : le format de son école d'origine, ou un format neutre qui n'écrit que le nom du groupe. L'administration choisit dans le panneau « Identité et marque ».
- Usage administratif : préparation de la période, puis ajustements au fil de l'eau (reports, imprévus, salles indisponibles). Usage enseignant et étudiant : coup d'œil rapide à la journée et à la semaine, réaction aux changements, sur téléphone.
- Marqueurs que les plannings d'école portent réellement : (P.S) première séance, (D.S) dernière séance, séances en distanciel ou hybrides, événements bloquants (journée pédagogique, ateliers), cours dédoublés par groupe.

## Capabilities and Constraints

- **Pile réelle** : API Node.js 22 / Express 4 / Sequelize 6 / MySQL 8.4 (migrations Umzug) ; site React 19 / Vite 7 / MUI 7 / FullCalendar 6 / Recharts 3, exports jsPDF, SheetJS, PapaParse ; solveur Java 21 / Spring Boot 4.1 / Timefold Solver 1.35 ; application Expo SDK 57 / React Native 0.86 ; déploiement Docker, Caddy et nginx en HTTPS sur une seule origine. Code partagé entre les trois clients dans `shared/`.
- **Fonctions livrées** : référentiel et imports, calendrier, salles et campus, grilles horaires, affectations, détection et résolution des conflits, génération avec versions, disponibilités et vœux, publication mensuelle avec notification et courriel, imprévus, reports, réservations, examens, appel par QR code, suivi du réalisé et visa, espace de cours, Studio quiz (dix types de questions, médias, quiz en direct, génération par l'IA), jeux pédagogiques, Bibliothèque, statistiques, journal de sécurité, identité de l'école, comptes et droits, connexion unique (OIDC), notifications push, export iCal.
- **Interrupteurs** : les devoirs, le quiz joué dans l'application, « Mes surveillances » et les annonces écrites par les enseignants sont **éteints** (`shared/fonctions.js` et variables du serveur) ; le code reste, la fonction se rallume. ClassQuiz et les sondages s'activent école par école.
- **Comptes** créés par l'administration seulement : pas d'inscription publique, invitation, changement de mot de passe à la première connexion, double authentification de l'administration, désactivation plutôt que suppression.
- **Règle de conflit** : une séance en conflit est refusée ; l'administration peut forcer avec une justification tracée.
- **Langues** : français et anglais, français par défaut. L'arabe est annoncé et **pas encore fait**.
- **Limites assumées** : élèves sans compte, familles et espace parents, notes et bulletins, frais et caisse, Massar ; la vente est gelée tant que le produit n'est pas prêt.

## Brand Commitments

- Nom du produit : **Planner**. Il devient « <nom court> Planner » chez une école qui a réglé son nom court.
- D-21 : nom, nom court, couleurs, logo, expéditeur et adresse de réponse des courriels vivent dans la base de l'école et se règlent dans le panneau « Identité et marque ». Aucun nom d'école dans le code (`npm run verifier:neutre`, contrôlé en CI).
- Ton : professionnel et direct, adresse « vous », phrases courtes, pas de jargon. Une erreur dit ce qui s'est passé et quoi faire. Dans les écrans : « Quiz », « Bibliothèque », « Activités ».
- Le document imprimé porte les couleurs et le logo de l'école ; son vocabulaire suit le modèle que l'école a réglé.

## Evidence on Hand

- **Origine** : cahier des charges PACTE (`docs/ecole/`) et emploi du temps réel d'une école d'ingénieurs (les PDF d'origine sont gardés hors du dépôt, qui est public ; leurs données, sans nom de personne : `docs/exemple_emploi_du_temps_donnee.yaml`) ; le jury PACTE évaluait ce projet.
- **Démonstration** : `backend/seed.js` et `backend/demo/ecolePilote.js` créent une école fictive complète (campus, salles, filières, groupes, cours, enseignants, étudiants) et des comptes de test, refusés en production.
- **Présentation** : vidéo de 1 min 30, diaporamas, discours et captures (`docs/presentation/`), maquettes (`docs/maquettes/`).
- **Marché** : concurrents, problèmes des écoles et arguments (`docs/etude-marche/`).
- **Production** : l'école pilote, une école d'ingénieurs à Casablanca, pendant l'année 2026-2027. **Aucun autre client, aucun chiffre d'adoption, aucun témoignage : ne pas en inventer.**

## Product Principles

1. **L'information qui change d'abord.** Une séance reportée, annulée ou déplacée saute aux yeux avant tout le reste, pour chaque rôle.
2. **Prévenir plutôt que réparer.** Un conflit se voit au moment de la saisie, avec des alternatives, pas après coup dans une liste.
3. **Le bon écran pour le bon rôle.** L'administration a besoin de densité et de contrôle sur grand écran ; l'enseignant et l'étudiant ont besoin d'une réponse en deux secondes sur téléphone.
4. **Le document au format de l'école.** Matière, enseignant, salle, marqueurs (P.S, D.S, distanciel) se lisent comme dans les plannings que l'école diffuse déjà ; le vocabulaire suit le profil de l'école, jamais celui d'une autre.
5. **Chaque parcours se démontre.** Toute fonction annoncée est atteignable et compréhensible en démonstration, sans explication orale.

## Accessibility & Inclusion

- Cible WCAG 2.2 AA : contrastes vérifiés, navigation clavier complète côté administration, cibles tactiles d'au moins 44 px sur mobile, libellés explicites.
- Interface bilingue français / anglais, attribut `lang` correct, aucune chaîne en dur non traduite dans les nouveaux écrans.
- L'arabe (interface et document) est un lot à part, non fait : il se démontrera avant d'être annoncé.
