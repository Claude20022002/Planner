# Session du 2026-11-21 · UIX-11 (plan court) et UIX-06c (renvoi du thème) · `feat/uix-11-tableau-de-bord`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session de VS Code, reprise de la fiche `2026-11-21-feat-uix-10b-web-charte.md` |
| Chantier | UIX, hors chantier (UIX-10, UIX-11 : chef, 18 nov.) |
| Dossiers de travail | `..\travaux-planner\uix-11-tableau-de-bord` (depuis `origin/main`, `d4466b23`) ; `..\travaux-planner\uix-06c-ressources-temps` (même base) |
| Dernier commit | voir `git log -1` (UIX-11) ; `c36db4f3` (UIX-06c) |

## Objectif de la session

Les points 1 à 3 du prompt de reprise d'UIX-10b : surveiller la CI de #235 ; le plan court d'UIX-11 ; le renvoi du thème dans le plan d'UIX-06c.

## Plan

- UIX-11 : [uix-11-tableau-de-bord.md](../conception/interface/uix-11-tableau-de-bord.md), **à valider par le coordinateur** (routes existantes seulement, aucune donnée nominative d'élève nouvelle). Les questions 1 à 4 ont la réponse du chef ; les questions 5 et 6 sont à trancher à la validation.
- UIX-06c : le plan validé du 18 nov., corrigé d'un renvoi (le thème), sur `feat/uix-06c-ressources-temps`.

## Fait

| Commit | Branche | Contenu |
|---|---|---|
| — | `feat/uix-10b-web-charte` | **#235 : CI entièrement verte**, run `44848810481` : 74 parcours sur 74, dont les trois de `entreRoles.spec.cjs` réécrit (lignes 15, 77, 91). Rien à corriger |
| `b2975e84` | `feat/uix-11-tableau-de-bord` | plan court d'UIX-11, commité seul : six blocs indépendants (séances, À traiter, cette semaine, suivi, à venir, usage du mois), chaque chiffre avec sa période et un volet de ses lignes ; une route et une table par bloc (§ 4.2) ; EP-18 ; section « Ce que disent les études » (§ 7 bis) |
| `c36db4f3` | `feat/uix-06c-ressources-temps` | plan d'UIX-06c : `ThemeGestion` et la « portée du thème » renvoient au thème unique d'UIX-10b (`themeCharte.js`, `jetonsInterface.js`) ; `DashboardLayout.jsx` sort du périmètre (sa liste ne commande plus que le favicon, changé par UIX-10c). Renvoi seul : la solution ne change pas |
| (ce commit) | `feat/uix-11-tableau-de-bord` | cette fiche |

## Vérifié

- CI de #235 : `gh pr checks 235` tout vert ; journal du parcours : « 74 passed (16.1m) ».
- Plan d'UIX-11 : chaque route citée relue dans le code d'UIX-10b (`statistiquesRoutes.js`, `suiviRoutes.js`, `presenceRoutes.js` montée sur `/api/presences`, `examenRoutes.js`, `demandeReportRoutes.js`, `conflitRoutes.js`), toutes réservées à l'administration.
- Constaté dans le code, sans le changer (serveur hors périmètre) : `getKPIs` calcule l'occupation des salles sur `salles × 40 h` (une semaine) quelle que soit la période ; le taux de conflits rapporte les conflits non résolus de tout l'historique aux séances de la période.
- Aucun code écrit ; aucun test lancé hors de la CI de #235.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Chiffres à ajouter au tableau de bord | **chef, 21 nov.** : modules en retard, heures du mois, examens à venir, usage du mois (l'usage, sans lignes, est un écart accepté) | répondue |
| 2 | Comment mener « aux lignes » en un clic | **chef** : un volet dans le tableau de bord | répondue |
| 3 | Occupation des salles fausse sur l'année | **chef** : la même route sur la semaine en cours | répondue |
| 4 | Taux de présence par classe | **chef** : pas dans UIX-11 | répondue |
| 5 | Retirer le taux de conflits (deux périodes mêlées) | proposé : oui ; le compte reste dans « À traiter » | **coordinateur**, à la validation |
| 6 | « Cette semaine » = du lundi au dimanche, heure du navigateur, isolé dans `periodes.js` | proposé : oui | **coordinateur**, à la validation |
| 7 | Plan d'UIX-06c : il répartit les lots entre Codex (intégrateur, Calendrier), Cursor (Campus, Créneaux) et Claude (Salles), alors que la feuille de route met UIX-06c dans la file de Claude. Il dit aussi « posée sur `feat/uix-06b-referentiel` », or UIX-06b est fusionnée (`ae8e814c`). Qui fait quoi, et depuis quelle base ? | proposé : depuis `origin/main` après #235 ; la répartition, au coordinateur | **coordinateur** |

## Écarts et points à savoir

- La branche d'UIX-11 part de `origin/main` **avant** la fusion de #235, pour le plan seul (la fiche de mission dit « après la fusion d'UIX-10b ») : `git merge origin/main` est la première étape du code (plan, § 9, étape 2).
- Le registre des études (`docs/etude-marche/14-reprendre-et-depasser.md`) n'est que sur `etude/expertise-go4school` (#234) ; le plan le cite par cette branche.
- Le dossier `..\travaux-planner\coordination-equipe` est au milieu d'une fusion de `main`, avec des conflits (`docs/plan/modeles/conception.md`, `docs/plan/README.md`) : c'est le travail du coordinateur, non touché ici ; lu par `git show doc/coordination-equipe:…`.
- Rien commencé après UIX-06c : la règle 3 de la feuille de route demande que le plan d'UIX-11 soit validé avant la mission suivante.
- `suivi.md` et le fichier du module non modifiés (consigne ; rien n'existe de nouveau dans le code).

## État laissé

- Pour `suivi.md` (le coordinateur le reporte) : **UIX-10b** → PR #235, CI verte, à fusionner par le chef ; **UIX-11** → plan court écrit, à valider (`feat/uix-11-tableau-de-bord`, `b2975e84`) ; **UIX-06c** → plan corrigé (renvoi), `feat/uix-06c-ressources-temps`, `c36db4f3`.

## Reste à faire, dans l'ordre

1. Le chef fusionne #235. Le coordinateur valide le plan d'UIX-11 et tranche les questions 5 et 6 (et la 7 pour UIX-06c).
2. UIX-11, le code : `git merge origin/main`, puis les étapes 2 à 5 du plan ; captures montrées au chef avant le commit de l'étape 3.
3. UIX-06c (selon la réponse 7), QJE-14, l'étude StudyLib, UIX-10d.
4. VIT-09b, le code, en dernier sur le site, en montrant au chef la planche des dessins et chaque capture avant le commit.

## Commandes pour le chef de projet

```powershell
gh pr merge 235 --merge
git -C "..\travaux-planner\uix-11-tableau-de-bord" push -u origin feat/uix-11-tableau-de-bord
git -C "..\travaux-planner\uix-06c-ressources-temps" push -u origin feat/uix-06c-ressources-temps
```

Pas de PR pour l'instant : UIX-11 attend la validation de son plan puis son code ; UIX-06c, son code. Le coordinateur relit les deux branches.

## Prompt de reprise

```text
Tu es Claude de VS Code sur Planner (ta file d'interface, puis VIT-09b).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md et la feuille de route (branche doc/coordination-equipe),
puis cette fiche : docs/sessions/2026-11-21-feat-uix-11-tableau-de-bord.md (branche feat/uix-11-tableau-de-bord).
Fait le 21 nov. : #235 (UIX-10b) a sa CI verte, 74 parcours sur 74 dont entreRoles ; rien à corriger.
UIX-11 : plan court docs/conception/interface/uix-11-tableau-de-bord.md (b2975e84), dossier ..\travaux-planner\uix-11-tableau-de-bord :
six blocs indépendants, chaque chiffre avec sa période et un volet de ses lignes, routes existantes seulement.
Réponses du chef : chiffres ajoutés = modules en retard, heures du mois, examens à venir, usage du mois (sans lignes, écart accepté) ;
un volet dans le tableau de bord ; indicateurs sur la semaine en cours ; pas de taux de présence par classe.
UIX-06c : plan corrigé (renvoi au thème unique d'UIX-10b), branche feat/uix-06c-ressources-temps (c36db4f3).
Reste, dans l'ordre :
1) si le plan d'UIX-11 est validé (questions 5 et 6 tranchées) et #235 fusionnée : git merge origin/main, puis le code, étapes 2 à 5 du plan,
   captures (clair et sombre, 390 et 1440 px) montrées au chef avant le commit de l'étape 3 ; mesure EP-19 avant et après dans la PR ;
   sinon, attendre et le dire au chef ;
2) UIX-06c selon la réponse du coordinateur à la question 7 (qui fait quels lots, base origin/main) ;
3) QJE-14, étude StudyLib, UIX-10d ;
4) VIT-09b, le code, en dernier sur le site, avec la planche des dessins et chaque capture montrées au chef avant le commit.
Questions en attente (coordinateur) : 5 taux de conflits retiré ? 6 semaine du lundi au dimanche ? 7 répartition et base d'UIX-06c.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour en fin de session ; suivi.md non modifié ; jamais de git push.
```
