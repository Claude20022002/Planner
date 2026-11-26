# Session du 2026-11-22 · Étude EP-18 · `etude/ep18-faible-equipement`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5, deuxième choix de la fiche de mission ; session plan-b-projet-pacte-20) |
| Chantier | étude hors chantier, rangée sous QUA, sans code |
| Dossier de travail | `..\travaux-planner\etude-ep18` |
| Dernier commit | voir `git log -1` (le commit de cette fiche) |

## Objectif de la session

Écrire l'étude « contextes à faible équipement » (EP-18), confiée par le coordinateur sur un choix du chef de 9 h 50. Elle établit, fonction par fonction, ce qui marche sans téléphone de l'élève, avec peu ou pas de connexion, et avec ce qu'a l'école. Chaque case est prouvée dans le code, puis les manques sont rangés et un ordre est proposé.

**Avant** : la même session avait reçu ADM-02 le matin. Elle s'est arrêtée sans rien commiter : une autre session avait déjà écrit, dans le même dossier, un plan d'ADM-02 avec des réponses du chef qui contredisaient les siennes. Le chef a gardé le plan de 9 h 37. Le brouillon de cette session est rangé par le coordinateur dans `boites/ressources/2026-11-22-adm-02-brouillon-session-20.md`.

## Plan

La fiche de mission `docs/plan/missions/etude-ep18-faible-equipement.md` (branche `doc/coordination-equipe`). Le livrable est `docs/conception/qualite/etude-ep18-faible-equipement.md`.

Avant de commencer, la session a vérifié qu'aucun brouillon d'EP-18 n'existait ailleurs : aucun dossier de travail, aucune branche, aucun fichier « ep18 » ou « faible équipement » dans `Github Project`.

## Fait

- `57dd06a3` : premier jet, § 1 à § 4 (la question, les trois contextes, les réponses 1 à 6, la méthode).
- `5c017078` : § 5 à § 7, la grille fonction par fonction (chaque case cite son fichier et sa ligne au commit `b57753e9`), le poids mesuré et les suppositions de pays.
- Commit de cette fiche : § 3 complété (réponses 7 à 11), § 8 (16 manques rangés), § 9 (ordre proposé et section « EP-18 » du modèle de conception), § 10 (limites), et la fiche de session.

Ce que l'étude établit, en bref :
1. **Le site n'a aucun fonctionnement hors ligne** (aucun service worker).
2. **L'application mobile n'accepte que les étudiants** (`mobile/src/auth/AuthContext.jsx:63`) : MOB-08 dépend donc de MOB-02.
3. **L'élève sans téléphone est servi** par l'appel à la main, le jeu collectif (un seul jeu), l'emploi du temps imprimé et le quiz projeté (pour regarder). **Il ne l'est pas** par le quiz à son rythme, les sondages et les annonces.
4. **Un élève sans adresse électronique ne peut pas avoir de compte** (`backend/models/Users.js:20-24`) : c'est VSC-01, Q-20.
5. **Le poids** : 338,1 Ko compressés au premier chargement, puis de 92 à 100 Ko par écran de gestion, dont 36 Ko d'animation et 37 Ko de code commun. Le serveur compresse en gzip, pas en brotli.
6. **Le décalage horaire de l'école est figé à 0** (`shared/dates.js:13`) : la date est fausse la nuit dans une école d'un autre fuseau. C'est le correctif proposé en premier.
7. **N3 est déjà en partie fait dans l'application** : le poids s'affiche avant le téléchargement, avec une confirmation au-delà de 10 Mo. La reprise après coupure manque.

## Vérifié

- **Mesure du poids** :
  - `npm ci` puis `npm run build` dans `frontend/` (vite 7.3.7, 58 s), sur une installation propre à l'étude ;
  - les `node_modules` du dépôt principal ne suffisent pas : `lucide-react` y manque, alors que le fichier de verrouillage est identique ;
  - un script de mesure gardé hors du dépôt suit les imports statiques et additionne les tailles en gzip et en brotli. Les chiffres sont au § 6.
- **Les numéros de ligne cités** ont été relus. Sept étaient faux au premier jet et ont été corrigés avant le commit `5c017078`.
- **Pas de test** à lancer : aucun code n'a changé. `git status` ne montre que le livrable et la fiche. `frontend/node_modules` et `frontend/dist` restent dans le dossier, ignorés par git.

## Questions

Posées au chef par l'outil de questions le 22 nov. ; toutes les réponses retiennent la proposition.

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Contexte A | au moins un élève sans téléphone ni ordinateur | tranchée |
| 2 | Contexte B | lente (Slow 3G) et coupée | tranchée |
| 3 | Contexte C | deux niveaux : C1 ordinateur et projecteur ; C2 rien dans la salle | tranchée |
| 4 | La Bibliothèque | juger les plans BIB, pas StudyLib | tranchée |
| 5 | L'enseignant à téléphone simple | non noté, limite écrite | tranchée |
| 6 | Les familles | non notées, liste courte | tranchée |
| 7 | La feuille d'appel | imprimable, et la séance « réalisée » dans les 7 jours (S) | tranchée |
| 8 | Le quiz sans appareil | imprimer (S), puis la copie saisie par l'enseignant (M) | tranchée |
| 9 | L'appel sans réseau | MOB-02, puis MOB-08 | tranchée |
| 10 | Les SMS | pas avant les familles (étape 6), aucune dépense maintenant | tranchée |
| 11 | La Bibliothèque sans compte | non : projeter et imprimer ; critère d'impression pour BIB-09 | tranchée |

**Reste au chef** : l'ordre du § 9.1, et le texte de la section « EP-18 » du modèle de conception (§ 9.2). L'étude propose les deux, mais aucun n'est validé.

## État laissé

- État de l'étude, pour `suivi.md` (le coordinateur le reporte) : étude EP-18 → **écrite, à relire par le coordinateur**, puis l'ordre au chef.
- Rien n'est poussé.

## Reste à faire, dans l'ordre

1. La relecture du coordinateur, puis la PR ouverte par le chef.
2. La décision du chef sur l'ordre (§ 9.1) et sur la section « EP-18 » du modèle (§ 9.2).
3. Le coordinateur reporte les décisions :
   - dans les modules : MOB-02 avant MOB-08 ; MOB-06 redimensionnée ; les critères de BIB-06, BIB-09 et BIB-10 ; les fonctions nouvelles M-1, M-2, M-9, M-10, M-11 ;
   - dans le modèle de conception ;
   - dans `decisions.md` (réponses 7 à 11).
4. Plus tard : une mesure avec le profil « Slow 3G » dans un navigateur, sur le site lancé (§ 10).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\etude-ep18" push -u origin etude/ep18-faible-equipement
gh pr create --base main --head etude/ep18-faible-equipement --title "Étude EP-18 : Planner dans les contextes à faible équipement" --fill
# Après la fusion : retirer le dossier (pas de jonction ici : node_modules est une vraie installation)
git worktree remove --force "..\travaux-planner\etude-ep18"
```

## Prompt de reprise

```text
Tu reprends l'étude EP-18 (contextes à faible équipement), sans code, sur la branche
etude/ep18-faible-equipement, dans le dossier ..\travaux-planner\etude-ep18.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-5, EP-18, EP-19), docs/plan/suivi.md,
la fiche de mission docs/plan/missions/etude-ep18-faible-equipement.md (branche doc/coordination-equipe),
l'étude docs/conception/qualite/etude-ep18-faible-equipement.md et cette fiche
(docs/sessions/2026-11-22-etude-ep18-faible-equipement.md).
Fait : § 1 à § 10, réponses 1 à 11 du chef, grille prouvée au commit b57753e9, poids mesuré.
Reste : les remarques du coordinateur ; la décision du chef sur l'ordre (§ 9.1) et sur la section
« EP-18 » du modèle (§ 9.2) ; si une case change dans le code, la mettre à jour.
Règles : tu n'écris que le livrable et ta fiche de session ; le code se lit, il ne se modifie pas ;
questions avant toute supposition ; suivi.md non modifié ; tout est commité ; jamais de git push.
```
