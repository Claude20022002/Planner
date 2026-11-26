# COU · Espace de cours

**Objet** : la vie pédagogique d'une classe :
- supports en sections ;
- annonces ;
- dates d'ouverture ;
- lien de visio ;
- sondages ;
- devoirs ;
- échanges.

Les offres de stage sont passées dans [STA](STA-stages-alternance.md) le 13 novembre (COU-07 y est devenue STA-01).

Ce n'est pas un second Moodle. Le quotidien visé est celui d'une classe : supports, annonces, devoirs, questions. Les quiz restent dans QJE, et les questions au format Moodle entrent par QJE-02. Ouvrir un outil extérieur est COU-09, reporté.

**Hors module** :
- les fichiers eux-mêmes, gardés par StudyLib : BIB ;
- les quiz et les jeux : QJE ;
- les notes officielles : VSC-04.

**Tables possédées** : `SectionCours`, `SupportCours`, `Sondage`, `SondageChoix`, `SondageParticipation`, `Devoir`, `DevoirRendu`, `FichierDevoir`, `RetourSeance*`, `Annonce*`.

## Ce qui existe

- **Fichiers** : `espaceCoursRoutes`, `services/cours/*` ; écrans `EspaceClasse`, `MesCours` et `MesClasses` sur le site ; `cours/[classe]` et `document/[id]` dans l'application.
- **Livré par l'espace de cours (E-0 à E-10)** :
  - migrations 0042 et 0043 ;
  - dates d'ouverture (EC-1, migration 0056) ;
  - annonces des enseignants (EC-5, **éteintes** par `ANNONCES_ENSEIGNANTS_ACTIVES`) ;
  - lien de visio (EC-11, migration 0058).
- **Sondage de l'enseignant à sa classe** (EC-9, migration 0059, fusionné le 7 novembre) : anonyme, derrière l'interrupteur de l'école.
- **Devoirs** : le code existe (`devoirRoutes`) mais est **éteint** (`DEVOIRS_ACTIFS=false`). Le retour des devoirs avec rendu de fichier est décidé depuis le 25 octobre.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| COU-01 | Sondage de l'enseignant à sa classe | EC-9 | libre | S | — | fait (#148) |
| COU-02 | Devoirs avec rendu de fichier, après une revue de sécurité (taille, type, antivirus, stockage S3 de BIB-05 ; StudyLib n'est plus redéployé, voie B du 21 nov.) | EC-2 | 3 | L | BIB-05 (BIB-01 absorbée) | à faire |
| COU-03 | Commentaires sur un support ou un devoir | EC-6 | 3 | M | COU-02 | à faire |
| COU-04 | Questions partagées de la classe | EC-7 | 3 | M | — | à faire |
| COU-05 | « Vu » : l'enseignant sait qui a ouvert un support ou une annonce | EC-8 | 3 | M | — | à faire |
| COU-06 | Export des notes d'un devoir | R-13 | 3 | S | COU-02 | à faire |
| COU-08 | Messagerie, si les règles de modération sont tranchées (Q-17) | EC-10 | 5 | L | Q-17 | conditionnel |
| COU-09 | LTI : ouvrir un outil extérieur dans l'espace de cours | EC-12 | — | L | — | reporté |
| COU-10 | Cours en ligne : modules, leçons (texte, vidéo, document), conditions d'accès, progression et achèvement par élève, attestation d'achèvement par DOC-01 | — | à placer | XL | COU-02, BIB-01 | à faire |
| COU-11 | Classe virtuelle : salle de visio créée avec la séance (outil libre hébergé, ou lien Meet, Zoom ou Teams), présence relevée, enregistrement seulement si l'école l'autorise | — | à placer | M | — | à faire |
| COU-12 | Annonces de l'école et de la classe : rallumer les annonces éteintes après revue, ciblage par classe, niveau ou rôle, accusé de lecture avec COU-05 | — | libre | M | — | à faire |
| COU-13 | Cahier de textes et progression : contenu de chaque séance, travail à faire, progression prévue et réalisée par matière, rempli depuis la séance de l'emploi du temps | — | libre | M | — | à faire |

## Critères de « terminé »

- **COU-02** :
  - un fichier interdit est refusé ;
  - un étudiant ne voit que son rendu ;
  - le rendu tardif est marqué ;
  - un parcours complet le prouve.
- **COU-05** : le « vu » ne s'affiche qu'à l'enseignant de la classe, jamais aux autres élèves.
- **Toute fonction qui fait télécharger un support ou un document** : le poids est affiché avant le téléchargement, et le téléchargement reprend après une coupure (N3, décision du chef du 21 nov. ; R10 de la [synthèse des concurrents](../../etude-marche/14-reprendre-et-depasser.md)).
- **COU-10** : un élève reprend un cours là où il l'a laissé, sur le téléphone comme sur le site ; l'enseignant voit l'avancement de sa classe.
- **COU-13** : une séance reportée garde son contenu au cahier de textes ; l'élève absent voit le travail à faire.

## Exigences produit

EP-6, EP-7.

## Conception et références

- [Conception d'EC-9](../../conception/espace-de-cours/conception-ec9-sondage.md)
- Archives : [espace de cours](../../archives/plans/espace-de-cours.md), [parité avec Moodle et Classroom](../../archives/plans/planner-multi-etablissements/14-parite-moodle-classroom.md), [espace enseignant](../../archives/plans/espace-enseignant.md)
