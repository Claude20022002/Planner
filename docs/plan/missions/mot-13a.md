# Mission · MOT-13a · Contraintes déclarées, côté serveur

| | |
|---|---|
| État | ouverte |
| Agent | Claude Code (session à ouvrir, Cursor ou VS Code) |
| Attribuée le | 2026-11-15, par le coordinateur ; accord du chef : oui, le 2026-11-15 |
| Module et chantier | [MOT](../modules/MOT-moteur.md) · chantier ouvert le 2026-11-15 (ouvert sur la branche ; sur `main` à sa fusion) |
| Fonction | MOT-13a : l'école déclare ses contraintes à partir de six modèles ; refus expliqués ; contrôle de place avant le calcul · taille M (13a), sur M + L + M |
| Branche | `feat/mot-13-contraintes`, déjà créée (un commit : le plan), non poussée |
| Dossier de travail | `..\travaux-planner\mot-13-contraintes` |
| Plan de conception | `docs/conception/moteur-planification/mot-13-contraintes-declarees.md`, sur la branche · **validé par le chef le 2026-11-15** |

## Critère de « terminé »

Recopié du fichier du module (sur la branche) : en 13a, une contrainte invalide est refusée avec une phrase ; le contrôle de place bloque la génération en nommant les contraintes en cause ; le problème de l'école d'origine ne change pas.

## Périmètre d'écriture

L'agent peut modifier les fichiers du § 5 du plan, et eux seuls :

- `backend/services/moteur/contraintes/` (dix fichiers créés)
- `backend/services/moteur/valeurs/versions.js`
- `backend/services/generation/timefold/generation.js`
- `backend/models/ContrainteDeclaree.js` (créé), `backend/models/index.js`
- `backend/migrations/0080-contraintes-declarees.js` (créé ; 0080 réservée sur la branche)
- `backend/controllers/moteurContraintesController.js`, `backend/routes/moteurContraintesRoutes.js` (créés), `backend/controllers/moteurValeursController.js`, et le fichier qui monte les routes
- `backend/tests/utils/contraintesDeclarees.test.js`, `backend/tests/integration/contraintesDeclarees.test.js` (créés), `backend/tests/integration/valeursMoteur.test.js`, `backend/tests/utils/catalogueMoteur.test.js`
- `docs/conception/moteur-planification/README.md`, `docs/conception/README.md`
- `docs/plan/modules/MOT-moteur.md`, ses lignes de `docs/plan/suivi.md` et de `docs/plan/decisions.md`, sa fiche de session

L'agent ne touche pas :

- `backend/migrations/migrator.js`, `backend/tests/integration/helpers/testApp.js` et tout le périmètre de PLA-03b ([pla-03b.md](pla-03b.md))
- toute migration existante
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Le plan et ses réponses (propositions 9 à 15), validés le 15 novembre.
- Les décisions du 13 et du 15 novembre écrites sur la branche dans `decisions.md` (chantier MOT, MOT-12, MOT-13 en tête du chantier).
- Ordre de code du § 9 : modèles et phrases ; contrôles et contradictions ; contrôle de place ; table et versions ; routes ; appel avant la génération. Un commit par étape, avec ses tests.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| C-1 | La branche n'a **aucune fiche de session** pour la séance où le plan a été écrit | l'agent l'écrit en premier, comme fiche de constat (ce que montrent les commits), puis code | réglé par le coordinateur |
| C-2 | Si PLA-03b est fusionnée avant, le schéma de départ doit inclure la migration 0080 | voir la question C-1 de [pla-03b.md](pla-03b.md) : la PR qui arrive après régénère le schéma | chef |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : MOT-13a (contraintes déclarées, côté serveur), chantier MOT.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/mot-13a.md (sur main, ou sur la branche
chore/coordination-agents si elle n'est pas fusionnée).
Branche : feat/mot-13-contraintes, dans le dossier ..\travaux-planner\mot-13-contraintes
(déjà créés ; un seul commit, le plan validé par le chef le 15 novembre :
docs/conception/moteur-planification/mot-13-contraintes-declarees.md).
Commence par fusionner origin/main dans la branche (pas de rebase), puis écris la fiche de
session manquante de la séance du plan. Ensuite code MOT-13a en suivant le § 9 du plan,
un commit par étape avec ses tests.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | mission écrite ; branche lue : plan validé, pas de fiche de session | — |
