// Tests du lot B de VIT-20 sur le site construit (dist/) : pages de module, socle, onglets, fonctionnalités, « Pour qui »,
// « Un besoin, une application. », tuiles « Bientôt » sans lien, pages de renvoi. Lancer après `npm run build`, depuis vitrine/ :
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
const logoAffiche = (html) => html.match(/<span class="logo"[^>]*>\s*(<svg\b[\s\S]*?<\/svg>)/)?.[1].replaceAll('\r\n', '\n');
const logoOfficiel = (nom) => {
  assert.ok(nom, 'le module doit référencer un logo officiel');
  return readFileSync(resolve(__dirname, '../../shared/icones/modules', `${nom}.svg`), 'utf8')
    .trim().replaceAll('\r\n', '\n').replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
};
const echapper = (texte) => texte.replaceAll('&', '&amp;').replaceAll("'", '&#39;');

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
      const cartes = html.match(/<section id="fonctionnalites"[^>]*>[\s\S]*?<\/section>/)?.[0];
      assert.equal(compter(cartes, /<li[ >]/g), attendu);
      assert.equal(attendu, segment === 'emploi-du-temps' ? 4 : 3);
      const autres = html.match(/<section id="autres-applications"[^>]*>[\s\S]*?<\/section>/)?.[0];
      const liens = [...autres.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => m[1]);
      assert.deepEqual(liens, [
        ...Object.keys(MODULES).filter((nom) => nom !== segment).map((nom) => '/' + langue + '/applications/' + nom + '/'),
        '/' + langue + '/applications/',
      ]);
      assert.doesNotMatch(html, /href="#guide"|id="guide"/);
      assert.ok(html.indexOf('id="page-titre"') < html.indexOf('id="fonctionnalites"'));
      assert.ok(html.indexOf('id="equipement"') < html.indexOf('id="autres-applications"'));
      const equipement = html.match(/<section id="equipement"[^>]*>([\s\S]*?)<\/section>/g) || [];
      assert.equal(equipement.length, 1, 'un seul bloc d’équipement par page de module');
      assert.match(equipement[0], /aria-labelledby="equipement-titre"/);
      assert.equal(compter(equipement[0], /<li[ >]/g), 3, 'trois contextes d’équipement');
      const textes = require(`../src/i18n/${langue}/equipement.json`);
      for (const [contexte, phrase] of Object.entries(textes.modules[cle])) {
        assert.ok(equipement[0].includes(echapper(textes.contextes[contexte])), contexte);
        assert.ok(equipement[0].includes(echapper(phrase)), contexte);
      }
    });
  }

  test(`${langue} · les cinq bandeaux affichent leur logo officiel`, async () => {
    const { moduleDe } = await import('../src/donnees/modules.js');
    for (const [segment, cle] of Object.entries(MODULES)) {
      const html = page(`/${langue}/applications/${segment}/`);
      assert.equal(logoAffiche(html), logoOfficiel(moduleDe(cle).logo), segment);
    }
  });

  test(`${langue} · /applications/ : 17 tuiles, 5 liens vers les modules, 12 tuiles « Bientôt » sans lien`, () => {
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

  test(`${langue} · les 17 tuiles affichent chacune leur logo officiel`, async () => {
    const { MODULES: modules } = await import('../src/donnees/modules.js');
    const { noms } = require(`../src/i18n/${langue}/modules.json`);
    const html = page(`/${langue}/applications/`);
    const tuiles = html.match(/<(a|div)\b[^>]*\bclass="tuile grille[^"]*"[^>]*>[\s\S]*?<\/\1>/g) || [];
    assert.equal(tuiles.length, modules.length);
    for (const { cle, logo } of modules) {
      const nom = echapper(noms[cle]);
      const tuile = tuiles.find((contenu) => contenu.includes(`>${nom}</span>`));
      assert.ok(tuile, cle);
      assert.equal(logoAffiche(tuile), logoOfficiel(logo), cle);
    }
  });

  test(`${langue} · les grilles principales et les autres applications réutilisent les tuiles compactes`, () => {
    const tuiles = (html) => html.match(/<(a|div)\b[^>]*class="tuile grille(?: [^"]*)?"[^>]*>[\s\S]*?<\/\1>/g) || [];
    for (const adresse of [`/${langue}/`, `/${langue}/applications/`]) {
      const grille = tuiles(page(adresse));
      assert.equal(grille.length, 17, adresse);
      assert.equal(grille.filter((tuile) => tuile.startsWith('<a ')).length, 5, adresse);
      assert.equal(grille.filter((tuile) => tuile.includes('class="badge"')).length, 12, adresse);
      for (const tuile of grille) {
        assert.match(tuile, /class="tuile grille [^"]*\bcompacte\b/);
        assert.match(tuile, /<span class="logo"[^>]*>\s*<svg\b[\s\S]*?<\/svg>\s*<\/span>\s*<span class="nom"/);
      }
    }
    const autres = tuiles(page(`/${langue}/applications/presences/`));
    assert.equal(autres.length, 4);
    assert.ok(autres.every((tuile) => tuile.startsWith('<a ') && /\bcompacte\b/.test(tuile)));
  });

  test(langue + ' · types d’établissement de Présences et absence de bloc sans type', () => {
    const html = page('/' + langue + '/applications/presences/');
    const bloc = html.match(/<section id="pour-qui"[^>]*>[\s\S]*?<\/section>/)?.[0];
    assert.deepEqual([...bloc.matchAll(/href="([^"]+)"/g)].map((m) => m[1]), [
      '/' + langue + '/solutions/#superieur', '/' + langue + '/solutions/#college-lycee',
    ]);
    for (const segment of ['espace-de-cours', 'annonces-et-messages']) {
      assert.doesNotMatch(page('/' + langue + '/applications/' + segment + '/'), /id="pour-qui"/);
    }
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
