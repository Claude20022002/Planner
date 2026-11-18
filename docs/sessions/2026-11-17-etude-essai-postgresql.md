# Session du 2026-11-17 · essai PostgreSQL (Q-30) · `etude/essai-postgresql`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | aucun (étude hors chantier, accordée par le chef le 17 nov.) |
| Dossier de travail | `..\travaux-planner\essai-postgresql` (branche créée depuis `etude/architecture-donnees`) |
| Dernier commit | voir `git log -1` de la branche |

## Objectif de la session

Mener l'essai PostgreSQL resserré, selon son plan validé : [essai-postgresql.md](../conception/plateforme/essai-postgresql.md).

## Plan

Plan validé par Claude20022002 le 17 nov. (« Je valide le plan de l'essai, Docker est lancé »), propositions du § 3 retenues.

## Fait

- Commit du plan validé et de `suivi.md` à « en cours ».
- Pilote `pg` et `pg-hstore` ajoutés au serveur (branche d'essai seulement).
- Tests : la remise à zéro bâtit la base PostgreSQL depuis les modèles (`tests/integration/helpers/schemaPostgres.js`), plus `CompteursDebit` et les 12 unicités qui n'existent que dans les migrations.
- Application : 10 fichiers rendus portables (verrous `FOR UPDATE OF`, `SUM` booléen, `GET_LOCK`, upsert, `JSON_CONTAINS`, supervision, `COUNT DISTINCT`) ; 3 `TINYINT` en `SMALLINT`.
- Bancs : `scripts/essais/postgresql/collations.mjs` (critère 6) et `champsPropres.mjs` (critère 3).
- [Rapport intermédiaire](../conception/plateforme/rapport-essai-postgresql.md) : critères 1, 2, 3 et 6.

## Vérifié

- MySQL 8.4.13, base en mémoire : **612/612** avant l'essai (823 s) et **612/612** après les corrections (849 s).
- PostgreSQL 18.7 : 470/612 sans rien changer, **556/612** après corrections. Les 56 restants viennent du SQL MySQL écrit dans 12 fichiers de tests (vérifié sur `valeursMoteur` : 20/20 sans son bloc de migrations), sauf une différence d'API (heure `13:30:00`, rapport § 2.3).
- Critère 3 : égalité (p95 7,8 ms contre 6,4 ms ; seuil 50 ms). Critère 6 : PostgreSQL par défaut échoue sur 5 comportements sur 5 ; ICU non déterministe les tient, colonne par colonne.
- Sur ce poste, une base MySQL de test **sur disque** fait échouer la suite par délai (migrations > 30 s) et Jest manque de mémoire : bases en `tmpfs` et `NODE_OPTIONS=--max-old-space-size=4096` obligatoires.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| E-5 | Les corrections portables du § 2.1 du rapport (et les 12 unicités inscrites dans les modèles) méritent-elles une PR à part vers `main`, même si l'on reste sur MySQL ? | **oui** (chef, 18 nov.) : tâche `refactor/` à part | répondue |
| E-6 | Décision du moteur, selon la règle du plan (rapport, § 7) : le gain du critère 5 (exclusion en base) est-il décisif ? | **rester sur MySQL** (chef, 18 nov.) | répondue |

## État laissé

- `docs/plan/suivi.md` : essai PostgreSQL en cours, critères 1, 2, 3, 6 mesurés.
- Conteneurs `essai_mysql_test` (port 3307) et `essai_pg_test` (port 5433) laissés lancés ; leurs données sont en mémoire et disparaissent à l'arrêt. Les conteneurs `finadmintech-*` d'un autre projet n'ont pas été touchés.

## Fait le 18 nov. (même session, à la demande du chef)

- Critères 4 et 5 (`migrationEtExclusion.mjs`), 7 (`charge.mjs`), 8 (`sauvegardeEcole.sh`), 9 (`convertir.mjs`, `comparerApi.mjs`) ; rapport final, § 7 : recommandation « rester sur MySQL ».
- Conteneurs de mesure supprimés ; `essai_mysql_test` et `essai_pg_test` gardés pour la PR séparée.

## Reste à faire, dans l'ordre (mis à jour le 18 nov.)

1. ~~Décision du moteur~~ : **MySQL reste** (chef, 18 nov.), inscrite dans decisions.md.
2. Tâche `refactor/` séparée : reprendre sur `main` les corrections portables du § 2.1 et inscrire les 12 unicités dans les modèles, avec un test de régression ; plan court à valider.
3. Le chef pousse les branches ; seul le rapport de l'essai est fusionné.

### Ancienne liste (17 nov.), faite

1. Critère 4 : migration de trois instructions qui échoue à la deuxième, sur les deux moteurs ; temps de remise en état sous MySQL.
2. Critère 5 : contrainte d'exclusion partielle (séances actives non forcées, même salle, plages qui se chevauchent, toutes grilles), et ce que fait MySQL à la place.
3. Critère 7 : mémoire de PostgreSQL avec 10 bases à côté d'un MySQL (StudyLib), sous la charge de PLA-06 réduite (1,5 Gio au plus).
4. Critère 8 : sauvegarde et restauration d'une seule école à une heure donnée, chiffrée à clé publique d'essai.
5. Critère 9 : jeu fictif de `seed.js` converti de MySQL vers PostgreSQL ; mêmes comptes de lignes.
6. Rapport final, règle de décision, fiche, `suivi.md` ; le chef inscrit la décision.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\etude-architecture-donnees" push -u origin etude/architecture-donnees
git -C "..\travaux-planner\essai-postgresql" push -u origin etude/essai-postgresql
# Le code de l'essai n'est jamais fusionné : PR en brouillon, pour la relecture seulement
gh pr create --draft --base etude/architecture-donnees --head etude/essai-postgresql --title "Essai PostgreSQL (Q-30) : rapport intermédiaire" --fill
```

## Prompt de reprise

```text
Tu reprends l'essai PostgreSQL (Q-30), étude hors chantier, sur la branche
etude/essai-postgresql, dans le dossier ..\travaux-planner\essai-postgresql.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, le plan validé
docs/conception/plateforme/essai-postgresql.md, le rapport intermédiaire
docs/conception/plateforme/rapport-essai-postgresql.md et cette fiche
(docs/sessions/2026-11-17-etude-essai-postgresql.md).
Fait : les neuf critères ; rapport final avec la recommandation « rester sur MySQL » (§ 7).
Décision du chef (18 nov.) : MySQL reste. Reste : la tâche refactor/ séparée des corrections portables
et des 12 unicités (plan court à valider).
Environnement : Docker Desktop ; conteneurs essai_mysql_test (3307) et essai_pg_test (5433),
données en mémoire (tmpfs) ; recréer avec MSYS_NO_PATHCONV=1 sous Git Bash ; tests avec
NODE_OPTIONS=--max-old-space-size=4096 ; PostgreSQL : DB_DIALECT=postgres DB_PORT=5433 DB_USER=postgres.
Ne jamais toucher aux conteneurs finadmintech-* d'un autre projet.
Questions en attente : E-5 (corrections portables vers main).
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
