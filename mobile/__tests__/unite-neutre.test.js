/**
 * M-11 : les jeux ne nomment plus une devise. Le test parcourt tout
 * shared/simulations et refuse MAD, dirham, euro, € et $. Les montants
 * des consignes restent ceux du plan.
 */
import fs from 'fs';
import path from 'path';

const RACINE = path.resolve(__dirname, '../../shared/simulations');

const lireFichiers = (dossier) => fs.readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
    const chemin = path.join(dossier, entree.name);
    return entree.isDirectory() ? lireFichiers(chemin) : [chemin];
});

const lignesDe = (source, motif) => source.split('\n').flatMap((ligne, index) => (
    motif.test(ligne) ? [index + 1] : []
));

/** Un $ de gabarit ${…} ou l'ancre de fin d'une regex /…$/ n'est pas une devise. */
const dollarsDeDevise = (source) => {
    const lignes = [];
    source.split('\n').forEach((ligne, index) => {
        for (let i = 0; i < ligne.length; i += 1) {
            if (ligne[i] !== '$') continue;
            const suivant = ligne[i + 1];
            if (suivant === '{' || suivant === '/') continue;
            lignes.push(index + 1);
            break;
        }
    });
    return lignes;
};

const MOTIFS = [
    { nom: 'MAD', trouver: (source) => lignesDe(source, /\bMAD\b/) },
    { nom: 'dirham', trouver: (source) => lignesDe(source, /\bdirhams?\b/i) },
    { nom: 'euro', trouver: (source) => lignesDe(source, /\beuros?\b/i) },
    { nom: '€', trouver: (source) => lignesDe(source, /€/) },
    { nom: '$', trouver: dollarsDeDevise },
];

const PHRASES = {
    'catalogue/stock-pilot.js': [
        'budget en crédits',
        'a credit budget',
        '100 crédits d’achats',
        '100 credits in purchases',
        'budget de 120 crédits',
        'budget 120 credits',
        'budget de 108 crédits',
        'budget 108 credits',
    ],
    'catalogue/budget-erp.js': [
        'Budget 200 crédits',
        'Budget 200 credits',
        'Budget 150 crédits',
        'Budget 150 credits',
        '45 crédits',
        '45 credits',
        'Budget 165 crédits',
        'Budget 165 credits',
    ],
    'i18n.js': [
        '{{prix}} crédits',
        '{{budget}} crédits',
        '{{cout}} crédits',
        '{{total}} crédits',
        '{{budgetMax}} crédits',
        '{{max}} crédits',
        '{{prix}} credits',
        '{{budget}} credits',
        '{{cout}} credits',
        '{{total}} credits',
        '{{budgetMax}} credits',
        '{{max}} credits',
        'the {{max}} credit budget',
    ],
};

describe('unité neutre des jeux', () => {
    const fichiers = lireFichiers(RACINE);

    test('shared/simulations ne contient aucune devise', () => {
        expect(fichiers.length).toBeGreaterThan(10);
        const trouvailles = [];
        for (const fichier of fichiers) {
            const source = fs.readFileSync(fichier, 'utf8');
            const relatif = path.relative(RACINE, fichier).split('\\').join('/');
            for (const motif of MOTIFS) {
                const lignes = motif.trouver(source);
                if (lignes.length) trouvailles.push(`${relatif}:${lignes.join(',')} ${motif.nom}`);
            }
        }
        expect(trouvailles).toEqual([]);
    });

    test('les montants cités par les consignes sont encore là', () => {
        for (const [relatif, phrases] of Object.entries(PHRASES)) {
            const source = fs.readFileSync(path.join(RACINE, relatif), 'utf8');
            for (const phrase of phrases) {
                expect(source).toContain(phrase);
            }
        }
    });
});
