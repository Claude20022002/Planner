/**
 * Jetons de la charte pour l'application web et le mobile (UIX-10a). Source : jetons.json, la même
 * que celle du CSS du site et du guide (shared/charte/README.md). Import simple du JSON, comme
 * shared/tokens.js : Vite, Metro et Jest l'acceptent. Le web le lit depuis
 * UIX-10b, le mobile le lira en UIX-10d.
 *
 *   charte       la source telle quelle (version, familles, paires, interdites)
 *   couleurs     « nom → #RRGGBB » du clair ; le fond du sombre est couleurs.ecran
 *   sombre       « nom → #RRGGBB » propres au sombre ; l'action du sombre est couleurs['bleu-clair']
 *   typographie, espaces, rayons, ombres, mouvement : « nom → valeur » (mouvement['courbe-tableau']
 *                est un tableau, pour Motion et Reanimated)
 *   statuts      « statut-<clé> » (texte) et « statut-<clé>-fond » des séances, écrans clairs
 *   lignes       « ligne-1 » à « ligne-6 » et « ligne-inconnue » : couleurs de ligne des filières
 *   panneau      couleurs propres au panneau des départs (charnière, joint, lampes) ; son fond, ses
 *                cases et ses lettres sont couleurs.ecran et les jetons du sombre
 */
import charte from './jetons.json';

const valeurs = (famille) => Object.freeze(
    Object.fromEntries(Object.entries(charte.familles[famille]).map(([nom, jeton]) => [nom, jeton.valeur])),
);

export { charte };
export const couleurs = valeurs('couleurs');
export const sombre = valeurs('sombre');
export const typographie = valeurs('typographie');
export const espaces = valeurs('espaces');
export const rayons = valeurs('rayons');
export const ombres = valeurs('ombres');
export const mouvement = valeurs('mouvement');
export const statuts = valeurs('statuts');
export const lignes = valeurs('lignes');
export const panneau = valeurs('panneau');
