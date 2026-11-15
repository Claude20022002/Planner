/** Parcours du lanceur : recherche, navigation contextuelle et visibilité selon le rôle. */
const { test, expect } = require('@playwright/test');
const { lireDonnees, seConnecter } = require('./outils.cjs');
test('administration : chercher une rubrique, l’ouvrir et revenir', async ({ page }) => {
  const d = lireDonnees();
  await seConnecter(page, { email: d.admin.email, motDePasse: d.motDePasse, role: 'admin' });
  await page.goto('/applications');
  const recherche = page.getByRole('searchbox', { name: 'Rechercher une application ou une rubrique' });
  await recherche.fill('enseignants');
  const applications = page.getByRole('navigation', { name: 'Applications disponibles' });
  await applications.getByRole('link', { name: 'Enseignants', exact: true }).click();
  await expect(page).toHaveURL(/\/gestion\/enseignants$/);
  await expect(page.getByRole('navigation', { name: 'Menu', exact: true }).getByText('Personnes', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Toutes les applications', exact: true }).last().click();
  await expect(page).toHaveURL(/\/applications$/);
  await recherche.fill('aucun-resultat');
  await expect(page.getByText('Aucune application ne correspond à votre recherche.')).toBeVisible();
  await page.getByRole('button', { name: 'Effacer la recherche' }).click();
  await expect(recherche).toHaveValue('');
});
test('étudiant : pas de gestion des personnes, accueil utilisable sur téléphone', async ({ page }) => {
  const d = lireDonnees();
  await page.setViewportSize({ width: 390, height: 844 });
  await seConnecter(page, { email: d.etudiants[0].email, motDePasse: d.motDePasse, role: 'etudiant' });
  await page.goto('/applications');
  const applications = page.getByRole('navigation', { name: 'Applications disponibles' });
  await expect(applications.getByRole('link', { name: 'Personnes', exact: true })).toHaveCount(0);
  await expect(applications.getByRole('heading', { name: 'Emploi du temps', exact: true }).getByRole('link')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.getByRole('searchbox').focus();
  await page.keyboard.type('quiz');
  await expect(applications.getByRole('link', { name: 'Quiz et jeux', exact: true })).toBeVisible();
});
