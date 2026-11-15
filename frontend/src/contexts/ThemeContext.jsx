/** Préférences de thème et provider global ; les écrans du pilote ont une adaptation locale. */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useTranslation } from 'react-i18next';
import { buildTheme } from '../design-system/themeHistoriqueMUI';
import { variablesCss } from '../design-system/themeHistorique';

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

const FAMILLES = ['planner', 'studylib'];

const readStoredFamille = () => {
    try {
        const famille = localStorage.getItem('themeFamille');
        return FAMILLES.includes(famille) ? famille : 'planner';
    } catch {
        return 'planner';
    }
};

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(readStoredMode);
    const [famille, setFamille] = useState(readStoredFamille);
    const { i18n } = useTranslation();

    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem('themeMode', newMode);
            } catch {
                // Préférence non mémorisée : sans conséquence
            }
            return newMode;
        });
    };

    // Planner (panneau des départs) ou StudyLib (bibliothèque) : choisi dans les Paramètres, retenu sur le navigateur
    const memoriser = (cle, valeur) => {
        try {
            localStorage.setItem(cle, valeur);
        } catch {
            // Préférence non mémorisée : sans conséquence
        }
    };
    const choisirFamille = (suivante) => {
        if (!FAMILLES.includes(suivante)) return;
        setFamille(suivante);
        memoriser('themeFamille', suivante);
    };
    const choisirMode = (suivant) => {
        if (suivant !== 'light' && suivant !== 'dark') return;
        setMode(suivant);
        memoriser('themeMode', suivant);
    };

    const theme = useMemo(() => buildTheme(mode, i18n.language, famille), [mode, i18n.language, famille]);

    const value = { mode, toggleTheme, choisirMode, famille, choisirFamille, theme };

    return (
        <ThemeContext.Provider value={value}>
            <MUIThemeProvider theme={theme}>
                <GlobalStyles styles={{ ':root': variablesCss(famille, mode) }} />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};
