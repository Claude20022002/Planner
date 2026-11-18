# Session du 2026-11-18 · Coordination : équipe d'agents, UIX-06b puis UIX-06c · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur (session `plan-b-projet-pacte-8a`) |
| Chantier | aucun (UIX-06b : exception du 16 nov. ; UIX-06c : exception demandée) |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | voir `git log` de la branche |

## Objectif de la session

Demande du chef, le 17 nov. au soir : un plan de développement pour la soirée, avec tous les agents (Claude dans VS Code, agent de Cursor, Codex) sur la même tâche, en équipe, sans conflit, chacun avec le modèle le plus adapté, en développement par composants. Trouver un skill d'équipe, ou en créer un.

## Plan

- Chercher un skill existant : `coordination` attribue une mission par agent, mais ne fait pas travailler plusieurs agents sur la même fonction. Aucun skill d'équipe parmi ceux du poste (`npx skills find` est refusé sur ce poste). Donc : écrire le skill `equipe`, et des règles lisibles par les trois agents (`docs/plan/equipe.md`).
- Tour d'état, puis deux questions au chef (tâche commune ; sessions en cours).

## Fait

- `docs/plan/equipe.md` : rôles (coordinateur, intégrateur, membres), un propriétaire par fichier, dictionnaires et parcours coupés par lot, repères de taille des composants, branches de lot locales, rendez-vous R0 et suivants, contrôle des fichiers avant fusion, canaux, modèles, fin.
- `.claude/skills/equipe/SKILL.md` : skill du coordinateur pour former et conduire l'équipe.
- `AGENTS.md`, point 3 : renvoi vers `equipe.md` pour une mission d'équipe.
- `docs/plan/missions/uix-06b-equipe.md` : équipe, modèles, propriétaires, rendez-vous de la nuit, livrables de R1, prompts.
- `docs/conception/interface/uix-06c-ressources-temps.md` : plan d'UIX-06c (Salles, Campus, Créneaux, Calendrier), à valider.
- `docs/plan/decisions.md` et `docs/plan/suivi.md` (« Missions en cours »).

## Vérifié

- État d'UIX-06b lu dans le dossier de Codex : 3 commits de plan, 10 fichiers modifiés et 20 nouveaux non commités depuis le 16 nov. à 9 h 38 ; pages de 20 à 33 lignes.
- Aucune PR ouverte ne touche `AGENTS.md`, `organisation.md` ni `.claude/skills/`.
- Rien d'exécuté d'autre : documentation seule.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Tâche commune | UIX-06b puis UIX-06c (chef, 17 nov.) | tranchée |
| 2 | Sessions Claude en cours | elles finissent leur étape ; celle de QUA-10 rejoint (chef, 17 nov.) | tranchée |
| 3 | Valider le plan d'UIX-06c et l'exception hors chantier | proposition : oui | ouverte |
| 4 | Si R0 n'est pas prêt à 01 h 15 | proposition : reporter à demain | ouverte |

## État laissé

- « Missions en cours » : trois lignes UIX-06b et une ligne UIX-06c.
- Conflit attendu : `decisions.md` (section ajoutée en fin de fichier, comme #193) ; garder les deux sections.

## Reste à faire, dans l'ordre

1. Codex fait R0 ; le coordinateur lance les deux lots avec le sha.
2. R1, intégration, relecture ; le chef pousse `feat/uix-06b-referentiel` et ouvre la PR.
3. Le chef répond aux questions 3 et 4 ; si UIX-06c est validée, fiche d'équipe d'UIX-06c.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\coordination-equipe" push -u origin doc/coordination-equipe
gh pr create --base main --head doc/coordination-equipe --title "Coordination : travail en équipe (skill equipe), UIX-06b en équipe, plan d'UIX-06c" --fill
```

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner. Tu reprends la mission d'équipe UIX-06b
(puis UIX-06c), sur la branche doc/coordination-equipe, dossier ..\travaux-planner\coordination-equipe.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, docs/plan/equipe.md,
docs/plan/missions/uix-06b-equipe.md, le skill .claude/skills/equipe/SKILL.md et cette fiche.
Fait : règles d'équipe, skill, fiche d'équipe, plan d'UIX-06c ; R0 demandé à Codex.
Reste : relever les boîtes et les messages, lancer les lots à R0, suivre R1, relire l'intégration.
Questions en attente : 3 (UIX-06c), 4 (report si R0 en retard).
Règles : tu ne codes aucun lot ; questions avant toute supposition ; jamais de git push.
```
