# Session du 2026-11-21 · coordination · `doc/coordination-equipe` (7)

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), coordinateur désigné par le chef |
| Chantier | transversal (coordination) ; site vitrine (VIT) surtout |
| Dossier de travail | `..\travaux-planner\coordination-equipe` |
| Dernier commit | voir `git log -1` (cette fiche) |

## Objectif

Reprendre la coordination après la session du 19 nov. (6) : tour d'état, boîtes comprises ; relire tout ce qui a été rendu depuis le 19 nov. à 0 h 30 ; reporter l'état dans `suivi.md` ; tenir les files et l'ordre des fusions du site ; dire au chef où en sont les douze conditions.

Aucune autre session de coordination ne tournait. Les deux autres sessions ouvertes ont répondu : Claude de VS Code (UIX-10b) et la session de l'expertise (VIT-18 rendue, puis une expertise de go4school.net demandée par le chef).

## Tour d'état (21 nov., 0 h)

**Fusionnées depuis le 19 nov. à 0 h 30** : #224 (VIT-14), #225 (expertise), #216 (déjà notée).

| PR ou branche | Rendu | Verdict |
|---|---|---|
| #222 VIT-09a | conflit résolu, CI verte | **prête** |
| #226 VIT-10b | C8 codé (`5a43ba5f`, `ff08fffd`, locaux) ; 73 tests | **prête** (le chef pousse les deux commits) |
| #228 VIT-18 | plan validé phrase par phrase, code, test de garde, 78 tests, axe-core | **prête** ; écart accepté (une phrase exemptée, plus strict) |
| #232 VIT-08 (rendu) | deux phrases refaites, vidéos et empreinte, test | **prête après #228**, avec le retrait de l'exception de `contenu.test.js` |
| #233 VIT-14b | complément validé case par case, deux critères, 89 tests, axe-core | **prête** |
| #221 VIT-06 | CI entièrement verte, conflit résolu, douze conditions ; `7c8aac7d` local | **prête** ; fusion décidée par le chef, journaux en VIT-06b |
| #227 VIT-09b | plan validé par le chef (brouillon) | code en dernier |
| `fix/vit-17-correctifs-vitrine` (local) | plan et code **non commités**, arrêtés le 19 nov. à 8 h 10 ; « Validé » écrit par l'agent sans validation | plan **validé par le coordinateur** avec corrections |
| #223 VIT-12, `feat/vit-16-contact-a-propos` | rien de neuf | attendent les valeurs du chef |
| #229 (Alexis) | noms accessibles des boutons du catalogue | plan validé après coup ; **à corriger** (CI rouge, `sessionsJeu.spec.cjs` l. 49) |
| #230 (Alexis, Qoder) | STA-01, plan et code ensemble, migration 0083, route publique, MAD par défaut | **au chef** : garder ouverte, plan à valider |
| #231 (Alexis) | question sur le prochain lot | au chef |
| `feat/uix-10b-web-charte` (local) | plan validé par le chef le 21 nov. | en cours |
| étude EP-18 | ouverte par le chef, travail local | en cours |

Simulation des fusions dans l'ordre retenu : un seul fichier en conflit, une ligne de `docs/plan/modules/VIT-site-vitrine.md`, à #228 et à #221. Aucun conflit de code entre les branches du site.

**Hors du site, inchangé depuis le 19 nov.** : #215 (VSC-01) attend l'avis des groupes A et B ; MOT n'est pas fini (`feat/mot-13-coupure-fine` jamais poussée depuis le 15 nov., MOT-13c avec ADM-02, mesure collège de MOT-02 chez Codex, MOT-04) ; `feat/pla-03b-schema-depart` garde dix fichiers non commités depuis le 15 nov. ; DOC-03 attend les arbitrages 2 à 4.

## Décisions

- **Chef** (outil de questions) : #221 fusionnée maintenant, VIT-06b pour les journaux ; bouton « Lire la vidéo » sans poids ; #230 gardée ouverte, plan au chef ; l'étude EP-18 est ouverte.
- **Coordinateur** : plan de VIT-17 validé avec corrections ; `cheminsLangues()` sur les pages de #223 ; écart de VIT-18 accepté et #232 juste après ; ordre des fusions révisé ; plan de #229 validé après coup ; migration 0083 réservée pour STA-01. Tout est dans `docs/plan/decisions.md` (21 nov.).

## Fait

- `git merge origin/main` (sans conflit).
- `suivi.md` à l'état réel (missions, fonctions VIT, UIX-10, STA-01, migration 0083, PR fusionnées) ; `feuille-de-route.md` (ordre des fusions, files) ; `decisions.md` ; fiches de mission VIT-06, VIT-09, VIT-10b, VIT-14, VIT-17, VIT-18, expertise (close), EP-18.
- Boîtes : consigne à Codex (`2026-11-21-0035-vit-06-fusion-puis-vit-11`), consigne à l'agent de Cursor (`2026-11-21-0035-vit-17-plan-valide`) ; trois rapports rangés dans `sortie\traites\`.

## Les douze conditions de la mise en ligne

| N° | Condition | État au 21 nov. | Ce qui bloque |
|---|---|---|---|
| 1 | audit de `vitrine/` et montée d'Astro | pas avant le 27 nov. (agent de Cursor) | la date |
| 2 | mentions légales et confidentialité | #223 codée, rouge exprès | **les valeurs du chef** |
| 3 | SVG officiels des logos | **faite** (#220) | — |
| 4 | site non indexé | dans #221 (`robots.txt`, `noindex`) | la fusion de #221 |
| 5 | contenu complet | **faite** (VIT-07) | — |
| 6 | vidéo de présentation | **faite** (#216) ; #232 prête | — |
| 7 | illustrations | 09a prête ; 09b plan validé, code en dernier | VIT-09b |
| 8 | pages par rôle | **faite** (#219) | — |
| 9 | catalogue et FAQ | plan validé ; code à faire (Codex) | le code ; le complément du méga-menu au chef |
| 10 | ajouts d'après OpenEduCat | 10b, 14b, 18, 09a prêtes ; VIT-14 faite ; VIT-13 et VIT-15 à faire ; VIT-16 attend le chef | VIT-13, VIT-15, VIT-16 |
| 11 | contact réel | VIT-16 | **l'adresse e-mail et les corrections du chef** |
| 12 | aucun saut du menu, performance mobile ≥ 90 | VIT-17 en cours, plan validé | le code et les mesures |

En plus, avant le déploiement : VIT-06b (journaux), qui attend `N` et le relevé Traefik.

## Questions au chef

1. **VIT-12 et VIT-16** (dans le message, pas dans « Autre ») : `NOM`, `HÉBERGEUR`, `N` (proposition : 30 jours), `DATE`, `E-MAIL`, `RÉSEAU`, et les corrections du plan de VIT-16. C'est ce qui bloque les conditions 2 et 11.
2. **Relevé Traefik sur le VPS** pour VIT-06b : la commande est dans `docs/sessions/2026-11-19-feat-vit-06-code.md` (branche `feat/vit-06-code`).
3. **#230 STA-01** : valider ou corriger le plan (`docs/conception/stages/sta-01-offres-stage.md`). Proposition : devise obligatoire dès qu'il y a un montant, aucune par défaut ; la route publique gardée avec son limiteur et `noindex`.
4. **#231** : le prochain lot d'Alexis (EDT-04 proposé), et ce qu'il dit de RHP-01 et EDT-02 (« faits » selon lui) : je les vérifierai avant de les marquer.
5. **MOT** : qui reprend `feat/mot-13-coupure-fine` (jamais poussée) ? Proposition : Claude de VS Code après UIX-10b, ou une session Claude nouvelle.
6. **Session de VIT-14** : sa file est vide.

## Commandes pour le chef de projet

```powershell
# 1. La coordination
git -C "..\travaux-planner\coordination-equipe" push
# 2. Pousser les commits locaux prêts
git -C "..\travaux-planner\vit-10b-avant-avec-faq" push
git -C "..\travaux-planner\vit-06-code" push
# 3. Fusions, une à la fois, dans cet ordre (attendre une minute après un push, puis la CI)
gh pr checks 222 --watch && gh pr merge 222 --merge
gh pr checks 226 --watch && gh pr merge 226 --merge
# #228 : la session de l'expertise fait git merge origin/main (une ligne du module VIT), commite ; tu pousses
gh pr checks 228 --watch && gh pr merge 228 --merge
# #232 : Claude de VS Code fait git merge origin/main et retire l'exception de contenu.test.js ; tu pousses
gh pr checks 232 --watch && gh pr merge 232 --merge
gh pr checks 233 --watch && gh pr merge 233 --merge
# #221 : Codex fait git merge origin/main (une ligne du module VIT) ; tu pousses
gh pr checks 221 --watch && gh pr merge 221 --merge
```

Puis « lis ta boîte » à Codex et à l'agent de Cursor, et les prompts ci-dessous.

## Prompts pour les sessions Claude

**Session de l'expertise** (VIT-18)

```text
Le coordinateur relaie (21 nov.). #228 (VIT-18) est relue : prête, l'écart du test de garde est accepté.
Quand le chef aura fusionné #222 et #226 : git merge origin/main dans ..\travaux-planner\vit-18-textes-exacts,
garde les deux lignes en conflit de docs/plan/modules/VIT-site-vitrine.md, relance npm run test:unit et npm run build,
commite ; le chef pousse. Ne modifie pas docs/plan/suivi.md. Jamais de git push.
```

**Claude de VS Code** (après son étape d'UIX-10b en cours)

```text
Le coordinateur relaie (21 nov.). #232 (VIT-08, nouveau rendu) est prête, mais elle passe juste après #228 (VIT-18).
Quand #228 sera fusionnée : git merge origin/main dans ..\travaux-planner\vit-08-phrases-video, puis retire
l'exception du test de garde (EXCEPTIONS dans vitrine/tests/contenu.test.js, VIT-18 § 5 et § 6) : sans cela, le test
« l'exception sert encore » met main au rouge. npm run test:unit, build, commit ; le chef pousse. Puis reprends UIX-10b.
#222 (VIT-09a) est prête ; VIT-09b reste en dernier sur le site. Ne modifie pas docs/plan/suivi.md. Jamais de git push.
```

**Session de VIT-12 et VIT-16** : le prompt de la fiche du 19 nov. (6), avec les valeurs dans le message.

**Alexis** (le chef relaie)

```text
Le coordinateur relaie (21 nov.). #229 : plan validé après coup ; la CI est rouge, sessionsJeu.spec.cjs ligne 49 attend
plus d'un bouton « Lancer « … » en classe » dans « Tous les jeux » et n'en trouve pas (run 44640514265). Vérifie le nom
accessible réel du bouton d'enseignant, corrige le code ou le test, relance le parcours, commite.
#230 (STA-01) ne se fusionne pas avant que le chef valide le plan. À corriger d'abord : aucune devise par défaut
(EP-5 : DEVISE_PAR_DEFAUT = "MAD" et « dirhams » dans la migration et le modèle) ; la migration garde le numéro 0083,
réservé pour toi. Ajoute la ligne « Validé » du plan quand le chef l'aura donnée. #231 : le chef répond.
```

## Prompt de reprise (coordinateur)

```text
Tu es le coordinateur des agents de Planner. Travaille dans ..\travaux-planner\coordination-equipe, branche doc/coordination-equipe.
git fetch puis git merge origin/main (garde toutes les lignes de decisions.md). Lis AGENTS.md, les skills coordination et
relecture-branche, docs/plan/suivi.md (Missions en cours), docs/plan/feuille-de-route.md (douze conditions, ordre des fusions révisé
le 21 nov., files), docs/plan/decisions.md (19 et 21 nov.), puis cette fiche (docs/sessions/2026-11-21-doc-coordination-equipe-7.md).
Fait le 21 nov. : #222, #226, #228, #233, #221 prêtes ; #232 après #228 avec le retrait de l'exception ; plan de VIT-17 validé
avec corrections (consigne dans la boîte de Cursor) ; Codex : #221 puis VIT-11 (complément du méga-menu au chef) et VIT-06b ;
#230 (STA-01) au chef ; #229 à corriger.
À suivre : les fusions dans l'ordre, le rapport de VIT-17, les valeurs du chef pour #223 et VIT-16, le relevé Traefik,
la réponse à #231, la reprise de MOT-13 (coupure fine). Tour d'état d'abord, boîtes comprises ; toi seul modifies suivi.md ; jamais de git push.
```

## Suite du 21 nov. : le supérieur d'abord

**Fusionnées pendant la session** : #222 et #233. #226 restait ouverte, CI en cours.

**Décisions du chef** (detail dans `decisions.md`, 21 nov.) :
- la synthèse des concurrents et N1 à N8 ;
- **le supérieur jusqu'au bout, puis on descend**, avec la règle « concevoir pour tous, construire pour le supérieur » et la ligne d'arrivée ;
- VSC-08 créée (évaluations, crédits et jurys du supérieur) ;
- INS, DOC et FIN dans l'étape du supérieur ;
- MOT-02 sur un jeu du supérieur ;
- ADM s'ouvre après MOT, à la place de VSC ;
- les études se fusionnent ;
- Alexis prend EDT-04 après ses corrections.

**Fait** :
- `README.md` du plan : EP-19 ; § 2 réécrit (étapes 0 à 7, la 3 étant le supérieur).
- `decisions.md`, `suivi.md` (chantier qui suit MOT, MOT-02, VSC-01, VSC-08, EDT-04, deux missions) et `feuille-de-route.md`.
- Modules VSC (VSC-08) et MOT (MOT-02) ; modèle de conception (§ 7 bis « Ce que disent les études »).
- Fiches nouvelles : [edt-04-publication](../plan/missions/edt-04-publication.md) (Alexis) et [fusion-etudes](../plan/missions/fusion-etudes.md) (session de VIT-14).
- Boîte de Codex : `2026-11-21-0130-superieur-mot-02-vsc-01`.

**Reste à faire (prochain coordinateur)** :
- reprendre la colonne « Étape » de `suivi.md` et des fichiers de module selon le nouveau § 2 du README ;
- reporter les autres lignes du § 7 de la synthèse 14 dans les fiches (MOB pour N2, COU et BIB pour N3, VIT-04, VEN-02 pour N6 et N8, VIT-09b, VIT-10b, VIT-15 pour R2, EP-18 pour R9 et R10) ;
- classer chaque ligne du registre par public (supérieur, scolaire, tous).

### Relecture d'Alexis (21 nov.)

Rien de nouveau sur GitHub depuis le 20 nov. à 1 h 21.
- **#229** : à corriger (CI rouge).
- **#230** : bonne facture, mais quatre écarts :
  - le plan a été codé sans validation ;
  - la devise MAD est mise par défaut (EP-5) ;
  - la liste montre à tout enseignant les brouillons, même hors de ses filières (`offresVisibles`) ;
  - `OffresStage.jsx` fait 449 lignes.
- **#231** : le chef a répondu (EDT-04).

### Prompts à relayer

**Session de VIT-14** : le prompt de la fiche [fusion-etudes](../plan/missions/fusion-etudes.md).

**Alexis** : le prompt de la fiche [edt-04-publication](../plan/missions/edt-04-publication.md) (il commence par ses corrections de #229 et #230).

**Session de l'expertise** : pousser `etude/expertise-go4school` (le chef), puis la mission de fusion la prend au n° 6.

## Répartition, colonne « Étape » et reports (21 nov., vers 2 h)

- Fusionnées : #222, #226, #232 (avant #228 : la session de l'expertise retire l'exception de son test en intégrant `main`), #233. #191 reste ouverte (CI du 17 nov. rouge) : premier point de la mission de fusion des études.
- Répartition : messages directs à la session de l'expertise (#228, puis VIT-18b) et à Claude de VS Code (UIX-10b, sa file) ; boîte de Codex (`0145-vit-06-maintenant`) ; fiche [vit-18b-superlatifs](../plan/missions/vit-18b-superlatifs.md).
- Colonne « Étape » reprise dans `suivi.md` (86 lignes) et les fichiers de module, selon le § 2 du README.
- Fonctions nouvelles : **MOB-08** (appel à la main hors ligne, N2) et **VIT-19** (contrôle des 200 Ko dans la CI du site, N1).
- Reports du § 7 de la synthèse : N3 dans les critères de COU et BIB et dans le modèle de conception (§ 7) ; N6 et N8 dans VEN-02, dont les entretiens se mènent auprès d'écoles du supérieur ; N7 dans VSC-01 ; N5 dans la feuille de route ; R2 dans la fiche de VIT-09 ; R2, R4 et N3 dans celle de VIT-15 ; R9, R10 et la réponse 3 de l'étude 13 dans celle d'EP-18.
- Reste : classer chaque ligne de la synthèse 14 par public, après la fusion de #234 (le fichier est sur sa branche) ; M16 (P-85, aucune demande d'avis dans le produit) attend toujours le chef dans l'étude 11 (#192).
