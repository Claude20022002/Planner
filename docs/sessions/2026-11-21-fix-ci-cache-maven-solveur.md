# Session du 2026-11-21 · cache Maven image solveur · `fix/ci-cache-maven-solveur`

| | |
|---|---|
| Fait par | agent de Cursor (Auto) |
| Chantier | hors chantier (correctif CI) |
| Dossier de travail | `..\travaux-planner\ci-cache-maven-solveur` |
| Dernier commit | voir `git log -1` |

## Objectif de la session

Faire passer l'étape « Construire l'image du solveur » du job Parcours sans retélécharger Maven Central à chaque passage à froid (429 → « parent POM introuvable »).

## Plan

[fix-ci-cache-maven-solveur.md](../conception/exploitation/fix-ci-cache-maven-solveur.md) · validé par le chef le 21 nov.

## Fait

| Commit | Contenu |
|---|---|
| `1db616a8` | plan court seul |
| (code) | `solver/Dockerfile` : cache BuildKit `/root/.m2` + retries Maven ; `ci-cd.yml` : buildx + cache GHA pour `hestim-solver:parcours` |

## Vérifié

- `node scripts/verifier-neutre.mjs` : OK.
- Critère « Parcours vert » : à confirmer après push (CI).

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|

## État laissé

- Correctif prêt en local, non poussé.
- Spring Boot reste 4.1.2 ; `pom.xml` inchangé.
- #190 (étude) reste bloquée par la même CI tant que ce correctif n'est pas sur `main` (ou fusionné d'abord).

## Reste à faire, dans l'ordre

1. Le chef pousse, attend le job Parcours vert, fusionne.
2. Relancer ou rebase #190 si besoin.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\ci-cache-maven-solveur" push -u origin fix/ci-cache-maven-solveur
gh pr create --base main --head fix/ci-cache-maven-solveur --title "CI : cache Maven de l'image du solveur (parcours)" --body "Plan validé le 21 nov. Cache BuildKit + GHA pour éviter les 429 Maven Central au build Docker des parcours. pom.xml inchangé (Spring Boot 4.1.2)."
```

## Prompt de reprise

```text
Tu reprends fix/ci-cache-maven-solveur dans ..\travaux-planner\ci-cache-maven-solveur.
Plan : docs/conception/exploitation/fix-ci-cache-maven-solveur.md (validé).
Code fait : Dockerfile cache .m2, ci-cd.yml buildx+GHA pour hestim-solver:parcours.
Reste : push, CI Parcours verte, fusion. Jamais de git push. Pas de suivi.md.
```
