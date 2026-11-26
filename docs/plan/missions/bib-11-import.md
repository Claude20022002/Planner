# Mission · BIB-11 · import générique d'un dossier de documents

| | |
|---|---|
| État | ouverte : **après BIB-06** (et BIB-08, dans l'ordre de l'étude) ; plan court d'abord |
| Agent | Alexis et son agent (répartition du chef, 21 nov.) |
| Modèle recommandé | le plus fort de son éditeur : import de fichiers en masse, contrôles, droits de l'administration |
| Attribuée le | 2026-11-22, par le coordinateur ; accord du chef : oui, le 21 nov. (§ 8 de l'étude StudyLib ; Q11) |
| Module et chantier | [BIB](../modules/BIB-bibliotheque.md) · exception hors chantier (chef, 21 nov.) |
| Fonction | BIB-11 (lot B8) : l'administration importe un dossier de documents dans la Bibliothèque, rangés par filière et par module, pour toute école ; remplace `studylib:import-drive` · taille M |
| Branche | `feat/bib-11-import`, depuis `origin/main` après la fusion de BIB-06 |
| Dossier de travail | à fixer avec Alexis : ses dossiers de travail sont sur son poste |
| Plan de conception | plan court à écrire : `docs/conception/bibliotheque/bib-11-import.md` · validé par **le coordinateur** (M, sans migration) ; s'il faut une migration ou un envoi sortant, il remonte au chef |

## Ce que dit l'étude

[Étude StudyLib](../../conception/bibliotheque/etude-studylib-pile.md) (branche `etude/bib-studylib-pile`) : § 1.5 (l'import Google Drive actuel, 482 lignes, par un compte de service), § 1.7 (il nomme l'école pilote), § 2.2 (lot B8), Q11 (« un import générique, valable pour toute école »).

## Critère de « terminé »

- L'administration importe un dossier (la forme, archive ou dossier choisi, est tranchée dans le plan) ; chaque document arrive par le service de BIB-06, avec ses règles (types, 20 Mo au plus, publication directe pour l'administration).
- Le rangement par filière et par module suit une règle écrite dans le plan ; un fichier qui ne la suit pas est refusé avec un message lisible, et la liste des refus est rendue.
- Rejouer le même import ne crée aucun doublon.
- Aucun appel à Google ni à un autre service extérieur, sauf décision du chef (EP-13) ; aucun nom d'école dans le code (EP-5).
- 404 hors de l'école ; un test à deux écoles ; un test d'un import avec des erreurs volontaires.

## Périmètre d'écriture

L'agent peut modifier :

- `backend/services/bibliotheque/import/` (dossier nouveau, réservé à BIB-11 dans le § 8 de l'étude)
- la route et le contrôleur de l'import (fichiers nouveaux) ; dans `backend/app.js`, des ajouts seulement
- `backend/tests/` : les tests de l'import
- si le plan prévoit un écran : un fichier nouveau sous `frontend/src/pages/bibliotheque/`, **après accord de Claude de VS Code par le coordinateur** (BIB-09 tient ce dossier)
- `docs/conception/bibliotheque/bib-11-import.md`, la ligne BIB-11 du module BIB, sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- le reste de `backend/services/bibliotheque/` : la session « BIB » ; un manque du service se demande par le coordinateur
- `frontend/src/` et `mobile/src/` hors du cas ci-dessus
- le dépôt `..\StudyLib` (lecture seule)
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Voie B ; exception hors chantier ; un import générique, valable pour toute école (chef, 21 nov., Q11).
- MinIO sert à tous les fichiers de Planner (Q12) ; le rangement par école vient de BIB-05.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | La forme de l'import : une archive ZIP déposée, ou un dossier du serveur | une archive ZIP déposée par l'administration, de taille plafonnée dans le plan | coordinateur, dans le plan |
| 2 | La règle de rangement | un dossier par filière, un sous-dossier par module, nommés par leurs codes | coordinateur, dans le plan |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : BIB-11 (import générique d'un dossier de documents dans la Bibliothèque), exception hors chantier.
Tu la commences après la fusion de BIB-06 (session « BIB »).
Lis d'abord AGENTS.md, docs/plan/README.md (EP-5, EP-13), docs/plan/suivi.md (branche doc/coordination-equipe),
puis ta fiche de mission docs/plan/missions/bib-11-import.md, puis l'étude docs/conception/bibliotheque/etude-studylib-pile.md
(§ 1.5, 1.7, 2.2, 8) et le contrat d'API de BIB-06.
Branche : feat/bib-11-import, depuis origin/main, dans un dossier de travail à part.
Tu n'écris que dans le périmètre de la fiche (backend/services/bibliotheque/import/). S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris le plan court docs/conception/bibliotheque/bib-11-import.md (avec « Ce que disent les études » et EP-18,
et les questions 1 et 2 de la fiche), fais-le valider par le coordinateur, commite-le seul.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-22 | fiche écrite par le coordinateur, d'après le § 8 de l'étude StudyLib (répartition validée par le chef le 21 nov.) | — |
