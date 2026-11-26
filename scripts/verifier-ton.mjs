#!/usr/bin/env node
/**
 * Vérification du ton des messages du serveur (UIX-05, règles du plan § 5) : aucune forme « (s) »,
 * « (e) », « (es) », « (x) » ni « pts » dans une chaîne de `backend/`, hors `backend/tests/` (une
 * assertion peut citer un ancien texte).
 *
 * Les commentaires sont retirés et les chaînes (guillemets, apostrophes, gabarits) sont lues une à
 * une, expressions `${…}` des gabarits comprises : un `(s) => …` de code ne compte pas, seul un
 * texte le fait. Les nombres s'accordent avec shared/accords.js.
 *
 * Lancement : node scripts/verifier-ton.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOSSIER = 'backend';
const IGNORES = new Set(['node_modules', 'tests', 'coverage', 'uploads', 'dist']);
const EXTENSIONS = new Set(['.js', '.mjs', '.cjs']);
// Formes fautives : pluriel entre parenthèses, abréviation « pts »
const MOTIF = /\(s\)|\(e\)|\(es\)|\(x\)|\bpts\b/i;

/**
 * Lit les chaînes d'un source JavaScript, commentaires retirés.
 * @param {string} source
 * @returns {{ ligne: number, texte: string }[]}
 */
export const lireChaines = (source) => {
    const chaines = [];
    let i = 0;
    let ligne = 1;

    const avancer = (n = 1) => {
        for (let k = 0; k < n && i < source.length; k++) {
            if (source[i] === '\n') ligne++;
            i++;
        }
    };

    // Une barre oblique ouvre une expression régulière (et non une division) après un opérateur
    // ou un mot-clé : sans cela, une apostrophe ou un guillemet d'une expression ferait dériver la lecture
    const ouvreRegex = () => {
        const avant = source.slice(Math.max(0, i - 40), i).replace(/\s+$/, '');
        return (
            /[([{,;:=!&|?+\-*%<>~^]$/.test(avant) ||
            /\b(return|typeof|instanceof|case|in|of|new|delete|void|throw|yield|await)$/.test(avant)
        );
    };

    const lireRegex = () => {
        let dansClasse = false;
        avancer(); // barre ouvrante
        while (i < source.length) {
            const c = source[i];
            if (c === '\\\\') {
                avancer(2);
                continue;
            }
            if (c === '[') dansClasse = true;
            else if (c === ']') dansClasse = false;
            else if (c === '/' && !dansClasse) {
                avancer();
                break;
            } else if (c === '\n') return; // une expression régulière ne s'étend pas sur deux lignes
            avancer();
        }
        while (/[a-z]/i.test(source[i] ?? '')) avancer(); // fanions g, i, u…
    };

    // Code : jusqu'à la fin du fichier, ou jusqu'à la fin d'une expression ${…} de gabarit
    const lireCode = (dansGabarit = false) => {
        let profondeur = 0;
        while (i < source.length) {
            const c = source[i];
            if (dansGabarit && c === '}' && profondeur === 0) {
                avancer();
                return;
            }
            if (c === '}' && profondeur > 0) {
                profondeur--;
                avancer();
                continue;
            }
            if (c === '{') {
                profondeur++;
                avancer();
                continue;
            }
            if (c === '/' && source[i + 1] === '/') {
                while (i < source.length && source[i] !== '\n') avancer();
                continue;
            }
            if (c === '/' && source[i + 1] === '*') {
                avancer(2);
                while (i < source.length && !(source[i] === '*' && source[i + 1] === '/')) avancer();
                avancer(2);
                continue;
            }
            if (c === '/') {
                if (ouvreRegex()) lireRegex();
                else avancer();
                continue;
            }
            if (c === '"' || c === "'") {
                lireTexte(c, false);
                continue;
            }
            if (c === '`') {
                lireTexte('`', true);
                continue;
            }
            avancer();
        }
    };

    const lireTexte = (guillemet, gabarit) => {
        let debut = ligne;
        let texte = '';
        avancer(); // guillemet ouvrant
        while (i < source.length) {
            const c = source[i];
            if (c === '\\') {
                texte += source[i + 1] ?? '';
                avancer(2);
                continue;
            }
            if (c === guillemet) {
                avancer();
                break;
            }
            if (gabarit && c === '$' && source[i + 1] === '{') {
                // Le texte s'arrête avant l'expression : « (S${n}) » n'est pas « (S) »
                if (texte) chaines.push({ ligne: debut, texte });
                avancer(2);
                lireCode(true);
                texte = '';
                debut = ligne;
                continue;
            }
            texte += c;
            avancer();
        }
        if (texte) chaines.push({ ligne: debut, texte });
    };

    lireCode();
    return chaines;
};

/** Les chaînes d'un source qui portent une forme fautive. */
export const chainesFautives = (source) =>
    lireChaines(source).filter(({ texte }) => MOTIF.test(texte));

const fichiers = (dossier) =>
    fs.readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
        if (IGNORES.has(entree.name)) return [];
        const chemin = path.join(dossier, entree.name);
        if (entree.isDirectory()) return fichiers(chemin);
        return EXTENSIONS.has(path.extname(entree.name)) ? [chemin] : [];
    });

/**
 * Formes fautives trouvées dans les chaînes du serveur, hors tests.
 * @param {string} racine - racine du dépôt
 * @returns {{ chemin: string, ligne: number, texte: string }[]}
 */
export const verifierTon = (racine = RACINE) =>
    fichiers(path.join(racine, DOSSIER)).flatMap((chemin) =>
        chainesFautives(fs.readFileSync(chemin, 'utf8')).map(({ ligne, texte }) => ({
            chemin: path.relative(racine, chemin).split(path.sep).join('/'),
            ligne,
            texte: texte.trim().slice(0, 140),
        }))
    );

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const trouves = verifierTon();
    if (trouves.length) {
        console.error(
            `Forme fautive dans un message du serveur (${trouves.length}) : accorder le nombre avec shared/accords.js, jamais « (s) » ni « pts ».`
        );
        for (const { chemin, ligne, texte } of trouves) console.error(`  ${chemin}:${ligne}  ${texte}`);
        process.exitCode = 1;
    } else {
        console.log('Ton des messages du serveur : rien à signaler.');
    }
}
