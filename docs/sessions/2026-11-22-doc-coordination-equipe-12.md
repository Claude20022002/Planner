# Session du 2026-11-22 (1 h) · coordination · `doc/coordination-equipe`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur, session `plan-b-projet-pacte-92`, relais de la fiche `-11` |
| Chantier | hors chantier (coordination) |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | cette fiche ; état `f68d796a` |

## Ouverture

- Sessions ouvertes : `plan-b-projet-pacte-02` (coordinateur de la fiche -11 : « coordination : oui ») ; `plan-b-projet-pacte-2e` (session « BIB », BIB-05). Je me suis d'abord arrêté ; le chef m'a ensuite demandé de répartir le travail. 02 s'est retirée (rien de non commité) **en attendant la confirmation du chef**.
- `git merge origin/main` sans conflit. **#169 fusionnée à 0 h 58** (CI de `main` en cours sur `15cc8584`, verte sur `e1858451`).
- Pas encore fusionnées : #248, #249, #234 (fusion automatique armée, CI en cours), #236, #242 (`f946d291` pas poussé).
- Boîtes : Codex, un rapport (#236 : sept contrôles verts) ; agent de Cursor, six rapports (VIT-19, #169, VIT-19 corrigée, #234, plan Meilisearch, plan de #244, #193). Lus et rangés. Alexis : le message de 0 h 11 attend toujours le chef.
- Aucune branche ADM-02 ni EP-18. `feat/uix-10d-mobile-charte` : une vingtaine de fichiers du mobile toujours non commités, aucune session ouverte vue.

## Relectures

| PR ou branche | Verdict | Ce que j'ai relancé |
|---|---|---|
| #250 VIT-19 (`5aed5d62`) | **prête** si la CI est verte | diff de `655d13c0` lu ; `node --test tests/poids-ep19.test.js` 3/3 |
| #244, plan `setup-java` (`6a054f3e`) | **validé** avec deux précisions | `solver/Dockerfile` et `ci-cd.yml` lus |
| #193 (`0f9d5660`) | **à corriger** | `git grep VSC-07` : trois renvois oubliés |
| plan Meilisearch (`1d1451f8`) | **au chef** | lu contre `decisions.md` |
| #236 VIT-11 | **prête** (CI verte, rapport de Codex) | crue sur parole pour les parcours |

## Consignes déposées

- `cursor\entree\2026-11-22-0105-244-valide-193-a-corriger.md` : #244 d'abord, puis #193.
- `codex\entree\2026-11-22-0105-vit-09c-plan.md` : plan de VIT-09c tout de suite, code après #236.
- Message direct à la session « BIB » : commiter, rendre hash et fiche à la fin de BIB-05.

## Reste à faire

1. Le chef confirme le relais à `plan-b-projet-pacte-02`.
2. Le chef fusionne #248, #249, #236, puis #250 ; pousse `etude/ven-modules-packs` et fusionne #242 ; #234 se fusionne seule.
3. Après #234 : classer la synthèse 14 par public. Après #249 : corriger sa ligne « État ».
4. Relire : le code de #244, la correction de #193, le plan de VIT-09c, BIB-05 à sa fin.
5. Le chef ouvre ADM-02 et EP-18 ; il dit « lis ta boîte » à Codex et à l'agent de Cursor ; il transmet à Alexis son message.
6. Ordre des fusions du site : VIT-11, #223 après les valeurs du chef, VIT-16, VIT-13, VIT-15, VIT-19, VIT-09b en dernier.

## Prompt de reprise

Le même que celui de la fiche -11, en remplaçant « fiche -11 » par « fiche -12 » et en commençant par le point 3 ci-dessus.
