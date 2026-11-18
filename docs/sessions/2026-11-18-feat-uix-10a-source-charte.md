# Session du 2026-11-18 · UIX-10a · `feat/uix-10a-source-charte`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session VS Code |
| Chantier | UIX, exception hors chantier accordée par le chef le 18 nov. (UIX-10) |
| Dossier de travail | `..\travaux-planner\uix-10a-source-charte` (la fiche de mission dit `uix-10a-charte` : le dossier existait déjà, il est gardé) |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; plan court : `4dc4f070` |

## Objectif de la session

Reprendre UIX-10 après la validation du plan d'ensemble, appliquer la fiche de mission d'UIX-10a (corriger le plan d'UIX-10, écrire le plan court) et le faire viser par le coordinateur.

## Plan

- Plan d'ensemble : [uix-10-charte-commune.md](../conception/interface/uix-10-charte-commune.md), validé par le chef le 18 nov. (#206), corrigé le 18 nov. : UIX-10g retirée.
- Plan court : [uix-10a-source-charte.md](../conception/interface/uix-10a-source-charte.md), **à valider par le coordinateur** (taille M, ni migration ni sécurité).
- Mission : `docs/plan/missions/uix-10a-source-charte.md`, sur `doc/coordination-equipe`.

## Fait

- Au début, aucune fiche de mission pour UIX-10a : le chef a autorisé la session à commencer sans elle. La fiche est arrivée ensuite, avec la correction d'UIX-10 à faire d'abord.
- Branche `feat/uix-10a-source-charte`, empilée sur `doc/uix-10-charte-commune`, poussée par le chef (PR #207, brouillon).
- `18fc230b` : plan court d'UIX-10a, commité seul.
- `51f31d46` : première version de cette fiche.
- `162ba4c4` (sur `doc/uix-10-charte-commune`, #206) : plan d'UIX-10 corrigé, en un commit seul. UIX-10g est retirée. Les questions 9 et 10 sont sans objet. Il n'y a plus de sortie `--quiz`. Le Studio quiz entre dans 10b et 10e, et 10f attend la décision de l'étude StudyLib. La ligne UIX-10 du fichier du module suit.
- `ba59d152` : fusion de `doc/uix-10-charte-commune` dans la branche. Ce n'est pas un rebase, pour ne pas réécrire une branche déjà poussée.
- `4dc4f070` : plan court aligné sur la fiche de mission : 10g retirée, test permanent des 38 noms de variables du site, comparaison des `dist/` avant et après.
- Cette fiche, mise à jour.

## Vérifié

- Lu en lecture seule : `vitrine/src/styles/jetons.css` (38 variables), `vitrine/tests/jetons.test.js`, `shared/couleurs.js`, `shared/tokens.js`, `shared/package.json`, `.github/workflows/ci-cd.yml` et `vitrine.yml`, `scripts/verifier-neutre.mjs`, les imports de `shared/` dans le web et le mobile, `frontend/src/components/studio/`.
- Relevé : `contraste` de `shared/couleurs.js` arrondit au centième (le plan court calcule sans arrondi). Node 22 refuse l'import de JSON sans `with { type: 'json' }`. Aucune tâche de CI ne lance les tests de `shared/`, ni les tests `node --test` du frontend (`jetonsGestion.test.js` ne tourne qu'en local). Lighthouse et axe-core du site ne sont pas en CI : ils se lancent en local, selon le plan VIT.
- `node scripts/verifier-neutre.mjs` : passe.
- Aucun test de code lancé : la session n'a écrit aucun code.

## Écarts

Avec le plan d'ensemble, validés par le chef dans la session (questions 2, 5 et 6) et écrits dans le plan court :

- les statuts, les lignes des filières et le panneau entrent dans `jetons.json` en 10b, et non en 10a ;
- le `jetons.css` du site prend la police commune (`Inter` s'ajoute en repli) : c'est la seule valeur qui change ;
- `--studylib` passe de 10a à 10f, et `--quiz` disparaît avec UIX-10g.

Avec la fiche de mission, à noter par le coordinateur au visa :

- la fiche prévoit `--studylib` en 10a, testé sur un dossier temporaire. La réponse 6 du chef le reporte en 10f ;
- la fiche demande que les valeurs du site soient « vérifiées par un test ». Le plan court teste en permanence les noms, et vérifie les valeurs une fois dans la session (variables et `dist/` comparés), puisqu'elles changeront avec les SVG ;
- le dossier de travail s'appelle `uix-10a-source-charte`, et non `uix-10a-charte`.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 6 | Import du JSON, moment des statuts, version et empreinte, place en CI, police du site, sorties voisines | chef, 18 nov. : chaque proposition retenue (plan court, § 3) | répondues |
| — | Visa du plan court, avec les écarts ci-dessus | coordinateur | **en attente** |

## État laissé

- État des fonctions, pour `suivi.md` (le coordinateur le reporte) : UIX-10 → plan validé, **corrigé le 18 nov. (UIX-10g retirée, `162ba4c4`, #206)** ; UIX-10a → **plan court écrit, à valider par le coordinateur** (#207, `4dc4f070`).
- `docs/plan/suivi.md` n'est pas modifié.
- Signalé au coordinateur : les tests `node --test` du frontend ne tournent pas en CI (hors périmètre d'UIX-10a).

## Reste à faire, dans l'ordre

1. Le coordinateur vise le plan court et remplit la ligne « Validé ».
2. Code d'UIX-10a, selon le § 9 du plan court : `jetons.json` et `contraste.mjs`, puis `generer.mjs` (le site et le guide), puis `index.js` et la CI, enfin les tests du site, la comparaison des `dist/` et `verifier-neutre`.
3. Après la fusion de #206, ramener la branche sur `main`, puis passer #207 sur la base `main`.
4. Ensuite, mission suivante : l'étude StudyLib (`docs/plan/missions/etude-studylib.md`).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\uix-10-charte" push
git -C "..\travaux-planner\uix-10a-source-charte" push
```

#206 reçoit la correction d'UIX-10, et #207 le plan court corrigé ainsi que cette fiche. Aucune nouvelle PR.

## Prompt de reprise

```text
Tu reprends UIX-10a (source de la charte, générateur et guide), première fonction d'UIX-10, exception hors chantier
accordée par le chef le 18 nov., sur la branche feat/uix-10a-source-charte (PR #207, empilée sur doc/uix-10-charte-commune, PR #206),
dans ..\travaux-planner\uix-10a-source-charte.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la mission docs/plan/missions/uix-10a-source-charte.md
(branche doc/coordination-equipe), le plan d'ensemble docs/conception/interface/uix-10-charte-commune.md,
le plan court docs/conception/interface/uix-10a-source-charte.md et cette fiche
(docs/sessions/2026-11-18-feat-uix-10a-source-charte.md).
Fait : plan d'UIX-10 corrigé (UIX-10g retirée, 162ba4c4) ; plan court écrit et aligné sur la mission (4dc4f070) ;
questions 1 à 6 répondues par le chef (import simple du JSON ; statuts, lignes et panneau en 10b ;
version entière et SHA-256 de 12 caractères ; CI dans « Build Frontend » et shared/charte/** qui déclenche vitrine.yml ;
police commune pour le site ; --studylib en 10f après l'étude StudyLib).
Reste : vérifier que la ligne « Validé » du plan court est remplie par le coordinateur, sinon s'arrêter et le demander ;
puis coder selon le § 9 du plan court ; si #206 est fusionnée, ramener la branche sur origin/main d'abord.
Ensuite : l'étude StudyLib (docs/plan/missions/etude-studylib.md).
Règles : pas de code hors du plan validé ; questions avant toute supposition ; ni frontend/, ni mobile/, ni design-tokens.json,
tokens.js ou couleurs.js (UIX-10b) ; aucun dépôt voisin ; fiche de session à jour ; suivi.md non modifié ; jamais de git push.
```
