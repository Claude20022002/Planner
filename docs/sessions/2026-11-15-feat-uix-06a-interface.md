# Session du 2026-11-15 · conception UIX-06a · `feat/uix-06a-interface`

| | |
|---|---|
| Fait par | Codex |
| Chantier | UIX fermé ; conception demandée directement par le chef, nouvelle exception d'implémentation à confirmer |
| Dossier | `..\travaux-planner\uix-06a-interface` |
| Dernier commit de conception | `db52aaef` |

## Objectif et plan

Le chef demande une application de gestion comme OpenEduCat, avec notre dernier logo, après l'analyse du site et des captures officielles. [Plan détaillé](../conception/interface/uix-06a-interface.md), **à valider**. Aucun code produit écrit avant cette validation.

## Fait

- Lu : organisation, suivi, PR ouvertes et boîte Codex, composants de gestion et de marque, conception du socle neutre.
- Dernier logo retrouvé dans le dépôt marketing voisin : piste C mosaïque, palette Récré, validée le 11 novembre. L'image `frontend/public/logo-planner.png` est une illustration ancienne ; `logo.png` est celle de l'école pilote.
- Règles du kit lues : logo complet pour Planner générique ; école d'abord avec logo/nom, filet et mot PLANNER à 40 % dans l'application d'une école. Les SVG maîtres existent, pas besoin de génération d'image.
- Document de conception complet : questions, maquette textuelle, diagrammes, fichiers, sécurité, tests et livraison. Pilotage proposé : accueil/connexion/navigation puis comptes, enseignants et étudiants ; extension ultérieure aux autres domaines.
- Suivi et module UIX : correction de l'état périmé de UIX-01a (PR #184 fusionnée, six contrôles verts et 43 parcours), puis proposition UIX-06a.
- Branche créée depuis `origin/main` à `6d89f79c`, en dossier séparé ; pas de modification du dépôt principal ni de la branche UIX-01a fusionnée.

## Vérifié

Documentation seulement. Constat de fusion de #184 et CI confirmé précédemment par GitHub. Logo horizontal consulté visuellement. Liens locaux des trois documents touchés contrôlés ; `git diff --check`. Aucun serveur lancé, aucune dépendance installée, aucune donnée de base modifiée. Aucune nouvelle fonction revendiquée comme réalisée.

## Questions au chef

1. Autoriser UIX-06a hors chantier, sans ouvrir un quatrième chantier ? Proposition : oui, pour ce pilote seulement.
2. Périmètre de la première livraison : accueil, connexion, navigation et pages Personnes (comptes, enseignants, étudiants) ? Proposition : oui.
3. Découpler le lot visuel sans migration de la dépendance UIX-01 ? Proposition : oui, en laissant état en configuration et assistant hors périmètre.
4. Direction : interface sobre clair/sombre, Inter pour l'interface, bleu nuit Planner par défaut et marque d'école conservée, logo intact ? Proposition : oui.

## État laissé

Conception **à valider**, aucun code produit. EXP, PLA et MOT restent les trois chantiers ouverts. L'exception de UIX-01a n'est pas étendue implicitement. Message de coordination antérieur relu ; sa partie MOT-02 concerne un autre travail et reste en attente dans la boîte.

## Reste

Accord du chef sur les quatre points et le plan, puis inscrire la validation et la commiter avant de coder. Informer le coordinateur du périmètre frontend. Implémenter et vérifier le pilote dans une nouvelle session, avant d'étendre la refonte à d'autres fonctions.

## Commandes pour le chef, s'il souhaite partager la conception

```powershell
git -C "..\travaux-planner\uix-06a-interface" push -u origin feat/uix-06a-interface
gh pr create --draft --base main --head feat/uix-06a-interface --title "UIX-06a : conception de la refonte de gestion et logo mosaïque" --fill
```

## Prompt de reprise

```text
Tu reprends UIX-06a sur feat/uix-06a-interface dans ..\travaux-planner\uix-06a-interface.
Lis AGENTS.md, docs/plan/README.md, suivi.md, ta boîte ..\boites\codex\entree,
docs/conception/interface/uix-06a-interface.md et cette fiche.
La conception db52aaef est rédigée ; aucun code produit n'est écrit.
Le chef demande l'application de gestion inspirée d'OpenEduCat, avec le logo mosaïque validé le 11 novembre.
Le kit approuvé est dans ..\..\planner-marketing\marketing\brand\logo\kit depuis ce dossier.
Réponses du chef aux quatre questions : <à coller>. Sans validation explicite du plan et de l'exception,
ne pas coder. Après accord, inscrire et commiter la validation avant l'implémentation.
Pilotage : accueil/connexion/navigation puis comptes/enseignants/étudiants, sans backend ni migration.
Les autres domaines ne sont pas autorisés implicitement. Le chef seul lance les serveurs, pousse et fusionne.
Fin : suivi, fiche, commits locaux et rapport au coordinateur.
```
