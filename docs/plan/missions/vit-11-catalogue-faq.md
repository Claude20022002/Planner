# Mission · VIT-11 · catalogue de toutes les fonctionnalités et page FAQ

| | |
|---|---|
| État | ouverte : plan court à écrire **après VSC-01 corrigée** |
| Agent | Codex : le registre et son test demandent de la rigueur sur tout le dépôt |
| Modèle recommandé | son modèle le plus fort, raisonnement élevé |
| Attribuée le | 2026-11-18. Consigne écrite à 17 h 55 par Claude de VS Code, à la demande du chef, après sa lecture du site d'OpenEduCat ; inscrite par le coordinateur ; **condition 9 de la mise en ligne**, placée après VSC-01 dans la file de Codex (chef, 18 nov. vers 18 h 35) |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05, dégelée sans tarifs |
| Fonction | VIT-11 : un registre unique des fonctionnalités, avec leur source dans le code, une page « Toutes les fonctionnalités » construite depuis lui, et une page FAQ · taille M |
| Branche | `feat/vit-11-catalogue-faq`, depuis `origin/main` ; le code après la fusion de VIT-10 |
| Dossier de travail | `..\travaux-planner\vit-11-catalogue-faq` |
| Plan de conception | plan court à écrire : `docs/conception/vitrine/vit-11-catalogue-faq.md` · **validé par le chef** ; chaque réponse de la FAQ est validée par lui, une à une |

## Ce qui manque, relevé sur le site d'OpenEduCat

- Un menu « Parcourir par catégorie » qui ouvre toutes les fonctionnalités, rangées par catégorie avec leur nombre, et une page qui les liste toutes.
- Une FAQ, et une rubrique de ressources.

## Ce que le plan propose (consigne de 17 h 55)

1. **Un registre unique**, `vitrine/src/donnees/fonctionnalites.json`. Chaque entrée porte :
   - un identifiant, une catégorie, un titre et une phrase, en français et en anglais ;
   - la page du site qui la présente ;
   - **sa source dans le code**, un ou plusieurs chemins du dépôt ;
   - un état, « existe » ou « bientôt » ;
   - **l'app à laquelle elle appartient** (les noms de `frontend/src/i18n/applications.fr.js`) : VIT-09 affichera l'icône de chaque app sur le catalogue (chef, 18 nov. vers 19 h 20). VIT-11 ne dessine pas les icônes.
2. **Une page « Toutes les fonctionnalités »**, construite depuis le registre :
   - par catégorie, avec leur nombre ;
   - un filtre par texte, qui laisse tout affiché sans JavaScript ;
   - « bientôt » marqué, sans date.
3. **Un test** (`vitrine/tests/fonctionnalites.test.js`) qui échoue si un chemin de source n'existe pas, si une entrée n'a pas ses deux langues, ou si une page citée n'existe pas. Le registre devient la preuve de la règle « ne dire que ce qui existe ».
4. **Une page FAQ** : les questions qu'une école pose avant de choisir (où sont les données, les langues, l'import CSV, l'application mobile, l'IA « quand l'école active l'IA », le prix : « nous contacter »). Les réponses sont des choix de produit ou de droit : **le chef les valide une à une**. Données structurées `FAQPage` dans la page, sans rien charger d'ailleurs.

Sources de départ : le plan de parité (#193), et les plans de VIT-05 et de VIT-07, qui citent déjà leurs sources. Le plan y renvoie sans les recopier.

## Critère de « terminé »

- Le registre, la page catalogue, la FAQ et le test, en français et en anglais ; l'arabe affiche le français.
- **EP-18** : chaque fonctionnalité du registre qui passe par le téléphone de l'élève dit aussi l'autre chemin, s'il existe. **EP-5** : aucun outil d'État nommé seul.
- Aucun prix, aucun nom d'école, rien chargé d'ailleurs. Build, tests, `verifier-neutre.mjs`, axe-core, Lighthouse.

## Périmètre d'écriture

- `vitrine/src/donnees/` ; `vitrine/src/pages/[lang]/` (les deux pages nouvelles) ; leurs composants dans un dossier à lui sous `vitrine/src/components/` ;
- `vitrine/src/i18n/{fr,en,ar}/` : les fichiers des deux pages ;
- `vitrine/tests/` ; le plan court, `docs/plan/modules/VIT-site-vitrine.md`, la fiche de session.

L'agent ne touche pas :
- à `langues.js`, `EnTete.astro` et `PiedDePage.astro` **avant la fusion de VIT-10**. Après elle, VIT-11 y ajoute elle-même ses deux clés et ses liens (catalogue et FAQ), rien d'autre (décision du coordinateur, 18 nov. 20 h) ;
- à `docs/plan/suivi.md`, à `vitrine/src/styles/`, à l'accueil ;
- aux illustrations (VIT-09, après lui).

## Ordre sur le site (chef, 18 nov. vers 18 h 35)

VIT-07, puis VIT-10, puis **VIT-11**, puis VIT-09.

## Prompt à donner à l'agent

```text
Ta mission suivante, après VSC-01 corrigée : VIT-11, catalogue des fonctionnalités et FAQ (condition 9 de la mise en ligne).
Lis la fiche docs/plan/missions/vit-11-catalogue-faq.md (branche doc/coordination-equipe, jusqu'à sa fusion).
git worktree add "..\travaux-planner\vit-11-catalogue-faq" -b feat/vit-11-catalogue-faq origin/main
Écris le plan court docs/conception/vitrine/vit-11-catalogue-faq.md, avec les catégories proposées, le schéma du registre,
le test, et les questions de la FAQ avec une réponse proposée pour chacune. Commite-le seul ; le chef le valide.
Le code attend la fusion de VIT-10. Ni langues.js ni EnTete.astro. Ne modifie pas docs/plan/suivi.md. Jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 17 h 55 | consigne écrite par Claude de VS Code à la demande du chef, déposée dans la boîte de Codex | — |
| 2026-11-18 18 h 40 | inscrite par le coordinateur ; condition 9 ; après VSC-01 dans la file de Codex (chef) | — |
| 2026-11-18 19 h 25 | ajout : chaque entrée du registre porte son app, pour les icônes d'apps de VIT-09 (chef) | — |
| 2026-11-18 20 h | plan validé : questions 1, 2 et 4 à 10 par le chef (réponse 7 dans la version du coordinateur, pour EP-18), 3 par le coordinateur ; les liens du catalogue et de la FAQ sont ajoutés par VIT-11 après la fusion de VIT-10 | **validé** |
| 2026-11-18 21 h | ajout du chef (condition 10) : le menu « Fonctions » devient un **méga-menu par catégorie**, comme « Parcourir par catégorie » d'OpenEduCat : les catégories du registre à gauche avec leur nombre, leurs fonctionnalités à droite, et un lien « Toutes les fonctionnalités ». Codex le fait dans le code de VIT-11 (après VIT-10), lisible sans JavaScript, Échap ferme ; VIT-09 y pose les logos | — |
| 2026-11-21 18 h 40 | #236 relue : registre, pages et méga-menu conformes au plan et au visa du chef (§ 7) ; `langues.js`, `EnTete.astro`, `PiedDePage.astro` touchés dans le périmètre ouvert ; CI verte. Mais ses deux pages construisent encore l'arabe (`LANGUES`), ce que VIT-17 retire | **à reprendre après #237** : `git merge origin/main`, `cheminsLangues()` dans `faq.astro` et `fonctionnalites.astro`, budget, recette et Lighthouse refaits (plan, § 7.4) |
