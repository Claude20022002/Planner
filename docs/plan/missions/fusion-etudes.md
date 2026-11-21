# Mission · fusion des études restées sur des branches

| | |
|---|---|
| État | ouverte |
| Agent | **agent de Cursor**, après VIT-17 (réattribuée le 21 nov. : la session de VIT-14 n'a pas été ouverte) |
| Modèle recommandé | un modèle moyen : des fusions de documents, sans code |
| Attribuée le | 2026-11-21, par le coordinateur ; accord du chef : oui, le 2026-11-21 (« les études se fusionnent ») |
| Module et chantier | QUA (documentation) · hors chantier, décision du chef |
| Fonction | rendre chaque étude restée sur une branche fusionnable avec `main`, pour qu'elle serve à toute la conception · taille S par PR |
| Branche | la branche de chaque PR (une à la fois) |
| Dossier de travail | le dossier existant de chaque branche, sinon `..\travaux-planner\<nom de la branche>` |
| Plan de conception | aucun : fusions de documents ; les règles ci-dessous suffisent |

## Ce qui est à faire, dans l'ordre

| N° | PR | Branche | Ce qu'il faut |
|---|---|---|---|
| 1 | #191 | `etude/openeducat-comparatif` | sans conflit, mais sa CI du 17 nov. est rouge (Test Backend, sur le `main` de l'époque) : `git merge origin/main` pour la relancer ; vérifier les liens et `node scripts/verifier-neutre.mjs` |
| 2 | #192 | `etude/openeducat-etude-complete` | après la fusion de #191 : `git merge origin/main` ; `docs/etude-marche/README.md` peut entrer en conflit : garder les deux lignes |
| 3 | #189 (contient #186 et #188) | `doc/qua-09-envois-sortants` | les trois branches sont empilées : on ne met à jour que #189. `git merge origin/main` : `decisions.md` (toutes les lignes), `suivi.md` (la version de `main`) ; `docs/plan/modeles/conception.md` et `docs/plan/README.md` : garder les deux ajouts (§ 7 bis et EP-19 du 21 nov.). Une fois #189 fusionnée, GitHub marque #186 et #188 fusionnées. **Codex attend cette fusion** pour finir QUA-10 |
| 4 | #190 | `etude/architecture-donnees` | `git merge origin/main` : `decisions.md` (toutes les lignes), `docs/conception/README.md` (les deux lignes) |
| 5 | #169 | `etude/ven-modele-economique` | `git merge origin/main` : `decisions.md` (toutes les lignes) ; elle a plus de 400 commits de retard : relire que rien d'autre ne bouge |
| 6 | #234 | `etude/expertise-go4school` | `git merge origin/main` si besoin |
| 7 | #193 | `doc/plan-parite-openeducat` | en dernier : `decisions.md` (toutes les lignes), `suivi.md` (la version de `main`), `modules/UIX-interface.md` et `modules/VSC-vie-scolaire.md` (garder les deux côtés, y compris VSC-08 ajoutée le 21 nov.). Ne pas changer l'étape des fonctions : le chef la donnera |

**#194 (essai PostgreSQL) n'est pas dans la mission** : elle porte du code d'essai, elle reste en brouillon.

Après chaque fusion de `main` : `node scripts/verifier-neutre.mjs`, liens relatifs vérifiés, commit (`git add <fichiers>`), puis le dire au chef, qui pousse, attend la CI et fusionne. Une PR à la fois : la suivante intègre `main` après la fusion de la précédente.

## Périmètre d'écriture

- les fichiers en conflit, et seulement pour résoudre le conflit selon la règle du tableau ;
- une fiche de session (`docs/sessions/2026-11-21-fusion-etudes.md`, sur la branche en cours).

L'agent ne réécrit pas le contenu d'une étude. S'il y trouve une donnée réelle ou une erreur, il le signale au coordinateur (par le chef) sans corriger.

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : fusionner les études restées sur des branches (décision du chef du 21 nov.).
Lis AGENTS.md, puis ta fiche docs/plan/missions/fusion-etudes.md (branche doc/coordination-equipe).
Une PR à la fois, dans l'ordre de la fiche : git merge origin/main dans le dossier de la branche, conflits résolus selon la règle
(decisions.md : toutes les lignes ; suivi.md : la version de main ; les autres : les deux ajouts), verifier-neutre, commit.
Tu ne réécris aucune étude. Ne modifie pas docs/plan/suivi.md au-delà de la résolution indiquée. Jamais de git push :
le chef pousse et fusionne. Fiche de session en fin de session.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-21 | fiche écrite par le coordinateur, sur la décision du chef | — |
