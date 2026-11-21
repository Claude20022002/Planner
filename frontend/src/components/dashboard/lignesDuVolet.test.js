/**
 * Volets du tableau de bord (UIX-11) : chaque chiffre a sa route qui existe, ses colonnes traduites,
 * une page « Tout voir » qui existe, et la période passée à la route est celle affichée.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CHIFFRES, PLAFOND_SEANCES, VOLETS } from './lignesDuVolet.js';
import fr from '../../i18n/tableauDeBord.fr.js';
import en from '../../i18n/tableauDeBord.en.js';

const lire = (chemin) => readFileSync(new URL(chemin, import.meta.url), 'utf8');
const sourceApi = lire('../../services/api.js');
const sourceRoutes = lire('../../App.jsx');

/** La fonction `fonction` de l'objet exporté `objet` dans services/api.js. */
const fonctionExiste = (objet, fonction) => {
  const debut = sourceApi.indexOf(`export const ${objet} = {`);
  if (debut < 0) return false;
  const fin = sourceApi.indexOf('export const', debut + 1);
  return new RegExp(`\\b${fonction}\\s*:`).test(sourceApi.slice(debut, fin < 0 ? undefined : fin));
};

const outils = { t: (cle, o) => o?.defaultValue ?? cle, nombre: String, date: String, heure: (h) => (h ? String(h).slice(0, 5) : '') };

test('les sept chiffres du plan ont chacun leur volet', () => {
  assert.deepEqual(CHIFFRES.sort(), ['enseignantsSemaine', 'enseignementsEnRetard', 'examens', 'heuresMois', 'occupationSalles', 'seancesSemaine', 'usage']);
});

for (const id of CHIFFRES) {
  const volet = VOLETS[id];

  test(`${id} : sa route existe dans services/api.js`, () => {
    assert.equal(fonctionExiste(...volet.api), true, volet.api.join('.'));
  });

  test(`${id} : sa page « Tout voir » existe dans les routes de l’application`, () => {
    const chemin = volet.toutVoir.split('?')[0];
    assert.match(sourceRoutes, new RegExp(`path="${chemin}"`));
  });

  test(`${id} : des colonnes, chacune nommée en français et en anglais, sûres sur une ligne vide`, () => {
    assert.ok(volet.colonnes.length > 0);
    for (const c of volet.colonnes) {
      assert.ok(fr.colonnes[c.cle], `fr.colonnes.${c.cle}`);
      assert.ok(en.colonnes[c.cle], `en.colonnes.${c.cle}`);
      assert.doesNotThrow(() => c.valeur({}, outils));
    }
    if (volet.note) assert.ok(fr.notes[volet.note] && en.notes[volet.note]);
  });

  test(`${id} : une réponse vide ou absente ne donne aucune ligne`, () => {
    assert.deepEqual(volet.lignes(null), []);
  });
}

test('la période passée à la route est celle affichée', () => {
  const semaine = { debut: '2026-11-16', fin: '2026-11-22' };
  assert.deepEqual(VOLETS.occupationSalles.arguments(semaine), [{ date_debut: '2026-11-16', date_fin: '2026-11-22' }]);
  assert.deepEqual(VOLETS.enseignantsSemaine.arguments(semaine), [{ date_debut: '2026-11-16', date_fin: '2026-11-22' }]);
  assert.deepEqual(VOLETS.seancesSemaine.arguments(semaine), [{ date_from: '2026-11-16', date_to: '2026-11-22', ordre: 'asc', limit: PLAFOND_SEANCES }]);
  assert.deepEqual(VOLETS.examens.arguments({ debut: '2026-11-21', fin: '2026-12-04' }), [{ date_from: '2026-11-21', date_to: '2026-12-04' }]);
  assert.deepEqual(VOLETS.heuresMois.arguments({ mois: '2026-11' }), ['2026-11']);
  assert.deepEqual(VOLETS.usage.arguments({ mois: '2026-11' }), ['2026-11']);
  assert.deepEqual(VOLETS.enseignementsEnRetard.arguments({ id_periode: 2 }), [{ id_periode: 2 }]);
});

test('les lignes sont celles que le chiffre compte', () => {
  const modules = [{ en_retard: true }, { en_retard: false }, { en_retard: true }];
  assert.equal(VOLETS.enseignementsEnRetard.lignes(modules).length, 2);
  // Une épreuve annulée n'est plus à venir
  const examens = [{ statut: 'publiee' }, { statut: 'brouillon' }, { statut: 'annulee' }];
  assert.equal(VOLETS.examens.lignes(examens).length, 2);
  // Comme les statistiques, la liste des séances de la semaine laisse les séances annulées
  assert.equal(VOLETS.seancesSemaine.lignes({ data: [{ statut: 'planifie' }, { statut: 'realise' }, { statut: 'annule' }] }).length, 2);
  const kpis = { kpis: { taux_occupation_salles: { graphique: [{ nom: 'A1', heures: 12, taux: 30 }] } } };
  assert.equal(VOLETS.occupationSalles.lignes(kpis).length, 1);
});

test('l’usage montre le détail de ses compteurs, chacun traduit', () => {
  const usage = { comptes_actifs: { total: 9, etudiant: 6, enseignant: 2, admin: 1 }, appels_valides: 4, quiz: { parties: 3, joueurs: 20 }, devoirs_rendus: 5 };
  const lignes = VOLETS.usage.lignes(usage);
  assert.equal(lignes[0].valeur, 9);
  for (const l of lignes) {
    assert.ok(fr.usage[l.compteur] && en.usage[l.compteur], l.compteur);
  }
});

test('les mêmes clés en français et en anglais', () => {
  const cles = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (typeof v === 'object' ? cles(v, `${p}${k}.`) : [`${p}${k}`])).sort();
  assert.deepEqual(cles(en), cles(fr));
});
