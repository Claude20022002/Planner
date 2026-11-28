# Session du 2026-11-26 · VIT-20f · `refactor/vit-20f-tuiles-catalogue`

| | |
|---|---|
| Fait par | Codex |
| Module | VIT |
| Dossier de travail | `..\travaux-planner\vit-20f-tuiles-catalogue` |
| Dernier commit de code | `49c60356` |

## Objectif et plan

Appliquer la composition validée par le chef aux grilles de l’accueil et du catalogue, avec le logo dans un carré clair et le nom en dessous. [Plan](../conception/vitrine/vit-20f-tuiles-catalogue.md).

## Fait

- `ed52a91d` intègre `origin/main`, dont VIT-23 (#282), sur la branche de retouche issue de VIT-20f (#284).
- `77f4efe4` consigne le plan validé par le chef avant le code.
- `49c60356` applique le gabarit compact aux deux grilles, contrôle son périmètre et documente le résultat.

## Vérifié

- Astro a construit 43 pages. 168 tests unitaires réussis, 1 ignoré, 0 échec. Les 77 tests de rendu et les 84 tests de menu et axe-core sont verts, ainsi que `verifier-neutre`.
- Chromium a vérifié huit combinaisons de page, langue et largeur. Deux colonnes et carrés de 64 px à 390 px, six colonnes et carrés de 76 px à 1 440 px. Les SVG mesurent respectivement 48 et 60 px. Les 17 tuiles, les cinq liens, les douze statuts et le focus clavier ont été vérifiés. Le parcours Entrée mène à Présences.
- Un débordement interne du catalogue et de l’accueil sur téléphone a été reproduit puis corrigé. Le parcours navigateur vérifie désormais que la grille entière tient dans la fenêtre.
- EP-19 passe. La page la plus lourde, `fr/index.html`, pèse 134,4 Ko sur le budget de 200 Ko.

Captures de section vérifiées hors dépôt dans `C:\Users\clusa\Desktop\Github Project\travaux-planner\captures-vit-20f-tuiles-catalogue\`.

- `accueil-390.png` et `accueil-1440.png`
- `catalogue-390.png` et `catalogue-1440.png`

## État laissé

La retouche est terminée en local. La PR des logos #284 fournit la base de la branche de retouche. Le chef publie la retouche vers `main` après la fusion de #284.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vit-20f-tuiles-catalogue" push -u origin refactor/vit-20f-tuiles-catalogue
gh pr create --base main --head refactor/vit-20f-tuiles-catalogue --title "VIT-20f : grilles d’applications compactes" --fill
```

## Prompt de reprise

```text
Reprends la retouche des grilles VIT-20f dans ..\travaux-planner\vit-20f-tuiles-catalogue.
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, le plan
docs/conception/vitrine/vit-20f-tuiles-catalogue.md et cette fiche.
Implémentation et contrôles terminés. Vérifie l’état de #284 et de la PR de la retouche.
Le chef assure la publication et la fusion.
```
