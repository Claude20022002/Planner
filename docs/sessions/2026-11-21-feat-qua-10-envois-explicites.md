# Session du 21 novembre 2026 · QUA-10 · `feat/qua-10-envois-explicites`

| | |
|---|---|
| Agent | Codex |
| Chantier | QUA-10, exception autorisée le 16 novembre |
| Dossier | `..\travaux-planner\qua-10-envois-explicites` |
| Dernier commit fonctionnel | `64fd2ecd` |

## Objectif et réalisation

Terminer l’étape 6 du [plan validé](../conception/qualite/qua-10-envois-explicites.md) après la fusion de QUA-09 (#189).

- `d90602f6` intègre `origin/main` à `95d532c9` dans la branche locale.
- `64fd2ecd` met à jour la [liste publique des envois](../envois-sortants.md), le modèle Docker, la case du modèle de PR et le module QUA. Les deux mentions de pdf.js dans le plan renvoient désormais à MOB-09.
- Le choix de la fiche du 18 novembre est appliqué. Dans `.env.docker.example`, `SMTP_HOST` est vide et l’exemple Gmail est en commentaire.

## Vérifications sur la branche

| Vérification | Résultat |
|---|---|
| Tests unitaires du serveur | 517/517, 35 suites |
| Intégration du serveur sur MySQL 8.4.13 jetable | 630/630, 63 suites. Jest en série, délai de 120 s et mémoire Node de 8 Gio |
| Tests unitaires du site | 86/86 |
| Neutralité et `git diff --check` | Réussis |
| Parcours complets Windows, Chromium et solveur local | 71 réussis sur 74 au premier passage, 2 en échec et 1 non exécuté |
| Relance ciblée sur base neuve avec les délais du projet | 3/3. Les 74 parcours ont chacun réussi au moins une fois |

Au premier passage, `affectations.spec.cjs` a dépassé 90 s au chargement de la connexion. Dans `studioQuiz.spec.cjs`, les deux lignes « Réussi » attendues étaient absentes après 5 s. Le projet IIIA dépend du succès de Chromium. La relance de ces trois fichiers a réussi.

## Les quatre échecs signalés le 18 novembre

Comparaison sur le même poste et avec les mêmes dépendances frontend, une base jetable distincte par passage. Le premier essai du témoin a révélé une ancienne installation sans `lucide-react`. Les chiffres ci-dessous proviennent des passages avec les dépendances du verrou actuel, copiées dans chaque dossier frontend à tour de rôle. Sur QUA-10, « Personnes » vient après les autres parcours. Sur le témoin, il ouvre la série ciblée.

| Scénario | QUA-10 dans la série complète | `main` à `95d532c9`, série ciblée |
|---|---|---|
| Personnes, clair, 1280 px | réussi | délai global de 30 s au chargement de la connexion |
| Personnes, sombre, 390 px | réussi | délai global de 30 s au moment de donner le focus |
| Personnes, sombre, 1280 px | réussi | réussi |
| Report, ligne 75 | réussi | réussi |

Sur le témoin, les deux fichiers totalisent 7 réussites sur 10. La troisième expiration y concerne « Personnes », clair à 390 px. Les délais de « Personnes » se produisent donc aussi sur `main`. L’échec du report du 18 novembre ne s’est reproduit sur aucune des deux versions. La CI des parcours de ce même commit de main a réussi. [Exécution GitHub](https://github.com/Claude20022002/Planner/actions/runs/44937535396/job/136947368597)

## Note de mise à jour à reprendre dans la PR

Si l’installation utilisait une destination implicite, compléter son fichier d’environnement pour conserver les envois. Le texte compatible OpenAI demande `IA_URL` et `IA_MODELE`. Pour chaque média activé, régler `IA_IMAGE_URL`, `IA_VOIX_URL` ou `IA_TRANSCRIPTION_URL`. Le courriel SMTP demande `SMTP_HOST`. Au démarrage, le journal indique les réglages manquants. Le push Expo passe automatiquement au texte générique. L’exploitant peut choisir `PUSH_CONTENU=complet` à la demande de l’école.

## État et commandes pour le chef

Étape 6 terminée localement. Le chef publie la branche, ouvre la PR avec la note ci-dessus et vérifie la CI. Aucune question en suspens sur QUA-10. Le coordinateur tient le suivi selon la fiche de mission.

```powershell
git -C "..\travaux-planner\qua-10-envois-explicites" push -u origin feat/qua-10-envois-explicites
gh pr create --base main --head feat/qua-10-envois-explicites --title "QUA-10 · Rendre explicites les envois chez un tiers" --web
```

## Prompt de reprise

> Reprends QUA-10 dans `..\travaux-planner\qua-10-envois-explicites`, branche `feat/qua-10-envois-explicites`. Lis la fiche du 21 novembre et la consigne du coordinateur. Les six étapes sont livrées. Vérifie la PR et sa CI après publication par le chef. Pour la mission suivante, lis la boîte Codex et l’état de #237 avant de reprendre VIT-11.
