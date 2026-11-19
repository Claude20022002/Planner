# Session du 2026-11-19 · VIT-14 et VIT-14b · `feat/vit-14-comparatif`, `feat/vit-14b-criteres`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), suite de la session de VIT-14, sur consigne du coordinateur relayée par le chef |
| Chantier | VIT (condition 10 de la mise en ligne du site vitrine) |
| Dossiers de travail | `..\travaux-planner\vit-14-comparatif` ; `..\travaux-planner\vit-14b-criteres` |
| Derniers commits | VIT-14 : `ac2d203b` (fusionnée par #224) ; VIT-14b : voir `git log -1` (cette fiche), code `7c4cd8f4` |

## Objectif de la session

1. VIT-14 (#224, relue conforme) : fusionner `origin/main`, relancer tests et build, commiter.
2. VIT-14b : le complément de plan pour les critères de l'expertise (C4), avec la source de chaque case, à faire valider par le chef case par case. Le code après la fusion de #224.

## Plan

- VIT-14 : [vit-14-comparatif.md](../conception/vitrine/vit-14-comparatif.md), validé le 18 nov. (sur `feat/vit-14-comparatif`).
- VIT-14b : [vit-14b-criteres.md](../conception/vitrine/vit-14b-criteres.md), **validé par le chef le 19 nov.** (`98920ba6`).

## Fait

| Commit | Branche | Contenu |
|---|---|---|
| `ac2d203b` | `feat/vit-14-comparatif` | fusion de `origin/main` (`d27e30ee` : l'expertise, #225), sans conflit ; le chef avait déjà fusionné #216 dans la branche (`fbdd7acc`) |
| `82ed5c0a` | `feat/vit-14b-criteres` | complément de plan : deux critères, chaque case Planner sourcée, cases d'approche appuyées sur les études ou marquées « à confirmer » |
| `98920ba6` | `feat/vit-14b-criteres` | ligne « Validé » du complément, seule |
| `c9217d88` | `feat/vit-14b-criteres` | fusion de `origin/main` après #224 (`736a8f7e`, CI entièrement verte, parcours compris), sans conflit |
| `7c4cd8f4` | `feat/vit-14b-criteres` | le code : `appelProtege` et `sansReseau` dans `LIGNES` et `SOURCES`, `DATE` au 2026-11-19 ; les deux lignes et « huit critères » dans `comparer.json` (fr, en ; ar vide) ; `comparer.test.js` adapté et un test de plus |

## Vérifié

- VIT-14 après la fusion : `npm run test:unit` **88 sur 88** ; `npm run build` **52 pages** ; `verifier-neutre.mjs` sans nom d'école ; arbre propre.
- Les trois critères de C4, relus dans le code de `origin/main` à `d27e30ee` :
  - **l'appel qu'on ne peut pas tromper** : confirmé (`appel.js` l. 225, 232 à 244, 259 à 261, 174, 193 ; `FENETRE_MS`) ;
  - **le bilan de chaque règle** : calculé et enregistré (`bilan.js`, `generation.js` l. 93), mais **aucun écran ne l'affiche** (aucune trace de `non_respectee` dans `frontend/src` ni `mobile/src` ; `RapportGeneration.jsx` montre les exclus et les avertissements), et aucune route ne permet à l'école de déclarer ses règles (MOT-13c). D'où la question 1 ;
  - **la semaine sans réseau** : confirmée pour ce qui a déjà été consulté (`cache.js`, `semaine.jsx` l. 40 à 50 et 157, `index.jsx` l. 32 à 41), effacée à la déconnexion ; l'application hors ligne complète reste MOB-06.
- VIT-14b, sur `7c4cd8f4` : `npm run test:unit` **89 sur 89** (les textes français sont présents mot pour mot dans les deux plans validés) ; `npm run build` **52 pages** ; `verifier-neutre.mjs` sans nom d'école.
- Navigateur (Playwright et axe-core, mouvement réduit), accueil et `/comparer/`, fr et en, 390, 768 et 1440 px, avec et sans JavaScript : aucun débordement, **aucune violation axe-core**, l'accueil garde 5 lignes, la page en a 9. Capture de la page en 1440 px regardée : « huit critères », « Établi le 19 novembre 2026 », les deux lignes à leur place.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Le bilan de chaque règle, que personne ne voit encore | pas de ligne pour l'instant | répondu (chef) |
| 2 | Les nouveaux critères sur l'accueil | non, `/comparer/` seulement | répondu (chef) |
| 3 | « six critères » dans l'accroche | mettre le nouveau nombre (huit) | répondu (chef) |
| 4 | Libellé de l'appel protégé | « Un appel qu'on ne peut pas tromper » | répondu (chef) |
| 5 | Chaque case des § 3 et § 4 du complément, et le texte du § 5 | « Je valide le complément de VIT-14b » : tel qu'écrit, cases « à confirmer » gardées, date 2026-11-19 | répondu (chef), `98920ba6` |

## État laissé

- Pour `suivi.md` (le coordinateur le reporte) : VIT-14 → **fusionnée** (#224, `736a8f7e`, 19 nov.) ; VIT-14b → **codée** (`7c4cd8f4`) sur `feat/vit-14b-criteres`, complément validé (`98920ba6`), à relire puis à pousser.
- `docs/plan/suivi.md` et la fiche de mission ne sont pas touchés.
- Pour le coordinateur : l'expertise (C4) annonçait trois critères ; le bilan des règles n'entre pas, faute d'écran. Il pourra revenir avec MOT-13c, par un complément de plan de plus.

## Reste à faire, dans l'ordre

1. Relecture de `feat/vit-14b-criteres` par le coordinateur (skill `relecture-branche`).
2. Push et PR par le chef.
3. Plus tard : la ligne « bilan de chaque règle » avec l'écran de MOT-13c ; changer `DATE` dans `comparatif.js` à chaque revérification des sources.

## Commandes pour le chef de projet

```powershell
git -C "..	ravaux-plannerit-14b-criteres" push -u origin feat/vit-14b-criteres
gh pr create --base main --head feat/vit-14b-criteres --title "VIT-14b : deux critères de plus au comparatif (huit au total)" --fill
gh pr merge --auto --merge feat/vit-14b-criteres
```

## Prompt de reprise

```text
Tu reprends VIT-14b (deux critères de plus au comparatif « Pourquoi Planner », d'après l'expertise C4)
du chantier VIT, sur la branche feat/vit-14b-criteres, dans le dossier ..	ravaux-plannerit-14b-criteres.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-5, EP-13, EP-18), docs/plan/suivi.md,
les plans docs/conception/vitrine/vit-14-comparatif.md et vit-14b-criteres.md, et cette fiche
(docs/sessions/2026-11-19-feat-vit-14b-criteres.md).
Fait : VIT-14 fusionnée (#224) ; complément de VIT-14b validé (98920ba6) ; main fusionnée (c9217d88) ;
code 7c4cd8f4 : « Un appel qu'on ne peut pas tromper » et « Les semaines déjà consultées, lisibles sans réseau »,
« huit critères », DATE 2026-11-19 ; 89 tests, 52 pages, axe-core sans violation en 390/768/1440 px.
Reste : relecture du coordinateur ; push et PR par le chef. Plus tard, le bilan des règles avec MOT-13c.
Questions en attente : aucune.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; aucun produit nommé,
aucun prix, aucun chiffre inventé ; fiche de session à jour en fin de session, suivi.md non modifié ;
jamais de git push.
```
