# Session du 2026-11-15 · pilote UIX-06a · `feat/uix-06a-interface`

| | |
|---|---|
| Fait par | Codex, modèle actif de la session |
| Chantier | exception UIX-06a autorisée par le chef, aucun quatrième chantier |
| Dossier | `..\travaux-planner\uix-06a-interface` |
| Validation avant code | `f4b730fb` |
| Implémentation et documentation | `54a9cdea` |
| PR existante | #185, en brouillon ; nouveaux commits non poussés |

## Objectif et plan

Livrer le pilote de gestion [UIX-06a](../conception/interface/uix-06a-interface.md). Le chef a répondu « Valider » aux quatre propositions et au plan précisé. Accord inscrit et commité avant toute implémentation.

## Fait

- Kit officiel mosaïque copié intact : horizontal clair/sombre, mot clair/blanc et favicons. Assemblage MarquePlanner : identité d’école, filet et mot seul à 40 %, plaque blanche sous le logo d’école en sombre ; repli par le nom si l’image échoue.
- Le logo et le favicon génériques ne remplacent pas ceux d’une école. LogoEcole et les documents imprimés restent hors de cette reprise.
- ThemeGestion local : Inter jusque dans les champs, ardoise sans couleurs d’école, couleurs d’école déclinées pour rester lisibles, clair/sombre et focus bleu. Thème historique extrait sans modifier ses préférences ni ses huit variantes.
- Connexion/récupération, accueil et menu utilisent la marque et la composition communes.
- Comptes, Enseignants et Étudiants assemblent désormais des composants et hooks courts. Recherche nommée, filtres existants, nombre de résultats, tableau ordinateur et fiches téléphone ; tri et sélection des comptes conservés.
- Formulaires, MFA, invitation, désactivation, compétences/charges, années et import/export préservés ; aucun nouveau champ scolaire ni API.
- États chargement, erreur avec nouvelle tentative, vide et aucun résultat distingués. Recherche Comptes/Étudiants toujours limitée à la page chargée, explicitement indiquée.
- DESIGN, conception, module et suivi actualisés. Six parcours de régression ajoutés, sans réponse métier de réussite simulée.
- Boîte relue avant et après le travail : aucun nouveau message UIX-06a. Message UIX-01a/MOT-02 laissé en entrée car sa partie MOT-02 reste à traiter dans sa session. Coordinateur informé avant code puis par rapport de livraison.

## Vérifié

- **65 tests unitaires réussis**, zéro échec : variantes et empreintes du kit, proportions et contrastes inclus.
- **Build Vite réussi**, avertissement de taille de bundles existant.
- **Lint : zéro erreur, 20 avertissements historiques hors pilote**. Les fichiers créés/extraits ont aussi passé un lint ciblé sans avertissement.
- **Neutralité conforme**, aucun nom d’école ajouté en dur aux sources produit.
- **Huit thèmes historiques identiques** avant/après extraction : familles planner/studylib × clair/sombre × français/anglais.
- **26 contrôles Chromium/axe-core 4.10.3, zéro violation A/AA** : 16 listes isolées (390/1280 px, clair/sombre, Planner, école sans logo, image inaccessible, image d’école fictive chargée), six formulaires isolés à 390 px et quatre vues de la vraie connexion compilée. Vérifications de clavier, débordement, plaque blanche, variante du logo, FR/EN et police calculée. Captures représentatives relues visuellement.
- Les montages de composants n’effectuent aucune opération métier ; les API de la connexion compilée sont interrompues. Cela ne prouve pas une authentification ni les mutations de gestion.
- **49 parcours découverts dans 27 fichiers**, dont six nouveaux, syntaxe et collecte valides. **Non exécutés** : leur configuration démarre solveur, API, base de test et site, réservés au chef.
- `git diff --check` et contrôle de l’index réussis avant commit.

Un essai de lint après génération des captures a accidentellement inclus les bundles temporaires (options mangées par npm sous PowerShell). Le lint final passé directement à ESLint avec exclusion de test-results a réussi. Le premier build avait détecté un conflit Windows entre MarquePlanner.jsx et marquePlanner.js ; le helper a été renommé choixMarque.js, puis le build a réussi. La relecture visuelle a aussi détecté la police Barlow héritée dans les champs ; corrigée puis vérifiée comme Inter.

## Artefacts et reproduction locale

Les fichiers de contrôle sont conservés dans `frontend/test-results/uix-06a/`, ignoré par Git : inspecter.mjs, fixture.jsx, connexion.mjs, verifier-theme.mjs, resultats.json, connexion-resultats.json, captures et journaux. Axe-core a été téléchargé dans ce dossier uniquement, sans modifier package.json ni lockfile. Les captures utilisent des écoles et personnes fictives.

Depuis frontend :

```powershell
npm run test:unit
npm run build
node node_modules/eslint/bin/eslint.js . --ignore-pattern 'test-results/**'
node test-results/uix-06a/inspecter.mjs
node test-results/uix-06a/connexion.mjs
```

Les scripts de contrôle visuel sont locaux à ce dossier de travail. Leurs montages ne sont pas les parcours intégrés de l’application.

## État laissé

Implémentation locale du pilote terminée, **à relire et vérifier en CI**. UIX-06 complet reste en cours : les autres domaines n’ont pas été repris. Aucun backend, migration 0060, conteneur, serveur, push ou fusion effectué. Tableau des missions du coordinateur inchangé. Jonction frontend/node_modules vers les dépendances du dépôt principal, sans installation de dépendances produit.

## Reste à faire

1. Coordinateur : relire le pilote et confirmer le périmètre, notamment marque et isolation du thème.
2. Chef : publier les commits sur la PR #185 existante ; exécuter les parcours réels ou attendre leur CI.
3. Corriger tout échec puis obtenir la recette métier avec serveur. Ne pas annoncer UIX-06 complet ni fusionner sur la seule base des contrôles isolés.

## Commandes pour le chef

Depuis le dépôt principal :

```powershell
git -C "..\travaux-planner\uix-06a-interface" push origin feat/uix-06a-interface
gh pr checks 185 --watch
```

Si une recette locale est souhaitée, le chef peut lancer `npm run test:parcours` depuis le frontend de ce dossier, avec les prérequis décrits par sa configuration. Aucune nouvelle PR à créer.

## Prompt de reprise

```text
Tu reprends UIX-06a, branche feat/uix-06a-interface, dossier
C:\Users\clusa\Desktop\Github Project\travaux-planner\uix-06a-interface.
Lis AGENTS.md, docs/plan/README.md, suivi.md, decisions.md, la boîte
..\boites\codex\entree, docs/conception/interface/uix-06a-interface.md
et docs/sessions/2026-11-15-feat-uix-06a-interface-3.md.
Le plan et ses quatre propositions sont VALIDÉS par le chef (« Valider » le 15 novembre).
Validation f4b730fb avant code ; implémentation 54a9cdea.
Pilote codé : marque mosaïque/école, thème local Inter/ardoise compatible,
connexion/récupération, accueil/navigation et Comptes/Enseignants/Étudiants.
PR #185 existante en brouillon ; l’agent n’a poussé aucun nouveau commit.
65 tests unitaires verts, build réussi, lint zéro erreur/20 avertissements historiques,
neutralité conforme, huit thèmes historiques identiques, 26 contrôles Chromium/axe sans violation.
49 parcours découverts, dont six nouveaux, NON EXÉCUTÉS : ils lancent des serveurs.
Reste : relecture coordinateur, publication et CI/recette réelle par le chef, puis corrections éventuelles.
Ne pas étendre aux autres domaines ni modifier backend/migration/serveur.
L’agent ne pousse et ne fusionne jamais. Fin : suivi, fiche, commits locaux et rapport.
```
