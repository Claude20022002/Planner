# Mission · VIT-20 · structure du site sur le modèle d'Odoo

| | |
|---|---|
| État | ouverte : en attente des préalables (visa du plan v2, fusion de #254 et #223, accès de l'agent externe) |
| Attribuée le | 2026-11-22, par le coordinateur (session `plan-b-projet-pacte-2e`) ; accord du chef le 22 nov. : conduite en équipe (question 4), VIT-15 fondue (question 17), **lots R0, B, A et C à un agent externe** et lot D à Codex (question 19), **accès collaborateur** (question 20) |
| Module | [VIT](../modules/VIT-site-vitrine.md) · étape 1 de la [feuille de route](../feuille-de-route.md) |
| Fonction | VIT-20 : barre à méga-menus, 17 modules en quatre catégories, une page par module disponible, socle inclus, accueil resserré avec « Pourquoi Planner » animé, pied de page en quatre colonnes ; puis le bloc « selon votre équipement » · taille L |
| Branche | `feat/vit-20-structure-du-site`, depuis `origin/main` à jour |
| Plan de conception | [vit-20-structure-du-site.md](../../conception/vitrine/vit-20-structure-du-site.md), version 2 |

## L'équipe

| Lots | Agent | Modèle, et pourquoi | Branche | Livraison |
|---|---|---|---|---|
| **R0, B, A, C**, dans cet ordre | **agent externe** : l'agent Claude Code d'un proche du chef, avec accès collaborateur au dépôt | **Claude Fable 5.2**, sinon Opus 5.5, effort élevé : tout le site, seul, sans échange en cours de route | `feat/vit-20-structure-du-site` | il **pousse cette seule branche** et ouvre la PR (exception du chef au « jamais de `git push` » d'AGENTS.md, limitée à cette branche) |
| **D** « Selon votre équipement » | **agent externe** (repris de Codex le 22 nov. : Codex a encore MKT-09 et VIT-09c devant lui) | idem | `feat/vit-20d-equipement`, depuis `main` **après la fusion de VIT-20** | PR à part ; phrases visées par le chef avant le code ; [prompt de la suite](vit-20-suite-agent-externe.md) |

Pourquoi : l'agent externe ne reçoit pas de messages des autres sessions ; un seul agent sur les lots A, B et C évite toute synchronisation. Le lot D attend un visa de texte du chef : il passe en second, sur la place que VIT-20 lui réserve. L'agent de Cursor et la session Claude prévus pour A et C sont libérés.

## Périmètre d'écriture de l'agent externe

Chemins relatifs à `vitrine/`, sauf mention.

- Peut écrire : `src/donnees/` (sauf `equipement.js`), `src/i18n/` (tous les `.json`, sauf `equipement.json` qu'il crée vide), `src/components/` (sauf `applications/equipement/`, `comparer/`), `src/pages/`, `astro.config.mjs`, `tests/` (sauf `equipement.test.js`), `public/` si une redirection l'exige ; à la racine : `.github/workflows/vitrine.yml` (seulement pour lancer un parcours nouveau), `docs/plan/modules/VIT-site-vitrine.md`, sa fiche de session `docs/sessions/`.
- Ne touche pas : `shared/` (VIT-09c, Codex), `src/components/comparer/` et `src/i18n/*/comparer.json` (VIT-14, lecture seule), `scripts/`, `vitrine/package.json` (aucune dépendance nouvelle), tout ce qui est hors de `vitrine/` sauf la liste ci-dessus, `docs/plan/suivi.md`, `docs/plan/decisions.md`, cette fiche.
- Ne change aucune phrase existante sur le produit, sauf les déplacements du § 4.6 du plan. Les phrases sur la Bibliothèque ailleurs dans le site sont relevées dans la PR, pas corrigées.

## Les étapes et les points de contrôle

| Étape | Ce qui se passe | Contrôle visible par le coordinateur |
|---|---|---|
| R0 | contrat commun (§ 5 du plan) | commit poussé, PR ouverte en brouillon |
| B | pages de module, socle, catalogue, redirections | commit(s) poussé(s), tests verts |
| A | navigation | idem |
| C | accueil et comparatif animé | idem |
| Fin | tous les contrôles, fiche de session, PR prête | PR sortie du brouillon ; le coordinateur relit (`relecture-branche`), prend les captures « après », le chef fusionne |

## Les travaux voisins

À transmettre par le chef à l'autre session de coordination quand elle reprend (elle tient ces missions) :

- **VIT-15** est fondue dans VIT-20 (lot D) : sa fiche passe à « close », et elle sort de la file de Codex.
- **VIT-16** (Contact, À propos) : avant la fusion de VIT-20, elle ne touche ni `EnTete.astro`, ni `PiedDePage.astro`, ni `components/accueil/` ; le lien de contact passe par la constante de `langues.js`, changée après la fusion de VIT-16.
- **VIT-09b** (#227) refait son plan sur le nouvel accueil, après VIT-20.
- **VIT-09c** continue sur sa branche : ses logos remplissent les places réservées après coup.

## Prompt de l'agent externe

Dans [vit-20-agent-externe.md](vit-20-agent-externe.md), avec les préalables à régler par le chef avant de l'envoyer.

## Prompt du lot D (ancien : boîte de Codex ; sans objet depuis que l'agent externe le reprend)

```text
VIT-15 est fondue dans VIT-20 (décision du chef du 22 nov.) : ne commence pas VIT-15.
À la place, après MKT-09 et VIT-09c, et une fois VIT-20 fusionnée : le bloc « Selon votre équipement » (lot D de VIT-20).
Lis AGENTS.md, la fiche docs/plan/missions/vit-20-equipe.md et le plan docs/conception/vitrine/vit-20-structure-du-site.md
(§ 4.9), puis l'étude EP-18 (#253). Crée feat/vit-20d-equipement depuis origin/main, dans ..\travaux-planner\vit-20d-equipement.
D'abord le tableau des phrases (français, anglais, source dans le dépôt) dans docs/conception/vitrine/vit-20d-equipement.md,
commité seul ; aucun code avant le visa du chef. Ensuite : components/applications/equipement/, donnees/equipement.js,
i18n/*/equipement.json, tests/equipement.test.js, et la seule ligne de PageModule.astro qui pose le bloc.
Rapports dans ta boîte sortie\. Fiche de session ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-22 | fiche écrite pour une équipe de quatre lots | — |
| 2026-11-22 | le chef confie R0, B, A et C à un agent externe (accès collaborateur), D reste à Codex après la fusion ; fiche réécrite | — |
| 2026-11-22 15 h | relecture de #257 (`d21f7b2a`) : périmètre tenu, plan suivi, tests relancés et verts ; CI « Construire le site vitrine » rouge (`nginx/verifier-image.cjs` suit les pages de redirection) ; îlot React (~65 Ko compressés) contraire au § 4.8 (< 15 Ko) ; examens à ranger sous Emploi du temps ; 22 lignes de plus de 160 caractères | **à corriger** |
| 2026-11-22 15 h 50 | seconde relecture de #257 (`a4a495b8`) : les quatre points sont corrigés (contrôle de l'image qui suit les renvois, comparatif en Astro sans React, examens sous Emploi du temps, plus aucune ligne de code de plus de 160 caractères) ; CI entièrement verte ; contrôles relancés et verts. Remarque sans blocage : `EnTete.astro` fait 175 lignes (repère 150 d'`equipe.md`, sous la règle générale de 300) | **prête pour la fusion** |
| 2026-11-22 18 h | #257 fusionnée (15 h 49). Suite : #260 (VIT-20e) relue, **prête** (en-tête à 145 lignes, script déplacé tel quel, un débordement corrigé, axe-core sur les pages anglaises) ; #261, #262, #263 en phase (a) : tableaux sérieux et sourcés, avis du coordinateur au chef. L'agent tourne sur Sonnet 5.5, pas sur le modèle recommandé | — |
| 2026-11-22 18 h 10 | #223 et #260 fusionnées ; `main` saine en local ; visas du chef sur #261 à #263 ; captures « après » des 21 pages (1440 et 390 px) dans `..\travaux-planner\captures-vit-20\apres\`. Constat : Présences n'a pas de logo (place vide dans le menu, la grille et sa page) tant que VIT-09c n'a pas livré | — |
| 2026-11-22 18 h 10 | l'agent externe est indisponible (chef) : **Codex reprend** #263, #261 et #262 sur leurs branches (le chef pousse), puis VIT-20f (logos de VIT-09c, Présences d'abord) ; consigne déposée dans sa boîte | — |
| 2026-11-26 | VIT-22 (#263, `4ef37021`) relue : visa avant le code, périmètre tenu, douze modules depuis le catalogue, phrases vérifiées par un test contre le plan, CI verte (dix contrôles) ; détail : la ligne « Visa » du plan dit encore « en attente ». VIT-20d : lignes S1 à S3 de l'Espace de cours (`cafbf767`) **visées par le chef** ; Codex code après un `git merge origin/main` (#261 en conflit) | #263 **prête pour la fusion** |
| 2026-11-26 9 h 10 | VIT-20d (`0a709965`) relue : visa vérifié, phrases et sources prises au tableau visé (test ligne à ligne), `equipement.test.js` 3/3 et `verifier-neutre` relancés | **prête**, à pousser (#261) |
| 2026-11-26 9 h 25 | VIT-09d ouverte (logos dans le style du logo Planner, session Claude) : **VIT-20f attend le choix du chef** ; Codex fait VIT-21 puis le correctif `useEffect` | — |
| 2026-11-26 9 h 30 | VIT-21 : D1 à D7 (`85ac5354`) visées par le chef, phase (b) après son commentaire sur #262 ; plan de VIT-20f (`72c94adf`) mis de côté jusqu'au choix des logos | — |
