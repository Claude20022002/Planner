# Mission · UIX-11 · le tableau de bord de l'administration

| | |
|---|---|
| État | ouverte : plan court à écrire, **après UIX-10b** |
| Agent | Claude (VS Code), la session de la charte : elle aura posé le thème d'UIX-10b, sur lequel ce tableau se construit (choix du chef, 18 nov., vers 17 h 15) |
| Modèle recommandé | celui de la session (Opus 5.5 ou Fable 5.2) : la fonction touche des données de plusieurs modules |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. vers 17 h 15 (contenu : « refaire et compléter » ; agent : Claude de VS Code, après UIX-10b) |
| Module et chantier | [UIX](../modules/UIX-interface.md) · étape 2 de la [feuille de route](../feuille-de-route.md), hors chantier comme UIX-10 |
| Fonction | UIX-11 : le tableau de bord de l'administration, refait à la charte et complété des chiffres qui existent déjà dans la base, chaque chiffre menant aux lignes qui le composent · taille M |
| Branche | `feat/uix-11-tableau-de-bord`, depuis `origin/main`, **après la fusion d'UIX-10b** |
| Dossier de travail | `..\travaux-planner\uix-11-tableau-de-bord` |
| Plan de conception | plan court à écrire : `docs/conception/interface/uix-11-tableau-de-bord.md` (modèle `docs/plan/modeles/conception.md`) · validé par **le coordinateur** s'il n'utilise que des routes qui existent et ne montre aucune donnée nominative d'élève ; **par le chef** s'il ajoute une route ou une requête côté serveur, ou s'il montre une donnée nominative d'élève |

## Ce que le chef a choisi

Le 18 nov. vers 17 h 15, entre trois voies (par l'outil de questions du coordinateur) :
- **retenu : refaire et compléter.** Le tableau de bord passe à la charte, et il ajoute les chiffres que la base contient déjà ;
- écarté : le seul passage à la charte (il serait entré dans UIX-10b) ;
- écarté : le pilotage complet (trésorerie, présence des enseignants, notes). Ses données n'existent pas encore : c'est PIL-01 et PIL-02, reportés à l'étape 5.

## Ce qui existe aujourd'hui

`frontend/src/pages/dashboard/AdminDashboard.jsx` (206 lignes) assemble :
- le **panneau des séances à venir** (`DepartureBoard`), filtrable par bâtiment ;
- la **file « À traiter »** (`components/dashboard/FileATraiter.jsx`) : conflits non résolus, demandes de report en attente, téléphones à délier, séances à vérifier (lot R-9 des archives, fait) ;
- une **bande de quatre indicateurs** (`statistiquesAPI.getKPIs`) : occupation des salles, séances planifiées, enseignants actifs, taux de conflits, avec un lien vers « Statistiques ».

Les données qui existent côté serveur, à vérifier une à une dans le plan (point de départ, pas une liste fermée) :
- `GET /api/statistiques/kpis`, `/dashboard`, `/salles/occupation`, `/enseignants/charge`, `/groupes/occupation`, `/activite/pics` (`routes/statistiquesRoutes.js`) ;
- `GET /api/statistiques/usage?mois=` : comptes actifs du mois par rôle, et compteurs tirés des appels, des parties de quiz et des devoirs rendus (`services/statistiques/usage.js`, lot R-12) ;
- `GET /api/suivi/modules`, `/enseignants`, `/seances-a-verifier` (`routes/suiviRoutes.js`) ;
- les présences (`routes/presenceRoutes.js` : signalements, demandes de téléphone), les conflits, les demandes de report.

## Critère de « terminé »

- Le tableau de bord suit la charte d'UIX-10b (jetons de `shared/charte/`), en clair et en sombre, sans couleur écrite en dur.
- **Chaque chiffre affiché mène, en un clic, aux lignes qui le composent** (la règle de PIL), et dit sa période (jour, semaine ou mois).
- **Aucun chiffre sans source** : chaque bloc du plan nomme la route et la table qu'il lit. Ce qui n'existe pas dans la base ne s'affiche pas, même vide.
- **EP-18** : la page ne demande aucun téléphone. Avec peu de connexion, chaque bloc se charge et échoue seul, sans vider la page (c'est déjà le cas aujourd'hui, à garder).
- **Aucun pays supposé** (EP-5) : aucun nom d'outil d'État, aucune devise.
- Fichiers de moins de 300 lignes, commentaire de rôle en tête ; textes en français et en anglais ; parcours du tableau de bord vert, avec axe-core.

## Périmètre d'écriture

L'agent peut écrire :
- `frontend/src/pages/dashboard/AdminDashboard.jsx` ;
- `frontend/src/components/dashboard/` (composants existants et nouveaux) ;
- un fichier de traductions à lui, `frontend/src/i18n/tableauDeBord.fr.js` et `.en.js`, et son enregistrement dans `frontend/src/i18n/index.js` (une ligne par langue) ; les clés `admin.*` qu'il déplace hors de `fr.js` et `en.js` ;
- `frontend/src/services/api.js`, pour appeler des routes **qui existent déjà** ;
- un parcours `frontend/tests/parcours/tableauDeBord.spec.cjs`, et les tests unitaires de ses composants ;
- le plan court, `docs/plan/modules/UIX-interface.md` (la ligne UIX-11) et sa fiche de session.

L'agent ne touche pas :
- à `docs/plan/suivi.md`, que tient le coordinateur ;
- au thème et aux jetons (`ThemeGestion`, `shared/charte/`, `shared/design-tokens.json`) : c'est UIX-10b. Un besoin s'y demande au coordinateur ;
- aux tableaux de bord des enseignants et des étudiants (`EnseignantDashboard.jsx`, `EtudiantDashboard.jsx`), ni à `Statistiques.jsx` ;
- au serveur (`backend/`) **sans l'accord du chef** : une route nouvelle se propose dans le plan, et le chef la valide ;
- aux fichiers d'UIX-06c (Salles, Campus, Créneaux, Calendrier), si elle est ouverte en même temps.

## Ce qui est déjà décidé

- Feuille de route du chef, 18 nov. : l'étape 2 comprend « un tableau de bord de gestion de l'administration », avec les données qui existent seulement.
- Pilotage (PIL) reporté à l'étape 5 ; ses critères valent ici : un chiffre mène à ses lignes.
- EP-18 et EP-5 généralisée (chef, 18 nov., 16 h) : chaque plan dit comment il les tient.
- Le panneau « À traiter » regroupe ce qui attend l'administration (archives, `remarques-par-profil.md`, R-9).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Quels chiffres ajouter, parmi ceux qui existent ? | l'agent en dresse la liste dans le plan, avec la route de chacun, et le chef ou le coordinateur choisit | plan court |
| 2 | Le tableau de bord montre-t-il des chiffres de présence des élèves par classe ? | seulement des taux par classe, sans nom d'élève ; le détail nominatif reste dans l'écran de l'appel. Si le plan le propose, il va au chef (donnée d'élève) | chef |

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : UIX-11, le tableau de bord de l'administration, refait à la charte
et complété des chiffres qui existent déjà (choix du chef du 18 nov.). Elle vient après UIX-10b dans ta file.
Lis d'abord AGENTS.md, docs/plan/README.md (EP-5, EP-18), docs/plan/suivi.md, docs/plan/feuille-de-route.md,
puis ta fiche de mission docs/plan/missions/uix-11-tableau-de-bord.md.
Branche : feat/uix-11-tableau-de-bord, depuis origin/main après la fusion d'UIX-10b, dans ..\travaux-planner\uix-11-tableau-de-bord.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Aucun plan n'existe : pose tes questions (outil de questions), écris le plan court docs/conception/interface/uix-11-tableau-de-bord.md,
avec pour chaque bloc la route et la table qu'il lit, et une section EP-18. Commite-le seul.
Le coordinateur le valide s'il n'utilise que des routes existantes et aucune donnée nominative d'élève ; sinon, le chef.
Règles : pas de code avant le plan validé ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
Quand tu as fini, dis-le au chef : le coordinateur relit ta branche avant la PR.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 17 h 30 | fiche écrite par le coordinateur, sur le choix du chef (refaire et compléter ; Claude de VS Code après UIX-10b) | — |
| 2026-11-21 18 h 40 | plan court reçu (`b2975e84`, local) : M, routes existantes, sans migration ni donnée d'élève nouvelle, « Ce que disent les études » présente. Réponse 5 : le taux de conflits sort de la bande. Réponse 6 : semaine du lundi au dimanche, isolée dans `periodes.js`. Réponse 7 (UIX-06c) : Claude (VS Code) seul, après UIX-11 (chef) | **plan validé par le coordinateur** ; code après la fusion de #235 |
