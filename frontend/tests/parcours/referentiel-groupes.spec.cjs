/** Groupes : le changement d’année invalide une lecture précédente, même sur téléphone. */
const { test, expect } = require('@playwright/test');
const { lireDonnees, seConnecter } = require('./outils.cjs');

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

test('une réponse lente de l’année en cours ne réapparaît pas après changement', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/gestion/groupes');
  const filiere = page.getByRole('combobox', { name: 'Filière' });
  await filiere.click();
  await page.getByRole('option', { name: /^GEN · / }).click();

  await expect(page.getByRole('heading', { name: '4A GEN', exact: true })).toBeVisible();
  const filtre = page.getByRole('combobox', { name: 'Année universitaire' });
  await filtre.click();
  await page.getByRole('option', { name: '2025-2026' }).click();
  await expect(page.getByText('Aucun groupe GEN en 2025-2026', { exact: true })).toBeVisible();

  const premiere = Promise.withResolvers();
  const liberer = Promise.withResolvers();
  const envoyee = Promise.withResolvers();
  await page.route('**/api/groupes/arbre?*', async (route) => {
    const reponse = await route.fetch();
    premiere.resolve();
    await liberer.promise;
    try {
      await route.fulfill({ response: reponse });
    } finally {
      envoyee.resolve();
    }
  }, { times: 1 });

  try {
    await filtre.click();
    await page.getByRole('option', { name: '2026-2027 (en cours)' }).click();
    await premiere.promise;
    await expect(page.getByRole('status', { name: 'Chargement des données' })).toBeVisible();
    await filtre.click();
    await page.getByRole('option', { name: '2025-2026' }).click();
    await expect(page.getByText('Aucun groupe GEN en 2025-2026', { exact: true })).toBeVisible();
  } finally {
    liberer.resolve();
  }
  await envoyee.promise;
  await expect(page.getByText('Aucun groupe GEN en 2025-2026', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '4A GEN', exact: true })).toHaveCount(0);

  await filtre.click();
  await page.getByRole('option', { name: 'Toutes les années' }).click();
  const promotion = page.getByRole('listitem').filter({ has: page.getByRole('heading', { name: '4A GEN', exact: true }) });
  await expect(promotion.getByText(/Groupe parent/).first()).toBeVisible();
  await promotion.getByText('Détails', { exact: true }).click();
  await expect(promotion.getByText('Niveau', { exact: true })).toBeVisible();
  await verifierAccessibilite(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});


test('Groupes à 1280 px en anglais et en thème sombre', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => {
    localStorage.setItem('hp.lang', 'en');
    localStorage.setItem('themeMode', 'dark');
  });
  await page.goto('/gestion/groupes');
  const contenu = page.getByRole('main');
  await contenu.getByRole('combobox', { name: 'Program', exact: true }).click();
  await page.getByRole('option', { name: /^GEN · / }).click();
  const promotion = contenu.getByRole('row').filter({ hasText: '4A GEN' }).first();
  await expect(promotion).toBeVisible();
  await expect(contenu.getByRole('columnheader', { name: 'Parent group', exact: true })).toBeVisible();
  await verifierAccessibilite(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
