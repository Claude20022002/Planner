# Session du 18 novembre 2026 · VIT-11 · Catalogue et FAQ

Branche `feat/vit-11-catalogue-faq`, dossier `..\travaux-planner\vit-11-catalogue-faq`, agent Codex.

## Travail remis

Le plan court propose le registre par application, la vérification des preuves et les réponses
de la FAQ. Lues sur StudyLib à `a8349801f351e884cc9e2877a649b51825f7ff50`, les routes et les
sources couvrent ressources, cours, stages, projets, événements, recommandations et API mobile.
Le plan consigne aussi la dépendance à la connexion Planner et les décisions commerciales à prendre.
Le plan est soumis au chef. Le code attend la fusion de VIT-10.

## Commandes pour le chef

```powershell
git -C "..\travaux-planner\vit-11-catalogue-faq" push -u origin feat/vit-11-catalogue-faq
gh pr create --base main --head feat/vit-11-catalogue-faq --title "VIT-11 · Plan du catalogue et de la FAQ" --fill
```

## Prompt de reprise

Reprends VIT-11 sur `feat/vit-11-catalogue-faq`. Lis AGENTS.md, la boîte Codex et
`docs/conception/vitrine/vit-11-catalogue-faq.md`. Relève les validations du chef pour les choix
du catalogue, de StudyLib et de chaque réponse de FAQ. Attends la fusion de VIT-10 pour le code.
