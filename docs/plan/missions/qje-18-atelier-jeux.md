# Mission · QJE-18 · l'atelier des jeux : de nouveaux jeux par matière, conçus un à un

| | |
|---|---|
| État | ouverte : étude et catalogue des jeux à écrire, au chef |
| Agent | **session Claude neuve** (VS Code), à ouvrir par le chef : la mission demande des échanges suivis avec le chef (choix des jeux, contenus, rendus), et la lecture de supports de cours en PDF et en présentation |
| Images | **Codex**, sur demande, jeu par jeu : c'est le seul de nos agents qui génère des images matricielles (outil inclus, déjà employé pour les 17 illustrations WebP de VIT-09c) ; Claude et l'agent de Cursor n'écrivent que du SVG ou du code |
| Modèle recommandé | le plus capable : Claude Fable 5.2, sinon Opus 5.5. Conception de jeu, moteurs de vérification, contenu pédagogique juste |
| Attribuée le | 2026-11-27, par le coordinateur ; accord du chef : oui, le 2026-11-27 (« rajoute au plan la conception des jeux », agents choisis par le coordinateur) |
| Module et chantier | [QJE](../modules/QJE-quiz-jeux-ia.md) (module des jeux après QJE-17) · **hors chantier**, sur la demande du chef |
| Fonction | QJE-18 : une série de jeux nouveaux, chacun pour une matière, sur des mécaniques de jeu éprouvées par les plateformes de jeux pédagogiques les plus jouées · taille : étude M, puis un S ou M par jeu |
| Branche | `etude/qje-18-atelier-jeux` pour l'étude, depuis `origin/main` ; puis `feat/qje-18-<code-du-jeu>`, **une branche par jeu** |
| Dossier de travail | `..\travaux-planner\qje-18-atelier-jeux`, puis `..\travaux-planner\qje-18-<code-du-jeu>` |
| Plan de conception | à écrire : `docs/conception/jeux/qje-18-atelier-jeux.md` (l'étude et le catalogue), puis une fiche par jeu `docs/conception/jeux/qje-18-<code-du-jeu>.md` · **validés par le chef** (choix de produit) |

## Ce que le chef a demandé (27 nov.)

- Ajouter au plan **la conception des jeux**.
- Commencer par des jeux **inspirés de ceux qu'on trouve sur les plateformes de jeux pédagogiques les plus jouées**, selon les matières.
- Les matières : celles des emplois du temps d'exemple (leurs données sans nom : `docs/exemple_emploi_du_temps_donnee.yaml` ; les PDF d'origine sont hors dépôt depuis le 27 nov., chez le chef) ; le contenu : des supports de cours du chef (liste hors dépôt, voir plus bas).
- **Une image par jeu**, générée par l'agent le plus à même de le faire (Codex), **ou prise dans une banque d'images libre** (ajout du chef, 27 nov.).
- **Les jeux sont conçus un à un.**
- La présentation doit donner envie : ce sont des jeux pour apprendre en s'amusant (exigence du 27 nov., aussi dans QJE-15).

## La règle d'inspiration (non négociable)

On reprend des **types de jeu et des mécaniques** qui ont fait leurs preuves (associer, ordonner, programmer un parcours, simuler, gérer une économie, résoudre une énigme à étapes, course contre la montre, etc.). On **ne recrée jamais un jeu existant** : ni son nom, ni ses personnages, ni ses graphismes, ni ses niveaux, ni ses textes, ni sa musique. Chaque jeu a un nom, un univers et des défis à nous. Le dépôt est public : un jeu qui imiterait une marque exposerait Planner.

Les **quiz** (questions, réponses, course aux points en classe) relèvent du module des quiz (décision du 26 nov., QJE-17) : l'atelier ne fait pas de quiz déguisés en jeux. Un jeu ici, c'est un défi que l'élève **résout en agissant**, vérifié par un moteur, avec des niveaux et de l'expérience, comme les onze jeux d'aujourd'hui.

## Ce qui existe

- Onze jeux : le terminal (`shared/jeux/`) et dix simulations (`shared/simulations/` : `catalogue/<code>.js`, `moteurs/<moteur>.js`, `presentations/<moteur>.js`), selon le contrat [jeux-pedagogiques.md](../../conception/jeux/jeux-pedagogiques.md) (solution vue, notée par le serveur, QJE-04).
- Domaines couverts : algorithmique et complexité, SQL, systèmes (CPU), robotique, réseaux, cybersécurité, IA (seuils), gestion de projet, budget, logistique.
- QJE-15 (agent de Cursor) ajoute à chaque jeu ses `cycles` et son `domaine`, et une image par jeu : chaque jeu nouveau les porte dès sa création.

## Les images : générées ou prises dans une banque d'images libre (chef, 27 nov.)

Pour chaque jeu, l'image vient **soit** de Codex (génération), **soit** d'une **banque d'images libre** quand une vraie photo ou une illustration existante sert mieux le jeu. Dans le second cas :

- **licence** qui permet l'usage commercial et la modification : Unsplash, Pexels, Pixabay (leurs licences propres), ou une image du **domaine public** ou sous **CC0** (par exemple par Openverse ou Wikimedia Commons). Une image **CC BY** est permise si son auteur est crédité. **Refusées** : « usage éditorial seulement », CC BY-NC, CC BY-ND, et toute image sans licence lisible ;
- **pas** de personne reconnaissable, de marque, de logo ni d'œuvre protégée visible (affiche, écran d'un logiciel, personnage) ;
- **un fichier de crédits**, à côté des images : pour chacune, l'adresse de la page source, l'auteur, la licence et la date du téléchargement ; il se relit à chaque PR ;
- l'image est recadrée et réduite au même format que les autres (WebP de 512 px, 15 Ko au plus) ; la retouche ne change pas la licence ;
- la consigne d'image dit laquelle des deux voies elle propose ; le chef choisit sur la planche.

## Les matières relevées (emplois du temps d'exemple et supports du chef)

Pistes, à trier dans l'étude ; les jeux existants en couvrent déjà une part :

| Domaine | Matières | Déjà couvert |
|---|---|---|
| Mathématiques | analyse numérique, recherche opérationnelle, graphes, statistiques (dont le khi-deux) | non |
| Informatique théorique | théorie des langages et compilation (automates, grammaires) | non |
| Programmation | algorithmes de tri, complexité, programmation objet, développement web | en partie (Big-O) |
| Données | SQL et PL/SQL, modélisation (MCD), NoSQL, science des données, apprentissage automatique | en partie (SQL, seuils) |
| Réseaux et sécurité | sous-réseaux (FLSM, VLSM), VLAN, routage statique, sécurité des systèmes d'information, directive NIS2 | en partie (topologie, tri des incidents) |
| Systèmes | droits et permissions Linux | en partie (terminal) |
| Génie électrique et automatisme | automates programmables industriels, électrotechnique (triphasé, transformateurs, gradateurs) | non |
| Gestion | finance pour l'ingénieur, entrepreneuriat (modèle d'affaires), management | en partie (budget, sprint) |
| Langues et communication | anglais professionnel, communication | non |

## Les étapes

1. **L'étude** (`etude/qje-18-atelier-jeux`), documents seuls :
   - un relevé des plateformes de jeux pédagogiques les plus jouées et de leurs **mécaniques** (sources citées, chiffres d'usage datés) ;
   - le croisement mécaniques × matières ci-dessus ;
   - **un catalogue de 8 à 12 jeux proposés**, chacun en une fiche courte : matière, cycle, mécanique, ce que l'élève apprend, les trois premiers défis, le moteur de vérification (nouveau ou réutilisé), l'image à générer, la façon de jouer (`individuel`, `collectif`), les contextes EP-18 ;
   - l'**ordre** proposé (proposition : d'abord les matières non couvertes, un moteur réutilisable en premier) ;
   - le chef valide la liste et l'ordre.
2. **Un jeu à la fois**, dans l'ordre validé, chacun sur sa branche :
   - fiche de conception du jeu, validée par le chef (nom, univers, défis, textes) ;
   - **l'image** : la session écrit la consigne d'image (sujet, cadrage, palette de la charte, format WebP de 512 px, 15 Ko au plus ; génération ou banque libre), le coordinateur la dépose dans la boîte de Codex, Codex la génère ou la trouve, la livre avec ses crédits ; le chef la valide sur une planche ;
   - le code : catalogue, moteur, présentation, traductions (FR, EN), tests du moteur (chaque défi a une solution, une mauvaise réponse échoue), parcours de jeu ;
   - relecture du coordinateur, PR, fusion ; puis le jeu suivant.

## Critère de « terminé » (par jeu)

- Le jeu suit le contrat des jeux : défis vérifiés par le moteur, solution vue notée par le serveur, progression et expérience.
- Il porte ses `cycles`, son `domaine` (QJE-15) et son image ; une image de banque a sa ligne de crédits (source, auteur, licence, date).
- Ses textes ne disent que ce que fait le jeu ; aucun nom d'école, de personne ni de marque ; aucune phrase copiée d'un support de cours.
- Tests du moteur et du catalogue, `verifier-neutre`, axe-core sur l'écran du jeu, parcours `sessionsJeu` intact.
- Il se joue sur le téléphone, et au tableau s'il déclare le mode `collectif`.

## Périmètre d'écriture

Pour l'étude : `docs/conception/jeux/qje-18-atelier-jeux.md` et la fiche de session.

Pour chaque jeu (fixé par le coordinateur après le visa de sa fiche) : `shared/simulations/catalogue/<code>.js`, un moteur et une présentation nouveaux ou réutilisés dans `shared/simulations/`, leurs tests, les traductions du jeu, son image dans le dossier choisi par QJE-15, la fiche du jeu, le fichier du module et la fiche de session.

L'agent ne touche pas :

- `frontend/src/pages/jeux/`, `mobile/src/app/(onglets)/jeux.jsx`, `shared/jeux/catalogue.js` : QJE-15 (agent de Cursor) ;
- les écrans et noms du module des jeux : QJE-17 ;
- les moteurs existants, sauf pour les réutiliser sans en changer le comportement ;
- `docs/plan/suivi.md` ; tout le reste : s'il doit en sortir, il s'arrête et le demande.

## Les supports de cours du chef

Ils sont sur le poste du chef, **hors du dépôt**. La liste des fichiers que la session peut lire, rangés par matière, est dans `..\travaux-planner\boites\supports-de-cours.md` (hors dépôt). La session **ne lit que ces fichiers** : le dossier contient aussi des documents personnels. Elle s'en sert pour l'exactitude et le niveau des défis, **sans rien recopier** dans le dépôt (droits d'auteur, dépôt public), et sans aucun nom d'enseignant, d'école ou de personne.

## Ce qui est déjà décidé

- Quiz et jeux séparés partout (26 nov., QJE-17) ; QJE-16 est l'interrupteur de l'IA par école.
- Présentation attirante avec images (27 nov.) ; cycles : collège, lycée, supérieur, formation professionnelle (QJE-15).
- Aucune devise ni aucun pays écrits dans un jeu (M-11 : « crédits »).
- Charte v3 (teintes, bleu nuit `#1A2A6C`) ; logos de la série B.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Combien de jeux dans le premier catalogue ? | 8 à 12, dont 3 pour commencer | chef, dans l'étude |
| 2 | Des jeux pour le collège et le lycée dès cette série ? | le supérieur d'abord (feuille de route), un ou deux jeux de lycée (mathématiques, anglais) pour essayer | chef, dans l'étude |
| 3 | Qui code les jeux après le premier ? | la même session ; Alexis, auteur des jeux actuels, relit le premier moteur si le chef le souhaite | chef |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : QJE-18 (l'atelier des jeux : de nouveaux jeux par matière, conçus un à un), module QJE, hors chantier sur la demande du chef.
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/qje-18-atelier-jeux.md, et le contrat docs/conception/jeux/jeux-pedagogiques.md.
Branche : etude/qje-18-atelier-jeux, depuis origin/main, dans le dossier ..\travaux-planner\qje-18-atelier-jeux.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Supports de cours : lis seulement les fichiers listés dans ..\travaux-planner\boites\supports-de-cours.md ; n'en recopie rien dans le dépôt.
Règle d'inspiration : des mécaniques éprouvées, jamais la copie d'un jeu existant (nom, personnages, graphismes, niveaux, textes).
Étape 1 : l'étude et le catalogue (docs/conception/jeux/qje-18-atelier-jeux.md), tes questions numérotées avec une proposition ; commite-la seule ; le chef la valide.
Ensuite, un jeu à la fois : sa fiche validée par le chef, sa consigne d'image (Codex la génère, par le coordinateur), son code et ses tests, relecture, PR.
Règles : pas de code avant le plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini une étape, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-27 | fiche écrite sur la demande du chef ; matières relevées sur les deux emplois du temps d'exemple et la liste des supports du chef ; images confiées à Codex | session à ouvrir par le chef |
