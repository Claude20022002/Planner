# Session du 2026-11-15 · MOT-13b · `feat/mot-13b-solveur`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | MOT (ouvert le 15 nov.) |
| Dossier de travail | `..\travaux-planner\mot-13b-solveur` |
| Dernier commit | voir `git log -1 feat/mot-13b-solveur` |

## Objectif de la session

Reprendre le chantier MOT après MOT-12 :
1. vérifier la PR de MOT-12 et sa CI ;
2. écrire le complément de plan de MOT-13b, questions d'abord ;
3. le faire valider.

## Plan

[docs/conception/moteur-planification/mot-13b-solveur.md](../conception/moteur-planification/mot-13b-solveur.md), validé par le chef le 15 novembre, avec les propositions 17 à 21. Il complète le plan d'origine [mot-13-contraintes-declarees.md](../conception/moteur-planification/mot-13-contraintes-declarees.md) (§ 4.6 renvoie au complément).

## Fait

- **MOT-12** : la PR **#181** existe. Sa CI est **entièrement verte, parcours compris** :

  | Tâche | Durée |
  |---|---|
  | Solveur | 46 s |
  | Serveur | 8 min 43 s |
  | Parcours | 12 min 38 s |

  Le frontend, le mobile et les scripts d'exploitation passent aussi. Rien à corriger, et la branche `chore/mot-12-montee-solveur` n'a pas été touchée.
- Branche `feat/mot-13b-solveur` créée depuis `main` (`d8d892b`), dans son propre dossier de travail.
- `d6039a5` : le complément de plan validé, commité seul, avec :
  - `suivi.md` : MOT-13 « 13b : plan validé », **migration 0081 réservée** ;
  - le renvoi depuis le plan d'origine ;
  - la ligne du README de `moteur-planification/`.
- Commit de fin de session : le fichier du module MOT et cette fiche.

Faits établis en lisant le code, et repris dans le plan (§ 2) :
- **le solveur n'applique pas la pause du vendredi**. Seule la saisie manuelle la contrôle (`affectationRules.js`). La grille de démonstration commence le vendredi après-midi à 14 h 30 et n'a pas de samedi après-midi ;
- les poids des 10 règles souples du catalogue valent ceux écrits en dur dans le solveur, et le profil « université » ne les change pas ;
- `ConstraintWeightOverrides` et `HardMediumSoftScore` sont bien dans le cœur Timefold 1.35.0 (classes lues dans le jar du cache Maven).

## Vérifié

- `gh pr checks 181` : tout est vert (chiffres ci-dessus).
- Aucun code écrit : il n'y avait ni test ni lint à lancer.
- `node scripts/verifier-neutre.mjs` : voir le contrôle de fin de session.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 17 | Samedi après-midi : 50 impossible avec l'insistance | « beaucoup » (100) | réglé |
| 18 | Les anciens réglages, à l'écran et dans la saisie manuelle | retirés ; la saisie lit les plages déclarées (interdite = bloquant, à éviter = avertissement) | réglé |
| 19 | Où montrer le bilan | rapport et API ; l'écran en 13c | réglé |
| 20 | Poids plus fin que l'école | refusé (`portee_non_tenue`) ; MOT-10 plus tard | réglé |
| 21 | Taille du collège fictif | 4 classes, générateur paramétrable | réglé |
| — | Vérifier sur la production qu'aucun créneau « initiale » ne touche le vendredi 12 h 30-14 h 30 ni le samedi après-midi (requête au § 6 du plan) | — | à faire par le chef, avant le déploiement de 13b |

## État laissé

- `docs/plan/suivi.md` : MOT-13 → « 13a fusionnée (#178) ; 13b : plan validé, code après la fusion de MOT-12 » ; 0081 réservée. Sur cette branche, la ligne de MOT-12 dit encore « à faire » : c'est la branche de MOT-12 qui la met à jour, et la fusion de `main` l'apportera.
- Chantier MOT : il reste MOT-12 (#181, à fusionner), MOT-13 b et c, MOT-02, MOT-03 et MOT-04.
- Le dossier `..\travaux-planner\mot-12-montee-solveur` reste en place jusqu'à la fusion de #181.

## Reste à faire, dans l'ordre

1. Le chef fusionne **#181** (MOT-12).
2. Fusionner `main` dans `feat/mot-13b-solveur`. Puis relever le score de référence sur l'affectation fixée de `ResolutionTest`, avant toute modification (plan, § 8).
3. Coder 13b en cinq commits (plan, § 9) :
   1. score, découpages et poids ;
   2. `ContraintesDeclarees` et la concordance ;
   3. compilation, bilan et branchement côté serveur ;
   4. migration 0081, saisie manuelle et écran ;
   5. collège fictif.
4. Vérifications : `mvn verify`, suite du serveur, lint, `verifier-neutre`, essai de l'image. Puis la fiche de session et la PR.
5. Ensuite : MOT-13c avec ADM-02, puis MOT-02, MOT-03 et MOT-04.

## Commandes pour le chef de projet

```powershell
gh pr merge 181 --merge
git -C "..\travaux-planner\mot-13b-solveur" push -u origin feat/mot-13b-solveur
```

La PR de MOT-13b s'ouvrira avec le code. On peut aussi l'ouvrir dès maintenant en brouillon, pour que le plan soit visible : `gh pr create --draft --base main --head feat/mot-13b-solveur --title "MOT-13b : le solveur tient les contraintes déclarées" --fill`.

## Prompt de reprise

```text
Tu reprends MOT-13b (le solveur tient les contraintes déclarées) du chantier MOT, sur la branche
feat/mot-13b-solveur, dans le dossier ..\travaux-planner\mot-13b-solveur.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/moteur-planification/mot-13b-solveur.md (complément VALIDÉ le 15 nov., réponses 17 à 21),
docs/conception/moteur-planification/mot-13-contraintes-declarees.md (plan d'origine, réponses 1 à 16)
et la fiche docs/sessions/2026-11-15-feat-mot-13b-solveur.md.
Fait : plan validé et commité (d6039a5), migration 0081 réservée. MOT-12 (#181) avait sa CI
entièrement verte, parcours compris, le 15 nov.
Vérifie d'abord avec gh pr list que #181 est fusionnée ; sinon, dis-le au chef et attends :
le code de 13b part de main APRÈS MOT-12 (Boot 4.1, cœur Timefold 1.35, ConfigurationSolveur).
Puis : fusionner main dans la branche, relever le score de référence (affectation fixée de
ResolutionTest) avant toute modification, et coder dans l'ordre du § 9, un commit par étape avec
ses tests : (1) HardMediumSoftScore, découpage de EmploiDuTempsController (ProblemeRecu,
AnalyseDesRegles) et de ContraintesEmploiDuTemps (PreferencesEmploiDuTemps), poids des 9 règles
par ConstraintWeightOverrides ; (2) ContraintesDeclarees.java, CalculsDeclares, concordance ;
(3) poidsDuSolveur.js, compilation.js, bilan.js, generation.js, refus portee_non_tenue ;
(4) migration 0081, plagesDeLaSeance.js dans affectationRules.js, config et écran ;
(5) collège fictif de 4 classes (générateur, college-fictif.json, CollegeFictifTest, essai).
Question en attente : le chef vérifie sur la production la requête du § 6 du plan, avant le déploiement.
Règles : pas de code hors du plan validé (s'il faut s'en écarter : s'arrêter, corriger le plan,
le refaire valider) ; questions avant toute supposition ; fiche de session et suivi.md à jour
en fin de session ; jamais de git push.
```
