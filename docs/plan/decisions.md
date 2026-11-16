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
| 15 nov. | **Plan EXP-02a validé** (branchement Traefik, sans lancer Planner), avec les trois remarques du coordinateur (`docs/plan/missions/exp-02a.md`) | — |
| 15 nov. | **PLA-06 : pour le moment, seul le serveur sert de machine** ; le PC Ubuntu n'est pas employé (P-22, P-23 et P-25 sans objet). Le plan de PLA-06 s'amende pour mesurer sur le serveur partagé avec n8n, puis se refait valider par le chef ; seul le chef lance les commandes sur le serveur | la mesure en local du 10 novembre |
| 15 nov. | **Noms publics de l'installation gardés** (question ouverte « nom de domaine », Q-11) : ceux déjà écrits dans `deploy/vps/nginx-hestim.conf` et `deploy/vps/generer-env.sh`. Le pointage DNS est EXP-02b. Le branchement du nouveau serveur est Traefik (labels, réseau externe), sans port public sur Caddy. | — |
| 15 nov. | **EP-13 « Aucun envoi caché »**, en vigueur dès l'étape 1 : une liste publique des envois sortants de Planner (destinataire, données envoyées, raison) est tenue à jour, et toute PR qui ajoute un envoi sortant la met à jour. La liste est la fonction QUA-09. Source : [09-failles-erp-scolaires.md](../etude-marche/09-failles-erp-scolaires.md) (OpenEduCat envoie chaque jour des données de l'école à son éditeur, par une tâche masquée) | — |
| 15 nov. | **Faille supposée chez un tiers** : la confirmer d'abord par un essai **en local**, sans donnée réelle, dans une tâche `etude/` à part ; si elle se confirme, le chef la signale à l'éditeur par son canal privé ; **rien de public avant sa réponse**. Le détail n'est pas écrit dans le dépôt, qui est public. On ne sonde jamais une installation de tiers | — |
| 15 nov. | **PLA-04** couvre aussi le cas « un élève, ou un parent, demande la fiche d'un autre élève par l'API, une liste ou un export » (défaut de Frappe Education corrigé en octobre 2026) | — |
| 15 nov. | **QUA-08** : un `SECURITY.md` (comment signaler une faille, délai de réponse) et le signalement privé de GitHub ouvert sur le dépôt public ; le chef active le réglage. Délai promis (chef, 15 nov.) : accusé de réception sous 7 jours, correctif ou avis publié sous 90 jours au plus | — |
| 15 nov. | **MOB** : avant toute publication dans un magasin d'applications, les fiches « confidentialité » décrivent ce que l'application collecte vraiment (défaut de PERIS SCHOOL) | — |
| 15 nov. | **ETA-02** : l'élève est identifié auprès de l'État par le **matricule de l'État** (code Massar au Maroc) ; Planner n'en crée pas un autre pour l'échange (défaut de Studirium). VSC-01 prévoit où il est rangé | — |
| 16 nov. | **Canal de signalement des failles** : le **site du SaaS** recueille les signalements, par une catégorie « faille de sécurité » du formulaire de contact de **VIT-02**, traitée en privé. Tant que le site n'existe pas, `SECURITY.md` (QUA-08) renvoie au signalement privé de GitHub, qui **reste ouvert** ensuite à côté du site. QUA-08 se fait hors chantier (accord du chef du 16 nov.). Langue : français, résumé en anglais ; versions couvertes : `main` et le dernier paquet ; essais seulement sur une installation à soi | le canal « GitHub seul » de la ligne QUA-08 du 15 nov. |
| 15 nov. | L'étude [09-failles-erp-scolaires.md](../etude-marche/09-failles-erp-scolaires.md) et le rapport du chef « Failles des ERP scolaires » (`docs/etude-marche/reports/`) restent **séparés, avec un renvoi croisé** ; le 09 ne reprend que les faits relus à la source | — |

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
