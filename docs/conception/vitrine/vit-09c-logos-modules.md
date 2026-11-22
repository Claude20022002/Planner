# VIT-09c · Logos et illustrations des modules

Conception proposée le 22 novembre par Codex. Branche `feat/vit-09c-logos-modules`. Validation du coordinateur en attente. Le chef choisit le rendu sur échantillon.

## Objet et existant

Étendre les sept logos de VIT-09a à vingt. Quatre des sept couvrent déjà un module vendable (planning, activites, bibliotheque, annonces). Les trois autres représentent le socle. Préparer une illustration WebP pour chacun des dix-sept modules numérotés dans l’étude 15.

## Ce que disent les études

L’étude 15, §§4 et 7, fixe les identifiants métier et distingue la disponibilité des modules de leur présence au catalogue. Bibliothèque garde le numéro 5 et passe à l’étape 3. L’étude 13 §7 motive le budget de transfert sur réseau faible. L’étude 14 §1 invite à reprendre les usages en créant des dessins originaux. Le statut et le libellé traduits seront portés par les pages qui utilisent les fichiers.

## Proposition pour les treize nouvelles tuiles

| N° | Identifiant | Motif reconnaissable à 24 px | Ton de départ | Ton foncé |
|---|---|---|---|---|
|2|presences|feuille d’appel cochée|#286B54|#194838|
|3|cours|cahier ouvert à onglet|#346DA1|#20476D|
|7|vacataires|horloge sur feuille d’heures|#826035|#564020|
|8|evaluations|copie avec sceau|#705596|#493665|
|9|inscriptions|dossier à signe plus|#396F76|#25494E|
|10|documents|attestation à coin plié|#485D87|#2B3C5D|
|11|stages|mallette avec poignée|#99613F|#65402C|
|12|frais|tiroir de caisse|#677135|#434B21|
|13|formation|chevalet et jalons|#845275|#55364D|
|14|familles|maison et deux silhouettes|#995268|#623646|
|15|etat|fronton sur colonnes|#53677B|#354452|
|16|paiements|carte et flèche|#36746B|#204C46|
|17|pilotage|cadran avec aiguille|#53529B|#36346B|

Dans la famille applications de `shared/charte/jetons.json`, déclarer chaque paire app-ID et app-ID-fonce, incrémenter la version et inscrire les contrôles blanc/tuile (3:1 minimum aux deux extrémités). Le générateur lit les valeurs, vérifie les contrastes et produit les sorties déclarées par sa version. Exécuter `node shared/charte/generer.mjs` puis `node shared/charte/generer.mjs --verifier`. Examiner le diff des sorties, dont la feuille générée du site si son empreinte change. Faire confirmer son périmètre avant écriture (Q3).

## Fichiers, images et poids

Dans `shared/icones/modules/`, produire ID.svg (40–96 px) et ID-petit.svg (24–32 px), détails blanc, bleu-clair, bleu-nuit et jeu, identifiants internes préfixés vit-ID-. Étendre index.js, le test, le guide et generer-apercu.mjs dans shared/icones. Dans `shared/icones/images/`, une illustration carrée par identifiant vendable, motif en léger volume, fond uni, sans texte, personne réelle ou marque tierce.

Cible proposée pour **chacun des 17 WebP** : 512 × 512 px, 15 000 octets visés, plafond 20 000. Une image au plafond réserve au moins 180 000 octets aux autres ressources sur un budget conservateur de 200 000 octets. Dix-sept images au plafond dépasseraient déjà le budget. Pour le catalogue, prévoir les SVG et réserver l’image à la page détaillée selon le budget résiduel réel de VIT-19. Relever poids individuel et transfert total à froid lors de l’intégration. Réduire dimensions ou complexité si nécessaire.

Outil proposé : API Images OpenAI, modèle explicitement sélectionnable gpt-image-1.5. Utilisation commerciale envisagée sous le contrat professionnel applicable : droits sur les sorties attribués au client dans la mesure permise par la loi, droits nécessaires sur les entrées, résultats potentiellement similaires et relecture à la charge du client. Confirmer le compte et le coût avant tout appel facturé. Consigner modèle effectivement utilisé, date et conditions dans la fiche. [Modèle](https://developers.openai.com/api/docs/models/gpt-image-1.5) · [Contrat, §4](https://openai.com/policies/services-agreement/)

## Questions et étapes de validation

1. Les silhouettes et paires proposées conviennent-elles ? Montrer au chef le SVG Présences en petit et en grand, sur fond clair et sombre.
2. Quel traitement pour les images ? Présenter comme second essai le WebP Présences (feuille cochée en léger volume), coté et pesé, puis recueillir son choix avant la série.
3. Le coordinateur confirme-t-il le dossier images et les sorties imposées par le générateur hors de shared/charte ? Proposition : autoriser ces seules sorties mécaniques.
4. Quel accès de génération est autorisé ? Proposition : utiliser le modèle identifié si son coût est approuvé ou couvert, sinon soumettre un outil identifié au coordinateur avant l’essai.

Après validation du plan et intégration de VIT-11 dans la branche, produire les deux essais. Après accord sur le rendu, réaliser la série, vérifier les noms, les poids, le contraste et les SVG avec les tests charte et icônes. Générer l’aperçu, examiner les vingt logos à 24, 32, 48 et 96 px sur deux fonds puis les dix-sept images. Présenter la planche au chef avant le commit final. Mettre à jour la ligne du module et la fiche de session.

## Données, risques et retour arrière

Aucune donnée d’école ni migration. Réserver les formes distinctives aux usages métier, notamment cours face au référentiel pedagogie. L’intégration sur les pages relève des missions suivantes. Le retour arrière consiste à retirer les nouveaux fichiers et entrées puis à régénérer depuis la charte précédente.
