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
| **3. Le scolaire et les familles** | élèves, collégiens, lycéens ; vocabulaire selon le type d'école ; les parents et leur suivi | **VSC-01** (conception, à commencer tout de suite), puis VSC-02, UIX-02, ADM-05, MOB-05, VSC-03. **Le chantier VSC s'ouvre dès que MOT se ferme** (décision du chef, 18 nov.) |
| **4. Les modules** | les modules du plan de parité (#193), dont certains seront attribués à Alexis | à répartir par le chef, à la fin de l'étape 3 |

Les sorties de ClassQuiz (QJE-01, QJE-03, QJE-06) et le Studio « comme Google Forms » (QJE-14) avancent en parallèle, par l'exception accordée le 18 nov.

## Principes qui valent pour toutes les étapes (chef, 18 nov.)

- **EP-18, tous les contextes** : chaque fonction marche sans téléphone de l'élève, avec peu ou pas de connexion, et avec ce qu'a l'école (un écran projeté, du papier). Chaque plan dit comment il le tient. Un plan qui ne le dit pas n'est pas validé.
- **Aucun pays supposé** : les outils de l'État sont ceux du pays de l'école (Massar au Maroc ; les autres par ETA-03). Aucun écran ni aucun texte ne nomme Massar comme s'il était seul.
- **Étude « contextes à faible équipement »** ([fiche](missions/etude-ep18-faible-equipement.md)) : elle passe en revue chaque fonction existante (appel, quiz, jeux, espace de cours, bibliothèque, mobile) sous l'angle d'EP-18 : ce qui marche déjà sans téléphone ni connexion, ce qui manque (feuille d'appel imprimée, quiz sur papier, mode hors ligne MOB-06, SMS), et l'ordre des correctifs. Confiée à **une nouvelle session Claude** (chef, 18 nov. vers 17 h 15).

## Conditions de la mise en ligne du site (VIT-06)

Le site part sur le sous-domaine quand les **douze** sont réunies (les conditions 5 à 10 ont été ajoutées par le chef le 18 nov., 11 et 12 le 19 nov. d'après l'[expertise du site](../etude-marche/12-expertise-site-vitrine.md)). Ordre des fusions sur le site (coordinateur, 19 nov.) : #224 (VIT-14), VIT-10b, VIT-17, VIT-18, #223 (VIT-12, après les valeurs du chef), VIT-16, VIT-11 (code), VIT-13, VIT-14b, VIT-15, puis VIT-09b en dernier. #222 (VIT-09a) et #225 (l'expertise, un document) passent à tout moment :
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
| 4 ter | **VIT-06, le code** : #221. **À corriger d'abord** (19 nov.) : la CI du site reste rouge (« .env.docker not found ») même après `121c92c6` ; conflit d'une ligne sur le fichier du module VIT ; ajouter les conditions 11 et 12, et la durée des journaux de la vitrine (Nginx et Traefik, N jours fixé par le chef dans VIT-12) | [vit-06-mise-en-ligne](missions/vit-06-mise-en-ligne.md) | chef (plan validé) ; la durée des journaux, au chef |
| 4 quater | **VIT-15, une page par module** (condition 10), construite depuis le registre de VIT-11, avec le bloc « selon votre équipement » (sans wifi, sans écran, sans téléphone de l'élève), qui reprend les phrases C5 de l'expertise et ajoute l'emploi du temps imprimé en PDF : après le code de VIT-11 | [vit-15-pages-modules](missions/vit-15-pages-modules.md) | chef |
| 5 | QJE-03, joueur natif ; puis QJE-06, plus aucun conteneur ClassQuiz (après le transfert vérifié des quiz de l'école pilote) | [sortie-classquiz](missions/sortie-classquiz.md) | chef |
| 6 | VIT-06, le déploiement, le jour où les dix conditions sont réunies : le chef lance les commandes du serveur | [vit-06-mise-en-ligne](missions/vit-06-mise-en-ligne.md) | chef |

### Agent de Cursor : Grok 4.7 high, pour les tâches bornées au plan validé

| N° | Mission | Fiche | Validé par |
|---|---|---|---|
| 1 | ~~QJE-01~~ **fait** : #208 fusionnée le 18 nov. | [sortie-classquiz](missions/sortie-classquiz.md) | chef (fait) |
| 2 | ~~VIT-07~~ **prête** : #214, CI verte, relue par le coordinateur | [vit-07-contenu-complet](missions/vit-07-contenu-complet.md) | chef (fait) |
| 2 ter | **VIT-10, pages par rôle, menu « Solutions » ouvrant, pied de page complet** (condition 8) : plan court après la fusion de #214 | [vit-10-pages-par-role](missions/vit-10-pages-par-role.md) | chef |
| 2 quater | **VIT-10b, avant → avec et FAQ par rôle** (condition 10) : codée en local (`b7f1a104`). **Avant le push**, le complément C8 de l'expertise (la carte qui parle du site remplacée par la description publiée de la page Sécurité ; les boutons dans l'ouverture) | [vit-10b-avant-avec-faq](missions/vit-10b-avant-avec-faq.md) | chef (fait) ; C8 : coordinateur (fait) |
| 2 quater bis | **VIT-17, les correctifs techniques du site** (lot A de l'expertise ; condition 12) : saut du menu, vidéo sur demande sur téléphone, pages `/ar/`, Open Graph, grilles à trous, `README.md`. Plan court, puis code ; le point `/ar/` après #223 | [vit-17-correctifs-vitrine](missions/vit-17-correctifs-vitrine.md) | coordinateur ; le libellé du bouton, au chef |
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
| 1 ter | **VIT-09a, les logos illustrés des modules et les icônes vivantes** (condition 10) : codée, #222 ; **résoudre le conflit d'une ligne** sur le fichier du module VIT (`git merge origin/main`, garder les deux lignes), tests, puis push par le chef | [vit-09-illustrations](missions/vit-09-illustrations.md) | chef |
| 1 quater | **VIT-09b, l'intégration** (condition 7) : illustrations, captures neutres, première section de chaque page, logos et icônes posés partout, avec les ajouts C2, C3 et C10 de l'expertise (titre-promesse, liens des rôles, captures prioritaires, dessin de l'appel, page Application). Plan court maintenant ; **le code en dernier sur le site** |
| 1 quinquies | VIT-08, le nouveau rendu de deux phrases de la vidéo et de leur transcription, après les visas de VIT-18 | [vit-18-textes-exacts](missions/vit-18-textes-exacts.md), § 5 | chef (les phrases, dans VIT-18) | [vit-09-illustrations](missions/vit-09-illustrations.md) | chef |
| 2 | **UIX-10b**, l'application web à la charte : thème, gestion, panneau des départs, Barlow et choix de famille retirés, Studio quiz compris. C'est là que la connexion, l'accueil des modules et les pages de gestion prennent le style du site. Plan court, après la fusion de #199 et d'UIX-09 | plan d'UIX-10, § 9 | chef |
| 2 bis | **UIX-11, le tableau de bord de l'administration** : refait à la charte, complété des chiffres qui existent, chaque chiffre menant à ses lignes. Plan court, après UIX-10b | [uix-11-tableau-de-bord](missions/uix-11-tableau-de-bord.md) | coordinateur, ou chef si une route ou une donnée d'élève s'ajoute |
| 3 | UIX-06c, Salles, Campus, Créneaux et Calendrier : son plan est validé et attendait UIX-10. Il se fait sur la charte d'UIX-10b. Si 06c doit modifier `ThemeGestion`, 10b passe d'abord | [plan d'UIX-06c](../conception/interface/uix-06c-ressources-temps.md) | déjà validé |
| 4 | QJE-14, le plan du Studio « comme Google Forms » | [qje-14-studio-forms](missions/qje-14-studio-forms.md) | chef |
| 5 | L'étude StudyLib : la garder en Laravel ou la reconstruire | [etude-studylib](missions/etude-studylib.md) | chef |
| 6 | UIX-10d, le mobile à la charte, après UIX-10b | plan d'UIX-10, § 9 | chef pendant la pause |

### Nouvelle session Claude, à ouvrir par le chef

| N° | Mission | Fiche | Validé par |
|---|---|---|---|
| 1 | **L'étude « contextes à faible équipement » (EP-18)**, sans code ; le modèle le plus capable | [etude-ep18-faible-equipement](missions/etude-ep18-faible-equipement.md) | recommandation au chef |
| 2 | **VIT-12** (condition 2) : codée, #223 ; **attend les valeurs du chef** (`NOM`, `HÉBERGEUR`, `N`, `DATE`, `E-MAIL`), écrites dans le message de la session | [vit-12-pages-legales](missions/vit-12-pages-legales.md) | chef |
| 3 | **VIT-16, Contact et À propos** (conditions 10 et 11), même session : plan écrit ; **attend les corrections du chef et `RÉSEAU`** ; le code après la fusion de VIT-12 | [vit-16-contact-a-propos](missions/vit-16-contact-a-propos.md) | chef |
| 4 | **VIT-14** : codée, #224, conforme ; `git merge origin/main`, push. Puis **VIT-14b**, les trois critères de l'expertise, même session | [vit-14-comparatif](missions/vit-14-comparatif.md) | chef |
| 5 | ~~L'expertise du site~~ **rendue** (#225, conforme). La même session prend **VIT-18, les textes exacts** (lot B) | [vit-18-textes-exacts](missions/vit-18-textes-exacts.md) | chef, phrase par phrase |

### Alexis (Destroya2) et son agent

QJE-04 est fusionnée (#196). Sa prochaine mission sera fixée par le chef à l'étape 4 : des modules du plan de parité, ou la suite des jeux (QJE-05, service des jeux et jeux maison). Le chantier QJE est fermé : la suite des jeux demande que le chef l'ouvre ou accorde une exception.

## Pour le chef : quoi dire à qui

- **Codex** : « lis ta boîte », puis « lis docs/plan/feuille-de-route.md, ta file ».
- **Agent de Cursor** : la même chose.
- **Claude (VS Code)** et les sessions Claude de VIT-12/16, VIT-14 et de l'expertise : les prompts de la fiche de session du coordinateur (`docs/sessions/2026-11-19-doc-coordination-equipe-6.md`).
- Après chaque fin de mission : relever le rapport, valider le plan suivant, pousser, attendre la CI verte, fusionner.
