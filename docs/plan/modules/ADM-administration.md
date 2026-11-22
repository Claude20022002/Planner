# ADM · Administration selon les rôles

**Objet** : qui peut faire quoi, et les outils de l'administration de l'école. Cela couvre :
- comptes, rôles et droits ;
- configuration de l'école ;
- import des données ;
- assistant de démarrage ;
- années et passage d'année ;
- statistiques et journal de sécurité.

**Hors module** :
- l'élève et sa famille comme personnes : VSC ;
- l'équipe Planner qui gère les écoles : PLA.

**Tables possédées** : `Users`, `AuthSession`, `MfaDefi`, `MfaCodeSecours`, `PasswordResetToken`, `JournalSecurite`, `Desactivation`, `AnneeUniversitaire`, `Periode`, `ResponsableFiliere`.

## Les rôles

| Rôle | Aujourd'hui | Ce qui change |
|---|---|---|
| **Équipe Planner** | n'existe pas dans l'application ; les commandes sont lancées sur le serveur | PLA-05, puis la console PLA-08 |
| **Administration de l'école** (scolarité, direction) | rôle `admin` : tout le référentiel, la planification, les comptes, l'identité, les statistiques ; double authentification | habilitations à portée (ADM-01) ; configuration et import (ADM-02 à ADM-04) |
| **Responsable** (filière, niveau, cycle) | un enseignant inscrit dans `ResponsableFiliere`, avec des droits sur ses filières | portée par niveau ou par cycle pour le scolaire (ADM-01) |
| **Enseignant** | rôle `enseignant` : ses séances, l'appel, ses classes, l'espace de cours, le Studio quiz, ses disponibilités, ses reports | saisie déléguée et notes (VSC), rien de nouveau sans retirer une tâche (EP-6) |
| **Élève ou étudiant** | rôle `etudiant` : emploi du temps, appel par QR, cours, quiz, jeux, bibliothèque | compte de l'élève créé par l'établissement, connexion sans adresse électronique (VSC-01, Q-20) |
| **Parent** | **n'existe pas** | ADM-05 avec VSC-02 et MOB-05 |

## Ce qui existe

- **Serveur** : `authRoutes`, `userRoutes`, `services/comptes.js`, `services/mfa.js`, `services/desactivation/*` (ME-17), `services/annees` (ME-18), `journalSecuriteRoutes`, `statistiquesRoutes`, `etablissementRoutes`.
- **Fournisseur d'identité** : Planner fournit l'identité à ClassQuiz (OIDC) et à StudyLib (JWKS).
- **Configuration de l'école (ADM-02a)** : `GET /api/moteur/reglages` (cinq réglages et règles réglables avec leur choix), `POST /api/moteur/versions/apercu` (à blanc), `POST /api/moteur/versions` avec `regles`, `appliquer` et `base` (409 `VERSION_DEPASSEE`), `GET /api/moteur/versions` allégée et `GET /api/moteur/versions/:id` ; événements `parametres_version_appliquee`, `_abandonnee`, `_annulee` au journal de sécurité ; services `backend/services/moteur/valeurs/` (`reglagesEcole`, `valeursDeLEcole`, `apercu`, `concurrence`, `historique`, `annulation`).
- **Site** : `gestion/Utilisateurs`, `gestion/JournalSecurite`, `gestion/IdentiteEcole`, `Statistiques`, et l'import CSV (`components/common/ImportCsvDialog.jsx`) sur cinq pages.
- **Modèles d'import fictifs** : `docs/modeles/`.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| ADM-01 | Habilitations à portée : un droit vaut pour une filière, un niveau, un cycle ou toute l'école | ME-12 | 5 | M | VSC-01 | à faire |
| ADM-02 | Panneau de configuration de l'école : réglages du moteur montrés à l'école (le reste reste au profil), aperçu puis appliquer ; avec MOT-13c, l'écran « Règles de génération ». Trois étapes : 02a serveur, 02b page Réglages et Historique, 02c Règles de génération ([conception](../../conception/administration/adm-02-configuration.md)) | ME-2c | 3 | L + M | MOT-01, Q-04 (tranchée par le plan) | en cours : plan validé le 22 nov. ; 02a codée sur `feat/adm-02-configuration`, sauf la migration de reprise (numéro à réserver) |
| ADM-03 | Import : zone de préparation, contrôles, tout ou rien, classeur unique, clés naturelles ; le classeur porte la classe et le groupe de langue | ME-9 | 3 | L | VSC-01, VSC-07 | à faire |
| ADM-04 | Assistant de démarrage avec un modèle par type d'école (EP-1) ; le modèle collège crée les groupes de langue, prêts pour l'import | ME-10 | 3 | L | ADM-02, ADM-03, UIX-01 | à faire |
| ADM-05 | Rôle parent : compte facultatif, lien prouvé avec l'enfant, droits par enfant | — | 4 | M | VSC-02, PLA-11 | à faire |
| ADM-06 | Clôture d'une année (lecture seule) et préparation de la suivante : passage des élèves, groupes reconduits (EP-8) | ME-19, ME-20 | 5 | L + M | VSC-02 | à faire |
| ADM-07 | Enseignants partagés entre écoles : heures « occupé » fédérées | ME-13 | 5 | M | PLA-11 | à faire |
| ADM-08 | Annuaire de l'école | ME-8b | — | M | — | reporté |
| ADM-09 | Échanges OneRoster | ME-9b | — | M | ADM-03 | reporté |

## Critères de « terminé »

- **ADM-02** (proposé par le plan, validé le 22 nov.) :
  - une personne de l'administration d'une école du supérieur règle seule, depuis le panneau, chaque réglage que le calcul ou les contrôles lisent et que l'école peut changer (cinq réglages, six règles souples du profil, ses contraintes déclarées), sans copie du catalogue dans le site ;
  - une seule source : la génération, la saisie manuelle et les examens lisent ces réglages dans MP-1 ; l'ancienne route d'écriture refuse ; le problème envoyé au solveur est identique avant et après la bascule ;
  - chaque refus sous son champ, traduit par son code ; l'aperçu dit ce qui change et quand cela vaut ; deux applications simultanées : la seconde reçoit 409 et recharge ;
  - l'historique se lit, une version s'annule, une version future s'annule avant sa date ; appliquer, abandonner et annuler vont au journal de sécurité, sans valeur ;
  - l'onglet « Règles de génération » crée une contrainte à partir des six modèles, montre sa phrase dans la langue de la personne, le contrôle de place et la liste « Déjà pris en compte » avec l'état de chaque règle ;
  - trois clics au plus, axe-core sans violation, parcours verts en français et en anglais, charte d'UIX-10b ; premier chargement mesuré dans les PR de 02b et 02c.
- **ADM-01** : un responsable de niveau ne voit ni ne modifie rien hors de son niveau. Un test par route touchée.
- **ADM-03** : un fichier de 300 élèves avec dix erreurs volontaires est refusé avec dix messages lisibles ; corrigé, il passe en entier ou pas du tout. Une langue en double pour le même élève est l'une de ces erreurs, et le message nomme l'élève.
- **ADM-04** : la mesure EP-1 est faite par une personne extérieure et notée. Le modèle collège lui propose des groupes de langue vides, et l'import ADM-03 les remplit.
- **ADM-05** : le lien parent-enfant ne se crée que par l'école ; deux parents séparés ont chacun leurs droits. Les règles sont validées avec le juriste (revue A-6).
- **ADM-06** : une école de démonstration passe d'une année à l'autre en moins d'une demi-journée, et l'année close reste lisible.

## Exigences produit

EP-1, EP-2, EP-6, EP-8.

## Références

- Archives : [comptes et années](../../archives/plans/planner-multi-etablissements/11-comptes-et-annees.md), [configuration et import](../../archives/plans/planner-multi-etablissements/05-configuration-import.md)
