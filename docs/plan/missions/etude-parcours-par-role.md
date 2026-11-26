# Mission · étude · ce qui manque dans les parcours, rôle par rôle

| | |
|---|---|
| État | ouverte |
| Agent | Codex (VS Code) |
| Modèle recommandé | son modèle le plus fort, raisonnement élevé : lecture large de tout le dépôt (site, application, serveur, parcours), sans plan préalable à suivre |
| Attribuée le | 2026-11-26, par le coordinateur ; demande du chef : « vérifier les éléments manquants dans les parcours de nos différents utilisateurs selon leur rôle » (26 nov.) |
| Module et chantier | étude hors chantier ; touche UIX, EDT, COU, QJE, MOB, ADM, VIT en lecture seule |
| Fonction | relevé, pour chaque rôle, de ce qu'il doit pouvoir faire de bout en bout et de ce qui manque ou casse aujourd'hui · taille M |
| Branche | `etude/parcours-par-role`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\parcours-par-role` |
| Plan de conception | plan d'étude court à écrire (rôles, méthode, forme du rapport) · à valider par le coordinateur ; aucun code |

## Ce que l'étude rend

Un rapport `docs/recette/parcours-par-role.md` (et, s'il dépasse 300 lignes, un fichier par rôle dans `docs/recette/parcours-par-role/`) :

1. **Les rôles réels** du code : administration, responsable de filière (enseignant avec droits sur ses filières), enseignant permanent, vacataire, étudiant sur le site, étudiant sur l'application. Chacun lu dans le code (`Users.role`, `filieresDuResponsable`, statut de l'enseignant, garde de rôle de l'application), pas supposé.
2. **Pour chaque rôle, ses parcours de bout en bout** : se connecter, retrouver son espace, faire ses tâches du quotidien (emploi du temps, appel, cours, quiz et jeux, annonces, bibliothèque, offres de stage, réglages, compte, mot de passe, téléphone…), se déconnecter. Chaque étape notée **existe**, **manque**, **cassée** ou **masquée** (interrupteur éteint, comme `DEVOIRS_ACTIFS`), avec sa preuve : fichier et ligne, route, écran.
3. **Les manques**, classés : bloquant (le rôle ne peut pas finir sa tâche), gênant, confort. Chacun rattaché à une fonction existante du plan (identifiant) ou proposé comme fonction nouvelle, sans numéro (le coordinateur numérote).
4. **Les écarts avec les exigences produit**, rôle par rôle : EP-18 (sans téléphone de l'élève, peu de connexion), EP-5 (aucun pays supposé), EP-16 (aucun texte en dur), accessibilité (UIX-03).
5. **Les parcours automatiques** (`frontend/tests/parcours/`, 48 fichiers) : quels parcours de rôle sont couverts, lesquels ne le sont pas.

## Critère de « terminé »

- Chaque rôle a son tableau de parcours, chaque ligne avec sa preuve dans le code.
- Chaque manque bloquant est rattaché à une fonction du plan ou proposé comme fonction nouvelle.
- Rien n'est écrit dans le code, ni dans les fichiers de module, ni dans `suivi.md` : le coordinateur reporte les suites.

## Périmètre d'écriture

L'agent peut modifier :

- `docs/recette/parcours-par-role.md` (et `docs/recette/parcours-par-role/` si besoin)
- son plan d'étude dans `docs/conception/qualite/etude-parcours-par-role.md` et sa fiche de session

L'agent ne touche pas :

- le code, les tests, les fichiers de module, `docs/plan/suivi.md`, `docs/plan/decisions.md`
- il peut lancer le site et les parcours en local pour vérifier une étape, sans rien committer d'autre que le rapport

## Ce qui est déjà décidé

- Le parent n'existe pas encore (ADM-05, MOB-05, étape 6) : il est hors de l'étude, sauf une ligne qui le rappelle.
- Les devoirs sont masqués (décision du 11 oct.) : un parcours de devoir est « masqué », pas « manque ».
- L'Espace de cours, aujourd'hui, ce sont des liens et des sondages ; le dépôt de fichiers est « Bientôt » (chef, 22 nov.).
- Aucune donnée réelle dans le rapport (dépôt public) : pas de nom d'école, ni de personne, ni de capture de la production.

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|

## Prompt à donner à l'agent

```text
Tu travailles sur Planner. Ta mission : étude « ce qui manque dans les parcours, rôle par rôle » (hors chantier, sans code).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md,
puis ta fiche de mission docs/plan/missions/etude-parcours-par-role.md.
Branche : etude/parcours-par-role, depuis origin/main, dans le dossier ..\travaux-planner\parcours-par-role.
Tu n'écris que dans le périmètre de la fiche. S'il faut en sortir, arrête-toi et demande.
Écris d'abord un plan d'étude court (rôles, méthode, forme du rapport), commite-le seul, dépose-le dans ta boîte de sortie pour validation.
Règles : chaque constat avec sa preuve (fichier et ligne, route, écran) ; questions avant toute supposition ;
fiche de session à jour en fin de session, suivi.md non modifié ; tout est commité ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-26 | mission remise à Codex (boîte), n° 4 de sa file | — |
