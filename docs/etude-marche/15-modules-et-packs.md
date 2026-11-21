# Les modules que Planner peut vendre, et les packs qui les réunissent

| | |
|---|---|
| Demande du chef | 21 novembre 2026, au soir : « liste les modules que l'on peut vendre, propose des packs, et chaque proposition doit être justifiée en te basant sur toutes nos études concurrentielles » ; **sans prix** (réponse du même soir, par l'outil de questions) |
| Rédigé par | Claude Code (Opus 5.5), coordinateur, le 21 novembre 2026 |
| Pour qui | le chef, qui valide la liste et les packs (§ 8) ; ensuite Codex, qui dessine l'icône de tuile de chaque module (§ 7), et les missions du site (VIT-15) |
| Nature | proposition sans code et **sans aucun prix**. Les prix viennent après les entretiens de VEN-02 (décision du 13 nov.) |

## 0. En bref

- **Un socle inclus**, jamais vendu : les comptes, l'établissement, le référentiel, la configuration, l'import, l'export complet, l'application web et mobile.
- **Dix-sept modules vendables** : six se vendent aujourd'hui, en tout ou en partie ; six arrivent avec l'étape 3 (le supérieur jusqu'au bout) ; cinq viennent plus tard, avec la formation professionnelle puis le scolaire.
- **Cinq packs, un par public**, bâtis chacun autour du module qui fait acheter ce public : *Emploi du temps*, *Classe*, *Supérieur*, *Formation professionnelle*, *École*. Un sixième, *Réseau*, reste reporté.
- **Six règles de l'offre**, tirées des échecs des concurrents : socle inclus, liaison entre nos modules gratuite, familles jamais facturées, export complet gratuit, consommables à prix public, pack moins cher que ses modules.

## 1. Les études reprises

| Réf. | Étude | Ce qu'elle apporte ici |
|---|---|---|
| **[01]** | [01-concurrents.md](01-concurrents.md) (4 nov., § 8 du 21 nov.) | trois familles de concurrents, puis une quatrième (l'ERP scolaire africain) ; ce que le marché tient pour acquis (§ 3) ; où Planner se distingue (§ 4) ; avis des utilisateurs (§ 7) |
| **[05]** | `05-modele-economique.md` (11 nov., branche `etude/ven-modele-economique`, #169, non fusionnée) | un socle, trois packs emboîtés, des modules seuls ; ce qui fait payer. **Ses prix ne sont pas repris** |
| **[06]** | [06-outils-structures-formation.md](06-outils-structures-formation.md) et son [rapport](<reports/Outils scolaires et besoins par pays.md>) (11 nov.) | le module qui déclenche l'achat change selon le marché (§ 1) ; douze modules (§ 3) ; six packs à tester et les règles de l'offre (rapport, « Six packs à tester ») |
| **[07]** | [07-comparatif-odoo.md](07-comparatif-odoo.md) (15 nov.) | le « tout-en-un » annoncé avant d'avoir la vie scolaire est une faiblesse (§ 6) |
| **[09]** | [09-failles-erp-scolaires.md](09-failles-erp-scolaires.md) (15 nov.) | sept failles communes (§ 3) ; ce qu'aucun des cinq ne couvre (§ 4) |
| **[10]** | [10-comparatif-openeducat-planner.md](10-comparatif-openeducat-planner.md) (17 nov.) | OpenEduCat est plus complet en gestion d'école ; Planner l'emporte sur l'emploi du temps (§ 1) ; ses modules se vendent un par un (§ 7) |
| **[13]** | `13-expertise-go4school.md` (21 nov., #234, non fusionnée) | une offre lisible : familles de modules, badge « Socle », « Inclus » ou « à l'usage » (§ 4) |
| **[14]** | `14-reprendre-et-depasser.md` (21 nov., #234) | la synthèse : ce qu'ils font bien (R1 à R20), ce qu'ils ratent (M1 à M18), ce qu'aucun ne fait (§ 4), ce que Planner ne reprend pas (§ 6) |
| **[D]** | [decisions.md](../plan/decisions.md) | le socle inclus (4 nov.) ; le supérieur d'abord et la ligne d'arrivée de l'étape 3 (21 nov.) ; aucun pays supposé (EP-5, EP-18) |

## 2. Qu'est-ce qu'un module vendable

Un **module vendable** est ce qu'une direction reconnaît comme un service et peut acheter à part. Il ne se confond pas avec un module du plan (`docs/plan/modules/`), qui range le travail de l'équipe :

- un module vendable peut réunir plusieurs modules du plan (*Emploi du temps* = MOT + EDT) ;
- un module du plan peut ne rien vendre (QUA, EXP, UIX, MKT) ou rester dans le socle (ADM, PLA) ;
- **le registre des modules (VEN-01)** est ce qui allumera ou éteindra un module vendable pour une école : la liste du § 4 est la proposition de son contenu.

Le module vendable se reconnaît à trois critères : il répond à un besoin qu'une direction nomme elle-même [06, § 2] ; un concurrent le vend aussi à part, ou une école l'achète sans le reste [06, rapport, « Les éditeurs vendent des paliers »] ; il peut s'éteindre sans casser le socle (VEN-01).

## 3. Le socle, inclus dans tout abonnement

| Contenu | Modules du plan | Pourquoi il n'est pas vendu |
|---|---|---|
| comptes, rôles et droits ; double authentification ; journal de sécurité | ADM | « le socle est inclus dans tout abonnement » [D, 4 nov.] ; « une seule connexion pour tous les modules » est le compliment le plus fait à Classter [01, § 7] |
| établissement, identité, marque, campus, salles, personnes, filières, classes, enseignements | ADM, EDT, UIX-06 | tous les modules s'en servent : le vendre à part obligerait à le racheter avec chacun |
| configuration de l'école (ADM-02), import (ADM-03), assistant de démarrage (ADM-04) | ADM | **la mise en route lourde est la première plainte partout** (OpenEduCat, Classter, Odoo, Fedena) [01, § 7 ; 09, faille 7 ; 14, M7]. Le marché l'offre : « installation et formation offertes » [01, § 2] |
| tableau de bord de l'administration (UIX-11) | UIX | il résume les modules achetés ; le pilotage complet est un module à part (§ 4, n° 17) |
| export complet des données de l'école, à tout moment (PLA-12) | PLA | le conflit autour de SIMS montre ce que coûte une sortie non garantie [06, rapport, « La sortie des données »] ; aucun des cinq ERP de [09] ne l'offre en entier [09, § 4] |
| application web et application mobile | UIX, MOB | le marché les tient pour acquises [01, § 3] ; l'application suit les modules allumés |
| sécurité : isolation testée, aucun envoi caché | PLA-04, EP-12, EP-13 | ce sont deux des quatre choses qu'aucun concurrent ne fait [09, § 4 ; 14, § 4] : un argument, pas une option payante |

## 4. Les dix-sept modules vendables

**État** au 21 nov. : *disponible* (dans `main`), *en partie*, *étape N* (du [plan](../plan/README.md), § 2). **Public** : supérieur, formation (professionnelle et continue), scolaire, tous.

### 4.1 Ce qui se vend aujourd'hui

| N° | Module vendable | Ce qu'il fait | Plan | État | Public | Pourquoi il se vend |
|---|---|---|---|---|---|---|
| 1 | **Emploi du temps** | génère l'emploi du temps sous règles strictes et souples, explique chaque refus ; CM, TD, TP, vacataires, plusieurs campus ; reports, imprévus, publication, PDF ; examens et surveillances | MOT, EDT | disponible ; EDT-03 et EDT-04 en étape 3 | tous, le supérieur d'abord | **c'est ce qu'aucun ne fait** : « calculer l'emploi du temps et expliquer chaque refus » [14, § 4, n° 1] ; l'emploi du temps n'est pas généré chez OpenEduCat, Frappe, Fedena hors Ultimate [09, faille 1] ; seul aSc le fait vraiment, sans le supérieur ni les campus [01, § 4] ; « les spécialistes se vendent seuls » (aSc, Untis, EDT d'Index) [06, rapport] |
| 2 | **Présences** | l'appel en un geste par QR code ; le rappel d'appel ; les signalements ; plus tard l'appel à la main sans réseau (MOB-08) | EDT, MOB | disponible ; MOB-08 en étape 3 | tous | l'appel « en un geste en classe » n'existe qu'en partie chez les cinq [09, § 4, D] ; l'assiduité est un besoin de tous les publics, et la **preuve d'émargement** est ce qui fait acheter la formation continue [06, § 1, n° 3] ; l'appel hors ligne est une bonne pratique reprise de Go4School [14, R9, N2] |
| 3 | **Espace de cours** | supports par classe, dates d'ouverture, lien de visio, sondages, annonces des enseignants ; devoirs à rendre plus tard | COU | en partie (devoirs éteints) ; COU-02 à COU-06 en étape 3 | tous | les ERP internationaux vendent un LMS ; Classter le vend à part, par élève [06, rapport, « Par module et par élève »] ; les produits marocains n'ont qu'un cahier de textes [01, § 4] |
| 4 | **Quiz et jeux** | Studio quiz (dix types de questions, médias), quiz en direct, jeux pédagogiques, préparation par l'IA quand elle est activée | QJE | disponible | tous | Classter vend le quiz à part [06, rapport] ; ni les produits marocains, ni les ERP internationaux, ni aSc n'annoncent de jeux en classe [01, § 4] ; l'IA activée école par école est une bonne pratique reprise [14, R16] |
| 5 | **Bibliothèque** | bibliothèque numérique de l'école, avec la même connexion | BIB | disponible pour une école ; pour chaque école avec BIB-02 (étape 2) | tous | une seule connexion pour tous les modules [01, § 7 ; 06, § 4, garantie 1] ; le poids affiché et la reprise après coupure en feront un module utilisable avec peu de réseau [14, R10, N3] |
| 6 | **Annonces et messages** | annonces ciblées avec pièces jointes, notifications sur le téléphone, courriel ; plus tard SMS, WhatsApp, accusé de lecture, plages de silence | COM | en partie ; COM-01 à COM-03 en étape 6 | tous | notifications et WhatsApp sont tenus pour acquis par le marché [01, § 3, n° 3] ; COM est « indispensable pour vendre » [06, § 3] ; le canal officiel avec accusé de lecture et le SMS pour ceux qui n'ont pas l'application sont repris de Go4School [14, R11, R12] |

### 4.2 Ce qui arrive avec l'étape 3 (le supérieur jusqu'au bout)

| N° | Module vendable | Ce qu'il fait | Plan | État | Public | Pourquoi il se vend |
|---|---|---|---|---|---|---|
| 7 | **Vacataires et heures** | la chaîne « séance prévue, faite, visée, payée », l'état mensuel signé, l'export vers la paie | RHP-01 à RHP-03 | en partie (visa des séances, « Mon service ») | supérieur, formation | **la force de Planner** : la séance tenue est une donnée traçable qui produit l'état de paie des vacataires [06, § 1, n° 4] ; aucun des cinq ERP ne tient cette chaîne, PERIS en partie [09, § 4, G] ; « l'argent des vacataires » fait payer [05, § 1] ; les vacataires payés de 6 à 12 mois en retard [06, § 1, n° 2] |
| 8 | **Évaluations, crédits et jurys** | notes, crédits, jurys du supérieur ; le même modèle servira le scolaire (VSC-04) | VSC-08 | étape 3, à concevoir | supérieur | fait partie de la ligne d'arrivée de l'étape 3 [D, 21 nov.] ; OpenEduCat le vend à part (Grade Book) et ses utilisateurs jugent ses examens limités [10, § 7 ; 01, § 7] |
| 9 | **Inscriptions** | candidature, pièces, liste d'attente, réinscription ; un candidat est une fiche, pas un compte | INS-01 à INS-03 | étape 3 | tous | « différenciant » [06, § 3] ; OpenEduCat vend l'admission en ligne à part [10, § 7] ; Studirium est bâti autour de l'inscription [09, § 2.5] |
| 10 | **Documents vérifiables** | attestations et diplômes avec un QR de vérification | DOC-01, DOC-02 | étape 3 | tous, le supérieur d'abord | « différenciant » [06, § 3] ; l'accréditation fait partie du module d'achat du supérieur [06, rapport, pack « Supérieur privé »] |
| 11 | **Stages** | offres de stage dans l'espace Carrière ; plus tard conventions et tuteurs | STA-01, STA-02 | STA-01 : #230, au chef | supérieur, formation | version légère proposée [06, § 3] ; dans le pack de la formation professionnelle [06, rapport] |
| 12 | **Frais et caisse** | frais, échéances, encaissement au guichet avec reçu numéroté, relances, export vers la comptabilité | FIN-01, FIN-02 | étape 3, **après les entretiens de VEN-02** | tous, le scolaire surtout | **le cœur de l'offre des six produits marocains** [01, § 3, n° 4] ; le module qui fait acheter en Afrique et au Maroc [06, § 1, n° 3] ; caisse et reçus repris [14, R13]. Planner **exporte vers la comptabilité, sans la refaire** [14, § 6] |

### 4.3 Ce qui vient plus tard

| N° | Module vendable | Ce qu'il fait | Plan | Étape | Public | Pourquoi il se vendra |
|---|---|---|---|---|---|---|
| 13 | **Formation et financeurs** | sessions et cohortes, conventions, émargement signé, attestations, dossiers des financeurs | FOR-01 à FOR-04 | 4 | formation | la preuve d'émargement fait acheter la formation continue [06, § 1, n° 3] ; Digiforma et Dendreo le vendent par apprenant [06, rapport] |
| 14 | **Vie scolaire et familles** | familles, absences prévenues, notes et bulletins, espace des parents (gratuit pour eux) | VSC-02 à VSC-04, ADM-05, MOB-05 | 6 | scolaire | frais, familles et bulletins sont au cœur des produits du scolaire [01, § 3] ; OpenEduCat y est plus complet aujourd'hui [10, § 1] : à ne pas annoncer avant d'exister [07, § 6] |
| 15 | **Échanges avec l'État** | un connecteur par pays : import de la liste officielle, export des absences et des notes, contrôle avant envoi | ETA-01 à ETA-03 | 6 (ETA-03 reporté) | scolaire | **la double saisie est la plainte la plus citée** [01, § 7 ; 09, faille 4] ; personne n'échange autrement que par un fichier [09, § 4] ; par connecteur, jamais en dur (EP-5) [14, M17, R18] |
| 16 | **Paiements en ligne** | paiement des frais par carte ou virement, rapprochement automatique ; l'argent mobile plus tard | PAI-01, PAI-02 (PAI-03 reporté) | 6 | scolaire | « indispensable en Afrique subsaharienne » [06, § 3] ; PERIS le fait déjà [09, § 4, F] ; la commission dite par écrit sur le reçu [06, rapport, « Les consommables »] |
| 17 | **Pilotage** | encaissé, attendu, en retard ; masse due aux vacataires ; vue de la direction | PIL-01, PIL-02 | reporté (étape 7) | tous | « différenciant » [06, § 3] ; il ne vaut que quand ses données existent (frais, vacataires) ; d'ici là, le tableau de bord du socle suffit (UIX-11) |

### 4.4 Ce qui ne se vend pas

| Ce qui reste hors de l'offre | Pourquoi |
|---|---|
| comptabilité générale, paie complète | écartées par le plan de parité et retirées de la page « Bientôt » (18 nov.) ; Planner exporte vers la comptabilité (FIN-02) et vers la paie (RHP) [14, § 6] |
| présence biométrique | écartée le 18 nov. [14, § 6] |
| cantine, transport, internat (SER) ; stocks et achats (STK) | « plus tard » [06, § 3] ; « des produits entiers, déjà bien servis et bon marché » [01, § 6, n° 6] ; reportés [D] |
| un barème, un examen ou une devise d'un pays écrit dans le produit | EP-5, EP-18 : par configuration ou connecteur seulement [14, M17] |

## 5. Les packs

**Principe** : « chaque pack se bâtit autour du module d'achat du marché visé, pas autour du produit phare de l'éditeur » [06, rapport, « Six packs à tester »]. Le module qui fait acheter change selon le public [06, § 1, n° 3]. Planner a donc **un pack par public**, plutôt que les trois paliers emboîtés de l'étude du modèle économique [05, § 2] (voir le § 5.3).

Chaque pack s'achète aussi module par module ; le pack coûte moins que la somme de ses modules [06, § 4 ; 05, § 2]. Un module à venir entre dans son pack à sa livraison, annoncé d'ici là « Bientôt » (décision du 11 nov.).

### 5.1 Les cinq packs

| Pack | Pour qui | Modules (n° du § 4) | Le module qui fait acheter | Pourquoi ce pack |
|---|---|---|---|---|
| **Emploi du temps** | toute école qui garde son logiciel de gestion ; le supérieur qui découvre Planner | 1, 2, et l'export vers le logiciel en place | Emploi du temps | les spécialistes de l'emploi du temps se vendent seuls [06, rapport] ; Planner « s'intègre aux logiciels de frais existants au lieu de les remplacer » [01, § 6, n° 1] ; si l'Afrique de l'Ouest vient, « y aller par l'emploi du temps et l'intégration », pas par la largeur [09, § 5] ; **vendable aujourd'hui** |
| **Classe** | l'école qui a déjà sa gestion et veut la pédagogie numérique | 3, 4, 5 ; s'ajoute à n'importe quel autre pack | Quiz et jeux | Classter vend LMS et quiz à part, par élève [06, rapport] ; c'est ce que les produits marocains n'ont pas [01, § 4] ; **vendable aujourd'hui** (Bibliothèque : une école jusqu'à BIB-02) |
| **Supérieur** | écoles d'ingénieurs et de commerce, universités privées, groupes à plusieurs campus | 1 à 12 | Emploi du temps, puis Vacataires et heures | **le segment où Planner a été conçu et où le prix se défend** [01, § 5] ; les produits du scolaire n'y vont pas [14, M18] ; « le supérieur porte la marge » [05, § 4] ; c'est la ligne d'arrivée de l'étape 3 [D, 21 nov.] ; reprend le pack « Supérieur privé » du rapport (MOT, EDT, RHP, INS, DOC, évaluations, pilotage) [06, rapport]. **Vendable aujourd'hui avec 1 à 6** ; 7 à 12 arrivent pendant l'étape 3 |
| **Formation professionnelle** | centres de formation, organismes de formation continue | 1, 2 (émargement), 7, 9, 10, 11, 12 (plusieurs payeurs), 13 | Formation et financeurs, avec l'émargement | la preuve de présence pour les financeurs fait acheter ce public [06, § 1, n° 3] ; reprend le pack « Formation professionnelle et continue » du rapport (FOR, RHP, FIN multi-payeurs, STA, INS, appel) [06, rapport] ; **étape 4** |
| **École** | du primaire au lycée, le lycée et le collège d'abord | 1 (avec les groupes de langue), 2, 3, 4, 5, 6, 12, 14, 15, 16 | Frais et caisse, Vie scolaire et familles | frais, familles et échanges avec l'État sont le cœur du marché scolaire [01, § 3 ; 06, § 1, n° 3] ; **un seul pack**, réglé par configuration (argent mobile, SMS, connecteur d'État), au lieu des packs « École privée (Maghreb) » et « École Afrique » du rapport : aucun pays n'est supposé (EP-5) [14, M17] ; **étapes 5 et 6** |

**Reporté : le pack Réseau** (réseau d'écoles, diocèse, ONG, groupe privé : vue consolidée, chaque école dans sa base ; GRP, PIL). Les remises d'échelle des grands éditeurs le justifient [06, rapport, pack « Groupe »] et Go4School vise les tutelles [14, R15] ; il attend PLA-11, et la question est posée à un réseau dans les entretiens de VEN-02 (N8) [D, 21 nov.].

### 5.2 Ce que chaque public peut acheter aujourd'hui

| Public | Aujourd'hui | À la fin de l'étape 3 |
|---|---|---|
| supérieur | Emploi du temps ; Classe ; Supérieur (modules 1 à 6) | Supérieur complet (1 à 12) |
| formation | Emploi du temps ; Classe | les mêmes, plus 7, 9, 10, 11, 12 ; le pack Formation à l'étape 4 |
| scolaire | Emploi du temps pour le supérieur seulement : le collège et le lycée sont générés à l'étape 5 (D4 : le site le dit) ; Classe | Classe ; le pack École aux étapes 5 et 6 |

### 5.3 Ce qui change par rapport aux études précédentes

| Proposition antérieure | Ce que ce document en fait | Pourquoi |
|---|---|---|
| trois packs emboîtés : *Emploi du temps* ⊂ *Vie de l'établissement* ⊂ *Gestion complète* [05, § 2] | gardé pour *Emploi du temps* ; *Vie de l'établissement* devient *Classe* (sans l'emploi du temps) et le début du pack *Supérieur* ; *Gestion complète* devient le pack *École* | un palier unique mêle des publics qui n'achètent pas pour la même raison [06, § 1, n° 3] ; le supérieur passe d'abord [D, 21 nov.] |
| six packs à tester [06, rapport] | *École privée* et *École Afrique* fusionnés en *École* ; *Groupe* devient *Réseau*, reporté ; *Classe* ajouté | aucun pays supposé (EP-5) ; GRP est reporté ; la pédagogie se vend seule chez Classter |
| « Planification », « Vie de classe », « Annonces et alertes », « Heures des vacataires » comme modules seuls [05, § 3] | repris en 1, 2 à 5, 6, 7 ; *Vie de classe* est séparée en Présences, Espace de cours, Quiz et jeux, Bibliothèque | chacun s'allume et s'éteint seul dans VEN-01, et l'appel sert aussi le pack Emploi du temps |

## 6. Les règles de l'offre

À écrire dans l'offre avant de vendre. Chacune répond à un échec documenté :

| N° | Règle | Ce qui l'impose |
|---|---|---|
| 1 | **le socle est inclus**, la mise en route aussi jusqu'à une taille à fixer | décision du 4 nov. [D] ; mise en route lourde et intégrateurs payants [01, § 7 ; 09, faille 7] ; le marché marocain l'offre [01, § 3] |
| 2 | **la liaison entre nos modules est gratuite** ; seuls les connecteurs vers d'autres logiciels se paient, à prix public | les logiciels greffés et les interfaces facturées dénoncés en Angleterre [06, rapport, « Les consommables »] |
| 3 | **les familles ne paient jamais** pour voir les informations de leur enfant | XGEST interdit au Gabon ; registre d'État gratuit lancé en Pologne [06, rapport] |
| 4 | **l'export complet est gratuit, à tout moment**, y compris après la fin du contrat | le conflit autour de SIMS ; Eduzaas le promet, Bromcom facture la copie [06, rapport, « La sortie des données »] |
| 5 | **les consommables** (IA, SMS, WhatsApp, stockage, commission de paiement) ont un prix unitaire public, en crédits prépayés, avec une alerte avant épuisement | les reproches portent sur ce qui s'ajoute au prix affiché [06, rapport] ; Go4School vend l'IA et les SMS en crédits [01, § 8] |
| 6 | **un pack coûte moins que la somme de ses modules**, et la hausse au renouvellement est plafonnée par écrit | « chez ShuleSoft, la somme des modules dépasse le prix groupé » ; hausses de 3 à 7 % par an chez PowerSchool [06, rapport] ; hausses au renouvellement chez Odoo [01, § 7] |

## 7. Les icônes de tuile (pour Codex)

Le chef veut une icône par module vendable : **en SVG, du même style que les sept logos de VIT-09a**, pour l'application et la grille ; **et en images générées**, pour le site et les supports de vente (réponse du 21 nov.). Codex les fait **après VIT-11**, une fois cette liste validée.

| N° | Module vendable | Logo existant (`shared/icones/modules/`) | À dessiner |
|---|---|---|---|
| 1 | Emploi du temps | `planning` | — (image générée seulement) |
| 2 | Présences | — | oui |
| 3 | Espace de cours | `pedagogie` (aujourd'hui « Enseignements ») | à trancher : reprendre `pedagogie` ou dessiner `cours` |
| 4 | Quiz et jeux | `activites` | — |
| 5 | Bibliothèque | `bibliotheque` | — |
| 6 | Annonces et messages | `annonces` | — |
| 7 à 17 | Vacataires et heures, Évaluations, Inscriptions, Documents vérifiables, Stages, Frais et caisse, Formation et financeurs, Vie scolaire et familles, Échanges avec l'État, Paiements en ligne, Pilotage | — | oui, onze logos |
| socle | Personnes, Établissement | `personnes`, `etablissement` | — |

Soit **douze ou treize SVG** à dessiner, et **dix-sept images générées**. Les images générées suivent la charte (`shared/charte/`) et EP-19 (une page du site pèse au plus 200 Ko).

## 8. Questions au chef

| N° | Question | Proposition |
|---|---|---|
| 1 | La liste des dix-sept modules vendables (§ 4) et leurs noms | la valider ; les noms restent neutres, sans mot propre au supérieur |
| 2 | Un pack par public (§ 5), au lieu des trois paliers emboîtés de l'étude 05 | oui : *Emploi du temps*, *Classe*, *Supérieur*, *Formation professionnelle*, *École* ; *Réseau* reporté |
| 3 | Les Présences : module à part, inclus dans le pack Emploi du temps | oui : l'appel sert tous les packs et s'éteint seul |
| 4 | Le tableau de bord de l'administration (UIX-11) dans le socle, le Pilotage vendu plus tard | oui |
| 5 | Le connecteur d'État : inclus dans le pack École, ou payant | inclus : il lève l'objection la plus citée (la double saisie) ; les connecteurs vers d'autres logiciels restent payants (règle 2) |
| 6 | Espace de cours : le logo `pedagogie` (« Enseignements ») ou un logo `cours` nouveau | un logo `cours` nouveau : `pedagogie` désigne déjà le référentiel des enseignements |
| 7 | Les six règles de l'offre (§ 6) | les valider ; elles iront dans l'offre de VEN, et sur le site quand elles seront vraies |
| 8 | Ce document sert-il de base au registre de VEN-01 et aux pages de VIT-15 | oui : VIT-15 fait une page par module vendable disponible, et « Bientôt » pour les autres |

## 9. Limites

- **Aucun prix**, à la demande du chef : les prix des concurrents ne sont cités que dans les études d'origine.
- Les produits concurrents n'ont presque jamais été essayés : leurs offres sont lues sur leurs sites, leur code quand il est public, et les avis [01, méthode ; 09, § 0 ; 14, § 8].
- Les études du 4 et du 11 novembre sont centrées sur le Maroc ; le plan ne suppose plus de pays depuis (EP-5, EP-18).
- **Aucune école extérieure n'a encore réagi** à ces modules ni à ces packs : les entretiens de VEN-02, menés auprès d'écoles du supérieur pour l'étape 3, doivent les confirmer [D, 13 et 21 nov.].
- Trois études citées sont encore sur des branches (#169, #234) : leurs liens ne marcheront qu'après leur fusion.
