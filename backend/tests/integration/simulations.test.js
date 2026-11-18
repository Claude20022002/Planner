import { resetDatabase, closeDatabase, createUser, createPlanningFixture, loginAs, anonymous } from './helpers/testApp.js';
import { resetRateLimiters } from '../../middleware/rateLimiterMiddleware.js';
import { AnneeUniversitaire, CoursComposante, Enseignement, EnseignementEnseignant, JeuEtatDefi, JeuProgression, Periode } from '../../models/index.js';

let prof, eleve, tiers, direction, cours;
const url = (code = 'robot-route', defi = 'robot-01') => `/api/jeux/${code}/defis/${defi}/essais`;
const solution = (code = 'robot-route', defi = 'robot-01') => `/api/jeux/${code}/defis/${defi}/solution`;
const bonne = { reponse: { programme: 'EEESSS' }, points: 999999, ok: true };

beforeAll(async () => {
    await resetDatabase();
    const admin = await createUser('admin');
    const enseignant = await createUser('enseignant');
    const etudiant = await createUser('etudiant');
    const autre = await createUser('etudiant');
    const fixture = await createPlanningFixture({ admin, enseignant, etudiant });
    cours = fixture.cours.id_cours;
    const annee = await AnneeUniversitaire.create({ libelle: '2026-2027', date_debut: '2026-09-01', date_fin: '2027-07-31', active: true });
    const periode = await Periode.create({ id_annee: annee.id_annee, code: 'S1', date_debut: '2026-09-14', date_fin: '2027-01-22', nb_semaines: 15 });
    const composante = await CoursComposante.create({ id_cours: cours, type: 'TP', volume_heures: 21, niveau_groupe: 'promotion' });
    const enseignement = await Enseignement.create({ id_composante: composante.id_composante, id_periode: periode.id_periode, heures_prevues: 21 });
    await enseignement.setGroupes([fixture.groupe.id_groupe]);
    await EnseignementEnseignant.create({ id_enseignement: enseignement.id_enseignement, id_user: enseignant.id_user, role: 'principal', statut_service: 'accepte' });
    [prof, eleve, tiers, direction] = await Promise.all([enseignant, etudiant, autre, admin].map((u) => loginAs(u)));
    for (const code of ['robot-route', 'threshold-lab', 'stock-pilot']) {
        expect((await prof.send('post', `/api/jeux/${code}/modules`, { id_cours: cours })).status).toBe(201);
    }
});
afterAll(closeDatabase);
beforeEach(resetRateLimiters);

test('requires authentication, eligible role, and teacher assignment', async () => {
    expect((await anonymous().get('/api/jeux/robot-route/progression')).status).toBe(401);
    expect((await anonymous().post(url()).send(bonne)).status).toBe(403);
    expect((await direction.send('post', url(), bonne)).status).toBe(403);
    const catalogue = await eleve.get('/api/jeux');
    expect(catalogue.body.jeux).toHaveLength(3);
    expect(catalogue.body.jeux.every((j) => j.source === null && j.curriculum.discipline.fr && !j.curriculum.url)).toBe(true);
    expect((await tiers.send('post', `/api/jeux/unknown/modules`, { id_cours: cours })).status).toBe(404);
});

test('solution requests are authenticated before CSRF and reject unknown or forged payloads', async () => {
    expect((await anonymous().post(solution())).status).toBe(401);
    expect((await eleve.agent.post(solution()).send({})).status).toBe(403);
    expect((await eleve.send('post', solution('unknown'), {})).status).toBe(404);
    expect((await eleve.send('post', solution('robot-route', 'stock-01'), {})).status).toBe(404);
    expect((await eleve.send('post', solution(), { points: 100 })).status).toBe(400);
    expect(await JeuProgression.count({ where: { id_defi: 'robot-01' } })).toBe(0);
});

test('evaluates canonical inputs, rejects malformed answers and endpoint bypass', async () => {
    expect((await eleve.send('post', url(), { reponse: { programme: 'N' }, ok: true })).body).toMatchObject({ ok: false, enregistre: false, echecs: 1 });
    expect((await eleve.send('post', url(), { reponse: { programme: 'EEESSS', points: 9999 } })).status).toBe(400);
    expect((await eleve.send('post', url('unknown'), bonne)).status).toBe(404);
    expect((await eleve.send('post', url('robot-route', 'stock-01'), bonne)).status).toBe(404);
    expect((await eleve.send('post', '/api/jeux/robot-route/defis/robot-01/reussite', { commandes: ['pwd'] })).status).toBe(400);
    expect((await eleve.agent.post(url()).send(bonne)).status).toBe(403);
});

test('stores first mastery only and isolates student progress', async () => {
    const premier = await eleve.send('post', url(), bonne);
    expect(premier.status).toBe(201);
    expect(premier.body).toMatchObject({ ok: true, enregistre: true, cree: true, points: 100, avec_solution: false, progression: { points: 100, reussis: 1 } });
    const replay = await eleve.send('post', url(), bonne);
    expect(replay.status).toBe(200);
    expect(replay.body).toMatchObject({ cree: false, points: 100, progression: { points: 100, reussis: 1 } });
    const suivi = await prof.get(`/api/jeux/robot-route/modules/${cours}/suivi`);
    expect(suivi.body.etudiants.find((e) => e.id_user !== undefined && e.reussis === 1)).toMatchObject({ points: 100, reussis: 1, avec_solution: 0 });
    expect((await prof.get('/api/jeux/robot-route/progression')).body.points).toBe(0);
    expect(await JeuProgression.count({ where: { id_defi: 'robot-01' } })).toBe(1);
});

test('evaluates AI and inventory plans on the server', async () => {
    expect((await eleve.send('post', url('threshold-lab', 'seuil-03'), { reponse: { seuil: 35 } })).body).toMatchObject({ ok: true, precision: 60, rappel: 100, cout: 4, points: 200 });
    expect((await eleve.send('post', url('stock-pilot', 'stock-03'), { reponse: { commandes: [6, 3, 0] } })).body).toMatchObject({ ok: true, restant: 0, cout: 108, points: 200 });
});

test('counts only well-formed server failures and restores them after a reload', async () => {
    const trois = await Promise.all([1, 2, 3].map(() => eleve.send('post', url('robot-route', 'robot-02'), { reponse: { programme: 'S' } })));
    expect(trois.map((r) => r.body.echecs)).toEqual([1, 2, 3]);
    const p = await eleve.get('/api/jeux/robot-route/progression');
    expect(p.body.etats).toEqual(expect.arrayContaining([{ id: 'robot-02', echecs: 3, solution_vue: false, sans_points: false }]));
});

test('viewing a solution creates no success, then a correct answer earns zero points', async () => {
    const vue = await eleve.send('post', solution('robot-route', 'robot-02'), {});
    expect(vue.status).toBe(200);
    expect(vue.body).toMatchObject({ reponse: { programme: 'SSSSEEEE' }, solution_vue: true, sans_points: true });
    expect(await JeuProgression.count({ where: { id_defi: 'robot-02' } })).toBe(0);
    const reussi = await eleve.send('post', url('robot-route', 'robot-02'), { reponse: { programme: 'SSSSEEEE' } });
    expect(reussi.body).toMatchObject({ enregistre: true, cree: true, points: 0, avec_solution: true, sans_points: true });
    const p = await eleve.get('/api/jeux/robot-route/progression');
    expect(p.body.defis.find((d) => d.id === 'robot-02')).toMatchObject({ points: 0, avec_solution: true });
    const suivi = await prof.get(`/api/jeux/robot-route/modules/${cours}/suivi`);
    expect(suivi.body.etudiants.find((e) => e.reussis === 2)).toMatchObject({ points: 100, avec_solution: 1 });
});

test('viewing after success preserves points and repeated requests stay idempotent', async () => {
    const vue = await eleve.send('post', solution(), {});
    expect(vue.body).toMatchObject({ reponse: { programme: 'EEESSS' }, echecs: 0, solution_vue: true, sans_points: false });
    const bis = await eleve.send('post', solution(), {});
    expect(bis.body).toEqual(vue.body);
    expect((await eleve.send('post', url(), bonne)).body).toMatchObject({ cree: false, points: 100, avec_solution: false });
    expect((await eleve.get('/api/jeux/robot-route/progression')).body.defis.find((d) => d.id === 'robot-01')).toMatchObject({ points: 100, avec_solution: false });
});

test('concurrent solution and success requests stay consistent', async () => {
    const [vue, reussi] = await Promise.all([
        eleve.send('post', solution('threshold-lab', 'seuil-02'), {}),
        eleve.send('post', url('threshold-lab', 'seuil-02'), { reponse: { seuil: 45 } }),
    ]);
    expect(vue.status).toBe(200);
    expect(vue.body.reponse).toEqual({ seuil: 45 });
    expect(reussi.body).toMatchObject({ enregistre: true, cree: true, echecs: 0 });
    // Le verrou de ligne ordonne les deux écritures : 150 points si la réussite est la première,
    // 0 point si la solution est enregistrée d'abord ; jamais un mélange des deux états.
    const p = (await eleve.get('/api/jeux/threshold-lab/progression')).body;
    const ligne = p.defis.find((d) => d.id === 'seuil-02');
    expect(ligne).toBeDefined();
    expect(ligne.points).toBe(ligne.avec_solution ? 0 : 150);
    expect(p.etats.find((e) => e.id === 'seuil-02')).toMatchObject({ solution_vue: true, sans_points: ligne.avec_solution });
    expect(await JeuProgression.count({ where: { id_defi: 'seuil-02' } })).toBe(1);
    expect(await JeuEtatDefi.count({ where: { code_jeu: 'threshold-lab', id_defi: 'seuil-02' } })).toBe(1);
});

test('other students and challenges keep separate state', async () => {
    expect((await tiers.send('post', solution())).status).toBe(403);
    expect((await eleve.get('/api/jeux/robot-route/progression')).body.etats.find((e) => e.id === 'robot-03')).toBeUndefined();
    await eleve.send('post', solution('robot-route', 'robot-03'), {});
    expect(await JeuEtatDefi.count({ where: { code_jeu: 'robot-route', id_defi: 'robot-03' } })).toBe(1);
});

test('revoked assignment blocks new attempts, solutions, and progression access', async () => {
    expect((await prof.send('delete', `/api/jeux/robot-route/modules/${cours}`)).status).toBe(200);
    expect((await eleve.send('post', url(), bonne)).status).toBe(403);
    expect((await eleve.send('post', solution(), {})).status).toBe(403);
    expect((await eleve.get('/api/jeux/robot-route/progression')).status).toBe(403);
});
