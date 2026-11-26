# Mission · VIT-18b · le test de garde du site refuse aussi les superlatifs (N4)

| | |
|---|---|
| État | close : #243 fusionnée le 21 nov. à 20 h 58 |
| Agent | la session Claude de l'expertise (elle a écrit VIT-18 et la synthèse 14) |
| Modèle recommandé | un modèle moyen : une règle de test et, au besoin, quelques phrases |
| Attribuée le | 2026-11-21, par le coordinateur ; accord du chef : oui, N4 du 21 nov. |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · condition 10 de la mise en ligne (textes exacts) |
| Fonction | VIT-18b : le test de garde de `vitrine/tests/contenu.test.js` refuse « n° 1 », « #1 », « le seul », « le meilleur », « leader », et en anglais « number one », « the only », « the best », « leader » · taille S |
| Branche | `fix/vit-18b-superlatifs`, depuis `origin/main` après la fusion de #228 |
| Dossier de travail | `..\travaux-planner\vit-18b-superlatifs` |
| Plan de conception | plan court `docs/conception/vitrine/vit-18b-superlatifs.md` · la règle est validée par le chef (N4) ; **toute phrase à changer pour passer le test va au chef**, phrase par phrase, comme pour VIT-18 |

## Critère de « terminé »

- Le test échoue quand on remet un superlatif dans un texte fr ou en, et passe sur `main`.
- Les phrases qui en contenaient sont réécrites avec le visa du chef, ou le plan dit qu'il n'y en avait aucune.
- `npm run test:unit`, `npm run build`, `node scripts/verifier-neutre.mjs` verts.

## Périmètre d'écriture

`vitrine/tests/contenu.test.js`, les textes `vitrine/src/i18n/fr|en/*.json` touchés par une phrase validée, le plan, la ligne du module VIT, la fiche de session. Pas `docs/plan/suivi.md`.

## Prompt à donner à l'agent

```text
Le coordinateur te confie VIT-18b (N4, décision du chef du 21 nov.), après la fusion de #228.
Fiche : docs/plan/missions/vit-18b-superlatifs.md (branche doc/coordination-equipe). Branche fix/vit-18b-superlatifs depuis origin/main,
dossier ..\travaux-planner\vit-18b-superlatifs. Plan court (avec « Ce que disent les études » : M15, N4), commité seul ;
les phrases à changer au chef, phrase par phrase. Puis le test et le code. Fiche de session ; suivi.md non modifié ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-21 | fiche écrite par le coordinateur, sur la décision N4 du chef | — |
| 2026-11-21 20 h 58 | #243 fusionnée par le chef ; mission close | close |
