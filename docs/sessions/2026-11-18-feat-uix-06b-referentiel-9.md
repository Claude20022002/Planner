# Session du 18 novembre 2026 · UIX-06b · Contraste du dialogue Filières

Branche `feat/uix-06b-referentiel`, dossier `..\travaux-planner\uix-06b-referentiel`, agent Codex.

## Diagnostic

Le chef a demandé de corriger les deux échecs Filières de la PR #199 sur `24d96588`.
Les traces de l’exécution [44315781932](https://github.com/Claude20022002/Planner/actions/runs/44315781932/job/134841374300)
situent les deux erreurs dans l’audit du dialogue, après la réussite de l’audit de la page. Le champ Code
est déjà visible pendant la transition d’ouverture de Material UI.

Avec les réponses de démonstration de la CI et le frontend compilé, Chromium reproduit le défaut
en anglais sombre à 390 px et en français clair à 1 280 px. Sur trois ouvertures par format,
l’opacité au premier relevé allait de 0,013 à 0,064. Les six audits pendant le fondu signalent
`color-contrast`. Les six audits à l’opacité finale ne signalent aucune violation.

## Correctif et vérifications

Le parcours attend que le conteneur du dialogue atteigne l’opacité 1 avant de lancer axe-core.
Il conserve le contrôle du champ Code, les quatre catégories WCAG A/AA et toutes les cibles du dialogue.

- Les deux scénarios Playwright corrigés passent chacun trois fois sur Chromium avec le frontend compilé,
  les réponses API de démonstration rejouées localement et axe-core 4.10.3. L’authentification réelle
  et l’ensemble des parcours restent à vérifier par la CI.
- 74 tests unitaires réussis. Lint sans erreur, 17 avertissements existants. Compilation et neutralité réussies.

## Commandes pour le chef

~~~powershell
git -C "..\travaux-planner\uix-06b-referentiel" push origin feat/uix-06b-referentiel
gh pr checks 199 --watch
~~~

## Prompt de reprise

Surveille la CI puis la fusion de #199. Après sa fusion, applique le message UIX-09 de 12 h 11 dans
`feat/uix-09-grille-applications`, vérifie le parcours Applications et dépose le rapport du commit local.
