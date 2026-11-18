# Session du 2026-11-18 · expertise du site vitrine · `etude/expertise-site-vitrine`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), nouvelle session ouverte par le chef |
| Chantier | VIT (préparation de VIT-05 et conditions de VIT-06) ; étude sans code |
| Dossier de travail | `..\travaux-planner\expertise-site` |
| Dernier commit | `b9c523ac` (le rapport), puis cette fiche |

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
| 1 | Quel canal de contact publier dès la mise en ligne, avant VIT-02 ? | une adresse e-mail dédiée au site, « réponse sous deux jours ouvrés » ; **l'adresse reste à donner** | **validé** par le chef (D1) |
| 2 | Garder « quand l'école active l'IA », alors que l'IA s'allume par `IA_CLE` côté serveur ? | « quand l'IA est activée pour votre école » ; interrupteur par école noté comme fonction à venir | **validé** (D2) |
| 3 | Retirer « Au Maroc, Massar en est un exemple », « BTS » et « crédits du LMD » (EP-5) ? | oui, avec des formulations sans pays | **validé** (D3) |
| 4 | Dire que le calcul sert aujourd'hui le supérieur et la formation, pas encore le collège ? | oui, sur l'ouverture et dans l'ordre du menu « Solutions » | **validé** (D4) |

Réponse du chef, 18 nov. : « Je valide tes propositions. Propose tes solutions et mentionne-les dans le plan, pour que le coordinateur puisse les voir et proposer un plan d'implémentation aux agents. »

## État laissé

- Expertise du site vitrine → **rendue**, avec les décisions du chef (§ 12), les solutions détaillées (§ 13) et une proposition de découpage (§ 14). Sur `etude/expertise-site-vitrine`, à pousser par le chef. `suivi.md` n'est pas modifié.
- Pour le coordinateur : reporter D1 à D4 dans `decisions.md` ; créer les lots A (correctifs techniques) et B (textes exacts) ; ajouter les précisions du § 13 aux fiches de VIT-09, VIT-10b, VIT-14 et VIT-15 ; inscrire l'interrupteur de l'IA par école (D2) ; proposer au chef C1 et C6 comme conditions de VIT-06.

## Reste à faire, dans l'ordre

1. Le chef donne l'adresse e-mail du site (D1), pour VIT-16.
2. Le coordinateur lit les § 12 à 14 et propose le plan d'implémentation aux agents.
3. Le chef valide les textes nouveaux du § 13, phrase par phrase, dans le plan de chaque lot.
4. Si le chef le demande : refaire la mesure avec les PR ouvertes du site (#221 à #224).

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
Le chef a validé les quatre propositions (D1 à D4, § 12) ; solutions détaillées au § 13, découpage proposé au § 14.
Reste : l'adresse e-mail du site (au chef) ; si demandé, refaire la mesure avec les PR ouvertes du site.
Pour mesurer : npm ci ; npm run build ; npx astro preview sur un port libre (vérifier le port annoncé : 4329 peut être pris).
Règles : aucun code ; questions avant toute supposition ; suivi.md non modifié ; jamais de git push.
```
