# OpenEduCat : identité, éditions, licence, architecture et catalogue

Relevé lu le **17 novembre 2026**. Les notes internes du 15 novembre n’ont servi que de liste de points à revérifier ; aucune n’est citée comme source.

Légende : **[V]** page de l’éditeur ; **[code]** dépôt, fichier de licence ou API GitHub ; **[tiers]** Apps Store Odoo ou autre site qui n’est pas celui de l’éditeur ; **[?]** non établi. Quand deux pages se contredisent, les deux phrases sont citées. Aucune n’est choisie comme la bonne sans pièce à l’appui.

## Qui publie OpenEduCat, et quels sont le site et la documentation en novembre 2026 ?

### Takeaway

L’éditeur se présente comme **OpenEduCat Inc.**, siège annoncé à Ahmedabad (Inde), fondation marketing en **2014**, et se dit **indépendant d’Odoo SA** (Belgique), qui publie le socle Odoo. Le site officiel lu ce jour est `https://openeducat.org/`. La documentation est éclatée sur au moins trois hôtes : `doc.openeducat.org`, `newdocs.openeducat.org` et `newdoc.openeducat.org`. Aucun numéro d’immatriculation ni adresse de rue n’a été lu.

### Cited Findings

- **[V]** Le kit presse nomme la société « OpenEduCat Inc. », « Founded in 2014 », « headquartered in India », site `openeducat.org`. Il ne donne pas de ville dans ce paragraphe. Lu le 17 novembre 2026. — [Press](https://openeducat.org/press/)
- **[V]** La page About place « 2014 » et « Ahmedabad, India » l’un à côté de l’autre, indique « Team Size 50+ employees », et nomme Parthiv Patel « Founder & CEO » et Neha Patel « Co-Founder ». Même page : « 3M+ Users », « 1000+ Institutions », « 73 Modules », « 90+ Languages », « 90+ countries ». Lu le 17 novembre 2026. — [About](https://openeducat.org/about/)
- **[V]** Le contrat Enterprise publié dans la doc s’ouvre ainsi : « services (the “Services”) provided by OpenEduCat, Inc. and its affiliates (collectively, “OpenEduCat, Inc.”) ». Version affichée : « Version 1c - 2021-07-01 ». L’URL est sous `/19.0/` mais les titres de section disent « OpenEduCat 18 ». Lu le 17 novembre 2026. — [Licenses, doc 19.0](https://doc.openeducat.org/19.0/legal/legal.html)
- **[code]** L’en-tête de `openeducat_core/__manifest__.py` (branche `19.0`) dit « OpenEduCat Inc » et « Copyright (C) 2009-TODAY OpenEduCat Inc(). ». Le champ `'author': 'OpenEduCat Inc'`, `'website': 'https://www.openeducat.org'`. Lu le 17 novembre 2026. — [manifeste core](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/openeducat_core/__manifest__.py)
- **[code]** L’organisation GitHub `openeducat` a `name` « OpenEduCat », `location` « Ahmedabad, India », `email` `info@openeducat.org`, `blog` `https://www.openeducat.org`, `created_at` **2012-10-14T15:10:59Z**, `is_verified` **false**, `public_repos` **1**. L’API ne donne pas de raison sociale « Inc ». Lu le 17 novembre 2026. — [API org](https://api.github.com/orgs/openeducat)
- **[code]** Le dépôt `openeducat/openeducat_erp` a été créé le **2013-05-02T17:02:54Z**. Lu le 17 novembre 2026. — [API dépôt](https://api.github.com/repos/openeducat/openeducat_erp)
- **[V]** Glossaire de l’éditeur, FAQ : « Odoo SA is the Belgian software company that publishes the core Odoo platform ». « OpenEduCat is an independent company that publishes the OpenEduCat suite of education-specific modules (LGPLv3 open-source) that install on top of Odoo Community Edition. » La page ne dit pas qu’OpenEduCat Inc. est partenaire officiel d’Odoo SA. Elle dit qu’Odoo SA « lists ~6,000 partners » et que « OpenEduCat-specific partners are listed on the OpenEduCat partner network ». Lu le 17 novembre 2026. — [glossaire](https://openeducat.org/glossary/what-is-odoo-erp-education/)
- **[V]** Trois hôtes de documentation sont en ligne le 17 novembre 2026. Le README du dépôt pointe `https://doc.openeducat.org/`. La page d’accueil `newdocs` se présente comme la doc sur Odoo 19. Une troisième doc, au singulier `newdoc`, a une page modules « Last updated: January 2026 ». — [README](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/README.md) ; [newdocs](https://newdocs.openeducat.org/) ; [newdoc modules](https://newdoc.openeducat.org/settings/modules/)
- **[tiers]** L’Apps Store Odoo attribue les fiches lues à « OpenEduCat Inc », lien `https://www.openeducat.org`. Lu le 17 novembre 2026. — [fiche ERP 19.0](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)
- **[V]** La page prix affiche des noms d’établissements (Lagos Business School, Thammasat University, RIMT University, EBZ Business School, Maldives Polytechnic, Mudiame University, iGlobal University, University of Human Development, inlingua International). Rien sur cette page ne prouve le contrat. Lu le 17 novembre 2026. — [Pricing](https://openeducat.org/pricing/)

### Inferences

- Le nom commercial et le nom utilisé dans le contrat et le code sont « OpenEduCat Inc ». La ville Ahmedabad vient de la page About et du champ GitHub, pas d’un registre.
- Les dates 2009 (copyright du code), 2012 (création de l’org GitHub), 2013 (création du dépôt) et 2014 (récit marketing) ne désignent pas le même événement. Aucune n’a été départagée.
- Le lien avec Odoo SA, tel que l’éditeur le formule, est celui d’un éditeur de modules posés sur le socle Odoo, pas celui d’une filiale. Le statut de partenaire Odoo n’est pas établi par les pages lues.
- Des commits anciens de l’API contributeurs portent les e-mails `siddharth@techreceptives.com` et `yusuf@techreceptives.com`. Cela montre une trace Tech Receptives dans l’historique Git. Cela ne dit pas la raison sociale actuelle.

### Gaps

- Pas de numéro d’immatriculation, pas d’adresse de rue, pas de pièce Delaware ou indienne relue ce jour. Un extrait de recherche antérieur citait Claymont (Delaware) et une fondation en 2012 ; la page n’a pas été rechargée le 17 novembre 2026, donc ce siège n’est pas retenu.
- Pas de page Odoo SA qui citerait OpenEduCat comme partenaire, lue ce jour.
- Le lien entre le compte GitHub `parthivgls` (auteur de la release `18.0-beta`) et « Parthiv Patel » de la page About n’est pas écrit sur une page lue.
- L’effectif « 50+ » n’a pas de source hors du site.

## Quelles versions d’Odoo la version courante vise-t-elle, et quelle est la dernière release taguée ?

### Takeaway

Il n’y a pas une seule « version courante ». La page de téléchargement dit **v19.0 Latest**, avec **v18.0** et **v17.0 LTS**. Le dépôt a des branches **16.0, 17.0, 18.0, 19.0 et 20.0** encore bougées en 2026. La **seule release GitHub taguée** est **`18.0-beta`**, préversion, publiée le **26 novembre 2024**. Il n’y a pas de tag `19.0` ni `20.0`.

### Cited Findings

- **[V]** Page Download, lu le 17 novembre 2026 : « v19.0 · v18.0 · v17.0 available », colonne « v19.0 Latest », « v17.0 LTS ». Installeurs annoncés : `.exe`, `.deb`, `.rpm`, zip source, zip GitHub, et `docker pull openeducat/openeducat:19.0`. Les séries 16 et 20 n’apparaissent pas sur cette page. — [Download](https://openeducat.org/download/)
- **[V]** Glossaire, lu le 17 novembre 2026 : « Odoo 17, 18, and 19 each have a corresponding OpenEduCat release. Schools running older Odoo versions (16 and below) can upgrade ». La série 20 n’est pas mentionnée. — [glossaire](https://openeducat.org/glossary/what-is-odoo-erp-education/)
- **[code]** Branche par défaut du dépôt : **`19.0`**. Dernier commit de cette branche : `ad47dbf8`, message `[19.0][FIX] redirect parent portal issue (#1081)`, auteur `udaybhola7851 <uday@openeducat.com>`, date **2026-11-16T10:30:27Z**. `pushed_at` du dépôt : **2026-11-16T10:30:28Z**. Lu le 17 novembre 2026. — [API dépôt](https://api.github.com/repos/openeducat/openeducat_erp) ; [commit 19.0](https://github.com/openeducat/openeducat_erp/commit/ad47dbf8c77b2884fe37629349898af9b31eee7d)
- **[code]** Derniers commits lus le 17 novembre 2026 : branche `16.0` le **2026-04-06** (« descriptions added for data collection notice », #1042) ; `17.0` le **2026-04-06** (#1043, même objet) ; `18.0` le **2026-05-13** (« fixed lirary and report issue », #1052) ; `20.0` le **2026-11-02** (« Fixed translation issues for all modules », #1080). — [commit 16.0](https://github.com/openeducat/openeducat_erp/commit/2b3a5166b2327fda18269a305541b1f693443dd5) ; [commit 17.0](https://github.com/openeducat/openeducat_erp/commit/27c27c8eeda1f455b026fad8b4fdf2523daf2ab8) ; [commit 18.0](https://github.com/openeducat/openeducat_erp/commit/7e5e9d107639366704fb8b9870a244f3765a205c) ; [commit 20.0](https://github.com/openeducat/openeducat_erp/commit/df272a2e8bfeac4c094078b39fd73fdd12b99c22)
- **[code]** L’API branches liste aussi, protégées, les noms `2.0`, `7.0`, `8.0`, `9.0`, `10.0`, `11.0`, `12.0`, `13.0`, `14.0`, `15.0`, plus `18.0-pp-opt`, `19.0-fix-admission-multi-create` et `master`. Leurs dates de dernier commit n’ont pas été lues. Lu le 17 novembre 2026. — [API branches](https://api.github.com/repos/openeducat/openeducat_erp/branches?per_page=100)
- **[code]** L’API tags, `per_page=100`, ne renvoie **qu’un** tag : `18.0-beta`, commit `584ce094`. La release associée est `prerelease: true`, `draft: false`, `published_at` **2024-11-26T08:28:05Z**, `tag_name` `18.0-beta`, `name` « 18.0 », `target_commitish` `18.0`, auteur `parthivgls`. Aucun autre tag. Lu le 17 novembre 2026. — [API releases](https://api.github.com/repos/openeducat/openeducat_erp/releases?per_page=10) ; [API tags](https://api.github.com/repos/openeducat/openeducat_erp/tags?per_page=100) ; [page release](https://github.com/openeducat/openeducat_erp/releases/tag/18.0-beta)
- **[code]** Les manifestes lus sur `19.0` portent `'version': '19.0.1.0'` (`openeducat_core` et `openeducat_erp`). Lu le 17 novembre 2026. — [manifeste core](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/openeducat_core/__manifest__.py) ; [manifeste erp](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/openeducat_erp/__manifest__.py)
- **[tiers]** La fiche Apps Store `19.0/openeducat_erp`, extraite le 17 novembre 2026, affiche un tableau de versions **14.0 15.0 16.0 17.0 18.0 19.0**. L’URL `https://apps.odoo.com/apps/modules/20.0/openeducat_erp` répond **404** le même jour. — [fiche 19.0](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)
- **[V]** La doc `newdocs` features dit « Built on the robust Odoo 19 platform ». Lu le 17 novembre 2026. — [features](https://newdocs.openeducat.org/features/)
- **[V]** Communiqué de presse daté « January 2025 » sur le kit presse : « OpenEduCat 4.0 Launches with AI-Powered Analytics ». Ce numéro « 4.0 » ne correspond à aucun tag GitHub lu. Lu le 17 novembre 2026. — [Press](https://openeducat.org/press/)

### Inferences

- Pour quelqu’un qui télécharge le 17 novembre 2026, l’éditeur désigne **19.0** comme la dernière livrée, et maintient encore 17 et 18 au téléchargement.
- Pour quelqu’un qui regarde Git, la ligne la plus récemment poussée parmi les branches lues est **19.0** (16 novembre 2026), avec une branche **20.0** touchée le 2 novembre 2026, sans tag et sans fiche Apps Store à l’URL habituelle.
- « Dernière release taguée » a une réponse nette : **18.0-beta du 26 novembre 2024**, et c’est une préversion. Il n’existe pas, dans ce dépôt, de tag de version stable 19.0.
- Le glossaire qui range Odoo 16 parmi les versions « older » est contredit par un commit sur `16.0` daté du 6 avril 2026. La page Download, elle, ne propose plus le 16.

### Gaps

- Le contenu des installeurs `.exe` / `.deb` / image Docker n’a pas été ouvert : on ne sait pas quelle révision Git ils embarquent, ni s’ils contiennent Odoo lui-même.
- La liste de fichiers de la branche `20.0` n’a pas été lue de façon fiable (une requête `ref=20.0` est revenue avec des liens `ref=19.0`). On ne sait donc pas si `20.0` a les mêmes modules.
- Les dates des branches 2.0 à 15.0 et de `master` n’ont pas été lues.
- Pas de note de version 19.0 ou 20.0 sous forme de GitHub Release.

## Quelle est la licence Community, et qu’est-ce qui est verrouillé en Enterprise ?

### Takeaway

Le fichier `LICENSE` de la branche `19.0` et les manifestes lus disent **GNU LGPL version 3**. GitHub, lui, classe le dépôt « Other » / SPDX `NOASSERTION`. L’Enterprise est décrit par une licence propre, **OpenEduCat Enterprise Edition License v1.0**, publiée dans la doc : usage seulement avec un contrat, interdiction de republier, de rebaptiser et de revendre un SaaS concurrent. Le code Enterprise n’est pas dans le dépôt public, donc la liste de ce qui est « verrouillé » vient des pages de l’éditeur, qui se contredisent.

### Cited Findings

- **[code]** Début du fichier `LICENSE`, branche `19.0`, lu le 17 novembre 2026 : « OpenEduCat is published under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3 (LGPLv3), as included below. » Le fichier enchaîne ensuite le texte FSF « GNU LESSER GENERAL PUBLIC LICENSE Version 3, 29 June 2007 ». Il n’y a pas de fichier `COPYRIGHT` à la racine de `19.0` (HTTP 404). — [LICENSE](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/LICENSE)
- **[code]** README, même branche : « License: LGPL v3 » et « OpenEduCat is distributed under the LGPL-3.0 License. » — [README](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/README.md)
- **[code]** Manifestes `openeducat_core` et `openeducat_erp` : `'license': 'LGPL-3'`. L’en-tête ajoute « either version 3 of the License, or (at your option) any later version. » — [manifeste core](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/openeducat_core/__manifest__.py)
- **[code]** L’API dépôt renvoie pourtant `"license": { "key": "other", "name": "Other", "spdx_id": "NOASSERTION" }`. Lu le 17 novembre 2026. — [API dépôt](https://api.github.com/repos/openeducat/openeducat_erp)
- **[V]** Page « Community License (LGPL-3.0) », extrait lu le 17 novembre 2026 : « Effective: January 1, 2024 · Last updated: January 1, 2024 ». « OpenEduCat Free Edition is free and open-source software released under the GNU Lesser General Public License version 3.0 (LGPL-3.0). » Le texte intégral renvoyé est celui de la FSF, lien `https://www.gnu.org/licenses/lgpl-3.0.html`. — [community-license](https://openeducat.org/community-license/)
- **[tiers]** Fiche Apps Store 19.0 de l’ERP : « License LGPL-3 ». Même mention sur les fiches Library et Timetable 19.0 extraites le même jour. — [ERP](https://apps.odoo.com/apps/modules/19.0/openeducat_erp) ; [Library](https://apps.odoo.com/apps/modules/19.0/openeducat_library) ; [Timetable](https://apps.odoo.com/apps/modules/19.0/openeducat_timetable)
- **[V]** Doc légale, section Enterprise, lu le 17 novembre 2026. Citations : « OpenEduCat Enterprise Edition is published under the OpenEduCat Enterprise Edition License v1.0 ». « This license applies only to the part of this software that is not distributed as part of OpenEduCat Community Edition. » « This software and associated files (the “Software”) can only be used (executed, modified, executed after modifications) with a valid OpenEduCat Enterprise Agreement for the correct number of users and the correct number of apps or modules. » « It is forbidden to publish, distribute, sublicense, or sell copies of the Software or modified copies of the Software. » « It is forbidden to rename, rebrand, republish, whitelabel the Software ». « It is forbidden to copy or change the code of OpenEduCat Enterprise Edition. » « It is forbidden to offer a SaaS product or any online service built with or on top of OpenEduCat Enterprise Edition that competes with or provides similar functionality to OpenEduCat Enterprise Edition. » — [Licenses](https://doc.openeducat.org/19.0/legal/legal.html)
- **[V]** Même page, définition d’un utilisateur du contrat : « Any user account indicated as active in the Software, with access to creation and/or edition mode. Deactivated user accounts and accounts used by external people (or systems) who only have limited access to the Software through the portal facilities (known as “portal Users”) are not counted as Users. » Les portails (élève, parent) ne comptent donc pas comme utilisateurs **dans ce texte de contrat**.
- **[V]** Même page, obligation de télémétrie sous contrat : le client « agrees to take all necessary measures to guarantee the unmodified execution of the part of the Software that verifies the validity of the OpenEduCat Enterprise Edition usage and collects statistics for that purpose, including but not limited to the running of an instance, the number of Users, the installed Apps, and the number of lines of code of Covered Extra Modules. »
- **[V]** Matrice des éditions, lu le 17 novembre 2026. Elle compte « 28 functional areas », « 6 Full in Community », « 7 Basic in Community », « 15 Unlocked by Enterprise ». Community « Not available », donc réservé à Enterprise selon cette page : AI Teaching & Grading ; LMS ; Online Quizzes & Proctoring ; Live / Virtual Classroom ; Central Gradebook / GPA / CBCS / OBE / OMR ; Hostel ; Transport ; Alumni ; Career & Placement ; Convocation ; Communication (mass email et notice board OpenEduCat) ; CRM & Events ; Research / Thesis ; Document Security ; Setup & White-labelling. Le bloc Enterprise ajoute, sans liste de noms techniques : « the AI suite (18 modules), full LMS (10 modules) ». — [compare-editions](https://openeducat.org/compare-editions/)
- **[V]** La même matrice dit que Community a déjà, en entier : Core / SIS, Admissions, Fees & Finance (facturation et encaissement), Library, catalogue Facilities. En version « BASIC » : Assignments, Attendance (saisie manuelle), Examinations (notes lettres et relevés), Timetable, lien Parent (pas le portail complet), journal d’activité étudiant, rapports Odoo standards. Enterprise « adds », sur ces lignes : annotation et rubrics (devoirs) ; reconnaissance faciale, kiosque, export Excel des absents ; GPA/CGPA et gradebook central ; « session planning/optimisation, lesson plans » (emploi du temps) ; « full parent portal (attendance, results, fees) » ; santé, discipline, griefs, congés, mentorat, etc. ; tableaux de bord KPI ; campus multi-sites.
- **[V] contre [V]** Page open source, lu le 17 novembre 2026 : « Every core module below is included free in the community edition. No upsells, no module-by-module pricing. » Le tableau qui suit inclut Learning Management (LMS), Parent Portal, Gradebook & Report Cards, Transportation. La FAQ de la même page : « The community edition gives you SIS, LMS, attendance, basic fee management, timetable scheduling, parent portal, exams, and gradebook. » Plus loin : « the community edition has no feature restrictions, time limits, or student caps. » — [open-source education ERP](https://openeducat.org/open-source-education-erp/)
- **[V] contre la phrase précédente** FAQ de la matrice, même jour : « Does Community include a learning management system (LMS)? No. The full LMS […] is Enterprise-only. » — [compare-editions](https://openeducat.org/compare-editions/)
- **[V]** Doc features (`newdocs`), tableau d’éditions, lu le 17 novembre 2026 : « LMS & Quiz » coché pour Community **et** Enterprise. « Advanced Attendance », « Biometric Integration », « Multi-Campus », « Advanced Analytics », « Priority Support », « Custom Development » seulement Enterprise. La même page dit plus haut « Multi-Institution — Manage multiple campuses […] from one platform » sans réserver ça à Enterprise. — [features](https://newdocs.openeducat.org/features/)
- **[V]** Doc LMS (`newdoc`, singulier), tableau extrait le 17 novembre 2026 : Community « Yes » pour course creation, module organization, content upload, progress tracking ; « No » pour student portal access, video streaming, SCORM, certificates, forums, gamification, mobile app. Enterprise « Yes » sur toutes ces lignes. — [LMS newdoc](https://newdoc.openeducat.org/lms/)
- **[V]** Page solution LMS, extrait lu le 17 novembre 2026 : « LGPLv3 source code » et « Enterprise adds managed cloud, SLA support, and premium modules from $19 per staff user per month, not per learner. » — [open-source LMS](https://openeducat.org/solutions/open-source-lms/)
- **[V]** Page prix, lu le 17 novembre 2026 : « 70+ modules from $79/year ». « No Hidden Fees. […] No setup fees, no per-student charges, no surprise renewal costs. Buy 2 years and get the 3rd year free ». « User packs from 25 to 10,000+ (cloud) or unlimited (on-premise, one-time fee). » Le configurateur (prix ligne par ligne) n’était pas dans le HTML récupéré. — [Pricing](https://openeducat.org/pricing/)
- **[V]** Page d’accueil, extrait lu le 17 novembre 2026 : « no license call-home ». — [accueil](https://openeducat.org/)
- **[tiers]** Fiche Apps Store ERP 19.0, extrait lu le 17 novembre 2026 : « This module collects and transmits certain non-personal technical data to OpenEduCat Inc. servers, including: instance URL, Odoo version, module version, database UUID, and number of active users. » La fiche porte aussi la mention « In-App Purchases » à côté de « FREE ». Même badge « In-App Purchases » sur la fiche Library 19.0. — [ERP](https://apps.odoo.com/apps/modules/19.0/openeducat_erp) ; [Library](https://apps.odoo.com/apps/modules/19.0/openeducat_library)
- **[code]** Les commits du 6 avril 2026 sur `16.0` et `17.0` ont pour message « descriptions added for data collection notice ». Le texte de la notice n’a pas été ouvert dans les fichiers. — [commit 16.0](https://github.com/openeducat/openeducat_erp/commit/2b3a5166b2327fda18269a305541b1f693443dd5)

### Inferences

- Pour le code **présent dans le dépôt public**, la licence écrite est LGPL-3, y compris « ou toute version ultérieure » dans l’en-tête des deux manifestes lus. Le classement GitHub « Other » vient du détecteur (le fichier commence par un préambule avant le texte FSF), pas d’une autre licence écrite dans `LICENSE`.
- Ce qui est contractuellement verrouillé, d’après le texte Enterprise, c’est la partie **non** distribuée avec Community : pas de republication, pas de marque blanche, pas de SaaS concurrent, usage lié à un nombre d’utilisateurs et d’apps, et un contrôle de licence qui remonte des statistiques. Les comptes portail sont exclus du décompte **dans ce contrat**.
- « Enterprise-only » n’est pas un fait de code pour le LMS, le transport ou le portail parent : une page de l’éditeur les donne au gratuit, une autre les réserve au payant, et le dépôt public ne contient aucun de ces modules sous le nom cité (voir la section catalogue).

### Gaps

- Les manifestes des 12 autres dossiers du dépôt n’ont pas été ouverts un par un. Seuls `openeducat_core` et `openeducat_erp` ont été lus. Leur `'license': 'LGPL-3'` n’a donc pas été recopié dossier par dossier.
- Le texte Enterprise est hébergé sur une URL « 19.0 » dont les titres disent encore « OpenEduCat 18 ». On ne sait pas si un texte 19.0 distinct existe.
- La grille chiffrée du configurateur (prix de chaque module, pack par pack) n’était pas dans le HTML de `/pricing/` le 17 novembre 2026. Le « from $79/year » et le « from $19 per staff user per month » sont deux unités différentes, toutes deux [V], sans tableau commun.
- On n’a pas vu le code qui enverrait la télémétrie. On a la notice Apps Store, l’obligation contractuelle Enterprise, et des commits qui ajoutent une « data collection notice » sur les branches 16 et 17.

## Quelle est l’architecture : modules, base, langues, mobile, portails ? Produit autonome ou modules Odoo ?

### Takeaway

Le code public est un **ensemble de modules Odoo** (Python, vues XML, PostgreSQL via Odoo), pas un logiciel à part. L’éditeur vend en plus des installeurs Windows, Linux et une image Docker, dont le contenu n’a pas été ouvert. Le module core dépend d’applications Odoo (`board`, `hr`, `web`, `website`, `contacts`). Des portails existent dans le code Community (vue portail étudiant, redirection parent vers `/my/child`). Aucune application iOS ou Android n’a été trouvée dans le dépôt ; le site en parle, le README la met encore au futur.

### Cited Findings

- **[code]** Dépôt décrit « Comprehensive Open Source ERP for Educational Institutes ». Sujets GitHub : `education`, `erp`, `postgresql`, `python`, `school`, `college`. Langage détecté par GitHub : **HTML** (effet des vues XML, pas une pile HTML autonome). Taille annoncée : 61 461 Ko. Lu le 17 novembre 2026. — [API dépôt](https://api.github.com/repos/openeducat/openeducat_erp)
- **[code]** `openeducat_core` 19.0.1.0 dépend de `'board', 'hr', 'web', 'website', 'contacts'`. Il déclare des vues Odoo, dont `views/student_portal_view.xml`, `views/op_academic_year_view.xml`, `views/program_view.xml`. `'application': True`. — [manifeste core](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/openeducat_core/__manifest__.py)
- **[code]** `openeducat_erp` ne fait que dépendre d’autres modules OpenEduCat : `openeducat_admission`, `openeducat_assignment`, `openeducat_attendance`, `openeducat_library`, `openeducat_parent`, `openeducat_exam`. Pas de serveur ni de base dans ce manifeste. — [manifeste erp](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/openeducat_erp/__manifest__.py)
- **[tiers]** Fiche Apps Store ERP 19.0 : dépendances Odoo « Contacts (contacts), Employees (hr), Website (website), Discuss (mail), Invoicing (account) ». Disponibilité affichée : « Odoo Online, Odoo.sh, On Premise ». « Lines of code 18566 ». Technical Name `openeducat_erp`. — [fiche ERP](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)
- **[V]** Page Download : « Database PostgreSQL 12+ », « Runtime Python 3.8+ », « Web server Nginx (recommended) », « OS Ubuntu 20.04+ / RHEL 8+ », « RAM 4 GB min · 8 GB recommended », « Disk 20 GB ». Et des paquets `.exe`, `.deb`, `.rpm`, plus Docker. — [Download](https://openeducat.org/download/)
- **[V]** Glossaire : « on one shared database » ; « API access via XML-RPC, JSON-RPC, and JSON-2 (Odoo 19+) ». « Do I need Odoo Enterprise to run OpenEduCat? No. OpenEduCat is built for and tested against Odoo Community Edition ». La même réponse dit que la suite « admissions, attendance, fees, library, hostel, LMS, exam » tourne sans Odoo Enterprise. — [glossaire](https://openeducat.org/glossary/what-is-odoo-erp-education/)
- **[V]** Doc d’installation 19.0, extraite le 17 novembre 2026 : elle dit d’aller sur GitHub, de télécharger le zip, puis dans Odoo « search OpenEduCat Core » et « Active ». Elle ne décrit pas un produit hors Odoo. — [how to install](https://doc.openeducat.org/19.0/applications/Installation/how-to-install-openeducat.html)
- **[code]** Portail parent dans le dernier commit `19.0` : le fichier `openeducat_core/controllers/app_main.py` redirige un utilisateur non interne dont `is_parent` est vrai vers `/my/child`. Message de commit : « redirect parent portal issue ». Date 16 novembre 2026. — [commit](https://github.com/openeducat/openeducat_erp/commit/ad47dbf8c77b2884fe37629349898af9b31eee7d)
- **[code]** Langues livrées dans `openeducat_core/i18n` sur `19.0`, lu le 17 novembre 2026 : 19 fichiers `.po` (`ar_001`, `da_DK`, `de`, `es`, `fa`, `fr`, `id`, `it`, `lt`, `nl`, `pt`, `ru`, `th`, `vi`, `vi_VN`, `zh`, `zh_CN`, `zh_HK`, `zh_TW`) plus le modèle `openeducat_core.pot`. `zh.po` fait 76 383 octets, `zh_CN.po` 240 208 : la présence d’un fichier n’a pas été convertie en taux de traduction. Pas de `hi.po` dans ce dossier. — [liste i18n](https://api.github.com/repos/openeducat/openeducat_erp/contents/openeducat_core/i18n?ref=19.0)
- **[V] contre [code]** About : « 90+ Languages ». Press et d’autres pages parlent de langues sans liste. Le dossier `i18n` du seul module core en montre 19 fichiers, pas 90. — [About](https://openeducat.org/about/)
- **[V]** About, frise : « 2021 — Mobile Apps Released — Launched native Android and iOS apps for students, parents, and faculty. » — [About](https://openeducat.org/about/)
- **[code]** README, feuille de route, temps présent : « Enhanced Mobile Experience: Optimizing for a seamless mobile interface » dans « what’s coming ». Aucun dossier d’application mobile à la racine de `19.0`. — [README](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/README.md)
- **[V]** Doc modules, chaîne de dépendances affichée : `openeducat_fees` dépend de `account` (comptabilité Odoo). `openeducat_timetable` dépend de `openeducat_facility`. Page « Last updated: January 2026 », toujours en ligne le 17 novembre 2026. — [newdoc modules](https://newdoc.openeducat.org/settings/modules/)

### Inferences

- Ce qui est public sur GitHub est une **couche de modules Odoo**. Ce n’est pas un binaire autonome dans ce dépôt. Les installeurs de la page Download peuvent être un Odoo empaqueté avec ces modules : ce point n’a pas été vérifié en ouvrant l’image.
- Un portail étudiant est déclaré dans le manifeste Community (`student_portal_view.xml`). Un portail parent minimal est dans le contrôleur Community le 16 novembre 2026. Cela ne dit pas que les écrans « notes, présences, frais » décrits comme Enterprise y sont.
- « 90+ langues » ne correspond pas au dossier `i18n` de `openeducat_core`. Odoo lui-même apporte d’autres traductions ; la part OpenEduCat mesurée ici est la liste de fichiers ci-dessus, pour un seul module.
- L’Apps Store écrit « Odoo Online » parmi les cibles. Cela n’a pas été essayé. Historiquement Odoo Online refuse les modules tiers : ce rappel n’a pas été re-vérifié le 17 novembre 2026, donc il reste **[?]**.

### Gaps

- Image Docker et installeurs non ouverts.
- Dossiers `i18n` des modules autres que `openeducat_core` non listés.
- Aucune fiche Google Play ni App Store ouverte avec succès le 17 novembre 2026. L’existence d’apps natives 2026 repose sur la frise About (2021) et est contredite par la feuille de route du README.
- Pas de mesure du taux de chaînes réellement traduites dans les `.po` (arabe, français compris).
- La doc d’install du README (`https://doc.openeducat.org/administration/install.html`, sans numéro de série) n’a pas été ouverte ; seule la page 19.0 « Getting Source Code » l’a été.

## Quels modules existent vraiment, sous quels noms techniques, et le « 74+ » tient-il ?

### Takeaway

Le dépôt public `19.0` contient **14 dossiers de modules**, pas 74. L’Apps Store, recherche « openeducat » en série 19.0, annonce **12 apps**, toutes marquées FREE, auteur OpenEduCat Inc. Les noms LMS, transport, internat, discipline, santé, grading, OMR n’ont **aucun dossier** à la racine du dépôt. L’éditeur écrit tour à tour **70+**, **73**, **74+**, **28 domaines**, « AI suite (18 modules) » et « full LMS (10 modules) », sans publier la liste qui additionnerait ces chiffres.

### Cited Findings

- **[code]** Racine de la branche `19.0`, lu le 17 novembre 2026. Quatorze dossiers, et rien d’autre qui ressemble à un module :

  1. `openeducat_activity`
  2. `openeducat_admission`
  3. `openeducat_assignment`
  4. `openeducat_attendance`
  5. `openeducat_classroom`
  6. `openeducat_core`
  7. `openeducat_erp` (méta-module)
  8. `openeducat_exam`
  9. `openeducat_facility`
  10. `openeducat_fees`
  11. `openeducat_library`
  12. `openeducat_parent`
  13. `openeducat_timetable`
  14. `theme_web_openeducat`

  Absents de cette racine, alors que des pages les nomment : `openeducat_lms`, `openeducat_lms_enterprise`, `openeducat_hostel`, `openeducat_transportation`, `openeducat_grading`, `openeducat_discipline`, `openeducat_health`, `openeducat_quiz_enterprise`, `openeducat_parent_enterprise`, `openeducat_omr`, `openeducat_core_enterprise`. — [API contents 19.0](https://api.github.com/repos/openeducat/openeducat_erp/contents/?ref=19.0)

- **[code]** Le README Community liste pourtant « Transport & Hostel Management » et « HR & Payroll Management » parmi les fonctions, sans dossier `openeducat_transport*` ni `openeducat_hostel` dans l’arbre. La paie et les RH correspondent à la dépendance Odoo `hr`, pas à un module OpenEduCat de la racine. — [README](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/README.md)
- **[tiers]** Recherche Apps Store, série 19.0, terme `openeducat`, lu le 17 novembre 2026 : « **12 Apps found** ». Toutes « OpenEduCat Inc » et « FREE » : OpenEduCat ERP, Fees, Timetable, Admission, Exam, Assignment, Library, Activity, Classroom, Facility, Parent, Attendance. **Pas de carte « OpenEduCat Core »**, pas de thème, pas de LMS, pas de transport. — [recherche 19.0](https://apps.odoo.com/apps/modules/browse?search=openeducat&series=19.0)
- **[tiers]** L’URL directe `https://apps.odoo.com/apps/modules/19.0/openeducat_core` répond **404** le 17 novembre 2026. La fiche ERP continue de citer « OpenEduCat Core » dans ses dépendances Community, avec aussi Admission, Assignment, Attendance, Exam, Library, Parent, Fees, Timetable, Classroom, Facility, Activity. — [fiche ERP](https://apps.odoo.com/apps/modules/19.0/openeducat_erp)
- **[V]** Chiffres de modules, tous lus le 17 novembre 2026, tous sur des pages de l’éditeur :
  - « 70+ Modules » — [Press](https://openeducat.org/press/) et [Download](https://openeducat.org/download/) (« 70+ modules included. SIS, LMS, fees, attendance, gradebook, payroll, HR. »)
  - « 70+ modules from $79/year » — [Pricing](https://openeducat.org/pricing/)
  - « 73 Modules » — [About](https://openeducat.org/about/) ; « See all 73 modules » et « Plus 60+ additional modules including hostel management… » — [open-source ERP](https://openeducat.org/open-source-education-erp/)
  - « 74+ integrated modules » et « 74+ Modules » — [newdocs features](https://newdocs.openeducat.org/features/)
  - « 28 functional areas » — [compare-editions](https://openeducat.org/compare-editions/)
  - « AI suite (18 modules), full LMS (10 modules) » — même page, sans noms techniques
- **[V]** Noms techniques écrits dans la doc `newdoc` (page datée « Last updated: January 2026 », lue le 17 novembre 2026), qui ne sont **pas** des dossiers du dépôt : `openeducat_grading`, `openeducat_transportation`, `openeducat_discipline`, `openeducat_health` (présentés hors section Enterprise) ; `openeducat_lms_enterprise`, `openeducat_quiz_enterprise`, `openeducat_parent_enterprise`, `openeducat_omr`, `openeducat_core_enterprise` (section « License: Enterprise »). Les noms qui, eux, existent dans le dépôt et sur cette page : `openeducat_core`, `openeducat_admission`, `openeducat_attendance`, `openeducat_assignment`, `openeducat_exam`, `openeducat_library`, `openeducat_timetable`, `openeducat_fees`. La page ne cite pas `openeducat_activity`, `openeducat_classroom`, `openeducat_erp`, `theme_web_openeducat`. — [newdoc modules](https://newdoc.openeducat.org/settings/modules/)
- **[V]** Le glossaire nomme `openeducat_core`, `openeducat_admission`, `openeducat_fees`, `openeducat_library`, `openeducat_hostel`, `openeducat_lms` comme modules publiés par OpenEduCat et installables sur Odoo. `openeducat_hostel` et `openeducat_lms` n’ont pas de dossier dans le dépôt public. — [glossaire](https://openeducat.org/glossary/what-is-odoo-erp-education/)
- **[V]** La release `18.0-beta` (26 novembre 2024) dit « [18.0][REM]remove web openeducat module » (#838). En `19.0`, le dossier présent s’appelle `theme_web_openeducat`, pas `web_openeducat`. — [release](https://github.com/openeducat/openeducat_erp/releases/tag/18.0-beta)
- **[tiers]** Chiffres de lignes affichés par l’Apps Store le 17 novembre 2026, sans audit du dépôt : ERP 18 566, Library 9 564, Timetable 8 087. — [ERP](https://apps.odoo.com/apps/modules/19.0/openeducat_erp) ; [Library](https://apps.odoo.com/apps/modules/19.0/openeducat_library) ; [Timetable](https://apps.odoo.com/apps/modules/19.0/openeducat_timetable)

### Inferences

- Le catalogue **public et installable sans contrat**, au 17 novembre 2026, c’est ces 14 dossiers Git, dont 12 ont une fiche FREE en série 19.0. `openeducat_core` est dans Git et cité comme dépendance, mais sa fiche Apps Store 19.0 à l’URL canonique est en 404. `theme_web_openeducat` est dans Git et absent des 12 fiches.
- « 74+ modules », « 73 modules » et « 70+ modules » ne sont pas une liste. Ils ne matchent ni les 14 dossiers, ni les 12 fiches, ni les 28 lignes de la matrice. L’écart peut être un comptage d’écrans, de modules Enterprise non publiés, ou de modules Odoo (compta, paie, CRM) additionnés. Aucune page lue ne fait l’addition.
- Les noms Enterprise de la doc (`*_enterprise`, `openeducat_omr`, et le bloc `openeducat_core_enterprise`) sont des **noms de documentation**. Ils ne sont pas un catalogue de code public.

### Gaps

- Pas de lecture de chaque `__manifest__.py` : le nom technique retenu est le nom du dossier. Le `name` humain n’a été lu que pour Core (« OpenEduCat Core ») et ERP (« OpenEduCat ERP »).
- Branche `20.0` non listée de façon fiable.
- Aucun dépôt public séparé pour l’Enterprise : l’org GitHub n’a qu’un dépôt public (voir section GitHub). Les modules payants peuvent exister hors GitHub. Ce n’est pas démontré par un fichier.
- La page « See all 73 modules » est un lien dans le texte ; la cible n’a pas été ouverte comme une liste de 73 lignes.

## Community contre Enterprise : quelles applications sont gratuites, lesquelles sont payantes, et où les pages se contredisent ?

### Takeaway

Sur l’Apps Store 19.0, les **12 fiches OpenEduCat sont marquées FREE** et LGPL-3 là où la licence a été lue. La matrice du 17 novembre 2026 est la page qui **retire** le LMS, le gradebook central, l’internat, le transport, le portail parent complet, les quiz surveillés et la classe virtuelle du gratuit. La page « open source education ERP » et le README disent l’inverse pour plusieurs de ces briques. Le prix public lisible sans configurateur est « **à partir de 79 USD par an** » le module, contredit par « **à partir de 19 USD par utilisateur personnel et par mois** » sur la page LMS.

### Cited Findings

- **[tiers]** Les 12 apps de la recherche 19.0 sont étiquetées FREE (liste dans la section catalogue). Licence LGPL-3 lue sur les fiches ERP, Library et Timetable. — [recherche](https://apps.odoo.com/apps/modules/browse?search=openeducat&series=19.0)
- **[V]** Matrice, gratuit complet ou basic, lu le 17 novembre 2026 : SIS, admissions, frais (facturation), bibliothèque, salles et équipements, devoirs (notes simples), présences manuelles, examens (lettres et relevés), emploi du temps (construction), fiche parent, journal d’activité. Payant selon la même page : suite IA, LMS, quiz avec surveillance, classe virtuelle, gradebook central (GPA, CBCS, OBE, OMR), internat, transport, alumni, placement, remise de diplômes, e-mail de masse et tableau d’affichage, CRM et événements, thèse, QR anti-falsification, assistant et marque blanche, KPI, portail parent complet, reconnaissance faciale. — [compare-editions](https://openeducat.org/compare-editions/)
- **[V] contre [V]** « Every core module below is included free […] No upsells, no module-by-module pricing » et le tableau nomme LMS, portail parent, gradebook, transport. FAQ : Community « gives you SIS, LMS, […] parent portal, […] and gradebook ». — [open-source ERP](https://openeducat.org/open-source-education-erp/)
- **[V] contre ces phrases** « Does Community include a learning management system (LMS)? No. […] Enterprise-only. » — [compare-editions](https://openeducat.org/compare-editions/)
- **[V] contre la matrice, même famille de doc** `newdocs` features coche « LMS & Quiz » en Community. `newdoc` LMS dit création de cours « Yes » en Community et SCORM / certificats / app mobile « No » en Community, « Yes » en Enterprise. — [features](https://newdocs.openeducat.org/features/) ; [LMS](https://newdoc.openeducat.org/lms/)
- **[V] contre [code]** Le glossaire dit que `openeducat_hostel` et `openeducat_lms` s’installent sur Odoo Community et que « the full OpenEduCat education-module suite (admissions, attendance, fees, library, hostel, LMS, exam) runs on Community Edition without requiring Enterprise ». Le dépôt public n’a ni `openeducat_hostel` ni `openeducat_lms`. La matrice dit hostel et LMS « Not available » en Community. — [glossaire](https://openeducat.org/glossary/what-is-odoo-erp-education/) ; [compare-editions](https://openeducat.org/compare-editions/) ; [API contents](https://api.github.com/repos/openeducat/openeducat_erp/contents/?ref=19.0)
- **[code] contre [V]** `openeducat_parent` est un dossier LGPL du dépôt, et le contrôleur core redirige vers `/my/child`. La matrice dit : Community « links parents to students » ; Enterprise « full parent portal (attendance, results, fees) ». La doc nomme un second module, `openeducat_parent_enterprise`, « License: Enterprise ». Les trois niveaux (fiche parent, redirection `/my/child`, module enterprise) ne sont pas départagés par un essai. — [commit](https://github.com/openeducat/openeducat_erp/commit/ad47dbf8c77b2884fe37629349898af9b31eee7d) ; [newdoc modules](https://newdoc.openeducat.org/settings/modules/)
- **[V]** Prix lisibles le 17 novembre 2026, sans les prendre pour un devis : « 70+ modules from $79/year » et « from $79/yr each » sur la page prix ; « premium modules from $19 per staff user per month, not per learner » sur la page LMS. Le glossaire, autre unité encore, parle du **prix Odoo Enterprise** « typically $25-50 per user per month » et de fourchettes d’hébergement « $5K-50K per year » et d’implémentation « $30K-150K one-time ». Ces fourchettes sont des phrases de l’éditeur, pas une facture. — [Pricing](https://openeducat.org/pricing/) ; [LMS solution](https://openeducat.org/solutions/open-source-lms/) ; [glossaire](https://openeducat.org/glossary/what-is-odoo-erp-education/)
- **[V]** Page open source, autre décompte d’établissements que le reste du site, lu le même jour : « 30,000+ institutions in 130+ countries » et « 73 Modules ». About dit « 1000+ Institutions » et « 90+ countries ». Press dit « 50+ Countries ». `newdocs` features dit « 500+ institutions across 50+ countries ». Download dit « 1,000+ institutions ». Aucun de ces chiffres n’a de liste à l’appui. — pages déjà citées
- **[V]** Download dit que les « 70+ modules included » couvrent « SIS, LMS, fees, attendance, gradebook, payroll, HR » dans le paquet Community téléchargeable. La matrice exclut LMS et gradebook central du Community. — [Download](https://openeducat.org/download/) ; [compare-editions](https://openeducat.org/compare-editions/)

### Inferences

- Le seul partage gratuit **prouvé par une fiche store et par un dossier Git** est : activity, admission, assignment, attendance, classroom, core (Git seulement), erp, exam, facility, fees, library, parent, timetable, theme web (Git seulement).
- Appeler « payant » le LMS, l’internat ou le transport est une **affirmation de la matrice**, contredite par d’autres pages du même site, et **non contredite par le code public**, puisque ce code ne les contient pas. L’inverse (les dire gratuits) est aussi une affirmation de pages [V], sans le code.
- Le piège de lecture n’est pas un prix par élève : plusieurs pages le nient. Le piège est l’unité : module à partir de 79 USD/an, ou utilisateur personnel à partir de 19 USD/mois, plus un socle Odoo qui a son propre prix si l’école prend Odoo Enterprise.

### Gaps

- Configurateur non lu : pas de prix par SKU (Core, Fees, Android, etc.) établi le 17 novembre 2026.
- Pas d’essai d’installation pour voir quels menus la branche `19.0` affiche vraiment.
- Les badges « In-App Purchases » sur des fiches FREE n’ont pas été ouverts : on ne sait pas quel achat intégré ils désignent.

## GitHub : organisation, dépôt, étoiles, dernier commit, contributeurs, tickets

### Takeaway

Une seule organisation publique, **`openeducat`**, un seul dépôt public, **`openeducat_erp`**. Le 17 novembre 2026 : **913 étoiles**, **792 forks**, dernier push le **16 novembre 2026**, **0 ticket ouvert**, **1 pull request ouverte**. L’API contributeurs renvoie **98 entrées** (66 comptes + 32 anonymes). La licence détectée par GitHub est « Other », alors que le fichier dit LGPL-3.

### Cited Findings

- **[code]** Org `openeducat`, id 2557715, créée le 2012-10-14, lieu « Ahmedabad, India », `public_repos` 1, `followers` 98, `is_verified` false, e-mail `info@openeducat.org`. L’appel `repos?per_page=100` ne renvoie que `openeducat_erp`. Lu le 17 novembre 2026. — [API org](https://api.github.com/orgs/openeducat) ; [liste des dépôts](https://api.github.com/orgs/openeducat/repos?per_page=100&type=public) ; [page org](https://github.com/openeducat)
- **[code]** Dépôt `openeducat/openeducat_erp` : `stargazers_count` **913**, `forks_count` **792**, `subscribers_count` **74**, `open_issues_count` **1**, `default_branch` `19.0`, `language` HTML, `has_issues` true, `has_discussions` true, `pushed_at` **2026-11-16T10:30:28Z**, homepage `https://www.openeducat.org`. Lu le 17 novembre 2026. — [API dépôt](https://api.github.com/repos/openeducat/openeducat_erp) ; [page dépôt](https://github.com/openeducat/openeducat_erp)
- **[code]** Recherche `is:issue is:open` : `total_count` **0**. Recherche `is:pr is:open` : `total_count` **1**, la PR **#1082**, titre « Require authenticated session for take-attendance endpoint », ouverte le **2026-11-16T15:11:26Z** par `p-w`, non fusionnée. Le compteur `open_issues_count` de GitHub mélange tickets et PR : le 1 correspond à cette PR, pas à un ticket. — [recherche issues](https://api.github.com/search/issues?q=repo:openeducat/openeducat_erp+is:issue+is:open) ; [PR 1082](https://github.com/openeducat/openeducat_erp/pull/1082)
- **[code]** Contributeurs, `per_page=100&anon=1`, page 2 vide, lu le 17 novembre 2026 : **66** objets avec `login` et **32** objets `"type": "Anonymous"`, soit **98** entrées. Les plus gros volumes dans le début du fichier : `parthivgls` 450, `ajaychauhan727` 143, anonyme `siddharth@techreceptives.com` 126, anonyme « Yusuf Kapasi » `yusuf@techreceptives.com` 89, `mehul0812` 63. — [API contributors](https://api.github.com/repos/openeducat/openeducat_erp/contributors?per_page=100&anon=1)
- **[code]** Dernier commit de la branche par défaut : 16 novembre 2026, cité plus haut. Seule release : `18.0-beta` du 26 novembre 2024, aussi citée plus haut.

### Inferences

- L’activité récente est réelle sur `19.0` (commit la veille du relevé) et sur `20.0` (2 novembre 2026). Elle ne passe pas par des GitHub Releases.
- Zéro ticket ouvert ne mesure pas l’absence de bugs : la PR #1082 est un correctif de session sur un endpoint de présences, et les branches 16/17/18 ont encore reçu des correctifs en avril-mai 2026. Le détail de la PR n’a pas été lu au-delà du titre et de la date.
- Un seul dépôt public veut dire que l’Enterprise, s’il a du code, n’est pas dans cette organisation sous forme de dépôt public.

### Gaps

- Le graphe « contributors » du site GitHub (qui compte parfois autrement que l’API) n’a pas été ouvert. 98 est le total de cette réponse d’API, pas une promesse que chaque personne est distincte (les anonymes sont regroupés par e-mail).
- Pas de décompte des tickets fermés, ni du délai de réponse.
- `open_issues_count` peut changer dans la journée ; les chiffres sont ceux de l’API le 17 novembre 2026.
