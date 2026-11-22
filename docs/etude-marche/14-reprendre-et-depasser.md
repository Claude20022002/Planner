# Reprendre ce que les concurrents font bien, faire ce qu'ils ne font pas

| | |
|---|---|
| Demande du chef | 21 novembre 2026 : « Il faut que toutes ces expertises servent pour notre projet, en récupérant ce que les concurrents font de bien et en améliorant ce qu'ils ne font pas ou ne parviennent pas à faire » |
| Rédigé par | Claude Code (Opus 5.5), le 21 novembre 2026 |
| Pour qui | le chef, qui tranche les propositions du § 5 ; le coordinateur, qui reporte le reste dans les fiches (§ 7) |
| Nature | synthèse sans code. Chaque ligne renvoie à son étude, et à une fonction du plan ou à une mission quand elle existe |

## 0. Les études reprises

| Étude | Concurrents | Où |
|---|---|---|
| [01-concurrents.md](01-concurrents.md) | six produits marocains, Odoo, OpenEduCat, Fedena, Classter, aSc Timetables ; avis des utilisateurs | `main` ; § 8 ajouté le 21 nov. (Go4School) |
| [07-comparatif-odoo.md](07-comparatif-odoo.md) | Odoo avec OpenEduCat | `main` |
| `09-failles-erp-scolaires.md` | OpenEduCat, Frappe Education, Fedena, PERIS SCHOOL, Studirium | branche `etude/failles-erp-scolaires` ; décisions du chef du 15 nov. |
| `10-comparatif-openeducat-planner.md`, `11-etude-openeducat.md` | OpenEduCat, code de l'édition libre lu | branches `etude/openeducat-comparatif` et `etude/openeducat-etude-complete` |
| `parite-openeducat.md` | OpenEduCat : 31 fonctions, EP-14 à EP-17 | branche `doc/plan-parite-openeducat` (#193, **non fusionnée**) ; écrit sur la demande du chef du 17 nov. |
| `11-chemins-site-openeducat.md` | le site d'OpenEduCat | branche `doc/coordination-equipe` |
| [12-expertise-site-vitrine.md](12-expertise-site-vitrine.md) | notre propre site | `main` |
| [13-expertise-go4school.md](13-expertise-go4school.md) | Go4School, le site | cette branche |

## 1. La règle

- **On reprend une idée, jamais un texte, un nom, un visuel ni une mise en page.**
- **Une idée reprise passe par le plan** : une fonction, une mission ou une exigence, avec sa conception validée. Rien n'entre dans le produit parce qu'un concurrent l'a.
- **Un argument ne se dit que s'il est vrai dans notre code** (règle du site, VIT-18) et **sans nommer de concurrent** (arguments marketing, § 5).
- **Aucun pays supposé** (EP-5 généralisée, EP-18) : ce qu'un concurrent fait pour un pays, Planner le fait par configuration ou par connecteur (PLA-13, ETA-03), jamais en dur.

## 2. Ce qu'ils font bien, et que Planner reprend

**Public** (colonne ajoutée par le coordinateur le 22 nov., après la fusion de #234) : *supérieur*, *scolaire* ou *tous*. Une ligne est *tous* quand elle sert aussi bien une université qu'un collège ; *scolaire* quand elle n'a de sens qu'avec des élèves mineurs, des familles ou des examens nationaux du secondaire ; *supérieur* quand elle ne parle que des CM, TD, TP, vacataires et campus. Décompte : 41 *tous*, 4 *scolaire*, 1 *supérieur*. Conséquence pour l'ordre du plan (« le supérieur jusqu'au bout ») : presque tout se reprend dès l'étape 3 ; R5, R14, R18 et N7 attendent le scolaire.

**État** : *décidé* (le chef l'a déjà retenu), *prévu* (une fonction ou une mission existe), *proposé* (à trancher, § 5).

### 2.1 Le site et la vente

| # | Bonne pratique | Chez qui | Ce que Planner en fait | Fonction ou mission | Public | État |
|---|---|---|---|---|---|---|
| R1 | **Un contact complet** : plusieurs canaux, un délai de réponse, « ce qui suit » en étapes | Go4School ; OpenEduCat | une adresse e-mail dédiée et « réponse sous deux jours ouvrés » (D1) ; un lien WhatsApp seulement si le chef le veut (un lien ne charge rien) | VIT-16 | tous | décidé (D1) ; l'adresse attend le chef |
| R2 | **Le produit montré** sur ordinateur et sur téléphone | Go4School | captures réelles sur données neutres **et crédibles** | VIT-09b | tous | prévu |
| R3 | **« Avant → avec »**, sans nommer personne (« le groupe de discussion » face à l'outil) | Go4School ; OpenEduCat | sur les pages par rôle ; et un comparatif par approche | VIT-10b ; VIT-14 (fusionnée) et VIT-14b | tous | prévu ou fait |
| R4 | **Une page par module** : ce qu'il fait, qui s'en sert, FAQ, modules liés | OpenEduCat (73 pages) ; Go4School (12) | une page par module, avec un bloc « selon votre équipement » | VIT-15 | tous | prévu |
| R5 | **Les métiers de l'école** présentés à part des rôles (caisse, infirmerie, cantine, surveillance) | Go4School | à reprendre quand ces modules existeront | étape 4 et 5 (SER-01, VSC, FIN-01) | scolaire | prévu, plus tard |
| R6 | **Une page d'état publique** du service | Go4School ; aSc | la page d'état existe dans le plan | VIT-04, après EXP-05 | tous | **décidé** : avancée (N5, 21 nov.) |
| R7 | **Une offre lisible** : un socle, des modules qui s'ajoutent, ce qui est inclus et ce qui se paie à l'usage | Go4School ; Skoolly, Schoolz | à écrire quand la vente reprendra | VEN | tous | prévu, gelé |
| R8 | **Un essai ou une démonstration courte**, une mise en route annoncée en heures | tous les produits marocains ; OpenEduCat ; Fedena ; Go4School | l'assistant de démarrage, chronométré (EP-1) | ADM-04 ; VIT-16 (la démonstration) | tous | prévu |

### 2.2 Le produit

| # | Bonne pratique | Chez qui | Ce que Planner en fait | Fonction | Public | État |
|---|---|---|---|---|---|---|
| R9 | **L'appel sans réseau**, puis synchronisé | Go4School (annoncé) | l'appel **à la main** hors ligne, envoyé au retour du réseau ; le QR code reste en ligne, car sa signature change toutes les 30 s | MOB-06 n'est que la lecture de l'emploi du temps | tous | **décidé** (N2, 21 nov.) |
| R10 | **Le poids affiché avant un téléchargement**, reprise après coupure | Go4School (annoncé) | pour les supports de cours et la bibliothèque, dans l'application | COU, BIB, MOB | tous | **décidé** (N3, 21 nov.) |
| R11 | **SMS pour ceux qui n'ont pas l'application** | Go4School ; produits marocains | déjà dans le service d'envoi | COM-01, COM-03 | tous | prévu |
| R12 | **Un canal officiel de l'école** : communiqué ciblé, accusé de lecture, archivé | Go4School | annonces ciblées existantes (`Annonce.portee`) ; accusé de lecture prévu | COM-02 | tous | prévu |
| R13 | **Argent mobile et guichet** avec reçu numéroté | Go4School ; PERIS ; produits marocains (caisse) | caisse et reçus dans FIN-01 ; argent mobile reporté après PLA-13 | FIN-01, PAI-03 | tous | prévu ; PAI-03 reporté, question à VEN-02 (N6, 21 nov.) |
| R14 | **Plusieurs systèmes d'évaluation dans une même école** (deux sous-systèmes, séquences et trimestres) | Go4School | le modèle du scolaire doit le permettre, sans nommer de pays | VSC-01 (conception) | scolaire | **décidé** (N7, 21 nov.) |
| R15 | **Une tutelle qui voit plusieurs écoles** (diocèse, ONG, groupe privé) | Go4School (GO4SPILOT) ; OpenEduCat Enterprise | vue consolidée, chaque école dans sa base | GRP-01, GRP-02 ; VEN-02 | tous | GRP reporté après PLA-11 ; un réseau interrogé dans VEN-02 (N8, 21 nov.) |
| R16 | **L'IA activée école par école**, payée à l'usage | Go4School | interrupteur par école (D2) ; le paiement à l'usage est une question de vente | QJE-16 (inscrit le 19 nov.) ; VEN | tous | décidé (D2) |
| R17 | **Remplaçant proposé** quand un enseignant est absent | aSc | déjà prévu | MOT-09 | tous | prévu |
| R18 | **Import de la liste officielle des élèves** (matricule national) | Go4School (cartescolaire.cm) ; Caisso (Massar) | l'élève identifié par le matricule de l'État, un connecteur par pays | ETA-01, ETA-02, ETA-03 | scolaire | décidé (15 nov.) |
| R19 | **Prix public, mise en route incluse** | Skoolly, Schoolz, Fedena | à la reprise de la vente | VEN | tous | prévu, gelé |
| R20 | **Assistance joignable, délai annoncé** | produits marocains ; Go4School | dans l'offre, comme D1 pour le site | VEN | tous | prévu |

## 3. Ce qu'ils ratent, et que Planner fait mieux

| # | Ce qui échoue | Chez qui (preuve) | Ce que Planner fait ou doit faire | EP ou fonction | Public | État |
|---|---|---|---|---|---|---|
| M1 | **L'emploi du temps n'est pas calculé**, ou on ne sait pas comment | OpenEduCat libre (recopie d'une semaine, [CODE]) ; Frappe ; Fedena hors Ultimate ; Go4School (« cinq façons », rien sur les règles) | calcul sous contraintes strictes et souples, bilan par règle | MOT, EDT | tous | **fait** ; à montrer (VIT-09b) |
| M2 | **Les refus ne s'expliquent pas** ; faux conflits | aSc (avis) ; OpenEduCat (refus seul) | chaque refus nomme la règle et propose une solution | EP-4, MOT-03, EDT-03 | tous | en partie fait (VIT-18 le dit exactement) |
| M3 | **Contrôles de conflit éteints par défaut** | OpenEduCat ([CODE]) | contrôles toujours actifs, forçage tracé | EP-14 | tous | proposé (plan de parité, #193, non fusionné) |
| M4 | **Une route ouverte sans connexion** | OpenEduCat, présences ([CODE]) | liste écrite des routes publiques, test qui échoue sinon | EP-15 | tous | proposé (plan de parité, #193, non fusionné) |
| M5 | **Fuite des fiches d'élèves entre comptes** | Frappe (2026) ; Fedena 2.3 | isolation testée sur chaque route, y compris élève contre élève | EP-12, PLA-04 | tous | décidé (15 nov.) |
| M6 | **Données envoyées à l'éditeur en cachette** | OpenEduCat (envoi quotidien caché, [CODE]) | liste publique des envois sortants | EP-13, QUA-09 (#189) | tous | décidé (15 nov.) |
| M7 | **Mise en route lourde**, intégrateur payant | Odoo, OpenEduCat, Classter, Fedena (avis) | assistant de démarrage par type d'école, chronométré | EP-1, ADM-04 | tous | prévu ; à prouver |
| M8 | **Mises à jour qui cassent** | Frappe, OpenEduCat, Odoo | parcours verts avant chaque mise en ligne, retour arrière en une commande | EP-9 | tous | fait |
| M9 | **Textes non traduisibles** | OpenEduCat ([DÉPÔT]) | aucun texte en dur, trois langues | EP-16, UIX-08 | tous | le site le tient (règle de son plan) ; UIX-08 au plan de parité |
| M10 | **Interfaces vieillies, menus qui submergent** | aSc, EduPage, OpenEduCat, Classter (avis) | charte commune, menu limité aux modules actifs | UIX-10, EP-2 | tous | en cours |
| M11 | **Application mobile lente ou qui plante** | EduPage (3,5 sur 39 100 avis), Fedena | ouverture en moins de 2 s sur un téléphone de référence | EP-3, MOB-03 | tous | prévu |
| M12 | **Un site lourd, malgré la promesse « 2G »** | Go4School : environ 5,9 Mo et 500 requêtes sur l'accueil, performance mobile 29 à 48 | pages de 81 à 84 Ko, vidéo à la demande sur téléphone (VIT-17) ; à garder par une règle | VIT ; EP-19 | tous | **décidé** (N1, 21 nov.) |
| M13 | **Traceurs avant tout consentement** | Go4School (Google Analytics, Tawk.to) | le site ne charge rien d'ailleurs et ne dépose aucun cookie | EP-13, règles du site | tous | fait |
| M14 | **Contraste insuffisant, formulaire de vente inaccessible** | Go4School (bouton 3,13 ; deux violations critiques au devis) | axe-core sans violation, contraste AA vérifié par test | EP-11, EP-2 | tous | fait sur le site ; à tenir sur le formulaire de VIT-02 |
| M15 | **Promesses sans preuve** : « n° 1 », essai annoncé introuvable, décomptes contradictoires | Go4School ; PERIS (chiffres de clients variables) | chaque phrase sourcée ; test de garde | VIT-18 ; son extension aux superlatifs | tous | **décidé** (N4, 21 nov.) |
| M16 | **Avis sollicités dans le produit** | OpenEduCat (fenêtre G2, [DÉPÔT]) | aucune note d'un comparateur citée ; jamais de demande d'avis dans le produit | P-85 | tous | proposé dans l'étude 11 |
| M17 | **Un pays écrit dans le produit** (barème de paie, examens, devise) | Go4School (Cameroun) ; produits marocains (Massar, MAD) | configuration et connecteurs par pays | EP-5, EP-18, PLA-13, ETA-03 | tous | décidé |
| M18 | **Le supérieur oublié** : CM, TD, TP, groupes emboîtés, vacataires, plusieurs campus | produits marocains ; Go4School (maternelle au lycée) | c'est le cœur de Planner aujourd'hui (D4) | MOT, EDT | supérieur | fait |

## 4. Ce qu'aucun ne fait, et qui fait Planner

D'après toutes les études (01, 07, 09, 11, 13) :

1. **Calculer l'emploi du temps et expliquer chaque refus**, y compris pour le supérieur et plusieurs campus.
2. **Garantir par écrit qu'aucune donnée ne part chez l'éditeur sans le dire**, avec la liste publique des envois (EP-13).
3. **Tester l'isolation des données à chaque version**, élève contre élève compris (EP-12, PLA-04).
4. **Fonctionner sans pays supposé** : chacun s'enferme dans un pays (Maroc, Cameroun, Inde).
5. **Dire honnêtement ce qui marche sans téléphone, sans écran et sans réseau**, fonction par fonction (EP-18, VIT-15).
6. **Un site sobre, accessible et sans traceur**, mesuré à chaque version.

Ce sont les six arguments à porter partout : comparatif (VIT-14), pages de module (VIT-15), FAQ (VIT-11), démonstration. Ils ne se disent qu'une fois vrais dans le code, sans nommer personne.

## 5. Propositions nouvelles : toutes validées par le chef

**Les huit propositions sont validées par le chef le 21 novembre 2026**, par l'outil de questions (« Oui », pour chacune). Le coordinateur les inscrit dans `decisions.md`, et EP-19 dans le § 6 du README du plan.

| N° | Décision | D'où elle vient | Ce qu'elle change | Public | Taille |
|---|---|---|---|---|---|
| N1 | **EP-19, sobre et mesuré** : une page du site pèse au plus 200 Ko transférés, hors média lancé à la demande, vérifié en CI. Le premier chargement de l'application web est mesuré et écrit dans chaque PR qui le change | M12 ; EP-18 (peu de connexion) | une ligne dans le README du plan ; un contrôle dans la CI du site (`vitrine.yml`) | tous | S |
| N2 | **L'appel à la main hors ligne**, envoyé au retour du réseau, avec l'heure réelle de la saisie. Le QR code reste en ligne | R9 ; EP-18 | une fonction nouvelle dans MOB (ou MOB-06 élargie), conçue avec l'étude EP-18 | tous | M |
| N3 | **Le poids affiché avant chaque téléchargement** d'un support ou d'un document, et la reprise après coupure | R10 ; EP-18 | un critère de « terminé » des fonctions COU et BIB qui téléchargent | tous | S par fonction |
| N4 | **Étendre le test de garde du site aux superlatifs** (« n° 1 », « le seul », « le meilleur », « leader ») | M15 | une ligne de plus dans `contenu.test.js` (suite de VIT-18) | tous | S |
| N5 | **Avancer la page d'état publique** (VIT-04) juste après la mise en ligne du site | R6 | VIT-04 passe avant VIT-03 | tous | S |
| N6 | **Garder PAI-03 (argent mobile) reporté**, mais poser la question aux entretiens de terrain d'Afrique subsaharienne | R13 | une question de plus dans VEN-02 ; aucun code | tous | — |
| N7 | **Plusieurs systèmes d'évaluation dans une même école** (deux sous-systèmes, séquences ou trimestres, par classe) | R14 | une exigence de la conception VSC-01, avant son code | scolaire | conception |
| N8 | **Une tutelle comme client** (réseau d'écoles, diocèse, ONG) : en parler dans un entretien de VEN-02 | R15 | une question de plus dans VEN-02 ; GRP reste reporté | tous | — |

## 6. Ce que Planner ne reprend pas

| Pratique | Chez qui | Pourquoi on ne la reprend pas |
|---|---|---|
| Discussion en direct par un service tiers | Go4School (Tawk.to) | elle charge un script d'ailleurs et ouvre une session avant tout choix (règles du site, EP-13) |
| Mesure d'audience, Google Fonts, gestionnaire de balises | Go4School | même raison |
| Superlatifs et notes de comparateurs | Go4School, OpenEduCat (avis sollicités) | invérifiables (arguments marketing, § 5 ; P-85) |
| Contrôles de conflit réglables jusqu'à l'arrêt | OpenEduCat | EP-14 |
| Comptabilité générale et paie construites par Planner | Go4School, OpenEduCat (Odoo) | écartées par le plan de parité (#193), et retirées de la page Bientôt (décision du 18 nov.) ; Planner exporte vers la comptabilité (FIN-02) |
| Un barème ou un examen d'un pays écrit dans le code | Go4School, produits marocains | EP-5, EP-18 : par configuration ou connecteur seulement |
| Présence biométrique | — | écartée par le plan de parité (#193), décision du 18 nov. |
| « Tout-en-un » annoncé avant d'avoir la vie scolaire | Odoo, OpenEduCat | étude 07, § 6 : pas avant l'étape 4 |

## 7. Pour le coordinateur

| Ligne | Où la reporter |
|---|---|
| D1 à D4, réponses 1 à 3 de l'étude 13, N1 à N8 | `decisions.md`, au 21 nov. |
| **N1, EP-19** | README du plan, § 6 : « Sobre et mesuré : une page du site pèse au plus 200 Ko transférés, hors média lancé à la demande, vérifié en CI ; le premier chargement de l'application web est mesuré et écrit dans chaque PR qui le change ». Le contrôle de la CI du site : une mission courte (VIT), ou VIT-17 si elle n'est pas finie |
| **N2** | une fonction nouvelle du module MOB : « Appel à la main sans réseau, envoyé au retour du réseau avec l'heure de la saisie ; le QR code reste en ligne » ; plan conçu avec l'étude EP-18 |
| **N3** | critère de « terminé » des fonctions COU et BIB qui téléchargent : « poids affiché avant le téléchargement, reprise après coupure » ; à rappeler dans le modèle de conception (section EP-18) |
| **N4** | la suite de VIT-18 (après sa fusion) : le test de garde refuse « n° 1 », « #1 », « le seul », « le meilleur », « leader », et en anglais « number one », « the only », « the best », « leader » |
| **N5** | VIT-04 passe avant VIT-03 dans la file, après EXP-05 et la mise en ligne du site |
| **N6, N8** | VEN-02 : une question sur l'argent mobile aux écoles d'Afrique subsaharienne ; un entretien avec un réseau d'écoles (diocèse, ONG ou groupe privé) |
| **N7** | conception de VSC-01 (#215) : plusieurs systèmes d'évaluation dans une même école, réglés par classe, sans nommer de pays |
| R2, R3, R4 | fiches de VIT-09b, VIT-10b, VIT-15 : « données de démonstration crédibles » (R2) |
| R9, R10 et la réponse 3 de l'étude 13 | fiche de l'étude EP-18 (`etude-ep18-faible-equipement`) : comparer le hors ligne de Planner à ce qu'annonce Go4School, comme repère du marché |
| M16 (P-85) | rappel : la proposition attend encore le chef dans l'étude 11 |
| `01-concurrents.md`, § 8 | fait sur cette branche (Go4School) |

## 8. Limites

- Les concurrents sont jugés sur leur code quand il est public (OpenEduCat libre, Frappe, Fedena ancienne version), sinon sur leur site et sur les avis. Pour Go4School et PERIS, rien n'a été vérifié dans le produit.
- Les produits marocains datent de l'étude du 4 novembre et n'ont pas été revus.
- Les états du § 2 et du § 3 sont ceux du 21 novembre, d'après `main` et les branches citées ; plusieurs études restent sur des branches non fusionnées.
