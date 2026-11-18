# Mission d'équipe · UIX-06b · Référentiel pédagogique, puis UIX-06c

| | |
|---|---|
| État | ouverte |
| Équipe | Codex (intégrateur), agent de Cursor ; coordinateur : Claude (Cursor). Claude (VS Code) est passé au site vitrine le 18 nov. ([vit-equipe](vit-equipe.md)) |
| Attribuée le | 18 novembre 2026, nuit du 17 au 18, par le coordinateur ; accord du chef : oui, le 17 nov. au soir (« UIX-06b puis UIX-06c », « les sessions finissent, une rejoint ») |
| Module et chantier | [UIX](../modules/UIX-interface.md) · hors chantier : exception UIX-06b accordée par le chef le 16 nov. |
| Fonction | UIX-06b : Filières, Groupes, Modules et Enseignements au style du pilote Personnes, fonctions et droits inchangés · taille L |
| Branche d'intégration | `feat/uix-06b-referentiel`, dossier `..\travaux-planner\uix-06b-referentiel` |
| Plan de conception | [uix-06b-referentiel.md](../../conception/interface/uix-06b-referentiel.md), sur la branche d'intégration · **validé par le chef le 16 nov.** |
| Règles d'équipe | [equipe.md](../equipe.md) : à lire avant de commencer |

## Où en est la fonction

Codex a écrit presque tout le code le 16 novembre, **sans le commiter** : les quatre pages font 20 à 33 lignes au lieu de 289 à 403, et 30 composants, hooks et dictionnaires sont créés (10 fichiers modifiés, 20 nouveaux). Il reste à le commiter, à vérifier chaque fonction contre le § 2 du plan, à écrire les tests et à passer les contrôles du § 8.

## L'équipe

| Agent | Rôle | Lot | Modèle | Branche | Dossier |
|---|---|---|---|---|---|
| **Codex** | intégrateur | commun, Filières et Enseignements | son modèle le plus fort, raisonnement élevé : il tient les fichiers communs et toutes les fusions | `feat/uix-06b-referentiel` | `..\travaux-planner\uix-06b-referentiel` |
| ~~Agent de Cursor~~ | — | ~~Groupes et Modules~~, repris par Codex le 18 nov. à 02 h 12 | son modèle de code le plus fort, raisonnement élevé : deux domaines et leurs imports | `feat/uix-06b-referentiel-groupes-modules` | `..\travaux-planner\uix-06b-groupes-modules` |
| Claude (Cursor) | coordinateur | aucun | Opus 5.5 | `doc/coordination-equipe` | `..\travaux-planner\coordination-equipe` |

**Changement du 18 nov., 00 h 20 (coordinateur, à la demande du chef : le site vitrine se fait ce soir)** : le lot Enseignements passe à Codex, qui en a écrit le code ; Claude (VS Code) devient l'intégrateur du site vitrine. Après l'intégration d'UIX-06b, l'agent de Cursor rejoint le site vitrine et Codex fait UIX-09 (grille d'applications).

## Les propriétaires

Chemins sous `frontend/`. Un fichier absent de ce tableau n'est à personne : le toucher, c'est s'arrêter et demander.

| Fichier ou dossier | Propriétaire |
|---|---|
| `src/components/gestion/`, `src/components/personnes/`, `src/components/common/ThemeGestion.jsx`, `src/design-system/jetonsGestion.js` | Codex |
| `src/components/layouts/DashboardLayout.jsx`, `src/i18n/index.js`, `src/i18n/referentiel.fr.js`, `src/i18n/referentiel.en.js` | Codex |
| `src/pages/gestion/Filieres.jsx`, `src/components/filieres/`, `src/i18n/referentiel/filieres.*.js` | Codex |
| `tests/parcours/referentiel-filieres.spec.cjs`, `tests/parcours/personnes.spec.cjs` | Codex |
| `../docs/conception/interface/uix-06b-referentiel.md`, `DESIGN.md`, `../docs/plan/modules/UIX-interface.md`, lignes UIX de `../docs/plan/suivi.md`, fiche de session de la fonction | Codex |
| `src/pages/gestion/Groupes.jsx`, `src/components/groupes/`, `src/i18n/referentiel/groupes.*.js` | agent de Cursor |
| `src/pages/gestion/Cours.jsx`, `src/components/cours/`, `src/i18n/referentiel/modules.*.js` | agent de Cursor |
| `tests/parcours/referentiel-groupes.spec.cjs`, `tests/parcours/referentiel-modules.spec.cjs`, `tests/parcours/cours.spec.cjs`, `tests/parcours/desactivation.spec.cjs`, `tests/parcours/annees.spec.cjs` | agent de Cursor |
| `src/pages/gestion/Enseignements.jsx`, `src/components/enseignements/`, `src/i18n/referentiel/enseignements.*.js` | Codex |
| `src/components/planning/EquipeDialog.jsx` (présentation seulement ; vérifier ses autres usages) | Codex |
| `tests/parcours/referentiel-enseignements.spec.cjs`, `tests/parcours/generation.spec.cjs` | Codex |
| sa propre fiche de session `../docs/sessions/2026-11-18-<branche de lot>.md` | chaque membre |
| tests unitaires `*.test.js` placés dans un dossier de composants | le propriétaire du dossier |

Hors de tout lot (plan, § 5) : `App.jsx`, droits, services et contrats d'API, serveur, migrations.

## Les rendez-vous de ce soir

Heures visées, à décaler ensemble si R0 glisse.

| Heure visée | Rendez-vous | Qui | Fait quand |
|---|---|---|---|
| 00 h 45 | **R0, départ** | Codex | son travail du 16 nov. est commité en trois commits (outils communs et thème ; Filières et Groupes ; Modules et Enseignements, d'après les étapes 3 à 5 du plan) ; les six dictionnaires `src/i18n/referentiel/<lot>.fr.js` et `.en.js` (filieres, groupes, modules, enseignements) existent, vides, et sont inscrits dans `index.js` ; lint, tests unitaires et build passent ; rapport « R0 prêt, sha … » dans `sortie\` |
| R0 + 10 min | lancement des lots | coordinateur | chaque membre reçoit le sha de départ |
| 02 h 15 | **R1, fin des lots** | chaque membre | lot commité ; rapport de rendez-vous (modèle dans `equipe.md`, § 7) |
| 02 h 45 | **intégration** | Codex | fusion de Groupes et Modules dans sa branche, qui porte déjà le commun, Filières et Enseignements ; contrôle des fichiers de chaque lot ; lint, unitaires, build, `node scripts/verifier-neutre.mjs` ; tailles du § 3 de `equipe.md` ; rapport avec le sha final |
| 03 h 00 | **relecture** | coordinateur | `relecture-branche` sur `feat/uix-06b-referentiel` ; verdict et commandes au chef |

## Ce que chaque lot doit livrer à R1

1. **Inventaire avant et après**, dans sa fiche de session : chaque champ, filtre et action du § 2 du plan, présent pour le même rôle. Une ligne manquante se corrige avant R1.
2. **Repères de taille** (`equipe.md`, § 3) : page 80 lignes, hook 200, composant et dialogue 150.
3. **Textes** : tout texte nouveau dans les dictionnaires du lot, en français et en anglais ; aucun texte en dur.
4. **Tests unitaires** des hooks et utilitaires purs du lot (`npm run test:unit`).
5. **Parcours du lot** dans son fichier : rôles administrateur, responsable, enseignant sans responsabilité, étudiant ; chargement, échec et reprise, liste vide, filtre vide, changements rapides de filtre ; 390 et 1280 px ; français et anglais ; clair et sombre ; axe-core. Les parcours tournent dans la CI de la PR : aucun agent ne lance de serveur (plan, § 8).
6. **Contrôles** : `npm run lint`, `npm run test:unit`, `npm run build` dans `frontend/`.

## UIX-06c : reportée

Le chef a demandé le site vitrine et la grille d'applications pour ce soir, à la place d'UIX-06c (18 nov.). Le plan [uix-06c-ressources-temps.md](../../conception/interface/uix-06c-ressources-temps.md) reste à valider, pour plus tard. Découpage prévu alors :

| Agent | Lot UIX-06c |
|---|---|
| Codex | intégrateur ; communs ; Calendrier |
| Claude (VS Code) | Salles (507 lignes, le plus long écran du site) |
| agent de Cursor | Campus et Créneaux |

Une fiche d'équipe propre à UIX-06c sera écrite à ce moment, avec ses propriétaires.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Valider le plan d'UIX-06c et l'exception hors chantier ? | oui, même méthode qu'UIX-06b, sans changement d'API ni migration | chef |
| 2 | Si R0 n'est pas prêt à 01 h 15, on attend ou on reporte à demain ? | reporter : les lots ne partent jamais sans point de départ commun | chef |

## Prompts

### Codex (intégrateur), maintenant

```text
Tu es l'intégrateur de la mission d'équipe UIX-06b. Lis d'abord AGENTS.md, docs/plan/equipe.md,
puis la fiche docs/plan/missions/uix-06b-equipe.md (branche doc/coordination-equipe,
dossier ..\travaux-planner\coordination-equipe). Ton dossier : ..\travaux-planner\uix-06b-referentiel.
Fais R0 : commite ton travail du 16 nov. en trois commits (git add <fichiers>, jamais git add .),
crée les six dictionnaires vides de src/i18n/referentiel/ et inscris-les dans index.js,
vérifie lint, test:unit et build dans frontend/. Puis dépose « R0 prêt, sha … » dans ta boîte sortie\.
Ensuite, ton lot : commun et Filières, comme dit la fiche. À R1, intègre les lots dans l'ordre de la fiche,
contrôle leurs fichiers, relance les contrôles, et rends compte. Jamais de git push.
```

### Agent de Cursor, après R0

```text
Tu es membre de la mission d'équipe UIX-06b, lot « Groupes et Modules ». Lis d'abord AGENTS.md,
docs/plan/equipe.md, puis la fiche docs/plan/missions/uix-06b-equipe.md
(dossier ..\travaux-planner\coordination-equipe). Crée ton dossier depuis le point de départ :
git worktree add "..\travaux-planner\uix-06b-groupes-modules" -b feat/uix-06b-referentiel-groupes-modules <sha R0>
puis la jonction frontend\node_modules (equipe.md, § 4). Tu n'écris que les fichiers de ton lot (tableau
« Les propriétaires »). Un besoin dans un fichier commun : demande-le dans ta boîte sortie\.
Livre à R1 ce que dit la fiche, puis dépose ton rapport de rendez-vous dans sortie\. Jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 18 nov. 00 h 01 | fiche écrite ; Codex reçoit R0 | — |
| 18 nov. 00 h 20 | Enseignements passe à Codex ; Claude (VS Code) au site vitrine | — |
| 18 nov. 00 h 50 | **R0 fait par Codex : `4963e827`** (trois commits, dictionnaires inscrits ; lint avec 17 avertissements hors du lot, 65 tests unitaires verts, build vert) ; vérifié ; l'agent de Cursor lancé | R0 conforme |
| 18 nov. 02 h 12 | décision du chef : l'agent de Cursor passe au site vitrine ; **Codex tient tout UIX-06b** (Groupes et Modules compris), avec l'inventaire de l'agent de Cursor (00 h 46) ; plus de fusion de lot | — |
