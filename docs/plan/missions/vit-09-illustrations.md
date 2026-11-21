# Mission · VIT-09 · les illustrations du site vitrine

| | |
|---|---|
| État | 09a : #222 **prête** ; 09b : plan validé par le chef (#227, brouillon), code en dernier sur le site |
| Agent | Claude (VS Code), la session de la vidéo de VIT-08 et de la charte : même langage visuel (choix du chef, 18 nov. vers 17 h 45) |
| Modèle recommandé | celui de la session (Opus 5.5 ou Fable 5.2) : du dessin en code, et des captures à vérifier une à une |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. vers 17 h 45 (« le site manque d'illustration ») |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05, dégelée sans tarifs |
| Fonction | VIT-09 : des illustrations sur toutes les pages du site, dessinées en code, avec quelques captures réelles sans nom d'école ni donnée réelle, et la première section de chaque page améliorée · taille M |
| Branche | `feat/vit-09-illustrations`, depuis `origin/main`, **après la fusion de VIT-07, VIT-08, VIT-10 et VIT-11** : VIT-09 passe en dernier sur le site et illustre toutes les pages d'un coup (chef, 18 nov. vers 18 h 35) |
| Dossier de travail | `..\travaux-planner\vit-09-illustrations` |
| Plan de conception | plan court à écrire : `docs/conception/vitrine/vit-09-illustrations.md` · **validé par le chef** : ce que le site montre est un choix de produit, et les captures demandent son accord |
| Condition de VIT-06 | **condition 7** de la mise en ligne (décision du chef, 18 nov.) |

## Ce que le chef a choisi (18 nov., vers 17 h 45)

- **Le genre** : des **dessins en code**, comme les quatre qui existent (`IllustrationAppel`, `IllustrationQuiz`, `IllustrationSemaine`, `IllustrationStatistiques`) ; **quelques captures réelles**, où l'on ne voit pas le nom de l'école ; et **la première section de chaque page améliorée un peu**.
- **Les pages** : toutes.
  - celles qui n'ont aucune illustration : Solutions, Sécurité et données, Bientôt ;
  - les quatre nouvelles pages de VIT-07 : Quiz et jeux, Bibliothèque, Cours et annonces, Application ;
  - l'accueil, plus fourni, en plus de la vidéo de VIT-08 ;
  - les pages qui n'en ont qu'une : une deuxième pour Emploi du temps, En classe et Établissement.
- **L'agent** : Claude de VS Code, après VIT-08.
- **La 7e condition** de la mise en ligne : le site ne part pas sans ses illustrations.

## Ajout du chef (18 nov., vers 19 h 20) : les fonctionnalités représentées comme des apps

Sur le site, chaque fonctionnalité (module) est montrée **comme une app**, une icône aux coins arrondis, au style de la grille de l'application (UIX-09 : tuiles, icônes Lucide, teintes). Quatre endroits :
- **une section de l'accueil** : la grille des apps de Planner, chacune menant à sa page ;
- **le menu « Fonctions »** : les mêmes icônes à la place de la liste de mots (le menu est de VIT-07 et VIT-10 ; VIT-09 passe après eux) ;
- **l'en-tête de chaque page de fonction**, qui s'ouvre sur l'icône de son app ;
- **le catalogue de VIT-11**, qui range les fonctionnalités sous l'icône de leur app (VIT-11 porte l'app de chaque entrée dans son registre).

Les icônes du site et celles de la grille de l'application sont **les mêmes** : le plan dit comment les partager (par exemple `shared/` ou la charte), sans copier deux fois les tracés, et avec la mention de licence de Lucide. Les noms des apps sont ceux de `frontend/src/i18n/applications.fr.js`.

## Ajout du chef (18 nov., vers 20 h 55) : les logos des modules

Le chef demande de **créer les logos des différents modules**, comme les icônes colorées de la grille « Nos modules » d'OpenEduCat (inspiration seulement, rien n'est copié) : **une icône dessinée par app ou module**, aux couleurs de la charte v2, en SVG, lisible de 24 à 96 px, en clair et en sombre. Elles servent partout sur le site : la grille de l'accueil, les menus « Fonctions » et « Solutions », l'en-tête des pages, le catalogue de VIT-11 et les fonctionnalités par type d'établissement de VIT-13. Leur source est unique (par exemple `shared/charte/` ou `shared/icones/`).

Question au chef dans le plan : l'application (grille UIX-09, aujourd'hui en icônes Lucide animées) prend-elle aussi ces logos, avec UIX-10b ? Proposition : oui, une seule famille d'icônes pour le site et l'application.

## Ce qui existe

- Quatre dessins en code : trois dans `vitrine/src/components/accueil/`, un dans `vitrine/src/components/fonctions/`. Ils sont posés dans `CadreAppareil` (socle) sur l'accueil, Emploi du temps, En classe et Établissement. Leurs textes sont dans les fichiers de traduction (par exemple `accueil.json`, `quiz.illustration`).
- La première section : `Ouverture.astro` pour l'accueil, `EnTetePage.astro` pour les pages de fonctions.
- Le plan du site prévoyait des « captures réelles de Planner sur le jeu de démonstration neutre, dans des cadres d'appareils » ([plan du site](../../conception/vitrine/vit-vitrine.md), § 4). **Ce jeu neutre n'existe pas encore.** Le seul jeu de démonstration, `seed.js`, est celui de l'école pilote (EXP-06). Les données des parcours (`frontend/tests/parcours/donnees.mjs`) sont fictives, mais leurs adresses e-mail portent encore « hestim ».

## Critère de « terminé »

- Chaque page du site a au moins une illustration, et les pages de la liste du chef en ont une de plus.
- Les fonctionnalités sont représentées comme des apps aux quatre endroits choisis par le chef, avec les mêmes icônes que la grille de l'application.
- La première section de chaque page est retouchée. Le plan dit en quoi, page par page.
- **Les captures ne montrent rien de réel** : aucun nom d'école, aucune personne réelle, aucun logo de l'école pilote, aucune adresse de serveur. Elles sont prises sur une base locale remplie de **données fictives et neutres**. Le plan dit lesquelles et comment on les produit. **Le chef voit chaque capture avant le commit.** `verifier-neutre.mjs` ne lit pas les images : la relecture se fait à l'œil, et la fiche de session la consigne.
- **EP-18, peu de connexion** : le plan fixe un poids maximal par page. Les captures sont compressées (AVIF ou WebP, par les outils d'Astro), aux bonnes tailles, et chargées quand elles approchent de l'écran. Les dessins en code ne pèsent presque rien : ils restent le choix par défaut.
- **EP-18 et EP-5 dans les images** : aucune illustration ne montre le téléphone de l'élève comme le seul chemin. L'appel à la main et le jeu au tableau ont aussi leur image. Aucun outil d'État n'est nommé, sauf « la plateforme nationale de votre pays ».
- Accessibilité : un texte de remplacement pour chaque capture ; les dessins décoratifs sont masqués aux lecteurs d'écran ; aucun mouvement quand le mouvement réduit est demandé ; contrastes AA. Lighthouse et axe-core sur chaque page.
- Français et anglais (les dessins traduits ; une capture par langue si le plan le retient) ; l'arabe affiche le français en attendant UIX-04.
- Pas de défilement horizontal en 390, 768 et 1440 px. Build, tests unitaires du site, `verifier-neutre.mjs`.
- Aucune couleur hors de la charte : `jetons.css` est généré (UIX-10a). Un besoin de couleur passe par `shared/charte/jetons.json`, et se demande au coordinateur.

## Périmètre d'écriture

L'agent peut écrire :
- `vitrine/src/components/` : les dessins nouveaux, et ceux qui existent ; les icônes d'apps ;
- `vitrine/src/components/socle/EnTete.astro` et `vitrine/src/i18n/langues.js`, pour le menu « Fonctions » en icônes, et la page du catalogue de VIT-11, pour ses icônes : tous après leur fusion ;
- un dossier partagé pour les icônes communes au site et à l'application, si le plan le retient et que le chef l'accepte (il touche alors `frontend/src/components/applications/`, de UIX-09) ; `Ouverture.astro`, `EnTetePage.astro` et les composants du socle utiles à la première section, avec leurs tests ;
- `vitrine/src/pages/[lang]/` : y poser les illustrations ;
- `vitrine/src/i18n/{fr,en,ar}/` : les textes des dessins et les textes de remplacement ;
- `vitrine/src/assets/` ou `vitrine/public/` (au choix du plan) : les captures ;
- un script de captures, si le plan le retient, dans `vitrine/scripts/`, qui ne lit qu'une base locale de données fictives ;
- `vitrine/tests/` ; le plan court, `docs/plan/modules/VIT-site-vitrine.md` et la fiche de session.

L'agent ne touche pas :
- à `docs/plan/suivi.md`, que tient le coordinateur ;
- à `vitrine/src/styles/jetons.css`, qui est généré, ni à `shared/charte/` sans accord ;
- à l'application (`frontend/`, `backend/`, `mobile/`), qu'il lance en local seulement pour les captures ;
- à `.github/workflows/vitrine.yml` et à `deploy/`, tenus par VIT-06 (Codex) et l'audit du 27 nov. (agent de Cursor) ;
- à aucune donnée réelle : ni la base de l'école pilote, ni `seed.js` pour les captures.

## Ce qui est déjà décidé

- Les règles du site : ne dire que ce qui existe ; aucun prix ; aucun nom d'école réelle ; rien chargé d'un autre site ; la loi 09-08 non nommée ; l'IA écrite « quand l'école active l'IA ».
- Aucun logo, aucune icône, aucune image ni mise en page reconnaissable d'Apple ([plan du site](../../conception/vitrine/vit-vitrine.md), § 2).
- Les vidéos de motion design sur les captures de chaque module viennent **plus tard**, après UIX-10b (décision du 18 nov., vers 11 h 40). VIT-09 ne fait que des images fixes ou des dessins animés au défilement.
- EP-18 et EP-5 généralisée (chef, 18 nov., 16 h).
- Dépôt public : rien de réel (décision du 7 nov.).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Sur quelles données prendre les captures ? | une base locale remplie par un script de captures à part (`vitrine/scripts/`), avec des noms d'école, de cours, de personnes **et d'adresses e-mail** neutres. Ni `seed.js` (école pilote), ni les données des parcours telles quelles : leurs adresses portent encore « hestim » (`exemple.hestim.test` dans `donnees.mjs`, `hestim.test` dans `testApp.js`) | chef, dans le plan |
| 2 | Combien de captures, et sur quelles pages ? | trois à cinq en tout, là où un dessin rendrait moins bien l'écran réel (grille des applications, Studio quiz, appel) ; le reste en dessins | chef, dans le plan |
| 3 | Les captures montrent le style actuel, qui changera avec UIX-10b. Les refaire alors ? | oui, avec les vidéos de chaque module, après UIX-10b | chef |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : VIT-09, les illustrations du site vitrine (condition 7 de la mise en ligne),
choix du chef du 18 nov. : dessins en code sur toutes les pages, quelques captures réelles sans nom d'école ni donnée réelle,
et la première section de chaque page un peu améliorée. Elle vient après le code de VIT-08 dans ta file.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-5, EP-18), docs/plan/feuille-de-route.md,
puis ta fiche de mission docs/plan/missions/vit-09-illustrations.md et le plan du site docs/conception/vitrine/vit-vitrine.md.
Écris le plan court docs/conception/vitrine/vit-09-illustrations.md : page par page, l'illustration, la retouche de la première section,
les captures (données fictives, liste, poids) ; pose tes questions au chef (outil de questions). Le chef le valide. Commite-le seul.
Le code commence après la fusion de VIT-07 et de VIT-08, sur feat/vit-09-illustrations depuis origin/main,
dans ..\travaux-planner\vit-09-illustrations. Chaque capture est montrée au chef avant le commit.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour ; suivi.md non modifié ; tout est commité ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 17 h 45 | fiche écrite par le coordinateur, sur les choix du chef (genre, pages, agent, 7e condition) | — |
| 2026-11-18 18 h 40 | ordre fixé par le chef : VIT-07, VIT-10, VIT-11, puis VIT-09 ; le plan s'écrit pendant ce temps, et couvre aussi les pages par rôle, le catalogue et la FAQ | — |
| 2026-11-18 19 h 25 | ajout du chef : les fonctionnalités représentées comme des apps (accueil, menu « Fonctions », en-tête de chaque page, catalogue de VIT-11), confié à VIT-09 | — |
| 2026-11-18 21 h | ajout du chef : créer les logos des modules (une icône dessinée par app ou module, charte v2), utilisés sur tout le site ; question au chef sur l'adoption par l'application | — |
| 2026-11-18 21 h 20 | décisions du chef : **de vrais logos illustrés** pour les modules (multicolores, en léger volume, charte v2 ; pas de simples icônes), et **des icônes vivantes** sur les boutons et les liens (animées au survol et au focus, coupées si le visiteur demande moins de mouvement). VIT-09 est découpée : **VIT-09a**, la bibliothèque des logos et des icônes animées (source unique, sans toucher les pages), tout de suite après la correction de #216 ; **VIT-09b**, l'intégration sur toutes les pages, les illustrations, les captures et la première section, en dernier sur le site | — |
| 2026-11-19 0 h 20 | **VIT-09a codée** (#222, planche validée par le chef ; conflit d'une ligne sur le fichier du module VIT, à résoudre en gardant les deux lignes). **Ajouts de l'[expertise](../../etude-marche/12-expertise-site-vitrine.md) à VIT-09b** (§ 13) : C2, le titre principal dit la promesse (« L'emploi du temps calculé selon vos règles. Puis toute la classe. »), « Planner » devient le surtitre, et une ligne de liens vers les quatre rôles sous les boutons (l'accroche D4 et l'ordre des types passent à [VIT-18](vit-18-textes-exacts.md)) ; C3, les captures prioritaires (bilan des contraintes après un calcul, liste d'appel à la main, Studio en édition, semaine du mobile) et le dessin de l'appel qui montre d'abord la liste à la main, puis le QR code sur un écran de classe et non sur un téléphone ; C10, la page Application avec une carte par onglet (textes tirés de `mobile/src/app/(onglets)/`, au chef) et un titre court (« Planner, dans la poche. »). La grille à trous passe à [VIT-17](vit-17-correctifs-vitrine.md). Le nouveau rendu de deux phrases de la vidéo (`scenes.4`, `scenes.7`) suit VIT-18 | — |
| 2026-11-21 | 09a : conflit résolu (`62775061`), CI verte : **prête**. 09b : plan court validé par le chef (`8f451998`) | 09a prête |
| 2026-11-21 | report de la [synthèse des concurrents](../../etude-marche/14-reprendre-et-depasser.md) (R2) : les captures de VIT-09b montrent le produit sur ordinateur **et** sur téléphone, sur des données neutres **et crédibles** (noms, effectifs et horaires vraisemblables, jamais une école réelle) ; et le plan a la section « Ce que disent les études » | ajout |
| 2026-11-21 | **VIT-09b ne pose pas les logos des pages de module** : VIT-15 le fait (report de la session de la charte) | ajout |
