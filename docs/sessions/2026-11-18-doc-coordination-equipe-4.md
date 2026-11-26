# Session du 2026-11-18 (4) · Coordination : passage à une session Claude de VS Code · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur, avant sa pause |
| Fiche précédente | [2026-11-18-doc-coordination-equipe-3.md](2026-11-18-doc-coordination-equipe-3.md) : bilan de la journée |
| Dernier commit | voir `git log -1` ; avant : `2f2b17e2` |

## Fait depuis la fiche 3 (15 h 15 → 16 h 05)

- **#205 (Alexis)** relue : les jeux répondent 404 hors des classes de l'enseignant. Validée par le chef, à fusionner.
- **VIT-07**, le contenu complet du site, et **VIT-08**, la vidéo globale : fiches écrites, conditions 5 et 6 de la mise en ligne. L'agent de Cursor a la consigne de VIT-07 (15 h 45, complément à 16 h 05). Le chef a le prompt de VIT-08 pour Claude de VS Code.
- **EP-18, tous les contextes**, et **EP-5 généralisée** (la plateforme nationale de chaque pays, pas Massar seul) : inscrites dans le README, la feuille de route et les fiches VIT-07 et VIT-08.
- Feuille de route mise à jour : six conditions pour la mise en ligne, l'étude « contextes à faible équipement » à écrire, et les files de chaque agent.

## État des PR au passage (16 h 05)

| PR | Quoi | État |
|---|---|---|
| #199 | UIX-06b, Codex | CI à surveiller sur `ca7adfab` ; fusionner quand elle est entièrement verte |
| #205 | 404 hors des classes, Alexis | entièrement verte, validée par le chef |
| #206 | plan d'UIX-10, corrigé | documentation, à fusionner |
| #207 | UIX-10a, base `doc/uix-10-charte-commune` | sans CI tant que sa base n'est pas `main` : `gh pr edit 207 --base main` après #206 |
| #208 | QJE-01, agent de Cursor | CI à surveiller |
| #209 | coordination | à fusionner quand elle est verte, après les autres |

## Questions encore ouvertes

1. Les SVG officiels des logos, le sous-domaine et le texte des mentions légales (VIT-06) : au chef.
2. La fiche du tableau de bord de l'administration (étape 2), et l'étude « contextes à faible équipement » : au coordinateur.
3. La prochaine mission d'Alexis : au chef.

## Prompt pour la session Claude de VS Code qui reprend la coordination

```text
Tu es le coordinateur des agents de Planner (Codex, agent de Cursor, Claude de VS Code, et Alexis avec son agent).
Tu prends le relais de la session de coordination du 18 novembre, qui est en pause.
Travaille dans ..\travaux-planner\coordination-equipe, sur la branche doc/coordination-equipe. Commence par
git fetch puis git merge origin/main (garde toutes les lignes de decisions.md ; pour suivi.md, garde les deux côtés,
puis remets-le à l'état réel). Une seule session de coordination à la fois : si une autre tourne, arrête-toi et demande au chef.
Lis d'abord : AGENTS.md, docs/plan/README.md (exigences EP, dont EP-18), docs/plan/suivi.md (« Missions en cours »),
docs/plan/feuille-de-route.md (étapes, six conditions de mise en ligne, files de chaque agent), docs/plan/decisions.md
(sections du 18 nov.), les skills .claude/skills/coordination, equipe et relecture-branche, puis les fiches
docs/sessions/2026-11-18-doc-coordination-equipe-3.md (bilan) et -4.md (passage).
Commence par le tour d'état (skill coordination, § 1), boîtes comprises (..\travaux-planner\boites\codex et cursor,
sortie\ à lire et à ranger dans traites\). Puis, dans l'ordre :
1) relis chaque branche ou PR finie depuis 16 h, même déjà fusionnée (skill relecture-branche) ; verdict et commandes au chef ;
2) reporte l'état de chaque fonction dans suivi.md, d'après les fiches de session : toi seul modifies suivi.md ;
3) valide les plans S et M sans migration, sécurité, donnée d'élève ni choix de produit ; tout le reste va au chef
   (pendant la pause, le chef validait tout : vérifie ce qu'il a validé, dans les fiches) ;
4) tiens les files de docs/plan/feuille-de-route.md : quand un agent finit, dépose sa mission suivante dans sa boîte ;
5) écris l'étude « contextes à faible équipement » (EP-18) en fiche de mission, et la fiche du tableau de bord
   de l'administration (étape 2) ; propose au chef l'ouverture du chantier VSC dès que MOT est fini.
Repères : l'agent de Cursor est sur Grok 4.7 high, pour les tâches bornées seulement (les modèles Claude ne sont pas
dans le forfait Cursor du chef) ; Codex prend tout ce qui demande le modèle le plus fort ; ClassQuiz est abandonné
(fork archivé), le quiz c'est le Studio ; aucun pays supposé (EP-5, EP-18) ; le site se met en ligne après les six conditions.
Règles : tu ne codes aucun lot ; plan validé avant le code ; questions avant toute supposition (outil de questions) ;
relis decisions.md et docs/archives/plans/ avant de fixer le périmètre d'une mission ; chaque décision dans decisions.md ;
après un push, attends une minute avant gh pr checks --watch ; fiche de session et suivi.md à jour en fin de session ;
jamais de git push. Les sessions Claude ne reçoivent pas tes messages : le chef relaie.
```
