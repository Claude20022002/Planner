# Session du 2026-11-22 · MKT-09 · `mkt/mkt-09-presentation-produit` (2)

| | |
|---|---|
| Fait par | Claude (Opus 5.5) |
| Chantier | MKT |
| Dossier de travail | dépôt privé `planner-marketing`, branche `mkt/mkt-09-presentation-produit` ; cette fiche dans `..\travaux-planner\mkt-09-presentation-produit` |
| Dernier commit | `33ec18b` (planner-marketing) |

## Objectif de la session

Le chef a demandé de transformer la présentation illustrée (`8d3ce6c`) en une vraie présentation produit à envoyer à un client, en y ajoutant des éléments de la présentation v15 du partenaire commercial. Il a fixé le plan en 14 parties : contexte, problématique (problème identifié, mal ressenti, besoin), objectifs, état de l'art, comparaison et avantage concurrentiel, modèle économique, proposition de valeur, fonctionnalités, apport, utilisateurs finaux, bénéfices pour le client, pourquoi nous, exemple, conclusion. La présentation garde le thème du partenaire.

## Plan

Plan et choix donnés directement par le chef dans la session, sans document de conception. Réponses du chef, 22 novembre, après-midi :

- signature, équipe et contact du partenaire repris de la v15 ;
- captures ordinateur et téléphone de la v15, avec le nom de l'école d'origine masqué (remplacé par ORION) ;
- pilote d'un semestre « dont 3 mois offerts » et ses 4 critères, repris tel quel ;
- coûts des outils séparés présentés sans prix.

## Fait

Dans le dépôt privé `planner-marketing` :

- `45c7240` : présentation de 22 diapositives (14 parties, merci, 2 annexes, une note par diapositive), transcription, sources et index de la campagne. Générateur `generer-finadmin.cjs` et modules `finadmin/` ; script `preparer-finadmin.py`, qui extrait de la v15 le logo, les photos de l'équipe et les captures masquées.
- `33ec18b` : écarts avec la fiche de mission, tranchés par le chef, consignés dans `sources.md`.

Retiré de la v15, faute de preuve dans `product-context.md` : « Monde pro », cours hors ligne, « 12 règles », export de paie limité aux séances validées, chiffres d'usage attribués à une école nommée. Les chiffres 2 620 séances, 90 s et 0 conflit sont présentés comme ceux du semestre de démonstration.

## Vérifié

- `validate.py` du skill pptx : toutes les validations passent. Les entrées de dossier vides de l'archive sont retirées par le générateur.
- PowerPoint ouvre le fichier (22 diapositives). Les 22 vues ont été exportées en PNG et relues. Les débordements trouvés (titres trop longs, chevrons hors marge, légende sous le téléphone) ont été corrigés, puis les vues revues.
- Recherche dans le texte des diapositives : aucune occurrence du nom de l'école d'origine ni du nom d'enseignant masqué.
- Pas fait : revue `creative-quality-review` du dépôt marketing ; recette sur une instance de démonstration connectée.

## Écarts avec la fiche de mission

La fiche de mission (réponses du chef de 11 h) demande un champ Contact vide, aucun concurrent et aucun pays sur une diapositive. Le chef a tranché dans l'après-midi pour cette version :

- contact du partenaire affiché ;
- noms d'outils concurrents gardés sur les diapositives 3 et 7 ;
- logo, indicatif téléphonique et mots-clés de l'équipe gardés, parce qu'ils décrivent le partenaire et pas un marché visé.

Rien n'est annoncé « Disponible » au-delà du code : l'appel hors ligne et la liste d'appel imprimable sont « En préparation » en annexe.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Créer un dépôt distant privé pour `planner-marketing` (aucun dépôt distant aujourd'hui) ? | — | au chef |
| 2 | Les membres de l'équipe du partenaire acceptent-ils que leurs photos circulent chez un client ? | — | au chef |
| 3 | Garder ou retirer les notes du présentateur dans le fichier envoyé ? | — | au chef |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : MKT-09 → présentation à envoyer livrée en local (`33ec18b`), en attente du dépôt distant et de la relecture du coordinateur.
- Seule cette session écrit sur la branche marketing (Codex arrêté à `8d3ce6c`).

## Reste à faire, dans l'ordre

1. Le chef répond aux questions 1 à 3.
2. Le coordinateur relit la branche marketing.
3. Revue `creative-quality-review`, puis envoi au client par le chef.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\mkt-09-presentation-produit" push -u origin mkt/mkt-09-presentation-produit
```

`planner-marketing` n'a pas de dépôt distant : il ne peut pas être poussé tant que le chef n'en a pas créé un, privé.

## Prompt de reprise

```text
Tu reprends MKT-09 (présentation produit) du chantier MKT.
La présentation vit dans le dépôt privé planner-marketing, branche mkt/mkt-09-presentation-produit,
dernier commit 33ec18b. Les fiches sont sur la même branche du dépôt Planner,
dossier ..\travaux-planner\mkt-09-presentation-produit.
Lis d'abord AGENTS.md, la fiche de mission docs/plan/missions/mkt-09-presentation-produit.md
(branche doc/coordination-equipe), cette fiche, puis dans planner-marketing :
marketing/campaigns/2026-11-22-presentation-produit/04-production/commercial/sources.md.
Fait : 22 diapositives aux couleurs du partenaire, plan en 14 parties du chef, générées par
marketing/templates/sources-presentation-produit/superieur-prive/generer-finadmin.cjs
(préparer d'abord les visuels avec preparer-finadmin.py et la v15).
Écarts avec la mission (contact, concurrents, pays) : tranchés par le chef, consignés dans sources.md.
Reste : réponses du chef (dépôt distant privé, accord de l'équipe sur les photos, notes du présentateur),
relecture du coordinateur, revue creative-quality-review.
Règles : aucun fait hors de product-context.md ; questions avant toute supposition ;
fiche de session en fin de session, suivi.md non modifié ; jamais de git push.
```
