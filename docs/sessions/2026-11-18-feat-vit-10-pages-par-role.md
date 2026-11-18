# Session du 2026-11-18 · VIT-10 · `feat/vit-10-pages-par-role`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | VIT · préparation de VIT-05 |
| Dossier de travail | `..\travaux-planner\vit-10-pages-par-role` |
| Dernier commit | `e4fa58dc` |

## Objectif de la session

Écrire le plan des pages par rôle, du menu « Solutions » et du pied de page, et le faire valider avant tout code.

## Plan

[docs/conception/vitrine/vit-10-pages-par-role.md](../conception/vitrine/vit-10-pages-par-role.md). Pas encore validé. Quatre questions attendent le chef.

## Fait

- `e4fa58dc` — le plan court. Aucun code, aucune illustration.

## Vérifié

Le plan est relu contre la mission et contre `types.js`, `langues.js`, `EnTete.astro`, `PiedDePage.astro`. Pas de tests : il n'y a pas de code.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Ouvrir `PiedDePage.astro` pour un pied en colonnes, sans lien vide ? | | en attente |
| 2 | Une bande de chiffres ? | | en attente |
| 3 | Deux boutons : contact, et la page principale du rôle ? | | en attente |
| 4 | Avant/après et FAQ : seulement des phrases déjà publiées, sinon on ne les écrit pas ? | | en attente |

## État laissé

- `docs/plan/suivi.md` : non modifié.
- Module VIT : ligne VIT-10, plan en attente.
- Branche locale, pas poussée. Elle ne suit pas `origin/main`.

## Reste à faire, dans l'ordre

1. Le chef répond aux quatre questions et valide le plan.
2. Ensuite seulement, le code. VIT-09 dessinera après VIT-11.

## Commandes pour le chef de projet

```text
git -C "..\travaux-planner\vit-10-pages-par-role" push -u origin feat/vit-10-pages-par-role
```

La PR peut attendre la validation : le plan n'est pas encore accepté.

## Prompt de reprise

```text
Tu reprends VIT-10, sur la branche feat/vit-10-pages-par-role,
dans le dossier ..\travaux-planner\vit-10-pages-par-role.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/vitrine/vit-10-pages-par-role.md et cette fiche.
Fait : le plan est commité (e4fa58dc). Aucun code.
Reste : les quatre questions, puis la validation du chef, puis le code.
Pas d'illustration (VIT-09, après VIT-11).
Règles : pas de styles/, pas d'accueil, pas de suivi.md, jamais de git push.
PiedDePage.astro reste fermé tant que la question 1 n'est pas oui.
```
