# Session du 2026-11-18 · UIX-10a · `feat/uix-10a-source-charte`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session VS Code |
| Chantier | UIX, exception hors chantier accordée par le chef le 18 nov. (UIX-10) |
| Dossier de travail | `..\travaux-planner\uix-10a-source-charte` (gardé, sur décision du coordinateur ; la fiche de mission disait `uix-10a-charte`) |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; code : `9462419a`, `75bb1375`, `d85f276a` |

## Objectif de la session

Coder UIX-10a, selon le plan court visé par le coordinateur : la source `shared/charte/jetons.json`, le générateur et son `--verifier`, le `jetons.css` du site et le guide générés, `index.js`, le contrôle en CI.

## Plan

- Plan d'ensemble : [uix-10-charte-commune.md](../conception/interface/uix-10-charte-commune.md), validé par le chef le 18 nov. (#206), corrigé le même jour : UIX-10g retirée (`162ba4c4`).
- Plan court : [uix-10a-source-charte.md](../conception/interface/uix-10a-source-charte.md), **validé par le coordinateur le 18 nov.** (visa sur `4dc4f070`, ligne écrite dans `c8cba6b4`).
- Mission : `docs/plan/missions/uix-10a-source-charte.md` ; file de travail : `docs/plan/feuille-de-route.md` (branche `doc/coordination-equipe`).

## Fait

Avant cette session : `18fc230b` et `4dc4f070` (plan court), `162ba4c4` sur #206 (plan d'UIX-10 corrigé), `ba59d152` (fusion de `doc/uix-10-charte-commune` dans la branche).

- `c8cba6b4` : ligne « Validé » du plan court, commit seul.
- `9462419a` (étape 2) : `shared/charte/jetons.json` (version 1 ; 7 familles ; 38 jetons du site marqués `site`, et les ajouts pour les applications : `trait-fort`, `bleu-vif`, `jeu`, le sombre dérivé, l'échelle fixe de la gestion, `rayon-commande`, les durées 120 et 320ms, la courbe en tableau ; 19 paires en clair et 12 en sombre ; 1 paire interdite). `contraste.mjs` calcule le rapport sans arrondi, depuis `luminance` de `shared/couleurs.js`. Tests 1 et 2.
- `75bb1375` (étape 3) : `generer.mjs` (table de sorties, en-tête avec version et empreinte SHA-256 de 12 caractères, `--verifier`, refus de toute autre option). `vitrine/src/styles/jetons.css` et `shared/charte/README.md` (le guide) sont générés. Tests 3 à 7.
- `d85f276a` (étape 4) : `index.js` (un import simple du JSON ; `charte`, et un objet « nom → valeur » par famille, gelé). Deux étapes dans la tâche « Build Frontend » de `ci-cd.yml` : `--verifier`, puis les tests de la charte. `shared/charte/**` déclenche `vitrine.yml` (deux lignes `paths`).
- Ligne UIX-10 du fichier du module : « UIX-10a codée, PR à ouvrir ».
- Cette fiche.

## Vérifié

- `node --test shared/charte/charte.test.js` : 7 réussis, 0 échec. Les tests sont aussi lancés depuis `frontend/`, comme en CI.
- `node shared/charte/generer.mjs --verifier` : passe sur les fichiers que Git sort en CRLF sous Windows (les fins de ligne sont ramenées à LF avant la comparaison). Il sort en code 1 sur un `jetons.css` retouché à la main, et sur une option inconnue.
- Variables du `jetons.css` généré, comparées au fichier écrit à la main : les mêmes 38 noms dans le même ordre, et les mêmes valeurs, **sauf `--police`** (`Inter` ajouté en repli, réponse 5).
- Site construit avant et après (`npm run build`), puis les deux `dist/` comparés : une seule feuille change (nom haché nouveau), et la seule valeur qui y diffère est `--police`. Les 21 pages HTML ne diffèrent que par le nom de cette feuille. Lighthouse et axe-core n'ont donc rien qui puisse bouger : ils n'ont pas été relancés (plan court, § 8).
- `npm run test:unit` du site : 43 réussis, 0 échec, sans changement de `jetons.test.js`.
- `node scripts/verifier-neutre.mjs` : passe.
- Les deux workflows se lisent comme du YAML valide. La CI elle-même n'a pas tourné : la branche n'est pas poussée.
- Les rapports calculés sont ceux du § 4.2 du plan d'ensemble (par exemple `trait-fort` sur blanc 3,51, `bleu-vif` sur l'écran 4,45, `bleu-nuit` sur `jeu` 7,27, `bleu` sur `bleu-pale` 4,16, interdite).

## Écarts avec le plan court

Aucun écart de fond. Trois choix de détail, à l'intérieur du module :

- dans `jetons.json`, les six couleurs du logo portent `logo: true`. C'est ce qui sépare, dans le CSS du site, le groupe « Couleurs des logos » du groupe « Neutres dérivés ». Le guide l'affiche en colonne ;
- le fond (`ecran`) et l'action (`bleu-clair`) du sombre ne sont pas recopiés dans la famille `sombre` : les paires les nomment directement, et le guide comme `index.js` le disent. Ainsi aucune valeur n'existe en double ;
- seuils : 3:1 pour le focus, les traits et l'action posée sur une surface, comme le veulent les WCAG pour ce qui n'est pas du texte ; 4,5:1 pour tout le texte.

`jetons.json` fait 112 lignes, pour ~170 visées : les rôles tiennent sur une ligne par jeton.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 6 | Import du JSON, moment des statuts, version et empreinte, place en CI, police du site, sorties voisines | chef, 18 nov. : chaque proposition retenue (plan court, § 3) | répondues |
| — | Visa du plan court | coordinateur, 18 nov. (`4dc4f070`) | fait |

## État laissé

- État de la fonction, pour `suivi.md` (le chef ou le coordinateur le reporte) : UIX-10a → **codée, à pousser** (#207, à sortir du brouillon). Elle reste empilée sur #206.
- `docs/plan/suivi.md` n'est pas modifié. Le fichier du module l'est (ligne UIX-10).
- Toujours signalé : les tests `node --test` du frontend (`jetonsGestion.test.js`) ne tournent pas en CI. C'est hors du périmètre d'UIX-10a.
- Dans le dossier de travail, `vitrine/node_modules/` et `vitrine/dist/` (ignorés par Git) restent de la construction.

## Reste à faire, dans l'ordre

1. Le chef pousse la branche, sort #207 du brouillon et attend la CI verte : la tâche « Build Frontend » et le workflow du site.
2. Après la fusion de #206 : ramener la branche sur `origin/main`, puis passer #207 sur la base `main`.
3. Missions suivantes (feuille de route) : UIX-10b, dont le plan court attend la fusion de #199 et d'UIX-09 ; puis UIX-06c, sur la charte d'UIX-10b ; QJE-14 (le plan) ; l'étude StudyLib ; UIX-10d. La première qu'on peut faire tout de suite est **QJE-14 (plan)**, tant que #199 et UIX-09 ne sont pas fusionnées. Chacune dans une nouvelle session.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\uix-10a-source-charte" push
gh pr edit 207 --title "UIX-10a : source de la charte, générateur et guide"
gh pr ready 207
```

#207 garde la base `doc/uix-10-charte-commune` tant que #206 n'est pas fusionnée.

## Prompt de reprise

```text
Tu reprends UIX-10a (source de la charte, générateur et guide), première fonction d'UIX-10, exception hors chantier
accordée par le chef le 18 nov., sur la branche feat/uix-10a-source-charte (PR #207, empilée sur doc/uix-10-charte-commune, PR #206),
dans ..\travaux-planner\uix-10a-source-charte.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la mission docs/plan/missions/uix-10a-source-charte.md
et docs/plan/feuille-de-route.md (branche doc/coordination-equipe), le plan court docs/conception/interface/uix-10a-source-charte.md
(validé par le coordinateur le 18 nov.) et cette fiche (docs/sessions/2026-11-18-feat-uix-10a-source-charte.md).
Fait : UIX-10a codée (9462419a, 75bb1375, d85f276a) : shared/charte/ (jetons.json, contraste.mjs, generer.mjs et --verifier,
index.js, charte.test.js, README.md généré), vitrine/src/styles/jetons.css généré (38 variables ; seule la police change),
CI (Build Frontend, et shared/charte/** dans vitrine.yml). 7 tests de la charte et 43 du site réussis ; dist/ comparés.
Reste : regarder la CI de #207 une fois poussée et corriger ce qui échoue ; si #206 est fusionnée, ramener la branche sur origin/main.
Ensuite, nouvelle session pour la mission suivante de la feuille de route (QJE-14 plan, tant que #199 et UIX-09 ne sont pas fusionnées ;
puis UIX-10b, dont le plan court est validé par le chef).
Règles : pas de code hors du plan validé ; questions avant toute supposition ; ni frontend/, ni mobile/, ni design-tokens.json,
tokens.js ou couleurs.js (UIX-10b) ; aucun dépôt voisin ; fiche de session à jour ; suivi.md non modifié ; jamais de git push.
```
