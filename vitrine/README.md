# Site vitrine de Planner

Site statique qui présente le produit Planner (module VIT, [plan](../docs/conception/vitrine/vit-vitrine.md)). Astro, Inter, Motion pour les animations, Lucide pour les icônes. **Rien n'est mis en ligne** : le site se construit et se prévisualise en local, ou en artefact de CI (`.github/workflows/vitrine.yml`).

## Lancer

```powershell
cd vitrine
npm ci
$env:ASTRO_TELEMETRY_DISABLED = "1"   # aucune donnée d'usage envoyée par Astro
npm run dev          # http://localhost:4321/fr/
npm run test:unit    # traductions (mêmes clés en fr, en, ar) et contrastes AA des jetons
npm run build        # dist/
npm run preview
```

## Où est quoi

| Dossier | Contenu |
|---|---|
| `src/styles/jetons.css` | couleurs des logos, espaces, rayons, tailles de titres |
| `src/components/socle/` | gabarit, en-tête, pied, `Section`, `Titre`, `Accroche`, `BoutonPrincipal`, `CadreAppareil`, `Apparition`, `Duo`, `Logo`, `animations.js` |
| `src/components/accueil/` | une section de l'accueil par fichier |
| `src/components/fonctions/` | sections des pages de fonctions |
| `src/i18n/<langue>/<page>.json` | tous les textes ; aucun texte en dur dans les composants |
| `src/i18n/langues.js` | langues construites et publiées, chemins des pages |
| `src/pages/[lang]/` | une page Astro par page, qui assemble seulement |
| `public/logo/` | logos redessinés d'après les logos officieux du 18 nov., à remplacer par les SVG du chef |

## Règles

- **Textes** : chaque texte dans `src/i18n/fr/<page>.json`, avec la même clé en `en` et en `ar` (le test le vérifie). Un texte arabe vide prend le français ; l'arabe est construit mais non indexé ni proposé tant que `LANGUES_PUBLIEES` ne le contient pas (après UIX-04).
- **Sens d'écriture** : propriétés logiques du CSS (`inline`, `block`), jamais `left` ou `right`.
- **Animations** : `<Apparition>` (fondu au défilement) ou `<Apparition effet="grandir">`. Rien ne bouge si le mouvement réduit est demandé.
- **Icônes** : `import { Nom } from 'lucide-react'` dans un composant Astro ; l'icône est rendue en SVG au build, sans JavaScript.
- **Aucune ressource d'un autre site** : polices, images et scripts sont servis par le site.
- **On ne promet que ce qui existe** ; ce qui est prévu est marqué « Bientôt ».
