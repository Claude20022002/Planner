// Tests du lot B de VIT-20 sur le site construit (dist/) : pages de module, socle, onglets, fonctionnalités, « Pour qui »,
// « Un besoin, une application. », tuiles grisées sans lien, pages de renvoi. Lancer après `npm run build`, depuis vitrine/ :
// node --test tests/*.rendu.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const registre = require('../src/donnees/fonctionnalites.json');

const DIST = resolve(__dirname, '../dist');
const page = (adresse) => readFileSync(resolve(DIST, '.' + adresse, 'index.html'), 'utf8');
const MODULES = { 'emploi-du-temps': 'emploiDuTemps', presences: 'presences', 'espace-de-cours': 'espaceDeCours', 'quiz-et-jeux': 'quizEtJeux',
  'annonces-et-messages': 'annoncesEtMessages' };
const compter = (html, motif) => (html.match(motif) || []).length;

test('le site est construit', () => assert.ok(existsSync(DIST), 'lancer npm run build'));

for (const langue of ['fr', 'en']) {
  for (const [segment, cle] of Object.entries(MODULES)) {
    test(`${langue} · ${segment} : onglets, fonctionnalités, un besoin une application, un seul h1`, () => {
      const html = page(`/${langue}/applications/${segment}/`);
      assert.equal(compter(html, /<h1[ >]/g), 1);
      assert.match(html, /class="onglets[^"]*"/);
      assert.ok(html.includes(`href="/${langue}/fonctionnalites/#${cle}"`), 'onglet Fonctionnalités');
      assert.match(html, /aria-current="page"[^>]*>(Aperçu|Overview)</);
      assert.ok(html.includes('id="autres-applications"'));
      assert.ok(html.includes(`href="/${langue}/applications/"`), 'Toutes les applications');
      const attendu = registre.filter((entree) => entree.module === cle).length;
      assert.equal(compter(html.slice(html.indexOf('id="fonctionnalites"')), /<li[ >]/g) >= attendu, true);
      const equipement = html.match(/<section id="equipement"[^>]*>([\s\S]*?)<\/section>/g) || [];
      assert.equal(equipement.length, 1, 'un seul bloc d’équipement par page de module');
      assert.match(equipement[0], /aria-labelledby="equipement-titre"/);
      assert.equal(compter(equipement[0], /<li[ >]/g), 3, 'trois contextes d’équipement');
      const textes = require(`../src/i18n/${langue}/equipement.json`);
      const echapper = (texte) => texte.replaceAll('&', '&amp;').replaceAll("'", '&#39;');
      for (const [contexte, phrase] of Object.entries(textes.modules[cle])) {
        assert.ok(equipement[0].includes(echapper(textes.contextes[contexte])), contexte);
        assert.ok(equipement[0].includes(echapper(phrase)), contexte);
      }
    });
  }

  test(`${langue} · /applications/ : 17 tuiles, 5 liens vers les modules, 12 tuiles grisées sans lien`, () => {
    const complet = page(`/${langue}/applications/`);
    const html = complet.slice(complet.indexOf('</header>'), complet.indexOf('<footer')); // hors barre et pied de page
    assert.equal(compter(html, /class="tuile[^"]*"/g), 17);
    const liens = (html.match(/<a [^>]*>/g) || []).filter((balise) => /class="[^"]*tuile/.test(balise));
    assert.equal(liens.length, 5);
    for (const balise of liens) assert.match(balise, /href="\/\w+\/applications\/[a-z-]+\/"/);
    assert.equal(compter(html, /<div[^>]*class="[^"]*grisee[^"]*"/g), 12);
    assert.equal(compter(html, /<div[^>]*grisee[^>]*(href|role)=/g), 0);
    assert.equal(compter(html, /(Bientôt|Coming soon)<\/span>/g), 12);
    for (const categorie of ['organiser', 'enseigner', 'gerer', 'communiquer']) assert.ok(html.includes(`id="categorie-${categorie}"`), categorie);
  });

  test(`${langue} · /socle/ : établissement, personnes, web et mobile, lien Sécurité`, () => {
    const html = page(`/${langue}/socle/`);
    for (const ancre of ['etablissement', 'personnes', 'web-mobile']) assert.ok(html.includes(`id="${ancre}"`), ancre);
    assert.ok(html.includes(`href="/${langue}/securite/"`));
    assert.equal(html.includes('class="onglets'), false, 'le socle n\'a pas d\'onglets');
    assert.equal(html.includes('id="equipement"'), false, 'ni bloc d\'équipement');
  });

  test(`${langue} · les anciennes adresses sont des pages de renvoi sans script`, () => {
    const cibles = { 'en-classe': 'applications/presences', etablissement: 'socle', application: 'socle', bibliotheque: 'applications' };
    for (const [ancien, nouveau] of Object.entries(cibles)) {
      const html = page(`/${langue}/${ancien}/`);
      assert.ok(html.includes(`url=/${langue}/${nouveau}/`), ancien);
      assert.equal(html.includes('<script'), false, ancien);
    }
  });
}

test('la page Bibliothèque des jeux reste, avec son onglet sur Quiz et jeux', () => {
  assert.ok(existsSync(resolve(DIST, 'fr/bibliotheque-des-jeux/index.html')));
  assert.ok(page('/fr/applications/quiz-et-jeux/').includes('href="/fr/bibliotheque-des-jeux/"'));
});
