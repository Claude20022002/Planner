# Mission · BIB-09 · les écrans web de la Bibliothèque, à la charte

| | |
|---|---|
| État | ouverte : **attend le contrat d'API de BIB-06, écrit et testé** ; questions et plan d'abord |
| Agent | Claude de VS Code, la session de la charte (répartition du chef, 21 nov.) |
| Modèle recommandé | le plus capable (Claude Fable 5.2, sinon Opus 5.5) : cinq écrans neufs sur une API neuve, trois rôles, modération |
| Attribuée le | 2026-11-22, par le coordinateur ; accord du chef : oui, le 21 nov. (§ 8 de l'étude StudyLib) |
| Module et chantier | [BIB](../modules/BIB-bibliotheque.md) · exception hors chantier (chef, 21 nov.) |
| Fonction | BIB-09 (lot B4) : les écrans web de la Bibliothèque, directement à la charte : liste filtrée et recherche, détail, dépôt, « Mes dépôts », modération · taille L |
| Branche | `feat/bib-09-ecrans`, depuis `origin/main` après la fusion du contrat d'API de BIB-06 |
| Dossier de travail | `..\travaux-planner\bib-09-ecrans` |
| Plan de conception | à écrire : `docs/conception/bibliotheque/bib-09-ecrans.md` · validé par **le chef** (L) |

## Place dans la file de Claude de VS Code

Après UIX-10d et BIB-10, comme le dit la fiche de session de l'étude StudyLib ; avant VIT-09b, qui reste le dernier travail du site. Si le contrat de BIB-06 arrive avant la fin d'UIX-10d, l'ordre ne change pas sans le dire au coordinateur.

## Critère de « terminé »

- Les cinq écrans du § 1.2 de l'étude existent dans l'application web, pour l'étudiant, l'enseignant et l'administration, avec les règles de BIB-06 (modération des dépôts d'étudiants, publication directe pour l'enseignant et l'administration, note de 1 à 5).
- À la charte d'UIX-10b : aucune couleur en dur ; UIX-10f (la charte de StudyLib) devient sans objet.
- **N3** : le poids s'affiche avant chaque téléchargement ; le téléchargement reprend après une coupure quand le navigateur le permet.
- **EP-18** : un document se télécharge, se projette ou s'imprime depuis le poste de l'école ; rien ne suppose le téléphone de l'élève.
- `BibliothequeDialog.jsx` et `SupportsCours.jsx` (l'enseignant épingle un document) lisent l'API de Planner.
- Parcours à 390 et 1280 px, en clair et en sombre, FR et EN, axe-core sans violation ; tests unitaires, eslint, build et neutralité verts.

## Périmètre d'écriture

L'agent peut modifier :

- `frontend/src/pages/bibliotheque/` et `frontend/src/components/bibliotheque/` (dossiers nouveaux)
- `frontend/src/i18n/ressources/bibliotheque.fr.js` et `.en.js` (nouveaux) ; dans `frontend/src/i18n/index.js`, `App.jsx`, `components/layouts/navigation.jsx` et `services/api.js`, **des ajouts seulement**
- `frontend/src/components/espaceCours/BibliothequeDialog.jsx` et `frontend/src/design-system/board/SupportsCours.jsx`
- `frontend/tests/parcours/` : les parcours de la Bibliothèque ; `fausseBibliotheque.mjs` seulement quand BIB-07 est fusionnée, et après accord du coordinateur
- `docs/conception/bibliotheque/bib-09-ecrans.md`, la ligne BIB-09 du module BIB, sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `backend/` : BIB-05 à BIB-08 (session « BIB ») ; un manque du contrat d'API se demande à la session « BIB », par le coordinateur
- `mobile/src/` : BIB-10
- les pages de STA (`OffresStage.jsx`, `OffreStagePublique.jsx`) : STA-01 et STA-03 (Alexis)
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Voie B ; exception hors chantier ; les événements, les avis de stage et les idées de projet ne sont pas dans la Bibliothèque (chef, 21 nov.).
- Charte unique : `shared/charte/` (UIX-10) ; sobre et mesuré (EP-19 : le premier chargement mesuré dans la PR).
- N3 pour toute fonction qui fait télécharger un document (chef, 21 nov.).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | La place de la Bibliothèque dans la navigation et la grille d'applications (UIX-09) | une tuile `bibliotheque` (logo de VIT-09a) et une entrée de menu pour les trois rôles | chef, dans le plan |
| 2 | La modération : une page à part, ou un onglet de la Bibliothèque pour l'administration | un onglet, visible de l'administration seulement | chef, dans le plan |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : BIB-09 (les écrans web de la Bibliothèque, à la charte), exception hors chantier.
Tu la commences quand le contrat d'API de BIB-06 est écrit et testé, après UIX-10d et BIB-10 dans ta file.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-18, EP-19), docs/plan/suivi.md (branche doc/coordination-equipe),
puis ta fiche de mission docs/plan/missions/bib-09-ecrans.md, puis l'étude docs/conception/bibliotheque/etude-studylib-pile.md
(§ 1.2, § 2.2, § 8) et le contrat d'API de BIB-06 dans docs/conception/bibliotheque/.
Branche : feat/bib-09-ecrans, depuis origin/main, dans ..\travaux-planner\bib-09-ecrans.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : pose tes questions au chef, écris le plan docs/conception/bibliotheque/bib-09-ecrans.md (avec « Ce que disent
les études » et EP-18), fais-le valider par le chef, commite-le seul.
Règles : pas de code avant le plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-22 | fiche écrite par le coordinateur, d'après le § 8 de l'étude StudyLib (répartition validée par le chef le 21 nov.) | — |
