# Session du 2026-11-18 · VIT-07 · `feat/vit-07-contenu-complet`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | VIT · préparation de VIT-05 |
| Dossier de travail | `..\travaux-planner\vit-07-contenu-complet` |
| Dernier commit | `fafd3f15` |

## Objectif de la session

Écrire le plan court de VIT-07, puis s'arrêter avant le code.

## Plan

[docs/conception/vitrine/vit-07-contenu-complet.md](../conception/vitrine/vit-07-contenu-complet.md). En attente du « validé » du chef.

Quatre pages : Quiz et jeux, Bibliothèque, Cours et annonces, Application. Chaque phrase cite un fichier. La carte « Bibliothèque » sort de « Bientôt » : le prêt de livres n'existe pas dans StudyLib. Menu « Fonctions » proposé. StudyLib a été lu, pas modifié.

## Fait

- `fafd3f15` — le plan court, seul.
- Jonction `vitrine\node_modules` vers le dossier de `vit-01-vitrine`. Elle n'est pas dans git.

## Vérifié

Pas de build : aucun code de page. La CI de #210 (séance des parcours) était encore en cours au moment du plan : serveur et parcours en attente, les autres contrôles verts.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Coder ces quatre pages, ces phrases, le retrait de la carte Bibliothèque, et le menu Fonctions ? | — | en attente du chef |

## État laissé

- `docs/plan/suivi.md` : non modifié.
- Module VIT : non modifié. L'état est dans cette fiche : plan écrit, code pas commencé.

## Reste à faire, dans l'ordre

1. Le chef dit « validé », ou corrige la question 1.
2. Coder alors les fichiers du § 7 du plan. Lancer les contrôles du § 8.
3. Fiche, commit local, rapport. Le chef pousse.

## Commandes pour le chef de projet

Rien à pousser tant que le plan n'est pas validé.

## Prompt de reprise

```text
Tu reprends VIT-07, sur la branche feat/vit-07-contenu-complet,
dans le dossier ..\travaux-planner\vit-07-contenu-complet.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/vitrine/vit-07-contenu-complet.md et cette fiche.
Fait : le plan court est commité (fafd3f15). Aucune page.
Reste : attendre le « validé » du chef, puis coder seulement le plan.
Questions en attente : la question 1 du plan.
Règles : pas de styles/, pas d'accueil, pas de suivi.md, jamais de git push.
StudyLib se lit, il ne s'écrit pas. Grok 4.7 high convient.
```
