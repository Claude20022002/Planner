# VIT · Site vitrine public et contact

**Objet** : un site public qui présente **le produit Planner**, pas une école. Les écoles et les utilisateurs doivent pouvoir nous y contacter, comme sur les sites des autres outils (demande du 5 novembre).

**Hors module** : la page d'accueil d'une école dans Planner (`pages/Accueil.jsx`, UIX).

## Ce qui existe

- **VIT-09c · Essai Présences** sur `feat/vit-09c-logos-modules`. La planche locale présente la feuille d’appel aux quatre tailles et son illustration WebP. La série attend le choix du chef. [Conception](../../conception/vitrine/vit-09c-logos-modules.md)

- **Socle du site vitrine** (branche `feat/vit-01-vitrine`, non fusionnée) : `vitrine/`, site statique Astro en français, anglais et arabe (l'arabe construit, non indexé), jetons des couleurs du logo, logos officiels du chef (18 nov. ; originaux dans `shared/charte/logos-officiels/`, versions web dans `vitrine/public/logo/`, charte en version 2 à leurs couleurs : branche `chore/vit-06-logos-officiels`, condition 3 de VIT-06), composants du socle, accueil en huit sections, et cinq pages de fonctions (Emploi du temps, En classe, Pour l'établissement, Sécurité et données, Bientôt), chacune ne disant que ce qui existe ; ce qui est prévu est marqué « Bientôt ». La CI (`vitrine.yml`) conserve le site statique compilé comme artefact.
- **Page « Solutions »** (VIT-05 en préparation, branche `feat/vit-05-solutions`, [plan validé le 18 nov.](../../conception/vitrine/vit-05-solutions.md)) : `/<langue>/solutions/`, une section par type d'établissement (collège et lycée, enseignement supérieur, formation professionnelle), chacune avec « Aujourd'hui » (chaque point renvoie à sa page de fonction) et « Bientôt » (plan de parité, sans date) ; aucun prix. Lien « Solutions » en tête de la navigation, dans l'en-tête et le pied de page.
- **Contenu complet** (VIT-07 en cours, branche `feat/vit-07-contenu-complet`, [plan validé le 18 nov.](../../conception/vitrine/vit-07-contenu-complet.md)) : quatre pages (quiz et jeux, bibliothèque, cours et annonces, application), la carte « prêts de livres » retirée de « Bientôt », et un menu « Fonctions ». Quiz et jeux mène à une page « Bibliothèque des jeux » (titres et résumés du catalogue, hors du menu). Aucun prix, aucun nom d'école.
- **Image et recette de mise en ligne** (VIT-06). Nginx sert le `dist/` Astro avec une CSP calculée par page et `noindex`. La CI teste l’image et active sa publication par SHA sur `main` avec les deux secrets Docker Hub. La mise en ligne attend les douze conditions du [plan](../../conception/exploitation/vit-06-mise-en-ligne.md#conditions-et-recette-du-chef).
- **Logos des applications et icônes vivantes** (VIT-09a, branche `feat/vit-09a-logos-icones`, [plan validé le 18 nov.](../../conception/vitrine/vit-09a-logos-icones.md)) : `shared/icones/`, source unique pour le site et, avec UIX-10b, l'application. Sept logos illustrés (tuile en dégradé, objet en plans ; dessin détaillé et simplifié), aux teintes `app-<id>` de la charte v3, et douze icônes de commandes animées en CSS au survol et au focus, coupées en mouvement réduit. Aucune page ne les pose encore : c'est VIT-09b.
- **Pages par rôle** (VIT-10 en cours, branche `feat/vit-10-pages-par-role`, [plan validé le 18 nov.](../../conception/vitrine/vit-10-pages-par-role.md)) : Direction, Scolarité, Enseignants, Étudiants. Le menu « Solutions » s'ouvre. Le pied de page est en colonnes. Pas de bande de chiffres, pas de bloc avant/après, pas de FAQ nouvelle. Aucune illustration.
- **Avant → avec, et FAQ par rôle** (VIT-10b en cours, branche `feat/vit-10b-avant-avec-faq`, [plan validé le 18 nov.](../../conception/vitrine/vit-10b-avant-avec-faq.md)) : cinq lignes par rôle et une FAQ en accordéon. Les phrases « avec » sont recopiées. Aucune illustration.
- **Catalogue, FAQ et menu « Fonctions »** (VIT-11, branche `feat/vit-11-catalogue-faq`, [plan et visa du chef](../../conception/vitrine/vit-11-catalogue-faq.md)) : le registre alimente le catalogue par application et le menu par catégorie. Le panneau se consulte au clavier ou au toucher sans JavaScript. Le lien de repli ouvre le catalogue. Les sept réponses de la FAQ sont aussi disponibles en données structurées.
- **Ce que font les concurrents**, d'après l'[étude de marché](../../etude-marche/01-concurrents.md) :
  - une page par fonction et par type d'école ;
  - une démonstration ou un essai bien visible ;
  - un contact par formulaire, téléphone et WhatsApp ;
  - une page « sécurité et données » (loi 09-08, CNDP) ;
  - une FAQ ;
  - une version en arabe.
- **Règle des textes** : ne promettre que ce qui existe ou se démontre ([arguments marketing](../../etude-marche/02-arguments-marketing.md)).
- **Vidéo de promotion** : la PR #53 (`video/promo`) est ouverte ; `kit-video-planner/` contient le guide et les captures.
- **Vidéo de présentation de l'accueil** (VIT-08, branche `feat/vit-08-video-presentation`, [plan validé le 18 nov.](../../conception/vitrine/vit-08-video-presentation.md)) : 86 s de motion design sans captures ni son, en français et en anglais, aux couleurs de `shared/charte/` ; composition `Accueil` du projet Remotion (`docs/presentation/video/src/accueil/`), textes tirés de `accueil.json`. Section « Présentation » après l'ouverture, lecture seule et muette, image fixe au mouvement réduit, transcription dessous. Rendu final (`npm run render:accueil`, environ 10 Mo) fait avec les SVG officiels (#216, 18 nov.), puis refait le 19 nov. pour deux phrases de VIT-18 (`video.scenes.4.lignes.0` et `video.scenes.7.lignes.1`, visées par le chef ; `fix/vit-08-phrases-video`). Le test de l'empreinte échoue si les textes de la vidéo, les couleurs qu'elle lit ou les logos changent sans nouveau rendu.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| VIT-01 | Conception : arborescence, messages, maquettes, choix technique (site statique séparé de l'application, rapide, référencé), hébergement en conteneur | SP-1 | libre | M | Q-11 | à faire |
| VIT-02 | Une page et un formulaire de contact : nom, école, ville, effectif, besoin, consentement ; WhatsApp et courriel ; accusé de réception ; demandes enregistrées et suivies | SP-3 réduit | libre | M | VIT-01, textes légaux | à faire |
| VIT-03 | Centre d'aide : guides par rôle, questions fréquentes, vidéos courtes, liens depuis l'aide de l'application | SP-4 | libre | M | VIT-01 | à faire |
| VIT-04 | Page d'état du service et journal des nouveautés de chaque version | SP-5 | libre | S | EXP-05 | à faire |
| VIT-05 | Vitrine complète : fonctions par module, solutions par type d'école, sécurité et données, tarifs ; français, puis arabe et anglais | SP-2 | quand la vente reprend | L | VEN | préparation dégelée le 18 nov. : accueil et pages de fonctions, sans tarifs ni mise en ligne ([plan](../../conception/vitrine/vit-vitrine.md)) |
| VIT-06 | Vitrine statique en HTTPS sur un sous-domaine, avec retour arrière par digest | — | libre | M | Douze conditions du [plan](../../conception/exploitation/vit-06-mise-en-ligne.md) | implémentation locale, CI et déploiement à venir |
| VIT-07 | Le site présente toutes les applications : quiz et jeux, bibliothèque, cours et annonces, application | — | libre | M | VIT-01 | en cours (`feat/vit-07-contenu-complet`) |
| VIT-10 | Pages par rôle, menu « Solutions » ouvrant, pied de page en colonnes | — | libre | M | VIT-07 | en cours (`feat/vit-10-pages-par-role`) |
| VIT-10b | Sur les pages par rôle, « avant → avec Planner » et une FAQ | — | libre | S | VIT-10 | en cours (`feat/vit-10b-avant-avec-faq`) |
| VIT-11 | Catalogue, FAQ et méga-menu par catégorie | — | libre | M | VIT-10 | VIT-17 et VIT-18 intégrées, [recette locale](../../sessions/2026-11-21-feat-vit-11-catalogue-faq-3.md) réussie ; PR #236 à actualiser |
| VIT-17 | Correctifs techniques du site : menu mobile, vidéo sur demande, pages `/ar/`, Open Graph, grilles, `README.md` | — | libre | S | VIT-06 (sous-domaine) | PR ouverte (#237) |
| VIT-18 | Textes exacts du site : phrases P1 à P6 de l'expertise, l'IA « activée pour votre école » (D2), aucun pays (D3), le supérieur et la formation d'abord (D4), l'appel d'abord à la main (EP-18), test de garde | — | libre | S | VIT-14 (#224) | plan validé le 19 nov. ([vit-18-textes-exacts](../../conception/vitrine/vit-18-textes-exacts.md)) ; code fait (`fix/vit-18-textes-exacts`), PR à ouvrir |
| VIT-18b | Le test de garde du site refuse aussi les superlatifs (« n° 1 », « #1 », « le seul », « le meilleur », « leader », en anglais « number one », « the only », « the best »), formes voisines comprises ; la phrase du calcul ne dit plus « la meilleure semaine possible » | — | libre | S | VIT-18 (#228) | plan validé le 21 nov. ([vit-18b-superlatifs](../../conception/vitrine/vit-18b-superlatifs.md)) ; code fait (`fix/vit-18b-superlatifs`), PR à ouvrir |
| VIT-19 | Contrôle d'EP-19 dans la CI du site : une page pèse au plus 200 Ko transférés, hors média lancé à la demande ; la CI échoue au-delà (N1) | — | 3 | S | VIT-17 | en cours (`feat/vit-19-ep19-poids`) ; plan validé le 21 nov. ([vit-19-ep19-poids](../../conception/vitrine/vit-19-ep19-poids.md)) |

## Critères de « terminé »

- **VIT-02** :
  - un formulaire envoyé crée une demande visible par l'équipe et un accusé de réception ;
  - les données recueillies sont listées dans la politique de confidentialité, relue par le juriste (loi 09-08) ;
  - aucune promesse au-delà de ce qui existe.
  - une catégorie « faille de sécurité » est traitée **en privé** : elle n'est visible que du chef de projet, et l'accusé de réception rappelle les délais de `SECURITY.md` (7 jours, 90 jours au plus). Une fois en ligne, `SECURITY.md` renvoie à ce formulaire (décision du 16 nov.).
- **VIT-04** : la page d'état lit la sonde de supervision. Elle ne lit aucune donnée d'école.
- **VIT-19** : la CI du site échoue quand une page dépasse 200 Ko transférés (hors `/videos/*`), et un test unitaire le montre sur une page gonflée en temporaire.

## À trancher avant VIT-02

- Le **nom de domaine** (Q-11). Le nom du produit, lui, est décidé : **Planner**.
- Les **mentions légales** et la **politique de confidentialité**, écrites par le juriste.
- **Pas de prix publié** tant que la vente est mise de côté : la page parle de « nous contacter ».

## Références

- Archives : [plan fusionné, § « Site public »](../../archives/plans/plan-produit/04-plan-fusionne.md)
- [Étude de marché](../../etude-marche/README.md)
