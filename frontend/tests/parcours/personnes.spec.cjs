/** Régressions réelles du pilote : listes, recherche, formulaires et téléphone. Aucun serveur simulé. */
const { test, expect } = require('@playwright/test');
const { lireDonnees, seConnecter } = require('./outils.cjs');

for (const mode of ['light', 'dark']) {
  for (const largeur of [390, 1280]) {
    test('Personnes en ' + mode + ' à ' + largeur + ' px', async ({ page }) => {
      await page.setViewportSize({ width: largeur, height: 900 });
      await page.addInitScript((valeur) => { localStorage.setItem('themeMode', valeur); }, mode);
      const d = lireDonnees();
      await seConnecter(page, { email: d.admin.email, motDePasse: d.motDePasse, role: 'admin' });
      for (const [chemin, ajouter] of [
        ['utilisateurs', 'Ajouter un administrateur'],
        ['enseignants', 'Ajouter un enseignant'],
        ['etudiants', 'Ajouter un étudiant'],
      ]) {
        await page.goto('/gestion/' + chemin);
        await expect(page.getByRole('status', { name: 'Chargement des personnes' })).toHaveCount(0);
        await expect(page.getByRole('button', { name: ajouter, exact: true })).toBeVisible();
        const recherche = page.getByRole('searchbox');
        expect(await recherche.evaluate((e) => getComputedStyle(e).fontFamily)).toContain('Inter');
        await recherche.fill('aucune-personne-uix');
        await expect(page.getByText('Aucun résultat', { exact: true })).toBeVisible();
        await recherche.fill('');
        await page.getByRole('button', { name: ajouter, exact: true }).click();
        const dialogue = page.getByRole('dialog');
        await expect(dialogue).toBeVisible();
        await expect(dialogue.getByRole('button', { name: 'Annuler', exact: true })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
        await dialogue.getByRole('button', { name: 'Annuler', exact: true }).click();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
        await page.getByRole('searchbox').focus();
        await expect(page.getByRole('searchbox')).toBeFocused();
      }
    });
  }
}

test('connexion : anglais, thème et clavier restent disponibles', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/connexion');
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Sign in', exact: true })).toBeVisible();
  expect(await page.getByRole('textbox', { name: 'Username', exact: true }).evaluate((e) => getComputedStyle(e).fontFamily)).toContain('Inter');
  await page.getByRole('textbox', { name: 'Username', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('textbox', { name: 'Password', exact: true })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
});


test('Comptes : une lecture réseau échouée propose de réessayer', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const d = lireDonnees();
  await seConnecter(page, { email: d.admin.email, motDePasse: d.motDePasse, role: 'admin' });
  const motif = '**/api/users?*';
  await page.route(motif, (route) => route.abort());
  await page.goto('/gestion/utilisateurs');
  await expect(page.getByRole('button', { name: 'Réessayer', exact: true })).toBeVisible();
  await page.unroute(motif);
  // Le compte connecté peut être sur une autre page : vérifier la réponse réellement rechargée.
  const lecture = page.waitForResponse((reponse) => {
    const url = new URL(reponse.url());
    return reponse.request().method() === 'GET' && url.pathname === '/api/users'
      && url.searchParams.get('page') === '1' && url.searchParams.get('limit') === '10';
  });
  await page.getByRole('button', { name: 'Réessayer', exact: true }).click();
  const reponse = await lecture;
  expect(reponse.ok()).toBeTruthy();
  const { data: comptes } = await reponse.json();
  expect(comptes.length).toBeGreaterThan(0);
  await expect(page.getByRole('button', { name: 'Réessayer', exact: true })).toBeHidden();
  const tableau = page.getByRole('table');
  await expect(tableau.getByRole('row')).toHaveCount(comptes.length + 1);
  for (const compte of comptes) {
    // La table montre l'identifiant et l'adresse (VSC-03, Q-20) : pour un compte de reprise, les
    // deux cellules portent le même texte, d'où `first()`.
    await expect(tableau.getByRole('cell', { name: compte.email, exact: true }).first()).toBeVisible();
  }
});
