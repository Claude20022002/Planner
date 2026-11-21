# Mission · QUA-10 · aucun envoi sortant par défaut (étape 6 et PR)

| | |
|---|---|
| État | étapes 2 à 6 faites ; #241 relue, prête dès que `main` est vert |
| Agent | Codex (reprise : la session d'origine est close) |
| Modèle recommandé | son modèle le plus fort : envois sortants, réglages du serveur, note de mise à jour |
| Attribuée le | 2026-11-21, par le coordinateur ; accord du chef : plan validé le 16 nov., hors chantier (exception du 16 nov.) |
| Module et chantier | [QUA](../modules/QUA-qualite-docs.md) · hors chantier, accord du chef |
| Fonction | QUA-10 : l'IA, le courriel et le push n'ont plus de destination implicite ; le push est générique par défaut ; le serveur résume ses envois au démarrage · taille M |
| Branche | `feat/qua-10-envois-explicites` (locale, 9 commits, `2903bb8d`) |
| Dossier de travail | `..\travaux-planner\qua-10-envois-explicites` |
| Plan de conception | `docs/conception/qualite/qua-10-envois-explicites.md` (sur la branche) · **validé par le chef le 16 nov.** |

## Ce qui reste (fiche de session du 18 nov., « Reste à faire »)

1. Attendre la fusion de #189 (QUA-09, qui contient #186 et #188) : c'est l'agent de Cursor qui la met à jour (mission [fusion-etudes](fusion-etudes.md), n° 3).
2. `git merge origin/main` dans la branche.
3. Étape 6 : mettre à jour `docs/envois-sortants.md` (plus de destination implicite pour l'IA et le courriel, push générique par défaut, `PUSH_CONTENU`, résumé au démarrage) et `.env.docker.example` (selon la réponse 1 du plan) ; la ligne QUA-10 du module QUA ; la case « et le résumé du démarrage » du modèle de PR (plan, § 10).
4. Relancer la suite du serveur et les tests unitaires du site ; fiche de session ; dire au coordinateur que c'est prêt. Le chef pousse et ouvre la PR.
5. **Note du paquet de mise à jour**, dans la PR (plan, § 6) : une installation qui comptait sur un défaut cesse d'envoyer ; ajouter `IA_URL` et `IA_MODELE`, `IA_<NATURE>_URL` et `SMTP_HOST` au `.env` ; le push passe au texte générique.

## Périmètre d'écriture

Les fichiers déjà touchés par la branche, `docs/envois-sortants.md`, `.env.docker.example`, `.github/pull_request_template.md` (une case), le module QUA et la fiche de session. Pas `docs/plan/suivi.md`.

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-21 | branche retrouvée au tour d'état : plan validé, étapes 2 à 5 codées, jamais poussée, absente de `suivi.md` ; fusion avec `main` sans conflit à ce jour | à finir |
| 2026-11-21 23 h 10 | #241 relue, étape 6 comprise (`docs/envois-sortants.md`, `.env.docker.example`, modèle de PR, module QUA) : **prête** ; sa seule CI rouge (`/ar/`) vient de `main`. Avant le déploiement, le `.env` du serveur nomme ses destinations (IA, médias, courriel) | prête |
