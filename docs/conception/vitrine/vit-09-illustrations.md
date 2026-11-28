# VIT-09b · illustrations, captures et première section de chaque page (plan court)

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) · préparation de VIT-05 · **condition 7** de la mise en ligne (VIT-06), avec la condition 10 (VIT-09a) |
| Mission | `docs/plan/missions/vit-09-illustrations.md` (branche `doc/coordination-equipe`), avec les ajouts C2, C3 et C10 de l'[expertise du site](../../etude-marche/12-expertise-site-vitrine.md), § 13 |
| Branche | `feat/vit-09-illustrations`, dossier `..\travaux-planner\vit-09-illustrations`. Le plan part de `origin/main` (`d27e30ee`). **Le code repart de `origin/main` en dernier sur le site** : après #224, VIT-10b, VIT-17, VIT-18, #223, VIT-16, VIT-11 (code), VIT-13, VIT-14b, VIT-15 et #222 (VIT-09a) |
| Rédigé par | Claude Code (Opus 5.5), le 2026-11-19 |
| **Validé** | **par Claude20022002 le 2026-11-19** : propositions retenues aux questions 1 à 8 (outil de questions), textes de C2 et de C10 visés. Les captures restent montrées une à une au chef avant leur commit |

## 1. Objet et critère de « terminé »

VIT-09a a fait la bibliothèque `shared/icones/` : sept logos d'applications et douze icônes vivantes. **VIT-09b les pose sur le site**, ajoute les dessins et les captures qui manquent, et retouche la première section de chaque page.

Terminé quand :
- **chaque page** a au moins une illustration. Emploi du temps, En classe et Établissement en ont une de plus. Les exceptions sont celles de la question 4 ;
- **les fonctionnalités sont montrées comme des apps** aux quatre endroits choisis par le chef : une grille sur l'accueil, le menu « Fonctions », l'en-tête de chaque page de fonction et le catalogue de VIT-11. Les logos viennent de `shared/icones/`, sans copie ;
- les **icônes vivantes** remplacent les icônes fixes des commandes : chevron des boutons, menu, flèches des ancres, lecture, pause, revoir ;
- la **première section** de chaque page est retouchée comme le dit le § 4.2 ;
- **les ajouts de l'expertise** sont faits :
  - C2 : le titre-promesse, « Planner » en surtitre et la ligne des rôles ;
  - C3 : les quatre captures prioritaires, et le dessin de l'appel avec la liste à la main d'abord ;
  - C10 : la page Application, avec une carte par onglet et un titre court ;
- **les captures ne montrent rien de réel**. Elles sont prises sur une base locale jetable, remplie de données fictives (§ 4.3). **Le chef voit chaque capture avant le commit**, et la fiche de session le consigne ;
- **EP-18** :
  - chaque page tient le poids maximal du § 4.4 ;
  - aucune image ne montre le téléphone de l'élève comme seul chemin ;
  - aucun outil d'État n'est nommé ;
- **accessibilité** :
  - un texte de remplacement pour chaque capture ;
  - les dessins décoratifs sont masqués aux lecteurs d'écran ;
  - aucun mouvement sous `prefers-reduced-motion` ;
  - contrastes AA ;
  - axe-core sans violation et Lighthouse sur chaque page, en 390, 768 et 1440 px ;
- français et anglais à jour ; l'arabe garde ses clés ;
- pas de défilement horizontal ;
- build, `npm run test:unit` et `node scripts/verifier-neutre.mjs` verts ;
- aucune couleur hors de la charte.

## 2. Ce qui existe

- **Seize pages** (`vitrine/src/pages/[lang]/`), au 19 nov. :
  - **cinq ont un dessin** : l'accueil, Emploi du temps, En classe, Quiz et jeux et Établissement. Les quatre dessins (`IllustrationAppel`, `IllustrationQuiz`, `IllustrationSemaine`, `IllustrationStatistiques`) sont posés dans `CadreAppareil`. `IllustrationQuiz` sert trois fois, les deux autres deux fois ;
  - **onze n'ont aucune image**. Les sept pages de fonction : Application, Bibliothèque, Bibliothèque des jeux, Cours et annonces, Sécurité, Solutions et Bientôt. Les quatre pages par rôle : Direction, Scolarité, Enseignants et Étudiants.
- **Les premières sections** :
  - `Ouverture.astro` pour l'accueil : le logo animé, `<h1>Planner</h1>`, une phrase et deux boutons ;
  - `EnTetePage.astro` pour les pages de fonction : un surtitre, un titre géant et une accroche, centrés, sans image ;
  - `PageRole.astro` pour les rôles.
- **`CadreAppareil.astro`** accepte déjà une image (`image`, `alt`, `loading="lazy"`). Aucune capture n'existe, et le site n'utilise pas encore `astro:assets`.
- **`shared/icones/`** (VIT-09a, #222, pas encore sur `main`) :
  - les logos `modules/<id>.svg` et `<id>-petit.svg`, posés avec `fichierLogo(id, taille)` ;
  - les icônes vivantes `vivantes/*.svg` et leur feuille `vivantes.css`.
- **Les sept applications** et leurs rubriques (`frontend/src/components/applications/catalogue.js`) :

  | Application | Rubriques |
  |---|---|
  | `planning` | l'emploi du temps |
  | `pedagogie` | les classes, les matières, l'espace de cours, « Mes classes » (l'appel) |
  | `personnes` | les comptes, le journal de sécurité |
  | `etablissement` | le calendrier, les salles, les créneaux, l'identité |
  | `annonces` | les annonces |
  | `activites` | les quiz et les jeux |
  | `bibliotheque` | la bibliothèque |

- **Le mobile** a cinq onglets visibles : Tableau, Semaine, Scanner, Bibliothèque et Compte. L'onglet `jeux` est caché. Expo sait l'ouvrir dans un navigateur (`npm run web`).
- **Les données de démonstration** :
  - `seed.js` est celui de l'école pilote : il est exclu ;
  - les parcours (`frontend/tests/parcours/donnees.mjs`) remplissent une base jetable avec les outils des tests du serveur. Leurs adresses portent encore « hestim ».
- **Ce que les autres missions ajoutent avant VIT-09b** :
  - VIT-10b : avant et après, et une FAQ sur les pages par rôle ;
  - VIT-11 : le catalogue « Toutes les fonctionnalités » et la FAQ ;
  - VIT-12 : les mentions légales et la confidentialité ;
  - VIT-13 : les fonctionnalités par type d'établissement ;
  - VIT-14 et VIT-14b : la section « Pourquoi Planner » et la page `/comparer/` ;
  - VIT-15 : une fiche par module, **avec son logo** ;
  - VIT-16 : `/contact/` et `/a-propos/` ;
  - VIT-17 : les grilles à trous et la vidéo à la demande ;
  - VIT-18 : l'accroche de l'accueil (D4) et l'ordre des types.

## 3. Questions au chef

| N° | Question | Proposition | Réponse | Bloque |
|---|---|---|---|---|
| 1 | Sur quelles données prendre les captures ? | **Une base locale jetable**, remplie par un script à part (`vitrine/scripts/captures/preparer.mjs`). Il utilise les outils des tests du serveur, comme les parcours, mais avec ses propres données. L'école s'appelle « École de démonstration » (« Demo School »). Les prénoms et les noms sont fictifs et mêlés, sans pays reconnaissable. Toutes les adresses sont en `@exemple.test`. Ni `seed.js`, ni les données des parcours | **École de démonstration**, base jetable, adresses `@exemple.test` (19 nov.) | étape 6 |
| 2 | Quelles captures ? | **Les quatre de l'expertise (C3), pas plus** : <br>1. le bilan des contraintes après un calcul ; <br>2. la liste d'appel remplie à la main ; <br>3. le Studio quiz en édition ; <br>4. la semaine du mobile. <br>Une version par langue (français, anglais), sur la même base. Elles sont refaites après UIX-10b, avec les vidéos de chaque module | **les quatre de l'expertise**, en français et en anglais (19 nov.) | étape 6 |
| 3 | La semaine du mobile : capture ou dessin ? | **Une capture** de l'application mobile ouverte dans un navigateur (Expo web, 390 px), posée dans le cadre de téléphone du site. Si Expo web rend mal l'écran, un dessin à la place, montré au chef | **capture par Expo web**, un dessin si le rendu est mauvais (19 nov.) | étape 6 |
| 4 | Toutes les pages ont-elles une illustration ? | **Oui, sauf les pages de texte** : FAQ, mentions légales, confidentialité, contact et `/comparer/`. Elles gardent leur sobriété. `/a-propos/` reçoit un dessin. **Bientôt** reçoit un dessin : la grille des apps, avec les modules à venir en tuiles pointillées, sans logo (un logo ne précède pas sa fonction) | **sauf les pages de texte** ; À propos et Bientôt ont leur dessin (19 nov.) | étape 5 |
| 5 | Où mènent les tuiles de la grille des apps de l'accueil ? | **Vers la fiche du module de VIT-15**, qui sera fusionnée avant. Sinon, vers la page de fonction : <br>- `planning` → Emploi du temps ; <br>- `pedagogie` → En classe ; <br>- `etablissement` → Établissement ; <br>- `annonces` → Cours et annonces ; <br>- `activites` → Quiz et jeux ; <br>- `bibliotheque` → Bibliothèque ; <br>- `personnes` → le catalogue de VIT-11 | **fiches de VIT-15**, à défaut les pages de fonction (19 nov.) | étape 3 |
| 6 | Quel poids maximal par page (EP-18) ? | Sans la vidéo, transférés : **300 Ko pour l'accueil, 250 Ko pour les autres pages** (aujourd'hui 130 et 84 Ko). **80 Ko au plus par capture**, à la plus grande largeur affichée, en AVIF avec repli WebP. Un test du site le vérifie sur `dist/` | **300 et 250 Ko**, 80 Ko par capture (19 nov.) | étape 8 |
| 7 | **Textes de l'ouverture (C2)**, à viser | <br>- titre : « L'emploi du temps calculé selon vos règles. Puis toute la classe. » (« A timetable built from your rules. Then the whole classroom. ») ; <br>- surtitre : « Planner » ; <br>- ligne des rôles, sous les boutons : « Vous êtes : Direction · Scolarité · Enseignant · Étudiant » (« You are: Leadership · Registrar · Teacher · Student »), chaque mot menant à sa page ; <br>- l'accroche reste celle de VIT-18 | **visés tels quels** (19 nov.) | étape 3 |
| 8 | **Textes de la page Application (C10)**, à viser | <br>- titre : « Planner, dans la poche. » (« Planner, in your pocket. ») ; <br>- l'accroche actuelle reprend la longue phrase ; <br>- une carte par onglet : <br>  · Tableau : « Les séances du jour et les alertes. » <br>  · Semaine : « La semaine de cours ; la dernière consultée reste lisible sans réseau. » (si VIT-18 ne la change pas) <br>  · Scanner : texte actuel <br>  · Bibliothèque : « Les documents de l'école, avec le même compte. » <br>  · Compte : « Le profil, la langue, les notifications et le téléphone de l'appel. » <br>- l'anglais suit le § 13 de l'expertise ; <br>- chaque texte est relu contre `mobile/src/app/(onglets)/` avant le commit | **visés, sous réserve du code** : une phrase que le code ne confirme pas est remontrée au chef (19 nov.) | étape 7 |

Les autres textes nouveaux (les étiquettes des dessins, les textes de remplacement des captures) sont montrés au chef **avec la planche des dessins (étape 5) et avec les captures (étape 6)**, phrase par phrase.

## 4. Solution

### 4.1 Composants communs (`vitrine/src/components/`)

| Composant | Rôle |
|---|---|
| `socle/LogoApp.astro` | pose un logo de `shared/icones/modules/` en `<img>`. Il prend le dessin simplifié sous 40 px (`fichierLogo`). Le texte de remplacement est vide quand le nom est écrit à côté |
| `socle/applications.js` | les sept apps du site : `id`, page de destination (question 5), clé du nom. Un test vérifie que les noms français sont ceux de `frontend/src/i18n/applications.fr.js` |
| `socle/GrilleApps.astro` | la grille des apps de l'accueil : tuile, logo de 64 px et nom. Elle sert aussi au dessin de Bientôt, avec des tuiles pointillées |
| `socle/IconeVivante.astro` | insère un SVG de `shared/icones/vivantes/` (import `?raw`, `aria-hidden`). `vivantes.css` est chargée une fois, par `Gabarit.astro` |
| `socle/Capture.astro` | une capture dans `CadreAppareil` : `<Picture>` d'`astro:assets` (AVIF, puis WebP), trois largeurs, `loading="lazy"`. **`alt` est obligatoire** : un test le vérifie |
| `fonctions/EnTetePage.astro` | deux ajouts facultatifs : `apps` (un ou deux logos de 72 px au-dessus du surtitre) et un emplacement `visuel` (le dessin ou la capture sous l'accroche, qui apparaît au défilement) |

- Les icônes vivantes remplacent `lucide-react` dans `BoutonPrincipal`, `EnTete`, `Sommaire`, `TypeEtablissement` et `Video`. Si plus rien n'utilise `lucide-react`, la dépendance est retirée du site.
- Les icônes de types de `EnTete` (`Briefcase`, `Landmark`, `School`) restent jusqu'à ce que les logos couvrent les types. C'est hors de VIT-09a.

### 4.2 Page par page

« Logo » : le ou les logos d'apps posés en tête par `EnTetePage`. « Nouveau » : un dessin en code, sauf mention « capture ».

| Page | Première section | Illustrations |
|---|---|---|
| **Accueil** | C2 : logo animé, « Planner » en surtitre, `h1` promesse, deux boutons, ligne des rôles | **nouvelle section « Les applications »** après la vidéo (`GrilleApps`) ; emploi du temps : **capture 1** (bilan) à la place de `IllustrationSemaine` ; appel : `IllustrationAppel` **refait** (C3) ; quiz : **capture 3** (Studio) à la place de `IllustrationQuiz` |
| Emploi du temps | logo `planning` ; `IllustrationSemaine` remonte en visuel d'ouverture | + **capture 1** (bilan des contraintes), dans la section du calcul |
| En classe | logo `pedagogie` ; visuel : `IllustrationAppel` refait | `IllustrationQuiz` gardé ; + **capture 2** (liste d'appel à la main) |
| Quiz et jeux | logo `activites` ; visuel : **capture 3** (Studio) | `IllustrationQuiz` remplacé par **nouveau : `IllustrationTableau`**, un jeu projeté au tableau et une classe sans téléphone (EP-18) |
| Bibliothèque des jeux | logo `activites` | **nouveau : `IllustrationCartesJeux`**, des cartes de jeux rangées par type |
| Bibliothèque | logo `bibliotheque` | **nouveau : `IllustrationEtagere`**, les documents d'une classe, rangés et ouverts |
| Cours et annonces | logos `pedagogie` et `annonces` | **nouveau : `IllustrationEspaceClasse`** (sections d'un cours) ; **nouveau : `IllustrationAnnonce`** |
| Application | **titre court (C10)** ; visuel : **capture 4** (semaine du mobile) dans le téléphone | cinq cartes, une par onglet (C10), chacune avec son icône |
| Établissement | logo `etablissement` | `IllustrationStatistiques` gardé ; + **nouveau : `IllustrationSalles`**, l'occupation des salles sur une semaine |
| Sécurité | sans logo ; visuel : **nouveau : `IllustrationSecurite`** (code de double authentification et lignes du journal) | — |
| Solutions | sans logo | **nouveau : `IllustrationType`**, un dessin par type d'établissement (amphithéâtre, atelier, salle de classe), sans école réelle, dans chaque section |
| Bientôt | sans logo | **nouveau** : `GrilleApps` en tuiles pointillées, les huit modules à venir sans logo (question 4) |
| Direction, Scolarité, Enseignants, Étudiants | les logos des apps du rôle, en petit (32 px), sous l'accroche | **nouveau : `IllustrationJournee`**, la journée type du rôle en trois petits écrans (une variante par rôle) |
| Catalogue (VIT-11) | — | chaque groupe de fonctionnalités s'ouvre sur le logo de son app |
| Fiches de module (VIT-15) | logo déjà posé par VIT-15 | le dessin ou la capture de son module, repris d'une page ci-dessus |
| À propos (VIT-16) | — | **nouveau : `IllustrationEquipe`**, un dessin abstrait, sans personne réelle |
| FAQ, comparer, contact, mentions, confidentialité | — | aucune (question 4) |

Menu « Fonctions » (`EnTete.astro`) : chaque entrée prend le logo petit de son app (24 px) devant son nom. Sur téléphone, la liste reste une liste.

Règle de répétition : **aucun visuel deux fois sur une même page, et trois fois au plus sur le site**. Aujourd'hui, `IllustrationQuiz` sert trois fois.

### 4.3 Les captures

- **Script** : `vitrine/scripts/captures/`.
  - `preparer.mjs` vide une base MySQL **locale et jetable** et la remplit de l'école fictive (question 1). Il utilise `backend/tests/integration/helpers/testApp.js` en lecture : rien ne change dans `backend/`. Il contient une classe, une semaine de cours calculée par le solveur, une séance du jour, un quiz et quelques documents.
  - `prendre.mjs` (Playwright) ouvre l'application web en local, en 1440 × 900, et le mobile par Expo web en 390 × 844. Il prend les quatre écrans, en français et en anglais.
  - Le script refuse de tourner si la base n'est pas locale (hôte `127.0.0.1` ou `localhost`, nom de base fixé).
- **Relecture** :
  - les images brutes sont écrites hors du dépôt ;
  - le chef les voit **une par une** ;
  - on contrôle à l'œil : aucun nom d'école, de personne réelle, de logo de l'école pilote ni d'adresse de serveur ;
  - seules les images acceptées sont copiées dans `vitrine/src/assets/captures/<langue>/`, en WebP de qualité 90 (sources légères pour le dépôt).
- **Au build**, `astro:assets` produit l'AVIF et le WebP aux bonnes tailles.
- `verifier-neutre.mjs` ne lit pas les images. La fiche de session consigne la relecture.

### 4.4 Le poids (EP-18)

- **Pour chaque page** : le poids maximal de la question 6.
- **Les captures** : chargées au défilement (`lazy`), sauf celle qui ouvre la page Application.
- **Les dessins en code** : du HTML et du CSS, quelques Ko. Ils restent le choix par défaut.
- **Le test `tests/poids.test.js`** :
  - il lit `dist/fr/` et `dist/en/` après le build ;
  - il additionne, par page, le HTML, les CSS, les scripts et les images cités, sans la vidéo ;
  - il échoue au-delà du poids maximal.

### 4.5 EP-18 et EP-5 dans les images

- **`IllustrationAppel` refait (C3)** :
  - d'abord la liste de la classe, cochée à la main par l'enseignant ;
  - puis le QR code projeté **sur l'écran de la classe**, et non sur un téléphone.
- **Quiz et jeux** : le jeu projeté au tableau (`IllustrationTableau`).
- **La capture 2** montre l'appel fait à la main.
- **Aucun outil d'État n'est nommé.** Les dessins n'écrivent aucun nom de pays ni de plateforme.

## 5. Fichiers créés ou modifiés

| Fichier | Action |
|---|---|
| `vitrine/src/components/socle/` : `LogoApp`, `GrilleApps`, `IconeVivante`, `Capture`, `applications.js` | créés |
| `vitrine/src/components/` : environ douze dessins nouveaux, `IllustrationAppel` refait | créés, modifié |
| `EnTetePage`, `Ouverture`, `PageRole`, `EnTete`, `BoutonPrincipal`, `Sommaire`, `TypeEtablissement`, `Video`, `Gabarit` | modifiés |
| `vitrine/src/pages/[lang]/*.astro`, et les pages de VIT-11, VIT-15 et VIT-16 | modifiés (pose) |
| `vitrine/src/i18n/{fr,en}/*.json` (étiquettes, textes de remplacement, C2, C10) ; `ar/` : mêmes clés, en français | modifiés |
| `vitrine/src/assets/captures/{fr,en}/` (huit images au plus) | créés |
| `vitrine/scripts/captures/preparer.mjs`, `prendre.mjs` | créés |
| `vitrine/tests/` : apps, captures (`alt`), poids, ouverture (C2), Application (C10) | créés |
| `vitrine/package.json` | `lucide-react` retiré si plus utilisé |
| `docs/plan/modules/VIT-site-vitrine.md`, fiche de session | modifié, créée |

Rien dans `frontend/`, `backend/`, `mobile/`, `shared/`, `jetons.css`, `.github/workflows/vitrine.yml` ni `deploy/`. `docs/plan/suivi.md` reste au coordinateur.

## 6. Étapes

1. Plan validé par le chef, commité seul.
2. *Quand les autres branches du site sont fusionnées* : la branche repart de `origin/main`. Les composants communs (§ 4.1), les icônes vivantes posées sur les commandes, et leurs tests.
3. L'accueil : l'ouverture (C2) et la grille des apps. Le menu « Fonctions » en logos ; le catalogue de VIT-11.
4. `EnTetePage` avec les logos et le visuel, posé sur toutes les pages de fonction.
5. Les dessins nouveaux et `IllustrationAppel` refait. **Une planche montrée au chef** (`vitrine/scripts/planche-dessins.mjs`, un fichier non commité) avec leurs étiquettes. Ses retours sont faits avant la pose.
6. Les captures : le script, puis **chaque capture montrée au chef** avec son texte de remplacement, et rien n'est commité avant son accord.
7. La pose page par page (§ 4.2), puis la page Application (C10).
8. Les vérifications :
   - le build, les tests et `verifier-neutre` ;
   - le poids ;
   - axe-core et Lighthouse sur chaque page, en 390, 768 et 1440 px ;
   - le mouvement réduit ;
   - le défilement horizontal.
9. Le fichier du module, la fiche de session et les commandes pour le chef.

## 7. Risques

- **Des conflits avec les branches d'avant** : VIT-09b passe en dernier et repart de `origin/main`. Le plan sera relu contre le site de ce moment, et un écart sera remonté au coordinateur avant le code.
- **Une capture qui montre du réel** : la base est jetable et locale, le script refuse toute autre base, et le chef relit chaque image.
- **Le poids** : il est garanti par le test du § 4.4. Une capture trop lourde est recadrée ou remplacée par un dessin.
- **Expo web rend mal la semaine** : un dessin la remplace (question 3).
- **Le style des captures change avec UIX-10b** : elles seront refaites alors (question 2), et le script le rend facile.

## 8. Hors périmètre

- L'accroche de l'accueil (D4) et l'ordre des types : VIT-18.
- Les grilles à trous et la vidéo à la demande : VIT-17.
- Les textes des pages de module et le bloc « selon votre équipement » : VIT-15.
- Les vidéos de motion design de chaque module : après UIX-10b.
- Les logos des modules « Bientôt » : quand ils existeront.
- La grille de l'application : UIX-10b.
