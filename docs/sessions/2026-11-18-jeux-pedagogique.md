# Session du 2026-11-18 · QJE-04 · `jeux-pedagogique` — corrections B-1, B-2 et I-1

| | |
|---|---|
| Fait par | Agent d'IA d'Alexis (`Destroya2`), sur le dépôt `plan_B_projet_PACTE` |
| Chantier | QJE, ouvert par exception le 10 novembre pour QJE-04 seule |
| Dossier de travail | `c:\Users\USER\Desktop\CLAUDE LK\plan_B_projet_PACTE` |
| Dernier commit | `22366dc0` — aucun commit, push ni migration appliquée pendant la session |

## Objectif de la session

Appliquer les corrections B-1 (catalogue et écrans neutres), B-2 (référence du Labo Big-O) et I-1
(solution explicite, notée par le serveur, sans réponse après un échec), plus le nettoyage limité
autour des fichiers touchés. Périmètre confirmé : **les dix simulations et leurs trente défis**.
**Le Terminal Linux et le jeu collectif ne changent pas.** **Les points et les réussites déjà
enregistrés sont conservés** : la migration 0080 est purement additive.

## Plan

Conception validée : [docs/conception/jeux/qje-04-solution.md](../conception/jeux/qje-04-solution.md)
(validée par le chef de projet avant le code). Contrat : [jeux-pedagogiques](../conception/jeux/jeux-pedagogiques.md)
(§ 1, § 1.0 et § 6).

## Fait

**B-1 — aucun nom d'école, aucune URL d'école**
- `shared/simulations/catalogue/_aide.js` : `curriculum(disciplineFr, disciplineEn)` ne rend plus que
  `{ discipline, niveaux: [1, 2, 3] }` ; le registre d'URL d'école est supprimé.
- Les dix entrées du catalogue (`robot-route`, `threshold-lab`, `stock-pilot`, `tri-cyber`, `quete-sql`,
  `topo-reseau`, `cpu-process`, `sprint-agile`, `budget-erp`, `big-o-lab`) passent à la discipline bilingue.
- `shared/simulations/i18n.js` : textes de cadre neutres ; clé `curriculum` = discipline + niveaux.
- Consommateurs mis à jour en texte, jamais en lien externe vide : `CatalogueJeux.jsx`, `Jeux.jsx`,
  `pages/jeux/JeuSimulation.jsx`, `mobile/src/app/simulation.jsx`.
- L'attribution et la licence des jeux tiers restent affichées telles quelles.

**B-2 — Labo Big-O**
- `mobile/__tests__/simulations.test.js` utilise le vrai hook `useSimulation` et couvre les dix
  simulations ; l'entrée de référence est `complexite-01` (`classes: [1, 2, 3, 5]`, saisies `1/2/3/5`).
- Un test vérifie que **chaque** simulation a une réponse de référence pour son premier défi.
- L'ID erroné `big-o-01` est corrigé en `complexite-01` dans la fiche du 10 novembre et dans
  `docs/conception/jeux/jeux-pedagogiques.md` ; aucun défi stocké n'est renommé.

**I-1 — solution explicite, notée par le serveur**
- `backend/migrations/0082-jeux-solutions.js` : table `JeuxEtatsDefis` (clé primaire, `id_user` en
  cascade, `code_jeu`, `id_defi`, `echecs` par défaut 0, `solution_vue_le` nullable, horodatages,
  clé unique `(id_user, code_jeu, id_defi)`) et colonne `JeuxProgressions.avec_solution` (faux par défaut).
- `backend/models/JeuEtatDefi.js`, `backend/models/definitions.js`, `backend/models/index.js` :
  modèle enregistré, y compris dans le résolveur par établissement ; transactions sur la connexion
  du modèle courant.
- `backend/services/jeux/etatsDefis.js` : création puis verrou `UPDATE` de la ligne d'état dans une
  transaction ; `vueEtatDefi` distingue « solution vue » de « réussite aidée ».
- `backend/services/jeux/solutionsReference.js` : les trente réponses de référence restent côté
  serveur et sont validées par les vrais moteurs ; aucune solution ni aucun score ne vient du client.
- `backend/services/jeux/simulations.js` : essais et solution partagent la même transaction ;
  `echecs` ne compte que les échecs bien formés évalués par le serveur ; réussite aidée = 0 point et
  `avec_solution: true` ; réussite antérieure non aidée jamais requalifiée ; échec de persistance =
  aucune réponse renvoyée.
- `backend/routes/jeuxRoutes.js`, `backend/app.js` : `POST /api/jeux/:code/defis/:idDefi/solution`
  (corps vide seulement), authentification ciblée avant CSRF sans exempter le jeton ; 401 anonyme,
  403 hors module, 404 jeu/défi inconnu, 400 champ en trop.
- `shared/simulations/moteurs/{sql,triage,complexite}.js` et leurs `presentations/` : plus aucun
  `attendu`, ni colonne de réponse attendue après un échec ; messages localisés sans réponse.
- `shared/simulations/session.js` : action `voirSolution`, état par défi (`echecs`, `solution_vue`,
  `sans_points`), garde anti-double-clic et annulation des réponses périmées.
- Web : `pages/jeux/JeuSimulation.jsx`, `components/jeux/SolutionSimulation.jsx` (panneau en lecture
  seule, coût en points affiché, aucune soumission automatique), bilan seulement après réussite
  confirmée ou solution chargée ; `CatalogueJeux.jsx`, `Jeux.jsx`, i18n.
- Application : `src/app/simulation.jsx`, `src/jeux/SolutionSimulation.jsx`, `src/jeux/useSimulation.js`.
- Suivi enseignant : `components/jeux/session/SuiviModuleDialog.jsx` extrait de `Jeux.jsx` (le fichier
  **maigrit** de 43 lignes utiles) et `SuiviIndividuel.jsx` affichent « réussi avec la solution », le
  nombre de défis aidés et les titres concernés dans le module ; ces défis comptent comme terminés,
  jamais comme des points gagnés.
- Nettoyage : `mobile/jest.resolver.js` sans condition ni import inutile ; commentaire
  Babel/Reanimated de `mobile/babel.config.js` remis après vérification de la documentation Expo SDK 57
  (le plugin est déjà branché par `babel-preset-expo`, aucun ajout manuel).

**Tests ajoutés ou réécrits**
- `backend/tests/utils/simulations.test.js` : métadonnées neutres, plus d'`attendu` dans aucun des
  dix moteurs, les trente références passent, une saisie mal formée reste refusée.
- `backend/tests/utils/simulationService.test.js` : verrou et transaction, échecs comptés, solution
  consultée puis réussite à 0 point, points antérieurs conservés, erreurs de persistance sans fuite.
- `backend/tests/integration/simulations.test.js` : 401 sans compte, 403 sans CSRF ou hors module,
  404 jeu/défi inconnu, 400 champ en trop, trois échecs après rechargement, solution et réussite
  concurrentes sur le même défi, isolement entre utilisateurs et entre défis, accès révoqué.
- `backend/tests/utils/simulationSession.test.js` : état par défi restauré depuis `progression`,
  solution demandée une seule fois, réponse tardive ignorée après changement de défi, 401/403/404 et
  panne réseau sans réponse locale, réussite aidée à 0 point listée séparément.
- `mobile/__tests__/simulations.test.js` : vrai hook, dix simulations, échec qui cache le bilan,
  rechargement qui restaure l'état, recommandation après trois échecs, révélation explicite unique.
- `frontend/tests/simulations/games.spec.cjs` : transport simulé complet (état par défi, solution,
  `etats`), boucle sur les **dix** jeux dont `big-o-lab`, bilan caché après un échec, révélation
  explicite à 0 point, points conservés après réussite, suivi enseignant, français et curriculum neutre.

## Vérifié

| Contrôle | Commande | Résultat |
|---|---|---|
| Tests serveur | `npm test` dans `backend/` | 26 suites, **443 tests passés**, 0 échec |
| Lint serveur | `npm run lint` dans `backend/` | 0 erreur, 17 avertissements préexistants (`max-lines`) |
| Tests du site | `npm run test:unit` dans `frontend/` | **42 tests passés**, 0 échec |
| Build du site | `npm run build` dans `frontend/` | construit en 1 min 13 s (avertissement de taille de morceaux, antérieur) |
| Lint du site | `npm run lint` dans `frontend/` | 0 erreur, 24 avertissements ; `Jeux.jsx` garde son seul `max-lines` (327 lignes, en baisse) |
| Tests de l'application | `npm test` dans `mobile/` | 17 suites, **77 tests passés**, 0 échec |
| Lint de l'application | `npm run lint` dans `mobile/` | 0 erreur, 3 avertissements préexistants (`src/i18n.js`) |
| Neutralité | `node scripts/verifier-neutre.mjs` | « Aucun nom d'école écrit en dur » (6 exceptions justifiées) |
| Audit Playwright dédié | `npx playwright test --config playwright.simulations.config.cjs` | **36 tests passés** en 10 min : 18 scénarios × bureau 1366×900 et téléphone 390×844 |
| Typecheck application | recherche de `tsconfig` | aucun `tsconfig` : pas de contrôle TypeScript configuré ; pas de migration TS introduite |

**Non exécuté, et pourquoi** : les **tests d'intégration** (`npm run test:integration`) exigent une base
MySQL jetable `hestim_test` sur `127.0.0.1:3307`. Le démon Docker n'est pas disponible sur ce poste et
le port 3307 est fermé : les tests ont été écrits mais **n'ont pas été lancés ici**. Ils doivent passer
en CI ou sur un poste avec la base de test décrite dans `backend/tests/integration/setupEnv.js`.
La migration **0080 n'a été appliquée à aucune base**, en particulier pas à la base applicative.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Faut-il une table dédiée pour les échecs et la solution vue ? | Oui : `JeuxEtatsDefis` (migration 0080), `reussi_le` étant obligatoire | tranché le 13 nov. |

## État laissé

- `docs/plan/suivi.md` : QJE-04 → corrections faites le 18 nov., tests locaux verts, **fusion en
  attente** ; migration 0080 → écrite, non appliquée.
- `docs/plan/modules/QJE-quiz-jeux-ia.md` : table `JeuEtatDefi` ajoutée, dix simulations décrites,
  QJE-04 « en cours : corrections faites, PR à ouvrir ».
- Chantier QJE : reste **QJE-04 seule** (puis QJE-05 à QJE-07).
- Rien n'est commité, poussé, fusionné ni déployé.

## Reste à faire, dans l'ordre

1. Relire le diff complet de `jeux-pedagogique` (48 fichiers modifiés, 8 ajoutés) et ouvrir **une** PR
   vers `main` ; le chef de projet fusionne.
2. Faire tourner `npm run test:integration` en CI avec la base MySQL jetable (ou sur un poste avec
   Docker) : les tests d'intégration de cette session n'ont pas encore tourné.
3. À la mise en production : appliquer la migration **0080 avant** le serveur et les clients mis à jour.
4. Vérifier en recette le parcours « trois échecs → voir la solution → réussite à 0 point » et le
   suivi enseignant sur les dix jeux.

## Commandes pour le chef de projet

```powershell
git -C "c:\Users\USER\Desktop\CLAUDE LK\plan_B_projet_PACTE" status
git -C "c:\Users\USER\Desktop\CLAUDE LK\plan_B_projet_PACTE" push -u origin jeux-pedagogique
gh pr create --base main --head jeux-pedagogique --title "QJE-04 : jeux-pedagogique, corrections B-1, B-2 et I-1" --fill
```

## Prompt de reprise

```text
Tu reprends QJE-04 (fusion de jeux-pedagogique) du chantier QJE, sur la branche jeux-pedagogique,
dans le dossier "c:\Users\USER\Desktop\CLAUDE LK\plan_B_projet_PACTE".
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la conception
docs/conception/jeux/qje-04-solution.md, le contrat docs/conception/jeux/jeux-pedagogiques.md
(§ 1, § 1.0, § 6) et cette fiche (docs/sessions/2026-11-18-jeux-pedagogique.md).
Fait : B-1 (catalogue et écrans neutres), B-2 (référence complexite-01, vrai hook mobile),
I-1 (solution explicite notée par le serveur, migration 0080, aucune réponse après un échec,
suivi enseignant « réussi avec la solution »), nettoyage mobile limité.
Vérifié en local : backend 443 tests, frontend 42 tests + build, mobile 77 tests, lint sans erreur,
verifier-neutre OK, Playwright simulations 36 sur 36 (bureau et téléphone).
Reste : tests d'intégration (base MySQL jetable indisponible ici), relecture et PR ; migration 0080
à appliquer avant le déploiement. Rien n'est commité, poussé ni fusionné.
Questions en attente : aucune.
Règles : périmètre des dix simulations (Terminal Linux et jeu collectif inchangés), points déjà
gagnés conservés, pas de code hors conception validée, questions avant toute supposition,
fiche de session et suivi.md à jour en fin de session, jamais de git push.
```
