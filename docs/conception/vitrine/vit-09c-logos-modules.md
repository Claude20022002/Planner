# VIT-09c · Logos et illustrations des modules

Conception proposée le 22 novembre par Codex. Branche `feat/vit-09c-logos-modules`. Plan validé par le coordinateur le 22 novembre à 11 h 02 avec les précisions ci-dessous. Le chef choisit le rendu sur échantillon.

## Objet et existant

Étendre les sept logos de VIT-09a à vingt. Quatre des sept couvrent déjà un module vendable (planning, activites, bibliotheque, annonces). Les trois autres représentent le socle. Préparer une illustration WebP pour chacun des dix-sept modules numérotés dans l’étude 15.

## Ce que disent les études

L’étude 15, §§4 et 7, fixe les identifiants métier et distingue la disponibilité des modules de leur présence au catalogue. Bibliothèque garde le numéro 5 et passe à l’étape 3. L’étude 13 §7 motive le budget de transfert sur réseau faible. L’étude 14 §1 invite à reprendre les usages en créant des dessins originaux. Le statut et le libellé traduits seront portés par les pages qui utilisent les fichiers.

## Proposition pour les treize nouvelles tuiles

| N° | Identifiant | Motif reconnaissable à 24 px | Ton de départ | Ton foncé |
|---|---|---|---|---|
|2|presences|feuille d’appel cochée|#2F7548|#1F4D2F|
|3|cours|cahier ouvert à onglet|#2F3475|#1F224D|
|7|vacataires|horloge sur feuille d’heures|#756E2F|#4D481F|
|8|evaluations|copie avec sceau|#542F75|#371F4D|
|9|inscriptions|dossier à signe plus|#2F7533|#1F4D22|
|10|documents|attestation à coin plié|#3E752F|#294D1F|
|11|stages|mallette avec poignée|#75592F|#4D3A1F|
|12|frais|tiroir de caisse|#53752F|#364D1F|
|13|formation|chevalet et jalons|#752F70|#4D1F4A|
|14|familles|maison et deux silhouettes|#752F3B|#4D1F27|
|15|etat|fronton sur colonnes|#752F4D|#4D1F32|
|16|paiements|carte et flèche|#67752F|#434D1F|
|17|pilotage|cadran avec aiguille|#672F75|#431F4D|

Pour chacune des treize nouvelles tuiles, vérifier au moins **14° de distance circulaire** en HSL entre son ton de départ et celui de chacune des dix-neuf autres. Le contrôle porte sur 169 paires (78 nouvelles entre elles et 91 avec les sept historiques). Les sept tuiles historiques sont conservées. Les deux extrémités de chaque nouveau dégradé offrent au moins 3:1 sur blanc.

Ajouter les paires dans la famille applications de `shared/charte/jetons.json`, augmenter version et régénérer avec `node shared/charte/generer.mjs`, puis vérifier avec `--verifier`. Le coordinateur autorise les sorties mécaniques hors de shared/charte, à lister dans le rapport. Entre VIT-09c et UIX-10e, la seconde branche à intégrer actualise sa base avec `git merge origin/main`, augmente à nouveau version et régénère toutes les sorties depuis les jetons.

## Fichiers, images et poids

Dans `shared/icones/modules/`, produire ID.svg (40–96 px) et ID-petit.svg (24–32 px), détails blanc, bleu-clair, bleu-nuit et jeu, identifiants internes préfixés vit-ID-. Étendre index.js, le test, le guide et generer-apercu.mjs dans shared/icones. Dans `shared/icones/images/`, une illustration carrée par identifiant vendable, motif en léger volume, fond uni, sans texte, personne réelle ou marque tierce.

Cible proposée pour **chacun des 17 WebP** : 512 × 512 px, 15 000 octets visés, plafond 20 000. Une image au plafond réserve au moins 180 000 octets aux autres ressources sur un budget conservateur de 200 000 octets. Dix-sept images au plafond dépasseraient déjà le budget. Pour le catalogue, prévoir les SVG et réserver l’image à la page détaillée selon le budget résiduel réel de VIT-19. Relever poids individuel et transfert total à froid lors de l’intégration. Réduire dimensions ou complexité si nécessaire.

Le chef a retenu ImageGen intégré à Codex, inclus dans son abonnement. Vérifier sa disponibilité avant le premier essai. Consigner dans la fiche la date, le modèle si son identifiant est exposé, et les conditions publiées.

## 7 ter. EP-18 : tous les contextes

| Contexte | Comportement | Vérification |
|---|---|---|
| A. Élève sans appareil | Sans objet pour le fichier image. Le nom du module est porté par la page. | Vérifier visuellement l’absence de texte dans l’image. |
| B. Connexion lente ou coupée | Le catalogue affiche les SVG. Seule la page détaillée charge son WebP. | Peser chaque WebP (15 000 octets visés, 20 000 au plus). À l’intégration, mesurer le transfert à froid du catalogue et de la page. |
| C. Équipement de la salle | Sans objet pour le fichier image, indépendant de la projection ou de l’impression. | Vérifier l’absence de texte incorporé. |

## Étapes de validation

Le chef examine la feuille d’appel en SVG à petite et grande tailles sur les deux fonds, puis son interprétation en WebP. Son choix du rendu conditionne la série. Le coordinateur a confirmé le dossier `shared/icones/images/`.

Après validation du plan et intégration de VIT-11 dans la branche, produire les deux essais. Après accord sur le rendu, réaliser la série, vérifier les noms, les poids, le contraste et les SVG avec les tests charte et icônes. Générer l’aperçu, examiner les vingt logos à 24, 32, 48 et 96 px sur deux fonds puis les dix-sept images. Présenter la planche au chef avant le commit final. Mettre à jour la ligne du module et la fiche de session.

## Données, risques et retour arrière

Aucune donnée d’école ni migration. Réserver les formes distinctives aux usages métier, notamment cours face au référentiel pedagogie. L’intégration sur les pages relève des missions suivantes. Le retour arrière consiste à retirer les nouveaux fichiers et entrées puis à régénérer depuis la charte précédente.
