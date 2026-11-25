# Session du 2026-11-25 · M-9 · `fix/qua-poids-application`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QUA · correctif hors chantier (étude EP-18, M-9) |
| Dossier de travail | `..\travaux-planner\qua-poids-application` |
| Dernier commit | `1bf53cde` |

## Objectif de la session

Reprendre M-9. Vérifier si les questions 1 et 2 ont une réponse. Pas de code avant le « validé ».

## Plan

[docs/conception/qualite/fix-qua-poids-application.md](../conception/qualite/fix-qua-poids-application.md), en attente. Commit du plan : `8124c4cf`. Fiche du 22 nov. : `1bf53cde`.

## Fait

Aucun commit de code. Aucun fichier du plan modifié.

- Boîte `cursor/entree/` : aucun message non lu. Le rapport du 22 nov. à 18 h 33 (`sortie/2026-11-22-1833-m-9-plan.md`) n'a pas été relevé.
- `git fetch origin main` : `origin/main` est toujours `561fad19`. La branche reste deux commits devant, sans écart.
- `docs/plan/suivi.md` non modifié. Pas de push.

## Vérifié

Aucun test lancé : il n'y a pas de code. Le dossier de travail est propre (`git status` vide avant cette fiche).

## Écarts avec le plan

Aucun. L'étape 1 du plan (le plan seul, puis l'attente) n'est pas franchie.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Compiler `ngx_brotli` dans l'image nginx (`frontend/Dockerfile`) ? | proposition : oui, gzip conservé, `gzip_vary on` | en attente. Dépendance du serveur : si le coordinateur ne peut pas la trancher, elle remonte au chef. Pas de Dockerfile avant cet accord. |
| 2 | L'état vide garde-t-il la bibliothèque ? | proposition : non, la même apparition (0,18 s) en CSS | en attente du coordinateur |

Le modèle de cette session est Grok 4.7. Le passage sous « Auto » n'est pas possible depuis cette session.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : M-9 → plan écrit (`8124c4cf`), pas validé, pas de code. Branche `fix/qua-poids-application`, tête `1bf53cde` avant cette fiche.
- Chantier : correctif hors chantier. M-11 est codée à part (`fix/qje-jeux-unite-neutre`, `4475a053`).

## Reste à faire, dans l'ordre

1. Réponse aux questions 1 et 2.
2. Le code, seulement après le « validé » : Dockerfile et `nginx.conf` si la question 1 est oui ; coupure de l'import ; `EmptyState.jsx` en CSS si la question 2 suit la proposition ; test ; ligne du module ; mesure avant / après pour la PR.

## Commandes pour le chef de projet

Pas de push et pas de PR : le plan n'est pas validé.

## Prompt de reprise

```text
Tu reprends M-9 (qua-poids-application) du correctif hors chantier QUA,
sur la branche fix/qua-poids-application,
dans le dossier ..\travaux-planner\qua-poids-application.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/qualite/fix-qua-poids-application.md
et cette fiche (docs/sessions/2026-11-25-fix-qua-poids-application.md).
Fait : le plan court est commité (8124c4cf). Pas de code. Reprise du 25 nov. :
origin/main toujours 561fad19, aucune réponse en boîte.
Reste : les questions 1 (compiler ngx_brotli) et 2 (état vide en CSS).
Questions en attente : 1 et 2. La 1 remonte au chef si c'est une dépendance
de serveur ; la 2 est pour le coordinateur.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
