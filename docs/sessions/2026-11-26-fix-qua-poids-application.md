# Session du 2026-11-26 · M-9 · `fix/qua-poids-application`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | QUA · correctif hors chantier (étude EP-18, M-9) |
| Dossier de travail | `..\travaux-planner\qua-poids-application` |
| Dernier commit | `f47d721f` |

## Objectif de la session

Reprendre M-9. Le message du coordinateur du 25 nov. à 23 h 01 donne les réponses officielles. Elles sont l'inverse de ce que le code `94413605` a fait. Corriger le plan, puis le code.

## Plan

[docs/conception/qualite/fix-qua-poids-application.md](../conception/qualite/fix-qua-poids-application.md), corrigé le 26 nov. (`f4561217`). Question 1 : non, pas de brotli (décision du chef). Question 2 : l'apparition de l'état vide passe en CSS (décision du coordinateur). La fiche du 25 nov. avait lu ces réponses à l'envers.

## Fait

- `f4561217` — le plan seul, avant le code.
- `f47d721f` — `frontend/Dockerfile` revient au fichier d'avant le module brotli. `nginx.conf` garde gzip et ajoute `gzip_vary on`. `EmptyState.jsx` reprend la même apparition en CSS (0,18 s, opacité, échelle 0,98, courbe `0.16, 1, 0.3, 1`). Le test lit aussi l'état vide. Une ligne du module QUA.

`vite.config.js`, `DashboardLayout.jsx`, `IconeApplication.jsx`, `TuileApplication.jsx`, le site vitrine et `deploy/vps/nginx-hestim.conf` ne changent pas dans ce commit. `docs/plan/suivi.md` non plus. Pas de push.

La branche distante a déjà `34d726df` : le push lancé depuis le dépôt a réussi, la création de la PR a échoué (`gh` introuvable dans ce PowerShell). Les deux commits de cette session sont en avance, non poussés.

## Vérifié

Mesure hors dépôt, même lecture que l'étude (imports statiques depuis `index.html`, gzip niveau 9, brotli qualité 11). Le serveur n'envoie que gzip : la colonne brotli est celle du script.

| Chargement | Avant le code, gzip | Après, gzip | Animation après |
|---|---|---|---|
| Premier (`index.html`) | 339,0 Ko (brotli 281,3) | 339,0 Ko (brotli 281,3) | — |
| Appel, en plus | 99,8 Ko | 63,0 Ko | 0 |
| Tableau de bord de l'étudiant, en plus | 96,6 Ko | 59,8 Ko | 0 |
| Emploi du temps mensuel, en plus | 92,2 Ko | 55,5 Ko | 0 |
| Espace de la classe, en plus | 97,4 Ko | 60,7 Ko | 0 |
| Lanceur, en plus | — | 88,6 Ko | 35,9 Ko |

L'emploi du temps mensuel et l'espace de la classe perdaient encore les 35,9 Ko dans le code `94413605`, parce que l'état vide gardait la bibliothèque. Ils ne les chargent plus.

- `node --test src/components/applications/animation-hors-coquille.test.js` : 4 réussis, 0 échec.
- `npx eslint` sur `IconeApplication.jsx`, `TuileApplication.jsx`, `EmptyState.jsx` et le test : sans message.
- `node scripts/verifier-neutre.mjs` : aucun nom d'école en dur.
- Conteneur `nginx:1.27.5` avec ce `nginx.conf`, page de 4 000 octets, `--add-host studylib:127.0.0.1`, port 18081. `Accept-Encoding: gzip` : `Content-Encoding: gzip` et `Vary: Accept-Encoding`. `Accept-Encoding: br` seul : pas de `Content-Encoding`. `gzip` et `br` ensemble : gzip. Conteneur retiré. L'image de l'application n'a pas été reconstruite : le `Dockerfile` est identique à celui d'avant `94413605`.
- Parcours : non lancés. La CI les fait. Aucun texte d'écran n'a changé.
- L'état vide n'a pas été ouvert dans un navigateur : il faut une session et une liste vide.

## Écarts avec le plan

Aucun. Le code `94413605` est l'écart corrigé par cette session.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Compiler `ngx_brotli` dans l'image nginx ? | non | répondue, chef, 25 nov. 23 h 01 |
| 2 | L'apparition de l'état vide passe-t-elle en CSS ? | oui | répondue, coordinateur, même message |

Le modèle de cette session est Grok 4.7. Le passage sous « Auto » n'est pas possible depuis cette session.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : M-9 → code corrigé (`f47d721f`), plan corrigé (`f4561217`), la distante est à `34d726df`, pas de PR.
- Chantier : correctif hors chantier. M-9 (c), le plafond, n'est pas dans ce correctif.

## Reste à faire, dans l'ordre

1. Le chef pousse les deux commits et ouvre la PR. Le coordinateur relit.
2. M-9 (c) reste un choix du chef, après cette mesure.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qua-poids-application" push origin fix/qua-poids-application
gh pr create --base main --head fix/qua-poids-application --title "M-9 : l'animation hors de la coquille" --fill
```

La branche est déjà sur le dépôt, au commit `34d726df`. `gh` n'est pas dans le PowerShell de ce poste : la page pour ouvrir la PR est https://github.com/Claude20022002/Planner/pull/new/fix/qua-poids-application

## Prompt de reprise

```text
Tu reprends M-9 (qua-poids-application) du correctif hors chantier QUA,
sur la branche fix/qua-poids-application,
dans le dossier ..\travaux-planner\qua-poids-application.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/qualite/fix-qua-poids-application.md
et cette fiche (docs/sessions/2026-11-26-fix-qua-poids-application.md).
Fait : le message du 25 nov. 23 h 01 dit non au brotli (chef) et oui au
passage de l'état vide en CSS (coordinateur). Plan corrigé (f4561217),
code corrigé (f47d721f). Premier chargement 339,0 Ko gzip. Appel 63,0 Ko
en plus, emploi du temps mensuel 55,5 Ko, espace de la classe 60,7 Ko,
sans le morceau animation. Le lanceur le garde (35,9 Ko). La distante
est encore à 34d726df. Pas de PR.
Reste : le chef pousse et ouvre la PR ; le coordinateur relit.
M-9 (c) est hors périmètre.
Questions en attente : aucune.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
