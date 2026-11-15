# Mission · PLA-03b · Schéma de départ

| | |
|---|---|
| État | ouverte |
| Agent | Claude Code (session à ouvrir, Cursor ou VS Code) |
| Attribuée le | 2026-11-15, par le coordinateur ; accord du chef : oui, le 2026-11-15 |
| Module et chantier | [PLA](../modules/PLA-plateforme.md) · chantier ouvert le 2026-11-09 |
| Fonction | PLA-03b : une base neuve se crée d'un schéma de départ au lieu de rejouer les 60 migrations · taille : partie de PLA-03 (M) |
| Branche | `feat/pla-03b-schema-depart`, depuis `origin/main` (PLA-03a, #173, y est fusionnée) |
| Dossier de travail | `..\travaux-planner\pla-03b-schema-depart` |
| Plan de conception | `docs/conception/plateforme/pla-03b-schema-depart.md`, **à réécrire** : le brouillon du 15 novembre n'a pas été commité et n'existe plus sur le disque · validé par : **le chef** (il touche au chargement des migrations de toute base) |

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
Tu travailles sur Planner. Ta mission : PLA-03b (schéma de départ), chantier PLA.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/pla-03b.md (sur main, ou sur la branche
chore/coordination-agents si elle n'est pas fusionnée), la conception
docs/conception/plateforme/pla-03-base-neuve.md et la fiche
docs/sessions/2026-11-15-feat-pla-03-base-neuve.md (section « Reprise du même jour »).
Crée la branche feat/pla-03b-schema-depart depuis origin/main, dans le dossier
..\travaux-planner\pla-03b-schema-depart, avec la jonction vers backend\node_modules.
Le complément de plan n'existe plus : réécris-le dans
docs/conception/plateforme/pla-03b-schema-depart.md à partir des 11 réponses du chef,
avec la question C-1 de la fiche de mission, puis fais-le valider par le chef.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Règles : pas de code avant le plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | mission écrite | — |
| 2026-11-15 | plan réécrit par l'agent dans `..\travaux-planner\pla-03b-schema-depart` (non commité) : 22 questions avec leurs propositions ; trois réponses du chef précisées par la lecture du code (base « vide », collation, contrôle de fraîcheur) | au chef (validation du plan) |

| 2026-11-15 | comparaison avec le brouillon de la session PLA-03 : **C-1 contredit R-3** (option que le chef avait écartée ; CI rouge et conflits pour toute PR qui porte une migration). Plan renvoyé à l'agent : C-1 rouverte, variante R-3 recommandée ; questions 13 et 18 tranchées par le coordinateur ; `server.js`, deux tests, mesure dans la CI, corrections de texte sur UIX-01 ajoutés | au chef (C-1, puis le plan) |

Périmètre étendu par le coordinateur le 15 novembre (2) : `backend/server.js` (message de chargement), le § 11 et la réponse 7 de `docs/conception/plateforme/pla-03-base-neuve.md`, la ligne « EXP-07 ou UIX-01 » de `docs/sessions/2026-11-15-feat-pla-03-base-neuve.md`.

Périmètre étendu par le coordinateur le 15 novembre : `backend/tests/schema/photographie.mjs` (et le script de génération dans `backend/tests/schema/`), la ligne `backend/migrations/sql/*.sql text eol=lf` de `.gitattributes`, une ligne de `backend/tests/integration/contexteEtablissement.test.js`. Refusé : `.github/pull_request_template.md` (le test suffit).
