# Mission · étude · garder StudyLib en Laravel ou la reconstruire dans la pile de Planner

| | |
|---|---|
| État | close le 2026-11-22 : étude faite, **voie B validée par le chef le 21 nov.** ; les lots ont leurs fiches (bib-reconstruction, bib-09-ecrans, bib-10-mobile, bib-11-import, sta-avis-idees, exp-retirer-meilisearch) |
| Agent | Claude (VS Code), après le plan d'UIX-10 : cette session lit déjà StudyLib pour la charte |
| Modèle recommandé | le plus capable disponible (Claude Fable 5.2, sinon Opus 5.5) : l'étude engage la pile et des données réelles |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. (« étude d'abord ») |
| Module et chantier | [BIB](../modules/BIB-bibliotheque.md) · étude hors chantier, sans code |
| Branche | `etude/bib-studylib-pile`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\etude-studylib` |
| Livrable | `docs/conception/bibliotheque/etude-studylib-pile.md` ; décision du chef ensuite |

## La question

StudyLib est en **Laravel 13, avec Livewire 4 et Tailwind 4** : environ 15 000 lignes, 18 contrôleurs, 14 modèles, 26 migrations. Elle a sa propre base `studylib`, Redis, un seau MinIO et Meilisearch 1.12. Elle reçoit l'identité de Planner par JWKS. Le plan prévoit **BIB-02** (une bibliothèque par école, canaux I-4 et I-5 fermés), à faire dans Laravel.

Faut-il la **garder en Laravel**, en lui appliquant la charte par des variables Tailwind, ou la **reconstruire comme un module de Planner** (Node, Express, React, MUI, MySQL) ?

## Ce que l'étude doit établir

1. **Ce que fait StudyLib**, écran par écran et rôle par rôle, d'après son code seulement : documents rangés par filière et par module, dépôts et modération, téléchargements et notes, recherche, avis de stage, idées de projet, événements, liens avec l'espace de cours et le mobile. *(Corrigé le 18 nov. à 17 h 30 : la fiche parlait de « catalogue » et d'« emprunts ». En lisant StudyLib pour VIT-07, l'agent de Cursor n'y a trouvé aucun prêt de livres. L'étude le confirme ou le dément, avec les fichiers.)*
2. **Les deux voies chiffrées** : le travail en tailles du plan (S, M, L, XL), le risque, et ce qui disparaît. Pour la voie « reconstruire », ce sont une pile PHP, une image, une base et une identité à part. Pour la voie « garder », c'est BIB-02 dans Laravel et les mises à jour de PHP.
3. **La reprise des données de l'école pilote** : les tables de sa base `studylib`, les fichiers dans MinIO, l'index Meilisearch. Comment on la vérifie, et comment on revient en arrière.
4. **Le sort de BIB-01 et BIB-02**, et des canaux I-4 et I-5.
5. **Une recommandation**, et ce qu'il faudrait décider avant tout travail sur BIB-02.

## Périmètre d'écriture

`docs/conception/bibliotheque/etude-studylib-pile.md` et sa fiche de session. Le dépôt `..\StudyLib` se lit sans être modifié. L'agent ne touche pas à `docs/plan/suivi.md`.

## Prompt à donner à l'agent, après le plan d'UIX-10

```text
Ta mission suivante : une étude, garder StudyLib en Laravel ou la reconstruire dans la pile de Planner. Pas de code.
Lis AGENTS.md, puis la fiche docs/plan/missions/etude-studylib.md (branche doc/coordination-equipe,
..\travaux-planner\coordination-equipe) et docs/plan/modules/BIB-bibliotheque.md.
git worktree add "..\travaux-planner\etude-studylib" -b etude/bib-studylib-pile origin/main
Lis ..\StudyLib sans le modifier. Écris docs/conception/bibliotheque/etude-studylib-pile.md selon les cinq points de la fiche, avec tes sources (fichiers, lignes).
Pose tes questions au chef avant toute supposition. Ne modifie pas docs/plan/suivi.md. Fiche de session ; tout est commité ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 13 h 40 | fiche écrite, sur décision du chef | — |
| 2026-11-18 17 h 30 | points 1 et 3 corrigés : aucun prêt de livres relevé dans StudyLib (plan court de VIT-07, `fafd3f15`) | — |
| 2026-11-22 | étude rendue (`etude/bib-studylib-pile`, `c3619899`) : voie B validée par le chef, répartition des lots (§ 8) ; six fiches de mission écrites par le coordinateur ; mission close | close |
