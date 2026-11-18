# Mission · étude · Planner dans les contextes à faible équipement (EP-18)

| | |
|---|---|
| État | ouverte |
| Agent | **nouvelle session Claude Code**, ouverte par le chef (décision du chef du 18 nov., vers 17 h 15). Elle travaille en parallèle des autres et n'écrit aucun code |
| Modèle recommandé | le plus capable disponible (Claude Fable 5.2, sinon Opus 5.5) : l'étude lit toute l'application et fixera l'ordre de correctifs dans plusieurs modules |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. (EP-18 à 16 h ; agent choisi vers 17 h 15) |
| Module et chantier | transversal, rangé sous [QUA](../modules/QUA-qualite-docs.md) · étude hors chantier, sans code, comme l'étude StudyLib |
| Exigence | [EP-18](../README.md) (tous les contextes), avec EP-5 généralisée (aucun pays supposé) |
| Branche | `etude/ep18-faible-equipement`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\etude-ep18` |
| Livrable | `docs/conception/qualite/etude-ep18-faible-equipement.md` ; puis une décision du chef sur l'ordre des correctifs |

## La question

Le chef l'a posée le 18 nov. : dans certains pays, comme la RDC, l'appel par QR code ou les jeux sur téléphone ne sont pas possibles. **Chaque fonction de Planner doit marcher sans téléphone de l'élève, avec peu ou pas de connexion, et avec ce qu'a l'école** (un seul écran projeté, du papier imprimé). Le QR code et le téléphone restent des options, jamais le seul chemin.

L'étude dit, fonction par fonction, **ce qui tient déjà, ce qui manque, et dans quel ordre le faire**. Elle ne décide rien : elle propose, et le chef tranche.

## Ce que l'étude doit établir

1. **Les trois contextes**, définis avant toute évaluation, et soumis au chef dans les questions du § 3 de l'étude :
   - **A. Sans téléphone de l'élève** : les élèves n'ont ni téléphone ni ordinateur personnel ; l'enseignant a un ordinateur ou un téléphone.
   - **B. Peu ou pas de connexion** : connexion lente ou coupée par moments, à l'école ou chez l'enseignant.
   - **C. Ce qu'a l'école** : un seul écran projeté dans la salle, une imprimante, parfois rien de plus.
2. **Une grille, fonction par fonction**, pour chacun des trois contextes : « marche », « marche en partie » ou « ne marche pas », avec **le fichier du code qui le prouve** (chemin et nom de la fonction ou du composant). Rien n'est écrit de mémoire. Les fonctions à passer en revue, au minimum :
   - **l'appel** : QR code projeté et scan sur le mobile ; appel à la main (présent, en retard, absent : `frontend/src/i18n/fr.js`, `appel.aideListe` et `statuts`) ; la règle d'anti-fraude du scan (archives, `espace-enseignant.md`, « cocher à la main reste possible ») ;
   - **le Studio quiz** : en direct, à son rythme, par lien, code ou QR ; ce qu'il faut côté élève ; ce qui peut se projeter ou s'imprimer ;
   - **les jeux pédagogiques** : session au tableau en mode collectif (`backend/services/jeux/sessions.js`), jeu sur le téléphone ;
   - **l'espace de cours** : supports, sections, sondages ; et **les annonces** (e-mail facultatif) ;
   - **la Bibliothèque** (StudyLib, lue sans être modifiée) : poids des documents, accès sans compte élève ;
   - **l'emploi du temps** : PDF imprimable, publication, notifications ;
   - **l'application mobile** : ce qui demande la connexion, ce qui est gardé en cache ; MOB-06 (emploi du temps hors ligne) est prévue, pas faite ;
   - **la connexion et les comptes** : mot de passe oublié par e-mail, lien du téléphone (R-10), ce qui se passe quand un élève n'a ni e-mail ni téléphone ;
   - **l'IA** : ce qui dépend d'un service distant, et ce qui reste utilisable sans.
3. **Le poids des écrans, pour le contexte B** : la taille du site construit (`npm run build` dans `frontend/`, lu sans rien changer) et des principales pages, et ce qui se charge à chaque ouverture. Une mesure faite sur le poste, avec la commande, pas une estimation.
4. **Les suppositions de pays dans l'application** (EP-5 et EP-18) : chaque écran, texte, format ou valeur par défaut qui suppose le Maroc (Massar nommé seul, devise, fuseau, format de téléphone, calendrier). Le site vitrine n'en fait pas partie : VIT-07 et VIT-08 le traitent. Ce relevé renvoie à PLA-13 et ETA-03 sans les refaire. Un exemple déjà relevé par le coordinateur le 18 nov. : les jeux « Pilote des stocks » et « Budget ERP » comptent en MAD dans leurs consignes (`shared/simulations/catalogue/stock-pilot.js`, `budget-erp.js`).
5. **Les manques, rangés** : pour chacun, la fonction du plan qui le couvre déjà (MOB-06, COM-03, PLA-13, ETA-03…) ou une fonction nouvelle à proposer, sa taille (S, M, L, XL), et ce qu'elle demande (migration, dépense, dépendance). **Toute dépense** (SMS, fournisseur) et **tout choix de produit** (feuille d'appel imprimée, quiz sur papier, mode hors ligne) sont des questions au chef, avec une proposition.
6. **Un ordre proposé**, en deux listes : ce qui est petit et se fait tout de suite, et ce qui attend une étape de la feuille de route.
7. **Ce que chaque plan doit dire à partir de maintenant** : une section « EP-18 » à ajouter au modèle de conception (`docs/plan/modeles/conception.md`), avec trois lignes, une par contexte. L'étude en propose le texte, le chef le valide, et le coordinateur l'inscrit.

## Ce qui est déjà décidé

- EP-18 et EP-5 généralisée : décisions du chef du 18 nov., 16 h ([decisions.md](../decisions.md)).
- Aucun pays n'est supposé : la RDC est l'exemple du chef, pas une cible fixée.
- L'appel à la main existe et doit rester possible (archives, `espace-enseignant.md`, § règles de l'appel).
- Le SMS est prévu dans COM-03 comme une option payante, « réservé aux alertes et aux familles sans smartphone » ([COM](../modules/COM-communication.md)) : son usage et son coût sont au chef.
- Les règles du site vitrine sont tenues par VIT-07 et VIT-08 : l'étude ne les reprend pas.

## Périmètre d'écriture

L'agent peut écrire :
- `docs/conception/qualite/etude-ep18-faible-equipement.md` (le livrable), et des schémas dans le même dossier si l'étude en a besoin ;
- sa fiche de session.

L'agent ne touche pas :
- au code (`backend/`, `frontend/`, `mobile/`, `shared/`, `vitrine/`), qu'il lit seulement. La mesure du § 3 se fait sans rien commiter ;
- à `docs/plan/suivi.md`, au README et aux modèles : le coordinateur inscrit ce que le chef aura validé ;
- aux dépôts voisins (`..\StudyLib` se lit sans être modifié).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Les trois contextes A, B et C, tels que définis ci-dessus, sont-ils les bons ? | oui ; l'agent les reprend dans son § 3 et les fait confirmer avant la grille | chef |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : l'étude « contextes à faible équipement » (EP-18), sans code.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-5 et EP-18), docs/plan/suivi.md, docs/plan/decisions.md (18 nov., 16 h),
puis ta fiche de mission docs/plan/missions/etude-ep18-faible-equipement.md (branche doc/coordination-equipe,
dans ..\travaux-planner\coordination-equipe, jusqu'à sa fusion dans main).
Crée la branche etude/ep18-faible-equipement depuis origin/main, dans le dossier ..\travaux-planner\etude-ep18.
Tu n'écris que le livrable docs/conception/qualite/etude-ep18-faible-equipement.md et ta fiche de session.
Le code se lit, il ne se modifie pas. StudyLib se lit sans être modifiée.
Commence par le § 1 de la fiche : écris les trois contextes et pose au chef tes questions (outil de questions),
chacune avec ta proposition. Puis la grille, où chaque case cite le fichier qui la prouve.
Toute dépense (SMS) et tout choix de produit (papier, hors ligne) sont des questions au chef. Aucun pays supposé.
Fiche de session à jour en fin de session ; suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le au chef : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 17 h 30 | fiche écrite par le coordinateur ; agent choisi par le chef : une nouvelle session Claude | — |
