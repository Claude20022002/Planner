# Session du 2026-11-21 (fin de soirée) · coordination · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur, suite de la fiche `-9` dans la même conversation (résumée une fois) |
| Chantier | hors chantier (coordination) |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | cette fiche ; état `60ee78d9` puis le commit de cette fiche |

## Objectif de la session

Suivre les CI de #237 et #240, relire ce qui arrive, tenir `suivi.md`.

## Fusions constatées

#237 (VIT-17, 20 h 21 UTC), #243 (VIT-18b, 20 h 58), #190 (étude des données, 22 h 46), #240 (UIX-11, 22 h 49). PR ouvertes ce soir par le chef : #241 (QUA-10), #242 (étude 15), #244 (cache Maven, agent de Cursor), #245 (UIX-06c).

**#237 a été fusionnée avant la correction de `/ar/`** : la CI de `main` est rouge depuis (« Construire le site vitrine », `/ar/ 404 !== 200`, runs `44945843804` et `44949087550`), et #241 et #236 en héritent.

## Relectures

| PR ou branche | Fonction | Verdict | Ce que j'ai relancé ; ce que je crois sur parole |
|---|---|---|---|
| `fix/vit-17-correctifs-vitrine` (`26c5f0e7`, poussée, sans PR) | correction de VIT-17 | **prête** | diff lu : `/ar/` passe des 200 aux 404 dans `verifier-image.cjs`, rien d'autre. Contrôle Docker cru sur parole (agent de Cursor : 35 pages, vert) ; la CI le refera |
| #245 (`cd2395e6`) | UIX-06c | **prête** | tests unitaires 105/105, eslint (aucun avertissement dans les fichiers touchés ; les quatre restants sont dans Affectations, Conflits, Imprévus, hors périmètre), build, neutralité ; tailles (151 lignes au plus), aucune couleur en dur. CI verte, parcours compris. Écart EP-5 **antérieur** : « fériés du Maroc » (bouton et générateur du serveur sur `main`) ; la branche ajoute une phrase d'aide qui le répète → ADM-10 |
| #241 (`a61e8c3a`) | QUA-10, étape 6 | **prête** dès que `main` est vert | diff de l'étape 6 lu (`docs/envois-sortants.md`, `.env.docker.example`, modèle de PR, module QUA). Chiffres des suites crus sur parole (517/517, 630/630) ; la CI les a refaits (Backend, Parcours verts) |
| `feat/vit-19-ep19-poids` (`db7215c0`) | VIT-19, plan | **validé** (S), quatre précisions | plan lu contre EP-19 et `frontend/nginx.conf` ; aucune PR ouverte ne touche ses fichiers |
| #244 (`26660aa7`) | cache Maven du solveur | **à relancer** | journal du run de 21 h 09 : chemin bon, 429 de Maven Central au premier passage |

Non relus : #236 (VIT-11, attend la correction sur `main` puis sa mise à jour par Codex), #169, #234, #193 (après #190, agent de Cursor), le plan de VIT-09c (après VIT-11), ADM-02 et EP-18 (sessions pas encore ouvertes : aucune branche).

## Décisions

- **Chef** (outil de questions) : VIT-15 n'attend pas VIT-09c (place réservée) ; les fériés par pays deviennent **ADM-10**, après ADM-02, UIX-06c fusionne telle quelle ; l'agent de Cursor peut rester sous « Auto » pour le travail court, Grok 4.7 high pour VIT-13 et toute tâche M ou plus. Écrit dans la fiche d'UIX-06c par sa session : réponse 9 d'UIX-11 autorisée dans #240, réponse 13 d'UIX-06c suffisante.
- **Coordinateur** : correction de `/ar/` en PR à part, d'abord ; Codex garde la ligne de `main` dans VIT-11 ; plan de VIT-19 validé ; #245 et #241 prêtes ; `.env` du serveur à compléter avant de déployer QUA-10 ; #244 relancée une fois, sinon autre approche.

Tout est dans `decisions.md` (« 21 nov., fin de soirée »), `suivi.md`, le module ADM (ADM-10 et son critère) et les fiches de mission (UIX-11 et VIT-18b closes ; VIT-17, QUA-10, fusion des études, VIT-15, VIT-09c complétées).

Hors dépôt : rapports rangés (agent de Cursor : 20 h 38, 21 h 01, 22 h 23 ×2, 22 h 35 ; Codex : 20 h 24, 20 h 39, 20 h 58). Consignes déposées : `cursor\entree\2026-11-21-2300-vit-19-valide.md`, `cursor\entree\2026-11-21-2316-ci-244-et-modele.md`, `codex\entree\2026-11-21-2315-vit-11-ar-et-qua-10.md`.

La session `plan-b-projet-pacte-88` m'a demandé, pour le chef, si j'avais codé UIX-11 : réponse « non » (code de Claude de VS Code ; #240 déjà fusionnée, une correction passe par une branche `fix/` depuis `main`).

## Les douze conditions de la mise en ligne du site

| N° | Condition | État au 21 nov., 23 h 15 |
|---|---|---|
| 1 | audit de `vitrine/` et montée d'Astro | à faire le 27 nov. ou après (agent de Cursor) |
| 2 | mentions légales et confidentialité | #223 codée ; **attend les valeurs du chef** |
| 3 à 6, 8 | logos, non indexé, contenu, vidéo, pages par rôle | faites |
| 7 | illustrations | VIT-09a faite ; VIT-09b en dernier |
| 9 | catalogue et FAQ | #236 : recette locale bonne ; à mettre à jour après la correction de `/ar/`, puis relecture |
| 10 | ajouts d'après OpenEduCat | restent le méga-menu (#236), VIT-13 (plan au chef), VIT-15 (**n'attend plus VIT-09c**), VIT-16 (attend le chef) |
| 11 | contact réel | VIT-16 : attend E-MAIL, RÉSEAU et les corrections du plan |
| 12 | pas de saut du menu, performance ≥ 90 | **faite** (#237) ; reste la PR de la correction du contrôle de l'image |

Avant le déploiement aussi : VIT-06b (attend `N` et le relevé Traefik), VIT-19 (plan validé, code en cours).

## Questions

| N° | Question | À qui | État |
|---|---|---|---|
| 1 | Valeurs de VIT-12 et VIT-16 | chef | en attente |
| 2 | Relevé Traefik (VIT-06b) | chef | en attente |
| 3 | Plan de STA-01 (#230) | chef | en attente |
| 4 | M16 (P-85) ; avis A et B sur VSC-01 (#215) | chef | en attente |
| 5 | La question 3 du plan d'UIX-06c (UIX-06d : Conflits, Affectations, Imprévus, Examens) | chef | ouverte |

## Reste à faire, dans l'ordre

1. Le chef ouvre la PR de la correction de `/ar/`, la fusionne quand la CI est verte ; `main` redevient vert.
2. Le chef met #241 à jour (`gh pr update-branch`), puis la fusionne ; **avant de déployer**, il complète le `.env` du serveur (IA, médias, courriel).
3. Le chef fusionne #245 (UIX-06c, prête, CI verte).
4. Codex met VIT-11 à jour depuis `main` (consigne de 23 h 15) ; je relis #236.
5. Agent de Cursor : VIT-19 (code), #244 si le chef relance sans succès, puis #169, #234, #193 ; après #234, je classe la synthèse 14 par public.
6. Le chef ouvre les sessions **ADM-02** et **EP-18** (prompts dans leurs fiches) ; il pousse cette branche.
7. Claude (VS Code), après UIX-06c : QJE-14, l'étude StudyLib, UIX-10d, puis VIT-09b.
8. Alexis : #229, #230, puis EDT-04.

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner (Codex, agent de Cursor sous « Auto » pour le court et Grok 4.7 high pour M et plus,
Claude de VS Code, les sessions Claude ouvertes par le chef, et Alexis avec son agent). Tu prends le relais de la coordination
du 21 nov. (fin de soirée, fiche -10).
Travaille dans ..\travaux-planner\coordination-equipe, branche doc/coordination-equipe. Commence par git fetch puis git merge origin/main
(decisions.md : garde toutes les lignes ; suivi.md : garde notre version, puis remets-le à l'état réel). Une seule session de
coordination à la fois : liste les sessions ouvertes (ListAgents) ; si l'une coordonne, arrête-toi.

Lis d'abord : AGENTS.md ; docs/plan/README.md (§ 2 ; EP-5, EP-13, EP-18, EP-19) ; docs/plan/decisions.md (sections du 21 nov.,
jusqu'à « fin de soirée ») ; docs/plan/suivi.md (Chantiers, Missions en cours) ; docs/plan/feuille-de-route.md ; les skills
coordination, relecture-branche et fin-de-session ; la fiche docs/sessions/2026-11-21-doc-coordination-equipe-10.md ;
l'étude docs/etude-marche/15-modules-et-packs.md (#242).

Décisions à garder en tête : le supérieur jusqu'au bout ; ADM ouvert (ADM-02 avec MOT-13c, session Claude neuve, plan au chef ;
ADM-10, les fériés par pays, après ADM-02) ; dix-sept modules vendables, un pack par public avec une part gratuite et des fonctions
verrouillées visibles, aucun prix ; VIT-09c par Codex après VIT-11, et VIT-15 ne l'attend pas (place réservée) ; QUA-10 demande
un .env du serveur complet avant tout déploiement ; chaque plan a la section « Ce que disent les études ».

Commence par le tour d'état (skill coordination, § 1), boîtes comprises, gh pr list --state merged depuis le 21 nov. 23 h, et
la CI de main (rouge depuis #237 tant que la correction de /ar/ n'est pas fusionnée).

Puis, dans l'ordre :
1) vérifie que la correction de /ar/ est sur main ; sinon, redonne au chef la commande de sa PR ;
2) relis #236 (VIT-11) après sa mise à jour par Codex ; puis le code de VIT-19 (agent de Cursor) ; #169, #234, #193 ; le plan de
   VIT-09c (M, tu le valides) ; les questions et le plan d'ADM-02 (au chef) ; le premier jet d'EP-18 ;
2 bis) si #244 reste rouge sur le 429 après une relance, valide le plan court de l'agent de Cursor (paquet construit avec setup-java) ;
3) après la fusion de #234, classe chaque ligne de la synthèse 14 par public (supérieur, scolaire, tous) ;
4) tiens l'ordre des fusions du site : correction de /ar/, VIT-11, #223 après les valeurs du chef, VIT-16, VIT-13, VIT-15, VIT-19,
   VIT-09b en dernier ;
5) reporte l'état de chaque fonction dans suivi.md (toi seul) ; dis au chef où en sont les douze conditions.

En attente du chef : valeurs de VIT-12 et VIT-16, relevé Traefik (VIT-06b), plan de STA-01 (#230), M16 (P-85), avis A et B sur
VSC-01 (#215), question 3 du plan d'UIX-06c (UIX-06d). Alexis : #229, #230, puis EDT-04.

Repères : aucun pays supposé (EP-5) ; tous les contextes (EP-18) ; sobre et mesuré (EP-19) ; rien de réel dans le dépôt public ;
rien publié en ligne sans demande du chef. Le champ « Autre » de l'outil de questions ne transmet pas toujours le texte. Dans les
commandes données au chef, jamais de « <n> ». Une CI rouge sur l'image du solveur vient souvent de Maven Central : relancer.
Une relecture d'une PR du site relance aussi le contrôle de l'image (Docker), pas seulement le build et les tests.
Une fiche de session nouvelle par branche, jamais une fiche déjà sur main.

Règles : tu ne codes aucun lot ; plan validé avant le code ; questions avant toute supposition (outil de questions) ; relis
decisions.md avant de fixer le périmètre d'une mission ; chaque décision dans decisions.md, marquée *(coordinateur)* quand elle est
la tienne ; après un push, attends une minute avant gh pr checks --watch ; fiche de session et suivi.md à jour en fin de session ;
jamais de git push.
```

## Ajout, 22 nov. vers 0 h

- Fusionnées : **#246** (correction de `/ar/`, 23 h 27 UTC), **#241** (QUA-10, 23 h 55), **#245** (UIX-06c, 23 h 56). La CI du site est verte sur `main` ; la CI complète de `main` (`e1e8178e`) était en file.
- `gh pr update-branch 241` a répondu « conflits » : #241 avait déjà été mise à jour (`620f80e5`) et fusionnée ; sans effet.
- `fix/uix-11-volet` (session `plan-b-projet-pacte-88`, `7839621e`) relu : **prêt pour la PR**, à pousser par le chef.
- `main` fusionnée dans cette branche (conflit dans le module UIX : colonne « Étape » gardée, état réel écrit) ; modules UIX, QUA et VIT, `suivi.md` et fiches de VIT-17 et QUA-10 à l'état réel (missions closes).
- Reste au chef : **compléter le `.env` du serveur avant de déployer QUA-10** ; pousser `fix/uix-11-volet` et ouvrir sa PR ; dire « lis ta boîte » à Codex (VIT-11) et à l'agent de Cursor (VIT-19, #244).
