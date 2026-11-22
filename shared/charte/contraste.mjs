/**
 * Contrôle des contrastes de la charte (UIX-10a) : chaque paire texte et fond déclarée dans
 * jetons.json doit atteindre son seuil (4,5:1 pour le texte, 3:1 pour les traits et les
 * composants, WCAG 2.2), en clair et en sombre. Le rapport est calculé SANS arrondi : une paire à
 * 4,495:1 échoue, alors que `contraste` de shared/couleurs.js l'arrondirait à 4,5. L'arrondi ne
 * sert qu'à l'affichage, dans le guide.
 */
import { luminance } from '../couleurs.js';

/** Rapport de contraste exact entre deux couleurs #RRGGBB. */
export const rapport = (a, b) => {
    const [claire, foncee] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (claire + 0.05) / (foncee + 0.05);
};

/** Rapport pour l'affichage : « 4,16 ». */
export const rapportAffiche = (valeur) => valeur.toFixed(2).replace('.', ',');

const HEXA = /^#[0-9A-F]{6}$/i;

/**
 * Toutes les couleurs de la charte, « nom → #RRGGBB » : chaque jeton dont la valeur est une couleur,
 * quelle que soit sa famille (clair, sombre, statuts, lignes, panneau…). Les noms sont uniques.
 */
export const couleursDe = (source) => Object.fromEntries(
    Object.values(source.familles).flatMap((jetons) =>
        Object.entries(jetons).filter(([, jeton]) => HEXA.test(String(jeton.valeur))).map(([nom, jeton]) => [nom, jeton.valeur])),
);

const cle = (texte, fond) => `${texte} sur ${fond}`;

/**
 * Paires déclarées avec leur rapport : [{ mode, texte, fond, seuil, rapport }].
 * Une couleur inconnue donne un rapport nul, que `controlerPaires` signale.
 */
export const pairesCalculees = (source) => {
    const couleurs = couleursDe(source);
    return Object.entries(source.paires).flatMap(([mode, liste]) =>
        liste.map(([texte, fond, seuil]) => ({
            mode, texte, fond, seuil,
            rapport: couleurs[texte] && couleurs[fond] ? rapport(couleurs[texte], couleurs[fond]) : null,
        })));
};

/** Paires interdites avec leur rapport : [{ texte, fond, raison, rapport }]. */
export const interditesCalculees = (source) => {
    const couleurs = couleursDe(source);
    return source.interdites.map(([texte, fond, raison]) => ({
        texte, fond, raison,
        rapport: couleurs[texte] && couleurs[fond] ? rapport(couleurs[texte], couleurs[fond]) : null,
    }));
};

/** Erreurs de contraste de la source ; une liste vide veut dire que tout passe. */
export const controlerPaires = (source) => {
    const erreurs = [];
    const declarees = new Set();
    for (const p of pairesCalculees(source)) {
        declarees.add(cle(p.texte, p.fond));
        if (p.rapport === null) erreurs.push(`${p.mode} : ${cle(p.texte, p.fond)}, couleur inconnue`);
        else if (p.rapport < p.seuil) {
            erreurs.push(`${p.mode} : ${cle(p.texte, p.fond)} donne ${rapportAffiche(p.rapport)}:1, sous ${p.seuil}:1`);
        }
    }
    for (const i of interditesCalculees(source)) {
        if (i.rapport === null) erreurs.push(`interdite : ${cle(i.texte, i.fond)}, couleur inconnue`);
        if (declarees.has(cle(i.texte, i.fond))) erreurs.push(`interdite mais déclarée : ${cle(i.texte, i.fond)}`);
    }
    return erreurs;
};
