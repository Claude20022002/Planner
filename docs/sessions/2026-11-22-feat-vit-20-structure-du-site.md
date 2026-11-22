# Session du 2026-11-22 · VIT-20 · `feat/vit-20-structure-du-site`

| | |
|---|---|
| Fait par | Claude Code (Sonnet 5.5), agent autonome, lots R0, B, A et C |
| Chantier | VIT |
| Dossier de travail | dépôt principal (`..\travaux-planner` non créé : session autonome) |
| Dernier commit | voir la fin de la fiche |

## Objectif de la session

Lots R0, B, A et C du [plan VIT-20 v2](../conception/vitrine/vit-20-structure-du-site.md) (lu sur `origin/doc/coordination-2026-11-22`,
pas encore sur `main`). Le lot D est laissé : sa place est vide dans `PageModule.astro`.

## Plan

Le plan est validé par le chef. Avant chaque étape, ce que je vais faire :

- **R0** : `donnees/modules.js` (17 modules), `donnees/site.js`, `i18n/langues.js` (routes des modules, menus), libellés du § 4.7
  dans `i18n/*/commun.json`, `i18n/*/modules.json`, `components/applications/GrilleModules.astro`, `TuileModule.astro`, squelette
  de `PageModule.astro`, `equipement.json` vides, `tests/modules.test.js`.
- **B** : pages `pages/[lang]/applications/*`, `socle.astro`, catalogue rangé par `module`, redirections, pages de fonction supprimées.
- **A** : `EnTete.astro`, `components/navigation/`, `PiedDePage.astro`.
- **C** : `index.astro`, `components/accueil/`, îlot React du comparatif.

## Fait

(rempli au fil des étapes)

## Choix faits sans le chef

| Question | Option retenue | Autre option | Fichier touché |
|---|---|---|---|
| Les PR #254 (VIT-13) et #223 (VIT-12) ne sont pas fusionnées sur `main` | je pars de `origin/main` tel quel ; pas de pages Mentions légales ni Confidentialité | attendre leur fusion | — |
| Lien « Contact » et bouton de démonstration | `/<langue>/#contact` (VIT-16 absente), une constante dans `langues.js` | — | `vitrine/src/i18n/langues.js` |
