# Correctif : le volet du tableau de bord peut montrer les lignes d'un autre chiffre · plan court

| | |
|---|---|
| Module | [UIX](../../plan/modules/UIX-interface.md) · correctif d'UIX-11 (#240, fusionnée le 21 nov., `d7668781`), sans chantier |
| Origine | relecture de la branche d'UIX-11 (21 nov. au soir), points 1 et 2 ; le chef a confié le correctif à cette session |
| Branche | `fix/uix-11-volet`, depuis `origin/main` (`d7668781`) |
| Dossier de travail | `..\travaux-planner\fix-uix-11-volet` |
| Taille | S · frontend seul, sans route, sans migration, sans donnée d'élève |
| Rédigé par | Claude Code (Opus 5.5), le 21 novembre 2026 |
| **Validé** | **par le chef, le 21 nov. au soir** (outil de questions), avec la question 1 : oui |

## 1. Le défaut

`frontend/src/components/dashboard/VoletLignes.jsx`, lignes 43 à 53 : `charger` lit les lignes du chiffre ouvert, puis les écrit **sans vérifier qu'il s'agit encore de la dernière demande**.

Le cas, sur une connexion lente (EP-18) :

1. l'administration ouvre « Occupation des salles » : le volet appelle `GET /statistiques/kpis` (lent) ;
2. elle ferme le volet, puis ouvre « Séances planifiées » : le volet appelle `GET /affectations` (rapide) et montre les séances ;
3. la réponse des statistiques arrive ensuite. `charger` de l'étape 1 écrit `volet.lignes(réponse)` de l'occupation (les salles) dans l'état du volet. Le volet des séances montre alors **les lignes des salles dans les colonnes des séances**, presque toutes à « - », jusqu'à ce qu'on le rouvre.

`useBloc.js` garde déjà la dernière demande seule (compteur `demande`, lignes 19 à 41) ; le volet ne le fait pas.

## 2. Le correctif

1. **`VoletLignes.jsx`** : un compteur de demandes (`useRef`), comme dans `useBloc`. Chaque appel de `charger` prend un numéro ; une réponse ou une erreur dont le numéro n'est plus le dernier n'écrit rien. La fermeture du volet (`chiffre` à `null`) relance l'effet, qui prend un numéro : une demande encore en route à la fermeture n'écrit plus rien. « Réessayer » passe par le même `charger`.
2. **La réponse 10 mal écrite au plan d'UIX-11** (`docs/conception/interface/uix-11-tableau-de-bord.md`, § 3, ligne 56) : « celle qui contient aujourd'hui, sinon aucune » devient « celle qui contient aujourd'hui, **sinon la première période active**, sinon aucune ». C'est ce que font le code (`periodes.js`, `periodeEnCours`), son test (`periodes.test.js`, « sinon la première période active, sinon aucune ») et le § 8 du plan, validé par le coordinateur. Seul le dernier recours de la page Suivi (`liste[0]`, une période même d'une année inactive) est retiré. Le code ne change pas.
3. **Le commentaire de `periodeEnCours`** (`periodes.js`) dit « comme la page Suivi » : il dira ce qui diffère (pas de période d'une année inactive en dernier recours).

## 3. Test de régression

Dans `frontend/tests/parcours/tableauDeBord.spec.cjs`, un test de plus, « une réponse en retard n'écrit pas dans le volet d'un autre chiffre » :

- les blocs chargés, le parcours lit le chiffre des séances `n`, puis **retarde de 3 s** la route `**/api/statistiques/kpis*` (`page.route`) et y répond par un tableau de salles de longueur `min(n, 100) + 1`, fictif ;
- il ouvre « Occupation des salles », ferme par Échap, ouvre « Séances planifiées », attend ses lignes ;
- il attend la fin du retard, puis vérifie que le volet montre toujours `min(n, 100)` lignes (ou « Aucune ligne sur cette période. » si `n` vaut 0).

Sans le correctif, la réponse en retard remplace les séances par `min(n, 100) + 1` lignes : le test échoue. Avec, il passe. La longueur `+ 1` garantit que les deux cas se distinguent quel que soit `n`.

## 4. Fichiers

| Fichier | Changement |
|---|---|
| `frontend/src/components/dashboard/VoletLignes.jsx` | compteur de demandes (≈ 6 lignes) |
| `frontend/src/components/dashboard/periodes.js` | commentaire de `periodeEnCours` |
| `frontend/tests/parcours/tableauDeBord.spec.cjs` | le test de régression |
| `docs/conception/interface/uix-11-tableau-de-bord.md` | § 3, réponse 10 |
| `frontend/src/pages/gestion/Suivi.jsx` | `Object.hasOwn` ; constante remontée au-dessus du commentaire de rôle (question 1) |
| fiche de session | à la fin |

Rien dans `backend/`, `shared/`, ni dans les autres pages que `Suivi.jsx`. `suivi.md` reste au coordinateur.

## 5. Vérifié par

- `npm run test:unit` et `npx eslint` sur les fichiers touchés, sans erreur.
- Le parcours `tableauDeBord.spec.cjs` (8 tests) en local, puis dans la CI de la PR. La preuve « rouge avant » : le nouveau test lancé une fois en local **sans** la correction de `VoletLignes.jsx`, puis avec (sortie dans la fiche de session).

## 6. Questions

| N° | Question | Proposition | Réponse |
|---|---|---|---|
| 1 | Les deux petits points de `Suivi.jsx` relevés à la relecture : `ONGLETS_ADRESSE[…]` lit aussi les noms hérités (`?onglet=constructor` rend une fonction comme numéro d'onglet), et la constante s'est glissée entre le commentaire de rôle de `Suivi` et sa fonction. Les corriger ici ? | **oui** : `Object.hasOwn`, et la constante remontée au-dessus du commentaire ; un test unitaire n'est pas possible sans rendre la page, le parcours de la réponse 9 couvre `?onglet=usage` | **oui** (chef, 21 nov.) : `Suivi.jsx` entre dans les fichiers du correctif |
