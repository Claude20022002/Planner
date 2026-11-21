/** Créneaux (UIX-06c, lot 3) : grille et liste par jour, accessibilité, changement de grille, chevauchement signalé, accès réservé. */
const { test, expect } = require('@playwright/test');
const { lireDonnees, seConnecter } = require('./outils.cjs');

// Connexion, compilation à froid par Vite puis plusieurs allers-retours : 30 s ne suffisent pas toujours
test.describe.configure({ timeout: 60_000 });

async function verifierAccessibilite(page, selecteur = 'main') {
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const violations = await page.evaluate(async (selecteur) => {
    const { violations } = await window.axe.run(selecteur, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    return violations.map(({ id, nodes }) => ({ id, cibles: nodes.map(({ target }) => target) }));
  }, selecteur);
  expect(violations, 'Violations WCAG A/AA dans ' + selecteur).toEqual([]);
}

const choisir = async (page, liste, option) => {
  await page.getByRole('combobox', { name: liste }).click();
  await page.getByRole('option', { name: option, exact: true }).click();
};

for (const [largeur, langue, theme] of [
  [390, 'en', 'dark'],
  [1280, 'fr', 'light'],
]) {
  test(`Créneaux à ${largeur}px, ${langue}, ${theme}`, async ({ page }) => {
    const { admin, motDePasse } = lireDonnees();
    await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.evaluate(([l, th]) => (localStorage.setItem('hp.lang', l), localStorage.setItem('themeMode', th)), [langue, theme]);
    await page.goto('/gestion/creneaux');
    await expect(page.getByRole('status', { name: /Chargement des données|Loading data/ })).toHaveCount(0);
    // Téléphone : un titre par jour ; ordinateur : une colonne par jour
    if (largeur === 390) await expect(page.getByRole('heading', { name: 'Monday', exact: true })).toBeVisible();
    else await expect(page.getByRole('columnheader', { name: 'Lundi', exact: true })).toBeVisible();
    await verifierAccessibilite(page);
    await page.getByRole('button', { name: langue === 'en' ? 'Add a slot' : 'Ajouter un créneau', exact: true }).click();
    const dialogue = page.getByRole('dialog');
    await expect(page.locator('.MuiDialog-container').filter({ has: dialogue })).toHaveCSS('opacity', '1');
    await verifierAccessibilite(page, '[role="dialog"]');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('Créneaux : la grille affichée est celle du régime et de la variante choisis', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.goto('/gestion/creneaux');
  await expect(page.getByRole('status', { name: 'Chargement des données' })).toHaveCount(0);
  const relecture = page.waitForResponse((r) => new URL(r.url()).searchParams.get('variante') === 'ramadan' && r.ok());
  await choisir(page, 'Variante de la grille', 'Grille Ramadan');
  const { data } = await (await relecture).json();
  await expect(page.getByRole('status').filter({ hasText: /résultats?$/ })).toHaveText(data.length + (data.length > 1 ? ' résultats' : ' résultat'));
});

test('Créneaux : fin avant le début refusée, chevauchement signalé, puis suppression', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.goto('/gestion/creneaux');
  await choisir(page, 'Régime de formation', 'Executive');
  await expect(page.getByRole('status', { name: 'Chargement des données' })).toHaveCount(0);
  const ajouter = async (debut, fin) => {
    await page.getByRole('button', { name: 'Ajouter un créneau', exact: true }).click();
    const dialogue = page.getByRole('dialog');
    await choisir(page, 'Jour', 'Dimanche');
    await dialogue.getByLabel('Début').fill(debut);
    await dialogue.getByLabel('Fin').fill(fin);
    await dialogue.getByRole('button', { name: 'Enregistrer', exact: true }).click();
    return dialogue;
  };
  const refus = await ajouter('10:00', '09:00');
  await expect(page.getByText('L’heure de fin doit suivre l’heure de début')).toBeVisible();
  await refus.getByRole('button', { name: 'Annuler', exact: true }).click();

  await expect(await ajouter('07:00', '08:30')).toBeHidden();
  await expect(await ajouter('08:00', '09:30')).toBeHidden();
  // Le dimanche apparaît dès qu'il porte un créneau ; le second commence avant la fin du premier
  await expect(page.getByRole('columnheader', { name: 'Dimanche', exact: true })).toBeVisible();
  const second = page.getByRole('button', { name: 'Modifier le créneau du Dimanche, 08:00 – 09:30' });
  await expect(second).toContainText('Chevauchement');

  for (const nom of ['Modifier le créneau du Dimanche, 08:00 – 09:30', 'Modifier le créneau du Dimanche, 07:00 – 08:30']) {
    await page.getByRole('button', { name: nom }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Supprimer', exact: true }).click();
    await page.getByRole('dialog', { name: 'Supprimer le créneau' }).getByRole('button', { name: 'Supprimer', exact: true }).click();
    await expect(page.getByRole('button', { name: nom })).toHaveCount(0);
  }
  await expect(page.getByRole('columnheader', { name: 'Dimanche', exact: true })).toHaveCount(0);
});

test('Créneaux : réessayer réaffiche la grille réellement reçue', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  const route = '**/api/creneaux?*';
  await page.route(route, (panne) => panne.abort());
  await page.goto('/gestion/creneaux');
  const reprendre = page.getByRole('button', { name: 'Réessayer', exact: true });
  await expect(reprendre).toBeVisible();
  await page.unroute(route);
  const relecture = page.waitForResponse((r) => new URL(r.url()).pathname === '/api/creneaux' && r.ok());
  await reprendre.click();
  const { data } = await (await relecture).json();
  expect(data.length).toBeGreaterThan(0);
  await expect(page.getByRole('columnheader', { name: 'Lundi', exact: true })).toBeVisible();
});

for (const role of ['enseignant', 'etudiant']) {
  test('Créneaux : ' + role + ' est renvoyé vers son accueil', async ({ page }) => {
    const { enseignante, etudiants, motDePasse } = lireDonnees();
    const compte = role === 'enseignant' ? enseignante : etudiants[0];
    await seConnecter(page, { email: compte.email, motDePasse, role });
    await page.goto('/gestion/creneaux');
    await expect(page).toHaveURL(new RegExp('/dashboard/' + role + '(?:/|$)'));
  });
}
