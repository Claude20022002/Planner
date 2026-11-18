# Mission · QJE-01, QJE-03 et QJE-06 · sortie de ClassQuiz au profit du Studio quiz

| | |
|---|---|
| État | ouverte : plans à écrire, une fonction après l'autre |
| Agent | **QJE-01** : agent de Cursor, sur Grok 4.7 high (tâche bornée), dès le 18 nov. à 13 h 44. **QJE-03 et QJE-06** : Codex, sur son modèle le plus fort, après VIT-06 (les modèles Claude ne sont pas dans le forfait Cursor du chef) |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. (« exception, maintenant »), suite de sa décision du 20 oct. (« sortir de ClassQuiz au profit du Studio quiz ») |
| Module et chantier | [QJE](../modules/QJE-quiz-jeux-ia.md) · **exception hors chantier** accordée par le chef le 18 nov. ; EXP, PLA et MOT restent les trois chantiers ouverts |
| Fonctions | dans cet ordre : **QJE-01**, l'entrée « Quiz » ouvre le Studio et non plus ClassQuiz (`shared/espaces.js`), taille S ; **QJE-03**, un joueur natif dans l'application, taille M ; **QJE-06**, plus aucun conteneur ClassQuiz, taille M |
| Branches | `feat/qje-01-entree-studio`, `feat/qje-03-joueur-natif`, `feat/qje-06-sortie-classquiz`, chacune depuis `origin/main` |
| Plans | un plan court par fonction, dans `docs/conception/jeux/`. QJE-01 est validé par le coordinateur (S, sans migration ni sécurité). **QJE-03 et QJE-06 sont validés par le chef** : QJE-03 est un choix de produit, QJE-06 touche le serveur et les données |

## Ce qui existe

- Le **Studio quiz** de Planner : éditeur, quiz en direct (`frontend/src/components/studio/`), et import depuis ClassQuiz (`studio/ImporterClassQuiz.jsx`).
- **ClassQuiz** tourne encore : `quiz-api`, `quiz-worker`, `quiz-frontend`, `quiz-db` (PostgreSQL) et `quiz-meilisearch` dans `docker-compose.yml`. Planner lui fournit l'identité par OIDC (`services/oidc/provider.js`, canal I-9 de l'audit d'isolation).
- Archive du plan : [sortie de ClassQuiz](../../archives/plans/sortie-classquiz.md). À lire en premier.

## La condition de QJE-06

**Les quiz que l'école pilote a déjà faits dans ClassQuiz sont transférés dans le Studio, et le chef a vérifié ce transfert, avant l'arrêt des conteneurs.** Le plan de QJE-06 dit :
- comment le transfert se fait, et comment on compte qu'il est complet ;
- ce qu'on garde de la base `quiz-db` (une sauvegarde chiffrée, combien de temps) ;
- comment on revient en arrière ;
- ce qui sort de Planner : client OIDC de ClassQuiz, interrupteur `classquiz_actif`, `preparer-maj.sh --classquiz` et `--quiz-seul`.

## Périmètre d'écriture

À fixer dans chaque plan court, puis à vérifier par le coordinateur. Dans tous les cas, l'agent ne touche pas à **`docs/plan/suivi.md`**, que tient le coordinateur.

## Prompt pour QJE-01 (déposé dans la boîte de l'agent de Cursor à 13 h 44)

```text
Ta mission suivante : QJE-01, première étape de la sortie de ClassQuiz (exception hors chantier accordée par le chef le 18 nov.).
Grok 4.7 high convient : la tâche est courte et bornée. Lis AGENTS.md, la fiche docs/plan/missions/sortie-classquiz.md
(branche doc/coordination-equipe, ..\travaux-planner\coordination-equipe), puis docs/archives/plans/sortie-classquiz.md.
git worktree add "..\travaux-planner\qje-01-entree-studio" -b feat/qje-01-entree-studio origin/main
Écris le plan court (docs/conception/jeux/qje-01-entree-studio.md) : l'entrée « Quiz » ouvre le Studio, plus ClassQuiz.
Commite-le seul et dépose « plan prêt, sha … » dans sortie\ : le coordinateur le valide. Pose tes questions avant toute supposition.
Ne modifie pas docs/plan/suivi.md. Jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 13 h 40 | fiche écrite, sur décision du chef | — |
