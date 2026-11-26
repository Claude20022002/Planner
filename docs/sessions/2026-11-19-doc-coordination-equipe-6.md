# Session du 2026-11-19 · coordination · `doc/coordination-equipe` (6)

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur désigné par le chef |
| Chantier | transversal (coordination) ; site vitrine (VIT) surtout |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | voir `git log -1` (cette fiche) |

## Objectif

Après les rendus du soir (comparatif, expertise, pages légales, logos), répartir entre les agents tout ce que l'expertise du site et les décisions du chef ont fait apparaître.

## Tour d'état (19 nov., 0 h)

| PR ou branche | Ce qui est rendu | Verdict |
|---|---|---|
| #216, #219, #218, #220 | fusionnées le 18 nov. au soir | — |
| #225 expertise du site | rapport complet (notes 4, 7, 7, 5, 8, 3 ; dix corrections ; D1 à D4 validées par le chef) | **conforme**, à fusionner |
| #224 VIT-14 | plan validé, code, 88 tests ; se fusionne sans conflit avec `main` | **conforme** : `merge origin/main`, push, fusion |
| #223 VIT-12 | codée ; CI rouge **exprès** (valeurs du chef manquantes) | **ne pas fusionner** avant les valeurs |
| `feat/vit-16-contact-a-propos` | plan écrit ; « validé avec corrections », corrections non reçues | en attente du chef |
| #222 VIT-09a | logos et icônes vivantes, planches validées | conflit d'une ligne (module VIT) à résoudre, puis fusion |
| #221 VIT-06 (code) | CI du site rouge (`.env.docker` introuvable) malgré le correctif ; conflit d'une ligne | **à corriger** (Codex) |
| `feat/vit-10b-avant-avec-faq` (local) | visa du chef seul, puis code | bonne ; complément C8 avant le push |
| `doc/doc-03-complements-parite` (Codex, demande directe du chef) | cinq propositions, DOC-03 validé comme premier lot après VSC-02, ADM-05, COM-01 | arbitrages 2 à 4 et ouverture de DOC : au chef |
| étude EP-18 | **aucune branche vue** | à demander au chef |

## Décisions

- Chef : D1 à D4 (réponses à l'expertise) ; **conditions 11 et 12** de la mise en ligne (contact réel ; aucun saut du menu, performance mobile ≥ 90).
- Coordinateur : répartition de l'expertise (lots A et B, compléments aux fiches), ordre des fusions du site, VIT-14b à part. Tout est dans `docs/plan/decisions.md`.

## Fait

- Fiches nouvelles : [vit-17-correctifs-vitrine](../plan/missions/vit-17-correctifs-vitrine.md) (lot A, agent de Cursor), [vit-18-textes-exacts](../plan/missions/vit-18-textes-exacts.md) (lot B, session de l'expertise).
- Fiches complétées : VIT-06, VIT-09, VIT-10b, VIT-12, VIT-13, VIT-14 (VIT-14b), VIT-15, VIT-16, expertise.
- `feuille-de-route.md` : douze conditions, ordre des fusions, files. `suivi.md` : missions et fonctions (VIT-17, VIT-18, QJE-16 interrupteur de l'IA par école ; lignes fusionnées retirées). `decisions.md`.
- Boîtes : consigne à Codex (`2026-11-19-0025-vit-06-corriger-et-file`), consigne à l'agent de Cursor (`2026-11-19-0025-vit-10b-c8-puis-vit-17`) ; rapports rangés dans `traites\`.

## Qui fait quoi, maintenant

| Agent | Tout de suite | Ensuite |
|---|---|---|
| Codex | #221 : CI du site, conflit, conditions 11 et 12, durée des journaux | VIT-11 (code), VIT-15, QJE-03/06 |
| Agent de Cursor | VIT-10b : complément C8 | VIT-17, VIT-13, QJE-15, audit du 27 nov. |
| Claude (VS Code) | #222 : conflit d'une ligne | VIT-09b (plan maintenant, code en dernier), deux phrases de la vidéo après VIT-18, puis sa file |
| Session VIT-12/16 | attend les valeurs et corrections du chef | VIT-16 après la fusion de #223 |
| Session VIT-14 | `merge origin/main`, push de #224 | VIT-14b |
| Session de l'expertise | VIT-18 : plan et visas | code après #224 |
| Session EP-18 | à vérifier | — |

## Questions au chef

1. **VIT-12/16** : écrire dans le message de cette session (pas dans « Autre ») `NOM`, `HÉBERGEUR`, `N` (proposition : 30 jours), `DATE`, `E-MAIL` (D1), `RÉSEAU`, et les corrections du plan de VIT-16.
2. **Étude EP-18** : la session a-t-elle été ouverte ? Aucune branche `etude/ep18-faible-equipement` n'est visible.
3. **DOC-03** (Codex) : arbitrages 2 à 4 et ouverture de DOC, quand tu le voudras.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\coordination-equipe" push
gh pr merge 225 --merge
# VIT-14 : la session fait le merge, ou toi :
git -C "..\travaux-planner\vit-14-comparatif" merge origin/main
git -C "..\travaux-planner\vit-14-comparatif" push
# attendre une minute, puis
gh pr checks 224 --watch
gh pr merge 224 --merge
```

Puis « lis ta boîte » à Codex et à l'agent de Cursor, et les prompts ci-dessous aux sessions Claude.

## Prompts pour les sessions Claude

**Claude de VS Code**

```text
Le coordinateur relaie (19 nov.). 1) #222 (VIT-09a) : git merge origin/main dans ..\travaux-planner\vit-09a-logos,
résous le conflit d'une ligne de docs/plan/modules/VIT-site-vitrine.md en gardant les deux lignes, relance les tests,
commite ; le chef pousse. 2) VIT-09b : ta fiche docs/plan/missions/vit-09-illustrations.md a reçu les ajouts de l'expertise
(docs/etude-marche/12-expertise-site-vitrine.md, § 13 : C2 titre-promesse et liens des rôles, C3 captures prioritaires et dessin
de l'appel liste d'abord, C10 page Application). Écris le plan court maintenant, au chef ; le code en dernier sur le site.
3) Après les visas de VIT-18 : le nouveau rendu des deux phrases de la vidéo (scenes.4, scenes.7) et de la transcription.
Puis ta file (UIX-10b, UIX-11, UIX-06c, QJE-14, StudyLib, UIX-10d). Fiches et feuille de route sur doc/coordination-equipe.
Ne modifie pas docs/plan/suivi.md. Fiche de session ; jamais de git push.
```

**Session de VIT-12 et VIT-16** (le chef ajoute les valeurs dans le message)

```text
Le coordinateur relaie (19 nov.). Voici les valeurs de VIT-12 : NOM = …, HÉBERGEUR = …, N = … jours, DATE = …, E-MAIL = …
(D1 : « réponse sous deux jours ouvrés »). Pour VIT-16 : RÉSEAU = …, et mes corrections du plan : …
Reporte les valeurs, vérifie que le test « aucun champ à compléter » passe, commite ; le chef pousse #223.
Puis écris les corrections dans le plan de VIT-16, fais-le valider, et code après la fusion de #223 (rebase sur origin/main).
VIT-16 tient la condition 11 (un contact réel) : tous les boutons « Nous contacter » mènent à /contact/ (expertise, C1).
Ne modifie pas docs/plan/suivi.md. Fiche de session ; jamais de git push.
```

**Session de VIT-14**

```text
Le coordinateur relaie (19 nov.). #224 est relue : conforme. Fais git merge origin/main dans ..\travaux-planner\vit-14-comparatif
(sans conflit attendu), relance npm run test:unit et npm run build, commite ; le chef pousse et fusionne.
Ensuite VIT-14b (ta fiche docs/plan/missions/vit-14-comparatif.md, ligne du 19 nov.) : trois critères de plus, d'après l'expertise
(C4) : l'appel qu'on ne peut pas tromper, le bilan de chaque règle après le calcul, la semaine lisible sans réseau. Complément de plan
avec la source de chaque case, validé par le chef case par case, puis le code sur feat/vit-14b-criteres depuis origin/main après
la fusion de #224. Ne modifie pas docs/plan/suivi.md. Fiche de session ; jamais de git push.
```

**Session de l'expertise** : le prompt de la fiche [vit-18-textes-exacts](../plan/missions/vit-18-textes-exacts.md).

## Prompt de reprise (coordinateur)

```text
Tu es le coordinateur des agents de Planner. Travaille dans ..\travaux-planner\coordination-equipe, branche doc/coordination-equipe.
git fetch puis git merge origin/main. Lis AGENTS.md, les skills coordination et relecture-branche, docs/plan/suivi.md (Missions en cours),
docs/plan/feuille-de-route.md (douze conditions, ordre des fusions, files), docs/plan/decisions.md (18 et 19 nov.),
puis cette fiche (docs/sessions/2026-11-19-doc-coordination-equipe-6.md).
Fait : l'expertise du site est répartie (VIT-17 à l'agent de Cursor, VIT-18 à la session de l'expertise, compléments de VIT-09b,
VIT-10b, VIT-14b, VIT-15, VIT-16) ; consignes dans les boîtes de Codex et de Cursor.
À suivre : #221 (Codex), C8 puis VIT-17 (Cursor), #222 (Claude VS Code), les valeurs du chef pour #223 et VIT-16, #224 et #225 à fusionner,
l'étude EP-18 (aucune branche vue). Tour d'état d'abord, boîtes comprises ; relis chaque branche finie ; toi seul modifies suivi.md ;
jamais de git push.
```
