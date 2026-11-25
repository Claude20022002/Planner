# EDT-04 · Publication, PDF et courriels selon l'école

**Statut** : plan écrit le 25 novembre 2026. Les quatre décisions de produit du § 2 ont été prises le
même jour (Q-31 à Q-34) ; le chef peut les rouvrir en relecture de la PR. Le code suit dans la même
branche, puis la PR attend sa relecture.

**Fonction** : EDT-04, [fiche du module](../../plan/modules/EDT-emploi-du-temps.md) — taille M,
classée « libre » dans [le suivi](../../plan/suivi.md). Le module la fait dépendre de UIX-02
(vocabulaire des écrans selon le profil), qui dépend elle-même de MOT-05 : ce plan tient le lot
sans elles, et dit au § 5 ce qu'il laisse de côté.

**Branche** : `feat/edt-04-pdf-par-ecole`, depuis `origin/main` (`561fad19`). Aucune migration,
aucune route nouvelle, aucun changement de droits.

## 1. Pourquoi maintenant

Le critère de « terminé » du module est violé aujourd'hui : « le PDF d'une école fictive de collège
ne contient ni « filière » ni « semestre » ». Vérifié sur `main` le 25 novembre 2026 :

| Fait | Preuve |
|---|---|
| L'en-tête du PDF est composé en mots du supérieur | `backend/services/planning/edtMensuel.js`, `intitules()` : « 2ème année du cycle Ingénieur d'État en … » et « 4A \| IIIA (S7) » |
| Le titre d'année est figé dans le vocabulaire du supérieur | `frontend/src/i18n/fr.js` : `monthly.year` = « Année Universitaire » |
| Le réglage existe déjà — en base, dans l'API, dans l'identité du site — et ne sert à rien | `modele_edt` (`planner` ou `hestim`) : migration 0055, `backend/services/etablissement/identite.js:19`, renvoyé par `GET /etablissement` |
| Le panneau le dit lui-même | `frontend/src/pages/gestion/IdentiteEcole.jsx:13` : « Le modèle de l'EDT du mois (modele_edt) n'est pas proposé : aucun écran ne s'en sert encore » |

Le reste du lot est déjà livré et ne sera pas refait :

- le PDF est l'impression du document A4 d'une classe (`frontend/src/components/edt/DocumentEdtMois.jsx`),
  au logo et aux couleurs de l'école via `LogoEcole` (D-21) ;
- la publication du mois notifie et envoie les courriels aux couleurs de l'école
  (`backend/services/calendrier/envoiEdt.js`, phase R4 et décision du 21 octobre 2026) ;
- l'identité et la marque se règlent dans le panneau (D-21, lots ME-1 et ME-11).

Ce qui manque tient donc en une phrase : **le document et son aide ne suivent pas le modèle réglé
par l'école**, alors que le réglage existe.

## 2. Décisions du 25 novembre 2026

| N° | Question | Décision | Conséquence |
|---|---|---|---|
| Q-31 | Comment le PDF s'adapte-t-il à l'école ? | **Deux modèles réglables** : `hestim` garde le document officiel actuel ; `planner` produit un document neutre | le serveur choisit l'intitulé selon `modele_edt` ; le site n'ajoute que les libellés |
| Q-32 | Qui règle le modèle, et où ? | **L'administration, dans le panneau « Identité et marque »** | un sélecteur à deux options, à côté du nom, des couleurs et du logo |
| Q-33 | Périmètre de la publication | **Inchangé : par filière** | `envoiEdt.js` et ses routes ne bougent pas |
| Q-34 | Langue des courriels de publication | **Hors lot** : UIX-05 (ton des messages) et UIX-07 (anglais) | les courriels restent en français ; le lot garantit seulement qu'aucun mot du supérieur n'y est écrit — c'est déjà le cas |

## 3. Le document « planner » (neutre)

| Zone | `hestim` (inchangé) | `planner` (nouveau) |
|---|---|---|
| Titre d'année | « Année Universitaire : 2026/2027 » | « Année scolaire : 2026/2027 » |
| Intitulé de la classe | « 2ème année du cycle Ingénieur d'État en Génie informatique » | le nom du groupe tel quel, « IIIA » |
| Ligne de code | « 4A \| IIIA (S7) » | absente : la ligne n'est pas dessinée |
| Lignes du tableau | Matière / Enseignant / Salle | identiques |
| Pied de page | (P.S) / (D.S) et leurs légendes | identique |
| Aide avant impression | « Format officiel {{ecole}}, en A4 portrait… » | « Format neutre, en A4 portrait : utilisez « Enregistrer au format PDF » dans la fenêtre d'impression » |

Rien d'autre ne change : grille des créneaux, semaines, fusions de séances, événements bloquants,
salles et préfixe de campus, distanciel, reports marqués, version publiée comprise.

**Repli** : `modele_edt` absent, vide ou inconnu en base → `planner`. C'est le défaut de toute base
neuve (migration 0055) ; la base HESTIM porte `hestim` depuis la même migration, elle ne change donc
pas de document.

## 4. Changements, fichier par fichier

| Fichier | Changement |
|---|---|
| `backend/services/planning/edtMensuel.js` | `intitules(groupe, periode, modele)` : `planner` → `intitule_classe = groupe.nom_groupe`, `code_classe = null`. `entete.modele` ajouté. Le modèle est lu sur l'`identite()` déjà appelée pour le préfixe des salles : aucune requête de plus |
| `backend/tests/integration/` (fichier voisin du test EDT existant) | deux cas : base réglée `planner` → le corps de la réponse ne contient ni « filière » ni « semestre », `intitule_classe` = nom du groupe, `code_classe` nul ; base réglée `hestim` → intitulés actuels à l'identique (non-régression) |
| `frontend/src/components/edt/modeleDocument.js` (nouveau, pur) | `libellesDocument(modele)` → `{ cleAnnee, cleAide, codeVisible }`, repli `planner` |
| `frontend/src/components/edt/modeleDocument.test.js` (nouveau) | les deux modèles et le repli ; les tests unitaires du site sont en `node --test`, sans DOM : la logique à prouver est donc extraite ici, comme `choixMarque.test.js` |
| `frontend/src/components/edt/DocumentEdtMois.jsx` | lit `edt.entete.modele`, emploie les libellés du module pur, ne dessine la ligne de code que si `code_classe` existe |
| `frontend/src/pages/EdtMensuel.jsx` | aide à l'impression selon le modèle |
| `frontend/src/pages/gestion/IdentiteEcole.jsx` | `modele_edt` ajouté à `CHAMPS`, sélecteur « Modèle de l'EDT du mois » (deux options), commentaire de la ligne 13 retiré |
| `frontend/src/i18n/fr.js` et `en.js` | `monthly.anneeScolaire`, `monthly.aideNeutre`, et les quatre libellés du sélecteur (dans `etablissement.fr.js` et `.en.js`) |

L'API n'a rien à apprendre : `PUT /etablissement` valide déjà `modele_edt` contre `MODELES_EDT`
(`planner` ou `hestim`) et `GET /etablissement` le renvoie déjà. Le panneau se contente de l'offrir.

## 5. Ce que le lot ne fait pas

- **La langue des courriels** (Q-34) : UIX-05 pour le ton, UIX-07 pour l'anglais. Deux lots ne
  doivent pas écrire la même couche.
- **Le vocabulaire des écrans** : EDT-04 dépend de UIX-02, qui dépend de MOT-05 (nomenclature lue en
  base), non fait. Le lot ne touche que le document imprimé et son aide.
- **L'aide de « Explorer les emplois du temps »** (après une génération) : elle garde `monthly.help`,
  le texte du format officiel. Cet écran ne connaît pas le modèle de l'école avant d'avoir chargé un
  document, et le lot ne lui en ajoute pas la lecture : à reprendre avec UIX-02.
- **La publication « toute l'école »** (Q-33) : à rouvrir si le chef la veut pour un collège.
- **L'arabe du PDF** : UIX-04, qui commence par prouver le rendu arabe de jsPDF.
- **`monthly.group` = « Classe (groupe) »** et les messages du serveur qui disent « filière »
  (« Filière introuvable », « réservé au responsable de la filière ») : ce sont des textes d'écran,
  donc UIX-05.

## 6. Preuve du critère

Le critère « le PDF d'une école fictive de collège ne contient ni « filière » ni « semestre » » se
prouve en deux temps, sans navigateur :

1. **serveur** — une école d'essai réglée `modele_edt = "planner"` ; `GET /emplois-du-temps/groupe/:id/mensuel`
   répond un corps où `JSON.stringify` ne contient ni `filière` ni `semestre`, et où
   `entete.intitule_classe` vaut le nom du groupe ;
2. **site** — le module pur rend, pour `planner`, la clé « année scolaire », l'aide neutre, et
   `codeVisible = false` : le document ne peut donc dessiner ni « (S7) » ni le code de filière.

Le PDF étant la copie imprimée de ce document, il ne contient rien que ces deux preuves n'aient
établi. Un parcours Playwright complet serait plus cher (Docker, solveur) pour un gain nul ici.

## 7. Risques et parades

| Risque | Parade |
|---|---|
| Le document HESTIM change par accident | test de non-régression sur `hestim` ; le diff ne touche que la branche `planner` de `intitules()` |
| Une base ancienne sans ligne d'identité affiche le modèle neutre | c'est le défaut voulu (migration 0055) ; le panneau permet de revenir à `hestim` sans migration |
| Le site garde en mémoire l'ancienne identité | le panneau recharge déjà la page après enregistrement (`appliquer`), ce qui relit `modele_edt` |

## 8. Ordre des commits

1. ce plan seul ;
2. serveur : `edtMensuel.js` et son test d'intégration ;
3. site : module pur et son test, document, aide, panneau, i18n ;
4. fiche de session `docs/sessions/2026-11-25-feat-edt-04.md`, avec les vérifications lancées.

Puis la PR, pour la relecture du chef. Le chef fusionne ; `docs/plan/suivi.md` reste au coordinateur.
