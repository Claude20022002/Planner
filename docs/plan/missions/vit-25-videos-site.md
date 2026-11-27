# Mission · VIT-25 · des captures, des vidéos courtes et des animations qui montrent vraiment Planner

| | |
|---|---|
| État | ouverte : plan à écrire, au chef |
| Agent | **session Claude neuve** (VS Code), à ouvrir par le chef ; elle reprend aussi **VIT-09b** (#227 : captures neutres, icônes vivantes, page Application), qui partage le même travail de captures |
| Modèle recommandé | le plus capable : Claude Fable 5.2, sinon Opus 5.5. Mise en scène, Remotion, poids et accessibilité à tenir ensemble |
| Attribuée le | 2026-11-27, par le coordinateur ; accord du chef : oui, le 2026-11-27 (« des vidéos illustrant vraiment nos éléments : captures, motion design de quelques secondes, voire des GIF ») |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · **hors chantier**, sur la demande du chef ; active la ligne « plus tard » du 18 nov. (plan du site, § 3 bis) |
| Fonction | VIT-25 : chaque page de module et l'accueil montrent Planner en vrai : captures, boucles de quelques secondes en motion design, animations légères · taille M, en lots |
| Branche | `feat/vit-25-videos-site` pour le plan, depuis `origin/main` ; puis une branche par lot |
| Dossier de travail | `..\travaux-planner\vit-25-videos-site` |
| Plan de conception | à écrire : `docs/conception/vitrine/vit-25-videos-site.md` · **validé par le chef** (rendu, durée, phrases) |

## Ce que le chef a demandé (27 nov.)

Le site doit avoir **des vidéos qui illustrent vraiment nos éléments** : des captures (images), des vidéos en **motion design de quelques secondes**, voire des **GIF**.

## Ce qui est déjà décidé (18 nov., plan du site § 3 bis)

- Les vidéos se font **sur les captures réelles du jeu de démonstration neutre** (aucune donnée réelle, aucun nom d'école ni de personne).
- **Sans son** par défaut ; **une image fixe** à la place quand l'utilisateur demande moins de mouvement (`prefers-reduced-motion`).
- Fichiers **servis par le site lui-même** (la politique de sécurité du site n'admet aucune source extérieure).
- Outil proposé : **Remotion**, déjà employé pour la vidéo de promotion ; animations de page : **Motion**, déjà dans le site.
- Le site ne montre que ce qui existe ; ce qui est prévu est « Bientôt ».

## Ce que le plan doit trancher (questions au chef, avec propositions)

| N° | Question | Proposition |
|---|---|---|
| 1 | Le format des boucles | vidéo MP4 (H.264) et WebM muettes en boucle, 3 à 8 s, plutôt que le GIF, 5 à 10 fois plus lourd pour la même image ; un GIF seulement là où une vidéo ne passe pas (par exemple le README) |
| 2 | Le poids | une image d'attente (WebP) dans la page ; la vidéo chargée quand elle devient visible (`preload="none"`), 300 Ko au plus par boucle ; EP-19 (200 Ko par page, hors média lancé à la demande) mesuré dans la PR |
| 3 | Où | une boucle par page de module (Emploi du temps, Présences, Espace de cours, Annonces et messages ; Quiz et Jeux après QJE-17), deux ou trois sur l'accueil |
| 4 | Les scènes | une par fonction réelle, écrite en toutes lettres (ce qu'on voit, seconde par seconde), visée par le chef avant le rendu |
| 5 | Connexion lente (EP-18) | l'image d'attente suffit à comprendre ; la vidéo ne se charge pas si l'appareil signale une connexion économe (`saveData`) |

## L'ordre (pour ne pas refaire le travail)

1. **Après VIT-24** (Codex) pour les pages de modules, dont la mise en page change.
2. Quiz et Jeux **après l'étape du site de QJE-17** (deux pages au lieu d'une).
3. Les captures sortent du jeu de démonstration neutre, par des scripts Playwright comme ceux des parcours ; elles servent aussi à VIT-09b.

## Critère de « terminé » (par lot)

- Chaque boucle montre une fonction qui existe, sur des données fictives ; sa scène est visée par le chef.
- Image d'attente, mouvement réduit respecté, sans son, servie par le site.
- axe-core sans violation, EP-19 tenu (mesure dans la PR), `verifier-neutre`.
- Les sources Remotion et les scripts de capture sont dans le dépôt, pour refaire une boucle quand l'écran change.

## Périmètre d'écriture

- `vitrine/public/medias/` (proposition), les composants d'image et de vidéo du site dans `vitrine/src/components/` **hors** `applications/` tant que VIT-24 est ouverte ;
- un dossier de sources Remotion et de scripts de capture (le plan le nomme) ;
- `vitrine/tests/` ; le plan, le fichier du module VIT, la fiche de session.

L'agent ne touche pas : `vitrine/src/components/applications/` (VIT-24, Codex), `vitrine/package.json` sans le dire dans le plan (montée d'Astro par l'agent de Cursor, `fix-audit-vitrine`), `docs/plan/suivi.md` ; tout le reste : il s'arrête et le demande.

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : VIT-25 (captures, vidéos courtes en motion design et animations du site), module VIT, hors chantier sur la demande du chef ; tu reprends aussi VIT-09b (#227).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/vit-25-videos-site.md, la fiche docs/plan/missions/vit-09-illustrations.md
et le plan du site docs/conception/vitrine/vit-vitrine.md (§ 3 bis).
Branche : feat/vit-25-videos-site, depuis origin/main, dans le dossier ..\travaux-planner\vit-25-videos-site.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan : écris le plan (docs/conception/vitrine/vit-25-videos-site.md) avec les scènes en toutes lettres,
une boucle d'essai rendue hors dépôt, et tes questions numérotées avec une proposition ; commite-le seul ; le chef le valide.
Règles : pas de code avant le plan validé ; questions avant toute supposition ; données fictives seulement ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini une étape, dis-le : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-27 | fiche écrite sur la demande du chef ; VIT-09b rattachée à la même session | session à ouvrir par le chef |
