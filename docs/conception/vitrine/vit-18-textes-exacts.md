# VIT-18 · Les textes exacts du site vitrine · plan court

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) · préparation de VIT-05 |
| Mission | [vit-18-textes-exacts](../../plan/missions/vit-18-textes-exacts.md) (sur `doc/coordination-equipe` tant qu'elle n'est pas fusionnée) |
| Origine | [expertise du site](../../etude-marche/12-expertise-site-vitrine.md), § 3 (P1 à P6), § 12 (D1 à D4), § 13 (C5 et C7), § 14 (lot B) |
| Branche | `fix/vit-18-textes-exacts`, depuis `origin/main` (`d27e30ee`) ; le code après la fusion de VIT-14 (#224) |
| Rédigé par | Claude Code (Opus 5.5), session de l'expertise, le 19 novembre 2026 |
| **Validé** | **par Claude20022002 le 19 novembre 2026**, par l'outil de questions : groupes 1 à 5 et questions 6 et 7 (« Je valide », pour chacun). Les phrases de D2 et D3 l'étaient déjà |

## 1. Objet et critère de « terminé »

Rendre exacte chaque phrase du site que l'expertise a trouvée trop large, appliquer les décisions D2, D3 et D4 du chef, et raconter EP-18 sur l'accueil et la page En classe. **Aucun composant ne change**, sauf deux lignes de `EnTete.astro` (question 7, accordée). La vidéo n'est pas touchée (§ 6).

« Terminé » quand :

- chaque phrase du § 3 est écrite telle que validée, en français et en anglais ; l'arabe garde ses clés (valeurs vides aujourd'hui) ;
- `TYPES` suit l'ordre de D4 : supérieur, formation, collège et lycée ;
- le test de garde (§ 5) passe, et échoue si l'on remet l'une des formules retirées ;
- `npm run build`, `npm run test:unit` et `node scripts/verifier-neutre.mjs` sont verts ;
- axe-core est sans violation en 390 et 1440 px sur l'accueil, En classe, Quiz et jeux, Solutions, Bientôt, Sécurité et Bibliothèque.

## 2. Ce qui existe

| Fichier | Ce qui compte pour VIT-18 |
|---|---|
| `vitrine/src/i18n/{fr,en,ar}/*.json` | les textes ; une valeur arabe vide prend le français. Aucune clé n'est ajoutée ni retirée, sauf l'ordre des clés de `solutions.json` · `types` |
| `vitrine/src/components/solutions/types.js` | l'ordre des types, et le `ton` de chaque section (clair, gris, clair), qui suit la place et non le type |
| `vitrine/src/components/socle/EnTete.astro`, lignes 20 et 43 | les icônes du menu « Solutions » sont prises **par position** (`iconesTypes[i]` : `School`, `Landmark`, `Briefcase`). Changer l'ordre de `TYPES` sans toucher ce fichier donnerait l'icône de l'école au supérieur (question 7) |
| `vitrine/tests/solutions.test.js`, lignes 25 et 38 | l'ordre de `TYPES` est figé ; les clés de `solutions.json` · `types` doivent suivre le même ordre |
| `vitrine/tests/contenu.test.js`, lignes 16 à 40 et 80 à 91 | fige quatre phrases qui changent (l'IA du Studio, les jeux sur téléphone, l'IA de la Bibliothèque, l'appel à la main) et exige « Au Maroc, Massar en est un exemple. » |
| PR #224 (VIT-14) | n'ajoute que `comparer.json` et une clé de `commun.json`. Aucune clé changée ici n'y est touchée, et `comparer.json` ne contient aucune formule interdite par le test de garde (vérifié sur la branche, 19 nov.) |

## 3. Les phrases, avant et après

Les sources renvoient au code de `origin/main`. Les phrases déjà validées par le chef portent la mention **validé (D2)** ou **validé (D3)** : elles appliquent sa décision mot pour mot. La traduction anglaise suit la même règle.

### 3.1 · Déjà validées : l'IA (D2)

Formule : « quand l'IA est activée pour votre école » ; en anglais, « when AI is turned on for your school ». Source : l'IA dépend de la clé du serveur (`backend/services/ia/client.js`, lignes 7 et 25), pas d'un réglage de l'école.

| Clé | Avant | Après |
|---|---|---|
| `accueil.json` · `donnees.points.2.texte` ; `securite.json` · `protections.cartes.5.texte` | fr : « Quand l'école active l'IA, celle-ci ne reçoit jamais de données d'élève, et l'enseignant relit ce qu'elle propose. »<br>en : « When the school turns AI on, it never receives student data, and teachers review what it suggests. » | fr : « Quand l'IA est activée pour votre école, elle ne reçoit jamais de données d'élève, et l'enseignant relit ce qu'elle propose. »<br>en : « When AI is turned on for your school, it never receives student data, and teachers review what it suggests. » · **validé (D2)** |
| `quiz-et-jeux.json` · `studio.points.3` (première phrase) | fr : « Quand l'école active l'IA, elle propose des questions. »<br>en : « When the school turns AI on, it suggests questions. » | fr : « Quand l'IA est activée pour votre école, elle propose des questions. »<br>en : « When AI is turned on for your school, it suggests questions. » · **validé (D2)**. La dernière phrase est la question 4 |
| `bibliotheque.json` · `documents.cartes.5.texte` | fr : « Des suggestions sont proposées quand l'IA est disponible. »<br>en : « Suggestions are offered when AI is available. » | fr : « Des suggestions sont proposées quand l'IA est activée pour votre école. »<br>en : « Suggestions are offered when AI is turned on for your school. » · **validé (D2)** |

### 3.2 · Déjà validées : aucun pays (D3)

| Clé | Avant | Après |
|---|---|---|
| `solutions.json` · `types.collegeLycee.bientot.3.texte` ; `bientot.json` · `aussi.cartes.4.texte` | fr : « Les données de l'école, exportées vers la plateforme nationale de votre pays. Au Maroc, Massar en est un exemple. »<br>en : « …national platform. In Morocco, Massar is one example. » | fr : « Les données de l'école, exportées vers la plateforme nationale de votre pays. »<br>en : « School data, exported to your country's national platform. » (la page Solutions garde son « The school's data ») · **validé (D3)** |
| `solutions.json` · `types.superieur.texte` | fr : « Pour l'université, la grande école et le BTS : Planner calcule le semestre, puis accompagne chaque séance. »<br>en : « For universities, specialised schools and BTS programmes: … » | fr : « Pour l'université, la grande école et les formations techniques supérieures : Planner calcule le semestre, puis accompagne chaque séance. »<br>en : « For universities, specialised schools and higher technical programmes: Planner works out the semester, then supports every session. » · **validé (D3)** |
| `bientot.json` · `ecole.cartes.0.texte` ; `solutions.json` · `types.superieur.bientot.0.texte` | fr : « La saisie des notes et les bulletins, avec les crédits du LMD. »<br>en : « Grade entry and report cards, with LMD credits. » | fr : « La saisie des notes et les bulletins, avec les crédits. »<br>en : « Grade entry and report cards, with credits. » · **validé (D3)** |

### 3.3 · L'ordre des types (D4, validé)

`types.js` : `superieur` (ton clair), `formation` (ton gris), `collegeLycee` (ton clair). Les clés de `solutions.json` · `types` suivent cet ordre dans les trois langues. Le test `solutions.test.js`, ligne 25, prend le nouvel ordre. Les icônes du menu : question 7.

### 3.4 · À valider par le chef, groupe par groupe

**Groupe 1 · l'accroche de l'accueil (P1, D4).** Source : `solutions.json` · `types.collegeLycee.texte` dit déjà que le calcul d'un collège ou d'un lycée « est en préparation » ; le calcul du supérieur, `backend/services/generation/timefold/`.

| Clé | Avant | Après |
|---|---|---|
| `accueil.json` · `ouverture.accroche` | fr : « L'emploi du temps de votre établissement, calculé selon vos règles. Et tout ce qui se passe ensuite en classe. »<br>en : « Your school's timetable, built from your rules. And everything that happens next in class. » | fr : « Pour l'enseignement supérieur et la formation professionnelle, Planner calcule l'emploi du temps et accompagne chaque séance. Le collège et le lycée arrivent bientôt. »<br>en : « For higher education and vocational training, Planner builds the timetable and supports every session. Lower and upper secondary schools are coming soon. » |

**Groupe 2 · le refus expliqué (P2).** Source : les contraintes déclarées sont nommées (`backend/services/moteur/contraintes/avantGeneration.js`) ; les dates sautées ont leur raison (`backend/services/generation/timefold/rapport.js`, lignes 18 à 27) ; quand la semaine type ne trouve pas de place, le message dit seulement d'ouvrir des créneaux ou des salles (lignes 59 à 61). Chaque point du rapport mène à l'écran qui le corrige.

| Clé | Avant | Après |
|---|---|---|
| `accueil.json` · `emploi.refus` | fr : « Quand une séance ne trouve pas sa place, Planner dit quelle règle la bloque. »<br>en : « When a session cannot be placed, Planner tells you which rule is in the way. » | fr : « Quand une séance ne trouve pas sa place, Planner dit ce qui la bloque, et où le corriger. »<br>en : « When a session cannot be placed, Planner says what is in the way, and where to fix it. » |
| `emploi-du-temps.json` · `refus.texte` | fr : « Quand une séance ne trouve pas sa place, Planner nomme la règle qui la bloque. Vous corrigez la donnée ou vous assouplissez la règle, puis vous relancez le calcul. »<br>en : « When a session cannot be placed, Planner names the rule that blocks it. You fix the data or relax the rule, then run the calculation again. » | fr : « Quand une séance ne trouve pas sa place, Planner nomme la règle qui la bloque, ou ce qui manque : un créneau, une salle, un enseignant. Vous corrigez, puis vous relancez le calcul. »<br>en : « When a session cannot be placed, Planner names the rule that blocks it, or what is missing: a slot, a room, a teacher. You fix it, then run the calculation again. » |

**Groupe 3 · les quiz et les jeux (P3, P4, et la fin de la phrase de l'IA du Studio).** Sources : quatre types ne se posent pas en direct (`backend/services/studio/direct.js`, ligne 57), il en reste six sur dix (`shared/quiz/studio/types.js`) ; les dix jeux portent sur l'informatique et la gestion (`shared/simulations/catalogue/`) ; sans clé, la fonction d'IA est désactivée (`backend/services/ia/client.js`, ligne 7).

| Clé | Avant | Après |
|---|---|---|
| `accueil.json` · `quiz.titre` | fr : « Des quiz en direct. Des jeux pour réviser. »<br>en : « Live quizzes. Games for revision. » | fr : « Des quiz en direct. Des jeux pour s'exercer. »<br>en : « Live quizzes. Games to practise. » |
| `accueil.json` · `quiz.texte` | fr : « Dix types de questions, des images et des vidéos, des quiz en direct ou en devoir. L'enseignant propose aussi des jeux à ses classes. »<br>en : « Ten question types, images and videos, quizzes run live or as homework. Teachers can also offer games to their classes. » | fr : « Dix types de questions, avec images, sons et vidéos. Six se jouent en direct, les dix à son rythme. L'enseignant propose aussi des jeux à ses classes. »<br>en : « Ten question types, with images, sounds and videos. Six can be played live, all ten at one's own pace. Teachers can also offer games to their classes. » |
| `en-classe.json` · `meta.description` | fr : « …quiz en direct ou à faire à son rythme, jeux pour réviser et sondages anonymes… »<br>en : « …live or self-paced quizzes, revision games and anonymous polls… » | fr : « …quiz en direct ou à faire à son rythme, jeux d'informatique et de gestion, et sondages anonymes… »<br>en : « …live or self-paced quizzes, computing and management games, and anonymous polls… » |
| `quiz-et-jeux.json` · `jeux.texte` | fr : « Tri Cyber, Nœuds Réseaux, … Labo Big-O. Chaque simulation a trois défis. » | fr : « Dix jeux d'informatique et de gestion : Tri Cyber, Nœuds Réseaux, … Labo Big-O. Chaque simulation a trois défis. »<br>en : « Ten computing and management games: Tri Cyber, … Labo Big-O. Each simulation has three challenges. » |
| `quiz-et-jeux.json` · `studio.points.3` (dernière phrase) | fr : « Sans clé d'IA, la fonction est éteinte. »<br>en : « Without an AI key, the feature is off. » | fr : « Sinon, la fonction reste éteinte. »<br>en : « Otherwise, the feature stays off. » |

**Groupe 4 · l'appel, d'abord à la main (C5, EP-18).** Source : `backend/services/presences/appel.js` : l'enseignant coche à la main (ligne 15) ; le QR code change toutes les 30 secondes (ligne 11) ; le scan passe par l'application, et un téléphone ne pointe qu'un seul étudiant par séance (lignes 18 à 21). « Affiche » remplace « projette » : le code s'affiche sur l'écran de l'enseignant, un projecteur n'est pas nécessaire.

| Clé | Avant | Après |
|---|---|---|
| `accueil.json` · `appel.texte` | fr : « L'enseignant projette un QR code. Les étudiants le scannent avec leur téléphone, et leur présence est notée. Il peut aussi noter chacun à la main : présent, en retard ou absent. »<br>en : « The teacher shows a QR code. Students scan it with their phone… The teacher can also mark each student by hand… » | fr : « L'enseignant coche chaque étudiant : présent, en retard ou absent. S'il le veut, il affiche un QR code, que les étudiants scannent avec l'application Planner. Le code change toutes les 30 secondes. »<br>en : « The teacher marks each student: present, late or absent. If they wish, they display a QR code that students scan with the Planner app. The code changes every 30 seconds. » |
| `en-classe.json` · `appel.texte` | fr : « L'enseignant projette un QR code au début de la séance. Les étudiants le scannent… Il peut aussi noter chacun à la main : présent, en retard ou absent. » | fr : « Au début de la séance, l'enseignant coche chaque étudiant : présent, en retard ou absent. S'il le veut, il affiche un QR code, que les étudiants scannent avec l'application Planner. Le code change toutes les 30 secondes. »<br>en : « At the start of the session, the teacher marks each student: present, late or absent. If they wish, they display a QR code that students scan with the Planner app. The code changes every 30 seconds. » |
| `en-classe.json` · `appel.points` (trois points, dans cet ordre) | fr : « Le scan marque l'étudiant présent. » ; « L'enseignant note aussi à la main : présent, en retard, absent. Un étudiant sans téléphone est noté ainsi. » ; « La présence est rattachée à la séance de l'emploi du temps »<br>en : « A scan marks the student present. » ; « The teacher also marks by hand… » ; « Attendance is linked… » | fr : « À la main, sur la liste de la séance : les étudiants n'ont besoin ni de téléphone, ni d'écran projeté. » ; « Par QR code, avec l'application : un téléphone ne pointe qu'un seul étudiant. » ; « La présence est rattachée à la séance de l'emploi du temps. »<br>en : « By hand, on the session list: students need neither a phone nor a projected screen. » ; « By QR code, with the app: one phone checks in one student only. » ; « Attendance is linked to the timetabled session. » |

**Groupe 5 · les jeux sur ordinateur, le hors ligne, la formation (C5, P6).** Sources : les jeux sont ouverts aux étudiants dans l'application web (`frontend/src/App.jsx`, ligne 353) ; dans l'application mobile, le dernier tableau et les dernières semaines consultés restent lisibles sans réseau (`mobile/src/cache.js` ; `mobile/src/app/(onglets)/semaine.jsx`, lignes 46 à 50), le hors ligne complet (MOB-06) n'est pas fait ; aucune notion de session de formation dans le code.

| Clé | Avant | Après |
|---|---|---|
| `quiz-et-jeux.json` · `jeux.cartes.1.texte` | fr : « En individuel, chacun joue sur son téléphone. En collectif, le terminal Linux est projeté au tableau : l'enseignant y tape une commande, ou choisit celle qu'un étudiant envoie. »<br>en : « Individually, each student plays on a phone. Together, … » | fr : « En collectif, le terminal Linux est projeté au tableau : l'enseignant y tape une commande, ou choisit celle qu'un étudiant envoie. En individuel, chacun joue sur son téléphone ou sur un ordinateur. »<br>en : « Together, the Linux terminal is shown on the board: the teacher types a command, or picks the one a student sends. Individually, each student plays on a phone or a computer. » |
| `bientot.json` · `aussi.cartes.3.texte` | fr : « L'application mobile, utilisable sans connexion. »<br>en : « The mobile app, usable without a connection. » | fr : « L'application mobile entièrement utilisable sans connexion. La semaine déjà consultée se lit dès aujourd'hui sans réseau. »<br>en : « The mobile app, fully usable without a connection. The week already viewed can be read offline today. » |
| `solutions.json` · `types.formation.titre` | fr : « Des sessions qui changent, un planning qui suit. »<br>en : « Sessions change, the schedule follows. » | fr : « Un emploi du temps calculé, que vous ajustez. »<br>en : « A calculated timetable you can adjust. » |

## 4. Questions au chef

Posées par l'outil de questions, une par groupe. **Ce que le chef tape dans « Autre » n'arrive pas** : pour changer une phrase, il l'écrit dans son message.

| N° | Question | Proposition | Réponse du chef |
|---|---|---|---|
| 1 | Groupe 1 : l'accroche de l'accueil | le texte du § 3.4, groupe 1 | **validé** |
| 2 | Groupe 2 : le refus expliqué (deux phrases) | les textes du groupe 2 | **validé** |
| 3 | Groupe 3 : quiz et jeux (cinq phrases) | les textes du groupe 3 | **validé** |
| 4 | Groupe 4 : l'appel d'abord à la main (trois clés) | les textes du groupe 4 | **validé** |
| 5 | Groupe 5 : jeux sur ordinateur, hors ligne, formation (trois phrases) | les textes du groupe 5 | **validé** |
| 6 | La carte « Hors ligne » de Bientôt peut-elle dire qu'une partie existe déjà, alors que la page Bientôt ne montre que ce qui n'existe pas ? | oui, en une phrase : c'est exact, et c'est un argument d'EP-18 | **oui, en une phrase** |
| 7 | Changer l'ordre de `TYPES` donnerait l'icône de l'école au supérieur, car `EnTete.astro` prend les icônes par position. Puis-je toucher **deux lignes** de `EnTete.astro`, hors de mon périmètre, pour prendre l'icône par clé de type ? | oui : `iconesTypes` devient un objet `{ superieur: Landmark, formation: Briefcase, collegeLycee: School }` (lignes 20 et 43). VIT-17 touche aussi ce fichier (le saut du menu) : le premier fusionné passe, l'autre fusionne `main` | **oui, deux lignes** |

## 5. Le test de garde

Dans `vitrine/tests/contenu.test.js`, un test lit toutes les chaînes des fichiers `fr` et `en` et échoue si l'une contient : « Maroc », « Morocco », « Massar », « BTS », « LMD », « l'école active l'IA », « the school turns AI on », « quand l'IA est disponible », « when AI is available ».

- **Exception, nommée dans le test** : les deux phrases de la vidéo (`accueil.json` · `video.scenes.4.lignes.0` et `video.scenes.7.lignes.1`). Elles doivent rester identiques au film jusqu'à son prochain rendu (§ 6). L'exception retombe d'elle-même : le test vérifie aussi que seules ces deux clés y échappent.
- **Les phrases figées du même fichier** changent avec les textes : l'IA du Studio, les jeux, l'IA de la Bibliothèque, l'appel à la main (lignes 24, 28, 36 et 85). L'assertion « Au Maroc, Massar en est un exemple. » (ligne 88) s'inverse : la phrase ne doit plus y être.
- **Le test de régression** de chaque correction est ce test de garde (formules retirées) et les phrases figées (formules nouvelles).

## 6. Pour la prochaine version de la vidéo (VIT-08, Claude de VS Code)

Deux phrases de la vidéo ne suivent plus le site. Elles ne changent qu'au prochain rendu, avec leur transcription :

| Clé | Aujourd'hui | Proposé |
|---|---|---|
| `accueil.json` · `video.scenes.4.lignes.0` | « Dix types de questions. En direct, les points comptent la justesse et la rapidité. » | « Dix types de questions, six en direct. En direct, les points comptent la justesse et la rapidité. » |
| `accueil.json` · `video.scenes.7.lignes.1` | « Double authentification, accès par rôle. Quand l'école active l'IA, celle-ci ne reçoit aucune donnée d'élève. » | « Double authentification, accès par rôle. Quand l'IA est activée pour votre école, elle ne reçoit aucune donnée d'élève. » (D2) |

## 7. Sécurité et exigences produit

- Aucune donnée, aucune route, aucune migration : des textes et l'ordre d'une liste.
- **EP-18** : l'appel commence par la liste à la main (groupe 4) ; les jeux s'ouvrent aussi sur ordinateur (groupe 5) ; la lecture sans réseau de la semaine est dite (groupe 5). Aucune phrase ne fait du téléphone ou du projecteur le seul chemin.
- **EP-5 généralisée** : plus aucun pays nommé (D3), et le test de garde l'empêche de revenir.
- **EP-11** : français et anglais à jour ; l'arabe garde ses clés vides.
- **EP-16** : aucun texte en dur ; tout reste dans `i18n/`.

## 8. Fichiers modifiés

| Fichier | Ce qui change |
|---|---|
| `vitrine/src/i18n/fr/` et `en/` : `accueil.json`, `emploi-du-temps.json`, `en-classe.json`, `quiz-et-jeux.json`, `solutions.json`, `bientot.json`, `bibliotheque.json`, `securite.json` | les phrases du § 3 |
| `vitrine/src/i18n/ar/solutions.json` | l'ordre des clés de `types` seulement |
| `vitrine/src/components/solutions/types.js` | l'ordre et les tons (§ 3.3) |
| `vitrine/src/components/socle/EnTete.astro` | deux lignes : l'icône prise par clé de type (question 7, accordée par le chef) |
| `vitrine/tests/contenu.test.js`, `vitrine/tests/solutions.test.js` | le test de garde, les phrases figées, l'ordre des types |
| `docs/plan/modules/VIT-site-vitrine.md` | la ligne de VIT-18 |

## 9. Étapes

1. Ce plan, commité seul.
2. Les questions 1 à 7 au chef ; ses réponses dans le § 4 et la ligne « Validé ».
3. Après la fusion de #224 : `git merge origin/main`, puis les textes, `types.js`, le test de garde.
4. Build, tests, `verifier-neutre`, axe-core en 390 et 1440 px ; fiche de session.
