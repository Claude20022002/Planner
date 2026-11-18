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

## Les quatre conditions avant la mise en ligne (chef, 18 nov.)

1. **Audit de `vitrine/`** et montée d'Astro le 27 nov. (plan de l'audit, § 6), avec `node ../scripts/audit.mjs vitrine` dans `vitrine.yml`.
2. **Mentions légales et page de confidentialité**, sans formulaire ni mesure d'audience. Leur texte est une décision du chef (textes légaux, Q-11).
3. **Les SVG officiels des logos**, à la place des logos redessinés.
4. **Site non indexé** tant qu'il est sur le sous-domaine (`noindex` et `robots.txt`).

Le plan peut s'écrire et se valider maintenant. Le déploiement attend les quatre conditions.

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
