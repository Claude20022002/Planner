# Session du 21 novembre 2026 · VIT-11 · Vérification HTTP de l’image

Branche `feat/vit-11-catalogue-faq`, dans `..\travaux-planner\vit-11-catalogue-faq`. Codex reprend la [recette après #237](2026-11-21-feat-vit-11-catalogue-faq-3.md) sur la PR #236.

Le push du chef a publié `eacae132`. Le [journal du contrôle vitrine](https://github.com/Claude20022002/Planner/actions/runs/44948679488/job/136981558332) montre que l’image est construite et que Nginx renvoie 404 sur `/ar/`. Le vérificateur attendait encore 200. Le chef a autorisé la correction ciblée de ce test sur VIT-11.

Le commit `115cae5a` déplace `/ar/` dans la liste des réponses 404. Les routes `/`, `/fr/`, `/en/` et `/fr/index.html` restent contrôlées en 200. Le contrôle inclut les en-têtes des réponses dans les deux cas.

## Vérification locale

La syntaxe Node et la construction Docker passent. Le vérificateur complet passe sur le conteneur Nginx du build VIT-11 en boucle locale. Le volet HTTP couvre les routes, les en-têtes, robots.txt, le script versionné et neuf ressources image ou vidéo. Chromium parcourt 39 pages, vérifie le menu mobile et les animations et lit deux vidéos.

## Commandes pour le chef

```powershell
git -C "..\travaux-planner\vit-11-catalogue-faq" push origin feat/vit-11-catalogue-faq
gh pr checks 236 --watch
```

## Prompt de reprise

Reprends VIT-11 sur la PR #236. Le test de l’image Nginx a été corrigé dans `115cae5a` et passe en local. Vérifie que la CI de la PR inclut ce correctif après le push du chef, puis transmets le résultat au coordinateur.
