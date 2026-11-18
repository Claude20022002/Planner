/** Adaptation locale du pilote : conserve les préférences, protège les autres écrans. */
import { useMemo } from 'react';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { identiteEcole } from '../../services/etablissement';
import useFaviconPlanner from './useFaviconPlanner';
import { jetonsGestion, POLICE_GESTION } from '../../design-system/jetonsGestion';

export default function ThemeGestion({ children, actif = true }) {
  const parent = useTheme();
  useFaviconPlanner(actif);
  const theme = useMemo(() => {
    const j = jetonsGestion(parent.palette.mode, identiteEcole());
    const titre = { fontFamily: POLICE_GESTION, textTransform: 'none', letterSpacing: '-0.02em' };
    const libelle = { fontFamily: POLICE_GESTION, textTransform: 'none', letterSpacing: 0 };
    return createTheme(parent, {
      palette: {
        primary: { main: j.action, dark: j.action, contrastText: j.surAction },
        background: { default: j.fond, paper: j.papier },
        text: { primary: j.texte, secondary: j.secondaire }, divider: j.filet,
        action: { hover: j.entete, selected: j.selection },
      },
      typography: {
        body1: { fontFamily: POLICE_GESTION }, body2: { fontFamily: POLICE_GESTION },
        subtitle1: { fontFamily: POLICE_GESTION }, subtitle2: { fontFamily: POLICE_GESTION },
        caption: { fontFamily: POLICE_GESTION },
        fontFamily: POLICE_GESTION, h1: { ...titre, fontSize: '1.75rem' },
        h2: { ...titre, fontSize: '1.375rem' }, h3: { ...titre, fontSize: '1.125rem' },
        h4: titre, h5: titre, h6: titre, button: { ...libelle, fontWeight: 600 },
        overline: libelle,
      },
      shape: { borderRadius: 8 },
      components: {
        MuiButtonBase: { styleOverrides: { root: { '&:focus-visible': { outline: '2px solid ' + j.focus, outlineOffset: 3 } } } },
        MuiButton: { styleOverrides: { root: { borderRadius: 6, minHeight: 44, ...libelle },
          sizeSmall: { minHeight: 44 }, containedPrimary: { '&:hover': { backgroundColor: j.action, filter: 'brightness(0.94)' } } } },
        MuiIconButton: { styleOverrides: { root: { minWidth: 44, minHeight: 44, borderRadius: 6 } } },
        MuiTableCell: { styleOverrides: { head: { ...libelle, fontWeight: 600, backgroundColor: j.entete, color: j.secondaire } } },
        MuiTableRow: { styleOverrides: { root: { '&.MuiTableRow-hover:hover': { backgroundColor: j.entete } } } },
        MuiChip: { styleOverrides: { root: { ...libelle, borderRadius: 6 } } },
        MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 6 } } },
        MuiDialog: { styleOverrides: { paper: { borderRadius: 8 } } },
        MuiDialogTitle: { styleOverrides: { root: { ...titre, fontSize: '1.375rem' } } },
        MuiDialogActions: { styleOverrides: { root: { padding: 20, flexWrap: 'wrap', gap: 8 } } },
        MuiTab: { styleOverrides: { root: libelle } },
        MuiTooltip: { styleOverrides: { tooltip: { backgroundColor: j.texte, color: j.fond } } },
      },
    });
  }, [parent]);
  if (!actif) return children;
  return <ThemeProvider theme={theme}><Box data-interface="gestion" sx={{
    fontFamily: POLICE_GESTION, minWidth: 0, color: 'text.primary', bgcolor: 'background.default',
    '--hp-focus': theme.palette.mode === 'dark' ? '#93C5FD' : '#1D4ED8',
    '--nav-fond': theme.palette.background.paper, '--nav-letter': theme.palette.text.primary,
    '--nav-letterDim': theme.palette.text.secondary, '--nav-letterSoft': theme.palette.text.secondary,
    '--nav-filet': theme.palette.divider, '--nav-bordBouton': theme.palette.divider,
    '--nav-boutonActif': theme.palette.action.selected,
    '& :focus-visible': { outline: '2px solid var(--hp-focus)', outlineOffset: 3 },
    '& input': { caretColor: 'primary.main' },
    '& .MuiDialog-paper': { fontFamily: POLICE_GESTION },
  }}>{children}</Box></ThemeProvider>;
}
