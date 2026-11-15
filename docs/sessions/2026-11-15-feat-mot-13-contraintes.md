# Session du 2026-11-15 · MOT-13 · `feat/mot-13-contraintes`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | MOT (ouvert le 15 nov., décidé le 13 nov. à la place de QUA) |
| Dossier de travail | `..\travaux-planner\mot-13-contraintes` |
| Dernier commit | voir `git log -1 feat/mot-13-contraintes` |

## Objectif de la session

Le chef demande au planificateur une **gestion intelligente des contraintes**. On n'impose pas à l'école les 498 paramètres du catalogue : elle fournit les contraintes qui comptent pour elle. Le chef a laissé le choix du module à l'agent, qui a pris MOT ; il a ensuite validé le plan et demandé de le coder.

## Plan

[docs/conception/moteur-planification/mot-13-contraintes-declarees.md](../conception/moteur-planification/mot-13-contraintes-declarees.md), validé par le chef le 15 novembre (réponses 1 à 15). La réponse 16 est venue pendant le code.

Le principe :
- le **socle** vient des données ;
- le **profil** donne une liste courte « Déjà pris en compte », que l'école peut couper ou adoucir, sauf les règles verrouillées ;
- l'école déclare ses **contraintes** à partir de **six modèles** : plage interdite, plage à éviter, moment de la journée, plafond par jour, répartition, ensemble ou séparé.

La fonction se livre en trois étapes : 13a côté serveur (cette branche), 13b côté solveur après MOT-12, 13c pour l'écran, avec ADM-02.

## Fait

- `27be603` : plan validé, chantier MOT ouvert dans `suivi.md` (MOT-13, MOT-12, MOT-02, MOT-03, MOT-04). MOT-12 et MOT-13 sont ajoutées, la migration 0080 est réservée, et `decisions.md` reçoit les décisions des 13 et 15 novembre.
- `5a55a56` : fonctions pures. Les six modèles (`contraintes/gabarits.js`), leurs phrases, leur contrôle (champs, cibles, nature, insistance, bornes légales), les contradictions directes et le contrôle de place (par groupe le plus fin et par type de salle). 24 tests unitaires.
- `b6f38da` : la table `ContrainteDeclaree` (migration 0080), rattachée aux versions de MP-1.
  - Les contraintes suivent le même cycle que les réglages, avec retrait et version inverse.
  - Routes : `/api/moteur/gabarits`, `/contraintes`, `/contraintes/profil` et `/contraintes/verifier`.
  - `POST /api/moteur/versions` accepte `contraintes` et `retirer`.
  - La génération s'arrête si des plages interdites ne laissent pas assez de créneaux. Le message nomme ces contraintes, et la session garde tous les manques (`config.refus_place`).
  - 13 tests d'intégration. Le test de MP-1 rejoue la migration 0080 autour de la 0061.
- Commit de fin de session : fichier du module MOT, `suivi.md`, plan (§ 5) et cette fiche.

**Écarts avec le plan**, inscrits dans le plan :
- réponse 16 du chef : une règle n'est « sans effet » que si l'une de ses conditions `active_si` n'est pas remplie. On n'utilise pas les `requiert` du catalogue, qui citent des données absentes que des règles déjà appliquées lisent quand même ;
- le contrôle de place est appelé depuis `generation.js`, et non depuis `avertissements.js` ;
- avant la génération, le contrôle de place ne tourne qu'à blanc, et seulement si une période est donnée ;
- un manque dû aux seules disponibilités des enseignants ne bloque pas la génération, pour que celle de l'école d'origine ne change pas.

## Vérifié

- Tests unitaires du serveur : **24 fichiers, 354 tests verts** (dont 24 nouveaux).
- Suite d'intégration complète, sur MySQL 8.4 jetable (port 3314) : **59 fichiers, 593 tests verts**, en 900 s. Il faut `NODE_OPTIONS=--max-old-space-size=8192`.
- Le problème envoyé au solveur est identique avec et sans contraintes déclarées (test d'intégration).
- Lint du serveur : 0 erreur, 17 avertissements de longueur, déjà présents avant la session.
- `node scripts/verifier-neutre.mjs` : aucun nom d'école en dur.
- **Non lancé ici** : les parcours du site, qui tournent dans la CI de la PR. Le site n'est pas touché.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 15 | Voir le § 3 du plan | toutes répondues le 15 nov. | réglé |
| 16 | « Sans effet » par `requiert` ou par `active_si` | par `active_si` (15 nov.) | réglé |
| — | MOT-13b : la forme exacte du score (`HardMediumSoftScore`) et la lecture des poids, après MOT-12 | complément de plan à écrire | en attente |
| — | Couleurs du logo, anneau de focus (décision du 13 nov.) | à inscrire par la fonction UIX qui s'en chargera | en attente, hors MOT |

## État laissé

- `docs/plan/suivi.md` : MOT-13 est « en cours : 13a codée, PR à ouvrir ; 13b après MOT-12 ».
- Chantier MOT : il reste 5 fonctions (MOT-13 b et c, MOT-12, MOT-02, MOT-03, MOT-04). Le chantier QUA se ferme à la fusion de #171.
- La base MySQL jetable `planner_mysql_mot13` est retirée. La jonction `backend\node_modules` du dossier de travail reste en place ; elle se retire en fermant la branche (README du plan, § 3, étape 6).
- **Conflits possibles** dans `suivi.md` et `decisions.md` avec #171, #173 et #172. Ce sont des lignes ajoutées dans les mêmes tableaux : il suffit de garder toutes les lignes. Si #173 (PLA-03a) est fusionnée avant, `contraintesDeclarees.test.js` prend déjà « le premier campus actif » et ne dépend pas des campus de l'école d'origine.

## Reste à faire, dans l'ordre

1. Le chef fusionne #171 : QUA-03 passe à « fait » et le chantier QUA se ferme.
2. Le chef pousse cette branche et ouvre la PR de MOT-13a. Les parcours se vérifient dans la CI.
3. MOT-12 : montée du solveur (Spring Boot 4.x, Timefold 1.31, Java 21). Questions et plan d'abord.
4. MOT-13b : complément de plan, à valider.
   - compilation des contraintes en séances concernées ;
   - `ContraintesDeclarees.java` ;
   - `HardMediumSoftScore` ;
   - poids des 10 règles souples lus depuis les valeurs ;
   - pause du vendredi et samedi après-midi changés en contraintes déclarées ;
   - bilan hors du solveur ;
   - collège fictif.

   Ensuite, on passe `tenu: true` sur les modèles tenus.
5. MOT-13c avec ADM-02 ; puis MOT-02, MOT-03 et MOT-04.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\mot-13-contraintes" push -u origin feat/mot-13-contraintes
gh pr create --base main --head feat/mot-13-contraintes --title "MOT-13a : contraintes déclarées par l'école (six modèles, contrôle de place)" --fill
gh pr checks feat/mot-13-contraintes --watch
```

## Prompt de reprise

```text
Tu reprends le chantier MOT de Planner. MOT-13 (contraintes déclarées par l'école : six modèles
au lieu des 498 paramètres) a son étape 13a codée sur la branche feat/mot-13-contraintes,
dossier ..\travaux-planner\mot-13-contraintes.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/moteur-planification/mot-13-contraintes-declarees.md (16 réponses)
et la fiche docs/sessions/2026-11-15-feat-mot-13-contraintes.md.
Vérifie avec gh pr list si #171 (QUA-03) est fusionnée et si la PR de MOT-13a existe, avec sa CI
(parcours compris) verte ; sinon, dis-le au chef et corrige ce qui échoue.
Fait : table ContrainteDeclaree (migration 0080) dans les versions de MP-1 ; routes /api/moteur/gabarits,
/contraintes, /contraintes/profil, /contraintes/verifier ; le contrôle de place arrête la génération ;
593 tests d'intégration et 354 tests unitaires verts. Le solveur ne tient pas encore les contraintes (tenu: false).
Reste, dans l'ordre : MOT-12 (montée du solveur : questions, plan, validation, puis code),
puis le complément de plan de MOT-13b (solveur, HardMediumSoftScore, bilan hors solveur, collège fictif).
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
