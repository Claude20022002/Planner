/** Enseignements : distinction entre les options indisponibles et l’absence de période. */
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

test('Enseignements : relance l’initialisation réelle après une panne des périodes', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.setViewportSize({ width: 390, height: 900 });
  const motif = '**/api/calendrier/annees*';
  await page.route(motif, (panne) => panne.abort());
  await page.goto('/gestion/enseignements');
  const reprendre = page.getByRole('button', { name: 'Réessayer', exact: true });
  await expect(reprendre).toBeVisible();
  await expect(page.getByText('Aucune période', { exact: true })).toHaveCount(0);
  await page.unroute(motif);
  const relecture = page.waitForResponse((reponse) => new URL(reponse.url()).pathname === '/api/enseignements' && reponse.ok());
  await reprendre.click();
  const reponse = await relecture;
  const periode = new URL(reponse.url()).searchParams.get('id_periode');
  expect(periode).toBeTruthy();
  await expect(reprendre).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Générer depuis la maquette' })).toBeEnabled();
  await verifierAccessibilite(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

for (const largeur of [390, 1280]) {
  test('Enseignements à ' + largeur + ' px : la période expose les groupes et l’équipe', async ({ page }) => {
    const { admin, motDePasse, seance } = lireDonnees();
    await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.evaluate(() => {
      localStorage.setItem('hp.lang', 'en');
      localStorage.setItem('themeMode', 'dark');
    });
    await page.goto('/gestion/enseignements');
    await expect(page.getByRole('button', { name: 'Generate from the curriculum' })).toBeEnabled();
    await page.getByRole('main').getByRole('combobox', { name: 'Period', exact: true }).click();
    await page
      .getByRole('option', { name: /^2025-2026 · / })
      .first()
      .click();
    const ligne = page
      .getByRole('main')
      .getByRole(largeur === 390 ? 'listitem' : 'row')
      .filter({ hasText: seance.cours })
      .first();
    await expect(ligne).toBeVisible();
    if (largeur === 390) await ligne.locator('summary').click();
    await expect(ligne.getByText(seance.groupe, { exact: false })).toBeVisible();
    await ligne.getByRole('checkbox', { name: /^Select / }).check();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await verifierAccessibilite(page);
    await ligne.getByRole('button', { name: 'Open the team' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await verifierAccessibilite(page, '[role="dialog"]');
  });
}

test('Enseignements : période vide et filtre filière sans résultat', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.route('**/api/enseignements?*', (route) => route.fulfill({ json: [] }));
  await page.goto('/gestion/enseignements');
  await expect(page.getByText('Aucun élément enregistré', { exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Filière', exact: true }).click();
  await page.getByRole('option', { name: /^GEN · / }).click();
  await expect(page.getByText('Aucun résultat', { exact: true })).toBeVisible();
});
