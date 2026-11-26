# Neutralité des guides · `README.md` et `DEPLOIEMENT.md` — plan court

| | |
|---|---|
| Module | [QUA](../../plan/modules/QUA-qualite-docs.md) · correctif hors chantier, suite de Q-37 |
| Mission | `docs/plan/missions/fix-neutralite-docs.md` (branche `doc/coordination-2026-11-26-suite`, jusqu'à sa fusion) |
| Branche | `fix/neutralite-docs`, depuis `origin/main` (`9a428a7c`) |
| Rédigé par | agent de Cursor (Grok 4.7), le 26 novembre 2026 |
| **Validé** | en attente du coordinateur |

## 1. Objet et critère de « terminé »

Le guide de déploiement ne donne plus le nom de l'école pilote comme exemple à copier. Le README ne change pas : l'histoire du produit et le nom réel de la branche y restent (questions 1 et 2).

Terminé quand :

- `DEPLOIEMENT.md` ne contient plus « HESTIM » ni « hestim.ma » ;
- les exemples d'adresses Railway et Vercel, et `ETABLISSEMENT_NOM=hestim`, sont devenus les exemples neutres de la question 3 ;
- les noms techniques restent : `/opt/hestim`, conteneurs `hestim_*`, images `claude20022002/hestim-*`, volumes, `hestim-sauvegarde.*`, `hestim_planner`, `hestim-solver.jar` ;
- `README.md` n'est pas modifié (questions 1 et 2 retenues) ; les comptes `admin@hestim.ma` restent ;
- `node scripts/verifier-neutre.mjs` lit `DEPLOIEMENT.md` en entier, et échoue si « HESTIM » ou « hestim.ma » y revient ;
- la CI de la PR est verte, « Démarrage du README » compris.

Aucun serveur déjà en service n'est réécrit. `docker-compose.yml` ne bouge pas.

## 2. Ce qui existe

Lu sur `origin/main` (`9a428a7c`). Q-37 n'y est pas encore : `scripts/verifier-neutre.mjs` ne lit ni `backend/.env.example` ni `DEPLOIEMENT.md`.

`DEPLOIEMENT.md`, occurrences du motif `HESTIM` ou `hestim.ma` :

| Ligne | Aujourd'hui |
|---|---|
| 1 | titre « Guide de déploiement — HESTIM Planner » |
| 140 | « la base de HESTIM, qui avait déjà des comptes, est restée allumée » |
| 511 | `EMAIL_FROM="HESTIM Planner <votre-email@gmail.com>"` |
| 620 | `planner.hestim.ma` |
| 628 | `api.hestim.ma` |
| 687 | « Guide rédigé pour HESTIM Planner » (la ligne commence par `*`) |

La fiche listait les lignes 1, 511, 620, 628 et 687. La ligne 140 porte aussi « HESTIM » : sans elle, le critère « le fichier ne contient plus HESTIM » et le futur contrôle échouent. Elle entre dans ce plan.

Exemples en minuscules, hors motif (le script ne les voit pas) :

| Ligne | Aujourd'hui |
|---|---|
| 403 | `ETABLISSEMENT_NOM=hestim` |
| 529 et 555 | `https://hestim-backend.up.railway.app` |
| 564 et 571 | `https://hestim-planner.vercel.app` |

À ne pas confondre avec l'image `claude20022002/hestim-backend` (l. 154, 155, 157, 159, 169) : nom technique, il reste.

`README.md` :

| Lignes | Rôle |
|---|---|
| 12, 62, 64 | histoire du produit (QUA-01, #266) |
| 147 et 452 | branche réelle `hestim` du fork ClassQuiz |
| 250 et 289 | `admin@hestim.ma`, comptes créés par `seed.js`, rejoués par « Démarrage du README » |
| 190, 194, 269, 312 | `hestim_planner`, `hestim-solver.jar`, `hestim_test` : identifiants techniques |

`scripts/verifier-neutre.mjs:30` : motif `HESTIM`, `hestim.ma`, `Stendhal`, `Gandhi`. Le filtre des commentaires (`//`, `/*`, `*`, `{/*`) sert au code. Une ligne de `DEPLOIEMENT.md` qui commence par `*` (l. 687) serait ignorée si on réutilisait ce filtre.

## 3. Questions

Les quatre propositions de la fiche sont retenues. La question 1 attend le chef. Les trois autres attendent le coordinateur.

| N° | Question | Proposition retenue | Réponse | Bloque |
|---|---|---|---|---|
| 1 | Garder l'histoire du produit dans `README.md` (l. 12, 62, 64) ? | Oui. C'est l'histoire écrite par QUA-01, pas un exemple à copier. | en attente du chef | le README seulement |
| 2 | Garder la branche `hestim` du fork (l. 147 et 452) ? | Oui. C'est le nom réel, jusqu'à QJE-06. | en attente du coordinateur | non, si la proposition tient |
| 3 | Exemples Railway, Vercel, et `ETABLISSEMENT_NOM` ? | `https://planner-backend.up.railway.app`, `https://planner.vercel.app`, `ETABLISSEMENT_NOM=<nom-court-de-l-ecole>` | en attente du coordinateur | les cinq lignes |
| 4 | `verifier-neutre` lit-il `README.md` ? | Non. L'histoire et les comptes de démonstration y restent. Seul `DEPLOIEMENT.md` est ajouté. | en attente du coordinateur | le script |

Si le chef refuse la question 1, ce plan est repris avant toute ligne de `README.md`. Les remplacements de `DEPLOIEMENT.md` n'en dépendent pas.

Les domaines d'exemple suivent Q-37 : `planner.votre-ecole.example` et `api.votre-ecole.example`. `example` est réservé aux exemples. Aucun domaine réel de l'école pilote.

## 4. Solution

**(a)** Titre (l. 1) : `Guide de déploiement — Planner`. Pied (l. 687) : `Guide rédigé pour Planner — Mai 2026`. La date reste.

**(b)** Ligne 140 : « la base de l'école pilote, qui avait déjà des comptes, est restée allumée ». Le fait reste (une base déjà peuplée a gardé ClassQuiz allumé). Le nom propre part.

**(c)** Ligne 511, alignée sur Q-37 : `EMAIL_FROM="Planner <votre-email@example.com>"`. `SMTP_HOST` et `SMTP_USER` (`smtp.gmail.com`, `votre-email@gmail.com`) ne changent pas : ce n'est pas le nom de l'école, et Q-37 les a laissés.

**(d)** Lignes 620 et 628 : `planner.votre-ecole.example` et `api.votre-ecole.example`.

**(e)** Question 3 : les quatre URL Railway et Vercel, et `ETABLISSEMENT_NOM`. Le chemin `/opt/hestim/.env.docker` de la ligne 403 reste.

**(f)** `scripts/verifier-neutre.mjs` lit `DEPLOIEMENT.md` à part, après la lecture de `backend/.env.example` que Q-37 ajoute. Même motif. Tout le fichier est cherché : cette lecture n'utilise pas le filtre des commentaires du code, sinon la ligne 687 passerait. Remettre « HESTIM » ou « hestim.ma » fait échouer le script. Les noms techniques en minuscules passent, comme aujourd'hui.

Le motif ne voit pas `hestim-backend.up.railway.app` ni `ETABLISSEMENT_NOM=hestim`. Les élargir à `hestim-` prendrait aussi les images `hestim-*`, qui restent. Ces cinq lignes sont donc un remplacement de texte, pas une nouvelle règle du script. Le test de régression demandé porte sur « HESTIM » et « hestim.ma ».

`README.md` : aucune ligne.

## 5. Fichiers

| Fichier | Créé / modifié | Rôle |
|---|---|---|
| `docs/conception/qualite/fix-neutralite-docs.md` | créé | ce plan |
| `DEPLOIEMENT.md` | modifié | les onze lignes, après validation |
| `README.md` | non modifié | questions 1 et 2 retenues |
| `scripts/verifier-neutre.mjs` | modifié | lire `DEPLOIEMENT.md`, après la fusion de Q-37 |
| `docs/plan/modules/QUA-qualite-docs.md` | modifié | une ligne, à la fin du code |
| fiche de session | créé | à la fin de chaque étape |

Pas de `docs/plan/suivi.md`.

## 6. Données et migration

Aucune table. Aucun `.env` de serveur n'est dans le dépôt. Un serveur qui a déjà copié l'ancien exemple garde ses valeurs jusqu'à ce que l'exploitant les change.

## 7. Sécurité, isolation et exigences produit

Aucun canal d'isolation. Aucun droit. L'adresse d'envoi réelle reste celle du serveur. EP-13 : rien de nouveau ne part. EP-19 : aucun écran, le poids ne change pas.

## 7 bis. Ce que disent les études

| Ligne | Étude | Appliquée ou écartée | Comment, ou pourquoi |
|---|---|---|---|
| Règle du § 1, « aucun pays supposé » | [14](../../etude-marche/14-reprendre-et-depasser.md) | appliquée aux exemples copiés | le guide qu'une autre école suit ne nomme plus l'école pilote. L'histoire du README, elle, dit d'où le produit vient |
| M17 | même étude, § 3 | appliquée pour ces exemples | un domaine d'école écrit dans un guide à copier est du même ordre qu'un pays écrit dans le produit |
| § 4, point 4 | même étude | appliquée | les domaines d'exemple sont en `.example` |

Public : toute école qui suit le guide. Rien qui ne vaille que pour le supérieur.

`APP_TIMEZONE=Africa/Casablanca` (l. 85) documente le serveur déjà en service. La ligne 83 donne deux noms de la base des fuseaux (`Africa/Casablanca`, `Africa/Kinshasa`) pour dire qu'il n'y a plus de fuseau par défaut. Hors de ce correctif : ce n'est pas le nom de l'école, et changer la commande changerait la procédure du serveur en place.

## 7 ter. EP-18 : tous les contextes

| Contexte | Ce que fait la fonction | Preuve ou test |
|---|---|---|
| **A. Au moins un élève sans téléphone ni ordinateur** | Rien à l'écran. Le guide sert à l'exploitant. | le contrôle de neutralité |
| **B. Connexion lente ou coupée** | Aucun octet de plus à l'écran. Un serveur déjà réglé garde son `.env`. | hors transfert |
| **C. Ce qu'a l'école : ordinateur et projecteur (C1), ou rien dans la salle (C2)** | Rien à projeter ni à imprimer. | hors papier |

Aucun férié, aucun format de téléphone, aucune devise. Le fuseau du serveur en service n'est pas réécrit (voir § 7 bis).

## 8. Tests

- Avant le code : `node scripts/verifier-neutre.mjs` passe (sortie 0, 7 exceptions). Il ne lit pas `DEPLOIEMENT.md`, donc les lignes actuelles ne le font pas échouer.
- Après, une fois Q-37 fusionnée et `origin/main` repris : le script échoue si l'on remet l'ancien texte de la ligne 1, 140, 511, 620, 628 ou 687, et il passe avec les propositions. L'échec est montré avec une copie locale non commitée, puis retirée.
- `README.md` inchangé : le contrôle « Démarrage du README » rejoue les mêmes commandes et les mêmes comptes.
- Pas de nouveau fichier de test : le script est le test de régression, lancé par la CI du site.

## 9. Étapes de livraison

1. Ce plan, commité seul. Rapport dans la boîte du coordinateur. Aucun guide modifié, aucun script modifié.
2. Après validation, et seulement une fois Q-37 sur `origin/main` : `git merge origin/main`, puis les lignes de `DEPLOIEMENT.md`, la lecture du fichier, la ligne du module, la fiche. Montrer l'échec du script avec l'ancien texte. Rien n'est poussé.

Le script n'est pas touché avant cette fusion : Q-37 le modifie aussi.

## 10. Risques et retour arrière

Revenir au commit d'avant le code rend les lignes et retire la lecture du fichier. Aucune donnée n'est migrée. Le README ne change pas, donc l'installation rejouée par la CI non plus.

## 11. Hors périmètre

- `docker-compose.yml`, `deploy/`, et tout nom technique (EXP-07). Les images `hestim-backend` du guide restent.
- `README.md`, tant que les questions 1 et 2 tiennent. `hestim_test` (l. 312) reste avec `hestim_planner`.
- `backend/seed.js`, `backend/demo/`.
- `APP_TIMEZONE=Africa/Casablanca` (l. 85) et les deux exemples de fuseau (l. 83).
- `SMTP_USER` et `SMTP_HOST`.
- Élargir le motif du script aux noms en minuscules.
