# Session du 2026-11-22 · VIT-20 · `feat/vit-20-structure-du-site`

| | |
|---|---|
| Fait par | Claude Code (Sonnet 5.5), agent autonome, lots R0, B, A et C |
| Chantier | VIT |
| Dossier de travail | dépôt principal (`..\travaux-planner` non créé : session autonome) |
| Dernier commit | le dernier de la branche (PR #257) |

## Objectif de la session

Lots R0, B, A et C du [plan VIT-20 v2](../conception/vitrine/vit-20-structure-du-site.md) (lu sur `origin/doc/coordination-2026-11-22`,
pas encore sur `main`). Le lot D est laissé : sa place est vide dans `PageModule.astro`.

## Plan

Le plan est validé par le chef. Avant chaque étape, ce que je vais faire :

- **R0** : `donnees/modules.js` (17 modules), `donnees/site.js`, `i18n/langues.js` (routes des modules, menus), libellés du § 4.7
  dans `i18n/*/commun.json`, `i18n/*/modules.json`, `components/applications/GrilleModules.astro`, `TuileModule.astro`, squelette
  de `PageModule.astro`, `equipement.json` vides, `tests/modules.test.js`.
- **B** : pages `pages/[lang]/applications/*`, `socle.astro`, catalogue rangé par `module`, redirections, pages de fonction supprimées.
- **A** : `EnTete.astro`, `components/navigation/`, `PiedDePage.astro`.
- **C** : `index.astro`, `components/accueil/`, comparatif interactif (Astro et script du navigateur).

## Fait

Commits par étape (`git log origin/main..feat/vit-20-structure-du-site`) :

- **R0** : registre des 17 modules (`donnees/modules.js`), `donnees/site.js` (`ADRESSE_APPLICATION` vide), chemins `module.<clé>` et `cheminContact`
  dans `langues.js`, libellés du § 4.7 (`commun.json`), `modules.json` (noms), `equipement.json` vides, `GrilleModules`, `TuileModule`,
  `logos.js` (logos VIT-09a en SVG inline, place réservée sinon), `modules.test.js`.
- **B** : `PageModule` complet (ouverture avec onglets, fonctionnalités du module, « Pour qui », « Un besoin, une application. »,
  emplacement vide du lot D), cinq pages de module, `/applications/`, `/socle/`, registre rangé par `module` (champ `page` retiré),
  catalogue par module, 7 redirections par langue (`astro.config.mjs`), 7 pages de fonction supprimées, liens des rôles, types et accueil mis à jour.
- **A** : `components/navigation/` (`MenuDeroulant`, trois menus en `<details>`), `EnTete` refait, `PiedDePage` en quatre colonnes,
  `MenuFonctions` et les constantes `FONCTIONS`, `BARRE`, `NAVIGATION` supprimés.
- **C** : accueil dans l'ordre du § 4.3 (`Applications`, `ParType`, boutons de démonstration), `QuizJeux` et `Bientot` supprimés,
  `ComparatifInteractif.astro` (onglets et mode « Critère » rendus au build, script du navigateur, `animate` de Motion, mouvement réduit respecté, repli sans JavaScript ; aucun React).
- Pour la CI : `.github/workflows/vitrine.yml` lance `node --test tests/*.rendu.cjs` après la construction.

## Vérifié

Depuis `vitrine/`, sur le dernier commit :

- `npm ci` ; `node ../scripts/verifier-neutre.mjs` : vert ; `npm run test:unit` : 142 réussis, 0 échec (116 au départ, dont 1 ignoré) ;
- `npm run build` : 39 pages, sans erreur ;
- `node --test tests/*.rendu.cjs` (site construit : pages de module, navigation, accueil) : 30 réussis ;
- `node scripts/verifier-poids-ep19.mjs` : page la plus lourde `fr/index.html` 117,9 Ko. Le comparatif n'ajoute que 0,9 Ko gzip de script (il réutilise `animate`, déjà chargé par le site) ;
  aucun HTML ne charge React : le fichier `_astro/client.*.js` est produit par l'intégration React mais n'est référencé par aucune page ;
- parcours Chromium (`node --test tests/*.parcours.cjs`) : menus au clavier et au toucher, avec et sans JavaScript, 390, 768 et 1440 px (7) ;
  comparatif interactif et son repli, mouvement réduit compris (10) ; axe-core sur 9 pages, 2 largeurs, menu fermé et ouvert (19), 0 violation.
  Chromium a tourné avec des bibliothèques système extraites en local (`apt-get download` sans installation) ; rien n'est installé sur la machine ;
- image Nginx de la CI : `docker build`, puis `nginx/verifier-image.cjs` (Chromium au lieu de Chrome) : 53 pages dont les 14 pages de renvoi, vert ;
- lignes de plus de 160 caractères : aucune dans les lignes que j'ai ajoutées (CSS en plusieurs lignes) ; restent des lignes anciennes de textes, de tests et de commentaires de la CI ;
- à l'œil : accueil (1440), page Quiz et jeux (1440), menu Applications (1440 et 390), page Présences (768). Pas de capture commitée.
  Non vérifiés à l'œil : l'accueil à 390 et 768 px, les pages en anglais (testées par les tests de rendu seulement).

## Choix faits sans le chef

| Question | Option retenue | Autre option | Fichier touché |
|---|---|---|---|
| #254 (VIT-13) et #223 (VIT-12) ne sont pas fusionnées | je pars de `origin/main` ; ni Mentions légales ni Confidentialité dans le pied de page | attendre leur fusion | `PiedDePage.astro` |
| Contact et « Demander une démonstration » | `/<langue>/#contact`, constante `CONTACT` de `langues.js` ; la colonne « Planner » du pied de page n'a que Contact (À propos : VIT-16) | — | `langues.js`, `PiedDePage.astro` |
| Clé de page d'un module | `module.<clé>` (ex. `module.presences`), pour ne pas heurter les anciennes clés | clés nues | `langues.js` |
| Ordre des modules | ordre de l'étude 15, sauf Paiements en ligne (16) avant Échanges avec l'État (15), comme dans le menu du § 4.2 | ordre strict | `donnees/modules.js` |
| Logos | les 7 logos de VIT-09a sur emploiDuTemps (planning), espaceDeCours (pedagogie), quizEtJeux (activites), annoncesEtMessages (annonces), bibliotheque ; Présences et les 11 autres gardent la place réservée | un logo pour Présences | `donnees/modules.js` |
| Champ `module` du registre | comptes, salles, occupation et semaine → `socle` (§ 4.6 : l'ancienne page Établissement et la page Application vont au socle) ; familles → Vie scolaire et familles ; stages → Stages ; documents, dépôts, noter, vidéos, projets, événements → Bibliothèque | examens sous Emploi du temps (étude 15) | `donnees/fonctionnalites.json` |
| Entrées du registre d'un module « Bientôt » (Bibliothèque, Stages, Vie scolaire) | badge « Bientôt » calculé d'après le module, lien vers « Toutes les applications » ; l'état `existe` du registre n'est pas modifié | changer l'état des entrées | `catalogue/registre.js` |
| Carte « Des sondages » de l'ancienne page En classe | non reprise : la carte « Sondages » de Cours et annonces dit la même chose et est déjà sur Espace de cours | les deux cartes | `applications/espace-de-cours.astro` |
| Cartes « Des jeux » et « Un seul compte » de En classe | non reprises : « Des jeux » est couverte par la section Jeux ; « Un seul compte » cite la bibliothèque de cours (phrase relevée plus bas) | les mettre sur Quiz et jeux et le socle | — |
| Accroches des pages Présences, Espace de cours, Annonces | titre ou accroche de la section déplacée (« L'appel en un geste. », accroche de Cours et annonces, « Les nouvelles de l'école. ») ; description de la page = ce même texte | — | `applications/*.astro` |
| Titre et description de `/applications/` et `/socle/` | le libellé du § 4.7 (« Toutes les applications », « Inclus dans tout abonnement ») | une phrase de présentation (texte nouveau) | `applications/index.astro`, `socle.astro` |
| Section « Pour qui » | tirée des pages existantes : types dont un point « Aujourd'hui » mène au module, rôles dont une carte y mène ; rien n'est rendu s'il n'y en a aucun (Annonces et messages) | une liste fixe de rôles par module (texte nouveau) | `applications/pourQui.js` |
| Libellés des cartes de rôles (« En classe », « Pour l'établissement », « Cours et annonces », « Application ») | inchangés, mais ils mènent aux nouvelles pages (Présences, Socle, Espace de cours, Socle) | les renommer (phrase nouvelle) | `i18n/*/direction.json`… |
| Carte « Bibliothèque » de la page Étudiants | mène à « Toutes les applications » | la retirer | `i18n/*/etudiants.json` |
| Onglet « Bibliothèque des jeux » | nom pris dans le titre de la page existante | libellé nouveau | `applications/quiz-et-jeux.astro` |
| Section Studio de Quiz et jeux | sans illustration (celle du quiz est déjà dans la section voisine) ; la moitié droite reste vide | répéter l'illustration | `applications/quiz-et-jeux.astro` |
| Titre de la grille de l'accueil | « Un besoin, une application. » ; bouton « Toutes les applications » (libellé du § 4.7) au lieu de « Voir toutes les applications » | — | `accueil/Applications.astro` |
| Section « Par établissement » de l'accueil | titre « Par établissement » (menu), carte = surtitre et titre du type dans `solutions.json` | — | `accueil/ParType.astro` |
| Onglets du comparatif | les quatre approches, plus un cinquième onglet nommé « Critère » (mot existant) qui montre un critère à la fois ; aucun libellé de mode nouveau | deux boutons de mode (libellés nouveaux) | `accueil/ComparatifInteractif.jsx` |
| Lignes du comparatif interactif | les cinq de `LIGNES_ACCUEIL` | les neuf de `LIGNES` | `accueil/Pourquoi.astro` |
| Comparatif sans React (demandé à la relecture) | composant Astro : onglets rendus au build, `<script>` du navigateur qui montre, cache et anime avec `animate` ; repli visible tant que le script n'a pas tourné | îlot React (retiré : 65 Ko) | `accueil/ComparatifInteractif.astro` |
| Fond de l'en-tête | 96 % d'opacité au lieu de 82 % : axe-core relevait un contraste insuffisant du lien de langue sur une section sombre | laisser | `socle/EnTete.astro` |
| Tests qui lisent `dist/` | fichiers `*.rendu.cjs`, lancés par la CI après la construction (les tests unitaires tournent avant) | tests unitaires qui sautent sans `dist/` | `tests/*.rendu.cjs`, `.github/workflows/vitrine.yml` |
| Parcours des menus | `menu-fonctions.parcours.cjs` remplacé par `menus.parcours.cjs` (le menu à fenêtre a disparu) | — | `tests/` |
| Dev server et logos | `vite.server.fs.allow: ['..']` pour lire `../shared/icones/modules` | copier les logos dans `vitrine/` (hors périmètre) | `astro.config.mjs` |
| Compte GitHub du push | `rluf01` (dépôt côté personnel, règle de `~/.claude/CLAUDE.md`) ; un premier essai avec le compte de travail a été refusé par GitHub (403), rien n'a été poussé | — | — |

## Phrases relevées sur la Bibliothèque

À corriger après décision du chef, phrase par phrase (la Bibliothèque est « Bientôt » ; aucune n'a été modifiée) :

- `application.json` (entete.accroche, meta, entete.titre) : « …la bibliothèque, sur le téléphone », « Cinq onglets : … la bibliothèque, le compte » ; reprise dans `etudiants.json` (carte Application).
- `etudiants.json` : carte « Bibliothèque » et, dans « avec » et la FAQ, « ouvre la Bibliothèque » ; `faq.json` : même réponse.
- `faq.json` : « Peut-on choisir StudyLib séparément ? » et sa réponse (StudyLib n'est plus en service).
- `comparer.json` (lecture seule, VIT-14) : ligne « L'appel, les quiz, les jeux et la Bibliothèque, avec un seul compte » et sa case Planner.
- `accueil.json` : la bibliothèque dans la vidéo (lignes 236, 238, 251, 254, 265, 401) et la carte « Bibliothèque » de la section Bientôt (360). La vidéo est rendue
  d'après ces textes : une correction oblige à la régénérer (VIT-08).
- `en-classe.json` : « Le même compte ouvre Planner, la bibliothèque de cours et les jeux » (carte non reprise sur le site).
- `fonctionnalites.json` (registre, i18n) : le groupe « Bibliothèque · StudyLib » et les entrées documents, dépôts, noter, vidéos, projets, événements à l'état `existe`.

## Corrections de la relecture du coordinateur (d21f7b2a)

1. CI rouge : `nginx/verifier-image.cjs` attend maintenant la cible des pages de renvoi (statut 200 et noindex vérifiés, puis `waitForURL`).
2. Comparatif refait en composant Astro avec un script du navigateur ; `ComparatifInteractif.jsx` et `client:visible` supprimés.
3. Registre : `examens` sous `emploiDuTemps`.
4. Lignes de plus de 160 caractères coupées dans les fichiers ajoutés ou modifiés.

## Questions

Aucune question bloquante : les points non tranchés par le plan sont dans le tableau des choix.

## État laissé

- VIT-20 (lots R0, B, A, C) → fait, PR #257 à relire ; lot D (« Selon votre équipement ») → non commencé, place laissée vide dans `PageModule.astro`.
- `docs/plan/suivi.md` non modifié (consigne) ; la ligne VIT-20 de `docs/plan/modules/VIT-site-vitrine.md` est à jour.

## Reste à faire, dans l'ordre

1. Le chef relit la PR #257, tranche le tableau des choix, puis fusionne.
2. Après la fusion : lot D par Codex (`feat/vit-20d-equipement`), puis corriger les phrases de la Bibliothèque relevées ci-dessus.
3. Quand #223 (VIT-12) et VIT-16 seront fusionnées : Mentions légales, Confidentialité, À propos dans le pied de page ; `CONTACT` de `langues.js` vers `/contact/`.
4. Quand l'adresse de l'application est fixée : renseigner `ADRESSE_APPLICATION` (« Se connecter » apparaît).
5. Prendre les captures « après » à 390 et 1440 px pour la recette (aucune n'est commitée) ; compléter à l'œil l'accueil à 390 et 768 px et les pages anglaises.
6. Les tests unitaires, le rendu et les parcours restent à lancer avant chaque push (voir « Vérifié »).

## Commandes pour le chef de projet

Rien à pousser : la branche l'est déjà. Relire et fusionner :

```powershell
gh pr view 257 --web
gh pr merge 257 --merge   # seulement après relecture
```

## Prompt de reprise

```text
Tu reprends VIT-20 (structure du site sur le modèle d'Odoo), chantier VIT, branche feat/vit-20-structure-du-site (PR #257).
Lis d'abord AGENTS.md, docs/plan/README.md, le plan docs/conception/vitrine/vit-20-structure-du-site.md et cette fiche
(docs/sessions/2026-11-22-feat-vit-20-structure-du-site.md).
Fait : lots R0, B, A et C. Reste : la relecture du chef, le lot D (« Selon votre équipement », autre branche), les phrases sur la Bibliothèque.
Règles : aucune phrase nouvelle sur le produit ; fiche de session à jour ; suivi.md non modifié ; ne pousser que la branche de la mission.
```
