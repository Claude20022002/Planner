# Session du 2026-11-26 (8 h 20) · coordination · `doc/coordination-2026-11-26-suite`, deuxième session

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur désigné par le chef |
| Chantiers | EXP, PLA, ADM, et VSC par exception |
| Dossier de travail | `..\travaux-planner\coordination-2026-11-26-suite` (même branche que la session de 8 h, pas encore poussée) |
| Dernier commit | le commit de cette fiche |

## Objectif de la session

Demande du chef : donner une tâche nouvelle à Codex et à l'agent de Cursor, vérifier leurs derniers travaux, et un prompt pour une session Claude.

## Tour d'état (8 h 20 UTC)

- `main` = `0ecc0b06`, inchangé depuis la session de 8 h. Aucune PR fusionnée ou ouverte depuis. `doc/coordination-2026-11-26-suite` n'est pas encore poussée ; #263 et #231 toujours ouvertes ; `chore/lucide-react-mineures` pas encore poussée.
- **Le chef a écrit le visa sur #261** à 08:20:48 (« Visé : lignes S1, S2 et S3 du § 5.3 (cafbf767) »).
- **Codex** : a lu et rangé la consigne de 8 h 16 (à 8 h 17) ; rien de nouveau dans `sortie/`. Derniers travaux, relus dans la session de 8 h : VIT-22 phase (b) (#263, prête) et les lignes S1 à S3 de VIT-20d (`cafbf767`). #261 et #262 en conflit avec `main`.
- **Agent de Cursor** : M-9 fusionnée (#272). La mission Q-37 de 8 h 16 n'est pas encore lue.
- **ADM-02** : aucun commit depuis le 22 nov. à 11 h 48 (`97f4c48f`, poussée), 229 commits de retard sur `main`, dossier propre ; 0088 réservée ; reste la migration de reprise, puis ADM-02b et ADM-02c.
- Boîte d'Alexis : cinq messages non transmis, inchangés.

## Fait

- **Agent de Cursor** : mission suivante écrite, `fix-audit-vitrine` (point 4 du plan d'audit validé par le chef le 18 nov. : montée d'Astro après les deux semaines, le site sous `scripts/audit.mjs`), **après Q-37 et pas avant le 27 nov.** Constat : `vitrine.yml` et le verrou du site sont sur `main` depuis #195, le site est en Astro 7.4.5 et `@astrojs/react` 7.1.2 ; l'agent écrit un § 7 « Exécution » validé par le coordinateur avant le code. Aucune branche ouverte ne touche ces fichiers.
- **Codex** : pas de mission nouvelle (sa file en compte quatre, dont la suite de VIT-20 sur trois PR) ; consigne : le visa est écrit, VIT-20d phase (b) peut commencer, puis VIT-21 (merge de `main` d'abord), VIT-20f, le correctif `useEffect`.
- `suivi.md` : ligne EXP de l'audit (fiche, après Q-37) ; ligne de VIT-20 (visa écrit, consigne lue). `decisions.md` : une ligne du coordinateur.
- Boîtes (hors dépôt) : `codex/entree/2026-11-26-0824-visa-261-ecrit.md`, `cursor/entree/2026-11-26-0824-suite-audit-vitrine.md`.
- Prompt d'une session Claude pour reprendre ADM-02 (chantier ADM, arrêté depuis le 22 nov.), donné au chef.

## Vérifié

- Commentaire du chef sur #261 lu par `gh pr view 261`. `git diff --name-only` des six branches VIT ouvertes : aucune ne touche `vitrine/package*.json`, les flux ou le fichier d'exceptions. `scripts/audit.mjs` lu : il lance déjà `npm audit --omit=dev --json` et choisit les exceptions par dossier.
- Aucun code touché, donc aucune suite lancée.

## Reste à faire, dans l'ordre

1. Le chef : les commandes de la fiche de 8 h, **sauf le visa de #261, déjà écrit** ; dire à Codex et à l'agent de Cursor « lis ta boîte » ; ouvrir la session d'ADM-02 ; transmettre à Alexis ses cinq messages.
2. Codex : VIT-20d phase (b), puis VIT-21, VIT-20f, le correctif `useEffect`, QJE-03, l'étude des parcours.
3. Agent de Cursor : plan court de Q-37 (au coordinateur), puis, le 27 nov., le § 7 de `fix-audit-vitrine`.
4. Coordinateur : valider le plan de Q-37 et le § 7 ; relire ADM-02a quand la migration 0088 sera écrite ; relire #265, #230, #229, #269, #270 quand Alexis les aura corrigées.

## Commandes pour le chef de projet

Celles de la fiche de 8 h (`2026-11-26-doc-coordination-2026-11-26-suite.md`), sans la première ligne (le visa est fait). Le push de la branche emporte aussi les commits de cette session.

## Prompt de reprise

```text
Tu es le coordinateur de Planner (désigné par le chef). Lis AGENTS.md, le skill coordination,
docs/plan/README.md, docs/plan/suivi.md et docs/plan/decisions.md sur main (après la fusion de
doc/coordination-2026-11-26-suite, sinon sur cette branche), puis les deux fiches du 26 nov. de cette branche
(docs/sessions/2026-11-26-doc-coordination-2026-11-26-suite.md et …-suite-2.md).
Chantiers : EXP, PLA, ADM, et VSC par exception.
Avant tout tour d'état : PR ouvertes, branches de coordination non fusionnées, boîtes
(..\travaux-planner\boites\codex, cursor, alexis : entree et sortie).
Reste : suivre Codex (VIT-20d phase b, visa écrit sur #261 le 26 nov. ; puis VIT-21, VIT-20f, useEffect, QJE-03,
étude des parcours) ; valider le plan court de Q-37 puis le § 7 de fix-audit-vitrine (agent de Cursor, le 27 nov.) ;
relire ADM-02a quand la migration 0088 sera écrite ; relire #265, #230, #229, #269 et #270 quand Alexis
les aura corrigées ; QUA-02 suit chez Alexis.
Rappels : recharger le PATH pour gh ; ne jamais relancer un ancien passage de CI de main pendant qu'un plus
récent tourne ; jamais de git push ; fiche de session en fin de session.
```
