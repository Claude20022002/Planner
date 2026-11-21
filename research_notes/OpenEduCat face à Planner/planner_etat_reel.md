# Planner : état réel au 17 novembre 2026

Colonne Planner d’un comparatif ultérieur. Faits lus dans le dépôt seulement, marqués [dépôt]. Une ligne de plan n’est pas une fonction livrée.

Périmètre git constaté le 17 novembre 2026 : la copie de travail est sur `main` à `9d3df20a` (15 novembre 2026, 23:35 UTC). `origin/main` connu localement est `bd934ebf` (16 novembre 2026, 07:31 UTC), 35 commits plus loin, ancêtre commun = la copie locale. Les fichiers lus sur disque sont donc ceux du 15 novembre au soir, sauf les trois fichiers dont le diff vers `origin/main` a été lu : `docs/plan/suivi.md`, `docs/plan/modules/UIX-interface.md`, `docs/plan/modules/QUA-qualite-docs.md`. Aucun `git fetch` n’a été relancé le 17 novembre : un push après le 16 novembre 07:31 UTC n’est pas dans cette note.

Légende d’inventaire, reprise du comparatif du 15 novembre : **existe** (code sur `main`) · **partiel** · **prévu** (identifiant du plan) · **reporté ou gelé** · **hors plan**.

« Sur `main` » veut dire présent dans cette branche git. Ce n’est pas « en service chez une école ». Le fichier d’exploitation dit autre chose sur la production (question maturité).

## Intention produit

### Takeaway

Le plan actif vise les écoles privées, de la maternelle au lycée, puis la formation professionnelle, tout en continuant de servir HESTIM (supérieur). `docs/ecole/plan.txt` est une vision d’ERP modulaire pour l’Afrique : le plan du 7 novembre 2026 dit qu’elle n’est pas le plan, et que ses prix et sa pile ne s’appliquent pas.

### Cited Findings

- [dépôt] Depuis le 7 novembre 2026, `docs/plan/` est « la seule référence pour savoir quoi faire et dans quel ordre ». Il remplace les plans d’octobre et de début novembre, archivés. — [docs/plan/README.md](docs/plan/README.md)
- [dépôt] `docs/ecole/plan.txt` y est décrit ainsi : « La vision à long terme (ERP modulaire pour l’Afrique). Pas un plan : ses choix de pile et de prix ne s’appliquent pas. » Le README racine répète : « Vision à long terme … ce n’est pas un plan. » — [docs/plan/README.md](docs/plan/README.md) ; [README.md](README.md)
- [dépôt] Décision du 7 novembre, dans le plan actif : « plusieurs écoles sur une installation d’abord ». Cible : « les écoles privées, de la maternelle au lycée, puis la formation professionnelle ; HESTIM (supérieur) reste servi. » — [docs/plan/README.md](docs/plan/README.md)
- [dépôt] Le README racine, tableau « Pour qui » : « Aujourd’hui, une école du supérieur (HESTIM). Ensuite, les écoles privées de la maternelle au lycée, puis la formation professionnelle : plusieurs écoles sur une même installation, chacune isolée dans sa base. » Phrase d’ouverture : « La plateforme de gestion scolaire qui commence par l’emploi du temps. » — [README.md](README.md)
- [dépôt] Le même README dit l’état de novembre 2026 en une phrase : la planification, la vie de la séance et le numérique pédagogique sont « mûrs et en production pour HESTIM » ; le travail porte sur plusieurs écoles, puis « le modèle du scolaire (élèves et familles, notes, frais) » ; « La vente est mise de côté tant que le produit n’est pas prêt. » Cette phrase « en production » est contredite par le fichier d’exploitation (question maturité) : elle n’est pas reprise ici comme un fait d’exploitation. — [README.md](README.md) ; [docs/plan/modules/EXP-exploitation.md](docs/plan/modules/EXP-exploitation.md)
- [dépôt] Ordre du plan actif, sans dates promises : étape 0 (fusions, nouveau serveur) ; 1 fondations ; 2 plusieurs écoles (HESTIM et une école neuve au vocabulaire scolaire, sans StudyLib ni ClassQuiz pour la seconde) ; 3 une école scolaire se configure seule, « un vrai collège avec groupes de langue » ; 4 pack « École privée » (maternelle au lycée : familles, emploi du temps, absences prévenues, notes et bulletins, frais, espace parents en arabe et en français) ; 5 durée de vie (formation professionnelle et continue, passage d’année, export) ; fonctions « libre » sans dépendance d’étape. FIN, COM et PAI ne se construisent qu’après les entretiens VEN-02 (décision du 13 novembre). — [docs/plan/README.md](docs/plan/README.md)
- [dépôt] Estimations du plan : environ 290 jours bruts, dont environ 53 ajoutés le 13 novembre, à multiplier par 1,5 à 2. « Aucune date n’est promise tant que l’effectif n’est pas connu. » — [docs/plan/README.md](docs/plan/README.md)
- [dépôt] `plan.txt` s’ouvre sur « ERP scolaire modulaire pour l’Afrique », « inspiré du modèle économique d’Odoo », modules et packs. Son bandeau, corrigé le 4 novembre 2026, dit encore : « Il reste la référence du produit, et le plan à suivre en est tiré : docs/archives/plans/plan-produit/04-plan-fusionne.md. » Cette phrase est plus ancienne que la règle du 7 novembre. Les prix y sont des hypothèses. Le plan actif a révoqué l’ancienne cible « supérieur seulement » (Q-3) et gelé quatre prix qui circulaient. — [docs/ecole/plan.txt](docs/ecole/plan.txt) ; [docs/plan/README.md](docs/plan/README.md)
- [dépôt] Le plan actif compte 27 codes de module. Les quinze du README racine (PLA, EXP, MOT, EDT, ADM, VSC, COU, BIB, QJE, MOB, UIX, VIT, VEN, FIN, QUA) plus douze ajoutés le 13 novembre depuis l’inventaire du 11 novembre : COM, ETA, PAI, RHP, FOR, DOC, INS, PIL, GRP, STA, SER, STK. Le README racine dit encore « 15 modules » et s’arrête à QUA : QUA-01 (« README.md et PRODUCT.md à jour ») est « à faire ». — [docs/plan/README.md](docs/plan/README.md) ; [README.md](README.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)

### Inferences

- Pour la colonne Planner, la cible à citer est celle du 7 novembre (privé, maternelle → lycée, puis professionnel, HESTIM encore servi), pas le positionnement « ERP africain type Odoo » de `plan.txt`.
- Le produit décrit par le plan n’est pas encore cette cible : l’étape 2 (plusieurs écoles) et l’étape 4 (pack école privée) ne sont pas faites. Le détail est dans l’inventaire.

### Gaps

- `plan.txt` se dit encore « référence du produit » dans son propre bandeau du 4 novembre. Le plan du 7 novembre le rétrograde. Cette note suit le plan du 7 novembre, sans réconcilier les deux textes au-delà de ce constat.
- Aucune relecture ligne à ligne de `plan.txt` (plus de 1 100 lignes) : seuls le bandeau, le positionnement ERP Afrique, et le renvoi du plan actif ont été utilisés. Les prix et la pile qui y figurent ne sont pas des faits du produit en cours.

## Pile technique

### Takeaway

Pile confirmée le 13 novembre 2026 (QUA-03, fait le 15 novembre) : Node 22, Express 4, Sequelize 6, MySQL 8.4, React 19, MUI 7, Expo 57, React Native 0.86, Java 21, JWT maison. Le solveur sur `main` est Spring Boot 4.1.2 et le cœur Timefold 1.35.0, sans le starter (MOT-12, fusionné le 15 novembre). La pile proposée dans `plan.txt` (NestJS, PostgreSQL, Tailwind, OR-Tools, Keycloak, BullMQ) est écartée.

### Cited Findings

- [dépôt] Verdict QUA-03, étude du 13 novembre sur `main` au commit `548c19e` : « Garder la pile actuelle, si D-01 tient à la mesure de PLA-06. » Aucune partie n’a le verdict « rouvrir ». Décision inscrite le 13 novembre. Suivi : QUA-03 « fait (#171, 15 nov.) ». PLA-06 (la mesure qui conditionne D-01) est encore « à faire ». — [docs/conception/qualite/pile.md](docs/conception/qualite/pile.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)
- [dépôt] Volumes relevés le 13 novembre dans cette étude : serveur environ 36 600 lignes de JavaScript hors tests (81 modèles, 63 migrations, 52 fichiers de routes, 38 contrôleurs) ; site environ 42 500 lignes ; mobile environ 9 200 lignes ; solveur environ 2 000 lignes de Java ; 25 fichiers de parcours Playwright. Ces volumes sont antérieurs à MOT-12 et MOT-13. — [docs/conception/qualite/pile.md](docs/conception/qualite/pile.md)
- [dépôt] Fiches de l’étude, verdict « garder » partout : Node 22 et Express 4.18 ; Sequelize 6.37 et mysql2 (« garder, sous surveillance ») ; MySQL 8.4.13 (« garder, si D-01 tient ») ; React 19 et MUI 7 ; Expo 57 et React Native 0.86 ; Java 21, Spring Boot et Timefold (« garder jusqu’à MOT-04 ») ; JWT maison (jsonwebtoken 9, bcryptjs, helmet). BullMQ et Redis : non. Les tâches périodiques utilisent un verrou MySQL (`GET_LOCK`). — [docs/conception/qualite/pile.md](docs/conception/qualite/pile.md)
- [dépôt] `solver/pom.xml` sur la copie de `main` : parent Spring Boot `4.1.2`, propriété `timefold.version` `1.35.0`, artefact `timefold-solver-core` (pas le starter). Commit de ce fichier : `ecb94eee`, 15 novembre 2026, message « MOT-12 : solveur sur Spring Boot 4.1.2 et le cœur de Timefold 1.35.0, sans starter ». Suivi : MOT-12 « fait (15 nov.) », PR #181. `pom.xml` ne fait pas partie des 35 commits qui séparent la copie locale de `origin/main`. — [solver/pom.xml](solver/pom.xml) ; [docs/plan/suivi.md](docs/plan/suivi.md)
- [dépôt] Le fichier MOT, section « Ce qui existe », décrit le solveur ainsi après MOT-12 et MOT-13b : Java 21, Spring Boot 4.1.2, cœur Timefold 1.35.0 sans starter (`ConfigurationSolveur.java`), limité à 1 Go et à 2 calculs simultanés. L’étude de pile du 13 novembre parlait encore de 640 Mo « sur le serveur provisoire » et de Timefold 1.15.0 / Spring Boot 3.3.5 : ces deux chiffres sont ceux d’avant MOT-12. — [docs/plan/modules/MOT-moteur.md](docs/plan/modules/MOT-moteur.md) ; [docs/conception/qualite/pile.md](docs/conception/qualite/pile.md)
- [dépôt] Le README racine, tableau d’architecture, dit encore « Java 21, Spring Boot 3.3, Timefold Solver 1.15 ». Les badges du même fichier disent Node.js 22, React 19, Java 21, MySQL 8.4, Expo 57, sans version de Timefold. QUA-01, qui doit mettre ce README à jour, est « à faire ». — [README.md](README.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)
- [dépôt] Autres composants nommés par le README racine, hors du monolithe : StudyLib (Laravel 13, Livewire 4, dépôt voisin, MySQL, Redis, MinIO, Meilisearch) ; ClassQuiz (fork Python/Svelte, dépôt voisin, PostgreSQL), « éteint par défaut, remplacé par le Studio quiz » ; Caddy, nginx, Docker Compose. Le solveur « n’est jamais exposé » : seul le serveur l’appelle, réseau interne, jeton, lecture seule. — [README.md](README.md) ; [docs/conception/qualite/pile.md](docs/conception/qualite/pile.md) ; [docs/plan/modules/BIB-bibliotheque.md](docs/plan/modules/BIB-bibliotheque.md)
- [dépôt] Site : i18next déjà en place. Fichiers vus : `frontend/src/i18n/index.js` charge le français et l’anglais (« Internationalisation FR / EN »). Le module UIX, y compris sa version sur `origin/main` : « il n’y a pas d’arabe ». — [frontend/src/i18n/index.js](frontend/src/i18n/index.js) ; [docs/plan/modules/UIX-interface.md](docs/plan/modules/UIX-interface.md)
- [dépôt] Mobile : Expo `~57.0.27`, Expo Router. — [docs/plan/modules/MOB-application.md](docs/plan/modules/MOB-application.md)
- [dépôt] Timefold 2.x n’est pas en place. L’étude de pile : en 2.0, `ScoreAnalysis` passe dans une édition payante (`TimefoldSolverEnterpriseService` vérifié le 15 novembre dans le jar 2.8.0) ; le starter 1.x ne démarre pas sous Spring Boot 4 ; le cœur 1.35 sans starter y fonctionne. Le choix Timefold contre CP-SAT (OR-Tools de `plan.txt`) est renvoyé à MOT-04, « à faire ». — [docs/conception/qualite/pile.md](docs/conception/qualite/pile.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)

### Inferences

- Pour un comparatif, la version de solveur à écrire est Timefold 1.35.0 / Spring Boot 4.1.2 / Java 21, pas 1.15.0 / 3.3. Le README racine et `ecarts-du-solveur.md` (4 novembre) sont en retard sur ce point.
- « Pile confirmée » ne signifie pas « D-01 prouvé » : la condition PLA-06 est ouverte.

### Gaps

- Les dates de fin de support citées dans `pile.md` viennent de pages web consultées le 13 novembre 2026. Elles n’ont pas été revérifiées le 17 novembre. Cette note ne les répète pas comme des faits du 17 novembre.
- Le volume de code (lignes, nombre de tests) n’a pas été recompté après MOT-12 et MOT-13.

## Inventaire : code sur main contre lignes du plan

### Takeaway

Sur `main`, le cœur qui tourne dans le code est l’emploi du temps du supérieur (génération, conflits, salles, examens saisis, appel par QR), l’espace de cours partiel, le Studio quiz, StudyLib pour une seule école, et une application mobile étudiants. La vie scolaire (familles, notes), les frais, les parents, Massar, l’arabe et l’isolation de plusieurs écoles en production sont des lignes du plan, pas des modules livrés.

### Cited Findings

Limites du solveur, encore celles que le module MOT appelle « limites du modèle actuel », après MOT-12 :

- [dépôt] Relevé du 4 novembre 2026 (`ecarts-du-solveur.md`, commit `818cebb`) : le calcul choisit « un créneau et une salle pour chaque séance d’une semaine type, et rien d’autre ». Le fichier disait alors « le solveur tient 22 règles. Le catalogue en compte 134 » et citait Timefold 1.15.0 / Spring Boot 3.3.5. Le module MOT, plus récent, ne retire pas les écarts de forme F-1 à F-8 ; il change le décompte des règles après MOT-13b (voir plus bas). MOT-06, MOT-07 et MOT-11, qui doivent lever ces écarts, sont « à faire ». — [docs/conception/moteur-planification/ecarts-du-solveur.md](docs/conception/moteur-planification/ecarts-du-solveur.md) ; [docs/plan/modules/MOT-moteur.md](docs/plan/modules/MOT-moteur.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)
- [dépôt] F-1 : une seule semaine type, recopiée sur les dates. F-2 : l’enseignant est imposé avant le calcul. F-3 : une séance couvre 1 ou 2 créneaux. F-4 : au plus 6 séances par semaine et par enseignement. F-5 : conflits par hiérarchie de groupes, pas par élève. F-6 : les groupes sont donnés, pas calculés. F-7 : une séance ne mobilise que des enseignants et une salle. F-8 : les examens sont hors du calcul (`services/planning/examens.js` : saisis, puis contrôlés). — [docs/conception/moteur-planification/ecarts-du-solveur.md](docs/conception/moteur-planification/ecarts-du-solveur.md)
- [dépôt] Autres limites écrites le 4 novembre et non marquées comme levées dans le suivi : fériés, vacances et indisponibilités ponctuelles découverts au déploiement, pas pendant le calcul ; le volume horaire peut manquer alors que le calcul « pense avoir réussi » ; plafond hebdomadaire enseignant averti avant le calcul mais inconnu du solveur ; pause du vendredi sans effet dans le solveur de l’époque ; en cas d’échec, message « pas de place sans conflit pour ces modules », sans dire pourquoi. La pause du vendredi et le samedi après-midi sont, dans le texte MOT-13b, devenus des contraintes déclarées (migration 0081) : cela ne lève pas F-1 à F-8. MOT-03 (validation avant le calcul, messages EP-4) est « PR ouverte » #183, « à corriger » le 15 novembre au soir (le refus doit nommer sa cible). — [docs/conception/moteur-planification/ecarts-du-solveur.md](docs/conception/moteur-planification/ecarts-du-solveur.md) ; [docs/plan/modules/MOT-moteur.md](docs/plan/modules/MOT-moteur.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)
- [dépôt] Catalogue : 498 paramètres et 5 profils (JSON dans `backend/services/moteur/catalogue/`). MOT-01 (valeurs datées) est fait côté serveur (#156, 10 novembre) ; les écrans sont renvoyés à ADM-02, « à faire ». Le fichier MOT dit que la génération ne lit, de ces valeurs, que les poids des 9 règles souples du profil (MOT-13b). — [docs/plan/modules/MOT-moteur.md](docs/plan/modules/MOT-moteur.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)
- [dépôt] MOT-13a est fusionnée (#178, 15 novembre) : contraintes déclarées par l’école, six modèles, contrôle de place. MOT-13b : le code est dans l’historique de `main` (commits `9a2f5449` à `c61863ae`, fusion #182 `d0359925`, 15 novembre). Le fichier MOT décrit alors : score `HardMediumSoftScore` ; 12 règles dures ; 9 souples du profil ; 12 règles de contraintes déclarées. La ligne de suivi, sur la même branche, dit encore « en cours » et « PR ouverte (#182) ». Le message du commit de coordination `e34718f0` dit « MOT-13b et #177 fusionnées ». 13c (écran) attend ADM-02. — [docs/plan/modules/MOT-moteur.md](docs/plan/modules/MOT-moteur.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)

Inventaire demandé :

| Sujet | État | Ce que le dépôt dit |
|---|---|---|
| Solveur d’emploi du temps | partiel | Existe pour une semaine type du supérieur, avec les limites F-1 à F-8. Timefold 1.35.0 sur `main`. Collège (conflits par élève, langues) = prévu MOT-06, étape 3. Semaines A/B et séances de plus de 2 créneaux = prévu MOT-07. Examens dans le calcul = prévu MOT-11, étape 5. Explication des refus à l’écran = prévu EDT-03, étape 3. Remplaçant automatique = prévu MOT-09, étape 4. |
| Appel / présences | existe, périmètre séance | Appel par QR, trois statuts (présent, en retard, absent), signalements, téléphone, projection. Fichiers cités : `presenceRoutes`, `services/presences/*`, écrans `Appel`, `AppelProjection`, `Presence`, mobile `scan` / `scanner`. Absences prévenues aux parents, justificatifs = prévu VSC-03, étape 4. |
| Examens | partiel | Sessions, salles, surveillances : le module EDT les compte dans « ce qui existe » (`examen`, `MesExamens`, tables `SessionExamen*`, `Surveillance`). Ils ne sont pas des variables du solveur (F-8). Intégration au calcul = prévu MOT-11. |
| Salles | existe, sans bâtiments | Routes et tables `Salle`, `Campus`, `TrajetCampus`, `Reservation`. « Planner ne connaît pas les bâtiments » (décision du 4 novembre, fichier EDT). Salles spécialisées du collège = prévues dans MOT-06. |
| Studio quiz | existe, suite prévue | 10 types de questions, médias, passation par QR ou code, quiz en direct. ClassQuiz reste dans le compose, éteint pour une installation neuve, allumé pour HESTIM. Joueur natif mobile coupé (`QUIZ_DANS_L_APPLICATION = false`) = prévu QJE-03. Import GIFT et Moodle XML = prévu QJE-02. Fournisseur d’IA non choisi en production = prévu QJE-07. Entrée « Quiz » qui ouvre encore ClassQuiz = prévu QJE-01. Neuf simulations de la branche `jeux-pedagogique` non fusionnées = QJE-04. |
| StudyLib | partiel | Application Laravel séparée, servie sous `/biblio`, MySQL `studylib`, Redis, MinIO, Meilisearch. « StudyLib n’existe aujourd’hui que pour HESTIM. » « Une seconde école n’a pas de Bibliothèque jusqu’à BIB-02 » (étape 5). Identifiants stables = prévu BIB-01, étape 2. |
| Espace de cours | partiel | Supports en sections, dates d’ouverture, lien de visio, sondages anonymes (COU-01 fait, #148). Annonces : code présent, éteint (`ANNONCES_ENSEIGNANTS_ACTIVES`). Devoirs : code présent (`devoirRoutes`), éteint (`DEVOIRS_ACTIFS=false`) ; remise de fichier = prévu COU-02, étape 4, après revue de sécurité. Commentaires, questions de classe, « vu » = prévus COU-03 à COU-05. Messagerie = conditionnel COU-08. LTI = reporté COU-09. |
| Frais | prévu | Fichier FIN : « Rien pour les frais. » FIN-01 (frais, échéanciers, caisse, reçus) et FIN-02 (relances, export comptable), étape 4, après VEN-02. Paiement en ligne = prévu PAI-02 ; argent mobile = reporté PAI-03. Comptabilité générale = hors plan (le comparatif du 15 novembre le dit ; le module FIN ne prévoit qu’un export). |
| Parents | prévu | Fichier ADM : le rôle parent « n’existe pas ». Prévu ADM-05 (étape 4), avec élèves et familles VSC-02, compte famille COM-02, espace mobile MOB-05. |
| Massar | prévu | Fichier ETA : « Rien pour les échanges avec un système d’État. » « Le format de Massar n’est pas encore obtenu. » Cadre = prévu ETA-01 ; Massar (ancien VSC-05) = prévu ETA-02, étape 4, après les absences et les notes. Autres pays = reporté ETA-03. |
| Arabe | prévu | UIX : français (`fr.js`, 2 575 lignes citées) et anglais (`en.js`) ; « il n’y a pas d’arabe ». 133 styles dépendent du sens de lecture, dans 81 fichiers. Socle et droite à gauche = UIX-01, « conçu, à coder », étape 2. Arabe complet (site, application, PDF) = prévu UIX-04, étape 4, taille XL. |
| Plusieurs écoles | partiel | Décision D-01 (une base par école) écrite. Code : une seule base dans `backend/config/db.js`. Essai de contexte fusionné le 10 novembre (#142), mode strict éteint. PLA-01 (contexte en production) « à faire ». PLA-03a fusionnée le 15 novembre (#173) : une base neuve n’a pas les campus d’HESTIM. PLA-03b (schéma de départ) : plan, pas le code de production multi-écoles. Tests d’isolation de chaque route = prévus PLA-04. Registre et création d’école = prévus PLA-05. Mesure 200 bases = PLA-06, « à faire ». |
| Mobile | partiel | Expo 57, onglets étudiants (emploi du temps, scan, jeux, bibliothèque, compte). « L’application refuse tout rôle autre qu’étudiant. » Adresse d’API figée à la construction. Essai sur un vrai téléphone = prévu MOB-01 (non fait, ME-11). Enseignant = prévu MOB-02. Parents = prévu MOB-05. Hors ligne = prévu MOB-06, étape 4. Le README racine annonce « emploi du temps lisible hors ligne » dans EP-3 : le module le classe comme non fait. |

Sources de la table : [docs/plan/modules/MOT-moteur.md](docs/plan/modules/MOT-moteur.md), [docs/plan/modules/EDT-emploi-du-temps.md](docs/plan/modules/EDT-emploi-du-temps.md), [docs/plan/modules/VSC-vie-scolaire.md](docs/plan/modules/VSC-vie-scolaire.md), [docs/plan/modules/QJE-quiz-jeux-ia.md](docs/plan/modules/QJE-quiz-jeux-ia.md), [docs/plan/modules/BIB-bibliotheque.md](docs/plan/modules/BIB-bibliotheque.md), [docs/plan/modules/COU-espace-de-cours.md](docs/plan/modules/COU-espace-de-cours.md), [docs/plan/modules/FIN-finance-ecole.md](docs/plan/modules/FIN-finance-ecole.md), [docs/plan/modules/ADM-administration.md](docs/plan/modules/ADM-administration.md), [docs/plan/modules/ETA-echanges-etat.md](docs/plan/modules/ETA-echanges-etat.md), [docs/plan/modules/UIX-interface.md](docs/plan/modules/UIX-interface.md), [docs/plan/modules/PLA-plateforme.md](docs/plan/modules/PLA-plateforme.md), [docs/plan/modules/MOB-application.md](docs/plan/modules/MOB-application.md), [docs/plan/suivi.md](docs/plan/suivi.md), [README.md](README.md).

Autres faits utiles au comparatif, mêmes sources :

- [dépôt] Élève : la table `Etudiant` dépend de `Users` ; e-mail et mot de passe obligatoires. « Un élève ne peut donc pas exister sans compte. » VSC-01 (conception du modèle scolaire) : « plan du document à valider », pas un schéma livré. VSC-02, VSC-04 (notes et bulletins, taille XL) : « à faire », étape 4. Champs encore propres au supérieur : `Cours.semestre`, `Cours.volume_horaire`, `Cours.type_cours`, `Groupe.id_filiere`. — [docs/plan/modules/VSC-vie-scolaire.md](docs/plan/modules/VSC-vie-scolaire.md)
- [dépôt] Rôles qui existent : admin, enseignant, responsable de filière, étudiant. Rôle parent : non. Équipe Planner dans l’application : non (commandes sur le serveur). — [docs/plan/modules/ADM-administration.md](docs/plan/modules/ADM-administration.md)
- [dépôt] Emploi du temps côté écrans, listé comme existant par EDT : séances, préparation, publication, reports, disponibilités, imprévus, calendrier, PDF navigateur, agenda ICS, visas de séances. EDT-02 (horaires saisonniers sans tout régénérer) est « à faire » ; une règle Ramadan est citée dans `services/planning`. EDT-04 (PDF selon l’école, sans mots du supérieur) est « à faire ». — [docs/plan/modules/EDT-emploi-du-temps.md](docs/plan/modules/EDT-emploi-du-temps.md)
- [dépôt] QJE-04 sur `origin/main` : la ligne de suivi passe à « en cours » (corrections B-1, B-2, I-1 sur la branche `jeux-pedagogique`). La fusion de la PR #165 est une relecture documentaire, pas la fusion des jeux. Le fichier QJE de la copie locale disait encore « la branche n’est pas fusionnée ». — [docs/plan/suivi.md](docs/plan/suivi.md) ; [docs/plan/modules/QJE-quiz-jeux-ia.md](docs/plan/modules/QJE-quiz-jeux-ia.md)
- [dépôt] UIX-01a, sur `origin/main` : « fait : #184 fusionnée, CI verte, 43 parcours » (accueil des applications, recherche FR/EN). La copie locale disait encore « PR ouverte » et « CI rouge » : le suivi a été corrigé dans les 35 commits. Ce lot « ne réalise pas la migration du socle neutre ». UIX-06a : le journal git d’`origin/main` contient « Merge pull request #185 » (16 novembre 2026, 01:05 UTC) ; le `suivi.md` de ce même `origin/main` dit encore « PR ouverte » et « CI parcours rouge », avec un correctif de test committé localement. À ne pas compter comme un module métier nouveau. — [docs/plan/suivi.md](docs/plan/suivi.md) ; [docs/plan/modules/UIX-interface.md](docs/plan/modules/UIX-interface.md)
- [dépôt] Hors plan, selon le comparatif interne du 15 novembre (document du dépôt, pas une revue du code refaite le 17) : discipline, santé de l’élève, comptabilité générale, correction de copies par scan, assistance / tickets. — [docs/etude-marche/07-comparatif-odoo.md](docs/etude-marche/07-comparatif-odoo.md)
- [dépôt] Reportés ou gelés, lignes de suivi (extrait) : vente et abonnements VEN-03 à VEN-09 gelés ; vitrine complète VIT-05 gelée ; marketing de publication MKT-08 à MKT-10 gelé ; créateurs de jeux QJE-08 gelé ; console multi-écoles PLA-08 à PLA-11 et PLA-13 reportés ; pilotage PIL-01 et PIL-02, réseaux GRP-01 et GRP-02, cantine/transport/internat SER-01, stocks STK-01, stages alternance STA-02 reportés. STA-01 (offres de stage) est « à décider ». — [docs/plan/suivi.md](docs/plan/suivi.md)

### Inferences

- Un directeur qui cherche familles, bulletins, frais ou Massar ne trouve, sur `main`, que des identifiants d’étape 4. Le code correspondant n’est pas là, et les interrupteurs éteignent devoirs et annonces plutôt que de les présenter comme livrés.
- Le solveur de `main` n’est pas le solveur décrit par le README racine (1.15 / Boot 3.3), ni seulement celui du relevé du 4 novembre (22 règles) : MOT-13b a ajouté des contraintes déclarées sans changer la forme du modèle (semaine type, enseignant imposé, pas de conflit par élève, examens hors calcul).

### Gaps

- Les fichiers Java du solveur n’ont pas été relus règle par règle le 17 novembre. F-1 à F-8 sont ceux que le module MOT appelle encore « limites du modèle actuel », pas une nouvelle mesure.
- L’écart entre « Merge pull request #185 / #187 » dans le journal et les lignes de suivi encore « PR ouverte » / « en cours » n’a pas été tranché en ouvrant les PR. Le code de ces deux lots est dans `origin/main` ; le mot « fait » n’est pas écrit dans le suivi.
- La copie de travail n’a pas été mise à jour sur `origin/main`. Les modules autres qu’UIX et QUA n’ont pas de diff sur ces 35 commits : leur « ce qui existe » est celui du 15 novembre au soir.

## Exigences EP-1 à EP-12 et définition de « terminé »

### Takeaway

EP-1 à EP-12 sont des exigences mesurables, chacune à partir d’une étape du plan. Elles ne sont pas déclarées tenues. « Terminé » pour une fonction, c’est sept conditions de fusion (CI, critère du module, test, exigences applicables, migration réservée, documentation, dépôt sans donnée réelle), plus le critère écrit dans le fichier du module.

### Cited Findings

- [dépôt] Les exigences viennent des reproches faits aux autres outils. « Elles s’appliquent à toute fonction concernée, à partir de l’étape indiquée. » — [docs/plan/README.md](docs/plan/README.md)

| N° | Exigence (résumé du plan) | Étape où elle s’applique |
|---|---|---|
| EP-1 | Mise en route sans consultant : une école de 300 élèves en service en moins d’une heure avec un fichier réel, par une personne extérieure. Le seuil se fixe après mesure sur un vrai fichier. | 3 |
| EP-2 | Interface sobre : menu limité aux modules actifs ; axe-core sans violation ; trois clics au plus jusqu’à un réglage montré à l’école. | 3 |
| EP-3 | Application rapide et fiable : ouverture en moins de 2 s sur un téléphone de référence (à choisir, MOB-03) ; emploi du temps lisible hors ligne. | 2 et 4 |
| EP-4 | Chaque refus s’explique : le conflit nomme la règle et le groupe, et propose au moins une solution. | 3 |
| EP-5 | Saisie unique : aucune donnée saisie deux fois ; exports au format accepté par Massar et par le comptable. | 4 |
| EP-6 | L’enseignant saisit moins : appel en un geste ; temps de saisie d’une classe mesuré avant et après chaque fonction qui ajoute une saisie. | 4 |
| EP-7 | Notifications maîtrisées : plages horaires, résumés ; un parent reçoit au plus un résumé par jour hors alerte. | 4 |
| EP-8 | Passage d’année inclus : moins d’une demi-journée, sans perte. | 5 |
| EP-9 | Les mises à jour ne cassent rien : parcours verts avant mise en ligne ; retour arrière de l’image en une commande ; migrations « étendre puis contracter ». | 1 |
| EP-10 | Rapide à grande échelle : collège de 600 élèves généré en moins de 10 min ; pages de gestion en moins de 1 s. | 3 |
| EP-11 | Accessible et bilingue : contraste AA ; français, arabe (droite à gauche) et anglais. | 2 (droite à gauche), 4 (arabe complet) |
| EP-12 | Les données restent à l’école : isolation testée sur chaque route ; export complet à tout moment. | 2 et 5 |

- [dépôt] Condition légale du même paragraphe : « aucune donnée réelle de mineur sur Planner avant le contrat de sous-traitance, le dossier CNDP de l’école et le test d’intrusion (EXP-08) ». EXP-08 est « à faire », étape 4. — [docs/plan/README.md](docs/plan/README.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)
- [dépôt] Définition de « terminé » (§ 4), les sept conditions pour fusionner une PR : (1) CI verte (site, serveur, mobile, solveur, parcours) ; (2) critère de la fonction atteint ; (3) test de régression par correctif, ou `test.failing` si une faille connue reste ; (4) exigences produit applicables tenues ; (5) numéro de migration réservé dans le suivi ; (6) documentation du module, du suivi et de la conception ; (7) rien de réel dans le dépôt (contrôle `scripts/verifier-neutre.mjs`). Le dépôt est public. — [docs/plan/README.md](docs/plan/README.md)
- [dépôt] Exemples de critères de fonction, non atteints puisque les lignes sont « à faire » : MOT-06 = un collège de démonstration avec deux langues, généré sans conflit d’élève ; VSC-02 = une fratrie de trois enfants, et un enfant sans compte visible dans l’emploi du temps de sa classe ; VSC-04 = bulletin d’une classe en un clic, absence qui ne change pas la moyenne ; FIN-01 = reçu jamais modifié (écriture inverse), numérotation sans trou, règle confirmée par un expert-comptable ; ETA-02 = un fichier accepté par Massar, preuve à l’appui, sans donnée réelle dans le dépôt ; UIX-04 dépend d’abord de prouver le rendu arabe des PDF. — [docs/plan/modules/MOT-moteur.md](docs/plan/modules/MOT-moteur.md) ; [docs/plan/modules/VSC-vie-scolaire.md](docs/plan/modules/VSC-vie-scolaire.md) ; [docs/plan/modules/FIN-finance-ecole.md](docs/plan/modules/FIN-finance-ecole.md) ; [docs/plan/modules/ETA-echanges-etat.md](docs/plan/modules/ETA-echanges-etat.md) ; [docs/plan/modules/UIX-interface.md](docs/plan/modules/UIX-interface.md)

### Inferences

- Aucune EP d’étape 3, 4 ou 5 ne peut être présentée comme satisfaite : les fonctions qui les portent (ADM-04, EDT-03, MOT-06, VSC, FIN, ETA, UIX-04, MOB-06, PLA-04) sont « à faire » ou, pour MOT-03, une PR non close.
- EP-9 (étape 1) a du code de déploiement (script de retour arrière) mais EXP-02, EXP-03, EXP-04 et EXP-05 ne sont pas faits sur le nouveau serveur. Le critère d’étape n’est donc pas tenu non plus.

### Gaps

- Aucun parcours n’a été exécuté pour cette note. « CI verte » est un critère du plan, pas un résultat mesuré le 17 novembre.
- Le plan dit que la mesure d’EP-1 « est à faire sur un vrai fichier avant de fixer le seuil ». Le chiffre « moins d’une heure » et « 300 élèves » est donc un objectif, pas un résultat.

## Différenciateurs revendiqués et écarts admis

### Takeaway

Le dépôt revendique un emploi du temps généré et revérifié à chaque enregistrement, Planner comme fournisseur d’identité, et un code sans nom d’école. Il admet ne pas avoir la vie scolaire, les frais, l’arabe, Massar, ni un solveur capable du collège (semaine unique, pas de conflit par élève, examens hors calcul).

### Cited Findings

- [dépôt] Différenciateurs écrits dans le README racine, section « Ce qui distingue Planner » : règles vérifiées à chaque enregistrement (salle, enseignant et groupe jamais en double, hiérarchie comprise, capacité, disponibilités, trajets entre campus, heures maximales) ; forçage par l’administration avec justification tracée ; génération Timefold, semaine type déployée en sautant les dates bloquées, versions réactivables ; « connexion unique » au sens où Planner fournit l’identité à StudyLib, au Quiz et au mobile ; « neutre » : aucun nom d’école dans le code, contrôle de CI, identité en base. — [README.md](README.md)
- [dépôt] Le même README, « Ce qui manque encore pour une école privée » : « élèves sans compte, familles et espace parents, notes et bulletins, frais et caisse, arabe, Massar. Tout cela est planifié, module par module. » — [README.md](README.md)
- [dépôt] Le module VSC ouvre par : « ce qu’une école privée achète d’abord, et que Planner n’a pas encore : élèves et familles ; inscriptions ; absences prévenues aux parents ; notes, bulletins et conseil de classe ; Massar. » Massar a depuis été déplacé vers ETA-02 ; la phrase du module le cite encore dans l’objet. — [docs/plan/modules/VSC-vie-scolaire.md](docs/plan/modules/VSC-vie-scolaire.md)
- [dépôt] FIN : « C’est ce qu’une école privée demande le plus après les notes. » Puis : « Rien pour les frais. » — [docs/plan/modules/FIN-finance-ecole.md](docs/plan/modules/FIN-finance-ecole.md)
- [dépôt] Le comparatif interne du 15 novembre conclut : « Planner ne peut pas aujourd’hui répondre à un directeur qui demande les frais, les bulletins ou Massar. » Il dit aussi ne pas se présenter comme « tout-en-un » avant l’étape 4, et que la largeur (admission, frais, comptabilité, notes, paie, bibliothèque physique, transport) est du côté Odoo + OpenEduCat, la profondeur d’emploi du temps du côté Planner, « mais aucun test comparatif n’existe ». — [docs/etude-marche/07-comparatif-odoo.md](docs/etude-marche/07-comparatif-odoo.md)
- [dépôt] Écarts de solveur admis pour un collège, mêmes F-1, F-4, F-5, F-8 : une semaine type ne couvre pas les semaines A/B ; six séances maximum gênent le primaire ; les options et langues demandent un conflit par élève (MOT-06) ; les examens ne sont pas calculés. Le relevé du 4 novembre dit qu’aucune comparaison publiée CP-SAT / Timefold sur l’emploi du temps n’a été trouvée, et qu’aucune des différences n’a été mesurée sur les données du projet. MOT-04, qui doit faire cet essai, est « à faire ». — [docs/conception/moteur-planification/ecarts-du-solveur.md](docs/conception/moteur-planification/ecarts-du-solveur.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)
- [dépôt] Vente gelée : module MKT « on prépare, on ne publie pas » ; VEN-03 à VEN-09 « gelé ». Le comparatif note un modèle économique encore à l’étude (PR #169, listée ouverte dans le suivi du 15 novembre). — [docs/plan/README.md](docs/plan/README.md) ; [docs/plan/suivi.md](docs/plan/suivi.md) ; [docs/etude-marche/07-comparatif-odoo.md](docs/etude-marche/07-comparatif-odoo.md)

### Inferences

- Les différenciateurs citables sans dépasser le dépôt sont ceux du README racine (contrôle à l’enregistrement, génération versionnée, identité, neutralité du code), avec les limites F-1 à F-8 dans la même phrase.
- « Connexion unique » dans ce README signifie que les autres services font confiance aux jetons de Planner. Ce n’est pas un SSO OIDC/SAML demandé par une école : l’étude de pile dit qu’aucune école n’en a demandé, et que Keycloak est écarté.

### Gaps

- Le README racine n’a pas été recollé au solveur 1.35 ni aux contraintes déclarées de MOT-13. Une partie de « ce qui distingue » (liste des règles vérifiées) date d’avant ce changement. Le détail exact des 12 règles dures n’a pas été recopié depuis le Java.
- Aucun avis d’utilisateur de Planner n’existe dans le comparatif du 15 novembre (« Aucun : aucun client réel »). Rien de plus récent n’a été trouvé dans les fichiers lus.

## Maturité au 17 novembre 2026

### Takeaway

Planner est un produit en construction. Le code de `main` couvre l’emploi du temps et la séance pour une école de type supérieur ; il n’est pas le pack « école privée », et la version en ligne connue du dépôt n’est pas ce `main`. Depuis le comparatif du 15 novembre, le solveur est passé à Timefold 1.35.0, les contraintes déclarées (MOT-13a et le code de MOT-13b) sont dans l’historique, et une base neuve ne reçoit plus les campus d’HESTIM. Familles, frais, Massar, arabe et multi-écoles en service n’ont pas changé de statut : ils restent prévus.

### Cited Findings

- [dépôt] Chantiers ouverts au 15-16 novembre : EXP, PLA, MOT, et, sur `origin/main` seulement, QJE-04 par exception. Étape 0 : EXP-01 est « fait (#172, 15 nov.) » dans le suivi ; le fichier EXP, non modifié par les 35 commits, dit encore « en cours » dans son tableau, tout en décrivant la reconnaissance du 15 novembre. QUA-03, QUA-06, QUA-07 sont « fait ». — [docs/plan/suivi.md](docs/plan/suivi.md) ; [docs/plan/modules/EXP-exploitation.md](docs/plan/modules/EXP-exploitation.md)
- [dépôt] Production, fichier EXP : l’ancien serveur Helsinki a expiré le 31 octobre ; un PC a servi de serveur provisoire ; le nouveau serveur est une machine Debian où n8n tourne déjà ; « /opt/hestim est à main (548c19e) » ; « aucun conteneur Planner » ; « dernière version en ligne connue : maj44 (3e36d46). Les migrations 0056 et suivantes ne sont pas en ligne. » EXP-02 (première installation à côté de n8n) est « en cours » : 02a écrite, 02b à faire. Sauvegardes et supervision sur ce nouveau serveur : « à faire » / « mise en service à faire », alors que les scripts existent. — [docs/plan/modules/EXP-exploitation.md](docs/plan/modules/EXP-exploitation.md)
- [dépôt] `548c19e` est le commit de l’étude de pile du 13 novembre, avant MOT-12 (`ecb94eee`, 15 novembre) et avant les fusions MOT-13. Le checkout serveur décrit par EXP n’est donc pas le `main` du 16 novembre. — [docs/conception/qualite/pile.md](docs/conception/qualite/pile.md) ; [docs/plan/modules/EXP-exploitation.md](docs/plan/modules/EXP-exploitation.md)
- [dépôt] Ce que le comparatif du 15 novembre avait classé « existe » ou « partiel solide », et que les fichiers de module confirment encore : génération sous contraintes, conflits à la saisie, réservations, examens saisis, appel QR, Studio quiz, espace de classe (supports), statistiques de salles citées par le comparatif. Ce qu’il classait « prévu » et qui l’est toujours dans le suivi : VSC-02 à VSC-04, FIN, COM, PAI, ETA / Massar, DOC, INS, rôle parent, arabe UIX-04, plusieurs écoles PLA-01 à PLA-07 (PLA-03a a avancé, voir ci-dessous). — [docs/etude-marche/07-comparatif-odoo.md](docs/etude-marche/07-comparatif-odoo.md) ; [docs/plan/suivi.md](docs/plan/suivi.md)
- [dépôt] Corrections factuelles depuis ce comparatif, lues dans le suivi et le pom, pas dans une réécriture du comparatif (le fichier `07-comparatif-odoo.md` ne change pas entre la copie locale et `origin/main`) :
  1. Le comparatif écrit « Solveur Timefold 1.15 ». MOT-12 est fait : 1.35.0 et Spring Boot 4.1.2. La phrase du comparatif est périmée.
  2. Le comparatif ne mentionne pas les contraintes déclarées. MOT-13a est fusionnée ; le code MOT-13b est dans l’historique (#182) alors que la cellule de suivi dit encore « PR ouverte ».
  3. Le comparatif dit « aujourd’hui, une seule école » et PLA-01 à PLA-07 prévus. C’est toujours vrai pour le service (une base, mode strict éteint, PLA-01 à faire). Nuance : PLA-03a est fusionnée le 15 novembre, une base neuve n’embarque plus les campus d’HESTIM.
  4. « Grande échelle : prévu MOT-02 ». MOT-02 est « en cours ». La mission du 15 novembre 20 h 50, dans le suivi : banc et jeu de 20 000 mesurés, « aucun planning complet en 600 s », « débit médian -13 % en 1.35 », branche `etude/mot-02-mesure-solveur` « non poussée » ; le collège de 600 reste à faire. EP-10 (collège de 600 en moins de 10 minutes) n’est donc pas tranché, et le jeu de 20 000 n’a pas abouti dans la fenêtre de 600 secondes notée.
  5. « Aucun arabe aujourd’hui » : inchangé (UIX-04 à faire). UIX-01a est depuis « fait » sur `origin/main` (navigation FR/EN), ce qui n’ajoute pas l’arabe ni la droite à gauche (UIX-01 toujours « conçu, à coder »).
  6. EXP-01 est passé à « fait » dans le suivi. Cela reconnaît le serveur ; cela ne met pas Planner en ligne (aucun conteneur, maj44 encore la dernière version connue). — [docs/etude-marche/07-comparatif-odoo.md](docs/etude-marche/07-comparatif-odoo.md) ; [docs/plan/suivi.md](docs/plan/suivi.md) ; [solver/pom.xml](solver/pom.xml) ; [docs/plan/modules/PLA-plateforme.md](docs/plan/modules/PLA-plateforme.md)
- [dépôt] Le comparatif se limite lui-même : « Aucun produit essayé. » Planner y est l’état du code et du suivi au 15 novembre. Cette note ne reprend pas ses colonnes Odoo / OpenEduCat. — [docs/etude-marche/07-comparatif-odoo.md](docs/etude-marche/07-comparatif-odoo.md)

### Inferences

- Comparer Planner à un ERP installé, c’est comparer un `main` de développement (solveur 1.35, contraintes déclarées, quiz, appel) et une production décrite comme maj44 sans les migrations 0056+, pas un pack école privée en service.
- Les trois chantiers ouverts (exploitation du nouveau serveur, isolation multi-écoles, moteur) sont en amont de l’étape 4. Le plan place volontairement frais, parents, notes et Massar après.

### Gaps

- `origin/main` n’a pas été rafraîchi le 17 novembre. Dernier commit vu : `bd934ebf`, 16 novembre 2026, 07:31 UTC. Un commit du 16 après-midi ou du 17 manquerait.
- La copie de travail est en retard de 35 commits. Les paragraphes « ce qui existe » des modules autres qu’UIX et QUA sont ceux du disque au 15 novembre au soir. Le diff de ces 35 commits ne touche pas ces fichiers.
- Personne n’a lancé l’application, les tests, ni le serveur pour cette note. L’état « en ligne » repose sur le texte d’EXP (maj44, pas de conteneur Planner sur le nouveau serveur), pas sur une sonde.
- Le fichier EXP et le suivi ne concordent pas sur le mot d’état d’EXP-01 (« en cours » dans le module, « fait » dans le suivi). Le récit de la reconnaissance du 15 novembre est dans les deux. Le mot retenu ici pour la fonction est celui du suivi (« fait »), sans en conclure que l’installation est en service.
