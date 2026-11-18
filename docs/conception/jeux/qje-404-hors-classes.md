# QJE-04 · suite — « 404 hors de ses classes » sur les jeux

| | |
|---|---|
| Module | QJE · suite de [#196](https://github.com/Claude20022002/Planner/pull/196), fusionnée en `cbb35a24` |
| Branche | `fix/qje-404-hors-classes`, créée depuis `origin/main` |
| Préparé | 18 novembre 2026 |
| Déclencheur | message du chef de projet du 18 novembre : « Aligne le code (404) ou, si 403 est voulu, justifie-le dans le plan » |

## 1. La règle

`docs/plan/README.md`, § 5 : « le serveur ne croit jamais le client ; **404 hors de ses classes** ». La
règle existe déjà dans le code du planning (`peutGererClasse` / `peutVoirClasse` : « réponse 404 et non
403 hors de ses classes, pour ne rien révéler »).

## 2. Ce qui n'était pas aligné

Les routes de jeux répondaient **403** quand un enseignant agit sur un module qui n'est pas le sien :

| Route | Réponse avant | Réponse après |
|---|---|---|
| `POST /api/jeux/:code/modules` | 403 « Vous ne pouvez proposer un jeu que dans vos modules » | 404 « Module introuvable » |
| `DELETE /api/jeux/:code/modules/:id_cours` | 403 « Vous ne pouvez retirer un jeu que de vos modules » | 404 « Module introuvable » |
| `GET /api/jeux/:code/modules/:id_cours/suivi` | 403 « Suivi réservé aux enseignants du module » | 404 « Module introuvable » |
| `POST /api/sessions-jeu` | 403 « Vous ne pouvez lancer un jeu que dans vos modules » | 404 « Module introuvable » |

Un 403 dit « ce module existe mais il n'est pas à vous » : c'est exactement ce que la règle interdit. Le
404 reprend le message déjà utilisé pour un identifiant inconnu, donc les deux cas sont indiscernables.

## 3. Ce qui reste en 403, et pourquoi

- **Rôle** (`Réservé aux enseignants`, `Réservé aux étudiants`) : le 403 porte sur la capacité de
  l'appelant, jamais sur l'existence d'un objet. Il ne révèle rien.
- **Ses propres modules** (`jeuAccessible` : « Ce jeu n'est pas proposé dans vos modules ») : la réponse
  ne parle que des modules de l'appelant, qu'il connaît déjà.
- `sessionsEtudiant.js` (« session lancée pour un module que vous ne suivez pas ») : hors périmètre de
  cette suite ; à trancher avec le coordinateur si l'on veut appliquer la règle aux étudiants.

## 4. Tests

- Intégration : un enseignant qui n'a pas le module obtient **404** sur les quatre routes, et un
  identifiant inexistant donne la **même** réponse (message et code) ; le titulaire du module réussit.
- Intégration : l'étudiant qui appelle une route d'enseignant reste à **403** (règle de rôle).
- Isolation : chaque test repart d'un état propre pour les défis qu'il touche (ligne `JeuxEtatsDefis`
  supprimée en début de test), pour que `echecs` et `points` ne dépendent pas des tests précédents.
- Concurrence : trois essais simultanés doivent rendre exactement `{1, 2, 3}` et laisser `echecs = 3`
  (aucun échec perdu).

## 5. Hors périmètre

Aucune migration, aucun changement d'écran, aucune modification de `docs/plan/suivi.md` (le
coordinateur le tient). Le mobile n'est pas touché.
