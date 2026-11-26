# Session du 2026-11-21 (soir, relais) · coordination · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur |
| Chantier | hors chantier (coordination) |
| Dossier de travail | `..\travaux-planner\coordination-equipe` ; étude dans `..\travaux-planner\ven-modules-packs` |
| Dernier commit | cette fiche ; état `6d540d0f` ; fusion de `main` `fd28ee4e` |

## Objectif de la session

Prendre le relais de la fiche `-8` : tour d'état après les fusions de 18 h 48, ouvrir ADM, relire ce que rendent les agents, tenir `suivi.md`.

## Fait

| Commit | Contenu |
|---|---|
| `fd28ee4e` | `git merge origin/main` (#228, #235, #238, #239). Conflits : modules MOT et UIX (colonne « Étape » de notre branche gardée, état réel écrit). **Module MOT corrigé** : MOT-02 fait pour le supérieur (#239), MOT-03 fait (#183), MOT-13 coupure fine fusionnée (#238), 13c avec ADM-02 |
| `6d540d0f` | `suivi.md` à l'état réel (MOT dans « Fermés », ADM dans « Ouverts » ; missions) ; 9 lignes dans `decisions.md` ; feuille de route ; fiches **ADM-02** et **VIT-09c** écrites ; fiches EP-18, VIT-15, VIT-17 complétées |
| sur `etude/ven-modules-packs` : `d3cad8ae`, `1e1a2ebe`, `ebfe4d18`, `e2844851` | **étude 15 : les modules vendables et les packs**, sans prix, validée par le chef ; sa fiche de session |

Hors dépôt : rapports de l'agent de Cursor de 19 h 12 (VIT-17) et 19 h 41 (#190) lus et rangés ; consignes déposées : `codex\entree\2026-11-21-1945-vit-09c-apres-vit-11.md`, `cursor\entree\2026-11-21-1955-fiche-190.md`. La consigne de Codex de 18 h 50 est encore dans `entree\` (non rangée), mais Codex fait l'étape 6 de QUA-10 qu'elle demande.

Seule session de coordination : `ListAgents` montrait une autre session (`plan-b-projet-pacte-91`) ; interrogée, elle ne coordonne pas et n'a rien écrit. Elle avait confirmé à la session d'UIX-11 les réponses 5, 6 et 7 déjà dans `decisions.md`.

## Fusions constatées

#235 (18 h 42), #228, #238, #239 (18 h 48) fusionnées ; #188 fermée (18 h 48). ADM est ouvert depuis la fusion de #239.

## Relectures

| PR ou branche | Fonction | Verdict | Ce que j'ai relancé ; ce que je crois sur parole |
|---|---|---|---|
| #237 (`bc23fbbb`, local) | VIT-17 | **prête**, à pousser | build (35 pages, pas de `dist/ar/`), tests 101/101, neutralité ; diff du module VIT (les deux lignes). Lighthouse du 21 nov. non refait (la fusion n'a touché aucun fichier du site de VIT-17) |
| #190 (`9cebb350`, local) | étude des données | **à corriger** : la fiche | fusion lue : decisions.md (toutes les lignes), suivi.md (version de `main`). La fiche réécrit `2026-11-21-fusion-etudes.md`, celle de #189 déjà sur `main`, et n'est pas commitée |
| `feat/uix-11-tableau-de-bord` | UIX-11 | en cours | étapes 2 et 3 commitées (`72831c54`), parcours en cours ; le plan a été corrigé sur les captures (réponse 8 du chef) |
| `feat/qua-10-envois-explicites` | QUA-10 | en cours | étape 6 commencée (`64fd2ecd`) ; aucun rapport encore |

Non relus faute de livraison : #236 (attend #237), VIT-19 (attend #237), #169, #234, #193 (après #190), VIT-18b (aucune session).

## Décisions

- **Chef** (outil de questions) : ADM-02 à une session Claude neuve ; l'étude EP-18 relancée ; l'étude 15 validée (dix-sept modules et le socle ; un pack par public, avec une part gratuite et des fonctions verrouillées visibles ; connecteur d'État inclus ; six règles ; aucun prix) ; VIT-09c à Codex après VIT-11, en SVG et en images générées.
- **Coordinateur** : logo `cours` pour l'Espace de cours ; VIT-15 et VEN-01 partent de la liste de l'étude 15 ; #237 prête ; #190 à corriger (fiche).

## Écarts relevés

- **VIT-09c passe avant VIT-15**, qui fait partie de la condition 10 : la mise en ligne recule d'autant, sauf si VIT-15 pose une place réservée et prend les logos ensuite (à proposer au chef).
- La fiche de #190 dit « agent de Cursor (Auto) » : le modèle attendu est Grok 4.7 high ; question posée dans la consigne de 19 h 55.
- Les sessions de VIT-18b (l'expertise), d'EP-18 et d'ADM-02 ne sont pas ouvertes : le chef les ouvre avec les prompts ci-dessous.
- L'en-tête du plan d'UIX-06c dit encore « posée sur `feat/uix-06b-referentiel` » (relevé par la session `-91`).

## Les douze conditions de la mise en ligne du site

| N° | Condition | État au 21 nov., 19 h 55 |
|---|---|---|
| 1 | audit de `vitrine/` et montée d'Astro | à faire le 27 nov. ou après (agent de Cursor) |
| 2 | mentions légales et confidentialité | #223 codée ; **attend les valeurs du chef** (NOM, HÉBERGEUR, N, DATE, E-MAIL) |
| 3 | logos officiels | faite (#220) |
| 4 | site non indexé | faite (#221) |
| 5 | contenu complet | faite (#214) |
| 6 | vidéo | faite (#216, #232) |
| 7 | illustrations | VIT-09a faite (#222) ; VIT-09b en dernier |
| 8 | pages par rôle | faite (#219) |
| 9 | catalogue et FAQ | #236, à reprendre après la fusion de #237 |
| 10 | ajouts d'après OpenEduCat | faits : VIT-10b, VIT-14, VIT-14b, VIT-09a, **VIT-18 (#228)** ; restent le méga-menu (#236), VIT-13 (plan au chef), VIT-15 (après VIT-11 et VIT-09c), VIT-16 (**attend le chef**) |
| 11 | contact réel | VIT-16 : **attend E-MAIL, RÉSEAU et les corrections du plan** |
| 12 | pas de saut du menu, performance ≥ 90 | **tenue dans #237, prête** : à pousser et fusionner |

Avant le déploiement aussi : VIT-06b (attend `N` et le relevé Traefik), VIT-19 (plan après #237).

## Questions

| N° | Question | À qui | État |
|---|---|---|---|
| 1 | Valeurs de VIT-12 et VIT-16 (NOM, HÉBERGEUR, N, DATE, E-MAIL, RÉSEAU, corrections du plan de VIT-16) | chef | en attente |
| 2 | Relevé de la configuration Traefik du VPS (VIT-06b) | chef | en attente |
| 3 | Plan de STA-01 (#230 : EP-5, migration 0083, route publique, brouillons visibles) | chef | en attente |
| 4 | M16 (P-85) ; avis A et B sur VSC-01 (#215) | chef | en attente |
| 5 | VIT-15 attend-elle les logos de VIT-09c, ou pose-t-elle une place réservée pour ne pas retarder la mise en ligne ? | chef | à poser |
| 6 | Le modèle de l'agent de Cursor (« Auto » dans sa fiche) | agent de Cursor | posée (19 h 55) |

## Reste à faire, dans l'ordre

1. Le chef pousse #237 (VIT-17), attend la CI, la fusionne ; il pousse `etude/ven-modules-packs` et ouvre sa PR ; il pousse cette branche.
2. Le chef ouvre trois sessions Claude : **ADM-02**, **EP-18**, **VIT-18b** (prompts ci-dessous).
3. Après #237 : Codex reprend VIT-11 (#236) ; l'agent de Cursor écrit le plan de VIT-19 (je le valide).
4. Agent de Cursor : fiche de #190 corrigée, puis #169, #234, #193 ; après #234, je classe la synthèse 14 par public.
5. Codex : QUA-10 étape 6 (rapport attendu), VIT-11, VIT-09c, VIT-15.
6. Claude (VS Code) : UIX-11 (relecture à sa fin), puis UIX-06c.
7. Alexis : #229 (CI rouge), #230, puis EDT-04.

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner (Codex, agent de Cursor sur Grok 4.7 high, Claude de VS Code, les sessions Claude ouvertes
par le chef, et Alexis avec son agent). Tu prends le relais de la session de coordination du 21 nov. (relais du soir, fiche -9).
Travaille dans ..\travaux-planner\coordination-equipe, branche doc/coordination-equipe. Commence par git fetch puis git merge origin/main
(decisions.md : garde toutes les lignes ; suivi.md : garde notre version, puis remets-le à l'état réel). Une seule session de
coordination à la fois : liste les sessions ouvertes (ListAgents) ; si l'une coordonne, arrête-toi.

Lis d'abord : AGENTS.md ; docs/plan/README.md (§ 2 : le supérieur d'abord ; EP-13, EP-18, EP-19) ; docs/plan/decisions.md (sections
du 21 nov., dont « après les fusions de 18 h 48 ») ; docs/plan/suivi.md (Chantiers, Missions en cours) ; docs/plan/feuille-de-route.md ;
les skills coordination, relecture-branche et fin-de-session ; la fiche docs/sessions/2026-11-21-doc-coordination-equipe-9.md ;
et l'étude docs/etude-marche/15-modules-et-packs.md (branche etude/ven-modules-packs, validée par le chef).

Décisions à garder en tête : le supérieur jusqu'au bout ; ADM ouvert à la place de MOT (MOT-13c avec ADM-02 ; MOT-04 attend la
réouverture de MOT) ; ADM-02 par une session Claude neuve, plan au chef (Q-04 à trancher) ; dix-sept modules vendables, un pack par
public avec une part gratuite et des fonctions verrouillées visibles (dans la page et la grille, jamais dans le menu), aucun prix ;
VIT-09c (logos et images des modules) par Codex après VIT-11, avant VIT-15 ; UIX-06c par Claude (VS Code) seul après UIX-11 ;
pdf.js est MOB-09, MOB-08 est l'appel à la main hors ligne ; DOC-03 reste en local jusqu'à l'étape 6 ; VSC-01 se termine en
conception puis se gèle ; chaque plan a la section « Ce que disent les études ».

Commence par le tour d'état (skill coordination, § 1), boîtes comprises, et gh pr list --state merged depuis le 21 nov. 19 h 55.

Puis, dans l'ordre :
1) relis ce qui arrive : la fiche corrigée de #190, puis #169, #234, #193 (agent de Cursor) ; QUA-10 étape 6 et VIT-11 (#236) reprise
   après #237 (Codex) ; UIX-11 à sa fin (Claude de VS Code) ; le plan de VIT-19 (tu le valides : S) ; le plan de VIT-09c (M, tu le
   valides) ; les questions et le plan d'ADM-02 (au chef) ; le premier jet d'EP-18 ; le plan court de VIT-18b ;
2) après la fusion de #234, classe chaque ligne de la synthèse 14 par public (supérieur, scolaire, tous) ;
3) pose au chef la question 5 de la fiche -9 (VIT-15 attend-elle VIT-09c ?) ;
4) tiens l'ordre des fusions du site : VIT-17, VIT-11, #223 après les valeurs du chef, VIT-16, VIT-13, VIT-15, VIT-19, VIT-09b en dernier ;
5) reporte l'état de chaque fonction dans suivi.md (toi seul) ; dis au chef où en sont les douze conditions.

En attente du chef : valeurs de VIT-12 et VIT-16 (NOM, HÉBERGEUR, N, DATE, E-MAIL, RÉSEAU, corrections du plan de VIT-16), relevé
Traefik (VIT-06b), plan de STA-01 (#230), M16 (P-85), avis A et B sur VSC-01 (#215). Alexis : #229 (CI rouge), #230, puis EDT-04.

Repères : Codex prend ce qui demande le modèle le plus fort ; l'agent de Cursor, les tâches bornées ; ClassQuiz est abandonné ;
aucun pays supposé (EP-5) ; tous les contextes (EP-18) ; sobre et mesuré (EP-19) ; rien de réel dans le dépôt public ; rien publié
en ligne sans demande du chef. Le champ « Autre » de l'outil de questions ne transmet pas toujours le texte. Dans les commandes
données au chef, jamais de « <n> ». Une CI rouge sur « Construire l'image du solveur » vient souvent de Maven Central : relancer.
Une fiche de session nouvelle par branche, jamais une fiche déjà sur main.

Règles : tu ne codes aucun lot ; plan validé avant le code ; questions avant toute supposition (outil de questions) ; relis
decisions.md avant de fixer le périmètre d'une mission ; chaque décision dans decisions.md, marquée *(coordinateur)* quand elle est
la tienne ; après un push, attends une minute avant gh pr checks --watch ; fiche de session et suivi.md à jour en fin de session ;
jamais de git push.
```
