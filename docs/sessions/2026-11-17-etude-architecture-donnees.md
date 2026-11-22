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
- Réponses du chef à Q-30-1 à Q-30-6 et exigence « la base s'adapte à chaque structure » : § 10 de l'étude, decisions.md (17 nov.). Collations vérifiées sur le code : mélange certain sur toute base construite par les migrations.
- [Contre-expertise](../conception/plateforme/contre-expertise-architecture-donnees.md) par un sous-agent **Fable 5.2** : rester sur MySQL par défaut, essai resserré, personne séparée du compte, champs propres déclarés, R6 (23 fichiers hors contexte). Trois de ses constats vérifiés à la main (forçage dans `seances.js`, 87 modèles, `literal` à guillemets obliques).
- Réponses du chef aux questions 1 à 11 de la contre-expertise (dialogue du 17 nov.) : toutes les propositions retenues ; inscrites dans decisions.md.
- [Plan de l'essai PostgreSQL](../conception/plateforme/essai-postgresql.md), **à valider**.

## Vérifié

Rien à tester (aucun code). Les faits du § 2 de l'étude ont été relevés sur `main` (`bd934ebf`). La collation des tables récentes n'est **pas** vérifiée sur une base réelle : une requête sur `information_schema` est proposée (Q-30-5).

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| Q-30-1 | Horizon du nombre d'écoles à 3 et 7 ans | environ 10 écoles à 3 ans | répondue |
| Q-30-2 | Rouvrir la base pour un essai PostgreSQL court avant EXP-02b | oui (voir decisions.md, 17 nov.) | répondue |
| Q-30-3 | Champs propres créés par l'école, ou seulement profils et packs pays | oui (voir decisions.md, 17 nov.) | répondue |
| Q-30-4 | Le modèle d'extensions devient une règle pour VSC-01 | oui (voir decisions.md, 17 nov.) | répondue |
| Q-30-5 | R4 et R5 : où et quand | oui (voir decisions.md, 17 nov.) | répondue |
| Q-30-6 | Contre-expertise sous Fable 5.2 | oui (voir decisions.md, 17 nov.) | répondue |
| CE-12 à CE-15 | Questions 12 à 15 de la contre-expertise (hiérarchie, profil maternelle, double réservation, principe « code par profil ou pack ») | | en attente |
| E-1 à E-4 | Questions du plan de l'essai PostgreSQL (§ 3) | | en attente |

## État laissé

- `docs/plan/suivi.md` : étude hors chantier, commitée en local, à pousser.
- Aucun chantier touché ; aucune migration réservée.

## Reste à faire, dans l'ordre

1. Le chef valide le plan de l'essai PostgreSQL et répond à E-1 à E-4 (Docker lancé sur le poste).
2. Le chef répond aux questions 12 à 15 de la contre-expertise.
3. Le coordinateur informe Codex que PLA-06 passe à 50 bases (fiche `missions/pla-06.md`), et inscrit la reprise des 23 fichiers comme condition de EXP-06.
4. Après validation : essai sur la branche `etude/essai-postgresql`, rapport, puis décision du chef.

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
Fait aussi : réponses du chef, contre-expertise Fable 5.2, décisions du 17 nov., plan de
l'essai docs/conception/plateforme/essai-postgresql.md (à valider).
Reste : validation du plan de l'essai et questions E-1 à E-4 ; questions 12 à 15 de la
contre-expertise ; puis l'essai, sur la branche etude/essai-postgresql.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
