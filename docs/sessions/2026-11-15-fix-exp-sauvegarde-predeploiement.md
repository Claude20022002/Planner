# Session du 2026-11-15 · REL-01 · `fix/exp-sauvegarde-predeploiement`

| | |
|---|---|
| Fait par | Cursor Grok 4.6 |
| Chantier | hors chantier (correctif EXP, accord du 15 nov.) |
| Dossier de travail | `..\travaux-planner\exp-sauvegarde-predeploiement` |
| Dernier commit | voir `git log -1` |

## Objectif de la session

Un `mysqldump` ou un `gzip` qui échoue doit arrêter `deployer.sh` avant la mise en place des images (constat REL-01).

## Plan

[plan-sauvegarde-predeploiement.md](../conception/exploitation/plan-sauvegarde-predeploiement.md), validé par Claude20022002 le 15 novembre.

## Fait

- Fusion de `origin/main` (pas de rebase).
- Plan : ligne Validé et réponses du § 3 (hors chantier ; harnais existant ; REL-03 ailleurs).
- `sauvegarder_base` : `PIPESTATUS`, `gzip -t`, dump non vide, fichier retiré en cas d'échec.
- `deployer.sh` : `|| exit 1` après la sauvegarde.
- Tests REL-01 dans `tester-deployer.sh`. `SAUVEGARDES_DIR` pour ne pas écrire dans `/root` pendant les tests.

## Vérifié

- `bash deploy/vps/tests/tester-deployer.sh` : **tous les tests passent** (dont mysqldump échoué, dump vide, dump réussi).
- `shellcheck` : absent de ce poste Windows ; la CI le lance (`ci-cd.yml`, job des scripts d'exploitation).

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1–3 | Rang, harnais, REL-03 | hors chantier ; oui ; non | réglé |

## État laissé

- `docs/plan/suivi.md` : ligne hors chantier #177, correctif commité en local
- Chantier EXP : inchangé (ce correctif n'y est pas)

## Reste à faire, dans l'ordre

1. Le chef pousse la branche (PR #177 déjà ouverte).
2. Le coordinateur relit. REL-03 dans une autre PR.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\exp-sauvegarde-predeploiement" push
```

La PR existe : https://github.com/Claude20022002/Planner/pull/177

## Prompt de reprise

```text
Tu reprends le correctif REL-01 (sauvegarde avant déploiement), hors chantier EXP.
Branche : fix/exp-sauvegarde-predeploiement, dossier ..\travaux-planner\exp-sauvegarde-predeploiement, PR #177.
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/conception/exploitation/plan-sauvegarde-predeploiement.md et cette fiche.
Fait : plan validé, PIPESTATUS et gzip -t, || exit 1, tests deployer verts.
Reste : push par le chef, relecture du coordinateur. Pas de rebase. Pas de git push par l'agent.
Ne pas traiter REL-03 ici. Aucune commande serveur.
```
