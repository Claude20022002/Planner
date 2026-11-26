# Mission · correctif · audit des dépendances du site vitrine et montée d'Astro (point 4 du plan d'audit)

| | |
|---|---|
| État | ouverte |
| Agent | agent de Cursor |
| Modèle recommandé | un modèle moyen : montée de correctifs à l'intérieur d'Astro 7 (pas de version majeure), plan déjà validé, contrôles du site existants |
| Attribuée le | 2026-11-26, par le coordinateur ; accord du chef : plan validé le 2026-11-18 (« Je valide ton plan », question 2 : attendre le 27 nov.) ; agent de Cursor pour `vitrine/` dans `suivi.md` |
| Module et chantier | [EXP](../modules/EXP-exploitation.md) · suite du correctif d'audit (#198, fusionnée le 18 nov.) |
| Fonction | correctif : le site vitrine passe sous `scripts/audit.mjs` comme `backend/`, avec Astro et `@astrojs/react` montés aux versions qui ont deux semaines · taille S |
| Branche | `fix/audit-vitrine`, depuis `origin/main`, **pas avant le 27 novembre 2026** |
| Dossier de travail | `..\travaux-planner\fix-audit-vitrine` |
| Plan de conception | [fix-audit-dependances.md](../../conception/exploitation/fix-audit-dependances.md), § 2 point 4 et § 6 · validé par le chef le 18 nov. ; l'agent y ajoute un § 7 court « Exécution du 27 nov. », validé par le coordinateur avant le code |

## Pourquoi un § 7

Le plan date du 18 nov. Depuis, `.github/workflows/vitrine.yml` et `vitrine/package-lock.json` sont sur `main` (#195), et le site est en `astro` 7.4.5 et `@astrojs/react` 7.1.2. Le flux appelle encore `npm audit --omit=dev --audit-level=high`, alors que `scripts/audit.mjs` lance déjà `npm audit --omit=dev --json` et lit `deploy/audit-exceptions.json`. Le § 7 dit ce que l'agent a mesuré le jour même et ce qu'il change.

## Critère de « terminé »

- `astro` et `@astrojs/react` sont à la **dernière version 7.x publiée depuis au moins 14 jours** le jour du travail (au moins 7.4.12 et 7.1.9) ; jamais une version 8. La date de publication de chacune est relevée (`npm view <paquet> time --json`) et écrite dans le § 7.
- Le pas « Audit des dépendances livrées » de `vitrine.yml` appelle `node ../scripts/audit.mjs vitrine` à la place de `npm audit --omit=dev --audit-level=high`.
- `deploy/audit-exceptions.json` : une exception `vitrine` seulement pour une faille haute **qui reste après la montée et sans version corrigée** (picomatch, GHSA-fc5q-39xc-vjpf, si elle apparaît dans l'arbre livré), avec sa raison propre au site, sa revue au jour du travail et son expiration au 18 déc. 2026 (même revue que `backend/`). Aucune autre exception sans accord (question 3).
- Contrôles du site verts en local, chiffres dans la fiche de session : `npm ci`, `npm test`, `npm run build` (nombre de pages, poids de l'accueil comparé à `main`), `node ../scripts/audit.mjs vitrine`, `node ../scripts/verifier-neutre.mjs`.
- Test du correctif : avec l'exception de picomatch retirée (si elle existe), `node ../scripts/audit.mjs vitrine` échoue ; le résultat est noté dans la fiche.
- La CI de la PR est verte (flux du site compris : image Nginx, contrôle EP-19).

## Périmètre d'écriture

L'agent peut modifier :

- `vitrine/package.json` et `vitrine/package-lock.json` (les deux paquets nommés et ce que npm change avec eux, rien d'autre)
- `.github/workflows/vitrine.yml` : le seul pas d'audit
- `deploy/audit-exceptions.json` : des entrées `vitrine` seulement
- `docs/conception/exploitation/fix-audit-dependances.md` : le § 7 seulement
- le fichier du module EXP et sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `vitrine/src/` et `vitrine/nginx/` : pages tenues par les missions VIT ouvertes (#261, #262, #263 de Codex ; #223, #227) ; si la montée oblige à changer une page ou un composant, il s'arrête et le demande
- `scripts/audit.mjs` (le script sait déjà choisir les exceptions du dossier) ; s'il faut le changer, il s'arrête et le demande
- les entrées `backend` du fichier d'exceptions
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Exception écrite, datée, 30 jours au plus, vérifiée par la CI (chef, 18 nov., question 1 du plan).
- Attendre le 27 nov. pour monter Astro : règle des deux semaines (chef, 18 nov., question 2).
- `fix/audit-dependances` n'a traité que `backend/` ; le point 4 se fait sur une branche à part, après #195 (chef, 18 nov., § 6). #195 est fusionnée.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Quelle version prendre si une 7.x plus récente que 7.4.12 a plus de 14 jours ? | la plus récente qui a 14 jours, jamais une 8 | coordinateur |
| 2 | L'audit du site ne regarde que les dépendances livrées (`--omit=dev`, comme `backend/`) ? | oui, le script le fait déjà ; le § 7 donne aussi le résultat de `npm audit` complet, pour mémoire | coordinateur |
| 3 | Une faille haute reste après la montée, autre que picomatch | l'agent s'arrête et dépose un rapport : toute exception nouvelle va au chef (sécurité) | chef |
| 4 | La montée change le rendu ou le poids d'une page (plus de 1 Ko sur l'accueil, ou un test de rendu rouge) | l'agent s'arrête et dépose un rapport avant de toucher à une page | coordinateur |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : le correctif d'audit du site vitrine et la montée d'Astro (point 4 du plan
d'audit), module EXP. À faire le 27 novembre 2026 ou après, pas avant.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/fix-audit-vitrine.md
et le plan docs/conception/exploitation/fix-audit-dependances.md (validé par le chef le 18 nov.).
Branche : fix/audit-vitrine, depuis origin/main, dans le dossier ..\travaux-planner\fix-audit-vitrine.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Avant le code : mesure (versions et dates de publication, npm audit du site), écris le § 7 « Exécution du 27 nov. »
du plan avec tes réponses aux questions 1 et 2, commite-le seul et dépose ton rapport dans sortie/ pour validation.
Règles : pas de code avant le § 7 validé ; questions avant toute supposition ; fiche de session à jour en fin de
session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-26 | fiche écrite ; aucune branche ouverte ne touche `vitrine/package*.json`, `vitrine.yml` ni le fichier d'exceptions | — |
