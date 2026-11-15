# Mission · <IDENTIFIANT> · <nom de la fonction ou de l'étape>

<!-- Copier ce modèle dans docs/plan/missions/<identifiant en minuscules>.md.
     Écrite par le coordinateur (docs/plan/organisation.md, § 10). Une fiche par mission. -->

| | |
|---|---|
| État | <ouverte · en relecture · close le AAAA-MM-JJ> |
| Agent | <Claude (Cursor) · Claude (VS Code) · Codex (VS Code) · agent de Cursor> |
| Attribuée le | AAAA-MM-JJ, par le coordinateur ; accord du chef : <oui, le AAAA-MM-JJ> |
| Module et chantier | [<CODE>](../modules/<fichier>.md) · chantier ouvert le AAAA-MM-JJ |
| Fonction | <IDENTIFIANT> : <ce qu'elle fait, en une phrase> · taille <S, M, L, XL> |
| Branche | `<type>/<identifiant>-<mot>`, depuis `<origin/main ou une autre branche>` |
| Dossier de travail | `..\travaux-planner\<nom>` |
| Plan de conception | <lien, ou « à écrire »> · validé par <le chef · le coordinateur · en attente> |

## Critère de « terminé »

<!-- Recopié du fichier du module. -->

## Périmètre d'écriture

L'agent peut modifier :

- <dossier ou fichier>
- sa ligne de `docs/plan/suivi.md`, le fichier de son module, sa fiche de session

L'agent ne touche pas :

- <fichiers tenus par une autre mission ouverte, avec son identifiant>
- tout le reste : s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

<!-- Réponses du chef et décisions de decisions.md qui s'appliquent. Rien d'autre n'est acquis. -->

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : <IDENTIFIANT> (<nom>), chantier <CODE>.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/<fichier>.md.
Branche : <branche>, dans le dossier ..\travaux-planner\<nom>.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
<Plan validé : chemin. | Aucun plan : pose tes questions, écris le plan, fais-le valider.>
Règles : pas de code avant le plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
