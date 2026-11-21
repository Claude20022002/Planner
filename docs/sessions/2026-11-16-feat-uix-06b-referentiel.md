# Session du 2026-11-16 · conception UIX-06b · feat/uix-06b-referentiel

| | |
|---|---|
| Agent | Codex, skill impeccable en registre produit |
| Dossier | ..\travaux-planner\uix-06b-referentiel |
| Base | origin/main à 11329211, fusion de #185 |
| Conception | 2c8fa9f9 |
| État | proposition à valider, aucun code produit |

## Objectif et plan

Le chef demande de poursuivre avec la conception du référentiel pédagogique. [Plan proposé](../conception/interface/uix-06b-referentiel.md). La demande de poursuivre n’est pas une validation anticipée de son contenu ni de l’exception d’implémentation.

## Fait

- Lu : AGENTS, plan/suivi/décisions, boîte, missions, dernières fiches UIX-06a, modèle de conception, navigation, routes et droits, code des quatre pages et composants associés, DESIGN et règles produit d’impeccable déjà chargées.
- Lecture distante de main sans modifier le dossier principal (main local y reste inchangé). Dossier/branche séparés créés depuis origin/main à 11329211.
- Inventaire : Filières (289 lignes), Groupes (400), Cours (331), Enseignements (403). Règles spécifiques relevées : responsables, arbre de groupes/années, composantes, génération depuis maquette, bilan, mutualisation/scission et équipes.
- Roles confirmés dans App : Filières administration ; les trois autres autorisent aussi les responsables, limités à leurs filières. Désactivation des comptes d’un groupe toujours admin seulement.
- Réutilisation proposée du pilote, avec outils de gestion génériques/adaptateurs. ListePersonnes utilise id_user : ne pas la réemployer directement pour les identifiants des objets pédagogiques. Rendus spécialisés pour l’arbre et les composantes.
- Questions, architecture, maquette textuelle, fichiers, tests, risques et retour arrière rédigés ; plan committé seul avant validation.
- Suivi et module actualisés : UIX-06a fusionnée et UIX-06b proposée, aucun code réalisé pour ce dernier.
- PR #187 relue pour son périmètre (dates/PDF/shared) et #183 (moteur/backend) : pas de conflit direct identifié avec les quatre écrans. Confirmation coordinateur demandée dans le rapport ; aucune mission UIX-06b reçue.
- Ancien message de boîte UIX-01a/MOT-02 laissé en entrée pour sa partie MOT-02 ; aucun travail de cette mission entrepris.

## Vérifié

Documentation seulement : chemins et règles recoupés dans les sources ; git diff --check avant commits ; changements limités à conception, suivi, module et fiche. Aucun test produit, serveur ou installation de dépendance. Pas de push ni de PR créés par Codex. Le dossier principal et la branche UIX-06a n’ont pas été modifiés.

## Questions au chef

1. Confirmer UIX-06b et l’exception limitée pour ce lot, sans quatrième chantier ? Proposition : oui.
2. Reprendre les quatre pages et seulement leurs fonctions, droits et vocabulaire actuels ? Proposition : oui.
3. Téléphone : fiches compactes et détails dépliables, hiérarchies et toutes les actions conservées ? Proposition : oui.

Le plan, l’exception et les réponses restent à valider. La direction du pilote déjà validée n’est pas rouverte. Son découplage visuel de UIX-01 est proposé pour ce lot sans migration ni assistant.

## État laissé

Conception proposée sur feat/uix-06b-referentiel. L’exception UIX-06a n’est pas étendue et aucun nouveau chantier n’est ouvert. La clôture 7dadb412 de l’autre dossier reste locale ; main contient la fonctionnalité mais pas ce commit documentaire. Le suivi de cette branche indique uniquement les faits UIX recoupés.

## Suite

Retour du coordinateur sur identifiant/périmètre/collisions, validation explicite du chef des trois questions et du plan, puis inscription et commit de l’accord avant implémentation.

## Commandes pour le chef

Depuis le dépôt principal, pour partager la conception :

```powershell
git -C "..\travaux-planner\uix-06b-referentiel" push -u origin feat/uix-06b-referentiel
gh pr create --draft --base main --head feat/uix-06b-referentiel --title "UIX-06b : conception du referentiel pedagogique" --fill
```

## Prompt de reprise

```text
Tu reprends la conception proposée UIX-06b sur feat/uix-06b-referentiel,
dossier C:\Users\clusa\Desktop\Github Project\travaux-planner\uix-06b-referentiel.
Lis AGENTS.md, docs/plan/README.md, suivi.md, decisions.md, ta boîte
..\boites\codex\entree, les missions éventuelles,
docs/conception/interface/uix-06b-referentiel.md et cette fiche.
Base : origin/main à 11329211 ; pilote UIX-06a fusionné, 49 parcours verts.
Conception 2c8fa9f9 : Filières, Groupes, Modules/maquette et Enseignements.
Aucun code produit. Identifiant proposé et exception hors chantier à confirmer ;
plan et trois propositions attendent la validation explicite du chef.
Ne pas transformer la demande « Allons s’y » en validation du plan non encore présenté.
Vérifier le retour du coordinateur, inscrire et commiter l’accord avant code.
Préserver droits, API et données ; frontend seulement, UIX-01/02 hors périmètre métier.
Réutiliser la marque et le thème du pilote ; arbres/composantes/équipes adaptés au téléphone.
Aucun backend, migration, serveur, push ou fusion par l’agent.
Fin : suivi, module, fiche, commits locaux et rapport au coordinateur.
```
