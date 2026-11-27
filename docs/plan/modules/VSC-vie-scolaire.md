# VSC · Vie scolaire

**Objet** : ce qu'une école privée achète d'abord, et que Planner n'a pas encore :
- élèves et familles ;
- inscriptions ;
- affectation aux groupes de langue et d'option ;
- absences prévenues aux parents ;
- notes, bulletins et conseil de classe ;
- Massar.

**Hors module** :
- l'appel lui-même : il existe déjà, son module propriétaire est EDT pour la séance ; VSC-03 s'appuie dessus ;
- les frais : FIN ;
- l'espace parents dans l'application : MOB-05.

**Tables possédées** (après VSC-01) : `Etudiant`, `Appartenir`, et les tables nouvelles du scolaire (responsable légal, inscription, évaluation, note, période de notes, bulletin). La présence (`AppelSeance`, `Presence`, `SignalementPresence`) reste à EDT.

## Ce qui existe

- **Appel** :
  - par QR code et à trois statuts (présent, en retard, absent) ;
  - signalements, téléphone de l'étudiant, projection ;
  - fichiers : `presenceRoutes`, `services/presences/*` ; écrans `Appel`, `AppelProjection`, `Presence` ; dans l'application mobile, `scan` et `scanner`.
- **`Etudiant` dépend de `Users`** : la clé est `id_user`, et `Users.email` et `password_hash` sont obligatoires. **Un élève ne peut donc pas exister sans compte.** Décision du 8 novembre : un élève a un compte, créé par son établissement ; reste à savoir avec quoi se connecte un enfant sans adresse (Q-20).
- **Champs obligatoires propres au supérieur** : `Cours.semestre`, `Cours.volume_horaire`, `Cours.type_cours`, `Groupe.id_filiere`.
- **Conception C-5** : le plan du document et 14 questions, dans [conception-c5](../../conception/vie-scolaire/conception-c5-modele-donnees-scolaire.md). Le plan attend la validation du chef de projet avant d'être rempli.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| VSC-01 | **Modèle de données du scolaire** (conception seule, avec diagrammes) : entités, correspondance avec le supérieur, profils, plusieurs écoles, plan de migrations, propriétaires des tables, appartenance aux groupes transversaux (Q-3 de conception-c5, retenue le 8 novembre). Réponse à Q-20 (compte de l'élève) | C-5 | 1 | L | — | plan du document à valider |
| VSC-02 | Élèves et familles : responsables légaux, inscription d'une année, réinscription, fratries | F-10 | 6 | L | VSC-01, PLA-01 | à faire |
| VSC-03 | Absences prévenues aux parents (envoi par COM), justificatifs, saisie déléguée (EP-6) | F-12 | 6 | M | VSC-02, COM-01 | à faire |
| VSC-04 | Notes et bulletins : périodes, évaluations, coefficients, note absente distincte de zéro, verrouillage par période, tableau d'avancement de la saisie, conseil de classe ; comprend le carnet de notes officiel et les grilles d'évaluation | F-13, EC-3, EC-4 | 6 | XL | VSC-02, Q-06, Q-16 | à faire |
| VSC-06 | Formation professionnelle : profil, assiduité pour les bourses | F-20 | 4 | M | MOT-05 | à faire |
| VSC-07 | Affectation des élèves aux groupes de langue et d'option : un élève, une classe, un seul groupe par langue ; effectif plafonné ; ces appartenances sont celles que MOT-06 lit | Q-3 de conception-c5 | 5 | M | VSC-01, MOT-05 | à faire |
| VSC-08 | Évaluations, crédits et jurys du supérieur : épreuves et coefficients par module, crédits acquis, compensation, rattrapage, délibération du jury, relevé de notes ; modèle commun avec VSC-04 (le scolaire), sans nommer de pays ni de système (crédits, pas « LMD ») | — (décision du chef du 21 nov.) | 3 | L (provisoire) | — ; relevés vérifiables avec DOC-01 | à faire |
| VSC-09 | Activités et clubs : inscription, encadrant, créneaux placés sans conflit avec les cours, présence | — | 6 | M | VSC-02 | à faire |
| VSC-10 | Notes du supérieur : crédits, système LMD, compensation, rattrapage, relevé ; moyenne pondérée de type GPA pour l'école qui la demande | — | — | L | VSC-04 | fondue dans VSC-08 (décision du chef du 21 nov. : crédits, sans nommer « LMD ») |
| VSC-11 | Mémoires et projets de fin d'études : sujet, encadrant, jalons, dépôt, jury, soutenance placée sans conflit | — | 3 | M | COU-02 ; les étudiants du modèle actuel (VSC-02 retirée le 26 nov., décision du chef) | à faire |
| VSC-12 | Choix des options et matières facultatives par l'élève ou sa famille, avec quotas et date limite ; les choix forment les groupes du moteur (groupes de langue de MOT-06) | — | 5 | M | VSC-02, MOT-06 | à faire |
| VSC-13 | Discipline : incidents, sanctions graduées, conseil de discipline, famille prévenue par COM ; durée de conservation fixée par l'école, puis effacement (parité OpenEduCat ; numéro VSC-07 de [parite-openeducat.md](../parite-openeducat.md) déplacé : VSC-07 pris par l'affectation des groupes de langue sur `main`) | — | 6 | M | VSC-02, COM-01 | à faire |
| VSC-14 | Infirmerie, **module facultatif éteint par défaut** : allergies et traitements utiles à l'école, passages, contacts d'urgence ; lu par l'infirmier et la direction seulement ; ouvert après le dossier CNDP de l'école | — | à placer | M | VSC-02, ADM-01 | conditionnel (dossier CNDP) |

Décisions du 13 novembre : VSC-05 (Massar) est devenue **ETA-02** ([ETA](ETA-echanges-etat.md)) ; le plafond de cumul de VSC-06 (F-22) est passé dans **RHP-02** ([RHP](RHP-personnel-paie.md)). Le numéro VSC-05 ne resservira pas.

## Critères de « terminé »

- **VSC-01** :
  - les 14 questions sont tranchées et écrites dans [decisions.md](../decisions.md) ;
  - l'étude d'impact de Q-20 couvre chaque fichier qui lit `Users.email` ;
  - les numéros 0062 à 0079 sont réservés dans [suivi.md](../suivi.md) ;
  - le document est relu par les deux groupes.
- **VSC-02** : une fratrie de trois enfants est inscrite par un seul responsable légal ; un enfant sans compte apparaît dans l'emploi du temps de sa classe.
- **VSC-03** : le parent est prévenu de l'absence ; un justificatif accepté distingue cette absence de l'absence injustifiée que ETA-02 exporte.
- **VSC-07** : dans un collège fictif, chaque élève est dans une classe et dans un seul groupe de chaque langue vivante ; un groupe plein est refusé en nommant le groupe et l'effectif ; le fichier produit est calculable par MOT-06 sans conflit d'élève.
- **VSC-04** :
  - le bulletin d'une classe s'imprime en un clic ;
  - une absence à une évaluation ne change pas la moyenne ;
  - une note modifiée après verrouillage garde son historique.
- **VSC-01** (21 nov.) : la conception prévoit **plusieurs systèmes d'évaluation dans une même école**, réglés par classe (deux sous-systèmes, séquences ou trimestres), sans nommer de pays (N7) ; le modèle d'évaluation reste commun avec VSC-08 (le supérieur). Puis VSC-01 se gèle sans code (le supérieur d'abord).
- **VSC-13** : une sanction n'est visible que de la direction, de l'enseignant concerné et de la famille ; elle s'efface à la date fixée par l'école, et un test le prouve.
- **VSC-14** : le module refuse de s'allumer tant que l'école n'a pas déclaré son dossier CNDP ; un enseignant ne lit aucune donnée de santé, sauf l'alerte qu'il doit connaître (allergie grave), si l'école l'a choisi.
- **VSC-12** : deux élèves de deux classes qui choisissent la même langue sont dans le même groupe du moteur, sans conflit dans leur emploi du temps.

## Condition légale

**Aucune donnée réelle de mineur** avant :
- le contrat de sous-traitance ;
- le dossier CNDP de l'école ;
- le test d'intrusion (EXP-08).

Ni CIN obligatoire ni donnée de santé dans le socle : selon la loi 09-08, elles imposent une autorisation préalable de la CNDP. La santé est un module facultatif à part (VSC-14), éteint par défaut et ouvert seulement après le dossier CNDP de l'école ; la présence biométrique est écartée (décision du 17 nov.).

## Exigences produit

EP-5, EP-6, EP-7, EP-8.

## Références

- Archives : [plan par fonctionnalités, F-10 à F-22](../../archives/plans/plan-produit/03-plan-par-fonctionnalites.md), [revue d'architecte, B-2 et A-5](../../archives/plans/plan-produit/06-revue-architecte.md)
