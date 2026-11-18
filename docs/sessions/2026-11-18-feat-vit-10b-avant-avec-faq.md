# Session du 2026-11-18 · VIT-10b · `feat/vit-10b-avant-avec-faq`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | VIT · préparation de VIT-05 |
| Dossier de travail | `..\travaux-planner\vit-10b-avant-avec-faq` |
| Dernier commit | `69d11750` |

## Objectif de la session

Écrire le plan des blocs « avant → avec Planner » et de la FAQ des quatre pages par rôle, et le faire valider avant tout code.

## Plan

[docs/conception/vitrine/vit-10b-avant-avec-faq.md](../conception/vitrine/vit-10b-avant-avec-faq.md). En attente du chef.

## Fait

- `69d11750` — le plan court. Vingt phrases « avant » proposées. Les phrases « avec » et les réponses de FAQ déjà visées sont recopiées, avec leur fichier. Aucun code.

## Vérifié

Aucun test : il n'y a pas de code. La #219 est fusionnée (`427afdea`).

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Les vingt phrases « avant », et leur anglais ? | | ouverte |
| 2 | Recopier les « avec » et les réponses déjà visées, sans les reformuler ? | | ouverte |
| 3 | Titres et place, entre les cartes et le bandeau de contact ? | | ouverte |

## État laissé

- `docs/plan/suivi.md` : non modifié.
- Module VIT : ligne VIT-10b, plan en attente.
- Branche locale. Elle ne suit pas `origin/main`.

## Reste à faire, dans l'ordre

1. Le chef valide, ou retire une phrase.
2. Ensuite seulement, le code.
3. VIT-13 après. QJE-15 après VIT-13.

## Commandes pour le chef de projet

```text
git -C "..\travaux-planner\vit-10b-avant-avec-faq" push -u origin feat/vit-10b-avant-avec-faq
gh pr create --repo Claude20022002/Planner --base main --head feat/vit-10b-avant-avec-faq --title "VIT-10b : plan avant, avec, et FAQ" --body "Plan court, en attente du visa des phrases. Aucun code."
```

## Prompt de reprise

```text
Tu reprends VIT-10b, sur la branche feat/vit-10b-avant-avec-faq,
dans le dossier ..\travaux-planner\vit-10b-avant-avec-faq.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/vitrine/vit-10b-avant-avec-faq.md et cette fiche.
Fait : le plan est commité (69d11750). Aucun code.
Reste : le visa du chef sur les questions 1 à 3. Pas d'illustration (VIT-09).
Règles : pas de styles/, pas d'accueil, pas de suivi.md, jamais de git push.
```
