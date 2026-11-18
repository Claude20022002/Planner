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

## Reprise du 18 novembre après la fusion de #199

- `origin/main` (`e82f0bf4`, qui inclut #199) intégré dans `c5ba3820`. La branche reprend son `suivi.md`.
- `npm install` a confirmé que le verrou ne diffère de `main` que pour Lucide `1.68.0`. Axe-core `4.10.3` vient de `main`.
- Le commit `2d7ebdd3` ajoute les contrôles WCAG A/AA dans le contenu principal sur ordinateur (administration, thème sombre, anglais) et téléphone (enseignant, français, mouvement réduit).
- 79 tests unitaires réussis. Lint sans erreur et 17 avertissements hors du lot. Build et neutralité réussis.
- Première exécution Playwright : les deux scénarios axe-core réussissent sans violation. Deux scénarios s’arrêtent au chargement de la connexion avec le délai de 30 s.
- Relance avec le cache Vite initialisé et `--timeout=90000` : 4 sur 4 sous Chromium, avec le backend et MySQL local jetable. Axe-core ne relève aucune violation A/AA dans les deux scénarios.
- La suite Playwright complète et la CI restent à exécuter.

## Commandes pour le chef après relecture

~~~powershell
git -C "..\travaux-planner\uix-09-grille" push -u origin feat/uix-09-grille-applications
gh pr create --base main --head feat/uix-09-grille-applications --title "UIX-09 : grille d’applications" --fill
~~~

## Prompt de reprise

~~~text
Reprends UIX-09 sur feat/uix-09-grille-applications. Lis AGENTS.md, la boîte Codex et cette fiche.
La branche intègre #199 et les parcours axe-core. Fais relire la branche et contrôle la CI après publication par le chef.
La prochaine mission est VSC-01, après validation du plan C-5 par le chef.
~~~
