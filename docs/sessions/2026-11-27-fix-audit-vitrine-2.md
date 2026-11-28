# Session du 2026-11-27 · audit vitrine · `fix/audit-vitrine`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | EXP, suite de l'audit (#198) |
| Dossier de travail | `..\travaux-planner\fix-audit-vitrine` |
| Dernier commit | `95f66923` pour le visa ; cette fiche le suit |

## Objectif de la session

Écrire le visa du coordinateur dans le § 7. Aucune montée : elle attend 19 h 02 UTC.

## Plan

[docs/conception/exploitation/fix-audit-dependances.md](../conception/exploitation/fix-audit-dependances.md), § 7 · validé par le coordinateur, 27 nov. La fiche de mission est [fix-audit-vitrine](../plan/missions/fix-audit-vitrine.md).

## Fait

- `95f66923` — le visa dans le § 7, sans montée.
- Versions : `astro` 7.4.12 et `@astrojs/react` 7.1.9, à partir de 19 h 02 UTC. Pas 7.4.11, pas 7.4.13, pas une 8.
- Le pas du flux appellera `node ../scripts/audit.mjs vitrine`, sur les seules dépendances livrées.
- La ligne du module EXP. `suivi.md` n'est pas modifié. Aucun code.

## Vérifié

Aucun test : le paragraphe seulement. Les mesures restent celles de 15 h 09 UTC (`48c1922a`).

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quelle version 7.x ? | `astro` 7.4.12 et `@astrojs/react` 7.1.9, à partir de 19 h 02 UTC | visée |
| 2 | Audit des dépendances livrées seulement ? | Oui. Le pas du flux appelle `scripts/audit.mjs vitrine`. | visée |
| 3 | Faille haute dans l'arbre livré après la montée | S'arrêter et l'écrire au coordinateur. | plus tard, après la montée |
| 4 | Rendu ou poids changé | Pas mesuré : pas de montée. | plus tard |

## État laissé

- État, pour `suivi.md` (le coordinateur le reporte) : `fix-audit-vitrine` → § 7 validé ; code à partir de 19 h 02 UTC
- La branche est derrière `origin/main` de 4 commits (#289). La montée les prendra à ce moment-là.

## Reste à faire, dans l'ordre

1. À partir de 19 h 02 UTC, quand le coordinateur relance : fusionner `origin/main`, poser les deux paquets, changer le pas du flux, lancer les contrôles de la fiche.
2. Si une faille haute ou critique apparaît dans l'arbre livré, s'arrêter.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\fix-audit-vitrine" push -u origin fix/audit-vitrine
```

La PR peut attendre la montée : ce commit ne contient que le visa.

## Prompt de reprise

```text
Tu reprends l'audit de la vitrine (montée d'Astro, point 4 du plan d'audit),
sur la branche fix/audit-vitrine, dans le dossier ..\travaux-planner\fix-audit-vitrine.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la fiche docs/plan/missions/fix-audit-vitrine.md,
le plan docs/conception/exploitation/fix-audit-dependances.md (§ 7)
et cette fiche (docs/sessions/2026-11-27-fix-audit-vitrine-2.md).
Fait : le § 7 est validé par le coordinateur le 27 nov.
Versions : astro 7.4.12 et @astrojs/react 7.1.9, pas avant 19 h 02 UTC.
Pas 7.4.11, pas 7.4.13, pas une 8.
Le pas .github/workflows/vitrine.yml appelle node ../scripts/audit.mjs vitrine,
sur les seules dépendances livrées.
Aucun code. La branche est derrière origin/main de 4 commits.
Reste : à partir de 19 h 02 UTC, merger origin/main, poser les deux paquets,
changer le pas du flux, lancer les contrôles. vitrine/src/ ne change pas.
Si une faille haute ou critique apparaît dans l'arbre livré, s'arrêter
et l'écrire au coordinateur.
Règles : pas de code avant 19 h 02 UTC ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
