# Session du 2026-11-19 · STA-01 · `feat/sta-01-offres-stage`

| | |
|---|---|
| Fait par | Qoder (assistant), sur demande du chef de projet |
| Chantier | STA (stages et alternance), fonction STA-01 « offres de stage (espace Carrière) » |
| Dossier de travail | `plan_B_projet_PACTE` |
| Branche | `feat/sta-01-offres-stage`, partie de `origin/main` (`736a8f7e`) |
| Dernier commit | voir `git log -1` (cette fiche) ; plan : `9f7c4b7a` |

## Objectif de la session

Écrire le plan de STA-01 (avec le **prix** de l'offre, c'est-à-dire la gratification, au centre du
modèle), puis le code complet — serveur, site, application — en respectant l'architecture et la
sécurité du dépôt, et ouvrir la PR pour la relecture du chef.

## Plan

[docs/conception/stages/sta-01-offres-stage.md](../conception/stages/sta-01-offres-stage.md),
commité seul (`9f7c4b7a`) avant tout code. Il corrige deux points du modèle en cours de route :
`debut`, `fin` et `publiee_le` sont des `DATEONLY` (un jour, pas un instant), et le module n'est pas
couvert par un parcours Playwright (voir « Vérifié »).

## Fait

| Commit | Contenu |
|---|---|
| `9f7c4b7a` | le plan : modèle (dont `gratification` et `devise`), routes, sécurité, écrans, tests, et ce qui reste hors du lot |
| ce commit | le code, en trois étages décrits ci-dessous |

**Règles partagées** — `shared/offresStage.js` : bornes des champs, devises, `verifierOffre` (rend
`{ motif }` ou `{ offre }` nettoyée), `manquesPourPublier`, `formaterMontant` (espace fine insécable,
comme le reste des montants), `filtrerOffres`, `lienAutorise` (http et https seulement). Le serveur,
le site et l'application refusent donc la même offre avec le même motif.

**Serveur** — migration `0083-offres-stage.js` ; `models/OffreStage.js` (table `OffresStage`,
`DATEONLY`, `DECIMAL(10,2)`, `jeton_partage` unique) ; relation dans `models/definitions.js` et
résolveur dans `models/index.js` ; `services/stages/offres.js` (lecture, création, modification,
publication, suppression, fiche publique, avec `ErreurMetier` et les mêmes gardes que les annonces) ;
`routes/offreStageRoutes.js` (session obligatoire pour tout, sauf la fiche partagée) ; `app.js` monte
`/api/offres-stage/publiques` **avant CSRF** et `/api/offres-stage` après les annonces ; `DEVISES`
ajouté au référentiel. Le jeton de partage fait 128 bits, posé à la première publication ; la route
publique porte son propre limiteur (60 lectures / quart d'heure / adresse), `Cache-Control: no-store`
et `X-Robots-Tag: noindex`.

**Site** — `services/api.js` (`offreStageAPI`), espace i18n `offresStage` en français et en anglais,
entrée « Offres de stage » au menu pour l'administration, l'enseignant responsable de filière
(`estResponsable`) et l'étudiant, page `/offres-stage` (liste, filtres recherche / filière / niveau /
statut, prix « 1 500 MAD / mois », dialogue de saisie avec gratification et devise, publier / fermer /
rouvrir / supprimer, copie du lien de partage) et page publique `/offres-stage/p/:jeton` sans
connexion ; routes et pages chargées à la demande dans `App.jsx`.

**Application** — `src/stage/offres.js` (dates, prix, période, filières de la liste, filtre),
`chargerOffresStage` / `chargerOffreStage` dans `api/donnees.js`, textes `app.stages` en français et
en anglais, écran `stage/offres` (liste avec recherche, pastilles de filière, tirer pour rafraîchir)
et fiche `stage/offres/[id]` (prix, période, postuler, écrire), ouvertes depuis Bibliothèque →
Stages → « Offres de stage ».

## Décisions et écarts

- **Pas de parcours Playwright.** Le parcours exigerait MySQL et le solveur, absents de ce poste : un
  parcours écrit sans être joué une seule fois partirait en aveugle dans la CI. Le plan est corrigé
  en conséquence ; les tests unitaires couvrent les fonctions pures des deux écrans.
- **Pas de contrôleur séparé** : les gestionnaires vivent dans `services/stages/offres.js`, comme
  `routes/annonceRoutes.js` le fait déjà avec `services/annonces`. La couche reste identique
  (route → service → modèle).
- **Publication** : le contenu complet est exigé dès le brouillon ; pour publier, il faut en plus un
  moyen de postuler (lien ou courriel), seul `manquesPourPublier` du module.
- **Suppression** refusée tant que l'offre est publiée : il faut la fermer d'abord, pour ne pas
  casser un lien de partage déjà diffusé.

## Vérifié

| Vérification | Résultat |
|---|---|
| `backend` : `npm test` | **537 tests sur 537 verts**, 33 suites, dont `tests/utils/offresStage.test.js` (règles partagées) et `tests/integration/offresStage.test.js` (18 cas) |
| `backend` : `npm run lint` | 0 erreur, 17 avertissements `max-lines` tous antérieurs |
| `frontend` : `npm run test:unit` | **84 tests sur 84 verts**, dont les 5 de `src/utils/offresStage.test.js` |
| `frontend` : `npm run lint` | 0 erreur, 18 avertissements `max-lines` (dont un sur la nouvelle page, comme les pages voisines) |
| `frontend` : `npm run build` | **succès**, 33,6 s ; seuls les avertissements de taille de bloc habituels |
| `mobile` : `npm test` | **18 suites, 83 tests sur 83 verts**, dont les 6 de `__tests__/offresStage.test.js` |
| `mobile` : `npm run lint` | 0 erreur, 3 avertissements `import/no-named-as-default-member` antérieurs sur `i18n.js` |

**Non joué localement, donc en CI seulement** : les tests d'intégration du serveur (pas de MySQL sur
`127.0.0.1:3307` ici) et les parcours Playwright (MySQL et solveur). La CI les exécute ; si l'un
tombe, la PR le montrera avant la relecture.

## État laissé

- STA-01 est codée sur `feat/sta-01-offres-stage`, poussée, et la PR attend la relecture du chef.
- `docs/plan/suivi.md` et la ligne du module STA ne sont **pas** touchés : le suivi se reporte après
  la fusion, comme pour les autres lots.
- Rien n'a été touché hors du module : les avis de stage de l'application
  (`mobile/src/app/stage/partager.jsx`) restent un autre objet, pour STA-02.

## Reste à faire, dans l'ordre

1. Relecture de la PR par le chef (le plan y est relu en même temps que le code).
2. Après fusion : reporter STA-01 → **codée** dans `docs/plan/suivi.md`.
3. Plus tard : STA-02 (conventions, tuteur, présence en entreprise) attend FOR-01 ; la modération
   d'offres déposées par des entreprises extérieures reste hors du lot (le champ `statut` et le jeton
   de partage la préparent sans la décider).
