# Étude : architecture des données de Planner sur le long terme

| | |
|---|---|
| Demandée par | le chef de projet, le 17 novembre 2026 (« la base MySQL risque de ne pas tenir ; analyser, challenger, proposer ») |
| Rédigée par | Claude Code (Opus 5.5), le 17 novembre 2026 |
| Branche | `etude/architecture-donnees`, hors chantier, comme l'étude #174 |
| Nature | **étude** : rien n'est décidé ici. Les décisions sont au chef (pile, schéma partagé, migrations : AGENTS.md, « Qui décide ») |
| Modèle conseillé pour la contre-expertise | **Fable 5.2**, le plus capable pour un choix irréversible ; cette étude a été écrite sous Opus 5.5 (décision du 15 nov. : « chaque agent choisit le modèle le plus adapté ») |

## 1. La question et la réponse courte

**Question du chef** : Planner sera installé dans de nombreux établissements, qui apportent des données de types, de structures et de formes différents. MySQL tiendra-t-il ?

**Réponse courte**

1. **MySQL tient la charge.** Une école de 300 élèves produit de l'ordre de 10 000 séances et 200 000 présences par an (estimation, § 3) : un volume minuscule pour n'importe quel moteur. Aucun chiffre ne montre que MySQL cède.
2. **Le vrai risque est ailleurs**, en cinq points (§ 4) : le coût fixe de chaque école quand elles se comptent par milliers, un schéma écrit pour le supérieur et pour HESTIM, aucun mécanisme pour les données qui changent d'une école ou d'un pays à l'autre, des fichiers rangés dans la base, et des garanties laissées au seul code. Changer de moteur n'en corrige aucun à lui seul.
3. **Le choix du moteur découle du modèle d'isolation, pas l'inverse** (§ 5). Avec une base par école (D-01), MySQL est un bon choix. Si D-01 tombe, l'alternative sûre est une base partagée filtrée **par la base elle-même** (sécurité par ligne, RLS), que **seul PostgreSQL** offre.
4. **Recommandation** (§ 7) : trancher le moteur **maintenant**, par un essai court, parce que la fenêtre la moins chère pour en changer est ouverte : pas de production sur le nouveau serveur (EXP-02b), sauvegardes à refaire de toute façon (EXP-04), schéma de départ en cours (PLA-03b), tables du scolaire pas encore écrites (VSC-01). Après l'étape 4, avec des données réelles de mineurs, le même changement coûtera plusieurs fois plus.
5. **Quel que soit le moteur**, il faut adopter un modèle « **noyau relationnel strict, extensions déclarées** » (§ 6). C'est lui qui répond à la diversité des données, pas le moteur.

## 2. Ce qui a été vérifié dans le code (`main`, `bd934ebf`)

| Fait | Où | Conséquence |
|---|---|---|
| 81 modèles, 62 migrations (0001 à 0081) | `backend/models/`, `backend/migrations/` | le schéma est déjà gros ; une base neuve rejoue tout (PLA-03b) |
| Une seule connexion, sans réglage de pool | `backend/config/db.js` | rien n'est encore dimensionné pour N écoles |
| Contexte d'école par `AsyncLocalStorage`, modèles résolus par école, mode strict éteint | `backend/contexte/` (#142) | **atout** : tout accès à la base passe par un point unique, quel que soit le modèle d'isolation |
| 42 colonnes `ENUM`, dont une dizaine portent le vocabulaire d'HESTIM ou du supérieur (`REGIMES`, `ECOLES`, `CYCLES`, `CODES_PERIODE`, `TYPES_GROUPE`, `NIVEAUX_GROUPE`, `TYPES_COMPOSANTE`, `VARIANTES_GRILLE`, `Users.role`) | `backend/models/*.js` | ajouter une valeur = un `ALTER TABLE` dans chaque base d'école ; type propre à MySQL |
| 20 modèles ont des colonnes JSON, sans schéma déclaré | `ContrainteDeclaree`, `Salle`, `CoursComposante`, `EnvoiEdt`, `ValeurParametre`… | la variabilité existe déjà, chaque module la range à sa façon |
| `Users.email` obligatoire et unique ; `Users.role` à une seule valeur | `backend/models/Users.js` | un enfant sans adresse ne peut pas avoir de compte (Q-20) ; une personne enseignante et parente ne peut pas avoir deux rôles |
| `Users.avatar_url` en `TEXT` « pour les images base64 longues » | `backend/models/Users.js` | des images dans la base, copiées dans chaque sauvegarde |
| Aucune contrainte d'unicité contre la double réservation d'une salle ou d'un enseignant sur `Affectations` | `0001-baseline.sql`, `Affectation.js` | seul le code (solveur, `affectationRules.js`) empêche un doublon |
| 21 tables du schéma initial en `utf8mb4_unicode_ci` ; aucune migration suivante ne fixe la collation | `0001-baseline.sql`, `migrations/*.js` | les tables récentes prennent la collation par défaut de MySQL 8.4 (`utf8mb4_0900_ai_ci`) : mélange probable, **à vérifier par une requête sur `information_schema`** |
| 5 appels SQL bruts hors migrations, 3 traits propres à MySQL dans tout le serveur (2 `GET_LOCK`, 1 `ON DUPLICATE KEY`) | `services/`, `middleware/` | le code applicatif est presque portable ; la règle R-2 borne l'accès à la base |
| ClassQuiz tourne déjà sur PostgreSQL 16 ; StudyLib sur MySQL | `docker-compose.yml` | l'installation exploite déjà les deux moteurs |
| PLA-06 (200 bases MySQL sur un serveur) est prête, pas encore lancée | PR #164 | D-01 n'est pas encore confirmée |

## 3. Ce que le produit demandera aux données

| Besoin (source) | Ce qu'il impose aux données |
|---|---|
| Beaucoup de petites écoles (revue d'architecte, A-1 : « des milliers de structures de quelques centaines d'élèves ») | le **coût fixe par école** compte plus que le volume |
| De la maternelle au supérieur, puis la formation professionnelle (décision du 7 nov.) | classes, demi-groupes, groupes transversaux, cohortes ; trimestres ou semestres ; un élève n'est pas un étudiant |
| Plusieurs pays (PLA-13, ETA) | identifiants nationaux différents (Massar au Maroc, d'autres ailleurs), devises, fuseaux, langues dont l'arabe, calendriers |
| Notes et bulletins (VSC-04) | barèmes sur 20, sur 10, en lettres, en compétences (« acquis, en cours ») ; note absente distincte de zéro |
| Frais et paiements (FIN, PAI, FOR-03) | échéanciers, fratries, plusieurs payeurs ; reçus jamais modifiés, numérotés sans trou |
| Données de mineurs, loi 09-08 (VSC, condition légale) | savoir **quelle colonne** contient quoi : export complet (PLA-12), anonymisation, effacement, l'IA ne reçoit jamais de donnée d'élève |
| Imports de fichiers de toutes formes (D-08, ADM-03) | zone de préparation, lignes brutes gardées, clés naturelles |
| Chiffres consolidés (Plateforme, GRP, PIL) | des comptes **entre** écoles, sans requête d'une base à l'autre (I-D3) |

**Ordre de grandeur, par école de 300 élèves et par an** (estimation à confirmer par MOT-02) : 12 classes, environ 250 séances par semaine sur 34 semaines, soit environ 10 000 séances ; 25 élèves par séance, soit environ 200 000 présences ; 10 matières et 15 notes par élève, soit environ 45 000 notes. Moins d'un million de lignes par an et par école.

## 4. Diagnostic : cinq risques, du plus lourd au plus léger

### R1. Le coût fixe de chaque école (D-01 face à des milliers d'écoles)

Avec une base par école, tout ce qui suit grandit avec le **nombre** d'écoles, pas avec leur taille :

- **mémoire du serveur Node** : une instance Sequelize et environ 80 modèles par école, plus un pool de connexions (mesure M1 de PLA-06) ;
- **tâches périodiques** : le rappel d'appel tourne chaque minute et interroge chaque base, ce qui réveille tous les pools ;
- **migrations** : jouées N fois. Sous MySQL, un `ALTER TABLE` n'est pas annulable dans une transaction : une migration qui échoue au milieu laisse une base à moitié migrée, à réparer à la main, école par école ;
- **tables par serveur MySQL** : environ 85 tables par école, soit environ 42 000 fichiers de tables pour 500 écoles (caches de tables, fichiers ouverts, démarrage) ;
- **restauration** : le journal binaire (reprise à un instant donné) est commun à tout le serveur ; restaurer **une seule** école à 10 h 15 demande de filtrer le journal par base (PLA-07).

Aucun de ces points n'est propre à MySQL. PostgreSQL avec une base par école fait **pire** sur les connexions (un processus par connexion, un pool par base). La revue d'architecte l'avait vu (A-1) : D-01 dit elle-même « changerait si beaucoup de très petites écoles ». **Gravité inconnue tant que PLA-06 n'a pas tourné.**

### R2. Un schéma écrit pour le supérieur et pour HESTIM

Les dix `ENUM` de vocabulaire, `Groupe.id_filiere` et `Cours.semestre` obligatoires, `Periode.code` limité à S1 et S2, `Users.role` à une valeur. Le fichier [04-modele-donnees.md](04-modele-donnees.md) (§ 4.3) et [conception-c5](../vie-scolaire/conception-c5-modele-donnees-scolaire.md) l'ont déjà relevé ; rien n'est encore fait. Chaque `ENUM` gardé coûte une migration sur toutes les bases à chaque nouveau type d'école.

### R3. Aucun mécanisme pour les données qui varient

Aujourd'hui, ce qui varie d'une école à l'autre finit dans une colonne JSON choisie par chaque module, sans définition, sans contrôle, sans classement des données personnelles. Avec les identifiants nationaux, les champs propres à une école (« transport scolaire : oui/non », « boursier ») et les barèmes, ce désordre grandira à chaque pays.

### R4. Des fichiers rangés dans la base

`Users.avatar_url` accepte des images en base64 ; les médias du Studio quiz sont dans la base (BIB-03 les en sortira). Chaque image est recopiée dans chaque sauvegarde, toutes les 15 minutes pour le journal, pour chaque école. MinIO est déjà installé pour cela.

### R5. Des garanties laissées au seul code

Pas de contrainte en base contre la double réservation ; collations probablement mélangées (une jointure entre deux colonnes texte de collations différentes échoue sous MySQL) ; l'argent n'existe pas encore, donc ses règles (montant exact, devise, écriture jamais modifiée) peuvent être bien posées dès le départ.

## 5. Le moteur : MySQL ou PostgreSQL ? Le challenge, critère par critère

| Critère | MySQL 8.4 | PostgreSQL (17 ou 18) | Pour Planner |
|---|---|---|---|
| Une base par école (D-01) | connexions légères (fils d'exécution) ; changer de base sur une même connexion | un processus par connexion ; pool par base ; il faut PgBouncer, ou **un schéma par école** dans une seule base (un pool, `search_path`, un rôle par école) | avantage MySQL, que le schéma par école de PostgreSQL compense |
| Base partagée, si D-01 tombe | **aucune sécurité par ligne** : chaque requête est un point de fuite (raison même de D-01) ; un filtre par Sequelize (portée par défaut) ne protège pas les requêtes brutes ni les `unscoped()` | **RLS** : la base filtre, même si le code oublie. Avec le contexte de D-03, le code actuel, qui ne filtre jamais par école, resterait juste | **avantage décisif PostgreSQL**, et c'est lui qui annule le principal argument de D-01 contre la base partagée |
| Données variables (JSON) | JSON, colonnes générées, index sur expression, index multi-valeurs, `JSON_SCHEMA_VALID` | JSONB, index GIN sur toutes les clés, opérateurs de contenu | avantage PostgreSQL, sans effet réel aux volumes d'une école (§ 3) |
| Migrations sur N bases | DDL non transactionnel ; `ADD COLUMN` instantané | DDL dans une transaction : une migration réussit ou s'annule en entier | avantage PostgreSQL, sensible dès 200 bases |
| Garanties métier | `CHECK`, unicité | en plus : contraintes d'exclusion sur des plages (`salle` + `plage horaire` sans chevauchement), index partiels, clés étrangères différées | avantage PostgreSQL pour l'emploi du temps |
| Recherche sans accents ni majuscules | **natif** (`_ai_ci`) : `email = 'A@x'` trouve `a@x`, l'unicité ignore la casse | sensible à la casse par défaut : `citext` ou index sur `lower()`, `unaccent` ou collation ICU | piège de bascule : connexion, unicité des adresses, recherche de noms |
| Exploitation | sauvegardes par journal binaire essayées le 29 oct. sur l'**ancien** serveur ; à refaire sur le nouveau (EXP-04) | pgBackRest ou WAL-G vers B2 ; même reprise à un instant donné, commune à l'instance | égalité sur le nouveau serveur, puisque EXP-04 est à faire |
| Support | 8.4 LTS : 2029, étendu 2032 | 5 ans par version majeure | égalité |
| Coût de bascule aujourd'hui | — | schéma de départ régénéré (PLA-03b), 5 requêtes brutes, `GET_LOCK` remplacé par un verrou consultatif, collations, base de tests, images, banc de PLA-06 à doubler | **M à L**, à mesurer par l'essai (§ 7) |

**Les autres moteurs, écartés** :
- **MongoDB ou une base de documents** : l'emploi du temps, l'appel, les reports, les notes et les paiements se lisent ensemble dans des transactions (D-17). Une base de documents déplacerait l'intégrité dans le code, là où R5 la trouve déjà trop.
- **Bases distribuées** (TiDB, CockroachDB, Vitess) : faites pour des volumes qu'une école n'atteindra jamais ; un service lourd de plus sur un serveur de 7,6 Gio partagé avec n8n.
- **Une base SQLite par école** (fichier, copie par Litestream) : coût fixe presque nul, séduisant pour des milliers de petites écoles ; mais un seul écrivain à la fois, pas de verrou partagé entre processus, outillage jeune pour cette équipe. À revoir seulement si R1 devient le seul problème.

**Verdict du challenge** : MySQL n'est pas « inadapté ». Il est le meilleur choix **si** D-01 tient pour toujours. PostgreSQL est le meilleur choix **si** Planner doit un jour mettre des centaines de petites écoles dans une base partagée, ce que la cible commerciale rend probable. Le moteur se choisit donc sur l'horizon du nombre d'écoles (question Q-30-1, § 9).

## 6. Proposition, quel que soit le moteur : noyau strict, extensions déclarées

Le principe de D-06 (« le code garde le sens, l'école nomme ») est prolongé en quatre niveaux. **Une donnée qui sert à un calcul ou à une règle est une colonne typée ; une donnée qui ne sert qu'à être saisie, affichée et exportée peut être une extension.**

| Niveau | Pour quoi | Forme | Exemple |
|---|---|---|---|
| 1. Noyau | ce que le code et le solveur comprennent | colonnes typées, clés étrangères, contraintes | séance, salle, élève, inscription, note, paiement |
| 2. Nomenclatures | les listes que l'école nomme | **tables de référence** à la place des `ENUM` de vocabulaire (fichier 04, § 4.3) ; les `ENUM` d'état du code (`statut`) deviennent `VARCHAR` avec `CHECK`, portables | cycles, niveaux, types de salle, rythmes, périodes |
| 3. Identifiants externes | les numéros des systèmes de l'État et des partenaires | une table `IdentifiantExterne` (entité, `uid` de l'entité, système, valeur), unique par système | code Massar, numéro d'un autre pays, identifiant OneRoster |
| 4. Champs propres | ce qu'un pays, un profil ou une école ajoute pour l'afficher | une table `DefinitionChamp` (entité, code, type, libellés par langue, obligatoire, classe de donnée) et une colonne JSON `champs` sur les entités qui s'étendent ; contrôle par le service, à l'écriture et à l'import | « boursier », « transport scolaire », « allergie » **refusée** (donnée de santé, § VSC) |

Deux structures du scolaire relèvent du noyau, pas des extensions, parce qu'elles servent au calcul :
- **Barème** : un barème (numérique sur N, échelle ordinale, compétences) et ses échelons ; une note porte une valeur **ou** un échelon, plus un état (absent, dispensé, à rattraper). La moyenne ne se calcule que sur ce qui est calculable.
- **Argent** : montants en `DECIMAL(12,2)` avec leur devise, écritures jamais modifiées (une erreur s'annule par une écriture inverse), numérotation des reçus par une table de compteurs verrouillée en transaction.

**Règles de schéma à adopter dès la prochaine migration** (elles rendent aussi toute bascule de moteur moins chère) :

1. Pas de nouvel `ENUM` : `VARCHAR` avec `CHECK`, ou table de référence.
2. Collation fixée explicitement à chaque création de table ; une seule collation dans toute la base.
3. Un `uid` (UUID v7) sur toute entité qui sort de la base (D-15), stocké en texte ASCII de 36 caractères : le gain du binaire ne compte pas à ces volumes.
4. Les instants en UTC (`created_at`, journaux) ; les séances en date et heure **locales** de l'école, avec le fuseau de l'école dans sa configuration (PLA-13). Jamais le fuseau du navigateur (règle déjà écrite).
5. Aucun fichier dans la base : une clé vers le stockage d'objets (MinIO), jamais du base64.
6. Une migration = un changement de schéma, rejouable sans dommage, en « étendre puis contracter » (D-16).
7. Toute colonne qui contient une donnée personnelle est **classée** (identité, contact, mineur, scolarité, finance) dans un catalogue tenu dans le code ; l'export (PLA-12), l'anonymisation et le filtre de l'IA lisent ce catalogue.
8. Ce qui s'empêche en base s'empêche en base : unicité contre la double réservation quand la séance a un créneau discret (à vérifier sur `Affectations` avec MOT-04), contraintes `CHECK` sur les états.
9. Les chiffres consolidés passent par la boîte d'envoi (D-14) vers la Plateforme, jamais par une requête d'une base à l'autre (I-D3). Un entrepôt d'analyse ne viendra qu'avec PIL.

## 7. Recommandation et plan

**Recommandation : décider du moteur avant EXP-02b, par un essai court, puis appliquer le § 6 dans VSC-01.**

| Ordre | Quoi | Taille (estimation avant conception) | Rattachement |
|---|---|---|---|
| 1 | Le chef répond aux questions du § 9, surtout l'horizon du nombre d'écoles | — | decisions.md, Q-30 |
| 2 | **Lancer PLA-06 tel quel** : la mesure dit si D-01 tient sous MySQL | déjà prête | PLA-06 |
| 3 | **Essai PostgreSQL**, dans une branche `etude/` : suite d'intégration verte sur PostgreSQL ; deux écoles dans une base partagée avec RLS, à travers le contexte de D-03 ; une école sauvegardée et restaurée seule. Critère : les trois tiennent, ou l'essai dit lequel cède | M | nouvelle fonction PLA, ouverte par le chef |
| 4 | Décision du chef : **MySQL et D-01** (si l'horizon reste de quelques centaines d'écoles et que PLA-06 tient), ou **PostgreSQL** avec un schéma par école pour commencer et la base partagée sous RLS prête pour les petites écoles | — | decisions.md |
| 5 | Si PostgreSQL : bascule avant EXP-02b, schéma de départ généré pour PostgreSQL (PLA-03b), sauvegardes faites directement en PostgreSQL (EXP-04), banc de PLA-06 complété d'une série PostgreSQL | L | PLA-03b, EXP-04, PLA-06 |
| 6 | Dans tous les cas : le § 6 entre dans la conception de VSC-01 (nomenclatures, identifiants externes, champs propres, barème, classement des données) ; R4 et R5 deviennent des correctifs à part | dans VSC-01 ; S chacun pour R4 et R5 | VSC-01, BIB-03 |

**Pourquoi décider maintenant, et pas après PLA-06 seulement** : PLA-06 répond à « MySQL tient-il 200 écoles ? ». Elle ne répond pas à « que fera-t-on à 2 000 ? ». Or le prix d'un changement de moteur ne fait que monter : aujourd'hui, aucune donnée réelle, pas de production sur le nouveau serveur, pas de sauvegarde à refaire ; après l'étape 4, des dizaines de tables du scolaire et des finances, des données de mineurs et une production à arrêter.

**Ce que coûte la recommandation, honnêtement** :
- une partie du banc de PLA-06 est écrite pour MySQL (environ 3 400 lignes) : ses seuils et sa méthode restent valables, une série PostgreSQL s'ajoute ;
- la pile a été confirmée le 13 novembre (QUA-03) : la rouvrir pour la base est une décision du chef, sur une condition qui n'était pas dans son § 5 (l'horizon de milliers d'écoles) ;
- StudyLib resterait sur MySQL jusqu'à BIB-02 : deux moteurs à exploiter, comme aujourd'hui avec ClassQuiz.

**Si le chef garde MySQL** : la proposition reste utile en entier, sauf le § 7, lignes 3 et 5. Le risque accepté est écrit : si un jour la base partagée devient nécessaire, elle se fera sans sécurité par ligne, donc avec un filtre dans le code et un test d'isolation par route (PLA-04), ou par un changement de moteur plus coûteux.

## 8. Ce que cette étude ne dit pas

- Elle ne mesure rien : les chiffres du § 3 sont des estimations, ceux de R1 viendront de PLA-06.
- Elle ne fixe pas le seuil d'écoles au-delà duquel la base partagée devient nécessaire : il dépend de PLA-06 et de l'essai.
- Elle ne traite ni StudyLib ni les jeux (D-12) en détail.
- Elle ne remplace pas VSC-01 : elle lui donne un cadre.

## 9. Questions au chef

| N° | Question | Proposition |
|---|---|---|
| Q-30-1 | Combien d'écoles visez-vous à 3 ans et à 7 ans, et de quelle taille ? | dire un ordre de grandeur, même large (« 50 à 300 », « plus de 1 000 ») : c'est lui qui choisit le moteur |
| Q-30-2 | Acceptez-vous de rouvrir la question de la base (QUA-03, § 5) pour un essai PostgreSQL court, avant EXP-02b ? | oui, essai de taille M dans une branche `etude/`, sans toucher `main` ni le serveur |
| Q-30-3 | Les écoles peuvent-elles créer leurs propres champs (niveau 4), ou seulement les profils et les packs pays ? | profils et packs pays d'abord ; quelques champs libres par entité ensuite, jamais de donnée de santé ni de CIN |
| Q-30-4 | Le modèle « noyau strict, extensions déclarées » (§ 6) devient-il une règle pour VSC-01 et les modules suivants ? | oui, inscrit dans decisions.md et dans le modèle de conception |
| Q-30-5 | R4 (images hors de la base) et R5 (collations, unicité des séances) : correctifs hors chantier, ou dans un chantier ? | dans PLA, après PLA-03b ; la vérification des collations (une requête) tout de suite |
| Q-30-6 | Une contre-expertise de cette étude par une session sous Fable 5.2, avant votre décision ? | oui, sur le modèle de la contre-expertise du 24 octobre |

## 10. Réponses du chef (17 novembre) et ce qu'elles changent

| N° | Réponse | Effet sur l'étude |
|---|---|---|
| Q-30-1 | « D'ici 3 ans, même 10 écoles » | **R1 baisse fortement** : à 10 écoles, une base par école ne coûte presque rien, sur MySQL comme sur PostgreSQL. L'argument « RLS pour une base partagée de milliers d'écoles » devient un argument de long terme, plus d'urgence. L'essai PostgreSQL se juge donc d'abord sur la **souplesse du schéma** (exigence ci-dessous) |
| Q-30-2 | Oui à l'essai PostgreSQL | plan de conception de l'essai à écrire, à valider par le chef avant tout code |
| Q-30-3 | Oui : les écoles créent leurs champs (profils et packs pays d'abord, puis champs libres ; jamais santé ni CIN) | le niveau 4 du § 6 est retenu, avec une interface d'administration |
| Q-30-4 | Le modèle « noyau strict, extensions déclarées » est une règle pour VSC-01 | inscrit dans decisions.md |
| Q-30-5 | Validé : R4 et R5 dans le chantier PLA, après PLA-03b ; collations vérifiées tout de suite | voir ci-dessous |
| Q-30-6 | Oui : contre-expertise sous Fable 5.2 | lancée le 17 nov. ; fichier `contre-expertise-architecture-donnees.md` |

**Exigence nouvelle du chef** : Planner sert la maternelle, le primaire, le collège, le lycée, l'université, les écoles supérieures, les centres de formation. Chaque structure a son propre schéma de données. **Aucun livrable ni aucune discussion technique par école** : la base s'adapte au format que la structure apporte. Exemple : un étudiant a une adresse électronique, un collégien pas forcément.

Conséquence de principe (à détailler avec la contre-expertise) : **la base ne garantit que ce qui est vrai pour toutes les structures** (un élève a un nom, une inscription a une année). Ce qui est obligatoire pour une structure et pas pour une autre (l'adresse électronique, le numéro d'étudiant, le responsable légal) devient une **règle de configuration**, lue dans le profil de la structure et dans les réglages de l'école, et contrôlée par le service à la saisie et à l'import. Ainsi, `Users.email` devient facultatif en base, et obligatoire là où le profil le dit.

**Vérification des collations (Q-30-5), faite sur le code le 17 nov.** : aucune configuration de MySQL ne fixe la collation (ni `docker-compose.yml`, ni `deploy/vps/mysql.cnf`, ni la CI `.github/workflows/ci-cd.yml`) ; les 21 tables du schéma initial sont en `utf8mb4_unicode_ci` ; les tables créées ensuite par `queryInterface.createTable` (par exemple `0042-espace-de-cours.js`) ne fixent rien et prennent donc la collation par défaut de MySQL 8.4, `utf8mb4_0900_ai_ci`. **Le mélange est certain sur toute base construite par les migrations** (CI, base neuve). Pour une base réelle, la requête de contrôle, à lancer par le chef :

```sql
SELECT TABLE_COLLATION, COUNT(*) AS tables
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
GROUP BY TABLE_COLLATION;
```

Le correctif (une seule collation, fixée à chaque création de table) reste dans le chantier PLA, après PLA-03b, comme validé ; il dépend aussi du moteur retenu après l'essai.
