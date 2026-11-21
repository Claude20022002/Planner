const { test, expect } = require('@playwright/test');
let JEUX, evaluerSimulation, solutionReference;
test.beforeAll(async () => {
    ({ JEUX } = await import('../../../shared/jeux/catalogue.js'));
    ({ evaluerSimulation } = await import('../../../shared/simulations/moteur.js'));
    // Même registre de réponses de référence que le serveur : le test ne réécrit pas les solutions.
    ({ solutionReference } = await import('../../../backend/services/jeux/solutionsReference.js'));
});

/** État par défi d'un serveur simulé : échecs, solution consultée, réussite et points gagnés. */
function defiState(etats, id) {
    if (!etats.has(id)) etats.set(id, { id, echecs: 0, solution_vue: false, sans_points: false, reussi: false, avec_solution: false, points: 0 });
    return etats.get(id);
}

const totalPoints = (etats) => [...etats.values()].reduce((somme, e) => somme + e.points, 0);

/** Mocks transport/persistence only. These tests do not claim real API authentication coverage. */
async function preparer(page, { langue = 'en', refuse = false, modules = [], suivi = null } = {}) {
    await page.addInitScript((lng) => localStorage.setItem('hp.lang', lng), langue);
    const etats = new Map(); const erreurs = []; const options = { echec: false };
    page.on('pageerror', (e) => erreurs.push(e.message));
    await page.route('**/api/**', async (route) => {
        const path = new URL(route.request().url()).pathname.slice(4);
        const json = (body, status = 200) => route.fulfill({ status, json: body });
        if (path === '/auth/me') return json({ user: { id_user: 5, role: 'enseignant', prenom: 'Test', nom: 'Teacher' } });
        if (path === '/auth/csrf-token') return json({ csrfToken: 'ui-test' });
        if (path === '/jeux/historique') return json({ data: [] });
        if (path === '/jeux') return json({ profil: {}, modules, jeux: JEUX.map((j) => ({ ...j, progression: { total: j.defis.length, reussis: 0, points: 0 } })) });
        const suiviRoute = path.match(/^\/jeux\/[^/]+\/modules\/[^/]+\/suivi$/);
        if (suiviRoute) return json(suivi ?? { module: null, etudiants: [] });
        const progression = path.match(/^\/jeux\/([^/]+)\/progression$/);
        if (progression) {
            const defis = [...etats.values()].filter((e) => e.reussi).map((e) => ({ id: e.id, avec_solution: e.avec_solution }));
            const detail = [...etats.values()].map(({ id, echecs, solution_vue, sans_points }) => ({ id, echecs, solution_vue, sans_points }));
            return json({ defis, points: totalPoints(etats), etats: detail }, refuse ? 403 : 200);
        }
        const solution = path.match(/^\/jeux\/([^/]+)\/defis\/([^/]+)\/solution$/);
        if (solution) {
            const jeu = JEUX.find((j) => j.code === solution[1]); const defi = jeu?.defis.find((d) => d.id === solution[2]);
            if (!jeu || !defi) return json({ message: 'unknown' }, 404);
            const etat = defiState(etats, defi.id);
            if (!etat.reussi) etat.sans_points = true;
            etat.solution_vue = true;
            return json({ reponse: solutionReference(jeu, defi), echecs: etat.echecs, solution_vue: true, sans_points: etat.sans_points });
        }
        const essai = path.match(/^\/jeux\/([^/]+)\/defis\/([^/]+)\/essais$/);
        if (essai) {
            if (options.echec) return route.abort();
            const jeu = JEUX.find((j) => j.code === essai[1]); const defi = jeu?.defis.find((d) => d.id === essai[2]);
            if (!jeu || !defi) return json({ message: 'unknown' }, 404);
            const etat = defiState(etats, defi.id);
            const r = evaluerSimulation(jeu, defi, route.request().postDataJSON().reponse);
            if (!r) return json({ message: 'invalid' }, 400);
            if (!r.ok) {
                etat.echecs += 1;
                return json({ ...r, enregistre: false, echecs: etat.echecs, solution_vue: etat.solution_vue, sans_points: etat.sans_points, progression: { points: totalPoints(etats) } });
            }
            const cree = !etat.reussi;
            etat.reussi = true;
            etat.avec_solution = etat.solution_vue;
            if (cree) etat.points = etat.solution_vue ? 0 : defi.xp;
            return json({ ...r, enregistre: true, cree, points: etat.points, avec_solution: etat.avec_solution, echecs: etat.echecs,
                solution_vue: etat.solution_vue, sans_points: etat.sans_points, progression: { points: totalPoints(etats) } });
        }
        return json({ data: [], notifications: [], count: 0 });
    });
    return { erreurs, options };
}

for (const [code, reponses] of [
    ['robot-route', ['EEESSS', 'SSSSEEEE', 'SSSSEEENNNEESSSS']],
    ['threshold-lab', ['50', '45', '35']],
    ['stock-pilot', [['0', '5', '3'], ['5', '4', '0'], ['6', '3', '0']]],
    ['tri-cyber', [['1', '4', '2', '3'], ['3', '2', '1', '4'], ['2', '4', '1', '3']]],
    ['quete-sql', [['2', '3', '1', '4'], ['4', '1', '3', '2'], ['4', '1', '2', '3']]],
    ['topo-reseau', [['0', '0', '1', '2'], ['0', '0', '1', '2'], ['2', '1', '0', '1']]],
    ['cpu-process', [['1', '0', '2', '3'], ['2', '1', '3', '0'], ['2', '1', '3', '0']]],
    ['sprint-agile', [['1', '1', '1', '0', '0'], ['1', '1', '1', '0', '0'], ['1', '1', '1', '0', '0']]],
    ['budget-erp', [['2', '2', '2', '2'], ['3', '3', '3', '3'], ['4', '4', '4', '4']]],
    ['big-o-lab', [['1', '2', '3', '5'], ['2', '4', '3', '5'], ['6', '5', '1', '2']]],
]) {
    const etiquettes = {
        'stock-pilot': (i) => `Day ${i + 1} order`,
        'tri-cyber': (i) => `Incident ${i + 1}`,
        'quete-sql': (i) => `Fragment ${i + 1}`,
        'topo-reseau': (i) => ['Poste Admin', 'Serveur Web', 'Switch Core', 'AP WiFi'][i],
        'cpu-process': (i) => `Slot ${i + 1}`,
        'sprint-agile': (i) => `Item ${i + 1}`,
        'budget-erp': (i) => `Line ${i + 1}`,
        'big-o-lab': (i) => `Snippet ${i + 1}`,
    };
    const etiquette = etiquettes[code];
    test(`${code}: all levels, feedback, replay, keyboard input, and responsive layout`, async ({ page }, info) => {
        const { erreurs } = await preparer(page);
        await page.goto(`/jeux/${code}`);
        for (const [i, reponse] of reponses.entries()) {
            if (code === 'robot-route') await page.getByLabel('Movement program', { exact: true }).fill(reponse);
            else if (code === 'threshold-lab') await page.getByLabel('Detection threshold').fill(reponse);
            else for (const [j, v] of reponse.entries()) await page.getByLabel(etiquette(j)).fill(v);
            await page.getByRole('button', { name: 'Show a hint' }).click();
            await page.getByRole('button', { name: 'Test my plan' }).focus();
            await page.keyboard.press('Enter');
            await expect(page.getByText('Objective reached.', { exact: true })).toBeVisible();
            await expect(page.getByText(`Mastery saved · ${100 + 50 * i} points.`)).toBeVisible();
            await page.getByRole('button', { name: 'Test my plan' }).click();
            await expect(page.getByText('Already completed: no additional points.')).toBeVisible();
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
            const contrastes = await page.locator('th[scope="col"]').evaluateAll((cells) => {
                const luminance = (rgb) => rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map((v) => v / 255)
                    .map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
                    .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
                return cells.map((cell) => {
                    const style = getComputedStyle(cell); const a = luminance(style.color); const b = luminance(style.backgroundColor);
                    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
                });
            });
            expect(contrastes.every((ratio) => ratio >= 4.5)).toBe(true);
            if (i === 0) await page.screenshot({ path: info.outputPath(`${code}.png`), fullPage: true });
            if (i < 2) await page.getByRole('button', { name: 'Next challenge' }).click();
        }
        await expect(page.getByText('3/3 challenges completed · 450 points')).toBeVisible();
        expect(erreurs).toEqual([]);
    });
}

test('catalog renders original attribution, new games, and the existing terminal route', async ({ page }) => {
    const { erreurs } = await preparer(page);
    await page.goto('/jeux');
    await expect(page.getByText('Robot Route', { exact: true })).toBeVisible();
    await expect(page.getByText('Threshold Lab', { exact: true })).toBeVisible();
    await expect(page.getByText('Stock Pilot', { exact: true })).toBeVisible();
    await expect(page.getByText('Cyber Triage', { exact: true })).toBeVisible();
    await expect(page.getByText('Perfect Query', { exact: true })).toBeVisible();
    await expect(page.getByText('Network Nodes', { exact: true })).toBeVisible();
    await expect(page.getByText('CPU Scheduler', { exact: true })).toBeVisible();
    await expect(page.getByText('Agile Sprint', { exact: true })).toBeVisible();
    await expect(page.getByText('ERP Budget', { exact: true })).toBeVisible();
    await expect(page.getByText('Big-O Lab', { exact: true })).toBeVisible();
    await expect(page.getByText(/Bruno Zapico/)).toBeVisible();
    // Métadonnées neutres : discipline et niveaux, jamais une URL d'école
    await expect(page.getByText(/Computer Science: Algorithms and Data Structures · Levels 1, 2, 3/).first()).toBeVisible();
    await page.goto('/jeux/terminal-linux');
    await expect(page.locator('input').last()).toBeVisible();
    expect(erreurs).toEqual([]);
});

test('failed attempt hides the takeaway and never reveals the expected answer', async ({ page }) => {
    const { erreurs } = await preparer(page);
    await page.goto('/jeux/big-o-lab');
    for (let i = 0; i < 4; i += 1) await page.getByLabel(`Snippet ${i + 1}`).fill('6');
    await page.getByRole('button', { name: 'Test my plan' }).click();
    await expect(page.getByText('Needs adjustment: inspect the result, then revise your plan.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Takeaway' })).toHaveCount(0);
    await expect(page.getByText('The number of elementary accesses sets the order of growth')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'View solution' })).toBeEnabled();
    await expect(page.getByText('After three unsuccessful attempts, you can view the solution.')).toHaveCount(0);
    expect(erreurs).toEqual([]);
});

test('three failures offer the solution; viewing it forfeits the points of that challenge', async ({ page }) => {
    const { erreurs } = await preparer(page);
    await page.goto('/jeux/robot-route');
    for (let i = 0; i < 3; i += 1) {
        await page.getByLabel('Movement program', { exact: true }).fill('N');
        await page.getByRole('button', { name: 'Test my plan' }).click();
        await expect(page.getByText('Needs adjustment: inspect the result, then revise your plan.')).toBeVisible();
    }
    await expect(page.getByText('After three unsuccessful attempts, you can view the solution.')).toBeVisible();
    await page.getByRole('button', { name: 'View solution' }).click();
    await expect(page.getByText('Reference solution')).toBeVisible();
    await expect(page.getByText('Solution viewed: this challenge no longer awards points.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'View solution' })).toBeDisabled();
    await page.getByLabel('Movement program', { exact: true }).fill('EEESSS');
    await page.getByRole('button', { name: 'Test my plan' }).click();
    await expect(page.getByText('Mastery saved · 0 points. · Completed with the solution')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Takeaway' })).toBeVisible();
    await expect(page.getByText('1/3 challenges completed · 0 points')).toBeVisible();
    expect(erreurs).toEqual([]);
});

test('viewing the solution after a first success preserves earned points', async ({ page }) => {
    const { erreurs } = await preparer(page);
    await page.goto('/jeux/robot-route');
    await page.getByLabel('Movement program', { exact: true }).fill('EEESSS');
    await page.getByRole('button', { name: 'Test my plan' }).click();
    await expect(page.getByText('Mastery saved · 100 points.')).toBeVisible();
    await page.getByRole('button', { name: 'View solution' }).click();
    await expect(page.getByText('Points from your first completion are preserved.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'View solution' })).toBeDisabled();
    await expect(page.getByText('1/3 challenges completed · 100 points')).toBeVisible();
    expect(erreurs).toEqual([]);
});

test('teacher tracking shows assisted challenges and their zero points', async ({ page }) => {
    const { erreurs } = await preparer(page, {
        modules: [{ id_cours: 7, code: 'M-01', nom: 'Algorithmique', jeux: ['big-o-lab'], details: [{ code: 'big-o-lab', but: 'entrainer' }] }],
        suivi: {
            module: { id_cours: 7, code: 'M-01', nom: 'Algorithmique' },
            etudiants: [{ id_user: 3, prenom: 'Ada', nom: 'Lovelace', reussis: 1, total: 3, points: 0, avec_solution: 1,
                defis: [{ id: 'complexite-01', titre: { fr: 'Motifs de base', en: 'Core patterns' }, avec_solution: true }] }],
        },
    });
    await page.goto('/jeux');
    await page.getByRole('button', { name: 'Progress' }).first().click();
    await expect(page.getByText('Progress · M-01 · Algorithmique')).toBeVisible();
    const dialogue = page.getByRole('dialog');
    await expect(dialogue.getByText('Ada Lovelace')).toBeVisible();
    await expect(dialogue.getByText('Completed with the solution: 1')).toBeVisible();
    await expect(dialogue.getByText('Completed with the solution · Core patterns')).toBeVisible();
    await expect(dialogue.getByRole('cell', { name: '1/3' })).toBeVisible();
    await expect(dialogue.getByRole('cell', { name: '0', exact: true })).toBeVisible();
    expect(erreurs).toEqual([]);
});

test('French solution panel and neutral curriculum text fit the viewport', async ({ page }) => {
    const { erreurs } = await preparer(page, { langue: 'fr' });
    await page.goto('/jeux/big-o-lab');
    await expect(page.getByText(/Informatique : Algorithmique et structures de données · Niveaux 1, 2, 3/)).toBeVisible();
    await page.getByRole('button', { name: 'Voir la solution' }).click();
    await expect(page.getByText('Solution de référence')).toBeVisible();
    await expect(page.getByText('Solution consultée : ce défi ne rapporte plus de points.')).toBeVisible();
    await expect(page.getByText(/O\(log n\)/).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(erreurs).toEqual([]);
});

test('French, validation, failed save, retry, and restart', async ({ page }) => {
    const { erreurs, options } = await preparer(page, { langue: 'fr' });
    await page.goto('/jeux/robot-route');
    await page.getByRole('button', { name: 'Tester mon plan' }).click();
    await expect(page.getByText(/Complétez les champs/)).toBeVisible();
    await page.getByLabel('Programme de déplacements', { exact: true }).fill('N');
    await page.getByRole('button', { name: 'Tester mon plan' }).click();
    await expect(page.getByText(/obstacle ou sortie de grille/)).toBeVisible();
    await page.getByLabel('Programme de déplacements', { exact: true }).fill('EEESSS');
    options.echec = true;
    await page.getByRole('button', { name: 'Tester mon plan' }).click();
    await expect(page.getByText(/Résultat local uniquement/)).toBeVisible();
    await expect(page.getByText('0/3 défis réussis · 0 points')).toBeVisible();
    options.echec = false;
    await page.getByRole('button', { name: 'Tester mon plan' }).click();
    await expect(page.getByText(/Réussite enregistrée/)).toBeVisible();
    await page.getByRole('button', { name: 'Recommencer' }).click();
    await expect(page.getByLabel('Programme de déplacements', { exact: true })).toHaveValue('');
    expect(erreurs).toEqual([]);
});

test('denied access and unknown game never expose a playable form', async ({ page }) => {
    await preparer(page, { refuse: true });
    await page.goto('/jeux/robot-route');
    await expect(page.getByText(/Game unavailable for this account/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Test my plan' })).toHaveCount(0);
    await page.goto('/jeux/unknown');
    await expect(page.getByText(/Game unavailable for this account/)).toBeVisible();
});
