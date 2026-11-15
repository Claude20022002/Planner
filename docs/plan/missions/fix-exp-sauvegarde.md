# Mission · correctif EXP · Sauvegarde avant déploiement qui échoue sans bruit

| | |
|---|---|
| État | ouverte, **après EXP-02a** pour le même agent |
| Agent | agent de Cursor |
| Modèle recommandé | un modèle de raisonnement moyen suffit (Claude Sonnet 5.5 dans Cursor, ou l'équivalent) : correctif Bash court, bien borné, avec son test |
| Attribuée le | 2026-11-15, par le coordinateur, par délégation du chef |
| Module et chantier | [EXP](../modules/EXP-exploitation.md) · correctif hors chantier (décision du 15 novembre) |
| Fonction | `deployer.sh` continue vers les migrations quand la sauvegarde de la base échoue (constat REL-01 de l'audit du 15 novembre) |
| Branche | `fix/exp-sauvegarde-predeploiement`, PR #177 (déjà poussée : pas de rebase ; un commit, le plan court) |
| Dossier de travail | `..\travaux-planner\exp-sauvegarde-predeploiement` (à créer sur la branche existante) |
| Plan | `docs/conception/exploitation/plan-sauvegarde-predeploiement.md` · **validé par le coordinateur le 2026-11-15, par délégation du chef** |

## Critère de « terminé »

Celui du § 1 du plan : un `mysqldump` ou un `gzip` qui échoue arrête `deployer.sh` avant la mise en place des images ; aucun fichier de sauvegarde vide ou illisible ne reste ; un test de régression le prouve ; `shellcheck` de la CI passe.

## Périmètre d'écriture

- `deploy/vps/deploiement-commun.sh` (fonction `sauvegarder_base`)
- `deploy/vps/deployer.sh` (ligne de l'appel)
- `deploy/vps/tests/tester-deployer.sh`
- le plan (ligne « Validé » et réponses du § 3), une ligne « correctif » dans les travaux hors chantier de `docs/plan/suivi.md`, sa fiche de session

Ne touche pas : `deploy/vps/docker-compose.vps.yml` et `DEPLOIEMENT.md` (mission EXP-02a), tout autre script, le serveur.

## Ce qui est déjà décidé (réponses du § 3)

1. Correctif hors chantier, rangé avec les autres travaux hors chantier de `suivi.md`.
2. Lire `tester-deployer.sh` et suivre son style.
3. Non : purge et chiffrement des vieux dumps (REL-03) dans une autre PR.

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission (après EXP-02a) : le correctif de la PR #177, sauvegarde avant
déploiement qui échoue sans bruit.
Choisis d'abord le modèle : ta fiche recommande un modèle de raisonnement moyen. Si tu ne tournes pas
sur un modèle adapté, dis au chef lequel choisir avant de commencer, et note ton modèle dans ta fiche de session.
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, ta fiche de mission
docs/plan/missions/fix-exp-sauvegarde.md, puis le plan
docs/conception/exploitation/plan-sauvegarde-predeploiement.md (sur la branche).
Crée le dossier : git worktree add ..\travaux-planner\exp-sauvegarde-predeploiement fix/exp-sauvegarde-predeploiement
(la branche existe et est poussée : fusionne origin/main dedans, jamais de rebase).
Le plan est validé par le coordinateur, par délégation du chef : écris la ligne « Validé » et les trois réponses
du § 3, commite-les seuls, puis code le § 4 et le test du § 6. Lance shellcheck -x sur les trois scripts.
Tu n'écris que dans le périmètre de la fiche ; aucune commande sur le serveur.
Règles : questions avant toute supposition ; fiche de session et suivi.md à jour ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | plan court lu (cause reproduite par son auteur en Bash pur) ; validé par délégation | — |
