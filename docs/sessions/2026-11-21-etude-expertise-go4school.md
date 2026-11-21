# Session du 2026-11-21 · expertise du site de Go4School · `etude/expertise-go4school`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), la session de l'expertise du site de Planner et de VIT-18 |
| Chantier | étude de marché, hors chantier (demande directe du chef) ; aucun code |
| Dossier de travail | `..\travaux-planner\expertise-go4school` |
| Dernier commit | voir `git log -1` sur la branche (l'étude et cette fiche) |

## Objectif de la session

Le chef a demandé : « Fais une expertise de ce site https://www.go4school.net/fr#plateforme ». L'étude juge le site public d'un concurrent, avec la méthode de l'[expertise du site de Planner](../etude-marche/12-expertise-site-vitrine.md), et dit ce que Planner peut en tirer.

## Plan

Pas de plan de conception : étude sans code. Livrable : [docs/etude-marche/13-expertise-go4school.md](../etude-marche/13-expertise-go4school.md).

## Fait

- Neuf pages relevées (texte, titres, liens, formulaires, domaines appelés, cookies) ; `robots.txt` et plan du site.
- axe-core 4.10.3 sur six pages en 390 et 1440 px (12 passages) ; captures pleine page.
- Lighthouse 12.8.2 : trois pages sur téléphone, l'accueil sur ordinateur.
- En-têtes HTTP des fichiers (compression, cache) avec `curl`.
- Étude écrite : six notes (objectifs et conversion 9, promesses 6, design 8, qualité mesurée 3, confidentialité 5, positionnement 8), comparaison avec Planner, leçons pour le site et le produit, trois questions au chef.

## Vérifié

- Aucun formulaire rempli, aucun compte créé, bandeau de cookies laissé sans choix : aucune donnée envoyée au concurrent.
- Deux relevés corrigés avant d'écrire :
  - les adresses e-mail « [email protected] » de la page Contact s'affichent bien à l'écran (relevé pris avant leur décodage) : ce n'est pas un défaut ;
  - sur téléphone, Lighthouse a reçu les scripts sans compression ; les poids réels viennent de la mesure sur ordinateur (1,7 Mo de scripts compressés et une vidéo de 3,7 Mo).
- Captures et rapports gardés hors du dépôt, dans le dossier temporaire de la session.

## Questions

| N° | Question | Proposition | État |
|---|---|---|---|
| 1 | Ajouter Go4School à `01-concurrents.md` et au comparatif avec OpenEduCat ? | oui, une ligne avec le lien vers l'étude, inscrite par le coordinateur | au chef |
| 2 | Essayer le produit (démonstration) ? | non sans ton accord, et seulement sous notre vrai nom | au chef |
| 3 | L'étude EP-18 compare-t-elle le hors ligne de Planner à ce que Go4School annonce ? | oui, comme repère du marché | au chef |

## État laissé

- Étude rendue, sur `etude/expertise-go4school`, à pousser par le chef. `suivi.md` n'est pas modifié.
- VIT-18 (`fix/vit-18-textes-exacts`) : #224 est maintenant fusionnée sur `main` ; l'intégration de `main` dans VIT-18 reste à faire (fiche de VIT-18).

## Reste à faire, dans l'ordre

1. Le chef répond aux trois questions du § 9 de l'étude.
2. Le coordinateur reporte les leçons L1 à L7 dans les fiches concernées (VIT-09b, VIT-10b, VIT-14, VIT-15, VIT-16), s'il les retient.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\expertise-go4school" push -u origin etude/expertise-go4school
gh pr create --base main --head etude/expertise-go4school --title "Étude : expertise du site de Go4School" --fill
```

## Prompt de reprise

```text
Tu reprends l'expertise du site de Go4School, sur la branche etude/expertise-go4school,
dans le dossier ..\travaux-planner\expertise-go4school.
Lis d'abord AGENTS.md, docs/plan/README.md, l'étude docs/etude-marche/13-expertise-go4school.md
et cette fiche (docs/sessions/2026-11-21-etude-expertise-go4school.md).
Fait : site visité le 21 nov. (9 pages relevées, axe-core 12 passages, Lighthouse 4 rapports), étude écrite.
Reste : les réponses du chef aux trois questions du § 9.
Règles : aucun code ; aucune donnée envoyée au concurrent ; suivi.md non modifié ; jamais de git push.
```
