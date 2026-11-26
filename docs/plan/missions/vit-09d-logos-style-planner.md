# Mission · VIT-09d · les 20 logos redessinés dans le style du logo Planner, pour comparaison

| | |
|---|---|
| État | ouverte |
| Agent | session Claude Code neuve (VS Code), ouverte par le chef |
| Modèle recommandé | le plus capable : Claude Fable 5.2, sinon Opus 5.5. Il faut 40 dessins SVG nets à 24 px et cohérents entre eux, et un œil critique sur les rendus |
| Attribuée le | 2026-11-26, par le coordinateur ; accord du chef : oui, le 2026-11-26 (demande du chef ; 20 logos, deux séries, tout de suite, à Claude) |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · suite de VIT-09a et VIT-09c, hors chantier comme la suite de VIT-20 ; sert aussi UIX (grille des applications) |
| Fonction | VIT-09d : proposer deux séries de logos dans le style du logo Planner, à comparer aux logos actuels de Codex ; le chef choisit, puis le choix remplace les logos · taille M |
| Branche | `feat/vit-09d-logos-style-planner`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\vit-09d-logos-style-planner` |
| Plan de conception | à écrire (plan court, `docs/conception/vitrine/vit-09d-logos-style-planner.md`) · validé par le coordinateur (M, sans migration, sans sécurité ; le choix du rendu revient au chef, sur la planche) |

## Ce que le chef demande

Le chef aime les logos de Codex (VIT-09a et VIT-09c, `shared/icones/modules/`). Il veut **d'autres propositions dans le style du logo Planner** pour comparer et garder les meilleurs, logo par logo s'il le souhaite.

Le style du logo Planner (`shared/charte/logos-officiels/planner-variante-4-icone-app.svg` et `planner-variante-1-horloge.svg`) :

- une tuile carrée à coins arrondis, bleu nuit `#17395C` ;
- des formes plates, sans dégradé ni ombre portée, symétriques, avec une ombre en aplat seulement (la bande sous le plateau de la toque) ;
- deux bleus clairs (`#8FB4DE` sur l'icône, `#A6CAEE` en charte) et du blanc ;
- des traits arrondis (`stroke-linecap: round`) pour les détails fins (aiguilles) ;
- **deux objets fondus en un seul signe** : un livre ouvert, une toque dont le plateau est une horloge.

## Les deux séries (choix du chef, 26 nov.)

- **Série A, tuile commune** : chaque logo sur la tuile bleu nuit de l'icône Planner, avec les seules couleurs du logo (`#17395C`, `#2A679F`, `#21507C`, `#8FB4DE`, `#A6CAEE`, blanc). Seul l'objet distingue l'application.
- **Série B, teinte de l'application** : la tuile garde la couleur de l'application (`app-<id>` de `shared/charte/jetons.json`, en aplat ou avec son ton foncé), le dessin prend le style du logo (formes plates, blanc et bleu clair, traits arrondis, signe composé).

Pour les deux séries, le motif de chaque application reste reconnaissable à 24 px. Il peut reprendre l'objet du tableau de `shared/icones/README.md` ou en proposer un meilleur ; le plan dit lequel, et pourquoi.

## Critère de « terminé »

Étape 1, les propositions :

- 20 logos × 2 séries, en taille détaillée (40 à 96 px), dans `shared/icones/essais/style-planner/serie-a/<id>.svg` et `serie-b/<id>.svg`, aux 20 identifiants de `shared/icones/index.js`. Les versions `-petit` viennent après le choix.
- Chaque SVG : `viewBox` carré, sans texte, sans police, sans image incorporée, identifiants internes préfixés (`vit09d-a-<id>-…`, `vit09d-b-<id>-…`), 4 Ko au plus, couleurs de la liste de sa série seulement.
- Un script de planche, `shared/icones/essais/style-planner/generer-planche.mjs`, sans dépendance, qui écrit une page HTML **non commitée** : pour chaque application, sur une ligne, le logo actuel, la série A et la série B, à 24, 48 et 96 px, sur fond clair et sur fond sombre.
- Des captures de la planche (PNG), **hors du dépôt**, pour le chef. Le chemin complet est dans le rapport.
- Une fiche de session qui liste, logo par logo, l'objet dessiné dans chaque série.

Étape 2, après le choix du chef (un nouveau plan court, au coordinateur) : les logos choisis remplacent ceux de `shared/icones/modules/`, avec leur version `-petit`, puis `index.js`, le test, le guide et l'aperçu ; le dossier `essais/` est retiré. Si la série A est choisie, la décision sur les teintes `app-<id>` de la charte revient au chef.

## Périmètre d'écriture

Étape 1, l'agent peut modifier :

- `shared/icones/essais/style-planner/` (nouveau)
- `docs/conception/vitrine/vit-09d-logos-style-planner.md` (le plan)
- le fichier du module VIT (une ligne VIT-09d) et sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `shared/icones/modules/`, `shared/icones/images/`, `index.js`, `icones.test.js`, `README.md`, `generer-apercu.mjs` (étape 2 seulement)
- `shared/charte/` (aucun jeton nouveau à l'étape 1)
- `vitrine/`, `frontend/`, `mobile/` : pages tenues par d'autres missions (Codex : #261, #262, VIT-20f)
- tout le reste : s'il doit en sortir, il s'arrête et le demande

Si `icones.test.js` lit tout `shared/icones/` et échoue à cause du dossier `essais/`, l'agent s'arrête et le signale.

## Ce qui est déjà décidé

- Logos officiels et couleurs de la charte : VIT-06 (chef, 18 nov.). Le dessin officiel ne change pas.
- 20 logos, deux séries (A tuile commune, B teinte de l'application), tout de suite, par une session Claude (chef, 26 nov.).
- VIT-20f (logos sur les pages de module, Codex) attend le choix du chef : inutile de poser des logos qui peuvent changer (coordinateur, 26 nov.).
- Aucune image générée (WebP) dans cette mission : les illustrations de VIT-09c restent.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Série A : la tuile garde-t-elle exactement la forme et le rayon de l'icône Planner ? | oui, même rapport rayon sur côté | coordinateur |
| 2 | Série B : la tuile en aplat de `app-<id>`, ou en dégradé vers `app-<id>-fonce` comme aujourd'hui ? | aplat, pour rester dans le style plat du logo ; le ton foncé sert à l'ombre en aplat | coordinateur |
| 3 | Un motif peut-il changer d'objet (par exemple Quiz et jeux) ? | oui, si le plan dit pourquoi ; la planche montre l'actuel à côté | chef, sur la planche |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : VIT-09d, les 20 logos des applications redessinés dans le style
du logo Planner, en deux séries, pour que le chef les compare aux logos actuels et choisisse.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md (sur main, ou sur la branche
doc/coordination-2026-11-26-suite si elle n'est pas fusionnée), puis ta fiche de mission
docs/plan/missions/vit-09d-logos-style-planner.md (même endroit).
Regarde ensuite : shared/charte/logos-officiels/ (le style à suivre), shared/icones/README.md, index.js
et modules/ (les logos actuels, à ne pas toucher), shared/charte/jetons.json (famille applications),
docs/conception/vitrine/vit-09a-logos-icones.md et vit-09c-logos-modules.md.
Branche : feat/vit-09d-logos-style-planner, depuis origin/main, dans le dossier
..\travaux-planner\vit-09d-logos-style-planner.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : pose tes questions, écris le plan court (docs/plan/modeles/conception.md, version courte), avec
pour chaque application l'objet que tu dessineras dans chaque série. Commite-le seul, puis fais-le valider
par le coordinateur (le chef te transmet sa réponse).
Ensuite : un premier essai sur trois logos (planning, presences, activites) dans les deux séries, avec la
planche. Rends les SVG en PNG et regarde-les toi-même à 24 et à 96 px avant de les montrer. Le chef valide
la direction, puis tu fais la série complète.
Règles : pas de dessin avant le plan validé ; questions avant toute supposition ; fiche de session à jour
en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, donne au chef le chemin complet des captures de la planche.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-26 | fiche écrite sur la demande du chef ; Codex garde sa file, VIT-20f attend le choix | — |
| 2026-11-26 9 h 40 | plan `5ac275f9` relu : questions 1 et 2 comme la fiche, 20 signes motivés, périmètre tenu, planche hors du dépôt ; validation envoyée à la session `plan-b-projet-pacte-f2` | **plan validé** (coordinateur) ; essai sur trois logos ensuite |
| 2026-11-26 9 h 50 | essai relu (`74e5637f`, fiche `a6ea00ab`) : planche relancée (3 + 3 logos vérifiés), test des icônes 8/8, logos de 820 à 980 octets, captures vues | **direction validée par le chef**, deux retouches ; série complète |
| 2026-11-26 10 h 10 | étape 1 relue (`666b295f`, `6d9758b0`) : 44 fichiers, tous dans `essais/` ou `docs/`, planche relancée (20 + 20 vérifiés), quatre planches et deux agrandissements vus | **série B choisie par le chef** ; étape 2, plan court au coordinateur |
| 2026-11-26 10 h 20 | plan de l'étape 2 (`721b774c`) relu, grep des lecteurs refait sur `main` | **plan validé** (coordinateur) |
