# Session du 2026-11-18 · QJE-01 · `feat/qje-01-entree-studio`

| | |
|---|---|
| Fait par | agent Cursor (Grok 4.7) |
| Chantier | QJE · exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-01-entree-studio` |
| Dernier commit | `d531778c` pour le plan ; cette fiche suit |

## Objectif de la session

Écrire le plan court : l'entrée « Quiz » du sélecteur n'ouvre plus ClassQuiz. Aucun code.

## Plan

[docs/conception/jeux/qje-01-entree-studio.md](../conception/jeux/qje-01-entree-studio.md), commit `d531778c`. En attente du coordinateur.

## Fait

- VIT-06 annulée, consigne rangée, rien écrit.
- Branche `feat/qje-01-entree-studio` depuis `origin/main` (`679d2ae2`). Elle ne suit pas `main`.
- Plan seul. `suivi.md` n'est pas modifié.

## Vérifié

Lecture de `shared/espaces.js`, du sélecteur web, des routes `/studio-quiz` et `/quiz`, du parcours `classQuizEteint`. Pas de test lancé : pas de code.

## Questions

Les quatre questions sont dans le plan, § 3. Les trois premières bloquent le code.

## État laissé

- `docs/plan/suivi.md` : non modifié (tenu par le coordinateur)
- QJE-01 : plan à valider

## Reste à faire, dans l'ordre

1. Le coordinateur répond aux questions et valide.
2. Ensuite seulement : le code et les tests.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-01-entree-studio" push -u origin feat/qje-01-entree-studio
```

## Prompt de reprise

```text
Tu reprends QJE-01 (entrée Quiz vers Planner), exception hors chantier,
sur la branche feat/qje-01-entree-studio, dans ..\travaux-planner\qje-01-entree-studio.
Lis AGENTS.md, docs/plan/missions/sortie-classquiz.md, docs/archives/plans/sortie-classquiz.md,
docs/conception/jeux/qje-01-entree-studio.md et cette fiche.
Fait : plan d531778c, sans code. Reste : le « validé » du coordinateur, puis le code.
Questions en attente : les quatre du plan, les trois premières bloquent.
Ne pas modifier docs/plan/suivi.md. Jamais de git push.
```
