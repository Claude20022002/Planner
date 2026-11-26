# Mission · QUA-02 · découper les fichiers trop longs

| | |
|---|---|
| État | ouverte, à commencer après les corrections en cours d'Alexis |
| Agent | Alexis et son agent |
| Modèle recommandé | un modèle moyen par fichier : découpage sans changement de comportement, tests déjà là ; le plus capable si le fichier touche la connexion ou les droits |
| Attribuée le | 2026-11-26, par le coordinateur ; accord du chef : oui, le 2026-11-26 |
| Module et chantier | [QUA](../modules/QUA-qualite-docs.md) · fonction libre (README, § 2) |
| Fonction | QUA-02 : découper les contrôleurs et les fichiers trop longs, sans changer leur comportement · M par fichier |
| Branche | une par fichier : `refactor/qua-02-<fichier>` (par exemple `refactor/qua-02-salle-controller`), depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\qua-02-<fichier>` |
| Plan de conception | un plan court par fichier, à écrire · validé par le coordinateur |

## Critère de « terminé »

Recopié du module QUA : **aucun contrôleur ne dépasse 200 lignes ; la suite complète passe sans changer un seul test.** Pour un fichier de l'interface : 300 lignes au plus, et les parcours de la CI passent sans changer un seul test.

## Ordre

1. `backend/controllers/salleController.js` (210 lignes sur `main` le 26 nov.).
2. Signalés par le lint de la CI le 26 nov. : `frontend/src/App.jsx` (436), `frontend/src/pages/Annonces.jsx` (435), `frontend/src/design-system/board/DepartureBoard.jsx` (403).
3. Ensuite, les autres contrôleurs de plus de 200 lignes, un par branche, dans l'ordre que le plan propose (le plus long d'abord). `userController.js` et `authController.js` attendent la fusion de #270, qui les modifie.

## Périmètre d'écriture

L'agent peut modifier, pour chaque branche :

- le fichier découpé et les fichiers nouveaux qui en sortent (`services/`, composants voisins)
- les imports qui pointent vers le fichier découpé
- le fichier du module QUA et sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- les tests (le critère : ils passent **sans changement**)
- un fichier qu'une PR ouverte modifie : `App.jsx` est touché par #230 (STA-01) ; le découper après la fusion de #230
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Attribution à Alexis : choix du chef, 26 nov., après ses corrections de #265, #230, #229, #269 et #270.
- Règle métier dans `services/`, contrôleur réduit à lire la requête et rendre la réponse (README, § 5).
- Un fichier par branche : les relectures restent courtes et les conflits rares.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| — | aucune pour l'instant | — | — |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : QUA-02 (découper les fichiers trop longs), module QUA, fonction libre.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/qua-02.md.
Commence seulement quand tes corrections de #265, #230, #229, #269 et #270 sont faites.
Un fichier par branche : refactor/qua-02-<fichier>, depuis origin/main, dans ..\travaux-planner\qua-02-<fichier>.
Premier fichier : backend/controllers/salleController.js.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris un plan court par fichier (ce qui part où), commite-le seul, et dépose-le dans sortie/ pour validation.
Règles : pas de code avant le plan validé ; aucun test modifié ; fiche de session à jour en fin de session,
suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-26 | fiche écrite, prompt déposé dans la boîte d'Alexis | — |
