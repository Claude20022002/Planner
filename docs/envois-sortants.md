# Envois sortants de Planner

<!-- Rôle : liste publique de tout ce que Planner envoie hors de son installation : destinataire, données, raison (QUA-09, exigence EP-13, décisions du 15 et du 16 novembre 2026). -->

**In English, briefly.** This page lists every place where Planner sends data outside its own installation: who receives it, what is sent, why, and how to turn it off. Planner sends **nothing to its authors**: no telemetry, no usage statistics, no hidden task. The third parties are an AI provider and an email server (only if the operator sets an account), the Expo push service (on by default), the backup storage chosen by the operator, and three requests made by the user's own device. Any pull request that adds an outgoing request must update this page. The rest of this page is in French.

Relu contre le code le 16 novembre 2026. Chaque ligne cite le fichier qui fait l'envoi.

## L'essentiel

- **Planner n'envoie rien à ses auteurs.** Aucune télémétrie, aucune statistique d'usage, aucune tâche cachée.
- Les envois vont chez des services que **l'exploitant** de l'installation choisit et règle : fournisseur d'IA, serveur de courriel, stockage des sauvegardes. Sans réglage, l'IA et le courriel n'envoient rien.
- **Une exception** : les notifications push de l'application mobile passent par le service Expo, **sans réglage**, dès qu'un téléphone s'est inscrit. Voir plus bas.
- Toute PR qui ajoute un envoi sortant met cette page à jour (case du modèle de PR).

## 1. Depuis le serveur de Planner

### Questions générées par l'IA

| | |
|---|---|
| Déclenché par | un enseignant qui demande des questions à l'IA (quiz, Studio) |
| Actif | **seulement si** l'exploitant a réglé une clé et un modèle (`IA_CLE`, `IA_MODELE`). Sinon, la fonction répond qu'elle n'est pas configurée et rien ne part |
| Destinataire | l'adresse `IA_URL`. Si elle est vide : DeepSeek (`api.deepseek.com`), ou Anthropic (`api.anthropic.com`) si `IA_FOURNISSEUR=anthropic` |
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
| Destinataire | l'adresse réglée. Si elle est vide : OpenAI (`api.openai.com`) |
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
| Données | le jeton du téléphone ; le **titre** (120 caractères au plus) et le **texte** (240 au plus) de la notification ; le lien vers l'écran concerné. Ces textes peuvent nommer une personne, un cours, une salle, et donner un motif : par exemple l'absence d'un enseignant avec son motif, ou une demande de changement de téléphone avec son motif |
| Raison | faire sonner le téléphone ; une application ne peut pas recevoir de notification sans passer par Google ou Apple |
| Pour l'éteindre | `PUSH_DISABLED=true` sur le serveur ; ou, pour une personne, refuser les notifications sur son téléphone |
| Code | `backend/services/push.js`, `backend/models/definitions.js` (chaque notification créée part aussi en push) |

Un changement est prévu (fonction QUA-10) : ne plus envoyer de nom ni de motif à Expo sans que l'école l'ait choisi.

### Courriels

| | |
|---|---|
| Déclenché par | invitation d'un nouveau compte ; mot de passe oublié ; annonce ; emploi du temps envoyé ; séance affectée, reportée, annulée ; conflit ; demande de report |
| Actif | **seulement si** l'exploitant a réglé un compte d'envoi (`EMAIL_USER` ou `SMTP_USER`). Sinon, le courriel est seulement écrit dans le journal du serveur |
| Destinataire | le serveur de courriel réglé (`SMTP_HOST`). S'il est vide : `smtp.gmail.com`. Puis la boîte du destinataire |
| Données | adresse et nom du destinataire ; liens secrets d'invitation et de réinitialisation du mot de passe ; corps de l'annonce et nom de son auteur ; séances, salles, dates |
| Raison | prévenir les personnes hors de l'application |
| Pour l'éteindre | laisser `EMAIL_USER` et `SMTP_USER` vides |
| Code | `backend/utils/sendEmail.js`, `backend/services/comptes.js`, `backend/controllers/authController.js`, `backend/services/annonces/annonces.js`, `backend/services/calendrier/envoiEdt.js`, `backend/utils/notificationHelper.js` |

Un changement est prévu (QUA-10) : sans adresse de serveur réglée, ne plus rien envoyer, au lieu de prendre Gmail ; de même pour l'IA.

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

Une PR qui ajoute, change ou retire un envoi sortant (appel à une adresse extérieure, nouveau service, nouveau SDK) met cette page à jour dans la même PR. Le modèle de PR le demande.
