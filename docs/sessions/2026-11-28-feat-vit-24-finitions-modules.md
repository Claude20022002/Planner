# Session du 2026-11-28 · VIT-24 · `feat/vit-24-finitions-modules`

| | |
|---|---|
| Fait par | Codex |
| Module | VIT, suite de VIT-20 hors chantier autorisée le 27 novembre |
| Dossier de travail | `..\travaux-planner\vit-24-finitions-modules` |
| Dernier commit de conception | `1d443f4b` |

## Objectif de la session

Préparer le visa du chef sur les finitions du catalogue et des pages de modules, après #284 et #286. Le message direct du coordinateur du 28 novembre à 12 h 01 fixe cette étape au plan et aux maquettes.

## Fait

- `1d443f4b` ajoute seul le [plan VIT-24](../conception/vitrine/vit-24-finitions-modules.md). Il soumet cinq questions, neuf lignes de textes FR/EN et trois intensités de teinte.
- Planche hors dépôt dans `..\travaux-planner\captures-vit-24\index.html`. Le catalogue, l'accueil, Présences et « Bientôt » sont comparés à 390 et 1 440 px. Les deux états du catalogue et de Présences sont des captures de pages entières. L'accueil et « Bientôt » ont aussi des vues de section.
- Les métadonnées Git du dossier de mission sont en lecture seule dans le bac à sable. Le commit du plan et celui de cette fiche sont livrés par `..\travaux-planner\vit-24-livraison\vit-24-finitions-modules.bundle`. Leur base commune est `3daf2771`. Les deux documents sont présents dans le dossier de mission pour la lecture.

## Vérifié

| Contrôle | Résultat |
|---|---|
| Build de la base | 43 pages statiques, FR/EN |
| Unitaires | 168 réussis, 1 ignoré, 0 échec |
| Rendu | 77 réussis, 0 échec |
| Neutralité et génération des jetons | Conformes |
| EP-19 sur la base | Page la plus lourde à 134,4 Ko pour un seuil de 200 Ko |
| Chromium sur les captures FR | 16 relevés avant/après, 0 violation axe-core et 0 débordement horizontal de page. Les grilles de l'accueil et du catalogue comptent 17 tuiles et 5 liens. Présences passe de 1 à 3 cartes dans la maquette. |

Les vérifications de l'implémentation en FR/EN, du méga-menu et du rendu AR sont décrites dans le plan. La base actuelle construit uniquement les routes FR/EN. Le lot M-1 de la feuille d'appel et de la clôture après coup est absent de la base, d'où la proposition d'une carte sur la correction après clôture.

## Questions

| N° | Question | Réponse proposée | État |
|---|---|---|---|
| 1 | Nom anglais, sous-titre et description | N1 à N3, sous-titre du menu conditionné au rendu | Visa du chef |
| 2 | Gabarit et atténuation | Variante B, 50 % de la teinte, § 4.1 | Visa du chef |
| 3 | Cartes de fonctionnalités | P1 à P3, C1 et A1 à A2, § 4.5 | Visa du chef |
| 4 | Liens des pages de modules | Types existants via Solutions, quatre autres modules disponibles | Visa du chef |
| 5 | Arabe construit et non indexé | Recette sur copie hors dépôt, évolution de l'artefact normal à autoriser si demandée | Arbitrage du chef |

## État et reprise

VIT-24 → plan proposé, maquettes prêtes pour visa. Aucun code produit écrit. Le coordinateur importe les deux commits, relit le plan et présente les maquettes au chef. Il reporte l'état dans `suivi.md`.

### Import dans le dossier de mission

Depuis ce dossier, le coordinateur peut importer le bundle avec les commandes suivantes. Le `reset --mixed` avance l'index et la branche sur la livraison vérifiée et préserve les documents déjà présents dans le dossier de travail.

```powershell
git fetch ..\vit-24-livraison\vit-24-finitions-modules.bundle refs/heads/feat/vit-24-finitions-modules
if ($LASTEXITCODE -ne 0) { throw "Échec de l'import du bundle" }
git merge-base --is-ancestor HEAD FETCH_HEAD
if ($LASTEXITCODE -ne 0) { throw "La tête locale a divergé" }
git diff --quiet HEAD --
if ($LASTEXITCODE -ne 0) { throw "Des fichiers suivis ont changé depuis la livraison" }
git reset --mixed FETCH_HEAD
git status --short --branch
```

### Commandes pour le chef de projet

Depuis le dépôt principal, après l'import et la relecture du coordinateur, pour publier le plan en brouillon si le chef le souhaite.

```powershell
git -C "..\travaux-planner\vit-24-finitions-modules" push -u origin feat/vit-24-finitions-modules
gh pr create --draft --base main --head feat/vit-24-finitions-modules --title "VIT-24 · Plan des finitions du catalogue" --fill
```

### Prompt de reprise

```text
Reprends VIT-24 sur feat/vit-24-finitions-modules dans ..\travaux-planner\vit-24-finitions-modules.
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la fiche de mission depuis
origin/doc/coordination-2026-11-27-suite et docs/conception/vitrine/vit-24-finitions-modules.md.
Consulte la planche ..\travaux-planner\captures-vit-24\index.html et cette fiche.
Le plan 1d443f4b est livré par bundle avec la fiche. Fais importer le bundle si nécessaire.
Attends le visa du chef et les réponses Q1 à Q5, puis consigne-les dans un commit du plan avant le code.
Suis le périmètre approuvé. La jonction vitrine/node_modules est en place, sans installation.
Refais la recette et les captures après implémentation. Mets à jour module et fiche sans toucher suivi.md.
Le chef seul pousse et ouvre la PR. QJE-03 relève d'une autre consigne du coordinateur.
```
