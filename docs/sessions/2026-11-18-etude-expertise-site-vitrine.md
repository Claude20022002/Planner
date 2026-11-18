# Session du 2026-11-18 · expertise du site vitrine · `etude/expertise-site-vitrine`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), nouvelle session ouverte par le chef |
| Chantier | VIT (préparation de VIT-05 et conditions de VIT-06) ; étude sans code |
| Dossier de travail | `..\travaux-planner\expertise-site` |
| Dernier commit | voir `git log -2` sur la branche (rapport, puis cette fiche) |

## Objectif de la session

Juger le site vitrine de `origin/main` (`9b3fcb25`) face à ses promesses et à ses objectifs, en directeur de création, expert produit et conversion, et expert en accessibilité, selon la [fiche de mission](../plan/missions/expertise-site-vitrine.md). Livrable : `docs/etude-marche/12-expertise-site-vitrine.md`, sans code.

## Plan

La fiche de mission tient lieu de plan (étude sans code). Elle est sur `doc/coordination-equipe` (#211), pas encore fusionnée. Les références qui n'existent que là (EP-13, EP-18, EP-5 généralisée, décisions des 17 et 18 nov., `11-chemins-site-openeducat.md`, fiches VIT-09 à VIT-16) ont été lues sur cette branche.

## Fait

- Site construit (`npm ci`, `npm run build` : 49 pages ; `npm run test:unit` : 76 sur 76), prévisualisé sur le port 4331.
- axe-core 4.10.3 : 144 passages (16 pages, 3 langues, 390, 768 et 1440 px), **0 violation**, aucun débordement horizontal.
- Lighthouse 12.8.2 : 19 rapports. Accessibilité, bonnes pratiques et SEO à 100 (sauf l'arabe en `noindex`). Performance mobile de 79 à 82 sur sept pages, à cause d'un saut de 330 px du menu sur téléphone, démontré par une mesure avec et sans JavaScript.
- Chaque texte français confronté au code de `backend/`, `frontend/`, `mobile/` et `shared/` : presque tout est tenu ; six phrases exagérées ou floues (P1 à P6) ; l'IA s'active par `IA_CLE` côté serveur, pas par l'école.
- Rapport écrit : six notes (objectifs 4, promesses 7, règles 7, design 5, qualité 8, positionnement 3), dix corrections rangées, quatre questions au chef.
- Captures et rapports de mesure gardés hors du dépôt, dans le dossier temporaire de la session.

## Vérifié

- `node scripts/verifier-neutre.mjs` : vert.
- Les chemins et numéros de ligne cités dans le rapport ont été relus.
- Piège rencontré : le port 4329 servait déjà un ancien site d'un autre dossier. La première série de mesures a été jetée et refaite sur le bon serveur.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quel canal de contact publier dès la mise en ligne, avant VIT-02 ? | proposition : une adresse e-mail dédiée au site | au chef |
| 2 | Garder « quand l'école active l'IA », alors que l'IA s'allume par `IA_CLE` côté serveur ? | proposition : « quand l'IA est activée pour votre école » | au chef |
| 3 | Retirer « Au Maroc, Massar en est un exemple », « BTS » et « crédits du LMD » (EP-5) ? | proposition : oui, avec des formulations sans pays | au chef |
| 4 | Dire que le calcul sert aujourd'hui le supérieur et la formation, pas encore le collège ? | proposition : oui, sur l'ouverture et dans l'ordre du menu « Solutions » | au chef |

## État laissé

- Expertise du site vitrine → **rendue**, sur `etude/expertise-site-vitrine`, à pousser par le chef. `suivi.md` n'est pas modifié.
- Corrections hors de toute mission (à inscrire par le coordinateur si le chef les retient) : saut du menu sur téléphone, vidéo sur connexion lente, relecture des phrases P1 à P6 et des mentions de pays, récit EP-18 sur l'accueil et En classe, pages `/ar/` en français, balises Open Graph, `vitrine/README.md`.

## Reste à faire, dans l'ordre

1. Le chef lit le rapport et répond aux quatre questions du § 10.
2. Le coordinateur répartit les corrections 6, 7 et 9 (nouvelles) et élargit VIT-10b des deux points de la correction 8.
3. Si le chef le demande : refaire la mesure avec les PR ouvertes du site (#221 à #224).

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\expertise-site" push -u origin etude/expertise-site-vitrine
gh pr create --base main --head etude/expertise-site-vitrine --title "Étude : expertise du site vitrine face à ses promesses et à ses objectifs" --fill
```

## Prompt de reprise

```text
Tu reprends l'expertise du site vitrine, sur la branche etude/expertise-site-vitrine,
dans le dossier ..\travaux-planner\expertise-site.
Lis d'abord AGENTS.md, docs/plan/README.md, la fiche docs/plan/missions/expertise-site-vitrine.md
(branche doc/coordination-equipe si elle n'est pas fusionnée), le rapport
docs/etude-marche/12-expertise-site-vitrine.md et cette fiche (docs/sessions/2026-11-18-etude-expertise-site-vitrine.md).
Fait : site de main (9b3fcb25) construit et mesuré (axe-core 0 violation sur 144 passages, Lighthouse 19 rapports),
promesses confrontées au code, six notes, dix corrections, quatre questions au chef.
Reste : intégrer les réponses du chef aux questions du § 10 ; si demandé, refaire la mesure avec les PR ouvertes du site.
Pour mesurer : npm ci ; npm run build ; npx astro preview sur un port libre (vérifier le port annoncé : 4329 peut être pris).
Règles : aucun code ; questions avant toute supposition ; suivi.md non modifié ; jamais de git push.
```
