# Session du 2026-11-15 · PLA-06 · `etude/pla-06-mesure-d01` · messages de la boîte

| | |
|---|---|
| Fait par | Codex, agent basé sur GPT-6 d'après les instructions de session ; variante exacte et sélecteur d'effort non exposés |
| Chantier | PLA |
| Dossier de travail | `..\travaux-planner\pla-06-mesure-d01` |
| Dernier commit de code | `1cbdfaa` ; clôture documentaire dans le commit de cette fiche |
| PR | #164, brouillon |

## Objectif de la session

Traiter les messages du coordinateur de 14:00 et 14:15 dans la boîte Codex : terminer la fusion de main, intégrer A-2 au plan puis à la garde du banc, tester et préparer les commandes du chef. L'adaptation locale précédente (`24b261a`) n'est pas refaite.

## Plan

[Plan PLA-06](../conception/plateforme/pla-06-mesure-d01.md), § 4 validé par le chef, A-3 validée. A-2 et ses détails ont été **confirmés directement par le chef le 15 novembre** après lecture des messages. La consigne par délégation ne sert donc pas de validation serveur à la place du chef.

A-2 : GET de santé n8n en lecture seule toutes les 15 s, référence médiane sur 40 mesures pendant 10 min avant toute charge, arrêt sur échec ou médiane des 4 dernières mesures atteignant le double de la référence ; HTTP 2xx sans redirection, délai 5 s ; URL locale hors Git. Fenêtre choisie au lancement par le chef, avant EXP-02b, hors activité n8n connue. Aucun workflow ni traitement créé ou lancé.

## Fait

- Lecture d'AGENTS.md, règles de la boîte, README, suivi, mission dans `..\coordination-agents\docs\plan\missions\pla-06.md`, plan, fiches, PR et branches. Mission encore absente de main lors de la lecture.
- Lecture des messages `2026-11-15-1400-mission-pla-06.md`, puis `2026-11-15-1415-complement-pla-06.md`.
- `d6a8aa0` : fusion locale de `origin/main` (`48ebb45`), sans rebase. Conflit du README de conception résolu après accord explicite du chef : garder la ligne Plateforme avec PLA-06/PLA-03 et la ligne Moteur de main avec MOT-13. Aucun autre contenu édité manuellement dans ce fichier. Backend et décisions arrivent automatiquement de main.
- `9b1072e` : A-2 confirmé par le chef, consigné dans le plan et commité seul avant le code.
- `1cbdfaa` : sonde et garde A-2 :
  - `lib/sonde.mjs` : validation de l'URL locale, GET sans redirection, délai maximal, médiane, référence et fenêtre de comparaison ;
  - `lib/temoin.mjs` : référence avant lancement, sonde périodique, contrôle final et appel à l'arrêt du banc ;
  - `configurer-sonde.mjs` : saisie interactive, fichier privé `.local/sonde.json`, aucun appel réseau de configuration ;
  - pilote : gardes mémoire/photos actives pendant la référence, aucune charge avant une référence complète et un contrôle sain ; installation et préparation protégées aussi ;
  - bilan impossible à valider sans sonde complète et saine ; URL absente des résultats de la sonde ;
  - surveillance sans recouvrement, cadence calculée depuis le début de chaque observation pour ne pas ajouter son temps au délai ;
  - README actualisé : configuration de la sonde, référence automatique, commandes une par une.
- Rapport d'attente déposé dans `sortie/2026-11-15-1450-pla-06-conflit-fusion.md` avant l'accord sur le conflit ; rapport final déposé après clôture. Les messages reçus sont rangés dans `entree/traites/` après traitement. Rien des boîtes n'est commité.

## Vérifié

- `node --test scripts/mesures/pla-06/tests/pur.test.mjs scripts/mesures/pla-06/tests/protection.test.mjs scripts/mesures/pla-06/tests/sonde.test.mjs` : **24 tests réussis, 0 échec**.
- Régressions A-2 : URL, GET sans redirection et échecs expurgés, 40 points espacés de 15 s avec attente simulée jusqu'à 600 s, référence interrompue, seuil de doublement inclusif, première et dernière sondes, arrêt de garde pendant une charge simulée, refus du bilan sans sonde.
- `node --check` : tous les `.mjs` du banc hors `.local/` et `resultats/` passent.
- `git diff --check` : aucune erreur.
- `git diff --name-only origin/main -- backend` : vide ; aucune modification propre à PLA-06 dans le backend.
- `docs/plan/decisions.md` : aucune édition manuelle ; intégration automatique depuis main.
- Aucun appel HTTP réel dans les tests, aucun Docker démarré, aucune commande serveur, aucune série et aucun push par l'agent.
- Non vérifié : exécution réelle de systemd/cgroup et Docker, montage des dépendances, installation npm, URL de santé effective et réactivité n8n. Le chef doit faire cette recette avant les mesures. La santé HTTP ne prouve pas le fonctionnement de tous les workflows.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| A-2 | Confirmer personnellement le protocole serveur proposé par le coordinateur ? | chef : « Oui, je valide A-2 » | réglé |
| A-2 détails | URL dans .local, 2xx sans redirection, délai 5 s, échec de référence bloquant, fenêtre 4 mesures | chef : « Oui, valider ces détails » | réglé |
| Fusion | Résolution hors périmètre du README de conception | chef : « Oui, conserver ces deux apports » | réglé pour cette fusion |
| P-20 | Relevé frais mémoire/échange | aucun retour serveur reçu | attendu du chef |
| Fenêtre | Créneau avant EXP-02b et hors activité n8n connue | choisi par le chef au lancement ; ne pas inventer l'état réel du serveur | à vérifier avant exécution |
| Modèle | Recommandation de la mission : modèle de code le plus fort, effort élevé | impossible de vérifier ou changer le sélecteur depuis les outils ; modèle précis et effort non exposés | à vérifier dans le sélecteur du chef ; aucune variante précise inventée |

## État laissé

PLA-06 reste en PR ouverte, aucune série serveur, D-01 non confirmée. Suivi et module actualisés ; chantier PLA ouvert avec 7 fonctions restantes. Changements commités localement, aucun push. Le coordinateur peut relire la branche.

## Reste à faire

1. Coordinateur : relire les commits et le rapport final de la boîte ; chef : publier les commits dans #164.
2. Chef : reconnaissance fraîche, fenêtre et URL locale de santé ; vérifier Node 22, cgroup v2, systemd et images préexistantes. Si une dépendance manque, convenir de sa préparation.
3. Suivre le README sur une copie distincte de l'installation Planner : initialiser, configurer-sonde, photo, garde injectée, installation, préparation de 10 écoles, petit essai. Les phases chargées commencent par 10 min de référence, gardes actives.
4. Après recette réussie : préparation de 200 écoles puis séries, une par une ; contrôle manuel n8n après, confirmation des bilans et nettoyage du seul projet.
5. Rapport chiffré et décision D-01 inscrite par le chef uniquement. Serveur provisoire de tests et démonstrations : documenter la portée des résultats sans promettre la capacité d'une future autre machine.

## Commandes pour le chef

Après relecture, publier les commits locaux dans la PR existante :

```powershell
git -C "..\travaux-planner\pla-06-mesure-d01" push origin etude/pla-06-mesure-d01
```

```powershell
gh pr view 164
```

Première commande serveur de reconnaissance, chef uniquement :

```bash
free -h
```

La séquence complète, **une commande par bloc**, est dans le [README du banc](../../scripts/mesures/pla-06/README.md), avec initialisation, saisie locale de l'URL, garde, installation et petit essai. Aucune série avant cette recette.

Après recette réussie et préparation de 200 écoles, depuis le dossier du banc :

```bash
bash lancer.sh serie --nom ajuste-2g-p1 --reglage ajuste --mysql-memoire 2g --innodb 1g --rampe --migrations --fenetre-confirmee --temoin-verifie
```

Après examen des relevés et contrôle manuel n8n :

```bash
bash lancer.sh confirmer --nom ajuste-2g-p1 --temoin-apres-verifie
```

En cas de ralentissement, sans attendre la fin de la série :

```bash
sudo systemctl stop planner-mesure-pla06-hote.service
```

## Prompt de reprise

```text
Tu reprends PLA-06 du chantier PLA de Planner, branche etude/pla-06-mesure-d01, PR #164 en brouillon,
dossier ..\travaux-planner\pla-06-mesure-d01. Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la mission docs/plan/missions/pla-06.md (main ou coordination-agents si absente), le plan PLA-06,
docs/sessions/2026-11-15-etude-pla-06-mesure-d01-3.md et scripts/mesures/pla-06/README.md.
Lis aussi ..\boites\README.md et la boîte Codex entree ; les messages de 14:00 et 14:15 sont traités.
Fait : main fusionné sans rebase (d6a8aa0), A-2 confirmé directement par le chef et commité seul (9b1072e),
sonde intégrée à la garde (1cbdfaa), 24 tests locaux verts. Plan § 4, A-3 et A-2 validés par le chef.
A-2 : GET de santé locale toutes les 15 s, référence médiane 40 points sur 10 min avant charge,
arrêt sur échec ou médiane de 4 mesures >= 2 fois la référence ; HTTP 2xx sans redirection, délai 5 s.
URL uniquement dans .local/sonde.json, configurée interactivement par le chef ; aucun workflow lancé.
Attendre les relevés frais P-20 ; le chef choisit sa fenêtre avant EXP-02b hors activité n8n connue.
L'agent ne lance aucune commande serveur. Commencer par préparer free -h, puis suivre le README une commande à la fois.
Vérifier réellement systemd, Docker, montages, gardes et sonde via le petit essai avant les 200 bases.
Limites : MySQL <=2 Gio/1 CPU ; Node 1 Gio/1 CPU ; hôte 512 Mio/0,5 CPU via systemd ; palier 4 Gio suspendu.
Aucun port public, aucun réseau/volume n8n partagé. Résultats et secrets hors Git ; aucun rapport chiffré encore.
Périmètre strict de la mission ; ne pas modifier backend/ ni decisions.md. Questions avant toute supposition.
Tout commiter localement, suivi et fiche à jour, rapport dans sortie à chaque étape, jamais de git push.
Quand l'étape est finie, le coordinateur relit la branche.
```
