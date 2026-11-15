# Session du 2026-11-15 · PLA-03 · `feat/pla-03-base-neuve`

| | |
|---|---|
| Fait par | Claude Code (Sonnet 5.5 pour la lecture du projet, puis Fable 5.2) |
| Chantier | PLA |
| Dossier de travail | `..\travaux-planner\pla-03-base-neuve` |
| Dernier commit | voir `git log -1 feat/pla-03-base-neuve` |

## Objectif de la session

Choisir une fonction libre d'un chantier ouvert, vérifier que personne n'y travaille, puis la faire : PLA-03, base neuve sans données d'école.

## Plan

[docs/conception/plateforme/pla-03-base-neuve.md](../conception/plateforme/pla-03-base-neuve.md), validé par le chef le 15 novembre, avec ses 9 réponses.

La fonction se livre en deux étapes : **PLA-03a** (cette branche : les données) et **PLA-03b** (schéma de départ, complément de plan à écrire et à valider).

## Fait

- `b7eb857` : plan de conception validé, `suivi.md` à « en cours ».
- `b3189ce` : cœur de PLA-03a.
  - Les migrations 0003 et 0055 ne donnent les campus et l'identité de l'école d'origine qu'à une base qui a des comptes, comme la 0057.
  - Une base neuve reçoit une ligne d'identité neutre (« Planner », sans logo, modèle `planner`).
  - `backend/demo/ecolePilote.js` : le jeu de démonstration crée ses deux campus et écrit son identité ; `seed.js` l'appelle.
  - `backend/tests/integration/baseNeuve.test.js` : 9 tests.
  - L'aide des tests crée « Campus Nord » (N) et « Campus Sud » (S) ; `resetDatabase({ neuve: true })` laisse la base telle que les migrations la font.
- `0624c4b` : 13 fichiers de tests du serveur passent aux campus fictifs et à l'identité neutre ; l'emploi du temps mensuel est testé avec l'école fictive « École Alpha ».
  - **Écart avec le plan** : deux fichiers de données des parcours du site (`donneesGeneration.mjs`, `donneesIiia.mjs`) lisaient aussi les campus G et ST. Ils sont adaptés, et ajoutés au § 5 du plan.
- `82a2d49` : `DEPLOIEMENT.md` (ce que contient une base neuve), fichier du module PLA, exception de `verifier-neutre.mjs` pour le fichier de démonstration.

## Vérifié

- `baseNeuve.test.js` : en échec avant le correctif (2 campus et l'identité de l'école pilote dans une base neuve), 9 tests verts après.
- Suite d'intégration du serveur : **59 fichiers, 589 tests verts**. Un fichier (`formatErreurs.test.js`) a dépassé le délai de 30 s dans la suite complète, puis a passé seul (3 tests sur 3) : lenteur du poste, sans rapport avec le changement.
- Tests unitaires du serveur : 23 fichiers, 330 tests verts.
- Lint du serveur : 0 erreur (17 avertissements de longueur, déjà présents).
- `node scripts/verifier-neutre.mjs` : aucun nom d'école en dur.
- **Non lancé ici** : les parcours du site. Ils tournent dans la CI de la PR.
- Sur ce poste, la suite complète demande `NODE_OPTIONS=--max-old-space-size=8192` : avec la limite par défaut, Node manque de mémoire après 14 minutes.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 9 | Voir le § 3 du plan | toutes répondues le 15 nov. | réglé |
| — | `Filiere.annees_a_hestim` et la valeur `hestim` du modèle d'emploi du temps : EXP-07 ou UIX-01 ? | — | **en attente** (hors périmètre de PLA-03) |
| — | Thème bleu de Planner (règle N-4) | — | **en attente** depuis le 11 nov. |

## État laissé

- `docs/plan/suivi.md` : PLA-03 → en cours (PLA-03a codée, PR à ouvrir ; PLA-03b à concevoir).
- Chantier PLA : reste 7 fonctions. PLA-05 et EXP-06 attendent PLA-03.
- La base MySQL jetable de la session (`planner_mysql_pla03`, port 3313) est retirée.

## Reste à faire, dans l'ordre

1. Le chef pousse la branche et ouvre la PR ; les parcours se vérifient dans la CI.
2. Passer la ligne PLA-03 de `suivi.md` à « PR ouverte », avec son numéro.
3. PLA-03b : écrire le complément de plan (forme du schéma de départ, moment où il est régénéré, test d'équivalence avec les migrations), le faire valider, puis coder sur une nouvelle branche.
4. À la fusion des deux étapes : PLA-03 à « fait » ; PLA-05 devient possible.

## Reprise du même jour : PR #173 et conception de PLA-03b

- La PR **#173** existe ; sa CI est **verte** le 15 novembre, parcours compris (Test Backend 7 min 51 s, parcours 11 min 19 s).
- `suivi.md` : PLA-03 → « PR ouverte », #173.
- PLA-03b : 11 questions posées, toutes répondues le 15 novembre. Le complément de plan est rédigé et **attend la validation du chef**. Il n'est pas encore commité : sa branche `feat/pla-03b-schema-depart` part de `origin/main` après la fusion de #173 (réponse 6).
- Réponses du chef :
  1. un fichier SQL généré par un script Node (`backend/migrations/sql/schema-depart.sql`) ;
  2. chargé automatiquement quand la base n'a aucune table ;
  3. figé, régénéré à la demande du chef ;
  4. les tests l'emploient, sauf le test d'équivalence et `baseNeuve.test.js` ;
  5. test d'équivalence strict (structure, lignes, historique) ;
  6. branche créée après la fusion de #173 ;
  7. plan dans un fichier à part, `docs/conception/plateforme/pla-03b-schema-depart.md` ;
  8. `Filiere.annees_a_hestim` et la valeur `hestim` du modèle d'emploi du temps : **UIX-01** (à écrire dans `decisions.md` et dans le fichier du module UIX, avec PLA-03b) ;
  9. le test ignore les deux dates de la ligne d'identité, en plus d'`AUTO_INCREMENT` ;
  10. bases jetables `planner_migrations_test` et `planner_depart_test` ;
  11. commande `npm run schema:depart`.
- Aucun code écrit dans cette reprise.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\pla-03-base-neuve" push
gh pr checks 173 --watch
gh pr merge 173 --merge
```

Conflits possibles avec #164 et #171 sur `docs/conception/README.md` et `docs/plan/suivi.md` : ce sont des lignes des mêmes tableaux, il suffit de garder toutes les lignes.

## Prompt de reprise

```text
Tu reprends PLA-03 (base neuve sans données d'école) du chantier PLA de Planner.
L'étape PLA-03a est codée sur la branche feat/pla-03-base-neuve, dans le dossier
..\travaux-planner\pla-03-base-neuve.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/plateforme/pla-03-base-neuve.md
et la fiche docs/sessions/2026-11-15-feat-pla-03-base-neuve.md.
Fait : les migrations 0003 et 0055 ne donnent les campus et l'identité de l'école d'origine
qu'à une base qui a des comptes ; le jeu de démonstration apporte les siens ; les tests et les
parcours emploient « Campus Nord » (N) et « Campus Sud » (S) ; 589 tests d'intégration verts.
La PR #173 (PLA-03a) est ouverte, CI verte le 15 novembre. Vérifie avec gh pr list qu'elle est
fusionnée ; sinon, dis-le au chef : PLA-03b ne se code qu'après.
Reste : PLA-03b, le schéma de départ. Les 11 réponses du chef sont dans la fiche (section
« Reprise du même jour »). Si le chef a validé le complément de plan, crée la branche
feat/pla-03b-schema-depart depuis origin/main (dossier ..\travaux-planner\pla-03b-schema-depart),
commite le plan seul dans docs/conception/plateforme/pla-03b-schema-depart.md avec suivi.md,
puis code en suivant ses étapes. Si le plan n'est pas validé ou n'est plus disponible, réécris-le
à partir des 11 réponses et fais-le valider.
Décidé : Filiere.annees_a_hestim et la valeur « hestim » du modèle d'emploi du temps vont à UIX-01 ;
à écrire dans decisions.md et dans le fichier du module UIX, dans la PR de PLA-03b.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
