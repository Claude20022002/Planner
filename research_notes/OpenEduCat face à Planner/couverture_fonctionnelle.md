# Couverture fonctionnelle OpenEduCat (17 novembre 2026)

Périmètre : ce que le produit fait, d’après les pages de l’éditeur, la documentation versionnée Odoo 19 et le dépôt public `openeducat/openeducat_erp` (branche par défaut `19.0`, licence LGPL-3). Aucun prix. Aucun essai du logiciel.

Hiérarchie des sources, quand elles se contredisent :

- [code] dépôt public, fichiers lus le 17 novembre 2026 sur `19.0`.
- [V] procédures `doc.openeducat.org/19.0` et fiche d’assistant `newdoc.openeducat.org` (mise à jour indiquée janvier 2026).
- [V] matrice d’éditions `openeducat.org/compare-editions/` (marketing, mais c’est le seul tableau Community / Enterprise tenu par l’éditeur).
- [V] `newdocs.openeducat.org` (pluriel) et pages « feature » : souvent plus riches que le code. Une phrase marketing n’est pas une capacité technique.
- [tiers] fiches de boutiques d’applications.

Le dépôt communautaire ne contient que ces modules : `openeducat_activity`, `openeducat_admission`, `openeducat_assignment`, `openeducat_attendance`, `openeducat_classroom`, `openeducat_core`, `openeducat_erp`, `openeducat_exam`, `openeducat_facility`, `openeducat_fees`, `openeducat_library`, `openeducat_parent`, `openeducat_timetable`, `theme_web_openeducat`. — [code](https://github.com/openeducat/openeducat_erp) (liste API de la branche, liens `ref=19.0`). Même liste de dépendances Community sur l’Apps Store Odoo 19, qui marque en Enterprise : notice board, gradebook, annotation de devoirs, alumni, transport, KPI. — [V](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)

Le README du même dépôt annonce encore transport, internat, RH et paie. Ces dossiers ne sont pas dans l’arbre `19.0`. — [code](https://github.com/openeducat/openeducat_erp)

Le modèle de données lu (programme, département, cours, batch, matière, charge d’unités, types d’évaluation Normal / GPA / CWA / CCE) est celui d’un établissement d’enseignement supérieur. Les pages K-12 sont du marketing récent, pas un second modèle.

## Emploi du temps : solveur ou allocation manuelle ?

### Takeaway

Il n’y a pas de solveur de contraintes dans le code communautaire 19.0. L’assistant « Generate Timetable » étend une grille hebdomadaire saisie par l’utilisateur (jour, heure, enseignant, matière, salle) en séances datées. Quatre interrupteurs empêchent ensuite un chevauchement. L’algorithme d’optimisation n’est pas établi : les pages qui parlent d’un solveur, d’itérations ou d’une génération « optimale » ne sont pas corroborées par le code lu.

### Cited Findings

- Menu documenté : Time Table → Timetable → Generate Timetable. L’assistant demande cours, batch, date de début, date de fin, puis, jour par jour, un créneau, un enseignant, une matière et une salle. L’utilisateur doit remplir enseignant, matière et salle avant d’activer le jour. Boutons Add et Copy. — [V](https://doc.openeducat.org/19.0/applications/timetable/generate-session.html)
- La fiche `newdoc` (dernière mise à jour indiquée : janvier 2026) décrit le même geste : onglets lundi à dimanche, lignes horaires saisies, bouton Proceed. Le système « valide les conflits » puis crée une séance pour chaque semaine de l’intervalle, à l’état brouillon. Exemple chiffré de volume, pas de qualité : environ 25 séances en 2 à 3 secondes, environ 400 séances (semestre) en 15 à 30 secondes. Les vacances ne sont pas sautées : la fiche dit de générer puis d’annuler ou supprimer les séances des jours fériés. Deux emplois du temps différents exigent deux générations. — [V](https://newdoc.openeducat.org/timetable/generate-timetable/)
- Code de l’assistant, branche `19.0`, modèle transitoire `generate.time.table`, méthode `act_gen_time_table` : boucle sur chaque jour entre `start_date` et `end_date` ; si le jour de la ligne égale le jour calendaire, création d’un `op.session` avec `faculty_id`, `subject_id`, `course_id`, `batch_id`, `classroom_id`, `start_datetime`, `end_datetime`. Aucun import d’un moteur (OR-Tools, Timefold, PuLP, algorithme génétique, CSP). Les lignes exigent enseignant et matière ; la salle est facultative sur le modèle. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/wizard/generate_timetable.py)
- Contraintes documentées, réglages OpenEduCat, quatre booléens : enseignant (pas deux séances du même enseignant au même moment), salle, batch + matière, batch (même groupe, matière différente). Le texte parle d’erreur de validation à la création, pas d’une recherche de solution. — [V](https://doc.openeducat.org/19.0/applications/timetable/constraint.html)
- Même tableau sur la doc timetable `newdoc` : Faculty, Classroom, Batch, Batch + Subject. Rôles : Timetable User (voir, marquer fait) et Timetable Manager (créer, générer, réglages). — [V](https://newdoc.openeducat.org/timetable/)
- Code `check_timetable_fields` sur `op.session`, branche `19.0` : les quatre clés `timetable.is_faculty_constraint`, `timetable.is_classroom_constraint`, `timetable.is_batch_and_subject_constraint`, `timetable.is_batch_constraint`. Chevauchement d’intervalles (`start < autre fin` et réciproque), donc deux séances bout à bout ne se bloquent pas. Les séances annulées sont ignorées. La recherche des autres séances est en `sudo()` pour voir au-delà des règles d’enregistrement. Aucune lecture de la capacité de la salle, d’un créneau d’indisponibilité, d’un équipement, ni d’un élève. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/models/timetable.py)
- Le modèle salle a bien un champ `capacity` (« No of Seats », obligatoire, supérieur à 0), plus un cours, un batch et des lignes d’équipement. Ce champ n’est pas consulté par le contrôle de séance lu. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_classroom/models/classroom.py)
- Commentaire dans le même fichier de séance : l’édition Enterprise assouplit `batch_id` (`required=False`) pour des séances hors batch. Ce commentaire décrit une variante absente du dépôt public ; il ne décrit pas un solveur. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/models/timetable.py)
- Matrice d’éditions : Community « builds timetables » (niveau BASIC). Enterprise « adds session planning/optimisation, lesson plans and per-subject study-material allocation ». Le mot optimisation n’est pas accompagné d’un algorithme, d’un nom de wizard différent, ni d’un jeu d’essai. — [V](https://openeducat.org/compare-editions/)
- Page glossaire de l’éditeur : « openeducat_timetable runs a constraint-satisfaction solver », « first-draft schedule in minutes for schools up to 60 classes », re-résolution des seuls créneaux touchés, règles du type « no PE last period ». Aucun nom d’algorithme, aucun protocole de mesure. Cette page contredit l’assistant documenté et le code `19.0`. — [V](https://openeducat.org/glossary/what-is-timetable-management-system/)
- Page `newdocs` « Configure Timetable Settings » : « Enable Auto-Generate Timetable », paramètres Optimization Level, Max Iterations (défaut 1000), Conflict Tolerance, contraintes dures et souples, indisponibilités d’enseignant, capacité et équipement des salles, maximum de matière par jour. Ces objets ne figurent pas dans les deux fichiers Python lus ni dans la page de contraintes `doc.openeducat.org`. — [V](https://newdocs.openeducat.org/settings/timetable/)
- Page marketing timetable : « constraint-aware », capacités, équipements, « suggests alternatives », synchronisation Google Calendar, Outlook, iCal, remplacements. La procédure en six étapes reste : définir les périodes, créer les séances, détecter les conflits, publier. Pas de nom d’algorithme. — [V](https://newdoc.openeducat.org/features/essential/timetable/)
- Les séances sont des enregistrements datés (`start_datetime`, `end_datetime`), états brouillon / confirmé / fait / annulé. Le jour affiché est calculé depuis la date. Ce n’est pas un modèle qui ne stocke qu’une semaine type. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/models/timetable.py)

### Inferences

- La génération communautaire est une copie calendaire d’une grille saisie. Les « contraintes » sont des garde-fous à l’enregistrement.
- Un conflit d’élève qui suit deux options dans deux batches différents n’est pas couvert par les quatre contrôles, qui comparent le batch, pas `student_ids`.
- La capacité de salle est une donnée de fiche, pas une règle de placement dans le code lu.
- « 60 classes » et « Max Iterations 1000 » ne sont pas des benchmarks. L’algorithme de génération, s’il en existe un hors du dépôt public, n’est pas établi.

### Gaps

- Tous les fichiers du module `openeducat_timetable` n’ont pas été ouverts, seulement l’assistant et le modèle de séance. Un contrôle de capacité pourrait exister dans un autre fichier ; rien dans la doc de contraintes `19.0` ne le nomme.
- Le code Enterprise du timetable n’est pas public. La phrase « session planning/optimisation » reste non spécifiée.
- Pas de nom d’algorithme, pas de jeu d’essai, pas de mesure publiée avec méthode.
- Indisponibilités d’enseignant, demi-groupes, groupes de langue, équipement obligatoire : absents des quatre booléens et des fichiers lus.
- iCal : cité sur une page marketing, pas dans le code lu.

## Modèle cours, batch, section, matière, option

### Takeaway

En Community, le grain est programme → cours → batch → matière. Une matière est obligatoire ou optionnelle, théorie ou pratique. Il n’y a pas de champ section, groupe de langue ni demi-groupe dans les modèles lus. La section est annoncée comme ajout Enterprise. L’emploi du temps se calcule au batch, puis devient une liste de séances datées.

### Cited Findings

- `op.course` : nom, code, cours parent, département, programme (`program_id`), matières en many2many, charge minimale et maximale (`min_unit_load`, `max_unit_load`), type d’évaluation `normal` / `GPA` / `CWA` / `CCE`. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/course.py)
- `op.batch` : code, nom, dates, cours. Pas de capacité, pas de section, pas de niveau scolaire. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/batch.py)
- `op.subject` : code unique, type `theory` / `practical` / `both` / `other`, `subject_type` `compulsory` ou `elective`, poids de note (`grade_weightage`), département. Pas de langue d’enseignement, pas de demi-groupe. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/subject.py)
- Matrice d’éditions, cœur : Community a étudiant, enseignant, cours, batch, programme, matière, département. Enterprise ajoute « configurable terminology, sections, board affiliation, academic plans, student badges, portals and dashboards ». — [V](https://openeducat.org/compare-editions/)
- Doc `newdocs` cours : Community aurait cours, matières, batches et inscription aux matières ; crédits, prérequis, curriculum et options seraient Enterprise. Cette ligne « options = Enterprise » contredit le champ `subject_type = elective` du code communautaire. — [V](https://newdocs.openeducat.org/courses/) ; [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/subject.py)
- Même site : workflow d’inscription (états brouillon, soumis, approuvé, rejeté), matières obligatoires figées, options choisies, et un assistant d’inscription de masse. Non relu dans le code `19.0`. — [V](https://newdocs.openeducat.org/courses/register-students/) ; [V](https://newdocs.openeducat.org/mass-registration/mass-subject-registration/)
- Fiche batch `newdocs` : capacité min/max du batch, « Section/Division », année scolaire, progression automatique. Le modèle `op.batch` lu n’a aucun de ces champs. — [V](https://newdocs.openeducat.org/admin/courses-batches/) ; [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/batch.py)
- Feuille de présence `19.0` : la feuille peut viser une séance (présence par matière) ou un batch pour la journée ; le texte dit que les élèves « of the section, or of the course and batch, or of the subject » sont ajoutés. Le champ section n’est pas dans `op.batch`. Plan académique affiché seulement si la fonction est activée. Compteurs présent, absent, absent excusé, retard. — [V](https://doc.openeducat.org/19.0/applications/Attendance/attendance-sheet.html)
- Exemples de l’assistant d’emploi du temps : « Bachelor of Computer Science » / batch `BCS-2025-A`, et un exemple « Grade 10 » / « Grade 10-A » avec les mêmes champs cours et batch. Le second exemple réutilise le modèle supérieur, il n’ajoute pas une classe K-12. — [V](https://newdoc.openeducat.org/timetable/generate-timetable/)

### Inferences

- L’optionnel communautaire est un attribut de matière, pas un mécanisme d’emploi du temps par élève.
- « Section » dans la doc de présence et dans la matrice Enterprise n’a pas de modèle dans les fichiers Community ouverts. L’édition réelle de la section n’est pas tranchée par le code public.
- Semaine type puis séances datées : oui, via l’assistant. Semaine type seule, sans dates : non, d’après le modèle de séance.

### Gaps

- Modèle d’inscription aux matières (`subject registration`) non ouvert dans le dépôt. Le workflow d’approbation reste [V], non confirmé [code].
- Groupes de langue, demi-groupes, alignements de LV : aucun champ trouvé dans les modèles lus, aucune page de procédure `19.0` qui les nomme.
- Pas de documentation lue qui distingue un emploi du temps de semaine type publié tel quel et la liste des séances datées. Le stockage lu est la séance datée.

## Examens, GPA, bulletins, convocations

### Takeaway

Le module `openeducat_exam` est dans le dépôt communautaire : sessions, épreuves, présents, relevé (total, pourcentage, lettre, réussi/échoué), fichier de convocation (`student_hall_ticket_report.py`). Le calcul GPA écrit dans la documentation `19.0` (points qualité / crédits) n’est pas dans `marksheet_line.py` communautaire. L’éditeur place GPA/CGPA, carnet central, CBCS, OBE et OMR en Enterprise uniquement. CBCS et OBE ne sont pas dans le code public.

### Cited Findings

- Sommaire examens `19.0` : types, salles, crédits de matière « GPA Calculation », sessions, épreuves, présents, modèle de résultat, registres de relevés, lignes de relevé, lignes de résultat. Le sommaire affiché ne liste pas une page « hall ticket ». — [V](https://doc.openeducat.org/19.0/applications/exam-main.html)
- Présents d’examen : élève, épreuve, présent ou absent, note, salle, remarque. — [V](https://doc.openeducat.org/19.0/applications/exam/exam-attendees.html)
- Registre de relevés : session, auteur, date, totaux réussi/échoué, modèle de résultat, relevés par élève (notes, pourcentage, grade, statut). — [V](https://doc.openeducat.org/19.0/applications/exam/marksheet-register.html)
- Page « Marksheet Lines » : GPA = points qualité / crédits de matière, lettre, crédit, points qualité, statut par matière. — [V](https://doc.openeducat.org/19.0/applications/exam/marksheet-details.html)
- Code communautaire `op.marksheet.line` : total des notes, pourcentage, lettre dérivée du pourcentage si `evaluation_type == 'grade'`, statut pass/fail si une ligne échoue. Pas de champ GPA, pas de points qualité, pas de crédits dans ce fichier. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_exam/models/marksheet_line.py)
- Le cours communautaire a une sélection `evaluation_type` incluant `GPA`, `CWA`, `CCE`. C’est un libellé sur le cours, pas le calcul décrit sur la page de relevé. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/course.py)
- Arbre `openeducat_exam` branche `19.0` : présents les fichiers `report/student_hall_ticket_report.py` et `report/student_marksheet.py`. Le contenu du rapport de convocation n’a pas été relu ; un commit ancien y met code de session, cours, élève, numéro de liste. — [code](https://github.com/openeducat/openeducat_erp/tree/19.0/openeducat_exam) ; [code](https://github.com/openeducat/openeducat_erp/commit/3432747ed339e11b4571d3dd8af7986be4ed60e1)
- Matrice : examens Community = BASIC (planification, notes, lettres, relevés). Enterprise ajoute le calcul GPA/CGPA et le versement dans le carnet central. Ligne séparée : carnet central, GPA, CBCS, OBE, OMR = Enterprise seulement, absent de Community. OBE y est décrit comme atteinte CO-PO pour l’accréditation. — [V](https://openeducat.org/compare-editions/)
- Fiche modules `newdoc` place les hall tickets dans `openeducat_exam`, sans bandeau Enterprise sur cette ligne. — [V](https://newdoc.openeducat.org/settings/modules/)
- OMR, quiz en ligne, anti-triche, surveillance à distance : Enterprise, absents du dépôt. — [V](https://openeducat.org/compare-editions/) ; [code](https://github.com/openeducat/openeducat_erp)

### Inferences

- La doc `doc.openeducat.org/19.0` mélange, sans étiquette d’édition, un relevé communautaire (pourcentage, lettre) et un GPA qui n’est pas dans le fichier communautaire correspondant. Le GPA calculé reste non établi pour Community.
- « Bulletin » au sens K-12 (appréciations, compétences du cycle) n’est pas le mot du produit. Le mot documenté est marksheet / relevé. Les commentaires de bulletin par IA sont revendiqués Enterprise, sans modèle lu. — [V](https://openeducat.org/compare-editions/)
- CBCS et OBE sont des dispositifs d’enseignement supérieur (crédits au choix, accréditation CO-PO), pas des bulletins de collège.

### Gaps

- CGPA (moyenne cumulative sur plusieurs sessions) : nommé seulement dans la matrice Enterprise. Aucune formule lue.
- Le XML de menu du hall ticket n’a pas été ouvert : le fichier de rapport est là, l’exposition à l’écran en 19.0 n’est pas confirmée (le sommaire doc ne le liste pas).
- Modèle de bulletin PDF (mise en page, compétences, rang) : non lu. `student_marksheet.py` existe, son gabarit n’a pas été ouvert.
- Pas de trace CBCS/OBE/OMR dans l’arbre communautaire.

## Portails et applications mobiles

### Takeaway

Community contient un module parents et un thème web. L’éditeur réserve le portail parents (présences, résultats, frais) à Enterprise. Des applications Android et iOS existent sur les boutiques au nom d’OpenEduCat Inc ; leur texte est commercial. Le mode hors ligne est affirmé par une page de l’éditeur, pas par le texte de fiche Play lu. Les applications ne sont pas dans le dépôt LGPL. La matrice les marque Enterprise.

### Cited Findings

- `openeducat_parent` et `theme_web_openeducat` sont dans l’arbre `19.0`. Pas de dossier `openeducat_parent_enterprise`. — [code](https://github.com/openeducat/openeducat_erp)
- Matrice : Community relie les parents aux élèves. Enterprise ajoute le portail (présences, résultats, frais), réunions et publipostage. Le résumé Enterprise répète « parent portal ». — [V](https://openeducat.org/compare-editions/)
- Fiche modules : `openeducat_parent_enterprise` = portail, suivi, messages, licence Enterprise. — [V](https://newdoc.openeducat.org/settings/modules/)
- Page `newdocs` parents : tableau qui donne le portail à Community et les notifications de frais à Enterprise. Contredit la matrice. — [V](https://newdocs.openeducat.org/parents/)
- Dépendances Apps Store du paquet `19.0` : Contacts, Employees, Website, Discuss, Invoicing, plus les modules Community listés plus haut, dont Parent. — [V](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)
- Google Play, paquet `com.inc.openeducat`, éditeur OpenEduCat Inc, fiche lue via la recherche : écoles, collèges, universités, présences, emploi du temps, frais, paiements, quiz, classes en direct, parents. Mise à jour indiquée 5 décembre 2025. Le texte de présentation lu ne dit pas « hors ligne ». — [tiers](https://play.google.com/store/apps/details?id=com.inc.openeducat)
- Agrégateur : version 1.7.2, mise à jour 5 décembre 2025, langues dont le français, environ 3 012 téléchargements au 16 octobre 2026. Chiffres d’agrégateur, pas de l’éditeur. — [tiers](https://chrome-stats.com/d/com.inc.openeducat)
- App Store, identifiant `1631506740` : fiche « University, College & School », iOS 14 ou ultérieur, texte du même ordre (emploi du temps, frais, parents, quiz). — [tiers](https://apps.apple.com/us/app/openeducat-educational-erp/id1631506740)
- Un agrégateur iOS (AppAdvice) affiche la version 2.0 mise à jour le 28 juillet 2022. Cette date peut être périmée par rapport à la fiche Apple courante, qui n’a pas été ouverte au-delà de l’extrait de recherche. — [tiers](https://appadvice.com/app/openeducat-educational-erp/1631506740)
- Page produit mobile : applications natives iOS et Android, mêmes comptes que le web, notifications, et une réponse FAQ qui décrit un cache hors ligne (emplois du temps, résumés de notes, historique de présences, documents, feuilles d’appel enseignant ressaisies au retour du réseau, le serveur gagne en cas de conflit). La même page dit que les apps sont sous licence, à part du code communautaire. Les montants ne sont pas repris ici. — [V](https://openeducat.org/feature-mobile-application/)
- Tableau « advanced » : ligne Mobile Apps = Enterprise, vide côté Community. — [V](https://newdoc.openeducat.org/features/advanced/)
- Ancienne application « OpenEduCat for Students v9 » (paquet Tech Receptives, menus conditionnés par les modules : bibliothèque, devoirs, emploi du temps). C’est une génération Odoo 9, pas la fiche Play de 2025. — [tiers](https://www.androidblip.com/android-apps/com.techreceptives.odoo.openeducat.v9.html)

### Inferences

- Le portail parents « complet » n’est pas établi pour Community. Le module `openeducat_parent` existe ; son écran n’a pas été lu.
- Le hors ligne est une description d’éditeur sur une page commerciale. Il n’est pas établi par le code public ni par le texte Play capturé.
- Les fiches de boutiques visent explicitement écoles, collèges et universités. Elles ne décrivent pas un client hors ligne ni un emploi du temps généré.

### Gaps

- Contenu réel des écrans parent et élève (Community et Enterprise) non parcouru.
- Écart de date entre AppAdvice (2022) et la fiche Apple courante : non tranché, la page Apple n’a pas été rechargée en entier.
- Pas de code mobile dans le dépôt. Pas de preuve que l’app Play parle au module communautaire auto-hébergé plutôt qu’à une instance hébergée par l’éditeur.

## Frais et passerelles de paiement

### Takeaway

`openeducat_fees` est communautaire et s’appuie sur la facturation Odoo. L’éditeur dit que Community facture et encaisse, et qu’Enterprise ajoute échéanciers, remboursements, bourses et paiement côté parent. Des pages nomment Stripe, PayPal et Razorpay, et une page marketing en annonce 19. Aucun module de passerelle n’est dans le dépôt communautaire. Aucune passerelle marocaine n’est nommée dans les pages lues. Le lien technique entre chaque nom et un module installable n’est pas établi.

### Cited Findings

- Dossier `openeducat_fees` présent en `19.0`. Pas de dossier stripe, razorpay ou paypal dans la liste des modules. — [code](https://github.com/openeducat/openeducat_erp)
- Apps Store : dépendance Invoicing (`account`). — [V](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)
- Matrice : frais Community « fully included » (structure, factures, encaissement). Enterprise : échéanciers, remboursements avec règles, bourses, visibilité et paiement parent. — [V](https://openeducat.org/compare-editions/)
- Page Stripe : bandeau « Enterprise Edition ». Encaissement de scolarité, examens, internat ; la page décrit un parcours portail → facture payée → écriture. Méthodes citées : cartes, Apple Pay, Google Pay, prélèvement SEPA, ACH, et des moyens locaux européens. — [V](https://openeducat.org/integrations/stripe/)
- Page Razorpay : bandeau « Enterprise Edition ». UPI, net banking, cartes, portefeuilles, liens SMS ou WhatsApp. Public indien (écoles, collèges, universités, NEP). — [V](https://openeducat.org/integrations/razorpay/)
- Index « 19 payment gateways » : Stripe, PayPal, Razorpay, Flutterwave, Mercado Pago, Xendit, Paymob, Mollie, Adyen, Authorize.Net, Worldline, Nuvei, Amazon Payment Services, DPO Pay, iyzico, Toss Payments, Redsys, AsiaPay, Buckaroo. Phrase de couverture mondiale, sans module ni capture d’écran par passerelle dans l’extrait lu. — [V](https://openeducat.org/integrations/payment-gateways/)
- Page frais : Stripe, PayPal, Razorpay, « regional gateways depending on your deployment region », et un circuit de virement avec preuve téléversée, sans passerelle. — [V](https://openeducat.org/feature-payment/)
- Page `newdocs` fournisseurs : tableau Stripe, PayPal, Razorpay, PayU, Authorize.net, et le geste « activer le paiement en ligne sur la structure de frais ». Pas d’étiquette d’édition sur l’extrait. — [V](https://newdocs.openeducat.org/settings/payment-providers/)

### Inferences

- Les noms répétés avec une page propre sont Stripe, PayPal et Razorpay. Stripe et Razorpay sont étiquetés Enterprise sur leur page. Les 16 autres noms de l’index sont une liste marketing tant qu’un module ou une procédure n’est pas montré.
- Odoo lui-même fournit des connecteurs de paiement. Rien de lu ne sépare un connecteur Odoo d’un connecteur écrit par OpenEduCat.
- Pas de CMI, Payzone, ni autre acquéreur marocain dans ces listes.

### Gaps

- Champs réels de `openeducat_fees` (échéances, bourses) non ouverts. L’écart Community / Enterprise sur les échéanciers repose sur la matrice, pas sur un diff de code Enterprise.
- Réconciliation automatique et reçu : décrits, non lus dans le code.

## Enseignement supérieur ou K-12

### Takeaway

Le produit historique et le code communautaire visent l’enseignement supérieur (programme, département, faculté, batch, charge d’unités, GPA/CWA/CCE, relevé, convocation d’examen, placement et mémoire revendiqués Enterprise). L’éditeur publie maintenant des pages « schools » et un exemple « Grade 10 » qui réutilisent les mêmes objets. Rien de lu ne modélise un cycle scolaire francophone (niveaux, classes, groupes de langue, demi-groupes, bulletin de compétences).

### Cited Findings

- Sélections du cours : GPA, CWA, CCE, charge d’unités, programme, département. Vocabulaire d’université ou de grande école, pas de cycle 1-2-3. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/course.py)
- Enterprise seulement, d’après la matrice : placement (recrutement, offres, appariement par compétence), mémoire (inscription, directeur, soutenance), convocation de cérémonie de diplôme, alumni. Ce sont des fonctions d’enseignement supérieur. — [V](https://openeducat.org/compare-editions/)
- Page K-12 sur `newdocs` : présence avec alertes parents, « simple gradebook (standards-based grading) », portail, cantine, infirmerie, discipline, transport. Scénario de discipline en cour de récréation. Pas de nom technique de module dans l’extrait, et ces dossiers ne sont pas dans l’arbre communautaire. — [V](https://newdocs.openeducat.org/features/for-k12-schools/)
- Exemple Grade 10 dans l’assistant : mêmes champs que la licence informatique (cours, batch, enseignant, matière, salle). — [V](https://newdoc.openeducat.org/timetable/generate-timetable/)
- Fiches Play et App Store : « schools, colleges and universities » dans le même paragraphe. — [tiers](https://play.google.com/store/apps/details?id=com.inc.openeducat) ; [tiers](https://apps.apple.com/us/app/openeducat-educational-erp/id1631506740)
- Paie marketing : contrats à l’année, paie à l’heure de crédit, grades d’enseignant, plans 403(b) et 457 (retraite américaine). Public universitaire nord-américain, pas un module du dépôt. — [V](https://newdoc.openeducat.org/features/erp/payroll/)

### Inferences

- Pour un collège ou un lycée francophone, le modèle utilisable sans développement est « un cours = un niveau ou une filière, un batch = une classe ». Ce repli n’est pas documenté comme un mode K-12 ; c’est une lecture du modèle supérieur.
- Les fonctions qui ressemblent à la vie scolaire K-12 (cantine, infirmerie, discipline, portail parents, carnet) sont soit Enterprise selon la matrice, soit seulement sur des pages `newdocs`, soit absentes du dépôt.

### Gaps

- Aucune page lue ne dit « ce module est réservé à l’université » ou « incompatible avec le primaire ». L’orientation supérieur est inférée du modèle et du vocabulaire, pas d’un avertissement d’éditeur.
- Arabisation, RTL, calendrier marocain, bulletins du ministère : non traités dans les sources lues pour cette fiche.

## Écarts admis et contradictions

### Takeaway

L’éditeur admet, dans sa matrice, que Community n’a pas le LMS, le carnet GPA/CBCS/OBE, l’internat, le transport, les alumni, le placement, le mémoire, le CRM, le portail parents complet, ni l’IA. La doc de l’assistant admet que les vacances ne sont pas exclues. Le reste des « manques » est une contradiction entre pages, ou un silence : pas un aveu.

### Cited Findings

- Matrice, résumé Community : pas d’IA, pas de LMS, pas de gradebook, pas d’internat, pas de transport, pas d’alumni. Quinze domaines sur vingt-huit seraient seulement Enterprise, dont quiz surveillés, classe virtuelle, communication de masse spécifique, QR anti-falsification, assistant de démarrage et marque blanche. Community = manuel pour la présence ; Enterprise ajoute reconnaissance faciale, kiosque, export Excel des absents. — [V](https://openeducat.org/compare-editions/)
- La même doc de présence `19.0` documente un kiosque (feuilles en état « Attendance Start ») sans dire Enterprise. La matrice dit le kiosque en Enterprise. — [V](https://doc.openeducat.org/19.0/applications/Attendance/attendance-sheet.html) ; [V](https://openeducat.org/compare-editions/)
- Assistant : les jours fériés produisent quand même des séances ; il faut les annuler ensuite. Les longues périodes créent beaucoup d’enregistrements. — [V](https://newdoc.openeducat.org/timetable/generate-timetable/)
- README communautaire annonce transport, internat, RH et paie. L’arbre `19.0` et la matrice disent le contraire pour l’internat et le transport. — [code](https://github.com/openeducat/openeducat_erp) ; [V](https://openeducat.org/compare-editions/)
- Glossaire solveur et page `newdocs` (itérations, contraintes souples) contredisent `constraint.html` et `generate_timetable.py`. — [V](https://openeducat.org/glossary/what-is-timetable-management-system/) ; [V](https://newdocs.openeducat.org/settings/timetable/) ; [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/wizard/generate_timetable.py)
- Santé : `newdocs` attribue un dossier médical de base à Community et vaccins, infirmerie, rapports à Enterprise. La matrice dit que Community n’a qu’un journal d’activités, et que dossiers de santé et discipline sont Enterprise. Pas de dossier `openeducat_health` dans l’arbre. — [V](https://newdocs.openeducat.org/health/) ; [V](https://openeducat.org/compare-editions/) ; [code](https://github.com/openeducat/openeducat_erp)
- Multi-campus : l’en-tête de la ligne 15 dit la gestion multi-campus « fully included » des deux côtés ; le détail dit que Community liste salles et équipements, et qu’Enterprise ajoute campus et multi-sites. La feuille de présence a un champ société « when several companies are managed », ce qui est le multi-société Odoo. — [V](https://openeducat.org/compare-editions/) ; [V](https://doc.openeducat.org/19.0/applications/Attendance/attendance-sheet.html)
- Article « OpenEduCat 18.0 » : examens avec capacité de salle et détection de conflits, frais en échéances, portail étudiant mobile. Billet d’annonce, sans procédure. La capacité de salle en examen n’a pas été relue dans le code. — [V](https://openeducat.org/articles/openeducat-18-whats-new/)

### Inferences

- Les seuls manques que l’éditeur formule clairement sont ceux de la matrice Community / Enterprise, plus le traitement manuel des vacances dans l’assistant.
- Trois sites de doc (`doc`, `newdoc`, `newdocs`) ne décrivent pas le même produit. `newdocs` est la source la moins alignée avec le code `19.0`.

### Gaps

- Pas de journal de versions 2024-2026 qui décrive, pas à pas, un changement de comportement de l’emploi du temps. L’article 18.0 ne nomme pas de solveur.
- Code Enterprise non public : tout ce qui est « Enterprise fully included » reste une affirmation d’éditeur.

## Fiche fonction par fonction

Chaque ligne : ce qui est documenté, l’édition, ce qui ne l’est pas. Les tags sont en tête de puce.

### Admissions

- [code](https://github.com/openeducat/openeducat_erp) Module `openeducat_admission` dans l’arbre `19.0`.
- [V](https://openeducat.org/compare-editions/) Community : dépôt des candidatures, étapes, conversion en élève inscrit. Enterprise en plus : signature électronique des offres, constructeur de formulaire, admission par matière, envoi de masse, suivi, création automatique du carnet.
- Non documenté dans les pages lues : pièces du dossier à la marocaine, liste d’attente chiffrée, critères de sélection automatiques, lien avec un calendrier d’orientation.

### Élèves et parents

- [code](https://github.com/openeducat/openeducat_erp) `openeducat_core` et `openeducat_parent` communautaires. Le détail des champs élève n’a pas été ouvert.
- [V](https://openeducat.org/compare-editions/) Fiche élève, enseignant, cours, batch, programme, matière, département : les deux éditions. Portail parents complet : Enterprise, selon cette matrice.
- [V](https://newdocs.openeducat.org/parents/) Contredit la matrice en donnant un portail à Community.
- Non établi : ce que le parent Community voit vraiment. Groupes de fratrie au-delà du lien parent-élèves : non lu.

### Présences

- [code](https://github.com/openeducat/openeducat_erp) `openeducat_attendance` communautaire.
- [V](https://doc.openeducat.org/19.0/applications/Attendance/attendance-sheet.html) Feuille par date, par séance (matière) ou par batch (journée). États brouillon, prise en cours, prise, annulé. Présent par défaut, puis correction. Absent, absent excusé, retard. Kiosque mentionné sans édition.
- [V](https://openeducat.org/compare-editions/) Community = saisie manuelle. Enterprise = visage, kiosque, Excel des absents. Contradiction avec la page kiosque ci-dessus.
- Non documenté : appel par QR, seuil légal d’absentéisme, motif lié à un emploi du temps de demi-groupe. Le code de séance a des `student_ids` ; le contrôle de conflit ne s’en sert pas. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/models/timetable.py)

### Examens et carnets

- Voir la section examens. Community : module examen, relevé pourcentage et lettre, fichier de convocation dans l’arbre. — [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_exam/models/marksheet_line.py)
- [V](https://openeducat.org/compare-editions/) GPA/CGPA, carnet unique, CBCS, OBE, OMR : Enterprise, absents du dépôt.
- [V](https://doc.openeducat.org/19.0/applications/exam/marksheet-details.html) Décrit un GPA qui n’est pas dans le fichier communautaire. À ne pas compter comme capacité Community.
- Non documenté : bulletin de compétences K-12, rang de classe, jury, rattrapage, session de remplacement. Salles d’examen : la doc a une configuration de salles ; un placement automatique des candidats n’a pas été lu.

### Frais

- Voir la section passerelles. Module communautaire + facturation Odoo. Échéanciers, bourses, paiement parent : Enterprise selon la matrice. — [V](https://openeducat.org/compare-editions/)
- Passerelles nommées avec page : Stripe, PayPal, Razorpay. Liste marketing de 19 noms. Aucune dans le dépôt. Pas de passerelle marocaine lue.
- Non documenté : bourse d’État, tarif par enfant, réduction fratrie, lettrage avec une comptabilité publique.

### Emploi du temps

- Community : assistant de copie hebdomadaire vers séances datées, quatre anti-chevauchements. Pas de solveur dans le code lu. Voir la première section.
- [V](https://openeducat.org/compare-editions/) Enterprise : « session planning/optimisation », fiches de leçon, documents par matière. Algorithme non décrit.
- Non établi : capacité, indisponibilité, équipement, charge maximale, préférences, conflit par élève, groupes de langue, demi-groupes, vacances automatiques, benchmark.

### Réservation de salles

- [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_classroom/models/classroom.py) Fiche salle : nom, code, cours, batch, nombre de places, équipements, actifs. Module `openeducat_classroom` et `openeducat_facility` communautaires.
- [code](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/models/timetable.py) Anti-double réservation si l’interrupteur salle est actif, par chevauchement d’horaires. La capacité n’entre pas dans ce contrôle.
- [V](https://openeducat.org/compare-editions/) Community : catalogue de salles et d’équipements. Enterprise : campus, multi-sites, demandes de matériel. L’en-tête de la même ligne dit aussi le multi-campus des deux côtés. Édition du multi-campus : contradictoire sur une seule page.
- Non documenté : calendrier de réservation hors cours (clubs, examens, location), validation par le responsable de salle, conflit avec la capacité.

### Bibliothèque

- [code](https://github.com/openeducat/openeducat_erp) `openeducat_library` communautaire. Champs non ouverts.
- [V](https://openeducat.org/compare-editions/) Community : catalogue, adhérents, prêt, codes-barres. Enterprise : douchette et bibliothèque numérique.
- Non lu : durée de prêt, pénalités, réservation d’ouvrage, périodiques. À ne pas inventer à partir du nom du module.

### LMS et devoirs

- [code](https://github.com/openeducat/openeducat_erp) `openeducat_assignment` communautaire. Pas de dossier LMS ni quiz.
- [V](https://openeducat.org/compare-editions/) Devoirs Community : création, dépôts, note chiffrée. Enterprise : annotation, barème, plusieurs tentatives, retard, lien au carnet. LMS (cours en ligne, SCORM, H5P, forums, ludification, vente de cours) : Enterprise seulement. Quiz et classe virtuelle : Enterprise seulement.
- Non documenté côté Community : banque de questions, parcours, suivi SCORM. La fiche Play en parle au conditionnel commercial, pas comme un module du dépôt. — [tiers](https://play.google.com/store/apps/details?id=com.inc.openeducat)

### Internat

- [V](https://openeducat.org/compare-editions/) Enterprise seulement : chambres, attribution, entrées et sorties, visiteurs, laissez-passer. Absent du dépôt. — [code](https://github.com/openeducat/openeducat_erp)
- Le README communautaire qui l’annonce est contredit par l’arbre et par la matrice.
- Non documenté : règlement intérieur, facturation des nuitées au-delà de la phrase « hostel charges » sur la page Stripe. Public plutôt campus universitaire ou pensionnat ; pas de spécification K-12.

### Transport

- [V](https://openeducat.org/compare-editions/) Enterprise seulement : lignes, véhicules, arrêts, attribution des élèves. Absent du dépôt.
- Non documenté : optimisation de tournée, suivi GPS, correspondant de car. La matrice ne le dit pas.

### Cantine

- [V](https://newdocs.openeducat.org/features/management/canteen/) Page marketing : menus, caisse, portefeuille, forfaits, lien frais et comptabilité, allergènes. Pas de nom technique de module, pas de ligne dans la matrice des 28 domaines, pas de dossier dans le dépôt.
- Édition : [?]. Existence d’un module livré : non établie. Ne pas traiter cette page comme une fonction vérifiée.

### RH et paie

- [V](https://apps.odoo.com/apps/modules/19.0/openeducat_erp) Dépendance Odoo Employees (`hr`), pas un module Paie OpenEduCat.
- [code](https://github.com/openeducat/openeducat_erp) Pas de dossier paie. Des commits anciens montraient un assistant « créer l’employé depuis l’enseignant » ; ce fichier n’a pas été relu en `19.0`.
- [V](https://newdoc.openeducat.org/features/erp/payroll/) Page marketing : paie à l’heure de crédit, grades, 403(b). Pas un mode d’emploi, pas un module public. La paie Odoo elle-même n’a pas été inventoriée ici.
- Non établi : bulletins de paie, déclarations, vacataires payés à la séance.

### Comptabilité

- [V](https://apps.odoo.com/apps/modules/19.0/openeducat_erp) Dépendance Invoicing. Pas de module comptable OpenEduCat dans l’arbre.
- [V](https://openeducat.org/compare-editions/) La ligne frais parle de factures et d’encaissement, pas d’un plan comptable scolaire.
- La comptabilité analytique, la trésorerie et les états financiers sont ceux d’Odoo, non relus. Non documenté ici : engagement, budgets par établissement, export pour un expert-comptable marocain.

### Documents

- [V](https://openeducat.org/compare-editions/) « Document security » Enterprise : QR sur certificats et relevés pour vérification. Pas dans le dépôt.
- [V](https://newdoc.openeducat.org/features/advanced/) Liste marketing : GED, signature, circuits d’approbation, en Enterprise dans le tableau de cette page.
- [code](https://github.com/openeducat/openeducat_erp/commit/d91b25eed92eedd28eccd880bcc40f9e45e7c3e1) Commits anciens : rapports carte d’étudiant et certificat de scolarité dans `openeducat_core`. Présence de ces rapports dans l’arbre `19.0` actuel : non recontrôlée fichier par fichier.
- Non documenté : parapheur, dossiers d’orientation, archivage légal.

### Discipline

- [V](https://openeducat.org/compare-editions/) Enterprise, dans le bloc « student welfare » : discipline, réclamations, congés, mentorat, feedback, compétences, départ. Community : « basic activity log » seulement (`openeducat_activity` est le seul dossier proche dans le dépôt).
- [V](https://newdocs.openeducat.org/features/for-k12-schools/) Scénario narratif (incident de cour, notification parents). Pas une procédure.
- Non établi comme fonction Community. Pas de barème d’heures de retenue, pas de conseil de discipline décrit dans une doc de procédure lue.

### Santé

- Contradiction : matrice Enterprise contre page `newdocs` qui attribue un dossier de base à Community. Pas de module dans le dépôt. Voir la section écarts.
- Non établi : carnet vaccinal, infirmerie, PAI, visites médicales. Ne pas choisir la page `newdocs` contre la matrice et le dépôt.

### Alumni

- [V](https://openeducat.org/compare-editions/) Enterprise : fiches de diplômés, événements, offres d’emploi, blog. Absent du dépôt. Fonction d’enseignement supérieur.
- Non documenté : cotisations, annuaire public, réseau par promotion au-delà de cette phrase.

### Placement

- [V](https://openeducat.org/compare-editions/) Enterprise : campagnes, offres, appariement par compétence. Absent du dépôt. Fonction d’université ou d’école professionnelle, pas de collège.
- Non documenté : conventions de stage, tuteur, évaluation de stage. Le mot lu est placement / job, pas stage en alternance.

### Helpdesk

- Aucune page primaire ouverte qui décrive un module helpdesk OpenEduCat. Odoo a son propre helpdesk, non inventorié ici.
- [? ] Existence d’un helpdesk scolaire (tickets parents, SLA) : non établie. Ne pas la compter.

### Application mobile

- Voir la section portails. Fiches Play (mise à jour 5 décembre 2025) et App Store (iOS 14+). Texte commercial écoles / collèges / universités. Hors ligne : page éditeur seulement. Édition : tableau advanced = Enterprise ; absente du dépôt LGPL.
- Non établi : fonctionnement avec une base Community auto-hébergée, mode dégradé, emploi du temps modifiable depuis le téléphone.

### Portail parents

- Module de fiches en Community. Portail présences / notes / frais : Enterprise selon la matrice, Community selon `newdocs`. Non tranché par le code, le modèle portail n’ayant pas été lu.
- [V](https://openeducat.org/compare-editions/) Le cœur Enterprise ajoute « portals and dashboards » en plus des fiches.

### Multi-campus

- [V](https://doc.openeducat.org/19.0/applications/Attendance/attendance-sheet.html) Champ société sur la feuille de présence quand plusieurs sociétés sont gérées. C’est le multi-société Odoo, pas un objet « campus » vu dans le dépôt.
- [V](https://openeducat.org/compare-editions/) Même ligne : en-tête « multi-campus » des deux côtés, détail « campus et multi-sites » en Enterprise. Édition ambiguë.
- Non documenté : emploi du temps partagé entre sites, enseignant volant, consolidation d’un groupe scolaire sans passer par les sociétés Odoo.

### Activités

- [code](https://github.com/openeducat/openeducat_erp) `openeducat_activity` est le module communautaire le plus proche du « journal » cité par la matrice. Son contenu n’a pas été ouvert. Ne pas le décrire comme un module périscolaire.

## Sources principales

- Dépôt, branche par défaut 19.0, LGPL-3, modules listés le 17 novembre 2026 : [github.com/openeducat/openeducat_erp](https://github.com/openeducat/openeducat_erp)
- Assistant et contraintes : [generate_timetable.py](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/wizard/generate_timetable.py), [timetable.py](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/models/timetable.py)
- Modèle académique : [course.py](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/course.py), [batch.py](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/batch.py), [subject.py](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/subject.py), [classroom.py](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_classroom/models/classroom.py), [marksheet_line.py](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_exam/models/marksheet_line.py)
- Doc procédurale 19.0 : [générer](https://doc.openeducat.org/19.0/applications/timetable/generate-session.html), [contraintes](https://doc.openeducat.org/19.0/applications/timetable/constraint.html), [relevé](https://doc.openeducat.org/19.0/applications/exam/marksheet-details.html), [présences](https://doc.openeducat.org/19.0/applications/Attendance/attendance-sheet.html)
- Éditeur : [matrice d’éditions](https://openeducat.org/compare-editions/), [assistant newdoc, janvier 2026](https://newdoc.openeducat.org/timetable/generate-timetable/), [Apps Store 19.0](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)
