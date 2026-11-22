# Mission d'équipe · VIT-20 · structure du site sur le modèle d'Odoo

| | |
|---|---|
| État | ouverte : en attente de R0 (après la fusion de #254 et #223, et le visa de la version 2 du plan) |
| Attribuée le | 2026-11-22, par le coordinateur (session `plan-b-projet-pacte-2e`) ; accord du chef : conduite en équipe le 22 nov. (question 4), VIT-15 fondue (question 17) |
| Module | [VIT](../modules/VIT-site-vitrine.md) · étape 1 de la [feuille de route](../feuille-de-route.md) |
| Fonction | VIT-20 : barre à méga-menus, 17 modules en quatre catégories, une page par module disponible avec le bloc « selon votre équipement », socle inclus, accueil resserré avec « Pourquoi Planner » animé, pied de page en quatre colonnes · taille L |
| Branche d'intégration | `feat/vit-20-structure-du-site`, depuis `origin/main` à jour, dans `..\travaux-planner\vit-20-structure-du-site` |
| Plan de conception | [vit-20-structure-du-site.md](../../conception/vitrine/vit-20-structure-du-site.md), version 2 · choix validés par le chef ; texte à viser |
| Règles d'équipe | [docs/plan/equipe.md](../equipe.md) |

## L'équipe

| Lot | Rôle | Agent | Modèle, et pourquoi | Branche | Dossier |
|---|---|---|---|---|---|
| R0 + B · pages de module, socle, catalogue, redirections | **intégrateur** | session Claude Code (VS Code) **à ouvrir** | **Claude Fable 5.2**, sinon Opus 5.5 : le lot le plus large, les fichiers communs et l'intégration | `feat/vit-20-structure-du-site` | `..\travaux-planner\vit-20-structure-du-site` |
| A · navigation (en-tête, méga-menus, pied de page) | membre | **agent de Cursor**, après M-11 et M-12 | **Grok 4.7, raisonnement élevé** (décision du chef du 18 nov. pour Cursor) : lot borné, plan précis, parcours existants pour modèle | `feat/vit-20-structure-du-site-navigation` | `..\travaux-planner\vit-20-navigation` |
| C · accueil et « Pourquoi Planner » animé | membre | session Claude Code (VS Code) **à ouvrir** | **Claude Opus 5.5** : un composant interactif et animé, accessible au clavier et sans JavaScript ; le chef en attend le rendu | `feat/vit-20-structure-du-site-accueil` | `..\travaux-planner\vit-20-accueil` |
| D · « Selon votre équipement » | membre | **Codex**, après MKT-09 et VIT-09c | **son modèle le plus fort, raisonnement élevé** : phrases à prouver dans le code, étude EP-18 ; il tenait VIT-15 et le registre de VIT-11 | `feat/vit-20-structure-du-site-equipement` | `..\travaux-planner\vit-20-equipement` |

Pourquoi ce partage : l'intégrateur doit recevoir des messages directs et rester jusqu'à la fin, d'où une session Claude ; C demande des allers-retours sur le rendu, d'où une session Claude ; A et D sont bornés par le plan et vont aux agents des boîtes, chacun dans le prolongement de sa file.

## Les propriétaires

Chemins relatifs à `vitrine/`. Un fichier absent de ce tableau est **en lecture seule** pour tous : il se demande au coordinateur.

| Fichier ou dossier | Propriétaire |
|---|---|
| `src/donnees/modules.js`, `src/donnees/site.js` (créés à R0) | intégrateur |
| `src/i18n/langues.js` | intégrateur |
| `src/i18n/*/commun.json` (tous les libellés du § 4.7, posés à R0), `src/i18n/*/modules.json` (créé à R0) | intégrateur |
| `astro.config.mjs` (redirections) ; `.github/workflows/vitrine.yml` (à la racine du dépôt, si un parcours s'ajoute) | intégrateur |
| `src/components/applications/` **sauf** `equipement/` | intégrateur (B) |
| `src/pages/[lang]/applications/`, `src/pages/[lang]/socle.astro` ; suppression des pages `emploi-du-temps`, `en-classe`, `quiz-et-jeux`, `cours-et-annonces`, `bibliotheque`, `application`, `etablissement` | intégrateur (B) |
| `src/donnees/fonctionnalites.json`, `src/components/catalogue/` (dont la suppression de `MenuFonctions.astro` à l'intégration) | intégrateur (B) |
| `src/components/fonctions/`, `src/components/solutions/` (liens seulement) | intégrateur (B) |
| `src/i18n/*/` : `fonctionnalites`, `emploi-du-temps`, `en-classe`, `cours-et-annonces`, `quiz-et-jeux`, `bibliotheque`, `bibliotheque-des-jeux`, `etablissement`, `application`, `direction`, `scolarite`, `enseignants`, `etudiants`, `faq`, `solutions` (`.json`) | intégrateur (B) ; les phrases sur la Bibliothèque ne changent qu'après le visa du chef |
| `tests/modules.test.js`, `tests/applications.test.js` (créés), `tests/fonctionnalites.test.js`, `tests/contenu.test.js`, `tests/traductions.test.js` | intégrateur (B) |
| `src/components/socle/EnTete.astro` (et `EnTete.css` s'il faut le couper), `src/components/navigation/` (créé), `src/components/socle/PiedDePage.astro` | A |
| `tests/navigation.test.js` (créé), `tests/solutions.test.js`, `tests/roles.test.js`, `tests/correctifs.test.js`, `tests/menu-fonctions.parcours.cjs` | A |
| `src/pages/[lang]/index.astro`, `src/components/accueil/` (sans supprimer `QuizJeux`, `Report`, `Bientot` : l'intégrateur le fait) | C |
| `src/i18n/*/accueil.json` | C |
| `tests/accueil.test.js`, `tests/comparatif-interactif.test.js` (créés), `tests/video.test.js` | C |
| `src/components/applications/equipement/`, `src/donnees/equipement.js` (créés) | D |
| `src/i18n/*/equipement.json` (créés vides par l'intégrateur à R0, puis à D) | D |
| `tests/equipement.test.js` (créé) ; `docs/conception/vitrine/vit-20d-equipement.md` (tableau des phrases, à la racine du dépôt) | D |
| `docs/plan/modules/VIT-site-vitrine.md`, la fiche de session de la fonction | intégrateur |
| la fiche de session de chaque lot (`docs/sessions/2026-11-…-<branche de lot>.md`) | chaque membre |
| `docs/plan/suivi.md`, `docs/plan/decisions.md`, cette fiche | coordinateur |

En lecture seule pour tous : `shared/icones/` et `shared/charte/` (VIT-09c, Codex, sur sa propre branche), `src/components/comparer/`, `src/i18n/*/comparer.json`, `scripts/`, `src/components/socle/` hors `EnTete` et `PiedDePage`.

## Les rendez-vous

| Rendez-vous | Qui | Condition | Ce qui se passe |
|---|---|---|---|
| **Avant R0** | chef | — | visa du texte de la version 2 du plan ; fusion de #254 et #223 ; captures d'Odoo |
| **R0, départ** | intégrateur | les trois points ci-dessus | branche d'intégration depuis `origin/main` ; contrat commun (§ 5 du plan) : `modules.js`, `site.js`, `langues.js`, `commun.json` et `modules.json` (fr, en, ar), `GrilleModules.astro` et `TuileModule.astro`, `equipement.json` vides, squelette de `PageModule.astro` avec une place pour le bloc de D ; `modules.test.js` ; build et tests verts ; **sha annoncé** |
| **R1-D, phrases** | D | R0 | tableau des phrases du bloc (français, anglais, source) dans `vit-20d-equipement.md` ; le coordinateur le porte au chef |
| **R1-A, R1-C** | A, C | R0 | lot commité, contrôles verts, rapport (modèle du § 7 d'`equipe.md`) |
| **R2-D, code** | D | visa du chef sur R1-D | bloc codé et testé, rapport |
| **Intégration** | intégrateur | B fini, puis A, C, D | fusion dans l'ordre **A, C, D** ; contrôle des fichiers (§ 6 d'`equipe.md`) avant chaque fusion ; tests, parcours, axe-core, EP-19 ; captures à 390 et 1440 px dans `..\travaux-planner\captures-vit-20\apres\` ; sha annoncé |
| **Relecture** | coordinateur | intégration annoncée | skill `relecture-branche` sur le périmètre réuni ; rapport et commandes au chef ; une seule PR |

## Ce qui est déjà décidé

- Les 18 réponses du chef du § 3 du plan, et les décisions du 22 nov. dans `decisions.md`.
- Règle de VIT-14 : aucun produit nommé sur le site. Règles des textes : ne promettre que ce qui existe ; le supérieur d'abord (D4) ; aucun pays, aucune monnaie, aucun nom d'école, aucun prix.
- 160 caractères au plus par ligne ; repères de taille d'`equipe.md`, § 3 ; `git add <fichiers>` ; jamais de `git push`.

## Les travaux voisins

À transmettre par le chef à l'autre session de coordination quand elle reprend (elle tient ces missions) :

- **VIT-15** est fondue dans VIT-20 (lot D) : sa fiche passe à « close », et elle sort de la file de Codex.
- **VIT-16** (Contact, À propos) : avant la fusion de VIT-20, elle ne touche ni `EnTete.astro`, ni `PiedDePage.astro`, ni `components/accueil/` ; le lien de contact passe par la constante de `langues.js`, que l'intégrateur change après la fusion de VIT-16.
- **VIT-09b** (#227) refait son plan sur le nouvel accueil, après VIT-20.
- **VIT-09c** continue sur sa branche : ses logos remplissent les places réservées après coup.

## Prompts

### Intégrateur (session Claude Code à ouvrir, Claude Fable 5.2 sinon Opus 5.5)

```text
Tu travailles sur Planner. Tu es l'intégrateur de la mission d'équipe VIT-20 (structure du site sur le modèle d'Odoo).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/equipe.md, puis la fiche docs/plan/missions/vit-20-equipe.md
et le plan docs/conception/vitrine/vit-20-structure-du-site.md (version 2), sur la branche doc/coordination-2026-11-22.
Crée la branche feat/vit-20-structure-du-site depuis origin/main à jour, dans ..\travaux-planner\vit-20-structure-du-site.
Fais R0 (contrat commun de la fiche), vérifie build et tests, annonce le sha au coordinateur (session plan-b-projet-pacte-2e).
Puis code le lot B. Tu n'écris que les fichiers dont la fiche te fait propriétaire. Intègre A, C, D dans cet ordre,
après le contrôle des fichiers de chaque lot. Questions avant toute supposition ; fiche de session de la fonction ;
suivi.md non modifié ; tout est commité ; jamais de git push.
```

### Lot C (session Claude Code à ouvrir après R0, Claude Opus 5.5)

```text
Tu travailles sur Planner. Tu es membre de la mission d'équipe VIT-20, lot C : l'accueil et « Pourquoi Planner » animé.
Lis d'abord AGENTS.md, docs/plan/equipe.md, la fiche docs/plan/missions/vit-20-equipe.md et le plan
docs/conception/vitrine/vit-20-structure-du-site.md (§ 4.3 et § 4.8), sur la branche doc/coordination-2026-11-22.
Crée feat/vit-20-structure-du-site-accueil depuis le sha de R0 <SHA>, dans ..\travaux-planner\vit-20-accueil.
Tu n'écris que les fichiers du lot C. Un fichier commun se demande au coordinateur (session plan-b-projet-pacte-2e).
Rends compte à R1-C avec le modèle du § 7 d'equipe.md. Fiche de session de ton lot ; jamais de git push.
```

### Lot A (boîte de l'agent de Cursor, après R0, Grok 4.7 élevé)

```text
Mission d'équipe VIT-20, lot A : la navigation (en-tête, méga-menus Applications, Établissements, Ressources, pied de page).
Lis AGENTS.md, docs/plan/equipe.md, la fiche docs/plan/missions/vit-20-equipe.md et le plan
docs/conception/vitrine/vit-20-structure-du-site.md (§ 4.2 et § 4.5), branche doc/coordination-2026-11-22.
Après M-11 et M-12 : crée feat/vit-20-structure-du-site-navigation depuis le sha de R0 <SHA>,
dans ..\travaux-planner\vit-20-navigation. Tu n'écris que les fichiers du lot A.
Rapport R1-A dans ta boîte sortie\, modèle du § 7 d'equipe.md. Fiche de session de ton lot ; jamais de git push.
```

### Lot D (boîte de Codex, après R0, son modèle le plus fort)

```text
VIT-15 est fondue dans VIT-20 (décision du chef du 22 nov.) : ne commence pas VIT-15.
À la place, après MKT-09 et VIT-09c : mission d'équipe VIT-20, lot D, le bloc « Selon votre équipement ».
Lis AGENTS.md, docs/plan/equipe.md, la fiche docs/plan/missions/vit-20-equipe.md et le plan
docs/conception/vitrine/vit-20-structure-du-site.md (§ 4.9), branche doc/coordination-2026-11-22, puis l'étude EP-18 (#253).
Crée feat/vit-20-structure-du-site-equipement depuis le sha de R0 <SHA>, dans ..\travaux-planner\vit-20-equipement.
D'abord R1-D : le tableau des phrases (français, anglais, source dans le dépôt) dans docs/conception/vitrine/vit-20d-equipement.md,
commité seul ; aucun code avant le visa du chef. Puis R2-D. Tu n'écris que les fichiers du lot D.
Rapports dans ta boîte sortie\. Fiche de session de ton lot ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-22 | fiche écrite ; prompts prêts ; boîtes non écrites (l'autre coordinateur n'est pas joignable : décision du chef, question 18) | — |
