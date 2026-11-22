# MOT · Moteur de planification

**Objet** : un **moteur central, configurable par profil pédagogique** (primaire, collège, lycée, formation, université). Ce n'est jamais un générateur par type d'école (décision du 3 novembre). Le module couvre :
- le solveur ;
- le catalogue des paramètres et les profils ;
- les valeurs datées ;
- la validation avant le calcul ;
- les performances.

**Hors module** : l'affichage et la gestion des séances, la publication, les examens saisis (EDT).

**Tables possédées** : `ParametrePlanning`, `VersionParametres`, `ValeurParametre`, `ContrainteDeclaree` (MOT-13, migration 0080), `GenerationSession`, `PlanningSnapshot`.

## Ce qui existe

- **Solveur** : `solver/`, en Java 21, Spring Boot 4.1.2 et cœur de **Timefold 1.35.0** sans le starter (MOT-12, `ConfigurationSolveur.java`), limité à 1 Go et à 2 calculs simultanés. Depuis MOT-13b (#182) : score `HardMediumSoftScore` ; 12 règles dures (`ContraintesEmploiDuTemps`), 9 souples du profil (`PreferencesEmploiDuTemps`, poids reçus de Planner par `ConstraintWeightOverrides`), 12 règles des contraintes déclarées (`ContraintesDeclarees`, calculs dans `CalculsDeclares`) ; contrôleur découpé (`ProblemeRecu`, `AnalyseDesRegles`) ; 15 classes de test. Côté serveur : `backend/services/generation/timefold/*`, `generationAutomatiqueRoutes`, et la page `gestion/GenerationAutomatique`. Il compte 7 classes de test.
- **Catalogue** : 498 paramètres et 5 profils, dans `backend/services/moteur/catalogue/` (JSON, qui font foi). Les pages lisibles sont générées par `node scripts/catalogue-moteur-doc.mjs` dans [conception/moteur-planification/catalogue](../../conception/moteur-planification/catalogue/README.md).
- **MP-1** (fusionnée le 7 novembre) : valeurs versionnées et datées (migration 0061), routes `/api/moteur`. **La génération en lit les poids des 9 règles souples du profil**, à la portée de l'école (MOT-13b) : un poids plus fin est refusé à l'enregistrement (`portee_non_tenue`, réponse 20), de même qu'une activation plus fine des six règles qu'une école règle (réponses 23 à 25 ; les vœux des enseignants restent permis) ; le reste attend MOT-10. **Depuis ADM-02a** (`feat/adm-02-configuration`), les anciens paramètres de planification (plafonds par jour d'un groupe et d'un enseignant, trajet entre campus, capacité d'examen, surveillants, durée de séance) se lisent aussi dans MP-1, à la portée de l'école (`services/planning/referentiel.js` → `valeurs/valeursDeLEcole.js`) : la table `ParametrePlanning` n'est plus lue, et son ancienne route d'écriture répond 410. Les deux réglages d'examen sont réglables pour toute l'école (niveaux « GPI », réponse 18 d'ADM-02).
- **Contraintes déclarées, MOT-13a** (branche `feat/mot-13-contraintes`, 15 novembre) :
  - six modèles dans `backend/services/moteur/contraintes/` ;
  - table `ContrainteDeclaree` (migration 0080), portée par les versions de MP-1 ;
  - routes `/api/moteur/gabarits`, `/contraintes`, `/contraintes/profil`, `/contraintes/verifier` ;
  - le contrôle de place arrête la génération quand des plages interdites ne laissent pas assez de créneaux.

  **MOT-13b** (#182, fusionnée le 15 nov.) : la génération compile les contraintes en vigueur (`compilation.js`) et envoie les poids des règles du profil résolus à la portée de l'école (`poidsDuSolveur.js`) ; le solveur les tient (`tenu: true`) ; le rapport de chaque génération porte le bilan de chaque contrainte (`bilan.js`, `rapport.contraintes`), concordant avec le solveur sur un fichier commun. La pause du vendredi et le samedi après-midi sont des contraintes déclarées (migration 0081) ; la saisie manuelle lit les plages déclarées (`plagesDeLaSeance.js`). Collège fictif : `backend/tests/fixtures/collegeFictif.js`, `scripts/college-fictif.mjs`.
- **Limites du modèle actuel** ([ecarts-du-solveur.md](../../conception/moteur-planification/ecarts-du-solveur.md)) :
  - F-1 : une seule semaine type ;
  - F-2 : enseignant imposé avant le calcul ;
  - F-3 : une séance couvre 1 ou 2 créneaux ;
  - F-4 : au plus 6 séances par semaine ;
  - F-5 : conflits calculés par hiérarchie de groupes, **pas par élève** ;
  - F-6 : les groupes sont donnés ;
  - F-7 : une séance ne mobilise que des enseignants et une salle ;
  - F-8 : les examens sont hors du calcul.

- **MOT-02** (branche `etude/mot-02-mesure-solveur`, 15 novembre) : [banc local](../../../scripts/mesures/mot-02/README.md), jeu supérieur simplifié versionné de 20 000 étudiants (4 800 leçons), témoin faisable séparé, contrôles de complétude et compteurs cgroup. Plan validé par le coordinateur, 18 tests verts. Six passages avant/après MOT-12 de 600 s : tous incomplets. Le [complément du 21 novembre](../../conception/moteur-planification/mot-02-mesure-solveur.md#supérieur-21-novembre) a été validé et mesuré sur deux tailles. Les douze passages sont faisables. À 960 étudiants, la médiane souple passe de +5 à 0. [Mesures et limites](../../conception/moteur-planification/mesures.md).

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| MOT-01 | Valeurs du moteur datées et résolues (profil, école, niveau) ; répondre à la relecture du contrat (Q-04) avant les écrans | MP-1 | 1 | M | — | fait (serveur) ; écrans avec ADM-02 |
| MOT-02 | Mesurer le solveur sur un jeu du supérieur multi-campus avec CM, TD, TP et vacataires | ME-14a | 1 | M | — | mesure terminée sur branche le 21 novembre · 480 et 960 étudiants, alerte souple transmise à MOT-04 |
| MOT-03 | Validation avant le calcul : toutes les règles `requiert`, `borne` et `exclut` du catalogue, avec un message qui dit quoi faire (EP-4) | MP-2 | 3 | M | MOT-01 | PR ouverte (#183) |
| MOT-04 | Modèle neutre et évaluateur indépendant ; essai Timefold contre CP-SAT ; **décision sur la fin de Timefold 1.x** (Q-05) | MP-3, MP-4 | 3 | L + M | MOT-02 | à faire |
| MOT-05 | Profils et nomenclatures lus dans la base (cycle, niveau, classe, demi-groupe, groupe transversal de langue ou d'option), à la place de `config/referentiel.js` (importé par 28 fichiers). Version réduite à l'étape 2, complète à l'étape 3 | ME-2a, F-04 | 2 puis 3 | M + L | VSC-01, Q-08 | à faire |
| MOT-06 | Collège : conflits **par élève** (F-5), groupes transversaux de langue et d'option, demi-groupes, salles spécialisées. Le calcul lit les appartenances de VSC-07 ; le collège fictif suffit pour la mesure | MP-6, F-11 | 3 | XL | MOT-03, MOT-05 | à faire |
| MOT-07 | Lycée : options, plus de 2 créneaux par séance (F-3), semaines A et B (F-1). Le primaire et la maternelle selon Q-07 | MP-6 | 3 | L | MOT-06 | à faire |
| MOT-08 | File simple des calculs : une école attend son tour sans bloquer les autres | A-3 de la revue | 2 | M | PLA-01 | à faire |
| MOT-09 | Remplaçant proposé automatiquement en cas d'absence d'un enseignant : libre sur le créneau, capable de la matière ; l'administration valide en un geste ; les enseignants sont prévenus par COM | F-11 (2e partie) | 4 | M | MOT-06, COM-01 | à faire |
| MOT-10 | Grande échelle : solveur réglable, file par école, 20 000 étudiants en moins de 30 min ; poids et plages lus depuis les valeurs | ME-14, MP-5 | 5 | L | MOT-04 | à faire |
| MOT-11 | Règles nouvelles, famille par famille (examens dans le calcul F-8, ressources F-7, etc.), chacune avec ses données et son test | MP-7 | 5 | M par famille | MOT-10 | à faire |
| MOT-12 | Montée du solveur : Spring Boot 3.3.5 vers 4.1, Timefold 1.15 vers 1.35 (cœur, sans le starter), Java 21 inchangé (décisions des 13 et 15 novembre), avant MOT-04 ([conception](../../conception/moteur-planification/mot-12-montee-solveur.md)) | — | 1 | M | — | fait (#181, fusionnée le 15 nov.) |
| MOT-13 | **Contraintes déclarées par l'école** : l'école ne règle pas les 498 paramètres, elle déclare ses contraintes à partir de six modèles ; liste « Déjà pris en compte » du profil ; contrôle de place avant le calcul. Étapes : 13a serveur, 13b solveur et bilan, 13c écran ([conception](../../conception/moteur-planification/mot-13-contraintes-declarees.md)) | — | 3 | M + L + M | 13b : MOT-12 ; 13c : ADM-02 | 13a fusionnée (#178, 15 nov.) ; 13b fusionnée (#182, 15 nov., [complément](../../conception/moteur-planification/mot-13b-solveur.md)) ; refus de l'activation fine ([plan court](../../conception/moteur-planification/mot-13-coupure-fine.md)) fusionné (#238, 21 nov.) ; **13c** = ADM-02c, dans le chantier ADM ([plan d'ADM-02](../../conception/administration/adm-02-configuration.md), validé le 22 nov.) ; la liste du profil rend `raison_code` et `conditions` (ADM-02a) |

## Critères de « terminé »

- **MOT-02** :
  - le jeu de démonstration est versionné ;
  - le temps, la mémoire et la qualité (règles dures violées) sont notés dans `docs/conception/moteur-planification/mesures.md` ;
  - le rapport rend un verdict sur le jeu du supérieur. Le collège de 600 élèves et son verdict EP-10 passent à l’étape du scolaire ;
  - la qualité des règles souples est comparée à celle d'avant MOT-13b, sur plusieurs passages et plusieurs tailles, et la cause d'un écart est cherchée (score à trois niveaux) : réponse 22 du [complément 13b](../../conception/moteur-planification/mot-13b-solveur.md), 15 nov.
- **MOT-03** :
  - toute combinaison de valeurs invalide est refusée **avant** le calcul ;
  - le message nomme la règle, la cible quand ce n'est pas l'établissement, et propose une correction ;
  - un test par famille de règles.
- **MOT-04** :
  - le même jeu est résolu par les deux moteurs et noté par l'évaluateur indépendant ;
  - la décision est écrite dans [decisions.md](../decisions.md), avec son coût (licence de `ScoreAnalysis` en 2.x).
- **MOT-06** : un collège de démonstration avec deux langues vivantes réparties sur plusieurs classes est généré **sans conflit d'élève**. C'est le jalon de l'étape 3.
- **MOT-09** : pour une absence saisie, la proposition nomme un enseignant libre qui peut tenir la matière ; après validation, les deux enseignants sont prévenus. Un parcours le prouve.
- **MOT-08** : deux écoles lancent un calcul en même temps ; la seconde voit sa place dans la file ; aucune ne bloque l'autre.
- **MOT-13** : voir le § 1 de [sa conception](../../conception/moteur-planification/mot-13-contraintes-declarees.md). En 13a, une contrainte invalide est refusée avec une phrase, le contrôle de place bloque la génération en nommant les contraintes en cause, et le problème de l'école d'origine ne change pas. En 13b, le collège fictif respecte ses contraintes, ou le bilan dit pourquoi.

## Exigences produit

EP-4 (chaque refus s'explique), EP-10 (rapide à grande échelle).

## Décisions

- **D-09 amendée le 4 novembre** : 26 règles strictes verrouillées, 22 strictes réglables, 86 souples.
- **Choix du moteur** : tranché par la mesure (MOT-04).
- **Primaire et maternelle** : saisie simple tant que Q-07 n'est pas tranchée.

## Conception et références

- [README du moteur](../../conception/moteur-planification/README.md)
- [Conception de MP-1](../../conception/moteur-planification/conception-mp1.md)
- [Relecture du contrat de MP-1](../../conception/moteur-planification/relecture-mp1-contrat.md)
- [Conception de MOT-13 : contraintes déclarées](../../conception/moteur-planification/mot-13-contraintes-declarees.md)
- [Catalogue et profils](../../conception/moteur-planification/catalogue/profils.md)
- Archives : [planification adaptative](../../archives/plans/planner-multi-etablissements/06-planification-adaptative.md)
