# VIT · Site vitrine public et contact

**Objet** : un site public qui présente **le produit Planner**, pas une école. Les écoles et les utilisateurs doivent pouvoir nous y contacter, comme sur les sites des autres outils (demande du 5 novembre).

**Hors module** : la page d'accueil d'une école dans Planner (`pages/Accueil.jsx`, UIX).

## Ce qui existe

- **Socle du site vitrine** (branche `feat/vit-01-vitrine`, non fusionnée) : `vitrine/`, site statique Astro en français, anglais et arabe (l'arabe construit, non indexé), jetons des couleurs du logo, logos officiels du chef (18 nov. ; originaux dans `shared/charte/logos-officiels/`, versions web dans `vitrine/public/logo/`, charte en version 2 à leurs couleurs : branche `chore/vit-06-logos-officiels`, condition 3 de VIT-06), composants du socle, accueil en huit sections, et cinq pages de fonctions (Emploi du temps, En classe, Pour l'établissement, Sécurité et données, Bientôt), chacune ne disant que ce qui existe ; ce qui est prévu est marqué « Bientôt ». La CI (`vitrine.yml`) conserve le site statique compilé comme artefact.
- **Page « Solutions »** (VIT-05 en préparation, branche `feat/vit-05-solutions`, [plan validé le 18 nov.](../../conception/vitrine/vit-05-solutions.md)) : `/<langue>/solutions/`, une section par type d'établissement (collège et lycée, enseignement supérieur, formation professionnelle), chacune avec « Aujourd'hui » (chaque point renvoie à sa page de fonction) et « Bientôt » (plan de parité, sans date) ; aucun prix. Lien « Solutions » en tête de la navigation, dans l'en-tête et le pied de page.
- **Contenu complet** (VIT-07 en cours, branche `feat/vit-07-contenu-complet`, [plan validé le 18 nov.](../../conception/vitrine/vit-07-contenu-complet.md)) : quatre pages (quiz et jeux, bibliothèque, cours et annonces, application), la carte « prêts de livres » retirée de « Bientôt », et un menu « Fonctions ». Quiz et jeux mène à une page « Bibliothèque des jeux » (titres et résumés du catalogue, hors du menu). Aucun prix, aucun nom d'école.
- **Image et recette de mise en ligne** (VIT-06). Nginx sert le `dist/` Astro avec une CSP calculée par page et `noindex`. La CI teste l’image et active sa publication par SHA sur `main` avec les deux secrets Docker Hub. La mise en ligne attend les neuf conditions du [plan](../../conception/exploitation/vit-06-mise-en-ligne.md) et le [complément décidé par le chef](../../sessions/2026-11-18-feat-vit-06-code.md#reprise-du-18-novembre--contrôle-avant-déploiement).
- **Ce que font les concurrents**, d'après l'[étude de marché](../../etude-marche/01-concurrents.md) :
  - une page par fonction et par type d'école ;
  - une démonstration ou un essai bien visible ;
  - un contact par formulaire, téléphone et WhatsApp ;
  - une page « sécurité et données » (loi 09-08, CNDP) ;
  - une FAQ ;
  - une version en arabe.
- **Règle des textes** : ne promettre que ce qui existe ou se démontre ([arguments marketing](../../etude-marche/02-arguments-marketing.md)).
- **Vidéo de promotion** : la PR #53 (`video/promo`) est ouverte ; `kit-video-planner/` contient le guide et les captures.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| VIT-01 | Conception : arborescence, messages, maquettes, choix technique (site statique séparé de l'application, rapide, référencé), hébergement en conteneur | SP-1 | libre | M | Q-11 | à faire |
| VIT-02 | Une page et un formulaire de contact : nom, école, ville, effectif, besoin, consentement ; WhatsApp et courriel ; accusé de réception ; demandes enregistrées et suivies | SP-3 réduit | libre | M | VIT-01, textes légaux | à faire |
| VIT-03 | Centre d'aide : guides par rôle, questions fréquentes, vidéos courtes, liens depuis l'aide de l'application | SP-4 | libre | M | VIT-01 | à faire |
| VIT-04 | Page d'état du service et journal des nouveautés de chaque version | SP-5 | libre | S | EXP-05 | à faire |
| VIT-05 | Vitrine complète : fonctions par module, solutions par type d'école, sécurité et données, tarifs ; français, puis arabe et anglais | SP-2 | quand la vente reprend | L | VEN | préparation dégelée le 18 nov. : accueil et pages de fonctions, sans tarifs ni mise en ligne ([plan](../../conception/vitrine/vit-vitrine.md)) |
| VIT-06 | Vitrine statique en HTTPS sur un sous-domaine, avec retour arrière par digest | — | libre | M | Neuf conditions du [plan](../../conception/exploitation/vit-06-mise-en-ligne.md) | implémentation locale, CI et déploiement à venir |
| VIT-07 | Le site présente toutes les applications : quiz et jeux, bibliothèque, cours et annonces, application | — | libre | M | VIT-01 | en cours (`feat/vit-07-contenu-complet`) |

## Critères de « terminé »

- **VIT-02** :
  - un formulaire envoyé crée une demande visible par l'équipe et un accusé de réception ;
  - les données recueillies sont listées dans la politique de confidentialité, relue par le juriste (loi 09-08) ;
  - aucune promesse au-delà de ce qui existe.
- **VIT-04** : la page d'état lit la sonde de supervision. Elle ne lit aucune donnée d'école.

## À trancher avant VIT-02

- Le **nom de domaine** (Q-11). Le nom du produit, lui, est décidé : **Planner**.
- Les **mentions légales** et la **politique de confidentialité**, écrites par le juriste.
- **Pas de prix publié** tant que la vente est mise de côté : la page parle de « nous contacter ».

## Références

- Archives : [plan fusionné, § « Site public »](../../archives/plans/plan-produit/04-plan-fusionne.md)
- [Étude de marché](../../etude-marche/README.md)
