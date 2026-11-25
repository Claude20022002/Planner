# Session du 2026-11-25 · VSC-01 · `etude/vsc-01-modele-scolaire`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur, sur décision du chef |
| Chantier | VSC, ouvert par exception le 25 nov. |
| Dossier de travail | `..\travaux-planner\vsc-01-modele-scolaire` |
| Dernier commit | le commit de cette fiche |

## Objectif de la session

Deux VSC-01 concurrentes : #215 (cette branche) et #268 (agent Qoder, `doc/vsc-01-modele-scolaire`). Le chef a
choisi #215 comme référence le 25 nov. et demandé d'y verser les apports de #268, avant de fermer #268.

## Fait

- `origin/main` (`561fad19`) fusionnée dans la branche, sans conflit.
- [vsc-01-inscription-et-migrations.md](../conception/vie-scolaire/vsc-01-inscription-et-migrations.md) (nouveau) :
  frictions mesurées, cycle de l'inscription, transaction de fratrie, numéros de migration indicatifs, risques,
  écarts de #268 non repris. Tout est aligné sur les décisions du 18 nov. et N7.
- [vsc-01-impact-adresse-compte.md](../conception/vie-scolaire/vsc-01-impact-adresse-compte.md) : section
  « Compléments repris de #268 » (182 lectures en quatre classes, quatre lectures qui cassent, tests, migration
  en trois temps, questions ouvertes).
- [conception-c5](../conception/vie-scolaire/conception-c5-modele-donnees-scolaire.md) : liens vers le
  complément (§ 6 et § 11), choix de la référence noté.

## Vérifié

- Les chiffres repris (413, 99, 182, 65) viennent de #268, mesurés sur `561fad19` ; non remesurés ici.
- Aucune ligne de code, aucun test lancé.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Référence de VSC-01 | #215, enrichie de #268 | réglée (chef, 25 nov.) |
| 2 | Identifiant unique par école ou par plateforme ; qui le fabrique ; accès du parent sans adresse ; adresse d'un mineur | — | ouvertes, avant la migration du lot Q-20 |

## État laissé

- La répartition 0062 à 0068 est indicative : #270 (Alexis) prévoyait un `0065` de reprise après #269 ; le
  numéro se confirme avec le coordinateur à l'ouverture de chaque lot.
- Reste : la relecture « par les deux groupes » (critère de « terminé » de VSC-01), puis la fusion de #215.
  Ensuite #268 se ferme.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vsc-01-modele-scolaire" push origin etude/vsc-01-modele-scolaire
gh pr close 268 --comment "Remplacée par #215, choisie comme référence le 25 nov. ; ses apports y sont repris."
```

## Prompt de reprise

```text
Tu reprends VSC-01 sur etude/vsc-01-modele-scolaire (#215), dossier ..\travaux-planner\vsc-01-modele-scolaire.
Lis AGENTS.md, docs/plan/suivi.md, la conception C-5 et cette fiche.
Fait : #215 choisie comme référence par le chef le 25 nov. ; apports de #268 versés (complément
vsc-01-inscription-et-migrations.md, section de l'étude d'impact). Reste : relecture par les deux groupes,
fusion de #215, fermeture de #268 ; les quatre questions ouvertes du lot Q-20. Jamais de git push.
```
