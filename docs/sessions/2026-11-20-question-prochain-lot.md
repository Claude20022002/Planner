# Session du 2026-11-20 · question au chef · `doc/question-prochain-lot`

<!-- Fiche obligatoire, même sans code (modèle : docs/plan/modeles/fiche-de-session.md).
     Cette session ne livre aucun code : elle porte l'inventaire des chantiers et la question Q-30. -->

| | |
|---|---|
| Fait par | Claude (VS Code) |
| Chantier | hors chantier : question au chef, aucun code |
| Dossier de travail | le dépôt lui-même |
| Dernier commit | `2c3abada` (STA-01, PR #230) |

## Objectif de la session

Le chef a demandé le 20 novembre l'inventaire des chantiers restants pour en attaquer un autre. Le premier choix, **COU-06** (export des notes d'un devoir), s'est révélé masqué en production : les devoirs sont fermés. Le chef a alors demandé de poser la question ici plutôt que de choisir à sa place.

Cette fiche ne code rien. La règle « aucun code sans plan validé par le chef » reste entière.

## Fait

- Inventaire des chantiers ouverts et des lots « libre » prenables hors chantier, recoupé avec le code de `main` (`736a8f7e`).
- Constat du blocage de COU-06 : les devoirs sont éteints par un interrupteur, côté site comme côté serveur.
- Trois lignes de `suivi.md` recoupées comme périmées (RHP-01, EDT-02) ou à requalifier (COU-02). `suivi.md` n'est pas modifié ici : il appartient au coordinateur.
- Aucun code, aucune migration, `main` intacte.

## Vérifié

| Fait | Preuve |
|---|---|
| Les devoirs sont fermés par défaut | `shared/fonctions.js` : `export const DEVOIRS_ACTIFS = false;` ; `backend/.env.example` : `DEVOIRS_ACTIFS=false` |
| Toutes les routes de devoirs répondent 503 | `backend/routes/devoirRoutes.js` : `router.use(exigerDevoirsActifs)` après `/quiz-disponibles` ; `backend/services/quiz/devoirsActifs.js` n'ouvre que sur la valeur `"true"` |
| Les tests, eux, rouvrent la fonction | `backend/tests/integration/setupEnv.js` : `DEVOIRS_ACTIFS: "true"` — le code serait donc testé, mais invisible pour l'école |
| RHP-01 est fait | `GET /api/suivi/vacataires.csv` (`backend/routes/suiviRoutes.js`), `exportVacataires` (`backend/services/planning/suivi.js`), test d'intégration `backend/tests/integration/suivi.test.js` |
| EDT-02 est fait | `backend/services/planning/ramadan.js`, `appliquerRamadan` appelée par `affectationRules.js`, variante `ramadan` de la grille, tests `imprevus.test.js` § « Grille du Ramadan » |
| COU-02 est à requalifier | les devoirs « fichier » ont été retirés le 10 octobre 2026 (en-tête de `backend/routes/devoirRoutes.js`) : il ne reste que le rendu d'un quiz |
| STA-01 attend la relecture | PR #230, six contrôles verts, `mergeStateStatus: CLEAN` |

## Questions

| N° | Question | Proposition | Bloque |
|---|---|---|---|
| Q-30 | Quel lot je prends maintenant ? | un des cinq candidats ci-dessous ; à défaut, **EDT-04** | tout le travail de la prochaine session |

### Les candidats

| Lot | Ce que c'est | Taille | Visible tout de suite | Ce qu'il faut trancher avant |
|---|---|---|---|---|
| **EDT-04** | Publication de l'emploi du temps, PDF et courriels selon l'école | M | oui | la forme du PDF (une page par groupe, par enseignant, les deux ?) ; qui publie (l'administration, décision du 21 octobre) ; quels courriels, sachant que le service d'envoi commun (COM-01) n'existe pas encore |
| **VIT-04** | Page d'état du service et journal des nouveautés de chaque version | S | oui | d'où vient l'état (une sonde, ou la supervision d'EXP-05 ?) ; où s'écrit le journal des versions |
| **COU-06** | Export des notes d'un devoir (le choix initial) | S | **non** : 503 tant que les devoirs sont fermés | rien à trancher ; le code resterait dormant jusqu'au rallumage |
| **QUA-01** | `README.md` et `PRODUCT.md` à jour | M | oui (documentation) | rien |
| **Rejoindre un chantier ouvert** | EXP-04 (sauvegardes), PLA-04 (tests d'isolation des routes), MOT-04 (modèle neutre) | M | oui | la fiche de mission, que le coordinateur attribue |

Écartés sans une décision du chef : QJE-02 et QJE-03 (chantier QJE fermé le 18 novembre), BIB-03 (aucun stockage de fichiers configuré : ni S3 ni MinIO), les lots de l'agence MKT.

## État laissé

- Pour `suivi.md` (le coordinateur le reporte) : STA-01 → PR ouverte (#230) ; COU-06 → à faire, bloqué par `DEVOIRS_ACTIFS` ; RHP-01 et EDT-02 → **fait** ; COU-02 → à requalifier.
- Chantiers : 3 ouverts sur 3 (EXP, PLA, MOT) ; aucun quatrième ouvert.

## Reste à faire, dans l'ordre

1. Le chef répond Q-30 (dans cette PR).
2. Couper la branche du lot retenu depuis `origin/main`.
3. Lire le module et sa conception, poser les questions, écrire le plan, le faire valider.
4. Coder seulement après la validation du plan.

## Prompt de reprise

```text
Tu reprends la suite du travail sur Planner, après la PR #230 (STA-01, en relecture).
Lis AGENTS.md, docs/plan/README.md, docs/plan/suivi.md, docs/plan/decisions.md
et cette fiche (docs/sessions/2026-11-20-question-prochain-lot.md).
Question en attente : Q-30 — quel lot prendre (EDT-04 proposé) ; la réponse du chef est dans la PR.
Constats utiles : les devoirs sont fermés en production (DEVOIRS_ACTIFS), donc COU-06 est dormant ;
RHP-01 et EDT-02 sont faits malgré la ligne « à faire » de suivi.md.
Règles : une tâche, une branche coupée de origin/main ; pas de code avant le plan validé ;
questions avant toute supposition ; suivi.md non modifié (il appartient au coordinateur).
```
