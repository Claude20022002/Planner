# Session du 2026-11-18 · Suite de QJE-04 : « 404 hors de ses classes » · `fix/qje-404-hors-classes`

| | |
|---|---|
| Fait par | Qoder, agent d'Alexis |
| Mission | message du chef du 18 novembre, relayé par son agent : « Aligne le code (404) ou, si 403 est voulu, justifie-le dans le plan » |
| Module | QJE · suite de [#196](https://github.com/Claude20022002/Planner/pull/196), fusionnée en `cbb35a24` |
| Dossier de travail | le dépôt principal, branche créée depuis `origin/main` (`57bb122a`) |
| Dernier commit | voir `git log -1` ; code : `20e3b4ff` |
| Fiche précédente | [2026-11-18-jeux-pedagogique.md](2026-11-18-jeux-pedagogique.md) |

## Objectif de la session

Appliquer la règle « 404 hors de ses classes » aux routes de jeux, isoler les données du test de
simulation qui héritait de l'état d'un test précédent, et obtenir une CI verte.

## Le point de départ, vérifié avant de coder

- La PR **#196 est fusionnée** dans `main` (`cbb35a24`, 18 novembre) : les trois corrections de tests du
  message (403 du rôle, ensemble `{1, 2, 3}`, constante `echecs`) sont bien dans `main`.
- `main` a avancé de 61 commits depuis (`57bb122a`, dont #203 et les PR de documentation) ; la branche
  de cette session part de là, donc **il n'y avait rien à fusionner**.
- `frontend/src/i18n/index.js` de `main` contient déjà les **deux** dictionnaires (`personnes`,
  `applications` d'UIX-06b et `simulations` de QJE-04) : fichier non touché.
- `docs/plan/suivi.md` : non touché, il revient au coordinateur.

## Plan

[docs/conception/jeux/qje-404-hors-classes.md](../conception/jeux/qje-404-hors-classes.md), commité
seul (`f83ac9e2`).

## Fait

| Commit | Contenu |
|---|---|
| `f83ac9e2` | le plan seul |
| `20e3b4ff` | le code, les tests d'intégration, la ligne de route corrigée dans le plan |

- **`services/jeux/jeux.js`** : `coursDeSesClasses(user, idCours)` est ajoutée — existence du module,
  puis l'un des siens ; sinon `ErreurMetier("Module introuvable", 404)`, le message d'un identifiant
  inconnu. `proposerDansModule`, `retirerDuModule` et `suiviDuModule` l'utilisent : les trois 403
  « dans vos modules » disparaissent.
- **`services/jeux/sessions.js`** : `lancerSession` perd sa résolution de module dupliquée et appelle la
  même fonction ; son 403 devient 404.
- Ce qui reste en 403 est justifié dans le plan : refus de **rôle** (capacité, jamais existence) et
  `jeuAccessible` (les modules de l'appelant, qu'il connaît). Non traité, signalé : le 403 de
  `sessionsEtudiant.js` pour une session lancée à un module que l'étudiant ne suit pas.
- **`tests/integration/jeux.test.js`** : proposer dans un module d'un autre (deux cas), suivi, retirer
  attendent 404 ; la réponse est comparée à celle d'un identifiant inexistant.
- **`tests/integration/sessionsJeu.test.js`** : lancer hors de ses classes attend 404.
- **`tests/integration/simulations.test.js`** :
  - nouveau test « a module outside the teacher classes answers 404, exactly like an unknown module » :
    proposer, retirer, suivi et lancer hors de ses classes rendent le **même corps** que `999999`, et le
    titulaire du module réussit ;
  - le test de concurrence vérifie l'ensemble `{1, 2, 3}`, le total relu à 3 et **une seule** ligne
    d'état pour ce joueur et ce défi (`SELECT … FOR UPDATE`, `services/jeux/etatsDefis.js`) ;
  - le test « viewing after success » **fabrique son état** (lignes `JeuxEtatsDefis` et
    `JeuxProgressions` supprimées en début de test, un échec puis une réussite) au lieu d'hériter du
    test précédent : `echecs` vaut de nouveau 0 pour ce qu'il crée.

## Vérifié

| Contrôle | Résultat |
|---|---|
| `npm test` (backend, unitaires) | 499 tests, 32 suites, passés |
| `npm run lint` (backend) | 0 erreur, 17 avertissements préexistants |
| CI de la PR #205 | Build, Test Backend (63 suites, **625 tests d'intégration**), Test Mobile, Test Solveur, Scripts, Parcours (15 min 7) : verts |
| Non vérifié en local | l'intégration : le démon Docker n'est pas lancé (`npipe:////./pipe/dockerDesktopLinuxEngine` absent) et 3306 / 3307 sont fermés. La CI la fait, comme prévu par le message |

## Écarts avec le message

Aucun sur le fond. Deux précisions : le point 2 était déjà corrigé dans #196 (l'ensemble trié) et n'a
été que renforcé ; le point 3 a été remplacé par une vraie isolation plutôt que par une constante.

## Questions

Une seule, pour le coordinateur : faut-il appliquer la même règle au 403 de `sessionsEtudiant.js`
(« session lancée pour un module que vous ne suivez pas ») ? Elle est hors du périmètre de cette suite.

## État laissé

- Branche `fix/qje-404-hors-classes` poussée, PR #205 ouverte, six contrôles verts.
- Aucune fusion, aucune migration, `main` non touché, `docs/plan/suivi.md` non touché.

## Reste à faire, dans l'ordre

1. Le coordinateur relit la PR #205.
2. Le chef valide, puis fusionne (seul le chef fusionne).
3. Le coordinateur inscrit la ligne dans `docs/plan/suivi.md` s'il le juge utile.

## Prompt de reprise

```text
Tu reprends la suite de QJE-04 de Planner, branche fix/qje-404-hors-classes, PR #205.
Lis AGENTS.md, le plan docs/conception/jeux/qje-404-hors-classes.md et la fiche
docs/sessions/2026-11-18-fix-qje-404-hors-classes.md.
Fait : coursDeSesClasses dans services/jeux/jeux.js ; proposer, retirer, suivi et lancerSession
répondent 404 hors de ses classes (même corps qu'un identifiant inconnu) ; tests d'intégration
mis à jour ; test de concurrence renforcé ; test « viewing after success » isolé.
Vérifié : 499 tests unitaires, lint 0 erreur, CI de la PR verte (intégration comprise).
Reste : relecture du coordinateur, validation et fusion par le chef. Question ouverte : le 403 de
sessionsEtudiant.js doit-il devenir 404 ?
Règles : ne touche jamais à main, ne fusionne pas, une branche = une tâche.
```
