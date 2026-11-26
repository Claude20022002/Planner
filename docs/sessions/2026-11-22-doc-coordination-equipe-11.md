# Session du 2026-11-22 (nuit) · coordination · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur, relais de la fiche `-10` (session neuve) |
| Chantier | hors chantier (coordination) |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | cette fiche ; état `e8c04970` puis le commit de cette fiche |

## Objectif de la session

Reprendre la coordination ; relire #236, VIT-19, #244, #248, #249, #234 ; reporter les suites de l'étude StudyLib dans leurs modules ; tenir `suivi.md`.

## Ouverture

- Sessions ouvertes (ListAgents) : `plan-b-projet-pacte-9e` (l'ancien coordinateur : « je ne coordonne plus ») ; `plan-b-projet-pacte-88` (le correctif d'UIX-11, fini) ; `plan-b-projet-pacte-2e` (session neuve, sans fonction). Aucune autre session ne coordonne.
- `git merge origin/main` (#247) : sans conflit (`4210937c`).
- Aucune PR fusionnée depuis le 22 nov. 0 h. CI de `main` (`e1858451`) **verte**.
- Boîtes : Codex, un rapport (VIT-11, 0 h 07), lu et rangé ; agent de Cursor, rien en sortie, le message de 0 h 10 (Meilisearch) pas encore lu ; Alexis, rien en sortie, le message de 0 h 11 attend que le chef le lui transmette.
- Aucune branche ADM-02, EP-18 ni « BIB » : ces trois sessions ne sont pas ouvertes.
- `feat/uix-10d-mobile-charte` est née à 0 h 20 : plan court validé par le chef (`94bfdbeb`), une vingtaine de fichiers du mobile modifiés et non commités. Sans doute Claude de VS Code ; aucune collision avec une PR ouverte.

## Relectures

| PR ou branche | Fonction | Verdict | Ce que j'ai relancé ; ce que je crois sur parole |
|---|---|---|---|
| #236 (`f346a293`, poussée) | VIT-11 | **prête** si les parcours sont verts | commits depuis le 21 nov. 18 h 40 lus : `cheminsLangues()` sur les deux pages, formule de l'IA de D2 (déjà validée, avec son test), `verifier-image.cjs` identique à `main`. Relancé : `npm run test:unit` 112 réussis, 1 sauté (preuves StudyLib, sans le clone), neutralité. Site vitrine et image Docker **verts** dans la CI ; parcours encore en file à 0 h 40. Lighthouse et axe-core crus sur parole |
| `feat/vit-19-ep19-poids` (`98880b8c`, locale) | VIT-19 | **à corriger** | diff et script lus ; relancé : tests 107/107, mesure verte (94,4 Ko), neutralité. **Écart à la réponse 3 du plan** : `estVideo()` exclut tout `videos/`, donc l'image fixe `/videos/planner-fr.webp` (41 Ko). Consigne de 0 h 35 : n'exclure que les fichiers vidéo, un test du cas inverse, le hash dans la fiche. Vu aussi : aucun `import` dans les scripts en ligne d'Astro aujourd'hui (la mesure ne les suivrait pas) |
| #248 (`732c1944`) | plan de QJE-14 | **prête** | documents seuls, CI verte, plan validé par le chef le 21 nov. |
| #249 (`c3619899`) | étude StudyLib | **prête** | documents seuls, CI verte. Sa ligne « État » est en retard (points 2 et 3 du § 5 tranchés) : `decisions.md` fait foi, je la corrige après la fusion |
| #234 (`8ba3a7ac`) | études 13 et 14 | **prête** | documents seuls, CI verte, sans conflit ; rien de réel (Go4School est un éditeur public). Passe avant #169 |
| #244 (`26660aa7`) | cache Maven | **à relancer** | un seul run (21 h 06), rouge sur le 429 de Maven Central (`spring-boot-starter-parent:4.1.2`) ; jamais relancé |

Non relus : #169 et #193 (en conflit, l'agent de Cursor les met à jour) ; le plan du retrait de Meilisearch (pas encore écrit) ; ADM-02, EP-18, « BIB » (sessions pas ouvertes).

## Décisions

- **Chef** (outil de questions) : dans l'étude 15, **la Bibliothèque passe à l'étape 3** ; cinq modules vendables aujourd'hui, sept à l'étape 3, cinq plus tard. Corrigé sur `etude/ven-modules-packs` (`f946d291`, locale) sans renuméroter.
- **Coordinateur** : #236, #248, #249, #234 prêtes ; VIT-19 à corriger ; #234 avant #169 ; #244 relancée une fois par le chef.
- Reports faits : UIX-10f sans objet (module UIX), EXP-09 réduite à ClassQuiz (EXP, taille gardée à M), COU-02 sur le stockage de BIB-05 (COU).

Tout est dans `decisions.md` (« 22 nov., nuit »), `suivi.md` et les fiches de mission de VIT-11 et de la fusion des études.

Hors dépôt : `codex\sortie\2026-11-22-0007-vit-11-main-et-image.md` rangé ; consignes déposées : `codex\entree\2026-11-22-0036-vit-11-relue.md`, `cursor\entree\2026-11-22-0035-vit-19-a-corriger.md`.

## Les douze conditions de la mise en ligne du site

| N° | Condition | État au 22 nov., 0 h 40 |
|---|---|---|
| 1 | audit de `vitrine/` et montée d'Astro | à faire le 27 nov. ou après (agent de Cursor) |
| 2 | mentions légales et confidentialité | #223 codée ; **attend les valeurs du chef** |
| 3 à 6, 8 | logos, non indexé, contenu, vidéo, pages par rôle | faites |
| 7 | illustrations | VIT-09a faite ; VIT-09b en dernier |
| 9 | catalogue et FAQ | **#236 prête**, à fusionner dès que ses parcours sont verts |
| 10 | ajouts d'après OpenEduCat | méga-menu dans #236 (prête) ; restent VIT-13 (plan au chef, agent de Cursor sous Grok 4.7 high), VIT-15 (Codex, après VIT-09c ; ne l'attend pas), VIT-16 (attend le chef) |
| 11 | contact réel | VIT-16 : attend E-MAIL, RÉSEAU et les corrections du plan |
| 12 | pas de saut du menu, performance ≥ 90 | faite (#237, #246) |

Avant le déploiement aussi : VIT-06b (attend `N` et le relevé Traefik), VIT-19 (à corriger), et le `.env` du serveur complet pour QUA-10.

## Questions

| N° | Question | À qui | État |
|---|---|---|---|
| 1 | Valeurs de VIT-12 et VIT-16 | chef | en attente |
| 2 | Relevé Traefik (VIT-06b) | chef | en attente |
| 3 | Plan de STA-01 (#230) | chef | en attente |
| 4 | M16 (P-85) ; avis A et B sur VSC-01 (#215) | chef | en attente |
| 5 | Question 3 du plan d'UIX-06c (UIX-06d) | chef | ouverte |
| 6 | Volumes de StudyLib (commande de comptage) ; `.env` du serveur pour QUA-10 | chef | en attente |
| 7 | Points 4 à 7 du § 5 de l'étude StudyLib (préfixe ou seau, redéploiement, vidéos YouTube, durée de l'image) | chef, dans le plan de BIB-05 | ouverts |

## Reste à faire, dans l'ordre

1. Le chef fusionne #248, #249 et #234 (documents, verts) ; puis #236 quand ses parcours sont verts.
2. Le chef pousse `etude/ven-modules-packs` (`f946d291`), attend la CI de #242, la fusionne.
3. Le chef relance #244 ; si le 429 revient, l'agent de Cursor écrit le plan `setup-java`, je le valide.
4. Le chef dit « lis ta boîte » à Codex et à l'agent de Cursor ; il transmet à Alexis son message de 0 h 11.
5. Le chef ouvre les sessions **ADM-02**, **EP-18** et **« BIB »** (prompts dans leurs fiches) ; leurs questions et plans vont au chef, je les relis.
6. Après la fusion de #234 : je classe chaque ligne de la synthèse 14 par public (supérieur, scolaire, tous). Après celle de #249 : je corrige sa ligne « État ».
7. Agent de Cursor : correction de VIT-19, plan de Meilisearch (au chef), #244 si besoin, #169, #193.
8. Codex : VIT-09c après la fusion de #236, puis VIT-15.
9. Ordre des fusions du site : VIT-11, #223 après les valeurs du chef, VIT-16, VIT-13, VIT-15, VIT-19, VIT-09b en dernier.

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner (Codex, agent de Cursor sous « Auto » pour le court et Grok 4.7 high pour M et plus,
Claude de VS Code, les sessions Claude ouvertes par le chef, et Alexis avec son agent). Tu prends le relais de la coordination
du 22 nov. (nuit, fiche docs/sessions/2026-11-22-doc-coordination-equipe-11.md).
Travaille dans ..\travaux-planner\coordination-equipe, branche doc/coordination-equipe. Commence par git fetch puis git merge origin/main
(decisions.md : garde toutes les lignes ; suivi.md : garde notre version, puis remets-le à l'état réel). Une seule session de
coordination à la fois : liste les sessions ouvertes (ListAgents) ; si l'une coordonne, arrête-toi.

Lis d'abord : AGENTS.md ; docs/plan/README.md (§ 2 ; EP-5, EP-13, EP-18, EP-19) ; docs/plan/decisions.md (sections du 21 nov.
« fin de soirée », « 21 et 22 nov. : la Bibliothèque reconstruite et QJE-14 » et « 22 nov., nuit ») ; docs/plan/suivi.md (Chantiers,
Missions en cours, Migrations) ; docs/plan/feuille-de-route.md ; les skills coordination, relecture-branche et fin-de-session ;
la fiche -11 ; l'étude StudyLib (#249, § 5 et § 8) ; l'étude 15 (#242, corrigée le 22 nov. : la Bibliothèque à l'étape 3).

Décisions à garder en tête : le supérieur jusqu'au bout ; ADM ouvert (ADM-02 avec MOT-13c, session Claude neuve, plan au chef ;
ADM-10 après ADM-02) ; Bibliothèque en voie B, exception hors chantier, six fiches, migrations 0084 à 0086 (QJE-14) et 0087 (BIB-05)
réservées, BIB-10 tient l'onglet mobile avant STA-03 ; étude 15 : cinq modules vendables aujourd'hui, sept à l'étape 3 ;
VIT-09c par Codex après VIT-11, VIT-15 ne l'attend pas ; QUA-10 demande un .env du serveur complet avant tout déploiement ;
Alexis a une boîte (boites\alexis\), que le chef lui transmet.

Commence par le tour d'état (skill coordination, § 1), les quatre boîtes, la CI de main, et gh pr list --state merged depuis
le 22 nov. 0 h 40.

Puis, dans l'ordre :
1) vérifie la fusion de #248, #249, #234, #236 et #242 ; après #234, classe chaque ligne de la synthèse 14 par public
   (supérieur, scolaire, tous) ; après #249, corrige sa ligne « État » (points 2 et 3 du § 5 tranchés, 4 à 7 au chef) ;
2) relis la correction de VIT-19 (agent de Cursor, consigne de 0 h 35), le plan du retrait de Meilisearch (au chef), #244 après
   sa relance (plan setup-java si le 429 revient), puis #169 et #193 ;
3) relis le plan de VIT-09c (Codex, M, tu le valides) ; suis UIX-10d (Claude de VS Code, feat/uix-10d-mobile-charte) ;
4) suis l'ouverture des sessions ADM-02, EP-18 et « BIB » : leurs questions et leurs plans vont au chef ;
5) tiens l'ordre des fusions du site : VIT-11, #223 après les valeurs du chef, VIT-16, VIT-13, VIT-15, VIT-19, VIT-09b en dernier ;
6) reporte l'état de chaque fonction dans suivi.md (toi seul) ; dis au chef où en sont les douze conditions.

En attente du chef : valeurs de VIT-12 et VIT-16, relevé Traefik (VIT-06b), plan de STA-01 (#230), M16 (P-85), avis A et B sur
VSC-01 (#215), question 3 du plan d'UIX-06c (UIX-06d), volumes de StudyLib, .env du serveur pour QUA-10, points 4 à 7 du § 5 de
l'étude StudyLib. Alexis : #229, #230, EDT-04, puis STA-03 et BIB-11.

Repères : aucun pays supposé (EP-5) ; tous les contextes (EP-18) ; sobre et mesuré (EP-19) ; rien de réel dans le dépôt public ;
rien publié en ligne sans demande du chef. Le champ « Autre » de l'outil de questions ne transmet pas toujours le texte. Dans les
commandes données au chef, jamais de « <n> ». Une CI rouge sur l'image du solveur vient souvent de Maven Central : relancer.
Une relecture d'une PR du site relance aussi le contrôle de l'image (Docker). Une fiche de session nouvelle par branche.

Règles : tu ne codes aucun lot ; plan validé avant le code ; questions avant toute supposition (outil de questions) ; relis
decisions.md avant de fixer le périmètre d'une mission ; chaque décision dans decisions.md, marquée *(coordinateur)* quand elle est
la tienne ; après un push, attends une minute avant gh pr checks --watch ; fiche de session et suivi.md à jour en fin de session ;
jamais de git push.
```
