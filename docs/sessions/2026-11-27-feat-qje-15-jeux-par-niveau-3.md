# Session du 2026-11-27 · QJE-15 · `feat/qje-15-jeux-par-niveau`

| | |
|---|---|
| Fait par | agent de Cursor (Grok 4.7) |
| Chantier | exception hors chantier |
| Dossier de travail | `..\travaux-planner\qje-15-jeux-par-niveau` |
| Dernier commit | l'amendement de cette session ; plan de fond `5cb58101` |

## Objectif de la session

Lire la boîte. Écrire l'amendement visé par le chef : cycles, tableau, `domaine`, QJE-17, présentation. Aucun code.

## Plan

[docs/conception/jeux/qje-15-jeux-par-niveau.md](../conception/jeux/qje-15-jeux-par-niveau.md) · questions 1 et 2 visées. § 4 bis en attente du chef (accroches et voies d'image).

## Fait

- Messages lus : `2026-11-27-1457-qje-15-vise.md`, puis `2026-11-27-1524-images-banque-libre.md`.
- L'amendement : ligne « Validé », champ `domaine`, séparation en QJE-17, § 4 bis (image, format, carte, EP-19, EP-18, planche).
- La ligne QJE-15 du module, et cette fiche. `suivi.md` n'est pas modifié.

## Vérifié

Aucun test : documents seuls.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Quels cycles, et dans quel ordre ? | collège, lycée, supérieur, formation professionnelle | visée |
| 2 | Le classement des onze jeux | tableau du § 4, tel quel ; variantes écartées | visée |
| 3 | La monnaie | « crédits », M-11 fusionnée (#283) | réglée |
| 4 | Le numéro de la séparation | QJE-17. QJE-16 reste l'interrupteur de l'IA. | réglée |
| 5 | Les accroches | onze phrases FR et EN du § 4 bis | en attente du chef, sur la planche |
| 6 | La voie d'image | vue du jeu pour neuf jeux ; Codex pour Labo Big-O et Requête Parfaite. Banque libre ouverte s'il la choisit. | en attente du chef, sur la planche |

## État laissé

- État de la fonction, pour `suivi.md` (le coordinateur le reporte) : QJE-15 → plan visé et amendé ; catalogue `shared/` autorisé ; écrans après la planche et #229
- `fix-audit-vitrine` : § 7 déjà écrit (`48c1922a`), en attente du coordinateur

## Reste à faire, dans l'ordre

1. Le catalogue dans `shared/` : `cycles`, `domaine`, `rangerJeux`, test.
2. La planche hors dépôt, puis le visa des questions 5 et 6.
3. Les écrans, après ce visa et après #229.
4. Le code de l'audit vitrine, après le visa du § 7.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\qje-15-jeux-par-niveau" push
```

La PR #285 est ouverte. Ce push envoie l'amendement.

## Prompt de reprise

```text
Tu reprends QJE-15 (jeux par niveau, puis par domaine), sur la branche
feat/qje-15-jeux-par-niveau, dans le dossier ..\travaux-planner\qje-15-jeux-par-niveau.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
la conception docs/conception/jeux/qje-15-jeux-par-niveau.md
et cette fiche (docs/sessions/2026-11-27-feat-qje-15-jeux-par-niveau-3.md).
Fait : le chef a visé les quatre cycles et le tableau tel quel.
Le champ s'appelle domaine. La séparation est QJE-17.
Le § 4 bis propose les accroches et la voie d'image. Aucun code.
Reste : le catalogue shared (cycles, domaine, rangerJeux, test),
sans attendre #229. Puis la planche hors dépôt
(..\travaux-planner\qje-15-planche\, 390 et 1440 px, web, mobile, site).
Les écrans après le visa des questions 5 et 6 et après #229.
Questions en attente : 5 (accroches), 6 (voie d'image).
Règles : pas de code des écrans avant la planche ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; jamais de git push.
```
