# Mission · PLA-06 · Mesure de D-01 (200 bases sur un serveur)

| | |
|---|---|
| État | ouverte |
| Agent | Codex (VS Code) |
| Modèle recommandé | le modèle de code le plus fort de Codex, effort de raisonnement élevé : une erreur du banc peut faire tomber n8n sur le serveur partagé |
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

**Réponse du chef du 15 novembre : pour le moment, seul le serveur sert de machine.** Le PC Ubuntu n'est pas employé ; P-22, P-23 et P-25 sont sans objet. Cela change le § 4 du plan (où et comment une série tourne) : l'agent **amende le plan** pour une mesure sur le serveur partagé avec n8n, et le fait **revalider par le chef** avant toute série.

L'amendement doit dire, au moins :

- un projet Compose à part, avec des limites de mémoire et de processeur qui laissent sa marge à n8n (recette `docs/recette/serveur-2026-11.md`) ; aucun réseau partagé avec n8n ; aucun port public ;
- une photo de n8n avant et après chaque série (identifiants et heures de démarrage des conteneurs inchangés), comme pour EXP-01 ;
- l'arrêt de la série si n8n ralentit, et le nettoyage complet à la fin (conteneurs, volume des 200 bases) ;
- l'ordre avec EXP-02b : la mesure se fait avant que Planner tourne sur le serveur, ou dans une fenêtre convenue ;
- **c'est le chef qui lance les commandes sur le serveur** : l'agent les prépare, une à une.

Restent ouvertes :

| N° | Question | Proposition (de la fiche du 10 novembre) | À qui |
|---|---|---|---|
| P-20, P-21 | Mémoire d'échange du serveur, pics de n8n | à relever pendant EXP-02 | chef |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : PLA-06 (mesure de D-01, 200 bases sur un serveur), chantier PLA.
Choisis d'abord le modèle : ta fiche recommande le modèle de code le plus fort, effort élevé ;
s'il ne tourne pas, dis au chef lequel choisir, et note ton modèle dans ta fiche de session.
Le chef a validé l'amendement du § 4 et A-3 ; le coordinateur a réglé A-2 (fiche de mission, Suivi) :
inscris A-2 dans le plan et intègre la sonde témoin à la garde du banc.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/pla-06.md (sur main, ou sur la branche
chore/coordination-agents si elle n'est pas fusionnée), le plan
docs/conception/plateforme/pla-06-mesure-d01.md et la fiche
docs/sessions/2026-11-10-etude-pla-06-mesure-d01.md, sur la branche.
Branche : etude/pla-06-mesure-d01 (PR #164), dans le dossier ..\travaux-planner\pla-06-mesure-d01.
Elle est déjà poussée : fusionne origin/main dedans, jamais de rebase.
Le plan est validé ; les étapes 1 à 5 sont faites. Le chef a décidé le 15 novembre que seul le serveur
sert de machine : amende le § 4 du plan comme le dit ta fiche de mission, relance les tests purs
du banc (scripts/mesures/pla-06/tests), puis fais revalider le plan par le chef. Aucune série avant
ce « validé ». Tu ne lances aucune commande sur le serveur : tu les prépares, le chef les lance.
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
| 2026-11-15 | tour d'état de 13 h 15 : Codex a fusionné `origin/main` (`5f4153a`), proposé le protocole sur le serveur (`311c0ba`, `a754a4b`), puis inscrit « amendement du § 4 validé par Claude20022002 le 2026-11-15, répartition A-3 validée » (`7794d34`). Enveloppe : MySQL 2 Gio, Node 1 Gio, hôte 512 Mio, 2,5 processeurs, arrêt sous 1 Gio libre, palier 4 Gio suspendu. Code du banc en cours, non commité (`lancer.sh`, `arreter.sh`, `lib/protection.mjs`…) | **au chef** : confirmer que la validation inscrite est la sienne ; A-2 (créneau, témoin n8n) à fournir |
| 2026-11-15 | **le chef confirme** : c'est lui qui a validé l'amendement du § 4 et la répartition A-3 auprès de Codex | validation acquise ; A-2 attend toujours le chef |
| 2026-11-15 | **A-2 réglé par le coordinateur, par délégation du chef** : témoin = sonde en lecture seule de l'adresse de santé de n8n toutes les 15 s, référence prise sur 10 min avant la série ; arrêt sur une réponse en échec ou une durée médiane sur une minute au double de la référence ; aucun traitement n8n créé ni lancé. Créneau : au lancement par le chef, avant EXP-02b, hors des heures où il sait que n8n travaille | — |
