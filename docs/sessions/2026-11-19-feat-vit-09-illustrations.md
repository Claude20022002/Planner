# Session du 2026-11-19 · VIT-09a (fusion de main) et VIT-09b (plan) · `feat/vit-09-illustrations`

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), session de VS Code, sur consigne du coordinateur relayée le 19 nov. |
| Chantier | VIT |
| Dossier de travail | `..\travaux-planner\vit-09-illustrations` ; aussi `..\travaux-planner\vit-09a-logos` pour #222 |
| Dernier commit | voir `git log -1` : le commit de cette fiche, après `8f451998` |

## Objectif de la session

La consigne du coordinateur, en trois points :
1. Sur #222 (VIT-09a), fusionner `origin/main`, résoudre le conflit d'une ligne du fichier du module VIT en gardant les deux lignes, relancer les tests et commiter.
2. Écrire le plan court de VIT-09b, avec les ajouts C2, C3 et C10 de l'expertise, et le faire valider par le chef.
3. Après les visas de VIT-18, refaire le rendu des deux phrases de la vidéo (`scenes.4`, `scenes.7`) et de la transcription.

## Plan

[docs/conception/vitrine/vit-09-illustrations.md](../conception/vitrine/vit-09-illustrations.md) : **validé par le chef le 19 nov.** Les propositions des questions 1 à 8 sont retenues, et les textes de C2 et de C10 sont visés.

## Fait

| Commit | Branche | Contenu |
|---|---|---|
| `62775061` | `feat/vit-09a-logos-icones` (#222) | fusion de `origin/main` (`d27e30ee`) ; le conflit de `docs/plan/modules/VIT-site-vitrine.md` est résolu en gardant les deux lignes (VIT-09a et VIT-10) |
| `8f451998` | `feat/vit-09-illustrations` (nouvelle, depuis `origin/main` `d27e30ee`) | plan court de VIT-09b, validé par le chef. Il couvre : les composants communs ; la page par page (logo d'en-tête, première section, illustrations) ; les quatre captures sur l'« École de démonstration » ; le poids maximal ; EP-18 dans les images ; les étapes |

Réponses du chef (outil de questions, 19 nov.) :
- **Captures** : une base locale jetable « École de démonstration », avec des adresses en `@exemple.test`. Les quatre captures de l'expertise, en français et en anglais. La semaine du mobile est prise par Expo web.
- **Pages de texte** : FAQ, mentions légales, confidentialité, contact et `/comparer/` restent sans image. À propos et Bientôt ont un dessin.
- **Grille des apps** : elle mène aux fiches de VIT-15.
- **Poids** : 300 Ko pour l'accueil, 250 Ko pour les autres pages, 80 Ko par capture.
- **Textes** : ceux de C2 sont visés tels quels ; ceux de C10 sont visés sous réserve du code du mobile.

## Vérifié

Sur `feat/vit-09a-logos-icones`, après la fusion :
- `node --test ../shared/charte/charte.test.js ../shared/icones/icones.test.js` (depuis `frontend/`) : **14 sur 14**.
- `node shared/charte/generer.mjs --verifier` : la charte est à jour.
- `npm run build` (vitrine) : 49 pages ; `npm run test:unit` : **76 sur 76**.
- `node scripts/verifier-neutre.mjs` : propre.

Sur `feat/vit-09-illustrations` : un document seul, aucun test à lancer. `verifier-neutre` est relancé avant le commit de cette fiche.

## Écarts

- **Le point 3 (le rendu de la vidéo) n'est pas fait.** Les visas de VIT-18 ne sont pas encore donnés : son plan (`fix/vit-18-textes-exacts`, `173f1ddc`) est « en attente ». La phrase de `scenes.7` applique D2 mot pour mot, mais celle de `scenes.4` attend le visa du chef. Le rendu se fera quand les deux phrases sont visées.
- **La file (UIX-10b, …) n'est pas commencée.** C'est une autre fonction : AGENTS.md, point 13, demande de clore la session d'abord.
- **Le nom du fichier du plan** : `vit-09-illustrations.md`, comme dans la fiche de mission, et non `vit-09b-…`. Son titre dit bien VIT-09b.

## Questions

| N° | Question | Réponse | État |
|---|---|---|---|
| 1 à 8 | celles du plan de VIT-09b (§ 3) | propositions retenues par le chef | réglées |
| 9 | Pour le coordinateur : la fiche de VIT-15 dit « chacune a son logo ». VIT-09b le reprend sans le refaire (plan, § 4.2). D'accord ? | — | ouverte, coordinateur |

## État laissé

- Pour `suivi.md`, à reporter par le coordinateur :
  - VIT-09a : #222 à jour avec `main` (`62775061`), à pousser par le chef ;
  - VIT-09b : plan validé (`8f451998`, `feat/vit-09-illustrations`), le code en dernier sur le site.
- Chantier VIT : l'ordre des fusions est celui du coordinateur (19 nov.). VIT-09b vient après VIT-15.

## Reste à faire, dans l'ordre

1. Le chef pousse #222 (VIT-09a) et la branche du plan de VIT-09b.
2. Après les visas de VIT-18 : le rendu des deux phrases de la vidéo (`scenes.4`, `scenes.7`) et de la transcription, sur une branche de VIT-08.
3. La file : UIX-10b, UIX-11, UIX-06c, QJE-14, l'étude StudyLib, UIX-10d. Les fiches et la feuille de route sont sur `doc/coordination-equipe`.
4. VIT-09b, le code : en dernier sur le site. La branche repart de `origin/main` et suit les étapes 2 à 9 du plan.

## Commandes pour le chef de projet

```powershell
git -C "..\travaux-planner\vit-09a-logos" push origin feat/vit-09a-logos-icones
git -C "..\travaux-planner\vit-09-illustrations" push -u origin feat/vit-09-illustrations
gh pr create --base main --head feat/vit-09-illustrations --title "VIT-09b : plan court (illustrations, captures neutres, première section)" --fill --draft
```

## Prompt de reprise

```text
Tu es Claude de VS Code sur Planner (chantier VIT, puis ta file d'interface).
Lis d'abord AGENTS.md, docs/plan/README.md, docs/plan/suivi.md et la feuille de route (branche doc/coordination-equipe),
puis cette fiche : docs/sessions/2026-11-19-feat-vit-09-illustrations.md (branche feat/vit-09-illustrations).
Fait le 19 nov. :
- #222 (VIT-09a) est à jour avec main (62775061, conflit du fichier du module résolu, tests verts) ;
- le plan de VIT-09b est validé par le chef (8f451998, docs/conception/vitrine/vit-09-illustrations.md), dans ..\travaux-planner\vit-09-illustrations.
Reste, dans l'ordre :
1) quand le chef a visé les phrases de VIT-18 (plan sur fix/vit-18-textes-exacts, § 6), refaire le rendu de la vidéo
   de l'accueil pour video.scenes.4.lignes.0 et video.scenes.7.lignes.1, avec la transcription (mission VIT-08) ;
2) la file : UIX-10b (plan court, après #199 et UIX-09), UIX-11, UIX-06c, QJE-14, étude StudyLib, UIX-10d ;
3) VIT-09b, le code, en dernier sur le site : repartir de origin/main et suivre les étapes 2 à 9 du plan,
   en montrant au chef la planche des dessins et chaque capture avant le commit.
Question ouverte au coordinateur : VIT-15 pose les logos de ses fiches ; VIT-09b ne les refait pas.
Règles : pas de code hors du plan validé ; questions avant toute supposition ; rien de réel dans le dépôt ;
fiche de session à jour en fin de session ; suivi.md non modifié ; jamais de git push.
```
