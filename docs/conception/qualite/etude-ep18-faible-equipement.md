# Étude EP-18 · Planner dans les contextes à faible équipement

| | |
|---|---|
| Exigence | [EP-18](../../plan/README.md) (s'adapter à tous les contextes), avec EP-5 généralisée (aucun pays supposé) : décisions du chef du 18 nov., 16 h |
| Module | transversal, rangé sous [QUA](../../plan/modules/QUA-qualite-docs.md) · étude hors chantier, sans code |
| Fiche de mission | `docs/plan/missions/etude-ep18-faible-equipement.md` (branche `doc/coordination-equipe`) |
| Branche | `etude/ep18-faible-equipement`, depuis `origin/main` (`b57753e9`) |
| Rédigé par | Claude Code (Opus 5.5, deuxième choix de la fiche), le 2026-11-22 |
| Nature | étude : elle propose, et le chef tranche. Le code se lit, il ne se modifie pas |
| État | § 1 à § 7 écrits : contextes, réponses, méthode, grille, poids, pays. § 8 (manques et questions au chef) et § 9 (ordre) à écrire |

## 1. La question

Le chef l'a posée le 18 nov. : dans certains pays, l'appel par QR code ou les jeux sur téléphone ne sont pas possibles. La RDC est son exemple, et non une cible fixée. **Chaque fonction de Planner doit marcher sans téléphone de l'élève, avec peu ou pas de connexion, et avec ce qu'a l'école.** Le QR code et le téléphone restent des options, jamais le seul chemin.

L'étude dit, fonction par fonction :
- ce qui tient déjà, preuve dans le code à l'appui ;
- ce qui manque ;
- dans quel ordre le faire.

Elle ne décide rien. Toute dépense (SMS, fournisseur) et tout choix de produit (papier, hors ligne) sont des questions au chef, chacune avec une proposition.

**Ses lecteurs** : le chef, qui tranche l'ordre des correctifs ; le coordinateur, qui reporte les décisions dans les modules ; la présentation MKT-09 et les pages de module VIT-15, qui liront la grille. **Ce que la grille dit « marche » doit donc être vrai dans le code** du commit d'étude (`b57753e9`), et chaque case cite le fichier qui le prouve.

**L'ordre** suit la décision du 21 nov. : le supérieur d'abord, puis la formation professionnelle, puis le scolaire. Un manque porte l'étape de la feuille de route où il compte.

## 2. Les trois contextes

Définis avant toute évaluation, puis confirmés par le chef (§ 3, réponses 1 à 6).

### A. Sans téléphone de l'élève

**Au moins un élève de la classe n'a ni téléphone ni ordinateur personnel**, et les autres peuvent en avoir. L'enseignant a au moins un appareil avec un navigateur, ordinateur ou smartphone (réponse 5).

| Note | Sens |
|---|---|
| **marche** | la fonction sert aussi cet élève, sans aide particulière |
| **marche en partie** | elle le sert avec l'aide de l'enseignant (qui saisit pour lui), avec un appareil prêté, ou au prix d'une étape de plus |
| **ne marche pas** | il en est exclu |

Le cas « aucun élève n'a de téléphone » en découle : une fonction qui « marche » en A marche pour une classe entière sans appareil.

### B. Peu ou pas de connexion

Deux cas mesurés, pour que la grille soit refaisable sans supposer de pays (réponse 2) :

| Cas | Définition | Comment on le mesure |
|---|---|---|
| **B1, lente** | une connexion présente mais faible | le profil « Slow 3G » des outils du navigateur et de Lighthouse : 400 kbit/s, 400 ms de latence |
| **B2, coupée** | aucune connexion pendant toute la séance, puis retour du réseau | le mode hors ligne du navigateur, et le mode avion pour l'application mobile |

Chaque fonction est notée dans les deux cas. Elle « marche » en B2 si elle se fait sans réseau et que rien n'est perdu au retour du réseau. Elle « marche en partie » si elle se lit sans réseau mais ne s'écrit pas, ou si elle s'écrit après coup sur papier, puis à la main.

### C. Ce qu'a l'école

Deux niveaux (réponse 3) :

| Niveau | Ce qu'il y a |
|---|---|
| **C1** | dans la salle, l'ordinateur de l'enseignant et un projecteur ; une imprimante à l'école |
| **C2** | rien dans la salle : l'enseignant imprime à l'avance au secrétariat, puis saisit après la séance |

### Qui est jugé

- **Les rôles qui existent** (réponse 6) : l'administration, l'enseignant, l'étudiant ou l'élève.
- **Les familles** : le rôle parent n'existe pas (ADM-05, étape 6), et leurs envois relèvent de COM. L'étude en dresse une liste courte, sans note, de ce que COM, ADM-05 et MOB-05 devront tenir.
- **L'enseignant qui n'a qu'un téléphone simple**, sans navigateur : il n'est pas noté. C'est une limite écrite au § 10, qui relèverait d'un éventuel SMS (COM-03, une dépense à trancher par le chef).

## 3. Questions et réponses

Posées au chef par l'outil de questions le 22 nov. Les questions qui viendront de la grille (dépenses, papier, hors ligne) seront posées au § 8.

| N° | Question | Proposition | Réponse du chef |
|---|---|---|---|
| 1 | Contexte A : comment définir « sans téléphone de l'élève » ? | au moins un élève de la classe sans téléphone ni ordinateur, les autres pouvant en avoir ; « en partie » s'il lui faut l'enseignant ou un appareil prêté | **oui** (22 nov.) |
| 2 | Contexte B : avec quel profil mesurer ? | deux cas, lente (« Slow 3G » : 400 kbit/s, 400 ms) et coupée (toute la séance, puis retour du réseau) | **oui** (22 nov.) |
| 3 | Contexte C : combien de niveaux ? | deux : C1 ordinateur et projecteur dans la salle, imprimante à l'école ; C2 rien dans la salle, impression à l'avance et saisie après | **oui** (22 nov.) |
| 4 | La Bibliothèque, alors que StudyLib ne tourne plus et n'est pas redéployée | la grille juge les plans BIB-05 à BIB-11, pas StudyLib : « absente aujourd'hui », puis ce que BIB-06, BIB-09 et BIB-10 doivent tenir (poids avant téléchargement, reprise après coupure, impression, accès sans compte élève). StudyLib se lit seulement pour ce que la reconstruction reprend | **oui** (22 nov.) |
| 5 | L'enseignant qui n'a qu'un téléphone simple | pas noté : une limite écrite, qui relève d'un éventuel SMS (COM-03) | **oui** (22 nov.) |
| 6 | Les familles | la grille juge les rôles qui existent ; pour les familles, une liste courte, sans note, de ce que COM, ADM-05 et MOB-05 devront tenir | **oui** (22 nov.) |

## 4. La méthode

- **Rien de mémoire.** Chaque case de la grille cite le fichier qui la prouve, avec la fonction ou le composant, au commit `b57753e9`. Une affirmation que le code ne prouve pas est notée « non vérifié ». Elle ne compte pas comme « marche ».
- **Le poids des écrans** (contexte B1, § 6) : `npm run build` dans `frontend/`, lancé sur le poste sans rien commiter. Le relevé donne la taille brute et la taille compressée de chaque morceau, et ce que chargent la connexion, l'emploi du temps de l'étudiant et l'appel de l'enseignant (manifeste de Vite). La commande et le résultat sont recopiés tels quels.
- **L'application mobile** est jugée sur son code (`mobile/`), sans appareil. Ce qui demanderait un essai sur téléphone est noté comme tel.
- **Le repère du marché** (étude 13, réponse 3) : le hors ligne de Planner est comparé à ce qu'annonce Go4School (appel, présences, transport). C'est un repère, sans en faire une promesse, et sans nommer ce concurrent ailleurs que dans cette étude.
- **Les suppositions de pays** (§ 7) : relevées dans l'application (`frontend/`, `backend/`, `mobile/`, `shared/`). Le site vitrine n'en fait pas partie (VIT-07, VIT-08). Le relevé renvoie à PLA-13 et ETA-03 sans les refaire.

## 5. La grille, fonction par fonction

### 5.1 Lecture

| Note | Sens |
|---|---|
| **marche** | vrai dans le code au commit `b57753e9` : la colonne « Preuve » cite le fichier et la ligne |
| **en partie** | marche avec une étape de plus, une aide, ou une partie seulement : la ligne dit laquelle |
| **non** | ne marche pas dans ce contexte |
| **prévu** | décidé ou inscrit au plan, mais **pas codé** : jamais compté comme « marche » |
| — | sans objet |

- Les colonnes sont celles du § 2 : A (au moins un élève sans téléphone), B1 (lente), B2 (coupée), C1 (ordinateur et projecteur), C2 (rien dans la salle).
- En B1, « en partie » renvoie au poids du § 6 : chaque écran du site marche, mais son premier chargement prend de 7 à 9 secondes.

### 5.2 Deux faits qui pèsent sur toute la grille

1. **Le site n'a aucun fonctionnement hors ligne.** On n'y trouve ni service worker ni manifeste d'application web : `frontend/src`, `frontend/vite.config.js` et `frontend/index.html` n'en contiennent aucun. Sans réseau, aucun écran du site ne s'ouvre (B2 : non partout sur le site).
2. **L'application mobile n'accepte que les étudiants** : `mobile/src/auth/AuthContext.jsx:63` refuse tout autre rôle. L'enseignant fait donc l'appel, les quiz et les jeux **depuis le site**. Le rôle enseignant dans l'application est MOB-02 (L, à faire). MOB-08 (l'appel à la main sans réseau, « sur le téléphone de l'enseignant ») en dépend.

### 5.3 L'appel

| Fonction | A | B1 | B2 | C1 | C2 | Preuve |
|---|---|---|---|---|---|---|
| **Appel par QR code** : projeté, scanné par l'étudiant | **non** pour l'élève sans téléphone ; le QR exige l'application, pas un navigateur | en partie : un code vaut une minute | non | marche : écran projeté | non : il faut projeter | QR signé, changé toutes les 30 s, valable une minute : `backend/services/presences/appel.js:10-14`. Scan accepté seulement de l'application : `backend/routes/presenceRoutes.js:53-54` et `frontend/src/pages/Presence.jsx:8-10`. Écran projeté : `frontend/src/pages/AppelProjection.jsx` |
| **Appel à la main** sur le site : présent, en retard, absent | **marche** : l'enseignant coche pour chacun | en partie (§ 6) | **non** ; l'appel hors ligne est **prévu** (MOB-08, N2), après MOB-02 | marche | **en partie** : la saisie après la séance est acceptée, mais il n'existe ni liste d'appel imprimable ni séance « réalisée » | statuts et motif : `backend/services/presences/statuts.js:11-19` ; écran : `frontend/src/pages/Appel.jsx:128`. Aucune date n'est contrôlée à la saisie : `statuts.js:20-45`. Une correction après la fermeture est journalisée : `statuts.js:39-40`. Ouverture le jour même seulement : `appel.js:110`. « Réalisée » seulement à la fermeture d'un appel ouvert : `appel.js:207-211`. Aucune impression dans `Appel.jsx` |
| Vérification surprise (anti-fraude), facultative | — | — | non | marche | non | `appel.js:170-173`, `frontend/src/components/appel/VerificationSurprise.jsx` |

**Conséquence** : en A, l'appel tient par l'appel à la main, à condition que l'enseignant ait le réseau. En B2, rien ne tient. En C2, l'enseignant note sur une feuille faite à la main, puis saisit après coup sur le site. Le QR code est bien une option, pas le seul chemin, comme EP-18 le demande.

### 5.4 Le Studio quiz

| Fonction | A | B1 | B2 | C1 | C2 | Preuve |
|---|---|---|---|---|---|---|
| **Quiz à son rythme**, par code ou lien, dans un navigateur | **non** pour l'élève sans appareil ; en partie avec un appareil prêté (n'importe quel navigateur) | **en partie** : chaque réponse est enregistrée aussitôt, et l'écran est léger (§ 6) | non | — | **non** : un quiz ne s'imprime pas | réponse enregistrée aussitôt, « une coupure ne perd rien », temps tenu par le serveur : `backend/services/studio/tentatives.js:9-14`. L'enseignant ne note à la main qu'une copie qui existe : `backend/services/studio/sessions.js:213` (`noterCopieAMain` prend un `idTentative`). Aucune impression dans `frontend/src/pages/studio` ni `frontend/src/components/studio` |
| **Quiz en direct**, projeté | **non** pour répondre : chaque réponse part d'un téléphone. Il marche pour regarder l'écran projeté | en partie : le chrono tourne au serveur | non | **marche** : écran projeté, réponse cachée jusqu'à la correction | non | réponses depuis le téléphone : `backend/services/studio/directJoueur.js:10-14` ; écran projeté : `frontend/src/pages/studio/DirectProjection.jsx:16` ; réponse jamais montrée avant la correction : `backend/services/studio/direct.js:14-18` |
| **Génération de questions par l'IA** | — | en partie | **non** : il faut un service distant | — | — | `backend/services/ia/client.js:3-12` ; `backend/services/studio/iaFournisseurs.js:13-15` : sans clé, la fonction disparaît (503). L'éditeur de quiz marche sans l'IA |

### 5.5 Les jeux pédagogiques

| Fonction | A | B1 | B2 | C1 | C2 | Preuve |
|---|---|---|---|---|---|---|
| **Jeu en mode collectif**, projeté | **marche** : l'enseignant tape lui-même la commande que la classe propose à voix haute | en partie | non | marche | non | « celle que l'enseignant tape lui-même (`texte`) » : `backend/services/jeux/sessions.js:183-187` ; modes : `sessions.js:11-18`. **Un seul jeu** a ce mode, le terminal Linux : `shared/jeux/catalogue.js:14-17` |
| **Jeu individuel**, simulations | **non** | en partie | non | — | non | « chaque étudiant joue sur son téléphone » : `sessions.js:14-15` ; `shared/jeux/catalogue.js:33` : `individuel` par défaut |

### 5.6 L'espace de cours et les annonces

| Fonction | A | B1 | B2 | C1 | C2 | Preuve |
|---|---|---|---|---|---|---|
| **Supports de cours** (fichiers et liens) | en partie : l'enseignant peut projeter ou imprimer le fichier, mais pas depuis Planner | en partie : **le poids s'affiche avant l'ouverture**, sur le site et dans l'application | en partie : dans l'application, un fichier déjà téléchargé se relit sans réseau | marche | en partie | site : `frontend/src/components/espaceCours/LigneSupport.jsx:23` ; application : `mobile/src/app/cours/[classe].jsx:93`. Relecture hors ligne : `mobile/src/documents/fichiers.js:7-11`. **Les fichiers viennent de StudyLib**, qui ne tourne plus : `backend/services/cours/studylib.js:5-10` (repris par BIB-07). Les **liens** ne dépendent pas de StudyLib : `backend/services/cours/supports.js:9-12` |
| **Sondages** de l'enseignant | **non** : chaque étudiant répond depuis son compte | en partie | non | non vérifié (affichage projeté des résultats) | non | `backend/services/cours/sondages.js:11-16` |
| **Annonces** | en partie : dans l'application, en push, et par e-mail facultatif ; rien d'imprimable ni par SMS | marche | **non** : l'application ne les garde pas (seuls le tableau et les semaines sont gardés) | — | non | canaux : `backend/services/annonces/annonces.js:28-35` ; cache de l'application : `mobile/src/app/(onglets)/index.jsx:32` et `semaine.jsx:43` ; poids de la pièce jointe affiché : `frontend/src/pages/Annonces.jsx:278` |

### 5.7 La Bibliothèque (réponse 4)

**Absente aujourd'hui** : StudyLib ne tourne plus et n'est pas redéployée. La Bibliothèque est reconstruite par BIB-05 à BIB-11 (plan de BIB-05 validé le 22 nov.).

L'application mobile garde de l'ancienne bibliothèque un acquis à reprendre dans BIB-10 :

| Ce qui existe dans l'application | Preuve | État pour N3 |
|---|---|---|
| Le poids s'affiche dans la liste et sur la fiche du document | `mobile/src/app/(onglets)/bibliotheque.jsx:216`, `mobile/src/app/document/[id].jsx:62` | **fait** dans l'application, à garder dans BIB-10 |
| L'étudiant confirme au-delà de 10 Mo sur les données mobiles | `mobile/src/documents/fichiers.js:13-14`, `document/[id].jsx:98` | fait, à garder |
| La progression s'affiche, et le document se relit sans réseau | `fichiers.js:7-11`, `fichiers.js:67-70` | fait, à garder |
| **La reprise après coupure** | `fichiers.js:68` : « un téléchargement interrompu ne laisse pas de fichier partiel », donc il repart de zéro | **prévu** (N3), pas fait |
| Le poids avant le téléchargement sur le **site** | — (les écrans web de la Bibliothèque sont BIB-09) | **prévu** (N3, BIB-09) |

**Ce que BIB-06, BIB-09 et BIB-10 doivent tenir** :
- le poids rendu par l'API et affiché avant chaque téléchargement ;
- la reprise par plages (`Range`) sur le lien signé, ou un découpage qui la permet ;
- l'impression d'un document depuis le site ;
- un accès en lecture sans compte élève, à trancher au § 8.

### 5.8 L'emploi du temps

| Fonction | A | B1 | B2 | C1 | C2 | Preuve |
|---|---|---|---|---|---|---|
| **Lire son emploi du temps** | en partie : l'élève sans appareil le lit affiché ou imprimé, et l'administration imprime celui de chaque classe | en partie (§ 6) | **en partie** dans l'application : les semaines **déjà consultées** se lisent sans réseau, avec l'heure de la copie ; non sur le site | marche | **marche** : impression | impression : `frontend/src/utils/exportEmploiDuTemps.js:357` et `:389` (`win.print()`) ; impression par classe : `frontend/src/components/generation/useImpressionClasses.js`. Cache : `mobile/src/app/(onglets)/semaine.jsx:37-50`, `mobile/src/cache.js:4-6`. Le hors ligne complet (MOB-06) est à faire : `docs/plan/modules/MOB-application.md:27` |
| **Changements prévenus** (push, e-mail) | **non** pour l'élève sans téléphone ni e-mail : il n'y a pas de SMS | marche | en partie : le push arrive au retour du réseau | — | — | push : `backend/services/push.js:18-24` ; e-mail : `backend/services/calendrier/envoiEdt.js` |

### 5.9 L'application mobile, la connexion et les comptes

| Fonction | A | B1 | B2 | C1 | C2 | Preuve |
|---|---|---|---|---|---|---|
| **Créer un compte** à un élève sans adresse électronique | **non** : l'adresse est obligatoire | — | — | — | — | `backend/models/Users.js:20-24` (`allowNull: false`, unique). Décision du 8 nov. (compte créé par l'établissement, Q-20) : **prévu** dans VSC-01, pas codé |
| **Mot de passe oublié** | en partie : par e-mail seulement ; sinon l'administration le réinitialise | marche | non | — | — | e-mail : `backend/controllers/authController.js:590` ; réinitialisation par l'administration, journalisée : `backend/controllers/userController.js:185` |
| **Lien du téléphone** (R-10) | — : il ne sert qu'au scan du QR | — | — | — | — | `backend/routes/presenceRoutes.js:36-41` |
| **Application de l'enseignant** | — | — | **non** : il n'en a pas | — | — | `mobile/src/auth/AuthContext.jsx:63` ; MOB-02 à faire |

### 5.10 Le repère du marché : le hors ligne annoncé par Go4School

D'après l'étude 13 (§ 7, l. 183-184). Ce sont des annonces, invérifiables sans l'application.

| Ce que Go4School annonce | Planner au commit `b57753e9` |
|---|---|
| L'appel et le scan des présences hors ligne, puis synchronisés | **non** : l'appel à la main hors ligne est **prévu** (MOB-08), après MOB-02. Le QR code reste en ligne, puisque sa signature change toutes les 30 s |
| L'embarquement dans le bus | sans objet : pas de transport (SER, reporté) |
| Le poids affiché avant chaque téléchargement | **fait dans l'application** pour l'ancienne bibliothèque et les supports (§ 5.6, § 5.7) ; **prévu** sur le site (BIB-09) |
| La reprise après coupure | **prévu** (N3) |
| — | **en plus chez Planner** : les semaines déjà consultées se lisent sans réseau ; l'emploi du temps s'imprime ; l'appel à la main et le jeu collectif servent l'élève sans téléphone |

## 6. Le poids des écrans (contexte B1)

### 6.1 La mesure

Faite le 22 nov. sur le poste, au commit `b57753e9`, sans rien commiter :

```text
cd ..\travaux-planner\etude-ep18\frontend
npm ci --no-audit --no-fund          # 420 paquets, 151 s (dossier propre à l'étude, ignoré par git)
npm run build                        # vite 7.3.7, 58 s
node poids.mjs dist Connexion EtudiantDashboard EdtMensuel Appel AppelProjection Epreuve EspaceClasse
```

`poids.mjs` est un script de mesure gardé hors du dépôt. Il part de `dist/index.html`, suit les imports statiques de chaque morceau (`from "./x.js"`, sans les `import()` différés), et additionne les tailles brutes, compressées en gzip (niveau 9) et en brotli. La colonne « en plus » ne compte que ce qui n'est pas déjà dans le premier chargement.

*Les `node_modules` du dépôt principal ne suffisaient pas : `lucide-react` y manque, alors que le fichier de verrouillage est identique. La construction a donc été faite sur une installation propre à l'étude.*

| Ce qui se charge | Fichiers | Brut | gzip | Temps de transfert en B1 (400 kbit/s, soit 50 Ko/s) |
|---|---|---|---|---|
| **Premier chargement** (`index.html` : React, MUI, icônes, code commun, CSS) | 5 | 1 098,8 Ko | **338,1 Ko** | **6,8 s** |
| + Connexion | 5 | 8,4 Ko | 4,2 Ko | 6,9 s en tout |
| + Tableau de bord de l'étudiant | 14 | 289,2 Ko | 96,9 Ko | **8,7 s** en tout |
| + Emploi du temps mensuel | 13 | 278,7 Ko | 92,5 Ko | 8,6 s en tout |
| + Appel (enseignant) | 8 | 299,3 Ko | 99,8 Ko | **8,8 s** en tout |
| + Appel projeté | 4 | 34,3 Ko | 13,7 Ko | 7,0 s en tout |
| + Épreuve du Studio quiz (étudiant) | 8 | 46,4 Ko | 17,2 Ko | 7,1 s en tout |
| + Espace de la classe | 10 | 299,1 Ko | 97,7 Ko | 8,7 s en tout |
| Tout le site construit (js et css) | — | 3 286,4 Ko | 1 073,8 Ko | — |

À ces temps s'ajoute la latence de B1, soit 400 ms par aller-retour, et il en faut au moins trois avant le premier écran : la page, les scripts, puis le morceau de l'écran.

### 6.2 Ce qui pèse

- **Une page de gestion ajoute de 92 à 100 Ko**, pour la même raison : la mise en page commune (`DashboardLayout`) tire trois morceaux partagés. On le voit sur la page d'appel :

  | Morceau | gzip |
  |---|---|
  | `animation` (`framer-motion`) | 35,9 Ko |
  | un morceau de code commun que Rollup a nommé `classQuiz` (recherche, listes : ce n'est pas ClassQuiz) | 37,4 Ko |
  | `DashboardLayout` | 11,6 Ko |
  | `browser` | 9,7 Ko |
  | l'écran d'appel lui-même | **3,0 Ko** |

  Regroupement : `frontend/vite.config.js:21` (`manualChunks`). La bibliothèque d'animation, chargée sur chaque écran, est le premier gain possible (§ 8).
- **Le serveur compresse en gzip** (`frontend/nginx.conf:52`), pas en brotli. Brotli ferait passer le premier chargement de 338,1 à 280,5 Ko, soit 17 % de moins.
- **Les fichiers se gardent un an** dans le navigateur (`frontend/nginx.conf:103-104`, noms à empreinte). Le coût du premier chargement se paie donc une fois par appareil et par version. Un appareil partagé, ou vidé, le paie à chaque fois.
- **Repère** : EP-19 fixe 200 Ko par page pour le site vitrine. L'application n'a pas encore de plafond ; EP-19 demande seulement que son premier chargement soit mesuré. Le voici : 338,1 Ko compressés.

## 7. Les suppositions de pays dans l'application

Recherche dans `frontend/src`, `backend/` (services, contrôleurs, routes, configuration, modèles, utilitaires), `mobile/src` et `shared/`, sans les tests. Les termes cherchés : MAD, dirham, DH, Massar, Maroc, marocain, Morocco, Casablanca, +212, fr-MA, ar-MA. Le site vitrine est exclu (VIT-07, VIT-08).

| Supposition | Où | Effet ailleurs qu'au Maroc | Ce qui la couvre |
|---|---|---|---|
| **Le décalage horaire de l'école est écrit en dur : 0** | `shared/dates.js:13` (`DECALAGE_ECOLE_MINUTES = 0`), lu par le site et par l'application | dans une école à UTC+1, le site et l'application donnent la **date de la veille** de minuit à 1 h ; à UTC+2, jusqu'à 2 h. Cela touche l'appel du jour, les échéances et le « aujourd'hui » des écrans | PLA-13 (pack pays) : à proposer comme correctif court (§ 8) |
| **Le fuseau par défaut du serveur est `Africa/Casablanca`** | 13 lectures de `APP_TIMEZONE`, avec ce défaut, dont `backend/services/presences/appel.js:27`, `backend/services/moteur/valeurs/lecture.js:11`, `backend/services/calendrier/ics.js:30`, `backend/services/planning/affectationRules.js:42` | sans la variable, une installation hors du Maroc prend l'heure du Maroc. Et le fuseau est réglé **par installation**, pas par école | PLA-13 ; à rapprocher de D-01 (une base par école) |
| **Les fériés du Maroc**, seuls proposés | `backend/utils/feriesMaroc.js:2` et `:57`, `backend/controllers/calendrierController.js:121-131`, `frontend/src/i18n/fr.js:2066` et `:2069`, `frontend/src/i18n/ressources/calendrier.fr.js:4` | une autre école n'a aucun férié proposé, et le bouton nomme le Maroc | **fonction d'ADM après ADM-02** (décision du chef du 21 nov.) |
| **Les jeux comptent en MAD** | `shared/simulations/catalogue/budget-erp.js:15`, `:28`, `:29`, `:41` ; `shared/simulations/catalogue/stock-pilot.js:7`, `:15`, `:23`, `:31` ; `shared/simulations/i18n.js:31`, `:34`, `:55`, `:62`, `:75` (et les mêmes en anglais, `:112` et suivantes) | la consigne parle d'une monnaie étrangère à l'élève | correctif court : une unité neutre (§ 8) |
| **Le nom d'une école dans l'application** (EP-5 et règle du dépôt neutre, plutôt qu'un pays) | `mobile/app.json:3` (« HESTIM Planner ») ; `mobile/src/cache.js:7` (`hestim.cache.`) ; `backend/utils/campus.js:2` et `:6` (campus de l'école pilote, migration 0003, déjà traités par PLA-03) | l'application s'appelle du nom d'une autre école | MOB-03 (thème de l'école) et MOB-07 ; `scripts/verifier-neutre.mjs` ne les voit pas, à vérifier |
| Les mots de passe interdits citent des noms du pays | `backend/utils/passwordHelper.js:44` (`marocmaroc12`, `casablanca12`…) | aucun effet nuisible : la liste est seulement incomplète ailleurs | rien à faire, sinon l'élargir |
| **Absent, et c'est bien** | aucune mention de Massar dans l'application ; aucun format de téléphone d'un pays ; aucune devise hors des jeux (FIN n'est pas construit) | — | ETA-03 et FIN garderont cette neutralité |

## 8. Les manques, rangés, et les questions au chef

*À écrire.* Y entreront MOB-08 (l'appel à la main hors ligne, N2) et N3 (le poids affiché avant chaque téléchargement, avec reprise après coupure), décidés le 21 nov.

## 9. L'ordre proposé, et la section « EP-18 » du modèle de conception

*À écrire.*

## 10. Limites

- L'enseignant qui n'a qu'un téléphone simple n'est pas noté (réponse 5).
- Les familles ne sont pas notées (réponse 6).
- L'application mobile est jugée sur son code, sans essai sur un téléphone.
