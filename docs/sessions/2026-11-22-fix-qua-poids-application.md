# Session du 2026-11-22 · M-9 · `fix/qua-poids-application`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QUA · correctif hors chantier (étude EP-18, M-9) |
| Dossier de travail | `..\travaux-planner\qua-poids-application` |
| Dernier commit | `8124c4cf` |

## Objectif de la session

Écrire le plan court de M-9. Pas de code avant l'accord sur les questions 1 et 2.

## Plan

[docs/conception/qualite/fix-qua-poids-application.md](../conception/qualite/fix-qua-poids-application.md), en attente.

## Fait

- `8124c4cf` — plan court, commité seul. Section 7 ter remplie. Les fichiers du serveur sont nommés : `frontend/Dockerfile` et `frontend/nginx.conf`.

## Vérifié

Aucun test lancé : il n'y a pas de code. Les fichiers cités ont été relus sur `origin/main` (`561fad19`).

## Écarts avec le plan

Aucun : le plan est le seul livrable.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Compiler `ngx_brotli` dans l'image nginx ? | proposition : oui, gzip conservé | en attente du coordinateur, ou du chef si c'est une dépendance de serveur |
| 2 | L'état vide garde-t-il la bibliothèque ? | proposition : non, la même apparition en CSS | en attente du coordinateur |

Le modèle de cette session est Grok 4.7. Le passage sous « Auto » n'est pas possible depuis cette session.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : M-9 → plan écrit (`8124c4cf`), pas validé, pas de code.
- Chantier : correctif hors chantier. M-11 est codée à part (`fix/qje-jeux-unite-neutre`, `4475a053`).

## Reste à faire, dans l'ordre

1. Réponse aux questions 1 et 2.
2. Le code, seulement après le « validé ».

## Commandes pour le chef de projet

Pas de push et pas de PR : le plan n'est pas validé.

## Prompt de reprise

```text
Tu reprends M-9 (qua-poids-application) du correctif hors chantier QUA,
sur la branche fix/qua-poids-application,
dans le dossier ..\travaux-planner\qua-poids-application.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/qualite/fix-qua-poids-application.md
et cette fiche (docs/sessions/2026-11-22-fix-qua-poids-application.md).
Fait : le plan court est commité (8124c4cf). Pas de code.
Reste : les questions 1 (compiler ngx_brotli) et 2 (état vide en CSS).
Questions en attente : 1 et 2, pour le coordinateur.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
