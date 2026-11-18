# Session du 2026-11-18 · UIX-10 · `doc/uix-10-charte-commune`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session VS Code |
| Chantier | UIX, exception hors chantier accordée par le chef le 18 nov. |
| Dossier de travail | `..\travaux-planner\uix-10-charte` |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; plan : `30edc8af` |

## Objectif de la session

Écrire le plan d'UIX-10 : une charte commune à toutes les plateformes, tirée du site vitrine, et l'ordre d'adoption. Plan seulement, pas de code ([mission](../plan/missions/uix-10-charte-commune.md)).

## Plan

[docs/conception/interface/uix-10-charte-commune.md](../conception/interface/uix-10-charte-commune.md), **à valider par le chef**.

En bref : une source `shared/charte/jetons.json` ; un générateur sans dépendance (`generer.mjs`, avec `--verifier` en CI) qui écrit le `jetons.css` du site, un guide Markdown et un `charte.css` dans StudyLib et le quiz, protégé par une empreinte ; le web et le mobile lisent `shared/charte/index.js`. Sombre dérivé, accent « jeu » jaune, panneau gardé aux couleurs de la charte, choix de famille de thème retiré, couleurs de l'école prioritaires. Sept fonctions : UIX-10a (source) → 10b (web) → 10c (logos, attend les SVG) · 10d (mobile) · 10e (jeux) → 10f (StudyLib) · 10g (quiz, MPL 2.0).

## Fait

- `30edc8af` : plan de conception UIX-10, commité seul.
- `9ca3a860` : ligne UIX-10 dans `docs/plan/modules/UIX-interface.md`.
- Cette fiche.

## Vérifié

- Relevé des jetons du site (`vitrine/src/styles/jetons.css`) et de l'écart de chaque plateforme, en lecture seule : web (`ds`, `jetonsGestion`, `ThemeGestion`, thème StudyLib, panneau, marque mosaïque), mobile (`theme.js`, quatre thèmes), jeux web et mobile, `..\StudyLib` (branche `main`, `@theme` de Tailwind 4, 64 couleurs en dur distinctes, pas de sombre), `..\ClassQuiz` (branche `hestim`, `lib/hestim/theme.css`, Barlow chargée depuis Google Fonts).
- Contrastes calculés (formule WCAG de `shared/couleurs.js`) pour toutes les paires du plan, dont les jetons ajoutés : `trait-fort` #7D8A9C, `bleu-vif` #3B82D6, `jeu` #FFC83D, sombre dérivé. Une paire du site sous 4,5:1 relevée : `bleu` sur `bleu-pale` (4,16:1), non utilisée par les tests du site.
- `node scripts/verifier-neutre.mjs` : passe.
- Aucun test de code lancé : la session n'a écrit aucun code.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 8 | Logo, accent des jeux, guide, panneau, choix de famille, diffusion vers les dépôts voisins, sombre, couleurs de l'école | chef, 18 nov. : chaque proposition retenue (plan, § 3) | répondues |
| 9 | En-tête SPDX du `charte.css` du quiz recopié depuis `theme.css` du fork | à confirmer par le chef avec le plan | en attente |
| 10 | Inter servie par le quiz (`@fontsource-variable/inter` 5.3.0) au lieu de Barlow par Google Fonts | à confirmer par le chef avec le plan | en attente |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : UIX-10 → plan écrit sur `doc/uix-10-charte-commune` (`30edc8af`), à valider par le chef.
- `docs/plan/suivi.md` non modifié, comme le demande la mission.
- La ligne UIX-06a du fichier du module dit encore « PR #185 ouverte » alors qu'elle est fusionnée : hors de mon périmètre, signalé au coordinateur.

## Reste à faire, dans l'ordre

1. Le chef valide le plan (et les questions 9 et 10), puis la ligne « Validé » est remplie.
2. Le coordinateur inscrit UIX-10a à 10g dans `suivi.md` et écrit la mission d'UIX-10a.
3. UIX-10a, puis UIX-10b après #199 et UIX-09 ; ordre avec UIX-06c réglé par le coordinateur.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\uix-10-charte" push -u origin doc/uix-10-charte-commune
gh pr create --base main --head doc/uix-10-charte-commune --title "UIX-10 : plan de la charte commune à toutes les plateformes" --fill
```

## Prompt de reprise

```text
Tu reprends UIX-10 (charte commune à toutes les plateformes, d'après le site vitrine), exception hors chantier
accordée par le chef le 18 nov., sur la branche doc/uix-10-charte-commune, dans ..\travaux-planner\uix-10-charte.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la mission docs/plan/missions/uix-10-charte-commune.md,
le plan docs/conception/interface/uix-10-charte-commune.md et cette fiche (docs/sessions/2026-11-18-doc-uix-10-charte-commune.md).
Fait : relevé des jetons du site et de l'écart des cinq plateformes ; questions 1 à 8 répondues par le chef
(toutes les propositions retenues) ; plan commité (30edc8af), ligne du module (9ca3a860).
Reste : validation du plan par le chef, avec les questions 9 (en-tête SPDX du charte.css du quiz) et 10
(Inter servie par le quiz) ; ensuite seulement UIX-10a (shared/charte, générateur, contrôle de CI, guide).
Règles : pas de code hors du plan validé ; questions avant toute supposition ; StudyLib et ClassQuiz en lecture seule
tant que leur fonction n'est pas ouverte ; fiche de session à jour en fin de session ; suivi.md non modifié ; jamais de git push.
```
