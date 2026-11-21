# Session du 18 novembre 2026 · VIT-11 · Validation du catalogue et de la FAQ

| | |
|---|---|
| Fait par | Codex |
| Chantier | VIT · condition 9 de la mise en ligne |
| Branche | `feat/vit-11-catalogue-faq` |
| Dossier de travail | `..\travaux-planner\vit-11-catalogue-faq` |

## Plan validé

Le coordinateur a relayé à 20 h les décisions du chef sur les points 1 et 2 et ses visas individuels sur les sept réponses 4 à 10. Il a validé la méthode du point 3. Le commit `73c486ea` contient uniquement la mise à jour du [plan](../conception/vitrine/vit-11-catalogue-faq.md). Une fois VIT-10 fusionné, VIT-11 ajoute lui-même les deux clés dans `langues.js` et les liens dans `EnTete.astro` et `PiedDePage.astro`.

## Vérifications

Sur `631975af`, les sources de l’application mobile confirment la semaine, le scan du QR code d’appel et l’onglet Bibliothèque. Les sources web confirment l’emploi du temps étudiant et la Bibliothèque dans le navigateur ainsi que l’appel à la main côté enseignant. Le plan cite les fichiers pour chaque parcours. Aucun test applicatif n’a été lancé pendant cette étape documentaire.

`main` distant est à `631975af` (VIT-07, PR #217). Aucune PR VIT-10 n’a été trouvée. Les quatre routes par rôle et les clés du catalogue et de la FAQ sont absentes de ce commit.

## État à reporter par le coordinateur

VIT-11 · plan et FAQ validés, PR de plan #218 à mettre à jour. Le code attend la fusion de VIT-10. QJE-03 (plan) suit dans la file, dans une autre session et sur sa propre branche.

## Commande pour le chef

```powershell
git -C "..\travaux-planner\vit-11-catalogue-faq" push -u origin feat/vit-11-catalogue-faq
```

## Prompt de reprise

```text
Reprends VIT-11 sur feat/vit-11-catalogue-faq. Lis la boîte Codex,
le plan validé dans 73c486ea et la fiche de reprise du 18 novembre (-4).
Vérifie la fusion de VIT-10 et les quatre routes par rôle sur main.
Après la fusion, actualise la branche et implémente le plan validé.
Ajoute uniquement les clés et les liens du catalogue et de la FAQ dans
langues.js, EnTete.astro et PiedDePage.astro, selon le périmètre convenu.
Le chef pousse la branche et fusionne la PR.
```
