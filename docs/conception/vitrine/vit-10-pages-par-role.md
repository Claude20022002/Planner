# VIT-10 · pages par rôle — plan court

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) · fiche [vit-10-pages-par-role](../../plan/missions/vit-10-pages-par-role.md) (branche `doc/coordination-equipe`, jusqu'à sa fusion) |
| Branche | `feat/vit-10-pages-par-role`, depuis `origin/main` (`48d65fd8`, fusion de #214) |
| Rédigé par | agent de Cursor (Grok 4.7), le 18 novembre 2026 |
| **Validé** | en attente |

Quatre pages par rôle, un menu « Solutions » qui s'ouvre, et, si le chef l'ouvre, un pied de page en colonnes. Aucun prix, aucun nom d'école, aucune date, aucun chiffre inventé. L'anglais traduit les mêmes phrases. L'arabe reprend les clés vides (UIX-04). Aucune illustration : VIT-09 les dessine après VIT-11. Le style ajouté reste dans `EnTete.astro` et, si le chef l'ouvre, dans `PiedDePage.astro`. Pas dans `vitrine/src/styles/`. L'accueil ne change pas.

Aucun code avant que la ligne « Validé » soit remplie, et avant les réponses aux questions qui bloquent.

## 1. Ce qui existe

| Élément | Où |
|---|---|
| Trois types d'établissement, ancres `college-lycee`, `superieur`, `formation` | `vitrine/src/components/solutions/types.js` |
| Menu « Fonctions » : Emploi du temps, En classe, Quiz et jeux, Cours et annonces, Bibliothèque, Application, Pour l'établissement | `vitrine/src/i18n/langues.js`, `FONCTIONS` |
| « Solutions » est un lien, pas un menu | `vitrine/src/components/socle/EnTete.astro` |
| Pied de page : une seule liste, `NAVIGATION` | `vitrine/src/components/socle/PiedDePage.astro` |
| Familles, encore en préparation | `vitrine/src/i18n/fr/bientot.json`, carte « Familles » |
| Contact | ancre `contact` de l'accueil |
| Pas de page « À propos », pas de mentions légales, pas de tarifs | le module VIT : les textes légaux attendent le juriste |

On ne copie pas : témoignages, logos d'écoles, badges d'avis, nombre d'utilisateurs, essai gratuit, fenêtre de discussion, lien « Mon compte » (Q-11).

## 2. Les pages

Elles n'entrent pas dans le menu « Fonctions ». On y arrive par le menu « Solutions », colonne « Par rôle ».

| Page | Adresse | Clé proposée |
|---|---|---|
| Direction | `direction` | `direction` |
| Scolarité | `scolarite` | `scolarite` |
| Enseignants | `enseignants` | `enseignants` |
| Étudiants | `etudiants` | `etudiants` |

Les familles restent la carte « Familles » de « Bientôt ».

Tant que VIT-09 n'a pas dessiné, la page n'a pas de colonne visuelle vide : pas de `Presentation` sans image. La place du visuel est l'ouverture de la page, au-dessus du titre, là où VIT-09 le posera.

## 3. Le menu « Solutions »

Dans `EnTete.astro`, « Solutions » devient un `details`, lisible sans JavaScript, sur le modèle du menu « Fonctions ».

- À gauche, « Par établissement » : Collège et lycée, Enseignement supérieur, Formation professionnelle, vers `/<langue>/solutions/#college-lycee`, `#superieur`, `#formation`.
- À droite, « Par rôle » : les quatre pages.
- Échap ferme le menu. Le focus reste visible.
- En 390 px, les deux colonnes deviennent une liste.

`NAVIGATION[0]` reste `solutions`, pour le test déjà écrit.

## 4. Le pied de page

`PiedDePage.astro` est dans le socle. Le modifier demande que le chef ouvre ce fichier (question 1). S'il l'ouvre, les colonnes ne contiennent que des liens qui existent :

| Colonne | Liens |
|---|---|
| Fonctions | les sept pages de `FONCTIONS` |
| Solutions | les trois ancres |
| Par rôle | les quatre pages |
| Ressources | Sécurité et données, Bientôt, Nous contacter |

Pas de colonne « À propos » ni « Mentions » : ces pages n'existent pas. Aucun lien vide.

## 5. Questions

| N° | Question | Proposition | Réponse du chef | Bloque |
|---|---|---|---|---|
| 1 | Ouvrir `PiedDePage.astro` pour le pied en colonnes du § 4 ? | **oui** | | les colonnes |
| 2 | Une bande de chiffres sur les pages par rôle ? | **non** : aucun chiffre vrai à citer | | la bande |
| 3 | Deux boutons en tête de chaque page : « Nous contacter », et la page principale du rôle — Direction vers Pour l'établissement, Scolarité vers Emploi du temps, Enseignants vers En classe, Étudiants vers Cours et annonces ? | **oui** | | les boutons |
| 4 | Le bloc « avant → avec Planner » et une FAQ : seulement des phrases déjà publiées sur les pages de fonctions, chacune citée ici avant le code ; sinon le bloc n'est pas écrit ? | **oui**, et la page se termine par le bandeau de contact qui existe déjà (`FinDePage`) | | les phrases |

EP-18 : aucune page ne présente le téléphone ou le QR code comme le seul chemin. EP-5 : aucun outil d'État nommé seul. Les phrases du bloc « avec Planner » seront recopiées depuis les pages déjà en ligne, pas réécrites. Elles seront ajoutées à ce plan, avec leur fichier, quand la question 4 aura sa réponse, et avant le code.

## 6. Fichiers, au moment du code

| Fichier | Rôle |
|---|---|
| `vitrine/src/pages/[lang]/` | les quatre pages |
| `vitrine/src/i18n/{fr,en,ar}/` | leurs textes, et `commun.json` pour les noms du menu |
| `vitrine/src/i18n/langues.js` | les quatre clés, hors de `FONCTIONS` |
| `vitrine/src/components/socle/EnTete.astro` | le menu « Solutions » |
| `vitrine/src/components/socle/PiedDePage.astro` | seulement si la question 1 est oui |
| `vitrine/tests/` | le menu et l'absence de prix |
| fiche de session, ligne du module VIT | à la fin. `suivi.md` n'est pas modifié |

## 7. Contrôles, au moment du code

Build, tests unitaires de `vitrine`, `node scripts/verifier-neutre.mjs`, pas de défilement horizontal en 390, 768 et 1440 px, axe-core et Lighthouse sur chaque page nouvelle, mouvement réduit. VIT-11 ajoutera son lien plus tard : ce plan ne le réserve pas dans le menu.
