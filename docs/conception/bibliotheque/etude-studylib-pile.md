# Étude · StudyLib : garder Laravel ou reconstruire la Bibliothèque dans la pile de Planner

| | |
|---|---|
| Date | 21 novembre 2026 |
| Auteur | Claude Code (Opus 5.5), session de VS Code |
| Fiche | [etude-studylib](../../plan/missions/etude-studylib.md) (version du 18 nov., 17 h 30, branche `doc/coordination-equipe`) |
| Branche | `etude/bib-studylib-pile`, depuis `origin/main` (`686ebaf9`) |
| Source lue | `..\StudyLib`, branche `main` (`bb3313b`), sans modification ; Planner sur `origin/main` |
| État | **voie B validée par le chef le 21 nov.** ; les points 2 à 7 du § 5 restent à trancher ; § 3.2 (volumes) attend les chiffres de la commande de comptage |

## En bref

StudyLib est une petite application Laravel : environ 9 750 lignes de PHP, 5 300 de vues et 5 300 de CSS. Elle fait cinq choses, dont **une seule est une bibliothèque** : les documents de cours rangés par filière et par module. Les quatre autres sont les avis de stage, les idées de projet, les événements et les vidéos YouTube. **Aucun prêt de livres** n'existe : aucune table, aucune route (§ 1.4). Le chef a décidé que chaque fonction rejoint son module (Q5) et que les stages vont tous dans STA (Q6). StudyLib ne garderait donc plus que les documents, avec sa propre pile : PHP 8.5, trois conteneurs, Redis et une copie du référentiel.

**Recommandation : la voie B, reconstruire les documents comme un module de Planner, en lots livrables, sans redéployer StudyLib sur le nouveau serveur.** Elle coûte environ **10 jours bruts de plus** que la voie A au départ (§ 2.4). En échange, elle ferme I-4 et I-5 par construction, rend UIX-10f et la part StudyLib d'EXP-09 inutiles, retire cinq conteneurs, et laisse **une seule technologie**, ce que le chef préfère (Q9). Le moment s'y prête : StudyLib ne tourne plus nulle part. Ses données ne vivent que dans les sauvegardes (Q1), et l'application mobile n'est pas publiée (Q3). Aucun service en ligne n'est donc à faire basculer.

## 1. Ce que fait StudyLib, d'après son code

### 1.1 En chiffres

| Mesure | Valeur | Source |
|---|---|---|
| PHP de l'application | 9 750 lignes : 18 contrôleurs (15 + 2 admin + 3 API), 14 modèles, 16 services, 14 dépôts, 16 composants Livewire | `app/` |
| Vues Blade | 5 323 lignes | `resources/views/` |
| CSS | 5 320 lignes en 7 feuilles ; **182 couleurs en dur** (relevé d'UIX-10, § 2) | `resources/css/` |
| Migrations | 26, dont 4 du socle Laravel (utilisateurs, cache, files) | `database/migrations/` |
| Tests | 36 fichiers, environ 179 tests (PHPUnit) | `tests/` |
| Dépendances | Laravel 13.8, Livewire 4.3, `firebase/php-jwt` 7, Flysystem S3 ; Vite 8 et Tailwind 4 | `composer.json`, `package.json` |
| Image | `serversideup/php:8.5-fpm-nginx`, construite en trois étages | `Dockerfile` |

### 1.2 Écrans, par rôle

Rôles : `student`, `teacher` et `admin`, tirés du rôle Planner (`app/Enums/UserRole.php`, `fromPlanner`). Les autres rôles n'ont aucun accès.

| Écran | Route | Étudiant | Enseignant | Admin | Lignes (Livewire + vues) |
|---|---|---|---|---|---|
| Bibliothèque : liste filtrée (Cours, TD, TP, Examens, Exercices, Articles), recherche, « Mes dépôts » | `/documents` | oui | oui | oui | 464 + 818 |
| Détail d'un document : téléchargement par lien signé, note de 1 à 5 | `/documents/{id}` | oui | oui | oui | (dans le précédent) |
| Dépôt : PDF, Word, PowerPoint, 20 Mo au plus ; **modération** pour l'étudiant, publication directe pour l'enseignant et l'admin | `POST /documents` | oui | oui | oui | `StoreDocumentRequest.php`, l. 29 ; `UserRole::publishesWithoutModeration` |
| Accueil : statistiques, vidéos du module | `/dashboard` | oui | renvoyé à Planner (E-9) | oui | 85 + 273 |
| Avis de stage : entreprise, poste, note, photo, consentement | `/internship-reviews` | oui | oui | oui | 287 + 421 |
| Idées de projet, dont trois proposées par l'IA | `/project-ideas` | oui | oui | oui | 277 + 392 |
| Événements | `/events` | oui | non | oui | 292 + 510 |
| Profil : filière, centres d'intérêt, modules suivis | `/profile` | oui | renvoyé à Planner | oui | 112 + 396 |
| Notifications | `/notifications` | oui | renvoyé à Planner | oui | 52 + 63 |
| Modération des documents ; gestion des événements | `/admin/…` | non | non | oui | 313 + 632 |
| Filières et modules (public, sans compte) | `/filieres` | — | — | — | contrôleurs seuls |

Sources : `routes/web.php`, `config/studylib.php` (`nav`, `sauf`), `app/Livewire/*`.

### 1.3 API

- **Application mobile** (`routes/api.php`, l. 20 à 38) : 13 routes. Elles servent les supports d'un module, la liste, la recherche, le détail et le lien de téléchargement des documents, les avis de stage (liste, récents, photo, dépôt), les idées de projet et les événements. Le jeton de Planner arrive en Bearer. Côté Planner, ce sont 11 appels (`mobile/src/api/donnees.js`, l. 62 à 121) et l'onglet `bibliotheque.jsx` (267 lignes).
- **Espace de cours** (l. 44 à 49) : Planner dépose, publie et retire les documents « de classe » avec le jeton de l'enseignant (`backend/services/cours/studylib.js`, 108 lignes).
- **Lien interne** (l. 52 à 54) : Planner obtient le lien d'un document pour un étudiant de la classe, avec un jeton de service d'une minute limité à ce document (`PlannerTokenVerifier::verifyService`).

### 1.4 Ce qui n'existe pas, ou ne sert pas

- **Aucun prêt de livres** : aucune des 26 migrations ne crée d'exemplaire, d'emprunt ou de retour. La correction de la fiche du 18 nov. est **confirmée**.
- **Meilisearch n'est pas utilisé** : Laravel Scout n'est pas installé, et aucun fichier PHP ne l'appelle. La recherche est un `LIKE` en SQL (`app/Repositories/Eloquent/DocumentRepository.php`, l. 198 à 203 et 239 à 241). Le conteneur tourne pourtant en production, avec 256 Mo (`deploy/vps/docker-compose.vps.yml`, l. 148 à 152), et sa clé est passée à StudyLib (`docker-compose.yml`, l. 216 et 217).
- **Code mort de l'ancienne connexion locale** : `LoginForm`, `RegisterForm`, la règle `HestimEmail` et l'intergiciel `EnsureHestimEmail`, qui n'est déclaré nulle part (`bootstrap/app.php`). Depuis la connexion unique, `/login` et `/register` renvoient vers Planner (`routes/auth.php`).
- « Favoris » est affiché désactivé (`config/studylib.php`, `'disabled' => true`).

### 1.5 Services et envois sortants

| Service | Usage | Source |
|---|---|---|
| MySQL, base `studylib` | toutes les tables ; utilisateur propre, sans droit sur Planner | `deploy/mysql-init/10-studylib.sh` |
| Redis | sessions, cache et file de tâches de StudyLib, **et rien d'autre** : Planner ne l'utilise pas | `docker-compose.yml`, l. 202 à 209 |
| MinIO, seau `studylib` | fichiers des documents, photos des avis de stage ; liens signés publiés sur l'adresse des fichiers | l. 210 à 215 ; `config/filesystems.php` |
| API YouTube (Google) | vidéos par module, mises en cache | `app/Services/YouTubeService.php`, l. 42 |
| API Claude (Anthropic) | trois idées de projet. Le modèle par défaut est `claude-3-5-sonnet-latest` (`config/services.php`), et le prompt **nomme l'école pilote** (`ProjectIdeaService.php`, l. 100). Il envoie la filière, le niveau et les centres d'intérêt, sans identité. Demandes gardées 90 jours | `ClaudeService.php` ; `routes/console.php` |
| Google Drive | import des supports par un compte de service (`studylib:import-drive`, 482 lignes) | `app/Console/Commands/ImportDriveDocuments.php` |

### 1.6 Liens avec Planner

1. **Identité** : Planner signe en RS256, et StudyLib vérifie avec le JWKS de Planner, mis en cache 10 minutes (`app/Auth/PlannerTokenVerifier.php`). Le jeton est lu dans le cookie de même origine ou en Bearer. Le compte est créé à la première visite, rattaché par `planner_id` = `sub` (`AuthService::provisionFromPlanner`, l. 48 à 88). C'est le canal **I-4** : `sub` sans école.
2. **Référentiel** : `planner:sync` lit les filières et les modules toutes les 15 minutes, avec un jeton d'intégration unique, par l'adresse interne de Planner (`SyncPlannerReferential.php` ; `routes/console.php`). C'est le canal **I-5** : il lit toujours l'école par défaut.
3. **Espace de cours** : un support de section garde l'identifiant du document StudyLib (`backend/models/SupportCours.js`, `id_document CHAR(36)`). Planner ne garde aucun fichier.
4. **Écrans web** de Planner : `SupportsCours.jsx` et `BibliothequeDialog.jsx`. L'enseignant y épingle un document de la Bibliothèque (lot E-9).

### 1.7 Ce qui n'est pas neutre

Le nom de l'école pilote est écrit en dur dans le prompt de l'IA (`ProjectIdeaService.php`, l. 100), dans l'organisateur par défaut des événements (`EventService.php`, l. 133), dans la filière par défaut des idées (`Livewire/ProjectIdeas/Index.php`, l. 216) et dans l'import Drive (`ImportDriveDocuments.php`, l. 36 et 325). Son domaine de courriel apparaît dans le code mort (§ 1.4). StudyLib échappe à `scripts/verifier-neutre.mjs`, qui ne lit que le dépôt de Planner.

## 2. Les trois voies, chiffrées

Tailles du plan : S = une demi-journée, M = 2 jours, L = 5 jours, XL = plus de 10 jours, **bruts, avant conception** (README du plan, § 2). Les réponses Q5 à Q7 valent pour les trois voies. Les avis de stage et les idées de projet vont à STA, les événements à COM ou aux annonces, l'IA passe par le service d'IA de Planner, et les vidéos restent une option. Ce travail commun est compté à part (§ 2.4).

### 2.1 Voie A · garder StudyLib en Laravel, pour les documents seulement

| Lot | Taille | Remarque |
|---|---|---|
| BIB-01 côté StudyLib : `uid` et boîte d'envoi (D-14, D-15) | M | comme au plan |
| BIB-02 dans Laravel : base et seau par école, `tid` dans le jeton, synchronisation et tâches par école, clés Redis préfixées | **L** | le plan dit M. Mais il faut aussi rendre par école le planificateur, la file, le cache et la synchronisation, qui sont tous uniques aujourd'hui |
| UIX-10f : `charte.css` généré, puis les 182 couleurs en dur | M | plan d'UIX-10, § 9 |
| Neutralité (§ 1.7), code mort retiré | S | |
| EXP-09, la part de StudyLib : mises à jour par la CI | M | aujourd'hui par paquets |
| Retrait de ce qui part dans Planner (stages, idées, événements) | S | |
| **Total** | **environ 12 jours** | |

**Coût permanent.** Deux langages dans la CI, une montée de Laravel par an, une de PHP par an, et trois conteneurs à surveiller (web, file, planificateur), plus Redis. Les sauvegardes et la neutralité se tiennent en double. Personne dans l'équipe ne maintient du PHP (Q4) : seuls les agents d'IA le feraient.

**Risque.** BIB-02 serait la première isolation par école écrite hors de Node. Elle ne reprendrait ni le contexte d'école de PLA-01, ni sa suite d'isolation (PLA-04), et devrait être testée à part.

### 2.2 Voie B · reconstruire les documents comme un module de Planner

| Lot | Taille | Remarque |
|---|---|---|
| B1. Modèle et migrations : documents, notes, téléchargements, avec `uid` | M | filières et modules existent déjà dans Planner : plus de copie ni de synchronisation |
| B2. Stockage de fichiers : client S3 vers MinIO, liens signés, préfixe ou seau par école (Q12) | M | **nouvelle dépendance** (`@aws-sdk/client-s3`) : à accepter par le chef. Elle servira aussi à BIB-03 |
| B3. API : liste, filtres, recherche, dépôt, modération, note, téléchargement | L | règles reprises de StudyLib (§ 1.2) ; poids affiché et reprise après coupure (N3) |
| B4. Écrans web, directement à la charte : Bibliothèque, détail, dépôt, « Mes dépôts », modération | L | UIX-10f devient sans objet |
| B5. Espace de cours : appel au service interne à la place du client HTTP | M | `services/cours/studylib.js` disparaît, et le jeton de service avec lui |
| B6. Mobile : 11 appels redirigés vers l'API de Planner | M | pas de période de compatibilité (Q3) |
| B7. Reprise des données de l'école pilote (§ 3) | M | |
| B8. Import générique de dossier par l'administration (Q11) | M | remplace `studylib:import-drive` |
| **Total** | **environ 22 jours** | BIB-02 se réduit au préfixe par école (dans B2) et à un test d'isolation de plus dans PLA-04 |

**Ce qui disparaît** : l'image StudyLib et ses trois conteneurs, Redis et Meilisearch, soit cinq conteneurs et 896 Mo de limites mémoire (`docker-compose.vps.yml`, l. 106 à 152). Disparaissent aussi la base `studylib` et son script d'initialisation, le jeton d'intégration, l'audience `studylib` et l'audience de service, le JWKS public (s'il ne sert plus à personne), la fausse Bibliothèque des parcours, et la section StudyLib de la sauvegarde. Le seau MinIO reste.

**Risque.** Il faut refaire des écrans qui marchent. Il y a deux parades : reprendre les règles écran par écran (§ 1.2), et réécrire en Node les tests utiles des 179 tests PHPUnit (dépôt, modération, droits, lien signé).

### 2.3 Voie C · reconstruire par morceaux

Ce sont les lots de B, livrés pendant que StudyLib reste en service, en lecture seule à la fin, puis éteinte. Le surcoût est d'environ **3 jours** : un pont de lecture vers StudyLib pendant la bascule (M), et une double exploitation. Cette voie protège un service **en ligne**. Or StudyLib ne tourne nulle part (Q1), et le mobile n'est pas publié (Q3). Il faudrait donc la redéployer pour la seule bascule. **Sans service à protéger, C n'apporte rien de plus que B découpée en lots.**

### 2.4 Comparaison

| | A · garder | B · reconstruire | C · par morceaux |
|---|---|---|---|
| Travail propre à la voie | environ 12 j | environ 22 j | environ 25 j |
| Travail commun (stages et idées → STA, événements, IA par Planner) | environ 6 j (3 × M) | même | même |
| Coût permanent | deux piles, une personne capable de lire le PHP, 5 conteneurs de plus | aucun ajout | comme B après la bascule |
| I-4, I-5 | fermés par BIB-02 dans Laravel | **disparaissent** | disparaissent à l'extinction |
| Une seule technologie (Q9) | non | **oui** | oui, à la fin |
| Bibliothèque de la 2e école à l'étape 3 (Q8) | BIB-01 et BIB-02 avancés | B1 à B4 suffisent | idem B, plus tard |

Ces tailles sont des estimations avant conception, à multiplier par 1,5 à 2 pour du temps réel (README du plan, § 2).

## 3. La reprise des données de l'école pilote

### 3.1 Source

Les sauvegardes, chiffrées par GPG (`deploy/vps/sauvegarder.sh`). La base `studylib` est dans l'export MySQL commun (l. 84 à 90). Les fichiers sont dans l'archive tar du dossier de données de MinIO (l. 99 à 108), qui se restaure dans un MinIO de même version. L'image de MinIO vient d'une reconstruction communautaire (`docker-compose.yml`, l. 308 à 310) : la version de restauration doit rester disponible.

### 3.2 Volumes

**À recevoir.** Le chef lance une commande de comptage en lecture seule sur la dernière sauvegarde (Q2). Elle ne sort que des nombres : comptes par rôle, documents par état et visibilité, taille, avis de stage, idées, objets du seau. La taille de B7 se confirme avec ces chiffres.

### 3.3 Méthode (voies B et C)

1. Restaurer la base `studylib` dans un MySQL jetable, et l'archive dans un MinIO de même version, **hors du dépôt public**.
2. Un script de reprise idempotent fait les correspondances :
   - comptes : `users.planner_id` donne l'identifiant de Planner ;
   - modules : la paire (code de filière, code de module) donne le module de Planner ;
   - documents : l'UUID devient l'`uid` (D-15), pour que les `SupportCours.id_document` existants restent valables sans rien réécrire.
   
   Les fichiers sont copiés sous le préfixe de l'école.
3. Ne sont **pas repris** : sessions, cache, tâches, demandes d'IA (90 jours de conservation), notifications, documents supprimés (`deleted_at`). Les avis de stage partent vers STA, avec leur consentement (`consent_at`). Leur reprise se décide dans le plan de STA.

### 3.4 Vérification

- Les comptes par table sont égaux, à la source et à l'arrivée.
- L'empreinte SHA-256 de chaque fichier est la même avant et après.
- Chaque `SupportCours.id_document` se résout.
- Un échantillon de documents s'ouvre, par rôle.
- Un premier passage se fait sur une copie, et son rapport est montré au chef.

### 3.5 Retour arrière

La sauvegarde source n'est jamais modifiée. La reprise se rejoue par `uid` : en cas d'échec, on vide les tables et le préfixe, puis on recommence. L'image `hestim-studylib` reste publiée pendant une période que fixe le chef. Pendant ce temps, on peut redéployer StudyLib depuis la même sauvegarde.

## 4. Le sort de BIB-01, BIB-02, I-4, I-5, et des fonctions voisines

| Élément | Voie A | Voie B (ou C) |
|---|---|---|
| BIB-01 (`uid`, boîte d'envoi) | dans StudyLib, M | devient une colonne de B1 ; plus de boîte d'envoi entre services pour les documents |
| BIB-02 (bibliothèque par école) | L, dans Laravel | **retirée** : un préfixe par école dans B2, et un test de PLA-04 |
| I-4 (jetons sans école) | fermé par `tid` et BIB-02 | sans objet pour la Bibliothèque ; reste pour l'application mobile, qui passe déjà par Planner |
| I-5 (base et seau communs, référentiel unique) | fermé par BIB-02 | **disparaît** : plus de base, plus de synchronisation |
| BIB-03 (médias du Studio hors de la base) | inchangée | se fait sur le stockage de B2 |
| UIX-10f (charte de StudyLib) | M | **retirée** : B4 est à la charte dès le départ |
| EXP-09 (StudyLib et ClassQuiz par la CI) | garde la part StudyLib | ne garde que ClassQuiz, qui part avec QJE-06 |
| Supports de l'espace de cours (COU) | restent dans StudyLib | sur une installation sans StudyLib, **le dépôt d'un support ne marche pas avant B5** : B1, B2 et B5 sont sur le chemin de l'espace de cours |
| COU-02 (devoirs avec rendu de fichier) | « stockage par StudyLib », dépend de BIB-01 | les rendus vont dans le stockage de B2 ; COU-02 dépend de B2 au lieu de BIB-01 |

## 5. Recommandation, et ce qu'il faut décider avant tout travail

**Voie B, en lots livrables**, dans cet ordre : B1 et B2, puis B3 et B4, puis B5 et B7, puis B6 et B8. Les lots B1 à B4 donnent la Bibliothèque à la deuxième école dès l'étape 3 (Q8).

À décider par le chef, avant tout travail sur la Bibliothèque :

1. **La voie** : A, B ou C. **Tranché le 21 nov. : voie B** (« je valide la voie B », Claude20022002).
2. **Le module et le chantier** : la Bibliothèque reconstruite reste-t-elle BIB, et quand le chantier s'ouvre-t-il ? Au plus trois chantiers sont ouverts : EXP, PLA et ADM aujourd'hui.
3. **La dépendance S3** (`@aws-sdk/client-s3` ou un client plus léger) : c'est une dépendance majeure, qui revient au chef. **Tranché le 21 nov. : `@aws-sdk/client-s3`**, avec `@aws-sdk/s3-request-presigner` pour les liens signés.
4. **Préfixe ou seau par école** dans MinIO (Q12) : à trancher dans le plan de B2, avec la sauvegarde par école (PLA-07).
5. **Ne pas redéployer StudyLib** sur le nouveau serveur, sauf pour la bascule de la voie C. Ce choix touche EXP-02.
6. **Les vidéos YouTube** : reprises ou non (Q7). Elles sont un envoi sortant vers Google (QUA-09).
7. **La durée** pendant laquelle l'image StudyLib reste publiée, comme retour arrière (§ 3.5).

**Sans attendre** (Q10) : retirer Meilisearch de la production, avec un petit correctif dans `deploy/` et un plan court au chef. Il vaut dans les trois voies.

## 6. Ce que disent les études, et EP-18

- **Étude 15** (modules et packs, `etude/ven-modules-packs`) : la Bibliothèque est le module n° 5, « disponible pour une école ; pour chaque école avec BIB-02 (étape 2) ». L'étape diffère du plan (étape 5) et de la réponse Q8 (étape 3) : le coordinateur les aligne dans `decisions.md`.
- **Étude 14** (synthèse des concurrents, #234), R10 et N3 : afficher le poids avant chaque téléchargement, et reprendre après une coupure. C'est un critère de « terminé » des lots B3 et B6. StudyLib n'a ni l'un ni l'autre aujourd'hui.
- **EP-18** : la Bibliothèque sert sans téléphone de l'élève. L'enseignant télécharge et projette ou imprime, et un document se lit sur le poste de l'école. Avec peu de connexion, le poids est affiché et le téléchargement reprend (N3). Le hors ligne de l'application relève de MOB-06.
- **Décision du 18 nov.** : pas de module de bibliothèque de prêts (`decisions.md`, l. 126). Cela confirme qu'il n'y a rien à reprendre de ce côté.

## 7. Questions posées au chef, et réponses (21 nov.)

| N° | Question | Réponse |
|---|---|---|
| 1 | Où sont les données réelles de StudyLib ? | dans les sauvegardes seulement |
| 2 | Comment obtenir les volumes ? | le chef lance une commande de comptage en lecture seule |
| 3 | L'application mobile est-elle publiée sur les magasins ? | non |
| 4 | Quelqu'un maintient-il du PHP et du Laravel ? | personne |
| 5 | Que deviennent les fonctions qui ne sont pas des documents ? | chacune va à son module |
| 6 | Offres et avis de stage rassemblés ? | tout dans STA, dans Planner ; la branche `e/offres-stage` de StudyLib est abandonnée |
| 7 | Vidéos YouTube et idées par l'IA ? | l'IA passe par Planner ; les vidéos sont à trancher |
| 8 | La deuxième école a-t-elle la Bibliothèque dès l'étape 3 ? | oui |
| 9 | Évaluer trois voies ? | oui ; **le chef préfère une seule technologie** |
| 10 | Retirer Meilisearch tout de suite ? | oui, par un correctif à part |
| 11 | L'import Google Drive ? | un import générique, valable pour toute école |
| 12 | MinIO pour tous les fichiers de Planner ? | oui |

## 8. Répartition des lots (validée par le chef le 21 nov.)

Décisions du chef, le 21 nov. :

- **voie B** ;
- **exception hors chantier** pour les lots B1 à B8, sans quatrième chantier ;
- **`@aws-sdk/client-s3`** ;
- les **événements sont mis de côté** : ils ne sont pas repris, restent dans la sauvegarde, et reviennent avec COM ou les annonces ;
- la répartition ci-dessous.

Le coordinateur inscrit les identifiants, réserve les migrations et écrit les fiches de mission. Les identifiants proposés suivent BIB-04. BIB-01 et BIB-02 sont absorbées (§ 4).

| Lots | Identifiant proposé | Agent | Branche proposée | Modèle | Validé par | Après |
|---|---|---|---|---|---|---|
| retrait de Meilisearch (Q10) | EXP, correctif | agent de Cursor | `fix/exp-retirer-meilisearch` | moyen | chef (serveur, plan court) | — |
| B1, B2 : modèle, migrations, stockage S3 | BIB-05 | **session Claude neuve « BIB »** | `feat/bib-05-modele-stockage` | le plus capable (Fable 5.2, sinon Opus 5.5) | chef (migration, dépendance, sécurité des liens) | numéros de migration réservés (0087 et suivants proposés, après les trois de QJE-14) |
| B3 : API des documents | BIB-06 | même session « BIB » | `feat/bib-06-api-documents` | le plus capable | chef (L) | BIB-05 |
| B5 : espace de cours sur le service interne | BIB-07 | même session « BIB » | `feat/bib-07-espace-cours` | le plus capable | coordinateur (M, sans migration) | BIB-06 |
| B7 : reprise des données de l'école pilote | BIB-08 | même session « BIB » | `feat/bib-08-reprise` | le plus capable | chef (données réelles ; lancement par le chef) | BIB-06, volumes du § 3.2 |
| B4 : écrans web, à la charte | BIB-09 | Claude de VS Code (session de la charte) | `feat/bib-09-ecrans` | le plus capable | chef (L) | contrat d'API de BIB-06 écrit et testé |
| B6 : mobile | BIB-10 | Claude de VS Code, **avec UIX-10d** (mêmes fichiers mobiles) | `feat/bib-10-mobile` | le plus capable | coordinateur (M) | BIB-06, UIX-10d |
| avis de stage et idées de projet → STA (Q5, Q6 ; l'IA par le service de Planner) | STA, suite de STA-01 | Alexis et son agent | à fixer avec sa fiche | le plus fort de son éditeur | chef (données, consentement) | EDT-04, #230 |
| B8 : import générique de dossier (Q11) | BIB-11 | Alexis et son agent | `feat/bib-11-import` | le plus fort de son éditeur | coordinateur (M) | BIB-06 |

**Ordre** : le retrait de Meilisearch se fait en parallèle. Ensuite BIB-05, puis BIB-06. Viennent après, en parallèle et chacun dans ses fichiers : BIB-07 (`backend/services/cours/`), BIB-09 (`frontend/src/`) et BIB-10 (`mobile/src/`). Puis BIB-08, puis BIB-11.

**Périmètres d'écriture** :

- La session « BIB » écrit dans `backend/` : un dossier `services/bibliotheque/`, ses routes, contrôleurs, modèles et migrations, et `services/cours/` pour BIB-07.
- Claude de VS Code écrit dans `frontend/src/` et `mobile/src/`.
- Alexis écrit dans les fichiers de STA, et dans l'import de BIB-11, qui se range sous `services/bibliotheque/import/`.
- Personne ne modifie `docs/plan/suivi.md`.

**Critères communs** : N3 (poids affiché, reprise après coupure) pour BIB-06, BIB-09 et BIB-10. Un test d'isolation à deux écoles pour BIB-05 et BIB-06 (PLA-04). Le contrat d'API d'abord (README du plan, § 5).

### Prompt de la session Claude neuve « BIB » (à coller par le chef)

```text
Tu es la session « BIB » de Planner : la Bibliothèque reconstruite dans la pile de Planner (voie B, validée par le chef le 21 nov.).
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md (branche doc/coordination-equipe), puis l'étude
docs/conception/bibliotheque/etude-studylib-pile.md (branche etude/bib-studylib-pile, ou main après sa fusion), § 1 à 8.
Tes lots, dans l'ordre : BIB-05 (modèle, migrations, stockage S3 avec @aws-sdk/client-s3), BIB-06 (API), BIB-07 (espace de cours),
BIB-08 (reprise des données, après les volumes). Une branche par lot, depuis origin/main, dans ..\travaux-planner\<nom>.
Avant tout code : questions numérotées au chef, puis plan de conception (docs/plan/modeles/conception.md) dans docs/conception/bibliotheque/,
avec les sections « Ce que disent les études » et EP-18, validé par le chef. Numéros de migration : les demander au coordinateur.
Lis ..\StudyLib sans le modifier, pour reprendre ses règles (dépôt, modération, liens signés, droits).
Règles : rien de réel dans le dépôt ; git add <fichiers> ; suivi.md non modifié ; fiche de session en fin de session ; jamais de git push.
```
