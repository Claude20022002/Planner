# Session du 2026-11-27 · QJE-15 · `feat/qje-15-jeux-par-niveau`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-15-jeux-par-niveau` |
| Dernier commit | `6cea20bf` pour le catalogue ; cette fiche le suit |

## Objectif de la session

Lire la boîte. Écrire le visa du § 7 d'audit, sans monter Astro. Puis le catalogue de QJE-15, sans écran.

## Plan

[docs/conception/jeux/qje-15-jeux-par-niveau.md](../conception/jeux/qje-15-jeux-par-niveau.md) · étape 2. Questions 1 et 2 visées. Questions 5 et 6 en attente du chef, sur la planche.

## Fait

- Messages lus : `2026-11-27-1551-audit-vitrine-valide.md`, puis `2026-11-27-1558-qje-15-catalogue.md`.
- Audit, branche `fix/audit-vitrine` : `95f66923` le visa dans le § 7 ; `15ba51c6` la fiche. Versions `astro` 7.4.12 et `@astrojs/react` 7.1.9 à partir de 19 h 02 UTC. Aucun code.
- QJE-15 : la branche distante avait déjà fusionné `origin/main` (`6eb9d44c`, parents `15226e1a` et `fb821d24`). Avance rapide jusque-là, puis `git merge origin/main` : déjà à jour.
- `6cea20bf` — `CYCLES`, `DOMAINES`, `cycles` et `domaine` sur les onze jeux, `rangerJeux`, et `backend/tests/utils/rangementJeux.test.js`.
- `suivi.md` n'est pas modifié. `docs/plan/modules/QJE-quiz-jeux-ia.md` non plus : #292 n'est pas sur `origin/main`, et ce fichier devient un renvoi.

## Vérifié

Sans `rangerJeux` : `rangementJeux.test.js` ne démarre pas. `SyntaxError: The requested module '../../../shared/jeux/catalogue.js' does not provide an export named 'CYCLES'`. 1 suite en échec, 0 test.

Avec le catalogue :

- `rangementJeux.test.js` : 1 suite, 4 tests, tous verts.
- `simulations.test.js` lancé avec lui : 2 suites, 90 tests, tous verts. L'ordre de `SIMULATIONS` n'a pas bougé.
- `node scripts/verifier-neutre.mjs` : « Aucun nom d'école écrit en dur » (7 exceptions justifiées).

Pas d'écran, pas d'axe-core, pas de parcours `sessionsJeu` : ils attendent la planche et #229.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quels cycles, et dans quel ordre ? | collège, lycée, supérieur, formation professionnelle | visée |
| 2 | Le classement des onze jeux | tableau du § 4, tel quel | visée |
| 5 | Les accroches | onze phrases du § 4 bis | en attente du chef, sur la planche |
| 6 | La voie d'image | vue, Codex, ou banque libre | en attente du chef, sur la planche |

## Écarts

- Les titres anglais des quatre cycles ne sont pas dans le plan. Le catalogue n'a que le français. L'anglais est prévu avec les traductions des écrans.
- Un code absent de la liste de rang passe après les jeux du tableau. Les onze codes y sont.
- La ligne du module n'est pas mise à jour : `JEU-jeux-pedagogiques.md` n'existe pas encore sur `origin/main`.

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-15 → catalogue `shared/` en place (`6cea20bf`) ; écrans après la planche et #229
- `fix-audit-vitrine` → § 7 validé ; code à partir de 19 h 02 UTC. La branche est derrière `origin/main` de 4 commits.

## Reste à faire, dans l'ordre

1. La planche hors dépôt, puis le visa des questions 5 et 6.
2. Les trois écrans, après ce visa et après #229.
3. À partir de 19 h 02 UTC, la montée d'Astro sur `fix/audit-vitrine`, quand le coordinateur relance.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-15-jeux-par-niveau" push
git -C "..\travaux-planner\fix-audit-vitrine" push -u origin fix/audit-vitrine
```

La PR #285 est ouverte. Le premier push envoie le catalogue. La PR d'audit peut attendre la montée.

## Prompt de reprise

```text
Tu reprends QJE-15 (jeux par niveau, puis par domaine), sur la branche
feat/qje-15-jeux-par-niveau, dans le dossier ..\travaux-planner\qje-15-jeux-par-niveau.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/jeux/qje-15-jeux-par-niveau.md
et cette fiche (docs/sessions/2026-11-27-feat-qje-15-jeux-par-niveau-4.md).
Fait : le catalogue shared est commité (6cea20bf). CYCLES, DOMAINES,
cycles et domaine sur les onze jeux, rangerJeux et son test.
4 tests verts, simulations.test.js vert (90 avec le rangement),
verifier-neutre.mjs vert. Aucun écran.
Les titres anglais des cycles ne sont pas dans le catalogue :
ils viennent avec les écrans. Le français est celui du plan.
#292 n'était pas sur origin/main : QJE-quiz-jeux-ia.md n'a pas été modifié.
La ligne QJE-15 ira dans JEU-jeux-pedagogiques.md après cette fusion.
Reste : la planche hors dépôt (..\travaux-planner\qje-15-planche\,
390 et 1440 px, web, mobile, site), puis les écrans après le visa
des questions 5 et 6 et après #229.
Questions en attente : 5 (accroches), 6 (voie d'image).
L'audit vitrine est sur fix/audit-vitrine, visa 95f66923 :
astro 7.4.12 et @astrojs/react 7.1.9, pas avant 19 h 02 UTC.
Règles : pas d'écran avant la planche ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
