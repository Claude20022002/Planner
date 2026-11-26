# Mission · VIT-12 · mentions légales et page de confidentialité du site

| | |
|---|---|
| État | codée, #223 ; attend les valeurs du chef (CI rouge exprès) |
| Agent | **nouvelle session Claude Code**, ouverte par le chef (décision du chef, 18 nov. vers 20 h 35) |
| Modèle recommandé | le plus capable disponible (Claude Fable 5.2, sinon Opus 5.5) : textes juridiques, chaque phrase engage le chef |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. vers 20 h 35 |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · **condition 2** de la mise en ligne (VIT-06) |
| Fonction | VIT-12 : deux pages du site, « Mentions légales » et « Confidentialité », en français et en anglais, liées depuis le pied de page · taille S |
| Branche | `feat/vit-12-pages-legales`, depuis `origin/main` **après la fusion de VIT-10** (#219, qui ouvre le pied de page) |
| Dossier de travail | `..\travaux-planner\vit-12-pages-legales` |
| Plan de conception | plan court à écrire : `docs/conception/vitrine/vit-12-pages-legales.md` · **validé par le chef**, et **chaque texte validé par lui** avant publication (légal) |

## Ce qui est déjà décidé

- Le site se met en ligne d'abord sur `vitrine.finadmintech.fr`, non indexé (VIT-06, plan validé par le chef).
- Le site n'a **ni formulaire, ni mesure d'audience, ni cookie, ni service tiers** : il ne charge rien d'ailleurs (règles du site). La page de confidentialité le dit, sans promettre plus.
- **La loi 09-08 n'est pas nommée** sur le site (Q-23). Aucun pays n'est supposé (EP-5, EP-18) : les pages décrivent l'éditeur et l'hébergement réels, sans parler au nom des écoles.
- **Rien de réel dans le dépôt public** sans l'accord du chef : chaque information d'identité (nom, adresse, numéro d'immatriculation, contact) est donnée par le chef, et il dit lui-même si elle peut être publiée. Aucune adresse IP.
- Les mentions de l'application Planner (données des écoles, traitements des élèves) ne sont **pas** l'objet de ces pages : elles concernent le seul site vitrine.

## Questions à poser au chef avant le plan

| N° | Question | Proposition |
|---|---|---|
| 1 | Qui est l'éditeur du site (personne ou société), avec quelles informations publiables ? | le chef les donne ; l'agent n'en suppose aucune |
| 2 | Qui est le directeur de la publication ? | le chef |
| 3 | L'hébergeur : quelle société, quelle adresse publiable ? | le chef ; seulement le nom et l'adresse de la société, jamais l'adresse du serveur |
| 4 | Quel contact pour les questions sur le site et sur la confidentialité ? | l'adresse de contact déjà utilisée par le site, si le chef le confirme |
| 5 | Les journaux techniques du serveur (adresses de connexion conservées par Nginx et Traefik) : quelle durée, et faut-il la dire ? | dire qu'ils existent, à quoi ils servent (sécurité) et leur durée, que le chef fixe avec le serveur |
| 6 | Le droit applicable et le tribunal compétent : faut-il les écrire ? | au chef ; s'il ne tranche pas, ne rien écrire |

## Critère de « terminé »

- Deux pages, `/<langue>/mentions-legales/` et `/<langue>/confidentialite/`, en français et en anglais ; l'arabe affiche le français.
- Chaque phrase vient d'une réponse du chef ou d'un fait du site (aucun formulaire, aucun cookie, rien de chargé d'ailleurs), cité dans le plan. **Le chef valide chaque texte** avant le commit du code.
- Liens dans la colonne « Ressources » du pied de page (VIT-10).
- Build, tests unitaires du site, `verifier-neutre.mjs`, axe-core, pas de défilement horizontal en 390 et 1440 px.

## Périmètre d'écriture

- `vitrine/src/pages/[lang]/` : les deux pages ;
- `vitrine/src/i18n/{fr,en,ar}/` : leurs fichiers ;
- `vitrine/src/i18n/langues.js` (leurs deux clés) et `vitrine/src/components/socle/PiedDePage.astro` (leurs deux liens), après la fusion de VIT-10 ;
- `vitrine/tests/` ; le plan court, `docs/plan/modules/VIT-site-vitrine.md`, la fiche de session.

L'agent ne touche pas : à `docs/plan/suivi.md`, à `vitrine/src/styles/`, à l'accueil, au déploiement (`deploy/`, workflows) ; ni aux pages de VIT-11 (catalogue et FAQ), qui peuvent avancer en même temps.

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : VIT-12, les mentions légales et la page de confidentialité du site vitrine
(condition 2 de sa mise en ligne). Lis AGENTS.md, docs/plan/README.md, puis la fiche docs/plan/missions/vit-12-pages-legales.md.
Commence par les six questions de la fiche, au chef, par l'outil de questions, chacune avec sa proposition : aucune information
d'identité n'est supposée, et le chef dit ce qui peut être publié (le dépôt est public).
Puis le plan court docs/conception/vitrine/vit-12-pages-legales.md, avec le texte complet des deux pages ; commite-le seul ;
le chef valide le plan et chaque texte. Le code commence après la fusion de VIT-10 (#219) :
git worktree add "..\travaux-planner\vit-12-pages-legales" -b feat/vit-12-pages-legales origin/main
Ne modifie pas docs/plan/suivi.md. Fiche de session ; tout est commité ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 20 h 40 | fiche écrite par le coordinateur ; agent choisi par le chef : une nouvelle session Claude | — |
| 2026-11-19 0 h 20 | plan et textes validés par le chef ; codée (#223, `162694ee`, fiche `3cee3b47`). **CI rouge exprès** : le test « aucun champ à compléter » attend `[NOM]`, `[HÉBERGEUR]`, `[N]` (proposition : 30), `[DATE]` et `[E-MAIL]`. Le chef les écrit **dans le message** de la session (le champ « Autre » de l'outil de questions n'arrive pas). La durée des journaux sur le serveur passe à Codex, dans VIT-06. **Ne pas fusionner avant les valeurs** | en attente du chef |
