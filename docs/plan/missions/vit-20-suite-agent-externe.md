# Prompt de l'agent externe · suite de VIT-20 (quatre tâches)

Écrit par le coordinateur le 22 nov. 2026, à la demande du chef (« s'il y a d'autres tâches qu'il peut réaliser, donne-les maintenant »). À donner à l'agent Claude Code de l'agent externe, **après la fusion de #257**, modèle Claude Fable 5.2 (sinon Opus 5.5), effort élevé.

| Tâche | Identifiant | Taille | Visa du chef | Branche |
|---|---|---|---|---|
| 1 | VIT-20e : en-tête découpé, contrôle visuel à 390 et 768 px et en anglais | S | non (aucun texte) ; plan validé par le coordinateur | `refactor/vit-20e-en-tete` |
| 2 | VIT-20d : bloc « Selon votre équipement » (lot D, repris de Codex) | M | **oui, les phrases** | `feat/vit-20d-equipement` |
| 3 | VIT-21 : les phrases qui présentent la Bibliothèque comme disponible, et la vidéo de l'accueil | M | **oui, chaque phrase** | `fix/vit-21-bibliotheque` |
| 4 | VIT-22 : la page « Bientôt » alignée sur les 12 modules « Bientôt » | S | **oui, les textes** | `feat/vit-22-bientot-modules` |

```text
Tu reprends Planner (dépôt public Claude20022002/Planner) pour le chef de projet, compte Claude20022002.
Tu as déjà livré VIT-20 (PR #257, fusionnée) : tu connais le site vitrine, AGENTS.md et le plan
docs/conception/vitrine/vit-20-structure-du-site.md. Les règles de ta première mission valent encore,
avec les mêmes exceptions du chef : tu pousses tes seules branches, tu ouvres les PR, tu ne fusionnes jamais,
jamais de push sur main, jamais de --force, aucun texte nouveau sur le produit sans visa du chef.

Quatre tâches, chacune sur sa branche, depuis origin/main à jour, une PR chacune. Fais-les dans l'ordre ci-dessous.
Les tâches 2, 3 et 4 ont deux phases : (a) un document de textes, poussé seul dans une PR en brouillon, puis tu passes
à la tâche suivante sans attendre ; (b) le code, seulement après le visa du chef. Le chef vise dans un commentaire
de la PR (« Visé », ou « Visé sauf : … ») ; lis-le avec gh pr view <n> --comments. Pas de visa : pas de phase (b).

TÂCHE 1 · VIT-20e · refactor/vit-20e-en-tete (pas de visa : plan validé par le coordinateur)
- vitrine/src/components/socle/EnTete.astro fait 175 lignes : ramène-le à 150 au plus (styles dans EnTete.css,
  ou un sous-composant dans components/navigation/), sans rien changer au rendu ni au comportement.
- Contrôle à l'œil ce que tu n'avais pas vu : l'accueil à 390 et 768 px, et toutes les pages en anglais, à 390 et 1440 px.
  Corrige les défauts de mise en page trouvés (débordement, chevauchement, contraste, focus), jamais un texte.
- Ne touche pas PiedDePage.astro, src/i18n/langues.js ni src/i18n/*/commun.json : le coordinateur y règle le conflit
  de la PR #223 (mentions légales). Liste dans la PR chaque défaut trouvé, corrigé ou non.

TÂCHE 2 · VIT-20d · feat/vit-20d-equipement · le bloc « Selon votre équipement » (§ 4.9 du plan de VIT-20)
(a) Lis le § 4.9, docs/etude-marche/12-expertise-site-vitrine.md (C5, N3), l'étude EP-18 sur
    origin/etude/ep18-faible-equipement (docs/conception/qualite/etude-ep18-faible-equipement.md) et le code.
    Écris docs/conception/vitrine/vit-20d-equipement.md : un plan court, puis un tableau par module disponible
    (Emploi du temps, Présences, Espace de cours, Quiz et jeux, Annonces et messages) avec ses trois lignes :
    sans wifi ou avec peu de connexion · sans écran projeté · sans téléphone de l'élève. Pour chaque ligne :
    français, anglais, et le fichier du dépôt qui la prouve. Ce que le code ne permet pas : « Bientôt », dit tel quel.
    Le supérieur d'abord ; aucun pays, aucune monnaie, aucun chiffre non prouvé.
(b) Après visa : components/applications/equipement/, donnees/equipement.js (lignes et sources), i18n/*/equipement.json,
    tests/equipement.test.js (trois lignes par module disponible, chaque source existe), et la seule ligne de
    PageModule.astro qui pose le bloc à sa place vide.

TÂCHE 3 · VIT-21 · fix/vit-21-bibliotheque · la Bibliothèque est « Bientôt » (étape 3) : le site ne doit plus la dire disponible
(a) Reprends la liste « Phrases relevées sur la Bibliothèque » de la PR #257 et refais la recherche dans vitrine/src
    et dans les textes de la vidéo (accueil.json, docs/presentation/video/). Écris docs/conception/vitrine/vit-21-bibliotheque.md :
    une ligne par phrase, avec fichier et clé, texte actuel, et ta proposition (retirer, ou réécrire sans la Bibliothèque),
    en français et en anglais. Une réécriture n'ajoute rien : elle retire la Bibliothèque de la phrase.
    Inclus comparer.json (VIT-14) et la FAQ sur StudyLib, qui n'est plus en service.
(b) Après visa : applique exactement les phrases visées ; refais le rendu de la vidéo de l'accueil
    (npm run render:accueil dans docs/presentation/video, voir docs/conception/vitrine/vit-08-video-presentation.md)
    et mets à jour son empreinte, pour que tests/video.test.js reste vert. Un test vérifie qu'aucun texte du site
    ne présente la Bibliothèque comme disponible.

TÂCHE 4 · VIT-22 · feat/vit-22-bientot-modules · la page « Bientôt » suit les 17 modules
(a) Aujourd'hui, src/i18n/*/bientot.json a ses propres cartes (Notes et bulletins, Transport et internat…), qui ne
    correspondent pas aux 12 modules « Bientôt » de donnees/modules.js. Écris docs/conception/vitrine/vit-22-bientot-modules.md :
    un plan court (la page tire ses cartes de modules.js, par catégorie, chacune avec son nom et une phrase), puis
    le tableau des 12 phrases, en français et en anglais, prises dans les cartes actuelles quand elles disent la même
    chose, sinon proposées d'après « Ce qu'il fait » de l'étude 15 (branche etude/ven-modules-packs), sans promesse
    de date. Dis ce que deviennent les cartes qui ne sont pas un module (Transport et internat, Communication…).
(b) Après visa : la page, ses tests ; aucune carte n'est écrite deux fois (les noms viennent de modules.json).

POUR CHAQUE TÂCHE
- Contrôles du § 5 de ta première mission avant chaque push (verifier-neutre, tests unitaires, build, *.rendu.cjs,
  poids EP-19, parcours *.parcours.cjs, axe-core) ; à l'œil à 390 et 1440 px.
- Fiche de session par branche (docs/sessions/AAAA-MM-JJ-<branche>.md) avec un prompt de reprise ; ligne de la tâche
  dans docs/plan/modules/VIT-site-vitrine.md ; jamais docs/plan/suivi.md ni docs/plan/decisions.md.
- Tableau « Choix faits sans le chef » dans la PR, comme pour VIT-20. Tu t'arrêtes pour : une phrase nouvelle non visée,
  un fichier hors de la tâche, une dépendance, un geste irréversible.
- Termine ta réponse par l'état de chaque tâche : PR, dernier sha, phase (a ou b), ce qui attend le chef.
```

## Notes pour le chef (hors prompt)

- **Avant de l'envoyer** : fusionner #257.
- **Vos visas** : un commentaire « Visé » (ou « Visé sauf : … ») sur chaque PR des tâches 2, 3 et 4 ; le coordinateur relit les tableaux avant vous et vous donne son avis.
- **Ce que l'agent ne prend pas** : VIT-16 (Contact, À propos : vos corrections et le nom du réseau manquent), VIT-02 (formulaire : il faut un serveur et le juriste), VIT-03 (centre d'aide : plan à écrire avec vous), VIT-06 (serveur), le conflit de #223 (le coordinateur).
