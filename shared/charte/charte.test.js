// Tests de la charte (UIX-10a, plan court § 8) : contrastes de la source, sorties générées à jour,
// en-tête (version, empreinte), variables du site. Lancement : node --test shared/charte/charte.test.js
import { LOGOS } from '../icones/index.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { controlerPaires, pairesCalculees } from './contraste.mjs';
import { FOND_PANNEAU, verifierCouleur } from '../couleurs.js';
import {
    CHEMIN_CSS_SITE, RACINE, construireSorties, empreinte, lireEntete, verifierSorties,
} from './generer.mjs';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const source = JSON.parse(fs.readFileSync(path.join(ICI, 'jetons.json'), 'utf8'));
const sorties = construireSorties(source);
const cssDuSite = sorties.find((s) => s.chemin === CHEMIN_CSS_SITE).contenu;
const nomsDuCss = [...cssDuSite.matchAll(/^\s*--([a-z0-9-]+):/gm)].map((m) => m[1]);

// Les variables du site d'aujourd'hui : le site ne change jamais de nom de variable (plan UIX-10, § 4.2)
const NOMS_DU_SITE = [
    'bleu-nuit', 'bleu', 'bleu-profond', 'bleu-clair', 'blanc', 'encre',
    'gris-fond', 'gris-texte', 'gris-trait', 'bleu-pale', 'ecran',
    'police', 'titre-geant', 'titre-grand', 'titre-moyen', 'texte-accroche', 'texte', 'texte-petit',
    'interligne-titre', 'interligne-texte',
    'espace-1', 'espace-2', 'espace-3', 'espace-4', 'espace-5', 'espace-section', 'gouttiere',
    'largeur-lecture', 'largeur-contenu', 'hauteur-entete',
    'rayon-petit', 'rayon', 'rayon-grand', 'rayon-pilule', 'ombre-carte', 'ombre-appareil',
    'duree', 'courbe',
];

test('1. chaque paire déclarée atteint son seuil, en clair et en sombre', () => {
    const paires = pairesCalculees(source);
    assert.ok(paires.some((p) => p.mode === 'clair') && paires.some((p) => p.mode === 'sombre'));
    for (const p of paires) {
        assert.ok(p.rapport !== null && p.rapport >= p.seuil, `${p.mode} : ${p.texte} sur ${p.fond} (${p.rapport})`);
    }
    assert.deepEqual(controlerPaires(source), []);
});

test('2. une paire sous le seuil, ou une paire interdite déclarée, est refusée', () => {
    const sousSeuil = structuredClone(source);
    sousSeuil.familles.couleurs['gris-texte'].valeur = '#8A94A2';
    assert.match(controlerPaires(sousSeuil).join('\n'), /gris-texte sur blanc donne .* sous 4\.5:1/);

    const interditeDeclaree = structuredClone(source);
    interditeDeclaree.paires.clair.push(['bleu', 'bleu-pale', 3]);
    assert.match(controlerPaires(interditeDeclaree).join('\n'), /interdite mais déclarée : bleu sur bleu-pale/);

    const inconnue = structuredClone(source);
    inconnue.paires.sombre.push(['texte-sombre', 'absent', 4.5]);
    assert.match(controlerPaires(inconnue).join('\n'), /couleur inconnue/);
});

test('3. les sorties commitées sont à jour (comme --verifier)', () => {
    assert.deepEqual(verifierSorties(sorties, RACINE), []);
});

test('4. une sortie retouchée est signalée ; des fins de ligne CRLF ne le sont pas', () => {
    const racine = fs.mkdtempSync(path.join(os.tmpdir(), 'charte-'));
    try {
        for (const { chemin, contenu } of sorties) {
            fs.mkdirSync(path.dirname(path.join(racine, chemin)), { recursive: true });
            fs.writeFileSync(path.join(racine, chemin), contenu.replace(/\n/g, '\r\n'));
        }
        assert.deepEqual(verifierSorties(sorties, racine), []);
        const css = path.join(racine, CHEMIN_CSS_SITE);
        fs.writeFileSync(css, fs.readFileSync(css, 'utf8').replace('--bleu: #2A679F', '--bleu: #2A67A0'));
        assert.deepEqual(verifierSorties(sorties, racine), [CHEMIN_CSS_SITE]);
        fs.rmSync(css);
        assert.deepEqual(verifierSorties(sorties, racine), [CHEMIN_CSS_SITE]);
    } finally {
        fs.rmSync(racine, { recursive: true, force: true });
    }
});

test('5. l\'en-tête porte la version de jetons.json et l\'empreinte du corps', () => {
    for (const { chemin, contenu } of sorties) {
        const entete = lireEntete(contenu);
        assert.ok(entete, `en-tête absent : ${chemin}`);
        assert.equal(entete.version, source.version);
        assert.equal(entete.empreinte, empreinte(entete.corps));
        assert.match(entete.empreinte, /^[0-9a-f]{12}$/);
    }
});

test('6. le CSS du site ne contient que les jetons marqués « site »', () => {
    const marques = Object.values(source.familles)
        .flatMap((famille) => Object.entries(famille).filter(([, j]) => j.site).map(([nom]) => nom));
    assert.deepEqual([...nomsDuCss].sort(), [...marques].sort());
    for (const ajout of ['trait-fort', 'bleu-vif', 'jeu', 'rayon-commande', 'courbe-tableau']) {
        assert.ok(!nomsDuCss.includes(ajout), `${ajout} ne doit pas sortir dans le site`);
    }
});

test('7. le CSS du site porte exactement les noms de variables d\'aujourd\'hui', () => {
    assert.deepEqual(nomsDuCss, NOMS_DU_SITE);
});

test('8. chaque application a ses deux tons, et le blanc tient 4,5:1 sur chacun (VIT-09a)', () => {
    const attendues = Object.values(LOGOS).flatMap(({ teinte, fonce }) => [teinte, fonce]).sort();
    const teintes = source.familles.applications;
    assert.deepEqual(Object.keys(teintes).sort(), attendues);
    const paires = pairesCalculees(source).filter((p) => p.fond.startsWith('app-'));
    assert.deepEqual(paires.map((paire) => paire.fond).sort(), attendues);
    for (const p of paires) assert.ok(p.texte === 'blanc' && p.seuil === 4.5 && p.rapport >= 4.5, `${p.texte} sur ${p.fond}`);
});

// UIX-10b : statuts, lignes et panneau entrent dans la source ; chacun a ses paires déclarées
test('9. statuts, lignes et lampes du panneau ont leurs paires, et aucune couleur ne sort sur le site', () => {
    const declarees = new Set(Object.values(source.paires).flat().map(([texte, fond]) => `${texte} sur ${fond}`));
    for (const nom of Object.keys(source.familles.statuts).filter((n) => !n.endsWith('-fond'))) {
        for (const fond of [`${nom}-fond`, 'blanc', 'gris-fond']) assert.ok(declarees.has(`${nom} sur ${fond}`), `${nom} sur ${fond}`);
    }
    for (const nom of Object.keys(source.familles.lignes)) assert.ok(declarees.has(`${nom} sur blanc`), `${nom} sur blanc`);
    for (const nom of Object.keys(source.familles.panneau).filter((n) => n.startsWith('lampe-'))) {
        for (const fond of ['ecran', 'surface-sombre']) assert.ok(declarees.has(`${nom} sur ${fond}`), `${nom} sur ${fond}`);
    }
    for (const famille of ['statuts', 'lignes', 'panneau']) {
        assert.ok(Object.values(source.familles[famille]).every((j) => !j.site), `${famille} hors du site`);
    }
});

test('10. le fond du panneau de shared/couleurs.js est « ecran » ; un accent se mesure sur ce fond', () => {
    assert.equal(FOND_PANNEAU, source.familles.couleurs.ecran.valeur);
    assert.ok(verifierCouleur('#F26322', 'accent').valide, 'orange livré avant la charte');
    assert.ok(verifierCouleur(source.familles.couleurs['bleu-vif'].valeur, 'accent').valide, 'bleu-vif, accent de repli');
    // #137D3F passe sur blanc (5,21:1) et sur le fond « ecran » (3,35:1) ; #8B0000 ne passe pas sur le panneau
    assert.ok(verifierCouleur('#137D3F', 'accent').valide);
    assert.match(verifierCouleur('#8B0000', 'accent').message, /panneau sombre/);
});
