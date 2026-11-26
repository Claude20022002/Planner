# Mission · correctif de neutralité · `README.md` et `DEPLOIEMENT.md` (suite de Q-37)

| | |
|---|---|
| État | ouverte |
| Agent | agent de Cursor |
| Modèle recommandé | un modèle moyen : documentation, remplacements bornés, une ligne de plus au script de contrôle |
| Attribuée le | 2026-11-26, par le coordinateur ; accord du chef : oui, le 2026-11-26 (« docs seulement ») |
| Module et chantier | [QUA](../modules/QUA-qualite-docs.md) · correctif hors chantier, suite de Q-37 (signalé par l'agent de Cursor) |
| Fonction | correctif : la documentation d'installation et de déploiement ne nomme plus l'école pilote là où elle sert d'exemple · taille S |
| Branche | `fix/neutralite-docs`, depuis `origin/main` **après la fusion de Q-37** (le script `verifier-neutre.mjs` est touché par les deux) ; le plan peut s'écrire avant, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\fix-neutralite-docs` |
| Plan de conception | à écrire (plan court, `docs/conception/qualite/fix-neutralite-docs.md`) · validé par le coordinateur (S, sans migration ni sécurité) |

## Critère de « terminé »

- `DEPLOIEMENT.md` ne contient plus « HESTIM » ni « hestim.ma ». Aujourd'hui (relevé du 26 nov. sur `main`) :
  - l. 1, le titre « Guide de déploiement — HESTIM Planner » ;
  - l. 511, `EMAIL_FROM="HESTIM Planner <votre-email@gmail.com>"`, à aligner sur Q-37 ;
  - l. 620 et 628, `planner.hestim.ma` et `api.hestim.ma` ;
  - l. 687, « Guide rédigé pour HESTIM Planner ».
- Les exemples d'adresses en minuscules qui portent le nom (`hestim-backend.up.railway.app`, `hestim-planner.vercel.app`, l. 529 à 571) et `ETABLISSEMENT_NOM=hestim` (l. 403) deviennent des exemples neutres (question 3).
- **Restent tels quels** : `/opt/hestim`, les conteneurs `hestim_*`, les images `claude20022002/hestim-*`, les volumes, `hestim-sauvegarde.*`, `hestim_planner`, `hestim-solver.jar`. Ce sont des noms techniques en service, renommés par EXP-07 avec un retour arrière.
- `README.md` : seulement ce que le plan retient après les questions 1 et 2. Les comptes de démonstration (`admin@hestim.ma`) restent : `seed.js` les crée, et le contrôle de CI « Démarrage du README » les rejoue.
- **Test du correctif** : `node scripts/verifier-neutre.mjs` lit aussi `DEPLOIEMENT.md`, et il échoue si « HESTIM Planner » ou « hestim.ma » y revient. L'échec est montré dans la fiche de session avec une copie locale non commitée, comme pour Q-37.
- La CI de la PR est verte, « Démarrage du README » compris.

## Périmètre d'écriture

L'agent peut modifier :

- `DEPLOIEMENT.md`
- `README.md` : seulement les lignes retenues par le plan
- `scripts/verifier-neutre.mjs` : la lecture de `DEPLOIEMENT.md`
- `docs/conception/qualite/fix-neutralite-docs.md` (le plan court)
- le fichier du module QUA et sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `docker-compose.yml`, `deploy/` et tout nom technique (EXP-07, choix du chef du 26 nov. : « docs seulement »)
- `backend/seed.js`, `backend/demo/` (jeu de démonstration de l'école pilote)
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Q-37 : `EMAIL_FROM="Planner <votre-email@example.com>"`, domaines d'exemple en `.example` (plan validé le 26 nov.).
- Le contrôle « Démarrage du README » rejoue l'installation du README (QUA-01, réponse Q-35 du chef).
- « Docs seulement » : `docker-compose.yml` reste pour EXP-07 (chef, 26 nov.).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | `README.md` l. 12, 62 et 64 racontent l'histoire du produit (« Né pour une école d'ingénieurs de Casablanca (HESTIM) », « en production pour HESTIM »). On garde ? | garder : c'est l'histoire du produit, écrite dans QUA-01 (#266, fusionnée le 26 nov.), et non un exemple copié chez une école | chef, par le coordinateur |
| 2 | `README.md` l. 147 et 452, la branche `hestim` du fork de ClassQuiz | garder : c'est le nom réel de la branche, jusqu'à la sortie de ClassQuiz (QJE-06) | coordinateur |
| 3 | Les exemples d'adresses en minuscules (Railway, Vercel) et `ETABLISSEMENT_NOM=hestim` | `planner-backend.up.railway.app`, `planner.vercel.app`, `ETABLISSEMENT_NOM=<nom-court-de-l-ecole>` | coordinateur |
| 4 | `verifier-neutre` lit-il aussi `README.md` ? | non : l'histoire et les comptes de démonstration y restent ; seul `DEPLOIEMENT.md` est lu | coordinateur |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : le correctif de neutralité de README.md et DEPLOIEMENT.md (suite de Q-37),
module QUA. Documentation seulement : docker-compose.yml et les noms techniques ne bougent pas.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/fix-neutralite-docs.md (branche doc/coordination-2026-11-26-suite,
dossier ..\travaux-planner\coordination-2026-11-26-suite, jusqu'à sa fusion).
Branche : fix/neutralite-docs, dans le dossier ..\travaux-planner\fix-neutralite-docs. Le plan peut partir de
origin/main tout de suite ; le code attend la fusion de Q-37 (git merge origin/main avant de toucher au script).
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris un plan court (docs/plan/modeles/conception.md, version courte), réponds aux questions 1 à 4
de la fiche ou propose autre chose, commite le plan seul et dépose ton rapport dans sortie/ pour validation.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; montre l'échec du script avec
l'ancien texte ; fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ;
jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-26 | fiche écrite ; aucune branche ouverte ne touche `README.md` ni `DEPLOIEMENT.md` ; Q-37 touche `verifier-neutre.mjs` : le code de celle-ci attend sa fusion | — |
| 2026-11-26 9 h 55 | plan `a7227205` (et `b0c0508a`) relu : questions 2 à 4 retenues, ligne 140 ajoutée par l'agent, périmètre tenu | **plan validé** (coordinateur) |
