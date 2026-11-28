# ADM-02b · La page « Configuration » : Réglages et Historique — plan court

| | |
|---|---|
| Module | [ADM](../../plan/modules/ADM-administration.md) · chantier ouvert ; étape 2 sur 3 d'ADM-02 |
| Plan parent | [adm-02-configuration.md](adm-02-configuration.md), validé par le chef le 22 nov. (§ 3 réponses 4, 7, 9, 13 ; § 5.6 ; § 6 bloc « ADM-02b » ; § 9 ; § 10) |
| Mission | `docs/plan/missions/adm-02.md` |
| Branche | `feat/adm-02b-configuration`, depuis `origin/main` (`fb821d24`, ADM-02a fusionnée par #281) |
| Rédigé par | Claude Code (Opus 5.5), sous-agent du coordinateur, le 27 nov. 2026 |
| **Validé** | par le coordinateur le 27 nov., réponses 1 à 9 selon les propositions ; écarts 1 à 4 du plan parent acceptés (le code fait foi) |

## 1. Ce que l'étape livre

La page `/gestion/configuration` (l'ancienne adresse redirige), entrée « Configuration » du menu, avec deux onglets : **Réglages** (les cinq réglages de `GET /api/moteur/reglages`) et **Historique** (les versions). Les changements forment un **brouillon tenu par l'écran** ; une barre en bas les compte ; l'**aperçu** les montre avant → après, avec l'effet et la date ; « Appliquer » crée et applique en une requête avec la `base`. Rien du serveur ne change : l'API d'ADM-02a suffit (relevé du § 2).

Critère de « terminé » de l'étape : points 3, 4, 7 et 8 du critère du plan parent pour les deux onglets (refus sous leur champ, aperçu avec effet et date, 409 avec « Recharger », historique lisible, annuler et abandonner, trois clics, axe-core, français et anglais, mesure EP-19) ; suites du site vertes, lint, `verifier-neutre`.

## 2. Ce que le code d'ADM-02a fournit (relevé du 27 nov.)

Toutes les routes sont sous `/api/moteur`, `requireAdmin` ; erreurs au format `{ message, code, violations }`.

| Appel | Forme réelle (le code fait foi) |
|---|---|
| `GET /reglages` | `{ date, aujourdhui, profil, version_courante, choix, reglages: [{ id, valeur, valeur_du_profil, origine, unite, min, max, pas, effet }], regles: [...] }`. `unite` : `heure` (stockée en minutes, `pas` 60), `minute`, `pourcentage` (1 à 100), `nombre`. `effet` : `saisie_et_generation` ou `immediat`. `origine` vaut `etablissement` quand l'école a posé la valeur |
| `POST /versions/apercu` | corps `{ date_effet, lignes, base }` → `{ date_effet, changements: [{ id, nom, avant: { valeur }, apres: { valeur }, effet }], contraintes, retirees, violations: [{ cle, code, message }], conflits: [{ cle, id_version, code: "version_depassee", message }], peut_appliquer }`. Date passée : 400 `DATE_EFFET_PASSEE` |
| `POST /versions` | corps `{ libelle?, date_effet, lignes, appliquer: true, base }` → 201 la version ; 400 `REGLAGES_REFUSES` (violations) ; 409 `VERSION_DEPASSEE` (violations = conflits) ; 400 `BASE_INVALIDE` |
| `GET /versions` | tableau allégé : `id_version, libelle, date_effet, statut (brouillon, appliquee, annulee), appliquee_le, auteur { id_user, nom } ou null, nb_reglages, nb_contraintes, nb_retraits, annule_version, annulee_par` |
| `GET /versions/:id` | détail : `reglages: [{ cle, nom, portee, valeur, retiree, … }]`, `contraintes` et `retraits` avec leur `phrase` (en français) ; 404 `VERSION_INTROUVABLE` |
| `POST /versions/:id/annuler`, `/abandonner` | 201 l'inverse, 200 le brouillon abandonné ; refus 409 `VERSION_PLUS_RECENTE`, `VERSION_DEJA_ANNULEE`, `VERSION_NON_APPLIQUEE`, `VERSION_NON_BROUILLON` ; 403 `DROIT_INSUFFISANT` |

Une ligne de brouillon : `{ cle, valeur }` (valeur dans l'unité stockée), ou `{ cle, retiree: true }` pour revenir à la valeur de départ. Un état « annulée » n'existe pas en base : c'est une version `appliquee` avec `annulee_par` ; `statut: "annulee"` est un brouillon **abandonné**.

## 3. Fichiers

Dans `frontend/src/components/configuration/` sauf mention. Fonctions pures dans des `.js` testés par `node --test` (`npm run test:unit`, motif `src/**/*.test.js`) ; les hooks ne font qu'appeler.

| Fichier | Rôle | Taille visée |
|---|---|---|
| `pages/gestion/ParametresPlanning.jsx` (réécrit, réponse 9) | assemble : `EnteteGestion`, onglets (`?onglet=reglages`, `historique`), barre, aperçu ; `beforeunload` tant que le brouillon n'est pas vide | 153 → 110 |
| `configurationApi.js` | `lireReglages()`, `apercu(corps)`, `appliquer(corps)`, `lireVersions()`, `lireVersion(id)`, `annuler(id)`, `abandonner(id)`, avec `request` d'`api.js` | 40 |
| `textes.js` | enregistre `configuration.{fr,en}.js` à l'import de la page (question 4) | 20 |
| `useConfiguration.js` | charge `GET /reglages` : réglages, `aujourdhui`, `base` ; état de chargement et d'erreur ; `recharger()` | 70 |
| `brouillon.js` + `brouillon.test.js` | brouillon pur : poser une valeur (retirée si elle égale la valeur en vigueur), revenir au départ, retirer, vider, compter, corps envoyé | 90 + 100 |
| `useBrouillon.js` | `useReducer` sur `brouillon.js` | 40 |
| `reglages.js` + `reglages.test.js` | saisie ↔ valeur stockée par unité (heures ↔ minutes), valeur lisible, clé de texte tirée de l'identifiant (`HOR.REGLE.MAX_H_JOUR_GROUPE` → `HOR_REGLE_MAX_H_JOUR_GROUPE`), contrôle local par les bornes **reçues** | 60 + 70 |
| `refus.js` + `refus.test.js` | texte d'un refus par son code, avec ses paramètres ; repli sur `message` | 50 + 60 |
| `historique.js` + `historique.test.js` | état d'une version (brouillon, appliquée, prévue, abandonnée, annulée), actions permises, libellé d'une annulation | 40 + 60 |
| `OngletReglages.jsx`, `LigneReglage.jsx` | la liste ; une ligne : nom, aide, champ et unité, valeur de départ, effet, pastilles, refus sous le champ | 60, 130 |
| `useHistorique.js` | liste chargée à l'ouverture de l'onglet seulement, détail à la demande, annuler, abandonner, confirmation | 80 |
| `OngletHistorique.jsx`, `DetailVersion.jsx` | tableau (cartes sous 600 px), état vide ; détail dépliable | 150, 90 |
| `useApercu.js` | requête d'aperçu (à l'ouverture et à chaque date valide), application, 409, recharger | 80 |
| `FenetreApercu.jsx` | la fenêtre : « À partir du », libellé, avant → après et quand, refus, conflits, « Appliquer » | 170 |
| `BarreBrouillon.jsx` | « N changements · Voir l'aperçu · Tout effacer » | 60 |
| `i18n/ressources/configuration.fr.js`, `.en.js` | textes du § 4 | 150 chacun |
| `App.jsx` | route `/gestion/configuration` (`lazy`, déjà le cas), l'ancienne en `<Navigate replace>` | +5 −3 |
| `layouts/navigation.jsx` | chemin de l'entrée du menu ; titre de la nouvelle adresse | 1 changée, 1 ajoutée |
| `i18n/fr.js`, `en.js` | valeur de `nav.planningSettings` : « Configuration » (question 2) | 1 ligne chacun |
| `tests/parcours/configuration.spec.cjs` | § 5 | 230 |

Charte d'UIX-10b : `EnteteGestion`, `StateChip`, `EmptyState`, `ConfirmDialog` (lus, jamais modifiés) ; aucune couleur en dur ; marges logiques seulement (droite à gauche).

## 4. Comportement et textes

**Réglages.** Chaque ligne : nom, aide, champ numérique avec son unité, « Valeur de départ : … » (`valeur_du_profil`), l'effet (réponse 7), une pastille « Réglé par l'école » si `origine === "etablissement"`, une pastille « Changé dans le brouillon ». Le contrôle local (bornes de `GET /reglages`) affiche le refus tout de suite **sous le champ**, mais la valeur va quand même au brouillon : le serveur tranche à l'aperçu (question 7). « Revenir à la valeur de départ » (si l'école a posé la valeur) met `{ cle, retiree: true }` au brouillon (question 9). Aucune requête pendant la saisie (EP-18).

**Aperçu.** S'ouvre par la barre ; demande `POST /versions/apercu` avec `date_effet` (par défaut `aujourdhui` de `GET /reglages`, **jamais** la date du navigateur ; champ `type="date"` avec ce minimum) et `base`. Redemandé quand la date change. Montre : réglage, avant, après, quand (« À partir du … » si la date est à venir, puis l'effet). Les refus (`violations`) sont sous leur ligne et reportés sous le champ de l'onglet ; les conflits (`conflits`) donnent le bandeau « Les réglages ont changé… ». « Appliquer » n'est actif que si `peut_appliquer`. Succès : brouillon vidé, réglages rechargés (nouvelle base), historique rechargé s'il était ouvert, message. **409** : bandeau, réglages en cause nommés, bouton « Recharger » qui relit les réglages et la base, **garde le brouillon** et redemande l'aperçu (question 8). Les dates s'affichent sans fuseau pour une date seule, au fuseau de l'école pour `appliquee_le`.

**Historique.** Chargé à la première ouverture de l'onglet. Colonnes : version, libellé, à partir du, état, auteur, changements ; « Voir le détail » charge `GET /versions/:id`. « Annuler cette version » sur une version appliquée non annulée ; « Abandonner ce brouillon » sur un brouillon ; chacun avec confirmation, puis rechargement de l'historique et des réglages (nouvelle base, brouillon gardé).

Textes nouveaux (clés sous `configuration.`). Interface neutre : groupe, enseignant, séance, campus (nom du catalogue), jamais « semestre », « classe » ni « module ».

| Clé | Français | Anglais |
|---|---|---|
| `intro` | Réglez ce que le calcul des emplois du temps et les contrôles appliquent à toute l'école. Vos changements forment un brouillon : vous voyez leur effet avant de les appliquer. | Set what timetable generation and checks apply to the whole school. Your changes form a draft: you see their effect before applying them. |
| `onglets.libelle`, `.reglages`, `.historique` | Parties de la configuration · Réglages · Historique | Configuration sections · Settings · History |
| `reglages.HOR_REGLE_MAX_H_JOUR_GROUPE.nom` / `.aide` | Heures par jour · groupe / Au-delà, une séance de plus dans la journée du groupe est refusée. | Hours per day · group / Beyond this, one more session in the group's day is refused. |
| `reglages.ENS_CHARGE_MAX_H_JOUR.nom` / `.aide` | Heures par jour · enseignant / Au-delà, une séance de plus dans la journée de l'enseignant est refusée. | Hours per day · teacher / Beyond this, one more session in the teacher's day is refused. |
| `reglages.LOG_TRAJET_CAMPUS_DEFAUT.nom` / `.aide` | Trajet entre campus par défaut / S'applique entre deux campus dont le temps de trajet n'est pas renseigné. | Default travel time between campuses / Applies between two campuses whose travel time is not entered. |
| `reglages.EXA_EPREUVE_RATIO_CAPACITE.nom` / `.aide` | Places utilisables en examen / Part de la capacité d'une salle utilisée en examen, quand la salle n'a pas sa propre valeur. | Seats usable in exams / Share of a room's capacity used in exams, when the room has no value of its own. |
| `reglages.EXA_EPREUVE_SURVEILLANTS_PAR_SALLE.nom` / `.aide` | Surveillants par salle d'examen / Nombre visé quand les surveillants sont affectés d'office ; en dessous, l'épreuve est signalée. | Invigilators per exam room / Target number when invigilators are assigned automatically; below it, the exam is flagged. |
| `unites.heure`, `.minute`, `.pourcentage` | h · min · % | h · min · % |
| `valeurDepart` | Valeur de départ : {{valeur}} | Starting value: {{valeur}} |
| `regleParEcole`, `dansBrouillon` | Réglé par l'école · Changé dans le brouillon | Set by the school · Changed in the draft |
| `revenirDepart`, `retirerDuBrouillon` | Revenir à la valeur de départ · Retirer du brouillon | Back to the starting value · Remove from the draft |
| `effet.saisie_et_generation` | S'applique tout de suite aux séances placées à la main, et à la prochaine génération. | Applies at once to sessions placed by hand, and at the next generation. |
| `effet.immediat`, `effet.prochaine_generation` | S'applique tout de suite. · S'applique à la prochaine génération. | Applies at once. · Applies at the next generation. |
| `saisieInvalide` | Saisissez un nombre entier. | Enter a whole number. |
| `barre.libelle`, `barre.changements_one`, `_other` | Brouillon · 1 changement · {{count}} changements | Draft · 1 change · {{count}} changes |
| `barre.apercu`, `barre.effacer` | Voir l'aperçu · Tout effacer | Preview · Clear all |
| `apercu.titre`, `apercu.chargement` | Aperçu des changements · Calcul de l'aperçu… | Preview of changes · Preparing the preview… |
| `apercu.colonnes` (4) | Réglage · Avant · Après · Quand | Setting · Before · After · When |
| `apercu.dateEffet`, `apercu.dateAide` | À partir du · Aujourd'hui, ou une date à venir. | From · Today, or a later date. |
| `apercu.libelle`, `apercu.libelleAide` | Libellé (facultatif) · Pour retrouver ce changement dans l'historique. | Label (optional) · To find this change in the history. |
| `apercu.aPartirDu` | À partir du {{date}}. {{effet}} | From {{date}}. {{effet}} |
| `apercu.refusTitre` | Ces changements sont refusés : corrigez-les avant d'appliquer. | These changes are refused: correct them before applying. |
| `apercu.conflitsTitre`, `apercu.rechargerAide` | Les réglages ont changé depuis votre ouverture. · Votre brouillon est gardé : relisez l'aperçu avant d'appliquer. | The settings have changed since you opened this page. · Your draft is kept: read the preview again before applying. |
| `apercu.recharger`, `apercu.appliquer`, `apercu.fermer` | Recharger · Appliquer · Retour au brouillon | Reload · Apply · Back to the draft |
| `apercu.applique`, `apercu.prevu` | Réglages appliqués. · Réglages prévus pour le {{date}}. | Settings applied. · Settings scheduled for {{date}}. |
| `apercu.erreur` | L'aperçu n'a pas pu être calculé. Réessayez. | The preview could not be prepared. Try again. |
| `historique.vide.titre` / `.description` | Aucun changement pour l'instant / Les réglages appliqués apparaîtront ici, avec leur date et leur auteur. | No changes yet / Applied settings will appear here, with their date and author. |
| `historique.colonnes` (6) | Version · Libellé · À partir du · État · Auteur · Changements | Version · Label · From · Status · Author · Changes |
| `historique.etat.brouillon`, `.appliquee`, `.prevue`, `.abandonnee`, `.annulee` | Brouillon · Appliquée · Prévue le {{date}} · Abandonnée · Annulée par la version {{n}} | Draft · Applied · Scheduled for {{date}} · Discarded · Undone by version {{n}} |
| `historique.annulationDe`, `.sansLibelle`, `.sansAuteur` | Annulation de la version {{n}} · Sans libellé · Planner (automatique) | Undo of version {{n}} · No label · Planner (automatic) |
| `historique.reglages_one/_other`, `.contraintes_one/_other`, `.retraits_one/_other` | 1 réglage / {{count}} réglages · 1 contrainte ajoutée / {{count}} contraintes ajoutées · 1 contrainte retirée / {{count}} contraintes retirées | 1 setting / {{count}} settings · 1 constraint added / {{count}} constraints added · 1 constraint removed / {{count}} constraints removed |
| `historique.voirDetail`, `.masquerDetail`, `.valeurDepart` | Voir le détail · Masquer le détail · Valeur de départ | Show details · Hide details · Starting value |
| `historique.annuler`, `.abandonner` | Annuler cette version · Abandonner ce brouillon | Undo this version · Discard this draft |
| `historique.confirmerAnnuler.titre` / `.message` / `.bouton` | Annuler la version {{n}} ? / Chaque réglage reprend la valeur qu'il avait avant. Une nouvelle version s'ajoute à l'historique. / Annuler la version | Undo version {{n}}? / Each setting goes back to its previous value. A new version is added to the history. / Undo version |
| `historique.confirmerAbandonner.titre` / `.message` / `.bouton` | Abandonner le brouillon {{n}} ? / Ce brouillon n'a jamais été appliqué ; il reste dans l'historique, marqué abandonné. / Abandonner | Discard draft {{n}}? / This draft was never applied; it stays in the history, marked as discarded. / Discard |
| `historique.garder`, `.annulee`, `.abandonne` | Garder · Version {{n}} annulée. · Brouillon {{n}} abandonné. | Keep · Version {{n}} undone. · Draft {{n}} discarded. |
| `refus.hors_bornes` | Choisissez une valeur entre {{min}} et {{max}}. | Choose a value between {{min}} and {{max}}. |
| `refus.borne_depassee` | Cette valeur dépasse une limite fixée pour votre école. | This value exceeds a limit set for your school. |
| `refus.non_modifiable` (aussi `droit_insuffisant`, `portee_interdite`) | Ce réglage ne se change pas depuis votre école. | This setting cannot be changed by your school. |
| `refus.mal_forme` (`type_invalide`, `ligne_vide`, `doublon`, `parametre_inconnu`, `cible_invalide`, `forme_invalide`) | Ce changement est mal formé : retirez-le du brouillon, puis recommencez. | This change is malformed: remove it from the draft, then try again. |
| `refus.version_depassee` | La version {{version}} a changé ce réglage depuis votre ouverture. | Version {{version}} changed this setting since you opened the page. |
| `refus.BASE_INVALIDE` | La page n'est plus à jour : rechargez-la. | The page is out of date: reload it. |
| `refus.DATE_EFFET_PASSEE`, `refus.DATE_EFFET_INVALIDE` | Choisissez aujourd'hui ou une date à venir : un réglage ne change pas le passé. · Saisissez une date valide. | Choose today or a later date: a setting does not change the past. · Enter a valid date. |
| `refus.VERSION_PLUS_RECENTE` | Une version plus récente change les mêmes réglages : annulez-la d'abord. | A more recent version changes the same settings: undo it first. |
| `refus.VERSION_DEJA_ANNULEE`, `refus.VERSION_NON_APPLIQUEE`, `refus.VERSION_NON_BROUILLON` | Cette version a déjà été annulée. · Seule une version appliquée s'annule. · Seul un brouillon s'abandonne. | This version has already been undone. · Only an applied version can be undone. · Only a draft can be discarded. |
| `refus.VERSION_INTROUVABLE`, `refus.DROIT_INSUFFISANT` | Cette version n'existe plus : rechargez l'historique. · Cette version change une règle fixée par Planner : votre école ne peut pas l'annuler. | This version no longer exists: reload the history. · This version changes a rule set by Planner: your school cannot undo it. |

Menu (`nav.planningSettings`, question 2) : « Configuration » / « Configuration ». Les libellés du journal (`parametres_version_*`) sont déjà sur `main` (ADM-02a). Les textes `ref.settings.*` restent (réponse 9), sans lecteur : leur retrait va avec « contracter ».

## 5. Tests

**Unitaires** (`npm run test:unit`) : `brouillon.test.js` (poser, une valeur égale à celle en vigueur se retire, retour au départ, vider, compter, corps envoyé sans `regles` ni contraintes vides superflues) ; `reglages.test.js` (heures ↔ minutes, pourcentage, nombre, saisie vide ou décimale, contrôle par les bornes reçues, clé de texte) ; `refus.test.js` (code connu avec paramètres, famille `mal_forme`, conflit de version, code inconnu → `message`) ; `historique.test.js` (cinq états, actions permises, libellé d'une annulation).

**Parcours** `configuration.spec.cjs` (une base partagée, passe avant `generation.spec.cjs` : un `afterEach` annule par l'API les versions appliquées pendant le test, pour rendre la base telle qu'il l'a trouvée) :
1. menu « Configuration » → `/gestion/configuration` ; `/gestion/parametres-planning` y mène ; cinq réglages, pas de « Durée d'une séance » ; axe-core sur la page ;
2. heures du groupe à 13 : refus sous le champ tout de suite ; l'aperçu rend le refus du serveur sous la ligne, « Appliquer » inactif ;
3. trajet changé : aperçu avant → après et effet ; « Appliquer » ; la ligne montre la valeur et « Réglé par l'école » ; Historique : version appliquée, auteur, « 1 réglage », détail ; « Annuler cette version » → valeur d'avant ;
4. date d'effet à demain (lue dans `GET /reglages`, plus un jour) : « Prévue le … » ; annulée avant sa date ;
5. aperçu ouvert, puis une version du même réglage appliquée par l'API : « Appliquer » rend le bandeau des conflits ; « Recharger » garde le brouillon ; l'application passe ;
6. un brouillon créé par l'API s'abandonne depuis l'historique : « Abandonnée » ;
7. en anglais, 390 px, thème sombre : textes anglais, axe-core sur la page et sur l'aperçu, aucun défilement horizontal ;
8. trois clics : menu, (onglet par défaut), champ.

## 6. Mesure EP-19, et hors étape

Avant le code, sur `fb821d24`, puis à la fin : `npm run build` du site, poids gzip du premier chargement (`index.html`, le point d'entrée, ses `modulepreload` et sa feuille de style, comme la mesure de M-9) et du morceau de la page ; script hors du dépôt (dossier temporaire). Les deux chiffres vont dans la fiche de session et dans la PR. La page est déjà chargée à la demande ; aucune dépendance n'est ajoutée.

**Hors étape (ADM-02c)** : l'onglet « Règles de génération » (profil, liste « Déjà pris en compte », six règles en quatre choix, contraintes, assistant, `phrases.js`) et `configurationRegles.spec.cjs`. Le brouillon d'ADM-02b porte déjà `regles`, `contraintes` et `retirer` dans son corps (vides), pour que 02c n'ait qu'à les remplir. Rien du serveur.

## 7. Écarts avec le plan parent, et questions

**Écarts (précisions au code, à confirmer)** : la réponse de `GET /reglages` a `valeur_du_profil`, `pas`, `aujourdhui` et `choix` (le § 5.3 disait `defaut`) ; les tests du site sont des `.test.js` de `node --test` sur des fonctions pures, à côté de leur fichier, et non `__tests__/useBrouillon.test.js` (un hook ne se teste pas sans moteur de rendu) ; l'en-tête est `EnteteGestion`, celui des pages de gestion d'UIX-06c, et non `PageHeader` ; quelques fichiers de plus que le § 6 pour tenir les tailles (`LigneReglage`, `DetailVersion`, `useHistorique`, `useApercu`, `reglages.js`, `historique.js`).

| N° | Question | Proposition |
|---|---|---|
| 1 | En 02b, l'onglet « Règles de génération » n'existe pas encore : trois onglets dont un vide, ou deux ? | **Deux onglets** (Réglages, Historique), Réglages par défaut ; 02c ajoute « Règles de génération » en premier et le rend par défaut (ordre de la réponse 4) |
| 2 | `components/applications/catalogue.js` (hors périmètre) range les entrées du menu par leur clé : une clé nouvelle `nav.configuration` ferait passer l'entrée de l'application « Établissement » à « Planning » | **Garder la clé `nav.planningSettings`** et changer sa valeur en « Configuration » dans `fr.js` et `en.js` (une ligne chacun) ; aucun fichier hors périmètre. Sinon : clé nouvelle et un mot dans `catalogue.js`, avec accord |
| 3 | « Quitter la page avec un brouillon demande confirmation » (§ 5.6) : le site utilise `BrowserRouter` ; `useBlocker` de React Router 7 exige un routeur de données, que changer touche toute l'application | **`beforeunload` seulement** (recharger, fermer l'onglet) ; changer d'onglet garde le brouillon ; un clic dans le menu le perd sans question : **limite connue**, écrite dans le module ADM |
| 4 | Le plan parent importe `configuration.*.js` dans `i18n/index.js`, donc dans le premier chargement de toute l'application (EP-19), et touche un fichier partagé | **Les enregistrer avec la page** (`textes.js` : `i18n.addResourceBundle(langue, "translation", { configuration }, true, true)` à l'import du morceau de la page) : premier chargement inchangé, `index.js` non touché. Sinon : import statique comme le plan, coût mesuré |
| 5 | Des textes de l'historique viennent du serveur en français : libellé « Annulation de la version N » (`annulation.js`), libellé de la reprise 0088, noms des clés hors des cinq, phrases des contraintes | Le site **compose** le libellé d'une annulation à partir de `annule_version` ; les autres libellés restent des données ; noms et phrases du serveur montrés tels quels en anglais **jusqu'à 02c** (`phrases.js`, noms des règles) ; version sans auteur : « Planner (automatique) » |
| 6 | Supprimer `parametrePlanningAPI.update` et `reset` d'`api.js`, morts depuis le 410 ? | **Oui**, deux lignes de la configuration en moins ; `getAll` reste (`useSalles.js`) |
| 7 | Une valeur hors bornes : bloquée par l'écran, ou envoyée ? | Refus affiché tout de suite sous le champ, **valeur gardée au brouillon** ; l'aperçu rend le refus du serveur et « Appliquer » reste inactif. Une seule source des bornes : `GET /reglages` |
| 8 | Après un 409, « Recharger » efface-t-il le brouillon ? | **Non** : relit valeurs et base, garde le brouillon, redemande l'aperçu, qui montre le nouvel « avant » |
| 9 | L'ancienne page avait « Rétablir » : le garder ? | **Oui**, « Revenir à la valeur de départ », qui met `{ cle, retiree: true }` au brouillon ; visible seulement si l'école a posé la valeur |

## 8. Étapes

1. Ce plan, commité seul ; validé par le coordinateur.
2. Mesure « avant » ; `configurationApi`, `brouillon`, `reglages`, `refus`, `historique` et leurs tests.
3. Page, onglet Réglages, barre, aperçu ; route, menu, textes.
4. Onglet Historique.
5. Parcours ; mesure « après » ; suites du site, lint, `verifier-neutre` ; fichier du module ADM (ce qui existe) ; fiche de session. Relecture du coordinateur, PR par le chef.

**Retour arrière** : rendre l'ancienne route et l'ancienne entrée du menu ; rien du serveur ni des données ne change.
