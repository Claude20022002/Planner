# Session du 2026-11-15 · EXP-01 · `feat/exp-01-reconnaissance`

| | |
|---|---|
| Fait par | Cursor Grok 4.6 |
| Chantier | EXP |
| Dossier de travail | `..\travaux-planner\exp-01-reconnaissance` |
| Dernier commit | voir `git log -1 feat/exp-01-reconnaissance` |

## Objectif de la session

Reconnaissance du nouveau serveur (n8n, Traefik, ports, mémoire) et prérequis (dépôt à jour, ClassQuiz et StudyLib), **sans lancer Planner**.

## Plan

[conception-exp-01-reconnaissance.md](../conception/exploitation/conception-exp-01-reconnaissance.md), validé le 15 novembre par l’autorisation des commandes serveur pour cette session.

## Fait

- Photo n8n avant, lecture os / CPU / mémoire / disque / ports / Compose.
- `git pull --ff-only` de `/opt/hestim` : `da39c85` → `548c19e` (`origin/main`).
- ClassQuiz `hestim` `fcd121a` et StudyLib `main` `a834980` déjà à jour.
- Photo n8n après : mêmes identifiants et mêmes heures de démarrage.
- Aucun conteneur Planner.
- Recette : [serveur-2026-11.md](../recette/serveur-2026-11.md).
- Ollama retiré (conteneurs, volume ~47 Go, image) : mémoire disponible 6,5 Gio, disque 8 % ; n8n toujours 200, mêmes id.

## Vérifié

- n8n, n8n-postgres-1, n8n-traefik-1 : id et `startedAt` identiques.
- `docker ps -a` : aucun nom `hestim` ni `planner`.
- Recette sans adresse ni secret.
- `node scripts/verifier-neutre.mjs` : à lancer au commit.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Commandes serveur par l’agent | oui, cette session | réglé |
| 3 | Retirer Ollama | oui, 15 nov. | réglé |

## État laissé

- `docs/plan/suivi.md` : EXP-01 → en cours, branche `feat/exp-01-reconnaissance`
- Chantier EXP : reste 5 fonctions ; EXP-01 prête à la PR

## Reste à faire, dans l’ordre

1. Le chef pousse la branche et ouvre la PR.
2. EXP-02 : installation à côté de Traefik ; Q-11. Ne pas relancer `docker compose --profile cpu up` (Ollama reviendrait).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\exp-01-reconnaissance" push -u origin feat/exp-01-reconnaissance
gh pr create --base main --head feat/exp-01-reconnaissance --title "EXP-01 : reconnaissance du nouveau serveur" --fill
```

## Prompt de reprise

EXP-01 est écrite (recette du 15 nov.). Ollama est retiré. Personne n’a lancé Planner. Pour EXP-02 : lire `docs/recette/serveur-2026-11.md`, concevoir le branchement Traefik (Caddy sans port public), trancher Q-11. Ne pas relancer le profil Compose `cpu`.
