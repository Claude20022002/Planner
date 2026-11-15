# Session du 2026-11-15 · PLA-06 · `etude/pla-06-mesure-d01` · suite après validation

| | |
|---|---|
| Fait par | Codex (GPT-6) |
| Chantier | PLA |
| Dossier de travail | `..\travaux-planner\pla-06-mesure-d01` |
| Dernier commit de code | `24b261a` ; clôture documentaire dans le commit de cette fiche |
| PR | #164, brouillon |

## Objectif de la session

Enregistrer le « validé » du chef, fermer A-3 puis adapter le banc au serveur unique et aux protections n8n. Préparer les commandes réservées au chef, sans exécuter aucune commande serveur.

## Plan

[Plan PLA-06, § 4](../conception/plateforme/pla-06-mesure-d01.md), validé par Claude20022002 le 15 novembre. A-3 validée explicitement le même jour : MySQL 1 processeur, Node 1 processeur, pilote/charge/relevés ensemble 0,5 processeur dans un groupe systemd CPUQuota=50%, MemoryMax=512M, MemorySwapMax=0. MySQL jusqu'à 2 Gio, Node 1 Gio ; palier MySQL 4 Gio suspendu.

## Fait

- Au départ, branche propre et synchronisée avec sa branche distante : le chef a publié les commits précédents.
- `7794d34` : validation du § 4 et de la répartition A-3 enregistrée dans le plan seul, avant le code.
- `24b261a` : adaptation du banc, dans le seul périmètre PLA-06 :
  - lanceur systemd bornant tous les processus hôte ; arrêt final du seul projet Docker, conteneurs ponctuels compris ;
  - pilote local sans SSH/SCP, refus d'un Docker distant ou d'un groupe hôte non limité, verrou exclusif et noms de résultats uniques ;
  - Compose : MySQL sans port publié, HTTP sur boucle locale, labels Traefik désactivés, limites validées ; dépendances npm dans un volume dédié ;
  - photos brutes avant/après conservées hors Git et vérification des identifiants, démarrages, état, santé, redémarrages et OOM des services protégés ;
  - surveillance toutes les 5 secondes, arrêt si mémoire disponible sous 1 Gio, échange mémoire actif, incident de service ou relevé impossible ; signal manuel via arrêt du service ou fichier local ARRET ;
  - relevés sérialisés, erreurs comptées, bilan invalide si sortie incomplète, relevés manquants, erreur ou quota CPU limitant le groupe pendant la charge ;
  - confirmation manuelle n8n après série requise ; un essai réduit ne confirme jamais les 200 bases ;
  - README remplacé par le protocole serveur, commandes une par une, reconnaissance, garde injectée, installation, petit essai, séries et nettoyage ciblé.
- Images Docker préexistantes requises : aucun téléchargement implicite d'image au cours d'une action surveillée. Si une dépendance manque, sa préparation est à convenir avec le chef.
- Suivi et rubrique « Ce qui existe » du module mis à jour. Cette fiche remplace la fiche précédente pour la reprise.

## Vérifié

- `node --test scripts/mesures/pla-06/tests/pur.test.mjs scripts/mesures/pla-06/tests/protection.test.mjs` : **15 tests réussis, 0 échec**, dont 8 régressions des protections et de la validité.
- `node --check` : tous les fichiers `.mjs` du banc, hors dossiers locaux et résultats, passent.
- `bash -n` avec Git Bash : `lancer.sh` et `arreter.sh` passent, séparément.
- `docker compose --profile installer -f scripts/mesures/pla-06/docker-compose.mesure.yml config --format json` : configuration résolue localement avec un secret fictif temporaire ; validateur des limites et de l'isolation réussi. Aucun conteneur démarré.
- `git diff --check` : aucune erreur.
- `backend/` et `docs/plan/decisions.md` inchangés dans cette suite de travail.
- **Non vérifiés ici** : exécution réelle systemd/cgroup, initialisation et montages Docker, installation npm, gardes et arrêt réel sur le serveur, parcours HTTP et réactivité de n8n. Le chef doit les vérifier dans la fenêtre convenue, avant toute mesure de capacité. Les tests simulés ne remplacent pas cette recette.
- Aucune commande serveur ni série exécutée ; aucun rapport de capacité ; CI non relancée ; aucun push par l'agent.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| Validation | Plan amendé du § 4 | chef : « validé » | réglé le 15 novembre |
| A-3 | Répartition CPU et mécanisme du groupe hôte | chef : oui à MySQL 1, Node 1, hôte 0,5 et groupe systemd 512 Mio sans échange | réglé |
| A-2, P-21 | Créneau avant EXP-02b, traitement témoin et traitements lourds n8n | le chef précise que le serveur est provisoire, utilisé pour les tests de déploiement et les démonstrations ; il ne donne pas encore de créneau ni de témoin | reste ouvert pour le lancement, sans bloquer le code |
| P-20 | Relevé frais de la mémoire et de l'échange | aucun retour serveur reçu ; la recette précédente indiquait aucune mémoire d'échange | attendu du chef |

L'usage provisoire du serveur ne permet pas de supposer que n8n est inactif. Les protections du plan validé restent en vigueur.

## État laissé

- PLA-06 → PR ouverte #164, plan validé et adaptation locale écrite ; recette serveur attendue du chef, aucune série.
- Chantier PLA inchangé : ouvert, 7 fonctions restantes. D-01 n'est pas encore confirmée.
- Tous les changements sont commités localement. Le coordinateur peut relire la branche. L'agent n'a pas poussé.

## Reste à faire, dans l'ordre

1. Coordinateur : relire `7794d34`, `24b261a` et cette clôture ; chef : publier les commits dans #164.
2. Chef : confirmer le créneau avant EXP-02b, le traitement témoin et les pics n8n ; transmettre les relevés de reconnaissance sans informations d'accès.
3. Vérifier Node 22, systemd, cgroup v2 et les images déjà présentes ; si une dépendance manque, convenir de sa préparation avant toute action de banc.
4. Depuis une copie de travail distincte sur le serveur : suivre le README une commande à la fois, initialisation, photo, contrôle des services couverts, exercice d'arrêt volontaire puis installation et préparation de 10 écoles.
5. Petit essai, recette des montages, limites et arrêts réels ; surveiller n8n manuellement et vérifier les photos après chaque action. Ne pas passer aux séries en cas d'échec.
6. Préparation de 200 écoles et séries dans la fenêtre validée ; confirmation manuelle après chaque série ; nettoyage complet des seules ressources du projet.
7. Rapport chiffré. Le chef inscrit seul la conclusion D-01 dans `decisions.md`.

## Commandes pour le chef

Après relecture du coordinateur, publier dans la PR existante :

```powershell
git -C "..\travaux-planner\pla-06-mesure-d01" push origin etude/pla-06-mesure-d01
```

```powershell
gh pr view 164
```

Première commande de reconnaissance, sur le serveur (chef uniquement) :

```bash
free -h
```

Les autres commandes, dans l'ordre, sont dans [le README](../../scripts/mesures/pla-06/README.md). Aucune série avant retour des prérequis et réussite de la recette.

## Prompt de reprise

```text
Tu reprends PLA-06 (mesure de D-01 : 200 bases) du chantier PLA de Planner, branche etude/pla-06-mesure-d01,
PR #164 en brouillon, dossier ..\travaux-planner\pla-06-mesure-d01.
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la mission docs/plan/missions/pla-06.md
(sur main ou origin/chore/coordination-agents si absente), le plan docs/conception/plateforme/pla-06-mesure-d01.md,
docs/sessions/2026-11-15-etude-pla-06-mesure-d01-2.md et scripts/mesures/pla-06/README.md.
Le § 4 et A-3 sont VALIDÉS par le chef le 15 novembre, commit 7794d34 ; adaptation locale dans 24b261a.
MySQL : 2 Gio max / 1 CPU ; Node : 1 Gio / 1 CPU ; pilote/charge/relevés : 512 Mio / 0,5 CPU, via systemd.
Palier MySQL 4 Gio suspendu. Arrêt sous 1 Gio disponible, si n8n ralentit ou si un service protégé change.
15 tests locaux verts ; Compose résolu et Bash/Node syntaxiquement vérifiés ; aucune exécution serveur.
Le serveur est provisoire pour tests et démonstrations. Cela ne prouve pas que n8n est inactif.
Attendre le créneau avant EXP-02b, le témoin, les traitements lourds n8n et les relevés frais (A-2, P-20, P-21).
Le chef exécute TOUTES les commandes serveur ; l'agent les prépare une par une. Commencer par free -h.
Puis suivre le README : vérifier les prérequis/images, photo initiale, exercice d'arrêt, installation, préparation
et petit essai de 10 écoles. Vérifier réellement systemd/cgroup, montages, gardes et n8n avant les séries 200 bases.
Le résultat reste invalide sans relevés complets et contrôle manuel n8n après ; un essai réduit ne confirme pas D-01.
Périmètre : scripts/mesures/pla-06/, lignes prévues de .gitignore, plan et rapport PLA-06, ligne PLA-06 du suivi,
module « ce qui existe », fiche de session. Ne pas toucher backend/ ni decisions.md ; questions avant toute supposition.
Fiche et suivi à jour ; tout commiter localement ; jamais de git push. Quand fini, le coordinateur relit la branche.
```
