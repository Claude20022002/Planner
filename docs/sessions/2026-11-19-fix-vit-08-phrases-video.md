# Session du 2026-11-19 · VIT-08, nouveau rendu de deux phrases de la vidéo · `fix/vit-08-phrases-video`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session de VS Code, reprise de la fiche `2026-11-19-feat-vit-09-illustrations.md` |
| Chantier | VIT |
| Dossier de travail | `..\travaux-planner\vit-08-phrases-video` (jonctions vers les `node_modules` de `..\travaux-planner\vit-08-video`, verrous identiques) |
| Dernier commit | voir `git log -1` |

## Objectif de la session

Point 1 du prompt de reprise : refaire le rendu de la vidéo de l'accueil pour `video.scenes.4.lignes.0` et `video.scenes.7.lignes.1`, avec la transcription, une fois les phrases visées (plan de VIT-18, § 6).

## Plan

Le § 6 du [plan de VIT-18](../conception/vitrine/vit-18-textes-exacts.md) (branche `fix/vit-18-textes-exacts`) tient lieu de plan court : il donne les deux phrases et dit qu'elles changent au prochain rendu. Le chef a choisi ce mode (question 3 ci-dessous).

**Constat en ouvrant la session** : la validation de VIT-18 (`11e379df`) couvre les groupes 1 à 5 et les questions 6 et 7, pas le § 6. La phrase française de `scenes.7` reprend D2, déjà validée ; celle de `scenes.4` n'avait pas de visa, et **aucune des deux n'avait de version anglaise**. Les visas ont donc été demandés au chef (outil de questions, 19 nov.).

## Questions

| N° | Question | Réponse du chef |
|---|---|---|
| 1 | Scène 4 : fr « Dix types de questions, six en direct. En direct, les points comptent la justesse et la rapidité. » ; en « Ten question types, six of them live. Live, points reward accuracy and speed. » | **validé** |
| 2 | Scène 7 : fr (D2) « Double authentification, accès par rôle. Quand l'IA est activée pour votre école, elle ne reçoit aucune donnée d'élève. » ; en « Two-step sign-in, role-based access. When AI is turned on for your school, it never receives student data. » | **validé** |
| 3 | Quand rendre ? Chaque rendu ajoute environ 10 Mo à l'historique du dépôt public | **maintenant, sur une branche à part**, partie de `origin/main` ; le § 6 de VIT-18 sert de plan |
| 4 | Pour le coordinateur, reportée de la fiche précédente : VIT-15 pose les logos de ses fiches ; VIT-09b ne les refait pas (plan de VIT-09b, § 4.2). D'accord ? | ouverte |

## Fait

| Fichier | Ce qui change |
|---|---|
| `vitrine/src/i18n/fr/accueil.json`, `en/accueil.json` | les deux phrases visées. La transcription de la page lit les mêmes clés : elle suit d'elle-même |
| `vitrine/public/videos/*` | nouveau rendu des deux langues (`npm run render:accueil`) et `empreinte.json` |
| `vitrine/tests/video.test.js` | test de régression : les deux phrases visées sont là, la formule retirée par D2 n'est plus dans aucune ligne de la vidéo |
| `docs/plan/modules/VIT-site-vitrine.md` | la ligne de VIT-08 dit l'état réel : rendu fait (#216), refait le 19 nov. ; elle disait encore « attend les SVG officiels » |

Vérifications faites avant le rendu final : des images fixes des scènes 5 et 8, en français et en anglais (hors du dépôt). Les phrases tiennent en trois ou quatre lignes dans leur colonne. La coupure « role- / based » de l'anglais existait déjà avant.

## Vérifié

- `npm run render:accueil` : fini sans erreur ; empreinte `7cf2b58be18e0146` (charte, version 2, celle de `main`).
- Poids, tous sous leur maximum :
  - fr : MP4 720p 1,51 Mo, WebM 1080p 3,39 Mo ;
  - en : MP4 720p 1,47 Mo, WebM 1080p 3,26 Mo ;
  - images fixes : 0,04 Mo, identiques à l'octet près (elles ne montrent pas les scènes changées).
- Environ 10 Mo de fichiers rendus entrent dans l'historique, comme prévu (question 3).
- `npm run build` (vitrine) : 49 pages.
- `npm run test:unit` : **77 sur 77**, dont l'empreinte et le nouveau test de régression ; aucun test sauté.
- `node scripts/verifier-neutre.mjs` : propre.

## Écarts et points à savoir

- **Le test de garde de VIT-18** (pas encore codé) prévoit une exception pour ces deux clés, et « vérifie aussi que seules ces deux clés y échappent ». Si cette branche est fusionnée avant le code de VIT-18, l'exception n'a plus lieu d'être : VIT-18 la retire en fusionnant `main`. Si VIT-18 passe d'abord, cette branche fusionne `main` et retire l'exception. Les deux branches touchent `accueil.json` à des clés différentes.
- **#222 (VIT-09a) ne périme pas la vidéo** : la famille `applications` de la charte v3 est hors de l'empreinte (`FAMILLES_VIDEO`). Aucune clé changée par VIT-18 n'entre dans l'empreinte, sauf ces deux phrases.
- `suivi.md` non modifié (consigne).

## État laissé

- Pour `suivi.md`, à reporter par le coordinateur : VIT-08, deux phrases rendues à nouveau, `fix/vit-08-phrases-video`, à pousser par le chef.
- VIT-09a : #222 à pousser (fiche précédente). VIT-09b : plan validé (`8f451998`), code en dernier sur le site.

## Reste à faire, dans l'ordre

1. Le chef pousse `fix/vit-08-phrases-video` et ouvre la PR.
2. La file : **UIX-10b** (plan court ; ses préalables, #199 et UIX-09 #213, sont fusionnés depuis le 18 nov.), UIX-11, UIX-06c, QJE-14, l'étude StudyLib, UIX-10d. Les fiches et la feuille de route sont sur `doc/coordination-equipe`.
3. VIT-09b, le code, en dernier sur le site : repartir de `origin/main`, étapes 2 à 9 du plan.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vit-08-phrases-video" push -u origin fix/vit-08-phrases-video
gh pr create --base main --head fix/vit-08-phrases-video --title "VIT-08 : nouveau rendu de deux phrases de la vidéo (VIT-18, § 6)" --fill
# Si ce n'est pas déjà fait (fiche précédente) :
git -C "..\travaux-planner\vit-09a-logos" push origin feat/vit-09a-logos-icones
git -C "..\travaux-planner\vit-09-illustrations" push -u origin feat/vit-09-illustrations
```

## Prompt de reprise

```text
Tu es Claude de VS Code sur Planner (ta file d'interface, puis VIT-09b).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md et la feuille de route (branche doc/coordination-equipe),
puis cette fiche : docs/sessions/2026-11-19-fix-vit-08-phrases-video.md (branche fix/vit-08-phrases-video).
Fait le 19 nov. :
- les deux phrases de la vidéo (scenes.4, scenes.7) sont visées par le chef en fr et en en, rendues à nouveau
  (fix/vit-08-phrases-video, dossier ..\travaux-planner\vit-08-phrases-video), test de régression ajouté ;
- #222 (VIT-09a) à jour avec main ; plan de VIT-09b validé (8f451998, ..\travaux-planner\vit-09-illustrations).
Reste, dans l'ordre :
1) UIX-10b : plan court (plan d'UIX-10, § 9 ; préalables #199 et UIX-09 fusionnés), validé par le chef avant tout code ;
2) puis UIX-11, UIX-06c, QJE-14, étude StudyLib, UIX-10d (fiches sur doc/coordination-equipe) ;
3) VIT-09b, le code, en dernier sur le site : repartir de origin/main, étapes 2 à 9 du plan,
   en montrant au chef la planche des dessins et chaque capture avant le commit.
Question ouverte au coordinateur : VIT-15 pose les logos de ses fiches ; VIT-09b ne les refait pas.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour en fin de session ; suivi.md non modifié ; jamais de git push.
```
