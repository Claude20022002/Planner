# Session du 2026-11-27 · QJE-03 · `feat/qje-03-joueur-natif`

| | |
|---|---|
| Fait par | Codex |
| Chantier | Sortie de ClassQuiz, exception QJE |
| Dossier de travail | `..\travaux-planner\qje-03-joueur-natif` |
| Dernier commit de code | `92582bf1` |

## Objectif et plan

Reprendre QJE-03 selon la consigne du coordinateur pendant l’attente de la fusion de la PR #286. Le [plan du joueur natif](../conception/jeux/qje-03-joueur-natif.md) a été validé par le chef le 26 novembre sur `b10f9566`.

## Fait

- `932033bf` intègre `origin/main` (`fb821d24`) à la branche.
- `696c5c22` consigne les quatre réponses du chef dans un commit dédié avant le code.
- `92582bf1` permet de saisir un code du Studio dans le scanner même sans caméra, et résout les codes scannés ou saisis avec la même route. Le direct confirmé ouvre le joueur natif et le mode à son rythme confirmé ouvre le navigateur.
- Le joueur présente l’état de connexion. Après un échec d’envoi, une lecture complète vérifie si le serveur a enregistré la réponse avant de rouvrir la saisie. Le serveur confirme l’envoi et décide quand la question se ferme.

## Vérifié

- Jest mobile : 22 suites, 95 tests réussis. Les quatre tests du crochet couvrent l’accusé perdu avec ou sans réponse enregistrée, la question fermée et le refus de groupe.
- Lint Expo : 0 erreur, 3 avertissements sur les usages existants d’i18next.
- Export Android : 1 bundle de 5,5 Mo, 2 100 modules, 82 ressources.
- `node scripts/verifier-neutre.mjs` et contrôle du diff réussis.
- Le dossier mobile ne contient pas de `tsconfig.json`. `tsc --noEmit` affiche son aide sans vérifier de projet.
- La recette native, les mesures Slow 3G et la vérification inter-écoles restent à faire avec le chef. Le serveur et le parcours web du direct n’ont pas été relancés lors de ces contrôles mobiles.

## État laissé

- QJE-03 : code et tests locaux prêts pour relecture. La PR #280 existe en brouillon.
- La mise à jour de la fiche du module attend la fusion de #292, qui scinde QJE. Le coordinateur tient `suivi.md`.
- VIT-24 reste en attente de la fusion de la PR #286 lors du relevé.

## Commande pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-03-joueur-natif" push -u origin feat/qje-03-joueur-natif
```

## Prompt de reprise

```text
Reprends QJE-03 dans ..\travaux-planner\qje-03-joueur-natif sur feat/qje-03-joueur-natif.
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, docs/conception/jeux/qje-03-joueur-natif.md
et docs/sessions/2026-11-27-feat-qje-03-joueur-natif.md.
Le visa du chef est dans 696c5c22. Le code est dans 92582bf1. Les 95 tests mobiles sont verts.
Fais relire la branche et vérifie la CI de #280. Le chef mène la recette Android du § 8
du plan avec des comptes fictifs, puis iOS si disponible. Après #292, consigne les résultats dans la fiche du module.
Ne modifie pas suivi.md. Le chef pousse et valide la recette.
```
