# Correctif QUA · Chargement de « Mes affectations »

| | |
|---|---|
| Branche | `fix/mes-affectations-useeffect` |
| Mission | [Fiche du correctif](../../plan/missions/fix-mes-affectations-useeffect.md) |
| Taille | S |
| Validation | Coordinateur, en attente |

## Cause et comportement proposé

Dans `MesAffectations.jsx`, l’effet dépend de l’objet `user` et appelle une fonction recréée à chaque rendu. ESLint relève la dépendance manquante. La seule donnée utilisée pour la requête est `user.id_user`. La pagination passe déjà par `fetchAll`.

1. Prendre l’identifiant de l’enseignant comme dépendance de l’effet et y placer le chargement. Conserver `fetchAll` pour parcourir les pages et lancer le chargement uniquement quand l’identifiant est disponible.
2. Planifier le démarrage à la prochaine microtâche et invalider l’effet lors de son nettoyage. En développement, cela laisse le temps à React Strict Mode de nettoyer le premier effet avant toute requête. Après un changement d’identifiant ou le démontage, écarter la réponse du chargement précédent.
3. Conserver le dernier résultat avec l’identifiant demandé. Afficher l’attente pour un nouvel identifiant et traduire le message d’erreur lors du rendu. Une traduction ou un nouveau rendu avec le même identifiant ne déclenche pas de requête.

## Vérification

Ajouter `frontend/src/pages/MesAffectations.test.js` à la suite `node --test`. Transformer le JSX avec l’outillage Vite déjà installé. Exécuter le composant avec des dépendances de test, dont un pilote minimal des effets et un double de l’API qui enregistre les appels. Vérifier zéro appel sans identifiant, un chargement par identifiant avec une page, zéro appel de plus au nouveau rendu (objet utilisateur recréé et traduction changée), un chargement supplémentaire au changement d’identifiant et un seul chargement après la séquence montage, nettoyage, remontage. Une réponse tardive de l’enseignant précédent doit être ignorée. Conserver un cas à deux pages pour vérifier la pagination.

Lancer le test ciblé, `npm run test:unit`, ESLint sur les deux fichiers et le build frontend. Les modifications de code restent dans la page et son test. Le retour arrière consiste à rétablir ces deux fichiers.

## Question au coordinateur

1. Valides-tu l’identifiant enseignant comme seul critère de rechargement et le report à la prochaine microtâche ? Proposition : oui, avec le test de la séquence Strict Mode et du changement d’identifiant.
