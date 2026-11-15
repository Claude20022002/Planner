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
