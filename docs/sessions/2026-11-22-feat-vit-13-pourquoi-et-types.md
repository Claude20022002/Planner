# Session du 2026-11-22 · VIT-13 · `feat/vit-13-pourquoi-et-types`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | VIT |
| Dossier de travail | `..\travaux-planner\vit-13-pourquoi-et-types` |
| Dernier commit | `847c2d59` |

## Objectif de la session

Écrire, puis appliquer, le plan court des fonctionnalités par type d'établissement. « Pourquoi Planner » reste à VIT-14.

## Plan

[vit-13-pourquoi-et-types](../conception/vitrine/vit-13-pourquoi-et-types.md), validé par Claude20022002 le 22 novembre 2026 (outil de questions, les sept propositions ; le titre « Stages et anciens » devient « Stages »).

## Fait

| Commit | Contenu |
|---|---|
| `55952cd2` | plan seul, depuis `origin/main` (`b57753e9`) |
| `b9845600` | colonne « Réponse du chef » et ligne « Validé » |
| `847c2d59` | `solutions.json` français et anglais ; ligne VIT-13 du module |

Les listes n'ont pas changé de longueur : `solutions.test.js` est inchangé. L'arabe garde les mêmes clés, vides.

## Vérifié

- `npm run test:unit` : **116 tests, 115 verts, 1 ignoré** (clone StudyLib, facultatif), **0 échec**.
- `node ../scripts/verifier-neutre.mjs` : aucun nom d'école en dur (7 exceptions déjà justifiées).
- `npm run build` : **39 pages**.
- `npm run test:poids` : page la plus lourde `fr/index.html` = **136,5 Ko** (139 733 octets), sous 204 800.
- axe-core **4.10.3**, Chrome, pages `/fr/solutions/` et `/en/solutions/`, 390, 768 et 1440 px, mouvement réduit, WCAG 2.0 à 2.2 A et AA et bonnes pratiques : **6 passages, 0 violation**.
- Le HTML construit contient l'accroche dans l'ordre D4, l'appel à la main, les domaines des jeux, le suivi au-delà de l'appel, et « Les stages des étudiants. » Il ne contient plus « anciens élèves ».

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 7 | Les sept questions du plan | selon la proposition ; titre « Stages » / « Internships » | validé |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : VIT-13 → code fait, en attente de relecture, PR non ouverte.
- `docs/plan/suivi.md` n'a pas été modifié.

## Reste à faire, dans l'ordre

1. Relecture du coordinateur.
2. Le chef pousse. La PR après cette relecture.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vit-13-pourquoi-et-types" push origin feat/vit-13-pourquoi-et-types
```

La pull request attend la relecture annoncée par le coordinateur.

## Prompt de reprise

```text
Tu reprends VIT-13 (vit-13-pourquoi-et-types) du chantier VIT, sur la branche feat/vit-13-pourquoi-et-types,
dans le dossier ..\travaux-planner\vit-13-pourquoi-et-types.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/vitrine/vit-13-pourquoi-et-types.md et cette fiche.
Fait : plan validé (b9845600) et textes (847c2d59). Tests 115/116 verts, 1 ignoré, build 39 pages, poids 136,5 Ko, axe 0 violation sur 6 passages.
Reste : relecture du coordinateur, puis push par le chef. Pas de PR avant cette relecture.
Questions en attente : aucune.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
