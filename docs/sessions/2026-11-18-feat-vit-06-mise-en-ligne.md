# Session du 18 novembre 2026 · VIT-06 · Plan de mise en ligne

Branche `feat/vit-06-mise-en-ligne`, dossier `..\travaux-planner\vit-06-mise-en-ligne`, agent Codex.

## Travail remis

Le plan court est dans le commit local `8b49b9aa`, seul fichier du commit. Le point de départ est
`db0e3de7`, qui contient la fusion de #199 et la feuille de route du coordinateur.
Le chef a retenu Docker Hub (`claude20022002/planner-vitrine`, une version par commit).
L’équipe prépare les mentions légales et la page de confidentialité, puis le chef valide les deux textes.
Le chef a validé `vitrine.finadmintech.fr` pour la vitrine en attendant l’achat du domaine officiel.
Le 18 novembre, Google Public DNS et Cloudflare ont tous deux renvoyé l’adresse IPv4 du serveur Debian indiquée par le chef pour cet hôte. L’application utilise l’hôte prévu par le guide,
`planner.finadmintech.fr`. Les trois décisions sont consignées. Le chef a validé le plan complet le 18 novembre vers 17 h 15. Le coordinateur a transmis son accord dans la boîte Codex.

Les contrôles de conception ont porté sur le Compose du VPS, le workflow vitrine, le registre du workflow
de publication, les scripts d’exploitation et le HTML produit par les gabarits. Les liens locaux du plan
et le diff Git ont été vérifiés. Les commandes de recette sont destinées à l’étape de déploiement.

La consigne de 15 h 45 porte à six les conditions de mise en ligne. Le plan ajoute la livraison du
contenu de VIT-07 et de la vidéo d’accueil VIT-08, ainsi que les contrôles de lecture, de CSP et de cache.

Le commit `56e3b38c` consigne la validation et nomme les secrets GitHub Actions ainsi que les variables du fichier privé du serveur. Les commandes de déploiement attendent les six conditions.

## Pour le chef

Publier la branche depuis le dépôt principal puis ouvrir la PR de conception.

~~~powershell
git -C "..\travaux-planner\vit-06-mise-en-ligne" push -u origin feat/vit-06-mise-en-ligne
gh pr create --base main --head feat/vit-06-mise-en-ligne --title "VIT-06 · Plan de mise en ligne de la vitrine" --body "Plan de conception et fiche de session."
~~~

## Prompt de reprise

Reprendre VIT-06 en fin de file, une fois les six conditions vérifiées. Le plan validé
est sur feat/vit-06-mise-en-ligne. Lire AGENTS.md, la fiche de mission et la boîte Codex.
Le chef configure les secrets et le fichier privé. Lui seul publie et lance les commandes du serveur.
