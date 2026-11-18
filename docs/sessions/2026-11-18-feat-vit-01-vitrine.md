# Session du 2026-11-18 · VIT-01 et VIT-05 (préparation) · `feat/vit-01-vitrine`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), dans VS Code, intégrateur du site vitrine |
| Chantier | VIT (mission d'équipe [vit-equipe](../plan/missions/vit-equipe.md), sur la branche `doc/coordination-equipe`) |
| Dossier de travail | `..\travaux-planner\vit-01-vitrine` |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; travail : `17251fc5` (R0), `c0198c75` (accueil) |

## Objectif de la session

Poser R0 du site vitrine (socle Astro, jetons du § 4 bis, logos redessinés, composants du socle, logo dont les aiguilles tournent), puis le lot accueil.

## Plan

[docs/conception/vitrine/vit-vitrine.md](../conception/vitrine/vit-vitrine.md), validé par le chef le 18 nov. (« Je valide les deux plans »), sur la branche `doc/coordination-equipe` (pas encore sur `main`).

## Fait

- `17251fc5` · **R0** : `vitrine/` en Astro 7.4.5 ; jetons ; logos redessinés en SVG d'après les photos du 18 nov. (`public/logo/planner-horloge.svg`, `planner-icone.svg`, `public/favicon.svg`, chacun avec la mention « redessiné ») ; socle (`Gabarit`, `EnTete`, `PiedDePage`, `Section`, `Titre`, `Accroche`, `BoutonPrincipal`, `CadreAppareil`, `Apparition`, `Logo`, `animations.js`) ; traductions `src/i18n/{fr,en,ar}/` ; `scripts/verifier-neutre.mjs` étendu à `vitrine/src` et `vitrine/public` ; `.github/workflows/vitrine.yml` (construit, ne publie rien, garde `dist/` en artefact 7 jours).
- `c0198c75` · **Accueil** en huit sections : ouverture (logo animé), emploi du temps calculé, appel par QR code, quiz et jeux, report suivi, sécurité et données, bientôt, contact (sans formulaire) ; composant de socle `Duo`.
- Commit de fin : cette fiche, ligne VIT-01 de `suivi.md`, « Ce qui existe » du module VIT, `Duo` dans `vitrine/README.md`.

Versions, publiées depuis plus de deux semaines : astro 7.4.5, @astrojs/react 7.1.2, react et react-dom 19.2.9 (outils de construction, en `devDependencies`) ; motion 12.43.0 (v12 comme `frontend/`), lucide-react 1.67.0, @fontsource-variable/inter 5.3.0. Licences MIT, ISC et OFL-1.1.

## Vérifié

- `npm run test:unit` : **23/23** (mêmes clés en fr, en et ar ; secours en français ; chemins ; contraste AA de 15 paires de jetons, de 5,38:1 à 16,8:1).
- `npm run build` : 4 pages (`/`, `/fr/`, `/en/`, `/ar/`), sans erreur.
- `node scripts/verifier-neutre.mjs` : passe. Il repère bien un nom glissé exprès dans `vitrine/src`, puis ce fichier d'essai a été retiré.
- `npm audit --omit=dev --audit-level=high` : 0 faille.
- **axe-core 4.14.0** (WCAG 2.1 A et AA, bonnes pratiques) : aucune violation sur `/fr/`, `/en/` et `/ar/`, en 390, 768 et 1440 px. Aucun défilement horizontal.
- **Lighthouse 13.6.0** sur l'accueil (fr et en) : performance, accessibilité, bonnes pratiques et référencement à **100**, en mobile simulé comme sur ordinateur. LCP de 0,9 s en mobile simulé (EP-17 : moins de 2 s).
- **Mouvement réduit** : aucune animation, tout le contenu visible. Sans réduction : aiguilles en rotation 0,5 s après le chargement.
- Aucune requête vers un autre site (polices, scripts et images servis par le site).
- Outils de contrôle (Playwright du dossier `frontend/`, axe-core, Lighthouse) lancés depuis un dossier temporaire, hors dépôt : ils ne sont pas dans la CI.
- **Non lancé** : la CI GitHub de `vitrine.yml` (rien n'est poussé) ; aucun outil de lint dans `vitrine/`.

## Écarts avec le plan

1. **Visuels** : des illustrations dessinées en HTML dans les cadres d'appareils, et non des captures réelles. Les captures du kit vidéo sont à l'ancien style et ne montrent que l'accueil et la connexion. Capturer le jeu de démonstration neutre demande de lancer l'application.
2. **Section 6 de l'accueil** : elle dit ce qui existe (double authentification, accès par rôle, IA sans données d'élève) et non « les données restent à l'école ». Une base par école attend PLA-01.
3. **Animations** : Motion en JavaScript simple (`animate`, `inView`, `scroll`) au lieu d'îlots React. React ne s'exécute pas dans le navigateur ; il sert au build (icônes Lucide rendues en SVG). L'intégration React reste prête.
4. **lucide-animated** : rien copié, aucune icône animée n'était utile à l'accueil.
5. **hreflang** : émis seulement quand `site` est réglé dans Astro, car ces liens exigent le domaine complet (Q-11).
6. **Mise en page** : un composant de socle de plus que la liste du plan, `Duo` (texte et visuel côte à côte).

## Questions

| N° | Question | Proposition | À qui | État |
|---|---|---|---|---|
| 1 | Les écarts 1 à 6 ci-dessus sont-ils acceptés ? | oui | coordinateur | **réglé** : écart 1 tranché par le chef (illustrations gardées pour l'instant) ; écarts 2 à 6 acceptés par le coordinateur |
| 2 | La session `plan-b-projet-pacte-8a` était introuvable : le rapport de R0 n'a pas été envoyé par message. Quelle session est le coordinateur ? | le chef relaie cette fiche | chef | **réglé à la reprise** : le chef relaie cette fiche au coordinateur |
| 3 | `npm audit` complet : 11 failles hautes dans les outils de construction (picomatch, ReDoS, sans version corrigée ; un avis Astro sur l'adaptateur Node, inutilisé ici). Les accepter tant que le site n'est que construit ? | oui ; revoir à la mise en ligne | chef (sécurité) | en attente |
| 4 | Adresses de contact (courriel, WhatsApp) pour la section contact | attendre VIT-02 et Q-11 | chef | en attente |
| 5 | SVG officiels des logos | les remplacer dans `public/logo/` et dans les jetons | chef | en attente |

## Reprise du 18 nov. (même branche, même session de travail)

Aucun code : tout ce qui reste attend une décision ou un autre agent.

- **Tour d'état** : le chef a poussé la branche et ouvert la **PR #195** sur `dec87480`. Il n'y a ni branche `feat/vit-01-vitrine-pages`, ni consigne de lot dans `boites\cursor\entree\` (seulement le message d'UIX-06b). Pas de SVG dans `boites\ressources\`, seulement les deux photos. Le coordinateur `plan-b-projet-pacte-8a` est toujours introuvable.
- **CI de la PR #195** : « Construire le site vitrine » est verte. « Test Backend » est rouge à l'étape « Audit des dépendances » de `backend/` (picomatch, ReDoS, GHSA-fc5q-39xc-vjpf, par `umzug` et `tinyglobby` ; 37 failles hautes). **L'échec est le même sur `main`** depuis `2d74376c` (exécutions 44207283177 et 44209892974) : la vitrine n'y est pour rien.
- **Décisions du chef**, à inscrire par le coordinateur dans `decisions.md` :
  1. le chef relaie cette fiche au coordinateur ; aucun message envoyé à une session au hasard ;
  2. le coordinateur lance le lot de l'agent de Cursor par sa boîte ;
  3. écart 1 : les cadres d'appareils gardent les illustrations jusqu'au passage de l'application au nouveau style, pour ne pas montrer des écrans bientôt dépassés ;
  4. l'audit de `backend/` se corrige sur une branche `fix/` à part, avec un plan court à valider (sécurité et dépendances), hors du chantier VIT, à attribuer par le chef ou le coordinateur.

## État laissé

- `docs/plan/suivi.md` : VIT-01 → en cours (R0 et accueil commités en local). La ligne VIT-05 n'est pas touchée : la branche `doc/coordination-equipe` l'a déjà modifiée.
- **Réponse du coordinateur** (relayée par le chef) : écarts 2 à 6 acceptés. Le lot de l'agent de Cursor part de **`c0198c75`** (socle et accueil, avec `Duo`), sur `feat/vit-01-vitrine-pages`, dans `..\travaux-planner\vit-01-pages` (consigne `boites\cursor\entree\2026-11-18-0212-vitrine-pages-depart.md`). À 9 h 30, la consigne n'était pas encore traitée et la branche n'existait pas.
- Adresses des pages, fixées dans `src/i18n/langues.js` et déjà dans la navigation : `emploi-du-temps`, `en-classe`, `etablissement`, `securite`, `bientot`.

## Reste à faire, dans l'ordre

1. Le chef dit à l'agent de Cursor « lis ta boîte » ; il fait son lot depuis `c0198c75` : pages de fonctions, sécurité, bientôt.
2. À son rapport dans `boites\cursor\sortie\` : contrôle des fichiers (`git diff --name-only c0198c75..feat/vit-01-vitrine-pages`, equipe.md § 6 ; seuls `vitrine/src/components/fonctions/`, `vitrine/src/pages/[lang]/` sauf `index.astro`, `vitrine/src/i18n/{fr,en,ar}/<page>.json` et sa fiche de session sont admis), puis `git merge feat/vit-01-vitrine-pages` ; un conflit arrête tout et se signale au coordinateur.
3. Relancer les contrôles (tests, build, neutralité, axe, Lighthouse, 390, 768 et 1440 px), vérifier les liens de chaque page dans les trois langues, puis écrire la fiche ; le coordinateur relit.
4. Remplacer les logos et les jetons par les SVG du chef dès qu'ils arrivent.
5. Contrôles finaux (tests, build, axe, Lighthouse, 390, 768 et 1440 px), fiche, commandes au chef.
6. Plus tard : captures réelles, une fois l'application passée au nouveau style (décision du chef, écart 1).

## Commandes pour le chef de projet

La PR #195 est déjà ouverte. Pour y ajouter le commit de cette reprise (fiche et suivi) :

```powershell
git -C "..\travaux-planner\vit-01-vitrine" push
```

Ne pas fusionner la PR #195 avant la relecture du coordinateur et l'intégration des pages.

## Prompt de reprise

```text
Tu reprends l'intégration du site vitrine de Planner (VIT-01, VIT-05 en préparation), chantier VIT,
mission d'équipe vit-equipe, sur la branche feat/vit-01-vitrine, dossier ..\travaux-planner\vit-01-vitrine.
Lis d'abord AGENTS.md, docs/plan/equipe.md, puis, dans ..\travaux-planner\coordination-equipe
(branche doc/coordination-equipe), docs/plan/missions/vit-equipe.md et docs/conception/vitrine/vit-vitrine.md
(plan validé par le chef le 18 nov.), et cette fiche (docs/sessions/2026-11-18-feat-vit-01-vitrine.md),
puis vitrine/README.md.
Fait : R0 (17251fc5 : Astro, jetons, logos redessinés, socle, logo animé, CI sans publication,
neutralité étendue) et l'accueil en huit sections (c0198c75). Tests 23/23, axe sans violation,
Lighthouse 100. PR #195 ouverte par le chef ; « Construire le site vitrine » verte ; « Test Backend »
rouge à l'audit de backend/ (picomatch), comme sur main : hors de VIT, correctif sur une branche fix/ à part.
Décisions du chef à la reprise : il relaie la fiche au coordinateur ; le coordinateur lance le lot
de l'agent de Cursor ; illustrations gardées dans les cadres jusqu'au nouveau style de l'application.
Le coordinateur a accepté les écarts 2 à 6.
Reste : à son rapport (boites\cursor\sortie\), intégrer le lot de l'agent de Cursor
(feat/vit-01-vitrine-pages, dossier ..\travaux-planner\vit-01-pages, point de départ c0198c75) :
contrôle des fichiers d'abord (git diff --name-only c0198c75..feat/vit-01-vitrine-pages, equipe.md § 6),
fusion en local, contrôles relancés, liens des pages dans les trois langues, fiche ; le coordinateur relit.
Puis SVG officiels des logos dès qu'ils arrivent.
Questions en attente : failles d'audit des outils de build de vitrine/ (chef) ; adresses de contact ;
SVG des logos.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; rien mis en ligne ;
aucune animation si le mouvement réduit est demandé ; fiche de session et suivi.md à jour en fin
de session ; jamais de git push.
```
