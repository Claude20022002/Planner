# Session du 2026-11-17 · Plan : parité avec OpenEduCat · `doc/plan-parite-openeducat`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5) |
| Chantier | aucun (hors chantier, décision du chef) |
| Dossier de travail | `..\travaux-planner\plan-parite-openeducat` |
| Dernier commit | voir `git log` de la branche (un commit, posé sur `etude/openeducat-etude-complete`) |

## Objectif de la session

Demande du chef : ajouter au plan des modules tout ce qu'OpenEduCat a et que Planner n'a pas, « et bien plus », en français, anglais et arabe, et « que ça fonctionne beaucoup mieux ».

## Plan

Changement du plan, sans code. Quatre questions posées au chef avant d'écrire, toutes tranchées le 17 nov. (tableau ci-dessous). Puis :
1. une table de correspondance, `docs/plan/parite-openeducat.md` ;
2. les fonctions nouvelles dans chaque fichier de module, avec leurs critères de « terminé » ;
3. les lignes de `suivi.md`, le README du plan (§ 2 et § 6), et une section datée dans `decisions.md`.

## Fait

- `docs/plan/parite-openeducat.md` : correspondance de 45 domaines, changements, exigences EP-14 à EP-17, ordre conseillé dans l'étape 5.
- 31 fonctions nouvelles dans 15 modules : VSC-07 à VSC-12, COU-10 à COU-13, QJE-10 à QJE-13, BIB-05, SER-02, SER-03, EDT-06, EDT-07, INS-04, COM-04, COM-05, ADM-10, PIL-03, FIN-04, FIN-05, RHP-04, STA-03, MOB-09, UIX-07, UIX-08.
- Reprises en étape 5 : SER-01, STK-01, PIL-01, PIL-02, STA-02.
- README du plan : ligne du document, paragraphe sous le tableau des étapes (les lignes du tableau ne sont pas touchées, pour éviter les conflits avec #186 et #189), EP-11 trilingue, EP-14 à EP-17.
- `decisions.md` : section « Décision du chef du 17 novembre : parité avec OpenEduCat ».
- `03-propositions.md` : P-87, P-88 et P-89 mises à jour.
- `suivi.md` : 31 lignes de fonctions, 5 états changés, une ligne hors chantier.

Identifiants évités : FIN-03 (ancien nom de RHP-01), MOB-08 (pris par #189), EP-13 (pris par #186 et #189).

## Vérifié

- `node scripts/verifier-neutre.mjs` : aucun nom d'école en dur.
- Aucun identifiant nouveau n'existait déjà sur `main` ni sur les branches des PR ouvertes.
- Aucun code ni test touché.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Comptabilité générale et paie | export et échange relus, rien de construit (chef, 17 nov.) | tranchée |
| 2 | Santé et biométrie | santé facultative après dossier CNDP ; biométrie écartée (chef, 17 nov.) | tranchée |
| 3 | Place dans l'ordre | étape 5 et « libre », étapes 1 à 4 inchangées (chef, 17 nov.) | tranchée |
| 4 | Tuteur IA pour l'élève | conditionnel (chef, 17 nov.) | tranchée |
| 5 | Les exigences EP-14 à EP-17 conviennent-elles telles quelles ? | oui ; EP-15 rejoint PLA-04 | ouverte |
| 6 | Lesquels des deux logiciels comptables marocains retenir pour FIN-05 ? | à choisir aux entretiens de VEN-02 | ouverte |

## État laissé

- `docs/plan/suivi.md` : 31 fonctions inscrites (à faire, ou conditionnelles pour VSC-08 et QJE-13) ; SER-01, STK-01, PIL-01, PIL-02, STA-02 passées à « à faire ».
- Aucun chantier ouvert ni fermé.

## Reste à faire, dans l'ordre

1. Fusionner d'abord l'étude (`etude/openeducat-etude-complete`), puis cette branche.
2. Si #186 ou #189 fusionne avant : conflits simples dans `docs/plan/README.md` (garder EP-13 puis EP-14 à EP-17), `MOB-application.md` (garder MOB-08 puis MOB-09), `suivi.md` (garder toutes les lignes) et `docs/etude-marche/README.md` (garder les lignes du fichier 09 et du fichier 11). Vérifié par `git merge-tree` le 17 nov.
3. Répondre aux questions 5 et 6.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\etude-openeducat-complete" push -u origin etude/openeducat-etude-complete
gh pr create --base main --head etude/openeducat-etude-complete --title "Étude : OpenEduCat, étude complète et comparatif avec Planner" --fill
git -C "..\travaux-planner\plan-parite-openeducat" push -u origin doc/plan-parite-openeducat
gh pr create --base main --head doc/plan-parite-openeducat --title "Plan : parité avec OpenEduCat (31 fonctions, trois langues)" --fill
```

## Prompt de reprise

```text
Tu reprends le changement du plan « parité avec OpenEduCat », hors chantier, sur la branche
doc/plan-parite-openeducat, dans le dossier ..\travaux-planner\plan-parite-openeducat.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
docs/plan/parite-openeducat.md, la section du 17 novembre de docs/plan/decisions.md
et cette fiche (docs/sessions/2026-11-17-doc-plan-parite-openeducat.md).
Fait : 31 fonctions inscrites, 5 reprises, EP-14 à EP-17, langues FR, EN, AR.
Reste : fusion après l'étude (par le chef) ; conflits simples avec #186 et #189 ;
questions 5 et 6 de la fiche.
Règles : pas de code hors du plan validé ; questions avant toute supposition ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
