# Session du 2026-11-27 · QJE-15 · `feat/qje-15-jeux-par-niveau`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-15-jeux-par-niveau` |
| Dernier commit | le commit de cette fiche ; catalogue `6cea20bf`, fiche `1415b56f` |

## Objectif de la session

Poser la planche hors dépôt, pour le visa des accroches et de la voie d'image. Aucun écran.

## Plan

[docs/conception/jeux/qje-15-jeux-par-niveau.md](../conception/jeux/qje-15-jeux-par-niveau.md) · § 4 bis, point 5.

## Fait

- La branche distante est à `1415b56f` (catalogue et fiche).
- Planche : `..\travaux-planner\qje-15-planche\index.html`. Six cadres (web, mobile, site, en 390 px et en 1 440 px). Le tableau du haut reprend les onze accroches et la voie. Les dessins sont des esquisses, avec le badge Vue ou Codex.
- Rien de la planche n'est dans le dépôt. `suivi.md` n'est pas modifié.

## Vérifié

Page ouverte dans le navigateur. Les onze jeux du web sont dans l'ordre du tableau, sous Supérieur puis les quatre domaines. Le site omet le terminal. Le mobile montre cinq jeux d'un module, et omet les domaines vides. Une carte web en 390 px montre le badge, l'esquisse, le titre, l'accroche, la barre et Jouer.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 5 | Les accroches | les onze phrases du tableau de la planche | en attente du chef |
| 6 | La voie d'image | Vue pour neuf jeux, Codex pour Labo Big-O et Requête Parfaite | en attente du chef |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-15 → planche prête, hors dépôt ; écrans après le visa et #229
- La montée d'Astro attend 19 h 02 UTC, sur `fix/audit-vitrine`

## Reste à faire, dans l'ordre

1. Le chef vise les questions 5 et 6 sur la planche.
2. Les trois écrans, après ce visa et après #229.
3. À partir de 19 h 02 UTC, la montée d'Astro, quand le coordinateur relance.

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
et cette fiche (docs/sessions/2026-11-27-feat-qje-15-jeux-par-niveau-5.md).
Fait : le catalogue est poussé (1415b56f). La planche est hors dépôt,
..\travaux-planner\qje-15-planche\index.html : six cadres, web, mobile, site,
390 et 1440 px. Les esquisses portent le badge Vue ou Codex.
Aucun écran.
Reste : le visa du chef sur les questions 5 et 6, puis les écrans après #229.
L'audit vitrine attend 19 h 02 UTC (astro 7.4.12 et @astrojs/react 7.1.9).
Questions en attente : 5 (accroches), 6 (voie d'image).
Règles : pas d'écran avant le visa ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
