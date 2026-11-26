// Tests du lot A de VIT-20 sur le site construit : ordre de la barre, quatre catégories, tuiles grisées sans lien, ligne « Inclus »,
// « Se connecter » absent tant que l'adresse est vide, quatre colonnes du pied de page. Lancer après `npm run build`.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const page = (adresse) => readFileSync(resolve(__dirname, '../dist', '.' + adresse, 'index.html'), 'utf8');
const entre = (html, debut, fin) => html.slice(html.indexOf(debut), html.indexOf(fin) + fin.length);
const textes = (html, motif) => [...html.matchAll(motif)].map((m) => m[1].trim());
const LIBELLES = {
  fr: { menus: ['Applications', 'Établissements', 'Ressources'], categories: ['Organiser', 'Enseigner', 'Gérer', 'Communiquer'],
    socle: 'Inclus dans tout abonnement', demo: 'Demander une démonstration', colonnes: ['Applications', 'Établissements', 'Ressources', 'Planner'] },
  en: { menus: ['Apps', 'Schools', 'Resources'], categories: ['Organise', 'Teach', 'Manage', 'Communicate'],
    socle: 'Included in every plan', demo: 'Request a demo', colonnes: ['Apps', 'Schools', 'Resources', 'Planner'] },
};

for (const langue of ['fr', 'en']) {
  for (const adresse of [`/${langue}/`, `/${langue}/applications/presences/`, `/${langue}/faq/`]) {
    test(`${adresse} : barre, menu Applications, pied de page`, () => {
      const html = page(adresse);
      const l = LIBELLES[langue];
      const entete = entre(html, '<header', '</header>');
      const pied = entre(html, '<footer', '</footer>');
      assert.deepEqual(textes(entete, /<summary[^>]*>([^<]+)<\/summary>/g), l.menus);
      assert.equal(/<details[^>]* open/.test(entete), false, 'menus fermés au chargement');
      assert.ok(entete.indexOf(l.menus[0]) < entete.indexOf(l.menus[1]) && entete.indexOf(l.menus[1]) < entete.indexOf(l.menus[2]));
      assert.deepEqual(textes(entete, /<h2[^>]*>([^<]+)<\/h2>/g).slice(0, 4), l.categories);
      const tuiles = (entete.match(/<(a|div) [^>]*class="[^"]*tuile[^"]*"[^>]*>/g) || []);
      assert.equal(tuiles.length, 17);
      const grisees = tuiles.filter((balise) => balise.startsWith('<div'));
      assert.equal(grisees.length, 12);
      for (const balise of grisees) assert.doesNotMatch(balise, /href=|role=/);
      assert.ok(entete.includes(l.socle));
      assert.ok(entete.includes(`href="/${langue}/socle/"`));
      assert.ok(entete.includes(`href="/${langue}/applications/"`));
      assert.ok(entete.includes(l.demo));
      assert.equal(/Se connecter|Sign in/.test(entete), false, 'adresse de l\'application vide');
      assert.deepEqual(textes(pied, /<h2[^>]*>([^<]+)<\/h2>/g), l.colonnes);
    });
  }
}
