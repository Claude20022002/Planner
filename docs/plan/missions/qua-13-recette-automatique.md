# Mission · QUA-13 · des profils de recette automatiques qui jouent chaque parcours complet

| | |
|---|---|
| État | ouverte : plan à écrire **après l'étude des parcours par rôle** et la construction de ses manques bloquants |
| Agent | à fixer avec le chef (voir la question 1) ; proposition : **Codex**, qui aura écrit l'étude des parcours et connaîtra chaque manque |
| Modèle recommandé | le plus capable : la recette touche toute l'application, la base neuve et la CI |
| Attribuée le | 2026-11-28, par le coordinateur ; demande du chef du 28 nov. |
| Module et chantier | [QUA](../modules/QUA-qualite-docs.md) · **hors chantier**, sur la demande du chef ; dépend de PLA-03 (base neuve) |
| Fonction | QUA-13 : des « profils de recette » automatiques (administrateur, responsable de filière, enseignant permanent, vacataire, étudiant web, étudiant mobile) jouent chacun son parcours complet sur une base neuve, et produisent un rapport complet avec captures · taille L, en lots |
| Branche | `test/qua-13-recette-automatique`, depuis `origin/main` |
| Plan de conception | à écrire : `docs/conception/qualite/qua-13-recette-automatique.md` · **validé par le chef** (étendue, rapport, fréquence) |

## Ce que le chef a demandé (28 nov.)

1. Codex dit, à la fin de l'étude des parcours par rôle, **ce qui manque pour le parcours de chaque utilisateur**.
2. On **construit** ces manques (une fonction par manque, rangée dans le plan).
3. Puis on crée des **profils automatiques de testeurs** qui suivent les **parcours d'utilisation complets**, pour vérifier que **toutes les actions fonctionnent**.
4. Ils produisent un **rapport complet, avec captures d'écran** : de **la création d'un compte administrateur**, à **la mise en place de l'établissement**, jusqu'à **l'usage des différentes entités**.

## Ce qui existe

- 37 parcours Playwright dans `frontend/tests/parcours/` (« parcours de démonstration » de la CI), sur une base préparée (`donnees*.mjs`), chacun sur une tâche.
- La base neuve sans données d'école (PLA-03a, #173) ; PLA-03b (schéma de départ) conçue, pas finie.
- L'étude des parcours par rôle (Codex, en cours) : pour chaque rôle, chaque étape existe, manque, est cassée ou masquée, avec sa preuve et la couverture des parcours actuels.

## Ce que le plan doit établir

- **Le scénario de bout en bout**, à partir d'une base **neuve** :
  - le premier compte administrateur (comment il naît aujourd'hui, et ce qui manque si rien ne le permet depuis l'écran) ;
  - la mise en place de l'établissement : identité, année et périodes, campus et salles, filières et groupes, matières, enseignants (permanents, vacataires), étudiants (import), configuration (ADM-02) ;
  - la génération et la publication de l'emploi du temps ;
  - puis l'usage, rôle par rôle : appel, cours, quiz, jeux pédagogiques, annonces, compte, mot de passe, application mobile.
- **Les profils** : un par rôle de l'étude, chacun avec des données fictives cohérentes et neutres (aucun nom réel, aucune école réelle).
- **Le rapport** : une page par profil, une ligne par étape (action, résultat attendu, résultat obtenu, « réussi » ou « échoue »), une capture par étape, la durée, les erreurs de la console et du réseau ; une synthèse en tête. Format proposé : HTML lisible hors ligne et Markdown, **hors du dépôt** (artefact de la CI et dossier local), car les captures pèsent.
- **Où et quand** : en local à la demande, et dans la CI (à chaque PR, ou chaque nuit, au choix du chef).
- **Le lien avec l'étude** : chaque étape « manque » ou « cassée » de l'étude devient soit une fonction à construire, soit une étape marquée « attendue » dans la recette, qui échoue tant qu'elle n'est pas construite.

## Questions pour le chef (à reprendre dans le plan)

| N° | Question | Proposition |
|---|---|---|
| 1 | Qui écrit la recette ? | Codex (il connaît l'étude) ; un agent Claude relit |
| 2 | « Profils automatiques » : des scripts rejoués à l'identique, ou des agents d'IA qui explorent l'application ? | les deux, dans cet ordre : d'abord des scripts Playwright, fiables et rejouables dans la CI ; ensuite, en option, un passage d'exploration par un agent d'IA sur une liste de contrôle, dont le rapport s'ajoute au premier |
| 3 | À quelle fréquence la recette complète tourne-t-elle ? | chaque nuit sur `main`, et à la demande ; les parcours courts actuels restent dans chaque PR |
| 4 | Le rapport se publie-t-il quelque part ? | non : artefact de la CI et dossier local, jamais dans le dépôt public |

## Critère de « terminé » (par lot)

- Un profil joue son parcours complet sur une base neuve, sans intervention.
- Chaque étape a sa capture et son verdict ; le rapport se lit sans outil.
- Les données sont fictives ; `verifier-neutre` passe.
- Le parcours échoue quand une action casse (montré une fois sur une version fautive).

## Périmètre d'écriture

`frontend/tests/recette/` (nouveau), ses données fictives, un script de lancement, le flux de CI de la recette (au visa du chef), le plan, le fichier du module QUA, la fiche de session. Ne touche pas le code de l'application : un manque trouvé devient une fonction à part.

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-28 | fiche écrite sur la demande du chef ; attend la fin de l'étude des parcours par rôle et la construction de ses manques bloquants | — |
