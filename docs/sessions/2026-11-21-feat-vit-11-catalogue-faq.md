# Session du 21 novembre 2026 · VIT-11 · Méga-menu « Fonctions »

| | |
|---|---|
| Agent | Codex |
| Branche | `feat/vit-11-catalogue-faq` |
| Dossier | `..\travaux-planner\vit-11-catalogue-faq` |
| Commit du complément | `6373472e` |

## Avancement

La branche a intégré `origin/main` de `3d6c8088` à `53561918` par avance rapide.
Le plan du catalogue et de la FAQ (#218) et les quatre pages par rôle de VIT-10
(#219, `427afdea`) sont sur cette base. La consigne du coordinateur du 21 novembre
place VIT-11 après VIT-17 et VIT-18 pour la fusion.

Le [complément du plan, § 7](../conception/vitrine/vit-11-catalogue-faq.md#7-complément-soumis-au-chef-le-21-novembre-2026--méga-menu--fonctions-)
est soumis au chef en un commit documentaire. Il propose un menu statique par catégorie,
une liste à 390 px, un accès clavier et tactile sans JavaScript et un accès direct au catalogue
sur les anciens navigateurs. Le chef doit se prononcer sur les trois questions du § 7.
Le budget proposé est de 4 Kio gzip supplémentaires par page, avec 0 octet de JavaScript
et 0 requête réseau supplémentaire pour le menu.

## Vérification et suivi

Lecture de l’en-tête, des routes et des consignes de coordination. `git diff --check`
a réussi pour le plan. Cette étape porte uniquement sur la conception. Les tests du site,
la recette clavier et les mesures comparatives sont prévus après le visa et la réalisation.

État à reporter par le coordinateur dans `suivi.md` selon la fiche de mission VIT-11 :
plan initial validé, VIT-10 intégrée, complément du méga-menu en attente du chef.

## Commandes pour le chef

Pour partager le complément documentaire, depuis le dépôt principal :

```powershell
git -C "..\travaux-planner\vit-11-catalogue-faq" push -u origin feat/vit-11-catalogue-faq
```

Pour la PR de VIT-11, après le visa, la réalisation et la réintégration de VIT-17 et VIT-18 :

```powershell
gh pr create --base main --head feat/vit-11-catalogue-faq --title "VIT-11 · Catalogue, FAQ et méga-menu Fonctions" --fill
```

## Prompt de reprise

Reprends VIT-11 sur `feat/vit-11-catalogue-faq`. Lis la boîte Codex et le § 7 du plan
(`6373472e`). Relève le visa du chef pour les trois questions, puis consigne-le avant de
coder le méga-menu. Avant la PR, réintègre `origin/main` après VIT-17 et VIT-18 et
vérifie le parcours sans JavaScript ainsi que le poids réellement ajouté.
