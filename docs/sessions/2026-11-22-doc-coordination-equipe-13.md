# Session du 2026-11-22 (1 h à 10 h 55) · coordination · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur, session `plan-b-projet-pacte-92`, suite de la fiche `-12` |
| Chantier | hors chantier (coordination) |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | cette fiche ; état `ae478e81` |

## Ce qui a été fusionné depuis 1 h

#169, #234 (1 h 06), #250 (VIT-19, 8 h 52), #236 (VIT-11), #248 (plan de QJE-14), #249 (étude StudyLib), #244 (cache Maven, parcours enfin verts), 9 h 28 ; #251 (UIX-10d, 9 h 38).

## PR ouvertes à suivre

| PR | Quoi | État |
|---|---|---|
| #252 | BIB-05 (migration 0087) | relue, prête ; **la suite d'intégration doit être verte en CI** avant la fusion |
| #253 | étude EP-18 | relue, prête (documents) |
| #254 | VIT-13 | relue, prête ; un fichier temporaire non suivi à supprimer chez l'agent |
| #242 | étude 15 | prête (fusion automatique) |
| #193 | plan de parité | corrigée (VSC-13), prête, en dernier des études |

## Missions en cours

| Agent | Mission | État au 22 nov., 10 h 55 |
|---|---|---|
| Codex | **MKT-09** : la présentation du produit entier (trame d'abord, au chef), puis le plan de VIT-09c, puis VIT-15 | **boîte pas encore lue** (messages de 1 h 05 et 9 h 25) |
| Agent de Cursor | VIT-13 faite ; puis M-12, M-11, M-9 (correctifs d'EP-18), sous « Auto » | **rapport de 10 h 34 (plan de M-12) pas encore relu** : à relire en premier |
| Session `plan-b-projet-pacte-20` | étude EP-18 faite (#253) ; **M-10** (décalage horaire de l'école, `fix/qua-decalage-ecole`) : serveur et site codés, amendement validé (`maintenantEcole()`), l'application en cours ; ensuite M-1 (feuille d'appel) | relecture à son rapport final |
| Session ADM-02 (ouverte par le chef, non listée) | plan validé par le chef (`49488efd`, migration 0088) ; deux ajouts demandés avant ADM-02a, par le chef | message à lui transmettre (voir les commandes) |
| Claude de VS Code | UIX-10d fusionnée ; suite : UIX-10e (plan court au coordinateur) | prompt à lui transmettre par le chef |
| Session « BIB » | BIB-05 faite ; BIB-06 dans une session neuve, sur `feat/bib-06-api-documents` tirée de BIB-05 | à ouvrir par le chef |
| Alexis | #229 à corriger ; #230 attend le plan validé ; message de 0 h 11 (STA-03, BIB-11) | à transmettre par le chef |

## Décisions de la session

Toutes dans `decisions.md`, sections « 22 nov., 1 h » et « 22 nov., matin » : relais de la coordination ; VIT-19, #244, #193, BIB-05, #251, VIT-13, EP-18 relues ; MKT-09 confiée à Codex (`.pptx` dans `..\planner-marketing`, aucun prix, existant et objectifs, preuve anonyme) ; synthèse 14 classée par public (41, 4, 1) ; ligne « État » de l'étude StudyLib corrigée ; **collision sur ADM-02** (deux sessions, deux jeux de réponses) tranchée par le chef pour le plan de 9 h 37 ; migration **0088** réservée ; EP-18 : réponses 1 à 11, ordre des cinq correctifs et leur répartition, section « 7 ter » du modèle de conception ; M-10 validé puis amendé ; avant de déployer `main` : le `.env` de QUA-10 et **`APP_TIMEZONE`**.

## Leçon

Avant de remettre une mission, relire le dossier de travail lui-même (`git status -s --untracked-files=all`, dates des fichiers), pas seulement la branche : une session non listée peut y écrire.

## Les douze conditions du site

Faites : 3 à 6, 8, 9 (VIT-11), 12. Condition 10 : VIT-13 prête (#254) ; restent VIT-15 (Codex) et VIT-16 (valeurs du chef). 2 et 11 : valeurs du chef. 7 : VIT-09b en dernier. 1 : le 27 nov. Avant le déploiement : VIT-06b (relevé Traefik), le `.env` de QUA-10, `APP_TIMEZONE`.

## En attente du chef

Valeurs de VIT-12 et VIT-16 ; relevé Traefik (VIT-06b) ; plan de STA-01 (#230) ; M16 (P-85) ; avis A et B sur VSC-01 (#215) ; question 3 d'UIX-06c ; volumes de StudyLib ; plan du retrait de Meilisearch (question 1 et l'étape 5, StudyLib ne tourne plus) ; l'agent de QJE-14a (qui fera aussi M-2a) ; le seau et la clé MinIO de Planner sur le serveur.

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner (Codex, agent de Cursor sous « Auto » pour le court et Grok 4.7 high pour M et plus,
Claude de VS Code, les sessions Claude ouvertes par le chef, et Alexis avec son agent). Tu prends le relais de la coordination
du 22 nov. (fiche docs/sessions/2026-11-22-doc-coordination-equipe-13.md).
Travaille dans ..\travaux-planner\coordination-equipe, branche doc/coordination-equipe. Commence par git fetch puis git merge origin/main
(decisions.md : garde toutes les lignes ; suivi.md : garde notre version, puis remets-le à l'état réel ; module VIT : garde l'état le plus récent).
Une seule session de coordination à la fois : liste les sessions ouvertes (ListAgents) ; si l'une coordonne, arrête-toi.

Lis d'abord : AGENTS.md ; docs/plan/README.md (§ 2 ; EP-18, EP-19) ; docs/plan/decisions.md (sections « 22 nov., nuit », « 22 nov., 1 h »
et « 22 nov., matin ») ; docs/plan/suivi.md (Chantiers, Missions en cours, Migrations) ; les skills coordination, relecture-branche
et fin-de-session ; la fiche -13 ; les fiches de mission mkt-09-presentation-produit, ep18-correctifs et adm-02.

Décisions à garder en tête : le supérieur jusqu'au bout ; ADM ouvert, ADM-02 au plan de 9 h 37 (migration 0088), tenu par une session
que le chef a ouverte et que ListAgents ne montre pas (passer par le chef) ; la Bibliothèque en voie B, BIB-05 faite (#252), BIB-06 à ouvrir ;
EP-18 : cinq correctifs dans l'ordre M-10, M-1 (session 20), M-2a (agent de QJE-14a), M-9, M-11 et M-12 (agent de Cursor), plans courts
validés par toi, et la section « 7 ter. EP-18 » du modèle de conception pour tout plan nouveau ; MKT-09 : trame d'abord, au chef, dans
..\planner-marketing, aucun prix, aucun pays, aucun concurrent sur une diapositive ; avant de déployer main : le .env de QUA-10 et APP_TIMEZONE.

Commence par le tour d'état (skill coordination, § 1), les quatre boîtes, la CI de main, et gh pr list --state merged depuis le 22 nov. 10 h 55.

Puis, dans l'ordre :
1) relis le plan de M-12 de l'agent de Cursor (cursor\sortie\2026-11-22-1034-m-12-plan.md) et valide-le (S) : ni slug ni identifiant
   de paquet sans le chef ; les bâtiments « Stendhal » et « Gandhi » de shared/session.js y sont ;
2) suis M-10 (session plan-b-projet-pacte-20) jusqu'à son rapport final, relis la branche fix/qua-decalage-ecole (skill relecture-branche),
   puis M-1 ;
3) relis la trame de MKT-09 et le plan de VIT-09c dès que Codex les rend (la trame va au chef après toi ; VIT-09c, tu le valides) ;
4) suis les fusions : #252 (intégration verte d'abord), #253, #254, #242, #193 ; après #253, range les manques M-3 à M-16 de l'étude EP-18
   dans leurs modules (MOB-08 dépend de MOB-02) ;
5) tiens l'ordre des fusions du site : VIT-13, #223 après les valeurs du chef, VIT-16, VIT-15, VIT-09b en dernier ;
6) reporte l'état de chaque fonction dans suivi.md (toi seul) ; dis au chef où en sont les douze conditions.

En attente du chef : voir la fiche -13, « En attente du chef ».

Repères : aucun pays supposé ; tous les contextes (EP-18) ; sobre et mesuré (EP-19) ; rien de réel dans le dépôt public ; rien publié
en ligne sans demande du chef. Le champ « Autre » de l'outil de questions ne transmet pas toujours le texte. Dans les commandes données
au chef, jamais de « <n> ». Une CI rouge sur l'image du solveur vient souvent de Maven Central : relancer. Nomme tes messages de boîte
avec l'heure réelle du poste (date +%H:%M), pas une heure estimée. Avant de remettre une mission, relis le dossier de travail lui-même
(fichiers non suivis compris).

Règles : tu ne codes aucun lot ; plan validé avant le code ; questions avant toute supposition (outil de questions) ; relis decisions.md
avant de fixer le périmètre d'une mission ; chaque décision dans decisions.md, marquée *(coordinateur)* quand elle est la tienne ;
après un push, attends une minute avant gh pr checks --watch ; fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
