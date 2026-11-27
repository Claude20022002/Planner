# JEU · Jeux pédagogiques

**Objet** : les jeux livrés avec Planner, où l'élève réussit des défis que vérifie un moteur, avec des niveaux et de l'expérience :
- le terminal Linux ;
- les dix simulations à défis ;
- les jeux nouveaux de l'atelier (QJE-18) ;
- plus tard, ceux des créateurs (QJE-05, QJE-08).

On joue sur son téléphone, ou tous ensemble au tableau.

Module né le 27 nov. de la séparation des quiz et des jeux (QJE-17, [conception](../../conception/jeux/qje-17-separer-quiz-jeux.md)). **Son nom ne contient pas « quiz »** (décision du chef du 26 nov.). Les quiz sont dans [QUI](QUI-quiz.md), l'IA dans [IAG](IAG-ia.md). **Les fonctions QJE-xx gardent leur numéro** ; une fonction nouvelle prend le code `JEU-` (table de correspondance : [README](../README.md), § 1).

**Hors module** :
- les quiz, même ceux qui se lancent en classe (QUI) ;
- les devoirs (COU, à leur retour).

**Tables possédées** :
- `JeuModule` (`JeuxModules`, avec `but` et `notion`, migration 0030) ;
- `JeuProfil` ;
- `JeuProgression` ;
- `JeuEtatDefi` (`JeuxEtatsDefis`, migration 0082 : échecs et solution vue par défi) ;
- `sessionsJeu` (jeux lancés en classe).

**Identifiant technique** : `jeux` (logo, teinte `app-jeux`, catalogue de l'application, futur registre de VEN-01) ; `jeuxPedagogiques` sur le site, segment `jeux-pedagogiques`.

## Ce qui existe

- **Jeux** :
  - fichiers : `jeuxRoutes`, `sessionJeuRoutes`, `shared/jeux`, `shared/simulations`, `shared/terminal` (jeu du terminal Linux) ; écrans `pages/jeux/*` ; dans l'application, les écrans `jeux`, `terminal`, `simulation` et `jeu-direct` ;
  - dix simulations, trente défis (branche `jeux-pedagogique` fusionnée par QJE-04, #196) ;
  - **unité des défis** (M-11, #283, fusionnée) : les consignes et les bilans comptent en crédits. Les montants ne changent pas.
- **Vue par module** : `activiteRoutes` (`GET /api/activites`) regroupe encore les quiz en cours, les devoirs et les jeux par module. Seul l'écran mobile « Activités » la lit. QJE-17 la garde telle quelle jusqu'à l'étape 17g.
- **Encore mêlé aux quiz** jusqu'aux étapes 17c à 17g de QJE-17 : la page web « Activités » (`/jeux`), l'écran mobile « Activités », la page « Quiz et jeux » du site et son onglet « Bibliothèque des jeux », le logo `activites`.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| QJE-04 | Fusion de `jeux-pedagogique` et ses quatre corrections ; entrée des jeux par scan ou depuis le module (contrat [jeux-pedagogiques](../../conception/jeux/jeux-pedagogiques.md)) | JC-0 | libre | M | — | fait (#196, 18 nov.) ; migration 0082 écrite, à appliquer au prochain déploiement |
| QJE-05 | Service des jeux à part, avec des gabarits ; jeux maison ; bibliothèque des jeux plus belle | JC-1, JC-2, JC-5 | libre | L + M + M | QJE-04 | à faire |
| QJE-08 | Créateurs de jeux et leur rémunération | JC-3, JC-4, JC-6, RC-1 à RC-4 | — | — | vente | gelé |
| QJE-15 | Jeux rangés par niveau, puis par filière (site, web, mobile) | — | libre, exception du 18 nov. | M | — | à faire : fiche écrite le 18 nov. ; après VIT-10 |
| QJE-17 | Séparer les quiz et les jeux partout : site, application (web et mobile), offre, plan ; le module des jeux ne porte pas le nom « quiz » (décision du chef du 26 nov. ; numéro corrigé le 27 nov., QJE-16 étant l'interrupteur de l'IA) | — | libre | L, en étapes 17a à 17g | — | plan validé par le chef le 27 nov. ([conception](../../conception/jeux/qje-17-separer-quiz-jeux.md)) ; 17a (ce découpage du plan et l'offre) en cours |
| QJE-18 | L'atelier des jeux : de nouveaux jeux par matière, sur des mécaniques éprouvées par les plateformes de jeux pédagogiques les plus jouées (jamais la copie d'un jeu), conçus un à un, chacun avec son image (Codex) ; étude et catalogue d'abord (demande du chef du 27 nov.) | — | libre | M, puis S ou M par jeu | QJE-15 (champs `cycles`, `domaine`, image) | à faire : étude au chef, session Claude à ouvrir ([fiche](../missions/qje-18-atelier-jeux.md)) |

QJE-09 (défis Linux *dans un quiz*) est rangée dans [QUI](QUI-quiz.md) : c'est une question de quiz, qui dépend du terminal de QJE-04.

## Critères de « terminé »

- **QJE-04** : un jeu envoie une réponse, jamais un score : le score est calculé par le serveur. Un test le prouve.
- **QJE-17** :
  - aucun texte du site ni de l'application ne réunit les quiz et les jeux sous un seul nom ; un test de garde le prouve ;
  - deux pages, deux tuiles et deux logos sur le site ;
  - deux entrées dans l'application ;
  - deux modules vendables, n° 4 et n° 18 de l'étude 15 ;
  - aucune route ni donnée cassée.

## Références

- [Contrat des jeux](../../conception/jeux/jeux-pedagogiques.md)
- [Conception de QJE-17](../../conception/jeux/qje-17-separer-quiz-jeux.md)
- Archives : [jeux et créateurs](../../archives/plans/planner-multi-etablissements/07-jeux-createurs.md)
