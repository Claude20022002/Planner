# Mission · STA-03 · avis de stage et idées de projet dans Planner

| | |
|---|---|
| État | ouverte : **après EDT-04 et la fusion de #230 (STA-01)** ; questions et plan d'abord |
| Agent | Alexis et son agent (répartition du chef, 21 nov.) |
| Modèle recommandé | le plus fort de son éditeur, raisonnement élevé : données d'étudiants, consentement, photo, appel à l'IA |
| Attribuée le | 2026-11-22, par le coordinateur ; accord du chef : oui, le 21 nov. (§ 8 de l'étude StudyLib ; Q5, Q6) |
| Module et chantier | [STA](../modules/STA-stages-alternance.md) · suite de STA-01, exception hors chantier comme elle (chef, 21 nov.) |
| Fonction | STA-03 : les avis de stage (entreprise, poste, note, photo, consentement) et les idées de projet (dont trois proposées par l'IA) passent de StudyLib à Planner, dans l'espace Carrière · taille M |
| Branche | `feat/sta-03-avis-idees` (proposition, à confirmer avec le plan), depuis `origin/main` après la fusion de #230 |
| Dossier de travail | à fixer avec Alexis : ses dossiers de travail sont sur son poste |
| Plan de conception | à écrire : `docs/conception/stages/sta-03-avis-idees.md` · validé par **le chef** (données, consentement, IA) |

## Ce que dit l'étude

[Étude StudyLib](../../conception/bibliotheque/etude-studylib-pile.md) (branche `etude/bib-studylib-pile`) : § 1.2 (écrans « Avis de stage » et « Idées de projet »), § 1.5 (l'IA : le prompt nomme l'école pilote, envoie la filière, le niveau et les centres d'intérêt), § 1.7 (ce qui n'est pas neutre), § 3.3 (la reprise des avis, avec leur consentement `consent_at`, se décide dans ce plan). Le dépôt `..\StudyLib` se lit sans le modifier.

## Critère de « terminé »

- Un étudiant publie un avis de stage et le retire ; un avis ne paraît qu'avec le consentement de son auteur, daté.
- Les idées de projet sont proposées par **le service d'IA de Planner** (`backend/services/ia/`), avec des destinations explicites (QUA-10) ; rien d'identifiant ne part à l'IA (ni nom, ni adresse, ni identifiant) ; aucun nom d'école dans le prompt ni dans le code (EP-5).
- `docs/envois-sortants.md` et le résumé des envois au démarrage sont à jour si un envoi change (EP-13).
- La photo d'un avis va dans le stockage de fichiers de BIB-05, rangée par école ; tant que BIB-05 n'est pas fusionnée, le plan dit comment l'avis se publie sans photo.
- 404 hors de l'école ; un test à deux écoles.
- Le plan dit si les avis de l'école pilote sont repris, avec quel consentement, et qui lance la reprise (le chef).
- La part mobile (cartes des avis et des idées) vient **après la fusion de BIB-10**.

## Périmètre d'écriture

L'agent peut modifier :

- les fichiers de STA créés par STA-01 (#230) et leurs suites : `backend/services/stages/`, `backend/routes/offreStageRoutes.js` ou une route sœur, `backend/models/` (fichiers nouveaux de STA), `frontend/src/pages/OffresStage.jsx` et les pages sœurs nouvelles, `frontend/src/i18n/offresStage.*.js` ou des dictionnaires sœurs
- `backend/migrations/` : un numéro **réservé auprès du coordinateur** avant d'écrire la migration
- dans `backend/app.js`, `backend/models/index.js`, `frontend/src/App.jsx`, `navigation.jsx`, `services/api.js` : des ajouts seulement
- après la fusion de BIB-10 seulement : `mobile/src/bibliotheque/CarteStage.jsx`, `CarteIdee.jsx`, `mobile/src/app/stage/`
- `docs/conception/stages/sta-03-avis-idees.md`, la ligne STA-03 du module STA, sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `backend/services/bibliotheque/` : BIB-05 à BIB-08 (session « BIB ») et BIB-11 (sa propre mission)
- `mobile/src/app/(onglets)/bibliotheque.jsx` et `mobile/src/api/donnees.js` avant la fusion de BIB-10
- `backend/services/ia/` : il l'appelle, il ne le modifie pas sans le demander
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Chaque fonction de StudyLib qui n'est pas un document va à son module ; les stages vont **tous dans STA** ; la branche `e/offres-stage` de StudyLib est abandonnée (chef, 21 nov., Q5 et Q6).
- L'IA passe par le service de Planner ; les vidéos YouTube restent à trancher (Q7).
- STA-01 (#230) ne se fusionne pas avant la validation de son plan par le chef (EP-5, migration 0083, route publique) ; Alexis prend EDT-04 avant (décisions du 21 nov.).
- *(coordinateur, 22 nov.)* La part mobile de STA-03 attend la fusion de BIB-10, qui tient l'onglet de la Bibliothèque et `donnees.js`.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Reprendre les avis de l'école pilote | oui, seulement ceux qui ont un consentement daté ; le script lancé par le chef, après BIB-08 | chef, dans le plan |
| 2 | Qui voit un avis : l'école entière, ou la filière de l'auteur | l'école entière, étudiants et administration | chef, dans le plan |
| 3 | L'auteur d'un avis est-il nommé | au choix de l'auteur, anonyme par défaut | chef, dans le plan |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : STA-03 (avis de stage et idées de projet, venus de StudyLib), suite de STA-01.
Tu la commences après EDT-04 et la fusion de #230 (STA-01).
Lis d'abord AGENTS.md, docs/plan/README.md (EP-5, EP-13), docs/plan/suivi.md (branche doc/coordination-equipe),
puis ta fiche de mission docs/plan/missions/sta-avis-idees.md, puis l'étude docs/conception/bibliotheque/etude-studylib-pile.md
(branche etude/bib-studylib-pile : § 1.2, 1.5, 1.7, 3.3, 8).
Branche : feat/sta-03-avis-idees (à confirmer dans ton plan), depuis origin/main, dans un dossier de travail à part.
Tu n'écris que dans le périmètre de la fiche ; la part mobile attend la fusion de BIB-10. S'il faut en sortir, arrête-toi et demande.
Aucun plan : pose tes questions au chef (dont les questions 1 à 3 de la fiche), écris le plan
docs/conception/stages/sta-03-avis-idees.md (avec « Ce que disent les études » et EP-18), fais-le valider par le chef, commite-le seul.
Numéro de migration : demande-le au coordinateur avant de l'écrire.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-22 | fiche écrite par le coordinateur, d'après le § 8 de l'étude StudyLib (répartition validée par le chef le 21 nov.) | — |
