# Session du 2026-11-15 (3) · MOT-13b · `feat/mot-13b-solveur`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | MOT |
| Dossier de travail | `..\travaux-planner\mot-13b-solveur` |
| Dernier commit | voir `git log -1 feat/mot-13b-solveur` |

## Objectif de la session

Suivre la CI de la PR de MOT-13b, faire trancher les questions 22 et 23, et préparer le déploiement.

## Plan

[docs/conception/moteur-planification/mot-13b-solveur.md](../conception/moteur-planification/mot-13b-solveur.md), validé le 15 novembre (réponses 17 à 21) ; réponses 22 et 23 ajoutées à son tableau des questions.

## Fait

- La PR **#182** était déjà ouverte par le chef (tête `6a9e12b`), sans conflit avec `main` (qui a reçu #177 depuis).
- Réponses du chef, le 15 novembre :
  - **22 : acceptée.** Le critère « pas moins bon » est tenu pour 13b. MOT-02 compare la qualité des règles souples à celle d'avant 13b, sur plusieurs passages et plusieurs tailles, et cherche la cause d'un écart (score à trois niveaux). Ajouté aux critères de « terminé » de MOT-02 dans le module MOT.
  - **23 : refuser aussi la coupure fine** d'une règle du solveur (`valeur: false` à une portée plus fine que l'école, refus `portee_non_tenue`), dans une **petite étape à part, avant 13c**, hors de cette branche.
- Commit de fin de session : réponses 22 et 23 dans le plan, `suivi.md`, module MOT, cette fiche.

## Vérifié

- **CI de #182** (run 43737454215), tout vert :
  - Test Solveur 34 s, Test Backend 8 min 38, Build Frontend, Test Mobile, Scripts d'exploitation ;
  - **Parcours de démonstration : 41 passés** (8,5 min). L'image du solveur est construite depuis la branche (`docker build -t hestim-solver:parcours ../solver`). Le parcours « génération puis publication : le solveur respecte toutes les règles » passe (22 s).
- **Requête du § 6** : il n'y a pas de production d'école réelle. Planner ne tourne ni sur le serveur Debian définitif (n8n seul, vu par `docker ps` le 15 nov.) ni sur le serveur provisoire. La seule sauvegarde (Backblaze) vient d'essais de déploiement et de la démonstration (réponse du chef, 15 nov.). Sur la grille de démonstration, la vérification est faite (session 2) : les deux plages reprises ne visent aucun créneau. La requête est à relancer sur toute base d'école réelle restaurée, avant sa première génération.

## Écarts avec le plan

Aucun dans cette session. Le commit de fin de session ne touche que la documentation : ni code ni test.

## Questions

| N° | Question | Proposition | État |
|---|---|---|---|
| 22 | Critère « pas moins bon » sur le score souple | accepter ; MOT-02 cherche la cause | **oui** (15 nov.) |
| 23 | Refuser la coupure fine d'une règle du solveur | oui, étape à part avant 13c | **oui** (15 nov.) |
| — | Requête du § 6 du plan sur la production : aucun créneau « initiale » le vendredi de 12 h 30 à 14 h 30, ni le samedi après-midi | pas de production réelle (essais et démonstration seulement) : vérifiée sur la grille de démonstration ; à relancer sur toute base d'école réelle restaurée | **levée** (15 nov.) |
| — | Phrases de `ensemble_ou_separe` à plusieurs matières, qui se lisent mal (`phrases.js`, 13a) | à reprendre avec l'écran, en 13c | noté |
| — | Le coordinateur reporte la réponse 22 dans la fiche de mission de MOT-02 (#180), si elle y est | — | au coordinateur |

## État laissé

- `docs/plan/suivi.md` : MOT-13 → 13b « PR ouverte (#182), CI verte » ; ensuite le refus de la coupure fine, puis 13c. Le tableau « Missions en cours » n'est pas touché (il revient au coordinateur).
- Module MOT : état de MOT-13 et critère de MOT-02 (réponse 22).
- Plan de 13b : réponses 22 et 23 dans le tableau des questions.

## Reste à faire, dans l'ordre

1. Le chef pousse le commit de fin de session ; la CI de #182 repasse (documentation seule).
2. Fusion de #182 (la requête du § 6 est levée : pas de production réelle ; elle sera relancée sur toute base d'école réelle restaurée).
3. À la fusion, la migration 0081 passe à « fusionnée » dans `suivi.md`. Au déploiement, **serveur et solveur partent dans le même paquet** (§ 6 du plan).
4. Petite étape : refuser la coupure fine d'une règle du solveur (réponse 23). Plan court à écrire et à faire valider, sur une nouvelle branche après la fusion.
5. MOT-13c avec ADM-02 (écran « Règles de génération », affichage du bilan, phrases de `ensemble_ou_separe`), puis MOT-02, MOT-03 et MOT-04.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\mot-13b-solveur" push origin feat/mot-13b-solveur
gh pr checks 182 --watch
```

Avant la première génération sur une base d'école réelle restaurée : la requête SQL du § 6 de [mot-13b-solveur.md](../conception/moteur-planification/mot-13b-solveur.md).

## Prompt de reprise

```text
Tu reprends MOT-13 (contraintes déclarées par l'école) du chantier MOT. Le dossier de travail de 13b est
..\travaux-planner\mot-13b-solveur (branche feat/mot-13b-solveur, PR #182).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/moteur-planification/mot-13b-solveur.md (plan VALIDÉ, réponses 17 à 23, écarts à la fin du § 9)
et la fiche docs/sessions/2026-11-15-feat-mot-13b-solveur-3.md.
Fait : 13b codée (cinq commits), PR #182 ouverte, CI verte, parcours compris (41 passés, image du solveur
construite depuis la branche). Réponses du chef le 15 nov. : 22 acceptée (MOT-02 compare la qualité souple
et cherche la cause de l'écart de 10 %) ; 23 : refuser aussi la coupure fine d'une règle du solveur
(portee_non_tenue), dans une petite étape à part avant 13c.
La requête du § 6 est levée : pas de production d'école réelle (essais et démonstration seulement),
vérifiée sur la grille de démonstration ; à relancer sur toute base d'école réelle restaurée.
Reste : vérifier si #182 est fusionnée (gh pr view 182) ; au déploiement, serveur et solveur dans le
même paquet ; puis la petite
étape de la réponse 23 (plan court à écrire et à faire valider, nouvelle branche depuis main), puis
MOT-13c avec ADM-02.
Règles : pas de code hors du plan validé (s'il faut s'en écarter : s'arrêter, corriger le plan, le refaire
valider) ; questions avant toute supposition ; fiche de session et suivi.md à jour en fin de session ;
jamais de git push.
```
