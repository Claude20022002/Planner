# Recette du nouveau serveur — 15 novembre 2026

Reconnaissance EXP-01. **Aucune adresse, aucun secret.** Planner n’a pas été lancé.

## Machine

| Mesure | Valeur |
|---|---|
| Système | Debian 12 (bookworm), noyau 6.1 cloud amd64 |
| Processeurs | 4 (modèle Haswell virtuel, 1 fil par cœur) |
| Mémoire | 7,6 Gio ; **pas d’échange (swap)** |
| Disque | 75 Go, ext4 ; **5,5 Go utilisés, 66 Go libres (8 %)** après retrait d’Ollama (était 81 %) |
| Compte | `debian` (groupes `debian` et `docker`) ; `sudo` sans mot de passe |
| Pare-feu ufw | absent |

Docker Engine **29.4.3**, Compose **v5.1.3**, pilote overlayfs, cgroup v2. Aucune limite mémoire ni CPU posée sur les conteneurs déjà là.

## n8n et le proxy (photo avant)

Relevé à 09:31 UTC. Les mêmes identifiants et heures de démarrage valent après le `git pull` (09:32 UTC).

| Conteneur | Image | État | Ports publiés | Démarré |
|---|---|---|---|---|
| n8n | n8nio/n8n:latest | Up 10 jours | 5678 | 4 nov. 20:49 UTC |
| n8n-postgres-1 | postgres:16-alpine | Up 10 jours (healthy) | interne 5432 | 4 nov. 20:49 UTC |
| n8n-traefik-1 | traefik | Up 10 jours | **80 et 443** | 4 nov. 20:49 UTC |
| qdrant | qdrant/qdrant | Up 10 jours | 6333 | 4 nov. 20:49 UTC |

Identifiants courts inchangés : `7cda6108b15b` (n8n), `41cf4e5d9b3a` (postgres), `ecb14ddefce1` (Traefik).

**Ollama retiré le 15 novembre 2026** (décision du 11 nov., appliquée) : conteneurs `ollama` et `ollama-pull-llama` supprimés, volume `n8n_ollama_storage` (~47 Go) et image `ollama/ollama:latest` (~8 Go) effacés. Port 11434 fermé. Aucun workflow n8n nommé dans la base. n8n répond 200 sur 5678, **mêmes id et mêmes heures de démarrage**. Mémoire disponible : **6,5 Gio** (était 2,9 Gio). Le compose n8n contient encore les services `ollama-*` derrière le profil `cpu` : ne pas relancer `docker compose --profile cpu up`.

Compose n8n : `/home/debian/n8n/docker-compose.yml`. Réseau Docker `n8n_default`. Traefik lit le socket Docker, expose 80/443, redirige HTTP vers HTTPS, certificats ACME. nginx, Caddy et Apache **hôte** : inactifs. Aucun fichier de site dans `/etc/nginx/sites-enabled`.

Ports d’écoute de l’hôte : 22 (sshd), 80, 443, 5678, 6333, plus le résolveur systemd.

## Prérequis code

| Chemin | Dépôt | Branche | Commit après EXP-01 |
|---|---|---|---|
| `/opt/hestim` | plan_B_projet_PACTE | `main` | `548c19e` (était `da39c85` du 7 nov. ; fast-forward, 63 commits) |
| `/opt/ClassQuiz` | ClassQuiz | `hestim` | `fcd121a` (déjà à jour) |
| `/opt/StudyLib` | StudyLib | `main` | `a834980` (déjà à jour) |

Git 2.39.5. Dossier `/opt/hestim/secrets` : root seulement, non lu. Aucun `.env.docker` de production listé hors exemple.

## Planner

Aucun conteneur dont le nom contient `hestim` ou `planner`, ni avant ni après.

## Ce que EXP-02 devra traiter

1. **Proxy** : Traefik de n8n tient 80 et 443. Le Caddy de Planner doit rester **sans port public** (`172.17.0.1:8090` dans `docker-compose.vps.yml`). Brancher par **labels Traefik** et/ou réseau `n8n_default`, pas par un nginx d’hôte (le commentaire actuel du fichier VPS parle encore de FinAdminTech).
2. **Mémoire** : Ollama n’est plus là ; environ 6,5 Gio disponibles. Suffisant pour poser les limites du fichier VPS.
3. **Disque** : 66 Go libres (8 %). Les images Planner tiendront.
4. **Pas d’échange.** Un pic mémoire tuera des processus.
5. **Q-11** : nom de domaine toujours ouvert.
6. **Ne pas** réinstaller ni mettre à jour Docker : n8n redémarrerait.
7. Les scripts VPS supposent souvent `root` ; ici tout passe par `debian` + `sudo` + groupe `docker`.
