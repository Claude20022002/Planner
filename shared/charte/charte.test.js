// Tests de la charte (UIX-10a, plan court § 8) : contrastes de la source, sorties générées à jour,
// en-tête (version, empreinte), variables du site. Lancement : node --test shared/charte/charte.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { controlerPaires, pairesCalculees } from './contraste.mjs';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const source = JSON.parse(fs.readFileSync(path.join(ICI, 'jetons.json'), 'utf8'));

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
