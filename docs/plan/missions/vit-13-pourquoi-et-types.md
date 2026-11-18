# Mission · VIT-13 · « Pourquoi Planner » sur l'accueil, et les fonctionnalités par type d'établissement

| | |
|---|---|
| État | ouverte : plan court après la fusion de VIT-08 (#216, accueil) et de VIT-10b |
| Agent | agent de Cursor (Grok 4.7 high) : textes au gabarit connu, chaque phrase citée |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. vers 20 h 55, d'après le site d'OpenEduCat ; **condition 10** de la mise en ligne |
| Module | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05 |
| Fonction | VIT-13 : une section « Pourquoi Planner » sur l'accueil ; et, pour chaque type d'établissement, les fonctionnalités qui le concernent, regroupées comme le menu « Par institution » d'OpenEduCat · taille M |
| Branche | `feat/vit-13-pourquoi-et-types`, depuis `origin/main` |
| Plan de conception | plan court `docs/conception/vitrine/vit-13-pourquoi-et-types.md` · **validé par le chef** (ce que le site promet) |

## Ce que le chef a choisi (18 nov., vers 20 h 55)

1. **« Pourquoi Planner »** sur l'accueil : quatre cartes, tirées des arguments déjà sourcés ([arguments marketing](../../etude-marche/02-arguments-marketing.md), § 2 ; et les pages Sécurité et données). Propositions à soumettre : les données restent à l'école ; rien n'est envoyé en cachette (EP-13) ; une seule plateforme et un seul compte ; ça marche sans le téléphone de l'élève (EP-18).
2. **Les fonctionnalités regroupées par type d'établissement**, « comme OpenEduCat ». Les types sont ceux de la page Solutions (VIT-05) : collège et lycée, supérieur, formation professionnelle. Pour chacun, les apps et fonctionnalités qui le concernent **aujourd'hui**, d'après le code ; ce qui est prévu est marqué « Bientôt ». Le plan propose où les présenter : dans la page Solutions, une page par type, ou les deux. Le chef choisit.

Les **logos des modules** (une icône dessinée par app ou module) sont faits par **VIT-09**, qui passe après : VIT-13 laisse leur place et utilise les clés d'apps de `frontend/src/i18n/applications.fr.js`.

## Critère de « terminé »

- Chaque phrase s'appuie sur un fichier du code ou une page déjà publiée, cité dans le plan ; aucun chiffre, aucun témoignage, aucun nom d'école.
- EP-18 et EP-5 tenues (aucun téléphone comme seul chemin, aucun pays ni aucune monnaie).
- Français et anglais ; build, tests, `verifier-neutre.mjs`, axe-core, 390, 768 et 1440 px.

## Périmètre d'écriture

`vitrine/src/components/accueil/` (une section nouvelle) et `vitrine/src/pages/[lang]/index.astro` (une ligne), `accueil.json` (la clé de la section) ; `vitrine/src/components/solutions/`, la page Solutions et `solutions.json`, ou des pages par type si le chef les retient (avec leurs clés dans `langues.js`) ; `vitrine/tests/` ; le plan, la ligne du module, la fiche de session. **Pas** `docs/plan/suivi.md`, ni la vidéo (VIT-08), ni les icônes (VIT-09), ni le menu « Fonctions » (VIT-11).

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 21 h | fiche écrite, sur la décision du chef | — |
