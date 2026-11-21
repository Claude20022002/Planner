# UIX-09 · Grille d'applications façon iCloud · conception proposée

| | |
|---|---|
| Module | [UIX](../../plan/modules/UIX-interface.md), suite d'UIX-01a (accueil des applications) |
| Identifiant | UIX-09, proposé le 18 novembre 2026 (UIX-07 et UIX-08 sont pris par la PR #193) |
| Taille | M |
| Branche | `feat/uix-09-grille-applications`, depuis `origin/main` |
| Rédigé par | Claude Code (Opus 5.5), coordinateur, le 18 novembre 2026 |
| Validé | **Validé par Claude20022002 le 18 novembre 2026** (« Je valide les deux plans »), dépendances comprises |
| Agent | Codex, seul sur cette branche, après l'intégration d'UIX-06b |

## 1. Ce que veut le chef (17 nov.)

« Pour la partie admin, là où apparaissent les modules achetés de l'école, un truc comme le site d'iCloud, avec les différentes apps. »

**Terminé** quand :
- après la connexion, l'utilisateur voit une grille de grandes tuiles carrées aux coins arrondis, une par application, avec une icône claire et le nom dessous ;
- un clic, ou Entrée au clavier, ouvre l'application ;
- la grille marche à 390 et à 1440 px, en clair et en sombre, en français et en anglais ;
- l'arabe en droite à gauche est préparé par les propriétés logiques ;
- axe-core ne relève aucune violation et le mouvement réduit est respecté ;
- les droits ne changent pas : un rôle ne voit que les applications qu'il voit aujourd'hui.

## 2. Ce qui existe (UIX-01a, sur `main`)

- `pages/Applications.jsx` (75 lignes) : accueil des applications du rôle connecté, recherche locale.
- `components/applications/catalogue.js` : sept applications construites **seulement** à partir des rubriques déjà autorisées : planning, pédagogie, personnes, établissement, annonces, activités, bibliothèque.
- `components/applications/IconeApplication.jsx` : icônes Material.
- `MenuApplication.jsx`, `CompteApplications.jsx`, `routes/applications.jsx` : menu de l'application ouverte, compte, routes protégées.

Le catalogue et les droits restent tels quels. UIX-09 change **la présentation** de l'accueil et des icônes.

## 3. Solution

- **En-tête** : le logo de Planner, le nom de l'école, une salutation (« Bonjour, Prénom »), le compte à droite. C'est l'esprit d'icloud.com, sans en copier la mise en page.
- **Grille** : des tuiles de 96 à 120 px, une par application. Chaque tuile a :
  - un fond en dégradé propre à l'application, dans la gamme des bleus du logo et de quelques teintes sobres ;
  - une icône Lucide blanche au centre ;
  - le nom dessous.
- **Animations** (Motion, déjà dans le projet) :
  - les tuiles apparaissent l'une après l'autre au chargement ;
  - une tuile grossit légèrement au survol et au focus ;
  - l'icône s'anime au survol, avec les icônes lucide-animated copiées dans le dépôt ;
  - rien de tout cela si le mouvement réduit est demandé.
- **Recherche** : gardée, au-dessus de la grille ; elle filtre les tuiles.
- **Modules non achetés** : rien n'est affiché ce soir. L'état « non acheté » attend le registre des modules (VEN-01). Le composant de tuile prévoit déjà un état « inactif », qui n'est pas utilisé.
- **Application ouverte** : `MenuApplication` garde son rôle ; il prend les mêmes icônes.

## 4. Composants et fichiers

Chemins sous `frontend/src/`. Repères d'[equipe.md](../../plan/equipe.md), § 3.

| Fichier | Rôle |
|---|---|
| `pages/Applications.jsx` | assemble l'en-tête, la recherche et la grille (80 lignes au plus) |
| `components/applications/EnteteApplications.jsx` | logo, école, salutation, compte |
| `components/applications/GrilleApplications.jsx` | grille et apparition des tuiles |
| `components/applications/TuileApplication.jsx` | une tuile : fond, icône, nom, états actif et inactif, focus |
| `components/applications/IconeApplication.jsx` | correspondance entre application et icône Lucide (statique ou animée) |
| `components/applications/icones/` | icônes animées copiées, une par fichier |
| `components/applications/teintes.js` | dégradé de chaque application, en jetons |
| `i18n/applications.fr.js`, `.en.js` | textes nouveaux (salutation) |
| `tests/parcours/applications.spec.cjs` | parcours existant, complété : clavier, 390 px, sombre, rôles |

Aucun changement à `catalogue.js` (sauf pour lire une icône), aux routes, aux droits ni au serveur.

## 5. Données, sécurité, exigences

- Aucune table, migration ni route nouvelle.
- Les droits restent ceux d'aujourd'hui : la grille lit le catalogue existant, construit depuis les rubriques autorisées.
- Exigences : EP-2 (interface sobre, menu limité aux modules actifs), EP-11 (contraste AA, droite à gauche préparée), EP-16 (aucun texte en dur), EP-17 (temps jusqu'à l'ouverture d'une application, mesuré avant et après).

## 6. Vérifications

- `npm run lint`, `npm run test:unit`, `npm run build`, neutralité.
- Parcours `applications.spec.cjs` dans la CI : administrateur, enseignant, étudiant ; clavier ; 390 et 1440 px ; clair et sombre.
- Le parcours de l'accueil d'UIX-01a reste vert.

## 7. Questions au chef

| N° | Question | Proposition |
|---|---|---|
| 1 | Valider ce plan, et la dépendance Lucide ? | **oui (chef, 18 nov.)** |
| 2 | Montrer plus tard les modules non achetés, grisés, avec « Découvrir » ? | oui, avec VEN-01, sans prix tant que la vente est gelée |
| 3 | La grille remplace-t-elle les icônes Material dans le menu de l'application ouverte ? | oui, pour qu'il n'y ait qu'un seul style d'icônes |
