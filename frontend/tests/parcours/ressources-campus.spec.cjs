/** Campus (UIX-06c, lot 2) : affichage et accessibilité, fiche, temps de trajet, reprise réseau, accès réservé. */
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

const ouvrirCampus = async (page) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.goto('/gestion/campus');
  await expect(page.getByRole('status', { name: 'Chargement des données' })).toHaveCount(0);
};

for (const [largeur, langue, theme] of [
  [390, 'en', 'dark'],
  [1280, 'fr', 'light'],
]) {
  test(`Campus à ${largeur}px, ${langue}, ${theme}`, async ({ page }) => {
    const { admin, motDePasse } = lireDonnees();
    await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.evaluate(([l, th]) => (localStorage.setItem('hp.lang', l), localStorage.setItem('themeMode', th)), [langue, theme]);
    await page.goto('/gestion/campus');
    await expect(page.getByRole('status', { name: /Chargement des données|Loading data/ })).toHaveCount(0);
    if (largeur === 390) await expect(page.getByRole('heading', { name: 'Campus Nord', exact: true })).toBeVisible();
    else await expect(page.getByRole('cell', { name: 'Campus Nord', exact: true })).toBeVisible();
    // Les temps de trajet restent sous la liste, à toutes les largeurs
    await expect(page.getByRole('spinbutton', { name: 'Campus Nord ↔ Campus Sud' })).toBeVisible();
    await verifierAccessibilite(page);
    await page.getByRole('button', { name: langue === 'en' ? 'Add a campus' : 'Ajouter un campus', exact: true }).click();
    const dialogue = page.getByRole('dialog');
    await expect(dialogue.getByRole('textbox', { name: 'Code', exact: true })).toBeVisible();
    await expect(page.locator('.MuiDialog-container').filter({ has: dialogue })).toHaveCSS('opacity', '1');
    await verifierAccessibilite(page, '[role="dialog"]');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('Campus : créer, signaler l’adresse manquante, rendre inactif puis supprimer', async ({ page }) => {
  await ouvrirCampus(page);
  const nom = 'Campus UIX06C ' + Date.now();
  await page.getByRole('button', { name: 'Ajouter un campus', exact: true }).click();
  const dialogue = page.getByRole('dialog');
  await dialogue.getByRole('textbox', { name: 'Code', exact: true }).fill('u6c' + String(Date.now()).slice(-4));
  await dialogue.getByRole('textbox', { name: 'Nom', exact: true }).fill(nom);
  await dialogue.getByRole('button', { name: 'Enregistrer', exact: true }).click();
  await expect(dialogue).toBeHidden();
  // Les paires de trajet du nouveau campus portent aussi son nom : on vise la ligne de la liste
  const ligne = page.getByRole('row').filter({ has: page.getByRole('cell', { name: nom, exact: true }) });
  await expect(ligne).toContainText('Adresse à compléter');
  await expect(ligne).toContainText('Actif');

  await page.getByRole('button', { name: 'Modifier ' + nom }).click();
  await dialogue.getByRole('switch', { name: 'Actif' }).uncheck();
  await dialogue.getByRole('button', { name: 'Enregistrer', exact: true }).click();
  await expect(dialogue).toBeHidden();
  await expect(ligne).toContainText('Inactif');

  await page.getByRole('button', { name: 'Supprimer ' + nom }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Supprimer', exact: true }).click();
  await expect(page.getByText('Campus supprimé')).toBeVisible();
  await expect(ligne).toHaveCount(0);
});

test('Campus : une durée hors limites est refusée, la durée en vigueur s’enregistre', async ({ page }) => {
  await ouvrirCampus(page);
  // La durée déjà en vigueur entre N et S : l'enregistrer ne change rien pour les générations qui suivent
  const { defaut_minutes: defaut, trajets } = await (await page.request.get('/api/campus/trajets')).json();
  const paireNS = trajets.find((tr) => [tr.campus_a?.code, tr.campus_b?.code].sort().join('-') === 'N-S');
  const enVigueur = String(paireNS ? paireNS.minutes : defaut);
  const champ = page.getByRole('spinbutton', { name: 'Campus Nord ↔ Campus Sud' });
  const ligne = page.getByRole('row').filter({ has: champ });
  await champ.fill('300');
  await ligne.getByRole('button', { name: 'Enregistrer' }).click();
  await expect(page.getByText('Durée : un nombre entier de minutes entre 0 et 240')).toBeVisible();
  await champ.fill(enVigueur);
  await ligne.getByRole('button', { name: 'Enregistrer' }).click();
  await expect(page.getByText('Temps de trajet enregistré')).toBeVisible();
  await expect(ligne).toContainText('Renseigné');
});

test('Campus : réessayer réaffiche les campus réellement reçus', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  const route = '**/api/campus';
  await page.route(route, (panne) => panne.abort());
  await page.goto('/gestion/campus');
  const reprendre = page.getByRole('button', { name: 'Réessayer', exact: true });
  await expect(reprendre).toBeVisible();
  // Pendant l'échec, aucune saisie de trajet n'est proposée
  await expect(page.getByText('Temps de trajet entre campus')).toHaveCount(0);
  await page.unroute(route);
  const relecture = page.waitForResponse((r) => new URL(r.url()).pathname === '/api/campus' && r.ok());
  await reprendre.click();
  const campus = await (await relecture).json();
  expect(campus.length).toBeGreaterThan(0);
  await expect(page.getByRole('cell', { name: campus[0].nom, exact: true })).toBeVisible();
});

for (const role of ['enseignant', 'etudiant']) {
  test('Campus : ' + role + ' est renvoyé vers son accueil', async ({ page }) => {
    const { enseignante, etudiants, motDePasse } = lireDonnees();
    const compte = role === 'enseignant' ? enseignante : etudiants[0];
    await seConnecter(page, { email: compte.email, motDePasse, role });
    await page.goto('/gestion/campus');
    await expect(page).toHaveURL(new RegExp('/dashboard/' + role + '(?:/|$)'));
  });
}
