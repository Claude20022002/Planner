# Plan d'essai d'OpenEduCat (édition Community)

15 novembre 2026. **Plan à valider par le chef de projet avant toute installation.** Il prépare l'essai ; il ne l'exécute pas. Il lève les points 1, 6 et 7 de la liste « à vérifier » du comparatif `07-comparatif-odoo.md` (PR #174) et alimente sa question n° 1.

## 1. Pourquoi cet essai

Le comparatif lit les pages de l'éditeur mais n'a rien essayé. Le point qui décide d'un achat d'école est le même que celui de Planner : **l'emploi du temps généré**. Les pages d'OpenEduCat ne décrivent ni l'algorithme de génération ni ses contrôles. Seul un essai tranche.

## 2. Décisions déjà prises (15 novembre)

| Sujet | Décision |
|---|---|
| Contenu | Plan écrit seulement : pas d'installation avant validation |
| Édition | Community seulement (LGPL, gratuite). Aucune inscription chez l'éditeur |
| Place dans le plan | Étude hors chantier, branche `etude/odoo-essai` |

Conséquence : les fonctions Enterprise (portail parents, présence avancée, notation avancée, multi-campus, portail d'admission) **ne sont pas testées** et restent « non vérifié » dans le comparatif.

## 3. Questions de l'essai

| N° | Question | Section du comparatif |
|---|---|---|
| E-1 | OpenEduCat **génère-t-il** un emploi du temps, ou ne fait-il que le saisir ? | 2.1 |
| E-2 | Quelles contraintes tient-il (salle, enseignant, groupe, capacité, indisponibilité) ? | 2.1 |
| E-3 | Comment montre-t-il un conflit, et l'explique-t-il ? | 2.1 |
| E-4 | Que fait-il de groupes qui se croisent (deux langues vivantes sur plusieurs classes) ? | 2.1, 2.2 |
| E-5 | Existe-t-il un circuit de report ou de remplacement d'une séance ? | 2.1 |
| E-6 | Quelle est la mise en route : temps de l'installation, des données, du premier emploi du temps ? | 4 |
| E-7 | L'arabe s'affiche-t-il de droite à gauche dans les écrans de l'école ? | 2.7 |
| E-8 | Quelles fonctions du comparatif marquées « Community » existent réellement dans l'édition libre ? | 2.2 à 2.6 |

## 4. Protocole

### 4.1 Environnement

- Odoo 19 Community plus les modules OpenEduCat Community, en conteneurs, **sur la machine locale, hors du dépôt** (dossier de travail séparé). Aucun service accessible depuis l'extérieur.
- Version exacte d'Odoo et de chaque module OpenEduCat notée au début du rapport. Source des modules : le dépôt de l'éditeur ou la place de marché, à relever avec l'adresse et la date.
- Base vierge, une seule société, français et anglais, puis arabe pour E-7.
- Téléchargements traités comme non fiables : dossier à part, rien exécuté en dehors des conteneurs.

### 4.2 Jeu de données

Le **même jeu fictif** que MOT-02, pour pouvoir comparer avec le solveur de Planner. Il n'existe pas encore : MOT-02 doit le versionner. Deux voies :

1. attendre MOT-02 (chantier non ouvert) ;
2. écrire ici un jeu minimal, réutilisable ensuite par MOT-02 (**proposé**).

Taille proposée, en trois paliers :

| Palier | Contenu | Sert à |
|---|---|---|
| A | 1 classe, 8 matières, 6 enseignants, 3 salles | E-1, E-2, E-3 : le cas simple |
| B | 12 classes, 20 enseignants, 12 salles, demi-groupes de TP | E-2, E-3 sous charge |
| C | collège de 600 élèves, deux langues vivantes réparties sur plusieurs classes | E-4 : le cas qui échoue le plus souvent |

Rien de réel dans le jeu : le dépôt est public. Noms fictifs, comme `docs/modeles/`.

### 4.3 Séquence

1. Installer ; noter le temps et chaque blocage (E-6).
2. Saisir le palier A à la main, puis à l'import si l'import existe.
3. Chercher la génération automatique ; la lancer ; noter ce qu'elle exige en entrée.
4. Provoquer exprès des conflits (même enseignant, même salle, salle trop petite, enseignant indisponible) ; noter ce qui est refusé, accepté, ou signalé après coup (E-2, E-3).
5. Palier B puis C ; noter temps de calcul, échec, résultat partiel (E-4).
6. Reporter une séance, absenter un enseignant ; chercher un circuit (E-5).
7. Passer l'interface en arabe ; relever le sens de lecture (E-7).
8. Parcourir les modules cités « Community » dans le comparatif ; marquer chacun présent, absent ou Enterprise (E-8).

### 4.4 Ce qu'on note, pour chaque étape

Capture d'écran, durée, message d'erreur exact, nombre de clics pour la tâche. Un échec se note avec sa sortie : on ne conclut pas « ne marche pas » sans avoir cherché dans la documentation de l'éditeur.

## 5. Grille de comparaison avec Planner

| Critère | Mesure OpenEduCat | Mesure Planner |
|---|---|---|
| Génère seul un emploi du temps palier A / B / C | oui, non, partiel | solveur Timefold, MOT-02 |
| Temps de calcul | secondes | idem |
| Règles dures violées dans le résultat | nombre | idem |
| Conflits d'élèves entre groupes de langue | détectés ou non | non (limite F-5, MOT-06) |
| Explication d'un refus | texte relevé | EDT-03, à faire |
| Report et remplaçant | circuit trouvé ou non | circuit complet ; MOT-09 |
| Mise en route, du premier lancement au premier emploi du temps | durée | assistant à faire (ADM-04) |
| Arabe de droite à gauche | oui, non | non (UIX-04) |

**Équité** : Planner a lui-même des limites connues (F-1 à F-8, une seule semaine type, 6 séances par semaine au plus, conflits par groupe et non par élève). Le rapport les dit à côté des résultats d'OpenEduCat, et ne présente pas Planner comme meilleur sans mesure.

## 6. Livrables

- `docs/etude-marche/09-resultats-essai-openeducat.md` : réponses à E-1 à E-8, grille remplie, captures rangées dans `docs/etude-marche/reports/`.
- Mise à jour de `07-comparatif-odoo.md` : lignes passées de [?] à [V essai], avec la date et la version.
- Le jeu fictif, s'il est écrit ici, dans `docs/modeles/`, signalé à MOT-02.

## 7. Limites et risques

- Un seul essai, une version, une machine : pas de conclusion sur la fiabilité.
- Un bon résultat sur un jeu fictif ne prouve rien sur une vraie école.
- L'édition Community peut avoir un générateur plus pauvre que l'Enterprise, sans que les pages le disent. Si c'est le cas, le noter, et ne pas écrire que « OpenEduCat ne sait pas » mais que « l'édition libre ne sait pas ».
- Effort estimé avant détail : une session pour le plan et l'environnement, une pour les paliers A et B, une pour C et le rapport (environ M à L). Estimation brute, à multiplier par 1,5 comme les autres.

## 8. Questions pour le chef

| N° | Question | Proposition |
|---|---|---|
| Q-1 | Le jeu fictif est-il écrit ici ou attendu de MOT-02 ? | Écrit ici, réutilisé par MOT-02 |
| Q-2 | L'essai tourne-t-il sur la machine de Ronny ou sur un serveur de test ? | Machine locale, conteneurs, rien d'exposé |
| Q-3 | Si l'édition libre n'a pas de générateur, faut-il demander l'essai Enterprise de 15 jours (inscription chez l'éditeur, donc coordonnées à fournir) ? | Décider après l'essai Community, pas avant |
| Q-4 | Le palier C (600 élèves) est-il nécessaire, ou le palier B suffit-il pour la décision ? | Garder C : c'est le cas du collège de l'étape 3 |
| Q-5 | Qui relit le rapport avant qu'il serve à un argumentaire (MKT) ? | Le chef, après les 8 questions de § 3 |

## Sources

- OpenEduCat : [fonctions](https://newdoc.openeducat.org/features/), [configuration des modules](https://newdoc.openeducat.org/settings/modules/), [module ERP](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)
- Dans le dépôt : `docs/plan/modules/MOT-moteur.md` (MOT-02), `docs/conception/moteur-planification/ecarts-du-solveur.md`
