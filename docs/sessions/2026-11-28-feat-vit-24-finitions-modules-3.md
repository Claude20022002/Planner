# Session du 2026-11-28 · VIT-24 · `feat/vit-24-finitions-modules`

| | |
|---|---|
| Fait par | Codex |
| Chantier | VIT, exception accordée pour la suite de VIT-20 |
| Dossier | `..\travaux-planner\vit-24-finitions-modules` |
| Dernier commit du code | `11a19a41` |

## Objectif et conception

Livrer les finitions validées du catalogue et des cinq pages de modules. Le chef a donné son accord sur la vitrine, puis demandé la reprise des travaux. Les propositions Q1 à Q4 du [plan VIT-24](../conception/vitrine/vit-24-finitions-modules.md) ont été consignées au commit `69befdb3`. Q5 reprend la décision du coordinateur sur la recette arabe hors dépôt.

## Livré

- `11a19a41` fournit les tuiles et badges colorés, les cinq pages teintées, les cartes de fonctionnalités et les liens vers les types d’établissement et les modules disponibles.
- « Notes et évaluations » et son sous-titre figurent en français et en anglais. Le sous-titre figure aussi dans le menu après vérification de la largeur.
- Les emplacements `actions`, `guide` et `faq` et le bouton de guide facultatif préparent VIT-25.
- La fiche du module VIT décrit la livraison. Le tableau de suivi reste à actualiser par le coordinateur.

## Vérifié

- Build Astro de 43 pages, 169 tests unitaires réussis, un sauté (clone StudyLib), 79 tests de rendu réussis.
- 94 tests Chromium réussis, dont axe-core sans violation sur les pages FR et EN avec le menu fermé puis ouvert à 390 et 1 440 px.
- Aucun défilement horizontal à 320 px sur les quatre pages de référence ni au zoom navigateur à 200 % sur cinq pages. Le catalogue est utilisable au clavier et saute les tuiles Bientôt.
- La page Présences s’affiche en 3G lente avec la CSP générée par le dépôt. Neutralité, contrôle de la charte et `git diff --check` verts. Poids maximal 134,7 Ko (137 884 octets), pour un budget de 200 Ko.
- Huit captures de l’implémentation aux deux largeurs dans `..\captures-vit-24\livre\index.html` depuis le dossier de travail.
- Recette ciblée sur neuf pages AR en copie temporaire, avec `lang="ar"`, `dir="rtl"` et `noindex`. L’activation de toutes les routes AR dans cette copie échoue sur l’ancienne clé de navigation `emploiDuTemps` de la page Direction. La publication de l’arabe relève de son propre chantier.

## État laissé

VIT-24 implémentée, testée et commitée localement. Relecture du coordinateur, PR et CI GitHub à suivre. VIT-25 démarre par son lot 0 après la fusion de VIT-24, conformément à son plan. Les pages Quiz et Jeux de VIT-25 attendent également le lot site de QJE-17.

## Commandes pour le chef de projet

Depuis le dépôt principal, après relecture du coordinateur.

```powershell
git -C "..\travaux-planner\vit-24-finitions-modules" push -u origin feat/vit-24-finitions-modules
gh pr create --base main --head feat/vit-24-finitions-modules --title "VIT-24 : finitions du catalogue et des pages de modules" --fill
```

## Prompt de reprise

```text
Reprends VIT-24 sur feat/vit-24-finitions-modules dans travaux-planner/vit-24-finitions-modules.
Lis AGENTS.md, la conception VIT-24 et la fiche 2026-11-28-feat-vit-24-finitions-modules-3.md.
Le code est au commit 11a19a41 et la recette locale est verte. Relis la branche et
compare les captures dans captures-vit-24/livre/index.html avant la PR du chef.
Une fois VIT-24 fusionnée, reprendre VIT-25 lot 0 sur sa propre branche avec sa mission.
```
