# Session du 2026-11-22 · BIB-05 · `feat/bib-05-modele-stockage`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session « BIB » |
| Chantier | BIB, **exception hors chantier** du chef (21 nov., lots B1 à B8) |
| Dossier de travail | `..\travaux-planner\bib-05-modele-stockage` |
| Dernier commit | voir `git log` (la fiche est le dernier commit de la branche) |

## Objectif de la session

Ouvrir la session « BIB » ([fiche de mission](../plan/missions/bib-reconstruction.md), branche `doc/coordination-equipe`) : poser au chef les questions 1 à 5 de la fiche et les miennes, écrire le plan de BIB-05 et le faire valider, puis coder BIB-05 (lots B1 et B2 de l'étude StudyLib : modèle, migration 0087, stockage S3 par école).

## Plan

[docs/conception/bibliotheque/bib-05-modele-stockage.md](../conception/bibliotheque/bib-05-modele-stockage.md), **validé par Claude20022002 le 22 nov.** (outil de questions, « Validé », sans réserve), commité seul (`da122bb8`).

## Fait

| Commit | Contenu |
|---|---|
| `da122bb8` | plan de conception, validé, seul |
| `b63f7e83` | `@aws-sdk/client-s3` et `@aws-sdk/s3-request-presigner` **3.1164.0**, versions exactes (publiées le 6 nov. ; la dernière, 3.1175.0, datait de la veille). `npm audit` : les 11 alertes modérées de `main` (Jest, nodemon), rien de nouveau |
| `5691fe48` | migration `0087-bibliotheque.js` (trois tables neuves) ; `models/bibliotheque.js` ; ajouts à `definitions.js` (3 lignes) et `index.js` (3 lignes) |
| `95624334` | `services/bibliotheque/fichiers.js` : cinq formats, 20 Mo, signature du contenu (OLE ajoutée pour `.doc` et `.ppt`), empreinte SHA-256 ; 19 tests unitaires |
| `976b2da9` | `services/bibliotheque/stockage.js` : seau unique, clé `ecoles/<école>/bibliotheque/<uid>`, refus de toute clé hors de l'école courante, liens signés de 5 minutes en pièce jointe, 503 sans configuration ; `tests/helpers/fauxS3.js` ; 19 tests unitaires |
| `f6cb30a0` | `services/bibliotheque/documents.js` : `enregistrerDocument`, `trouverParUid`, `lienTelechargement`, `supprimerDocument` ; test d'intégration à deux écoles (13 tests) |
| `16208e75` | variables `S3_*` dans le service `backend` de `docker-compose.yml` (clés facultatives) et dans `backend/.env.example` (ajouts seulement, réponse 6) |
| *(ce commit)* | fichier du module BIB (une puce dans « Ce qui existe ») et cette fiche |

**Écarts au plan**, tous mineurs :

- `supprimerDocument` retire la ligne et le fichier **dans une même transaction** : si le stockage refuse, la ligne revient (rollback), et rien n'est supprimé. Le plan disait « la ligne, puis le fichier », sans dire ce qui se passe si le fichier ne part pas.
- L'`uid` accepte **toute version d'UUID** en minuscules, et pas seulement la version 4 : les UUID de StudyLib (Laravel 13) peuvent être d'une autre version, et la reprise doit les garder tels quels.
- Le dépôt envoie l'empreinte SHA-256 à MinIO (`ChecksumSHA256`). MinIO **refuse un contenu altéré en route** : c'est vérifié sur un vrai MinIO.
- Le test d'intégration crée une base `hestim_test_bib_b` et la supprime à la fin.

## Vérifié

- **Tests unitaires du serveur** (`npm test`) : **555 sur 555**, 37 fichiers, dont les 38 tests nouveaux.
- **Tests d'intégration** (`npm run test:integration`, sur un MySQL 8.4.13 à part, port 3313, pour ne pas toucher la base de test des autres sessions) : **61 fichiers sur 64, 614 tests sur 643**. Le test à deux écoles fait **13 sur 13**. Les 29 échecs sont **tous des délais dépassés (30 s) dans les préparations** (`beforeAll`, `beforeEach`), dans trois fichiers que BIB-05 ne touche pas. Aucune assertion n'a échoué :
  - `contexteEtablissement.test.js` (11) : il **échoue de la même façon sur `main`** avec cette base (migrer deux bases en 30 s ne passe pas sur ce poste) ;
  - `enseignants.test.js` (15) et `notifications.test.js` (3) : **lancés seuls, ils passent**, sur `main` comme sur la branche (18 sur 18).
  
  Pour arriver au bout, il a fallu donner 6 Go de mémoire à Node (`NODE_OPTIONS=--max-old-space-size=6144`). Avec la mémoire par défaut, deux passages complets se sont arrêtés au bout de 29 minutes, la mémoire saturée dans `notifications.test.js`. Ce fichier ne charge pas le SDK AWS : seul le test à deux écoles le charge. **La CI doit confirmer la suite complète.**
- **Mutation** : si l'on retire le contrôle du préfixe dans `stockage.js`, 2 tests d'isolation tombent.
- **`eslint .`** : 0 erreur, les 17 avertissements de `main`, sur les mêmes fichiers (aucun dans les fichiers de BIB-05 ; `definitions.js` passe de 584 à 587 lignes, comme prévu au plan).
- **`docker compose config`** (sans interpolation) : le fichier est valide, les cinq variables sont dans le service `backend`.
- **Essai à la main sur un vrai MinIO** (`pgsty/minio:RELEASE.2026-08-04T00-00-00Z`, la version du serveur), avec une clé dédiée limitée par une politique au seau `planner`. Script hors du dépôt. Les 14 contrôles passent :
  - dépôt sous `ecoles/defaut/bibliotheque/<uid>` ; lien signé, 200 ; empreinte du fichier reçu égale ; `Content-Disposition: attachment; filename*=UTF-8''…` ; type `application/pdf` ;
  - **reprise** : `Range: bytes=1000-` donne 206 et la suite exacte (N3) ;
  - lien modifié pour une autre clé : 403 ; durée allongée à la main : 403 ; seau sans signature : 403 ;
  - la clé de Planner ne peut pas écrire dans un autre seau (`AccessDenied`) ;
  - l'école `b` ne signe pas le fichier de `defaut` : 404 ;
  - après suppression, le lien répond 404 ; une seconde suppression passe sans erreur ;
  - un contenu dont l'empreinte est fausse est refusé (502), et rien n'est gardé.
- Reste à la CI : la suite complète, avec les parcours.

## Questions

Réponses du chef le 22 nov. (outil de questions), toutes conformes à la proposition. Le détail est au § 5 du plan.

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Préfixe ou seau par école (fiche, Q1) | un seau `planner`, un préfixe par école | tranchée |
| 2 | Redéployer StudyLib (fiche, Q2 ; EXP-02) | **ne pas la redéployer** | tranchée ; **à reporter dans EXP-02** |
| 3 | Vidéos YouTube (fiche, Q3) | ne pas les reprendre dans BIB-05 à BIB-08 | tranchée |
| 4 | Durée de publication de l'image StudyLib (fiche, Q4) | jusqu'à BIB-08 vérifiée, plus un mois | tranchée |
| 5 | Retrait du jeton d'intégration, des audiences `studylib` et du JWKS (fiche, Q5) | une fonction à part, après BIB-08 | tranchée ; **fonction à inscrire** par le coordinateur |
| 6 | Accès de Planner à MinIO | clé dédiée, limitée au seau ; variables ajoutées par l'agent à `docker-compose.yml` et `backend/.env.example` | tranchée (sortie de périmètre accordée pour ces deux fichiers) |
| 7 | Servir un téléchargement | lien MinIO signé, 5 minutes, en pièce jointe | tranchée |
| 8 | Recevoir un dépôt | par le serveur, en corps brut | tranchée ; **BIB-07** passera le dépôt multipart de l'espace de cours à ce format |
| 9 | Journal des téléchargements | compte, document, date ; sans IP ni navigateur ; 12 mois | tranchée ; **l'effacement après 12 mois est dans BIB-06** |
| 10 | Suppression | réelle | tranchée |
| 11 | Tests du stockage | faux S3 en mémoire, plus un essai local sur un vrai MinIO | tranchée |
| 12 | Rattachement | `Cours` obligatoire, six types, année facultative | tranchée |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : **BIB-05 → faite sur sa branche, à relire** (plan validé, code et tests faits, pas encore poussée).
- Chantier : exception hors chantier BIB (B1 à B8). Reste à la session « BIB » : BIB-06, BIB-07, BIB-08.
- Pour le coordinateur :
  - **décisions à inscrire** dans `decisions.md` : réponses 1 à 12 ;
  - **EXP-02** : StudyLib n'est pas redéployée (réponse 2) ;
  - **fonction à créer**, après BIB-08 : le retrait du jeton d'intégration, des audiences `studylib` et du JWKS public (réponse 5) ;
  - **PLA-01** : le préfixe des fichiers suit `contexteCourant().nom` (`defaut` pour l'école pilote). Si PLA-01 change cet identifiant, il faut déplacer les objets de l'école et réécrire `cle_fichier` dans le même lot (plan, § 12) ;
  - **`docker-compose.yml`** : 7 lignes ajoutées dans le service `backend`, juste après `STUDYLIB_API_URL`. Le correctif de Meilisearch (agent de Cursor) touche le même fichier, mais d'autres services : il n'y a pas de conflit attendu, sauf s'il retire aussi `STUDYLIB_API_URL`.
- Conteneur laissé en marche sur le poste : `hestim_mysql_test_bib` (MySQL de test, port 3313), gardé pour BIB-06. On le retire avec `docker rm -f hestim_mysql_test_bib`. Le MinIO d'essai est déjà retiré.

## Reste à faire, dans l'ordre

1. Relecture de la branche par le coordinateur ; puis push et PR par le chef.
2. **Avant de déployer BIB-06** (pas BIB-05, qui n'ouvre aucune route), le chef crée sur le serveur le seau et la clé de Planner. La politique à créer, `politique-planner.json` :

   ```json
   {"Version":"2012-10-17","Statement":[
     {"Effect":"Allow","Action":["s3:GetObject","s3:PutObject","s3:DeleteObject"],"Resource":["arn:aws:s3:::planner/*"]},
     {"Effect":"Allow","Action":["s3:ListBucket"],"Resource":["arn:aws:s3:::planner"]}]}
   ```

   Puis les commandes `mc` du § 12 du plan, et `S3_CLE_ACCES` et `S3_CLE_SECRETE` dans `.env.docker`.
3. BIB-06 (API des documents, L) : branche `feat/bib-06-api-documents` (nom de la fiche de mission), **tirée de `feat/bib-05-modele-stockage`** (accord du coordinateur) ou de `origin/main` après la fusion de BIB-05 ; questions, puis plan **au chef** (API, droits) ; **contrat d'API d'abord**.

## Relecture du coordinateur (22 nov., session plan-b-projet-pacte-92)

**BIB-05 : prête pour la PR** (`34f7a170`). Il a relancé les 38 tests unitaires de la Bibliothèque et `verifier-neutre`, et relu la migration, les modèles, `stockage.js`, `documents.js`, `fichiers.js` et les ajouts à `docker-compose.yml` et `.env.example`. **La suite d'intégration complète doit être verte dans la CI avant la fusion.** Les réponses 1 à 12 du chef sont inscrites dans `decisions.md`.

À reprendre dans BIB-06 :

- **BIB-12** : c'est le nom de la fonction qui retire le jeton d'intégration, les audiences `studylib` et le JWKS public (réponse 5). Elle est à inscrire au module BIB pendant BIB-06.
- Trois points à mettre dans le plan de BIB-06 :
  1. `uid` et `origine` ne viennent **jamais du client** : seule la reprise (BIB-08) les fournit, et un test doit le prouver ;
  2. `envoyer()` de `stockage.js` écrit l'erreur S3 dans le journal du serveur avant de répondre 502 ;
  3. `filename*` encode aussi `'`, `(`, `)` et `*` (RFC 5987), ce que `encodeURIComponent` ne fait pas.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\bib-05-modele-stockage" push -u origin feat/bib-05-modele-stockage
gh pr create --base main --head feat/bib-05-modele-stockage --title "BIB-05 : modèle, migration 0087 et stockage S3 par école de la Bibliothèque" --fill
```

## Prompt de reprise

```text
Tu es la session « BIB » de Planner (Bibliothèque reconstruite, voie B validée par le chef le 21 nov.).
BIB-05 est faite sur feat/bib-05-modele-stockage (..\travaux-planner\bib-05-modele-stockage) :
plan validé (docs/conception/bibliotheque/bib-05-modele-stockage.md), migration 0087, models/bibliotheque.js,
services/bibliotheque/ (fichiers.js, stockage.js, documents.js), test à deux écoles ; relue par le coordinateur : prête pour la PR
(34f7a170), la CI doit être verte avant la fusion.
Lis d'abord AGENTS.md, docs/plan/README.md (§ 5 : le contrat d'API d'abord ; EP-5, EP-13, EP-18), docs/plan/suivi.md
et docs/plan/decisions.md (branche doc/coordination-equipe), la fiche de mission docs/plan/missions/bib-reconstruction.md,
l'étude docs/conception/bibliotheque/etude-studylib-pile.md (§ 1.2 : les règles à reprendre), le plan de BIB-05
et cette fiche (docs/sessions/2026-11-22-feat-bib-05-modele-stockage.md).
Prochain lot : BIB-06, l'API des documents (L), branche feat/bib-06-api-documents dans ..\travaux-planner\bib-06-api-documents,
tirée de feat/bib-05-modele-stockage (accord du coordinateur) ou de origin/main après la fusion de BIB-05.
Le plan de BIB-06 reprend les consignes de la relecture (section « Relecture du coordinateur » de cette fiche) :
uid et origine jamais fournis par le client (seule BIB-08 les donne), prouvé par un test ; erreur S3 écrite au journal
avant le 502 ; filename* encodé selon la RFC 5987 (' ( ) * compris) ; BIB-12 (retrait du jeton, des audiences, du JWKS)
inscrite au module BIB. Avant tout code : questions numérotées au chef (outil de questions),
par exemple sur les droits par rôle, la modération et l'avis à l'auteur, la recherche, les débits, l'interrupteur de l'école,
l'auteur montré sur un document d'élève et l'effacement du journal après 12 mois ; puis le plan (avec « Ce que disent les
études » et EP-18), validé par le chef, commité seul ; contrat d'API écrit et testé avant les routes (BIB-09 et BIB-10 l'attendent).
Lis ..\StudyLib sans le modifier (DocumentPolicy, ModerationService, RatingService, DocumentRepository::browse, routes/api.php).
Tout numéro de migration se demande au coordinateur. MySQL de test à part : hestim_mysql_test_bib, port 3313 (DB_PORT=3313).
Règles : pas de code avant le plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ; git add <fichiers> ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push. Lot fini : prévenir le coordinateur.
```
