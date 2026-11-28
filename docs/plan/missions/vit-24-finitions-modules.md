# Mission · VIT-24 · finitions du catalogue et des pages de modules du site

| | |
|---|---|
| État | ouverte : plan à écrire, **après la fusion de #284 puis de #286** |
| Agent | Codex (VS Code) : il a écrit les composants touchés (VIT-20, VIT-20f, grilles compactes de #286) ; choix du chef du 27 nov. |
| Modèle recommandé | son modèle le plus fort, effort de raisonnement élevé : rendu à juger à l'œil, contrastes à tenir (axe-core) et quatre lots qui touchent les mêmes composants |
| Attribuée le | 2026-11-27, par le coordinateur ; accord du chef : oui, le 2026-11-27 (les quatre finitions, le renommage de la tuile, Codex après #286) |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · **hors chantier**, dans la suite de VIT-20 accordée par le chef |
| Fonction | VIT-24 : le catalogue et les pages de modules ont l'air complets et réguliers, chaque module a sa couleur, et la gestion des notes se reconnaît dans le catalogue · taille M |
| Branche | `feat/vit-24-finitions-modules`, depuis `origin/main` **après la fusion de #286** |
| Dossier de travail | `..\travaux-planner\vit-24-finitions-modules` |
| Plan de conception | à écrire : `docs/conception/vitrine/vit-24-finitions-modules.md` · **validé par le chef** : rendu, nom d'une tuile et phrases nouvelles sont des choix de produit |

## Ce que le chef a demandé (27 nov.)

Constat du coordinateur sur les captures de #286 et de VIT-20f (1440 px) : 12 tuiles sur 17 sont grises, le catalogue paraît vide ; les noms tiennent sur une ou deux lignes et le badge « Bientôt » décale les rangées ; la page Présences a de grands vides entre ses sections, et « Toutes les fonctionnalités de Présences » ne montre qu'une carte ; « Un besoin, une application » montre trois voisins dont deux gris.

Le chef retient les quatre finitions et le renommage :

1. **Tuiles « Bientôt » en couleur pâle** : les 12 modules à venir gardent la teinte de leur logo (série B, teintes `app-<id>` de la charte), atténuée, au lieu du gris uniforme. Le badge « Bientôt » reste, et une tuile « Bientôt » ne doit pas pouvoir passer pour un lien.
2. **Rangées régulières** : zone du nom à hauteur fixe (deux lignes), badge toujours à la même hauteur, logo un peu plus grand, et un seul cadre autour du logo (aujourd'hui, la tuile officielle de la série B est posée dans un carré blanc à filet, ce qui encadre le logo deux fois).
3. **Pages de modules à leur couleur** : chaque page prend la teinte de son module (en-tête, fond léger de l'aperçu, puces), grand logo en tête, sections resserrées ; « Toutes les fonctionnalités » montre au moins trois cartes réelles (pour Présences : l'appel à la main, le QR code, l'appel saisi après coup s'il est fusionné, sinon ce qui existe).
4. **« Un besoin, une application » utile** : en bas d'une page de module, les autres modules **disponibles** (en couleur) plutôt que les voisins de la catégorie ; les pastilles « Pour qui » mènent aux pages des établissements.
5. **La gestion des notes** : la tuile « Évaluations, crédits et jurys » devient **« Notes et évaluations »**, avec « bulletins, crédits et jurys » en sous-titre là où le site en montre un (page Bientôt, méga-menu si la place le permet). Le plan ne change pas : VSC-08 (étape 3) et VSC-04 (étape 6) restent où ils sont, et la tuile reste « Bientôt ».

## Ajout du 28 nov. : les points d'accroche de VIT-25

VIT-25 (pages de présentation par module, plan `0a5ce400`) passe **après** VIT-24 et ne touche jamais `components/applications/`. VIT-24 pose donc, dans son lot, les points d'accroche que VIT-25 remplira : trois emplacements nommés `actions`, `guide` et `faq` dans `PageModule.astro` (dans cet ordre, après l'ouverture), et une propriété facultative `guide` dans `EnTeteModule.astro` (le second bouton « Voir le guide », vers `#guide`, affiché seulement si la page a un guide). Une quinzaine de lignes, sans texte nouveau, avec un test de rendu qui vérifie que les emplacements vides ne changent rien à la page (décision du coordinateur, 28 nov.).

## Critère de « terminé »

- Les cinq points ci-dessus, en français et en anglais (l'arabe suit les clés existantes, construit et non indexé).
- Aucune phrase nouvelle sans visa du chef : toute phrase ajoutée (cartes de fonctionnalités, sous-titre, nom) est écrite dans le plan, visée, puis vérifiée par un test contre le plan, comme pour VIT-22.
- Chaque phrase ne dit que ce qui existe ; ce qui est prévu reste « Bientôt ».
- Contrastes : axe-core sans violation sur toutes les pages touchées, aux deux largeurs ; le texte d'une tuile pâle garde le contraste AA.
- Tests unitaires et de rendu du site verts, build, `verifier-neutre`, budget EP-19 (200 Ko) tenu, aucun débordement horizontal à 390 px.
- Captures avant et après (catalogue, accueil, Présences, une page « Bientôt »), à 390 et 1440 px, hors dépôt, montrées au chef.

## Périmètre d'écriture

L'agent peut modifier :

- `vitrine/src/components/applications/` (tuiles, grilles, en-tête de module, fonctionnalités, autres modules, Pour qui) ;
- `vitrine/src/styles/jetons.css`, pour y ajouter les teintes `app-<id>` qui manquent (les valeurs viennent de `shared/charte/README.md`, sans en inventer) ;
- `vitrine/src/i18n/fr/`, `vitrine/src/i18n/en/` et `vitrine/src/i18n/ar/` : `modules.json`, `bientot.json`, `commun.json` et les fichiers du registre des fonctionnalités, pour les seules phrases visées ;
- `vitrine/src/donnees/fonctionnalites.json` (le registre que lit `components/catalogue/registre.js`), pour les seules entrées visées ;
- `vitrine/tests/` ;
- le plan, le fichier du module VIT et sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient).

L'agent ne touche pas :

- `vitrine/src/donnees/modules.js` au-delà de ce que le plan dit (`fonctionnalites.json` mis à part, ci-dessus) (pas de module ajouté ni retiré : **QJE-17** séparera « Quiz et jeux » en deux modules après cette mission, dans sa propre étape) ;
- `vitrine/package.json` et son verrou : **fix-audit-vitrine** (agent de Cursor) monte Astro le 27 nov. ;
- `vitrine/src/components/socle/` et les en-têtes du site : VIT-23 (fusionnée) et VIT-09b (#227) ;
- `shared/icones/` : les logos de la série B sont fixés (VIT-09d) ;
- tout le reste : s'il doit en sortir, il s'arrête et le demande.

## Ce qui est déjà décidé

- Les 17 modules, leurs catégories et leur ordre : étude 15 et VIT-20 (validés par le chef).
- Logos : série B (VIT-09d, #277), branchés par VIT-20f (#284) ; grilles compactes (#286, proposition validée par le chef le 26 nov.).
- Charte v3 : teintes `app-<id>` par application ; bleu nuit `#1A2A6C` par défaut.
- Le site ne dit que ce qui existe ; ce qui est prévu est « Bientôt » (VIT-01, VIT-21).
- Le comparatif animé et le site restent sans îlot React nouveau (§ 4.8 du plan de VIT-20 : moins de 15 Ko).
- Quiz et jeux seront séparés partout (décision du chef du 26 nov., QJE-17) : VIT-24 ne préjuge pas des deux noms.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Le nom en anglais de « Notes et évaluations » | « Grades and assessments » | chef, dans le plan |
| 2 | Le niveau d'atténuation des tuiles « Bientôt » | deux ou trois essais sur une planche (comme VIT-09d), le chef choisit | chef, dans le plan |
| 3 | Les cartes de fonctionnalités nouvelles, module par module | l'agent les tire de ce qui existe dans l'application (fichier et ligne cités), le chef vise les phrases | chef, dans le plan |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : VIT-24 (finitions du catalogue et des pages de modules du site), module VIT, hors chantier accordé par le chef.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/vit-24-finitions-modules.md.
Commence seulement quand #284 et #286 sont fusionnées dans main.
Branche : feat/vit-24-finitions-modules, depuis origin/main, dans le dossier ..\travaux-planner\vit-24-finitions-modules.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris le plan (docs/conception/vitrine/vit-24-finitions-modules.md) avec une planche de rendus avant et après,
les phrases nouvelles en toutes lettres et tes questions numérotées avec une proposition ; commite-le seul ;
le chef le valide (rendu, nom de la tuile, phrases).
Règles : pas de code avant le plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Ensuite, QJE-03 reprend (plan visé, #280).
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-27 | fiche écrite après les choix du chef ; #284 et #286 relues, prêtes | en attente de la fusion de #286 |
