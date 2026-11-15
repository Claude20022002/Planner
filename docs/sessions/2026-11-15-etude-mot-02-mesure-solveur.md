# Session du 2026-11-15 · MOT-02 · `etude/mot-02-mesure-solveur`

| | |
|---|---|
| Fait par | Codex, agent basé sur GPT-6 ; variante exacte et effort non exposés |
| Chantier | MOT |
| Dossier de travail | `..\travaux-planner\mot-02-mesure-solveur` |
| Dernier commit de code | `5bd66a83` ; rapport et clôture dans le commit de cette fiche |
| État | grand jeu mesuré (six échecs), collège en attente de MOT-13b sur main |

## Objectif et plan

Mesurer le solveur sur un collège de 600 élèves puis 20 000 étudiants. Le chef a demandé de démarrer (« Vas y »). Le [plan](../conception/moteur-planification/mot-02-mesure-solveur.md) est **validé par le coordinateur le 15 novembre à 14:45**, réponses Q1 à Q8 reçues dans la boîte et commitées seules avant code (`fa2c44c`). Q1 autorise de mesurer le grand jeu sans attendre le collège.

La mission est lisible dans `..\coordination-agents\docs\plan\missions\mot-02.md` ; #180 reste ouverte au contrôle final. Le générateur 13b ne se lit que depuis main après sa fusion. Aucune PR de MOT-13b trouvée au contrôle final ; `origin/main` est alors à `ab2620a4` (#177).

## Fait et commits

- Lecture des règles, mission, suivi, décisions, module, code, écarts, fiches PLA-06 et MOT-12 et PR ouvertes. Branche créée depuis `origin/main` à `38f2f90f` (#181 fusionnée), sans modifier le dépôt principal.
- `5b3009da` : brouillon et seule ligne MOT-02 du suivi. `af53c87b` : première fiche, avant réception de la validation. `fa2c44c` : validation et réponses, commitées seules avant code.
- `57c1d1d` : banc local, grand jeu supérieur simplifié de 20 000 étudiants et témoin séparé, contrôles de complétude, limites inspectées, compteurs cgroup, garde externe et extraction.
- `8f36c1c` : fins de ligne LF pour conserver les empreintes des jeux sous Windows et Linux. `f8ecbd8` : documentation du banc et état intermédiaire.
- `5bd66a83` : temps du GET final séparé de la demande administrative suivant un résultat incomplet, avec régression. Les acquisitions déjà faites sont normalisées par leur horodatage du GET final, conservé dans les observations ; aucun calcul n'est relancé ou altéré pour cela.
- Deux images construites depuis `d8d892bc` (avant #181) et `38f2f90f` (après #181), sans modification de source du produit.
- Série **terminée** : chauffe de 60 s puis trois passages de 600 s demandées par version, conteneur neuf à chaque passage, profil VPS. Aucun planning complet sur les six passages. Résultats détaillés dans `scripts/mesures/mot-02/.local/serie-1794754463412-ff5e6b48`, ignoré par Git ; synthèse publique dans `jeux/resultats-superieur.json` et [mesures.md](../conception/moteur-planification/mesures.md).
- Les recettes de cinq secondes et les chauffes sont exclues. Deux tentatives de pilote se sont arrêtées avant requête ; garde de vie Node et test par sous-processus ajoutés, leurs conteneurs retirés après contrôle des labels.

## Résultats

Jeu supérieur simplifié : 400 groupes de 50 étudiants, 4 800 leçons de deux heures, 800 enseignants et 400 salles. Groupes indépendants, deux enseignants propres à chacun, disponibilité complète, un seul site. Témoin faisable séparé, aucun placement initial envoyé au solveur.

| Mesure | Avant MOT-12, Timefold 1.15 | Après MOT-12, Timefold 1.35 |
|---|---|---|
| Plannings complets / passages | 0 / 3 | 0 / 3 |
| Leçons non affectées / 4 800 | 2 419 à 2 870 | 2 785 à 2 848 |
| Débit médian, évaluations/s | 45 334 | 39 342 |
| Pic mémoire natif maximal | 203,8 Mio | 259,9 Mio |

Le débit médian baisse de 13,2 %, mais les plages se chevauchent ; pas de preuve de régression stable ou causée par Timefold seul sur trois passages locaux. Tous les calculs restent dans la construction. La cible de 30 minutes de MOT-10 n'est pas évaluée avec une API bornée à 600 s.

Les trois réponses 1.35 annoncent `0hard/0soft` malgré leur incomplétude. Les six listes `violations` sont vides, y compris le premier passage ancien à `-2hard` : le détail des règles enfreintes n'est pas exploitable sur ces solutions incomplètes. Ces constats sont transmis au coordinateur ; aucune correction du produit hors périmètre.

**EP-10 applicative non démontrée par ce banc.** Le collège de 600 élèves n'est pas mesuré et l'appel direct ne certifie pas le déploiement sur les dates ou les conflits individuels.

## Vérifié

- `node --test scripts/mesures/mot-02/tests/banc.test.mjs` : **18 réussis, 0 échec**.
- Génération exacte des trois JSON de référence, témoin contrôlé et aucun placement initial dans les entrées.
- Syntaxe des `.mjs`, contrôle de neutralité et `git diff --check` : passent.
- Six passages, trois par version, une seule empreinte de requête, deux images identifiées. Chauffes et recettes exclues ; données manquantes conservées comme indisponibles.
- Limites inspectées : 640 Mio, 1,5 CPU, aucun échange, tas 70 %, un calcul à la fois. Aucune sonde mémoire manquante, aucun OOM du conteneur, aucun échec moteur signalé ; les six échecs sont des plannings incomplets.
- Tous les conteneurs de la série retirés après collecte ; images et résultats locaux conservés. Aucun nettoyage global.
- Périmètre vérifié contre le point de départ et le diff à trois points : `solver/`, `backend/` et les fichiers 13b inchangés. Aucune commande serveur, push ou fusion par l'agent. Aucun test applicatif relancé : produit inchangé.
- `.local/` effectivement ignoré ; aucun jeton, identifiant du poste ou réponse détaillée dans les résultats versionnés.

## Coordination et état laissé

Messages déposés dans `sortie/` : questions et plan à 14:44, banc et série à 14:58, premier passage à 15:08, puis rapport final après le commit de cette fiche. Validation de 14:45 rangée dans `entree/traites/`. Les boîtes restent hors Git.

MOT-02 reste **en cours**, grand jeu mesuré, collège après 13b. Module et deux index de conception à jour ; chantier MOT inchangé. Q7 exclut le filtrage : toute optimisation nécessaire sera une fonction distincte rattachée à MOT-10, décidée par le coordinateur. Aucune dépendance ou règle produit nouvelle.

Modèle recommandé : le plus fort pour le code, effort élevé. Le sélecteur exact n'est pas exposé et seul le chef peut le vérifier ou le changer ; aucune variante précise inventée.

## Reste à faire

1. Coordinateur : relire le banc, le rapport et les deux constats sur les réponses incomplètes. Aucune relance du grand jeu nécessaire sans nouveau besoin de validation.
2. Attendre MOT-13b sur main, puis lire son générateur à provenance stable. Confirmer 600 élèves sans adaptation ; sinon revenir au coordinateur. Ne pas recréer ni modifier le générateur.
3. Mesurer le collège selon le plan validé, compléter le verdict et la fiche, puis faire relire. La suite ne commence pas sur la branche non fusionnée de 13b.
4. Chef : publier la branche et ouvrir une PR en brouillon après relecture ; fonction non terminée tant que le collège manque.

## Commandes pour le chef

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
docs/plan/suivi.md, la mission mot-02.md (main ou ..\coordination-agents\docs\plan\missions\),
le plan docs/conception/moteur-planification/mot-02-mesure-solveur.md, mesures.md,
scripts/mesures/mot-02/README.md et cette fiche. Lis la boîte Codex entree.
Plan validé par le coordinateur le 15 novembre à 14:45, Q1–Q8 ; fa2c44c avant code.
Fait : banc et grand jeu supérieur simplifié, six passages terminés, 18 tests verts.
Résultats publics : scripts/mesures/mot-02/jeux/resultats-superieur.json.
Résultats détaillés : .local/serie-1794754463412-ff5e6b48, hors Git. Aucun conteneur restant.
Images figées : d8d892bc avant #181 et 38f2f90f après ; ressources 640 Mio/1,5 CPU,
aucun échange, tas 70 %, un calcul à la fois. Trois passages de 600 s par version,
chauffes exclues. Six échecs par incomplétude, aucun OOM. Débits médians 45 334 et
39 342 évaluations/s, mais plages qui se chevauchent : conclusion bornée au poste/jeu.
Le score nul de 1.35 ne prouve pas la complétude ; violations vide même avec dur -2
sur un passage ancien. Ne corrige pas le produit ici, signalement au coordinateur.
Ne relance pas le grand jeu sans nouveau besoin de validation.
Reste : attendre 13b FUSIONNÉE DANS MAIN, puis lire son générateur depuis main, jamais
sa branche. Confirmer 600 élèves sans adaptation, sinon demander au coordinateur.
Ne pas recréer ou modifier scripts/college-fictif.mjs. Mesurer ensuite le collège,
compléter mesures.md et le verdict. EP-10 applicative non démontrée par ce banc.
Q7 exclut le filtrage : éventuelle fonction séparée MOT-10, pas une optimisation ici.
Périmètre : scripts/mesures/mot-02/, documents autorisés, sa ligne de suivi, module MOT
et fiche. Pas de modification solver/, backend/, serveur ou fichiers 13b.
Questions avant supposition ; commits locaux, suivi/fiche et rapport dans sortie
à chaque fin d'étape ; jamais git push. Le chef seul publie et ouvre la PR.
```
