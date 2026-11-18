# VIT-01 et VIT-05 (préparation) · Site vitrine de Planner · conception proposée

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) |
| Fonctions | VIT-01 (conception et socle du site, M) ; VIT-05 en préparation (accueil et pages de fonctions, sans tarifs ni mise en ligne) |
| Branche | `feat/vit-01-vitrine`, depuis `origin/main` |
| Rédigé par | Claude Code (Opus 5.5), coordinateur, le 18 novembre 2026 |
| Validé | **Validé par Claude20022002 le 18 novembre 2026** (« Je valide les deux plans »), dépendances comprises (Motion, Lucide, lucide-animated, Astro) |
| Travail | mission d'équipe ([equipe.md](../../plan/equipe.md)) : Claude (VS Code) intégrateur, puis l'agent de Cursor |

## 1. Ce que veut le chef (17 et 18 nov.)

- Un site vitrine **comme celui d'OpenEduCat dans son contenu**, mais **dans le style d'apple.com** :
  - de grandes sections plein écran, une idée par section ;
  - des titres courts en très gros caractères, beaucoup d'espace vide ;
  - des visuels du produit soignés, sur ordinateur et sur téléphone ;
  - des animations sobres au défilement.
- Le même style viendra ensuite dans l'application (réponse 1).
- Le site se construit **maintenant**, sans être mis en ligne : la vente reste gelée (réponse 3).
- Il est prévu en **français, anglais et arabe** : les trois langues sont dans la structure dès le départ, l'arabe se remplit après UIX-04 (réponse 4).
- **Logos officieux** du 18 nov. :
  - icône d'application : carré arrondi bleu nuit, toque blanche portant les aiguilles d'une horloge, livre ouvert bleu clair ;
  - logo horizontal : toque bleue au cadran d'horloge, livre ouvert bleu clair.

## 2. Ce qu'on s'interdit

- **On s'inspire du style d'Apple, on ne copie rien.**
  - Aucun logo, icône, image, texte, nom de produit ni mise en page reconnaissable d'Apple.
  - Pas de police SF Pro : sa licence la réserve aux appareils Apple. On prend **Inter**, déjà dans le projet.
- **On ne promet que ce qui existe** ([arguments marketing](../../etude-marche/02-arguments-marketing.md)). Une fonction prévue est marquée « bientôt ».
- **Aucun prix** (vente gelée). Aucun nom d'école réelle, ni de client.
- **Rien n'est mis en ligne.** Le site se construit et se prévisualise en local, ou en artefact de CI.

## 3. Arborescence

| Page | Contenu |
|---|---|
| **Accueil** | 1. ouverture : le logo s'anime (les aiguilles tournent), avec une phrase sur ce que fait Planner ; 2. l'emploi du temps calculé ; 3. l'appel par QR code ; 4. les quiz et les jeux ; 5. le report de séance suivi ; 6. les données qui restent à l'école ; 7. « bientôt » : vie scolaire, familles, frais ; 8. contact |
| **Emploi du temps** | le calcul sous contraintes, l'explication des refus, les versions, l'export |
| **En classe** | appel par QR code, quiz en direct, jeux, sondages |
| **Pour l'établissement** | salles, examens, statistiques, plusieurs campus |
| **Sécurité et données** | double authentification, aucun envoi caché (EP-13), loi 09-08 ; aucune certification annoncée qui n'existe pas |
| **Bientôt** | les modules du plan de parité ([parite-openeducat.md](../../plan/parite-openeducat.md)), sans date |
| **Contact** | section seulement, sans formulaire : le formulaire est VIT-02, qui attend les textes légaux et le nom de domaine (Q-11) |

## 4. Le style

| Élément | Règle |
|---|---|
| Couleurs | les deux bleus des logos : bleu nuit (fond de l'icône) et bleu clair (livre) ; blanc et quasi-noir ; pas d'autre teinte vive. Valeurs exactes relevées dans les SVG, puis écrites en jetons |
| Typographie | Inter ; titres de 48 à 96 px sur ordinateur, graisse 600 à 700, interlignage serré ; texte courant 17 à 21 px |
| Mise en page | sections pleine hauteur, contenu centré, largeur de lecture limitée ; sections claires et sombres en alternance |
| Visuels | captures réelles de Planner sur le jeu de démonstration neutre, dans des cadres d'appareils dessinés par nous |
| Animations | apparition au défilement (fondu et léger glissement), image qui grandit ou se fixe pendant le défilement, ressorts doux ; **aucune animation si l'utilisateur a demandé moins de mouvement** (`prefers-reduced-motion`) |
| Icônes | trait fin et régulier, coins arrondis (§ 5) |
| Langues | trois langues ; l'arabe en droite à gauche par les propriétés logiques du CSS dès le départ |

## 4 bis. Couleurs (réponse du chef : « les couleurs du logo »)

Les SVG ne sont pas encore dans le dépôt. Valeurs **provisoires**, relevées à l'œil sur les photos des logos du 18 nov. (`..\travaux-planner\boites\ressources\`, hors dépôt) ; à remplacer par les valeurs exactes des SVG dès qu'ils arrivent :

| Jeton | Rôle | Valeur provisoire |
|---|---|---|
| `bleu-nuit` | fond de l'icône, sections sombres, texte des titres sur fond clair | `#0B3B6F` |
| `bleu` | toque du logo horizontal, liens, bouton principal | `#1F65B3` |
| `bleu-profond` | face sombre de la toque, survol du bouton | `#0E4A8F` |
| `bleu-clair` | livre ouvert, fonds légers, accents | `#A8C8EA` |
| `blanc` | fonds clairs, toque de l'icône | `#FFFFFF` |
| `encre` | texte courant | `#1D1D1F` |

Le contraste AA de chaque paire texte et fond est vérifié avant R0. Tant que les SVG manquent, l'intégrateur **redessine** les deux logos en SVG à partir des photos (formes simples : carré arrondi, losange de la toque, aiguilles, pages du livre), avec la mention « redessiné d'après les logos officieux du 18 nov. ». Ils seront remplacés par les fichiers du chef. Une version simplifiée sert d'icône d'onglet, à 16 et 32 px.

## 5. Les bibliothèques choisies

| Besoin | Choix | Pourquoi | Ce qu'on a écarté |
|---|---|---|---|
| Animations | **Motion** (paquet `motion`, ex-Framer Motion), **déjà dans le projet** (v12) | apparitions au défilement (`whileInView`), effets liés au défilement (`useScroll`, `useTransform`), ressorts, animations de mise en page ; respect du mouvement réduit (`MotionConfig reducedMotion="user"`) ; aucune dépendance nouvelle | GSAP : très bon pour le défilement, mais une seconde bibliothèque d'animation ; Lottie : fichiers à produire à part |
| Icônes | **Lucide** (`lucide-react`, licence ISC) | plus de 1 500 icônes au trait fin et régulier, le plus proche de l'esprit Apple parmi les bibliothèques libres ; seule l'icône importée part dans le site | icônes Material (déjà là, mais au style Google) ; Phosphor (proche, moins répandu) ; SF Symbols (réservés aux appareils Apple) |
| Icônes animées | **lucide-animated** : des icônes Lucide animées au survol, écrites avec Motion, **copiées dans le dépôt** (pas de paquet) | même style que Lucide, aucune dépendance ; on copie seulement celles qu'on utilise | Lordicon (licence gratuite avec mention obligatoire, fichiers Lottie) |
| Site | **Astro**, site statique séparé (`vitrine/`), avec des îlots React pour les parties animées | VIT-01 demande un site « statique, séparé de l'application, rapide, référencé » : Astro produit du HTML lisible par les moteurs de recherche, et n'envoie du JavaScript qu'aux parties animées | une application Vite et React de plus : rapide à écrire, mais une page vide pour les moteurs de recherche, sauf à ajouter un outil de pré-rendu |

Lucide, les composants copiés de lucide-animated et Astro sont des **dépendances nouvelles** : c'est au chef de les accepter. Avant de les ajouter, l'agent vérifie la licence et choisit une version publiée depuis au moins deux semaines.

## 6. Composants

Repères d'[equipe.md](../../plan/equipe.md), § 3 : page 80 lignes, composant 150.

```
vitrine/
  src/styles/jetons.css          couleurs, espaces, rayons, ombres, tailles de titres
  src/components/socle/          Section, Titre, Accroche, CadreAppareil, Apparition, BoutonPrincipal, EnTete, PiedDePage
  src/components/icones/         icônes animées copiées, une par fichier
  src/components/accueil/        une section de l'accueil par fichier
  src/components/fonctions/      sections des pages de fonctions
  src/i18n/{fr,en,ar}/<page>.json
  src/pages/[lang]/…             une page Astro par page, qui assemble seulement
  public/logo/                   les SVG des logos, fournis par le chef
```

## 7. Données, sécurité, exigences

- Aucune donnée d'utilisateur, aucun cookie, aucune mesure d'audience, aucune police ni script chargés depuis un autre site (EP-13). Inter est servie par le site.
- Exigences : EP-2 (sobre), EP-11 (contraste AA, trois langues), EP-16 (aucun texte en dur), EP-17 (temps d'affichage mesuré : moins de 2 s sur un téléphone d'entrée de gamme simulé).

## 8. Vérifications

- Build du site sans erreur ; lien vérifié vers chaque page dans les trois langues.
- Lighthouse en local : performance, accessibilité et référencement au-dessus de 90 sur l'accueil.
- axe-core sans violation ; 390, 768 et 1440 px ; mouvement réduit respecté.
- `node scripts/verifier-neutre.mjs` étendu au dossier `vitrine/`.
- Une tâche de CI qui construit le site, sans le publier.

## 9. Étapes

1. Validation de ce plan par le chef, et dépôt des deux SVG des logos.
2. R0 par l'intégrateur : socle Astro, jetons, composants du socle, logo animé.
3. Lots en parallèle : accueil (intégrateur) ; pages de fonctions et sécurité (agent de Cursor).
4. Intégration, relecture, PR ; aucune mise en ligne.

## 10. Questions au chef

| N° | Question | Proposition |
|---|---|---|
| 1 | Valider ce plan, et les dépendances nouvelles Lucide et Astro ? | **oui (chef, 18 nov.)** |
| 2 | Quel logo pour le site : l'icône bleu nuit (variante 4) ou le logo horizontal à l'horloge (variante 1) ? | les deux : la variante 1 en tête de page, la variante 4 comme icône du site et dans la grille d'applications |
| 3 | Le logo « mosaïque » validé pour l'application reste-t-il en place tant que le logo officiel n'est pas choisi ? | **oui (chef, 18 nov.)** : le site vitrine prend les nouveaux logos, l'application ne change pas ce soir |
| 4 | Où déposes-tu les deux SVG ? | en attente ; d'ici là, logos redessinés (§ 4 bis) |
