# Session du 2026-11-28 · QJE-15 · `feat/qje-15-jeux-par-niveau`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-15-jeux-par-niveau` |
| Dernier commit | le commit de cette fiche ; planche précédente `4d1869f1` |

## Objectif de la session

Réécrire les onze accroches, plus ludiques, et enregistrer le visa de la voie d'image. Documents seulement. Aucun écran.

## Plan

[docs/conception/jeux/qje-15-jeux-par-niveau.md](../conception/jeux/qje-15-jeux-par-niveau.md) · § 4 bis.

## Fait

- Ligne « Validé » : question 6 visée le 28 nov., telle que proposée ; question 5 réécrite, en attente du chef.
- Tableau des onze accroches, français et anglais, 60 caractères au plus. Même sens que les phrases du 27 nov.
- Planche hors dépôt mise à jour : `..\travaux-planner\qje-15-planche\index.html` et `LISEZMOI.md`. Les phrases sont les mêmes que dans le plan.
- `suivi.md` n'est pas modifié. Rien de la planche n'est dans le dépôt.

## Vérifié

Aucun test lancé : documents seulement, pas d'écran. Les 22 longueurs (11 français, 11 anglais) sont au plus de 60 caractères. La plus longue en français en a 49, la plus longue en anglais en a 47. Les onze lignes du plan et de la planche sont identiques.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 5 | Les accroches | les onze phrases du § 4 bis | en attente du chef |
| 6 | La voie d'image | neuf vues ; Codex pour Labo Big-O et Requête Parfaite | visée le 28 nov. |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-15 → accroches réécrites, en attente du chef ; voie d'image visée ; écrans après ce visa et #229

## Reste à faire, dans l'ordre

1. Le chef vise les onze accroches.
2. Le coordinateur transmet à Codex les deux consignes d'image (dans le rapport de cette session).
3. Les trois écrans, après ce visa et après #229.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-15-jeux-par-niveau" push
```

La planche n'est pas dans ce push. La PR #285 est ouverte.

## Prompt de reprise

```text
Tu reprends QJE-15 (jeux par niveau, puis par domaine), sur la branche
feat/qje-15-jeux-par-niveau, dans le dossier ..\travaux-planner\qje-15-jeux-par-niveau.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/jeux/qje-15-jeux-par-niveau.md
et cette fiche (docs/sessions/2026-11-28-feat-qje-15-jeux-par-niveau.md).
Fait : la voie d'image est visée le 28 nov. (neuf vues, Codex pour Labo Big-O
et Requête Parfaite). Les onze accroches sont réécrites dans le § 4 bis
et sur la planche hors dépôt ..\travaux-planner\qje-15-planche\index.html.
Aucun écran.
Reste : le visa du chef sur la question 5, puis les écrans après #229.
Les deux consignes d'image pour Codex sont dans le rapport du 28 nov.
Questions en attente : 5 (accroches). La question 6 est visée.
Règles : pas d'écran avant le visa des accroches ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
