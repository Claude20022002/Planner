# VIT-20f · Mise en page des grilles d’applications

| | |
|---|---|
| Branche | `refactor/vit-20f-tuiles-catalogue` |
| Taille | S |
| Visa | Proposition validée par le chef le 26 novembre 2026 dans la session Codex |
| Base | Logos officiels de VIT-20f (#284), avec VIT-23 (#282) intégré |

## Mise en page

Appliquer la retouche au catalogue « Toutes les applications » et à la grille de l’accueil. Centrer la grille dans la page et aligner les titres de catégorie sur son bord gauche. Prévoir jusqu’à six colonnes à 1 440 px et deux à 390 px.

Placer chaque SVG officiel au centre d’un carré clair avec un filet discret. Sur ordinateur, le carré mesure 76 px et le SVG 60 px. Sur mobile, ils mesurent 64 px et 48 px. Aligner le haut des carrés dans la rangée et placer le nom sous le carré, centré sur le fond de la page, en Inter semi-gras. Les noms longs peuvent passer sur deux lignes.

Reprendre le fond gris bleuté et l’encre de la vitrine. Pour les modules disponibles, le logo en couleur et le nom forment un lien avec un focus visible. Les modules « Bientôt » gardent le même gabarit avec le SVG grisé et le statut sous le nom.

## Périmètre et vérification

Appliquer la variante compacte à `GrilleModules.astro` et `TuileModule.astro`. Les autres appels de `TuileModule` utilisent leurs variantes actuelles. Mettre à jour le document du module et la fiche de session.

Vérifier l’affichage et le parcours clavier sur le site construit, à 390 et 1 440 px, en français et en anglais. Vérifier notamment les 17 tuiles, les cinq liens, le statut des douze modules à venir, la taille des logos et l’absence de débordement horizontal. Lancer les tests unitaires, le build, les tests de rendu et de menu, axe-core, EP-19 et le contrôle de neutralité. Faire les captures de l’accueil et du catalogue hors dépôt. Le retour arrière consiste à rétablir les deux composants et les assertions de mise en page.
