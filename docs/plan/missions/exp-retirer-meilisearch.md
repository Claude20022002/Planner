# Mission · correctif EXP · retirer le Meilisearch de StudyLib

| | |
|---|---|
| État | ouverte : plan court à écrire, **validé par le chef** (serveur) |
| Agent | agent de Cursor (répartition du chef, 21 nov.) |
| Modèle recommandé | un modèle moyen (« Auto » accepté par le chef pour le travail court, 21 nov.) : correctif S, borné, sans code applicatif |
| Attribuée le | 2026-11-22, par le coordinateur ; accord du chef : oui, le 21 nov. (§ 8 de l'étude StudyLib ; Q10 : « oui, par un correctif à part ») |
| Module et chantier | [EXP](../modules/EXP-exploitation.md) · chantier ouvert |
| Fonction | correctif : retirer le conteneur Meilisearch **de StudyLib**, qui tourne en production avec 256 Mo sans servir (aucun appel dans StudyLib, recherche en `LIKE`) · taille S |
| Branche | `fix/exp-retirer-meilisearch`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\exp-retirer-meilisearch` |
| Plan de conception | plan court à écrire : `docs/conception/exploitation/fix-exp-retirer-meilisearch.md` · validé par **le chef** (il touche le serveur) |

## Ce que dit l'étude

[Étude StudyLib](../../conception/bibliotheque/etude-studylib-pile.md) (branche `etude/bib-studylib-pile`), § 1.4 et § 5 (« Sans attendre ») : Laravel Scout n'est pas installé, aucun fichier PHP n'appelle Meilisearch ; le conteneur tourne pourtant (`deploy/vps/docker-compose.vps.yml`, l. 148 à 152) et sa clé est exigée par StudyLib (`docker-compose.yml`, l. 216 et 217). Le correctif vaut quelle que soit la voie.

## Critère de « terminé »

- Plus aucune trace du Meilisearch **de StudyLib** dans `docker-compose.yml` (service `meilisearch`, volume `meili_data`, variables `MEILISEARCH_HOST` et `MEILISEARCH_KEY` du service StudyLib), `deploy/vps/docker-compose.vps.yml`, `deploy/vps/generer-env.sh` et `.env.docker.example` (`MEILI_MASTER_KEY`).
- **`quiz-meilisearch` (ClassQuiz) n'est pas touché** : il part avec QJE-06.
- `docker compose config` passe sur les deux fichiers, avec un `.env.docker` d'exemple sans `MEILI_MASTER_KEY`.
- `README.md` (schéma, l. 134 ; liste, l. 322) et la vue d'ensemble de l'architecture (`docs/architecture/vue-d-ensemble/`) ne montrent plus ce Meilisearch.
- Le plan donne au chef la **procédure du serveur**, pas à pas : arrêter et retirer le conteneur, et ce qu'on fait du volume. Le chef la lance ; l'agent ne lance rien sur le serveur.
- `node scripts/verifier-neutre.mjs` passe.

## Périmètre d'écriture

L'agent peut modifier :

- `docker-compose.yml`, `deploy/vps/docker-compose.vps.yml`, `deploy/vps/generer-env.sh`, `.env.docker.example` : les lignes du Meilisearch de StudyLib seulement
- `README.md` : les deux lignes citées
- `docs/architecture/vue-d-ensemble/` : la tuile de ce Meilisearch (source et page produite, par son script s'il existe)
- `docs/conception/exploitation/fix-exp-retirer-meilisearch.md`, le fichier du module EXP (« Ce qui existe ») et sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `quiz-meilisearch` et tout ce qui sert ClassQuiz
- le dépôt `..\StudyLib` (lecture seule)
- tout le reste : s'il doit en sortir, il s'arrête et le demande

Aucune PR ouverte ni branche en cours ne touche ces fichiers (relevé du 22 nov.).

## Ce qui est déjà décidé

- Voie B pour la Bibliothèque ; Meilisearch retiré sans attendre, par un correctif à part (chef, 21 nov., Q10).
- Le serveur est au chef : il lance les commandes, l'agent les écrit.
- Rien de réel dans le dépôt public : aucune clé, aucune adresse du serveur.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Le volume `meili_data` du serveur | garder le volume jusqu'à la sauvegarde suivante vérifiée, puis le supprimer : la commande de suppression est la dernière étape de la procédure, lancée par le chef | chef, dans le plan |
| 2 | La page produite de la vue d'ensemble | la régénérer par son script ; s'il n'y en a pas, modifier la source et la page à la main, et le dire | coordinateur |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : correctif EXP, retirer le Meilisearch de StudyLib (inutilisé), chantier EXP.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md (branche doc/coordination-equipe),
puis ta fiche de mission docs/plan/missions/exp-retirer-meilisearch.md, puis l'étude
docs/conception/bibliotheque/etude-studylib-pile.md (branche etude/bib-studylib-pile), § 1.4 et § 5.
Branche : fix/exp-retirer-meilisearch, depuis origin/main, dans ..\travaux-planner\exp-retirer-meilisearch.
Tu n'écris que dans le périmètre de la fiche ; quiz-meilisearch (ClassQuiz) n'est pas touché. S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris le plan court docs/conception/exploitation/fix-exp-retirer-meilisearch.md, avec la procédure du serveur
pour le chef et les questions 1 et 2 de la fiche ; le chef le valide (serveur) ; commite-le seul, puis code.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; tu ne lances rien sur le serveur ;
fiche de session à jour, suivi.md non modifié ; tout est commité ; jamais de git push. Rapport dans ta boîte (sortie\) à chaque étape.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-22 | fiche écrite par le coordinateur, d'après le § 8 de l'étude StudyLib (répartition validée par le chef le 21 nov.) | — |
