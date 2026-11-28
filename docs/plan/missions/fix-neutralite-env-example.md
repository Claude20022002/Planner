# Mission · correctif de neutralité · `backend/.env.example` (Q-37)

| | |
|---|---|
| État | close le 2026-11-26 (PR fusionnée) |
| Agent | agent de Cursor |
| Modèle recommandé | un modèle moyen : correctif court, deux lignes de texte et un ajout à un script de contrôle |
| Attribuée le | 2026-11-26, par le coordinateur ; accord du chef : oui, le 2026-11-26 |
| Module et chantier | [QUA](../modules/QUA-qualite-docs.md) · correctif hors chantier, suite de QUA-01 (réponse du chef à Q-37) |
| Fonction | correctif : le fichier d'exemple de configuration du serveur ne nomme plus l'école pilote · taille S |
| Branche | `fix/neutralite-env-example`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\fix-neutralite-env-example` |
| Plan de conception | à écrire (plan court) · validé par le coordinateur |

## Critère de « terminé »

- `backend/.env.example` ne contient plus « HESTIM » ni « hestim.ma » hors des identifiants techniques en minuscules (`DB_NAME=hestim_planner`, `hestim-solver.jar` restent : ils sont figés et ne s'affichent pas, comme le dit `scripts/verifier-neutre.mjs`).
- Aujourd'hui, deux lignes : l. 67, `EMAIL_FROM="HESTIM Planner <votre-email@gmail.com>"` ; l. 18, le commentaire `(ex: https://planner.hestim.ma)`.
- **Test du correctif** : `node scripts/verifier-neutre.mjs` lit aussi `backend/.env.example`, et échoue si l'on y remet « HESTIM Planner ». Dans ce fichier, une ligne qui commence par `#` est un commentaire : le plan dit si le commentaire est cherché quand même (proposition : oui pour ce fichier, puisqu'il est copié tel quel chez chaque école).
- La CI de la PR est verte.

## Périmètre d'écriture

L'agent peut modifier :

- `backend/.env.example`
- `scripts/verifier-neutre.mjs`
- `docs/conception/qualite/fix-neutralite-env-example.md` (le plan court)
- le fichier du module QUA et sa fiche de session (pas `docs/plan/suivi.md` : le coordinateur le tient)

L'agent ne touche pas :

- `docker-compose.yml`, `README.md`, `DEPLOIEMENT.md` : s'ils nomment aussi l'école pilote, il le signale dans sa fiche, sans les corriger
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Réponse du chef à Q-37 (QUA-01, 25 nov.) : le nom d'école de `backend/.env.example` (`EMAIL_FROM`) sort du lot QUA-01 ; un correctif de neutralité s'ouvre à part.
- Attribution à l'agent de Cursor : choix du chef, 26 nov.
- L'expéditeur réel est réglé par l'exploitant ; le nom affiché vient de l'identité de l'école (`backend/utils/sendEmail.js`, l. 91). L'exemple doit donc montrer un nom neutre (proposition : `Planner`) et une adresse d'exemple.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Quelle adresse dans l'exemple ? | `"Planner <votre-email@example.com>"` (domaine réservé aux exemples) ; garder Gmail dans le commentaire qui explique le mot de passe d'application | coordinateur |
| 2 | Le commentaire de la l. 18 ? | `(ex: https://planner.votre-ecole.example)` | coordinateur |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : le correctif de neutralité de backend/.env.example (Q-37), module QUA.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/fix-neutralite-env-example.md.
Branche : fix/neutralite-env-example, depuis origin/main, dans le dossier ..\travaux-planner\fix-neutralite-env-example.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris un plan court (docs/plan/modeles/conception.md, version courte), réponds aux deux questions
de la fiche ou propose autre chose, commite le plan seul et dépose ton rapport dans sortie/ pour validation.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; un test qui fige le correctif
(verifier-neutre lit le fichier) ; fiche de session à jour en fin de session, suivi.md non modifié ;
tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-26 | fiche écrite, prompt déposé dans la boîte de l'agent de Cursor | — |
| 2026-11-26 9 h 10 | plan court (`481f5ae3`) relu : propositions de la fiche, périmètre tenu, aucun code | **plan validé** (coordinateur) |
| 2026-11-26 9 h 30 | code (`ac77190f`) et fiche (`ecd9d20c`) relus ; `verifier-neutre` relancé (0) ; échec avec l'ancien texte montré par l'agent | **prête pour la PR** |
