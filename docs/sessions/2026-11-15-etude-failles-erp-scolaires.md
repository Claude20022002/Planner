# Session du 2026-11-15 · Étude hors chantier · `etude/failles-erp-scolaires`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), deux sessions le même jour |
| Chantier | aucun : étude hors chantier, demande du chef le 15 nov. (comme #174) |
| Dossier de travail | `..\travaux-planner\failles-erp-scolaires` |
| PR | #186, ouverte |
| Dernier commit | voir `git log -1 etude/failles-erp-scolaires` |

## Objectif

1. **Première session** : reprendre le contexte du projet (plan, suivi, PR et branches ouvertes). Ensuite, à la demande du chef, analyser cinq ERP spécialisés pour les établissements, « comme OpenEduCat, Madata Africa » : leurs failles, ce qu'en disent les utilisateurs, ce qu'ils ne couvrent pas, les problèmes qu'on y trouve.
2. **Seconde session (reprise)** : vérifier la PR, obtenir les réponses du chef aux questions 5 à 7, puis inscrire chaque décision dans `decisions.md` et dans le module concerné.

## Plan

Pas de plan de conception : c'est une étude, sans code. Le cadre a été fixé par les réponses du chef aux questions (voir plus bas).

## Fait

**Première session**
- `bbe67bd` : [docs/etude-marche/09-failles-erp-scolaires.md](../etude-marche/09-failles-erp-scolaires.md), et l'index du dossier (lignes 07 et 09 ; la 07 manquait).
- `4a49001` : `suivi.md` (ligne hors chantier) et cette fiche.

Principaux constats, détaillés dans le document :
- **OpenEduCat** :
  - chaque jour, le module de base envoie à l'éditeur, en Inde, le nom, l'adresse e-mail et le téléphone de l'école, ainsi que la liste de ses modules ;
  - la tâche planifiée qui fait l'envoi est masquée dans l'écran d'administration ;
  - le ticket qui l'a signalé (#1058) a été fermé sans réponse, et le code n'a pas changé ;
  - son « Generate Timetable » recopie une semaine saisie à la main ;
  - l'édition libre n'a que 12 modules.
- **Frappe Education** :
  - jusqu'au 15 octobre 2026, tout élève connecté pouvait lire les fiches de tous les autres. C'est corrigé en 15.2 et en 16 ;
  - un avis de sécurité porte sur `enroll_student` ;
  - un générateur d'emploi du temps est en PR (#495), avec un placement en partie au hasard ;
  - des changements cassent les mises à jour.
- **Fedena** : la version libre 2.3 est abandonnée, avec la faille CVE-2021-27980 (cookie forgé, prise du compte administrateur, puis commandes sur le serveur) jamais corrigée.
- **PERIS SCHOOL** : la couverture la plus large pour l'Afrique francophone, mais rien n'est vérifiable (prix, avis, hébergement), et sa fiche App Store est contradictoire.
- **Studirium** : jeune, centré sur l'inscription, avec un matricule maison.
- **Madata** n'est pas un ERP scolaire.

**Seconde session** (un commit, documents seulement)
- `decisions.md` : sept lignes datées du 15 nov. (EP-13, faille supposée chez Frappe, PLA-04, QUA-08, MOB, ETA-02, renvoi croisé des deux études).
- `README.md` du plan : EP-13 au § 6 ; QUA-08 et QUA-09 dans la ligne « Libre » du § 2.
- Modules :
  - QUA : « Ce qui existe » (envois sortants lus dans le code, pas de `SECURITY.md`), fonctions et critères de QUA-08 et QUA-09 ;
  - PLA : critère de PLA-04 (cas élève ou parent) ;
  - MOB : critère avant toute publication dans un magasin, EP-13 ;
  - ETA : critère de ETA-02 (matricule de l'État) ;
  - MKT et le modèle de conception : « EP-1 à EP-13 ».
- `suivi.md` : ligne de l'étude (#186), ligne de l'essai de Frappe à faire, lignes QUA-08 et QUA-09.
- Document 09 :
  - **détail de la faille supposée de Frappe retiré** (§ 2.2 et § 6), comme le veut la décision Q6. Ce détail reste dans le commit `bbe67bd`, déjà poussé ;
  - renvoi croisé avec le rapport du chef ;
  - deux faits du rapport du chef relus à la source et ajoutés : la page école de Madata qui exclut la vie scolaire, la discussion #1053 d'OpenEduCat sur les messages non traduisibles ;
  - § 4 et § 5 mis à jour avec les décisions.
- Hors du dépôt : `..\travaux-planner\prive\frappe-essai-note.md`, le détail de la faille supposée et la marche à suivre pour l'essai.

## Vérifié

- Le code et les dépôts des produits libres ont été lus par l'API de GitHub (branches `19.0`, `version-15.2`, `version-16` et autres), le 15 nov.
- Les avis des comparateurs sont connus par les résumés des moteurs de recherche : G2, Capterra et l'App Store refusent ou tronquent la lecture directe.
- La base de CVE du NIST et l'API de CVE.org n'ont pas répondu. La CVE de Fedena vient de la page du chercheur.
- Seconde session :
  - `gh pr list` : la PR #186 existe et est ouverte ;
  - les envois sortants de Planner ont été lus dans le code de `main` (IA, Expo, courriel, B2 ; aucune télémétrie) ;
  - la [page école de Madata](https://madata.africa/fr/erp-ecole) (mise à jour le 29 sept. 2026) et la [discussion #1053](https://github.com/openeducat/openeducat_erp/discussions/1053) ont été relues le 15 nov.
- `node scripts/verifier-neutre.mjs` : passe.
- **Non fait** : aucun produit installé ni essayé ; aucune installation de tiers sondée.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quels cinq ERP ? | mélange : OpenEduCat, Frappe Education, Fedena, PERIS SCHOOL, un africain de plus (Studirium) | réglé (chef) |
| 2 | Madata, sans module école ? | encadré court | réglé (chef) |
| 3 | Profondeur ? | avis, tickets et code, besoins non couverts, conséquences pour Planner | réglé (chef) |
| 4 | Livrable ? | fichier 09, branche `etude/`, hors chantier, rien en ligne | réglé (chef) |
| 5 | Inscrire « Planner n'envoie rien chez l'éditeur sans le dire » comme exigence produit (EP-13) ? | oui, dès l'étape 1, avec une liste publique des envois sortants (QUA-09) | réglé (chef) |
| 6 | Que faire d'une faille supposée chez un tiers ? | essai en local d'abord, puis signalement privé par le chef ; rien de public avant leur réponse | réglé (chef) |
| 7 | Autres propositions du § 5 : tests de PLA-04, `SECURITY.md` (QUA), fiches de confidentialité de MOB, matricule de l'État dans ETA-02 | les quatre retenues | réglé (chef) |
| 8 | Le rapport du chef « Failles des ERP scolaires » (`main`, e9e67769) et le 09 : que faire des deux ? | renvoi croisé, sans fusion | réglé (chef) |

## Choix faits par l'agent, réversibles

- La liste des envois sortants est une fonction de **QUA** (QUA-09), et non d'EXP.
- QUA-08 et QUA-09 sont classées « libre », taille S.
- La règle de ETA-02 est écrite dans ETA. VSC-01 n'est pas modifié, car son plan est en cours de validation : la ligne de `decisions.md` dit qu'il en tient compte.

## État laissé

- PR #186 : un commit de plus, à pousser.
- `suivi.md` : étude « PR ouverte, questions tranchées » ; essai de Frappe « à faire » ; QUA-08 et QUA-09 « à faire ».
- Aucun chantier touché. Aucune fonction du plan n'a changé d'état.

## Reste à faire, dans l'ordre

1. Le chef pousse la branche. Ensuite, il relit et fusionne la PR #186 (documents seulement).
2. **Essai de Frappe Education**, dans une tâche `etude/` à part : marche à suivre dans `..\travaux-planner\prive\frappe-essai-note.md`, hors du dépôt. Rien de public avant la réponse de Frappe.
3. QUA-08 (`SECURITY.md`) et QUA-09 (liste des envois sortants), à prendre en « libre » ; le délai de réponse de `SECURITY.md` est une question pour le chef.
4. Points à vérifier du § 6 du document : essai d'OpenEduCat (PR #176), devis de PERIS SCHOOL, questions pour les entretiens de VEN-02.
5. Propositions du § 5 non tranchées : secret par défaut dans EXP-08 et PLA-03b, arguments pour MKT, stratégie pour VEN-02.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\failles-erp-scolaires" push
gh pr view 186 --web
```

## Prompt de reprise

```text
Tu reprends l'étude hors chantier « failles de cinq ERP scolaires » de Planner, branche
etude/failles-erp-scolaires (PR #186), dossier ..\travaux-planner\failles-erp-scolaires.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/etude-marche/09-failles-erp-scolaires.md et cette fiche
(docs/sessions/2026-11-15-etude-failles-erp-scolaires.md).
Fait : le document 09 ; les questions 1 à 8 tranchées par le chef le 15 nov. et inscrites
(decisions.md, EP-13, PLA-04, QUA-08, QUA-09, MOB, ETA-02, renvoi vers le rapport du chef).
Reste : la PR #186 à fusionner par le chef ; l'essai en local de Frappe Education (tâche
etude/ à part, détail hors du dépôt dans ..\travaux-planner\prive\frappe-essai-note.md,
rien de public avant la réponse de Frappe) ; QUA-08 et QUA-09 ; les points du § 6.
Règles : aucune affirmation sans source ni niveau de preuve ; ne jamais sonder une
installation de tiers ; pas de code hors d'un plan validé ; questions avant toute
supposition ; fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
