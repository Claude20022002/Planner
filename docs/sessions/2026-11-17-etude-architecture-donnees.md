# Session du 2026-11-17 · étude hors chantier · `etude/architecture-donnees`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) ; modèle conseillé pour la contre-expertise : Fable 5.2 |
| Chantier | aucun (étude hors chantier, demande directe du chef, comme #174) |
| Dossier de travail | `..\travaux-planner\etude-architecture-donnees` |
| Dernier commit | voir `git log -1` de la branche |

## Objectif de la session

Demande du chef : analyser l'architecture de la base de données de Planner pour de nombreux établissements aux données de types, structures et formes différents ; dire si MySQL tiendra ; proposer des améliorations justifiées, pour le long terme.

## Plan

Étude sur dossier, sans code : lecture du plan, des décisions D-01 à D-21, de QUA-03 (pile), de C-5, de PLA-06 (#164) et du code de `backend/` (modèles, migrations, contexte d'école).

## Fait

- [etude-architecture-donnees.md](../conception/plateforme/etude-architecture-donnees.md) : constats vérifiés dans le code, besoins du produit, cinq risques (R1 à R5), challenge MySQL contre PostgreSQL et autres moteurs, modèle « noyau strict, extensions déclarées », règles de schéma, plan et questions Q-30-1 à Q-30-6.
- `docs/plan/decisions.md` : question ouverte Q-30.
- `docs/plan/suivi.md` : ligne dans « Travaux en cours hors chantier ».
- `docs/conception/README.md` : lien vers l'étude.

## Vérifié

Rien à tester (aucun code). Les faits du § 2 de l'étude ont été relevés sur `main` (`bd934ebf`). La collation des tables récentes n'est **pas** vérifiée sur une base réelle : une requête sur `information_schema` est proposée (Q-30-5).

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| Q-30-1 | Horizon du nombre d'écoles à 3 et 7 ans | | en attente |
| Q-30-2 | Rouvrir la base pour un essai PostgreSQL court avant EXP-02b | | en attente |
| Q-30-3 | Champs propres créés par l'école, ou seulement profils et packs pays | | en attente |
| Q-30-4 | Le modèle d'extensions devient une règle pour VSC-01 | | en attente |
| Q-30-5 | R4 et R5 : où et quand | | en attente |
| Q-30-6 | Contre-expertise sous Fable 5.2 | | en attente |

## État laissé

- `docs/plan/suivi.md` : étude hors chantier, commitée en local, à pousser.
- Aucun chantier touché ; aucune migration réservée.

## Reste à faire, dans l'ordre

1. Le chef lit l'étude et répond à Q-30-1 à Q-30-6.
2. Si Q-30-6 : contre-expertise par une session Fable 5.2, sur cette branche ou une branche `etude/` voisine.
3. Si Q-30-2 : le chef ouvre une fonction d'essai PostgreSQL (taille M) ; plan de conception à valider avant tout code.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\etude-architecture-donnees" push -u origin etude/architecture-donnees
gh pr create --base main --head etude/architecture-donnees --title "Étude : architecture des données sur le long terme (MySQL ou PostgreSQL)" --fill
```

## Prompt de reprise

```text
Tu reprends l'étude hors chantier « architecture des données », sur la branche
etude/architecture-donnees, dans le dossier ..\travaux-planner\etude-architecture-donnees.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/plateforme/etude-architecture-donnees.md et cette fiche
(docs/sessions/2026-11-17-etude-architecture-donnees.md).
Fait : l'étude (risques R1 à R5, challenge MySQL/PostgreSQL, modèle « noyau strict,
extensions déclarées », plan), la question Q-30 dans decisions.md.
Reste : réponses du chef à Q-30-1 à Q-30-6 ; selon elles, contre-expertise (Fable 5.2)
ou plan de l'essai PostgreSQL.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
