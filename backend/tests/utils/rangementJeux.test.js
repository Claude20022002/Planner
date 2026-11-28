/**
 * QJE-15 : le tableau du catalogue, et un rangement qui ne dépend
 * ni de la langue ni de l'ordre d'arrivée. Un groupe vide n'a pas de titre.
 */
import { rangerJeux, JEUX, CYCLES, DOMAINES } from '../../../shared/jeux/catalogue.js';

const TABLEAU = [
    { code: 'terminal-linux', cycles: ['superieur'], domaine: 'informatique' },
    { code: 'big-o-lab', cycles: ['superieur'], domaine: 'informatique' },
    { code: 'quete-sql', cycles: ['superieur'], domaine: 'informatique' },
    { code: 'cpu-process', cycles: ['superieur'], domaine: 'informatique' },
    { code: 'robot-route', cycles: ['superieur'], domaine: 'informatique' },
    { code: 'topo-reseau', cycles: ['superieur'], domaine: 'reseaux-cybersecurite' },
    { code: 'tri-cyber', cycles: ['superieur'], domaine: 'reseaux-cybersecurite' },
    { code: 'threshold-lab', cycles: ['superieur'], domaine: 'intelligence-artificielle' },
    { code: 'budget-erp', cycles: ['superieur'], domaine: 'gestion-logistique' },
    { code: 'sprint-agile', cycles: ['superieur'], domaine: 'gestion-logistique' },
    { code: 'stock-pilot', cycles: ['superieur'], domaine: 'gestion-logistique' },
];

const jeuParCode = (code) => JEUX.find((jeu) => jeu.code === code);

const codesRanges = (groupes) => groupes.map((cycle) => ({
    cycle: cycle.cycle,
    domaines: cycle.domaines.map((domaine) => ({
        domaine: domaine.domaine,
        jeux: domaine.jeux.map((jeu) => jeu.code),
    })),
}));

const ORDRE_ATTENDU = [
    {
        cycle: 'superieur',
        domaines: [
            { domaine: 'informatique', jeux: ['terminal-linux', 'big-o-lab', 'quete-sql', 'cpu-process', 'robot-route'] },
            { domaine: 'reseaux-cybersecurite', jeux: ['topo-reseau', 'tri-cyber'] },
            { domaine: 'intelligence-artificielle', jeux: ['threshold-lab'] },
            { domaine: 'gestion-logistique', jeux: ['budget-erp', 'sprint-agile', 'stock-pilot'] },
        ],
    },
];

describe('QJE-15 : le tableau', () => {
    test('onze jeux, le cycle et le domaine du tableau, rien hors des listes', () => {
        expect(CYCLES.map((cycle) => cycle.code)).toEqual([
            'college', 'lycee', 'superieur', 'formation-professionnelle',
        ]);
        expect(DOMAINES.map((domaine) => domaine.code)).toEqual([
            'informatique', 'reseaux-cybersecurite', 'intelligence-artificielle', 'gestion-logistique',
        ]);
        expect(JEUX.map((jeu) => jeu.code).sort()).toEqual(TABLEAU.map((ligne) => ligne.code).sort());
        const cyclesConnus = CYCLES.map((cycle) => cycle.code);
        const domainesConnus = DOMAINES.map((domaine) => domaine.code);
        for (const ligne of TABLEAU) {
            const jeu = jeuParCode(ligne.code);
            expect(jeu).toBeTruthy();
            expect(jeu.cycles).toEqual(ligne.cycles);
            expect(jeu.domaine).toBe(ligne.domaine);
            expect(jeu.cycles.every((cycle) => cyclesConnus.includes(cycle))).toBe(true);
            expect(domainesConnus).toContain(jeu.domaine);
        }
        expect(jeuParCode('terminal-linux').modes).toEqual(['individuel', 'collectif']);
    });
});

describe('QJE-15 : rangerJeux', () => {
    test('le tableau suit le cycle, puis le domaine, puis le rang', () => {
        expect(codesRanges(rangerJeux(JEUX))).toEqual(ORDRE_ATTENDU);
        expect(rangerJeux(JEUX).map((cycle) => cycle.titre.fr)).toEqual(['Supérieur']);
    });

    test("mélanger l'arrivée ou la langue ne change pas l'ordre", () => {
        const melange = [...JEUX].reverse();
        const titresEchanges = melange.map((jeu) => ({
            ...jeu,
            titre: jeu.titre ? { fr: jeu.titre.en, en: jeu.titre.fr } : jeu.titre,
        }));
        expect(codesRanges(rangerJeux(melange))).toEqual(ORDRE_ATTENDU);
        expect(codesRanges(rangerJeux(titresEchanges))).toEqual(ORDRE_ATTENDU);
    });

    test("deux jeux du même domaine n'ont qu'un titre, un domaine vide n'en a pas", () => {
        const deux = rangerJeux([jeuParCode('quete-sql'), jeuParCode('big-o-lab')]);
        expect(deux).toHaveLength(1);
        expect(deux[0].titre).toEqual({ fr: 'Supérieur', en: 'Higher education' });
        expect(deux[0].domaines).toHaveLength(1);
        expect(deux[0].domaines[0].titre).toEqual({ fr: 'Informatique', en: 'Computer science' });
        expect(deux[0].domaines[0].jeux.map((jeu) => jeu.code)).toEqual(['big-o-lab', 'quete-sql']);

        const seul = rangerJeux([jeuParCode('stock-pilot')]);
        const titres = seul.flatMap((cycle) => [
            cycle.titre.fr,
            ...cycle.domaines.map((domaine) => domaine.titre.fr),
        ]);
        expect(titres).toEqual(['Supérieur', 'Gestion et logistique']);
        expect(seul.map((cycle) => cycle.cycle)).toEqual(['superieur']);
        expect(seul[0].domaines.map((domaine) => domaine.domaine)).toEqual(['gestion-logistique']);
    });
});
