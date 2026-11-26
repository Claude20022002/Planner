# Session du 2026-11-26 · M-9 · `fix/qua-poids-application`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QUA · correctif hors chantier (étude EP-18, M-9) |
| Dossier de travail | `..\travaux-planner\qua-poids-application` |
| Dernier commit | `645049f1` |

## Objectif de la session

Enregistrer l'ouverture de la PR. Aucun code : le plan corrigé est déjà sur la distante.

## Plan

[docs/conception/qualite/fix-qua-poids-application.md](../conception/qualite/fix-qua-poids-application.md), corrigé le 26 nov. (`f4561217`). Pas de brotli (chef). L'état vide apparaît en CSS (coordinateur).

## Fait

Aucun fichier de code. Le chef a poussé `645049f1` et ouvert la PR.

- PR **#272**, ouverte, pas un brouillon : https://github.com/Claude20022002/Planner/pull/272
- Titre : « M-9 : l'animation hors de la coquille »
- Tête : `645049f1` (`fix/qua-poids-application`)
- Base : `main` (`7f99c899`)

`docs/plan/suivi.md` non modifié. Pas de push depuis cette session.

## Vérifié

- L'API de la PR #272 : état `open`, tête `645049f1`, fusion possible.
- L'état combiné du commit `645049f1`, lu à 01 h 12 : `pending`, aucun statut publié. La CI n'a pas encore rendu son verdict.
- Les tests et la mesure n'ont pas été relancés : le code n'a pas changé depuis `f47d721f`. Premier chargement 339,0 Ko gzip. En plus : appel 63,0 Ko, emploi du temps mensuel 55,5 Ko, espace de la classe 60,7 Ko, sans animation. Le lanceur garde 35,9 Ko.
- `node scripts/verifier-neutre.mjs` : aucun nom d'école en dur (7 exceptions déjà justifiées).

## Écarts avec le plan

Aucun dans le code.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Compiler `ngx_brotli` dans l'image nginx ? | non | répondue, chef, 25 nov. 23 h 01 |
| 2 | L'apparition de l'état vide passe-t-elle en CSS ? | oui | répondue, coordinateur, même message |

Le modèle de cette session est Grok 4.7. Le passage sous « Auto » n'est pas possible depuis cette session.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : M-9 → PR ouverte #272, tête `645049f1`.
- Chantier : correctif hors chantier. M-9 (c), le plafond, n'est pas dans ce correctif.

## Reste à faire, dans l'ordre

1. Le chef pousse cette fiche. Elle s'ajoute à la PR #272.
2. Le coordinateur relit. La CI doit être verte avant toute fusion.
3. M-9 (c) reste un choix du chef, après la mesure déjà écrite dans la PR.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qua-poids-application" push origin fix/qua-poids-application
```

## Prompt de reprise

```text
Tu reprends M-9 (qua-poids-application) du correctif hors chantier QUA,
sur la branche fix/qua-poids-application,
dans le dossier ..\travaux-planner\qua-poids-application.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/qualite/fix-qua-poids-application.md
et cette fiche (docs/sessions/2026-11-26-fix-qua-poids-application-3.md).
Fait : pas de brotli (chef), état vide en CSS (coordinateur).
Plan f4561217, code f47d721f. PR #272 ouverte, tête 645049f1,
base main. Premier chargement 339,0 Ko gzip. Appel 63,0 Ko,
emploi du temps mensuel 55,5 Ko, espace de la classe 60,7 Ko,
sans animation. Le lanceur garde 35,9 Ko.
À 01 h 12 le 26 nov., l'état combiné du commit était pending.
Reste : le coordinateur relit ; la CI doit être verte avant la fusion.
M-9 (c) est hors périmètre.
Questions en attente : aucune.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
