# VIT-20d · « Selon votre équipement » : textes à viser (phase a)

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) · lot D de [VIT-20](vit-20-structure-du-site.md) (§ 4.9) |
| Branche | `feat/vit-20d-equipement`, depuis `origin/main` |
| Rédigé par | Claude Code (Sonnet 5.5), le 2026-11-22 |
| Taille | S |
| **Visa** | **en attente du chef** : une réponse « Visé » ou « Visé sauf : … » dans un commentaire de la PR. Aucun code avant. |

## 1. Objet

Dans chaque page de module disponible (Emploi du temps, Présences, Espace de cours, Quiz et jeux, Annonces et messages), un bloc
« Selon votre équipement » (titre déjà visé, `commun.json` · `equipement.titre`) dit en **trois lignes** ce que le code permet
aujourd'hui : **sans wifi ou avec peu de connexion**, **sans écran projeté**, **sans téléphone de l'élève**. Une ligne qui n'a pas
de solution est écrite telle quelle. Ce que le code ne fait pas encore mais que le plan prévoit est marqué « Bientôt ».

Sources de cadrage : le § 4.9 du plan de VIT-20 ; l'expertise C5 et N3 (`docs/etude-marche/12-expertise-site-vitrine.md`) ; l'étude EP-18
(`etude/ep18-faible-equipement`, `docs/conception/qualite/etude-ep18-faible-equipement.md`, pas encore sur `main`) ; le code, relu fichier par fichier.
Les trois contextes sont ceux d'EP-18 : sans téléphone (A), peu ou pas de connexion (B), rien dans la salle (C2, ici « sans écran projeté »).

## 2. Règles de rédaction

- Une phrase dit **ce que fait le code**, avec le fichier qui le prouve (colonne « Source », jamais montrée sur le site).
- Le supérieur d'abord (D4) : aucune phrase ne suppose une classe d'âge, aucun pays, aucune monnaie, aucun chiffre non prouvé (ni débit, ni poids, ni durée).
- Pas de promesse de date. « Bientôt » n'est écrit que si le plan ou un texte déjà visé du site le prévoit : ici, « l'application mobile entièrement
  utilisable sans connexion » (`bientot.json`, déjà visé).
- Pas de nom de produit. Un fait vrai qui n'aide pas (par exemple « le QR code se projette ») est dit quand il évite un faux espoir.
- État de chaque ligne : **marche**, **en partie**, **non** (dit tel quel) ou **Bientôt**. L'état n'est pas montré sur le site ; il règle la formulation.

## 3. Plan de réalisation (phase b, après visa)

| Fichier | Rôle |
|---|---|
| `vitrine/src/donnees/equipement.js` | les trois lignes de chaque module disponible : clé de texte, état, sources (fichiers du dépôt) |
| `vitrine/src/i18n/{fr,en,ar}/equipement.json` | les phrases du § 5, visées ; l'arabe garde les mêmes clés, vides |
| `vitrine/src/components/applications/equipement/` | `Equipement.astro` : section de trois lignes (icône Lucide, nom du contexte, phrase) |
| `vitrine/src/components/applications/PageModule.astro` | une seule ligne, à la place laissée vide par VIT-20 |
| `vitrine/tests/equipement.test.js` | trois lignes par module disponible ; chaque source existe ; une ligne « Bientôt » dit « Bientôt » ; mêmes clés dans les trois langues |

Les noms des trois contextes (« Sans wifi ou avec peu de connexion », « Sans écran projeté », « Sans téléphone de l'élève ») viennent du § 4.9 et sont visés avec ce document.
Sur le site, la page d'un module disponible ne montre le bloc que si `equipement.js` contient ses trois lignes (le test l'exige).

## 4. Questions pour le chef

| N° | Question | Proposition |
|---|---|---|
| 1 | Présences, « sans wifi » : écrire « Bientôt » pour l'appel sans réseau ? Il n'est dans aucun texte visé du site ni dans le plan fusionné (il est dans l'étude EP-18, non fusionnée) | non : « il n'existe pas d'appel sans réseau », tel quel |
| 2 | Quiz et jeux, « sans wifi » : écrire « Bientôt » pour jouer sans réseau ? | non : dit tel quel, rien n'est prévu |
| 3 | Les noms des trois lignes : reprendre exactement ceux du § 4.9 | oui |
| 4 | Espace de cours : ne rien dire d'un support lu sans réseau, car les fichiers de l'Espace de cours viennent d'un service (`backend/services/cours/studylib.js`) qui ne tourne plus et que la Bibliothèque reprendra | oui : seule la mention du poids affiché est écrite |
| 5 | Emploi du temps, « sans téléphone » : dire que les changements ne sont prévenus que par notification et par e-mail, donc pas par SMS | oui, sans écrire « SMS Bientôt » (rien n'est décidé avant les entretiens de VEN-02) |

## 5. Les lignes, module par module

Légende : S1 = sans wifi ou avec peu de connexion ; S2 = sans écran projeté ; S3 = sans téléphone de l'élève.

### 5.1 Emploi du temps

| Ligne | État | Français | English | Source |
|---|---|---|---|---|
| S1 | en partie | Dans l'application, la dernière semaine consultée reste lisible sans réseau, avec l'heure de sa copie. L'application entièrement utilisable sans connexion : Bientôt. | In the app, the last week you viewed stays readable offline, with the time it was saved. The app fully usable offline: coming soon. | `mobile/src/cache.js`, `mobile/src/app/(onglets)/semaine.jsx`, `vitrine/src/i18n/fr/bientot.json` |
| S2 | marche | L'emploi du temps s'imprime ou s'enregistre en PDF : il se lit sans écran projeté, pour chaque classe. | The timetable can be printed or saved as a PDF: it can be read without a projector, class by class. | `frontend/src/utils/exportEmploiDuTemps.js`, `frontend/src/components/generation/useImpressionClasses.js` |
| S3 | en partie | Sans téléphone, l'étudiant lit son emploi du temps affiché ou imprimé. Les changements sont prévenus par notification et par e-mail, pas autrement. | Without a phone, students read their timetable on screen or on paper. Changes are announced by notification and by email, nothing else. | `frontend/src/utils/exportEmploiDuTemps.js`, `backend/services/push.js`, `backend/services/calendrier/envoiEdt.js` |

### 5.2 Présences

| Ligne | État | Français | English | Source |
|---|---|---|---|---|
| S1 | non | L'appel se fait sur le site : il demande une connexion. Il n'existe pas d'appel sans réseau. | Attendance is taken on the website: it needs a connection. There is no offline attendance. | `frontend/src/pages/Appel.jsx`, `backend/services/presences/statuts.js` |
| S2 | marche | L'appel à la main se fait sur la liste de la séance, sans écran projeté. Le QR code, lui, se projette. | Attendance by hand is taken on the session's list, with no projector. The QR code, on the other hand, is projected. | `frontend/src/pages/Appel.jsx`, `frontend/src/pages/AppelProjection.jsx` |
| S3 | marche | À la main, l'enseignant coche présent, en retard ou absent pour chaque étudiant : aucun téléphone n'est nécessaire. Le QR code exige l'application de l'étudiant. | By hand, the teacher marks each student present, late or absent: no phone needed. The QR code requires the student's app. | `backend/services/presences/statuts.js`, `backend/routes/presenceRoutes.js`, `frontend/src/pages/Presence.jsx` |

### 5.3 Espace de cours

| Ligne | État | Français | English | Source |
|---|---|---|---|---|
| S1 | en partie | Le poids d'un support s'affiche avant de l'ouvrir, sur le site et dans l'application. | A resource's size is shown before you open it, on the website and in the app. | `frontend/src/components/espaceCours/LigneSupport.jsx`, `mobile/src/app/cours/[classe].jsx` |
| S2 | en partie | Un support se lit sur l'appareil de chacun, sans écran projeté ; l'imprimer depuis Planner n'est pas possible. | A resource is read on each person's device, with no projector; printing it from Planner is not possible. | `frontend/src/components/espaceCours/LigneSupport.jsx` |
| S3 | non | Un support se lit dans un navigateur. Les sondages demandent un compte et un appareil par étudiant. | A resource is read in a browser. Polls need an account and a device for each student. | `backend/services/cours/supports.js`, `backend/services/cours/sondages.js` |

### 5.4 Quiz et jeux

| Ligne | État | Français | English | Source |
|---|---|---|---|---|
| S1 | en partie | Dans un quiz à son rythme, chaque réponse est enregistrée aussitôt : une coupure ne perd rien. Le quiz en direct et les jeux demandent une connexion. | In a self-paced quiz, each answer is saved immediately: a dropped connection loses nothing. The live quiz and the games need a connection. | `backend/services/studio/tentatives.js`, `backend/services/studio/directJoueur.js`, `backend/services/jeux/sessions.js` |
| S2 | marche | Le quiz à son rythme s'ouvre par un lien, un code ou un QR code, sans écran projeté. Le quiz en direct se montre sur un écran projeté. | A self-paced quiz opens with a link, a code or a QR code, with no projector. The live quiz is shown on a projected screen. | `backend/services/studio/sessions.js`, `frontend/src/pages/studio/DirectProjection.jsx` |
| S3 | en partie | Un quiz se joue dans n'importe quel navigateur, mais chaque étudiant répond depuis un appareil. Le terminal Linux se joue au tableau : l'enseignant tape lui-même la commande. | A quiz is played in any browser, but each student answers from a device. The Linux terminal is played at the board: the teacher types the command. | `backend/services/studio/directJoueur.js`, `backend/services/jeux/sessions.js`, `shared/jeux/catalogue.js` |

### 5.5 Annonces et messages

| Ligne | État | Français | English | Source |
|---|---|---|---|---|
| S1 | en partie | Le poids d'une pièce jointe s'affiche avant de l'ouvrir. L'application ne garde que le tableau et les semaines consultés : sans réseau, une annonce ne se lit pas. L'application entièrement utilisable sans connexion : Bientôt. | An attachment's size is shown before you open it. The app only keeps the last dashboard and weeks viewed: offline, an announcement cannot be read. The app fully usable offline: coming soon. | `frontend/src/pages/Annonces.jsx`, `mobile/src/cache.js`, `vitrine/src/i18n/fr/bientot.json` |
| S2 | non | Une annonce se lit sur l'écran de chacun ; elle ne s'imprime pas depuis Planner. | An announcement is read on each person's screen; it cannot be printed from Planner. | `frontend/src/pages/Annonces.jsx` |
| S3 | non | Une annonce arrive par notification dans l'application et, en option, par e-mail. Sans téléphone ni e-mail, l'étudiant ne la reçoit pas. | An announcement arrives as a notification in the app and, optionally, by email. Without a phone or email, the student does not receive it. | `backend/services/annonces/annonces.js`, `backend/services/push.js` |

## 6. Ce qui n'est pas dit, et pourquoi

- Aucune ligne ne parle de la Bibliothèque : elle est « Bientôt » (VIT-21 en retire les phrases).
- Aucune ligne ne cite un débit, un poids de page ou un temps de chargement : l'étude EP-18 les mesure, mais le site n'a pas de mesure à montrer (EP-19 est un budget, pas une promesse).
- Aucune ligne ne parle des familles ni de l'enseignant sans ordinateur : le plan les range plus tard.
- Les sondages ne sont pas proposés comme solution sans appareil : ils n'en ont pas.

## 7. Tests (phase b)

`equipement.test.js` : trois lignes par module disponible, dans l'ordre S1, S2, S3 ; chaque fichier de `sources` existe ; une ligne dont l'état est « Bientôt »
contient le mot dans les deux langues ; aucune ligne ne contient de chiffre, de monnaie ni de nom de pays ; mêmes clés en français, anglais et arabe.
