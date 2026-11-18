/** Assemble la palette et les adaptations MUI historiques sans changement de préférence. */
import { createTheme } from '@mui/material/styles';
import { frFR, enUS } from '@mui/material/locale';
import { ds } from './tokens';
import { texteSur } from '../../../shared/couleurs.js';
import { STUDYLIB, flapLabelPlanner } from './themeHistorique';
import { composantsHistoriques } from './composantsHistoriques';
export const buildTheme = (mode, language, famille = 'planner') => {
    const isLight = mode === 'light';
    const sl = famille === 'studylib';
    const p = sl ? STUDYLIB[isLight ? 'clair' : 'sombre'] : null;
    const c = ds.colors;
    const b = ds.boardBrut;
    const fontTitres = sl ? STUDYLIB.font : ds.font.board;
    const fontCorps = sl ? STUDYLIB.font : ds.font.body;
    const rayon = sl ? STUDYLIB.radius : ds.radius;
    const flapLabel = sl ? { fontFamily: STUDYLIB.font, fontWeight: 600, textTransform: 'none', letterSpacing: 0 } : flapLabelPlanner;

    const surface = sl ? p.surface : isLight ? c.bg.surface : b.cell;
    const ground = sl ? p.ground : isLight ? c.bg.app : b.ground;
    const line = sl ? p.line : isLight ? c.border.default : b.seam;
    const textPrimary = sl ? p.text : isLight ? c.text.primary : b.letter;
    const textSecondary = sl ? p.dim : isLight ? c.text.secondary : b.letterDim;
    const strong = sl ? p.strong : isLight ? c.border.strong : b.seam;
    const enteteTableau = sl ? p.head : isLight ? '#F6F7FA' : b.ground;

    return createTheme(
        {
            palette: {
                mode,
                primary: {
                    main: sl ? p.primary : isLight ? ds.brand.navy : ds.brand.navyNight,
                    dark: sl ? p.primaryDark : ds.brand.navyDeep,
                    light: sl ? '#3B82F6' : ds.brand.navyLight,
                    contrastText: sl ? (isLight ? '#FFFFFF' : '#0F172A') : isLight ? '#FFFFFF' : b.ground,
                },
                secondary: {
                    main: ds.brand.orange,
                    // Texte foncé sur l'orange de Planner ; blanc si l'accent de l'école est plus sombre
                    contrastText: texteSur(ds.brand.orange),
                },
                success: { main: isLight ? c.success.text : b.live },
                warning: { main: isLight ? c.warning.text : b.delayed },
                error: { main: isLight ? c.danger.text : b.cancelled },
                info: { main: isLight ? c.info.text : ds.brand.navyNight },
                background: { default: ground, paper: surface },
                text: { primary: textPrimary, secondary: textSecondary },
                divider: line,
                action: {
                    hover: sl ? p.hover : isLight ? '#EEF0F5' : 'rgba(242, 241, 236, 0.06)',
                    selected: sl ? p.selected : isLight ? ds.brand.navySoft : `${ds.brand.navyNight}29`, // 16 % d'opacité
                },
            },
            typography: {
                fontFamily: fontCorps,
                h1: { fontFamily: fontTitres, fontSize: '1.75rem', lineHeight: 1.15, fontWeight: 700, letterSpacing: '0.01em' },
                h2: { fontFamily: fontTitres, fontSize: '1.375rem', lineHeight: 1.2, fontWeight: 700, letterSpacing: '0.01em' },
                h3: { fontFamily: fontTitres, fontSize: '1.125rem', lineHeight: 1.25, fontWeight: 600, letterSpacing: '0.02em' },
                h4: { fontFamily: fontTitres, fontSize: '1.0625rem', lineHeight: 1.3, fontWeight: 600 },
                h5: { fontFamily: fontTitres, fontSize: '1rem', lineHeight: 1.3, fontWeight: 600 },
                h6: { fontFamily: fontTitres, fontSize: '1rem', lineHeight: 1.3, fontWeight: 600 },
                subtitle1: { fontSize: '0.9375rem', fontWeight: 600 },
                subtitle2: { fontSize: '0.875rem', fontWeight: 600 },
                body1: { fontSize: '0.9375rem', lineHeight: 1.55 },
                body2: { fontSize: '0.875rem', lineHeight: 1.5 },
                caption: { fontSize: '0.8125rem', lineHeight: 1.4 },
                overline: { ...flapLabel, fontSize: '0.75rem', lineHeight: 1.6, letterSpacing: '0.1em' },
                button: { ...flapLabel, fontSize: '0.9375rem' },
            },
            shape: { borderRadius: rayon.md },
            components: composantsHistoriques({ line, surface, rayon, strong, sl, p, isLight, textSecondary, enteteTableau, flapLabel, b }),
        },
        language === 'en' ? enUS : frFR
    );
};
