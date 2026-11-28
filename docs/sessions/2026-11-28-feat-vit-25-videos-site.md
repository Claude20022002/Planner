# Session du 2026-11-28 · VIT-25 · `feat/vit-25-videos-site`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), sous-agent du coordinateur |
| Chantier | VIT, hors chantier (demande du chef du 27 nov., élargie le 28 nov.) |
| Dossier de travail | `..\travaux-planner\vit-25-videos-site` |
| Dernier commit | voir `git log -1` (le plan : `0a5ce400`) |

## Objectif de la session

Étape 1 de VIT-25 : le plan de la page de présentation par module (blocs « une action, une boucle », guide pas à pas, FAQ, appel final), Présences en page pilote, et une boucle d'essai hors dépôt. Aucun code dans le dépôt.

## Plan

[docs/conception/vitrine/vit-25-videos-site.md](../conception/vitrine/vit-25-videos-site.md), **en attente du chef** (16 questions, § 3).

## Fait

- `0a5ce400` : le plan, seul (gabarit en neuf sections, points d'accroche pour VIT-24, Présences entièrement écrite et sourcée en FR et EN, actions et étapes des trois autres modules, technique, poids, lots, tests, questions).
- Boucle d'essai **hors dépôt** : `..\travaux-planner\captures-vit-25\index.html` (planche), `rendu\presences-main-fr.mp4` (42 Ko), `.webm` (75 Ko), `.gif` (273 Ko, pour comparer), `.webp` (image d'attente, 28 Ko) ; sources `boucle-essai\src\` (Remotion du dépôt par une jonction vers `docs\presentation\video\node_modules`). Dessinée d'après l'écran réel : la démonstration neutre n'a pas été lancée.

## Vérifié

- `node scripts/verifier-neutre.mjs` : vert.
- Build du site (`npx astro build`, 43 pages) et poids EP-19 relevés : Présences 80,5 Ko, Emploi du temps 83,3, Espace de cours 78,7, Annonces et messages 78,5, accueil 134,4.
- Chaque phrase de Présences relue contre le code (fichiers et lignes dans le plan). Une erreur trouvée et corrigée dans l'essai : un étudiant scanné puis mis en retard garde « QR scanné » (`backend/services/presences/statuts.js`, l. 34).

## Questions

Les 16 questions du § 3 du plan, au chef. Les plus structurantes : 1 (vidéo MP4, jamais de GIF), 4 (captures réelles composées dans Remotion), 6 (ce que compte EP-19), 9 (ordre avec VIT-24 : points d'accroche posés par VIT-24), 11 (textes de Présences à viser).

## Signalé au coordinateur (hors périmètre)

- `appel.bilan` (`frontend/src/i18n/fr.js`, l. 437, et `en.js`) n'a pas de forme au pluriel : « 1 absents » à l'écran. Un correctif `fix/` à part.
- Pour la fiche de VIT-24 (Codex), si l'option A de la question 9 est retenue : trois emplacements nommés dans `PageModule.astro` (`actions`, `guide`, `faq`) et une propriété `guide` dans `EnTeteModule.astro` (second bouton vers `#guide`), § 4.1 du plan.

## État laissé

- Lignes de `suivi.md` à changer (le coordinateur les reporte) :
  - **VIT-25** → « plan écrit, au chef » ; branche `feat/vit-25-videos-site` (plan `0a5ce400`) ; boucle d'essai `..\travaux-planner\captures-vit-25\` ; ordre : après VIT-24, Présences d'abord (lot 1), puis Emploi du temps, Espace de cours, Annonces et messages ; Quiz et Jeux après QJE-17.
  - **VIT-09b** → ajouter : « ses captures et son script de capture repris par VIT-25 (lot 0) ; dessins, grille des apps et page Application restent à VIT-09b ».
  - **VIT-24** → ajouter, si l'option A est retenue : « pose les points d'accroche de VIT-25 (plan VIT-25, § 4.1) ».
- Rien n'est poussé.

## Reste à faire, dans l'ordre

1. Visa du chef sur le plan (questions du § 3, textes du § 4.3 à 4.6) ; reporter les réponses dans le plan, commit.
2. VIT-24 fusionnée (avec les points d'accroche, option A).
3. Lot 0 (`feat/vit-25a-gabarit`) : gabarit, outillage de capture et de rendu, tests.
4. Lot 1 (`feat/vit-25b-presences`) : captures montrées au chef, boucles en aperçu, visa, puis la page.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vit-25-videos-site" push -u origin feat/vit-25-videos-site
gh pr create --draft --base main --head feat/vit-25-videos-site --title "VIT-25 : plan de la page de présentation par module (boucles, guide, FAQ)" --fill
```

Voir la boucle d'essai : ouvrir `..\travaux-planner\captures-vit-25\index.html` dans un navigateur.

## Prompt de reprise

```text
Tu reprends VIT-25 (une page de présentation par module : boucles animées, guide pas à pas, FAQ) du module VIT,
hors chantier, sur la branche feat/vit-25-videos-site, dans le dossier ..\travaux-planner\vit-25-videos-site.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la fiche docs/plan/missions/vit-25-videos-site.md,
la conception docs/conception/vitrine/vit-25-videos-site.md et cette fiche (docs/sessions/2026-11-28-feat-vit-25-videos-site.md).
Fait : le plan (0a5ce400), Présences entièrement écrite et sourcée ; boucle d'essai hors dépôt dans ..\travaux-planner\captures-vit-25\.
Reste : reporter les réponses du chef aux 16 questions du § 3 ; après la fusion de VIT-24, le lot 0 (gabarit et outillage), puis le lot 1 (Présences).
Questions en attente : les 16 du § 3 du plan.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; données fictives seulement ;
chaque capture et chaque scène vues par le chef avant leur commit ; fiche de session à jour, suivi.md non modifié ; jamais de git push.
```
