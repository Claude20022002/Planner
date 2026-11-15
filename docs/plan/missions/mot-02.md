# Mission · MOT-02 · Mesurer le solveur sur un jeu scolaire

| | |
|---|---|
| État | ouverte |
| Agent | Codex (VS Code) |
| Modèle recommandé | le modèle de code le plus fort de Codex, effort élevé : le jeu d'essai et le protocole décident de MOT-04 (Timefold contre CP-SAT) |
| Attribuée le | 2026-11-15, par le coordinateur |
| Module et chantier | [MOT](../modules/MOT-moteur.md) · chantier ouvert le 2026-11-15 |
| Fonction | MOT-02 : mesurer le solveur sur un **jeu scolaire** (collège de 600 élèves), puis sur 20 000 étudiants · taille M · ne dépend de rien |
| Branche | `etude/mot-02-mesure-solveur`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\mot-02-mesure-solveur` |
| Plan de conception | `docs/conception/moteur-planification/mot-02-mesure-solveur.md`, à écrire · validé par : **le coordinateur** (M, étude, sans migration ni serveur), sauf si le plan sort de ce cadre |

## Critère de « terminé » (fichier du module)

- le jeu de démonstration est versionné ;
- le temps, la mémoire et la qualité (règles dures violées) sont notés dans `docs/conception/moteur-planification/mesures.md` ;
- le rapport dit si EP-10 tient (génération d'un collège de 600 élèves en moins de 10 min).

## Points à traiter dans le plan

- Le solveur actuel est pensé pour le supérieur : ses écarts sont dans `docs/conception/moteur-planification/ecarts-du-solveur.md`. Le plan dit ce qu'un « collège » peut être **aujourd'hui** dans ce modèle (classes, matières, volumes, salles), et ce qui attend MOT-06 (groupes de langue).
- **Où se mesure** : sur le poste, jamais sur le serveur (il est partagé avec n8n, et PLA-06 y passe).
- **MOT-12 va monter le solveur** (Spring Boot 4, Timefold 1.31) : le jeu et le script doivent pouvoir se relancer à l'identique après la montée, pour servir à son critère « le résultat ne change pas ».
- Aucune donnée réelle : école fictive, noms générés.

## Périmètre d'écriture

- un dossier de jeu et de script de mesure (à fixer dans le plan, par exemple `scripts/mesures/mot-02/`) ;
- `docs/conception/moteur-planification/mot-02-mesure-solveur.md`, `mesures.md` (créé), `docs/conception/moteur-planification/README.md`, `docs/conception/README.md` ;
- sa ligne de `docs/plan/suivi.md`, `docs/plan/modules/MOT-moteur.md` (ce qui existe), sa fiche de session.

Ne touche pas : `solver/` (mission MOT-12), `backend/` (sauf lecture), le serveur. S'il faut en sortir, arrête-toi et demande.

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | mission écrite ; personne ne tient MOT-02 | — |
