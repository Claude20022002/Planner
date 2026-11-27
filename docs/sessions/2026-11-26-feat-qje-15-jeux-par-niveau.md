# Session du 2026-11-26 · QJE-15 · `feat/qje-15-jeux-par-niveau`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QJE · exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-15-jeux-par-niveau` |
| Dernier commit | `c8dd89b9` |

## Objectif de la session

Écrire le plan court du rangement des jeux par niveau, puis par filière, et le laisser au chef. Pas de code.

## Plan

[docs/conception/jeux/qje-15-jeux-par-niveau.md](../conception/jeux/qje-15-jeux-par-niveau.md) · en attente du chef.

## Fait

- `c8dd89b9` — le plan seul : quatre cycles, quatre filières, les onze jeux au supérieur, `Jeux.jsx` découpé pour repasser sous 300 lignes, question 3 tenue pour réglée par M-11 (« crédits »).
- La ligne QJE-15 dans `docs/plan/modules/QJE-quiz-jeux-ia.md`, et cette fiche.

## Vérifié

Aucun test : le commit ne contient que le plan. Le classement a été lu dans le catalogue de `origin/main` (`7469bb70`) : les onze jeux, les titres de leurs défis, `Jeux.jsx` à 367 lignes, `jeux.jsx` à 257 lignes, la page du site à dix cartes.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quels cycles, et dans quel ordre ? | collège, lycée, supérieur, formation professionnelle ; seul le supérieur est porté aujourd'hui | en attente du chef |
| 2 | Le classement des onze jeux | tableau du plan, § 4 | en attente du chef |
| 3 | La monnaie | « crédits », M-11 | réglée, non reposée |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-15 → plan écrit, en attente du chef
- Chantier QJE : exception hors chantier ; le code attend le visa, puis M-11, #282 et #229 sur `main`

## Reste à faire, dans l'ordre

1. Le chef valide le plan, ou corrige le tableau.
2. Le 27 nov., `fix-audit-vitrine` passe devant si le visa n'est pas là.
3. Après le visa et les trois fusions : le catalogue, `rangerJeux`, les trois écrans, les tests. `Jeux.jsx` sous 300 lignes.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-15-jeux-par-niveau" push -u origin feat/qje-15-jeux-par-niveau
gh pr create --base main --head feat/qje-15-jeux-par-niveau --title "QJE-15 : plan du rangement des jeux par niveau, puis par filière" --fill
```

La PR est le plan. Le code viendra après le visa, sur cette branche une fois M-11, #282 et #229 fusionnées.

## Prompt de reprise

```text
Tu reprends QJE-15 (jeux par niveau, puis par filière) du module QJE, sur la branche
feat/qje-15-jeux-par-niveau, dans le dossier ..\travaux-planner\qje-15-jeux-par-niveau.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/jeux/qje-15-jeux-par-niveau.md
et cette fiche (docs/sessions/2026-11-26-feat-qje-15-jeux-par-niveau.md).
Fait : le plan est commité (c8dd89b9). Aucun code.
Reste : le visa du chef sur les questions 1 et 2. Ensuite le code, seulement après
la fusion de M-11, de #282 (VIT-23) et de #229 (Alexis). Le 27 nov., fix-audit-vitrine
passe devant si le visa n'est pas là.
Questions en attente : 1 (cycles et ordre), 2 (tableau des onze jeux).
La question 3 est réglée : « crédits », M-11.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
