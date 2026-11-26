# Session du 2026-11-26 · VIT-09d · `feat/vit-09d-logos-style-planner`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session neuve dans VS Code |
| Chantier | VIT, hors chantier (demande du chef, 26 nov.) |
| Dossier de travail | `..\travaux-planner\vit-09d-logos-style-planner` |
| Dernier commit | `74e5637f` (essai), puis cette fiche |

## Objectif de la session

Proposer les 20 logos des applications dans le style du logo Planner, en deux séries (A : tuile bleu nuit commune ; B : teinte de l'application), pour que le chef les compare aux logos actuels. Cette session : plan, validation, essai sur trois logos, planche.

## Plan

[docs/conception/vitrine/vit-09d-logos-style-planner.md](../conception/vitrine/vit-09d-logos-style-planner.md), **validé par le coordinateur le 26 nov.**. Le choix du rendu reste au chef, sur la planche.

## Fait

- `5ac275f9` : plan court, commité seul. Il intègre les réponses du chef aux questions 4 à 7.
- `e744d19f` : validation du coordinateur inscrite (Q1 et Q2 : oui ; Q3 : au chef, sur la planche), avec ses deux points d'attention.
- `74e5637f` : l'essai sur trois logos, dans les deux séries, le script `generer-planche.mjs` et la ligne VIT-09d du fichier du module.

### Objet dessiné, logo par logo (le même dans les deux séries)

| id | Série A et série B | Écart avec le plan |
|---|---|---|
| `planning` | calendrier à anneaux blancs, bandeau bleu clair et bande d'ombre en aplat ; sur la page, un cadran bleu clair à deux aiguilles à bouts ronds | aucun ; la « grille » du plan est retirée : à 24 px, elle brouillait le cadran |
| `presences` | planchette blanche, pince bleu clair percée, bande d'ombre sous la pince, grande coche à bouts ronds | aucun |
| `activites` | manette générique, d'un seul tracé à poignées en trapèze, **sans croix ni boutons** (point d'attention du coordinateur) ; un grand point d'interrogation au centre, réduite à 88 % pour garder la marge des autres objets | les ronds bleus sont retirés : à 24 px, ils faisaient deux yeux de part et d'autre du point d'interrogation |
| 17 autres | à dessiner, après l'accord du chef sur la direction | — |

Rendus regardés avant de montrer, à 24 px (agrandis au pixel) et à 96 px, sur fond clair et sombre. Variantes écartées :
- pour la manette : corps rond à poignées en cercle (forme de nuage), poignées en ellipses, disque bleu derrière le signe (à 24 px, le point d'interrogation bave) ;
- pour le calendrier, un premier cadran plus petit, illisible à 24 px.

## Vérifié

- `node --test shared/icones/icones.test.js` : 8 sur 8. Le dossier `essais/` n'est pas lu par le test.
- `generer-planche.mjs` : 3 applications, 3 + 3 logos vérifiés. Poids de 820 à 980 octets par logo (plafond : 4 Ko).
- Contrôles du script essayés à la main : il refuse bien un `<text>`, une couleur hors série (le jaune `jeu` en A, la teinte d'une autre application en B), un identifiant non préfixé, un `viewBox` qui n'est pas carré.
- Captures, hors du dépôt :
  - `C:\Users\clusa\Desktop\Github Project\travaux-planner\captures-vit-09d\essai-planche.png` (la planche) ;
  - `C:\Users\clusa\Desktop\Github Project\travaux-planner\captures-vit-09d\essai-24px-agrandis.png` (rendus à 24 px agrandis ×6, et à 96 px).

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 3 | Rayon de la tuile, tuile B en aplat, changement d'objet | oui ; oui ; au chef, sur la planche (coordinateur, 26 nov.) | réglées |
| 4 à 7 | Même dessin en A et en B, jaune exclu, filet clair, détails B dans le ton foncé | oui, à chaque proposition (chef, 26 nov.) | réglées |
| 8 | La direction de l'essai (trois logos) convient-elle pour dessiner les dix-sept autres ? | | **au chef** |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : VIT-09d → en cours. Plan validé, essai sur trois logos fait, **direction à valider par le chef**.
- VIT-20f attend toujours le choix du chef.

## Reste à faire, dans l'ordre

1. Accord du chef sur la direction (question 8), avec ses retouches éventuelles.
2. Les dix-sept autres logos, dans les deux séries, selon le tableau du plan (§ 4). En série A, vérifier à 24 px que `planning`, `pilotage` et `vacataires` (trois signes ronds) se distinguent.
3. Planche complète, captures relues, puis montrées au chef ; fiche de session mise à jour (objet de chaque logo).
4. Étape 2, après le choix du chef : nouveau plan court au coordinateur.

Outils de travail, hors du dépôt, dans `..\travaux-planner\captures-vit-09d\outils\` :
- `dessins.mjs` : un dessin par logo, couleurs par rôle (T tuile, A plan arrière, F ombre et traits fins, W blanc), qui écrit `serie-a` et `serie-b` ;
- `zoom.mjs` : la vue à 24 px agrandie.

Commande : `node dessins.mjs <dossier de travail>`.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vit-09d-logos-style-planner" push -u origin feat/vit-09d-logos-style-planner
gh pr create --draft --base main --head feat/vit-09d-logos-style-planner --title "VIT-09d : logos dans le style du logo Planner (essai, à comparer)" --fill
```

La PR reste en brouillon tant que le chef n'a pas choisi.

## Prompt de reprise

```text
Tu reprends VIT-09d (les 20 logos dans le style du logo Planner, deux séries) du module VIT, hors chantier,
sur la branche feat/vit-09d-logos-style-planner, dans le dossier ..\travaux-planner\vit-09d-logos-style-planner.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la fiche de mission
docs/plan/missions/vit-09d-logos-style-planner.md, la conception
docs/conception/vitrine/vit-09d-logos-style-planner.md et cette fiche
(docs/sessions/2026-11-26-feat-vit-09d-logos-style-planner.md).
Fait : plan validé par le coordinateur ; essai planning, presences, activites dans les deux séries ;
generer-planche.mjs ; captures dans ..\travaux-planner\captures-vit-09d\.
Reste : selon la réponse du chef sur la direction, les dix-sept autres logos (tableau du § 4 du plan),
avec l'outil ..\travaux-planner\captures-vit-09d\outils\dessins.mjs ; planche complète, captures relues
à 24 et 96 px, fiche mise à jour avec l'objet de chaque logo.
Questions en attente : 8 (direction de l'essai, au chef).
Règles : pas de dessin hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
