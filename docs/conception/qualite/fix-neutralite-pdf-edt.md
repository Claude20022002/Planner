# Correctif · les emplois du temps réels hors du dépôt · `fix/neutralite-pdf-edt`

| | |
|---|---|
| Module | QUA · correctif de neutralité, sans chantier |
| Taille | S |
| Rédigé par | le coordinateur (Claude Code, Opus 5.5), le 2026-11-27 |
| **Validé** | par le chef le 27 nov. (« retire les deux PDF du dépôt ») |

## Le constat

Deux PDF d'emplois du temps réels étaient dans le dépôt, qui est public : `docs/exemple_emploi_du_temp - 3A IIIA (Du 30 Mars Au 26 Avril 2026).pdf` et `docs/Planning/EDT 4A IIIA  (Octobre 2026).pdf`. Ils portent les noms des enseignants et le nom de l'école. Les données tirées du premier (`docs/exemple_emploi_du_temps_donnee.yaml`) reprenaient ces noms, et un commentaire de `backend/models/EnseignementEnseignant.js` en citait deux. `scripts/verifier-neutre.mjs` ne lit ni les PDF ni les documents.

## La correction

1. Retirer les deux PDF du dépôt ; une copie reste sur le poste du chef, hors dépôt (`..\travaux-planner\hors-depot\`).
2. Neutraliser le YAML : « École d'exemple », enseignants « A » à « J » (la même personne garde la même lettre) ; matières, rythme et salles inchangés.
3. Neutraliser le commentaire du modèle ; mettre à jour les renvois (`PRODUCT.md`, `docs/README.md`, commentaire de `donneesIiia.mjs`).
4. **Test de régression** : `verifier-neutre.mjs` refuse tout document bureautique suivi par git (PDF, Word, Excel, PowerPoint, OpenDocument), sauf une liste justifiée : `docs/modeles/` (personnes fictives, vérifié), `docs/ecole/` et `docs/presentation/` (relecture demandée au chef).

## Hors périmètre, au chef

- **L'historique git** garde les deux PDF : les effacer demande de réécrire l'historique et de forcer la poussée (décision du chef).
- `deploy/vps/demo/demo-enseignant.mjs` prend un vrai nom d'enseignante par défaut (ligne 45) : script du serveur, à neutraliser avec le chef.
- `docs/ecole/` (trois PDF du projet PACTE) et `docs/presentation/` (deux présentations au nom de l'école) : à relire par le chef.

## Vérification

- `node scripts/verifier-neutre.mjs` passe ; il échoue quand un des PDF revient dans l'index (montré).
- Aucun des noms relevés ne reste dans le dépôt, hors listes de noms courants des données fictives (`backend/seed.js`, `deploy/vps/noms-marocains.mjs`) et le script de démonstration ci-dessus.
