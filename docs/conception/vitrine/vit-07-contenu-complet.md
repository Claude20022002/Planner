# VIT-07 · le site présente toutes les applications — plan court

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) · fiche [vit-07-contenu-complet](../../plan/missions/vit-07-contenu-complet.md) |
| Branche | `feat/vit-07-contenu-complet`, depuis `origin/main` (`5f053ebf`) |
| Rédigé par | agent de Cursor (Grok 4.7), le 18 novembre 2026 |
| **Validé** | en attente du chef |

Quatre pages nouvelles, la carte « Bibliothèque » retirée de « Bientôt », et un menu « Fonctions ». Aucun prix, aucun nom d'école, aucune date. L'anglais traduit les mêmes phrases. L'arabe reprend les clés vides : le français s'affiche (UIX-04). Les composants du socle ne changent pas, sauf `EnTete.astro` pour le menu. Ni `vitrine/src/styles/`, ni l'accueil.

## 1. Les pages

Même assemblage que `en-classe.astro` : `EnTetePage`, `Presentation`, `GrilleCartes`, `FinDePage`. Pas de capture inventée. `IllustrationQuiz` est réutilisée sur la page Quiz, elle existe déjà.

| Page | Adresse | Clé |
|---|---|---|
| Quiz et jeux | `quiz-et-jeux` | `quizEtJeux` |
| Bibliothèque | `bibliotheque` | `bibliotheque` |
| Cours et annonces | `cours-et-annonces` | `coursEtAnnonces` |
| Application | `application` | `application` |

## 2. Quiz et jeux

| Phrase | Fichier |
|---|---|
| Quiz et jeux · Planner | `frontend/src/i18n/applications.fr.js`, clé `activites.titre` |
| Créer, projeter, jouer. | même fichier, `activites.resume` |
| L'enseignant prépare le quiz. Les étudiants le rejoignent par un code ou un QR code. | `backend/services/studio/sessions.js` (code) ; `frontend/src/components/studio/editeur/CodeAcces.jsx` (QR et lien) |
| Dix façons de poser une question : choix unique, choix multiple, vrai ou faux, réponse courte, nombre, texte à trous, association, ordre, zone sur une image, réponse libre. | `shared/quiz/studio/types.js`, `TYPES` |
| Une question peut porter une image, un son ou une vidéo. | le même fichier, `TYPES_MEDIAS` |
| À son rythme, chacun ouvre le quiz par le lien, le code ou le QR code. | `frontend/src/components/studio/outils.js`, `lienQuiz` |
| En direct, la classe répond ensemble. Une réponse fausse ne rapporte rien. Une réponse juste rapporte davantage si elle arrive tôt. Le serveur chronomètre. | `shared/quiz/studio/direct.js` |
| Quand l'école active l'IA, elle propose des questions. L'enseignant les relit avant de les ouvrir aux étudiants. Sans clé d'IA, la fonction est éteinte. | `backend/services/studio/iaGeneration.js` ; `backend/services/ia/client.js` |
| Dix simulations, trente défis : Tri Cyber, Nœuds Réseaux, Labo des seuils, Pilote des stocks, Sprint Agile, Robot Route, Requête Parfaite, Ordonnanceur CPU, Budget ERP, Labo Big-O. Chaque simulation a trois défis. | `shared/simulations/catalogue/` (dix fichiers, trois `niveau` chacun) |
| Un terminal Linux sert à s'exercer aux commandes. | `shared/terminal/moteur.js` |
| L'enseignant ouvre une session. La classe joue au tableau, ou chacun sur son téléphone via le QR code. Il suit les étudiants, puis termine la session. | `frontend/src/pages/jeux/SessionJeu.jsx` |

## 3. Bibliothèque

StudyLib, lu sans y écrire. La carte « Bibliothèque » de `bientot.json` (« Les prêts de livres, depuis le téléphone ») est retirée dans les trois langues : ce prêt n'existe pas dans StudyLib.

| Phrase | Fichier |
|---|---|
| La bibliothèque des documents de l'école. | `StudyLib/routes/web.php`, route `documents.index` ; `StudyLib/app/Http/Controllers/DocumentController.php` |
| Les documents sont rangés par filière et par module. | `StudyLib/routes/web.php`, `filieres.index` et `filieres.modules` |
| Un document est un cours, un examen, un TD, un TP, un exercice ou un article. | `StudyLib/app/Enums/DocumentType.php` |
| Un dépôt attend une relecture avant d'être visible. | `StudyLib/app/Services/DocumentService.php` ; `StudyLib/app/Http/Controllers/Admin/ModerationController.php` |
| On le télécharge et on le note. | `DocumentDownloadController.php` ; `DocumentRatingController.php` |
| Les étudiants y laissent un avis de stage, une idée de projet, et consultent les événements. | `InternshipReviewController.php` ; `ProjectIdeaController.php` ; `EventController.php` |
| Un module peut proposer des vidéos. | `YoutubeRecommendationController.php` |
| Des suggestions sont proposées quand l'IA est disponible. | `AiRecommendationController.php` |

## 4. Cours et annonces

Une seule page, deux parties. Les annonces sont une application à part (`applications.fr.js`, `annonces`) ; elles tiennent dans la seconde partie, sans page de plus.

| Phrase | Fichier |
|---|---|
| Les supports de la classe, et les nouvelles de l'école. | `frontend/src/i18n/applications.fr.js`, `pedagogie` et `annonces` |
| L'enseignant dépose un document ou un lien dans une section. | `backend/services/cours/supports.js` |
| L'étudiant voit les supports publiés de ses cours. | `frontend/src/pages/MesCours.jsx` ; `backend/services/cours/sections.js` |
| Les sondages de la classe s'ouvrent quand l'établissement les active. Une question, de deux à six choix. | `backend/services/cours/sondages.js` |
| Une annonce s'adresse à une classe, un groupe ou une filière. L'e-mail est facultatif. | `backend/services/annonces/annonces.js` |

## 5. Application

Le nom affiché reste Planner. `mobile/app.json` porte un nom d'école : il ne s'écrit pas sur le site.

| Phrase | Fichier |
|---|---|
| L'emploi du temps, l'appel, les jeux et la bibliothèque, sur le téléphone. | `mobile/src/app/(onglets)/_layout.jsx` |
| Cinq onglets : le tableau, la semaine, le scanner, la bibliothèque, le compte. | le même fichier |
| Le scanner enregistre la présence et rejoint un quiz ou un jeu. | `mobile/src/app/scanner.jsx` |
| Elle n'est pas proposée sur un magasin d'applications. | `mobile/app.json` : identifiants de paquet, aucun lien de magasin |

## 6. Navigation

La barre a aujourd'hui six liens (`langues.js`, `NAVIGATION`). Quatre pages de plus dépasseraient huit liens avec Solutions.

Proposition : en tête, Solutions, Fonctions, Sécurité et données, Bientôt, et le contact. « Fonctions » ouvre : Emploi du temps, En classe, Quiz et jeux, Cours et annonces, Bibliothèque, Application, Pour l'établissement. Le menu est un `details` dans `EnTete.astro`, lisible sans JavaScript, en 390, 768 et 1440 px. Le style ajouté reste dans ce fichier, pas dans `vitrine/src/styles/`.

## 7. Fichiers, au moment du code

| Fichier | Rôle |
|---|---|
| `vitrine/src/pages/[lang]/` | les quatre pages |
| `vitrine/src/i18n/{fr,en,ar}/` | leurs textes, `bientot.json`, `commun.json` |
| `vitrine/src/i18n/langues.js` | `PAGES` et le menu |
| `vitrine/src/components/socle/EnTete.astro` | le menu seulement |
| `vitrine/tests/` | si un test fige la liste plate des liens |
| fiche de session, ligne du module VIT | à la fin du code. `suivi.md` n'est pas modifié |

## 8. Contrôles, au moment du code

Build, `vitrine` tests unitaires, `node scripts/verifier-neutre.mjs`, pas de défilement horizontal en 390 et 1440 px. Lighthouse et axe-core sur chaque page nouvelle s'ils tournent ici ; sinon le rapport le dit.

## 9. Question

| N° | Question | Proposition | Réponse du chef |
|---|---|---|---|
| 1 | Coder ces quatre pages, ces phrases, le retrait de la carte Bibliothèque, et ce menu Fonctions ? | **oui** | |
