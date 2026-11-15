# Session du 2026-11-15 · Étude comparatif Odoo · `doc/comparatif-odoo`

| | |
|---|---|
| Fait par | Claude Code (Sonnet 5.5) |
| Chantier | aucun (hors chantier, demande du chef) |
| Dossier de travail | dépôt principal (pas de dossier `..\travaux-planner`) |
| Dernier commit | `6bbe555` (document seul) ; le commit de cette fiche et de `suivi.md` suit |

## Objectif de la session

Comparer de façon exhaustive Planner et Odoo sur la gestion d'école, dans un fichier Markdown.

## Plan

Pas de plan de conception : livrable de documentation sans code. Le plan implicite : lire l'état réel de Planner (suivi, modules, code), lire les pages d'OpenEduCat (Odoo n'a pas d'application école), comparer par domaine, marquer le niveau de preuve de chaque affirmation.

## Fait

- `6bbe555` : `docs/etude-marche/07-comparatif-odoo.md`. Odoo est comparé en tant qu'Odoo + OpenEduCat ; sept domaines, coûts, synthèse, huit points à vérifier.
- Cette fiche et la ligne de `docs/plan/suivi.md` (tableau « hors chantier »).

## Vérifié

- Rien d'exécuté : documentation seule.
- Odoo et OpenEduCat : pages de l'éditeur (3 pages d'OpenEduCat lues, notes de version d'Odoo 19) et connaissance générale. **Aucun produit essayé.**
- Les pages d'OpenEduCat se contredisent sur l'édition de plusieurs modules (LMS, quiz, rapports, portail parents, placement) : signalé dans le document.
- Non vérifié : générateur d'emploi du temps d'OpenEduCat, CMI, Massar, plan comptable marocain, prix d'OpenEduCat Enterprise.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Installer l'édition libre d'OpenEduCat pour tester son générateur sur le jeu du collège de MOT-02 ? | | ouverte |
| 2 | Le document va-t-il dans un argumentaire (MKT) ? Si oui, d'abord les vérifications du § 7. | | ouverte |

## État laissé

- `docs/plan/suivi.md` : ligne ajoutée dans « Travaux en cours hors chantier ».
- Aucun chantier touché.

## Reste à faire, dans l'ordre

1. Le chef pousse et ouvre la PR.
2. Répondre aux questions 1 et 2.
3. Si l'essai d'OpenEduCat est décidé, ouvrir une tâche d'étude dédiée.

## Commandes pour le chef de projet

```powershell
git push -u origin doc/comparatif-odoo
gh pr create --base main --head doc/comparatif-odoo --title "Étude : comparatif Planner et Odoo (gestion d'école)" --fill
```

## Prompt de reprise

```text
Tu reprends l'étude « comparatif Odoo » sur la branche doc/comparatif-odoo.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/etude-marche/07-comparatif-odoo.md et cette fiche
(docs/sessions/2026-11-15-doc-comparatif-odoo.md).
Fait : comparatif écrit et commité, suivi et fiche à jour.
Reste : pousser et PR (par le chef) ; vérifier les 8 points du § 7 si le chef le demande.
Questions en attente : 1 (essai d'OpenEduCat), 2 (usage en argumentaire).
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
