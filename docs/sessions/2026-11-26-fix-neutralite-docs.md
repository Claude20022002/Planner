# Session du 2026-11-26 · neutralité des guides · `fix/neutralite-docs`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QUA · correctif hors chantier, suite de Q-37 |
| Dossier de travail | `..\travaux-planner\fix-neutralite-docs` |
| Dernier commit | `a7227205` |

## Objectif de la session

Écrire le plan court du correctif de neutralité de `DEPLOIEMENT.md` (et dire ce que `README.md` garde), sans modifier les guides ni le script. La mission est arrivée dans la boîte (26 nov., 09 h 32).

## Plan

[docs/conception/qualite/fix-neutralite-docs.md](../conception/qualite/fix-neutralite-docs.md), commité seul (`a7227205`). En attente du coordinateur. Les quatre propositions de la fiche sont retenues. La ligne 140 de `DEPLOIEMENT.md` (« la base de HESTIM ») est ajoutée : la fiche ne la listait pas, et le fichier contient « HESTIM » à cet endroit.

## Fait

- Branche `fix/neutralite-docs` créée depuis `origin/main` (`9a428a7c`). Elle ne suit pas `origin/main` : un `git push` sans argument ne viserait pas `main`.
- `a7227205` — Neutralité des guides : le plan retire le nom d'école des exemples.

Aucun guide modifié. Aucun script modifié. `docs/plan/suivi.md` non modifié. Le fichier du module ne change qu'à la fin du code.

## Vérifié

`node scripts/verifier-neutre.mjs` : sortie 0. « Aucun nom d'école écrit en dur (backend, frontend/src, mobile/src, shared, vitrine/src, vitrine/public ; 7 exceptions justifiées). » Ce passage ne voit pas `DEPLOIEMENT.md` : le script ne le lit pas encore. Les lignes 1, 140, 511, 620, 628 et 687 sont donc encore là, et le contrôle actuel reste vert.

Aucun test de serveur, aucun build. Pas de modification des guides.

## Écarts avec le plan

Aucun : le plan n'est pas encore validé, et aucun guide n'a été modifié.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Garder l'histoire du produit dans le README (l. 12, 62, 64) ? | proposition : oui | en attente du chef |
| 2 | Garder la branche `hestim` du fork (l. 147 et 452) ? | proposition : oui | en attente du coordinateur |
| 3 | Exemples Railway, Vercel, `ETABLISSEMENT_NOM` ? | proposition de la fiche, plus `planner.votre-ecole.example` et `api.votre-ecole.example` | en attente du coordinateur |
| 4 | Le script lit-il le README ? | proposition : non, seulement `DEPLOIEMENT.md` | en attente du coordinateur |

Le modèle de cette session est Grok 4.7.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : correctif de neutralité des guides → en cours, plan écrit, pas de PR.
- Chantier : correctif hors chantier. Le code attend la validation, puis la fusion de Q-37 (`verifier-neutre.mjs` est touché par les deux).
- `git status` vide après le commit de cette fiche.

## Reste à faire, dans l'ordre

1. Le chef répond à la question 1. Le coordinateur valide les questions 2 à 4, ou corrige le plan.
2. Si la question 1 est refusée : reprendre le plan avant de toucher au README.
3. Une fois le plan validé et Q-37 sur `origin/main` : `git merge origin/main`, puis les lignes de `DEPLOIEMENT.md`, la lecture du fichier, montrer l'échec du script avec l'ancien texte.
4. Pas de push. Le coordinateur relit la branche avant la PR.

## Commandes pour le chef de projet

Aucune. La branche ne se pousse pas tant que le coordinateur n'a pas relu.

## Prompt de reprise

```text
Tu reprends le correctif de neutralité des guides (fix-neutralite-docs), hors chantier QUA,
sur la branche fix/neutralite-docs,
dans le dossier ..\travaux-planner\fix-neutralite-docs.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la fiche de mission docs/plan/missions/fix-neutralite-docs.md
(branche de coordination doc/coordination-2026-11-26-suite tant qu'elle n'est pas sur main),
la conception docs/conception/qualite/fix-neutralite-docs.md
et cette fiche (docs/sessions/2026-11-26-fix-neutralite-docs.md).
Fait : plan seul a7227205, depuis origin/main 9a428a7c. Aucun guide modifié.
Le plan retient : README inchangé (histoire et branche hestim),
DEPLOIEMENT.md sans HESTIM ni hestim.ma (lignes 1, 140, 511, 620, 628, 687),
exemples planner-backend.up.railway.app, planner.vercel.app,
ETABLISSEMENT_NOM=<nom-court-de-l-ecole>,
domaines planner.votre-ecole.example et api.votre-ecole.example,
EMAIL_FROM aligné sur Q-37.
verifier-neutre lit DEPLOIEMENT.md en entier, pas le README, après la fusion de Q-37.
Questions : 1 au chef, 2 à 4 au coordinateur. Pas de modification avant le « validé ».
Les noms techniques et docker-compose.yml restent.
Reste : validation, fusion de Q-37, puis les lignes et le contrôle.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
