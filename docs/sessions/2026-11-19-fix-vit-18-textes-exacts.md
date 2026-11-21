# Session du 2026-11-19 · VIT-18 · `fix/vit-18-textes-exacts`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), la session de l'expertise du site |
| Chantier | VIT (préparation de VIT-05 et conditions de VIT-06) |
| Dossier de travail | `..\travaux-planner\vit-18-textes-exacts` |
| Dernier commit | `fcd5c029` (le code), puis le plan, la ligne du module et cette fiche |

## Objectif de la session

VIT-18, le lot B de l'[expertise du site](../etude-marche/12-expertise-site-vitrine.md) : rendre exactes les phrases P1 à P6, appliquer D2, D3 et D4, raconter l'appel d'abord à la main (EP-18), et poser un test de garde. [Fiche de mission](../plan/missions/vit-18-textes-exacts.md) (sur `doc/coordination-equipe`).

## Plan

[docs/conception/vitrine/vit-18-textes-exacts.md](../conception/vitrine/vit-18-textes-exacts.md) : chaque phrase avant et après, en français et en anglais, avec sa source. **Validé par le chef le 19 nov.**, par l'outil de questions : groupes 1 à 5, et les questions 6 (la carte « Hors ligne » dit qu'une partie existe déjà) et 7 (deux lignes de `EnTete.astro`, pour prendre l'icône du menu par clé de type).

## Fait

- `173f1ddc` : le plan court, commité seul.
- `11e379df` : les réponses du chef et la ligne « Validé ».
- `f99e6190` : la ligne VIT-18 du module et la première version de cette fiche.
- `fcd5c029` : le code.
  - 22 phrases par langue, en français et en anglais, dans huit fichiers de texte ; chaque ancienne valeur vérifiée avant d'être remplacée.
  - L'ordre des types (D4) : `types.js` (supérieur clair, formation gris, collège et lycée clair) et les clés de `solutions.json` dans les trois langues.
  - Les deux lignes accordées d'`EnTete.astro` : l'icône du menu prise par clé de type.
  - `contenu.test.js` : quatre phrases figées mises à jour, l'assertion sur Massar inversée, douze phrases validées figées, et le test de garde. `solutions.test.js` : le nouvel ordre.
- Le plan (§ 5) corrigé d'un écart, et la ligne du module à « code fait, PR à ouvrir ».

## Écart au plan

Le plan exemptait deux phrases de la vidéo du test de garde. Seule celle de la scène 7 contient une formule interdite (« Quand l'école active l'IA », et en anglais « When the school turns on AI »). L'exception n'en garde donc qu'une, ce qui rend le test plus strict. Le test vérifie aussi que l'exception sert encore. Le plan est corrigé (§ 5). La phrase de la scène 4 reste à refaire au prochain rendu (§ 6).

## Vérifié

- `npm run test:unit` : **78 tests, 78 verts** (76 avant, plus les 2 de VIT-18).
- Le test de garde **échoue** quand on remet l'ancien `fr/bientot.json` (LMD, Massar) : 3 échecs, dont `fr/bientot:ecole.cartes.0.texte`. Il repasse au vert avec le nouveau.
- `npm run build` : 49 pages.
- `node scripts/verifier-neutre.mjs` : vert.
- axe-core 4.10.3, sur le site construit (port 4340, vérifié avec l'accroche servie) : accueil, En classe, Quiz et jeux, Solutions, Bientôt, Sécurité, Bibliothèque et Emploi du temps, en 390 et 1440 px, en français et en anglais. **32 passages, 0 violation**.
- Menu « Solutions » : Enseignement supérieur (`landmark`), Formation professionnelle (`briefcase`), Collège et lycée (`school`). Sections de la page Solutions : `superieur` clair, `formation` gris, `college-lycee` clair.
- **#224 n'était pas fusionnée sur GitHub** au moment du code (ouverte, fusionnable, `ac2d203b`), alors que le chef l'annonçait fusionnée. Le code est parti de `main` (`d27e30ee`) sur sa demande. #224 ne touche aucun fichier de VIT-18, et son `comparer.json` passe le test de garde. Une fois #224 fusionnée, il faudra intégrer `main` dans cette branche : aucun conflit n'est attendu.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 5 | Les cinq groupes de phrases du plan (§ 3.4) | « Je valide », pour chacun | validé |
| 6 | La carte « Hors ligne » de Bientôt dit-elle qu'une partie existe déjà ? | oui, en une phrase | validé |
| 7 | Toucher deux lignes de `EnTete.astro`, hors du périmètre ? | oui, deux lignes | validé |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : VIT-18 → **code fait, PR à ouvrir**.
- 21 nov. : `main` intégrée après la fusion de #224 (`1e8e988b`), sans conflit. `npm run test:unit` : 90 tests, 90 verts (avec ceux du comparatif ; le test de garde lit aussi `comparer.json`). Build : 52 pages.
- `EnTete.astro` est aussi touché par VIT-17 (le saut du menu), à d'autres lignes : le second fusionné intègre `main`.
- `solutions.json` et `types.js` seront touchés ensuite par VIT-13 : VIT-18 passe d'abord, comme prévu par la fiche.

## Reste à faire, dans l'ordre

1. Le chef pousse la branche et ouvre la PR (commandes ci-dessous) ; `main` est déjà intégrée.
2. Claude de VS Code (VIT-08) : au prochain rendu de la vidéo, les deux phrases du § 6 du plan. Il retire alors l'exception du test de garde (`contenu.test.js`, `EXCEPTIONS`).
3. Le coordinateur reporte l'état dans `suivi.md`.

## Commandes pour le chef de projet

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
Fait : plan validé par le chef le 19 nov. ; code fcd5c029 (22 phrases par langue, ordre des types,
icônes du menu par clé, test de garde) ; 78 tests verts, build, verifier-neutre, axe-core 0 violation sur 32 passages.
Reste : si #224 est fusionnée, git merge origin/main puis relancer npm run test:unit et npm run build ;
suivre la CI de la PR après le push du chef.
Règles : rien hors du plan validé ; suivi.md non modifié ; git add <fichiers> ; jamais de git push.
```
