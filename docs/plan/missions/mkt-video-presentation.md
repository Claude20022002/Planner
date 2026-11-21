# Mission · MKT-05 et MKT-09 · Vidéo publicitaire et présentation aux établissements

| | |
|---|---|
| État | ouverte |
| Agent | un agent Claude neuf, lancé par le coordinateur (Cursor) : la session de VS Code a refusé à juste titre, parce que le chef venait de valider PLA-03b et qu'une session porte une fonction |
| Modèle recommandé | le plus capable (Claude Fable 5.2) : argumentaire, scénario et présentation pour des directeurs, sans rien promettre de faux |
| Attribuée le | 2026-11-15, par le coordinateur, à la demande du chef |
| Module | [MKT](../modules/MKT-marketing.md) · MKT-05 (vidéo) et MKT-09 (supports pour les directeurs, gelé : **le chef le dégèle pour la préparation**, le 15 novembre) |
| Branche | `mkt/mkt-05-video-presentation`, depuis `origin/main` ; la PR #168 (kit du 11 novembre) sert de source, elle n'est pas reprise telle quelle |
| Dossier de travail | `..\travaux-planner\mkt-05-video-presentation` |
| Plan | plan court (`organisation.md`, § 5 : `mkt/` = 5 à 15 lignes) dans la fiche de session, **validé par le chef** : c'est un texte montré aux écoles |

## Ce que le chef demande (15 novembre, mot pour mot dans l'idée)

1. **Des vidéos publicitaires dans le style des concurrents** (Odoo, OpenEduCat et autres) : courtes, rythmées, une idée par plan.
2. **Une présentation PowerPoint** pour une présentation globale aux établissements : les objectifs de Planner et les modules qu'on veut mettre à leur disposition.

**Le message, à faire passer partout :**

- Aujourd'hui, les écoles qui utilisent Odoo ou OpenEduCat doivent souvent **développer elles-mêmes leurs modules**.
- Il existe **un nombre énorme d'outils**. Souvent, chacun ne règle que le problème d'**un seul établissement**, n'est pas de qualité, ou **ne communique pas avec les autres**.
- **L'école doit s'adapter à l'outil.** Planner fait l'inverse : **le logiciel s'adapte à l'école**. Il est fait pour les écoles, pas l'inverse.
- Planner donne aux établissements, **petits, moyens et grands, du nord au sud**, les armes en main pour gérer leur établissement avec **les modules dont ils ont besoin**.
- Une solution **efficace, durable, adaptative et simple à prendre en main**.
- Partir des **difficultés vécues au quotidien** par les établissements.

**Ce que le chef ne veut plus** : des supports centrés sur HESTIM, ou qui mettent en avant les jeux pédagogiques. Une école de Kinshasa n'en a pas besoin. On cible les maux de tous les établissements.

## Règles

- **Rien n'est publié** : la vente est gelée ; on prépare. Aucun artefact claude.ai, Canva publié, ni envoi.
- **Aucun prix.** HESTIM n'est jamais nommé, ni montré. Aucune donnée réelle : école fictive, personnes fictives.
- **Honnêteté** : distinguer clairement **ce qui existe** (emploi du temps généré, contraintes déclarées par l'école, espace de cours, application mobile, plusieurs écoles sur une installation…) de **ce qui est prévu** (modules COM, FIN, PAI, ETA, RHP, FOR, DOC, INS, etc., voir `docs/plan/README.md`). Un module prévu se dit « prévu » ou « en préparation ».
- **Concurrents** : on peut les nommer et dire ce que leurs utilisateurs leur reprochent, **seulement avec une source** du dépôt. On **imite leur style**, jamais leurs logos, leurs images, leur musique ni leurs textes.
- Le ton des textes de Planner : « vous », phrases courtes, sans jargon.

## Sources à lire d'abord

- `docs/etude-marche/01-concurrents.md`, `02-arguments-marketing.md`, `06-outils-structures-formation.md` (inventaire des outils et des besoins), `07-comparatif-odoo.md` (rluf01, 15 nov.)
- `docs/etude-marche/reports/` et `research_notes/` (problèmes des établissements)
- la branche `etude/odoo-essai` (PR #176, plan d'essai d'OpenEduCat, avis des utilisateurs)
- `docs/plan/README.md` (modules, étapes) et `docs/plan/modules/`
- PR #168 (`kit-video-planner/`) et `docs/presentation/video/` (projet Remotion existant) : **sources de forme**, à ne pas suivre sur le fond (HESTIM, jeux)
- le dépôt privé `..\planner-marketing` (charte, stratégie, agents spécialisés)

## Livrables

1. Un **argumentaire** d'une page : douleurs, promesse, preuves (existant), feuille de route (prévu), objections et réponses.
2. **Deux ou trois scripts vidéo** de 30 à 60 s, avec un découpage plan par plan : un sur les douleurs, un sur « le logiciel s'adapte à l'école », et un sur les modules à la carte (facultatif).
3. **La vidéo principale réalisée**, avec Remotion (skills `video` et `remotion-best-practices` du dépôt). Le fichier rendu (`.mp4`) va dans `..\planner-marketing`, **pas dans ce dépôt public**.
4. **La présentation `.pptx`** : 12 à 18 diapositives, avec les notes de l'orateur. Elle va dans `..\planner-marketing` ; le plan des diapositives et les notes, en Markdown, vont dans ce dépôt.

## Périmètre d'écriture

- dans ce dépôt : `kit-video-planner/` (scripts, plan de présentation, argumentaire, en Markdown), sa ligne MKT de `suivi.md`, `docs/plan/modules/MKT-marketing.md`, sa fiche de session ;
- dans `..\planner-marketing` : les fichiers rendus (`.mp4`, `.pptx`), selon ses règles.

Ne touche pas au code du produit.

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-15 | mission écrite à la demande du chef | — |
