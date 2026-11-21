# Session du 2026-11-18 · VIT-10b · `feat/vit-10b-avant-avec-faq`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | VIT · préparation de VIT-05 |
| Dossier de travail | `..\travaux-planner\vit-10b-avant-avec-faq` |
| Dernier commit | `b7f1a104` |

## Objectif de la session

Écrire le plan des blocs « avant → avec Planner » et de la FAQ des quatre pages par rôle, et le faire valider avant tout code.

## Plan

[docs/conception/vitrine/vit-10b-avant-avec-faq.md](../conception/vitrine/vit-10b-avant-avec-faq.md). Validé le 18 novembre 2026, questions 1 à 3.

## Fait

- `69d11750` — le plan court.
- `a3cae80d` — le visa des questions 1 à 3, seul, avant le code.
- `b7f1a104` — cinq lignes et la FAQ sur les quatre pages. Les phrases « avec » et les réponses déjà visées sont recopiées.

## Vérifié

71 tests unitaires verts. Build : 49 pages. `verifier-neutre` : aucun nom d'école. Page Direction : cinq lignes, la première question s'ouvre, pas de défilement horizontal en 390 px.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Les vingt phrases « avant », et leur anglais ? | oui | répondu |
| 2 | Recopier les « avec » et les réponses déjà visées, sans les reformuler ? | oui | répondu |
| 3 | Titres et place, entre les cartes et le bandeau de contact ? | oui | répondu |

## État laissé

- `docs/plan/suivi.md` : non modifié.
- Module VIT : ligne VIT-10b en cours.
- Branche locale. Elle ne suit pas `origin/main`.

## Reste à faire, dans l'ordre

1. Le chef pousse et ouvre la PR.
2. Après le vert, il fusionne. VIT-13 vient ensuite.

## Commandes pour le chef de projet

```text
git -C "..\travaux-planner\vit-10b-avant-avec-faq" push -u origin feat/vit-10b-avant-avec-faq
gh pr create --repo Claude20022002/Planner --base main --head feat/vit-10b-avant-avec-faq --title "VIT-10b : avant, avec Planner, et FAQ des rôles" --body "Cinq lignes et une FAQ sur les quatre pages par rôle. Phrases avec recopiées. Plan validé avant le code."
```

## Prompt de reprise

```text
Tu reprends VIT-10b, sur la branche feat/vit-10b-avant-avec-faq,
dans le dossier ..\travaux-planner\vit-10b-avant-avec-faq.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/vitrine/vit-10b-avant-avec-faq.md et cette fiche.
Fait : le code est commité (b7f1a104). Questions 1 à 3 répondues.
Reste : le chef pousse et ouvre la PR. Pas d'illustration (VIT-09).
Règles : pas de styles/, pas d'accueil, pas de suivi.md, jamais de git push.
```
