# Mission · VIT-05 (préparation) · page « Solutions » du site vitrine

| | |
|---|---|
| État | ouverte |
| Agent | Claude (VS Code), une nouvelle session : la précédente a écrit le site, l'audit et le correctif du sondage |
| Modèle recommandé | Opus 5.5. C'est un texte qui engage le produit, et il doit suivre le style déjà fixé du site |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. (« la préparer maintenant ») |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05, dégelée sans tarifs par le chef le 18 nov. |
| Fonction | une page « Solutions » qui présente Planner par type d'établissement, et son lien dans l'en-tête · taille S à M |
| Branche | `feat/vit-05-solutions`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\vit-05-solutions` |
| Plan de conception | plan court à écrire (`docs/conception/vitrine/vit-05-solutions.md`) · **validé par le chef** : ce que la page dit à chaque type d'école est un choix de produit |

## Critère de « terminé »

- La page existe en français et en anglais. L'arabe est dans la structure et affiche le français, comme les autres pages, en attendant UIX-04.
- Le lien « Solutions » est dans l'en-tête, sur toutes les pages et dans les trois langues.
- La page ne dit que ce qui existe. Ce qui est prévu est marqué « Bientôt », sans date. Elle ne donne aucun prix, et rien n'est mis en ligne.
- Mêmes contrôles que le site : build, tests unitaires (traductions comprises), `node scripts/verifier-neutre.mjs`, Lighthouse au-dessus de 90 et axe-core sans violation sur la page, 390, 768 et 1440 px, mouvement réduit respecté.

## Périmètre d'écriture

L'agent peut modifier :
- `vitrine/src/pages/[lang]/solutions.astro`, et `vitrine/src/components/solutions/` s'il en faut ;
- `vitrine/src/i18n/{fr,en,ar}/solutions.json`, et la clé de navigation dans `vitrine/src/i18n/{fr,en,ar}/commun.json` ;
- `vitrine/src/components/socle/EnTete.astro`, pour le lien seulement ;
- les tests de `vitrine/tests/` ;
- le plan court, `docs/plan/modules/VIT-site-vitrine.md` et sa fiche de session.

L'agent ne touche pas :
- à **`docs/plan/suivi.md`** : il est tenu par le coordinateur (décision du chef du 18 nov.) ;
- aux autres pages et composants du site, sauf pour réutiliser les composants du socle sans les changer. Un besoin dans le socle se demande d'abord ;
- à tout le reste : s'il doit en sortir, il s'arrête et demande.

## Ce qui est déjà décidé (chef, 18 nov.)

- Aucun prix et aucun lien « Tarifs » tant que la vente est gelée.
- Pas de lien « Ressources » avant les captures d'écran.
- Les vidéos de motion design viendront plus tard, sur les captures.
- La loi 09-08 n'est pas nommée tant que Q-23 n'est pas tranchée. La phrase sur l'IA garde « quand l'école active l'IA ».
- Les fonctions prévues viennent du plan de parité (#193), sans date. Ni ce qui est écarté, ni ce qui est soumis à condition.

## Questions à poser au chef avant le plan

L'agent les pose, chacune avec sa proposition. Il ne suppose rien :
1. **Quels types d'établissement ?** Par exemple : collège et lycée, enseignement supérieur (université, grande école, BTS), centre de formation. Faut-il aussi le primaire, la maternelle, l'école de langues ?
2. **Une page avec une section par type, ou une page par type ?**
3. **Ce que la page met en avant pour chaque type**, d'après ce qui existe : emploi du temps calculé, appel, quiz et jeux, examens, plusieurs campus, groupes emboîtés, LMD.

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : la page « Solutions » du site vitrine (préparation de VIT-05), chantier VIT.
Lis d'abord AGENTS.md, docs/plan/README.md et docs/plan/suivi.md, puis ta fiche de mission
docs/plan/missions/vit-solutions.md et le plan du site docs/conception/vitrine/vit-vitrine.md (§ 3 et § 3 bis),
sur la branche doc/coordination-equipe (..\travaux-planner\coordination-equipe).
git worktree add "..\travaux-planner\vit-05-solutions" -b feat/vit-05-solutions origin/main
puis la jonction vitrine\node_modules (docs/plan/equipe.md, § 4).
Pose d'abord au chef les trois questions de la fiche, chacune avec ta proposition. Écris ensuite le plan court
(docs/conception/vitrine/vit-05-solutions.md), commite-le seul, et fais-le valider par le chef : c'est un choix de produit.
Tu n'écris que dans le périmètre de la fiche. Ne modifie pas docs/plan/suivi.md : c'est le coordinateur qui le tient.
Aucun prix, rien en ligne, ne dire que ce qui existe (le prévu est marqué « Bientôt »).
Fiche de session à jour en fin de session ; tout est commité ; jamais de git push.
Le coordinateur ne te joint pas par message : le chef relaie. Dis au chef quand le plan est prêt, puis quand tu as fini.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 12 h 10 | fiche écrite ; prompt donné au chef | — |
