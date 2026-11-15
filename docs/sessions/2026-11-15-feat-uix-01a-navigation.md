# Session du 2026-11-15 · UIX-01a · `feat/uix-01a-navigation`

| | |
|---|---|
| Fait par | Codex |
| Chantier | UIX hors chantier, exception limitée validée par le chef le 15 novembre |
| Dossier | `..\travaux-planner\uix-01a-navigation` |
| Commits | `052c008a` conception ; `389541bb` code et tests ; documentation dans le commit de cette fiche |

## Objectif

Réorganiser l'application web de gestion dans l'esprit d'Odoo : accueil des applications et navigation contextuelle, avec identité Planner. Le chef a confirmé le périmètre et l'exception après les trois questions de la session. Aucun travail sur le site vitrine.

## Plan

[Conception UIX-01a](../conception/interface/uix-01a-navigation.md), validée par Claude20022002 le 15 novembre dans la conversation. Le plan a été commité seul avant le code.

## Fait

- Nouvelle route protégée `/applications`, accessible après connexion sans destination explicite, depuis l'accueil public connecté et via `/tableau`.
- Catalogue d'interface dérivé de `navigationFor` : conserve droits, alias et interruptions des fonctions existantes. Aucun registre commercial ou droit nouveau.
- Accueil avec icônes, recherche FR/EN, prévisualisation compacte des rubriques, liens internes et Bibliothèque externe. Aucune application future affichée.
- Menu contextuel du module courant, retour Applications et fil d'Ariane. Compte, langue, mode et déconnexion accessibles depuis la barre commune.
- Tableaux et liens profonds conservés ; étapes de mot de passe initial et MFA laissées à PrivateRoute.
- Rail extrait ; les routes de l'accueil et des tableaux sont sorties du fichier App.jsx, déjà trop long, qui diminue.
- Deux parcours Applications ajoutés, outil partagé de connexion adapté : vérifie d'abord l'arrivée aux applications puis rejoint le tableau pour les parcours métier existants.
- Suivi, module UIX et décisions actualisés.

## Vérifié

- Tests unitaires du frontend : **50/50**, dont **8** régressions du catalogue (conservation, permissions reçues, alias, recherche traduite et immutabilité).
- Lint frontend : **aucune erreur** avec `node node_modules/eslint/bin/eslint.js . --quiet`. Des avertissements de fichiers anciens trop longs et de hooks existent avec le lint non silencieux.
- Construction de production : réussie. Avertissement Vite sur les gros paquets existants, notamment Excel ; aucune dépendance ajoutée.
- Vérification ad hoc sur la vraie navigation compilée : administration **5 applications / 27 rubriques**, enseignant **4 / 7**, étudiant **5 / 7**, responsable **5 / 14** ; toutes les rubriques et leurs alias conservés.
- Playwright `--list applications.spec.cjs` : **2 parcours collectés**, non exécutés.
- Neutralité : aucun nom d'école en dur ajouté. `git diff --check` propre.
- **Limites** : aucun navigateur connecté (`agent.browsers.list()` vide), donc pas de contrôle visuel, de preuve mobile/clair/sombre ni de mesure axe-core. Aucun serveur lancé par l'agent ; les parcours complets avec MySQL et solveur restent à exécuter en CI ou par le chef.

Les tests unitaires ne prouvent pas la sécurité serveur ni le rendu visuel. Le catalogue reste un filtre d'ergonomie alimenté par les droits existants.

## Questions

Les trois propositions du chef sont réglées : application de gestion, inspiration Odoo avec identité Planner, premier lot de navigation autorisé hors chantier. Aucune migration du socle neutre, aucun changement de marque de l'école ni décision commerciale dans ce lot.

## État laissé

- UIX-01a : **en cours, code local à relire**, pas « fait » avant relecture, CI et fusion.
- EXP, PLA et MOT restent les trois chantiers ouverts. UIX est une exception limitée.
- UIX-01 complet reste conçu, à coder : thème neutre, état de configuration et migration 0060 ne sont pas réalisés ici.
- Boîte Codex consultée au début : aucun message d'entrée. Rapport de fin déposé dans `..\boites\codex\sortie\`.
- `gh` indisponible dans cette session : PR ouvertes non interrogées ; aucune PR créée, aucun push.

## Reste à faire

1. Relecture du coordinateur, en particulier du parcours de connexion et de la navigation de chaque rôle.
2. Faire tourner les parcours et axe-core ; contrôler visuellement l'accueil et le menu sur téléphone, ordinateur, clair et sombre.
3. Corriger les écarts, puis le chef pousse et ouvre la PR ; fusion uniquement après CI verte.

## Commandes pour le chef

```powershell
git -C "..\travaux-planner\uix-01a-navigation" push -u origin feat/uix-01a-navigation
gh pr create --base main --head feat/uix-01a-navigation --title "UIX-01a : accueil des applications et navigation contextuelle" --fill
```

Pour les vérifications depuis le dossier de travail : `npm --prefix frontend run test:unit`, `npm --prefix frontend run lint`, `npm --prefix frontend run build`. Les parcours complets se lancent par le chef avec les prérequis habituels de DEPLOIEMENT.md.

## Prompt de reprise

```text
Tu reprends UIX-01a, accueil des applications et navigation web de Planner, inspirés d'Odoo,
sur feat/uix-01a-navigation dans ..\travaux-planner\uix-01a-navigation.
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, ta boîte ..\boites\codex\entree,
docs/conception/interface/uix-01a-navigation.md et cette fiche.
Le chef a validé les trois propositions et l'exception limitée le 15 novembre.
Fait : conception 052c008a, code et tests 389541bb ; 50 tests unitaires verts, lint sans erreur,
build réussi, les vraies rubriques des quatre profils sont conservées.
Reste : relecture, exécution des parcours et contrôle visuel/axe-core, aucun navigateur connecté ici.
Ne pas toucher au socle neutre complet, à la migration 0060, au serveur ou au registre VEN-01.
Aucun push par l'agent ; toute modification de périmètre doit être validée.
Fin de session : suivi, fiche et commits locaux, rapport dans la boîte de sortie.
```
