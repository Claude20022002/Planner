# Mission · correctif · `useEffect` de « Mes affectations »

| | |
|---|---|
| État | ouverte |
| Agent | Codex (VS Code) |
| Modèle recommandé | un modèle moyen suffit (correctif court, un fichier) ; Codex garde son réglage habituel s'il n'en change pas entre deux missions |
| Attribuée le | 2026-11-26, par le coordinateur ; accord du chef : oui, le 2026-11-26 |
| Module et chantier | [QUA](../modules/QUA-qualite-docs.md) · correctif hors chantier |
| Fonction | `frontend/src/pages/MesAffectations.jsx:28` : le `useEffect` appelle `loadAffectations` sans l'avoir dans ses dépendances (avertissement `react-hooks/exhaustive-deps` du lint de la CI) · taille S |
| Branche | `fix/mes-affectations-useeffect`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\mes-affectations-useeffect` |
| Plan de conception | plan court à écrire dans `docs/conception/qualite/fix-mes-affectations-useeffect.md` · à valider par le coordinateur (S, sans migration ni sécurité) |

## Critère de « terminé »

- Le lint ne signale plus d'avertissement sur `MesAffectations.jsx`.
- La page charge les affectations une fois à l'ouverture, et de nouveau quand ses critères changent, ni plus ni moins (pas de boucle de requêtes).
- Un test de régression le prouve : aucun bug n'est signalé aujourd'hui, le test fige le nombre d'appels.

## Périmètre d'écriture

L'agent peut modifier :

- `frontend/src/pages/MesAffectations.jsx` et un test à côté (`*.test.js`, `node --test`, comme les autres tests unitaires du site)
- `docs/conception/qualite/fix-mes-affectations-useeffect.md`, le fichier du module QUA et sa fiche de session (pas `docs/plan/suivi.md`)

L'agent ne touche pas :

- tout le reste ; s'il doit en sortir, il s'arrête et le demande

## Ce qui est déjà décidé

- Signalé par le lint de la CI le 26 nov. ; inscrit « à attribuer » dans `suivi.md` le même jour.
- Un test de régression par correctif (AGENTS.md, règle 8).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : correctif useEffect de MesAffectations.jsx (hors chantier).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/fix-mes-affectations-useeffect.md.
Branche : fix/mes-affectations-useeffect, depuis origin/main, dans le dossier ..\travaux-planner\mes-affectations-useeffect.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris le plan court, commite-le seul, dépose-le dans ta boîte de sortie pour validation.
Règles : pas de code avant le plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-26 | mission remise à Codex (boîte), n° 2 de sa file | — |
| 2026-11-26 9 h 30 | plan `09009354` relu : cause et test ciblé bons ; report à la microtâche et outillage de rendu écartés ; chargement à sortir dans `components/mesSeances/chargerSeances.js` (périmètre étendu) | **à corriger** |
| 2026-11-26 9 h 55 | plan révisé `8df4e90d` relu : conforme aux trois points de 9 h 32 | **plan validé** (coordinateur) |
| 2026-11-26 12 h 20 | code (`be2e7cd0`) relu : conforme au plan ; seule clé passée à `setError` | **prêt** (#278) |
