# Session du 2026-11-21 · QJE-14 · `doc/qje-14-studio-forms`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session de VS Code ; reprise de la file d'interface (fiches `2026-11-21-feat-uix-06c-ressources-temps-2.md` et `2026-11-21-feat-uix-11-tableau-de-bord-3.md`) |
| Chantier | QJE, par l'exception de la sortie de ClassQuiz (18 nov.) ; aucun quatrième chantier |
| Dossier de travail | `..\travaux-planner\qje-14-studio-forms` |
| Dernier commit | voir `git log -1` ; plan : `dfefc613` |

## Objectif de la session

1. #245 (UIX-06c) et #240 (UIX-11) : corriger ce que demanderait la relecture du coordinateur.
2. QJE-14 : état des lieux du Studio et du sondage COU-01, questions au chef, plan de conception validé ; aucun code.

## Plan

[docs/conception/jeux/qje-14-studio-forms.md](../conception/jeux/qje-14-studio-forms.md), **validé par Claude20022002 le 21 novembre 2026**, sans réserve.

## Fait

- #240 : **fusionnée** par le chef le 21 nov. (`d7668781`) ; rien à corriger.
- #245 : ouverte, CI verte (d'après le prompt du chef), **aucune relecture ni commentaire** au moment de la clôture ; rien à corriger.
- `doc/qje-14-studio-forms` créée depuis `origin/main` (`d7668781`).
- État des lieux du Studio (migrations 0044, 0046, 0051 ; `services/studio/*`, `routes/studioQuizRoutes.js`, `routes/passationRoutes.js`, `pages/studio/*`) et du sondage (0059, `services/cours/sondages.js`, conception EC-9) : § 2 du plan.
- 24 questions posées au chef en six séries, toutes répondues (§ 3 du plan).
- `dfefc613` : plan validé et ligne QJE-14 dans `docs/plan/modules/QJE-quiz-jeux-ia.md`.

## Vérifié

Plan seulement : aucun code, aucun test à lancer. Les liens du plan pointent vers des fichiers présents sur `origin/main`.

## Questions

Les 24 réponses du chef sont dans le plan, § 3. Les plus lourdes :

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Les questionnaires non notés remplacent-ils le sondage COU-01 ? | le complètent | répondue |
| 5, 6 | Anonymat ; texte libre en anonyme | par construction (comme S-6), seuil de 3 ; pas de texte libre en anonyme | répondues |
| 7, 12, 23 | Conservation (loi 09-08) | non notées effacées 12 mois après la fermeture ; date de fin obligatoire, 6 mois au plus | répondues |
| 8 | Élèves mineurs | interrupteur éteint par défaut, rappel à la création, avis d'un juriste avant d'allumer chez une école de mineurs | répondue |
| 11, 13 | L'administration crée-t-elle des questionnaires ? | oui, dans QJE-14, vers des classes choisies | répondues |
| 21 | Journaux binaires de MySQL (30 jours) qui relient réponse et participation | l'écrire et l'accepter (§ 7.3) | répondue |

## État laissé

- Pour `suivi.md` (le coordinateur le reporte ; non modifié ici) : **QJE-14 → plan validé par le chef le 21 nov.** (`doc/qje-14-studio-forms`, `dfefc613`) ; prochaine fonction QJE-14a (modèle), plan court à écrire.
- **Numéros de migration à réserver** par le coordinateur : trois (A, B, C du plan, § 6) ; proposition 0084, 0085, 0086. **0083 est écrite sur `feat/sta-01-offres-stage` (#230) sans être inscrite dans `suivi.md`** : à inscrire.
- Pour `decisions.md` (coordinateur) : les 24 réponses de QJE-14, en particulier 5, 6, 7, 8, 11, 21 et 23 ; et toujours les réponses 9, 10 et 13 d'UIX-11 et UIX-06c de la fiche précédente.
- Écart signalé dans le plan (§ 7.4), hors périmètre : les copies notées du Studio (`TentativesQuiz`) ne sont jamais effacées.
- UIX-06c : codée, PR #245, en attente de relecture du coordinateur.

## Reste à faire, dans l'ordre

1. Push de `doc/qje-14-studio-forms` et PR par le chef.
2. #245 : corriger ce que demandera la relecture du coordinateur, si elle revient avant la fusion.
3. L'étude StudyLib (la garder en Laravel ou la reconstruire), fiche [etude-studylib](../plan/missions/etude-studylib.md), puis UIX-10d (le mobile à la charte, après UIX-10b).
4. VIT-09b en dernier sur le site : planche et captures montrées au chef avant le commit.
5. QJE-14a quand le chef ou le coordinateur l'attribue : plan court, validé, puis code.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-14-studio-forms" push -u origin doc/qje-14-studio-forms
gh pr create --base main --head doc/qje-14-studio-forms --title "QJE-14 : plan du Studio « comme Google Forms » (validé)" --fill
```

## Prompt de reprise

```text
Tu es Claude de VS Code sur Planner (ta file d'interface, puis VIT-09b).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md et la feuille de route (branche doc/coordination-equipe),
puis la fiche docs/sessions/2026-11-21-doc-qje-14-studio-forms.md (branche doc/qje-14-studio-forms).
Fait le 21 nov. : #240 (UIX-11) fusionnée ; #245 (UIX-06c) ouverte, CI verte, sans relecture ;
QJE-14 : plan validé par le chef (dfefc613, docs/conception/jeux/qje-14-studio-forms.md), 24 réponses, découpage 14a à 14e.
Reste, dans l'ordre :
1) #245 : corriger ce que demandera la relecture du coordinateur, s'il revient avant la fusion ;
2) l'étude StudyLib : lire docs/plan/missions/etude-studylib.md, créer sa branche depuis origin/main dans
   ..\travaux-planner\<nom>, poser les questions numérotées au chef, écrire l'étude ; puis UIX-10d (après UIX-10b) ;
3) VIT-09b en dernier, planche et captures montrées au chef avant le commit ;
4) QJE-14a quand elle est attribuée : plan court validé avant tout code.
Pour le coordinateur : réserver trois migrations pour QJE-14 (0084 à 0086 proposés), inscrire 0083 (STA-01),
reporter dans decisions.md les réponses de QJE-14 et les réponses 9, 10, 13 d'UIX-11 et UIX-06c.
Si le coordinateur n'est dans aucune session ouverte : poser les questions au chef.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour en fin de session ; suivi.md non modifié ; jamais de git push.
```
