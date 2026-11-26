# Mission · BIB-05 à BIB-08 · la Bibliothèque reconstruite dans Planner (côté serveur)

| | |
|---|---|
| État | ouverte : session Claude neuve « BIB » à ouvrir par le chef ; questions et plan de BIB-05 d'abord |
| Agent | **session Claude neuve « BIB »** (répartition du chef, 21 nov.) |
| Modèle recommandé | le plus capable (Claude Fable 5.2, sinon Opus 5.5) : migrations, nouvelle dépendance, liens signés, isolation par école, reprise de données réelles |
| Attribuée le | 2026-11-22, par le coordinateur ; accord du chef : oui, le 21 nov. (voie B, exception hors chantier pour B1 à B8, `@aws-sdk/client-s3`, répartition du § 8) |
| Module et chantier | [BIB](../modules/BIB-bibliotheque.md) · **exception hors chantier** (chef, 21 nov.) : aucun quatrième chantier |
| Fonctions | BIB-05 (modèle, migrations, stockage S3), BIB-06 (API des documents), BIB-07 (espace de cours sur le service interne), BIB-08 (reprise des données de l'école pilote) · tailles M + M, L, M, M |
| Branches | une par lot, depuis `origin/main` : `feat/bib-05-modele-stockage`, `feat/bib-06-api-documents`, `feat/bib-07-espace-cours`, `feat/bib-08-reprise` |
| Dossiers de travail | `..\travaux-planner\bib-05-modele-stockage`, puis un dossier par lot, du même nom que sa branche |
| Plans de conception | à écrire dans `docs/conception/bibliotheque/`, un par lot · validés par **le chef** pour BIB-05 (migration, dépendance, sécurité des liens), BIB-06 (L) et BIB-08 (données réelles) ; par **le coordinateur** pour BIB-07 (M, sans migration) |

## L'étude à suivre

[Étude StudyLib](../../conception/bibliotheque/etude-studylib-pile.md), branche `etude/bib-studylib-pile` (ou `main` après sa fusion) : § 1 (ce que fait StudyLib), § 2.2 (voie B, lots B1 à B8), § 3 (la reprise), § 4 (ce qui est absorbé), § 8 (répartition). Le dépôt `..\StudyLib` se lit **sans le modifier**, pour reprendre ses règles.

## Ordre

BIB-05, puis BIB-06. Ensuite BIB-07, en parallèle de BIB-09 (web, Claude de VS Code) et BIB-10 (mobile). Puis BIB-08, quand le chef a donné les volumes (§ 3.2). BIB-11 (import, Alexis) vient après.

## Critère de « terminé »

Recopié du [module BIB](../modules/BIB-bibliotheque.md) :

- **BIB-05** : les tables des documents, des notes et des téléchargements existent, chaque document avec son `uid` (D-15) ; les fichiers vont dans MinIO par `@aws-sdk/client-s3`, rangés **par école** (préfixe ou seau, tranché dans le plan avec PLA-07) ; un lien signé est court et ne vaut que pour son fichier ; **un test à deux écoles** prouve qu'une école ne lit ni ne signe le fichier de l'autre (PLA-04).
- **BIB-06** : le **contrat d'API est écrit et testé d'abord** (README du plan, § 5) ; l'API reprend les règles de StudyLib (§ 1.2 de l'étude : liste filtrée, recherche, dépôt PDF, Word ou PowerPoint de 20 Mo au plus, modération des dépôts d'étudiants, publication directe pour l'enseignant et l'administration, note de 1 à 5, téléchargement par lien signé) ; le poids est rendu avant le téléchargement, et le lien accepte la reprise après coupure (N3) ; 404 hors de l'école ; le test à deux écoles couvre chaque route.
- **BIB-07** : l'espace de cours dépose, publie et retire ses supports par le service interne ; `services/cours/studylib.js` disparaît ; chaque `SupportCours.id_document` existant se résout ; un support se dépose sur une installation sans StudyLib.
- **BIB-08** : un script de reprise idempotent, rejouable par `uid` (§ 3.3 à 3.5 de l'étude) ; comptes égaux par table, empreinte SHA-256 de chaque fichier égale, chaque `SupportCours.id_document` résolu ; premier passage sur une copie, rapport montré au chef ; **le chef lance la reprise** ; aucune donnée réelle dans le dépôt.

## Périmètre d'écriture

L'agent peut modifier :

- `backend/services/bibliotheque/` (fichiers nouveaux), **sauf `backend/services/bibliotheque/import/`**, réservé à BIB-11
- `backend/routes/`, `backend/controllers/`, `backend/models/` : les fichiers nouveaux de la Bibliothèque ; dans `backend/app.js` et `backend/models/index.js` (ou `definitions.js`), **des ajouts seulement**
- `backend/migrations/` : les numéros réservés pour lui dans `suivi.md` (0087 pour BIB-05 ; tout autre numéro se demande au coordinateur)
- `backend/package.json` et `backend/package-lock.json` : `@aws-sdk/client-s3` et `@aws-sdk/s3-request-presigner`, dans BIB-05 seulement
- `backend/services/cours/` et `backend/routes/espaceCoursRoutes.js` : dans BIB-07 seulement
- `backend/tests/` : les tests de ses lots
- `docs/conception/bibliotheque/` (ses plans et le contrat d'API), le fichier du module BIB, ses fiches de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `frontend/src/` et `mobile/src/` : BIB-09 et BIB-10 (Claude de VS Code)
- `backend/services/bibliotheque/import/` : BIB-11 (Alexis)
- les fichiers de STA (`backend/services/stages/`, `offreStageRoutes.js`, `OffreStage.js`) : STA-01 et STA-03 (Alexis)
- `backend/services/studio/` : QJE-14
- `docker-compose.yml` et `deploy/` : le correctif de Meilisearch (agent de Cursor) ; tout changement de déploiement se demande
- le dépôt `..\StudyLib` (lecture seule)
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- **Voie B**, en lots livrables ; exception hors chantier pour B1 à B8 ; `@aws-sdk/client-s3`, avec `@aws-sdk/s3-request-presigner` pour les liens signés (chef, 21 nov.).
- **BIB-01 et BIB-02 sont absorbées** : l'`uid` devient une colonne de BIB-05 ; la Bibliothèque par école devient un rangement par école dans BIB-05 et un test de PLA-04 (§ 4 de l'étude).
- Les **événements sont mis de côté** : ni repris ni reconstruits ; ils restent dans la sauvegarde et reviennent avec COM ou les annonces.
- Les avis de stage et les idées de projet vont à **STA-03** (Alexis), pas dans la Bibliothèque ; l'IA passe par le service de Planner.
- MinIO sert à tous les fichiers de Planner (Q12) ; BIB-03 et COU-02 se poseront sur le stockage de BIB-05.
- StudyLib ne tourne plus nulle part ; ses données ne vivent que dans les sauvegardes ; l'application mobile n'est pas publiée (Q1, Q3).
- La deuxième école a la Bibliothèque **dès l'étape 3** (Q8).
- Règles du projet : 404 hors de l'école, le serveur ne croit pas le client, aucune donnée d'élève envoyée à l'IA, rien de réel dans le dépôt public (EP-5 : aucun nom d'école dans le code).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Préfixe ou seau par école dans MinIO (§ 5, point 4) | à trancher dans le plan de BIB-05, avec la sauvegarde par école (PLA-07) | chef, dans le plan |
| 2 | Ne pas redéployer StudyLib sur le nouveau serveur (§ 5, point 5) ; ce choix touche EXP-02 | ne pas la redéployer | chef |
| 3 | Les vidéos YouTube par module (§ 5, point 6) : un envoi sortant vers Google (QUA-09) | ne pas les reprendre dans BIB-05 à BIB-08 | chef |
| 4 | Combien de temps l'image StudyLib reste publiée, comme retour arrière (§ 5, point 7) | jusqu'à la fin de BIB-08 vérifiée, plus un mois | chef |
| 5 | Le retrait du jeton d'intégration, des audiences `studylib` et du JWKS public (§ 2.2) | une fonction à part, après BIB-08, avec le chef (sécurité) | chef |

## Prompt à donner à l'agent

```text
Tu es la session « BIB » de Planner : la Bibliothèque reconstruite dans la pile de Planner (voie B, validée par le chef le 21 nov.).
Tes lots, dans l'ordre : BIB-05 (modèle, migrations, stockage S3 avec @aws-sdk/client-s3), BIB-06 (API), BIB-07 (espace de cours),
BIB-08 (reprise des données, après les volumes donnés par le chef).
Lis d'abord AGENTS.md, docs/plan/README.md (§ 5 : le contrat d'API d'abord ; EP-5, EP-13, EP-18), docs/plan/suivi.md et
docs/plan/decisions.md (sections du 21 et du 22 nov.) sur la branche doc/coordination-equipe, puis ta fiche de mission
docs/plan/missions/bib-reconstruction.md, puis l'étude docs/conception/bibliotheque/etude-studylib-pile.md
(branche etude/bib-studylib-pile, ou main après sa fusion), § 1 à 8.
Une branche par lot, depuis origin/main, dans ..\travaux-planner\<nom de la branche>.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Avant tout code : questions numérotées au chef (outil de questions), dont les questions 1 à 5 de la fiche, puis le plan de BIB-05
(docs/plan/modeles/conception.md) dans docs/conception/bibliotheque/, avec les sections « Ce que disent les études » et EP-18,
validé par le chef, commité seul. Migration : 0087 est réservée pour BIB-05 ; tout autre numéro se demande au coordinateur.
Lis ..\StudyLib sans le modifier, pour reprendre ses règles (dépôt, modération, liens signés, droits).
Règles : pas de code avant le plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ; git add <fichiers> ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand un lot est fini, dis-le au coordinateur : il relit la branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-22 | fiche écrite par le coordinateur, d'après le § 8 de l'étude StudyLib (répartition validée par le chef le 21 nov.) ; migration 0087 réservée | — |
