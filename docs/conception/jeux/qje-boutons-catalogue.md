# QJE-04 · suite — un nom accessible par bouton du catalogue

| | |
|---|---|
| Module | QJE · suite de [#196](https://github.com/Claude20022002/Planner/pull/196) et de [#205](https://github.com/Claude20022002/Planner/pull/205) |
| Branche | `fix/qje-boutons-catalogue`, créée depuis `origin/main` (`7f3c7089`) |
| Préparé | 18 novembre 2026 |
| Déclencheur | message du chef du 18 novembre : « 11 boutons au même nom ne se distinguent pas au lecteur d'écran » |

## 1. Le défaut

Depuis QJE-04, le catalogue « Tous les jeux » contient dix simulations **et** le terminal Linux. Chaque
ligne a un bouton qui porte le même texte visible :

- pour un enseignant : « Lancer en classe » → **corrigé** dans #196 (`98ea71d4`), le bouton porte
  `aria-label` : `Lancer « <jeu> » en classe` ;
- pour un étudiant : « Jouer » ou « Continuer » → **resté au même nom** pour onze lignes. Un lecteur
  d'écran annonce onze fois « Jouer », et un test qui vise ce nom trouve onze éléments.

## 2. Le correctif

Le texte visible ne change pas ; le nom accessible est précisé par `aria-label`, comme pour le bouton
d'enseignant.

| Fichier | Bouton | Nom accessible |
|---|---|---|
| `pages/jeux/Jeux.jsx` | catalogue, étudiant | « Jouer à « <jeu> » » / « Continuer « <jeu> » » |
| `pages/jeux/Jeux.jsx` | jeux d'un module | « Jouer à « <jeu> » » |
| `i18n/fr.js`, `i18n/en.js` | — | deux clés ajoutées : `jeux.jouerNom`, `jeux.continuerNom` |

Les clés `jeux.jouer` et `jeux.continuer` restent le texte visible, inchangé.

## 3. Test de non-régression

Dans `frontend/tests/parcours/sessionsJeu.spec.cjs`, après la vérification existante (l'enseignante n'a
pas de bouton « Continuer » / « Jouer » dans le catalogue) :

- aucun bouton du catalogue ne s'appelle exactement « Lancer en classe » ;
- au moins deux boutons portent `Lancer « <jeu> » en classe` : les noms sont donc distincts.

Deux assertions plutôt qu'un compte fixe (11) : le catalogue grandira sans casser le test.

## 4. Hors périmètre

- `components/jeux/CatalogueJeux.jsx` n'est importé nulle part (code mort) ; il porte encore des boutons
  au même nom. Il est signalé, pas modifié : sa suppression est un lot de nettoyage à part.
- Le mobile a son propre catalogue et ses propres libellés ; il n'est pas touché.
- Aucune modification de `docs/plan/suivi.md` (le coordinateur le tient) ni de `main`.
