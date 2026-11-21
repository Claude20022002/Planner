/**
 * Adaptations des composants MUI pour le thème de la charte (UIX-10b), les mêmes sur toutes les pages :
 * casse normale, cibles de 44 px, focus de 3 px décalé de 3 px, arrondis 8 / 12 / 20 px, bord des
 * champs à 3:1 (WCAG 1.4.11). `j` vient de jetonsInterface.
 */
import { ds } from './tokens.js';

export const composantsCharte = (j) => {
    const commande = ds.radius.sm;
    const libelle = { textTransform: 'none', letterSpacing: 0, fontWeight: 600 };
    return {
        MuiCssBaseline: { styleOverrides: { body: { backgroundImage: 'none', fontVariantNumeric: 'tabular-nums' } } },
        MuiButtonBase: {
            styleOverrides: { root: { '&:focus-visible': { outline: `3px solid ${j.focus}`, outlineOffset: 3 } } },
        },
        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: { root: { backgroundImage: 'none' }, outlined: { borderColor: j.filet }, rounded: { borderRadius: ds.radius.md } },
        },
        MuiCard: {
            defaultProps: { variant: 'outlined' },
            styleOverrides: { root: { borderRadius: ds.radius.md, borderColor: j.filet, boxShadow: 'none' } },
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: { ...libelle, borderRadius: commande, minHeight: 44, paddingLeft: 16, paddingRight: 16 },
                sizeSmall: { minHeight: 44, fontSize: '0.8125rem', paddingLeft: 12, paddingRight: 12 },
                containedPrimary: { '&:hover': { backgroundColor: j.action, filter: 'brightness(0.94)' } },
                outlined: { borderColor: j.bord },
            },
        },
        MuiIconButton: { styleOverrides: { root: { borderRadius: commande, minWidth: 44, minHeight: 44 } } },
        // Par défaut, noir à 54 % : sous 4,5:1 sur le fond de page (WCAG 1.4.3)
        MuiToggleButton: { styleOverrides: { root: { ...libelle, color: j.secondaire, borderColor: j.bord } } },
        MuiChip: { styleOverrides: { root: { ...libelle, borderRadius: commande, fontSize: '0.8125rem' } } },
        MuiAppBar: {
            defaultProps: { elevation: 0, color: 'inherit' },
            styleOverrides: { root: { backgroundImage: 'none', backgroundColor: j.papier, borderBottom: `1px solid ${j.filet}` } },
        },
        MuiListItemButton: { styleOverrides: { root: { borderRadius: commande, minHeight: 44 } } },
        MuiTableContainer: { styleOverrides: { root: { borderRadius: ds.radius.md } } },
        MuiTableCell: {
            styleOverrides: {
                head: { ...libelle, fontSize: '0.8125rem', color: j.secondaire, backgroundColor: j.entete, borderBottom: `1px solid ${j.bord}`, whiteSpace: 'nowrap' },
                root: { borderBottomColor: j.filet, fontVariantNumeric: 'tabular-nums' },
            },
        },
        MuiTableRow: { styleOverrides: { root: { '&.MuiTableRow-hover:hover': { backgroundColor: j.entete } } } },
        MuiTablePagination: { styleOverrides: { selectLabel: { fontSize: '0.8125rem' }, displayedRows: { fontSize: '0.8125rem' } } },
        MuiTextField: { defaultProps: { size: 'small' } },
        MuiOutlinedInput: {
            styleOverrides: { root: { borderRadius: commande, caretColor: j.action }, notchedOutline: { borderColor: j.bord } },
        },
        MuiTooltip: {
            styleOverrides: { tooltip: { backgroundColor: j.texte, color: j.fond, fontSize: '0.8125rem', borderRadius: commande } },
        },
        MuiDialog: { styleOverrides: { paper: { borderRadius: ds.radius.dialogue } } },
        MuiDialogTitle: { styleOverrides: { root: { fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.375rem' } } },
        MuiDialogActions: { styleOverrides: { root: { padding: 20, flexWrap: 'wrap', gap: 8 } } },
        MuiAlert: { styleOverrides: { root: { borderRadius: commande } } },
        MuiLinearProgress: { styleOverrides: { root: { borderRadius: 2, height: 4 } } },
        MuiTab: { styleOverrides: { root: { ...libelle, fontSize: '0.875rem', minHeight: 44 } } },
    };
};
