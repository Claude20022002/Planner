# Session de reprise du 2026-11-18 · VSC-01

| | |
|---|---|
| Fait par | Codex |
| Chantier | VSC-01 en conception, exception accordée par le chef |
| Dossier de travail | `..\travaux-planner\vsc-01-modele-scolaire` |
| Branche | `etude/vsc-01-modele-scolaire` |

## Fait et vérifié

- Boîte Codex lue au démarrage, sans message entrant. La PR #215 était ouverte à `c2487661`, sans avis des groupes A et B.
- Relecture statique sur `e82f0bf4` des clés et cascades, du filtre annuel, des chemins d’écriture des appartenances et du contrat de présence.
- Relecture de l’identité de session, du jeton consommé par StudyLib, des usages OIDC et ClassQuiz et du périmètre d’anonymisation.
- Points de revue ajoutés à la conception C-5 et à l’étude Q-20. Aucun changement de code ou de schéma. Contrôle des différences avec Git.

## Corrections demandées à 18 h 40

- `10ef19a2` restaure `docs/plan/suivi.md` depuis `origin/main`. Le fichier ne figure plus dans le diff de la PR.
- La conception C-5 décrit les parcours EP-18 et l’identifiant national facultatif selon le pays de l’école.
  La fiche VSC et le registre des décisions reprennent cette règle. Contrôle Git des différences passé.
- Le chef organise les avis des groupes A et B sur C-5 et Q-20.

## Suite

Le coordinateur organise la relecture par les groupes A et B. Le comportement du consommateur StudyLib
reste à confirmer avec son responsable. Les choix physiques de migration et les droits relèvent des plans
des futurs lots et de leur validation par le chef.

## Commande pour le chef

```powershell
git -C "..\travaux-planner\vsc-01-modele-scolaire" push origin etude/vsc-01-modele-scolaire
```

## Prompt de reprise

```text
Reprends VSC-01 sur etude/vsc-01-modele-scolaire, PR #215.
Lis AGENTS.md, docs/plan/suivi.md, la boîte Codex et cette fiche.
Relève les avis des groupes A et B sur C-5 et Q-20, puis traite les demandes dans le périmètre documentaire.
Vérifie les réponses sur les liens historiques sans année, la coexistence des clés
et le contrat StudyLib. Les migrations restent soumises à validation du chef.
```
