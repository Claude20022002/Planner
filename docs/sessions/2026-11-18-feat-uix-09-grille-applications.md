# Session du 2026-11-18 · UIX-09 · Grille d’applications

Branche `feat/uix-09-grille-applications`, dossier `..\travaux-planner\uix-09-grille`. Agent Codex.

## Fait

- Plan validé commité seul dans `f46b76a9`, depuis `origin/main` (`bb8973c1`).
- La grille présente les applications du catalogue existant. La recherche retrouve les applications et leurs rubriques.
- En-tête avec la marque du pilote et une salutation traduite. Le compte est accessible dans la barre existante.
- Tuiles de 96 à 120 px, focus clavier, icônes Lucide dans la grille et le menu, animations Motion désactivées en mode réduit.
- `lucide-react` épinglé à `1.68.0` (publié le 4 novembre). Les animations sont adaptées de lucide-animated
  (`0f9920917a5d45d1d263299d56f9015c69c21b70`) avec sa licence MIT dans le dossier des icônes.

## Vérifié

- Lint : 0 erreur, 20 avertissements hors du lot. Unitaires : 66 sur 66. Build et neutralité réussis.
- Chromium hors ligne, fichiers compilés et API fictive : 390 et 1 440 px, FR/EN, clair/sombre, trois rôles,
  ouverture au clavier, mouvement réduit et dimensions des tuiles. Axe-core 4.10.3 : aucune violation A/AA
  dans le contenu principal sur les quatre configurations.
- EP-17 : sept mesures par version, du clic Personnes à l’apparition du menu de destination.
  Médiane de 409 ms sur le lanceur précédent (build UIX-06b après fusion de `main`) et 392 ms sur UIX-09.
  Exécutions locales avec API fictive, hors mesures en production.
- Playwright collecte quatre parcours. Leur exécution avec le serveur et la base attend la CI.

## Décisions reçues à 12 h 05

- Le chef réserve la variante 4 au site vitrine. L’application garde la mosaïque et les tuiles Lucide.
- Le coordinateur confirme l’audit axe-core local, sans dépendance supplémentaire. Une fois la PR #199 fusionnée,
  intégrer main à cette branche puis ajouter cet audit au parcours avec la dépendance de main.
- Le coordinateur tient désormais le suivi. La branche a repris la version de suivi.md de origin/main (f28eff4e).

## Commandes pour le chef après relecture

~~~powershell
git -C "..\travaux-planner\uix-09-grille" push -u origin feat/uix-09-grille-applications
gh pr create --base main --head feat/uix-09-grille-applications --title "UIX-09 : grille d’applications" --fill
~~~

## Prompt de reprise

~~~text
Reprends UIX-09 sur feat/uix-09-grille-applications. Lis AGENTS.md, la boîte Codex et cette fiche.
Après la fusion de #199, intègre main et active axe-core dans le parcours. Fais relire la branche et contrôle la CI.
Respecte l’ordre de fusion avec #199. Travaille en local dans le périmètre UIX-09.
~~~
