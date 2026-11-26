# Session du 2026-11-21 (soir) · coordination · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur |
| Chantier | hors chantier (coordination) |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | cette fiche ; état `09530205` ; fusion de `main` `b6935c72` |

## Objectif de la session

Reprendre la coordination du 21 nov. au matin (fiche `-7`) : tour d'état, boîtes, relecture des PR rendues, files des agents, état réel dans `suivi.md`.

## Fait

| Commit | Contenu |
|---|---|
| `b6935c72` | `git merge origin/main` (#189, #186, #191, #192, #221). Conflits : README du plan (§ 2 du 21 nov. gardé, **EP-13** ajoutée avant EP-18 et EP-19), modèle de conception (§ 7 bis gardé), module MOB, `suivi.md` (notre version, puis remis à l'état réel). **Deux MOB-08** : celle du 16 nov. (pdf.js) devient **MOB-09** ; l'appel à la main hors ligne garde MOB-08 |
| `09530205` | `suivi.md` à l'état réel (chantiers, fonctions, missions en cours) ; 7 lignes dans `decisions.md` ; feuille de route ; dernière relecture dans 5 fiches de mission |

Hors dépôt : dix rapports du 21 nov. lus et rangés dans `boites\<codex et cursor>\sortie\traites\` ; deux consignes déposées : `cursor\entree\2026-11-21-1845-vit-17-maj-et-etudes.md`, `codex\entree\2026-11-21-1850-qua-10-et-vit-11.md`.

Seule session de coordination : `ListAgents` ne montre aucune autre session Claude sur le poste.

## Relectures

| PR | Fonction | Verdict | Ce que j'ai relancé ; ce que je crois sur parole |
|---|---|---|---|
| #228 | VIT-18 | **prête**, CI verte | relue le matin ; CI vérifiée |
| #235 | UIX-10b | **prête**, CI verte | depuis la relecture, seule la fiche a changé (`e0b9af3d`) |
| #238 | MOT-13, coupure fine | **prête**, CI verte | diff lu contre le plan validé par le chef le 15 nov. ; suites serveur et solveur : CI |
| #239 | MOT-02, supérieur | **prête**, CI verte | banc : **25/25** relancés ; remarques non bloquantes : lien du § 12 vers la branche de coordination, `superieur-probleme.json` de 2,3 Mo |
| #237 | VIT-17 | **à corriger** (mise à jour seulement) | tests **99/99**, build (pas de `dist/ar/`), neutralité, Lighthouse mobile `/fr/` : **99, CLS 0,037, 132 Ko** ; CSP de VIT-06 compatible. CI rouge par Maven Central ; conflit d'une ligne avec #228 (module VIT) |
| #236 | VIT-11 | **à reprendre après #237** | diff lu ; ses deux pages construisent encore l'arabe (`LANGUES`) |

Simulation des fusions (`git merge-tree`) : #228, #235, #238, #239 passent l'une après l'autre sans conflit ; #237 et #236 se heurtent à #228 dans `docs/plan/modules/VIT-site-vitrine.md` (ajouts de lignes au même endroit).

## Décisions

- **Chef** (outil de questions) : MOT se ferme à la fusion de #239 et ADM s'ouvre (MOT-13c avec ADM-02 ; MOT-04 attend la réouverture de MOT) ; UIX-06c par Claude (VS Code) seul, après UIX-11 ; DOC-03 reste en local jusqu'à l'étape 6.
- **Coordinateur** : MOB-08 de pdf.js renumérotée MOB-09 ; plan d'UIX-11 validé (réponse 5 : taux de conflits retiré ; réponse 6 : lundi au dimanche, isolé dans `periodes.js`) ; #188 se ferme ; ordre des fusions ; VIT-11 n'attend pas #223 ; ordre proposé pour ADM (ADM-02 et MOT-13c, ADM-01, ADM-03, ADM-04).

## Écarts relevés

- `docs/plan/modules/MOT-moteur.md` dit MOT-03 « PR ouverte (#183) » (fusionnée le 18 nov.) et MOT-13 « PR à ouvrir » : à corriger dans le fichier du module après la fusion de #238 et #239, qui le touchent toutes deux.
- Étude EP-18 : aucune branche ni dossier visibles à 18 h.
- Branches locales non poussées : `etude/vsc-01-modele-scolaire` (N7), `feat/uix-11-tableau-de-bord` (plan), `feat/uix-06c-ressources-temps` (renvoi au thème), `feat/qua-10-envois-explicites`, `doc/doc-03-complements-parite` (gardée en local), et les anciennes (`pla-03b-schema-depart` : 10 fichiers non commités depuis le 15 nov. ; `mkt-05-video-presentation`).
- `vit-17-correctifs-vitrine` : `_mesure-avant/` non suivi et un stash (consigne à l'agent de Cursor).

## Les douze conditions de la mise en ligne du site

| N° | Condition | État |
|---|---|---|
| 1 | audit de `vitrine/` et montée d'Astro | **à faire le 27 nov. ou après** (agent de Cursor) |
| 2 | mentions légales et confidentialité | #223 codée ; **attend les valeurs du chef** (NOM, HÉBERGEUR, N, DATE, E-MAIL) |
| 3 | logos officiels | faite (#220) |
| 4 | site non indexé | faite (#221 : `X-Robots-Tag: noindex`, `robots.txt`) |
| 5 | contenu complet | faite (#214) |
| 6 | vidéo | faite (#216, #232) |
| 7 | illustrations | VIT-09a faite (#222) ; VIT-09b : plan validé, code en dernier |
| 8 | pages par rôle | faite (#219) |
| 9 | catalogue et FAQ | #236, à reprendre après #237 |
| 10 | ajouts d'après OpenEduCat | faits : VIT-10b, VIT-14, VIT-14b, VIT-09a ; prêt : VIT-18 (#228) ; restent le méga-menu (#236), VIT-13 (plan), VIT-15 (après VIT-11), VIT-16 (**attend le chef**) |
| 11 | contact réel | VIT-16 : **attend E-MAIL, RÉSEAU et les corrections du plan** |
| 12 | pas de saut du menu, performance ≥ 90 | **tenue** dans #237 (99), à fusionner après sa mise à jour |

Avant le déploiement aussi : VIT-06b (journaux), qui attend `N` et **le relevé Traefik** du chef ; VIT-19 (200 Ko par page en CI), plan après VIT-17.

## Questions

| N° | Question | À qui | État |
|---|---|---|---|
| 1 | Valeurs de VIT-12 et VIT-16 (NOM, HÉBERGEUR, N, DATE, E-MAIL, RÉSEAU, corrections du plan de VIT-16) | chef | en attente |
| 2 | Relevé de la configuration Traefik du VPS (VIT-06b) | chef | en attente |
| 3 | Plan de STA-01 (#230 : EP-5, migration 0083, route publique, brouillons visibles) | chef | en attente |
| 4 | M16 (P-85) ; avis A et B sur VSC-01 (#215) | chef | en attente |
| 5 | Qui fait ADM-02 (L) à l'ouverture d'ADM | chef | à proposer : Codex après VIT-11 et QUA-10, ou une session Claude neuve sur le modèle le plus capable |

## Reste à faire, dans l'ordre

1. Le chef fusionne #228, #235, #238, #239 et ferme #188 ; il pousse VSC-01, UIX-11, UIX-06c et cette branche.
2. Après #239 : MOT fermé, ADM ouvert dans `suivi.md` ; fiche de mission d'ADM-02 ; module MOT corrigé (MOT-03, MOT-13).
3. Agent de Cursor : mise à jour de #237, puis les études #190, #169, #234, #193, puis VIT-19 (plan, au coordinateur), VIT-13 (plan, au chef).
4. Codex : QUA-10 étape 6 ; VIT-11 dès la fusion de #237 ; puis VIT-15.
5. Claude (VS Code) : UIX-11 (code) après #235 ; puis UIX-06c seul.
6. Session de l'expertise : VIT-18b après #228.
7. Après la fusion de #234 : classer chaque ligne de la synthèse 14 par public (supérieur, scolaire, tous).
8. Alexis : #229 (CI rouge), #230, puis EDT-04.

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner (Codex, agent de Cursor sur Grok 4.7 high, Claude de VS Code, les sessions Claude ouvertes
par le chef, et Alexis avec son agent). Tu prends le relais de la session de coordination du 21 nov. au soir.
Travaille dans ..\travaux-planner\coordination-equipe, branche doc/coordination-equipe. Commence par git fetch puis git merge origin/main
(decisions.md : garde toutes les lignes ; suivi.md : garde notre version, puis remets-le à l'état réel). Une seule session de
coordination à la fois : liste les sessions ouvertes (ListAgents) ; si l'une coordonne, arrête-toi.

Lis d'abord : AGENTS.md ; docs/plan/README.md (§ 2 du 21 nov. : le supérieur d'abord ; EP-13, EP-18, EP-19) ; docs/plan/decisions.md
(sections du 21 nov., matin et soir) ; docs/plan/suivi.md (Chantiers, Missions en cours) ; docs/plan/feuille-de-route.md (douze
conditions, ordre des fusions, files) ; les skills coordination, relecture-branche et fin-de-session ; puis la fiche
docs/sessions/2026-11-21-doc-coordination-equipe-8.md (relectures, douze conditions, reste à faire).

Décisions à garder en tête : le supérieur jusqu'au bout, puis formation professionnelle, lycée, collège ; MOT se ferme à la fusion
de #239 et ADM s'ouvre (MOT-13c avec ADM-02 ; MOT-04 attend la réouverture de MOT) ; UIX-06c par Claude (VS Code) seul après UIX-11 ;
pdf.js est MOB-09, MOB-08 est l'appel à la main hors ligne ; DOC-03 reste en local jusqu'à l'étape 6 ; VSC-01 se termine en
conception puis se gèle ; chaque plan a la section « Ce que disent les études », sinon il n'est pas validé.

Commence par le tour d'état (skill coordination, § 1), boîtes comprises (..\travaux-planner\boites\codex et cursor, sortie\ et
entree\), et vérifie ce qui a été fusionné depuis le 21 nov. à 18 h 50 (gh pr list --state merged). Attendus : #228, #235, #238,
#239 fusionnées, #188 fermée.

Puis, dans l'ordre :
1) si #239 est fusionnée : MOT passe dans « Fermés », ADM dans « Ouverts » (suivi.md) ; écris la fiche de mission d'ADM-02 (avec
   MOT-13c ; L : plan au chef) et propose au chef son agent ; fais corriger le module MOT (MOT-03 fait, #183 ; MOT-13 coupure fine
   fusionnée) ;
2) relis ce que les agents rendent : #237 mise à jour (VIT-17), #236 reprise (VIT-11 : cheminsLangues, budget 4 Kio, Lighthouse),
   QUA-10 étape 6, les études #190, #169, #234, #193, le plan de VIT-19 (tu le valides : S) ;
3) suis VIT-18b (session de l'expertise, après #228) et UIX-11 (Claude de VS Code, après #235) ;
4) reporte l'état de chaque fonction dans suivi.md : toi seul le modifies ;
5) tiens l'ordre des fusions du site : VIT-17, VIT-11 (n'attend pas #223), #223 après les valeurs du chef, VIT-16, VIT-13, VIT-15,
   VIT-19, VIT-09b en dernier ;
6) après la fusion de #234, classe chaque ligne de la synthèse 14 par public (supérieur, scolaire, tous) ;
7) dis au chef où en sont les douze conditions (tableau de la fiche -8) et ce qui bloque.

En attente du chef : valeurs de VIT-12 et VIT-16 (NOM, HÉBERGEUR, N, DATE, E-MAIL, RÉSEAU, corrections du plan de VIT-16), relevé
Traefik (VIT-06b), plan de STA-01 (#230), M16 (P-85), avis A et B sur VSC-01 (#215), l'agent d'ADM-02. Étude EP-18 : rien de visible
le 21 nov. à 18 h, à demander. Alexis : #229 (CI rouge), #230, puis EDT-04.

Repères : Codex prend ce qui demande le modèle le plus fort ; l'agent de Cursor, les tâches bornées ; ClassQuiz est abandonné ;
aucun pays supposé (EP-5) ; tous les contextes (EP-18) ; sobre et mesuré (EP-19) ; rien de réel dans le dépôt public ; rien publié
en ligne sans demande du chef. Le champ « Autre » de l'outil de questions ne transmet pas le texte. Dans les commandes données au
chef, jamais de « <n> ». Une CI rouge sur « Construire l'image du solveur » vient souvent de Maven Central : relancer.

Règles : tu ne codes aucun lot ; plan validé avant le code ; questions avant toute supposition (outil de questions) ; relis
decisions.md avant de fixer le périmètre d'une mission ; chaque décision dans decisions.md, marquée *(coordinateur)* quand elle est
la tienne ; après un push, attends une minute avant gh pr checks --watch ; fiche de session et suivi.md à jour en fin de session ;
jamais de git push.
```
