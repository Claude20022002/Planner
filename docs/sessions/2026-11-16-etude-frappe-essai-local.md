# Session du 2026-11-16 · Étude hors chantier · `etude/frappe-essai-local`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session commencée le 15 nov. au soir |
| Chantier | aucun : étude hors chantier, décision du chef du 15 nov. (question 6 de l'étude des failles des ERP scolaires) |
| Dossier de travail | `..\travaux-planner\frappe-essai-local` |
| Dernier commit | voir `git log -1 etude/frappe-essai-local` |

**Fiche volontairement sans détail technique** : le dépôt est public, et rien ne se publie avant la réponse de Frappe (décision du chef du 15 nov.). Le détail est hors du dépôt, dans `..\travaux-planner\prive\`.

## Objectif de la session

Reprise de l'étude des failles de cinq ERP scolaires (PR #186). Le chef a choisi de faire, dans cette session, l'essai en local d'une branche non publiée de Frappe Education. L'essai porte sur le contrôle d'accès aux fiches d'élèves, avant un éventuel signalement privé.

## Plan

Pas de plan de conception : étude sans code de Planner. La marche à suivre a été fixée par le chef le 15 nov. et précisée au début de la session (questions 1 à 4 ci-dessous) :
- installation **jetable** en Docker, sur la machine locale seulement, avec des **données fictives** ;
- aucune installation de tiers sondée ;
- dans le dépôt, seulement une ligne neutre et cette fiche.

## Fait

- Sur `etude/failles-erp-scolaires` (PR #186) :
  - `ae0f52c` : délai promis par le futur `SECURITY.md` (QUA-08), dans `decisions.md` et dans le critère de QUA-08 ;
  - `208cad1` : ligne de l'essai dans `suivi.md`.
- Sur cette branche : cette fiche.
- Hors du dépôt, dans `..\travaux-planner\prive\` :
  - le résultat de l'essai, ajouté à `frappe-education-develop.md` ;
  - le brouillon du signalement, `frappe-signalement-brouillon.md` ;
  - les fichiers de l'essai, dans `frappe-essai\`.

## Vérifié

- L'installation a été faite en local, dans des conteneurs dont le port n'était lié qu'à 127.0.0.1, puis l'essai a été lancé depuis le conteneur lui-même. Les commits exacts essayés sont notés dans la note privée.
- L'installation jetable a été supprimée en fin d'essai : conteneurs, volumes et réseau (`docker compose down -v`). Les scripts permettent de refaire l'essai.
- Aucune donnée réelle, aucune installation de tiers.
- `node scripts/verifier-neutre.mjs` : voir le contrôle de fin de session.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quelle tâche pour cette session ? | l'essai de Frappe | réglé (chef, 15 nov.) |
| 2 | Comment installer ? | Docker jetable | réglé (chef) |
| 3 | Délai promis par `SECURITY.md` (QUA-08) ? | accusé de réception sous 7 jours, correctif ou avis sous 90 jours au plus | réglé (chef) ; inscrit dans `ae0f52c` |
| 4 | Que mettre dans le dépôt public avant la réponse de Frappe ? | une ligne neutre et cette fiche | réglé (chef) |
| 5 | Envoyer le signalement privé à Frappe, d'après le brouillon de `..\travaux-planner\prive\` ? | à lire par le chef | en attente (chef) |

## État laissé

- `docs/plan/suivi.md` (sur `etude/failles-erp-scolaires`) : essai « fait en local le 16 nov. ; résultat et suite hors du dépôt ».
- Aucun chantier touché. Aucune fonction du plan n'a changé d'état.

## Reste à faire, dans l'ordre

1. Le chef lit la note privée et le brouillon dans `..\travaux-planner\prive\`. S'il est d'accord, il envoie le signalement par le canal privé du dépôt de Frappe Education.
2. Le chef pousse `etude/failles-erp-scolaires` (deux commits de plus), puis fusionne la PR #186.
3. Le chef pousse cette branche s'il le souhaite. Elle ne contient que cette fiche.
4. Après la réponse de Frappe, ou à l'échéance convenue avec eux : décider ce qui peut entrer dans le document 09 (§ 2.2 et § 6).
5. Ensuite, en « libre » : QUA-08 (`SECURITY.md`, délai fixé) et QUA-09 (liste des envois sortants). Puis les points du § 6 du document 09.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\failles-erp-scolaires" push
git -C "..\travaux-planner\frappe-essai-local" push -u origin etude/frappe-essai-local
```

## Prompt de reprise

```text
Tu reprends l'étude hors chantier « failles de cinq ERP scolaires » de Planner.
Branches : etude/failles-erp-scolaires (PR #186, dossier ..\travaux-planner\failles-erp-scolaires)
et etude/frappe-essai-local (dossier ..\travaux-planner\frappe-essai-local, une fiche seulement).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/etude-marche/09-failles-erp-scolaires.md, la fiche
docs/sessions/2026-11-16-etude-frappe-essai-local.md, et, hors du dépôt,
..\travaux-planner\prive\frappe-education-develop.md.
Fait : document 09 ; décisions du 15 nov. inscrites (EP-13, PLA-04, QUA-08 avec son délai
de 7 j et 90 j, QUA-09, MOB, ETA-02) ; essai en local de Frappe Education fait le 16 nov.,
résultat et brouillon de signalement hors du dépôt.
Reste : envoi du signalement privé par le chef ; fusion de #186 ; rien de public sur
Frappe avant leur réponse ; ensuite QUA-08, QUA-09 et les points du § 6.
Règles : aucune affirmation sans source ni niveau de preuve ; ne jamais sonder une
installation de tiers ; pas de code hors d'un plan validé ; questions avant toute
supposition ; fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
