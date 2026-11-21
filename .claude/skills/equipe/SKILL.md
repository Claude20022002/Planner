---
name: equipe
description: Former et conduire une équipe d'agents de Planner (Claude, Codex, agent de Cursor) qui travaillent ensemble, en même temps, sur la même fonction, sans conflit. À utiliser quand le chef veut que plusieurs agents s'attellent à la même tâche, « en équipe », « synchronisés », pour aller plus vite, ou demande un plan de développement partagé pour une soirée. Découpe la fonction en lots par composants avec un seul propriétaire par fichier, nomme un intégrateur, fixe les rendez-vous et le modèle de chaque agent, écrit la fiche d'équipe et envoie les consignes. Complète le skill coordination.
---

# Équipe d'agents sur une même fonction

Vous êtes le **coordinateur** (skill `coordination`). Ce skill ajoute ce qu'il faut quand **plusieurs agents travaillent sur la même fonction en même temps**. Les règles que les agents suivent sont dans `docs/plan/equipe.md` : relisez-les avant de commencer, c'est elles que vous faites appliquer.

Vous ne codez aucun lot. Vous découpez, vous envoyez, vous suivez les rendez-vous, vous relisez.

## 1. Vérifier que la fonction s'y prête

Une équipe ne se forme que si **tout** ceci est vrai. Sinon, dites au chef ce qui manque.

- Le plan de conception est **validé** (par le chef, ou par vous pour une fonction S ou M sans migration, sécurité, donnée de mineur ni choix de produit).
- La fonction est dans un **chantier ouvert**, ou le chef a accordé une exception écrite dans `decisions.md`.
- Elle se coupe en **au moins deux lots qui n'écrivent pas les mêmes fichiers**. Une migration, un schéma partagé ou un seul gros fichier ne se partagent pas : un seul agent les tient.
- Aucune autre mission ouverte n'écrit les mêmes fichiers (tableau « Missions en cours » de `suivi.md`, `git diff --stat` des branches ouvertes).

Faites d'abord le tour d'état du skill `coordination` (§ 1) : qui est libre, qui finit une étape, quels dossiers ont du travail non commité.

## 2. Découper en lots

1. Partez du **périmètre de fichiers** du plan. Listez chaque fichier et chaque dossier qui sera écrit.
2. Rangez-les par **domaine de composants** (`components/<domaine>/` et la page qui l'assemble). Un domaine entier va à un seul lot.
3. Mettez de côté les **fichiers communs** (composants partagés, mise en page, routes, index des traductions, `suivi.md`, fichier du module, conception) : ils vont à l'intégrateur.
4. Donnez à chaque lot **ses dictionnaires de traduction** et **son fichier de parcours** (`docs/plan/equipe.md`, § 2).
5. Équilibrez : le lot le plus long ou le plus risqué va à l'agent au modèle le plus capable.
6. Vérifiez qu'**aucun fichier n'apparaît dans deux lots**. S'il le faut, un fichier commun reste à l'intégrateur et les autres le lui demandent.
7. Fixez l'**ordre d'intégration** : d'abord les fichiers communs, puis les lots qui en dépendent le moins.

Les choix de découpage sont à vous (structure du code, dans un module). Écrivez-les dans `decisions.md`, § 2, marqués « *(coordinateur)* ».

## 3. Nommer les rôles et les modèles

- **Intégrateur** : de préférence l'agent qui a commencé la fonction ou qui tient déjà ses fichiers communs. Il doit pouvoir rester jusqu'à la fin.
- **Membres** : les autres. Une session Claude reçoit les messages directs ; elle convient au lot qui demandera le plus d'échanges.
- **Modèles** : tableau du § 8 de `docs/plan/equipe.md`. Dites au chef, en une ligne par agent, quel modèle choisir dans quel éditeur et pourquoi. Seul le chef change un modèle.

## 4. Écrire la fiche d'équipe

Un fichier `docs/plan/missions/<identifiant>-equipe.md`, à partir de `docs/plan/modeles/mission.md`, avec en plus :

- **l'équipe** : agent, rôle, lot, modèle, branche, dossier ;
- **les propriétaires** : un tableau « fichier ou dossier → propriétaire », complet ;
- **les rendez-vous** : R0 (départ par l'intégrateur), puis la fin de chaque lot, l'intégration et la relecture, avec une heure visée si le chef a donné un horaire ;
- **un prompt par agent**, qui cite la fiche, `docs/plan/equipe.md`, son lot, sa branche, son point de départ et le canal pour rendre compte.

Ajoutez une ligne par agent au tableau « Missions en cours » de `suivi.md`. Commitez la fiche, `suivi.md` et `decisions.md` sur votre branche de coordination.

## 5. Envoyer

Dans cet ordre :

1. **L'intégrateur d'abord**, avec la consigne de R0. Personne d'autre ne commence avant son rapport « R0 prêt, sha … ».
2. À R0, **chaque membre** reçoit son prompt avec le sha du point de départ :
   - session Claude ouverte : message direct (listez les sessions, puis écrivez à celle du projet) ;
   - Codex ou agent de Cursor : un fichier dans `..\travaux-planner\boites\<agent>\entree\`, puis dites au chef de leur écrire « lis ta boîte » ;
   - session Claude à ouvrir : donnez au chef le prompt à coller.
3. Dites au chef, en une liste courte, quoi coller ou dire à quel éditeur, et quel modèle y choisir.

Une session déjà occupée finit d'abord son étape et applique `fin-de-session`. Ne lui faites pas abandonner un travail non commité.

## 6. Suivre

À chaque passage :

- relevez les boîtes `sortie\` et vos messages, rangez ce qui est traité ;
- pour chaque lot, comparez les fichiers commités à la fiche : `git diff --name-only <départ>..<branche de lot>`. Un fichier en trop se signale tout de suite au membre ;
- relayez à l'intégrateur les demandes de fichiers communs ;
- répondez aux questions qui sont de votre ressort. Portez les autres au chef avec une proposition ;
- mettez à jour la colonne « Dernière relecture » de « Missions en cours ».

Un conflit de fusion signale un découpage faux : arrêtez l'intégration, corrigez la fiche, puis renvoyez les consignes.

## 7. Clore

1. L'intégrateur annonce la branche d'intégration complète, contrôles passés.
2. Appliquez `relecture-branche` à cette branche, avec le périmètre **réuni** de tous les lots.
3. Donnez au chef : le verdict, les commandes (une seule PR), et ce qui se débloque.
4. Fermez la fiche d'équipe, retirez les lignes de « Missions en cours », et dites aux membres de retirer leurs dossiers de lot (jonction `node_modules` d'abord).
5. Si une autre fonction suit le même soir, reprenez au § 1 avec la même équipe.

Terminez votre propre session par `fin-de-session`.
