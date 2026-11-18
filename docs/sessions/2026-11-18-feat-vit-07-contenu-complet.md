# Session du 2026-11-18 · VIT-07 · `feat/vit-07-contenu-complet`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | VIT · préparation de VIT-05 |
| Dossier de travail | `..\travaux-planner\vit-07-contenu-complet` |
| Dernier commit | `55b165ca` |

## Objectif de la session

Coder les quatre pages après le « oui » de la question 1, puis tenir les consignes EP-18 et Massar arrivées dans la boîte.

## Plan

[docs/conception/vitrine/vit-07-contenu-complet.md](../conception/vitrine/vit-07-contenu-complet.md). Question 1 : oui. Question 2 (EP-18, Massar, retrait de la phrase sur le magasin) : en attente du chef.

## Fait

- `fafd3f15` — le plan court, seul.
- `c4cac1a0` — la fiche d'attente.
- `55b165ca` — le plan corrigé : EP-18 et Massar, question 2 ouverte. Commit seul, comme demandé.
- Les quatre pages, le menu Fonctions et le retrait de la carte « prêts de livres » sont écrits dans le dossier, pas commités. Ils attendent la question 2, qui change des phrases déjà rédigées.
- Aucune illustration nouvelle. VIT-09 les fera après la fusion.

## Vérifié

Sur les pages écrites, pas encore commitées : build Astro (34 pages), 55 tests unitaires, `verifier-neutre` sans nom d'école. Pas de défilement horizontal en 390, 768 et 1440 px. Menu Fonctions ouvert au clavier et à la souris, au téléphone et sur grand écran. axe-core 4.10.3 : zéro violation sur les quatre pages et sur Bientôt. Lighthouse (instantané, ordinateur) : 100 en accessibilité, bonnes pratiques et SEO sur Quiz et jeux et sur Bibliothèque. Cours et annonces et Application n'ont pas eu Lighthouse. Les parcours de #210 n'ont pas été relancés.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Coder ces quatre pages, ces phrases, le retrait de la carte Bibliothèque, et le menu Fonctions ? | oui | répondu |
| 2 | Écrire les phrases EP-18 et Massar, et retirer la phrase sur le magasin d'applications ? | — | en attente du chef |

## État laissé

- `docs/plan/suivi.md` : non modifié.
- Module VIT : une ligne VIT-07 est écrite, pas commitée.
- Les pages et le menu sont dans le dossier de travail, pas dans un commit.

## Reste à faire, dans l'ordre

1. Le chef répond à la question 2.
2. Ajuster alors les phrases, committer le code, la ligne du module et cette fiche.
3. Le chef pousse. Pas avant.

## Commandes pour le chef de projet

Rien à pousser. Le correctif du plan est local (`55b165ca`).

## Prompt de reprise

```text
Tu reprends VIT-07, sur la branche feat/vit-07-contenu-complet,
dans le dossier ..\travaux-planner\vit-07-contenu-complet.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/vitrine/vit-07-contenu-complet.md et cette fiche.
Fait : le plan corrigé est commité (55b165ca). La question 1 a reçu oui.
Les quatre pages, le menu et le retrait de la carte sont écrits, pas commités.
Reste : attendre la question 2, puis ajuster les phrases EP-18 et Massar
et committer le code. Pas d'illustration nouvelle (VIT-09).
Questions en attente : la question 2 du plan.
Règles : pas de styles/, pas d'accueil, pas de suivi.md, jamais de git push.
StudyLib se lit, il ne s'écrit pas. Grok 4.7 high convient.
```
