# Session du 2026-11-26 · VIT-20d · `feat/vit-20d-equipement`

| | |
|---|---|
| Fait par | Codex |
| Chantier | VIT |
| Dossier de travail | `..\travaux-planner\vit-20d-equipement` |
| Commit de la proposition | `cafbf767` |

## Objectif

Reproposer les trois lignes de l’Espace de cours pour le visa du chef sur la PR #261.

## Travail et vérifications

- Le commit `cafbf767` remplace uniquement S1 à S3 du § 5.3 de la [conception VIT-20d](../conception/vitrine/vit-20d-equipement.md). Les formulations françaises et anglaises indiquent le besoin de connexion, l’usage sans projection et l’accès depuis un ordinateur avec son compte. Le dépôt de documents est annoncé « Bientôt » dans S1.
- Les huit chemins distincts cités existent sur la branche. Le diff est limité à trois lignes remplacées et `git diff --check` est passé. Vérification documentaire uniquement.
- La décision du chef du 22 novembre consignée dans `docs/plan/decisions.md` prévaut sur la proposition initiale de la question 4 du § 4. La PR n’a pas pu être consultée directement depuis cette session.
- La proposition part de la tête locale connue de la PR (`7cae6808`). L’intégration de `main` est reportée après le visa, pour limiter cette étape aux trois lignes.

## État laissé

VIT-20d → les trois nouvelles lignes attendent le visa de Claude20022002 sur #261. La phase de code est en attente de ce visa.

## Commande pour le chef

```powershell
git -C "..\travaux-planner\vit-20d-equipement" push origin feat/vit-20d-equipement
```

## Prompt de reprise

```text
Reprends VIT-20d sur feat/vit-20d-equipement dans ..\travaux-planner\vit-20d-equipement.
Lis la mission vit-20-equipe, le plan VIT-20d, cette fiche et le visa du chef sur la PR #261.
La proposition FR/EN du § 5.3 est dans cafbf767. Attends son visa avant tout code.
Après le visa, mets la branche à jour depuis main et suis la phase b du plan avec les phrases visées.
```
