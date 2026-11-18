# Décisions et questions ouvertes

Registre unique à partir du 7 novembre 2026.

**Où se trouvent les décisions plus anciennes :**
- le registre des propositions P-01 à P-83 ([../etude-marche/03-propositions.md](../etude-marche/03-propositions.md)) est **figé** : il reste l'historique des propositions ;
- le détail des décisions d'architecture est dans [../conception/plateforme/02-decisions.md](../conception/plateforme/02-decisions.md).

**Règle** : une décision nouvelle s'ajoute ici, datée, avec sa source. Une décision qui en remplace une autre le dit.

## 1. Décisions d'architecture (D-01 à D-21)

| N° | Décision | État |
|---|---|---|
| D-01 | Une base de données par école | en vigueur ; **à confirmer par la mesure de 200 bases** (PLA-06), puisque la cible compte désormais beaucoup de petites écoles |
| D-02 | L'école se déduit de l'adresse et du jeton, jamais du corps de la requête | en vigueur |
| D-03 | Un contexte d'école obligatoire pour toute lecture ou écriture | en vigueur ; l'essai du 29 octobre montre que la solution tient (`17-essai-contexte.md`) |
| D-04 | Un service « Plateforme » à part, avec sa base | en vigueur (PLA) |
| D-05 | Un compte pour la plateforme, des appartenances par école | en vigueur ; à relire avec VSC-01 (parents à deux écoles) |
| D-06 | Le code garde le sens, l'école nomme | en vigueur ; **à amender** dans VSC-01 pour les groupes transversaux (langues, options), hors de la limite de trois niveaux |
| D-07 | Réglages datés, « aperçu puis appliquer » | en vigueur ; MOT-01 en est le socle |
| D-08 | Import : zone de préparation, classeur unique, clés naturelles | en vigueur (ADM-03) |
| D-09 | Solveur : règles dures fixes, règles souples réglables | **amendée le 4 novembre** : 26 règles strictes verrouillées, 22 strictes réglables, 86 souples. Un profil ou la Plateforme peut rendre une règle stricte ; l'école ne choisit que « indispensable » |
| D-10 | Enseignants partagés : heures « occupé » fédérées | en vigueur (ADM-07) |
| D-11 | Marque et documents par école | en vigueur (migration 0055) |
| D-12 | Les jeux dans un service à part, des gabarits d'abord | en vigueur (QJE-05) |
| D-13 | Fonds des créateurs de jeux, par école | **gelée** avec la vente ; son calcul change avec un prix par module |
| D-14 | Échanges entre services : HTTP signé et boîte d'envoi | en vigueur |
| D-15 | Une donnée a un seul propriétaire, identifiant stable | en vigueur (BIB-01) |
| D-16 | Exploitation : vagues, migrations compatibles, sauvegardes hors serveur | en vigueur (EXP) |
| D-17 | Monolithe modulaire ; quatre services séparés | en vigueur |
| D-18 | Désactiver plutôt que supprimer | en vigueur |
| D-19 | L'année est le cadre ; une année close est en lecture seule | en vigueur (ADM-06) |
| D-20 | Des sites indépendants dans une même école | en vigueur, conditionnelle (PLA-13) |
| D-21 | Configuration et marque dans la base de l'école | en vigueur |

## 2. Décisions de produit et de travail, datées

| Date | Décision | Remplace |
|---|---|---|
| 11 oct. | Les comptes actifs sont facturés à l'école ; l'IA est incluse ; on dit « Bibliothèque » ; la soutenance n'est plus un repère | — |
| 15 oct. | L'espace de cours est géré dans Planner, ses fichiers sont gardés par StudyLib | — |
| 20 oct. | Limite d'appels à l'API par compte ; sortir de ClassQuiz au profit du Studio quiz | — |
| 20 oct. | Dans les écrans et les messages, on dit « Quiz » ; « PlannerQuiz » et « ClassQuiz » restent des noms techniques | — |
| 21 oct. | La publication de l'emploi du temps est faite par l'administration ; un report se fait sans choix d'heure (le solveur propose, puis l'administration valide) | — |
| 24 oct. | Planner pour toute école, une base par école, sites indépendants (plan multi-établissements validé) | — |
| 25 oct. | Les devoirs avec rendu de fichier reviennent (COU-02) | « devoirs masqués » du 11 octobre |
| 26 oct. | Revue d'expert : corrections R-1 à R-5 retenues, R-6 (sauvegardes à clé publique) faite le 29 octobre, R-7 et R-8 non retenues | — |
| 29 oct. | Un test de régression avant d'annoncer un correctif ; suite complète et parcours (la CI tranche si le poste ne peut pas) | — |
| 30 oct. | Supervision : sonde hébergée, alerte par notification sur le téléphone et par courriel, **aucune erreur envoyée hors du serveur** | — |
| 31 oct. | L'ancien serveur expire ; Planner est réinstallé ailleurs ; les secrets sont copiés à part (ils ne sont dans aucune sauvegarde) | — |
| 3 nov. | Le solveur devient un **moteur central configurable par profil** (primaire, collège, lycée, formation, université), jamais un générateur par type d'école ; Timefold contre CP-SAT se tranche par la mesure | — |
| 3 nov. | Style neutre et école fictive tant qu'une école n'est pas configurée (socle neutre) | — |
| 4 nov. | **La pile ne change pas** (Express, Sequelize, MySQL, React et MUI, Timefold) ; la pile proposée par `plan.txt` n'est pas retenue. L'étude de la pile se clôt dans QUA-03 | — |
| 4 nov. | MP-1 : table unique de valeurs avec portée ; migrations 0059 (EC-9), 0060 (socle neutre), 0061 (MP-1) | — |
| 4 nov. | Planner ne connaît pas les bâtiments : ni filière ni classe n'a de campus | R-3 du 21 octobre |
| 4 nov. | Le socle est inclus dans tout abonnement | — |
| 5 nov. | **Vente mise de côté** : facturation, contrats, offre d'IA, école pilote, démonstration aux directeurs, campagne marketing. Priorité : régler les problèmes reprochés aux autres outils | — |
| 5 nov. | Un site public du produit, pour être contacté (VIT) | — |
| 5 nov. | Le nom du produit est **Planner** ; Jadwal est abandonné | Q-29 |
| 7 nov. | **Plusieurs écoles sur une installation d'abord**, puis le scolaire, puis le pack « École privée » | la feuille de route du 4 novembre au soir (« finir le supérieur d'abord ») |
| 7 nov. | Cible : écoles privées de la maternelle au lycée, puis formation professionnelle ; HESTIM reste servi | Q-3 (« supérieur seulement, pas de mineurs ») |
| 7 nov. | **Le dépôt GitHub reste public** (limite de durée de GitHub Actions sur un dépôt privé) ; règle : aucune donnée réelle ni aucun secret dans le dépôt | « dépôt privé » du 11 octobre |
| 7 nov. | Ce plan par modules remplace tous les plans précédents ; une session = une fonction, sur sa branche, fusionnée si la définition de « terminé » est tenue | — |
| 7 nov. | Nouveau serveur Debian, partagé avec n8n (adresse et accès hors du dépôt, qui est public) : **tout en conteneurs, n8n n'est jamais touché** | serveur provisoire du 31 octobre |
| 8 nov. | `docs/users.xlsx` ne contient que des personnes fictives : **pas de réécriture de l'historique** ; le dépôt reste public (GitHub Actions) | Q-14 |
| 8 nov. | **`main` protégée** : CI verte exigée avant de fusionner (déjà en place : les 6 contrôles de la CI) ; les parcours qui échouaient le dimanche sont corrigés (QUA-07) | Q-15 |
| 8 nov. | **Un élève a un compte, créé par son établissement** (jamais d'inscription libre) | Q-02 (« séparer la personne du compte ») et Q-14 de conception-c5 |
| 8 nov. | Les réponses proposées aux questions Q-1 à Q-13 de [conception-c5](../conception/vie-scolaire/conception-c5-modele-donnees-scolaire.md) sont retenues ; sa Q-14 est remplacée par la décision précédente | Q-03 |
| 9 nov. | **Le chef de projet est le compte Claude20022002**, initiateur et maître du projet : lui seul pousse, fusionne, ouvre et ferme un chantier, valide un plan, tranche une décision ([organisation.md](organisation.md)) | — |
| 9 nov. | **Chantiers de module** : au plus 3 ouverts à la fois ; on ne prend une fonction que dans un chantier ouvert ; un chantier commencé se termine | — |
| 9 nov. | **Une tâche, une branche**, nommée par son type (`feat/`, `fix/`, `etude/`, `refactor/`, `test/`, `doc/`, `chore/`, `mkt/`) puis son identifiant | les préfixes de module (`pla/`, `mot/`…) du 7 novembre |
| 9 nov. | **Aucun code sans plan de conception validé** par le chef ; l'agent pose ses questions avant, sans rien supposer | « conception d'abord pour une fonction M ou plus » du 7 novembre |
| 9 nov. | **Fin de session obligatoire** : `suivi.md` à jour et une fiche de session avec son prompt de reprise ; une session trop longue se résume (`/compact`) ou passe la main | — |
| 9 nov. | Module **MKT** (marketing) ajouté, porté par les 9 agents de `..\planner-marketing` ; la vente reste gelée : on prépare, on ne publie pas | — |
| 9 nov. | Chantier **PLA** ouvert, dans l'ordre PLA-06, PLA-03, PLA-05, PLA-01, PLA-02, PLA-04, PLA-07 ; ordre validé et chantier **EXP** confirmé ouvert (EXP-01 à EXP-05) le 10 novembre | — |
| 10 nov. | Chantier **QUA** ouvert, limité à **QUA-03** (clore l'étude de la pile), pour débloquer PLA-01 : 3 chantiers ouverts sur 3 | — |
| 10 nov. | L'agence marketing se sauvegarde dans un **dépôt GitHub privé** `planner-marketing` (logos, stratégie) ; la vente reste gelée : le marketing prépare, ne publie pas | — |
| 10 nov. | PLA-06 : mesure en local, MySQL limité aux ressources du nouveau serveur ; 200 bases au schéma complet, chacune avec une école fictive d'environ 300 élèves ; seuils, activité et réglages proposés le 9 novembre, retenus le 10 ; si D-01 tombe, le chantier PLA s'arrête jusqu'à décision | — |
| 10 nov. | **Jeux : aucun nom ni adresse d'école** ; `curriculum` = discipline et niveau visés. Le § 1 du contrat des jeux est amendé | la page HESTIM du programme exigée le 16 octobre |
| 10 nov. | **Jeux : un essai raté ne donne pas la réponse.** On dit ce qui est faux ; la solution s'obtient sur demande ou après trois essais ratés, et coûte les points du défi (contrat des jeux, § 1.0) | — |
| 10 nov. | **QJE-04 : exception à la limite de 3 chantiers**, pour QJE-04 seule (la branche d'Alexis prend du retard sur `main`). Alexis corrige B-1, B-2 et I-1 sur sa branche | — |
| 13 nov. | **Douze modules ajoutés au plan**, tirés de l'inventaire du 11 novembre ([06-outils-structures-formation.md](../etude-marche/06-outils-structures-formation.md)) : COM, ETA, PAI à l'étape 4 ; RHP, FOR, DOC, INS à l'étape 5 ; PIL, GRP, STA (sauf STA-01), SER, STK, ETA-03 et PAI-03 **reportés** ; tailles provisoires, à corriger dans chaque plan de conception (environ 53 jours bruts de plus) | — |
| 13 nov. | **Fonctions déplacées**, numéros jamais réutilisés : FIN-03 devient RHP-01, VSC-05 devient ETA-02, COU-07 devient STA-01 ; le plafond de cumul de VSC-06 passe dans RHP-02 | — |
| 13 nov. | Tout module qui prévient quelqu'un passe par **COM** (service d'envoi commun, plages de silence) ; VSC-03 et MOB-05 dépendent de COM-01 | — |
| 13 nov. | **FIN, COM et PAI attendent les entretiens de VEN-02**, qui confirment le module d'achat de chaque marché (décision I-5 de l'inventaire) | — |
| 13 nov. | Chantier **MOT** ouvert à la place de QUA (fermé à la fusion de #171), dans l'ordre MOT-12, MOT-02, MOT-03, MOT-04 ; **MOT-12** nouvelle : montée du solveur (Spring Boot 4.x, Timefold 1.31, Java 21), avant MOT-04 | — |
| 15 nov. | **Contraintes déclarées par l'école (MOT-13)**, en tête du chantier MOT : l'école ne règle jamais les 498 paramètres ; le calcul tient le socle (données), le profil (liste courte « Déjà pris en compte », désactivable sauf les règles verrouillées) et les contraintes qu'elle déclare à partir de modèles guidés (l'IA plus tard, relue par l'école). Une impossibilité déclarée est stricte et contrôlée avant le calcul ; un souhait est souple (peu, normal, beaucoup, indispensable sur un niveau de score à part) : **D-09 tient**. Seule l'administration déclare ; les enseignants gardent disponibilités et vœux. Une règle que le calcul ne tient pas n'est pas montrée | — |
| 13 nov. | Une **seconde passe de recherche**, ciblée sur ce que l'inventaire n'a pas pu voir (avis des magasins d'applications, aSc, Hyperplanning, paiement des frais au Maroc, pays non couverts), se fera plus tard dans une session à part (décision I-3) | — |
| 13 nov. | **La pile est confirmée** (QUA-03, [pile.md](../conception/qualite/pile.md)) : Express, Sequelize, MySQL 8.4, React et MUI, Expo, Timefold et Java 21, JWT ; la pile de `plan.txt` reste écartée. Confirmation **sous condition que D-01 tienne** (PLA-06). Sequelize est gardé sous surveillance. Montées à prévoir, non décidées : Spring Boot 4 (support libre de la 3.3 fini le 30 juin 2025), Timefold 1.31 puis MOT-04, Node 24, Express 5. Conditions de réouverture : § 5 de la page | la décision du 4 novembre (« l'étude de la pile se clôt dans QUA-03 ») |
| 15 nov. | **MOT-12 : Spring Boot 4.1 et cœur de Timefold 1.35, sans le starter Timefold**, Java 21 inchangé. L'essai a montré que le starter 1.x ne démarre pas sous Spring Boot 4 (toute la 1.x vise Boot 3.5, sans support libre depuis le 30 juin 2026), et que la 1.x va jusqu'à 1.35. Jackson 3 gardé, avec le réglage `fail-on-null-for-primitives=false` ([conception](../conception/moteur-planification/mot-12-montee-solveur.md)) | la décision du 13 nov. sur les versions de MOT-12 (Spring Boot 4.x, Timefold 1.31) |
| 15 nov. | **Ollama retiré du serveur** partagé avec n8n (conteneurs, volume, image). n8n, Traefik, postgres et Qdrant non redémarrés. Ne pas relancer le profil Compose `cpu`. | décision du 11 nov. (PLA-06 / Q-21), appliquée |
| 15 nov. | **Un coordinateur des agents** : une session Claude désignée par le chef répartit le travail entre Claude, Codex et l'agent de Cursor par des **fiches de mission** (`docs/plan/missions/`), le suit et le relit ([organisation.md](organisation.md), § 10) | — |
| 15 nov. | Le coordinateur **tranche ce qui est réversible à l'intérieur d'un module** et l'écrit ici, marqué « coordinateur » ; le chef garde le produit, le schéma partagé et les migrations, la sécurité et le légal, la pile, le serveur, les chantiers et l'irréversible | « lui seul tranche une décision » du 9 novembre, pour les seules décisions techniques réversibles |
| 15 nov. | Le coordinateur **valide les plans des fonctions S et M** sans migration, sécurité, donnée de mineur ni choix de produit ; le chef valide les autres | « plan validé par le chef » du 9 novembre, pour ces seuls plans |
| 15 nov. | **Pousser et fusionner restent au chef seul**, coordinateur compris | — |
| 15 nov. | Skills de coordination **écrits pour Planner** : les skills publics lus n'ont pas été installés (l'un lance Codex sans bac à sable ni approbation, un autre ajoute un hook aux réglages) ; sources dans `.claude/skills/SOURCES.md` | — |
| 15 nov. | *(coordinateur)* La vue « qui travaille sur quoi » est un tableau **« Missions en cours »** de `suivi.md`, et non une colonne ajoutée aux 150 lignes du tableau des fonctions : la colonne aurait mis en conflit toutes les branches ouvertes. Écart avec le plan validé, **confirmé par le chef le 15 nov.** | — |
| 15 nov. | **Schéma de départ (PLA-03b)** : toute PR qui ajoute une migration lance `npm run schema:depart` et commite le fichier régénéré ; le test d'équivalence le rappelle. **Rouverte le 15 nov.** : elle reprend l'option que la réponse 3 du chef avait écartée, et rendrait rouge la CI de toute PR ouverte qui porte une migration ; le coordinateur recommande de revenir à la réponse 3 (fichier figé, régénéré à la demande du chef) | la réponse 3 du chef pour PLA-03b, si elle est maintenue |
| 15 nov. | **Le chef délègue au coordinateur trois validations** : le plan de PLA-03b, le plan court de #177 et le point A-2 de PLA-06. Elles sont signées « coordinateur, par délégation du chef » | la règle « plans L, XL, migration et serveur validés par le chef », pour ces trois seulement |
| 15 nov. | *(coordinateur, par délégation)* **C-1 abandonnée** : le schéma de départ reste figé et ne se régénère que sur décision du chef, par une tâche `chore/` (réponse 3 maintenue). **Plan de PLA-03b validé**, variante R-3, avec toutes les propositions de son § 3 | la ligne « Schéma de départ (PLA-03b) » ci-dessus |
| 15 nov. | *(coordinateur, par délégation)* **Plan court de #177 validé** (sauvegarde avant déploiement qui échoue sans bruit) : correctif hors chantier ; suivre le style de `tester-deployer.sh` ; purge et chiffrement des vieux dumps (REL-03) dans une autre PR | — |
| 15 nov. | *(coordinateur, par délégation)* **PLA-06, A-2** : le témoin n8n est une sonde **en lecture seule** de son adresse de santé, toutes les 15 s, relevée 10 min avant la série pour fixer sa durée de référence ; arrêt si une réponse échoue, ou si la durée médiane sur une minute dépasse le double de la référence. Aucun traitement n8n n'est créé ni lancé (n8n n'est jamais touché). Créneau : celui où le chef lance la série, avant EXP-02b, hors des heures où il sait que n8n travaille ; il le confirme à chaque lancement | — |
| 15 nov. | **Chaque agent choisit le modèle le plus adapté à sa tâche**, d'après la recommandation de sa fiche de mission ; s'il ne tourne pas déjà sur ce modèle, il le dit au chef (seul l'utilisateur change le modèle d'un éditeur), et il l'écrit dans sa fiche de session | — |
| 15 nov. | *(coordinateur)* **Un seul générateur de collège fictif** : celui de MOT-13b ; MOT-02 le lit sur `main`. Le **filtrage des domaines du solveur** n'est pas fait dans MOT-02, qui mesure seulement ; s'il est nécessaire, il devient une fonction à part, rattachée à MOT-10 | le renvoi du filtrage à MOT-02 dans le plan de MOT-13b |
| 15 nov. | *(coordinateur)* **Constat de MOT-02, à traiter dans MOT-04** : avec Timefold 1.35, une solution inachevée (construction coupée à 600 s) rend un score 0hard/0soft et une liste de violations vide. Le serveur ne s'y fie pas (il compte les séances placées et annonce les enseignements incomplets), mais le score et les violations ne doivent jamais servir seuls de preuve de complétude | — |
| 15 nov. | **Supports marketing (MKT-05, MKT-09)**, réponses du chef : les arguments sans source sont **cherchés avant d'être dits** ; les concurrents ne sont **jamais nommés en vidéo**, et seulement à l'oral, sources à l'appui, dans la présentation (« il faut les faire développer ») ; vision large (« toutes les écoles, du nord au sud ») avec un état honnête (badges « Disponible » et « En préparation »), supérieur et formation professionnelle ajoutés à la cible ; script 2 en vidéo principale, animation dessinée, version sans voix d'abord, présentation de 20 minutes, aucune école citée, français puis anglais, diffusion après MOT-13c, MKT-01 avant toute production ; rien n'est publié | la mise de côté de MKT-09 (vente gelée), pour la seule préparation |
| 15 nov. | **Arguments marketing après recherche** (`kit-video-planner/sources-arguments.md`) : on dit « des outils faits ailleurs, pour d'autres règles » (et non « un seul établissement ») et, pour les outils africains, « avant d'acheter, rien ne se vérifie » (et non « pas de qualité ») ; les failles de Frappe Education et d'OpenEduCat ne sont **pas citées**, ni en vidéo ni à l'oral, avant un signalement aux éditeurs et l'avis du juriste ; contact du carton final fourni plus tard | — |
| 15 nov. | **Deux engagements de l'offre** : « vous ne prenez que les modules dont vous avez besoin » (registre des modules, VEN-01) et « une information saisie une fois sert partout » (EP-5) | — |
| 15 nov. | **Plan EXP-02a validé** (branchement Traefik, sans lancer Planner), avec les trois remarques du coordinateur (`docs/plan/missions/exp-02a.md`) | — |
| 15 nov. | **PLA-06 : pour le moment, seul le serveur sert de machine** ; le PC Ubuntu n'est pas employé (P-22, P-23 et P-25 sans objet). Le plan de PLA-06 s'amende pour mesurer sur le serveur partagé avec n8n, puis se refait valider par le chef ; seul le chef lance les commandes sur le serveur | la mesure en local du 10 novembre |
| 15 nov. | **Noms publics de l'installation gardés** (question ouverte « nom de domaine », Q-11) : ceux déjà écrits dans `deploy/vps/nginx-hestim.conf` et `deploy/vps/generer-env.sh`. Le pointage DNS est EXP-02b. Le branchement du nouveau serveur est Traefik (labels, réseau externe), sans port public sur Caddy. | — |
| 18 nov. | **Face à RosarioSIS, Fedena, OpenEduCat, SchoolTool, openSIS et Moodle.** Le pack de l'étape 4 couvre déjà ce qu'ils ont et que Planner n'a pas (familles, bulletins, frais, parent, arabe, Massar, passage d'année). Le trou du jalon « collège avec groupes de langue » est **VSC-07** : l'affectation des élèves, lue par MOT-06 et importée par ADM-03. MOT-09 prévient les enseignants après validation. L'espace parents (MOB-05) dépend des notes et des frais. On ne crée pas de module discipline, santé, bibliothèque de prêts, comptabilité générale, ni un second Moodle : les questions Moodle entrent par QJE-02, et COU-09 (LTI) reste reporté | étude du 18 novembre |

**Questions anciennes déjà réglées**, gardées pour mémoire :
- **Q-8** : partage des heures éteint par défaut.
- **Q-11** : essai gratuit effacé après 60 jours (gelé). Le même numéro désigne aussi le nom de domaine : tranché le 15 nov. (ligne ci-dessus), distinct de l'essai gratuit.
- **Q-12 à Q-14** : 5 ans de conservation, 30 jours de grâce, préavis de 5 jours.
- **Q-16 et Q-24** : IA avec Haiku 5.5, sous enveloppe.
- **Q-17, Q-18 et Q-28** : contrat annuel, accompagnement, forfaits (gelés).
- **Q-20 et Q-26** : 15 minutes de perte au plus, 4 h pour rétablir, 99,5 % de disponibilité.
- **Q-21** : une deuxième personne en production (qui : Q-10 ci-dessous).
- **Q-22** : les créateurs de jeux plus tard.
- **Q-23** : une école qui l'exige est hébergée au Maroc, dans une instance dédiée.

## 3. Questions ouvertes

| N° | Question | Proposition | Bloque |
|---|---|---|---|
| Q-01 | Effectif réel, budget, date cible. Qui finance une équipe plus nombreuse, et jusqu'à quand ? | viser la rentrée de septembre 2027 pour le pack « École privée », sinon réduire le pack | l'étape 4 |
| Q-04 | Relecture du contrat de MP-1 (R-1 à R-10 du groupe B) | à répondre avant les écrans de MOT-01 | MOT-01 (écrans) |
| Q-05 | Fin de la ligne Timefold 1.x : correctifs annoncés **pendant 2026 seulement** (constaté le 13 nov., QUA-03) ; Spring Boot 3.3, sous le solveur, est sans support libre depuis le 30 juin 2025 ; en 2.x, `ScoreAnalysis`, qu'utilise le solveur, devient payant (vérifié dans le jar 2.8.0 le 15 nov.) ; la dernière 1.x est la 1.35, installée par MOT-12 | décider dans MOT-04, avant l'étape 3 | MOT-03, EP-4 |
| Q-06 | Entretiens de terrain : séparés de toute démonstration ? | oui : cinq directeurs écoutés, sans rien leur montrer, avant de concevoir VSC-04 et FIN-01 | VSC-04, FIN-01 |
| Q-07 | Primaire et maternelle : emploi du temps généré, ou simple saisie ? | collège et lycée générés d'abord ; primaire et maternelle en saisie simple tant qu'un entretien n'en dit pas plus | MOT-07 |
| Q-08 | Le catalogue n'a pas de profil maternelle ; la colonne « École privée » de `profils.md` désigne le profil formation | ajouter un profil ou décider que la maternelle n'est pas générée (avec Q-07) | MOT-05 |
| Q-09 | École pilote (ancienne Q-25), et où elle est hébergée (Q-23) | gelé avec la vente | VEN |
| Q-10 | Qui est la deuxième personne en production (ancienne Q-27) ? | à nommer avant la première école extérieure | EXP |
| Q-12 | Images du registre GitHub (`ghcr.io`) publiques ou privées ? | publiques (aucun secret dans les images) ; sinon un jeton en lecture seule sur le serveur | EXP-03 |
| Q-13 | Service de sonde : Better Stack ou UptimeRobot | à l'inscription, selon les limites de l'offre gratuite | EXP-05 |
| Q-16 | Règles du carnet de notes (modification, verrouillage, arrondis) | à faire valider par une scolarité et le juriste | VSC-04 |
| Q-17 | Règles de modération de la messagerie | à trancher avant COU-08 | COU-08 |
| Q-18 | Nom de l'application dans les magasins | « Planner » sauf conflit de marque | MOB |
| Q-19 | Les 28 questions juridiques, fiscales et Massar de l'étude du modèle économique | gelées, sauf Massar (ETA-02, ancienne VSC-05) et loi 09-08 (condition légale) | ETA-02 |
| Q-20 | Un élève a un compte (décision du 8 novembre), mais un enfant de 6 ans n'a pas d'adresse électronique, et `Users.email` est obligatoire et unique. Avec quoi se connecte-t-il ? | un **identifiant donné par l'école**, adresse facultative, mot de passe initial remis par l'école (ou par le parent) ; pas d'adresse factice. Étude d'impact sur chaque fichier qui lit `Users.email` (connexion, réinitialisation, notifications, import) | VSC-01 |

## Décision du chef du 15 novembre : UIX-01a

Source : conversation avec Codex, « Application web de gestion », « J’aimerai un truc comme celui de Odoo », puis « Oui je valide tes proposition ».

- Inspiration Odoo pour l'organisation et l'apparence générale de l'application, avec une identité propre à Planner.
- Premier lot limité à l'accueil des applications et à la navigation entre les écrans existants, avant la reprise des écrans métier.
- Exception hors chantier autorisée pour UIX-01a ; les chantiers EXP, PLA et MOT restent ouverts, aucun quatrième chantier n'est ouvert.
- Sans destination explicite, la connexion ouvre les applications accessibles au rôle ; les tableaux existants restent disponibles. Les contrôles de sécurité restent appliqués par les routes et le serveur.
- Le registre commercial et l'activation des modules restent dans VEN-01 ; cette interface ne les remplace pas.

Conception : [UIX-01a](../conception/interface/uix-01a-navigation.md). Aucun changement de pile ni migration dans ce lot.

## Décision du chef du 15 novembre : UIX-06a

Source : conversation Codex, réponse « Valider » aux quatre propositions et au plan UIX-06a.

- Exception hors chantier limitée au pilote UIX-06a, sans quatrième chantier.
- Périmètre : connexion, accueil/navigation, Comptes, Enseignants et Étudiants.
- Lot visuel découplé de UIX-01 ; migration 0060 et assistant exclus.
- Interface sobre clair/sombre, Inter ; encre ardoise sans couleurs d’école, bleu nuit pour la marque ; identité d’école et SVG approuvés conservés.

[Plan validé](../conception/interface/uix-06a-interface.md). Aucun backend, serveur, push ou fusion autorisé à l’agent.

## Décisions du 17 et du 18 novembre : travail en équipe, UIX-06b puis UIX-06c

**Chef, 17 nov. au soir** : tous les agents (Claude dans VS Code, agent de Cursor, Codex) travaillent ensemble sur la même tâche, synchronisés, sans conflit, chacun avec le modèle le plus adapté, en développement par composants. Tâche : **UIX-06b, puis UIX-06c** si son plan est validé. Les sessions Claude en cours (QUA-10, essai PostgreSQL) finissent leur étape ; celle de QUA-10 rejoint l'équipe.

| Décision | Par |
|---|---|
| Règles du travail en équipe : [equipe.md](equipe.md) ; skill `equipe` pour le coordinateur ; renvoi dans `AGENTS.md`, point 3 | coordinateur, à la demande du chef |
| UIX-06b en trois lots : Codex intégrateur (commun et Filières), agent de Cursor (Groupes et Modules), Claude de VS Code (Enseignements) ; propriétaires et rendez-vous dans [uix-06b-equipe.md](missions/uix-06b-equipe.md) | coordinateur |
| Les dictionnaires de traduction sont coupés par lot (`i18n/referentiel/<lot>.fr.js` et `.en.js`), pour que deux agents n'écrivent jamais le même fichier | coordinateur |
| Repères de taille d'une mission d'équipe : page 80 lignes, hook 200, composant et dialogue 150 ([equipe.md](equipe.md), § 3) | coordinateur |
| UIX-06c ([plan](../conception/interface/uix-06c-ressources-temps.md)) : **à valider par le chef**, avec l'exception hors chantier | chef, en attente |

**Chef, 18 nov., vers 00 h 15** : un site vitrine au style d'apple.com (contenu à la manière d'OpenEduCat), et une grille d'applications façon icloud.com pour les modules de l'école. Logos officieux reçus (icône bleu nuit à la toque-horloge, logo horizontal à l'horloge).

| Décision | Par |
|---|---|
| Le style Apple vaut pour le site vitrine et la grille d'abord, puis pour l'application | chef |
| Travail de ce soir, après UIX-06b, à la place d'UIX-06c (reportée, plan à valider plus tard) | chef |
| Site construit sans être mis en ligne : la préparation de VIT-05 est dégelée, sans tarifs | chef |
| Site en français, anglais et arabe dès la structure ; l'arabe se remplit après UIX-04 | chef |
| Bibliothèques proposées : Motion (déjà là) pour l'animation, Lucide et lucide-animated pour les icônes, Astro pour le site statique ; **à accepter par le chef** avec les plans [vit-vitrine.md](../conception/vitrine/vit-vitrine.md) et [uix-09-grille-applications.md](../conception/interface/uix-09-grille-applications.md) | coordinateur, en attente du chef |
| Redistribution : le lot Enseignements d'UIX-06b passe à Codex ; Claude (VS Code) devient l'intégrateur du site ; l'agent de Cursor le rejoint et Codex fait UIX-09 après l'intégration d'UIX-06b ([vit-equipe.md](missions/vit-equipe.md)) | coordinateur |
| **Plans du site vitrine et d'UIX-09 validés**, avec Motion, Lucide, lucide-animated et Astro ; couleurs du site prises sur le logo (provisoires jusqu'aux SVG) ; le logo « mosaïque » reste dans l'application tant que le logo officiel n'est pas choisi | chef, 18 nov. |
| Site vitrine, reprise du 18 nov. (fiche de `feat/vit-01-vitrine`) : la session du site ne trouvant pas le coordinateur, le chef relaie ses fiches ; les cadres d'appareils gardent des illustrations jusqu'au nouveau style de l'application ; l'audit de `backend/` (picomatch, déjà rouge sur `main`) se corrige sur une branche `fix/` à part, avec un plan court, à attribuer | chef, 18 nov. |
| L'agent de Cursor passe tout de suite aux pages du site ; Codex reprend tout UIX-06b avec l'inventaire de l'agent de Cursor ; écarts 2 à 6 du site acceptés (section 6 fidèle à l'existant, Motion sans îlot React, pas de hreflang sans domaine, composant `Duo`) | coordinateur, 18 nov. 02 h 12 |
| Failles des outils de construction du site acceptées tant que le site n'est pas en ligne, revues avant la mise en ligne ; audit de `backend/` corrigé sur `fix/audit-dependances` par la session du site après son intégration ([plan court](../conception/exploitation/fix-audit-dependances.md), **validé** : picomatch sans correctif publié, exception écrite, datée, 30 jours au plus, `qs` corrigé, Astro monté le 27 nov.) | chef, 18 nov. |


## Décisions du 18 novembre au matin : site vitrine, relecture d'UIX-06b

**Chef, 18 nov., session du site vitrine** (relevées dans la fiche `docs/sessions/2026-11-18-feat-vit-01-vitrine-2.md` de `feat/vit-01-vitrine`, relayées par le chef) :

| Décision | Par |
|---|---|
| Le lot « pages de fonctions » passe à Claude (VS Code), sur `feat/vit-01-vitrine` (`55f5ab06`) | chef |
| Les onze failles d'audit des outils de construction de `vitrine/` (aucune ne touche le site publié) sont acceptées tant que le site n'est que construit ; l'audit est à refaire avant toute mise en ligne | chef |
| La page Sécurité ne nomme pas la loi 09-08 tant que Q-23 n'est pas tranchée | chef |
| La carte « Aucun envoi caché » (EP-13) reste marquée « Bientôt » tant que la PR #189 (QUA-09) n'est pas fusionnée | chef |
| La phrase sur l'IA reste, précisée par « quand l'école active l'IA », aucun fournisseur n'étant choisi en production | chef |
| La page Bientôt montre les fonctions « prévues » du plan de parité (#193), groupées par domaine et sans date. Elle ne montre ni ce qui est écarté (biométrie, comptabilité et paie), ni ce qui est soumis à condition (tuteur IA, santé) | chef |
| **Doublon des pages** : on garde `55f5ab06`. `feat/vit-01-vitrine-pages` (agent de Cursor, `12ccb3ba`) ne sera pas fusionnée ; le chef supprimera la branche et le dossier | chef |

**Coordinateur, 18 nov., 10 h 16** :

| Décision | Par |
|---|---|
| *(coordinateur)* Relecture de `feat/uix-06b-referentiel` (`7b5b8fc9`) : **à corriger**, cinq points envoyés à Codex. Lignes trop longues, une page qui charge ses données, parcours plus minces que la fiche (liste vide, filtre sans résultat, 390 px, rôles), un commentaire de rôle manquant, deux accords du chef absents de ce fichier | coordinateur |
| *(coordinateur)* Une mission d'équipe écrit **160 caractères au plus par ligne**, en plus des repères de taille ([equipe.md](equipe.md), § 3). Sans cette limite, un repère en nombre de lignes ne veut rien dire : UIX-06b les tenait avec des lignes de 540 caractères | coordinateur |
| *(coordinateur)* Codex fait les corrections d'UIX-06b, puis UIX-09, dans cet ordre. UIX-09 prend son plan sur `doc/coordination-equipe` et le commite seul en premier | coordinateur |
| *(coordinateur)* Relecture de `feat/vit-01-vitrine` (`19167d6f`, PR #195) : **prête sur le fond**. Sa fusion attend que « Test Backend » repasse au vert, ce que fera `fix/audit-dependances` | coordinateur |

**Chef, 18 nov., 10 h 30** (réponses aux questions du coordinateur) :

| Décision | Par |
|---|---|
| UIX-06b : **confirmés**, l'ajout d'axe-core 4.10.3 comme dépendance de test du frontend (`d941a896`) et la correction du § 2 du plan pour Groupes, « effectif et écart avec la somme des sous-groupes » (`f9fa7477`) | chef |
| `fix/audit-dependances` ne traite que `backend/`. La partie `vitrine/` se fait avec la montée d'Astro du 27 nov., après la fusion de #195 ([plan](../conception/exploitation/fix-audit-dependances.md), § 6) | chef |
| REL-06 et REL-03 (agent de Cursor) : journaux Docker en `json-file`, **10 Mo × 5 fichiers** par service ; dumps d'avant déploiement chiffrés comme le quotidien et gardés **14 jours**. Chaque correctif a son plan court, que le chef valide avant le code, car les deux touchent le déploiement de production | chef |
| **Plan d'UIX-06c validé**, avec l'exception hors chantier limitée à Salles, Campus, Créneaux et Calendrier. Départ après UIX-09. L'équipe et la fiche d'équipe seront fixées à ce moment-là. UIX-06d reste en question | chef |

**Chef, 18 nov., vers 10 h 40** (« Je valide ta proposition », sur les propositions du coordinateur de 10 h 35) :

| Décision | Par |
|---|---|
| Toute réattribution d'un lot passe par le coordinateur, qui retire d'abord la consigne de l'ancien agent ([equipe.md](equipe.md), § 7) | chef |
| Ordre de fusion : `fix/audit-dependances`, puis #195, UIX-06b, UIX-09 (verrou npm régénéré), et `doc/coordination-equipe` en gardant toutes les lignes | chef |
| UIX-06d (Conflits, Affectations, Imprévus, Examens) suivra, une fois UIX-06c relue. Son plan est à écrire à ce moment-là | chef |
| Les adresses de contact du site attendent VIT-02 et Q-11 | chef |
| L'agent de Cursor fait REL-06 et REL-03 sur le modèle le plus fort de Cursor, que le chef choisit dans l'éditeur | chef |

**18 nov., vers 11 h 10** :

| Décision | Par |
|---|---|
| Plan de REL-06 (`c22603b8`, journaux Docker) **validé tel quel** | chef |
| Plan de REL-03 (`6240f8d2`) **validé avec un changement** : le dump d'avant déploiement est toujours chiffré par la phrase (`PHRASE`, AES256), même quand le quotidien utilise `CLE_PUBLIQUE`, pour qu'une migration ratée se reprenne sur le serveur seul. Sans phrase, le déploiement s'arrête | chef |
| `appliquer-maj.sh`, l'ancien script qui écrit encore deux dumps en clair, n'est pas touché par REL-03. **À retirer ou à corriger plus tard**, s'il est encore appelé | chef |
| Le code de REL-06 et de REL-03 se fait sur le modèle le plus fort de Cursor, que le chef choisit | chef |
| *(coordinateur)* #198 (audit) **prête** : CI verte, exception datée au 18 déc., 13 tests du script. #183 (MOT-03, `c53d4cbb`) **prête** | coordinateur |
| *(coordinateur)* UIX-06b : Codex peut replier les trois lignes qu'il a modifiées dans `DashboardLayout.jsx` et `i18n/index.js`, ses fichiers. Restent trois lignes longues dans `useActionsModules.js` et deux parcours « recherche sans résultat » | coordinateur |

**18 nov., vers 11 h 40** :

| Décision | Par |
|---|---|
| Le site vitrine aura de **courtes vidéos de motion design** pour illustrer les fonctions présentées, faites si possible sur les captures d'écran. Ce sera **plus tard**, quand toutes les captures seront faites ([plan du site](../conception/vitrine/vit-vitrine.md), § 3 bis) | chef |
| La page **« Solutions »**, par type d'établissement, se **prépare maintenant**, sans prix et sans mise en ligne ; son plan court est à faire valider par le chef | chef |
| Le lien **« Ressources »** (centre d'aide, VIT-03) arrive **avec les captures d'écran** ; pas de lien vide d'ici là | chef |
| **Pas de lien « Tarifs »** tant que la vente est gelée | chef |
| *(coordinateur)* UIX-06b (`4da1036b`) : **prête pour la PR**. Les trois lignes que je croyais trop longues étaient comptées en octets : en caractères, le maximum est de 134 | coordinateur |
| *(coordinateur)* Correctif du sondage : `espaceCours.spec.cjs` entre dans la même branche, avec `ouvrirClasse` ajoutée à `outils.cjs` sans rien y modifier. `entreRoles`, `appel` et `appelClasse` font l'objet d'une mission à part, parce qu'ils touchent `donnees.mjs`. Le journal du 15 nov. suffit à prouver l'échec d'avant le correctif | coordinateur |

**Coordinateur, 18 nov., 11 h 40** :

| Décision | Par |
|---|---|
| *(coordinateur)* REL-06 (#200) : bonne sur le fond. REL-03 (#201) : **à corriger**. Le retour arrière affiché par `deployer.sh` passe `--passphrase-file ""`, car `PHRASE` est lue dans une sous-commande. Il faut une commande qui marche telle qu'elle est copiée, et un test de régression | coordinateur |
| *(coordinateur)* Constat sur QJE-04 (#196), qui remonte au chef : la migration s'appelle `0080-jeux-solutions.js`, alors que `main` a déjà `0080-contraintes-declarees.js` et `0081-plages-reprises.js`. Le registre de `suivi.md` réserve **0082** à QJE-04 depuis le 15 nov. La PR est aussi en conflit avec `main` (`App.jsx`, `i18n/index.js`, `suivi.md`), donc sans CI | coordinateur |
| QJE-04 (#196) : la mise à jour est faite par **Alexis et son agent** : renommer la migration en `0082-jeux-solutions.js`, fusionner `main`, obtenir une CI verte, intégration comprise. Puis le coordinateur relit, et le chef valide la migration avant la fusion | chef, 18 nov. 11 h 45 |
| Le code de REL-06 et de REL-03 a été écrit sur Grok 4.7, à la demande du chef dans la session de l'agent de Cursor (rapport de 11 h 28). Cela remplace la décision de 11 h 10. Le défaut trouvé dans REL-03 se corrige sur le modèle le plus fort | chef, 18 nov. |
| *(coordinateur)* Plan du correctif du sondage **validé après coup** : il ne touche que les tests, et la cause est démontrée. #202 est prête. Rappel pour toutes les sessions : « validé » veut dire que le valideur a lu le plan, pas qu'il a répondu à des questions | coordinateur, 18 nov. 11 h 50 |

**Chef, 18 nov., vers 12 h** :

| Décision | Par |
|---|---|
| **`suivi.md` est tenu par le coordinateur seul**, sur sa branche. Les branches de fonction ne le modifient plus : l'état de la fonction va dans la fiche de session, et un numéro de migration se demande au coordinateur. Changé dans `AGENTS.md` (point 10), `README.md`, `organisation.md`, `equipe.md`, les modèles et les skills `fin-de-session`, `relecture-branche` et `coordination`. Raison : chaque fusion mettait toutes les PR ouvertes en conflit sur ce fichier, et leur CI ne tournait plus | chef |
| UIX-09 : la variante 4 du logo n'apparaît **nulle part dans la grille**. Elle reste l'icône du site vitrine ; dans l'application, l'en-tête garde la mosaïque et les tuiles leurs icônes Lucide | chef |
| *(coordinateur)* UIX-09 n'ajoute pas axe-core. Codex peut auditer en local avec la même version, sans l'inscrire au manifeste, et active la vérification dans le parcours après la fusion de #199 | coordinateur |
| *(coordinateur)* REL-03 (`0d63c429`) : correction du retour arrière **bonne**. #200 et #201 sont encore en conflit sur `suivi.md` : elles prennent la version de `main`, d'après la nouvelle règle | coordinateur |

**Coordinateur, 18 nov., 12 h 10** :

| Décision | Par |
|---|---|
| *(coordinateur)* QJE-04 (#196, `66f79883`), relecture : migration renommée `0082-jeux-solutions.js`, conforme au registre et additive (une table `JeuxEtatsDefis` et la colonne `avec_solution`, valeur par défaut `false`). L'accès passe par `jeuAccessible` (404 pour un jeu ou un défi inconnu). L'évaluation est faite par le serveur, et la PR fait passer `Jeux.jsx` de 389 à 362 lignes. **Au chef** : valider la migration, et l'ajout dans `app.js` d'`authenticateToken` avant `csrfProtection` sur `POST /api/jeux/:code/defis/:idDefi/solution`. Avis : acceptable, la protection CSRF s'applique toujours et seul l'ordre des refus change (401 avant 403). Remarque sans blocage : commentaires en anglais dans la migration et `app.js` | coordinateur |
| *(coordinateur)* UIX-09 (`c45f70c4`) : **bonne**. Elle se pousse après la fusion de #199, car les deux branches modifient `package-lock.json` | coordinateur |
| QJE-04 (#196) : **migration 0082 et ordre authentification puis CSRF validés**. Fusion dès que la CI est entièrement verte, intégration MySQL comprise | chef, 18 nov. 12 h 15 |
| *(coordinateur)* Ordre de fusion : **#196, puis #199, puis UIX-09**. #196 et #199 entrent en conflit sur `frontend/src/i18n/index.js` dans les deux ordres. Codex règle le conflit de #199, ce qui évite un aller-retour avec Alexis | coordinateur |
| *(coordinateur)* #196 non fusionnée : sa CI est rouge sur trois tests d'intégration de `simulations.test.js`, ceux qu'Alexis n'avait pas pu lancer. (1) Un jeu inconnu demandé par un enseignant non affecté renvoie 403 au lieu de 404 : c'est la règle « 404 hors de ses classes » qui tranche. (2) Trois échecs simultanés reviennent dans un ordre quelconque, alors que le test attend 1, 2, 3 : le test doit vérifier le total et l'ensemble, pas l'ordre. (3) `echecs: 1` au lieu de 0 : un test précédent a laissé son état. Correction par Alexis, puis CI verte avant la fusion | coordinateur, 18 nov. 12 h 20 |
| *(coordinateur)* Ordre de fusion révisé : **#199, puis #196, puis UIX-09**. #196 doit être repoussée de toute façon. Alexis fusionnera `main`, #199 comprise, en même temps que sa correction | coordinateur, 18 nov. 12 h 22 |
| *(coordinateur)* #196 (`e26cbe8a`) : les trois attentes corrigées par Alexis sont justes. L'étudiant est refusé par son rôle (403), l'enseignant reçoit 404 pour un jeu inconnu, et les échecs simultanés sont comptés sans exiger d'ordre. Reste le parcours `sessionsJeu.spec.cjs` : le catalogue compte maintenant onze boutons « Lancer en classe ». Correction attendue : un nom accessible propre à chaque jeu (« Lancer « <jeu> » en classe »), visé par le parcours | coordinateur, 18 nov. 12 h 30 |
| *(coordinateur)* #197 et #199 se gênent sur `decisions.md`, `UIX-interface.md` et `suivi.md`, dans les deux ordres. #199 passe d'abord, et le coordinateur met #197 à jour lui-même | coordinateur, 18 nov. 12 h 30 |
| *(coordinateur)* #199, première CI : **11 parcours rouges sur 71**. Un vrai défaut d'accessibilité : contraste du bouton de validation du dialogue de Filières en thème sombre. Un bouton « Générer depuis la maquette » désactivé, à expliquer. Le reste tient aux attentes ou aux délais des tests. Renvoyée à Codex. Leçon pour les missions d'équipe : des parcours jamais exécutés avant la PR ne prouvent rien. Le rapport doit dire qu'ils n'ont pas tourné, et la relecture compte la CI comme une étape à part | coordinateur, 18 nov. 12 h 46 |
| *(coordinateur)* Ordre de fusion : la première PR qui passe au vert sur tout passe la première. Pour #196 et #199, en conflit sur `i18n/index.js`, la seconde fusionne `main` après la première | coordinateur, 18 nov. 12 h 46 |
| *(coordinateur)* #200 (REL-06) : entièrement verte, prête. #201 (REL-03) : un SC2016 de ShellCheck à désactiver, avec sa raison, sur une ligne de test. #203 (page Solutions) : relue, prête dès la CI verte. Ordre : #200, #203, #201, puis #199 et #196 à mesure qu'elles passent au vert | coordinateur, 18 nov. 12 h 58 |
| *(coordinateur)* #196 (`98ea71d4`) : **prête**. Sa CI est entièrement verte, et chaque bouton « Lancer en classe » porte le nom de son jeu, par la traduction `sessionsJeu.lancer.titre`. Ordre : **#200 et #196 maintenant**, puis #203, #201 et #199. Codex règle le conflit d'`i18n/index.js` de #199 | coordinateur, 18 nov. 13 h 01 |
| *(coordinateur)* Fusionnées le 18 nov. vers 13 h : #200 (REL-06), #196 (QJE-04, migration 0082 à appliquer au prochain déploiement) et #203 (page Solutions). #196 a été fusionnée pendant les parcours d'un dernier commit d'Alexis, qui ne touchait que la documentation : aucun risque pour le code. Le chantier QJE, ouvert par exception pour QJE-04 seule, est à fermer par le chef | coordinateur, 18 nov. 13 h 11 |
| **Chantier QJE fermé** : sa seule fonction, QJE-04, est fusionnée (#196). Trois chantiers restent ouverts, sans exception (EXP, PLA, MOT). La suite des jeux attend l'ouverture d'un chantier | chef, 18 nov. 13 h 15 |

**Chef, 18 nov., vers 13 h 30** :

| Décision | Par |
|---|---|
| **Toutes les plateformes suivent le style du site vitrine**, avec les mêmes couleurs : application web, mobile, espace des jeux, StudyLib et quiz. Cela étend la décision du 18 nov., qui ne visait d'abord que le site et la grille | chef |
| La **charte commune vient d'abord** (UIX-10) : une source unique de jetons tirée du site, puis une adoption plateforme par plateforme. **Exception hors chantier**, comme UIX-06, sans API ni migration. Plan écrit par Claude (VS Code), validé par le chef ([fiche](missions/uix-10-charte-commune.md)) | chef |
| **Le site vitrine sera mis en ligne**, d'abord sur un sous-domaine (VIT-06). Cela remplace « rien en ligne ». Quatre conditions d'abord : audit de `vitrine/` et montée d'Astro le 27 nov. ; mentions légales et page de confidentialité, sans formulaire ni mesure d'audience ; SVG officiels des logos ; site non indexé tant qu'il est sur le sous-domaine. Plan court par l'agent de Cursor, validé par le chef ([fiche](missions/vit-06-mise-en-ligne.md)) | chef |
| **Modèles** : Grok 4.7 high reste le modèle de l'agent de Cursor pour les tâches courtes et bornées au plan validé. Pour les migrations, la sécurité, le serveur et la charte : le plus fort de Cursor (Claude Fable 5.2, sinon Opus 5.5). Codex : son modèle le plus fort, avec un raisonnement élevé, pour tout | chef |

**Chef, 18 nov., vers 13 h 40** :

| Décision | Par |
|---|---|
| UIX-06c **attend la validation d'UIX-10** (« je valide ton plan ») | chef |
| **Sortie de ClassQuiz maintenant**, par exception hors chantier : QJE-01, puis QJE-03, puis QJE-06. Les quiz de l'école pilote sont transférés dans le Studio et vérifiés avant l'arrêt des conteneurs. Le quiz de la charte commune, c'est le Studio quiz ([fiche](missions/sortie-classquiz.md)). Rappel de la décision du 20 oct. | chef |
| **StudyLib : étude d'abord.** Garder Laravel ou reconstruire dans la pile de Planner, à trancher avant tout travail sur BIB-02 ([fiche](missions/etude-studylib.md)) | chef |
| *(coordinateur)* #201 (REL-03) fusionnée. #199 (UIX-06b, `24d96588`) : les parcours sont corrigés, dont un vrai défaut (le dialogue d'Enseignements plantait) et le contraste du bouton en thème sombre. À repousser pour que la CI tranche | coordinateur, 18 nov. 13 h 40 |
| Les modèles Claude ne sont pas dans le forfait Cursor du chef. **L'agent de Cursor reste sur Grok 4.7 high** pour les tâches bornées. **Codex prend les tâches qui demandent le modèle le plus fort** : VIT-06, QJE-03 et QJE-06, après UIX-09. L'agent de Cursor fait QJE-01 tout de suite. Les sessions Claude Code (VS Code), qui ne dépendent pas de Cursor, gardent UIX-10 et l'étude StudyLib | chef, 18 nov. 13 h 45 |
| Plan d'UIX-10 (#206) **validé**, questions 9 et 10 comprises. **UIX-10g (restyler ClassQuiz) est retirée** : ClassQuiz disparaît avec QJE-06, et le Studio quiz prend la charte avec UIX-10b et UIX-10e. UIX-10f (StudyLib) attend l'étude. **UIX-10a** se fait maintenant, sur une branche empilée sur #206 ; son plan court est validé par le coordinateur | chef, 18 nov. 13 h 55 |
