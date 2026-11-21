# Prix, déploiement et adéquation d'OpenEduCat (Maroc et Afrique francophone)

Relevé au 17 novembre 2026. Les prix sont recopiés tels qu'écrits, sans conversion. Les pages pays d'openeducat.org (Maroc, Algérie, Tunisie, Kenya, Égypte, etc.) suivent le même gabarit marketing : elles ne valent pas un déploiement documenté.

Légende : **[V]** source primaire de l'éditeur (page, documentation, dépôt), chiffre tel qu'écrit. **[tiers]** source indépendante. **[?]** affirmation non corroborée, page marketing programmatique, ou contredite ailleurs.

La grille chiffrée d'OpenEduCat n'est pas dans le HTML de la page pricing (configurateur). Elle est dans le fichier officiel `https://openeducat.org/llms-full.txt`, « Last regenerated: 2026-10-26 ». La page `https://www.odoo.com/pricing` a été lue le 17 novembre 2026 ; elle affiche des dollars. Odoo et OpenEduCat disent tous deux que le prix dépend du lieu : un visiteur au Maroc peut voir une autre grille. Cette autre grille n'a pas été obtenue.

---

## Prix officiels OpenEduCat

### Takeaway

L'édition Community est annoncée gratuite, sous LGPL-3, sans redevance par élève. L'Enterprise n'est pas un forfait « contactez-nous » : c'est une grille publique en dollars, par socle obligatoire, par module et par pack d'utilisateurs, en cloud annuel ou en licence on-premise unique. Ce qui compte comme « utilisateur », et donc la facture d'une école, n'est pas tranché : une page parle de personnel seulement à 19 dollars par utilisateur et par mois, la grille officielle vend des packs de 25 à 10 000 utilisateurs.

### Cited Findings

- Community : « completely free and open source under the LGPL v3 license », téléchargement, installation et modification sans coût, sur ses propres serveurs. — [FAQ OpenEduCat](https://openeducat.org/faq/) ; même formulation sur [pricing](https://openeducat.org/pricing/) et [compare-editions](https://openeducat.org/compare-editions/). **[V]**
- La page comparaison décrit Community comme couvrant le SIS (élèves, cours, promotions, programmes), les admissions, les frais et la bibliothèque, avec présences, examens, devoirs et emploi du temps en version « basic », et sans IA, LMS complet, gradebook, internat, transport ni alumni. Enterprise ajoute ces modules, le portail parents, le CRM et le support vendeur. — [compare-editions](https://openeducat.org/compare-editions/). **[V]**
- Licence Enterprise v1.0 : usage seulement avec un accord Enterprise valide « for the correct number of users and the correct number of apps or modules ». Texte juridique sur la doc rebrandée Odoo 19. — [doc.openeducat.org, licences](https://doc.openeducat.org/19.0/legal/legal.html). **[V]**
- Page licence commerciale, effective 1 January 2024 : abonnement annuel, mises à jour et support pendant l'abonnement, reconduction automatique sauf annulation 30 jours avant, changement de prix possible avec préavis de 60 jours. Les délais de support « depend on your support tier », sans grille de paliers nommés ni prix de palier. — [enterprise-license](https://openeducat.org/enterprise-license/). **[V]**
- Filet commercial, page pricing, lu le 17 novembre 2026 : « 70+ modules from $79/year », « Cloud or on-premise », « No per-student fees », « 2 years + 3rd year free », « No setup fees, no per-student charges », packs « from 25 to 10,000+ (cloud) or unlimited (on-premise, one-time fee) ». Essai « Try it free for 15 days. No credit card required. » — [pricing](https://openeducat.org/pricing/). **[V]**
- Grille « standard list prices » en USD, régénérée le 2026-10-26. « Pricing is location-based: in some regions a lower regional price list applies automatically ». Tout déploiement Enterprise exige le Core. Cloud facturé 1 an ou 2 ans ; on-premise = achat unique. — [llms-full.txt](https://openeducat.org/llms-full.txt). **[V]**

Socle et modules utiles à une école (cloud 1 an / cloud 2 ans / on-premise unique), mêmes source et date :

- OpenEduCat Core : $489 / $978 / $1,319. **[V]**
- Exam, Parent, Classroom, Assignment, Achievement : $79 / $158 / $208 chacun. **[V]**
- Admission, Attendance, Fees, Timetable, Library, Transportation, Campus, Quiz : $160 / $320 / $439 chacun. **[V]**
- Advance Accounting : $329 / $658 / $889. Grade Book et LMS : $499 / $998 / $1,319 chacun. **[V]**

Packs d'utilisateurs, même source :

- 25 Users : $29 / $58 / « Cloud only ».
- 50 Users : $119 / $238 / « Cloud only ».
- 100 Users : $179 / $358 / « Cloud only ».
- 500 Users : $349 / $698 / $939.
- 1000 Users : $599 / $1,198 / $1,649.
- 2000 Users : $849 / $1,698 / $2,309.
- 5000 Users : $1,689 / $3,378 / $4,619.
- 10000 Users : $2,739 / $5,478 / $7,479.
- Unlimited Users : on-premise seulement, $13,749.

La FAQ reprend les mêmes ordres de grandeur : modules « start at $79/year each (US pricing) », « 500 users for $349/year up to 10,000 users for $2,739/year ». — [FAQ](https://openeducat.org/faq/). **[V]**

Heures de service, achat unique, « the same price applies to every plan » : 25 h $1,379 ; 50 h $2,199 ; 100 h $3,449 ; 200 h $6,299 ; 300 h $9,199 ; 400 h $12,599 ; 500 h $15,499 ; 1000 h $30,999. — [llms-full.txt](https://openeducat.org/llms-full.txt). **[V]**

Applications mobiles, cloud 1 an / 2 ans / on-premise : Android $889 / $1,778 / $2,639 ; iOS $1,179 / $2,358 / $3,519. — même fichier. **[V]**

- Page « free LMS », contredite par la grille : « Enterprise pricing is per staff user (teacher, admin) starting at $19/user/month, learners, parents, and alumni never count against the seat total. » Hébergement Community « typically $30-80/month for a 2,000-student institution. » — [free-lms-software](https://openeducat.org/solutions/free-lms-software/). **[?]**
- Page Maroc du vendeur : Community = petit VPS marocain « around 3,000-6,000 MAD per year » plus un contact IT à temps partiel. Enterprise « for 500 students typically land in the 25,000-60,000 MAD per year range depending on modules and support level, before any one-time migration help. » Le texte dit que c'est une « honest market range », pas un devis, et qu'il faut un appel de découverte. — [school-management-system-in-morocco](https://openeducat.org/solutions/school-management-system-in-morocco/). **[?]** comme tarif, **[V]** comme phrase publiée par le vendeur.
- Un blog marocain reprend ces deux fourchettes MAD et le schéma import-export Massar, en citant la page du vendeur. Ce n'est pas un second relevé de prix. — [Salaheddine El Fatimi](https://salaheddine-elfatimi.com/blog/school-management-software-morocco). **[tiers]**
- Mise en œuvre commerciale, sans prix forfaitaire : « 6–12 weeks » en moyenne, chef de projet, migration, formation, hypercare. La FAQ dit 4 à 12 semaines selon la taille, et 4 à 6 semaines par campus additionnel en multi-campus. — [implementation](https://openeducat.org/implementation/) ; [FAQ](https://openeducat.org/faq/). **[V]**
- Support : Community = forum, issues GitHub, documentation. Enterprise = e-mail prioritaire, tickets, téléphone, « defined SLAs », sans chiffres de délai sur la FAQ. — [FAQ](https://openeducat.org/faq/). **[V]**

### Inferences

- La facture logicielle Enterprise d'une école privée n'est pas un prix par élève publié. C'est Core + les modules cochés + un pack. Les packs 25, 50 et 100 n'existent qu'en cloud : une petite école qui veut l'on-premise Enterprise démarre, sur cette grille, au pack 500 utilisateurs ($939 une fois) ou à l'illimité ($13,749 une fois), plus le Core on-premise ($1,319).
- Exemple d'arithmétique, pas un devis, cloud 1 an, liste USD du 2026-10-26 : Core 489 + Admission 160 + Attendance 160 + Fees 160 + Exam 79 + Parent 79 + Timetable 160 = 1 287 dollars de modules, plus le pack (29, 179 ou 349 dollars selon que le pack utile est 25, 100 ou 500). Les heures, le mobile et l'hébergement sont en plus. Si les élèves comptent dans le pack, une école de 800 élèves tombe dans le palier 1 000 utilisateurs à 599 dollars par an, pas dans le palier 25.
- Les 25 000 à 60 000 MAD « pour 500 élèves » ne se déduisent pas de la grille USD. Tant que la définition d'utilisateur et la grille régionale Maroc ne sont pas lues sur le configurateur, cette fourchette reste un argumentaire.

### Gaps

- Définition contractuelle d'« user » OpenEduCat : personnel seulement, ou tout compte y compris élèves et parents. Les deux textes officiels se contredisent.
- Grille régionale effectivement servie au Maroc (le fichier dit qu'elle peut être plus basse).
- Paliers de support nommés et leurs délais chiffrés.
- Prix d'un intégrateur marocain ou ouest-africain : aucune source trouvée.
- Ce que couvre « 2 years + 3rd year free » module par module (la colonne « 2 years » du fichier est le double de la colonne 1 an, ce qui ne montre pas à elle seule une troisième année offerte).

---

## Prix Odoo qu'une école paierait en plus

### Takeaway

OpenEduCat est un socle de modules sur le framework Odoo, pas un remplacement automatique de la licence Odoo. La page odoo.com/pricing du 17 novembre 2026 affiche, en dollars, Standard à 31,10 dollars par utilisateur et par mois en annuel (38,90 en mensuel) et Custom à 61,00 (76,20 en mensuel). Odoo.sh et l'on-premise Odoo Enterprise passent par Custom, et l'hébergement Odoo.sh est facturé en plus de la licence. Community Odoo n'a pas de ligne sur cette page.

### Cited Findings

- OpenEduCat « built on the Odoo framework », pile « Python, Odoo framework, PostgreSQL ». Siège Ahmedabad, fondé en 2014. — [llms-full.txt](https://openeducat.org/llms-full.txt), régénéré le 2026-10-26. **[V]**
- Le dépôt public `openeducat/openeducat_erp` est le code Community (branche par défaut 19.0). Le fichier `openeducat_core/i18n/fr.po` porte « Project-Id-Version: Odoo Server 19.0 ». — [GitHub](https://github.com/openeducat/openeducat_erp) ; [fr.po brut, branche 19.0](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/openeducat_core/i18n/fr.po). **[V]**
- Page Odoo lue le 17 novembre 2026, montants affichés en USD. Standard : « US$ 31.10 » et « US$ 38.90 ». Custom : « US$ 61.00 » et « US$ 76.20 ». La mise en page montre aussi « $ 24 31 .90 .10 » et « $ 49 61 », sans phrase qui attribue le plus petit nombre à la première année. — [odoo.com/pricing](https://www.odoo.com/pricing). **[V]**
- Lecture datée du 10 novembre 2026 par un intégrateur, qui dit avoir lu la même page US : Standard 31,10 dollars par utilisateur et par mois en annuel, 38,90 en mensuel ; Custom 61,00 et 76,20 ; remise de 20 % les 12 premiers mois sur les utilisateurs commandés au départ, soit 24,90 et 49. Community : pas de redevance. One App Free : 0 dollar, une application Enterprise, utilisateurs illimités, sur Odoo Online. Light User : 8,90 dollars, sur devis. — [Gigabit](https://gigabit.agency/insights/odoo-pricing/). Recoupé au 21 octobre 2026 par [ECOSIRE](https://ecosire.com/tools/erp-cost-calculator/odoo) et au 28 septembre 2026 par [Allodi](https://allodi.us/odoo-sh-vs-self-hosted-cost.html) pour Standard, Custom et Light User. **[tiers]**
- La FAQ Odoo décrit le plan « One App Free » et écrit que l'usage de l'application choisie et de ses dépendances « is free for unlimited users, forever ». Elle ne réécrit pas le montant 0 dans l'extrait obtenu. — [odoo.com/pricing](https://www.odoo.com/pricing). **[V]**
- Utilisateur payant Odoo : accès au back-end pour créer, voir ou modifier, ou fiche employé sans utilisateur lié. Les utilisateurs externes du portail (clients, fournisseurs) ne paient pas. — même page. **[V]**
- Standard = Odoo Online, sans modules custom. Custom = Odoo Online sans supplément, ou Odoo Enterprise téléchargé et auto-hébergé, ou Odoo.sh. Le plan Custom est décrit comme celui du multi-société, de Studio, de l'IA agentique, des développements et de l'API externe. — même page. **[V]**
- Contradiction sur la même page. Une réponse dit que le plan gratuit autorise plusieurs sociétés et Studio. Une autre dit qu'installer Studio ou ajouter des sociétés fait basculer en Custom. — [odoo.com/pricing](https://www.odoo.com/pricing). **[V]** les deux phrases ; le sens opérationnel est **[?]**.
- Inclus dans Standard et Custom sur Odoo Online : hébergement, sauvegardes, support e-mail lundi-vendredi en anglais, français, espagnol ou néerlandais, mises à niveau. Exclu : hébergement Odoo.sh, implémentation, crédits in-app, maintenance du code custom. L'implémentation n'a pas de prix sur la page : Success Packs et estimateur en dessous de 50 employés, partenaire au-delà. — même page. **[V]**
- Odoo.sh, page lue le 17 novembre 2026 : les montants ne se sont pas affichés (page dynamique). Le texte dit de prendre l'hébergement dédié au-delà de 16 workers et au-delà de 512 Go, et « The hosting price does not include the enterprise licence ». — [odoo.sh/pricing](https://www.odoo.sh/pricing). **[V]**
- Montants Odoo.sh relevés par Gigabit le 10 novembre 2026 sur cette page : worker 57,60 dollars par mois en annuel (72 en mensuel), stockage 0,20 dollar par Go et par mois en annuel (0,25 en mensuel), staging 14,40 dollars par environnement (18 en mensuel), dédié 480 dollars par mois en annuel (600 en mensuel). Allodi, 28 septembre 2026, a les mêmes unitaires mais écrit que le dédié est requis au-dessus de 8 workers, pas 16. — [Gigabit](https://gigabit.agency/insights/odoo-pricing/) ; [Allodi](https://allodi.us/odoo-sh-vs-self-hosted-cost.html). **[tiers]** ; le seuil 8 contre 16 est **[?]**.

### Inferences

- Trois additions possibles, à ne pas confondre. (1) Community OpenEduCat sur Odoo Community, auto-hébergé : la grille OpenEduCat est à zéro et la page de prix Odoo ne montre pas de ligne Community. (2) Cloud géré OpenEduCat : la grille OpenEduCat ne mentionne pas une ligne « licence Odoo » ; rien n'établit qu'Odoo SA est inclus ou exclu. (3) Odoo.sh ou Odoo Enterprise on-premise plus modules OpenEduCat : licence Odoo Custom par utilisateur back-end, plus Odoo.sh si cette plateforme est choisie, plus Core et modules OpenEduCat. Les parents et élèves qui restent sur le portail Odoo ne sont pas des utilisateurs payants Odoo ; les enseignants qui saisissent dans le back-end le sont.
- Le français du support Odoo (e-mail, quatre langues dont le français) est un fait Odoo Online / Enterprise. Ce n'est pas un support OpenEduCat en français.

### Gaps

- Prix Odoo servis à une société dont le pays est le Maroc (la page est géolocalisée ; le relevé est en USD).
- Phrase officielle OpenEduCat disant si son cloud ou son Enterprise exige, inclut ou remplace un abonnement Odoo Enterprise.
- Prix chiffré d'un Success Pack Odoo pour une école : la page renvoie à un estimateur, sans montant.
- Montants Odoo.sh relus sur la page officielle le 17 novembre 2026 : non obtenus, la page n'a pas rendu les chiffres.

---

## Déploiement, base de données, compétences

### Takeaway

Quatre voies sont écrites par le vendeur : auto-hébergement Linux, image Docker `openeducat/openeducat:19.0`, cloud géré OpenEduCat, et, si l'on passe par Odoo SA, Odoo Online, Odoo.sh ou on-premise. La base est PostgreSQL. Le port 8069 de la documentation est celui d'Odoo. La documentation d'installation officielle se résume à « chercher le GitHub » : une école sans personne Odoo a besoin d'un intégrateur, même si aucun texte ne l'impose.

### Cited Findings

- Téléchargement Community : « Windows, Linux, or Docker », versions « v19.0 · v18.0 · v17.0 », licence LGPL-3, et la commande `docker pull openeducat/openeducat:19.0`. — [download](https://openeducat.org/download/). **[V]** L'image n'a pas été tirée pour vérifier qu'elle existe encore. **[?]** sur la disponibilité réelle du jour.
- Page IT : on-premise Ubuntu/Debian, cloud AWS, Azure ou GCP, « Docker Compose and Kubernetes », code sur GitHub. — [for/it-administrators](https://openeducat.org/for/it-administrators/). **[V]** comme promesse ; un fichier compose officiel n'a pas été ouvert. **[?]**
- Prérequis, « Last updated: January 2026 ». Jusqu'à 500 élèves : 2 cœurs, 4 Go de RAM, 20 Go SSD, PostgreSQL 12+ (recommandé 4 cœurs, 8 Go, 50 Go, PostgreSQL 14+). 500 à 2 000 élèves : 4 à 8 cœurs, 8 à 16 Go, PostgreSQL 14+ ou 15+. Au-delà de 2 000 : 8 à 16 cœurs, 16 à 32 Go, PostgreSQL 15+ ou 16+ en cluster. OS pleinement supportés : Ubuntu 22.04 LTS, Debian 11/12. Windows Server « Supported (Docker) ». Ports : 443, 80, 8069 « Odoo (if not proxied) », 5432 PostgreSQL interne. TLS requis en production. — [system-requirements](https://newdocs.openeducat.org/getting-started/system-requirements/). **[V]**
- Guide d'installation de la doc 19 : « Go to google.com and search OpenEduCat github », puis télécharger le ZIP. Pas de procédure PostgreSQL, worker ni sauvegarde. — [how-to-install-openeducat](https://doc.openeducat.org/19.0/applications/Installation/how-to-install-openeducat.html). **[V]**
- Page comparaison : Community convient à « institutions with in-house Odoo or Python expertise ». — [compare-editions](https://openeducat.org/compare-editions/). **[V]**
- Cloud géré : « updates, backups, security patches included », « 99.9% uptime SLA » sur la page plateforme. SLA chiffré ailleurs non trouvé dans la FAQ (la question existe, la réponse n'était pas dans l'extrait). — [pricing](https://openeducat.org/pricing/) ; [features/platform](https://openeducat.org/features/platform/). **[V]** pour l'annonce ; le contrat de SLA n'a pas été lu. **[?]**
- Odoo.sh : intégration GitHub, SSH, sauvegardes, branches de dev illimitées ; la licence Enterprise n'est pas dans le prix d'hébergement. — [odoo.sh/pricing](https://www.odoo.sh/pricing). **[V]**

### Inferences

- Pour une école marocaine sans administrateur Odoo, le chemin réaliste est un intégrateur Odoo qui installe les modules Community, ou un projet Enterprise avec les heures OpenEduCat (dès 1 379 dollars pour 25 heures) plus un relais local. Le vendeur vend les heures ; il ne publie pas de partenaire marocain.
- Le dimensionnement « 500 élèves = 4 Go de RAM » est celui du vendeur pour un petit établissement. Il ne dit rien de la charge des portails parents un soir de bulletins.

### Gaps

- Version minimale de Python : la page free-LMS dit 3.10+, les prérequis de janvier 2026 ne la donnent pas.
- Procédure Docker Compose maintenue : annoncée, fichier non lu.
- Région et hébergeur réels du cloud OpenEduCat (voir résidence des données).
- Coût d'un VPS au Maroc : seule la fourchette 3 000 à 6 000 MAD par an de la page marketing, non recoupée avec un tarif d'hébergeur.

---

## Langues : français, arabe, RTL, anglais

### Takeaway

L'anglais est la langue source. Le français et l'arabe existent comme fichiers de traduction du module Community `openeducat_core` et d'autres modules du dépôt public. Le fichier français du cœur, révisé le 31 octobre 2025, a autant de `msgstr` que de `msgid` et aucune entrée floue, mais son en-tête n'a pas de langue ni de règles de pluriel, et plusieurs libellés sont des calques. Aucun pourcentage officiel de traduction n'est publié. L'arabe du dépôt est `ar_001`, pas un arabe marocain.

### Cited Findings

- Le fichier produit liste « UI languages supported: English, Arabic (RTL), Chinese, French, German, Portuguese, Spanish ». — [llms-full.txt](https://openeducat.org/llms-full.txt), 2026-10-26. **[V]**
- `openeducat_core/i18n/fr.po` sur la branche 19.0 : « POT-Creation-Date: 2025-10-31 », « PO-Revision-Date: 2025-10-31 », « Project-Id-Version: Odoo Server 19.0 ». Comptage sur le fichier brut : 890 lignes `msgid "` et 890 lignes `msgstr "`. Aucune ligne `msgstr ""` seule, aucun marqueur `fuzzy`. L'en-tête a `Plural-Forms` vide et pas de champ `Language`. Exemples de libellés : « Bonafide Certificate » traduit « Certificat de bonne foi », « Achievement Enterprise » traduit « Réalisation Entreprise ». — [fr.po](https://raw.githubusercontent.com/openeducat/openeducat_erp/19.0/openeducat_core/i18n/fr.po). **[V]**
- Des `fr.po` et `ar_001.po` sont tenus dans plusieurs modules Community (activity, admission, attendance, classroom, core, fees, etc.). Un commit du 13 décembre 2022 est intitulé « module French translation ». Un commit ultérieur retire `ar.po` et ajoute `ar_001.po`. — [commit français](https://github.com/openeducat/openeducat_erp/commit/93ea4c2cc7e80f38601e9b062eb060f0151603bf) ; [commit PO 18.0](https://github.com/openeducat/openeducat_erp/commit/08ffe9606e13b2ac668094e7a52c47098e175990) ; [commit ar_001](https://github.com/openeducat/openeducat_erp/commit/5f22b1948cc9ff0caea77c15f1c97943bc1928e7). **[V]**
- Page Maroc : interface « Arabic (RTL), French, and English », tamazight « not yet shipped », écarts « in niche admin labels », libellés surchargeables par l'école. — [school-management-system-in-morocco](https://openeducat.org/solutions/school-management-system-in-morocco/). **[?]** pour « production-grade » et « over a decade » ; le fait que des fichiers fr et ar existent est **[V]** via le dépôt.
- Page Algérie : « Full trilingual localization » arabe, français et tamazight, chiffres arabes ou occidentaux. — [school-management-system-in-algeria](https://openeducat.org/solutions/school-management-system-in-algeria/). **[?]** Le dépôt public vu ici n'a pas montré de fichier tamazight.
- Le support e-mail d'Odoo SA est proposé en français, parmi quatre langues. — [odoo.com/pricing](https://www.odoo.com/pricing). **[V]** C'est le support Odoo, pas celui d'OpenEduCat.

### Inferences

- Une école peut afficher le cœur Community en français sans tout retraduire : le fichier du 31 octobre 2025 est rempli. Elle ne peut pas en déduire un vocabulaire de bulletin marocain (contrôle continu, conseil de classe, cycle, maternelle). Les calques montrent une traduction de chaînes, pas une localisation scolaire.
- L'interface réelle est Odoo plus OpenEduCat. La part française d'Odoo lui-même n'a pas été mesurée dans ce relevé. Les modules Enterprise, absents du dépôt public, n'ont pas de taux de traduction vérifiable.
- Le RTL annoncé est cohérent avec le choix d'une locale arabe Odoo (`ar_001`). Ce n'est pas une preuve de mise en page RTL auditée sur les bulletins.

### Gaps

- Pourcentage de chaînes traduites sur l'ensemble des modules, et sur l'Enterprise.
- Fichier `ar_001.po` non compté : présence confirmée, complétude non mesurée.
- Locale `ar_MA` : aucune source trouvée dans les commits consultés.
- Tamazight : annoncé sur la page Algérie, aucun fichier trouvé ici.

---

## Localisation Maroc et Afrique francophone

### Takeaway

Odoo SA publie une localisation comptable Maroc (`l10n_ma`, plan CGNC) et des localisations fiscales pour une grande partie de l'Afrique francophone. Ce n'est pas OpenEduCat. Aucune source trouvée d'un connecteur Massar, ni d'un module CMI dans la documentation des paiements OpenEduCat. Les pages Maroc, Algérie et Tunisie décrivent des exports ministériels, des dirhams et le CMI : ce sont des pages marketing, contredites ou non reprises par la documentation produit.

### Cited Findings

- Documentation Odoo 19 : le Maroc figure dans la liste des localisations fiscales. L'installation suit le pays de la société. En multi-société, chaque société peut avoir sa localisation ; une succursale suit la société mère. — [Fiscal localizations, Odoo 19](https://www.odoo.com/documentation/19.0/applications/finance/fiscal_localizations.html). **[V]**
- La même liste Odoo 19 nomme aussi, entre autres, Algérie, Tunisie, Bénin, Burkina Faso, Cameroun, Côte d'Ivoire (Ivory Coast), Gabon, Guinée, Guinée-Bissau, Mali, Niger, République centrafricaine, Congo, République démocratique du Congo, Sénégal, Tchad, Comores, Maurice. — même page. **[V]** C'est de la comptabilité, pas un lien avec un ministère de l'éducation.
- Module `l10n_ma`, « Morocco - Accounting », auteur historique kazacube puis maintenu dans `odoo/odoo`. Index de la branche 19.0 : chemin `addons/l10n_ma`, dernier commit indexé 2026-06-01, « built with the help of Caudigef ». — [index l10n_ma](https://odoo-index.archfan.com/19.0/modules/odoo/odoo/l10n_ma). **[tiers]** pour l'index ; le manifeste GitHub historique confirme le nom « Morocco - Accounting » et le plan comptable marocain. — [commit manifeste](https://github.com/odoo/odoo/commit/c5291cdff29c937429486370067d3c7e40ee83a3). **[V]**
- Refonte annoncée en 2023 (pull request fermée, pas une preuve qu'elle est celle en production en 2026) : plan CGNC, libellés source anglais avec traductions françaises officielles, taxes, positions fiscales, liasse fiscale marocaine. — [PR 109498](https://github.com/odoo/odoo/pull/109498). **[V]** comme texte de PR ; l'état exact livré dans Odoo 19 n'a pas été relu dans le code. **[?]** sur le détail fonctionnel 2026.
- OpenEduCat vend « Advance Accounting » à 329 dollars par an en cloud. Rien dans la grille ne cite `l10n_ma`, le CGNC ni le dirham. — [llms-full.txt](https://openeducat.org/llms-full.txt). **[V]**
- Documentation des paiements OpenEduCat : Stripe, PayPal, Razorpay, PayU, Authorize.net, Paytm, CCAvenue, Mollie, Mercado Pago, et « Flutterwave | Africa | Mobile money, Cards ». Pas de CMI, pas de M2T, pas de Wave, pas d'Orange Money. — [payment-providers](https://newdoc.openeducat.org/settings/payment-providers/). **[V]**
- FAQ paiements : « Stripe, PayPal, Razorpay, Authorize.net, and more ». Pas de CMI. — [FAQ](https://openeducat.org/faq/). **[V]**
- Page Maroc : « Capture the Massar code (Code Massar / CNE) » et export CSV « that match what schools upload » ; « Direct API sync with Massar is on the public roadmap » et dépend d'une autorisation AREF ; « today, you import and export, you do not push live. » Devise : factures en dirhams, « CMI gateway », « M2T », virements Attijariwafa, BMCE et Banque Populaire. — [school-management-system-in-morocco](https://openeducat.org/solutions/school-management-system-in-morocco/). **[?]**
- Autre page Maroc, plus affirmative : « Does it work with the MASSAR system? Yes. Student and school data can be exported in formats compatible with MASSAR. » — [k12-school-management-software-in-morocco](https://openeducat.org/k12-school-management-software-in-morocco/). **[?]** Elle ne décrit pas une API.
- Page école de langues Maroc : « CMI card payments ». — [language-school-management-software-in-morocco](https://openeducat.org/language-school-management-software-in-morocco/). **[?]**
- Recherche « OpenEduCat Massar », « OpenEduCat CMI », « OpenEduCat l10n_ma » : les résultats sont ces pages vendeur et le blog El Fatimi qui les cite. Aucun module, aucun dépôt, aucun forum Odoo, aucun texte du ministère. **Aucune source trouvée** d'un connecteur Massar (API, module ou export spécifié). **Aucune source trouvée** d'un connecteur ministère pour le Sénégal, la Côte d'Ivoire, le Cameroun ou un autre pays d'Afrique de l'Ouest ou du Centre.
- Page Kenya : « KUCCPS » et « CUE ». Même gabarit que la page Maroc. — [university-management-software-in-kenya](https://openeducat.org/university-management-software-in-kenya/). **[?]**
- Les chiffres « 11,000+ » écoles et « 200+ » établissements AEFE sur la page Maroc sont présentés à côté du produit. Le texte les attribue au ministère et au réseau AEFE, pas à des clients OpenEduCat. — [page Maroc](https://openeducat.org/solutions/school-management-system-in-morocco/). **[V]** comme rédaction ; ce ne sont pas des références clients.

### Inferences

- Une école qui installe Odoo 19 avec le pays Maroc peut obtenir le plan comptable officiel Odoo, à condition d'utiliser l'application Comptabilité d'Odoo et une version où `l10n_ma` est installable. OpenEduCat n'annonce pas cette combinaison. La comptabilité « Advance Accounting » à 329 dollars n'est pas identifiée comme la liasse marocaine.
- Le dirham comme devise d'Odoo est une capacité générique d'Odoo (toute société peut choisir une devise). Ce n'est pas la preuve d'un encaissement CMI.
- Pour le ministère marocain, le seul texte utile est celui du vendeur le plus prudent : pas d'API, un export CSV annoncé, soumis à une autorisation qui n'est pas montrée. La page K-12 qui répond « Yes » ne doit pas être lue comme un connecteur.

### Gaps

- Preuve dans le code Community d'un champ « Code Massar » : aucune source trouvée.
- Compatibilité testée de `l10n_ma` avec les modules OpenEduCat 19 : aucune source trouvée.
- Paiement marocain (CMI, Fatourati, virement) réalisé chez un client : aucune source trouvée.
- Connecteur vers un système ministériel d'Afrique francophone : aucune source trouvée après recherche ciblée Massar, Maroc, Morocco, Maghreb, Afrique.

---

## Multi-écoles et isolation des données

### Takeaway

Odoo sait mettre plusieurs sociétés dans une seule base, avec des droits par enregistrement, et la doc comptable confirme qu'une société n'hérite pas de la localisation fiscale d'une autre. OpenEduCat vend en plus un module Campus et décrit un mode multi-écoles. L'isolation entre écoles d'un même client est donc celle d'Odoo (règles d'accès), pas une base séparée. Le cloud du vendeur, lui, annonce une base par client.

### Cited Findings

- Doc Odoo 19 : « In a multi-company environment, each company can use different fiscal localization modules. However, branches always follow the parent company’s localization. » — [Fiscal localizations](https://www.odoo.com/documentation/19.0/applications/finance/fiscal_localizations.html). **[V]**
- Page pricing OpenEduCat : « all modules share a single database ». — [pricing](https://openeducat.org/pricing/). **[V]** Cela vise les modules, pas les écoles.
- Page plateforme : « Multiple campuses or schools in a single installation », administration par campus, reporting de groupe, droits « scoped to specific organisations ». — [features/platform](https://openeducat.org/features/platform/). **[V]**
- Page multi-campus : « One install supports 5-500 schools through multi-company architecture », héritée d'Odoo ; un enseignant de l'école A ne verrait que les élèves de A. Elle cite « a 280-school network in India » sans le nommer. — [school-management-system-for-multi-campus](https://openeducat.org/solutions/school-management-system-for-multi-campus/). **[?]** pour les chiffres 5-500 et 280 ; le mécanisme multi-société Odoo est **[V]** via la doc Odoo.
- Module payant « Campus » : 160 dollars par an en cloud, 439 dollars une fois on-premise. Le résumé Enterprise du fichier produit range « multi-campus » parmi les fonctions commerciales. — [llms-full.txt](https://openeducat.org/llms-full.txt). **[V]**
- Page sécurité : « Each institution gets its own isolated database », « No cross-tenant data access possible ». — [security](https://openeducat.org/security/). **[V]** comme promesse d'hébergement multi-clients.

### Inferences

- Deux niveaux. Entre clients du cloud OpenEduCat, le vendeur annonce une base PostgreSQL par client. Entre écoles d'un même réseau sur une seule installation, c'est le multi-société Odoo : mêmes tables, filtrage par société et par groupes. Une erreur de règle d'accès expose les élèves d'une école à l'autre. Ce n'est pas l'isolation d'une base séparée.
- Une école seule (une maternelle-lycée, un seul établissement) n'a pas besoin du module Campus. Un groupe scolaire marocain qui veut plusieurs écoles dans une base en a probablement besoin, et la doc ne dit pas si le multi-société Community suffit sans le module à 160 dollars.

### Gaps

- Règles d'enregistrement exactes livrées par OpenEduCat (qui voit les élèves, les frais, les pièces comptables d'une autre société) : non lues dans le code.
- Nom et preuve du « réseau de 280 écoles » : aucune source trouvée.
- Possibilité d'avoir une base par école plutôt qu'une société par école, et le coût d'exploitation correspondant : non chiffré.

---

## Références en Afrique et au Maghreb

### Takeaway

Aucun établissement nommé du Maghreb ni d'Afrique francophone de l'Ouest ou du Centre n'a été trouvé. Les déploiements africains étayés par autre chose qu'un logo sont anglophones et du supérieur : Lagos Business School (Nigeria, sa propre page Odoo 13), KAG East University (Kenya, sa page liste les modules), et une étude de cas vendeur pour Nexus International University (Ouganda). La liste clients mélange des noms et des pays peu fiables.

### Cited Findings

- Page clients, chiffres vendeur : « 1,000+ » institutions, « 3M+ » élèves, « 50+ » pays. Noms africains affichés : Nexus International University, Uganda ; Cornerstone University, Uganda ; African Economic Research Consortium, Kenya ; Mudiame University, Nigeria. Aucun nom marocain, algérien, tunisien, sénégalais, ivoirien ou camerounais dans l'extrait de cette page. « HUE (Hue University) » y est étiqueté « University Egypt ». — [clients](https://openeducat.org/clients/). **[V]** comme liste publiée. L'étiquette Égypte pour Hue est **[?]** : Huế est une université vietnamienne, et la page ne le démontre pas.
- Étude de cas Nexus International University : Ouganda, « On Cloud », « 3 months (phased) », modules Admission et Fees, site indiqué `https://niu.ac.ug/`. Gains annoncés par le vendeur : « 50–60% » de charge administrative en moins, « 40% Faster » sur les admissions. La page des études de cas prévient : « based on aggregated deployment data », « Individual results may vary ». — [case study](https://openeducat.org/case-studies/nexus-international-university/) ; [case-studies](https://openeducat.org/case-studies/). **[V]** comme récit du vendeur, pas comme audit. Supérieur, pas le scolaire marocain.
- Portail de Lagos Business School, `registration.lbs.edu.ng` : « Lagos Business School Odoo Version 13.0 », application installée « Web OpenEduCat », plus des modules custom « Lagos Business School Application », portail étudiant et programme. — [page info LBS](https://registration.lbs.edu.ng/website/info). **[tiers]** (site de l'établissement). Preuve qu'un module OpenEduCat a été installé sur un Odoo 13, école de commerce au Nigeria, pas une preuve de version 19 ni de K-12.
- Portail KAG East University, Kenya : la page info Odoo liste « OpenEduCat Core », « OpenEduCat Core Enterprise », Admission, Attendance Enterprise, et d'autres modules OpenEduCat. — [myportal.east.ac.ke](https://myportal.east.ac.ke/website/info). **[tiers]**. Université, anglophone.
- Mudiame University et Lagos Business School sont aussi des noms sur la page pricing, sans récit. — [pricing](https://openeducat.org/pricing/). **[V]** comme citation commerciale. Pour Mudiame, pas de page de l'université trouvée qui confirme le déploiement : rester au niveau logo. **[?]**
- Pages Maroc, Algérie, Tunisie : personas (« Ecoles privees (Rabat, Casablanca, Marrakech) », « French Mission Schools ») sans raison sociale. — pages solutions déjà citées. **[?]**

### Inferences

- Pour une école privée marocaine, il n'existe pas dans ce relevé de pair maghrébin à appeler. Les preuves africaines solides sont des universités anglophones, dont une sur Odoo 13.
- International Space University figure sur la liste comme « France ». Ce n'est pas un lycée français au Maroc, et la page n'a pas été recoupée.

### Gaps

- Confirmation indépendante de Nexus (le site niu.ac.ug n'a pas été ouvert pour y chercher le nom OpenEduCat).
- Tout client nommé au Maghreb ou en Afrique francophone : aucune source trouvée.
- Déploiement K-12 (maternelle à lycée) documenté en Afrique : aucune source trouvée. Les cas solides sont du supérieur.

---

## Résidence des données, RGPD, export

### Takeaway

L'auto-hébergement met la base PostgreSQL là où l'école la place, y compris au Maroc si elle choisit le serveur. Le cloud OpenEduCat annonce Amérique du Nord, Europe et Asie-Pacifique, pas le Maroc ni l'Afrique de l'Ouest. Le vendeur annonce des outils de portabilité et un DPA, pas une certification. L'export complet est clair si l'école administre le serveur ; il n'est pas documenté comme un dump intégral remis par le cloud OpenEduCat.

### Cited Findings

- Page sécurité : régions « North America, Europe, or Asia-Pacific ». On-premise : « Data never leaves your network ». « GDPR Compliant » avec accès, portabilité, effacement, consentement, « Data processing agreements (DPA) available ». Chiffrement annoncé AES-256 au repos, TLS 1.3 en transit, sauvegardes chiffrées. Base isolée par client, sauvegardes quotidiennes, rétention 30 jours. — [security](https://openeducat.org/security/). **[V]** comme engagement rédigé. Aucun certificat, aucun nom d'hébergeur, aucun pays précis. **[?]** sur la réalité opérationnelle.
- FAQ : « All data at rest is encrypted using AES-256 », « TLS 1.3 », HSM, confidentialité persistante. — [FAQ](https://openeducat.org/faq/). **[V]**
- Page plateforme : import CSV, Excel, JSON ; export « Excel, CSV, or PDF » ; « Full data portability ». — [features/platform](https://openeducat.org/features/platform/). **[V]**
- Page open source : « Your data sits in your PostgreSQL database. Export it anytime. » Hébergement « in your country » choisi par l'établissement. FERPA et GDPR cités comme conséquences de ce choix, pas comme certificats. — [open-source-education-erp](https://openeducat.org/open-source-education-erp/). **[V]**
- Page Maroc : trois options rédigées, auto-hébergement « Casablanca or Tangier », région européenne « Paris or Frankfurt », ou cloud géré « with an EU region ». « we do not move data without written consent. » — [page Maroc](https://openeducat.org/solutions/school-management-system-in-morocco/). **[?]** Ces villes ne figurent pas sur la page sécurité, qui s'arrête aux trois grandes régions.
- Odoo Online, pas OpenEduCat : « you can download a backup of your database at any time through the control center. You own your data! » — [odoo.com/pricing](https://www.odoo.com/pricing). **[V]** pour Odoo Online seulement.
- Prérequis : PostgreSQL est la base, port 5432 interne, sauvegardes à prévoir avant installation. — [system-requirements](https://newdocs.openeducat.org/getting-started/system-requirements/). **[V]**

### Inferences

- Une école qui veut les données au Maroc les met sur un serveur qu'elle administre (ou qu'un intégrateur administre pour elle). Le cloud OpenEduCat, tel que la page sécurité le décrit, ne propose pas une région Maroc ni une région Afrique de l'Ouest. L'UE (page Maroc) serait le compromis RGPD, pas un hébergement marocain.
- « Exporter toutes les données » : en auto-hébergement, qui tient le serveur tient PostgreSQL, donc une copie logique de la base. Sur le cloud OpenEduCat, les formats écrits sont Excel, CSV, PDF et API. Ce n'est pas la même chose qu'une base restaurable. Le bouton de sauvegarde intégrale cité est celui d'Odoo Online.
- Le RGPD est un règlement européen. Une école à Casablanca relève d'abord de la loi marocaine 09-08 et de la CNDP. Aucune source trouvée sur OpenEduCat et la CNDP. Les outils annoncés (accès, effacement, DPA) aident un dossier, ils ne le closent pas.
- Les élèves sont des mineurs. Rien dans les pages lues ne traite le régime particulier des données d'enfants hors une page marketing préscolaire qui cite le RGPD et le check-in QR. Cette page n'a pas été retenue comme preuve.

### Gaps

- Nom de l'hébergeur, pays du datacenter par défaut, et sous-traitants du cloud OpenEduCat.
- Modèle de DPA et délai de restitution d'une base complète à la fin du contrat cloud : aucune source trouvée.
- Mention de la CNDP ou de la loi 09-08 : aucune source trouvée.
- Durée de conservation des sauvegardes Odoo.sh au-delà de la phrase « 3 backups servers » : le détail des trois mois cité par Gigabit n'a pas été relu sur odoo.sh le 17 novembre 2026.

---

## Adéquation à une école privée marocaine (maternelle à lycée)

### Takeaway

OpenEduCat peut servir de SIS généraliste (dossiers, admissions, présences, frais, examens) en français sur Odoo, à un coût licence nul en Community si l'école héberge elle-même, ou à une facture modulaire en dollars si elle prend l'Enterprise. Il n'est pas localisé pour le scolaire marocain : pas de connecteur Massar trouvé, pas de CMI dans la doc paiements, pas de client maghrébin nommé, comptabilité marocaine portée par Odoo et non par OpenEduCat, vocabulaire français du module cœur encore calqué sur l'anglais universitaire (« bonafide », « achievement »).

### Cited Findings

- Périmètre Community utile à une école : élèves, cours, admissions, frais, bibliothèque, présences et examens en version de base. Portail parents, transport, LMS complet et gradebook sont côté Enterprise. — [compare-editions](https://openeducat.org/compare-editions/). **[V]**
- Public visé par le vendeur : universités, colleges, K-12, formation. Les études de cas africaines trouvées sont du supérieur. — [llms-full.txt](https://openeducat.org/llms-full.txt) ; cas Nexus déjà cité. **[V]**
- Compétence demandée : Odoo ou Python en interne, sinon les heures payantes dès 1 379 dollars les 25 heures, sans intégrateur marocain nommé. — [compare-editions](https://openeducat.org/compare-editions/) ; [llms-full.txt](https://openeducat.org/llms-full.txt). **[V]**

### Inferences

- Pour une seule école, maternelle à lycée, le scénario le plus lisible au 17 novembre 2026 est : Odoo Community + modules OpenEduCat Community, serveur au Maroc, PostgreSQL, intégrateur Odoo francophone pour l'installation, la traduction des trous, les bulletins et un export Massar écrit sur mesure. La licence des deux Community n'apparaît pas comme une ligne payante. L'hébergement, la sauvegarde et l'intégrateur sont la facture.
- Enterprise se justifie si l'école veut le portail parents, le transport, le LMS ou le support vendeur, en acceptant la grille USD d'octobre 2026 et l'incertitude sur le décompte des utilisateurs. Odoo.sh ajoute la licence Custom Odoo par utilisateur back-end et la facture workers, hors Maroc comme région garantie.
- Afrique francophone de l'Ouest et du Centre : même produit, mêmes trous ministériels, localisations comptables Odoo disponibles pour plusieurs pays, aucun client nommé, paiement documenté le plus proche = Flutterwave, pas les wallets locaux.

### Gaps

- Grille de notes, cycles et bulletins du système marocain (ou d'un livret AEFE) livrés en standard : aucune source trouvée hors pages marketing.
- Retour d'une école K-12 francophone en production : aucune source trouvée.
