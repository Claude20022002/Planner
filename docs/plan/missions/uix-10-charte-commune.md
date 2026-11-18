# Mission · UIX-10 · charte commune à toutes les plateformes, d'après le site vitrine

| | |
|---|---|
| État | ouverte : plan à écrire |
| Agent | Claude (VS Code), une nouvelle session. C'est la session qui a fixé le style du site vitrine |
| Modèle recommandé | le plus capable disponible (Claude Fable 5.2, sinon Opus 5.5). La charte engage toutes les interfaces et trois dépôts |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. (« toutes nos plateformes doivent suivre le style du site vitrine », « charte d'abord ») |
| Module et chantier | [UIX](../modules/UIX-interface.md) · **exception hors chantier** accordée par le chef le 18 nov., comme pour UIX-06, sans changement d'API ni migration |
| Fonction | UIX-10 : une seule source de jetons visuels (couleurs du logo, Inter, tailles, rayons, ombres, mouvement) tirée du site vitrine, et l'ordre dans lequel chaque plateforme l'adopte · taille L (plan), puis une fonction par plateforme |
| Branche | `doc/uix-10-charte-commune`, depuis `origin/main`, pour le plan seul |
| Dossier de travail | `..\travaux-planner\uix-10-charte` |
| Plan de conception | `docs/conception/interface/uix-10-charte-commune.md`, à écrire · **validé par le chef** (taille L, plusieurs dépôts, choix de produit) |

## Ce que le chef a décidé (18 nov.)

- Toutes les plateformes suivent le style du site vitrine, avec les mêmes couleurs : l'application web, le mobile, l'espace des jeux, StudyLib (la bibliothèque) et le quiz.
- La charte vient d'abord. Ensuite, on l'applique plateforme par plateforme : l'application web (suite d'UIX-06), puis le mobile et les jeux, puis StudyLib et le quiz dans leurs dépôts.
- C'est une exception hors chantier, sans changement d'API ni migration.
- Le logo « mosaïque » reste pour l'instant dans l'application (décision du 18 nov.). Le plan dit s'il faut changer ce choix, et le chef tranche.

## Ce que le plan doit établir

1. **La source unique des jetons** : où elle vit (par exemple `shared/design/`), dans quel format (un fichier JSON ou JS, d'où sortent des variables CSS pour le site, StudyLib et le quiz, un thème MUI pour l'application web, des constantes pour le mobile), et comment chaque dépôt la reçoit sans la recopier à la main. StudyLib (Laravel) et le quiz (fork de ClassQuiz) sont dans leurs propres dépôts.
2. **Les jetons eux-mêmes**, relevés dans `vitrine/src/styles/jetons.css` : couleurs (provisoires tant que les SVG manquent), typographie, espacements, rayons, ombres, durées et courbes d'animation, mouvement réduit. Le contraste AA de chaque paire texte et fond, en clair et en sombre.
3. **L'écart actuel de chaque plateforme** avec ces jetons : thème de gestion d'UIX-06a et UIX-06b, `ThemeGestion`, `jetonsGestion.js`, mobile, jeux, StudyLib, quiz.
4. **L'ordre et le découpage** : une fonction par plateforme, chacune avec son plan court. Pour le quiz, les fichiers modifiés restent sous licence MPL 2.0, et la mention du fork est gardée.
5. **Ce qui ne change pas** : fonctions, droits, API, données.

## Périmètre d'écriture

L'agent peut écrire :
- `docs/conception/interface/uix-10-charte-commune.md` ;
- `docs/plan/modules/UIX-interface.md`, pour la ligne UIX-10 ;
- sa fiche de session.

Il **lit** sans les modifier : `vitrine/`, `frontend/`, `mobile/`, `shared/`, et les dépôts voisins `..\StudyLib` et `..\ClassQuiz`.

Il ne touche pas :
- à **`docs/plan/suivi.md`**, que tient le coordinateur ;
- au code, tant que le plan n'est pas validé ;
- aux fichiers d'UIX-06b (#199) et d'UIX-09, tenus par Codex.

## Questions déjà connues, à poser au chef avec une proposition

1. Le logo de l'application : garder la mosaïque, ou passer aux logos du site (variante 4 pour l'icône) ?
2. Les jeux et le quiz gardent-ils une touche de couleur propre (jeu, énergie), ou seulement les bleus du logo ?
3. Faut-il une page de la charte (un « guide de style ») consultable, et où ?

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : UIX-10, la charte commune à toutes les plateformes d'après le site vitrine
(exception hors chantier accordée par le chef le 18 nov.). Plan seulement, pas de code.
Lis d'abord AGENTS.md, docs/plan/README.md et docs/plan/suivi.md, puis ta fiche docs/plan/missions/uix-10-charte-commune.md,
sur la branche doc/coordination-equipe (..\travaux-planner\coordination-equipe).
git worktree add "..\travaux-planner\uix-10-charte" -b doc/uix-10-charte-commune origin/main
Relève les jetons du site vitrine (vitrine/src/styles/jetons.css), puis l'écart de chaque plateforme : application web,
mobile, jeux, et les dépôts voisins ..\StudyLib (Laravel) et ..\ClassQuiz (fork, licence MPL 2.0), en lecture seule.
Pose au chef les questions de la fiche, chacune avec ta proposition, puis écris le plan
(docs/conception/interface/uix-10-charte-commune.md, d'après docs/plan/modeles/conception.md). Commite-le seul.
Le chef le valide. Ne modifie pas docs/plan/suivi.md : c'est le coordinateur qui le tient.
Fiche de session à jour ; tout est commité ; jamais de git push. Le chef relaie entre toi et le coordinateur.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 13 h 30 | fiche écrite ; prompt donné au chef | — |
