# Session du 2026-11-15 · PLA-06 · `etude/pla-06-mesure-d01`

| | |
|---|---|
| Fait par | Codex (GPT-6) |
| Chantier | PLA |
| Dossier de travail | `..\travaux-planner\pla-06-mesure-d01` |
| Dernier commit de conception | `311c0ba` ; clôture documentaire dans le commit de cette fiche |
| PR existante | #164, ouverte en brouillon |

## Objectif de la session

Fusionner `origin/main`, amender le § 4 pour une mesure sur le seul serveur partagé avec n8n, relancer les tests purs, puis soumettre le plan au chef. Aucune série avant le nouveau « validé » ; aucune commande serveur exécutée par l'agent.

## Plan

[Plan amendé](../conception/plateforme/pla-06-mesure-d01.md), § 4, **à revalider**. La validation du 10 novembre porte sur le protocole initial. Les propositions de limites et d'ordre avec EXP-02b ont seulement été acceptées pour inscription à la proposition, pas comme validation du plan final.

## Fait

- Lecture des règles, README, suivi, décisions, plan et fiche du 10 novembre ; branches distantes et PR ouvertes consultées. PR #164 confirmée ouverte en brouillon.
- Mission absente d'`origin/main` après `git fetch origin` ; lue sur `origin/chore/coordination-agents` (PR #175), sans fusionner cette branche.
- `5f4153a` : fusion locale d'`origin/main` (`ef7ac89`), sans rebase. Deux conflits dans `docs/conception/README.md` et `docs/plan/decisions.md` : arrêt et autorisation explicite du chef, puis conservation des deux apports. Aucune décision nouvelle ajoutée ; aucune modification propre à PLA-06 dans `backend/`.
- `311c0ba` : plan amendé seul. Projet Compose distinct, réseau et volume isolés, aucun port public ni routage Traefik, photos et contrôle manuel de n8n, arrêt sur ralentissement ou mémoire disponible sous 1 Gio, nettoyage ciblé, mesure avant EXP-02b.
- Enveloppe proposée : MySQL jusqu'à 2 Gio, Node 1 Gio, pilote/charge/relevés ensemble 512 Mio ; total 2,5 processeurs. Palier MySQL 4 Gio suspendu à nouvelle validation. Répartition CPU et groupe de contrôle restent à préciser avant leur mise en œuvre.
- Premières commandes serveur de lecture seule préparées une par une au § 4 ; elles sont réservées au chef. Le pilote actuel et le README à deux machines restent à adapter après validation.
- Suivi PLA-06 et rubrique « Ce qui existe » du module mis à jour. Chantier PLA toujours ouvert, 7 fonctions restantes.

## Vérifié

- `node --test scripts/mesures/pla-06/tests/pur.test.mjs` : **7 tests réussis, 0 échec** (configuration, statistiques et séances synthétiques).
- `git diff --check` : aucune erreur.
- `git diff --name-only origin/main -- backend` : vide après fusion ; les changements backend intégrés proviennent uniquement de main.
- Aucun changement du code du banc. Les tests purs ne vérifient pas le futur protocole local ni les protections n8n.
- Aucune commande exécutée sur le serveur, aucune série, aucun résultat de capacité produit. CI non relancée ; aucun push.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| M-1 | Résoudre les conflits README de conception et décisions hors périmètre ? | « Oui j'autorise », après proposition de conserver les deux apports | réglé, uniquement pour cette fusion |
| A-1 | Limites et seuil d'arrêt du § 4 | chef : oui, inscrire la proposition à revalider | plan final à revalider |
| A-2 | Mesure avant EXP-02b et témoin n8n manuel | chef : oui, inscrire la proposition à revalider | créneau et témoin à fournir avant lancement |
| A-3 | Répartition CPU et groupe de contrôle | aucun choix inventé ; préparer et faire approuver les détails avant mise en œuvre | ouvert |
| P-20 | Mémoire d'échange | absente selon recette du 15 novembre ; relevé frais attendu | à confirmer par le chef |
| P-21 | Pics de n8n, traitements lourds | créneau et témoin attendus | ouvert |
| P-22, P-23, P-25 | Prérequis des anciens postes | sans objet : seul le serveur est utilisé | réglé par la décision du 15 novembre |

## État laissé

- `docs/plan/suivi.md` : PLA-06 → PR ouverte en brouillon #164, amendement à revalider, aucune série.
- Branche propre après clôture et commits locaux ; aucun push. Le coordinateur peut relire la branche.
- L'étude PLA-06 n'est pas terminée : ni rapport chiffré ni conclusion sur D-01.

## Reste à faire, dans l'ordre

1. Relecture du coordinateur ; obtenir le « validé » du chef sur le § 4 amendé.
2. Préciser et faire approuver A-3 ; obtenir créneau EXP-02b, témoin et pics n8n, puis relevés frais P-20/P-21, sans publier les retours bruts.
3. Après validation, adapter le banc au mode local et aux gardes du § 4, tests de régression et README compris. Aucun code hors périmètre.
4. Chef uniquement : vérification de l'isolation et des gardes, préparation, petite série puis séries dans l'enveloppe validée ; photos n8n et nettoyage du projet.
5. Rapport `19-mesure-d01.md`. Le chef inscrit seul la conclusion D-01 dans `decisions.md`.

## Commandes pour le chef de projet

Après relecture, pour publier les commits locaux dans la PR #164 existante :

```powershell
git -C "..\travaux-planner\pla-06-mesure-d01" push origin etude/pla-06-mesure-d01
```

```powershell
gh pr view 164
```

Ne pas recréer de PR ni la fusionner à ce stade. Les commandes serveur de reconnaissance sont dans le § 4 amendé ; aucune commande de série n'est autorisée avant validation et adaptation du banc.

## Prompt de reprise

```text
Tu reprends PLA-06 (mesure de D-01, 200 bases sur un serveur) du chantier PLA de Planner.
Branche etude/pla-06-mesure-d01, PR #164 en brouillon, dossier ..\travaux-planner\pla-06-mesure-d01.
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, la mission docs/plan/missions/pla-06.md
(sur main ou origin/chore/coordination-agents si absente), le plan docs/conception/plateforme/pla-06-mesure-d01.md
et docs/sessions/2026-11-15-etude-pla-06-mesure-d01.md.
Fait : origin/main fusionné sans rebase (5f4153a) ; § 4 amendé pour le serveur unique (311c0ba) ; 7 tests purs verts.
Le plan amendé ATTEND le « validé » du chef : aucune série et aucun code d'adaptation avant validation.
Propositions acceptées pour inscription : MySQL 2 Gio, Node 1 Gio, charge/relevés 512 Mio, total CPU 2,5 ;
arrêt sous 1 Gio disponible ou si n8n ralentit ; mesure avant EXP-02b ; contrôle manuel n8n avant/pendant/après.
A-3 reste ouvert : répartition CPU et groupe de contrôle. Créneau, témoin, pics n8n et relevés frais à fournir par le chef.
Après validation : adapter seulement le banc (mode local sans SSH/SCP, gardes, limites et README), puis faire tester par le chef.
L'agent ne lance aucune commande serveur. Aucun port public, aucun réseau/volume n8n partagé ; photos n8n inchangées ; nettoyage ciblé.
Le palier MySQL 4 Gio est suspendu. D-01 n'est pas confirmée, aucun rapport de capacité produit.
Périmètre : scripts/mesures/pla-06/, lignes prévues de .gitignore, plan et rapport PLA-06, ligne PLA-06 du suivi,
module « ce qui existe », fiche de session. Ne pas modifier backend/ ni decisions.md.
L'autorisation des deux conflits hors périmètre ne concernait que la fusion déjà terminée.
Questions avant toute supposition ; fiche et suivi à jour ; tout commiter localement ; jamais de git push.
Quand l'étape est finie, le dire : le coordinateur relit la branche.
```
