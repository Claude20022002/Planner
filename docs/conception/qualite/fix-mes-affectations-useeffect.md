# Correctif QUA · Chargement de « Mes affectations »

| | |
|---|---|
| Branche | `fix/mes-affectations-useeffect` |
| Mission | [Fiche du correctif](../../plan/missions/fix-mes-affectations-useeffect.md) |
| Taille | S |
| Validation | Validé par le coordinateur le 26 novembre à 09 h 53 sur `8df4e90d` |

## Cause et comportement

L’effet de `MesAffectations.jsx` dépend de l’objet `user` et appelle une fonction recréée à chaque rendu. ESLint relève la dépendance manquante. La requête utilise l’identifiant de l’enseignant et conserve la pagination de `fetchAll`.

1. Dans la page, extraire `user?.id_user`. L’effet dépend de cet identifiant seul. Il transmet l’identifiant, `affectationAPI` et les callbacks d’état au module `frontend/src/components/mesSeances/chargerSeances.js`. Il retourne la fonction d’annulation du module comme nettoyage.
2. Le module sans React renvoie immédiatement cette fonction. Avec un identifiant, il charge toutes les pages via `fetchAll`. La fonction d’annulation passe le drapeau `actif` à faux, ce qui écarte les résultats et erreurs tardifs après nettoyage ou changement d’identifiant. Sans identifiant, aucune requête ne part. En développement, Strict Mode peut rejouer l’effet et le nettoyage.
3. Garder l’erreur comme clé `mesSeances.erreurChargement` et traduire lors du rendu. Le changement de langue ne modifie pas l’identifiant.

## Vérification

Ajouter `frontend/src/components/mesSeances/chargerSeances.test.js` à la suite `node --test`. Le double de l’API compte les appels et contrôle leurs paramètres. Vérifier zéro appel sans identifiant, un parcours de deux pages pour un identifiant, puis l’absence de mise à jour lorsqu’une réponse est reçue après l’annulation. ESLint confirme la liste de dépendances de la page avec `react-hooks/exhaustive-deps`.

Lancer `npm run test:unit`, ESLint sur la page, le module et son test, puis le build frontend. Le périmètre de code étendu au module et à son test a été accordé par le coordinateur le 26 novembre à 09 h 32. Pour revenir en arrière, rétablir la page et retirer le module et son test.
