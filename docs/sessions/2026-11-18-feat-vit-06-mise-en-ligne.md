# Session du 18 novembre 2026 · VIT-06 · Plan de mise en ligne

Branche `feat/vit-06-mise-en-ligne`, dossier `..\travaux-planner\vit-06-mise-en-ligne`, agent Codex.

## Travail remis

Le plan court est dans le commit local `8b49b9aa`, seul fichier du commit. Le point de départ est
`db0e3de7`, qui contient la fusion de #199 et la feuille de route du coordinateur.
Le chef a retenu Docker Hub (`claude20022002/planner-vitrine`, une version par commit).
L’équipe prépare les mentions légales et la page de confidentialité, puis le chef valide les deux textes.
Le chef a validé `vitrine.finadmintech.fr` pour la vitrine en attendant l’achat du domaine officiel.
Il fera pointer cette entrée chez OVH vers le serveur Debian. L’application utilise l’hôte prévu par le guide,
`planner.finadmintech.fr`. Les trois décisions sont consignées. Le visa du plan complet reste en attente.

Les contrôles de conception ont porté sur le Compose du VPS, le workflow vitrine, le registre du workflow
de publication, les scripts d’exploitation et le HTML produit par les gabarits. Les liens locaux du plan
et le diff Git ont été vérifiés. Les commandes de recette sont destinées à l’étape de déploiement.

## Pour le chef

Après relecture et validation, publier la branche depuis le dépôt principal puis ouvrir la PR de conception.

~~~powershell
git -C "..\travaux-planner\vit-06-mise-en-ligne" push -u origin feat/vit-06-mise-en-ligne
gh pr create --base main --head feat/vit-06-mise-en-ligne --title "VIT-06 · Plan de mise en ligne de la vitrine" --body "Plan de conception et fiche de session."
~~~

## Prompt de reprise

Recueillir le visa du chef sur le plan VIT-06 et le reporter sur la branche.
Après validation, reprendre UIX-09 selon la feuille de route. Appliquer la consigne du 18 novembre à
12 h 11, archivée dans la boîte Codex. Le déploiement VIT-06 reste en fin de file et exige les quatre conditions.
