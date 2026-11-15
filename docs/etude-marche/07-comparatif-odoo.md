# Planner et Odoo : comparatif de la gestion d'école

15 novembre 2026. Demande du chef de projet. Complète [01-concurrents.md](01-concurrents.md) (Odoo y a une ligne) en descendant fonction par fonction.

## 0. Lire ce document avec ces limites

- **Aucun produit essayé.** Planner : état lu dans le code et dans `docs/plan/suivi.md` de `main` au 15 novembre. Odoo et OpenEduCat : pages de l'éditeur (OpenEduCat, [fonctions](https://newdoc.openeducat.org/features/), [cœur](https://newdoc.openeducat.org/features/core/), [modules](https://newdoc.openeducat.org/settings/modules/), mise à jour janvier 2026) et connaissance générale d'Odoo.
- **Niveaux de preuve** : **[V]** lu sur une page de l'éditeur ; **[C]** connaissance générale d'Odoo, non revérifiée aujourd'hui ; **[?]** non établi, à vérifier avant de s'en servir dans un argumentaire.
- Les chiffres de clientèle d'OpenEduCat (« 500+ établissements », « 74+ modules ») sont des affirmations commerciales : les pages ne listent pas 74 modules (36 fiches, 16 modules de configuration).
- Avis d'utilisateurs relevés le 15 novembre (§ 4) : très peu nombreux pour OpenEduCat, aucun propre à l'éducation pour Odoo seul ; résumés lus dans des résultats de recherche.
- Les pages d'OpenEduCat se contredisent sur l'édition de plusieurs modules (§ 2.3). Quand c'est le cas, la ligne est marquée « édition ambiguë ».

## 1. Ce qu'on compare

« Odoo » n'a **pas d'application école** ([V], déjà relevé le 11 novembre : la page /app/education renvoie 404). Trois objets différents se cachent derrière le mot :

| Objet | Ce que c'est | Qui l'édite |
|---|---|---|
| **Odoo seul** | ERP général : comptabilité, facturation, RH, paie, site web, eLearning, événements, sondages, planning du personnel [C] | Odoo SA |
| **OpenEduCat** | Modules école posés sur Odoo (« Odoo 19 » [V]) : admission, élèves, enseignants, examens, frais, emploi du temps, présences, bibliothèque, transport… Édition libre (LGPL v3) et édition Enterprise payante | OpenEduCat, Inde |
| **Autres modules école** de la place de marché (ex. `do_school_timetable`) | Modules isolés, qualité variable | Tiers |

**Comparer Planner à « Odoo » veut donc dire le comparer à Odoo + OpenEduCat.** C'est ce que fait le reste du document ; la colonne Odoo distingue ce qui vient d'Odoo seul de ce qui vient d'OpenEduCat.

**Nature différente des deux produits.** Odoo + OpenEduCat est un ERP large et personnalisable, dont l'emploi du temps est un module parmi d'autres. Planner est un planificateur sous contraintes (solveur Timefold) prolongé par la vie de la séance, et qui **n'a pas encore** la vie scolaire (élèves, notes, frais). Le comparatif est donc très favorable à Odoo en largeur et à Planner en profondeur sur l'emploi du temps.

## 2. Comparaison fonction par fonction

Légende de l'état de Planner : **✅ existe** (code sur `main`) · **🟡 partiel** · **📋 prévu** (fonction du plan, avec son identifiant) · **⏸ reporté ou gelé** · **❌ hors plan**.

### 2.1 Emploi du temps (le cœur de Planner)

| Capacité | Planner | Odoo + OpenEduCat |
|---|---|---|
| Génération automatique sous contraintes | ✅ Solveur Timefold 1.15 en Java 21, règles dures et souples, 498 paramètres et 5 profils dans le catalogue ; **limites connues** : une seule semaine type, enseignant imposé avant le calcul, au plus 6 séances par semaine, conflits par hiérarchie de groupes et non par élève, examens hors calcul (`ecarts-du-solveur.md`) | 🟡 Module Timetable : création, allocation de salles, emplois du temps des enseignants [V]. **L'algorithme de génération et ses contrôles ne sont pas décrits** sur les pages lues [?]. Une page plus ancienne de l'éditeur parle d'un assistant « Generate Timetable » avec contrôle des doubles réservations, de la capacité des salles et des indisponibilités (01-concurrents.md, non revérifié) |
| Détection des conflits (salle, enseignant, groupe) | ✅ À la saisie, avec refus ; forçage par l'admin avec justification tracée | 🟡 Contrôles annoncés, détail non vérifié [?] |
| Explication d'un refus | 📋 EDT-03 | [?] |
| Groupes hiérarchiques (promotion, TD, TP) et groupes de langue | ✅ hiérarchie ; 📋 groupes de langue du collège (MOT-06) | [?] Batches et sections dans le cœur [V], sans détail de sous-groupes |
| Horaires saisonniers (ramadan, hiver, été) | 🟡 règle Ramadan dans `services/planning` ; 📋 EDT-02 pour le reste | [?] |
| Disponibilités des enseignants | ✅ | 🟡 Emplois du temps des enseignants [V] ; saisie de disponibilités non établie [?] |
| Report d'une séance demandé par l'enseignant, validé par la scolarité, élèves prévenus | ✅ circuit complet, avec créneau et salle proposés | 🟡 Demandes de congé (Leave Request) citées [V] ; circuit de report de séance non établi [?] |
| Remplaçant en cas d'absence | 📋 MOT-09 | 🟡 Remplacements cités par l'éditeur (01-concurrents.md), non revérifié |
| Réservation de salles | ✅ `reservationRoutes`, participants | ✅ Classroom Management : réservation, équipements [V] |
| Examens (sessions, salles, surveillance) | ✅ `examenRoutes`, surveillances ; 📋 intégration au calcul (MOT-11) | ✅ Sessions d'examen, salles, convocations (« hall tickets ») [V] |
| Versions et retour arrière | ✅ instantanés de planning (`PlanningSnapshot`) | [?] |
| Plusieurs campus et bâtiments | 🟡 `Campus`, trajets entre campus, campus préféré du groupe | ✅ Multi-campus et multi-société, **Enterprise** [V] |
| Publication (PDF, Excel, CSV, iCal, courriel) | ✅ exports ; abonnement calendrier ; 📋 EDT-04 pour la publication par école | 🟡 Rapports d'emploi du temps [V] ; iCal [?] |
| Marqueurs métier (première et dernière séance, évaluation, distanciel) | ✅ lecture fidèle des plannings HESTIM | ❌ à développer |
| Grande échelle (20 000 élèves) | 📋 MOT-02 (mesure), MOT-10 | Odoo tient de gros volumes de données [C] ; le **calcul** de l'emploi du temps n'est pas décrit [?] |

**Verdict** : sur le calcul de l'emploi du temps lui-même, Planner est conçu pour être plus fort, mais **aucun test comparatif n'existe** et ses limites du solveur sont réelles pour un collège. Odoo + OpenEduCat est vendu comme un ERP dont l'emploi du temps est un maillon ; sa profondeur de génération est le principal point à faire essayer.

### 2.2 Élèves, familles, vie scolaire

| Capacité | Planner | Odoo + OpenEduCat |
|---|---|---|
| Dossier élève (cycle complet jusqu'au diplôme) | 🟡 `Etudiant` existe mais **dépend d'un compte** (e-mail et mot de passe obligatoires) ; 📋 VSC-01 (conception), VSC-02 | ✅ Student Management : dossiers, documents, progression, retrait [V] |
| Familles, plusieurs enfants, tuteurs | 📋 VSC-02, COM-02 | 🟡 Lien parent dans la gestion des élèves [V] ; portail parents = **Enterprise** [V] |
| Admission, candidature en ligne, liste d'attente | 📋 INS-01, INS-02 (étape 5) | ✅ Admission : candidatures, revue, entretiens, conversion en élève [V] ; portail en ligne avec paiement = **Enterprise** [V] |
| Réinscription, passage d'année | 📋 INS-02, ADM-06 ; 🟡 `services/annees` | 🟡 Progression des élèves [V] ; passage d'année non détaillé [?] (Fedena est cité pour son passage manuel) |
| Appel, présences | ✅ **Appel par QR code**, trois statuts, signalements, téléphone de l'étudiant, projection, anti-fraude | ✅ Feuilles de présence, statistiques, alertes de faible présence [V] ; biométrie et présence avancée = **Enterprise** [V] |
| Absences prévenues aux parents, justificatifs | 📋 VSC-03 | [?] Notifications (WhatsApp, courriel) citées [V], lien avec les absences non établi |
| Notes, moyennes, bulletins | 📋 VSC-04 (XL, étape 4) | ✅ Examens, relevés de notes, transcriptions, carnet de notes avec GPA automatique [V] ; notation avancée (CBCS, OBE, CGPA) = **Enterprise** [V] |
| Discipline | ❌ hors plan | ✅ `openeducat_discipline` : incidents, catégories, suspensions [V] |
| Santé de l'élève | ❌ hors plan | ✅ `openeducat_health` : dossiers, antécédents, allergies [V] |
| Activités, bourses, anciens, mentors, mémoires | ❌ hors plan (formation professionnelle : VSC-06) | 🟡 Cités par nom dans le menu, sans description [V] |
| Formation professionnelle | 📋 VSC-06 | [?] |

### 2.3 Espace de cours et pédagogie

| Capacité | Planner | Odoo + OpenEduCat |
|---|---|---|
| Supports de cours, espace de classe | ✅ `EspaceClasse`, `SupportCours`, sections | ✅ Gestion de cours et programmes (crédits, prérequis, options) [V] |
| Devoirs avec rendu de fichier | 🟡 code présent mais **éteint** ; 📋 COU-02 après revue de sécurité | ✅ Module Assignment : distribution, remises, notation [V] |
| Sondages | ✅ anonymes, par l'enseignant (COU-01) | ✅ Sondages et enquêtes d'Odoo [C] |
| Annonces | 🟡 code présent, **éteint** | 🟡 Tableau d'annonces : cité dans les modules [V], mais la page de comparaison des éditions le range en **Enterprise** (édition ambiguë) |
| Messagerie, forum | ⏸ conditionnel (COU-08, modération Q-17) | ✅ Discussion d'Odoo, forums, messagerie enseignant-parent (Enterprise) [V/C] |
| Plateforme de cours en ligne | 🟡 StudyLib (bibliothèque, séparée) ; **pas de LMS** | ✅ LMS et quiz : cours, vidéo, suivi de progression [V] ; **édition ambiguë** (Community dans un tableau, Enterprise dans la configuration) ; eLearning d'Odoo [C] |
| **Quiz et jeux pédagogiques** | ✅ **Studio quiz** (10 types de questions, passation par QR code, quiz en direct), jeux, terminal Linux ; 📋 import GIFT et Moodle XML ; 🟡 IA (code présent, fournisseur non choisi) | 🟡 Quiz avec correction automatique et banque de questions, **Enterprise** [V] ; pas de jeux ni de quiz en direct décrits [?] |
| Visio | 🟡 lien de visio par séance | ✅ Intégrations Google Meet, Zoom, Teams, BigBlueButton [V] |
| LTI | ⏸ COU-09 | [?] |
| Bibliothèque (documents) | ✅ StudyLib (HESTIM seul, jusqu'à BIB-02) | ✅ Bibliothèque physique : catalogue, cartes, prêts, amendes [V] ; bibliothèque numérique = **Enterprise** [V] |
| Correction de copies par scan (OMR) | ❌ | ✅ **Enterprise** [V] |

### 2.4 Finance, paiements, personnel

| Capacité | Planner | Odoo + OpenEduCat |
|---|---|---|
| Frais de scolarité, échéanciers, caisse, reçus | 📋 FIN-01 (XL, étape 4) | ✅ Fees : structures de frais, facturation, suivi des paiements, rapports [V], appuyés sur la comptabilité d'Odoo |
| Relances, impayés | 📋 FIN-02 | ✅ Relances de paiement d'Odoo [C] |
| Export comptable | 📋 FIN-02 (EP-5) | ✅ Natif : c'est la comptabilité d'Odoo. Plan comptable marocain [C, à vérifier] |
| Paiement en ligne (carte, CMI, argent mobile) | 📋 PAI-02 ; ⏸ PAI-03 | 🟡 Module Payment Processing [V] ; connecteurs d'Odoo [C] ; **CMI [?]**, argent mobile [?] |
| Rapprochement bancaire | 📋 PAI-01 | ✅ Comptabilité d'Odoo [C] |
| Comptabilité générale, TVA, immobilisations | ❌ hors plan (export seulement) | ✅ Odoo Accounting [C] |
| Paie du personnel, congés | 🟡 📋 RHP-01 (relevé des heures de vacataires), RHP-03 (export vers la paie) | ✅ Employés, Paie, Congés d'Odoo [C] ; Payroll cité dans OpenEduCat [V] |
| Dossier de l'intervenant (contrat, cumul, plafond, AREF) | 📋 RHP-02 | 🟡 Dossier employé générique [C] ; règles marocaines [?] |
| Stocks, achats | ⏸ STK-01 | ✅ Inventaire, achats [C/V] |
| CRM, prospects | 📋 INS-01 | ✅ CRM [V] |

### 2.5 Communication et services annexes

| Capacité | Planner | Odoo + OpenEduCat |
|---|---|---|
| Notifications de changement d'emploi du temps | ✅ dans l'application, courriel, push mobile (Expo) | 🟡 Courriel, WhatsApp [V] ; « Application mobile » citée dans le menu, non décrite [V] |
| Service d'envoi commun, plages de silence, résumé | 📋 COM-01 | [?] |
| WhatsApp, SMS prépayés | 📋 COM-03 | ✅ WhatsApp cité [V] ; SMS : service d'Odoo payant [C] |
| Transport scolaire | ⏸ SER-01 | ✅ `openeducat_transportation` : itinéraires, véhicules, arrêts, affectation des élèves [V] |
| Cantine | ⏸ SER-01 | 🟡 Cité par nom seulement [V] |
| Internat | ⏸ SER-01 | 🟡 « Hostel Allocations » cité, aucune fonction décrite [V] |
| Stages, placement | 📋 STA-01 ; ⏸ STA-02 | ✅ Placement Cell (édition ambiguë) [V] |
| Événements | ✅ `evenementRoutes` | ✅ Événements d'Odoo et d'OpenEduCat [V] |
| Assistance (tickets) | ❌ | ✅ Helpdesk [V] |

### 2.6 Documents, administration, échanges avec l'État

| Capacité | Planner | Odoo + OpenEduCat |
|---|---|---|
| Certificats, attestations, diplômes avec code de vérification | 📋 DOC-01, DOC-02 | 🟡 Relevés et « hall tickets » [V] ; signature électronique **Enterprise** [V] ; **vérification publique par code [?]** |
| **Massar (Maroc)** | 📋 ETA-01, ETA-02 | **[?]** Aucune intégration trouvée ; non vérifié. Le marché marocain reproche justement la double saisie Massar (01-concurrents.md) |
| Import de données | 🟡 CSV sur cinq pages ; 📋 ADM-03 | ✅ Import d'Odoo (CSV, Excel) [C] |
| Assistant de démarrage par type d'école | 📋 ADM-04 | ❌ **Plainte numéro un** sur Odoo, OpenEduCat et Classter (« pas prêt à l'emploi ») |
| Rôles et droits | 🟡 trois rôles (admin, enseignant, étudiant) ; 📋 ADM-01 (droits à portée), ADM-05 (parent) | ✅ Droits par groupes, très fins [C] ; flux d'approbation multi-niveaux = **Enterprise** [V] |
| Connexion sécurisée | ✅ double authentification, journal de sécurité, Planner fournit l'identité (OIDC) | ✅ Double authentification, SSO [C] |
| Plusieurs écoles sur une installation | 🟡 📋 PLA-01 à PLA-07 (étape 2) ; **aujourd'hui, une seule école** | ✅ Multi-société natif [C] ; multi-campus **Enterprise** [V] |
| Statistiques et tableaux de bord | ✅ occupation des salles, fréquence d'usage, heures creuses, pics | ✅ Rapports de base (Community : tableaux croisés standard d'Odoo, selon la page des éditions), tableau de bord KPI et analyses avancées (**Enterprise**) [V] |
| Pilotage de la direction (trésorerie, présence des enseignants) | ⏸ PIL-01, PIL-02 | ✅ Tableaux de bord d'Odoo [C] |
| Réseau d'écoles, vue consolidée | ⏸ GRP-01, GRP-02 | ✅ Multi-société, consolidation comptable [C] |

### 2.7 Interface, langues, mobile, hébergement

| Capacité | Planner | Odoo + OpenEduCat |
|---|---|---|
| Langues | ✅ français, 🟡 anglais ; 📋 arabe complet (UIX-04, XL, aucun arabe aujourd'hui) | ✅ Arabe, français, anglais et plus de 50 langues [C], **arabe de droite à gauche** inclus [C] |
| Application mobile | 🟡 Étudiants seulement (Expo), non essayée sur un vrai téléphone ; 📋 enseignant (MOB-02), parents (MOB-05), hors ligne (MOB-06) | 🟡 Application Odoo [C] ; application OpenEduCat citée en Enterprise, non décrite [V] |
| Accessibilité | 🟡 cible WCAG 2.2 AA, partielle (UIX-03) | [?] |
| Personnalisation | ❌ code fermé aux écoles ; paramètres prévus (ADM-02) | ✅ **Très forte** : code ouvert (LGPL pour OpenEduCat Community), Odoo Studio [C], milliers de modules tiers |
| Interface | ✅ moderne, pensée mobile pour étudiants et enseignants | 🟡 « Peu intuitive » selon les avis Odoo ; pas d'avis propre à l'éducation (01-concurrents.md) |

## 3. Synthèse chiffrée

Lecture qualitative du § 2 (pas de score chiffré : les lignes n'ont pas le même poids) :

- **Planner couvre aujourd'hui** (✅ ou 🟡 solide) : le cœur emploi du temps, les réservations et examens, l'appel par QR code, les quiz et jeux, l'espace de classe, la sécurité, les statistiques de planning.
- **Odoo + OpenEduCat couvre aujourd'hui** (✅ [V]) en plus : dossier élève complet, admission, frais et comptabilité, notes et carnet, bibliothèque physique, transport, discipline, santé, devoirs, LMS (édition ambiguë), RH et paie.
- **Planner a prévu mais pas fait** : toute la vie scolaire (VSC-02 à 04), la finance (FIN, PAI), la communication aux familles (COM), Massar (ETA), les documents vérifiables (DOC), les admissions (INS), le parent. Ce sont les étapes 4 et 5 du plan, après les étapes 1 à 3.
- **Hors plan chez Planner** : discipline, santé, comptabilité générale, OMR, CRM général, assistance.

## 4. Coût et mise en place

| Point | Planner | Odoo + OpenEduCat |
|---|---|---|
| Prix | Modèle économique à l'étude (PR #169) ; vente **gelée** | Odoo : par utilisateur et par mois en dollars (Standard environ 9 à 11, Custom environ 16 à 20) ; une application gratuite. OpenEduCat : édition libre ; modules Enterprise à partir de 79 $ par an et par module (relevé du 3 et 4 nov. dans 01-concurrents.md, non revérifié) |
| Mise en place | Assistant de démarrage prévu (ADM-04), mise en route incluse visée | Vendue à part : Success Packs d'Odoo de 190 $ à 8 000 $ ; intégrateur marocain cité à partir de 7 900 DH (benchmark.md) ; OpenEduCat annonce 6 à 10 semaines [V, vendeur] |
| Avis utilisateurs | Aucun : aucun client réel | Odoo : 4,2/5 sur Capterra (1 314 avis), 3,1/5 sur Trustpilot ; plaintes sur le coût de configuration, les mises à jour qui cassent, la hausse au renouvellement |
| Avis sur OpenEduCat | Aucun | 3,8/5 sur **4 avis** seulement, surtout de 2021-2022 (Capterra, SoftwareAdvice) ; complet et bon marché ; trop de menus, fiche élève datée, bibliothèque faible, modules à adapter par du développement, assistance en baisse, « puissant mais pas prêt à l'emploi » (G2). **Aucun avis tiers sur son générateur d'emploi du temps** |
| Mises à jour | Migrations versionnées (Umzug) | Odoo : 73 % des 52 avis Capterra qui en parlent sont négatifs (longues, incompatibles avec les adaptations) |
| Assistance de l'édition libre d'OpenEduCat | À organiser (WhatsApp, délai annoncé) | Forum et GitHub, délai « un à deux jours » annoncé par l'éditeur, non vérifié |
| Hébergement | Installation conteneurisée, serveur en préparation (EXP) | Odoo en ligne ou sur serveur propre [C] |

## 5. Où chacun gagne, honnêtement

**Odoo + OpenEduCat gagne si** l'école veut un seul outil pour tout (admission, frais, comptabilité, notes, paie), a un budget d'intégrateur, et accepte un emploi du temps moins poussé. Il gagne aussi en personnalisation, en langues, en multi-société et en maturité éprouvée.

**Planner gagne si** le problème à résoudre est l'emploi du temps lui-même : génération sous contraintes avec explications, circuit de report et de remplacement, publication et notification, appel en classe, quiz. Il gagne aussi sur la mise en route (si ADM-04 tient), sur l'interface et sur le prix prévisible.

**Planner ne peut pas** aujourd'hui répondre à un directeur qui demande les frais, les bulletins ou Massar. C'est l'écart décisif, et le plan le place volontairement après les étapes 1 à 3, avec l'avis des entretiens de VEN-02 pour FIN, COM et PAI.

## 6. Ce qu'on en retient pour Planner

| Constat | Conséquence proposée |
|---|---|
| Odoo est un concurrent par la largeur, pas par la fonction | Ne pas se battre sur la largeur ; ne pas dire « tout-en-un » avant l'étape 4 |
| La plainte n° 1 sur Odoo et OpenEduCat est la mise en route | ADM-04 et le prix de mise en place inclus sont l'argument de vente (déjà dans 02-arguments-marketing.md) |
| Édition Community d'OpenEduCat gratuite et ouverte | Un directeur technique peut l'essayer gratuitement : prévoir la réponse |
| Les fonctions Enterprise (parent, présence avancée, notation avancée, multi-campus, portail d'admission en ligne) sont payantes | Ce sont des fonctions que Planner prévoit de livrer dans le pack (ADM-05, VSC-03, VSC-04, INS-01) : comparer les prix quand VEN le décidera |
| Une intégration comptable avec Odoo est possible | FIN-02 exporte un journal : prévoir un format importable par Odoo (déjà noté dans `finance_inscriptions_personnel.md`) |
| Planner n'a ni discipline ni santé | À soumettre à VEN-02 : les directeurs de terrain les demandent-ils ? |

## 7. À vérifier avant d'utiliser ce comparatif dans un argumentaire

1. **Générateur d'emploi du temps d'OpenEduCat** : installer l'édition libre et générer un emploi du temps sur le jeu du collège de MOT-02. C'est la comparaison qui compte et elle n'existe pas.
2. Édition (Community ou Enterprise) du LMS, du quiz, des rapports, du portail parents et du placement : les pages d'OpenEduCat se contredisent.
3. Plan comptable et règles de TVA marocains dans Odoo.
4. Connecteur CMI et argent mobile dans Odoo.
5. Intégration Massar dans Odoo ou dans un module tiers.
6. Remplaçant et circuit de report dans OpenEduCat.
7. Arabe de droite à gauche dans les écrans d'OpenEduCat (pas seulement dans Odoo).
8. Prix actuels d'OpenEduCat Enterprise (la page /pricing n'a pas été lue).
9. Tickets ouverts du dépôt GitHub d'OpenEduCat (bogues, rythme des versions) : non lus.
10. Odoo Online n'accepte pas les modules tiers : OpenEduCat suppose donc Odoo auto-hébergé ou chez un intégrateur. Coût d'hébergement à ajouter au § 4.

## Sources

- OpenEduCat : [fonctions](https://newdoc.openeducat.org/features/), [applications de base](https://newdoc.openeducat.org/features/core/), [configuration des modules](https://newdoc.openeducat.org/settings/modules/), [module ERP sur apps.odoo.com](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)
- Odoo : [notes de version 19.x](https://www.odoo.com/odoo-19-2-release-notes), [applications](https://www.odoo.com/page/all-apps), [tarifs](https://www.odoo.com/pricing)
- Avis : [Capterra OpenEduCat](https://www.capterra.ae/software/182870/openeducat), [SoftwareAdvice](https://www.softwareadvice.com/school-management/openeducat-profile/), [G2](https://www.g2.com/products/openeducat/reviews), [comparatif des éditions](https://openeducat.org/compare-editions/), [Capterra Odoo](https://www.capterra.com/p/135618/Odoo/reviews/), [SelectHub](https://www.selecthub.com/p/financial-management-systems/odoo/)
- Dans le dépôt : [01-concurrents.md](01-concurrents.md), [02-arguments-marketing.md](02-arguments-marketing.md), `docs/archives/plans/modele-economique/benchmark.md`, `docs/plan/suivi.md`, `docs/plan/modules/*`
