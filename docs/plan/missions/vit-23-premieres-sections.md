# Mission · VIT-23 · la première section de chaque page du site, remplie (texte et illustration, à la manière d'Odoo)

| | |
|---|---|
| État | ouverte |
| Agent | session Claude Code neuve (VS Code), ouverte par le chef |
| Modèle recommandé | le plus capable : Claude Fable 5.2, sinon Opus 5.5. Mise en page de trois en-têtes, rendu à juger sur captures, budget de poids à tenir |
| Attribuée le | 2026-11-26, par le coordinateur ; accord du chef : oui, le 2026-11-26 (texte et illustration, inspiré des pages d'Odoo, toutes les pages, session Claude neuve) |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · hors chantier, comme la suite de VIT-20 |
| Fonction | VIT-23 : la première section de chaque page ne paraît plus vide ; texte et illustration, composition inspirée des pages d'application d'Odoo · taille M |
| Branche | `feat/vit-23-premieres-sections`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\vit-23-premieres-sections` |
| Plan de conception | à écrire (plan court, `docs/conception/vitrine/vit-23-premieres-sections.md`) · validé par le coordinateur ; **le rendu est validé par le chef sur captures** ; toute phrase nouvelle est **visée par le chef** avant le code |

## Ce que le chef a vu

Capture du chef du 26 nov., page « Course space » (`/en/applications/espace-de-cours/`) à 1440 px : un grand vide au-dessus du logo, puis le logo, la catégorie, le titre, une phrase, un bouton et les onglets, centrés, puis encore du vide. « Les premières sections de chaque page semblent trop vides. »

## Les choix du chef (26 nov.)

1. **Texte et illustration**, en s'inspirant des pages d'Odoo pour le remplissage. Odoo s'en sert pour **la composition** : un titre fort avec un mot mis en relief, une phrase, deux appels à l'action, un visuel large juste dessous ou à côté, une densité qui remplit l'écran. On ne copie rien : ni texte, ni dessin, ni effet signé, ni marque (étude 14, § 1 : reprendre en créant).
2. **Toutes les pages**, avec trois en-têtes à revoir :
   - `components/applications/EnTeteModule.astro` : les 5 pages d'application ;
   - `components/fonctions/EnTetePage.astro` : les 7 pages qui l'utilisent (rôles, solutions, sécurité, etc. : à relever) ;
   - `components/accueil/Ouverture.astro` : l'accueil.
   Les autres pages (FAQ, Bientôt, comparer, pages légales, catalogue des applications) : le plan dit lesquelles changent et pourquoi.
3. **Les visuels** : les 17 illustrations WebP de VIT-09c (`shared/icones/images/<id>.webp`, 512 px, 13 à 15 Ko) pour les pages d'application et de module ; pour les autres pages, le plan propose un visuel existant (illustrations de l'accueil, logos, captures de la vidéo) ou un dessin nouveau. **Les vraies captures d'écran** remplaceront plus tard les illustrations (VIT-09b).

## Critère de « terminé »

- Sur les trois sortes d'ouverture, à 1440, 768 et 390 px, le vide au-dessus et au-dessous de la première section est réduit, et un visuel accompagne le texte. Les captures avant et après, hors du dépôt, sont montrées au chef, qui valide le rendu.
- Le budget EP-19 tient : aucune page au-delà de 200 Ko transférés (contrôle VIT-19 de la CI), et le poids de l'accueil ne monte pas de plus de 20 Ko. Le visuel de la première section a ses dimensions écrites (pas de décalage au chargement), un texte de remplacement vide s'il est décoratif.
- axe-core sans violation, rendu sans JavaScript correct, la langue arabe garde le sens de lecture.
- Tests du site, construction, `verifier-neutre`, test de garde des textes (superlatifs) verts.
- Aucune phrase nouvelle sans le visa du chef. **Les textes d'ouverture de l'accueil déjà visés** le 19 nov. dans le plan de VIT-09b (C2 : le titre-promesse, « Planner » en surtitre, la ligne des rôles) **sont repris tels quels**.

## Périmètre d'écriture

L'agent peut modifier :

- `vitrine/src/components/applications/EnTeteModule.astro`, `vitrine/src/components/fonctions/EnTetePage.astro`, `vitrine/src/components/accueil/Ouverture.astro`, et un composant nouveau sous `vitrine/src/components/socle/` si l'ouverture se partage
- les pages de `vitrine/src/pages/[lang]/` **seulement** pour passer au composant d'en-tête un visuel ou une propriété
- `vitrine/src/i18n/{fr,en,ar}/*.json` **seulement** pour les clés de l'ouverture (textes visés, textes de remplacement)
- la copie des illustrations WebP vers le site, si le site ne les lit pas déjà (le plan dit comment, sans dupliquer à la main)
- `vitrine/tests/` : un test de l'ouverture (visuel présent, dimensions, texte de remplacement)
- `docs/conception/vitrine/vit-23-premieres-sections.md`, le fichier du module VIT, sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `vitrine/src/components/applications/logos.js` et le logo affiché dans l'en-tête : VIT-20f (Codex), après le choix des logos de VIT-09d
- `shared/icones/` en écriture : VIT-09d y travaille (`essais/`) ; les illustrations se lisent, ne se modifient pas
- les textes d'Espace de cours, de la Bibliothèque et de la vidéo : VIT-21 (#262, Codex) les change en ce moment ; si une accroche de VIT-21 est dans l'ouverture, garder celle de `main` après la fusion de #262
- `vitrine/src/components/applications/equipement/` (VIT-20d, fusionnée)
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Structure du site sur le modèle d'Odoo (VIT-20, chef, 22 nov.).
- Charte v3 (`shared/charte/jetons.json`), logos officiels (VIT-06).
- Textes C2 de l'ouverture de l'accueil, visés le 19 nov. (plan de VIT-09b, question 7).
- EP-19 : 200 Ko par page au plus (VIT-19).
- **La retouche de la première section sort de VIT-09b** (#227) et passe à VIT-23 ; VIT-09b garde les captures, les icônes vivantes et la page Application (coordinateur, 26 nov. ; **confirmé par le chef le 26 nov. à 14 h 30**).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Sur ordinateur, visuel à côté du texte (deux colonnes) ou dessous (centré, comme Odoo) ? | le plan propose l'un ou l'autre par sorte de page, avec une capture de chaque, et le chef choisit sur l'essai | chef, sur captures |
| 2 | Un mot du titre mis en relief (couleur ou soulignement dessiné), comme Odoo ? | oui, un seul procédé, en couleur de la charte, sans dessin copié ; décoratif, ignoré des lecteurs d'écran | chef, sur captures |
| 3 | Un second bouton à côté de « Demander une démonstration » ? | aucun bouton nouveau sans destination réelle ; le plan propose (par exemple « Voir les fonctionnalités », vers l'onglet existant) | chef (texte à viser) |
| 4 | Visuel des pages sans illustration (rôles, sécurité, solutions…) | un visuel existant d'abord ; un dessin nouveau seulement si rien ne convient, proposé dans le plan | coordinateur |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : VIT-23, la première section de chaque page du site vitrine,
qui paraît trop vide : la remplir de texte et d'une illustration, en s'inspirant de la composition des pages
d'application d'Odoo (sans rien en copier).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md (sur main, ou sur la branche
doc/coordination-2026-11-26-suite si elle n'est pas fusionnée), puis ta fiche de mission
docs/plan/missions/vit-23-premieres-sections.md (même endroit).
Regarde ensuite : docs/conception/vitrine/vit-20-structure-du-site.md, la question 7 (C2) du plan de VIT-09b
(branche feat/vit-09-illustrations, docs/conception/vitrine/vit-09-illustrations.md), shared/icones/README.md
(illustrations WebP), vitrine/src/components/applications/EnTeteModule.astro, fonctions/EnTetePage.astro,
accueil/Ouverture.astro. Regarde aussi deux ou trois pages d'application d'Odoo (odoo.com) pour la composition.
Branche : feat/vit-23-premieres-sections, depuis origin/main, dans le dossier
..\travaux-planner\vit-23-premieres-sections.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : construis le site, fais des captures « avant » des trois sortes d'ouverture (1440, 768, 390 px),
pose tes questions, écris le plan court (docs/plan/modeles/conception.md, version courte), commite-le seul,
et fais-le valider par le coordinateur (le chef te transmet sa réponse). Toute phrase nouvelle est visée par le chef.
Ensuite : un essai sur une page d'application (espace-de-cours) et l'accueil, captures avant et après,
hors du dépôt ; le chef valide le rendu ; puis toutes les pages.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; budget EP-19 tenu ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, donne au chef le chemin complet des captures.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-26 | fiche écrite sur la demande du chef (capture de « Course space ») ; #262 (VIT-21) ne touche aucun composant ; VIT-20f garde le logo de l'en-tête | — |
| 2026-11-26 12 h 20 | plan `90b9963f` relu : composant d'ouverture commun, illustrations par `import.meta.glob` sans copie, poids et accessibilité tenus ; Q3 au chef (non), Q7 accordée | **plan validé** (coordinateur) ; essai ensuite |
| 2026-11-26 12 h 40 | essai (`108ce86c`) vu sur captures : axe-core 77/77, accueil 132,8 Ko, Espace de cours 78,4 Ko | **rendu choisi par le chef** : à côté, accueil A, relief, onglets en haut ; étape 4 |
| 2026-11-26 14 h 20 | étape 4 (`2c940807` à `16aef769`) relue : périmètre tenu (aucun fichier hors fiche, `logos.js` et `shared/icones/` non touchés), clés i18n limitées à `relief`, `surtitre` et `roles`, textes C2 conformes au plan de VIT-09b (q. 7), tests 167/168 (1 sauté) et `verifier-neutre` refaits par le coordinateur ; build, rendus, axe-core et poids crus sur parole | **prête pour la PR**, après la fusion de #277 et un `git merge origin/main` |
| 2026-11-26 14 h 30 | le chef valide le rendu de toutes les pages sur captures et confirme que la première section sort de VIT-09b | PR après la fusion de #277 |
