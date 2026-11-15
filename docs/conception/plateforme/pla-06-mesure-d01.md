# PLA-06 · Mesure de D-01 (une base par école) — conception

| | |
|---|---|
| Module | [PLA](../../plan/modules/PLA-plateforme.md) · chantier ouvert le 9 novembre 2026, ordre validé le 10 |
| Branche | `etude/pla-06-mesure-d01` (une étude : rien de ce code ne part en production) |
| Rédigé par | Claude Code (Opus 5.5), le 2026-11-10 ; revu le même jour (§ 12) |
| **Validation** | Plan initial validé par Claude20022002 le 2026-11-10. **Amendement du 2026-11-15 (§ 4) à revalider ; aucune série autorisée avant le nouveau « validé ».** |

**Lecture au 15 novembre :** le § 4 amendé remplace les dispositions de répartition entre machines des § 1, 3, 7 à 10 et de la revue historique (§ 12). P-22, P-23 et P-25 sont sans objet ; P-24 est remplacée. Les étapes 1 à 5 sont réalisées dans leur version initiale, sans valoir adaptation au serveur unique. Les consignes du README actuel sur les deux postes ne sont pas applicables au nouveau protocole. Les seuils S1 à S5 restent inchangés.

## 1. Objet et critère de « terminé »

D-01 dit : **une base MySQL par école**, chacune avec son utilisateur, sur une installation partagée. La cible compte beaucoup de petites écoles. Il faut savoir si un serveur tient **200 écoles**, et **avec combien de mémoire**, avant de construire PLA-01 à PLA-05 sur cette décision.

**Terminé** quand le rapport `docs/conception/plateforme/19-mesure-d01.md` :
- donne les chiffres des mesures M1 à M8 (§ 4.3), avec la machine et les réglages utilisés ;
- confronte chaque chiffre à son seuil (§ 4.4) ;
- dit **la mémoire et le nombre de processeurs nécessaires** pour 200 écoles, et si le nouveau serveur les a ;
- conclut **D-01 confirmée** ou **D-01 rouverte**, ce que le chef inscrit dans [decisions.md](../../plan/decisions.md) ;
- donne les réglages à reprendre dans EXP-02 et PLA-01 : pools, `max_connections`, `table_open_cache`, `open_files_limit`, mémoire de MySQL ;
- liste ce que la mesure a révélé pour PLA-01 et PLA-02 (tâches périodiques, limiteurs, démarrage) ;
- dit **sur quelles machines** chaque chiffre a été mesuré. Les machines du 10 novembre sont **provisoires** (P-24) : les chiffres sont marqués « provisoires », et une série de confirmation est refaite sur la machine définitive quand elle existe.

Si D-01 tombe, le chantier PLA s'arrête jusqu'à la décision du chef (P-10).

## 2. Ce qui existe (vérifié dans le code le 10 novembre)

- **Connexion unique** : `backend/config/db.js`, un `Sequelize` sans réglage de pool (5 connexions au plus par défaut).
- **Essai du contexte d'école** (#142, **fusionné le 10 novembre**) :
  - `contexte/etablissement.js` et `contexte/resolveur.js` ;
  - `middleware/etablissementMiddleware.js`, qui choisit l'école par le nom d'hôte ;
  - `migrations/migrator.js`, avec `migrateurPour(connexion)` ;
  - `tests/integration/helpers/fabriqueEtablissement.js`, qui clone les 78 modèles pour une autre base (outil de test). Mesuré pour deux écoles seulement.
- **23 fichiers utilisent encore la connexion par défaut** (exceptions de la règle R-2). Une écriture d'une autre école y part dans la base par défaut, sans erreur (17-essai, § 17.3).
- **Le parcours mesuré est sûr.** La connexion et `GET /api/emplois-du-temps/moi` (`services/planning/monEmploiDuTemps.js`, `emploiDuTempsController.js`) ne passent que par les modèles de l'école courante : aucun des 23 fichiers n'est sur ce chemin.
- **L'étudiant ne voit rien d'un mois jamais publié** (`services/calendrier/versionPubliee.js`). Une publication est un `EnvoiEdt` par classe et par mois, avec **une copie en JSON des séances**. Le script `deploy/vps/marquer-edt-publie.mjs` crée ces copies au vrai format, sans notification ni courriel. Les séances sont dans la table `Affectations`.
- **Limiteurs** (`middleware/rateLimiterMiddleware.js`, fenêtres de 15 minutes) :
  - limite de l'API : clé `user:<id>`, en mémoire, 500 requêtes par défaut, réglable par `RATE_LIMIT_API_MAX`. **Les numéros de compte se répètent d'une école à l'autre**, donc les compteurs seraient partagés entre écoles ;
  - trois limites de connexion écrites en dur : 20 et 30 tentatives par adresse, 10 par compte. Ces compteurs sont gardés en base. `trust proxy` vaut 1 (`TRUST_PROXY_HOPS`).
- **Tâches périodiques** (`server.js`) :
  - séances réalisées et désactivations, chaque heure ;
  - purges, chaque jour ;
  - renvoi de l'emploi du temps, chaque soir ;
  - **rappel d'appel, chaque minute** (`services/presences/rappelAppel.js`).
  - Avec 200 écoles, une tâche de chaque minute interroge les 200 bases, et **réveille tous les pools**.
- **Démarrage** : les migrations de la base unique s'appliquent avant d'écouter. **62 migrations, 78 modèles.**
- **Données** : `backend/seed.js` crée l'école de démonstration (environ 680 étudiants, une quinzaine de groupes, des enseignements), **sans aucune séance** : les séances viennent de la génération.
- **MySQL de l'ancien serveur** (`deploy/vps/mysql.cnf`) : mémoire tampon de 128 Mo, `max_connections = 60`, `table_open_cache = 400`, conteneur de 512 Mo.
- **Les autres services de Planner ont 3,2 Go de limites** (`deploy/vps/docker-compose.vps.yml`) : solveur 640 Mo, StudyLib 544 Mo, ClassQuiz 1,2 Go, MinIO, Meilisearch, Redis, Caddy, site. Sans ClassQuiz, il reste 2,0 Go. Ce sont des plafonds : l'ancien serveur faisait tourner tout Planner, plus une autre application, dans 3,7 Go.
- **Le nouveau serveur** (P-4, relevé le 10 novembre ; ni nom ni adresse ici, le dépôt est public) :

  | Élément | Valeur |
  |---|---|
  | Processeurs | 4 cœurs virtuels (Intel Haswell), 1 fil par cœur |
  | Mémoire | 7,6 Gio ; **aucune mémoire d'échange** (swap) |
  | Disque | 74 Go, 32 Go libres (ext4) ; annoncé rotatif, peut-être un disque virtuel |
  | Docker | 29.4.3, Compose v5.1.3, cgroup v2 |
  | Fichiers ouverts dans un conteneur | 1 024 (souple), 524 288 (maximum) |
  | Déjà en service, sans limite de mémoire | n8n 367 Mio, sa base PostgreSQL 49 Mio, Qdrant 96 Mio, Traefik 66 Mio (le proxy de l'hôte), **Ollama 4,7 Gio** |

  Avec un modèle chargé dans Ollama, il reste **environ 2,3 Gio** pour Planner. Sans modèle chargé, il en reste environ 7 Gio. Ollama calcule aussi sur les mêmes 4 cœurs : pendant une réponse d'Ollama, Planner manquerait de processeur (C-22, C-23).

## 3. Questions et réponses

| N° | Question | Proposition | Réponse du chef |
|---|---|---|---|
| P-3 | Où mesurer ? | en local, MySQL limité ; courte vérification sur le serveur pendant EXP-02 | validé le 10 nov., **précisé le 10 nov. : le banc (MySQL et serveur) sur le PC Ubuntu, la charge depuis le PC Windows**, par le réseau local |
| P-4 | Caractéristiques du nouveau serveur, et du poste de mesure (P-3) | commandes de lecture seule | **serveur : relevé le 10 nov.** (§ 2) ; **poste : attendu** (les commandes ont tourné sur le serveur) |
| **P-19** | Ollama doit-il rester sur ce serveur, avec un modèle chargé en permanence (4,7 Gio) ? | à décider avec ses chiffres exacts | **tranchée le 11 nov. : Ollama est retiré du serveur** ; Planner dispose d'environ 7 Gio |
| **P-20** | Ajouter une mémoire d'échange (swap) de 2 à 4 Go sur le serveur ? | oui, dans EXP-02 : sans elle, un pic de mémoire fait tuer un conteneur au hasard (n8n compris) | |
| **P-21** | n8n a-t-il des traitements lourds, à quelles heures ? | à dire par le chef ; la mesure prend le pic, pas la moyenne | |
| P-4 bis | Deux enveloppes, 4 et 8 Go | **remplacée par C-1** (§ 12) | validée le 10 nov., puis remplacée |
| P-5 | 200 bases, chacune avec une école fictive | oui | validé le 10 nov. |
| P-5 bis, ter | Base modèle tirée de `seed.js` ; séances recopiées par SQL | validé le 10 nov. ; **précisé par C-5 et C-6** | validé |
| P-6 | Seuils | **S1 corrigé par C-1** | validé le 10 nov. (S2 à S5) |
| P-7, P-8, P-9, P-10 | Activité, pools, réglages MySQL, livrables | **P-7 précisé par C-13, P-8 mis en doute par C-2** | validé le 10 nov. |
| P-11 à P-14 | Les deux démarrages ; pas de dépendance ; MySQL temporaire sur le serveur ; attendre les fusions | oui | validé le 10 nov. |
| **P-15** | S1 calculé sur le besoin réel : Node + MySQL + autres services + 20 % de marge ≤ mémoire du serveur moins le pic de n8n (C-1) | oui | validé le 10 nov. |
| **P-16** | Garder les ~680 étudiants du seed, soit le double de la cible, plutôt que d'en supprimer, ce qui casse des clés étrangères (C-6) | oui : si D-01 tient avec 680, elle tient avec 300 | validé le 10 nov. |
| **P-17** | Rythme de l'activité : 50 utilisateurs par école active, une consultation toutes les 30 s (environ 33 requêtes par seconde), puis une rampe jusqu'à ce que le p95 dépasse 1 s (C-13) | oui | validé le 10 nov. |
| **P-18** | Les tâches périodiques tournent pendant la mesure, sur les 200 écoles (C-2) | oui | validé le 10 nov. |
| **P-22** | Piloter une série depuis le PC Windows : `serie.mjs` y tourne, lance `charge.mjs` sur place, et commande le PC Ubuntu par SSH (clé, pas de mot de passe) | oui ; sinon le chef lance les deux moitiés à la main, à l'heure dite | |
| **P-23** | Le PC Ubuntu : processeurs, mémoire, disque, Docker, Node 22, même réseau local que le PC Windows, allumé pendant les séries (environ 8 h) | doit offrir au moins 4 cœurs et 8 Go, pour imiter le serveur | **4 Go de mémoire, 1 To de disque** (10 nov.) : moins que les 8 Go voulus ; processeurs, Docker, Node, réseau et SSH encore à relever |
| **P-24** | Avec 4 Go, comment répartir la mesure ? | **mixte** : le PC Ubuntu fait les paliers MySQL de 1 et 2 Go ; le palier de 4 Go se fait sur le PC Windows seulement si celui de 2 Go échoue | **validé le 10 nov., comme solution provisoire** (C-26) |

## 4. Solution

### 4.1 Principe amendé le 15 novembre — à revalider

**Décision du chef du 15 novembre : seul le serveur sert de machine.** MySQL, le serveur de banc, le générateur de charge, le pilote et les relevés tournent sur cet hôte partagé avec n8n. Aucun PC Ubuntu ou Windows ne participe. Le chef lance chaque commande sur le serveur ; l'agent les prépare et lit les retours expurgés.

La fiche de mission a été lue sur `origin/chore/coordination-agents` (PR #175), car elle est encore absente d'`origin/main` lors de cette session. Référence : `docs/plan/missions/pla-06.md` dans cette branche.

#### Isolation et enveloppe proposée

- Projet Compose distinct : `planner-mesure-pla06`. Un dossier de travail distinct de l'installation Planner, un réseau Docker propre au banc et un volume propre aux 200 bases ; aucun réseau, volume ou label de routage partagé avec n8n. Labels `traefik.enable=false` sur les services du banc pour empêcher leur publication par le proxy existant.
- **Aucun port public.** MySQL reste interne au réseau du banc ; le port HTTP du banc est publié sur la boucle locale seulement. Aucun changement du pare-feu, du proxy, du Compose n8n ou de Docker Engine. Les adresses et chemins réels restent dans `.local/`, jamais dans Git.
- L'école 001 est l'école par défaut : 200 bases au total. Les données, secrets et résultats bruts restent hors Git. Les principes de préparation, d'isolation par utilisateur MySQL et de contrôle des réglages MySQL ne changent pas.
- La recette [serveur-2026-11.md](../../recette/serveur-2026-11.md) relève 7,6 Gio de RAM, 4 processeurs, aucune mémoire d'échange et environ 6,5 Gio disponibles après retrait d'Ollama. Ces chiffres datés ne remplacent pas un relevé avant chaque série. Ollama reste retiré ; aucun profil `cpu` n'est relancé.

Le chef a accepté le 15 novembre **d'inscrire les propositions suivantes à revalider**, sans autoriser de lancement :

| Poste | Limite mémoire proposée | Limite processeur proposée |
|---|---|---|
| MySQL | paliers de 1 puis 2 Gio ; tampon InnoDB de 512 Mio puis 1 Gio | part de l'enveloppe commune à préciser avant lancement |
| Serveur de banc Node | 1 Gio | part de l'enveloppe commune à préciser avant lancement |
| Pilote, générateur de charge et relevés ensemble | 512 Mio | part de l'enveloppe commune à préciser avant lancement |
| Ensemble de la mesure | **3,5 Gio au maximum**, préparation et installation comprises | **2,5 processeurs au maximum, cumulés** |

Les conteneurs ne disposent pas de mémoire d'échange. Le pilote, la charge et les relevés sur l'hôte doivent également être bornés par un groupe de contrôle ; les plafonds Compose seuls ne suffisent pas. Le découpage exact des 2,5 processeurs et le mécanisme du groupe de contrôle seront proposés avant leur mise en œuvre. Aucun processus de préparation ou d'installation ne doit échapper à l'enveloppe. Ni limitation ni modification des services existants.

**Le palier MySQL de 4 Gio est suspendu** : il ne tient pas dans cette enveloppe avec les autres postes. Si 2 Gio échouent, le rapport le dit ; toute nouvelle enveloppe exige une nouvelle validation. S1 garde la place des autres services de Planner même s'ils ne tournent pas encore : leur absence du banc ne constitue pas un gain de capacité pour conclure D-01.

#### Ordre avec EXP-02b et protection de n8n

1. Proposition acceptée pour inscription : mesurer **avant EXP-02b**, donc avant que Planner tourne sur le serveur. Le chef confirme le créneau et l'absence de Planner. Si EXP-02b a déjà avancé, arrêt : convenir d'une fenêtre avec le chef avant toute série.
2. Avant la préparation, puis avant et après **chaque** série : photo locale des identifiants, heures de démarrage, état, redémarrages et indicateurs OOM de tous les conteneurs existants (n8n, sa base, proxy et Qdrant), selon EXP-01. Les identifiants et heures de démarrage doivent rester inchangés. Les photos brutes restent dans `.local/` ou `resultats/` ; seul le verdict sans identifiants est reporté au dépôt.
3. Le chef fournit un traitement témoin n8n et un créneau où ses traitements lourds sont connus (P-21). Il vérifie manuellement la réactivité et ce témoin avant, pendant et après chaque série. Si aucun contrôle représentatif n'est disponible, ne pas démarrer. La photo des conteneurs seule ne prouve pas l'absence de ralentissement.
4. **Arrêt immédiat de la charge et du banc si n8n ralentit**, si le témoin échoue, si un service existant redémarre ou change d'état, si un OOM apparaît, ou si `MemAvailable` passe sous **1 Gio**. Le chef arrête uniquement le projet de mesure, jamais les services existants. Le garde mémoire et son arrêt doivent être éprouvés avant toute série ; les relevés actuels ne les automatisent pas.
5. Après un arrêt : série invalidée, photo après arrêt et contrôle de n8n. Pas de relance automatique. Le chef décide de la suite ; aucune hausse de limite pour forcer un résultat.
6. À la fin de la fenêtre, nettoyage limité au projet de mesure : arrêt des processus du banc, suppression de ses conteneurs, de son réseau et du volume des 200 bases, puis suppression ciblée des secrets et données temporaires. Conserver les résultats bruts hors Git jusqu'à exploitation. Vérifier la disparition des ressources du projet et refaire la photo des services existants. Aucun `prune` global ni nettoyage de ressources n8n.

#### Validité et adaptation du banc après validation

La charge partage désormais les ressources de MySQL et Node. Le rapport doit donner ses limites et sa consommation à part, les pics des services existants et l'effet de cette cohabitation. La latence à vide est celle de la boucle locale, pas celle d'un utilisateur distant. Les chiffres de Docker Desktop du 10 novembre restent des essais de fonctionnement ; ils ne confirment pas la capacité du serveur.

Les règles de chauffe, de répétition, d'isolation, d'erreurs 401/429, d'échange mémoire et de saturation du générateur restent applicables (§ 8, C-29). La saturation du serveur pendant la rampe reste un résultat de capacité ; elle déclenche cependant l'arrêt si n8n ralentit. Une série interrompue pour protéger n8n ne permet pas de confirmer D-01.

**Après le « validé », avant toute série, adapter et vérifier uniquement le banc :**

- Compose : réseau et volume distincts vérifiés, pas de port MySQL publié, HTTP sur boucle locale, exclusion Traefik, plafonds de chaque processus, préparation et installation incluses.
- `serie.mjs` : mode sur l'hôte local, sans SSH ni copie SCP sur lui-même ; garde mémoire, arrêt sur incident et journal d'invalidation. Aujourd'hui, l'absence de `banc.ssh` signifie commande manuelle sur une autre machine : ce n'est pas encore ce mode local.
- Relevés : mémoire du groupe complet, consommation du générateur et des services existants, contrôle des photos et invalidation en cas de garde déclenchée. Aucun résultat déclaré valide si les relevés nécessaires manquent.
- README : remplacer le protocole à deux machines par des commandes serveur, une à une, à exécuter par le chef ; préparation, surveillance, arrêt d'urgence et nettoyage ciblé compris.
- Vérifications : tests de régression des adaptations ; essai des gardes sans charge réelle ; petite série d'essai seulement après validation et retour des prérequis, puis séries M1 à M8.

Ces adaptations ne sont pas encore écrites. Les tests purs existants vérifient les fonctions de calcul du banc, pas les protections n8n ni l'exécution sur un hôte unique. Ne pas utiliser les commandes de séries de l'ancien README en attendant.

#### Questions avant lancement

| N° | Question | Proposition / réponse du 15 novembre | État |
|---|---|---|---|
| A-1 | Enveloppe et garde mémoire | MySQL 2 Gio, Node 1 Gio, charge et relevés 512 Mio ; total CPU 2,5 ; arrêt sous 1 Gio disponible ; palier 4 Gio suspendu | inscription acceptée, amendement à revalider |
| A-2 | Ordre et témoin n8n | avant EXP-02b ; contrôle manuel avant, pendant, après | inscription acceptée ; créneau et témoin à fournir par le chef |
| A-3 | Répartition des 2,5 processeurs et groupe de contrôle des processus hôte | présenter les commandes et limites détaillées après validation du principe, avant lancement | à préciser et faire approuver ; aucun réglage supposé |
| P-20 | Mémoire d'échange du serveur | absente dans la recette du 15 novembre ; relever à nouveau, sans en ajouter dans PLA-06 | constat à confirmer par le chef |
| P-21 | Pics et traitements lourds n8n | obtenir leur créneau et le contrôle représentatif avant de mesurer | attendu du chef |

#### Premières commandes à préparer pour le chef — lecture seule

À exécuter une par une, sur le serveur, par le chef. Elles ne lancent aucune série. L'agent ne les exécute pas. Aucun retour brut contenant des identifiants ou informations d'accès n'entre dans Git.

```bash
free -h
```

```bash
swapon --show
```

```bash
nproc
```

```bash
df -h / /var/lib/docker
```

```bash
node --version
```

```bash
docker compose version
```

Photo des services existants, avant toute création du projet (conserver localement, hors Git) :

```bash
docker inspect --format '{{.Id}} {{.State.StartedAt}} {{.State.Status}} {{.RestartCount}} {{.State.OOMKilled}}' $(docker ps -aq)
```

```bash
docker stats --no-stream --format '{{.ID}} {{.CPUPerc}} {{.MemUsage}}'
```

Pour comparer avant/après, le chef conserve hors Git la liste initiale des identifiants et inspecte exactement cette liste après chaque série. Les commandes de lancement et d'arrêt seront préparées une à une après validation du plan et adaptation des gardes ; ne pas réutiliser le pilote SSH actuel.

### 4.2 Une série (sur le serveur, après revalidation et adaptation)

```mermaid
sequenceDiagram
    participant Chef as Chef de projet
    participant O as serie.mjs
    participant M as MySQL (limité)
    participant S as serveur-banc (limité)
    participant C as charge.mjs
    Chef->>O: lancement manuel du pilote local adapté, limites validées
    Note over Chef,O: photo avant, contrôle n8n et gardes actifs
    O->>M: redémarrage du banc isolé avec les limites validées
    O->>S: démarrage, 200 écoles, mode a puis b (M4)
    O->>C: connexions étalées sur 2 min, puis 2 min de chauffe (non comptées)
    C->>S: 20 écoles actives, 10 min (M6) ; tâches périodiques en route (M8)
    Note over O,M: relevés toutes les 5 s (M1, M2, M3, M7)
    O->>C: rampe jusqu'à p95 > 1 s (capacité)
    O->>O: 15 min sans activité : les pools se ferment-ils ? (M3, M8)
    Note over Chef,O: photo après ; arrêt immédiat si n8n ralentit
```

### 4.3 Les mesures

| N° | Mesure | Comment |
|---|---|---|
| M1 | Mémoire du serveur Node | `process.memoryUsage()` avec 1, 10, 50, 100 et 200 écoles chargées, au repos puis sous charge ; après libération des écoles endormies |
| M2 | Mémoire de MySQL | mémoire du conteneur (`memory.current` moins le cache de fichiers inactif, méthode écrite dans le rapport), au repos et sous charge ; `performance_schema` éteint, comme en production |
| M3 | Connexions | `Threads_connected`, `Max_used_connections`, refus `Too many connections` ; fermeture des pools après 10 min sans requête (P-8) |
| M4 | Démarrage | (a) vérification des migrations des 200 bases avant d'écouter ; (b) ouverture d'une base à sa première requête ; (c) **temps de la première requête d'une école endormie** |
| M5 | Migrations | (a) une base neuve, 62 migrations ; (b) une **migration d'étude** appliquée aux 200 bases, une à une puis 4 à la fois (C-7) |
| M6 | Temps de réponse | p50, p95, p99 et erreurs, à part pour la connexion et pour `/moi` ; capacité (requêtes par seconde quand le p95 atteint 1 s) |
| M7 | Disque et tables | taille des 200 bases, fichiers `.ibd`, `Opened_tables`, `Table_open_cache_misses`, `open_files_limit` atteint ou non |
| M8 | Tâches périodiques | durée d'un passage de chaque tâche sur 200 écoles ; connexions qu'elles ouvrent ; si le rappel de chaque minute empêche les pools de dormir |

### 4.4 Seuils

| Seuil | Mesure | Valeur |
|---|---|---|
| S1 (C-1, P-15) | M1 + M2 sous charge | besoin de Node et de MySQL + autres services (3,2 Go ; 2,0 Go sans ClassQuiz) + 20 % ≤ 7,6 Gio moins le pic de n8n, Qdrant et Traefik (Ollama retiré, P-19) |
| S2 | M4 | première réponse en moins de **60 s** |
| S3 | M5b | migration d'étude sur 200 bases en moins de **30 min** |
| S4 | M6 | p95 en moins de **1 s** au rythme de P-17 ; aucune erreur (réponse 5xx, refus de connexion ou délai de plus de 10 s) |
| S5 | M3, M8 | aucun refus de connexion, tâches périodiques comprises |

**Décision du 11 novembre (P-19) : Ollama est retiré du serveur.** S1 se conclut donc pour une mémoire de 7,6 Gio, moins le pic de n8n, Qdrant et Traefik (environ 0,6 Gio au repos le 10 novembre).

D-01 est **confirmée** si S1 à S5 tiennent avec un réglage MySQL au moins. Sinon, le rapport dit quel seuil cède, de combien, et ce qui le corrigerait. Il présente les options sans choisir : la décision revient au chef.

## 5. Fichiers créés ou modifiés

| Fichier | Rôle | Taille visée |
|---|---|---|
| `scripts/mesures/pla-06/README.md` | lancer, nettoyer, prérequis (place disque, mémoire libre) | 80 lignes |
| `scripts/mesures/pla-06/docker-compose.mesure.yml` | MySQL 8.4.13 et serveur de banc limités, `ulimits`, volume nommé, port local | 60 |
| `scripts/mesures/pla-06/mysql/{defaut,production,ajuste}.cnf` | les trois réglages | 15 chacun |
| `scripts/mesures/pla-06/preparer.mjs` | base modèle, export, 200 copies et utilisateurs, secrets locaux, contrôles, M5a, M7 | 200 |
| `scripts/mesures/pla-06/sql/seances-synthetiques.sql` | une semaine de séances à partir des enseignements du seed, recopiée sur 36 semaines | 120 |
| `scripts/mesures/pla-06/migrations-etude/9001-etude.js` | migration d'étude (colonne et index sur `Affectations`, nouvelle table), hors de `backend/migrations` | 40 |
| `scripts/mesures/pla-06/serveur-banc.mjs` | `app.js`, contexte d'école, écoles chargées tout de suite ou à la demande, tâches périodiques sur toutes les écoles, route de contrôle du banc | 200 |
| `scripts/mesures/pla-06/charge.mjs` | utilisateurs virtuels (`node:http`, `Host`, `X-Forwarded-For`), rythme, rampe | 180 |
| `scripts/mesures/pla-06/releves.mjs` | M1, M2, M3, M7, M8 toutes les 5 s | 150 |
| `scripts/mesures/pla-06/serie.mjs` | enchaîne une série et refuse un résultat si l'hôte dépasse 90 % de processeur | 120 |
| `.gitignore` | `scripts/mesures/**/{resultats,.local}/`, exports `*.sql.gz` | 2 |
| `docs/conception/plateforme/19-mesure-d01.md` | le rapport | 220 |
| `docs/plan/suivi.md`, `modules/PLA-plateforme.md` | état, ce qui existe | — |

Les résultats bruts restent hors du dépôt. Seuls leurs résumés chiffrés vont dans le rapport.

**Écarts d'écriture du 10 novembre**, sans changement de principe (le rôle de chaque pièce est le même) :
- **pas d'export `mysqldump`** : les 200 bases sont copiées dans MySQL même (`SHOW CREATE TABLE`, puis `INSERT … SELECT`). Les index et les clés étrangères sont gardés, et aucun fichier d'export n'existe ;
- **les séances synthétiques** viennent d'une fonction pure et testée (`lib/seances.mjs`), pas d'un fichier SQL ;
- **les mots de passe des écoles** sont dérivés d'un secret maître (HMAC) : rien à stocker par école ;
- **découpage** : `lib/config.mjs`, `lib/stats.mjs`, `lib/seances.mjs`, `lib/bases.mjs`, `lib/ecoles.mjs`, `lib/taches.mjs`, `lib/http.mjs` ; tests dans `tests/pur.test.mjs` ; migration d'étude en `.mjs`.

## 6. Données

- **Aucune migration de Planner**, aucune table changée. La migration d'étude ne vit que dans le banc.
- **Base modèle** :
  - les 62 migrations et `seed.js` ;
  - des **séances synthétiques** par SQL : environ 30 h par groupe et par semaine sur 36 semaines, soit à peu près 17 000 séances ;
  - **les mois publiés**, par le script existant `deploy/vps/marquer-edt-publie.mjs` (`MOIS_DEBUT` = premier mois des séances), lancé dans le conteneur du banc. Il ne change rien dans `deploy/`.
- **200 copies** dans un volume Docker de mesure (`planner_mesure_pla06`), effacé à la fin.
- **Hors du dépôt** : les données de démonstration (vocabulaire d'HESTIM) ne quittent pas la machine ; aucun export, résultat brut ni secret n'est commité.

## 7. Sécurité, isolation et exigences produit

- **Un utilisateur MySQL par base** (D-01). Le banc vérifie, pour 5 écoles tirées au hasard, qu'il ne peut pas lire une autre base.
- **Isolation du parcours mesuré**, vérifiée de deux façons :
  - avant chaque série, 20 requêtes à 20 écoles renvoient chacune le nom de **sa** base ;
  - une série de diagnostic à part (`general_log` allumé, jamais pendant une mesure) vérifie que les requêtes de l'école N ne touchent que la base N, pour les écritures des limiteurs comme pour les lectures.
- **Réseau local** : sur le PC Ubuntu, MySQL n'écoute que sur `127.0.0.1`. Seul le port HTTP du serveur de banc s'ouvre au réseau local, pour l'adresse du PC Windows seulement (règle de pare-feu `ufw`), et il est refermé après les séries.
- **Rien sur le serveur de production.** Pour la vérification P-13 :
  - conteneur temporaire, lancé par le chef ;
  - mémoire limitée à la moitié de la mémoire libre ;
  - arrêt si la mémoire libre passe sous 500 Mo ;
  - ni réseau ni volume de n8n.
- **Exigences produit** : EP-10 (pages en moins de 1 s), EP-12 (isolation).

## 8. Tests et contrôles

C'est une étude : il n'y a pas de test de production à ajouter. Ces contrôles rendent les chiffres crédibles.

**Préparation**
- 200 bases ;
- autant de tables que la base modèle ;
- le même nombre d'étudiants et de séances dans chacune ;
- `/moi` renvoie au moins une séance pour l'étudiant témoin de chaque école.

**Pendant une série**
- une série est **annulée** si une machine du banc se sert de sa mémoire d'échange (relevé de `vmstat` côté Ubuntu) : elle ne mesurerait plus que la lenteur du disque ;
- aucune réponse 429 : `RATE_LIMIT_API_MAX` est relevé, chaque utilisateur virtuel a sa propre adresse `X-Forwarded-For` et ne se connecte qu'une fois ;
- une réponse 429 annule la série.

**Validité**
- 2 minutes de chauffe, non comptées ;
- trois passages pour le réglage retenu, un pour les autres ;
- médiane et écart ;
- la machine est notée en tête de chaque résultat ;
- une série est refaite si l'hôte dépasse 90 % de processeur.

## 9. Étapes de livraison

1. Ce plan et `suivi.md` : fait (`5c00ae7`), puis cette révision.
2. Après validation et la fusion de #162, #142, #156, #161 et #163 : la branche **fusionne `origin/main`**. Pas de rebase : elle est déjà poussée.
3. MySQL limité, réglages, `preparer.mjs`, séances synthétiques. Contrôle : 200 bases prêtes et `/moi` non vide.
4. `serveur-banc.mjs`, `releves.mjs`. Contrôle : isolation, M1 et M4 sur 10 écoles, série de diagnostic.
5. `charge.mjs`, `serie.mjs`, migration d'étude.
6. Les séries : 3 réglages, paliers de mémoire de MySQL (1, 2 et 4 Go), environ 8 h de machine.
7. Vérification P-13 sur le serveur, pendant EXP-02, par le chef.
8. Le rapport ; `suivi.md`, module, fiche de session. Le chef inscrit D-01 confirmée ou rouverte.

## 10. Risques et retour arrière

| Risque | Parade |
|---|---|
| Le PC Ubuntu n'est pas le serveur (processeur, disque) | limites de processeurs et de mémoire égales à celles du serveur ; vérification P-13 ; écart dit dans le rapport |
| Le réseau local ajoute un peu de latence | mesurée à vide (requête de santé) et donnée à part dans le rapport |
| Le poste n'a pas assez de mémoire ou de disque | contrôle avant la préparation (environ 10 Go de disque) ; paliers plus bas, extrapolation dite |
| La fabrique de l'essai ne coûte pas ce que coûtera celle de PLA-01 | coût par école donné et sourcé ; PLA-01 le remesure |
| Le générateur de charge partage l'hôte | serveur et MySQL dans des conteneurs limités ; série refaite au-delà de 90 % de processeur |
| Les données synthétiques ne ressemblent pas à une vraie école | volumes au rythme d'un collège, et le double des élèves (P-16) ; le rapport le dit |

**Retour arrière** : le volume de mesure et `.local/` s'effacent. La branche ne touche ni la production ni les migrations.

## 11. Hors périmètre

- La fabrique de production, le mode strict, les 23 fichiers : PLA-01.
- Les limiteurs par école et les tâches périodiques par école : PLA-01 et PLA-02. La mesure en donne le coût, elle ne les corrige pas.
- Le registre des écoles et `creer-ecole` : PLA-05 (M5a lui donne un temps de départ).
- Les migrations par vagues : PLA-09.
- StudyLib et ClassQuiz par école : BIB-02, QJE.

## 12. Revue critique du 10 novembre

Le chef de projet a demandé de chercher les failles du plan avant de le valider. Chaque point a été vérifié dans le code.

| N° | Faille du plan du 9 novembre | Gravité | Correction |
|---|---|---|---|
| C-1 | S1 (« 60 % d'une enveloppe de 4 ou 8 Go ») ignorait les **3,2 Go** des autres services : à 4 Go, il ne restait que 1,6 Go pour eux | haute : seuil incohérent | S1 sur le besoin réel (P-15) ; paliers de mémoire de MySQL au lieu de deux enveloppes |
| C-2 | Les **tâches périodiques** n'étaient pas lancées. Le rappel d'appel de chaque minute, sur 200 écoles, réveille tous les pools : « fermé après 10 min » ne se produirait jamais | haute : mesure trop optimiste | tâches lancées sur les 200 écoles (P-18) ; M8 |
| C-3 | **Limiteurs** : le compteur de l'API (`user:<id>`) est commun aux écoles, et les limites de connexion (20 par adresse) auraient refusé la charge venue d'une seule adresse | haute : réponses 429 prises pour une panne | `RATE_LIMIT_API_MAX` relevé ; une adresse `X-Forwarded-For` par utilisateur ; une connexion chacun ; 429 annule la série ; le compteur commun est signalé à PLA-02 |
| C-4 | **Mois non publiés** : `/moi` aurait renvoyé des listes vides, mesurant une requête qui ne fait rien | haute : mesure fausse sans erreur | mois publiés dans la base modèle par `marquer-edt-publie.mjs` (vrai format des copies JSON) ; contrôle « `/moi` non vide » |
| C-5 | Le seed n'a **aucune séance** : il n'y avait pas de « semaine type » à recopier | moyenne | semaine synthétique tirée des enseignements, puis 36 semaines |
| C-6 | Ramener le seed à 300 étudiants supprime des lignes liées (clés étrangères), une source d'erreurs | moyenne | garder ~680 étudiants, une majoration (P-16) |
| C-7 | « Les 3 dernières migrations sur 200 bases » demandait des bases dans un état antérieur, ou des `down` jamais éprouvés | moyenne | migration d'étude, hors de `backend/migrations` |
| C-8 | Mots de passe « en mémoire seulement », alors que la préparation et le serveur sont deux processus | moyenne : irréalisable | `.local/secrets.json`, ignoré et effacé |
| C-9 | Le serveur Node sans limite et le générateur de charge sur le même hôte | moyenne | conteneurs limités ; **charge envoyée depuis une autre machine** (P-3, précisé le 10 nov.) ; seuil de 90 % de processeur |
| C-10 | Cache froid compté ; coût du réveil d'une école endormie non mesuré | moyenne | 2 min de chauffe ; M4c |
| C-11 | Une écriture par la connexion par défaut fuit sans erreur : rien ne l'aurait vue | moyenne | parcours vérifié hors des 23 fichiers ; série de diagnostic avec `general_log` |
| C-12 | `fetch` de Node peut ignorer l'en-tête `Host` | faible | `node:http` avec un agent persistant |
| C-13 | « 20 écoles actives » sans rythme : aucun chiffre de charge | moyenne | 50 utilisateurs par école, toutes les 30 s, puis rampe (P-17) |
| C-14 | « Aucune erreur » sans définition | faible | 5xx, refus, délai de plus de 10 s |
| C-15 | Fichiers ouverts du conteneur MySQL différents entre le poste et le serveur | moyenne : M7 faussé | `ulimits` réglés comme sur le serveur (P-4) |
| C-16 | 18 séries de 40 min (environ 12 h) ; commande `npm run mesure:…` inexistante | faible | trois passages pour le réglage retenu seulement ; `serie.mjs` lancé par `node` |
| C-17 | « Replacer la branche sur main » par un rebase, sur une branche déjà poussée | faible | fusion de `origin/main` |
| C-18 | Vérification sur le serveur sans garde pour n8n | haute pour n8n | mémoire limitée, seuil d'arrêt, ni réseau ni volume de n8n |
| C-19 | Place disque du poste non vérifiée | faible | contrôle avant la préparation |
| C-20 | `docker stats` sous Docker Desktop compte une part du cache de fichiers | faible | méthode de calcul écrite et appliquée |
| C-21 | L'école par défaut (`DB_NAME`) aurait fait une 201e base | faible | école 001 = école par défaut |
| C-27 | **Trouvée à l'essai** : un fichier de réglage monté depuis Windows est ouvert en écriture à tous, et MySQL **l'ignore sans erreur** (« World-writable config file is ignored »). La série aurait tourné avec les valeurs par défaut | haute : mesure fausse sans erreur | le réglage est copié avec des droits stricts avant de lancer MySQL ; `/banc/sante` relit les variables ; `serie.mjs` arrête une série dont le réglage n'est pas celui demandé |
| C-28 | **Trouvée en écrivant** : le jeton d'accès vit 15 min, et la montée en charge commence après environ 16 min ; elle aurait mesuré des 401, très rapides | haute : mesure fausse sans erreur | jeton de 4 h sur le banc seulement ; toute réponse 401 invalide la série |
| C-29 | La règle « série refaite au-delà de 90 % de processeur » visait la machine mesurée ; avec deux machines, la saturation du banc est le résultat cherché | moyenne | la règle porte sur le générateur de charge (plus de 90 % d'un cœur : série invalide) |
| C-26 | Le PC Ubuntu n'a que 4 Go : le palier de 4 Go de MySQL n'y tient pas, et un besoin de plus de 2,5 Go le ferait utiliser sa mémoire d'échange | haute : mesure fausse sans erreur | paliers de 1 et 2 Go sur Ubuntu ; 4 Go sur Windows si besoin ; série annulée en cas de mémoire d'échange ; machines réglées hors du code ; chiffres provisoires (P-24) |
| C-22 | Le serveur n'est pas vide : **Ollama occupe 4,7 Gio** sur 7,6. Avec lui chargé, les seuls plafonds des autres services de Planner (3,2 Go) dépassent ce qui reste (2,3 Gio), avant même MySQL et Node | haute : S1 échoue d'avance | P-19 ; le rapport donne le besoin de Planner, avec et sans Ollama ; série de relevé de la mémoire réelle des autres services (pas seulement leurs plafonds) |
| C-23 | Ollama calcule sur les 4 mêmes cœurs que Planner | moyenne : p95 dégradé pendant ses réponses | une série M6 avec 3 cœurs sur 4 occupés, pour simuler une réponse d'Ollama |
| C-24 | Aucune mémoire d'échange : un dépassement fait tuer un processus par le noyau, peut-être n8n | haute pour n8n | P-20 ; la vérification P-13 ne se fait qu'avec une marge de 1 Gio |
| C-25 | Le proxy de l'hôte est **Traefik**, pas nginx comme sur l'ancien serveur (`deploy/vps/nginx-hestim.conf`) | moyenne, pour EXP-02 | signalé au chantier EXP |
