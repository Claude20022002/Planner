# Session du 2026-11-28 · ep18-sans-appareil · `etude/ep18-sans-appareil`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | étude, hors chantier de code |
| Dossier de travail | `..\travaux-planner\ep18-sans-appareil` |
| Dernier commit | le commit de cette fiche |

## Objectif de la session

Le plan des trois parcours sans appareil de l'élève : quiz imprimé et copie saisie, dépouillement d'un sondage papier, jeu au tableau. Aucun code.

## Plan

[docs/conception/qualite/ep18-sans-appareil.md](../conception/qualite/ep18-sans-appareil.md)

## Fait

- Le plan. Questions 1, 3 et 4 attendent le chef. Aucune migration réservée. `suivi.md` non modifié.

## Vérifié

Lecture seule du code sur `origin/main` (`5df39283`) et de l'étude `origin/etude/parcours-par-role`. Aucun test : pas de code.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Copie saisie = tentative marquée enseignant | proposition : oui | en attente du chef |
| 3 | Dépouillement papier, malgré M-16 | proposition : oui, sans nom | en attente du chef |
| 4 | Simulation au tableau, résultat de la classe, Robot Route d'abord | proposition : oui | en attente du chef |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : plan écrit, en attente du chef

## Reste à faire, dans l'ordre

1. Le chef répond aux questions 1, 3 et 4.
2. Ensuite seulement : impression, copie, dépouillement, chacune sur sa branche.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\ep18-sans-appareil" push -u origin etude/ep18-sans-appareil
gh pr create --base main --head etude/ep18-sans-appareil --title "EP-18 : parcours sans appareil de l'élève" --fill
```

## Prompt de reprise

```text
Tu reprends l'étude EP-18 (parcours sans appareil), sur la branche
etude/ep18-sans-appareil, dans le dossier ..\travaux-planner\ep18-sans-appareil.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/qualite/ep18-sans-appareil.md
et cette fiche.
Fait : le plan seul. Quiz imprimé puis copie saisie, sondage papier, terminal
déjà collectif, simulations en attente.
Reste : le visa du chef (questions 1, 3 et 4). Aucun code avant ce visa.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
