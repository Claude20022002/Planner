# Session du 2026-11-18 (5) · Coordination : reprise après la pause, relectures, UIX-11 et étude EP-18 · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session de VS Code désignée coordinatrice par le chef |
| Fiche précédente | [2026-11-18-doc-coordination-equipe-4.md](2026-11-18-doc-coordination-equipe-4.md) : passage |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; avant : `9342f37c` |

## Objectif de la session

Reprendre la coordination après la pause de 16 h 05 : tour d'état, boîtes, relecture de ce qui a fini depuis 16 h, `suivi.md` à l'état réel, files de la feuille de route, fiches de l'étude EP-18 et du tableau de bord de l'administration.

## Fait

- `git merge origin/main` sans conflit (#199, #205 à #209 et #207 entrés). Aucune autre session de coordination active (`coordination-agents` est la branche du 16 nov.).
- **Boîtes** : 6 rapports de Codex (VIT-06) et 4 de l'agent de Cursor (QJE-01, parcours, VIT-07) lus et rangés dans `sortie\traites\`, avec 6 anciens rapports (16 et 17 nov.) déjà traités sur le fond. Trois consignes déposées :
  - Cursor, 17 h 12 : plan de VIT-07 à corriger ;
  - Codex, 17 h 12 : UIX-09 maintenant ;
  - Codex, 17 h 16 : VIT-06 validé par le chef.
- **Relectures** :
  - **#207 (UIX-10a)**, fusionnée à 16 h 14 sans relecture du code : **conforme**. 7 tests de la charte, `generer.mjs --verifier` et `verifier-neutre.mjs` relancés ici, CI de `main` verte sur `5f053ebf`. Mission close ;
  - **#210 (parcours vers minuit, agent de Cursor)** : **prête**. Seuls trois fichiers de test changent, le plan est validé par le chef, et la CI est entièrement verte (parcours en 23 min 45) ;
  - **plan de VIT-07** (`fafd3f15`) : **à corriger**. Ses faits sont justes, mais EP-18 et la règle Massar manquent : la consigne de 16 h 05 n'avait pas été lue ;
  - **plan de VIT-06** (`5a7a0067`) : complet, sans IP dans le diff. **Validé par le chef** ;
  - **plan de VIT-08** : déjà validé par le chef (`5b62f702`), constat seulement.
- **Décisions du chef** (outil de questions, vers 17 h 15) : UIX-11 refait et complété, par Claude de VS Code après UIX-10b ; étude EP-18 par une nouvelle session Claude ; plan de VIT-06 validé.
- **Fiches de mission** :
  - [etude-ep18-faible-equipement](../plan/missions/etude-ep18-faible-equipement.md) ;
  - [uix-11-tableau-de-bord](../plan/missions/uix-11-tableau-de-bord.md) ;
  - [etude-studylib](../plan/missions/etude-studylib.md) corrigée : aucun prêt de livres dans StudyLib.
  - Les fiches VIT-06, VIT-07, VIT-08, UIX-10a et sortie de ClassQuiz ont leur ligne de suivi.
- **`suivi.md`** à l'état réel :
  - en-tête conforme à la règle du 18 nov. ;
  - « Missions en cours » refait (#199 et #205 retirées, une ligne vide qui coupait le tableau supprimée) ;
  - lignes UIX-06b, UIX-06c, UIX-10, UIX-11, VIT-06, VIT-07 et VIT-08 ajoutées, et QJE-01 passée à « fait » ;
  - liste des PR ouvertes corrigée.
- **Feuille de route** : retour du coordinateur, files mises à jour, UIX-11 dans la file de Claude de VS Code, une section pour la nouvelle session Claude.
- **`decisions.md`** : dix lignes pour cette reprise.

## Ajout de 17 h 45 : les illustrations du site (VIT-09)

#210 est fusionnée, et #211 (cette branche) est poussée. Le chef trouve que **le site manque d'illustrations**. Ses choix, faits par l'outil de questions :
- des dessins en code sur **toutes les pages** ;
- quelques **captures réelles sans nom d'école** ;
- **la première section de chaque page améliorée** ;
- confiée à Claude de VS Code, après VIT-08 ;
- la **7e condition** de la mise en ligne.

Fait :
- la fiche [vit-09-illustrations](../plan/missions/vit-09-illustrations.md) ;
- la 7e condition dans la fiche de VIT-06 et dans la feuille de route ;
- `suivi.md` et `decisions.md` à jour ;
- deux consignes de 17 h 48 : Codex intègre la 7e condition au plan de VIT-06, et l'agent de Cursor ne dessine rien dans VIT-07.

**Constat** : les données des parcours portent « hestim » dans leurs adresses e-mail. Les captures demandent donc des données neutres à part. Le chef voit chaque capture avant le commit.

## Écarts trouvés

| Écart | Ce qu'il faut |
|---|---|
| `pla-03b-schema-depart` : trois fichiers modifiés, **non commités depuis le 15 nov.** (`DEPLOIEMENT.md`, `baseNeuve.test.js`, `contexteEtablissement.test.js`) | au chef : rouvrir la session PLA-03b (Fable 5.2) pour les commiter ou dire qu'ils sont à jeter |
| `feat/mot-13-coupure-fine` (`b9f1fbf3`) : finie le 15 nov., **jamais poussée** ; elle modifie `suivi.md`, d'avant la règle | à mettre à jour depuis `main`, en gardant le `suivi.md` de `main`, puis à relire. C'est l'un des verrous de la fermeture de MOT |
| La consigne de 16 h 05 à l'agent de Cursor était restée dans `entree\` quand il a écrit son plan | rappelé dans la consigne de 17 h 12 ; à surveiller : l'agent doit lire sa boîte avant chaque plan |
| La ligne UIX-10 du module UIX dit encore « UIX-10a codée, PR à ouvrir » | à corriger par UIX-10b (Claude de VS Code) |
| CI rouge sur `db0e3de7` (`main`, 15 h 38), puis sur #211 (17 h 33) : Maven Central répond 429 pendant la construction de l'image du solveur dans la tâche des parcours | deux fois en deux heures : ce n'est plus un accident. Relancer la tâche ; proposer au chef un correctif court (cache Maven de la CI pour l'image du solveur), plan à valider |

## État des chantiers

**MOT n'est pas fini.** Il reste :
- MOT-13c, avec ADM-02 ;
- le refus de l'activation fine, non poussé ;
- le collège de MOT-02 ;
- MOT-04.

L'ouverture de VSC n'est donc pas encore à proposer. VSC-01, la conception, reste au n° 4 de la file de Codex.

## Questions encore ouvertes

| N° | Question | À qui |
|---|---|---|
| 1 | Les SVG officiels des logos (condition 3 de VIT-06) | chef |
| 2 | Le texte des mentions légales et de la confidentialité (condition 2) : l'équipe le rédige, le chef le valide. Qui le rédige ? | chef |
| 3 | La prochaine mission d'Alexis (étape 4) | chef |
| 4 | Qui met `feat/mot-13-coupure-fine` à jour (proposition : l'agent de Cursor, tâche bornée) ; et le sort des fichiers non commités de PLA-03b | chef |
| 5 | Les trois contextes de l'étude EP-18 (fiche, question 1) | chef, posée par la nouvelle session |

## Commandes pour le chef

```powershell
git -C "..\travaux-planner\coordination-equipe" push
gh pr create --base main --head doc/coordination-equipe --title "Coordination du 18 nov., reprise : relectures, suivi.md à l'état réel, UIX-11 et étude EP-18" --fill
```

Une minute après le push : `gh pr checks <n> --watch`, puis `gh pr merge <n> --merge` si tout est vert. #210 est fusionnée. Après le commit de VIT-09, la branche est à repousser : #211 se met à jour, et sa CI repart.

Ensuite :
- **Codex** : « lis ta boîte » (VIT-06 : ligne « Validé » et secrets, puis UIX-09) ;
- **Agent de Cursor** : « lis ta boîte » (VIT-07 : plan à corriger) ;
- **Claude de VS Code** : le prompt ci-dessous ;
- **Nouvelle session Claude** (Fable 5.2, sinon Opus 5.5) : le prompt de la fiche [etude-ep18-faible-equipement](../plan/missions/etude-ep18-faible-equipement.md), une fois la PR de coordination fusionnée, ou en lui donnant la branche `doc/coordination-equipe`.

## Prompt pour Claude de VS Code

```text
Le coordinateur a repris le 18 nov. à 17 h. Ta file est dans docs/plan/feuille-de-route.md (branche doc/coordination-equipe,
..\travaux-planner\coordination-equipe, jusqu'à sa fusion).
1) VIT-08 : le plan court est validé par le chef (5b62f702). Code-le maintenant, dans ..\travaux-planner\vit-08-video.
2) Puis UIX-10b (plan court, après la fusion d'UIX-09). Dans UIX-10b, corrige la ligne UIX-10 de docs/plan/modules/UIX-interface.md :
   « UIX-10a faite (#207, fusionnée le 18 nov.) ».
2 bis) Puis VIT-09, nouvelle mission (condition 7) : les illustrations de toutes les pages du site, des captures sans nom d'école,
   la première section de chaque page améliorée (fiche docs/plan/missions/vit-09-illustrations.md). Plan court au chef après VIT-08 ;
   le code après la fusion de VIT-07 et de VIT-08. Chaque capture est montrée au chef avant le commit.
3) Puis UIX-11, nouvelle mission : le tableau de bord de l'administration, refait à la charte et complété des chiffres qui existent
   (fiche docs/plan/missions/uix-11-tableau-de-bord.md, choix du chef du 18 nov.).
4) Puis UIX-06c, QJE-14 (plan), l'étude StudyLib (fiche corrigée : aucun prêt de livres dans StudyLib), UIX-10d.
Le coordinateur valide de nouveau les plans S et M sans migration, sécurité, donnée d'élève ni choix de produit ; le reste va au chef.
Ne modifie pas docs/plan/suivi.md. Fiche de session à jour ; tout est commité ; jamais de git push.
```

## Prompt de reprise du coordinateur

```text
Tu es le coordinateur des agents de Planner (Codex, agent de Cursor, Claude de VS Code, une session Claude pour l'étude EP-18,
et Alexis avec son agent). Tu reprends sur la branche doc/coordination-equipe, dans ..\travaux-planner\coordination-equipe
(git fetch puis git merge origin/main ; garde toutes les lignes de decisions.md ; pour suivi.md, garde les deux côtés puis remets-le à l'état réel).
Une seule session de coordination à la fois : si une autre tourne, arrête-toi et demande au chef.
Lis AGENTS.md, docs/plan/README.md (EP-5, EP-18), docs/plan/suivi.md (« Missions en cours »), docs/plan/feuille-de-route.md,
docs/plan/decisions.md (sections du 18 nov.), les skills coordination, equipe et relecture-branche,
puis cette fiche (docs/sessions/2026-11-18-doc-coordination-equipe-5.md).
Commence par le tour d'état (skill coordination, § 1), boîtes comprises (..\travaux-planner\boites\codex et cursor).
Attendu depuis 17 h 30 :
- Codex : la ligne « Validé » de VIT-06 avec les secrets, puis UIX-09 (fusion de main, verrou, axe-core) ;
- agent de Cursor : le plan de VIT-07 corrigé (EP-18, Massar), qui va au chef ;
- Claude de VS Code : le code de VIT-08, puis le plan de VIT-09 (illustrations, condition 7) ;
- nouvelle session Claude : les contextes de l'étude EP-18.
Relis chaque branche finie (skill relecture-branche) et reporte les états dans suivi.md (toi seul le modifies).
Suis les écarts : fichiers non commités de PLA-03b, feat/mot-13-coupure-fine à mettre à jour, puis à relire.
Propose au chef l'ouverture de VSC quand MOT sera fini (reste : 13c, refus de l'activation fine, collège de MOT-02, MOT-04).
Règles : tu ne codes aucun lot ; plan validé avant le code ; questions avant toute supposition (outil de questions) ;
relis decisions.md et docs/archives/plans/ avant de fixer le périmètre d'une mission ; chaque décision dans decisions.md ;
après un push, attends une minute avant gh pr checks --watch ; jamais de git push.
```
