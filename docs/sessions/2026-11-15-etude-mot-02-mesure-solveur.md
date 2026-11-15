# Session du 2026-11-15 · MOT-02 · `etude/mot-02-mesure-solveur`

| | |
|---|---|
| Fait par | Codex, agent basé sur GPT-6 ; variante exacte et effort non exposés |
| Chantier | MOT, ouvert le 15 novembre |
| Dossier de travail | `..\travaux-planner\mot-02-mesure-solveur` |
| Dernier commit de conception | `5b3009da` ; clôture dans le commit de cette fiche |
| État | conception soumise, **non validée**, aucun code ni mesure |

## Objectif de la session

Démarrer MOT-02 après l'instruction du chef « Vas y » : lire la mission, examiner les contrats actuels, préparer les questions et le protocole pour validation par le coordinateur.

## Plan

[Brouillon MOT-02](../conception/moteur-planification/mot-02-mesure-solveur.md), **en attente de validation**. Les propositions Q1 à Q8 ne sont pas des décisions. Le commit du brouillon permet sa revue ; inscrire et commiter séparément la validation avant toute ligne de code.

## Fait

- Lecture des règles, README, suivi, module MOT, décisions, modèle de conception et de fiche, écarts, code du solveur et client, fiches PLA-06 et MOT-12.
- Lecture de la mission hors du dépôt principal : `..\coordination-agents\docs\plan\missions\mot-02.md`, annoncée dans #180. Les messages de 14:05 et 14:16 sont déjà rangés dans la boîte.
- PR ouvertes consultées avec `gh pr list` en exécution autorisée hors bac à sable ; branches distantes et dossiers de travail consultés. Le `gh` du PATH restreint n'était pas accessible ; il est disponible en exécution autorisée.
- Branche et dossier créés depuis `origin/main` à `38f2f90f`, **après la fusion de #181**. Le dépôt principal n'a pas été modifié.
- Le solveur est déjà sur Boot 4.1.2 et Timefold 1.35.0. Lecture du complément **validé** de MOT-13b dans son dossier, sans édition : son Q21 prévoit le générateur de collège repris par MOT-02. Il change aussi la forme du score et renvoie le filtrage à MOT-02 alors que notre mission interdit `solver/` ; divergence soumise au coordinateur.
- `5b3009da` : brouillon complet avec Mermaid et huit questions ; seule ligne MOT-02 du suivi actualisée. Aucun script ni jeu écrit.
- Questions et brouillon intégral déposés dans `..\boites\codex\sortie\2026-11-15-1444-mot-02-plan-et-questions.md`. Demande de validation explicite au coordinateur.

## Vérifié

- `git diff --cached --check` avant le commit du brouillon : aucune erreur.
- Diff du suivi : une seule ligne de fonction modifiée, aucune modification de chantier ni d'une autre mission.
- Reconnaissance Docker en lecture seule : moteur local Linux, 12 CPU, 5 860 114 432 octets de RAM exposés. Ni image construite, ni conteneur démarré, ni calcul lancé.
- Contrats relevés dans les sources : 600 s, 5 000 leçons ; plafond mémoire du Compose général 1 Gio/2 CPU, surcharge VPS 640 Mio/1,5 CPU. Les limites de la future mesure sont proposées, pas encore retenues.
- Java trouvé dans le PATH : répertoire JDK 17 ; Maven non trouvé. Le plan propose Docker/Java 21 déjà utilisé par le projet, sans modifier le poste.
- Aucun test logiciel lancé : changements documentaires uniquement. Aucun résultat de performance à annoncer.
- Aucun push, fusion ou appel à un serveur. Aucun changement propre à la mission dans `solver/`, `backend/` ou les fichiers de 13b.

## Questions

| N° | Question, proposition dans le plan | Réponse | État |
|---|---|---|---|
| Q1 | Reprendre le collège 13b, 20 classes de 30, après sa livraison ; confirmer son manifeste | coordinateur attendu | ouverte |
| Q2 | Grand jeu de 400 groupes de 50, 4 800 leçons, 800 enseignants, 400 salles | coordinateur attendu | ouverte |
| Q3 | Profil principal VPS 640 Mio/1,5 CPU, sans échange | coordinateur attendu | ouverte |
| Q4 | Chauffe 60 s puis 3 passages à budget de 600 s, sondage 1 s | coordinateur attendu | ouverte |
| Q5 | Verdict borné au solveur, pas certification du parcours EP-10 complet | coordinateur attendu | ouverte |
| Q6 | Comparaison de vitesse MOT-12 sur un problème commun figé | coordinateur attendu | ouverte |
| Q7 | Filtrage des domaines exclu de cette étude, car `solver/` interdit | coordinateur attendu | ouverte |
| Q8 | Entrées synthétiques et synthèses versionnées ; détails locaux ignorés | coordinateur attendu | ouverte |
| Modèle | Mission : modèle de code le plus fort, effort élevé | variante et effort non exposés, seul le chef peut vérifier le sélecteur | information consignée |

## État laissé

- `docs/plan/suivi.md` : MOT-02 « en cours : conception soumise, validation attendue », avec branche.
- Chantier MOT inchangé ; aucun chantier ouvert ou fermé.
- Module inchangé : le banc n'existe pas encore. Les index de conception seront complétés après validation.
- Brouillon sauvegardé en local, sans lui attribuer une validation. Le coordinateur dispose aussi de son texte intégral dans la boîte.

## Reste à faire, dans l'ordre

1. Lire la boîte Codex et obtenir les réponses Q1 à Q8 ainsi que la validation explicite du coordinateur. Si nécessaire, corriger le brouillon.
2. Inscrire la validation et les réponses, les commiter séparément **avant le code**.
3. Selon Q1, attendre la disponibilité du générateur de 13b, relever son contrat exact et intégrer les changements de main sans toucher aux branches des autres agents.
4. Écrire le banc et ses tests dans le périmètre approuvé ; essai court, puis mesures autorisées par le plan.
5. Rapport chiffré, documentation, suivi, module, fiche et rapport au coordinateur ; jamais de push par l'agent.

## Commandes pour le chef de projet

La boîte suffit pour faire relire ce brouillon. Si le chef souhaite le publier pour revue, ces commandes ouvrent seulement une PR en brouillon, sans signifier que le plan est validé :

```powershell
git -C "..\travaux-planner\mot-02-mesure-solveur" push -u origin etude/mot-02-mesure-solveur
```

```powershell
gh pr create --draft --base main --head etude/mot-02-mesure-solveur --title "MOT-02 : protocole de mesure à valider" --fill
```

## Prompt de reprise

```text
Tu reprends MOT-02 du chantier MOT de Planner, branche etude/mot-02-mesure-solveur,
dossier ..\travaux-planner\mot-02-mesure-solveur, créée depuis origin/main 38f2f90f (#181 fusionnée).
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la mission mot-02.md
(dans docs/plan/missions/ ou ..\coordination-agents\docs\plan\missions\ si #180 pas fusionnée),
le plan docs/conception/moteur-planification/mot-02-mesure-solveur.md et cette fiche.
Lis ..\boites\README.md et la boîte Codex entree. Les questions et le brouillon intégral
ont été déposés dans sortie/2026-11-15-1444-mot-02-plan-et-questions.md.
Fait : 5b3009da, conception soumise et ligne MOT-02 actualisée ; aucun code, aucun calcul.
Le plan N'EST PAS VALIDÉ. Attendre les réponses Q1 à Q8 et la validation du coordinateur,
puis commiter la validation séparément avant de coder.
Point central : le plan 13b validé Q21 prévoit le générateur de collège repris par MOT-02.
Ne pas le recréer ou modifier ses fichiers. Confirmer la mise à l'échelle à 600 élèves.
MOT-13b change aussi le score dur/moyen/souple ; ne pas comparer des scores de règles différentes.
Grand jeu proposé : 400 groupes de 50, 4 800 leçons ; profil proposé 640 Mio/1,5 CPU ;
chauffe puis 3 passages à 600 s. Ce sont des PROPOSITIONS, pas des décisions acquises.
Docker local répond, Java du PATH 17, Maven absent ; construction Docker proposée.
Périmètre : scripts/mesures/mot-02/, documents autorisés, sa ligne de suivi et sa fiche.
Ne pas toucher solver/, backend/, serveur ou au générateur 13b ; le filtrage des domaines
renvoyé à MOT-02 par 13b est à clarifier (Q7), pas autorisé par notre mission.
Questions avant supposition, aucun code sans plan validé, commits locaux, fiche et suivi
à jour, rapport dans sortie, jamais de git push. Mesures du solveur seules ne certifient
pas EP-10 de bout en bout ; aucun résultat chiffré encore.
```
