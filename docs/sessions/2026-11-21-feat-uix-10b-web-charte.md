# Session du 2026-11-21 · UIX-10b, l'application web à la charte · `feat/uix-10b-web-charte`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session de VS Code, reprise de la fiche `2026-11-19-fix-vit-08-phrases-video.md` |
| Chantier | UIX, exception hors chantier du 18 nov. (UIX-10) |
| Dossier de travail | `..\travaux-planner\uix-10b-web-charte`, depuis `origin/main` (`736a8f7e`), `main` fusionnée le 21 nov. (`53561918`) |
| Jonctions | `frontend\node_modules` → `..\uix-09-grille\frontend\node_modules` (ceux du dépôt principal n'ont pas `lucide-react`, ajouté par UIX-09) ; `backend` et `mobile` → dépôt principal ; `vitrine` → `..\vit-09a-logos\vitrine\node_modules` |
| Dernier commit | voir `git log -1` |

## Objectif de la session

Point 1 du prompt de reprise : le plan court d'UIX-10b, validé par le chef avant tout code. Le chef l'a validé dans la session ; le code a suivi, étapes 2 à 5 du plan.

## Plan

[uix-10b-web-charte.md](../conception/interface/uix-10b-web-charte.md), **validé par le chef le 21 nov.** (« Je valide »). Ses écarts (§ 11 bis, E1 à E8) ont été **validés par le chef le 21 nov.** (« Je valide les écarts »).

## Questions

| N° | Question | Réponse du chef |
|---|---|---|
| 1 | Un seul thème pour toutes les pages ? | **oui** : les règles des pages pilotes partout ; les écrans en style « volet » gardent leurs capitales, en Inter |
| 2 | Le menu : surface claire ou couleur de l'école ? | **surface claire partout** |
| 3 | Les arrondis ? | **8 / 12 / 20 px** |
| 4 | Livraison ? | **une PR**, captures montrées avant chaque commit |
| 5 | Validation du plan | **validé** |
| 6 | Écarts E1 à E8 | **validés** |
| 7 | Captures : Docker était éteint | **Claude démarre Docker** (fait) |
| 8 | Captures de l'étape 3, puis de l'étape 4 | **validées** les deux fois (« Je valide, commite ») |

## Fait

| Commit | Contenu |
|---|---|
| `d5268ec0` | plan court, validé, commité seul |
| `92855ad9` | étape 2 : statuts, lignes et panneau dans `shared/charte/jetons.json` ; `couleursDe` lit toutes les familles ; `shared/tokens.js` relaie statuts et lignes aux mêmes valeurs, `brand`, `board`, `radius` gelés pour le mobile ; `FOND_PANNEAU` = `ecran`, message « panneau sombre » (serveur et son test d'intégration) |
| `fbdcbf45` | étape 3 : thème unique (`themeCharte.js`, `composantsCharte.js`, `jetonsInterface.js` ex-`jetonsGestion.js`) ; `ThemeGestion.jsx` et `themeHistorique.js` retirés ; menu sur surface claire ; choix de famille retiré et parcours de régression ; Barlow retirée (`main.jsx`, `package.json`, verrou) ; couleurs du navigateur dans le thème ; `Accueil.jsx`, `PanneauAccueil.jsx`, `SelecteurEspaces.jsx`, `MarquePlanner.jsx` aux jetons ; crochet `scripts/import-json-tests.mjs` pour `test:unit` |
| `1f7857cc` | étape 4 : panneau en Inter ; nom du cours sur deux lignes au plus (ordinateur), césure selon la langue (téléphone) ; colonnes salle et statut élargies sur téléphone ; `DepartureBoard.jsx` 421 → 419 lignes |
| `b6dd7776` | fusion de `main` (#222, #226, #232, #233) : charte en **version 4** ; `pas-volet` déplacé dans la famille `panneau` (l'empreinte de la vidéo du site couvre `mouvement` : pas de nouveau rendu) |
| (ce commit) | ligne UIX-10 du fichier du module ; cette fiche |

## Vérifié

- `node shared/charte/generer.mjs --verifier` : à jour. `node --test shared/charte/charte.test.js` : **10 sur 10**.
- Frontend `npm run test:unit` : **86 sur 86**. `npx eslint src/design-system` : aucune erreur ; un avertissement de longueur sur `DepartureBoard.jsx` (419 lignes), qui existait avant (421).
- Frontend `npm run build` : construit ; aucune police Barlow dans `dist`.
- Mobile `npx jest` : **77 sur 77** ; un test temporaire (retiré) a vérifié que `shared/tokens.js` rend exactement les anciennes valeurs (statuts, lignes, brand, board, radius, flapStepMs).
- Site `npm run test:unit` : **93 sur 93**, dont l'empreinte de la vidéo.
- Serveur : tests unitaires **499 sur 499** ; test d'intégration `identiteEcole.test.js` sur la base de test locale : **11 sur 11** (message « panneau sombre »).
- `node scripts/verifier-neutre.mjs` : propre.
- Captures : démonstration locale (`npm run demo`, base de démonstration, données fictives du jeu d'essai), Playwright, hors du dépôt ; deux identités simulées dans le navigateur (sans école ; école fictive « EXEMPLE », #7E2259 et #137D3F), clair et sombre, 390 et 1440 px. Panneau rempli avec l'horloge du navigateur fixée au lundi 23 nov. Montrées au chef, validées.
- **Pas lancé** : les parcours Playwright (ils tournent en CI ; on ne les lance pas en local avec la suite). Le parcours `entreRoles.spec.cjs` a été réécrit : à surveiller en CI, comme tous les parcours dont l'apparence change.

## Écarts et points à savoir

- Écarts E1 à E8 du plan, validés (§ 11 bis du plan). E2 précisé après la fusion : `pas-volet` est dans `panneau`, pas dans `mouvement`.
- **Côté serveur**, un seul changement visible : le refus d'un accent illisible est mesuré sur le fond « ecran » (#0F1A2B, au lieu de #0B0B0D) et dit « panneau sombre ». Un accent entre 3,0 et 3,4:1 sur l'ancien fond serait refusé au prochain enregistrement.
- Les `node_modules` du frontend du dépôt principal datent d'avant UIX-09 (`lucide-react` manque) : un `npm ci` dans `frontend` du dépôt principal les remettrait à jour.
- Nouvelle règle reçue du coordinateur le 21 nov. : tout plan a une section « Ce que disent les études » (modèle, § 7 bis). Le plan d'UIX-10b a été validé avant ; il ne l'a pas.
- `suivi.md` non modifié (consigne).

## État laissé

- Pour `suivi.md`, à reporter par le coordinateur : **UIX-10b codée**, `feat/uix-10b-web-charte`, à pousser par le chef ; plan `docs/conception/interface/uix-10b-web-charte.md`.
- Docker Desktop reste lancé ; les bases de test et la démonstration sont arrêtées.

## Questions en attente

1. **Coordinateur** : faut-il ajouter au plan d'UIX-10b la section « Ce que disent les études » après coup ? Proposition : non, le plan est validé et codé ; elle s'applique aux plans suivants (UIX-11 d'abord).
2. **Coordinateur** (reportée) : VIT-15 pose les logos de ses fiches ; VIT-09b ne les refait pas (plan de VIT-09b, § 4.2).
3. **Coordinateur** : le plan d'UIX-06c parle de `ThemeGestion`, retiré par UIX-10b ; une ligne de ce plan est à corriger avant son code (thème unique).

## Reste à faire, dans l'ordre

1. Le chef pousse `feat/uix-10b-web-charte` et ouvre la PR ; surveiller les parcours en CI et corriger ceux que l'apparence fait échouer.
2. La file : UIX-11 (plan court, avec la section « Ce que disent les études »), UIX-06c, QJE-14, l'étude StudyLib, UIX-10d. UIX-10c peut venir dès que le coordinateur la place (les SVG officiels sont là).
3. VIT-09b, le code, en dernier sur le site.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\uix-10b-web-charte" push -u origin feat/uix-10b-web-charte
gh pr create --base main --head feat/uix-10b-web-charte --title "UIX-10b : l'application web à la charte (thème unique, panneau, Barlow et choix de famille retirés)" --fill
```

## Prompt de reprise

```text
Tu es Claude de VS Code sur Planner (ta file d'interface, puis VIT-09b).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md et la feuille de route (branche doc/coordination-equipe),
puis cette fiche : docs/sessions/2026-11-21-feat-uix-10b-web-charte.md (branche feat/uix-10b-web-charte).
Fait le 21 nov. : UIX-10b codée et vérifiée (plan court validé par le chef, écarts E1 à E8 validés, captures validées) :
un seul thème tiré de la charte pour toutes les pages, Studio quiz compris ; menu sur surface claire ; arrondis 8/12/20 ;
Barlow et le choix Planner/StudyLib retirés ; panneau des départs en Inter sur fond « ecran » ; charte en version 4 ;
le mobile ne bouge pas (10d). Dossier ..\travaux-planner\uix-10b-web-charte.
Reste, dans l'ordre :
1) si la PR est ouverte : surveiller les parcours en CI et corriger ceux que l'apparence fait échouer ;
2) UIX-11 : plan court (fiche sur doc/coordination-equipe), avec la section « Ce que disent les études »
   (modèle de conception, § 7 bis ; registre docs/etude-marche/14-reprendre-et-depasser.md) ;
   le chef a décidé « le supérieur d'abord », écrans et textes neutres ;
3) puis UIX-06c (corriger la ligne de son plan sur ThemeGestion, retiré), QJE-14, étude StudyLib, UIX-10d ;
4) VIT-09b, le code, en dernier sur le site, en montrant au chef la planche des dessins et chaque capture avant le commit.
Questions au coordinateur : section « études » après coup pour UIX-10b (proposition : non) ; VIT-15 pose les logos de ses fiches.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour en fin de session ; suivi.md non modifié ; jamais de git push.
```
