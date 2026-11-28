# Session du 28 novembre 2026 · VIT-25 · Intégration des boucles

Le chef a demandé d’intégrer les vidéos montrées. Le [plan du lot](../conception/vitrine/vit-25-integration-boucles.md) a été commité seul à f456816c. Le code est à e3585672 sur feat/vit-25-integration-boucles, branche issue de la tête de VIT-24 (#295).

## Livré

- Présences montre l’appel à la main, Emploi du temps l’ouverture d’une fiche de séance. Les deux pages gardent leurs sections existantes.
- Les captures utilisent le frontend Planner et des données d’API fictives. Les versions FR et EN ont leur propre MP4 muet de 5,5 secondes et leur image d’attente.
- Le lecteur conserve la pause manuelle et respecte le mouvement réduit, le téléphone et les connexions économes.

## Vérifié

- Build de 43 pages et 251 tests unitaires et de rendu réussis, un sauté (StudyLib). 77 résultats axe-core et sept résultats du parcours de lecture réussis.
- Budget EP-19 des quatre pages de 101 455 à 103 624 octets. Les MP4 restent sous 232 000 octets. Neutralité, charte et contrôle de diff verts.
- Captures dans le dossier hors dépôt captures-vit-25/vitrine-integree.

## État laissé et reprise

VIT-25 est intégrée et commitée en local pour les deux vidéos. Après la fusion de VIT-24 (#295), publier la branche, ouvrir la PR et vérifier sa CI. Les guides, FAQ, autres modules et l’outillage complet suivent le plan général VIT-25 (0a5ce400).

Prompt de reprise : reprendre feat/vit-25-integration-boucles et lire le plan du lot et cette fiche. Les deux boucles FR/EN sont intégrées et testées. Après la fusion de #295, préparer la PR et vérifier sa CI.
