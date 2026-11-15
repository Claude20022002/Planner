# Session du 2026-11-15 · Étude hors chantier · `etude/failles-erp-scolaires`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | aucun : étude hors chantier, demande du chef le 15 nov. (comme #174) |
| Dossier de travail | `..\travaux-planner\failles-erp-scolaires` |
| Dernier commit | voir `git log -1 etude/failles-erp-scolaires` |

## Objectif de la session

D'abord, reprendre le contexte du projet (plan, suivi, PR et branches ouvertes). Ensuite, à la demande du chef, analyser cinq ERP spécialisés pour les établissements, « comme OpenEduCat, Madata Africa » : leurs failles, ce qu'en disent les utilisateurs, ce qu'ils ne couvrent pas, les problèmes qu'on y trouve.

## Plan

Pas de plan de conception : c'est une étude, sans code. Le cadre a été fixé par les réponses du chef aux questions de la session (voir plus bas).

## Fait

- `bbe67bd` : [docs/etude-marche/09-failles-erp-scolaires.md](../etude-marche/09-failles-erp-scolaires.md), et l'index du dossier (lignes 07 et 09 ; la 07 manquait).
- Commit de fin de session : `suivi.md` (ligne hors chantier) et cette fiche.

Principaux constats, détaillés dans le document :
- **OpenEduCat** :
  - chaque jour, le module de base envoie à l'éditeur, en Inde, le nom, l'adresse e-mail et le téléphone de l'école, ainsi que la liste de ses modules ;
  - la tâche planifiée qui fait l'envoi est masquée dans l'écran d'administration ;
  - le ticket qui l'a signalé (#1058) a été fermé sans réponse, et le code n'a pas changé ;
  - son « Generate Timetable » recopie une semaine saisie à la main ;
  - l'édition libre n'a que 12 modules.
- **Frappe Education** :
  - jusqu'au 15 octobre 2026, tout élève connecté pouvait lire les fiches de tous les autres. C'est corrigé en 15.2 et en 16, mais le correctif n'apparaît pas dans `develop` (à confirmer par un essai) ;
  - un avis de sécurité porte sur `enroll_student` ;
  - un générateur d'emploi du temps est en PR (#495), avec un placement en partie au hasard ;
  - des changements cassent les mises à jour.
- **Fedena** : la version libre 2.3 est abandonnée, avec la faille CVE-2021-27980 (cookie forgé, prise du compte administrateur, puis commandes sur le serveur) jamais corrigée.
- **PERIS SCHOOL** : la couverture la plus large pour l'Afrique francophone, mais rien n'est vérifiable (prix, avis, hébergement), et sa fiche App Store est contradictoire.
- **Studirium** : jeune, centré sur l'inscription, avec un matricule maison.
- **Madata** n'est pas un ERP scolaire.

## Vérifié

- Le code et les dépôts des produits libres ont été lus par l'API de GitHub (branches `19.0`, `version-15.2`, `version-16`, `develop`, `feat/timetable-generation-v16`), le 15 nov.
- Les avis des comparateurs sont connus par les résumés des moteurs de recherche : G2, Capterra et l'App Store refusent ou tronquent la lecture directe.
- La base de CVE du NIST et l'API de CVE.org n'ont pas répondu. La CVE de Fedena vient de la page du chercheur.
- `node scripts/verifier-neutre.mjs` : passe.
- **Non fait** : aucun produit installé ni essayé ; aucune installation de tiers sondée.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quels cinq ERP ? | mélange : OpenEduCat, Frappe Education, Fedena, PERIS SCHOOL, un africain de plus (Studirium) | réglé (chef) |
| 2 | Madata, sans module école ? | encadré court | réglé (chef) |
| 3 | Profondeur ? | avis, tickets et code, besoins non couverts, conséquences pour Planner | réglé (chef) |
| 4 | Livrable ? | fichier 09, branche `etude/`, hors chantier, rien en ligne | réglé (chef) |
| 5 | Inscrire « Planner n'envoie rien chez l'éditeur sans le dire » comme exigence produit (EP-13) ? | — | en attente (chef) |
| 6 | Signaler à Frappe, par leur canal privé, que `develop` semble rouvrir la lecture des fiches d'élèves, après l'avoir confirmé par un essai ? | — | en attente (chef) |
| 7 | Autres propositions du § 5 : tests de PLA-04, `SECURITY.md` (QUA), fiches de confidentialité de MOB, matricule de l'État dans ETA-02 | — | en attente (chef) |

## État laissé

- `docs/plan/suivi.md` : ligne « Étude : failles de cinq ERP scolaires » dans les travaux hors chantier, avec la mention « PR à ouvrir ».
- Aucun chantier touché. Aucune fonction du plan n'a changé d'état.

## Reste à faire, dans l'ordre

1. Le chef pousse la branche et ouvre la PR (documents seulement).
2. Le chef tranche les questions 5 à 7. Une proposition retenue devient une ligne de `decisions.md`, et une fonction ou un critère dans le module concerné.
3. Points à vérifier du § 6 du document : essai d'OpenEduCat (PR #176), essai de `develop` de Frappe, devis de PERIS SCHOOL, questions pour les entretiens de VEN-02.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\failles-erp-scolaires" push -u origin etude/failles-erp-scolaires
gh pr create --base main --head etude/failles-erp-scolaires --title "Étude : failles de cinq ERP scolaires" --fill
```

## Prompt de reprise

```text
Tu reprends l'étude hors chantier « failles de cinq ERP scolaires » de Planner, branche
etude/failles-erp-scolaires, dossier ..\travaux-planner\failles-erp-scolaires.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/etude-marche/09-failles-erp-scolaires.md et cette fiche
(docs/sessions/2026-11-15-etude-failles-erp-scolaires.md).
Fait : le document 09 (OpenEduCat, Frappe Education, Fedena, PERIS SCHOOL, Studirium ;
Madata en encadré), lu dans le code, les dépôts, les avis et la presse au 15 nov. ;
index du dossier et suivi.md à jour.
Reste : vérifier avec gh pr list si la PR existe ; obtenir les réponses du chef aux
questions 5 à 7 de la fiche (EP-13 « aucun envoi caché », signalement à Frappe,
propositions du § 5) ; puis inscrire chaque décision dans decisions.md et le module concerné.
Règles : aucune affirmation sans source ni niveau de preuve ; ne jamais sonder une
installation de tiers ; pas de code hors d'un plan validé ; questions avant toute
supposition ; fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
