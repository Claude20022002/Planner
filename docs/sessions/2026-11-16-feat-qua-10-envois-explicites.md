# Session du 2026-11-16 · QUA-10 (plan) et suite de QUA-09 · `feat/qua-10-envois-explicites`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | aucun : QUA-10 hors chantier (accord du chef le 16 nov., plan d'abord) |
| Dossier de travail | `..\travaux-planner\qua-10-envois-explicites` ; l'état (`suivi.md`, modules, `decisions.md`) est sur `..\travaux-planner\qua-09-envois-sortants` |
| Dernier commit | voir `git log -1 feat/qua-10-envois-explicites` |

## Objectif de la session

Reprendre QUA-09 (fiche `docs/sessions/2026-11-16-doc-qua-09-envois-sortants.md`, sur `doc/qua-09-envois-sortants`), faire le point sur les fusions, puis écrire le plan de QUA-10.

## Plan

[Conception de QUA-10](../conception/qualite/qua-10-envois-explicites.md) : écrite, questions 1 à 9 tranchées, **validée par le chef le 16 nov.** Aucun code n'a été écrit.

## Fait

État constaté au début :
- `doc/qua-08-security` (#188) : le chef y avait fusionné `main` et l'avait poussée (`e61a7bb`) ; plus de conflit, et la CI était en cours. **En fin de session, les six contrôles sont verts.**
- `etude/failles-erp-scolaires` (#186) : **pas poussée**. La branche locale (`a45ffbf`) résout le conflit, mais GitHub montre toujours #186 en conflit, sans CI.
- `doc/qua-09-envois-sortants` : pas poussée ; elle fusionne sans conflit dans `main` et dans `e61a7bb`.

Sur `feat/qua-10-envois-explicites` (nouvelle branche, part de `main` à `bd934eb`) :
- `cca8db5` : plan de QUA-10, à valider ;
- `daf145b` : réponses du chef aux questions 1 à 9 ;
- `4e74e1c` : plan validé par le chef (commit seul) ;
- la fiche que vous lisez.

Sur `doc/qua-09-envois-sortants` (l'état) :
- `49b25f3` : **QUA-11** inscrite (adresses réelles dans `deploy/`) ; QUA-10 « plan en cours » ; décision de l'ordre de fusion ;
- `4129b9f` : réponses du plan de QUA-10 dans `decisions.md` ; **QUA-12** (secret dans les journaux) et **MOB-08** (pdf.js dans l'application) inscrites ;
- `ed55579` : QUA-10 « plan validé, à coder » ; question 5 de la fiche de QUA-09 réglée.

## Vérifié

- Lu dans le code pour le plan : `services/ia/client.js`, `services/studio/iaFournisseurs.js`, `utils/sendEmail.js`, `services/push.js`, `models/definitions.js:617-623`, `mobile/src/push.js`, `mobile/src/app/_layout.jsx:57-58`, `backend/.env.example`, `server.js`, `tests/integration/push.test.js`, `tests/utils/iaClient.test.js`.
- La liste de QUA-09 reste juste sur un point douteux : les notifications créées en lot (annonces, EDT, rappels d'appel) passent `individualHooks: true`, donc elles partent bien en push.
- Le constat sur les noms de domaine réels dans `deploy/vps/appliquer-maj.sh` (l. 115-122) et `appliquer-quiz.sh` (l. 36 et 41) tient.
- `node scripts/verifier-neutre.mjs` passe sur les deux branches.
- CI de #188 : six contrôles verts (Build Frontend, Test Backend, Test Mobile, Test Solveur, Parcours de démonstration, Scripts d'exploitation).
- Aucun test lancé : aucun code n'a été écrit.

## Écarts avec le plan

Aucun : le plan vient d'être écrit et validé.

## Constats hors périmètre

Les deux sont inscrits, sur décision du chef :
- sans compte de courriel réglé, `sendEmail` écrit tout le courriel dans le journal (`sendEmail.js:84-88`), liens secrets compris : **QUA-12** ;
- pdf.js est chargé depuis cdnjs : **MOB-08**.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Ordre de fusion de #186 et #188 | pousser l'étude, fusionner #186, puis #188 | réglé (chef) |
| 2 | Plan de QUA-10 maintenant, hors chantier ? | oui, le plan seulement | réglé (chef) |
| 3 | Noms de domaine réels dans `deploy/vps/` | fonction QUA-11 | réglé (chef) |
| 4 | Questions 1 à 9 du plan de QUA-10 | voir le plan, § 3 | réglé (chef) |
| 5 | Validation du plan de QUA-10 | validé ; code dans une autre session | réglé (chef) |

Aucune question en attente.

## État laissé

- `suivi.md` (sur `doc/qua-09-envois-sortants`) : QUA-10 « en cours : plan validé, à coder » ; QUA-11, QUA-12 et MOB-08 « à faire ».
- Cette branche ne touche ni `suivi.md` ni les modules, pour éviter les conflits avec QUA-09 : elle ne porte que le plan et cette fiche.
- Aucun chantier ouvert ni fermé.

## Reste à faire, dans l'ordre

1. Le chef pousse `etude/failles-erp-scolaires`, attend la CI de #186, fusionne #186, puis #188 (CI déjà verte).
2. Le chef pousse `doc/qua-09-envois-sortants` et ouvre sa PR. À chaque fusion, la fonction passe à « fait » dans `suivi.md` et dans le module.
3. QUA-10, code, étapes 2 à 5 du plan : IA, courriel (`configurationCourriel.js`), push (`contenuPush`, `PUSH_CONTENU`), résumé au démarrage et `.env.example`, chacun avec ses tests ; suite serveur complète et parcours avant d'annoncer.
4. QUA-10, étape 6, **après la fusion de QUA-09** : fusionner `main` dans cette branche, mettre à jour `docs/envois-sortants.md`, `suivi.md` et le module.
5. Plus tard : QUA-11, QUA-12, MOB-08 (plan d'abord, accord du chef hors chantier).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\failles-erp-scolaires" push
# après la CI de #186 : fusionner #186, puis #188
git -C "..\travaux-planner\qua-09-envois-sortants" push -u origin doc/qua-09-envois-sortants
gh pr create --base main --head doc/qua-09-envois-sortants --title "QUA-09 : liste publique des envois sortants" --fill
# le plan de QUA-10, pour que le coordinateur le voie (la PR viendra avec le code) :
git -C "..\travaux-planner\qua-10-envois-explicites" push -u origin feat/qua-10-envois-explicites
```

## Prompt de reprise

```text
Tu reprends QUA-10 de Planner : aucun envoi implicite chez un tiers (EP-13).
Branche feat/qua-10-envois-explicites, dossier ..\travaux-planner\qua-10-envois-explicites.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la conception
docs/conception/qualite/qua-10-envois-explicites.md (validée par le chef le 16 nov., questions 1 à 9
tranchées) et cette fiche (docs/sessions/2026-11-16-feat-qua-10-envois-explicites.md).
Vérifie d'abord l'état des PR #186 et #188, et de la branche doc/qua-09-envois-sortants
(gh pr list) : elle porte suivi.md, les modules et decisions.md à jour (QUA-10 à QUA-12, MOB-08),
ainsi que docs/envois-sortants.md, qui ne sont pas encore sur main.
Fait : plan écrit et validé ; aucun code.
Reste : étapes 2 à 5 du plan. (2) IA : la famille « openai-compatible » perd son adresse et son
modèle par défaut, Anthropic garde son adresse, les médias perdent api.openai.com ; le test
iaClient.test.js:34 change exprès. (3) Courriel : configurationCourriel.js (absent / incomplet /
pret) ; « incomplet » lève une erreur, compte l'échec (ME-21), n'écrit pas le contenu. (4) Push :
texte générique par défaut (titre : nomProduit(), texte : « Nouvelle alerte. Ouvrez l'application
pour la lire. », le lien reste) ; texte complet seulement avec PUSH_CONTENU=complet. (5) Résumé de
tous les envois au démarrage (server.js), .env.example vidé avec des exemples en commentaire.
Un test par point ; suite serveur complète et parcours avant d'annoncer. Étape 6 (liste
docs/envois-sortants.md, suivi, module) seulement après la fusion de QUA-09 dans main.
Questions en attente : aucune.
Règles : pas de code hors du plan validé ; s'arrêter et faire revalider si le code le contredit ;
questions avant toute supposition ; fichiers courts (sendEmail.js dépasse déjà 300 lignes : ne pas
l'allonger) ; git add <fichiers> ; fiche de session et suivi.md à jour en fin de session ; jamais
de git push.
```
