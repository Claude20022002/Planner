# Session du 2026-11-21 · étude StudyLib · `etude/bib-studylib-pile`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session de VS Code ; reprise de la file d'interface (fiche `2026-11-21-doc-qje-14-studio-forms.md`) |
| Chantier | étude hors chantier, sans code (accord du chef du 18 nov., « étude d'abord ») |
| Dossier de travail | `..\travaux-planner\etude-studylib` |
| Dernier commit | voir `git log -1` ; étude : `3121ec52` |

## Objectif de la session

1. #245 (UIX-06c) : corriger ce que demanderait la relecture du coordinateur.
2. L'étude StudyLib ([fiche](../plan/missions/etude-studylib.md)) : questions au chef, puis l'étude.

## Fait

- #245 : **aucune relecture ni commentaire**. La tête est `85a25308` (fusion de `main` après #246, par le chef). Deux contrôles tournaient encore au moment de la lecture. Rien à corriger.
- `etude/bib-studylib-pile` créée depuis `origin/main` (`686ebaf9`).
- `..\StudyLib` (`main`, `bb3313b`) lu sans modification : routes, migrations, services, configuration, identité, déploiement et sauvegarde ; côté Planner, l'intégration, l'espace de cours et le mobile.
- 12 questions posées au chef, toutes répondues (étude, § 7).
- `3121ec52` : [docs/conception/bibliotheque/etude-studylib-pile.md](../conception/bibliotheque/etude-studylib-pile.md).

## Ce que l'étude établit

- **Aucun prêt de livres** dans StudyLib : la correction de la fiche est confirmée.
- **Meilisearch** tourne en production (256 Mo), alors qu'aucun code ne l'appelle.
- Une seule des cinq fonctions est une bibliothèque. Les avis de stage et les idées de projet vont à STA, les événements à COM ou aux annonces (réponses 5 et 6).
- Trois voies : A (garder Laravel) environ 12 jours, B (reconstruire) environ 22 jours, C (par morceaux) environ 25 jours, bruts. S'y ajoutent environ 6 jours communs aux trois voies.
- **Recommandation : B, en lots livrables, sans redéployer StudyLib**. Elle donne une seule technologie (réponse 9), fait disparaître I-4 et I-5 pour la Bibliothèque, retire UIX-10f, et retire cinq conteneurs.

## Vérifié

- Document seul, sans code.
- `node scripts/verifier-neutre.mjs` : vert.
- Les numéros de ligne cités dans l'étude ont été revérifiés, et les totaux recalculés.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 12 | voir l'étude, § 7 | toutes répondues le 21 nov. | répondues |
| 13 | Volumes de la reprise | la commande de comptage est à lancer par le chef (message de la session) | **en attente du chef** |

## État laissé

Pour `suivi.md`, que le coordinateur reporte (non modifié ici) : **étude StudyLib : premier jet écrit** (`etude/bib-studylib-pile`, `3121ec52`). Elle attend deux choses du chef : les volumes, et la décision sur la voie (étude, § 5).

Pour le coordinateur :

- **`decisions.md`** :
  - les 12 réponses de l'étude ;
  - la réponse 8 (la Bibliothèque de la deuxième école dès l'étape 3), qui change l'étape de BIB-01 et BIB-02 ;
  - les réponses de QJE-14, et les réponses 9, 10 et 13 d'UIX-11 et d'UIX-06c (reportées des fiches précédentes).
- **Migrations** : trois numéros à réserver pour QJE-14 (0084 à 0086 proposés). 0083 (STA-01) est déjà inscrite sur la branche de coordination.
- **STA-01 (#230)** : la réponse 6 met aussi les avis de stage dans STA. Il faut le dire à Alexis avant la validation de son plan.
- **Correctif Meilisearch** (réponse 10) : à attribuer. Plan court au chef ; le correctif touche `deploy/` et le serveur.

## Reste à faire, dans l'ordre

1. Push de `etude/bib-studylib-pile` et PR par le chef.
2. Le chef lance la commande de comptage et donne les nombres. L'agent complète l'étude, § 3.2, et confirme la taille de B7.
3. Le chef décide la voie et les sept points du § 5.
4. #245 : corriger ce que demandera la relecture du coordinateur, si elle revient avant la fusion.
5. UIX-10d, le mobile à la charte (plan d'UIX-10, § 9) : nouvelle fonction, donc **nouvelle session**.
6. VIT-09b en dernier sur le site : planche et captures montrées au chef avant le commit.
7. QJE-14a quand elle est attribuée : plan court validé avant tout code.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\etude-studylib" push -u origin etude/bib-studylib-pile
gh pr create --base main --head etude/bib-studylib-pile --title "Étude : garder StudyLib en Laravel ou reconstruire la Bibliothèque (premier jet)" --fill
```

## Prompt de reprise

```text
Tu es Claude de VS Code sur Planner (ta file d'interface, puis VIT-09b).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md et la feuille de route (branche doc/coordination-equipe),
puis la fiche docs/sessions/2026-11-21-etude-bib-studylib-pile.md (branche etude/bib-studylib-pile).
Fait le 21 nov. : étude StudyLib écrite (3121ec52, docs/conception/bibliotheque/etude-studylib-pile.md),
12 réponses du chef ; recommandation : voie B (reconstruire dans Planner, en lots), une seule technologie.
#245 (UIX-06c) : aucune relecture à la clôture.
Reste, dans l'ordre :
1) si le chef donne les volumes (commande de comptage) : compléter l'étude, § 3.2, et la taille de B7 ;
   s'il décide la voie : l'écrire dans l'étude (§ 5), sans rien coder ;
2) #245 : corriger ce que demandera la relecture du coordinateur, s'il revient avant la fusion ;
3) UIX-10d, le mobile à la charte (plan d'UIX-10, § 9) : branche feat/uix-10d-… depuis origin/main,
   dans ..\travaux-planner\<nom> ; questions et plan court validé avant tout code ;
4) VIT-09b en dernier, planche et captures montrées au chef avant le commit ;
5) QJE-14a quand elle est attribuée : plan court validé avant tout code.
Pour le coordinateur : decisions.md (12 réponses de l'étude StudyLib, réponses de QJE-14, réponses 9, 10, 13
d'UIX-11 et UIX-06c) ; trois migrations pour QJE-14 (0084 à 0086) ; avis de stage dans STA (réponse 6, à dire
à Alexis pour #230) ; correctif Meilisearch à attribuer.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour en fin de session ; suivi.md non modifié ; jamais de git push.
```
