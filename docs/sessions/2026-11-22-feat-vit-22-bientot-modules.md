# Session du 2026-11-22 · VIT-22 · `feat/vit-22-bientot-modules`

| | |
|---|---|
| Fait par | Claude Code (Sonnet 5.5), agent autonome |
| Chantier | VIT |
| Dossier de travail | dépôt principal |
| Dernier commit | le dernier de la branche (voir la PR) |

## Objectif de la session

Phase (a) : plan et tableau des 12 phrases de la page « Bientôt » alignée sur les 12 modules « Bientôt » de `modules.js`. La phase (b), le code, attend le visa du chef.

## Plan

[vit-22-bientot-modules.md](../conception/vitrine/vit-22-bientot-modules.md) (à viser).

## Fait

- Le document : plan (page tirée de `modules.js` par catégorie, noms de `modules.json`, aucun nom écrit deux fois), 12 phrases bilingues avec leur origine, devenir des cartes qui ne sont pas des modules, cinq questions. Aucun code.

## Vérifié

- Les phrases « actuelles » sont les cartes de `bientot.json` (fr et en), relues ; les trois phrases nouvelles sont marquées « à viser » avec l'extrait de l'étude 15 dont elles viennent.
- Aucun contrôle de code (aucun code changé).

## Choix faits sans le chef

| Question | Option retenue | Autre option | Fichier touché |
|---|---|---|---|
| Frais et paiements → deux modules | la carte coupée en deux phrases (mots inchangés) | une phrase nouvelle par module | `vit-22-bientot-modules.md` |
| Vie scolaire + Familles → un module | les deux phrases mises bout à bout | une phrase nouvelle | idem |
| Communication, Transport et internat | retirées | les garder en cartes hors module | idem |
| En arabe, Hors ligne | gardées dans « Et aussi », sans changement | les retirer | idem |
| Bibliothèque, Vacataires, Formation | phrase nouvelle, tirée de l'étude 15 et marquée « à viser » | aucune phrase | idem |

## État laissé

- VIT-22 → phase (a) faite, en attente du visa du chef.

## Reste à faire, dans l'ordre

1. Visa du chef. 2. Phase (b) : `bientot.astro`, `bientot.json`, `iconesModules.js`, `bientot.test.js`, `bientot.rendu.cjs`.

## Prompt de reprise

```text
Tu reprends VIT-22 (la page « Bientôt » suit les 17 modules), branche feat/vit-22-bientot-modules. Lis AGENTS.md, docs/conception/vitrine/vit-22-bientot-modules.md et cette fiche,
puis le visa du chef : gh pr view <n> --comments. Pas de visa : pas de code.
Phase (b) : la page tire ses cartes de donnees/modules.js par catégorie ; noms de modules.json ; phrases visées de bientot.json ; tests.
Règles : les phrases visées exactement ; aucun texte nouveau ; ne pousser que cette branche ; suivi.md et decisions.md non modifiés.
```
