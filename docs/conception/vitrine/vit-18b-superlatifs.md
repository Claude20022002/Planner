# VIT-18b · Le test de garde du site refuse aussi les superlatifs · plan court

| | |
|---|---|
| Module | [VIT](../../plan/modules/VIT-site-vitrine.md) · condition 10 de la mise en ligne (textes exacts) |
| Mission | [vit-18b-superlatifs](../../plan/missions/vit-18b-superlatifs.md) (sur `doc/coordination-equipe` tant qu'elle n'est pas fusionnée) |
| Origine | décision **N4** du chef (21 nov.), synthèse 14 (`docs/etude-marche/14-reprendre-et-depasser.md`, sur `etude/expertise-go4school`, #234) ; suite de [VIT-18](vit-18-textes-exacts.md) (#228, fusionnée) |
| Branche | `fix/vit-18b-superlatifs`, depuis `origin/main` (`71b86df5`) |
| Rédigé par | Claude Code (Opus 5.5), session de l'expertise, le 21 novembre 2026 |
| **Validé** | **par Claude20022002 le 21 novembre 2026**, par l'outil de questions : questions 1 à 3 (§ 5), chacune selon la proposition. La règle elle-même est celle de N4 |

## 1. Objet et critère de « terminé »

Le test de garde de VIT-18 (`vitrine/tests/contenu.test.js`) refuse déjà un pays nommé et l'ancienne formule de l'IA. VIT-18b lui ajoute les superlatifs : un site qui se dit « n° 1 » ou « le meilleur » sans preuve fait une promesse qu'il ne tient pas.

« Terminé » quand :

- le test refuse, dans toute chaîne des textes `fr` et `en`, les mots de N4 : « n° 1 », « #1 », « le seul », « le meilleur », « leader », « number one », « the only », « the best », « leader », avec les formes de la question 2 ;
- il échoue quand on remet un superlatif dans un texte fr ou en, et passe sur la branche ;
- la phrase du § 3 est réécrite telle que le chef l'a validée, en français et en anglais ;
- `npm run test:unit`, `npm run build` et `node scripts/verifier-neutre.mjs` sont verts.

## 2. Ce que disent les études

| Repère | Ce qu'il dit | Ce que VIT-18b en fait |
|---|---|---|
| **M15** (synthèse 14, § 3) | « Promesses sans preuve » : « n° 1 », essai annoncé introuvable, décomptes contradictoires, chez Go4School ; chiffres de clients variables chez PERIS. La réponse de Planner : chaque phrase sourcée, et un test de garde | le test de garde couvre les superlatifs ; aucune phrase du site ne revendique une première place |
| **G1** (étude 13, expertise de Go4School) | « La plateforme digitale de gestion scolaire #1 au Cameroun », og:title « La Solution #1 » : aucune source, aucun chiffre sur le site. Note « Promesses » : 6 sur 10 | « #1 » et « n° 1 » sont dans la règle, y compris collés (« #1 », « N°1 ») |
| **N4** (synthèse 14, § 5 et § 7) | « Étendre le test de garde du site aux superlatifs (« n° 1 », « le seul », « le meilleur », « leader ») » ; en anglais « number one », « the only », « the best », « leader ». Taille S | la liste de mots du test, mot pour mot ; les formes voisines à la question 2 |
| **VIT-18** (expertise du site, étude 12) | chaque phrase du site doit être exacte ; le test de garde empêche une formule retirée de revenir | même méthode : une liste, un message qui nomme la langue, le fichier et la clé |

## 3. Ce que le test trouve aujourd'hui sur `main`

Recherche faite le 21 nov. sur les 18 fichiers `fr` et les 18 fichiers `en` de `vitrine/src/i18n/`, et sur les composants (`.astro`, `.js`) : aucun texte en dur ne contient de superlatif.

| Trouvé | Où | Superlatif ? |
|---|---|---|
| « Planner cherche **la meilleure** semaine possible : les règles strictes sont toujours tenues, les règles souples autant que possible. »<br>« Planner looks for **the best** possible week: hard rules are always kept, soft rules as far as possible. » | `emploi-du-temps.json` · `calcul.texte` | **oui**, et la phrase est aussi inexacte : le solveur s'arrête au bout de 60 s (`solver/src/main/java/ma/hestim/solver/ConfigurationSolveur.java`, ligne 28, `withTerminationSpentLimit`). Il rend la meilleure semaine **trouvée** dans ce temps, pas la meilleure **possible**. Question 1 |
| « School leaders » (sept fois : `commun.json`, `direction.json`, `etablissement.json`, `scolarite.json`) ; « for its leaders » (`bientot.json`) | anglais | **non** : c'est le nom du rôle de la direction (VIT-10). Question 3 |
| « Leaderboard » | `accueil.json` · le classement du quiz | **non** : le classement des joueurs. Question 3 |
| « Choix unique », « usage unique », « seulement », « un seul étudiant » | plusieurs fichiers | **non** : le test ne les touche pas (limites de mot, § 4) |

Les PR ouvertes qui écrivent des textes du site (#236 VIT-11, #223 VIT-12, #227 VIT-09b) n'ajoutent aucun superlatif (vérifié sur leurs branches le 21 nov.) : elles passeront le test après avoir fusionné `main`. L'arabe a ses valeurs vides : le test, comme celui de VIT-18, lit le français et l'anglais.

### La phrase à changer (question 1)

| Clé | Avant | Après (proposé) |
|---|---|---|
| `emploi-du-temps.json` · `calcul.texte` | fr : « Planner cherche la meilleure semaine possible : les règles strictes sont toujours tenues, les règles souples autant que possible. »<br>en : « Planner looks for the best possible week: hard rules are always kept, soft rules as far as possible. » | fr : « Planner cherche la semaine qui respecte le mieux vos règles : les règles strictes sont toujours tenues, les règles souples autant que possible. »<br>en : « Planner looks for the week that best fits your rules: hard rules are always kept, soft rules as far as possible. » |

Cette phrase n'est ni figée par un autre test, ni recopiée par une page par rôle, ni lue par la vidéo (qui ne lit que `accueil.json`).

## 4. Le test

Dans `vitrine/tests/contenu.test.js`, à côté du test de garde de VIT-18 :

- une expression `SUPERLATIFS`, séparée de `INTERDITS`, pour que l'échec dise de quelle règle il s'agit (N4 ou D2 et D3) ;
- un test qui parcourt, comme celui de VIT-18, chaque chaîne de chaque fichier `fr` et `en`, et nomme `langue/fichier:clé` en cas d'échec ;
- **un test de la règle elle-même** : une liste de phrases qui doivent être refusées (une par mot de N4 et par forme de la question 2) et une liste qui doivent passer (« School leaders », « Leaderboard », « seulement », « un seul étudiant », « Choix unique », « best fits »). C'est le test de régression du correctif : si quelqu'un affaiblit l'expression, il échoue ;
- des limites de mot (`\b`) autour de « le seul », « the only », « the best », « leader » : sans elles, « Assemble seulement » serait refusé (vu pendant la recherche du § 3) ;
- la phrase nouvelle du § 3 rejoint `PHRASES_EXACTES`.

`contenu.test.js` fait aujourd'hui 160 lignes ; il en gagne une trentaine, sous le repère de 300.

## 5. Questions au chef

Posées par l'outil de questions. **Ce que le chef tape dans « Autre » n'arrive pas** : pour changer une phrase, il l'écrit dans son message.

| N° | Question | Proposition | Réponse du chef |
|---|---|---|---|
| 1 | La phrase du calcul (`emploi-du-temps.json` · `calcul.texte`, fr et en) | le texte « Après » du § 3 | **validé** (« Je valide ») |
| 2 | Le test refuse-t-il aussi les formes voisines des mots de N4 ? | oui : féminin et pluriel (« la seule », « les seuls », « les seules », « la meilleure », « les meilleurs », « les meilleures ») ; écritures de « n° 1 » (« n°1 », « nº 1 », « N° 1 », « numéro 1 », « numéro un ») et de « #1 » (« # 1 ») ; en anglais « No. 1 », « No 1 » | **oui, toutes** |
| 3 | « leader » : le site anglais dit « School leaders » pour la direction (sept fois) et « Leaderboard » pour le classement. Que refuse le test ? | le mot « leader » au singulier (fr et en), et « leaders du marché » / « market leaders » ; « School leaders », « its leaders » et « Leaderboard » restent | **validé** (le singulier et « du marché ») |

## 6. Sécurité et exigences produit

- Aucune donnée, aucune route, aucune migration : un test et une phrase.
- **M15** : la règle « pas de n° 1 sans preuve » devient un test, comme les pays (D3) et l'IA (D2).
- **EP-11** : la phrase change en français et en anglais ; l'arabe garde sa clé vide.
- **EP-16** : aucun texte en dur ; tout reste dans `i18n/`.

## 7. Fichiers modifiés

| Fichier | Ce qui change |
|---|---|
| `vitrine/tests/contenu.test.js` | le test des superlatifs, le test de la règle, la phrase exacte |
| `vitrine/src/i18n/fr/emploi-du-temps.json`, `vitrine/src/i18n/en/emploi-du-temps.json` | `calcul.texte` (question 1, validée) |
| `docs/plan/modules/VIT-site-vitrine.md` | la ligne de VIT-18b |
| `docs/sessions/2026-11-21-fix-vit-18b-superlatifs.md` | la fiche de session |

## 8. Étapes

1. Ce plan, commité seul.
2. Les questions 1 à 3 au chef ; ses réponses dans le § 5 et la ligne « Validé », commitées.
3. Le test, puis la phrase ; vérifier que le test échoue avant la phrase et passe après.
4. `npm run test:unit`, `npm run build`, `node scripts/verifier-neutre.mjs` ; fiche de session.
