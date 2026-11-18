/** Enseignements : distinction entre les options indisponibles et l’absence de période. */
const { test, expect } = require('@playwright/test');
const { lireDonnees, seConnecter } = require('./outils.cjs');

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
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});


test('Enseignements à 1280 px en anglais : la période expose les groupes et l’équipe', async ({ page }) => {
  const { admin, motDePasse, seance } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => {
    localStorage.setItem('hp.lang', 'en');
    localStorage.setItem('themeMode', 'dark');
  });
  await page.goto('/gestion/enseignements');
  await expect(page.getByRole('button', { name: 'Generate from the curriculum' })).toBeEnabled();
  await page.getByRole('main').getByRole('combobox', { name: 'Period', exact: true }).click();
  await page.getByRole('option', { name: /^2025-2026 · / }).first().click();
  const ligne = page.getByRole('main').getByRole('row').filter({ hasText: seance.cours }).first();
  await expect(ligne).toContainText(seance.groupe);
  await ligne.getByRole('button', { name: 'Open the team' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
