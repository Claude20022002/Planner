# Mission · QJE-14 · un Studio quiz « comme Google Forms »

| | |
|---|---|
| État | plan validé par le chef le 21 nov. (`dfefc613`, branche `doc/qje-14-studio-forms`) ; ensuite QJE-14a, plan court (migration A : au chef) |
| Agent | à attribuer. Proposition : Claude (VS Code), après le plan court d'UIX-10a |
| Modèle recommandé | le plus capable disponible : c'est un choix de produit, avec des réponses d'élèves et de l'anonymat |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. (« notre propre espace pour les quiz des profs, comme Google Forms ») |
| Module et chantier | [QJE](../modules/QJE-quiz-jeux-ia.md) · rattachée à l'exception de la sortie de ClassQuiz ([sortie-classquiz](sortie-classquiz.md)) ; à confirmer par le chef au moment du plan |
| Fonction | QJE-14 : donner au Studio quiz ce qu'un enseignant attend de Google Forms · taille L probable, découpée dans le plan |
| Branche | `doc/qje-14-studio-forms` pour le plan, depuis `origin/main` |
| Plan de conception | `docs/conception/jeux/qje-14-studio-forms.md`, à écrire · **validé par le chef** (choix de produit, réponses d'élèves) |

## Ce que le chef veut en plus du Studio (18 nov.)

1. **Sections et logique** : des pages ou des sections, et des questions qui s'affichent selon la réponse précédente.
2. **Tableau des réponses** : toutes les réponses par question et par élève, des graphiques de synthèse, un export CSV ou Excel.
3. **Questionnaires non notés** : enquête, inscription, avis sur un cours, avec des réponses anonymes possibles.
4. **Simplicité de création** : une seule page, une question ajoutée en un clic, un aperçu immédiat, le glisser-déposer.

## Ce qui existe

- Le **Studio quiz** : dix types de questions, des médias, la passation à son rythme par lien, code ou QR, le direct en classe, la génération par l'IA, l'import depuis ClassQuiz (`studioQuizRoutes`, `passationRoutes`, `quizDirectRoutes`, `services/studio/*`, `shared/quiz/studio/*`, `pages/studio/*`).
- Le **sondage de l'enseignant à sa classe** (COU-01, EC-9, migration 0059) : anonyme, derrière un interrupteur de l'école. Le plan dit si les questionnaires non notés le **remplacent** ou le **complètent**, pour ne pas avoir deux outils qui font la même chose.
- Le plan de [sortie de ClassQuiz](../../archives/plans/sortie-classquiz.md), validé le 20 oct. : aucun code repris du fork.

## Ce que le plan doit établir

- L'écart, point par point, entre le Studio d'aujourd'hui et les quatre attentes du chef.
- Le **modèle de données** (sections, conditions, réponses, anonymat) et ses migrations. Les numéros se réservent auprès du coordinateur.
- **L'anonymat et les données d'élèves** : qui voit quoi ; une réponse anonyme ne doit jamais pouvoir être rattachée à un élève, ni par l'export ni par l'heure ; durée de conservation (loi 09-08). Ce point remonte au chef.
- L'export : ce qu'il contient, qui peut le faire, et sans aucun envoi à un service extérieur.
- Le découpage en fonctions courtes, chacune avec son plan court.

## Périmètre d'écriture (plan seulement)

Le plan, `docs/plan/modules/QJE-quiz-jeux-ia.md` (la ligne QJE-14) et sa fiche de session. L'agent ne touche pas à `docs/plan/suivi.md`.

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 14 h 00 | fiche écrite, sur décision du chef | — |
| 2026-11-22 | plan validé par le chef le 21 nov. (24 réponses, découpage 14a à 14e) ; migrations 0084 (A), 0085 (B), 0086 (C) réservées par le coordinateur ; QJE-14a ensuite | — |
