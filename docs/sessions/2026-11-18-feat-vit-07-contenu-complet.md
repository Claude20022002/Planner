# Session du 2026-11-18 · VIT-07 · `feat/vit-07-contenu-complet`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | VIT · préparation de VIT-05 |
| Dossier de travail | `..\travaux-planner\vit-07-contenu-complet` |
| Dernier commit | `08e39160` |

## Objectif de la session

Présenter quiz, jeux, bibliothèque, cours, annonces et l'application, avec l'appel à la main et l'export national.

## Plan

[docs/conception/vitrine/vit-07-contenu-complet.md](../conception/vitrine/vit-07-contenu-complet.md). Questions 1 et 2 : oui, le 18 novembre 2026.

## Fait

- `fafd3f15` — le plan court.
- `55b165ca` — EP-18 et Massar ajoutés au plan.
- `08e39160` — quatre pages, menu Fonctions, carte « prêts de livres » retirée, appel à la main, export vers la plateforme nationale. Massar reste l'exemple du Maroc. Pas de phrase sur un magasin d'applications.
- Aucune illustration nouvelle. VIT-09 les fera après la fusion.

## Vérifié

Build Astro : 34 pages. Tests unitaires : 56, tous verts. `verifier-neutre` : aucun nom d'école. Pas de défilement horizontal en 390, 768 et 1440 px. Menu Fonctions ouvert à la souris, au téléphone et sur grand écran. axe-core 4.10.3 : zéro violation sur les quatre pages, sur En classe et sur Bientôt. Lighthouse instantané, ordinateur : 100 en accessibilité, bonnes pratiques et SEO sur Quiz et jeux et sur Bibliothèque. Cours et annonces et Application ont eu axe, pas Lighthouse.

Bibliothèque, Cours et annonces et Application n'ont pas de visuel. Quiz réutilise `IllustrationQuiz`.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Coder ces quatre pages, ces phrases, le retrait de la carte Bibliothèque, et le menu Fonctions ? | oui | répondu |
| 2 | Écrire les phrases EP-18 et Massar, et retirer la phrase sur le magasin d'applications ? | oui | répondu |

## État laissé

- `docs/plan/suivi.md` : non modifié.
- Module VIT : ligne VIT-07 en cours, dans `08e39160`.
- Branche locale, pas poussée.

## Reste à faire, dans l'ordre

1. Le chef pousse et ouvre la PR.
2. Après le vert de la CI, il fusionne. VIT-09 ajoutera les illustrations.

## Commandes pour le chef de projet

```text
git -C "..\travaux-planner\vit-07-contenu-complet" push -u origin feat/vit-07-contenu-complet
gh pr create --repo Claude20022002/Planner --base main --head feat/vit-07-contenu-complet --title "VIT-07 : le site présente quiz, bibliothèque, cours et l'application" --fill
```

## Prompt de reprise

```text
Tu reprends VIT-07, sur la branche feat/vit-07-contenu-complet,
dans le dossier ..\travaux-planner\vit-07-contenu-complet.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/vitrine/vit-07-contenu-complet.md et cette fiche.
Fait : le code est commité (08e39160). Questions 1 et 2 répondues oui.
Reste : le chef pousse. Pas d'illustration nouvelle (VIT-09, après la fusion).
Questions en attente : aucune.
Règles : pas de styles/, pas d'accueil, pas de suivi.md, jamais de git push.
StudyLib se lit, il ne s'écrit pas. Grok 4.7 high convient.
```
