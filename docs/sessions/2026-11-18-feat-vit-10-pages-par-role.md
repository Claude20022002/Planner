# Session du 2026-11-18 · VIT-10 · `feat/vit-10-pages-par-role`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | VIT · préparation de VIT-05 |
| Dossier de travail | `..\travaux-planner\vit-10-pages-par-role` |
| Dernier commit | `cf781d33` |

## Objectif de la session

Écrire le plan des pages par rôle, du menu « Solutions » et du pied de page, et le faire valider avant tout code.

## Plan

[docs/conception/vitrine/vit-10-pages-par-role.md](../conception/vitrine/vit-10-pages-par-role.md). Validé le 18 novembre 2026, questions 1 à 4.

## Fait

- `e4fa58dc` — le plan court.
- `cf781d33` — quatre pages, menu « Solutions », pied en colonnes. Phrases recopiées. Pas de chiffres, pas de bloc avant/après, pas de FAQ nouvelle. Aucune illustration.

## Vérifié

Build Astro : 46 pages. Tests unitaires : 66, tous verts. `verifier-neutre` : aucun nom d'école. Pas de défilement horizontal en 390, 1024 et 1440 px, menu ouvert compris. Échap ferme le menu. Le second bouton de Direction mène à Pour l'établissement.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Ouvrir `PiedDePage.astro` pour un pied en colonnes, sans lien vide ? | oui | répondu |
| 2 | Une bande de chiffres ? | non | répondu |
| 3 | Deux boutons : contact, et la page principale du rôle ? | oui | répondu |
| 4 | Avant/après et FAQ : seulement des phrases déjà publiées, sinon on ne les écrit pas ? | oui | répondu |

## État laissé

- `docs/plan/suivi.md` : non modifié.
- Module VIT : ligne VIT-10 en cours.
- Branche locale, pas poussée. Elle ne suit pas `origin/main`.

## Reste à faire, dans l'ordre

1. Le chef pousse et ouvre la PR.
2. Après le vert, il fusionne. VIT-11 demandera ensuite son lien de menu. VIT-09 dessinera après.

## Commandes pour le chef de projet

```text
git -C "..\travaux-planner\vit-10-pages-par-role" push -u origin feat/vit-10-pages-par-role
gh pr create --repo Claude20022002/Planner --base main --head feat/vit-10-pages-par-role --title "VIT-10 : pages par rôle, menu Solutions, pied en colonnes" --fill
```

## Prompt de reprise

```text
Tu reprends VIT-10, sur la branche feat/vit-10-pages-par-role,
dans le dossier ..\travaux-planner\vit-10-pages-par-role.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/vitrine/vit-10-pages-par-role.md et cette fiche.
Fait : le code est commité (cf781d33). Questions 1 à 4 répondues.
Reste : le chef pousse et ouvre la PR. Pas d'illustration (VIT-09, après VIT-11).
Règles : pas de styles/, pas d'accueil, pas de suivi.md, jamais de git push.
```
