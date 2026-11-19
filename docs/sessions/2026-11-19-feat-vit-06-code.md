# Session du 19 novembre 2026 · VIT-06 · `feat/vit-06-code`

| | |
|---|---|
| Fait par | Codex |
| Chantier | EXP · site vitrine |
| Dossier de travail | `..\travaux-planner\vit-06-code` |
| Correctif CI | `c694fc25` |

## Objectif

Rétablir la recette Compose sur la PR #221, intégrer `main`, tenir à jour les conditions de mise en ligne et définir la durée paramétrable des journaux d’accès.

## Fait

- `6c333416` intègre `origin/main` à `d27e30ee`. Le seul conflit était dans le module VIT. Les lignes sur l’image de mise en ligne et les pages par rôle sont toutes deux conservées.
- `daf4228d` consolide les douze conditions dans le [plan](../conception/exploitation/vit-06-mise-en-ligne.md#conditions-et-recette-du-chef), le module et le guide de déploiement. Les deux ajouts portent sur le contact publié et sur la stabilité et le score de performance mobile de l’accueil.
- `a12b7f2e` propose le correctif CI et la rétention, puis `3f7e2dbd` consigne la validation du chef.
- `c694fc25` fournit le fichier fictif attendu par le service backend pendant l’étape CI, retire le lien à la sortie et affiche la version de Compose.

## Vérifié

- Le [run du 18 novembre](https://github.com/Claude20022002/Planner/actions/runs/44402771956/job/135149922347) échoue avant d’afficher `caddy`. Les trois commandes passent déjà `--no-env-resolution`. Le journal ne permet pas de distinguer les deux premiers appels et ne donne pas la version de Compose.
- Sur une archive de la branche sans `.env.docker`, Compose v5.6.1 passe avec et sans le correctif. Sur le bloc corrigé, les assertions des profils désactivé et actif réussissent. Un échec forcé confirme le nettoyage. Un fichier préexistant est préservé. `actionlint` 1.7.12 réussit.
- 76 tests unitaires passent, 49 pages Astro sont compilées et le contrôle de neutralité passe. L’image locale passe `nginx -t`, la recette HTTP (dont neuf médias) et la recette Chromium sur les 49 pages, avec lecture des trois vidéos.

## État et reprise

La PR #221 attend le push du chef et la confirmation du runner GitHub. Les résultats ci-dessus couvrent le checkout et l’image locaux.
Le chef a validé l’approche de rétention. Pour la mettre en œuvre, obtenir la sortie des journaux d’accès Traefik et ses montages, ainsi que la portée autorisée si cette sortie est partagée. La valeur de `VITRINE_JOURNAUX_JOURS` est fixée par le chef dans VIT-12.
La consigne du coordinateur place ensuite VIT-11, puis VIT-15. Le code de VIT-11 s’appuie sur VIT-10 fusionnée et demande un complément au plan pour le méga-menu. La suite de DOC-03 attend le chef.

## Commandes pour le chef depuis le dépôt principal

```powershell
git -C "..\travaux-planner\vit-06-code" push origin feat/vit-06-code
gh pr checks 221 --watch --repo Claude20022002/Planner
```

## Prompt de reprise

```text
Reprends VIT-06 sur feat/vit-06-code dans ..\travaux-planner\vit-06-code.
Lis AGENTS.md, le complément du 19 novembre dans le plan VIT-06 et cette fiche.
Vérifie sur #221 que la recette Compose et l’image Nginx passent après le push du chef.
Obtiens la sortie des accès Traefik, ses montages et le périmètre validé, puis
programme la rétention paramétrée dans deploy/ avec la durée décidée dans VIT-12.
Après VIT-06, ouvre une session VIT-11 pour le catalogue, la FAQ et le méga-menu
selon la feuille de route. Le coordinateur tient suivi.md. Le chef pousse et déploie.
```
