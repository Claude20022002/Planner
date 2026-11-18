# Mission · VIT-08 · vidéo de présentation globale de Planner, pour l'accueil du site

| | |
|---|---|
| État | ouverte : plan court à écrire |
| Agent | Claude (VS Code), après UIX-10a : la session qui a fixé le style du site et la charte |
| Modèle recommandé | celui de la session (Opus 5.5 ou Fable 5.2) |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) et [MKT](../modules/MKT-marketing.md) · préparation de VIT-05 |
| Fonction | VIT-08 : une vidéo de 75 à 90 s qui présente **tout Planner** (pas seulement l'emploi du temps), placée sur l'accueil du site · taille M |
| Branche | `feat/vit-08-video-presentation`, depuis `origin/main` (après UIX-10a, pour prendre les jetons générés) |
| Plan de conception | plan court à écrire (`docs/conception/vitrine/vit-08-video-presentation.md`) · **validé par le chef** (choix de produit : le message et l'ordre des scènes) |
| Condition de VIT-06 | **condition 6** de la mise en ligne (décision du chef, 18 nov.) |

## Ce que le chef a décidé (18 nov.)

- **Motion design, sans captures d'écran** : des illustrations dessinées comme les cadres d'appareils du site, aux couleurs et avec l'animation du site. Rien ne vieillit quand l'application change de style (UIX-10b).
- **Sous-titres, sans voix ni musique** : des textes animés à l'écran, une version en français et une en anglais. L'arabe viendra après UIX-04.
- Toutes les applications : emploi du temps calculé, appel, Studio quiz et jeux pédagogiques, bibliothèque, espace de cours et annonces, établissement (salles, examens, campus), sécurité, application mobile.
- Plus tard, **une vidéo par module**, avec des captures, après UIX-10b. Celle-ci est la vidéo d'ensemble.

## Ce que le plan doit établir

- Le **découpage en scènes** (6 à 9), avec le texte de chaque scène dans les deux langues, et la source de chaque affirmation dans le code. On ne dit que ce qui existe.
- **L'outil** : le projet Remotion du dépôt (`docs/presentation/video/`, 27 scènes existantes dont `K7Jeux`, `M7Jeux`), ou un projet neuf à côté. Les jetons viennent de `shared/charte/` (UIX-10a).
- **La sortie** : WebM et MP4, en 1080p et en 720p, une image fixe d'attente. Un poids visé (par exemple moins de 6 Mo en 720p), pour que la note Lighthouse de l'accueil reste au-dessus de 90.
- **L'intégration** sur l'accueil :
  - lecture sans le son ;
  - aucun chargement avant que la section soit visible ;
  - image fixe à la place quand le mouvement réduit est demandé ;
  - commandes accessibles ;
  - la transcription des textes sous la vidéo (WCAG 1.2.1) ;
  - fichiers servis par le site lui-même, rien chargé d'ailleurs.
- Où vivent les sources (le projet Remotion) et les fichiers rendus (`vitrine/public/videos/`). Un fichier vidéo lourd dans le dépôt est-il acceptable, ou faut-il une autre solution ? La question remonte au chef.

## Périmètre d'écriture

- le projet vidéo : `docs/presentation/video/`, une nouvelle composition, sans casser les 27 scènes ;
- `vitrine/public/videos/`, `vitrine/src/pages/[lang]/index.astro`, `vitrine/src/components/accueil/`, `vitrine/src/i18n/*/accueil.json` ;
- le plan court, `docs/plan/modules/VIT-site-vitrine.md` et la fiche de session.

L'agent ne touche pas à `docs/plan/suivi.md`, ni aux pages de VIT-07 (agent de Cursor).

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 15 h 40 | fiche écrite, sur décision du chef | — |
