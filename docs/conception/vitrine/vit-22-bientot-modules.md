# VIT-22 · La page « Bientôt » suit les 17 modules : plan et phrases à viser (phase a)

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) |
| Branche | `feat/vit-22-bientot-modules`, depuis `origin/main` |
| Rédigé par | Claude Code (Sonnet 5.5), le 2026-11-22 |
| Taille | S |
| **Visa** | **en attente du chef** : « Visé » ou « Visé sauf : … » dans un commentaire de la PR. Aucun code avant. |

## 1. Objet

`src/i18n/*/bientot.json` a ses propres cartes (Notes et bulletins, Transport et internat, Communication, En arabe…), qui ne correspondent pas aux 12 modules « Bientôt »
de `donnees/modules.js` (étude 15, validés le 21 nov.). La page « Bientôt » doit montrer **ces 12 modules et pas d'autres cartes de module**, sans date, sans prix, avec le badge « Bientôt »,
et leurs noms doivent venir d'un seul endroit (`modules.json`) pour qu'aucune carte ne soit écrite deux fois.

## 2. Plan de réalisation (phase b, après visa)

- `pages/[lang]/bientot.astro` : pour chaque catégorie de `CATEGORIES` (Organiser, Enseigner, Gérer, Communiquer), une `GrilleCartes` des modules dont l'état est `bientot`, dans l'ordre de `modulesDeCategorie`.
  Titre de la carte : le nom du module (`modules.json` · `noms.<clé>`) ; texte : `bientot.json` · `modules.<clé>` ; badge : `bientot.json` · `badge`. Le titre de chaque catégorie vient de `commun.json` · `categories.*`.
  Les icônes sont dans une table `ICONES` à côté de la page (≤ 80 lignes pour la page : la table va dans `components/applications/iconesModules.js`).
- `bientot.json` : `modules` (12 phrases, § 4) remplace `ecole` et `aussi` ; `meta`, `entete` et `badge` restent, `meta.description` change (§ 4, ligne M).
  Aucune carte n'a de champ `titre` : le nom ne s'écrit qu'une fois, dans `modules.json`.
- Le nombre de cartes suit `modules.js` : un module qui devient disponible quitte la page sans toucher au texte (il a sa propre page).
- `tests/bientot.test.js` : la page a une carte par module « Bientôt » (12), aucune pour un module disponible ; chaque module « Bientôt » a sa phrase en français et en anglais ; `bientot.json` ne contient aucun `titre` de carte ;
  l'arabe garde les mêmes clés, vides. `tests/bientot.rendu.cjs` : 12 cartes avec le badge, dans les quatre catégories, et aucun lien vers un module « Bientôt ».
- Les tests existants qui lisent `bientot.json` (`contenu.test.js`, `comparer.test.js` : source `vitrine/src/i18n/fr/bientot.json` d'une case) sont mis à jour dans la même PR.

## 3. Les 17 modules et la page

| Module | État | Sur la page « Bientôt » |
|---|---|---|
| Emploi du temps, Présences, Espace de cours, Quiz et jeux, Annonces et messages | disponibles | non : ils ont leur page |
| les 12 autres (§ 4) | « Bientôt » | oui, une carte chacun |

## 4. Les 12 phrases

Règle : phrase prise dans les cartes actuelles quand elle dit la même chose ; sinon proposée d'après « Ce qu'il fait » de l'[étude 15](../../etude-marche/15-modules-et-packs.md) (§ 4), sans promesse de date. Les noms (fr, en) sont ceux de `modules.json`.

| N° | Catégorie | Module (fr · en) | Phrase (fr) | Phrase (en) | Origine |
|---|---|---|---|---|---|
| 5 | Enseigner | Bibliothèque · Library | Les documents de l'école, rangés par filière et par module. | The school's documents, organised by programme and by module. | **à viser** : reprend la phrase de la page Étudiants (« Les documents sont rangés par filière et par module. »), retirée de cette page par VIT-21 et gardée ici avec le badge « Bientôt » ; étude 15 : « documents de cours rangés par filière et par module » |
| 7 | Organiser | Vacataires et heures · Part-time staff and hours | La séance prévue, faite, visée, puis payée : l'état mensuel des vacataires. | Sessions planned, held, approved, then paid: the monthly statement for part-time teachers. | **à viser** : nouvelle, d'après l'étude 15 (« la chaîne séance prévue, faite, visée, payée, l'état mensuel signé ») |
| 8 | Enseigner | Évaluations, crédits et jurys · Grades, credits and juries | La saisie des notes et les bulletins, avec les crédits. | Grade entry and report cards, with credits. | carte actuelle « Notes et bulletins » |
| 9 | Gérer | Inscriptions · Admissions | Les candidatures, jusqu'à l'inscription, sans rien ressaisir. | Applications through to enrolment, with nothing typed twice. | carte actuelle « Admissions » |
| 10 | Gérer | Documents vérifiables · Verifiable documents | Attestations et certificats, avec un code que chacun peut vérifier. | Certificates with a code anyone can check. | carte actuelle « Documents vérifiables » (en : « Attestations » n'a pas d'équivalent exact dans la carte actuelle, qui dit « Certificates ») |
| 11 | Enseigner | Stages · Internships | Les stages des étudiants. | Student internships. | carte actuelle « Stages et anciens », coupée : « et le lien avec les anciens élèves » n'est pas dans l'étude 15 |
| 12 | Gérer | Frais et caisse · Fees and cash desk | Les échéances et les reçus. | Instalments and receipts. | carte actuelle « Frais et paiements », coupée en deux (ici la première moitié) |
| 13 | Enseigner | Formation et financeurs · Training and funders | Les sessions de formation, les conventions et l'émargement signé. | Training sessions, agreements and signed attendance sheets. | **à viser** : nouvelle, d'après l'étude 15 (« sessions et cohortes, conventions, émargement signé ») |
| 14 | Communiquer | Vie scolaire et familles · School life and families | Les absences, la discipline, le choix des options et les activités. Un compte pour les parents, pour un ou plusieurs enfants, et les réunions avec les enseignants. | Absences, discipline, elective choices and activities. An account for parents, for one or several children, and meetings with teachers. | cartes actuelles « Vie scolaire » et « Familles », mises bout à bout sans changer un mot |
| 15 | Gérer | Échanges avec l'État · Government exchanges | Les données de l'école, exportées vers la plateforme nationale de votre pays. | School data, exported to your country's national platform. | carte actuelle « Export vers la plateforme nationale » |
| 16 | Gérer | Paiements en ligne · Online payments | Le paiement en ligne. | Online payment. | carte actuelle « Frais et paiements », coupée en deux (ici la seconde moitié) |
| 17 | Organiser | Pilotage · Analytics | Les chiffres clés de l'école, pour la direction. | The school's key figures, for its leaders. | carte actuelle « Tableaux de bord » |
| M | méta | `meta.description` | Les modules de Planner en préparation : évaluations, crédits et jurys, vie scolaire et familles, inscriptions, frais et caisse, et plus encore. Aucun n'est encore disponible. | Planner modules in preparation: grades, credits and juries, school life and families, admissions, fees and cash desk, and more. None is available yet. | actuelle, avec les noms des modules à la place de « notes et bulletins, vie scolaire, familles, admissions, frais et paiements » |

Une phrase qui n'est pas visée (lignes 5, 7, 13) peut rester vide : la carte montre alors seulement le nom et le badge.

## 5. Les cartes actuelles qui ne sont pas un module

| Carte actuelle (fr · en) | Que devient-elle | Pourquoi |
|---|---|---|
| Communication · « Les messages aux familles, aussi par WhatsApp. » | **retirée** | c'est une évolution du module disponible « Annonces et messages » (étude 15 : SMS, WhatsApp plus tard, étape 6), pas un module ; la phrase promet un canal : le chef dit s'il la veut en entrée « Bientôt » du registre de l'Annonces et messages |
| Transport et internat · « Les trajets des cars scolaires et les chambres de l'internat. » | **retirée** | l'étude 15 (§ 4.4) range transport et internat parmi « ce qui ne se vend pas » ; la page ne doit pas annoncer ce que l'offre exclut |
| En arabe · « Planner en arabe, en plus du français et de l'anglais. » | **gardée**, dans une section « Et aussi » | ce n'est pas un module mais une langue (UIX-04) ; phrase déjà visée, inchangée |
| Hors ligne · « L'application mobile entièrement utilisable sans connexion. La semaine déjà consultée se lit dès aujourd'hui sans réseau. » | **gardée**, dans la même section | texte déjà visé, repris par VIT-20d ; inchangé |
| Les cartes « Notes et bulletins », « Vie scolaire », « Familles », « Admissions », « Frais et paiements », « Stages et anciens », « Documents vérifiables », « Tableaux de bord », « Export vers la plateforme nationale » | remplacées par les cartes de module du § 4 | leur phrase est reprise (§ 4) ; leur nom ne s'écrit plus nulle part dans `bientot.json` |

Les titres de la section « Et aussi » (« Et aussi » · « Partout, et dans votre langue. ») restent ; les titres « La vie de l'école » · « De l'inscription au diplôme. » sont remplacés par les noms des quatre catégories.

## 6. Questions pour le chef

| N° | Question | Proposition |
|---|---|---|
| 1 | Viser les trois phrases nouvelles (Bibliothèque, Vacataires et heures, Formation et financeurs) | oui, ou « Visé sauf » : la carte reste sans phrase |
| 2 | Retirer les cartes Communication et Transport et internat | oui |
| 3 | Garder « En arabe » et « Hors ligne » dans « Et aussi » | oui |
| 4 | Stages : couper « et le lien avec les anciens élèves » | oui |
| 5 | Titre des sections : les noms des catégories (Organiser, Enseigner, Gérer, Communiquer) | oui |
