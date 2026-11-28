# Session du 2026-11-28 · QJE-15 · `feat/qje-15-jeux-par-niveau`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-15-jeux-par-niveau` |
| Dernier commit | le commit de cette fiche |

## Objectif de la session

Inscrire le visa des onze accroches, puis les écrans de QJE-15 sauf le web : neuf vues, le mobile, la bibliothèque du site.

## Plan

[docs/conception/jeux/qje-15-jeux-par-niveau.md](../conception/jeux/qje-15-jeux-par-niveau.md) · questions 5 et 6, § 4 bis.

## Fait

- `9907d16d` : `origin/main` fusionnée.
- `29b4cd52` : questions 5 et 6 visées le 28 nov. (`e9a0c5a3`).
- `59907f1f` : neuf vues WebP du défi 1, et `credits.md`. Les deux images de Codex n'ont pas de fichier.
- `f995af02` : le mobile range les jeux d'un module. `jeux.jsx` : 230 lignes. `GroupeJeux.jsx` : 85 lignes.
- `e696cbdc` : la bibliothèque du site, une grille par domaine. Accroches en français, en anglais et en arabe. L'arabe n'est pas publié.
- `frontend/src/pages/jeux/Jeux.jsx` n'est pas touché. `vitrine/src/components/applications/` non plus. `suivi.md` non plus.

## Vérifié

- `rangementJeux.test.js` : 4 tests verts.
- Mobile, `groupeJeux.test.js` : 3 tests verts.
- Vitrine, `npm run test:unit` : 169 verts, 1 sauté (clone StudyLib), 0 échec.
- Build : 43 pages.
- `bibliotheque-des-jeux.rendu.cjs` : 2 verts (français et anglais).
- axe-core sur `/fr/bibliotheque-des-jeux/` et `/en/bibliotheque-des-jeux/`, à 390 et 1440 px : 4 verts, aucune violation (wcag2a, wcag2aa, wcag21aa, best-practice).
- EP-19 : page la plus lourde du site, `fr/index.html`, 134,4 Ko. La bibliothèque, images comprises, 119,0 Ko. Les neuf WebP pèsent 48 882 octets. La première rangée de la grille Informatique n'a qu'une image (`cpu-process.webp`, 6 412 octets) : Labo Big-O et Requête Parfaite n'ont pas de fichier. Tout est sous 200 Ko.
- `verifier-neutre.mjs` : aucun nom d'école en dur.
- Parcours `sessionsJeu` : non lancé. Le web n'a pas changé.

Poids des vues, en octets : terminal 4 696, cpu 6 412, robot 3 232, topo 6 198, tri 6 336, seuils 5 708, budget 5 306, sprint 6 648, stocks 4 346.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 5 | Les accroches | les onze phrases du § 4 bis | visées le 28 nov. |
| 6 | La voie d'image | neuf vues ; Codex pour Labo Big-O et Requête Parfaite | visée le 28 nov. |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-15 → mobile et bibliothèque du site écrits ; web après #229 ; deux images Codex absentes, repli sans image

## Reste à faire, dans l'ordre

1. Codex livre les deux images (`big-o-lab`, `quete-sql`). On les pose dans `shared/jeux/images/` et `vitrine/public/jeux/`, et on date la ligne de `credits.md`.
2. Le web (`BibliothequeJeux`, `ProposerJeuDialog`, `Jeux.jsx` sous 300 lignes), après la fusion de #229.
3. Le chef pousse. La relecture est au coordinateur.

## Écarts avec le plan

- Les neuf vues sont des dessins des éléments du défi 1 (données fictives du catalogue), pas une photo de l'application lancée. Le plan le permet : « dessin composé des éléments de cet écran ».
- Les titres anglais des cycles reprennent le vocabulaire déjà publié du site : Middle school, High school, Higher education, Vocational training. Le plan ne donnait que le français, et disait que l'anglais venait avec les écrans.
- Le web n'est pas fait : la consigne le réserve à #229.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-15-jeux-par-niveau" push
```

La PR #285 est déjà ouverte : ce push la met à jour. Rien n'est poussé depuis cette session.

## Prompt de reprise

```text
Tu reprends QJE-15 (jeux par niveau, puis par domaine), sur la branche
feat/qje-15-jeux-par-niveau, dans le dossier ..\travaux-planner\qje-15-jeux-par-niveau.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/jeux/qje-15-jeux-par-niveau.md
et cette fiche (docs/sessions/2026-11-28-feat-qje-15-jeux-par-niveau-2.md).
Fait : questions 5 et 6 visées le 28 nov. Neuf vues WebP du défi 1 dans
shared/jeux/images/ et vitrine/public/jeux/. Le mobile (GroupeJeux) et la
bibliothèque du site rangent par cycle puis par domaine. Labo Big-O et
Requête Parfaite n'ont pas d'image : la carte s'affiche sans. Le web
(Jeux.jsx) n'est pas touché.
Reste : les deux images de Codex, puis le web après la fusion de #229.
Questions en attente : aucune. Les questions 5 et 6 sont visées.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
Ne pas toucher vitrine/src/components/applications/ ni la page du module.
```
