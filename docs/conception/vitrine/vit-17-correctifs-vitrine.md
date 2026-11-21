# VIT-17 · Correctifs techniques du site vitrine (lot A) — plan court

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) · fiche [vit-17-correctifs-vitrine](../../plan/missions/vit-17-correctifs-vitrine.md) |
| Branche | `fix/vit-17-correctifs-vitrine`, depuis `origin/main` (`d27e30ee`) |
| Rédigé par | agent de Cursor, le 19 novembre 2026 |
| **Validé** | par le coordinateur, le 21 novembre 2026 ; libellé du bouton par le chef |

## 1. Objet

Sept correctifs issus de l'expertise (§ 13, lot A) et de la condition 12 (saut du menu mobile). Aucune phrase marketing nouvelle, sauf le libellé du bouton vidéo sur téléphone, fixé par le chef le 21 novembre : « Lire la vidéo » / « Play the video », sans le poids.

## 2. Solution

| Point | Principe |
|---|---|
| C6 menu | Script en ligne immédiatement après `</header>` : classe `repliable` et bouton visible avant le rendu du `<main>`. Le script différé ne fait que les clics. |
| C9 vidéo | `seule` faux si écran &lt; 48rem ou `effectiveType` ∈ {slow-2g, 2g, 3g} (en plus du mouvement réduit et de l'économie de données). |
| Bouton | Clé `video.commandes.lireMobile` : « Lire la vidéo » en français, « Play the video » en anglais, sans le poids ; arabe : clé vide. |
| `/ar/` | `getStaticPaths` utilise `LANGUES_PUBLIEES` seulement (`cheminsLangues()`). Fichiers `ar/*.json` et tests de clés inchangés. |
| Open Graph | `site: 'https://vitrine.finadmintech.fr'` (VIT-06) ; `og:*` et `twitter:card` dans `Gabarit.astro` ; image = fixe vidéo (`/videos/planner-<langue>.webp`). |
| Grilles | À 64rem : 2 colonnes si 2 cartes ; dernière carte seule centrée en colonne 2 si `3n+1` et pas `only-child`. |
| README | Ligne 28 : logos officiels du chef (18 nov.), version web. |

## 3. Questions

| N° | Question | Proposition | Réponse du chef | Bloque |
|---|---|---|---|---|
| 1 | Le libellé mobile du bouton vidéo (`lireMobile`) inclut-il le poids ? | « Lire la vidéo (1,5 Mo) » / « Play the video (1.5 MB) » | chef, 21 nov. : « Lire la vidéo » / « Play the video », sans le poids | — |

## 4. Fichiers

Voir la fiche de mission. Tests : `vitrine/tests/correctifs.test.js` (un test par point régressible). `suivi.md` : non modifié.

## 5. Vérification

`npm run test:unit`, build, `node scripts/verifier-neutre.mjs`. Lighthouse mobile sur `/fr/` avant et après (fiche de session). Playwright non posé sur `vitrine/` : les tests unitaires et la structure remplacent C6 et C9 en CI locale.