# Mission · PLA-06 · Mesure de D-01 (200 bases sur un serveur)

| | |
|---|---|
| État | ouverte |
| Agent | Codex (VS Code) |
| Attribuée le | 2026-11-15, par le coordinateur ; accord du chef : oui, le 2026-11-15 |
| Module et chantier | [PLA](../modules/PLA-plateforme.md) · chantier ouvert le 2026-11-09 |
| Fonction | PLA-06 : rapport chiffré qui confirme ou rouvre D-01 (une base par école) · taille M |
| Branche | `etude/pla-06-mesure-d01`, PR #164 en brouillon (déjà poussée : **pas de rebase**) |
| Dossier de travail | `..\travaux-planner\pla-06-mesure-d01` |
| Plan de conception | `docs/conception/plateforme/pla-06-mesure-d01.md`, sur la branche · **validé par le chef le 2026-11-10** |

## Critère de « terminé »

Recopié du fichier du module : rapport chiffré ; D-01 confirmée ou rouverte dans `decisions.md`. C'est **le chef** qui inscrit la conclusion (étape 8 du plan). La confirmation de la pile (QUA-03, #171) en dépend.

## Où en est la branche

Étapes 1 à 5 du plan faites (banc codé, essayé sur 3 écoles le 10 novembre). Restent :

- étape 6 : les séries (3 réglages, MySQL à 1, 2 et 4 Go, environ 8 h de machine) ;
- étape 7 : vérification P-13 sur le serveur, **par le chef**, pendant EXP-02 ;
- étape 8 : le rapport `docs/conception/plateforme/19-mesure-d01.md`.

## Périmètre d'écriture

L'agent peut modifier :

- `scripts/mesures/pla-06/` (tout le dossier)
- `.gitignore` (les deux lignes du plan seulement)
- `docs/conception/plateforme/pla-06-mesure-d01.md` (ses écarts seulement) et `docs/conception/plateforme/19-mesure-d01.md` (le rapport, créé)
- sa ligne de `docs/plan/suivi.md`, `docs/plan/modules/PLA-plateforme.md` (ce qui existe), sa fiche de session

L'agent ne touche pas :

- `backend/`, `frontend/`, `mobile/`, `solver/`, `deploy/` : le banc lit le code, il ne le change pas
- `docs/plan/decisions.md` : la conclusion sur D-01 est écrite par le chef
- tout le reste : s'il doit en sortir, il s'arrête et le demande

Les résultats bruts restent hors du dépôt ; seuls les résumés chiffrés vont dans le rapport. Ni adresse ni nom de machine dans le dépôt.

## Questions en attente

Elles **bloquent l'étape 6**. Tant qu'elles n'ont pas de réponse, l'agent ne lance aucune série : il fusionne `origin/main`, relance les tests purs du banc et prépare la commande de série.

| N° | Question | Proposition (de la fiche du 10 novembre) | À qui |
|---|---|---|---|
| P-22 | Piloter une série depuis le PC Windows par SSH vers le PC Ubuntu ? | oui, si le chef donne l'accès ; sinon le chef lance la série sur le PC Ubuntu avec la commande préparée | chef |
| P-23 | Prérequis du PC Ubuntu : cœurs, Docker, Node 22, même réseau local (4 Go de mémoire et 1 To déjà connus) | à relever par le chef | chef |
| P-25 | Par quoi et quand la machine provisoire sera-t-elle remplacée, pour la série de confirmation ? | — | chef |
| P-20, P-21 | Mémoire d'échange du serveur, pics de n8n | à relever pendant EXP-02 | chef |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : PLA-06 (mesure de D-01, 200 bases sur un serveur), chantier PLA.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/pla-06.md (sur main, ou sur la branche
chore/coordination-agents si elle n'est pas fusionnée), le plan
docs/conception/plateforme/pla-06-mesure-d01.md et la fiche
docs/sessions/2026-11-10-etude-pla-06-mesure-d01.md, sur la branche.
Branche : etude/pla-06-mesure-d01 (PR #164), dans le dossier ..\travaux-planner\pla-06-mesure-d01.
Elle est déjà poussée : fusionne origin/main dedans, jamais de rebase.
Le plan est validé ; les étapes 1 à 5 sont faites. Ne lance aucune série (étape 6) tant que
le chef n'a pas répondu à P-22 et P-23 : d'ici là, relance les tests purs du banc
(scripts/mesures/pla-06/tests) et prépare la commande exacte de la première série.
Tu n'écris que dans le périmètre de la fiche ; tu ne modifies ni backend/ ni decisions.md.
S'il faut en sortir, arrête-toi et demande.
Règles : questions avant toute supposition ; aucune adresse ni nom de machine dans le dépôt ;
fiche de session et suivi.md à jour en fin de session ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | mission écrite ; CI de #164 verte (dernier passage) | — |
