# Session du 2026-11-22 · fusion des études · `doc/plan-parite-openeducat`

| | |
|---|---|
| Fait par | agent de Cursor (Auto) |
| Chantier | hors chantier (études à fusionner) |
| Dossier de travail | `..\travaux-planner\plan-parite-openeducat` |
| Dernier commit | voir `git log -1` |

## Objectif

Rendre #193 fusionnable après #234 et #169 (dernière de la file).

## Fait

| Résolution | Règle |
|---|---|
| `suivi.md` | version de `main` |
| `decisions.md` | toutes les lignes (parité 17 nov. + lignes de `main`) |
| `README.md` | EP-13 + EP-14 à EP-17 |
| modules MOB / UIX / VSC | les deux ajouts ; **VSC-13** = discipline (VSC-07 de la parité : numéro déjà pris sur `main` par l'affectation des groupes de langue) |

## Vérifié

- `verifier-neutre` : OK
- Étude / `parite-openeducat.md` non réécrits

## Commandes

```powershell
git -C "..\travaux-planner\plan-parite-openeducat" push origin doc/plan-parite-openeducat
gh pr merge 193 --auto --merge
```
