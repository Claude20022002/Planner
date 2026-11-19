# Mission · VIT-18 · les textes exacts du site vitrine (lot B de l'expertise)

| | |
|---|---|
| État | ouverte : plan court tout de suite ; le code après la fusion de VIT-14 (#224) |
| Agent | **la session Claude de l'expertise** (`etude/expertise-site-vitrine`) : elle a confronté chaque phrase au code et proposé les textes |
| Modèle recommandé | celui de la session (Opus 5.5), sinon Fable 5.2 |
| Attribuée le | 2026-11-19, par le coordinateur, d'après l'[expertise du site](../../etude-marche/12-expertise-site-vitrine.md) (§ 13, C5 et C7 ; § 14, lot B) ; décisions D2, D3 et D4 du chef (18 nov.) |
| Module | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05 |
| Fonction | VIT-18 : rendre exactes les phrases P1 à P6, appliquer D2 (l'IA), D3 (aucun pays) et D4 (le calcul sert aujourd'hui le supérieur et la formation), et raconter EP-18 sur l'accueil et la page En classe · taille S |
| Branche | `fix/vit-18-textes-exacts`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\vit-18-textes-exacts` |
| Plan de conception | plan court `docs/conception/vitrine/vit-18-textes-exacts.md` · **validé par le chef phrase par phrase**. Les phrases qui appliquent D2 et D3 mot pour mot sont déjà validées (expertise, § 13, marquées « validé ») |

## Ce qui est à faire

1. **C7** (expertise, § 13) : P2 à P6, D2 sur toutes les phrases de l'IA (« quand l'IA est activée pour votre école »), D3 (plus de Massar, de BTS ni de LMD), dans `accueil.json`, `emploi-du-temps.json`, `quiz-et-jeux.json`, `en-classe.json`, `solutions.json`, `bientot.json`, `bibliotheque.json`, `securite.json` (fr et en ; l'arabe garde ses clés).
2. **P1 et D4, l'accroche de l'accueil** (`accueil.json` · `ouverture.accroche`) : la phrase proposée en C2 (« Pour l'enseignement supérieur et la formation professionnelle… Le collège et le lycée arrivent bientôt. »), et l'ordre de `TYPES` dans `src/components/solutions/types.js` (supérieur, formation, collège et lycée). **Le titre principal et la ligne des rôles restent à VIT-09b** (décision du coordinateur : l'honnêteté de l'accroche n'attend pas l'intégration, qui passe en dernier).
3. **C5, EP-18 sur l'accueil et En classe** : l'appel commence par la liste à la main, le QR code devient une option avec ses garanties (`accueil.json` · `appel.texte` ; `en-classe.json` · `appel.texte` et `appel.points`) ; les jeux sur téléphone **ou** ordinateur (`quiz-et-jeux.json` · `jeux.cartes.1.texte`) ; la carte « Hors ligne » de Bientôt (`bientot.json` · `aussi.cartes.3.texte`).
4. **Le test de garde** proposé : `vitrine/tests/contenu.test.js` échoue si un texte fr ou en contient « Maroc », « Morocco », « Massar », « BTS », « LMD » ou « l'école active l'IA ».
5. **La vidéo n'est pas touchée** : `video.scenes.4.lignes.0` et `video.scenes.7.lignes.1` (et leur transcription) changent au prochain rendu de VIT-08, par Claude de VS Code. Le plan liste ces deux phrases pour lui.

Le dessin de l'appel (C3, point 2) et la carte « Semaine » de la page Application (C10) sont à VIT-09b.

## Critère de « terminé »

- Chaque phrase changée a sa source dans le code, citée dans le plan, et le visa du chef.
- Build, `npm run test:unit` (avec le test de garde), `node scripts/verifier-neutre.mjs` ; axe-core sans violation en 390 et 1440 px.

## Ordre et fichiers partagés

`accueil.json` est aussi touché par VIT-14 (#224, des clés ajoutées), VIT-16 (les clés `contact`) et VIT-09b : **#224, puis VIT-18, puis VIT-16, puis VIT-09b**. Le plan et les visas peuvent se faire dès maintenant ; le code part de `origin/main` après la fusion de #224. `solutions.json` et `types.js` sont touchés ensuite par VIT-13 (agent de Cursor) : VIT-18 passe d'abord, il est court.

## Périmètre d'écriture

Les fichiers de texte listés (fr, en, et les clés ar), `src/components/solutions/types.js`, `vitrine/tests/`, le plan, la ligne du module VIT, la fiche de session. **Pas** `docs/plan/suivi.md`, ni la vidéo, ni les composants.

## Prompt à donner à l'agent (la session de l'expertise)

```text
Le coordinateur te confie VIT-18 : les textes exacts du site vitrine (lot B de ton expertise). Ta fiche :
docs/plan/missions/vit-18-textes-exacts.md (branche doc/coordination-equipe tant qu'elle n'est pas fusionnée).
Les décisions D1 à D4 sont inscrites dans docs/plan/decisions.md (19 nov.).
Ouvre la branche : git worktree add "..\travaux-planner\vit-18-textes-exacts" -b fix/vit-18-textes-exacts origin/main
Écris le plan court docs/conception/vitrine/vit-18-textes-exacts.md : chaque phrase, avant et après, fr et en, avec sa source ;
marque celles déjà validées par D2 et D3 ; commite-le seul ; le chef valide le reste phrase par phrase (outil de questions,
une question par groupe de phrases ; ce que le chef tape dans « Autre » n'arrive pas : qu'il réponde dans le message).
Le code après la fusion de VIT-14 (#224) : git merge origin/main, puis les textes, types.js et le test de garde.
Ne modifie pas docs/plan/suivi.md. Fiche de session ; tout est commité ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-19 0 h 20 | fiche écrite par le coordinateur, d'après l'expertise (lot B) | — |
