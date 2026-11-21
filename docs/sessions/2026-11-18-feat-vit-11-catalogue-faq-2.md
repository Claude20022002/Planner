# Session du 18 novembre 2026 · VIT-11 · Catalogue et FAQ

| | |
|---|---|
| Fait par | Codex |
| Chantier | VIT · condition 9 de la mise en ligne |
| Branche | `feat/vit-11-catalogue-faq` |
| Dossier de travail | `..\travaux-planner\vit-11-catalogue-faq` |

## Travail et vérifications

Relecture de la boîte Codex, de la fiche de mission et du [plan de conception](../conception/vitrine/vit-11-catalogue-faq.md). La [PR du plan](https://github.com/Claude20022002/Planner/pull/218) est ouverte à `36295318`. Elle ne comporte encore aucun avis ni commentaire.

Le chef a décidé le 18 novembre que chaque entrée porte sa clé d’application, issue de `frontend/src/i18n/applications.fr.js`. Le catalogue regroupe les fonctionnalités par application, le test contrôle les clés et VIT-09 ajoute les icônes. Les deux adresses et les détails du regroupement restent soumis à la validation du plan.

Le plan recense les fonctions de StudyLib et leurs sources au commit `a8349801f351e884cc9e2877a649b51825f7ff50`. Le périmètre à afficher sous Bibliothèque, l’offre par familles, l’offre autonome et le contrôle des preuves dans un clone épinglé restent des propositions. L’offre autonome doit tenir compte de l’identité Planner, du référentiel, de l’isolation par établissement et des liens avec les cours.

GitHub indique `48d65fd8` en tête de `main` (fusion de VIT-07, PR #214) et aucune PR pour la branche exacte de VIT-10. Sa fiche de session locale indique que son plan attend quatre réponses du chef. Aucun code ni test pour VIT-11 pendant cette reprise.

## Validations du chef

| N° du plan | Sujet | État |
|---|---|---|
| 1 | Catalogue, regroupement et adresses | Regroupement par application décidé. Adresses et détails du plan à valider. |
| 2 | Périmètre public et offres StudyLib | En attente. |
| 3 | Vérification des sources StudyLib | En attente. |
| 4 | FAQ · Hébergement des données | En attente. |
| 5 | FAQ · Langues | En attente. |
| 6 | FAQ · Import CSV | En attente. |
| 7 | FAQ · Application mobile | En attente. |
| 8 | FAQ · IA activée par l’école | En attente. |
| 9 | FAQ · StudyLib séparément | En attente. |
| 10 | FAQ · Prix et contact | En attente. |

## État laissé

VIT-11 attend la validation du plan et de chaque réponse de FAQ, ainsi que la fusion de VIT-10. Le coordinateur reporte cet état dans `suivi.md` conformément au périmètre de la mission.

## Commande pour le chef

La PR #218 est ouverte. Depuis le dépôt principal, la fiche peut être publiée sur la même branche.

```powershell
git -C "..\travaux-planner\vit-11-catalogue-faq" push -u origin feat/vit-11-catalogue-faq
```

## Prompt de reprise

```text
Reprends VIT-11 sur feat/vit-11-catalogue-faq. Lis AGENTS.md, la boîte Codex,
docs/conception/vitrine/vit-11-catalogue-faq.md et la fiche de reprise du 18 novembre (-2).
Consigne les décisions du chef sur les points 1 à 3 et les validations individuelles des
réponses 4 à 10. Vérifie la fusion de VIT-10 sur main et les routes qu’il fournit.
Commence le code lorsque le plan et les réponses sont validés et VIT-10 est fusionné.
Respecte le périmètre de la mission. Le push est réservé au chef.
```
