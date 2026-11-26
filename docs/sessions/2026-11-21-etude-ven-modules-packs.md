# Session du 2026-11-21 (soir) · étude des modules vendables et des packs · `etude/ven-modules-packs`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur, à la demande du chef |
| Chantier | hors chantier (étude, document seul) |
| Dossier de travail | `..\travaux-planner\ven-modules-packs` |
| Dernier commit | cette fiche ; étude `ebfe4d18` |

## Objectif

Demande du chef (21 nov. au soir) : lister les modules que Planner peut vendre, proposer des packs, justifier chaque proposition par les études concurrentielles ; sans prix.

## Fait

| Commit | Contenu |
|---|---|
| `d3cad8ae` | `docs/etude-marche/15-modules-et-packs.md` : socle inclus, dix-sept modules vendables, cinq packs par public, six règles de l'offre, icônes à dessiner ; ligne dans le README du dossier |
| `1e1a2ebe` | réponses du chef : liste, packs avec une part gratuite et des fonctions verrouillées visibles (§ 5.4), connecteur d'État inclus, six règles |
| `ebfe4d18` | treize logos à dessiner ; lien vers la mission VIT-09c |

Études reprises : 01, 05 (branche, #169), 06 et son rapport, 07, 09, 10, 13 et 14 (branche, #234), et `decisions.md`.

## Décisions

Toutes du chef, par l'outil de questions, le 21 nov. au soir ; reportées par le coordinateur dans `decisions.md` (branche `doc/coordination-equipe`, `6d540d0f`). Deux du coordinateur : le logo `cours` pour l'Espace de cours ; VIT-15 et VEN-01 partent de cette liste.

## Limites

Liens vers les études 05, 13 et 14 morts tant que #169 et #234 ne sont pas fusionnées. Aucune école n'a encore réagi : VEN-02 doit confirmer.

## Reste à faire

1. Le chef pousse la branche et ouvre la PR (document seul ; aucun conflit attendu : deux fichiers sous `docs/etude-marche/` et cette fiche).
2. Après la fusion : VEN-01 reprend le § 4 et le § 5.4 dans son plan ; VIT-09c dessine les logos ; VIT-15 suit la liste.

## Prompt de reprise

```text
Tu travailles sur Planner. L'étude docs/etude-marche/15-modules-et-packs.md (branche etude/ven-modules-packs) est validée
par le chef le 21 nov. au soir. Si on te demande de la modifier : lis-la, lis decisions.md (21 nov. au soir), pose tes questions
au chef par l'outil de questions, et ne mets aucun prix (décision du chef). Jamais de git push.
```
