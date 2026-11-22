# Session du 21 novembre 2026 · MOT-02 · `etude/mot-02-mesure-solveur`

Codex a repris MOT-02 dans `..\travaux-planner\mot-02-mesure-solveur` à la suite de la décision du chef de traiter le supérieur en premier.

## Travail livré

- `288e67bc` intègre `origin/main` à `53561918`. L’index de conception réunit les références MOT-02 et MOT-03. Le module conserve les mesures antérieures et les évolutions de main. Le contenu de `docs/plan/suivi.md` est celui de main.
- `0ba8a8cd` ajoute au plan un [complément soumis au chef](../conception/moteur-planification/mot-02-mesure-solveur.md#supérieur-21-novembre). Il spécifie le jeu multi-campus, le témoin et les seuils, et relie le protocole aux études, en particulier M1, M2 et M18.
- L’ancien jeu de 20 000 étudiants garde ses six résultats de charge. Le collège de 600 élèves et EP-10 passent à l’étape du scolaire.

## Vérifications et état laissé

Les trois modules de chaque promotion donnent chacun un CM, deux TD et quatre TP. Les quatre promotions donnent 84 séances et les huit promotions 168. La comparaison avant/après MOT-13b prévoit douze passages et quatre chauffes. Les références Git de #182 et du registre des études ont été retrouvées. Cette reprise porte sur la documentation.

MOT-02 reste en cours. La construction du jeu et les nouvelles mesures attendent les réponses du chef à Q9 (jeu et tailles), Q10 (faisabilité et durée) et Q11 (comparaison et qualité souple). La [fiche du 15 novembre](2026-11-15-etude-mot-02-mesure-solveur.md) détaille les mesures historiques.

## Commandes pour le chef depuis le dépôt principal

```powershell
git -C "..\travaux-planner\mot-02-mesure-solveur" push -u origin etude/mot-02-mesure-solveur
gh pr create --draft --base main --head etude/mot-02-mesure-solveur --title "MOT-02 : protocole et mesures du solveur dans le supérieur" --fill
```

## Prompt de reprise

Reprends MOT-02 dans `..\travaux-planner\mot-02-mesure-solveur`. Lis les règles du dépôt, la boîte Codex, cette fiche et le § 12 du plan. Vérifie la réponse du chef à Q9–Q11. Une fois le visa reçu, consigne ses réponses dans le plan et commite cette validation seule. Implémente ensuite le jeu et le témoin dans le banc MOT-02, vérifie-les avant de mesurer, puis publie les résultats par taille et version dans `mesures.md`.
