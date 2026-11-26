# Session du 2026-11-26 · VIT-09d · `feat/vit-09d-logos-style-planner`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session neuve dans VS Code |
| Chantier | VIT, hors chantier (demande du chef, 26 nov.) |
| Dossier de travail | `..\travaux-planner\vit-09d-logos-style-planner` |
| Dernier commit | `666b295f` (les 40 logos), puis cette fiche |

## Objectif de la session

Proposer les 20 logos des applications dans le style du logo Planner, en deux séries, pour que le chef les compare aux logos actuels :
- **série A** : tuile bleu nuit commune ;
- **série B** : teinte de l'application.

Le chef choisit ensuite, logo par logo, entre l'actuel, A et B.

## Plan

[docs/conception/vitrine/vit-09d-logos-style-planner.md](../conception/vitrine/vit-09d-logos-style-planner.md), **validé par le coordinateur le 26 nov.** Le choix du rendu reste au chef, sur la planche.

## Fait

- `5ac275f9` : le plan court, commité seul, avec les réponses du chef aux questions 4 à 7.
- `e744d19f` : la validation du coordinateur, inscrite dans le plan.
- `74e5637f` : l'essai sur trois logos, le script `generer-planche.mjs` et la ligne VIT-09d du fichier du module.
- Le chef valide la direction de l'essai (26 nov., vers 9 h 50, relayé par le coordinateur), avec deux retouches. Présences est la référence, à ne pas toucher.
- `666b295f` : les deux retouches, puis les dix-sept autres logos, dans les deux séries.

### Objet dessiné, logo par logo (le même dans les deux séries)

| id | Objet dessiné | Simplifié ou retouché |
|---|---|---|
| `planning` | calendrier à anneaux, bandeau bleu clair et bande d'ombre ; la page porte un **grand cadran** à deux aiguilles | grille de la page retirée ; cadran agrandi (rayon 15,5, presque toute la hauteur de la page), retouche du chef |
| `pedagogie` | tableau sur chevalet à trois pieds, rebord bleu clair ; une courbe à la craie et son point d'arrivée | — |
| `personnes` | badge à cordon en V ; fente en ombre d'aplat ; une silhouette | — |
| `etablissement` | école au toit bleu clair et ombre d'aplat sous le toit, deux fenêtres, porte en arche, drapeau au faîte | — |
| `annonces` | mégaphone blanc, culasse et poignée bleu clair, trois ondes à bouts ronds | — |
| `activites` | manette générique **d'un seul tracé**, sans croix ni boutons ; un grand point d'interrogation au centre | ronds bleus retirés (ils faisaient deux yeux) ; point d'interrogation agrandi et plus épais, manette à pleine taille, retouche du chef |
| `bibliotheque` | trois livres debout et un penché, alternés blanc et bleu clair, sur une planche ; bandes d'ombre sur les dos blancs | — |
| `presences` | planchette, pince bleu clair percée, ombre sous la pince, grande coche | **inchangé** (référence du chef) |
| `cours` | cahier à spirale (quatre anneaux bleu clair), ombre le long de la spirale, étiquette, marque-page qui dépasse en bas | — |
| `vacataires` | feuille d'heures bleu clair à deux lignes, chronomètre blanc devant elle, avec sa couronne et deux aiguilles | — |
| `evaluations` | copie lignée, rosette bleu clair à rubans et centre foncé | rubans en bleu clair au lieu du ton moyen : en série B, ils se fondaient dans la tuile |
| `inscriptions` | chemise à onglet (dos bleu clair, devant blanc, ombre au pli), médaillon au signe plus | — |
| `documents` | feuille à coin plié bleu clair, deux lignes, **bouclier coché** | — |
| `stages` | mallette, rabat bleu clair et ombre d'aplat sous le rabat, fermoir | — |
| `frais` | caisse : un **reçu dentelé** sort de la fente, trois touches, ligne du tiroir | — |
| `formation` | **escalier de trois marches**, drapeau au sommet | — |
| `familles` | toit en chevron bleu clair ; un adulte blanc et un enfant bleu clair | — |
| `etat` | fronton et entablement blancs, deux colonnes bleu clair, **deux flèches d'échange** entre elles, socle | — |
| `paiements` | carte (bande foncée, puce), pastille bleu clair à flèche foncée | pastille en bleu clair au lieu du ton moyen : en série B, elle se fondait dans la tuile |
| `pilotage` | cadran en demi-cercle, arc bleu clair, aiguille à bout rond, socle bleu clair à ombre d'aplat | — |

### Les points d'attention du coordinateur, relus à 24 px

- **Planning, Pilotage et Vacataires**, en série A : ils se distinguent par leur silhouette :
  - un rectangle à anneaux pour le calendrier ;
  - un demi-cercle sur socle pour le cadran de Pilotage ;
  - un cercle à couronne devant une feuille pour le chronomètre.
- **Enseignements et Formation** : chevalet contre escalier. Ils ne se confondent plus.
- **Évaluations et Documents** : rosette ronde contre bouclier. Ils ne se confondent plus.
- **Le point d'interrogation de la manette** était déjà en `#17395C` en série A, et non en bleu clair. Il paraissait pâle parce que son trait, réduit à 88 %, s'éclaircissait au lissage. Il est maintenant plus grand et plus épais.

### Ce qui reste faible à 24 px

Ces détails se perdent à 24 px, mais l'objet reste lisible :
- les flèches d'`etat` (le fronton porte le sens) ;
- le signe plus d'`inscriptions` ;
- la rosette d'`evaluations`.

Les dessins `-petit` de l'étape 2 les simplifieront si le chef retient ces logos.

La manette est plus large que les autres objets (78 px sur 88). Réduite, son point d'interrogation ne se lisait plus à 24 px.

## Vérifié

- `generer-planche.mjs` : 20 applications, 20 + 20 logos vérifiés (aucune faute).
- Poids : de 816 à 1 084 octets par logo (plafond : 4 Ko).
- `node --test shared/icones/icones.test.js` : 8 sur 8.
- Relu à 24 px, agrandi au pixel près, et à 96 px, sur fond clair et sur fond sombre, dans les deux séries, avant de montrer.
- Captures, hors du dépôt, dans `C:\Users\clusa\Desktop\Github Project\travaux-planner\captures-vit-09d\` :
  - `planche-1.png` à `planche-4.png` : la planche, cinq applications par capture ;
  - `serie-a-24px-agrandis.png` et `serie-b-24px-agrandis.png` : les vingt logos à 24 px agrandis ×6, puis à 96 px ;
  - `planche.html` : la planche entière, à ouvrir dans un navigateur ;
  - `essai\` : les captures de l'essai, conservées.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 3 | Rayon de la tuile, tuile B en aplat, changement d'objet | oui ; oui ; au chef, sur la planche (coordinateur, 26 nov.) | réglées |
| 4 à 7 | Même dessin en A et en B, jaune exclu, filet clair, détails B dans le ton foncé | oui, à chaque proposition (chef, 26 nov.) | réglées |
| 8 | La direction de l'essai convient-elle ? | oui, avec deux retouches : point d'interrogation de la manette, cadran du calendrier (chef, 26 nov.) | réglée |
| 9 | Pour chaque application : l'actuel, la série A ou la série B ? | | **au chef** |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : VIT-09d → en cours, étape 1 faite (les 40 logos et la planche) ; **choix du chef attendu**, logo par logo.
- VIT-20f attend le choix du chef.

## Reste à faire, dans l'ordre

1. Le chef choisit, logo par logo, entre l'actuel, A et B (question 9).
2. Étape 2 : un nouveau plan court au coordinateur. Les logos choisis remplacent ceux de `shared/icones/modules/`, avec leur version `-petit` ; puis `index.js`, le test, le guide et l'aperçu ; le dossier `essais/` est retiré.
3. Si un logo de la série A est retenu, deux décisions reviennent au chef :
   - inscrire `#8FB4DE` dans la charte ;
   - le sort des teintes `app-<id>`.

Outils de travail, hors du dépôt, dans `..\travaux-planner\captures-vit-09d\outils\` :
- `dessins.mjs` : les vingt dessins, couleurs par rôle (T tuile, A plan arrière, M ton moyen, F ombre et traits fins, W blanc). Il écrit `serie-a` et `serie-b`. Commande : `node dessins.mjs <dossier de travail> [id…]`.
- `zoom.mjs` : la vue à 24 px agrandie.
- `parties.mjs` : la planche en quatre parties.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vit-09d-logos-style-planner" push -u origin feat/vit-09d-logos-style-planner
gh pr create --draft --base main --head feat/vit-09d-logos-style-planner --title "VIT-09d : logos dans le style du logo Planner (deux séries, à comparer)" --fill
```

La PR reste en brouillon jusqu'au choix du chef, puis l'étape 2 la complète.

## Prompt de reprise

```text
Tu reprends VIT-09d (les 20 logos dans le style du logo Planner, deux séries) du module VIT, hors chantier,
sur la branche feat/vit-09d-logos-style-planner, dans le dossier ..\travaux-planner\vit-09d-logos-style-planner.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la fiche de mission
docs/plan/missions/vit-09d-logos-style-planner.md, la conception
docs/conception/vitrine/vit-09d-logos-style-planner.md et cette fiche
(docs/sessions/2026-11-26-feat-vit-09d-logos-style-planner.md).
Fait : étape 1 complète. Les 40 logos sont dans shared/icones/essais/style-planner/serie-a et serie-b,
generer-planche.mjs les vérifie, et les captures sont dans ..\travaux-planner\captures-vit-09d\.
Reste : selon le choix du chef, logo par logo (actuel, A ou B), écrire le plan court de l'étape 2
au coordinateur (remplacement dans shared/icones/modules/ avec les -petit, index.js, test, guide,
aperçu, retrait d'essais/). Les outils de dessin sont dans ..\travaux-planner\captures-vit-09d\outils\.
Questions en attente : 9 (le choix du chef).
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
