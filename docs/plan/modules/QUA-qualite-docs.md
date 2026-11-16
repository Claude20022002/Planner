# QUA · Qualité du code, tests et documentation

**Objet** : ce qui garde le projet sain, quel que soit le module :
- règles de code ;
- tests et CI ;
- choix de la pile ;
- documentation d'entrée ;
- branches mortes ;
- données à ne pas versionner.

## Ce qui existe

- **Règles de code** : dans [README du plan, § 5](../README.md). La règle `max-lines` de `backend/eslint.config.js` signale les fichiers trop longs, en avertissement. La règle R-2 (#137) limite l'accès à la base à `models/`.
- **Tests** :
  - unitaires du serveur, plus de 270 ;
  - intégration du serveur sur MySQL 8.4, plus de 500 ;
  - site ;
  - application mobile ;
  - solveur ;
  - parcours de démonstration (Playwright) dans la CI ;
  - le modèle des tests locaux est dans `DEPLOIEMENT.md`.
- **CI** : `.github/workflows/ci-cd.yml`. **`main` n'est pas protégée** : on a déjà fusionné une PR rouge (#127).
- **Signalement des failles** : `SECURITY.md` à la racine (QUA-08) : signalement privé de GitHub, 7 jours et 90 jours au plus. Le formulaire du site viendra avec VIT-02.
- **Documentation d'entrée périmée** :
  - `README.md` : nombres de tests anciens ; « retrait du multi-tenant », contraire au plan ; devoirs pour les étudiants ;
  - `PRODUCT.md` : « jury PACTE » ; « pas d'application mobile » ; deux bâtiments d'HESTIM.
- **Pile** : confirmée le 13 novembre, sous condition que D-01 tienne ([pile.md](../../conception/qualite/pile.md)) ; montées de version listées, non décidées.
- **Contrôleurs trop longs** : `authController` (759 lignes), `statistiques` et `emploiDuTemps` (512 chacun), `etudiant` (443).
- **Données personnelles** : `docs/users.xlsx` (noms, adresses, mots de passe) a été retiré de l'arbre le 7 novembre, mais **il reste dans l'historique d'un dépôt public**.
- **Envois sortants** (code lu le 15 nov.) : IA (`backend/services/ia/client.js`), notifications par Expo (`backend/services/push.js`), courriel (`backend/utils/sendEmail.js`), sauvegardes vers B2 (`deploy/vps/sauvegarder.sh`). Aucune télémétrie ; Sentry n'est qu'un commentaire. Liste publique : [docs/envois-sortants.md](../../envois-sortants.md) (QUA-09, 16 nov.), avec le push actif sans réglage et les destinations par défaut de l'IA et du courriel ; case « envoi sortant » dans le modèle de PR.
- **Signalement des failles** : pas de `SECURITY.md`.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| QUA-01 | `README.md` et `PRODUCT.md` à jour : produit pour toute école, modules, tests, installation | R-4, I-1 de la revue | libre | M | — | à faire |
| QUA-02 | Découper les contrôleurs trop longs, sans changer leur comportement, chacun couvert par ses tests | A-6 | libre | M par contrôleur | — | à faire |
| QUA-03 | Clore l'étude de la pile : une page de critères, la décision du 4 novembre (rien ne change) confirmée ou rouverte | A-4 de la revue | 1 | S | — | en cours : étude faite le 13 nov. ([pile.md](../../conception/qualite/pile.md)), à fusionner |
| QUA-04 | Reste des dates : plus aucun `toISOString().slice(0,10)` (dans `exportEmploiDuTemps.js`) | B-2 | libre | S | — | à faire |
| QUA-05 | Supprimer les branches et les dossiers de travail morts, après vérification de leur contenu ; fermer #40 | C-1, P-57 | libre | S | — | à faire |
| QUA-06 | `docs/users.xlsx` : si les personnes sont réelles, prévenir l'école, changer les mots de passe des comptes concernés s'ils existent encore, puis décider de la réécriture de l'historique (Q-14) | 0-1, A-1 | 0 | S | — | fait : personnes fictives, décision du 8 nov. |
| QUA-07 | Protéger `main` : CI verte exigée avant de fusionner (Q-15) | — | 0 | S | — | fait : 6 contrôles exigés, constaté le 8 nov. |
| QUA-08 | `SECURITY.md` (comment signaler une faille, délai de réponse) et signalement privé de GitHub ouvert sur le dépôt (décisions du 15 et du 16 nov.) | — | libre | S | — | en cours ([plan](../../conception/qualite/qua-08-security.md)) |
| QUA-09 | Liste publique des envois sortants de Planner : destinataire, données envoyées, raison (EP-13, décision du 15 nov.) | — | libre | S | — | en cours ([plan](../../conception/qualite/qua-09-envois-sortants.md), validé le 16 nov.) : liste écrite, à fusionner |
| QUA-10 | Aucun envoi implicite chez un tiers : (a) plus de destination par défaut vers DeepSeek (texte de l'IA), OpenAI (médias) ni `smtp.gmail.com` (courriel) une fois la clé ou le compte réglé ; (b) push : contenu envoyé à Expo réduit par défaut, ou push activé par l'école (choix dans le plan) ; décider pour pdf.js chargé depuis cdnjs (EP-13, décision du 16 nov.) | — | libre | S | QUA-09 | plan en cours (hors chantier, accord du chef le 16 nov.), `feat/qua-10-envois-explicites` |
| QUA-11 | Aucune adresse réelle dans `deploy/` : les adresses de l'installation écrites en dur dans `deploy/vps/appliquer-maj.sh` et `appliquer-quiz.sh` sont lues dans le `.env` du serveur ; `scripts/verifier-neutre.mjs` lit aussi `deploy/` (décision du 16 nov.) | — | libre | S | — | à faire |

## Critères de « terminé »

- **QUA-01** : une personne nouvelle installe le projet en local avec le seul `README.md`.
- **QUA-03** : chaque partie de la pile a son verdict, appuyé sur des faits datés et sourcés ; la décision du 4 novembre est confirmée ou rouverte dans [decisions.md](../decisions.md), avec ses conditions de réouverture ; PLA-01 ne dépend plus de QUA-03.
- **QUA-02** : aucun contrôleur ne dépasse 200 lignes ; la suite complète passe sans changer un seul test.
- **QUA-05** : `git branch -a --no-merged main` ne liste que des branches en cours, chacune avec sa ligne dans [suivi.md](../suivi.md).
- **QUA-07** : une PR rouge ne peut plus être fusionnée.
- **QUA-08** : `SECURITY.md` est sur `main` et promet un accusé de réception sous 7 jours, un correctif ou un avis publié sous 90 jours au plus (décision du 15 nov.) ; le chef a ouvert le signalement privé dans les réglages du dépôt.
- **QUA-09** : chaque envoi sortant trouvé dans le code (clients HTTP, SMTP, SDK de services) figure dans la liste ; le modèle de PR demande si la PR en ajoute un.
- **QUA-10** : une clé ou un compte sans adresse n'envoie rien, et le journal le dit ; aucun nom de personne ni motif ne part chez Expo sans que l'école l'ait choisi ; un test fige chaque point ; la liste des envois sortants est à jour.
- **QUA-11** : aucun nom de domaine réel dans `deploy/` ; `verifier-neutre` lit `deploy/` et échoue si une adresse réelle y revient ; `appliquer-maj.sh` et `appliquer-quiz.sh` vérifient toujours les mêmes adresses, lues dans le `.env`.

## Références

- Archives : [assainissement](../../archives/plans/assainissement.md), [revue d'architecte](../../archives/plans/plan-produit/06-revue-architecte.md), [état des lieux des branches](../../archives/plans/plan-produit/01-etat-des-lieux.md)
