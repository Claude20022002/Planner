# Mission · MOT-03 · Validation avant le calcul

| | |
|---|---|
| État | relue : prête le 2026-11-18 (`c53d4cbb`) ; CI de #183 après le push du chef |
| Agent | agent de Cursor |
| Modèle recommandé | un modèle fort (Claude Opus 5.5 dans Cursor, ou l'équivalent) : 498 paramètres et leurs règles `requiert`, `borne`, `exclut` à couvrir sans en oublier |
| Attribuée le | 2026-11-15, par le coordinateur |
| Module et chantier | [MOT](../modules/MOT-moteur.md) · chantier ouvert le 2026-11-15 |
| Fonction | MOT-03 : toutes les règles `requiert`, `borne` et `exclut` du catalogue sont vérifiées avant le calcul, avec un message qui dit quoi faire (EP-4) · taille M · dépend de MOT-01 (fait) |
| Branche | `feat/mot-03-validation`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\mot-03-validation` |
| Plan de conception | `docs/conception/moteur-planification/mot-03-validation.md`, à écrire · validé par : **le coordinateur** (M, sans migration), sauf si le plan ajoute une migration, touche à la sécurité ou fixe des textes montrés aux écoles : alors **le chef** |

## Critère de « terminé »

Celui du fichier du module MOT, à recopier dans le plan. Au minimum : chaque règle `requiert`, `borne` et `exclut` du catalogue a son contrôle et son test ; une génération qui viole l'une d'elles est refusée avant le calcul, avec une phrase qui nomme la règle et ce qu'il faut changer (EP-4).

## Ce qui existe, à lire

- `backend/services/moteur/catalogue/` (JSON qui font foi) et `backend/services/moteur/valeurs/` (MP-1, résolution des valeurs datées) ;
- `backend/services/moteur/contraintes/` (MOT-13a, fusionnée) : ses contrôles et son appel avant la génération (`avantGeneration.js`, `generation.js`). **MOT-03 se branche au même endroit sans dupliquer** ce que fait MOT-13a : à dire dans le plan ;
- `docs/conception/moteur-planification/conception-mp1.md` et sa relecture (Q-04 encore ouverte : à signaler si elle bloque).

## Périmètre d'écriture

- `backend/services/moteur/` (un dossier ou des fichiers de validation, à fixer dans le plan), l'appel avant la génération, leurs tests unitaires et d'intégration ;
- `docs/conception/moteur-planification/mot-03-validation.md`, les deux README de conception ;
- sa ligne de `docs/plan/suivi.md`, `docs/plan/modules/MOT-moteur.md`, sa fiche de session.

Ne touche pas : `solver/` (MOT-12), `scripts/mesures/` (MOT-02, PLA-06), les migrations, `deploy/`. S'il faut en sortir, arrête-toi et demande.

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | mission écrite ; personne ne tient MOT-03 | — |
| 2026-11-15 20 h 50 | plan validé par le chef lui-même (phrases du § 4.3 comprises) ; codée (`34fc14f9`), CI de #183 verte. Relecture : branchement au même endroit que MOT-13a, fichiers courts, écart documenté. **À corriger** : le refus ne garde pas sa cible (enseignant, groupe, salle, matière), le dédoublonnage l'ignore, et le message ne dit pas à qui la règle s'applique (EP-4) | à corriger |
| 2026-11-18 10 h 44 | correction `ce00b79e` (16 nov.) poussée par le chef. Relecture : cible `{ portee, id }`, dédoublonnage par cible, message qui nomme la cible ; noms retirés avant le solveur, `probleme` n'est pas enregistré. **Conflit avec `main`** (`generation.js` touché par MOT-13b `866da8ff`, README de conception, `suivi.md`) : pas de CI sur #183. Fusion de `origin/main` demandée | à mettre à jour |
| 2026-11-18 11 h 06 | fusion de `origin/main` (`c53d4cbb`) : appel MOT-13b gardé, noms retirés par `pourLeSolveur`, `exigerAssezDePlace` absente de `main` (remplacée par `preparerContraintes`) ; fusion propre | **prête** |
