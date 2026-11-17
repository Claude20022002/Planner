# Rapport de l'essai PostgreSQL (Q-30)

| | |
|---|---|
| Plan | [essai-postgresql.md](essai-postgresql.md), validé par le chef le 17 nov. 2026 |
| Branche | `etude/essai-postgresql` (le code de l'essai n'est jamais fusionné ; ce rapport l'est) |
| Fait par | Claude Code (Opus 5.5), le 17 nov. 2026, sur le poste du chef (Docker Desktop) |
| Moteurs | MySQL 8.4.13 et PostgreSQL 18.7, en conteneurs, **données en mémoire** (`tmpfs`, écriture sur disque différée), mêmes réglages pour les deux. Sans cela, rejouer les migrations dépasse les 30 s des tests sur ce poste (constat déjà noté le 15 oct.) |
| **État** | **intermédiaire** : critères 1, 2, 3 et 6 mesurés ; critères 4, 5, 7, 8 et 9 à faire dans une session suivante |

## 1. Résultats à ce jour

| N° | Critère | Résultat | Tenu ? |
|---|---|---|---|
| 1 | Prix de la bascule (suite d'intégration) | voir § 2 : **10 fichiers applicatifs** touchés hors `models/` (seuil 15) ; aucun changement d'API, sauf une heure rendue `13:30:00` au lieu de `13:30` à la création (§ 2.3) | **oui**, avec une réserve (§ 2.3) |
| 2 | Écarts de schéma (modèles contre migrations) | **12 unicités métier** et 1 table (`CompteursDebit`) n'existent que dans les migrations ; **145 index non uniques** de moins (§ 3) | relevé complet : **oui** ; mais il impose de bâtir le schéma PostgreSQL **depuis les migrations**, pas depuis les modèles |
| 3 | Champs propres (5 000 personnes, 30 champs en JSON, sans index) | filtre et tri, 95e centile : MySQL **7,8 ms**, PostgreSQL **6,4 ms** (seuil 50 ms). Import validé de 1 000 lignes : MySQL **67 ms**, PostgreSQL **45 ms** (seuil 2 s) | **oui pour les deux : égalité** |
| 6 | Collations | PostgreSQL par défaut échoue sur les **cinq** comportements dont Planner dépend ; une collation ICU non déterministe les rétablit tous, mais **colonne par colonne** (§ 4) | **oui, avec réserve** : une déclaration sur chaque colonne de texte comparée |
| 4, 5, 7, 8, 9 | migration interrompue, exclusion partielle, mémoire, sauvegarde d'une école, reprise du jeu fictif | — | à mesurer |

## 2. Critère 1 : la suite d'intégration sur les deux moteurs

| Passage | Fichiers verts | Tests verts | Durée |
|---|---|---|---|
| MySQL, référence (`main` + essai, base en mémoire) | 62 / 62 | **612 / 612** | 823 s |
| PostgreSQL, sans rien changer à l'application | 34 / 62 | 470 / 612 | 408 s |
| PostgreSQL, après les corrections du § 2.1 | 50 / 62 | **556 / 612** (551 au dernier passage complet, plus 5 au passage des 14 fichiers restants après la dernière correction) | 435 s |
| MySQL, non-régression après ces corrections | 62 / 62 | **612 / 612** | 849 s |

La durée PostgreSQL n'est pas comparable : sa base est créée depuis les modèles, sans rejouer 62 migrations à chaque fichier.

### 2.1 Ce qu'il a fallu changer dans l'application (10 fichiers hors `models/`)

| Cause | Fichiers | Correction, portable sur les deux moteurs |
|---|---|---|
| Verrou `FOR UPDATE` sur une requête à jointure externe (le modèle `Salle` charge toujours son campus) : refusé par PostgreSQL. Cause de **108 échecs** à elle seule | `services/planning/affectationRules.js`, `services/planning/reservations.js`, `services/generation/timefold/deploiement.js`, `services/moteur/valeurs/versions.js`, `services/studio/tentatives.js` | `lock: { level, of: Modele }` : Sequelize n'écrit `FOR UPDATE OF` que sous PostgreSQL ; le SQL MySQL ne change pas |
| `SUM` d'une expression booléenne | `services/annonces/annonces.js`, `services/studio/directEtat.js` | `SUM(CASE WHEN … THEN 1 ELSE 0 END)` |
| `GET_LOCK` / `RELEASE_LOCK` | `services/taches/periodiques.js` | `pg_try_advisory_xact_lock(hashtext(…))`, libéré à la fin de la transaction |
| `ON DUPLICATE KEY UPDATE … IF()` et nom de table sans guillemets | `middleware/rateLimiterMiddleware.js` | `ON CONFLICT (cle) DO UPDATE … CASE`, table entre guillemets sous PostgreSQL |
| `JSON_CONTAINS` | `services/calendrier/versionPubliee.js` | opérateur `@>` de `jsonb` |
| `performance_schema`, `@@max_connections` | `services/supervision/etat.js` | `pg_stat_activity`, `current_setting('max_connections')` |
| Guillemets obliques dans un `literal` | `controllers/statistiquesController.js` | `fn("COUNT", fn("DISTINCT", col(…)))` |

Dans `models/` : 3 colonnes `TINYINT` passées en `SMALLINT` (`JeuProgression`, `RetourSeance`, `SondageChoix`) et une porte `estPostgres()` ajoutée à `models/acces.js`.

Le décompte touche **11 fichiers** (10 hors `models/`, plus `models/acces.js`), sous le seuil de 15. Il compte aussi `studioQuiz`, dont le verrou avec jointure n'apparaissait qu'une fois les autres causes corrigées. La contre-expertise comptait au moins 9 traits propres à MySQL ; l'essai en a trouvé **8 sortes**, dans 10 fichiers.

### 2.2 Les 12 fichiers de tests encore rouges : ils viennent des tests, pas de l'application

| Cause, dans le test lui-même | Fichiers |
|---|---|
| SQL de MySQL : `INTERVAL 16 MINUTE`, tables sans guillemets, `SET FOREIGN_KEY_CHECKS`, `SLEEP()`, `DATABASE()` | `quizIa`, `journalSecurite`, `usage`, `rateLimiterBase`, `tachesPeriodiques`, `sondages` |
| Le test rejoue une migration écrite pour MySQL (0057, 0059, 0061, 0080, 0081) | `classQuizEteint`, `valeursMoteur`, `plagesReprises`, `baseNeuve` |
| Le test crée une deuxième base avec la syntaxe de MySQL | `contexteEtablissement`, `baseNeuve` |

Vérification faite sur `valeursMoteur` : sans son bloc qui rejoue les migrations, ses **20 tests de l'application passent** sous PostgreSQL. Ces tests seraient à réécrire en cas de bascule (environ 12 fichiers, petites modifications), avec les migrations elles-mêmes.

### 2.3 La seule différence de comportement de l'API

À la création, Sequelize relit la ligne sous PostgreSQL (`RETURNING *`) et renvoie la valeur **normalisée par la base** : une heure saisie `13:30` revient `13:30:00` (`maquette.test.js`, création d'un événement). Sous MySQL, il renvoie la valeur reçue. Correction en cas de bascule : un lecteur sur les colonnes d'heure, qui rend `HH:MM` (taille S). D'autres colonnes normalisées pourraient le montrer aussi (décimaux, dates).

### 2.4 Non-régression MySQL

Avec toutes les corrections du § 2.1, la suite complète reste **verte sur MySQL : 612 tests sur 612**. Les corrections sont donc portables : elles pourraient entrer dans `main` sans bascule, et rendraient une bascule future moins chère.

## 3. Critère 2 : ce que les modèles ne disent pas

La base PostgreSQL de l'essai est tirée des modèles (`sequelize.sync()`). Comparée à la base MySQL construite par les 62 migrations :

- **1 table sans modèle** : `CompteursDebit` (migration 0037, portable telle quelle : l'essai l'a rejouée sur PostgreSQL).
- **12 unicités métier déclarées seulement dans les migrations** : `DevoirsRendus (id_devoir, id_user)`, `EnvoisEdt (id_groupe, mois)`, `JeuxModules (code_jeu, id_cours)`, `JeuxProgressions (id_user, code_jeu, id_defi)`, `JoueursDirect (id_session, id_user)`, `ParticipationsJeu (id_session_jeu, id_user)`, `Presences (id_affectation, appareil)` et `(id_affectation, id_user)`, `QuizResultats (id_quiz_partie, pseudo)`, `ReponsesDirect (id_session, index_question, id_user)`, `Surveillances (id_session, id_user)`, `VersionsParametres (annule_version)`. Sans elles, la règle « une seule réponse par question en direct » tombait sans bruit (`quizDirect`). L'essai les a recréées.
- **Index non uniques** : 149 sous MySQL, 4 sous PostgreSQL. MySQL indexe d'office chaque clé étrangère ; PostgreSQL non, et les index des migrations manquent aussi.

**Conséquences**, valables même si l'on reste sur MySQL :
1. Les modèles ne sont pas la source de vérité du schéma ; les migrations le sont. Une bascule devrait **traduire les migrations** (ou le schéma de départ de PLA-03b), jamais `sync()`.
2. Pour MySQL aussi, c'est un risque : tout outil ou test qui bâtit le schéma depuis les modèles perd ces 12 garanties. À noter pour PLA-03b, qui doit partir des migrations.

## 4. Critère 6 : les collations

Banc `scripts/essais/postgresql/collations.mjs`, noms fictifs.

| Comportement dont Planner dépend | MySQL `0900_ai_ci` | MySQL `unicode_ci` | PostgreSQL par défaut | PostgreSQL ICU non déterministe |
|---|---|---|---|---|
| Connexion par une adresse écrite avec d'autres majuscules (`authController.js`, l. 178, cherche l'adresse telle quelle) | trouvée | trouvée | **refusée** | trouvée |
| Unicité de l'adresse sans tenir compte de la casse | doublon refusé | doublon refusé | **doublon accepté** | doublon refusé |
| Nom cherché sans accent (« elodie » pour « Élodie ») | trouvé | trouvé | **non trouvé** | trouvé |
| Recherche par `LIKE` sans accent | trouvé | trouvé | **non trouvé** | trouvé (PostgreSQL 18) |
| Nom arabe sans voyelles brèves | trouvé | trouvé | **non trouvé** | trouvé |

- Sous PostgreSQL par défaut, une bascule sans précaution **casserait la connexion** de quiconque tape son adresse avec une majuscule, et **laisserait créer deux comptes de même adresse**.
- Une base créée avec une locale ICU insensible à la casse **ne suffit pas** : vérifié, l'égalité reste sensible à la casse. La collation non déterministe doit être déclarée **sur chaque colonne** de texte comparée (identifiants, adresses, noms, codes).

## 5. Ce qu'on peut déjà dire

- **Le coût de bascule mesuré est modéré** : 10 fichiers applicatifs, des corrections simples et portables, aucune réécriture.
- **Mais trois coûts cachés** apparaissent, que le seul compte de fichiers ne montre pas : le schéma doit venir des migrations (§ 3) ; chaque colonne de texte comparée doit recevoir une collation (§ 4) ; une douzaine de fichiers de tests et les 62 migrations sont à traduire.
- **Sur la souplesse des données** (critère 3), les deux moteurs sont à égalité, très loin des seuils : l'exigence du chef se joue bien dans le modèle de données, pas dans le moteur.
- La décision attend les critères 4, 5, 7, 8 et 9, et la règle du plan : basculer seulement si 1, 2, 7, 8 et 9 passent, **et** si 4 ou 5 apporte un gain jugé décisif.

## 6. Constats utiles même sans bascule

| Constat | Proposition |
|---|---|
| 12 unicités et 1 table hors des modèles | les inscrire dans les modèles (correctif S, chantier PLA), pour que modèles et migrations disent la même chose |
| Pièces jointes, fichiers de devoir, logo et médias du Studio en `BLOB` dans la base | confirme R4 : stockage d'objets (BIB-03 et correctif R4) |
| Verrous `FOR UPDATE` qui emportent des jointures inutiles | `lock: { of }` est plus juste sous MySQL aussi : il dit quelle table on verrouille |
| `SUM` d'un booléen, guillemets obliques dans un `literal` | formes portables, sans coût, adoptables tout de suite |
