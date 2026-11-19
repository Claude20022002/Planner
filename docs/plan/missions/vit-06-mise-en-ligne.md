# Mission · VIT-06 · mise en ligne du site vitrine sur un sous-domaine

| | |
|---|---|
| État | ouverte : plan à écrire |
| Agent | **Codex**, après UIX-09 (réattribuée le 18 nov. à 13 h 45 : les modèles Claude ne sont pas dans le forfait Cursor du chef) |
| Modèle recommandé | le modèle le plus fort de Codex, avec un raisonnement élevé : c'est le serveur de production |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. (« dès qu'il est prêt on le déploie, d'abord sur un sous-domaine ») |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) et [EXP](../modules/EXP-exploitation.md) · le chantier EXP est ouvert ; la mise en ligne est accordée par le chef |
| Fonction | VIT-06 : servir le site statique `vitrine/` sur un sous-domaine, derrière Traefik, sans toucher à n8n ni à l'application · taille M |
| Branche | `feat/vit-06-mise-en-ligne`, depuis `origin/main` |
| Dossier de travail | `..\travaux-planner\vit-06-mise-en-ligne` |
| Plan de conception | plan court à écrire (`docs/conception/exploitation/vit-06-mise-en-ligne.md`) · **validé par le chef** : c'est le serveur |

## Les dix conditions avant la mise en ligne (chef, 18 nov.)

1. **Audit de `vitrine/`** et montée d'Astro le 27 nov. (plan de l'audit, § 6), avec `node ../scripts/audit.mjs vitrine` dans `vitrine.yml`.
2. **Mentions légales et page de confidentialité**, sans formulaire ni mesure d'audience. Leur texte est une décision du chef (textes légaux, Q-11). Rédigées par une nouvelle session Claude ([VIT-12](vit-12-pages-legales.md), chef, 18 nov. vers 20 h 35).
3. **Les SVG officiels des logos**, à la place des logos redessinés.
4. **Site non indexé** tant qu'il est sur le sous-domaine (`noindex` et `robots.txt`).
5. **Contenu complet** : toutes les applications présentées ([VIT-07](vit-07-contenu-complet.md)). Ajoutée par le chef le 18 nov.
6. **Vidéo de présentation globale** sur l'accueil ([VIT-08](vit-08-video-presentation.md)). Ajoutée par le chef le 18 nov. Le plan prévoit qu'elle est servie par le site, avec un en-tête de cache adapté.
7. **Les illustrations** sur toutes les pages : dessins en code, quelques captures réelles sans nom d'école ni donnée réelle, première section de chaque page améliorée ([VIT-09](vit-09-illustrations.md)). Ajoutée par le chef le 18 nov. vers 17 h 45. Les captures sont des images servies par le site : le plan de VIT-06 dit leur cache et la CSP `img-src 'self'`.

8. **Les pages par rôle**, le menu « Solutions » ouvrant et le pied de page complet ([VIT-10](vit-10-pages-par-role.md), agent de Cursor). Ajoutée par le chef le 18 nov. vers 18 h 35.
9. **Le catalogue des fonctionnalités et la FAQ** ([VIT-11](vit-11-catalogue-faq.md), Codex). Ajoutée par le chef le 18 nov. vers 18 h 35.

10. **Les ajouts d'après le site d'OpenEduCat** : « avant → avec » et FAQ des pages par rôle ([VIT-10b](vit-10b-avant-avec-faq.md)), « Pourquoi Planner » et les fonctionnalités par type d'établissement ([VIT-13](vit-13-pourquoi-et-types.md)), le méga-menu « Fonctions » ([VIT-11](vit-11-catalogue-faq.md)), le comparatif ([VIT-14](vit-14-comparatif.md)), une page par module ([VIT-15](vit-15-pages-modules.md)), Contact et À propos ([VIT-16](vit-16-contact-a-propos.md)), les logos illustrés et les icônes vivantes (VIT-09a). Ajoutée par le chef le 18 nov. vers 20 h 55, élargie vers 21 h 15.

Le plan peut s'écrire et se valider maintenant. Le déploiement attend les dix conditions.

## Ce que le plan doit établir

- Le service : par exemple une image Nginx ou Caddy qui sert `vitrine/dist`, construite par la CI. Où vit l'image (registre déjà employé, `claude20022002/…`) ?
- La place dans `deploy/vps/docker-compose.vps.yml` : limite de mémoire, journaux (ancre `journaux` de REL-06), réseau, étiquettes Traefik pour le sous-domaine, TLS.
- Les en-têtes de sécurité : CSP stricte (le site ne charge rien d'ailleurs), HSTS, `X-Content-Type-Options`, `Referrer-Policy`.
- Le contrôle sec (`docker compose … config`), le contrôle après déploiement (`curl` sur le sous-domaine, en-têtes, `noindex`), et le retour arrière.
- Ce qui ne change pas : n8n, l'application, ses ports.

## Périmètre d'écriture

L'agent peut écrire :
- le plan court, puis, après le « validé », `deploy/vps/docker-compose.vps.yml` (le service du site seul), un `vitrine/Dockerfile` et sa configuration de serveur web, `.github/workflows/vitrine.yml` pour la construction de l'image ;
- `docs/plan/modules/VIT-site-vitrine.md`, `docs/plan/modules/EXP-exploitation.md` et sa fiche de session.

Il ne touche pas :
- à **`docs/plan/suivi.md`**, que tient le coordinateur ;
- aux pages et composants du site ;
- au compose de n8n ;
- à tout le reste : s'il doit en sortir, il s'arrête et demande.

## Questions à poser au chef avec une proposition

1. **Quel sous-domaine ?** Le nom de domaine est la question Q-11.
2. L'image du site est-elle publiée sur le même registre que les autres ?
3. Qui écrit les mentions légales et la page de confidentialité, et qui les valide ?

## Prompt à donner à l'agent

```text
Ta mission suivante : VIT-06, la mise en ligne du site vitrine sur un sous-domaine. Plan court d'abord, pas de code.
Passe d'abord sur le modèle le plus fort de Cursor (c'est le serveur de production), et dis au chef sur quel modèle tu tournes.
Lis AGENTS.md, puis la fiche docs/plan/missions/vit-06-mise-en-ligne.md, sur la branche doc/coordination-equipe
(..\travaux-planner\coordination-equipe).
git worktree add "..\travaux-planner\vit-06-mise-en-ligne" -b feat/vit-06-mise-en-ligne origin/main
Pose au chef les trois questions de la fiche, avec tes propositions, puis écris le plan court
(docs/conception/exploitation/vit-06-mise-en-ligne.md). Commite-le seul. Le chef le valide : c'est le serveur.
Le déploiement attend les quatre conditions de la fiche. Ne modifie pas docs/plan/suivi.md.
Rapport « plan prêt, sha … » dans sortie\. Jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 13 h 30 | fiche écrite ; consigne déposée dans la boîte de l'agent de Cursor | — |
| 2026-11-18 13 h 45 | consigne retirée à l'agent de Cursor (pas de modèle Claude dans le forfait Cursor) ; mission passée à Codex, après UIX-09 | — |
| 2026-11-18 17 h 15 | plan court de Codex (`5a7a0067`) relu par le coordinateur : complet (Docker Hub, profil Compose, `noindex`, CSP, vidéo, retour arrière, six conditions), sans adresse IP dans le diff ; **validé par le chef** par l'outil de questions. Reste : ligne « Validé » et liste des secrets de CI à créer | **validé (chef)** |
| 2026-11-18 17 h 45 | 7e condition ajoutée par le chef : les illustrations ([VIT-09](vit-09-illustrations.md)). Consigne déposée pour Codex : intégrer la condition et les images au plan, sans nouveau visa (le reste du plan ne change pas) | — |
| 2026-11-18 18 h 40 | conditions 8 (VIT-10) et 9 (VIT-11) ajoutées par le chef ; Codex les inscrit au plan (#212) sans nouveau visa. #212 : CI verte, plan seul | prête, après ce commit |
| 2026-11-18 20 h 40 | décision du chef : **le code de VIT-06 se fait maintenant** (Codex, avant QJE-03, branche `feat/vit-06-code` après la fusion de #212) ; le déploiement, le jour où les neuf conditions sont réunies. Condition 2 confiée à VIT-12 ; condition 3 remplie par #220 | — |
| 2026-11-18 21 h | condition 10 ajoutée par le chef (VIT-10b, VIT-13, méga-menu de VIT-11) ; Codex l'inscrit dans le code de VIT-06 | — |
| 2026-11-19 0 h 20 | **conditions 11 et 12 ajoutées par le chef** : un contact réel (une adresse publiée, D1 ; VIT-16 ou la section Contact de l'accueil) et le saut du menu sur téléphone supprimé ([VIT-17](vit-17-correctifs-vitrine.md) ; performance mobile d'au moins 90 sur l'accueil). #221 : **CI du site encore rouge** au run de `89bac430` (« env file .env.docker not found », après le correctif `121c92c6`) et conflit d'une ligne sur le fichier du module VIT. À ajouter au code : la durée des journaux de la vitrine (Nginx et Traefik, `deploy/`), N jours fixé par le chef dans VIT-12 (question 9 de sa session) | à corriger |
