# Session du 2026-11-26 · coordination · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur désigné par le chef |
| Chantiers | EXP, PLA, ADM, et VSC par exception |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | le commit de cette fiche |

## Objectif de la session

Suite de la coordination du 25 nov. (`doc/coordination-2026-11-25`, #271) : réunir les trois coordinations
ouvertes (#211 du 18 nov., #256 du 22 nov., #271 du 25 nov.) en une seule branche à jour de `main`.

## Fait

- **Fusions du 26 nov.** (lancées par le chef, puis par le coordinateur à sa demande pour #258 et #259) :
  #264, #266, #267 (0 h 05), #258 et #259 ; CI de `main` verte après #267 ; #268 fermée (remplacée par #215).
- `d04930b2` : `main` fusionnée dans #211. Conflits sur `README.md` et 17 fichiers de module. Identifiants en
  double renumérotés (ADM-11, BIB-13, MOB-10, STA-04, VSC-14 ; VSC-10 fondue dans VSC-08). Fonctions de la
  parité marquées « à placer » (décision du chef), reprises laissées à l'étape 7. Lignes VIT-20 à VIT-22
  identiques à #256.
- `20356eb4` : #256 intégrée (sa résolution `f676dfc2` comprise).
- `c75361fc` : #271 intégrée ; chantiers ADM (21 nov.) et VSC par exception ; décisions de #271 corrigées.

## Vérifié

- Aucun marqueur de conflit dans `docs/plan/`.
- Les têtes de #256 (sur GitHub et en local) et de #271 sont ancêtres de la branche : à la fusion de #211,
  GitHub les marquera fusionnées.
- Aucun code touché, donc aucun test lancé ; la CI de #211 le confirmera.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | VSC : revenir au 21 nov. (conception seule) ? | non : l'exception est maintenue, quatre chantiers | réglée (chef) |
| 2 | Étapes des fonctions de la parité | « à placer », puis proposition du coordinateur | réglée (chef) |

## Erreur et correction

Le 25 nov., le coordinateur a présenté l'ouverture de VSC « avant la fermeture de MOT » : MOT était fermé
depuis le 21 nov. (ADM ouvert à sa place), ce que seule la coordination non fusionnée #211 disait. Le chef,
informé, maintient sa décision. Leçon inscrite dans `decisions.md`.

## Reste à faire, dans l'ordre

1. Le chef pousse `doc/coordination-equipe`, attend la CI de #211, la fusionne ; #256 et #271 passent à
   « fusionnée ».
2. Le coordinateur propose une étape pour chaque fonction « à placer » de la parité.
3. Le chef transmet à Alexis les messages de sa boîte (VSC, relecture de #264 à #267, STA-01).
4. Relectures à venir : #265 corrigée, #230 corrigée, #269 et #270 (VSC), #229 (CI rouge).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\coordination-equipe" push
gh pr checks 211 --watch && gh pr merge 211 --merge
```

## Prompt de reprise

```text
Tu es le coordinateur de Planner. Lis AGENTS.md, le skill coordination, docs/plan/suivi.md sur main
(après la fusion de #211) et cette fiche (docs/sessions/2026-11-26-doc-coordination-equipe.md).
Chantiers : EXP, PLA, ADM, et VSC par exception (décision maintenue le 26 nov.).
Reste : proposer au chef une étape pour chaque fonction « à placer » de la parité (README, § 2) ;
relire #265 et #230 quand Alexis les aura corrigées, puis #269 et #270 ; #229 a une CI rouge.
Avant tout tour d'état : lire aussi les branches de coordination non fusionnées. Jamais de git push.
```
