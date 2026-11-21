# Session du 17 novembre 2026 · étude OpenEduCat · `etude/openeducat-comparatif`

| | |
|---|---|
| Fait par | Codex |
| Chantier | Étude documentaire demandée par le chef, hors chantier |
| Dossier de travail | `..\travaux-planner\comparatif-openeducat` |
| Commit du rapport | `aa49a168` |

## Objectif de la session

Étudier OpenEduCat Community et Enterprise et situer Planner sur la planification, la gestion scolaire, le marché marocain, l'exploitation et les coûts.

## Plan

Reprendre les études du 15 novembre, lire les modules publics Community 19 et les sources de l'éditeur, figer le point de comparaison de Planner et livrer un rapport avec une recette comparative. L'installation relève du [plan d'essai](../etude-marche/08-plan-essai-openeducat.md).

## Fait et vérifié

- [Rapport du 17 novembre](../etude-marche/10-comparatif-openeducat-planner.md) dans `aa49a168` et lien dans l'index.
- Plannings Community lus dans les fichiers source au commit `ad47dbf8`. État Planner lu dans `origin/main` `bd934ebf`, avec les résultats de MOT-02 identifiés comme issus de sa branche d'étude.
- Barème et page Maroc de l'éditeur revérifiés. Calculs du panier vérifiés, liens locaux contrôlés et `git diff --check` passé. Étude documentaire, sans installation, compte éditeur ou mesure comparative.

## Questions et propositions pour la reprise

1. Quel essai lancer en premier ? Proposition : valider le cadre de l'essai Community de la PR #176 et reprendre le collège fictif de MOT-02.
2. Quel niveau de preuve demander pour Enterprise ? Proposition : démo de la version chiffrée sur le même collège, plus un fichier Massar accepté et un paiement rapproché dans le périmètre marocain.
3. Faut-il étudier une intégration ? Proposition : l'évaluer seulement pour un pilote déjà équipé qui demande un échange de données précis.

## État laissé

Étude comparative rédigée et commitée en local, avec une ligne dans le [suivi](../plan/suivi.md).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\comparatif-openeducat" push -u origin etude/openeducat-comparatif
gh pr create --base main --head etude/openeducat-comparatif --title "Étude OpenEduCat et comparatif avec Planner" --fill
```

## Prompt de reprise

```text
Tu reprends l'étude OpenEduCat sur etude/openeducat-comparatif, dans
..\travaux-planner\comparatif-openeducat. Lis AGENTS.md, docs/plan/README.md,
docs/plan/suivi.md, la fiche de session et le rapport
docs/etude-marche/10-comparatif-openeducat-planner.md.
Reprends le protocole de docs/etude-marche/08-plan-essai-openeducat.md
après validation du chef. Compare le même collège fictif avec MOT-02.
Pour Enterprise, vérifier le solveur et les parcours Maroc sur la version chiffrée.
Aucune installation avant le validé du chef. Jamais de git push.
```
