/**
 * Mode de la page de l'appel (M-1), d'après la liste d'appel et l'état que rend le serveur
 * (GET /api/presences/seances/:id/apres-coup) : l'écran ne calcule aucune date. Fonction pure.
 *  - « ferme » : l'appel est terminé, la liste s'affiche telle quelle ;
 *  - « ouvrir » : l'appel du jour (QR), ou un appel déjà ouvert ;
 *  - « apres_coup » : séance passée sans appel, dans le délai : saisie, puis « Terminer » ;
 *  - « lecture » : hors délai, à venir ou annulée : ni saisie ni « Terminer » (réponse 5 du plan).
 */
export const modeDeLaPage = (liste, etat) => {
  if (liste?.appel) return liste.appel.ouvert ? 'ouvrir' : 'ferme';
  if (etat?.mode === 'jour') return 'ouvrir';
  if (etat?.mode === 'apres_coup') return 'apres_coup';
  return 'lecture';
};
