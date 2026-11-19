# Session du 18 novembre 2026 · VIT-11 · Catalogue et FAQ

| | |
|---|---|
| Fait par | Codex |
| Chantier | VIT · condition 9 de la mise en ligne |
| Branche | `feat/vit-11-catalogue-faq` |
| Dossier de travail | `..\travaux-planner\vit-11-catalogue-faq` |

## Décisions et visas

La boîte Codex avait uniquement des messages déjà traités. La [PR #218](https://github.com/Claude20022002/Planner/pull/218) est ouverte à `0822c1a7`, sans commentaire ni avis au contrôle. Le [plan](../conception/vitrine/vit-11-catalogue-faq.md#4-bis-décisions-et-visas-relevés-le-18-novembre) consigne le classement par application et la précision sur StudyLib. Le détail des points 1 et 2, le point 3 et chacun des visas 4 à 10 restent à recueillir.

## Fusion et routes de VIT-10

`main` distant est à `48d65fd8` (fusion de VIT-07, #214). Aucune PR VIT-10 n’apparaît dans les recherches par branche et par titre. La branche locale VIT-10 à `37810eee` contient le plan et la fiche de session, sans modification de `vitrine/`.

Le plan VIT-10 propose `/<langue>/direction/`, `/<langue>/scolarite/`, `/<langue>/enseignants/` et `/<langue>/etudiants/`. Ces routes et leurs clés sont absentes de `main`. Les routes `/<langue>/fonctionnalites/` et `/<langue>/faq/` sont également absentes de `main` et de sa table `PAGES`. VIT-11 prévoit de passer par le coordinateur pour les clés et les liens. Le plan VIT-10 indique que le lien du catalogue sera ajouté plus tard et ne le réserve pas dans le menu. Le responsable et l’ordre d’ajout des clés et des liens sont à confirmer avec le coordinateur.

## État à reporter par le coordinateur

VIT-11 · PR #218 ouverte pour le plan. Code en attente du visa du chef sur le plan, des sept visas individuels de la FAQ et de la fusion de VIT-10. Aucun test applicatif lancé pendant cette reprise documentaire.

## Commande pour le chef

```powershell
git -C "..\travaux-planner\vit-11-catalogue-faq" push -u origin feat/vit-11-catalogue-faq
```

## Prompt de reprise

```text
Reprends VIT-11 sur feat/vit-11-catalogue-faq. Lis AGENTS.md, la boîte Codex,
le plan docs/conception/vitrine/vit-11-catalogue-faq.md et cette fiche.
Consigne les décisions restantes sur les points 1 à 3 et les visas individuels 4 à 10.
Vérifie la fusion de VIT-10 et ses routes sur main. Confirme avec le coordinateur
qui ajoute les clés et liens du catalogue et de la FAQ, et à quel moment.
Commence le code après validation du plan, visa de chaque réponse et fusion de VIT-10.
Respecte le périmètre de la mission. Le chef pousse la branche et fusionne la PR.
```
