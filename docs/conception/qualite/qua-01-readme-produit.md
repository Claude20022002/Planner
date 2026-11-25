# QUA-01 · `README.md` et `PRODUCT.md` à jour

**Statut** : plan écrit le 25 novembre 2026, pour le chef de projet. Le contenu suit dans la même
branche ; la PR attend sa relecture.

**Fonction** : QUA-01, [fiche du module](../../plan/modules/QUA-qualite-docs.md) — taille M, sans
dépendance, « libre » dans [le suivi](../../plan/suivi.md). Critère du module : « une personne
nouvelle installe le projet en local avec le seul `README.md` ».

**Branche** : `doc/qua-01-readme-produit`, depuis `origin/main` (`561fad19`). Aucun code applicatif,
aucune migration. Les deux fichiers corrigés sont `README.md` et `PRODUCT.md`, plus la preuve (§ 5).

## 1. Pourquoi maintenant

Le `README.md` est bon : 394 lignes, produit, architecture, commandes, tests, sécurité. C'est
`PRODUCT.md` qui est resté au projet PACTE d'origine, et il contredit aujourd'hui le produit. Le
README l'annonce lui-même, ligne 380 : « `PRODUCT.md` — Utilisateurs et principes du produit **(à
mettre à jour, QUA-01)** ».

| Affirmation de `PRODUCT.md` | Réalité sur `main` |
|---|---|
| « Platform : web » | Site React **et** application Expo (`mobile/`), construite par EAS |
| « HESTIM Planner est la plateforme … de HESTIM » | Produit **pour toute école** : identité en base, plusieurs écoles par installation (D-01, D-21) |
| « taillé pour la structure réelle de HESTIM : deux bâtiments (Gandhi, Stendhal) » | Décision du 4 novembre : **Planner ne connaît pas les bâtiments**. Les campus sont des données de l'école |
| « Logo officiel : `frontend/public/HESTIM.png` » | D-21 : logo en base, servi par `GET /etablissement/logo` ; aucun nom d'école dans le code (`verifier-neutre`) |
| « pas d'application mobile native (web responsive) » | `mobile/` (Expo SDK 57), application livrée aux étudiants |
| « forçage avec justification : côté API en cours d'implémentation » | Livré : `forcer` avec justification tracée, tests à l'appui |
| « FullCalendar 6 + Recharts », « exports … Excel / iCal » | À vérifier ligne par ligne avant de réécrire ; ce qui n'existe pas disparaît, ce qui existe est nommé |
| Utilisateurs : trois rôles, plus le jury | Quatre rôles dans le produit (administration, **responsable de filière**, enseignant, étudiant) |
| « Décisions ouvertes », « Jury PACTE » comme utilisateur | Le jury est le cadre d'origine, pas un utilisateur du produit |

Deux manques dans le README, pour le critère d'installation :

- la liste des variables **obligatoires** de `backend/.env` n'y est pas : « puis renseigner DB_* »
  laisse un nouveau venu buter sur `JWT_SECRET`, `CSRF_SECRET`, `APP_TIMEZONE`, `ALLOWED_ORIGINS` ;
- les commandes sont écrites en shell Unix (`cp`, `export`) alors que le poste type du projet est
  Windows PowerShell, avec `start.bat` mentionné sans exemple.

Et un chiffre faux dans les deux sens : « ≈ 330 tests » unitaires et « ≈ 550 tests, 58 fichiers »
d'intégration, alors que la suite complète du serveur compte 36 suites et 555 tests, le site 155
tests unitaires, l'application 19 suites et 87 tests. Un chiffre non mesuré se retire, il ne
s'invente pas.

## 2. Décisions à confirmer

| N° | Question | Proposition de ce plan |
|---|---|---|
| Q-35 | Comment prouver « une personne nouvelle installe le projet avec le seul README » ? | **Un job CI `demarrage-readme`** qui exécute littéralement le bloc « Installation et lancement » (MySQL jetable, `install:all`, `migrate`, `seed`, `build`) : la preuve est rejouée à chaque PR, pas une fois à la main. À défaut, une liste de contrôle jouée par le chef sur un poste vierge, consignée dans la fiche de session |
| Q-36 | `PRODUCT.md` garde-t-il son squelette `impeccable:product-schema 1` ? | **Oui** : mêmes sections (`Platform`, `Users`, `Product Purpose`, `Positioning`, `Operating Context`, `Capabilities and Constraints`, `Brand Commitments`, `Evidence on Hand`, `Product Principles`, `Accessibility & Inclusion`), contenu réécrit. L'outil `.impeccable/` lit ce fichier ; changer les titres le casserait |
| Q-37 | Le nom d'école de `backend/.env.example` (`EMAIL_FROM="HESTIM Planner <…>"`) | **Hors lot** : il est dans le périmètre d'un correctif de neutralité, pas de la documentation. À ouvrir séparément si le chef le veut |

## 3. Ce que le lot change dans `README.md`

| Endroit | Changement |
|---|---|
| « Démarrer en local » | un tableau des variables **obligatoires** de `.env` (base, `JWT_SECRET`, `CSRF_SECRET`, `APP_TIMEZONE`, `ALLOWED_ORIGINS`, `FRONTEND_URL`) et celles qui restent facultatives (solveur, SMTP, IA, StudyLib), avec ce qui se passe sans elles |
| Même section | la variante Windows PowerShell de chaque commande, à côté de la variante Unix, et `start.bat` / `start.sh` expliqués |
| Même section | l'application mobile : `cd mobile && npm install` puis `npx expo start`, renvoi vers `mobile/README.md` pour `EXPO_PUBLIC_API_URL` |
| » Tests » | les comptes mesurés le jour de la session, avec la commande qui les donne ; plus aucun chiffre sans mesure |
| » Tests » | la ligne « Ne lancez pas les parcours en même temps que l'intégration » reste ; on y ajoute que Docker n'est nécessaire que pour l'intégration et les parcours |
| » Documentation » | la mention « (à mettre à jour, QUA-01) » disparaît |
| Fin de « Démarrer en local » | une liste de contrôle en cinq points : le site répond, la connexion de démonstration passe, la base contient l'école fictive, le contrôle de neutralité est vert, `npm run build` réussit |

Ce qui ne change pas : le sommaire, les sections produit, l'architecture, le déploiement, la
sécurité, « Pour les agents IA ». Le README n'est pas réécrit, il est complété et corrigé.

## 4. Ce que le lot change dans `PRODUCT.md`

| Section | Contenu réécrit |
|---|---|
| `Platform` | web et application mobile (Expo), une seule installation pour plusieurs écoles |
| `Users` | les quatre rôles réels du produit, avec l'écran et le moment de la journée de chacun ; le jury PACTE sort de la liste et devient le cadre d'origine (une phrase dans `Evidence on Hand`) |
| `Product Purpose` | Planner, plateforme de gestion scolaire qui commence par l'emploi du temps, pour toute école ; le cahier des charges PACTE reste l'origine et la preuve, pas l'identité du produit |
| `Positioning` | face à Pronote, Hyperplanning, WebUntis et Celcat : génération par solveur, refus expliqués, mise en route sans consultant, une base par école |
| `Operating Context` | ce que l'école fournit : créneaux, campus, filières ou niveaux, format du document ; **Planner ne connaît ni les bâtiments ni les noms** (4 novembre) |
| `Capabilities and Constraints` | la pile réelle (Express, Sequelize, MySQL, Timefold, React, MUI, Expo) et les fonctions livrées, interrupteurs de fonctions compris ; ce qui est éteint est dit éteint |
| `Brand Commitments` | D-21 : nom, nom court, couleurs, logo et expéditeur en base, réglés par l'administration ; aucun nom d'école dans le code |
| `Evidence on Hand` | le seed de démonstration (`backend/seed.js` et `backend/demo/ecolePilote.js`), la vidéo, les maquettes, l'étude de marché ; « aucun client réel, aucune adoption à inventer » reste |
| `Product Principles` | les cinq principes, reformulés pour toute école : l'information qui change d'abord, prévenir plutôt que réparer, le bon écran pour le bon rôle, le document au format de l'école (et non « fidèle au planning HESTIM »), chaque parcours se démontre |
| `Accessibility & Inclusion` | WCAG 2.2 AA, français et anglais ; l'arabe reste annoncé comme non fait (UIX-04) |

## 5. Preuve du critère

1. **Les commandes existent.** Chaque commande citée est comparée au `package.json` concerné
   (`install:all`, `migrate`, `seed`, `dev`, `build`, `verifier:neutre`, `test:unit`, `test:parcours`)
   et à `start.bat` / `start.sh` : aucune commande inventée, aucune commande morte.
2. **Le parcours s'exécute.** Selon Q-35 : job CI `demarrage-readme`, ou liste de contrôle jouée par
   le chef. Sur ce poste, l'installation complète ne peut pas être rejouée : le démon Docker est
   arrêté et MySQL n'écoute pas — c'est écrit dans la fiche de session plutôt que masqué.
3. **La neutralité tient.** `node scripts/verifier-neutre.mjs` reste vert : `PRODUCT.md` et
   `README.md` parlent de l'école pilote comme d'un exemple, jamais comme d'une règle du produit.

## 6. Ce que le lot ne fait pas

- `DEPLOIEMENT.md`, `DESIGN.md`, `mobile/README.md` et l'index `docs/README.md` : chacun son lot.
- `backend/.env.example` (Q-37).
- Aucun chiffre d'adoption, aucun témoignage, aucun client : la règle du fichier reste.

## 7. Ordre des commits

1. ce plan seul ;
2. `PRODUCT.md` réécrit ;
3. `README.md` complété et corrigé ;
4. la preuve (job CI si Q-35 est acceptée, sinon la liste de contrôle) ;
5. fiche de session `docs/sessions/2026-11-25-doc-qua-01.md`.

Puis la PR, pour la relecture du chef.
