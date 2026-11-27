# Session du 2026-11-26 · QJE-03 · `feat/qje-03-joueur-natif`

| | |
|---|---|
| Fait par | Codex |
| Chantier | QJE · exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-03-joueur-natif` |
| Commit du plan | `4fef9890` |

## Travail et vérifications

Conception du [joueur natif QJE-03](../conception/jeux/qje-03-joueur-natif.md) depuis `origin/main` à `03884038`. Le scanner, le joueur, le client API et les bancs existants ont été relus avec le plan SC-1c et l’étude EP-18. Le scénario navigateur existant ne vérifie pas le joueur React Native. Quatre propositions sont à viser par le chef, notamment la saisie depuis le scanner et les médias sans projecteur. Les chemins et le diff documentaire ont été contrôlés. Les tests applicatifs sont prévus après le visa.

Les [PR #262](https://github.com/Claude20022002/Planner/pull/262) et [#278](https://github.com/Claude20022002/Planner/pull/278) sont fusionnées. [#277](https://github.com/Claude20022002/Planner/pull/277) est encore ouverte à la vérification de la session. VIT-20f reprend après sa fusion.

## État laissé

QJE-03 → plan commité, transmis au coordinateur pour présentation au chef. Code en attente du visa et des réponses du § 3.

## Commandes pour le chef

```powershell
git -C "..\travaux-planner\qje-03-joueur-natif" push -u origin feat/qje-03-joueur-natif
gh pr create --base main --head feat/qje-03-joueur-natif --title "QJE-03 : plan du joueur natif du Studio quiz" --draft --fill
```

## Prompt de reprise

```text
Reprends QJE-03 dans ..\travaux-planner\qje-03-joueur-natif, branche feat/qje-03-joueur-natif.
Lis AGENTS.md, docs/plan/missions/sortie-classquiz.md, le plan QJE-03 et cette fiche.
Vérifie le visa du chef sur le plan et ses quatre réponses, puis consigne-le avant le code.
Réutilise le joueur direct existant et réalise la recette native prévue.
```
