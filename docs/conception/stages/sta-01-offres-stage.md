# STA-01 · Offres de stage (espace Carrière)

**Statut** : plan écrit le 19 novembre 2026, pour le chef de projet. Le code suit dans la même
branche, comme demandé, et la PR attend sa relecture.

**Fonction** : STA-01, [fiche du module](../../plan/modules/STA-stages-alternance.md) — « offres de stage
(espace Carrière) », taille M, **sans dépendance**, seule fonction des modules du supérieur et de la
formation professionnelle classée « Libre » dans [le plan](../../plan/README.md), § 2.

## 1. Pourquoi cette fonction maintenant

- Le site promet **« stages »** dans « Bientôt » aux deux publics que le chef a fixés : l'enseignement
  supérieur et les centres de formation professionnelle ([solutions](../../conception/vitrine/vit-05-solutions.md), § 4).
- INS, DOC, FOR, VSC-06 et les crédits du LMD dépendent de VSC-02 ou de MOT-05, qui ne sont pas faits.
- Le socle serveur est vide : aucune table, aucune route, aucun service pour un stage ou une offre
  (vérifié le 19 novembre sur `main`, `736a8f7e`).

## 2. Décisions proposées au chef

| N° | Question | Proposition de ce plan |
|---|---|---|
| 1 | `b/offres-stage`, 816 commits derrière `main` et mêlant les écrans de stage au Studio quiz | **Fermer la branche**, la garder comme référence de lecture, et rebâtir sur `main` |
| 2 | Numéros de migration | **0083** pour `OffresStage` ; 0084 si une seconde table s'avère nécessaire (elle ne l'est pas ici) |
| 3 | Qui publie une offre | **L'administration, et un enseignant pour les filières dont il est responsable** ; l'étudiant consulte et partage, il ne publie pas. C'est la règle déjà appliquée aux annonces et à la préparation (`filieresDuResponsable`) |

## 3. Le modèle de données (migration 0083, table `OffresStage`)

| Colonne | Type | Règle |
|---|---|---|
| `id_offre_stage` | INTEGER, clé | |
| `titre` | STRING(150) | obligatoire, 5 à 150 caractères |
| `entreprise` | STRING(150) | obligatoire, 2 à 150 |
| `ville` | STRING(100) | obligatoire, 2 à 100 |
| `description` | TEXT | obligatoire, 30 à 5 000 caractères, texte brut |
| `id_filiere` | INTEGER, FK `Filiere`, `ON DELETE SET NULL` | facultatif ; obligatoire pour un enseignant |
| `niveau` | STRING(50) | facultatif (2A, 3A, licence 3…), liste lue dans les groupes de la filière |
| `debut`, `fin` | DATEONLY | facultatifs, `fin` ≥ `debut` ; lus et rendus sous la forme `AAAA-MM-JJ`, sans heure (les écrans saisissent un jour, pas un instant) |
| **`gratification`** | **DECIMAL(10,2)** | **le prix : montant mensuel brut, facultatif, 0 à 100 000, deux décimales** |
| **`devise`** | **CHAR(3)** | **`MAD` par défaut ; liste fermée `DEVISES` du référentiel** |
| `lien_candidature` | STRING(500) | facultatif, **http ou https seulement** (jamais `javascript:`) |
| `contact_email` | STRING(190) | facultatif, format vérifié |
| `statut` | ENUM(`brouillon`, `publiee`, `close`) | `brouillon` par défaut |
| `jeton_partage` | CHAR(32), unique | 16 octets aléatoires en hexadécimal, posé à la première publication |
| `publiee_le` | DATEONLY | posée à la publication |
| `id_user_auteur` | INTEGER, FK `Users`, `ON DELETE CASCADE` | obligatoire |
| `createdAt`, `updatedAt` | DATE (horodatage) | |

Index : `statut`, (`id_filiere`, `niveau`), unique sur `jeton_partage`.

La gratification est un **montant affiché tel quel**, jamais un calcul : Planner n'est pas comptable
de l'école ici (FIN reste propriétaire des frais et des reçus).

## 4. Les routes

| Méthode | Chemin | Qui | Règle |
|---|---|---|---|
| GET | `/api/offres-stage` | tout compte connecté | étudiant : les offres `publiee` seulement ; administration et enseignants : toutes. Filtres `statut`, `id_filiere`, `niveau` |
| GET | `/api/offres-stage/:id` | tout compte connecté | un étudiant sur un brouillon : **404**, comme une offre qui n'existe pas |
| POST | `/api/offres-stage` | administration, responsable de filière | crée en `brouillon` ; 403 pour les autres rôles |
| PUT | `/api/offres-stage/:id` | auteur ou administration | autre auteur : **404** (on ne révèle pas l'existence de l'offre d'un autre) |
| POST | `/api/offres-stage/:id/publication` | auteur ou administration | `brouillon` → `publiee` (données complètes exigées), `publiee` → `close`, `close` → `publiee` |
| DELETE | `/api/offres-stage/:id` | auteur ou administration | **refusée tant que l'offre est `publiee`** (la fermer d'abord) |
| GET | `/api/offres-stage/publiques/:jeton` | **public, sans compte** | offre `publiee` seulement, sinon 404 ; charge utile réduite, sans auteur ni statut |

La route publique est montée **avant** `authenticateToken`, avec un limiteur de débit par adresse
(60 lectures par quart d'heure), `Cache-Control: no-store` et `X-Robots-Tag: noindex` : un lien de
partage ne doit ni s'indexer, ni se balayer indéfiniment.

## 5. Sécurité, point par point

- **Même garde que le reste du serveur** : `authenticateToken`, `planification` (format d'erreur
  commun `{ message, code }`), CSRF déjà posé globalement par `app.js` sur les écritures.
- **Aucune donnée d'élève** dans ce module : des offres et un contact d'entreprise, fournis par
  l'école. Rien à anonymiser, rien de la loi 09-08 à porter.
- **Deux secrets distincts** : le partage se fait par `jeton_partage` (aléatoire, 128 bits), jamais
  par l'identifiant numérique ; deviner un jeton est hors de portée, et le jeton ne donne que la
  lecture d'une offre publiée.
- **Réponses indistinguables** : offre d'un autre auteur, brouillon vu par un étudiant, offre
  inexistante et offre fermée hors session répondent le même corps 404.
- **Injection** : le lien de candidature est validé par `URL` avec liste blanche de protocoles ;
  les textes sont rendus par React (échappés), jamais par `dangerouslySetInnerHTML`.
- **Débit** : limiteur dédié sur la route publique, et limiteur sur les écritures quand le module
  sera ouvert à tous les enseignants.

## 6. Les écrans

**Web** (`/offres-stage`, entrée « Offres de stage » au menu de l'administration, de l'enseignant
responsable de filière (`estResponsable`) et de l'étudiant) :

1. liste : recherche, filtre par filière et par niveau, badge du statut pour le personnel, prix
   affiché « 1 500 MAD / mois » ;
2. formulaire de création et de modification (dialogue), avec le champ **gratification** et la
   devise, et le bouton « Publier », « Fermer » ;
3. bouton « Copier le lien de partage » sur une offre publiée.

**Page publique** (`/offres-stage/p/:jeton`, sans connexion) : la même fiche en lecture seule, sans
navigation, avec le nom de l'école et le contact, et un message si l'offre est fermée ou le lien
inconnu.

**Mobile** (écran `stage/offres`, ouvert depuis Bibliothèque → Stages → « Offres de stage ») : la
liste publiée, filtrable par filière, et la fiche. La publication reste sur le web, comme les
annonces : l'application mobile reçoit, elle ne rédige pas.

Textes en français et en anglais dans un espace propre (`offresStage`), jamais en dur dans les écrans.

## 7. Tests

- **Backend, unitaires** : validation des champs (prix, devise, dates, lien), transitions de statut,
  refus de suppression d'une offre publiée.
- **Backend, intégration** : création par un responsable, 403 pour un enseignant non responsable,
  brouillon invisible pour l'étudiant, 404 pour l'auteur d'un autre, partage public d'une offre
  publiée et 404 d'une offre fermée, limiteur de débit.
- **Web** : tests unitaires du formateur (prix et dates) et des filtres, `src/utils/offresStage.test.js`
  (`node --test`). Pas de parcours Playwright : il faudrait une base MySQL et le solveur, absents de
  ce poste ; la CI les a, mais un parcours non joué localement part en aveugle.
- **Mobile** : tests unitaires des règles d'affichage et des filtres, `__tests__/offresStage.test.js`
  (`jest`) ; l'écran lui-même est couvert par ces fonctions pures, comme les autres écrans.

## 8. Ce qui reste hors de ce lot

- STA-02 (conventions, tuteur, présence en entreprise, jalons) : il attend FOR-01.
- La modération d'offres déposées par des entreprises extérieures (le chef a demandé que l'école
  publie) ; le champ `statut` et le jeton de partage la préparent sans la décider.
- Les avis de stage déjà rendus aux étudiants par StudyLib (`mobile/src/app/stage/partager.jsx`) :
  autre objet, autre espace, non touché.
