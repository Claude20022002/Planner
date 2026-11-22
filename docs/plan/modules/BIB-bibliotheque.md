# BIB · Bibliothèque

**Objet** : les documents et les fichiers de Planner. La Bibliothèque est **StudyLib**, une application Laravel dans un dépôt séparé (`../StudyLib`), servie sous `/biblio`. Elle garde aussi les fichiers de l'espace de cours. Le module couvre :

**Voie B, validée par le chef le 21 nov.** ([étude StudyLib](../../conception/bibliotheque/etude-studylib-pile.md), branche `etude/bib-studylib-pile`) : la Bibliothèque est **reconstruite dans la pile de Planner**, en lots BIB-05 à BIB-11, par exception hors chantier ; StudyLib n'est pas redéployée tant que le chef n'en décide pas autrement. Les avis de stage et les idées de projet vont à STA (STA-03) ; les événements sont mis de côté.
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
- **Isolation** : StudyLib n'existe aujourd'hui que pour HESTIM. Les canaux I-4 (jetons sans école) et I-5 (une seule base et un seul seau) restent ouverts. **Une seconde école n'a pas de Bibliothèque** jusqu'à BIB-02.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| BIB-01 | Identifiants stables (`uid`) des entités partagées, et envois par boîte d'envoi (D-14, D-15) | ME-2d | 3 | M | PLA-01 | **absorbée** par BIB-05 (l'`uid` y devient une colonne ; plus de boîte d'envoi pour les documents), voie B, 21 nov. |
| BIB-02 | StudyLib par école : base et seau par école, jetons avec l'école (`tid`), canaux I-4 et I-5 fermés | ME-2e | 2 | M | BIB-01 | **absorbée** : un rangement par école dans BIB-05 et un test de PLA-04, voie B, 21 nov. |
| BIB-03 | Médias du Studio quiz (images, sons, vidéos) hors de la base, dans le stockage de fichiers | SQ-2 | 3 | M | — | à faire, sur le stockage de BIB-05 |
| BIB-04 | Quiz généré par l'IA à partir d'un document de la Bibliothèque | IA-6 | 3 | M | QJE-07 | à faire |
| BIB-05 | Modèle et stockage (lots B1, B2) : documents, notes, téléchargements, avec `uid` ; fichiers dans MinIO par `@aws-sdk/client-s3`, rangés par école ; liens signés | — | 3 | M + M | — | à faire : session Claude « BIB » ([fiche](../missions/bib-reconstruction.md)) ; migration 0087 réservée ; plan au chef |
| BIB-06 | API des documents (lot B3) : liste, filtres, recherche, dépôt, modération, note, téléchargement ; contrat d'API d'abord | — | 3 | L | BIB-05 | à faire : session « BIB » ; plan au chef |
| BIB-07 | Espace de cours sur le service interne (lot B5) : `services/cours/studylib.js` disparaît | — | 3 | M | BIB-06 | à faire : session « BIB » ; plan au coordinateur |
| BIB-08 | Reprise des données de l'école pilote (lot B7), lancée par le chef | — | 3 | M | BIB-06, volumes de l'étude (§ 3.2) | à faire : session « BIB » ; plan au chef |
| BIB-09 | Écrans web de la Bibliothèque, à la charte (lot B4) | — | 3 | L | contrat d'API de BIB-06 | à faire : Claude de VS Code ([fiche](../missions/bib-09-ecrans.md)) ; plan au chef |
| BIB-10 | Bibliothèque de l'application mobile sur l'API de Planner (lot B6) | — | 3 | M | BIB-06, UIX-10d | à faire : Claude de VS Code, après UIX-10d ([fiche](../missions/bib-10-mobile.md)) ; plan au coordinateur |
| BIB-11 | Import générique d'un dossier de documents par l'administration (lot B8), à la place de l'import Google Drive | — | 3 | M | BIB-06 | à faire : Alexis ([fiche](../missions/bib-11-import.md)) ; plan au coordinateur |

## Critères de « terminé »

- **BIB-05** : les tables des documents, des notes et des téléchargements existent, chaque document avec son `uid` ; les fichiers vont dans MinIO, rangés par école ; un lien signé est court et ne vaut que pour son fichier ; un test à deux écoles prouve qu'une école ne lit ni ne signe le fichier de l'autre (PLA-04).
- **BIB-06** : le contrat d'API est écrit et testé d'abord ; l'API reprend les règles de StudyLib (dépôt PDF, Word ou PowerPoint de 20 Mo au plus, modération des dépôts d'étudiants, publication directe pour l'enseignant et l'administration, note de 1 à 5, lien signé) ; 404 hors de l'école ; le test à deux écoles couvre chaque route.
- **BIB-07** : chaque `SupportCours.id_document` existant se résout ; un support se dépose sur une installation sans StudyLib.
- **BIB-08** : comptes égaux par table, empreinte SHA-256 de chaque fichier égale, chaque `SupportCours.id_document` résolu ; premier passage sur une copie, rapport au chef ; aucune donnée réelle dans le dépôt.
- **BIB-09** : les cinq écrans (liste et recherche, détail, dépôt, « Mes dépôts », modération) pour les trois rôles, à la charte, sans couleur en dur ; axe-core sans violation à 390 et 1280 px.
- **BIB-10** : les appels de la Bibliothèque de l'application mobile lisent l'API de Planner ; un téléchargement coupé reprend.
- **BIB-11** : un import avec des erreurs volontaires est rendu avec la liste lisible de ses refus ; rejoué, il ne crée aucun doublon ; aucun appel à un service extérieur.
- **BIB-03** : la base ne contient plus de média ; un quiz exporté puis réimporté garde ses médias.
- **Toute fonction qui fait télécharger un support ou un document** (BIB-06, BIB-09, BIB-10 compris) : le poids est affiché avant le téléchargement, et le téléchargement reprend après une coupure (N3, décision du chef du 21 nov. ; R10 de la [synthèse des concurrents](../../etude-marche/14-reprendre-et-depasser.md)).

## Exigences produit

EP-12.

## Références

- [étude StudyLib](../../conception/bibliotheque/etude-studylib-pile.md) (voie B, répartition des lots au § 8)
- [Audit d'isolation, I-4 et I-5](../../conception/plateforme/18-audit-isolation.md)
- Archives : [quiz par l'IA](../../archives/plans/quiz-ia.md), [Studio quiz](../../archives/plans/studio-quiz.md)
