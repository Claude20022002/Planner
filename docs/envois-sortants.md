# Envois sortants de Planner

<!-- Rôle : liste publique de tout ce que Planner envoie hors de son installation : destinataire, données, raison (QUA-09, exigence EP-13, décisions du 15 et du 16 novembre 2026). -->

**In English, briefly.** This page lists every place where Planner sends data outside its own installation: who receives it, what is sent, why, and how to turn it off. Planner sends **nothing to its authors**: no telemetry, no usage statistics, no hidden task. The third parties are an AI provider and an email server (only when the operator configures the account and destination), the Expo push service (generic notification text by default), the backup storage chosen by the operator, and three requests made by the user's own device. Any pull request that adds an outgoing request must update this page. The rest of this page is in French.

Liste relue le 16 novembre 2026. Les envois du serveur ont été revérifiés le 21 novembre pour QUA-10. Chaque ligne cite le fichier qui fait l'envoi.

## L'essentiel

- **Planner n'envoie rien à ses auteurs.** Aucune télémétrie, aucune statistique d'usage, aucune tâche cachée.
- Les envois vont chez des services que **l'exploitant** de l'installation choisit et règle : fournisseur d'IA, serveur de courriel, stockage des sauvegardes. Sans réglage, l'IA et le courriel n'envoient rien.
- **Une exception** : les notifications push de l'application mobile passent par le service Expo, **sans réglage**, dès qu'un téléphone s'est inscrit. Voir plus bas.
- Au démarrage, le journal du serveur indique l’état de l’IA (texte, image, voix, transcription), du courriel et du push. Il précise la destination ou le mode actif et signale les réglages incomplets. Voir `backend/services/envois/resumeEnvois.js`.

## 1. Depuis le serveur de Planner

### Questions générées par l'IA

| | |
|---|---|
| Déclenché par | un enseignant qui demande des questions à l'IA (quiz, Studio) |
| Actif | **seulement si** l'exploitant a réglé une clé (`IA_CLE`), un modèle (`IA_MODELE`) et une destination. Sinon, la fonction répond qu'elle n'est pas configurée et rien ne part |
| Destinataire | `IA_URL`, obligatoire pour la famille `openai-compatible`. Le choix explicite `IA_FOURNISSEUR=anthropic` utilise `api.anthropic.com` si `IA_URL` est vide |
| Données | le sujet donné par l'enseignant ; le texte du support qu'il dépose ; la transcription d'un de ses médias ; les énoncés déjà présents dans le quiz (50 au plus), pour éviter les doublons ; les étiquettes du quiz |
| Ne part pas | aucune donnée d'élève (règle du projet) ; la clé reste sur le serveur |
| Raison | proposer des questions, que l'enseignant relit avant usage |
| Pour l'éteindre | laisser `IA_CLE` vide |
| Code | `backend/services/ia/client.js`, `backend/services/ia/quiz.js`, `backend/services/studio/iaGeneration.js` |

### Images, voix et transcription par l'IA (Studio)

| | |
|---|---|
| Déclenché par | un enseignant qui demande une image, une voix lue ou la transcription d'un média |
| Actif | **seulement si** clé, modèle et adresse sont réglés pour cette nature (`IA_IMAGE_*`, `IA_VOIX_*`, `IA_TRANSCRIPTION_*`) |
| Destinataire | l’adresse `IA_<NATURE>_URL` de la nature demandée. La fonction reste désactivée si cette adresse manque |
| Données | la description de l'image voulue ; le texte à lire ; le fichier audio ou vidéo de l'enseignant à transcrire |
| Raison | illustrer un quiz, produire une écoute, tirer des questions d'un média |
| Pour l'éteindre | laisser la clé de la nature vide |
| Code | `backend/services/studio/iaFournisseurs.js` |

### Notifications push de l'application mobile

| | |
|---|---|
| Déclenché par | **chaque** notification de Planner (annonce, séance annulée ou reportée, changement de salle, examen, devoir, quiz, demande à valider…) destinée à une personne qui a installé l'application |
| Actif | **par défaut**, sans réglage. Seul `PUSH_DISABLED=true` le coupe |
| Destinataire | le service Expo, qui transmet à Google (FCM, Android) ou à Apple (APNs, iPhone) |
| Données | le jeton du téléphone et le lien interne. Par défaut, le titre est le nom du produit et le texte est « Nouvelle alerte. Ouvrez l'application pour la lire. » Avec `PUSH_CONTENU=complet`, Expo reçoit le titre (120 caractères au plus) et le texte de la notification (240 au plus), qui peuvent contenir un nom ou un motif d’absence |
| Raison | faire sonner le téléphone ; une application ne peut pas recevoir de notification sans passer par Google ou Apple |
| Pour l'éteindre | `PUSH_DISABLED=true` sur le serveur ; ou, pour une personne, refuser les notifications sur son téléphone |
| Code | `backend/services/push.js`, `backend/models/definitions.js` (chaque notification créée part aussi en push) |

Avec le réglage par défaut `PUSH_CONTENU=generique`, la personne lit le détail en ouvrant l’application.

### Courriels

| | |
|---|---|
| Déclenché par | invitation d'un nouveau compte ; mot de passe oublié ; annonce ; emploi du temps envoyé ; séance affectée, reportée, annulée ; conflit ; demande de report |
| Actif | avec un compte et une destination. Sans compte, le courriel est écrit dans le journal du serveur. Avec un compte SMTP sans hôte, l’envoi échoue et son contenu reste hors du journal |
| Destinataire | le serveur `SMTP_HOST` avec les identifiants SMTP, ou Gmail choisi par `EMAIL_SERVICE=gmail` avec les identifiants `EMAIL_USER` et `EMAIL_PASSWORD`. Le serveur de courriel transmet ensuite le message au destinataire |
| Données | adresse et nom du destinataire ; liens secrets d'invitation et de réinitialisation du mot de passe ; corps de l'annonce et nom de son auteur ; séances, salles, dates |
| Raison | prévenir les personnes hors de l'application |
| Pour l'éteindre | laisser `EMAIL_USER` et `SMTP_USER` vides |
| Code | `backend/utils/sendEmail.js`, `backend/services/comptes.js`, `backend/controllers/authController.js`, `backend/services/annonces/annonces.js`, `backend/services/calendrier/envoiEdt.js`, `backend/utils/notificationHelper.js` |

**Mise à jour d’une installation existante.** Si elle utilisait une destination implicite, compléter son `.env` avant la mise à jour pour maintenir les envois. Renseigner `IA_URL` et `IA_MODELE` pour le texte compatible OpenAI, `IA_<NATURE>_URL` pour chaque média utilisé et `SMTP_HOST` pour le courriel SMTP. Le push passe automatiquement au texte générique.

## 2. Depuis l'appareil de l'utilisateur

Ces envois partent du navigateur ou du téléphone de la personne, pas du serveur.

| Envoi | Destinataire | Données | Quand | Code |
|---|---|---|---|---|
| Inscription aux notifications | Expo | le jeton du téléphone, l'identifiant du projet | à la connexion dans l'application, si la personne accepte les notifications | `mobile/src/push.js` |
| Lecteur de PDF (Android) | `cdnjs.cloudflare.com` | aucune donnée de l'école : le téléphone télécharge le programme pdf.js (contrôle d'intégrité). Le document reste sur le téléphone | à l'ouverture d'un PDF | `mobile/src/documents/Lecteur.jsx` |
| Bouton « Google Agenda » | Google | l'**adresse secrète** de l'agenda personnel ; Google lit ensuite l'emploi du temps de la personne, et ses mises à jour | **seulement si** la personne clique | `frontend/src/components/agenda/AbonnementAgenda.jsx` |

Le site ne charge aucun script, aucune police ni aucune image d'un autre domaine.

## 3. Depuis l'exploitation du serveur

| Envoi | Destinataire | Données | Raison | Code |
|---|---|---|---|---|
| Sauvegarde quotidienne, et journaux de la base | le stockage choisi par l'exploitant (outil rclone ; les scripts sont prévus pour Backblaze B2) | toutes les bases (Planner, bibliothèque, quiz) et les fichiers (documents, images des quiz), **chiffrés** avec une clé publique : la clé qui les relit n'est pas sur le serveur, et le stockage ne peut pas les lire | pouvoir restaurer une école après une panne | `deploy/vps/sauvegarder.sh`, `deploy/vps/sauvegarder-journaux.sh`, `deploy/vps/sauvegarde-commun.sh` |
| Battement de surveillance | le service de sonde choisi par l'exploitant (`BATTEMENT`) | une simple requête, sans donnée | être alerté si une sauvegarde ne s'est pas faite | `deploy/vps/sauvegarde-commun.sh` |

## 4. Ce qui n'envoie rien

- **Pas de télémétrie** : celle de Meilisearch (`MEILI_NO_ANALYTICS`) et du quiz (`TELEMETRY_ENABLED`) est coupée dans `docker-compose.yml`. Aucun service de suivi d'erreurs n'est branché.
- **Appels internes** : le serveur parle au solveur, à la bibliothèque et au quiz **à l'intérieur** de l'installation ; rien ne sort.
- Les images des conteneurs sont copiées sur le serveur ; il ne les télécharge pas lui-même.
- Après une mise à jour, les scripts d'exploitation appellent les adresses publiques de l'installation pour vérifier qu'elles répondent (`deploy/vps/appliquer-maj.sh`, `appliquer-quiz.sh`, `deployer.sh`). Aucune donnée ne part.
- Les scripts de développement (`scripts/`, `frontend/scripts/`) n'appellent que des services lancés en local.

## 5. Ce qui n'a pas été relu

- Le code de la bibliothèque (StudyLib) et du quiz (fork de ClassQuiz), qui ont leur propre dépôt. Seuls leurs réglages dans nos fichiers `docker-compose` ont été lus.
- Les images MinIO et Redis.
- Le relais HTTPS du serveur, qui n'appartient pas à Planner.

## Tenir cette page à jour

Une PR qui ajoute, change ou retire un envoi sortant (appel à une adresse extérieure, nouveau service, nouveau SDK) met à jour cette page et le résumé des envois au démarrage dans la même PR.
