/**
 * Configuration de l'école (ADM-02b) : menu et ancienne adresse, refus sous le champ, aperçu, appliquer,
 * historique et annulation, date d'effet à venir, deux personnes en même temps (409), brouillon abandonné,
 * anglais sur téléphone, accessibilité. La base est partagée avec les parcours qui suivent (génération,
 * examens) : chaque test rend les réglages tels qu'il les a trouvés (afterEach).
 */
const { test, expect } = require('@playwright/test');
const { lireDonnees, seConnecter, enTeteCsrf } = require('./outils.cjs');

test.describe.configure({ timeout: 90_000 });

const TRAJET = { id: 'LOG.TRAJET.CAMPUS_DEFAUT', nom: 'Trajet entre campus par défaut' };
const GROUPE = { id: 'HOR.REGLE.MAX_H_JOUR_GROUPE', nom: 'Heures par jour · groupe' };
const SURVEILLANTS = { id: 'EXA.EPREUVE.SURVEILLANTS_PAR_SALLE', nom: 'Surveillants par salle d’examen' };

async function verifierAccessibilite(page, selecteur = 'main') {
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const violations = await page.evaluate(async (selecteur) => {
    const { violations } = await window.axe.run(selecteur, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
    return violations.map(({ id, nodes }) => ({ id, cibles: nodes.map(({ target }) => target) }));
  }, selecteur);
  expect(violations, 'Violations WCAG A/AA dans ' + selecteur).toEqual([]);
}

const lireReglages = async (page) => (await page.request.get('/api/moteur/reglages')).json();
const valeurDe = (reglages, id) => reglages.reglages.find((r) => r.id === id).valeur;
const lendemain = (jour) => new Date(Date.parse(`${jour}T00:00:00Z`) + 86_400_000).toISOString().slice(0, 10);

// Réglages lus à l'ouverture, pour la remise en état
let depart = null;

const seConnecterAdmin = async (page) => {
  const { admin, motDePasse } = lireDonnees();
  await seConnecter(page, { email: admin.email, motDePasse, role: 'admin' });
  depart = await lireReglages(page);
};

const ouvrir = async (page, chemin = '/gestion/configuration') => {
  await seConnecterAdmin(page);
  await page.goto(chemin);
  await expect(page.getByRole('textbox', { name: /Trajet entre campus par défaut|Default travel time between campuses/ })).toBeVisible();
};

/** Abandonne les brouillons, annule les versions à venir, puis remet les cinq réglages du départ en une version du jour. */
const remettre = async (page) => {
  const enTetes = await enTeteCsrf(page);
  const { aujourdhui } = await lireReglages(page);
  const versions = await (await page.request.get('/api/moteur/versions')).json();
  for (const v of versions.filter((x) => x.id_version > depart.version_courante)) {
    if (v.statut === 'brouillon') await page.request.post(`/api/moteur/versions/${v.id_version}/abandonner`, { headers: enTetes });
    else if (v.statut === 'appliquee' && v.date_effet > aujourdhui && !v.annulee_par && !v.annule_version) await page.request.post(`/api/moteur/versions/${v.id_version}/annuler`, { headers: enTetes });
  }
  const actuels = await lireReglages(page);
  const lignes = depart.reglages
    .filter((r0) => {
      const r = actuels.reglages.find((x) => x.id === r0.id);
      return r.valeur !== r0.valeur || r.origine !== r0.origine;
    })
    .map((r0) => (r0.origine === 'etablissement' ? { cle: r0.id, valeur: r0.valeur } : { cle: r0.id, retiree: true }));
  if (lignes.length) {
    const reponse = await page.request.post('/api/moteur/versions', { headers: enTetes, data: { libelle: 'Remise en état des parcours', lignes, appliquer: true, base: actuels.version_courante } });
    expect(reponse.ok(), `remise en état : ${await reponse.text()}`).toBeTruthy();
  }
  // Les parcours suivants retrouvent les réglages du départ, à leur source près
  const remis = await lireReglages(page);
  expect(remis.reglages.map(({ id, valeur, origine }) => ({ id, valeur, origine }))).toEqual(depart.reglages.map(({ id, valeur, origine }) => ({ id, valeur, origine })));
};

test.beforeEach(() => {
  depart = null;
});

test.afterEach(async ({ page }) => {
  if (depart) await remettre(page);
});

test('menu « Configuration », ancienne adresse, cinq réglages, accessibilité', async ({ page }) => {
  await seConnecterAdmin(page);
  // Trois clics au plus jusqu'à un réglage (EP-2) : l'application « Établissement », l'entrée « Configuration » du menu, le champ
  await page.goto('/applications');
  await page.getByRole('navigation', { name: 'Applications disponibles' }).getByRole('link', { name: 'Établissement', exact: true }).click();
  await page.getByRole('navigation', { name: 'Menu', exact: true }).getByText('Configuration', { exact: true }).click();
  await expect(page).toHaveURL(/\/gestion\/configuration$/);
  await expect(page.getByRole('tab', { name: 'Réglages' })).toHaveAttribute('aria-selected', 'true');
  for (const nom of [GROUPE.nom, 'Heures par jour · enseignant', TRAJET.nom, 'Places utilisables en examen', SURVEILLANTS.nom]) {
    await expect(page.getByRole('textbox', { name: nom, exact: true })).toBeVisible();
  }
  // « Durée d'une séance par défaut » n'est lue par aucun code (E-3) : elle n'est pas montrée
  await expect(page.getByText('Durée d’une séance', { exact: false })).toHaveCount(0);
  await verifierAccessibilite(page);
  await page.goto('/gestion/parametres-planning');
  await expect(page).toHaveURL(/\/gestion\/configuration$/);
});

test('une valeur hors bornes : refus sous le champ, puis par le serveur à l’aperçu', async ({ page }) => {
  await ouvrir(page);
  const champ = page.getByRole('textbox', { name: GROUPE.nom, exact: true });
  const avant = await champ.inputValue();
  await champ.fill('13');
  await expect(page.getByText('Choisissez une valeur entre 1 h et 12 h.')).toBeVisible();
  await expect(page.getByText('1 changement', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Voir l’aperçu' }).click();
  const fenetre = page.getByRole('dialog', { name: 'Aperçu des changements' });
  await expect(fenetre.getByText('Ces changements sont refusés : corrigez-les avant d’appliquer.')).toBeVisible();
  await expect(fenetre.getByText('Choisissez une valeur entre 1 h et 12 h.')).toBeVisible();
  await expect(fenetre.getByRole('button', { name: 'Appliquer' })).toBeDisabled();
  await fenetre.getByRole('button', { name: 'Retour au brouillon' }).click();
  await page.getByRole('button', { name: 'Tout effacer' }).click();
  await expect(champ).toHaveValue(avant);
  await expect(page.getByText('1 changement', { exact: true })).toHaveCount(0);
});

test('appliquer, lire l’historique, puis annuler la version', async ({ page }) => {
  await ouvrir(page);
  const v0 = valeurDe(depart, TRAJET.id);
  const v1 = v0 === 30 ? 35 : 30;
  // Libellé unique : la base garde l'historique des passages précédents (relance de la CI)
  const libelle = `Essai du trajet ${Date.now()}`;
  const champ = page.getByRole('textbox', { name: TRAJET.nom, exact: true });
  await champ.fill(String(v1));
  await page.getByRole('button', { name: 'Voir l’aperçu' }).click();
  const fenetre = page.getByRole('dialog', { name: 'Aperçu des changements' });
  await expect(fenetre.getByText(`Avant : ${v0} min → Après : ${v1} min`)).toBeVisible();
  await expect(fenetre.getByText('S’applique tout de suite aux séances placées à la main, et à la prochaine génération.')).toBeVisible();
  await fenetre.getByRole('textbox', { name: 'Libellé (facultatif)' }).fill(libelle);
  await fenetre.getByRole('button', { name: 'Appliquer' }).click();
  await expect(page.getByText('Réglages appliqués.')).toBeVisible();
  await expect(fenetre).toBeHidden();
  await expect(champ).toHaveValue(String(v1));
  await expect(page.getByText('Réglé par l’école')).toBeVisible();

  await page.getByRole('tab', { name: 'Historique' }).click();
  await expect(page).toHaveURL(/onglet=historique/);
  const ligne = page.getByRole('listitem').filter({ hasText: libelle });
  await expect(ligne).toContainText('Appliquée');
  await expect(ligne).toContainText('1 réglage');
  const [, id] = /Version (\d+) ·/.exec(await ligne.textContent());
  await ligne.getByRole('button', { name: 'Voir le détail' }).click();
  await expect(ligne.getByText(`${TRAJET.nom} : ${v1} min`)).toBeVisible();
  await ligne.getByRole('button', { name: 'Annuler cette version' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Annuler la version' }).click();
  // Une fenêtre ouverte masque le reste de la page aux rôles : attendre qu'elle se ferme
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByText(`Version ${id} annulée.`)).toBeVisible();
  await expect(ligne).toContainText(/Annulée par la version \d+/);
  await expect(page.getByRole('listitem').filter({ hasText: `Annulation de la version ${id}` })).toContainText('Appliquée');
  await page.getByRole('tab', { name: 'Réglages' }).click();
  await expect(champ).toHaveValue(String(v0));
});

test('date d’effet à venir : la version est prévue, puis annulée avant sa date', async ({ page }) => {
  await ouvrir(page);
  const v0 = valeurDe(depart, SURVEILLANTS.id);
  const libelle = `Essai prévu ${Date.now()}`;
  await page.getByRole('textbox', { name: SURVEILLANTS.nom, exact: true }).fill(String(v0 === 2 ? 3 : 2));
  await page.getByRole('button', { name: 'Voir l’aperçu' }).click();
  const fenetre = page.getByRole('dialog', { name: 'Aperçu des changements' });
  await fenetre.getByLabel('À partir du').fill(lendemain(depart.aujourdhui));
  await expect(fenetre.getByText(/^À partir du .+\. S’applique tout de suite\.$/)).toBeVisible();
  await fenetre.getByRole('textbox', { name: 'Libellé (facultatif)' }).fill(libelle);
  await fenetre.getByRole('button', { name: 'Appliquer' }).click();
  await expect(page.getByText(/Réglages prévus pour le /)).toBeVisible();
  // Aujourd'hui, rien ne change
  await expect(page.getByRole('textbox', { name: SURVEILLANTS.nom, exact: true })).toHaveValue(String(v0));
  await page.getByRole('tab', { name: 'Historique' }).click();
  const ligne = page.getByRole('listitem').filter({ hasText: libelle });
  await expect(ligne).toContainText('Prévue le');
  const [, id] = /Version (\d+) ·/.exec(await ligne.textContent());
  await ligne.getByRole('button', { name: 'Annuler cette version' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Annuler la version' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(ligne).toContainText(/Annulée par la version \d+/);
  // Son inverse prend effet à la même date : elle est prévue, elle aussi
  await expect(page.getByRole('listitem').filter({ hasText: `Annulation de la version ${id}` })).toContainText('Prévue le');
});

test('deux personnes en même temps : 409, « Recharger » garde le brouillon, puis l’application passe', async ({ page }) => {
  await ouvrir(page);
  const v0 = valeurDe(depart, TRAJET.id);
  const mienne = v0 === 30 ? 35 : 30;
  const autre = [40, 45].find((x) => x !== v0);
  await page.getByRole('textbox', { name: TRAJET.nom, exact: true }).fill(String(mienne));
  await page.getByRole('button', { name: 'Voir l’aperçu' }).click();
  const fenetre = page.getByRole('dialog', { name: 'Aperçu des changements' });
  await expect(fenetre.getByRole('button', { name: 'Appliquer' })).toBeEnabled();
  // Une autre personne applique le même réglage pendant que l'aperçu est ouvert
  const reponse = await page.request.post('/api/moteur/versions', {
    headers: await enTeteCsrf(page),
    data: { lignes: [{ cle: TRAJET.id, valeur: autre }], appliquer: true, base: depart.version_courante },
  });
  expect(reponse.ok(), await reponse.text()).toBeTruthy();
  await fenetre.getByRole('button', { name: 'Appliquer' }).click();
  await expect(fenetre.getByText('Les réglages ont changé depuis votre ouverture.')).toBeVisible();
  await expect(fenetre.getByText(/La version \d+ a changé ce réglage depuis votre ouverture\./)).toBeVisible();
  await expect(fenetre.getByRole('button', { name: 'Appliquer' })).toBeDisabled();
  await fenetre.getByRole('button', { name: 'Recharger' }).click();
  await expect(fenetre.getByText('Les réglages ont changé depuis votre ouverture.')).toHaveCount(0);
  await expect(fenetre.getByText(`Avant : ${autre} min → Après : ${mienne} min`)).toBeVisible();
  await fenetre.getByRole('button', { name: 'Appliquer' }).click();
  await expect(page.getByText('Réglages appliqués.')).toBeVisible();
  await expect(page.getByRole('textbox', { name: TRAJET.nom, exact: true })).toHaveValue(String(mienne));
});

test('un brouillon créé par l’API s’abandonne depuis l’historique', async ({ page }) => {
  await seConnecterAdmin(page);
  const v0 = valeurDe(depart, SURVEILLANTS.id);
  const reponse = await page.request.post('/api/moteur/versions', { headers: await enTeteCsrf(page), data: { lignes: [{ cle: SURVEILLANTS.id, valeur: v0 === 2 ? 3 : 2 }] } });
  expect(reponse.ok(), await reponse.text()).toBeTruthy();
  const { id_version: id } = await reponse.json();
  await page.goto('/gestion/configuration?onglet=historique');
  const ligne = page.getByRole('listitem').filter({ hasText: `Version ${id} ·` });
  await expect(ligne).toContainText('Brouillon');
  await ligne.getByRole('button', { name: 'Abandonner ce brouillon' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Abandonner', exact: true }).click();
  await expect(page.getByText(`Brouillon ${id} abandonné.`)).toBeVisible();
  await expect(ligne).toContainText('Abandonnée');
});

test('en anglais, à 390 px, thème sombre : textes, aperçu, accessibilité, sans défilement horizontal', async ({ page }) => {
  await seConnecterAdmin(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => (localStorage.setItem('hp.lang', 'en'), localStorage.setItem('themeMode', 'dark')));
  await page.goto('/gestion/configuration');
  await expect(page.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-selected', 'true');
  const champ = page.getByRole('textbox', { name: 'Default travel time between campuses', exact: true });
  await expect(champ).toBeVisible();
  await verifierAccessibilite(page);
  const v0 = valeurDe(depart, TRAJET.id);
  await champ.fill(String(v0 === 30 ? 35 : 30));
  await expect(page.getByText('1 change', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Preview' }).click();
  const fenetre = page.getByRole('dialog', { name: 'Preview of changes' });
  await expect(fenetre.getByText('Applies at once to sessions placed by hand, and at the next generation.')).toBeVisible();
  await verifierAccessibilite(page, '[role="dialog"]');
  await fenetre.getByRole('button', { name: 'Back to the draft' }).click();
  await page.getByRole('button', { name: 'Clear all' }).click();
  await page.getByRole('tab', { name: 'History' }).click();
  await expect(page.getByRole('tab', { name: 'History' })).toHaveAttribute('aria-selected', 'true');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => (localStorage.setItem('hp.lang', 'fr'), localStorage.setItem('themeMode', 'light')));
});
