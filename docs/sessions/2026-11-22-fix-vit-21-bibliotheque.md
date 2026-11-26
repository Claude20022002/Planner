# Session du 2026-11-22 · VIT-21 · `fix/vit-21-bibliotheque`

| | |
|---|---|
| Fait par | Claude Code (Sonnet 5.5), agent autonome |
| Chantier | VIT |
| Dossier de travail | dépôt principal |
| Dernier commit | le dernier de la branche (voir la PR) |

## Objectif de la session

Phase (a) : recenser toutes les phrases du site et de la vidéo qui présentent la Bibliothèque comme disponible ou nomment StudyLib, et proposer pour chacune
de la retirer ou de la réécrire sans la Bibliothèque. La phase (b) attend le visa du chef.

## Plan

[vit-21-bibliotheque.md](../conception/vitrine/vit-21-bibliotheque.md) (à viser) : 19 phrases du site, 7 de la vidéo, ce qui reste volontairement, six questions.

## Fait

- Recherche de `biblioth`, `library`, `studylib` dans `vitrine/src` et `docs/presentation/video/src/accueil`, relecture des phrases équivalentes sans le mot.
- Le document, avec texte actuel (extrait des fichiers par script, non recopié) et proposition en français et en anglais pour chaque ligne. Aucun code.

## Vérifié

- Les textes « actuels » du tableau sont lus dans les JSON ; les propositions de réécriture sont le texte actuel moins le fragment sur la Bibliothèque (vérifié pour les phrases longues).
- Aucun contrôle de code (aucun code changé).

## Choix faits sans le chef

| Question | Option retenue | Autre option | Fichier touché |
|---|---|---|---|
| Phrase qui ne tient pas sans la Bibliothèque | la retirer (carte, ligne « avant/avec », question de FAQ) | la réécrire (texte nouveau) | `vit-21-bibliotheque.md` |
| FAQ StudyLib | retirer la question | la remplacer par une question sur les modules (propose une vente) | idem |
| « Bibliothèque des jeux » | gardée, nom signalé comme source de confusion | renommer | idem |
| Clés mortes (pages supprimées par VIT-20) | proposer de les supprimer | les laisser | idem |
| `commun.json` · `navigation.bibliotheque` | non touchée (conflit avec #223) | la supprimer | idem |

## État laissé

- VIT-21 → phase (a) faite, en attente du visa du chef.

## Reste à faire, dans l'ordre

1. Visa du chef. 2. Phase (b) : appliquer les phrases visées, adapter les scènes de la vidéo, `npm run render:accueil`, test `bibliotheque.test.js`.

## Prompt de reprise

```text
Tu reprends VIT-21 (la Bibliothèque est « Bientôt »), branche fix/vit-21-bibliotheque. Lis AGENTS.md, docs/conception/vitrine/vit-21-bibliotheque.md,
docs/conception/vitrine/vit-08-video-presentation.md et cette fiche, puis le visa du chef : gh pr view <n> --comments. Pas de visa : pas de code.
Phase (b) : appliquer exactement les phrases visées, scènes de la vidéo, rendu (npm run render:accueil), empreinte, test d'absence.
Règles : aucun texte nouveau ; ne pousser que cette branche ; suivi.md et decisions.md non modifiés.
```
