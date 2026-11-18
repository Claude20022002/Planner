# Mission d'équipe · Site vitrine (VIT-01, VIT-05 en préparation) et grille d'applications (UIX-09)

| | |
|---|---|
| État | ouverte ; **le code attend la validation des deux plans par le chef** |
| Équipe | Claude (VS Code), intégrateur du site vitrine ; agent de Cursor, après UIX-06b ; Codex, seul sur UIX-09 après UIX-06b ; coordinateur : Claude (Cursor) |
| Attribuée le | 18 novembre 2026, 00 h 20, par le coordinateur ; demande du chef le 17 nov. au soir : « le travail est pour ce soir » |
| Fonctions | VIT-01 (conception et socle, M) et VIT-05 en préparation (accueil et pages de fonctions, sans tarifs ni mise en ligne) · UIX-09 (grille façon iCloud, M) |
| Plans | [vit-vitrine.md](../../conception/vitrine/vit-vitrine.md) · [uix-09-grille-applications.md](../../conception/interface/uix-09-grille-applications.md) · **en attente du chef** |
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
| **Claude (VS Code)** | intégrateur du site | socle (Astro, jetons, composants de section, logo animé) puis accueil | **Fable 5.2**, sinon Opus 5.5 : il fixe le style que tout le reste suivra | `feat/vit-01-vitrine` | `..\travaux-planner\vit-01-vitrine` |
| **Agent de Cursor** | membre, après l'intégration d'UIX-06b | pages Emploi du temps, En classe, Pour l'établissement, Sécurité et données, Bientôt | son modèle de code le plus fort : pages nombreuses, à partir des composants du socle | `feat/vit-01-vitrine-pages` | `..\travaux-planner\vit-01-pages` |
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
| dès le « validé » du chef et le dépôt des SVG | **R0 du site** | Claude (VS Code) | socle Astro construit, jetons relevés dans les SVG, composants du socle (`Section`, `Titre`, `Accroche`, `CadreAppareil`, `Apparition`, `EnTete`, `PiedDePage`), logo animé ; build et neutralité passent ; « R0 du site prêt, sha … » au coordinateur |
| après l'intégration d'UIX-06b (visée 02 h 45) | départ des deux autres | agent de Cursor, Codex | Cursor crée sa branche de lot depuis le R0 du site ; Codex crée `feat/uix-09-grille-applications` depuis `origin/main` |
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
| 1 | Valider les deux plans, et les dépendances Lucide et Astro ? | oui | chef |
| 2 | Quel logo, et où ? | variante 1 en tête du site, variante 4 comme icône du site et dans la grille ; le logo « mosaïque » de l'application ne change pas ce soir | chef |
| 3 | Où sont les deux SVG ? | à déposer dans `vitrine/public/logo/` du dépôt principal ; le coordinateur les copie sur la branche | chef |

## Prompts

### Claude (VS Code), dès le « validé » du chef

```text
Tu es l'intégrateur du site vitrine de Planner (VIT-01, VIT-05 en préparation). Lis d'abord AGENTS.md,
docs/plan/equipe.md, la fiche docs/plan/missions/vit-equipe.md et le plan
docs/conception/vitrine/vit-vitrine.md, dans ..\travaux-planner\coordination-equipe
(branche doc/coordination-equipe). Le plan est validé par le chef : <date et réponse>.
Crée ta branche : git worktree add "..\travaux-planner\vit-01-vitrine" -b feat/vit-01-vitrine origin/main
Fais R0 (socle Astro, jetons tirés des SVG de vitrine/public/logo/, composants du socle, logo dont les aiguilles tournent),
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
(dossier ..\travaux-planner\coordination-equipe). Plan validé par le chef : <date et réponse>.
git worktree add "..\travaux-planner\uix-09-grille" -b feat/uix-09-grille-applications origin/main
Présentation seulement : catalogue, routes et droits inchangés. Lucide pour les icônes, Motion pour les animations,
mouvement réduit respecté. Rapport dans sortie\. Jamais de git push.
```

## Suivi

| Date | Événement | Verdict |
|---|---|---|
| 18 nov. 00 h 20 | plans et fiche écrits ; attente du chef | — |
