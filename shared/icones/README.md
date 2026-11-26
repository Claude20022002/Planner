# Icônes partagées de Planner

Bibliothèque unique des **logos des applications** et des **icônes vivantes** (VIT-09a, [plan](../../docs/conception/vitrine/vit-09a-logos-icones.md)). Le site vitrine les pose avec VIT-09b. L'application les prendra avec UIX-10b, à la place des dégradés et des icônes de la grille d'UIX-09 (décision du chef, 18 nov.).

## Logos des applications

`modules/<id>.svg` (dessin détaillé, 40 à 96 px) et `modules/<id>-petit.svg` (dessin simplifié, 24 à 32 px), pour les sept applications de la grille et les treize logos du catalogue. Depuis VIT-09d ([plan](../../docs/conception/vitrine/vit-09d-logos-style-planner.md), choix du chef du 26 nov.), ils suivent **le style du logo Planner** : formes plates, une ombre en aplat, traits à bouts ronds, deux objets fondus en un signe.

| id | Application | Objet |
|---|---|---|
| `planning` | Emploi du temps | calendrier à anneaux dont la page est un cadran |
| `pedagogie` | Enseignements | tableau sur chevalet, courbe à la craie |
| `personnes` | Personnes | badge à cordon et silhouette |
| `etablissement` | Établissement | école, porte en arche, drapeau au faîte |
| `annonces` | Annonces | mégaphone et ondes |
| `activites` | Quiz et jeux | manette sans boutons, point d’interrogation |
| `bibliotheque` | Bibliothèque | livres sur une planche |
| `presences` | Présences | planchette à pince et coche |
| `cours` | Espace de cours | cahier à spirale et marque-page |
| `vacataires` | Vacataires et heures | chronomètre devant une feuille d’heures |
| `evaluations` | Évaluations, crédits et jurys | copie et rosette à rubans |
| `inscriptions` | Inscriptions | chemise à onglet et signe plus |
| `documents` | Documents vérifiables | feuille à coin plié et bouclier coché |
| `stages` | Stages | mallette à poignée |
| `frais` | Frais et caisse | caisse et reçu dentelé |
| `formation` | Formation et financeurs | escalier de trois marches et drapeau |
| `familles` | Vie scolaire et familles | toit, un adulte et un enfant |
| `etat` | Échanges avec l’État | fronton sur colonnes et flèches d’échange |
| `paiements` | Paiements en ligne | carte et flèche |
| `pilotage` | Pilotage | cadran en demi-cercle à aiguille |

- **Gabarit** : `viewBox` 0 0 96 96, tuile de 88 à 4 px du bord, rayon 19,5 (rapport de l'icône Planner), filet blanc à 15 % d'opacité.
- **Couleurs** : la tuile est **en aplat** `app-<id>` (famille `applications` de `shared/charte/jetons.json`). Le dessin est en blanc et `bleu-clair`, les ombres en aplat et les traits fins en `app-<id>-fonce`. Ni dégradé, ni jaune `jeu`, ni couleur d'une autre application.
- **Clair et sombre** : la tuile porte sa couleur et un léger contour clair. Le même fichier sert sur les deux fonds.
- **Poser un logo** : avec le fichier qui convient à la taille (`fichierLogo(id, taille)` de `index.js`). Le texte de remplacement est vide si le nom de l'application est écrit à côté.
  - En `<img>`, le logo se met en cache.
  - Incorporé dans la page, comme le fait le site (`vitrine/src/components/applications/logos.js`), il ne pose aucun problème : aucun logo n'a d'identifiant interne ni de renvoi `url(#…)`, et le même logo peut paraître deux fois.

## Illustrations du catalogue

Les dix-sept identifiants de `MODULES_ILLUSTRES` ont une illustration carrée dans `images/<id>.webp` (512 × 512 px, cible de 15 Ko, plafond de 20 Ko). Le catalogue utilise les SVG. Les pages détaillées peuvent charger leur illustration dans le budget de la page.

## Icônes vivantes

`vivantes/<nom>.svg`, animées par `vivantes/vivantes.css` :
- **Les icônes** : `fleche-droite`, `fleche-bas`, `chevron-droit`, `chevron-bas`, `menu`, `lien-externe`, `envoyer`, `telecharger`, `lecture`, `pause`, `revoir`, `langue`.
- **Le dessin** : tracés de [Lucide](https://lucide.dev) (licence ISC, `LICENSE-lucide`), sur une grille de 24, trait de 2, couleur du texte (`currentColor`).
- **Poser une icône** :
  - insérer le SVG dans le bouton ou le lien ;
  - donner à ce porteur la classe `icone-vivante` ;
  - charger `vivantes.css` une fois.
- **Le mouvement** : une animation brève au survol et au focus du clavier (`:focus-visible`), en CSS seulement, sans JavaScript. Elle est coupée sous `prefers-reduced-motion: reduce`.
- **Accessibilité** : l'icône est décorative (`aria-hidden`). Le nom accessible est le texte du bouton ou du lien.

## Vérifier

```powershell
node --test shared/icones/icones.test.js      # couleurs de la charte, identifiants, poids, animations
node shared/icones/generer-apercu.mjs         # écrit apercu.html (non commité), à ouvrir dans un navigateur
```
