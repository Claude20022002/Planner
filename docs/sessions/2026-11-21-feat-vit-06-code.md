# Session du 21 novembre 2026 · VIT-06

Codex a travaillé sur `feat/vit-06-code` dans `..\travaux-planner\vit-06-code`, pour le chantier EXP.

## Intégration de main pour la PR #221

Le commit local `c67df5f2` intègre `origin/main` à `53561918`. Son autre parent est `7c8aac7d`. Le seul conflit concernait le module VIT. Les deux entrées décrivant l’image Nginx et les logos VIT-09a sont conservées. Le [plan de mise en ligne](../conception/exploitation/vit-06-mise-en-ligne.md) reste la référence.

## Vérifications locales

| Contrôle | Résultat |
|---|---|
| Tests unitaires de la vitrine | 93 réussis sur 93 |
| Construction Astro | 52 pages |
| `verifier-neutre.mjs` | réussi |
| `nginx -t` dans l’image reconstruite avec ces pages | configuration valide |

## État et commandes pour le chef

La PR #221 est ouverte. La consigne de 00 h 35 place #228 avant #221. Au relevé GitHub de cette session, #228 est encore ouverte. Le chef pousse la branche puis vérifie la CI avant la fusion selon cet ordre. Le coordinateur tient le suivi. VIT-06b attend la durée fixée dans VIT-12 et le relevé Traefik du VPS.

```powershell
git -C "..\travaux-planner\vit-06-code" push origin feat/vit-06-code
gh pr checks 221 --watch --repo Claude20022002/Planner
```

## Prompt de reprise

Reprends VIT-11 dans une nouvelle session sur `feat/vit-11-catalogue-faq`. Lis la mission et la dernière fiche VIT-11, intègre `origin/main`, puis soumets au chef le complément de plan du méga-menu « Fonctions ». Précise son fonctionnement sans JavaScript et son poids au chargement (EP-18). Attends la validation du chef avant de coder le méga-menu.
