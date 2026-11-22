# Session du 2026-11-15 · reprise UIX-06a · `feat/uix-06a-interface`

| | |
|---|---|
| Fait par | Codex |
| Chantier | UIX fermé ; exception UIX-06a à valider |
| Dossier | `..\travaux-planner\uix-06a-interface` |
| Commits avant reprise | `db52aaef` (conception), `5ce34dd9` (fiche) |

## Objectif et plan

Vérifier la reprise de la [conception UIX-06a](../conception/interface/uix-06a-interface.md). Le prompt ne vaut pas validation. Aucun code avant accord explicite puis commit de cet accord.

## Fait

- Lu dans l’ordre : AGENTS, README/suivi/décisions, boîte, conception et fiche précédente ; puis missions, PR et kit approuvé.
- Branche publiée à `5ce34dd9`, PR [#185](https://github.com/Claude20022002/Planner/pull/185) ouverte en brouillon, sans commentaire ni relecture au contrôle.
- Aucune fiche UIX-06a ; aucun fichier frontend concurrent relevé dans les PR ouvertes consultées. MOT-03 (#183) porte du backend et de la documentation. Confirmation de coordination demandée dans le rapport.
- Message UIX-01a/MOT-02 laissé en entrée car MOT-02 reste à traiter séparément.
- Skill impeccable utilisé : contexte PRODUCT/DESIGN chargé, registre produit lu. Contexte historique HESTIM/panneau signalé, décisions et kit actuels prioritaires.
- Question 4 précisée selon N-4 et le kit : ardoise pour les commandes sans couleurs d’école ; bleu nuit pour la marque. Inter pour l’interface ; assemblage école et SVG conservés.
- Suivi et module mis à jour ; rapport dans la boîte de sortie du coordinateur.

## Vérifié

Dossier propre et branche attendue avant travail. Git/GitHub consultés en lecture seule. Kit et socle neutre recoupés. Contrôle prévu avant commit : `git diff --check`. Documentation seulement, aucun test produit ni serveur lancé.

## Questions au chef

1. Exception hors chantier pour ce pilote ? Proposition : oui, sans quatrième chantier.
2. Connexion, accueil/navigation, comptes, enseignants et étudiants ? Proposition : oui.
3. Lot visuel découplé de UIX-01, sans migration 0060 ni assistant ? Proposition : oui.
4. Interface sobre clair/sombre, Inter, ardoise sans couleurs d’école, bleu nuit pour la marque, identité d’école et SVG conservés ? Proposition : oui.

Plan et quatre réponses toujours en attente.

## État laissé

Conception en PR brouillon #185, à valider ; aucun code produit. EXP, PLA et MOT restent ouverts. Tableau des missions du coordinateur inchangé.

## Reste

Obtenir l’accord explicite du chef sur le plan et les quatre questions, vérifier la coordination du périmètre, inscrire puis commiter la validation avant implémentation.

## Commandes pour le chef

Depuis le dépôt principal, publier la mise à jour documentaire sur la PR existante :

```powershell
git -C "..\travaux-planner\uix-06a-interface" push origin feat/uix-06a-interface
gh pr view 185
```

## Prompt de reprise

```text
Tu reprends UIX-06a sur feat/uix-06a-interface dans
C:\Users\clusa\Desktop\Github Project\travaux-planner\uix-06a-interface.
Lis AGENTS.md, docs/plan/README.md, suivi.md, decisions.md, ta boîte
..\boites\codex\entree, la conception docs/conception/interface/uix-06a-interface.md
et docs/sessions/2026-11-15-feat-uix-06a-interface-2.md.
PR #185 en brouillon ; commits db52aaef et 5ce34dd9 publiés, vérifiés.
Aucun code produit. Plan et questions 1 à 4 attendent la validation explicite du chef.
Question 4 précisée : ardoise pour les commandes neutres, bleu nuit pour la marque.
Kit mosaïque approuvé du 11 novembre dans le dépôt planner-marketing voisin.
Après accord : inscrire puis commiter la validation avant de coder.
Vérifier la coordination frontend. Ne pas traiter MOT-02 dans cette session.
Pas de backend, migration, serveur, push ni fusion.
Fin : suivi, fiche, commit local et rapport au coordinateur.
```
