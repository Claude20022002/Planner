# Mission · UIX-10a · source de la charte, générateur, contrôle de CI, jetons du site générés, guide

| | |
|---|---|
| État | **close le 2026-11-18** : #207 fusionnée, relue après coup (conforme) |
| Agent | Claude (VS Code), la session qui a écrit le plan d'UIX-10 |
| Modèle recommandé | celui de la session (Opus 5.5 ou Fable 5.2). On ne change pas de modèle en cours de session |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. (« plan court d'UIX-10a », branche empilée) |
| Module et chantier | [UIX](../modules/UIX-interface.md) · exception hors chantier d'UIX-10, accordée par le chef le 18 nov. |
| Fonction | UIX-10a : `shared/charte/` (source `jetons.json`, `index.js`, `generer.mjs` et `--verifier`, `contraste.mjs`, guide `README.md` généré, tests) ; `vitrine/src/styles/jetons.css` généré ; contrôle en CI · taille M |
| Branche | `feat/uix-10a-source-charte`, **empilée sur `doc/uix-10-charte-commune`** (#206, non fusionnée), sur décision du chef. Elle se remet sur `main` dès la fusion de #206 |
| Dossier de travail | `..\travaux-planner\uix-10a-source-charte` (nom réel, gardé) |
| Plan de conception | plan d'UIX-10 (#206, validé par le chef le 18 nov.), § 4.1, § 4.2, § 5 (lignes 10a) et § 8 ; plan court à écrire : `docs/conception/interface/uix-10a-source-charte.md` · **validé par le coordinateur** (M, sans migration, sécurité, donnée de mineur ni choix de produit) |

## D'abord : corriger le plan d'UIX-10 sur #206 (décision du chef, 18 nov.)

**UIX-10g est retirée.** ClassQuiz ne reçoit pas la charte : il disparaît avec QJE-06 ([sortie-classquiz](sortie-classquiz.md)). Le Studio quiz, qui fait partie de l'application web, prend la charte avec UIX-10b, et l'accent « jeu » avec UIX-10e. Sur `doc/uix-10-charte-commune`, en un commit, avant le plan court :
- § 3 : les questions 9 et 10 sont marquées « sans objet : ClassQuiz est retiré (chef, 18 nov.) » ;
- § 4.1 et le schéma : pas de sortie `--quiz`. Le générateur ne garde que `--studylib`, et UIX-10f attend l'étude StudyLib ([etude-studylib](etude-studylib.md)) ;
- § 4.5, § 5 et § 9 : la ligne UIX-10g sort. UIX-10b et UIX-10e nomment le Studio quiz (`frontend/src/components/studio/`) ;
- § 9, ligne UIX-10f : « après la décision de l'étude StudyLib ».

## Critère de « terminé » d'UIX-10a

- `shared/charte/jetons.json` est la seule source. `node shared/charte/generer.mjs` réécrit `vitrine/src/styles/jetons.css` et `shared/charte/README.md`, sans aucune différence de rendu pour le site (mêmes noms et mêmes valeurs qu'aujourd'hui, vérifiés par un test).
- `generer.mjs --verifier` sort en erreur si une sortie n'est pas à jour, et la CI l'appelle.
- Chaque paire texte et fond déclarée atteint son seuil AA, en clair et en sombre, et un test le prouve.
- Le site se construit comme avant (build, tests, Lighthouse et axe-core inchangés), et `node scripts/verifier-neutre.mjs` passe.
- Aucune autre plateforme ne change dans cette fonction.

## Périmètre d'écriture

L'agent peut écrire :
- `shared/charte/` (tous les fichiers de la ligne 10a du § 5) ;
- `vitrine/src/styles/jetons.css`, qui devient généré ;
- `.github/workflows/ci-cd.yml` et `.github/workflows/vitrine.yml`, pour l'appel à `--verifier` et le déclenchement par `shared/charte/**` seulement (+5 lignes environ) ;
- le plan d'UIX-10 sur `doc/uix-10-charte-commune` (la correction ci-dessus), son plan court, `docs/plan/modules/UIX-interface.md` et sa fiche de session.

L'agent ne touche pas :
- à **`docs/plan/suivi.md`**, que tient le coordinateur ;
- à `frontend/`, `mobile/`, `shared/design-tokens.json`, `shared/tokens.js` ni `shared/couleurs.js` : c'est UIX-10b ;
- aux dépôts voisins (`--studylib` s'écrit et se teste sur un dossier temporaire, sans écrire dans `..\StudyLib`) ;
- aux fichiers d'UIX-06b (#199) et d'UIX-09, tenus par Codex.

**À savoir** : Codex modifiera plus tard `vitrine.yml` pour VIT-06, et l'audit de `vitrine/` du 27 nov. le modifiera aussi. Garde ton changement court et isolé, pour que la fusion reste simple.

## Prompt à donner à l'agent

```text
Le chef a choisi : plan court d'UIX-10a, branche empilée. Ta fiche : docs/plan/missions/uix-10a-source-charte.md,
sur la branche doc/coordination-equipe (..\travaux-planner\coordination-equipe). Lis-la en entier.
1) D'abord, sur doc/uix-10-charte-commune (#206), corrige le plan d'UIX-10 comme le dit la fiche : UIX-10g est retirée
   (ClassQuiz disparaît avec QJE-06, décision du chef du 18 nov.), plus de sortie --quiz, le Studio quiz dans 10b et 10e,
   10f après l'étude StudyLib. Un commit, seul.
2) dossier ..\travaux-planner\uix-10a-source-charte (déjà créé)
3) Écris le plan court docs/conception/interface/uix-10a-source-charte.md (modèle docs/plan/modeles/conception.md),
   commite-le seul, et dis au chef qu'il est prêt : le coordinateur le valide (M). Aucun code avant ce visa.
Ne modifie pas docs/plan/suivi.md. Fiche de session à jour ; tout est commité ; jamais de git push.
Ensuite, l'étude StudyLib (docs/plan/missions/etude-studylib.md) reste ta mission suivante.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 13 h 55 | fiche écrite ; décision du chef : UIX-10g retirée | — |
| 2026-11-18 15 h 15 | correction d'UIX-10g faite sur #206 (`162ba4c4`) et dans le plan court (`4dc4f070`) ; **visa du coordinateur** : M, sans migration ni sécurité, aucun écran ne change, `--verifier` en CI ; seul écart admis : le repli `Inter` de la police | **validé** |
| 2026-11-18 17 h 05 | #207 fusionnée à 16 h 14 (`5f053ebf`), relue après coup : périmètre tenu, plan suivi, 7 tests de la charte, `--verifier` et `verifier-neutre` relancés par le coordinateur, CI de `main` verte. Écart signalé : la ligne UIX-10 du module dit encore « PR à ouvrir » ; à corriger par UIX-10b | **conforme** ; mission close |
