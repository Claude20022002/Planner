# Mission · les cinq correctifs courts de l'étude EP-18 (M-10, M-1, M-2a, M-9, M-11 et M-12)

| | |
|---|---|
| État | ouverte le 22 nov. ; un plan court par correctif |
| Agents | session Claude `plan-b-projet-pacte-20` : M-10, puis M-1 ; agent de Cursor (« Auto ») après le code de VIT-13 : M-12, M-11, puis M-9 ; l'agent de QJE-14a : M-2a (répartition du chef, 22 nov.) |
| Modèle recommandé | M-10 : le plus capable (une date fausse touche tout le produit) ; les autres : un modèle moyen suffit (S, au plan validé) |
| Attribuée le | 2026-11-22, par le coordinateur ; accord du chef : oui, le 22 nov. (outil de questions : l'ordre du § 9.1 de l'étude et cette répartition) |
| Module et chantier | correctifs hors chantier, décidés par le chef dans l'étude EP-18 ; chaque correctif écrit sa ligne dans son module à la fin |
| Source | [étude EP-18](../../conception/qualite/etude-ep18-faible-equipement.md) (branche `etude/ep18-faible-equipement` tant que sa PR n'est pas fusionnée), § 8 et § 9.1 |
| Plans | un plan court par correctif, dans `docs/conception/<module>/`, avec la section « 7 ter. EP-18 » du modèle · **validé par le coordinateur** (S, sans migration ni dépense). Tout ce qui sort de là (migration, route publique, nom de marque, identifiant d'application) remonte au chef |

## Les correctifs, dans l'ordre du chef

| Rang | N° | Ce qu'il fait | Agent | Branche | Ce qui est fixé |
|---|---|---|---|---|---|
| 1 | **M-10** | le décalage horaire de l'école n'est plus figé à 0 (`shared/dates.js:13`) : le serveur, qui a sa base de fuseaux, rend le décalage de l'école, et le site comme l'application le lisent | session 20 | `fix/qua-decalage-ecole` | aucun fuseau ni pays en dur ; un test de régression qui échoue à 23 h 30 dans un fuseau autre que UTC+0 et passe avec le correctif ; le changement d'heure légale couvert par le serveur |
| 2 | **M-1** | une liste d'appel imprimable par séance, et la séance marquée « réalisée » dans les 7 jours par la saisie après coup (réponse 7) | session 20, après M-10 | `feat/edt-feuille-appel` | sans migration ; la saisie après coup garde l'heure réelle de la saisie dans le journal |
| 3 | **M-2a** | un quiz s'imprime sans les réponses (réponse 8, première moitié) | l'agent de QJE-14a | `feat/qje-quiz-imprime` | après le plan de QJE-14a, pour ne pas écrire deux fois le Studio ; la copie saisie par l'enseignant (M, migration) est une fonction à part, plus tard |
| 4 | **M-9** | (a) brotli au serveur web du site de l'application ; (b) la bibliothèque d'animation hors du morceau commun | agent de Cursor | `fix/qua-poids-application` | le poids du premier chargement mesuré avant et après, écrit dans la PR (EP-19) ; aucun écran ne change |
| 5 | **M-12** | l'application ne porte plus le nom d'une école : le nom affiché et les textes de permission de `mobile/app.json`, et le préfixe du cache (`mobile/src/cache.js:7`) ; `scripts/verifier-neutre.mjs` lit aussi `mobile/app.json` | agent de Cursor | `fix/mob-nom-application` | **ni `slug`, ni identifiant de paquet, ni schéma d'adresse** ne changent sans le chef ; le changement de préfixe vide les copies une fois : à dire dans la fiche |
| 5 | **M-11** | les jeux ne comptent plus en MAD (`shared/simulations/catalogue/`) : une unité neutre dans les consignes et les bilans | agent de Cursor | `fix/qje-jeux-unite-neutre` | le mot est proposé dans le plan (« crédits », par exemple), le coordinateur le tranche ; aucun montant n'est réécrit |

## Périmètre

Chaque plan court dit ses fichiers ; le coordinateur vérifie qu'ils ne croisent aucune mission ouverte (ADM-02, QJE-14, BIB-06, UIX-10e, VIT-13, VIT-15). Toujours permis : le fichier du module concerné et la fiche de session. Jamais : `docs/plan/suivi.md`.

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 22 nov. | fiche écrite sur la décision du chef ; M-10 remis à la session 20 | — |
| 22 nov. 10 h 57 | M-12 : plan court relu (`11cb4122`), **validé** (questions 1 et 2 selon la proposition ; `buildingOf` sur `salle.batiment`, égal à `campus.nom`) ; deux précisions : test de `ios.bundleIdentifier`, `verifier-neutre` relancé sur le site vitrine | validé |
| 22 nov. 11 h | M-10 : serveur, site, application et tableau commités (`2cd93378`) ; parcours de régression en cours, non commité | en cours |
