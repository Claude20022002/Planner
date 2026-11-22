# Session du 2026-11-18 · VIT-10 · `feat/vit-10-pages-par-role`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | VIT · préparation de VIT-05 |
| Dossier de travail | `..\travaux-planner\vit-10-pages-par-role` |
| Dernier commit | `6c8459a5` |

## Objectif de la session

Écrire le plan des pages par rôle, du menu « Solutions » et du pied de page, et le faire valider avant tout code.

## Plan

[docs/conception/vitrine/vit-10-pages-par-role.md](../conception/vitrine/vit-10-pages-par-role.md). Validé le 18 novembre 2026, questions 1 à 4.

## Fait

- `e4fa58dc` — le plan court.
- `cf781d33` — quatre pages, menu « Solutions », pied en colonnes. Phrases recopiées. Pas de chiffres, pas de bloc avant/après, pas de FAQ nouvelle. Aucune illustration.
- `c89851b5` — la grille partagée ne devient un lien que si la carte a un `href`. Les autres pages n'en passent pas. La colonne Ressources n'a que des pages qui existent : Sécurité et données, Bientôt, Nous contacter. Pas de lien vers le catalogue ni la FAQ.
- `493f2678` — fusion de `main` (page Bibliothèque des jeux). Le seul conflit, dans le module VIT, garde les deux phrases. Le test de la grille regarde l'attribut de `GrilleCartes`, pas le bouton « Voir les dix jeux ».
- `6c8459a5` — fusion de `main` après les logos (#220). Le menu Solutions reste. Les filets de l'en-tête utilisent `rgb(23 57 92)`.

## Vérifié

Build Astro : 49 pages. Tests unitaires : 70, tous verts. `verifier-neutre` : aucun nom d'école. Pas de défilement horizontal en 390, 1024 et 1440 px, menu ouvert compris. Échap ferme le menu. Le second bouton de Direction mène à Pour l'établissement.

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
- Branche locale, en avance sur `origin/feat/vit-10-pages-par-role`. Elle ne suit pas `origin/main`. PR #219 ouverte.

## Reste à faire, dans l'ordre

1. Le chef pousse. La PR #219 existe déjà.
2. Une minute après, `gh pr checks 219`. Après le vert, il fusionne. VIT-10b vient ensuite.

## Commandes pour le chef de projet

```text
git -C "..\travaux-planner\vit-10-pages-par-role" push origin feat/vit-10-pages-par-role
```

## Prompt de reprise

```text
Tu reprends VIT-10, sur la branche feat/vit-10-pages-par-role,
dans le dossier ..\travaux-planner\vit-10-pages-par-role.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/vitrine/vit-10-pages-par-role.md et cette fiche.
Fait : le conflit avec les logos est résolu (6c8459a5). Questions 1 à 4 répondues.
Reste : le chef pousse, attend la CI de la PR #219, puis fusionne. Pas d'illustration (VIT-09, après VIT-11).
Règles : pas de styles/, pas d'accueil, pas de suivi.md, jamais de git push.
```
