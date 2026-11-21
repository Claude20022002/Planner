# Session du 2026-11-18 · UIX-06b · Reprise de R1

Branche feat/uix-06b-referentiel, dossier ..\travaux-planner\uix-06b-referentiel. Agent Codex. R0 4963e827 vérifié par le coordinateur.

## Consigne reçue

À 02 h 12, le coordinateur transmet la décision du chef de confier les quatre écrans à Codex. Cursor passe au site vitrine. R1 se prépare sur la branche UIX-06b. UIX-09 suit le rapport de fin de cette fonction.

## Vérification

L’inventaire de Cursor et le code de référence (11329211:frontend/src/pages/gestion/Groupes.jsx) concordent. L’écran présente l’effectif et signale l’écart avec la somme des sous-groupes. Le détail des élèves affectés ne figure pas sur cet écran. La version R0 conserve ces informations et réserve la désactivation à l’administration.

Le § 2 de la [conception](../conception/interface/uix-06b-referentiel.md) est corrigé dans le commit local 8cc60692. Le suivi indique la validation attendue. Cette session a vérifié les sources et git diff --cached --check. Les contrôles produit exécutés à R0 sont consignés dans la fiche précédente.

## Question au chef

1. Valider la correction du § 2 avant R1 ? Proposition : conserver l’effectif et l’écart avec la somme des sous-groupes comme sur l’écran de référence.

## Prompt de reprise

~~~text
Reprends tout UIX-06b sur feat/uix-06b-referentiel dans ..\travaux-planner\uix-06b-referentiel.
Lis la boîte, cette fiche, la mission d’équipe et la conception. R0 vérifié : 4963e827.
Le § 2 Groupes a été corrigé à 8cc60692. Vérifie la validation de cette correction par le chef.
Après validation, livre les quatre écrans selon le § R1. Vérifie lint, unitaires, build et neutralité.
Les parcours métier et visuels sont exécutés en CI. Dépose le rapport de fin UIX-06b au coordinateur.
Reprends UIX-09 après ce rapport sur sa branche et selon sa fiche. Travaille localement.
~~~

## Commandes pour le chef après R1 et relecture

~~~powershell
git -C "..\travaux-planner\uix-06b-referentiel" push -u origin feat/uix-06b-referentiel
gh pr create --base main --head feat/uix-06b-referentiel --title "UIX-06b : référentiel pédagogique" --fill
~~~
