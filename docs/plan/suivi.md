# Suivi des fonctions

**Le seul tableau des fonctions et de leur état.** Depuis le 18 novembre (décision du chef), **seul le coordinateur le modifie**, sur sa branche de coordination. Chaque agent écrit l'état de sa fonction dans sa fiche de session (`docs/sessions/`), et le coordinateur le reporte ici ([organisation.md](organisation.md), § 7).

Une ligne par fonction. L'état passe à « en cours » (avec la branche) au premier commit, à « PR ouverte » (avec le numéro) quand la PR existe, puis à « fait » à la fusion. Le détail, les dépendances et les critères de « terminé » sont dans le fichier du module (lien sur l'identifiant). L'état réel = ce fichier sur `main`, plus les PR ouvertes (`gh pr list`).

États : à faire · en cours · PR ouverte · fait · reporté (plus tard, sans date) · gelé (attend la reprise de la vente) · conditionnel (attend une décision).

## Chantiers

Au plus **3 chantiers ouverts** en même temps, bloqués compris. On ne prend une fonction que dans un chantier ouvert. Un chantier ouvert se termine avant d'en ouvrir un autre à sa place ([organisation.md](organisation.md), § 3).

### Ouverts (3 sur 3) · VSC s'ouvre dès que MOT se ferme (décision du chef du 18 nov.) ; VSC-01 (conception) commence avant

| Module | Ouvert le | Fonctions du chantier, dans l'ordre | Reste | État |
|---|---|---|---|---|
| [EXP](modules/EXP-exploitation.md) | avant le 9 nov. (EXP-01 en cours) | EXP-01, EXP-02, EXP-03, EXP-04, EXP-05 | 5 | ouvert ; EXP-02a écrite le 15 nov., en attente de relecture |
| [PLA](modules/PLA-plateforme.md) | 9 nov. 2026 | PLA-06, PLA-03, PLA-05, PLA-01, PLA-02, PLA-04, PLA-07 | 7 | ouvert ; ordre validé le 10 nov. PLA-01 attend EXP-02 (QUA-03 levée le 13 nov. : pile confirmée), PLA-07 attend EXP-04 |
| [MOT](modules/MOT-moteur.md) | 15 nov. 2026 (décidé le 13 nov., à la place de QUA) | MOT-13, MOT-12, MOT-02, MOT-03, MOT-04 | 5 | ouvert ; MOT-13 en tête (décision du 15 nov.), son étape 13b après MOT-12 |

### Fermés

| Module | Ouvert le | Fermé le | Fonctions |
|---|---|---|---|
| [QUA](modules/QUA-qualite-docs.md) | 10 nov. 2026 | 15 nov. 2026 (fusion de #171) | QUA-03 |
| [QJE](modules/QJE-quiz-jeux-ia.md) | 10 nov. 2026, par exception | 18 nov. 2026 (fusion de #196, décision du chef) | QJE-04 |

### Travaux en cours hors chantier, d'avant la règle

| Quoi | Branche ou PR | À faire |
|---|---|---|
| Correctif : le dimanche s'affiche dans l'emploi du temps (CI de `main` rouge le dimanche) | #162 | **fusionnée le 10 nov.** |
| Essai du contexte d'école (base de PLA-01) | #142 | **fusionnée le 10 nov.** |
| MOT-01, partie serveur (MP-1) | #156 | **fusionnée le 10 nov.** |
| Plan par modules | #161 | **fusionnée le 10 nov.** |
| Organisation de l'équipe, module MKT | #163 | **fusionnée le 10 nov.** |
| Diagramme d'architecture `docs/architecture/vue-d-ensemble/` (demandé par le chef le 11 nov., skill `stack-diagram` de l'agence) | #166 | **fusionnée** |
| Inventaire des outils des établissements, modules à créer (hors chantier, accord du chef le 11 nov.) | #167 | **fusionnée** |
| Douze modules de l'inventaire ajoutés au plan (hors chantier, accord du chef le 13 nov.) | #170 | **fusionnée** |
| Étude : comparatif Planner et Odoo + OpenEduCat sur la gestion d'école (hors chantier, demande du chef le 15 nov.) | #174 | **fusionnée le 15 nov.** |
| Plan d'essai d'OpenEduCat Community (étude hors chantier, demande du chef le 15 nov.) | #176 | **fusionnée** |
| Coordination des agents : rôle de coordinateur, skills, fiches de mission (hors chantier, demande du chef le 15 nov.) | #175 | **fusionnée** ; tableau « Missions en cours » confirmé par le chef le 15 nov. |
| Correctif : sauvegarde avant déploiement qui échoue sans bruit (REL-01) | #177 | **fusionnée le 15 nov.** |
| Correctif : audit des dépendances rouge, `backend/` seul (plan validé par le chef le 18 nov. ; `vitrine/` avec la montée d'Astro du 27 nov.) | #198 | **fusionnée le 18 nov.** (#198) |
| Correctif : parcours `sondage` et `espaceCours` rouges après 23 h 55 UTC, fin de la séance du jour des parcours (plan validé par le coordinateur le 18 nov.) | `fix/sondage-minuit` | **fusionnée le 18 nov.** (#202) |
| Correctif : `entreRoles`, `appel` et `appelClasse` rouges vers minuit UTC (créneau des parcours 00 h 00 à 24 h 00, séance du lendemain ; plan validé par le chef le 18 nov.) | #210 | **fusionnée le 18 nov.** |

Exception UIX autorisée par le chef le 15 novembre : **UIX-01a**, accueil des applications et navigation web, `feat/uix-01a-navigation`, PR #184 fusionnée le 15 nov. (`16b542a1`) ; six contrôles verts, 43 parcours réussis. Aucun quatrième chantier ouvert.

Exception QUA-04 autorisée par le chef le 15 novembre (fonction libre, les trois chantiers restent pleins) : `refactor/qua-04-dates`, plan validé, code fait, 51 tests unitaires du site verts.

## Missions en cours

Qui travaille sur quoi, module par module. Tenu par le **coordinateur** ([organisation.md](organisation.md), § 10) : une ligne par branche ouverte, retirée à la fusion. Le détail d'une mission est dans sa fiche, `docs/plan/missions/<identifiant>.md`. Les lignes sans fiche sont des travaux commencés avant le 15 novembre.

| Module | Fonction | Agent | Branche ou PR | État | Dernière relecture | Fiche |
|---|---|---|---|---|---|---|
| PLA | PLA-03b schéma de départ | Claude Code (VS Code, Fable 5.2) | `feat/pla-03b-schema-depart` | plan **validé par le chef** dans sa session (variante R-3) ; code en cours. **Écart du 18 nov.** : trois fichiers modifiés et non commités dans le dossier depuis le 15 nov. (`DEPLOIEMENT.md`, `baseNeuve.test.js`, `contexteEtablissement.test.js`) | 18 nov. 17 h 20 : au chef | [pla-03b](missions/pla-03b.md) |
| PLA | PLA-06 mesure de D-01 | Codex | #164 (brouillon) | banc adapté, sonde A-2 codée (`1cbdfaa`), 24 tests verts ; relu et poussé ; ensuite recette et séries sur le serveur, par le chef | 15 nov. 14 h 05 : prêt | [pla-06](missions/pla-06.md) |
| MOT | MOT-02 mesure du solveur sur un jeu scolaire | Codex | `etude/mot-02-mesure-solveur` (non poussée) | banc et grand jeu de 20 000 mesurés (6 passages, avant et après #181 : aucun planning complet en 600 s, débit médian -13 % en 1.35, plages qui se chevauchent) ; reste le collège, débloqué par #182 | 15 nov. 20 h 50 | [mot-02](missions/mot-02.md) |
| VSC | VSC-01 modèle de données du scolaire (conception C-5, étude d'impact Q-20) | Codex | #215 (`00110ddd`) | plan et sept arbitrages validés par le chef ; conception écrite ; **à corriger** : `suivi.md` modifié (à reprendre de `main`), pas de section EP-18, « code Massar » seul identifiant national (EP-5) ; puis avis des groupes A et B, que le chef organise | 18 nov. 18 h 40 : à corriger | [module](modules/VSC-vie-scolaire.md) |
| MOT | MOT-13 (réponse 23) : refus de l'activation fine d'une règle souple | Claude Code (Opus 5.5), session du 15 nov. | `feat/mot-13-coupure-fine` (`b9f1fbf3`, non poussée) | plan court validé, code fait, fiche écrite le 15 nov. ; la branche modifie `suivi.md` (d'avant la règle) : à fusionner avec `main` en gardant la version de `main`, puis relecture. Ensuite MOT-13c, avec ADM-02 | 18 nov. 17 h 20 : constat | — |
| MKT | MKT-05 et MKT-09 : vidéo publicitaire et présentation aux établissements (MKT-09 dégelé pour la préparation par le chef) | agent Claude du coordinateur | `mkt/mkt-05-video-presentation` (non poussée) | argumentaire, 3 scripts et plan de 18 diapositives écrits (`2a921691`) ; réponses du chef reçues ; recherche de sources en cours ; vidéo et .pptx après l'accord du chef | 15 nov. 23 h 50 | [mkt-video-presentation](missions/mkt-video-presentation.md) |
| UIX | UIX-10 charte commune (web et Studio quiz, mobile, jeux, StudyLib ; UIX-10g retirée) | Claude (VS Code) | UIX-10a : #207, **fusionnée le 18 nov. à 16 h 14** | plan validé par le chef (#206, fusionnée) ; UIX-10a faite et relue après coup : conforme. Ensuite UIX-10b, plan court, après VIT-08 dans la file | 18 nov. 17 h 05 : UIX-10a conforme | [uix-10a-source-charte](missions/uix-10a-source-charte.md) |
| UIX | UIX-11 tableau de bord de l'administration (refait à la charte, complété des données qui existent déjà) | Claude (VS Code), après UIX-10b | `feat/uix-11-tableau-de-bord` (à créer) | décision du chef le 18 nov. vers 17 h 15 ; fiche écrite ; plan court à écrire | 18 nov. 17 h 30 | [uix-11-tableau-de-bord](missions/uix-11-tableau-de-bord.md) |
| UIX | UIX-09 grille d'applications façon iCloud | Codex | #213 (`b54826eb`) | relue : bonne (fusion de `main`, Lucide seul au verrou, axe-core dans le parcours), CI verte ; **à compléter** : mention ISC de Lucide dans `LICENSE` (chef), puis fusion | 18 nov. 18 h 40 | [vit-equipe](missions/vit-equipe.md) |
| UIX | UIX-06c Salles, Campus, Créneaux, Calendrier | Claude (VS Code), après UIX-10b | `feat/uix-06c-ressources-temps` (à créer) | plan validé par le chef le 18 nov. ; se fait sur la charte d'UIX-10b | 18 nov. 13 h 40 | [plan](../conception/interface/uix-06c-ressources-temps.md) |
| VIT | VIT-06 mise en ligne du site vitrine sur `vitrine.finadmintech.fr` | Codex | #212 (`313d58d6`, plan seul) | plan validé par le chef, secrets et 7e condition inscrits, CI verte ; conditions 8 et 9 à inscrire ; déploiement le jour où les neuf conditions sont réunies | 18 nov. 18 h 40 : prête après ce commit | [vit-06-mise-en-ligne](missions/vit-06-mise-en-ligne.md) |
| VIT | VIT-07 contenu complet du site : Quiz et jeux, Bibliothèque, Cours et annonces, Application, menu « Fonctions » | agent de Cursor (Grok 4.7 high) | #214 (`b8ef7020`) | plan corrigé et validé par le chef (questions 1 et 2) ; EP-18 et Massar tenus ; CI entièrement verte | 18 nov. 18 h 40 : **prête** | [vit-07-contenu-complet](missions/vit-07-contenu-complet.md) |
| VIT | VIT-10 pages par rôle, menu « Solutions » ouvrant, pied de page complet (condition 8) | agent de Cursor (Grok 4.7 high) | `feat/vit-10-pages-par-role` (à créer après #214) | consigne de Claude de VS Code (17 h 55, demande du chef) inscrite ; plan court au chef | 18 nov. 18 h 40 | [vit-10-pages-par-role](missions/vit-10-pages-par-role.md) |
| VIT | VIT-11 catalogue des fonctionnalités et FAQ (condition 9) | Codex, après VSC-01 | `feat/vit-11-catalogue-faq` (à créer) | consigne de Claude de VS Code (17 h 55, demande du chef) inscrite ; plan court au chef, réponses de la FAQ une à une | 18 nov. 18 h 40 | [vit-11-catalogue-faq](missions/vit-11-catalogue-faq.md) |
| VIT | VIT-08 vidéo de présentation globale (motion design, sous-titres fr et en, sans voix) pour l'accueil | Claude (VS Code) | `feat/vit-08-video-presentation` (`5b62f702`, non poussée) | plan court validé par le chef le 18 nov. ; code à faire | 18 nov. 17 h 05 : constat | [vit-08-video-presentation](missions/vit-08-video-presentation.md) |
| QJE | sortie de ClassQuiz : QJE-03 (joueur natif), puis QJE-06 (plus aucun conteneur ClassQuiz) | Codex | — | QJE-01 faite (#208, fusionnée le 18 nov.) ; QJE-03 au n° 5 de la file de Codex ; QJE-06 attend le transfert vérifié des quiz de l'école pilote | 18 nov. 17 h | [sortie-classquiz](missions/sortie-classquiz.md) |
| QJE | QJE-14 : le Studio quiz « comme Google Forms » (sections et logique, tableau des réponses et export, questionnaires non notés, création simple) | Claude (VS Code), n° 4 de sa file | — | décision du chef le 18 nov. ; plan validé par le chef ; anonymat et données d'élèves au chef | 18 nov. 14 h | [qje-14-studio-forms](missions/qje-14-studio-forms.md) |
| BIB | étude : garder StudyLib en Laravel ou la reconstruire dans la pile de Planner | Claude (VS Code), n° 5 de sa file | `etude/bib-studylib-pile` (à créer) | décision du chef le 18 nov. (« étude d'abord ») ; fiche corrigée le 18 nov. : aucun prêt de livres n'existe dans StudyLib | 18 nov. 17 h 30 | [etude-studylib](missions/etude-studylib.md) |
| QUA | étude « contextes à faible équipement » (EP-18) : chaque fonction sans téléphone de l'élève, avec peu de connexion, avec un écran projeté et du papier | nouvelle session Claude, à ouvrir par le chef | `etude/ep18-faible-equipement` (à créer) | décision du chef le 18 nov. vers 17 h 15 ; fiche écrite | 18 nov. 17 h 30 | [etude-ep18-faible-equipement](missions/etude-ep18-faible-equipement.md) |
| VIT | VIT-09 illustrations du site : dessins en code sur toutes les pages, quelques captures sans nom d'école ni donnée réelle, première section de chaque page améliorée (condition 7) | Claude (VS Code), après VIT-08 | `feat/vit-09-illustrations` (à créer en dernier, après VIT-07, VIT-08, VIT-10 et VIT-11) | décision du chef le 18 nov. vers 17 h 45 ; fiche écrite ; plan court à écrire, validé par le chef | 18 nov. 17 h 45 | [vit-09-illustrations](missions/vit-09-illustrations.md) |
| VIT | plus tard : vidéos de motion design sur les captures, et lien « Ressources » (VIT-03) avec elles | — | — | décisions du chef du 18 nov. ([plan du site](../conception/vitrine/vit-vitrine.md), § 3 bis) | 18 nov. | [vit-equipe](missions/vit-equipe.md) |
| EXP | suite de l'audit (#198, fusionnée) : partie `vitrine/` le 27 nov. avec la montée d'Astro (n° 3 de la file de l'agent de Cursor) ; revue de l'exception picomatch avant le 18 déc. | agent de Cursor pour `vitrine/` | `fix/audit-vitrine` (à créer le 27 nov.) | dates fixées par le plan | 18 nov. | [plan](../conception/exploitation/fix-audit-dependances.md) |

Hors chantier, PR ouvertes : #194 (essai PostgreSQL, rapport intermédiaire), #193 (plan de parité avec OpenEduCat), #192 et #191 (études OpenEduCat), #190 (architecture des données), #189 (QUA-09, envois sortants), #188 (QUA-08, `SECURITY.md`), #186 (failles des ERP scolaires), #169 (modèle économique), #168 (kit vidéo MKT-05 et MKT-09), #53 (vidéo promo, octobre). Fusionnées depuis le dernier relevé : #165, #166, #175, #176, #210. La PR de coordination est #211.

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
| 0082 | QJE-04 : solution vue d'un défi de jeu (contrat des jeux, § 1.0) ; réservée le 10 nov. sous le numéro 0080, renumérotée le 15 nov. (0080 et 0081 prises par MOT-13) | écrite le 18 nov. (`backend/migrations/0082-jeux-solutions.js`), non appliquée |
| 0083 et plus | libres | — |

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
| [MOT-03](modules/MOT-moteur.md) | Validation avant le calcul | 3 | M | fait : #183 fusionnée le 18 nov. | #183 |
| [MOT-04](modules/MOT-moteur.md) | Modèle neutre et évaluateur indépendant | 3 | L + M | à faire |  |
| [MOT-05](modules/MOT-moteur.md) | Profils et nomenclatures lus dans la base (cycle, niveau, classe, demi-groupe, groupe transversal), à la… | 2 puis 3 | M + L | à faire |  |
| [MOT-06](modules/MOT-moteur.md) | Collège | 3 | XL | à faire |  |
| [MOT-07](modules/MOT-moteur.md) | Lycée | 3 | L | à faire |  |
| [MOT-08](modules/MOT-moteur.md) | File simple des calculs | 2 | M | à faire |  |
| [MOT-09](modules/MOT-moteur.md) | Remplaçant proposé automatiquement en cas d'absence d'un enseignant, validé en un geste, enseignants prévenus | 4 | M | à faire |  |
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
| [VSC-01](modules/VSC-vie-scolaire.md) | Modèle de données du scolaire (conception seule, avec diagrammes) | 1 | L | en cours : plan validé (chef, 18 nov.), conception écrite (#215), à corriger puis à relire par les groupes A et B | #215 |
| [VSC-02](modules/VSC-vie-scolaire.md) | Élèves et familles | 4 | L | à faire |  |
| [VSC-03](modules/VSC-vie-scolaire.md) | Absences prévenues aux parents, justificatifs, saisie déléguée (EP-6) | 4 | M | à faire |  |
| [VSC-04](modules/VSC-vie-scolaire.md) | Notes et bulletins | 4 | XL | à faire |  |
| [VSC-06](modules/VSC-vie-scolaire.md) | Formation professionnelle | 5 | M | à faire |  |
| [VSC-07](modules/VSC-vie-scolaire.md) | Affectation des élèves aux groupes de langue et d'option | 3 | M | à faire |  |
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
| [QJE-01](modules/QJE-quiz-jeux-ia.md) | L'entrée « Quiz » du sélecteur d'espaces ouvre le Studio, plus ClassQuiz… | libre | S | fait : #208 fusionnée le 18 nov. (exception hors chantier) | #208 |
| [QJE-02](modules/QJE-quiz-jeux-ia.md) | Import des formats GIFT et Moodle XML dans le Studio | libre | M | à faire |  |
| [QJE-03](modules/QJE-quiz-jeux-ia.md) | Joueur natif dans l'application, sans passer par le site | libre | M | à faire, exception hors chantier accordée le 18 nov. ([sortie-classquiz](missions/sortie-classquiz.md)) |  |
| [QJE-04](modules/QJE-quiz-jeux-ia.md) | Fusion de `jeux-pedagogique` et ses quatre corrections | libre | M | fait : #196 fusionnée le 18 nov. ; migration 0082 écrite, à appliquer au prochain déploiement | `jeux-pedagogique` (Alexis) |
| [QJE-05](modules/QJE-quiz-jeux-ia.md) | Service des jeux à part, avec des gabarits | libre | L + M + M | à faire |  |
| [QJE-06](modules/QJE-quiz-jeux-ia.md) | Sortie complète de ClassQuiz | libre | M | à faire, exception hors chantier accordée le 18 nov. ([sortie-classquiz](missions/sortie-classquiz.md)) |  |
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
| [UIX-01](modules/UIX-interface.md) | Socle neutre | 2 | L | conçu, à coder ; UIX-01a (navigation, #184) fusionnée le 15 nov. ; UIX-06a (interface unifiée, #185) fusionnée le 16 nov. |  |
| [UIX-01a](modules/UIX-interface.md) | Accueil des applications et navigation web, exception autorisée par le chef le 15 nov. | libre | M | fait : #184 fusionnée, CI verte, 43 parcours | #184 |
| [UIX-02](modules/UIX-interface.md) | Vocabulaire des écrans selon le profil de l'école (classe et non groupe, matière et… | 3 | M | à faire |  |
| [UIX-03](modules/UIX-interface.md) | Accessibilité AA | libre | M | en partie |  |
| [UIX-04](modules/UIX-interface.md) | Arabe complet | 4 | XL | à faire |  |
| [UIX-05](modules/UIX-interface.md) | Ton des messages du serveur | libre | M | à faire |  |
| [UIX-06](modules/UIX-interface.md) | Style unifié entre les pages anciennes et récentes | libre | M | en partie : UIX-06a (#185) et UIX-06b (#199) fusionnées ; UIX-06c à faire, sur la charte d'UIX-10b | #185, #199 |
| [UIX-06a](modules/UIX-interface.md) | Pilote web : marque mosaïque, connexion/navigation et Personnes | libre | — | fait : #185 fusionnée le 16 nov. | #185 |
| [UIX-06b](modules/UIX-interface.md) | Référentiel pédagogique : Filières, Groupes, Modules et Enseignements | libre | L | fait : #199 fusionnée le 18 nov. | #199 |
| [UIX-06c](modules/UIX-interface.md) | Salles, Campus, Créneaux et Calendrier | libre | M | plan validé (chef, 18 nov.) ; après UIX-10b | |
| [UIX-09](modules/UIX-interface.md) | Grille d'applications façon iCloud | libre | M | PR ouverte : #213, CI verte ; mention ISC à ajouter avant la fusion | #213 |
| [UIX-10](modules/UIX-interface.md) | Charte commune à toutes les plateformes, en six fonctions (10a à 10f ; 10g retirée) | libre, exception du 18 nov. | L | en cours : plan validé (#206) ; **UIX-10a faite** (#207, fusionnée le 18 nov.) ; UIX-10b ensuite | #206, #207 |
| [UIX-11](modules/UIX-interface.md) | Tableau de bord de l'administration : refait à la charte, complété des données qui existent déjà, chaque chiffre menant à ses lignes | libre, étape 2 de la feuille de route | M | à faire : fiche écrite le 18 nov. ([uix-11-tableau-de-bord](missions/uix-11-tableau-de-bord.md)) ; après UIX-10b | |
| [VIT-01](modules/VIT-site-vitrine.md) | Conception | libre | M | fait : socle, accueil et cinq pages de fonctions (VIT-05 en préparation), #195 fusionnée le 18 nov. ; rien n'est en ligne | #195 |
| [VIT-02](modules/VIT-site-vitrine.md) | Une page et un formulaire de contact | libre | M | à faire |  |
| [VIT-03](modules/VIT-site-vitrine.md) | Centre d'aide | libre | M | à faire |  |
| [VIT-04](modules/VIT-site-vitrine.md) | Page d'état du service et journal des nouveautés de chaque version | libre | S | à faire |  |
| [VIT-05](modules/VIT-site-vitrine.md) | Vitrine complète | quand la vente reprend | L | préparation dégelée le 18 nov. (sans tarifs ni mise en ligne) : cinq pages de fonctions (#195) et page Solutions (#203) fusionnées | #195, #203 |
| [VIT-06](modules/VIT-site-vitrine.md) | Mise en ligne du site sur un sous-domaine, non indexé | libre | M | plan validé (chef, 18 nov.) ; PR #212 (plan) ; déploiement après les neuf conditions | `feat/vit-06-mise-en-ligne` |
| [VIT-07](modules/VIT-site-vitrine.md) | Contenu complet : toutes les applications présentées, Bibliothèque sortie de « Bientôt » (condition 5) | libre | M | PR ouverte : #214, CI verte, prête | #214 |
| [VIT-08](modules/VIT-site-vitrine.md) | Vidéo de présentation globale sur l'accueil (condition 6) | libre | M | en cours : plan court validé (chef, 18 nov.) | `feat/vit-08-video-presentation` |
| [VIT-09](modules/VIT-site-vitrine.md) | Illustrations de toutes les pages : dessins en code, quelques captures neutres, première section améliorée (condition 7) | libre | M | à faire : fiche écrite le 18 nov. ([vit-09-illustrations](missions/vit-09-illustrations.md)) ; plan après VIT-08, code en dernier sur le site | |
| [VIT-10](modules/VIT-site-vitrine.md) | Pages par rôle, menu « Solutions » ouvrant, pied de page complet (condition 8) | libre | M | à faire : fiche écrite le 18 nov. ; après #214 | |
| [VIT-11](modules/VIT-site-vitrine.md) | Catalogue de toutes les fonctionnalités, avec leur source dans le code, et page FAQ (condition 9) | libre | M | à faire : fiche écrite le 18 nov. ; Codex, après VSC-01 | |
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
| [QUA-04](modules/QUA-qualite-docs.md) | Reste des dates | libre | S | en cours : code fait, 51 tests unitaires verts | `refactor/qua-04-dates` |
| [QUA-05](modules/QUA-qualite-docs.md) | Supprimer les branches et les dossiers de travail morts, après vérification de leur… | libre | S | à faire |  |
| [QUA-06](modules/QUA-qualite-docs.md) | `docs/users.xlsx` | 0 | S | fait (personnes fictives, rien à réécrire) |  |
| [QUA-07](modules/QUA-qualite-docs.md) | Protéger `main` | 0 | S | fait : les 6 contrôles de la CI sont exigés (contournable seulement par `gh pr merge --admin`) |  |

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
