# Session du 2026-11-16 · correction CI UIX-06a · feat/uix-06a-interface

| | |
|---|---|
| Agent | Codex |
| Dossier | ..\travaux-planner\uix-06a-interface |
| PR | #185, ouverte et hors brouillon |
| Tête CI analysée | df002a8d |
| Diagnostic avant correction | 632e645b |

## Objectif et plan

Corriger le parcours de reprise réseau signalé par le chef et le coordinateur, dans les vérifications du [plan validé](../conception/interface/uix-06a-interface.md), § 8 et précision § 15. Aucun choix de produit nouveau.

## Diagnostic établi

CI [43775905844](https://github.com/Claude20022002/Planner/actions/runs/43775905844) : 47 parcours réussis, un échoué puis encore échoué en réessai, un non exécuté. Les cinq autres contrôles sont verts. Le coordinateur a sorti la PR du brouillon et juge le fond prêt.

Le test personnes.spec.cjs:52 attendait le compte connecté dans la première page après Réessayer. L’API users trie par id_user décroissant. Dans les deux traces, la reprise obtient une réponse 200 et affiche les dix comptes reçus, sur 31 ; l’administrateur connecté ne figure pas dans cette page. Le test avait une précondition fausse.

## Fait

- Diagnostic et correction prévue committés avant modification du test : 632e645b.
- Largeur ordinateur explicite pour l’assertion sur un tableau.
- Attente armée avant le clic : GET /api/users, page 1, limite 10.
- Vérification de la réponse réelle réussie, de la disparition du bouton de reprise, du nombre de lignes et de chaque email renvoyé.
- Aucune réponse de réussite simulée, aucun délai augmenté, aucune modification du produit ou du backend.
- Suivi/module actualisés ; rapport au coordinateur et archivage du message UIX-06a. Le message UIX-01a/MOT-02 reste dans l’entrée pour sa mission dédiée.

## Vérifié et limites

- Analyse automatique des deux traces : dix comptes rechargés dans chaque tentative, tous présents dans le snapshot ; administrateur absent de ces réponses.
- node --check tests/parcours/personnes.spec.cjs : réussi.
- Collecte Playwright : 49 tests, 27 fichiers, réussie.
- git diff --check : réussi avant commit.
- Aucun parcours intégré lancé : sa configuration démarre les serveurs, réservés au chef. La nouvelle CI reste à obtenir.
- Pas de build ni d’unitaires supplémentaires : aucun code produit modifié. Résultats du pilote dans la fiche précédente du 15 novembre -3.

Artefacts téléchargés : frontend/test-results/uix-06a/ci-43775905844/, ignoré par Git.

## État laissé

Correctif committé localement, à publier ; CI courante toujours rouge sur df002a8d. Aucun push ni fusion effectué par Codex.

## Commandes pour le chef

Depuis le dépôt principal :

```powershell
git -C "..\travaux-planner\uix-06a-interface" push origin feat/uix-06a-interface
gh pr checks 185 --watch
```

## Prompt de reprise

```text
Tu reprends UIX-06a sur feat/uix-06a-interface dans
C:\Users\clusa\Desktop\Github Project\travaux-planner\uix-06a-interface.
Lis AGENTS.md, docs/plan/README.md, suivi.md, decisions.md, la boîte Codex,
docs/conception/interface/uix-06a-interface.md § 15 et cette fiche du 16 novembre.
Plan validé ; pilote 54a9cdea, PR #185 ouverte et hors brouillon.
CI à df002a8d : 47 parcours verts, un échec et un non exécuté.
Cause prouvée : le test de reprise attendait l’administrateur sur la première page,
mais les dix comptes réellement reçus/affichés ne le contiennent pas (tri par id décroissant).
Diagnostic 632e645b ; correction locale : attendre la vraie réponse après Réessayer
et vérifier les comptes qu’elle contient, sans dépendre de l’administrateur.
Syntaxe/collecte conformes, 49 parcours ; pas d’exécution intégrée par l’agent.
Reste : push du chef, nouvelle CI puis corrections éventuelles.
Aucun backend/serveur/push/fusion par l’agent. Fin : suivi, fiche et rapport.
```
