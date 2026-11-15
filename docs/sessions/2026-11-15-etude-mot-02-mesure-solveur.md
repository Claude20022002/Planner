# Session du 2026-11-15 · MOT-02 · `etude/mot-02-mesure-solveur`

| | |
|---|---|
| Fait par | Codex, agent basé sur GPT-6 ; variante exacte et effort non exposés |
| Chantier | MOT |
| Dossier de travail | `..\travaux-planner\mot-02-mesure-solveur` |
| Dernier commit de code | `8f36c1c` ; voir le commit de cette fiche pour la clôture documentaire |
| État | plan validé, banc livré, mesures en cours ; collège après MOT-13b |

## Objectif et plan

Mesurer le solveur sur un collège de 600 élèves puis 20 000 étudiants, en suivant la mission du coordinateur. [Plan](../conception/moteur-planification/mot-02-mesure-solveur.md) **validé par le coordinateur le 15 novembre à 14:45**, réponses Q1 à Q8 reçues dans la boîte, commité seul avant code (`fa2c44c`). Le chef a demandé de démarrer (« Vas y »).

## Fait

- Règles, mission, suivi, décisions, module, code, écarts, fiches PLA-06 et MOT-12 lus ; PR ouvertes consultées. Branche créée depuis `origin/main` à `38f2f90f` (#181 fusionnée). La mission était dans le dossier voisin `coordination-agents`, PR #180.
- `5b3009da` : brouillon et seule ligne MOT-02 du suivi. `af53c87b` : première fiche, avant réception de la validation. `fa2c44c` : validation et réponses commitées seules avant code.
- `57c1d1d` : banc local, grand jeu supérieur simplifié de 20 000 étudiants et témoin séparé ; limites Docker inspectées, API dédiée locale, contrôles de complétude, compteurs cgroup, garde externe, extraction de résultats et documentation.
- `8f36c1c` : fins de ligne des jeux stabilisées par `.gitattributes` pour conserver leurs empreintes sous Windows et Linux.
- Deux images construites localement depuis les commits avant/après #181 ; aucun changement du produit.
- Recette courte : planning incomplet rejeté sur les deux versions. En 1.35, `0hard/0soft` peut coexister avec 4 790 leçons sans affectation sur un budget de cinq secondes. Constat transmis au coordinateur, sans correctif hors périmètre.
- Deux tentatives de pilote quittaient prématurément sans résultat. Garde de vie Node ajoutée et testée par sous-processus ; leurs deux conteneurs retirés après vérification des labels. Tentatives exclues de la série.
- Série principale lancée, profil VPS : sortie `.local/serie-1794754463412-ff5e6b48`, session de commande `81545` durant cette session. Chauffe et trois passages avant, puis chauffe et trois passages après ; aucun mélange avec les essais courts. La série doit être terminée et extraite avant de conclure.
- Rapports déposés dans `sortie/2026-11-15-1444-mot-02-plan-et-questions.md` et `sortie/2026-11-15-1458-mot-02-banc-et-serie.md`. Validation `2026-11-15-1445-validation-plan-mot-02.md` rangée dans `entree/traites/`.

## Vérifié

- `node --test scripts/mesures/mot-02/tests/banc.test.mjs` : **17 tests réussis, 0 échec**.
- Génération exacte des JSON versionnés ; témoin contrôlé, 4 800 leçons, 400 groupes et 800 enseignants ; aucun placement initial dans les entrées mesurées.
- `node --check` sur les `.mjs` du banc et `git diff --check` : passent.
- `node scripts/verifier-neutre.mjs` : passe.
- `.local/` est effectivement ignoré ; métadonnées du poste, requêtes détaillées, réponses et journaux non versionnés.
- Docker Linux local : 12 CPU et 5 860 114 432 octets exposés ; Node 22.23.4. Limites de passage inspectées : 640 Mio, 1,5 CPU, aucun échange, tas 70 %, un calcul à la fois. Aucune sonde mémoire manquante sur la première chauffe.
- Aucun test applicatif relancé : produit inchangé. Aucun serveur distant, push ou fusion par l'agent.

## Décisions et limites

Les huit réponses sont dans le plan. Q1 autorise de construire et mesurer le grand jeu maintenant, mais le collège attend le générateur 13b **sur main**, jamais depuis sa branche. Q7 exclut le filtrage : toute optimisation nécessaire sera une fonction séparée rattachée à MOT-10. Les limites proposées sont toutes retenues par le coordinateur.

Le verdict restera borné au solveur : **EP-10 applicative non démontrée par ce banc**. Le témoin du grand jeu est simplifié (groupes indépendants, deux enseignants par groupe). Les scores seuls ne prouvent pas la complétude. La première faisabilité est observée par sondage, pas chronométrée à l'intérieur du moteur.

Modèle : mission recommandant le modèle de code le plus fort, effort élevé ; le sélecteur exact n'est pas exposé et seul le chef peut le vérifier ou le changer.

## État laissé et suite

1. Terminer les passages de la série, conserver les échecs, extraire les résultats avec `extraire-resultats.mjs`, compléter `mesures.md` avec temps, mémoire, vitesses et qualité. Ne pas conclure sur une série incomplète.
2. Lire la boîte et transmettre le rapport d'étape au coordinateur avec commits et résultats.
3. Quand MOT-13b est fusionnée dans main : lire son générateur à provenance stable, confirmer qu'il donne 600 élèves sans adaptation ; sinon demander au coordinateur. Mesurer le collège selon le même protocole, compléter la documentation et le verdict.
4. Garder les changements dans le périmètre de la mission. Tout commiter localement ; le chef seul pousse et ouvre la PR.

Suivi : MOT-02 en cours, pas fait ; chantier MOT inchangé. Module et index actualisés avec le banc et le rapport de portée. La série et le collège doivent encore être documentés avant la clôture de la fonction.

## Commandes pour le chef

Après relecture du coordinateur :

```powershell
git -C "..\travaux-planner\mot-02-mesure-solveur" push -u origin etude/mot-02-mesure-solveur
```

```powershell
gh pr create --draft --base main --head etude/mot-02-mesure-solveur --title "MOT-02 : banc local et mesures du solveur" --fill
```

## Prompt de reprise

```text
Tu reprends MOT-02, chantier MOT, branche etude/mot-02-mesure-solveur,
dossier ..\travaux-planner\mot-02-mesure-solveur. Lis AGENTS.md, docs/plan/README.md,
docs/plan/suivi.md, mission mot-02.md (main ou ..\coordination-agents\docs\plan\missions\),
plan docs/conception/moteur-planification/mot-02-mesure-solveur.md, mesures.md,
scripts/mesures/mot-02/README.md et cette fiche. Lis la boîte Codex entree.
Plan validé par le coordinateur le 15 novembre à 14:45, Q1–Q8 ; commit fa2c44c avant code.
Fait : banc et grand jeu supérieur simplifié, 57c1d1d et 8f36c1c ; 17 tests verts.
Vérifie d'abord l'état de la série locale .local/serie-1794754463412-ff5e6b48 avant toute relance :
les deux images sont construites depuis d8d892bc (avant #181) et 38f2f90f (après).
640 Mio, 1,5 CPU, aucun échange, tas 70 %, un calcul à la fois ; chauffe 60 s puis
3 passages demandés de 600 s par version, conteneur neuf ; sondage 1 s, garde 660 s.
Résultats détaillés ignorés dans .local/ ; ne jamais commiter la machine ou le jeton.
Le score 0hard de 1.35 ne suffit pas : la recette a laissé 4 790 leçons non affectées.
Aucun succès sans réponse complète ; EP-10 applicative non démontrée par ce banc.
Reste : rapport chiffré de la série puis collège de 600 élèves avec le générateur 13b APRÈS
fusion dans main, jamais depuis sa branche. Ne pas recréer ou modifier son générateur.
Si 600 élèves demandent une adaptation, revenir au coordinateur. Q7 exclut le filtrage,
renvoyé à une tâche distincte MOT-10 si nécessaire.
Périmètre : scripts/mesures/mot-02/, documents de conception autorisés, sa ligne de suivi,
module MOT et sa fiche. Pas de modification solver/, backend/, serveur ou fichiers 13b.
Questions avant supposition ; commits locaux, fiche/suivi et rapport dans sortie à chaque
fin d'étape ; jamais git push. Les commandes push/PR appartiennent au chef.
```
