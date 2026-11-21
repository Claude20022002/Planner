# Session du 2026-11-18 · UIX-06b · Accessibilité en CI

Branche `feat/uix-06b-referentiel`, dossier `..\travaux-planner\uix-06b-referentiel`. Agent Codex.

## Fait

- `d941a896` enregistre l’autorisation du chef pour axe-core comme dépendance de test, dans la [conception](../conception/interface/uix-06b-referentiel.md).
- `c66967d5` verrouille axe-core 4.10.3 dans le frontend, la version utilisée pour la recette du pilote Personnes. Les quatre fichiers de parcours déclenchent 11 audits WCAG 2.0 et 2.1 A/AA sur le contenu principal et les dialogues ciblés. Les scénarios passent par 390 et 1 280 px, le français et l’anglais, les thèmes clair et sombre, le détail d’un groupe et d’un module et la sélection d’un enseignement.
- La CI des parcours installe la dépendance par `npm ci`. L’inventaire et le build de l’application sont consignés dans la [fiche R1](2026-11-18-feat-uix-06b-referentiel-3.md).

## Vérifié

- L’empreinte du paquet téléchargé correspond au verrou npm. Dans Chromium sans serveur, le moteur passe sur une page témoin et détecte un bouton privé de son nom accessible.
- Playwright découvre les 12 parcours dans les quatre fichiers. La CI doit exécuter les parcours et leurs audits sur l’application.
- Lint : 0 erreur et 17 avertissements hors du lot. Tests unitaires : 71 sur 71. Neutralité et `git diff --check` réussis. Le build de l’application a réussi à R1 et le lot axe-core touche les tests et leur manifeste.

## Commandes pour le chef après relecture

~~~powershell
git -C "..\travaux-planner\uix-06b-referentiel" push -u origin feat/uix-06b-referentiel
gh pr create --base main --head feat/uix-06b-referentiel --title "UIX-06b : référentiel pédagogique" --fill
~~~

## Prompt de reprise

~~~text
Pour relire UIX-06b, ouvre feat/uix-06b-referentiel dans ..\travaux-planner\uix-06b-referentiel.
Lis AGENTS.md, ta boîte et les fiches R1 et Accessibilité. Le code produit est dans 2feca82e.
Les audits axe-core des quatre écrans sont intégrés dans c66967d5. Vérifie les résultats CI
des 12 parcours et des audits après ouverture de la PR par le chef.
Pour la prochaine fonction, ouvre une nouvelle session UIX-09 et lis la fiche vit-equipe.md
dans ..\travaux-planner\coordination-equipe. Suis le prompt Codex et le plan validé.
~~~
