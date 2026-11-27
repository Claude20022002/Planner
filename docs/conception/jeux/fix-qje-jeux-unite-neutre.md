# M-11 · Les jeux ne comptent plus en dirhams — plan court

| | |
|---|---|
| Module | [QJE](../../plan/modules/QJE-quiz-jeux-ia.md) · correctif hors chantier (étude EP-18, M-11) |
| Mission | `docs/plan/missions/ep18-correctifs.md` (branche `doc/coordination-equipe`) |
| Branche | `fix/qje-jeux-unite-neutre`, depuis `origin/main` (`b57753e9`) |
| Rédigé par | agent de Cursor (Grok 4.7), le 22 novembre 2026 |
| **Validé** | par le coordinateur le 22 novembre 2026 (S, sans migration) |

## 1. Objet et critère de « terminé »

Les consignes et les bilans de deux jeux ne nomment plus une devise. Le mot affiché devient une unité neutre. Aucun montant n'est réécrit : les chiffres des phrases et les nombres des défis (`budget`, `prix`, `fixe`, `unite`, quantités) restent ceux d'aujourd'hui.

Terminé quand un test de régression échoue si l'on remet `MAD` dans ces trois fichiers, et que les montants cités ci-dessous y sont encore.

## 2. Ce qui existe

Le score du jeu s'appelle déjà « points » (`shared/simulations/i18n.js`, `progression`, `sauvegarde`). Le stock se compte déjà en « unités ». Seul l'argent du défi est en `MAD`.

| Endroit | Aujourd'hui |
|---|---|
| `shared/simulations/catalogue/stock-pilot.js` | le résumé (l. 7) et trois consignes (l. 15, 23, 31) disent `MAD`. Montants écrits : 100, 120, 108. Les défis portent `budget: 100`, `120`, `108`. |
| `shared/simulations/catalogue/budget-erp.js` | trois consignes (l. 15, 28, 41) et un indice (l. 29) disent `MAD`. Montants écrits : 200, 150, 45, 165. Les défis portent les mêmes `budget`. Le résumé de ce jeu ne dit pas `MAD`. |
| `shared/simulations/i18n.js` | les bilans et les messages d'écart, en français (l. 31, 34, 55, 62, 75) et en anglais (l. 112, 115, 136, 143, 156) : `{{prix}} MAD`, `{{cout}} MAD`, `{{budget}} MAD`, `{{budgetMax}} MAD`, `{{max}} MAD`. |
| Ailleurs | `MAD` reste dans les études, les comptes rendus et les tests de la vitrine, qui interdisent déjà une devise sur le site public. Aucun test de jeu n'attend le mot `MAD`. |

## 3. Questions

| N° | Question | Proposition | Réponse | Bloque |
|---|---|---|---|---|
| 1 | Quel mot à la place de `MAD` ? | **crédits** en français, **credits** en anglais. Le score reste « points » et le stock reste « unités », donc les trois ne se confondent pas. Exemple : « 100 crédits d'achats », « Budget 200 crédits », « {{cout}} crédits ». | **crédits** / **credits** (coordinateur, 22 nov.) | oui |

## 4. Solution

Après l'accord : remplacer le mot, rien d'autre.

- Français : `MAD` devient `crédits` (et « budget en MAD » devient « budget en crédits »).
- Anglais : `MAD` devient `credits` (et « a MAD budget » devient « a credit budget », « the {{max}} MAD budget » devient « the {{max}} credit budget »).
- Chaque chiffre collé à `MAD` reste à sa place : 100, 120, 108, 200, 150, 45, 165, et les 10, 12, 70, 50, 45 des autres contraintes écrites dans la même phrase.
- Les objets `demandes`, `budget`, `prix`, `fixe`, `unite` ne sont pas édités.

## 5. Fichiers

| Fichier | Créé / modifié | Rôle |
|---|---|---|
| `docs/conception/jeux/fix-qje-jeux-unite-neutre.md` | créé | ce plan |
| `shared/simulations/catalogue/stock-pilot.js` | modifié | le mot, dans le résumé et les consignes |
| `shared/simulations/catalogue/budget-erp.js` | modifié | le mot, dans les consignes et l'indice |
| `shared/simulations/i18n.js` | modifié | le mot, dans les bilans et les écarts, français et anglais |
| `mobile/__tests__/unite-neutre.test.js` | créé | tout `shared/simulations/` refuse `MAD`, « dirham », « € », « $ » et « euro » ; les montants des trois fichiers y sont encore |
| `docs/plan/modules/QJE-quiz-jeux-ia.md` | modifié | une ligne, à la fin du code |
| fiche de session | créé | à la fin du code |

Pas de `docs/plan/suivi.md`.

## 6. Données et migration

Aucune table. Aucune clé de traduction n'est renommée.

## 7 ter. EP-18 : tous les contextes

| Contexte | Ce que fait la fonction | Preuve ou test |
|---|---|---|
| **A. Au moins un élève sans téléphone ni ordinateur** | Le mot ne change pas le chemin. Le jeu se joue sur l'ordinateur de la salle, projeté, ou en binôme (les règles le disent déjà). L'élève sans appareil regarde la projection ou suit le binôme. | hors de ce correctif : les règles existent |
| **B. Connexion lente ou coupée** | Les phrases sont dans l'application, pas téléchargées. Remplacer un mot ne change pas le poids de l'écran. | le test lit les sources |
| **C. Ce qu'a l'école : ordinateur et projecteur (C1), ou rien dans la salle (C2)** | En C1, la consigne projetée ne nomme plus une devise. En C2, rien de nouveau à imprimer : le jeu attend un écran, comme aujourd'hui. | le test refuse `MAD` |

Aucun pays supposé : `MAD` sort des consignes et des bilans. Aucun fuseau, aucun férié, aucun format de téléphone.

## 8. Tests

- `mobile/__tests__/unite-neutre.test.js` parcourt tout `shared/simulations/` (précision du coordinateur à la validation). Il échoue si `MAD`, « dirham », « € », « $ » ou « euro » y reparaît. Un `$` de gabarit `${…}` et l'ancre de fin d'une expression régulière `/…$/` ne comptent pas : ce ne sont pas des devises. Il échoue si l'un des montants 100, 120, 108, 200, 150, 45, 165 a disparu de la phrase qui le citait.
- Les tests de jeu déjà là (`mobile/__tests__/simulations.test.js`, `backend/tests`) ne sont pas réécrits : ils ne cherchent pas `MAD`.

## 9. Étapes de livraison

1. Ce plan, commité seul. Attente de la validation.
2. Le mot, le test, la ligne du module, la fiche. Rien n'est poussé.

## 10. Risques et retour arrière

Un élève qui a appris le défi avec « MAD » voit « crédits » au prochain chargement. Les calculs ne bougent pas. Revenir au commit d'avant rend le mot `MAD`.

## 11. Hors périmètre

- Les études, les comptes rendus, le kit vidéo et les décisions de prix : ils parlent de vrais tarifs, pas d'un défi.
- Les tests de la vitrine, qui interdisent déjà une devise sur les pages publiques.
- Le score (« points ») et les quantités de stock (« unités »).
- Les autres jeux du catalogue : ils ne disent pas `MAD`.
- M-9 (poids de l'application).
