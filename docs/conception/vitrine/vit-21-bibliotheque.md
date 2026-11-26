# VIT-21 · La Bibliothèque est « Bientôt » : phrases à corriger (phase a)

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) |
| Branche | `fix/vit-21-bibliotheque`, depuis `origin/main` |
| Rédigé par | Claude Code (Sonnet 5.5), le 2026-11-22 |
| Taille | M (le rendu de la vidéo de l'accueil est refait) |
| **Visa** | **en attente du chef** : « Visé » ou « Visé sauf : … » dans un commentaire de la PR. Aucun code avant. |

## 1. Objet

La Bibliothèque est le module n° 5 de l'[étude 15](../../etude-marche/15-modules-et-packs.md), « Bientôt » à l'étape 3 (décision du chef, 22 nov.) ; StudyLib ne tourne plus.
Le site ne doit plus la dire disponible. Ce document liste **chaque phrase** de `vitrine/src` et du texte de la vidéo de l'accueil qui la présente comme disponible, ou qui nomme StudyLib,
avec sa proposition en français et en anglais. **Une réécriture n'ajoute rien : elle retire la Bibliothèque de la phrase.** Quand la phrase ne tient pas sans elle, elle est retirée.

Méthode : recherche de `biblioth`, `library`, `studylib` dans tout `vitrine/src` (textes `fr`, `en`, `ar`, pages, composants, registre) et dans `docs/presentation/video/src/accueil`, puis relecture des phrases
qui disent la même chose sans le mot (« les documents sont rangés par filière et par module »).

## 2. Ce qui reste, volontairement

| Texte | Pourquoi il reste |
|---|---|
| `modules.json` · `noms.bibliotheque`, la tuile grisée « Bibliothèque · Bientôt » (menu, accueil, `/applications/`) | c'est le module « Bientôt » lui-même |
| `commun.json` · `navigation.bibliotheque` | clé morte (aucune page ne la lit) ; le fichier est réglé par le coordinateur pour #223, on n'y touche pas ici |
| « Bibliothèque des jeux » (onglet de Quiz et jeux, page `/bibliotheque-des-jeux/`, `bibliotheque-des-jeux.json`) | ce sont les dix jeux, un autre objet que le module n° 5 ; le nom prête à confusion, sa renommée est une question (§ 6, n° 1) |
| Entrées du registre rangées sous le module Bibliothèque (documents, dépôts, noter, vidéos, projets, événements) | elles portent déjà le badge « Bientôt » (VIT-20, `entreeBientot`) ; seules trois phrases sont réécrites (lignes 16 à 18) |
| `fonctionnalites.json` (données) · `sources.studylib` | chemins de preuve, jamais montrés |
| Vidéos anciennes `docs/presentation/video/src/scenes/` (Matinee, Keynote…) | pas le site |

## 3. Les phrases du site

| N° | Fichier · clé | Texte actuel (fr) | Texte actuel (en) | Proposition (fr) | Proposition (en) | Note |
|---|---|---|---|---|---|---|
| 1 | `etudiants` · cartes.0 (titre « Bibliothèque » et texte) | « Bibliothèque » : Les documents sont rangés par filière et par module. | « Library » : Documents are organised by programme and by module. | **retirer** | **remove** | retirer la carte et son icône (3 cartes → 2) |
| 2 | `etudiants` · cartes.1.texte | Cinq onglets : le tableau, la semaine, le scanner, la bibliothèque, le compte. | Five tabs: the board, the week, the scanner, the library, the account. | Les onglets : le tableau, la semaine, le scanner, le compte. | The tabs: the board, the week, the scanner, the account. |  |
| 3 | `etudiants` · passage.lignes.1 (avant + avec) | avant : Les documents de l'école sont dans des dossiers partagés. — avec : Les documents sont rangés par filière et par module. | avant : The school's documents sit in shared folders. — avec : Documents are organised by programme and by module. | **retirer** | **remove** | retirer la ligne (5 lignes → 4) |
| 4 | `etudiants` · passage.lignes.2.avec | L'application des étudiants montre leur semaine, scanne le QR code de l'appel et ouvre la Bibliothèque. Sans téléphone, l'emploi du temps et les ressources s'ouvrent dans un navigateur, et l'enseignant fait l'appel à la main. | The students' application shows their week, scans the attendance QR code and opens the Library. Without a phone, the timetable and the resources open in a browser, and the teacher takes attendance by hand. | L'application des étudiants montre leur semaine et scanne le QR code de l'appel. Sans téléphone, l'emploi du temps et les ressources s'ouvrent dans un navigateur, et l'enseignant fait l'appel à la main. | The students' application shows their week and scans the attendance QR code. Without a phone, the timetable and the resources open in a browser, and the teacher takes attendance by hand. |  |
| 5 | `etudiants` · faq.questions.0.reponse | L'application des étudiants montre leur semaine, scanne le QR code de l'appel et ouvre la Bibliothèque. Sans téléphone, l'emploi du temps et les ressources s'ouvrent dans un navigateur, et l'enseignant fait l'appel à la main. | The students' application shows their week, scans the attendance QR code and opens the Library. Without a phone, the timetable and the resources open in a browser, and the teacher takes attendance by hand. | L'application des étudiants montre leur semaine et scanne le QR code de l'appel. Sans téléphone, l'emploi du temps et les ressources s'ouvrent dans un navigateur, et l'enseignant fait l'appel à la main. | The students' application shows their week and scans the attendance QR code. Without a phone, the timetable and the resources open in a browser, and the teacher takes attendance by hand. | même texte que la ligne précédente |
| 6 | `etudiants` · faq.questions.2 (« Où sont les documents de l'école ? ») | Où sont les documents de l'école ? — Les documents sont rangés par filière et par module. | Where are the school's documents? — Documents are organised by programme and by module. | **retirer** | **remove** | retirer la question (3 → 2) |
| 7 | `faq` · questions.3.reponse (« Que propose l'application mobile ? ») | L'application des étudiants montre leur semaine, scanne le QR code de l'appel et ouvre la Bibliothèque. Sans téléphone, l'emploi du temps et les ressources s'ouvrent dans un navigateur, et l'enseignant fait l'appel à la main. | The student app shows the week’s classes, scans the attendance QR code and opens the library. Without a phone, students can open their timetable and resources in a browser, and the teacher can record attendance manually. | L'application des étudiants montre leur semaine et scanne le QR code de l'appel. Sans téléphone, l'emploi du temps et les ressources s'ouvrent dans un navigateur, et l'enseignant fait l'appel à la main. | The student app shows the week’s classes and scans the attendance QR code. Without a phone, students can open their timetable and resources in a browser, and the teacher can record attendance manually. |  |
| 8 | `faq` · questions.5 (« Peut-on choisir StudyLib séparément ? » et sa réponse) | Peut-on choisir StudyLib séparément ? — Contactez-nous pour discuter de StudyLib et des fonctionnalités qui répondent aux besoins de votre établissement. | Can we choose StudyLib separately? — Contact us to discuss StudyLib and the features that meet your school’s needs. | **retirer** | **remove** | retirer la question (StudyLib n'est plus en service). Autre option : « Peut-on choisir un module séparément ? », même réponse avec « les modules » à la place de « StudyLib » |
| 9 | `application` · onglets.titre | Cinq onglets. | Five tabs. | Les onglets. | The tabs. | « Cinq onglets. » compte la Bibliothèque ; page /socle/, section Web et mobile |
| 10 | `application` · meta.description, entete.titre, entete.accroche (clés plus rendues par aucune page) | L'emploi du temps, l'appel, les jeux et la bibliothèque, sur le téléphone. / L'emploi du temps, l'appel, les jeux et la bibliothèque, sur le téléphone. / Cinq onglets : le tableau, la semaine, le scanner, la bibliothèque, le compte. | The timetable, attendance, games and the library, on the phone. / The timetable, attendance, games and the library, on the phone. / Five tabs: the board, the week, the scanner, the library, the account. | **retirer** | **remove** | supprimer les trois clés (fr, en, ar) : la page n'existe plus, seul `onglets` sert |
| 11 | `en-classe` · aussi (carte « Un seul compte », section plus rendue) | Le même compte ouvre Planner, la bibliothèque de cours et les jeux. | The same account opens Planner, the course library and the games. | **retirer** | **remove** | supprimer la section `aussi` (fr, en, ar) : plus rendue ; elle citait « la bibliothèque de cours » |
| 12 | `bibliotheque` · fichier entier (page supprimée par VIT-20) | La bibliothèque des documents de l'école. | The school's document library. | **retirer** | **remove** | supprimer `bibliotheque.json` (fr, en, ar) : plus rendu |
| 13 | `comparer` · lignes.compte.critere | L'appel, les quiz, les jeux et la Bibliothèque, avec un seul compte | Attendance, quizzes, games and the Library, with one account | L'appel, les quiz et les jeux, avec un seul compte | Attendance, quizzes and games, with one account | VIT-14, lecture seule jusqu'ici : exception demandée |
| 14 | `comparer` · lignes.compte.cases.0.texte | L'appel, les quiz, les jeux, l'espace de cours et la Bibliothèque s'ouvrent avec le même compte. | Attendance, quizzes, games, the course space and the Library open with the same account. | L'appel, les quiz, les jeux et l'espace de cours s'ouvrent avec le même compte. | Attendance, quizzes, games and the course space open with the same account. |  |
| 15 | `comparer` · lignes.sansTelephone.cases.0.texte | L'appel se fait à la main. Le terminal Linux se joue au tableau : l'enseignant tape la commande que la classe propose. L'emploi du temps s'imprime en PDF ou s'ouvre dans un navigateur, comme la Bibliothèque. Le quiz et les simulations demandent un appareil par élève : un téléphone ou un poste de l'école. | Attendance is taken by hand. The Linux terminal is played on the board: the teacher types the command the class suggests. The timetable prints as a PDF or opens in a browser, like the Library. Quizzes and simulations need one device per student: a phone or a school computer. | L'appel se fait à la main. Le terminal Linux se joue au tableau : l'enseignant tape la commande que la classe propose. L'emploi du temps s'imprime en PDF ou s'ouvre dans un navigateur. Le quiz et les simulations demandent un appareil par élève : un téléphone ou un poste de l'école. | Attendance is taken by hand. The Linux terminal is played on the board: the teacher types the command the class suggests. The timetable prints as a PDF or opens in a browser. Quizzes and simulations need one device per student: a phone or a school computer. |  |
| 16 | `fonctionnalites (registre)` · documents.alternative | Ouvrez la Bibliothèque dans le navigateur de l’école avec une connexion Internet. | Open the library in a school browser with an internet connection. | **retirer** | **remove** | retirer la phrase |
| 17 | `fonctionnalites (registre)` · noter.description | Les lecteurs peuvent noter les documents de la bibliothèque. | Readers can rate library documents. | Les lecteurs peuvent noter les documents. | Readers can rate documents. |  |
| 18 | `fonctionnalites (registre)` · evenements.description | Retrouvez les événements publiés dans StudyLib. | Find events published in StudyLib. | Retrouvez les événements publiés. | Find published events. |  |
| 19 | `fonctionnalites` · applications.bibliotheque | Bibliothèque · StudyLib | Library · StudyLib | Bibliothèque | Library | nom de groupe « Bibliothèque · StudyLib » : on retire StudyLib |

L'arabe garde les mêmes clés, vides : rien à écrire. Les clés retirées le sont aussi dans `ar`.

## 4. Les phrases de la vidéo de l'accueil

Les textes de la vidéo sont la section `video` de `accueil.json` (VIT-08) ; le rendu les lit. Les scènes dessinent aussi la bibliothèque : le code des scènes change avec les textes.

| N° | Fichier · clé | Texte actuel (fr) | Texte actuel (en) | Proposition (fr) | Proposition (en) | Note |
|---|---|---|---|---|---|---|
| V1 | `accueil.json` · `video.scenes.6.lignes.1` | La bibliothèque s'ouvre avec le même compte. | The library opens with the same account. | **retirer** | **remove** | retirer la ligne (la scène 7 garde sa première ligne) ; la bibliothèque qui recouvre l'espace de cours disparaît de la scène |
| V2 | `accueil.json` · `video.scenes.6.image` | L'espace d'une classe : ses sections et leurs supports, un sondage dont les barres montent, une annonce. Puis la bibliothèque s'ouvre. | A class space: its sections and their materials, a poll whose bars rise, an announcement. Then the library opens. | L'espace d'une classe : ses sections et leurs supports, un sondage dont les barres montent, une annonce. | A class space: its sections and their materials, a poll whose bars rise, an announcement. |  |
| V3 | `accueil.json` · `video.scenes.8.lignes.0` | La semaine, le scanner de l'appel, la bibliothèque. | The week, the attendance scanner, the library. | La semaine, le scanner de l'appel. | The week, the attendance scanner. |  |
| V4 | `accueil.json` · `video.scenes.8.image` | Sur un téléphone, la barre du bas montre les onglets Tableau, Semaine, Scanner, Bibliothèque et Compte ; la semaine, le scanner puis la bibliothèque défilent. Puis le logo et le nom de Planner. | On a phone, the bottom bar shows the Board, Week, Scan, Library and Account tabs; the week, the scanner, then the library go by. Then the Planner logo and name. | Sur un téléphone, la barre du bas montre les onglets Tableau, Semaine, Scanner et Compte ; la semaine puis le scanner défilent. Puis le logo et le nom de Planner. | On a phone, the bottom bar shows the Board, Week, Scan and Account tabs; the week, then the scanner go by. Then the Planner logo and name. |  |
| V5 | `accueil.json` · `video.illustrations.applications.6` | Bibliothèque | Library | **retirer** | **remove** | retirer « Bibliothèque » de la liste des applications dessinée à l'écran (6 → 5 entrées ; l'indice de l'application active passe de 6 à rien) |
| V6 | `accueil.json` · `video.illustrations.cours.bibliotheque` | Bibliothèque : Mécanique du point / Analyse 1 / Chimie organique / Algorithmique | Library : Point mechanics / Calculus 1 / Organic chemistry / Algorithms | **retirer** | **remove** | retirer le bloc (titre et documents) : la scène 7 ne dessine plus la bibliothèque |
| V7 | `accueil.json` · `video.illustrations.mobile.onglets.3` | Bibliothèque | Library | **retirer** | **remove** | retirer l'onglet « Bibliothèque » (5 → 4 onglets dessinés) |

Code des scènes (même PR, phase b) : `src/accueil/scenes/A7Cours.tsx` (le recouvrement par la bibliothèque, constante `BIBLIO`, logo d'application 6), `scenes/A9Mobile.tsx` (l'onglet défilant « Bibliothèque » et son écran),
`elements/EcranTelephone.tsx` (`ONGLET` : l'onglet existe dans l'application mobile ; il n'est plus dessiné), `Accueil.tsx` si la durée d'une scène change (elle ne change pas : le mouvement retiré laisse la scène plus calme).

Note : la vidéo montre l'application mobile, dont la barre du bas contient réellement un onglet Bibliothèque (`mobile/src/app/(onglets)/_layout.jsx`). Proposition : ne plus le montrer, par cohérence avec le site. Le chef peut aussi le garder (« Visé sauf : V7 »).

## 4 bis. Dépôt de documents dans l’Espace de cours · complément du 26 novembre à viser

Les liens et les sondages sont disponibles. « Dépôt de documents : Bientôt. » et « Document uploads: coming soon. » reprennent la ligne S1 visée de VIT-20d (#261, `cafbf767`). Sources : [publication des liens](../../../backend/services/cours/supports.js), [sondages ouverts](../../../frontend/src/components/espaceCours/SondagesOuverts.jsx), [dépôt via StudyLib](../../../backend/services/cours/studylib.js) et [reconstruction de la Bibliothèque](../../plan/modules/BIB-bibliotheque.md).

| N° | Fichier · clé | Texte actuel (fr) | Texte actuel (en) | Proposition (fr) | Proposition (en) |
|---|---|---|---|---|---|
| D1 | `cours-et-annonces.json` · `entete.accroche` (accroche et description de la page Espace de cours) | L'enseignant dépose un document ou un lien dans une section. | The teacher adds a document or a link in a section. | L'enseignant publie un lien dans une section. Dépôt de documents : Bientôt. | The teacher publishes a link in a section. Document uploads: coming soon. |
| D2 | `cours-et-annonces.json` · `supports.titre` et `supports.texte` | Les supports publiés. / L'étudiant voit les supports publiés de ses cours. | Published materials. / The student sees the published materials of their courses. | Les liens publiés. / L'étudiant voit les liens publiés de ses cours. | Published links. / Students see the links published in their courses. |
| D3 | `fonctionnalites.json` (registre) · entrée `supports`, `titre` et `description` | Partager les supports de cours / L’enseignant publie un document ou un lien dans l’espace de cours. | Share course materials / Teachers publish a document or link in the course space. | Partager les liens de cours / L’enseignant publie un lien dans l’espace de cours. Dépôt de documents : Bientôt. | Share course links / Teachers publish a link in the course space. Document uploads: coming soon. |
| D4 | `enseignants.json` · `cartes.1.texte` et `passage.lignes.2.avec` | L'enseignant dépose un document ou un lien dans une section. | The teacher adds a document or a link in a section. | L'enseignant publie un lien dans une section. Dépôt de documents : Bientôt. | The teacher publishes a link in a section. Document uploads: coming soon. |
| D5 | `etudiants.json` · `meta.description`, `entete.accroche`, `passage.lignes.0.avec`, `faq.questions.1` | L'étudiant voit les supports publiés de ses cours. / Où sont les supports de mes cours ? | The student sees the published materials of their courses. / Where are my course materials? | L'étudiant voit les liens publiés de ses cours. / Où sont les liens de mes cours ? | Students see the links published in their courses. / Where are my course links? |
| D6 | `accueil.json` · `video.scenes.6.lignes.0` | Supports par section, sondages, annonces de l'école. | Materials by section, polls, school announcements. | Liens par section, sondages, annonces de l'école. | Links by section, polls, school announcements. |
| D7 | `accueil.json` · `video.scenes.6.image` (remplace la proposition V2) | L'espace d'une classe : ses sections et leurs supports, un sondage dont les barres montent, une annonce. Puis la bibliothèque s'ouvre. | A class space: its sections and their materials, a poll whose bars rise, an announcement. Then the library opens. | L'espace d'une classe : ses sections et leurs liens, un sondage dont les barres montent, une annonce. | A class space: its sections and their links, a poll whose bars rise, an announcement. |

D7 affine la proposition V2. Dans [la scène 7](../../presentation/video/src/accueil/scenes/A7Cours.tsx), représenter les titres existants comme des liens en remplaçant le pictogramme de feuille par celui d’un lien.

Le comparatif indique que l’Espace de cours s’ouvre avec le même compte. Le retrait de la Bibliothèque dans cette phrase est déjà couvert par la ligne 14.

## 5. Phase (b), après visa

1. Appliquer **exactement** les phrases visées (fr, en ; clés retirées aussi dans `ar`).
2. Adapter les scènes de la vidéo (§ 4), puis `npm run render:accueil` dans `docs/presentation/video` : fichiers rendus et `vitrine/public/videos/empreinte.json` ; `tests/video.test.js` reste vert.
   Le rendu demande Remotion et un Chromium : si le poste ne peut pas le produire, la PR le dit et s'arrête avant de commiter un rendu faux.
3. Un test (`tests/bibliotheque.test.js`) : aucun texte `fr` ou `en` de `vitrine/src/i18n` ne contient « bibliothèque », « library » ni « StudyLib », hors liste blanche écrite dans le test
   (`modules.json`, `commun.json` · `navigation.bibliotheque`, `bibliotheque-des-jeux.json` et les clés du nom de l'onglet, `fonctionnalites.json` · `applications.bibliotheque`, le registre sous le module `bibliotheque`) ;
   les modules `bibliotheque` du registre ont leur badge « Bientôt » ; les tests existants qui lisent les phrases changées (`roles.test.js`, `fonctionnalites.test.js`, `comparer.test.js`, `contenu.test.js`) sont mis à jour dans la même PR.
4. Contrôles : verifier-neutre, tests unitaires, build, `*.rendu.cjs`, poids EP-19 (la vidéo n'est pas comptée), parcours, axe-core.

## 6. Questions pour le chef

| N° | Question | Proposition |
|---|---|---|
| 1 | Renommer l'onglet et la page « Bibliothèque des jeux » (la même appellation que le module « Bientôt ») ? | non pour l'instant : le nom est celui d'une page visée ; une question de nom, pas de disponibilité |
| 2 | FAQ « Peut-on choisir StudyLib séparément ? » : la retirer, ou la remplacer par « Peut-on choisir un module séparément ? » | la retirer (le remplacement dit quelque chose de nouveau sur la vente) |
| 3 | `comparer.json` et `comparatif.js` (VIT-14) : accepter ces trois corrections et le retrait de `backend/services/cours/studylib.js` des sources de la case « compte » | oui |
| 4 | Page Étudiants : retirer la carte « Bibliothèque », la ligne « documents » du passage et la question sur les documents (lignes 1, 3, 6) | oui |
| 5 | Vidéo : ne plus montrer l'onglet Bibliothèque de l'application mobile | oui |
| 6 | Clés mortes : supprimer `application.json` (meta, entete), `en-classe.json` (`aussi`), `bibliotheque.json` | oui |
