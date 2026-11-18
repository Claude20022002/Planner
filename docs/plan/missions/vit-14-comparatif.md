# Mission · VIT-14 · « Pourquoi Planner » : un comparatif par approche, sur l'accueil et sur une page `/comparer/`

| | |
|---|---|
| État | ouverte : questions au chef, puis plan court |
| Agent | **nouvelle session Claude Code**, ouverte par le chef (sa demande du 18 nov. vers 21 h 15) |
| Modèle recommandé | le plus capable (Claude Fable 5.2, sinon Opus 5.5) : chaque case du tableau engage le chef |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui (« un comparatif, un genre de benchmark » ; forme : par approche, sans nom) ; **condition 10** de la mise en ligne |
| Module | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05 |
| Fonction | VIT-14 : la section « Pourquoi Planner » de l'accueil devient un comparatif court ; une page `/comparer/` le détaille · taille M |
| Branche | `feat/vit-14-comparatif`, depuis `origin/main` ; le code après la fusion de VIT-08 (#216), qui tient l'accueil |
| Plan de conception | `docs/conception/vitrine/vit-14-comparatif.md` · **validé par le chef**, chaque case du tableau comprise |

## Ce que le chef a choisi

- La section « Pourquoi Planner » (qui était dans VIT-13) **devient un comparatif**, « un genre de benchmark ».
- **Par approche, sans nommer de concurrent** : Planner face à quatre façons de faire aujourd'hui, par exemple le tableur et la messagerie, l'ERP généraliste, la plateforme de cours seule (LMS), le logiciel de vie scolaire. Le plan propose la liste, et le chef la fixe.
- Inspiration : les pages `/compare/` d'OpenEduCat ([relevé](../../etude-marche/11-chemins-site-openeducat.md), § 3), sans rien copier, sans prix et sans coût total estimé.

## Critère de « terminé »

- Six à dix critères concrets, chacun **vérifiable**. Par exemple :
  - l'emploi du temps calculé, avec la raison de chaque refus ;
  - le report de séance suivi ;
  - l'appel, le quiz et les jeux avec un seul compte ;
  - le fonctionnement sans téléphone de l'élève, sans wifi, sans écran (EP-18), dit **seulement là où le code le permet** ;
  - les données qui restent à l'école ;
  - aucun envoi caché (EP-13) ;
  - les langues ;
  - aucun pays supposé.
- Chaque case « Planner » cite sa source dans le code. Chaque case « approche » décrit une pratique courante, sans dénigrer et sans chiffre inventé. Le tableau est daté.
- Les sources : les études déjà faites (comparatif Odoo, #174 ; études OpenEduCat, #191 et #192 ; failles des ERP, #186). Elles servent à vérifier, pas à nommer.
- **EP-18** : le comparatif ne promet pas un fonctionnement hors ligne qui n'existe pas (MOB-06 n'est pas faite) ; ce qui viendra est marqué « Bientôt ».
- Français et anglais ; tableau lisible en 390 px (cartes empilées), accessible (en-têtes de tableau), sans JavaScript obligatoire ; build, tests, `verifier-neutre.mjs`, axe-core.

## Périmètre d'écriture

- `vitrine/src/components/accueil/` (la section) et `index.astro` (une ligne) ;
- la page `vitrine/src/pages/[lang]/comparer.astro`, ses composants dans `vitrine/src/components/comparer/`, ses textes, sa clé dans `langues.js` et son lien dans le pied de page, après VIT-10 ;
- `vitrine/tests/` ; le plan, la ligne du module, la fiche de session.

L'agent ne touche pas à `docs/plan/suivi.md`, à la vidéo, aux icônes et logos (VIT-09), au menu « Fonctions » (VIT-11).

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : VIT-14, la section « Pourquoi Planner » de l'accueil en comparatif par approche,
et une page /comparer/ (condition 10 de la mise en ligne du site vitrine). Lis AGENTS.md, docs/plan/README.md (EP-5, EP-13, EP-18),
docs/conception/vitrine/vit-vitrine.md (§ 2, ce qu'on s'interdit), docs/etude-marche/11-chemins-site-openeducat.md,
docs/etude-marche/02-arguments-marketing.md, puis ta fiche docs/plan/missions/vit-14-comparatif.md.
Pose d'abord au chef tes questions (outil de questions) : les quatre approches comparées, la liste des critères, chacune avec ta proposition.
Puis le plan court docs/conception/vitrine/vit-14-comparatif.md, avec le tableau complet et la source de chaque case « Planner » ;
commite-le seul ; le chef le valide case par case. Aucun concurrent nommé, aucun prix, aucun chiffre inventé.
Le code après la fusion de #216 : git worktree add "..\travaux-planner\vit-14-comparatif" -b feat/vit-14-comparatif origin/main
Ne modifie pas docs/plan/suivi.md. Fiche de session ; tout est commité ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 21 h 20 | fiche écrite par le coordinateur, sur la décision du chef | — |
