# Session du 28 novembre 2026 · VIT-24 · points d’accroche pour VIT-25

| | |
|---|---|
| Fait par | Codex |
| Branche | `feat/vit-24-finitions-modules` |
| Dossier de travail | `..\travaux-planner\vit-24-finitions-modules` |
| Tête avant la livraison | `70d326da` |
| Dernier commit du plan | `1cdfc984` |

## Objectif

Consigner la répartition des composants entre VIT-24 et VIT-25 avant le visa du chef, conformément à la fiche de mission complétée par le coordinateur le 28 novembre.

## Fait et vérifié

- `1cdfc984` ajoute la convention au § 4.3 du [plan VIT-24](../conception/vitrine/vit-24-finitions-modules.md). VIT-24 prévoit les emplacements `actions`, `guide` et `faq`, la propriété facultative `guide` pour le bouton `#guide`, et le cas de rendu avec les emplacements vides. VIT-25 fournira le contenu et le libellé à partir de ses pages.
- Relecture croisée de la mission et du plan VIT-25 à `0a5ce400`. Le plan fixe la conservation du contenu par défaut des pages existantes et la position de la FAQ avant la fin de page.
- Le diff de plan fait 10 lignes ajoutées. `git diff --check` est conforme. Le test de rendu relève de l’implémentation après le visa du chef. Aucun test applicatif lancé pour cet ajout documentaire.

## État laissé

Plan VIT-24 complété, bundle incrémental prêt pour import et relecture. Le chef doit viser les questions 1 à 4 et le périmètre avec la planche `captures-vit-24\index.html`. Le coordinateur a retenu la proposition de recette arabe de la question 5.

## Import et publication

Depuis le dossier `vit-24-finitions-modules`, avec `HEAD` sur `70d326da` et l’index vide de changements. Les documents sont déjà présents sur disque.

```powershell
git bundle verify "..\vit-24-livraison\vit-24-points-accroche.bundle"
if ($LASTEXITCODE -eq 0) {
    git fetch "..\vit-24-livraison\vit-24-points-accroche.bundle" refs/heads/feat/vit-24-finitions-modules
    if ($LASTEXITCODE -eq 0) {
        git merge-base --is-ancestor HEAD FETCH_HEAD
        if ($LASTEXITCODE -eq 0) {
            git reset --mixed FETCH_HEAD
            git status --short --branch
        }
    }
}
```

Après import et relecture, commandes de publication pour le chef depuis le dépôt principal.

```powershell
git -C "..\travaux-planner\vit-24-finitions-modules" push -u origin feat/vit-24-finitions-modules
gh pr create --draft --base main --head feat/vit-24-finitions-modules --title "VIT-24 · Plan des finitions du catalogue" --fill
```

## Prompt de reprise

```text
Reprends VIT-24 sur feat/vit-24-finitions-modules dans ..\travaux-planner\vit-24-finitions-modules.
Lis AGENTS.md, le plan VIT-24, la mission à jour sur doc/coordination-2026-11-27-suite et cette fiche.
Importe le bundle vit-24-points-accroche.bundle depuis 70d326da avec le coordinateur.
Le § 4.3 définit les trois emplacements et la propriété guide pour VIT-25, avec un cas de rendu.
Présente le plan et la planche au chef pour le visa des questions 1 à 4. La recette arabe de Q5
a été retenue par le coordinateur. Consigne le visa avant tout code. Après validation, réaliser
les finitions et la recette de VIT-24, puis transmettre les points d’accroche pour VIT-25.
```
