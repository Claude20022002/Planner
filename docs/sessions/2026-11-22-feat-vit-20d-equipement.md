# Session du 2026-11-22 · VIT-20d · `feat/vit-20d-equipement`

| | |
|---|---|
| Fait par | Claude Code (Sonnet 5.5), agent autonome |
| Chantier | VIT |
| Dossier de travail | dépôt principal |
| Dernier commit | le dernier de la branche (voir la PR) |

## Objectif de la session

Phase (a) du lot D de VIT-20 : écrire le plan et le tableau des lignes de « Selon votre équipement ». La phase (b), le code, attend le visa du chef.

## Plan

[vit-20d-equipement.md](../conception/vitrine/vit-20d-equipement.md) (à viser) : 5 modules disponibles × 3 lignes, en français, anglais, avec la source dans le dépôt.

## Fait

- `docs/conception/vitrine/vit-20d-equipement.md` : plan de réalisation, cinq questions pour le chef, 15 lignes bilingues avec état et sources
  (chaque fichier cité a été vérifié sur `origin/main`).
- Aucun code.

## Vérifié

- Les 25 fichiers cités existent sur `main` ; les affirmations ont été relues dans le code (`cache.js`, `tentatives.js`, `sessions.js`, `exportEmploiDuTemps.js`, `annonces.js`).
- Aucun contrôle de code (aucun code changé).

## Choix faits sans le chef

| Question | Option retenue | Autre option | Fichier touché |
|---|---|---|---|
| « Bientôt » sur une ligne | seulement quand un texte déjà visé du site le dit (« application entièrement utilisable sans connexion ») ; l'appel sans réseau et le jeu sans réseau sont dits tels quels | « Bientôt » partout où EP-18 prévoit quelque chose | `vit-20d-equipement.md` |
| Source d'EP-18 | citée comme étude non fusionnée (`etude/ep18-faible-equipement`) ; chaque ligne s'appuie sur du code de `main` | citer l'étude comme preuve | `vit-20d-equipement.md` |
| Espace de cours, hors ligne | seule la mention du poids affiché ; rien sur la lecture sans réseau (les fichiers dépendent d'un service arrêté) | reprendre « relu sans réseau » | `vit-20d-equipement.md` |

## État laissé

- VIT-20d → phase (a) faite, en attente du visa du chef.

## Reste à faire, dans l'ordre

1. Le chef vise le document (commentaire « Visé » ou « Visé sauf : … » sur la PR). 2. Phase (b) : `equipement.js`, `equipement.json`, composant, test, une ligne de `PageModule.astro`.

## Prompt de reprise

```text
Tu reprends VIT-20d (« Selon votre équipement »), branche feat/vit-20d-equipement. Lis AGENTS.md, le plan de VIT-20 (§ 4.9), docs/conception/vitrine/vit-20d-equipement.md
et cette fiche, puis le visa du chef : gh pr view <n> --comments. Pas de visa : pas de code.
Phase (b) : components/applications/equipement/, donnees/equipement.js, i18n/*/equipement.json, tests/equipement.test.js, une ligne dans PageModule.astro.
Règles : les phrases visées exactement ; aucun texte nouveau ; ne pousser que cette branche ; suivi.md et decisions.md non modifiés.
```
