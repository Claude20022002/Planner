# Session du 2026-11-15 · MOT-12 · `chore/mot-12-montee-solveur`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | MOT (ouvert le 15 nov.) |
| Dossier de travail | `..\travaux-planner\mot-12-montee-solveur` |
| Dernier commit | voir `git log -1 chore/mot-12-montee-solveur` |

## Objectif de la session

Reprendre le chantier MOT après MOT-13a, puis faire MOT-12, la montée du solveur : questions, plan, validation, puis code.

D'abord, vérifier l'état :
- #171 (QUA-03) est fusionnée ;
- la PR de MOT-13a, #178, avait sa CI entièrement verte, parcours compris (11 min 37 s). Le chef l'a fusionnée pendant la session (`48ebb45`).

## Plan

[docs/conception/moteur-planification/mot-12-montee-solveur.md](../conception/moteur-planification/mot-12-montee-solveur.md), validé par le chef le 15 novembre (réponses 1 à 8).

Avant les questions, un essai sur des copies jetables, hors du dépôt, a établi que **la décision du 13 novembre (« Spring Boot 4.x, Timefold 1.31 ») ne tenait pas** :
- la ligne 1.x va jusqu'à **1.35.0** (15 oct. 2026), et toute la 1.x vise Spring Boot 3.5, sans support libre depuis le 30 juin 2026 ;
- sous Spring Boot 4.1.2, **le starter Timefold 1.35 ne démarre pas** (`ClassNotFoundException: …autoconfigure.domain.EntityScanner`). Les tests Maven passaient pourtant : aucun ne chargeait Spring ;
- le **cœur** Timefold 1.35, sans le starter, fonctionne sous Boot 4.1.2 ;
- Jackson 3 refuse un `null` dans un `int` ;
- en 2.8.0, l'analyse du score passe par le service payant (`TimefoldSolverEnterpriseService`).

Le chef a retenu Boot 4.1 et le cœur de Timefold 1.35 sans starter, ainsi que Jackson 3 avec un réglage de compatibilité. La décision du 13 novembre est amendée dans `decisions.md` (ligne du 15 nov.).

## Fait

- `f067808` : le plan validé. Faits corrigés dans `pile.md` (§ 2.6, § 3), `ecarts-du-solveur.md`, `decisions.md` (Q-05, ligne du 15 nov.) et le module MOT. Dans `suivi.md`, MOT-12 passe « en cours » et MOT-13a à « fusionnée » ; les fusions de #167, #170, #171 et #174 sont rattrapées.
- `ecb94ee` : le code.
  - `pom.xml` : 4.1.2, 1.35.0, `timefold-solver-core`, `spring-boot-starter-webmvc`.
  - `ConfigurationSolveur.java` (51 lignes) : fabrique, gestionnaire des calculs (parallélisme lu depuis `solver.calculs-simultanes-max`) et analyse.
  - `application.properties` : lignes `timefold.*` retirées, réglage Jackson ajouté.
  - Les deux appels dépréciés sont remplacés.
  - Deux tests : `DemarrageTest` et `ApiProblemeTest`.
- Commit de fin de session : `suivi.md`, module MOT et cette fiche.

**Écarts avec le plan** :
- `DemarrageTest` ne lit pas le nombre de calculs en parallèle dans le `SolverManager`, que Timefold n'expose pas. Il vérifie la propriété lue (2), et que l'ancienne propriété `timefold.*` n'existe plus.
- Le plan prévoyait de noter la vitesse avant et après. Les mesures sont notées ci-dessous, mais elles sont trop bruitées sur ce poste pour conclure.

## Vérifié

- `mvn -B -ntp verify` (Maven 3.9, Java 21, sous Docker) : **39 tests verts**, sur 11 classes, dont 6 nouveaux. **Aucun avertissement de dépréciation**, avec `showDeprecation`.
- Image construite depuis `solver/` (même `Dockerfile`), puis lancée et appelée sur le même petit problème que l'image actuelle :
  - réponse **identique** : `0hard/-20soft`, mêmes affectations, même règle enfreinte ;
  - `/health` répond UP ;
  - sans jeton : 401.
- Vitesse sur `ResolutionTest` (8 s, même score `0hard/-23soft` à chaque passage) :

  | Version | Coups/s | Passages |
  |---|---|---|
  | Avant (1.15) | 15 985 à 21 866 | 5 |
  | Après (1.35), `PHASE_ASSERT` | 12 000 à 18 822 | 5 |
  | Après (1.35), `NO_ASSERT` | 3 360 à 16 258 | 3 |

  Les plages se recouvrent, et `NO_ASSERT` n'est pas plus rapide. Le mode par défaut n'explique donc pas l'écart, et on ne peut pas conclure sur un si petit problème. **À mesurer dans MOT-02**, sur le jeu scolaire.
- `node scripts/verifier-neutre.mjs` : voir le contrôle de fin de session.
- **Non lancé ici** : la CI et les parcours, qui construisent et lancent la vraie image (génération de bout en bout). Ils tournent dans la PR. Le serveur Node n'est pas touché.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 8 | Voir le § 3 du plan | toutes répondues le 15 nov. | réglé |
| — | MOT-13b : forme du score (`HardMediumSoftScore`), lecture des poids, découpage de `EmploiDuTempsController.java` (230 lignes) | complément de plan à écrire | en attente, prochaine session |

## État laissé

- `docs/plan/suivi.md` : MOT-12 « en cours : codée, PR à ouvrir » ; MOT-13 « 13a fusionnée (#178) ; 13b après MOT-12 ».
- Chantier MOT : il reste MOT-12 (PR), MOT-13 b et c, MOT-02, MOT-03 et MOT-04.
- Le volume Docker `planner-essai-m2` (cache Maven des essais) est laissé en place, pour accélérer les prochaines constructions du solveur. Le retirer : `docker volume rm planner-essai-m2`. Les images d'essai sont retirées.
- Après la fusion, **la nouvelle image du solveur part avec le prochain paquet de déploiement**, lancé par le chef (réponse 8). Le retour arrière consiste à relancer l'image précédente : il n'y a ni donnée ni migration.

## Reste à faire, dans l'ordre

1. Le chef pousse la branche et ouvre la PR de MOT-12. La CI doit être verte, **parcours compris**.
2. MOT-13b : complément du plan de MOT-13, à faire valider :
   - les contraintes déclarées compilées en séances concernées ;
   - `ContraintesDeclarees.java` ;
   - `HardMediumSoftScore` ;
   - les poids des 10 règles souples lus depuis les valeurs (`ConstraintWeightOverrides`, présent dans le cœur 1.35) ;
   - la pause du vendredi et le samedi après-midi changés en contraintes déclarées ;
   - le bilan hors du solveur ;
   - le collège fictif ;
   - le découpage du contrôleur.

   Le code de 13b part de `main` **après** la fusion de MOT-12.
3. MOT-13c avec ADM-02 ; puis MOT-02 (qui inclut la mesure de vitesse ci-dessus), MOT-03 et MOT-04.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\mot-12-montee-solveur" push -u origin chore/mot-12-montee-solveur
gh pr create --base main --head chore/mot-12-montee-solveur --title "MOT-12 : solveur sur Spring Boot 4.1 et Timefold 1.35 (sans starter)" --fill
gh pr checks chore/mot-12-montee-solveur --watch
```

## Prompt de reprise

```text
Tu reprends le chantier MOT de Planner. MOT-12 (montée du solveur) est codée sur la branche
chore/mot-12-montee-solveur, dossier ..\travaux-planner\mot-12-montee-solveur : Spring Boot 4.1.2,
cœur Timefold 1.35.0 SANS le starter (il ne démarre pas sous Boot 4), ConfigurationSolveur.java,
Jackson 3 avec fail-on-null-for-primitives=false ; 39 tests du solveur verts, réponse identique
à l'image actuelle. MOT-13a est fusionnée (#178).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/moteur-planification/mot-12-montee-solveur.md,
docs/conception/moteur-planification/mot-13-contraintes-declarees.md (16 réponses)
et la fiche docs/sessions/2026-11-15-chore-mot-12-montee-solveur.md.
Vérifie avec gh pr list si la PR de MOT-12 existe et si sa CI (parcours compris) est verte ;
sinon, dis-le au chef et corrige ce qui échoue, sur la même branche.
Reste : écrire le complément de plan de MOT-13b (solveur : contraintes déclarées compilées,
ContraintesDeclarees.java, HardMediumSoftScore, poids des 10 règles souples via
ConstraintWeightOverrides, pause du vendredi et samedi après-midi en contraintes déclarées,
bilan hors du solveur, collège fictif, découpage de EmploiDuTempsController.java de 230 lignes),
avec ses questions d'abord, puis le faire valider. Le code de 13b part de main après la fusion de MOT-12.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
