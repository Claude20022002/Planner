# Prompt de l'agent externe · VIT-20

Écrit par le coordinateur le 22 nov. 2026, sur la décision du chef (questions 19 et 20, `decisions.md`). À donner tel quel à l'agent Claude Code, ouvert à la racine d'un clone du dépôt, modèle **Claude Fable 5.2** (sinon Opus 5.5), effort élevé.

```text
Tu travailles sur Planner, un logiciel de gestion d'établissements d'enseignement (emploi du temps calculé, appel, quiz,
cours…). Dépôt GitHub public : Claude20022002/Planner. Le chef de projet est le compte Claude20022002 : lui seul fusionne.
Tu travailles en autonomie : personne ne répondra à tes questions pendant ta session. Tu dois avancer seul, proprement,
et livrer une branche que le coordinateur relira et que le chef fusionnera.

TA MISSION : VIT-20, la nouvelle structure du site vitrine (dossier vitrine/, site statique Astro, français et anglais),
sur le modèle d'odoo.com : barre à méga-menus (Applications, Établissements, Ressources, Contact), 17 modules vendables
en quatre catégories (5 avec une page, 12 en tuiles grisées « Bientôt »), une page par module disponible sur un gabarit
commun, une page « Inclus dans tout abonnement », un accueil resserré avec la grille des modules et une section
« Pourquoi Planner » animée et interactive, un pied de page en quatre colonnes. Tu fais les lots R0, B, A et C du plan,
dans cet ordre. Le lot D (bloc « Selon votre équipement ») n'est PAS pour toi : tu lui laisses sa place, vide.

1. LIRE, DANS CET ORDRE, AVANT TOUT
   - AGENTS.md et CLAUDE.md (règles de l'équipe ; les exceptions ci-dessous priment pour toi) ;
   - docs/conception/vitrine/vit-20-structure-du-site.md : LE PLAN, VALIDÉ PAR LE CHEF. C'est ta source de vérité ;
   - docs/plan/missions/vit-20-equipe.md : ton périmètre d'écriture et tes étapes ;
   - docs/plan/decisions.md (sections du 22 nov., et « 18 nov. » sur le site) ; docs/plan/modules/VIT-site-vitrine.md ;
   - docs/conception/vitrine/vit-14-comparatif.md (règle : aucun produit nommé sur le site) ;
   - le code de vitrine/ : src/components/socle/, src/components/catalogue/, src/i18n/langues.js, src/donnees/, tests/.
   Si le plan n'est pas encore sur main, lis-le sur origin/doc/coordination-2026-11-22.

2. EXCEPTIONS DU CHEF POUR TOI (elles remplacent les règles contraires d'AGENTS.md)
   - Le plan est validé : tu codes sans attendre un nouveau « validé ».
   - Tu POUSSES, mais seulement ta branche feat/vit-20-structure-du-site, et tu ouvres la PR vers main.
     Jamais de push sur main ni sur une autre branche, jamais de --force, jamais de fusion de PR.
   - Tu ne poses pas de questions bloquantes : pour tout point que le plan ne tranche pas, applique la règle 4.

3. MÉTHODE
   - git fetch ; branche feat/vit-20-structure-du-site depuis origin/main à jour. Node 22.23.4 ou plus.
   - Avant de coder chaque étape, écris en tête de ta fiche de session (docs/sessions/AAAA-MM-JJ-feat-vit-20-structure-du-site.md,
     modèle docs/plan/modeles/fiche-de-session.md) ce que tu vas faire et les fichiers que tu vas toucher.
   - Étapes, un ou plusieurs commits chacune, poussés à la fin de chaque étape :
     R0 = le contrat commun du § 5 du plan (donnees/modules.js avec les 17 modules de l'étude 15, donnees/site.js,
          langues.js, libellés du § 4.7 dans i18n/*/commun.json, i18n/*/modules.json, GrilleModules et TuileModule,
          squelette de PageModule avec un emplacement vide pour le lot D, equipement.json vides, modules.test.js).
          Après R0 : ouvre la PR en brouillon (gh pr create --draft), titre « VIT-20 : structure du site sur le modèle d'Odoo ».
     B  = pages de module, page /socle/, catalogue rangé par module, redirections (astro.config.mjs), pages de fonction
          supprimées, liens mis à jour (§ 4.4 et § 4.6).
     A  = en-tête, trois méga-menus en <details> (clavier, toucher, sans JavaScript), pied de page (§ 4.2 et § 4.5).
     C  = accueil (§ 4.3) et « Pourquoi Planner » interactif et animé (§ 4.8) : îlot React avec motion (déjà installé),
          tableau de repli sans JavaScript, mouvement réduit respecté, client:visible.
   - Commits en français, petits, avec git add <fichiers> (jamais git add .). Pas de rebase ni d'amend après un push :
     pour reprendre main, git merge origin/main.
   - Code : fichiers courts (composant 150 lignes, page 80, aucun fichier au-delà de 300), 160 caractères par ligne au plus,
     commentaire de rôle en tête de chaque fichier, noms en français, comme le code existant. Aucune dépendance nouvelle.

4. QUAND LE PLAN NE DIT RIEN
   - Choisis l'option la plus prudente qui respecte le plan : aucun texte nouveau sur le produit, aucune promesse,
     aucun nom de produit, d'école, de pays ou de personne, aucun prix, aucun chiffre d'usage, aucun témoignage.
     Un texte manquant se prend dans les textes existants du site (i18n/*.json), jamais inventé.
   - Note chaque choix dans un tableau « Choix faits sans le chef » de ta fiche de session et de la PR :
     question, option retenue, autre option, fichier touché. Le chef tranchera à la relecture.
   - ARRÊTE-TOI (commit, push, explique dans la PR) seulement si tu dois : écrire une phrase nouvelle sur le produit,
     toucher un fichier hors de ton périmètre, ajouter une dépendance, ou faire une chose irréversible.

5. CONTRÔLES, À LANCER AVANT CHAQUE PUSH (depuis vitrine/, sauf mention)
   npm ci ; node ../scripts/verifier-neutre.mjs ; npm run test:unit ; npm run build ; node scripts/verifier-poids-ep19.mjs ;
   parcours des menus : (cd ../frontend && npm ci && npx playwright install chromium) puis node --test tests/*.parcours.cjs.
   Vérifie aussi à l'œil (npm run preview) à 390, 768 et 1440 px, au clavier, et avec JavaScript coupé.
   Un test rouge ne se contourne pas : corrige, ou explique dans la PR pourquoi il reste rouge.
   Écris les tests du § 8 du plan. Ne commite aucune capture d'écran.

6. RIEN DE RÉEL, RIEN DE SECRET
   Le dépôt est public : aucune adresse, aucun nom de personne ou d'école, aucun jeton. Aucun appel à un service extérieur
   depuis le site. Tu ne touches ni au serveur, ni aux secrets, ni aux réglages du dépôt.

7. FIN DE SESSION (même si tu n'as pas tout fini)
   - Fiche de session complète : fait (commits), vérifié (commandes et chiffres), choix faits sans le chef,
     phrases relevées sur la Bibliothèque, reste à faire, et un prompt de reprise pour un autre agent.
   - Mets à jour la ligne VIT-20 de docs/plan/modules/VIT-site-vitrine.md. Ne touche pas docs/plan/suivi.md.
   - Pousse ta branche. Décris la PR : ce qui est fait, lot par lot ; les contrôles et leurs résultats ;
     le tableau des choix ; ce qui reste. Sors-la du brouillon seulement si R0, B, A et C sont faits et tous les contrôles verts.
   - Termine ta réponse par : le dernier sha poussé, l'état de la PR, et ce qui reste.
```

## Notes pour le chef (hors prompt)

- **Avant de l'envoyer** : viser le plan v2 ; fusionner la PR de `doc/coordination-2026-11-22` (pour que le plan soit sur `main`), puis #254 et #223 ; ajouter le compte GitHub du proche comme collaborateur (rôle **Write**, pas Admin).
- **Protection de `main`** : aujourd'hui, elle exige six contrôles mais pas de PR. Avec un collaborateur, ajouter « Require a pull request before merging » (une approbation) dans *Settings → Branches → main*, pour qu'aucun push direct sur `main` ne soit possible.
- **À la fin** : le coordinateur relit la branche (`relecture-branche`), prend les captures « après » et les compare à celles d'avant et à celles d'Odoo, puis vous donne le verdict et la commande de fusion.
- **Retirer l'accès collaborateur** après la fusion, si la collaboration ne continue pas.
