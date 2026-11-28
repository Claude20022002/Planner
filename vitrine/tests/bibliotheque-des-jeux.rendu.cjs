// QJE-15 : la bibliothèque construite, une section par domaine, sans le terminal.
// Les deux images de Codex sont absentes ; les autres vues sont chargées à la demande.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const SECTIONS = [
  'jeux-superieur-informatique',
  'jeux-superieur-reseaux-cybersecurite',
  'jeux-superieur-intelligence-artificielle',
  'jeux-superieur-gestion-logistique',
];

const TITRES = {
  fr: ['Labo Big-O', 'Requête Parfaite', 'Ordonnanceur CPU', 'Robot Route', 'Nœuds Réseaux', 'Tri Cyber', 'Labo des seuils', 'Budget ERP', 'Sprint Agile', 'Pilote des stocks'],
  en: ['Big-O Lab', 'Perfect Query', 'CPU Scheduler', 'Robot Route', 'Network Nodes', 'Cyber Triage', 'Threshold Lab', 'ERP Budget', 'Agile Sprint', 'Stock Pilot'],
};

const texte = (html) => html.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&apos;', "'");

for (const langue of ['fr', 'en']) {
  test(langue + ' · une grille par domaine, vues à la demande, sans le terminal', () => {
    const html = texte(readFileSync(resolve(__dirname, '../dist', langue, 'bibliotheque-des-jeux/index.html'), 'utf8'));
    assert.deepEqual([...html.matchAll(/<section id="([^"]+)"/g)].map((m) => m[1]).filter((id) => id.startsWith('jeux-')), SECTIONS);
    assert.deepEqual([...html.matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)].map((m) => m[1]), TITRES[langue]);
    assert.equal(html.includes('terminal-linux'), false);
    assert.equal(html.includes('/jeux/big-o-lab.webp'), false);
    assert.equal(html.includes('/jeux/quete-sql.webp'), false);
    assert.match(html, /<img[^>]*src="\/jeux\/cpu-process\.webp"[^>]*alt="[^"]+"[^>]*width="512"[^>]*height="512"[^>]*loading="lazy"/);
    assert.match(html, /src="\/jeux\/stock-pilot\.webp"/);
    assert.ok(html.includes(langue === 'fr' ? 'Devine : à quelle vitesse ce programme grandit ?' : 'Guess it: how fast does this program grow?'));
  });
}
