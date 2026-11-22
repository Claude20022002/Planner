/** Salles (UIX-06c, lot 1) : affichage et accessibilité, import tout ou rien, reprise réseau, fiche, accès réservé. */
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

const ouvrirSalles = async (page) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.goto('/gestion/salles');
  await expect(page.getByRole('status', { name: 'Chargement des données' })).toHaveCount(0);
};

for (const [largeur, langue, theme] of [
  [390, 'en', 'dark'],
  [1280, 'fr', 'light'],
]) {
  test(`Salles à ${largeur}px, ${langue}, ${theme}`, async ({ page }) => {
    const { admin, motDePasse, seanceFixe } = lireDonnees();
    await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.evaluate(([l, th]) => (localStorage.setItem('hp.lang', l), localStorage.setItem('themeMode', th)), [langue, theme]);
    await page.goto('/gestion/salles');
    const recherche = page.getByRole('searchbox', { name: langue === 'en' ? 'Search for a room' : 'Rechercher une salle' });
    await expect(recherche).toBeVisible();
    await expect(page.getByRole('status', { name: /Chargement des données|Loading data/ })).toHaveCount(0);
    await recherche.fill('aucune-salle-uix-06c');
    await expect(page.getByText(langue === 'en' ? 'No results' : 'Aucun résultat', { exact: true })).toBeVisible();
    await recherche.fill(seanceFixe.salle);
    // Sur téléphone, une fiche par salle : son nom en titre, ses places visibles sans ouvrir « Détails »
    if (largeur === 390) {
      await expect(page.getByRole('heading', { name: seanceFixe.salle, exact: true })).toBeVisible();
      await expect(page.getByText(/^\d+ seats?$/).first()).toBeVisible();
    } else await expect(page.getByRole('cell', { name: seanceFixe.salle, exact: true })).toBeVisible();
    await verifierAccessibilite(page);
    await page.getByRole('button', { name: langue === 'en' ? 'Add a room' : 'Ajouter une salle', exact: true }).click();
    const dialogue = page.getByRole('dialog');
    await expect(dialogue.getByRole('textbox', { name: langue === 'en' ? 'Room name' : 'Nom de la salle' })).toBeVisible();
    await expect(page.locator('.MuiDialog-container').filter({ has: dialogue })).toHaveCSS('opacity', '1');
    await verifierAccessibilite(page, '[role="dialog"]');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('Salles : l’import refuse tout le fichier et nomme la ligne en erreur', async ({ page }) => {
  await ouvrirSalles(page);
  await page.getByRole('button', { name: 'Importer l’inventaire', exact: true }).first().click();
  const dialogue = page.getByRole('dialog', { name: 'Importer l’inventaire des salles' });
  const csv = ['nom_salle;type_salle;capacite;campus', 'UIX06C-IMPORT-OK;Salle de cours;20;N', 'UIX06C-IMPORT-KO;Salle de cours;20;ZZ'].join('\n');
  await dialogue.locator('input[type="file"]').setInputFiles({ name: 'salles.csv', mimeType: 'text/csv', buffer: Buffer.from(csv) });
  const alerte = dialogue.getByRole('alert');
  await expect(alerte).toContainText('1 ligne à corriger');
  await expect(alerte).toContainText('Ligne 3 · UIX06C-IMPORT-KO');
  await expect(alerte).toContainText('campus « ZZ » inconnu');
  await dialogue.getByRole('button', { name: 'Fermer', exact: true }).click();
  // Tout ou rien : la ligne valide n'a pas été enregistrée non plus
  await page.getByRole('searchbox', { name: 'Rechercher une salle' }).fill('UIX06C-IMPORT');
  await expect(page.getByText('Aucun résultat', { exact: true })).toBeVisible();
});

test('Salles : réessayer réaffiche les salles réellement reçues', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  const route = '**/api/salles?*';
  await page.route(route, (panne) => panne.abort());
  await page.goto('/gestion/salles');
  const reprendre = page.getByRole('button', { name: 'Réessayer', exact: true });
  await expect(reprendre).toBeVisible();
  await page.unroute(route);
  const relecture = page.waitForResponse((r) => new URL(r.url()).pathname === '/api/salles' && r.ok());
  await reprendre.click();
  const { data } = await (await relecture).json();
  expect(data.length).toBeGreaterThan(0);
  await expect(page.getByRole('cell', { name: data[0].nom_salle, exact: true }).first()).toBeVisible();
});

test('Salles : créer, refuser une capacité d’examen trop haute, modifier puis supprimer', async ({ page }) => {
  await ouvrirSalles(page);
  const nom = 'UIX06C-SALLE-' + Date.now();
  await page.getByRole('button', { name: 'Ajouter une salle', exact: true }).click();
  const dialogue = page.getByRole('dialog');
  await dialogue.getByRole('textbox', { name: 'Nom de la salle' }).fill(nom);
  await dialogue.getByRole('combobox', { name: 'Type de salle' }).click();
  await page.getByRole('option', { name: 'Salle TD', exact: true }).click();
  await dialogue.getByRole('spinbutton', { name: 'Capacité' }).fill('20');
  await dialogue.getByRole('spinbutton', { name: 'Places en examen' }).fill('25');
  await dialogue.getByRole('button', { name: 'Enregistrer', exact: true }).click();
  await expect(dialogue.getByText('Ne peut pas dépasser la capacité')).toBeVisible();
  await dialogue.getByRole('spinbutton', { name: 'Places en examen' }).fill('10');
  await dialogue.getByRole('button', { name: 'Enregistrer', exact: true }).click();
  await expect(dialogue).toBeHidden();
  await page.getByRole('searchbox', { name: 'Rechercher une salle' }).fill(nom);
  await expect(page.getByRole('cell', { name: nom, exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Modifier ' + nom }).click();
  await dialogue.getByRole('spinbutton', { name: 'Capacité' }).fill('22');
  await dialogue.getByRole('button', { name: 'Enregistrer', exact: true }).click();
  await expect(dialogue).toBeHidden();
  await expect(page.getByRole('cell', { name: '22', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Supprimer ' + nom }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Supprimer', exact: true }).click();
  await expect(page.getByText('Aucun résultat', { exact: true })).toBeVisible();
});

for (const role of ['enseignant', 'etudiant']) {
  test('Salles : ' + role + ' est renvoyé vers son accueil', async ({ page }) => {
    const { enseignante, etudiants, motDePasse } = lireDonnees();
    const compte = role === 'enseignant' ? enseignante : etudiants[0];
    await seConnecter(page, { email: compte.email, motDePasse, role });
    await page.goto('/gestion/salles');
    await expect(page).toHaveURL(new RegExp('/dashboard/' + role + '(?:/|$)'));
  });
}
