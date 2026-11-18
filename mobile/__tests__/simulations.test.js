import React from 'react';
import { act, create } from 'react-test-renderer';
import { TextInput } from 'react-native';
import { planner } from '../src/api/client';
import AtelierSimulation, { BoutonSimulation } from '../src/jeux/AtelierSimulation';
import SolutionSimulation from '../src/jeux/SolutionSimulation';
import useSimulation from '../src/jeux/useSimulation';
import { SIMULATIONS } from '../../shared/simulations/catalogue.js';
import { evaluerSimulation } from '../../shared/simulations/moteur.js';
import { en } from '../../shared/simulations/i18n.js';

jest.mock('../src/api/client', () => ({ planner: jest.fn() }));
jest.mock('../src/theme', () => ({ CIBLE_TACTILE: 44, creerStyles: () => () => ({}) }));
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (cle) => cle, i18n: { language: 'en' } }),
}));
global.IS_REACT_ACT_ENVIRONMENT = true;
jest.setTimeout(15000);

const t = (cle) => en[cle] ?? cle;
// Canonical first-level answers, keyed by challenge id, shared with the backend engine.
const premier = {
    'robot-01': { programme: 'EEESSS', champs: ['EEESSS'] },
    'seuil-01': { seuil: 50, champs: ['50'] },
    'stock-01': { commandes: [0, 5, 3], champs: ['0', '5', '3'] },
    'triage-01': { severites: [1, 4, 2, 3], champs: ['1', '4', '2', '3'] },
    'sql-01': { positions: [2, 3, 1, 4], champs: ['2', '3', '1', '4'] },
    'reseau-01': { ports: [0, 0, 1, 2], champs: ['0', '0', '1', '2'] },
    'cpu-01': { ordre: [1, 0, 2, 3], champs: ['1', '0', '2', '3'] },
    'sprint-01': { choix: [1, 1, 1, 0, 0], champs: ['1', '1', '1', '0', '0'] },
    'budget-01': { quantites: [2, 2, 2, 2], champs: ['2', '2', '2', '2'] },
    'complexite-01': { classes: [1, 2, 3, 5], champs: ['1', '2', '3', '5'] },
};
let courant;
function Partie({ jeu }) {
    courant = useSimulation(jeu);
    return <AtelierSimulation jeu={jeu} defi={jeu.defis[0]} etat={courant.etat} session={courant.session} t={t} />;
}
const progression = (etats = [], defis = []) => ({ defis, points: 0, etats });
const texteRendu = (vue) => JSON.stringify(vue.toJSON());
beforeEach(() => planner.mockReset());

test('every simulation first challenge has a reference answer', () => {
    expect(SIMULATIONS.map((jeu) => jeu.defis[0].id).sort()).toEqual(Object.keys(premier).sort());
});

test.each(SIMULATIONS.map((jeu) => [jeu.code, jeu]))('%s native inputs, shared validation, and authenticated API adapter', async (_, jeu) => {
    const { reponse, champs: valeurs } = (() => {
        const { champs, ...rest } = premier[jeu.defis[0].id];
        return { reponse: rest, champs };
    })();
    planner.mockResolvedValueOnce(progression());
    let vue;
    await act(async () => { vue = create(<Partie jeu={jeu} />); });
    expect(planner).toHaveBeenCalledWith(`/jeux/${jeu.code}/progression`);
    const champs = vue.root.findAllByType(TextInput);
    expect(champs).toHaveLength(valeurs.length);
    await act(async () => champs.forEach((champ, i) => champ.props.onChangeText(valeurs[i])));
    planner.mockResolvedValueOnce({ ...evaluerSimulation(jeu, jeu.defis[0], reponse), enregistre: true, progression: { points: 100 } });
    await act(async () => courant.session.essayer());
    expect(planner).toHaveBeenLastCalledWith(`/jeux/${jeu.code}/defis/${jeu.defis[0].id}/essais`, { method: 'POST', body: { reponse } });
    expect(courant.etat.points).toBe(100);
    expect(champs.every((champ) => Boolean(champ.props.accessibilityLabel))).toBe(true);
    await act(async () => vue.unmount());
});

test('native robot direction buttons create commands without typing', async () => {
    planner.mockResolvedValueOnce(progression());
    let vue;
    await act(async () => { vue = create(<Partie jeu={SIMULATIONS[0]} />); });
    const east = vue.root.findAllByType(BoutonSimulation).find((b) => b.props.children === 'East');
    await act(async () => east.props.onPress());
    expect(courant.etat.valeurs.programme).toBe('E');
    await act(async () => vue.unmount());
});

test('native failure keeps the takeaway hidden and restores attempt state on reload', async () => {
    const jeu = SIMULATIONS[0];
    const echec = { ...evaluerSimulation(jeu, jeu.defis[0], { programme: 'EEE' }), ok: false, enregistre: false, echecs: 2, solution_vue: false, sans_points: false };
    planner.mockResolvedValueOnce(progression());
    planner.mockResolvedValueOnce(echec);
    planner.mockResolvedValueOnce(progression([{ id: jeu.defis[0].id, echecs: 2, solution_vue: false, sans_points: false }]));
    let vue;
    await act(async () => { vue = create(<Partie jeu={jeu} />); });
    await act(async () => courant.session.saisir('programme', 'EEE'));
    await act(async () => courant.session.essayer());
    expect(courant.etat.resultat.enregistre).toBe(false);
    expect(courant.etat.solution).toBe(null);
    expect(vue.root.findAllByProps({ children: en.bilan })).toHaveLength(0);
    await act(async () => courant.session.charger());
    expect(courant.etat.etats[jeu.defis[0].id]).toMatchObject({ echecs: 2, solution_vue: false, sans_points: false });
    await act(async () => vue.unmount());
});

test('native explicit reveal shows the reference answer once and never automatically', async () => {
    const jeu = SIMULATIONS[0];
    const reponse = { programme: 'EEESSS' };
    planner.mockResolvedValueOnce(progression());
    let vue;
    await act(async () => { vue = create(<Partie jeu={jeu} />); });
    await act(async () => { vue.update(<Partie jeu={jeu} />); });
    planner.mockResolvedValueOnce({ reponse, echecs: 3, solution_vue: true, sans_points: true });
    expect(planner).toHaveBeenCalledTimes(1);
    await act(async () => courant.session.voirSolution());
    expect(planner).toHaveBeenLastCalledWith(`/jeux/${jeu.code}/defis/${jeu.defis[0].id}/solution`, { method: 'POST', body: {} });
    expect(courant.etat.solution).toEqual(reponse);
    expect(courant.etat.etats[jeu.defis[0].id].sans_points).toBe(true);
    await act(async () => courant.session.voirSolution());
    expect(planner.mock.calls.filter((c) => c[0].endsWith('/solution'))).toHaveLength(1);
    await act(async () => vue.unmount());
});

test('native solution panel shows the three-failure recommendation in the chosen language', async () => {
    const jeu = SIMULATIONS[0];
    let session;
    function Panneau() {
        const courant = useSimulation(jeu);
        session = courant.session;
        return <SolutionSimulation jeu={jeu} defi={jeu.defis[0]} etat={courant.etat} session={courant.session} />;
    }
    planner.mockResolvedValueOnce(progression([{ id: jeu.defis[0].id, echecs: 3, solution_vue: false, sans_points: false }]));
    let vue;
    await act(async () => { vue = create(<Panneau />); });
    expect(session.lire().etats[jeu.defis[0].id]?.echecs).toBe(3);
    expect(texteRendu(vue)).toContain('simulations.solutionConseil');
    const bouton = vue.root.findAllByType(BoutonSimulation)[0];
    planner.mockResolvedValueOnce({ reponse: { programme: 'EEESSS' }, echecs: 3, solution_vue: true, sans_points: true });
    await act(async () => bouton.props.onPress());
    expect(session.lire().solution).toEqual({ programme: 'EEESSS' });
    const rendu = texteRendu(vue);
    expect(rendu).toContain('simulations.solutionTitre');
    expect(rendu).toContain('EEESSS');
    await act(async () => vue.unmount());
});
