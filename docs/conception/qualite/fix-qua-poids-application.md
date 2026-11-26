# M-9 · Le poids du premier chargement — plan court

| | |
|---|---|
| Module | [QUA](../../plan/modules/QUA-qualite-docs.md) · correctif hors chantier (étude EP-18, M-9) |
| Mission | `docs/plan/missions/ep18-correctifs.md` (branche `doc/coordination-equipe`) |
| Branche | `fix/qua-poids-application`, depuis `origin/main` (`561fad19`) |
| Rédigé par | agent de Cursor (Grok 4.7), le 22 novembre 2026 |
| **Validé** | 26 nov. 2026. Message du coordinateur du 25 nov. à 23 h 01. Question 1 : non, pas de brotli (décision du chef). Question 2 : oui, l'apparition de l'état vide passe en CSS (décision du coordinateur). Le commit `133f63e5` avait lu ces réponses à l'envers. |

## 1. Objet et critère de « terminé »

Deux changements, sans changer ce qu'un écran affiche.

- **(a)** Le serveur web du site de l'application reste en gzip. On ajoute `gzip_vary on`, absent aujourd'hui sur `main`. On ne compile pas `ngx_brotli`.
- **(b)** La bibliothèque d'animation n'est plus dans le chargement commun des écrans, ni dans l'état vide. Elle ne part qu'avec le lanceur d'applications. L'apparition de l'état vide (0,18 s, opacité, échelle) est la même, écrite en CSS.

Terminé quand le poids du premier chargement est mesuré avant et après, et que ces deux nombres sont écrits dans la PR (EP-19). Aucun écran ne change d'aspect. M-9 (c), le plafond, n'est pas dans ce correctif.

## 2. Ce qui existe

Mesure de l'étude, le 22 nov., au commit `b57753e9` : premier chargement 338,1 Ko en gzip, 280,5 Ko en brotli. Sur l'écran d'appel, le morceau `animation` (`framer-motion`) pèse 35,9 Ko en gzip, en plus du premier chargement.

| Endroit | Aujourd'hui, sur `main` |
|---|---|
| `frontend/nginx.conf:52-55` | `gzip on`, pour le html, le css, le js, le json, le xml et le svg, à partir de 1 024 octets. Pas de `gzip_vary`. Pas de brotli. |
| `frontend/Dockerfile:25` | l'image est `nginx:1.27-alpine`. Elle n'apporte pas le module brotli. Le reste du fichier copie `dist/` et `nginx.conf`. |
| `frontend/vite.config.js:21` et `:63` | `manualChunks` range `framer-motion` et `motion` dans le morceau `animation`. |
| La coquille | `DashboardLayout.jsx` importe `MenuApplication.jsx`, qui importe `IconeApplication.jsx`. Ce fichier importe en dur les icônes animées (`icones/`), et `CadreIcone.jsx` importe `motion/react`. Le menu appelle `<IconeApplication>` sans animation (`animee` reste faux). La bibliothèque part quand même avec chaque écran qui a la coquille. |
| Le lanceur | `Applications.jsx` est déjà en `import()`. `GrilleApplications.jsx` et `TuileApplication.jsx` importent `motion/react` pour le léger agrandissement (0,18 s) et les icônes animées. `mouvementReduit` laisse les icônes Lucide. |
| L'état vide | `design-system/components/EmptyState.jsx` importe `motion/react` pour une apparition (opacité 0 à 1, échelle 0,98 à 1, 0,18 s, courbe `[0.16, 1, 0.3, 1]`). Les pages qui l'importent chargent donc aussi le morceau. |
| Ailleurs | `vitrine/nginx/nginx.conf` compresse le site public, hors de ce correctif (EP-19). `deploy/vps/nginx-hestim.conf` est un relais : il ne compresse pas les fichiers de l'application. |

Le commit `94413605` a fait l'inverse de ces réponses : il compile `ngx_brotli` et il laisse `EmptyState.jsx` sur `motion/react`. Le code qui suit ce plan corrigé retire les deux.

Parmi les dossiers de travail ouverts le 22 nov., seul `b/offres-stage` touche `DashboardLayout.jsx` (une ligne). Il ne touche ni `nginx.conf`, ni le `Dockerfile`, ni les icônes, ni `EmptyState.jsx`. Ce correctif n'écrit pas `DashboardLayout.jsx`.

## 3. Questions

| N° | Question | Proposition | Réponse | Bloque |
|---|---|---|---|---|
| 1 | L'image nginx n'a pas brotli. Compiler le module `ngx_brotli` dans `frontend/Dockerfile` est une dépendance du serveur. Est-ce accepté ? | Oui : le module est compilé dans cette image. | **non** (chef, 25 nov., message du 25 nov. 23 h 01). Gzip reste. On ajoute seulement `gzip_vary on`. Pas de module, pas de fichiers `.br`. | non |
| 2 | L'état vide garde-t-il la bibliothèque ? | Non. L'apparition déjà écrite (0,18 s, opacité, échelle) passe en CSS. La bibliothèque ne reste que sur le lanceur. | **oui, la proposition** (coordinateur, même message). L'apparition passe en CSS. | non |

## 4. Solution

**(a)** Gzip seul, comme sur `main`, plus `gzip_vary on`. Un cache ne mélange pas une réponse compressée et une réponse brute. `frontend/Dockerfile` revient au fichier d'avant `94413605` : l'image `nginx:1.27-alpine` telle quelle, sans étape de compilation. Rien ne change pour le site vitrine ni pour le relais du VPS.

**(b)** `IconeApplication.jsx` ne charge que les icônes Lucide. `TuileApplication.jsx` charge les icônes animées, et seulement elle (avec `GrilleApplications.jsx`, qui a déjà `motion`). Le menu ne les importe plus. `EmptyState.jsx` n'importe plus `motion/react`. Le `Paper` reprend la même apparition en CSS : opacité de 0 à 1, échelle de 0,98 à 1, 0,18 s, `cubic-bezier(0.16, 1, 0.3, 1)`. Si la personne demande moins de mouvement, l'animation est coupée, comme sur la projection de l'appel (`AppelProjection.jsx`) ; `index.css` raccourcit déjà toutes les animations CSS dans ce cas. `vite.config.js` ne change pas : le morceau `animation` existe encore, il n'est simplement plus tiré par la coquille ni par l'état vide.

Aucun texte, aucun parcours, aucune durée déjà écrite ne change. `mouvementReduit` reste celui du lanceur.

## 5. Fichiers

| Fichier | Créé / modifié | Rôle |
|---|---|---|
| `docs/conception/qualite/fix-qua-poids-application.md` | modifié | ce plan, corrigé avant le code |
| `frontend/Dockerfile` | modifié | retirer le module ajouté par `94413605` |
| `frontend/nginx.conf` | modifié | gzip conservé, `gzip_vary on`, directives brotli retirées |
| `frontend/src/components/applications/IconeApplication.jsx` | déjà modifié | Lucide seul, plus d'import animé |
| `frontend/src/components/applications/TuileApplication.jsx` | déjà modifié | les icônes animées, pour le lanceur |
| `frontend/src/design-system/components/EmptyState.jsx` | modifié | la même apparition, en CSS |
| `frontend/src/components/applications/animation-hors-coquille.test.js` | modifié | la coquille et l'état vide n'importent plus `motion/react` |
| `docs/plan/modules/QUA-qualite-docs.md` | modifié | une ligne, à la fin du code |
| fiche de session | créé | à la fin du code |

Pas de `docs/plan/suivi.md`. Pas de `vitrine/nginx/nginx.conf`. Pas de `deploy/vps/nginx-hestim.conf`. Pas de `frontend/vite.config.js`. Pas de `DashboardLayout.jsx`.

## 6. Données et migration

Aucune table. Aucune clé de traduction.

## 7 ter. EP-18 : tous les contextes

| Contexte | Ce que fait la fonction | Preuve ou test |
|---|---|---|
| **A. Au moins un élève sans téléphone ni ordinateur** | Rien de nouveau à l'écran. Sur l'ordinateur de la salle, les écrans de gestion n'emportent plus la bibliothèque d'animation. L'élève sans appareil regarde la projection, comme aujourd'hui. | la mesure avant / après |
| **B. Connexion lente ou coupée** | C'est le correctif. La bibliothèque d'animation ne part plus avec chaque écran. Les fichiers à empreinte restent en cache un an (`nginx.conf`, `expires 1y`) : un appareil déjà chargé ne les reprend pas. Coupée, la page déjà en cache s'ouvre comme aujourd'hui. Le serveur reste en gzip : le premier chargement ne passe pas en brotli. | la mesure ; le test d'import |
| **C. Ce qu'a l'école : ordinateur et projecteur (C1), ou rien dans la salle (C2)** | En C1, l'écran projeté est le même. En C2, rien à imprimer : ces écrans n'ont pas de version papier. | hors papier |

Aucun pays supposé. Aucun fuseau, aucun férié, aucun format de téléphone.

## 8. Tests

- `animation-hors-coquille.test.js` lit `DashboardLayout.jsx`, `MenuApplication.jsx`, `IconeApplication.jsx` et `EmptyState.jsx`. Il échoue si l'un importe `motion/react` ou un fichier de `icones/`.
- Avant le code de `94413605`, puis après ce correctif : la même mesure que l'étude (construction du site, poids gzip et brotli du premier chargement, et le morceau `animation` sur l'écran d'appel). Les deux nombres vont dans la PR. Le script de mesure reste hors du dépôt, comme pour l'étude. La colonne brotli est celle du script : le serveur, lui, n'envoie que gzip.
- Un essai local de la config nginx : un client qui demande gzip reçoit `Content-Encoding: gzip` et `Vary: Accept-Encoding`. Un client qui ne demande que `br` ne reçoit pas de brotli. Pas de nouvel écran.

## 9. Étapes de livraison

1. Plan court, commité seul (`8124c4cf`). Lecture inversée des réponses, commitée (`133f63e5`), puis le code qui la suit (`94413605`).
2. Ce plan corrigé, commité seul, avant le code qui le suit.
3. Retirer brotli, garder gzip et `gzip_vary on`, passer l'état vide en CSS, élargir le test, corriger la ligne du module, mesurer, écrire la fiche. Rien n'est poussé.

## 10. Risques et retour arrière

`gzip_vary` ne change pas le corps de la réponse : il dit au cache de distinguer les encodages. Revenir au commit d'avant `94413605` rend la bibliothèque dans la coquille et retire `gzip_vary`. Les écrans reviennent à l'octet près : aucune donnée n'est migrée. La courbe CSS reprend les quatre nombres déjà écrits dans `EmptyState.jsx` ; un écart d'aspect se voit sur un état vide.

## 11. Hors périmètre

- M-9 (c), le plafond de l'application : choix du chef, après la nouvelle mesure.
- Compiler `ngx_brotli`, ou précompresser des fichiers `.br`.
- Le site vitrine et son nginx.
- Le relais `deploy/vps/nginx-hestim.conf`.
- Le lanceur : il garde l'agrandissement et les icônes animées.
- Les autres morceaux du tableau de l'étude (`classQuiz`, `browser`).
