# Session du 2026-11-18 · VIT-14 · `feat/vit-14-comparatif`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), nouvelle session ouverte par le chef |
| Chantier | VIT (condition 10 de la mise en ligne du site vitrine) |
| Dossier de travail | `..\travaux-planner\vit-14-comparatif` |
| Dernier commit | voir `git log -1` (cette fiche) ; plan : `592cb077` |

## Objectif de la session

Poser les questions au chef sur le comparatif « Pourquoi Planner » (approches, critères), puis écrire et commiter seul le plan court, avec le tableau complet et la source de chaque case Planner. Pas de code : il attend la fusion de #216 (VIT-08) et la validation du plan.

## Plan

[docs/conception/vitrine/vit-14-comparatif.md](../conception/vitrine/vit-14-comparatif.md), **à valider par le chef case par case**.

## Fait

- `592cb077` : le plan court. Quatre approches, six critères qui existent et une ligne « Notes, frais et familles » (« Bientôt » pour Planner). Tableau court sur l'accueil, avant « Bientôt », et page `/comparer/` avec un encadré de méthode. Chaque case Planner cite ses fichiers ; chaque case d'approche cite son étude, ou porte « à confirmer ».
- Branche et dossier créés depuis `origin/main` à `427afdea`.

## Vérifié

- Chaque chemin cité dans les cases Planner existe sur `427afdea` (25 fichiers vérifiés un à un).
- Les études citées ([01], [07], rapports et notes) sont identiques sur `origin/main` et sur la branche de coordination : les numéros de ligne tiennent.
- Lu dans le code : seul le terminal Linux a le mode collectif (`shared/jeux/catalogue.js` l. 17), et `jouerCommande` accepte une commande tapée par l'enseignant. Les dix simulations et le quiz demandent un appareil par élève. La question 5 a donc été reposée au chef.
- Aucun test lancé : aucun code dans cette session.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Approches comparées | les quatre de la fiche | répondu (chef) |
| 2 | Critères | six, seulement ce qui existe | répondu (chef) |
| 3 | Ce que les autres font et que Planner n'a pas | une ligne « Notes, frais et familles », « Bientôt » | répondu (chef) |
| 4 | L'accueil | tableau court, critères 1, 2, 4, 6 | répondu (chef) |
| 5 | Mot « Sans téléphone de l'élève » | « En grande partie » (après correction de l'agent) | répondu (chef) |
| 6 | Ton des cases d'approche | dire aussi ce qu'elles font bien, quand c'est vrai | répondu (chef) |
| 7 | Méthode sur `/comparer/` | un court encadré, sans lien vers le code | répondu (chef) |
| 8 | Place sur l'accueil | avant « Bientôt » | répondu (chef) |
| 9 | Chaque case du tableau (§ 4 du plan), et la ligne 7 sur l'accueil (§ 4 bis) | « Je valide le plan » : tableau tel qu'écrit, cases « à confirmer » gardées, ligne 7 sur l'accueil | répondu (chef), `61df2f9b` |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : VIT-14 → **plan validé par le chef le 18 nov.** (`592cb077`, validation `61df2f9b`) ; code après la fusion de #216 (encore ouverte le 18 nov. au soir).
- `docs/plan/suivi.md` et la ligne du module VIT ne sont pas touchés : VIT-14 n'est inscrite que sur la branche de coordination (#211), et l'y ajouter ici créerait un conflit.
- Le lien du plan vers la fiche de mission (`docs/plan/missions/vit-14-comparatif.md`) ne marche qu'après la fusion de #211.

## Reste à faire, dans l'ordre

1. ~~Validation du chef~~ : faite (`61df2f9b`).
2. Après la fusion de #216 : `git merge origin/main` dans la branche (la branche n'est pas poussée), puis le code du § 5 et les vérifications du § 6.
3. Fiche de session du code, et commandes au chef.

## Commandes pour le chef de projet

Rien à pousser avant la validation du plan, sauf si le chef veut la PR du plan :

```powershell
git -C "..\travaux-planner\vit-14-comparatif" push -u origin feat/vit-14-comparatif
gh pr create --base main --head feat/vit-14-comparatif --title "VIT-14 : comparatif par approche (plan)" --fill --draft
```

## Prompt de reprise

```text
Tu reprends VIT-14 (« Pourquoi Planner » en comparatif par approche, sur l'accueil et sur /comparer/)
du chantier VIT, sur la branche feat/vit-14-comparatif, dans le dossier ..\travaux-planner\vit-14-comparatif.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-5, EP-13, EP-18), docs/plan/suivi.md,
le plan docs/conception/vitrine/vit-14-comparatif.md et cette fiche
(docs/sessions/2026-11-18-feat-vit-14-comparatif.md).
Fait : questions au chef (8 réponses, dans le § 1 du plan) ; plan court commité (592cb077),
avec le tableau complet et la source de chaque case Planner ; plan validé par le chef le 18 nov.
(61df2f9b : tableau tel qu'écrit, cases « à confirmer » gardées, ligne 7 sur l'accueil,
date de la méthode 2026-11-18).
Reste : vérifier que #216 est fusionnée (gh pr view 216) ; git merge origin/main dans la branche ;
puis le code du § 5 et les vérifications du § 6.
Questions en attente : aucune.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; aucun produit nommé,
aucun prix, aucun chiffre inventé ; fiche de session à jour en fin de session, suivi.md non modifié ;
jamais de git push.
```
