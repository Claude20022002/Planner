# Feuille de route et files de travail des agents · à partir du 18 novembre 2026

Ce fichier dit **ce que chaque agent fait ensuite, dans l'ordre**, pour que le travail continue quand le coordinateur est en pause. Il est tenu par le coordinateur. L'état fin des fonctions est dans [suivi.md](suivi.md), et les décisions sont dans [decisions.md](decisions.md).

## Règles pendant la pause du coordinateur (décision du chef, 18 nov.)

**Le coordinateur a repris le 18 nov. à 17 h.** Il valide de nouveau les plans S et M sans migration, sécurité, donnée d'élève ni choix de produit ; les autres restent au chef. Les règles 2 à 7 restent valables, et reviennent à chaque nouvelle pause.

1. **Le chef valide tous les plans**, y compris ceux de taille S et M que le coordinateur validait.
2. **Le chef fusionne seulement une PR entièrement verte**, dont l'agent a déposé son rapport. Il n'utilise jamais `--admin` ni `--auto`. Après un push, il attend une minute avant `gh pr checks <n> --watch`.
3. **Chaque agent suit sa file, dans l'ordre.** Une mission ne commence que quand la précédente est commitée, que son rapport est déposé dans `sortie\` (Codex, Cursor) ou donné au chef (Claude), et que son plan est validé s'il en faut un.
4. **Personne ne modifie `docs/plan/suivi.md`**, sauf le coordinateur. L'état de chaque fonction va dans sa fiche de session, et le coordinateur le reporte à son retour.
5. **Une question, une proposition.** Ce qui touche au produit, au serveur, aux migrations, à la sécurité, aux données d'élèves ou aux dépôts voisins remonte au chef. L'agent l'écrit et attend : il ne suppose rien.
6. **Une file vide** : l'agent le dit au chef et attend. Il ne prend pas une fonction hors de sa file.
7. Toutes les règles d'`AGENTS.md` restent valables : une branche par tâche, le plan avant le code, `git add <fichiers>`, jamais de `git push`.

## Les étapes, telles que le chef les a fixées

| Étape | Contenu | Où dans le plan |
|---|---|---|
| **1. Site vitrine et charte** (en cours) | site au style Apple ; page Solutions ; mise en ligne sur un sous-domaine dès que le site est prêt ; charte commune à toutes les plateformes | VIT-01, VIT-05 (préparation), **VIT-06**, **UIX-10** (10a à 10f, sans 10g) |
| **2. L'espace de l'école** | connexion des administrateurs et leur grille des modules ; tableau de bord de gestion de l'administration ; pages des enseignants et des étudiants au style de la charte | UIX-09, **UIX-10b**, UIX-06c, UIX-10c à 10e ; **UIX-11**, le tableau de bord de l'administration, refait à la charte et complété des données qui existent ([fiche](missions/uix-11-tableau-de-bord.md), Claude de VS Code après UIX-10b ; chef, 18 nov.) |
| **3. Le supérieur jusqu'au bout** (chef, 21 nov.) | **une deuxième école du supérieur, autre que HESTIM, se configure seule et tourne un semestre complet** : emploi du temps, appel, examens, évaluations, crédits et jurys (VSC-08), cours, quiz, bibliothèque, stages, inscriptions, documents vérifiables, frais | la liste du [README du plan](README.md), § 2, étape 3. **Le chantier ADM s'ouvre dès que MOT se ferme** (à la place de VSC). Les modules du plan de parité (#193) qui servent le supérieur y entrent ; certains vont à Alexis |
| **4. Puis on descend** | la formation professionnelle, puis le lycée, puis le collège (VSC-02 à VSC-07, UIX-02, ADM-05, MOB-05), puis le primaire et la maternelle | README du plan, § 2, étapes 4 à 6. VSC-01 (#215) se termine comme conception, avec N7, puis se gèle sans code |

Les sorties de ClassQuiz (QJE-01, QJE-03, QJE-06) et le Studio « comme Google Forms » (QJE-14) avancent en parallèle, par l'exception accordée le 18 nov. QJE-15 (jeux rangés par niveau) et VIT-13 (fonctionnalités par type d'établissement) restent dans les files, mais le supérieur y passe en premier et le collège et le lycée restent « Bientôt » (D4).

## Principes qui valent pour toutes les étapes (chef, 18 et 21 nov.)

- **Le supérieur d'abord, conçu pour tous** (21 nov.) : on construit pour le supérieur ; le modèle de données, le moteur et les textes restent neutres, pour que la descente vers le scolaire n'oblige à rien recoder.
- **Les études servent à chaque plan** (21 nov.) : la [synthèse des concurrents](../etude-marche/14-reprendre-et-depasser.md) est le registre ; chaque plan a la section « Ce que disent les études » du modèle de conception, sinon il n'est pas validé.

- **EP-18, tous les contextes** : chaque fonction marche sans téléphone de l'élève, avec peu ou pas de connexion, et avec ce qu'a l'école (un écran projeté, du papier). Chaque plan dit comment il le tient. Un plan qui ne le dit pas n'est pas validé.
- **Aucun pays supposé** : les outils de l'État sont ceux du pays de l'école (Massar au Maroc ; les autres par ETA-03). Aucun écran ni aucun texte ne nomme Massar comme s'il était seul.
- **Étude « contextes à faible équipement »** ([fiche](missions/etude-ep18-faible-equipement.md)) : elle passe en revue chaque fonction existante (appel, quiz, jeux, espace de cours, bibliothèque, mobile) sous l'angle d'EP-18 : ce qui marche déjà sans téléphone ni connexion, ce qui manque (feuille d'appel imprimée, quiz sur papier, mode hors ligne MOB-06, SMS), et l'ordre des correctifs. Confiée à **une nouvelle session Claude** (chef, 18 nov. vers 17 h 15).

## Conditions de la mise en ligne du site (VIT-06)

Le site part sur le sous-domaine quand les **douze** sont réunies (les conditions 5 à 10 ont été ajoutées par le chef le 18 nov., 11 et 12 le 19 nov. d'après l'[expertise du site](../etude-marche/12-expertise-site-vitrine.md)). Ordre des fusions sur le site (coordinateur, révisé le 21 nov. ; #224 et #225 fusionnées le 19 nov.) : #222 (VIT-09a), #226 (VIT-10b), #228 (VIT-18), #232 (VIT-08, nouveau rendu), #233 (VIT-14b), #221 (VIT-06), puis VIT-17, #223 (VIT-12, après les valeurs du chef), VIT-16, VIT-11 (code), VIT-13, VIT-15, et VIT-09b en dernier :
1. l'audit de `vitrine/` et la montée d'Astro, le 27 nov. ou après (file de l'agent de Cursor, n° 3) ;
2. les mentions légales et la page de confidentialité, dont le texte est décidé par le chef ([VIT-12](missions/vit-12-pages-legales.md), nouvelle session Claude) ;
3. les SVG officiels des logos, fournis par le chef (#220, logos posés et charte en version 2) ;
4. le site non indexé tant qu'il est sur le sous-domaine ;
5. **le contenu complet** : toutes les applications présentées (Quiz et jeux, Bibliothèque, Espace de cours et annonces, Application mobile), et la Bibliothèque sortie de « Bientôt » ([VIT-07](missions/vit-07-contenu-complet.md), agent de Cursor) ;
6. **la vidéo de présentation globale** sur l'accueil, en motion design, sous-titrée, sans voix ([VIT-08](missions/vit-08-video-presentation.md), Claude de VS Code) ;
7. **les illustrations** sur toutes les pages : dessins en code, quelques captures réelles sans nom d'école ni donnée réelle, première section de chaque page améliorée ([VIT-09](missions/vit-09-illustrations.md), Claude de VS Code, en dernier) ;
8. **les pages par rôle**, le menu « Solutions » ouvrant et le pied de page complet ([VIT-10](missions/vit-10-pages-par-role.md), agent de Cursor) ;
9. **le catalogue des fonctionnalités et la FAQ** ([VIT-11](missions/vit-11-catalogue-faq.md), Codex) ;
10. **les ajouts d'après OpenEduCat** ([relevé du site](../etude-marche/11-chemins-site-openeducat.md)) :
    - avant → avec et FAQ par rôle ([VIT-10b](missions/vit-10b-avant-avec-faq.md), agent de Cursor) ;
    - les fonctionnalités par type d'établissement ([VIT-13](missions/vit-13-pourquoi-et-types.md), agent de Cursor) ;
    - le méga-menu « Fonctions » (dans VIT-11, Codex) ;
    - « Pourquoi Planner », un comparatif par approche sans nommer de concurrent ([VIT-14](missions/vit-14-comparatif.md), nouvelle session Claude) ;
    - une page par module, avec un bloc « selon votre équipement » ([VIT-15](missions/vit-15-pages-modules.md), Codex) ;
    - Contact et À propos ([VIT-16](missions/vit-16-contact-a-propos.md), la session de VIT-12) ;
    - les logos illustrés et les icônes vivantes (VIT-09a, Claude de VS Code) ;
    - les textes exacts de l'expertise : P1 à P6, D2, D3, D4, le récit EP-18 ([VIT-18](missions/vit-18-textes-exacts.md), la session de l'expertise) ;
11. **un contact réel** : une adresse e-mail publiée, avec « réponse sous deux jours ouvrés » (D1 ; [VIT-16](missions/vit-16-contact-a-propos.md)) ;
12. **aucun saut du menu sur téléphone**, et une performance mobile d'au moins 90 sur l'accueil ([VIT-17](missions/vit-17-correctifs-vitrine.md), agent de Cursor).

Le plan de VIT-06 (file de Codex) se valide avant, pour que le déploiement parte le jour même.

## Files de travail

### Codex : son modèle le plus fort, avec un raisonnement élevé

| N° | Mission | Fiche | Validé par |
|---|---|---|---|
| 1 | ~~UIX-06b (#199)~~ **fait** : fusionnée le 18 nov. (`ae8e814c`) | [uix-06b-equipe](missions/uix-06b-equipe.md) | — |
| 2 | ~~VIT-06, plan court~~ **fait** : validé par le chef, #212 (CI verte) ; reste les conditions 8 et 9 à inscrire (consigne de 18 h 40) | [vit-06-mise-en-ligne](missions/vit-06-mise-en-ligne.md) | chef (fait) |
| 3 | **UIX-09** : #213, CI verte ; ajouter la mention ISC de Lucide au fichier LICENSE, puis fusion (consigne de 18 h 40) | [vit-equipe](missions/vit-equipe.md) | déjà validé |
| 4 | **VSC-01, modèle de données du scolaire** : conception écrite, #215 ; **à corriger** (`suivi.md` à reprendre de `main`, une section EP-18, l'identifiant national sans supposer le Maroc), puis l'avis des groupes A et B, organisé par le chef | module VSC | chef |
| 4 bis | **VIT-11, le catalogue des fonctionnalités, la FAQ et le méga-menu « Fonctions » par catégorie** (conditions 9 et 10) : plan validé (#218) ; le méga-menu ajouté par le chef ; le code après la fusion de VIT-10 | [vit-11-catalogue-faq](missions/vit-11-catalogue-faq.md) | chef (fait) ; le méga-menu, au chef dans un complément du plan |
| 4 ter | ~~VIT-06, le code~~ **prête** : #221, CI verte, conflit résolu, douze conditions inscrites ; le chef la fusionne (21 nov.) après `git merge origin/main` si le fichier du module VIT a bougé | [vit-06-mise-en-ligne](missions/vit-06-mise-en-ligne.md) | chef (fait) |
| 4 ter bis | **VIT-06b, la conservation des journaux de la vitrine** (Nginx et Traefik, `VITRINE_JOURNAUX_JOURS`) : complément de plan, puis code dans `deploy/`, avant le jour du déploiement. Attend `N` (VIT-12) et le relevé de la configuration Traefik du VPS, que le chef lance (commande dans la fiche de session de VIT-06 du 19 nov.) | [vit-06-mise-en-ligne](missions/vit-06-mise-en-ligne.md) | chef (serveur) |
| 4 ter ter | **MOT-02, la mesure sur un jeu du supérieur** (plusieurs campus, CM, TD, TP, vacataires), sur `etude/mot-02-mesure-solveur` : complément de plan au chef, puis la mesure. Juste après le code de VIT-11 : c'est ce qui ferme MOT et ouvre ADM (chef, 21 nov.). Et dans #215 (VSC-01) : **N7**, plusieurs systèmes d'évaluation par classe dans une même école, avant l'avis des groupes A et B | [mot-02](missions/mot-02.md) ; module VSC | chef |
| 4 quater | **VIT-15, une page par module** (condition 10), construite depuis le registre de VIT-11, avec le bloc « selon votre équipement » (sans wifi, sans écran, sans téléphone de l'élève), qui reprend les phrases C5 de l'expertise et ajoute l'emploi du temps imprimé en PDF : après le code de VIT-11 | [vit-15-pages-modules](missions/vit-15-pages-modules.md) | chef |
| 5 | QJE-03, joueur natif ; puis QJE-06, plus aucun conteneur ClassQuiz (après le transfert vérifié des quiz de l'école pilote) | [sortie-classquiz](missions/sortie-classquiz.md) | chef |
| 6 | VIT-06, le déploiement, le jour où les dix conditions sont réunies : le chef lance les commandes du serveur | [vit-06-mise-en-ligne](missions/vit-06-mise-en-ligne.md) | chef |

### Agent de Cursor : Grok 4.7 high, pour les tâches bornées au plan validé

| N° | Mission | Fiche | Validé par |
|---|---|---|---|
| 1 | ~~QJE-01~~ **fait** : #208 fusionnée le 18 nov. | [sortie-classquiz](missions/sortie-classquiz.md) | chef (fait) |
| 2 | ~~VIT-07~~ **prête** : #214, CI verte, relue par le coordinateur | [vit-07-contenu-complet](missions/vit-07-contenu-complet.md) | chef (fait) |
| 2 ter | **VIT-10, pages par rôle, menu « Solutions » ouvrant, pied de page complet** (condition 8) : plan court après la fusion de #214 | [vit-10-pages-par-role](missions/vit-10-pages-par-role.md) | chef |
| 2 quater | ~~VIT-10b~~ **prête** : #226, avec C8 (`ff08fffd`, à pousser) | [vit-10b-avant-avec-faq](missions/vit-10b-avant-avec-faq.md) | chef (fait) ; C8 : coordinateur (fait) |
| 2 quater bis | **VIT-17, les correctifs techniques du site** (lot A de l'expertise ; condition 12) : plan **validé par le coordinateur le 21 nov.** avec corrections (plan commité seul ; `git merge origin/main`, puis `cheminsLangues()` aussi sur `/comparer/` ; mesures Lighthouse avant et après). Bouton : « Lire la vidéo » / « Play the video » (chef, 21 nov.). Code en local, non commité | [vit-17-correctifs-vitrine](missions/vit-17-correctifs-vitrine.md) | coordinateur (fait) ; bouton : chef (fait) |
| 2 quater ter | **VIT-19, le contrôle d'EP-19 dans la CI du site** (N1, chef, 21 nov.) : la CI de `vitrine/` échoue quand une page dépasse 200 Ko transférés, hors média lancé à la demande. Plan court, après VIT-17. Après la mise en ligne, **VIT-04 (page d'état) passe avant VIT-03** (N5) | module VIT | coordinateur (S, sans texte ni donnée) |
| 2 quinquies | **VIT-13, les fonctionnalités par type d'établissement** (condition 10 ; « Pourquoi Planner » est passé à VIT-14) : plan court maintenant, code après VIT-18 (qui change l'ordre des types et `solutions.json`) | [vit-13-pourquoi-et-types](missions/vit-13-pourquoi-et-types.md) | chef |
| 2 sexies | **QJE-15, les jeux rangés par niveau puis par filière**, sur le site et dans l'application (exception hors chantier du chef). Plan court après VIT-10 | [qje-15-jeux-par-niveau](missions/qje-15-jeux-par-niveau.md) | chef |
| 2 bis | ~~Parcours vers minuit~~ **fait** : #210 fusionnée le 18 nov. | [plan](../conception/qualite/fix-parcours-seance-en-cours.md) | chef (fait) |
| 3 | **Audit de `vitrine/` et montée d'Astro, le 27 nov. ou après** (pas avant : la règle des deux semaines) : `astro` 7.4.12 et `@astrojs/react` 7.1.9, exceptions de `vitrine/` dans `deploy/audit-exceptions.json`, `node ../scripts/audit.mjs vitrine` dans `vitrine.yml`. Branche `fix/audit-vitrine`. C'est la condition 1 de VIT-06 | [plan de l'audit](../conception/exploitation/fix-audit-dependances.md), § 2 point 4 et § 6 | déjà validé |
| 4 | UIX-10e, les jeux web et mobile avec l'accent « jeu », après UIX-10b et UIX-10d | [plan d'UIX-10](../conception/interface/uix-10-charte-commune.md), § 9 | chef pendant la pause |

### Claude (VS Code) : la session de la charte ; le modèle le plus capable de la session

| N° | Mission | Fiche | Validé par |
|---|---|---|---|
| 1 | ~~UIX-10a~~ **fait** : #207 fusionnée le 18 nov., relue après coup (conforme) | [uix-10a-source-charte](missions/uix-10a-source-charte.md) | coordinateur (fait) |
| 1 bis | ~~VIT-08~~ **fait** : #216 fusionnée le 18 nov. Deux phrases (`scenes.4`, `scenes.7`) changent au prochain rendu, après les visas de VIT-18 | [vit-08-video-presentation](missions/vit-08-video-presentation.md) | chef (fait) |
| 1 ter | ~~VIT-09a~~ **prête** : #222, conflit résolu, CI verte | [vit-09-illustrations](missions/vit-09-illustrations.md) | chef (fait) |
| 1 quater | **VIT-09b, l'intégration** (condition 7), avec C2, C3 et C10 de l'expertise : plan **validé par le chef** (#227, brouillon) ; **le code en dernier sur le site** | [vit-09-illustrations](missions/vit-09-illustrations.md) | chef (fait) |
| 1 quinquies | ~~VIT-08, deux phrases de la vidéo~~ **rendu fait** : #232 ; juste après #228, `git merge origin/main` et retrait de l'exception de `vitrine/tests/contenu.test.js` | [vit-18-textes-exacts](missions/vit-18-textes-exacts.md), § 6 | chef (les phrases, dans VIT-18) |
| 2 | **UIX-10b**, l'application web à la charte : plan court **validé par le chef le 21 nov.** (`d5268ec0`), code en cours (étape 2) | plan d'UIX-10, § 9 | chef (fait) |
| 2 bis | **UIX-11, le tableau de bord de l'administration** : refait à la charte, complété des chiffres qui existent, chaque chiffre menant à ses lignes. Plan court, après UIX-10b | [uix-11-tableau-de-bord](missions/uix-11-tableau-de-bord.md) | coordinateur, ou chef si une route ou une donnée d'élève s'ajoute |
| 3 | UIX-06c, Salles, Campus, Créneaux et Calendrier : son plan est validé et attendait UIX-10. Il se fait sur la charte d'UIX-10b. Si 06c doit modifier `ThemeGestion`, 10b passe d'abord | [plan d'UIX-06c](../conception/interface/uix-06c-ressources-temps.md) | déjà validé |
| 4 | QJE-14, le plan du Studio « comme Google Forms » | [qje-14-studio-forms](missions/qje-14-studio-forms.md) | chef |
| 5 | L'étude StudyLib : la garder en Laravel ou la reconstruire | [etude-studylib](missions/etude-studylib.md) | chef |
| 6 | UIX-10d, le mobile à la charte, après UIX-10b | plan d'UIX-10, § 9 | chef pendant la pause |

### Nouvelle session Claude, à ouvrir par le chef

| N° | Mission | Fiche | Validé par |
|---|---|---|---|
| 1 | **L'étude « contextes à faible équipement » (EP-18)**, sans code ; le modèle le plus capable. **Ouverte** (chef, 21 nov.), travail local, rien de poussé | [etude-ep18-faible-equipement](missions/etude-ep18-faible-equipement.md) | recommandation au chef |
| 2 | **VIT-12** (condition 2) : codée, #223 ; **attend les valeurs du chef** (`NOM`, `HÉBERGEUR`, `N`, `DATE`, `E-MAIL`), écrites dans le message de la session | [vit-12-pages-legales](missions/vit-12-pages-legales.md) | chef |
| 3 | **VIT-16, Contact et À propos** (conditions 10 et 11), même session : plan écrit ; **attend les corrections du chef et `RÉSEAU`** ; le code après la fusion de VIT-12 | [vit-16-contact-a-propos](missions/vit-16-contact-a-propos.md) | chef |
| 4 | ~~VIT-14 et VIT-14b~~ **fusionnées** (#224, #233). Ensuite, la même session : **la fusion des études restées sur des branches** (#191, #192, #186, #190, #169, go4school, #193 en dernier) | [fusion-etudes](missions/fusion-etudes.md) | chef (fait) |
| 5 | ~~L'expertise du site~~ **fusionnée** (#225). ~~VIT-18~~ **prête** : #228 ; `git merge origin/main` après #226 (une ligne du module VIT). En ce moment, à la demande du chef : une expertise du site go4school.net (hors file, aucune branche) | [vit-18-textes-exacts](missions/vit-18-textes-exacts.md) | chef (fait) |

### Alexis (Destroya2) et son agent

**21 nov.** : trois PR ouvertes. #229 (noms accessibles des boutons du catalogue, demande du chef) : plan validé après coup par le coordinateur, **CI rouge à corriger** (parcours `sessionsJeu`, ligne 49). #230 (STA-01, offres de stage) : **ne pas fusionner** avant la validation du plan par le chef (EP-5 : aucune devise par défaut ; migration 0083 réservée ; route publique sans compte). #231 : le chef a répondu le 21 nov. : **EDT-04 après les corrections de #229 et #230** ([fiche](missions/edt-04-publication.md)), par exception hors chantier ; plan au chef. Ensuite, des fonctions de l'étape 3 (le supérieur), à fixer par le chef.

QJE-04 est fusionnée (#196). Sa prochaine mission sera fixée par le chef à l'étape 4 : des modules du plan de parité, ou la suite des jeux (QJE-05, service des jeux et jeux maison). Le chantier QJE est fermé : la suite des jeux demande que le chef l'ouvre ou accorde une exception.

## Pour le chef : quoi dire à qui

- **Codex** : « lis ta boîte », puis « lis docs/plan/feuille-de-route.md, ta file ».
- **Agent de Cursor** : la même chose.
- **Claude (VS Code)** et les sessions Claude de VIT-12/16, VIT-14 et de l'expertise : les prompts de la fiche de session du coordinateur (`docs/sessions/2026-11-19-doc-coordination-equipe-6.md`).
- Après chaque fin de mission : relever le rapport, valider le plan suivant, pousser, attendre la CI verte, fusionner.
