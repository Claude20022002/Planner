# Session du 2026-11-26 · neutralité des guides · `fix/neutralite-docs`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QUA · correctif hors chantier, suite de Q-37 |
| Dossier de travail | `..\travaux-planner\fix-neutralite-docs` |
| Dernier commit | `45153bc2` |

## Objectif de la session

#276 est fusionnée. Reprendre `origin/main`, faire lire `DEPLOIEMENT.md` à `verifier-neutre`, montrer l'échec avec l'ancien titre, puis la ligne du module.

## Plan

[docs/conception/qualite/fix-neutralite-docs.md](../conception/qualite/fix-neutralite-docs.md), validé le 26 nov. 2026 (`bd0e88a7`).

## Fait

- `a47e6e15` — `git merge origin/main`. #276 y est (`72aa6313`). Le fetch a aussi pris #262 et #278, arrivées entre le message et la fusion. Aucun conflit.
- `45153bc2` — `scripts/verifier-neutre.mjs` lit `DEPLOIEMENT.md` en entier, après `backend/.env.example`, sans le filtre des commentaires. Une ligne du module QUA, « Guides d'installation ».

`README.md` non modifié. `docs/plan/suivi.md` non modifié. Les onze lignes du guide étaient déjà dans `14f8b9f6`.

## Vérifié

`node scripts/verifier-neutre.mjs`, texte neuf : sortie 0. « Aucun nom d'école écrit en dur (backend, frontend/src, mobile/src, shared, vitrine/src, vitrine/public, backend/.env.example, DEPLOIEMENT.md ; 7 exceptions justifiées). »

Copies locales, non commitées, puis remises :

- Ancien titre, ligne 1 : sortie 1. `DEPLOIEMENT.md:1  # Guide de déploiement — HESTIM Planner`.
- Pied, ligne 687, qui commence par `*` : sortie 1. `DEPLOIEMENT.md:687`. Le filtre des commentaires ne l'ignore donc pas.
- Remis : sortie 0. `git diff` de `DEPLOIEMENT.md` vide.

Aucun test de serveur, aucun build. La CI de la PR reste à lancer par le chef.

## Écarts avec le plan

Aucun.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Garder l'histoire du produit dans le README ? | garder | tranchée par le chef |
| 2 | Garder la branche `hestim` du fork ? | oui | tranchée par le coordinateur |
| 3 | Exemples Railway, Vercel, nom d'établissement ? | oui | tranchée par le coordinateur |
| 4 | Le script lit-il le README ? | non | tranchée par le coordinateur |

Le modèle de cette session est Grok 4.7.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : correctif de neutralité des guides → en cours, code fait, pas de PR.
- Chantier : correctif hors chantier. La suite `fix-audit-vitrine` commence le 27 nov.
- `git status` vide après le commit de cette fiche.

## Reste à faire, dans l'ordre

1. Le chef pousse la branche et ouvre la PR. Le coordinateur relit avant la fusion.
2. Le 27 nov. : `fix-audit-vitrine`, pas avant.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\fix-neutralite-docs" push -u origin fix/neutralite-docs
gh pr create --base main --head fix/neutralite-docs --title "Neutralité des guides : le déploiement ne nomme plus l'école" --fill
```

## Prompt de reprise

```text
Tu reprends le correctif de neutralité des guides (fix-neutralite-docs), hors chantier QUA,
sur la branche fix/neutralite-docs,
dans le dossier ..\travaux-planner\fix-neutralite-docs.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/qualite/fix-neutralite-docs.md
et cette fiche (docs/sessions/2026-11-26-fix-neutralite-docs-3.md).
Fait : plan validé bd0e88a7, guide 14f8b9f6, merge de main a47e6e15 (#276),
script 45153bc2. verifier-neutre lit DEPLOIEMENT.md en entier, pas le README.
L'échec avec l'ancien titre et avec le pied en « * » a été montré, puis retiré.
README et suivi.md non modifiés. Pas de PR : le chef pousse, le coordinateur relit.
La suite fix-audit-vitrine commence le 27 nov., pas avant.
Règles : pas de code hors du plan validé ; suivi.md non modifié ; jamais de git push.
```
