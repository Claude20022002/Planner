# Session du 2026-11-26 · VIT-20f · `feat/vit-20f-logos-modules`

| | |
|---|---|
| Fait par | Codex |
| Chantier | VIT |
| Dossier de travail | `..\travaux-planner\vit-20f-logos-modules` |
| Dernier commit de code | `f3875696` |

## Objectif et plan

Afficher les 17 logos officiels de la série B dans le catalogue et les cinq bandeaux de module. Le coordinateur a validé le [plan révisé](../conception/vitrine/vit-20f-logos-modules.md) (`734e6ee7`) le 26 novembre à 14 h 21, par délégation du chef.

## Fait

- `0aa87f1d` inscrit le visa dans le plan avant toute modification du code.
- `f3875696` associe les 17 logos au registre, dont `presences` et `cours`, règle le rayon de la place réservée à 19,5 et ajoute les tests.

## Vérifié

- Avant correction, les tests ont relevé les associations incomplètes et le rayon de 22 (deux échecs unitaires), ainsi que l’absence de logo officiel pour Présences dans les bandeaux et les tuiles en français et en anglais (quatre échecs de rendu).
- Après correction, 163 tests unitaires réussis, 1 ignoré, 0 échec. Astro a construit 43 pages. Les 36 tests de rendu sont verts et `verifier-neutre` passe.
- Axe-core ne signale aucune violation sur les 76 combinaisons de page et de largeur, menu Applications fermé et ouvert (77 tests réussis en comptant le test parent).
- EP-19 passe. La page la plus lourde, `fr/index.html`, pèse 119,3 Ko sous le plafond de 200 Ko.
- Le catalogue et Présences ont été examinés en français aux deux largeurs. Les 17 logos du catalogue et le logo du bandeau de Présences s’affichent, sans débordement horizontal.

Captures hors du dépôt, dans `C:\Users\clusa\Desktop\Github Project\travaux-planner\captures-vit-20f\`.

- Catalogue · `catalogue-390.png` et `catalogue-1440.png`
- Présences · `presences-390.png` et `presences-1440.png`

## État laissé

VIT-20f est prête à publier par le chef. La PR #282 (VIT-23) était encore ouverte au dernier contrôle.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vit-20f-logos-modules" push -u origin feat/vit-20f-logos-modules
gh pr create --base main --head feat/vit-20f-logos-modules --title "VIT-20f : brancher les logos officiels" --fill
```

## Prompt de reprise

```text
Reprends QJE-03 dans ..\travaux-planner\qje-03-joueur-natif, branche feat/qje-03-joueur-natif.
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, docs/conception/jeux/qje-03-joueur-natif.md
et la dernière fiche de session QJE-03. Le visa du chef a été vérifié sur la PR #280.
VIT-20f est prête à publier par le chef. Termine QJE-03 dans le périmètre de son plan.
```
