# Mission · ADM-02 · le panneau de configuration de l'école, avec l'écran des contraintes (MOT-13c)

| | |
|---|---|
| État | ouverte : questions et plan à écrire ; **plan au chef** (taille L, routes nouvelles, journal de sécurité) |
| Agent | **à choisir par le chef** ; proposition du coordinateur : une session Claude neuve (voir « Pourquoi cet agent ») |
| Modèle recommandé | le plus capable disponible (Claude Fable 5.2, sinon Opus 5.5) : fonction L qui touche le serveur du moteur, le site et le journal de sécurité, avec un contrat à arbitrer (Q-04) |
| Attribuée le | 2026-11-21, par le coordinateur ; accord du chef : ouverture d'ADM et MOT-13c avec ADM-02 (21 nov. au soir) ; agent : en attente |
| Module et chantier | [ADM](../modules/ADM-administration.md) · chantier ouvert le 21 nov. 2026, à la fusion de #239, à la place de MOT |
| Fonction | ADM-02 : le panneau de configuration de l'école montre les réglages du moteur que l'école peut changer (le reste reste au profil), avec un aperçu avant d'appliquer ; **MOT-13c** en est la section « Règles de génération » (les contraintes déclarées et la liste « Déjà pris en compte ») · taille L (ADM-02) + M (MOT-13c) |
| Branche | `feat/adm-02-configuration`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\adm-02-configuration` |
| Plan de conception | à écrire : `docs/conception/administration/adm-02-configuration.md` (modèle `docs/plan/modeles/conception.md`, **section « Ce que disent les études » comprise**) · validé par **le chef** |

## Pourquoi cet agent

- Codex a une file pleine sur le chemin de la mise en ligne (QUA-10, VIT-11, VIT-15, VIT-06b) ; l'agent de Cursor prend les tâches bornées, et celle-ci ne l'est pas encore (Q-04 à trancher) ; Claude de VS Code enchaîne UIX-11 puis les quatre lots d'UIX-06c.
- Le plan demande des échanges en cours de route (questions au chef, avis du coordinateur sur le contrat) : une session Claude reçoit les messages directs.
- Autre voie : Codex, après VIT-11 et QUA-10 ; le plan commencerait alors plusieurs jours plus tard.

## Critère de « terminé »

Le fichier du module n'en a pas encore pour ADM-02 : **le plan le propose**, au chef. Point de départ, d'après le module, la [conception de MOT-13](../../conception/moteur-planification/mot-13-contraintes-declarees.md) et la ligne d'arrivée de l'étape 3 (une deuxième école du supérieur **se configure seule**) :

- une personne de l'administration d'une école du supérieur règle seule, depuis le panneau, les réglages du moteur que le catalogue marque `modifiable: etablissement`, sans copie du catalogue dans le site ;
- chaque refus s'affiche sous son champ, traduit par son code (EP-4) ; l'aperçu dit ce qui change avant « Appliquer » ; l'historique des versions se lit et une version s'annule ;
- la section « Règles de génération » (MOT-13c) crée une contrainte à partir des six modèles, montre le contrôle de place et la liste « Déjà pris en compte » du profil avec l'état de chaque règle ;
- parcours Playwright verts (EP-9), français et anglais (EP-11), sur la charte d'UIX-10b.

## Ce qui existe

- **Serveur, MP-1** (MOT-01, #156) : `backend/routes/moteurValeursRoutes.js` (`GET /valeurs`, `GET` et `POST /versions`, `appliquer`, `abandonner`, `annuler`), `services/moteur/valeurs/`, catalogue dans `services/moteur/catalogue/`, migration 0061.
- **Serveur, MOT-13a et 13b** (#178, #182, #238) : `backend/routes/moteurContraintesRoutes.js` (`gabarits`, `contraintes`, `contraintes/profil`, `contraintes/verifier`), migrations 0080 et 0081. Le refus de l'activation fine (`portee_non_tenue`) est fusionné.
- **Relecture du contrat de MP-1 par le groupe B** ([relecture-mp1-contrat.md](../../conception/moteur-planification/relecture-mp1-contrat.md), 5 nov.) : R-1 à R-4 **bloquent les écrans** et ne sont pas codés au 21 nov. (aucune route de catalogue, de modification de brouillon, de détail de version ; aucun contrôle de version de base). C'est la question **Q-04** de `decisions.md`, § 3, qui bloque les écrans de MOT-01.
- **Site** : `frontend/src/pages/gestion/ParametresPlanning.jsx` (153 lignes) règle cinq paramètres de l'ancienne table `parametres-planning`, avec une liste recopiée dans le site ; son commentaire renvoie déjà à MOT-13c. `pages/gestion/IdentiteEcole.jsx` règle l'identité.

## Périmètre d'écriture

L'agent peut modifier :

- `docs/conception/administration/` (le plan ; dossier à créer, avec sa ligne dans `docs/conception/README.md`)
- **après le plan validé, et dans ce qu'il fixe** : `backend/routes/moteurValeursRoutes.js`, `backend/routes/moteurContraintesRoutes.js`, leurs contrôleurs, `backend/services/moteur/valeurs/`, la lecture du catalogue dans `backend/services/moteur/catalogue/` (sans changer une règle), les tests du serveur qui les couvrent
- `frontend/src/pages/gestion/ParametresPlanning.jsx` ou la page qui la remplace, un dossier `frontend/src/components/configuration/` (nouveau), `frontend/src/i18n/ressources/configuration.*.js` (nouveau), ses parcours `frontend/tests/parcours/configuration*.spec.cjs`
- `frontend/src/App.jsx`, `frontend/src/components/layouts/navigation.jsx` et `frontend/src/services/api.js` : **seulement les lignes de la configuration** (ajouts), pour garder un conflit d'une ligne avec les autres branches
- `docs/plan/modules/ADM-administration.md` et `docs/plan/modules/MOT-moteur.md` (lignes ADM-02 et MOT-13), sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `frontend/src/components/layouts/DashboardLayout.jsx`, `components/gestion/`, `pages/gestion/Salles.jsx`, `Campus.jsx`, `Creneaux.jsx`, `Calendrier.jsx` : UIX-06c (Claude de VS Code)
- `frontend/src/pages/dashboard/`, `components/dashboard/` : UIX-11 (Claude de VS Code)
- le solveur (`solveur/`) et le calcul : MOT-04 attend la réouverture de MOT
- aucune migration sans numéro réservé dans `suivi.md` (le demander au coordinateur) et sans accord du chef
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- **ADM s'ouvre à la fusion de #239, à la place de MOT ; MOT-13c passe à ADM avec ADM-02, dont il est l'écran** (chef, 21 nov. au soir).
- **Le supérieur d'abord** : le panneau sert d'abord une école du supérieur (CM, TD, TP, vacataires, campus) ; **l'interface reste neutre** : aucun mot propre au supérieur là où un mot neutre existe (coordinateur, 21 nov.) ; UIX-02 (vocabulaire par profil) est à l'étape du scolaire.
- **Ce qui est montré est tenu** : l'écran ne montre que les règles que le calcul applique (MOT-13, principe 2) ; une règle souple du solveur ne se coupe que pour toute l'école (réponse 23, #238).
- Valeurs datées, versions immuables, brouillon, application, abandon, annulation (MP-1) ; la date est celle de l'école.
- Charte : le thème unique d'UIX-10b (#235).
- Aucun pays supposé (EP-5) ; sobre et mesuré (EP-19 : le premier chargement de l'application web est mesuré et écrit dans la PR s'il change) ; tous les contextes (EP-18).
- Le plan contient la section « Ce que disent les études » : la [synthèse des concurrents](../../etude-marche/14-reprendre-et-depasser.md) (sur `main` après la fusion de #234 ; d'ici là sur `etude/expertise-go4school`) le [comparatif avec OpenEduCat](../../etude-marche/10-comparatif-openeducat-planner.md) et les [failles des ERP scolaires](../../etude-marche/09-failles-erp-scolaires.md) ; sans elle, le plan n'est pas validé.

## Questions en attente

À poser par l'agent, au chef par l'outil de questions, chacune avec sa proposition. Points de départ :

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Q-04, R-1 : une route du catalogue des réglages modifiables par l'école | oui : `GET /api/moteur/catalogue?modifiable=etablissement`, textes par clé de traduction | chef |
| 2 | Q-04, R-2 et R-3 : modifier un brouillon ; liste des versions sans leurs lignes, détail à part | `PUT /versions/:id` (brouillon seulement) ; liste allégée et `GET /versions/:id` | chef |
| 3 | Q-04, R-4 : deux brouillons ouverts en même temps | 409 `VERSION_DEPASSEE` à l'application, l'écran propose de recharger | chef |
| 4 | R-6 : journaliser l'application et l'annulation d'une version (journal de sécurité) | oui, comme `identite_ecole_modifiee` | chef (sécurité) |
| 5 | Les cinq paramètres de `parametres-planning` : restent-ils une page à part, ou passent-ils dans le panneau ? | à décider après relevé : ce qui est réglé par l'école va dans le panneau, sans changer le stockage dans ADM-02 | chef |
| 6 | R-10 : dire sous chaque réglage s'il vaut « à la prochaine génération » ou demande un aperçu | à chiffrer dans le plan ; sinon, limite connue | chef |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : ADM-02 (panneau de configuration de l'école) avec MOT-13c (l'écran
« Règles de génération »), chantier ADM, ouvert le 21 nov. à la place de MOT.
Lis d'abord AGENTS.md, docs/plan/README.md (§ 2 du 21 nov. : le supérieur d'abord ; EP-4, EP-5, EP-18, EP-19),
docs/plan/suivi.md, puis ta fiche de mission docs/plan/missions/adm-02.md, puis
docs/conception/moteur-planification/relecture-mp1-contrat.md (R-1 à R-10, question Q-04) et
docs/conception/moteur-planification/mot-13-contraintes-declarees.md (MOT-13c).
Branche : feat/adm-02-configuration, depuis origin/main, dans le dossier ..\travaux-planner\adm-02-configuration.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : relève ce qui existe (routes de MP-1 et de MOT-13, ParametresPlanning.jsx), pose tes questions au chef
par l'outil de questions (celles de la fiche, et les tiennes), écris le plan dans
docs/conception/administration/adm-02-configuration.md avec la section « Ce que disent les études », propose le
critère de « terminé », et fais-le valider par le chef (taille L). Commite le plan seul avant le code.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; aucune migration sans numéro réservé
par le coordinateur ; fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ;
jamais de git push. Quand tu as fini une étape, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-21 | fiche écrite par le coordinateur à l'ouverture d'ADM ; agent à choisir par le chef | — |

## Relevé de la session 20, à reprendre dans le plan (22 nov., 9 h 50)

Le chef a retenu le plan de 9 h 37 ; la session `plan-b-projet-pacte-20`, arrêtée, a laissé ce relevé (brouillon complet hors du dépôt : `..\travaux-planner\boites\ressources\2026-11-22-adm-02-brouillon-session-20.md`). Ce que le plan n'a pas déjà :

1. « modifiable: etablissement » est la **valeur par défaut** de `services/moteur/catalogue/charger.js` (l. 46) : d'où les 402 sur 498. Les six règles lues : `MAT.REGLE.JOURS_DIFFERENTS`, `SAL.REGLE.TAILLE_ADAPTEE`, `HOR.REGLE.TROUS`, `HOR.REGLE.CHANGEMENT_SALLE`, `HOR.REGLE.UN_CAMPUS_PAR_JOUR`, `PED.PROG.CM_AVANT_TD`.
2. **Test « ce qui est montré est tenu »** : pour chaque profil, les règles réglables du panneau sont exactement celles que `poidsDesRegles` envoie au solveur, avec `activeeParLEcole` (`ecriture.js`) exportée et partagée, pas recopiée ; après la bascule (0088), y ajouter les réglages que `lireParametres()` lira dans MP-1.
3. `profil.js` ne donne la raison « sans effet » qu'en phrase française : un `raison_code` et les conditions en données, pour l'anglais ; `verification.js` ne rend pas les noms des cibles. Un test peut comparer la phrase du site à celle de `phrases.js`.
4. `ParametresPlanning.jsx` montre 5 des 6 anciennes valeurs : il oublie `surveillants_par_salle`.
5. Les rythmes (cibles des contraintes) sont les `regime` distincts de `Creneau` (`contraintes/cibles.js`, l. 52) ; `VersionParametres` a déjà `updatedAt`, `appliquee_le` et une colonne `impact` (JSON) inutilisée.
6. Les fichiers d'i18n partagés (`fr.js`, `en.js`, `frontend/src/i18n/index.js`) ne reçoivent que des **ajouts** de clés (UIX-10e et QJE-14a y viendront).
| 2026-11-26 12 h 20 | ADM-02a (`32fbc10d`) relue : plan suivi, routes sous `requireAdmin`, fusion sans conflit, test « problème identique » qui mord | **à corriger** : transaction dans la 0088 ; puis au chef (accord de fusion donné) |
