# Mission · VIT-17 · les correctifs techniques du site vitrine (lot A de l'expertise)

| | |
|---|---|
| État | plan validé par le coordinateur le 21 nov. avec corrections ; code en local, non commité |
| Agent | agent de Cursor (Grok 4.7 high) : tâches bornées, chacune vérifiée par une mesure |
| Attribuée le | 2026-11-19, par le coordinateur, d'après l'[expertise du site](../../etude-marche/12-expertise-site-vitrine.md) (§ 9, § 13 et § 14, lot A) ; **condition 12** de la mise en ligne (chef, 19 nov.) |
| Module | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05 |
| Fonction | VIT-17 : le saut du menu sur téléphone, la vidéo qui ne part pas seule sur téléphone ni sur une connexion lente, les pages `/ar/` en français, les balises Open Graph, les grilles à trous, le `README.md` de `vitrine/` · taille S |
| Branche | `fix/vit-17-correctifs-vitrine`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\vit-17-correctifs-vitrine` |
| Plan de conception | plan court `docs/conception/vitrine/vit-17-correctifs-vitrine.md` · **validé par le coordinateur** (S, sans texte nouveau, sans donnée ni choix de produit), sauf le libellé du bouton de la vidéo, **validé par le chef** |

## Ce qui est à faire (expertise, § 13)

| Point | Ce qui change | Fichiers | Vérification |
|---|---|---|---|
| **C6, le saut de 330 px du menu** (condition 12) | le script qui replie le menu sur téléphone s'exécute avant le premier rendu : script en ligne juste après `</header>`, ou une classe `js` posée sur `<html>` par le script en ligne de `Gabarit.astro` ; le comportement sans JavaScript ne change pas | `src/components/socle/EnTete.astro`, `Gabarit.astro` | à 390 px, le `<main>` commence au même endroit avec et sans attendre le script (test Playwright) ; Lighthouse mobile : CLS sous 0,1 et performance d'au moins 90 sur les 16 pages françaises, sur trois passages |
| **C9, la vidéo sur demande** (EP-18) | la vidéo ne part seule que sur un écran d'au moins 48rem **et** sans connexion lente (`navigator.connection?.effectiveType` à `slow-2g`, `2g` ou `3g`) ; sinon l'image fixe reste, et le bouton la lance. L'image fixe soignée reste tant que la vidéo n'a pas été lancée (C3, point 3) | `src/components/accueil/video.js`, `Video.astro` | à 390 px, aucune requête vers `/videos/*` avant un clic (Playwright) ; à 1440 px, comportement inchangé |
| Libellé du bouton sur téléphone | proposition de l'expertise : « Lire la vidéo (1,5 Mo) », en anglais « Play the video (1.5 MB) » ; **au chef** dans le plan, avec le poids mesuré | `accueil.json` (fr, en ; ar : clé vide) | — |
| **Les pages `/ar/`** | ne construire que les langues publiées (`LANGUES_PUBLIEES`) tant que l'arabe n'est pas rempli (UIX-04) ; les fichiers `ar/*.json` et leur test restent | `src/pages/[lang]/*.astro` ou une fonction `cheminsPublies()` dans `src/i18n/langues.js` | aucun dossier `dist/ar/` ; les tests des clés arabes passent toujours. **Après la fusion de VIT-12 (#223)**, qui touche `langues.js` |
| **Open Graph** | `og:title`, `og:description`, `og:locale`, `og:image` (l'image fixe de la vidéo, en adresse absolue), `twitter:card` ; `site` dans `astro.config.mjs`, avec le sous-domaine de VIT-06 | `Gabarit.astro`, `astro.config.mjs` | les balises présentes dans `dist/fr/index.html` et une page de fonction ; aucune adresse d'un autre site chargée |
| **Les grilles à trous** (C10, partie technique) | `GrilleCartes.astro` centre une rangée incomplète, ou passe à deux colonnes quand il y a deux cartes ou moins | `GrilleCartes.astro` | captures 1440 px de Quiz et jeux et d'Application |
| **`vitrine/README.md`** | « logos officiels du chef (18 nov.), version web » à la place de « logos redessinés » (ligne 28) | `vitrine/README.md` | — |

## Critère de « terminé »

- Build, `npm run test:unit`, `node scripts/verifier-neutre.mjs` verts ; axe-core sans violation en 390, 768 et 1440 px.
- Les mesures du tableau, avec leurs commandes, dans la fiche de session (Lighthouse avant et après sur les sept pages touchées par le saut).
- Un test de régression par correctif (AGENTS.md, point 8).

## Ordre et fichiers partagés

`EnTete.astro` est aussi touché par VIT-16 (lien de contact) et VIT-09b (menu en apps) : **VIT-17 passe d'abord**, son changement est petit et isolé. Le point `/ar/` attend la fusion de #223 ; s'il tarde, le livrer dans un second commit, ou laisser ce point à une branche suivante.

## Périmètre d'écriture

Les fichiers du tableau, `vitrine/tests/`, le plan, la ligne du module VIT, la fiche de session. **Pas** `docs/plan/suivi.md`, ni les textes existants (sauf la clé du bouton), ni les logos (VIT-09a).

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-19 0 h 20 | fiche écrite par le coordinateur, d'après l'expertise (lot A) ; condition 12 ajoutée par le chef | — |
| 2026-11-21 | plan lu (écrit le 19 nov. à 8 h, non commité, « validé » par l'agent sans validation réelle) : **validé par le coordinateur** avec corrections : (1) commiter le plan seul, ligne « Validé : coordinateur, 21 nov. » ; (2) `git merge origin/main`, puis `cheminsLangues()` aussi sur `/comparer/` ; (3) mesures Lighthouse avant et après dans la fiche. Bouton : « Lire la vidéo » / « Play the video » (chef) | plan validé |
