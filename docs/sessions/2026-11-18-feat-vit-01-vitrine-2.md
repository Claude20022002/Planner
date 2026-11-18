# Session du 2026-11-18 (2) · VIT-01 et VIT-05 (préparation) · `feat/vit-01-vitrine`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), dans VS Code, intégrateur du site vitrine |
| Chantier | VIT (mission d'équipe [vit-equipe](../plan/missions/vit-equipe.md), sur la branche `doc/coordination-equipe`) |
| Dossier de travail | `..\travaux-planner\vit-01-vitrine` |
| Dernier commit | voir `git log -1` (commit de cette fiche) ; travail : `55f5ab06` (pages de fonctions) |
| Fiche précédente | [2026-11-18-feat-vit-01-vitrine.md](2026-11-18-feat-vit-01-vitrine.md) |

## Objectif de la session

Reprendre l'intégration. Au tour d'état, rien n'avait bougé : pas de branche `feat/vit-01-vitrine-pages`, pas de consigne de lot pour l'agent de Cursor, qui n'avait pas encore pris son message de départ d'UIX-06b (`cursor\entree\2026-11-18-0050-uix-06b-depart-r0.md`), pas de SVG, aucune relecture sur la PR #195. Le chef a confié le lot de pages à l'intégrateur.

## Plan

[docs/conception/vitrine/vit-vitrine.md](../conception/vitrine/vit-vitrine.md), validé par le chef le 18 nov., sur la branche `doc/coordination-equipe`.

## Décisions du chef pendant la session (18 nov.)

À inscrire par le coordinateur dans `decisions.md` et dans la fiche de mission (tableau « Les propriétaires ») :

1. **Le lot « pages de fonctions » passe à Claude (VS Code)** sur `feat/vit-01-vitrine`. L'agent de Cursor reste sur UIX-06b ; sa branche `feat/vit-01-vitrine-pages` n'est plus attendue.
2. **Écarts 2 à 6** de la fiche précédente : **tous acceptés**.
3. **Failles d'audit des outils de construction de `vitrine/`** (11 hautes, picomatch, aucune dans le site publié) : acceptées tant que le site n'est que construit ; audit à refaire avant toute mise en ligne.
4. **Loi 09-08** : rien sur la page Sécurité tant que Q-23 n'est pas tranchée.
5. **Aucun envoi caché (EP-13)** : carte marquée « Bientôt » tant que la PR #189 (QUA-09) n'est pas fusionnée.
6. **IA** : la phrase reste, précisée par « quand l'école active l'IA », sur l'accueil comme sur la page Sécurité (aucun fournisseur choisi en production).
7. **Page Bientôt** : les fonctions « prévues » du plan de parité (PR #193), groupées par domaine, sans date ; ni ce qui est écarté (biométrie, comptabilité et paie), ni ce qui est soumis à condition (tuteur IA, santé).

## Fait

- `55f5ab06` · **Cinq pages de fonctions**, en fr, en et ar (arabe vide, qui prend le français) :
  - **Emploi du temps** : le calcul (semaine dessinée de l'accueil), les refus expliqués, puis six cartes : versions, publication, reports suivis, PDF, abonnement d'agenda, courriel ;
  - **En classe** : appel par QR code, quiz (les deux écrans de téléphone de l'accueil), puis jeux, sondages, compte unique ;
  - **Pour l'établissement** : statistiques (nouvelle illustration), puis salles et réservations, examens, plusieurs campus, import CSV, comptes et rôles, identité de l'école ;
  - **Sécurité et données** : double authentification, accès par rôle, journal de sécurité, agenda privé, comptes désactivés puis anonymisés, IA ; « Ce site ne vous suit pas » (aucun cookie, aucune mesure d'audience, rien d'un autre site) ; « Bientôt » : la liste des envois sortants ;
  - **Bientôt** : 14 cartes en deux grilles.
- Composants `components/fonctions/` : `EnTetePage`, `Presentation`, `GrilleCartes`, `CarteAvis`, `IllustrationStatistiques`, `FinDePage` (de 25 à 70 lignes ; pages de 27 à 37 lignes). Texte de fin de page dans `commun.json`.
- Accueil : phrase de l'IA précisée (décision 6).
- Commit de fin : cette fiche, ligne VIT-01 de `suivi.md`, « Ce qui existe » du module VIT, `vitrine/README.md`.

**Chaque affirmation a été vérifiée dans le code** avant d'être écrite : TOTP obligatoire pour l'administration (`services/mfa.js`), codes de secours, liste des événements du journal (`services/journalSecurite.js`), rôles `admin`, `enseignant` et `etudiant`, désactivation puis anonymisation (`services/desactivation/`), abonnement ICS renouvelable (`AbonnementAgenda.jsx`), onglet « Versions » de la génération, export PDF, import CSV sur cinq pages, identité de l'école (nom, logo, couleurs), sondage EC-9, jeu du terminal. **Retiré** parce que non vrai dans l'interface : « se déconnecter de tous ses appareils » (la route `/api/auth/logout-all` existe, mais aucun écran ne l'appelle).

## Vérifié

- `npm run test:unit` : **33/33** (même forme des dictionnaires dans les trois langues pour les sept pages).
- `npm run build` : **19 pages** (accueil et cinq pages, en trois langues, plus la racine), sans erreur.
- **Liens** : 413 liens internes dans les 19 pages, tous vers une page construite ; ancres présentes ; aucun lien externe.
- `node scripts/verifier-neutre.mjs` : passe.
- **axe-core 4.14.0** (WCAG 2.1 A et AA, bonnes pratiques) : aucune violation sur les **18 pages** (6 pages × 3 langues), en 390, 768 et 1440 px ; aucun défilement horizontal.
- **Mouvement réduit** : aucune animation, aucun contenu masqué, sur les 18 pages.
- **Aucune requête vers un autre site.**
- **Lighthouse 13.6.0** (mobile simulé / ordinateur) : accueil 97 / 100 en performance, 100 ailleurs ; Emploi du temps 96 / 100, 100 ailleurs ; Sécurité (en) 100 partout. Les scores varient d'un passage à l'autre sur cette machine : au premier passage, le temps de blocage de l'accueil valait 580 ms. **LCP de 2,1 s** sur Emploi du temps en mobile simulé : juste au-dessus de la cible EP-17 (2 s), à reprendre aux contrôles finaux.
- Captures regardées : Emploi du temps et Sécurité à 1440 px, Pour l'établissement à 390 px, En classe en arabe (sens droite à gauche bien retourné ; le français de secours y place les points à gauche, comme sur l'accueil).
- Outils (Playwright du `frontend/` du dépôt principal, axe-core, Lighthouse) lancés hors du dépôt. **Non lancé** : la CI GitHub de `vitrine.yml` sur ce commit (rien n'est poussé).

## Écarts avec le plan

1. **Le lot de pages est fait par l'intégrateur**, et non par l'agent de Cursor (décision 1 du chef). Pas de branche à part, donc pas de contrôle de fichiers à l'intégration.
2. **Page Sécurité** : sans la loi 09-08 (décision 4), et EP-13 marquée « Bientôt » (décision 5), alors que le plan (§ 3) les cite.
3. **Visuels** : illustrations dessinées, comme sur l'accueil (écart 1 de la fiche précédente, tranché par le chef). Une illustration nouvelle : statistiques.
4. **Contact** : pas de page à part ; chaque page finit par un lien vers la section contact de l'accueil (le plan prévoit « section seulement », VIT-02 attend).

## Questions

| N° | Question | Proposition | À qui | État |
|---|---|---|---|---|
| 1 | Adresses de contact (courriel, WhatsApp) | attendre VIT-02 et Q-11 | chef | en attente |
| 2 | SVG officiels des logos | les mettre dans `boites\ressources\` ; ils remplaceront `public/logo/` et les jetons | chef | en attente |
| 3 | LCP de 2,1 s sur Emploi du temps en mobile simulé : corriger avant la fusion, ou aux contrôles finaux ? | aux contrôles finaux, en mesurant plusieurs passages (l'image principale est la semaine dessinée) | coordinateur | en attente |

## État laissé

- `docs/plan/suivi.md` : VIT-01 → en cours, R0, accueil et cinq pages dans la PR #195 ; ligne VIT-05 non touchée.
- Aucun message laissé dans la boîte de l'agent de Cursor. Le coordinateur doit savoir que le lot de pages n'est plus à lancer.

## Reste à faire, dans l'ordre

1. Le coordinateur relit la PR #195 (R0, accueil, pages) et inscrit les décisions de cette fiche dans `decisions.md` et la fiche de mission.
2. Remplacer les logos et les jetons par les SVG du chef dès qu'ils arrivent.
3. Contrôles finaux : LCP d'Emploi du temps (question 3), puis tests, build, liens, axe, Lighthouse, 390, 768 et 1440 px ; fiche ; commandes au chef.
4. Plus tard : l'arabe (après UIX-04) ; captures réelles une fois l'application au nouveau style ; la loi 09-08 quand Q-23 sera tranchée ; la carte EP-13 à passer en « disponible » à la fusion de #189 ; le formulaire de contact (VIT-02).

## Commandes pour le chef de projet

La PR #195 est déjà ouverte. Pour y ajouter les commits de cette session :

```powershell
git -C "..\travaux-planner\vit-01-vitrine" push
```

Ne pas fusionner la PR #195 avant la relecture du coordinateur.

## Prompt de reprise

```text
Tu reprends l'intégration du site vitrine de Planner (VIT-01, VIT-05 en préparation), chantier VIT,
mission d'équipe vit-equipe, sur la branche feat/vit-01-vitrine, dossier ..\travaux-planner\vit-01-vitrine.
Lis d'abord AGENTS.md, docs/plan/equipe.md, puis, dans ..\travaux-planner\coordination-equipe
(branche doc/coordination-equipe), docs/plan/missions/vit-equipe.md et docs/conception/vitrine/vit-vitrine.md
(plan validé par le chef le 18 nov.), puis la fiche docs/sessions/2026-11-18-feat-vit-01-vitrine-2.md
et vitrine/README.md.
Fait : R0 (17251fc5), accueil en huit sections (c0198c75), cinq pages de fonctions en fr, en et ar
(55f5ab06 : Emploi du temps, En classe, Pour l'établissement, Sécurité et données, Bientôt).
Le chef a confié le lot de pages à l'intégrateur le 18 nov. (l'agent de Cursor reste sur UIX-06b),
accepté les écarts 2 à 6 et les failles d'audit des outils de build tant que rien n'est en ligne,
et décidé : rien sur la loi 09-08 (Q-23), EP-13 « Bientôt » jusqu'à #189, IA « quand l'école l'active ».
Vérifié : tests 33/33, 19 pages construites, 413 liens valides, axe sans violation sur 18 pages
en 390, 768 et 1440 px, mouvement réduit respecté, aucune requête externe, Lighthouse au-dessus de 90 ;
LCP de 2,1 s sur Emploi du temps en mobile simulé (cible 2 s).
Reste : relecture du coordinateur (PR #195) ; SVG officiels des logos ; contrôles finaux (LCP compris).
Questions en attente : adresses de contact (chef) ; SVG des logos (chef) ; moment de la correction du LCP (coordinateur).
Règles : pas de code hors du plan validé ; questions avant toute supposition ; on ne promet que ce qui
existe, vérifié dans le code ; rien mis en ligne ; aucune animation si le mouvement réduit est demandé ;
fiche de session et suivi.md à jour en fin de session ; jamais de git push.
```
