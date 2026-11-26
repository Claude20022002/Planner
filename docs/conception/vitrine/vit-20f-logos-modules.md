# VIT-20f · Brancher les logos des modules sur la vitrine

| | |
|---|---|
| Branche | `feat/vit-20f-logos-modules` |
| Taille | S |
| Visa | Validation du coordinateur attendue sur ce plan révisé |
| Base | VIT-20 et [VIT-09d](vit-09d-logos-style-planner.md), série B fusionnée par la PR #277 (`0c568ecb`) |

Les 20 logos de la série B remplacent les SVG précédents sous les mêmes noms dans `shared/icones/modules/`. Sur la base fusionnée, Présences a encore `logo: null`, Espace de cours pointe vers `pedagogie` et la place réservée utilise un rayon de 22 sur un cadre de 96, contre 19,5 pour la série B.

## Correspondance

Renseigner le champ `logo` du registre `vitrine/src/donnees/modules.js`, en commençant par Présences et Espace de cours, selon les associations suivantes.

| Modules | Champ `logo`, dans le même ordre |
|---|---|
| Emploi du temps, Présences, Espace de cours, Quiz et jeux | `planning`, `presences`, `cours`, `activites` |
| Bibliothèque, Annonces et messages, Vacataires et heures, Évaluations | `bibliotheque`, `annonces`, `vacataires`, `evaluations` |
| Inscriptions, Documents vérifiables, Stages, Frais et caisse | `inscriptions`, `documents`, `stages`, `frais` |
| Formation et financeurs, Vie scolaire, Paiements en ligne, Échanges avec l’État, Pilotage | `formation`, `familles`, `paiements`, `etat`, `pilotage` |

Dans `vitrine/src/components/applications/logos.js`, passer le rayon du rectangle de la place réservée à `rx="19.5"`, avec le même cadre 96 × 96. `logoModule()` fournit déjà les SVG aux tuiles du catalogue et aux bandeaux. Le périmètre d’écriture couvre ce fichier, le registre, leurs tests, le plan et la fiche de session. Les composants d’en-tête et d’ouverture relèvent de VIT-23.

## Vérification et retour arrière

Vérifier les 17 associations dans `modules.test.js` et l’existence des SVG. Étendre `applications.rendu.cjs` pour vérifier les logos dans le catalogue et les cinq bandeaux, notamment les SVG distincts de Présences et d’Espace de cours. Vérifier le rayon de la place réservée au moyen du helper. Lancer les tests unitaires, le build Astro, les contrôles de rendu et de neutralité, axe-core et le budget EP-19 de 200 Ko. Examiner le catalogue et Présences à 390 et 1440 px. Pour revenir en arrière, rétablir les valeurs du registre, le rayon de la place réservée et leurs assertions.
