# Session du 2026-11-21 (3) · UIX-11, réponses 9 et 10 · `feat/uix-11-tableau-de-bord`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session de VS Code, pendant la fin d'UIX-06c (fiche `2026-11-21-feat-uix-06c-ressources-temps-2.md`, autre branche) |
| PR | #240, CI entièrement verte avant ce commit ; **aucune relecture** du coordinateur au moment de la clôture |
| Dossier de travail | `..\travaux-planner\uix-11-tableau-de-bord` |
| Dernier commit | voir `git log -1` (cette fiche) ; code : `22275b0f` |

## Réponses du chef (21 nov., coordinateur absent de la liste des sessions)

| N° | Question | Réponse |
|---|---|---|
| 9 | « Tout voir » du volet de l'usage menait à Suivi, onglet Avancement | **autorisé** : `Suivi.jsx` lit `?onglet=usage` |
| 10 | épreuves annulées exclues de « À venir », séances annulées exclues du volet, période en cours « sinon aucune » | **validé** |

Inscrites au § 3 du [plan](../conception/interface/uix-11-tableau-de-bord.md). Pour le coordinateur : les reporter dans `decisions.md`.

## Fait

| Commit | Contenu |
|---|---|
| `22275b0f` | `Suivi.jsx` : `ONGLETS_ADRESSE = { heures: 1, usage: 2 }`, lu pour l'administration seulement (inchangé pour `heures`) ; `lignesDuVolet.js` : « Tout voir » de l'usage vers `/gestion/suivi?onglet=usage` ; test unitaire de régression (tout onglet demandé par un « Tout voir » est lu par Suivi) ; parcours du tableau de bord : un test de plus ; réponses 9 et 10 au plan |
| (ce commit) | cette fiche |

## Vérifié

- **Tests unitaires** : 131 sur 131. Sans la ligne de `Suivi.jsx`, deux tests échouent (`heuresMois` et `usage`) : le test protège bien les deux onglets.
- **Lint** : aucun avertissement sur les fichiers touchés.
- **Parcours** `tableauDeBord.spec.cjs` : 7 sur 7 au second passage. Au premier passage, le premier test avait dépassé 30 s sur `page.goto` : démarrage à froid de cette machine, déjà constaté (`personnes.spec.cjs`) ; il passe en 8,8 s au second.

## Reste à faire

1. Push par le chef (la PR #240 se met à jour) ; CI.
2. Corriger ce que demandera la relecture du coordinateur.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\uix-11-tableau-de-bord" push
```

## Prompt de reprise

Celui de la fiche `docs/sessions/2026-11-21-feat-uix-06c-ressources-temps-2.md` (branche `feat/uix-06c-ressources-temps`), qui suit les deux branches.
