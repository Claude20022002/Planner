# Session du 2026-11-19 · VIT-18 · `fix/vit-18-textes-exacts`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), la session de l'expertise du site |
| Chantier | VIT (préparation de VIT-05 et conditions de VIT-06) |
| Dossier de travail | `..\travaux-planner\vit-18-textes-exacts` |
| Dernier commit | `11e379df` (plan validé), puis la ligne du module et cette fiche |

## Objectif de la session

VIT-18, le lot B de l'[expertise du site](../etude-marche/12-expertise-site-vitrine.md) : rendre exactes les phrases P1 à P6, appliquer D2, D3 et D4, raconter l'appel d'abord à la main (EP-18), et poser un test de garde. [Fiche de mission](../plan/missions/vit-18-textes-exacts.md) (sur `doc/coordination-equipe`).

## Plan

[docs/conception/vitrine/vit-18-textes-exacts.md](../conception/vitrine/vit-18-textes-exacts.md) : chaque phrase avant et après, en français et en anglais, avec sa source. **Validé par le chef le 19 nov.**, par l'outil de questions : groupes 1 à 5, et les questions 6 (la carte « Hors ligne » dit qu'une partie existe déjà) et 7 (deux lignes de `EnTete.astro`, pour prendre l'icône du menu par clé de type).

## Fait

- `173f1ddc` : le plan court, commité seul.
- `11e379df` : les réponses du chef et la ligne « Validé ».
- La ligne VIT-18 dans `docs/plan/modules/VIT-site-vitrine.md`, et cette fiche.

## Vérifié

- Avant d'écrire le plan, sur `origin/main` (`d27e30ee`) : les textes n'ont pas bougé depuis l'expertise ; #224 ne change aucune des clés visées ; son `comparer.json` ne contient aucune formule que le test de garde interdit.
- Trois découvertes, inscrites dans le plan :
  - les icônes du menu « Solutions » sont prises par position (`EnTete.astro`, lignes 20 et 43) : sans correction, le nouvel ordre donnerait l'icône de l'école au supérieur ;
  - `solutions.test.js` (lignes 25 et 38) fige l'ordre des types et celui des clés de `solutions.json` ;
  - `contenu.test.js` fige quatre phrases qui changent, et exige la phrase sur Massar (ligne 88).
- Aucun code écrit : la fiche demande d'attendre la fusion de #224, encore ouverte à la fin de la session.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 5 | Les cinq groupes de phrases du plan (§ 3.4) | « Je valide », pour chacun | validé |
| 6 | La carte « Hors ligne » de Bientôt dit-elle qu'une partie existe déjà ? | oui, en une phrase | validé |
| 7 | Toucher deux lignes de `EnTete.astro`, hors du périmètre ? | oui, deux lignes | validé |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : VIT-18 → **plan validé, code en attente de la fusion de #224**.
- `EnTete.astro` est aussi touché par VIT-17 (le saut du menu) : le premier fusionné passe, l'autre fusionne `main`.

## Reste à faire, dans l'ordre

1. Après la fusion de #224 : `git merge origin/main` dans le dossier de travail.
2. Les textes du § 3 du plan (fr et en ; l'ordre des clés de `solutions.json` aussi en arabe).
3. `types.js` (ordre et tons) et les deux lignes de `EnTete.astro`.
4. Le test de garde et les phrases figées de `contenu.test.js` ; l'ordre de `solutions.test.js`.
5. `npm run build`, `npm run test:unit`, `node scripts/verifier-neutre.mjs`, axe-core en 390 et 1440 px sur les sept pages du plan.
6. Mettre la ligne du module à « fait, PR à ouvrir », compléter cette fiche, commiter.
7. Signaler à Claude de VS Code (VIT-08) les deux phrases de la vidéo du § 6 du plan.

## Commandes pour le chef de projet

À lancer quand le code sera fait. Le plan seul peut aussi partir maintenant :

```powershell
git -C "..\travaux-planner\vit-18-textes-exacts" push -u origin fix/vit-18-textes-exacts
gh pr create --base main --head fix/vit-18-textes-exacts --title "VIT-18 : textes exacts du site vitrine" --fill
```

## Prompt de reprise

```text
Tu reprends VIT-18 (textes exacts du site vitrine) du chantier VIT, sur la branche fix/vit-18-textes-exacts,
dans le dossier ..\travaux-planner\vit-18-textes-exacts.
Lis d'abord AGENTS.md, docs/plan/README.md, la fiche docs/plan/missions/vit-18-textes-exacts.md
(branche doc/coordination-equipe si elle n'est pas fusionnée), le plan docs/conception/vitrine/vit-18-textes-exacts.md
et cette fiche (docs/sessions/2026-11-19-fix-vit-18-textes-exacts.md).
Fait : plan validé par le chef le 19 nov. (groupes 1 à 5, questions 6 et 7 : deux lignes de EnTete.astro accordées).
Reste : vérifier que #224 est fusionnée (gh pr view 224), puis git merge origin/main ; écrire les textes du § 3
(fr, en ; ordre des clés de solutions.json aussi en ar), types.js (supérieur clair, formation gris, collège et lycée clair),
iconesTypes par clé dans EnTete.astro, le test de garde (exception : video.scenes.4.lignes.0 et video.scenes.7.lignes.1),
les phrases figées de contenu.test.js et l'ordre de solutions.test.js ; build, tests, verifier-neutre, axe-core 390 et 1440 px.
Règles : rien hors du plan validé ; suivi.md non modifié ; git add <fichiers> ; jamais de git push.
```
