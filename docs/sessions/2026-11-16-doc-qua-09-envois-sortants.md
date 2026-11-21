# Session du 2026-11-16 · QUA-08 (suite) et QUA-09 · `doc/qua-09-envois-sortants`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | aucun : QUA-08 et QUA-09 hors chantier (accords du chef le 16 nov.) |
| Dossier de travail | `..\travaux-planner\qua-09-envois-sortants` ; aussi `..\travaux-planner\qua-08-security` et `..\travaux-planner\failles-erp-scolaires` |
| Dernier commit | voir `git log -1 doc/qua-09-envois-sortants` |

## Objectif de la session

Reprendre QUA-08 et l'étude 09 (fiche [2026-11-16-doc-qua-08-security.md](2026-11-16-doc-qua-08-security.md)), puis, avec l'accord du chef, QUA-09 : la liste publique des envois sortants (EP-13).

## Plan

- QUA-08 : [conception](../conception/qualite/qua-08-security.md), validée le 16 nov.
- QUA-09 : [conception](../conception/qualite/qua-09-envois-sortants.md). Le chef l'a **validée** le 16 nov., puis l'a **revalidée** le même jour après la correction du § 2.

## Fait

État constaté au début : les trois branches étaient poussées, la PR #188 (QUA-08) était ouverte, et le signalement privé du dépôt était ouvert (`gh api …/private-vulnerability-reporting` → `{"enabled":true}`). En revanche, #186 et #188 étaient **en conflit** avec `main` sur `docs/plan/suivi.md`, après la fusion de #185 (UIX-06a). Aucune CI ne tournait.

Sur `etude/failles-erp-scolaires` (#186) :
- `a45ffbf` : fusion de `main`. Le conflit de `suivi.md` est résolu en gardant les deux côtés : les lignes QUA-08 et QUA-09, puis les sections UIX-06a de `main`.

Sur `doc/qua-08-security` (#188) :
- `34c4b7d` : fusion de l'étude 09 (qui contient `main`) ;
- `9be6ccd` : `suivi.md`, ligne QUA-08 : PR #188, signalement privé ouvert, conflit résolu.

Sur `doc/qua-09-envois-sortants` (nouvelle branche, **empilée sur `doc/qua-08-security`**) :
- `0427ebd` : plan de QUA-09, validé ; QUA-10 inscrite (module QUA, `suivi.md`, `decisions.md`) ;
- `7ca938e` : plan corrigé (voir « Écarts ») et revalidé ; QUA-10 précisée ;
- `c6f11cd` : [docs/envois-sortants.md](../envois-sortants.md) (106 lignes), case « envoi sortant » dans le modèle de PR, liens dans `README.md` et `SECURITY.md`, module QUA et `suivi.md` ;
- la fiche que vous lisez.

Hors du dépôt : la note privée de l'essai (`..\travaux-planner\prive\frappe-essai-note.md`) porte la date d'envoi donnée par le chef et l'échéance qui en découle.

## Vérifié

- `git merge-tree` : `etude/failles-erp-scolaires` et `doc/qua-08-security` fusionnent maintenant sans conflit avec `origin/main`.
- `node scripts/verifier-neutre.mjs` passe sur les trois branches.
- Liste relue contre le code (§ 1 du plan) : recherche de `fetch(`, `nodemailer`, `Expo`, `curl`, `wget`, `rclone`, adresses `https://` dans `backend/`, `frontend/`, `mobile/`, `solver/src/main`, `deploy/`, `scripts/`. Chaque résultat est dans la liste ou écarté comme appel interne. Paquets : aucun SDK de mesure d'audience, de suivi d'erreurs ou de mise à jour à distance.
- Aucun test automatique : documentation seulement. La CI des PR n'a pas tourné depuis la résolution des conflits, qui n'est pas encore poussée.

## Écarts avec le plan

- **§ 2 du plan de QUA-09 faux dans sa première version** : il disait que l'IA et le courriel envoyaient chez un tiers sans réglage. Le code dit l'inverse : rien ne part sans clé (`backend/services/ia/client.js:32`) ni sans compte (`backend/utils/sendEmail.js:83`). Seule la destination par défaut est implicite. En revanche, le **push vers Expo est actif sans réglage**, et ses textes peuvent nommer une personne et donner un motif d'absence. Je me suis arrêté pour corriger le plan, le chef l'a revalidé, puis QUA-10 a été précisée (question 8 du plan).
- `SECURITY.md` : la nouvelle section dit qu'un envoi absent de la liste est une faille à signaler. Le plan prévoyait « une phrase et le lien ».

## Constats hors périmètre

- `deploy/vps/appliquer-maj.sh` (l. 115-120) et `appliquer-quiz.sh` (l. 36) écrivent en dur les **vrais noms de domaine** de l'installation actuelle. `verifier-neutre.mjs` ne lit pas `deploy/`. À traiter à part (QUA ou EXP), sur décision du chef.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Suite de l'essai envoyée ? | oui, date notée dans la note privée | réglé (chef) |
| 2 | Plan de QUA-09 hors chantier ? | oui | réglé (chef) |
| 3 | Fichier, langue, périmètre, contrôle automatique | voir le plan, § 3, questions 1 à 6 | réglé (chef) |
| 4 | Portée de QUA-10 | destinations implicites et contenu du push | réglé (chef) |
| 5 | Noms de domaine réels dans `deploy/vps/` | proposition : une tâche QUA ou EXP pour les remplacer par une variable, et étendre `verifier-neutre` à `deploy/` | réglé (chef, session suivante du 16 nov.) : fonction **QUA-11** |

## Suite, dans une session suivante du 16 nov.

Sur cette branche, l'état seulement : `49b25f3` (QUA-11 inscrite ; QUA-10 : plan en cours) et `4129b9f` (réponses du plan de QUA-10 ; QUA-12 et MOB-08 inscrites), puis le commit de fin de session (QUA-10 : plan validé, à coder). Le plan de QUA-10 est sur `feat/qua-10-envois-explicites`. Fiche de cette session : `docs/sessions/2026-11-16-feat-qua-10-envois-explicites.md`, sur cette autre branche.

## État laissé

- `suivi.md` : QUA-08 en PR #188 ; QUA-09 en cours (`doc/qua-09-envois-sortants`), avec une ligne hors chantier ; QUA-10 « à faire ».
- Module QUA : QUA-09 « liste écrite, à fusionner », QUA-10 ajoutée, « Ce qui existe » pointe vers la liste.
- Aucun chantier ouvert ni fermé.

## Reste à faire, dans l'ordre

1. Le chef pousse `etude/failles-erp-scolaires` et `doc/qua-08-security`, et attend la CI. Puis il fusionne #186, puis #188.
2. Le chef pousse `doc/qua-09-envois-sortants` et ouvre sa PR **après la fusion de #188** (avant, elle montrerait aussi QUA-08 et l'étude 09).
3. À la fusion de chaque PR : la fonction passe à « fait » dans `suivi.md` et dans le module.
4. Réponse du tiers à l'essai, ou échéance : décider ce qui entre dans le document 09 (voir la note privée).
5. Ensuite : QUA-10 (plan d'abord : contenu du push réduit ou push activé par l'école ; destinations explicites ; pdf.js), si le chef l'accorde hors chantier. Puis les points du § 6 du document 09, et la question 5.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\failles-erp-scolaires" push
git -C "..\travaux-planner\qua-08-security" push
# après la fusion de #186 puis de #188 :
git -C "..\travaux-planner\qua-09-envois-sortants" push -u origin doc/qua-09-envois-sortants
gh pr create --base main --head doc/qua-09-envois-sortants --title "QUA-09 : liste publique des envois sortants" --fill
```

## Prompt de reprise

```text
Tu reprends QUA-09 (liste publique des envois sortants) et la suite de QUA-08 de Planner.
Branches : doc/qua-09-envois-sortants (dossier ..\travaux-planner\qua-09-envois-sortants),
empilée sur doc/qua-08-security (PR #188), elle-même empilée sur etude/failles-erp-scolaires (PR #186).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la conception
docs/conception/qualite/qua-09-envois-sortants.md (validée, puis corrigée et revalidée le 16 nov.),
docs/envois-sortants.md, cette fiche (docs/sessions/2026-11-16-doc-qua-09-envois-sortants.md)
et, hors du dépôt, ..\travaux-planner\prive\frappe-essai-note.md.
Fait : conflits de #186 et #188 avec main résolus (suivi.md) ; signalement privé du dépôt ouvert ;
liste docs/envois-sortants.md écrite et relue contre le code ; case du modèle de PR ; liens dans
README.md et SECURITY.md ; QUA-10 inscrite (destinations implicites de l'IA et du courriel,
contenu du push vers Expo).
Reste : le chef pousse et fusionne #186, puis #188, puis pousse QUA-09 et ouvre sa PR ; passer les
fonctions à « fait » à chaque fusion ; ensuite QUA-10 (plan d'abord, accord du chef hors chantier).
Question en attente : vrais noms de domaine en dur dans deploy/vps/appliquer-maj.sh et appliquer-quiz.sh.
Rien de public sur l'essai chez le tiers avant sa réponse ou l'échéance notée dans la note privée.
Règles : aucune affirmation sans source ; ne jamais sonder une installation de tiers ; pas de code
hors du plan validé ; questions avant toute supposition ; fiche de session et suivi.md à jour en
fin de session ; jamais de git push.
```
