/** Server-only reference answers; tests verify every answer against its canonical engine. */
import { evaluerSimulation } from '../../../shared/simulations/moteur.js';

const REFERENCES = {
    'robot-route': { cle: 'programme', valeurs: ['EEESSS', 'SSSSEEEE', 'SSSSEEENNNEESSSS'], prefixe: 'robot' },
    'threshold-lab': { cle: 'seuil', valeurs: [50, 45, 35], prefixe: 'seuil' },
    'stock-pilot': { cle: 'commandes', valeurs: [[0, 5, 3], [5, 4, 0], [6, 3, 0]], prefixe: 'stock' },
    'tri-cyber': { cle: 'severites', valeurs: [[1, 4, 2, 3], [3, 2, 1, 4], [2, 4, 1, 3]], prefixe: 'triage' },
    'quete-sql': { cle: 'positions', valeurs: [[2, 3, 1, 4], [4, 1, 3, 2], [4, 1, 2, 3]], prefixe: 'sql' },
    'topo-reseau': { cle: 'ports', valeurs: [[0, 0, 1, 2], [0, 0, 1, 2], [2, 1, 0, 1]], prefixe: 'reseau' },
    'cpu-process': { cle: 'ordre', valeurs: [[1, 0, 2, 3], [2, 1, 3, 0], [2, 1, 3, 0]], prefixe: 'cpu' },
    'sprint-agile': { cle: 'choix', valeurs: [[1, 1, 1, 0, 0], [1, 1, 1, 0, 0], [1, 1, 1, 0, 0]], prefixe: 'sprint' },
    'budget-erp': { cle: 'quantites', valeurs: [[2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4]], prefixe: 'budget' },
    'big-o-lab': { cle: 'classes', valeurs: [[1, 2, 3, 5], [2, 4, 3, 5], [6, 5, 1, 2]], prefixe: 'complexite' },
};

/** Resolve by stable challenge ID, then fail closed if the reference no longer solves it. */
export function solutionReference(jeu, defi) {
    const reference = REFERENCES[jeu.code];
    const index = reference?.valeurs.findIndex((_, i) => defi.id === `${reference.prefixe}-0${i + 1}`) ?? -1;
    if (index < 0) throw new Error('Missing simulation reference solution');
    const valeur = reference.valeurs[index];
    const reponse = { [reference.cle]: Array.isArray(valeur) ? [...valeur] : valeur };
    if (!evaluerSimulation(jeu, defi, reponse)?.ok) throw new Error('Invalid simulation reference solution');
    return reponse;
}
