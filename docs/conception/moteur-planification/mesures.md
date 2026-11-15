# MOT-02 · Mesures du solveur

État au 15 novembre 2026 : banc et jeu supérieur livrés, série avant/après MOT-12 en cours ; collège en attente de MOT-13b sur `main`. Aucun résultat de série complète n'est encore établi.

Plan validé : [mot-02-mesure-solveur.md](mot-02-mesure-solveur.md). Commandes et protocole : [README du banc](../../../scripts/mesures/mot-02/README.md).

## Portée

**EP-10 applicative non démontrée par ce banc.** Les mesures directes du solveur ne certifient ni le déploiement sur les dates, ni les volumes applicatifs, ni les conflits individuels des groupes transversaux. Le collège de 600 élèves doit provenir du générateur de MOT-13b fusionné sur `main` ; il n'a pas encore été mesuré.

Le **jeu supérieur simplifié** comprend 20 000 étudiants en 400 groupes indépendants de 50, 800 enseignants, 400 salles de 50 et 4 800 leçons de deux heures dans une grille de 40 créneaux. Deux enseignants propres à chaque groupe, disponibilité complète et un seul site : ce scénario n'est pas représentatif de toutes les organisations de 20 000 étudiants. Un témoin vérifié prouve que cette construction est faisable ; il n'est pas envoyé comme solution initiale.

## Protocole et provenance

- Avant : `d8d892bc57ea71f2827ebad3a42e94da10b1f46b`, dernier commit de `main` avant #181, Spring Boot 3.3.5 et Timefold 1.15.
- Après : `38f2f90f16e317ffdd083fab8ba166289754ef7b`, fusion de #181, Spring Boot 4.1.2 et cœur Timefold 1.35, sans starter.
- Images reconstruites depuis les sources Git et le Dockerfile existant, sans modifier le produit. Même problème et mêmes ressources. Les modes du produit observés dans les journaux sont `REPRODUCIBLE` avant et `PHASE_ASSERT` après ; aucun réglage de mode n'est substitué.
- Docker Desktop Linux local, Node 22.23.4. Limites inspectées du conteneur : 640 Mio, 1,5 CPU, aucun échange, tas maximal 70 %, un calcul à la fois. Ce n'est pas une mesure sur le serveur Debian ; la machine et ses autres activités influencent les temps.
- Par version : chauffe demandée de 60 s hors résultats, puis trois passages de 600 s demandées sur conteneurs neufs. Arrêt anticipé existant du produit conservé. Garde externe 660 s ; sondage demandé chaque seconde, latence réelle horodatée.
- Temps principal du POST au GET final, analyse incluse ; démarrage séparé. Sondage mémoire et API en parallèle : la durée relevée est une borne supérieure conservatrice de réception. Première faisabilité observée, pas instant interne exact.
- Pic natif cgroup du conteneur, qui peut inclure le démarrage, distinct du maximum échantillonné. Valeur absente conservée comme indisponible. Analyse des violations et contrôle de la présence de toutes les affectations : score nul seul insuffisant.

## Recette courte, exclue des séries

Sur un budget de cinq secondes, les deux images s'arrêtent pendant la construction et laissent presque toutes les leçons sans affectation. Sur un passage 1.35, la réponse finale vaut pourtant `0hard/0soft`, avec 4 790 leçons non affectées ; le journal prévient que la construction est interrompue. Le banc le classe en échec. L'ancien moteur renvoie un score `init` négatif qui traduit déjà l'incomplétude.

Cette observation ne mesure pas la capacité à 600 s. Elle démontre que les consommateurs du score doivent également contrôler les affectations. Le constat est transmis au coordinateur ; aucun correctif du produit n'est introduit dans cette étude.

Deux tentatives de pilote se sont arrêtées prématurément avant requête pendant la recette. Une garde de vie du processus Node corrige ce cas ; un test par sous-processus le reproduit. Leurs deux conteneurs dédiés ont été retirés après contrôle des labels. Ces tentatives sont exclues des résultats.

## Résultats et suite

Les résultats des passages mesurés seront ajoutés après la série. Les réponses complètes, journaux et métadonnées du poste restent dans `.local/`, hors Git. Seule une extraction sans donnée du poste peut être versionnée.

Le collège et son verdict restent en attente. Aucune décision de changer le moteur ou de filtrer ses domaines n'est prise : le coordinateur a réservé une éventuelle optimisation nécessaire à une fonction distincte de MOT-10.
