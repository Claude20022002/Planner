# Session du 21 novembre 2026 · MOT-02 · mesure du supérieur

Codex · chantier MOT · branche `etude/mot-02-mesure-solveur` · dossier `..\travaux-planner\mot-02-mesure-solveur`.

## Fait

Le chef a validé Q9 à Q11 du [complément de conception](../conception/moteur-planification/mot-02-mesure-solveur.md#supérieur-21-novembre). Le visa a été commité seul (`099c8b7e`). Les deux jeux, leurs témoins, les contrôles, le lanceur et les résultats structurés sont dans `61d75955`. La branche intègre ensuite main (`60f95937`). Le solveur de cette base a le même arbre Git que la version mesurée après #182.

## Vérifié

- 25 tests du banc réussis. Les JSON du jeu historique et des deux nouveaux jeux sont reproductibles. Le contrôle de neutralité du dépôt passe.
- 4 témoins épinglés, 4 chauffes exclues, 12 passages mesurés sur deux révisions. Douze solutions complètes et faisables en moins de 600 s. Aucun conteneur de la série ne subsiste.
- À 480 étudiants, médiane souple +4 avant et après. À 960, +5 avant et 0 après. Deux pénalités de la version actuelle ont été identifiées. La cause de la différence de recherche reste ouverte pour MOT-04.
- Le [bilan](../conception/moteur-planification/mesures.md) donne les résultats par passage et les limites du verdict. Le suivi de la branche est identique à celui de main.

## État et suite

MOT-02, mesure du supérieur terminée sur la branche et prête à relire. Le coordinateur peut reporter cet état dans le suivi. Le chef publie la branche et ouvre la PR. MOT-04 reprend l’alerte de qualité à 960 étudiants. Le collège et EP-10 restent à l’étape du scolaire.

## Commandes pour le chef depuis le dépôt principal

```powershell
git -C "..\travaux-planner\mot-02-mesure-solveur" push -u origin etude/mot-02-mesure-solveur
gh pr create --base main --head etude/mot-02-mesure-solveur --title "MOT-02 : mesures du solveur sur deux jeux du supérieur" --fill
```

## Prompt de reprise

Reprends la relecture de MOT-02 dans `..\travaux-planner\mot-02-mesure-solveur`. Lis les règles du dépôt, la boîte Codex, cette fiche et le bilan du 21 novembre dans `docs/conception/moteur-planification/mesures.md`. Le visa Q9–Q11 et les mesures sont acquis. Vérifie l’état de la PR et de sa CI, puis transmets à MOT-04 la question de la qualité souple à 960 étudiants.
