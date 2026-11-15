# Mission · PLA-03b · Schéma de départ

| | |
|---|---|
| État | ouverte |
| Agent | Claude Code, session `plan-b-projet-pacte-9d` (celle de PLA-03a), mission envoyée par message direct le 2026-11-15 ; le plan a été écrit par un agent du coordinateur |
| Modèle recommandé | le plus capable : Claude Fable 5.2, sinon Opus 5.5. Chargement de toute base neuve, test d'équivalence strict : une erreur passe en production |
| Attribuée le | 2026-11-15, par le coordinateur ; accord du chef : oui, le 2026-11-15 |
| Module et chantier | [PLA](../modules/PLA-plateforme.md) · chantier ouvert le 2026-11-09 |
| Fonction | PLA-03b : une base neuve se crée d'un schéma de départ au lieu de rejouer les 60 migrations · taille : partie de PLA-03 (M) |
| Branche | `feat/pla-03b-schema-depart`, depuis `origin/main` (PLA-03a, #173, y est fusionnée) |
| Dossier de travail | `..\travaux-planner\pla-03b-schema-depart` |
| Plan de conception | `docs/conception/plateforme/pla-03b-schema-depart.md`, réécrit le 15 novembre, **non commité**, dans le dossier de travail · **validé par le coordinateur le 2026-11-15, par délégation du chef** (variante R-3 : fichier figé) |

## Critère de « terminé »

Celui de PLA-03 (fichier du module) : une base neuve ne contient aucun nom, campus ni salle d'HESTIM ; une base qui a des comptes garde tout. En plus, pour 03b : une base sans aucune table se crée du schéma de départ, et un test strict prouve que le résultat est identique à celui des migrations.

## Périmètre d'écriture

L'agent peut modifier :

- `docs/conception/plateforme/pla-03b-schema-depart.md` (créé) et `docs/conception/README.md` (son lien)
- `backend/migrations/migrator.js`, `backend/migrations/cli.js`
- `backend/migrations/sql/schema-depart.sql` (créé, généré)
- le script de génération (créé ; son emplacement est à fixer dans le plan) et `backend/package.json` (commande `schema:depart` seulement)
- `backend/tests/integration/helpers/testApp.js`
- le test d'équivalence (créé) et `backend/tests/integration/baseNeuve.test.js`
- `DEPLOIEMENT.md` (ce que contient une base neuve)
- `docs/plan/decisions.md` (la ligne UIX-01 ci-dessous), `docs/plan/modules/UIX-interface.md` (la même chose)
- sa ligne de `docs/plan/suivi.md`, `docs/plan/modules/PLA-plateforme.md`, sa fiche de session

L'agent ne touche pas :

- `backend/migrations/0080-*` et tout le périmètre de MOT-13a ([mot-13a.md](mot-13a.md))
- toute migration existante
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

Les 11 réponses du chef du 15 novembre, dans la fiche `docs/sessions/2026-11-15-feat-pla-03-base-neuve.md`, section « Reprise du même jour » :

1. un fichier SQL généré par un script Node : `backend/migrations/sql/schema-depart.sql` ;
2. chargé automatiquement quand la base n'a aucune table ;
3. figé, régénéré à la demande du chef ;
4. les tests l'emploient, sauf le test d'équivalence et `baseNeuve.test.js` ;
5. test d'équivalence strict : structure, lignes, historique (`SequelizeMeta`) ;
6. branche créée après la fusion de #173 (c'est fait) ;
7. plan dans un fichier à part ;
8. `Filiere.annees_a_hestim` et la valeur `hestim` du modèle d'emploi du temps vont à **UIX-01** : à écrire dans `decisions.md` et dans le fichier du module UIX ;
9. le test ignore les deux dates de la ligne d'identité, en plus d'`AUTO_INCREMENT` ;
10. bases jetables `planner_migrations_test` et `planner_depart_test` ;
11. commande `npm run schema:depart`.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| C-1 | MOT-13a ajoute la migration 0080 en parallèle. La PR qui arrive après l'autre doit régénérer le schéma, sinon le test d'équivalence échoue. Cela s'accorde-t-il avec « régénéré à la demande du chef » (réponse 3) ? | **validé par le chef le 15 nov.** : toute PR qui ajoute une migration lance `npm run schema:depart` et commite le fichier ; le test d'équivalence le rappelle. À écrire dans le plan et dans `DEPLOIEMENT.md` | réglé |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : coder PLA-03b (schéma de départ), chantier PLA.
Tu es piloté par la session coordinatrice : tes rapports vont à elle.
Choisis d'abord le modèle : ta fiche recommande le plus capable (Claude Fable 5.2, sinon Opus 5.5).
Si tu tournes sur un autre modèle, dis au chef lequel choisir (/model) avant de commencer,
et note ton modèle dans ta fiche de session.
Lis AGENTS.md, CLAUDE.md, docs/plan/README.md, docs/plan/suivi.md et ta fiche de mission
docs/plan/missions/pla-03b.md.
Tu travailles dans le dossier ..\travaux-planner\pla-03b-schema-depart (branche feat/pla-03b-schema-depart,
déjà créée). Le plan docs/conception/plateforme/pla-03b-schema-depart.md y est écrit, non commité,
et VALIDÉ (par le coordinateur, par délégation du chef, variante R-3 : fichier figé).
1. Fusionne origin/main dans la branche (jamais de rebase).
2. Commite le plan seul, avec ta ligne de docs/plan/suivi.md à « en cours ».
3. Crée la jonction backend\node_modules vers le dépôt principal, puis code en suivant le § 9 du plan,
   un commit par étape avec ses tests. Base MySQL jetable : voir DEPLOIEMENT.md ; retire-la à la fin.
Tu n'écris que dans le périmètre de la fiche (et ses extensions). S'il faut en sortir, arrête-toi et demande.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; fiche de session
et suivi.md à jour en fin de session ; tout est commité ; jamais de git push.
Ensuite seulement, passe à ta seconde mission : docs/plan/missions/mot-12.md.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | mission écrite | — |
| 2026-11-15 | plan réécrit par l'agent dans `..\travaux-planner\pla-03b-schema-depart` (non commité) : 22 questions avec leurs propositions ; trois réponses du chef précisées par la lecture du code (base « vide », collation, contrôle de fraîcheur) | au chef (validation du plan) |

| 2026-11-15 | comparaison avec le brouillon de la session PLA-03 : **C-1 contredit R-3** (option que le chef avait écartée ; CI rouge et conflits pour toute PR qui porte une migration). Plan renvoyé à l'agent : C-1 rouverte, variante R-3 recommandée ; questions 13 et 18 tranchées par le coordinateur ; `server.js`, deux tests, mesure dans la CI, corrections de texte sur UIX-01 ajoutés | au chef (C-1, puis le plan) |

| 2026-11-15 | plan amendé par l'agent (variante R-3, huit points de la relecture) ; 19 questions au chef. Tranché par le coordinateur : la ligne d'identité du fichier porte `NOW()` pour ses deux dates (une école neuve porte sa date de création) | **au chef** : C-1 (R-3 recommandée) et validation du plan |

Périmètre étendu par le coordinateur le 15 novembre (2) : `backend/server.js` (message de chargement), le § 11 et la réponse 7 de `docs/conception/plateforme/pla-03-base-neuve.md`, la ligne « EXP-07 ou UIX-01 » de `docs/sessions/2026-11-15-feat-pla-03-base-neuve.md`.

Périmètre étendu par le coordinateur le 15 novembre : `backend/tests/schema/photographie.mjs` (et le script de génération dans `backend/tests/schema/`), la ligne `backend/migrations/sql/*.sql text eol=lf` de `.gitattributes`, une ligne de `backend/tests/integration/contexteEtablissement.test.js`. Refusé : `.github/pull_request_template.md` (le test suffit).
