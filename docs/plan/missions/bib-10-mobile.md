# Mission · BIB-10 · la Bibliothèque de l'application mobile sur l'API de Planner

| | |
|---|---|
| État | ouverte : **après UIX-10d** (mêmes fichiers mobiles) et le contrat d'API de BIB-06 ; plan d'abord |
| Agent | Claude de VS Code, à la suite d'UIX-10d (répartition du chef, 21 nov.) |
| Modèle recommandé | le plus capable (Claude Fable 5.2, sinon Opus 5.5) : onglet mobile partagé avec STA, téléchargement avec reprise |
| Attribuée le | 2026-11-22, par le coordinateur ; accord du chef : oui, le 21 nov. (§ 8 de l'étude StudyLib) |
| Module et chantier | [BIB](../modules/BIB-bibliotheque.md) · exception hors chantier (chef, 21 nov.) |
| Fonction | BIB-10 (lot B6) : les 11 appels de l'application mobile à StudyLib passent à l'API de Planner, sans période de compatibilité · taille M |
| Branche | `feat/bib-10-mobile`, depuis `origin/main` après la fusion d'UIX-10d et du contrat d'API de BIB-06 |
| Dossier de travail | `..\travaux-planner\bib-10-mobile` |
| Plan de conception | plan court à écrire : `docs/conception/bibliotheque/bib-10-mobile.md` · validé par **le coordinateur** (M, sans migration ni donnée) |

## Critère de « terminé »

- Les appels de la Bibliothèque de `mobile/src/api/donnees.js` (l. 62 à 121 sur `main` au 21 nov.) lisent l'API de Planner ; le client `biblio` et l'adresse de StudyLib ne servent plus aux documents.
- **N3** : le poids s'affiche avant chaque téléchargement ; un téléchargement coupé reprend où il s'était arrêté.
- **EP-18** : l'onglet reste utile sur un téléphone partagé et avec peu de connexion ; le hors ligne relève de MOB-06.
- Les tests mobiles passent (`mobile/__tests__/`), avec un test du téléchargement repris.
- Les cartes des avis de stage et des idées (`CarteStage.jsx`, `CarteIdee.jsx`) gardent leur place jusqu'à STA-03 : BIB-10 ne les reconstruit pas, et ne casse pas leur affichage.

## Périmètre d'écriture

L'agent peut modifier :

- `mobile/src/api/donnees.js` et `mobile/src/api/client.js` : les appels de la Bibliothèque
- `mobile/src/app/(onglets)/bibliotheque.jsx` et `mobile/src/bibliotheque/Etagere.jsx` ; des fichiers nouveaux sous `mobile/src/bibliotheque/`
- `mobile/__tests__/` : les tests de la Bibliothèque
- `docs/conception/bibliotheque/bib-10-mobile.md`, la ligne BIB-10 du module BIB, sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `mobile/src/bibliotheque/CarteStage.jsx`, `CarteIdee.jsx`, `mobile/src/app/stage/` : STA (Alexis)
- `backend/` : la session « BIB » ; `frontend/src/` : BIB-09
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Voie B ; pas de période de compatibilité, l'application n'est pas publiée (chef, 21 nov., Q3).
- *(coordinateur, 22 nov.)* **BIB-10 tient `bibliotheque.jsx` et `donnees.js`** : la part mobile de STA-03 (avis de stage, idées de projet) se fait **après la fusion de BIB-10**, pour que deux missions n'écrivent jamais ces fichiers en même temps. STA-01 (#230) touche aussi ces deux fichiers : BIB-10 part de `main` après sa fusion, ou le dit au coordinateur si #230 est encore ouverte.
- N3 pour toute fonction qui fait télécharger un document (chef, 21 nov.).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Où le fichier téléchargé est gardé sur le téléphone, et combien de temps | dans le cache de l'application, effacé à la déconnexion | coordinateur, dans le plan |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : BIB-10 (la Bibliothèque de l'application mobile sur l'API de Planner), exception hors chantier.
Tu la commences après UIX-10d (mêmes fichiers mobiles) et quand le contrat d'API de BIB-06 est écrit et testé.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-18), docs/plan/suivi.md (branche doc/coordination-equipe),
puis ta fiche de mission docs/plan/missions/bib-10-mobile.md, puis l'étude docs/conception/bibliotheque/etude-studylib-pile.md
(§ 1.3, § 2.2, § 8) et le contrat d'API de BIB-06.
Branche : feat/bib-10-mobile, depuis origin/main, dans ..\travaux-planner\bib-10-mobile.
Tu n'écris que dans le périmètre de la fiche ; les cartes des avis et des idées restent à STA. S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris le plan court docs/conception/bibliotheque/bib-10-mobile.md (avec « Ce que disent les études » et EP-18),
fais-le valider par le coordinateur, commite-le seul.
Règles : pas de code avant le plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-22 | fiche écrite par le coordinateur, d'après le § 8 de l'étude StudyLib (répartition validée par le chef le 21 nov.) | — |
