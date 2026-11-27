# Session du 2026-11-27 · QJE-15 · `feat/qje-15-jeux-par-niveau`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-15-jeux-par-niveau` |
| Dernier commit | `5cb58101` |

## Objectif de la session

Revoir le plan de QJE-15 après la décision du chef du 26 nov. : les quiz et les jeux sont séparés partout. Pas de code.

## Plan

[docs/conception/jeux/qje-15-jeux-par-niveau.md](../conception/jeux/qje-15-jeux-par-niveau.md) · en attente du chef.

## Fait

- `5cb58101` — le plan ne range que les jeux (le terminal et les dix simulations). Les quiz du Studio n'y entrent pas. Le nom du module des jeux est écrit « (nom fixé par QJE-16) ». Le § 2 bis signale trois écrans où la page des jeux montre aussi des quiz.
- La ligne QJE-15 du fichier du module, et cette fiche.

## Vérifié

Aucun test : le commit ne contient que le plan. Relecture du plan : la formule qui réunit les deux familles n'y figure plus, ni comme nom de module.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quels cycles, et dans quel ordre ? | collège, lycée, supérieur, formation professionnelle ; seul le supérieur est porté aujourd'hui | en attente du chef |
| 2 | Le classement des onze jeux | tableau du plan, § 4 | en attente du chef |
| 3 | La monnaie | « crédits », M-11 | réglée, non reposée |
| 4 | Le numéro de la séparation | Le plan écrit (nom fixé par QJE-16). Sur cette branche, QJE-16 est déjà l'interrupteur de l'IA par école (D2, 18 nov.). Proposition : le coordinateur dit si la séparation garde ce numéro. | en attente du coordinateur |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-15 → plan revu le 27 nov., en attente du chef
- Le code attend le visa, puis M-11, #282 et #229 sur `main`

## Reste à faire, dans l'ordre

1. Le coordinateur répond à la question 4.
2. Le chef valide le plan, ou corrige le tableau.
3. Le 27 nov., l'audit de la vitrine passe devant si le visa n'est pas là.
4. Après le visa et les trois fusions : le catalogue, `rangerJeux`, les trois écrans, les tests. `Jeux.jsx` sous 300 lignes. Les blocs de quiz des écrans du § 2 bis ne bougent pas.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-15-jeux-par-niveau" push -u origin feat/qje-15-jeux-par-niveau
gh pr create --base main --head feat/qje-15-jeux-par-niveau --title "QJE-15 : plan du rangement des jeux par niveau, puis par filière" --fill
```

La branche est déjà sur le dépôt distant (le plan du 26 nov.). Ce push envoie la révision. Si la PR est déjà ouverte, le push suffit.

## Prompt de reprise

```text
Tu reprends QJE-15 (jeux par niveau, puis par filière), sur la branche
feat/qje-15-jeux-par-niveau, dans le dossier ..\travaux-planner\qje-15-jeux-par-niveau.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/jeux/qje-15-jeux-par-niveau.md
et cette fiche (docs/sessions/2026-11-27-feat-qje-15-jeux-par-niveau.md).
Fait : le plan revu est commité (5cb58101). Il ne range que les jeux
(le terminal et les dix simulations). Le nom du module des jeux est
« (nom fixé par QJE-16) ». Le § 2 bis signale les trois écrans mêlés.
Aucun code.
Reste : la question 4 (le numéro QJE-16 est déjà l'interrupteur de l'IA),
puis le visa du chef sur les questions 1 et 2. Ensuite le code, seulement après
la fusion de M-11, de #282 (VIT-23) et de #229. Le 27 nov., l'audit de la vitrine
passe devant si le visa n'est pas là.
Questions en attente : 1 (cycles et ordre), 2 (tableau des onze jeux), 4 (numéro).
La question 3 est réglée : « crédits », M-11.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
