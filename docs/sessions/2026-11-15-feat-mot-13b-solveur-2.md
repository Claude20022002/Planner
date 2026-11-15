# Session du 2026-11-15 (2) · MOT-13b · `feat/mot-13b-solveur`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | MOT |
| Dossier de travail | `..\travaux-planner\mot-13b-solveur` |
| Dernier commit | voir `git log -1 feat/mot-13b-solveur` |

## Objectif de la session

Coder MOT-13b, après la fusion de MOT-12 (#181) : le solveur tient les contraintes déclarées de l'école, lit les poids des règles du profil, et chaque génération porte le bilan de chaque contrainte. Cinq étapes, dans l'ordre du § 9 du plan.

## Plan

[docs/conception/moteur-planification/mot-13b-solveur.md](../conception/moteur-planification/mot-13b-solveur.md), validé le 15 novembre (réponses 17 à 21). Les écarts d'exécution sont notés à la fin de son § 9.

## Fait

- `c9c4f18` : `main` fusionnée dans la branche (#181 vérifiée fusionnée). Conflits de `suivi.md` et du module MOT : MOT-12 passe à « fait ».
- **Score de référence relevé avant toute modification**, sur `main` après MOT-12 (`38f2f90`) : trois affectations fixées du problème de `ResolutionTest`, -1hard/-51soft, -9hard/-46soft et -9hard/-49soft.
- `9a2f544` (1/5) : `HardMediumSoftScore` ; 9 règles souples dans `PreferencesEmploiDuTemps` (« Pas de samedi après-midi » retirée) ; poids reçus par `ConstraintWeightOverrides` (nom inconnu ou poids hors de 0-1 000 → 400) ; contrôleur découpé en `ProblemeRecu` et `AnalyseDesRegles` (230 → 152 lignes) ; `ContraintesEmploiDuTemps` 332 → 227 lignes ; `ReferenceScoreTest`, `PoidsDesReglesTest`.
- `797572f` (2/5) : `ContrainteDeclaree`, `Visee`, `ContraintesDeclarees` (12 règles), `CalculsDeclares` ; fichier commun `concordance-declarees.json` et `ConcordanceTest`.
- `866da8f` (3/5) : `compilation.js`, `bilan.js` (concordance comprise), `poidsDuSolveur.js`, `preparerContraintes` dans `avantGeneration.js`, branchement dans `generation.js` (`rapport.contraintes`), refus `portee_non_tenue`, six modèles `tenu: true`, `PLAGES_RESTREINTES` sans `regle_solveur`.
- `77f60d4` (4/5) : migration **0081** ; `plagesDeLaSeance.js` dans `affectationRules.js` (389 → 388 lignes) ; les deux anciens réglages quittent la config, `probleme.js` et l'écran « Paramètres de planning ».
- `c61863a` (5/5) : générateur du collège fictif, `scripts/college-fictif.mjs`, `college-fictif.json`, `CollegeFictifTest` ; une plage sans créneau ne donne plus de visée (voir « Vérifié »).
- Commit de fin de session : `suivi.md`, module MOT, note d'écarts du plan, cette fiche.

## Vérifié

- **Solveur** (`mvn -B -ntp verify`, Java 21 sous Docker) : **58 tests verts**, sur 15 classes. `ReferenceScoreTest` rend les trois scores relevés avant 13b, niveau moyen à 0.
- **Concordance** : le même fichier donne les mêmes occurrences au solveur et au serveur. Un attendu faussé exprès fait bien échouer le test Java.
- **Serveur** : 371 tests unitaires verts ; **612 tests d'intégration verts** (62 fichiers, MySQL 8.4 jetable). Un premier passage complet a manqué de mémoire au bout de 20 minutes (tas de Node plein, une seule exécution pour les 62 fichiers) : relancé avec `NODE_OPTIONS=--max-old-space-size=6144`, il passe. La CI n'est pas concernée par ce réglage local.
- **Site** : tests unitaires (42), lint (0 erreur) et construction verts. `node scripts/verifier-neutre.mjs` passe.
- **Collège fictif**, image construite depuis la branche et appelée par `scripts/college-fictif.mjs --resoudre` : **0hard/0medium/-233soft** en 16 s. Bilan :
  - Espagnol et Allemand des 4e et des 3e en même temps (impossible) : respectée ;
  - pas de cours pour les 6e A le vendredi de 15 h 30 à 17 h (impossible) : respectée ;
  - pas plus de 2 séances de français par jour (normal) : respectée ;
  - mathématiques sur des jours différents (beaucoup) : respectée ;
  - mathématiques plutôt le matin (peu) : respectée ;
  - jamais EPS et mathématiques à la suite (normal) : respectée ;
  - éviter les 3e A le lundi de 8 h à 9 h (indispensable) : respectée ;
  - pas plus de 3 séances à la suite pour l'enseignant d'EPS (beaucoup) : respectée.
- **Jeu de démonstration** (base remplie par `seed.js`, 0081 appliquée, période S1 : 265 leçons, 22 créneaux) :
  - les deux plages reprises ne visent **aucun créneau** ; les poids envoyés sont **exactement** ceux d'avant 13b ;
  - comparaison sur le même problème, 60 s par calcul, image de `main` après MOT-12 contre image de 13b, six passages chacune en alternance :

    | | Règles dures | Souples (passages 2 à 6) | Vitesse |
    |---|---|---|---|
    | `main` (MOT-12) | -143 à chaque passage | -567, -542, -517, -489, -487 (moyenne -520) | ≈ 12 000 coups/s |
    | 13b | -143 à chaque passage | -589, -589, -599, -531, -542 (moyenne -570) | ≈ 11 700 coups/s |

    Le premier passage de chaque image, à froid, est nettement moins bon (-829 et -955). Ce problème n'a pas de solution sans conflit en 60 s, ni avant ni après 13b.
  - Avant la correction de `c61863a`, les deux plages reprises, qui ne touchent aucun créneau, créaient 530 visées jointes à chaque coup : environ 10 % de vitesse perdue. Corrigé : une plage sans créneau ne donne plus de visée.
  - **L'écart restant ne vient ni des contraintes ni des poids** : sans eux, 13b donne -809, -599 et -575. Il vient du solveur lui-même (score à trois niveaux, découpage), ou de la dispersion des passages, grande pour les deux images. Voir la question 22.
- **Pas lancé en local** : les parcours (génération réelle dans la CI de la PR).

## Questions

| N° | Question | Proposition | État |
|---|---|---|---|
| 22 | Sur le jeu de démonstration, les règles dures sont identiques, mais le score souple de 13b est en moyenne 10 % moins bon que celui de `main` en 60 s (écart dans la dispersion des passages, mais du même côté à chaque paire). Le critère « pas moins bon » est-il tenu ? | Accepter pour 13b : le score d'une affectation fixée est identique, les règles dures aussi ; MOT-02 mesure la qualité sur plusieurs passages et plusieurs tailles, et cherche la cause (score à trois niveaux) | **au chef** |
| 23 | Couper une règle souple du solveur (`valeur: false`) à une portée plus fine que l'école reste permis, mais sans effet sur le calcul. La réponse 20 ne refuse que le poids | Refuser aussi la coupure fine (`portee_non_tenue`), dans une petite étape avant 13c | **au chef** |
| — | Vérifier sur la production la requête du § 6 du plan (aucun créneau « initiale » le vendredi de 12 h 30 à 14 h 30, ni le samedi après-midi) | — | au chef, avant le déploiement |
| — | Les phrases de `ensemble_ou_separe` à plusieurs matières se lisent mal (« Espagnol 4e et Espagnol 3e et Allemand 4e et Allemand 3e en même temps ») : c'est `phrases.js` (13a) | À reprendre avec l'écran, en 13c | noté |

## État laissé

- `docs/plan/suivi.md` : MOT-13 → « 13b codée le 15 nov., PR à ouvrir » ; migration 0081 « écrite ».
- Fichier du module MOT : « ce qui existe » à jour (solveur, contraintes déclarées, MP-1).
- Chantier MOT : il reste MOT-13b (PR, CI, déploiement), MOT-13c avec ADM-02, MOT-02, MOT-03 et MOT-04.
- Docker : conteneurs et images d'essai retirés. Le volume `planner-essai-m2` (cache Maven) reste.

## Reste à faire, dans l'ordre

1. Le chef pousse la branche et ouvre la PR ; CI verte, **parcours compris** (génération réelle avec la nouvelle image).
2. Réponses aux questions 22 et 23.
3. Avant le déploiement : la requête du § 6 sur la production. Serveur et solveur partent **dans le même paquet** (§ 6 du plan).
4. Ensuite : MOT-13c avec ADM-02 (écran « Règles de génération » et affichage du bilan), puis MOT-02, MOT-03 et MOT-04.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\mot-13b-solveur" push origin feat/mot-13b-solveur
gh pr create --base main --head feat/mot-13b-solveur --title "MOT-13b : le solveur tient les contraintes déclarées" --fill
gh pr checks feat/mot-13b-solveur --watch
```

## Prompt de reprise

```text
Tu reprends MOT-13b (le solveur tient les contraintes déclarées) du chantier MOT, sur la branche
feat/mot-13b-solveur, dans le dossier ..\travaux-planner\mot-13b-solveur.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/moteur-planification/mot-13b-solveur.md (plan VALIDÉ, écarts notés à la fin du § 9)
et la fiche docs/sessions/2026-11-15-feat-mot-13b-solveur-2.md.
Fait : 13b est codée en cinq commits (9a2f544, 797572f, 866da8f, 77f60d4, c61863a), plus la
fusion de main (c9c4f18) et le commit de fin de session. Solveur 58 tests verts ; serveur 371
unitaires et 612 d'intégration verts ; collège fictif 0hard/0medium, toutes ses contraintes
respectées ; jeu de démonstration : règles dures identiques à main, souples 10 % moins bonnes
en moyenne (question 22).
Reste : PR et CI (parcours compris), réponses aux questions 22 et 23, requête du § 6 sur la
production avant le déploiement (serveur et solveur dans le même paquet), puis MOT-13c avec ADM-02.
Questions en attente : 22 (critère « pas moins bon » sur le score souple), 23 (refuser la coupure
d'une règle du solveur à une portée plus fine que l'école).
Règles : pas de code hors du plan validé (s'il faut s'en écarter : s'arrêter, corriger le plan,
le refaire valider) ; questions avant toute supposition ; fiche de session et suivi.md à jour en
fin de session ; jamais de git push.
```
