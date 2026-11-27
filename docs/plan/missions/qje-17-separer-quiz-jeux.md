# Mission · QJE-17 · séparer les quiz et les jeux (site, application, offre, plan)

| | |
|---|---|
| État | ouverte : plan à écrire |
| Agent | session Claude neuve (VS Code), à ouvrir par le chef : la mission demande des échanges en cours de route (noms, offre, ordre des étapes) |
| Modèle recommandé | le plus capable : Claude Fable 5.2, sinon Opus 5.5. Tâche large, qui touche le site, l'application web et mobile, l'offre et le plan, avec des collisions à ordonner |
| Attribuée le | 2026-11-26, par le coordinateur ; accord du chef : oui, le 2026-11-26 vers 14 h 35 (dissocier partout ; le module des jeux ne porte pas le nom « quiz ») |
| Module et chantier | [QJE](../modules/QJE-quiz-jeux-ia.md) · **hors chantier**, sur la décision du chef du 26 nov. |
| Fonction | QJE-17 : les quiz et les jeux deviennent deux modules distincts, partout où ils sont aujourd'hui réunis · taille L, découpée en étapes dans le plan |
| Branche | `etude/qje-17-separer-quiz-jeux` pour le plan, depuis `origin/main` ; une branche par étape de code ensuite |
| Dossier de travail | `..\travaux-planner\qje-17-separer-quiz-jeux` |
| Plan de conception | à écrire : `docs/conception/jeux/qje-17-separer-quiz-jeux.md` · **validé par le chef** (noms, offre, plan : choix de produit) |

## Ce que le chef a dit (26 nov., vers 14 h 35)

- Les quiz et les jeux **ne sont pas la même chose et doivent être dissociés**.
- **Partout** : le site, l'application, l'offre et le plan.
- **Le module des jeux ne porte pas le nom « quiz »**, qui prête à confusion.
- VIT-20f (Codex, les logos du registre du site) **continue** : la séparation vient après, dans sa propre étape.

## La différence

| | Quiz | Jeux |
|---|---|---|
| Contenu | écrit par l'enseignant dans le Studio quiz | livré avec Planner : le terminal (`shared/jeux/`) et dix simulations à défis (`shared/simulations/`), d'Alexis, plus tard de créateurs (QJE-05, QJE-08) |
| Ce que fait l'élève | répondre à des questions | réussir des défis vérifiés par un moteur, avec niveaux et expérience |
| Façons de jouer | en direct (code ou QR), à son rythme, questionnaire non noté, plus tard évaluation notée (QJE-10) | sur le téléphone, ou au tableau en collectif |
| Serveur | `quizRoutes`, `studioQuizRoutes`, `quizDirectRoutes`, `quizIaRoutes` | `jeuxRoutes`, `sessionJeuRoutes` |
| Fonctions | QJE-02, QJE-03, QJE-10, QJE-11, QJE-14 | QJE-04, QJE-05, QJE-08, QJE-09, QJE-15, M-11 |

## Où ils sont réunis aujourd'hui (relevé du coordinateur, à compléter par l'agent)

1. **Site** : un seul module `quizEtJeux` (`vitrine/src/donnees/modules.js`, page `/quiz-et-jeux`, logo `activites` : « manette, bulle de question ») ; la page « Bibliothèque des jeux » à côté ; VIT-23 (#282) prend l'illustration `activites` pour cette page.
2. **Application** : l'entrée « Quiz » du sélecteur d'espaces (`shared/espaces.js`) envoie l'enseignant sur « Activités » (`/jeux`), l'étudiant sur `/quiz` (QJE-01) ; la page `/jeux` du web (`frontend/src/pages/jeux/`) ; l'onglet `jeux.jsx` et le scanner du mobile.
3. **Offre** : l'étude 15 (`docs/etude-marche/15-modules-et-packs.md`) vend « Quiz et jeux » comme un seul module (n° 4), dans le pack « Classe ».
4. **Plan** : un seul module, [QJE « quiz, jeux, IA »](../modules/QJE-quiz-jeux-ia.md).

## Critère de « terminé » (de la mission entière, étape par étape)

- Le plan donne les deux noms, validés par le chef ; le nom du module des jeux ne contient pas « quiz ».
- Site : deux applications, deux pages, deux tuiles, deux logos dans le style de VIT-09d ; l'ancienne adresse `/quiz-et-jeux` redirige ; aucun texte ne réunit les deux sous un seul nom.
- Application (web et mobile) : deux entrées distinctes ; « Quiz » ne mène plus à la page des jeux ; les écrans de chacun ne nomment pas l'autre ; aucune route ni donnée n'est cassée.
- Offre : deux modules vendables, chacun allumé ou éteint seul.
- Plan : deux modules dans `docs/plan/modules/`, chaque fonction QJE rangée dans l'un ou l'autre (ou dans l'IA), `suivi.md` mis à jour par le coordinateur.
- Tests du site, du web, du mobile, parcours (`sessionsJeu`, quiz en direct), `verifier-neutre`, axe-core sur les pages touchées.

## Périmètre d'écriture

**Pour l'étape du plan, l'agent écrit seulement :**

- `docs/conception/jeux/qje-17-separer-quiz-jeux.md` (le plan) ;
- sa fiche de session.

Le périmètre de chaque étape de code sera fixé par le coordinateur après le visa du plan.

L'agent ne touche pas (missions ouvertes) :

- `vitrine/src/donnees/modules.js`, `vitrine/src/components/applications/logos.js` : VIT-20f (Codex) ;
- `vitrine/src/components/socle/`, les en-têtes et `bibliotheque-des-jeux.astro` : VIT-23 (#282) ;
- `shared/simulations/catalogue/`, `shared/jeux/`, `frontend/src/pages/jeux/Jeux.jsx`, `mobile/src/app/(onglets)/jeux.jsx` : M-11 et QJE-15 (agent de Cursor), #229 (Alexis) ;
- le joueur des quiz du mobile : QJE-03 (#280, Codex) ;
- le Studio quiz : QJE-14 ;
- `docs/plan/suivi.md`, `docs/plan/modules/` et l'étude 15 : le plan **propose** leurs changements, le coordinateur et le chef les font après le visa ;
- tout le reste : s'il doit en sortir, il s'arrête et le demande.

## Ce qui est déjà décidé

- Dans les écrans et les messages, le quiz s'appelle « Quiz » ; « PlannerQuiz » et « ClassQuiz » ne sont plus que des noms techniques.
- QJE-01 (entrée « Quiz » dans Planner, plus ClassQuiz) est faite (#208).
- Charte v3 et logos de la série B (VIT-09d, #277) : un logo nouveau suit ce style.
- Le dépôt est public : aucun nom d'école ni de pays dans les textes.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Le nom du module des jeux (sans « quiz ») | l'agent en propose deux ou trois, avec le risque de confusion de chacun (« Bibliothèque des jeux » côtoie le module « Bibliothèque » des documents) | chef |
| 2 | Le nom du module des quiz | « Quiz » | chef |
| 3 | Où vont les fonctions d'IA (QJE-07, QJE-12, QJE-13, préparation des quiz par l'IA) ? | la préparation des quiz suit les quiz ; les autres restent un sujet à part, à ranger dans le plan | chef |
| 4 | Les codes des deux modules du plan, et le sort des identifiants QJE-xx existants | garder les identifiants faits comme historiques, deux fichiers de module avec une table de correspondance | coordinateur, puis chef |
| 5 | Le logo : lequel garde `activites`, et qui dessine le second ? | `activites` est refait pour les jeux (manette seule), un logo nouveau pour les quiz, dans le style de VIT-09d | chef, sur l'essai |
| 6 | L'ordre des étapes et leur agent | plan, puis plan du module et offre (documents), puis site, puis application ; chaque étape après la fusion des missions qui tiennent ses fichiers | coordinateur |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : QJE-17, séparer les quiz et les jeux partout où ils sont réunis
(site, application web et mobile, offre, plan), sur la décision du chef du 26 nov. Le module des jeux
ne doit pas porter le nom « quiz ».
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md (sur main, ou sur la branche
doc/coordination-2026-11-27 si elle n'est pas fusionnée), puis ta fiche de mission
docs/plan/missions/qje-17-separer-quiz-jeux.md (même endroit).
Branche : etude/qje-17-separer-quiz-jeux, depuis origin/main, dans le dossier
..\travaux-planner\qje-17-separer-quiz-jeux.
Étape 1, le plan seul : complète le relevé « où ils sont réunis » (site, web, mobile, serveur, offre, plan),
pose les questions de la fiche avec tes propositions, puis écris docs/conception/jeux/qje-17-separer-quiz-jeux.md
(modèle docs/plan/modeles/conception.md) : les deux noms, ce qui change dans chaque partie, les étapes,
leur ordre par rapport aux missions ouvertes (VIT-20f, VIT-23, QJE-15, QJE-03, QJE-14, #229), et les tests.
Commite le plan seul ; le chef le valide. Aucun code dans cette étape.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Règles : questions avant toute supposition ; fiche de session à jour, suivi.md non modifié ;
tout est commité ; jamais de git push. Quand le plan est commité, dis-le au coordinateur.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-26 14 h 35 | fiche écrite sur la décision du chef ; VIT-20f continue | — |
