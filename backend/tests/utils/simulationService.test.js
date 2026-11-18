import { jest } from '@jest/globals';

// Exercise real game services and scoring; replace only persistence and unrelated planning helpers.
const progression = { findOrCreate: jest.fn(), findAll: jest.fn(), findOne: jest.fn() };
const etatModele = { findOrCreate: jest.fn(), findOne: jest.fn() };
const affectations = { count: jest.fn() };
const appartenir = { findAll: jest.fn() };
const groupes = { findAll: jest.fn() };
const enseignements = { findAll: jest.fn() };
const liens = { findAll: jest.fn() };
const transaction = { LOCK: { UPDATE: 'UPDATE' } };
Object.defineProperty(etatModele, 'sequelize', { value: { transaction: async (operation) => operation(transaction) } });
jest.unstable_mockModule('../../models/index.js', () => ({
    Appartenir: appartenir, Cours: {}, CoursComposante: {}, Enseignement: enseignements,
    EnseignementEnseignant: {}, EnseignementGroupe: liens, Groupe: groupes,
    JeuEtatDefi: etatModele, JeuModule: affectations, JeuProfil: {}, JeuProgression: progression, Users: {},
}));
jest.unstable_mockModule('../../services/planning/groupes.js', () => ({ ancetres: () => [] }));
jest.unstable_mockModule('../../services/planning/droits.js', () => ({ peutGererFiliere: () => false }));
jest.unstable_mockModule('../../services/planning/enseignements.js', () => ({
    ErreurMetier: class extends Error { constructor(message, status) { super(message); this.status = status; } },
}));
// Groupes de l'année : évite de charger le service réel et ses modèles de planning dans ce test unitaire.
jest.unstable_mockModule('../../services/annees/annees.js', () => ({ groupesDeLAnnee: async () => [1] }));
const { essayerSimulation, voirSolutionSimulation } = await import('../../services/jeux/simulations.js');
const { enregistrerReussite } = await import('../../services/jeux/jeux.js');
const user = { id_user: 7, role: 'etudiant' };
const etat = { echecs: 0, solution_vue_le: null, update: jest.fn(async (valeurs) => Object.assign(etat, valeurs)) };

beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(etat, { echecs: 0, solution_vue_le: null });
    etat.update.mockImplementation(async (valeurs) => Object.assign(etat, valeurs));
    appartenir.findAll.mockResolvedValue([{ groupe: { id_groupe: 1, id_filiere: 1 } }]);
    groupes.findAll.mockResolvedValue([{ id_groupe: 1, id_filiere: 1 }]);
    liens.findAll.mockResolvedValue([{ id_enseignement: 1 }]);
    enseignements.findAll.mockResolvedValue([{ composante: { id_cours: 12 } }]);
    affectations.count.mockResolvedValue(1);
    etatModele.findOrCreate.mockResolvedValue([etat, true]);
    etatModele.findOne.mockImplementation(async () => etat);
    progression.findOne.mockResolvedValue(null);
    progression.findOrCreate.mockImplementation(async ({ where, defaults }) => [{ ...where, ...defaults, avec_solution: defaults?.avec_solution ?? false }, true]);
    progression.findAll.mockResolvedValue([{ code_jeu: 'robot-route', id_defi: 'robot-01', points: 100 }]);
});

test('uses canonical XP, student identity, challenge key, and module scope', async () => {
    const r = await essayerSimulation(user, 'robot-route', 'robot-01', { programme: 'EEESSS' });
    expect(r).toMatchObject({ ok: true, enregistre: true, cree: true, points: 100, progression: { points: 100 }, avec_solution: false, echecs: 0 });
    expect(affectations.count).toHaveBeenCalledWith({ where: { code_jeu: 'robot-route', id_cours: [12] } });
    expect(progression.findOrCreate).toHaveBeenCalledWith(expect.objectContaining({ where: { id_user: 7, code_jeu: 'robot-route', id_defi: 'robot-01' }, defaults: expect.objectContaining({ points: 100, indices: 0 }) }));
    expect(etatModele.findOne).toHaveBeenCalledWith(expect.objectContaining({ lock: transaction.LOCK.UPDATE }));
});
test('access is rechecked before evaluating every attempt', async () => {
    affectations.count.mockResolvedValue(0);
    await expect(essayerSimulation(user, 'robot-route', 'robot-01', { programme: 'EEESSS' })).rejects.toMatchObject({ status: 403 });
    expect(progression.findOrCreate).not.toHaveBeenCalled();
    expect(etat.update).not.toHaveBeenCalled();
});
test('invalid shapes are rejected while a well-formed failure counts without creating progress', async () => {
    await expect(essayerSimulation(user, 'robot-route', 'robot-01', { programme: 'EEESSS', points: 999 })).rejects.toMatchObject({ status: 400 });
    expect(etat.update).not.toHaveBeenCalled();
    expect(await essayerSimulation(user, 'robot-route', 'robot-01', { programme: 'N' })).toMatchObject({ ok: false, enregistre: false, echecs: 1 });
    expect(etat.update).toHaveBeenCalledWith({ echecs: 1 }, { transaction });
    expect(progression.findOrCreate).not.toHaveBeenCalled();
});
test('unknown game/challenge and legacy success endpoint cannot bypass evaluation', async () => {
    await expect(essayerSimulation(user, 'unknown', 'robot-01', {})).rejects.toMatchObject({ status: 404 });
    await expect(essayerSimulation(user, 'robot-route', 'stock-01', {})).rejects.toMatchObject({ status: 404 });
    await expect(enregistrerReussite(user, 'robot-route', 'robot-01', 0, ['pwd'])).rejects.toMatchObject({ status: 400 });
    expect(progression.findOrCreate).not.toHaveBeenCalled();
});
test('solution requests validate the body, record viewing, and fail closed on storage errors', async () => {
    await expect(voirSolutionSimulation(user, 'robot-route', 'robot-01', { points: 100 })).rejects.toMatchObject({ status: 400 });
    expect(etat.update).not.toHaveBeenCalled();
    const r = await voirSolutionSimulation(user, 'robot-route', 'robot-01', {});
    expect(r).toMatchObject({ reponse: { programme: 'EEESSS' }, solution_vue: true, sans_points: true });
    expect(etat.update).toHaveBeenCalledWith(expect.objectContaining({ solution_vue_le: expect.any(Date) }), { transaction });
    await expect(voirSolutionSimulation(user, 'unknown', 'robot-01', {})).rejects.toMatchObject({ status: 404 });
    Object.assign(etat, { solution_vue_le: null });
    etat.update.mockRejectedValueOnce(new Error('database unavailable'));
    await expect(voirSolutionSimulation(user, 'robot-route', 'robot-02', {})).rejects.toThrow('database unavailable');
});
test('viewing the solution then succeeding stores zero points and marks the success assisted', async () => {
    await voirSolutionSimulation(user, 'robot-route', 'robot-01', {});
    await essayerSimulation(user, 'robot-route', 'robot-01', { programme: 'EEESSS' });
    expect(progression.findOrCreate).toHaveBeenCalledWith(expect.objectContaining({
        defaults: expect.objectContaining({ points: 0, avec_solution: true }),
    }));
});
test('a later solution request leaves an earlier unassisted success and its points untouched', async () => {
    progression.findOne.mockResolvedValue({ points: 100, avec_solution: false });
    const r = await voirSolutionSimulation(user, 'robot-route', 'robot-01', {});
    expect(r).toMatchObject({ solution_vue: true, sans_points: false });
    expect(progression.findOrCreate).not.toHaveBeenCalled();
});
test('preserves stored points on repeat success and propagates storage failure', async () => {
    progression.findOrCreate.mockResolvedValueOnce([{ points: 100, avec_solution: false }, false]).mockRejectedValueOnce(new Error('database unavailable'));
    expect(await essayerSimulation(user, 'robot-route', 'robot-01', { programme: 'EEESSS' })).toMatchObject({ cree: false, points: 100 });
    await expect(essayerSimulation(user, 'robot-route', 'robot-01', { programme: 'EEESSS' })).rejects.toThrow('database unavailable');
});
