# Session du 2026-11-26 · neutralité des guides · `fix/neutralite-docs`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QUA · correctif hors chantier, suite de Q-37 |
| Dossier de travail | `..\travaux-planner\fix-neutralite-docs` |
| Dernier commit | `14f8b9f6` |

## Objectif de la session

Le coordinateur a validé le plan (message de 09 h 53). Inscrire cette validation, puis les onze lignes de `DEPLOIEMENT.md`. Le script attend la fusion de Q-37 (#276).

## Plan

[docs/conception/qualite/fix-neutralite-docs.md](../conception/qualite/fix-neutralite-docs.md). Validation inscrite dans `bd0e88a7` : questions 2 à 4 acceptées par le coordinateur le 26 nov. 2026. La question 1 était déjà tranchée par le chef (`b0c0508a`). La ligne 140 est retenue.

## Fait

- `bd0e88a7` — le coordinateur valide le plan, questions 2 à 4 acceptées. Commit à part, avant le guide.
- `14f8b9f6` — onze lignes de `DEPLOIEMENT.md` :
  - titre (l. 1) et pied (l. 687) : « Planner », la date de mai 2026 reste ;
  - l. 140 : « la base de l'école pilote » ;
  - l. 403 : `ETABLISSEMENT_NOM=<nom-court-de-l-ecole>`, le chemin `/opt/hestim/.env.docker` reste ;
  - l. 511 : `EMAIL_FROM="Planner <votre-email@example.com>"` ;
  - l. 529 et 555 : `https://planner-backend.up.railway.app` ;
  - l. 564 et 571 : `https://planner.vercel.app` ;
  - l. 620 et 628 : `planner.votre-ecole.example` et `api.votre-ecole.example`.

`README.md` non modifié. `scripts/verifier-neutre.mjs` non modifié. `docs/plan/suivi.md` non modifié. Le fichier du module QUA attend la fin du code (après #276).

## Vérifié

`node scripts/verifier-neutre.mjs` : sortie 0. « Aucun nom d'école écrit en dur (backend, frontend/src, mobile/src, shared, vitrine/src, vitrine/public ; 7 exceptions justifiées). » Ce passage ne voit pas `DEPLOIEMENT.md` : le script ne le lit pas encore.

Recherche dans le guide : plus aucun « HESTIM » ni « hestim.ma ». Les noms techniques restent (`/opt/hestim`, conteneurs, images `hestim-*`, volumes, sauvegardes, `hestim_planner`).

Aucun test de serveur, aucun build. L'échec du script avec l'ancien titre n'est pas montré : le script ne lit pas encore le guide.

## Écarts avec le plan

Aucun sur le guide. Le script n'est pas fait : #276 n'est pas sur `origin/main` (`fa9df596`, fusion de #274). Consigne du coordinateur : ne pas écrire le script sur une base sans Q-37.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Garder l'histoire du produit dans le README (l. 12, 62, 64) ? | garder | tranchée par le chef, 26 nov. 2026 |
| 2 | Garder la branche `hestim` du fork (l. 147 et 452) ? | oui | tranchée par le coordinateur, 26 nov. 2026 |
| 3 | Exemples Railway, Vercel, `ETABLISSEMENT_NOM` ? | oui, propositions du plan | tranchée par le coordinateur, 26 nov. 2026 |
| 4 | Le script lit-il le README ? | non, seulement `DEPLOIEMENT.md` en entier | tranchée par le coordinateur, 26 nov. 2026 |

Le modèle de cette session est Grok 4.7.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : correctif de neutralité des guides → en cours, plan validé, guide fait, script en attente de #276, pas de PR.
- Chantier : correctif hors chantier.
- `git status` vide après le commit de cette fiche.

## Reste à faire, dans l'ordre

1. Quand #276 sera sur `origin/main` : `git merge origin/main`.
2. `scripts/verifier-neutre.mjs` lit `DEPLOIEMENT.md` en entier, sans le filtre des commentaires. Montrer l'échec avec l'ancien titre dans une copie locale non commitée, puis la retirer.
3. Une ligne dans le fichier du module QUA, cette fiche mise à jour, rapport dans `sortie/` avec les commandes du chef.
4. Pas de push. Le coordinateur relit la branche avant la PR.

## Commandes pour le chef de projet

Aucune. La branche ne se pousse pas : le script n'est pas écrit, et le coordinateur n'a pas relu.

## Prompt de reprise

```text
Tu reprends le correctif de neutralité des guides (fix-neutralite-docs), hors chantier QUA,
sur la branche fix/neutralite-docs,
dans le dossier ..\travaux-planner\fix-neutralite-docs.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la fiche de mission docs/plan/missions/fix-neutralite-docs.md
(branche de coordination doc/coordination-2026-11-26-suite tant qu'elle n'est pas sur main),
la conception docs/conception/qualite/fix-neutralite-docs.md
et cette fiche (docs/sessions/2026-11-26-fix-neutralite-docs-2.md).
Fait : plan validé bd0e88a7 (questions 2 à 4, chef déjà sur la question 1 dans b0c0508a).
Guide fait 14f8b9f6 : DEPLOIEMENT.md sans HESTIM ni hestim.ma.
README inchangé. Noms techniques et docker-compose.yml inchangés.
Le script n'est pas écrit : #276 (Q-37) n'était pas sur origin/main (fa9df596, #274).
Quand #276 y est : git merge origin/main, puis verifier-neutre lit DEPLOIEMENT.md
en entier, sans le filtre des commentaires, pas le README.
Montrer l'échec avec l'ancien titre, copie locale non commitée, puis la retirer.
Ensuite : une ligne du module QUA, la fiche, le rapport, les commandes du chef.
Règles : pas de code hors du plan validé ; suivi.md non modifié ; jamais de git push.
```
