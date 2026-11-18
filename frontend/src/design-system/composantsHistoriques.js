/** Adaptations MUI du thème historique ; mêmes règles avant et après extraction. */
import { ds } from './tokens';
export const composantsHistoriques = ({ line, surface, rayon, strong, sl, p, isLight, textSecondary, enteteTableau, flapLabel, b }) => {
return {
                MuiCssBaseline: {
                    styleOverrides: {
                        body: {
                            backgroundImage: 'none',
                            fontVariantNumeric: 'tabular-nums',
                        },
                    },
                },
                MuiPaper: {
                    defaultProps: { elevation: 0 },
                    styleOverrides: {
                        root: { backgroundImage: 'none' },
                        outlined: { borderColor: line },
                    },
                },
                MuiCard: {
                    defaultProps: { variant: 'outlined' },
                    styleOverrides: {
                        root: {
                            borderRadius: rayon.md,
                            borderColor: line,
                            boxShadow: 'none',
                        },
                    },
                },
                MuiButton: {
                    defaultProps: { disableElevation: true },
                    styleOverrides: {
                        root: {
                            borderRadius: rayon.sm,
                            minHeight: 40,
                            paddingLeft: 16,
                            paddingRight: 16,
                        },
                        sizeSmall: { minHeight: 32, fontSize: '0.8125rem', paddingLeft: 10, paddingRight: 10 },
                        containedPrimary: {
                            '&:hover': { backgroundColor: sl ? p.primaryDark : isLight ? ds.brand.navyDeep : '#A9BBF4' },
                        },
                        outlined: { borderColor: strong },
                    },
                },
                MuiIconButton: {
                    styleOverrides: {
                        root: { borderRadius: rayon.sm },
                    },
                },
                MuiToggleButton: {
                    styleOverrides: {
                        // Par défaut, noir à 54 % : 4,49:1 sur le fond de page, sous le seuil de 4,5 (WCAG 1.4.3)
                        root: { color: textSecondary },
                    },
                },
                MuiChip: {
                    styleOverrides: {
                        // Pastille = petit volet : angles presque droits, capitales condensées
                        root: {
                            ...flapLabel,
                            borderRadius: rayon.xs,
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                            height: 26,
                        },
                    },
                },
                MuiAppBar: {
                    defaultProps: { elevation: 0, color: 'inherit' },
                    styleOverrides: {
                        root: {
                            backgroundImage: 'none',
                            backgroundColor: surface,
                            borderBottom: `1px solid ${line}`,
                        },
                    },
                },
                MuiListItemButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: rayon.sm,
                            minHeight: 40,
                        },
                    },
                },
                MuiTableContainer: {
                    styleOverrides: {
                        root: { borderRadius: rayon.md },
                    },
                },
                MuiTableCell: {
                    styleOverrides: {
                        // En-têtes de colonnes comme sur un panneau : capitales condensées, filets fins
                        head: {
                            ...flapLabel,
                            fontSize: '0.75rem',
                            letterSpacing: '0.1em',
                            color: textSecondary,
                            backgroundColor: enteteTableau,
                            borderBottom: `1px solid ${strong}`,
                            whiteSpace: 'nowrap',
                        },
                        root: {
                            borderBottomColor: line,
                            fontVariantNumeric: 'tabular-nums',
                        },
                    },
                },
                MuiTableRow: {
                    styleOverrides: {
                        root: {
                            '&.MuiTableRow-hover:hover': {
                                backgroundColor: sl ? p.hover : isLight ? '#F6F7FA' : 'rgba(242, 241, 236, 0.04)',
                            },
                        },
                    },
                },
                MuiTablePagination: {
                    styleOverrides: {
                        selectLabel: { fontSize: '0.8125rem' },
                        displayedRows: { fontSize: '0.8125rem' },
                    },
                },
                MuiTextField: {
                    defaultProps: { size: 'small' },
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: { borderRadius: rayon.sm },
                    },
                },
                MuiTooltip: {
                    styleOverrides: {
                        tooltip: {
                            backgroundColor: b.ground,
                            color: b.letter,
                            fontSize: '0.8125rem',
                            borderRadius: rayon.sm,
                        },
                    },
                },
                MuiDialog: {
                    styleOverrides: {
                        paper: { borderRadius: rayon.lg },
                    },
                },
                MuiAlert: {
                    styleOverrides: {
                        root: { borderRadius: rayon.sm },
                    },
                },
                MuiLinearProgress: {
                    styleOverrides: {
                        root: { borderRadius: 2, height: 4 },
                    },
                },
                MuiTab: {
                    styleOverrides: {
                        root: { ...flapLabel, fontSize: '0.875rem', minHeight: 44 },
                    },
                },
            };
};
