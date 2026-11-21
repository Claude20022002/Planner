/**
 * Préférence clair ou sombre et provider du thème : un seul thème, celui de la charte, pour toutes les
 * pages (UIX-10b). Le choix de famille Planner / StudyLib est retiré : une préférence « themeFamille »
 * encore enregistrée dans le navigateur est ignorée, pas effacée.
 */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useTranslation } from 'react-i18next';
import { construireTheme, stylesGlobaux } from '../design-system/themeCharte';
import { identiteEcole } from '../services/etablissement';

const ThemeContext = createContext(null);

// Le hook vit avec son provider (même convention que AuthContext)
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme doit être utilisé dans un ThemeProvider');
    }
    return context;
};

const readStoredMode = () => {
    try {
        return localStorage.getItem('themeMode') === 'dark' ? 'dark' : 'light';
    } catch {
        return 'light';
    }
};

const memoriser = (mode) => {
    try {
        localStorage.setItem('themeMode', mode);
    } catch {
        // Préférence non mémorisée : sans conséquence
    }
};

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(readStoredMode);
    const { i18n } = useTranslation();

    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            memoriser(newMode);
            return newMode;
        });
    };
    const choisirMode = (suivant) => {
        if (suivant !== 'light' && suivant !== 'dark') return;
        setMode(suivant);
        memoriser(suivant);
    };

    // L'identité de l'école est chargée avant le premier affichage (main.jsx)
    const identite = identiteEcole();
    const theme = useMemo(() => construireTheme(mode, i18n.language, identite), [mode, i18n.language, identite]);

    const value = { mode, toggleTheme, choisirMode, theme };

    return (
        <ThemeContext.Provider value={value}>
            <MUIThemeProvider theme={theme}>
                <GlobalStyles styles={stylesGlobaux(mode, identite)} />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};
