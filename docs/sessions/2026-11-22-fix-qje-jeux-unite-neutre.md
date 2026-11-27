# Session du 2026-11-22 · M-11 · `fix/qje-jeux-unite-neutre`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QJE · correctif hors chantier (étude EP-18, M-11) |
| Dossier de travail | `..\travaux-planner\qje-jeux-unite-neutre` |
| Dernier commit | `01e512ab` |

## Objectif de la session

Remplacer le mot `MAD` par l'unité neutre tranchée par le coordinateur, sans réécrire aucun montant.

## Plan

[docs/conception/jeux/fix-qje-jeux-unite-neutre.md](../conception/jeux/fix-qje-jeux-unite-neutre.md), validé par le coordinateur le 22 nov. (`5601f126`). Question 1 : **crédits** en français, **credits** en anglais.

## Fait

- `5601f126` — plan court, commité seul avant cette session.
- `01e512ab` — le mot, le test, la ligne du module QJE, et le plan mis à jour (réponse et périmètre du test).

## Vérifié

- Jest mobile, suite entière : **19 suites, 83 tests, 83 réussites, 0 échec**.
- Jest backend `tests/utils/simulations.test.js` : **1 suite, 86 tests, 86 réussites, 0 échec**.
- `node scripts/verifier-neutre.mjs` : vert. **7 exceptions déjà justifiées**, aucune nouvelle.

## Écarts avec le plan

- Le test ne lit pas seulement les trois fichiers : il parcourt tout `shared/simulations/` et refuse `MAD`, « dirham », « euro », « € » et « $ ». C'est la précision du coordinateur à la validation. Le plan la reprend dans le même commit.
- Deux usages de `$` sont exclus, précisément : le `$` d'un gabarit `${…}` (le caractère suivant est `{`) et l'ancre de fin d'une expression régulière `/…$/` (le caractère suivant est `/`). Les ancres sont dans `shared/simulations/moteurs/robot.js` et `shared/simulations/moteurs/_aides.js`. Aucun autre `$` n'est dans le dossier.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quel mot à la place de `MAD` ? | crédits / credits | tranchée |

Le modèle de cette session est Grok 4.7. Le passage sous « Auto » n'est pas possible depuis cette session.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : M-11 → codée (`01e512ab`), en attente de relecture. Pas poussée.
- La branche part de `b57753e9` et est en retard sur `origin/main`. Les fichiers de `shared/simulations/` n'ont pas bougé sur `main` depuis ce commit.

## Reste à faire, dans l'ordre

1. Relecture du coordinateur.
2. Le chef pousse et ouvre la PR (fusion de `origin/main` au moment du push, les fichiers du correctif n'ayant pas bougé).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-jeux-unite-neutre" push -u origin fix/qje-jeux-unite-neutre
gh pr create --base main --head fix/qje-jeux-unite-neutre --title "M-11 : les jeux comptent en crédits" --fill
```

## Prompt de reprise

```text
Tu reprends M-11 (qje-jeux-unite-neutre) du correctif hors chantier QJE,
sur la branche fix/qje-jeux-unite-neutre,
dans le dossier ..\travaux-planner\qje-jeux-unite-neutre.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/jeux/fix-qje-jeux-unite-neutre.md
et cette fiche (docs/sessions/2026-11-22-fix-qje-jeux-unite-neutre.md).
Fait : le mot est crédits en français et credits en anglais (01e512ab).
Les montants n'ont pas changé. Le test parcourt tout shared/simulations.
Reste : la relecture du coordinateur, puis le push par le chef.
Questions en attente : aucune.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
