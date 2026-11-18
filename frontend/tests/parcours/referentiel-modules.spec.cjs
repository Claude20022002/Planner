/** Modules : filtres locaux et détails lisibles dans le rendu mobile et le tableau. */
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

for (const [largeur, langue, theme] of [[390, 'en', 'dark'], [1280, 'fr', 'light']]) {
  test(`Modules à ${largeur}px, ${langue}, ${theme}`, async ({ page }) => {
    const { admin, motDePasse } = lireDonnees();
    await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.evaluate(([langue, theme]) => {
      localStorage.setItem('hp.lang', langue);
      localStorage.setItem('themeMode', theme);
    }, [langue, theme]);
    await page.goto('/gestion/cours');
    await expect(page.getByRole('status', { name: /Chargement des données|Loading data/ })).toHaveCount(0);
    const recherche = page.getByRole('searchbox');
    await recherche.fill('aucun-module-uix-06b');
    await expect(page.getByText(langue === 'en' ? 'No results' : 'Aucun résultat', { exact: true })).toBeVisible();
    await recherche.clear();
    const deplier = page.getByRole('button', { name: langue === 'en' ? /^Show the components of / : /^Afficher les composantes de / }).first();
    await expect(deplier).toBeVisible();
    await deplier.focus();
    await deplier.press('Enter');

    const contenus = page.locator('main').getByText(langue === 'en' ? 'Session' : 'Séance', { exact: true });
    await expect(contenus.first()).toBeVisible();
    await verifierAccessibilite(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}


test('Modules : réessayer relance une lecture de la maquette', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  const motif = '**/api/cours?*';
  await page.route(motif, (panne) => panne.abort());
  await page.goto('/gestion/cours');
  const reprendre = page.getByRole('button', { name: 'Réessayer', exact: true });
  await expect(reprendre).toBeVisible();
  await page.unroute(motif);
  const lecture = page.waitForResponse((reponse) => new URL(reponse.url()).pathname === '/api/cours' && reponse.ok());
  await reprendre.click();
  const { data } = await (await lecture).json();
  expect(data.length).toBeGreaterThan(0);
  await expect(page.getByRole('main').getByText(data[0].nom_cours, { exact: true }).first()).toBeVisible();
});
