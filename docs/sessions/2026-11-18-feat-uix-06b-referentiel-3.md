# Session du 2026-11-18 · UIX-06b · Recette locale R1

| | |
|---|---|
| Agent | Codex |
| Branche | feat/uix-06b-referentiel |
| Dossier | ..\travaux-planner\uix-06b-referentiel |
| Point de départ | 4963e827 |
| Dernier commit produit | 2feca82e |

## Fait

Le chef a validé la correction du § 2 de la [conception](../conception/interface/uix-06b-referentiel.md). Son accord est dans `f9fa7477`. Les corrections et tests R1 sont dans `2feca82e`. Les nouvelles traductions propres à chaque écran sont dans ses dictionnaires FR et EN.

Groupes et Enseignements invalident la lecture précédente dès le changement du filtre. Une écriture terminée plus tard demande une relecture avec les filtres courants. Groupes maintient le titre contextualisé par filière et année. Modules garde les détails visibles à toutes les tailles en utilisant le rendu en fiches sous 1 200 px.

## Inventaire avant et après

Source de référence `11329211`, quatre pages de gestion et composants associés. Contrôle après par lecture des sources du lot. L’inventaire Groupes et Modules préparé par Cursor a servi à la comparaison. Les parcours ci-dessous restent à exécuter en CI.

| Écran | Avant | Après, vérifié dans les sources |
|---|---|---|
| Filières, administration | Recherche code, nom et partenaire. Code, intitulé, description, école, cycle, intitulé de cycle, première année, régime, partenaire et durée en établissement. Création, édition, suppression, gestion des responsables et import avec bilan par ligne. | La recherche et les champs gardent leurs entrées et valeurs. Le tableau et les fiches exposent nom, code, cycle, régime, partenaire et responsables. Les dialogues et le bilan restent accessibles. |
| Groupes, administration et responsables | Première filière gérable, année en cours, toutes les années, avertissement des groupes non rattachés. Promotion, TD, TP, parent, nom, niveau, année 1 à 6, effectif, année scolaire. Signalement des écarts d’effectif, création de descendants, édition, suppression, export filtré, import parent avant enfant et bilan. Désactivation et rétablissement réservés à l’administration. | Même périmètre. Parent visible avant ouverture du détail sur téléphone, niveau et effectif dans le détail. L’export conserve ses colonnes. Le bilan et les commandes réutilisent les dialogues existants. Le chargement, l’erreur et l’absence de résultats ont des états distincts. |
| Modules, administration et responsables | Filières gérables, semestres impairs ou pairs, recherche locale par code ou nom, compteur. Module avec nom, code, niveau, filière, semestre, crédits, coefficient, responsable et volume. Composantes avec type, volume, groupe, séance, modalité, mention, salle et rythme. Création, édition, suppression, import avec bilan et export des lignes filtrées. | Tableau et fiches gardent les champs et commandes. Le détail pliable rend séance, modalité, salle et rythme lisibles sur téléphone. Les dialogues reprennent les champs et validations existants. Les droits et colonnes d’export suivent les mêmes règles. |
| Enseignements, administration et responsables | Période et filière, génération depuis la maquette et bilan, sélection, mutualisation, scission, édition du libellé et des heures, équipe et services, suppression. Informations de module, groupe, modalité, effectif, heures et séances. | Mêmes actions, avec des commandes accessibles dans les fiches. La page distingue panne de chargement et absence de période. La sélection est remise à zéro au changement de filtre. Les dialogues d’équipe continuent de gérer les services existants. |

Les pages comptent 20 à 33 lignes. Les hooks comptent 127 à 199 lignes et les dialogues vérifiés restent sous 150 lignes. Aucun fichier de route, d’API ou de serveur ne fait partie du diff.

## Vérifié

- Lint frontend : 0 erreur, 17 avertissements dans des fichiers hors lot.
- Tests unitaires frontend : 71 sur 71, dont 6 nouveaux.
- Build Vite : réussi en 51,80 s, 13 582 modules transformés. Vite signale les bundles au-dessus de 300 kB.
- Neutralité et git diff --check : réussis.
- Playwright : 12 parcours découverts sur les quatre écrans. Les parcours métier et visuels attendent l’exécution CI, conformément au plan.
- Axe-core : absent du projet. Une autorisation a été demandée pour l’ajouter comme dépendance de test, car le plan validé exclut les nouvelles dépendances.

## Commandes pour le chef après relecture

~~~powershell
git -C "..\travaux-planner\uix-06b-referentiel" push -u origin feat/uix-06b-referentiel
gh pr create --base main --head feat/uix-06b-referentiel --title "UIX-06b : référentiel pédagogique" --fill
~~~

## Prompt de reprise

~~~text
Reprends UIX-06b sur feat/uix-06b-referentiel, dossier ..\travaux-planner\uix-06b-referentiel.
Lis la boîte, cette fiche, la mission d’équipe et le plan validé. Commit produit 2feca82e.
Contrôles locaux verts, lint avec 17 avertissements hors lot, 71 unitaires, 12 parcours découverts.
Vérifie la décision du chef sur axe-core et fais exécuter les parcours en CI. Dépose le rapport
final au coordinateur après les contrôles de recette prévus, puis reprends UIX-09 dans une nouvelle session.
~~~
