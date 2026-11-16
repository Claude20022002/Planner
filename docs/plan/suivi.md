# Suivi des fonctions

**Le seul tableau des fonctions et de leur état.** Toute personne et tout agent le met à jour **à la fin de chaque session, obligatoirement** ([organisation.md](organisation.md), § 7), dans la branche de sa tâche, avec sa fiche de session dans `docs/sessions/`.

Une ligne par fonction. L'état passe à « en cours » (avec la branche) au premier commit, à « PR ouverte » (avec le numéro) quand la PR existe, puis à « fait » à la fusion. Le détail, les dépendances et les critères de « terminé » sont dans le fichier du module (lien sur l'identifiant). L'état réel = ce fichier sur `main`, plus les PR ouvertes (`gh pr list`).

États : à faire · en cours · PR ouverte · fait · reporté (plus tard, sans date) · gelé (attend la reprise de la vente) · conditionnel (attend une décision).

## Chantiers

Au plus **3 chantiers ouverts** en même temps, bloqués compris. On ne prend une fonction que dans un chantier ouvert. Un chantier ouvert se termine avant d'en ouvrir un autre à sa place ([organisation.md](organisation.md), § 3).

### Ouverts (3 sur 3)

| Module | Ouvert le | Fonctions du chantier, dans l'ordre | Reste | État |
|---|---|---|---|---|
| [EXP](modules/EXP-exploitation.md) | avant le 9 nov. (EXP-01 en cours) | EXP-01, EXP-02, EXP-03, EXP-04, EXP-05 | 5 | ouvert ; EXP-02a écrite le 15 nov., en attente de relecture |
| [PLA](modules/PLA-plateforme.md) | 9 nov. 2026 | PLA-06, PLA-03, PLA-05, PLA-01, PLA-02, PLA-04, PLA-07 | 7 | ouvert ; ordre validé le 10 nov. PLA-01 attend EXP-02 (QUA-03 levée le 13 nov. : pile confirmée), PLA-07 attend EXP-04 |
| [MOT](modules/MOT-moteur.md) | 15 nov. 2026 (décidé le 13 nov., à la place de QUA) | MOT-13, MOT-12, MOT-02, MOT-03, MOT-04 | 5 | ouvert ; MOT-13 en tête (décision du 15 nov.), son étape 13b après MOT-12 |

### Fermés

| Module | Ouvert le | Fermé le | Fonctions |
|---|---|---|---|
| [QUA](modules/QUA-qualite-docs.md) | 10 nov. 2026 | 15 nov. 2026 (fusion de #171) | QUA-03 |

### Travaux en cours hors chantier, d'avant la règle

| Quoi | Branche ou PR | À faire |
|---|---|---|
| Correctif : le dimanche s'affiche dans l'emploi du temps (CI de `main` rouge le dimanche) | #162 | **fusionnée le 10 nov.** |
| Essai du contexte d'école (base de PLA-01) | #142 | **fusionnée le 10 nov.** |
| MOT-01, partie serveur (MP-1) | #156 | **fusionnée le 10 nov.** |
| Plan par modules | #161 | **fusionnée le 10 nov.** |
| Organisation de l'équipe, module MKT | #163 | **fusionnée le 10 nov.** |
| Inventaire des outils des établissements, modules à créer (hors chantier, accord du chef le 11 nov.) | #167 | **fusionnée** |
| Douze modules de l'inventaire ajoutés au plan (hors chantier, accord du chef le 13 nov.) | #170 | **fusionnée** |
| Étude : comparatif Planner et Odoo + OpenEduCat sur la gestion d'école (hors chantier, demande du chef le 15 nov.) | #174 | **fusionnée le 15 nov.** |
| Étude : failles de cinq ERP scolaires (OpenEduCat, Frappe Education, Fedena, PERIS SCHOOL, Studirium ; Madata en encadré), hors chantier, demande du chef le 15 nov. | #186 | PR ouverte ; questions 5 à 8 tranchées le 15 nov. : EP-13, PLA-04, QUA-08, QUA-09, MOB, ETA-02 inscrites |
| Étude : essai en local de Frappe Education (décision du chef du 15 nov.) | `etude/frappe-essai-local` | essai fait en local le 16 nov. ; suite hors du dépôt, à traiter par le chef |
| Coordination des agents : rôle de coordinateur, skills, fiches de mission (hors chantier, demande du chef le 15 nov.) | #175 | PR ouverte ; tableau « Missions en cours » confirmé par le chef le 15 nov. |
| Correctif : sauvegarde avant déploiement qui échoue sans bruit (REL-01) | #177 | **fusionnée le 15 nov.** |

Exception UIX autorisée par le chef le 15 novembre : **UIX-01a**, accueil des applications et navigation web, `feat/uix-01a-navigation`, PR #184 fusionnée le 15 nov. (`16b542a1`) ; six contrôles verts, 43 parcours réussis. Aucun quatrième chantier ouvert.

## Missions en cours

Qui travaille sur quoi, module par module. Tenu par le **coordinateur** ([organisation.md](organisation.md), § 10) : une ligne par branche ouverte, retirée à la fusion. Le détail d'une mission est dans sa fiche, `docs/plan/missions/<identifiant>.md`. Les lignes sans fiche sont des travaux commencés avant le 15 novembre.

| Module | Fonction | Agent | Branche ou PR | État | Dernière relecture | Fiche |
|---|---|---|---|---|---|---|
| PLA | PLA-03b schéma de départ | Claude Code (session de PLA-03a, mission envoyée par message) | `feat/pla-03b-schema-depart` (créée) | plan validé (délégation), non commité ; **l'agent attend le « validé » du chef dans sa session** (VS Code, Fable 5.2) | 15 nov. | [pla-03b](missions/pla-03b.md) |
| PLA | PLA-06 mesure de D-01 | Codex | #164 (brouillon) | banc adapté, sonde A-2 codée (`1cbdfaa`), 24 tests verts ; relu et poussé ; ensuite recette et séries sur le serveur, par le chef | 15 nov. 14 h 05 : prêt | [pla-06](missions/pla-06.md) |
| MOT | MOT-02 mesure du solveur sur un jeu scolaire | Codex | `etude/mot-02-mesure-solveur` (non poussée) | banc et grand jeu de 20 000 mesurés (6 passages, avant et après #181 : aucun planning complet en 600 s, débit médian -13 % en 1.35, plages qui se chevauchent) ; reste le collège, débloqué par #182 | 15 nov. 20 h 50 | [mot-02](missions/mot-02.md) |
| MOT | MOT-03 validation avant le calcul | agent de Cursor | #183 | plan validé par le chef ; codée, CI verte ; relue : **à corriger** (le refus doit nommer sa cible, EP-4) | 15 nov. 20 h 50 | [mot-03](missions/mot-03.md) |

| UIX | UIX-01a navigation par applications (exception hors chantier accordée par le chef) | Codex | #184 | codée, CI verte parcours compris ; relue : **prête** ; destination après connexion changée (lanceur) : choix de produit à confirmer | 15 nov. 20 h 50 : prête | — |

Hors chantier, PR ouvertes : #176 (plan d'essai d'OpenEduCat, Claude Code, 15 nov. ; faite dans le dépôt principal et non dans un dossier de travail à part), #165 (relecture de QJE-04), #166 (diagramme d'architecture), #168 (kit vidéo MKT-05 et MKT-09), #169 (étude du modèle économique), #53 (vidéo promo, octobre).

## Numéros de migration réservés

Réserver ici **avant** d'écrire une migration. Le moteur de migrations (Umzug) applique toute migration absente de `SequelizeMeta`, même hors d'ordre : un trou dans la numérotation est sans danger.

| Numéro | Fonction | État |
|---|---|---|
| 0059 | COU-01 sondages (EC-9) | fusionnée |
| 0060 | UIX-01 socle neutre | réservée |
| 0061 | MOT-01 valeurs du moteur (MP-1) | fusionnée (#156, 10 nov.) |
| 0062 à 0079 | VSC-01 et suivantes : tables du scolaire | réservées |
| 0080 | MOT-13 contraintes déclarées (`ContrainteDeclaree`) | réservée |
| 0081 | MOT-13b reprise de la pause du vendredi et du samedi après-midi en contraintes déclarées | écrite (`feat/mot-13b-solveur`) |
| 0082 et plus | libres | — |

## Fonctions

| ID | Fonction | Étape | Taille | État | Branche ou PR |
|---|---|---|---|---|---|
| [PLA-01](modules/PLA-plateforme.md) | Contexte d'école en production | 2 | L | à faire (essai fusionné le 10 nov.) | #142 (essai) |
| [PLA-02](modules/PLA-plateforme.md) | Fermer les canaux de l'étape 2 | 2 | L | à faire |  |
| [PLA-03](modules/PLA-plateforme.md) | Base neuve sans données d'école | 2 | M | en cours : PLA-03a (données) **fusionnée le 15 nov.** (#173) ; PLA-03b (schéma de départ) conçue, plan à valider | #173 |
| [PLA-04](modules/PLA-plateforme.md) | Tests d'isolation de chaque route dans la CI, côté serveur et parcours | 2 | M + S | à faire |  |
| [PLA-05](modules/PLA-plateforme.md) | Registre des écoles et création d'une école par une commande (base, migrations,… | 2 | L | à faire |  |
| [PLA-06](modules/PLA-plateforme.md) | Mesure de D-01 | 1 | M | à faire |  |
| [PLA-07](modules/PLA-plateforme.md) | Sauvegarde et restauration par école (canal I-11) | 2 | M | à faire |  |
| [PLA-08](modules/PLA-plateforme.md) | Console de l'équipe Planner (créer, suspendre, voir l'état des écoles) | 5, ou juste avant la 1re école extérieure | M | reporté |  |
| [PLA-09](modules/PLA-plateforme.md) | Migrations par vagues, hors du démarrage du serveur | 5, ou juste avant la 1re école extérieure | M | reporté |  |
| [PLA-10](modules/PLA-plateforme.md) | Choisir son école à la connexion | 5, ou juste avant la 1re école extérieure | M | reporté |  |
| [PLA-11](modules/PLA-plateforme.md) | Comptes communs | 5 | L | reporté |  |
| [PLA-12](modules/PLA-plateforme.md) | Export complet d'une école | 5 | M | à faire |  |
| [PLA-13](modules/PLA-plateforme.md) | Une école hors du Maroc configurée sans changer le code (fuseau, langue, devise) | 5 | M (+ L, conditionnel) | reporté |  |
| [EXP-01](modules/EXP-exploitation.md) | Nouveau serveur | 0 | S | fait (#172, 15 nov.) | #172 |
| [EXP-02](modules/EXP-exploitation.md) | Première installation conteneurisée à côté de n8n. Comprend | 1 | L | en cours : EXP-02a écrite (config locale, sans lancer) ; EXP-02b à faire | `feat/exp-02a-traefik` |
| [EXP-03](modules/EXP-exploitation.md) | ME-0b adapté au nouveau serveur | 1 | M | code fait (#145), adaptation à faire | #145 |
| [EXP-04](modules/EXP-exploitation.md) | Sauvegardes sur le nouveau serveur | 1 | M | à faire |  |
| [EXP-05](modules/EXP-exploitation.md) | Supervision en service | 1 | M | code fait, mise en service à faire | ME-21 |
| [EXP-06](modules/EXP-exploitation.md) | Premier administrateur d'une vraie école, sans le jeu de démonstration d'HESTIM… | 2 | S | à faire |  |
| [EXP-07](modules/EXP-exploitation.md) | Noms neutres | 2 | M | à faire |  |
| [EXP-08](modules/EXP-exploitation.md) | Test d'intrusion et de charge, avant que toute école extérieure utilise l'installation… | 4 | M | à faire |  |
| [EXP-09](modules/EXP-exploitation.md) | Mises à jour de StudyLib et ClassQuiz par la CI comme le reste (aujourd'hui par paquets) | libre | M | à faire |  |
| [MOT-01](modules/MOT-moteur.md) | Valeurs du moteur datées et résolues (profil, école, niveau) | 1 | M | fait (serveur, #156, 10 nov.) ; écrans avec ADM-02 | #156 |
| [MOT-02](modules/MOT-moteur.md) | Mesurer le solveur sur un jeu scolaire (collège de 600 élèves), puis sur 20 000… | 1 | M | en cours : banc et grand jeu mesurés ; collège à faire | `etude/mot-02-mesure-solveur` |
| [MOT-03](modules/MOT-moteur.md) | Validation avant le calcul | 3 | M | PR ouverte | #183 |
| [MOT-04](modules/MOT-moteur.md) | Modèle neutre et évaluateur indépendant | 3 | L + M | à faire |  |
| [MOT-05](modules/MOT-moteur.md) | Profils et nomenclatures lus dans la base (cycle, niveau, classe, demi-groupe), à la… | 2 puis 3 | M + L | à faire |  |
| [MOT-06](modules/MOT-moteur.md) | Collège | 3 | XL | à faire |  |
| [MOT-07](modules/MOT-moteur.md) | Lycée | 3 | L | à faire |  |
| [MOT-08](modules/MOT-moteur.md) | File simple des calculs | 2 | M | à faire |  |
| [MOT-09](modules/MOT-moteur.md) | Remplaçant proposé automatiquement en cas d'absence d'un enseignant | 4 | M | à faire |  |
| [MOT-10](modules/MOT-moteur.md) | Grande échelle | 5 | L | à faire |  |
| [MOT-11](modules/MOT-moteur.md) | Règles nouvelles, famille par famille (examens dans le calcul F-8, ressources F-7,… | 5 | M par famille | à faire |  |
| [MOT-12](modules/MOT-moteur.md) | Montée du solveur : Spring Boot 3.3.5 vers 4.1, Timefold 1.15 vers 1.35 (cœur, sans le starter), Java 21 inchangé | 1 | M | fait (15 nov.) | #181 |
| [MOT-13](modules/MOT-moteur.md) | Contraintes déclarées par l'école (six modèles, liste « Déjà pris en compte », contrôle de place), en trois étapes 13a, 13b, 13c | 3 | M + L + M | en cours : 13a fusionnée (#178, 15 nov.) ; 13b : codée le 15 nov. ([complément](../conception/moteur-planification/mot-13b-solveur.md)), PR ouverte (#182), CI verte parcours compris ; réponses 22 et 23 données le 15 nov. ; requête du § 6 levée (pas de production réelle, grille de démonstration vérifiée ; à relancer sur toute base d'école réelle restaurée) ; ensuite le refus de la coupure fine (réponse 23), puis 13c avec ADM-02 | #178 ; #182 |
| [EDT-01](modules/EDT-emploi-du-temps.md) | Changement structurel refusé une fois les séances générées (groupes, volumes), avec un… | 3 | S | à faire |  |
| [EDT-02](modules/EDT-emploi-du-temps.md) | Horaires saisonniers (ramadan, hiver, été) appliqués sans tout regénérer | libre | M | à faire |  |
| [EDT-03](modules/EDT-emploi-du-temps.md) | Écran d'explication des conflits et des refus | 3 | M | à faire |  |
| [EDT-04](modules/EDT-emploi-du-temps.md) | Publication, PDF et courriels selon l'école | libre | M | à faire |  |
| [EDT-05](modules/EDT-emploi-du-temps.md) | Paramètres datés complets | 5 | L | reporté |  |
| [ADM-01](modules/ADM-administration.md) | Habilitations à portée | 5 | M | à faire |  |
| [ADM-02](modules/ADM-administration.md) | Panneau de configuration de l'école | 3 | L | à faire |  |
| [ADM-03](modules/ADM-administration.md) | Import | 3 | L | à faire |  |
| [ADM-04](modules/ADM-administration.md) | Assistant de démarrage avec un modèle par type d'école (EP-1) | 3 | L | à faire |  |
| [ADM-05](modules/ADM-administration.md) | Rôle parent | 4 | M | à faire |  |
| [ADM-06](modules/ADM-administration.md) | Clôture d'une année (lecture seule) et préparation de la suivante | 5 | L + M | à faire |  |
| [ADM-07](modules/ADM-administration.md) | Enseignants partagés entre écoles | 5 | M | à faire |  |
| [ADM-08](modules/ADM-administration.md) | Annuaire de l'école | — | M | reporté |  |
| [ADM-09](modules/ADM-administration.md) | Échanges OneRoster | — | M | reporté |  |
| [VSC-01](modules/VSC-vie-scolaire.md) | Modèle de données du scolaire (conception seule, avec diagrammes) | 1 | L | plan du document à valider |  |
| [VSC-02](modules/VSC-vie-scolaire.md) | Élèves et familles | 4 | L | à faire |  |
| [VSC-03](modules/VSC-vie-scolaire.md) | Absences prévenues aux parents, justificatifs, saisie déléguée (EP-6) | 4 | M | à faire |  |
| [VSC-04](modules/VSC-vie-scolaire.md) | Notes et bulletins | 4 | XL | à faire |  |
| [VSC-06](modules/VSC-vie-scolaire.md) | Formation professionnelle | 5 | M | à faire |  |
| [COU-01](modules/COU-espace-de-cours.md) | Sondage de l'enseignant à sa classe | libre | S | fait (#148) | #148 |
| [COU-02](modules/COU-espace-de-cours.md) | Devoirs avec rendu de fichier, après une revue de sécurité (taille, type, antivirus,… | 4 | L | à faire |  |
| [COU-03](modules/COU-espace-de-cours.md) | Commentaires sur un support ou un devoir | 4 | M | à faire |  |
| [COU-04](modules/COU-espace-de-cours.md) | Questions partagées de la classe | 4 | M | à faire |  |
| [COU-05](modules/COU-espace-de-cours.md) | « Vu » | 4 | M | à faire |  |
| [COU-06](modules/COU-espace-de-cours.md) | Export des notes d'un devoir | libre | S | à faire |  |
| [COU-08](modules/COU-espace-de-cours.md) | Messagerie, si les règles de modération sont tranchées (Q-17) | 5 | L | conditionnel |  |
| [COU-09](modules/COU-espace-de-cours.md) | LTI | — | L | reporté |  |
| [BIB-01](modules/BIB-bibliotheque.md) | Identifiants stables (`uid`) des entités partagées, et envois par boîte d'envoi (D-14,… | 2 | M | à faire |  |
| [BIB-02](modules/BIB-bibliotheque.md) | StudyLib par école | 5 | M | à faire |  |
| [BIB-03](modules/BIB-bibliotheque.md) | Médias du Studio quiz (images, sons, vidéos) hors de la base, dans le stockage de fichiers | libre | M | à faire |  |
| [BIB-04](modules/BIB-bibliotheque.md) | Quiz généré par l'IA à partir d'un document de la Bibliothèque | libre | M | à faire |  |
| [QJE-01](modules/QJE-quiz-jeux-ia.md) | L'entrée « Quiz » du sélecteur d'espaces ouvre le Studio, plus ClassQuiz… | libre | S | à faire |  |
| [QJE-02](modules/QJE-quiz-jeux-ia.md) | Import des formats GIFT et Moodle XML dans le Studio | libre | M | à faire |  |
| [QJE-03](modules/QJE-quiz-jeux-ia.md) | Joueur natif dans l'application, sans passer par le site | libre | M | à faire |  |
| [QJE-04](modules/QJE-quiz-jeux-ia.md) | Fusion de `jeux-pedagogique` et ses quatre corrections | libre | M | à faire |  |
| [QJE-05](modules/QJE-quiz-jeux-ia.md) | Service des jeux à part, avec des gabarits | libre | L + M + M | à faire |  |
| [QJE-06](modules/QJE-quiz-jeux-ia.md) | Sortie complète de ClassQuiz | libre | M | à faire |  |
| [QJE-07](modules/QJE-quiz-jeux-ia.md) | Fournisseur d'IA en production | libre | M | à faire |  |
| [QJE-08](modules/QJE-quiz-jeux-ia.md) | Créateurs de jeux et leur rémunération | — | — | gelé |  |
| [QJE-09](modules/QJE-quiz-jeux-ia.md) | Défis Linux dans un quiz | — | M | reporté |  |
| [MOB-01](modules/MOB-application.md) | Essai sur un vrai téléphone (Android d'entrée de gamme), noté dans la recette | libre | S | à faire |  |
| [MOB-02](modules/MOB-application.md) | Rôle enseignant | libre | L | à faire |  |
| [MOB-03](modules/MOB-application.md) | Thème neutre et thème de l'école | 2 | M | à faire |  |
| [MOB-04](modules/MOB-application.md) | Trouver son école | 5 | M | reporté |  |
| [MOB-05](modules/MOB-application.md) | Espace parents | 4 | L | à faire |  |
| [MOB-06](modules/MOB-application.md) | Emploi du temps lisible hors ligne (EP-3) | 4 | M | à faire |  |
| [MOB-07](modules/MOB-application.md) | Adresse de l'API qui n'est plus figée à la construction (une application pour toutes… | libre | M | à faire |  |
| [UIX-01](modules/UIX-interface.md) | Socle neutre | 2 | L | conçu, à coder |  |
| [UIX-01a](modules/UIX-interface.md) | Accueil des applications et navigation web, exception autorisée par le chef le 15 nov. | libre | M | fait : #184 fusionnée, CI verte, 43 parcours | #184 |
| [UIX-02](modules/UIX-interface.md) | Vocabulaire des écrans selon le profil de l'école (classe et non groupe, matière et… | 3 | M | à faire |  |
| [UIX-03](modules/UIX-interface.md) | Accessibilité AA | libre | M | en partie |  |
| [UIX-04](modules/UIX-interface.md) | Arabe complet | 4 | XL | à faire |  |
| [UIX-05](modules/UIX-interface.md) | Ton des messages du serveur | libre | M | à faire |  |
| [UIX-06](modules/UIX-interface.md) | Style unifié entre les pages anciennes et récentes | libre | M | en cours : pilote UIX-06a codé localement, relecture et CI attendues | #185 |
| [UIX-06a](modules/UIX-interface.md) | Pilote web : marque mosaïque, connexion/navigation et Personnes | libre | — | PR ouverte : CI parcours rouge, correction du test de reprise réseau committée localement | #185 · feat/uix-06a-interface |
| [VIT-01](modules/VIT-site-vitrine.md) | Conception | libre | M | à faire |  |
| [VIT-02](modules/VIT-site-vitrine.md) | Une page et un formulaire de contact | libre | M | à faire |  |
| [VIT-03](modules/VIT-site-vitrine.md) | Centre d'aide | libre | M | à faire |  |
| [VIT-04](modules/VIT-site-vitrine.md) | Page d'état du service et journal des nouveautés de chaque version | libre | S | à faire |  |
| [VIT-05](modules/VIT-site-vitrine.md) | Vitrine complète | quand la vente reprend | L | gelé |  |
| [VEN-01](modules/VEN-vente-modules.md) | Registre des modules | 2 | L | à faire |  |
| [VEN-02](modules/VEN-vente-modules.md) | Cinq entretiens de terrain avec des directeurs d'écoles privées, séparés de toute… | 3 | S par entretien | à faire |  |
| [VEN-03](modules/VEN-vente-modules.md) | Abonnements et factures | — | L | gelé |  |
| [VEN-04](modules/VEN-vente-modules.md) | Essai gratuit avec filigrane, effacé après 60 jours | — | M | gelé |  |
| [VEN-05](modules/VEN-vente-modules.md) | Contrats (sous-traitance, conditions générales) | — | M | gelé |  |
| [VEN-06](modules/VEN-vente-modules.md) | Installation d'une école pilote | — | L | gelé |  |
| [VEN-07](modules/VEN-vente-modules.md) | Démonstration aux directeurs | — | M | gelé |  |
| [VEN-08](modules/VEN-vente-modules.md) | Offre d'IA payante (les plafonds techniques restent, dans QJE-07) | — | M | gelé |  |
| [VEN-09](modules/VEN-vente-modules.md) | Vidéos par lien dans le Studio quiz | — | M | gelé |  |
| [FIN-01](modules/FIN-finance-ecole.md) | Frais, échéanciers, caisse, reçus bilingues numérotés sans trou | 4 | XL | à faire |  |
| [FIN-02](modules/FIN-finance-ecole.md) | Relances, impayés, export comptable (EP-5) | 4 | L | à faire |  |
| [COM-01](modules/COM-communication.md) | Service commun d'envoi : application, push, courriel, SMS ; plages de silence, envoi différé, urgence, résumé (EP-7) | 4 | L | à faire |  |
| [COM-02](modules/COM-communication.md) | Compte famille pour plusieurs enfants, canal préféré, accusé de lecture | 4 | M | à faire |  |
| [COM-03](modules/COM-communication.md) | WhatsApp et crédits de messages prépayés, alerte avant épuisement | 4 | M | à faire |  |
| [ETA-01](modules/ETA-echanges-etat.md) | Cadre des connecteurs vers les systèmes d'État (contrôle avant envoi, envoi qu'on peut refaire) | 4 | L | à faire |  |
| [ETA-02](modules/ETA-echanges-etat.md) | Massar (ancienne VSC-05) | 4 | M | à faire |  |
| [ETA-03](modules/ETA-echanges-etat.md) | Un connecteur par autre pays visé | 5 | M par pays | reporté |  |
| [PAI-01](modules/PAI-paiements.md) | Rapprochement des paiements avec les reçus, référence unique par élève, alerte de paiement non imputé | 4 | L | à faire |  |
| [PAI-02](modules/PAI-paiements.md) | Paiement en ligne par carte et CMI, commission affichée sur le reçu | 4 | M | à faire |  |
| [PAI-03](modules/PAI-paiements.md) | Argent mobile par des agrégateurs, plusieurs devises | 5 | L | reporté |  |
| [RHP-01](modules/RHP-personnel-paie.md) | Relevé mensuel des heures des vacataires, à partir des séances visées (ancienne FIN-03) | libre | M | à faire |  |
| [RHP-02](modules/RHP-personnel-paie.md) | Dossier de l'intervenant : contrat, autorisation de cumul, plafond d'heures, déclaration à l'AREF | 5 | M | à faire |  |
| [RHP-03](modules/RHP-personnel-paie.md) | Chaîne « prévu, fait, visé, payé », état signé, double validation des comptes bancaires, export vers la paie | 5 | L | à faire |  |
| [FOR-01](modules/FOR-formation-continue.md) | Sessions et cohortes, conventions, convocations | 5 | L | à faire |  |
| [FOR-02](modules/FOR-formation-continue.md) | Émargement signé par demi-journée, attestations | 5 | M | à faire |  |
| [FOR-03](modules/FOR-formation-continue.md) | Dossiers des financeurs (CSF, FDFP, 3FPT, OPCO, CPF), facturation à plusieurs payeurs | 5 | L | à faire |  |
| [FOR-04](modules/FOR-formation-continue.md) | Preuves qualité rangées par indicateur | 5 | M | à faire |  |
| [DOC-01](modules/DOC-documents-verifiables.md) | Certificats, attestations et relevés avec code de vérification | 5 | M | à faire |  |
| [DOC-02](modules/DOC-documents-verifiables.md) | Diplômes vérifiables, page de vérification, archivage, révocation | 5 | M | à faire |  |
| [INS-01](modules/INS-admissions.md) | Candidature en ligne, pièces, suivi des candidats, liste d'attente | 5 | L | à faire |  |
| [INS-02](modules/INS-admissions.md) | Acompte, contrat annuel signé, réinscription | 5 | M | à faire |  |
| [INS-03](modules/INS-admissions.md) | État d'accréditation de chaque filière | 5 | S | à faire |  |
| [PIL-01](modules/PIL-pilotage.md) | Trésorerie : encaissé, attendu, en retard, prévision | 5 | M | reporté |  |
| [PIL-02](modules/PIL-pilotage.md) | Présence des enseignants, avancement des notes, somme due aux vacataires | 5 | M | reporté |  |
| [GRP-01](modules/GRP-groupes-reseaux.md) | Vue consolidée sur plusieurs écoles | 5 | L | reporté |  |
| [GRP-02](modules/GRP-groupes-reseaux.md) | Paramètres communs avec dérogations, marque du réseau | 5 | M | reporté |  |
| [STA-01](modules/STA-stages-alternance.md) | Offres de stage (espace Carrière) (ancienne COU-07) | libre | M | à décider |  |
| [STA-02](modules/STA-stages-alternance.md) | Conventions de stage, tuteur, présence en entreprise, apprentissage | 5 | M | reporté |  |
| [SER-01](modules/SER-services-annexes.md) | Cantine, transport et internat liés au compte famille, sans refus d'accès automatique | 5 | L | reporté |  |
| [STK-01](modules/STK-stocks-achats.md) | Inventaire, bons de commande validés, lien avec la vente | 5 | M | reporté |  |
| [MKT-01](modules/MKT-marketing.md) | Sauvegarder l'agence (premier commit, dépôt privé, règles de l'équipe) | libre | S | à faire |  |
| [MKT-02](modules/MKT-marketing.md) | Contexte produit et personas à la cible du 7 novembre | libre | M | à faire |  |
| [MKT-03](modules/MKT-marketing.md) | Argumentaire par cible, tiré des exigences produit | libre | M | à faire |  |
| [MKT-04](modules/MKT-marketing.md) | Textes du site vitrine et du formulaire de contact | libre | M | à faire |  |
| [MKT-05](modules/MKT-marketing.md) | Vidéo de démonstration sur une école fictive | libre | M | à faire |  |
| [MKT-06](modules/MKT-marketing.md) | Charte visuelle et gabarits de visuels | libre | M | à faire |  |
| [MKT-07](modules/MKT-marketing.md) | Plan de mesure à coût nul | libre | S | à faire |  |
| [MKT-08](modules/MKT-marketing.md) | Calendrier éditorial et publications | quand la vente reprend | M | gelé |  |
| [MKT-09](modules/MKT-marketing.md) | Supports commerciaux pour les directeurs | quand la vente reprend | M | gelé |  |
| [MKT-10](modules/MKT-marketing.md) | Campagne de lancement auprès des écoles | quand la vente reprend | L | gelé |  |
| [QUA-01](modules/QUA-qualite-docs.md) | `README.md` et `PRODUCT.md` à jour | libre | M | à faire |  |
| [QUA-02](modules/QUA-qualite-docs.md) | Découper les contrôleurs trop longs, sans changer leur comportement, chacun couvert… | libre | M par contrôleur | à faire |  |
| [QUA-03](modules/QUA-qualite-docs.md) | Clore l'étude de la pile | 1 | S | fait (#171, 15 nov.) | #171 |
| [QUA-04](modules/QUA-qualite-docs.md) | Reste des dates | libre | S | à faire |  |
| [QUA-05](modules/QUA-qualite-docs.md) | Supprimer les branches et les dossiers de travail morts, après vérification de leur… | libre | S | à faire |  |
| [QUA-06](modules/QUA-qualite-docs.md) | `docs/users.xlsx` | 0 | S | fait (personnes fictives, rien à réécrire) |  |
| [QUA-07](modules/QUA-qualite-docs.md) | Protéger `main` | 0 | S | fait : les 6 contrôles de la CI sont exigés (contournable seulement par `gh pr merge --admin`) |  |
| [QUA-08](modules/QUA-qualite-docs.md) | `SECURITY.md` et signalement privé des failles | libre | S | à faire |  |
| [QUA-09](modules/QUA-qualite-docs.md) | Liste publique des envois sortants (EP-13) | libre | S | à faire |  |

## Conception UIX-06a proposée le 15 novembre

Demande directe du chef : application dans l'esprit d'OpenEduCat, avec le dernier logo Planner. Branche `feat/uix-06a-interface`, dossier `..\travaux-planner\uix-06a-interface`. [Conception](../conception/interface/uix-06a-interface.md) rédigée, **à valider** : périmètre pilote Personnes, direction visuelle, découpage de la dépendance UIX-01 et nouvelle exception hors chantier. Aucun code produit écrit et aucun quatrième chantier ouvert.

Reprise du 15 novembre : publication vérifiée, PR **#185 ouverte en brouillon**, tête `5ce34dd9` au contrôle ; aucun commentaire ni validation. Questions 1 à 4 toujours en attente du chef ; question 4 précisée : encre ardoise pour le thème neutre, bleu nuit réservé à la marque. Aucun code produit. Voir la [fiche de reprise](../sessions/2026-11-15-feat-uix-06a-interface-2.md).

Validation du chef le 15 novembre : plan et quatre propositions UIX-06a approuvés (« Valider »). Pilote en cours sur feat/uix-06a-interface ; exception limitée sans quatrième chantier. Validation commitée avant code.


## Livraison locale UIX-06a du 15 novembre

Plan et quatre propositions validés explicitement par le chef (« Valider »), validation commitée avant code dans f4b730fb. Pilote implémenté sur feat/uix-06a-interface : marque, thème local compatible, connexion/accueil/navigation et trois pages Personnes. Aucun backend, migration, serveur ou push. Les autres domaines restent hors périmètre.

Vérifications : 65 tests unitaires réussis, build réussi, neutralité conforme, lint sans erreur (avertissements historiques hors pilote). Contrôle Chromium/axe-core de composants isolés et de la vraie connexion compilée effectué sans serveur ; les parcours réels et la CI restent à exécuter. Six nouveaux parcours découverts, 49 au total, non exécutés par l’agent. Le tableau « Missions en cours » reste tenu par le coordinateur.


## Correction de CI UIX-06a du 16 novembre

PR #185 publiée à df002a8d et sortie du brouillon par le coordinateur. CI 43775905844 : cinq contrôles réussis ; parcours : 47 réussis, un échoué, un non exécuté. Le coordinateur juge le fond prêt et demande la correction.

Les deux traces montrent une reprise réussie : dix comptes reçus et affichés sur 31. Le test attendait à tort le compte connecté sur la première page, alors que l’API trie du plus récent au plus ancien. Correctif limité à personnes.spec.cjs : attendre la vraie réponse et vérifier son contenu affiché. Syntaxe et collecte des 49 parcours conformes ; nouvelle CI attendue après push du chef. Fiche : docs/sessions/2026-11-16-feat-uix-06a-interface.md.
