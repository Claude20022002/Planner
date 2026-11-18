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

test('administration à 1440 px : le clavier ouvre une tuile en anglais et en mode sombre', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await page.setViewportSize({ width: 1440, height: 900 });
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.evaluate(() => {
    localStorage.setItem('hp.lang', 'en');
    localStorage.setItem('themeMode', 'dark');
  });
  await page.goto('/applications');
  await expect(page.getByRole('heading', { name: /^Hello(?:,|$)/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Your account' })).toBeVisible();
  const nav = page.getByRole('navigation', { name: 'Available applications' });
  const personnes = nav.getByRole('link', { name: 'People', exact: true });
  await personnes.focus();
  await expect(personnes).toBeFocused();
  await personnes.press('Enter');
  await expect(page).toHaveURL(/\/gestion\/utilisateurs$/);
});

test('enseignant : grille à 390 px avec mouvement réduit et sans gestion des personnes', async ({ page }) => {
  const { enseignante, motDePasse } = lireDonnees();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await seConnecter(page, { email: enseignante.email, motDePasse, role: 'enseignant' });
  await page.goto('/applications');
  const nav = page.getByRole('navigation', { name: 'Applications disponibles' });
  await expect(nav.getByRole('link', { name: 'Personnes', exact: true })).toHaveCount(0);
  const planning = nav.getByRole('link', { name: 'Emploi du temps', exact: true });
  await expect(planning).toBeVisible();
  await planning.hover();
  await planning.focus();
  await expect(planning.locator('[data-tuile-application]')).toHaveCSS('transform', 'none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
