# Mission · correctif · le parcours `sondage.spec.cjs` échoue quand la CI croise minuit UTC

| | |
|---|---|
| État | ouverte |
| Agent | Claude (VS Code), la session du site vitrine et de l'audit, libre depuis #198 |
| Modèle recommandé | un modèle moyen suffit (Sonnet 5.5) pour un correctif de test court. Opus 5.5 convient aussi si la session tourne déjà dessus : on ne change pas de modèle en cours de session |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : il a demandé une mission pour Claude |
| Module et chantier | QUA · correctif de test, sans chantier : un parcours instable rend des PR rouges sans raison |
| Fonction | rendre `frontend/tests/parcours/sondage.spec.cjs` indépendant du changement de jour · taille S |
| Branche | `fix/sondage-minuit`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\sondage-minuit` |
| Plan de conception | plan court à écrire (`docs/conception/qualite/fix-sondage-minuit.md`) · validé par **le coordinateur** : S, sans migration, sécurité, donnée de mineur ni choix de produit, **tant que le code produit ne change pas**. Si la cause est dans le code de l'application (serveur ou site), le plan remonte **au chef** |

## Ce qu'on sait

- Le 15 nov. au soir, trois PR de documentation sont devenues rouges sur ce parcours, alors que `main` restait verte. La CI tournait vers minuit UTC.
- Il y a un précédent : le rappel d'appel (#162, `fix/edt-dimanche-visible`, et `e648c02e` : « parcours qui ont croisé minuit UTC »). Lire comment il a été corrigé.
- La cause exacte n'est pas établie : c'est la première étape.

## Critère de « terminé »

- La cause est écrite dans le plan, avec la ligne qui dépend de l'heure.
- Le parcours passe à toute heure. La preuve est un test qui fixe l'horloge juste avant et juste après minuit UTC, par exemple avec `page.clock` de Playwright, sans attendre minuit.
- Un test de régression couvre ce cas.
- Aucun autre parcours n'est modifié, sauf s'il a la même cause : dans ce cas, le dire dans le plan avant d'y toucher.

## Périmètre d'écriture

L'agent peut modifier :
- `frontend/tests/parcours/sondage.spec.cjs` et `frontend/tests/parcours/espaceCours.spec.cjs`, qui casse sur la même ligne (accord du coordinateur, 18 nov. 11 h 40) ;
- `frontend/tests/parcours/outils.cjs`, **en ajout seulement** : la fonction partagée `ouvrirClasse`. Les fonctions qui existent ne changent pas, car les parcours d'UIX-06b et d'UIX-09 les importent ;
- `docs/conception/qualite/fix-sondage-minuit.md`, sa ligne de `docs/plan/suivi.md` et sa fiche de session.

L'agent ne touche pas :
- au code de l'application (`frontend/src/`, `backend/`) sans le « validé » du chef ;
- aux fichiers de parcours d'UIX-06b et d'UIX-09 (`referentiel-*.spec.cjs`, `applications.spec.cjs`), tenus par Codex ;
- à tout le reste : s'il doit en sortir, il s'arrête et demande.

## Ce qui est déjà décidé

- Les parcours tournent dans la CI de la PR. L'agent ne lance pas de serveur.

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : le correctif du parcours sondage.spec.cjs, qui échoue quand la CI croise minuit UTC.
Avant de commencer : ferme proprement ta session de l'audit. Dans ..\travaux-planner\fix-audit-dependances,
backend/package-lock.json apparaît modifié par les seules fins de ligne : git checkout -- backend/package-lock.json.
Lis d'abord AGENTS.md, docs/plan/README.md et docs/plan/suivi.md, puis ta fiche de mission docs/plan/missions/fix-sondage-minuit.md,
sur la branche doc/coordination-equipe (..\travaux-planner\coordination-equipe).
git worktree add "..\travaux-planner\sondage-minuit" -b fix/sondage-minuit origin/main
Trouve la cause et lis comment #162 a traité le même problème. Puis écris le plan court, et commite-le seul.
Le coordinateur le valide si seul le test change ; si le code de l'application est en cause, c'est le chef.
Tu n'écris que dans le périmètre de la fiche. Ensuite : le correctif, un test qui fixe l'horloge autour de minuit UTC,
ta fiche de session et la ligne de suivi.md. Les parcours tournent en CI : ne lance pas de serveur. Jamais de git push.
Le coordinateur ne te joint pas par message : le chef relaie. Dis au chef quand le plan est prêt, puis quand tu as fini.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 11 h 20 | fiche écrite ; prompt donné au chef | — |
| 2026-11-18 11 h 40 | questions de l'agent (relayées par le chef) : `espaceCours.spec.cjs` sur cette branche, **oui** ; `entreRoles`, `appel` et `appelClasse` dépendent de `donnees.mjs`, partagé par tous les parcours : **mission à part**, avec son plan ; preuve de l'échec : **le journal du 15 nov. suffit**, avec le numéro du passage cité dans le plan, et le nouveau test à horloge fixée le prouve en CI | — |
