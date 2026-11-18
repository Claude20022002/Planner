# Mission · VIT-07 · le site vitrine présente toutes les applications de Planner

| | |
|---|---|
| État | ouverte : plan court à écrire |
| Agent | agent de Cursor (Grok 4.7 high) : il a déjà écrit des pages de fonctions le 18 nov. ; tâche bornée au plan validé |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. (« il manque encore plein de choses sur le site », « compléter les éléments manquants avant le déploiement ») |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05, dégelée sans tarifs |
| Fonction | VIT-07 : une page par application qui manque, la Bibliothèque sortie de « Bientôt », la navigation qui les montre toutes · taille M |
| Branche | `feat/vit-07-contenu-complet`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\vit-07-contenu-complet` |
| Plan de conception | plan court à écrire (`docs/conception/vitrine/vit-07-contenu-complet.md`) · **validé par le chef** : ce que le site promet est un choix de produit |
| Condition de VIT-06 | **condition 5** de la mise en ligne (décision du chef, 18 nov.) |

## Ce qui manque, relevé par le coordinateur le 18 nov.

Planner a sept applications (`frontend/src/i18n/applications.fr.js`) : Emploi du temps, Enseignements (classes, matières, espace de cours), Personnes, Établissement, Annonces, Quiz et jeux, Bibliothèque. Le site présente bien l'emploi du temps, l'appel, l'établissement et la sécurité. Il manque :

1. **Quiz et jeux** : une seule carte « Des jeux » dans En classe. À montrer :
   - le **Studio quiz** : dix types de questions, médias, passation à son rythme par lien, code ou QR, quiz en direct avec points selon la justesse et la rapidité, génération par l'IA quand l'école l'active ;
   - les **jeux pédagogiques** : dix simulations et trente défis (`shared/simulations/catalogue/`), le jeu du terminal Linux, les sessions de jeu au tableau puis sur le téléphone, le suivi de l'enseignant.
2. **Bibliothèque** : elle est rangée dans « Bientôt », **alors qu'elle existe**. Il faut une page, faite d'après ce que StudyLib fait vraiment : lis `..\StudyLib` (routes, contrôleurs, vues) sans le modifier, et ne décris que ce qui y est. Et il faut **la retirer de « Bientôt »** (`bientot.json`, dans les trois langues).
3. **Espace de cours et annonces** : supports déposés par l'enseignant, sections, sondages de la classe, annonces de l'école.
4. **Application mobile** : ce qu'elle fait aujourd'hui (emploi du temps, scanner de l'appel, jeux, bibliothèque), d'après `mobile/src/app/`. Sans promesse de magasin d'applications si elle n'y est pas.
5. **La navigation** : avec Solutions, le site aurait plus de huit liens. Le plan propose un regroupement lisible, par exemple un menu « Fonctions » qui ouvre les pages d'applications. La même page se lit en 390, 768 et 1440 px.

## Deux règles du chef du 18 nov., à appliquer à tout le site

- **EP-18, tous les contextes** : le site ne présente jamais le QR code ni le téléphone de l'élève comme le seul chemin. L'appel se fait aussi à la main (présent, en retard, absent : `frontend/src/i18n/fr.js`, `appel.aideListe` et `statuts`), et les jeux se jouent aussi au tableau, en mode collectif (`backend/services/jeux/sessions.js`). Chaque page qui parle du QR code dit aussi l'autre chemin. Une école sans téléphone pour ses élèves, ou avec peu de connexion (la RDC, par exemple), doit s'y reconnaître.
- **Pas de Massar seul** : « Export Massar » devient « Export vers la plateforme nationale de votre pays », avec Massar au Maroc comme exemple, marqué « Bientôt ». Aucun autre nom d'outil d'État n'est cité tant que son connecteur n'est pas prévu (ETA-03). Cela vaut pour `bientot.json`, `solutions.json` et toute autre page.

## Règles du site, qui ne changent pas

- **Ne dire que ce qui existe** : chaque phrase s'appuie sur un fichier du code, cité dans le plan. Ce qui est prévu est marqué « Bientôt », sans date.
- Aucun prix. Aucun nom d'école réelle (`node scripts/verifier-neutre.mjs`). Rien chargé d'un autre site.
- La loi 09-08 n'est pas nommée (Q-23). L'IA s'écrit « quand l'école active l'IA ».
- Français et anglais ; l'arabe affiche le français en attendant UIX-04.
- Les composants du socle (`vitrine/src/components/socle/`) se réutilisent **sans être modifiés**. Un besoin dans le socle se demande dans `sortie\`.

## Périmètre d'écriture

- `vitrine/src/pages/[lang]/` : les nouvelles pages seulement ;
- `vitrine/src/components/fonctions/`, pour réutiliser ou ajouter un composant de page ;
- `vitrine/src/i18n/{fr,en,ar}/` : les fichiers des nouvelles pages, `bientot.json`, `solutions.json`, `en-classe.json` et `emploi-du-temps.json` (pour les deux règles ci-dessus), et la clé de navigation de `commun.json` ;
- `vitrine/src/i18n/langues.js` (`PAGES`, `NAVIGATION`), et `vitrine/src/components/socle/EnTete.astro` pour la navigation seulement ;
- `vitrine/tests/` ; le plan court, `docs/plan/modules/VIT-site-vitrine.md`, la fiche de session.

L'agent ne touche pas :
- à `docs/plan/suivi.md` ;
- à `vitrine/src/styles/` (UIX-10a, Claude de VS Code) ;
- à l'accueil (`index.astro`, `accueil.json`), où la vidéo arrive (VIT-08) : ses textes sont ajustés par Claude de VS Code, avec les mêmes deux règles ;
- à tout le reste.

## Contrôles

Build, tests unitaires du site (traductions comprises), `node scripts/verifier-neutre.mjs`, pas de défilement horizontal en 390 et 1440 px, mouvement réduit respecté. Lighthouse et axe-core se vérifient sur chaque nouvelle page avant la PR, s'ils peuvent tourner sur le poste ; sinon, le rapport le dit.

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 15 h 40 | fiche écrite, sur décision du chef | — |
