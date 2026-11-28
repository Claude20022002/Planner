# Session du 28 novembre 2026 · VIT-25 · CI après publication de la fiche -4

| | |
|---|---|
| Fait par | Codex |
| Chantier | VIT |
| Dossier de travail | ..\travaux-planner\vit-25-integration-boucles |
| Tête vérifiée sur GitHub | 507d7135b6a093f24f462eeb79d5fc64f9b20354 |

## Objectif

Reprendre le contrôle de la fusion de #295 et de la base de #298 à partir de la [fiche -4](2026-11-28-feat-vit-25-integration-boucles-4.md).

## Vérifié

L’API GitHub donne [#295](https://github.com/Claude20022002/Planner/pull/295) ouverte, avec merged=false et merged_at=null. La route de vérification de fusion renvoie HTTP 404. Le SHA 05ce1f41bced9c0311376deb6cb8ef16b8e063fa est celui de la fusion de test. La comparaison avec un SHA de fusion effectif attend donc la fusion par le chef.

Les deux nouvelles exécutions de [#298](https://github.com/Claude20022002/Planner/pull/298) ont démarré à 16 h 29 min 02 s à Casablanca. Les métadonnées de la première tentative de chacune donnent la base main exacte 5df392832888ffb3e5023e39b039993de81e90ed. Ce SHA est aussi le premier parent de la fusion de test fbf0b58021c96d8fe87dcc2b6df40d143545f152 de #298. Git confirme que la tête e837f780 de #295 est absente de l’historique de cette base.

- [CI générale 46160088624](https://github.com/Claude20022002/Planner/actions/runs/46160088624) réussie. Les sept tâches de contrôle ont réussi. La publication des images a été ignorée.
- [Site vitrine 46160088648](https://github.com/Claude20022002/Planner/actions/runs/46160088648) réussi. La construction a réussi et la publication Docker Hub a été ignorée.
- Sur les exécutions de 16 h 11 déjà consignées dans la fiche -4, la [CI générale](https://github.com/Claude20022002/Planner/actions/runs/46158522768) a finalement été annulée et le [site vitrine](https://github.com/Claude20022002/Planner/actions/runs/46158522726) a réussi.

## État laissé

VIT-25 est en PR. Il reste à relever le commit de fusion de #295 et à vérifier l’ascendance sur la base exacte de chaque exécution de #298 déclenchée après cette fusion.

## Commandes pour le chef de projet

Après la fusion de #295, publier la fiche pour déclencher les workflows sur la nouvelle base.

~~~powershell
git -C "..\travaux-planner\vit-25-integration-boucles" push origin feat/vit-25-integration-boucles
gh pr checks 298 --repo Claude20022002/Planner --watch
~~~

## Prompt de reprise

Reprends feat/vit-25-integration-boucles et lis la fiche 2026-11-28-feat-vit-25-integration-boucles-5.md.
Relève le SHA de fusion effectif de #295. Pour chaque nouvelle exécution de #298, vérifie qu’il est égal ou ancêtre du SHA de base exact enregistré pour cette exécution. Relève ensuite les conclusions de la CI générale et du site vitrine.
