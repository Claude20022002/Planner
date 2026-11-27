# Session du 2026-11-27 · QJE-15 · `feat/qje-15-jeux-par-niveau`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-15-jeux-par-niveau` |
| Dernier commit | le commit de cette fiche ; plan de fond `5cb58101`, fiche du matin `0276f2be` |

## Objectif de la session

Reprendre QJE-15. Vérifier le visa du chef, la question 4 et les trois fusions. Aucun code de rangement.

## Plan

[docs/conception/jeux/qje-15-jeux-par-niveau.md](../conception/jeux/qje-15-jeux-par-niveau.md) · en attente du chef. La fiche du matin est [2026-11-27-feat-qje-15-jeux-par-niveau.md](2026-11-27-feat-qje-15-jeux-par-niveau.md) (`0276f2be`).

## Fait

- Relevé : la PR #285 n'a ni commentaire ni revue. La question 4 n'a pas de réponse dans la boîte.
- M-11 est fusionnée (#283, 26 nov.). #282 (VIT-23) est fusionnée. #229 est encore ouverte.
- La PR de coordination #287, non fusionnée, inscrit la séparation sous QJE-16 et laisse l'interrupteur de l'IA sous le même numéro. Le plan le signale et ne choisit pas.
- Le plan et la ligne QJE-15 du module portent ces faits. `suivi.md` n'est pas modifié.

## Vérifié

Aucun test : documents seuls. `gh pr view 285` : ouverte, tête `0276f2be`, aucun commentaire. #282 et #283 : fusionnées. #229 : ouverte.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quels cycles, et dans quel ordre ? | collège, lycée, supérieur, formation professionnelle ; seul le supérieur est porté aujourd'hui | en attente du chef |
| 2 | Le classement des onze jeux | tableau du plan, § 4 | en attente du chef |
| 3 | La monnaie | « crédits », M-11 fusionnée (#283) | réglée |
| 4 | Le numéro de la séparation | Le plan écrit (nom fixé par QJE-16). QJE-16 est déjà l'interrupteur de l'IA. #287 réutilise le même numéro pour la séparation. Proposition : le coordinateur dit si la séparation garde ce numéro. | en attente du coordinateur |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-15 → plan revu, en attente du chef ; code après le visa et #229
- Le 27 nov., le visa n'est pas là : l'audit de la vitrine passe devant

## Reste à faire, dans l'ordre

1. Le coordinateur répond à la question 4.
2. Le chef valide le plan, ou corrige le tableau.
3. L'audit de la vitrine (`fix-audit-vitrine`), tant que le visa n'est pas là.
4. Après le visa et la fusion de #229 : le catalogue, `rangerJeux`, les trois écrans, les tests. `Jeux.jsx` sous 300 lignes. Les blocs de quiz des écrans du § 2 bis ne bougent pas.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-15-jeux-par-niveau" push
```

La PR #285 est ouverte. Ce push envoie la mise à jour du plan. Pas une nouvelle PR.

## Prompt de reprise

```text
Tu reprends QJE-15 (jeux par niveau, puis par filière), sur la branche
feat/qje-15-jeux-par-niveau, dans le dossier ..\travaux-planner\qje-15-jeux-par-niveau.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/jeux/qje-15-jeux-par-niveau.md
et cette fiche (docs/sessions/2026-11-27-feat-qje-15-jeux-par-niveau-2.md).
Fait : le plan revu (5cb58101) ne range que les jeux. Le nom du module
est « (nom fixé par QJE-16) ». M-11 (#283) et #282 sont sur main.
#229 est encore ouverte. La PR #285 n'a pas de visa. La question 4
est ouverte : QJE-16 est déjà l'interrupteur de l'IA, et #287 réutilise
ce numéro pour la séparation. Aucun code de rangement.
Reste : la question 4, puis le visa du chef sur les questions 1 et 2.
L'audit de la vitrine passe devant tant que le visa n'est pas là.
Ensuite le code, après #229.
Questions en attente : 1 (cycles et ordre), 2 (tableau des onze jeux), 4 (numéro).
La question 3 est réglée : « crédits », M-11 fusionnée (#283).
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
