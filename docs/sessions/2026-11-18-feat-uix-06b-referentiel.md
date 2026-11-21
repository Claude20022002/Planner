# Session du 2026-11-18 · UIX-06b · R0

| | |
|---|---|
| Agent | Codex |
| Chantier | UIX, exception autorisée le 16 novembre |
| Dossier | `..\travaux-planner\uix-06b-referentiel` |
| Branche | `feat/uix-06b-referentiel` |
| Point de départ des lots | `4963e827` |

## Objectif et plan

Préparer le point de départ commun prévu par la fiche d’équipe. Le [plan UIX-06b](../conception/interface/uix-06b-referentiel.md) est validé depuis le 16 novembre.

## Fait

- `0d39e458` Composants communs et portée du thème. L’index i18n charge huit dictionnaires vides, un par écran et par langue, sous `gestion`.
- `470f1a76` Filières et Groupes.
- `4963e827` Modules et Enseignements. Ce commit est la base à utiliser pour le lot Cursor.

## Vérifié

- `npm run lint` : 0 erreur et 17 avertissements dans des fichiers hors du lot.
- `npm run test:unit` : 65 réussis sur 65.
- `npm run build` : réussi en 2 min 7 s, 13 582 modules transformés. Vite signale des bundles au-dessus du seuil de 300 kB.
- `git diff --cached --check` : réussi avant chaque commit.
- Les parcours métier et les contrôles visuels attendent la recette et la CI.

## Suite

Le coordinateur transmet le SHA R0 à Cursor, qui prend Groupes et Modules. Codex prend le commun, Filières et Enseignements. À R1, contrôler les fichiers du lot Cursor avant intégration locale et relancer les contrôles prévus.

## Commandes pour le chef après intégration et relecture

~~~powershell
git -C "..\travaux-planner\uix-06b-referentiel" push -u origin feat/uix-06b-referentiel
gh pr create --base main --head feat/uix-06b-referentiel --title "UIX-06b : référentiel pédagogique" --fill
~~~

## Prompt de reprise

~~~text
Reprends UIX-06b sur feat/uix-06b-referentiel dans ..\travaux-planner\uix-06b-referentiel.
Lis AGENTS.md, docs/plan/suivi.md, ta boîte, la conception validée et cette fiche.
Lis la mission d’équipe dans ..\travaux-planner\coordination-equipe.
R0 : 4963e827, lint sans erreur, 65/65 unitaires, build réussi. Le lot Cursor part de ce SHA.
Vérifie le commun, Filières et Enseignements, puis intègre Groupes et Modules à R1 après contrôle du périmètre.
Recette métier et visuelle en CI. Travaille localement.
~~~
