# VIT-14 · « Pourquoi Planner » : un comparatif par approche, sur l'accueil et sur `/comparer/`

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) · condition 10 de la mise en ligne |
| Fonction | VIT-14, taille M ([fiche de mission](../../plan/missions/vit-14-comparatif.md), sur la branche de coordination) |
| Branche | `feat/vit-14-comparatif`, depuis `origin/main` à `427afdea` ; le code après la fusion de #216 (VIT-08) |
| Rédigé par | Claude Code (Opus 5.5), le 18 novembre 2026 |
| Validé | **à valider par le chef, case par case** (§ 4) |

## 1. Ce que le chef a choisi (outil de questions, 18 nov.)

| N° | Question | Réponse du chef |
|---|---|---|
| 1 | Approches comparées | les quatre de la fiche : **tableur et messagerie**, **ERP généraliste**, **plateforme de cours seule**, **logiciel de vie scolaire** |
| 2 | Critères | **six critères, seulement ce qui existe** dans Planner (pas de ligne « Bientôt » pour le hors ligne, la liste des envois ou la plateforme nationale) |
| 3 | Ce que les autres couvrent et que Planner n'a pas | **une ligne en plus**, « Notes, frais et familles », marquée « Bientôt » pour Planner |
| 4 | L'accueil | **tableau court** : quatre critères (1, 2, 4 et 6) et un mot par case, puis « Voir le comparatif complet » |
| 5 | Case Planner « Sans téléphone de l'élève » sur l'accueil | **« En grande partie »** (réponse donnée après une correction de l'agent : seul le terminal Linux se joue au tableau, voir § 4, critère 6) |
| 6 | Ton des cases des approches | **dire aussi ce que chaque approche fait bien**, quand c'est vrai ; aucun mot négatif, aucun chiffre |
| 7 | Méthode | **un court encadré** sur `/comparer/`, sans lien vers le code (§ 3) |
| 8 | Place de la section sur l'accueil | **avant « Bientôt »**, après les sections qui montrent les fonctions |

Lecture des réponses 2 et 3 : six critères qui existent, plus une seule ligne « Bientôt » qui dit ce que les autres font et que Planner n'a pas. Le tableau a donc **sept lignes**. Le hors ligne n'est ni promis ni cité côté Planner (EP-18, MOB-06 non faite).

## 2. Règles tenues

- **Aucun produit nommé**, ni dans le site ni dans les textes : pas de marque de tableur, de messagerie, d'ERP, de plateforme de cours ni de plateforme d'État. Le test les cherche (§ 6).
- **Aucun prix, aucun coût estimé, aucun chiffre inventé.** Le seul nombre de la page est « 30 secondes » (le QR code de l'appel), déjà publié par VIT-08 et tiré de `backend/services/presences/appel.js` (`FENETRE_MS`).
- **Chaque case Planner a sa source dans le code** (§ 4, colonne « Source »). Le test vérifie que chaque chemin existe.
- **Chaque case d'approche décrit une pratique courante**, avec ses forces quand elles sont vraies, appuyée sur une étude déjà faite. Les études servent à vérifier, pas à nommer. Une case dont l'appui est faible porte la marque **« à confirmer »** : le chef la garde, la change ou la retire.
- **Aucun pays supposé** : « la plateforme de l'État », jamais un nom de plateforme.
- **EP-18** : le comparatif ne parle pas de fonctionnement hors ligne pour Planner. Le papier, oui : l'emploi du temps s'imprime en PDF.

## 3. Textes de cadre

| Où | Texte proposé |
|---|---|
| Accueil, surtitre | Pourquoi Planner |
| Accueil, titre | Ce que Planner change. |
| Accueil, texte | Quatre façons courantes d'organiser un établissement, et ce que Planner fait de plus. |
| Accueil, lien | Voir le comparatif complet |
| `/comparer/`, titre de l'onglet | Comparer · Planner |
| `/comparer/`, surtitre | Comparer |
| `/comparer/`, titre | Planner et les autres façons de faire. |
| `/comparer/`, accroche | Quatre approches courantes, six critères, et ce que Planner n'a pas encore. Aucun produit n'est visé. |
| `/comparer/`, encadré « Méthode » (réponse 7) | Établi le [date]. Chaque case Planner décrit ce que fait l'application à cette date. Les autres colonnes décrivent des pratiques courantes, sans viser un produit. Ce qui manque à Planner est marqué « Bientôt ». |
| Pied de page, colonne « Ressources » | Comparer |

La date de l'encadré est celle de la validation de ce plan par le chef. Elle est écrite une fois dans `comparer.json` et change quand les sources sont revérifiées.

Les en-têtes de colonnes : **Planner** · **Tableur et messagerie** · **ERP généraliste** · **Plateforme de cours seule** · **Logiciel de vie scolaire**.

## 4. Le tableau, case par case

Chaque case a un **mot** (montré sur l'accueil et en tête de case sur `/comparer/`) et un **texte** (montré sur `/comparer/`). Les lignes marquées « Accueil » sont celles du tableau court (réponse 4, plus la ligne 7 : voir § 4 bis).

Abréviations des appuis : **[01]** [01-concurrents.md](../../etude-marche/01-concurrents.md) ; **[07]** [07-comparatif-odoo.md](../../etude-marche/07-comparatif-odoo.md) ; **[Outils]** [rapport « Outils scolaires et besoins par pays »](<../../etude-marche/reports/Outils scolaires et besoins par pays.md>) ; **[Problèmes]** [rapport « Problèmes des établissements scolaires »](<../../etude-marche/reports/Problèmes des établissements scolaires.md>) ; **[Logistique]** et **[Numérique]** les notes de recherche `logistique_planification.md` et `numerique_adoption.md` du même rapport. Les numéros sont ceux des lignes lues le 18 nov. (fichiers identiques sur `origin/main` à `427afdea`).

### Critère 1 · L'emploi du temps calculé selon vos règles · Accueil

| Colonne | Mot | Texte | Source ou appui |
|---|---|---|---|
| Planner | Oui | Planner place les séances en tenant ensemble les salles, les enseignants, les groupes, les disponibilités et les trajets entre campus. Les règles strictes sont toujours tenues, les règles souples autant que possible. | `backend/services/generation/timefold/generation.js` ; `solver/src/main/java/ma/hestim/solver/contraintes/ContraintesEmploiDuTemps.java` (règles strictes) et `PreferencesEmploiDuTemps.java` (règles souples). Phrases déjà publiées sur la page Emploi du temps (VIT-07) |
| Tableur et messagerie | À la main | La grille se construit à la main, souvent par une seule personne. Le tableur est souple et tout le monde le connaît. | [Logistique] l. 19 (emploi du temps fait sous tableur) ; [Outils] l. 5 |
| ERP généraliste | Selon l'outil | L'emploi du temps est un module parmi d'autres : selon l'outil, il se saisit ou se génère. En échange, l'ERP couvre toute la gestion de l'établissement. | [07] l. 25 et 35 ; [01] l. 12 |
| Plateforme de cours seule | Hors de son rôle | La plateforme organise les cours en ligne. L'emploi du temps vient d'un autre outil. | [07] l. 78 (cours, vidéo, suivi de progression) |
| Logiciel de vie scolaire | Le plus souvent saisi | Ces logiciels se concentrent sur les élèves, les absences, les notes et les familles. L'emploi du temps y est le plus souvent saisi. | [01] l. 11 (« emploi du temps secondaire ») |

### Critère 2 · La raison de chaque refus · Accueil

| Colonne | Mot | Texte | Source ou appui |
|---|---|---|---|
| Planner | Oui | Quand une séance ne trouve pas sa place, Planner nomme la règle qui la bloque. Vous corrigez la donnée ou vous assouplissez la règle, puis vous relancez le calcul. | `backend/services/generation/timefold/probleme.js` (raisons d'exclusion : sans enseignant, sans groupe…) ; `deploiement.js` l. 131 (raisons des dates sautées) ; `avertissements.js` (indisponibilités) ; `backend/services/planning/seances.js` (`ViolationsBloquantes` : un déplacement refusé nomme sa règle) ; `backend/services/moteur/contraintes/bilan.js`. Phrase déjà publiée (page Emploi du temps) |
| Tableur et messagerie | À chercher soi-même | Le tableur ne signale pas les conflits : on les trouve en relisant la grille. | [Logistique] l. 19 |
| ERP généraliste | Selon l'outil | Selon l'outil, une double réservation de salle ou d'enseignant est signalée à la saisie. | [07] l. 35 ; [01] l. 28 (contrôles annoncés par un éditeur, non revérifiés) |
| Plateforme de cours seule | Hors de son rôle | Sans emploi du temps, la question ne se pose pas. | suit du critère 1 |
| Logiciel de vie scolaire | Selon l'outil | Quand l'outil tient l'emploi du temps, il contrôle en général les conflits à la saisie. | [02-arguments-marketing.md](../../etude-marche/02-arguments-marketing.md) § 4 (saisie avec contrôle des conflits chez un éditeur) · **à confirmer** (un seul exemple) |

### Critère 3 · Le report de séance, suivi de bout en bout

| Colonne | Mot | Texte | Source ou appui |
|---|---|---|---|
| Planner | Oui | L'enseignant demande, la scolarité valide, les étudiants concernés sont prévenus, et l'emploi du temps est à jour pour tous. | `backend/controllers/demandeReportController.js` ; `backend/services/planning/reports.js` ; `reportDecision.js` (`notifierNouvelleDemande`) ; `seances.js` (`notifierChangementSeance` : publie la séance et prévient l'enseignant et les groupes). Phrases déjà publiées (accueil, section Report) |
| Tableur et messagerie | Par message | Le changement part dans un groupe de messagerie, et la grille se corrige à part. C'est rapide : chacun a déjà la messagerie sur son téléphone. | [Numérique] l. 65 et 76 ; [Outils] l. 5 |
| ERP généraliste | Selon l'outil | La séance se modifie dans le module. La façon de prévenir les élèves dépend de l'outil et de son réglage. | [07] l. 47 (publication de l'emploi du temps) · **à confirmer** (le circuit demande-validation n'est décrit dans aucune étude) |
| Plateforme de cours seule | Par annonce | Une annonce du cours prévient les inscrits. L'emploi du temps, lui, se tient ailleurs. | **à confirmer** (pratique connue, absente des études) |
| Logiciel de vie scolaire | Selon l'outil | Ces logiciels savent prévenir les familles, par une application ou des notifications. Le circuit de demande et de validation dépend de l'outil. | [01] l. 11 et 39 |

### Critère 4 · L'appel · Accueil

| Colonne | Mot | Texte | Source ou appui |
|---|---|---|---|
| Planner | QR code ou à la main | Un QR code projeté, qui change toutes les 30 secondes. Ou l'appel à la main : présent, en retard, absent. | `backend/services/presences/appel.js` (`FENETRE_MS`) ; `backend/services/presences/statuts.js` (`STATUTS_APPEL`) ; `frontend/src/pages/Appel.jsx` et `frontend/src/components/appel/LigneAppel.jsx` ; `mobile/src/app/scanner.jsx`. Phrases déjà publiées (VIT-08, FAQ 7 de VIT-11) |
| Tableur et messagerie | Sur papier | Un registre ou une feuille d'appel, recopiés ensuite dans un tableur ou dans la plateforme de l'État. Le papier marche partout. | [Problèmes] l. 5 et 46 |
| ERP généraliste | Oui | Les feuilles de présence et leurs statistiques font en général partie de l'ERP. | [07] l. 61 |
| Plateforme de cours seule | Selon l'outil | La présence en ligne se suit par la connexion. L'appel en salle dépend de l'outil. | **à confirmer** (absente des études) |
| Logiciel de vie scolaire | Oui | Les absences sont au cœur de ces logiciels, souvent avec un envoi aux familles. | [01] l. 11 |

### Critère 5 · L'appel, les quiz, les jeux et la Bibliothèque, avec un seul compte

| Colonne | Mot | Texte | Source ou appui |
|---|---|---|---|
| Planner | Oui | L'appel, les quiz, les jeux, l'espace de cours et la Bibliothèque s'ouvrent avec le même compte. | `frontend/src/i18n/applications.fr.js` (les sept applications) ; `backend/services/cours/studylib.js` (le jeton de la personne connectée est transmis à la Bibliothèque) ; `frontend/src/pages/jeux/SessionJeu.jsx` ; `shared/quiz/studio/direct.js`. Phrase déjà dite par VIT-08 (« Sept applications pour votre école. Un seul compte. ») |
| Tableur et messagerie | Un outil par usage | Chaque usage a son outil et son compte. Chacun est simple, et beaucoup sont gratuits. | [Outils] l. 5 |
| ERP généraliste | En partie | Gestion et cours partagent le compte quand l'ERP a son module de cours. Les jeux pour réviser y sont rares. | [07] l. 78 et 79 |
| Plateforme de cours seule | En partie | Les cours, les quiz et les ressources partagent un compte. L'emploi du temps et l'appel en salle sont ailleurs. | [07] l. 78 |
| Logiciel de vie scolaire | En partie | Les absences, les notes et les familles partagent un compte. Les cours et les quiz passent souvent par une autre plateforme. | [01] l. 11 · **à confirmer** (« autre plateforme » déduit de l'absence de cours dans la liste) |

### Critère 6 · Sans téléphone de l'élève, avec ce qu'a l'école · Accueil

| Colonne | Mot | Texte | Source ou appui |
|---|---|---|---|
| Planner | En grande partie | L'appel se fait à la main. Le terminal Linux se joue au tableau : l'enseignant tape la commande que la classe propose. L'emploi du temps s'imprime en PDF ou s'ouvre dans un navigateur, comme la Bibliothèque. Le quiz et les simulations demandent un appareil par élève : un téléphone ou un poste de l'école. | `frontend/src/pages/Appel.jsx` ; `backend/services/jeux/sessions.js` (`jouerCommande` accepte le texte tapé par l'enseignant) et `shared/jeux/catalogue.js` l. 17 (seul jeu en mode collectif) ; `frontend/src/components/emploi-du-temps/TimetableExportMenu.jsx` (PDF) ; `frontend/src/App.jsx` (`/emploi-du-temps/etudiant`) ; `frontend/src/components/layouts/navigation.jsx` (`/biblio/documents`) ; `shared/quiz/studio/direct.js` |
| Tableur et messagerie | Oui | Le papier et le tableau ne demandent rien aux élèves. La messagerie, elle, suppose un téléphone chez l'élève ou chez ses parents. | [Problèmes] l. 5 ; [Numérique] l. 65 |
| ERP généraliste | Pour le personnel | Le personnel travaille sur ordinateur. Les élèves et les familles passent par un portail ou une application. | [01] l. 39 · **à confirmer** |
| Plateforme de cours seule | Un appareil par élève | La plateforme suppose que chaque élève ait un appareil et une connexion. | [07] l. 78 (cours en ligne) |
| Logiciel de vie scolaire | Pour le personnel | Le personnel saisit sur ordinateur. Les familles suivent par une application ou un portail. | [01] l. 11 et 39 |

### Ligne 7 · Notes, frais et familles (réponse 3) · Accueil

| Colonne | Mot | Texte | Source ou appui |
|---|---|---|---|
| Planner | Bientôt | Les notes et bulletins, les frais et paiements, et l'espace des familles sont en préparation. | `vitrine/src/i18n/fr/bientot.json` (« Notes et bulletins », « Frais et paiements », « Familles ») ; `docs/plan/suivi.md` (FIN-01, VSC-02, VSC-03 à faire) |
| Tableur et messagerie | Fichiers et papier | Des fichiers et des reçus papier. Cela marche, mais la même donnée se saisit plusieurs fois. | [Problèmes] l. 5 ; [Numérique] l. 19 |
| ERP généraliste | Oui | C'est sa force : admissions, frais, personnel et notes dans un même outil. | [01] l. 12 ; [07] l. 25 |
| Plateforme de cours seule | Notes de cours | Les notes des devoirs et des quiz, pas les frais ni les familles. | [07] l. 78 (suivi de progression) |
| Logiciel de vie scolaire | Oui | C'est son cœur : absences, bulletins, frais et application des familles. | [01] l. 11 |

### 4 bis. Le tableau court de l'accueil

Critères 1, 2, 4 et 6 (réponse 4), plus la ligne 7. Elle mène à la section « Bientôt » qui suit (réponse 8). **À valider** : la garder sur l'accueil, ou la laisser à `/comparer/` seulement.

| | Planner | Tableur et messagerie | ERP généraliste | Plateforme de cours seule | Logiciel de vie scolaire |
|---|---|---|---|---|---|
| L'emploi du temps calculé selon vos règles | Oui | À la main | Selon l'outil | Hors de son rôle | Le plus souvent saisi |
| La raison de chaque refus | Oui | À chercher soi-même | Selon l'outil | Hors de son rôle | Selon l'outil |
| L'appel | QR code ou à la main | Sur papier | Oui | Selon l'outil | Oui |
| Sans téléphone de l'élève | En grande partie | Oui | Pour le personnel | Un appareil par élève | Pour le personnel |
| Notes, frais et familles | Bientôt | Fichiers et papier | Oui | Notes de cours | Oui |

L'anglais traduit ces textes sans rien ajouter. Il est montré au chef dans la PR, avec le français en regard. L'arabe garde ses clés vides et prend le repli français, comme les autres pages.

## 5. Ce qui est construit

| Fichier | Rôle |
|---|---|
| `vitrine/src/i18n/{fr,en,ar}/comparer.json` | tous les textes : cadre (§ 3), approches, lignes avec mot et texte par colonne, drapeau `accueil`, date |
| `vitrine/src/components/comparer/TableauComparatif.astro` | vrai `<table>` : `<caption>`, `<th scope="col">` pour les approches, `<th scope="row">` pour les critères ; prop `court` pour n'afficher que les mots |
| `vitrine/src/components/comparer/CartesComparatif.astro` | sous 640 px, une carte par critère avec les cinq colonnes en liste de définitions ; le CSS montre l'un ou l'autre, sans JavaScript, et seul l'affiché est lu par les lecteurs d'écran (`display: none`) |
| `vitrine/src/components/comparer/Methode.astro` | l'encadré de méthode |
| `vitrine/src/components/accueil/Pourquoi.astro` | la section de l'accueil : textes de cadre, tableau court, lien |
| `vitrine/src/pages/[lang]/comparer.astro` | la page : en-tête (`EnTetePage`), méthode, tableau détaillé, fin de page (`FinDePage`) |
| `vitrine/src/pages/[lang]/index.astro` | deux lignes : l'import et `<Pourquoi>` avant `<Bientot>` |
| `vitrine/src/i18n/langues.js` | clé `comparer: 'comparer'` dans `PAGES` |
| `vitrine/src/components/socle/PiedDePage.astro` et `commun.json` (`navigation.comparer`) | le lien dans la colonne « Ressources », avant « Sécurité » |
| `vitrine/tests/comparer.test.js` | § 6 |

La colonne Planner est mise en avant par la couleur de fond des jetons existants (`bleu-clair` léger), jamais par la couleur seule : son en-tête dit « Planner ». Aucune icône vert ou rouge, aucun signe ✓ ou ✗ : les mots portent le sens. Repères de taille de l'équipe : page 80 lignes, composant 150.

Conflits attendus : `langues.js`, `PiedDePage.astro` et `commun.json` sont aussi touchés par VIT-11 (catalogue et FAQ). L'ajout est d'une ligne chacun ; le second qui fusionne reprend l'autre.

## 6. Vérifications

- `vitrine/tests/comparer.test.js` :
  - en français et en anglais, cinq colonnes et sept lignes, un mot et un texte non vides par case ; l'arabe a les mêmes clés ;
  - les lignes de l'accueil sont 1, 2, 4, 6 et 7 ;
  - **aucun nom de produit** : liste des noms relevés dans les études (ERP, plateformes de cours, logiciels de vie scolaire et d'emploi du temps, marques de tableur et de messagerie, plateformes d'État) ;
  - **aucun prix** : ni devise ni symbole monétaire ; **aucun chiffre** dans les cases des approches ; dans les cases Planner, seul « 30 » est permis ;
  - **chaque source du § 4 existe** : la liste des chemins par critère est dans le test, qui vérifie chaque fichier depuis la racine du dépôt ;
  - la date de la méthode est au format AAAA-MM-JJ.
- Build du site ; tests existants (`contenu`, `traductions`, `roles`, `solutions`) ; `node scripts/verifier-neutre.mjs` ; axe-core sans violation sur l'accueil et `/comparer/`, en français et en anglais.
- 390, 768 et 1440 px : cartes empilées à 390 px, tableau au-delà ; sans JavaScript ; mouvement réduit respecté.

## 7. Étapes

1. Ce plan, commité seul ; validation du chef case par case (§ 4), et du point du § 4 bis.
2. Après la fusion de #216 : fusion de `origin/main` dans la branche, puis le code, en un commit pour les textes et un pour les composants et la page.
3. Les vérifications du § 6, la fiche de session, les commandes au chef. Aucun `git push`.
