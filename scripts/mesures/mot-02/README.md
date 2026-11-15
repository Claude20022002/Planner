# MOT-02 · Banc local du solveur

Plan : `docs/conception/moteur-planification/mot-02-mesure-solveur.md`, validé par le coordinateur le 15 novembre 2026 (Q1–Q8).

Le banc utilise Node 22 ou plus récent, Git, tar et Docker Desktop Linux local. Il ne démarre que ses conteneurs, pas une installation Planner. Il construit les sources de deux commits figés : avant MOT-12 (`d8d892bc`) et après sa fusion #181 (`38f2f90f`). Les images sont conservées pour relecture.

## Jeu versionné

`configurations/superieur.json` décrit le **jeu supérieur simplifié** : 400 groupes de 50 étudiants, 4 800 séances de deux heures, 800 enseignants et 400 salles. Chaque groupe a deux enseignants propres ; disponibilités complètes, un site, aucun groupe transversal. Ces hypothèses limitent la portée du résultat.

Les problèmes sont non affectés et non épinglés. `superieur-temoin.json` est une construction faisable séparée, contrôlée par les tests, jamais envoyée comme placement initial. `superieur-manifeste.json` contient les tailles et les empreintes du problème et de la configuration, sans donnée sur le poste.

Le collège de 600 élèves utilisera le générateur de MOT-13b **après sa fusion sur main**. Il n'est pas recréé ici. Cette partie de MOT-02 reste à livrer.

## Vérifications

Depuis la racine du dossier de travail :

```powershell
node --test scripts/mesures/mot-02/tests/banc.test.mjs
```

```powershell
node scripts/mesures/mot-02/generer-superieur.mjs --verifier
```

Pour régénérer les trois fichiers du jeu à partir de la configuration approuvée :

```powershell
node scripts/mesures/mot-02/generer-superieur.mjs
```

## Construire et mesurer

Un contexte Docker local est exigé (socket unix ou canal Windows), puis fixé explicitement dans chaque appel. Les images sont construites depuis Git sous `.local/sources/`, sans modification du dossier `solver/`.

```powershell
node scripts/mesures/mot-02/mesurer.mjs construire comparaison
```

Premier essai, budget de cinq secondes ; il peut légitimement produire un planning incomplet, avec code de sortie 1. Il ne compte jamais dans la série :

```powershell
node scripts/mesures/mot-02/mesurer.mjs fumee comparaison
```

Série principale, séquentielle : pour chaque version, chauffe demandée de 60 s hors résultats, puis trois passages demandés de 600 s sur un conteneur neuf. Le solveur conserve son arrêt anticipé existant, après 20 s sans amélioration au plus. Chaque demande a une garde externe à 660 s ; le démarrage a son délai séparé de 90 s.

```powershell
node scripts/mesures/mot-02/mesurer.mjs serie comparaison
```

Le profil principal `vps` vérifie les limites réellement appliquées : 640 Mio, 1,5 CPU, mémoire et échange total égaux à 640 Mio (aucun échange), tas Java à 70 %, un calcul à la fois. Un jeton éphémère passe par l'environnement, jamais par les arguments affichés. Le port est aléatoire et lié à `127.0.0.1`.

Série facultative au profil général, séparée :

```powershell
node scripts/mesures/mot-02/mesurer.mjs serie comparaison general
```

`avant` ou `apres` peut remplacer `comparaison`. Une série complète peut prendre plus d'une heure. Ne pas lancer plusieurs séries à la fois. Les limites du conteneur ne réservent pas toute la machine ; les autres activités du poste peuvent influencer les résultats.

## Lire les résultats

Le pilote affiche le dossier `.local/serie-...`. Il conserve les requêtes exactes, réponses, compteurs, journaux, synthèse et métadonnées locales. `.local/` est ignoré par Git. Les journaux sont utiles même si le calcul échoue.

Le temps principal va du POST au retour final, analyse comprise ; le démarrage reste séparé. La durée d'une observation inclut la réponse API et la sonde cgroup exécutées ensemble ; c'est une borne supérieure conservatrice de la réception API. La première solution faisable est **observée**, avec une résolution demandée d'une seconde : ce n'est pas un instant exact interne du moteur. Une sonde lente est conservée dans ses horodatages, sans recouvrement avec la suivante.

Les compteurs cgroup v2 donnent usage, cache, pic natif du conteneur et CPU. Le pic peut inclure son démarrage ; le maximum échantillonné ne prouve pas un pic entre sondes. Une donnée manquante reste `null`. L'absence d'OOM du conteneur n'exclut pas une exception de tas Java : examiner aussi les journaux et le résultat moteur.

Un score nul ne suffit pas : toutes les leçons doivent être présentes une seule fois, avec des affectations connues. Les réponses finales non initialisées, partielles ou sans analyse sont des échecs. Dur est une pénalité, pas un décompte brut ; les occurrences sont celles de `violations`. Un score dur/moyen négatif reste un résultat non faisable, même si la réponse est complète.

L'extracteur crée une synthèse sans identifiants du poste ; remplacer les deux chemins ci-dessous par le dossier affiché et la destination souhaitée :

```powershell
node scripts/mesures/mot-02/extraire-resultats.mjs scripts/mesures/mot-02/.local/serie-EXEMPLE scripts/mesures/mot-02/.local/rapport.json
```

Il conserve les échecs, les pics mémoire et les compteurs de vitesse présents dans les journaux. Ne pas comparer directement un score ancien à un score contenant des règles nouvelles. Les entrées de la comparaison avant/après MOT-12 sont identiques ; les différences de mode de Timefold sont celles du produit, jamais remplacées par le banc.

**EP-10 applicative non démontrée par ce banc.** Le solveur travaille une semaine type ; ce protocole ne certifie pas le déploiement sur les dates, les volumes applicatifs, ni les conflits individuels de groupes transversaux.

## Ressources et interruption

Le retrait normal vérifie le label de session avant de supprimer son conteneur. Il ne purge ni images, ni volumes, ni ressources d'autres projets. Une interruption forcée du processus peut laisser le conteneur de son passage : relever son nom et son label avant de le retirer. Les images et `.local/` restent pour la relecture. Ne jamais lancer de purge globale pour nettoyer ce banc.
