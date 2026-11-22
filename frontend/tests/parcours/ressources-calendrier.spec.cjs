/**
 * Calendrier (UIX-06c, lot 4) : accessibilité à 390 et 1280 px, « Confirmer » toujours atteignable au téléphone,
 * échec distingué de l'absence avec « Réessayer », année d'essai avec son semestre (refus expliqué, ajout, suppression),
 * filtre sans résultat distingué d'une année sans événement, accès réservé. Les fériés et le décalage restent à calendrier.spec.
 */
const { test, expect } = require('@playwright/test');
const { lireDonnees, seConnecter } = require('./outils.cjs');

// Connexion, compilation à froid par Vite puis plusieurs allers-retours : 30 s ne suffisent pas toujours
test.describe.configure({ timeout: 60_000 });

const ESTIMEE = 'Fête estimée (essai)';

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

/** Ajoute aux événements reçus une date estimée, à confirmer, sans rien écrire dans la base. */
async function ajouterDateEstimee(page) {
  await page.route('**/api/evenements?*', async (route) => {
    const reponse = await route.fetch();
    const debut = new URL(route.request().url()).searchParams.get('date_from');
    const recus = await reponse.json();
    const estimee = {
      id_evenement: 990001,
      titre: ESTIMEE,
      description: null,
      date_debut: debut,
      date_fin: debut,
      type_evenement: 'ferie',
      bloque_affectations: true,
      portee: 'etablissement',
      id_cible: null,
      niveau: null,
      heure_debut: null,
      heure_fin: null,
      date_confirmee: false,
    };
    await route.fulfill({ response: reponse, json: [...recus, estimee] });
  });
}

const attendreChargement = (page) => expect(page.getByRole('status', { name: /Chargement des données|Loading data/ })).toHaveCount(0);

for (const [largeur, langue, theme] of [
  [390, 'en', 'dark'],
  [1280, 'fr', 'light'],
]) {
  test(`Calendrier à ${largeur}px, ${langue}, ${theme}`, async ({ page }) => {
    const { admin, motDePasse } = lireDonnees();
    await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.evaluate(([l, th]) => (localStorage.setItem('hp.lang', l), localStorage.setItem('themeMode', th)), [langue, theme]);
    await ajouterDateEstimee(page);
    await page.goto('/gestion/calendrier');
    await attendreChargement(page);
    const en = langue === 'en';
    await expect(page.getByRole('combobox', { name: en ? 'Academic year' : 'Année universitaire' })).toBeVisible();
    await expect(page.getByRole('heading', { name: en ? 'Semesters' : 'Semestres', exact: true })).toBeVisible();
    await verifierAccessibilite(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

    // Téléphone : une fiche par événement, « Confirmer » dans ses actions visibles ; ordinateur : dans sa ligne
    const porteur =
      largeur === 390
        ? page.getByRole('listitem').filter({ has: page.getByRole('heading', { name: ESTIMEE }) })
        : page.getByRole('row', { name: new RegExp(ESTIMEE.replace(/[()]/g, '\\$&')) });
    const confirmer = porteur.getByRole('button', { name: en ? 'Confirm' : 'Confirmer', exact: true });
    await confirmer.scrollIntoViewIfNeeded();
    await expect(confirmer).toBeInViewport({ ratio: 1 });
    await confirmer.click();
    const dialogue = page.getByRole('dialog');
    await expect(page.locator('.MuiDialog-container').filter({ has: dialogue })).toHaveCSS('opacity', '1');
    await expect(dialogue.getByLabel(en ? 'Start' : 'Début')).toBeInViewport();
    await expect(dialogue.getByRole('button', { name: en ? 'Confirm' : 'Confirmer', exact: true })).toBeInViewport({ ratio: 1 });
    await verifierAccessibilite(page, '[role="dialog"]');
    await dialogue.getByRole('button', { name: en ? 'Cancel' : 'Annuler', exact: true }).click();
    await expect(dialogue).toBeHidden();

    await page.getByRole('button', { name: en ? 'Add an event' : 'Ajouter un événement', exact: true }).click();
    await expect(page.locator('.MuiDialog-container').filter({ has: page.getByRole('dialog') })).toHaveCSS('opacity', '1');
    await verifierAccessibilite(page, '[role="dialog"]');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('Calendrier : un échec de chargement propose « Réessayer », et non « Aucune année »', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  const route = '**/api/calendrier/annees';
  await page.route(route, (panne) => panne.abort());
  await page.goto('/gestion/calendrier');
  const reprendre = page.getByRole('button', { name: 'Réessayer', exact: true });
  await expect(reprendre).toBeVisible();
  await expect(page.getByText('Aucune année universitaire')).toHaveCount(0);
  await page.unroute(route);
  await reprendre.click();
  await expect(page.getByRole('combobox', { name: 'Année universitaire' })).toBeVisible();
});

test('Calendrier : année d’essai, semestre refusé hors de l’année puis ajouté, filtre sans résultat, suppression', async ({ page }) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  await page.goto('/gestion/calendrier');
  await attendreChargement(page);

  await page.getByRole('button', { name: 'Nouvelle année', exact: true }).click();
  const annee = page.getByRole('dialog', { name: 'Nouvelle année' });
  await annee.getByRole('textbox', { name: 'Libellé' }).fill('2030-2031');
  await annee.getByLabel('Début').fill('2030-09-01');
  await annee.getByLabel('Fin').fill('2031-07-15');
  await annee.getByRole('button', { name: 'Enregistrer', exact: true }).click();
  await expect(page.getByText('Année universitaire enregistrée')).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Année universitaire' })).toHaveText('2030-2031');
  // Une année neuve : ni semestre ni événement, chacun dit quoi faire
  await expect(page.getByText('Aucun semestre pour cette année.')).toBeVisible();
  await expect(page.getByText('Aucun événement sur cette année.')).toBeVisible();

  // Le serveur refuse un semestre hors de l'année et l'explique
  await page.getByRole('button', { name: 'Ajouter un semestre', exact: true }).click();
  const semestre = page.getByRole('dialog', { name: 'Ajouter un semestre' });
  await semestre.getByLabel('Début').fill('2030-08-01');
  await semestre.getByLabel('Fin').fill('2031-01-20');
  await semestre.getByRole('button', { name: 'Enregistrer', exact: true }).click();
  await expect(page.getByText(/Le semestre doit être compris dans l'année 2030-2031/)).toBeVisible();
  await semestre.getByLabel('Début').fill('2030-09-15');
  await semestre.getByRole('button', { name: 'Enregistrer', exact: true }).click();
  await expect(page.getByText('Semestre enregistré')).toBeVisible();
  await expect(page.getByRole('row', { name: /S1/ })).toContainText('16');

  // Aucune date à confirmer : le filtre dit « Aucun résultat », pas « Aucun événement »
  await page.getByRole('button', { name: 'Ajouter un événement', exact: true }).click();
  const evenement = page.getByRole('dialog', { name: 'Ajouter un événement' });
  await evenement.getByRole('textbox', { name: 'Intitulé' }).fill('Journée d’essai');
  await evenement.getByRole('button', { name: 'Enregistrer', exact: true }).click();
  await expect(page.getByRole('row', { name: /Journée d’essai/ })).toBeVisible();
  await page.getByRole('switch', { name: 'À confirmer seulement' }).check();
  await expect(page.getByText('Aucun résultat', { exact: true })).toBeVisible();
  await page.getByRole('switch', { name: 'À confirmer seulement' }).uncheck();
  await page.getByRole('button', { name: 'Supprimer Journée d’essai', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Supprimer', exact: true }).click();
  await expect(page.getByText('Aucun événement sur cette année.')).toBeVisible();

  await page.getByRole('button', { name: 'Supprimer 2030-2031', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('L’année 2030-2031 et ses semestres seront supprimés');
  await page.getByRole('dialog').getByRole('button', { name: 'Supprimer', exact: true }).click();
  await expect(page.getByText('Supprimé', { exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Année universitaire' }).click();
  await expect(page.getByRole('option', { name: '2030-2031' })).toHaveCount(0);
});

for (const role of ['enseignant', 'etudiant']) {
  test('Calendrier : ' + role + ' est renvoyé vers son accueil', async ({ page }) => {
    const { enseignante, etudiants, motDePasse } = lireDonnees();
    const compte = role === 'enseignant' ? enseignante : etudiants[0];
    await seConnecter(page, { email: compte.email, motDePasse, role });
    await page.goto('/gestion/calendrier');
    await expect(page).toHaveURL(new RegExp('/dashboard/' + role + '(?:/|$)'));
  });
}
