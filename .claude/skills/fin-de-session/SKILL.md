---
name: fin-de-session
description: Clore une session de travail sur Planner selon AGENTS.md (points 9 à 12). À utiliser avant de rendre la main au chef, quand une fonction ou une étape est finie, quand la session est interrompue, quand la conversation a été résumée une fois, ou quand le chef dit « on s'arrête ». Commite le travail, met à jour suivi.md et le fichier du module, écrit la fiche de session avec son prompt de reprise, et donne au chef les commandes à lancer.
---

# Fin de session sur Planner

Obligatoire, même si la session est interrompue, même si elle n'a écrit aucun code. Une session sans fiche est perdue pour la suivante, et invisible pour le coordinateur.

## Les étapes, dans l'ordre

1. **Commiter le travail** sur la branche de la tâche, en local.
   - `git add <fichiers>`, jamais `git add .` ; un commit = une étape lisible ; message en français.
   - Un plan, même non validé, se commite s'il doit survivre à la session : dites « plan à valider » dans le message. Rien ne reste non commité dans le dossier de travail (`git status -s` vide).
   - Jamais de `git push`.

2. **`docs/plan/suivi.md`** : **ne le modifiez pas** sur la branche d'une fonction (décision du chef du 18 nov.). Écrivez l'état vrai de la fonction dans la fiche de session (« en cours » avec la branche, « PR ouverte » avec le numéro) : le coordinateur le reporte. Un numéro de migration se demande au coordinateur. Seule la session de coordination met `suivi.md` à jour, sur sa branche.

3. **Fichier du module** (`docs/plan/modules/…`) : seulement si ce qui existe a changé.

4. **Fiche de session** `docs/sessions/AAAA-MM-JJ-<branche, « / » remplacé par « - »>.md`, d'après `docs/plan/modeles/fiche-de-session.md`. Une fiche par session (`-2`, `-3` si plusieurs le même jour).
   - **Fait** : les commits, avec leur sha court.
   - **Vérifié** : ce qui a été lancé, avec les chiffres. Un échec se dit, avec sa sortie. Ce qui n'a pas été lancé se dit aussi.
   - **Écarts avec le plan** : chacun, avec sa raison.
   - **Questions** : celles qui attendent une réponse, et de qui.
   - **Reste à faire**, dans l'ordre.

5. **Prompt de reprise**, dans la fiche. Il se suffit à lui-même : quoi lire, où en est le travail, ce qui reste, les questions en attente, la règle « pas de code hors du plan validé ». Quelqu'un qui n'a jamais vu la conversation doit pouvoir reprendre.

6. **Commiter** le fichier du module et la fiche (et `suivi.md` seulement sur la branche de coordination).

7. **Dernier message au chef** : les commandes à lancer (push, PR), puis le prompt de reprise. Si une fiche de mission existe, dites aussi que la branche attend la relecture du coordinateur.

```powershell
git -C "..\travaux-planner\<nom>" push -u origin <branche>
gh pr create --base main --head <branche> --title "<IDENTIFIANT> : <titre>" --fill
```

## Contrôle avant de rendre la main

- `git -C <dossier> status -s` ne rend rien.
- `git log -1` montre le commit de la fiche.
- `node scripts/verifier-neutre.mjs` passe.
- La fiche ne contient ni adresse de serveur, ni secret, ni nom réel : le dépôt est public.

## Session trop longue

Dès que la conversation a été résumée une fois, qu'une autre fonction commencerait, ou qu'un fait établi se perd : finir l'étape, appliquer ce skill, puis proposer au chef `/compact` (même fonction, une seule fois) ou une nouvelle session ouverte avec le prompt de reprise. Seul le chef lance `/compact`.
