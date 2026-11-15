# Mission · EXP-02a · Branchement Traefik, sans lancer Planner

| | |
|---|---|
| État | ouverte |
| Agent | agent de Cursor |
| Modèle recommandé | un modèle fort (Claude Opus 5.5 dans Cursor, ou l'équivalent) : configuration du proxy d'un serveur partagé, où une erreur expose ou coupe n8n |
| Attribuée le | 2026-11-15, par le coordinateur ; accord du chef : oui, le 2026-11-15 |
| Module et chantier | [EXP](../modules/EXP-exploitation.md) · chantier ouvert avant le 9 novembre |
| Fonction | EXP-02a : préparer l'installation à côté de n8n (surcharge Compose, labels Traefik, procédure), **sans démarrer aucun conteneur** · partie d'EXP-02 (L) |
| Branche | `feat/exp-02a-traefik`, partie de `feat/exp-01-reconnaissance` (#172, **fusionnée le 15 nov.**) |
| Dossier de travail | `..\travaux-planner\exp-02a-traefik` |
| Plan de conception | `docs/conception/exploitation/conception-exp-02a-traefik.md`, écrit par l'agent de Cursor le 15 novembre, **non commité** · **validé par le chef le 2026-11-15**, avec les trois remarques ci-dessous |

## Critère de « terminé »

Recopié du § 1 du plan :

- `docker compose … config` accepte la surcharge VPS et Traefik (commande sèche, jamais `up`) ;
- `DEPLOIEMENT.md` décrit Debian, l'utilisateur, Traefik, et interdit le profil Compose `cpu` (Ollama) ;
- le Caddy de Planner n'a aucun port public dans la surcharge ;
- n8n n'est pas redémarré : cette étape ne se connecte pas au serveur.

## Périmètre d'écriture

L'agent peut modifier :

- `docs/conception/exploitation/conception-exp-02a-traefik.md`, `docs/conception/README.md`
- `deploy/vps/docker-compose.vps.yml`
- `DEPLOIEMENT.md`
- `docs/plan/decisions.md` (Q-11 tranchée), `docs/plan/modules/EXP-exploitation.md`, sa ligne de `docs/plan/suivi.md`, sa fiche de session

L'agent ne touche pas :

- `deploy/vps/Caddyfile.vps`, `deployer.sh`, tout secret, le DNS, B2 (hors 02a, d'après le plan)
- le serveur : **aucune commande sur le serveur** dans cette étape
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Les quatre réponses du chef du 15 novembre, au § 3 du plan : noms publics gardés (Q-11), reprise des données par la sauvegarde B2 (en 02b), labels Traefik sur Caddy avec le réseau externe de n8n, découpe en 02a (fichiers) et 02b (mise en ligne).
- Décision du 15 novembre : ne jamais relancer le profil Compose `cpu`.

## Remarques du coordinateur sur le plan, à régler avant la validation

1. Le plan cite les trois noms publics au motif qu'ils sont déjà dans le dépôt (`nginx-hestim.conf`, `generer-env.sh`). À garder hors des fichiers nouveaux autant que possible : la surcharge les lit de `.env.docker` par interpolation. `node scripts/verifier-neutre.mjs` ne contrôle pas `deploy/`, donc la relecture le vérifiera à la main.
2. Le plan dit « validé en attente » : rien n'est commité. Le premier commit de la branche est le plan seul, une fois validé, avec `suivi.md` à « en cours ».
3. La branche part d'EXP-01, qui est fusionnée : fusionner `origin/main` avant le premier commit, pour partir d'une base à jour.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| C-1 | Valider le plan EXP-02a (`conception-exp-02a-traefik.md`) ? | **validé par le chef le 15 nov.**, avec les trois remarques | réglé |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : EXP-02a (branchement Traefik, sans lancer Planner), chantier EXP,
puis le correctif de la PR #177 (docs/plan/missions/fix-exp-sauvegarde.md).
Choisis d'abord le modèle : ta fiche recommande un modèle fort (Claude Opus 5.5 ou l'équivalent) ;
s'il ne tourne pas, dis au chef lequel choisir, et note ton modèle dans ta fiche de session.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/exp-02a.md (sur main, ou sur la branche
chore/coordination-agents si elle n'est pas fusionnée), et la recette docs/recette/serveur-2026-11.md.
Branche : feat/exp-02a-traefik, dans le dossier ..\travaux-planner\exp-02a-traefik.
Ton plan docs/conception/exploitation/conception-exp-02a-traefik.md n'est pas commité :
applique les trois remarques du coordinateur (fiche de mission). Le chef a validé le plan le 15 novembre :
écris « Validé par Claude20022002 le 2026-11-15 » en tête. Puis fusionne origin/main dans la branche, commite le plan seul avec suivi.md
à « en cours », puis suis le § 9 du plan.
Tu ne lances aucune commande sur le serveur et jamais docker compose up ; seulement docker compose config en local.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; ni adresse ni secret
dans le dépôt ; fiche de session et suivi.md à jour en fin de session ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | mission écrite ; plan lu, non commité | au chef (validation du plan) |
| 2026-11-15 | tour d'état de 13 h 15 : plan validé par le chef, mais rien de neuf sur la branche ; l'agent de Cursor n'a pas démarré (sa fiche n'est pas encore sur `main` : #175 ouverte) | — |
