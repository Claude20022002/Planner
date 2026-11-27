# QJE-15 · Les jeux rangés par niveau, puis par filière — conception

| | |
|---|---|
| Module | (nom fixé par QJE-16) · exception hors chantier (chef, 18 nov.) |
| Branche | `feat/qje-15-jeux-par-niveau` |
| Rédigé par | agent de Cursor (Grok 4.7), le 2026-11-26 ; revu le 2026-11-27 |
| **Validé** | en attente du chef : le classement de chaque jeu est un choix de produit |

## 1. Objet et critère de « terminé »

Chaque jeu du catalogue porte un ou plusieurs cycles scolaires et une filière. Le web, le mobile et la page des jeux du site montrent les jeux dans le même ordre : le cycle, puis la filière, puis le rang du tableau ci-dessous. Un cycle ou une filière sans jeu dans la liste affichée n'a pas de titre.

Ce plan ne range que les jeux : le terminal et les dix simulations. Les quiz du Studio n'y entrent pas. Là où il faut le nom du module des jeux, le plan écrit (nom fixé par QJE-16). Le chef a décidé le 26 nov. que les quiz et les jeux sont séparés partout : sur le site, dans l'application, dans l'offre et dans le plan. QJE-15 ne fait pas cette séparation. Les écrans qui montrent encore les deux sont au § 2 bis.

On le vérifie par un test du catalogue (les onze lignes du tableau), un test du rangement (l'ordre ne dépend pas de la langue ni de l'ordre d'arrivée), les tests du site sur l'ordre des cartes, et axe-core sur la bibliothèque des jeux. Les deux façons de jouer restent celles d'aujourd'hui.

## 2. Ce qui existe

Lu sur `origin/main` (`7469bb70`).

- `shared/jeux/catalogue.js` (44 lignes) réunit le terminal et les dix simulations. Le terminal a `discipline: 'informatique'`. Chaque simulation a une `discipline` (`algorithmique`, `bases-de-donnees`, `systemes-d-exploitation`, `robotique`, `reseaux`, `cybersecurite`, `intelligence-artificielle`, `gestion-de-projet`, `gestion`, `logistique`).
- `shared/simulations/catalogue/_aide.js` : `curriculum(fr, en)` pose `niveaux: [1, 2, 3]`. Ces trois nombres sont les trois défis du jeu. Le libellé (`Génie Informatique : Cybersécurité`, `IA & Big Data : Machine Learning`, etc.) est le sous-titre déjà affiché. Ce plan ne réécrit ni ce libellé ni ces trois nombres.
- `shared/simulations/catalogue.js` : l'ordre du tableau `SIMULATIONS` est lu par position dans `backend/tests/utils/simulations.test.js`. Cet ordre-là reste.
- Le web, `frontend/src/pages/jeux/Jeux.jsx` (367 lignes). Le panneau « Tous les jeux » (vers les lignes 241-305) affiche `accueil.jeux` à plat. L'enseignant voit les onze jeux ; l'étudiant voit ceux proposés dans ses modules (`backend/services/jeux/jeux.js`, `accueilJeux`). La progression, le bouton Jouer et le bouton Lancer en classe sont dans ce panneau.
- Le mobile, `mobile/src/app/(onglets)/jeux.jsx` (257 lignes). Les jeux sont sous chaque module, avec la progression. Il n'y a pas de second catalogue « tous les jeux ».
- Le site, `vitrine/src/pages/[lang]/bibliotheque-des-jeux.astro`. Une seule `GrilleCartes`, dix cartes, titres et résumés dans `vitrine/src/i18n/{fr,en,ar}/bibliotheque-des-jeux.json`. Le test `vitrine/tests/contenu.test.js` fige l'ordre français actuel (Tri Cyber en premier, Labo Big-O en dernier). Le terminal n'est pas sur cette page. La phrase « Dix jeux d'informatique et de gestion : Tri Cyber » est sur la page du module du site (VIT-18), qui montre aussi les quiz. QJE-15 ne la modifie pas. Cette page est au § 2 bis.
- `accueilJeux` recopie une liste fermée de champs (`code`, `type`, `modes`, `discipline`, `titre`, `resume`, `source`, `curriculum`, `progression`). Un champ ajouté au catalogue n'arrive pas tout seul dans cette réponse.

`curriculum.niveaux` et `defis[].niveau` du terminal (niveaux 1 à n des commandes) restent des difficultés de défi. Le cycle scolaire est un champ nouveau, `cycles`, pour que les deux sens ne se mélangent pas. À l'écran, le titre dit quand même « Supérieur », « Lycée », etc.

## 2 bis. Écrans où la page des jeux montre aussi des quiz

QJE-16 s'en sert. QJE-15 range les lignes de jeux et laisse les blocs de quiz où ils sont. Aucun de ces trois écrans ne change de nom dans ce plan.

| Écran | Ce qui est mêlé | Ce que QJE-15 touche |
|---|---|---|
| Web, route `/jeux`, titre « Activités » (`frontend/src/pages/jeux/Jeux.jsx`) | La zone des quiz de l'enseignant, l'historique des quiz terminés, et les jeux. Le sous-titre parle des quiz, des devoirs et des jeux. | Le panneau des jeux seulement. |
| Mobile, onglet « Activités » (`mobile/src/app/(onglets)/jeux.jsx`) | Sous chaque module : quiz en cours, devoirs, puis jeux. Plus bas, les derniers quiz. | Les jeux du module seulement. |
| Site, page du module (VIT-18), dans `vitrine/src/pages/[lang]/applications/` | Les quiz, le studio et les jeux sur la même page, dont la phrase « Dix jeux d'informatique et de gestion : Tri Cyber ». Le nom affiché et le segment réunissent encore les deux familles. | Rien. La bibliothèque (`bibliotheque-des-jeux.astro`) ne montre que les dix simulations : c'est elle que QJE-15 range. |

## 3. Questions et réponses

| N° | Question | Proposition | Réponse du chef | Bloque |
|---|---|---|---|---|
| 1 | Quels niveaux, et dans quel ordre ? | Quatre cycles, dans cet ordre : `college` (Collège), `lycee` (Lycée), `superieur` (Supérieur), `formation-professionnelle` (Formation professionnelle). Ce sont les types de VIT-05, avec le collège et le lycée séparés comme dans les profils de la conception C-5. Ni primaire ni maternelle. Aujourd'hui les onze jeux portent seulement `superieur` : les trois autres cycles existent dans la liste et ne s'affichent pas. | | oui |
| 2 | Le classement de chacun des onze jeux | Le tableau du § 4. Quatre filières, dans cet ordre : Informatique, Réseaux et cybersécurité, Intelligence artificielle, Gestion et logistique. Tous les jeux au supérieur seulement. | | oui |
| 3 | La monnaie de « Pilote des stocks » et « Budget ERP » | Réglée par M-11 (`fix/qje-jeux-unite-neutre`, `4475a053`) : le mot est « crédits ». QJE-15 ne réécrit pas ces consignes et ne change pas les montants. Le code de QJE-15 part de `main` une fois M-11 fusionnée, et ne remet pas « MAD ». | M-11, en attente de la PR du chef | non |
| 4 | Le numéro donné pour la séparation et pour le nom du module | Le plan écrit (nom fixé par QJE-16), comme demandé le 26 nov. Sur cette branche, QJE-16 est déjà l'interrupteur de l'IA par école (décision D2, 18 nov.). Proposition : le coordinateur dit si la séparation garde ce numéro, et ce que devient l'interrupteur. | | non, pour le rangement |

Variantes que le tableau ne retient pas, au cas où le chef les préférerait : ajouter `lycee` à Robot Route (le défi 1 est une livraison sur une grille) ; ajouter `formation-professionnelle` à Budget ERP, Sprint Agile et Pilote des stocks (budget, backlog, réapprovisionnement). La feuille de route du 21 nov. construit le supérieur d'abord : la proposition les laisse au supérieur seul.

## 4. Solution

Le catalogue gagne deux champs, et une fonction pure range une liste déjà fournie par l'écran.

- `cycles` : un tableau non vide, valeurs prises dans `CYCLES`.
- `filiere` : un code pris dans `FILIERES`.
- `rangerJeux(jeux)` groupe par cycle, puis par filière, puis par le rang du tableau. Elle omet un groupe vide. L'ordre est celui des deux listes fermées, pas l'ordre alphabétique d'une langue. Elle ne trie pas `SIMULATIONS` ni `JEUX`.

L'écran connaît déjà les jeux (réponse d'accueil, ou cartes du site). Il lit le cycle et la filière avec `jeuParCode(code)` dans le catalogue partagé, déjà importé par le web et le mobile. `backend/` ne change pas. Aucune migration.

```mermaid
flowchart TD
  cat["Catalogue partagé : cycles, filière, rang"]
  api["Liste déjà affichée : accueil, module, ou cartes"]
  rang["rangerJeux"]
  web["Web : BibliothequeJeux"]
  mob["Mobile : GroupeJeux, dans chaque module"]
  site["Site : une GrilleCartes par groupe"]
  api --> rang
  cat --> rang
  rang --> web
  rang --> mob
  rang --> site
```

### Les quatre filières

| Code | Titre français | Titre anglais |
|---|---|---|
| `informatique` | Informatique | Computer science |
| `reseaux-cybersecurite` | Réseaux et cybersécurité | Networks and cybersecurity |
| `intelligence-artificielle` | Intelligence artificielle | Artificial intelligence |
| `gestion-logistique` | Gestion et logistique | Business and logistics |

Les titres arabes de la page du site sont la traduction de ces quatre titres, écrits dans le fichier arabe au moment du code et visibles dans la PR.

### Tableau jeu par jeu

L'ordre des lignes dans une filière est le rang. Le site reprend le même ordre, sans le terminal.

| Rang | Code | Jeu | Cycles | Filière | Raison, tirée des défis |
|---|---|---|---|---|---|
| 1 | `terminal-linux` | Terminal Linux | supérieur | Informatique | Défi d'orientation : `pwd`, `ls`, `whoami`. La suite va jusqu'aux droits, aux processus et à une astreinte sur un serveur (résumé). Un seul cycle pour tout le jeu. Absent du site. |
| 2 | `big-o-lab` | Labo Big-O | supérieur | Informatique | Défi 1, motifs de base : constant, logarithmique, linéaire, quadratique. Défi 3 : Fibonacci naïf, exponentiel. |
| 3 | `quete-sql` | Requête Parfaite | supérieur | Informatique | Défi 1 : remettre les clauses dans l'ordre. Défi 2 : agrégation. Défi 3 : filtrer après l'agrégat. |
| 4 | `cpu-process` | Ordonnanceur CPU | supérieur | Informatique | Défi 1 : deux tâches simples, quatre processus. Défi 2 : échéances serrées. Défi 3 : fenêtre critique. |
| 5 | `robot-route` | Robot Route | supérieur | Informatique | Défi 1 : première livraison. Défi 2 : passage obligatoire. Défi 3 : trajet sous contrainte. Le geste est un programme de déplacement sur une grille. |
| 1 | `topo-reseau` | Nœuds Réseaux | supérieur | Réseaux et cybersécurité | Défi 1 : première topologie, capacité. Défi 2 : même sous-réseau, isolation. Défi 3 : zéro confiance. |
| 2 | `tri-cyber` | Tri Cyber | supérieur | Réseaux et cybersécurité | Défi 1 : incidents évidents, dont un rançongiciel sur des postes secrets. Défi 3 : zero-day et données RH. |
| 1 | `threshold-lab` | Labo des seuils | supérieur | Intelligence artificielle | Défi 1 : séparer les pièces. Défi 2 : ne manquer aucun défaut. Défi 3 : le coût d'une erreur. |
| 1 | `budget-erp` | Budget ERP | supérieur | Gestion et logistique | Défi 1 : premier plan. Défi 2 : budget serré. Défi 3 : couverture maximale. Quatre postes de coût. |
| 2 | `sprint-agile` | Sprint Agile | supérieur | Gestion et logistique | Défi 1 : première sélection du backlog. Défi 2 : dépendances obligées. Défi 3 : tension extrême. |
| 3 | `stock-pilot` | Pilote des stocks | supérieur | Gestion et logistique | Défi 1 : juste ce qu'il faut. Défi 2 : une journée de délai. Défi 3 : budget serré. Trois jours sans rupture. |

Ce que l'enseignant voit sur le web, de haut en bas : Supérieur, puis Informatique (terminal, Big-O, SQL, CPU, robot), Réseaux et cybersécurité (nœuds, tri), Intelligence artificielle (seuils), Gestion et logistique (budget, sprint, stocks). L'étudiant voit le même ordre, limité aux jeux proposés dans ses modules. Un module qui n'a que Pilote des stocks montre un seul titre, « Supérieur », puis « Gestion et logistique », puis le jeu.

Le site, sous les mêmes titres, sans le terminal : Big-O, SQL, CPU, robot, nœuds, tri, seuils, budget, sprint, stocks.

Le sous-titre `curriculum.discipline` reste sous la carte, comme aujourd'hui. Le titre de section est la filière du tableau, plus courte, et la même pour plusieurs jeux.

### Comment `Jeux.jsx` redescend sous 300 lignes

Le panneau du catalogue sort dans `frontend/src/components/jeux/BibliothequeJeux.jsx` (titres de cycle et de filière, ligne de jeu, progression, Jouer, Lancer). La fenêtre « proposer un jeu » sort dans `frontend/src/components/jeux/ProposerJeuDialog.jsx`. `Jeux.jsx` garde l'accueil, les modules et l'historique, et appelle ces deux composants. 367 lignes moins ces deux blocs, plus les deux appels : la cible est sous 300.

Le mobile appelle `mobile/src/jeux/GroupeJeux.jsx` à la place de la boucle des jeux d'un module. Les lignes nouvelles sont dans ce composant. `jeux.jsx` reste à 257 lignes ou en dessous.

La page du site ajoute un `code` stable sur chaque carte (fr, en, ar), puis rend une `GrilleCartes` par groupe : le surtitre est le cycle, le titre est la filière. `GrilleCartes` ne change pas. La phrase de la page du module du site ne change pas.

## 5. Fichiers créés ou modifiés

Au moment du code, après le visa et après la fusion de M-11, de #282 (VIT-23, `bibliotheque-des-jeux.astro`) et de #229 (catalogue des jeux, Alexis). Pas dans le commit de ce plan.

| Fichier | Créé / modifié | Rôle | Taille visée |
|---|---|---|---|
| `shared/jeux/catalogue.js` | modifié | `CYCLES`, `FILIERES`, `cycles` et `filiere` sur le terminal, `rangerJeux` | sous 120 lignes |
| `shared/simulations/catalogue/*.js` | modifié | `cycles` et `filiere` sur chaque simulation. Ni les défis, ni les montants, ni `curriculum` | inchangée, plus deux champs |
| `backend/tests/utils/rangementJeux.test.js` | créé | le tableau du § 4 et les groupes vides | court |
| `frontend/src/components/jeux/BibliothequeJeux.jsx` | créé | le panneau rangé | sous 200 lignes |
| `frontend/src/components/jeux/ProposerJeuDialog.jsx` | créé | la fenêtre déjà présente | sous 80 lignes |
| `frontend/src/pages/jeux/Jeux.jsx` | modifié | appelle les deux composants | sous 300 lignes |
| `mobile/src/jeux/GroupeJeux.jsx` | créé | les jeux d'un module, rangés | sous 150 lignes |
| `mobile/src/app/(onglets)/jeux.jsx` | modifié | appelle `GroupeJeux` | 257 lignes ou moins |
| Traductions web et mobile des quatre cycles et des quatre filières | modifié | titres d'écran | quelques clés |
| `vitrine/src/pages/[lang]/bibliotheque-des-jeux.astro` | modifié | une grille par groupe | sous 80 lignes |
| `vitrine/src/i18n/{fr,en,ar}/bibliotheque-des-jeux.json` | modifié | `code` sur chaque carte, titres de section | |
| `vitrine/tests/contenu.test.js` | modifié | l'ordre français du § 4, sans le terminal | |
| `docs/plan/modules/` (fichier du module, nom fixé par QJE-16) | modifié | la ligne QJE-15 | |
| `docs/sessions/` | créé | la fiche | |

## 6. Données et migration

Aucune table. Le cycle et la filière vivent dans le catalogue partagé, pas dans `JeuModule` ni dans `JeuProgression`. Le serveur continue de valider la progression comme aujourd'hui. Si un jour le classement devait être enregistré par école, ce serait une autre fonction, avec un numéro de migration demandé au coordinateur.

## 7. Sécurité, isolation et exigences produit

Le rangement ne lit aucune donnée d'une autre école : la liste vient déjà de l'accueil filtré. Aucun canal I-1 à I-16 n'est ouvert. Les droits restent : l'étudiant joue aux jeux proposés, l'enseignant lance en classe.

EP-18 : les `modes` ne changent pas. Le terminal reste `individuel` et `collectif`. Les simulations restent au défaut de `modesDuJeu`, `individuel`. EP-19 : la page du site gagne des titres ; le poids est mesuré dans la PR, comme pour les pages déjà suivies. Rien n'est téléchargé.

Aucun pays, aucune devise, aucun fuseau écrit par cette fonction. Le mot « crédits » vient de M-11.

## 7 bis. Ce que disent les études

La fonction sert d'abord le supérieur (étape 3). Les noms des autres cycles sont dans la liste fermée : un jeu de lycée ou de formation professionnelle plus tard réutilise le même rangement, et le chef valide alors sa ligne.

| Ligne | Étude | Appliquée ou écartée | Comment, ou pourquoi |
|---|---|---|---|
| M18 | Le supérieur est le cœur du produit aujourd'hui | appliquée | Les onze jeux sont au supérieur. |
| M17 | Aucun pays ni aucune devise écrite en dur | appliquée | QJE-15 n'écrit pas de monnaie. M-11 pose « crédits ». |
| Pack 4, étude 15 | Les jeux, à trouver dans le produit | appliquée | La bibliothèque range les jeux par cycle et par domaine. Le libellé de l'étude réunit encore les deux familles ; QJE-16 le sépare. |
| C5, expertise du site | Raconter les contextes d'EP-18 | appliquée | La page du site reste une lecture. On y joue dans l'application, sur le téléphone ou au tableau, selon les `modes` déjà déclarés. |
| M14 | axe-core sans violation | appliquée | axe-core sur la bibliothèque des jeux, web et site. |
| R10, N3 | Poids affiché avant un téléchargement | écartée | Aucun fichier à télécharger. Le rangement se calcule sur la liste déjà là. |
| N7 | Plusieurs systèmes de notes | écartée | La fonction ne note pas. |

## 7 ter. EP-18 : tous les contextes

| Contexte | Ce que fait la fonction | Preuve ou test |
|---|---|---|
| **A. Au moins un élève sans téléphone ni ordinateur** | Il voit la même liste projetée par l'enseignant. Le terminal se lance encore au tableau (`collectif`). Le rangement ne retire pas ce mode. | Les `modes` du catalogue sont inchangés ; un test le vérifie. |
| **B. Connexion lente ou coupée** | Pas de requête nouvelle. Les titres sont dans le paquet déjà chargé. La progression affichée est celle que l'accueil a déjà renvoyée. | Le test de `rangerJeux` n'appelle pas le réseau. Le poids de la page du site est écrit dans la PR. |
| **C. Ordinateur et projecteur, ou salle sans écran** | Avec un projecteur, l'enseignant affiche la bibliothèque. Sans écran, la liste ne se joue pas : la classe revient au lancement au tableau quand le jeu le permet, comme aujourd'hui. | Parcours `sessionsJeu` inchangé. |

## 8. Tests

- Catalogue : les onze codes ont exactement les `cycles` et la `filiere` du tableau. Un code absent ou un cycle hors liste fait échouer le test.
- `rangerJeux` : mélanger l'entrée rend le même ordre ; une liste de deux jeux de la même filière n'a qu'un titre ; une filière sans jeu dans la liste n'a pas de titre ; le résultat ne dépend pas de la langue.
- `SIMULATIONS` garde l'ordre que `simulations.test.js` déstructure.
- Web : `BibliothequeJeux` affiche le titre « Supérieur » puis « Informatique » avant le premier jeu du tableau, et le bouton Lancer ouvre encore la fenêtre de séance.
- Site : `contenu.test.js` attend l'ordre du § 4 sans le terminal, en français ; les trois langues ont les mêmes `code`.
- `sessionsJeu`, `verifier-neutre.mjs`, axe-core sur la bibliothèque des jeux.

## 9. Étapes de livraison

1. Ce plan, commité seul. Le chef le valide. Aucun code avant cette ligne « Validé ».
2. Le code, après le visa et après la présence sur `main` de M-11, de #282 et de #229. D'abord le catalogue et `rangerJeux` avec le test, puis les trois écrans.
3. Fiche de session, module QJE, rapport. Le coordinateur relit la branche avant la PR. Le chef pousse.

Le 27 novembre, `fix-audit-vitrine` passe devant ce code si le visa n'est pas là.

## 10. Risques et retour arrière

- Trois branches touchent les mêmes fichiers. Coder avant leurs fusions rejoue le conflit. Le code attend.
- Sortir le panneau de `Jeux.jsx` peut casser le bouton Lancer. Le test du § 8 le couvre. Revenir, c'est retirer `cycles`, `filiere` et les composants : l'accueil redevient la liste plate.
- L'ordre du site change pour les lecteurs. Le test figé est mis à jour dans le même commit que la page.
- Confondre les niveaux 1, 2, 3 des défis avec le cycle. Le champ s'appelle `cycles`. Le sous-titre actuel continue d'afficher 1, 2, 3.

## 11. Hors périmètre

- `backend/`, les tables, les moteurs, la validation des défis, les quiz du Studio.
- Séparer les quiz et les jeux sur les écrans du § 2 bis, et fixer le nom du module des jeux : c'est QJE-16.
- La charte des jeux (UIX-10e).
- `docs/plan/suivi.md`.
- Réécrire `curriculum.discipline`, les résumés, ou les consignes en crédits (M-11 et #229).
- Ajouter le terminal à la page du site, ou modifier la phrase « Dix jeux d'informatique et de gestion ».
- Donner à une école sa propre filière de jeux : la filière du tableau est un domaine du catalogue, pas l'entité `Filiere`.
