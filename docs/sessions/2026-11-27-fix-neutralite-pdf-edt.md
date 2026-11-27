# Session du 2026-11-27 · Les emplois du temps réels hors du dépôt · `fix/neutralite-pdf-edt`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), le coordinateur, à la demande du chef (27 nov.) |
| Module | QUA · correctif de neutralité, sans chantier |
| Dossier de travail | `..\travaux-planner\fix-neutralite-pdf-edt`, depuis `origin/main` (`44870e1d`) |
| Plan | [docs/conception/qualite/fix-neutralite-pdf-edt.md](../conception/qualite/fix-neutralite-pdf-edt.md) (`05f74393`), validé par le chef |

## Fait

| Commit | Contenu |
|---|---|
| `05f74393` | le plan seul |
| `3f696f3a` | les deux PDF retirés (copie hors dépôt : `..\travaux-planner\hors-depot\`) ; YAML d'exemple et commentaire du modèle neutralisés ; renvois de `PRODUCT.md`, `docs/README.md`, `donneesIiia.mjs` ; `verifier-neutre.mjs` refuse les documents bureautiques hors liste justifiée |

## Vérifié

- `node scripts/verifier-neutre.mjs` : passe ; **échoue** quand un des deux PDF revient dans l'index (montré dans le dossier de la branche, puis retiré).
- Les deux modèles d'import (`docs/modeles/*.xlsx`) ne contiennent que des personnes fictives (lu).
- Plus aucun des noms relevés dans le dépôt, hors listes de noms courants des données fictives et `deploy/vps/demo/demo-enseignant.mjs` (au chef).

## Questions au chef

1. Effacer aussi les deux PDF de l'**historique git** (réécriture et poussée forcée) ? Proposition : oui, mais seulement quand aucune branche ouverte n'en dépend, en une opération préparée à part.
2. `deploy/vps/demo/demo-enseignant.mjs`, ligne 45 : un vrai nom par défaut. Proposition : un nom fictif, `DEMO_NOM` pour la vraie démonstration.
3. `docs/ecole/` (trois PDF du projet PACTE) et `docs/presentation/` (deux présentations au nom de l'école) : à garder dans le dépôt public ?

## Commandes pour le chef de projet

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
git -C "..\travaux-planner\fix-neutralite-pdf-edt" push -u origin fix/neutralite-pdf-edt
gh pr create --base main --head fix/neutralite-pdf-edt --title "Neutralité : les emplois du temps réels hors du dépôt" --fill
gh pr merge fix/neutralite-pdf-edt --merge --auto
```

## Prompt de reprise

```text
Correctif fix/neutralite-pdf-edt (dossier ..\travaux-planner\fix-neutralite-pdf-edt) : fait.
Restent au chef : l'historique git, demo-enseignant.mjs, docs/ecole/ et docs/presentation/ (fiche, « Questions au chef »).
```
