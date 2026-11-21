/**
 * Thème MUI unique de l'application web, tiré de la charte (UIX-10b) : le même pour toutes les pages,
 * Studio quiz compris. Clair ou sombre ; la couleur de l'école remplace l'action (jetonsInterface).
 *   construireTheme(mode, langue, identite)  le thème MUI
 *   stylesGlobaux(mode, identite)            variables du menu, cadre du panneau, sélection, focus et
 *                                            barres de défilement, posés par ThemeContext (GlobalStyles)
 */
import { createTheme } from '@mui/material/styles';
import { frFR, enUS } from '@mui/material/locale';
import { ds } from './tokens.js';
import { texteSur } from '../../../shared/couleurs.js';
import { jetonsInterface, POLICE, variablesMenu } from './jetonsInterface.js';
import { composantsCharte } from './composantsCharte.js';

const titre = { fontFamily: POLICE, fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'none' };

export const construireTheme = (mode, langue, identite = {}) => {
    const clair = mode !== 'dark';
    const j = jetonsInterface(clair ? 'light' : 'dark', identite);
    const b = ds.boardBrut;
    return createTheme(
        {
            palette: {
                mode: clair ? 'light' : 'dark',
                primary: { main: j.action, dark: j.action, contrastText: j.surAction },
                secondary: { main: ds.brand.orange, contrastText: texteSur(ds.brand.orange) },
                success: { main: clair ? ds.colors.success.text : b.live },
                warning: { main: clair ? ds.colors.warning.text : b.delayed },
                error: { main: clair ? ds.colors.danger.text : b.cancelled },
                info: { main: clair ? ds.colors.info.text : j.focus },
                background: { default: j.fond, paper: j.papier },
                text: { primary: j.texte, secondary: j.secondaire },
                divider: j.filet,
                action: { hover: j.entete, selected: j.selection },
            },
            typography: {
                fontFamily: POLICE,
                h1: { ...titre, fontSize: '1.75rem', lineHeight: 1.15 },
                h2: { ...titre, fontSize: '1.375rem', lineHeight: 1.2 },
                h3: { ...titre, fontSize: '1.125rem', lineHeight: 1.25, fontWeight: 650 },
                h4: { ...titre, fontSize: '1.0625rem', lineHeight: 1.3, fontWeight: 650 },
                h5: { ...titre, fontSize: '1rem', lineHeight: 1.3, fontWeight: 650 },
                h6: { ...titre, fontSize: '1rem', lineHeight: 1.3, fontWeight: 650 },
                subtitle1: { fontSize: '0.9375rem', fontWeight: 600 },
                subtitle2: { fontSize: '0.875rem', fontWeight: 600 },
                body1: { fontSize: '0.9375rem', lineHeight: 1.55 },
                body2: { fontSize: '0.875rem', lineHeight: 1.5 },
                caption: { fontSize: '0.8125rem', lineHeight: 1.4 },
                overline: { fontSize: '0.75rem', lineHeight: 1.6, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'none' },
                button: { fontSize: '0.9375rem', fontWeight: 600, letterSpacing: 0, textTransform: 'none' },
            },
            shape: { borderRadius: ds.radius.sm },
            components: composantsCharte(j),
        },
        langue === 'en' ? enUS : frFR
    );
};

export const stylesGlobaux = (mode, identite = {}) => {
    const j = jetonsInterface(mode === 'dark' ? 'dark' : 'light', identite);
    const b = ds.boardBrut;
    return {
        ':root': { ...variablesMenu(j), '--board-frame': b.frame },
        '::selection': { background: j.action, color: j.surAction },
        ':focus-visible': { outline: `3px solid ${j.focus}`, outlineOffset: 3 },
        '*': { scrollbarColor: `${j.bord} transparent` },
        '::-webkit-scrollbar-thumb': { background: j.bord },
        '.hp-board *': { scrollbarColor: `${b.seam} transparent` },
    };
};
