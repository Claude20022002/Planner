# BIB · Bibliothèque

**Objet** : les documents et les fichiers de Planner. La Bibliothèque est **StudyLib**, une application Laravel dans un dépôt séparé (`../StudyLib`), servie sous `/biblio`. Elle garde aussi les fichiers de l'espace de cours. Le module couvre :
- le lien entre Planner et StudyLib ;
- les médias du Studio quiz ;
- les documents servant de source à l'IA.

**Hors module** :
- l'organisation pédagogique des supports : COU ;
- le Studio quiz lui-même : QJE.

## Ce qui existe

- **StudyLib** utilise MySQL (base `studylib`), Redis, MinIO (seau `studylib`) et Meilisearch 1.12. Elle est mise à jour par paquets, hors de la CI.
- **Côté Planner** :
  - `integrationRoutes` synchronise le référentiel et publie le JWKS pour l'identité ;
  - `services/cours/studylib.js` ;
  - l'onglet `bibliotheque` de l'application mobile.
- **Pour les parcours** : une fausse Bibliothèque, `frontend/tests/parcours/fausseBibliotheque.mjs`.
- **Bibliothèque reconstruite, socle (BIB-05, branche `feat/bib-05-modele-stockage`)** : migration 0087 (`DocumentsBibliotheque` avec `uid`, `NotesDocuments`, `TelechargementsDocuments` sans IP), modèles dans `models/bibliotheque.js` ; `services/bibliotheque/` : `fichiers.js` (PDF, DOC, DOCX, PPT, PPTX, 20 Mo, signature du contenu), `stockage.js` (MinIO par `@aws-sdk/client-s3`, seau `planner`, clé `ecoles/<école>/bibliotheque/<uid>`, liens signés de 5 minutes, toute clé hors de l'école refusée), `documents.js` (service interne, sans route). Variables `S3_*` facultatives ; sans clé, 503. [Conception](../../conception/bibliotheque/bib-05-modele-stockage.md).
- **Isolation** : StudyLib n'existe aujourd'hui que pour HESTIM. Les canaux I-4 (jetons sans école) et I-5 (une seule base et un seul seau) restent ouverts. **Une seconde école n'a pas de Bibliothèque** jusqu'à BIB-02.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| BIB-01 | Identifiants stables (`uid`) des entités partagées, et envois par boîte d'envoi (D-14, D-15) | ME-2d | 2 | M | PLA-01 | à faire |
| BIB-02 | StudyLib par école : base et seau par école, jetons avec l'école (`tid`), canaux I-4 et I-5 fermés | ME-2e | 5 | M | BIB-01 | à faire |
| BIB-03 | Médias du Studio quiz (images, sons, vidéos) hors de la base, dans le stockage de fichiers | SQ-2 | libre | M | — | à faire |
| BIB-04 | Quiz généré par l'IA à partir d'un document de la Bibliothèque | IA-6 | libre | M | QJE-07 | à faire |
| BIB-05 | Bibliothèque physique : catalogue (import par ISBN), exemplaires, prêts et retours par code-barres ou QR code depuis le téléphone, retards, réservations ; pénalités décidées par l'école, jamais automatiques pour un enfant | — | libre | M | — | à faire |

## Critères de « terminé »

- **BIB-02** : deux écoles ont chacune leur Bibliothèque ; un jeton de l'une est refusé par l'autre ; un test le prouve.
- **BIB-03** : la base ne contient plus de média ; un quiz exporté puis réimporté garde ses médias.
- **BIB-05** : un prêt se fait en deux scans (l'élève, puis le livre) ; un retard prévient l'élève et, au primaire, sa famille.

## Exigences produit

EP-12.

## Références

- [Audit d'isolation, I-4 et I-5](../../conception/plateforme/18-audit-isolation.md)
- Archives : [quiz par l'IA](../../archives/plans/quiz-ia.md), [Studio quiz](../../archives/plans/studio-quiz.md)
