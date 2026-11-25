# Session du 21 novembre 2026 · VSC-01 · N7

| | |
|---|---|
| Agent | Codex |
| Branche | `etude/vsc-01-modele-scolaire` |
| Dossier | `..\travaux-planner\vsc-01-modele-scolaire` |
| PR | #215 |

## Livré

Intégration locale de `origin/main` dans `d930210c`. Le commit `b109e66b` documente le
système d’évaluation affecté à la classe et à l’année, les résultats et règles communs à
VSC-04 et VSC-08, et le périmètre des bulletins, crédits et jurys. Le scénario de recette
couvre deux classes du même cycle, le verrouillage d’une période et la conservation de
l’historique. [Conception C-5, § 2.1](../conception/vie-scolaire/conception-c5-modele-donnees-scolaire.md)

## Vérifications et suivi

Relecture des mentions de période dans C-5 et du diagramme. Le fichier de l’étude cité existe.
`git diff --check` passe. Cette étape porte sur la conception seule. La PR #215 affichait
zéro avis et zéro commentaire lors du contrôle. État à reporter par le coordinateur :
N7 documenté, avis des groupes A et B attendus avant la fusion, puis gel de VSC-01.

## Commande pour le chef

```powershell
git -C "..\travaux-planner\vsc-01-modele-scolaire" push origin etude/vsc-01-modele-scolaire
```

## Prompt de reprise de VSC-01

Reprends la PR #215 sur `etude/vsc-01-modele-scolaire`. Lis le § 2.1 de C-5 à
`b109e66b` et relève les avis des groupes A et B. Traite les retours documentaires
avec le chef avant la fusion. VSC-01 se clôt en conception.
