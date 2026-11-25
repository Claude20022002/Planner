# Parité avec OpenEduCat, et au-delà

17 novembre 2026. Décision du chef : « il faut que l'on ait ce qu'ils ont, et bien plus, et que ça fonctionne beaucoup mieux », en **français, anglais et arabe**. Source : l'étude [11-etude-openeducat.md](../etude-marche/11-etude-openeducat.md).

Ce document ne remplace pas les fichiers de module. Il sert de **table de correspondance** : chaque domaine d'OpenEduCat (éditions Community et Enterprise) renvoie à la fonction de Planner qui le couvre. Une fonction de parité n'est « faite » que si elle tient aussi l'exigence EP-17 (§ 3).

Légende : ✅ existe · 🟡 partiel · 📋 prévu · ⏸ reporté · ❌ écarté (avec la raison).

## 1. Correspondance

| Domaine d'OpenEduCat | Édition chez eux | Planner | Ce que Planner fera en plus |
|---|---|---|---|
| Emploi du temps | Community « basic » : recopie d'une semaine ; Enterprise : solveur annoncé | ✅ solveur (MOT), contraintes déclarées (MOT-13) ; 📋 MOT-03 à MOT-11, EDT-01 à EDT-05 | calcul réel, chaque refus expliqué (EP-4), contrôles toujours actifs (EP-14), report suivi, remplaçant (MOT-09) |
| Équipements, salles | Community | 🟡 salles et réservations ; 📋 **EDT-07** | le besoin d'équipement d'une séance est tenu par le moteur (MOT-11) |
| Examens, convocations | Community, Enterprise | ✅ sessions, salles, surveillances ; 📋 **EDT-06**, MOT-11 | examens placés par le moteur |
| Présences | Community manuel ; Enterprise biométrie, kiosque | ✅ appel par QR code ; 📋 VSC-03 | appel en un geste, anti-fraude, sans donnée biométrique ; ❌ biométrie (CNDP, décision du 17 nov.) |
| Dossier élève, parents | Community ; portail parents en Enterprise | 🟡 ; 📋 VSC-02, ADM-05, COM-02, MOB-05 | compte famille, plusieurs enfants, canal préféré |
| Admission | Community ; en ligne en Enterprise | 📋 INS-01 à INS-03, **INS-04** | candidat accepté sans ressaisie, suivi des sources de prospects |
| Notes, bulletins | Community « basic » ; carnet et GPA en Enterprise | 📋 VSC-04, **VSC-10** | note absente distincte de zéro, verrouillage, avancement de la saisie, crédits et LMD |
| Passage d'année | Enterprise | 📋 ADM-06 | en moins d'une demi-journée (EP-8) |
| Choix des options | Enterprise (inscription aux matières) | 📋 **VSC-12** | les choix forment les groupes du moteur |
| Discipline | Enterprise | 📋 **VSC-13** | famille prévenue par COM, durée de conservation fixée |
| Santé | Enterprise | 📋 **VSC-08**, facultatif | éteint par défaut, ouvert après le dossier CNDP de l'école |
| Activités, clubs | Community | 📋 **VSC-09** | créneaux placés sans conflit avec les cours |
| Mémoires, thèses | Enterprise | 📋 **VSC-11** | soutenance placée sans conflit |
| Devoirs | Community | 🟡 code éteint ; 📋 COU-02, COU-03, COU-06 | revue de sécurité des fichiers avant ouverture |
| Annonces | Enterprise | 🟡 code éteint ; 📋 **COU-12**, COU-05 | ciblage et accusé de lecture |
| Cahier de textes, progression | Enterprise (plans de leçon) | 📋 **COU-13** | rempli depuis la séance de l'emploi du temps |
| LMS, cours en ligne | Enterprise | 📋 **COU-10** | lié aux classes et à l'emploi du temps |
| Classe virtuelle | Enterprise | 🟡 lien de visio ; 📋 **COU-11** | salle créée avec la séance, présence relevée |
| Quiz en ligne | Enterprise | ✅ Studio quiz, quiz en direct, jeux ; 📋 **QJE-10** | quiz en direct et jeux, qu'ils n'ont pas |
| Correction par scan (OMR) | Enterprise | 📋 **QJE-11** | avec le téléphone, sans scanner |
| IA | annoncée, édition non dite | 🟡 ; 📋 QJE-07, BIB-04, **QJE-12** ; tuteur **QJE-13** conditionnel | aucune donnée d'élève envoyée (§ 5 du README) |
| Bibliothèque physique | Community | 📋 **BIB-05** | prêts par QR code depuis le téléphone |
| Bibliothèque numérique | Enterprise | ✅ StudyLib ; 📋 BIB-02 | |
| Frais, facturation | Community ; échéanciers et bourses en Enterprise | 📋 FIN-01, FIN-02, **FIN-04** | reçus bilingues sans trou, paiement par famille |
| Comptabilité, paie | par Odoo | 📋 **FIN-05**, RHP-01 à RHP-03, **RHP-04** | ❌ comptabilité générale et paie construites par nous (décision du 17 nov.) : export et échange relus, avec Odoo et les logiciels marocains |
| Passerelles de paiement | Enterprise (19, sans CMI) | 📋 PAI-01, PAI-02 ; ⏸ PAI-03 | CMI d'abord ; rapprochement bancaire |
| Communication de masse, WhatsApp | Enterprise | 📋 COM-01, COM-03 | plages de silence, résumé quotidien (EP-7) |
| Réunions parents-enseignants | Enterprise | 📋 **COM-05** | créneaux sans conflit avec l'emploi du temps |
| Assistance (tickets) | Odoo | 📋 **COM-04** | guichet des familles et des enseignants |
| CRM | Odoo | 📋 INS-01, **INS-04** | |
| Transport | Enterprise | 📋 SER-01, **SER-02** | familles prévenues d'un retard |
| Internat | Enterprise | 📋 SER-01, **SER-03** | |
| Cantine | non décrite | 📋 SER-01 | aucun refus d'accès pour impayé |
| Stocks, achats | Odoo | 📋 STK-01 | |
| Stages, placement | Enterprise | 📋 STA-01, STA-02 | |
| Anciens élèves | Enterprise | 📋 **STA-03** | |
| Certificats, documents | Community, Enterprise | 📋 DOC-01, DOC-02 | code de vérification public |
| Rapports | Community (tableaux d'Odoo), rapports dynamiques | ✅ statistiques de planning ; 📋 **PIL-03** | |
| Tableaux de bord | Enterprise | 📋 PIL-01, PIL-02 | |
| Plusieurs campus, plusieurs écoles | Enterprise, multi-société d'Odoo | 🟡 campus ; 📋 PLA-01 à PLA-07 ; ⏸ GRP-01, GRP-02 | rien ne passe d'une école à l'autre (EP-12) |
| Personnalisation | code ouvert, Odoo Studio | 📋 ADM-02, **ADM-10** | champs propres à l'école, sans code |
| Application mobile | Android et iOS payants | 🟡 étudiants ; 📋 MOB-02, MOB-05, MOB-06, **MOB-09** | hors ligne, ouverture en moins de 2 s (EP-3) |
| Langues | annoncées, messages en anglais dans le code | 🟡 français, 🟡 anglais ; 📋 UIX-04, **UIX-07**, **UIX-08** | trois langues complètes, aucun texte en dur (EP-16) |
| Massar | « export compatible », sans format | 📋 ETA-01, ETA-02 | export au format accepté (EP-5) |
| Données envoyées à l'éditeur | envoi quotidien caché | 📋 QUA-09 | aucun envoi caché (EP-13, PR #189) |

En **gras** : les fonctions ajoutées le 17 novembre.

## 2. Ce qui change dans le plan

- **31 fonctions nouvelles**, dans 15 modules. Elles sont rangées en **étape 5** ou en **« libre »** ; les étapes 1 à 4 ne changent pas (décision du 17 nov.).
- **Cinq fonctions reportées passent « à faire » en étape 5** : SER-01, STK-01, PIL-01, PIL-02, STA-02.
- **Restent reportées** : PAI-03 (argent mobile, pour l'Afrique subsaharienne, après PLA-13), GRP-01 et GRP-02 (après PLA-11), COU-09 (LTI).
- **Langues** : français, anglais et arabe, toutes trois complètes. Aucune autre langue d'interface n'est prévue.
- **Écartés** : la présence biométrique, la comptabilité générale et la paie construites par Planner.
- **Conditionnels** : le tuteur IA pour l'élève (QJE-13), la santé tant que l'école n'a pas son dossier CNDP (VSC-08).
- **Environ 87 jours bruts de plus**, plus 13 pour les fonctions qui reprennent. Ce sont des estimations avant conception, à multiplier par 1,5 à 2 comme les autres.

## 3. « Beaucoup mieux » : quatre exigences nouvelles

Elles s'ajoutent au § 6 du [README](README.md) (EP-13 est prise par la liste des envois sortants, PR #186 et #189).

| N° | Exigence | Mesure | Pourquoi |
|---|---|---|---|
| EP-14 | Contrôles toujours actifs | aucune règle de conflit ou de sécurité livrée ne s'éteint par un réglage ; seul un forçage tracé et justifié la contourne | chez OpenEduCat, les contrôles de conflit sont éteints par défaut |
| EP-15 | Aucune route ouverte par erreur | la liste des routes sans connexion est écrite ; un test échoue si une route nouvelle n'exige pas de connexion sans figurer dans la liste | OpenEduCat a laissé la saisie des présences ouverte sans connexion |
| EP-16 | Trois langues, aucun texte en dur | tout texte montré (écran, erreur du serveur, PDF, notification) passe par la traduction ; UIX-08 le vérifie dans la CI | chez OpenEduCat, des messages ne peuvent pas être traduits |
| EP-17 | Mieux, et mesuré | une fonction qui a un équivalent chez OpenEduCat a un parcours chronométré (temps, nombre de clics) dans son critère de « terminé » ; il est comparé au même parcours dans OpenEduCat Community quand l'essai du plan 08 l'a mesuré | « mieux » doit se prouver, pas se dire |

## 4. Ordre conseillé dans l'étape 5

Il suit les dépendances et ce qu'une école privée demande d'abord. Il n'engage pas les chantiers, que le chef ouvre.

1. Après VSC-02 et VSC-04 : VSC-12, VSC-13, EDT-06, FIN-04.
2. Après COM-01 et COM-02 : COM-04, COM-05, SER-01, SER-02.
3. Ensuite : COU-10, QJE-10, QJE-11, VSC-10, PIL-03, ADM-10.
4. Le reste selon la demande des écoles (entretiens de VEN-02).

En **« libre »**, à prendre à tout moment : UIX-07, UIX-08, BIB-05, EDT-07, COU-12, COU-13, QJE-12.
