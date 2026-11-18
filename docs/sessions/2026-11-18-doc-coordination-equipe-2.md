# Session du 2026-11-18 (2) · Coordination : relectures d'UIX-06b et du site, doublon, UIX-09, audit · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur |
| Chantier | aucun : UIX-06b, UIX-06c, UIX-09, le site et l'audit sont hors chantier, accordés par le chef |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Fiche précédente | [2026-11-18-doc-coordination-equipe.md](2026-11-18-doc-coordination-equipe.md) |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; avant : `75baac05` |

## Objectif de la session

Le prompt de reprise de 10 h 10 :
1. lire et ranger les rapports des boîtes ;
2. relire UIX-06b ;
3. vérifier l'intégration des pages du site et le doublon ;
4. lancer UIX-09 ;
5. suivre l'audit et proposer l'ordre de fusion.

## Plan

Pas de code par le coordinateur : relectures, consignes, fichiers d'état.

## Fait

| Commit ou fichier | Quoi |
|---|---|
| `75baac05` | les deux verdicts, les décisions du chef de la session du site, la limite de 160 caractères par ligne (`equipe.md`, § 3), « Missions en cours » (UIX-09 et l'audit ajoutés), le suivi des deux fiches d'équipe |
| commit de cette fiche | les réponses du chef de 10 h 30 (`decisions.md`) ; le plan d'UIX-06c validé ; le plan de l'audit réduit à `backend/` (§ 6) ; les lignes MOT-03, REL et UIX-06c de « Missions en cours » |
| `boites\codex\entree\2026-11-18-1016-uix-06b-a-corriger.md` | cinq corrections d'UIX-06b |
| `boites\codex\entree\2026-11-18-1017-uix-09-depart.md` | UIX-09, après les corrections ; le plan se prend sur cette branche et se commite seul en premier |
| `boites\cursor\entree\2026-11-18-1018-vitrine-pages-arret.md` | lot de pages écarté (doublon), rien à supprimer soi-même |
| `boites\cursor\entree\2026-11-18-1031-rel-06-rel-03-chiffres.md` | REL-06 puis REL-03, chiffres du chef, plans courts à faire valider par le chef |
| boîtes `sortie\` | cinq rapports lus et rangés : Codex à 09 h 34, 10 h 02 et 10 h 09 ; agent de Cursor à 10 h 06 et le 16 nov. à 09 h 32 |

## Vérifié

- **UIX-06b** (`7b5b8fc9`), relancé ici :
  - 71 tests unitaires verts ;
  - neutralité verte ;
  - lint du lot sans erreur (les six avertissements sont hors du lot) ;
  - fusion avec `origin/main` sans conflit ;
  - aucun texte écrit en dur ;
  - périmètre tenu.
  
  Cru sur parole : le build.
- **Site** (`19167d6f`, #195), relancé ici : 33 tests unitaires verts, neutralité verte, fusion sans conflit, aucun fichier au-delà de 150 lignes, décisions 4 à 7 du chef respectées. Cru sur parole : Lighthouse et axe-core.
- **CI de #195** : « Test Backend » rouge (audit, comme sur `main`) et parcours en cours au relevé ; les autres contrôles sont verts.
- **`vitrine.yml`** audite avec `--omit=dev` et passe : d'où la réduction du plan de l'audit.

## Écarts

- **Doublon des pages du site** : la session du site ne voyait pas la consigne de l'agent de Cursor, et elle n'a pas été retirée quand le chef a réattribué le lot. Règle proposée au chef dans [vit-equipe](../plan/missions/vit-equipe.md) : une réattribution passe par le coordinateur, qui retire d'abord la consigne.
- `fix/audit-dependances` n'était pas créée au relevé.
- Il reste dans `boites\codex\sortie\` cinq rapports du 16 et du 17 nov., jamais rangés (UIX-06a, conception d'UIX-06b, étude OpenEduCat). Leur sujet est clos ou suivi ailleurs. Ils sont à ranger à la prochaine session, après une relecture rapide.

## Questions

| N° | Question | Proposition | À qui | État |
|---|---|---|---|---|
| 1 | Plan d'UIX-06c et exception | validé, départ après UIX-09 | chef | **close** (10 h 30) |
| 2 | Accords d'UIX-06b (axe-core, Groupes) | confirmés | chef | **close** |
| 3 | Audit : `vitrine/` hors de la branche | `backend/` seul, `vitrine/` le 27 nov. | chef | **close** |
| 4 | Chiffres de REL-06 et REL-03 | 10 Mo × 5 ; 14 jours | chef | **close** |
| 5 | SVG officiels des logos | à déposer dans `vitrine/public/logo/` | chef | ouverte |
| 6 | Adresses de contact du site | attendre VIT-02 et Q-11 | chef | ouverte |
| 7 | Modèle de l'agent de Cursor (Grok 4.7) | le plus fort de Cursor pour REL-06 et REL-03 | chef | ouverte |
| 8 | UIX-06d (Conflits, Affectations, Imprévus, Examens) | oui, après la relecture d'UIX-06c | chef | ouverte |
| 9 | Règle : toute réattribution passe par le coordinateur | oui | chef | ouverte |

## Reste à faire, dans l'ordre

1. Attendre « UIX-06b corrigée, sha … » de Codex. Relire seulement les cinq points, puis donner les commandes de push et de PR.
2. Suivre UIX-09 chez Codex : le premier commit doit être le plan seul.
3. Suivre `fix/audit-dependances` (session du site, `backend/` seul). La relire dès qu'elle est commitée.
4. Suivre les plans courts de REL-06 et REL-03 (agent de Cursor), puis les porter au chef pour validation.
5. Relire la correction de MOT-03 (`ce00b79e`) quand le chef l'aura poussée.
6. Fixer l'équipe d'UIX-06c (skill `equipe`) quand UIX-09 se termine.
7. Ordre de fusion : voir ci-dessous.

## Ordre de fusion proposé

1. **`fix/audit-dependances`** : elle remet « Test Backend » au vert. Elle passe en premier, puisque toutes les PR en dépendent.
2. **#195**, le site vitrine : mettre la branche à jour depuis `main` pour relancer la CI. Conflits attendus dans `suivi.md` : garder toutes les lignes.
3. **UIX-06b**, après ses corrections et une CI verte.
4. **UIX-09** : conflit attendu dans `frontend/package.json` et `package-lock.json` avec UIX-06b. Garder axe-core et lucide-react, puis lancer `npm install` dans `frontend/` pour régénérer le verrou.
5. Au même moment, `doc/coordination-equipe` : conflits dans `decisions.md` et `suivi.md`, garder toutes les lignes.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\coordination-equipe" push -u origin doc/coordination-equipe
gh pr create --base main --head doc/coordination-equipe --title "Coordination : travail en équipe, UIX-06b, site vitrine, UIX-09, UIX-06c, plan de l'audit" --fill
git -C "..\travaux-planner\mot-03-validation" push
```

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner (Claude, Codex, agent de Cursor). Tu reprends la coordination
du 18 novembre, sur la branche doc/coordination-equipe, dans le dossier ..\travaux-planner\coordination-equipe.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md (« Missions en cours »), docs/plan/equipe.md,
les skills .claude/skills/coordination, equipe et relecture-branche, puis cette fiche
(docs/sessions/2026-11-18-doc-coordination-equipe-2.md) et les fiches docs/plan/missions/uix-06b-equipe.md et vit-equipe.md.
Commence par le tour d'état (skill coordination, § 1), boîtes comprises.
Ensuite :
1) rapport « UIX-06b corrigée » de Codex : relis seulement les cinq points du message 2026-11-18-1016, verdict et commandes au chef ;
2) UIX-09 chez Codex : premier commit = le plan seul ; suis le périmètre du message 2026-11-18-1017 ;
3) fix/audit-dependances (backend/ seul, plan § 6) : relis-la dès qu'elle existe ;
4) plans courts REL-06 et REL-03 de l'agent de Cursor : relis, puis porte-les au chef, qui seul les valide ;
5) MOT-03 (ce00b79e) : relis-la après son push par le chef ;
6) quand UIX-09 finit, forme l'équipe d'UIX-06c (skill equipe ; plan validé le 18 nov.).
Ordre de fusion : audit, #195, UIX-06b, UIX-09 (verrou npm à régénérer).
Questions en attente du chef : SVG des logos, adresses de contact, modèle de l'agent de Cursor, UIX-06d, règle de réattribution.
Règles : tu ne codes aucun lot ; pas de code hors d'un plan validé ; questions avant toute supposition ;
chaque décision dans decisions.md ; fiche de session et suivi.md à jour en fin de session ; jamais de git push.
La session du site (VS Code) ne te joint pas par message : le chef relaie.
```
