# Session du 2026-11-27 · QJE-17a · `doc/qje-17a-modules`

| | |
|---|---|
| Fait par | Claude (Opus 5.5), session VS Code, étape confiée par le coordinateur (choix du chef : l'agent de QJE-17 la fait) |
| Chantier | JEU (ex-QJE), hors chantier (décision du chef du 26 nov.) |
| Dossier de travail | `..\travaux-planner\qje-17a-modules` |
| Dernier commit | `ee9a26e5` ; cette fiche, au commit suivant |

## Objectif de la session

Étape 17a de QJE-17 : partager le module QJE du plan en trois modules (QUI, JEU, IAG), et passer l'offre de l'étude 15 à dix-huit modules. Documents seulement.

## Plan

[docs/conception/jeux/qje-17-separer-quiz-jeux.md](../conception/jeux/qje-17-separer-quiz-jeux.md), **validé par le chef le 27 nov.** (`23ca5163`, branche `etude/qje-17-separer-quiz-jeux`), § 4.3 « Plan et offre (17a) ». Questions 12 à 15 tranchées par le coordinateur (`decisions.md`, 9fe05bb4). Pas de plan séparé pour 17a.

## Fait

- `ee9a26e5` :
  - `docs/plan/modules/QUI-quiz.md`, `JEU-jeux-pedagogiques.md`, `IAG-ia.md` (nouveaux) ;
  - `QJE-quiz-jeux-ia.md` réduit à un renvoi ;
  - `docs/plan/README.md`, § 1 : trois lignes au lieu de QJE, et la table de correspondance des QJE-01 à 18 ;
  - `docs/etude-marche/15-modules-et-packs.md` : n° 4 Quiz, n° 18 Jeux pédagogiques, § 0, § 5.1 à 5.4, § 7, § 8 ;
  - `docs/plan/modules/VEN-vente-modules.md` : critère de VEN-01, deux clés `quiz` et `jeux`.
- Les lignes QJE-15 et QJE-18 de JEU reprennent mot pour mot celles d'aujourd'hui (QJE-15 depuis `suivi.md`, que l'ancien fichier de module n'avait pas ; QJE-18 depuis la branche de coordination). QJE-16 vient de `suivi.md`.

## Vérifié

- Liens relatifs des fichiers touchés : tous trouvés sur `origin/main`, sauf deux, qui arriveront avec les fusions :
  - le plan `docs/conception/jeux/qje-17-separer-quiz-jeux.md` (branche `etude/qje-17-separer-quiz-jeux`) ;
  - la fiche `docs/plan/missions/qje-18-atelier-jeux.md` (branche du coordinateur).
- Plus aucune mention de « Quiz et jeux » dans l'étude 15, hors historique.
- Aucun code ; aucun test à lancer.

## Ordre de fusion

1. `etude/qje-17-separer-quiz-jeux` (le plan visé), avant ou avec cette branche ;
2. `doc/qje-17a-modules` (cette branche). **Conflit attendu** avec la branche de coordination, qui ajoute les lignes QJE-17 et QJE-18 à `QJE-quiz-jeux-ia.md` : garder la version de cette branche (le renvoi). Ces lignes sont déjà dans `JEU-jeux-pedagogiques.md`.

## Lignes de `suivi.md` à changer (le coordinateur les reporte)

- **Chantiers** (ligne de QJE) : le code devient « JEU (ex-QJE) » et le lien `modules/JEU-jeux-pedagogiques.md` ; QUI et IAG n'ont pas de chantier ouvert.
- **Missions en cours**, colonne du module :
  - QJE-15, QJE-17, QJE-18 et la suite de QJE-04 (#229) → JEU ;
  - sortie de ClassQuiz (QJE-03, QJE-06) et QJE-14 → QUI.
- **Ligne de QJE-17** : « plan validé par le chef le 27 nov. (`23ca5163`) ; 17a faite (`ee9a26e5`, `doc/qje-17a-modules`) ; 17b (logos, Codex) après VIT-24 ; 17c (site) après VIT-24 et la part du site de QJE-15 ».
- **Tableau des fonctions** : le lien de chaque QJE-xx pointe vers son nouveau fichier :
  - `modules/QUI-quiz.md` : QJE-01, 02, 03, 06, 09, 10, 11, 14 ;
  - `modules/JEU-jeux-pedagogiques.md` : QJE-04, 05, 08, 15, 17, 18 ;
  - `modules/IAG-ia.md` : QJE-07, 12, 13, 16.
- **Ligne de VEN-08** : sans changement (QJE-07 garde son numéro).

## Questions

Aucune nouvelle.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-17 → plan validé ; 17a faite (`ee9a26e5`), à pousser.
- Étapes suivantes de QJE-17 :
  - 17b (logos, Codex) ;
  - 17c (site), 17d (web), 17e et 17f (mobile) ;
  - 17g (contraction).

## Reste à faire, dans l'ordre

1. Le chef pousse les deux branches (plan, puis 17a) et ouvre les PR ; le coordinateur reporte `suivi.md` et `decisions.md`.
2. 17c (site), par cette session, **après la fusion de VIT-24 et de la part du site de QJE-15** : le coordinateur donne le départ.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-17-separer-quiz-jeux" push -u origin etude/qje-17-separer-quiz-jeux
gh pr create --base main --head etude/qje-17-separer-quiz-jeux --title "QJE-17 : plan de la séparation des quiz et des jeux pédagogiques" --fill
git -C "..\travaux-planner\qje-17a-modules" push -u origin doc/qje-17a-modules
gh pr create --base main --head doc/qje-17a-modules --title "QJE-17a : modules QUI, JEU et IAG ; offre à dix-huit modules" --fill
```

## Prompt de reprise

```text
Tu reprends QJE-17 (séparer les quiz et les jeux pédagogiques), module JEU (ex-QJE), hors chantier.
Plan validé par le chef le 27 nov. : docs/conception/jeux/qje-17-separer-quiz-jeux.md (branche etude/qje-17-separer-quiz-jeux, 23ca5163).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, le plan, et cette fiche
(docs/sessions/2026-11-27-doc-qje-17a-modules.md, branche doc/qje-17a-modules, dossier ..\travaux-planner\qje-17a-modules).
Fait : le plan, puis 17a (ee9a26e5) : modules QUI, JEU, IAG ; README § 1 et table de correspondance ; étude 15 à dix-huit modules ; VEN-01.
Reste : 17c, le site, sur une branche nouvelle depuis origin/main, seulement quand le coordinateur dit que VIT-24 et la part du site
de QJE-15 sont fusionnées. Périmètre fixé par le coordinateur ; phrases du § 4.2 du plan (meta.description des jeux sans nombre).
Questions en attente : aucune.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md et decisions.md non modifiés (le coordinateur les tient) ; jamais de git push.
```
