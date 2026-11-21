# Mission d'équipe · Site vitrine (VIT-01, VIT-05 en préparation) et grille d'applications (UIX-09)

| | |
|---|---|
| État | ouverte ; **plans validés par le chef le 18 nov.** ; site relu prêt (18 nov. 10 h 16) ; UIX-09 lancée chez Codex après UIX-06b |
| Équipe | Claude (VS Code), intégrateur du site vitrine ; agent de Cursor, après UIX-06b ; Codex, seul sur UIX-09 après UIX-06b ; coordinateur : Claude (Cursor) |
| Attribuée le | 18 novembre 2026, 00 h 20, par le coordinateur ; demande du chef le 17 nov. au soir : « le travail est pour ce soir » |
| Fonctions | VIT-01 (conception et socle, M) et VIT-05 en préparation (accueil et pages de fonctions, sans tarifs ni mise en ligne) · UIX-09 (grille façon iCloud, M) |
| Plans | [vit-vitrine.md](../../conception/vitrine/vit-vitrine.md) · [uix-09-grille-applications.md](../../conception/interface/uix-09-grille-applications.md) · **validés par le chef le 18 nov.** |
| Règles d'équipe | [equipe.md](../equipe.md) |

## Décisions du chef qui s'appliquent (17 et 18 nov.)

1. Le style Apple vaut pour le site vitrine et la grille d'applications d'abord, puis pour l'application.
2. Ce travail se fait ce soir, après UIX-06b, à la place d'UIX-06c.
3. Le site se construit sans être mis en ligne : la vente reste gelée.
4. Il est prévu en français, anglais et arabe ; l'arabe se remplit après UIX-04.
5. Logos officieux du 18 nov. : icône bleu nuit (variante 4) et logo horizontal à l'horloge (variante 1).

## L'équipe

| Agent | Rôle | Lot | Modèle | Branche | Dossier |
|---|---|---|---|---|---|
| **Claude (VS Code)** | intégrateur du site | socle (Astro, jetons, composants de section, logo animé) puis accueil | **Opus 5.5 ou Fable 5.2**, le plus capable disponible dans la session ; ne pas changer de modèle en cours de session : il fixe le style que tout le reste suivra | `feat/vit-01-vitrine` | `..\travaux-planner\vit-01-vitrine` |
| **Agent de Cursor** | membre, depuis le 18 nov. à 02 h 12 (décision du chef) | pages Emploi du temps, En classe, Pour l'établissement, Sécurité et données, Bientôt | son modèle de code le plus fort : pages nombreuses, à partir des composants du socle | `feat/vit-01-vitrine-pages` | `..\travaux-planner\vit-01-pages` |
| **Codex** | seul, après l'intégration d'UIX-06b | UIX-09, grille d'applications | son modèle le plus fort, raisonnement élevé : il connaît UIX-01a, qu'il a écrite | `feat/uix-09-grille-applications` | `..\travaux-planner\uix-09-grille` |

## Les propriétaires

| Fichier ou dossier | Propriétaire |
|---|---|
| `vitrine/` : configuration, `package.json`, `src/styles/`, `src/components/socle/`, `src/components/icones/`, `src/components/accueil/`, `src/pages/[lang]/index.astro`, `src/i18n/*/commun.json` et `accueil.json`, `public/` | Claude (VS Code) |
| `vitrine/src/components/fonctions/`, `vitrine/src/pages/[lang]/` sauf `index.astro`, `vitrine/src/i18n/*/<page de fonction>.json` | agent de Cursor |
| `.github/workflows/vitrine.yml` (nouveau : construit le site, ne publie rien) | Claude (VS Code) |
| `scripts/verifier-neutre.mjs` (ajout du dossier `vitrine/`) | Claude (VS Code) |
| `frontend/src/pages/Applications.jsx`, `frontend/src/components/applications/`, `frontend/src/i18n/applications.*.js`, `frontend/tests/parcours/applications.spec.cjs`, `frontend/package.json` (ajout de `lucide-react`) | Codex |
| fiche de session de la fonction, ligne de `suivi.md`, fichier du module | l'intégrateur de chaque branche : Claude pour VIT, Codex pour UIX-09 |

Le site vitrine et la grille ne partagent aucun fichier : les deux branches ne peuvent pas entrer en conflit.

## Les rendez-vous

| Quand | Rendez-vous | Qui | Fait quand |
|---|---|---|---|
| dès maintenant (plans validés ; logos redessinés tant que les SVG manquent) | **R0 du site** | Claude (VS Code) | socle Astro construit, jetons du § 4 bis du plan, logos redessinés, composants du socle (`Section`, `Titre`, `Accroche`, `CadreAppareil`, `Apparition`, `EnTete`, `PiedDePage`), logo animé ; build et neutralité passent ; « R0 du site prêt, sha … » au coordinateur |
| 02 h 12 | départ de l'agent de Cursor | agent de Cursor | branche de lot depuis `c0198c75` (socle et accueil) |
| après UIX-06b | départ de Codex | Codex | `feat/uix-09-grille-applications` depuis `origin/main` |
| 04 h 00 | **fin des lots** | chacun | lot commité, rapport de rendez-vous ([equipe.md](../equipe.md), § 7) |
| 04 h 20 | intégration et relecture | Claude (site), coordinateur | fusion des pages dans `feat/vit-01-vitrine`, contrôles, relecture des deux branches ; commandes au chef |

## Ce que chaque lot livre

- **Site** :
  - build sans erreur ;
  - les trois langues dans la structure ;
  - Lighthouse au-dessus de 90 (performance, accessibilité, référencement) sur l'accueil ;
  - axe-core sans violation ;
  - 390, 768 et 1440 px ;
  - mouvement réduit respecté ;
  - aucun texte en dur, aucune ressource chargée depuis un autre site ;
  - aucune promesse au-delà de ce qui existe.
- **Grille** : critère de « terminé » du plan d'UIX-09, § 1 ; `npm run lint`, `test:unit` et `build` dans `frontend/`.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Valider les deux plans, et les dépendances Lucide et Astro ? | **oui (chef, 18 nov.)** | — |
| 2 | Quel logo, et où ? | **validé (chef, 18 nov.)** : variante 1 en tête du site, variante 4 comme icône du site et dans la grille ; le logo « mosaïque » de l'application ne change pas | — |
| 3 | Où sont les deux SVG ? | en attente ; logos redessinés d'ici là (plan, § 4 bis) | chef |

## Prompts

### Claude (VS Code), dès le « validé » du chef

```text
Tu es l'intégrateur du site vitrine de Planner (VIT-01, VIT-05 en préparation). Lis d'abord AGENTS.md,
docs/plan/equipe.md, la fiche docs/plan/missions/vit-equipe.md et le plan
docs/conception/vitrine/vit-vitrine.md, dans ..\travaux-planner\coordination-equipe
(branche doc/coordination-equipe). Le plan est validé par le chef le 18 nov. (« Je valide les deux plans »).
Crée ta branche : git worktree add "..\travaux-planner\vit-01-vitrine" -b feat/vit-01-vitrine origin/main
Fais R0 (socle Astro, jetons du § 4 bis du plan, logos redessinés en SVG d'après les photos de ..\travaux-planner\boites\ressources\, composants du socle, logo dont les aiguilles tournent),
puis ton lot (accueil). Style Apple sans rien copier d'Apple ; Inter ; Motion pour les animations, Lucide pour les icônes ;
aucune animation si le mouvement réduit est demandé ; rien n'est mis en ligne.
Rends compte au coordinateur (plan-b-projet-pacte-8a) à R0 puis à la fin du lot. Jamais de git push.
```

### Agent de Cursor, après l'intégration d'UIX-06b

```text
Tu rejoins la mission d'équipe du site vitrine, lot « pages de fonctions ». Lis d'abord AGENTS.md, docs/plan/equipe.md,
docs/plan/missions/vit-equipe.md et docs/conception/vitrine/vit-vitrine.md (dossier ..\travaux-planner\coordination-equipe).
Crée ton dossier depuis le R0 du site : git worktree add "..\travaux-planner\vit-01-pages" -b feat/vit-01-vitrine-pages <sha R0 du site>
Tu n'écris que tes fichiers (tableau « Les propriétaires »), avec les composants du socle sans les modifier : un besoin
dans le socle se demande dans ta boîte sortie\. Rapport de rendez-vous dans sortie\. Jamais de git push.
```

### Codex, après l'intégration d'UIX-06b

```text
Ta mission suivante : UIX-09, grille d'applications façon iCloud. Lis d'abord AGENTS.md, docs/plan/equipe.md,
docs/plan/missions/vit-equipe.md et docs/conception/interface/uix-09-grille-applications.md
(dossier ..\travaux-planner\coordination-equipe). Plan validé par le chef le 18 nov. (« Je valide les deux plans »).
git worktree add "..\travaux-planner\uix-09-grille" -b feat/uix-09-grille-applications origin/main
Présentation seulement : catalogue, routes et droits inchangés. Lucide pour les icônes, Motion pour les animations,
mouvement réduit respecté. Rapport dans sortie\. Jamais de git push.
```

## Suivi

| Date | Événement | Verdict |
|---|---|---|
| 18 nov. 00 h 20 | plans et fiche écrits ; attente du chef | — |
| 18 nov. | plans validés par le chef ; couleurs du logo ; logo « mosaïque » gardé dans l'application | — |
| 18 nov. 02 h 12 | R0 du site (`17251fc5`) et accueil (`c0198c75`) faits par Claude (VS Code, Opus 5.5) ; PR #195 ouverte par le chef (« Test Backend » rouge : audit de `backend/`, même échec sur `main`, sans lien avec le site) ; écarts 2 à 6 acceptés par le coordinateur ; l'agent de Cursor lancé depuis `c0198c75` | R0 conforme |
| 18 nov. matin | le chef confie les pages à Claude (VS Code), qui les écrit (`55f5ab06`) ; l'agent de Cursor, qui n'a lu sa consigne de 02 h 12 qu'au matin, écrit les mêmes pages (`12ccb3ba`, 10 h 06) ; **le chef garde `55f5ab06`** ; l'agent de Cursor est prévenu (boîte, 10 h 18) | doublon tranché |
| 18 nov. 10 h 16 | relecture de `feat/vit-01-vitrine` (`19167d6f`, #195) : périmètre de l'intégrateur et des pages (décision du chef), aucun fichier au-delà de 150 lignes, décisions 4 à 7 du chef respectées. Relancé par le coordinateur : 33 tests unitaires, neutralité, fusion avec `origin/main` sans conflit. CI : six contrôles verts ou en cours ; « Test Backend » rouge, par l'audit déjà rouge sur `main`. Cru sur parole : Lighthouse et axe-core | **prête sur le fond** ; fusion après `fix/audit-dependances` |

**Ce qui s'est mal passé** : deux agents ont écrit le même lot. La session du site ne voyait pas les boîtes, et le coordinateur n'a pas retiré la consigne de l'agent de Cursor quand le chef a confié les pages à l'intégrateur. Règle proposée au chef : quand il réattribue un lot dans une autre session, il le dit au coordinateur, qui retire la consigne de la boîte avant toute autre chose.
