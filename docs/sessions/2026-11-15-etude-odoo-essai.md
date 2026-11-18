# Session du 2026-11-15 · Plan d'essai OpenEduCat · `etude/odoo-essai`

| | |
|---|---|
| Fait par | Claude Code (Sonnet 5.5) |
| Chantier | aucun (étude hors chantier, demande du chef) |
| Dossier de travail | dépôt principal |
| Dernier commit | voir `git log` de la branche |

## Objectif de la session

Préparer l'essai d'OpenEduCat Community (question n° 1 de la fiche du comparatif Odoo), sans l'exécuter.

## Plan

[08-plan-essai-openeducat.md](../etude-marche/08-plan-essai-openeducat.md). Décisions du chef le 15 novembre : plan écrit seulement, édition Community seulement, étude hors chantier.

## Fait

- Plan d'essai : 8 questions (E-1 à E-8), protocole, jeu de données en trois paliers, grille de comparaison avec Planner, livrables, limites.
- Ligne ajoutée dans `docs/plan/suivi.md`.

## Vérifié

Rien d'exécuté : documentation seule. Aucun logiciel installé.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| Q-1 | Jeu fictif écrit ici ou attendu de MOT-02 ? | proposé : écrit ici | ouverte |
| Q-2 | Machine de Ronny ou serveur de test ? | proposé : machine locale | ouverte |
| Q-3 | Essai Enterprise si l'édition libre n'a pas de générateur ? | proposé : décider après | ouverte |
| Q-4 | Palier C (600 élèves) nécessaire ? | proposé : oui | ouverte |
| Q-5 | Qui relit avant argumentaire ? | proposé : le chef | ouverte |

## État laissé

- `docs/plan/suivi.md` : ligne « plan d'essai OpenEduCat » (hors chantier).
- Le plan attend la validation du chef.

## Reste à faire, dans l'ordre

1. Le chef répond à Q-1 à Q-5 et valide le plan.
2. Installer l'environnement (conteneurs, hors dépôt) et exécuter les paliers A, B, C.
3. Écrire `09-resultats-essai-openeducat.md` et mettre à jour `07-comparatif-odoo.md`.

## Commandes pour le chef de projet

```powershell
git push -u origin etude/odoo-essai
gh pr create --base main --head etude/odoo-essai --title "Étude : plan d'essai d'OpenEduCat" --fill
```

## Prompt de reprise

```text
Tu reprends le plan d'essai d'OpenEduCat sur la branche etude/odoo-essai.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/etude-marche/08-plan-essai-openeducat.md et cette fiche
(docs/sessions/2026-11-15-etude-odoo-essai.md).
Fait : plan écrit et commité. Reste : attendre la validation du chef (Q-1 à Q-5),
puis installer et exécuter l'essai. Aucune installation avant « validé ».
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
