# Session du 2026-11-26 · VIT-20f · `feat/vit-20f-logos-modules`

Fait par Codex dans `..\travaux-planner\vit-20f-logos-modules`.

## Travail et vérifications

Après la fusion de #277 (`0c568ecb`), intégration locale de `origin/main` (`9dbc202f`) et révision du [plan VIT-20f](../conception/vitrine/vit-20f-logos-modules.md) (`734e6ee7`). Le plan couvre Présences, Espace de cours, les autres associations du registre et le rayon de la place réservée. Les en-têtes et ouvertures relèvent de VIT-23.

Les 17 SVG attendus ont un cadre de 96 × 96 et un rayon de 19,5. Suite unitaire de référence après installation des dépendances verrouillées : 162 réussites, 1 test ignoré, 0 échec. Les vérifications de rendu, d’accessibilité et de poids sont prévues après l’implémentation.

## État laissé

Plan révisé soumis au coordinateur. Le visa reste à obtenir avant le code et les tests de régression.

## Commandes pour le chef

Après code et vérifications :

```powershell
git -C "..\travaux-planner\vit-20f-logos-modules" push -u origin feat/vit-20f-logos-modules
gh pr create --base main --head feat/vit-20f-logos-modules --title "VIT-20f : brancher les logos officiels" --fill
```

## Prompt de reprise

```text
Reprends VIT-20f dans ..\travaux-planner\vit-20f-logos-modules. Lis AGENTS.md,
la fiche docs/plan/missions/vit-20-equipe.md et le plan révisé au commit 734e6ee7.
Attends le visa du coordinateur, puis implémente et vérifie le plan dans son périmètre.
Le chef pousse. Après VIT-20f, reprends QJE-03 avec le visa déjà vérifié sur #280.
```
