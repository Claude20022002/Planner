# VIT-25 · Intégration des deux boucles validées

**Visa du chef, 28 novembre 2026.** Après avoir reçu les aperçus de l’appel à la main et de l’ouverture d’une fiche de séance, le chef demande « Intègre les ». Ce visa couvre les deux scènes présentées et leur insertion dans Présences et Emploi du temps.

## Périmètre

Premier lot utilisable sur la vitrine, distinct du gabarit complet de VIT-25 (plan `0a5ce400`). Les pages utilisent le créneau `actions` de VIT-24 et gardent leur contenu existant. La branche locale part de la tête de la PR VIT-24 (#295), `e837f780`, pour vérifier l’ensemble et préparer une PR après sa fusion. Le lot ne change aucun fichier de `components/applications/`.

Les deux boucles de 5,5 s sont des captures du frontend Planner avec une API de démonstration fictive. Le MP4 et son image d’attente WebP sont servis localement sous `videos/boucles/`. Les pages anglaises utilisent la même scène capturée avec l’interface anglaise. Les textes visés par la demande d’intégration décrivent les deux gestes.

| Module | Français | English |
|---|---|---|
| Présences | **Faire l’appel à la main**<br>Le curseur sélectionne « Présent » et la ligne affiche « noté à la main ». | **Take attendance manually**<br>The cursor selects “Present” and the row shows it was marked by hand. |
| Emploi du temps | **Ouvrir une fiche de séance**<br>Un clic dans l’emploi du temps révèle la salle, l’horaire et le groupe. | **Open a session’s details**<br>Click a session in the timetable to see its room, time and group. |

## Affichage et lecture

- Une section après l’ouverture par module. La capture d’arrivée s’affiche avant lecture et à l’impression, avec un texte de remplacement.
- La lecture est muette, en boucle, contrôlable au clavier. Le MP4 se charge sur demande ou à la visibilité sur grand écran selon la règle C9 du plan VIT-25. Sur téléphone, en mouvement réduit, en économie de données ou sur connexion lente, la lecture est déclenchée uniquement par le bouton. La pause volontaire tient quand l’utilisateur quitte puis retrouve la boucle.
- Vérifier les quatre pages FR et EN à 390 et 1 440 px, l’accessibilité, le budget EP-19 et le plafond de 300 Ko par MP4. Le guide, les FAQ, les autres modules et l’outillage de la démonstration complète relèvent des lots suivants.
