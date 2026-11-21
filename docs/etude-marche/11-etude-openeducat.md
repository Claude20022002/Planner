# OpenEduCat : étude complète et comparatif avec Planner

17 novembre 2026. Demande du chef de projet : « une étude complète d'OpenEduCat et un comparatif avec Planner ». Rédigée par Claude Code (Opus 5.5).

Ce document rassemble ce que le dépôt sait déjà d'OpenEduCat et y ajoute ce qui a été vérifié aujourd'hui dans le code public. Il s'appuie sur :
- le comparatif fonction par fonction du 15 novembre, [07-comparatif-odoo.md](07-comparatif-odoo.md) ;
- le plan d'essai, [08-plan-essai-openeducat.md](08-plan-essai-openeducat.md) ;
- la note de recherche [research_notes/Failles des ERP scolaires/openeducat.md](<research_notes/Failles des ERP scolaires/openeducat.md>) (avis, prix, contradictions de l'éditeur) ;
- deux études qui ne sont pas encore sur `main` : `09-failles-erp-scolaires.md` (PR #186) et `10-comparatif-openeducat-planner.md` (branche `etude/openeducat-comparatif`, écrite par une autre session le même soir).

**Ce qui est nouveau ici** (§ 4) : la fenêtre qui demandait un avis G2 dans le produit, les contrôles de conflit éteints par défaut, un point d'accès des présences ouvert sans connexion (correctif proposé hier, pas encore accepté), l'activité du dépôt en 2026, et la société derrière le produit.

## 0. Méthode et limites

- **Rien n'a été installé.** L'essai reste celui du plan 08, pas encore lancé.
- **Le code de l'édition libre a été lu** sur GitHub le 17 novembre (`openeducat/openeducat_erp`, branche `19.0` et, pour comparer, `16.0` à `20.0`). C'est la preuve la plus solide du document.
- **L'édition Enterprise est fermée.** Tout ce qui la concerne vient des pages de l'éditeur.
- **Planner** est lu sur `origin/main` au 16 novembre (`bd934ebf`) et dans `docs/plan/suivi.md`.
- Niveaux de preuve :
  - **[CODE]** : lu dans le code public, avec la branche ;
  - **[DÉPÔT]** : ticket, PR ou historique du dépôt ;
  - **[V]** : page de l'éditeur, donc une affirmation commerciale ;
  - **[AVIS]** : avis d'utilisateurs ;
  - **[?]** : non établi.

## 1. En dix constats

1. **OpenEduCat est un ERP scolaire posé sur Odoo**, édité depuis 2014 par une société indienne d'environ 50 personnes. Il couvre beaucoup plus de domaines que Planner : dossier élève, admission, frais, notes, bibliothèque, et en payant le LMS, le transport et le portail des parents.
2. **Son édition libre ne génère pas d'emploi du temps** [CODE]. L'assistant recopie sur des dates une semaine saisie à la main. Le « solveur de contraintes » est annoncé sur le site, mais il n'est pas dans le code libre, et rien ne prouve qu'il existe dans l'Enterprise.
3. **Ses contrôles de conflit sont éteints par défaut** [CODE]. Ils ne sont allumés que dans les données de démonstration : une démonstration les montre, une vraie installation ne les a pas tant que l'administrateur ne les coche pas.
4. **Un point d'accès des présences est ouvert sans connexion** sur toutes les branches, de 16.0 à 20.0 [CODE]. Un correctif a été proposé le 16 novembre 2026 après un signalement privé. Il n'est pas encore accepté.
5. **Le produit demandait un avis G2 aux utilisateurs**, de juillet 2023 à avril 2026 [DÉPÔT]. Une fenêtre s'ouvrait cinq secondes après la connexion, une fois par semaine. Les 154 avis G2 (4,6 sur 5) ne sont donc pas un échantillon spontané. Capterra n'en a que 4 (3,8 sur 5).
6. **L'édition libre envoie chaque jour à l'éditeur** le nom, l'e-mail et le téléphone de l'école, l'adresse du site, le nombre d'utilisateurs et la liste des modules [CODE]. La tâche est cachée de la liste des tâches planifiées. Un ticket qui le signalait a été fermé sans réponse.
7. **Le prix réel est un empilement** : un cœur obligatoire, puis un prix par module, un pack d'utilisateurs, les deux applications mobiles et des heures de service. Un panier proche de ce que vise Planner revient à environ 4 700 $ par an, plus environ 2 200 $ de mise en route (§ 5).
8. **Le Maroc est un argumentaire, pas une intégration prouvée.** Massar se limite à un « export compatible » sans format publié. CMI est absent de la liste des passerelles de paiement Enterprise. Une partie des messages ne se traduit pas en arabe ni en français [DÉPÔT]. Aucune école marocaine cliente n'est nommée.
9. **Le projet est vivant** : 15 commits sur la branche 19.0 depuis avril 2026, une branche 20.0 active depuis octobre, des tests ajoutés en juillet. Mais une seule personne a fait près de la moitié des contributions des dix premiers contributeurs.
10. **Pour Planner, OpenEduCat est à la fois un concurrent et une référence.** Il est très en avance en largeur. Planner est en avance sur l'emploi du temps, avec un vrai solveur, le circuit des reports et l'appel par QR code. Planner n'a encore ni vie scolaire ni frais, n'a aucun client extérieur, et son solveur n'a pas encore tenu à grande échelle (§ 6.3).

## 2. L'éditeur

| Point | Ce qu'on sait | Preuve |
|---|---|---|
| Société | OpenEduCat Inc. Fondée en 2014 selon le site, en 2012 selon LinkedIn | [V] [page « À propos »](https://openeducat.org/about/) |
| Dirigeants | Parthiv Patel (fondateur et directeur général), Neha Patel (cofondatrice) | [V] même page |
| Taille | « 50+ employés » selon le site ; 11 à 50 selon LinkedIn | [V] |
| Siège | Ahmedabad (Inde) sur le site ; Claymont, Delaware (États-Unis) pour OEC.sh, son outil de déploiement | [V] [FAQ d'OEC.sh](https://oec.sh/faq) |
| Clientèle annoncée | « 1000+ établissements », « 3M+ utilisateurs », « 90+ pays » ; ailleurs sur le site, « 4 500+ » écoles pour l'emploi du temps et « 12 000+ » pour les examens. Les chiffres ne se recoupent pas | [V] [page « À propos »](https://openeducat.org/about/), [emploi du temps](https://openeducat.org/solutions/timetable-management-system/) |
| Clients nommés | Lagos Business School et Mudiame University (Nigeria) sur la page des prix. Aucun au Maroc | [V] [tarifs](https://openeducat.org/pricing/) |
| Application Android | « OpenEduCat - Educational ERP », **plus de 1 000 téléchargements** : peu, face aux « 3M+ utilisateurs » annoncés | Google Play, 17 nov. |
| Autre produit | OEC.sh : outil de déploiement d'Odoo sur ses propres serveurs, gratuit pour 1 serveur, puis de 19 à 249 $ par mois. Il n'héberge rien | [V] [FAQ d'OEC.sh](https://oec.sh/faq) |
| Contributeurs du code | 913 étoiles, 792 copies (forks). Le premier contributeur (`parthivgls`) a fait 450 des 956 contributions des dix premiers | [DÉPÔT] |

Le site est très chargé en pages de référencement générées par pays et par type d'établissement. On y lit par exemple « Logiciel de gestion University en Morocco » [V]. Elles décrivent des conformités (loi 09-08, ANEAQ, OFPPT) sans les démontrer.

## 3. Le produit

### 3.1 Socle technique

- **Pile** : modules Odoo (Python, PostgreSQL). La branche par défaut est 19.0. Des branches existent de 2.0 à 20.0. La branche 20.0 reçoit des commits depuis octobre 2026 (traductions, icônes, rapports) [DÉPÔT].
- **Licence** : LGPL v3 pour l'édition libre [CODE, fichier LICENSE]. L'Enterprise est fermée.
- **Hébergement** : sur ses propres serveurs, sur Odoo.sh, ou dans le cloud de l'éditeur. L'étude 10 indique qu'Odoo Online refuse les modules tiers ; la fiche de l'Apps Store affiche pourtant « Odoo Online » [?, à trancher par l'essai].
- **Montée de version** : vendue comme un service, « à demander par e-mail », sans procédure publique ni prix ([doc 19.0](https://doc.openeducat.org/19.0/administration/upgrade.html)).

### 3.2 Deux éditions

| | Community (libre) | Enterprise (payante) |
|---|---|---|
| Contenu | **12 modules** [CODE] : cœur, admission, devoirs, présences, salles, examens, équipements, frais, bibliothèque, parents, emploi du temps, activités ; plus un thème | « 73 » ou « 70+ » modules selon la page [V] : LMS, quiz, carnet de notes (GPA), portail parents complet, passage d'année, multi-campus, transport, internat, discipline, santé, OMR, WhatsApp, présence biométrique, tableaux de bord |
| Qualité annoncée | L'éditeur lui-même dit « basic » pour l'emploi du temps, les notes, les présences et les devoirs ([matrice des éditions](https://openeducat.org/compare-editions/)) | Optimisation des séances et remplacements annoncés |
| Contradictions | Une autre page dit que le LMS, le portail parents et le transport sont inclus dans le gratuit, « sans vente additionnelle » ([page open source](https://openeducat.org/open-source-education-erp/)) | |

Le détail des contradictions (modules, effectifs, prix) est dans la note de recherche.

### 3.3 Intelligence artificielle

Le site annonce neuf fonctions [V, [page IA](https://openeducat.org/ai/features/)] : aide à la correction (l'IA rédige le commentaire, l'enseignant note), analyses d'apprentissage, recommandations de contenu, génération de cours, parcours personnalisés, intégrité (sans détecteur de texte écrit par une IA), générateur de quiz, tuteur disponible jour et nuit, assistant d'enseignant.

- L'école branche **son propre modèle** (OpenAI, Anthropic, Gemini, Mistral, ou un modèle local). Le site dit que les données vont directement de l'école au fournisseur choisi.
- Coût annoncé : de 0,50 à 3 $ par enseignant et par mois, payés au fournisseur.
- **L'édition concernée n'est pas dite.** Aucune fonction d'IA n'est dans le code libre [CODE].
- **Rien sur l'emploi du temps** dans les pages d'IA.

## 4. Ce que montre le code de l'édition libre

### 4.1 Emploi du temps : une recopie, pas une génération

Fichier `openeducat_timetable/wizard/generate_timetable.py`, branche 19.0 [CODE] :
- l'utilisateur saisit, pour une promotion, chaque ligne de la semaine : jour, heure, **enseignant, matière, salle** ;
- l'assistant parcourt chaque date de la période et crée une séance quand le jour correspond ;
- il ne choisit rien, n'optimise rien et n'explique rien.

Contrôles de conflit (`models/timetable.py`) [CODE] :
- quatre contrôles : même enseignant, même salle, même promotion, même promotion et même matière, sur le même créneau ;
- ils **refusent l'enregistrement** avec un message ; ils ne proposent pas d'autre créneau ;
- ce sont **des réglages**. Les cases n'ont pas de valeur par défaut, et seul le fichier de démonstration (`demo/op_timetable_demo.xml`) en allume trois. **Sur une installation sans démonstration, aucun contrôle n'est actif** tant que l'administrateur ne coche pas les cases. À confirmer par l'essai (E-1 et E-3 du plan 08) ;
- **pas de contrôle de capacité de salle ni d'indisponibilité de l'enseignant**, alors que le site les annonce ;
- pas de contrôle par élève : un élève inscrit dans deux promotions peut avoir deux séances en même temps.

Le correctif de juillet 2026 (PR [#1061](https://github.com/openeducat/openeducat_erp/pull/1061), +1 642 lignes et des tests) dit lui-même ce qui n'allait pas avant [DÉPÔT] :
- chaque enregistrement parcourait **toute la table des séances**, par exemple 10 000 séances ;
- un enseignant qui créait une séance ne voyait pas les séances des autres enseignants, et **le conflit passait sans erreur**.

Ce que dit le site [V, [page emploi du temps](https://openeducat.org/solutions/timetable-management-system/)] :
- « solveur de contraintes » et « optimisation multi-objectif » ;
- génération « en quelques secondes », ou en « 10 à 30 minutes », ou en « 1 à 2 heures », selon le paragraphe ;
- remplaçant « en un geste », « 95 % de temps gagné » ;
- l'édition n'est pas précisée.

**Conclusion** : l'édition libre n'a pas de générateur. Pour l'Enterprise, le solveur reste une affirmation à faire démontrer sur le jeu du collège (plan 08, question Q-3).

### 4.2 Données envoyées à l'éditeur

Fichiers `openeducat_core/models/update.py` et `data/ir_cron_data.xml`, branche 19.0 [CODE] :
- une tâche planifiée envoie **chaque jour**, à `srv.openeducat.org` :
  - l'identifiant, le nom et la date de création de la base ;
  - l'adresse du site ;
  - le nombre d'utilisateurs, d'utilisateurs actifs et de comptes du portail ;
  - la langue et la liste des applications installées ;
  - **le nom, l'e-mail et le téléphone de l'école** ;
- ce contenu est celui qu'Odoo envoie déjà à Odoo SA [C, connaissance d'Odoo]. OpenEduCat l'envoie **en plus**, à lui-même ;
- le même fichier **retire les deux tâches** (celle d'Odoo et la sienne) de la liste que voit l'administrateur ;
- aucun réglage ne permet de refuser l'envoi ;
- le ticket [#1058](https://github.com/openeducat/openeducat_erp/issues/1058) (16 juin 2026) disait que la notice ne mentionne ni l'e-mail, ni le téléphone, ni la liste des modules. Il a été **fermé trois jours plus tard, sans un commentaire** [DÉPÔT].

Aucune donnée d'élève n'est envoyée. Mais pour une école marocaine, c'est un transfert vers l'étranger de données sur l'établissement et ses comptes, alors que la page Maroc promet une conformité à la loi 09-08 [?, avis juridique non demandé].

### 4.3 Sécurité

- **Point d'accès des présences ouvert sans connexion** [CODE] :
  - l'adresse `/openeducat-attendance/take-attendance` est déclarée `auth='none'` sur les branches 16.0, 17.0, 18.0, 19.0 et 20.0 ;
  - elle travaille avec tous les droits (`sudo`) ;
  - n'importe qui peut donc, sans compte, **marquer présents** les élèves pas encore notés sur une feuille d'appel ;
  - c'est une atteinte à l'intégrité des présences, pas une fuite de données ;
  - correctif proposé le 16 novembre 2026 par un chercheur extérieur après un signalement privé (PR [#1082](https://github.com/openeducat/openeducat_erp/pull/1082), une ligne : `auth='user'`). **Pas encore accepté le 17 novembre** [DÉPÔT].
- **Aucune CVE publiée** au nom d'OpenEduCat. Personne ne semble avoir audité le code publiquement.
- **Une installation qui échouait** : l'édition 18 ne s'installait pas sur un Odoo 18 neuf, à cause d'un fuseau horaire obsolète dans les données de démonstration. Le ticket a été fermé avec la réponse « impossible à reproduire » ([#972](https://github.com/openeducat/openeducat_erp/issues/972), août 2025).
- **Le suivi des tickets ne montre rien** : un seul élément ouvert (la PR #1082). Les bogues passent par l'e-mail du support.

### 4.4 Avis demandés dans le produit

Fichier `openeducat_core/static/src/js/g2_review.js` [DÉPÔT] :
- ajouté le 19 juillet 2023 (« G2 Review Pop UP ») sur les branches 16.0, 17.0, 18.0 et 19.0 ;
- cinq secondes après la connexion, une fenêtre affichait une image renvoyant vers `openeducat.org/g2feedback`. Elle revenait tous les sept jours, par base ;
- retiré de la 19.0 le 16 avril 2026 (PR [#1046](https://github.com/openeducat/openeducat_erp/pull/1046)) ;
- **toujours présent sur la branche 18.0** le 17 novembre.

Conséquence : la note G2 (4,6 sur 154 avis) vient en grande partie d'avis sollicités dans l'outil. La note de recherche a déjà relevé des textes recyclés et des auteurs qui ne travaillent pas dans une école. **Ne pas citer la note G2 comme une preuve de satisfaction**, ni dans un sens ni dans l'autre.

### 4.5 Langues

- Des messages d'erreur sont écrits en anglais dans le code Python, hors de la fonction de traduction ([discussion #1053](https://github.com/openeducat/openeducat_erp/discussions/1053), mai 2026). L'interface ne peut donc pas être traduite entièrement en arabe ou en français sans modifier le code [DÉPÔT].
- Des fichiers de traduction arabe et français existent pour chaque module [CODE]. La branche 20.0 a reçu en octobre et novembre 2026 des traductions « pour tous les modules » [DÉPÔT].

## 5. Prix et coût réel

Grille publique en dollars, cloud, un an [V, relevée le 15 nov. dans la note de recherche ; le configurateur de la page des prix ne s'affiche pas sans navigateur] :
- cœur : 489 ;
- pack de 500 utilisateurs : 349 ;
- emploi du temps, présences, frais, admission, campus, transport : 160 chacun ;
- examens, parents : 79 chacun ;
- carnet de notes, LMS, WhatsApp : 499 chacun ;
- applications Android : 889 ; iOS : 1 179 ;
- heures de service : 1 379 les 25 h, 2 199 les 50 h.

L'étude 10 relève que le pack compte **les élèves, les parents, les enseignants et le personnel** ([page « école »](https://openeducat.org/for/school-owners/), non relue ici). Une école de 300 élèves dépasse donc vite 500 comptes.

| Panier (cloud, 500 comptes) | Calcul | Par an |
|---|---|---:|
| **A. Base scolaire** : emploi du temps, présences, frais, admission, examens, parents | 489 + 349 + 4 × 160 + 2 × 79 | **1 636 $** |
| **B. Ce que Planner vise à l'étape 5** : A + carnet de notes, WhatsApp, deux applications | 1 636 + 499 + 499 + 889 + 1 179 | **4 702 $** |
| Mise en route, 50 heures de service | | **2 199 $** une fois |
| **Première année du panier B** | | **environ 6 900 $** |

- Ce sont des prix catalogue américains. L'éditeur dit qu'une grille régionale plus basse peut s'appliquer [V].
- La page Maroc en français annonce **25 000 à 60 000 MAD par an pour 500 élèves** (relevé des études 09 et 10, absent de la page anglaise). Le panier B, à environ 10 MAD pour 1 $ (taux à vérifier le jour du devis), tombe dans cette fourchette.
- **Hors devis** : hébergement si l'école installe elle-même, montées de version, traduction des messages, export Massar, moyen de paiement local.
- **Community** : 0 de licence, mais un serveur, des sauvegardes et une personne qui connaît Odoo. Tous les avis 2025-2026 le disent [AVIS].

**Planner** : la vente est gelée et le modèle économique est à l'étude (PR #169). Aucune comparaison chiffrée n'est possible aujourd'hui.

## 6. Comparatif avec Planner

Légende pour Planner : ✅ existe sur `main` · 🟡 partiel · 📋 prévu (identifiant du plan) · ⏸ reporté ou gelé · ❌ hors plan. Le détail ligne à ligne est dans [07-comparatif-odoo.md](07-comparatif-odoo.md) ; ce tableau le met à jour.

### 6.1 Domaine par domaine

| Domaine | OpenEduCat Community [CODE] | OpenEduCat Enterprise [V] | Planner (16 nov.) | Avance |
|---|---|---|---|---|
| **Calcul de l'emploi du temps** | ❌ recopie d'une semaine saisie | solveur annoncé, non démontré | ✅ Timefold 1.35 (MOT-12), règles dures et souples ; contraintes déclarées par l'école (MOT-13a et 13b fusionnées, #178 et #182) | **Planner** |
| Conflits | refus sur 4 contrôles, **éteints par défaut** ; ni capacité, ni indisponibilité | « conflits en direct » | ✅ refus à la saisie, forçage tracé ; 📋 validation avant le calcul (MOT-03, PR #183) ; 📋 explication (EDT-03) | **Planner** |
| Report, remplaçant | ❌ | remplaçant « en un geste » | ✅ report demandé, validé, élèves prévenus ; 📋 remplaçant (MOT-09) | Planner pour le report |
| Ramadan, horaires saisonniers | ❌ | annoncé (page Maroc) | 🟡 règle Ramadan ; 📋 EDT-02 | à égalité, rien de prouvé |
| Appel en classe | saisie manuelle ; **point d'accès ouvert** (§ 4.3) | biométrie, kiosque | ✅ QR code, trois statuts, anti-fraude | **Planner** |
| Quiz, jeux en classe | ❌ | quiz avec banque de questions, quiz générés par IA | ✅ Studio quiz (10 types, quiz en direct), jeux ; 🟡 IA (fournisseur non choisi) | Planner en classe, OpenEduCat en LMS |
| Dossier élève, familles | ✅ dossier, lien parent | ✅ portail parents complet | 🟡 l'élève dépend d'un compte ; 📋 VSC-02, ADM-05 | **OpenEduCat** |
| Admission | ✅ | ✅ en ligne, avec paiement | 📋 INS-01, INS-02 | **OpenEduCat** |
| Notes, bulletins | 🟡 « basic » | ✅ carnet, GPA | 📋 VSC-04 | **OpenEduCat** |
| Frais, comptabilité | ✅ facturation par Odoo | ✅ échéanciers, bourses, passerelles | 📋 FIN-01, FIN-02, PAI-02 | **OpenEduCat** |
| Bibliothèque physique | ✅ | ✅ | ❌ (StudyLib est numérique) | **OpenEduCat** |
| Transport, internat, discipline, santé | ❌ | ✅ | ⏸ SER-01 ; ❌ discipline, santé | **OpenEduCat** |
| RH, paie, achats | par Odoo | par Odoo | 📋 RHP-01 à 03 (export seulement) | **OpenEduCat** |
| Massar | ❌ | « export compatible », sans format | 📋 ETA-01, ETA-02 | personne |
| Paiement marocain (CMI) | ❌ | absent de la liste Enterprise ; annoncé sur la page Maroc (étude 10) | 📋 PAI-02 | personne |
| Arabe | 🟡 fichiers de traduction, messages en anglais dans le code | annoncé, de droite à gauche | ❌ aujourd'hui ; 📋 UIX-04 | **OpenEduCat** |
| Mobile | ❌ | Android et iOS payants (2 068 $ par an) | 🟡 étudiants (Expo), jamais essayé sur un vrai téléphone ; 📋 MOB-02, MOB-05 | OpenEduCat sur le papier |
| Plusieurs écoles | multi-société d'Odoo | multi-campus | 🟡 une seule école aujourd'hui ; 📋 PLA-01 à PLA-07 | **OpenEduCat** |
| Mise en route | « pas prêt à l'emploi », première plainte des avis [AVIS] | 4 à 12 semaines, heures vendues | 📋 assistant de démarrage (ADM-04) | personne pour l'instant |
| Personnalisation | très forte (code ouvert, Odoo) | forte | ❌ code fermé aux écoles ; 📋 ADM-02 | **OpenEduCat** |
| Données envoyées hors de l'école | envoi quotidien caché (§ 4.2) | [?] | 📋 liste publique des envois sortants (QUA-09, PR #189) | **Planner**, si QUA-09 est fusionnée |
| Sécurité | point d'accès ouvert, aucun audit | [?] | ✅ double authentification, journal de sécurité ; 📋 test d'intrusion (EXP-08) | Planner, sans audit lui non plus |

### 6.2 Deux produits de nature différente

- **OpenEduCat** est un ERP large : beaucoup de domaines, chacun « basic » dans le gratuit. Son emploi du temps est une saisie contrôlée.
- **Planner** est un planificateur sous contraintes, prolongé par la vie de la séance (report, appel, quiz). Il n'a pas encore la vie scolaire.
- Ils se rencontrent sur l'emploi du temps et sur la promesse « tout-en-un » que Planner vise à l'étape 5.

### 6.3 Les faiblesses de Planner, à dire aussi

- **Aucune école extérieure ne l'utilise.** Une seule installation, avec un seul établissement.
- **Le solveur n'a pas tenu à grande échelle** : aucun planning complet en 600 s sur le jeu de 20 000 étudiants, six passages, avant et après la montée de Timefold (MOT-02, branche non poussée). Le collège de 600 élèves n'est pas encore mesuré.
- Limites connues du solveur : une seule semaine type, enseignant imposé avant le calcul, au plus 6 séances par semaine, conflits par groupe et non par élève (`ecarts-du-solveur.md`).
- Pas d'arabe, pas de parent, pas de frais, pas de bulletin.
- **Pas de prix.** OpenEduCat en affiche un, même s'il est difficile à lire.

### 6.4 Qui gagne quand

| L'école veut… | Choix probable | Pourquoi |
|---|---|---|
| un seul outil pour l'admission, les frais, les notes et la paie, tout de suite | OpenEduCat Enterprise, avec un intégrateur | Planner ne couvre pas ces domaines avant l'étape 4 |
| un emploi du temps calculé, avec des contraintes réelles et des reports suivis | Planner | l'édition libre ne calcule rien ; l'Enterprise n'a rien démontré |
| un essai gratuit sur ses propres serveurs | OpenEduCat Community | elle existe et elle est libre ; Planner n'a pas d'offre |
| un outil prêt sans informaticien | personne aujourd'hui | c'est la plainte n° 1 contre OpenEduCat, et l'assistant de Planner (ADM-04) n'est pas fait |

## 7. Forces et faiblesses d'OpenEduCat, vues depuis Planner

| Forces | Faiblesses |
|---|---|
| Largeur fonctionnelle, Odoo derrière (comptabilité, RH) | Pas de générateur dans l'édition libre ; solveur Enterprise non démontré |
| Édition libre, LGPL : un directeur technique peut l'essayer gratuitement | Mise en route lourde, il faut savoir utiliser Odoo |
| Prix public, même empilé | Grille difficile à lire, contradictions entre pages |
| Arabe et français annoncés, pages Maroc | Massar et CMI non prouvés, messages non traduisibles |
| Projet actif, branche 20.0 | Contributions concentrées sur une personne ; montée de version vendue au cas par cas |
| **Pour Planner, des occasions** | **Pour Planner, des menaces** |
| Les écoles déçues par la mise en route | Un intégrateur marocain qui pose OpenEduCat avec Massar et CMI |
| L'emploi du temps comme démonstration : même collège, deux résultats | Un vrai solveur ajouté à l'Enterprise (l'éditeur l'annonce déjà) |
| La transparence des données envoyées comme argument | Une école qui choisit « tout-en-un » avant que Planner ait la vie scolaire |
| Un échange avec Odoo (export comptable de FIN-02) | |

## 8. Ce qu'on en retient pour Planner

Propositions, notées P-84 à P-89 dans [03-propositions.md](03-propositions.md), à trancher par le chef :

| N° | Constat | Proposition |
|---|---|---|
| P-84 | La différence qui compte se joue sur l'emploi du temps, et elle n'est pas mesurée | Lancer l'essai du plan 08 sur le jeu du collège, **avec les contrôles laissés tels qu'ils sont livrés**, puis cochés ; mesurer Planner sur le même jeu (MOT-02) |
| P-85 | Les avis G2 sont sollicités dans le produit | Ne citer aucune note G2, ni d'OpenEduCat ni d'un autre, dans un argumentaire ; préférer les plaintes qui reviennent (mise en route) |
| P-86 | L'envoi quotidien caché est un fait public et vérifiable | Faire de QUA-09 (liste publique des envois sortants, PR #189) un argument : « vous savez ce qui sort de votre école » ; ne pas nommer le concurrent |
| P-87 | La faille des présences n'est pas corrigée | **Ne pas s'en servir** dans la communication (le correctif est en cours, et ce serait du dénigrement). La retenir pour nous : ajouter aux tests de Planner une vérification qu'aucune route n'est ouverte sans connexion, sauf une liste écrite (lien avec PLA-04 et EXP-08) |
| P-88 | Les contrôles de conflit qu'on peut éteindre ne protègent pas | Garder les contrôles de Planner toujours actifs ; un forçage reste possible, mais tracé et justifié, comme aujourd'hui |
| P-89 | Une école qui a déjà Odoo ne le quittera pas | Prévoir dans FIN-02 et ADM-03 un format importable par Odoo, et étudier un échange limité (élèves, groupes, enseignants) si une école pilote le demande |

## 9. À vérifier avant de se servir de ce document

1. L'essai Community (plan 08) : génération, contrôles par défaut, arabe, mise en route.
2. L'existence du solveur Enterprise : essai de 15 jours (plan 08, Q-3), sur le jeu du collège.
3. Le format de « l'export compatible Massar ».
4. CMI : la page Maroc l'annonce selon l'étude 10, la liste des passerelles Enterprise ne le contient pas.
5. Le prix régional au Maroc, et la définition exacte d'un « utilisateur » dans le contrat.
6. L'avis juridique sur l'envoi quotidien de données (loi 09-08), si le document sert à un argumentaire.
7. Odoo Online : accepte-t-il OpenEduCat ? Les sources se contredisent.
8. Le sort de la PR #1082 et la date du correctif publié.

## Sources

- Code : [dépôt `openeducat_erp`](https://github.com/openeducat/openeducat_erp), branche 19.0 ; [assistant d'emploi du temps](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/wizard/generate_timetable.py) ; [séances et contrôles](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/models/timetable.py) ; [données de démonstration](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_timetable/demo/op_timetable_demo.xml) ; [envoi quotidien](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/models/update.py) ; [tâche cachée](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_core/data/ir_cron_data.xml) ; [point d'accès des présences](https://github.com/openeducat/openeducat_erp/blob/19.0/openeducat_attendance/controllers/app_main.py)
- Dépôt : PR [#1046](https://github.com/openeducat/openeducat_erp/pull/1046), [#1061](https://github.com/openeducat/openeducat_erp/pull/1061), [#1082](https://github.com/openeducat/openeducat_erp/pull/1082) ; tickets [#972](https://github.com/openeducat/openeducat_erp/issues/972), [#1058](https://github.com/openeducat/openeducat_erp/issues/1058) ; [discussion #1053](https://github.com/openeducat/openeducat_erp/discussions/1053)
- Éditeur : [à propos](https://openeducat.org/about/), [tarifs](https://openeducat.org/pricing/), [matrice des éditions](https://openeducat.org/compare-editions/), [emploi du temps](https://openeducat.org/solutions/timetable-management-system/), [IA](https://openeducat.org/ai/features/), [Maroc](https://openeducat.org/k12-school-management-software-in-morocco/), [passerelles de paiement](https://openeducat.org/integrations/payment-gateways/), [OEC.sh](https://oec.sh/faq), [montée de version](https://doc.openeducat.org/19.0/administration/upgrade.html)
- Avis : [G2](https://www.g2.com/products/openeducat/reviews), [Capterra](https://www.capterra.com/p/182870/OpenEducat/) ; détail dans la note de recherche
- Dans le dépôt : [07-comparatif-odoo.md](07-comparatif-odoo.md), [08-plan-essai-openeducat.md](08-plan-essai-openeducat.md), [la note de recherche](<research_notes/Failles des ERP scolaires/openeducat.md>), `docs/plan/suivi.md`, `docs/conception/moteur-planification/ecarts-du-solveur.md`
