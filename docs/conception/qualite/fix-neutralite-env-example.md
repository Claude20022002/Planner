# Q-37 · Neutralité de `backend/.env.example` — plan court

| | |
|---|---|
| Module | [QUA](../../plan/modules/QUA-qualite-docs.md) · correctif hors chantier, suite de QUA-01 |
| Mission | `docs/plan/missions/fix-neutralite-env-example.md` (branche `doc/coordination-2026-11-26-suite`, jusqu'à sa fusion) |
| Branche | `fix/neutralite-env-example`, depuis `origin/main` (`0ecc0b06`) |
| Rédigé par | agent de Cursor (Grok 4.7), le 26 novembre 2026 |
| **Validé** | en attente du coordinateur |

## 1. Objet et critère de « terminé »

Le fichier d'exemple que chaque école copie ne nomme plus l'école pilote. Deux lignes, et le contrôle qui les fige.

Terminé quand :

- `backend/.env.example` ne contient plus « HESTIM » ni « hestim.ma » ;
- `DB_NAME=hestim_planner` et `hestim-solver.jar` restent : identifiants techniques en minuscules, ils ne s'affichent pas ;
- `node scripts/verifier-neutre.mjs` lit ce fichier, commentaires `#` compris, et échoue si « HESTIM Planner » y revient ;
- la CI de la PR est verte.

Aucun écran, aucun courriel envoyé, aucune valeur déjà réglée sur un serveur ne change.

## 2. Ce qui existe

Lu sur `origin/main` (`0ecc0b06`).

| Endroit | Aujourd'hui |
|---|---|
| `backend/.env.example:67` | `EMAIL_FROM="HESTIM Planner <votre-email@gmail.com>"` |
| `backend/.env.example:18` | commentaire `# … (ex: https://planner.hestim.ma)` |
| `backend/.env.example:2` | `DB_NAME=hestim_planner` — ne correspond pas au motif du contrôle |
| `backend/.env.example:97` | commentaire `hestim-solver.jar` — ne correspond pas non plus |
| `scripts/verifier-neutre.mjs:30` | motif `HESTIM`, `hestim.ma`, `Stendhal`, `Gandhi` |
| `scripts/verifier-neutre.mjs:22-24` et `:43-44` | lit le code (`.js`, `.jsx`, `.mjs`, `.cjs`), deux pages, la vitrine. Ignore les commentaires `//`, `/*`, `*` et `{/*`. Ne lit pas `.env.example`. Une ligne `#` n'est pas un commentaire pour lui |
| `backend/utils/sendEmail.js:38-42` et `:91` | l'adresse vient de `EMAIL_FROM` ; le nom affiché vient de l'identité de l'école (`expediteur_nom`, sinon le nom du produit) |

Le commentaire des lignes 63 à 65 et la ligne 73 expliquent le mot de passe d'application Gmail. `SMTP_USER` (l. 72) reste `votre-email@gmail.com`. Ce n'est pas le nom de l'école.

## 3. Questions

Les deux propositions de la fiche sont retenues dans ce plan. Le coordinateur valide ou corrige.

| N° | Question | Proposition retenue | Réponse | Bloque |
|---|---|---|---|---|
| 1 | Quelle adresse dans l'exemple ? | `EMAIL_FROM="Planner <votre-email@example.com>"`. Le commentaire du mot de passe d'application Gmail (l. 65 et l. 73) et `SMTP_USER` ne changent pas. | en attente du coordinateur | oui |
| 2 | Le commentaire de la l. 18 ? | `(ex: https://planner.votre-ecole.example)` | en attente du coordinateur | oui |
| 3 | Les lignes `#` de ce fichier sont-elles cherchées ? | Oui. Le fichier est copié tel quel. Le contrôle ne les ignore pas. | en attente du coordinateur | oui |

`example` et `example.com` sont les noms réservés aux exemples. Aucun domaine réel.

## 4. Solution

**(a)** Ligne 67 : le nom affiché de l'exemple devient `Planner`, l'adresse `votre-email@example.com`. Le nom qu'un destinataire voit reste celui de l'école (`sendEmail.js`, l. 91). L'exemple ne montre qu'une adresse d'envoi neutre.

**(b)** Ligne 18 : l'exemple d'origine autorisée devient `https://planner.votre-ecole.example`. La valeur `ALLOWED_ORIGINS` (l. 19) ne change pas : ce sont les adresses locales.

**(c)** `scripts/verifier-neutre.mjs` lit `backend/.env.example` à part. Même motif. Les lignes qui commencent par `#` sont cherchées : cette lecture n'utilise pas le filtre des commentaires du code. Remettre `HESTIM Planner` ou `hestim.ma` fait échouer le script. `hestim_planner` et `hestim-solver.jar` passent, comme aujourd'hui pour le reste du dépôt.

## 5. Fichiers

| Fichier | Créé / modifié | Rôle |
|---|---|---|
| `docs/conception/qualite/fix-neutralite-env-example.md` | créé | ce plan |
| `backend/.env.example` | modifié | les deux lignes, après validation |
| `scripts/verifier-neutre.mjs` | modifié | lire ce fichier, commentaires `#` compris |
| `docs/plan/modules/QUA-qualite-docs.md` | modifié | une ligne, à la fin du code |
| fiche de session | créé | à la fin de chaque étape |

Pas de `docs/plan/suivi.md`.

## 6. Données et migration

Aucune table. Aucune clé de traduction. Le `.env` d'un serveur déjà rempli n'est pas dans le dépôt : ce correctif ne le réécrit pas.

## 7. Sécurité, isolation et exigences produit

Aucun canal d'isolation. Aucun droit. L'adresse d'envoi reste celle du serveur (SPF, DKIM), comme le dit déjà `sendEmail.js`. EP-13 : rien de nouveau ne part. EP-19 : aucun écran, le poids ne change pas.

## 7 bis. Ce que disent les études

| Ligne | Étude | Appliquée ou écartée | Comment, ou pourquoi |
|---|---|---|---|
| Règle du § 1, « aucun pays supposé » | [14](../../etude-marche/14-reprendre-et-depasser.md) | appliquée | l'exemple copié par chaque école ne nomme ni l'école pilote ni son domaine |
| M17 | même étude, § 3 | appliquée pour ce fichier | un nom d'école écrit dans l'exemple est du même ordre qu'un pays écrit dans le produit. Les connecteurs et la devise (PLA-13, ETA-03) restent hors de ce correctif |
| § 4, point 4 | même étude | appliquée | l'exemple ne suppose pas un pays |

Public : toute école qui copie le fichier. Rien qui ne vaille que pour le supérieur.

## 7 ter. EP-18 : tous les contextes

| Contexte | Ce que fait la fonction | Preuve ou test |
|---|---|---|
| **A. Au moins un élève sans téléphone ni ordinateur** | Rien à l'écran. Le fichier sert à l'exploitant, pas à l'élève. | le contrôle de neutralité |
| **B. Connexion lente ou coupée** | Aucun octet de plus à l'écran. Un serveur déjà réglé garde son `.env`. | hors transfert |
| **C. Ce qu'a l'école : ordinateur et projecteur (C1), ou rien dans la salle (C2)** | Rien à projeter ni à imprimer. | hors papier |

Aucun pays, aucun fuseau, aucun férié, aucun format de téléphone.

## 8. Tests

- Avant le code : `node scripts/verifier-neutre.mjs` passe, et il ne lit pas `.env.example`.
- Après : le même script échoue si la ligne 67 ou le commentaire de la ligne 18 reprend l'ancien texte, et il passe avec les deux propositions.
- Pas de nouveau fichier de test : le script est le test de régression, lancé par la CI du site.

## 9. Étapes de livraison

1. Ce plan, commité seul. Rapport dans la boîte du coordinateur. Aucun code.
2. Après validation : les deux lignes, le contrôle, la ligne du module, la fiche. `node scripts/verifier-neutre.mjs`. Rien n'est poussé.

## 10. Risques et retour arrière

Revenir au commit d'avant le code rend les deux lignes et retire la lecture du fichier. Aucune donnée n'est migrée. Un serveur qui a déjà copié l'ancien exemple garde l'ancien expéditeur jusqu'à ce que l'exploitant le change : ce dépôt ne contient pas son `.env`.

## 11. Hors périmètre

- `README.md`, `docker-compose.yml`, `DEPLOIEMENT.md`. Ils nomment aussi l'école pilote. Signalés, non corrigés :
  - `README.md` : l. 12, 62 et 64 (le produit) ; l. 250 et 289 (`admin@hestim.ma`, comptes de démonstration).
  - `docker-compose.yml` : l. 2 (titre), l. 377 à 379 (webhook), l. 413 (`VITE_CUSTOM_OAUTH_NAME`). Des noms techniques (réseau, images, conteneurs) portent le même mot en minuscules.
  - `DEPLOIEMENT.md` : l. 1 (titre), l. 140, l. 511 (le même `EMAIL_FROM`), l. 620 (`planner.hestim.ma`), l. 628 (`api.hestim.ma`), l. 687.
- `SMTP_USER`, les commentaires Gmail, `DB_NAME`, `hestim-solver.jar`.
- QUA-11 (`deploy/`) et le reste de QUA-01.
