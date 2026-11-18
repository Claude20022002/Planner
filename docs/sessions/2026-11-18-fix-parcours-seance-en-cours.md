# Session du 2026-11-18 · parcours séance en cours · `fix/parcours-seance-en-cours`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QUA · correctif de test, sans chantier |
| Dossier de travail | `..\travaux-planner\parcours-seance-en-cours` |
| Dernier commit | `9664832b` |

## Objectif de la session

Écrire le plan court qui rend `entreRoles`, `appel` et `appelClasse` indépendants de l'heure, puis s'arrêter avant le code.

## Plan

[docs/conception/qualite/fix-parcours-seance-en-cours.md](../conception/qualite/fix-parcours-seance-en-cours.md). En attente du « validé » du chef.

La séance des parcours finit à 23 h 55. Après, la classe n'est plus en cours. Dans les cinq minutes d'avant, le rappel double le bouton « Faire l'appel ». Si le passage traverse minuit, la date préparée est devenue hier. Le plan propose un créneau 00 h 00–24 h 00, une séance le lendemain, et deux ajustements de tests (`edtPdf`, `appel`). Aucun code de l'application.

## Fait

- `9664832b` — le plan court, seul.

## Vérifié

Pas de test : aucun code. La CI de QJE-01 (#208, `40abb56b`) était verte et la PR est fusionnée. Ce correctif-ci n'est pas encore codé.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Coder le correctif tel quel (créneau 00 h 00–24 h 00, séance du lendemain, trois fichiers de tests, aucun code de l'application) ? | — | en attente du chef |

## État laissé

- `docs/plan/suivi.md` : non modifié. Pendant la pause, le coordinateur le tient. L'état est dans cette fiche : plan écrit, code pas commencé.
- Chantier QUA : pas rouvert. C'est un correctif de test.

## Reste à faire, dans l'ordre

1. Le chef dit « validé », ou corrige la question 1.
2. Coder alors seulement les trois fichiers du plan. Relire `heure_fin` : si ce n'est pas `24:00`, s'arrêter.
3. Fiche mise à jour, commit local, rapport. Le chef pousse. Pas de parcours lancé ici.

## Commandes pour le chef de projet

Rien à pousser tant que le plan n'est pas validé. Après le code :

```powershell
git -C "..\travaux-planner\parcours-seance-en-cours" push -u origin fix/parcours-seance-en-cours
gh pr create --repo Claude20022002/Planner --base main --head fix/parcours-seance-en-cours --title "Correctif : séance des parcours encore en cours vers minuit" --fill
```

## Prompt de reprise

```text
Tu reprends le correctif des parcours entreRoles, appel et appelClasse, sur la branche
fix/parcours-seance-en-cours, dans le dossier ..\travaux-planner\parcours-seance-en-cours.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/qualite/fix-parcours-seance-en-cours.md et cette fiche.
Fait : le plan court est commité (9664832b). Aucun code.
Reste : attendre le « validé » du chef, puis coder seulement les trois fichiers du plan.
Questions en attente : la question 1 du plan.
Règles : pas de code hors du plan validé ; pas de suivi.md (pause du coordinateur) ;
jamais de git push. Grok 4.7 high convient.
```
