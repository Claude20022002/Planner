# Session du 2026-11-16 · QUA-08, étude 09 · `doc/qua-08-security`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | aucun : QUA-08 hors chantier (accord du chef le 16 nov.), étude 09 hors chantier |
| Dossier de travail | `..\travaux-planner\qua-08-security` ; aussi `..\travaux-planner\failles-erp-scolaires` et `..\travaux-planner\frappe-essai-local` |
| Dernier commit | voir `git log -1 doc/qua-08-security` |

## Objectif de la session

Reprise de l'étude des failles de cinq ERP scolaires (PR #186) et de l'essai en local chez Frappe Education. Ensuite, sur décision du chef, le plan de QUA-08 et `SECURITY.md`.

## Plan

- Étude 09 : pas de plan de conception (étude sans code).
- QUA-08 : [conception](../conception/qualite/qua-08-security.md), **validée par le chef le 16 nov.**

## Fait

Sur `etude/failles-erp-scolaires` (PR #186), trois commits non poussés :
- `0656ded` : document 09, § 5. Le canal de signalement de Frappe est corrigé. Leur `SECURITY.md` (dans `frappe/frappe`) demande un courriel. Le signalement privé de GitHub est fermé sur `frappe/education` et sur `frappe/frappe`, et l'avis `enroll_student` n'est pas arrivé par lui. Vérifié par l'API de GitHub et par frappe.io/security le 16 nov. La version du 15 nov. disait le contraire.
- `0812a4d` : les mentions de l'essai chez Frappe sont rendues neutres (décision du chef du 16 nov.), sans sujet ni branche essayés. Fichiers touchés : document 09, `decisions.md`, `suivi.md`, fiche du 15 nov. L'historique de Git garde l'ancienne version, déjà poussée.
- `e8b9619` : décision du 16 nov. sur le canal des failles de Planner, dans `decisions.md`, et critère de VIT-02 (catégorie « faille de sécurité » traitée en privé).

Sur `etude/frappe-essai-local`, un commit non poussé :
- `cf2b0a0` : sujet retiré de la fiche du 16 nov.

Sur `doc/qua-08-security`, branche **empilée sur `etude/failles-erp-scolaires`** (les lignes QUA-08 n'existent que dans #186) :
- `95fc78a` : plan de QUA-08, validé ;
- `2df707a` : `SECURITY.md`, une ligne dans le `README.md`, le module QUA et `suivi.md` ;
- la fiche que vous lisez.

Hors du dépôt, dans `..\travaux-planner\prive\` :
- la note privée est revérifiée le 16 nov. (lecture de GitHub seulement) ;
- le brouillon de la suite de l'essai est mis à jour (canal, champs demandés, réponses du chef).

## Vérifié

- `node scripts/verifier-neutre.mjs` passe sur `etude/failles-erp-scolaires` et sur `doc/qua-08-security`.
- `gh api repos/Claude20022002/Planner/private-vulnerability-reporting` répond `{"enabled":false}` le 16 nov. : le chef doit l'ouvrir.
- Aucun test automatique : documentation seulement. La CI de #186 était en cours au début de la session (5 contrôles en attente, 1 vert). Le résultat n'a pas été relu.
- Aucune installation de tiers sondée. Lecture de GitHub et de pages publiques seulement.

## Écarts avec le plan

- QUA-08 : deux phrases retirées de `SECURITY.md` (suivi entre les délais, prolongation possible des 90 jours), pour ne rien promettre de plus que la décision (§ 7 du plan).
- Branche empilée sur #186 au lieu de partir de `main`. C'est le moyen d'éviter un conflit sur `suivi.md` et sur le module QUA.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Expéditeur de la suite de l'essai | « Planner » + nom du chef | réglé (chef) |
| 2 | Calendrier de publication proposé au tiers | rien avant sa réponse, puis correctif ou 90 jours | réglé (chef) |
| 3 | Neutraliser les mentions de l'essai | oui | réglé (chef) ; fait dans `0812a4d`, `cf2b0a0` |
| 4 | Suite de la session | plan de QUA-08 hors chantier | réglé (chef) |
| 5 | Canal des failles de Planner | le site du SaaS (VIT-02) ; GitHub en attendant, puis à côté | réglé (chef) |
| 6 | Langue, versions, règles d'essai, dépôts, crédit, qui répond | voir le plan, § 3 | réglé (chef) |
| 7 | Crédit public dans la suite de l'essai ; nom du contact | à remplir par le chef dans le brouillon privé | en attente (chef) |

## État laissé

- `docs/plan/suivi.md` : QUA-08 → en cours (`doc/qua-08-security`), ligne hors chantier ajoutée ; ligne de #186 complétée.
- Module QUA : QUA-08 « en cours », `SECURITY.md` dans « Ce qui existe ». Module VIT : critère de VIT-02 complété.
- Aucun chantier ouvert ni fermé.

## Reste à faire, dans l'ordre

1. Le chef lit la note privée et le brouillon dans `..\travaux-planner\prive\`, remplit son nom et le crédit, puis envoie.
2. Le chef pousse `etude/failles-erp-scolaires` et fusionne #186.
3. Le chef pousse `doc/qua-08-security` et ouvre sa PR vers `main` (après la fusion de #186, la PR ne montre plus que QUA-08). Puis il ouvre le signalement privé du dépôt.
4. Fusion de la PR de QUA-08 : QUA-08 « fait » dans `suivi.md` et dans le module.
5. Après la réponse du tiers, ou à l'échéance : décider ce qui entre dans le document 09.
6. Ensuite : QUA-09 (liste des envois sortants) hors chantier si le chef l'accorde, avec son plan d'abord. Puis les points du § 6 du document 09.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\failles-erp-scolaires" push
git -C "..\travaux-planner\frappe-essai-local" push -u origin etude/frappe-essai-local
# après la fusion de #186 :
git -C "..\travaux-planner\qua-08-security" push -u origin doc/qua-08-security
gh pr create --base main --head doc/qua-08-security --title "QUA-08 : SECURITY.md et signalement privé des failles" --fill
gh api -X PUT repos/Claude20022002/Planner/private-vulnerability-reporting
```

## Prompt de reprise

```text
Tu reprends QUA-08 (SECURITY.md) et l'étude hors chantier « failles de cinq ERP scolaires » de Planner.
Branches : doc/qua-08-security (dossier ..\travaux-planner\qua-08-security, empilée sur
etude/failles-erp-scolaires, PR #186) et etude/frappe-essai-local (une fiche seulement).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la conception
docs/conception/qualite/qua-08-security.md (validée le 16 nov.), cette fiche
(docs/sessions/2026-11-16-doc-qua-08-security.md) et, hors du dépôt,
..\travaux-planner\prive\frappe-essai-note.md.
Fait : SECURITY.md écrit (signalement privé de GitHub, 7 jours et 90 jours au plus, le site
VIT-02 plus tard) ; document 09 corrigé et neutre ; décision du 16 nov. inscrite.
Reste : envoi de la suite de l'essai par le chef ; fusion de #186 puis de la PR de QUA-08 ;
signalement privé à ouvrir par le chef ; ensuite QUA-09 (plan d'abord) et le § 6 du document 09.
Rien de public sur l'essai chez le tiers avant sa réponse.
Règles : aucune affirmation sans source ni niveau de preuve ; ne jamais sonder une
installation de tiers ; pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
