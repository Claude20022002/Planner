# VIT-20f · Brancher les logos des modules sur la vitrine

| | |
|---|---|
| Branche | `feat/vit-20f-logos-modules` |
| Taille | S |
| Visa | Validation du coordinateur attendue |
| Base | VIT-20 et [VIT-09c](vit-09c-logos-modules.md), fusionnés |

Le champ `logo` du registre `vitrine/src/donnees/modules.js` alimente déjà les bandeaux des pages de module et les tuiles du catalogue. Présences utilise la place réservée, et Espace de cours utilise le logo du référentiel pédagogique. VIT-09c fournit les SVG officiels dans `shared/icones/modules/`.

## Correspondance

Renseigner le registre en commençant par Présences, puis utiliser les identifiants de VIT-09c dans l’ordre métier établi.

| Modules | Champ `logo`, dans le même ordre |
|---|---|
| Emploi du temps, Présences, Espace de cours, Quiz et jeux | `planning`, `presences`, `cours`, `activites` |
| Bibliothèque, Annonces et messages, Vacataires et heures, Évaluations | `bibliotheque`, `annonces`, `vacataires`, `evaluations` |
| Inscriptions, Documents vérifiables, Stages, Frais et caisse | `inscriptions`, `documents`, `stages`, `frais` |
| Formation et financeurs, Vie scolaire, Échanges avec l’État, Paiements en ligne, Pilotage | `formation`, `familles`, `etat`, `paiements`, `pilotage` |

Le registre garde les catégories, les adresses et les états existants. Les composants utilisent les SVG intégrés par `logoModule()` dans les bandeaux et le catalogue. Le méga-menu conserve sa présentation textuelle. Le lot porte sur les SVG.

## Vérification et retour arrière

Vérifier les 17 associations dans `modules.test.js` et l’existence de chaque fichier SVG. Étendre `applications.rendu.cjs` pour vérifier les logos dans le catalogue et dans les cinq bandeaux, dont Présences. Relancer les tests unitaires, la construction Astro, les contrôles de rendu et de neutralité, axe-core et le budget EP-19 de 200 Ko. Examiner le catalogue et la page Présences à 390 et 1440 px. Un retour arrière consiste à rétablir les anciennes valeurs du registre et les assertions associées.
