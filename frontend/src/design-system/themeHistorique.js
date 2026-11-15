/** Valeurs et variables du thème historique, conservées pour les écrans hors pilote. */
import { ds } from './tokens';
// Thème de la bibliothèque StudyLib (mêmes valeurs que l'application : mobile/src/theme.js) :
// Inter, bleu #1D4ED8, gris ardoise, coins plus arrondis, casse normale.
const STUDYLIB = {
    font: '"Inter", "Segoe UI", system-ui, sans-serif',
    radius: { xs: 6, sm: 10, md: 14, lg: 18 },
    clair: { ground: '#F8FAFC', surface: '#FFFFFF', line: '#E2E8F0', strong: '#CBD5E1', text: '#0F172A', dim: '#64748B', primary: '#1D4ED8', primaryDark: '#1E3A8A', head: '#F1F5F9', hover: '#EFF6FF', selected: '#DBEAFE' },
    sombre: { ground: '#0F172A', surface: '#1E293B', line: '#334155', strong: '#475569', text: '#F1F5F9', dim: '#94A3B8', primary: '#60A5FA', primaryDark: '#93C5FD', head: '#0F172A', hover: 'rgba(241, 245, 249, 0.06)', selected: 'rgba(96, 165, 250, 0.16)' },
};

// Panneau des séances et menu en thème StudyLib : plus de fond noir ni de marine, les gris ardoise
// et le bleu de la bibliothèque. Ils remplacent les variables CSS de design-system/tokens.js.
const PANNEAU_STUDYLIB = {
    clair: {
        board: { titre: '#0F172A', ground: '#FFFFFF', frame: '#E2E8F0', cell: '#F1F5F9', cellHinge: '#CBD5E1', seam: '#E2E8F0', letter: '#0F172A', letterDim: '#64748B', onTime: '#0F172A', live: '#15803D', delayed: '#B45309', cancelled: '#DC2626' },
        nav: { fond: '#FFFFFF', letter: '#0F172A', letterSoft: '#334155', letterDim: '#64748B', icon: '#64748B', selection: '#DBEAFE', survol: '#F1F5F9', filet: '#E2E8F0', bordBouton: '#CBD5E1', boutonActif: '#DBEAFE' },
    },
    sombre: {
        board: { titre: '#F1F5F9', ground: '#1E293B', frame: '#334155', cell: '#0F172A', cellHinge: '#020617', seam: '#334155', letter: '#F1F5F9', letterDim: '#94A3B8', onTime: '#F1F5F9', live: '#4ADE80', delayed: '#FB923C', cancelled: '#F87171' },
        nav: { fond: '#0F172A', letter: '#F1F5F9', letterSoft: '#CBD5E1', letterDim: '#94A3B8', icon: '#94A3B8', selection: 'rgba(96, 165, 250, 0.16)', survol: 'rgba(241, 245, 249, 0.06)', filet: '#1E293B', bordBouton: '#334155', boutonActif: 'rgba(96, 165, 250, 0.16)' },
    },
};

// Thème Planner : le menu et le cadre du panneau prennent la couleur de l'école (design-system/marque.js)
export const variablesCss = (famille, mode) => {
    if (famille !== 'studylib') return { '--nav-fond': ds.navBrut.fond, '--board-frame': ds.boardBrut.frame };
    const { board, nav } = PANNEAU_STUDYLIB[mode === 'light' ? 'clair' : 'sombre'];
    return {
        ...Object.fromEntries(Object.entries(board).map(([cle, valeur]) => [`--board-${cle}`, valeur])),
        ...Object.fromEntries(Object.entries(nav).map(([cle, valeur]) => [`--nav-${cle}`, valeur])),
    };
};

// Vocabulaire « volet » : capitales condensées espacées (en-têtes, boutons, horaires, codes)
const flapLabelPlanner = {
    fontFamily: ds.font.board,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
};


export { STUDYLIB, flapLabelPlanner };
