# Session du 2026-11-27 · QJE-17 · `etude/qje-17-separer-quiz-jeux`

| | |
|---|---|
| Fait par | Claude (Opus 5.5), session VS Code, mission confiée par le coordinateur (session plan-b-projet-pacte-60) |
| Chantier | QJE, hors chantier (décision du chef du 26 nov.) |
| Dossier de travail | `..\travaux-planner\qje-17-separer-quiz-jeux` |
| Dernier commit | `f85dd067` (le plan) ; cette fiche, au commit suivant |

## Objectif de la session

Étape 1 de QJE-17, le plan seul : compléter le relevé des endroits où les quiz et les jeux sont réunis, poser les questions de la fiche, écrire le plan de conception. Aucun code.

## Plan

[docs/conception/jeux/qje-17-separer-quiz-jeux.md](../conception/jeux/qje-17-separer-quiz-jeux.md), **en attente du visa du chef**.

## Fait

- `f85dd067` : le plan. Il contient :
  - le relevé complet, par partie (site, web, mobile, serveur, offre, plan) ;
  - les onze réponses du chef et quatre questions au coordinateur ;
  - les phrases nouvelles, en français et en anglais ;
  - les étapes 17a à 17g, avec ce que chacune attend ;
  - les tests.

## Vérifié

- `node scripts/verifier-neutre.mjs` : aucun nom d'école écrit en dur.
- Fichiers et lignes cités, relus sur `origin/main` (`44870e1d`).
- Aucun test de code : la session n'a pas écrit de code.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Nom du module des jeux | « Jeux pédagogiques » | chef, 27 nov. |
| 2 | Nom du module des quiz | « Quiz » | chef, 27 nov. |
| 3 | Où va l'IA | la préparation des quiz reste aux quiz ; un module « IA » du plan pour QJE-07, 12, 13, 16 ; pas vendu à part | chef, 27 nov. |
| 4 | Logos | `activites` refait en manette seule pour les jeux ; nouveau logo pour les quiz (Codex) | chef, 27 nov. |
| 5 | Offre | Quiz n° 4, Jeux pédagogiques n° 18, dans Classe et École ; Supérieur « 1 à 4, 6 et 18 » ; jeux payants | chef, 27 nov. |
| 6 | Porte de l'étudiant | une porte neutre, « Rejoindre » ; scanner inchangé | chef, 27 nov. |
| 7 | « Bibliothèque des jeux » | devient l'onglet « Tous les jeux » de Jeux pédagogiques | chef, 27 nov. |
| 8 | Phrases qui citent les deux | les énumérations restent ; titres, noms et liens uniques changent | chef, 27 nov. |
| 9 | Page web « Activités » | devient « Jeux pédagogiques » ; quiz vers « Mes quiz » ; devoirs vers l'Espace de cours à leur retour | chef, 27 nov. |
| 10 | Sélecteur d'espaces | enseignant : Quiz et Jeux pédagogiques ; étudiant : Rejoindre | chef, 27 nov. |
| 11 | Écran mobile « Activités » | jeux seuls ; écran Quiz après QJE-03 | chef, 27 nov. |
| 12 | Codes du plan (`QUI`, `JEU`, `IAG`) ; les QJE-xx gardent leur numéro | proposition | **coordinateur, puis chef** |
| 13 | Identifiants techniques (`quiz`, `jeux`, `jeuxPedagogiques`) ; routes et tables inchangées | proposition | **coordinateur** |
| 14 | Anciennes adresses du site : vers « Toutes les applications » ; `/bibliotheque-des-jeux/` vers « Tous les jeux » | proposition | **coordinateur** |
| 15 | « Rejoindre » hors de la grille des applications | proposition | **coordinateur** |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-17 → plan écrit (`f85dd067`), au chef ; questions 12 à 15 au coordinateur.
- Chantier : QJE-17 est hors chantier.

## Reste à faire, dans l'ordre

1. Le chef vise le plan (ligne « Validé ») ; le coordinateur répond aux questions 12 à 15.
2. 17a : le coordinateur fait les documents (modules du plan, README, étude 15, VEN-01, `suivi.md`).
3. 17b : Codex dessine les logos et les teintes, puis la planche va au chef.
4. 17c (site), 17d (web), 17e et 17f (mobile), 17g (contraction), chacune après les missions qui tiennent ses fichiers (plan, § 9).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-17-separer-quiz-jeux" push -u origin etude/qje-17-separer-quiz-jeux
gh pr create --base main --head etude/qje-17-separer-quiz-jeux --title "QJE-17 : plan de la séparation des quiz et des jeux pédagogiques" --fill --draft
```

## Prompt de reprise

```text
Tu reprends QJE-17 (séparer les quiz et les jeux pédagogiques) du module QJE, hors chantier,
sur la branche etude/qje-17-separer-quiz-jeux, dans le dossier ..\travaux-planner\qje-17-separer-quiz-jeux.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/jeux/qje-17-separer-quiz-jeux.md et cette fiche
(docs/sessions/2026-11-27-etude-qje-17-separer-quiz-jeux.md).
Fait : le plan (f85dd067), avec les onze réponses du chef (« Quiz », « Jeux pédagogiques », module IA à part,
logos, offre n° 4 et n° 18, porte « Rejoindre », « Tous les jeux », écrans web et mobile).
Reste : le visa du chef ; les réponses du coordinateur aux questions 12 à 15 ; puis l'étape que le coordinateur
te confie (17c site, 17d web, 17e mobile ou 17g), chacune sur sa propre branche, après les missions qu'elle attend (§ 9).
Questions en attente : 12 (codes QUI, JEU, IAG), 13 (identifiants techniques), 14 (anciennes adresses), 15 (Rejoindre hors de la grille).
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
