# IAG · IA

**Objet** : l'intelligence artificielle au service de tous les modules :
- le client d'IA, son fournisseur et ses quotas ;
- l'interrupteur par école ;
- l'assistant de l'enseignant ;
- le tuteur de l'élève.

**L'IA ne se vend pas à part** : elle est incluse (décision du 11 oct.). L'offre d'IA payante, VEN-08, est gelée.

Module né le 27 nov. de la séparation des quiz et des jeux (QJE-17, réponse 3 du chef, [conception](../../conception/jeux/qje-17-separer-quiz-jeux.md)). **Les fonctions QJE-xx gardent leur numéro** ; une fonction nouvelle prend le code `IAG-` (table de correspondance : [README](../README.md), § 1).

**Hors module** : la préparation des quiz par l'IA, qui est un écran du quiz ([QUI](QUI-quiz.md)). Elle se sert du client d'IA de ce module.

**Tables et fichiers possédés** : le client générique `services/ia/*` (réglé par les variables `IA_*`) et son quota.

## Ce qui existe

- **Client d'IA** : `services/ia/*`, client générique réglé par `IA_*`, avec un quota.
- **Fournisseur** : il **n'est pas choisi en production** (loi 09-08). Q-16 et Q-24 visaient Haiku 5.5, sous enveloppe.
- **Interrupteur** : aujourd'hui, la clé du serveur allume l'IA pour toutes les écoles. Aucun réglage par école n'existe (décision D2 du 18 nov.).

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| QJE-07 | Fournisseur d'IA en production : choix conforme à la loi 09-08, clé par école ou coûts séparés (canal I-15), quotas | IA-7, I-15 | 3 | M | — | à faire |
| QJE-12 | Assistant IA de l'enseignant : séquence de cours, grille d'évaluation, commentaires de copie à relire ; aucune donnée d'élève envoyée | — | libre | M | QJE-07 | à faire |
| QJE-13 | Tuteur IA pour l'élève, sur le contenu de ses cours | — | — | L | QJE-07, avis CNDP | conditionnel (règle « aucune donnée d'élève ») |
| QJE-16 | Interrupteur de l'IA par école (aujourd'hui, la clé du serveur l'allume pour toutes) | — | 3 | à estimer | — | à faire, sans date : décision D2 du chef (18 nov.) ; une migration est probable, donc au chef |

## Critères de « terminé »

- **QJE-07** : aucune donnée d'élève n'est envoyée au fournisseur ; la sortie de l'IA est relue par l'enseignant avant publication.
- **QJE-12** : un test prouve qu'aucun nom, identifiant ou réponse d'élève ne part vers le fournisseur d'IA.

## Références

- Archives : [quiz par l'IA](../../archives/plans/quiz-ia.md)
- Étude 14, ligne R16 : l'IA activée école par école ([14-reprendre-et-depasser.md](../../etude-marche/14-reprendre-et-depasser.md))
