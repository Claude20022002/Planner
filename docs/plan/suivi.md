# Suivi des fonctions

**Le seul tableau des fonctions et de leur état.** Depuis le 18 novembre (décision du chef), **seul le coordinateur le modifie**, sur sa branche de coordination. Chaque agent écrit l'état de sa fonction dans sa fiche de session (`docs/sessions/`), et le coordinateur le reporte ici ([organisation.md](organisation.md), § 7).

Une ligne par fonction. L'état passe à « en cours » (avec la branche) au premier commit, à « PR ouverte » (avec le numéro) quand la PR existe, puis à « fait » à la fusion. Le détail, les dépendances et les critères de « terminé » sont dans le fichier du module (lien sur l'identifiant). L'état réel = ce fichier sur `main`, plus les PR ouvertes (`gh pr list`).

États : à faire · en cours · PR ouverte · fait · reporté (plus tard, sans date) · gelé (attend la reprise de la vente) · conditionnel (attend une décision).

## Chantiers

Au plus **3 chantiers ouverts** en même temps, bloqués compris. On ne prend une fonction que dans un chantier ouvert. Un chantier ouvert se termine avant d'en ouvrir un autre à sa place ([organisation.md](organisation.md), § 3).

### Ouverts (4, dont VSC par exception) · **ADM s'est ouvert le 21 nov. à la place de MOT**, à la fusion de #239 (décision du chef) ; **VSC ouvert par exception le 25 nov.**, décision maintenue le 26 nov. en connaissance de cause (quatre chantiers, sans date de retour à trois)

| Module | Ouvert le | Fonctions du chantier, dans l'ordre | Reste | État |
|---|---|---|---|---|
| [EXP](modules/EXP-exploitation.md) | avant le 9 nov. (EXP-01 en cours) | EXP-01, EXP-02, EXP-03, EXP-04, EXP-05 | 4 | ouvert ; EXP-01 faite (#172) ; EXP-02a fusionnée (#179, 15 nov.) |
| [PLA](modules/PLA-plateforme.md) | 9 nov. 2026 | PLA-06, PLA-03, PLA-05, PLA-01, PLA-02, PLA-04, PLA-07 | 7 | ouvert ; ordre validé le 10 nov. PLA-01 attend EXP-02 (QUA-03 levée le 13 nov. : pile confirmée), PLA-07 attend EXP-04 |
| [ADM](modules/ADM-administration.md) | 21 nov. 2026 (fusion de #239, à la place de MOT ; décision du chef) | ADM-02 et MOT-13c, ADM-01, ADM-03, ADM-04 (modèle du supérieur) | 5 | ouvert ; **ADM-02** : fiche écrite, une session Claude neuve à ouvrir par le chef (choix du chef, 21 nov.), plan au chef (L ; Q-04, R-1 à R-4 de la relecture de MP-1, à trancher dans le plan) ; ADM-01 et ADM-03 lisent la conception de VSC-01 (#215) ; ADM-03 attend aussi VSC-07 |
| [VSC](modules/VSC-vie-scolaire.md) | 25 nov. 2026, par exception (décision du chef) | VSC-01, VSC-02, VSC-03 | 3 | ouvert ; VSC-01 : référence #215 (décision du chef du 25 nov.), enrichie de #268 (fermée le 26 nov.) ; #269 (VSC-02) à corriger (élève sans compte dans sa classe, dépendance PLA-01) ; #270 (lot Q-20, pas VSC-03) à renommer, en dernier ; **relecture de sécurité faite le 26 nov.** : à corriger (CI : libellé « Identifiant » dans cinq parcours ; collision identifiant et adresse entre comptes ; import selon Q-8 et Q-2 ; import sorti du contrôleur), conditions du chef ; 0064 confirmée |

### Fermés

| Module | Ouvert le | Fermé le | Fonctions |
|---|---|---|---|
| [QUA](modules/QUA-qualite-docs.md) | 10 nov. 2026 | 15 nov. 2026 (fusion de #171) | QUA-03 |
| [QJE](modules/QJE-quiz-jeux-ia.md) | 10 nov. 2026, par exception | 18 nov. 2026 (fusion de #196, décision du chef) | QJE-04 |
| [MOT](modules/MOT-moteur.md) | 15 nov. 2026 | 21 nov. 2026 (fusion de #239, décision du chef) | MOT-12, MOT-03, MOT-13a, MOT-13b et le refus de l'activation fine (#238), MOT-02 pour le supérieur (#239) ; **MOT-13c passe à ADM** avec ADM-02 ; **MOT-04 attend la réouverture de MOT**, avec l'alerte de qualité souple à 960 étudiants |

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
| VSC | VSC-01 modèle de données du scolaire (conception C-5, étude d'impact Q-20) | Codex | #215 (`ac930aea`, poussée le 21 nov.) | plan et sept arbitrages validés par le chef ; N7 écrit (C-5 § 2.1 : périodes différentes par classe ; VSC-04 et VSC-08 partagent inscription, barème, résultat) ; **se termine comme conception, puis se gèle sans code** ; fusion après l'avis des groupes A et B | 21 nov. soir : poussée ; attend les avis A et B | [module](modules/VSC-vie-scolaire.md) |
| MKT | MKT-05 et MKT-09 : vidéo publicitaire et présentation aux établissements (MKT-09 dégelé pour la préparation par le chef) | agent Claude du coordinateur | `mkt/mkt-05-video-presentation` (non poussée) | argumentaire, 3 scripts et plan de 18 diapositives écrits (`2a921691`) ; réponses du chef reçues ; recherche de sources en cours ; vidéo et .pptx après l'accord du chef | 15 nov. 23 h 50 | [mkt-video-presentation](missions/mkt-video-presentation.md) |
| MKT | MKT-09 : la présentation de Planner aux chefs d'établissement, **le produit entier**, pour tous les pays et tous les contextes (demande du chef du 22 nov.) | Codex jusqu'à 14 h 35, puis **session Claude `plan-b-projet-pacte-d9`** (chef) | `mkt/mkt-09-presentation-produit` dans `..\planner-marketing` (`33ec18b`, sans dépôt distant) et dans le dépôt Planner (fiches, `15e5dfde`) | **présentation à envoyer livrée en local** : 22 diapositives aux couleurs du partenaire FinAdmin Tech, plan en 14 parties du chef ; écarts avec la mission tranchés par le chef (contact, concurrents, pilote « 3 mois offerts ») ; **avant l'envoi** : revue `creative-quality-review`, dépôt distant privé, accord de l'équipe sur ses photos, notes du présentateur (chef) | 22 nov. 16 h 55 : relue, conforme aux arbitrages du chef | [mkt-09-presentation-produit](missions/mkt-09-presentation-produit.md) |
| UIX | UIX-10 charte commune (web et Studio quiz, mobile, jeux, StudyLib ; UIX-10g retirée) | Claude (VS Code) | — | UIX-10a (#207), UIX-10b (#235) et **UIX-10d (#251, fusionnée le 22 nov. à 9 h 38)** faites ; **suite : UIX-10e** (les jeux web et mobile, l'accent du Studio quiz ; S, plan court au coordinateur), prompt à transmettre par le chef ; BIB-10 attend le contrat d'API de BIB-06 ; UIX-10c attend les SVG officiels ; **UIX-10f sans objet** | 22 nov. 10 h 55 : 10e à lancer | plan d'UIX-10, § 9 |
| UIX | UIX-09 grille d'applications façon iCloud | Codex | #213 (`d4821e5c`) | relue : bonne ; mention ISC complète ; CI entièrement verte | 18 nov. 20 h 40 : **prête** | [vit-equipe](missions/vit-equipe.md) |
| ADM | ADM-02 panneau de configuration de l'école, avec MOT-13c (l'écran « Règles de génération ») | **session Claude ouverte par le chef** (non listée chez le coordinateur), Opus 5.5 | `feat/adm-02-configuration` (`f0ca05d2`, locale) | plan validé par le chef (`49488efd`, migration 0088), amendé (réponses 16 et 17 : `activeeParLEcole` partagée, `raison_code` en données, `80fd6d26`) ; **ADM-02a en cours** : réglages de l'école (R-1), historique (R-3), aperçu, création et application (R-2, R-4), journal de sécurité (R-6) ; travail non commité dans le dossier à 11 h | 22 nov. 11 h : en cours, ajouts faits | [adm-02](missions/adm-02.md) |
| VIT | VIT-06b conservation des journaux de la vitrine (Nginx, Traefik), avant le déploiement | Codex | — | #221 (le code de VIT-06) **fusionnée le 21 nov.** ; VIT-06b attend `N` (VIT-12) et le relevé Traefik du VPS par le chef ; le déploiement, le jour où les douze conditions sont réunies | 21 nov. | [vit-06-mise-en-ligne](missions/vit-06-mise-en-ligne.md) |
| VIT | VIT-13 fonctionnalités par type d'établissement (condition 10 ; « Pourquoi Planner » passé à VIT-14) | agent de Cursor, Grok 4.7 | `feat/vit-13-pourquoi-et-types` (`deaf9903` ; le plan seul poussé) | plan validé par le chef ; **code fait** : chaînes FR et EN de la page Solutions seulement ; tests 115/116 (1 sauté) et neutralité refaits ; build 39 pages, accueil 136,5 Ko, axe-core sans violation (crus sur parole) ; un fichier temporaire à supprimer | 22 nov. 10 h 30 : **prête pour la PR** | [vit-13-pourquoi-et-types](missions/vit-13-pourquoi-et-types.md) |
| VIT | VIT-15 une page par module, avec le bloc « selon votre équipement » (condition 10) | Codex, après MKT-09 (trame) et VIT-09c (plan) | `feat/vit-15-pages-modules` (à créer) | fiche écrite ; ajouts de l'expertise (C5, PDF imprimé) | 22 nov. : VIT-11 fusionnée, débloquée | [vit-15-pages-modules](missions/vit-15-pages-modules.md) |
| VIT | VIT-16 page Contact complète et page À propos (conditions 10 et 11) | session Claude de VIT-12 | `feat/vit-16-contact-a-propos` (`b6eaae02`, poussée) | plan écrit, « validé avec corrections » : **les corrections et `RÉSEAU` n'ont pas été reçus** ; D1 (une adresse, réponse sous deux jours ouvrés) ; le code après la fusion de VIT-12 | 21 nov. : en attente du chef | [vit-16-contact-a-propos](missions/vit-16-contact-a-propos.md) |
| QJE | QJE-15 les jeux rangés par niveau, puis par filière, sur le site et dans l'application (web et mobile) | agent de Cursor, après VIT-10 | `feat/qje-15-jeux-par-niveau` (à créer) | exception hors chantier du chef (18 nov. vers 19 h 20) ; fiche écrite ; plan court au chef | 18 nov. 19 h 25 | [qje-15-jeux-par-niveau](missions/qje-15-jeux-par-niveau.md) |
| VIT | VIT-12 mentions légales et page de confidentialité du site (condition 2) | session Claude de VIT-12 | #223 (`3cee3b47`) | plan et textes validés par le chef, codée ; **CI rouge exprès** : attend `NOM`, `HÉBERGEUR`, `N`, `DATE`, `E-MAIL` du chef ; ne pas fusionner avant. Après VIT-17 : `cheminsLangues()` sur ses deux pages | 21 nov. : en attente du chef | [vit-12-pages-legales](missions/vit-12-pages-legales.md) |
| QJE | sortie de ClassQuiz : QJE-03 (joueur natif), puis QJE-06 (plus aucun conteneur ClassQuiz) | Codex | — | QJE-01 faite (#208, fusionnée le 18 nov.) ; QJE-03 au n° 5 de la file de Codex ; QJE-06 attend le transfert vérifié des quiz de l'école pilote ; **QJE-03 relancée le 26 nov. (n° 3 de la file de Codex)** : plan à écrire, validé par le chef | 26 nov. | [sortie-classquiz](missions/sortie-classquiz.md) |
| QJE | QJE-14 : le Studio quiz « comme Google Forms » (sections et logique, tableau des réponses et export, questionnaires non notés, création simple) | Claude (VS Code) | — | plan validé par le chef le 21 nov. (`dfefc613`, 24 réponses) ; **#248 fusionnée le 22 nov. à 9 h 28** ; découpage 14a à 14e ; migrations 0084 à 0086 réservées ; **ensuite QJE-14a, plan court** (agent à fixer par le chef) | 22 nov. 9 h 35 : plan sur `main` | [qje-14-studio-forms](missions/qje-14-studio-forms.md) |
| EXP | correctif : retirer le Meilisearch de StudyLib (inutilisé) | agent de Cursor | `fix/exp-retirer-meilisearch` (`1d1451f8`, plan seul, poussé) | **plan court écrit, au chef** (serveur) : question 1 (garder `meili_data` jusqu'à la sauvegarde suivante vérifiée), et l'étape 5 (« redémarrer StudyLib ») à confronter à la décision du 22 nov. (StudyLib ne tourne plus) ; question 2 : proposition retenue par le coordinateur ; `quiz-meilisearch` n'est pas touché | 22 nov. 1 h 05 : **au chef** | [exp-retirer-meilisearch](missions/exp-retirer-meilisearch.md) |
| BIB | BIB-05 à BIB-08 : modèle et stockage S3, API, espace de cours, reprise | **session Claude « BIB »** (`plan-b-projet-pacte-2e`) | #252 (`3e7f3f77`), puis `feat/bib-06-api-documents` tirée d'elle | **BIB-05 faite** : plan validé par le chef (`da122bb8`, réponses 1 à 12), `@aws-sdk` 3.1164.0, migration 0087 et trois modèles, vérification des fichiers, stockage par préfixe d'école (liens signés de 5 min, échec fermé), service des documents, variables `S3_*` (réponse 6) ; unitaires 555/555 (38 refaits), deux écoles 13/13, essai sur un vrai MinIO 14/14 ; la suite d'intégration complète est à confirmer par la CI (29 délais dépassés en local, aucune assertion). Ensuite BIB-06, dans une session neuve ou après `/compact` (choix du chef) | 22 nov. 11 h : **prête**, intégration verte en CI (64 suites, 643 tests) ; à fusionner en premier | [bib-reconstruction](missions/bib-reconstruction.md) |
| BIB | BIB-09 écrans web de la Bibliothèque, à la charte | Claude (VS Code), après UIX-10d et BIB-10 | `feat/bib-09-ecrans` (à créer) | fiche écrite le 22 nov. ; attend le contrat d'API de BIB-06 ; plan au chef | 22 nov. : en attente | [bib-09-ecrans](missions/bib-09-ecrans.md) |
| BIB | BIB-10 Bibliothèque du mobile sur l'API de Planner | Claude (VS Code), à la suite d'UIX-10d | `feat/bib-10-mobile` (à créer) | fiche écrite le 22 nov. ; tient `bibliotheque.jsx` et `donnees.js` ; plan au coordinateur | 22 nov. : en attente | [bib-10-mobile](missions/bib-10-mobile.md) |
| STA | STA-03 avis de stage et idées de projet, venus de StudyLib | Alexis et son agent | `feat/sta-03-avis-idees` (proposée) | fiche écrite le 22 nov. ; après EDT-04 et #230 ; part mobile après BIB-10 ; plan au chef | 22 nov. : en attente | [sta-avis-idees](missions/sta-avis-idees.md) |
| BIB | BIB-11 import générique d'un dossier de documents | Alexis et son agent | `feat/bib-11-import` (à créer) | fiche écrite le 22 nov. ; après BIB-06 ; plan au coordinateur | 22 nov. : en attente | [bib-11-import](missions/bib-11-import.md) |
| QUA | étude « contextes à faible équipement » (EP-18) : chaque fonction sans téléphone de l'élève, avec peu de connexion, avec un écran projeté et du papier | **session Claude `plan-b-projet-pacte-20`** (choix du chef, 22 nov. à 9 h 50) | `etude/ep18-faible-equipement` (`a0806b29`, locale) | **faite** : grille fonction par fonction (chaque « fait » cite un fichier et une ligne), poids mesuré (338 Ko compressés au premier chargement), suppositions de pays, 16 manques rangés ; réponses 1 à 11 du chef ; l'ordre du § 9.1 et la section « 7 ter. EP-18 » du modèle **validés par le chef** | 22 nov. 10 h 30 : **prête pour la PR** (documents seuls) | [etude-ep18-faible-equipement](missions/etude-ep18-faible-equipement.md) |
| QUA | les cinq correctifs courts d'EP-18 : M-10 (décalage horaire de l'école), M-1 (feuille d'appel), M-2a (quiz imprimé), M-9 (poids de l'application), M-11 et M-12 (jeux en MAD, nom de l'application) | session 20 (M-10, M-1) ; agent de Cursor après VIT-13 (M-12, M-11, M-9) ; agent de QJE-14a (M-2a) | une branche par correctif (fiche) | ordre et répartition du chef (22 nov.) ; plans courts au coordinateur ; **M-10** : #255, relue, **CI verte** (intégration comprise), prête ; **M-12** (`fix/mob-nom-application`, `ea6c747d`) : **relue, prête pour la PR** ; **M-11** (`fix/qje-jeux-unite-neutre`) : **plan validé** (`5601f126`, « crédits »), code par l'agent de Cursor ; puis le plan de M-9 ; **M-1** (session 20, `feat/edt-feuille-appel`) : plan validé (`30625a36` ; réponse du chef : l'appel après coup « compte, et se voit ») ; codée et corrigée (`be800297`), **relue : prête pour la PR**, après #255 et un `git merge origin/main` ; M-2a à l'agent de QJE-14a (à fixer par le chef) ; **M-9 : #272 fusionnée le 26 nov.** (CI verte, sept contrôles) | 26 nov. : M-9 fusionnée | [ep18-correctifs](missions/ep18-correctifs.md) |
| VIT | VIT-09b intégration des illustrations, avec C2, C3 et C10 de l'expertise ; en dernier sur le site (conditions 7 et 10) | Claude (VS Code) | #227 (brouillon, plan) | 09a fusionnée (#222, 21 nov.) ; 09b : plan court **validé par le chef** (`8f451998`), code en dernier | 21 nov. | [vit-09-illustrations](missions/vit-09-illustrations.md) |
| VIT | VIT-09c un logo de tuile (SVG, style de VIT-09a) et une image générée par module vendable | Codex, **après VIT-11, avant VIT-15** (chef, 21 nov.) | `feat/vit-09c-logos-modules` (`19ca17b4`, locale) | **faite** : 13 logos nouveaux (20 en tout) et 17 WebP de 13 à 15 Ko, générés avec l'outil inclus dans Codex ; **rendu validé par le chef** ; tests 18/18 ; PR à ouvrir | 22 nov. 16 h 40 : **prête pour la PR** | [vit-09c-logos-modules](missions/vit-09c-logos-modules.md) |
| VEN | étude : les modules vendables et les packs (sans prix) | coordinateur | #242 (`e2844851` poussée ; `f946d291` locale) | **validée par le chef** : 17 modules et le socle, un pack par public avec une part gratuite et des fonctions verrouillées visibles, connecteur d'État inclus, six règles de l'offre. **Corrigée le 22 nov. (chef)** : la Bibliothèque à l'étape 3, cinq modules vendables aujourd'hui et sept à l'étape 3 (`f946d291`, à pousser) ; CI verte sur `e2844851` | 22 nov. 0 h 35 : à pousser, puis à fusionner | [15-modules-et-packs](../etude-marche/15-modules-et-packs.md) (sur sa branche) |
| QJE | suite de QJE-04 : un nom accessible par bouton du catalogue de jeux (demande du chef du 18 nov.) | Alexis et son agent | #229 (`f07b9392`) | plan validé après coup par le coordinateur (21 nov.) ; **CI rouge** : `sessionsJeu.spec.cjs` l. 49 attend plus d'un bouton « Lancer « … » en classe » (run 44640514265) | 21 nov. : **à corriger** | — |
| STA | STA-01 offres de stage (espace Carrière), avec la gratification | Alexis et son agent (Qoder) | #230 (`2c3abada`) | plan et code arrivés ensemble ; CI verte ; **ne pas fusionner** avant le plan validé par le chef : devise par défaut MAD (EP-5), migration 0083 (réservée le 21 nov.), route publique sans compte | 21 nov. : **au chef** | — |
| EDT | EDT-04 publication de l'emploi du temps : PDF et courriels selon l'école | Alexis et son agent | `feat/edt-04-publication` (à créer depuis `origin/main`) | exception hors chantier du chef (21 nov.) ; après les corrections de #229 et #230 ; plan au chef (le PDF et les courriels touchent au produit ; COM-01 n'existe pas encore) | 21 nov. | [edt-04-publication](missions/edt-04-publication.md) |
| QUA | fusion des études restées sur des branches | agent de Cursor | une branche par PR | #191, #192, #189, #186 et #190 fusionnées le 21 nov. ; #188 fermée ; #169 et #234 fusionnées le 22 nov. ; **#193 mise à jour** (`6fa8a5b0`, conflit du tableau QJE résolu) : prête, en dernier | 22 nov. 16 h 40 : #193 **prête** | [fusion-etudes](missions/fusion-etudes.md) |
| — | question d'Alexis : quel lot après STA-01 (EDT-04 proposé) ; constats : RHP-01 et EDT-02 seraient faits, COU-06 dormant (devoirs fermés) | Alexis | #231 (document) | le chef a répondu le 21 nov. : EDT-04 après les corrections de #229 et #230 ; « Q-30 » déjà pris par #194 : à renuméroter à l'inscription | 26 nov. : le chef la ferme (`gh pr close 231`) | — |
| DOC | DOC-03 autorisations de sortie des parents, et cinq compléments au plan de parité | Codex (18 nov.) | `doc/doc-03-complements-parite` (locale, 4 commits, jamais poussée) | plan écrit ; validé par le chef comme premier lot **après VSC-02, ADM-05 et COM-01** ; arbitrages 2 à 4 ouverts ; **reste en local jusqu'à l'étape 6** (chef, 21 nov.) ; touche le README du plan : garder le § 2 du 21 nov. à la mise à jour | 21 nov. : gardée en local | — |
| VIT | plus tard : vidéos de motion design sur les captures, et lien « Ressources » (VIT-03) avec elles | — | — | décisions du chef du 18 nov. ([plan du site](../conception/vitrine/vit-vitrine.md), § 3 bis) | 18 nov. | [vit-equipe](missions/vit-equipe.md) |
| VIT | suite de VIT-20 (n° 1 de la file de Codex) : VIT-22 (#263, visée : à coder), VIT-20d (#261, 3 lignes de l'Espace de cours à reproposer), VIT-21 (#262, phrases du dépôt de fichiers à reproposer), puis VIT-20f (17 logos de VIT-09c, débloquée par #259) | **Codex**, son modèle le plus fort | #261, #262, #263 ; branches à mettre à jour (48 commits de retard) | **VIT-22 (#263) : phase b faite, poussée, CI verte, relue le 26 nov. : prête** ; **VIT-20d (#261)** : lignes S1 à S3 de l'Espace de cours reproposées (`cafbf767`), **visées par le chef le 26 nov.**, visa écrit sur #261 à 8 h 20 ; **phase (b) codée** (`main` fusionnée `089cf51a`, code `be94ac41`, fiche `0a709965`), **relue le 26 nov. : prête**, à pousser ; puis VIT-21 (#262, `git merge origin/main` puis phrases à reproposer), puis VIT-20f | 26 nov. 9 h 10 : #263 et #261 prêtes | [vit-20-equipe](missions/vit-20-equipe.md) |
| EXP | suite de l'audit (#198, fusionnée) : partie `vitrine/` le 27 nov. avec la montée d'Astro (n° 3 de la file de l'agent de Cursor) ; revue de l'exception picomatch avant le 18 déc. | agent de Cursor pour `vitrine/`, **après Q-37** | `fix/audit-vitrine` (à créer le 27 nov.) | **mission remise le 26 nov.** : le site passe sous `scripts/audit.mjs`, Astro 7.4.5 et `@astrojs/react` 7.1.2 montés à la dernière 7.x qui a 14 jours ; § 7 « Exécution » du plan d'abord, validé par le coordinateur | 26 nov. : fiche écrite | [fix-audit-vitrine](missions/fix-audit-vitrine.md) |
| STA | STA-01 offres de stage, fiche publique comprise | Alexis (Destroya2) | #230 | plan validé par le chef le 26 nov. ; à corriger : découpage d'`OffresStage.jsx`, conflit `App.jsx`, `i18n/index.js`, `publiee_le`, devise sans défaut | 26 nov. | — |
| QUA | QUA-02 découper les fichiers trop longs, un fichier par branche : `salleController` (247 lignes) d'abord, puis, signalés par le lint de la CI le 26 nov., `frontend/src/App.jsx` (436), `frontend/src/pages/Annonces.jsx` (435), `frontend/src/design-system/board/DepartureBoard.jsx` (403) | **Alexis** (choix du chef, 26 nov.), après ses corrections de #265, #230, #229, #269 et #270 | `refactor/qua-02-<fichier>`, une par fichier | à faire ; avertissements anciens, aucun ne bloque la CI ; plan court par fichier, validé par le coordinateur | 26 nov. | [qua-02](missions/qua-02.md) |
| VIT | VIT-09d : les 20 logos redessinés dans le style du logo Planner, deux séries (A : tuile bleu nuit commune ; B : teinte de chaque application), à comparer aux logos actuels de Codex ; le chef choisit, puis le choix remplace les logos (demande du chef, 26 nov.) | **session Claude neuve** (Fable 5.2, sinon Opus 5.5), choix du chef | `feat/vit-09d-logos-style-planner` (à créer) | plan court au coordinateur, essai sur trois logos, puis la série et la planche ; **VIT-20f attend le choix** | 26 nov. : fiche écrite | [vit-09d-logos-style-planner](missions/vit-09d-logos-style-planner.md) |
| QUA | correctif : `MesAffectations.jsx:28`, `useEffect` sans la dépendance `loadAffectations` (n° 2 de la file de Codex) | Codex | `fix/mes-affectations-useeffect` (à créer) | plan court à écrire, validé par le coordinateur | 26 nov. | [fix-mes-affectations-useeffect](missions/fix-mes-affectations-useeffect.md) |
| — | étude : ce qui manque dans les parcours, rôle par rôle (demande du chef du 26 nov. ; n° 4 de la file de Codex) | Codex, son modèle le plus fort | `etude/parcours-par-role` (à créer) | plan d'étude à écrire, validé par le coordinateur ; sans code | 26 nov. | [etude-parcours-par-role](missions/etude-parcours-par-role.md) |
| QUA | correctif de neutralité : « HESTIM Planner » dans `EMAIL_FROM` et « planner.hestim.ma » dans un commentaire de `backend/.env.example` (Q-37) ; la vérification de neutralité lit aussi ce fichier | **agent de Cursor** (choix du chef, 26 nov.) | `fix/neutralite-env-example` (`d7c5850b`, locale) | **plan court validé par le coordinateur le 26 nov.** (`481f5ae3`, questions 1 à 3 acceptées) ; code à faire, puis la mission `fix-audit-vitrine` le 27 nov. | 26 nov. 9 h 10 : plan validé | [fix-neutralite-env-example](missions/fix-neutralite-env-example.md) |
| UIX | `lucide-react` en `^1.68.0` dans `frontend/` (commit du chef `5b9f307d`, passé sur une branche, décision du 25 nov.) | chef | `chore/lucide-react-mineures` (locale) | **relue le 26 nov. : prête pour la PR** ; le verrou garde 1.68.0, rien ne change à l'installation tant qu'on ne met pas à jour ; fusion sans conflit avec `main` | 26 nov. : prête | — |
| EDT | EDT-04 (#265) : libellé « Format du supérieur » à corriger (décision du chef du 25 nov.) ; #264, #266 et #267 fusionnées le 26 nov. | Alexis (Destroya2) | #265 | à corriger | 25 nov. 23 h 40 | — |

Hors chantier, PR ouvertes : #194 (essai PostgreSQL, brouillon), #193 (plan de parité avec OpenEduCat, fusion automatique), #242 (étude 15, modules vendables et packs), #231 (question d'Alexis, répondue), #168 (kit vidéo MKT-05 et MKT-09), #53 (vidéo promo, octobre). Fusionnées le 21 nov. : #222, #226, #232, #233, #191, #192, #221, #189 et #186 (8 h 33), puis #235, #228, #238, #239 (18 h 42 à 18 h 48), **#237 (20 h 21), #243 (VIT-18b, 20 h 58), #190 (22 h 46), #240 (UIX-11, 22 h 49), #246 (correction de `/ar/`, 23 h 27), #241 (QUA-10, 23 h 55), #245 (UIX-06c, 23 h 56), #247 (correctif d'UIX-11, 23 h 59)** ; le 22 nov. : **#169 (modèle économique, 0 h 58), #234 (études 13 et 14, 1 h 06), #250 (VIT-19, 8 h 52), #236 (VIT-11), #248 (plan de QJE-14), #249 (étude StudyLib), #244 (cache Maven), 9 h 28, #251 (UIX-10d, 9 h 38)** ; #188 fermée. La CI du site est de nouveau verte sur `main` depuis #246. La PR de coordination est #211.

## Numéros de migration réservés

Réserver ici **avant** d'écrire une migration. Le moteur de migrations (Umzug) applique toute migration absente de `SequelizeMeta`, même hors d'ordre : un trou dans la numérotation est sans danger.

| Numéro | Fonction | État |
|---|---|---|
| 0059 | COU-01 sondages (EC-9) | fusionnée |
| 0060 | UIX-01 socle neutre | réservée |
| 0061 | MOT-01 valeurs du moteur (MP-1) | fusionnée (#156, 10 nov.) |
| 0062 à 0079 | VSC-01 et suivantes : tables du scolaire ; **0064 : Q-20, l'identifiant de connexion (#270), confirmée par le chef le 26 nov.** | réservées (0064 écrite, à corriger) |
| 0080 | MOT-13 contraintes déclarées (`ContrainteDeclaree`) | réservée |
| 0081 | MOT-13b reprise de la pause du vendredi et du samedi après-midi en contraintes déclarées | écrite (`feat/mot-13b-solveur`) |
| 0082 | QJE-04 : solution vue d'un défi de jeu (contrat des jeux, § 1.0) ; réservée le 10 nov. sous le numéro 0080, renumérotée le 15 nov. (0080 et 0081 prises par MOT-13) | écrite le 18 nov. (`backend/migrations/0082-jeux-solutions.js`), non appliquée |
| 0083 | STA-01 offres de stage (`OffresStage`), réservée par le coordinateur le 21 nov. ; plan validé par le chef le 26 nov. (devise sans défaut) | écrite (#230), à corriger |
| 0084 | QJE-14a : migration A (nature, anonyme, sections, sauts, « obligatoire », copie figée, interrupteur `questionnaires_actifs`) ; réservée par le coordinateur le 22 nov. | réservée |
| 0085 | QJE-14c : migration B (`ReponsesAnonymes`, `ParticipationsAnonymes`, sans horodatage) ; réservée le 22 nov. | réservée |
| 0086 | QJE-14e : migration C (`SessionsQuizGroupes`, recopie de `id_groupe`) ; réservée le 22 nov. | réservée |
| 0087 | BIB-05 : documents, notes, téléchargements de la Bibliothèque reconstruite, avec `uid` ; réservée le 22 nov. ; un deuxième numéro se demande au coordinateur | écrite (`feat/bib-05-modele-stockage`, `5691fe48`), non appliquée |
| 0088 | ADM-02 : reprise des anciens réglages (`parametresPlanning`) dans MP-1 ; réservée par le coordinateur le 22 nov. sur l'arbitrage du chef (plan de 9 h 37, réponse 15) | réservée |
| 0089 et plus | libres | — |

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
| [PLA-08](modules/PLA-plateforme.md) | Console de l'équipe Planner (créer, suspendre, voir l'état des écoles) | 7 | M | reporté |  |
| [PLA-09](modules/PLA-plateforme.md) | Migrations par vagues, hors du démarrage du serveur | 7 | M | reporté |  |
| [PLA-10](modules/PLA-plateforme.md) | Choisir son école à la connexion | 7 | M | reporté |  |
| [PLA-11](modules/PLA-plateforme.md) | Comptes communs | 7 | L | reporté |  |
| [PLA-12](modules/PLA-plateforme.md) | Export complet d'une école | 7 | M | à faire |  |
| [PLA-13](modules/PLA-plateforme.md) | Une école hors du Maroc configurée sans changer le code (fuseau, langue, devise) | 7 | M (+ L, conditionnel) | reporté |  |
| [EXP-01](modules/EXP-exploitation.md) | Nouveau serveur | 0 | S | fait (#172, 15 nov.) | #172 |
| [EXP-02](modules/EXP-exploitation.md) | Première installation conteneurisée à côté de n8n. Comprend | 1 | L | en cours : EXP-02a écrite (config locale, sans lancer) ; EXP-02b à faire | `feat/exp-02a-traefik` |
| [EXP-03](modules/EXP-exploitation.md) | ME-0b adapté au nouveau serveur | 1 | M | code fait (#145), adaptation à faire | #145 |
| [EXP-04](modules/EXP-exploitation.md) | Sauvegardes sur le nouveau serveur | 1 | M | à faire |  |
| [EXP-05](modules/EXP-exploitation.md) | Supervision en service | 1 | M | code fait, mise en service à faire | ME-21 |
| [EXP-06](modules/EXP-exploitation.md) | Premier administrateur d'une vraie école, sans le jeu de démonstration d'HESTIM… | 3 | S | à faire |  |
| [EXP-07](modules/EXP-exploitation.md) | Noms neutres | 2 | M | à faire |  |
| [EXP-08](modules/EXP-exploitation.md) | Test d'intrusion et de charge, avant que toute école extérieure utilise l'installation… | 3 | M | à faire |  |
| [EXP-09](modules/EXP-exploitation.md) | Mises à jour de ClassQuiz par la CI comme le reste, jusqu'à QJE-06 (la part de StudyLib est sans objet depuis la voie B) | libre | M | à faire |  |
| [MOT-01](modules/MOT-moteur.md) | Valeurs du moteur datées et résolues (profil, école, niveau) | 1 | M | fait (serveur, #156, 10 nov.) ; écrans avec ADM-02 | #156 |
| [MOT-02](modules/MOT-moteur.md) | Mesurer le solveur sur un jeu du supérieur (plusieurs campus, CM, TD, TP, vacataires), puis sur 20 000 étudiants ; le collège passe à l'étape 5 | 1 | M | **fait pour le supérieur** (#239, fusionnée le 21 nov.) : 12 passages complets et faisables sous 600 s (480 étudiants : 86 à 100 s ; 960 : 164 à 195 s ; pic 172 Mio) ; alerte de qualité souple à 960 transmise à MOT-04 ; 20 000 étudiants avec MOT-10 ; le collège à l'étape 5 | #239 |
| [MOT-03](modules/MOT-moteur.md) | Validation avant le calcul | 3 | M | fait : #183 fusionnée le 18 nov. | #183 |
| [MOT-04](modules/MOT-moteur.md) | Modèle neutre et évaluateur indépendant | 3 | L + M | à faire |  |
| [MOT-05](modules/MOT-moteur.md) | Profils et nomenclatures lus dans la base (cycle, niveau, classe, demi-groupe, groupe transversal), à la… | 2 | M + L | à faire |  |
| [MOT-06](modules/MOT-moteur.md) | Collège | 5 | XL | à faire |  |
| [MOT-07](modules/MOT-moteur.md) | Lycée | 5 | L | à faire |  |
| [MOT-08](modules/MOT-moteur.md) | File simple des calculs | 2 | M | à faire |  |
| [MOT-09](modules/MOT-moteur.md) | Remplaçant proposé automatiquement en cas d'absence d'un enseignant, validé en un geste, enseignants prévenus | 6 | M | à faire |  |
| [MOT-10](modules/MOT-moteur.md) | Grande échelle | 7 | L | à faire |  |
| [MOT-11](modules/MOT-moteur.md) | Règles nouvelles, famille par famille (examens dans le calcul F-8, ressources F-7,… | 7 | M par famille | à faire |  |
| [MOT-12](modules/MOT-moteur.md) | Montée du solveur : Spring Boot 3.3.5 vers 4.1, Timefold 1.15 vers 1.35 (cœur, sans le starter), Java 21 inchangé | 1 | M | fait (15 nov.) | #181 |
| [MOT-13](modules/MOT-moteur.md) | Contraintes déclarées par l'école (six modèles, liste « Déjà pris en compte », contrôle de place), en trois étapes 13a, 13b, 13c | 3 | M + L + M | 13a (#178) et 13b (#182) fusionnées le 15 nov. ; refus de l'activation fine (réponses 23 à 25) fusionné (#238, 21 nov.) ; **13c dans le chantier ADM, avec ADM-02** (chef, 21 nov.) | #238 |
| [EDT-01](modules/EDT-emploi-du-temps.md) | Changement structurel refusé une fois les séances générées (groupes, volumes), avec un… | 3 | S | à faire |  |
| [EDT-02](modules/EDT-emploi-du-temps.md) | Horaires saisonniers (ramadan, hiver, été) appliqués sans tout regénérer | 3 | M | à faire |  |
| [EDT-03](modules/EDT-emploi-du-temps.md) | Écran d'explication des conflits et des refus | 3 | M | à faire |  |
| [EDT-04](modules/EDT-emploi-du-temps.md) | Publication, PDF et courriels selon l'école | 3 | M | à faire : Alexis, après ses corrections de #229 et #230 (exception hors chantier du chef, 21 nov.) | |
| [EDT-05](modules/EDT-emploi-du-temps.md) | Paramètres datés complets | 7 | L | reporté |  |
| [ADM-01](modules/ADM-administration.md) | Habilitations à portée | 3 | M | à faire |  |
| [ADM-02](modules/ADM-administration.md) | Panneau de configuration de l'école | 3 | L | à faire : en tête d'ADM (ouvert le 21 nov.), avec MOT-13c ; fiche [adm-02](missions/adm-02.md) ; session Claude neuve ; plan au chef |  |
| [ADM-03](modules/ADM-administration.md) | Import | 3 | L | à faire |  |
| [ADM-04](modules/ADM-administration.md) | Assistant de démarrage avec un modèle par type d'école (EP-1) | 3 et 5 | L | à faire |  |
| [ADM-05](modules/ADM-administration.md) | Rôle parent | 6 | M | à faire |  |
| [ADM-06](modules/ADM-administration.md) | Clôture d'une année (lecture seule) et préparation de la suivante | 7 | L + M | à faire |  |
| [ADM-07](modules/ADM-administration.md) | Enseignants partagés entre écoles | 7 | M | à faire |  |
| [ADM-08](modules/ADM-administration.md) | Annuaire de l'école | — | M | reporté |  |
| [ADM-09](modules/ADM-administration.md) | Échanges OneRoster | — | M | reporté |  |
| [ADM-11](modules/ADM-administration.md) | Fériés selon le pays choisi par l'école, ou aucun (EP-5) | 3 | M | à faire : créée le 21 nov. (chef), après ADM-02 |  |
| [VSC-01](modules/VSC-vie-scolaire.md) | Modèle de données du scolaire (conception seule, avec diagrammes) | 1 | L | en cours : plan validé (chef, 18 nov.), conception écrite et corrigée, N7 ajouté (#215, poussée le 21 nov.) ; à relire par les groupes A et B, puis gelée sans code | #215 |
| [VSC-02](modules/VSC-vie-scolaire.md) | Élèves et familles | 6 | L | à faire |  |
| [VSC-03](modules/VSC-vie-scolaire.md) | Absences prévenues aux parents, justificatifs, saisie déléguée (EP-6) | 6 | M | à faire |  |
| [VSC-04](modules/VSC-vie-scolaire.md) | Notes et bulletins | 6 | XL | à faire |  |
| [VSC-06](modules/VSC-vie-scolaire.md) | Formation professionnelle | 4 | M | à faire |  |
| [VSC-07](modules/VSC-vie-scolaire.md) | Affectation des élèves aux groupes de langue et d'option | 5 | M | à faire |  |
| [VSC-08](modules/VSC-vie-scolaire.md) | Évaluations, crédits et jurys du supérieur (modèle commun avec VSC-04) | 3 | L | à faire : fonction créée par le chef le 21 nov. | |
| [COU-01](modules/COU-espace-de-cours.md) | Sondage de l'enseignant à sa classe | libre | S | fait (#148) | #148 |
| [COU-02](modules/COU-espace-de-cours.md) | Devoirs avec rendu de fichier, après une revue de sécurité (taille, type, antivirus,… | 3 | L | à faire |  |
| [COU-03](modules/COU-espace-de-cours.md) | Commentaires sur un support ou un devoir | 3 | M | à faire |  |
| [COU-04](modules/COU-espace-de-cours.md) | Questions partagées de la classe | 3 | M | à faire |  |
| [COU-05](modules/COU-espace-de-cours.md) | « Vu » | 3 | M | à faire |  |
| [COU-06](modules/COU-espace-de-cours.md) | Export des notes d'un devoir | 3 | S | à faire |  |
| [COU-08](modules/COU-espace-de-cours.md) | Messagerie, si les règles de modération sont tranchées (Q-17) | 5 | L | conditionnel |  |
| [COU-09](modules/COU-espace-de-cours.md) | LTI | — | L | reporté |  |
| [BIB-01](modules/BIB-bibliotheque.md) | Identifiants stables (`uid`) des entités partagées, et envois par boîte d'envoi (D-14, D-15) | 3 | M | **absorbée** par BIB-05 (voie B, 21 nov.) |  |
| [BIB-02](modules/BIB-bibliotheque.md) | StudyLib par école | 2 | M | **absorbée** : rangement par école dans BIB-05, test de PLA-04 (voie B, 21 nov.) |  |
| [BIB-03](modules/BIB-bibliotheque.md) | Médias du Studio quiz (images, sons, vidéos) hors de la base, dans le stockage de fichiers | 3 | M | à faire |  |
| [BIB-04](modules/BIB-bibliotheque.md) | Quiz généré par l'IA à partir d'un document de la Bibliothèque | 3 | M | à faire |  |
| [BIB-05](modules/BIB-bibliotheque.md) | Modèle et stockage S3 de la Bibliothèque reconstruite (B1, B2) | 3 | M + M | à faire : session « BIB » ; migration 0087 | |
| [BIB-06](modules/BIB-bibliotheque.md) | API des documents (B3) | 3 | L | à faire : session « BIB » | |
| [BIB-07](modules/BIB-bibliotheque.md) | Espace de cours sur le service interne (B5) | 3 | M | à faire : session « BIB » | |
| [BIB-08](modules/BIB-bibliotheque.md) | Reprise des données de l'école pilote (B7) | 3 | M | à faire : session « BIB », lancée par le chef | |
| [BIB-09](modules/BIB-bibliotheque.md) | Écrans web de la Bibliothèque (B4) | 3 | L | à faire : Claude (VS Code) | |
| [BIB-10](modules/BIB-bibliotheque.md) | Bibliothèque du mobile sur l'API de Planner (B6) | 3 | M | à faire : Claude (VS Code), après UIX-10d | |
| [BIB-11](modules/BIB-bibliotheque.md) | Import générique d'un dossier de documents (B8) | 3 | M | à faire : Alexis | |
| [QJE-01](modules/QJE-quiz-jeux-ia.md) | L'entrée « Quiz » du sélecteur d'espaces ouvre le Studio, plus ClassQuiz… | libre | S | fait : #208 fusionnée le 18 nov. (exception hors chantier) | #208 |
| [QJE-02](modules/QJE-quiz-jeux-ia.md) | Import des formats GIFT et Moodle XML dans le Studio | 3 | M | à faire |  |
| [QJE-03](modules/QJE-quiz-jeux-ia.md) | Joueur natif dans l'application, sans passer par le site | 2 | M | à faire, exception hors chantier accordée le 18 nov. ([sortie-classquiz](missions/sortie-classquiz.md)) |  |
| [QJE-04](modules/QJE-quiz-jeux-ia.md) | Fusion de `jeux-pedagogique` et ses quatre corrections | libre | M | fait : #196 fusionnée le 18 nov. ; migration 0082 écrite, à appliquer au prochain déploiement | `jeux-pedagogique` (Alexis) |
| [QJE-05](modules/QJE-quiz-jeux-ia.md) | Service des jeux à part, avec des gabarits | libre | L + M + M | à faire |  |
| [QJE-06](modules/QJE-quiz-jeux-ia.md) | Sortie complète de ClassQuiz | 2 | M | à faire, exception hors chantier accordée le 18 nov. ([sortie-classquiz](missions/sortie-classquiz.md)) |  |
| [QJE-07](modules/QJE-quiz-jeux-ia.md) | Fournisseur d'IA en production | 3 | M | à faire |  |
| [QJE-08](modules/QJE-quiz-jeux-ia.md) | Créateurs de jeux et leur rémunération | — | — | gelé |  |
| [QJE-09](modules/QJE-quiz-jeux-ia.md) | Défis Linux dans un quiz | — | M | reporté |  |
| [QJE-15](modules/QJE-quiz-jeux-ia.md) | Jeux rangés par niveau, puis par filière (site, web, mobile) | libre, exception du 18 nov. | M | à faire : fiche écrite le 18 nov. ; après VIT-10 | |
| [QJE-16](modules/QJE-quiz-jeux-ia.md) | Interrupteur de l'IA par école (aujourd'hui, la clé du serveur l'allume pour toutes) | 3 | à estimer | à faire, sans date : décision D2 du chef (18 nov.) ; une migration est probable, donc au chef | |
| [MOB-01](modules/MOB-application.md) | Essai sur un vrai téléphone (Android d'entrée de gamme), noté dans la recette | 3 | S | à faire |  |
| [MOB-02](modules/MOB-application.md) | Rôle enseignant | 3 | L | à faire |  |
| [MOB-03](modules/MOB-application.md) | Thème neutre et thème de l'école | 2 | M | à faire |  |
| [MOB-04](modules/MOB-application.md) | Trouver son école | 5 | M | reporté |  |
| [MOB-05](modules/MOB-application.md) | Espace parents | 6 | L | à faire |  |
| [MOB-06](modules/MOB-application.md) | Emploi du temps lisible hors ligne (EP-3) | 3 | M | à faire |  |
| [MOB-07](modules/MOB-application.md) | Adresse de l'API qui n'est plus figée à la construction (une application pour toutes… | 3 | M | à faire |  |
| [MOB-08](modules/MOB-application.md) | Appel à la main sans réseau, envoyé au retour du réseau avec l'heure de la saisie (N2) | 3 | M | à faire : fonction créée par le chef le 21 nov. (N2) ; plan avec l'étude EP-18 | |
| [MOB-09](modules/MOB-application.md) | pdf.js servi par l'application, plus aucun envoi vers cdnjs à la lecture d'un PDF (EP-13) ; numérotée MOB-08 le 16 nov., renumérotée le 21 nov. (coordinateur) | libre | S | à faire |  |
| [UIX-01](modules/UIX-interface.md) | Socle neutre | 2 | L | conçu, à coder ; UIX-01a (navigation, #184) fusionnée le 15 nov. ; UIX-06a (interface unifiée, #185) fusionnée le 16 nov. |  |
| [UIX-01a](modules/UIX-interface.md) | Accueil des applications et navigation web, exception autorisée par le chef le 15 nov. | libre | M | fait : #184 fusionnée, CI verte, 43 parcours | #184 |
| [UIX-02](modules/UIX-interface.md) | Vocabulaire des écrans selon le profil de l'école (classe et non groupe, matière et… | 5 | M | à faire |  |
| [UIX-03](modules/UIX-interface.md) | Accessibilité AA | 3 | M | en partie |  |
| [UIX-04](modules/UIX-interface.md) | Arabe complet | 6 | XL | à faire |  |
| [UIX-05](modules/UIX-interface.md) | Ton des messages du serveur | 3 | M | à faire |  |
| [UIX-06](modules/UIX-interface.md) | Style unifié entre les pages anciennes et récentes | 3 | M | en partie : UIX-06a (#185) et UIX-06b (#199) fusionnées ; UIX-06c à faire, sur la charte d'UIX-10b | #185, #199 |
| [UIX-06a](modules/UIX-interface.md) | Pilote web : marque mosaïque, connexion/navigation et Personnes | libre | — | fait : #185 fusionnée le 16 nov. | #185 |
| [UIX-06b](modules/UIX-interface.md) | Référentiel pédagogique : Filières, Groupes, Modules et Enseignements | libre | L | fait : #199 fusionnée le 18 nov. | #199 |
| [UIX-06c](modules/UIX-interface.md) | Salles, Campus, Créneaux et Calendrier | libre | M | **fait** (#245, fusionnée le 21 nov.) ; l'écart EP-5 des fériés passe à ADM-11 | #245 |
| [UIX-09](modules/UIX-interface.md) | Grille d'applications façon iCloud | libre | M | PR ouverte : #213, CI verte ; mention ISC à ajouter avant la fusion | #213 |
| [UIX-10](modules/UIX-interface.md) | Charte commune à toutes les plateformes, en cinq fonctions (10a à 10e ; 10g retirée, 10f sans objet le 22 nov.) | 3 | L | en cours : plan validé (#206) ; **UIX-10a** (#207) et **UIX-10b** (#235, 21 nov.) **faites** ; **10d en cours** (`feat/uix-10d-mobile-charte`) ; ensuite 10c, 10e | #206, #207, #235 |
| [UIX-11](modules/UIX-interface.md) | Tableau de bord de l'administration : refait à la charte, complété des données qui existent déjà, chaque chiffre menant à ses lignes | 3 | M | **fait** (#240, puis le correctif #247, fusionnées le 21 nov.) | #240, #247 |
| [VIT-01](modules/VIT-site-vitrine.md) | Conception | libre | M | fait : socle, accueil et cinq pages de fonctions (VIT-05 en préparation), #195 fusionnée le 18 nov. ; rien n'est en ligne | #195 |
| [VIT-02](modules/VIT-site-vitrine.md) | Une page et un formulaire de contact | libre | M | à faire |  |
| [VIT-03](modules/VIT-site-vitrine.md) | Centre d'aide | libre | M | à faire |  |
| [VIT-04](modules/VIT-site-vitrine.md) | Page d'état du service et journal des nouveautés de chaque version | 3 | S | à faire |  |
| [VIT-05](modules/VIT-site-vitrine.md) | Vitrine complète | quand la vente reprend | L | préparation dégelée le 18 nov. (sans tarifs ni mise en ligne) : cinq pages de fonctions (#195) et page Solutions (#203) fusionnées | #195, #203 |
| [VIT-06](modules/VIT-site-vitrine.md) | Mise en ligne du site sur un sous-domaine, non indexé | libre | M | plan (#212) et code (#221) fusionnés ; VIT-06b (journaux) ; déploiement après les douze conditions | #212, #221 |
| [VIT-07](modules/VIT-site-vitrine.md) | Contenu complet : toutes les applications présentées, Bibliothèque sortie de « Bientôt » (condition 5) | libre | M | fait : #214 et #217 (page des dix jeux) fusionnées le 18 nov. | #214, #217 |
| [VIT-08](modules/VIT-site-vitrine.md) | Vidéo de présentation globale sur l'accueil (condition 6) | libre | M | fait : #216 (18 nov.) et le nouveau rendu de deux phrases, #232 (21 nov.) | #216, #232 |
| [VIT-09](modules/VIT-site-vitrine.md) | Illustrations de toutes les pages : dessins en code, quelques captures neutres, première section améliorée (condition 7) ; 09a logos et icônes, 09b intégration, 09c logos et images des modules vendables | libre | M | 09a : fait (#222, 21 nov.) ; 09b : plan validé (#227, brouillon), code en dernier ; **09c : fiche écrite (21 nov.), Codex après VIT-11** | #222, #227 |
| [VIT-10](modules/VIT-site-vitrine.md) | Pages par rôle, menu « Solutions » ouvrant, pied de page complet (condition 8) | libre | M | fait : #219 fusionnée le 18 nov. | #219 |
| [VIT-11](modules/VIT-site-vitrine.md) | Catalogue de toutes les fonctionnalités, avec leur source dans le code, page FAQ et méga-menu « Fonctions » (conditions 9 et 10) | libre | M | PR ouverte : #236, reprise après #237 faite, **prête** si ses parcours sont verts (22 nov.) | #236 |
| [VIT-12](modules/VIT-site-vitrine.md) | Mentions légales et page de confidentialité du site (condition 2) | libre | S | PR ouverte : #223, attend les valeurs du chef | #223 |
| [VIT-10b](modules/VIT-site-vitrine.md) | Avant → avec et FAQ des pages par rôle (condition 10) | libre | S | fait : #226 fusionnée le 21 nov. | #226 |
| [VIT-13](modules/VIT-site-vitrine.md) | Fonctionnalités par type d'établissement (condition 10) | libre | M | à faire : fiche écrite le 18 nov. | |
| [VIT-14](modules/VIT-site-vitrine.md) | « Pourquoi Planner » : comparatif par approche, accueil et `/comparer/` (condition 10) ; VIT-14b, deux critères de plus | libre | M | fait : #224 (19 nov.) et #233 (21 nov.) | #224, #233 |
| [VIT-15](modules/VIT-site-vitrine.md) | Une page par module, avec le bloc « selon votre équipement » (condition 10) | libre | M | à faire : fiche écrite le 18 nov. ; **n'attend pas VIT-09c** : une place pour le logo et l'image (chef, 21 nov.) | |
| [VIT-16](modules/VIT-site-vitrine.md) | Page Contact complète et page À propos (conditions 10 et 11) | libre | S | plan écrit, attend les corrections du chef | `feat/vit-16-contact-a-propos` |
| [VIT-17](modules/VIT-site-vitrine.md) | Correctifs techniques du site : saut du menu, vidéo sur demande, pages `/ar/`, Open Graph, grilles, `README.md` (condition 12) | libre | S | **fait** (#237, puis #246 pour le contrôle de l'image, fusionnées le 21 nov.) | #237, #246 |
| [VIT-18](modules/VIT-site-vitrine.md) | Textes exacts du site : P1 à P6, D2, D3, D4, récit EP-18 (condition 10) | libre | S | **fait** (#228, fusionnée le 21 nov.) ; suite : VIT-18b | #228 |
| [VIT-19](modules/VIT-site-vitrine.md) | Contrôle d'EP-19 dans la CI du site : 200 Ko transférés au plus par page (N1) | 3 | S | en cours : plan validé par le coordinateur (21 nov.) ; code fait, **à corriger** (image fixe à compter, 22 nov.) ; agent de Cursor | `feat/vit-19-ep19-poids` |
| [VEN-01](modules/VEN-vente-modules.md) | Registre des modules | 2 | L | à faire ; **contenu validé par le chef le 21 nov.** : les 17 modules vendables et le socle, et trois états par fonction (ouverte, verrouillée et visible, absente) ([étude 15](../etude-marche/15-modules-et-packs.md), sur `etude/ven-modules-packs`) |  |
| [VEN-02](modules/VEN-vente-modules.md) | Cinq entretiens de terrain avec des directeurs d'écoles privées, séparés de toute… | 3 | S par entretien | à faire |  |
| [VEN-03](modules/VEN-vente-modules.md) | Abonnements et factures | — | L | gelé |  |
| [VEN-04](modules/VEN-vente-modules.md) | Essai gratuit avec filigrane, effacé après 60 jours | — | M | gelé |  |
| [VEN-05](modules/VEN-vente-modules.md) | Contrats (sous-traitance, conditions générales) | — | M | gelé |  |
| [VEN-06](modules/VEN-vente-modules.md) | Installation d'une école pilote | — | L | gelé |  |
| [VEN-07](modules/VEN-vente-modules.md) | Démonstration aux directeurs | — | M | gelé |  |
| [VEN-08](modules/VEN-vente-modules.md) | Offre d'IA payante (les plafonds techniques restent, dans QJE-07) | — | M | gelé |  |
| [VEN-09](modules/VEN-vente-modules.md) | Vidéos par lien dans le Studio quiz | — | M | gelé |  |
| [FIN-01](modules/FIN-finance-ecole.md) | Frais, échéanciers, caisse, reçus bilingues numérotés sans trou | 3 | XL | à faire |  |
| [FIN-02](modules/FIN-finance-ecole.md) | Relances, impayés, export comptable (EP-5) | 3 | L | à faire |  |
| [COM-01](modules/COM-communication.md) | Service commun d'envoi : application, push, courriel, SMS ; plages de silence, envoi différé, urgence, résumé (EP-7) | 6 | L | à faire |  |
| [COM-02](modules/COM-communication.md) | Compte famille pour plusieurs enfants, canal préféré, accusé de lecture | 6 | M | à faire |  |
| [COM-03](modules/COM-communication.md) | WhatsApp et crédits de messages prépayés, alerte avant épuisement | 6 | M | à faire |  |
| [ETA-01](modules/ETA-echanges-etat.md) | Cadre des connecteurs vers les systèmes d'État (contrôle avant envoi, envoi qu'on peut refaire) | 6 | L | à faire |  |
| [ETA-02](modules/ETA-echanges-etat.md) | Massar (ancienne VSC-05) | 6 | M | à faire |  |
| [ETA-03](modules/ETA-echanges-etat.md) | Un connecteur par autre pays visé | 7 | M par pays | reporté |  |
| [PAI-01](modules/PAI-paiements.md) | Rapprochement des paiements avec les reçus, référence unique par élève, alerte de paiement non imputé | 6 | L | à faire |  |
| [PAI-02](modules/PAI-paiements.md) | Paiement en ligne par carte et CMI, commission affichée sur le reçu | 6 | M | à faire |  |
| [PAI-03](modules/PAI-paiements.md) | Argent mobile par des agrégateurs, plusieurs devises | 7 | L | reporté |  |
| [RHP-01](modules/RHP-personnel-paie.md) | Relevé mensuel des heures des vacataires, à partir des séances visées (ancienne FIN-03) | 3 | M | à faire |  |
| [RHP-02](modules/RHP-personnel-paie.md) | Dossier de l'intervenant : contrat, autorisation de cumul, plafond d'heures, déclaration à l'AREF | 4 | M | à faire |  |
| [RHP-03](modules/RHP-personnel-paie.md) | Chaîne « prévu, fait, visé, payé », état signé, double validation des comptes bancaires, export vers la paie | 4 | L | à faire |  |
| [FOR-01](modules/FOR-formation-continue.md) | Sessions et cohortes, conventions, convocations | 4 | L | à faire |  |
| [FOR-02](modules/FOR-formation-continue.md) | Émargement signé par demi-journée, attestations | 4 | M | à faire |  |
| [FOR-03](modules/FOR-formation-continue.md) | Dossiers des financeurs (CSF, FDFP, 3FPT, OPCO, CPF), facturation à plusieurs payeurs | 4 | L | à faire |  |
| [FOR-04](modules/FOR-formation-continue.md) | Preuves qualité rangées par indicateur | 4 | M | à faire |  |
| [DOC-01](modules/DOC-documents-verifiables.md) | Certificats, attestations et relevés avec code de vérification | 3 | M | à faire |  |
| [DOC-02](modules/DOC-documents-verifiables.md) | Diplômes vérifiables, page de vérification, archivage, révocation | 3 | M | à faire |  |
| [INS-01](modules/INS-admissions.md) | Candidature en ligne, pièces, suivi des candidats, liste d'attente | 3 | L | à faire |  |
| [INS-02](modules/INS-admissions.md) | Acompte, contrat annuel signé, réinscription | 3 | M | à faire |  |
| [INS-03](modules/INS-admissions.md) | État d'accréditation de chaque filière | 3 | S | à faire |  |
| [PIL-01](modules/PIL-pilotage.md) | Trésorerie : encaissé, attendu, en retard, prévision | 7 | M | reporté |  |
| [PIL-02](modules/PIL-pilotage.md) | Présence des enseignants, avancement des notes, somme due aux vacataires | 7 | M | reporté |  |
| [GRP-01](modules/GRP-groupes-reseaux.md) | Vue consolidée sur plusieurs écoles | 7 | L | reporté |  |
| [GRP-02](modules/GRP-groupes-reseaux.md) | Paramètres communs avec dérogations, marque du réseau | 7 | M | reporté |  |
| [STA-01](modules/STA-stages-alternance.md) | Offres de stage (espace Carrière) (ancienne COU-07) | 3 | M | PR ouverte ; plan validé par le chef le 26 nov. (fiche publique acceptée, pas de devise par défaut) ; relue : à corriger | #230 |
| [STA-02](modules/STA-stages-alternance.md) | Conventions de stage, tuteur, présence en entreprise, apprentissage | 7 | M | reporté |  |
| [STA-03](modules/STA-stages-alternance.md) | Avis de stage et idées de projet, venus de StudyLib | 3 | M | à faire : Alexis, après EDT-04 et #230 | |
| [SER-01](modules/SER-services-annexes.md) | Cantine, transport et internat liés au compte famille, sans refus d'accès automatique | 7 | L | reporté |  |
| [STK-01](modules/STK-stocks-achats.md) | Inventaire, bons de commande validés, lien avec la vente | 7 | M | reporté |  |
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
| [VSC-09](modules/VSC-vie-scolaire.md) | Activités et clubs | 6 | M | à faire ; parité, placée le 26 nov. |  |
| [VSC-11](modules/VSC-vie-scolaire.md) | Mémoires et projets de fin d'études (sans VSC-02 depuis le 26 nov.) | 3 | M | à faire ; parité, placée le 26 nov. |  |
| [VSC-12](modules/VSC-vie-scolaire.md) | Choix des options et matières facultatives | 5 | M | à faire ; parité, placée le 26 nov. |  |
| [VSC-13](modules/VSC-vie-scolaire.md) | Discipline | 6 | M | à faire ; parité, placée le 26 nov. |  |
| [COU-10](modules/COU-espace-de-cours.md) | Cours en ligne | 4 | XL | à faire ; parité, placée le 26 nov. |  |
| [COU-11](modules/COU-espace-de-cours.md) | Classe virtuelle | 4 | M | à faire ; parité, placée le 26 nov. |  |
| [QJE-10](modules/QJE-quiz-jeux-ia.md) | Évaluation en ligne notée (note versée à VSC-08 depuis le 26 nov.) | 3 | M | à faire ; parité, placée le 26 nov. |  |
| [QJE-11](modules/QJE-quiz-jeux-ia.md) | Correction de QCM papier par photo | 6 | L | à faire ; parité, placée le 26 nov. |  |
| [SER-02](modules/SER-services-annexes.md) | Transport | 7 | M | reporté (avec SER-01) ; parité, placée le 26 nov. |  |
| [SER-03](modules/SER-services-annexes.md) | Internat | 7 | M | reporté (avec SER-01) ; parité, placée le 26 nov. |  |
| [EDT-06](modules/EDT-emploi-du-temps.md) | Convocations aux examens (sans VSC-02 depuis le 26 nov.) | 3 | S | à faire ; parité, placée le 26 nov. |  |
| [INS-04](modules/INS-admissions.md) | Prospects et campagnes | 6 | M | à faire ; parité, placée le 26 nov. |  |
| [COM-04](modules/COM-communication.md) | Guichet des demandes | 6 | M | à faire ; parité, placée le 26 nov. |  |
| [COM-05](modules/COM-communication.md) | Réunions parents-enseignants | 6 | M | à faire ; parité, placée le 26 nov. |  |
| [ADM-10](modules/ADM-administration.md) | Champs et listes propres à l'école, sans code | 5 | L | à faire ; parité, placée le 26 nov. |  |
| [PIL-03](modules/PIL-pilotage.md) | Rapports à la demande | 7 | L | à faire ; parité, placée le 26 nov. |  |
| [FIN-04](modules/FIN-finance-ecole.md) | Bourses, remises et remboursements (après VEN-02) | 3 | M | à faire ; parité, placée le 26 nov. |  |
| [FIN-05](modules/FIN-finance-ecole.md) | Échange comptable relu | 6 | M | à faire ; parité, placée le 26 nov. |  |
| [RHP-04](modules/RHP-personnel-paie.md) | Congés et absences du personnel | 6 | M | à faire ; parité, placée le 26 nov. |  |
| [STA-04](modules/STA-stages-alternance.md) | Anciens élèves | 7 | M | à faire ; parité, placée le 26 nov. |  |
| [MOB-10](modules/MOB-application.md) | Rôle de la scolarité et de la direction sur le téléphone | 6 | M | à faire ; parité, placée le 26 nov. |  |

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
