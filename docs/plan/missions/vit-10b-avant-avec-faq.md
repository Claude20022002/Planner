# Mission · VIT-10b · « avant → avec Planner » et FAQ sur les pages par rôle

| | |
|---|---|
| État | ouverte : plan court après la fusion de VIT-10 (#219) |
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
