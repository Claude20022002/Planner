# Session du 2026-11-15 · coordination des agents · `chore/coordination-agents`

| | |
|---|---|
| Fait par | Claude Code dans Cursor (Fable 5.2) |
| Chantier | hors chantier, à la demande du chef le 15 novembre |
| Dossier de travail | `..\travaux-planner\coordination-agents` |
| Dernier commit | voir `git log -1 chore/coordination-agents` |

## Objectif de la session

Le chef travaille avec quatre agents : Claude et l'agent de Cursor dans Cursor, Claude et Codex dans VS Code. Il demande qu'une session les coordonne : répartir, suivre le travail de chacun par module, relire, prendre les décisions techniques courantes et lui laisser les importantes.

## Plan

**Validé par Claude20022002 le 2026-11-15.**

**Cause** : quatre agents travaillent en parallèle sans personne pour répartir, relire et tenir l'état. Constaté le 15 novembre : `suivi.md` en retard sur `main` (PLA-03 encore « PR ouverte » après la fusion de #173), quatre branches qui modifient les mêmes tableaux de `suivi.md` et de `decisions.md`, un plan (EXP-02a) non commité dans un dossier de travail.

**Ce qui change** :

1. `AGENTS.md`, `docs/plan/organisation.md`, `docs/plan/decisions.md` : le rôle de **coordinateur**, tenu par une session Claude désignée par le chef.
   - Il tranche ce qui est réversible à l'intérieur d'un module, et note chaque décision dans `decisions.md`.
   - Il valide les plans des fonctions S et M sans migration ni enjeu de sécurité ; le chef valide le reste.
   - Le chef seul pousse, fusionne et lance les commandes du serveur.
2. Trois skills dans `.claude/skills/` : `coordination` (tour d'état, attribution d'une mission), `relecture-branche` (une branche comparée à son plan et à son périmètre), `fin-de-session` (points 9 à 12 d'`AGENTS.md`).
3. `docs/plan/missions/<identifiant>.md` : une fiche par mission (agent, branche, dossier, fichiers qu'il peut écrire, prompt à coller). C'est par elle que le coordinateur tient Codex et l'agent de Cursor, qu'il ne peut pas piloter en direct.
4. Une colonne « Agent » dans le tableau des fonctions de `suivi.md`.
5. `.claude/skills/SOURCES.md` : les sources lues, « idées reprises, rien de copié ».

**Vérification** : `node scripts/verifier-neutre.mjs` ; les trois skills apparaissent dans la liste des skills ; le tour d'état est lancé sur la situation réelle du 15 novembre et son résultat est montré au chef.

**Hors de ce plan** : lancer Codex ou l'agent de Cursor en ligne de commande depuis la session du coordinateur.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quelles décisions techniques le coordinateur prend-il seul ? | les décisions réversibles, à l'intérieur d'un module | réglé |
| 2 | Qui valide les plans de conception ? | le coordinateur pour S et M ; le chef pour L, XL, et tout plan avec migration, sécurité, donnée de mineur ou choix de produit | réglé |
| 3 | Skills créés ou récupérés ? | chercher d'abord, puis adapter | réglé |
| 4 | Qui pousse et fusionne ? | le chef seul | réglé |

## Fait

- `5008338` : plan court validé, `suivi.md` à « en cours ».
- `9a41a63` :
  - `AGENTS.md`, `CLAUDE.md`, `docs/plan/organisation.md` (§ 1, § 5, nouveau § 10), `docs/plan/decisions.md` (six lignes du 15 novembre) : le rôle de coordinateur, ce qu'il tranche, ce qu'il valide ;
  - `.claude/skills/coordination`, `relecture-branche`, `fin-de-session` ;
  - `docs/plan/modeles/mission.md`, `docs/plan/missions/README.md` ;
  - `docs/plan/suivi.md` : tableau « Missions en cours », rempli avec l'état réel du 15 novembre ; PLA-03a, #167 et #170 marquées fusionnées ;
  - `.claude/skills/SOURCES.md` : trois skills publics lus, rien de copié.

**Écart avec le plan, à confirmer par le chef** : le plan prévoyait une colonne « Agent » dans le tableau des fonctions de `suivi.md`. Elle aurait modifié ses 150 lignes et mis en conflit toutes les branches ouvertes (#164, #171, #172, MOT-13). À la place : un tableau « Missions en cours », dans le même fichier.

## Vérifié

- `node scripts/verifier-neutre.mjs` : aucun nom d'école en dur, code de sortie 0.
- Tour d'état lancé sur la situation réelle : son résultat est le tableau « Missions en cours » et la liste ci-dessous.
- **Non vérifié** : l'apparition des trois skills dans la liste des skills. Ils sont dans ce dossier de travail ; ils n'apparaîtront qu'une fois la branche fusionnée, ou dans une session ouverte sur ce dossier.
- Recherche de skills publics : `npx skills find` a été refusée par le contrôle des permissions du poste ; la recherche s'est faite par le web. Un skill (`agent-handoff`, wecansync) n'a pas pu être lu.

## Écarts trouvés par le tour d'état du 15 novembre

1. `main` local a 7 commits de retard sur `origin/main`.
2. `feat/mot-13-contraintes` : plan validé et commité, mais **aucune fiche de session**, branche non poussée.
3. `feat/exp-02a-traefik` : plan **non commité** dans le dossier de travail, marqué « en attente ».
4. Quatre chantiers seront ouverts (EXP, PLA, QUA, MOT) tant que #171 n'est pas fusionnée.
5. #164, #171, #172 et MOT-13 modifient toutes `suivi.md` et `decisions.md` : garder toutes les lignes.
6. PLA-06 : la mesure sur 200 bases n'est pas faite, alors que la confirmation de la pile (#171) en dépend.

## État laissé

- `docs/plan/suivi.md` : ligne « Coordination des agents » des travaux hors chantier → écrit, à pousser.
- Chantiers : inchangés.

## Reste à faire, dans l'ordre

1. Le chef confirme ou refuse l'écart (tableau au lieu d'une colonne).
2. Le chef pousse la branche et ouvre la PR.
3. Le chef fusionne #171 puis #172 (CI vertes), puis cette PR.
4. Le coordinateur écrit les premières fiches de mission : PLA-03b, MOT-13a, PLA-06, EXP-02a, selon le choix du chef.

## Commandes pour le chef de projet

```powershell
git switch main && git pull --ff-only
git -C "..\travaux-planner\coordination-agents" push -u origin chore/coordination-agents
gh pr create --base main --head chore/coordination-agents --title "Coordination des agents : coordinateur, skills, fiches de mission" --fill
```

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner (décision du chef du 15 novembre 2026).
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md (tableau « Missions en cours »),
docs/plan/organisation.md § 10, puis la fiche docs/sessions/2026-11-15-chore-coordination-agents.md.
Si la branche chore/coordination-agents n'est pas fusionnée, ces fichiers sont dans
..\travaux-planner\coordination-agents, avec les skills .claude/skills/coordination,
relecture-branche et fin-de-session : lis-les là.
Fait : rôle de coordinateur écrit, trois skills, modèle de fiche de mission, tour d'état du 15 novembre.
Reste : faire confirmer l'écart (tableau « Missions en cours » au lieu d'une colonne) ;
refaire le tour d'état ; écrire les fiches de mission de PLA-03b, MOT-13a, PLA-06 et EXP-02a
selon le choix du chef ; préparer l'ordre de fusion (#171, #172, puis la coordination).
Tu tranches le réversible à l'intérieur d'un module et tu valides les plans S et M sans migration
ni sécurité ; le reste remonte au chef. Tu ne pousses pas, tu ne fusionnes pas.
```
