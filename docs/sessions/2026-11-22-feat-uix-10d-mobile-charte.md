# Session du 2026-11-22 · UIX-10d, le mobile à la charte · `feat/uix-10d-mobile-charte`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session de VS Code ; reprise de la file d'interface (fiche `2026-11-21-etude-bib-studylib-pile.md`) |
| Chantier | exception hors chantier d'UIX-10 (chef, 18 nov.), sans API ni migration |
| Dossier de travail | `..\travaux-planner\uix-10d-mobile-charte`, depuis `origin/main` (`e1858451`) |
| Plan | [uix-10d-mobile-charte.md](../conception/interface/uix-10d-mobile-charte.md), **validé par le chef le 22 nov.** avec les propositions 5 à 9 |
| Dernier commit | voir `git log -1` |

## Objectif de la session

1. #245 (UIX-06c) : corriger ce que demanderait la relecture du coordinateur.
2. UIX-10d : questions, plan court validé, code, captures montrées au chef avant chaque commit de code.

## Fait

- **#245** : fusionnée le 21 nov. (`e1e8178e`) sans relecture. Rien à corriger.
- 4 questions de produit posées au chef. Chaque proposition est retenue (plan, § 3) : même casse que le web ; barre de titre sur la surface ; Tableau à sa structure actuelle ; repli sombre.
- `94bfdbeb` : plan court, validé par le chef.
- `8e3580d5` (étape 2) :
  - `theme.js` : deux thèmes (clair, sombre) tirés de `shared/charte`, aux mêmes clés qu'avant ; 159 lignes au lieu de 242 ;
  - `marque.js` : la couleur de l'école devient l'action des deux thèmes, ajustée au contraste ;
  - Inter seule : `@expo-google-fonts/barlow` et `barlow-condensed` sont retirées de `package.json` et du verrou ;
  - choix de famille retiré du Compte et de `i18n.js` ;
  - 11 écrans débarrassés du test `t.famille === 'planner'` (25 occurrences) ;
  - capitales gardées sur le Tableau (`capitalesVolet`) ;
  - bord des champs à 3:1 (`trait-fort`) ;
  - libellé de Semaine en casse normale ;
  - tests : `theme.test.js` réécrit, `marque.test.js` créé.
- **Captures vues et validées par le chef** avant le commit de l'étape 2 : connexion, Tableau, Semaine, fiche d'une séance, Bibliothèque et Compte, en clair et en sombre, pour une école à ses couleurs et une école sans couleurs.
- `ccabce42` (étape 3) :
  - `shared/design-tokens.json` retiré ;
  - `shared/tokens.js` réduit aux lignes des filières ;
  - `session.test.js` suit ;
  - commentaire de `shared/couleurs.js` corrigé ;
  - ligne UIX-10 du module mise à jour.

## Vérifié

- Mobile, Jest : **81 sur 81** sur trois passages. Un premier passage, juste après l'étape 3, a donné **1 échec sur 81**. Sa sortie n'a pas été gardée, et l'échec ne s'est pas reproduit sur les trois passages suivants. Il est probablement lié à un délai ; à surveiller dans la CI.
- `npx expo lint` : 0 erreur. Les 3 avertissements, dans `i18n.js`, existaient déjà.
- Site : `npm run test:unit` **150 sur 150** ; `vite build` réussi (le site lit `shared/tokens.js`).
- `node --test shared/charte/charte.test.js` : 10 sur 10.
- `npx expo export --platform android` : réussi ; le paquet ne contient plus Barlow.
- `node scripts/verifier-neutre.mjs` : vert.
- **Application réelle** sur l'émulateur Android (Expo Go), contre un serveur local et une base de démonstration hors du dépôt. Des séances fictives ont été ajoutées à cette base et le mois a été publié par le service, parce que l'administrateur de démonstration exige la double authentification.
- **Non lancés** : les parcours Playwright (web, sans lien avec le mobile) ; la CI de la PR.

## Écarts avec le plan

- **Fond des volets** : le premier code utilisait `surface-sombre`. Le plan (§ 4.2) dit `ecran`. Corrigé avant le commit : en sombre, les volets disparaissaient sur la carte. Ils s'en détachent peu (1,11:1), mais les chiffres restent à 15:1. Le chef l'a vu sur les captures.
- **`shared/couleurs.js`** : seul son commentaire a été modifié, parce qu'il citait le fichier retiré. Ce fichier n'était pas dans la liste du plan.
- **Libellé de Semaine** : ajout d'une aide `majuscule` dans `semaine.jsx`, l'un des 11 fichiers. `textTransform: 'capitalize'` mettait une majuscule à chaque mot (« Semaine Du 16 Novembre »).

## Constat pour le coordinateur (hors périmètre)

- `backend/services/etablissement/identite.js:16` : une école sans réglage reçoit `DEFAUT`, soit #1D4ED8 et #0E7490, l'ancien bleu de StudyLib. Elle ne reçoit pas la charte (`bleu-nuit`, `bleu-vif`). Le web et le mobile affichent donc ce bleu pour une école neuve. Proposition : un correctif court, au chef puisqu'il touche le serveur, qui aligne `DEFAUT` sur la charte, avec son test.
- En sombre, la couleur d'une école foncée est éclaircie jusqu'à 5,5:1 et devient un bleu lavande. C'est la règle du web, et le chef a validé les captures.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 4 | Casse, barre de titre, Tableau, repli (plan, § 3) | propositions retenues, 22 nov. | répondues |
| 5 à 9 | Propositions du plan | confirmées avec la validation | répondues |
| — | Correctif de `DEFAUT` (constat ci-dessus) | à attribuer par le coordinateur | ouverte |

## État laissé

Pour `suivi.md`, que le coordinateur reporte (ce fichier n'est pas modifié ici) : **UIX-10d codée** sur `feat/uix-10d-mobile-charte`, trois commits, à pousser, PR à ouvrir. Ensuite viennent 10c (logos, écran de lancement, `IntroLogo`) et 10e (jeux).

## Reste à faire, dans l'ordre

1. Le chef pousse `feat/uix-10d-mobile-charte` et ouvre la PR ; la CI tourne (mobile, site, charte).
2. Si la relecture du coordinateur revient avant la fusion : corriger.
3. Ma part de la voie B, **après le contrat d'API de BIB-06** (session « BIB ») : BIB-10 (mobile, sur les fichiers d'UIX-10d) et BIB-09 (écrans web à la charte). Plan validé par le chef avant tout code.
4. VIT-09b en dernier : planche et captures montrées au chef avant le commit.
5. QJE-14a quand elle sera attribuée : plan court validé avant tout code.
6. Si le chef donne les volumes : compléter l'étude StudyLib, § 3.2, et la taille de B7.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\uix-10d-mobile-charte" push -u origin feat/uix-10d-mobile-charte
gh pr create --base main --head feat/uix-10d-mobile-charte --title "UIX-10d : le mobile à la charte" --fill
```

## Prompt de reprise

```text
Tu es Claude de VS Code sur Planner (ta file d'interface, puis VIT-09b).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md et la feuille de route (branche doc/coordination-equipe),
puis la fiche docs/sessions/2026-11-22-feat-uix-10d-mobile-charte.md (branche feat/uix-10d-mobile-charte).
Fait le 22 nov. : UIX-10d, le mobile à la charte (plan docs/conception/interface/uix-10d-mobile-charte.md, validé par le chef) :
deux thèmes tirés de shared/charte, Inter seule, choix de famille retiré, shared/design-tokens.json retiré ;
captures validées par le chef ; commits 94bfdbeb, 8e3580d5, ccabce42 ; à pousser par le chef.
Reste, dans l'ordre :
1) UIX-10d : corriger ce que demandera la relecture du coordinateur ou la CI de la PR, si elle revient avant la fusion ;
2) ta part de la voie B, après le contrat d'API de BIB-06 (session « BIB ») : BIB-10 (mobile, à la suite d'UIX-10d,
   mêmes fichiers) et BIB-09 (écrans web à la charte) ; plan validé par le chef avant tout code ;
3) VIT-09b en dernier, planche et captures montrées au chef avant le commit ;
4) QJE-14a quand elle est attribuée : plan court validé avant tout code ;
5) si le chef donne les volumes : compléter l'étude StudyLib, § 3.2, et la taille de B7.
Pour le coordinateur : UIX-10d codée (à reporter dans suivi.md) ; constat hors périmètre : DEFAUT de
backend/services/etablissement/identite.js donne #1D4ED8/#0E7490 à une école sans réglage au lieu de la charte
(correctif court à attribuer, au chef car serveur) ; restent de la fiche précédente : fiches de mission de la voie B
(BIB-05 à BIB-11, migrations 0087 et suivantes), decisions.md, trois migrations pour QJE-14 (0084 à 0086).
Règles : pas de code hors du plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour en fin de session ; suivi.md non modifié ; jamais de git push.
```
