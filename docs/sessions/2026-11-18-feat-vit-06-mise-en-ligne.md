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

Le commit `56e3b38c` consigne la validation et nomme les secrets GitHub Actions ainsi que les variables du fichier privé du serveur.

À 17 h 45, le chef a ajouté les illustrations VIT-09 sur toutes les pages comme septième condition.
Le plan précise le cache des captures Astro (AVIF ou WebP), la directive CSP et la recette par page.
Ce complément est arrivé après le premier rapport de validation et figure dans le commit suivant.

À 18 h 35, le chef a ajouté VIT-10 (pages par rôle, menu « Solutions » ouvrant, pied de page complet)
et VIT-11 (catalogue des fonctionnalités et FAQ). Le plan et sa recette couvrent neuf conditions.
Le visa du plan reste acquis. La PR #212 est déjà ouverte.

## Pour le chef

Publier le complément depuis le dépôt principal sur la PR #212.

~~~powershell
git -C "..\travaux-planner\vit-06-mise-en-ligne" push -u origin feat/vit-06-mise-en-ligne
~~~

## Prompt de reprise

Reprendre VIT-06 en fin de file, une fois les neuf conditions vérifiées. Le plan validé
est sur feat/vit-06-mise-en-ligne. Lire AGENTS.md, la fiche de mission et la boîte Codex.
Le chef configure les secrets et le fichier privé. Lui seul publie et lance les commandes du serveur.
