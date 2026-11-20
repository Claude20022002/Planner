import { dateOffre, filieresDesOffres, lienCandidature, offresFiltrees, periodeOffre, prixOffre } from '../src/stage/offres';

/** Offres de stage (STA-01) : prix, période, filières et filtres de la liste mobile. */

const OFFRE = {
  id: 1,
  titre: 'Stage Data Analyst',
  entreprise: 'Atlas Analytics',
  ville: 'Casablanca',
  id_filiere: 3,
  filiere: 'IIIA',
  niveau: '3A',
  debut: '2026-09-01',
  fin: '2026-12-31',
  gratification: '1500.00',
  devise: 'MAD',
  lien_candidature: 'https://exemple.ma/stage',
};

test('dates du serveur en JJ/MM/AAAA, valeurs vides comprises', () => {
  expect(dateOffre('2026-09-01')).toBe('01/09/2026');
  expect(dateOffre('2026-09-01T00:00:00.000Z')).toBeNull();
  expect(dateOffre(null)).toBeNull();
});

test('période : les deux bornes, le début seul, la fin seule, rien', () => {
  expect(periodeOffre(OFFRE)).toEqual({ type: 'periode', debut: '01/09/2026', fin: '31/12/2026' });
  expect(periodeOffre({ debut: '2026-09-01' })).toEqual({ type: 'debut', debut: '01/09/2026' });
  expect(periodeOffre({ fin: '2026-12-31' })).toEqual({ type: 'fin', fin: '31/12/2026' });
  expect(periodeOffre({})).toEqual({ type: null });
});

test('prix affiché tel que saisi, dans sa devise', () => {
  expect(prixOffre(OFFRE)).toBe('1\u202F500 MAD');
  expect(prixOffre({ gratification: 1500.5, devise: 'EUR' })).toBe('1\u202F500,50 EUR');
  expect(prixOffre({})).toBeNull();
});

test('filières de la liste, sans doublon et triées', () => {
  expect(filieresDesOffres([OFFRE, { ...OFFRE, id: 2 }, { ...OFFRE, id: 3, id_filiere: 5, filiere: 'GEA' }])).toEqual([
    { id: 5, nom: 'GEA' },
    { id: 3, nom: 'IIIA' },
  ]);
  expect(filieresDesOffres([])).toEqual([]);
});

test('filtre : recherche sur le titre, l’entreprise et la ville, puis filière', () => {
  const autre = { ...OFFRE, id: 2, titre: 'Stage Marketing', entreprise: 'Media Plus', ville: 'Rabat', id_filiere: 5, filiere: 'GEA' };
  expect(offresFiltrees([OFFRE, autre]).length).toBe(2);
  expect(offresFiltrees([OFFRE, autre], { recherche: 'casablanca' }).map((o) => o.id)).toEqual([1]);
  expect(offresFiltrees([OFFRE, autre], { idFiliere: 5 }).map((o) => o.id)).toEqual([2]);
  expect(offresFiltrees([OFFRE, autre], { recherche: 'zzz' }).length).toBe(0);
});

test('un lien de candidature non http(s) n’est pas proposé', () => {
  expect(lienCandidature(OFFRE)).toBe('https://exemple.ma/stage');
  expect(lienCandidature({ lien_candidature: 'javascript:alert(1)' })).toBeNull();
  expect(lienCandidature({})).toBeNull();
});
