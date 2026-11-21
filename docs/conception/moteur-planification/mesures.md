# MOT-02 · Mesures du solveur

## Série du 21 novembre · supérieur multi-campus

**Les deux tailles passent le seuil de faisabilité.** Sur la version après MOT-13b, les six plannings sont complets et les scores dur et moyen sont nuls. Les six passages de référence sont eux aussi complets avec un score dur nul. Aucun dépassement du budget de 600 s ni arrêt par manque de mémoire. **À 960 étudiants, l’alerte de qualité souple se déclenche.** [Plan validé, § 12](mot-02-mesure-solveur.md#supérieur-21-novembre) · [Résultats individuels et provenance](../../../scripts/mesures/mot-02/jeux/resultats-campus.json)

| Étudiants et séances | Version | Durées POST → résultat final, en s | Pics du conteneur, en Mio | Scores souples des passages 1, 2, 3 | Médiane par séance |
|---|---|---|---|---|---:|
| 480 · 84 | Avant #182 | 81,2 / 87,2 / 90,4 | 156,4 / 163,1 / 157,5 | +4 / +4 / +4 | +0,048 |
| 480 · 84 | Après #182 | 99,5 / 86,3 / 87,3 | 163,6 / 159,9 / 159,1 | +4 / +4 / +4 | +0,048 |
| 960 · 168 | Avant #182 | 163,1 / 156,1 / 226,7 | 172,2 / 170,5 / 165,6 | +5 / +5 / 0 | +0,030 |
| 960 · 168 | Après #182 | 164,1 / 183,2 / 194,6 | 172,4 / 169,7 / 169,0 | +5 / 0 / −15 | 0 |

### Lecture de l’alerte

À 480 étudiants, chacun des six résultats obtient quatre points de récompense sans pénalité souple. À 960 étudiants, les six résultats obtiennent cinq points de récompense. Avant #182, un passage perd cinq points sur la règle des journées sans trous. Après #182, le deuxième passage perd cinq points sur cette même règle et le troisième perd vingt points sur l’ordre des CM par rapport aux TD et TP. La médiane passe de +5 à 0, soit −5 points. Le pourcentage du protocole vaut −100 % sur une référence de seulement cinq points. Le tableau donne les scores bruts et par séance pour situer cet écart.

Les témoins figés, testés sur les deux versions, conservent toutes leurs affectations et leurs scores (−410 et −820 souples, dur nul, moyen nul sur la version actuelle). Les arbres Git de `solver/` sont identiques à la fusion #182 et dans la révision mesurée après #182. Le décompte des points sur le témoin est donc stable. Sur les trois recherches libres à 960, le débit après #182 va de 5 777 à 11 026 évaluations/s, contre 6 755 à 11 690 avant. Les plages se recouvrent. Les pénalités expliquent l’écart de score observé. **La cause de la différence de recherche entre versions reste indéterminée** et est transmise à MOT-04.

### Protocole exécuté

Jeux synthétiques de quatre et huit promotions sur deux campus, avec CM, TD, TP et fenêtres des vacataires. Pour chaque taille, le témoin a été contrôlé par le banc puis épinglé séparément sur les deux images. Les mesures libres partent sans placement. Une chauffe par taille et version, exclue, précède trois passages par version en alternance. Chaque passage utilise un conteneur neuf sur le poste, limité à 1,5 CPU et 640 Mio. Le temps inclut le sondage final et l’analyse. Les résultats structurés donnent les empreintes des requêtes et images, les durées des phases, le débit et les contributions disponibles pour chaque règle. [Reproduction du banc](../../../scripts/mesures/mot-02/README.md)

Le verdict porte sur ces deux semaines fictives et l’API du solveur. La mesure EP-10 du collège de 600 élèves reste à l’étape du scolaire. Le jeu simplifié de 20 000 étudiants ci-dessous conserve ses six résultats historiques.

## Historique du 15 novembre · jeu de charge simplifié

État au 15 novembre 2026 : **grand jeu mesuré, six passages incomplets sur six** ; collège de 600 élèves en attente du générateur MOT-13b sur main. MOT-02 reste en cours.

Plan validé : [mot-02-mesure-solveur.md](mot-02-mesure-solveur.md). [Banc et commandes](../../../scripts/mesures/mot-02/README.md). [Résultats structurés](../../../scripts/mesures/mot-02/jeux/resultats-superieur.json). [Manifeste du jeu](../../../scripts/mesures/mot-02/jeux/superieur-manifeste.json).

## Portée du résultat

**EP-10 applicative non démontrée par ce banc.** Le collège de 600 élèves n'a pas encore été mesuré. Les appels directs du solveur ne certifient pas non plus le déploiement sur les dates, les volumes applicatifs ou les conflits individuels de groupes transversaux.

Le **jeu supérieur simplifié** représente 20 000 étudiants en 400 groupes indépendants de 50, 800 enseignants, 400 salles de 50 places et 4 800 leçons de deux heures, dans une grille de 40 créneaux. Deux enseignants propres à chaque groupe, disponibilité complète et un seul site : il ne représente pas toutes les organisations de 20 000 étudiants. Un témoin vérifié démontre sa faisabilité ; il n'est jamais envoyé comme solution initiale.

## Protocole et provenance

- Avant : `d8d892bc57ea71f2827ebad3a42e94da10b1f46b`, dernier commit de main avant #181, Spring Boot 3.3.5 / Timefold 1.15.
- Après : `38f2f90f16e317ffdd083fab8ba166289754ef7b`, fusion de #181, Spring Boot 4.1.2 / cœur Timefold 1.35 sans starter.
- Images construites depuis les sources Git et le Dockerfile du dépôt, sans modification du produit. Leurs identifiants complets sont dans les résultats structurés. Modes observés : `REPRODUCIBLE` avant et `PHASE_ASSERT` après ; aucun mode substitué par le banc.
- Même problème et mêmes requêtes pour les six passages mesurés : une seule empreinte de requête. SHA-256 du problème canonique : `0a88e4a320af753674a65746f71d00bc78343f8a1a113082f8e86ca051fea4bc`.
- Poste local, Docker Desktop Linux (12 CPU et 5 860 114 432 octets exposés à la VM), Node 22.23.4. Ce n'est pas une mesure sur le serveur Debian. Le poste n'est pas réservé exclusivement à cette série ; la dispersion limite les conclusions.
- Limites de chaque conteneur inspectées : 640 Mio, 1,5 CPU, aucun échange, tas maximal 70 %, un calcul à la fois. Pas de modification de ressources pendant la série.
- Par version : chauffe demandée de 60 s exclue, puis trois passages demandés de 600 s sur conteneurs neufs. Arrêt anticipé existant conservé ; tous les passages mesurés ont atteint la limite pendant la construction. Garde externe 660 s ; sondage demandé chaque seconde, sans recouvrement.
- Temps principal : du POST à la réception du GET final, analyse comprise, démarrage séparé. API et sonde mémoire en parallèle : l'horodatage conservé est une borne supérieure conservatrice de réception. Une demande administrative après le GET incomplet est exclue de ce temps. L'extracteur reprend cet horodatage pour les acquisitions déjà réalisées ; la durée totale reste conservée séparément.
- Le pic natif cgroup du conteneur peut inclure son démarrage et son cache ; il se distingue du maximum échantillonné. Aucune sonde mémoire manquante sur les six passages. Aucun OOM du conteneur, ni échec moteur signalé ; les six échecs sont des plannings incomplets.

## Six passages mesurés

| Passage | POST à GET final, s | Pic natif, Mio | Leçons non affectées / 4 800 | Score final | Évaluations/s du journal |
|---|---|---|---|---|---|
| avant-1 | 604.04 | 203.8 | 2419 | `-2418init/-2hard/-20soft` | 47691 |
| avant-2 | 603.69 | 203.5 | 2537 | `-2536init/0hard/0soft` | 45334 |
| avant-3 | 605.91 | 195.3 | 2870 | `-2869init/0hard/-10soft` | 38588 |
| apres-1 | 609.43 | 229.4 | 2818 | `0hard/0soft` | 39342 |
| apres-2 | 608.21 | 259.9 | 2848 | `0hard/0soft` | 38794 |
| apres-3 | 610.97 | 254.4 | 2785 | `0hard/0soft` | 39902 |

Aucune première solution complète et faisable n'a été observée. Les listes API `violations` sont **vides sur les six réponses**, y compris sur `avant-1` dont le score dur vaut -2. Le détail des règles enfreintes n'est donc pas exploitable sur ces résultats incomplets : ne pas interpréter cette liste vide comme zéro conflit. Le score dur est une pénalité pondérée, pas un nombre brut de violations.

Les trois réponses 1.35 affichent `0hard/0soft` avec plus de la moitié des leçons non affectées. Ce score ne démontre pas la faisabilité. Le banc exige la présence de chaque leçon et de ses affectations, en plus du score ; il rejette ces réponses.

## Comparaison avant et après MOT-12

Le débit médian passe de **45 334 à 39 342 évaluations/s**, soit **13.2 % de moins** sur ces passages. Les plages se chevauchent : 38 588–47 691 avant, 38 794–39 902 après. La médiane de leçons entièrement affectées passe de **2 263 à 1 982**, soit **12.4 % de moins** dans ce budget.

La tendance sur ce jeu et ce poste est donc défavorable à la version après montée, sans preuve d'une régression stable ou causée par Timefold seul : trois passages, dispersion du poste, Spring Boot et mode d'assertion changent aussi. Le temps d'arrêt, voisin de la limite de 600 s dans les deux versions, n'est pas une preuve de vitesse égale. Les scores partiels ne se comparent pas comme des qualités finales.

Le pic natif médian passe de **203,5 à 254,4 Mio** ; le plus haut pic est **259,9 Mio**, sous les 640 Mio autorisés. Cette série n'a pas échoué par dépassement mémoire.

Les journaux montrent uniquement la construction, interrompue avant la phase d'amélioration. Dans ce jeu, les domaines ouvrent 30 débuts de séance et 400 salles compatibles par leçon : **12 000 couples potentiels**, avant l'option sans salle. Cela explique la taille du domaine exploré, sans prouver qu'un filtrage précis suffirait. Le besoin d'améliorer le résultat à cette taille et dans ce budget est constaté ; la solution technique reste à étudier.

La cible MOT-10 de 20 000 étudiants en moins de 30 minutes **n'est pas évaluée** : l'API actuelle limite les demandes à 600 s. Ne pas déduire de cet échec à 10 minutes un échec à 30 minutes.

## Recette et vérifications

Les essais courts de cinq secondes et les chauffes sont exclus du tableau. Ils ont déjà montré des réponses à score nul mais incomplètes en 1.35. Deux tentatives de pilote se sont arrêtées avant requête ; la garde de vie Node et son test par sous-processus corrigent ce cas. Leurs deux conteneurs ont été retirés après contrôle des labels ; aucune donnée de ces tentatives n'entre dans la comparaison.

Le banc compte **18 tests réussis** : génération stable, témoin faisable, bornes API, complétude, scores non initialisés, erreurs et garde, compteurs mémoire, séparation des profils, nettoyage ciblé, lecture des vitesses et séparation du temps administratif. La syntaxe et le contrôle de neutralité passent. Tous les conteneurs de la série ont été retirés après collecte ; images et résultats détaillés restent pour relecture.

Les requêtes, réponses détaillées, journaux et métadonnées locales sont conservés dans `.local/`, ignoré par Git. Seule l'extraction de résultats sans identifiant du poste est versionnée. Les sources de `solver/` et `backend/` sont inchangées par cette mission.

## Suite envisagée le 15 novembre

1. Coordinateur : relire le banc et cette comparaison, notamment le contrôle de complétude et l'analyse vide sur score négatif. Les constats sur l'API sont transmis ; aucune correction du produit n'est faite ici.
2. Attendre MOT-13b fusionnée dans main, puis lire son générateur à provenance stable. Confirmer qu'il donne 600 élèves sans adaptation ; sinon revenir au coordinateur. Mesurer le collège et compléter le verdict de MOT-02.
3. Une éventuelle optimisation, dont le filtrage si son besoin est démontré, relève d'une fonction distincte rattachée à MOT-10 (décision du coordinateur, Q7). Aucun choix de moteur pris dans cette étude.
