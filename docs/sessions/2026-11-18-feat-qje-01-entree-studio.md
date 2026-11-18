# Session du 2026-11-18 · QJE-01 · `feat/qje-01-entree-studio`

| | |
|---|---|
| Fait par | agent Cursor (Grok 4.7) |
| Chantier | QJE · exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-01-entree-studio` |
| Dernier commit | voir le commit de cette fiche |

## Objectif de la session

Écrire le plan court : l'entrée « Quiz » du sélecteur n'ouvre plus ClassQuiz. Aucun code.

## Plan

[docs/conception/jeux/qje-01-entree-studio.md](../conception/jeux/qje-01-entree-studio.md). Validé par Claude20022002 le 18 novembre 2026 (`7981524c`).

## Fait

- VIT-06 annulée, consigne rangée, rien écrit.
- Plan `d531778c`, validation `7981524c`.
- `adresseEspace` : enseignant `/jeux`, étudiant `/quiz`, administration et autres rôles `null`. Plus de lecture de `urlQuiz`, plus de `/play`.
- Le parcours `classQuizEteint` garde l'entrée Quiz visible pour l'enseignant quand ClassQuiz est éteint.
- L'application mobile n'est pas modifiée. `suivi.md` non plus.

## Vérifié

- `node --test src/components/espaces/adresseEspace.test.js` : 5 verts.
- Le parcours Playwright n'a pas été lancé ici : il demande l'application et le jeu de connexion. La CI le fera.

## Questions

Aucune. Les quatre réponses sont dans le plan, § 3.

## État laissé

- `docs/plan/suivi.md` : non modifié (tenu par le coordinateur)
- QJE-01 : code fait, à pousser

## Reste à faire, dans l'ordre

1. Le chef pousse `feat/qje-01-entree-studio`.
2. Le coordinateur relit.

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
Fait : plan validé par le chef. adresseEspace envoie l'enseignant sur /jeux et l'étudiant sur /quiz.
Test unitaire : 5 verts. Le parcours Playwright n'a pas été lancé ici.
Reste : le chef pousse, puis la relecture.
Questions en attente : aucune.
Ne pas modifier docs/plan/suivi.md. Jamais de git push.
```
