# Session du 18 novembre 2026 · VIT-06 · `feat/vit-06-code`

| | |
|---|---|
| Fait par | Codex |
| Chantier | EXP, vitrine publique VIT |
| Dossier de travail | `..\travaux-planner\vit-06-code` |
| Base | `6911d754` (`origin/main`, fusion de la PR #212) |
| Commit d’implémentation | `6ba5c45f` |

## Objectif et plan

Préparer l’image Nginx, sa recette CI, sa publication conditionnelle et son déploiement
indépendant sur le VPS. Le [plan validé](../conception/exploitation/vit-06-mise-en-ligne.md)
et la [fiche de mission](../plan/missions/vit-06-mise-en-ligne.md) sont complétés par
la consigne Codex du 18 novembre à 20 h 40. Le chef déploiera après les neuf conditions.

## Fait

- `6ba5c45f` ajoute Nginx sans privilège sur le port 8080, une CSP avec empreintes générées par page,
  les en-têtes, `robots.txt` et le cache selon le nom de fichier.
- La CI garde ses contrôles Astro et l’artefact `dist/`. Elle teste l’image et transfère cette
  image au job Docker Hub après succès sur `main`. Les deux secrets conditionnent la publication
  sous le SHA complet. Le résumé GitHub Actions contient le digest publié.
- Le profil Compose `vitrine`, désactivé par défaut, route par Traefik sur `n8n_default`.
  Le [guide](../../DEPLOIEMENT.md#vitrine-publique-sur-le-vps-vit-06) couvre l’activation,
  le contrôle et le retour arrière. Les fiches VIT et EXP sont à jour.

## Vérifié localement

| Contrôle | Résultat |
|---|---|
| Astro | 59 tests réussis, build de 37 pages, audit des dépendances livrées sans vulnérabilité et contrôle de neutralité réussi |
| Nginx | Build Docker et `nginx -t` réussis. Routes, redirection relative, 404, `robots.txt`, CSP, HSTS simulé via `X-Forwarded-Proto`, `noindex`, MIME, cache et ETag vérifiés |
| Chromium | 37 pages sur l’image candidate, menu mobile et animations vérifiés. Aucun refus CSP ni appel externe pendant la recette |
| Médias VIT-08 | Dans une copie temporaire avec la PR #216, 9 ressources image/vidéo vérifiées. Les WebM et MP4 répondent aux requêtes partielles et les 3 accueils lisent la vidéo |
| Compose | Bloc CI testé localement avec `jq`. 17 services habituels et profil VIT inactif par défaut. Digest, réseau, route et absence de ports ou volumes vérifiés pour le service activé |
| CI et transfert | `actionlint` 1.7.12 valide le workflow. Diff Git sans erreur. Archive Docker compressée rechargée avec le même identifiant d’image |

Les pages légales, les logos officiels et VIT-08 restent à vérifier sur la version de `main`
retenue pour le déploiement. La copie temporaire a servi uniquement à la recette multimédia.
GitHub Actions et la publication Docker Hub attendent l’ouverture de la PR et un push admissible
du chef. Le HTTPS public et le retour arrière se vérifient lors du déploiement.

## État pour le coordinateur

VIT-06 est implémentée et vérifiée localement. Vérification CI de la PR, puis les neuf conditions
avant déploiement. Le coordinateur reporte cet état dans `docs/plan/suivi.md`.

## Commandes pour le chef de projet

~~~powershell
git -C "..\travaux-planner\vit-06-code" push -u origin feat/vit-06-code
gh pr create --base main --head feat/vit-06-code --title "VIT-06 : préparer la mise en ligne de la vitrine" --fill
~~~

## Prompt de reprise

~~~text
Reprends VIT-06 sur feat/vit-06-code dans ..\travaux-planner\vit-06-code.
Lis AGENTS.md, la fiche docs/sessions/2026-11-18-feat-vit-06-code.md et le plan validé
docs/conception/exploitation/vit-06-mise-en-ligne.md.
L’image Nginx, les en-têtes, robots.txt, la CI conditionnelle et le profil Compose sont implémentés.
Contrôle la CI de la PR et teste la version candidate avec les contenus fusionnés sur main.
Le chef crée les deux secrets Docker Hub, relève le digest du SHA choisi et suit DEPLOIEMENT.md
après les neuf conditions du plan. Le coordinateur tient suivi.md.
Commits locaux uniquement pour l’agent. Le chef pousse et lance les commandes du serveur.
~~~

## Reprise du 18 novembre · contrôle avant déploiement

**Déploiement bloqué.** La [PR #221](https://github.com/Claude20022002/Planner/pull/221) est ouverte sur `261ea4dbfe120813754b6c0d8952de3ff552af58`. Le `main` consulté est `6911d7542f2015fffde55e5a869314094e194244`. Aucun digest candidat n’a pu être confirmé. Ce `main` utilise encore le workflow antérieur à la publication Docker Hub. L’API publique des tags du dépôt Docker Hub a répondu 404.

Le [job vitrine](https://github.com/Claude20022002/Planner/actions/runs/44397095319/job/135129795925) a réussi l’installation, l’audit des dépendances livrées, le contrôle de neutralité, les tests, le build Astro et le dépôt de l’artefact. Il échoue à « Vérifier le profil Compose » avec le code 1. L’étape Nginx est ignorée après cet échec. La publication est ignorée par conception sur la PR. En local, Compose v5.6.1 a rendu les 17 services habituels et le service vitrine sous profil avec l’hôte, le réseau, le port interne et le digest factice attendus. Le journal détaillé de l’étape est nécessaire pour attribuer l’échec sur le runner.

Au dernier relevé de la [CI générale](https://github.com/Claude20022002/Planner/actions/runs/44397095300), le frontend, le mobile, le solveur et les scripts d’exploitation sont verts. Le backend et les parcours de démonstration sont en cours.

| # | Condition | État et preuve |
|---|---|---|
| 1 | Audit complet et montée d’Astro | Bloquée jusqu’au 27 novembre au plus tôt. La PR lance `npm audit --omit=dev --audit-level=high`. Le contrôle demandé `node ../scripts/audit.mjs vitrine` reste à voir passer sur le SHA retenu après la montée. |
| 2 | Mentions légales et confidentialité | Les deux routes sont absentes de `main`. L’approbation des textes par le chef et la vérification du site livré sans formulaire ni mesure d’audience restent à établir. |
| 3 | SVG officiels | [PR #220](https://github.com/Claude20022002/Planner/pull/220) ouverte. Vérifier les SVG intégrés dans l’image retenue après fusion. |
| 4 | Non-indexation | La recette locale précédente a vérifié `X-Robots-Tag: noindex` et `robots.txt`. Le job Nginx de #221 a été ignoré. Refaire le contrôle sur le digest retenu, y compris les routes de langue et la 404. |
| 5 | VIT-07, toutes les applications | [#214](https://github.com/Claude20022002/Planner/pull/214) et [#217](https://github.com/Claude20022002/Planner/pull/217) fusionnées et pages présentes sur `main`. Vérifier le contenu et les liens dans l’image retenue. |
| 6 | VIT-08, vidéo de présentation | [PR #216](https://github.com/Claude20022002/Planner/pull/216) ouverte. La recette locale précédente porte sur une copie temporaire. Vérifier la lecture et les en-têtes WebM et MP4 sur le digest retenu. |
| 7 | VIT-09, illustrations | Livraison de VIT-09 non établie sur `main`. Vérifier sur chaque page les images, leurs types MIME, le cache et la CSP dans l’image retenue. |
| 8 | VIT-10, pages par rôle | [PR #219](https://github.com/Claude20022002/Planner/pull/219) ouverte. Vérifier les pages, l’ouverture de « Solutions » et le pied de page après fusion. |
| 9 | VIT-11, catalogue et FAQ | [PR #218](https://github.com/Claude20022002/Planner/pull/218) ouverte pour le plan. Vérifier les pages françaises et anglaises et le repli arabe dans l’image retenue. |
| 10 | Complément décidé par le chef | `f4c5da36` et consigne du coordinateur de 21 h 05. Vérifier « avant → avec Planner » et FAQ par rôle (VIT-10b), « Pourquoi Planner » et regroupement par type d’établissement (VIT-13), méga-menu « Fonctions » par catégorie (VIT-11) et logos de modules (VIT-09). À vérifier sur l’image retenue. |

### Commandes pour le chef

Depuis un terminal où GitHub CLI est authentifié, récupérer le journal de l’étape rouge et suivre les contrôles.

~~~powershell
gh run view 44397095319 --job 135129795925 --log-failed --repo Claude20022002/Planner
gh pr checks 221 --watch --repo Claude20022002/Planner
~~~

### Prompt de reprise après le contrôle

~~~text
Reprends VIT-06 sur feat/vit-06-code. Lis le plan validé et la section Reprise de
docs/sessions/2026-11-18-feat-vit-06-code.md. Récupère le log du job Compose de #221,
identifie la commande en échec et soumets un plan court de correction selon AGENTS.md.
Après CI verte, fusions des contenus et audit Astro à partir du 27 novembre, relève le
SHA complet de main et le digest du job de publication, puis vérifie les dix conditions
sur l’image tirée par digest. Consigne les preuves. Le chef seul pousse et déploie.
~~~

## Diagnostic confirmé par le journal du runner

Le journal de « Vérifier le profil Compose » fourni par le chef indique
`env file …/.env.docker not found`. La commande `config --services` est le seul des trois
appels à `config` qui omet `--no-env-resolution`. Le fichier temporaire de test fournit
les valeurs d’interpolation, tandis que Compose cherche le fichier du service backend.
Le backend est désormais vert dans la CI générale. Les parcours étaient encore en cours
au relevé.

Le [complément de conception](../conception/exploitation/vit-06-mise-en-ligne.md#correctif-ci-compose-proposé-le-18-novembre--à-valider)
propose le correctif et sa recette sur un checkout propre. Le code attend la validation.

### Prompt de reprise après validation

~~~text
Reprends VIT-06 sur feat/vit-06-code. Après validation du complément « Correctif CI Compose »,
applique le correctif dans le workflow vitrine et rejoue la recette Compose sans .env.docker.
Le chef pousse sur la branche de la PR #221. Contrôle que Compose et Nginx passent, puis
reprends les conditions de la version candidate sur un digest publié depuis main.
~~~
