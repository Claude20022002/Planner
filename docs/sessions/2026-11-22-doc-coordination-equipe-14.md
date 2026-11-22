# Session du 2026-11-22 (10 h 55 à 16 h 45) · coordination · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur, session `plan-b-projet-pacte-4c`, suite de la fiche `-13` |
| Chantier | hors chantier (coordination) |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | cette fiche ; état `d11380eb` |

La session a été inactive de 11 h 15 à 16 h 35 ; le chef a fait avancer les agents directement pendant ce temps (MKT-09, VIT-09c, VIT-20).

## Partage de la coordination

Une coordination de l'après-midi (`doc/coordination-2026-11-22`, PR #256) tient **VIT-20 seule**, par décision du chef ; cette session garde le reste. La session de VIT-20 n'est plus ouverte : la session qui porte aujourd'hui le nom `plan-b-projet-pacte-2e` est celle de la Bibliothèque (BIB), pas celle de VIT-20. **Tout ce qui touche VIT-20 passe par le chef.** La branche #256 porte les commits de #193 : ne pas la fusionner dans `doc/coordination-equipe` ; les deux PR de coordination se fusionnent l'une après l'autre (`decisions.md` : garder toutes les lignes ; `suivi.md` : garder les deux jeux de lignes, VIT-20 chez #256).

## Fait

| Commit | Contenu |
|---|---|
| `b6b135ba` | fusion de `origin/main` (conflit du module UIX : notre version, UIX-10d passée à « faite ») |
| `d8be63ee` | M-12 et VIT-09c validés, trame de MKT-09 à corriger, #252 verte, #193 en conflit |
| `5cadcf27` | M-10 relue (prête, #255) ; plan de M-1 validé avec la réponse du chef |
| `d11380eb` | M-12 et VIT-09c prêtes, M-11 validé (« crédits »), #255 verte, #193 à jour, MKT-09 chez la session d9 |

Relectures et validations (détail dans `decisions.md`, section « 22 nov., fin de matinée ») :

| Fonction | Verdict |
|---|---|
| M-10 (#255) | relue, **prête** ; CI entièrement verte, intégration comprise |
| M-12 (`fix/mob-nom-application`, `ea6c747d`) | plan validé, puis branche relue : **prête pour la PR** |
| M-11 (`fix/qje-jeux-unite-neutre`, `5601f126`) | plan validé, « crédits » ; code chez l'agent de Cursor |
| M-1 (`feat/edt-feuille-appel`, `30625a36`) | plan validé ; réponse du chef : l'appel après coup « compte, et se voit » ; code chez la session 20 |
| VIT-09c (`feat/vit-09c-logos-modules`, `19ca17b4`) | plan validé (outil d'images inclus dans Codex, choix du chef) ; rendu validé par le chef ; **prête pour la PR** |
| #252 (BIB-05) | intégration verte en CI : prête |
| #193 | conflit QJE résolu par l'agent de Cursor (`6fa8a5b0`) : prête, en dernier des études |
| MKT-09 | trame relue à 11 h (à corriger) ; Codex a livré jusqu'à `8d3ce6c` ; la session `plan-b-projet-pacte-d9` la tient depuis `45c7240` |

## Vérifié

- M-10 : serveur 11/11 (horloge, garde T-6), site 12/12, application 11/11, `verifier-neutre` ; fusion propre avec #252 et ADM-02.
- M-12 : application 12/12 (cache, donnees, session), `verifier-neutre`.
- VIT-09c : charte et icônes 18/18, `generer.mjs --verifier`, `verifier-neutre`, planche des 17 WebP regardée.
- Toutes les PR ouvertes fusionnent proprement avec `main` après #257 (`git merge-tree`).
- Non lancé : les parcours (la CI les fait).

## Les douze conditions du site

Faites : 3 à 6, 8, 9, 12. Condition 10 : VIT-13 prête (#254) ; VIT-15 est fondue dans VIT-20 (#257 fusionnée ; lot D, « selon votre équipement », à Codex, consigne de la coordination de VIT-20) ; VIT-16 attend les valeurs du chef. Conditions 2 et 11 : #223 a ses valeurs (FinAdmin Tech, OVH SAS, 30 jours), passe après #257 avec la résolution du pied de page ; restent pour le juriste le nom du directeur de la publication, la forme juridique et le SIREN. 7 : VIT-09b refait son plan après VIT-20. 1 : le 27 nov. Avant le déploiement : VIT-06b (relevé Traefik), le `.env` de QUA-10, `APP_TIMEZONE` (M-10).

## En attente du chef

- **MKT-09** : tranchée par le chef et relue (`33ec18b`) ; avant l'envoi : la revue `creative-quality-review`, un dépôt distant privé pour `planner-marketing`, l'accord de l'équipe du partenaire sur ses photos, garder ou retirer les notes du présentateur.
- **VIT-20** : qui coordonne VIT-20 maintenant (la session de l'après-midi n'est plus ouverte) ; la consigne du lot D à Codex.
- L'agent de QJE-14a (qui fera M-2a).
- La fiche -13 : valeurs de VIT-16, relevé Traefik, plan de STA-01 (#230), M16 (P-85), avis A et B sur VSC-01 (#215), question 3 d'UIX-06c, volumes de StudyLib, plan du retrait de Meilisearch, seau et clé MinIO.
- Le message d'Alexis de 0 h 11 (`boites\alexis\entree\`) est toujours à lui transmettre.

## Reste à faire, dans l'ordre

1. Suivre les fusions : #252, #255, #253, #254, #242 ; les PR de M-12 et VIT-09c une fois poussées ; #193 en dernier des études ; après #253, ranger M-3 à M-16 de l'étude EP-18 dans leurs modules (MOB-08 dépend de MOB-02).
2. Relire M-1 (session 20) et M-11 (agent de Cursor) à leur rapport ; valider le plan de M-9.
3. Reporter l'état dans `suivi.md` après chaque fusion.

## Prompt de reprise

```text
Tu es le coordinateur des agents de Planner (Codex, agent de Cursor, Claude de VS Code, les sessions Claude ouvertes par le chef,
Alexis avec son agent), sauf VIT-20, tenue par une autre coordination (doc/coordination-2026-11-22, #256) : pour VIT-20, passe par le chef.
Tu prends le relais de la fiche docs/sessions/2026-11-22-doc-coordination-equipe-14.md.
Travaille dans ..\travaux-planner\coordination-equipe, branche doc/coordination-equipe. Commence par git fetch puis git merge origin/main
(decisions.md : garde toutes les lignes ; suivi.md : garde notre version, puis remets-le à l'état réel). Ne fusionne pas
origin/doc/coordination-2026-11-22 dans ta branche (elle porte les commits de #193).
Une seule session de coordination à la fois : liste les sessions ouvertes (ListAgents) ; si l'une coordonne le même périmètre, arrête-toi.
Les noms de session sont des étiquettes : demande à chacune ce qu'elle tient.

Lis d'abord : AGENTS.md ; docs/plan/decisions.md (sections « 22 nov., matin » et « 22 nov., fin de matinée ») ; docs/plan/suivi.md
(Missions en cours) ; les skills coordination, relecture-branche et fin-de-session ; la fiche -14 ; la fiche de mission ep18-correctifs.

Commence par le tour d'état (skill coordination, § 1), les boîtes de Codex, de Cursor et d'Alexis, la CI de main, et
gh pr list --state merged depuis le 22 nov. 16 h 45.

Puis, dans l'ordre :
1) relis M-1 (session plan-b-projet-pacte-20, feat/edt-feuille-appel) à son rapport : le visa « appel saisi après coup » compte et se voit ;
2) relis M-11 (agent de Cursor, fix/qje-jeux-unite-neutre) à son rapport, puis valide le plan de M-9 (fichiers du serveur web : vérifie
   qu'aucune autre branche ne les tient) ;
3) suis les fusions : #252, #255, #253, #254, #242, puis M-12 et VIT-09c une fois poussées, #193 en dernier ; après #253, range M-3 à M-16
   de l'étude EP-18 dans leurs modules (MOB-08 dépend de MOB-02) ;
4) reporte l'état de chaque fonction dans suivi.md (toi seul) ; dis au chef où en sont les douze conditions.

En attente du chef : voir la fiche -14, « En attente du chef ».

Repères : aucun pays supposé ; tous les contextes (EP-18) ; sobre et mesuré (EP-19) ; rien de réel dans le dépôt public ; rien publié en ligne
sans demande du chef. Dans les commandes données au chef, jamais de « <n> ». Nomme tes messages de boîte avec l'heure réelle du poste
(date +%H%M). Avant de remettre une mission, relis le dossier de travail lui-même (fichiers non suivis compris).

Règles : tu ne codes aucun lot ; plan validé avant le code ; questions avant toute supposition (outil de questions) ; chaque décision dans
decisions.md, marquée *(coordinateur)* quand elle est la tienne ; fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
