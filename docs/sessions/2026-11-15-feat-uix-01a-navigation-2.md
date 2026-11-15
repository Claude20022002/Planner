# Session du 2026-11-15 · suivi CI UIX-01a · `feat/uix-01a-navigation`

| | |
|---|---|
| Fait par | Codex |
| Chantier | Exception UIX-01a validée par le chef |
| Dossier | `..\travaux-planner\uix-01a-navigation` |
| PR | [#184](https://github.com/Claude20022002/Planner/pull/184) |
| Dernier commit | commit de cette fiche : tests et état CI |

## Objectif

Suivre la CI, comme demandé par le chef, et traiter les échecs de navigation dans le périmètre UIX déjà validé.

## Plan

Application de la [conception validée](../conception/interface/uix-01a-navigation.md), sections 8 et 9 : adapter les parcours à la navigation et corriger les échecs observés. Aucun nouveau choix de produit.

1. Cause : un sélecteur du parcours étudiant trouve deux liens « Emploi du temps » ; deux parcours cherchent encore « Mes quiz » dans le menu global alors que celui-ci est contextuel.
2. Correction : limiter le sélecteur au titre de l'application ; rejoindre les quiz par Toutes les applications puis Quiz et jeux.
3. Vérification : syntaxe des trois fichiers, collecte des quatre tests, relecture des sélecteurs à partir des erreurs CI ; exécution complète à refaire après push par le chef.

## Résultat CI observé

[Exécution 43739698474](https://github.com/Claude20022002/Planner/actions/runs/43739698474), sur `1879a486` :

- Build Frontend, Test Backend, Test Mobile, Test Solveur et Scripts d'exploitation : **verts**.
- Parcours de démonstration : **échec après 24 min 55 s** ; **39 réussis, 3 échoués, 1 non exécuté** (dépendance du projet IIIA).
- Échecs : `applications.spec.cjs` étudiant, `creerQuiz.spec.cjs`, `studioQuiz.spec.cjs`.
- Le parcours administrateur Applications et les connexions des trois rôles ont réussi.
- Aucune nouvelle exécution déclenchée par l'agent ; aucun push ni fusion.

## Fait et vérifié

- Trois fichiers de tests corrigés ; aucun fichier de code produit modifié.
- `node --check` : trois fichiers valides.
- Playwright `--list` : **4 parcours collectés dans 3 fichiers**, pas exécutés localement.
- `git diff --check` propre.
- Suivi et module UIX actualisés : PR #184 ouverte, CI rouge, corrections locales à pousser.
- Boîte Codex relue : aucun message en attente.

## Limites et reste

La correction des sélecteurs ne prouve pas que toute la suite passe : deux scénarios de quiz s'arrêtaient avant leur parcours métier. Après push, suivre la nouvelle CI, analyser tout nouvel échec et faire la relecture avant fusion. Aucun serveur local lancé par l'agent.

## Commande pour le chef

La PR existe, ne pas la recréer :

```powershell
git -C "..\travaux-planner\uix-01a-navigation" push origin feat/uix-01a-navigation
```

## Prompt de reprise

```text
Reprends le suivi de la PR #184, UIX-01a, dans ..\travaux-planner\uix-01a-navigation.
Lis AGENTS.md, la boîte ..\boites\codex\entree, le suivi et cette fiche.
La CI 43739698474 sur 1879a486 a cinq contrôles verts et trois parcours en échec :
un sélecteur mobile ambigu et deux tests de quiz encore liés au menu global.
Les trois tests sont corrigés dans le commit de cette fiche ; syntaxe valide, quatre parcours collectés,
mais aucune exécution locale. Le chef doit pousser, puis suivre la nouvelle CI et examiner tout échec.
Reste dans la conception UIX validée. Aucun push, aucune fusion et aucune commande serveur par l'agent.
Fin : suivi, fiche, commit local et rapport au coordinateur.
```
