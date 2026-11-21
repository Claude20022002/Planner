---
name: relecture-branche
description: Relire la branche d'un agent de Planner avant que le chef la pousse ou la fusionne. À utiliser quand un agent (Claude, Codex, agent de Cursor) dit avoir fini une fonction ou une étape, quand le chef demande si une branche ou une PR est prête, ou pendant le suivi d'une mission. Compare la branche à son plan validé et au périmètre de sa fiche de mission, vérifie la définition de « terminé » et les fichiers d'état, puis rend un verdict.
---

# Relecture d'une branche de Planner

Vous relisez le travail d'un autre agent. Vous ne corrigez pas sa branche : vous dites ce qui va, ce qui manque, et à qui cela revient. La seule exception est une faute dans `suivi.md` ou dans une fiche, que vous pouvez signaler avec le texte exact à mettre.

## 1. Ce qu'il faut avoir sous les yeux

```powershell
git fetch --quiet
git -C <dossier> status -s
git log --oneline origin/main..<branche>
git diff --stat origin/main...<branche>
git diff origin/main...<branche>
```

Et : la fiche de mission (`docs/plan/missions/<identifiant>.md`), le plan de conception validé, le critère de « terminé » dans le fichier du module, la fiche de session de la branche.

## 2. Les contrôles, dans l'ordre

| N° | Contrôle | Comment |
|---|---|---|
| 1 | **Une seule tâche** sur la branche, nommée `<type>/<identifiant>-<mot>` | titres des commits, fichiers touchés |
| 2 | **Le plan a été validé avant le code** | premier commit = le plan seul ; ligne « Validé » remplie, par le chef ou, pour S et M, par le coordinateur |
| 3 | **Périmètre** : chaque fichier modifié est dans le périmètre de la fiche de mission | `git diff --name-only origin/main...<branche>` comparé à la fiche ; tout fichier en dehors est nommé |
| 4 | **Le code suit le plan** | chaque étape du plan se retrouve dans le diff ; tout écart est écrit dans la fiche de session |
| 5 | **Critère de « terminé »** du module atteint | le relire phrase par phrase contre le diff et les tests |
| 6 | **Tests** : un test de régression par correctif ; les suites ont été lancées | chiffres dans la fiche de session ; relancer ce qui est court et qui touche le changement |
| 7 | **Règles de code** : fichiers de moins de 300 lignes (200 pour un contrôleur), commentaire de rôle en tête, noms en français, règle métier dans `services/` | lire les fichiers ajoutés ou allongés |
| 8 | **Migration** : numéro réservé dans `suivi.md`, « étendre puis contracter » | toute migration remonte au chef |
| 9 | **Rien de réel** : ni donnée personnelle, ni secret, ni nom d'école en dur | `node scripts/verifier-neutre.mjs`, et lecture du diff |
| 10 | **Sécurité** : le serveur ne croit pas le client, 404 hors de ses classes, pas de donnée d'élève envoyée à l'IA | lire les routes et contrôleurs touchés ; tout doute remonte au chef |
| 11 | **Fichiers d'état** : fichier du module, fiche de session avec l'état de la fonction, prompt de reprise et commandes pour le chef ; **`suivi.md` non modifié** par la branche (depuis le 18 nov.) | présents et vrais |
| 12 | **Rien de non commité** dans le dossier de travail | `git status -s` vide |

Ne lancez pas les parcours du site en même temps que la suite du serveur : ils tournent dans la CI de la PR.

Lisez le diff vous-même. Une fiche de session qui dit « tests verts » est une déclaration : dites dans votre verdict ce que vous avez relancé et ce que vous croyez sur parole.

## 3. Le verdict

Un seul des trois, en première ligne :

- **Prête pour la PR** : les douze contrôles passent. Vous donnez au chef les commandes de push et de PR.
- **À corriger** : la liste numérotée de ce qui manque, chaque point avec le fichier et la ligne, et ce qui est attendu. Elle part à l'agent (message direct pour une session Claude, texte à coller pour Codex ou l'agent de Cursor).
- **Au chef** : la branche contient une décision qui lui revient (produit, migration, sécurité, schéma partagé, sortie du périmètre non demandée). Vous lui présentez la question avec votre recommandation.

Écrivez ensuite la date et le verdict dans la colonne « Dernière relecture » du tableau « Missions en cours » de `suivi.md`, et dans la fiche de mission.

## 4. Après la PR

- CI rouge : `gh pr checks <n>`, lire le journal de l'échec, renvoyer à l'agent avec la sortie.
- CI verte et critère tenu : la PR entre dans l'ordre de fusion (skill `coordination`, § 6).
