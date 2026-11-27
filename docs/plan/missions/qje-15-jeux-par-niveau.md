# Mission · QJE-15 · les jeux rangés par niveau, puis par filière

| | |
|---|---|
| État | ouverte : plan **visé par le chef le 27 nov.** (cycles et classement), à amender pour la présentation des jeux (images) ; code ensuite |
| Agent | agent de Cursor (Grok 4.7 high) : il a écrit la page des dix jeux du site ; tâche bornée au plan validé |
| Modèle recommandé | Grok 4.7 high ; si le plan touche plus que le catalogue et les écrans de la bibliothèque des jeux, le coordinateur propose au chef un modèle plus fort |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. vers 19 h 20 (« site et application », « seulement ce qui existe », agents répartis) |
| Module et chantier | [QJE](../modules/QJE-quiz-jeux-ia.md) · **exception hors chantier** : le chantier QJE est fermé, et le chef a choisi de ranger aussi les jeux de l'application |
| Fonction | QJE-15 : chaque jeu du catalogue partagé reçoit un niveau (ou plusieurs) et une filière ; la bibliothèque des jeux de l'application (web et mobile) et la page des jeux du site les rangent par niveau, puis par filière · taille M |
| Branche | `feat/qje-15-jeux-par-niveau`, depuis `origin/main`, après la fusion de #217 et de VIT-10 |
| Dossier de travail | `..\travaux-planner\qje-15-jeux-par-niveau` |
| Plan de conception | plan court à écrire : `docs/conception/jeux/qje-15-jeux-par-niveau.md` · **validé par le chef** : le classement de chaque jeu est un choix de produit |

## Ce que le chef a choisi (18 nov., vers 19 h 20)

- Les jeux se rangent **par niveau** (collège, lycée, supérieur…), **puis par filière**.
- **Sur le site et dans l'application** (web et mobile), à partir du catalogue partagé.
- **Seulement ce qui existe** : un niveau ou une filière sans jeu ne s'affiche pas. Aujourd'hui, les onze jeux (le terminal et dix simulations) sont tous du supérieur, en informatique et dans les domaines voisins.

## Ce qui existe

- `shared/jeux/catalogue.js` (le terminal) et `shared/simulations/catalogue/*.js` (dix simulations) : chaque jeu a un `code`, une `discipline` (`informatique`, `cybersecurite`…), un titre et un résumé en deux langues, des défis. **Aucun niveau scolaire.**
- La bibliothèque des jeux de l'application : `frontend/src/pages/jeux/Jeux.jsx` (**367 lignes**, déjà au-delà du repère de 300) et `mobile/src/app/(onglets)/jeux.jsx` (257 lignes).
- La page des dix jeux du site : `vitrine/src/pages/[lang]/bibliotheque-des-jeux.astro` et ses textes (#217), dont le test `vitrine/tests/contenu.test.js` fige les résumés.
- Deux jeux comptent en MAD dans leurs consignes (`stock-pilot.js`, `budget-erp.js`), ce qui suppose un pays (EP-5).

## Critère de « terminé »

- Chaque jeu du catalogue porte un ou plusieurs **niveaux** et une **filière**, et un test le vérifie. Le classement de chaque jeu est celui que le chef a validé dans le plan.
- Le web, le mobile et le site rangent les jeux par niveau, puis par filière, **dans le même ordre**, et n'affichent aucun niveau ni aucune filière sans jeu.
- **Les niveaux suivent les cycles déjà décidés** (types d'établissement de VIT-05 ; cycles de VSC-01, conception C-5), et **les filières sont des domaines génériques**, pas les filières propres à une école (l'entité `Filiere` de Planner appartient à chaque école) : aucun nom d'école, aucun pays.
- `Jeux.jsx` ne grandit pas : le classement sort dans un composant à part, et le fichier repasse sous 300 lignes si le plan le prévoit. Un commentaire de rôle en tête de chaque fichier.
- **EP-18** : le rangement ne change rien aux deux façons de jouer (sur le téléphone, ou au tableau en collectif).
- Tests du catalogue, tests unitaires du web et du site, parcours des jeux (`sessionsJeu`), `verifier-neutre.mjs`, axe-core sur la bibliothèque des jeux.

## Périmètre d'écriture

- `shared/jeux/catalogue.js`, `shared/simulations/catalogue/*.js` et leurs tests : les champs de niveau et de filière ; les consignes en MAD si le chef le retient (question 3) ;
- `frontend/src/pages/jeux/Jeux.jsx`, un composant nouveau dans `frontend/src/components/jeux/`, et leurs traductions ;
- `mobile/src/app/(onglets)/jeux.jsx` et un composant nouveau dans `mobile/src/` ;
- `vitrine/src/pages/[lang]/bibliotheque-des-jeux.astro`, ses textes et `vitrine/tests/contenu.test.js` ;
- **les images des jeux** (ajout du chef du 27 nov.) : un dossier d'images par jeu que le plan amendé propose (par exemple `shared/jeux/images/`), et leur copie servie par le site si le plan le prévoit (`vitrine/public/`) ;
- le plan court, `docs/plan/modules/QJE-quiz-jeux-ia.md` et la fiche de session.

L'agent ne touche pas :
- à `docs/plan/suivi.md` ;
- au serveur (`backend/`) : le classement n'est pas enregistré en base. Si le plan en a besoin, il s'arrête et le demande au chef (migration) ;
- aux moteurs des jeux et à la validation des défis ;
- au Studio quiz ;
- à la charte des jeux (UIX-10e, qui vient après QJE-15 dans sa file).

## Questions en attente

| N° | Question | Proposition | À qui |
|---|---|---|---|
| 1 | Quels niveaux, et dans quel ordre ? | collège, lycée, supérieur, formation professionnelle : les cycles de VSC-01 et les types de VIT-05 | chef, dans le plan |
| 2 | Le classement de chacun des onze jeux (niveaux et filière) | l'agent propose un tableau jeu par jeu, avec la raison tirée des défis ; le chef le valide | chef, dans le plan |
| 3 | Les consignes en MAD de « Pilote des stocks » et « Budget ERP » | retirer la monnaie (« budget 200 ») : le calcul ne change pas ; Alexis, l'auteur des jeux, en est informé | chef |

## Prompt à donner à l'agent

```text
Ta mission suivante, après VIT-10 : QJE-15, les jeux rangés par niveau puis par filière, sur le site et dans l'application
(exception hors chantier du chef, 18 nov.). Lis la fiche docs/plan/missions/qje-15-jeux-par-niveau.md.
git worktree add "..\travaux-planner\qje-15-jeux-par-niveau" -b feat/qje-15-jeux-par-niveau origin/main (après la fusion de #217 et de VIT-10).
Écris le plan court docs/conception/jeux/qje-15-jeux-par-niveau.md : les niveaux, le tableau jeu par jeu (niveaux, filière, raison),
les écrans touchés (web, mobile, site), comment Jeux.jsx ne grandit pas, et les trois questions de la fiche. Commite-le seul ; le chef le valide.
Ni le serveur, ni les moteurs des jeux, ni suivi.md. Jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 19 h 25 | fiche écrite par le coordinateur, sur les choix du chef | — |
| 2026-11-26 14 h 25 | plan court demandé à l'agent de Cursor (VIT-10 fusionnée ; question 3 réglée par M-11) ; pas de code avant le visa du chef et la fusion de M-11, #282 et #229 | — |
| 2026-11-27 | plan révisé (`5cb58101`) relu par le coordinateur : conforme à la décision « quiz et jeux séparés ». **Visa du chef** : les quatre cycles (collège, lycée, supérieur, formation professionnelle) et le tableau des onze jeux tel quel, **avec une exigence nouvelle** : une présentation attirante, avec des images des jeux, car ce sont des jeux pour apprendre en s'amusant. Plan à amender (§ présentation), planche de rendus au chef avant le code des écrans ; le catalogue et `rangerJeux` peuvent se coder dès l'amendement commité ; le champ s'appelle `domaine` | visé, à amender |
