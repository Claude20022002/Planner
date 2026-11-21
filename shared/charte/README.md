<!-- Généré par shared/charte/generer.mjs, version 3, empreinte 6c550805edcf : ne pas modifier ; changer shared/charte/jetons.json -->
# Charte de Planner

Guide généré depuis [jetons.json](jetons.json), version 3. Couleurs du logo relevées sur les SVG officiels du chef (18 nov., originaux dans shared/charte/logos-officiels/) ; teintes des applications (version 3) : celles de la grille d'UIX-09, converties en hexadécimal (logos de VIT-09a) ; bleu-profond : même teinte que bleu, plus sombre. Augmenter « version » à chaque valeur changée, puis lancer node shared/charte/generer.mjs.

## Changer une valeur

1. Modifier `shared/charte/jetons.json` et augmenter `version`.
2. Lancer `node shared/charte/generer.mjs` : il vérifie chaque paire de contraste, puis réécrit `vitrine/src/styles/jetons.css` et ce guide.
3. Commiter la source et les deux sorties. En CI, `node shared/charte/generer.mjs --verifier` échoue si une sortie n'est plus à jour ou si une paire passe sous son seuil.

Ne jamais retoucher une sortie à la main. La colonne « Site » marque les jetons écrits dans le CSS du site vitrine ; les autres servent aux applications, qui les lisent par `shared/charte/index.js`.

## Couleurs

| Jeton | Valeur | Rôle | Logo | Site |
|---|---|---|---|---|
| `bleu-nuit` | `#17395C` | couleur principale du logo : titres, bandeaux, fonds forts | oui | oui |
| `bleu` | `#2A679F` | liens, boutons et accents sur fond clair ; contour du focus | oui | oui |
| `bleu-profond` | `#21507C` | survol et appui des boutons bleus | oui | oui |
| `bleu-clair` | `#A6CAEE` | texte et accents sur bleu nuit ou sur l'écran ; action du mode sombre | oui | oui |
| `blanc` | `#FFFFFF` | fond des pages et des cartes ; texte sur les bleus foncés | oui | oui |
| `encre` | `#1D1D1F` | texte courant | oui | oui |
| `gris-fond` | `#F2F5F9` | fond des sections alternées et des panneaux clairs | — | oui |
| `gris-texte` | `#5A6472` | texte secondaire : légendes, aides, dates | — | oui |
| `gris-trait` | `#D9E0E8` | filets décoratifs seulement (1,3:1 sur blanc) ; jamais le bord d'un champ | — | oui |
| `bleu-pale` | `#C9DBEF` | texte doux sur bleu nuit ; fond de sélection | — | oui |
| `ecran` | `#0F1A2B` | fond des écrans d'appareil et du panneau ; fond du mode sombre | — | oui |
| `trait-fort` | `#7D8A9C` | bord des champs et des commandes (WCAG 1.4.11), en clair et en sombre | — | — |
| `bleu-vif` | `#3B82D6` | accent de repli d'une école sans couleurs (D-21) : 3:1 sur blanc et sur l'écran | — | — |
| `jeu` | `#FFC83D` | accent des jeux et du Studio quiz : podium, bouton « Jouer », célébrations ; jamais du texte sur blanc, texte bleu nuit dessus | — | — |

## Mode sombre

Le fond du mode sombre est `ecran` ; l'action est `bleu-clair`, avec le texte `ecran` dessus. Le site vitrine n'a pas de mode sombre.

| Jeton | Valeur | Rôle | Site |
|---|---|---|---|
| `surface-sombre` | `#172338` | cartes et cases du mode sombre, posées sur l'écran (le fond du sombre est « ecran ») | — |
| `texte-sombre` | `#EDF1F7` | texte courant du mode sombre | — |
| `texte-sombre-second` | `#A9B6C8` | texte secondaire du mode sombre | — |
| `focus-sombre` | `#7FB0E6` | contour du focus en mode sombre (l'action du sombre est « bleu-clair », texte « ecran » dessus) | — |

## Teintes des applications (logos)

| Jeton | Valeur | Rôle | Site |
|---|---|---|---|
| `app-planning` | `#0B66D6` | logo de l'application Emploi du temps : ton clair du dégradé de la tuile | — |
| `app-planning-fonce` | `#212F82` | logo de l'application Emploi du temps : ton foncé du dégradé et ombres | — |
| `app-pedagogie` | `#007B80` | logo de l'application Enseignements : ton clair du dégradé de la tuile | — |
| `app-pedagogie-fonce` | `#00475C` | logo de l'application Enseignements : ton foncé du dégradé et ombres | — |
| `app-personnes` | `#775EBA` | logo de l'application Personnes : ton clair du dégradé de la tuile | — |
| `app-personnes-fonce` | `#3F3687` | logo de l'application Personnes : ton foncé du dégradé et ombres | — |
| `app-etablissement` | `#3C638C` | logo de l'application Établissement : ton clair du dégradé de la tuile | — |
| `app-etablissement-fonce` | `#20385C` | logo de l'application Établissement : ton foncé du dégradé et ombres | — |
| `app-annonces` | `#AE532D` | logo de l'application Annonces : ton clair du dégradé de la tuile | — |
| `app-annonces-fonce` | `#75201C` | logo de l'application Annonces : ton foncé du dégradé et ombres | — |
| `app-activites` | `#A94088` | logo de l'application Quiz et jeux : ton clair du dégradé de la tuile | — |
| `app-activites-fonce` | `#5E256D` | logo de l'application Quiz et jeux : ton foncé du dégradé et ombres | — |
| `app-bibliotheque` | `#077952` | logo de l'application Bibliothèque : ton clair du dégradé de la tuile | — |
| `app-bibliotheque-fonce` | `#004C3B` | logo de l'application Bibliothèque : ton foncé du dégradé et ombres | — |

## Typographie

| Jeton | Valeur | Rôle | Site |
|---|---|---|---|
| `police` | `'Inter Variable', Inter, system-ui, sans-serif` | seule famille : Inter variable pour le site, Inter des paquets déjà installés pour le web et le mobile | oui |
| `titre-geant` | `clamp(3rem, 2rem + 5vw, 6rem)` | titre d'ouverture des pages publiques | oui |
| `titre-grand` | `clamp(2.5rem, 1.75rem + 3.5vw, 4.5rem)` | titres de section des pages publiques et des accueils | oui |
| `titre-moyen` | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` | sous-titres des pages publiques | oui |
| `texte-accroche` | `clamp(1.1875rem, 1.05rem + 0.6vw, 1.3125rem)` | texte d'accroche sous un titre | oui |
| `texte` | `1.0625rem` | texte courant | oui |
| `texte-petit` | `0.875rem` | légendes et mentions | oui |
| `interligne-titre` | `1.05` | interligne des titres | oui |
| `interligne-texte` | `1.5` | interligne du texte | oui |
| `titre-gestion-grand` | `1.75rem` | titre de page des écrans de gestion (échelle fixe, plus serrée) | — |
| `titre-gestion-moyen` | `1.375rem` | titre de bloc des écrans de gestion | — |
| `titre-gestion-petit` | `1.125rem` | intertitre des écrans de gestion | — |

## Espaces et largeurs

| Jeton | Valeur | Rôle | Site |
|---|---|---|---|
| `espace-1` | `0.5rem` | écart le plus serré | oui |
| `espace-2` | `1rem` | écart courant | oui |
| `espace-3` | `1.5rem` | écart entre blocs voisins | oui |
| `espace-4` | `2.5rem` | écart entre groupes | oui |
| `espace-5` | `4rem` | écart le plus large | oui |
| `espace-section` | `clamp(5rem, 3rem + 8vw, 10rem)` | marge haute et basse d'une section | oui |
| `gouttiere` | `clamp(1rem, 0.5rem + 2.5vw, 2.5rem)` | marge latérale de la page | oui |
| `largeur-lecture` | `44rem` | largeur maximale d'un texte à lire | oui |
| `largeur-contenu` | `76rem` | largeur maximale du contenu | oui |
| `hauteur-entete` | `3.25rem` | hauteur de l'en-tête | oui |

## Rayons

| Jeton | Valeur | Rôle | Site |
|---|---|---|---|
| `rayon-petit` | `0.75rem` | petites cartes et vignettes (12 px) | oui |
| `rayon` | `1.25rem` | cartes (20 px) | oui |
| `rayon-grand` | `2rem` | grands panneaux et appareils (32 px) | oui |
| `rayon-pilule` | `999px` | boutons et puces arrondis | oui |
| `rayon-commande` | `0.5rem` | champs, boutons et puces de la gestion dense (8 px) | — |

## Ombres

| Jeton | Valeur | Rôle | Site |
|---|---|---|---|
| `ombre-carte` | `0 1px 2px rgb(23 57 92 / 6%), 0 8px 24px rgb(23 57 92 / 8%)` | ombre des cartes | oui |
| `ombre-appareil` | `0 30px 60px -20px rgb(23 57 92 / 35%)` | ombre des appareils mis en scène | oui |

## Mouvement

| Jeton | Valeur | Rôle | Site |
|---|---|---|---|
| `duree` | `200ms` | durée normale d'une transition | oui |
| `courbe` | `cubic-bezier(0.22, 1, 0.36, 1)` | courbe de toutes les transitions | oui |
| `duree-rapide` | `120ms` | durée rapide (survol, appui) | — |
| `duree-lente` | `320ms` | durée lente (ouverture d'un panneau) | — |
| `courbe-tableau` | `[0.22, 1, 0.36, 1]` | la même courbe, en tableau, pour Motion (web) et Reanimated (mobile) | — |

## Contrastes vérifiés

Seuils WCAG 2.2 : 4,5:1 pour le texte, 3:1 pour les traits, le focus et les composants. Le rapport est calculé sans arrondi ; il est arrondi ici pour la lecture.

### Clair

| Texte ou trait | Fond | Rapport | Seuil |
|---|---|---|---|
| `encre` | `blanc` | 16,83:1 | 4,5:1 |
| `encre` | `gris-fond` | 15,39:1 | 4,5:1 |
| `gris-texte` | `blanc` | 6,00:1 | 4,5:1 |
| `gris-texte` | `gris-fond` | 5,49:1 | 4,5:1 |
| `bleu` | `blanc` | 5,93:1 | 4,5:1 |
| `bleu` | `gris-fond` | 5,43:1 | 4,5:1 |
| `blanc` | `bleu` | 5,93:1 | 4,5:1 |
| `blanc` | `bleu-profond` | 8,39:1 | 4,5:1 |
| `blanc` | `bleu-nuit` | 11,82:1 | 4,5:1 |
| `bleu-clair` | `bleu-nuit` | 6,93:1 | 4,5:1 |
| `bleu-pale` | `bleu-nuit` | 8,37:1 | 4,5:1 |
| `bleu-nuit` | `blanc` | 11,82:1 | 4,5:1 |
| `bleu-nuit` | `bleu-clair` | 6,93:1 | 4,5:1 |
| `blanc` | `ecran` | 17,46:1 | 4,5:1 |
| `bleu-clair` | `ecran` | 10,23:1 | 4,5:1 |
| `trait-fort` | `blanc` | 3,51:1 | 3:1 |
| `trait-fort` | `gris-fond` | 3,21:1 | 3:1 |
| `bleu-vif` | `blanc` | 3,93:1 | 3:1 |
| `bleu-nuit` | `jeu` | 7,65:1 | 4,5:1 |
| `blanc` | `app-planning` | 5,40:1 | 4,5:1 |
| `blanc` | `app-planning-fonce` | 11,71:1 | 4,5:1 |
| `blanc` | `app-pedagogie` | 5,07:1 | 4,5:1 |
| `blanc` | `app-pedagogie-fonce` | 10,21:1 | 4,5:1 |
| `blanc` | `app-personnes` | 5,13:1 | 4,5:1 |
| `blanc` | `app-personnes-fonce` | 10,05:1 | 4,5:1 |
| `blanc` | `app-etablissement` | 6,26:1 | 4,5:1 |
| `blanc` | `app-etablissement-fonce` | 11,79:1 | 4,5:1 |
| `blanc` | `app-annonces` | 5,15:1 | 4,5:1 |
| `blanc` | `app-annonces-fonce` | 10,61:1 | 4,5:1 |
| `blanc` | `app-activites` | 5,56:1 | 4,5:1 |
| `blanc` | `app-activites-fonce` | 10,71:1 | 4,5:1 |
| `blanc` | `app-bibliotheque` | 5,43:1 | 4,5:1 |
| `blanc` | `app-bibliotheque-fonce` | 10,01:1 | 4,5:1 |

### Sombre

| Texte ou trait | Fond | Rapport | Seuil |
|---|---|---|---|
| `texte-sombre` | `ecran` | 15,40:1 | 4,5:1 |
| `texte-sombre` | `surface-sombre` | 13,89:1 | 4,5:1 |
| `texte-sombre-second` | `ecran` | 8,49:1 | 4,5:1 |
| `texte-sombre-second` | `surface-sombre` | 7,66:1 | 4,5:1 |
| `ecran` | `bleu-clair` | 10,23:1 | 4,5:1 |
| `bleu-clair` | `surface-sombre` | 9,22:1 | 3:1 |
| `focus-sombre` | `ecran` | 7,69:1 | 3:1 |
| `focus-sombre` | `surface-sombre` | 6,94:1 | 3:1 |
| `trait-fort` | `ecran` | 4,98:1 | 3:1 |
| `trait-fort` | `surface-sombre` | 4,49:1 | 3:1 |
| `bleu-vif` | `ecran` | 4,45:1 | 3:1 |
| `jeu` | `ecran` | 11,29:1 | 3:1 |

## Paires interdites

| Texte | Fond | Rapport | Pourquoi |
|---|---|---|---|
| `bleu` | `bleu-pale` | 4,20:1 | texte bleu sur fond bleu pâle : sous 4,5:1 |
