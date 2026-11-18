# Session du 2026-11-18 · UIX-10a · `feat/uix-10a-source-charte`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session VS Code |
| Chantier | UIX, exception hors chantier accordée par le chef le 18 nov. (UIX-10) |
| Dossier de travail | `..\travaux-planner\uix-10a-source-charte` |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; plan court : `18fc230b` |

## Objectif de la session

Reprendre UIX-10 après la validation du plan d'ensemble et préparer UIX-10a : la source `shared/charte/`, le générateur, le contrôle de CI et le guide.

## Plan

- Plan d'ensemble : [uix-10-charte-commune.md](../conception/interface/uix-10-charte-commune.md), validé par le chef le 18 nov. (PR #206, ouverte, non fusionnée).
- Plan court : [uix-10a-source-charte.md](../conception/interface/uix-10a-source-charte.md), **à valider par le coordinateur** (taille M, ni migration ni sécurité).

## Fait

- Constat : il n'existait aucune fiche de mission pour UIX-10a, ni sur `doc/coordination-equipe` ni dans les boîtes aux lettres. Le chef a autorisé la session à commencer sans elle, le 18 nov.
- Branche `feat/uix-10a-source-charte`, empilée sur `doc/uix-10-charte-commune` (`2563f2ab`), dossier `..\travaux-planner\uix-10a-source-charte`.
- `18fc230b` : plan court d'UIX-10a, commité seul.
- Cette fiche.

## Vérifié

- Lu en lecture seule : `vitrine/src/styles/jetons.css`, `vitrine/tests/jetons.test.js`, `shared/couleurs.js`, `shared/tokens.js`, `shared/package.json`, `.github/workflows/ci-cd.yml` et `vitrine.yml`, `scripts/verifier-neutre.mjs`, les imports de `shared/` dans le web et le mobile.
- Relevé : `contraste` de `shared/couleurs.js` arrondit au centième (le plan court calcule sans arrondi) ; Node 22 refuse l'import de JSON sans `with { type: 'json' }` ; aucune tâche de CI ne lance les tests de `shared/` ni les tests `node --test` du frontend (`jetonsGestion.test.js` ne tourne qu'en local).
- Aucun test lancé : la session n'a écrit aucun code.

## Écarts avec le plan d'ensemble

Validés par le chef dans la session (questions 2, 5 et 6) ; ils sont écrits dans le plan court :

- les statuts, les lignes des filières et le panneau entrent dans `jetons.json` en 10b, et non en 10a ;
- le `jetons.css` du site prend la police commune (`Inter` s'ajoute en repli) : c'est la seule valeur qui change ;
- les sorties `--studylib` et `--quiz` passent de 10a à 10f et 10g.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 6 | Import du JSON, moment des statuts, version et empreinte, place en CI, police du site, sorties voisines | chef, 18 nov. : chaque proposition retenue (plan court, § 3) | répondues |
| — | Visa du plan court | coordinateur | **en attente** |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : UIX-10a → **plan court écrit, à valider par le coordinateur** (`feat/uix-10a-source-charte`, `18fc230b`), sans fiche de mission, avec l'accord du chef.
- `docs/plan/suivi.md` et le fichier du module ne sont pas modifiés : rien de ce qui existe n'a changé.
- Signalé au coordinateur : les tests `node --test` du frontend ne tournent pas en CI (hors périmètre d'UIX-10a).

## Reste à faire, dans l'ordre

1. Le coordinateur valide le plan court et remplit la ligne « Validé » ; il écrit la fiche de mission s'il le juge utile.
2. Code d'UIX-10a, selon le § 9 du plan court : `jetons.json` et `contraste.mjs`, puis `generer.mjs` (le site et le guide), puis `index.js` et la CI, enfin les tests du site, la construction et `verifier-neutre`.
3. Après la fusion de #206, ramener la branche sur `main` (rebase), puis ouvrir la PR de base `main`.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\uix-10a-source-charte" push -u origin feat/uix-10a-source-charte
gh pr create --draft --base doc/uix-10-charte-commune --head feat/uix-10a-source-charte --title "UIX-10a : source de la charte, générateur et guide (plan à valider)" --fill
```

La PR en brouillon a pour base `doc/uix-10-charte-commune` : elle ne montre que le plan court. GitHub la reporte sur `main` quand #206 est fusionnée et que sa branche est supprimée.

## Prompt de reprise

```text
Tu reprends UIX-10a (source de la charte, générateur et guide), première fonction d'UIX-10, exception hors chantier
accordée par le chef le 18 nov., sur la branche feat/uix-10a-source-charte (empilée sur doc/uix-10-charte-commune, PR #206),
dans ..\travaux-planner\uix-10a-source-charte. Pas de fiche de mission : le chef a autorisé le travail sans elle, le 18 nov.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, le plan d'ensemble docs/conception/interface/uix-10-charte-commune.md,
le plan court docs/conception/interface/uix-10a-source-charte.md et cette fiche
(docs/sessions/2026-11-18-feat-uix-10a-source-charte.md).
Fait : plan court commité (18fc230b) ; questions 1 à 6 répondues par le chef, chaque proposition retenue
(import simple du JSON ; statuts, lignes et panneau en 10b ; version entière et SHA-256 de 12 caractères ;
CI dans la tâche « Build Frontend », et shared/charte/** qui déclenche vitrine.yml ; police commune pour le site ;
sorties StudyLib et quiz en 10f et 10g).
Reste : vérifier que la ligne « Validé » du plan court est remplie par le coordinateur, sinon s'arrêter et le demander ;
puis coder selon le § 9 du plan court ; si #206 est fusionnée, rebaser sur origin/main d'abord.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; StudyLib et ClassQuiz non touchés ;
fiche de session à jour en fin de session ; suivi.md non modifié ; jamais de git push.
```
