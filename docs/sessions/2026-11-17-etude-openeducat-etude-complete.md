# Session du 2026-11-17 · Étude complète d'OpenEduCat · `etude/openeducat-etude-complete`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | aucun (hors chantier, demande du chef) |
| Dossier de travail | `..\travaux-planner\etude-openeducat-complete` |
| Dernier commit | voir `git log` de la branche (un seul commit : étude, registre, README, suivi, fiche) |

## Objectif de la session

Demande du chef : « une étude complète de OpenEduCat et un comparatif avec Planner ».

## Plan

Pas de plan de conception : document seul, sans code. Plan implicite :
1. relire ce que le dépôt sait déjà (07, 08, note de recherche, études 09 et 10 hors de `main`) ;
2. lire le code public d'OpenEduCat sur les points que ces documents n'ont pas vérifiés ;
3. compléter par les pages de l'éditeur (société, IA, Maroc, prix) ;
4. comparer avec l'état de Planner sur `origin/main` ;
5. noter les propositions dans le registre.

## Fait

- `docs/etude-marche/11-etude-openeducat.md` : éditeur, éditions, IA, code de l'édition libre, prix réel avec deux paniers, Maroc, comparatif domaine par domaine, forces et faiblesses, six propositions, huit points à vérifier.
- `docs/etude-marche/03-propositions.md` : P-84 à P-89, « à trancher ».
- `docs/etude-marche/README.md` : ligne du fichier 11.
- `docs/plan/suivi.md` : ligne dans « Travaux en cours hors chantier ».

Faits nouveaux, lus dans le code ou le dépôt le 17 nov. :
- fenêtre de demande d'avis G2 dans le produit, de juillet 2023 à avril 2026 (toujours sur la branche 18.0) ;
- contrôles de conflit de l'emploi du temps éteints par défaut, allumés seulement par les données de démonstration ;
- point d'accès des présences sans connexion sur les branches 16.0 à 20.0, correctif proposé le 16 nov. (PR #1082), pas encore accepté ;
- correctif de juillet 2026 (PR #1061) qui reconnaît deux défauts antérieurs des contrôles.

## Vérifié

- Rien d'exécuté, rien d'installé : documentation seule.
- Code d'OpenEduCat lu par l'API de GitHub (branches 16.0 à 20.0). Pages de l'éditeur lues le 17 nov.
- Non vérifié : solveur Enterprise, format Massar, CMI, prix régional, comportement réel des contrôles sur une installation neuve (à confirmer par l'essai du plan 08).

## Questions

| N° | Question | Proposition | État |
|---|---|---|---|
| 1 | Une autre session a écrit le même soir `10-comparatif-openeducat-planner.md` sur `etude/openeducat-comparatif`. Garder les deux, ou n'en garder qu'une ? | Garder les deux : la 10 est plus détaillée sur les options d'architecture et la recette, la 11 sur le code, la société et les propositions. Fusionner l'une après l'autre ; la seconde ne touche que des lignes différentes de `suivi.md` et du README | ouverte |
| 2 | Les propositions P-84 à P-89 | Trancher P-87 en premier (test des routes ouvertes sans connexion) : c'est la seule qui touche la sécurité de Planner | ouverte |
| 3 | Lancer l'essai du plan 08 ? | Oui, après la fusion d'une des deux études ; il lève six des huit points du § 9 | ouverte (reprend la question 1 du 15 nov.) |

## État laissé

- `docs/plan/suivi.md` : ligne ajoutée (hors chantier).
- Aucun chantier touché.

## Reste à faire, dans l'ordre

1. Le chef pousse et ouvre la PR.
2. Répondre aux questions 1 à 3.
3. Si l'essai est décidé, l'ouvrir comme tâche d'étude dédiée (plan 08).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\etude-openeducat-complete" push -u origin etude/openeducat-etude-complete
gh pr create --base main --head etude/openeducat-etude-complete --title "Étude : OpenEduCat, étude complète et comparatif avec Planner" --fill
```

## Prompt de reprise

```text
Tu reprends l'étude complète d'OpenEduCat, hors chantier, sur la branche
etude/openeducat-etude-complete, dans le dossier ..\travaux-planner\etude-openeducat-complete.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/etude-marche/11-etude-openeducat.md et cette fiche
(docs/sessions/2026-11-17-etude-openeducat-etude-complete.md).
Fait : étude écrite et commitée, propositions P-84 à P-89 au registre, suivi et README à jour.
Reste : pousser et ouvrir la PR (par le chef) ; répondre aux questions 1 à 3 de la fiche ;
vérifier les huit points du § 9 si le chef le demande.
Attention : une autre étude (10-comparatif-openeducat-planner.md) existe sur
etude/openeducat-comparatif ; ne pas la modifier sans accord du chef.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
