# UIX-06c · Salles, Campus, Créneaux et Calendrier · conception proposée

| | |
|---|---|
| Module | UIX, suite d'UIX-06a (Personnes) et d'UIX-06b (référentiel pédagogique) |
| Identifiant | UIX-06c, proposé le 18 novembre 2026 |
| Branche | `feat/uix-06c-ressources-temps`, depuis `origin/main` (UIX-06b et UIX-10b fusionnées ; consigne du coordinateur, 21 nov.) |
| Rédigé par | Claude Code (Opus 5.5), coordinateur, le 18 novembre 2026 |
| Validé | **Validé par Claude20022002 le 18 novembre 2026**, avec l'exception hors chantier limitée à ces quatre écrans ; départ après UIX-09. La question 3 (UIX-06d) reste ouverte |
| Travail | **Claude (VS Code) seul**, les quatre lots l'un après l'autre (réponse 7 du chef, 21 nov. au soir, `decisions.md`) ; les repères de fichiers d'[equipe.md](../../plan/equipe.md), § 3, restent |

## 1. Objet et critère de « terminé »

Même travail qu'UIX-06b, sur les quatre écrans des **ressources et du temps** : Salles, Campus, Créneaux et Calendrier. Mêmes fonctions, mêmes droits, mêmes appels au serveur, au style du pilote Personnes, découpés en composants courts.

**Terminé** quand :
- chaque champ, filtre et action du § 2 existe toujours pour l'administrateur ;
- ces actions marchent sur ordinateur et à 390 px, en français et en anglais, en clair et en sombre ;
- le clavier et les contrastes AA sont vérifiés par axe-core ;
- aucun fichier ne dépasse les repères du § 3 d'[equipe.md](../../plan/equipe.md) (page 80 lignes, hook 200, composant 150) ;
- la CI est verte, parcours compris.

## 2. Ce qui existe, lu dans le code de `main` (`bd934ebf`)

Les quatre routes sont réservées à l'administrateur (`PrivateRoute requiredRole="admin"` dans `App.jsx`).

| Écran et route | Fonctions à garder | Repères |
|---|---|---|
| Salles, `/gestion/salles` | recherche ; filtre par campus ; colonnes nom, type, capacité, capacité d'examen, étage ou sous-sol, campus, équipements, réservation (administration ou enseignants), état ; création, édition, suppression avec confirmation ; capacité d'examen jamais au-dessus de la capacité ; import de l'inventaire avec erreurs par ligne ; export Excel | `pages/gestion/Salles.jsx`, **507 lignes**, tout dans la page ; `DataToolbar`, `EmptyState`, `utils/fileImport`, `exportColumns` |
| Campus, `/gestion/campus` | liste code, nom, adresse, nombre de salles, état ; adresse manquante signalée ; création, édition, suppression ; temps de trajet entre campus | `pages/gestion/Campus.jsx`, 252 lignes ; `components/campus/TempsTrajet` |
| Créneaux, `/gestion/creneaux` | grilles par régime et par variante ; jour, début, fin, rang ; fin après le début ; chevauchement refusé avec son explication ; créneau utilisé protégé ; ajout, édition, suppression | `pages/gestion/Creneaux.jsx`, 305 lignes |
| Calendrier, `/gestion/calendrier` | années (création, suppression, année active) ; semestres et périodes ; événements ; ajout groupé des jours fériés ; confirmation et décalage des séances ; portée de l'établissement | `pages/gestion/Calendrier.jsx`, 346 lignes ; `components/calendrier/` (dialogues et sections déjà extraits) |

Chaque lot complète cet inventaire en lisant son écran, avant d'écrire : c'est la liste qu'il vérifie à la fin.

## 3. Solution

La même que celle d'UIX-06b ([uix-06b-referentiel.md](uix-06b-referentiel.md), § 4) :
- la page assemble ;
- un hook par écran charge les données et porte les actions ;
- les listes, fiches et dialogues vivent dans le dossier du domaine ;
- les outils communs d'UIX-06b (`components/gestion/`) sont repris, sans être recopiés.

Particularités :
- **Salles** : la page de 507 lignes se coupe en `components/salles/` (hook, liste, fiche téléphone, dialogue, import). Sur téléphone, une fiche par salle, avec la capacité et l'état visibles d'abord.
- **Créneaux** : la grille par jour reste lisible à 390 px (un jour à la fois, ou une liste par jour). Le refus de chevauchement garde son explication.
- **Calendrier** : les composants existent déjà ; il reste à sortir le chargement et les actions de la page dans un hook. Les confirmations de décalage restent visibles.
- **Campus** : `TempsTrajet` est gardé tel quel, sauf sa présentation.

Distinguer partout le chargement, l'échec avec nouvelle tentative, l'absence réelle de données et l'absence de résultat pour un filtre.

## 4. Périmètre de fichiers

Chemins sous `frontend/src/`.

| Ordre | Lot | Zone |
|---|---|---|
| 0 | dictionnaires | `i18n/ressources/*.js` vides, branchés dans `i18n/index.js` ; `components/gestion/` repris, et demandé au coordinateur s'il doit changer |
| 1 | Salles | `pages/gestion/Salles.jsx`, `components/salles/` (nouveau), `i18n/ressources/salles.*.js` |
| 2 | Campus | `pages/gestion/Campus.jsx`, `components/campus/`, `i18n/ressources/campus.*.js` |
| 3 | Créneaux | `pages/gestion/Creneaux.jsx`, `components/creneaux/` (nouveau), `i18n/ressources/creneaux.*.js` |
| 4 | Calendrier | `pages/gestion/Calendrier.jsx`, `components/calendrier/`, `i18n/ressources/calendrier.*.js` |
| chaque lot | parcours | `frontend/tests/parcours/ressources-<lot>.spec.cjs` ; les parcours existants qui passent par ces écrans |

La répartition entre trois agents du 18 nov. est remplacée par la réponse 7 du chef (21 nov. au soir) : un lot ne commence qu'une fois le précédent commité et vérifié.

**Réponses du chef du 21 nov., lot 3** (le coordinateur était injoignable) : 11, les états communs (chargement, échec avec « Réessayer », vide) sortent de `ListeGestion` dans `components/gestion/EtatsGestion.jsx`, réutilisé par Créneaux et Calendrier, sans changer le rendu de `ListeGestion` ; 12, Créneaux à 390 px est une **liste par jour** (chaque jour en titre, ses créneaux dessous), la grille reste sur ordinateur.

**Thème (mise à jour du 21 nov., renvoi)** : depuis UIX-10b (#235), un seul thème tiré de la charte vaut pour toutes les pages (`design-system/themeCharte.js`, `design-system/jetonsInterface.js`). `ThemeGestion` et la liste des pages « pilotes » qui en fixait la portée sont retirés. Les quatre écrans prennent donc ce thème sans rien étendre, et `components/layouts/DashboardLayout.jsx` sort du périmètre : sa liste de routes ne commande plus que le favicon, que UIX-10c change pour toutes les pages. Un besoin dans le thème ou les jetons se demande au coordinateur, comme pour UIX-11.

Ni `App.jsx`, ni les droits, ni les services d'API, ni le serveur.

## 5. Données, sécurité, exigences

- **Aucune** table, migration, colonne ou route nouvelle. Les validations et les données envoyées restent les mêmes.
- Les droits restent ceux d'aujourd'hui : administration seulement.
- Exigences : EP-2 (interface sobre), EP-4 (le refus de chevauchement s'explique), EP-9 (parcours verts), EP-11 (français et anglais ; l'arabe viendra avec UIX-04).

## 6. Vérifications

Celles d'UIX-06b, § 8, appliquées aux quatre écrans :
- inventaire avant et après ;
- import et export des salles ;
- refus de chevauchement d'un créneau ;
- ajout groupé des jours fériés et décalage ;
- 390 et 1280 px, clair et sombre, français et anglais, axe-core ;
- lint, tests unitaires, build, neutralité ;
- CI complète.

## 7. Étapes

1. Validation de ce plan et de l'exception par le chef ; accord écrit dans `decisions.md`.
2. Lot 0, par Claude (VS Code), depuis `origin/main` : dictionnaires vides ; outils communs repris (plus de portée du thème à étendre depuis UIX-10b, § 4).
3. Les lots 1 à 4 l'un après l'autre (§ 4), chacun commité avec son parcours et ses vérifications.
4. Relecture par le coordinateur, PR par le chef.

## 8. Risques et retour arrière

- **Salles** porte l'import d'inventaire : un parcours d'import avec une ligne en erreur est obligatoire.
- **Calendrier** décale des séances : la confirmation ne doit jamais disparaître sur téléphone.
- UIX-06b est fusionnée sur `main` : ses outils communs sont la base ; un lot ne les fait pas grossir, il le demande.

Retour arrière : réverter les commits d'UIX-06c, sans toucher la base.

## 9. Questions au chef

| N° | Question | Proposition |
|---|---|---|
| 1 | Valider ce plan (fonction L) ? | oui |
| 2 | Accorder l'exception hors chantier pour UIX-06c, sans quatrième chantier ? | oui, limitée à ces quatre écrans |
| 3 | Les autres écrans de gestion (Conflits 365, Affectations 336, Imprévus 332, Examens 305) suivent-ils en UIX-06d ? | oui, une fois UIX-06c relue |
