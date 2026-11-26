# Mission · EDT-04 · publication de l'emploi du temps : PDF et courriels selon l'école

| | |
|---|---|
| État | ouverte : après les corrections de #229 et #230 |
| Agent | Alexis (Destroya2) et son agent |
| Modèle recommandé | un modèle moyen suffit pour le PDF ; le plus capable si le plan touche aux envois de courriels (adresses, données personnelles) |
| Attribuée le | 2026-11-21, par le coordinateur ; accord du chef : oui, le 2026-11-21 (exception hors chantier ; réponse à la question de #231) |
| Module et chantier | [EDT](../modules/EDT-emploi-du-temps.md) · hors chantier, par exception du chef ; étape 3 « le supérieur jusqu'au bout » |
| Fonction | EDT-04 : publier l'emploi du temps d'une école en PDF (par groupe, par enseignant, par salle) et l'envoyer par courriel, à la marque, dans la langue et le vocabulaire de l'école · taille M |
| Branche | `feat/edt-04-publication`, depuis `origin/main` |
| Dossier de travail | au choix d'Alexis ; un dossier par branche |
| Plan de conception | à écrire : `docs/conception/emploi-du-temps/edt-04-publication.md` · **validé par le chef** (choix de produit : forme du PDF, qui publie, quels courriels) |

## Critère de « terminé »

Le critère du module visait un collège (« ni filière ni semestre »). Avec le supérieur d'abord (décision du chef du 21 nov.), le plan propose de le remplacer par :

- le PDF d'une **école fictive du supérieur** porte sa marque et sa langue ; **aucun mot n'est écrit en dur** : chaque libellé vient des textes de l'école, pour que l'école scolaire de l'étape 5 (UIX-02) n'ait rien à recoder ;
- le PDF se lit imprimé en noir et blanc, et sans réseau une fois téléchargé (EP-18) ; son poids est affiché avant le téléchargement (N3) ;
- aucun courriel ne part sans un geste de l'administration (publication par l'admin, décision du 21 oct.).

Le chef confirme ce critère en validant le plan.

## Périmètre d'écriture

L'agent peut modifier :

- le service et les routes de la publication de l'emploi du temps (`backend/services/calendrier/`, `backend/routes/` concernés), la génération du PDF, et leurs tests ;
- les écrans de publication du site (`frontend/src/`), leurs textes (fr, en ; ar vide) et leurs tests ;
- le plan, le fichier du module EDT et sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient).

L'agent ne touche pas :

- `frontend/src/theme/`, `shared/charte/` et les pages de gestion que UIX-10b met à la charte (Claude de VS Code) ;
- `vitrine/` (missions VIT ouvertes) ;
- tout le reste : s'il doit en sortir, il s'arrête et le demande.

## Ce qui est déjà décidé

- La publication est faite par l'administration (21 oct.).
- Aucun pays supposé (EP-5) ; tous les contextes (EP-18) : le PDF imprimé est le chemin sans téléphone ni réseau ; sobre et mesuré (EP-19).
- Le service commun d'envoi (COM-01) n'existe pas encore : le plan dit comment partent les courriels sans lui, ou propose de les laisser à COM-01.
- Section « Ce que disent les études » obligatoire dans le plan (décision du 21 nov.) : au moins M18 (le supérieur), N3 (poids affiché), R9 et R10 si le plan les touche ([synthèse des concurrents](../../etude-marche/14-reprendre-et-depasser.md)).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | La forme du PDF : une page par groupe, par enseignant, par salle, ou les trois ? | les trois, choisis à la publication | chef, dans le plan |
| 2 | Les courriels : qui les reçoit, et partent-ils avant COM-01 ? | enseignants et étudiants concernés, par l'envoi déjà utilisé pour les comptes ; ou attendre COM-01 | chef, dans le plan |
| 3 | Le critère de « terminé » ci-dessus remplace-t-il celui du module ? | oui | chef, dans le plan |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : EDT-04 (publication de l'emploi du temps : PDF et courriels), hors chantier,
par exception du chef (21 nov.). D'abord, finis tes corrections : #229 (CI rouge, sessionsJeu.spec.cjs ligne 49) et #230
(aucune devise par défaut ; migration 0083 ; les brouillons visibles par tout enseignant dans la liste ; OffresStage.jsx
au-dessus de 300 lignes) ; #230 ne se fusionne qu'après la validation de son plan par le chef.
Puis lis AGENTS.md, docs/plan/README.md (le supérieur d'abord, décision du 21 nov.), docs/plan/suivi.md,
et ta fiche docs/plan/missions/edt-04-publication.md. Branche feat/edt-04-publication depuis origin/main.
Tu n'écris que dans le périmètre de la fiche. Pose tes questions, écris le plan (avec la section « Ce que disent les études »),
fais-le valider par le chef, commite-le seul, puis code. Fiche de session à jour, suivi.md non modifié ;
tout est commité ; jamais de git push. Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-21 | fiche écrite par le coordinateur, sur la décision du chef (réponse à #231) | — |
