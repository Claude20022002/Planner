# Session du 21 novembre 2026 · VIT-11 · Recette après #237

| | |
|---|---|
| Agent | Codex |
| Chantier | VIT |
| Branche | `feat/vit-11-catalogue-faq` · PR #236 |
| Dossier | `..\travaux-planner\vit-11-catalogue-faq` |
| Base intégrée | `71b86df5`, fusion de #237, incluant VIT-18 (#228) |
| Fusion locale | `95501c15` |
| Correctif recetté | `278af55c` |

## Intégration

Le [plan validé, § 7.4](../conception/vitrine/vit-11-catalogue-faq.md) demande de recetter le méga-menu sur la base VIT-17 et VIT-18. Le seul conflit de fusion concernait le tableau du module VIT. Les lignes VIT-11, VIT-17 et VIT-18 sont présentes. L’en-tête conserve le script en ligne de VIT-17 et la règle mobile de VIT-11.

Le catalogue et la FAQ utilisent `getStaticPaths = cheminsLangues`. Astro construit 39 pages au total, dont les quatre routes catalogue et FAQ en français et en anglais. Le build ne contient aucun répertoire `ar/`.

Deux tests ont signalé l’ancienne formulation sur l’IA après la fusion. La FAQ reprend la réponse 8 validée par le chef dans VIT-18, ainsi que sa traduction déjà utilisée sur la page Enseignants. L’entrée `quiz-ia` du catalogue reprend la même condition en français et en anglais. Un test la vérifie aux deux endroits.

## Résultats de la recette locale

- **110 tests unitaires réussis**, aucun sauté. Les preuves StudyLib ont été vérifiées dans le clone local à la révision épinglée. Le contrôle de neutralité passe.
- **Six parcours Chromium réussis**, à 390, 768 et 1440 px avec et sans JavaScript. Ouverture au clavier et au toucher, Échap et retour du focus, fermeture tactile, passage de Solutions à Fonctions, dernière catégorie et dernier lien atteignables, aucun débordement horizontal. Le filtre annonce zéro résultat pour une recherche vide de correspondances. Les 23 entrées restent visibles sans JavaScript.
- En FR et EN, les 23 destinations et leurs libellés, les mentions « Bientôt », les comptes des 11 catégories et les ancres uniques concordent avec le registre. Le lien de repli mène au catalogue sans prise en charge de Popover. L’ordre des colonnes a été vérifié en simulant `dir="rtl"` sur le HTML publié.
- Les sept réponses de la FAQ française correspondent au JSON-LD du build. **Axe-core, zéro violation** sur le menu ouvert, le catalogue et la FAQ en français à 1440 px.

### Budget du méga-menu

Deux builds de production utilisent les mêmes sources, registre, pied de page et dépendances. Seul l’en-tête du témoin provient de `origin/main` à `71b86df5`. Mesure sur l’accueil à cache vide, en additionnant HTML et feuilles CSS, compressés séparément au niveau gzip 9.

| Langue | Delta brut (octets) | Delta gzip (octets) | Requêtes initiales témoin → VIT-11 |
|---|---:|---:|---:|
| FR | +9 414 | +1 420 | 6 → 6 |
| EN | +9 274 | +1 344 | 6 → 6 |

Le maximum est de 1 420 octets pour un plafond de 4 096. Les scripts initiaux ont les mêmes empreintes. L’ouverture du menu et la navigation entre ses catégories ajoutent zéro requête.

### Lighthouse mobile

Lighthouse 13.4.0, Chromium local, build de production, pages françaises.

| Page | Performance | Accessibilité | SEO | CLS |
|---|---:|---:|---:|---:|
| Accueil | 96 | 100 | 100 | 0,002382 |
| Catalogue | 99 | 100 | 100 | 0 |
| FAQ | 99 | 100 | 100 | 0,037819 |

À 390 px, les trois pages affichent la navigation lorsque JavaScript est coupé et placent l’en-tête en position relative. Avec JavaScript, l’en-tête est collant à l’arrivée, passe en position relative à l’ouverture du menu mobile puis redevient collant à la fermeture. Le CLS du tableau est celui de la page entière.

## État et commandes pour le chef

VIT-11 est recettée localement sur #237. Le coordinateur peut reporter cet état dans `suivi.md`. La PR #236 existe déjà. Depuis le dépôt principal, le chef actualise la PR puis vérifie la CI sur les nouveaux commits.

```powershell
git -C "..\travaux-planner\vit-11-catalogue-faq" push origin feat/vit-11-catalogue-faq
gh pr checks 236 --watch
```

## Prompt de reprise

Reprends VIT-11 dans `..\travaux-planner\vit-11-catalogue-faq`, branche `feat/vit-11-catalogue-faq`. Lis la mission VIT-11 et cette fiche. La fusion locale est `95501c15` et le correctif recetté est `278af55c`. Vérifie la CI de la PR #236 après le push du chef et traite tout écart dans le périmètre VIT-11.
