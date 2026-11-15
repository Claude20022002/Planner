# D'où viennent ces skills

Récupérés le 13 octobre 2026 pour le travail sur la vidéo et le marketing de HESTIM Planner. Ce sont des consignes écrites par des tiers : les relire avant de s'y fier, et après toute mise à jour.

| Dossier | Source | Version copiée | Licence |
|---|---|---|---|
| `video`, `copywriting`, `product-marketing`, `social`, `marketing-psychology`, `ad-creative` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | commit `1efedbc` | MIT (Corey Haines, 2025) |
| `remotion-best-practices` | [remotion-dev/skills](https://github.com/remotion-dev/skills), skills officiels de Remotion | commit `7ba4dcf` | non indiquée dans le dépôt |

Ce qui n'a pas été copié : les dossiers `evals/` (jeux d'essai des skills), `remotion-maps/` (cartes animées, sans usage ici : le lien du skill Remotion vers ce dossier ne mène donc nulle part) et les fichiers `agents/openai.yaml`.

Les skills de marketing lisent `.claude/product-marketing.md` avant de poser des questions : c'est la fiche de positionnement du produit.

Mise à jour : `npx skills add coreyhaines31/marketingskills` et `npx skills add remotion-dev/skills`, puis relire ce qui a changé.

## Skills de coordination, écrits pour Planner

`coordination`, `relecture-branche` et `fin-de-session` sont écrits ici, le 15 novembre 2026, à partir d'`AGENTS.md` et de `docs/plan/organisation.md`. Aucun texte ni script n'a été copié. Trois skills publics ont été lus avant, pour leurs idées :

| Skill lu | Source | Licence | Idée reprise | Pourquoi il n'est pas installé |
|---|---|---|---|---|
| `multi-agent-orchestration` | [davidchicano/presuntamente](https://github.com/davidchicano/presuntamente/blob/main/.agents/skills/multi-agent-orchestration/SKILL.md) | AGPL-3.0 (code), CC BY-SA 4.0 (contenu) | chaque session déclare les fichiers qu'elle écrira | version 0 ; demande d'ajouter un hook aux réglages ; licence |
| `codex-handoff` | [PaulRBerg/agent-skills](https://claudeskills.info/skills/paulrberg/agent-skills/codex-handoff/), lu sur un annuaire | MIT, d'après l'annuaire | comparer les fichiers modifiés au périmètre | lance Codex sans bac à sable ni approbation ; commite sans demander |
| `multi-agent-coordination` | [culpritchaos/interlock](https://skills.sh/culpritchaos/interlock/multi-agent-coordination), lu en partie | MIT | un tableau des agents actifs | écrit pour une autre équipe |
