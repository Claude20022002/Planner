# Mission · expertise · le site vitrine face à ses promesses et à ses objectifs

| | |
|---|---|
| État | close : #225 fusionnée le 19 nov. |
| Agent | **nouvelle session Claude Code**, ouverte par le chef (décision du 18 nov. vers 21 h 15) |
| Modèle recommandé | Claude Fable 5.2, sinon Opus 5.5 |
| Rôle demandé | un regard de grande agence : directeur de création, expert produit et conversion, expert en accessibilité. Il juge sans complaisance, et chaque jugement s'appuie sur une preuve |
| Livrable | `docs/etude-marche/12-expertise-site-vitrine.md`, sur la branche `etude/expertise-site-vitrine` ; **aucun code** |

## La question

Le site vitrine, **dans son état sur `origin/main`** (et, à part, avec les PR ouvertes du site si le chef le demande), tient-il ses promesses et sert-il ses objectifs ?

## Ce que l'expertise juge

1. **Les objectifs** : ceux du chef (plan du site `docs/conception/vitrine/vit-vitrine.md`, § 1 ; feuille de route ; `decisions.md` des 17 et 18 nov.). Ce qu'un directeur d'école, une scolarité, un enseignant doivent comprendre et faire après 30 secondes, puis après 3 minutes.
2. **Les promesses** : chaque phrase du site est confrontée au code (`frontend/`, `backend/`, `mobile/`, StudyLib lue sans écriture). Le rapport relève chaque promesse non tenue, exagérée ou floue, avec le fichier et la clé du texte.
3. **Les règles du chef** :
   - EP-18 (aucun téléphone, wifi ni écran comme seul chemin) ;
   - EP-5 (aucun pays supposé) ;
   - aucun prix, aucun nom d'école, rien chargé d'ailleurs ;
   - la loi 09-08 jamais nommée ;
   - l'IA écrite « quand l'école active l'IA ».
4. **Le design** : hiérarchie, rythme, typographie, cohérence avec la charte v2 et les logos officiels, illustrations (ce qui manque, page par page), mouvement, en 390, 768 et 1440 px.
5. **La qualité mesurée** : Lighthouse (performance, accessibilité, bonnes pratiques, SEO) et axe-core sur chaque page du site construit, avec les commandes ; le poids de chaque page (EP-18, peu de connexion).
6. **Le positionnement** : ce que le site dit de plus qu'OpenEduCat, ce qu'il dit de moins ([relevé](11-chemins-site-openeducat.md)), et si un directeur comprend pourquoi choisir Planner.
7. **Les missions en cours** (VIT-08 à VIT-16, VIT-10b) : comblent-elles les manques relevés ? Ce qui reste hors de toute mission.

## Forme du rapport

- Une note sur 10 par axe (objectifs, promesses, règles, design, qualité, positionnement), justifiée.
- Les **dix corrections les plus utiles**, rangées par effet attendu, chacune avec le fichier, la mission qui la porterait (ou « nouvelle »), et sa taille.
- Les captures d'écran faites pour l'expertise restent hors du dépôt (dossier temporaire), sauf accord du chef.

## Périmètre d'écriture

`docs/etude-marche/12-expertise-site-vitrine.md` et la fiche de session. Le code se lit et se construit en local, il ne se modifie pas. `docs/plan/suivi.md` n'est pas modifié.

## Prompt à donner à l'agent

```text
Tu es une agence de premier plan appelée pour juger le site vitrine de Planner : directeur de création, expert produit
et conversion, expert en accessibilité. Ta mission : l'expertise du site dans son état actuel face à ses promesses et à ses objectifs.
Aucun code. Lis AGENTS.md, docs/plan/README.md (EP-5, EP-13, EP-18), docs/conception/vitrine/vit-vitrine.md,
docs/plan/feuille-de-route.md, docs/plan/decisions.md (17 et 18 nov.), docs/etude-marche/02-arguments-marketing.md
et 11-chemins-site-openeducat.md, puis ta fiche docs/plan/missions/expertise-site-vitrine.md.
git worktree add "..\travaux-planner\expertise-site" -b etude/expertise-site-vitrine origin/main
Construis le site (cd vitrine ; npm ci ; npm run build ; npm run preview), parcours chaque page en 390, 768 et 1440 px,
mesure Lighthouse et axe-core, confronte chaque phrase au code. Sois exigeant : chaque jugement a sa preuve.
Écris docs/etude-marche/12-expertise-site-vitrine.md selon la fiche (notes, dix corrections rangées). Pose tes questions au chef s'il le faut.
Ne modifie pas docs/plan/suivi.md. Fiche de session ; tout est commité ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 21 h 20 | fiche écrite par le coordinateur, sur la décision du chef | — |
| 2026-11-19 0 h 20 | rendue : `docs/etude-marche/12-expertise-site-vitrine.md`, #225 (document seul). Notes : objectifs 4, promesses 7, règles 7, design 5, qualité 8, positionnement 3. Décisions D1 à D4 du chef au § 12. **Relue par le coordinateur : conforme** à la fiche (dix corrections rangées, chaque jugement prouvé, aucun code). Découpage repris : lot A → [VIT-17](vit-17-correctifs-vitrine.md), lot B → [VIT-18](vit-18-textes-exacts.md) (cette session), le reste dans VIT-09b, VIT-10b, VIT-14b, VIT-15, VIT-16 | conforme |
| 2026-11-21 | #225 fusionnée le 19 nov. ; la session a rendu VIT-18 (#228) | close |
