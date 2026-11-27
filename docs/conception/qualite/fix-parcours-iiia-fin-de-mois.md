# Correctif · le parcours IIIA en fin de mois · `fix/parcours-iiia-fin-de-mois`

| | |
|---|---|
| Module | QUA · correctif de test, sans chantier |
| Taille | S |
| Rédigé par | le coordinateur (Claude Code, Opus 5.5), le 2026-11-27, à la demande du chef |
| **Validé** | par le chef le 27 nov. (« corrige le test toi-même ») |

## Le symptôme

Le 27 nov. à 14 h 52, le poste « Parcours de démonstration » de #287 (documentation seule) échoue : `iiia.spec.cjs:96`, « 4A voit Théorie des langages et compilation », élément introuvable (deux essais). La veille, le même parcours passait sur `main`.

## La cause

`donneesIiia.mjs` fait commencer le semestre d'essai le premier lundi après demain. Le 26 et le 27 nov., ce lundi est le 30 nov. : la première semaine de cours va **du lundi 30 novembre au samedi 5 décembre** et chevauche deux mois. Le parcours ne publie et n'ouvre que le mois du lundi (novembre). L'étudiant n'y voit donc que les séances du lundi 30. Si le solveur place le module attendu un autre jour, le test échoue ; s'il le place le lundi, il passe. Le parcours est donc instable chaque fois que la première semaine finit dans le mois suivant. L'application fait ce qu'elle doit.

## La correction (test seul)

Dans `frontend/tests/parcours/iiia.spec.cjs` :

1. publier **chaque mois** que la semaine touche (un ou deux) ;
2. ouvrir, pour chaque profil, le mois de **la première séance du module attendu**, lu dans les séances déjà relevées par le test (`seances3a`, `seances4a`), au lieu du mois du lundi.

Le contrôle « ne voit pas l'autre promotion » reste sur le mois ouvert. Publier un mois sans séance est permis (le service le compte « vide »). Aucun fichier de l'application ne change.

## Vérification

- Le parcours de la PR tourne **aujourd'hui**, dans la fenêtre qui fait échouer l'ancien test : il doit passer.
- Le passage relancé de #287 (ancien test) sert de témoin.
- Revenir en arrière : rétablir les deux lignes d'origine.
