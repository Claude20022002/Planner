# Failles des ERP scolaires : OpenEduCat, Frappe Education, Fedena, PERIS SCHOOL, Studirium

15 novembre 2026. Demande du chef de projet : analyser cinq ERP spécialisés pour les établissements, trouver leurs failles, ce que disent leurs utilisateurs, ce qu'ils ne couvrent pas et les problèmes qu'on y trouve. Le document complète [01-concurrents.md](01-concurrents.md) (fiches et prix du 4 novembre) et [07-comparatif-odoo.md](07-comparatif-odoo.md) (Odoo et OpenEduCat, fonction par fonction). Il ne reprend pas ce qu'ils disent déjà, sauf pour le corriger. Le rapport du chef de projet, [Failles des ERP scolaires](<reports/Failles des ERP scolaires.md>) (15 nov.), porte sur d'autres produits (Classter, Kanda OS) : les deux se lisent ensemble, et ce document n'en reprend que les faits relus à la source (décision du 15 nov.).

Choix du chef (15 nov.) : un mélange de deux ERP libres (OpenEduCat, Frappe Education), d'un ERP indien vendu dans le monde (Fedena) et de deux ERP d'Afrique francophone (PERIS SCHOOL, Studirium). Madata Africa, cité dans la demande, a un encadré court (§ 2.6) : ce n'est pas un ERP scolaire.

## 0. Méthode et limites

- **Aucun produit installé ni essayé.** L'essai d'OpenEduCat est prévu à part (PR #176).
- **Le code des produits libres a été lu** sur GitHub le 15 novembre, branche par branche. C'est la preuve la plus solide du document : elle ne dépend ni d'un avis ni d'une page commerciale.
- Les avis d'utilisateurs viennent de G2, Capterra, Software Advice et GetApp. Ces sites refusent la lecture directe. Les avis sont donc connus par les résumés des moteurs de recherche. Les échantillons sont petits, sauf pour OpenEduCat sur G2.
- **Les deux produits africains n'ont aucun avis public** : ni note sur les magasins d'applications, ni avis sur les comparateurs. Tout ce qu'on sait d'eux vient de l'éditeur ou d'articles de presse, souvent sponsorisés.
- **Niveaux de preuve**, sur chaque ligne :
  - **[CODE]** : lu dans le code source public, avec la branche ;
  - **[DÉPÔT]** : ticket, PR ou avis de sécurité du dépôt GitHub ;
  - **[V]** : page de l'éditeur ;
  - **[AVIS]** : avis d'utilisateurs ;
  - **[PRESSE]** : article, sponsorisé quand c'est dit ;
  - **[?]** : non établi.

## 1. Les cinq en un coup d'œil

| | OpenEduCat | Frappe Education | Fedena | PERIS SCHOOL | Studirium |
|---|---|---|---|---|---|
| Éditeur, pays | OpenEduCat Inc., Inde | Frappe Technologies, Inde | Foradian, Inde | PERIS SOLUTIONS, Burkina Faso | Studirium SAS, Douala (Cameroun) |
| Socle | modules sur Odoo 19 | application sur Frappe et ERPNext | Ruby on Rails | non publié | non publié |
| Code source | libre (LGPL v3) pour l'édition Community ; Enterprise fermée | libre | ancienne version libre **abandonnée en 2013-2020** ; version commerciale fermée, code vendu en Enterprise | fermé | fermé |
| Prix | Community gratuite, hébergement à payer ; Enterprise « 25 000 à 60 000 MAD par an pour 500 élèves » [V, page Maroc], soit 4 à 10 MAD par élève et par mois | gratuit ; hébergement Frappe Cloud ou intégrateur | 999, 1 399, 1 699 $ par an, Enterprise sur devis [V] | sur devis [V] | non publié |
| Clients annoncés | « 500+ établissements » [V] | non publié | non publié | « +100 établissements, 9 pays » [V] ; « une vingtaine » en novembre 2024 [PRESSE] | 56 établissements, 12 612 élèves [PRESSE, chiffres de l'éditeur] |
| Avis publics | G2 : environ 147 avis ; Capterra : 4 | aucun (Frappe Cloud : « pas encore d'avis ») | Capterra 4,2 (19 avis), G2 4,2 (13), surtout de 2016 à 2019 | aucun ; l'App Store n'affiche pas de note | aucun |
| Emploi du temps | recopie d'une semaine saisie à la main [CODE] | recopie d'une semaine ; générateur en PR, non publié [CODE] | génération automatique en Ultimate seulement [V] | « détection des conflits », génération floue [V] | non annoncé |

## 2. Fiche par produit

### 2.1 OpenEduCat : un code libre qui envoie des données en Inde

**Ce que montre le code** (dépôt `openeducat/openeducat_erp`, branche `19.0`, lu le 15 nov.) :

1. **Envoi quotidien de données à l'éditeur, sans le dire vraiment** [CODE].
   - Le module de base `openeducat_core` (`models/update.py`) envoie chaque jour à `https://srv.openeducat.org/publisher-warranty/` :
     - le **nom, l'adresse e-mail et le téléphone de l'école** ;
     - le nom de la base et sa date de création ;
     - la langue ;
     - la **liste de tous les modules installés**.
   - Cet envoi **s'ajoute** à celui d'Odoo vers Odoo SA : le code appelle d'abord l'envoi d'Odoo (`publisher_warranty`), puis le sien.
   - La tâche planifiée qui fait l'envoi (`data/ir_cron_data.xml`) est **retirée de la liste des tâches** que voit l'administrateur.
   - Un ticket l'a signalé le 16 juin 2026 ([#1058](https://github.com/openeducat/openeducat_erp/issues/1058)) : la notice ne parle que de « données techniques non personnelles », et rien ne permet de refuser l'envoi. **Le ticket a été fermé trois jours plus tard sans réponse**, et les deux fichiers n'ont pas changé depuis 2025.
   - Pourtant, la page Maroc de l'éditeur dit : « nous ne déplaçons pas les données sans accord écrit » [V].
   - Pour une école marocaine, c'est un transfert de données vers l'étranger, que la loi 09-08 soumet à la CNDP [?, avis juridique à demander].
2. **Pas de générateur d'emploi du temps** [CODE].
   - L'assistant « Generate Timetable » (`openeducat_timetable/wizard/generate_timetable.py`) prend une semaine type **saisie à la main** (jour, enseignant, salle) et la recopie sur chaque date de la période.
   - Il n'optimise rien. Il ne propose rien. Il n'explique rien.
   - Les contrôles de conflit (enseignant, salle, promotion) existent, mais ce sont **des réglages qu'on peut éteindre**, et ils ne font que refuser l'enregistrement.
   - 01-concurrents.md parlait d'un « assistant Generate Timetable » avec contrôles : c'est exact, mais ce n'est pas une génération.
3. **Ce que contient vraiment l'édition gratuite** [CODE]. Le dépôt libre a 12 modules : activités, admission, devoirs, présences, salles, cœur, examens, équipements, frais, bibliothèque, parents, emploi du temps.
   - Tout le reste est dans l'édition Enterprise payante : transport, discipline, santé, LMS, quiz, portail des parents, présence biométrique, multi-campus, tableaux de bord.
   - Les « 74+ modules » annoncés mélangent donc les deux éditions.
4. **Un suivi des tickets qui ne montre rien** [DÉPÔT]. Les 115 tickets sont tous fermés, aucun n'est ouvert. Les derniers sont des installations qui échouent (« Unable to install Openeducat 18 on Odoo 18 », août 2025) ou des questions de mise à jour entre versions.
5. **Massar** : export de listes en CSV « au format du ministère », synchronisation directe « sur la feuille de route » [V]. **Aucun code Massar dans l'édition libre** [CODE].
6. **Arabe et français incomplets** [DÉPÔT, [discussion #1053](https://github.com/openeducat/openeducat_erp/discussions/1053), 18 mai 2026, relue le 15 nov. ; relevée d'abord par le rapport du chef]. Des messages d'erreur du code Python sont écrits en anglais, sans la fonction de traduction d'Odoo, par exemple « The admission date cannot be in the future. ». L'auteur écrit qu'on ne peut pas traduire entièrement l'interface en arabe, en français ou en espagnol sans modifier le code. L'arabe « de droite à gauche » annoncé [V] ne couvre donc pas ces messages.
7. **Aucune CVE publiée** au 15 nov. Ce n'est pas une preuve de sécurité : personne ne semble avoir audité le code publiquement.

**Ce que disent les utilisateurs** [AVIS, G2 surtout] :
- pas prêt à l'emploi : installation et apprentissage difficiles ;
- examens et personnalisation limités ;
- intégrations faibles (13 mentions), assistance faible (13), coût élevé (12) ;
- menus encombrés, termes difficiles, fiche élève vieillie, bibliothèque faible ;
- attribution des matières aux enseignants et saisie des notes compliquées.

### 2.2 Frappe Education : libre, actif, mais fragile

**Ce que montre le code et le dépôt** (`frappe/education`, lu le 15 nov.) :

1. **Fuite des fiches d'élèves, corrigée en octobre 2026** [DÉPÔT, PR #516].
   - Jusqu'au 15 octobre 2026, **tout élève ou parent connecté pouvait lire la fiche de tous les autres élèves** : nom, date de naissance, e-mail, parents, frères et sœurs. Il suffisait de passer par l'API, les listes ou l'export.
   - La même PR remplace des requêtes SQL construites par concaténation, une porte ouverte à l'injection.
   - Le correctif est dans les branches `version-15.2` et `version-16`.
   - L'état des autres branches reste à vérifier par un essai en local (§ 6, point 2). Décision du chef du 15 nov. : rien de plus n'est écrit ici avant que Frappe ait répondu.
2. **Inscription d'élèves par n'importe quel compte** [DÉPÔT, avis GHSA-64v4-cmpc-f27c, août 2026, gravité moyenne]. L'API `enroll_student` ne vérifiait pas les droits : tout utilisateur connecté pouvait inscrire des candidats en attente et créer des fiches d'élèves.
3. **Pas de générateur d'emploi du temps dans une version publiée** [CODE].
   - L'outil de planification recopie une semaine de créneaux saisis à la main.
   - Le ticket « utiliser pyschedule pour planifier les cours » est ouvert **depuis 2016**.
   - Un générateur est en PR ([#495](https://github.com/frappe/education/pull/495), ouverte depuis septembre 2026, non fusionnée). Il place les cours un par un, dans un ordre en partie tiré au hasard (`random.shuffle`). Il n'a ni règles souples ni score à optimiser, mais il « diagnostique » les cours qu'il n'a pas pu placer.
   - **C'est le premier concurrent libre qui s'approche du cœur de Planner.**
4. **Changements qui cassent les mises à jour** [DÉPÔT, CODE].
   - La branche `version-15` a disparu (ticket « Why has the version-15 branch been removed? Which branch is stable? », juin 2026).
   - `develop` renomme des objets entiers : Course devient Subject, Instructor devient Faculty.
   - Le forum signale des mises à jour de v13 à v14 qui échouent et une installation sur v15 en erreur.
   - Un message du forum, non daté, résume : « en l'état, je ne recommande pas le module Éducation ».
5. **Dettes de conception** [DÉPÔT] :
   - chaque élève devient automatiquement un « client » d'ERPNext, sans qu'on puisse l'empêcher (deux tickets de 2026) ;
   - plusieurs écoles sur une installation : demandé en 2025, non natif ;
   - pas d'application mobile (proposition de 2018, toujours ouverte) ;
   - écrans qui plantent en v16 (rapport d'assiduité mensuel, outil de bulletin, page d'admission en erreur 500).
6. **Suivi des tickets non modéré** [DÉPÔT] : environ la moitié des 133 tickets ouverts sont de la publicité (formations à Pune, rédaction de devoirs). Un vrai signalement s'y perd.

**Ce que disent les utilisateurs** : aucun avis sur les comparateurs. Le forum montre surtout des problèmes d'installation, de mise à jour et de plans d'évaluation.

### 2.3 Fedena : une ancienne version libre abandonnée et dangereuse

1. **Failles critiques jamais corrigées dans la version libre 2.3** [PRESSE spécialisée, Pentest Ltd et PortSwigger, 2021].
   - **CVE-2021-27980** : contournement de l'authentification par un cookie de session forgé. Le secret qui signe les cookies est livré avec le logiciel.
   - L'attaque permet de prendre le compte administrateur, puis d'**exécuter des commandes sur le serveur**.
   - Le projet libre (projectfedena) n'a plus de commit depuis mai 2020 [DÉPÔT]. Personne n'a corrigé.
   - La reprise indienne (Sampoorna, Kerala) n'a pas répondu aux chercheurs. Ils n'ont pu tester ni elle ni Fedena Pro, la version commerciale.
   - Recommandation des chercheurs : retirer ces installations d'Internet.
   - On ne sait pas combien d'écoles utilisent encore cette version gratuite (§ 6, point 3).
2. **Version commerciale** [V] :
   - quatre offres de 999 à 1 699 $ par an ;
   - même liste de modules affichée pour les trois premières : la page ne dit pas ce qui les distingue ;
   - générateur d'emploi du temps automatique en Ultimate seulement ;
   - « hébergement cloud chiffré » sans dire où sont les données ;
   - **aucune langue citée**, arabe compris ;
   - la FAQ dit que la version de base est « libre et gratuite », ce que contredit le tableau des offres.
3. **Ce que disent les utilisateurs** [AVIS, petits échantillons, anciens] :
   - installation « très complexe, la plupart des fichiers manquent », un développeur nécessaire ;
   - interface « vieillie » ;
   - assistance lente pour les uns, excellente pour les autres ;
   - report des frais d'une année à l'autre à la main ;
   - paiement non affiché aussitôt ;
   - rapport qualité-prix le moins bien noté (01-concurrents.md, § 7).

### 2.4 PERIS SCHOOL : le plus complet d'Afrique francophone, mais invérifiable

**Ce qu'il annonce** [V, perisschool.com] :
- inscription et préinscription en ligne ;
- frais avec reçus, et argent mobile (Orange Money, Moov, Wave) ;
- comptabilité ;
- **paie et vacataires** (validation des séances, paiement) ;
- notes et bulletins avec moyennes et rangs ;
- emploi du temps avec détection des conflits ;
- SMS, sondages, réclamations, demandes de documents ;
- cantine, transport, internat, bibliothèque, stocks ;
- cartes d'élève à QR code, double authentification et journal d'audit ;
- français, anglais et arabe ;
- applications pour la direction, le personnel et les parents.

C'est **la couverture la plus large des cinq** pour une école privée africaine.

**Ses failles** :
1. **Rien n'est vérifiable** :
   - aucun avis, aucune note sur les magasins ;
   - pas de prix ;
   - aucun lieu d'hébergement (« sécurité des données garantie ») ;
   - aucune politique de confidentialité sur la page d'accueil.
2. **Fiche App Store contradictoire** [V, App Store] : l'éditeur affiché est « DATA 24 », et non PERIS SOLUTIONS. Il déclare que l'application « ne collecte aucune donnée ». Or elle affiche notes, absences, paiements et emploi du temps des enfants. Soit la déclaration est fausse, soit les données ne sont pas rattachées à la personne : à vérifier [?].
3. **Chiffres de clients qui gonflent** : « une vingtaine » d'établissements en novembre 2024 [PRESSE, leFaso.net], « +100 » et « ∞ établissements par compte » en 2026 [V].
4. **Captures d'écran incohérentes** : le même élève doit 45 000 F sur un écran et 345 000 F sur un autre [V]. C'est anodin pour une démonstration, gênant pour un logiciel de caisse.
5. **Ce qu'il ne dit pas** :
   - aucun échange avec un système d'État (ni Massar, ni systèmes d'Afrique de l'Ouest) ;
   - hors ligne pour l'application des parents seulement ;
   - génération automatique de l'emploi du temps floue (« planification automatisée » côté personnel, saisie manuelle côté emploi du temps) ;
   - aucun export complet des données de l'école.

### 2.5 Studirium : une plateforme jeune, centrée sur l'inscription

**Ce qu'il annonce** [PRESSE, WeAreTech juillet 2024, Vitrine du Cameroun] :
- stocker, traiter et archiver les données scolaires ;
- préinscription ;
- **transfert d'élèves d'un établissement à l'autre** ;
- matricule unique pour chaque élève ;
- « pilotage en temps réel » par l'IA [PRESSE, 2025].

**Ses failles** :
1. Fonctions mal décrites :
   - rien sur les notes, les frais, l'emploi du temps, les absences ou la paie ;
   - l'application mobile existe ou non selon le paragraphe du même article.
2. **Activation à la main** : un agent de Studirium vérifie les documents de l'école avant d'ouvrir le compte [PRESSE]. Cela ralentit la mise en route et laisse l'éditeur entre l'école et ses données.
3. **Un matricule maison à côté du matricule de l'État** : le Cameroun a lancé son matricule unique national (plus de 2,4 millions générés [PRESSE, Cameroon Tribune]). Rien ne dit que Studirium le reprend. C'est un risque de double saisie, le défaut que reproche le marché marocain avec Massar.
4. Aucun prix, aucun avis, aucune politique de données publiée. Fondateur différent selon les articles.

### 2.6 Encadré : Madata Africa n'est pas un ERP scolaire

Madata, lancé en 2024 par un entrepreneur ivoirien, est un ERP en ligne pour les indépendants et les petites entreprises d'Afrique francophone : ventes, stock, facturation, comptabilité, paie, CRM, notes de frais [PRESSE, WeAreTech ; fiche Capterra]. **Il le dit lui-même** : sa page école, mise à jour le 29 septembre 2026, écrit « Il n'y a pas de module de vie scolaire », « Madata ne gère ni les notes, ni les emplois du temps, ni les bulletins scolaires » et « Madata n'a pas de module d'inscription scolaire » [V, [page école](https://madata.africa/fr/erp-ecole), relue le 15 nov. ; relevée d'abord par le rapport du chef]. Ce qu'il propose aux écoles, c'est le recouvrement des frais : chaque famille y est un client, et la scolarité se facture en échéances.

Il intéresse Planner pour une autre raison : c'est le genre d'outil comptable qu'une petite école privée peut déjà utiliser. L'export comptable de FIN-02 devrait donc pouvoir l'alimenter, comme Odoo (07-comparatif-odoo.md, § 6). Son format d'import reste à lire [?].

Autres produits africains repérés, non analysés : Lakoli (Côte d'Ivoire, facture normalisée électronique intégrée [PRESSE sponsorisée]), Novacole (200 à 600 XOF par élève et par an [V]), KaribuSchool, GestionEcole (Sénégal, installé en local sans Internet [PRESSE]).

## 3. Les failles communes

Sept défauts reviennent chez plusieurs des cinq. Ce sont les angles où un nouvel entrant peut faire mieux sans être plus large.

| # | Faille commune | Où on la voit | Gravité pour une école |
|---|---|---|---|
| 1 | **L'emploi du temps n'est pas généré** : on saisit une semaine, le logiciel la recopie et refuse les conflits sans rien proposer | OpenEduCat, Frappe [CODE] ; Fedena hors Ultimate [V] ; PERIS flou [V] | forte pour un collège ou un lycée à options, faible pour une maternelle |
| 2 | **Contrôle d'accès des élèves et des parents fragile** : un élève lit les autres, un compte quelconque inscrit des élèves, un cookie forgé donne l'administration | Frappe (2026) [DÉPÔT] ; Fedena 2.3 (2021, jamais corrigé) | très forte : ce sont des données de mineurs |
| 3 | **Données qui partent sans que l'école le sache** : envoi quotidien à l'éditeur, tâche masquée, déclarations de confidentialité contradictoires | OpenEduCat [CODE] ; PERIS (App Store) [V] | forte au Maroc (loi 09-08) et partout en Afrique où une loi existe |
| 4 | **Pas d'échange avec les systèmes de l'État** : au mieux un CSV, souvent rien | tous ; OpenEduCat seul annonce un export Massar, absent de l'édition libre | forte : double saisie, la plainte la plus citée au Maroc |
| 5 | **Mises à jour qui cassent** : branches qui disparaissent, objets renommés, installations qui échouent | Frappe, OpenEduCat [DÉPÔT] ; Odoo (07, § 4) | moyenne à forte : l'école reste sur une vieille version, donc sur ses failles |
| 6 | **Rien de vérifiable pour l'acheteur** : pas de prix, pas d'avis, pas d'hébergement déclaré, chiffres de clients qui varient | PERIS, Studirium, Fedena (hébergement) | moyenne : l'école achète à l'aveugle |
| 7 | **Mise en route lourde** : installation par un développeur, activation manuelle, intégrateur payant | OpenEduCat, Fedena [AVIS] ; Studirium [PRESSE] ; Frappe [DÉPÔT] | forte pour une école sans informaticien |

## 4. Ce qu'ils ne couvrent pas encore

Grille des besoins du rapport du 11 novembre ([Outils scolaires et besoins par pays](<reports/Outils scolaires et besoins par pays.md>)), réduite aux points où les cinq se distinguent. **✅** fait, **🟡** en partie ou annoncé sans preuve, **❌** absent, **?** non établi. La colonne Planner reprend `docs/plan/suivi.md` au 15 nov.

| Besoin | OpenEduCat (libre) | Frappe | Fedena | PERIS | Studirium | Planner |
|---|---|---|---|---|---|---|
| C. Emploi du temps **généré** sous contraintes, avec règles souples | ❌ [CODE] | ❌ publié, 🟡 en PR [CODE] | 🟡 Ultimate | ? | ❌ | ✅ solveur ; MOT-13 en cours |
| C. **Explication** de chaque refus et solution proposée | ❌ (refus seul) | 🟡 diagnostic en PR | ? | ? | ❌ | 📋 MOT-03 (#183), EDT-03 |
| C. Remplacement d'un enseignant absent | 🟡 [V, non revérifié] | ❌ | ? | ? | ❌ | 📋 MOT-09 |
| D. Appel en un geste en classe | 🟡 feuilles de présence | 🟡 | 🟡 | 🟡 | ? | ✅ QR code |
| F. Argent mobile africain | ❌ | ❌ | ? | ✅ [V] | ? | ⏸ PAI-03 |
| G. Chaîne « séance prévue, faite, visée, payée » des vacataires | ❌ | ❌ | ? | 🟡 [V] | ❌ | 📋 RHP-01, RHP-03 |
| N. Échange avec l'État (Massar, matricule national) | 🟡 CSV annoncé, absent du libre | ❌ | ❌ | ❌ | ❌ (matricule maison) | 📋 ETA-01, ETA-02 |
| O. Hors ligne | ❌ | ❌ | ❌ | 🟡 parents seulement | ❌ | 📋 MOB-06 |
| O. Isolation des données testée sur chaque route | ? | ❌ (fuite en 2026) | ❌ (2.3) | ? | ? | 📋 PLA-04 ; règle « 404 hors de ses classes » |
| O. Aucun envoi de données à l'éditeur, ou envoi déclaré et refusable | ❌ [CODE] | ? | ? | ? | ? | 📋 EP-13, QUA-09 |
| O. Export complet des données de l'école | 🟡 export d'Odoo | 🟡 export de Frappe | ? | ❌ annoncé | ❌ | 📋 PLA-12 |
| P. Plusieurs écoles sur une installation | 🟡 Enterprise | ❌ (demandé en 2025) | ? | ✅ annoncé | ✅ annoncé | 📋 PLA-01 à PLA-07 |
| Arabe de droite à gauche | ✅ [V] | ? | ❌ non cité | ✅ annoncé | ❌ | 📋 UIX-04 |
| Prix public | 🟡 fourchette | gratuit | ✅ | ❌ | ❌ | gelé (VEN) |

**Ce qu'aucun des cinq ne fait** :
- générer et **expliquer** un emploi du temps ;
- échanger avec un système d'État autrement que par un fichier ;
- garantir par écrit qu'aucune donnée ne part chez l'éditeur ;
- faire tester l'isolation des données par rôle à chaque version.

## 5. Ce qu'on en retient pour Planner

Propositions, à trancher par le chef de projet. Les identifiants renvoient au plan.

| Constat | Conséquence proposée | Nature |
|---|---|---|
| Aucun des cinq ne génère ni n'explique l'emploi du temps ; Frappe s'y met (PR #495) avec un placement au hasard, sans règles souples | Garder l'emploi du temps **expliqué** comme premier argument. Mener à bout MOT-03 et EDT-03 avant qu'un générateur libre ne rattrape. Ajouter la PR #495 de Frappe au comparatif de MOT-02 dès sa publication | argument ; priorité dans le chantier MOT |
| La fuite des fiches d'élèves de Frappe est exactement le défaut que PLA-04 doit empêcher | Ajouter aux tests de PLA-04 le cas « un élève, ou un parent, demande la fiche d'un autre par l'API, une liste ou un export », sur **chaque** branche avant fusion | exigence (EP-12) |
| La faille de Fedena vient d'un secret livré avec le logiciel | Vérifier qu'aucun secret par défaut ne reste dans une installation neuve (PLA-03b, EXP-02) ; l'inscrire dans le test d'intrusion EXP-08 | exigence |
| OpenEduCat envoie chaque jour des données de l'école à l'éditeur, en le cachant | **Écrire que Planner n'envoie rien chez l'éditeur sans le dire**, avec une liste publique des envois sortants (sauvegardes, IA, courriel), et la tenir à jour. C'est un argument fort face à la loi 09-08. **Retenu le 15 nov.** : exigence EP-13 | exigence (EP-13) |
| Les déclarations de confidentialité des magasins d'applications sont contradictoires chez PERIS | Remplir les fiches « confidentialité » de l'application mobile avec ce qu'elle collecte vraiment, avant toute publication (MOB) | exigence |
| Personne n'échange avec l'État autrement que par un fichier ; Studirium crée un matricule maison | ETA-02 reprend le **matricule de l'État** (Massar au Maroc) comme identifiant, sans en créer un autre | conception (VSC-01, ETA-01) |
| Mises à jour qui cassent chez Frappe et OpenEduCat ; les écoles restent sur des versions trouées | EP-9 déjà écrite (« les mises à jour ne cassent rien ») : la mettre en avant dans l'argumentaire, avec le retour arrière en une commande | argument |
| Ni Planner, ni OpenEduCat, ni Frappe n'ont de `SECURITY.md`. Frappe a pourtant ouvert le signalement privé de GitHub, et c'est par lui qu'est arrivé l'avis sur `enroll_student` | Ajouter un `SECURITY.md` (comment signaler une faille, délai de réponse) et ouvrir le signalement privé sur le dépôt public. Petit lot pour QUA | proposition (QUA) |
| PERIS couvre déjà largement l'école privée africaine (frais, argent mobile, paie des vacataires, arabe) | Ne pas attaquer l'Afrique de l'Ouest par la largeur. Si VEN-02 y mène, y aller par l'emploi du temps et l'intégration (export comptable, import des élèves), comme au Maroc (01, § 6) | stratégie, VEN-02 |
| Aucun avis vérifiable sur les produits africains | Les cinq entretiens de VEN-02 doivent demander quel logiciel l'école a essayé et pourquoi elle l'a quitté : c'est la seule source fiable sur ces produits | question pour VEN-02 |

**Décisions du chef du 15 novembre** ([decisions.md](../plan/decisions.md)) :
- EP-13 « Aucun envoi caché », dès l'étape 1, et la liste publique des envois sortants (QUA-09) ;
- PLA-04 teste aussi qu'un élève ou un parent ne lit pas la fiche d'un autre élève ;
- `SECURITY.md` et signalement privé sur le dépôt (QUA-08) ;
- fiches « confidentialité » de l'application relues avant toute publication (MOB) ;
- ETA-02 identifie l'élève par le matricule de l'État ;
- essai en local chez Frappe Education avant tout signalement, et rien de public avant leur réponse.

Les autres lignes du tableau (argument, stratégie, questions pour VEN-02, secret par défaut pour EXP-08) restent des propositions.

## 6. À vérifier avant d'utiliser ce document dans un argumentaire

1. **OpenEduCat** : installer l'édition libre (plan de la PR #176) et observer l'envoi quotidien (contenu réel, possibilité de le couper). Faire relire la question de la loi 09-08 par un juriste avant d'en parler à un client.
2. **Frappe Education** : essayer **en local**, sans donnée réelle, le contrôle d'accès aux fiches d'élèves des branches non publiées ; si une faille se confirme, le chef la signale à Frappe par leur canal privé, **avant** toute mention publique (décision du chef du 15 nov.).
3. **Fedena** : savoir si des écoles marocaines ou africaines utilisent encore la version 2.3 (recherche de terrain, VEN-02). Ne jamais sonder une installation qui n'est pas la nôtre.
4. **PERIS SCHOOL** : demander un devis et une démonstration ; lire sa politique de confidentialité et son hébergement ; comprendre le lien entre « DATA 24 » et PERIS SOLUTIONS.
5. **Studirium** : savoir s'il reprend le matricule national camerounais.
6. **Madata** : lire son format d'import comptable (pour FIN-02).
7. Les avis de G2 sur OpenEduCat sont connus par leur résumé : lire les avis eux-mêmes pour en dater la majorité.

## Sources

Lues le 15 novembre 2026.

- **OpenEduCat**
  - Code : [dépôt](https://github.com/openeducat/openeducat_erp), branche `19.0` : `openeducat_core/models/update.py`, `openeducat_core/data/ir_cron_data.xml`, `openeducat_timetable/wizard/generate_timetable.py`, `openeducat_timetable/models/timetable.py`
  - Ticket [#1058](https://github.com/openeducat/openeducat_erp/issues/1058)
  - [Page Maroc](https://openeducat.org/fr/solutions/school-management-system-in-morocco/)
  - Avis : [G2](https://www.g2.com/products/openeducat/reviews), [Capterra](https://www.capterra.ca/reviews/182870/openeducat), [GetApp](https://www.getapp.ca/software/130135/openeducat), [Software Advice](https://www.softwareadvice.com.au/software/199558/openeducat)
- **Frappe Education**
  - Code et dépôt : [dépôt](https://github.com/frappe/education), [PR #516](https://github.com/frappe/education/pull/516) (fuite des fiches d'élèves, SQL), [PR #495](https://github.com/frappe/education/pull/495) (générateur), [avis GHSA-64v4-cmpc-f27c](https://github.com/frappe/education/security/advisories/GHSA-64v4-cmpc-f27c), tickets ouverts
  - [Frappe Cloud](https://cloud.frappe.io/marketplace/apps/education)
  - Forum : [« What do you want from Frappe Education Module? »](https://discuss.frappe.io/t/what-do-you-want-from-frappe-education-module/112146), [catégorie Éducation](https://discuss.frappe.io/c/erpnext/schools-college-education/40?page=1)
- **Fedena**
  - Failles : [Pentest Ltd, recherche](https://pentest.co.uk/labs/research/fedena-school-management-software/), [CVE-2021-27980](https://pentest.co.uk/labs/fedena-authentication-bypass-cve-2021-27980/), [PortSwigger](https://portswigger.net/daily-swig/critical-zero-day-vulnerabilities-found-in-unsupported-fedena-school-management-software)
  - [Dépôt libre](https://github.com/projectfedena/fedena), [tarifs](https://fedena.com/pricing-and-plans)
  - Avis : [Capterra](https://www.capterra.com/p/126199/Fedena-Pro/reviews/), [G2](https://www.g2.com/products/fedena), [Software Advice](https://www.softwareadvice.com/school-management/fedena-profile/)
- **PERIS SCHOOL** : [site](https://www.perisschool.com/), [App Store](https://apps.apple.com/us/app/peris-school/id6467809255), [leFaso.net, 20 nov. 2024](https://lefaso.net/spip.php?article134289=), [G2](https://www.g2.com/products/peris-school/reviews)
- **Studirium** : [WeAreTech, juillet 2024](https://www.wearetech.africa/fr/fils/solutions/au-cameroun-studirium-numerise-l-ecosysteme-scolaire), [Vitrine du Cameroun](https://vitrineducameroun.com/?p=12737), [VC4A](https://vc4a.com/ventures/studirium-sas/) ; matricule national : [Cameroon Tribune](https://cameroon-tribune.cm/article.html/68671/fr.html/details_2)
- **Madata** : [WeAreTech](https://www.wearetech.africa/fr/fils/tech-stars/stephane-lavri-centralise-la-gestion-des-pme-africaines-via-madata), [Capterra](https://www.capterra.co.za/software/1109583/Madata)
- **Autres** : [Lakoli, Fratmat (publireportage)](https://www.fratmat.info/article/2644696/publi-reportage/de-la-finance-a-la-tech-eunice-coulibaly-cree-lakoli-pour-simplifier-la-gestion-des-ecoles-ivoiriennes), [Novacole](https://novacole.com/), [KaribuSchool](https://karibu-school.com/), [GestionEcole](https://gestionecole.site/)
- **Dans le dépôt** : [rapport du chef, Failles des ERP scolaires](<reports/Failles des ERP scolaires.md>) (Classter, Kanda OS, Madata), [01-concurrents.md](01-concurrents.md), [07-comparatif-odoo.md](07-comparatif-odoo.md), [Outils scolaires et besoins par pays](<reports/Outils scolaires et besoins par pays.md>), [suivi.md](../plan/suivi.md)
