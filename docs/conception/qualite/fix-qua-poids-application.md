# M-9 · Le poids du premier chargement — plan court

| | |
|---|---|
| Module | [QUA](../../plan/modules/QUA-qualite-docs.md) · correctif hors chantier (étude EP-18, M-9) |
| Mission | `docs/plan/missions/ep18-correctifs.md` (branche `doc/coordination-equipe`) |
| Branche | `fix/qua-poids-application`, depuis `origin/main` (`561fad19`) |
| Rédigé par | agent de Cursor (Grok 4.7), le 22 novembre 2026 |
| **Validé** | 25 nov. 2026, réponses dans la session : question 1 oui ; question 2, l'état vide garde la bibliothèque |

## 1. Objet et critère de « terminé »

Deux gains, sans changer ce qu'un écran affiche.

- **(a)** Le serveur web du site de l'application compresse aussi en brotli. Gzip reste pour un client qui ne l'accepte pas.
- **(b)** La bibliothèque d'animation n'est plus dans le chargement commun des écrans. Elle ne part qu'avec le lanceur d'applications, qui s'en sert.

Terminé quand le poids du premier chargement est mesuré avant et après, et que ces deux nombres sont écrits dans la PR (EP-19). Aucun écran ne change d'aspect. M-9 (c), le plafond, n'est pas dans ce correctif.

## 2. Ce qui existe

Mesure de l'étude, le 22 nov., au commit `b57753e9` : premier chargement 338,1 Ko en gzip, 280,5 Ko en brotli. Sur l'écran d'appel, le morceau `animation` (`framer-motion`) pèse 35,9 Ko en gzip, en plus du premier chargement.

| Endroit | Aujourd'hui |
|---|---|
| `frontend/nginx.conf:52-55` | `gzip on`, pour le html, le css, le js, le json, le xml et le svg, à partir de 1 024 octets. Pas de `gzip_vary`. Pas de brotli. |
| `frontend/Dockerfile:25` | l'image est `nginx:1.27-alpine`. Elle n'apporte pas le module brotli. Le reste du fichier copie `dist/` et `nginx.conf`. |
| `frontend/vite.config.js:21` et `:63` | `manualChunks` range `framer-motion` et `motion` dans le morceau `animation`. |
| La coquille | `DashboardLayout.jsx` importe `MenuApplication.jsx`, qui importe `IconeApplication.jsx`. Ce fichier importe en dur les icônes animées (`icones/`), et `CadreIcone.jsx` importe `motion/react`. Le menu appelle `<IconeApplication>` sans animation (`animee` reste faux). La bibliothèque part quand même avec chaque écran qui a la coquille. |
| Le lanceur | `Applications.jsx` est déjà en `import()`. `GrilleApplications.jsx` et `TuileApplication.jsx` importent `motion/react` pour le léger agrandissement (0,18 s) et les icônes animées. `mouvementReduit` laisse les icônes Lucide. |
| L'état vide | `design-system/components/EmptyState.jsx` importe `motion/react` pour une apparition (opacité et échelle, 0,18 s). Les pages qui l'importent chargent donc aussi le morceau, même une fois la coquille coupée. |
| Ailleurs | `vitrine/nginx/nginx.conf` compresse le site public, hors de ce correctif (EP-19). `deploy/vps/nginx-hestim.conf` est un relais : il ne compresse pas les fichiers de l'application. |

Parmi les dossiers de travail ouverts, seul `b/offres-stage` touche `DashboardLayout.jsx` (une ligne). Il ne touche ni `nginx.conf`, ni le `Dockerfile`, ni les icônes, ni `EmptyState.jsx`. Ce correctif n'écrit pas `DashboardLayout.jsx`.

## 3. Questions

| N° | Question | Proposition | Réponse | Bloque |
|---|---|---|---|---|
| 1 | L'image nginx n'a pas brotli. Compiler le module `ngx_brotli` dans `frontend/Dockerfile` est une dépendance du serveur. Est-ce accepté ? | Oui : le module est compilé dans cette image, pour la même version nginx. `frontend/nginx.conf` active brotli pour les mêmes types que gzip, garde gzip, et ajoute `gzip_vary on` (absent aujourd'hui) pour que le cache ne mélange pas les deux. Les fichiers à empreinte sont précompressés à la construction ; `index.html` l'est à la volée. La qualité reste le défaut du module : l'étude ne l'écrit pas, et les 17 % seront remesurés, pas repris comme cible. Si compiler un module doit remonter au chef, je n'écris pas le Dockerfile avant son accord. | oui, le 25 nov. | non |
| 2 | L'état vide garde-t-il la bibliothèque ? | Non. L'apparition déjà écrite (0,18 s, opacité, échelle) passe en CSS. La bibliothèque ne reste que sur le lanceur. Un écran qui n'a qu'un état vide ne la télécharge plus. L'aspect ne change pas. | oui, il la garde (`motion/react` reste dans `EmptyState.jsx`) | non |

## 4. Solution

Après l'accord.

**(a)** Brotli au serveur du site de l'application, gzip conservé. Un client qui envoie `br` reçoit du brotli. Les autres reçoivent gzip, comme aujourd'hui. Rien ne change pour le site vitrine ni pour le relais du VPS. Le module compilé est `ngx_brotli` au commit `53e0fb55` (22 oct. 2026, brotli 1.2.1), dans l'image `nginx:1.27-alpine`, pour la version nginx de cette image. La qualité précompressée est 6, le défaut du module (`ngx_conf_merge_value` de `brotli_comp_level`). `index.html` est du `text/html` : nginx le gzippe toujours, brotli le compresse aussi.

**(b)** `IconeApplication.jsx` ne charge plus que les icônes Lucide. `TuileApplication.jsx` charge les icônes animées, et seulement elle (avec `GrilleApplications.jsx`, qui a déjà `motion`). Le menu ne les importe plus. Question 2 : `EmptyState.jsx` garde `motion/react`. Un écran qui n'importe que la coquille ne télécharge plus la bibliothèque. Un écran qui importe l'état vide la télécharge encore. `vite.config.js` ne change pas : le morceau `animation` existe encore, il n'est simplement plus tiré par la coquille.

Aucun texte, aucun parcours, aucune durée déjà écrite ne change. `mouvementReduit` reste celui du lanceur.

## 5. Fichiers

| Fichier | Créé / modifié | Rôle |
|---|---|---|
| `docs/conception/qualite/fix-qua-poids-application.md` | créé | ce plan |
| `frontend/Dockerfile` | modifié | le module brotli, si la question 1 est oui |
| `frontend/nginx.conf` | modifié | brotli, gzip conservé, `gzip_vary on` |
| `frontend/src/components/applications/IconeApplication.jsx` | modifié | Lucide seul, plus d'import animé |
| `frontend/src/components/applications/TuileApplication.jsx` | modifié | les icônes animées, pour le lanceur |
| `frontend/src/design-system/components/EmptyState.jsx` | non modifié | la question 2 le laisse sur `motion/react` |
| `frontend/src/components/applications/animation-hors-coquille.test.js` | créé | la coquille n'importe plus `motion/react` |
| `docs/plan/modules/QUA-qualite-docs.md` | modifié | une ligne, à la fin du code |
| fiche de session | créé | à la fin du code |

Pas de `docs/plan/suivi.md`. Pas de `vitrine/nginx/nginx.conf`. Pas de `deploy/vps/nginx-hestim.conf`. Pas de `frontend/vite.config.js`. Pas de `DashboardLayout.jsx`.

## 6. Données et migration

Aucune table. Aucune clé de traduction.

## 7 ter. EP-18 : tous les contextes

| Contexte | Ce que fait la fonction | Preuve ou test |
|---|---|---|
| **A. Au moins un élève sans téléphone ni ordinateur** | Rien de nouveau à l'écran. Sur l'ordinateur de la salle, le même écran arrive plus vite. L'élève sans appareil regarde la projection, comme aujourd'hui. | la mesure avant / après |
| **B. Connexion lente ou coupée** | C'est le correctif. Brotli allège le premier chargement. La bibliothèque d'animation ne part plus avec chaque écran. Les fichiers à empreinte restent en cache un an (`nginx.conf`, `expires 1y`) : un appareil déjà chargé ne les reprend pas. Coupée, la page déjà en cache s'ouvre comme aujourd'hui. | la mesure ; le test d'import |
| **C. Ce qu'a l'école : ordinateur et projecteur (C1), ou rien dans la salle (C2)** | En C1, l'écran projeté est le même, moins lourd. En C2, rien à imprimer : ces écrans n'ont pas de version papier. | hors papier |

Aucun pays supposé. Aucun fuseau, aucun férié, aucun format de téléphone.

## 8. Tests

- `animation-hors-coquille.test.js` lit `DashboardLayout.jsx`, `MenuApplication.jsx` et `IconeApplication.jsx`. Il échoue si l'un importe `motion/react` ou un fichier de `icones/`. Il ne lit pas `EmptyState.jsx` : la question 2 le laisse sur `motion/react`.
- Avant le code, puis après : la même mesure que l'étude (construction du site, poids gzip et brotli du premier chargement, et le morceau `animation` sur l'écran d'appel). Les deux nombres vont dans la PR. Le script de mesure reste hors du dépôt, comme pour l'étude.
- Un essai local du conteneur : un client qui accepte `br` reçoit `Content-Encoding: br` ; un client qui n'accepte que gzip reçoit gzip. Pas de nouvel écran.

## 9. Étapes de livraison

1. Ce plan, commité seul. Fait (`8124c4cf`). Réponses du 25 nov. : question 1 oui ; question 2, l'état vide garde la bibliothèque.
2. Le serveur, la coupure de l'import dans la coquille, le test, la ligne du module, la fiche, et la mesure pour la PR. `EmptyState.jsx` ne change pas. Rien n'est poussé.

## 10. Risques et retour arrière

Un `Content-Encoding` faux rend le site illisible : l'essai du conteneur le voit avant la PR. Compiler le module allonge la construction de l'image. Revenir au commit d'avant rend le gzip seul et la bibliothèque dans la coquille. Les écrans reviennent à l'octet près : aucune donnée n'est migrée.

## 11. Hors périmètre

- M-9 (c), le plafond de l'application : choix du chef, après la nouvelle mesure.
- Le site vitrine et son nginx.
- Le relais `deploy/vps/nginx-hestim.conf`.
- Le lanceur : il garde l'agrandissement et les icônes animées.
- Les autres morceaux du tableau de l'étude (`classQuiz`, `browser`).
