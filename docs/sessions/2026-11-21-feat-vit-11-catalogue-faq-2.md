# Session du 21 novembre 2026 · VIT-11 · Réalisation après visa

| | |
|---|---|
| Agent | Codex |
| Branche | `feat/vit-11-catalogue-faq` |
| Dossier | `..\travaux-planner\vit-11-catalogue-faq` |
| Base intégrée | `53561918` |
| Visa du chef | `55f3bc59` |
| Réalisation | `bc19c2a4` |

Le chef a validé le [complément du plan](../conception/vitrine/vit-11-catalogue-faq.md).
Le menu compte 23 fonctionnalités dans 11 catégories. Le catalogue les regroupe sous
sept applications. La FAQ présente les sept réponses visées et les reproduit en JSON-LD.
Les deux pages sont construites en français, en anglais et avec repli français pour l’arabe.

## Poids du méga-menu sur une arrivée à froid

Deux builds de production locaux avec le même registre et le même pied de page, sur l’accueil.
Somme du HTML et des feuilles CSS de la page, chaque ressource compressée séparément avec gzip
niveau 9. Les styles intégrés sont comptés dans le HTML. Le tableau donne le delta par rapport
à l’ancien menu.

| Langue | Octets bruts ajoutés | Octets gzip ajoutés | Requêtes initiales, avant → après |
|---|---:|---:|---:|
| Français | 9 414 | 1 412 | 6 → 6 |
| Anglais | 9 274 | 1 330 | 6 → 6 |
| Arabe (repli) | 9 414 | 1 414 | 6 → 6 |

Les scripts initiaux ont les mêmes empreintes. L’ouverture et les liens de catégorie dans
le panneau déclenchent zéro requête supplémentaire. Le plafond validé est de 4 096 octets gzip.

## Recette locale

- Build Astro réussi, 58 pages. Neutralité réussie. 101 tests unitaires réussis, aucun sauté,
  y compris `git cat-file -e` pour les preuves StudyLib à `a8349801f351e884cc9e2877a649b51825f7ff50`.
- Six parcours Chromium réussis à 390, 768 et 1440 px, avec et sans JavaScript. Vérifiés au
  clavier et avec événements tactiles : ouverture, focus, Échap, retour au bouton, fermeture
  tactile et navigation vers le catalogue. Contrôle complémentaire des ancres, des comptes, des
  destinations et du repli FR/EN/AR en simulant l’absence de prise en charge CSS de Popover.
- Le filtre répond à la saisie et annonce zéro résultat en cas de recherche sans correspondance.
  Sans JavaScript les 23 entrées restent visibles. Les sept réponses visibles correspondent au
  JSON-LD sur la page française. Axe-core n’a relevé aucune violation sur le menu ouvert,
  le catalogue et la FAQ en français à 1440 px.
- Lighthouse mobile en français, dans l’ordre accueil / catalogue / FAQ : performance
  **78 / 81 / 99** au premier passage, **96 / 99 / 99** au second. Accessibilité et SEO
  à 100 sur les trois pages aux deux passages. Sur le témoin, performance **77 / 99 / 84**.
  Le seuil de performance de l’accueil varie selon le passage. À remesurer sur la base intégrée.

Pour rejouer les contrôles sur un poste qui possède le clone StudyLib, les dépendances
verrouillées de la vitrine et de `frontend`, et Chromium Playwright, depuis le dossier VIT-11 :

```powershell
$env:STUDYLIB_DEPOT = (Resolve-Path '..\..\StudyLib').Path
npm --prefix vitrine run test:unit
npm --prefix vitrine run build
node --test vitrine/tests/menu-fonctions.parcours.cjs
node scripts/verifier-neutre.mjs
```

## Suivi et commandes pour le chef

État à reporter par le coordinateur : VIT-11 réalisée et vérifiée localement.
Avant la PR, réintégrer `origin/main` après VIT-17 et VIT-18 et refaire la recette,
en particulier sur `EnTete.astro`. La CI de la PR reste à exécuter.

Depuis le dépôt principal, pour le chef après cette intégration :

```powershell
git -C "..\travaux-planner\vit-11-catalogue-faq" push -u origin feat/vit-11-catalogue-faq
gh pr create --base main --head feat/vit-11-catalogue-faq --title "VIT-11 · Catalogue, FAQ et méga-menu Fonctions" --fill
```

## Prompt de reprise

Reprends VIT-11 sur `feat/vit-11-catalogue-faq`. Le visa est dans `55f3bc59` et la
réalisation dans `bc19c2a4`. Lis la boîte Codex et cette fiche. Vérifie les fusions VIT-17
et VIT-18, puis réintègre `origin/main` avant la PR. Rejoue les contrôles de cette fiche,
la mesure comparative du menu et Lighthouse. Transmets les résultats au chef pour la PR.
