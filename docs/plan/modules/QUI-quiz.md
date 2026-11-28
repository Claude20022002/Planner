# QUI · Quiz

**Objet** : les quiz que l'enseignant écrit, et ce que l'élève y répond :
- le **Studio quiz**, moteur natif de Planner (dans les écrans, on dit « Quiz ») ;
- le quiz en direct, le quiz à son rythme, puis les questionnaires non notés (QJE-14) et l'évaluation notée (QJE-10) ;
- la préparation des quiz par l'IA, quand elle est activée ;
- la sortie de ClassQuiz.

Module né le 27 nov. de la séparation des quiz et des jeux (QJE-17, [conception](../../conception/jeux/qje-17-separer-quiz-jeux.md)). Les jeux sont dans [JEU](JEU-jeux-pedagogiques.md), l'IA dans [IAG](IAG-ia.md). **Les fonctions QJE-xx gardent leur numéro** ; une fonction nouvelle prend le code `QUI-` (table de correspondance : [README](../README.md), § 1).

**Hors module** :
- le stockage des médias (BIB-03) ;
- le client d'IA, son fournisseur et ses quotas (IAG) ;
- les devoirs : ils sont éteints, et rejoindront l'Espace de cours (COU) à leur retour.

**Tables possédées** :
- les tables du Studio (`models/studio.js`) ;
- `quizDirect` ;
- `QuizPartie`, `QuizResultat` (parties ClassQuiz) ;
- `GenerationQuiz` (préparation par l'IA).

**Identifiant technique** : `quiz` (logo, teinte `app-quiz`, catalogue de l'application, futur registre de VEN-01) ; `quiz` sur le site.

## Ce qui existe

- **Studio quiz** :
  - fichiers : `studioQuizRoutes`, `passationRoutes`, `quizDirectRoutes`, `services/studio/*`, `shared/quiz/studio/*` ; écrans `pages/studio/*` ;
  - 10 types de questions et des médias ;
  - passation par QR code ou par code ;
  - quiz en direct (migration 0046) ;
  - import des quiz de ClassQuiz (`deploy/vps/importer-classquiz.mjs`).
- **Préparation par l'IA** : `quizIaRoutes`, `services/studio/iaGeneration.js` ; écran « Mes quiz » (`GenererIaDialog`). Le client d'IA lui-même est dans IAG.
- **ClassQuiz** : fork dans un dépôt séparé, derrière l'interrupteur `classquiz_actif` de chaque école (migration 0057). Il est éteint pour une installation neuve et allumé pour l'école pilote. Ses conteneurs restent dans le compose.
- **Application mobile** : le scanner ouvre `/quiz/code`. Le joueur natif est coupé (`QUIZ_DANS_L_APPLICATION = false`).
- **Encore mêlé aux jeux** jusqu'aux étapes 17c à 17g de QJE-17 : la page web « Activités » (`/jeux`) garde l'historique des quiz ClassQuiz et `ResultatsQuiz` ; l'écran mobile « Activités » montre les quiz en cours ; la page « Quiz » de l'étudiant reçoit aussi les codes de jeu (porte « Rejoindre » à venir).

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| QJE-01 | L'entrée « Quiz » du sélecteur d'espaces ouvre Planner, plus ClassQuiz (`shared/espaces.js`) : enseignant sur `/jeux`, étudiant sur `/quiz` (QJE-17 mènera l'enseignant sur « Mes quiz ») | SQ-5 | libre | S | — | fait (#208, 18 nov.) |
| QJE-02 | Import des formats GIFT et Moodle XML dans le Studio | SQ-3 | 3 | M | — | à faire |
| QJE-03 | Joueur natif dans l'application, sans passer par le site | SQ-1 | 2 | M | — | à faire |
| QJE-06 | Sortie complète de ClassQuiz : plus aucun conteneur ClassQuiz pour une école qui ne l'a pas | — | 2 | M | QJE-01 | à faire |
| QJE-09 | Défis Linux dans un quiz (une question qui reprend le terminal des jeux) | J-1 | — | M | QJE-04 | reporté |
| QJE-10 | Évaluation en ligne notée : quiz du Studio passé comme évaluation (minuté, ordre aléatoire, une tentative), note versée au carnet de VSC-08 | — | 3 | M | VSC-08 (VSC-04 remplacée le 26 nov., décision du chef : barème et résultat communs, N7) | à faire |
| QJE-11 | Correction de QCM papier par photo : feuille-réponse imprimable, photo prise par le téléphone de l'enseignant, note proposée puis validée | — | 6 | L | QJE-10 | à faire |
| QJE-14 | Le Studio quiz « comme Google Forms » : sections et sauts, questionnaires non notés (anonymes possibles), tableau des réponses et export CSV et Excel, éditeur sur une page, questionnaires de l'administration ; découpée en QJE-14a à 14e ([conception](../../conception/jeux/qje-14-studio-forms.md)) | — | libre (exception de la sortie de ClassQuiz) | M + L + L + M + M | — | plan validé par le chef le 21 nov. (`doc/qje-14-studio-forms`) ; 14a à faire |

La séparation elle-même (QJE-17) est rangée dans [JEU](JEU-jeux-pedagogiques.md), avec le module qu'elle crée.

## Critères de « terminé »

- **QJE-01** : une école sans ClassQuiz ne voit aucun lien vers lui.
- **QJE-06** : une installation neuve démarre sans les cinq conteneurs de ClassQuiz.
- **QJE-11** : une feuille photographiée de travers ou mal éclairée est lue ou refusée avec une raison ; aucune note n'entre au carnet sans la validation de l'enseignant.
- **Préparation par l'IA** : la sortie de l'IA est relue par l'enseignant avant publication (règle de QJE-07, dans IAG).

## Références

- [Conception de QJE-17](../../conception/jeux/qje-17-separer-quiz-jeux.md) (séparation des quiz et des jeux)
- Archives : [Studio quiz](../../archives/plans/studio-quiz.md), [sortie de ClassQuiz](../../archives/plans/sortie-classquiz.md), [quiz par l'IA](../../archives/plans/quiz-ia.md)
