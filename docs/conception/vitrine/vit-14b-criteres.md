# VIT-14b · Comparatif : deux critères de plus, d'après l'expertise (C4)

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) · complément de VIT-14 |
| Plan de départ | [vit-14-comparatif.md](vit-14-comparatif.md) (validé le 18 nov., branche `feat/vit-14-comparatif`, #224). Ses règles (§ 2) et ses abréviations d'appui (§ 4) valent ici |
| Origine | [expertise du site](../../etude-marche/12-expertise-site-vitrine.md), § 13, C4 ; consigne du coordinateur du 19 nov. |
| Branche | `feat/vit-14b-criteres`, depuis `origin/main` à `d27e30ee` ; le code après la fusion de #224 |
| Rédigé par | Claude Code (Opus 5.5), le 19 novembre 2026 |
| Validé | **à valider par le chef, case par case** (§ 3 et § 4) |

## 1. Ce que le chef a choisi (outil de questions, 19 nov.)

| N° | Question | Réponse du chef |
|---|---|---|
| 1 | « Le bilan de chaque règle après le calcul » | **pas de ligne pour l'instant** : le bilan est calculé (`backend/services/moteur/contraintes/bilan.js`, appelé par `generation.js` l. 93) mais aucun écran ne l'affiche, et l'école ne déclare pas encore ses règles (MOT-13c, avec ADM-02). La ligne s'ajoutera avec l'écran |
| 2 | Les nouveaux critères sur l'accueil | **non** : `/comparer/` seulement ; l'accueil garde ses cinq lignes |
| 3 | « six critères » dans l'accroche | **mettre le nouveau nombre** : huit |
| 4 | Libellé de l'appel protégé | **« Un appel qu'on ne peut pas tromper »** |

Le tableau passe de sept à **neuf lignes** : huit critères, puis « Notes, frais et familles ».

## 2. Où vont les deux lignes

| Ligne | Place | Clé |
|---|---|---|
| Un appel qu'on ne peut pas tromper | après « L'appel » | `appelProtege` |
| Les semaines déjà consultées, lisibles sans réseau | après « Sans téléphone de l'élève » | `sansReseau` |

## 3. Critère · Un appel qu'on ne peut pas tromper

| Colonne | Mot | Texte | Source ou appui |
|---|---|---|---|
| Planner | Oui | Le scan passe par l'application Planner. Un compte est lié à un téléphone, et un téléphone ne pointe qu'un étudiant par séance. Le code change toutes les 30 secondes. Si l'enseignant le veut, une vérification surprise appelle quelques présents au hasard. | `backend/services/presences/appel.js` : commentaire l. 10 à 24 ; `scannerCode` l. 259 et 261 (sans l'application, refus) ; l. 225 (un téléphone, un étudiant par séance) ; l. 232 à 244 (un compte, un téléphone) ; `tirerVerification` l. 174 et `verifierEtudiant` l. 193 (vérification surprise) ; `FENETRE_MS` (30 secondes) ; `backend/services/presences/appareil.js` |
| Tableur et messagerie | À l'œil | La présence repose sur l'enseignant, qui voit qui est dans la salle. | [Problèmes] l. 46 (registre d'appel) |
| ERP généraliste | Selon l'outil | Selon l'outil, une présence avancée, parfois biométrique, existe, souvent dans une édition supérieure. | [07] l. 61 |
| Plateforme de cours seule | Hors de son rôle | Une connexion montre qu'un compte s'est ouvert, pas qu'un élève est dans la salle. | **à confirmer** (absente des études) |
| Logiciel de vie scolaire | Notée par un adulte | L'enseignant ou la vie scolaire note l'absence : la présence repose sur leur relevé. | [01] l. 11 ; [Outils] l. 87 |

La phrase de la case Planner ne dit pas que l'appel à la main est protégé de la même façon : il repose, lui aussi, sur l'œil de l'enseignant. L'appel à la main reste cité par la ligne « L'appel ».

## 4. Critère · Les semaines déjà consultées, lisibles sans réseau

| Colonne | Mot | Texte | Source ou appui |
|---|---|---|---|
| Planner | Dans l'application | Dans l'application, le tableau du jour et les semaines déjà consultés restent lisibles sans réseau, avec l'heure de leur dernière mise à jour. Ils sont effacés à la déconnexion. L'application entièrement utilisable sans connexion est en préparation. | `mobile/src/cache.js` ; `mobile/src/app/(onglets)/semaine.jsx` l. 40 à 50 (`lirePeriode`) et l. 157 et 158 (heure affichée) ; `mobile/src/app/(onglets)/index.jsx` l. 32 à 41 et l. 110 ; `mobile/src/auth/AuthContext.jsx` l. 25 et 32 (`viderCache`) ; MOB-06 à faire (`docs/plan/suivi.md`) |
| Tableur et messagerie | Sur papier | Une grille imprimée se lit partout, sans réseau. Elle ne suit pas les changements faits après l'impression. | [Logistique] l. 29 (les changements après publication) |
| ERP généraliste | Selon l'outil | Selon l'outil, une application mobile garde des données sans réseau. Le travail du secrétariat demande une connexion. | [Failles] l. 25 |
| Plateforme de cours seule | Les cours téléchargés | Certaines plateformes laissent télécharger des cours pour les suivre sans réseau. L'emploi du temps n'y est pas. | [Failles] l. 25 (cours enregistrés à télécharger, chez un éditeur) · **à confirmer** pour les plateformes de cours en général |
| Logiciel de vie scolaire | Selon l'outil | Quelques éditeurs annoncent une saisie sans réseau. | [Outils] l. 230 |

**[Failles]** : [rapport « Failles des ERP scolaires »](<../../etude-marche/reports/Failles des ERP scolaires.md>). Les autres abréviations sont celles du plan de départ.

**EP-18** : la case Planner dit ce qui existe (la lecture de ce qui a déjà été consulté) et marque le reste « en préparation ». Elle ne promet pas l'application hors ligne (MOB-06).

## 5. Textes qui changent

| Clé | Avant | Après |
|---|---|---|
| `comparer.json` · `entete.accroche` et `meta.description` | Quatre approches courantes, six critères, et ce que Planner n'a pas encore. Aucun produit n'est visé. | Quatre approches courantes, huit critères, et ce que Planner n'a pas encore. Aucun produit n'est visé. |

L'anglais suit (« eight criteria ») ; il est montré dans la PR. L'arabe garde ses clés vides.

## 6. Code et vérifications

- `vitrine/src/components/comparer/comparatif.js` : les deux clés dans `LIGNES`, à leur place (§ 2) ; leurs sources dans `SOURCES` ; `LIGNES_ACCUEIL` inchangé.
- `vitrine/src/i18n/{fr,en,ar}/comparer.json` : les deux lignes et l'accroche.
- `vitrine/tests/comparer.test.js` : neuf lignes ; « 30 » permis dans les deux cases Planner qui parlent du QR code ; l'accueil inchangé ; les textes français présents mot pour mot dans ce complément ou dans le plan de départ.
- La date de la méthode (`DATE`) passe au jour de la validation de ce complément : les deux cases nouvelles sont vérifiées à cette date.
- Build, tests, `verifier-neutre.mjs`, axe-core en 390, 768 et 1440 px.
