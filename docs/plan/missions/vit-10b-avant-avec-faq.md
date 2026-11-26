# Mission · VIT-10b · « avant → avec Planner » et FAQ sur les pages par rôle

| | |
|---|---|
| État | #226 **prête**, avec C8 (`ff08fffd`, à pousser) |
| Agent | agent de Cursor (Grok 4.7 high) : il a écrit les pages par rôle |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. vers 20 h 55, d'après le site d'OpenEduCat ; **condition 10** de la mise en ligne |
| Module | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05 |
| Fonction | VIT-10b : sur les quatre pages par rôle (Direction, Scolarité, Enseignants, Étudiants), un bloc « avant → avec Planner » et une FAQ du rôle en accordéon · taille S |
| Branche | `feat/vit-10b-avant-avec-faq`, depuis `origin/main` après la fusion de #219 |
| Plan de conception | plan court `docs/conception/vitrine/vit-10b-avant-avec-faq.md` · **validé par le chef**, chaque phrase comprise |

## Ce que le chef a choisi

Au plan de VIT-10, le chef avait répondu : le bloc et la FAQ seulement avec des phrases déjà publiées. Aucune n'existait pour le côté « avant », donc rien n'a été écrit. Le 18 nov. vers 20 h 55, le chef demande ces deux blocs, comme sur les pages par rôle d'OpenEduCat (« De la frustration au flux », puis « Questions fréquentes »). Les textes sont donc nouveaux, et **le chef les valide un à un**.

## Critère de « terminé »

- **Avant → avec** : cinq lignes par rôle. L'« avant » décrit une tâche du rôle sans outil (papier, tableur, messages), sans dénigrer personne ni nommer de concurrent. L'« avec » dit ce que Planner fait, **avec sa source dans le code**, citée dans le plan.
- **FAQ** : trois à cinq questions par rôle. Elles reprennent d'abord les réponses validées de la FAQ de VIT-11 ; une réponse nouvelle est validée par le chef. Accordéon `details`, lisible sans JavaScript ; données `FAQPage` locales si VIT-11 les a déjà posées.
- EP-18 (aucun téléphone ni QR code comme seul chemin) ; EP-5 (aucun pays, aucune monnaie) ; aucun chiffre inventé.
- Français et anglais ; build, tests, `verifier-neutre.mjs`, axe-core, 390 et 1440 px.

## Périmètre d'écriture

`vitrine/src/components/fonctions/PageRole.astro` et les composants qu'il appelle ; les fichiers de texte des quatre rôles (`direction`, `scolarite`, `enseignants`, `etudiants`, fr, en, ar) ; `vitrine/tests/` ; le plan court, la ligne du module et la fiche de session. **Pas** `docs/plan/suivi.md`, ni l'accueil, ni le menu, ni les icônes (VIT-09).

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 21 h | fiche écrite, sur la décision du chef | — |
| 2026-11-19 0 h 20 | plan validé par le chef (`a3cae80d`, seul avant le code) ; code `b7f1a104`, fiche `3af6748f`, en local. **Complément de l'expertise (C8), validé par le coordinateur** (S, aucune phrase nouvelle) : dans `direction.json` et `scolarite.json` · `cartes.2.texte`, remplacer la phrase sur le site par la description déjà publiée de la page Sécurité (`securite.json` · `meta.description`, sans sa fin) ; et passer les deux boutons dans l'ouverture (`EnTetePage.astro`, par un emplacement) au lieu de leur section à part (`PageRole.astro`, lignes 28 à 33). Le complément s'écrit dans le plan (un commit seul), puis le code, sur la même branche, avant le push | à compléter |
| 2026-11-21 | C8 relu (`5a43ba5f` plan, `ff08fffd` code) : carte Sécurité recopiée de `securite.meta.description`, boutons dans l'ouverture, deux tests ; VIT-18 ne change pas cette description | prête |
