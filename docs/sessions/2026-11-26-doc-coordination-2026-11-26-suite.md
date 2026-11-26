# Session du 2026-11-26 · coordination · `doc/coordination-2026-11-26-suite`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur désigné par le chef |
| Chantiers | EXP, PLA, ADM, et VSC par exception |
| Dossier de travail | `..\travaux-planner\coordination-2026-11-26-suite` |
| Dernier commit | le commit de cette fiche |

## Objectif de la session

Suite de la coordination du 26 nov. (#211, #256, #271, #272, #273 fusionnées ; CI de `main` verte) : file de Codex,
étapes des 21 fonctions « à placer » de la parité, relectures, attributions (QUA-02, correctif Q-37), #231, lucide-react.

## Tour d'état (8 h UTC)

- `main` = `0ecc0b06`. PR ouvertes : #270, #269, #265, #263, #262, #261, #231, #230, #229, #227, #215, #194, #168, #164, #53.
- **Inchangées depuis le dernier tour** : #265 (25 nov.), #230 et #229 (22 nov.) : Alexis n'a pas encore corrigé ; ses
  quatre messages du 22 au 26 nov. sont toujours dans `alexis/entree/` (non transmis ou non lus).
- **Codex** : VIT-22 phase b faite et poussée (#263, `4ef37021`, CI verte) ; lignes S1 à S3 de VIT-20d proposées
  (`cafbf767`, poussée sur #261 à `fbc2ec52`) ; #261 en conflit avec `main` (pas de CI). N° 2 à 4 de sa file pas commencés.
- **Agent de Cursor** : M-9 fusionnée (#272). Libre.

## Fait

- Commit de coordination (ce dossier) :
  - **les 21 fonctions de la parité placées** (décision du chef) : README § 2, treize fichiers de module (étape, et trois
    dépendances : VSC-11, EDT-06, QJE-10), 21 lignes ajoutées au tableau des fonctions de `suivi.md` ;
  - `suivi.md` : chantier VSC (#270), M-9 fusionnée, #231 à fermer, suite de VIT-20, QUA-02 attribuée, deux lignes
    nouvelles (correctif Q-37, `chore/lucide-react-mineures`), migration 0064 confirmée ;
  - `decisions.md` : cinq décisions du chef et trois verdicts du coordinateur ;
  - deux fiches de mission : `fix-neutralite-env-example.md` (agent de Cursor), `qua-02.md` (Alexis) ; lignes de suivi
    ajoutées à `vit-20-equipe.md` et `ep18-correctifs.md`.
- **Relectures** : #263 (VIT-22) **prête** ; `chore/lucide-react-mineures` (`5b9f307d`) **prête pour la PR** ;
  #270 : relecture de sécurité, **à corriger** (CI : libellé « Identifiant » dans cinq parcours ; collision identifiant
  et adresse ; import selon Q-8 et Q-2 ; import sorti du contrôleur), conditions fixées par le chef.
- **Boîtes** (hors dépôt) : consigne à Codex (VIT-22 prête ; VIT-20d visée, à vérifier sur la PR, `git merge
  origin/main` d'abord), mission à l'agent de Cursor (Q-37), consigne à Alexis (#270 et QUA-02). Huit rapports rangés
  dans `sortie/traites/` (Codex : 3, Cursor : 6, dont deux arrivés pendant la session, lus après coup).

## Vérifié

- `git diff` des fichiers de module : 21 lignes changées, une par fonction ; le script de placement s'arrêtait sur
  toute étape ou dépendance inattendue.
- Diff de #263 lu en entier ; CI de #263 verte (dix contrôles). Cru sur parole : 155 tests unitaires, 32 tests de
  rendu, poids 118,0 Ko.
- #270 : journal du passage 45673302773 lu (tous les parcours qui se connectent échouent) ; diff du serveur lu
  (connexion, réinitialisation, limiteur, MFA, OIDC, migration, comptes). Aucun test lancé.
- `chore/lucide-react-mineures` : `git merge-tree` avec `origin/main` sans conflit.
- Aucun code touché, donc aucune suite lancée.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 | Étapes des 21 fonctions de la parité | proposition acceptée | réglée (chef) |
| 2 | Visa de S1 à S3 (VIT-20d) | visées ; le chef l'écrit sur #261 | réglée (chef) |
| 3 | QUA-02 et correctif Q-37 | Alexis ; agent de Cursor | réglée (chef) |
| 4 | Conditions de fusion de #270 | points 1, 2 et 4 ; le 3 pour PLA-04 | réglée (chef) |

## Reste à faire, dans l'ordre

1. Le chef : visa de #261 en commentaire, fusion de #263, PR de `chore/lucide-react-mineures`, fermeture de #231,
   push de cette branche (commandes ci-dessous) ; transmettre à Alexis les cinq messages de sa boîte.
2. Codex : VIT-20d phase b, puis VIT-21, VIT-20f, puis les n° 2 à 4 de sa file.
3. Agent de Cursor : plan court du correctif Q-37, à valider par le coordinateur.
4. Relectures à venir : #265, #230, #229, #269, #270 quand Alexis les aura corrigées ; plan court de Q-37.

## Commandes pour le chef de projet

```powershell
gh pr comment 261 --body "Visé : lignes S1, S2 et S3 du § 5.3 (cafbf767)."
gh pr checks 263 && gh pr merge 263 --merge
git push -u origin chore/lucide-react-mineures
gh pr create --base main --head chore/lucide-react-mineures --title "UIX : lucide-react accepte les versions mineures (^1.68.0)" --body "Commit du chef 5b9f307d, passé sur une branche (décision du 25 nov.). Le verrou garde 1.68.0. Relu par le coordinateur le 26 nov. : prêt."
gh pr close 231 --comment "Répondue le 21 nov. (EDT-04 après #229 et #230 ; QUA-01)."
git -C "..\travaux-planner\coordination-2026-11-26-suite" push -u origin doc/coordination-2026-11-26-suite
gh pr create --base main --head doc/coordination-2026-11-26-suite --title "Coordination du 26 nov. (suite) : parité placée, relectures, attributions" --fill
git pull --ff-only
```

La dernière ligne remet à jour le `main` local du dépôt principal (151 commits de retard, aucun commit local).

## Prompt de reprise

```text
Tu es le coordinateur de Planner (désigné par le chef). Lis AGENTS.md, le skill coordination,
docs/plan/README.md, docs/plan/suivi.md et docs/plan/decisions.md sur main (après la fusion de
doc/coordination-2026-11-26-suite, sinon sur cette branche), puis cette fiche
(docs/sessions/2026-11-26-doc-coordination-2026-11-26-suite.md).
Chantiers : EXP, PLA, ADM, et VSC par exception. Les 21 fonctions de la parité sont placées (26 nov.).
Avant tout tour d'état : PR ouvertes, branches de coordination non fusionnées, boîtes
(..\travaux-planner\boites\codex, cursor, alexis : entree et sortie).
Reste : suivre Codex (VIT-20d phase b après le visa écrit sur #261, puis VIT-21, VIT-20f, n° 2 à 4) ;
valider le plan court du correctif Q-37 (agent de Cursor) ; relire #265, #230, #229, #269 et #270 quand
Alexis les aura corrigées (conditions de #270 dans decisions.md, 26 nov.) ; QUA-02 suit chez Alexis.
Rappels : recharger le PATH pour gh ; ne jamais relancer un ancien passage de CI de main pendant qu'un plus
récent tourne ; jamais de git push ; fiche de session en fin de session.
```
