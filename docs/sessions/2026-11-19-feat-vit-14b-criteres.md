# Session du 2026-11-19 · VIT-14 et VIT-14b · `feat/vit-14-comparatif`, `feat/vit-14b-criteres`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), suite de la session de VIT-14, sur consigne du coordinateur relayée par le chef |
| Chantier | VIT (condition 10 de la mise en ligne du site vitrine) |
| Dossiers de travail | `..\travaux-planner\vit-14-comparatif` ; `..\travaux-planner\vit-14b-criteres` |
| Derniers commits | VIT-14 : `ac2d203b` ; VIT-14b : voir `git log -1` (cette fiche), complément `82ed5c0a` |

## Objectif de la session

1. VIT-14 (#224, relue conforme) : fusionner `origin/main`, relancer tests et build, commiter.
2. VIT-14b : le complément de plan pour les critères de l'expertise (C4), avec la source de chaque case, à faire valider par le chef case par case. Le code après la fusion de #224.

## Plan

- VIT-14 : [vit-14-comparatif.md](../conception/vitrine/vit-14-comparatif.md), validé le 18 nov. (sur `feat/vit-14-comparatif`).
- VIT-14b : [vit-14b-criteres.md](../conception/vitrine/vit-14b-criteres.md), **à valider par le chef case par case**.

## Fait

| Commit | Branche | Contenu |
|---|---|---|
| `ac2d203b` | `feat/vit-14-comparatif` | fusion de `origin/main` (`d27e30ee` : l'expertise, #225), sans conflit ; le chef avait déjà fusionné #216 dans la branche (`fbdd7acc`) |
| `82ed5c0a` | `feat/vit-14b-criteres` | complément de plan : deux critères, chaque case Planner sourcée, cases d'approche appuyées sur les études ou marquées « à confirmer » |

## Vérifié

- VIT-14 après la fusion : `npm run test:unit` **88 sur 88** ; `npm run build` **52 pages** ; `verifier-neutre.mjs` sans nom d'école ; arbre propre.
- Les trois critères de C4, relus dans le code de `origin/main` à `d27e30ee` :
  - **l'appel qu'on ne peut pas tromper** : confirmé (`appel.js` l. 225, 232 à 244, 259 à 261, 174, 193 ; `FENETRE_MS`) ;
  - **le bilan de chaque règle** : calculé et enregistré (`bilan.js`, `generation.js` l. 93), mais **aucun écran ne l'affiche** (aucune trace de `non_respectee` dans `frontend/src` ni `mobile/src` ; `RapportGeneration.jsx` montre les exclus et les avertissements), et aucune route ne permet à l'école de déclarer ses règles (MOT-13c). D'où la question 1 ;
  - **la semaine sans réseau** : confirmée pour ce qui a déjà été consulté (`cache.js`, `semaine.jsx` l. 40 à 50 et 157, `index.jsx` l. 32 à 41), effacée à la déconnexion ; l'application hors ligne complète reste MOB-06.
- Aucun code de VIT-14b : il attend la validation et la fusion de #224.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Le bilan de chaque règle, que personne ne voit encore | pas de ligne pour l'instant | répondu (chef) |
| 2 | Les nouveaux critères sur l'accueil | non, `/comparer/` seulement | répondu (chef) |
| 3 | « six critères » dans l'accroche | mettre le nouveau nombre (huit) | répondu (chef) |
| 4 | Libellé de l'appel protégé | « Un appel qu'on ne peut pas tromper » | répondu (chef) |
| 5 | Chaque case des § 3 et § 4 du complément, et le texte du § 5 | — | **en attente du chef** |

## État laissé

- Pour `suivi.md` (le coordinateur le reporte) : VIT-14 → codée, relue conforme, `main` fusionnée (`ac2d203b`), prête à pousser ; VIT-14b → complément de plan écrit (`82ed5c0a`), à valider ; code après la fusion de #224.
- `docs/plan/suivi.md` et la fiche de mission ne sont pas touchés.
- Pour le coordinateur : l'expertise (C4) annonçait trois critères ; le bilan des règles n'entre pas, faute d'écran. Il pourra revenir avec MOT-13c.

## Reste à faire, dans l'ordre

1. Le chef pousse `feat/vit-14-comparatif` et fusionne #224.
2. Le chef valide le complément de VIT-14b case par case (cases « à confirmer » comprises) ; ligne « Validé » commitée seule.
3. `git merge origin/main` dans `feat/vit-14b-criteres` (après #224), puis le code du § 6 et ses vérifications.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vit-14-comparatif" push
gh pr merge 224 --merge
```

Le complément de VIT-14b se pousse avec son code, après validation ; ou dès maintenant si le chef veut le relire en PR :

```powershell
git -C "..\travaux-planner\vit-14b-criteres" push -u origin feat/vit-14b-criteres
gh pr create --base main --head feat/vit-14b-criteres --title "VIT-14b : deux critères de plus au comparatif (plan)" --fill --draft
```

## Prompt de reprise

```text
Tu reprends VIT-14b (deux critères de plus au comparatif « Pourquoi Planner », d'après l'expertise C4)
du chantier VIT, sur la branche feat/vit-14b-criteres, dans le dossier ..\travaux-planner\vit-14b-criteres.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-5, EP-13, EP-18), docs/plan/suivi.md,
le plan de départ docs/conception/vitrine/vit-14-comparatif.md (sur main après #224),
le complément docs/conception/vitrine/vit-14b-criteres.md et cette fiche
(docs/sessions/2026-11-19-feat-vit-14b-criteres.md).
Fait : VIT-14 fusionnée avec main (ac2d203b), 88 tests, 52 pages ; complément de VIT-14b écrit (82ed5c0a) :
« Un appel qu'on ne peut pas tromper » et « Les semaines déjà consultées, lisibles sans réseau » ;
le bilan de chaque règle n'entre pas (aucun écran ne l'affiche) ; l'accueil ne change pas ; « huit critères ».
Reste : validation du chef case par case (ligne « Validé » commitée seule) ; après la fusion de #224,
git merge origin/main, puis le code du § 6 (comparatif.js, comparer.json x3, comparer.test.js),
DATE au jour de la validation, et les vérifications.
Questions en attente : la validation des § 3 à § 5 du complément.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; aucun produit nommé,
aucun prix, aucun chiffre inventé ; fiche de session à jour en fin de session, suivi.md non modifié ;
jamais de git push.
```
