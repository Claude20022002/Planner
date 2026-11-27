# Session du 2026-11-27 · audit vitrine · `fix/audit-vitrine`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | EXP, suite de l'audit (#198) |
| Dossier de travail | `..\travaux-planner\fix-audit-vitrine` |
| Dernier commit | `48c1922a` pour le § 7 ; cette fiche le suit |

## Objectif de la session

Écrire le § 7 du plan d'audit de la vitrine, à partir des mesures du 27 nov. Aucun code.

## Plan

[docs/conception/exploitation/fix-audit-dependances.md](../conception/exploitation/fix-audit-dependances.md), § 7 · en attente du coordinateur. Le plan du 18 nov. est validé par le chef. La fiche de mission est [fix-audit-vitrine](../plan/missions/fix-audit-vitrine.md).

## Fait

- Branche `fix/audit-vitrine` créée depuis `origin/main` (`44870e1d`).
- `48c1922a` — le § 7 seul : versions, dates, audits. Pas de montée, pas de changement du flux.
- La ligne d'audit du module EXP, et cette fiche. `suivi.md` n'est pas modifié.

## Vérifié

Mesure à 15 h 09 UTC.

- `npm view` : `astro` 7.4.13, `@astrojs/react` 7.1.9. Installés : 7.4.5 et 7.1.2.
- À cette heure, 14 fois 24 heures donnent `astro` 7.4.11 et `@astrojs/react` 7.1.8. 7.4.12 et 7.1.9 les atteignent à 19 h 02 UTC et 18 h 57 UTC.
- `npm audit --omit=dev` : 0 faille. `node ../scripts/audit.mjs vitrine` : 0 ligne, succès.
- `npm audit` complet : 1 moyenne (GHSA-r3h5-4585-7x3w, `astro` jusqu'à 7.4.6), 0 haute.
- `picomatch` 4.0.7 est dans le verrou, en `dev`. L'audit ne le signale pas. Aucune exception `vitrine`.

Aucun test de pages : le code n'a pas changé.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quelle version 7.x ? | À 15 h 09 UTC : `astro` 7.4.11 et `@astrojs/react` 7.1.8. Le plancher 7.4.12 et 7.1.9 a 14 fois 24 heures à partir de 19 h 02 UTC. Jamais une 8. 7.4.13 a 9 jours. | en attente du coordinateur |
| 2 | Audit des dépendances livrées seulement ? | Oui. Le script le fait. L'audit complet est dans le § 7. | en attente du coordinateur |
| 3 | Faille haute autre que picomatch | Rien à lister aujourd'hui : 0 haute dans les deux audits. | plus tard, après la montée |
| 4 | Rendu ou poids changé | Pas mesuré : pas de montée. | plus tard |

## État laissé

- État, pour `suivi.md` (le coordinateur le reporte) : `fix-audit-vitrine` → § 7 écrit, en attente du coordinateur
- QJE-15 reste en attente du visa sur #285. Cette session l'a quittée pour l'audit, comme le plan de QJE-15 le dit pour le 27 nov.

## Reste à faire, dans l'ordre

1. Le coordinateur valide le § 7, et choisit les versions (question 1).
2. Le code : les deux paquets, le pas du flux, les contrôles de la fiche. `vitrine/src/` ne change pas.
3. Si une faille haute apparaît dans l'arbre livré après la montée, s'arrêter.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\fix-audit-vitrine" push -u origin fix/audit-vitrine
gh pr create --base main --head fix/audit-vitrine --title "Audit vitrine : montée d'Astro, plan du 27 nov." --fill
```

La PR peut attendre le visa du § 7 : le commit actuel ne contient que la mesure.

## Prompt de reprise

```text
Tu reprends l'audit de la vitrine (montée d'Astro, point 4 du plan d'audit),
sur la branche fix/audit-vitrine, dans le dossier ..\travaux-planner\fix-audit-vitrine.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la fiche docs/plan/missions/fix-audit-vitrine.md,
le plan docs/conception/exploitation/fix-audit-dependances.md (§ 7)
et cette fiche (docs/sessions/2026-11-27-fix-audit-vitrine.md).
Fait : le § 7 est commité (48c1922a). Mesure du 27 nov. à 15 h 09 UTC.
À cette heure, astro 7.4.11 et @astrojs/react 7.1.8 ont 14 fois 24 heures.
7.4.12 et 7.1.9 les atteignent à 19 h 02 UTC. 7.4.13 a 9 jours.
L'audit livré a 0 faille. L'audit complet a 1 moyenne (GHSA-r3h5-4585-7x3w).
Aucun code.
Reste : le visa du coordinateur sur les questions 1 et 2, puis la montée
et le pas du flux. vitrine/src/ ne change pas. Si une faille haute apparaît
dans l'arbre livré, s'arrêter.
Règles : pas de code avant le § 7 validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
