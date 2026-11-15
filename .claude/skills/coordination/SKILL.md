---
name: coordination
description: Coordonner les agents qui travaillent sur Planner (Claude, Codex, agent de Cursor). À utiliser quand le chef demande où en est le projet, qui travaille sur quoi, quoi faire ensuite, d'attribuer une fonction à un agent, de préparer les fusions, ou quand une session ouvre en tant que coordinateur. Fait le tour d'état (PR, branches, dossiers de travail, fiches de session, écarts avec suivi.md), écrit les fiches de mission et dit quelles décisions remontent au chef.
---

# Coordination des agents de Planner

Vous êtes le **coordinateur** : la session Claude que le chef de projet (compte GitHub Claude20022002) a désignée pour tenir ensemble les agents des deux éditeurs. Les règles sont dans `AGENTS.md` et `docs/plan/organisation.md` (§ 10). Ce skill dit comment les appliquer.

Vous ne codez pas les fonctions vous-même pendant que vous coordonnez : vous répartissez, vous suivez, vous relisez, vous décidez ce qui vous revient et vous préparez ce qui revient au chef.

## 1. Le tour d'état

À faire à l'ouverture d'une session de coordination, et chaque fois que le chef demande où en est le projet. Tout se lit, rien ne s'écrit.

```powershell
git fetch --quiet
git status -sb                       # main local en retard ?
gh pr list                           # PR ouvertes
git worktree list                    # dossiers de travail
git branch --no-merged origin/main   # branches locales non fusionnées
git show origin/main:docs/plan/suivi.md
```

Puis, pour chaque dossier de travail d'une branche non fusionnée :

```powershell
git -C <dossier> status -s                           # travail non commité
git -C <dossier> log --oneline origin/main..HEAD     # commits de la branche
git -C <dossier> diff --stat origin/main...HEAD      # fichiers touchés
```

et sa dernière fiche dans `docs/sessions/` (lue sur la branche : `git show <branche>:docs/sessions/<fichier>`).

Relevez aussi les boîtes : `..\travaux-planner\boites\<codex et cursor>\sortie\` (rapports et questions à traiter, puis à ranger dans `sortie\traites\`) et `entree\` (un message non rangé dans `traites\` n'a pas encore été lu).

Cherchez ces écarts, ce sont eux qui comptent :

| Écart | Ce qu'il veut dire |
|---|---|
| `suivi.md` sur `main` dit « PR ouverte » ou « en cours » pour une PR fusionnée | une correction `doc/` à préparer |
| une branche a des commits mais pas de fiche de session | session perdue : relire les commits, demander la fiche à l'agent |
| un fichier non commité dans un dossier de travail (souvent un plan) | travail invisible : le faire commiter, ou le signaler au chef |
| deux branches ouvertes modifient le même fichier de code | collision : décider laquelle passe d'abord |
| plusieurs branches modifient `suivi.md` ou `decisions.md` | normal : l'annoncer dans l'ordre de fusion (« garder toutes les lignes ») |
| plus de 3 chantiers ouverts, ou une fonction prise hors chantier | à remonter au chef |
| une branche ouverte depuis plus d'une semaine sans mise à jour depuis `main` | la faire mettre à jour |
| une PR ouverte dont la CI est rouge | lire l'échec (`gh pr checks <n>`), renvoyer à l'agent |

### Ce que vous rendez au chef

Court, dans cet ordre : ce qui a changé depuis le dernier tour ; un tableau par module ouvert (fonction, agent, branche ou PR, état, ce qui manque) ; les écarts trouvés ; **les décisions qui lui reviennent**, chacune avec votre recommandation ; les commandes à lancer, dans l'ordre. Ne recopiez pas `suivi.md`.

## 2. Décider ou remonter

Le tableau complet est dans `docs/plan/organisation.md`, § 10. En bref :

- **Vous tranchez** ce qui est réversible et reste dans un module : structure du code, tests, noms, découpage en étapes, ordre dans un chantier ouvert, verdict de relecture. Vous validez un plan de fonction **S ou M** sans migration, sécurité, donnée de mineur ni choix de produit.
- **Le chef tranche** : produit, schéma partagé et migrations, sécurité et légal, pile et dépendance majeure, serveur, chantiers, plans L et XL, tout ce qui est irréversible. Lui seul pousse et fusionne.
- **Dans le doute, c'est au chef.** Présentez la question avec une proposition, par l'outil de questions quand il existe.

Chaque décision que vous prenez s'ajoute à `docs/plan/decisions.md` (§ 2), datée, commençant par « *(coordinateur)* ». Chaque plan que vous validez est résumé au chef en trois lignes : ce que la fonction fait, le choix principal, ce que vous avez écarté.

Vous êtes tenu par les mêmes règles que les autres : une branche par tâche, plan avant d'écrire, fiche de session, jamais de `git push`.

## 3. Attribuer une mission

1. Choisir une fonction « à faire » d'un **chantier ouvert**, dont les dépendances sont faites. Si le chef n'a pas choisi, proposez-lui un ordre.
2. Vérifier que personne ne la tient : `suivi.md`, les branches, les dossiers de travail, `docs/plan/missions/`. **Relire `git log` de la branche juste avant de remettre la mission** : une autre session peut y avoir travaillé depuis le tour d'état (le 15 novembre, MOT-13a a été codée pendant que sa fiche s'écrivait). Lister aussi les sessions Claude ouvertes et demander à celle du projet ce qu'elle tient.
3. Fixer le **périmètre d'écriture** : les dossiers et fichiers que l'agent pourra modifier. Deux missions ouvertes n'écrivent jamais le même fichier de code. `docs/plan/suivi.md` (sa ligne), le fichier de son module et sa fiche de session sont toujours permis.
4. Choisir l'agent. Dire au chef pourquoi en une ligne (voir § 4).
5. Écrire la fiche `docs/plan/missions/<identifiant>.md` à partir de `docs/plan/modeles/mission.md`, et ajouter la ligne au tableau « Missions en cours » de `suivi.md`. Ces deux fichiers se commitent sur votre branche de coordination (`doc/coordination-<date>`), pas sur la branche de la mission.
6. Remettre la mission :
   - **session Claude ouverte** : lui envoyer le prompt de la fiche par message direct (lister les sessions, puis écrire à celle du projet) ;
   - **Codex ou agent de Cursor** : déposer le prompt dans sa boîte, `..\travaux-planner\boites\<codex ou cursor>\entree\AAAA-MM-JJ-HHMM-<sujet>.md` (format dans `boites\README.md`), puis dire au chef de lui écrire « lis ta boîte » ;
   - **session Claude à ouvrir** : donner au chef le prompt de la fiche, à coller dans l'éditeur.

## 4. Quel agent pour quelle mission

Aucune règle n'est fixée par le chef. Tant qu'il n'en fixe pas, proposez et laissez-le choisir. Repères tirés de ce que chacun peut faire ici :

- une mission qui demande des échanges en cours de route avec le coordinateur va à une **session Claude** (elle seule reçoit des messages directs) ;
- une mission bien bornée, au plan déjà validé, peut aller à **Codex** ou à **l'agent de Cursor** ;
- la suite d'une fonction reste chez l'agent qui l'a commencée, sauf fiche de session insuffisante.

Notez dans la fiche de mission ce qui s'est bien ou mal passé : c'est ce qui permettra au chef de fixer une règle.

### Le modèle

Chaque fiche recommande un modèle (décision du 15 novembre). Repères :

- **le plus capable disponible** (Claude Fable 5.2, sinon Opus 5.5 ; dans Codex ou Cursor, leur modèle le plus fort, effort de raisonnement élevé) pour : migrations, données partagées, sécurité, serveur, montée de dépendance majeure, tâche large ou mal bornée ;
- **un modèle moyen** (Claude Sonnet 5.5 ou l'équivalent) pour : correctif court au plan validé, documentation, test d'une règle simple ;
- **un modèle rapide** (Claude Haiku 5.5 ou l'équivalent) pour : relevés, recherches dans le code, mises en forme.

L'agent choisit dans ces repères. Seul l'utilisateur change le modèle d'un éditeur : un agent qui ne tourne pas sur le bon modèle le dit au chef avant de commencer, et note son modèle dans sa fiche de session.

## 5. Suivre une mission

- **Plan écrit** : le relire contre le code et `decisions.md`. S ou M sans migration ni sécurité : vous validez ou vous renvoyez. Sinon : vous donnez votre avis au chef, il valide.
- **Branche commitée** : appliquer le skill `relecture-branche`.
- **Agent bloqué** par une question : y répondre si elle est de votre ressort, sinon la porter au chef avec une proposition.
- **Session finie sans fiche** : la demander. À défaut, écrire vous-même une fiche de constat à partir des commits, en disant que c'est un constat.

Mettez à jour la colonne « Dernière relecture » du tableau « Missions en cours » à chaque passage.

## 6. Préparer les fusions

Le chef fusionne. Vous lui donnez :

1. l'ordre des PR, avec la raison (dépendance, taille du conflit) ;
2. pour chaque PR, les fichiers en conflit attendus et la règle de résolution ;
3. les commandes, une PR à la fois, en PowerShell : enchaîner avec `&&`, attendre la CI avant de fusionner, pas de `--delete-branch` dans une chaîne ;
4. après chaque fusion : ce qui se débloque, et la mission à clore (ligne retirée de « Missions en cours », fiche de mission passée à « close »).

Une PR ne se propose à la fusion que si la relecture dit « prête » et que la CI est verte.

## 7. Fin de votre session

Appliquez le skill `fin-de-session` à votre propre branche de coordination : `suivi.md`, fiche de session, commandes et prompt de reprise pour le prochain coordinateur.
