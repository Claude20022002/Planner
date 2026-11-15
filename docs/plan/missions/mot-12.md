# Mission · MOT-12 · Montée du solveur

| | |
|---|---|
| État | **prise par une autre session** le 2026-11-15 : plan commité, code en cours |
| Agent | une session Claude Code (Opus 5.5) que le coordinateur n'a pas lancée ; retirée de la file de la session de VS Code le 2026-11-15 |
| Modèle recommandé | le plus capable : Claude Fable 5.2, sinon Opus 5.5. Montée de dépendance majeure, documentation récente à lire, résultat du solveur à garder identique |
| Attribuée le | 2026-11-15, par le coordinateur ; accord du chef : oui, le 2026-11-15 |
| Module et chantier | [MOT](../modules/MOT-moteur.md) · chantier ouvert le 2026-11-15 |
| Fonction | MOT-12 : Spring Boot 3.3.5 vers 4.x, Timefold 1.15 vers 1.31, Java 21 inchangé (décision du 13 novembre), avant MOT-04 ; elle débloque MOT-13b · taille M |
| Branche | `chore/mot-12-montee-solveur`, depuis `main` après #178 |
| Dossier de travail | `..\travaux-planner\mot-12-montee-solveur` |
| Plan de conception | `docs/conception/moteur-planification/mot-12-montee-solveur.md`, commité (`f0678084`) · **validé par le chef le 2026-11-15** (confirmé au coordinateur) |

## Critère de « terminé »

À préciser dans le plan (le module ne donne que l'objet). Proposition du coordinateur, à faire valider avec le plan :

- le solveur tourne sur Spring Boot 4.x et Timefold 1.31, Java 21 ;
- le contrôle « Test Solveur » de la CI est vert, et les parcours qui génèrent un emploi du temps aussi ;
- **le résultat ne change pas** : sur les jeux d'essai existants, même score dur (zéro conflit) et un score souple au moins aussi bon, dans le même temps ou moins, avant et après ;
- `ScoreAnalysis`, qu'emploie le solveur pour expliquer les refus (EP-4), marche toujours ;
- l'image Docker du solveur se construit.

## Ce qui existe

- `solver/pom.xml` : `spring-boot-starter-parent` 3.3.5, `timefold.version` 1.15.0, `java.version` 21.
- `docs/conception/qualite/pile.md`, § 2.6 : Spring Boot 3.3 sans support libre depuis le 30 juin 2025 ; Timefold 1.x en maintenance, la 1.31 est sa dernière version de fonctions ; compatibilité de Timefold 1.x avec Spring Boot 4 **à vérifier**.
- Q-05 (`decisions.md`) : en 2.x, `ScoreAnalysis` devient payant. MOT-12 reste sur la ligne 1.x ; le choix suivant se fait dans MOT-04.

## Périmètre d'écriture

L'agent peut modifier :

- `solver/` (tout le dossier : `pom.xml`, sources, tests, `Dockerfile`)
- `docs/conception/moteur-planification/mot-12-montee-solveur.md` (créé), `docs/conception/moteur-planification/README.md`, `docs/conception/README.md`
- `docs/conception/qualite/pile.md` (la ligne Spring Boot et Timefold du tableau des montées, une fois faite)
- sa ligne de `docs/plan/suivi.md`, `docs/plan/modules/MOT-moteur.md`, sa fiche de session

L'agent ne touche pas :

- `.github/workflows/` : si la CI doit changer (version de Java, image), il le demande d'abord
- `backend/` : le contrat d'appel du solveur ne change pas. S'il doit changer, il s'arrête et le demande
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Décision du 13 novembre : MOT-12 = Spring Boot 4.x, Timefold 1.31, Java 21 inchangé, avant MOT-04.
- La pile est confirmée (QUA-03, 13 novembre) : on reste sur Timefold et Java.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| C-1 | Le critère « le résultat ne change pas » ci-dessus | le retenir ; l'agent dit dans le plan sur quels jeux d'essai il mesure | chef, avec le plan |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : MOT-12 (montée du solveur : Spring Boot 4.x, Timefold 1.31, Java 21), chantier MOT.
Tu es piloté par la session coordinatrice (rôle décidé par le chef le 15 novembre) : tes rapports vont à elle.
Choisis d'abord le modèle : ta fiche recommande le plus capable (Claude Fable 5.2, sinon Opus 5.5) ;
s'il ne tourne pas, dis au chef lequel choisir, et note ton modèle dans ta fiche de session.
Lis d'abord AGENTS.md, CLAUDE.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/mot-12.md, et docs/conception/qualite/pile.md (§ 2.6).
Vérifie avec gh pr list que la PR #178 (MOT-13a) est fusionnée. Si oui, crée la branche
feat/mot-12-montee-solveur depuis origin/main, dans le dossier ..\travaux-planner\mot-12-montee-solveur.
Sinon, dis-le et attends.
Lis le code du solveur, cherche dans la documentation officielle de Spring Boot 4 et de Timefold 1.31
ce qui casse (ne te fie pas à ta mémoire sur ces versions), pose tes questions, puis écris le plan
docs/conception/moteur-planification/mot-12-montee-solveur.md d'après docs/plan/modeles/conception.md.
Le plan est validé par le chef (dépendance majeure) : aucun code avant son « validé ».
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Règles : questions avant toute supposition ; fiche de session et suivi.md à jour en fin de session ;
tout est commité ; jamais de git push.
Quand tu as fini une étape, dis-le : le coordinateur relit ta branche.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | mission écrite ; personne ne tient MOT-12 (ni branche, ni dossier) | — |
| 2026-11-15 14 h 10 | tour d'état : une autre session a écrit et commité le plan à 13 h 58, code en cours (`pom.xml`, contrôleur, filtre de jeton, `application.properties`, `ConfigurationSolveur.java`), sans fiche de session. Le plan change la décision du 13 novembre : **Timefold 1.35 au lieu de 1.31, cœur sans le starter**, Spring Boot 4.1. Preuves de l'essai au § 2.2 : la 1.x va jusqu'à 1.35, toute la 1.x vise Spring Boot 3.5, le starter 1.35 ne démarre pas sous Boot 4.1, le cœur seul donne un calcul identique (0hard/-20soft). Le critère « le résultat ne change pas » est repris | **au chef** : confirmer qu'il a validé ce plan |
| 2026-11-15 | **le chef confirme** avoir validé le plan (Spring Boot 4.1, cœur Timefold 1.35 sans starter) ; la décision qui remplace « Timefold 1.31 » du 13 novembre est dans `decisions.md` sur la branche | relecture à faire quand la session aura fini |
