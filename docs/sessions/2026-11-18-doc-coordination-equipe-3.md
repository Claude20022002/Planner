# Session du 2026-11-18 (3) · Coordination : fusions de la journée, nouvelles règles, feuille de route pour la pause · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur |
| Fiche précédente | [2026-11-18-doc-coordination-equipe-2.md](2026-11-18-doc-coordination-equipe-2.md) |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; avant : `e9365211` |

## Bilan de la journée du 18 novembre, pour le chef

**Fusionné dans `main` (10 PR)** :

| PR | Quoi | Agent |
|---|---|---|
| #195 | site vitrine : socle, accueil, cinq pages de fonctions (fr, en, ar en attente) | Claude (VS Code) |
| #203 | site vitrine : page Solutions (collège et lycée, supérieur, formation professionnelle) | Claude (VS Code) |
| #198 | audit des dépendances de `backend/` vert : `qs` corrigé, exception datée pour picomatch | Claude (VS Code) |
| #202 | parcours `sondage` et `espaceCours` stables à toute heure | Claude (VS Code) |
| #183 | MOT-03 : validation avant le calcul, le refus nomme sa cible | agent de Cursor |
| #200 | REL-06 : journaux Docker limités à 10 Mo × 5 | agent de Cursor |
| #201 | REL-03 : dump d'avant déploiement chiffré par la phrase, purgé après 14 jours | agent de Cursor |
| #196 | QJE-04 : dix simulations et trente défis d'Alexis, migration 0082 | Alexis |
| #197, #204 | coordination : travail en équipe, règles, relectures | coordinateur |

**Prêt, à pousser** : #199 (UIX-06b, référentiel pédagogique, `ca7adfab`) et QJE-01 (`40abb56b`).

**Décidé par le chef aujourd'hui** (détail dans `decisions.md`) :
- toutes les plateformes suivent le style du site, avec une charte commune d'abord (UIX-10) ;
- le site se met en ligne sur un sous-domaine dès que les quatre conditions de VIT-06 sont réunies ;
- ClassQuiz est abandonné, et son fork archivé ; le Studio quiz devient « comme Google Forms » (QJE-14) ;
- StudyLib : une étude d'abord ;
- `suivi.md` est tenu par le coordinateur seul ;
- le chantier QJE est fermé, et VSC s'ouvrira après MOT ;
- la feuille de route compte quatre étapes.

**Pour voir le site vitrine chez soi** :

```powershell
cd vitrine
npm ci
npm run build
npm run preview
```

Puis ouvrir l'adresse affichée (`/fr/`, `/en/`, `/ar/`).

## Fait dans cette session

- Relectures et verdicts :
  - #199 : trois tours (lignes trop longues, onze parcours dont un vrai défaut, fondu du dialogue) ;
  - #196 : intégration, puis parcours ;
  - #200 et #201 : défaut du retour arrière, puis ShellCheck ;
  - #202, #203, QJE-01 ;
  - plans d'UIX-10 et d'UIX-10a (visa).
- Règle du chef, écrite dans `AGENTS.md`, les modèles et trois skills : **seul le coordinateur modifie `suivi.md`**.
- Fiches de mission :
  - [fix-sondage-minuit](../plan/missions/fix-sondage-minuit.md), [vit-solutions](../plan/missions/vit-solutions.md) ;
  - [uix-10-charte-commune](../plan/missions/uix-10-charte-commune.md), [uix-10a-source-charte](../plan/missions/uix-10a-source-charte.md) ;
  - [vit-06-mise-en-ligne](../plan/missions/vit-06-mise-en-ligne.md), [sortie-classquiz](../plan/missions/sortie-classquiz.md) ;
  - [etude-studylib](../plan/missions/etude-studylib.md), [qje-14-studio-forms](../plan/missions/qje-14-studio-forms.md).
- **[Feuille de route et files de travail](../plan/feuille-de-route.md)** : chaque agent sait quoi faire ensuite pendant la pause. Les messages sont déposés dans les boîtes à 15 h 15.

## Écarts et leçons (dans `decisions.md`)

- Des parcours jamais exécutés avant la PR ne prouvent rien : la relecture compte la CI comme une étape à part.
- Le coordinateur n'avait pas relu la décision du 20 oct. sur ClassQuiz avant de fixer le périmètre de la charte. Il faut relire `decisions.md` et `docs/archives/plans/` avant chaque fiche.
- Un `--watch` lancé juste après un push ne voit aucune CI : il faut attendre une minute.

## Questions encore ouvertes

| N° | Question | À qui |
|---|---|---|
| 1 | Les SVG officiels des logos (condition 3 de VIT-06) | chef |
| 2 | Le sous-domaine du site, et le texte des mentions légales (conditions 2 et 4) | chef, posées par Codex dans VIT-06 |
| 3 | La fiche du tableau de bord de l'administration (étape 2) | coordinateur, à son retour |
| 4 | La prochaine mission d'Alexis (étape 4) | chef |

## Commandes pour le chef

```powershell
git -C "..\travaux-planner\uix-06b-referentiel" push
git -C "..\travaux-planner\qje-01-entree-studio" push -u origin feat/qje-01-entree-studio
gh pr create --base main --head feat/qje-01-entree-studio --title "QJE-01 : l'entrée Quiz ouvre le Studio, plus ClassQuiz" --fill
git -C "..\travaux-planner\coordination-equipe" push
gh pr create --base main --head doc/coordination-equipe --title "Coordination du 18 nov., fin : feuille de route pour la pause, règles, visa d'UIX-10a" --fill
```

Une minute après les pushs : `gh pr checks <n> --watch`, puis `gh pr merge <n> --merge`, seulement si tout est vert. L'ordre : #199, QJE-01, la PR de coordination.

## Prompt pour Claude de VS Code

```text
Le coordinateur a donné son visa au plan court d'UIX-10a (4dc4f070), le 18 nov. : tu peux coder, à partir de l'étape 2 du § 9.
Écris la ligne « Validé » du plan court : « par le coordinateur le 18 novembre 2026 (visa, fiche de mission) », dans un commit seul.
Ta fiche : docs/plan/missions/uix-10a-source-charte.md ; ta file complète : docs/plan/feuille-de-route.md
(branche doc/coordination-equipe, ..\travaux-planner\coordination-equipe). Le dossier ..\travaux-planner\uix-10a-source-charte est gardé.
Le coordinateur se met en pause : le chef valide tous les plans suivants. Ne modifie pas docs/plan/suivi.md.
Après UIX-10a : UIX-10b (plan court, après la fusion de #199 et d'UIX-09), puis UIX-06c, QJE-14 (plan), l'étude StudyLib, UIX-10d.
Fiche de session à jour ; tout est commité ; jamais de git push.
```

## Prompt de reprise du coordinateur

```text
Tu es le coordinateur des agents de Planner (Claude, Codex, agent de Cursor). Tu reprends après la pause du 18 novembre,
sur la branche doc/coordination-equipe, dans ..\travaux-planner\coordination-equipe (fais git fetch puis git merge origin/main d'abord).
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md (« Missions en cours »), docs/plan/feuille-de-route.md,
les skills coordination, equipe et relecture-branche, puis cette fiche (docs/sessions/2026-11-18-doc-coordination-equipe-3.md).
Commence par le tour d'état (skill coordination, § 1), boîtes comprises : beaucoup de rapports auront été déposés pendant la pause.
Ensuite :
1) relis chaque branche ou PR finie pendant la pause, y compris celles que le chef a déjà fusionnées ;
2) reporte dans suivi.md l'état de chaque fonction, d'après les fiches de session : toi seul modifies suivi.md ;
3) mets à jour les files de la feuille de route, et écris la fiche du tableau de bord de l'administration (étape 2) ;
4) quand MOT est fini, propose au chef l'ouverture du chantier VSC.
Règles : tu ne codes aucun lot ; plan validé avant le code ; questions avant toute supposition ; chaque décision dans decisions.md ;
relis decisions.md et docs/archives/plans/ avant de fixer le périmètre d'une mission ; jamais de git push.
```
