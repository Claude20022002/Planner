# Mission · VIT-09c · un logo et une image par module vendable

| | |
|---|---|
| État | ouverte : **après VIT-11** dans la file de Codex ; VIT-15 ne l'attend pas (place réservée, chef, 21 nov.) ; plan court à écrire |
| Agent | Codex (choix du chef, 21 nov. au soir) |
| Modèle recommandé | son modèle le plus fort, raisonnement élevé : dessin SVG à la main sur une charte, et images générées à tenir dans un poids |
| Attribuée le | 2026-11-21, par le coordinateur ; accord du chef : oui, le 21 nov. au soir (« que Codex génère les images, icône de tuile, pour chaque module que l'on pourra vendre » ; rendu : « les deux » ; quand : après VIT-11) |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · suite de VIT-09a, hors chantier comme le reste du site |
| Fonction | VIT-09c : un logo de tuile en SVG, du même style que les sept de VIT-09a, pour chaque module vendable qui n'en a pas, et une image générée par module vendable pour le site et les supports de vente · taille M |
| Branche | `feat/vit-09c-logos-modules`, depuis `origin/main` après la fusion de VIT-11 |
| Dossier de travail | `..\travaux-planner\vit-09c-logos-modules` |
| Plan de conception | plan court à écrire : `docs/conception/vitrine/vit-09c-logos-modules.md`, avec la section « Ce que disent les études » · validé par **le coordinateur** (M, sans migration ni donnée) ; **la planche d'aperçu va au chef** avant le commit final (le rendu est son choix) |

## La liste

Les **dix-sept modules vendables** de l'[étude 15](../../etude-marche/15-modules-et-packs.md) (branche `etude/ven-modules-packs`, validée par le chef le 21 nov.), § 4 et § 7 :

| Ce qu'il faut | Modules |
|---|---|
| **SVG à dessiner** (treize) | 2 Présences (`presences`), 3 Espace de cours (`cours`, décision du coordinateur : `pedagogie` reste le référentiel), 7 Vacataires et heures (`vacataires`), 8 Évaluations, crédits et jurys (`evaluations`), 9 Inscriptions (`inscriptions`), 10 Documents vérifiables (`documents`), 11 Stages (`stages`), 12 Frais et caisse (`frais`), 13 Formation et financeurs (`formation`), 14 Vie scolaire et familles (`familles`), 15 Échanges avec l'État (`etat`), 16 Paiements en ligne (`paiements`), 17 Pilotage (`pilotage`) |
| **SVG déjà faits** (VIT-09a) | 1 `planning`, 4 `activites`, 5 `bibliotheque`, 6 `annonces` ; pour le socle : `personnes`, `etablissement` |
| **Images générées** (dix-sept) | une par module vendable, 1 à 17 |

Les identifiants entre parenthèses sont une proposition : le plan les confirme.

## Critère de « terminé »

- **SVG** : chaque logo nouveau suit le README de `shared/icones/` (tuile de `app-<id>` à `app-<id>-fonce`, détails en blanc, `bleu-clair`, `bleu-nuit`, `jeu` ; deux fichiers, `<id>.svg` pour 40 à 96 px et `<id>-petit.svg` pour 24 à 32 px ; identifiants préfixés `vit-<id>-…`). Les couleurs nouvelles de tuile entrent dans la famille `applications` de `shared/charte/jetons.json` par le générateur de la charte, sans toucher les autres familles. `node --test shared/icones/icones.test.js` passe, étendu aux logos nouveaux.
- **Images générées** : une par module, au format WebP (et une version de secours si le plan la justifie), dans les couleurs de la charte ; **le poids de chacune est dans le plan** et tient dans le budget d'EP-19 (une page du site pèse au plus 200 Ko transférés, hors média lancé à la demande) ; aucune personne réelle, aucun logo ni visuel d'un concurrent, aucun texte dans l'image (il ne se traduirait pas, EP-16).
- **La planche d'aperçu** (`node shared/icones/generer-apercu.mjs`) montre les vingt logos (sept de VIT-09a, treize nouveaux) à 24, 32, 48 et 96 px, en clair et en sombre, puis les dix-sept images ; le chef la voit avant le commit final.
- **L'outil et le modèle** qui ont généré les images sont notés dans la fiche de session, avec leurs conditions d'usage commercial.
- Rien n'est posé sur une page : VIT-09b, VIT-15 et l'application les poseront.

## Périmètre d'écriture

L'agent peut modifier :

- `shared/icones/modules/` (fichiers nouveaux seulement), `shared/icones/index.js`, `shared/icones/icones.test.js`, `shared/icones/README.md`, `shared/icones/generer-apercu.mjs`
- `shared/charte/` : la famille `applications` de `jetons.json` et ses fichiers générés, par le générateur
- un dossier nouveau pour les images générées, que le plan nomme (proposition : `shared/icones/images/`)
- `docs/conception/vitrine/vit-09c-logos-modules.md`, la ligne VIT-09c de `docs/plan/modules/VIT-site-vitrine.md`, sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- les logos existants de VIT-09a ni les icônes vivantes
- `vitrine/src/`, `frontend/src/`, `mobile/` : VIT-09b, VIT-15, VIT-11 et UIX-06c y travaillent
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- La liste des modules vendables et le socle (chef, 21 nov.) ; les noms restent neutres.
- Rendu : **SVG du même style que VIT-09a** pour l'application et la grille ; **images générées** pour le site et les supports de vente (chef, 21 nov.).
- Ordre : après VIT-11, avant VIT-15 (chef, 21 nov.).
- On reprend une idée, jamais un texte, un nom, un visuel ni une mise en page [étude 14, § 1].
- Charte unique : `shared/charte/` (UIX-10) ; sobre et mesuré (EP-19) ; rien de réel dans le dépôt public.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Les treize couleurs de tuile nouvelles | dans la charte, deux à deux distinctes et lisibles en clair et en sombre ; la planche au chef | chef, sur la planche |
| 2 | Le style des images générées (illustration à plat, léger volume, scène) | celui des sept logos, en plus détaillé, sans personne ; deux essais montrés au chef avant les dix-sept | chef |
| 3 | Le dossier des images | `shared/icones/images/`, à côté des logos | coordinateur |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : VIT-09c (un logo et une image par module vendable), suite de VIT-09a.
Tu la commences après VIT-11, avant VIT-15.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-16, EP-19), puis ta fiche de mission
docs/plan/missions/vit-09c-logos-modules.md, puis docs/etude-marche/15-modules-et-packs.md (§ 4 et § 7 : la liste),
shared/icones/README.md et docs/conception/vitrine/vit-09a-logos-icones.md (le style à suivre).
Branche : feat/vit-09c-logos-modules, depuis origin/main après la fusion de VIT-11, dans ..\travaux-planner\vit-09c-logos-modules.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris un plan court dans docs/conception/vitrine/vit-09c-logos-modules.md (identifiants, couleurs, outil de
génération, format et poids des images, section « Ce que disent les études »), fais-le valider par le coordinateur,
commite-le seul. Montre deux images d'essai au chef avant de générer les dix-sept, puis la planche d'aperçu avant le commit final.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; fiche de session à jour, suivi.md non modifié ;
tout est commité ; jamais de git push. Un rapport dans ta boîte (sortie\) à chaque étape.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-21 | fiche écrite par le coordinateur ; liste de l'étude 15 validée par le chef | — |
| 2026-11-21 23 h 10 | VIT-15 n'attend plus VIT-09c (chef) : les pages gardent une place, VIT-09c la remplit ; la fiche garde son ordre (après VIT-11) | — |
