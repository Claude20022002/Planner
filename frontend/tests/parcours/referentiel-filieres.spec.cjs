/** Filières : recherche, reprise réseau et accès réservés à l’administration. */
const { test, expect } = require('@playwright/test');
const { lireDonnees, seConnecter, enTeteCsrf } = require('./outils.cjs');

for (const [largeur, langue, theme] of [[390, 'en', 'dark'], [1280, 'fr', 'light']]) {
  test(`Filières à ${largeur}px, ${langue}, ${theme}`, async ({ page }) => {
    const { admin, motDePasse } = lireDonnees();
    await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.evaluate(([langue, theme]) => {
      localStorage.setItem('hp.lang', langue);
      localStorage.setItem('themeMode', theme);
    }, [langue, theme]);
    await page.goto('/gestion/filieres');
    const recherche = page.getByRole('searchbox', { name: langue === 'en' ? 'Search for a program' : 'Rechercher une filière' });
    await expect(recherche).toBeVisible();
    await expect(page.getByRole('status', { name: /Chargement des données|Loading data/ })).toHaveCount(0);
    await recherche.fill('aucune-filiere-uix-06b');
    await expect(page.getByText(langue === 'en' ? 'No results' : 'Aucun résultat', { exact: true })).toBeVisible();
    await recherche.fill('GEN');
    const ajouter = langue === 'en' ? 'Add a program' : 'Ajouter une filière';
    await page.getByRole('button', { name: ajouter, exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('textbox', { name: 'Code', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('Filières : réessayer réaffiche les données réellement reçues', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  const route = '**/api/filieres?*';
  await page.route(route, (panne) => panne.abort());
  await page.goto('/gestion/filieres');
  const reprendre = page.getByRole('button', { name: 'Réessayer', exact: true });
  await expect(reprendre).toBeVisible();
  await page.unroute(route);
  const relecture = page.waitForResponse((reponse) => new URL(reponse.url()).pathname === '/api/filieres' && reponse.ok());
  await reprendre.click();
  const { data } = await (await relecture).json();
  expect(data.length).toBeGreaterThan(0);
  await expect(page.getByRole('cell', { name: data[0].code_filiere + ' · ' + data[0].nom_filiere, exact: true })).toBeVisible();
});

test('étudiant et enseignant sans responsabilité : retour à leur accueil', async ({ browser }) => {
  const { enseignante, etudiants, motDePasse } = lireDonnees();
  for (const [compte, role] of [[enseignante, 'enseignant'], [etudiants[0], 'etudiant']]) {
    const contexte = await browser.newContext();
    try {
      const page = await contexte.newPage();
      await seConnecter(page, { email: compte.email, motDePasse, role });
      for (const chemin of ['filieres', 'groupes', 'cours', 'enseignements']) {
        await page.goto('/gestion/' + chemin);
        await expect(page).toHaveURL(new RegExp('/dashboard/' + role + '(?:/|$)'));
      }
    } finally {
      await contexte.close();
    }
  }
});


// Les droits sont accordés et retirés par les vraies routes de l’administration.
test('un responsable peut préparer une seule filière et Filières reste réservé à l’administration', async ({ page, browser }) => {
  const { admin, enseignante, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  const filieres = await page.request.get('/api/filieres?limit=100');
  const enseignants = await page.request.get('/api/enseignants?limit=100');
  expect(filieres.ok() && enseignants.ok()).toBe(true);
  const programme = (await filieres.json()).data.find((f) => f.code_filiere === 'GEN');
  const prof = (await enseignants.json()).data.find((e) => e.user.email === enseignante.email);
  expect(programme).toBeTruthy();
  expect(prof).toBeTruthy();
  const url = '/api/filieres/' + programme.id_filiere + '/responsables';
  const headers = await enTeteCsrf(page);
  const contexte = await browser.newContext();
  try {
    const ajout = await page.request.post(url, { headers, data: { id_user: prof.id_user } });
    expect(ajout.ok()).toBe(true);
    const responsable = await contexte.newPage();
    await seConnecter(responsable, { email: enseignante.email, motDePasse, role: 'enseignant' });
    await responsable.goto('/gestion/filieres');
    await expect(responsable).toHaveURL(/\/dashboard\/enseignant$/);
    for (const chemin of ['groupes', 'cours', 'enseignements']) {
      await responsable.goto('/gestion/' + chemin);
      await expect(responsable).toHaveURL(new RegExp('/gestion/' + chemin + '$'));
      const selecteur = responsable.getByRole('combobox', { name: 'Filière', exact: true });
      await expect(responsable.getByRole('status', { name: 'Chargement des données' })).toHaveCount(0);
      await selecteur.click();
      await expect(responsable.getByRole('option', { name: /^GEN · / })).toBeVisible();
      await expect(responsable.getByRole('option', { name: / · / })).toHaveCount(1);
      await responsable.keyboard.press('Escape');
    }
  } finally {
    await contexte.close();
    const retrait = await page.request.delete(url + '/' + prof.id_user, { headers });
    expect([200, 404]).toContain(retrait.status());
  }
});
