# Session du 2026-11-18 · VSC-01 · Modèle de données du scolaire

| | |
|---|---|
| Fait par | Codex |
| Chantier | VSC-01 en conception, exception accordée par le chef avant l’ouverture du chantier VSC |
| Dossier de travail | `..\travaux-planner\vsc-01-modele-scolaire` |
| Branche | `etude/vsc-01-modele-scolaire` |

## Fait

- `268efeb8` consigne la validation du plan C-5 par le chef dans un commit dédié.
- `b1f95031` rédige la conception C-5, les trois diagrammes, les règles et recettes attendues, la séquence
  de migrations et l’inventaire des consommateurs de l’adresse du compte. Il consigne les arbitrages dans
  le registre des décisions et actualise les fiches VSC et ADM.
- Le registre a été mis en cohérence sur D-06 et Q-20 dans `d97730fa`. Le contrat MOT-01 et les réglages d’école sont reliés à la conception.
- Le chef confirme l’inscription et l’affectation avant création du compte, l’accès parent mono-école,
  les périmètres ADM et VSC et les règles des notes et des frais.

## Vérifié

- Base de lecture `origin/main` à `e82f0bf4`. Vérification des modèles, de la migration de base et des lecteurs
  d’appartenance. Inventaire Q-20 côté serveur, site, mobile et exploitation.
- Contrôle documentaire des 11 sections, des 14 questions historiques, des 3 blocs Mermaid et des liens locaux.
  Contrôle Git des espaces et du périmètre. Les diagrammes n’ont pas fait l’objet d’un rendu.
- Conception seule. Les migrations et cas de test décrits sont des livrables des futurs lots.

## État et reste à faire

- Pour le coordinateur, VSC-01 est en cours, conception rédigée en attente de relecture des deux groupes.
- Revoir la stratégie de reprise des associations historiques et les consommateurs indirects de Q-20.
  Faire confirmer le détail des droits de correction par la scolarité et les règles de reçu par l’expert-comptable.
- À chaque plan de mise en œuvre, faire attribuer par le coordinateur les numéros précis dans la plage
  0062 à 0079, puis faire valider le schéma partagé et les migrations par le chef.

## Commandes pour le chef

```powershell
git -C "..\travaux-planner\vsc-01-modele-scolaire" push -u origin etude/vsc-01-modele-scolaire
gh pr create --base main --head etude/vsc-01-modele-scolaire --title "VSC-01 · Conception du modèle de données du scolaire" --fill
```

## Prompt de reprise

```text
Reprends VSC-01 sur etude/vsc-01-modele-scolaire dans ..\travaux-planner\vsc-01-modele-scolaire.
Lis AGENTS.md, docs/plan/suivi.md, la boîte Codex et la fiche de session.
Lis la conception C-5 et l’étude d’impact Q-20. Le chef a validé le plan et les arbitrages le 18 novembre.
Fais relire la conception par les deux groupes, vérifie la transition des associations historiques et
l’inventaire des consommateurs indirects. Les lots futurs feront valider leurs migrations. Aucun push.
```
