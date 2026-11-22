# Étude EP-18 · Planner dans les contextes à faible équipement

| | |
|---|---|
| Exigence | [EP-18](../../plan/README.md) (s'adapter à tous les contextes), avec EP-5 généralisée (aucun pays supposé) : décisions du chef du 18 nov., 16 h |
| Module | transversal, rangé sous [QUA](../../plan/modules/QUA-qualite-docs.md) · étude hors chantier, sans code |
| Fiche de mission | `docs/plan/missions/etude-ep18-faible-equipement.md` (branche `doc/coordination-equipe`) |
| Branche | `etude/ep18-faible-equipement`, depuis `origin/main` (`b57753e9`) |
| Rédigé par | Claude Code (Opus 5.5, deuxième choix de la fiche), le 2026-11-22 |
| Nature | étude : elle propose, et le chef tranche. Le code se lit, il ne se modifie pas |
| État | **premier jet** : § 1 à § 3 (contextes, questions et réponses, méthode). La grille (§ 4) et la suite sont à écrire |

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

*À écrire.* Fonctions passées en revue, au minimum :
- l'appel ;
- le Studio quiz ;
- les jeux pédagogiques ;
- l'espace de cours et les annonces ;
- la Bibliothèque (plans BIB) ;
- l'emploi du temps ;
- l'application mobile ;
- la connexion et les comptes ;
- l'IA.

## 6. Le poids des écrans (contexte B1)

*À mesurer.*

## 7. Les suppositions de pays dans l'application

*À relever.*

## 8. Les manques, rangés, et les questions au chef

*À écrire.* Y entreront MOB-08 (l'appel à la main hors ligne, N2) et N3 (le poids affiché avant chaque téléchargement, avec reprise après coupure), décidés le 21 nov.

## 9. L'ordre proposé, et la section « EP-18 » du modèle de conception

*À écrire.*

## 10. Limites

- L'enseignant qui n'a qu'un téléphone simple n'est pas noté (réponse 5).
- Les familles ne sont pas notées (réponse 6).
- L'application mobile est jugée sur son code, sans essai sur un téléphone.
