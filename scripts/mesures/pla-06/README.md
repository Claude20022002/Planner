# Banc PLA-06 — serveur unique partagé avec n8n

Le [plan, § 4](../../../docs/conception/plateforme/pla-06-mesure-d01.md), A-3 et la sonde A-2 sont validés directement par le chef le 15 novembre.
**Seul le chef exécute les commandes serveur**, une par une, dans un dossier de travail distinct de l'installation Planner.
Le protocole à deux machines est remplacé : aucun SSH/SCP dans le pilote, aucun accès public au banc.

## Avant toute exécution

Le chef confirme le créneau **avant EXP-02b**, l'absence de Planner et les traitements lourds n8n (P-21).
Le témoin A-2 est une sonde GET de santé n8n en lecture seule, configurée hors Git. Le chef contrôle aussi manuellement la réactivité de n8n avant, pendant et après chaque action.
Les photos des conteneurs ne remplacent pas ce contrôle. Aucun essai tant que ces prérequis ne sont pas réunis.

Ressources : MySQL 1 ou 2 Gio et 1 processeur ; Node 1 Gio et 1 processeur ;
pilote, charge et relevés ensemble 512 Mio et 0,5 processeur.
Le palier MySQL de 4 Gio est suspendu. Les services existants ne sont jamais modifiés.
MySQL est interne au réseau du projet ; HTTP n'écoute que sur la boucle locale ; Traefik est désactivé pour les conteneurs du banc.

Il faut Linux avec cgroup v2, Node 22, Docker Engine, Compose et systemd-run.
Le compte habituel doit pouvoir utiliser Docker et sudo. Aucun Docker distant ni surcharge de contexte.
Les images doivent être **déjà présentes** : le pilote ne télécharge aucune image.
Si Node ou une image manque, retourner au chef pour préparer cette dépendance dans une fenêtre convenue ;
ne pas réinstaller Docker et ne pas improviser une commande d'installation.

## Reconnaissance — chaque bloc séparément

Dans le terminal du serveur, sans lancer Planner :

```bash
free -h
```

```bash
swapon --show
```

```bash
nproc
```

```bash
df -h / /var/lib/docker
```

```bash
node --version
```

```bash
docker compose version
```

```bash
docker image inspect mysql:8.4.13 node:22-bookworm-slim --format '{{.Id}}'
```

Les retours bruts, identifiants, chemins et informations d'accès restent hors Git.
Le chef se place ensuite dans `scripts/mesures/pla-06` de sa copie de la branche.
Il vérifie le commit attendu avant toute action ; aucun changement de branche dans l'installation Planner.

## Lanceur et protections

Chaque action passe par `bash lancer.sh`. Il crée le service transitoire `planner-mesure-pla06-hote`,
avec CPUQuota=50%, MemoryMax=512M et MemorySwapMax=0.
MySQL et Node ont leurs propres plafonds Compose ; les volumes de dépendances évitent toute écriture dans `backend/`.
L'installation est exécutée seule ; la préparation n'ajoute pas un serveur Node concurrent ;
la migration d'étude utilise le conteneur existant.

Le pilote refuse un groupe non limité, une autre action en cours, une photo manquante ou modifiée.
Toutes les 5 secondes, sans observations concurrentes, il contrôle la mémoire et les services protégés.
Une erreur de lecture, une mémoire disponible sous 1 Gio, l'échange actif, un changement d'état, de démarrage ou un OOM arrête le banc.
Le service systemd possède aussi un arrêt final ciblé, y compris si le groupe hôte est tué.
Les contrôles mémoire et arrêt du service doivent être éprouvés sur le serveur avant les mesures.
Le test `verifier-gardes` injecte un incident ; il n'épuise pas la mémoire de la machine.

Initialiser les secrets, sans les afficher :

```bash
bash lancer.sh initialiser
```

Configurer la sonde par saisie interactive, sans mettre l'URL dans une commande versionnée :

```bash
bash lancer.sh configurer-sonde
```

L'URL doit viser la boucle locale et la vraie route de santé n8n. Elle reste dans `.local/sonde.json`.
Aucun identifiant dans l'URL ; aucune requête à ce stade. Le chef fournit cette URL sans la publier.

Créer la photo initiale de tous les conteneurs existants en service, hors projet de mesure :

```bash
bash lancer.sh photo
```

Vérifier localement que `.local/proteges.json` couvre bien n8n, sa base, le proxy et Qdrant.
Le pilote compare ensuite exactement ces identifiants et heures de démarrage.
Ne pas effacer ni recréer cette référence pour contourner une différence : arrêter et expliquer le changement.

Avant chaque installation, préparation et série, le pilote établit automatiquement une référence pendant **10 minutes sans charge** :
40 mesures espacées de 15 s. Toute erreur HTTP, réseau ou délai annule le lancement.
La sonde exige HTTP 2xx sans redirection, avec un délai maximal de 5 s.
Pendant la charge, elle continue toutes les 15 s : un échec ou une médiane des 4 dernières mesures atteignant
le double de la référence déclenche l'arrêt ciblé. La garde mémoire et les photos restent actives pendant la référence.
Le journal `sonde.jsonl` et le résumé `serie.json` n'enregistrent pas l'URL et restent hors Git.
La santé HTTP ne prouve pas le bon fonctionnement de tous les workflows n8n ; cette limite figure dans le rapport.

Après confirmation de la fenêtre et du témoin :

```bash
bash lancer.sh verifier-gardes --fenetre-confirmee --temoin-verifie --nom garde-initiale
```

Le bilan `resultats/garde-initiale/serie.json` doit indiquer `garde_exercee: true` :
c'est un arrêt volontaire, donc un bilan invalide attendu, sans série ni conteneur lancé.
Vérifier aussi le contrôle n8n après et l'absence de conteneur de mesure restant.

## Installation et petit essai — chef uniquement, après retour des prérequis

Installer les dépendances dans le volume dédié (aucune installation sur l'hôte) :

```bash
bash lancer.sh installer --fenetre-confirmee --temoin-verifie --nom installation
```

Préparer d'abord 10 écoles :

```bash
bash lancer.sh preparer --ecoles 10 --fenetre-confirmee --temoin-verifie --nom preparation-essai
```

Contrôler le bilan d'action et le fichier `resultats/preparation-….json` : `controles_ok` doit être vrai.
Contrôler manuellement n8n après chaque action. Les données sont fictives ; les résultats restent hors Git.

```bash
bash lancer.sh serie --nom essai-local --ecoles-banc 10 --ecoles 2 --utilisateurs 2 --froides 2 --duree 60 --repos 0 --fenetre-confirmee --temoin-verifie
```

Cet essai teste le fonctionnement, il ne conclut pas sur 200 écoles.
Examiner les journaux, les photos et les relevés ; le bilan reste invalide tant que le contrôle manuel après n'est pas confirmé.
Un incident de garde reste définitivement invalidant.

## Séries — après réussite du petit essai et accord du chef pour la fenêtre

Préparer les 200 écoles :

```bash
bash lancer.sh preparer --ecoles 200 --fenetre-confirmee --temoin-verifie --nom preparation-200
```

Vérifier `controles_ok`, puis lancer **une seule série**, observer n8n et examiner le résultat avant la suivante.
Exemple du réglage ajusté, palier de 2 Gio :

```bash
bash lancer.sh serie --nom ajuste-2g-p1 --reglage ajuste --mysql-memoire 2g --innodb 1g --rampe --migrations --fenetre-confirmee --temoin-verifie
```

Après le contrôle manuel n8n, confirmer explicitement :

```bash
bash lancer.sh confirmer --nom ajuste-2g-p1 --temoin-apres-verifie
```

Le pilote ne rend `valide: true` qu'après exécution complète, photos conformes, charge réussie,
relevés complets sans erreur, sonde A-2 complète et saine, et contrôle manuel après. Un essai réduit ne confirme pas la capacité.
Toute limitation CPU du groupe hôte pendant la charge invalide la capacité annoncée :
le générateur a pu limiter le débit. Une interruption brutale laisse un bilan invalide.

La matrice reste celle du plan : réglages production, ajusté, défaut aux paliers autorisés 1 et 2 Gio ;
trois passages pour le réglage retenu ; modes a et b ; comparaison avec et sans tâches.
Au palier 1 Gio, tampon 512 Mio. Aucun palier 4 Gio.
Nom unique pour chaque action ; ne jamais écraser un résultat précédent.

## Arrêt d'urgence et nettoyage ciblé

Si n8n ralentit, le chef arrête immédiatement le service, depuis un second terminal :

```bash
sudo systemctl stop planner-mesure-pla06-hote.service
```

Autre signal manuel surveillé par le pilote (dans le dossier du banc) :

```bash
touch .local/ARRET
```

L'arrêt ne vise que les conteneurs ayant le label du projet `planner-mesure-pla06`, y compris les conteneurs ponctuels.
Vérifier les conteneurs protégés et le témoin n8n après arrêt. Ne pas relancer automatiquement.
Un arrêt brutal peut laisser `.local/verrou` ; ne le retirer qu'après vérification par le chef que le service est inactif
et qu'aucun conteneur du banc ne tourne. Même règle pour `.local/ARRET`.

À la fin de la fenêtre :

```bash
bash lancer.sh nettoyer
```

Cette action supprime les conteneurs, le réseau et les volumes du **seul projet de mesure**, puis vérifie les photos.
Le chef conserve les résultats bruts hors Git, puis supprime les secrets locaux après exploitation :

```bash
rm -f -- .local/secrets.json .local/mesure.env
```

Vérifier l'absence de ressources restantes du projet :

```bash
docker ps -a --filter label=com.docker.compose.project=planner-mesure-pla06
```

```bash
docker volume ls --filter label=com.docker.compose.project=planner-mesure-pla06
```

```bash
docker network ls --filter label=com.docker.compose.project=planner-mesure-pla06
```

Aucun nettoyage global Docker. Aucun réseau, volume, conteneur ou profil des services existants n'est modifié.

## Vérifications locales sans serveur

```bash
node --test scripts/mesures/pla-06/tests/pur.test.mjs scripts/mesures/pla-06/tests/protection.test.mjs scripts/mesures/pla-06/tests/sonde.test.mjs
```

Ces tests couvrent les règles et la voie d'arrêt simulée. Ils ne prouvent pas l'exécution systemd,
le comportement réel de Docker ni l'absence de ralentissement n8n : ces contrôles sont réservés au chef.
Les fichiers `machines.exemple.json` et les fonctions de validation associées restent des traces de l'ancien protocole ;
le pilote serveur ne les lit pas.
