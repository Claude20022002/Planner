# Session du 2026-11-27 · QJE-18 · `etude/qje-18-atelier-jeux`

| | |
|---|---|
| Fait par | Claude (Opus 5.5), sous-agent du coordinateur ; reprise le 28 nov. après la limite d'usage |
| Chantier | JEU (QJE-18, hors chantier, demande du chef du 27 nov.) |
| Dossier de travail | `..\travaux-planner\qje-18-atelier-jeux` |
| Dernier commit | `bc44598e` (étude) ; cette fiche dans le commit suivant |

## Objectif de la session

Étape 1 de QJE-18 : l'étude et le catalogue des jeux de l'atelier, documents seuls, au chef.

## Plan

[Fiche de mission](../plan/missions/qje-18-atelier-jeux.md) (branche `doc/coordination-2026-11-27-suite`), étape 1. L'étude : [qje-18-atelier-jeux.md](../conception/jeux/qje-18-atelier-jeux.md).

## Fait

- `bc44598e` : l'étude. Relevé sourcé et daté de dix plateformes ou genres et de leurs mécaniques ; deux méta-analyses (Clark et coll. 2016, Wouters et coll. 2013) ; ce que le code impose à un jeu nouveau (écran générique, registres, solutions de référence, tests par position, mode collectif absent des simulations) ; croisement mécaniques × matières ; **onze jeux** en fiche courte ; ordre (J1 Le Courrier du port, J2 L'Archipel, J3 L'Atelier des vérins pour commencer) ; douze questions au chef.
- Supports de cours lus hors dépôt, seulement dans la liste permise, pour le niveau des défis ; rien n'en est recopié, aucun nom. Textes extraits dans le dossier temporaire de la session, effacés à la fin.

## Vérifié

- `node scripts/verifier-neutre.mjs` : réussi (7 exceptions justifiées, inchangées).
- Chiffres des défis vérifiés par un script hors dépôt : solution unique pour L'Archipel (13, 14, 15), Le Fonds des projets (trois défis), La Sonde (GDD, GDGD, DGDGDDD) ; effectifs et khi-deux de L'Enquête des halles (0,8 ; 12,8) ; Le Poste de quartier (équilibre unique au nom des phases près ; meilleur neutre du défi 3 : 1,74 A) ; préfixes de Cadastre IP.
- Aucun code, aucun test du dépôt touché.

## Questions

Les douze questions sont au § 3 de l'étude. Celles qui bloquent :

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Onze jeux, trois pour commencer ? | | au chef |
| 2 | Deux jeux de lycée dès cette série ? | | au chef |
| 4 | Trois domaines nouveaux (`mathematiques`, `genie-electrique`, `langues-communication`) | | au chef |
| 5 | Contre-exemple montré après un échec (machines à tester) | | au chef |
| 6 | Moteur réutilisé sous un second nom (`ordre`, `portefeuille`) | | coordinateur |
| 7 | Périmètre d'écriture d'un jeu à élargir (registres, `solutionsReference.js`, tests, seed) | | coordinateur |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) :
  - ligne des missions : `QJE-18 … | etude/qje-18-atelier-jeux (étude bc44598e, fiche <sha>) | **étude écrite** : onze jeux proposés, trois pour commencer (Courrier du port, Archipel, Atelier des vérins), douze questions au chef dont 6 et 7 au coordinateur | 28 nov. : étude au chef, à pousser`
  - ligne du tableau des fonctions : `QJE-18 … | à faire : étude écrite (etude/qje-18-atelier-jeux), au chef`
- Chantier JEU : QJE-18 reste hors chantier.

## Reste à faire, dans l'ordre

1. Le chef vise l'étude (liste, ordre, questions 1, 2, 4, 5) ; le coordinateur tranche 6 et 7 et élargit le périmètre dans la fiche de mission.
2. J1 Le Courrier du port : branche `feat/qje-18-courrier-du-port`, fiche du jeu, consigne d'image, code, tests, relecture.
3. J2 L'Archipel, puis J3 L'Atelier des vérins.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-18-atelier-jeux" push -u origin etude/qje-18-atelier-jeux
gh pr create --base main --head etude/qje-18-atelier-jeux --title "QJE-18 : étude et catalogue de l'atelier des jeux" --fill
```

## Prompt de reprise

```text
Tu reprends QJE-18 (l'atelier des jeux) du module JEU, hors chantier, sur la branche etude/qje-18-atelier-jeux,
dans le dossier ..\travaux-planner\qje-18-atelier-jeux.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la fiche de mission docs/plan/missions/qje-18-atelier-jeux.md, l'étude docs/conception/jeux/qje-18-atelier-jeux.md
et cette fiche (docs/sessions/2026-11-27-etude-qje-18-atelier-jeux.md).
Fait : l'étude (onze jeux, ordre, douze questions), commitée.
Reste : le visa du chef sur l'étude ; puis J1 Le Courrier du port sur feat/qje-18-courrier-du-port (fiche du jeu, image, code, tests).
Questions en attente : 1, 2, 4, 5 au chef ; 6 et 7 au coordinateur (§ 3 de l'étude).
Supports de cours : seulement les fichiers de ..\travaux-planner\boites\supports-de-cours.md ; rien recopié.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
