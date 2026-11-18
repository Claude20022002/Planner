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
