/**
 * Jetons de la charte pour l'application web et le mobile (UIX-10a). Source : jetons.json, la même
 * que celle du CSS du site et du guide (shared/charte/README.md). Import simple du JSON, comme
 * shared/tokens.js : Vite, Metro et Jest l'acceptent. Aucun écran ne lit encore ce fichier : le web
 * le branche en UIX-10b, le mobile en UIX-10d.
 *
 *   charte       la source telle quelle (version, familles, paires, interdites)
 *   couleurs     « nom → #RRGGBB » du clair ; le fond du sombre est couleurs.ecran
 *   sombre       « nom → #RRGGBB » propres au sombre ; l'action du sombre est couleurs['bleu-clair']
 *   applications « nom → #RRGGBB » : teinte de chaque application (app-<id>) et son ton foncé
 *                (app-<id>-fonce), pour les logos de shared/icones/ (VIT-09a)
 *   typographie, espaces, rayons, ombres, mouvement : « nom → valeur » (mouvement['courbe-tableau']
 *                est un tableau, pour Motion et Reanimated)
 */
import charte from './jetons.json';

const valeurs = (famille) => Object.freeze(
    Object.fromEntries(Object.entries(charte.familles[famille]).map(([nom, jeton]) => [nom, jeton.valeur])),
);

export { charte };
export const couleurs = valeurs('couleurs');
export const sombre = valeurs('sombre');
export const applications = valeurs('applications');
export const typographie = valeurs('typographie');
export const espaces = valeurs('espaces');
export const rayons = valeurs('rayons');
export const ombres = valeurs('ombres');
export const mouvement = valeurs('mouvement');
