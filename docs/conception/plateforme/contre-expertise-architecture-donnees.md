# Contre-expertise : architecture des données de Planner

| | |
|---|---|
| Objet | contre-expertise de [etude-architecture-donnees.md](etude-architecture-donnees.md) (question Q-30) |
| Demandée par | le chef de projet, le 17 novembre 2026 |
| Rédigée par | Claude Code (Fable 5.2), le 17 novembre 2026, en rôle d'architecte de bases de données |
| Branche | `etude/architecture-donnees`, hors chantier |
| Base vérifiée | dossier de travail de la branche, commit `67b0a83a` (code identique à `main` pour `backend/`) |
| Nature | **avis** : rien n'est décidé ici. Moteur, schéma partagé, migrations et légal restent au chef |

## 1. Verdict d'ensemble

1. **Juste** : MySQL tient le volume ; le vrai sujet est le modèle de données, pas le moteur ; le modèle « noyau strict, extensions déclarées » est la bonne direction ; R2 (schéma écrit pour HESTIM) et R4 (fichiers dans la base) sont bien vus.
2. **Faux ou surestimé** : R1 et l'argument de la sécurité par ligne (RLS) ne pèsent presque plus à 10 écoles ; le coût d'une bascule est sous-estimé (au moins 9 traits propres à MySQL hors migrations, et non 3, plus des données d'HESTIM à reprendre) ; la règle 8 (« empêcher la double réservation en base ») contredit une fonction existante, le forçage d'un chevauchement.
3. **Manque** : la séparation de la personne et du compte est traitée en une ligne alors qu'elle est **la** migration lourde de la nouvelle exigence ; rien sur les obligations de champs par profil, les modèles d'import, les définitions versionnées, la hiérarchie configurable, ni sur la limite honnête de « s'adapter sans développement ».
4. **Le contexte d'école n'est pas encore « un point unique »** : 23 fichiers ouvrent encore des transactions sur la connexion par défaut. C'est le risque d'isolation le plus concret, avant tout choix de moteur.
5. **Recommandation** : rester sur MySQL 8.4 avec une base par école ; faire l'essai PostgreSQL accepté, mais **resserré** (sans RLS), jugé sur des critères dont la règle par défaut est « rester » ; mettre l'effort sur la couche de métadonnées (§ 4), qui ne dépend pas du moteur.

## 2. Vérification des faits du § 2 de l'étude

| Fait de l'étude | Verdict | Preuve |
|---|---|---|
| 81 modèles, 62 migrations (0001 à 0081) | **imprécis** | `grep sequelize.define backend/models/*.js` : **87** définitions (dont `studio.js`, `quizDirect.js`, `sessionsJeu.js`) ; PLA-06 en comptait 78 le 10 nov., pile.md 81. Migrations : 62 fichiers, confirmé |
| Une seule connexion, sans réglage de pool | confirmé | `backend/config/db.js`, l. 7-20 : aucun `pool`, donc 5 connexions au plus (défaut de Sequelize) |
| Contexte par `AsyncLocalStorage`, mode strict éteint, « tout accès passe par un point unique » | **imprécis, surévalué** | `contexte/etablissement.js` confirmé. Mais `eslint.config.js`, l. 21-45 : **23 fichiers** figés importent encore `config/db.js` (dont `services/planning/seances.js`, l. 52 et 104 : `sequelize.transaction`). [17-essai-contexte.md](17-essai-contexte.md), § 17.3, point 2 : une transaction ouverte sur `config/db.js` emporte dans l'école A l'écriture d'un modèle de B, **sans erreur, même en mode strict** |
| 42 colonnes `ENUM`, dont une dizaine de vocabulaire | confirmé | `grep -c DataTypes.ENUM` : 42 occurrences dans 29 fichiers ; listes dans `backend/config/referentiel.js` (`REGIMES`, `VARIANTES_GRILLE`, l. 45-48) |
| 20 modèles à colonnes JSON sans schéma | confirmé | `grep -l DataTypes.JSON` : 20 fichiers ; `ValeurParametre.js` (`valeur: JSON`). Ajout : mysql2 rend parfois le JSON en texte, d'où `lireJson` dans `migrations/0061-valeurs-parametres.js`, l. 22, et `0081-plages-reprises.js`, l. 20 |
| `Users.email` obligatoire et unique ; `Users.role` à une valeur | confirmé, **incomplet** | `models/Users.js`, l. 20-28 ; `0001-baseline.sql`, `Users`. Manque : `role` ne connaît **pas `parent`** ; `Etudiant` a pour clé `id_user` et exige `numero_etudiant` unique et `niveau` (`models/Etudiant.js`, l. 7-20) : un élève **est** un compte. Côté Plateforme, `COMPTE.email` est aussi unique ([04-modele-donnees.md](04-modele-donnees.md), § 4.1) |
| `avatar_url` en `TEXT` pour du base64 | confirmé | `models/Users.js`, l. 43 |
| Aucune unicité contre la double réservation sur `Affectations` | confirmé, **conclusion fausse** | `0001-baseline.sql`, l. 1-35 et `migrations/0028-index-seances.js` : index non uniques seulement. Mais le produit **accepte** un chevauchement forcé par l'administration, avec justification, et ouvre un conflit (`services/planning/seances.js`, l. 20-24 et `ouvrirConflits`, l. 120-133). Une contrainte en base interdirait cette fonction |
| 21 tables en `utf8mb4_unicode_ci` ; aucune migration ne fixe la collation | confirmé | `grep -o COLLATE=… 0001-baseline.sql` : 21 fois `utf8mb4_unicode_ci` ; `grep -i "collate\|charset" migrations/*.js` : rien. Le mélange dépend de la collation **de la base** (pas du serveur) : certain sur une base créée par défaut (CI, `docker-compose.yml`, l. 24), à mesurer sur la base d'HESTIM restaurée |
| 5 appels SQL bruts, 3 traits propres à MySQL | **faux** (sous-estimé) | hors migrations : 9 appels bruts (`rateLimiterMiddleware.js`, l. 59-76 ; `taches/periodiques.js`, l. 24-29 ; `supervision/etat.js`, l. 45-46). Traits propres à MySQL : `GET_LOCK`/`RELEASE_LOCK` ; `ON DUPLICATE KEY` avec `IF()` ; `JSON_CONTAINS` (`calendrier/versionPubliee.js`, l. 60) ; `performance_schema` et `@@max_connections` (`etat.js`) ; guillemets obliques dans un `literal` (`statistiquesController.js`, l. 342-343) ; `SUM` d'une expression booléenne (`annonces/annonces.js`, l. 341 ; `studio/directEtat.js`, l. 77). Dans les migrations : 56 appels `query(` dans 18 fichiers |
| ClassQuiz sur PostgreSQL 16, StudyLib sur MySQL | confirmé, **à relativiser** | `docker-compose.yml`, l. 422-432. Mais la décision du 20 oct. **sort de ClassQuiz** : PostgreSQL y est appelé à disparaître ; basculer Planner garderait deux moteurs (StudyLib reste sur MySQL jusqu'à BIB-02) |
| PLA-06 prête, pas lancée | confirmé | plan de PLA-06 (branche `etude/pla-06-mesure-d01`) : « aucune série avant adaptation et vérification des gardes » (amendement du 15 nov.) |

**Fait que l'étude affirme sans le vérifier** : « aujourd'hui, aucune donnée réelle » (§ 7). EXP-02 comprend « la reprise des données du serveur provisoire », comptes et documents comptés avant et après ([EXP-exploitation.md](../../plan/modules/EXP-exploitation.md), l. 43 et 68). Une bascule convertit donc des données d'HESTIM, ce que l'étude ne chiffre pas.

## 3. Les risques et le moteur, à 10 écoles et avec la nouvelle exigence

### 3.1 Les cinq risques

| Risque | Ce que dit l'étude | Contre-expertise | Gravité revue |
|---|---|---|---|
| R1. Coût fixe par école | le plus lourd ; inconnu sans PLA-06 | à 10 écoles : 10 instances Sequelize, 10 pools, 10 × 85 tables, 10 migrations par version. Négligeable sur 7,6 Gio. PLA-06 mesure 200 bases, soit **20 fois** l'horizon : sa conclusion vaudra marge, pas condition. **Garder PLA-06 mais la réduire** (50 bases suffisent pour prouver une marge de ×5) | faible |
| R2. Schéma écrit pour HESTIM | 10 `ENUM` de vocabulaire, colonnes obligatoires | sous-estimé : la nouvelle exigence le fait passer **en tête**. Aux `ENUM` s'ajoutent les invariants d'HESTIM en `NOT NULL` : `Users.email`, `Users.password_hash`, `Etudiant.numero_etudiant`, `Etudiant.niveau` (texte libre, pas une nomenclature), `Groupe.id_filiere`. Et la décision du 8 nov. (réponse Q-1 de conception-c5 : « un élève est un `Etudiant` ») fige la fusion personne-compte | **forte** |
| R3. Données qui varient | désordre de JSON par module | juste, mais l'étude ne voit pas qu'un modèle existe déjà dans le code : le **catalogue du moteur** (`services/moteur/catalogue/` : définitions JSON typées, contrôlées par `verifier.js`, 20 types, profils `primaire`, `college`, `lycee`, `formation`, `universite`) et `ValeurParametre` (valeur par **portée** : établissement, cycle, niveau, filière ; versionnée). C'est le patron à généraliser aux champs | forte |
| R4. Fichiers dans la base | images base64, médias du Studio | juste. Faible en volume à 10 écoles, mais gênant pour la sauvegarde et l'export légal. Correctif S, comme validé | moyenne |
| R5. Garanties laissées au code | unicité contre la double réservation, collations | **à corriger** : (a) le forçage d'un chevauchement est une fonction voulue (§ 2) ; (b) les créneaux de grilles différentes se chevauchent (rythmes `initiale`, `continue`, `executive`, variante `ramadan` : `models/Creneau.js`), donc une unicité sur `id_creneau` n'empêche pas deux séances au même moment ; (c) les conflits par hiérarchie (promotion > TD > TP, `affectationRules.js`, l. 30) ne s'écrivent pas en contrainte. Seule une contrainte d'exclusion **partielle** de PostgreSQL (`EXCLUDE … WHERE` non forcée et statut actif) en couvrirait une partie | moyenne |
| **R6 (absent de l'étude)**. Isolation incomplète | « atout » | 23 fichiers contournent le contexte (§ 2). Une deuxième école en production avant leur reprise = fuite ou écriture dans la mauvaise base. **Aucun moteur ne corrige cela** (sous base par école, la RLS ne sert à rien) | **forte, bloquante pour la 2e école** |

### 3.2 Le moteur : quels critères décident maintenant

| Critère | MySQL 8.4 | PostgreSQL 17 ou 18 | Poids à 10 écoles avec l'exigence |
|---|---|---|---|
| RLS, base partagée | absente | native | **nul** pendant 3 ans : D-01 tient à 10 écoles. Argument de long terme seulement |
| Souplesse du schéma (champs propres) | JSON binaire, `JSON_SCHEMA_VALID` (contrôle en `CHECK`), colonnes générées, index fonctionnels et multi-valeurs | JSONB, index GIN sur toutes les clés, opérateurs `@>`, `jsonb_path` | **faible** : moins de 5 000 personnes par école ; un filtre sans index sur un champ JSON parcourt quelques milliers de lignes. La validation se fait de toute façon dans le service (elle dépend du profil et de l'école). Avantage PostgreSQL réel mais sans effet mesurable |
| DDL transactionnel | chaque instruction DDL est atomique, mais **valide implicitement** la transaction : une migration de plusieurs instructions peut s'arrêter au milieu (documentation MySQL 8.4, « Atomic DDL ») | DDL dans une transaction | **moyen** : 10 bases, pas 500. Il pèse surtout si l'on crée des colonnes par école, ce que le § 4 **exclut** (les champs propres sont des données, jamais du DDL). Parade MySQL : une migration = une instruction DDL, plus une sauvegarde avant la vague (D-16) |
| Contraintes d'exclusion | absentes | `EXCLUDE USING gist`, partielles | **moyen** : utile pour les séances non forcées et les réservations ; ne couvre ni la hiérarchie des groupes ni les conflits d'élèves (F-11) |
| Collations insensibles à la casse et aux accents | natif (`_ai_ci`) | ICU non déterministe ; `LIKE` sur ces collations depuis PostgreSQL 18 seulement | avantage **MySQL** pour la connexion par identifiant et la recherche de noms ; un piège de bascule de plus |
| Coût de bascule | — | ≥ 9 traits SQL, 18 migrations à réécrire ou un schéma de départ PostgreSQL (PLA-03b), CI, banc PLA-06, EXP-04, **conversion des données d'HESTIM** | **fort** pour une équipe d'une personne et des agents |
| Exploitation sur 7,6 Gio partagés | MySQL déjà réglé (ME-0e), sauvegardes à clé publique éprouvées sur l'ancien serveur | nouvel outillage (pgBackRest ou WAL-G), réglages mémoire à apprendre ; **deux moteurs** tant que StudyLib reste sur MySQL | moyen, en faveur de MySQL |
| Compétence de l'équipe | pratiquée depuis le début (journaux binaires, restauration du 29 oct.) | ClassQuiz tourne sur PostgreSQL, mais n'a jamais été administré en profondeur | en faveur de MySQL |
| Support | 8.4 LTS : 30 avril 2029, étendu 30 avril 2032 (pile.md, § 2.3) | 17 : jusqu'au 8 nov. 2029 ; 18 : jusqu'au 14 nov. 2030 (postgresql.org, consulté le 17 nov. 2026) | égalité |

**Recommandation motivée** : **rester sur MySQL 8.4 et garder D-01.** À 10 écoles, les deux avantages forts de PostgreSQL (RLS, échelle des migrations) ne servent pas ; ses avantages restants (JSONB, contraintes d'exclusion, DDL transactionnel) sont réels mais ne changent ni la sécurité ni la capacité de répondre à l'exigence du chef, qui se joue dans la couche de métadonnées. Le coût de bascule, lui, est certain et tombe au pire moment (EXP-02b, reprise d'HESTIM). Aucune des six conditions de réouverture de [pile.md](../qualite/pile.md), § 5, n'est remplie : l'étude rouvrait la pile sur « des milliers d'écoles », prémisse que la réponse Q-30-1 a retirée.

L'essai accepté (Q-30-2) garde un intérêt : il **mesure** au lieu de supposer, et il fixe le prix d'une bascule future. Je propose de le faire, resserré (§ 5), avec « rester » comme issue par défaut. **Ce qui me ferait changer d'avis** : une ambition qui remonte au-dessus de quelques centaines d'écoles, ou un besoin confirmé de base partagée (petites écoles à 30 élèves, offre gratuite).

## 4. Réponse d'architecture à la nouvelle exigence

Exigence du chef : **la base s'adapte au format de chaque structure, sans livrable ni discussion technique par école.** Ma traduction : tout ce qui varie d'une structure à l'autre est de la **donnée de configuration** (profils et packs livrés avec le produit, réglages de l'école), jamais du code ni du DDL par école. Le § 6 de l'étude pose le bon principe ; il lui manque les mécanismes ci-dessous.

### 4.1 Séparer la personne du compte (Q-20) : le préalable

| Table (base de l'école) | Rôle | Invariants en base |
|---|---|---|
| `Personne` | identité : nom, prénom, date de naissance facultative, `uid` (D-15), `champs` (JSON) | nom ou prénom non vides ; `uid` unique |
| `Eleve`, `Personnel`, `ResponsableLegal` | rôles **de la personne** dans l'école, chacun sa table | clé vers `Personne` ; aucun numéro obligatoire |
| `LienFamille` | élève, responsable, nature, ordre des contacts | pas de doublon (élève, responsable) |
| `Compte` | accès : `identifiant` donné par l'école, `email` facultatif, mot de passe, MFA, état | `identifiant` **unique dans l'école** ; `email` unique quand il existe (un index unique MySQL admet plusieurs `NULL`) |
| `Habilitation` | rôles du compte (enseignant **et** parent), déjà prévue au § 4.3 du fichier 04 | (compte, rôle, portée) unique |

- **Connexion** : l'école vient de l'adresse (D-02), puis `identifiant` ou adresse électronique. Pas d'adresse factice. Réinitialisation sans adresse : par l'administration ou par le responsable légal.
- **Un compte est facultatif** pour une personne : un enfant de maternelle existe sans compte. Cela amende la décision du 8 nov. (« un élève a un compte ») : je propose « un élève **peut** avoir un compte, selon le profil » (question 2, § 7).
- **Plateforme** : `COMPTE.email` unique (fichier 04, § 4.1) devient facultatif. Un adulte présent dans deux écoles (D-05) a un compte de plateforme rattaché par son adresse ; un élève sans adresse n'a qu'un compte local à son école.
- **Coût réel** : `Users` est lu partout (une trentaine de fichiers lisent `email` ; 8 lisent `numero_etudiant`) et `Etudiant.id_user` est une clé étrangère de nombreuses tables (`Presence`, `Appartenir`…). Migration « étendre puis contracter » en au moins trois versions : `Personne` créée et remplie depuis `Users`, `Etudiant` pointe vers `Personne`, puis `Users` devient `Compte`. **C'est L à XL**, et il faut le faire **avant** les tables du scolaire, sinon chacune se rattache à `Users` et la dette double.

### 4.2 Obligations de champs : métadonnées, pas contraintes

La base ne garantit que ce qui est vrai pour **toutes** les structures : une personne a un nom ; une inscription a un élève, une année et un niveau ; une note a une évaluation ; un montant a une devise. Tout le reste (adresse électronique, numéro d'étudiant, code Massar, responsable légal obligatoire pour un mineur) est une **règle d'obligation**, résolue ainsi :

1. le **noyau** fixe ce qui ne se désactive pas (le code le sait, comme les règles verrouillées de D-09) ;
2. le **profil** (primaire, collège, lycée, université, formation ; un profil **maternelle** manque, Q-08) donne les obligations par défaut ;
3. le **pack pays** ajoute les siennes (Maroc : code Massar facultatif, jamais de CIN) ;
4. l'**école** resserre ou desserre dans les limites du profil, au même endroit que `ValeurParametre` (portées établissement, cycle, niveau, filière), donc **versionnée et datée** (D-07).

Le service contrôle à la saisie, à l'import et à l'API, avec un seul module de validation. Prendre le patron existant du catalogue du moteur (`services/moteur/catalogue/`) : définitions dans le code, contrôlées en CI, profils en JSON. Ne pas inventer un second mécanisme.

### 4.3 Champs propres : définition et stockage

**Définition** (`DefinitionChamp`, dans la base de l'école ; celles des profils et packs livrées dans le code) : entité, `code` stable (jamais réutilisé), libellés par langue, type (reprendre les 20 types de `verifier.js`, réduits aux types saisissables), règles (longueur, bornes, liste de valeurs), **classe de donnée** (identité, contact, scolarité, finance, interne), visibilité (qui lit, qui écrit), conservation, état (actif, masqué, retiré), version.

| Stockage | Avantages | Pièges | Verdict |
|---|---|---|---|
| Colonne JSON `champs` sur l'entité | une lecture, export simple, pas de DDL, portable MySQL et PostgreSQL | pas de type en base ; Sequelize ne voit pas une modification en profondeur (réaffecter l'objet) ; JSON rendu parfois en texte par mysql2 (`lireJson`) | **retenu** |
| Table EAV (`ValeurChamp` : entité, id, code, valeur texte, nombre, date) | typée, indexable, historique par champ | jointures pour chaque lecture, export et rapports pénibles, requêtes illisibles ; c'est le piège classique des progiciels | **refusé** comme stockage principal |
| Colonnes réelles par école (DDL) | typé, rapide | DDL par école, schémas qui divergent, migrations impossibles à tester, contraire à « sans développement par école » | **refusé** |

- **Recherche, tri et filtres** : en JSON sans index, mesuré dans l'essai (§ 5, critère 3). Si une école a besoin d'un index, ce n'est plus un champ propre (voir 4.7).
- **Rapports et export** (PLA-12) : l'export lit les définitions **à la date des données** et sort libellé, code et valeur ; les champs retirés restent dans l'export de leurs années.
- **Limites** : 30 champs actifs par entité et par école (Salesforce et Odoo fixent aussi des plafonds) ; pas de type « texte long » sur un élève : c'est par là qu'entrent les données de santé (§ 6).
- **IA** : aucun champ propre n'est envoyé à l'IA, quelle que soit sa classe.

### 4.4 Modèles d'import réutilisables

`ModeleImport` par école : format source (en-têtes repérés), correspondance colonne → champ du noyau ou code de champ propre, transformations déclarées (dates, majuscules, découpage « Nom Prénom »), tables de correspondance de valeurs (« 6e », « 6ème » → niveau), clé naturelle choisie. L'administration le fait **une fois** à l'écran, puis le réemploie chaque année. Il s'insère dans la zone de préparation de D-08 : chaque ligne brute est gardée, chaque rejet dit la règle d'obligation qui manque. Livrés avec le produit : des modèles pour les exports courants d'un pays (un export Massar, par exemple), rangés dans le pack pays.

### 4.5 Hiérarchie d'organisation

Les **natures** restent dans le code, parce que le solveur et les droits les comprennent : cycle, niveau, classe (ou promotion), sous-groupe (demi-groupe, TD, TP), groupe transversal (langue, option), cohorte (formation). Le **profil** dit lesquelles existent et comment l'école les nomme (D-06). L'emboîtement reste un arbre de trois niveaux au plus (D-06, I-D8) ; le groupe transversal est hors de l'arbre (amendement prévu de D-06). Une profondeur libre, à la manière d'un organigramme, est **à refuser** : `affectationRules.js` et le solveur raisonnent sur la hiérarchie promotion > TD > TP, et une profondeur arbitraire serait un développement par structure déguisé. `Filiere` devient facultative derrière une nature « parcours » ; la réponse Q-2 de conception-c5 (filière implicite créée d'office) est un contournement acceptable pour la transition, pas une cible.

### 4.6 Barèmes, versionnement

- **Barèmes** : d'accord avec l'étude (noyau). Préciser : `Bareme` (type numérique, ordinal, compétences ; échelons ordonnés), barème porté par l'évaluation et **figé** une fois une note saisie ; une note porte valeur **ou** échelon, plus un état. La conversion entre barèmes (lettres vers sur 20) est un calcul, donc du code (4.7).
- **Versionnement** : une définition ne se supprime jamais (D-18) ; renommer change le libellé, pas le `code` ; changer de type crée un nouveau code ; retirer masque la saisie mais garde l'affichage et l'export des valeurs passées ; une année close (D-19) garde la version des définitions de sa clôture. Une valeur JSON dont le code n'a plus de définition active s'affiche « champ retiré », jamais ne disparaît.

### 4.7 Ce qui ne s'adapte pas sans développement

Le chef doit l'entendre clairement : **la configuration couvre la saisie, l'affichage, l'import, l'export et les obligations ; elle ne couvre pas le calcul.** Demandent du code : un nouveau calcul (moyenne pondérée inédite, frais au prorata), une nouvelle règle du solveur, un nouveau document officiel (bulletin d'un pays), un nouvel échange avec l'État, un nouveau moyen de paiement, et tout champ qui doit servir à l'un d'eux. Le principe qui tient la promesse : ce code s'écrit **pour un profil ou un pack, jamais pour une école**, et un champ propre utile à un calcul est **promu** au noyau par une migration ordinaire (le code du champ devient une colonne, les valeurs sont recopiées).

### 4.8 Ce qu'on prend et ce qu'on évite chez les autres

| Produit | Mécanisme (documentation publique, à revérifier avant citation externe) | À prendre | À éviter |
|---|---|---|---|
| Odoo | Studio crée de vraies colonnes (`x_studio_…`) ; depuis la version 16, des champs « propriétés » en JSONB, définis sur un enregistrement parent | les propriétés : définitions portées par un contexte (ici : profil, école), valeurs en JSON | les colonnes par client : chaque montée de version devient un projet |
| Salesforce | champs déclarés par métadonnées, nom d'API stable (`__c`), plafond par objet, suppression réversible | code stable, plafond, retrait réversible, historique | l'ampleur (règles, formules) : c'est un langage, pas un formulaire |
| OpenEduCat (sur Odoo) | hérite d'Odoo | rien de spécifique | avis relevés le 15 nov. : paramétrage qui exige un connaisseur d'Odoo, rapports à refaire ([Failles des ERP scolaires](../../etude-marche/reports/Failles%20des%20ERP%20scolaires.md)) : l'inverse de « sans discussion technique » |
| Classter | champs fixes | — | un avis de 2024 se plaint de champs inutiles **impossibles à retirer** : prévoir « masqué » dès le départ |

## 5. Essai PostgreSQL (taille M) : critères proposés

Réorientation : **pas de RLS** dans l'essai (sans objet à 10 écoles) ; il juge la souplesse, la sûreté des migrations et le prix réel. Durée bornée : si l'essai dépasse sa taille, c'est déjà un résultat (« la bascule coûte plus que M »).

1. **Prix de la bascule** : la suite d'intégration passe sur PostgreSQL 18 ; nombre de fichiers touchés hors `models/` et migrations relevé. Seuil : au plus 15 fichiers applicatifs et aucun changement d'API.
2. **Schéma de départ** : la base neuve se crée sur PostgreSQL depuis un schéma de départ (PLA-03b) sans rejouer les 62 migrations MySQL ; le test d'équivalence de schéma passe.
3. **Champs propres, même prototype sur les deux moteurs** : 5 000 personnes, 30 champs propres ; filtre et tri sur un champ propre sous 50 ms au 95e centile, sans index ; validation de 1 000 lignes importées sous 2 s. Si les deux passent : égalité.
4. **Migration interrompue** : une migration de trois instructions échoue à la deuxième. PostgreSQL : rien n'est appliqué. MySQL : mesurer le temps de remise en état par la procédure D-16 (sauvegarde puis reprise) ; s'il reste sous 15 minutes pour une école, l'avantage est jugé mineur à 10 écoles.
5. **Exclusion partielle** : une contrainte refuse deux séances actives non forcées dans la même salle sur des plages qui se chevauchent, toutes grilles confondues, et laisse passer le forçage. Noter ce que MySQL ferait à la place (verrou et contrôle sous transaction, déjà en place).
6. **Collations** : connexion par identifiant et par adresse insensible à la casse ; unicité de l'identifiant ; recherche d'un nom sans accent, en français et en arabe. Seuil : même comportement que MySQL, sans `citext` dispersé dans le code.
7. **Mémoire** : PostgreSQL de Planner avec 10 bases, à côté du MySQL de StudyLib, sous 1,5 Gio au total en charge de PLA-06 (n8n intact).
8. **Sauvegarde et restauration d'une école seule** à une heure donnée, chiffrée à clé publique (R-6), dans les objectifs du 26 oct. (15 min de perte, 4 h pour rétablir).
9. **Reprise d'HESTIM** : un jeu fictif à son schéma réel (`seed.js`) converti de MySQL vers PostgreSQL ; mêmes comptes de lignes, mêmes parcours verts.

**Règle de décision proposée** : on bascule seulement si 1, 2, 7, 8 et 9 passent **et** si 4 ou 5 apporte un gain que le chef juge décisif. Sinon : **rester sur MySQL**, garder le rapport comme prix d'une bascule future, et l'écrire dans `decisions.md`.

## 6. Ce que l'étude n'a pas vu

| N° | Sujet | Constat | Proposition |
|---|---|---|---|
| O-1 | Sécurité | 23 fichiers hors contexte (§ 2) ; les identifiants entiers se répètent d'une école à l'autre, et les compteurs de limite d'API sont partagés (plan de PLA-06, § 2) | reprise des 23 fichiers et mode strict **avant** la 2e école, quel que soit le moteur ; c'est déjà dans 17-essai, à rendre bloquant pour EXP-06 |
| O-2 | Légal, loi 09-08 | des champs créés par l'école sont de **nouveaux traitements** : finalités et catégories hors de ce que l'école a déclaré à la CNDP ; un champ libre recueille vite santé, religion ou situation familiale | l'école reste responsable du traitement, Planner sous-traitant : le dire au contrat ; à la création d'un champ, classe obligatoire, liste de mots refusés (santé, maladie, allergie, CIN…) **en aide, pas en garantie** ; pas de texte long sur un mineur ; avis d'un juriste avant d'ouvrir les champs libres (étape 2 de Q-30-3) |
| O-3 | Effacement | `services/desactivation/anonymisation.js` ne connaît pas les champs JSON | l'anonymisation lit les classes des définitions et vide les champs personnels ; test de régression |
| O-4 | Migrations | la séparation personne-compte (4.1) est la plus lourde du projet ; l'étude ne la chiffre pas | conception à part dans VSC-01, ordonnée **avant** VSC-02 ; preuve qu'HESTIM ne voit rien changer (conception-c5, § 6) |
| O-5 | Sauvegardes | une restauration d'une école doit ramener ses définitions avec ses valeurs | définitions dans la base de l'école (oui : D-21), jamais dans la Plateforme |
| O-6 | Performance | aucun risque de volume ; le seul risque est la mémoire des pools et des tâches de chaque minute | régler `pool` dans `db.js` (2 à 3 par école) dès PLA-01 |
| O-7 | Collations | `utf8mb4_0900_ai_ci` confond « é » et « e » dans une unicité : deux identifiants « elodie » et « élodie » se heurtent | choisir une seule collation, dire si cette égalité est voulue pour les identifiants, et la tester |
| O-8 | Équipe | la bascule tombe sur une personne, en pleine EXP-02b et MOT | l'essai ne doit pas retarder EXP-02b : s'il n'est pas fini, EXP-02b part sur MySQL |
| O-9 | Données d'HESTIM | une bascule convertit des données réelles (EXP-02) | critère 9 de l'essai ; aucune donnée réelle dans le dépôt pour le faire |
| O-10 | Contradiction de décisions | la réponse Q-1 de conception-c5 (« un élève est un `Etudiant` », retenue le 8 nov.) et « un élève a un compte » (8 nov.) s'opposent à 4.1 | les rouvrir explicitement (§ 7, questions 1 et 2) |

## 7. Questions au chef

| N° | Question | Proposition |
|---|---|---|
| 1 | Séparer la personne du compte (4.1), et faire cette migration **avant** les tables du scolaire ? | oui : conception dans VSC-01, migration L à XL ordonnée avant VSC-02 ; elle remplace la réponse Q-1 de conception-c5 pour ce qui touche `Etudiant` |
| 2 | « Un élève a un compte » (8 nov.) devient-il « un élève **peut** avoir un compte, selon le profil » ? | oui : en maternelle et au primaire, compte facultatif ; l'accès passe par le responsable légal |
| 3 | L'identifiant de connexion est-il unique **dans l'école** (et non sur toute la plateforme) ? | oui ; l'école vient de l'adresse (D-02) ; l'adresse électronique reste un second moyen de connexion quand elle existe |
| 4 | Moteur : accepter « rester sur MySQL » comme issue par défaut de l'essai, avec la règle de décision du § 5 ? | oui |
| 5 | L'essai PostgreSQL sans RLS, et sans retarder EXP-02b ? | oui ; s'il n'est pas fini quand EXP-02b est prête, EXP-02b part sur MySQL |
| 6 | PLA-06 réduite à 50 bases, puisque l'horizon est de 10 écoles ? | oui ; le seuil de 200 reste une mesure de marge, plus une condition |
| 7 | La reprise des 23 fichiers hors contexte devient-elle bloquante avant toute 2e école ? | oui, rattachée à PLA-01, condition de EXP-06 |
| 8 | Les champs propres stockés en JSON par entité, avec définitions déclarées, sans EAV ni colonne par école ? | oui (4.3) |
| 9 | Plafond de champs propres actifs par entité et par école ? | 30 ; relevable par la Plateforme, jamais par l'école |
| 10 | Champs libres de l'école (étape 2 de Q-30-3) : après avis d'un juriste sur la loi 09-08 ? | oui ; d'ici là, seuls les champs des profils et des packs pays |
| 11 | Pas de type « texte long » sur un élève ni un responsable ? | oui ; les remarques passent par des objets du noyau (observation datée, auteur) |
| 12 | Hiérarchie : natures fixes dans le code, noms par l'école, trois niveaux au plus, groupes transversaux hors arbre ? | oui (4.5) ; pas de profondeur libre |
| 13 | Ajouter un profil maternelle (Q-08) pour porter ses obligations de champs, même sans génération d'emploi du temps ? | oui : profil de données d'abord, génération plus tard (Q-07) |
| 14 | Contrainte en base contre la double réservation : à quelle condition ? | seulement sur les séances non forcées, et seulement si le moteur la permet (PostgreSQL) ; sous MySQL, garder le contrôle sous verrou et un test de régression |
| 15 | Le principe de 4.7 (« du code par profil ou pack, jamais par école ; un champ utile à un calcul est promu au noyau ») est-il écrit dans `decisions.md` à côté de Q-30-4 ? | oui |
