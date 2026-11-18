# Session du 2026-11-18 · Coordination : équipe d'agents, UIX-06b, site vitrine, grille, audit · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur, session `plan-b-projet-pacte-8a` (Cursor) |
| Chantier | aucun : UIX-06b (exception du 16 nov.), VIT (préparation dégelée), UIX-09 et l'audit sont hors chantier, accordés par le chef |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; avant : `9c941db2` |

## Objectif de la session

Demandes du chef, du 17 nov. au soir au 18 nov. au matin :
- un plan de développement pour la soirée, avec tous les agents sur la même tâche, en équipe, sans conflit, chacun avec son modèle, en composants courts ; trouver ou créer un skill d'équipe ;
- un site vitrine au style d'apple.com et une grille d'applications façon icloud.com ;
- corriger l'audit des dépendances, rouge sur `main`.

## Plan

Pas de code par le coordinateur : règles, fiches, plans à faire valider, consignes, suivi.

## Fait

| Commit | Quoi |
|---|---|
| `76353719` | `docs/plan/equipe.md` (règles du travail en équipe), skill `.claude/skills/equipe/`, renvoi dans `AGENTS.md` (point 3), fiche [uix-06b-equipe](../plan/missions/uix-06b-equipe.md), plan d'[UIX-06c](../conception/interface/uix-06c-ressources-temps.md) (à valider, reporté), décisions, suivi |
| `0cd384e1` | fusion locale de `doc/coordination-2026-11-16` (ancien coordinateur, jamais poussée) ; conflit de « Missions en cours » réglé |
| `274f1994` | plans du [site vitrine](../conception/vitrine/vit-vitrine.md) et d'[UIX-09](../conception/interface/uix-09-grille-applications.md), fiche [vit-equipe](../plan/missions/vit-equipe.md), lot Enseignements passé à Codex |
| `5de46de9` | les deux plans validés par le chef ; couleurs provisoires prises sur le logo (§ 4 bis du plan) ; logo « mosaïque » gardé dans l'application |
| `47d6bb56` | R0 d'UIX-06b fait par Codex (`4963e827`), vérifié |
| `7b4fa842` | l'agent de Cursor passe aux pages du site ; Codex tient tout UIX-06b ; décisions du chef relevées dans la fiche du site ; écarts 2 à 6 du site acceptés |
| `2c1dcb7e`, `9c941db2` | [plan court de l'audit](../conception/exploitation/fix-audit-dependances.md), validé par le chef |

Hors dépôt :
- messages dans `..\travaux-planner\boites\` (R0 à Codex, consignes à l'agent de Cursor, redistribution) ;
- photos des logos copiées dans `boites\ressources\` ;
- mémoire `equipe-agents`.

## Vérifié

- R0 d'UIX-06b, lu dans le dossier de Codex : trois commits, dossier propre, huit dictionnaires inscrits dans l'index, pages de 117 lignes en tout.
- Fiche du site (`feat/vit-01-vitrine`), selon la session du site :
  - 23 tests unitaires verts, build vert ;
  - Lighthouse à 100 sur les quatre notes, axe-core sans violation ;
  - LCP de 0,9 s sur téléphone simulé.
- PR #195 : « Test Backend » rouge à l'audit de `backend/`, comme sur `main`. Cause relevée avec `npm audit --omit=dev` : picomatch, avis GHSA-fc5q-39xc-vjpf, sans version corrigée (4.0.7 est la dernière) ; plus `qs` 6.16.0, corrigé en 6.17.1. Dans `vitrine/`, 11 failles des outils de construction ; Astro 7.4.12, publié le 13 nov., en corrige une partie.
- Rien d'autre lancé.

## Écarts

- UIX-06c reportée à la demande du chef (le site et la grille passent devant).
- L'agent de Cursor n'a pas fait Groupes et Modules d'UIX-06b : redistribution de 02 h 12, Codex a tout repris.
- La session du site ne trouvait pas le coordinateur par message : le chef a relayé ses fiches.

## Questions

| N° | Question | Proposition | À qui | État |
|---|---|---|---|---|
| 1 | Plan d'UIX-06c et exception hors chantier | oui, après UIX-09 | chef | ouverte |
| 2 | SVG officiels des logos | à déposer dans `vitrine/public/logo/` | chef | ouverte |
| 3 | Adresses de contact du site | attendre VIT-02 et Q-11 | chef | ouverte |
| 4 | Modèle de l'agent de Cursor (Grok 4.7, la fiche demande le plus fort) | le chef choisit dans Cursor | chef | ouverte |

## État laissé, le 18 nov. à 10 h 10

**À traiter en premier par la session suivante, non lus par le coordinateur :**
- `boites\codex\sortie\` :
  - `2026-11-18-0934-uix-06b-correction-plan-groupes.md`
  - `2026-11-18-1002-uix-06b-r1-local.md`
  - `2026-11-18-1009-uix-06b-fin-r1.md`
  - la branche `feat/uix-06b-referentiel` (`7b5b8fc9`) est transmise pour relecture ;
- `boites\cursor\sortie\2026-11-18-1006-vitrine-pages-fin.md` : lot des pages fini (`feat/vit-01-vitrine-pages`, `12ccb3ba`) ;
- `feat/vit-01-vitrine` (`19167d6f`) : sa fiche parle d'un « doublon du lot de pages, tranché par le chef », à lire.

Le reste :
- **Missions en cours** (`suivi.md`) : UIX-06b (Codex), site vitrine (Claude de VS Code et agent de Cursor), UIX-09 (Codex, à lancer après UIX-06b), UIX-06c (reportée).
- **Correctif de l'audit** : plan validé ; la session du site le fait après son intégration (prompt donné au chef) ; branche `fix/audit-dependances`, pas encore créée au relevé.
- **Branches de cette nuit, non poussées** : `doc/coordination-equipe`.
- **PR ouvertes de cette nuit** : #192 (étude 11), #193 (plan de parité), #195 (site vitrine).
- **Conflits attendus** : `decisions.md` avec #193 (deux sections en fin de fichier) ; garder les deux.

## Reste à faire, dans l'ordre

1. Lire les quatre rapports ci-dessus et les ranger dans `sortie\traites\`.
2. Relire `feat/uix-06b-referentiel` (skill `relecture-branche`, périmètre de la fiche uix-06b-equipe) ; verdict et commandes au chef.
3. Vérifier l'intégration des pages dans `feat/vit-01-vitrine` et le « doublon » ; relire la branche ; la PR #195 se met à jour quand le chef pousse.
4. Lancer Codex sur UIX-09 (prompt « Codex » de la fiche vit-equipe) dès le verdict d'UIX-06b.
5. Suivre `fix/audit-dependances` ; proposer l'ordre de fusion : l'audit d'abord, puis #195 et UIX-06b.
6. Clore les fiches d'équipe terminées ; mettre à jour « Missions en cours ».

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\coordination-equipe" push -u origin doc/coordination-equipe
gh pr create --base main --head doc/coordination-equipe --title "Coordination : travail en équipe (skill equipe), UIX-06b, site vitrine, UIX-09, plan de l'audit" --fill
```

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner (Claude, Codex, agent de Cursor). Tu reprends la coordination
du 18 novembre, sur la branche doc/coordination-equipe, dans le dossier ..\travaux-planner\coordination-equipe.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md (« Missions en cours »), docs/plan/equipe.md,
les skills .claude/skills/coordination, equipe et relecture-branche, puis cette fiche
(docs/sessions/2026-11-18-doc-coordination-equipe.md) et les fiches docs/plan/missions/uix-06b-equipe.md et vit-equipe.md.
Commence par le tour d'état (skill coordination, § 1).
Ensuite :
1) lis les rapports non lus de ..\travaux-planner\boites\codex\sortie\ (09 h 34, 10 h 02, 10 h 09) et de
   boites\cursor\sortie\ (10 h 06), puis range-les dans traites\ ;
2) relis feat/uix-06b-referentiel (relecture-branche) et donne le verdict au chef ;
3) vérifie l'intégration des pages dans feat/vit-01-vitrine (PR #195) et le « doublon » tranché par le chef ;
4) lance Codex sur UIX-09 (plan validé) par sa boîte ;
5) suis fix/audit-dependances (plan validé) et propose l'ordre de fusion : l'audit d'abord.
Questions en attente du chef : UIX-06c, SVG des logos, adresses de contact, modèle de l'agent de Cursor.
Règles : tu ne codes aucun lot ; pas de code hors d'un plan validé ; questions avant toute supposition ;
chaque décision dans decisions.md ; fiche de session et suivi.md à jour en fin de session ; jamais de git push.
La session du site (VS Code) ne te joint pas par message : le chef relaie.
```
