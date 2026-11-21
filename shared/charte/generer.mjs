/**
 * Générateur de la charte (UIX-10a) : lit shared/charte/jetons.json, vérifie les contrastes, puis
 * produit une table de sorties (chemin, contenu) : le CSS du site vitrine et le guide README.md.
 *   node shared/charte/generer.mjs              écrit les sorties
 *   node shared/charte/generer.mjs --verifier   n'écrit rien ; sort en erreur si une sortie diffère
 * Chaque sortie commence par un en-tête « version N, empreinte S » ; l'empreinte est le SHA-256 du
 * corps (sans l'en-tête), 12 caractères. Les fins de ligne sont ramenées à LF avant de comparer et
 * de calculer l'empreinte (Git les rend en CRLF sous Windows). Aucun chemin ne vient d'un argument.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { controlerPaires, interditesCalculees, pairesCalculees, rapportAffiche } from './contraste.mjs';

const ICI = path.dirname(fileURLToPath(import.meta.url));
export const RACINE = path.resolve(ICI, '..', '..');
export const CHEMIN_CSS_SITE = 'vitrine/src/styles/jetons.css';
export const CHEMIN_GUIDE = 'shared/charte/README.md';

export const lireSource = (chemin = path.join(ICI, 'jetons.json')) => JSON.parse(fs.readFileSync(chemin, 'utf8'));

const normaliser = (texte) => texte.replace(/\r\n/g, '\n');

/** Empreinte d'un corps de sortie : SHA-256, 12 premiers caractères hexadécimaux. */
export const empreinte = (corps) => crypto.createHash('sha256').update(normaliser(corps)).digest('hex').slice(0, 12);

const phrase = (version, corps) =>
    `Généré par shared/charte/generer.mjs, version ${version}, empreinte ${empreinte(corps)} : ne pas modifier ; changer shared/charte/jetons.json`;

const ENTETES = [
    /^\/\* Généré par shared\/charte\/generer\.mjs, version (\d+), empreinte ([0-9a-f]{12}) : [^\n]*\*\/\n/,
    /^<!-- Généré par shared\/charte\/generer\.mjs, version (\d+), empreinte ([0-9a-f]{12}) : [^\n]*-->\n/,
];

/** Sépare l'en-tête d'une sortie : { version, empreinte, corps }, ou null sans en-tête. */
export const lireEntete = (contenu) => {
    const texte = normaliser(contenu);
    for (const motif of ENTETES) {
        const m = texte.match(motif);
        if (m) return { version: Number(m[1]), empreinte: m[2], corps: texte.slice(m[0].length) };
    }
    return null;
};

const valeurTexte = (valeur) => (Array.isArray(valeur) ? `[${valeur.join(', ')}]` : String(valeur));

// ── CSS du site : seuls les jetons marqués « site », groupés comme le fichier écrit à la main ──
const SECTIONS_SITE = [
    ['Couleurs des logos', ['couleurs'], (j) => j.logo],
    ['Neutres dérivés (sans autre teinte vive)', ['couleurs'], (j) => !j.logo],
    ['Typographie', ['typographie'], () => true],
    ['Espaces et largeurs', ['espaces'], () => true],
    ['Rayons et ombres', ['rayons', 'ombres'], () => true],
    ['Mouvement (ignoré si le mouvement réduit est demandé)', ['mouvement'], () => true],
];

export const cssSite = (source) => {
    const sections = SECTIONS_SITE.map(([titre, familles, garder]) => {
        const lignes = familles.flatMap((f) => Object.entries(source.familles[f]))
            .filter(([, jeton]) => jeton.site && garder(jeton))
            .map(([nom, jeton]) => `  --${nom}: ${valeurTexte(jeton.valeur)};`);
        return lignes.length ? [`  /* ${titre} */`, ...lignes].join('\n') : null;
    }).filter(Boolean);
    return [
        '/* Jetons du site vitrine : couleurs des SVG officiels du logo (18 nov.), espaces, rayons, ombres',
        '   et tailles de titres. Le contraste AA de chaque paire est vérifié à la source (shared/charte)',
        '   et par tests/jetons.test.js. */',
        ':root {',
        sections.join('\n\n'),
        '}',
        '',
    ].join('\n');
};

// ── Guide Markdown ──
const TITRES = {
    couleurs: 'Couleurs', sombre: 'Mode sombre', applications: 'Teintes des applications (logos)', typographie: 'Typographie', espaces: 'Espaces et largeurs',
    rayons: 'Rayons', ombres: 'Ombres', mouvement: 'Mouvement',
    statuts: 'Statuts des séances', lignes: 'Lignes des filières', panneau: 'Panneau des départs',
};

const tableau = (entetes, lignes) => [
    `| ${entetes.join(' | ')} |`,
    `|${entetes.map(() => '---').join('|')}|`,
    ...lignes.map((l) => `| ${l.join(' | ')} |`),
].join('\n');

const tableauFamille = (famille, jetons) => {
    const avecLogo = famille === 'couleurs';
    const entetes = ['Jeton', 'Valeur', 'Rôle', ...(avecLogo ? ['Logo'] : []), 'Site'];
    const lignes = Object.entries(jetons).map(([nom, j]) => [
        `\`${nom}\``, `\`${valeurTexte(j.valeur)}\``, j.role,
        ...(avecLogo ? [j.logo ? 'oui' : '—'] : []), j.site ? 'oui' : '—',
    ]);
    return tableau(entetes, lignes);
};

export const guide = (source) => {
    const parties = [
        '# Charte de Planner',
        '',
        `Guide généré depuis [jetons.json](jetons.json), version ${source.version}. ${source.note}`,
        '',
        '## Changer une valeur',
        '',
        '1. Modifier `shared/charte/jetons.json` et augmenter `version`.',
        '2. Lancer `node shared/charte/generer.mjs` : il vérifie chaque paire de contraste, puis réécrit `vitrine/src/styles/jetons.css` et ce guide.',
        '3. Commiter la source et les deux sorties. En CI, `node shared/charte/generer.mjs --verifier` échoue si une sortie n\'est plus à jour ou si une paire passe sous son seuil.',
        '',
        'Ne jamais retoucher une sortie à la main. La colonne « Site » marque les jetons écrits dans le CSS du site vitrine ; les autres servent aux applications, qui les lisent par `shared/charte/index.js`.',
    ];
    for (const [famille, jetons] of Object.entries(source.familles)) {
        parties.push('', `## ${TITRES[famille] ?? famille}`, '');
        if (famille === 'sombre') {
            parties.push('Le fond du mode sombre est `ecran` ; l\'action est `bleu-clair`, avec le texte `ecran` dessus. Le site vitrine n\'a pas de mode sombre.', '');
        }
        if (famille === 'panneau') {
            parties.push('Le panneau reste sombre, même en thème clair : fond `ecran`, cases `surface-sombre`, lettres `texte-sombre` et `texte-sombre-second`, cadre à la couleur de l\'école ou `bleu-nuit`. Seules ses couleurs propres sont ici.', '');
        }
        parties.push(tableauFamille(famille, jetons));
    }
    parties.push('', '## Contrastes vérifiés', '', 'Seuils WCAG 2.2 : 4,5:1 pour le texte, 3:1 pour les traits, le focus et les composants. Le rapport est calculé sans arrondi ; il est arrondi ici pour la lecture.');
    const paires = pairesCalculees(source);
    for (const mode of Object.keys(source.paires)) {
        parties.push('', `### ${mode === 'clair' ? 'Clair' : 'Sombre'}`, '', tableau(['Texte ou trait', 'Fond', 'Rapport', 'Seuil'],
            paires.filter((p) => p.mode === mode).map((p) => [`\`${p.texte}\``, `\`${p.fond}\``, `${rapportAffiche(p.rapport)}:1`, `${String(p.seuil).replace('.', ',')}:1`])));
    }
    parties.push('', '## Paires interdites', '', tableau(['Texte', 'Fond', 'Rapport', 'Pourquoi'],
        interditesCalculees(source).map((i) => [`\`${i.texte}\``, `\`${i.fond}\``, `${rapportAffiche(i.rapport)}:1`, i.raison])));
    return `${parties.join('\n')}\n`;
};

// ── Table des sorties, écriture et vérification ──
const ENVELOPPES = {
    css: (texte) => `/* ${texte} */\n`,
    md: (texte) => `<!-- ${texte} -->\n`,
};

/** Table des sorties ; lève une erreur si une paire de contraste est refusée. */
export const construireSorties = (source) => {
    const erreurs = controlerPaires(source);
    if (erreurs.length) throw new Error(`Contrastes de la charte refusés :\n- ${erreurs.join('\n- ')}`);
    return [
        [CHEMIN_CSS_SITE, 'css', cssSite(source)],
        [CHEMIN_GUIDE, 'md', guide(source)],
    ].map(([chemin, genre, corps]) => ({ chemin, contenu: ENVELOPPES[genre](phrase(source.version, corps)) + corps }));
};

/** Chemins des sorties absentes ou différentes du fichier présent sous `racine`. */
export const verifierSorties = (sorties, racine = RACINE) => sorties
    .filter(({ chemin, contenu }) => {
        const fichier = path.join(racine, chemin);
        return !fs.existsSync(fichier) || normaliser(fs.readFileSync(fichier, 'utf8')) !== contenu;
    })
    .map(({ chemin }) => chemin);

export const ecrireSorties = (sorties, racine = RACINE) => {
    for (const { chemin, contenu } of sorties) fs.writeFileSync(path.join(racine, chemin), contenu, 'utf8');
};

const principal = (args) => {
    const inconnus = args.filter((a) => a !== '--verifier');
    if (inconnus.length) throw new Error(`Option inconnue : ${inconnus.join(' ')} (seule option : --verifier)`);
    const sorties = construireSorties(lireSource());
    if (args.includes('--verifier')) {
        const ecarts = verifierSorties(sorties);
        if (ecarts.length) {
            throw new Error(`Sorties de la charte pas à jour : ${ecarts.join(', ')}. Lancer node shared/charte/generer.mjs, puis commiter.`);
        }
        console.log(`Charte à jour : ${sorties.map((s) => s.chemin).join(', ')}.`);
        return;
    }
    ecrireSorties(sorties);
    console.log(`Charte générée : ${sorties.map((s) => s.chemin).join(', ')}.`);
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        principal(process.argv.slice(2));
    } catch (erreur) {
        console.error(erreur.message);
        process.exit(1);
    }
}
