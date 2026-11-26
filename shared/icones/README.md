# Icônes partagées de Planner

Bibliothèque unique des **logos des applications** et des **icônes vivantes** (VIT-09a, [plan](../../docs/conception/vitrine/vit-09a-logos-icones.md)). Le site vitrine les pose avec VIT-09b. L'application les prendra avec UIX-10b, à la place des dégradés et des icônes de la grille d'UIX-09 (décision du chef, 18 nov.).

## Logos des applications

`modules/<id>.svg` (dessin détaillé, 40 à 96 px) et `modules/<id>-petit.svg` (dessin simplifié, 24 à 32 px), pour les sept applications de la grille et les treize nouveaux logos du catalogue :

| id | Application | Objet |
|---|---|---|
| `planning` | Emploi du temps | calendrier, séance placée, page du jour |
| `pedagogie` | Enseignements | tableau sur chevalet, note |
| `personnes` | Personnes | deux personnes, badge |
| `etablissement` | Établissement | école et drapeau, second bâtiment |
| `annonces` | Annonces | mégaphone et ondes |
| `activites` | Quiz et jeux | manette, bulle de question |
| `bibliotheque` | Bibliothèque | livres sur une étagère |
| `presences` | Présences | feuille d’appel cochée |
| `cours` | Espace de cours | cahier ouvert à onglet |
| `vacataires` | Vacataires et heures | feuille d’heures et horloge |
| `evaluations` | Évaluations, crédits et jurys | copie avec sceau |
| `inscriptions` | Inscriptions | dossier et signe plus |
| `documents` | Documents vérifiables | attestation à coin plié |
| `stages` | Stages | mallette à poignée |
| `frais` | Frais et caisse | tiroir de caisse |
| `formation` | Formation et financeurs | chevalet et jalons |
| `familles` | Vie scolaire et familles | maison et deux silhouettes |
| `etat` | Échanges avec l’État | fronton sur colonnes |
| `paiements` | Paiements en ligne | carte et flèche |
| `pilotage` | Pilotage | cadran à aiguille |

- **Couleurs** : seulement la charte. La tuile va de `app-<id>` à `app-<id>-fonce` (famille `applications` de `shared/charte/jetons.json`). Les détails sont en blanc, `bleu-clair`, `bleu-nuit` et `jeu`.
- **Clair et sombre** : la tuile porte sa couleur et un léger contour clair. Le même fichier sert sur les deux fonds.
- **Poser un logo** : en `<img>`, avec le fichier qui convient à la taille (`fichierLogo(id, taille)` de `index.js`). Le texte de remplacement est vide si le nom de l'application est écrit à côté.
  - L'`<img>` évite les identifiants en double et se met en cache.
  - Les identifiants des dégradés sont tout de même préfixés (`vit-<id>-…`) et uniques, si un logo doit être inséré dans la page.

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
