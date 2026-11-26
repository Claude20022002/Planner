# Session du 2026-11-26 · VIT-22 · `feat/vit-22-bientot-modules`

| | |
|---|---|
| Fait par | Codex (GPT-6) |
| Chantier | VIT |
| Dossier de travail | `..\travaux-planner\vit-22-bientot-modules` |
| Dernier commit de réalisation | `e8a1b824` |

## Objectif et plan

Livrer la phase (b) du [plan VIT-22](../conception/vitrine/vit-22-bientot-modules.md). Le visa du chef pour les questions 1 à 5 et les trois phrases nouvelles figure sur la [PR #263](https://github.com/Claude20022002/Planner/pull/263).

## Fait

- `5a9a9912` rassemble la branche et `origin/main` (`6d045585`). Le seul conflit portait sur le tableau du module VIT. Les états à jour de `main` ont été retenus.
- `e8a1b824` affiche les douze modules en préparation dans l'ordre du catalogue, par catégorie. Les noms viennent de `modules.json`, les descriptions visées de `bientot.json`. Les deux cartes « Et aussi » sont conservées comme prévu au § 5.
- Les grilles réutilisent `GrilleCartes`, avec alternance des fonds existants. Les icônes décoratives sont associées aux modules dans `iconesModules.js`.

## Vérifié

- `npm run test:unit` a donné 155 réussites. Le test facultatif StudyLib est ignoré sans clone externe.
- `npm run build` a construit 43 pages. Les 32 tests du rendu passent, dont le contrôle des 12 cartes, des badges et de l'absence de liens sur les cartes en français et en anglais.
- `npm run test:poids` passe. La page la plus lourde pèse 118,0 Ko pour un seuil de 200 Ko. `node ../scripts/verifier-neutre.mjs` et `git diff --check` passent.
- L'image Nginx et les parcours navigateur de la CI restent à vérifier sur la PR après publication de la branche.

## État laissé

- VIT-22 → phase (b) terminée en local, PR #263 ouverte, branche à publier par le chef.
- Le lot suivant est VIT-20d (#261), sur sa propre branche. Les trois lignes S1 à S3 de l'Espace de cours attendent leur nouvelle proposition et leur visa.

## Commande pour le chef

```powershell
git -C "..\travaux-planner\vit-22-bientot-modules" push -u origin feat/vit-22-bientot-modules
gh pr checks 263 --watch
```

## Prompt de reprise

```text
Reprends VIT-20d (#261) sur feat/vit-20d-equipement après l’étape VIT-22.
Lis AGENTS.md, suivi.md, la mission vit-20-equipe.md, le plan VIT-20d et la file Codex du 26 novembre dans la boîte des messages traités.
Monte le dossier de travail depuis la branche distante. Prépare uniquement les trois lignes S1 à S3 sur l’Espace de cours.
Le service actuel couvre les liens et les sondages. Le dépôt de documents est « Bientôt ».
Commite la proposition seule et dépose le rapport dans sortie/. Le chef pousse et soumet les lignes au visa sur #261.
Attends le visa avant de coder. Ne modifie pas suivi.md. Termine avec une fiche de session.
```
